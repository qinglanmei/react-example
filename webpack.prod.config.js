/**
 * 生产环境配置
 */
"use strict";
let webpack = require('webpack');
let path = require('path');
let fs = require('fs');
let ExtractTextPlugin = require("extract-text-webpack-plugin"); //独立拆分css
let autoprefixer = require('autoprefixer'); //添加浏览器前缀
var HtmlWebpackPlugin = require('html-webpack-plugin'); //动态生成html
var CopyWebpackPlugin = require('copy-webpack-plugin'); //复制文件
/** 入口配置
 * @type {Object}
 */
var entry = {
    /**
     * 案例页入口文件
     * @type {String}
     */
    example: './src/app/example/app.js'
};

module.exports = {
    /*
     * babel参数
     * */
    babelQuery: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['transform-runtime', 'add-module-exports', 'typecheck', "transform-decorators-legacy"],
        cacheDirectory: true
    },
    /**
     * 入口文件
     * @type {Object}
     */
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '.././',
        filename: '[name]/[name].bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel?presets[]=react,presets[]=es2015,presets[]=stage-0',
            exclude: /node_modules/,
            query: this.babelQuery
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap')
        }, {
            test: /\.(png|jpg)$/,
            loader: "url?name=[path][name].[ext]&limit=8192"
        }]
    },
    postcss: function() {
        return [autoprefixer];
    },
    resolve: {
        extensions: ['', '.js', '.scss', 'css', 'png', 'jpg', 'jpeg'],
    },
    plugins: [
        /**
         * 案例页
         * @type {String}
         */
        new HtmlWebpackPlugin({
            title: 'React案例演示',
            keywords: '我的页面关键字',
            description: '我的页面描述',
            filename: './example/example.html',
            template: './src/app/common/common.html',
            chunks: ['example'],
            inject: true, //要把script插入到标签里
            shareIcon: '', //分享图片地址
            hash: true //是否产生hash
        }),
        /**
         * 查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
         */
        new webpack.optimize.DedupePlugin(),
        //使用压缩丑化js插件
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: {
                except: ['$scope', '$']
            }
        }),
        //拷贝文件到dist目录
        new CopyWebpackPlugin(
            [{
                from: './src/app/image',
                to: './image'
            }]
        ),
        /**
         * 调用dll的内容
         * @type {[type]}
         */
        new webpack.DllReferencePlugin({
            context: __dirname,
            //这里引入manifest文件
            manifest: require('./dist/vendor-manifest.json')
        }),
        /**
         * 提取css文件生成单独的css
         */
        new ExtractTextPlugin("[name]/[name].bundle.css")

    ]
}
