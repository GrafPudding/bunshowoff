// Demo server - edit this file and watch it auto-restart!
// Change the message and save to see the changes instantly

const PORT = process.env.PORT || 3000;

const server = Bun.serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);

    return Response.json({
      message: "🔥 Hot reload is working!",
      timestamp: new Date().toISOString(),
      server: "Bun with --watch flag",
      hint: "Edit server.ts and save to see changes instantly"
    });
  }
});

console.log(`🚀 Server running at http://localhost:${server.port}`);
console.log(`📝 Edit server.ts and save to trigger hot reload!`);
