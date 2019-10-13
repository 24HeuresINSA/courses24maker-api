var jsonWebToken = require("jsonwebtoken");
var sha256 = require('sha256');
var config_authentication = require('../config/config-authentication.json');

function buildJwt (audience, subject, scope) {
	let payload = {
		"iss": config_authentication["jwt-issuer"],
		"aud": audience,
		"sub": subject,
		"scope": scope
	};
	return jsonWebToken.sign(payload, config_authentication["jwt-private-key"]);
}

function hashPassword (password, salt) {
	return sha256.x2(password + salt);
}

function isPasswordChecked (passwordToCheck, realPassword, realSalt) {
	if (realPassword == hashPassword(passwordToCheck, realSalt)) {
		return true;
	} else {
		return false;
	}
}

module.exports = {
	buildJwt: buildJwt,
	hashPassword: hashPassword,
	isPasswordChecked: isPasswordChecked
};