import { promises as fs } from "fs";
import path from "path";
import mysql from "mysql2/promise";

export async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    console.log("[Migrations] No DATABASE_URL set, skipping migrations");
    return;
  }

  const dbUrl = process.env.DATABASE_URL.replace(/\?.*$/, '');

  try {
    console.log("[Migrations] Starting database migrations...");

    // Create a connection to run migrations
    const connection = await mysql.createConnection({
      uri: dbUrl,
      ssl: { rejectUnauthorized: false },
    });

    // Read and execute migration files in order
    const migrationsDir = path.join(process.cwd(), "drizzle", "migrations");
    const files = await fs.readdir(migrationsDir);
    const sqlFiles = files
      .filter(f => f.endsWith(".sql") && f.startsWith("000"))
      .sort();

    for (const file of sqlFiles) {
      const filePath = path.join(migrationsDir, file);
      const sql = await fs.readFile(filePath, "utf-8");

      // Split by statement-breakpoint and execute each statement
      const statements = sql
        .split("--> statement-breakpoint")
        .map(s => s.trim())
        .filter(s => s.length > 0);

      console.log(`[Migrations] Running ${file} (${statements.length} statements)...`);

      for (const statement of statements) {
        try {
          await connection.query(statement);
        } catch (err: any) {
          // Ignore table already exists errors
          if (err?.code === "ER_TABLE_EXISTS_ERROR") {
            continue;
          }
          throw err;
        }
      }

      console.log(`[Migrations] ✓ Completed ${file}`);
    }

    await connection.end();
    console.log("[Migrations] All migrations completed successfully");
  } catch (err) {
    console.error("[Migrations] Failed:", err);
    throw err;
  }
}
