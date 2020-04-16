var express = require('express');
var router = express.Router();
var Todo = require('../model/task');

// GET Tasks
router.get('/todos', function(req, res, next){
    Todo.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

// GET Single Task in TODOs
router.get('/todo/:id', function(req, res, next){
    Todo.findOne({
        _id: req.params.id
    }, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// Create POST
router.post('/todo', function(req, res, next){
    console.log("Successfully Reached Create");
    var task = req.body;
    if(!task.text || !(task.done + '')){
        res.status(400);
        res.json({
            "error" : "Invalid Data"
        });
    } else {
        Todo.create({
            text : task.text,
            done : false
        }, function(err, todo) {
            if(err){
                res.send(err);
            }
            Todo.find(function(err, tasks){
                if(err){
                    res.send(err);
                }
                res.json(tasks);
            });
        });
    }
});

// Update Task
router.put('/todo/:_id', function(req, res, next){
    console.log("Successfully Reached Update");
    var task = req.body;
    var updatedObj = {};
    console.log(task);
    // if(task.done){
        updatedObj.done = task.done;
    // }
    if(task.text){
        updatedObj.text = task.text;
    }
    if(!updatedObj){
        res.status(400);
        res.json({
            "error" : "Invalid Data"
        });
    } else {
        console.log(updatedObj);
        Todo.update({
            _id: req.params
        }, updatedObj, {}, function(err, result){
            if(err){
                res.send(err);
            }
            console.log(result);
            res.json(result);
        }); 
    }
});

// Delete Task
router.delete('/todo/:_id', function(req, res, next){
    console.log("Successfully Reached DELETE");
    Todo.remove({
        _id: req.params
    }, '', function(err, result){
        if(err){
            res.send(err);
        }
        res.json(result);
    }); 
});

module.exports = router;