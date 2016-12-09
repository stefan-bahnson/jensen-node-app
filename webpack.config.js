var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');

module.exports = {
  entry: {
    posts: './js/Posts',
    post: './js/Post'
  },
  context: path.join(__dirname, 'app'),
  output: {
    path: './dist',
    filename: "[name].js",
    publicPath: '/'
  },
  devServer: {
    inline: true,
    port: 3000,
    contentBase: './dist'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015', 'react' ]
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass', 'resolve-url')
      },
      {
        test: /\.(eot|ttf|svg|gif|png|jpg|jpeg)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([
      { from: '*.html', to: '../dist' }
    ])
  ]
};