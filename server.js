// Entry Point Server

// Load Express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var path = require('path');

// Load MongoDB
var mongoose = require('mongoose');
var mongojs = require('mongojs');
var database = require('./config/database');

var port = process.env.port || 9999;

var index = require('./routes/index');
var todos = require('./routes/todos');
var users = require('./routes/users');
var lists = require('./routes/lists');

mongoose.connect(database.url);

// View Engine
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + "/client"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/users', users);
app.use('/lists', lists);
app.use('/todos/', todos);

app.listen(port, function(){
    console.log("Server Listening at Port", + port);
});