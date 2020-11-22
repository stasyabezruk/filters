const path = require("path");
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const isDevelopment = process.env.NODE_ENV === "development";
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    mode: 'development',
    entry: path.join(__dirname, "src", "index.tsx"),

    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/"
    },
    resolve: {
        extensions: ['*', '.js', '.ts', '.tsx'],
        alias: {
            src: path.resolve(__dirname, "src")
        }
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: [
                    /\.module.(s(a|c)ss)$/
                ],
                use: [
                    isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader?url=false",                    
                    { loader: "scoped-css-loader" },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: isDevelopment,
                        },
                    },
                ],
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: isDevelopment ? "[name].css" : "[name].[hash].css",
            chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        hot: true,
        historyApiFallback: true
    },

    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};