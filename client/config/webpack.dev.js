/**
 * @author Louis-Marie Guillemot
 */
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var webpack = require('webpack');
var helpers = require('./helpers');
/**
 * Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/**
 * Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = 'localhost';
const PORT = 4000;
const HMR = helpers.hasProcessFlag('hot');
const devServerUrl = 'http://localhost:3000';

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
      path: helpers.root('dist'),
      pathinfo: true,
      publicPath: '/',
      filename: '[name].js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js'
    },

    devServer: {
      port: PORT,
      host: HOST,
      inline: true,
      quiet: false,
      historyApiFallback: true,
      stats: 'minimal',
      contentBase: helpers.root('dist'),
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
      },
      proxy: {
        '/api': devServerUrl,
        '/auth': devServerUrl
      }
    },

    plugins: [
      new ExtractTextPlugin({filename: '[name].css'}),

      new DefinePlugin({
        'ENV': JSON.stringify(ENV),
        'HMR': HMR,
        'process.env': {
          'ENV': JSON.stringify(ENV),
          'NODE_ENV': JSON.stringify(ENV),
          'HMR': HMR
        }
      })
    ]
  });