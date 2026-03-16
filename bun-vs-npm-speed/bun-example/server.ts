// Bun HTTP Server - NO external dependencies!
// Everything is built-in

const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    
    if (url.pathname === '/') {
      return Response.json({
        message: 'Hello from Bun!',
        timestamp: new Date().toISOString(),
        version: Bun.version,
        nativeFeatures: ['HTTP Server', 'Testing', 'TypeScript', 'SQLite', 'Watch Mode']
      });
    }
    
    if (url.pathname === '/api/users' && req.method === 'POST') {
      return req.json().then(data => {
        if (!data.name || !data.email) {
          return Response.json({ error: 'Validation failed' }, { status: 400 });
        }
        return Response.json({ user: data, note: 'No validation library needed!' });
      });
    }
    
    return new Response('Not Found', { status: 404 });
  }
});

console.log(`🚀 Bun server running at http://localhost:${server.port}`);
console.log(`✨ Zero dependencies installed!`);

// To run: bun run server.ts
// To watch: bun --watch server.ts
// To test: bun test