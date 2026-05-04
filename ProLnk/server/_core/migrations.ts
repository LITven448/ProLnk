import mysql from "mysql2/promise";

export async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    console.log("[Migrations] No DATABASE_URL set, skipping migrations");
    return;
  }

  const dbUrl = process.env.DATABASE_URL.replace(/\?.*$/, '');

  let connection: any = null;
  try {
    console.log("[Migrations] Connecting to database for migrations...");

    // Create a connection to run migrations
    connection = await mysql.createConnection({
      uri: dbUrl,
      ssl: { rejectUnauthorized: false },
    });

    console.log("[Migrations] Connected. Checking if tables exist...");

    // Quick check - see if users table exists
    try {
      await connection.query("SELECT 1 FROM users LIMIT 1");
      console.log("[Migrations] Tables already exist, skipping migrations");
      return;
    } catch (e: any) {
      if (e?.code !== "ER_NO_SUCH_TABLE") {
        throw e;
      }
      // Table doesn't exist, proceed with migrations
    }

    console.log("[Migrations] Tables missing. Running migrations...");

    // Execute migrations with proper error handling
    const sqlStatements = await getMigrationStatements();

    let successCount = 0;
    for (let i = 0; i < sqlStatements.length; i++) {
      const stmt = sqlStatements[i];
      try {
        await connection.query(stmt);
        successCount++;
        if (i % 10 === 0) {
          console.log(`[Migrations] Progress: ${successCount}/${sqlStatements.length}`);
        }
      } catch (err: any) {
        // Skip table already exists errors
        if (err?.code === "ER_TABLE_EXISTS_ERROR" || err?.message?.includes("already exists")) {
          continue;
        }
        console.error(`[Migrations] Error on statement ${i}:`, err?.message);
        // Continue anyway - some errors are non-fatal
      }
    }

    console.log(`[Migrations] ✓ Completed ${successCount} statements`);
  } catch (err) {
    console.error("[Migrations] Fatal error:", err);
    // Don't throw - let app start anyway
  } finally {
    if (connection) {
      try {
        await connection.end();
      } catch (e) {
        // ignore
      }
    }
  }
}

async function getMigrationStatements(): Promise<string[]> {
  // Import the embedded migrations
  const { MIGRATION_0000, MIGRATION_0001 } = await import("./migrations-embedded");

  const allSql = [MIGRATION_0000, MIGRATION_0001].join("\n");

  // Split by statement-breakpoint and clean up
  return allSql
    .split("--> statement-breakpoint")
    .map(s => s.trim())
    .filter(s => s.length > 0 && s !== "");
}
