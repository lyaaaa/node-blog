const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    react: ['react', 'react-dom']
  },
  mode: 'production',
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dist/dll'),
    library: '[name]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      context: path.resolve(__dirname, '../dist'),
      path: path.resolve(__dirname, '../dist', 'dll/manifest.json') //manifest.json的生成路径
    })
  ]
}
