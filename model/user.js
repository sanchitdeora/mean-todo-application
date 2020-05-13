// TODO Application Model for each USER

var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    firstname : String,
    lastname : String,
    email : String,
	password : String,
	lists: [String]
});