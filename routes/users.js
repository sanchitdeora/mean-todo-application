var express = require('express');
var router = express.Router();
var User = require('../model/user');

// GET ALL Users
router.get('/all', function(req, res, next){
    User.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
});
// GET Single User in Users
router.get('/userById/:_id', function(req, res, next){
    User.findOne({
        _id: req.params._id
    }, function(err, user){
        if(err){
            res.send(err);
		}
        res.json(user);
    });
});

// GET Single User By Email in Users
router.get('/userByEmail/:email', function(req, res, next){
	User.findOne({
        email: req.params.email
    }, function(err, user){
        if(err){
            res.send(err);
		}
        res.json(user);
	});
});

// Create User
router.post('/signup', function(req, res, next){
    var user = req.body;
    if(!user.firstname || !user.lastname || !user.email || !user.password){
        res.status(400);
        res.json({
            "error" : "Invalid Data"
        });
    } else {
		User.findOne({
			email: user.email
		}, function(err, todo){
			if(err){
                res.send(err);
			}
			if(todo==null) {
				User.create({
					firstname : user.firstname,
					lastname : user.lastname,
					email : user.email,
					password : user.password,
					lists: []
				}, function(err, todo) {
					if(err){
						res.send(err);
					}
					User.find(function(err, users){
						if(err){
							res.send(err);
						}
						res.json(users);
					});
				});
			}
		});
    }
});

// Check User Credential
router.put('/checkCredential/:email', function(req, res, next){
	var currUser = req.body;
	User.findOne({
        email: req.params.email
    }, function(err, user){
        if(err){
            res.send(err);
		}
        if(user.password == currUser.password){
			res.json(true);
		} else {
			res.json(false);
		}
	});
});

// Update User
router.put('/currentuser/:_id', function(req, res, next){
	var user = req.body;
	var updatedUser = {};
	updatedUser.firstname = user.firstname;
	updatedUser.lastname = user.lastname;
	updatedUser.email = user.email;
	updatedUser.password = user.password;
	updatedUser.lists = user.lists;
	User.update({
		_id: req.params
	}, updatedUser, {}, function(err, result){
		if(err){
			res.send(err);
		}
		res.json(result);
	}); 
});

// Delete User
router.delete('/todo/:_id', function(req, res, next){
    console.log("Successfully Reached DELETE");
    console.log(req.body);
    User.deleteOne({
        _id: req.params._id
    }, function(err, result){
        if(err){
            res.send(err);
        }
        res.json(result);
    }); 
});

module.exports = router;