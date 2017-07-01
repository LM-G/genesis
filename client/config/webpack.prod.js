/**
 * Webpack configuration for production environment
 *
 * @author Louis-Marie Guillemot
 */
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
/*
 Plugins
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    // see webpack.dev.js includes hash
    new ExtractTextPlugin('[name].[hash].css'),

    /*
     @see https://webpack.js.org/plugins/no-emit-on-errors-plugin/
     Only emits files when there are no errors
     */
    new webpack.NoEmitOnErrorsPlugin(),
    /*
     @see https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
     Minify and uglify all javascript code, switch loaders to minimizing mode
     */
    new UglifyJSPlugin({
      comments: false
    })
  ]
});