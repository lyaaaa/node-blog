const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const pagesFileName = path.resolve(__dirname, '../client/pages')

// 入口
const entries = fs.readdirSync(pagesFileName).reduce((entries, dir) => {
  const fullDir = path.join(pagesFileName, dir)
  const entry = path.join(fullDir, 'index.js')
  if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
    entries[dir] = ['webpack-hot-middleware/client', entry]
  }
  return entries
}, {})

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new CleanWebpackPlugin(),
  new UglifyJsPlugin(),
  new OptimizeCSSAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano')
  }),
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash:8].css',
    chunkFilename: 'css/[name].[contenthash:8].css',
    ignoreOrder: false
  })
]
fs.readdirSync(pagesFileName).forEach(name => {
  plugins.push(
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: name + '.html',
      chunks: [name, 'manifest', 'vendors', 'common']
    })
  )
})

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash:8].js',
    publicPath: '/dist/'
  },
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, '../client/common')
    }
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          minSize: 1,
          priority: 0
        },
        vendors: {
          name: 'vendors',
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
  plugins,
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
  }
}
