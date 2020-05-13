// TODO Application Model for each TASK

var mongoose = require('mongoose');

module.exports = mongoose.model('Todo', {
	text : String,
	author : String,
	list: String,
	priority: String,
    done : Boolean
});