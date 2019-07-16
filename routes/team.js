// ---------- IMPORTS ----------

// Middlewares and modules
var express = require('express');
var router = express.Router();
var sequelize = require('../config/config-database').sequelize;

// Configuration files
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

/**
 * @apiDefine GenericAuthenticationError
 * @apiError (Error 4xx) {401} AUTHENTICATION_ERROR_UNAUTHORIZED You must be authenticated
 * @apiError (Error 4xx) {403} AUTHENTICATION_ERROR_FORBIDDEN Your rights do not allow you to access to this endoint
 */
/**
* @apiDefine Header
* @apiParam (Headers) {String} Content-Type ``application/json``
* @apiParam (Headers) {String} Authorization ``Bearer`` *jwt*
*/
/**
 * @apiDefine TeamsObject
 * @apiSuccess (Sucess 200) {String} teams.team_id The uuid of the team
 * @apiSuccess (Sucess 200) {String} teams.team_manager_id The uuid of the participant managing the team
 * @apiSuccess (Sucess 200) {String} teams.team_name The name of the team
 * @apiSuccess (Sucess 200) {String} teams.team_category_id The uuid of the category associated
 * @apiSuccess (Sucess 200) {Boolean} teams.team_valid If the team is valid (1) or not (0)
 * @apiSuccess (Sucess 200) {Object} teams.team_manager The participant object associated to the team (If ``manager`` query param ``true``)
 * @apiSuccess (Sucess 200) {String} teams.team_manager.participant_id The uuid of the participant
 * @apiSuccess (Sucess 200) {String} teams.team_manager.participant_name The name of the participant
 * @apiSuccess (Sucess 200) {String} teams.team_manager.participant_surname The surname of the participant
 * @apiSuccess (Sucess 200) {String} teams.team_manager.participant_telephone The phone number of the participant
 * @apiSuccess (Sucess 200) {String} teams.team_manager.participant_email The mail of the participant
 * @apiSuccess (Sucess 200) {Object} teams.team_category The category object associated to the team (If ``category`` query param ``true``)
 * @apiSuccess (Sucess 200) {String} teams.team_category.category_id The uuid of the category
 * @apiSuccess (Sucess 200) {String} teams.team_category.category_label The label of the category
 * @apiSuccess (Sucess 200) {Object[]} teams.team_participants The participant object array associated to the team (If ``participants`` query param ``true``)
 * @apiSuccess (Sucess 200) {String} teams.team_participants.participant_id The uuid of the participant
 * @apiSuccess (Sucess 200) {String} teams.team_participants.participant_name The name of the participant
 * @apiSuccess (Sucess 200) {String} teams.team_participants.participant_surname The surname of the participant
 * @apiSuccess (Sucess 200) {String} teams.team_participants.participant_team_id The uuid of the associate team
 * @apiSuccess (Sucess 200) {Boolean} teams.team_participants.participant_student If the participant is a student (1) or not (0)
 * @apiSuccess (Sucess 200) {Boolean} teams.team_participants.participant_medical_certificate_valid If the participant has uploaded a valid certificate (1) or not (0)
 * @apiSuccess (Sucess 200) {String} teams.team_participants.participant_medical_certificate_file The path file of the medical certificate
 * @apiSuccess (Sucess 200) {Boolean} teams.team_participants.participant_payment If the participant has already paid (1) or not (0)
 * @apiSuccess (Sucess 200) {String} teams.team_participants.participant_tee_shirt_size The size for the tee shirt of the participant
 * @apiSuccess (Sucess 200) {String} teams.team_participants.participant_comment The comment the participant can send
 * @apiSuccess (Sucess 200) {String} teams.team_participants.participant_message The message send by the admin to the participant
 * @apiSuccess (Sucess 200) {String} teams.team_participants.participant_telephone The phone number of the participant
 * @apiSuccess (Sucess 200) {String} teams.team_participants.participant_email The email of the participant
 * @apiSuccess (Sucess 200) {Date} cratedAt The creation date of the team raw
 * @apiSuccess (Sucess 200) {Date} updatedAt The last date update of the team raw
 */
