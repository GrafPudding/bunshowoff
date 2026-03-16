# Bun Hot Reload Showcase

## Hot Reload in Action

```bash
# Start the server with watch mode - auto-restarts on file changes!
bun --watch server.ts
```

## How to Test

1. Run: `bun --watch server.ts`
2. Server starts at `http://localhost:3000`
3. Make a request to see the response
4. Edit `server.ts` - change the message text
5. Save the file
6. Server auto-restarts instantly!
7. Make another request - see your changes without manual restart

## Why It's Fast

- Native file system watching (not polling)
- Instant restart (no JVM/Node startup time)
- Zero config - just add `--watch`

## Also Includes

- `.env` support - Bun reads `.env` automatically
- TypeScript support with hot reload
- Works with any `.js`, `.ts`, `.jsx`, `.tsx` files