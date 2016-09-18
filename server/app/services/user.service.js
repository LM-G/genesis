"user strict";
var path = require('path');
var Q = require('q');
var User = require(path.join(__base, 'app/models/User'));

module.exports = {
  getById : getById
};

function getById(id){
  var deferred = Q.defer();

  User.findOne({ _id : id}, function(err, user){
    if (err) {
      deferred.reject(err);
    }
    if(user){
      deferred.resolve(user);
    }
  });

  return deferred.promise;
}