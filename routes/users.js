var express = require('express');
var router = express.Router();
var User = require('../model/user');

// GET ALL Users
router.get('/all', function(req, res, next){
    console.log("Successfully Reached ALL Users");
    // User.create({
    //     firstname : "Sanchit",
    //     lastname : "Deora",
    //     email : "sanchitdeora@a.b",
    //     password : "123456",
    // });
    User.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
});

// GET Single User in Users
router.get('/todo/:id', function(req, res, next){
    console.log("Successfully Reached SINGLE User");
    User.findOne({
        _id: req.params.id
    }, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// Create User
router.post('/signup', function(req, res, next){
    console.log("Successfully Reached CREATE User");
    var user = req.body;
    if(!user.firstname || !user.lastname || !user.email || !user.password){
        res.status(400);
        res.json({
            "error" : "Invalid Data"
        });
    } else {
        User.create({
            firstname : user.firstname,
            lastname : user.lastname,
            email : user.email,
            password : user.password
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

// // Update User
// router.put('/todo/:_id', function(req, res, next){
//     console.log("Successfully Reached UPDATE");
//     var task = req.body;
//     var updatedObj = {};
//     console.log(task);
//     // if(task.done){
//         updatedObj.done = task.done;
//     // }
//     if(task.text){
//         updatedObj.text = task.text;
//     }
//     if(!updatedObj){
//         res.status(400);
//         res.json({
//             "error" : "Invalid Data"
//         });
//     } else {
//         console.log(updatedObj);
//         User.update({
//             _id: req.params
//         }, updatedObj, {}, function(err, result){
//             if(err){
//                 res.send(err);
//             }
//             console.log(result);
//             res.json(result);
//         }); 
//     }
// });

// // Delete User
// router.delete('/todo/:_id', function(req, res, next){
//     console.log("Successfully Reached DELETE");
//     console.log(req.body);
//     User.deleteOne({
//         _id: req.params._id
//     }, function(err, result){
//         if(err){
//             res.send(err);
//         }
//         res.json(result);
//     }); 
// });

module.exports = router;