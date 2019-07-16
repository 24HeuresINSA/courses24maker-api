// ---------- IMPORT ----------

// Middlewares and modules
var express = require('express');
var router = express.Router();
var passport = require('passport');
var uuidv4 = require('uuid/v4');
const fs = require('fs');
var sequelize = require('../config/config-database').sequelize;

// Configuration files
var config_authentication = require('../config/config-authentication.json');
const {authenticationAdmin} = require("../config/config-authentication");
const {authenticationUser} = require("../config/config-authentication");

// Service files
var service_participant = require('../services/service-participant');
var service_errors = require('../services/service-errors');
var apiErrors = service_errors.apiErrors;
var utils = require('../services/utils');

// Models
var Category = sequelize.import('../models/category');
var Team = sequelize.import('../models/team');
var Participant = sequelize.import('../models/participant');
Participant.belongsTo(Team, {as: 'participant_team', foreignKey: 'participant_team_id', targetKey:'team_id'});

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
 * @apiDefine ParticipantsObject
 * @apiSuccess (Sucess 200) {String} participants.participant_id The uuid of the participant
 * @apiSuccess (Sucess 200) {String} participants.participant_name The name of the participant
 * @apiSuccess (Sucess 200) {String} participants.participant_surname The surname of the participant
 * @apiSuccess (Sucess 200) {String} participants.participant_birthdate The birthdate of the participant (YYYY-MM-DD)
 * @apiSuccess (Sucess 200) {String} participants.participant_team_id The uuid of the associate team
 * @apiSuccess (Sucess 200) {Boolean} participants.participant_student If the participant is a student (1) or not (0)
 * @apiSuccess (Sucess 200) {Boolean} participants.participant_medical_certificate_valid If the participant has uploaded a valid certificate (1) or not (0)
 * @apiSuccess (Sucess 200) {String} participants.participant_medical_certificate_file The path file of the medical certificate
 * @apiSuccess (Sucess 200) {Boolean} participants.participant_payment If the participant has already paid (1) or not (0)
 * @apiSuccess (Sucess 200) {String} participants.participant_tee_shirt_size The size for the tee shirt of the participant
 * @apiSuccess (Sucess 200) {String} participants.participant_comment The comment the participant can send
 * @apiSuccess (Sucess 200) {String} participants.participant_message The message send by the admin to the participant
 * @apiSuccess (Sucess 200) {String} participants.participant_telephone The phone number of the participant
 * @apiSuccess (Sucess 200) {String} participants.participant_email The email of the participant
 * @apiSuccess (Sucess 200) {Object} participants.participant_team The team object associated to the participant (If team query param ``true``)
 * @apiSuccess (Sucess 200) {String} participants.participant_team.team_id The uuid of the team
 * @apiSuccess (Sucess 200) {String} participants.participant_team.team_name The name of the team
 * @apiSuccess (Sucess 200) {String} participants.participant_team.team_valid If the team is valid (1) or not (0)
 * @apiSuccess (Sucess 200) {Object} participants.participant_team.team_category The category object associated to the team
 * @apiSuccess (Sucess 200) {String} participants.participant_team.team_category.category_id The uuid of the category
 * @apiSuccess (Sucess 200) {String} participants.participant_team.team_category.category_label The label of the category
 * @apiSuccess (Sucess 200) {Date} cratedAt The creation date of the participant raw
 * @apiSuccess (Sucess 200) {Date} updatedAt The last date update of the participant raw
 */
