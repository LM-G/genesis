/**
 * root de l'API
 */

var express = require('express');
var api = express.Router();

var userAPI = require("./user.controller");
var testAPI = require("./test.controller");
var authAPI = require("./auth.controller");
var galaxyAPI = require("./galaxy.controller");


module.exports = function(passport) {
  // Toutes les routes sont sousmises à la vérification du token jwt à l'exception des routes 
  // pour se connecter et s'inscrire
  api.use(passport.authenticate('jwt', {
    session: false
  }));

  api.use('/test', testAPI);
  api.use('/user', userAPI);
  api.use('/galaxy', galaxyAPI);

  return {
    api: api,
    auth: authAPI
  };
};