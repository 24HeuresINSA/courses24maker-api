// ---------- IMPORTS ----------

// Middlewares and modules
var sequelize = require('../config/config-database').sequelize;
var uuidv4 = require('uuid/v4');
const Op = sequelize.Op;

// Configuration files
const config_authentication = require('../config/config-authentication.json');

// Service files
const service_authentication = require('../services/service-authentication');
const service_errors = require('../services/service-errors');
const service_participant = require('../services/service-participant');
const apiErrors = service_errors.apiErrors;
const utils = require('../services/utils');

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

/* The default body configuration when a request coming for POST /teams */
const defaultBodyPostTeam = {
	team: {
		team_id: null,
		team_name: null,
		team_password: null,
		team_manager_id: null,
		team_category_id: null,
		team_valid: 0
	},
	team_manager: {
		participant_name: null,
		participant_surname: null,
		participant_birthdate: null,
		participant_student: null,
		participant_medical_certificate: null,
		participant_medical_certificate_file: null,
		participant_medical_certificate_valid: 0,
		participant_payment: 0,
		participant_tee_shirt_size: null,
		participant_comment: null,
		participant_telephone: null,
		participant_email: null
	}
};

/* The default body configuration when a request coming for PUT /teams */
const defaultBodyPutTeam = {
	team: { }
};

/* The default query configuration when a request coming for GET /teams and GET /teams/:id */
const defaultQueryGetTeams = {
	manager: true,
	category: true,
	participants: false
};


// ---------- FUNCTIONS ----------

