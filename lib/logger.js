/* logger.js */

// FEATURE: Implement debug module, winston lib and Trace
// See: https://blog.risingstack.com/node-js-logging-tutorial/

const fs = require('fs');

module.exports = {

	// TODO: Understand how to destroy or close the file write streams in js
	configure : function(logPath) {
		
		var logger = {
			//app : fs.createWriteStream(logPath + "/app.log"),
			//web : fs.createWriteStream(logPath + "/server.log")
			app : logPath + "/app.log",
			web : logPath + "/server.log"
		}
		return logger;
	}


}
