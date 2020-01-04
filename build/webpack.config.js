const webpack = require('webpack')
const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    blog: './pages/blog/index.js',
    home: './pages/home/index.js',
    login: './pages/login/index.js',
    register: './pages/register/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash].js',
    publicPath: '/'
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        chunks: 'async',
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          minSize: 1,
          priority: 0
        },
        vendors: {
          name: 'vendors',
          chunks: 'all',
          priority: 10,
          test: /[\\/]node_modules[\\/]/
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new UglifyJsPlugin(),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './pages/blog/index.html',
      filename: 'html/blog.html',
      chunks: ['blog', 'manifest', 'vendors', 'common']
    }),
    new HtmlWebpackPlugin({
      template: './pages/login/index.html',
      filename: 'html/login.html',
      chunks: ['login', 'manifest', 'vendors', 'common']
    }),
    new HtmlWebpackPlugin({
      template: './pages/home/index.html',
      filename: 'html/home.html',
      chunks: ['home', 'manifest', 'vendors', 'common']
    }),
    new HtmlWebpackPlugin({
      template: './pages/register/index.html',
      filename: 'html/register.html',
      chunks: ['register', 'manifest', 'vendors', 'common']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[id].css',
      ignoreOrder: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
              useBuiltIns: 'usage'
            }]]
          }
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
