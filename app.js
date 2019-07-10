var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var bodyParser = require('body-parser');
var service_errors = require('./services/service-errors');

var https = require('https');
var fs = require('fs');

var indexRouter = require('./routes/index');
var coureurRouter = require('./routes/participant');
var equipeRouter = require('./routes/team');
var categorieRouter = require('./routes/category');
var authenticationRouter = require('./routes/authentication');

var app = express();
var router = express.Router();

/* https.createServer({
	key: fs.readFileSync('./config/key.pem'),
	cert: fs.readFileSync('./config/cert.pem')
}, app).listen(3011); */

//------------------------------ All required modules from Planizi repository -----------------------------------
var authenticationConfig = require('./config/config-authentication');
authenticationConfig.jwtAuthenticationConfiguration

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: "key"
}));

app.use(bodyParser.json({limit: '50mb'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css',express.static(path.join(__dirname,'public/css')));
app.use('/js',express.static(path.join(__dirname,'public/js')));
app.use('/vendor',express.static(path.join(__dirname,'public/vendor')));
app.use('/javascripts',express.static(path.join(__dirname,'public/javascripts')));

app.use('/authentication', authenticationRouter);
app.use('/', indexRouter);
app.use('/participants', coureurRouter);
app.use('/teams', equipeRouter);
app.use('/categories', categorieRouter);

app.use( function (err, req, res, next) {
	if (err instanceof service_errors.ApiErrorObject) {
		res.status(err.code);
		res.send(err);
	} else if ( err instanceof service_errors.InternalErrorObject) {
		res.status(err.apiError.code);
		console.log(err.internalError);
		res.send(err.apiError);
	}
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	console.log('ERROR ---> '+err+'\n'+err.message);

	res.status(err.status || 500);
	res.send(err+" --- "+err.message);
});

module.exports = app;
