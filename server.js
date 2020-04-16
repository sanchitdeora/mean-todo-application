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
// var methodOverride = require('method-override');

var index = require('./routes/index');
var todos = require('./routes/todos');

mongoose.connect(database.url);
// View Engine
// console.log(path.join(__dirname + '/views'));
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + "/client"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.all('/*', function (req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
// 	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
// 	if (req.method == 'OPTIONS') {
// 		res.status(200).end();
// 	} else {
// 		next();
// 	}
// });

app.use('/', index);
app.use('/api/v1/', todos);

app.listen(port, function(){
    console.log("Server Listening at Port", + port);
});