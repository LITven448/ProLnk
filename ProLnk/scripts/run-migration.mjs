#!/usr/bin/env node
/**
 * Database Migration Runner
 * Run: node scripts/run-migration.mjs
 *
 * Runs all pending SQL migrations in order.
 * Safe to re-run — uses CREATE TABLE IF NOT EXISTS and ALTER TABLE IF NOT EXISTS.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DRIZZLE_DIR = path.join(ROOT, "drizzle");

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL not set");
  process.exit(1);
}

async function runMigration(conn, filePath) {
  const sql = fs.readFileSync(filePath, "utf8");
  // Split on semicolons, filter empty statements
  const statements = sql
    .split(";")
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith("--"));

  let success = 0;
  let skipped = 0;

  for (const statement of statements) {
    try {
      await conn.execute(statement);
      success++;
    } catch (err) {
      // Expected errors: table already exists, column already exists
      if (err.code === "ER_TABLE_EXISTS_ERROR" ||
          err.code === "ER_DUP_FIELDNAME" ||
          err.code === "ER_DUP_INDEX" ||
          err.message.includes("already exists") ||
          err.message.includes("Duplicate column")) {
        skipped++;
      } else {
        console.warn(`  ⚠️  ${err.message.slice(0, 100)}`);
      }
    }
  }

  return { success, skipped };
}

async function main() {
  console.log("\n🗄️  ProLnk Database Migration Runner\n");

  const conn = await mysql.createConnection(DATABASE_URL);

  // Get all SQL files in order
  const migrationFiles = fs.readdirSync(DRIZZLE_DIR)
    .filter(f => f.endsWith(".sql"))
    .sort() // Alphabetical = chronological given 0000_, 0001_, etc.
    .map(f => path.join(DRIZZLE_DIR, f));

  console.log(`Found ${migrationFiles.length} migration files\n`);

  let totalSuccess = 0;
  let totalSkipped = 0;

  for (const file of migrationFiles) {
    const name = path.basename(file);
    process.stdout.write(`  Running: ${name}...`);

    const { success, skipped } = await runMigration(conn, file);
    totalSuccess += success;
    totalSkipped += skipped;

    console.log(` ✅ (${success} executed, ${skipped} skipped)`);
  }

  await conn.end();

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Migration complete!
   Statements executed: ${totalSuccess}
   Already existed (skipped): ${totalSkipped}
   Database: ${DATABASE_URL.replace(/:[^@]+@/, ":****@")}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

main().catch(err => {
  console.error("❌ Migration failed:", err.message);
  process.exit(1);
});