/**
 * @apiDefine ParticipantObject
 * @apiSuccess (Sucess 200) {String} participant.participant_id The uuid of the participant
 * @apiSuccess (Sucess 200) {String} participant.participant_name The name of the participant
 * @apiSuccess (Sucess 200) {String} participant.participant_surname The surname of the participant
 * @apiSuccess (Sucess 200) {String} participant.participant_birthdate The birthdate of the participant (YYYY-MM-DD)
 * @apiSuccess (Sucess 200) {String} participant.participant_team_id The uuid of the associate team
 * @apiSuccess (Sucess 200) {Boolean} participant.participant_student If the participant is a student (1) or not (0)
 * @apiSuccess (Sucess 200) {Boolean} participant.participant_medical_certificate_valid If the participant has uploaded a valid certificate (1) or not (0)
 * @apiSuccess (Sucess 200) {String} participant.participant_medical_certificate_file The path file of the medical certificate
 * @apiSuccess (Sucess 200) {Boolean} participant.participant_payment If the participant has already paid (1) or not (0)
 * @apiSuccess (Sucess 200) {String} participant.participant_tee_shirt_size The size for the tee shirt of the participant
 * @apiSuccess (Sucess 200) {String} participant.participant_comment The comment the participant can send
 * @apiSuccess (Sucess 200) {String} participant.participant_message The message send by the admin to the participant
 * @apiSuccess (Sucess 200) {String} participant.participant_telephone The phone number of the participant
 * @apiSuccess (Sucess 200) {String} participant.participant_email The email of the participant
 * @apiSuccess (Sucess 200) {Object} participant.participant_team The team object associated to the participant (If team query param ``true``)
 * @apiSuccess (Sucess 200) {String} participant.participant_team.team_id The uuid of the team
 * @apiSuccess (Sucess 200) {String} participant.participant_team.team_name The name of the team
 * @apiSuccess (Sucess 200) {String} participant.participant_team.team_valid If the team is valid (1) or not (0)
 * @apiSuccess (Sucess 200) {Object} participant.participant_team.team_category The category object associated to the team
 * @apiSuccess (Sucess 200) {String} participant.participant_team.team_category.category_id The uuid of the category
 * @apiSuccess (Sucess 200) {String} participant.participant_team.team_category.category_label The label of the category
 * @apiSuccess (Sucess 200) {Date} cratedAt The creation date of the participant raw
 * @apiSuccess (Sucess 200) {Date} updatedAt The last date update of the participant raw
 */

/**
 * @apiGroup PARTICIPANT
 * @api {GET} /participants Get all participants
 * @apiDescription Retrieve all participants registered
 * @apiPermission admin
 * @apiUse Header
 * @apiParam (Query) {Boolean} team=false If you want include the associated team in the response
 * @apiSuccess (Sucess 200) {Object[]} participants The array with all participants
 * @apiUse ParticipantsObject
 * @apiUse GenericAuthenticationError
 * @apiError (Error 4xx) {404} PARTICIPANTS_NOT_FOUND No participant has been found
 * @apiError (Error 5xx) {500} PARTICIPANT_ERROR_INTERNAL_GET_PARTICIPANTS An internal error occurs
 */
router.get('/', authenticationAdmin, function(req, res, next) {
	const request = service_participant.checkRequestGetParticipants(req, res, next);
	var databaseRequest = service_participant.getDatabaseParameterGetParticipants(request.params, request.query, request.body);

	Participant.findAll(databaseRequest)
		.then( participant => {
			if (participant) {
				res.status(200);
				res.send({
					"participants": utils.modelToJSON(participant)
				});
			} else {
				next(apiErrors.PARTICIPANTS_NOT_FOUND, req, res);
			}
		})
		.catch( err => {
			next(new service_errors.InternalErrorObject(apiErrors.PARTICIPANT_ERROR_INTERNAL_GET_PARTICIPANTS, err), req, res);
		});

});

/**
 * @apiGroup PARTICIPANT
 * @api {GET} /participants/team/:id Get all participants of a team
 * @apiDescription Retrieve all participants registered in a particular team
 * @apiUse Header
 * @apiParam (Path) {String} id The uuid of the team for which you want retrieve the participants
 * @apiParam (Query) {Boolean} team=false If you want include the associated team in the response
 * @apiSuccess {Object[]} participants The array with all participants
 * @apiUse ParticipantsObject
 * @apiUse GenericAuthenticationError
 * @apiError (Error 4xx) {404} PARTICIPANTS_NOT_FOUND No participant has been found for this team
 * @apiError (Error 5xx) {500} PARTICIPANT_ERROR_INTERNAL_GET_PARTICIPANTS An internal error occurs
 */
router.get('/team/:id', authenticationUser, function(req, res, next) {
	const request = service_participant.checkRequestGetParticipantsTeam(req, res, next);
	var databaseRequest = service_participant.getDatabaseParameterGetParticipantsTeam(request.params, request.query, request.body);

	Participant.findAll(databaseRequest)
		.then(participants => {
			if (participants) {
				res.status(200);
				res.send({
					"participants": utils.modelToJSON(participants)
				});
			} else {
				next(apiErrors.PARTICIPANTS_NOT_FOUND, req, res);
			}
		})
		.catch( err => {
			next(new service_errors.InternalErrorObject(apiErrors.PARTICIPANT_ERROR_INTERNAL_GET_PARTICIPANTS, err), res, res);
		});
});

