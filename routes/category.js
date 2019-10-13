// ---------- IMPORT ----------

// Middlewares and modules
var express = require('express');
var router = express.Router();
var sequelize = require('../config/config-database').sequelize;

// Configuration files
const {authenticationAdmin} = require("../config/config-authentication");
const {authenticationUser} = require("../config/config-authentication");

// Service files
var service_category = require('../services/service-category');
var service_errors = require('../services/service-errors');
var apiErrors = service_errors.apiErrors;
const utils = require('../services/utils');

// Models
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
 * @apiDefine CategoriesObject
 * @apiSuccess (Sucess 200) {String} categories.category_id The uuid of the category of the race
 * @apiSuccess (Sucess 200) {String} categories.category_label The label of the category of the race
 * @apiSuccess (Sucess 200) {String} categories.category_description The description of the category of the race
 * @apiSuccess (Sucess 200) {String} categories.category_nb_max The max number of participant that can be in a team of that category of the race
 * @apiSuccess (Sucess 200) {Boolean} categories.category_full If the category is full (1) or not (0)
 * @apiSuccess (Sucess 200) {String} categories.category_type The type of the category of the race
 * @apiSuccess (Sucess 200) {String} categories.category_nb_total The total number of participant of that category of the race
 * @apiSuccess (Sucess 200) {String} categories.category_price_regular The regular price of the category
 * @apiSuccess (Sucess 200) {String} categories.category_price_student The student price of the category
 * @apiSuccess (Sucess 200) {Date} cratedAt The creation date of the category raw
 * @apiSuccess (Sucess 200) {Date} updatedAt The last date update of the category raw
 */
/**
 * @apiDefine CategoryObject
 * @apiSuccess (Sucess 200) {String} category.category_id The uuid of the category of the race
 * @apiSuccess (Sucess 200) {String} category.category_label The label of the category of the race
 * @apiSuccess (Sucess 200) {String} category.category_description The description of the category of the race
 * @apiSuccess (Sucess 200) {String} category.category_nb_max The max number of participant that can be in a team of that category of the race
 * @apiSuccess (Sucess 200) {Boolean} category.category_full If the category is full (1) or not (0)
 * @apiSuccess (Sucess 200) {String} category.category_type The type of the category of the race
 * @apiSuccess (Sucess 200) {String} category.category_nb_total The total number of participant of that category of the race
 * @apiSuccess (Sucess 200) {String} category.category_price_regular The regular price of the category
 * @apiSuccess (Sucess 200) {String} category.category_price_student The student price of the category
 * @apiSuccess (Sucess 200) {Date} cratedAt The creation date of the category raw
 * @apiSuccess (Sucess 200) {Date} updatedAt The last date update of the category raw
 */

/**
 * @apiGroup CATEGORY
 * @api {GET} /categories Get all categories
 * @apiDescription Retrieve all categories recorded
 * @apiUse Header
 * @apiSuccess (Sucess 200) {Object[]} categories The array with all categories
 * @apiUse CategoriesObject
 * @apiUse GenericAuthenticationError
 * @apiError (Error 4xx) {404} CATEGORIES_NOT_FOUND No category has been found
 * @apiError (Error 5xx) {500} CATEGORY_ERROR_INTERNAL_GET_CATEGORIES An internal error occurs
 */
router.get('/', authenticationUser, function(req, res, next) {
	Category.findAll({ order:[['category_label','DESC']] })
		.then( categories => {
			if (categories) {
				res.header("Access-Control-Allow-Origin", "*");
				res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
				res.status(200);
				res.send({
					"categories": utils.modelToJSON(categories)
				});
			} else {
				next(apiErrors.CATEGORIES_NOT_FOUND, req, res);
			}
		})
		.catch( err => {
			next(apiErrors.CATEGORY_ERROR_INTERNAL_GET_CATEGORIES, res ,res);
		});
});

