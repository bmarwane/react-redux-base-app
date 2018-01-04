
const merge = require('webpack-merge');

const path = require('path');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

const pageTitle = `Borj Vente ${require('./package.json').version}`;
const commonConf = require('./webpack.common').config;
const utils = require('./webpack.common').utils;


const chunks = ['vendor', 'bundle'];
const chunksSortMode = utils.orderByList(chunks);


if (TARGET === 'build') {
    console.log('Compiling front end code for deployment ');

    const prodConf = merge(commonConf, {
        output: {
            filename: '[name].[chunkhash:8].js', // note *chunkhash* used here
            chunkFilename: '[name].[chunkhash:8].chunk.js',
        },
    });

    prodConf.entry = {
        bundle: [path.join(__dirname, './src/index.jsx')],
        vendor: [
            'babel-polyfill',
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
            'react-router-redux',
            'react-redux',
        ],
    };

    prodConf.plugins = [
        new CleanWebpackPlugin(['dist']),

        ...commonConf.plugins,

        new webpack.optimize.CommonsChunkPlugin({ names: ['vendor', 'manifest'], minChunks: Infinity }),
        new InlineManifestWebpackPlugin({ name: 'webpackManifest' }),

        new HtmlWebpackPlugin({
            title: pageTitle,
            template: './src/index.html',
            chunks,
            filename: 'index.html',
            chunksSortMode,
            minify: {
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
            },
            assetsVersion: require('./package.json').version,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'report.html',
            openAnalyzer: false,
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false,
            },
        }),
        // new webpack.HashedModuleIdsPlugin(),
        new webpack.NamedModulesPlugin(),
    ];
    module.exports = prodConf;
}
