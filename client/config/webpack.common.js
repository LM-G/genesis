/**
 * Webpack common config file used as basis by all environments
 * @author Louis-Marie Guillemot
 */
var webpack = require('webpack');
var helpers = require('./helpers');
/*
 * Plugins
 */
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

/*
 * Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';

module.exports = {
  /*
   Entry points
   @see https://webpack.js.org/configuration/entry-context/
   */
  entry: {
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts',
    app: './src/main.ts'
  },

  /*
   Resolve these extensions in import statements where they are not precised
   @see https://webpack.js.org/concepts/module-resolution/
   */
  resolve: {
    extensions: ['.ts', '.js']
  },

  /*
   All build modules
   @see https://webpack.js.org/configuration/module/
   */
  module: {
    rules: [
      // Support for ts files.
      {
        test: /\.ts$/,
        use: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          {
            loader: 'tslint-loader',
            options: {
              emitErrors: false,
              failOnHint: false
            }
          }
        ],
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
      },
      // support for json files.
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      // copy assets files to output
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=fonts/[name].[hash].[ext]'
      },
      // support for CSS in src/styles as raw text
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css-loader', 'postcss-loader']})
      },
      // all css required in src/app files will be merged in js files
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader!postcss-loader'
      },
      // support for SASS files in src/assets as raw text
      {
        test: /\.scss$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css-loader', 'postcss-loader', 'sass-loader']})
      },
      // all scss required in src/app files will be merged in js files
      {
        test: /\.scss$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader!postcss-loader!sass-loader'
      },
      // support for .html as raw text
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: helpers.root('src/index.html')
      }
    ]
  },



  /*
   Plugins
   @see https://webpack.js.org/plugins/
   */
  plugins: [
    /*
     Provides context to Angular's use of System.import
     @see https://webpack.js.org/plugins/context-replacement-plugin/
     @see https://github.com/angular/angular/issues/11580
     */
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('src'),
      {}
    ),

    /*
     Sets global constants in application
     @see https://webpack.js.org/plugins/define-plugin/
     */
    new DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV)
      }
    }),

    /*
     Creates app chunks
     @see https://webpack.js.org/plugins/commons-chunk-plugin/
     */
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    /*
     Generates the index HTML5 file with all its dependencies
     @see https://webpack.js.org/plugins/html-webpack-plugin/
     */
    new HtmlWebpackPlugin({
      // use the src index as base file
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    })
  ]
};
