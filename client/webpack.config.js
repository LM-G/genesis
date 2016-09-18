switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    console.log('building app with production mode ...');
    module.exports = require('./config/webpack.prod')({env: 'production'});
    break;
  case 'test':
  case 'testing':
    console.log('building app with testing mode ...');
    module.exports = require('./config/webpack.test')({env: 'test'});
    break;
  case 'dev':
  case 'development':
  default:
    console.log('building app with development mode ...');
    module.exports = require('./config/webpack.dev')({env: 'development'});
}