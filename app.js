
/* Configure your paths */
global.rootPath = __dirname;
var libPath = rootPath + "/lib";
var logPath = rootPath + "/logs";

/* Import your libraries */
var config = require('config');
var logger = require(libPath + '/logger.js');
var db = require(libPath + "/db.js");
var web = require(libPath + "/webserver.js");

/* Get your configs */
var dbConfig = config.get("db");
var appConfig = config.get("app");
var webConfig = config.get("web");

/* Configure the logger */
var log = logger.configure(logPath);


/* Start app */
function startApp() {

	// Init the DB

	// db.connect(dbConfig, function(err, conn) {
	// 	if (err) throw err;
	// 	else console.log("DB has been connected");
	// });

	// Init the Webserver
	web.init(webConfig);

}

startApp();