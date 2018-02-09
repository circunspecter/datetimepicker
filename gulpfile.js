const gulp = require('gulp');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const watch = require('gulp-watch');
const destPath = './dist';

// Compile sass
// ------------

gulp.task('sass:compile', () => {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(destPath));
});

gulp.task('sass:compile:min', () => {
  return gulp.src('./src/**/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename((path) => {
      path.basename += '.min';
    }))
    .pipe(gulp.dest(destPath));
});

gulp.task('sass', ['sass:compile', 'sass:compile:min']);

gulp.task('sass:watch', ['sass'], () => {
  gulp.watch('./src/**/*.scss', ['sass']);
});

// Copy templates folder
// ---------------------

gulp.task('cp:templates', () => {
  return gulp.src('./src/templates/**/*')
    .pipe(gulp.dest(destPath + '/templates'));
});

gulp.task('cp:templates:watch', ['cp:templates'], () => {
  gulp.watch('./src/templates/**/*', ['cp:templates']);
});

// Copy to docs
// ------------

gulp.task('cp:docs:lib', () => {
  return gulp.src('./dist/*.js')
    .pipe(gulp.dest('./docs/assets/js'));
});

gulp.task('cp:docs:styles', () => {
  return gulp.src('./dist/templates/**/*.min.css')
    .pipe(gulp.dest('./docs/assets/css/templates'));
});

gulp.task('cp:docs:styles:watch', ['cp:docs:styles'], () => {
  gulp.watch('./dist/templates/**/*.min.css', ['cp:docs:styles']);
});

gulp.task('cp:docs:configs', () => {
  return gulp.src('./dist/templates/**/*.js')
    .pipe(gulp.dest('./docs/assets/js/templates'));
});

gulp.task('cp:docs:configs:watch', ['cp:docs:configs'], () => {
  gulp.watch('./dist/templates/**/*.js', ['cp:docs:configs']);
});

gulp.task('cp:docs', ['cp:docs:lib', 'cp:docs:styles', 'cp:docs:configs']);

// Build
// -----

gulp.task('build', function(cb) {
  runSequence('sass:compile', 'sass:compile:min', 'cp:templates', 'cp:docs:styles', 'cp:docs:configs', cb);
});
