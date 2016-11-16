'use strict';
global.__base = __dirname + '/';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');

var validateEnvVariables = require('./config/env.conf');
var configPassport = require('./config/passport.conf');
var configMongoose = require('./config/mongoose.conf');

// Validation des variables d'environnement
validateEnvVariables();

// Configuration de la connexion à la base de données et connexion
configMongoose(mongoose);

// Configuration du module passport
configPassport(passport);

// Création de l'application Express
var app = express();
// autorisation CORS
app.use(cors());

// view engine setup
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, '..', 'client', 'dist', 'assets', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Configuration de la strategie d'authentification passport
app.use(passport.initialize());

var entries = require('./app/controllers')(passport);
app.use('/api', entries.api);
app.use('/auth', entries.auth);

/* todo : trouver une solution pour le favicon et les fichiers du front a provider au client ...*/
// configuration de l'acces aux fichiers du client
/*
app.use(express.static(path.join(__dirname, '../client/dist')));

// pour toutes les requetes qui arrivent jusqu'ici, envoie de l'index de l'application cliente
// pour qu'angular puisse la bootstrap
app.get('*', function(req, res) {
  res.sendFile('index.html', {
    root: '../client/dist'
  });
});*/

module.exports = app;
