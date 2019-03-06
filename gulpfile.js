var gulp       = require('gulp');
var coffeelint = require('gulp-coffeelint');
var concat     = require('gulp-concat');
var watch      = require('gulp-watch');
var coffee     = require('gulp-coffee');

// Configuration
var coffeeFiles  = './view/frontend/web/coffee/*.coffee';
var distFolder   = './view/frontend/web/js';
var distFileName = 'addressfinder-magento.js';

gulp.task('lint', function(done) {
  gulp.src(coffeeFiles)
    .pipe(coffeelint())
    .pipe(coffeelint.reporter())
    .pipe(coffeelint.reporter('fail'));
  done();
});

gulp.task('concat', function() {
  return gulp.src(coffeeFiles)
    .pipe(coffee({bare: true}))
    .pipe(concat(distFileName))
    .pipe(gulp.dest(distFolder));
});

gulp.task('js-watch', function() {
  return watch(coffeeFiles, function(){
    console.log('Watch triggered');
    gulp.src(coffeeFiles)
      .pipe(coffee({bare: true}))
      .pipe(concat(distFileName))
      .pipe(gulp.dest(distFolder));
  });
});

gulp.task('default', gulp.series(['lint', 'concat', 'js-watch'], function(done) {
  console.log('Build complete');
  done()
}));


gulp.task('production', gulp.series(['lint', 'concat'], function() {
  console.log('Build complete');
}));