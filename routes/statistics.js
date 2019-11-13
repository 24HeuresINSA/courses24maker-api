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
 * @api {GET} /statistics/ Get many statistics
 * @apiDescription Get the statistics about teams, participants and revenues
 * @apiUse Header
 * @apiSuccess (Success 200) {Object} statistics The statistics
 * @apiSuccess (Success 200) {Number} statistics.teams_total The total number of the registered teams
 * @apiSuccess (Success 200) {Number} statistics.teams_valid The total number of the registered teams that have been validated
 * @apiSuccess (Success 200) {Number} statistics.teams_to_check The total number of the registered teams that need to be checked
 * @apiSuccess (Success 200) {Number} statistics.teams_rejected The total number of the registered teams that have been rejected
 * @apiSuccess (Success 200) {Number} statistics.teams_incomplete The total number of the registered teams that are incomplete
 * @apiSuccess (Success 200) {Number} statistics.participants_total The total number of the registered participants
 * @apiSuccess (Success 200) {Number} statistics.participants_complete The total number of the registered participants who have paid and uploaded the certificates
 * @apiSuccess (Success 200) {Number} statistics.participants_incomplete The total number of the registered participants who have not fulfill requirements
 * @apiSuccess (Success 200) {Number} statistics.revenues_expected The total amount of revenues expected if all participants will pay
 * @apiSuccess (Success 200) {Number} statistics.revenues_provided The total amount of revenues provided and validated
 * @apiSuccess (Success 200) {Number} statistics.revenues_missing The total amount of revenues that has not been received yet
 * @apiSuccess (Success 200) {Object[]} statistics.categories_statistics_details The array of object that contains the same statistics as above detailed by category
 * @apiSuccess (Success 200) {Number}statistics.categories_statistics_details.category_teams_total The total number of the registered teams
 * @apiSuccess (Success 200) {Number} statistics.categories_statistics_details.category_teams_valid The total number of the registered teams that have been validated
 * @apiSuccess (Success 200) {Number} statistics.categories_statistics_details.category_teams_to_check The total number of the registered teams that need to be checked
 * @apiSuccess (Success 200) {Number} statistics.categories_statistics_details.category_teams_rejected The total number of the registered teams that have been rejected
 * @apiSuccess (Success 200) {Number} statistics.categories_statistics_details.category_teams_incomplete The total number of the registered teams that are incomplete
 * @apiSuccess (Success 200) {Number} statistics.categories_statistics_details.category_participants_total The total number of the registered participants
 * @apiSuccess (Success 200) {Number} statistics.categories_statistics_details.category_participants_complete The total number of the registered participants who have paid and uploaded the certificates
 * @apiSuccess (Success 200) {Number} statistics.categories_statistics_details.category_participants_incomplete The total number of the registered participants who have not fulfill requirements
 * @apiSuccess (Success 200) {Number} statistics.categories_statistics_details.category_revenues_expected The total amount of revenues expected if all participants will pay
 * @apiSuccess (Success 200) {Number} statistics.categories_statistics_details.category_revenues_provided The total amount of revenues provided and validated
 * @apiSuccess (Success 200) {Number} statistics.categories_statistics_details.category_revenues_missing The total amount of revenues that has not been received yet
 * @apiUse GenericAuthenticationError
 * @apiError (Error 5xx) {500} SATISTICS_ERROR_INTERNAL_GET_STATISTICS An internal error occurs
 */
