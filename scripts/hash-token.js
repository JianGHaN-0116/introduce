const crypto = require("crypto");

const token = process.argv[2];

if (!token) {
  console.log("Usage: node scripts/hash-token.js <your-new-token>");
  console.log("");
  console.log("Example:");
  console.log("  node scripts/hash-token.js my-secret-token");
  process.exit(1);
}

const hash = crypto.createHash("sha256").update(token).digest("hex");

console.log("Token:  ", token);
console.log("SHA-256:", hash);
console.log("");
console.log("Set as environment variable:");
console.log(`  NEXT_PUBLIC_ADMIN_TOKEN_HASH=${hash}`);
