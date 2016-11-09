var helpers = require('./helpers');
/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = function(){
  return {
    devtool: 'inline-source-map',

    entry: {},

    resolve: {
      extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: ['awesome-typescript-loader', 'angular2-template-loader', '@angularclass/hmr-loader'],
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
          exclude: helpers.root('src', 'app'),
          loader: 'null'
        },
        {
          test: /\.css$/,
          include: helpers.root('src', 'app'),
          loader: 'raw'
        },
        {
          test: /\.scss$/,
          exclude: helpers.root('src', 'app'),
          loader: 'null'
        },
        {
          test: /\.scss$/,
          include: helpers.root('src', 'app'),
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
  };
};