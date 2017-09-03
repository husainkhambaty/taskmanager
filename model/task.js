
//Libraries
var mongoose = require('mongoose');

// Get the schema
var Schema = mongoose.Schema;


// Define the model
var taskSchema = new Schema({
	taskid: { type: String, required: true, unique: true },
	name: { type: String, required: true, unique: false },
	adminTask: Boolean,
	type: String,
	command: { type: String, required: true, unique: false },
	created_at: Date,
	updated_at: Date
});

// Define the save pre-step
taskSchema.pre('save', function(next) {

	// Save the updated_at and created_at timestamps
	var currentDate = new Date();

	// Set the last updated time
	this.updated_at = currentDate;

	// Only change this if its for the first time
	if (!this.created_at) {
		this.created_at = currentDate;
	}

	// Call the next functionality
	next();
})
	


var Task = mongoose.model('tasks', taskSchema);

module.exports = Task;