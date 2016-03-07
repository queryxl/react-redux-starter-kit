import Koa from 'koa';
import convert from 'koa-convert';
import webpack from 'webpack';
import webpackConfig from './webpack.dev.config.js';
import historyApiFallback from 'koa-connect-history-api-fallback';
import serve from 'koa-static';
import webpackDevMiddleware from './middleware/webpack-dev';
import webpackHMRMiddleware from './middleware/webpack-hmr';
import utils_paths from './utilis_path';
import _debug from 'debug';

const debug = _debug('app:bin:server');
const app = new Koa();

const PORT = 3000;

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement isomorphic
// rendering, you'll want to remove this middleware.
app.use(convert(historyApiFallback({
  verbose: false
})));

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------

const compiler = webpack(webpackConfig);

// Enable webpack-dev and webpack-hot middleware
const { publicPath } = webpackConfig.output;

app.use(webpackDevMiddleware(compiler, publicPath));
app.use(webpackHMRMiddleware(compiler));

// Serve static assets from ~/static since Webpack is unaware of
// these files. This middleware doesn't need to be enabled outside
// of development since this directory will be copied into ~/dist
// when the application is compiled.
app.use(convert(serve(utils_paths.static())));
app.listen(PORT);
debug('Server is now running at http://localhost:' + PORT);
export default app;
