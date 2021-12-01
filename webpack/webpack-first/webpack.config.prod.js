//webpack.config.js
const path=require('path')
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
const prodConfig= smart(baseConfig, {
    mode: 'production',
    devtool: 'source-map',
    plugins:[
        new CleanWebpackPlugin(),
        new OptimizeCssPlugin()
    ]
})
module.exports =smp.wrap(prodConfig)