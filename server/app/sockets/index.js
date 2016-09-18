"use strict";

var _ = require('lodash');


var users = [];
var rooms = [require('./chat')];

module.exports = {
  handleRoomAccess : handleRoomAccess,
  users : users,
  getUser: getUser,
  removeUser : removeUser,
  addUser: addUser,
  addUserToRoom : addUserToRoom,
  removeUserFromRoom : removeUserFromRoom,
  getRoom : getRoom,
  removeUserFromAllRooms : removeUserFromAllRooms
};

function handleRoomAccess(socket){
  var user = socket.user;
  socket.on('join room', function (name, cb) {
    if(isRoomValid(name)){
      socket.join(name);
      var room = getRoom(name);

      if(!isUserInRoom(user, name)){
        addUserToRoom(user, name);
        socket.broadcast.to(name).emit(name + ' user joined', user);
        console.log('User ', user.id,' joins room ', name);
      }
      if(cb){
        if(_.isFunction(room.join)){
          room.join().then(function(response){
            cb(response);
          });
        }

      }
    } else {
      console.log('User ', user.id,' cannot join room ', name, ' : not existing');
      socket.emit('room not existing', name);
    }
  });

  socket.on('leave room', function (name, cb) {
    if(isRoomValid(name)){
      socket.leave(name);
      removeUserFromRoom(user, name);
      socket.broadcast.to(name).emit(name + ' user left', user);
      console.log('User ', user.id,' left room ', name);
    } else {
      console.log('User ', user.id,' cannot leave room ', name, ' : not existing');
      socket.emit('room not existing', name);
    }
    if(cb){
      cb();
    }
  });

  initRooms(socket);
}

function initRooms(socket){
  _.forEach(rooms, function(room) {
    room.init(socket);
  });
}

function addUser(user){
  users.push(user);
}

function getUser(id){
  return _.find(users, function(user){
    return user.id == id;
  });
}

function removeUser(id){
  console.log('User ', id,  ' disconnected.');
  return _.remove(users, {'id' : id});
}

function addUserToRoom(user, name){

  var room = getRoom(name);
  room.users.push(user);
}

function removeUserFromRoom(user, name){
  var room = getRoom(name);
  return _.remove(room.users, {'id' : user.id});
}

function removeUserFromAllRooms(user, cb){
  _.forEach(rooms, function(room){
    var userRemoved = _.remove(room.users, {'id' : user.id});
    if(userRemoved){
      cb(room.name);
    }
  });
}

function getRoom(name){
  return _.find(rooms, function(room){
    return room.name == name;
  });
}

function isRoomValid(name){
  return rooms.some(function(room){
    return name == room.name;
  });
}

function isUserInRoom(userToTest, name) {
  var room = getRoom(name);
  return room.users.some(function(user){
    return user.id == userToTest.id;
  });
}



