/**
 * Webpack configuration for development environment
 *
 * @author Louis-Marie Guillemot
 */
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var webpack = require('webpack');
var helpers = require('./helpers');
/*
 * Plugins
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/*
 * Constants
 */
const HOST = 'localhost';
const PORT = 3001;
// proxy
const HOST_PROXY = 'localhost';
const HOST_PORT = 3000;

var devServerUrl = 'http://' + HOST_PROXY + ':' + HOST_PORT;

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
    /*
     @see https://webpack.js.org/plugins/extract-text-webpack-plugin/
     Extract text from a bundle, or bundles, into a separate file. Moves all inlined *.css modules in entry
     chunks in a dedicated CSS file.
     */
    new ExtractTextPlugin({filename: '[name].css'}),

    /*
     @see https://webpack.js.org/plugins/source-map-dev-tool-plugin/
     Enable a more fine control of source maps. "Fix" and prevents the cheap-module-eval-source-map's breakpoints
     from not stopped broken on.
     */
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      // do not process vendor maps
      exclude: ['vendor.js']
    })
  ]
});