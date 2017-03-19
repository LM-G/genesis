var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
/**
 * Webpack Constants
 */
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = function(){
  return webpackMerge.smart(commonConfig(), {
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

    // Prod build specific plugins
    plugins: [
      // clean du dossier dist / build
      new CleanWebpackPlugin(['dist', 'build'], {
        root: helpers.root(),
        verbose: true
      }),

      new ExtractTextPlugin('[name].[hash].css'),

      /**
       * Generate common chunks if necessary
       * Reference: https://webpack.github.io/docs/code-splitting.html
       * Reference: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
       */
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'polyfills']
      }),

      /**
       * Inject script and link tags into html files
       * Reference: https://github.com/ampedandwired/html-webpack-plugin
       */
      new HtmlWebpackPlugin({
        template: './src/index.html',
        chunksSortMode: 'dependency'
      }),

      new DefinePlugin({
        'ENV': JSON.stringify(ENV),
        'process.env': {
          'ENV': JSON.stringify(ENV),
          'NODE_ENV': JSON.stringify(ENV)
        }
      }),
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      // Only emit files when there are no errors
      new webpack.NoErrorsPlugin(),
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      // Dedupe modules in the output
      new webpack.optimize.DedupePlugin(),
      // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      // Minify all javascript, switch loaders to minimizing mode
      new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
        mangle: {
          keep_fnames: true
        }
      })
    ]
  });
};