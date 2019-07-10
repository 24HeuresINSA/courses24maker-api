// ---------- IMPORT ----------

// Middlewares and modules
var express = require('express');
var router = express.Router();
var uuidv4 = require('uuid/v4');
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

router.get('/', authenticationUser, function(req, res, next) {
	Category.findAll({ order:[['category_label','DESC']] })
		.then( categories => {
			if (categories) {
				res.status(200);
				res.send(utils.modelToJSON(categories));
			} else {
				next(apiErrors.CATEGORY_NOT_FOUND_GET_CATEGORIES, req, res);
			}
		})
		.catch( err => {
			next(apiErrors.CATEGORY_ERROR_INTERNAL_GET_CATEGORIES, res ,res);
		});
});

router.get('/:id', authenticationUser, function(req, res, next) {
	const request = service_category.checkRequestGetCategory(req, res, next);
	const databaseParams = service_category.getDatabaseParameterGetCategory(request.params, request.query, request.body);

	Category.findOne(databaseParams)
		.then(category => {
			if (category) {
				res.status(200);
				res.send(utils.modelToJSON(category));
			} else {
				next(apiErrors.CATEGORY_NOT_FOUND, req, res);
			}
		})
		.catch( err => {
			next(new service_errors.InternalErrorObject(apiErrors.CATEGORY_ERROR_INTERNAL_GET_CATEGORY, err), req, res);
		});
});

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