router.get('/', authenticationAdmin, function(req, res, next) {

    var participantsPromise = service_statistics.getParticipantsPromise();
    var categoriesPromise = service_statistics.getCategoriesPromise();
    var teamsPromise = service_statistics.getTeamsPromise();

		Promise.all([participantsPromise, categoriesPromise, teamsPromise])
            .then(results => {

		    var participantsRows = results[0];
		    var categoriesRows = results[1];
		    var teamsRows = results[2];
		    var stats = {};
		    var categoriesStatisticsDetailsArray = [];

            var teams_total = 0;
            var teams_valid = 0;
            var teams_to_check = 0;
            var teams_rejected = 0;
            var teams_incomplete = 0;
            var participants_total = 0;
            var participants_complete = 0;
            var participants_incomplete = 0;
            var revenues_expected = 0;
            var revenues_provided = 0;
            var revenues_missing = 0;

            // Compute statistics for each category...
		    for (index in categoriesRows) {
		        var category_teams_total = 0;
		        var category_teams_valid = 0;
		        var category_teams_to_check = 0;
		        var category_teams_rejected = 0;
		        var category_teams_incomplete = 0;
                var category_participants_total = 0;
                var category_participants_complete = 0;
                var category_participants_incomplete = 0;
                var category_revenues_expected = 0;
                var category_revenues_provided = 0;
                var category_revenues_missing = 0;

                participantsRows
                    .filter(participant => participant['participant_team.team_category.category_id'] == categoriesRows[index].category_id)
                    .forEach(participant => {
                        // Compute participants statistics
                        category_participants_total++;
                        if (participant.participant_payment == 1
                            && participant.participant_medical_certificate_valid == 1
                            && (participant.participant_student_certificate_valid == 1 || participant.participant_student_certificate_valid == 4)) {
                            category_participants_complete++;
                        } else {
                            category_participants_incomplete++;
                        }

                        // Compute payment and revenues statistics
                        if (participant.participant_student == 1) {
                            category_revenues_expected += categoriesRows[index].category_price_student;
                            if (participant.participant_payment == 1) {
                                category_revenues_provided += categoriesRows[index].category_price_student;
                            } else {
                                category_revenues_missing += categoriesRows[index].category_price_student;
                            }
                        } else {
                            category_revenues_expected += categoriesRows[index].category_price_regular;
                            if (participant.participant_payment == 1) {
                                category_revenues_provided += categoriesRows[index].category_price_regular;
                            } else {
                                category_revenues_missing += categoriesRows[index].category_price_regular;
                            }
                        }
                    });

                // Compute teams statistics
                teamsRows.filter(team => team.team_category_id == categoriesRows[index].category_id)
                    .forEach(team => {
                        category_teams_total++;
                        if (team.team_valid == 0) {
                            category_teams_to_check++
                        } else if (team.team_valid == 1) {
                            category_teams_valid++;
                        } else if (team.team_valid == 2) {
                            category_teams_rejected++;
                        } else if (team.team_valid == 3) {
                            category_teams_incomplete++;
                        }
                    });

                //  ...and put it an array
		        categoriesStatisticsDetailsArray.push({
                    "category_id": categoriesRows[index].category_id,
                    "category_label": categoriesRows[index].category_label,
                    "category_teams_total": category_teams_total,
                    "category_teams_valid": category_teams_valid,
                    "category_teams_to_check": category_teams_to_check,
                    "category_teams_rejected": category_teams_rejected,
                    "category_teams_incomplete": category_teams_incomplete,
                    "category_participants_total": category_participants_total,
                    "category_participants_complete": category_participants_complete,
                    "category_participants_incomplete": category_participants_incomplete,
                    "category_revenues_expected": category_revenues_expected,
                    "category_revenues_provided": category_revenues_provided,
                    "category_revenues_missing": category_revenues_missing
                });

		        // Incrementation to calculate the total for each statistics from all the categories
                teams_total += category_teams_total;
                teams_valid += category_teams_valid;
                teams_to_check += category_teams_to_check;
                teams_rejected += category_teams_rejected;
                teams_incomplete += category_teams_incomplete;
                participants_total += category_participants_total;
                participants_complete += category_participants_complete;
                participants_incomplete += category_participants_incomplete;
                revenues_expected += category_revenues_expected;
                revenues_provided += category_revenues_provided;
                revenues_missing += category_revenues_missing;
            }

		    stats["teams_total"] = teams_total;
		    stats["teams_valid"] = teams_valid;
		    stats["teams_to_check"] = teams_to_check;
		    stats["teams_rejected"] = teams_rejected;
		    stats["teams_incomplete"] = teams_incomplete;
		    stats["participants_total"] = participants_total;
		    stats["participants_complete"] = participants_complete;
		    stats["participants_incomplete"] = participants_incomplete;
		    stats["revenues_expected"] = revenues_expected;
		    stats["revenues_provided"] = revenues_provided;
		    stats["revenues_missing"] = revenues_missing;
		    stats["categories_statistics_details"] = categoriesStatisticsDetailsArray;

            res.send({
                "statistics": stats
            });
		})
		.catch(err => {
			next(new service_errors.InternalErrorObject(apiErrors.SATISTICS_ERROR_INTERNAL_EXPORT_DATABASE, err), res, res);
		});

});

/**
 * @apiGroup STATISTICS
 * @api {GET} /statistics/export-database Export the whole database
 * @apiDescription Get the csv
 * @apiSuccess (Success 200) {Object[]} database The array of raws retrieved (as an object)
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