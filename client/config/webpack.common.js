/**
 * Webpack common config file
 * @author Louis-Marie Guillemot
 */

var webpack = require('webpack');
var helpers = require('./helpers');
/**
 * Plugins
 */
const autoPrefixer = require('autoprefixer');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  /**
   * Entry points
   * Reference: https://webpack.js.org/configuration/entry-context/#entry
   */
  entry: {
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts',
    app: './src/main.ts'
  },

  /**
   * Resolve
   * Reference: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {
    extensions: ['.ts', '.js']
  },

  /**
   * Loaders
   * Reference: https://webpack.js.org/configuration/module/
   * List: http://webpack.github.io/docs/list-of-loaders.html
   */
  module: {
    rules: [
      // Support for ts files.
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader'
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



  /**
   * Plugins
   * Reference: https://webpack.js.org/configuration/plugins/
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  plugins: [
    /**
     * Plugin: ContextReplacementPlugin
     * Description: Provides context to Angular's use of System.import
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
     * See: https://github.com/angular/angular/issues/11580
     */
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root('src'),
      {}
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    /**
     * Inject script and link tags into html files
     * Reference: https://github.com/ampedandwired/html-webpack-plugin
     */
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    }),

    new LoaderOptionsPlugin({
      options: {
        /**
         * Apply the tslint loader as pre/postLoader
         * Reference: https://github.com/wbuchwalter/tslint-loader
         */
        tslint: {
          emitErrors: false,
          failOnHint: false
        },
        /**
         * Sass
         * Reference: https://github.com/jtangelder/sass-loader
         * Transforms .scss files to .css
         */
        sassLoader: {
          /* todo */
        },
        /**
         * PostCSS
         * Reference: https://github.com/postcss/autoprefixer-core
         * Add vendor prefixes to your css
         */
        postcss: [
          autoPrefixer({
            browsers: ['last 2 version']
          })
        ]
      }
    })
  ]
};
