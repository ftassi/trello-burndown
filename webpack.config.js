var webpack = require('webpack')
var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var BUILD_DIR = path.resolve(__dirname, 'src/client/public')
var APP_DIR = path.resolve(__dirname, 'src/client/app')

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'standard',
        exclude: /(node_modules)/
      }
    ],
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel'
      }
    ]
  },
  standard: {
    parser: 'babel-eslint'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: APP_DIR + '/../index.html',
      inject: true
    })
  ]
}

module.exports = config
