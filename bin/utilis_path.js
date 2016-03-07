var path = require('path');

var path_base = path.resolve(__dirname, '..');
var dir_src = 'src';
var dir_dist = 'dist';
var dir_static = 'static';

module.exports = (() => {
  const resolve = path.resolve;

  const base = (arg1, arg2) => {
    if (arg1) {
      if (arg2) {
        return resolve.apply(resolve, [path_base, arg1, arg2]);
      } else {
        return resolve.apply(resolve, [path_base, arg1]);
      }
    }
  };

  return {
    base: base,
    source: base.bind(null, dir_src),
    dist: base.bind(null, dir_dist),
    static: base.bind(null, dir_static)
  };
})();

