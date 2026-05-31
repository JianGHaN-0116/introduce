const bcrypt = require("bcryptjs");
const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const DB_DIR = path.join(__dirname, "data");
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

const DB_PATH = path.join(DB_DIR, "admin.db");
const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

const username = process.argv[2];
const password = process.argv[3];

if (!username || !password) {
  console.log("Usage: node server/setup.js <username> <password>");
  console.log("");
  console.log("Example:");
  console.log("  node server/setup.js admin mypassword123");
  process.exit(1);
}

if (password.length < 6) {
  console.log("Error: Password must be at least 6 characters");
  process.exit(1);
}

const existing = db.prepare("SELECT id FROM users WHERE username = ?").get(username);
if (existing) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.prepare("UPDATE users SET password = ? WHERE username = ?").run(hashedPassword, username);
  console.log(`✅ Password updated for user "${username}"`);
} else {
  const hashedPassword = bcrypt.hashSync(password, 10);
  db.prepare("INSERT INTO users (username, password) VALUES (?, ?)").run(username, hashedPassword);
  console.log(`✅ User "${username}" created successfully`);
}

console.log(`   Database: ${DB_PATH}`);
