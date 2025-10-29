const INDEX_CACHE = 7200;
const ASSETS_CACHE = 2629744;

// Use Render's PORT if available, fallback to 8080 for local testing
const HTTP_PORT = process.env.PORT || 8080;

const express = require('express');
const path = require('path');

const build_path = path.resolve(__dirname, 'build');
const index_path = path.join(build_path, 'index.html');

express()
  .use(express.static(build_path, {
    setHeaders: (res, path) => {
      if (path === index_path) res.set('cache-control', `public, max-age: ${INDEX_CACHE}`);
      else res.set('cache-control', `public, max-age: ${ASSETS_CACHE}`);
    }
  }))
  .all('*', (_req, res) => {
    // TODO: better 404 page
    res.status(404).send('<h1>404! Page not found</h1>');
  })
  .listen(HTTP_PORT, '0.0.0.0', () => {
    console.info(`Server listening on port: ${HTTP_PORT}`);
  });
