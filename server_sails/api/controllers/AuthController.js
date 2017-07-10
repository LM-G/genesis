/**
 * AuthControllerq
 */

var passport = require('passport');
var path = require('path');
var _ = require('lodash');


module.exports = {
  /**
   * Register an user in the system
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  signUp: function (req, res) {
    // TODO : use AuthService
    User
      .create(_.omit(req.allParams(), 'id'))
      .then(function (user) {
        return {
          token: CipherService.createToken(user),
          user: user
        };
      })
      .then(res.created)
      .catch(res.serverError);
  },

  /**
   * Sign in by local strategy in passport
   * @param {Object} req Request object
   * @param {Object} res Response object
   */
  signIn: function (req, res) {
    // TODO : use AuthService
    passport.authenticate('local', onPasswordAuth.bind(this, req, res))(req, res);
  }
};



/**
 * Triggers when user authenticates via passport with local strategy
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Object} error Error object
 * @param {Object} user User profile
 * @param {Object} info Info if some error occurs
 * @private
 */
function onPasswordAuth(req, res, error, user, info) {
  if (error) return res.serverError(error);
  if (!user) return res.unauthorized(null, info && info.code, info && info.message);

  return res.ok({
    token: CipherService.createToken(user),
    user: user
  });
}

