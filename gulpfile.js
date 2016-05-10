/**
 * @Author Devicalin
 */

var fs = require('fs');
var gulp = require('gulp');
var webpack = require('webpack');
var createLibsWebpackConfig = require('./create-webpack-libs.config.js');
var createWebpackConfig = require('./create-webpack.config');
var path    = require("path");
var del = require('del');

var DEBUG = process.env.NODE_ENV.trim() === 'development';


var TASKS = {
    copy2Production: {
        css: {
            src: './client/release/css/*-min.css',
            dest: './public/css/'
        },
        js: {
            src: './client/release/js/*-*.js',
            dest: './public/js/'
        }
    }
};


gulp.task('replace-html', ['build-dev', 'build'], function(cb){
    //var webpackAssets = fs.readFileSync(__dirname + '/webpack-assets.json', {
    //    encoding: 'utf8'
    //});
    //try {
    //    webpackAssets = JSON.parse(webpackAssets);
    //} catch(ex){
    //    webpackAssets = null;
    //}
    //
    //var jsName = webpackAssets && webpackAssets['apkStore'][0] || 'apkStore-min.js';
    //var cssName = webpackAssets && webpackAssets['apkStore'][1] || 'apkStore.css';
    //jsName = jsName.split('/').pop();
    //cssName = cssName.split('/').pop();

    //return gulp.src("./index.html")
    //    .pipe(replace(/\{\s*CSSPlaceholder\s*\}/gi, cssName))
    //    .pipe(replace(/\{\s*JSPlaceholder\s*\}/gi, jsName))
    //    //.pipe(gulp.dest("./"))
    //    .pipe(gulp.dest("./release/"))
    //    .on("end", function () {
    //        console.log("replace html done");
    //        //cb();
    //    });
    cb();
});

gulp.task('clean', function(cb){
    return del([
        './client/release/css/*-min.css',
        './public/css/*-min.css',
        './public/js/*-min.js',
        './client/release/js/*-min.js'
    ], {
        force: true
    });
});

gulp.task('clean-dev', function(cb){
    return del([
        './client/release/*'
    ], {
        force: true
    });
});

gulp.task('copy2Release', ['replace-html'], function(){
    return gulp.src('./client/js/libs/stable-dev.js')
        .pipe(gulp.dest('./client/release/js/'));
});

gulp.task('copy2Release-dev', ['build-dev'], function(){
    return gulp.src('./client/js/libs/stable-dev.js')
        .pipe(gulp.dest('./client/release/js/'));
});

gulp.task('dev', ['copy2Release-dev']);

gulp.task('copy2Production', ['copy2Release'], function(){
    // 拷贝到目录里
    gulp.src(TASKS.copy2Production.css.src)
        .pipe(gulp.dest(TASKS.copy2Production.css.dest));

    gulp.src(TASKS.copy2Production.js.src)
        .pipe(gulp.dest(TASKS.copy2Production.js.dest));

    gulp.src('./client/release/font/*')
        .pipe(gulp.dest('./public/font/'));

    return gulp.src('./client/release/img/*')
        .pipe(gulp.dest('./public/img/'));
});

gulp.task('default', ['copy2Production']);


gulp.task('build', ['clean'], function(cb){
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

gulp.task('build-dev', ['clean-dev'], function(cb){
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
