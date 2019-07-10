// ---------- IMPORTS ----------

// Middlewares and modules
var sequelize = require('../config/config-database').sequelize;
const Op = sequelize.Op;

// Configuration files
const config_authentication = require('../config/config-authentication.json');

// Service files
var service_errors = require('../services/service-errors');
var apiErrors = service_errors.apiErrors;
var utils = require('../services/utils');

// Models
var Team = sequelize.import('../models/team');
var Participant = sequelize.import('../models/participant');
var Category = sequelize.import('../models/category');


// ---------- CONFIGURATIONS ----------

/* All possible values that can be associated to a team concerning its validity*/
const teamValidityValueMatch= {
	TEAM_VALID: {label: "TEAM_VALID", value: 1},
	TEAM_PROCESSING: {label: "TEAM_PROCESSING", value: 0},
	TEAM_REJECTED: {label: "TEAM_REJECTED", value: 2}
};

/* The default body configuration when a request coming for GET /teams */
const defaultBodyGetTeams = {
	filter: {
		team_valid: [teamValidityValueMatch.TEAM_VALID.label, teamValidityValueMatch.TEAM_PROCESSING.label, teamValidityValueMatch.TEAM_REJECTED.label],
		category_id: []
	}
};

/* The default query configuration when a request coming for GET /teams and GET /teams/:id */
const defaultQueryGetTeams = {
	manager: true,
	category: true,
	participants: false
};

// ---------- FUNCTIONS ----------

/* The body check for the request GET /teams and GET /teams/:id */
function checkQueryGetTeams (req, res, next) {
	var query = Object.assign({}, defaultQueryGetTeams);
	try {
		if (req.hasOwnProperty('query')) {
			req.query.hasOwnProperty('manager') ? (['true', 'false'].includes(req.query.manager) ? query.manager = JSON.parse(req.query.manager) : null) : null;
			req.query.hasOwnProperty('category') ? (['true', 'false'].includes(req.query.category) ? query.category = JSON.parse(req.query.category) : null) : null;
			req.query.hasOwnProperty('participants') ? (['true', 'false'].includes(req.query.participants) ? query.participants = JSON.parse(req.query.participants) : null) : null;
		}
	} catch (err) {
		next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_GET_ALL, err), req, res);
	}
	return query;
}

/* The body check for the request GET /team */
function checkBodyGetTeams (req, res, next) {
	var body = Object.assign({}, defaultBodyGetTeams);
	var categoriesIdPromise = Category.findAll({ raw: true, attributes: ["category_id"] });
	try {
		if (req.hasOwnProperty('body')) {
			if (req.body.hasOwnProperty('filter')) {
				if (req.body.filter.hasOwnProperty('team_valid') && req.body.filter.team_valid.length > 0) {
					body.filter.team_valid = [];
					req.body.filter.team_valid.forEach((value, index) => {
						if (value.includes([teamValidityValueMatch.TEAM_REJECTED.label, teamValidityValueMatch.TEAM_VALID.label, teamValidityValueMatch.TEAM_PROCESSING.label])) {
							body.filter.team_valid.push(value);
						}
					});
				}
				if (req.body.filter.hasOwnProperty('category_id') && req.body.filter.team_valid.length > 0) {
					var categoriesId = [];
					body.filter.category_id = [];
					categoriesIdPromise
						.then(categories => {
							categories.forEach(val => {
								categoriesId.push(val.category_id);
							});
							req.body.filter.team_valid.forEach((value, index) => {
								if (value.includes(categoriesId)) {
									body.filter.category_id.push(value);
								}
							});
						})
						.catch(err => {
							next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_GET_ALL, err), req, res);
						});
				}
			}
		}
	} catch (err) {
		next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_GET_ALL, err), req, res);
	}
	return body;
}

/* The database SQL request parameters for the request GET /team */
function getDatabaseParameterGetTeams (params, query, body){
	var parameters = {
		where: {},
		attributes: { exclude: ['team_password']},
		include: []
	};

	if (query.manager) {
		parameters.include.push({model: Participant, as: 'team_manager', attributes: ['participant_id', 'participant_name', 'participant_surname', 'participant_telephone', 'participant_email']});
	}
	if (query.category) {
		parameters.include.push({model: Category, as:'team_category', attributes: ['category_id', 'category_label']});
	}
	if (query.participants) {
		parameters.include.push({model: Participant, as: 'team_participants'});
	}

	return parameters;
}

/* The database SQL request parameters for the request GET /team */
function getDatabaseParameterGetTeam (params, query, body){
	var parameters = {
		where: { team_id: params.id },
		attributes: { exclude: ['team_password']},
		include: []
	};

	if (query.manager) {
		parameters.include.push({model: Participant, as: 'team_manager', attributes: ['participant_id', 'participant_name', 'participant_surname', 'participant_telephone', 'participant_email']});
	}
	if (query.category) {
		parameters.include.push({model: Category, as:'team_category', attributes: ['category_id', 'category_label']});
	}
	if (query.participants) {
		parameters.include.push({model: Participant, as: 'team_participants'});
	}

	return parameters;
}

/* To check if the user has the rights to access to a ressource */
function isUserMatchToTheId(req, res, next) {
	if (req.user.scope == config_authentication["user-jwt-scope"] && req.user.team.team_id != req.params.id) {
		return false;
	} else {
		return true;
	}
};


module.exports = {
	checkQueryGetTeams: checkQueryGetTeams,
	getDatabaseParameterGetTeams: getDatabaseParameterGetTeams,
	checkBodyGetTeams: checkBodyGetTeams,
	getDatabaseParameterGetTeam: getDatabaseParameterGetTeam,
	isUserMatchToTheId: isUserMatchToTheId
};