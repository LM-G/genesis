var helpers = require('./helpers');
var commonConfig = require('./webpack.common.js');
/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = function(){
  return webpackMerge(commonConfig({env: ENV}), {
    devtool: 'inline-source-map',

    resolve: {
      cache: false,
      extensions: ['', '.ts', '.js']
    },

    module: {
      loaders: [
        {
          test: /\.ts$/,
          loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
          exclude: [helpers.root('node_modules')]
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
          exclude: [helpers.root('src/index.html')]
        },
        {
          test: /\.html$/,
          loader: 'html'

        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'null'
        },
        {
          test: /\.css$/,
          exclude: helpers.root('app'),
          loader: 'null'
        },
        {
          test: /\.css$/,
          include: helpers.root('app'),
          loader: 'raw'
        }
      ]
    },

    plugins: [
      new DefinePlugin({
        'ENV': JSON.stringify(ENV),
        'HMR': false,
        'process.env': {
          'ENV': JSON.stringify(ENV),
          'NODE_ENV': JSON.stringify(ENV),
          'HMR': false
        }
      })
     ]
  });
};