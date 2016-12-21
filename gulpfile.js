const gulp              = require('gulp'),
      babelify          = require("babelify"),
      browserSync       = require('browser-sync'),
      nodemon           = require('gulp-nodemon'),
      sass              = require('gulp-sass'),
      browserify        = require('browserify'),
      vinylSourceStream = require('vinyl-source-stream'),
      vinylBuffer       = require('vinyl-buffer'),
      uglify            = require('gulp-uglify');

const logger = require('./server/helpers/logger').logger;

const bundler = browserify({
  entries:      ['public/js/entry.js'],
  cache:        {},
  packageCache: {},
  fullPaths:    false,
  debug:        false,
  paths:        ['node_modules', 'public/js/']
}).transform(babelify, {presets: ['babel-preset-es2016']});

gulp.task('develop', ['build-js', 'build-sass', 'nodemon'], () => {
  browserSync.init(null, {
    proxy:     'http://localhost:3000',
    files:     ['public/dist/main.css'],
    port:      7000,
    ghostMode: false,
    logLevel:  'silent',
    open:      false
  });
  gulp.watch('public/dist/main.js').on('change', browserSync.reload);
  gulp.watch(['public/css/main.scss', 'public/css/**/*.scss'], ['build-sass']);
  gulp.watch(['public/js/entry.js', 'public/js/**/*.js'], ['build-js']);
});

gulp.task('build-js', () => {
  return bundler.bundle()
    .on('error', function (err) {
      logger(err, ['gulp'], 'red');
      this.emit('end');
    })
    .pipe(vinylSourceStream('main.js'))
    .pipe(vinylBuffer())
    .pipe(gulp.dest('public/dist'));
});

gulp.task('build-js-production', () => {
  return bundler.bundle()
    .on('error', function (err) {
      logger(err, ['gulp'], 'red');
      this.emit('end');
    })
    .pipe(vinylSourceStream('main.js'))
    .pipe(vinylBuffer())
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'));
});

gulp.task('build-sass', () => {
  return gulp.src('public/css/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('public/dist'));
});

gulp.task('nodemon', (cb) => {
  let started = false;
  return nodemon({
    script: 'server/server.js',
    ignore: ['/public']
  }).on('start', function (arg) {
    if (!started) {
      cb();
      started = true
    }
  });
});

gulp.task('start', ['build-sass', 'build-js-production', 'nodemon']);
gulp.task('production', ['build-sass', 'build-js-production']);
