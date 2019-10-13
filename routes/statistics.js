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
router.get('/', authenticationAdmin, function(req, res, next) {
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

module.exports = router;