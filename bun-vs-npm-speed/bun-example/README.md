# Bun Example - Zero Dependencies!

This shows how Bun handles common tasks with built-in features.

## Install Dependencies

```bash
bun install
# Takes 1-5 seconds!
```

## Built-in Features Used

| Feature | Node.js | Bun |
|---------|---------|-----|
| HTTP Server | express | `Bun.serve()` |
| Environment | dotenv | Built-in |
| Logging | winston | `console.log` |
| Validation | joi | Plain JS |
| HTTP Client | axios | `fetch()` |
| Dates | moment | `Date` object |
| Utilities | lodash | Built-in methods |
| Testing | jest | `bun:test` |
| File Watching | nodemon | `--watch` |

## Run

```bash
bun run server.ts
# or with hot reload:
bun --watch server.ts
```

## Result

- **Node.js**: 26 packages, 30-120s install time
- **Bun**: 0 packages, 1-5s install time