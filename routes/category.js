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
var service_errors = require('../services/service-errors');
var apiErrors = service_errors.apiErrors;

// Models
var Category = sequelize.import('../models/category');


// ---------- ROUTES ----------

router.get('/all', authenticationAdmin, function(req, res, next) {

	Category.findAll({ raw: true, order:[['category_nom','DESC']] })
		.then( categorys => {
			if (categorys) {
				res.status(200);
				res.send(categorys);
			} else {
				res.status(202);
				res.send({
					"error": "NotFound",
					"code": 404,
					"message": "Pas de catégorie existante"
				});
			}
		})
		.catch( err => {
			res.status(500);
			res.send({
				"error": "InternalServerError",
				"code": 500,
				"message": "Probleme pour retrouver les catégories"+err
			});
		});

});

router.get('/:id', authenticationUser, function(req, res, next) {

	Category.findOne({ raw: true, where: { category_id: req.params.id } })
		.then( category => {
			if (category) {
				res.status(200);
				res.send(category);
			} else {
				res.status(202);
				res.send({
					"error": "NotFound",
					"code": 404,
					"message": "La catégorie n'existe pas"
				});
			}
		})
		.catch( err => {
			res.status(500);
			res.send({
				"error": "InternalServerError",
				"code": 500,
				"message": "Probleme pour vérifier l'existence de la catégorie"+err
			});
		});

});

router.post('/', authenticationAdmin, function(req, res, next) {

	Category.findOne({ where: {
			category_nom: req.body.category.category_nom,
		}})
		.then( result => {
			//If raw does not exist yet
			if(result == null){
				//Save the new role
				var categoryJSON = req.body.category;
				categoryJSON.category_id =  uuidv4();

				Category.create(categoryJSON)
					.then( result2 => {
						res.status(201).end();
					})
					.catch( err =>{
						res.status(500);
						res.send({
							"error": "InternalServerError",
							"code": 500,
							"message": "Création de la catégorie impossible :"+err
						});
					});
				//If role exists yet
			}else{
				res.status(202);
				res.send({
					"error": "CategoryAlreadyExist",
					"code": 409,
					"message": "La catégorie existe déjà"
				});
			}
		})
		.catch( err =>{
			res.send({
				"error": "InternalServerError",
				"code": 500,
				"message": "Probleme pour vérifier l'existence de la catégorie : "+err.message
			});
		});

});

router.put('/:id', authenticationAdmin, function(req, res, next) {

	if(req.is('application/json')){

		Category.findOne({ where: {
				category_id : req.params.id
			} })
			.then( result =>{

				if (result) {

					result.update(req.body.category)
						.then( result2 => {
							res.status(204).end();
						}).catch( err => {
						res.status(500);
						res.send({
							"error": "InternalServerError",
							"code": 500,
							"message": "Problem pour mettre à jour la catégorie : "+err
						});
					});

				} else {
					res.status(202);
					res.send({
						"error": "NotFound",
						"code": 404,
						"message": "La catégorie n'existe pas"
					});
				}
			})
			.catch( err =>{
				res.send({
					"error": "InternalServerError",
					"code": 500,
					"message": "Probleme pour vérifier l'existence de la catégorie : "+err
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

router.delete('/:id', authenticationAdmin, function(req, res, next) {

	Category.destroy({ where: {
			category_id : req.params.id,
		}})
		.then( result => {
			if (result > 0) {
				res.status(204).end();
			} else {
				res.status(202);
				res.send({
					"error": "NotFound",
					"code": 404,
					"message": "La catégorie n'existe pas"
				});
			}
		})
		.catch(err => {
			res.status(500);
			res.send({
				"error": "InternalServerError",
				"code": 500,
				"message": "Probleme pour supprimer la catégorie : "+err.message
			});
		});
});

module.exports = router;
