//webpack.config.js
const path=require('path')
const webpack=require('webpack')
const {smart} =require('webpack-merge')
const baseConfig=require('./webpack.config.base')
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
const CopyWebpackPlugin=require('copy-webpack-plugin');
const HtmlWebpackPlugin =require('html-webpack-plugin')
const MiniCssExtractPlugin =require('mini-css-extract-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const isDev=process.env.NODE_ENV ==='development'
const config=require('./public/config')[isDev?'dev':'build']
const devConfig=     smart(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map', //开发环境下使用
    devServer:{
        //hot:true,
        open:true,//When open is enabled, the dev server will open the browser.
        port:'4000',//默认是8080
        quiet: false, //默认不启用
        inline: true, //默认开启 inline 模式，如果设置为false,开启 iframe 模式
        stats: "errors-only", //终端仅打印 error
        overlay: false, //默认不启用
        clientLogLevel: "silent", //日志等级
        compress: true //是否启用 gzip 压缩
    },
    // plugins:[
    //     new webpack.HotModuleReplacementPlugin()
    // ]
})

module.exports =smp.wrap(devConfig)