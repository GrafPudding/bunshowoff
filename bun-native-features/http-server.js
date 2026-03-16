// Bun's built-in HTTP server - no external dependencies!
const server = Bun.serve({
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    
    if (url.pathname === "/") {
      return new Response("Hello from Bun's native HTTP server!", {
        headers: { "Content-Type": "text/plain" }
      });
    }
    
    if (url.pathname === "/json") {
      return Response.json({
        message: "Bun is awesome!",
        features: ["HTTP Server", "Testing", "TypeScript", "Watch Mode", "SQLite"],
        version: Bun.version
      });
    }
    
    return new Response("Not Found", { status: 404 });
  }
});

console.log(`Bun server running at http://localhost:${server.port}`);