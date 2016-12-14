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
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;
const HMR = helpers.hasProcessFlag('hot');

module.exports = function() {
  const devServerUrl = 'http://localhost:3000';
  return webpackMerge.smart(commonConfig(), {
    devtool: 'inline-source-map',

    output: {
      path: helpers.root('dist'),
      pathinfo: true,
      publicPath: '/',
      filename: 'js/[name].js',
      sourceMapFilename: 'js/[name].map',
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
      /* Good looking UI */
      new DashboardPlugin(),

      new ExtractTextPlugin({filename: 'css/[name].css'}),

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
        template: 'src/index.html',
        chunksSortMode: 'dependency'
      }),

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
};