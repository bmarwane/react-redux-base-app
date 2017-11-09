const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');


const TARGET = process.env.npm_lifecycle_event;

var common = {
        entry: "./src/index.jsx",
        output: {
            path: path.join(__dirname, './dist'),
            //publicPath: '',
            filename: 'bundle.js'
        },
        resolve: {
            modules: [
                path.join(__dirname, "./src"),
                "node_modules"
            ],
            extensions: ['.js', '.jsx'],
            enforceExtension: false
        },

        plugins: [
            new webpack.NamedModulesPlugin(),
            new HtmlWebpackPlugin({
                template : './src/index.html',
            }),

            new CopyWebpackPlugin([
                {
                    from: 'public',
                    to: path.join(__dirname, 'dist')
                }
            ])

        ],

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
                    test : /\.css$/,
                    include: [path.join(__dirname, 'src')],
                    use : ['style-loader', {
                        loader : 'css-loader',
                        options : {
                            modules : true,
                            importLoaders : 1,
                            localIdentName : '[path][name]__[local]--[hash:base64:5]',
                        },
                    }],
                }
            ]
        }
    }


if (TARGET === 'start') {
    console.log('Compiling front end code for dev ')

    //   Add Hot reload for dev env
    common.module.rules[0].options.presets.push("react-hmre")

    module.exports = merge(common, {
        devServer: {

            contentBase: './public',

            port: 9090,
            proxy: {
                '/api': {
                    target: 'http://localhost:8080',
                    secure: false,
                    prependPath: false
                }
            },
            publicPath: 'http://localhost:9090/',
            historyApiFallback: true
        },
        devtool: 'source-map'
    });

}

if (TARGET === 'build') {
    console.log('Compiling front end code for production ')

    module.exports = merge(common, {});
}

