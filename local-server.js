const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', 'outputs');
const port = Number(process.argv[2] || 8787);

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8'
};

http.createServer((req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${port}`);
  const pathname = decodeURIComponent(url.pathname);
  const file = pathname === '/' ? 'sistema-precificacao-pecas.html' : pathname.slice(1);
  const resolved = path.resolve(root, file);

  if (!resolved.startsWith(root)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(resolved, (error, data) => {
    if (error) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(resolved)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, '0.0.0.0', () => {
  console.log(`Sistema rodando em: http://localhost:${port}/sistema-precificacao-pecas.html`);
});