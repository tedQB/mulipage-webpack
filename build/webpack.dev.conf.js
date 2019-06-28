const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')

const webpackConfigDev = {
    mode:'development',
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'./js/[name].bundle.js'
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.BASE_URL':'\"'+ process.env.BASE_URL + '\"'
        })
    ],
    devtool:'source-map',
    devServer:{
        contentBase:path.join(__dirname,'../src'),
        publicPath:'/',
        host:'127.0.0.1',
        port:'8888',
        proxy:{
            '/testing/*':{
                target:'https://www.baidu.com',
                secure:true,
                changeOrigin:true
            }
        }
    }
}
module.exports = merge(webpackConfigBase, webpackConfigDev)
