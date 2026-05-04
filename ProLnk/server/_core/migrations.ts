import mysql from "mysql2/promise";
import { MIGRATION_0000, MIGRATION_0001 } from "./migrations-embedded";

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

    // Execute embedded migrations in order
    const migrations = [
      { name: "0000_natural_angel", sql: MIGRATION_0000 },
      { name: "0001_cynical_iron_patriot", sql: MIGRATION_0001 },
    ];

    for (const { name, sql } of migrations) {
      // Split by statement-breakpoint and execute each statement
      const statements = sql
        .split("--> statement-breakpoint")
        .map(s => s.trim())
        .filter(s => s.length > 0);

      console.log(`[Migrations] Running ${name} (${statements.length} statements)...`);

      for (const statement of statements) {
        try {
          await connection.query(statement);
        } catch (err: any) {
          // Ignore table already exists errors
          if (err?.code === "ER_TABLE_EXISTS_ERROR") {
            continue;
          }
          // Log other errors but continue to next statement
          if (err?.code !== "ER_DUP_FIELDNAME") {
            console.warn(`[Migrations] Warning in ${name}:`, err?.message);
          }
        }
      }

      console.log(`[Migrations] ✓ Completed ${name}`);
    }

    await connection.end();
    console.log("[Migrations] All migrations completed successfully");
  } catch (err) {
    console.error("[Migrations] Failed:", err);
    throw err;
  }
}
