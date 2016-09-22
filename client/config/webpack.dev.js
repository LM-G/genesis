var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4000;
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: HMR
});

module.exports = function() {
  return webpackMerge(commonConfig({env: ENV}), {
    metadata: METADATA,
    debug: true,
    devtool: 'source-map',

    output: {
      path: helpers.root('dist'),
      publicPath: '/',
      filename: 'js/[name].js',
      sourceMapFilename: 'js/[name].map',
      chunkFilename: '[id].chunk.js'
    },

    plugins: [
      new ExtractTextPlugin('assets/css/style.css'),
      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
          'HMR': METADATA.HMR
        }
      }),
      /* indicate to webpack to write the generated bundle into ouputpath */
      new WriteFilePlugin()
    ],

    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      inline: true,
      quiet: true,
      historyApiFallback: true,
      stats: 'minimal',
      contentBase: helpers.root('src'),
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      },
      /* bundle will be writed in this folder thanks to WriteFilePlugin */
      outputPath: helpers.root('dist')
    }
  });
};