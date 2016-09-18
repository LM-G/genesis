'use strict';

// Dépendances ====================================================================================
var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var gulpSequence = require('gulp-sequence');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var webpack = require('webpack-stream');

// Variables =====================================================================================

var PATH_ROOT = './src/';
var PATH_SCRIPTS = PATH_ROOT + '**/*.ts';
var PATH_FAVICON = PATH_ROOT + 'app/assets/img/favicon.ico';
var PATH_CSS = './app/**/*.css';
var PATH_HTML = './app/**/*.html';
var PATH_DIST = './dist2/';
var PATH_DIST_JS = PATH_DIST + 'js/';
var PATH_DIST_CSS = PATH_DIST + 'css/';
var PATH_DIST_FONTS = PATH_DIST + 'fonts/';
var PATH_DIST_HTML = PATH_DIST + 'html/';
var PATH_DIST_LANG = PATH_DIST + 'lang/';
var PATH_DIST_IMG = PATH_DIST + 'img/';
var PATH_DIST_DOC = PATH_DIST + 'doc/';

// Tâches =========================================================================================
// Suppression du dossier public
gulp.task('clean', function() {
  return gulp
    .src(PATH_DIST)
    .pipe(clean({
      force: true
    }));
});

// compilation de l'application cliente
gulp.task('webpack: build', function() {
  return gulp.src(PATH_SCRIPTS)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(PATH_DIST_JS))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(['app/**/*.js', '!app/**/*test.js'], ['webpack: build']);
});


// Tâche par défaut
gulp.task('default',
  gulpSequence('clean', [
      'webpack: build',
    ],
    'watch'
  )
);