const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackConfigBase = require('./webpack.base.conf');
const webpackConfigDev = {
    mode: 'development', // 通过 mode 声明开发环境
    
    output: {
        path: path.resolve(__dirname, '../dist'),
        // 打包多出口文件
        filename: './js/[name].bundle.js'
    },
    node: {
        fs: "empty"
    },
    plugins: [
        //热更新
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.BASE_URL': '\"' + process.env.BASE_URL + '\"',
            'process.env.mode':'\"development\"'
        })
    ],

    devtool: "source-map", // 开启调试模式

    devServer: {
        contentBase: path.join(__dirname, "../src"),
        //contentBase: path.resolve(__dirname, 'build'),
        publicPath: '/',
        host: "127.0.0.1",
        port: "8090",
        overlay: true, // 浏览器页面上显示错误
        // open: true, // 开启浏览器
        stats: "errors-only", //stats: "errors-only"表示只打印错误：
        hot: true, // 开启热更新
        //服务器代理配置项
        proxy: {
            '/avm/**': {
                target: 'http://192.168.38.53:8865/avm',  //http://192.168.38.53
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/avm': ''
                }
            }
        }
    },
}
module.exports = merge(webpackConfigBase, webpackConfigDev);