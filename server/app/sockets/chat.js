"use strict";
var path = require('path');
var chatService = require(path.join(__base, 'app/services/chat.service'));

var users = [];

module.exports = {
  name : 'chat',
  users : users,
  join : join,
  init : initChatRoom
};

function join(){
  return chatService
    .getByRoom('chat')
    .then(function(messages){
      return {
      users : users,
      data: messages}
    });
}

function initChatRoom(socket){
  socket.on('chat message', function(message, cb){
    chatService
      .save(socket.user, message, 'chat')
      .then(function(chatMessage){
        socket.broadcast.to('chat').emit('chat new message', chatMessage);
        if(cb){
          cb(chatMessage);
        }
      });
  });
}