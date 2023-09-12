const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, './dist'),

    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(png|jpg|webp)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name].[hash][ext]',
                },
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: { presets: ['@babel/env', '@babel/preset-react'] },
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },


        ]

    },

    devtool: 'source-map',

    devServer: {
        static: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack testing',
            filename: 'index.html',
            template: 'public/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    ]
}