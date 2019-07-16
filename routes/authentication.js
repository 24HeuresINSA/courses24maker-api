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

/**
 * @apiGroup AUTHENTICATION
 * @api {POST} /authentication/login Login and get the jwt
 * @apiDescription Login the api to get the jwt
 * @apiSuccess (Sucess 200) {String} jwt The jwt to use as a header bearer to request this api
 * @apiParam (Body) {String} user ``Mandatory`` The user (name of the team or admin)
 * @apiParam (Body) {String} password ``Mandatory`` The password of the team or of the admin account
 * @apiError (Error 4xx) {400} AUTHENTICATION_ERROR_BAD_REQUEST Your request is wrong
 * @apiError (Error 4xx) {401} AUTHENTICATION_ERROR_PASSWORD_WRONG Bad password
 * @apiError (Error 4xx) {404} AUTHENTICATION_ERROR_TEAM_DOES_NOT_EXIST The team does not exist
 * @apiError (Error 5xx) {500} AUTHENTICATION_ERROR_INTERNAL_RETRIEVE_TEAM An internal error occurs
 */
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

/**
 * @apiGroup AUTHENTICATION
 * @api {POST} /authentication/register Register a new user
 * @apiDescription Create a new user for the api that is to say a new team with a manager
 * @apiSuccess (Sucess 201) {String} jwt The jwt of the team to use as a header bearer to request this api
 * @apiParam (Body) {Object} team The information of the team to create
 * @apiParam (Body) {String} team.team_name ``Mandatory`` The name of the team to create
 * @apiParam (Body) {String} team.team_password ``Mandatory`` The password of the team to create
 * @apiParam (Body) {String} team.category_id ``Mandatory`` The uuid of the category associated to the team to create
 * @apiParam (Body) {Object} team_manager The information of the manager of the team to create
 * @apiParam (Body) {String} team_manager.participant_name ``Mandatory`` The name of the manager of the team to create
 * @apiParam (Body) {String} team_manager.participant_surname ``Mandatory`` The surname of the manager of the team to create
 * @apiParam (Body) {Date} team_manager.participant_birthdate ``Mandatory`` The birthdate of the manager of the team to create
 * @apiParam (Body) {String} team_manager.participant_telephone ``Mandatory`` The telephone of the manager of the team to create
 * @apiParam (Body) {String} team_manager.participant_email ``Mandatory`` The email of the manager of the team to create
 * @apiUse GenericAuthenticationError
 * @apiError (Error 4xx) {400} GENERIC_ERROR_REQUEST_FORMAT_ERROR Your request (body or query param) is wrong
 * @apiError (Error 4xx) {409} TEAM_ALREADY_EXISTS The team with the same name already exists
 * @apiError (Error 5xx) {500} TEAM_ERROR_INTERNAL_CHECK_TEAM An internal error occurs
 * @apiError (Error 5xx) {500} TEAM_ERROR_INTERNAL_POST_TEAM An internal error occurs
 * @apiError (Error 5xx) {500} PARTICIPANT_ERROR_INTERNAL_NEW_POST_TEAM An internal error occurs
 */
router.post('/register', function(req, res, next) {
	// Check if the body is properly formed
	const request = service_team.checkRequestPostTeam(req, res, next);
	var parametersCreateTeam = service_team.getDatabaseParameterPostTeamCreateTeam(request.params, request.query, request.body);
	var parametersCreateManager = service_team.getDatabaseParameterPostTeamCreateManager(request.params, request.query, request.body);

	Team.findOne({ where: { team_name: req.body.team.team_name } })
		.then( team => {
			if (team) {
				next(apiErrors.TEAM_ALREADY_EXISTS, req, res);
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
											next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_POST_TEAM, err), req, res);
										}
									})
									.catch(err =>{
										team.destroy({force: true});
										participant.destroy({force: true});
										next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_POST_TEAM, err), req, res);
									});
							})
							.catch(err => {
								team.destroy({force: true});
								next(new service_errors.InternalErrorObject(apiErrors.PARTICIPANT_ERROR_INTERNAL_NEW_POST_TEAM, err), req, res);
							});
					})
					.catch(err => {
						next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_POST_TEAM, err), req, res);
					});
			}
		})
		.catch( err => {
			next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_CHECK_TEAM, err), req, res)
		});
});

module.exports = router;