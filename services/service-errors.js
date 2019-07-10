// The object error returned to the client
function ApiErrorObject (code, errorLabel, errorType, message) {
	this.code = code;
	this.errorLabel = errorLabel;
	this.errorType = errorType;
	this.message = message;
};

// The object error when an internal error occur
function InternalErrorObject (apiError, internalError) {
	this.apiError = apiError;
	this.internalError = internalError;
};

const apiErrors = {
	AUTHENTICATION_ERROR_TEAM_DOES_NOT_EXIST: new ApiErrorObject(404, "AUTHENTICATION_ERROR_TEAM_DOES_NOT_EXIST", "NOT_FOUND", { "fr": "L'équipe n'existe pas", "en": "The team does not exist"}),
	AUTHENTICATION_ERROR_PASSWORD_WRONG: new ApiErrorObject(401, "AUTHENTICATION_ERROR_PASSWORD_WRONG", "BAD_PASSWORD", { "fr": "Le mot de passe est erroné", "en": "The password is wrong"}),
	AUTHENTICATION_ERROR_INTERNAL_RETRIEVE_TEAM: new ApiErrorObject(500, "AUTHENTICATION_ERROR_INTERNAL_RETRIEVE_TEAM", "INTERNAL_ERROR", { "fr": "Impossible de vérifier l'équipe", "en": "Problem to retrieve the team"}),
	AUTHENTICATION_ERROR_BAD_REQUEST: new ApiErrorObject(400, "AUTHENTICATION_ERROR_BAD_REQUEST", "BAD_REQUEST", { "fr": "Les champs \"user\" et \"password\" doivent être fournis", "en": "Both fields \"user\" and \"password\" must be provided"}),
	AUTHENTICATION_ERROR_UNAUTHORIZED: new ApiErrorObject(401, "AUTHENTICATION_ERROR_UNAUTHORIZED", "UNAUTHORIZED", { "fr": "Requête non authentifiée", "en": "Request not authenticated"}),
	AUTHENTICATION_ERROR_INTERNAL_AUTHENTICATION: new ApiErrorObject(500, "AUTHENTICATION_ERROR_INTERNAL_AUTHENTICATION", "INTERNAL_ERROR", { "fr": "Problème pour vérifier l'authentification de la requète", "en": "Problem to check the request authentication"}),
	AUTHENTICATION_ERROR_FORBIDDEN: new ApiErrorObject(403, "AUTHENTICATION_ERROR_FORBIDDEN", "FORBIDDEN", { "fr": "Vous n'êtes pas autorisé à faire cette action", "en": "You are not authorized to make this request"}),
	TEAM_ERROR_INTERNAL_GET_TEAMS: new ApiErrorObject(500, "TEAM_ERROR_INTERNAL_GET_TEAMS", "INTERNAL_ERROR", { "fr": "Problème pour retrouver toutes les équipes", "en": "Problem to retrieve all the teams"}),
	TEAM_ERROR_INTERNAL_GET_TEAM: new ApiErrorObject(500, "TEAM_ERROR_INTERNAL_GET_TEAM", "INTERNAL_ERROR", { "fr": "Problème pour retrouver l'équipe", "en": "Problem to retrieve the team"}),
	TEAM_NOT_FOUND_GET_TEAM: new ApiErrorObject(404, "TEAM_NOT_FOUND_GET_TEAM", "NOT_FOUND", { "fr": "L'équipe n'existe pas", "en": "The team does not exist"}),
	GENERAL_ERROR_REQUEST_FORMAT_ERROR: new ApiErrorObject(400, "GENERAL_ERROR_REQUEST_FORMAT_ERROR", "BAD REQUEST", { "fr": "La requête est mal formée", "en": "The request is malformed"})
};

module.exports = {
	InternalErrorObject: InternalErrorObject,
	ApiErrorObject: ApiErrorObject,
	apiErrors: apiErrors
};