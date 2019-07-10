// ---------- IMPORTS ----------

// Middlewares and modules
var sequelize = require('../config/config-database').sequelize;
var uuidv4 = require('uuid/v4');
const Op = sequelize.Op;

// Configuration files
const config_authentication = require('../config/config-authentication.json');

// Service files
const service_authentication = require('../services/service-authentication');
const service_errors = require('../services/service-errors');
const apiErrors = service_errors.apiErrors;
const utils = require('../services/utils');

// Models
var Team = sequelize.import('../models/team');
var Participant = sequelize.import('../models/participant');
var Category = sequelize.import('../models/category');


// ---------- CONFIGURATIONS ----------

/* All possible values that can be associated to a category concerning its validity*/
const categoryFullValueMatch= {
	CATEGORY_FULL: {label: "CATEGORY_FULL", value: 1},
	CATEGORY_AVAILABLE: {label: "CATEGORY_AVAILABLE", value: 0}
};

/* The default body configuration when a request coming for POST /categories */
const defaultBodyPostCategory = {
	category: {
		category_id: null,
		category_label: null,
		category_description: null,
		category_nb_max: null,
		category_full: categoryFullValueMatch.CATEGORY_AVAILABLE.value,
		category_type: null,
		category_nb_total: null,
		category_price_regular: 0,
		category_price_va: 0
	}
};

/* The default body configuration when a request coming for PUT /categories */
const defaultBodyPutCategory = {
	category: { }
};


// ---------- FUNCTIONS ----------

/* The body check for the request GET /categories/:id */
function checkRequestGetCategory (req, res, next) {
	var params = {};
	if (req.params.hasOwnProperty('id')) {
		params.id = req.params.id;
	} else {
		return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
	}

	return {params: params, query: null, body: null};
}

/* The body check for the request POST /categories */
function checkRequestPostCategory (req, res, next) {
	var body = Object.assign({}, defaultBodyPostCategory);

	if (req.body.hasOwnProperty('category')) {
		if (req.body.category.hasOwnProperty('category_label')) {
			if (req.body.category.category_label) {
				body.category.category_label = req.body.category.category_label;
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.category.hasOwnProperty('category_price_regular')) {
			if (req.body.category.category_price_regular) {
				body.category.category_price_regular =  req.body.category.category_price_regular;
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.category.hasOwnProperty('category_price_va')) {
			if (req.body.category.category_price_va) {
				body.category.category_price_va = req.body.category.category_price_va;
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.category.hasOwnProperty('category_nb_max')) {
			if (req.body.category.category_nb_max) {
				body.category.category_nb_max = req.body.category.category_nb_max;
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.category.hasOwnProperty('category_description')) {
			if (req.body.category.category_description) {
				body.category.category_description = req.body.category.category_description;
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.category.hasOwnProperty('category_type')) {
			if (req.body.category.category_type) {
				body.category.category_type = req.body.category.category_type;
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.category.hasOwnProperty('category_nb_total')) {
			if (req.body.category.category_nb_total) {
				body.category.category_nb_total = req.body.category.category_nb_total;
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.category.hasOwnProperty('category_full')) {
			if (req.body.category.category_full) {
				body.category.category_full = req.body.category.category_full;
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
	} else {
		return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
	}
		
	body.category.category_id = uuidv4();

	return {params: null, query: null, body: body};
}

/* The body check for the request PUT /categories/:id */
function checkRequestPutCategory (req, res, next) {
	var params = {};
	var body = Object.assign({}, defaultBodyPutCategory);

	if (req.params.hasOwnProperty('id')) {
		params.id = req.params.id;
	} else {
		return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
	}

	if (req.body.hasOwnProperty('category')) {
		if (req.body.category.hasOwnProperty('category_label')) {
			if (req.body.category.category_label) {
				body.category.category_label = req.body.category.category_label;
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.category.hasOwnProperty('category_price_regular')) {
			if (req.body.category.category_price_regular) {
				body.category.category_price_regular =  req.body.category.category_price_regular;
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.category.hasOwnProperty('category_price_va')) {
			if (req.body.category.category_price_va) {
				body.category.category_price_va = req.body.category.category_price_va;
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.category.hasOwnProperty('category_nb_max')) {
			if (req.body.category.category_nb_max) {
				body.category.category_nb_max = req.body.category.category_nb_max;
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.category.hasOwnProperty('category_description')) {
			if (req.body.category.category_description) {
				body.category.category_description = req.body.category.category_description;
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.category.hasOwnProperty('category_type')) {
			if (req.body.category.category_type) {
				body.category.category_type = req.body.category.category_type;
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.category.hasOwnProperty('category_nb_total')) {
			if (req.body.category.category_nb_total) {
				body.category.category_nb_total = req.body.category.category_nb_total;
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.category.hasOwnProperty('category_full')) {
			if (req.body.category.category_full) {
				body.category.category_full = req.body.category.category_full;
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
	} else {
		return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
	}

	return {params: params, query: null, body: body};
}

/* The body check for the request DELETE /categories/:id */
function checkRequestDeleteCategory (req, res, next) {
	var params = {};
	if (!req.params.hasOwnProperty('id')) {
		return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
	}
	params.id = req.params.id;
	return {params: params, query: null, body: null};
}

/* The database SQL request parameters for the request GET /categories */
function getDatabaseParameterGetCategories (params, query, body){
	var parameters = {
		where: {},
		attributes: { exclude: ['team_password']},
		include: []
	};
	return parameters;
}

/* The database SQL request parameters for the request GET /categories/:id */
function getDatabaseParameterGetCategory (params, query, body){
	var parameters = {
		where: { category_id: params.id },
		attributes: { exclude: []},
		include: []
	};
	return parameters;
}

/* The database SQL request parameters for the request POST /categories */
function getDatabaseParameterPostCategory (params, query, body){
	return body.category;
}

/* The database SQL request parameters for the request PUT /categories */
function getDatabaseParameterPutCategory (params, query, body){
	return body.category;
}

/* The database SQL request parameters for the request DELETE /categories/:id */
function getDatabaseParameterDeleteCategory (params, query, body){
	var parameters = {
		where: { category_id: params.id },
	};
	return parameters;
}

module.exports = {
	checkRequestGetCategory: checkRequestGetCategory,
	getDatabaseParameterGetCategories: getDatabaseParameterGetCategories,
	getDatabaseParameterGetCategory: getDatabaseParameterGetCategory,
	checkRequestPostCategory: checkRequestPostCategory,
	getDatabaseParameterPostCategory: getDatabaseParameterPostCategory,
	checkRequestPutCategory: checkRequestPutCategory,
	getDatabaseParameterPutCategory: getDatabaseParameterPutCategory,
	checkRequestDeleteCategory: checkRequestDeleteCategory,
	getDatabaseParameterDeleteCategory: getDatabaseParameterDeleteCategory
};