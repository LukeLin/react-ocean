/**
 * @Author Devicalin
 */

var fs = require('fs');
var gulp = require('gulp');
var webpack = require('webpack');
var createLibsWebpackConfig = require('./create-webpack-libs.config.js');
var createWebpackConfig = require('./create-webpack.config.js');

gulp.task('default', ['build-dev', 'build']);

gulp.task('build', function(cb){
    webpack(createWebpackConfig(), function(err, stats){
        if (err) throw new Error(err);

        if(stats.compilation.errors.length) {
            console.log(stats.compilation.errors[0].error.message);
        }

        console.log('webpack end');
        cb();
    });

    webpack(createLibsWebpackConfig(), function(err, stats){
        if (err) throw new Error(err);

        if(stats.compilation.errors.length) {
            console.log(stats.compilation.errors[0].error.message);
        }

        console.log('webpack end');
        // cb();
    });
});

gulp.task('build-dev', function(cb){
    webpack(createWebpackConfig(true), function(err, stats){
        if (err) throw new Error(err);

        if(stats.compilation.errors.length) {
            console.log(stats.compilation.errors[0].error.message);
        }

        console.log('webpack libs dev end');
        cb();
    });

    webpack(createLibsWebpackConfig(true), function(err, stats){
        if (err) throw new Error(err);

        if(stats.compilation.errors.length) {
            console.log(stats.compilation.errors[0].error.message);
        }

        console.log('webpack libs dev end');
        // cb();
    });
});
