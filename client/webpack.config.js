module.exports = function(env) {
  var config;
  if(env.prod || env.production){
    console.log('building app with production mode ...');
    config = require('./config/webpack.prod');
  } else if(env.test || env.testing){
    console.log('building app with testing mode ...');
    config = require('./config/webpack.test');
  } else if(env.dev || env.development) {
    console.log('building app with development mode ...');
    config = require('./config/webpack.dev');
  } else {
    console.log('building app with default development mode ...');
    config = require('./config/webpack.dev');
  }

  return config;
};