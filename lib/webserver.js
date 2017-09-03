/* webserver.js */

// TODO: Make the servers as "this"

/* Import your libraries */
var express = require('express'), app = express();
var bodyParser = require('body-parser');
var http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);


var cookieParser = require('cookie-parser');
var stylus = require('stylus');
var session = require('express-session');
var jade = require('jade');

// TODO: Change this path when this has been moved.
var routes = require('./routes.js');

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

var rootPath = global.rootPath;

module.exports = {

	init : function(webConfig, done) {

		console.log("Initializing the Webserver");

		app.use(bodyParser.json()); // support json encoded bodies
		app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

		// Views Options

		app.set('views', rootPath + '/views');
		app.set('view engine', 'jade');
		
		//app.use(express.logger('dev'));
		app.set("view options", { layout: false });
		app.use(stylus.middleware(
		  { src: rootPath + '/public',
		  	compile: compile
		  }
		));

		app.use(cookieParser());

		app.use(express.static(rootPath + '/public'));

		// Setup Routes
		routes.setupRoutes(app, function() {
			console.log("Routes setup complete");
		});

		// Run start
		this.start(webConfig, done);

	}, 
	start : function(webConfig, done) {
		console.log("Starting the Webserver");

		server.listen(webConfig.port);
		// // app.listen(appPort);
		console.log("Webserver started on " + webConfig.port);

	}, 
	restart : function(webConfig, done) {


	}, 
	stop : function(webConfig, done) {


	}

}