/**
 * @apiDefine TeamObject
 * @apiSuccess (Sucess 200) {String} team.team_id The uuid of the team
 * @apiSuccess (Sucess 200) {String} team.team_manager_id The uuid of the participant managing the team
 * @apiSuccess (Sucess 200) {String} team.team_name The name of the team
 * @apiSuccess (Sucess 200) {String} team.team_category_id The uuid of the category associated
 * @apiSuccess (Sucess 200) {Boolean} team.team_valid If the team is valid (1) or not (0)
 * @apiSuccess (Sucess 200) {Object} team.team_manager The participant object associated to the team (If ``manager`` query param ``true``)
 * @apiSuccess (Sucess 200) {String} team.team_manager.participant_id The uuid of the participant
 * @apiSuccess (Sucess 200) {String} team.team_manager.participant_name The name of the participant
 * @apiSuccess (Sucess 200) {String} team.team_manager.participant_surname The surname of the participant
 * @apiSuccess (Sucess 200) {String} team.team_manager.participant_telephone The phone number of the participant
 * @apiSuccess (Sucess 200) {String} team.team_manager.participant_email The mail of the participant
 * @apiSuccess (Sucess 200) {Object} team.team_category The category object associated to the team (If ``category`` query param ``true``)
 * @apiSuccess (Sucess 200) {String} team.team_category.category_id The uuid of the category
 * @apiSuccess (Sucess 200) {String} team.team_category.category_label The label of the category
 * @apiSuccess (Sucess 200) {Object[]} team.team_participants The participant object array associated to the team (If ``participants`` query param ``true``)
 * @apiSuccess (Sucess 200) {String} team.team_participants.participant_id The uuid of the participant
 * @apiSuccess (Sucess 200) {String} team.team_participants.participant_name The name of the participant
 * @apiSuccess (Sucess 200) {String} team.team_participants.participant_surname The surname of the participant
 * @apiSuccess (Sucess 200) {String} team.team_participants.participant_team_id The uuid of the associate team
 * @apiSuccess (Sucess 200) {Boolean} team.team_participants.participant_student If the participant is a student (1) or not (0)
 * @apiSuccess (Sucess 200) {Boolean} team.team_participants.participant_medical_certificate_valid If the participant has uploaded a valid certificate (1) or not (0)
 * @apiSuccess (Sucess 200) {String} team.team_participants.participant_medical_certificate_file The path file of the medical certificate
 * @apiSuccess (Sucess 200) {Boolean} team.team_participants.participant_payment If the participant has already paid (1) or not (0)
 * @apiSuccess (Sucess 200) {String} team.team_participants.participant_tee_shirt_size The size for the tee shirt of the participant
 * @apiSuccess (Sucess 200) {String} team.team_participants.participant_comment The comment the participant can send
 * @apiSuccess (Sucess 200) {String} team.team_participants.participant_message The message send by the admin to the participant
 * @apiSuccess (Sucess 200) {String} team.team_participants.participant_telephone The phone number of the participant
 * @apiSuccess (Sucess 200) {String} team.team_participants.participant_email The email of the participant
 * @apiSuccess (Sucess 200) {Date} cratedAt The creation date of the team raw
 * @apiSuccess (Sucess 200) {Date} updatedAt The last date update of the team raw
 */

/**
 * @apiGroup TEAM
 * @api {GET} /teams Get all teams registered
 * @apiDescription Retrieve all teams registered
 * @apiPermission admin
 * @apiUse Header
 * @apiParam (Query) {Boolean} paticipants=false If you want include all the associated participants in the response
 * @apiParam (Query) {Boolean} category=true If you want include the associated category in the response
 * @apiParam (Query) {Boolean} manager=true If you want include the participant that manage the team in the response
 * @apiSuccess (Sucess 200) {Object[]} teams The array with all participants
 * @apiUse TeamsObject
 * @apiUse GenericAuthenticationError
 * @apiError (Error 4xx) {404} TEAMS_NOT_FOUND No team has been found
 * @apiError (Error 5xx) {500} TEAM_ERROR_INTERNAL_GET_ALL An internal error occurs
 */
router.get('/', authenticationAdmin, function(req, res, next) {
	const request = service_team.checkRequestGetTeams(req, res, next)
	const databaseParams = service_team.getDatabaseParameterGetTeams(request.params, request.query, request.body);

	Team.findAll(databaseParams)
		.then( teams => {
			if (teams) {
				res.status(200);
				res.send({
					"teams": utils.modelToJSON(teams)
				});
			} else {
				next(apiErrors.TEAMS_NOT_FOUND, req, res);
			}
		})
		.catch ( err => {
			next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_GET_ALL, err), req, res);
		})
});

/**
 * @apiGroup TEAM
 * @api {GET} /teams/:id Get a team
 * @apiDescription Get a particular team
 * @apiUse Header
 * @apiParam (Path) {String} id ``Mandatory`` The uuid of the team to retrieve
 * @apiParam (Query) {Boolean} paticipants=false If you want include all the associated participants in the response
 * @apiParam (Query) {Boolean} category=true If you want include the associated category in the response
 * @apiParam (Query) {Boolean} manager=true If you want include the participant that manage the team in the response
 * @apiSuccess (Sucess 200) {Object[]} team The team retrieved
 * @apiUse TeamObject
 * @apiUse GenericAuthenticationError
 * @apiError (Error 4xx) {404} TEAM_NOT_FOUND The team has not been found
 * @apiError (Error 5xx) {500} TEAM_ERROR_INTERNAL_GET_TEAM An internal error occurs
 */
router.get('/:id', authenticationUser, function(req, res, next) {
	// Check if the user has the rights
	service_team.checkIfTheUserMatchToTheId(req, res, next);

	const request = service_team.checkRequestGetTeam(req, res, next);
	const databaseParams = service_team.getDatabaseParameterGetTeam(request.params, request.query, request.body);

	Team.findOne(databaseParams)
		.then( team => {
			if (team) {
				res.status(200);
				res.send({
					"team": utils.modelToJSON(team)
				});
			} else {
				next(apiErrors.TEAM_NOT_FOUND, req, res);
			}
		})
		.catch( err => {
			console.log(err);
			next(apiErrors.TEAM_ERROR_INTERNAL_GET_TEAM, req, res);
		});
});

