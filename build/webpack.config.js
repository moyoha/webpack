const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const Webpack = require('webpack')

module.exports = {
  mode: 'development', // 开发模式
  entry: {
    main: path.resolve(__dirname, '../src/main.js'),
    share: path.resolve(__dirname, '../src/share.js')
  },
  output: {
    filename: '[name].[hash:8].js', // [name] 指entry属性名字, 默认为main
    path: path.resolve(__dirname, '../dist') // 打包后的目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 选取一个html作为模版，在dist目录下会生成一个相同的html，之后将打包好的js注入到该html文件
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      chunks: ['main'] // 配置将哪些文件注入到该html文件，为[]在代表不注入js，若无该属性，默认注入所有js
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/share.html'),
      filename: 'share.html',
      chunks: ['share']
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
    }),
    new vueLoaderPlugin(),
    new Webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test:/\.vue$/,
        use:['vue-loader']
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"] // 从右向左开始解析
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"] // 此外还需要安装node-sass(sass也行)
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', "postcss-loader", 'less-loader'] // 此外还需要安装less模块
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: "asset",
        generator: {
          filename: 'static/[name].[hash].[ext]'
        }
      },
      {
        test: /\.html$/i,
        loader: "html-loader"
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: {
                    //core-js的版本
                    version: 3
                  },
                  //需要兼容的浏览器
                  targets: {
                    chrome: '60',
                    firefox: '60',
                    ie: '9',
                    safari: '10',
                    edge: '17'
                  }
                }
              ]
            ],
          }
        },
        exclude: /node_modules/
      },
    ]
  },
  resolve:{
    // 设置路径别名
    alias:{
      'vue$':'vue/dist/vue.runtime.esm.js',
      '@':path.resolve(__dirname,'../src')
    },
    // 尝试按顺序解析这些后缀名。
    // 如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。
    extensions:['*','.js','.json','.vue']
  },
  devServer:{
    port:3000,
    hot:true
  },
}