# Bun vs NPM vs Node - Speed Comparison

## The Problem: Heavy Dependencies

To build a simple API with common features, Node.js requires **30+ packages**:

```json
// Node.js requires these external packages:
- express (HTTP server)
- lodash (utilities)
- axios (HTTP client)
- moment (dates)
- dotenv (env vars)
- cors (CORS)
- helmet (security headers)
- morgan (logging)
- body-parser (parsing)
- compression (gzip)
- sequelize + mysql2 (database)
- redis (caching)
- ws + socket.io (WebSocket)
- bcrypt (hashing)
- jsonwebtoken (auth)
- multer (file uploads)
- joi (validation)
- winston (logging)
- sharp (image processing)
- puppeteer (headless browser)
- cheerio (scraping)
- node-cron (scheduling)
- nodemailer (email)
- jest + ts-node + nodemon + eslint + prettier (dev tools)
```

## Installation Time Comparison

```bash
# Node.js / NPM - takes 30-120+ seconds
time npm install

# Bun - takes 2-10 seconds
time bun install
```

## Side-by-Side Comparison

| Feature | Node.js (npm) | Bun (native) |
|---------|---------------|--------------|
| HTTP Server | express | Bun.serve() |
| Testing | jest | bun:test |
| TypeScript | ts-node + typescript | Built-in |
| Date/Time | moment, date-fns | Date built-ins |
| Environment | dotenv | Built-in |
| File Watching | nodemon | --watch |
| Validation | joi, zod | None needed |
| Logging | winston | console |
| Database | sequelize, typeorm | Bun.sqlite() |
| HTTP Client | axios, node-fetch | fetch() |
| Package Manager | npm, yarn | bun |
| Hot Reload | nodemon | --watch |

## See It In Action

- `node-example/` - How Node.js does it with 30+ packages
- `bun-example/` - Same thing with Bun's built-in features