/**
 * @apiGroup PARTICIPANT
 * @api {GET} /participants/:id Get a participant
 * @apiDescription Retrieve a particular participant
 * @apiUse Header
 * @apiParam (Path) {String} id ``Mandatory`` id The uuid of the participant to retrieve
 * @apiSuccess (Sucess 200) {Object} participant The participant retrieved
 * @apiUse ParticipantObject
 * @apiUse GenericAuthenticationError
 * @apiError (Error 4xx) {404} PARTICIPANT_NOT_FOUND No participant has been found
 * @apiError (Error 5xx) {500} PARTICIPANT_ERROR_INTERNAL_GET_PARTICIPANT An internal error occurs
 */
router.get('/:id', authenticationUser, function(req, res, next) {
	var isAdminScope = req.user.scope == config_authentication["admin-jwt-scope"];
	var isUserScope = req.user.scope == config_authentication["user-jwt-scope"];
	const request = service_participant.checkRequestGetParticipant(req, res, next);
	var databaseParameters = service_participant.getDatabaseParameterGetParticipant(request.params, request.query, request.body);

	Participant.findOne(databaseParameters)
		.then(participant => {
			if (participant) {
				if (isAdminScope || (isUserScope && participant.get("participant_team_id") == req.user.team.team_id)) {
					res.status(200);
					res.send({
						"participant": utils.modelToJSON(participant)
					});
				} else {
					next(apiErrors.AUTHENTICATION_ERROR_FORBIDDEN, req, res);
				}
			} else {
				next(apiErrors.PARTICIPANT_NOT_FOUND, req, res);
			}
		})
		.catch( err => {
			next(new service_errors.InternalErrorObject(apiErrors.PARTICIPANT_ERROR_INTERNAL_GET_PARTICIPANT, err), req, res);;
		});

});

/**
 * @apiGroup PARTICIPANT
 * @api {GET} /participants/medical-certificate/:id Get a the medical certificate of a participant
 * @apiDescription Retrieve the medical certificate file Base64 encoded of a participant
 * @apiUse Header
 * @apiParam (Path) {String} id ``Mandatory``The uuid of the participant for which you want retrieve the medical certificate
 * @apiSuccess (Sucess 200) {String} participant_medical_certificate The medical certificate file Base64 encoded
 * @apiUse GenericAuthenticationError
 * @apiError (Error 4xx) {404} PARTICIPANT_NOT_FOUND No participant has been found
 * @apiError (Error 5xx) {500} PARTICIPANT_ERROR_INTERNAL_GET_PARTICIPANT An internal error occurs
 */
router.get('/medical-certificate/:id', authenticationUser, function(req, res, next) {
	var isAdminScope = req.user.scope == config_authentication["admin-jwt-scope"];
	var isUserScope = req.user.scope == config_authentication["user-jwt-scope"];
	const request = service_participant.checkRequestGetParticipantCertificate(req, res, next);
	var databaseParameters = service_participant.getDatabaseParameterGetParticipantCertificate(request.params, request.query, request.body);

	Participant.findOne(databaseParameters)
		.then(participant => {
			if (participant) {
				if (isAdminScope || (isUserScope && participant.get("participant_team_id") == req.user.team.team_id)) {
					res.status(200);
					res.send(utils.modelToJSON(participant));
				} else {
					next(apiErrors.AUTHENTICATION_ERROR_FORBIDDEN, req, res);
				}
			} else {
				next(apiErrors.PARTICIPANT_NOT_FOUND, req, res);
			}
		})
		.catch( err => {
			next(new service_errors.InternalErrorObject(apiErrors.PARTICIPANT_ERROR_INTERNAL_GET_PARTICIPANT, err), req, res);;
		});

});

