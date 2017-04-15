"use strict";
var express = require('express');
var router = express.Router();

//model
const User  = require('../models/models').User;
const Activity= require('../models/models').Activity;
const Usernotification= require('../models/models').Usernotification;
const Goal= require('../models/models').Goal;

router.post('/createGoal', function(req, res){
console.log(req.body);
    Goal.findOne({$and: [
          {'user': req.body.user},
          {'activityCategory': req.body.activityCategory},
          {'activityGoal': req.body.activityGoal},
          {'goalTimeFrame': req.body.goalTimeFrame},
          ]})
     .exec( function(err, goal) {
        if (err) {
            return {err, goal}
        }

      if(!goal){

          var newGoal = new Goal({
            user: req.body.user,
            activityCategory: req.body.activityCategory,
            activityGoal: req.body.activityGoal,
            goalTimeFrame: req.body.goalTimeFrame,
          })

          newGoal.save(function(err,goal){
              if(err){
                console.log(err)
                return err
              }
              console.log('goal created!');
              res.send(goal)
          })

      }else{
        console.log('Stop creating the same goal and go do it!')
        res.send(null)
      }
    })
});

router.post('/getMyGoals', function(req, res){
    Goal.find({user: req.body.user})
     .exec( function(err, goals) {
        if (err) {
            return {err, goals}
        }
        console.log(goals);
      if(!goals){
        console.log('you have not goals in life');
        res.send(goals);
      }else{
        console.log('getallofyourgoals: Keep grinding')
        res.send(goals);
      }
    })
});

router.post('/editGoal', function(req, res){
    console.log(req.body)
    Goal.findByIdAndUpdate(req.body.goalID, req.body.goalObject)
     .exec( function(err, goal) {
        if (err) {
            return {err, goal}
        }
      if(goal){
        console.log('goal updated!');
        res.send(goal);
        return goal
      }else{
        console.log('no found! err!');
        return goal
      }
    })
});

router.post('/deleteGoal', function(req, res){

    Goal.findByIdAndRemove(req.body.goalID)
     .exec( function(err, goal) {
        if (err) {
            return {err, goal}
        }
      if(!goal){
        console.log('Can delete a empty goal!');
        res.send(goal);
      }else{
        console.log('Deleted')
        res.send(goal);
      }
    })
});

// router.post('/joinActivity', function(req, res){
//   Usernotification.findOne({$and: [
//           {user: req.body.userID},
//           {activity: req.body.activityID},
//           {actionNumber: 1}
//         ]})
//           .exec(function(err, action){
//
//             console.log(action)
//
//             if(err){
//               console.log(err);
//               res.send(err);
//               return err;
//             }
//
//             if(!action){
//
//                 var newUsernotification = new Usernotification({
//                   user: req.body.userID,
//                   activity: req.body.activityID,
//                   actionNumber: 1
//                 });
//
//                 newUsernotification.save(function(err){
//                     if(err){
//                       console.log(err);
//                     }else{
//                       SaveIntoActivityAndUser(req.body.userID, req.body.activityID);
//                     }
//                 })
//             }else{
//               console.log('You already join this activity!');
//             }
//           })
// });
//
// function SaveIntoActivityAndUser(userID, activityID){
//
//   Activity.findById(activityID, function(err, activity) {
//
//     if (err) {
//         return {err, activity}
//     }
//
//     if(activity){
//
//       activity.checkInUser = [...activity.checkInUser, ...[userID]]
//       activity.save(function(err, activity){
//         if (err) {
//           console.log(err)
//         } else {
//
//           User.findById(userID, function(err, user){
//             if(user){
//
//               user.joinActivities = [...user.joinActivities, ...[activityID]]
//
//                 user.save(function(err){
//                   if (err) {
//                     console.log(err)
//                   }
//                 })
//             }else{
//               console.log("this user does not exist!");
//             }
//           });
//         }
//       })
//     }else{
//       console.log('you already send request to this friend exist!')
//     }
//   })
//
// }
//
// router.post('/addActionsToNotification', function(req, res){
//   AddActionsToNotification(req.body.userID, req.body.activityID, req.body.number);
// })
//
//
// function AddActionsToNotification(userID, activityID, number){
//
//   Usernotification.find({$and: [
//           {user: userID},
//           {activity: activityID},
//           {actionNumber: number}
//         ]}).exec(function(err, notification){
//
//           if(notification){
//
//             var newUsernotification = new Usernotification({
//               user: userID,
//               activity: activityID,
//               actionNumber: number
//             })
//
//             newUsernotification.save(function(err){
//               if(err){
//                 console.log(err);
//               }
//             })
//           }else{
//             console.log('notification has already being created!');
//           }
//         })
// }
//
//
// router.post('/leaveActivity', function(req, res){
//
//   Usernotification.findOne({$and: [
//           {user: req.body.userID},
//           {activity: req.body.activityID},
//           {actionNumber: 1}
//         ]}).exec(function(err, action){
//
//             if(err){
//               console.log(err);
//               res.send(err);
//               return err;
//             }
//
//             if(action){
//               console.log('i am here')
//               RemoveUserFromActivityAndUserModel(req.body.userID, req.body.activityID);
//               AddActionsToNotification(req.body.userID, req.body.userID, 2);
//
//             }else{
//               console.log('You cannot leave something you can did not join!');
//             }
//           })
// });
//
//
// function RemoveUserFromActivityAndUserModel(userID, activityID){
//
//   Activity.findById(activityID).exec(function(err, activity) {
//
//     if (err) {
//         return {err, activity}
//     }
//
//     if(activity){
//
//       activity.checkInUser = activity.checkInUser.filter(function(item){
//           return item != userID
//       })
//
//
//       activity.save(function(err, activity){
//         if (err) {
//           console.log(err)
//         } else {
//
//           User.findById(userID, function(err, user){
//             if(user){
//
//               user.joinActivities = user.joinActivities.filter(function(item){
//                   return item != activityID
//               })
//
//                 user.save(function(err){
//                   if (err) {
//                     console.log(err)
//                   }
//                 })
//
//             }else{
//               console.log("Cannot find userID in RemoveUserFromActivityAndUserModel");
//             }
//           });
//         }
//       })
//     }else{
//       console.log('Cannot find activityID in RemoveUserFromActivityAndUserModel')
//     }
//   })
// }
//
//
//
// router.post('/getNotification', function(req, res){
//
//     Usernotification.find({$and: [
//             {'activity': {'$in': req.body.myactivitiesID}}
//           ]})
//      .sort({ createdAt: -1}).limit(15)
//      .exec( function(err, notifications) {
//         if (err) {
//             return {err, notifications}
//         }
//
//       if(notifications){
//           console.log('hoping this is a array: ', notifications)
//
//              res.send(notifications)
//
//       }else{
//         res.send(null)
//         return null
//         console.log('No Friend Request notification')
//       }
//     })
//   });


module.exports = router;
