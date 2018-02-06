/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');

/* eslint-disable import/no-extraneous-dependencies */
const setup = require('./middlewares/frontendMiddleware');
const resolve = require('path').resolve;
const app = express();
/* eslint-enable import/no-extraneous-dependencies */

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'dist'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = process.env.HOST;

// Let http.Server use its default IPv6/4 host
const host = customHost || null;
const prettyHost = customHost || 'localhost';

const port = process.env.PORT || 3000;

// Start your app.
app.listen(port, host, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  logger.appStarted(port, prettyHost);
});
