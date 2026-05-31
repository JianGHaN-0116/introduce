const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const customToken = process.argv[2];

if (customToken === "--help" || customToken === "-h") {
  console.log("Usage:");
  console.log("  node scripts/generate-key.js              # Generate random key");
  console.log("  node scripts/generate-key.js my-password   # Use custom token");
  process.exit(0);
}

const token = customToken || crypto.randomBytes(32).toString("hex");
const hash = crypto.createHash("sha256").update(token).digest("hex");

const outputDir = path.join(__dirname, "..");
const keyFilePath = path.join(outputDir, "admin.key");

fs.writeFileSync(keyFilePath, token, "utf-8");

console.log("✅ Key file generated: admin.key");
console.log("");
if (!customToken) {
  console.log("Generated random token (saved to admin.key):");
  console.log(`  ${token}`);
} else {
  console.log("Custom token (saved to admin.key):");
  console.log(`  ${token}`);
}
console.log("");
console.log("SHA-256 hash (for env var or source code):");
console.log(`  ${hash}`);
console.log("");
console.log("Next steps:");
console.log("  1. Copy admin.key to your USB drive");
console.log("  2. Delete admin.key from this project (don't commit it!)");
console.log("  3. Set the hash as environment variable:");
console.log(`     NEXT_PUBLIC_ADMIN_TOKEN_HASH=${hash}`);
console.log("");
console.log("  Or update the default hash in src/app/admin/page.tsx");
