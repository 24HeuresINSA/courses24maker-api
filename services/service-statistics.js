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

/* The database SQL request parameters for the request DELETE /categories/:id */
function getTeamNumberPromise (){
	return Participant.findAll({
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
		}});
}

function getSQLJointureToExportTheWholeDatabase (){
	return "SELECT participant_id, participant_name, participant_surname, participant_birthdate, participant_email, participant_telephone, participant_payment, participant_medical_certificate_valid, participant_student_certificate_valid, participant_tee_shirt_size, participant_comment, participant_message, " +
		"category_label, category_price_regular, category_price_student, category_type, team_id, team_name, team_valid, " +
		"participant.createdAt as participant_creationDate, participant.updatedAt as participant_updatedDate, team.createdAt as team_creationDate\n" +
		"FROM `courses24maker-api-dev`.participant " +
		"LEFT JOIN `courses24maker-api-dev`.team ON participant.participant_team_id = team.team_id " +
		"LEFT JOIN `courses24maker-api-dev`.category ON team.team_category_id = category.category_id"
};

module.exports = {
	getSQLJointureToExportTheWholeDatabase: getSQLJointureToExportTheWholeDatabase
};