// Bun's built-in SQLite support - no install needed!
const db = new Bun.Database("demo.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
  )
`);

// Insert data
db.exec("INSERT INTO users (name, email) VALUES ('Alice', 'alice@bun.sh')");
db.exec("INSERT INTO users (name, email) VALUES ('Bob', 'bob@bun.sh')");

// Query data
const users = db.query("SELECT * FROM users").all();
console.log("Users:", users);

// Close database
db.close();

// Run with: bun run sqlite-demo.js