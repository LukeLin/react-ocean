/**
 * @Author Devicalin
 */

var fs = require('fs');
var gulp = require('gulp');
var webpack = require('webpack');
var createLibsWebpackConfig = require('./create-webpack-libs.config.js');
var createWebpackConfig = require('./create-webpack.config.js');
var del = require('del');
var browserSync = require('browser-sync').create();

gulp.task('default', ['build-dev', 'build']);

gulp.task('clean', function (cb) {
    return del([
        './public/js/min/'
    ], {
            force: true
        });
});

gulp.task('clean:dev', function (cb) {
    return del([
        './public/js/debug/'
    ], {
            force: true
        });
});

gulp.task('build:lib', function(cb){
    webpack(createLibsWebpackConfig(), function (err, stats) {
        if (err) throw new Error(err);

        if (stats.compilation.errors.length) {
            console.log(stats.compilation.errors[0]);
        }

        console.log('webpack libs end');
        cb();
    });
});

gulp.task('build', ['clean'], function (cb) {
    webpack(createWebpackConfig(), function (err, stats) {
        if (err) throw new Error(err);

        if (stats.compilation.errors.length) {
            console.log(stats.compilation.errors[0]);
        }

        console.log('webpack end');
        cb();
    });
});

gulp.task('build:lib:dev', function(cb){
    webpack(createLibsWebpackConfig(true), function (err, stats) {
        if (err) throw new Error(err);

        if (stats.compilation.errors.length) {
            console.log(stats.compilation.errors[0]);
        }

        console.log('webpack libs dev end');
        cb();
    });
});

gulp.task('build:dev', ['clean:dev'], function (cb) {
    webpack(createWebpackConfig(true), function (err, stats) {
        if (err) throw new Error(err);

        if (stats.compilation.errors.length) {
            console.log(stats.compilation.errors[0].error);
        }

        console.log('webpack dev end');

        browserSync.reload();

        cb();
    });
});

gulp.task('watch', ['build:dev'], function(){
    browserSync.init({
        files: ['public/**/*.*'],
        proxy: 'http://127.0.0.1:3000',
        port: 4000,
        open: false
    });

    gulp.watch('client/**', ['build:dev']);
    gulp.watch('common/**', ['build:dev']);
});
