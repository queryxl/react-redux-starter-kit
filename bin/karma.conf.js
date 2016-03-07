import karmaConfig from './karma.ci.conf';

karmaConfig.autoWatch = true;
karmaConfig.singleRun = false;
karmaConfig.browsers = ['PhantomJS', 'Chrome'];

karmaConfig.reporters.push('coverage');
karmaConfig.webpack.module.preLoaders = [{
  test: /\.(js|jsx)$/,
  include: /src/,
  loader: 'isparta',
  exclude: /node_modules/
}];

// cannot use `export default` because of Karma.
module.exports = (cfg) => cfg.set(karmaConfig);
