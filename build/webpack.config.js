const webpack = require('webpack')
const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  entry: {
    blog: './pages/blog/index.js',
    home: './pages/home/index.js',
    login: './pages/login/index.js',
    register: './pages/register/index.js',
    vendor: ['jquery']
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash].js',
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new UglifyJsPlugin(),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.HotModuleReplacementPlugin(),
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
    new HtmlWebpackPlugin({
      template: './pages/register/index.html',
      filename: 'html/register.html',
      chunks: ['register']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
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
        pathRewrite: { '^/': '' }
      }
    }
  }
}
