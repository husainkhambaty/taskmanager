/* routes.js */
/* This module will be an implementation for each app. You can customize your webserver routes as required. */

// TODO : Put this into another folder as this isn't a library but an implementation
// TODO : Add logger here to redirect logging to server.log

// Load your libraries
var rootPath = global.rootPath;

module.exports = {

	/* setupRoutes is the initial called function. This can be further call any number of route setup functions */
	setupRoutes : function(app, done) {

		console.log("Setting up Routes");

		this.setupView(app);
		this.setupAPI(app);

		// Dont forget the callback. Do error handling if required.
		done();
	},
	setupView : function(app) {
		app.get('/', function(req, res){
  
			console.log("/ - Homepage");
			res.render('home.jade', 
				{ 
					title: "TaskDirect",
					page: "home"
				}
			);
		  
		});


		app.route('/new')
			.get(function(req, res){
		  
				console.log("/new - New Task");
				res.render('newtask.jade', 
					{ 
						title: "TaskDirect - Create new Task",
						page: "tasks"
					}
				);
			  
			})
			.post(function(req, res) {
				console.log("/new - Create New Task");
				api.postNewTaskAPICall(function(data) {
			  		res.render('tasks.jade', 
						{ 
							title: "TaskDirect - Tasks",
							page: "tasks", 
							result: data
						}
					);
			  });
			});

		app.get('/tasks', function(req, res){
		  
		  console.log("/tasks - getAllTasksAPICall()");
		  api.getAllTasksAPICall(function(data) {
		  		res.render('tasks.jade', 
					{ 
						title: "TaskDirect - Tasks",
						page: "tasks", 
						result: data
					}
				);
		  });
		  
		});

	},
	setupAPI : function(app) {
		app.route('/api/tasks')
			/* 
				Will create a new task
			*/
			.post(function(req, res) {
				
				// Create the user task
				var task = new Task({
					taskid: uuid(),
					name: req.body.name,
					command: req.body.command,
					adminTask: false
				});

				// Setup logger
				console.log("obj created");

				// Save the task to DB
				task.save(function(err) {
					if (err) {
						throw err;
						res.render('error', { status: 500 });

					} else {
						console.log('User Task created successfully - ' + task.taskid);
						res.jsonp({message: "Task created successfully", id: task.taskid});
						
					}
				});
				
			})
			/* 
				Will fetch all the tasks. 
				TODO: Need to sort and limit the records fetched. Then can accept optional params to increase the limit or page it.
			*/
			.get(function(req, res) {
				taskUtils.getAllTasks(req, res);
			});

		app.route('/api/tasks/:taskid')

			/* 
				Will return object with {name, command, updated_at}
			*/
			.get(function(req, res) {

				var id = req.params.taskid;

				// Will find one record as the taskid is unique
				Task.findOne({ 'taskid' : id  }, function(err, taskObj) {
					// if error occurs
					if (err) { 
						throw err; res.render('error', { status: 500 }); 
						res.send("Error");
					} else {
						// construct the object
						res.jsonp({ name: taskObj.name, command: taskObj.command, updated_at: taskObj.updated_at });
						
					}
				});
			})

			/*
				Update the task information with the given task id
			*/
			.put(function(req, res) {
				var id = req.params.taskid;

				// Will find one record as the taskid is unique
				Task.findOne({ 'taskid' : id  }, function(err, taskObj) {
					// if error occurs
					if (err) { 
						throw err; res.render('error', { status: 500 }); 
						res.send("Error");
					} else {
						// construct the object
						res.jsonp({ name: taskObj.name, command: taskObj.command, updated_at: taskObj.updated_at });
						
					}
				});
			});

		app.route('/api/tasks/:taskid/schedule')
			.post(function(req, res) {
				
			});
	}

}