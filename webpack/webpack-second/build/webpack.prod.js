const webpack = require('webpack');
const path = require("path");
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
const merge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const commonConfig = require("./webpack.base.js");

module.exports = merge(commonConfig, {
  cache: false,
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, '/../dist/'),
    filename: 'bundle.[hash:6].js',
    publicPath: './'
  },
  optimization: {
    minimize: true
  },
  plugins: [
    // new CleanWebpackPlugin(['dist'], {
    //   root: path.resolve(__dirname, '..')
    // }),
    new CleanWebpackPlugin(),
    
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
  ],
  mode: 'production'
});
