const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode:'development', // 开发模式
  entry: path.resolve(__dirname,'../src/main.js'), // 入口文件
  output: {
      filename: '[name].[hash:8].js', // [name] 指entry属性名字, 默认为main
      path: path.resolve(__dirname,'../dist') // 打包后的目录
  },
  plugins:[
    new HtmlWebpackPlugin({
      // 选取一个html作为模版，在dist目录下会生成一个相同的html，之后将打包好的js注入到该html文件
      template: path.resolve(__dirname,'../public/index.html') 
    })
  ]
}