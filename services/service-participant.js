// ---------- IMPORTS ----------

// Middlewares and modules
var sequelize = require('../config/config-database').sequelize;
const {base64encode, base64decode} = require('nodejs-base64');
const uuidv4 = require('uuid/v4');
const Op = sequelize.Op;
const fs = require('fs');

// Configuration files
const config_authentication = require('../config/config-authentication.json');

// Service files
var service_team = require('../services/service-team');
var service_errors = require('../services/service-errors');
var apiErrors = service_errors.apiErrors;
var utils = require('../services/utils');

// Models
var Team = sequelize.import('../models/team');
var Participant = sequelize.import('../models/participant');
var Category = sequelize.import('../models/category');

// ---------- CONFIGURATIONS ----------

/* All possible values that can be associated to a paeticipant concerning its payment validity*/
const participantPaymentValidityValueMatch= {
	PAYMENT_VALID: {label: "PAYMENT_VALID", value: 1},
	PAYMENT_INCOMPLETE: {label: "PAYMENT_INCOMPLETE", value: 2},
	PAYMENT_NOT_RECEIVED: {label: "TEAM_RPAYMENT_NOT_RECEIVED", value: 0}
};

/* All possible values that can be associated to a paeticipant concerning its medical certificate validity*/
const participantCertificateValidityValueMatch= {
	MEDICAL_CERTIFICATE_VALID: {label: "MEDICAL_CERTIFICATE_VALID", value: 1},
	MEDICAL_CERTIFICATE_INVALID: {label: "MEDICAL_CERTIFICATE_INVALID", value: 2},
	MEDICAL_CERTIFICATE_NOT_RECEIVED: {label: "MEDICAL_CERTIFICATE_NOT_RECEIVED", value: 0}
};

/* The default query configuration when a request coming for GET /participants and GET /participants/:id */
const defaultQueryGetParticipants = {
	team: false
};

/* The default body configuration when a request coming for GET /participants */
const defaultBodyGetParticipants = {
	filter: {
		team_category_id: [],
		participant_medical_certificate_valid: [],
		participant_payment_valid: []
	}
};

/* The default body configuration when a request coming for POST /participants */
const defaultBodyPostParticipant = {
	participant: {
		participant_name: null,
		participant_surname: null,
		participant_birthdate: null,
		participant_student: null,
		participant_payment: 0,
		participant_tee_shirt_size: null,
		participant_comment: null,
		participant_telephone: null,
		participant_email: null,
		participant_team_id: null
	}
};

/* The default body configuration when a request coming for PUT /participants/:id */
const defaultBodyPutParticipant = {
	participant: { }
};


// ---------- FUNCTIONS ----------

/* The body check for the request GET /participants */
function checkRequestGetParticipants (req, res, next) {
	var query = Object.assign({}, defaultQueryGetParticipants);
	var body = Object.assign({}, defaultBodyGetParticipants);

	if (req.hasOwnProperty('query')) {
		req.query.hasOwnProperty('team') ? (['true', 'false'].includes(req.query.team) ? query.team = JSON.parse(req.query.team) : null) : null;
	}

	if (req.hasOwnProperty('body')) {
		if (req.body.hasOwnProperty('filter')) {
			if (req.body.filter.hasOwnProperty('participant_medical_certificate_valid') && req.body.filter.participant_medical_certificate_valid.length > 0) {
				body.filter.participant_medical_certificate_valid = [];
				req.body.filter.participant_medical_certificate_valid.forEach((value, index) => {
					if (value.includes([participantCertificateValidityValueMatch.MEDICAL_CERTIFICATE_VALID.label,
							participantCertificateValidityValueMatch.MEDICAL_CERTIFICATE_NOT_RECEIVED.label,
							participantCertificateValidityValueMatch.MEDICAL_CERTIFICATE_INVALID.label])) {
						body.filter.participant_medical_certificate_valid.push(value);
					}
				});
			}
			if (req.body.filter.hasOwnProperty('team_category_id') && req.body.filter.team_category_id.length > 0) {
				body.filter.team_category_id = [];
				req.body.filter.team_category_id.forEach((value, index) => {
					body.filter.team_category_id.push(value);
				});
			}
			if (req.body.filter.hasOwnProperty('participant_payment_valid') && req.body.filter.participant_payment_valid.length > 0) {
				body.filter.participant_payment_valid = [];
				req.body.filter.participant_payment_valid.forEach((value, index) => {
					if (value.includes([participantPaymentValidityValueMatch.PAYMENT_NOT_RECEIVED.label,
							participantPaymentValidityValueMatch.PAYMENT_INCOMPLETE.label,
							participantPaymentValidityValueMatch.PAYMENT_VALID.label])) {
						body.filter.participant_payment_valid.push(value);
					}
				});
			}
		}
	}
	return {params: null, query: query, body: body};
}

