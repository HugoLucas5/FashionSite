var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var combine = require('gulp-scss-combine');

gulp.task('sass', function() {
    return gulp.src([
            'src/scss/*.scss'
        ])
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('minify-css', function() {
    gulp.src('dist/css/*.css')
        .pipe(concat('styles.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function() {
    return gulp.src([
            'src/js/bootstrap.min.js',
            'src/js/common.js',
            'src/js/DioProgress.js',
            'src/js/global.js',
            'src/js/jquery-2.1.1.min.js',
            'src/js/jquery-2.1.3.min.js',
            'src/js/jquery.fancybox.js',
            'src/js/jquery.parallax.js',
            'src/js/jstree.min.js',
            'src/js/owl.carousel.min.js',
            'src/js/template.js'
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