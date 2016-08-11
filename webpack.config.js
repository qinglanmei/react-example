/**
 * 开发环境配置
 */
"use strict";
let path = require('path');
let fs = require('fs');

let webpack = require('webpack');
let ip = require('ip');
let localIp = ip.address();
let autoprefixer = require('autoprefixer'); //添加浏览器前缀
let ExtractTextPlugin = require("extract-text-webpack-plugin"); //独立拆分css
var CopyWebpackPlugin = require('copy-webpack-plugin'); //复制文件
var OpenBrowserPlugin = require('open-browser-webpack-plugin'); //打开浏览器
//入口程序,解析app.js
let getEntries = (function() {
    let _entries = {};
    let _basePath = path.join(__dirname, './src/app/');
    let _entryFile = 'app.js';
    let _dirs = fs.readdirSync(_basePath);
    _dirs.forEach(function(dir) {
        let _path = path.join(_basePath, dir, _entryFile);
        if (fs.existsSync(_path)) {
            _entries[dir] = ['webpack/hot/dev-server', 'webpack-dev-server/client?http://' + process.env.npm_package_config_ip + ':' + process.env.npm_package_config_port, _path];
        }
    });
    return _entries;
})();

module.exports = {
    /*
     * babel参数
     * */
    babelQuery: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['transform-runtime', 'add-module-exports', 'typecheck', "transform-decorators-legacy"],
        cacheDirectory: true
    },
    devtool: "eval-source-map", //产生source的方式
    entry: getEntries,
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist',
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
        extensions: ['', '.js', '.scss', 'css', 'png', 'jpg', 'jpeg']
    },
    plugins: [
        new OpenBrowserPlugin({
            url: 'http://localhost:8181'
        }),
        //热加载
        new webpack.HotModuleReplacementPlugin(),
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
         * 提取公共部分js
         * @type {String}
         */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.js'
        }),
        /**
         * 提取css文件
         */
        new ExtractTextPlugin("[name]/[name].bundle.css")

    ]
}
