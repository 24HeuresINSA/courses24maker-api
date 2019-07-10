// ---------- IMPORT ----------

// Middlewares and modules
var express = require('express');
var router = express.Router();
var sequelize = require('../config/config-database').sequelize;

// Configuration files
var config_authentication = require('../config/config-authentication.json');

// Service files
var service_authentication = require('../services/service-authentication');
var service_team = require('../services/service-team');
var service_errors = require('../services/service-errors');
var apiErrors = service_errors.apiErrors;

// Models
var Category = sequelize.import('../models/category');
var Team = sequelize.import('../models/team');
var Participant = sequelize.import('../models/participant');

// ---------- ROUTES ----------

router.post('/login', function(req, res, next) {

	// If request well formed
	if (req.body.user && req.body.password) {
		// If admin authentication
		if (req.body.user == config_authentication["admin-login"] && req.body.password == config_authentication["admin-password"]) {
			res.status(200);
			res.send({
				"jwt": service_authentication.buildJwt(config_authentication["admin-jwt-audience"], config_authentication["admin-jwt-subject"], config_authentication["admin-jwt-scope"])
			});
		// If classic user authentication
		}
		else {
			Team.findOne({
				raw: true,
				attributes: ['team_id', 'team_password', 'team_salt'],
				where: { team_name: req.body.user }
			})
				.then( team => {
					if (team) {
						// If team found in database, check the password provided
						if ( !service_authentication.isPasswordChecked(req.body.password, team.team_password, team.team_salt) ) {
							next(apiErrors.AUTHENTICATION_ERROR_PASSWORD_WRONG, req, res);
						}
						else {
							res.status(200);
							res.send({
								"jwt": service_authentication.buildJwt(config_authentication["user-jwt-audience"], team.team_id, config_authentication["user-jwt-scope"])
							});
						}
					}
					else {
						next(apiErrors.AUTHENTICATION_ERROR_TEAM_DOES_NOT_EXIST, req, res);
					}
				})
				.catch( err => {
					next(new service_errors.InternalErrorObject(apiErrors.AUTHENTICATION_ERROR_INTERNAL_RETRIEVE_TEAM, err), req, res);
				});
		}
	}
	else {
		next(apiErrors.AUTHENTICATION_ERROR_BAD_REQUEST, req, res);
	}

});

router.post('/register', function(req, res, next) {
	// Check if the body is properly formed
	const request = service_team.checkRequestPostTeam(req, res, next);
	var parametersCreateTeam = service_team.getDatabaseParameterPostTeamCreateTeam(request.params, request.query, request.body);
	var parametersCreateManager = service_team.getDatabaseParameterPostTeamCreateManager(request.params, request.query, request.body);

	Team.findOne({ where: { team_name: req.body.team.team_name } })
		.then( team => {
			if (team) {
				next(apiErrors.TEAM_ALREADY_EXISTS_POST_TEAM, req, res);
			} else {
				Team.create(parametersCreateTeam)
					.then(team => {
						parametersCreateManager.participant_team_id = team.get("team_id");
						Participant.create(parametersCreateManager)
							.then(participant => {
								team.set("team_manager_id", participant.get("participant_id"));
								team.save()
									.then(result => {
										if(result) {
											res.status(201);
											res.send({
												"jwt": service_authentication.buildJwt(config_authentication["user-jwt-audience"], result.get("team_id"), config_authentication["user-jwt-scope"])
											});
										} else {
											team.destroy({force: true});
											participant.destroy({force: true});
											next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_NEW_POST_TEAM, err), req, res);
										}
									})
									.catch(err =>{
										team.destroy({force: true});
										participant.destroy({force: true});
										next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_NEW_POST_TEAM, err), req, res);
									});
							})
							.catch(err => {
								team.destroy({force: true});
								next(new service_errors.InternalErrorObject(apiErrors.PARTICIPANT_ERROR_INTERNAL_NEW_POST_TEAM, err), req, res);
							});
					})
					.catch(err => {
						next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_NEW_POST_TEAM, err), req, res);
					});
			}
		})
		.catch( err => {
			next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_CHECK_POST_TEAM, err), req, res)
		});
});

module.exports = router;