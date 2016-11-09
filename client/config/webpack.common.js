/**
 * Webpack common config file
 * @author Louis-Marie Guillemot
 */

var webpack = require('webpack');
var helpers = require('./helpers');
/**
 * Plugins
 */
const autoprefixer = require('autoprefixer');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * https://webpack.js.org/configuration/#options
 * @returns {{
 *  entry: {polyfills: string, vendor: string, main: string},
 *  module: {rules: *[]},
 *  resolve: {extensions: string[]},
 *  plugins: *[]
 * }}
 */
module.exports = function() {
  return {
    /**
     * Entry points
     * Reference: https://webpack.js.org/configuration/entry-context/#entry
     */
    entry: {
      polyfills: './src/polyfills.ts',
      vendor: './src/vendor.ts',
      main: './src/main.ts'
    },

    /**
     * Loaders
     * Reference: https://webpack.js.org/configuration/module/
     * List: http://webpack.github.io/docs/list-of-loaders.html
     */
    module: {
      rules: [
        // Support for .ts files.
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            'angular2-template-loader',
            '@angularclass/hmr-loader'
          ],
          exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
        },
        // support for json files.
        {
          test: /\.json$/,
          loader: 'json'
        },
        // copy assets files to output
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file?name=assets/[name].[hash].[ext]'
        },
        // support for CSS in src/styles as raw text
        {
          test: /\.css$/,
          exclude: helpers.root('src', 'app'),
          loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css', 'postcss']})
        },
        // all css required in src/app files will be merged in js files
        {
          test: /\.css$/,
          include: helpers.root('src', 'app'),
          loader: 'raw!postcss'
        },
        // support for SASS files in src/assets as raw text
        {
          test: /\.scss$/,
          exclude: helpers.root('src', 'app'),
          loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: ['css', 'postcss', 'sass']})
        },
        // all scss required in src/app files will be merged in js files
        {
          test: /\.scss$/,
          include: helpers.root('src', 'app'),
          loader: 'raw!postcss!sass'
        },
        // support for .html as raw text
        {
          test: /\.html$/,
          loader: 'raw',
          exclude: helpers.root('src/index.html')
        }
      ]
    },

    /**
     * Resolve
     * Reference: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
      extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
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
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('src')
      ),

      /**
       * Copy assets from the public folder
       * Reference: https://github.com/kevlened/copy-webpack-plugin
       */
      new CopyWebpackPlugin([{
        from: helpers.root('src','assets'),
        to: 'assets'
      }], {
        ignore: [
          'css/*'
        ]
      }),

      // Tslint configuration for webpack 2
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
            autoprefixer({
              browsers: ['last 2 version']
            })
          ]
        }
      })
    ]
  }
};
