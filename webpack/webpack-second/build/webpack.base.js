const webpack = require('webpack');
const path = require('path');
const autoprefixer = require("autoprefixer");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
const postcssNormalize = require('postcss-normalize');

const isDev = process.env.NODE_ENV === 'development'
const env = process.argv.slice(-1)[0];
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
module.exports = {
  entry: {
    // app: ['babel-polyfill',path.resolve(__dirname, '../src/index.tsx')],
    app: path.resolve(__dirname, '../src/index.tsx'),
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader'
          }
        ],
        include: [path.join(__dirname, '../src')]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
      },

      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ]
      },
      {
        test: /\.(le|c)ss$/,
        use: [
           'style-loader',//style-loader 动态创建 style 标签，将 css 插入到 head 中
          {
            loader: MiniCssExtractPlugin.loader,// 拆分css为单个独立文件
            options: {
              hmr: isDev,
              reloadAll: true,
            }
          },
          {
            loader: 'css-loader',// css-loader 负责处理 @import 等语句
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',// 此设置可以保证类名和本地设置类名相同
              getLocalIdent: (context, localIdentName, localName, options) =>
                localName// 此设置可以保证类名和本地设置类名相同

            }

          }, {
            loader: 'postcss-loader',// postcss-loader 和 autoprefixer，自动生成浏览器兼容性前缀 
            options: {
              plugins() {
                return [
                  require('autoprefixer')({
                    "overrideBrowserslist": [
                      ">0.25%",
                      "not dead"
                    ]
                  })
                ]
              }
            }
          }, {
            loader: 'less-loader',// less-loader 负责处理编译 .less 文件,将其转为 css
            options: {
              modules: true,
              sourceMap: true
            }
          }, {
            loader: 'style-resources-loader',
            options: {
              patterns: path.resolve(__dirname, '../src/common.less'),
            },
          }
        ],
        exclude: /node_modules/
        
      },
      // {
      //   test: /\.css$/,
      //   exclude: /node_modules/,             
      //   use: [
      //     { loader: 'style-loader' },
      //     {
      //       loader: 'css-loader',
      //       options: {                      
      //         modules: true
      //       }
      //     },
      //   ]
      // },
      // {
      //   test: /\.less$/,
      //   exclude: /node_modules/,             
      //   use: [
      //     {
      //       loader: "style-loader" // creates style nodes from JS strings
      //     },
      //     {
      //       loader: "css-loader",// translates CSS into CommonJS
      //       options: {                       
      //         modules: true
      //       }
      //     }, {
      //       loader: 'less-loader',
      //       options: {
      //         modules: true,
      //       }
      //     },
      //   ]
      // },

      {
        test: /\.(png|jpe?g|gif|woff|woff2|ttf|eot|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240, // 20K
              esModule: false,
              name: '[name]_[hash:6].[ext]'
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: ['file-loader']
      },
      // {
      //   test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      //   use: 'url-loader?limit=10000&mimetype=application/font-woff'
      // }, {
      //   test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      //   use: 'url-loader?limit=10000&mimetype=application/font-woff'
      // }, {
      //   test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      //   use: 'url-loader?limit=10000&mimetype=application/octet-stream'
      // }, {
      //   test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      //   use: 'file-loader'
      // }
    ]
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all'
        },
      }
    }
  },
  plugins: [
    // new PrerenderSPAPlugin({
    //   staticDir: path.join(__dirname, '../dist'),
    //   routes: [ '/', '/main/workbench'],
    //   renderer: new Renderer({
    //     renderAfterTime: 50000
    //   })
    // }),
    new MiniCssExtractPlugin({
      filename: 'style.[name].css',

      // chunkFilename: 'style.css'
    }),
    new CopyWebpackPlugin([
      //  { from: path.resolve(__dirname, '../public'), to: path.resolve(__dirname, '../hot/public') }
      {
        from: path.resolve(__dirname, '../public/config/*.js'),
        to: path.resolve(__dirname, '../dist', 'config'),
        flatten: true,
      },
    ]),
    new HtmlWebpackPlugin({
      // favicon: path.resolve(__dirname, '../favicon.ico'),
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true,
      // hash: true,


    }),
    new webpack.ProvidePlugin({
      _: 'underscore',
      React: 'react',
      Component: ['react', 'Component']
    }),

  ],
  resolve: {
    extensions: ['.mjs', '.js', '.json', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      src: path.resolve(__dirname, '../src/')
    },
    modules: ['node_modules'],
  },
};