/* The body check for the request GET /participants/team/:id */
function checkRequestGetParticipantsTeam (req, res, next) {
	var isAdminScope = req.user.scope == config_authentication["admin-jwt-scope"];
	var params = {};
	var query = Object.assign({}, defaultQueryGetParticipants);
	var body = Object.assign({}, defaultBodyGetParticipants);

	if (isAdminScope) {
		if (!req.params.hasOwnProperty('id')) {
			return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
		} else {
			params.id = req.params.id
		}
	} else {
		params.id = req.user.team.team_id;
	}

	if (req.hasOwnProperty('query')) {
		req.query.hasOwnProperty('team') ? (['true', 'false'].includes(req.query.team) ? query.team = JSON.parse(req.query.team) : null) : null;
	}

	if (req.hasOwnProperty('body')) {
		if (req.body.hasOwnProperty('filter')) {
			if (req.body.filter.hasOwnProperty('participant_medical_certificate_valid') && req.body.filter.participant_medical_certificate_valid.length > 0) {
				body.filter.participant_medical_certificate_valid = [];
				req.body.filter.participant_medical_certificate_valid.forEach((value, index) => {
					if (value.includes([participantCertificateValidityValueMatch.MEDICAL_CERTIFICATE_VALID.label,
						participantCertificateValidityValueMatch.MEDICAL_CERTIFICATE_NOT_RECEIVED.label,
						participantCertificateValidityValueMatch.MEDICAL_CERTIFICATE_INVALID.label])) {
						body.filter.participant_medical_certificate_valid.push(value);
					}
				});
			}
			if (req.body.filter.hasOwnProperty('team_category_id') && req.body.filter.team_category_id.length > 0) {
				body.filter.team_category_id = [];
				req.body.filter.team_category_id.forEach((value, index) => {
					body.filter.team_category_id.push(value);
				});
			}
			if (req.body.filter.hasOwnProperty('participant_payment_valid') && req.body.filter.participant_payment_valid.length > 0) {
				body.filter.participant_payment_valid = [];
				req.body.filter.participant_payment_valid.forEach((value, index) => {
					if (value.includes([participantPaymentValidityValueMatch.PAYMENT_NOT_RECEIVED.label,
						participantPaymentValidityValueMatch.PAYMENT_INCOMPLETE.label,
						participantPaymentValidityValueMatch.PAYMENT_VALID.label])) {
						body.filter.participant_payment_valid.push(value);
					}
				});
			}
		}
	}

	return {params: params, query: query, body: body};
}

