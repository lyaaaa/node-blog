const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}

module.exports = merge(commonConfig, prodConfig)
