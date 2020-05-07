// TODO Application Model for each List

// Define TODO Application model using Mongoose
var mongoose = require('mongoose');

module.exports = mongoose.model('List', {
	name : String,
	owner : String,
	members : [String],
	tasks: [String]
});