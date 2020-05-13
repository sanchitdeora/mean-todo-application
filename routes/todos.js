var express = require('express');
var router = express.Router();
var Todo = require('../model/task');

// GET All Tasks
router.get('/getAll', function(req, res, next){
    Todo.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

// GET Single Task in TODOs
router.get('/getById/:id', function(req, res, next){
    Todo.findOne({
        _id: req.params.id
    }, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// Create Task
router.post('/save', function(req, res, next){
    var task = req.body;
    if(!task.text || !(task.done + '')){
        res.status(400);
        res.json({
            "error" : "Invalid Data"
        });
    } else {
        Todo.create({
			text : task.text,
			author : task.author,
			list : task.list,
			priority: task.priority,
            done : false
        }, function(err, todo) {
            if(err){
                res.send(err);
            }
            res.json(todo);
        });
    }
});

// Get Tasks by List
router.put('/listTodos', function(req, res, next){
	var tasks = req.body;
	Todo.find({
		_id: tasks
	}, function(err, todos) {
		if(err) {
			res.send(err);
		}
		res.json(todos);
	});
});

// Update Task
router.put('/update/:_id', function(req, res, next){
    var task = req.body;
    var updatedObj = {};
	if(task.text){
		updatedObj.text = task.text;
	}
	updatedObj.author = task.author;
	updatedObj.list = task.list;
	updatedObj.priority = task.priority;
	updatedObj.done = task.done;
    if(!updatedObj){
        res.status(400);
        res.json({
            "error" : "Invalid Data"
        });
    } else {
        Todo.update({
            _id: req.params
        }, updatedObj, {}, function(err, result){
            if(err){
                res.send(err);
            }
            res.json(result);
        }); 
    }
});

// Delete Task
router.delete('/delete/:_id', function(req, res, next){
    Todo.deleteOne({
        _id: req.params._id
    }, function(err, result){
        if(err){
            res.send(err);
        }
        res.json(result);
    }); 
});

module.exports = router;