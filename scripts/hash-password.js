const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.log("Usage: npm run hash-password <your-password>");
  console.log("");
  console.log("Example:");
  console.log("  npm run hash-password mySecret123");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);

console.log("Password:", password);
console.log("Hash:    ", hash);
console.log("");
console.log("Set these environment variables in Vercel:");
console.log(`  ADMIN_USERNAME=admin`);
console.log(`  ADMIN_PASSWORD_HASH=${hash}`);
console.log(`  JWT_SECRET=<any-random-string>`);
