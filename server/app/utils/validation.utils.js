var _ = require('lodash');
var path = require('path');
var MissingArgumentError = require(path.join(__base, './app/errors/missing-argument.error'));

module.exports = {
  check: checkProperties,
  checkLength: checkLength,
  validateEmail: validateEmail
};

/**
 * Vérifie que les properties de l'objet ne sont pas null
 * @param  {Object} obj : object à verifier
 * @param  {Array} properties  : proprietes qui ne doivent pas etre nulles
 * @throws {MissingArgumentError}
 */
function checkProperties(obj, properties) {
  var missingProperties = [];
  _.forEach(properties, function(property) {
    if (obj[property] == null) {
      properties.push(property);
    }
  });
  if (missingProperties.length) {
    throw new MissingArgumentError(missingProperties);
  }
}

/**
 * Validation d'un email
 * @param  {String} email : email à tester
 * @return {Boolean} email valide ou non
 */
function validateEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

/**
 * Validation de la taille d'une chaine de caractères
 * @param  {String} chaine : chaine de caractères à tester
 * @param  {[type]} min    : nombre minimum de caractères
 * @param  {[type]} max    : nombre maximum de caractères
 * @return {Boolean} chaine valide ou non
 */
function checkLength(chaine, min, max) {
  return !(chaine.length > max || chaine.length < min);
}