/**
 * @apiGroup PARTICIPANT
 * @api {POST} /participants/ Create a participant
 * @apiDescription Create or register a participant
 * @apiUse Header
 * @apiParam (Body) {Object} The participant you want to create
 * @apiParam (Body) {String} participant.participant_name ``Mandatory`` The name of the participant
 * @apiParam (Body) {String} participant.participant_surname ``Mandatory`` The surname of the participant
 * @apiParam (Body) {String} participant.participant_birthdate ``Mandatory`` The birthdate of the participant (YYYY-MM-DD)
 * @apiParam (Body) {String} participant.participant_team_id The uuid of the associate team
 * @apiParam (Body) {Boolean} participant.participant_student If the participant is a student (1) or not (0)
 * @apiParam (Body) {String} participant.participant_medical_certificate The certificate file in the .jpg, .png or .pdf extension and base64 encoded
 * @apiParam (Body) {Boolean} participant.participant_medical_certificate_valid If the participant has uploaded a valid certificate (1) or not (0)
 * @apiParam (Body) {String} participant.participant_medical_certificate_file The path file of the medical certificate
 * @apiParam (Body) {Boolean} participant.participant_payment If the participant has already paid (1) or not (0)
 * @apiParam (Body) {String} participant.participant_tee_shirt_size The size for the tee shirt of the participant
 * @apiParam (Body) {String} participant.participant_comment The comment the participant can send
 * @apiParam (Body) {String} participant.participant_message The message send by the admin to the participant
 * @apiParam (Body) {String} participant.participant_telephone ``Mandatory`` The phone number of the participant
 * @apiParam (Body) {String} participant.participant_email ``Mandatory`` The email of the participant
 * @apiSuccess (Sucess 201) {String} participant_id The uuid of the participant created
 * @apiUse GenericAuthenticationError
 * @apiError (Error 4xx) {400} GENERIC_ERROR_REQUEST_FORMAT_ERROR Your request (body or query param) is wrong
 * @apiError (Error 4xx) {409} PARTICIPANT_ALREADY_EXISTS A participant with the same name, surname and birthdate already exists
 * @apiError (Error 5xx) {500} PARTICIPANT_ERROR_INTERNAL_POST_PARTICIPANT An internal error occurs
 */
router.post('/', authenticationUser, function(req, res, next) {
	const request = service_participant.checkRequestPostParticipant(req, res, next);
	var databaseParameters = service_participant.getDatabaseParameterPostParticipant(request.params, request.query, request.body);

	Participant.findOne({ where: {
			participant_name: databaseParameters.participant_name,
			participant_surname: databaseParameters.participant_surname,
			participant_birthdate: databaseParameters.participant_birthdate,
		}})
		.then(participant => {
			if(!participant){
				Participant.create(databaseParameters)
					.then(participant2 => {
						res.status(201);
						res.send({
							"participant_id" : participant2.get("participant_id")
						});
					})
					.catch( err =>{
						next(service_errors.InternalErrorObject(apiErrors.PARTICIPANT_ERROR_INTERNAL_POST_PARTICIPANT, err), req, res);
					});
			}else{
				next(apiErrors.PARTICIPANT_ALREADY_EXISTS, req, res);
			}
		})
		.catch( err =>{
			next(new service_errors.InternalErrorObject(apiErrors.PARTICIPANT_ERROR_INTERNAL_CHECK_PARTICIPANT, err), req, res);
		});
});

/**
 * @apiGroup PARTICIPANT
 * @api {PUT} /participants/:id Update a participant
 * @apiDescription Update some information about a participant
 * @apiUse Header
 * @apiParam (Path) {String} id ``Mandatory`` The uuid of the participant to update
 * @apiParam (Body) {Object} The participant object with the information to update
 * @apiParam (Body) {String} participant.participant_name The name of the participant
 * @apiParam (Body) {String} participant.participant_surname The surname of the participant
 * @apiParam (Body) {String} participant.participant_birthdate The birthdate of the participant (YYYY-MM-DD)
 * @apiParam (Body) {String} participant.participant_team_id The uuid of the associate team
 * @apiParam (Body) {Boolean} participant.participant_student If the participant is a student (1) or not (0)
 * @apiParam (Body) {Boolean} participant.participant_medical_certificate The certificate file in the .jpg, .png or .pdf extension and base64 encoded
 * @apiParam (Body) {Boolean} participant.participant_medical_certificate_valid If the participant has uploaded a valid certificate (1) or not (0)
 * @apiParam (Body) {String} participant.participant_medical_certificate_file The path file of the medical certificate
 * @apiParam (Body) {Boolean} participant.participant_payment If the participant has already paid (1) or not (0)
 * @apiParam (Body) {String} participant.participant_tee_shirt_size The size for the tee shirt of the participant
 * @apiParam (Body) {String} participant.participant_comment The comment the participant can send
 * @apiParam (Body) {String} participant.participant_message The message send by the admin to the participant
 * @apiParam (Body) {String} participant.participant_telephone The phone number of the participant
 * @apiParam (Body) {String} participant.participant_email The email of the participant
 * @apiSuccess (Sucess 204) (Sucess 204) - No content
 * @apiUse GenericAuthenticationError
 * @apiError (Error 4xx) {400} GENERIC_ERROR_REQUEST_FORMAT_ERROR Your request (body or query param) is wrong
 * @apiError (Error 4xx) {404} PARTICIPANT_NOT_FOUND The participant has not be found in the database
 * @apiError (Error 5xx) {500} PARTICIPANT_ERROR_INTERNAL_PUT_PARTICIPANT An internal error occurs
 * @apiError (Error 5xx) {500} PARTICIPANT_ERROR_INTERNAL_CHECK_PARTICIPANT An internal error occurs
 */
