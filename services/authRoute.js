"use strict";
var express = require('express');
var router = express.Router();

const User= require('../models/models').User;

// TODO: message
//Get User get the conversation of each connection.
router.post('/facebookAuth', function(req, res) {

    var profile = req.body.result
    User.findOne({email: profile.email})
    .populate('activities', 'activityTitle activityLocation')
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

router.post('/googleAuth', function(req, res) {
  var profile = req.body.result
  User.findOne({email: profile.email})
  .populate('activities', 'activityTitle activityLocation')
  .exec(function(err, user) {
          if (err) {
              return {err, user}
          }
          if (!user) {
              var firstName = profile.givenName;
              var lastName = profile.familyName;
              var newUser = new User({
                  firstName: firstName,
                  lastName: lastName,
                  email: profile.email,
                  profileImg: profile.photo ? profile.photo : 'http://shurl.esy.es/y'
              });

              console.log(newUser)

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

// TODO: Edit an user
router.post('/editUser', function(req, res) {
    User.findOneAndUpdate({_id: req.body.userID}, req.body.userObject, function(err, user){
    if (err) return res.send(500, { error: err });

    res.send(user);

    return user

    });
});

module.exports = router;
