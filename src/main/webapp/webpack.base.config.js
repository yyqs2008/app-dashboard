const path = require('path')
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development' //设置的环境变量都是存放在 process.env 中

module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.less/,
                use: ['style-loader','css-loader','less-loader']
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV: isDev ? '"development"' : '"production"'  //1:可以在要打包的js文件中引用环境变量；2：vue等框架会跟具不同环境区分打包（如：开发环境会包含一些很好的错误提示代码，而生产环境就没有必须加入这些，不然会影响效率）
            }
        }),
    ]
}