/* The body check for the request GET /teams */
function checkRequestGetTeams (req, res, next) {
	var query = Object.assign({}, defaultQueryGetTeams);
	var body = Object.assign({}, defaultBodyGetTeams);
	var categoriesIdPromise = Category.findAll({ raw: true, attributes: ["category_id"] });

	try {
		if (req.hasOwnProperty('query')) {
			req.query.hasOwnProperty('manager') ? (['true', 'false'].includes(req.query.manager) ? query.manager = JSON.parse(req.query.manager) : null) : null;
			req.query.hasOwnProperty('category') ? (['true', 'false'].includes(req.query.category) ? query.category = JSON.parse(req.query.category) : null) : null;
			req.query.hasOwnProperty('participants') ? (['true', 'false'].includes(req.query.participants) ? query.participants = JSON.parse(req.query.participants) : null) : null;
		}

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
				if (req.body.filter.hasOwnProperty('category_id') && req.body.filter.category_id.length > 0) {
					var categoriesId = [];
					body.filter.category_id = [];
					categoriesIdPromise
						.then(categories => {
							categories.forEach(val => {
								categoriesId.push(val.category_id);
							});
							req.body.filter.team_category_id.forEach((value, index) => {
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
	return {params: null, query: query, body: body};
}

/* The body check for the request GET /teams/:id */
function checkRequestGetTeam (req, res, next) {
	var params = {};
	var query = Object.assign({}, defaultQueryGetTeams);
	try {
		if (req.params.hasOwnProperty('id')) {
			params.id = req.params.id;
		} else {
			return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}

		if (req.hasOwnProperty('query')) {
			req.query.hasOwnProperty('manager') ? (['true', 'false'].includes(req.query.manager) ? query.manager = JSON.parse(req.query.manager) : null) : null;
			req.query.hasOwnProperty('category') ? (['true', 'false'].includes(req.query.category) ? query.category = JSON.parse(req.query.category) : null) : null;
			req.query.hasOwnProperty('participants') ? (['true', 'false'].includes(req.query.participants) ? query.participants = JSON.parse(req.query.participants) : null) : null;
		}
	} catch (err) {
		next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_GET_ALL, err), req, res);
	}
	return {params: params, query: query, body: null};
}

/* The body check for the request POST /teams */
function checkRequestPostTeam (req, res, next) {
	var body = Object.assign({}, defaultBodyPostTeam);

	body.team.team_id = uuidv4();
	body.team.team_valid = 0;

	body.team_manager.participant_id = uuidv4();
	body.team_manager.participant_payment = 0;//service_participant.participantPaymentValidityValueMatch.PAYMENT_NOT_RECEIVED.value;
	body.team_manager.participant_medical_certificate_valid = 0;//service_participant.participantCertificateValidityValueMatch.MEDICAL_CERTIFICATE_NOT_RECEIVED.value;

	if (req.body.hasOwnProperty('team')) {
		if (req.body.team.hasOwnProperty('team_name')) {
			if (req.body.team.team_name) {
				body.team.team_name = req.body.team.team_name;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.team.hasOwnProperty('team_password')) {
			if (req.body.team.team_password) {
				body.team.team_salt = uuidv4();
				body.team.team_password = service_authentication.hashPassword(req.body.team.team_password, body.team.team_salt);
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.team.hasOwnProperty('team_category_id')) {
			body.team.team_category_id = req.body.team.team_category_id;
		} else {
			return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.team.hasOwnProperty('team_valid')) {
			if (req.body.team.team_valid>=0) {
				body.team.team_valid = req.body.team.team_valid;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
	} else {
		return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
	}
	if (req.body.hasOwnProperty('team_manager')) {
		if (req.body.team_manager.hasOwnProperty('participant_name')) {
			if (req.body.team_manager.participant_name) {
				body.team_manager.participant_name = req.body.team_manager.participant_name;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.team_manager.hasOwnProperty('participant_surname')) {
			if (req.body.team_manager.participant_surname) {
				body.team_manager.participant_surname = req.body.team_manager.participant_surname;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.team_manager.hasOwnProperty('participant_birthdate')) {
			if (req.body.team_manager.participant_birthdate) {
				body.team_manager.participant_birthdate = req.body.team_manager.participant_birthdate;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.team_manager.hasOwnProperty('participant_telephone')) {
			if (req.body.team_manager.participant_telephone) {
				body.team_manager.participant_telephone = req.body.team_manager.participant_telephone;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.team_manager.hasOwnProperty('participant_email')) {
			if (req.body.team_manager.participant_email) {
				body.team_manager.participant_email = req.body.team_manager.participant_email;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.team_manager.hasOwnProperty('participant_student')) {
			if (req.body.team_manager.participant_student) {
				body.team_manager.participant_student = req.body.team_manager.participant_student
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.team_manager.hasOwnProperty('participant_medical_certificate')) {
			if (req.body.team_manager.participant_medical_certificate) {
				body.team_manager.participant_medical_certificate = req.body.team_manager.participant_medical_certificate
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.team_manager.hasOwnProperty('participant_medical_certificate_file')) {
			if (req.body.team_manager.participant_medical_certificate_file) {
				body.team_manager.participant_medical_certificate_file = req.body.team_manager.participant_medical_certificate_file
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.team_manager.hasOwnProperty('participant_tee_shirt_size')) {
			if (req.body.team_manager.participant_tee_shirt_size) {
				body.team_manager.participant_tee_shirt_size = req.body.team_manager.participant_tee_shirt_size
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.team_manager.hasOwnProperty('participant_comment')) {
			if (req.body.team_manager.participant_comment) {
				body.team_manager.participant_comment = req.body.team_manager.participant_comment
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
	} else {
		return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
	}

	return {params: null, query: null, body: body};
}

/* The body check for the request PUT /teams/:id */
function checkRequestPutTeam (req, res, next) {
	const isAdminScope = req.user.scope == config_authentication["admin-jwt-scope"];
	var params = {};
	var body = Object.assign({}, defaultBodyPutTeam);

	if (req.params.hasOwnProperty('id')) {
		params.id = req.params.id;
	} else {
		return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
	}

	if (req.body.hasOwnProperty('team')) {
		if (req.body.team.hasOwnProperty('team_name')) {
			if (req.body.team.team_name) {
				body.team.team_name = req.body.team.team_name;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.team.hasOwnProperty('team_password')) {
			if (req.body.team.team_password) {
				body.team.team_salt = uuidv4();
				body.team.team_password = service_authentication.hashPassword(req.body.team.team_password, body.team.team_salt);
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.team.hasOwnProperty('team_category_id')) {
			if (req.body.team.team_category_id) {
				body.team.team_category_id = req.body.team.team_category_id;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.team.hasOwnProperty('team_manager_id')) {
			if (req.body.team.team_manager_id) {
				body.team.team_manager_id = req.body.team.team_manager_id;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.team.hasOwnProperty('team_valid') && isAdminScope) {
			if (req.body.team.team_valid>=0) {
				body.team.team_valid = req.body.team.team_valid;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
	}

	return {params: params, query: null, body: body};
}

/* The body check for the request DELETE /teams/:id */
function checkRequestDeleteTeams (req, res, next) {
	var params = {};
	if (!req.params.hasOwnProperty('id')) {
		return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
	}
	params.id = req.params.id
	return {params: params, query: null, body: null};
}

/* The database SQL request parameters for the request GET /teams */
function getDatabaseParameterGetTeams (params, query, body){
	var parameters = {
		where: {},
		attributes: { exclude: ['team_password', 'team_salt']},
		include: []
	};

	if (query.manager) {
		parameters.include.push({model: Participant, as: 'team_manager', attributes: ['participant_id', 'participant_name', 'participant_surname', 'participant_telephone', 'participant_email']});
	}
	if (query.category) {
		parameters.include.push({model: Category, as:'team_category', attributes: ['category_id', 'category_label']});
	}
	if (query.participants) {
		parameters.include.push({model: Participant, as: 'team_participants', attributes: {exclude: ['participant_medical_certificate']}});
	}

	return parameters;
}

/* The database SQL request parameters for the request GET /teams/:id */
function getDatabaseParameterGetTeam (params, query, body){
	var parameters = {
		where: { team_id: params.id },
		attributes: { exclude: ['team_password', 'team_salt']},
		include: []
	};

	if (query.manager) {
		parameters.include.push({model: Participant, as: 'team_manager', attributes: ['participant_id', 'participant_name', 'participant_surname', 'participant_telephone', 'participant_email']});
	}
	if (query.category) {
		parameters.include.push({model: Category, as:'team_category', attributes: ['category_id', 'category_label']});
	}
	if (query.participants) {
		parameters.include.push({model: Participant, as: 'team_participants', attributes: {exclude: ['participant_medical_certificate']}});
	}

	return parameters;
}

/* The database SQL request parameters for the request POST /teams */
function getDatabaseParameterPostTeamCreateTeam (params, query, body){
	return body.team;
}

/* The database SQL request parameters for the request POST /teams */
function getDatabaseParameterPostTeamCreateManager (params, query, body){
	return body.team_manager;
}

/* The database SQL request parameters for the request PUT /teams */
function getDatabaseParameterPutTeamUpdateTeam (params, query, body){
	return body.team;
}

/* The database SQL request parameters for the request DELETE /teams/:id */
function getDatabaseParameterDeleteTeam (params, query, body){
	var parameters = {
		where: { team_id: params.id },
	};
	return parameters;
}

/* To check if the user has the rights to access to a ressource */
function checkIfTheUserMatchToTheId(req, res, next) {
	if (req.user.scope == config_authentication["user-jwt-scope"] && req.user.team.team_id != req.params.id) {
		return next(apiErrors.AUTHENTICATION_ERROR_FORBIDDEN, req, res);
	}
};


module.exports = {
	checkRequestGetTeams: checkRequestGetTeams,
	getDatabaseParameterGetTeams: getDatabaseParameterGetTeams,
	checkRequestGetTeam: checkRequestGetTeam,
	getDatabaseParameterGetTeam: getDatabaseParameterGetTeam,
	checkRequestPostTeam: checkRequestPostTeam,
	getDatabaseParameterPostTeamCreateTeam: getDatabaseParameterPostTeamCreateTeam,
	getDatabaseParameterPostTeamCreateManager: getDatabaseParameterPostTeamCreateManager,
	checkRequestPutTeam: checkRequestPutTeam,
	getDatabaseParameterPutTeamUpdateTeam: getDatabaseParameterPutTeamUpdateTeam,
	checkRequestDeleteTeams: checkRequestDeleteTeams,
	getDatabaseParameterDeleteTeam: getDatabaseParameterDeleteTeam,
	checkIfTheUserMatchToTheId: checkIfTheUserMatchToTheId
};