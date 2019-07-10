// ---------- IMPORTS ----------

// Middlewares and modules
var express = require('express');
var router = express.Router();
var uuidv4 = require('uuid/v4');
const synchronizedPromise = require('synchronized-promise');
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
	const request = service_team.checkRequestGetTeams(req, res, next)
	const databaseParams = service_team.getDatabaseParameterGetTeams(request.params, request.query, request.body);

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
	service_team.checkIfTheUserMatchToTheId(req, res, next);

	const request = service_team.checkRequestGetTeam(req, res, next);
	const databaseParams = service_team.getDatabaseParameterGetTeam(request.params, request.query, request.body);

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
});

router.post('/', authenticationAdmin, function(req, res, next) {
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
												"team_id": team.get("team_id")
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
				next(apiErrors.TEAM_NOT_FOUND_GET_TEAM, req, res);
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
										next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_NEW_PUT_TEAM, err), req, res);
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
							next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_NEW_PUT_TEAM, err), req, res);
						});
				}
			}
		})
		.catch( err => {
			next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_CHECK_POST_TEAM, err), req, res)
		});
});

router.delete('/:id', authenticationAdmin, function(req, res, next) {
	const request = service_team.checkRequestDeleteTeams(req, res, next);
	var parameters = service_team.getDatabaseParameterDeleteTeam(request.params, request.query, request.body);

	Team.destroy(parameters)
		.then(result => {
			if (result > 0) {
				res.status(204).end();
			} else {
				next(apiErrors.TEAM_NOT_FOUND_GET_TEAM, req, res);
			}
		})
		.catch(err => {
			next(new service_errors.InternalErrorObject(apiErrors.TEAM_ERROR_INTERNAL_DELETE_TEAMS, err), res, res)
		});
});

module.exports = router;