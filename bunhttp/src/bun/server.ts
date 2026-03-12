import { MetricsCollector } from "../shared/metrics";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const metrics = new MetricsCollector();
const PORT = 3001;

const server = Bun.serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    const startTime = Date.now();

    if (url.pathname === "/") {
      const dashboardPath = join(__dirname, "../../dashboard/index.html");
      const duration = Date.now() - startTime;
      metrics.recordRequest(duration);
      return new Response(Bun.file(dashboardPath), {
        headers: { "Content-Type": "text/html" },
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
      }, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    if (url.pathname === "/reset") {
      metrics.reset();
      return Response.json({ status: "reset" });
    }

    const duration = Date.now() - startTime;
    metrics.recordRequest(duration);
    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Bun HTTP server running at http://localhost:${PORT}`);
