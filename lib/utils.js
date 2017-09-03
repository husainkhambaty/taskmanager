var rootPath = global.rootPath;

var Task = require(rootPath + "/model/task.js");

module.exports = {
	getAllTasks : function(req, res) {
		Task.find({}, function(err, tasks) {
			var obj = [];
			
			if (err) {
				throw err;
				res.render('error', { status: 500 }); 
			}
			
			tasks.forEach(function(task) {
				obj.push({name: task.name, command: task.command, updated_at: task.updated_at});
			});

			res.jsonp(obj);

		});
		
	}
}



