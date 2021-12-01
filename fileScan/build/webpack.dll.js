const webpack = require('webpack');
const path = require('path');

module.exports={
    entry: {
        react: ['react', 'react-dom','react-router'],
       // dva:['dva'],
        axios:["axios"],
       // underscore:["underscore"]
    },
    mode: 'production',
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, '../dist', 'dll'),
        library: '[name]_dll' //暴露给外部使用
        //libraryTarget 指定如何暴露内容，缺省时就是 var
    },
    plugins:[
        new webpack.DllPlugin({
            name:'[name]_dll',
            path: path.resolve(__dirname, '../dist', 'dll', 'manifest.json') //manifest.json的生成路径
        })
    ]
}