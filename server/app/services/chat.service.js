"user strict";
var _ = require('lodash');
var path = require('path');
var Q = require('q');
var ChatMessage = require(path.join(__base, 'app/models/ChatMessage'));

module.exports = {
  save: save,
  getByRoom : getByRoom
};

function save(user, content, room){
  var deferred = Q.defer();
  var message = new ChatMessage();
  message.content = content;
  message.user = user.id;
  message.room = room;
  message.save(function(err, result){

    if (err) {
      deferred.reject(err);
    }
    if(result){
      ChatMessage
        .findOne(result._id)
        .select('content user room created_at')
        .populate('user', 'id username')
        .exec(function(err,message){
          deferred.resolve(message);
        });
    }
  });

  return deferred.promise;
}

function getByRoom(name){
  var deferred = Q.defer();
  /* todo constantes ! */
  ChatMessage
    .find({ room : name})
    .sort({'created_at': -1})
    .limit(100)
    .select('content user room created_at')
    .populate('user', 'id username')
    .exec(function(err,chatMessages){
      if (err) {
        deferred.reject(err);
      }
      if(chatMessages){
        deferred.resolve(_.reverse(chatMessages));
      }
    });

  return deferred.promise;
}