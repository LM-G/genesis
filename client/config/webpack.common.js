var webpack = require('webpack');
var helpers = require('./helpers');
/**
 * Webpack Plugins
 */
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
/*
 * Webpack Constants
 */
const METADATA = {
  isDevServer: helpers.isWebpackDevServer()
};

module.exports = function(options) {
  return {
    /*
     * Static metadata for index.html
     */
    metadata: METADATA,

    entry: {
      polyfills: './src/polyfills.ts',
      vendor: './src/vendor.ts',
      main: './src/main.ts'
    },

    resolve: {
      extensions: ['', '.js', '.ts', '.json', '.css', '.scss', '.html'],
      // Make sure root is src
      root: helpers.root('src')
    },

    module: {
      preLoaders: [
        {
          test: /\.ts$/,
          loader: 'string-replace-loader',
          query: {
            search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
            replace: '$1.import($3).then(mod => (mod.__esModule && mod.default) ? mod.default : mod)',
            flags: 'g'
          },
          include: [helpers.root('src')]
        }
      ],
      loaders: [
        {
          test: /\.ts$/,
          loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file?name=assets/[name].[hash].[ext]'
        },
        {
          test: /\.css$/,
          exclude: helpers.root('src', 'app'),
          loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
        },
        {
          test: /\.css$/,
          include: helpers.root('src', 'app'),
          loader: 'raw'
        },
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file'
        }
      ]
    },

    plugins: [
      new CleanWebpackPlugin(['dist', 'build'], {
        root: helpers.root(),
        verbose: true
      }),

      new ForkCheckerPlugin(),

      new webpack.optimize.CommonsChunkPlugin({
        name: ['main', 'vendor', 'polyfills']
      }),

      new CopyWebpackPlugin([{
        from: 'src/assets',
        to: 'assets'
      }]),

      new HtmlWebpackPlugin({
        template: 'src/index.html',
        chunksSortMode: 'dependency'
      })
    ],

    node: {
      global: 'window',
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  }
};
