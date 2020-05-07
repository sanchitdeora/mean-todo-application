var express = require('express');
var router = express.Router();
var List = require('../model/list');

// GET ALL Lists
router.get('/all', function(req, res, next){
    console.log("Successfully Reached ALL Lists");
	console.log("HEY");
	// console.log(lists);
	console.log("HI");
	// List.create({	
    //     name : "Shopping",
	// 	owner : "Sanchit",
	// 	members: ["Nupur"],
	//	tasks: []
	// });
    List.find(function(err, lists){
        if(err){
            res.send(err);
		}
		console.log(lists);
        res.json(lists);
    });
});

// GET Single List in Lists
router.get('/list/:id', function(req, res, next){
    console.log("Successfully Reached SINGLE List");
    List.findOne({
        _id: req.params.id
    }, function(err, list){
        if(err){
            res.send(err);
        }
        res.json(list);
    });
});

// Create List
router.post('/create', function(req, res, next){
    console.log("Successfully Reached CREATE List");
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
        }, function(err, todo) {
            if(err){
                res.send(err);
            }
            List.find(function(err, lists){
                if(err){
                    res.send(err);
                }
                res.json(lists);
            });
        });
    }
});

// Update List
router.put('/edit/:_id', function(req, res, next){
    console.log("Successfully Reached UPDATE");
    var list = req.body;
    var updatedList = {};
    console.log(list);
    // if(task.done){
		updatedList.name = list.name;
		updatedList.owner = list.owner;
    // }
		updatedList.members = list.members;
		updatedList.tasks = list.tasks;
    if(!updatedList){
        res.status(400);
        res.json({
            "error" : "Invalid Data"
        });
    } else {
        console.log(updatedList);
        List.update({
            _id: req.params
        }, updatedList, {}, function(err, result){
            if(err){
                res.send(err);
            }
            console.log(result);
            res.json(result);
        }); 
    }
});

// Delete List
router.delete('/delete/:_id', function(req, res, next){
    console.log("Successfully Reached DELETE");
    console.log(req.body);
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