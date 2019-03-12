const path = require('path')
const webpackBaseConfig = require('./webpack.base.config.js');
const merge = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
    output: {
        path: path.join(__dirname, '../dist/'),
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[hash].chunk.js'
    },
    module: {
        rules: [
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: path.join(__dirname, '../index.html'),
            template: path.join(__dirname, './src/template/index.ejs'),
            inject: false
        })
    ]
});
