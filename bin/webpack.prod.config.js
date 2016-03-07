var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OnBuildWebPack = require('on-build-webpack');
var webpackConfig = require('./webpack.dev.config.js');
var utils_paths = require('./utilis_path');
var fs = require('fs-extra');

webpackConfig.devtool = 'eval';
webpackConfig.entry.app = utils_paths.source('main.js');
webpackConfig.output.publicPath = '';
webpackConfig.plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new HtmlWebpackPlugin({
    template: utils_paths.source('index.html'),
    hash: false,
    favicon: utils_paths.static('favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true
    }
  }),
  new ExtractTextPlugin('[name].[contenthash].css', {
    allChunks: true
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      unused: true,
      dead_code: true,
      warnings: false
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor']
  }),
  new OnBuildWebPack(function (stats) {
    fs.copySync(utils_paths.static(), utils_paths.dist())
  })

];

module.exports = webpackConfig;
