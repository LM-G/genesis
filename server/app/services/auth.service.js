'use strict';
var _ = require('lodash');
var path = require('path');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var config = require(path.join(__base, 'config/config'));
var User = require(path.join(__base, 'app/models/User'));
var validationUtils = require(path.join(__base, 'app/utils/validation.utils'));

// Definition des limites de taille des paramètres d'authentification
var bounds = {
  username: {
    minLength: 3,
    maxLength: 16
  },
  password: {
    minLength: 8,
    maxLength: 128
  },
  email: {
    minLength: 5,
    maxLength: 256
  }
};

module.exports = {
  login: login,
  create: create,
  refresh: refresh,
  checkRoleIsAdmin: checkRoleIsAdmin
};

/**
 * Connexion de l'utilisateur : génération des ses tokens d'accès
 * @param  {Text} username  : nom de l'utilisateur
 * @param  {Text} password :  mot de passe non hashé de l'utilisateur
 * @param  {Boolean} rememberme : génération ou non du refresh token
 * @return {Object} promesse de résolution
 */
function login(username, password, rememberme) {
  var deferred = Q.defer();
  var properties = {
    username: username,
    password: password
  };
  var fields = ['username', 'password'];

  // Validation des paramètres
  try {
    validationUtils.check(properties, fields);
  } catch (e) {
    deferred.reject({ code: 0, loginMessage: 'Missing parameters', error: e });
  }

  // on retrouve l'utilisateur
  User.findOne({
    $or: [
      { 'username': username },
      { 'email': username }
    ]
  }, handleLogin);

  function handleLogin(err, user) {
    if (err) {
      deferred.reject(err);
    }
    // on verifie que le mot de passe correspond au mot de passe en base
    if (user && bcrypt.compareSync(password, user.password)) {
      var result = {};
      // génération de l'access token
      var access_token = jwt.sign({
        _id: user._id
      }, process.env.SESSION_SECRET, {
        expiresIn: config.security.tokenLifeShort
      });

      result.access_token = access_token;

      // gestion du rememberme
      if (rememberme) {
        // génération du refresh token
        var refresh_token = jwt.sign({
          _id: user._id
        }, process.env.SESSION_SECRET, {
          expiresIn: config.security.tokenLifeLong
        });

        result.refresh_token = refresh_token;
      }
      // authentication successful
      deferred.resolve(result);
    } else {
      // authentication failed
      deferred.reject({ code: 2, loginMessage: 'Login failed, wrong credentials' });
    }
  }

  return deferred.promise;
}

/**
 * Création d'un utilisateur
 * @param  {Object} userParams identifiants
 * @return {Object} promesse de resolution de la creation d'un utilisateur
 */
function create(userParams) {
  var deferred = Q.defer();
  var fields = ['username', 'password', 'email'];
  var user = new User(_.pick(userParams, fields));

  // Validation des paramètres
  try {
    validationUtils.check(user, fields);
  } catch (e) {
    deferred.reject({ code: 0, signupMessage: 'Missing parameters', error: e });
  }
  if (!validationUtils.checkLength(user.username, bounds.username.minLength, bounds.username.maxLength)) {
    deferred.reject({ code: 1, signupMessage: 'Invalid username length.' });
  } else if (!validationUtils.checkLength(user.password, bounds.password.minLength, bounds.password.maxLength)) {
    deferred.reject({ code: 2, signupMessage: 'Invalid password length.' });
  } else if (!validationUtils.checkLength(user.email, bounds.email.minLength, bounds.email.maxLength)) {
    deferred.reject({ code: 3, signupMessage: 'Invalid email length.' });
  } else if (!validationUtils.validateEmail(user.email)) {
    deferred.reject({ code: 4, signupMessage: 'Invalid email address.' });
  } else {
    User.findOne({
      $or: [
        { 'username': user.username },
        { 'email': user.email }
      ]
    }, function(err, found) {
      if (err) {
        throw err;
      } else if (found) {
        // utilisateur existe déja
        deferred.reject({ code: 5, signupMessage: 'That username/email is already taken.' });
      } else {
        // Enregistrement de l'utilisateur
        user.save(function(err) {
          if (err) {
            throw err;
          }
          deferred.resolve(user);
        });
      }
    });
  }

  return deferred.promise;
}

/**
 * Rafraichissement du token JWT
 * @param  {Object} token : token de rafraichissement
 * @return {Object} promesse de resolution du rafraichissement
 */
function refresh() {
  var deferred = Q.defer();

  // 1. decodage du token
  // 2. recuperation utilisateur
  // 3. generation nouveau access token si tout est ok
  // 4. retourne le token
  //
  deferred.reject('not implemented yet');
  return deferred.promise;
}

function checkRoleIsAdmin(req, res, next){
  if(req.user && req.user.role == 'admin'){
    next();
  } else {
    res.status(401).end();
  }
}
