const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'src');
const dirResources = path.join(__dirname, 'src/Resources');
const resourcePrefix = "TM_";

/**
 * Webpack Configuration
 */
module.exports = {
    entry: path.resolve(dirApp, 'main.tsx'),
    resolve: {
        modules: [
            dirApp,
            dirNode
        ],
        extensions: [".js", ".json", ".jsx",".ts",".tsx"]
    },
    plugins: [
        new webpack.DefinePlugin({
            IS_DEV: IS_DEV
        }),

        new webpack.ProvidePlugin({
            // lodash
            '_': 'lodash'
        }),

        new HtmlWebpackPlugin({
            template: path.resolve(dirApp, 'index.ejs'),
        })
    ],
    module: {
        rules: [

            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },
            // BABEL
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                include: [
                    dirApp
                ],
                options: {
                    "presets": ["react"]
                }
            },

            // STYLES
            {
                test: /\.css$/,
                use:['style-loader','css-loader']
            },

            // IMAGES
            {
                test: /\.(jpe?g|png|gif)$/,
                include: [
                    dirResources
                ],
                loader: 'file-loader',
                options: {
                    name: resourcePrefix + '[name].[ext]'
                }
            },

            // EJS
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            },

            {
                test:/\.scss$/,
                use:['style-loader','css-loader', 'sass-loader']
            },

            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "fonts/[name].[ext]",
                    },
                },
            },
        ]
    }
};
