var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');

gulp.task('sass', function() {
    return gulp.src([
            'src/scss/*.scss'
        ])
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('minify-css', function() {
    gulp.src([
            'dist/css/bootstrap.min.css',
            'dist/css/font-awesome.css',
            'dist/css/font-awesome.min.css',
            'dist/css/jquery.fancybox.css',
            'dist/css/owl.carousel.css',
            'dist/css/owl.transition.css',
            'dist/css/responsive.css',
            'dist/css/styles.css',
            'dist/css/stylesheet.css',
        ])
        .pipe(concat('all.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function() {
    return gulp.src([
            'src/js/jquery-2.1.3.min.js',
            'src/js/jquery.fancybox.js',
            'src/js/jquery.parallax.js',
            'src/js/bootstrap.min.js',
            'src/js/jstree.min.js',
            'src/js/template.js',
            'src/js/common.js',
            'src/js/global.js',
            'src/js/owl.carousel.min.js',
            'src/js/DioProgress.js'

        ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: './dist'
    });
});

gulp.watch(['src/scss/*.scss'], ['sass']);
gulp.watch(['src/js/*.js'], ['js']);
gulp.watch('dist/*.html').on('change', browserSync.reload);

gulp.task('default', ['sass', 'minify-css', 'js', 'serve']);