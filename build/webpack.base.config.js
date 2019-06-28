const path = require('path')
const webpack = require('webpack')
const glob = require('glob')

require('./env-config')

const purifyCssWebpack = require('purifycss-webpack')

const htmlWebpackPlugin = require('html-webpack-plugin')

const copyWebpackPlugin = require('copy-webpack-plugin')

const rules = require('webpack.rules.conf.js')

var getHtmlConfig = function (name, chunks) {
    return {
        template:`./src/pages/${name}/index.html`,
        filename:`${name}.html`,
        inject:true,
        hash:false,
        chunks:chunks,
        minify:process.env.NODE_ENV !== 'production'? false: {
            removeComments:true, //移除HTML中的注释
            collapseWhitespace:true, //折叠空白区域 也就是压缩代码
            removeAttributeQuotes:true, //去除属性引用
        }
    }
};

function getEntry() {
    var entry = {};
    glob.sync('./src/pages/**/*.js')
        .forEach(function (name) {
            var start = name.indexOf('src/')+4,
                end = name.length-3;
            var eArr = [];
            var n = name.slice(start, end);
            n = n.slice(0, n.lastIndexOf('/'));
            n = n.split('pages/')[1];
            eArr.push(name);
            entry[n] = eArr;
        });
    return entry;
}

