var path = require('path');
var mongoose = require('mongoose');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require(path.join(__base, 'app/models/User'));

/**
 * Configuration du module passport
 * @param  {Object} passport : module passport
 * @return {Function}  fonction de configuration
 */
module.exports = function(passport) {
  // Utilisation d'une stratégie JWT.
  passport.use('jwt', newJwtStrategy());
};

/**
 * Configuration de la stratégie JWT pour le login
 * @return {Object} stratégie JWT configurée
 */
function newJwtStrategy() {
  return new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: process.env.SESSION_SECRET
  }, function verify(payload, done) {
    User.findById(payload._id, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  });
}