/**
 * @apiGroup CATEGORY
 * @api {GET} /categories/:id Get a category
 * @apiDescription Get a category
 * @apiUse Header
 * @apiParam (Path) {String} id ``Mandatory`` The uuid of the category to retrieve
 * @apiSuccess (Sucess 200) {Object[]} category The information about the category
 * @apiUse CategoriesObject
 * @apiUse GenericAuthenticationError
 * @apiError (Error 4xx) {404} CATEGORY_NOT_FOUND The category has not been found
 * @apiError (Error 5xx) {500} CATEGORY_ERROR_INTERNAL_GET_CATEGORY An internal error occurs
 */
router.get('/:id', authenticationUser, function(req, res, next) {
	const request = service_category.checkRequestGetCategory(req, res, next);
	const databaseParams = service_category.getDatabaseParameterGetCategory(request.params, request.query, request.body);

	Category.findOne(databaseParams)
		.then(category => {
			if (category) {
				res.status(200);
				res.send({
					"category": utils.modelToJSON(category)
				});
			} else {
				next(apiErrors.CATEGORY_NOT_FOUND, req, res);
			}
		})
		.catch( err => {
			next(new service_errors.InternalErrorObject(apiErrors.CATEGORY_ERROR_INTERNAL_GET_CATEGORY, err), req, res);
		});
});

/**
 * @apiGroup CATEGORY
 * @api {POST} /categories Create a category
 * @apiDescription Create a category
 * @apiPermission admin
 * @apiUse Header
 * @apiParam (Body) {Object} category The category object to create
 * @apiParam (Body) {String} category.category_label ``Mandatory`` The label of the category of the race
 * @apiParam (Body) {String} category.category_description The description of the category of the race
 * @apiParam (Body) {String} category.category_nb_max ``Mandatory`` The max number of participant that can be in a team of that category of the race
 * @apiParam (Body) {Boolean} category.category_full If the category is full (1) or not (0)
 * @apiParam (Body) {String} category.category_type The type of the category of the race
 * @apiParam (Body) {String} category.category_nb_total The total number of participant of that category of the race
 * @apiParam (Body) {String} category.category_price_regular ``Mandatory`` The regular price of the category
 * @apiParam (Body) {String} category.category_price_student ``Mandatory`` The student price of the category
 * @apiSuccess (Sucess 201) {String} category_id The uuid of the category created
 * @apiUse GenericAuthenticationError
 * @apiError (Error 4xx) {400} GENERIC_ERROR_REQUEST_FORMAT_ERROR Your request (body or query param) is wrong
 * @apiError (Error 4xx) {409} CATEGORY_ALREADY_EXISTS The category with the same label already exists
 * @apiError (Error 5xx) {500} CATEGORY_ERROR_INTERNAL_POST_CATEGORY An internal error occurs
 * @apiError (Error 5xx) {500} CATEGORY_ERROR_INTERNAL_CHECK_CATEGORY An internal error occurs
 */
router.post('/', authenticationAdmin, function(req, res, next) {
	const request = service_category.checkRequestPostCategory(req, res, next);
	var categoryNew = service_category.getDatabaseParameterPostCategory(request.params, request.query, request.body);

	Category.findOne({ where: { category_label: req.body.category.category_label } })
		.then(category => {
			if (category) {
				next(apiErrors.CATEGORY_ALREADY_EXISTS, req, res);
			} else {
				Category.create(categoryNew)
					.then(categoryCreated => {
						res.status(201);
						res.send({
							"category_id": categoryCreated.get("category_id")
						});
					})
					.catch(err => {
						next(new service_errors.InternalErrorObject(apiErrors.CATEGORY_ERROR_INTERNAL_POST_CATEGORY, err), req, res);
					});
			}
		})
		.catch( err => {
			next(new service_errors.InternalErrorObject(apiErrors.CATEGORY_ERROR_INTERNAL_CHECK_CATEGORY, err), req, res)
		});
});

