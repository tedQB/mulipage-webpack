const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

// 清除目录等
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const extractTextPlugin = require("extract-text-webpack-plugin");
const webpackConfigBase = require('./webpack.base.config');

const webpackConfigProd = {
    mode:'production',
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'./js/[name].[hash].js',
        publicPath:'./'
    },
    devtool:'cheap-module-eval-source-map',
    plugins:[
        //删除dist目录
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.BASE_URL': '\"' + process.env.BASE_URL + '\"'
        }),
        // 分离css插件参数为提取出去的路径
        new extractTextPlugin({
            filename: 'css/[name].[hash:8].min.css',
        }),
        //压缩css
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        //上线压缩 去除console等信息webpack4.x之后去除了webpack.optimize.UglifyJsPlugin
        new UglifyJSPlugin({
            uglifyOptions: {
                compress: {
                    //warnings: false,
                    drop_debugger: false,
                    drop_console: true
                }
            }
        })
    ]
}
module.exports = merge(webpackConfigBase, webpackConfigProd);
