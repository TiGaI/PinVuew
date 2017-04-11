"use strict";
var express = require('express');
var router = express.Router();

const User= require('../models/models').User;

// TODO: message
//Get User get the conversation of each connection.
router.post('/facebookAuth', function(req, res) {

    var profile = req.body.result
    User.findOne({email: profile.email})
    .populate('activities', 'activityTitle activityImages timeStart timeEnd')
    .exec(function(err, user) {
            if (err) {
                return {err, user}
            }
            if (!user) {
                var Name = profile.name.toString().split(' ');
                var firstName = Name[0];
                var lastName = Name[Name.length - 1];
                var newUser = new User({
                    firstName: firstName,
                    lastName: lastName,
                    email: profile.email,
                    age: profile.age_range.min,
                    gender: profile.gender,
                    bio: profile.about,
                    profileImg: profile.picture ? profile.picture.data.url : 'http://shurl.esy.es/y'
                });
                newUser.save(function(err) {
                    if (err) console.log(err);
                    res.send(user)
                    return {err, user}
                });
            } else {
              res.send(user)
              return user
            }
        });
});

// TODO: Linkedin
router.post('/linkedinAuth', function(req, res) {
    // req.body.id

});

// TODO: return Current user
router.get('/getCurrentUser', function(req, res) {
    User.findOne({_id: req.body.userID}, function(err, user) {
            if (err) {
                return {err, user}
            }
            if (user) {
                return user
            } else {
              console.log("cannot find user");
              return null
            }
        });
});

// TODO: Edit an user
router.post('/editUser', function(req, res) {
    // req.body.id
    User.findOneAndUpdate({_id: req.body.id}, req.body.data, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
    });

});

module.exports = router;
