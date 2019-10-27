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

// The object that contains all the errors that can be returned to the client
const apiErrors = {
	// Errors related to the Authentication API
	AUTHENTICATION_ERROR_TEAM_DOES_NOT_EXIST: new ApiErrorObject(404, "AUTHENTICATION_ERROR_TEAM_DOES_NOT_EXIST", "NOT_FOUND", { "fr": "L'équipe n'existe pas", "en": "The team does not exist"}),
	AUTHENTICATION_ERROR_PASSWORD_WRONG: new ApiErrorObject(401, "AUTHENTICATION_ERROR_PASSWORD_WRONG", "BAD_PASSWORD", { "fr": "Le mot de passe est erroné", "en": "The password is wrong"}),
	AUTHENTICATION_ERROR_INTERNAL_RETRIEVE_TEAM: new ApiErrorObject(500, "AUTHENTICATION_ERROR_INTERNAL_RETRIEVE_TEAM", "INTERNAL_ERROR", { "fr": "Impossible de vérifier l'équipe", "en": "Problem to retrieve the team"}),
	AUTHENTICATION_ERROR_BAD_REQUEST: new ApiErrorObject(400, "AUTHENTICATION_ERROR_BAD_REQUEST", "BAD_REQUEST", { "fr": "Les champs \"user\" et \"password\" doivent être fournis", "en": "Both fields \"user\" and \"password\" must be provided"}),
	AUTHENTICATION_ERROR_UNAUTHORIZED: new ApiErrorObject(401, "AUTHENTICATION_ERROR_UNAUTHORIZED", "UNAUTHORIZED", { "fr": "Requête non authentifiée", "en": "Request not authenticated"}),
	AUTHENTICATION_ERROR_INTERNAL_AUTHENTICATION: new ApiErrorObject(500, "AUTHENTICATION_ERROR_INTERNAL_AUTHENTICATION", "INTERNAL_ERROR", { "fr": "Problème pour vérifier l'authentification de la requète", "en": "Problem to check the request authentication"}),
	AUTHENTICATION_ERROR_FORBIDDEN: new ApiErrorObject(403, "AUTHENTICATION_ERROR_FORBIDDEN", "FORBIDDEN", { "fr": "Vous n'êtes pas autorisé à faire cette action", "en": "You are not authorized to make this request"}),

	// Errors related ti the Teams API
	TEAM_NOT_FOUND: new ApiErrorObject(404, "TEAM_NOT_FOUND", "NOT_FOUND", { "fr": "L'équipe n'existe pas", "en": "The team does not exist"}),
	TEAMS_NOT_FOUND: new ApiErrorObject(404, "TEAMS_NOT_FOUND", "NOT_FOUND", { "fr": "Aucune équipe trouvée", "en": "No team found"}),
	TEAM_ALREADY_EXISTS: new ApiErrorObject(409, "TEAM_ALREADY_EXISTS", "CONFLICT", { "fr": "L'équipe existe déjà", "en": "The team already exists"}),
	TEAM_ERROR_INTERNAL_GET_TEAMS: new ApiErrorObject(500, "TEAM_ERROR_INTERNAL_GET_TEAMS", "INTERNAL_ERROR", { "fr": "Problème pour retrouver toutes les équipes", "en": "Problem to retrieve all the teams"}),
	TEAM_ERROR_INTERNAL_GET_TEAM: new ApiErrorObject(500, "TEAM_ERROR_INTERNAL_GET_TEAM", "INTERNAL_ERROR", { "fr": "Problème pour retrouver l'équipe", "en": "Problem to retrieve the team"}),
	TEAM_ERROR_INTERNAL_CHECK_TEAM: new ApiErrorObject(500, "TEAM_ERROR_INTERNAL_CHECK_TEAM", "INTERNAL_ERROR", { "fr": "Problème pour vérifier l'existence de l'équipe", "en": "Problem to retrieve if the team exists"}),
	TEAM_ERROR_INTERNAL_POST_TEAM: new ApiErrorObject(500, "TEAM_ERROR_INTERNAL_POST_TEAM", "INTERNAL_ERROR", { "fr": "Problème pour créer l'équipe", "en": "Problem to create the team"}),
	TEAM_ERROR_INTERNAL_PUT_TEAM: new ApiErrorObject(500, "TEAM_ERROR_INTERNAL_PUT_TEAM", "INTERNAL_ERROR", { "fr": "Problème pour mettre à jour l'équipe", "en": "Problem to update the team"}),
	TEAM_ERROR_INTERNAL_DELETE_TEAM: new ApiErrorObject(500, "TEAM_ERROR_INTERNAL_DELETE_TEAM", "INTERNAL_ERROR", { "fr": "Problème pour supprimer l'équipe", "en": "Problem to remove the team"}),
	PARTICIPANT_ERROR_BAD_REQUEST_PUT_TEAM: new ApiErrorObject(400, "PARTICIPANT_ERROR_BAD_REQUEST_PUT_TEAM", "INTERNAL_ERROR", { "fr": "Impossible de mettre à jour le chef d'équipe. Il appartient à une autre équipe", "en": "Impossible to update the team manager. He is member of another team."}),
	PARTICIPANT_ERROR_INTERNAL_NEW_POST_TEAM: new ApiErrorObject(500, "PARTICIPANT_ERROR_INTERNAL_NEW_POST_TEAM", "BAD_REQUEST", { "fr": "Problème pour créer le chef d'équipe", "en": "Problem to create the team manager"}),
	PARTICIPANT_ERROR_INTERNAL_NEW_PUT_TEAM: new ApiErrorObject(500, "PARTICIPANT_ERROR_INTERNAL_NEW_POST_TEAM", "INTERNAL_ERROR", { "fr": "Problème pour mettre à jour le chef d'équipe", "en": "Problem to update the team manager"}),

	// Errors related to the Categories API
	CATEGORY_NOT_FOUND: new ApiErrorObject(404, "CATEGORY_NOT_FOUND", "NOT_FOUND", { "fr": "La catégorie n'existe pas", "en": "The category does not exist"}),
	CATEGORIES_NOT_FOUND: new ApiErrorObject(404, "CATEGORIES_NOT_FOUND", "NOT_FOUND", { "fr": "Aucune catégorie trouvée", "en": "No category found"}),
	CATEGORY_ALREADY_EXISTS: new ApiErrorObject(409, "CATEGORY_ALREADY_EXISTS", "CONFLICT", { "fr": "Une catégorie avec le même label existe déjà", "en": "A team with the same label already exists"}),
	CATEGORY_ERROR_INTERNAL_GET_CATEGORIES: new ApiErrorObject(500, "CATEGORY_ERROR_INTERNAL_GET_CATEGORIES", "INTERNAL_ERROR", { "fr": "Problème pour retrouver toutes les catégories", "en": "Problem to retrieve all the categories"}),
	CATEGORY_ERROR_INTERNAL_GET_CATEGORY: new ApiErrorObject(500, "CATEGORY_ERROR_INTERNAL_GET_CATEGORY", "INTERNAL_ERROR", { "fr": "Problème pour retrouver la catégorie", "en": "Problem to retrieve the category"}),
	CATEGORY_ERROR_INTERNAL_CHECK_CATEGORY: new ApiErrorObject(500, "CATEGORY_ERROR_INTERNAL_CHECK_CATEGORY", "INTERNAL_ERROR", { "fr": "Problème pour vérifier l'existence de la catégorie", "en": "Problem to check if the category already exists"}),
	CATEGORY_ERROR_INTERNAL_POST_CATEGORY: new ApiErrorObject(500, "CATEGORY_ERROR_INTERNAL_POST_CATEGORY", "INTERNAL_ERROR", { "fr": "Problème pour créer la catégorie", "en": "Problem to create the category"}),
	CATEGORY_ERROR_INTERNAL_PUT_CATEGORY: new ApiErrorObject(500, "CATEGORY_ERROR_INTERNAL_PUT_CATEGORY", "INTERNAL_ERROR", { "fr": "Problème pour mettre à jour la catégorie", "en": "Problem to update the category"}),
	CATEGORY_ERROR_INTERNAL_DELETE_CATEGORY: new ApiErrorObject(500, "CATEGORY_ERROR_INTERNAL_DELETE_CATEGORY", "INTERNAL_ERROR", { "fr": "Problème pour supprimer la catégorie", "en": "Problem to remove the category"}),

	// Errors related to the Participants API
	PARTICIPANT_NOT_FOUND: new ApiErrorObject(404, "PARTICIPANT_NOT_FOUND", "NOT_FOUND", { "fr": "Le participant n'existe pas", "en": "The participant does not exist"}),
	PARTICIPANTS_NOT_FOUND: new ApiErrorObject(404, "PARTICIPANTS_NOT_FOUND", "NOT_FOUND", { "fr": "Aucune participant trouvé", "en": "No participant found"}),
	PARTICIPANT_ALREADY_EXISTS: new ApiErrorObject(409, "PARTICIPANT_ALREADY_EXISTS", "CONFLICT", { "fr": "Un participant similaire existe déjà", "en": "A participant with the same information already exists"}),
	PARTICIPANT_CERTIFICATE_FORMAT_INVALID: new ApiErrorObject(415, "PARTICIPANT_CERTIFICATE_FORMAT_INVALID", "UNSUPPORTED_MEDIA_TYPE", { "fr": "Le certificat doit être en pdf, jpg ou png", "en": "The certificate must be in format pdf, jpg or png"}),
	PARTICIPANT_CERTIFICATE_NOT_FOUND: new ApiErrorObject(404, "PARTICIPANT_CERTIFICATE_NOT_FOUND", "NOT_FOUND", { "fr": "Le certificat n'existe pas", "en": "The certificate does not exists"}),
	PARTICIPANT_ERROR_INTERNAL_GET_PARTICIPANTS: new ApiErrorObject(500, "PARTICIPANT_ERROR_INTERNAL_GET_PARTICIPANTS", "INTERNAL_ERROR", { "fr": "Problème pour retrouver tous les participants", "en": "Problem to retrieve all the participants"}),
	PARTICIPANT_ERROR_INTERNAL_GET_PARTICIPANT: new ApiErrorObject(500, "PARTICIPANT_ERROR_INTERNAL_GET_PARTICIPANT", "INTERNAL_ERROR", { "fr": "Problème pour retrouver le participant", "en": "Problem to retrieve the participant"}),
	PARTICIPANT_ERROR_INTERNAL_CHECK_PARTICIPANT: new ApiErrorObject(500, "PARTICIPANT_ERROR_INTERNAL_CHECK_PARTICIPANT", "INTERNAL_ERROR", { "fr": "Problème pour vérifier l'existence du participant", "en": "Problem to check if the participant already exists"}),
	PARTICIPANT_ERROR_INTERNAL_POST_PARTICIPANT: new ApiErrorObject(500, "PARTICIPANT_ERROR_INTERNAL_POST_PARTICIPANT", "INTERNAL_ERROR", { "fr": "Problème pour ajouter le participant", "en": "Problem to add the participant"}),
	PARTICIPANT_ERROR_INTERNAL_PUT_PARTICIPANT: new ApiErrorObject(500, "PARTICIPANT_ERROR_INTERNAL_PUT_PARTICIPANT", "INTERNAL_ERROR", { "fr": "Problème pour mettre à jour les informations du participant", "en": "Problem to update participant information"}),
	PARTICIPANT_ERROR_INTERNAL_DELETE_PARTICIPANT: new ApiErrorObject(500, "PARTICIPANT_ERROR_INTERNAL_DELETE_PARTICIPANT", "INTERNAL_ERROR", { "fr": "Problème pour supprimer le participant", "en": "Problem to remove the participant"}),

	// Generics Errors
	GENERIC_ERROR_REQUEST_FORMAT_ERROR: new ApiErrorObject(400, "GENERIC_ERROR_REQUEST_FORMAT_ERROR", "BAD REQUEST", { "fr": "La requête est mal formée", "en": "The request is malformed"}),
	GENERIC_ERROR_REQUEST_CONTENT_TYPE_ERROR: new ApiErrorObject(406, "GENERIC_ERROR_REQUEST_CONTENT_TYPE_ERROR", "NOT ACCEPTABLE", { "fr": "Le type de requète n'est pas supporté", "en": "The request type is unsupported"})
};

module.exports = {
	InternalErrorObject: InternalErrorObject,
	ApiErrorObject: ApiErrorObject,
	apiErrors: apiErrors
};