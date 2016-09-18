var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8080;
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: false
});

module.exports = function(env){
  return webpackMerge(commonConfig({env: ENV}), {
    debug: false,
    devtool: 'source-map',

    output: {
      path: helpers.root('dist'),
      //publicPath: '/',
      filename: '[name].[hash].js',
      sourceMapFilename: '[name].[hash].bundle.map',
      chunkFilename: '[id].[hash].chunk.js'
    },

    htmlLoader: {
      minimize: false // workaround for ng2
    },

    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
        mangle: {
          keep_fnames: true
        }
      }),
      new ExtractTextPlugin('[name].[hash].css'),
      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
          'HMR': METADATA.HMR,
        }
      })
    ],

    node: {
      global: 'window',
      crypto: 'empty',
      process: false,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  });
};