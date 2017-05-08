var gulp   = require('gulp');
var fs     = require('fs');
var eslint = require('gulp-eslint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var watch  = require('gulp-watch');

// Configuration
var eslintConfig = JSON.parse(fs.readFileSync('./.eslintrc.json'));
var srcFolder = './src';
var distFolder = './dist';
var jsFiles = srcFolder + '/*.js';
var bundleFileName = 'addressfinder.js';
var outputFileName = 'addressfinder.min.js';

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
  return gulp.src(srcFolder + '/**').pipe(eslint({
    'rules': eslintConfig.rules
  }))
  .pipe(eslint.format())
  // Brick on failure to be super strict
  .pipe(eslint.failOnError());
});

gulp.task('concat', function() {
  return gulp.src(jsFiles)
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
  return watch(jsFiles, function(){
    console.log('Watch triggered');
    gulp.src(jsFiles)
      .pipe(concat(bundleFileName))
      .pipe(gulp.dest(distFolder));
  });
});
