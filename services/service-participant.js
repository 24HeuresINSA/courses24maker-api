// ---------- IMPORTS ----------

// Middlewares and modules
var sequelize = require('../config/config-database').sequelize;
const Op = sequelize.Op;

// Configuration files
const config_authentication = require('../config/config-authentication.json');

// Service files
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

/* All possible values that can be associated to a paeticipant concerning its payment validity*/
const participantCertificateValidityValueMatch= {
	MEDICAL_CERTIFICATE_VALID: {label: "MEDICAL_CERTIFICATE_VALID", value: 1},
	MEDICAL_CERTIFICATE_INVALID: {label: "MEDICAL_CERTIFICATE_INVALID", value: 2},
	MEDICAL_CERTIFICATE_NOT_RECEIVED: {label: "MEDICAL_CERTIFICATE_NOT_RECEIVED", value: 0}
};

/* The default body configuration when a request coming for GET /teams */
const defaultBodyPostParticipant = {
	participant: {
		participant_name: null,
		participant_surname: null,
		participant_birthdate: null,
		participant_student: null,
		participant_medical_certificat: null,
		participant_medical_certificat_file: null,
		participant_medical_certificat_valid: 0,
		participant_payment: 0,
		participant_tee_shirt_size: null,
		participant_comment: null,
		participant_telephone: null,
		participant_email: null,
		participant_team_id: null
	}
};

// ---------- FUNCTIONS ----------

/* The body check for the request GET /team */
function checkBodyPostTeam (req, res, next) {
	var body = Object.assign({}, defaultBodyPostParticipant);
	var categoriesIdPromise = Category.findAll({ raw: true, attributes: ["category_id"] });

	if (!req.body.hasOwnProperty('participant')) {
		if (req.body.participant.hasOwnProperty('participant_name')) {
			if (req.body.participant.participant_name) {
				body.participant.participant_name = req.body.participant.participant_name
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.participant.hasOwnProperty('participant_surname')) {
			if (req.body.participant.participant_surname) {
				body.participant.participant_surname = req.body.participant.participant_surname
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.participant.hasOwnProperty('participant_birthdate')) {
			if (req.body.participant.participant_birthdate) {
				body.participant.participant_birthdate = req.body.participant.participant_birthdate
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.participant.hasOwnProperty('participant_telephone')) {
			if (req.body.participant.participant_telephone) {
				body.participant.participant_telephone = req.body.participant.participant_telephone
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}
		if (req.body.participant.hasOwnProperty('participant_email')) {
			if (req.body.participant.participant_email) {
				body.participant.participant_email = req.body.participant.participant_email
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		} else {
			return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
		}

		if (req.body.participant.hasOwnProperty('participant_student')) {
			if (req.body.participant.participant_student) {
				body.participant.participant_student = req.body.participant.participant_student
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_medical_certificat')) {
			if (req.body.participant.participant_medical_certificat) {
				body.participant.participant_medical_certificat = req.body.participant.participant_medical_certificat
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_medical_certificat_file')) {
			if (req.body.participant.participant_medical_certificat_file) {
				body.participant.participant_medical_certificat_file = req.body.participant.participant_medical_certificat_file
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_medical_certificat_valid')) {
			if (req.body.participant.participant_medical_certificat_valid) {
				body.participant.participant_medical_certificat_valid = req.body.participant.participant_medical_certificat_valid
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_payment')) {
			if (req.body.participant.participant_payment) {
				body.participant.participant_payment = req.body.participant.participant_payment
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_tee_shirt_size')) {
			if (req.body.participant.participant_tee_shirt_size) {
				body.participant.participant_tee_shirt_size = req.body.participant.participant_tee_shirt_size
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_comment')) {
			if (req.body.participant.participant_comment) {
				body.participant.participant_comment = req.body.participant.participant_comment
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
		if (req.body.participant.hasOwnProperty('participant_team_id')) {
			if (req.body.participant.participant_team_id) {
				body.participant.participant_team_id = req.body.participant.participant_team_id
			} else {
				return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
			}
		}
	} else {
		return next(apiErrors.GENERAL_ERROR_REQUEST_FORMAT_ERROR, req, res);
	}
}



module.exports = {
	participantPaymentValidityValueMatch: participantPaymentValidityValueMatch,
	participantCertificateValidityValueMatch: participantCertificateValidityValueMatch
};