/**
 * @apiGroup CATEGORY
 * @api {PUT} /categories/:id Update a category
 * @apiDescription Update a category
 * @apiUse Header
 * @apiParam (Path) {String} id ``Mandatory`` The uuid of the category to update
 * @apiParam (Body) {Object} category The category object to update
 * @apiParam (Body) {String} category.category_label The label of the category of the race
 * @apiParam (Body) {String} category.category_description The description of the category of the race
 * @apiParam (Body) {String} category.category_nb_max The max number of participant that can be in a team of that category of the race
 * @apiParam (Body) {Boolean} category.category_full If the category is full (1) or not (0)
 * @apiParam (Body) {String} category.category_type The type of the category of the race
 * @apiParam (Body) {String} category.category_nb_total The total number of participant of that category of the race
 * @apiParam (Body) {String} category.category_price_regular The regular price of the category
 * @apiParam (Body) {String} category.category_price_student The student price of the category
 * @apiSuccess (Sucess 204) - No Content
 * @apiUse GenericAuthenticationError
 * @apiError (Error 4xx) {400} GENERIC_ERROR_REQUEST_FORMAT_ERROR Your request (body or query param) is wrong
 * @apiError (Error 4xx) {409} CATEGORY_NOT_FOUND The category has not been found
 * @apiError (Error 5xx) {500} CATEGORY_ERROR_INTERNAL_PUT_CATEGORY An internal error occurs
 * @apiError (Error 5xx) {500} CATEGORY_ERROR_INTERNAL_CHECK_CATEGORY An internal error occurs
 */
router.put('/:id', authenticationAdmin, function(req, res, next) {
	const request = service_category.checkRequestPutCategory(req, res, next);
	var categoryUpdate = service_category.getDatabaseParameterPutCategory(request.params, request.query, request.body);

	// STEP 1 - Retrieve the category to update
	Category.findOne({ where: { category_id: request.params.id } })
		.then(category => {
			// STEP 2 - Check if the category to update exists
			if (!category) {
				next(apiErrors.CATEGORY_NOT_FOUND, req, res);
			} else {
				// STEP 3 - Update the category
				category.update(categoryUpdate)
					.then(category2 => {
						res.status(204).end();
					})
					.catch(err => {
						next(new service_errors.InternalErrorObject(apiErrors.CATEGORY_ERROR_INTERNAL_PUT_CATEGORY, err), req, res);
					});
			}
		})
		.catch( err => {
			next(new service_errors.InternalErrorObject(apiErrors.CATEGORY_ERROR_INTERNAL_CHECK_CATEGORY, err), req, res)
		});
});

/**
 * @apiGroup CATEGORY
 * @api {GET} /categories/:id Delete a category
 * @apiDescription Delete a category
 * @apiPermission admin
 * @apiUse Header
 * @apiParam (Path) {String} id ``Mandatory`` The uuid of the category to delete
 * @apiSuccess (Sucess 204) - No Content
 * @apiUse GenericAuthenticationError
 * @apiError (Error 4xx) {404} CATEGORY_NOT_FOUND The category has not been found
 * @apiError (Error 5xx) {500} CATEGORY_ERROR_INTERNAL_DELETE_CATEGORY An internal error occurs
 */
router.delete('/:id', authenticationAdmin, function(req, res, next) {
	const request = service_category.checkRequestDeleteCategory(req, res, next);
	const databaseParams = service_category.getDatabaseParameterDeleteCategory(request.params, request.query, request.body);

	Category.destroy(databaseParams)
		.then( result => {
			if (result > 0) {
				res.status(204).end();
			} else {
				next(apiErrors.CATEGORY_NOT_FOUND, req, res);
			}
		})
		.catch(err => {
			next(new service_errors.InternalErrorObject(apiErrors.CATEGORY_ERROR_INTERNAL_DELETE_CATEGORY, err), req, res);
		});
});

module.exports = router;
