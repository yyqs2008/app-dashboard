const path = require('path')
const webpackBaseConfig = require('./webpack.base.config.js');
const merge = require('webpack-merge');

module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: '/dist/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },
    devServer: {
        port: 8070,
        host: '127.0.0.1',
        //服务端代理地址例如对于当前地址的aip/products的请求会被代理到 http://localhost:8190/api/products请求下
        /*proxy: {
            '/api': {    //将www.exaple.com印射为/apis
                target: 'http://127.0.0.1:8080',  // 接口域名
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/api': ''   //需要rewrite的,
                }
            }
        }*/
    },
    module: {
        rules: [
        ]
    },
    plugins: [
    ]
});
