//var gulp = require('gulp'),
//    minifycss = require('gulp-minify-css'),
//    concat = require('gulp-concat'),
//    uglify = require('gulp-uglify'),
//    rename = require('gulp-rename'),
//    del = require('del');

//压缩html文件
//gulp.task("htmlmin", function () {
//    gulp.src('../*.html')
//        .pipe(htmlmin({
//            collapseWhitespace: true
//        }))
//        .pipe(gulp.dest(option.buildPath + '/views'))
//})


//gulp.task('clean', function(cb) {
//    del(['minified/css', 'minified/js'], cb)
//});

//gulp.task('default', ['clean'], function() {
//    gulp.start('minifycss', 'minifyjs');
//});

var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del');
var htmlmin = require('gulp-htmlmin');
gulp.task('default',function(){
var options = {
collapseWhitespace:true,
collapseBooleanAttributes:true,
removeComments:true,
removeEmptyAttributes:true,
removeScriptTypeAttributes:true,
removeStyleLinkTypeAttributes:true,
minifyJS:true,
minifyCSS:true
};
gulp.src('test.html')
.pipe(htmlmin(options))
.pipe(gulp.dest('dest/')); 
gulp.src('homework1.html')
.pipe(htmlmin(options))
.pipe(gulp.dest('dest/')); 
});

