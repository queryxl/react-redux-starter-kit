import webpackConfig from './webpack.prod.config.js';
import _debug from 'debug';

const debug = _debug('app:karma');
debug('Create karma configuration.');

const karmaConfig = {
  basePath: '../', // project root in relation to bin/karma.js
  files: [
    './node_modules/phantomjs-polyfill/bind-polyfill.js',
    'tests/test-bundler.js'
  ],
  singleRun: true,
  autoWatch: false,
  frameworks: ['mocha'],
  reporters: ['mocha'],
  preprocessors: {
    ['tests/test-bundler.js']: ['webpack']
  },
  browsers: ['PhantomJS'],
  webpack: {
    devtool: 'inline-source-map',
    resolve: {
      ...webpackConfig.resolve,
      alias: {
        ...webpackConfig.resolve.alias,
        sinon: 'sinon/pkg/sinon.js'
      }
    },
    plugins: [webpackConfig.plugins[0], webpackConfig.plugins[1], webpackConfig.plugins[2]],
    module: {
      noParse: [
        /\/sinon\.js/
      ],
      loaders: webpackConfig.module.loaders.concat([
        {
          test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
          loader: 'imports?define=>false,require=>false'
        }
      ])
    },
    externals: {
      ...webpackConfig.externals,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window',
      'text-encoding': 'window'
    },
    sassLoader: webpackConfig.sassLoader
  },
  webpackMiddleware: {
    noInfo: true
  },
  coverageReporter: {
    reporters: [
      {type: 'text-summary'},
      {type: 'lcov', dir: 'coverage'}
    ]
  }
};

// cannot use `export default` because of Karma.
module.exports = (cfg) => cfg.set(karmaConfig);
