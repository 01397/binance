const http = require('http');
const https = require('https');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');
const webRequest = require('request');
const server = http.createServer();
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.txt': 'text/plain'
};

server.on('request', (req, res) => {
  let request = url.parse(req.url, false);

  if (request.pathname == '/request.json') {
    webRequest.get({
      url: decodeURIComponent(request.query)
    }, (error, response, body) => {
      if(error) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('page not found' + error);
        return res.end();
      }
      console.log(response.statusCode);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(body);
      return res.end();
    });
  } else {

    const filePath = __dirname + '/src' + (request.pathname == '/' ? '/index.html' : request.pathname);
    fs.readFile(filePath, 'utf-8')
      .then(data => {
        res.writeHead(200, { 'Content-Type': MIME_TYPES[path.extname(filePath)] || 'text/plain' });
        res.write(data);
        res.end();
      })
      .catch(err => {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('page not found' + err);
        return res.end();
      });
  }
});

server.listen(3000);
console.log('Let’s earn money!\n');