router.put('/:id', authenticationUser, function(req, res, next) {
	const isUserScope = req.user.scope == config_authentication["user-jwt-scope"];
	const isAdminScope = req.user.scope == config_authentication["admin-jwt-scope"];
	const request = service_participant.checkRequestPutParticipant(req, res, next);
	var databaseParameters = service_participant.getDatabaseParameterPutParticipant(request.params, request.query, request.body);

	// STEP 1 - Retrieve the participant to update
	Participant.findOne({ where: { participant_id: request.params.id} })
		.then(participant => {
			// STEP 2 - Check if the participant to update exists
			if (!participant) {
				next(apiErrors.PARTICIPANT_NOT_FOUND, req, res);
			} else {
				// STEP 3 - Check if the participant can be update by the user or not
				if (isAdminScope || (isUserScope && participant.get("participant_team_id") == req.user.team.team_id)) {
					participant.update(databaseParameters)
						.then(participant2 => {
							res.status(204).end();
						})
						.catch( err =>{
							next(service_errors.InternalErrorObject(apiErrors.PARTICIPANT_ERROR_INTERNAL_PUT_PARTICIPANT, err), req, res);
						});
				} else {
					next(apiErrors.AUTHENTICATION_ERROR_FORBIDDEN, req, res);
				}
			}
		})
		.catch( err =>{
			next(new service_errors.InternalErrorObject(apiErrors.PARTICIPANT_ERROR_INTERNAL_CHECK_PARTICIPANT, err), req, res);
		});
});

/**
 * @apiGroup PARTICIPANT
 * @api {DELETE} /participants/:id Delete a participant
 * @apiDescription Delete a participant
 * @apiUse Header
 * @apiParam (Path) {String} id ``Mandatory`` The uuid of the participant to delete
 * @apiSuccess (Sucess 204) - No content
 * @apiUse GenericAuthenticationError
 * @apiError (Error 4xx) {404} PARTICIPANT_NOT_FOUND The participant has not be found in the database
 * @apiError (Error 5xx) {500} PARTICIPANT_ERROR_INTERNAL_DELETE_PARTICIPANT An internal error occurs
 * @apiError (Error 5xx) {500} PARTICIPANT_ERROR_INTERNAL_CHECK_PARTICIPANT An internal error occurs
 */
router.delete('/:id', authenticationUser, function(req, res, next) {
	const isUserScope = req.user.scope == config_authentication["user-jwt-scope"];
	const isAdminScope = req.user.scope == config_authentication["admin-jwt-scope"];
	const request = service_participant.checkRequestDeleteParticipant(req, res, next);
	var parameters = service_participant.getDatabaseParameterDeleteParticipant(request.params, request.query, request.body);

	// STEP 1 - Retrieve the participant and check if he is in the same team as the user
	Participant.findOne({ where: {participant_id: request.params.id} })
		.then(participant => {
			if (!participant) {
				next(apiErrors.PARTICIPANT_NOT_FOUND, req, res);
			} else {
				if (isAdminScope || (isUserScope && participant.get("participant_team_id") == req.user.team.team_id)) {
					// STEP 2 - If the participant is in the same team, it can be removed
					Participant.destroy(parameters)
						.then(result => {
							if (result > 0) {
								res.status(204).end();
							} else {
								next(apiErrors.PARTICIPANT_NOT_FOUND, req, res);
							}
						})
						.catch(err => {
							next(new service_errors.InternalErrorObject(apiErrors.PARTICIPANT_ERROR_INTERNAL_DELETE_PARTICIPANT, err), req, res);
						});
				} else {
					next(apiErrors.AUTHENTICATION_ERROR_FORBIDDEN, req, res);
				}
			}
		})
		.catch(err => {
			next(new service_errors.InternalErrorObject(apiErrors.PARTICIPANT_ERROR_INTERNAL_CHECK_PARTICIPANT, err), req, res);
		});


});

module.exports = router;