// TODO Application Model for each LIST

var mongoose = require('mongoose');

module.exports = mongoose.model('List', {
	name : String,
	owner : String,
	members : [String],
	tasks: [String]
});