// ---------- IMPORT ----------

// Middlewares and modules
var express = require('express');
var router = express.Router();
var passport = require('passport');
var uuidv4 = require('uuid/v4');
const fs = require('fs');
var sequelize = require('../config/config-database').sequelize;

// Configuration files
const {authenticationAdmin} = require("../config/config-authentication");
const {authenticationUser} = require("../config/config-authentication");

// Service files
var service_errors = require('../services/service-errors');
var apiErrors = service_errors.apiErrors;

// Models
var Category = sequelize.import('../models/category');
var Team = sequelize.import('../models/team');
var Participant = sequelize.import('../models/participant');


// ---------- ROUTES ----------

router.get('/all/all', function(req, res, next) {

	Team.findAll({ raw: true, include: [{model: Participant},{model: Category}], order:[['team_nom','DESC']]})
		.then( participant => {
			if (participant) {
				res.status(200);
				res.send(participant);
			} else {
				res.status(202);
				res.send({
					"error": "NotFound",
					"code": 404,
					"message": "Aucun participant pour cette équipe"
				});
			}
		})
		.catch( err => {
			res.status(500);
			res.send({
				"error": "InternalServerError",
				"code": 500,
				"message": "Problem pour trouver les participants de l'équipe : "+err
			});
		});

});

router.get('/all/team/:id', function(req, res, next) {

	Participant.findAll({ raw: true, where: { participant_team: req.params.id } })
		.then( participant => {
			if (participant) {
				res.status(200);
				res.send(participant);
			} else {
				res.status(202);
				res.send({
					"error": "NotFound",
					"code": 404,
					"message": "Aucun participant pour cette équipe"
				});
			}
		})
		.catch( err => {
			res.status(500);
			res.send({
				"error": "InternalServerError",
				"code": 500,
				"message": "Problem pour trouver les participants de l'équipe : "+err
			});
		});

});

router.get('/:id', function(req, res, next) {

	Participant.findOne({ raw: true, where: { participant_id: req.params.id } })
		.then( participant => {
			if (participant) {
				res.status(200);
				res.send(participant);
			} else {
				res.status(202);
				res.send({
					"error": "NotFound",
					"code": 404,
					"message": "Le participant n'existe pas"
				});
			}
		})
		.catch( err => {
			res.status(500);
			res.send({
				"error": "InternalServerError",
				"code": 500,
				"message": "Probleme pour mettre à jour l'équipe : "+err
			});
		});

});

router.post('/', function(req, res, next) {

	Participant.findOne({ where: {
			participant_nom: req.body.participant.participant_nom,
			participant_prenom: req.body.participant.participant_prenom,
			participant_date_naissance: req.body.participant.participant_date_naissance,
		}})
		.then( result => {
			//If raw does not exist yet
			if(result == null){
				//Save the new role
				var participantJSON = req.body.participant;
				participantJSON.participant_id =  uuidv4();
				participantJSON.participant_certificat_valide = 0;
				participantJSON.participant_paiement = 0;

				Participant.create(participantJSON)
					.then( result2 => {
						res.status(201).end();
					})
					.catch( err =>{
						res.status(500);
						res.send({
							"error": "InternalServerError",
							"code": 500,
							"message": "Création de le participant impossible : "+err
						});
					});
				//If role exists yet
			}else{
				res.status(202);
				res.send({
					"error": "ParticipantAlreadyExist",
					"code": 409,
					"message": "Le participant existe déjà"
				});
			}
		})
		.catch( err =>{
			res.send({
				"error": "InternalServerError",
				"code": 500,
				"message": "Probleme pour vérifier l'existence de le participant : "+err.message
			});
		});

});

router.put('/:id', function(req, res, next) {

	if(req.is('application/json')){

		Participant.findOne({ where: {
				participant_id : req.params.id
			} })
			.then( result =>{

				if (result) {

					result.update(req.body.participant)
						.then( result2 => {
							res.status(204).end();
						}).catch( err => {
						res.status(500);
						res.send({
							"error": "InternalServerError",
							"code": 500,
							"message": "Problem pour mettre à jour le participant : "+err
						});
					});

				} else {
					res.status(202);
					res.send({
						"error": "NotFound",
						"code": 404,
						"message": "Le participant n'existe pas"
					});
				}
			})
			.catch( err =>{
				res.send({
					"error": "InternalServerError",
					"code": 500,
					"message": "Probleme pour vérifier l'existence de le participant"+err
				});
			});

	}else{
		res.status(406);
		res.send({
			"error": "BadContentType",
			"code": 406,
			"message": "Content-type received: "+req.get('Content-Type')+". Content-type required : application/json"
		});
	}

});

router.put('/certificat/:id', function(req, res, next) {

	if(req.is('application/json')){

		Participant.findOne({ where: {
				participant_id : req.params.id
			} })
			.then( result =>{

				if (result) {
					var participant = req.body.participant;

					if(result.participant_certificat_valide != 1) {
						fs.writeFile("public/certificats/" + result.participant_nom + '_' + result.participant_prenom + '_' + participant.participant_certificat_fichier + '.' + participant.extension, Buffer.from(participant.participant_certificat_buffer), function (err) {
							if (err) {
								return console.log(err);
							}
							console.log("The file was saved!");
						});

						result.update({
							participant_certificat_valide: 3,
							participant_certificat_fichier: result.participant_nom+'_'+result.participant_prenom+'_'+participant.participant_certificat_fichier+'.'+participant.extension
						})
							.then(result2 => {
								res.status(204).end();
							}).catch(err => {
							res.status(500);
							res.send({
								"error": "InternalServerError",
								"code": 500,
								"message": "Problem pour mettre à jour le participant : " + err
							});
						});
					}
				} else {
					res.status(202);
					res.send({
						"error": "NotFound",
						"code": 404,
						"message": "Le participant n'existe pas"
					});
				}
			})
			.catch( err =>{
				res.send({
					"error": "InternalServerError",
					"code": 500,
					"message": "Probleme pour vérifier l'existence de le participant"+err
				});
			});

	}else{
		res.status(406);
		res.send({
			"error": "BadContentType",
			"code": 406,
			"message": "Content-type received: "+req.get('Content-Type')+". Content-type required : application/json"
		});
	}

});

router.delete('/:id', function(req, res, next) {

		Participant.destroy({
			where: {
				participant_id: req.params.id,
			}
		})
			.then(result => {
				if (result > 0) {
					res.status(204).end();
				} else {
					res.status(202);
					res.send({
						"error": "NotFound",
						"code": 404,
						"message": "Le participant n'existe pas"
					});
				}
			})
			.catch(err => {
				res.status(500);
				res.send({
					"error": "InternalServerError",
					"code": 500,
					"message": "Probleme pour supprimer le participant : " + err.message
				});
			});

});

module.exports = router;