const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const pagesFileName = path.resolve(__dirname, '../client/pages')

module.exports = {
  entry: fs.readdirSync(pagesFileName).reduce((entries, dir) => {
    const fullDir = path.join(pagesFileName, dir)
    const entry = path.join(fullDir, 'index.js')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }
    return entries
  }, {}),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash:8].js',
    publicPath: '/dist/'
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
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(),
    new UglifyJsPlugin(),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new HtmlWebpackPlugin({
      template: './client/pages/blog/index.html',
      filename: 'blog.html',
      chunks: ['blog', 'manifest', 'vendors', 'common']
    }),
    new HtmlWebpackPlugin({
      template: './client/pages/login/index.html',
      filename: 'login.html',
      minify: {
        collapseWhitespace: true
      },
      chunks: ['login', 'manifest', 'vendors', 'common']
    }),
    new HtmlWebpackPlugin({
      template: './client/pages/home/index.html',
      filename: 'home.html',
      chunks: ['home', 'manifest', 'vendors', 'common']
    }),
    new HtmlWebpackPlugin({
      template: './client/pages/register/index.html',
      filename: 'register.html',
      chunks: ['register', 'manifest', 'vendors', 'common']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
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
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ]
            ]
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
  }
}
