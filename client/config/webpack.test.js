var helpers = require('./helpers');
var webpack = require('webpack');

module.exports = function(){
  return {
    devtool: 'inline-source-map',

    resolve: {
      extensions: ['.ts', '.js']
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
          exclude: [helpers.root('node_modules')]
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
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
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        helpers.root('./src'),
        {}
      )
     ]
  };
};