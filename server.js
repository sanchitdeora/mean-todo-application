// Entry Point Server


// Load Express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var path = require('path');

// Load MongoDB
var mongoose = require('mongoose');
var mongojs = require('mongojs');

var port = process.env.port || 9999;
// var methodOverride = require('method-override');

var index = require('./routes/index');
var todos = require('./routes/todos');

// View Engine
app.set('views', path.join(__dirname + '/views'));
app.set('view_engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api/v1/', todos);

app.listen(port, function(){
    console.log("Server Listening at Port", + port);
});