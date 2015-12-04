## react-redux-starter-kit tailored ![travis](https://travis-ci.org/queryxl/react-redux-starter-kit.svg?branch=master)

### Changes:
- for better IDE (WebStorm) 'goto' support:
    * do not use createConstants
    * remove path alias
- change eslint rules
    * `"react/jsx-boolean-value": 0`
    * `"space-before-function-paren" : [2, {"anonymous": "always", "named": "never"}]`
- npm scripts:
    * `"compile": "NODE_ENV=production webpack -p"`
    * `"start": "npm run dev:no-debug"`
- add support for Chrome [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)
- WebpackDevMiddleware: `noInfo : true`
- webpack.optimize.UglifyJsPlugin: `'warnings': false`


