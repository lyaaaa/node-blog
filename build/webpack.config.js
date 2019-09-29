const webpack = require('webpack')
const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    blog: './pages/blog/index.js',
    home: './pages/home/index.js',
    login: './pages/login/index.js'
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './pages/blog/index.html',
      filename: 'html/blog.html',
      chunks: ['blog']
    }),
    new HtmlWebpackPlugin({
      template: './pages/login/index.html',
      filename: 'html/login.html',
      chunks: ['login']
    }),
    new HtmlWebpackPlugin({
      template: './pages/home/index.html',
      filename: 'html/home.html',
      chunks: ['home']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/'
            }
          },
          'css-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    historyApiFallback: true,
    port: 8080,
    inline: true,
    hot: true,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api' : ''}
      }
    }
  }
}
