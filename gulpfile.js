var gulp   = require('gulp');
var fs     = require('fs');
var coffeelint = require('gulp-coffeelint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var watch  = require('gulp-watch');
var coffee = require('gulp-coffee');

// Configuration
var srcFolder = './src';
var distFolder = './AddressFinder/Widget/view/frontend/web/js';
var jsFiles = srcFolder + '/*.js';
var coffeeFiles = srcFolder + '/*.coffee';
var bundleFileName = 'addressfinder_magento.js';
var outputFileName = 'addressfinder_magento.min.js';

gulp.task('default', ['lint'], function () {
  // place code for your default task here
});

gulp.task('develop', ['lint', 'concat', 'js-watch'], function() {
  // place code for your default task here
  console.log('Build complete');
});

gulp.task('production', ['lint', 'concat', 'minify'], function() {
  // place code for your default task here
  console.log('Build complete');
});

gulp.task('lint', function() {
  gulp.src(coffeeFiles)
    .pipe(coffeelint())
    .pipe(coffeelint.reporter())
    .pipe(coffeelint.reporter('fail'));
});

gulp.task('concat', function() {
  return gulp.src(coffeeFiles)
    .pipe(coffee({bare: true}))
    .pipe(concat(bundleFileName))
    .pipe(gulp.dest(distFolder));
});

gulp.task('minify', function() {
  return gulp.src(distFolder + '/' + bundleFileName)
    .pipe(rename(outputFileName))
    .pipe(uglify())
    .pipe(gulp.dest(distFolder));
});

gulp.task('js-watch', function() {
  return watch(coffeeFiles, function(){
    console.log('Watch triggered');
    gulp.src(coffeeFiles)
      .pipe(coffee({bare: true}))
      .pipe(concat(bundleFileName))
      .pipe(gulp.dest(distFolder));
  });
});