/**
 * @apiGroup TEAM
 * @api {POST} /teams Create a team
 * @apiDescription Create a new team with a manager
 * @apiSuccess (Sucess 201) {String} team_id The uuid of the team created
 * @apiUse Header
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
router.post('/', authenticationAdmin, function(req, res, next) {
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
												"team_id": team.get("team_id")
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

/**
 * @apiGroup TEAM
 * @api {PUT} /teams/:id Update a team
 * @apiDescription Update a team
 * @apiSuccess (Sucess 204) - No Content
 * @apiUse Header
 * @apiParam (Body) {Object} team The information of the team to create
 * @apiParam (Body) {String} team.team_name The name of the team to update
 * @apiParam (Body) {String} team.team_password The password of the team to update
 * @apiParam (Body) {String} team.category_id The uuid of the category associated to the team to update
 * @apiParam (Body) {String} team.manager_id The uuid of the participant manager of the team
 * @apiUse GenericAuthenticationError
 * @apiError (Error 4xx) {400} PARTICIPANT_ERROR_BAD_REQUEST_PUT_TEAM The manager cannot be associated to that team
 * @apiError (Error 4xx) {400} GENERIC_ERROR_REQUEST_FORMAT_ERROR Your request (body or query param) is wrong
 * @apiError (Error 4xx) {404} TEAM_NOT_FOUND The team does not exist
 * @apiError (Error 5xx) {500} TEAM_ERROR_INTERNAL_CHECK_TEAM An internal error occurs
 * @apiError (Error 5xx) {500} TEAM_ERROR_INTERNAL_PUT_TEAM An internal error occurs
 * @apiError (Error 5xx) {500} PARTICIPANT_ERROR_INTERNAL_NEW_PUT_TEAM An internal error occurs
 */
router.put('/:id', authenticationUser, function(req, res, next) {
	// Check if the user has the rights
	service_team.checkIfTheUserMatchToTheId(req, res, next);

	const request = service_team.checkRequestPutTeam(req, res, next);
	var teamUpdate = service_team.getDatabaseParameterPutTeamUpdateTeam(request.params, request.query, request.body);

	// STEP 1 - Retrieve the team to update
	Team.findOne({ where: { team_id: request.params.id } })
		.then(team => {
			// STEP 2 - Check if the team to update exists
			if (!team) {
				next(apiErrors.TEAM_NOT_FOUND, req, res);
			} else {
				// STEP 3.1 - Check if the team manager must be updated or not
				if (teamUpdate.hasOwnProperty('team_manager_id')) {
					Participant.findOne({ where: { participant_id: teamUpdate.team_manager_id } })
						.then(participant => {
							// STEP 4.1 - If the new team manager is in another team return an error, otherwise update the team
							if (participant.get("participant_team_id") == team.get("team_id")) {
								// STEP 5.1 - Update the team
								team.update(teamUpdate)
									.then(team2 => {
										res.status(204).end();
									})
									.catch(err => {
										next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_PUT_TEAM, err), req, res);
									});
							} else {
								next(apiErrors.PARTICIPANT_ERROR_BAD_REQUEST_PUT_TEAM, req, res);
							}
						})
						.catch(err => {
							next(new service_errors.InternalErrorObject(apiErrors.PARTICIPANT_ERROR_INTERNAL_NEW_PUT_TEAM, err), req, res);
						});
				// STEP 3.2 - If no team manager change, then update the team
				} else {
					// STEP 4.2 - Update the team
					team.update(teamUpdate)
						.then(team2 => {
							res.status(204).end();
						})
						.catch(err => {
							next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_PUT_TEAM, err), req, res);
						});
				}
			}
		})
		.catch( err => {
			next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_CHECK_TEAM, err), req, res)
		});
});

/**
 * @apiGroup TEAM
 * @api {DELETE} /teams/:id Delete a team
 * @apiDescription Delete a particular team
 * @apiPermission admin
 * @apiUse Header
 * @apiParam (Path) {String} id ``Mandatory`` The uuid of the team to delete
 * @apiSuccess (Sucess 204) - No content
 * @apiUse GenericAuthenticationError
 * @apiError (Error 4xx) {404} TEAM_NOT_FOUND The team has not been found
 * @apiError (Error 5xx) {500} TEAM_ERROR_INTERNAL_DELETE_TEAM An internal error occurs
 */
router.delete('/:id', authenticationAdmin, function(req, res, next) {
	const request = service_team.checkRequestDeleteTeams(req, res, next);
	var parameters = service_team.getDatabaseParameterDeleteTeam(request.params, request.query, request.body);

	Team.destroy(parameters)
		.then(result => {
			if (result > 0) {
				res.status(204).end();
			} else {
				next(apiErrors.TEAM_NOT_FOUND, req, res);
			}
		})
		.catch(err => {
			next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_DELETE_TEAM, err), res, res)
		});
});

module.exports = router;