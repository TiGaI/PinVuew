"use strict";

const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

var helmet = require('helmet');

const mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;

mongoose.connect(connect);

var compression = require('compression');
//linking file

var authRoute = require('./services/authRoute');
var activityRoute = require('./services/activityRoute');
var actionRoute = require('./services/actionRoute');

app.use(helmet());

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json());

app.use('/', authRoute);
app.use('/', activityRoute);
app.use('/', actionRoute);

var userIDs = {};

io.on('connection', function(socket) {
  var socketUser;

  socket.on('userJoined', function(userID) {
    try {
      socket.userID = userID;
      userIDs[userID] = userID;
    } catch ( e ) {
      console.log("error in userJoined Socket!", e)
    }
  });

  socket.on('sendNotification', function(messageObject){
      socket.broadcast.emit(messageObject.toUserID.toString(), messageObject)
  });
});


var port = process.env.PORT || 8080;
http.listen(port, function() {
  console.log('Express started. Listening on %s', port);
});
