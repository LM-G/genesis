var Q = require('q');
var _ = require('lodash');
var path = require('path');
var System = require(path.join(__base, 'app/models/System'));
var Planet = require(path.join(__base, 'app/models/Planet'));
var SystemConnection = require(path.join(__base, 'app/models/SystemConnection'));

module.exports = {
  generate : generate,
  getSystem: getSystem,
  getSystems: getSystems
};

function getSystem(id){
  var deferred = Q.defer();

  System
    .findOne({_id : id})
    .populate('planets')
    .populate('connections')
    .exec(function(err, s){
      if(err){
        deferred.reject(err)
      }
      if(s){
        deferred.resolve(s);
      }
    });

  return deferred.promise;
}

function getSystems(){
  var deferred = Q.defer();

  System
    .find()
    .populate('planets')
    .populate('connections')
    .exec(function(err, systems){
      if(err){
        deferred.reject(err)
      }
      if(systems){
        deferred.resolve(systems);
      }
    });


  return deferred.promise;
}

function generate(requestParams){
  var deferred = Q.defer();
  var request;
  switch(requestParams.type){
    case 'system' :
      request = generateSystem(requestParams.data);
      break;
    case 'planet' :
      request = generatePlanet(requestParams.data);
      break;
    default : deferred.reject();
  }

  if(request){
    request
      .then(function(){
        deferred.resolve();
      })
      .catch(function(err){
        deferred.reject(err);
      });
  }


  return deferred.promise;
}

function generateSystem(params){
  var deferred = Q.defer();
  var system = new System();
  system.name = params.name;
  system.coord_x = params.coord_x;
  system.coord_y = params.coord_y;
  system.save(function(err, system){
    console.log('XOXOXOXOXOXOXOXOXO', err, system);
    if(err) {
      deferred.reject(err);
    }
    deferred.resolve(system);
  });
  return deferred.promise;
}


function generatePlanet(params){
  var deferred = Q.defer();
  var planet = new Planet();
  planet.name = params.name;
  getSystem(params.system.id)
    .then(function(system){
      if(!system) {
        deferred.reject('system inconnu');
      } else {
        planet.system = system;
        planet.save(function(err, planet){
          if(err) deferred.reject();
          system.planets.push(planet);
          system.save();
          deferred.resolve(planet);
        });
        deferred.resolve(planet)
      }
   });

  return deferred.promise;
}