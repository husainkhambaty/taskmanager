
//Libraries
var mongoose = require('mongoose');

// Get the schema
var Schema = mongoose.Schema;


// Define the model
var userSchema = new Schema({
	name: { type: String, required: true, unique: c },
	admin: Boolean,
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
var User = mongoose.model('users', userSchema);

module.exports = User;