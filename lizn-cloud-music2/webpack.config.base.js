//webpack.config.js
const path=require('path')
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
const CopyWebpackPlugin=require('copy-webpack-plugin');
const HtmlWebpackPlugin =require('html-webpack-plugin')
const MiniCssExtractPlugin =require('mini-css-extract-plugin')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const postcssNormalize = require('postcss-normalize');
const isDev=process.env.NODE_ENV ==='development'
const config=require('./public/config')[isDev?'dev':'build']
module.exports = {
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'bundle.[hash].js',
        publicPath:'/'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    "corejs": 3
                                }
                            ]
                        ]
                    }
                },
                include: [path.resolve(__dirname, 'src')]
               // exclude: /node_modules/
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                     {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: true,
                    }
                },
                   // MiniCssExtractPlugin.loader, 
                    'css-loader', 
                    
                    {
                    loader: 'postcss-loader',
                    options: {
                        // plugins: function () {
                        //     return [
                        //         require('autoprefixer')()
                        //     ]
                        // }
                        plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            require('postcss-preset-env')({
                              autoprefixer: {
                                flexbox: 'no-2009',
                              },
                              stage: 3,
                            }),
                            // Adds PostCSS Normalize as the reset css with default options,
                            // so that it honors browserslist config in package.json
                            // which in turn let's users customize the target behavior as per their needs.
                            postcssNormalize(),
                          ],
                    }
                }, 'less-loader',
                {
                    loader: 'style-resources-loader',
                    options: {
                      patterns: path.resolve(__dirname, 'src/common.less'),
                    },
                  }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240, //20K
                            esModule: false ,
                            name: '[name]_[hash:6].[ext]'
                        }
                    }
                ],
                exclude: /node_modules/
            },
          
            
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            filename:'index.html',
            minify:{
                removeAttributeQuotes:false,//是否删除属性的双引号
                collapseWhitespace:false//是否折叠空白
            },
            hash:true,
            config:config.template
        }),
    
        new CopyWebpackPlugin([
            {
                from: 'public/js/*.js',
                to: path.resolve(__dirname, 'dist', 'js'),
                flatten: true,
            },
            {
                from: 'public/css/*.css',
                to: path.resolve(__dirname, 'dist', 'css'),
                flatten: true,
            },
            //还可以继续配置其它要拷贝的文件
        ], {
            ignore:['other.js']
        }),
        new MiniCssExtractPlugin ({
            filename:'css/[name].css'
        }),
     
       
    ],
   
}