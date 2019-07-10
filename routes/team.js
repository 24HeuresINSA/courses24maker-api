// ---------- IMPORTS ----------

// Middlewares and modules
var express = require('express');
var router = express.Router();
var uuidv4 = require('uuid/v4');
var sequelize = require('../config/config-database').sequelize;

// Configuration files
const config_authentication = require('../config/config-authentication.json');
const {authenticationAdmin} = require("../config/config-authentication");
const {authenticationUser} = require("../config/config-authentication");

// Service files
var service_errors = require('../services/service-errors');
var service_team = require('../services/service-team');
var apiErrors = service_errors.apiErrors;
const utils = require('../services/utils');

// Models
var Team = sequelize.import('../models/team');
var Participant = sequelize.import('../models/participant');
var Category = sequelize.import('../models/category');
Team.belongsTo(Participant, {as: 'team_manager', foreignKey: 'team_manager_id', targetKey:'participant_id'});
Team.belongsTo(Category, {as: 'team_category', foreignKey: 'team_category_id', sourceKey: 'category_id'});
Team.hasMany(Participant, {as: 'team_participants', foreignKey: 'participant_team_id', sourceKey: 'team_id'});


// ---------- ROUTES ----------

router.get('/', authenticationAdmin, function(req, res, next) {
	const query = service_team.checkQueryGetTeams(req, res, next);
	const body = service_team.checkBodyGetTeams(req, res, next);
	const databaseParams = service_team.getDatabaseParameterGetTeams(req.params, query, body);

	Team.findAll(databaseParams)
		.then( teams => {
			if (teams) {
				res.status(200);
				res.send(utils.modelToJSON(teams));
			}
		})
		.catch ( err => {
			next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_GET_ALL, err), req, res);
		})
});

router.get('/:id', authenticationUser, function(req, res, next) {
	// Check if the user has the rights
	if (!service_team.isUserMatchToTheId(req, res, next)) {
		next(apiErrors.AUTHENTICATION_ERROR_FORBIDDEN, req, res)
	} else {
		const query = service_team.checkQueryGetTeams(req, res, next);
		const databaseParams = service_team.getDatabaseParameterGetTeam(req.params, query, null);

		Team.findOne(databaseParams)
			.then( team => {
				if (team) {
					res.status(200);
					res.send(utils.modelToJSON(team));
				} else {
					next(apiErrors.TEAM_NOT_FOUND_GET_TEAM, req, res);
				}
			})
			.catch( err => {
				console.log(err);
				next(apiErrors.TEAM_ERROR_INTERNAL_GET_TEAM, req, res);
			});
	}

});

router.post('/', authenticationAdmin, function(req, res, next) {

		Team.findOne({
			where: {
				team_nom: req.body.team.team_nom,
			}
		})
			.then(result => {
				//If raw does not exist yet
				if (result == null) {
					//Save the new role
					var teamJSON = req.body.team;
					teamJSON.team_id = uuidv4();
					teamJSON.team_sel = Date.now();
					teamJSON.team_mdp = sha256.x2(req.body.team.team_mdp + teamJSON.team_sel);
					teamJSON.team_valide = 0;

					Team.create(teamJSON)
						.then(result2 => {
							res.status(201);
							res.send({
								"code": 201
							});
						})
						.catch(err => {
							res.status(500);
							res.send({
								"error": "InternalServerError",
								"code": 500,
								"message": "Création de l'équipe impossible :" + err
							});
						});
					//If role exists yet
				} else {
					res.status(202);
					res.send({
						"error": "TeamAlreadyExist",
						"code": 409,
						"message": "L'équipe existe déjà"
					});
				}
			})
			.catch(err => {
				res.send({
					"error": "InternalServerError",
					"code": 500,
					"message": "Probleme pour vérifier l'existence de l'équipe : " + err.message
				});
			});


});

router.put('/:id', authenticationUser, function(req, res, next) {
	if (!service_team.isUserMatchToTheId(req, res, next)) {
		next(apiErrors.AUTHENTICATION_ERROR_FORBIDDEN, req, res)
	} else {

	}
		if (req.is('application/json')) {

			Team.findOne({
				where: {
					team_id: req.params.id
				}
			})
				.then(result => {

					if (result) {

						result.update(req.body.team)
							.then(result2 => {
								res.status(204).end();
							}).catch(err => {
							res.status(500);
							res.send({
								"error": "InternalServerError",
								"code": 500,
								"message": "Problem pour mettre à jour l'équipe : " + err
							});
						});

					} else {
						res.status(202);
						res.send({
							"error": "NotFound",
							"code": 202,
							"message": "L'équipe n'existe pas"
						});
					}
				})
				.catch(err => {
					res.send({
						"error": "InternalServerError",
						"code": 500,
						"message": "Probleme pour vérifier l'existence de l'équipe : " + err
					});
				});

		} else {
			res.status(406);
			res.send({
				"error": "BadContentType",
				"code": 406,
				"message": "Content-type received: " + req.get('Content-Type') + ". Content-type required : application/json"
			});
		}

});

router.delete('/:id', authenticationAdmin, function(req, res, next) {


		Team.destroy({
			where: {
				team_id: req.params.id,
			}
		})
			.then(result => {
				if (result > 0) {
					res.status(204).end();
				} else {
					res.status(202);
					res.send({
						"error": "NotFound",
						"code": 404,
						"message": "L'équipe n'existe pas"
					});
				}
			})
			.catch(err => {
				res.status(500);
				res.send({
					"error": "InternalServerError",
					"code": 500,
					"message": "Probleme pour supprimer l'équipe : " + err.message
				});
			});

});

module.exports = router;