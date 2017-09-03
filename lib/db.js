/* db.js */

// Load the require libraries // TODO: Make this more generic so that we can load the libraries according to the type of DB
const mongoose = require('mongoose');

var rootPath = global.rootPath;

// Setup the promise
mongoose.Promise = global.Promise;


module.exports = {
	// TODO : Setup the creds later. For now basic stuff
	// TODO : Make this into a singleton object so that we can't call connect again and again unless it has disconnected
	
	// BUG : seems the mongoose.connect doesn't check if the db exists. Gives success everytime.

	connect : function(dbConfig, done) {
		console.log("Connecting to mongodb://" + dbConfig.host + ":" + dbConfig.port + "/" + dbConfig.dbName + "");
		mongoose.connect("mongodb://" + dbConfig.host + ":" + dbConfig.port + "/" + dbConfig.dbName + "", {
			useMongoClient: true,
		  /* other options */
		}, function(err) {
			if (err) {
				console.log(err);
				if(done) done(err); 
				else console.error("DB connection failed");
			}
			if (done) done(false, mongoose);
			else console.log("DB connection successful");
		});
	}, 
	disconnect : function(dbConfig) {

	}
}




/*
USAGE: 

	db.connect(dbConfig, function(err, connection) {
		if (err) throw err;
		// DO SOMETHING or use connection further
	});

	db.connect(dbConfig);


*/