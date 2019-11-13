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
var service_statistics = require('../services/service-statistics');
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
 * @apiGroup STATISTICS
 * @api {GET} /statistics/ Get the statistics about
 * @apiDescription Get the statistics about
 * @apiUse Header
 * @apiSuccess (Sucess 200) {Object[]} statistics The statistics
 * @apiUse GenericAuthenticationError
 * @apiError (Error 4xx) {404} TEAM_NOT_FOUND The team has not been found
 * @apiError (Error 5xx) {500} TEAM_ERROR_INTERNAL_GET_TEAM An internal error occurs
 */
router.get('/', authenticationAdmin, function(req, res, next) {

	Participant.findAll({
		attributes: {
			exclude: ['participant_medical_certificate', 'participant_student_certificate', 'participant_id']
		},
		include: {
			model: Team,
			as: 'team',
			attributes: ['team_id', 'team_name', 'team_valid'],
			include: [
				{
					model: Category,
					as: 'category',
					attributes: ['category_id', 'category_label', 'category_price_regular', 'category_price_student']
				}
			]
		}})
		.then(results => {

		})
		.catch(err => {
			next(new service_errors.InternalErrorObject(apiErrors.SATISTICS_ERROR_INTERNAL_EXPORT_DATABASE, err), res, res);
		});

});

/**
 * @apiGroup STATISTICS
 * @api {GET} /statistics/export-database Export the whole database
 * @apiDescription Get the csv
 * @apiSuccess (Sucess 200) {Object[]} database The array of raws retrieved (as an object)
 * @apiUse GenericAuthenticationError
 * @apiError (Error 5xx) {500} SATISTICS_ERROR_INTERNAL_EXPORT_DATABASE An internal error occurs
 */
router.get('/export-database', authenticationAdmin, function(req, res, next) {

	sequelize.query(service_statistics.getSQLJointureToExportTheWholeDatabase())
		.then(results => {
			res.send({
				"database": results[0]
			})
		})
		.catch(err => {
			next(new service_errors.InternalErrorObject(apiErrors.SATISTICS_ERROR_INTERNAL_EXPORT_DATABASE, err), res, res);
		});

});

module.exports = router;