var mysql = require('mysql');
var config_database = require('./config-database.json');
const Sequelize = require('sequelize');

var con = mysql.createConnection({
	host: config_database.mysql[process.argv[2]].host,
	user: config_database.mysql[process.argv[2]].user,
	password: config_database.mysql[process.argv[2]].password,
	port: config_database.mysql[process.argv[2]].port
});

let mysqlConnexion = function () {
	con.connect(function (err) {
		if (err) throw err;
		console.log("Connected to DB !");
	});
}

const sequelize = new Sequelize(config_database.mysql[process.argv[2]].database,
		config_database.mysql[process.argv[2]].user,
		config_database.mysql[process.argv[2]].password,
		{
			host: config_database.mysql[process.argv[2]].host,
			dialect: 'mysql',
			operatorsAliases: false,
			port: config_database.mysql[process.argv[2]].port,
			pool: {
				max: 5,
				min: 0,
				acquire: 30000,
				idle: 10000
			}
});

let sequelizeAuthentication = function () {
	sequelize.authenticate()
		.then(function (err) {
			console.log('Connected to DB with Sequelize !');
		}, function (err) {
			console.log('Connexion to DB with Sequelize do not works');
			console.log(err);
		})
};

module.exports = {
	mysqlDatabaseConfiguration: mysqlConnexion,
	sequelizeInitialisation: sequelizeAuthentication,
	sequelize: sequelize
}
