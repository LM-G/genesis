var helpers = require('./helpers');
/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

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
          loader: 'html-loader'

        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'null-loader'
        },
        {
          test: /\.css$/,
          exclude: helpers.root('src', 'app'),
          loader: 'null-loader'
        },
        {
          test: /\.css$/,
          include: helpers.root('src', 'app'),
          loader: 'raw-loader'
        },
        {
          test: /\.scss$/,
          exclude: helpers.root('src', 'app'),
          loader: 'null-loader'
        },
        {
          test: /\.scss$/,
          include: helpers.root('src', 'app'),
          loader: 'raw-loader'
        }
      ]
    },

    plugins: [
      new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('src')
      ),
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