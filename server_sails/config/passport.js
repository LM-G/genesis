/**
 * Passport configuration
 */
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var EXPIRES_IN_SECONDES = 86400;
var SECRET = "secr3t";
var ALGORITHM = "HS256";
var ISSUER = "genesis.com";
var AUDIENCE = "genesis.com";

/**
 * Configuration object for local strategy
 */
var LOCAL_STRATEGY_CONFIG = {
  usernameField: 'account_name',
  passwordField: 'password',
  passReqToCallback: false
};

/**
 * Configuration object for JWT strategy
 */
var JWT_STRATEGY_CONFIG = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: SECRET,
  issuer : ISSUER,
  audience: AUDIENCE
};

/**
 * Triggers when user authenticates via local strategy
 */
function onLocalStrategyAuthentication(accountName, password, next){
  User.findOne({account_name: accountName})
    .exec(function(error, user){
      if (error) return next(error, false, {});

      if (!user) return next(null, false, {
        code: 'E_USER_NOT_FOUND',
        message: accountName + ' is not found'
      });

      if (!CipherService.comparePassword(password, user)){
        return next(null, false, {
          code: 'E_WRONG_PASSWORD',
          message: 'Password is wrong'
        });
      }

      return next(null, user, {});
    })
}

/**
 * Triggers when user authenticates via JWT strategy
 */
function onJwtStrategyAuthentication(payload, next){
  return next(null, payload.user, {});
}

passport.use(new LocalStrategy(LOCAL_STRATEGY_CONFIG, onLocalStrategyAuthentication));
passport.use(new JwtStrategy(JWT_STRATEGY_CONFIG, onJwtStrategyAuthentication));

module.exports.jwtSettings = {
  expiresIn: EXPIRES_IN_SECONDES,
  secret: SECRET,
  algorithm : ALGORITHM,
  issuer : ISSUER,
  audience : AUDIENCE
};