/**
 * Created by Devicalin on 2015/11/15.
 */
'use strict';

let webpack = require('webpack');
let path = require('path');
let fs = require('fs');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let ProgressBarPlugin = require('progress-bar-webpack-plugin');
let HappyPack = require('happypack');


module.exports = function (DEBUG) {
    let happyId = DEBUG ? 'app-debug' : 'app';


    let plugins = [
        new HappyPack({ id: happyId }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        //new NyanProgressPlugin()
        new ProgressBarPlugin({
            format: '  build [:bar] :percent (:elapsed seconds)',
            clear: false
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./' + (DEBUG ? 'manifest-debug.json' : 'manifest.json'))
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

    function getPagesNames(dirPath) {
        let filesNames = fs.readdirSync(dirPath);
        let entries = {
        };

        for (let fileName of filesNames) {
            if(DEBUG) {
                entries[fileName.split('.').shift() || fileName] = ['webpack-hot-middleware/client', `${dirPath}/${fileName}`];
            } else {
                entries[fileName.split('.').shift() || fileName] = [`${dirPath}/${fileName}`];
            }
        }

        return entries;
    }

    let babelPlugins = [
        'transform-runtime',

        // exclude commonjs for webpack 2.0 tree shaking optimization
        'transform-es2015-template-literals',
        'transform-es2015-literals',
        'transform-es2015-function-name',
        'transform-es2015-arrow-functions',
        'transform-es2015-block-scoped-functions',
        'transform-es2015-classes',
        'transform-es2015-object-super',
        'transform-es2015-shorthand-properties',
        'transform-es2015-computed-properties',
        'transform-es2015-for-of',
        'transform-es2015-sticky-regex',
        'transform-es2015-unicode-regex',
        'check-es2015-constants',
        'transform-es2015-spread',
        'transform-es2015-parameters',
        'transform-es2015-destructuring',
        'transform-es2015-block-scoping',
        'transform-es2015-typeof-symbol',
        ['transform-regenerator', { async: false, asyncGenerators: false }]
    ];
    if (!DEBUG) {
        babelPlugins.push(
            'transform-react-remove-prop-types',
            'transform-react-constant-elements',
            'transform-react-inline-elements'
        );
    }

    return {
        target: 'web',
        entry: getPagesNames(__dirname + '/client/js/pages'),
        output: {
            path: __dirname + '/public/',
            filename: DEBUG ? "./js/debug/[name].js" : "./js/min/[name].js",
            chunkFilename: DEBUG ? "./js/debug/[name].js" : "./js/min/[name].js",
            publicPath: '/static',
            pathinfo: false
        },

        cache: true,
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
                        "presets": ["react"].map((preset) => require.resolve(`babel-preset-${preset}`)),
                        "plugins": babelPlugins.map((preset) => {
                            if(typeof preset === 'string')
                                return require.resolve(`babel-plugin-${preset}`);
                            else if(Array.isArray(preset))
                                return [require.resolve(`babel-plugin-${preset[0]}`), ...preset];
                        })
                    },
                    happy: { id: happyId }
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

        externals: {},

        resolve: {
            root: path.resolve('/'),
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
        }
    };

};
