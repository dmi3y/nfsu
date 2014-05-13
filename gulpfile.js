var 
    jshint = require('gulp-jshint'),
    gulp   = require('gulp'),
    nodeunit = require('gulp-nodeunit');

gulp.task('lint', function() {
  return gulp.src(['./nfsu.js','./test/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('test', function () {
    gulp.src('./test/**/*_test.js')
        .pipe(nodeunit({
            reporter: 'junit',
            reporterOptions: {
                output: 'test'
            }
        }));
});

gulp.task('default', ['lint', 'test']);