/* The body check for the request GET /participants/:id */
function checkRequestGetParticipant (req, res, next) {
	var params = {};
	var query = Object.assign({}, defaultQueryGetParticipants);
	var body = Object.assign({}, defaultBodyGetParticipants);

	if (req.params.hasOwnProperty('id')) {
		params.id = req.params.id;
	} else {
		return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
	}

	if (req.hasOwnProperty('query')) {
		req.query.hasOwnProperty('team') ? (['true', 'false'].includes(req.query.team) ? query.team = JSON.parse(req.query.team) : null) : null;
	}

	if (req.hasOwnProperty('body')) {
		if (req.body.hasOwnProperty('filter')) {
			if (req.body.filter.hasOwnProperty('participant_medical_certificate_valid') && req.body.filter.participant_medical_certificate_valid.length > 0) {
				body.filter.participant_medical_certificate_valid = [];
				req.body.filter.participant_medical_certificate_valid.forEach((value, index) => {
					if (value.includes([participantCertificateValidityValueMatch.MEDICAL_CERTIFICATE_VALID.label,
						participantCertificateValidityValueMatch.MEDICAL_CERTIFICATE_NOT_RECEIVED.label,
						participantCertificateValidityValueMatch.MEDICAL_CERTIFICATE_INVALID.label])) {
						body.filter.participant_medical_certificate_valid.push(value);
					}
				});
			}
			if (req.body.filter.hasOwnProperty('team_category_id') && req.body.filter.team_category_id.length > 0) {
				body.filter.team_category_id = [];
				req.body.filter.team_category_id.forEach((value, index) => {
					body.filter.team_category_id.push(value);
				});
			}
			if (req.body.filter.hasOwnProperty('participant_payment_valid') && req.body.filter.participant_payment_valid.length > 0) {
				body.filter.participant_payment_valid = [];
				req.body.filter.participant_payment_valid.forEach((value, index) => {
					if (value.includes([participantPaymentValidityValueMatch.PAYMENT_NOT_RECEIVED.label,
						participantPaymentValidityValueMatch.PAYMENT_INCOMPLETE.label,
						participantPaymentValidityValueMatch.PAYMENT_VALID.label])) {
						body.filter.participant_payment_valid.push(value);
					}
				});
			}
		}
	}
	return {params: params, query: query, body: body};
}

/* The body check for the request GET /participants/medical-certificate/:id */
function checkRequestGetParticipantCertificate (req, res, next) {
	var isAdminScope = req.user.scope == config_authentication["admin-jwt-scope"];
	var params = {};
	var body = Object.assign({}, defaultBodyGetParticipants);

	if (isAdminScope) {
		if (!req.params.hasOwnProperty('id')) {
			return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
		} else {
			params.id = req.params.id
		}
	} else {
		params.id = req.user.team.team_id;
	}

	return {params: params, query: null, body: body};
}

