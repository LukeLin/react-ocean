let fs = require('fs');
let path = require('path');
let webpack = require('webpack');
let packageJson = require('./package.json');


module.exports = {
    entry: path.resolve(__dirname, './server/app.js'),

    output: {
        path: path.resolve(__dirname, "./dist"),
        pathinfo: true,
        filename: 'server.js',
        libraryTarget: 'commonjs2'
    },

    debug: true,
    cache: true,
    devtool: 'source-map',

    target: 'node',

    node: {
        __filename: true,
        __dirname: true
    },

    resolve: {
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: [
            // 'client',
            'node_modules',
        ],
    },

    externals: Object.keys(packageJson.dependencies).filter((item) => {
        return (item !== 'react' && item !== 'react-dom')
    }).concat([
        {
            'react': 'react/dist/react.min.js'
        },
        'react-dom/server'
    ]),

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'react'
                    ],
                    plugins: [
                        "transform-es2015-modules-commonjs",
                        "transform-async-to-generator",
                    ]
                },
            }, {
                test: /\.json$/,
                loader: 'json-loader',
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        // new webpack.BannerPlugin('require("source-map-support").install();',
        //     { raw: true, entryOnly: false }),
        new webpack.IgnorePlugin(/(\.(css|less)$)|zepto/)
    ],
};

