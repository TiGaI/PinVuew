"use strict";
var express = require('express');
var router = express.Router();
var _ = require('underscore');
var moment = require('moment');

//model
const User  = require('../models/models').User;
const Activity= require('../models/models').Activity;
const userNotification= require('../models/models').userNotification;

// dlon = lon2 - lon1
// dlat = lat2 - lat1
// a = (sin(dlat/2))^2 + cos(lat1) * cos(lat2) * (sin(dlon/2))^2
// c = 2 * atan2( sqrt(a), sqrt(1-a) )
// d = R * c (where R is the radius of the Earth)

function getRangeofLonLat(lon, lat, kilometer){
  console.log(kilometer/110.574)
  var constant = kilometer/110.574;

  if(lon > 0){
    var minLongitude = lon + kilometer/(111.320*Math.cos((lat + constant)* (Math.PI/180)))
    var maxLongitude = lon - kilometer/(111.320*Math.cos((lat - constant)* (Math.PI/180)))
  }else{
    var minLongitude = lon - kilometer/(111.320*Math.cos((lat - constant)* (Math.PI/180)))
    var maxLongitude = lon + kilometer/(111.320*Math.cos((lat + constant)* (Math.PI/180)))
  }

  if(lat < 0){
    var minLatitude = lat + constant
    var maxLatitude = lat - constant
  }else{
    var minLatitude = lat - constant
    var maxLatitude = lat + constant
  }

  return {minLatitude: minLatitude,
          maxLatitude: maxLatitude,
          minLongitude: minLongitude,
          maxLongitude: maxLongitude
}
}

router.post('/getSortandGroupActivity', function(req, res){

    Activity.find({$and: [
      {'createdAt': {'$gt': new Date(Date.now() - 6*24*60*60*1000)}},
          {'_id' : {'$in': req.body.myActivity}}
        ]}).sort('-createdAt').exec(function(err, activities){

          if(err){
            console.log(err);
            res.send(err);
            return err
          }

          var newObject = {};
          var copy, y;

          var x = _.groupBy(activities, function (date) {
            return moment(date.activityStartTime).format("DD/MM/YYYY");
          });

          for (var key in x) {
              y =  _.groupBy(x[key], 'activityCategory');
              newObject[key] = y;
          }
          var totalPinsPerDay = 0;
          var totalHoursPerDay = 0;
          _.map(newObject, function(num, key){
              _.map(newObject[key], function(num2, key2){
                totalPinsPerDay += newObject[key][key2].length
                var tempObject = newObject[key][key2].reduce(function(sum, next){
                    sum.activityDuration = sum.activityDuration + next.activityDuration;
                    return sum;
                })
                totalHoursPerDay += tempObject.activityDuration;

                newObject[key][key2] = {'activities': newObject[key][key2],
                                        'totalHoursForThisCategory': tempObject.activityDuration}
              });
                newObject[key] = Object.assign(newObject[key],
                  {'totalHoursPerDay': totalHoursPerDay},
                  {'totalPinsPerDay': totalPinsPerDay})
                totalHoursPerDay = 0;
                totalPinsPerDay = 0;
          })

          User.findById(req.body.userID, function(err, user){

              user.sortedPing = newObject

              user.save(function(err){
                res.send(user)
                return user
              })

          })

    });
});

router.post('/editActivity', function(req,res){
  var activity = req.body.activity;
  var activityCreatorId = req.body.activityCreatorId;
  var activityId = req.body.activityID;
  Activity.findByIdAndUpdate(activityId, activity, {new: true}, function(err, newActivity){
    if(err){
      console.log(err);
      res.send(err);
      return err
    } else {
      res.send(newActivity);
      console.log(newActivity);
      return newActivity;
    }

  })
});

router.post('/deleteActivity', function(req,res){
  console.log('INSIDE DELETE ACTIVITY SERVER')
  var activityCreatorId = req.body.activityCreatorId;
  var activityId = req.body.activityID;
  Activity.findByIdAndRemove(activityId, function(err, newActivity){
    if(err){
      console.log(err);
      res.send(err);
      return err
    } else {
      res.send(newActivity);
      console.log('Actiity Deleted', newActivity);
      return newActivity;
    }

  })
});

router.post('/getAllUserActivities', function(req,res){
  var userId = req.body.userId;
  Activity.find({activityCreator: [userId]})
  .sort({activityCategory: +1})
  .sort({activityStartTime: +1})
  .exec(function(err, allActivities){
    if(err){
      res.send(err);
      return err;
    } else {
      var x = null;
      var y = null;
      var z = null;
      var index = 0;
      var sum =[];

      x = _.groupBy(allActivities, function (date) {
        return moment(date.activityStartTime).format("DD/MM/YYYY");
      });



      for (var key in x) {
          // console.log('TRYING TO FIND VALUES',x[key]);

          y = _.groupBy(x[key], 'activityCategory');
          console.log("YyYYYYYYYY", y)
          // console.log("KEEEEEEEEYYYYYYYY", [key])
          y['date'] = key
          sum[index] = y
          index++;
      }

      // console.log('SUMMMMMMM', sum)

      res.send(sum);

      return sum;
    }
  })
})


router.post('/createActivity', function(req, res){
  var activity = req.body.activity;
  Activity.findOne({$and: [
          {'activityLatitude': activity.activityLatitude},
          {'activityLongitude': activity.activityLongitude}]}).exec(function(err, activities){

        if(err){
          console.log(err);
          res.send(err);
          return err
        }

        if(!activities){

          Activity.find({$and: [
                  {'createdAt': {'$lt': new Date(Date.now() - 24*60*60*1000)}},
                  {'activityCreator': activity.activityCreator}
                ]}).exec(function(err, activities){

              if(activities.length <= 10){

                var newActivity = new Activity({
                      activityCreator: activity.activityCreator,
                      activityTitle: activity.activityTitle,
                      activityDescription: activity.activityDescription,
                      activityCategory: activity.activityCategory,
                      activityLatitude: activity.activityLatitude,
                      activityLongitude: activity.activityLongitude,
                      activityStartTime: activity.activityStartTime,
                      activityDuration: activity.activityDuration
                    })

                    newActivity.save(function(err, activityNew){
                      if (err) {
                        console.log('error has occur: ',  err)
                      } else {
                        console.log('Nice, you created a file')

                        User.findById(activityNew.activityCreator, function(err, user){

                          user.myActivity = [...user.myActivity, ...[activityNew._id]]

                          user.save(function(err){
                            if (err) {
                              console.log('error has occur: ',  err)
                              res.send(newActivity)
                            } else {
                              console.log('Nice, activity added in the user model')
                            }
                          })
                        })
                      }
                    })

              }else{
                console.log('you have already created two activities');
                res.send('you already created two activites within this 24 hours!')
              }
          })


        }else{
          console.log('activities already exist!');
          return null;
        }

        res.send(activities);
        return activities;
  });

});

module.exports = router;
