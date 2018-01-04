const path = require('path');

const webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

function orderByList(list) {
    return function (chunk1, chunk2) {
        var index1 = list.indexOf(chunk1.names[0]);
        var index2 = list.indexOf(chunk2.names[0]);
        if (index2 == -1 || index1 < index2) {
            return -1;
        }
        if (index1 == -1 || index1 > index2) {
            return 1;
        }
        return 0;
    };
};

module.exports = {
    utils: {
        orderByList: orderByList
    },
    config: {
        entry: {
            bundle: ['babel-polyfill', path.join(__dirname, './src/index.jsx')],
        },
        output: {
            path: path.join(__dirname, './dist'),
            filename: '[name].js',
            publicPath: '/',
        },
        resolve: {
            modules: [
                path.join(__dirname, "./src"),
                "node_modules"
            ],
            extensions: ['.js', '.jsx'],
            enforceExtension: false
        },

        module: {
            rules: [{
                test: /\.js/,
                exclude: /node_modules/,
                loader: "babel-loader",
                include: [__dirname],
                options: {
                    presets: ["es2015", "react", "stage-0"]
                }
            },
            {
                test: /\.css$/,
                include: [path.join(__dirname, 'src')],
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: '[path][name]__[local]--[hash:base64:5]',
                    },
                }],
            }
            ]
        },

        plugins: [
            new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /fr/),
            new CopyWebpackPlugin([
                {
                    from: 'public',
                    to: path.join(__dirname, 'dist')
                }
            ]),

        ]
    }
}