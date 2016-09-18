'use strict';
var Q = require('q');
var path = require('path');
var socketio = require('socket.io');
var socketioJwt   = require("socketio-jwt");

var socketManager = require(path.join(__base, 'app/sockets'));
var userService = require(path.join(__base, 'app/services/user.service'));

module.exports = function(server) {
  // socket.io setup
  var io = socketio.listen(server);

  /* needs a valid jwt token to establish the connexion */
  io.use(socketioJwt.authorize({
    secret: process.env.SESSION_SECRET,
    handshake: true,
    callback: 5000
  }));



  io.on('connection', function(socket){
    var init = Q.defer();
    var id = socket.decoded_token._id;
    var user = socketManager.getUser(id);

    if(user){
      user.disconnected = false;
      init.resolve();

    } else {
      /* get in the DB the user linked to the socket*/
      userService
        .getById(id)
        .then(function(data){
          user = {id : data.id, username: data.username};
          socketManager.addUser(user);
          console.log('User ', id, ' connected');
          init.resolve();
        });
    }

    /* getting the user in DB is asynchronous so if i want to manage a set of users in room, and send messages update
     * to them, then i must initialise access room events in this promise callback */
    init.promise.then(function(){
      socket.user = user;
      /* handles navigation between rooms */
      socketManager.handleRoomAccess(socket);
    });

    /* handles disconnection event */
    socket.on('disconnect', function(data){
      var deferred = Q.defer();
      if(data == 'client namespace disconnect'){
        deferred.resolve();
      } else {
        if(user){
          user.disconnected = true;
          setTimeout(function () {
            if (user.disconnected) {
              deferred.resolve();
            }
          }, 5000);
        }
      }
      /* removes user from all rooms in which he was registered */
      deferred.promise.then(function(){
        socketManager.removeUserFromAllRooms(user, function(name){
          io.sockets.in(name).emit(name + ' user left', user);
          console.log('User ', user.id,' left room ', name);
        });
        socketManager.removeUser(id)
      });
    });
  });
};
