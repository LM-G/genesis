var path = require('path');
var config = require(path.join(__base, 'config/config'));

/**
 * Validation des variables d'environnement
 */
module.exports = function() {
  validateNodeEnvironment();

  if (!process.env.SESSION_SECRET) {
    process.env.SESSION_SECRET = config.SESSION_SECRET;
  }
  if (!process.env.PORT) {
    process.env.PORT = config.PORT;
  }

  validateMongoUri();
};

function validateNodeEnvironment() {
  switch (process.env.NODE_ENV) {
    case 'development': break;
    case 'production': break;
    case 'test':
      console.log('Node environment set for ', process.env.NODE_ENV);
      break;
    default:
      console.log('Error: process.env.NODE_ENV should be set to a valid ' +
        ' value such as \'production\', \'development\', or \'test\'.');
      console.log('Value received: ' + process.env.NODE_ENV);
      console.log('Defaulting value for: development');
      process.env.NODE_ENV = 'development';
      break;
  }
}

function validateMongoUri() {

  if (!process.env.MONGO_URI) {

    console.log('No value set for MONGO_URI...');
    console.log('Using the supplied value from config object...');

    switch (process.env.NODE_ENV) {

      case 'development':
        process.env.MONGO_URI = config.MONGO_URI.DEVELOPMENT;
        console.log('MONGO_URI set for ', process.env.NODE_ENV);
        break;

      case 'production':
        process.env.MONGO_URI = config.MONGO_URI.PRODUCTION;
        console.log('MONGO_URI set for ', process.env.NODE_ENV);
        break;

      case 'test':
        process.env.MONGO_URI = config.MONGO_URI.TEST;
        console.log('MONGO_URI set for ', process.env.NODE_ENV);
        break;

      default:
        console.log('Unexpected behavior! process.env.NODE_ENV set to unexpected value!');
        break;
    }
  }
}
