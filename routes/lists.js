var express = require('express');
var router = express.Router();
var List = require('../model/list');

// GET ALL Lists
router.get('/all', function(req, res, next){
    List.find(function(err, lists){
        if(err){
            res.send(err);
		}
        res.json(lists);
    });
});

// GET Single List in Lists
router.get('/currentlist/:_id', function(req, res, next){
    List.findOne({
        _id: req.params._id
    }, function(err, list){
        if(err){
            res.send(err);
        }
        res.json(list);
    });
});

// GET User Lists
router.put('/userlists/', function(req, res, next){
	var userlists = req.body;
	List.find({
		_id: userlists
	}, function(err, lists){
		if(err) {
			res.send(err);
		}
		res.json(lists);
	});
});

// Create List
router.post('/create', function(req, res, next){
    var list = req.body;
    if(!list.name || !list.owner){
        res.status(400);
        res.json({
            "error" : "Invalid Data"
        });
    } else {
        List.create({
            name : list.name,
            owner : list.owner,
			members : [],
			tasks: []
        }, function(err, list){
			if(err){
				res.send(err);
			}
			res.json(list);
        });
    }
});

// Update List
router.put('/edit/:_id', function(req, res, next){
    var list = req.body;
    var updatedList = {};
	updatedList.name = list.name;
	updatedList.owner = list.owner;
	updatedList.members = list.members;
	updatedList.tasks = list.tasks;
	List.update({
		_id: req.params._id
	}, updatedList, function(err, result){
		if(err){
			res.send(err);
		}
		res.json(result);
	}); 
});

// Delete List
router.delete('/delete/:_id', function(req, res, next){
    List.deleteOne({
        _id: req.params._id
    }, function(err, result){
        if(err){
            res.send(err);
        }
        res.json(result);
    }); 
});

module.exports = router;