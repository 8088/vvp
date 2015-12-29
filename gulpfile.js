#!/usr/bin/env node

'use strict';
// import 载入外挂
var gulp = require('gulp'),
    del = require('del'), //删除文件
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    autoprefixer = require('gulp-autoprefixer'),
    nano = require('gulp-cssnano'), // CSS压缩
    //eslint = require('gulp-eslint'),
    //uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    clean = require('gulp-rimraf'),
    concat = require('gulp-concat'),
    changed = require('gulp-changed'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    browserSync = require('browser-sync'), // 浏览器同步

    pkg = require('./package.json'),
    //自定义的一些处理方法
    build = require("./tools/build"); //合并脚本

// compile css from sass files
gulp.task('sass', function() {
    return gulp.src('src/stylesheets/sass/' + pkg.name + '.scss')
        .pipe(concat(pkg.name + '.scss'))
        .pipe(sass({
            style: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9',
            'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dev/stylesheets'))
        .pipe(gulp.dest('test/stylesheets')) // <-- 临时使用
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(nano())
        .pipe(gulp.dest('dist/stylesheets'))
        .pipe(livereload())
        .pipe(notify({
            message: 'Styles task complete'
        }));
});

// concatenate & minify js
gulp.task('scripts', function() {
    return build('src/scripts/js/')
        .pipe(livereload())
        .pipe(notify({
            message: 'Scripts task complete'
        }));
});

//build vQ.js
gulp.task('vq', function() {
    //var config = require("./src/config.json");
    return build('src/scripts/js/vq/')
        .pipe(livereload())
        .pipe(notify({
            message: 'vQ task complete'
        }));
});

//optimization images
gulp.task('images', function() {
    return gulp.src('src/assets/images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe(livereload())
        .pipe(notify({
            message: 'Images task complete'
        }));
});

//parse template
gulp.task('templates', function() {
    // 处理 jade
    return gulp.src('src/templates/jade/index.jade')
        .pipe(jade({
            pretty: true,
            //debug: true,
            cache: false
        }))
        .pipe(gulp.dest('test/UItest/'))
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: true
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('test/UItest/')) // <-- 临时使用
        .pipe(livereload())
        .pipe(notify({
            message: 'Template task complete'
        }));
});

//assets 临时方法
gulp.task('assets', function() {
    return gulp.src('src/assets/**/*')
        .pipe(changed('dev/assets'))
        .pipe(changed('dist/assets'))
        .pipe(changed('test/assets')) // <-- 临时使用
        .pipe(notify({
            message: 'Assets task complete'
        }));
});

gulp.task('build', function() {
    gulp.start('images');
    var build_path = 'dist\\' + pkg.name + '\\' + pkg.version +
        '\\';
    var cwd = process.cwd();
    gulp.src([
            'dev/css/**/*',
            //'dist/file/**/*',
            'dev/stylesheets/**/*.min.css',
            'dev/scripts/**/*.min.js',
            'dev/**/*.html'
        ])
        .pipe(gulp.dest(function(file) {
            var path = build_path + file.base.replace(
                cwd +
                '\\dist\\', '');
            return path;
        }));
});

// cleanup
gulp.task('clean', function() {
    return gulp.src([
            'dist/stylesheets',
            'dist/scripts',
            'dist/images',
            'dist/*.html'
        ], {
            read: false

        })
        .pipe(clean());
});

// watch for changes in files
gulp.task('default', ['clean'], function() {
    gulp.start('sass', 'scripts', 'templates', 'assets');
});

// monitoring 监听
gulp.task('watch', function() {

    // 监听所有.jade档
    gulp.watch('src/templates/**/*.jade', ['templates']);

    // 监听所有.scss档
    gulp.watch('src/stylesheets/**/*.scss', ['styles']);

    // 监听所有.js档
    gulp.watch('src/scripts/**/*.js', ['scripts']);

    // 监听所有图片档
    gulp.watch('src/assets/images/**/*', ['images']);

    // 建立即时重整伺服器
    var server = livereload();

    // 监听所有位在 dist/  目录下的档案，一旦有更动，便进行重整
    gulp.watch(['dist/**']).on('change', function(file) {
        server.changed(file.path);
    });

});
