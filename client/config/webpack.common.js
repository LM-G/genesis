var webpack = require('webpack');
var helpers = require('./helpers');
/**
 * Webpack Plugins
 */
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const DashboardPlugin = require('webpack-dashboard/plugin');
/*
 * Webpack Constants
 */
const METADATA = {
  isDevServer: helpers.isWebpackDevServer()
};

module.exports = function(options) {
  var isProd = options.env === 'production';
  var isTest = options.env === 'test';
  return {
    /**
     * Static metadata for next loaders
     */
    metadata: METADATA,

    /**
     * Entry
     * Reference: http://webpack.github.io/docs/configuration.html#entry
     */
    entry: {
      polyfills: './src/polyfills.ts',
      vendor: './src/vendor.ts',
      main: './src/main.ts'
    },

    /**
     * Resolve
     * Reference: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {
      cache : true,
      extensions: ['', '.js', '.ts', '.json', '.css', '.scss', '.html'],
      root: helpers.root(),
      alias: {
        'app': 'src/app'
      }
    },

    /**
     * Loaders
     * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
     * List: http://webpack.github.io/docs/list-of-loaders.html
     */
    module: {
      preLoaders: isTest ? [] : [
        {
          test: /\.ts$/,
          loader: 'tslint'
        }
      ],

      loaders: [
        // Support for .ts files.
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            'angular2-template-loader',
            '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd
          ],
          exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
        },
        // support for .html as raw text
        {
          test: /\.html$/,
          loader: 'raw',
          exclude: helpers.root('src/index.html')
        },
        // Support for json files.
        {
          test: /\.json$/,
          loader: 'json'
        },
        // copy those assets to output
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file?name=assets/[name].[hash].[ext]'
        },
        // Support for CSS as raw text
        {
          test: /\.css$/,
          exclude: helpers.root('src', 'app'),
          loader: isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
        },
        // all css required in src/app files will be merged in js files
        {
          test: /\.css$/,
          include: helpers.root('src', 'app'),
          loader: 'raw!postcss'
        },
        // support for .scss files
        {
          test: /\.scss$/,
          exclude: helpers.root('src', 'app'),
          loader: isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
        },
        // all scss required in src/app files will be merged in js files
        {
          test: /\.scss$/,
          include: helpers.root('src', 'app'),
          loader: 'raw!postcss!sass'
        }
      ],
      postLoaders: []
    },

    /**
     * Plugins
     * Reference: http://webpack.github.io/docs/configuration.html#plugins
     * List: http://webpack.github.io/docs/list-of-plugins.html
     */
    plugins: [
      // Really nice display of webpack build execution, feel like working for NASA !
      new DashboardPlugin(),

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
       * Copy assets from the public folder
       * Reference: https://github.com/kevlened/copy-webpack-plugin
       */
      new CopyWebpackPlugin([{
        from: 'src/assets',
        to: 'assets'
      }]),

      /**
       * Inject script and link tags into html files
       * Reference: https://github.com/ampedandwired/html-webpack-plugin
       */
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        chunksSortMode: 'dependency'
      })
    ],

    /**
     * PostCSS
     * https://github.com/postcss/autoprefixer
     * Add browser specific prefixes to css attributes
     */
    postcss : [
      autoprefixer({
        browsers: ['last 2 version']
      })
    ],

    /**
     * Sass
     * Reference: https://github.com/jtangelder/sass-loader
     * Transforms .scss files into .css
     */
    sassLoader : {
      // not implemented yet
    }
  }
};
