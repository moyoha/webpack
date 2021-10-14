const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')


module.exports = {
  mode:'development', // 开发模式
  entry: {
    main: path.resolve(__dirname,'../src/main.js'),
    share: path.resolve(__dirname,'../src/share.js')
  },
  output: {
      filename: '[name].[hash:8].js', // [name] 指entry属性名字, 默认为main
      path: path.resolve(__dirname,'../dist') // 打包后的目录
  },
  plugins:[
    new HtmlWebpackPlugin({
      // 选取一个html作为模版，在dist目录下会生成一个相同的html，之后将打包好的js注入到该html文件
      template: path.resolve(__dirname,'../public/index.html'),
      filename: 'index.html',
      chunks: ['main'] // 配置将哪些文件注入到该html文件，为[]在代表不注入js，若无该属性，默认注入所有js
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'../public/share.html'),
      filename: 'share.html',
      chunks: ['share']
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"] // 从右向左开始解析
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"] // 此外还需要安装node-sass(sass也行)
      },
      {
        test:/\.less$/,
        use:['style-loader','css-loader', "postcss-loader", 'less-loader'] // 此外还需要安装less模块
      }
    ]
  }
}