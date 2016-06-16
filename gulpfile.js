/**
 * @Author Devicalin
 */

var fs = require('fs');
var gulp = require('gulp');
var webpack = require('webpack');
var createLibsWebpackConfig = require('./create-webpack-libs.config.js');
var createWebpackConfig = require('./create-webpack.config.js');
var del = require('del');

gulp.task('default', ['build-dev', 'build']);

gulp.task('clean', function (cb) {
    return del([
        './public/js/min/',
    ], {
            force: true
        });
});

gulp.task('clean:dev', function (cb) {
    return del([
        './public/js/debug/',
    ], {
            force: true
        });
});

gulp.task('build', ['clean'], function (cb) {
    webpack(createWebpackConfig(), function (err, stats) {
        if (err) throw new Error(err);

        if (stats.compilation.errors.length) {
            console.log(stats.compilation.errors[0].error.message);
        }

        console.log('webpack end');
        cb();
    });

    webpack(createLibsWebpackConfig(), function (err, stats) {
        if (err) throw new Error(err);

        if (stats.compilation.errors.length) {
            console.log(stats.compilation.errors[0].error.message);
        }

        console.log('webpack libs end');
        // cb();
    });
});

gulp.task('build-dev', ['clean:dev'], function (cb) {
    webpack(createWebpackConfig(true), function (err, stats) {
        if (err) throw new Error(err);

        if (stats.compilation.errors.length) {
            console.log(stats.compilation.errors[0].error.message);
        }

        console.log('webpack dev end');
        cb();
    });

    webpack(createLibsWebpackConfig(true), function (err, stats) {
        if (err) throw new Error(err);

        if (stats.compilation.errors.length) {
            console.log(stats.compilation.errors[0].error.message);
        }

        console.log('webpack libs dev end');
        // cb();
    });
});
