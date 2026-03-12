const http = require('http');
const { MetricsCollector } = require('../shared/metrics.cjs');

const metrics = new MetricsCollector();
const PORT = 3002;

const server = http.createServer((req, res) => {
  const startTime = Date.now();
  
  const url = new URL(req.url, `http://localhost:${PORT}`);
  
  res.setHeader('Content-Type', 'application/json');

  if (url.pathname === '/') {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: 'Node.js HTTP Server - Hello!' }));
    const duration = Date.now() - startTime;
    metrics.recordRequest(duration);
    return;
  }

  if (url.pathname === '/echo') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        res.statusCode = 200;
        res.end(JSON.stringify(parsed));
        const duration = Date.now() - startTime;
        metrics.recordRequest(duration);
      } catch (e) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  if (url.pathname === '/metrics') {
    res.statusCode = 200;
    res.end(JSON.stringify({
      server: 'node',
      ...metrics.getMetrics()
    }));
    return;
  }

  if (url.pathname === '/reset') {
    metrics.reset();
    res.statusCode = 200;
    res.end(JSON.stringify({ status: 'reset' }));
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, () => {
  console.log(`Node.js HTTP server running at http://localhost:${PORT}`);
});
