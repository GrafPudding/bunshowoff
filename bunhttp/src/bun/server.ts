import { MetricsCollector } from "../shared/metrics";

const metrics = new MetricsCollector();
const PORT = 3001;

const server = Bun.serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    const startTime = Date.now();

    if (url.pathname === "/") {
      return new Response("Bun HTTP Server - Hello!", {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      });
    }

    if (url.pathname === "/echo") {
      return req.json().then((body) => {
        const duration = Date.now() - startTime;
        metrics.recordRequest(duration);
        return Response.json(body);
      });
    }

    if (url.pathname === "/metrics") {
      return Response.json({
        server: "bun",
        ...metrics.getMetrics(),
      });
    }

    if (url.pathname === "/reset") {
      metrics.reset();
      return Response.json({ status: "reset" });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Bun HTTP server running at http://localhost:${PORT}`);
