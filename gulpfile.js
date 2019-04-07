var gulp       = require('gulp');
var eslint = require('gulp-eslint');
var concat     = require('gulp-concat');
var watch      = require('gulp-watch');

// Configuration
var sourceFiles  = './view/frontend/web/src/*.js';
var distFolder   = './view/frontend/web/js';
var distFileName = 'addressfinder-magento.js';

gulp.task('lint', function(done) {
  gulp.src(sourceFiles)
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
  done();
});

gulp.task('concat', function() {
  return gulp.src(sourceFiles)
    .pipe(concat(distFileName))
    .pipe(gulp.dest(distFolder));
});

gulp.task('js-watch', function() {
  return watch(sourceFiles, function(){
    console.log('Watch triggered');
    gulp.src(sourceFiles)
      .pipe(concat(distFileName))
      .pipe(gulp.dest(distFolder));
  });
});

gulp.task('default', gulp.series(['lint', 'concat', 'js-watch'], function(done) {
  console.log('Build complete');
  done()
}));


gulp.task('production', gulp.series(['lint', 'concat'], function(done) {
  console.log('Build complete');
  done()
}));