/* The body check for the request POST /participants */
function checkRequestPostParticipant (req, res, next) {
	const isAdminScope = req.user.scope == config_authentication["admin-jwt-scope"];
	const isUserScope = req.user.scope == config_authentication["user-jwt-scope"];
	var body = Object.assign({}, defaultBodyPostParticipant);

	if (req.body.hasOwnProperty('participant')) {
		if (req.body.participant.hasOwnProperty('participant_name')) {
			if (req.body.participant.participant_name) {
				body.participant.participant_name = req.body.participant.participant_name;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.participant.hasOwnProperty('participant_surname')) {
			if (req.body.participant.participant_surname) {
				body.participant.participant_surname = req.body.participant.participant_surname;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.participant.hasOwnProperty('participant_birthdate')) {
			if (req.body.participant.participant_birthdate) {
				body.participant.participant_birthdate = req.body.participant.participant_birthdate;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.participant.hasOwnProperty('participant_telephone')) {
			if (req.body.participant.participant_telephone) {
				body.participant.participant_telephone = req.body.participant.participant_telephone;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.participant.hasOwnProperty('participant_email')) {
			if (req.body.participant.participant_email) {
				body.participant.participant_email = req.body.participant.participant_email;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.participant.hasOwnProperty('participant_student')) {
			if (req.body.participant.participant_student != null) {
				body.participant.participant_student = req.body.participant.participant_student
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_tee_shirt_size')) {
			if (req.body.participant.participant_tee_shirt_size) {
				body.participant.participant_tee_shirt_size = req.body.participant.participant_tee_shirt_size
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_comment')) {
			if (req.body.participant.participant_comment) {
				body.participant.participant_comment = req.body.participant.participant_comment
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_team_id') && isAdminScope) {
			if (req.body.participant.participant_team_id) {
				body.participant.participant_team_id = req.body.participant.participant_team_id
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else if (isUserScope) {
			body.participant.participant_team_id = req.user.team.team_id;
		} else {
			return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.participant.hasOwnProperty('participant_payment') && isAdminScope) {
			if (req.body.participant.participant_payment != null) {
				body.participant.participant_payment = req.body.participant.participant_payment
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			body.participant.participant_payment = participantPaymentValidityValueMatch.PAYMENT_NOT_RECEIVED.value;

		}
		if (req.body.participant.hasOwnProperty('participant_medical_certificate_valid') && isAdminScope) {
			if (utils.isInCorrectExtension(req.body.participant.participant_medical_certificate_valid)) {
				body.participant.participant_medical_certificate_valid = req.body.participant.participant_medical_certificate_valid
			} else {
				return next(apiErrors.PARTICIPANT_CERTIFICATE_FORMAT_INVALID, req, res);
			}
		} else {
			body.participant.participant_medical_certificate_valid = participantCertificateValidityValueMatch.MEDICAL_CERTIFICATE_NOT_RECEIVED.value;
		}
		if (req.body.participant.hasOwnProperty('participant_message') && isAdminScope) {
			if (req.body.participant.participant_message) {
				body.participant.participant_message = req.body.participant.participant_message
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_medical_certificate')) {
			if (req.body.participant.participant_medical_certificate != null) {
				body.participant.participant_medical_certificate = req.body.participant.participant_medical_certificate;
				body.participant.participant_medical_certificate_file = '';
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
	} else {
		return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
	}
	body.participant.participant_id = uuidv4();
	return {params: null, query: null, body: body};
}

/* The body check for the request PUT /participants/:id */
function checkRequestPutParticipant (req, res, next) {
	const isAdminScope = req.user.scope == config_authentication["admin-jwt-scope"];
	const isUserScope = req.user.scope == config_authentication["user-jwt-scope"];
	var body = Object.assign({}, defaultBodyPutParticipant);
	var params = {};

	if (req.params.hasOwnProperty('id')) {
		params.id = req.params.id;
	} else {
		return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
	}

	if (req.body.hasOwnProperty('participant')) {
		if (req.body.participant.hasOwnProperty('participant_name')) {
			if (req.body.participant.participant_name) {
				body.participant.participant_name = req.body.participant.participant_name;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_surname')) {
			if (req.body.participant.participant_surname) {
				body.participant.participant_surname = req.body.participant.participant_surname;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_birthdate')) {
			if (req.body.participant.participant_birthdate) {
				body.participant.participant_birthdate = req.body.participant.participant_birthdate;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_telephone')) {
			if (req.body.participant.participant_telephone) {
				body.participant.participant_telephone = req.body.participant.participant_telephone;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_email')) {
			if (req.body.participant.participant_email) {
				body.participant.participant_email = req.body.participant.participant_email;
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_student')) {
			if (req.body.participant.participant_student != null) {
				body.participant.participant_student = req.body.participant.participant_student
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_tee_shirt_size')) {
			if (req.body.participant.participant_tee_shirt_size) {
				body.participant.participant_tee_shirt_size = req.body.participant.participant_tee_shirt_size
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_comment')) {
			if (req.body.participant.participant_comment) {
				body.participant.participant_comment = req.body.participant.participant_comment
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_team_id') && isAdminScope) {
			if (req.body.participant.participant_team_id) {
				body.participant.participant_team_id = req.body.participant.participant_team_id
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_payment') && isAdminScope) {
			if (req.body.participant.participant_payment != null) {
				body.participant.participant_payment = req.body.participant.participant_payment
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_medical_certificate')) {
			if (req.body.participant.participant_medical_certificate != null) {
				body.participant.participant_medical_certificate = req.body.participant.participant_medical_certificate;
				body.participant.participant_medical_certificate_file = '';
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_medical_certificate_valid') && isAdminScope) {
			if (req.body.participant.participant_medical_certificate_valid != null) {
				body.participant.participant_medical_certificate_valid = req.body.participant.participant_medical_certificate_valid
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_message') && isAdminScope) {
			if (req.body.participant.participant_message) {
				body.participant.participant_message = req.body.participant.participant_message
			} else {
				return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
	} else {
		return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
	}

	return {params: params, query: null, body: body};
}

/* The body check for the request DELETE /participants/:id */
function checkRequestDeleteParticipant (req, res, next) {
	var params = {};
	if (!req.params.hasOwnProperty('id')) {
		return next(apiErrors.GENERIC_ERROR_REQUEST_FORMAT_ERROR, req, res);
	}
	params.id = req.params.id
	return {params: params, query: null, body: null};
}


/* The database SQL request parameters for the request GET /participants */
function getDatabaseParameterGetParticipants (params, query, body){
	var parameters = {
		where: {},
		attributes: { exclude: ['participant_medical_certificate'] },
		include: []
	};

	if (query.team) {
		parameters.include.push({model: Team, as: 'participant_team', attributes: ['team_id', 'team_name', 'team_valid'],
			include: [ {model: Category, as: 'team_category', attributes: ['category_id', 'category_label'] } ] });
	}

	return parameters;
}

/* The database SQL request parameters for the request GET /participants/team/:id */
function getDatabaseParameterGetParticipantsTeam (params, query, body){
	var parameters = {
		where: {},
		attributes: { exclude: ['participant_medical_certificate'] },
		include: []
	};
	if (params.id) {
		parameters.where.participant_team_id = params.id;
	}

	if (query.team) {
		parameters.include.push({model: Team, as: 'participant_team', attributes: ['team_id', 'team_name', 'team_valid'],
			include: [ {model: Category, as: 'team_category', attributes: ['category_id', 'category_label'] } ] });
	}

	return parameters;
}

/* The database SQL request parameters for the request GET /participants/:id */
function getDatabaseParameterGetParticipant (params, query, body){
	var parameters = {
		where: {},
		attributes: { exclude: ['participant_medical_certificate' ] },
		include: []
	};

	if (params.id) {
		parameters.where.participant_id = params.id;
	}

	if (query.team) {
		parameters.include.push({model: Team, as: 'participant_team', attributes: ['team_id', 'team_name', 'team_valid'],
			include: [ {model: Category, as: 'team_category', attributes: ['category_id', 'category_label'] } ] });
	}

	return parameters;
}

/* The database SQL request parameters for the request GET /participants/medical-certificate/:id */
function getDatabaseParameterGetParticipantCertificate (params, query, body){
	var parameters = {
		where: {},
		attributes: ['participant_medical_certificate']
	};
	if (params.id) {
		parameters.where.participant_id = params.id;
	}

	return parameters;
}

/* The database SQL request parameters for the request POST /participants */
function getDatabaseParameterPostParticipant (params, query, body){
	return body.participant;
}

/* The database SQL request parameters for the request PUT /participants/:id */
function getDatabaseParameterPutParticipant (params, query, body){
	return body.participant;
}

/* The database SQL request parameters for the request DELETE /participants/:id */
function getDatabaseParameterDeleteParticipant (params, query, body){
	var parameters = {
		where: { participant_id: params.id },
	};
	return parameters;
}

/* The function that will record the medical certificate in a file and database */
function recordMedicalCertificateBase64Encoded(file) {
	// Not implemented
};

module.exports = {
	participantPaymentValidityValueMatch: participantPaymentValidityValueMatch,
	participantCertificateValidityValueMatch: participantCertificateValidityValueMatch,
	checkRequestGetParticipants: checkRequestGetParticipants,
	getDatabaseParameterGetParticipants: getDatabaseParameterGetParticipants,
	checkRequestGetParticipantsTeam: checkRequestGetParticipantsTeam,
	getDatabaseParameterGetParticipantsTeam: getDatabaseParameterGetParticipantsTeam,
	checkRequestGetParticipant: checkRequestGetParticipant,
	getDatabaseParameterGetParticipant: getDatabaseParameterGetParticipant,
	checkRequestGetParticipantCertificate: checkRequestGetParticipantCertificate,
	getDatabaseParameterGetParticipantCertificate: getDatabaseParameterGetParticipantCertificate,
	checkRequestPostParticipant: checkRequestPostParticipant,
	getDatabaseParameterPostParticipant: getDatabaseParameterPostParticipant,
	checkRequestPutParticipant: checkRequestPutParticipant,
	getDatabaseParameterPutParticipant: getDatabaseParameterPutParticipant,
	checkRequestDeleteParticipant: checkRequestDeleteParticipant,
	getDatabaseParameterDeleteParticipant: getDatabaseParameterDeleteParticipant
};