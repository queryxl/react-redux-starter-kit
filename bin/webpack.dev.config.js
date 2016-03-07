var webpack = require('webpack');
var cssnano = require('cssnano');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var utils_paths = require('./utilis_path');
var _debug = require('debug');

var debug = _debug('app:webpack:config');

debug('Create webpack configuration.');
module.exports = {
  name: 'client',
  target: 'web',
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    root: utils_paths.source(),
    extensions: ['', '.js', '.jsx', '.json']
  },
  entry: {
    app: [utils_paths.source('main.js'), 'webpack-hot-middleware/client'],
    vendor: [
      'history',
      'react',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux'
    ]
  },
  output: {
    filename: '[name].[hash].js',
    path: utils_paths.dist(),
    publicPath: 'http://localhost:3000/'
  },

  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      loader: 'eslint',
      exclude: /node_modules/
    }],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react', 'stage-0'],
          env: {
            development: {
              plugins: [
                ['react-transform', {
                  transforms: [{
                    transform: 'react-transform-hmr',
                    imports: ['react'],
                    locals: ['module']
                  }, {
                    transform: 'react-transform-catch-errors',
                    imports: ['react', 'redbox-react']
                  }]
                }]
              ]
            },
            production: {
              plugins: [
                'transform-react-remove-prop-types',
                'transform-react-constant-elements'
              ]
            }
          }
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&-minimize!postcss!sass?sourceMap')
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ExtractTextPlugin.extract('style', 'css?sourceMap&-minimize!postcss')
      },
      {
        test: /\.woff(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
      },
      {test: /\.otf(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'},
      {
        test: /\.ttf(\?.*)?$/,
        loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
      },
      {test: /\.eot(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]'},
      {test: /\.svg(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'},
      {test: /\.(png|jpg)$/, loader: 'url?limit=8192'}
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      },
      '__BASENAME__': JSON.stringify('')
    }),
    new HtmlWebpackPlugin({
      template: utils_paths.source('index.html'),
      hash: false,
      favicon: utils_paths.source('static/favicon.ico'),
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    })
  ],
  eslint: {
    configFile: utils_paths.base('.eslintrc')
  },
  sassLoader: {
    includePaths: [utils_paths.source('styles')]
  },
  postcss: [
    cssnano({
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions']
      },
      discardComments: {
        removeAll: true
      },
      safe: true,
      sourcemap: true
    })
  ],
  stats: {
    children: false
  }
};
