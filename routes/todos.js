var express = require('express');
var router = express.Router();
var Todo = require('../model/task');

// GET Tasks
router.get('/todos', function(req, res, next){
    // Todo.create({text: "YOLO", done: true});
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

// Save POST
router.post('/todo', function(req, res, next){
    var task = req.body;
    if(!task.text || !(task.done + '')){
        res.status(400);
        res.json({
            "error" : "Invalid Data"
        });
    } else {
        Todo.save(task, function(err, result){
            if(err){
                res.send(err);
            }
            res.json(result);
        });
    }
});

// Update Task
router.put('/todo:id', function(req, res, next){
    var task = req.body;
    var updatedObj = {};
    if(task.done){
        updatedObj.done = task.done;
    }
    if(task.text){
        updatedObj.text = task.text;
    }
    if(!updatedObj){
        res.status(400);
        res.json({
            "error" : "Invalid Data"
        });
    } else {
        Todo.update({
            _id: req.params.id
        }, updatedObj, {}, function(err, result){
            if(err){
                res.send(err);
            }
            res.json(result);
        }); 
    }
});

// Delete Task
router.delete('/todo:id', function(req, res, next){
    Todo.remove({
        _id: req.params.id
    }, '', function(err, result){
        if(err){
            res.send(err);
        }
        res.json(result);
    }); 
});

module.exports = router;