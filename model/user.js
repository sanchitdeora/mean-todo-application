// TODO Application Model for each User

// Define TODO Application model using Mongoose
var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    firstname : String,
    lastname : String,
    email : String,
    password : String,
});