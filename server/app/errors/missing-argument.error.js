var _ = require('lodash');

function MissingArgumentError(arg) {
  this.name = 'MissingArgumentError';
  this.message = _.isUndefined(arg) ? 'An argument is missing' : 'Argument ' + missingPropertiesToString(arg) + ' missing';
  this.code = '412';
  this.status = 412;
}

MissingArgumentError.prototype = _.create(Error.prototype, {
  'constructor': MissingArgumentError
});

module.exports = MissingArgumentError;

function missingPropertiesToString(properties) {
  var mssg = '';
  if (_.isArray(properties)) {
    for (var i = 0; i < properties.length; i++) {
      mssg += properties[i] + (i == properties.length - 1) ? ' ' : ', ';
    }
    if (properties.length > 1) {
      mssg += 'are';
    } else {
      mssg += 'is';
    }
  } else {
    return properties + ' is';
  }
  return mssg;
}
