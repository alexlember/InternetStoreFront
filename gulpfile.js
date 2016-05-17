/**
 * Created by alembers on 5/11/16.
 */

var gulp          = require('gulp');
var watch         = require('gulp-watch');
var sass          = require('gulp-sass');
var sassInput     = './frontend/assets/sass/*.scss';
var sassOutput    = './frontend/assets/css';

gulp.task('sass', function () {
    return gulp
        .src(sassInput)
        .pipe(sass())
        .pipe(gulp.dest(sassOutput));
});

gulp.task('watch', function(){
    gulp.watch([sassInput], ['sass'])
});

gulp.task('default', ['sass', 'watch'], function() {});