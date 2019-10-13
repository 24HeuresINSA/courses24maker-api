// ---------- IMPORT ----------

// Middlewares and modules
var passport = require('passport');
var LocalStrategy = require('passport-local');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var sha256 = require('sha256');
var sequelize = require('../config/config-database').sequelize;

// Configuration files
var config_authentication = require('./config-authentication.json');

// Service files
var service_errors = require('../services/service-errors');
var apiErrors = service_errors.apiErrors;

// Models
var Team = sequelize.import('../models/team');

let jwtAuthenticationConfiguration = passport.use(new JwtStrategy({
	"jwtFromRequest": ExtractJwt.fromAuthHeaderAsBearerToken(),
	"secretOrKey": config_authentication["jwt-private-key"]
	},
	function(jwt, done) {
		if (jwt.scope == config_authentication["admin-jwt-scope"]) {
			return done(null, { scope: jwt.scope, team: null });
		}
		else {
			Team.findOne({ raw: true, where: { team_id: jwt.sub }})
				.then( team => {
					if (!team) {
						return done(null, false);
					}
					return done(null, { scope: jwt.scope, team: team });
				})
				.catch( err => {
					return done(err);
				});
		}
	}
));

const authenticationAdmin = function(req, res, next){
	passport.authenticate('jwt', { session: false }, function(err, user, info) {
		// Check the request is authenticate
		err ? next(new service_errors.InternalErrorObject(apiErrors.AUTHENTICATION_ERROR_INTERNAL_AUTHENTICATION, err), req, res) : null;
		!user ? next(apiErrors.AUTHENTICATION_ERROR_UNAUTHORIZED, req, res) : null;
		user.scope != config_authentication["admin-jwt-scope"] ? next(apiErrors.AUTHENTICATION_ERROR_FORBIDDEN, req, res) : null;
		req.user = user;
		next();
	})(req, res, next);
};

const authenticationUser = function(req, res, next){
	passport.authenticate('jwt', { session: false }, function(err, user, info) {
		// Check the request is authenticate
		err ? next(new service_errors.InternalErrorObject(apiErrors.AUTHENTICATION_ERROR_INTERNAL_AUTHENTICATION, err), req, res) : null;
		!user ? next(apiErrors.AUTHENTICATION_ERROR_UNAUTHORIZED, req, res) : null;
		req.user = user;
		next();
	})(req, res, next);
};


module.exports = {
	jwtAuthenticationConfiguration: jwtAuthenticationConfiguration,
	authenticationAdmin: authenticationAdmin,
	authenticationUser: authenticationUser
};