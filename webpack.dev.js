const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const commonConf = require('./webpack.common').config;

const TARGET = process.env.npm_lifecycle_event;
const pageTitle = `My App ${  require("./package.json").version}`;

if (TARGET === 'start') {
    console.log('Compiling front end code for dev ');

    //   Add Hot reload for dev env
    // common.module.rules[0].options.presets.push("react-hmre");
    const devConfig = merge(commonConf, {
        devServer: {

            contentBase: './public',

            port: 9090,
            publicPath: 'http://localhost:9090/',
            historyApiFallback: true,
            host: '0.0.0.0',
            disableHostCheck: true,
        },
        devtool: 'source-map',
    });

    devConfig.module.rules[0].options.presets.push('react-hmre');

    devConfig.plugins = [
        ...commonConf.plugins,
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            title: pageTitle,
            template: './src/index.html',
            chunks: ['bundle'],
            filename: 'index.html',
            // chunksSortMode,
        }),
    ];

    module.exports = devConfig;
}


