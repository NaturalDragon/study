const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const commonConfig = require("./webpack.base.js");

module.exports = merge(commonConfig, {
  devtool: "cheap-module-eval-source-map", //开发环境下使用
  mode: "development",
  
  output: {
    path: path.join(__dirname, "/../dist/"),
    filename: "bundle.[hash:6].js",
    publicPath: "",
  },
  devServer: {
    // contentBase: path.resolve(__dirname, '../hot'),
    // historyApiFallback: {
    //   rewrites: [
    //     { from: /./, to: '/' }
    //   ]
    // },
    contentBase: false, // 默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录
    historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    compress: true, // 启用gzip压缩
    inline: true, // 设置为true，当源文件改变时会自动刷新页面
    hot: true, // 模块热更新，取决于HotModuleReplacementPlugin
    host: "0.0.0.0", // 设置默认监听域名，如果省略，默认为“localhost”
    port: 8003, // 设置默认监听端口，如果省略，默认为“8080”,
    open: true, //默认打开浏览器进入页面
  },
  plugins: [
    // new CopyWebpackPlugin([
    //   { from: path.resolve(__dirname, '../public'),
    //    to: path.resolve(__dirname, '../hot/public'),
    //    flatten: true
    //    }

    // ]),
    new webpack.HotModuleReplacementPlugin(), //热更新插件
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
  ],
});
