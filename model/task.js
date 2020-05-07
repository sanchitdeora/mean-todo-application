// TODO Application Model for each TASK

// Define TODO Application model using Mongoose
var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
	text : String,
	author : String,
	priority: String,
    done : Boolean
});