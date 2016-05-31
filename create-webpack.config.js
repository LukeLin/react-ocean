/**
 * Created by Devicalin on 2015/11/15.
 */
'use strict';

let webpack = require('webpack');
let path = require('path');
let fs = require('fs');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let ProgressBarPlugin = require('progress-bar-webpack-plugin');


module.exports = function (DEBUG) {
    let plugins = [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'libs',
        //     filename: DEBUG ? './js/libs-debug.js' : './js/libs-[chunkhash].js',
        //     // ensures that no other module goes inti the libs chunk
        //     minChunks: Infinity
        // }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        //new NyanProgressPlugin()
        new ProgressBarPlugin({
            format: '  build [:bar] :percent (:elapsed seconds)',
            clear: false
        }),
        new ExtractTextPlugin(DEBUG ? './css/main.css' : './css/main-min.css', {
            allChunks: true
        })
    ];
    if (DEBUG) {
        plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
    } else {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                },
                sourceMap: false
            }),
            function () {
                this.plugin("done", function (stats) {
                    let jsonStats = stats.toJson({
                        chunkModules: true
                    });
                    let obj = Object.assign(jsonStats.assetsByChunkName, { hash: jsonStats.hash })
                    fs.writeFileSync(
                        __dirname + "/webpack-assets.json",
                        JSON.stringify(obj)
                    );
                });
            },
            new webpack.optimize.DedupePlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('production')
                }
            }),
            new webpack.NoErrorsPlugin()
        );
    }

    let appEntry = [
        //'babel-polyfill'
    ];
    if (DEBUG) {
        appEntry.push(
            'webpack-hot-middleware/client'
        );
    }

    function getPagesNames(dirPath) {
        let filesNames = fs.readdirSync(dirPath);
        let entries = {
        };

        for (let fileName of filesNames) {
            entries[fileName.split('.').shift() || fileName] = [`${dirPath}/${fileName}`, 'webpack-hot-middleware/client'];
        }

        return entries;
    }

    let externals = {
        'zepto': 'Zepto',
        'react': 'React',
        'react-dom': 'ReactDOM',
        'redux': 'Redux',
        'react-redux': 'ReactRedux',
        'redux-thunk': 'ReduxThunk',
        'immutable': 'Immutable',
        'redux-immutablejs': 'ReduxImmutableJS',
        'react-immutable-proptypes': 'ImmutablePropsTypes',
        'fastclick': 'Fastclick'
    };
    if (DEBUG) {
        externals['react-addons-perf'] = 'ReactPerf';
        externals['why-did-you-update'] = 'ReactUpdateAvoid';
    }


    return {
        target: 'web',
        entry: getPagesNames(__dirname + '/client/js/pages'),
        output: {
            path: __dirname + '/public/',
            filename: DEBUG ? "./js/debug/[name]-debug.js" : "./js/app-[hash]/[name]-min.js",
            chunkFilename: DEBUG ? "./js/debug/[name]-debug.js" : "./js/app-[hash]/[name]-min.js",
            publicPath: '',
            pathinfo: false
        },

        cache: DEBUG,
        debug: DEBUG,

        // For options, see http://webpack.github.io/docs/configuration.html#devtool
        //devtool: DEBUG && "eval-source-map",
        devtool: DEBUG && "#inline-source-map",

        module: {
            loaders: [
                // Load ES6/JSX
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: require.resolve('babel-loader'),
                    query: {
                        cacheDirectory: true,
                        // fixed resolve path in parent directory error
                        "presets": ["react", "es2015"].map((preset) => require.resolve(`babel-preset-${preset}`)),
                        "plugins": ["transform-runtime"].map((preset) => require.resolve(`babel-plugin-${preset}`))
                    }
                },

                {
                    test: /\.json$/,
                    exclude: /node_modules/,
                    loaders: ['json-loader']
                },

                // Load styles
                {
                    test: /\.css$/,
                    loader:
                    //DEBUG
                    //? "style!css" :
                    ExtractTextPlugin.extract("style-loader", "css-loader")
                },

                // Load images
                { test: /\.jpg/, loader: "url-loader?limit=1024&mimetype=image/jpg&name=./img/[name].[ext]" },
                { test: /\.gif/, loader: "url-loader?limit=1024&mimetype=image/gif&name=./img/[name].[ext]" },
                { test: /\.png/, loader: "url-loader?limit=1024&mimetype=image/png&name=./img/[name].[ext]" },
                { test: /\.svg/, loader: "url-loader?limit=1024&mimetype=image/svg&name=./img/[name].[ext]" },

                // Load fonts
                { test: /\.woff$/, loader: "url-loader?limit=1024&minetype=application/font-woff&name=./font/[name].[ext]" },
                { test: /\.(ttf|eot|svg)$/, loader: "file-loader?name=./font/[name].[ext]" }
            ],
            noParse: []
        },

        plugins: plugins,

        externals: externals,

        resolve: {
            modulesDirectories: [
                "node_modules",

                // https://github.com/webpack/webpack-dev-server/issues/60
                "web_modules"
            ],

            // Allow to omit extensions when requiring these files
            extensions: ["", ".js", ".jsx", ".es6", '.json'],

            alias: {
                // 'libs': path.join(__dirname, './common/libs')
            }
        },

        devServer: DEBUG && {
            contentBase: './public/',
            hot: true,
            noInfo: false,
            inline: true,
            stats: { colors: true }
        }
    };

};
