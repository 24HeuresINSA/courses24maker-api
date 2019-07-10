var express = require('express');
var router = express.Router();
var sequelize = require('../config/config-database').sequelize;
var Category = sequelize.import('../models/category');
var Team = sequelize.import('../models/team');
var Participant = sequelize.import('../models/participant');


/* GET home page. */

router.get('/', function(req, res, next) {
	res.redirect('/connexion');
});

router.get('/admin', function(req, res, next) {
	if(req.session.user){
		res.render('admin');
	}else{
		res.redirect('/');
	}
});

router.get('/admin/participants', function(req, res, next) {

	if(req.session.user){
		Team.findAll({ raw: true, include: [{model: Participant},{model: Category}], order:[['team_nom','DESC']]})
			.then( participant => {
				if (participant) {
					res.render('participants', { participants: participant });
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
	}else{
		res.redirect('/');
	}

});

router.get('/admin/teams', function(req, res, next) {

	if(req.session.user){
		var promiseCategorys = Category.findAll({ raw: true, order:[['category_nom','DESC']] });
		var promiseTeam = Team.findAll({ raw: true, include: [{model: Category}] });
		var promiseParticipant = Team.findAll({ raw: true, include: [{model: Participant},{model: Category}], order:[['team_nom','DESC']]});

		var promises = [];
		var promisess = [];

		Promise.all([promiseCategorys, promiseParticipant, promiseTeam, promises])
			.then( result => {
				if (result[0]) {
					result[0].forEach((elem, index)=>{
						promises.push(sequelize.query('SELECT COUNT (DISTINCT team_id) AS nb FROM team WHERE team_category = :category ', { replacements: { category: elem.category_id }, type: sequelize.QueryTypes.SELECT }));
					});
					result[0].forEach((eleme, index)=>{
						promisess.push(sequelize.query('SELECT COUNT (DISTINCT participant_id) AS nbc FROM participant INNER JOIN team ON team.team_id = participant.participant_team WHERE team.team_category = :category ', { replacements: { category: eleme.category_id }, type: sequelize.QueryTypes.SELECT }));
					});
					Promise.all(promises)
						.then(ress =>{
							ress.forEach((ee, i)=>{
								result[0][i]['nb_teams'] = ee[0]['nb'];
							});
							Promise.all(promisess)
								.then(resss => {
									resss.forEach((ee, i) => {
										result[0][i]['nb_participants'] = ee[0]['nbc'];
									});
									res.render('teams', {participants: result[1], categorys: result[0], teams: result[2]});
								})
								.catch(err =>{

								});
						})
						.catch(err =>{

						});

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
	}else{
		res.redirect('/');
	}

});

router.get('/admin/categorys', function(req, res, next) {

	if(req.session.user){
		Category.findAll({ raw: true })
			.then( categorys => {
				if (categorys) {
					res.render('categorys', { categorys: categorys });
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
	}else{
		res.redirect('/');
	}

	Category.findAll({ raw: true })
		.then( categorys => {
			if (categorys) {
				res.render('categorys', { categorys: categorys });
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

router.get('/deconnexion', function(req, res, next) {
	req.session.team = null;
	req.session.destroy();
	res.redirect('/');
});

router.get('/connexion', function(req, res, next) {
	if(!req.session.user){
		res.render('connexion');
	}else{
		res.redirect('/admin');
	}
});

router.post('/connexion', function(req, res, next) {

	if (req.body.password == 'pedale@roti24h') {
		req.session.user = 'admin';
		res.redirect('/admin');
	} else {
		req.session.destroy();
		res.redirect('/connexion');
	}

});

module.exports = router;
