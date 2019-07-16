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

router.get('/', authenticationAdmin, function(req, res, next) {
	const request = service_participant.checkRequestGetParticipants(req, res, next);
	var databaseRequest = service_participant.getDatabaseParameterGetParticipants(request.params, request.query, request.body);

	Participant.findAll(databaseRequest)
		.then( participant => {
			if (participant) {
				res.status(200);
				res.send(participant);
			} else {
				next(apiErrors.PARTICIPANTS_NOT_FOUND, req, res);
			}
		})
		.catch( err => {
			next(new service_errors.InternalErrorObject(apiErrors.PARTICIPANT_ERROR_INTERNAL_GET_PARTICIPANTS, err), req, res);
		});

});

router.get('/team/:id', authenticationUser, function(req, res, next) {
	const request = service_participant.checkRequestGetParticipantsTeam(req, res, next);
	var databaseRequest = service_participant.getDatabaseParameterGetParticipantsTeam(request.params, request.query, request.body);

	Participant.findAll(databaseRequest)
		.then(participants => {
			if (participants) {
				res.status(200);
				res.send(utils.modelToJSON(participants));
			} else {
				next(apiErrors.PARTICIPANTS_NOT_FOUND, req, res);
			}
		})
		.catch( err => {
			next(new service_errors.InternalErrorObject(apiErrors.PARTICIPANT_ERROR_INTERNAL_GET_PARTICIPANTS, err), res, res);
		});
});

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

router.put('/certificat/:id', authenticationUser, function(req, res, next) {

	if(req.is('application/json')){

		Participant.findOne({ where: {
				participant_id : req.params.id
			} })
			.then( result =>{

				if (result) {
					var participant = req.body.participant;

					if(result.participant_certificat_valide != 1) {
						fs.writeFile("public/certificats/" + result.participant_nom + '_' + result.participant_prenom + '_' + participant.participant_certificat_fichier + '.' + participant.extension, Buffer.from(participant.participant_certificat_buffer), function (err) {
							if (err) {
								return console.log(err);
							}
							console.log("The file was saved!");
						});

						result.update({
							participant_certificat_valide: 3,
							participant_certificat_fichier: result.participant_nom+'_'+result.participant_prenom+'_'+participant.participant_certificat_fichier+'.'+participant.extension
						})
							.then(result2 => {
								res.status(204).end();
							}).catch(err => {
							res.status(500);
							res.send({
								"error": "InternalServerError",
								"code": 500,
								"message": "Problem pour mettre à jour le participant : " + err
							});
						});
					}
				} else {
					res.status(202);
					res.send({
						"error": "NotFound",
						"code": 404,
						"message": "Le participant n'existe pas"
					});
				}
			})
			.catch( err =>{
				res.send({
					"error": "InternalServerError",
					"code": 500,
					"message": "Probleme pour vérifier l'existence de le participant"+err
				});
			});

	}else{
		res.status(406);
		res.send({
			"error": "BadContentType",
			"code": 406,
			"message": "Content-type received: "+req.get('Content-Type')+". Content-type required : application/json"
		});
	}

});

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