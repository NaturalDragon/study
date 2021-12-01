const webpack = require('webpack');
const path = require("path");
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const merge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const commonConfig = require("./webpack.base.js");

module.exports = merge(commonConfig, {
  mode: 'production',
  cache: false,
  devtool: 'cheap-module-source-map',
  output: {
    path: path.join(__dirname, '/../dist/'),
    filename: 'bundle.[hash:6].js',
    publicPath: './'
  },
  optimization: {
    usedExports:true,//js Tree Shaking,清除到代码中无用的js代码，只支持import方式引入，不支持commonjs的方式引入
    minimize: true
  },
  plugins: [
    // new CleanWebpackPlugin(['dist'], {
    //   root: path.resolve(__dirname, '..')
    // }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!dll', '!dll/**'] //不删除dll目录
    }),
    new AddAssetHtmlWebpackPlugin([
      {
        filepath: path.resolve(__dirname, '../dist/dll/react.dll.js') // 对应的 dll 文件路径
    },
    // {
    //   filepath: path.resolve(__dirname, '../dist/dll/dva.dll.js') // 对应的 dll 文件路径
    // },
    {
      filepath: path.resolve(__dirname, '../dist/dll/axios.dll.js') // 对应的 dll 文件路径
    },
    // {
    //   filepath: path.resolve(__dirname, '../dist/dll/underscore.dll.js') // 对应的 dll 文件路径
    // },
    ]),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, '../dist', 'dll', 'manifest.json')
  }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
  ],
 
});
