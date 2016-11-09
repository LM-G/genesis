/**
 * @author Louis-Marie Guillemot
 */
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var WriteFilePlugin = require('write-file-webpack-plugin');
var webpack = require('webpack');
var helpers = require('./helpers');
/**
 * Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
/**
 * Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;
const HMR = helpers.hasProcessFlag('hot');

module.exports = function() {
  return webpackMerge.smart(commonConfig(), {
    devtool: 'eval-source-map',

    output: {
      path: helpers.root('dist'),
      pathinfo: true,
      publicPath: '/',
      filename: 'js/[name].js',
      sourceMapFilename: 'js/[name].map',
      chunkFilename: '[id].chunk.js'
    },

    plugins: [
      /* Good looking UI */
      new DashboardPlugin(),

      /* Forces the bundled files to be written in dist forlder */
      new WriteFilePlugin(),

      new ExtractTextPlugin({filename: 'css/[name].[hash].css'}),

      /**
       * Plugin: ForkCheckerPlugin
       * Description: Do type checking in a separate process, so webpack don't need to wait.
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
       */
      new ForkCheckerPlugin(),

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
    ],

    devServer: {
      port: PORT,
      host: HOST,
      inline: true,
      quiet: false,
      historyApiFallback: true,
      stats: 'minimal',
      contentBase: helpers.root('dist'),
      outputPath: helpers.root('dist'),
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
      }
    }
  });
};