// server.js
const next = require('next');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3001;

// With express
const express = require('express');
app.prepare().then(() => {
  const server = express();
  require('./routes')({ server, app });
  server.get('*', (req, res) => {
    return handle(req, res);
  });
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
