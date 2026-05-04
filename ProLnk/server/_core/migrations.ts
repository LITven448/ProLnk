import mysql from "mysql2/promise";

export async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    console.log("[Migrations] No DATABASE_URL, skipping");
    return;
  }

  const dbUrl = process.env.DATABASE_URL.replace(/\?.*$/, '');
  let connection: any = null;

  try {
    console.log("[Migrations] Starting...");

    // Create connection with explicit timeouts
    connection = await Promise.race([
      mysql.createConnection({
        uri: dbUrl,
        ssl: { rejectUnauthorized: false },
        connectionTimeout: 10000,
        enableKeepAlive: true,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Migration connection timeout")), 15000)
      ),
    ]);

    console.log("[Migrations] Connected");

    // Check if tables exist
    try {
      await connection.query("SELECT 1 FROM `users` LIMIT 1");
      console.log("[Migrations] ✓ Tables exist, skipping");
      return;
    } catch (e: any) {
      if (e?.code !== "ER_NO_SUCH_TABLE") {
        throw e;
      }
    }

    console.log("[Migrations] Creating tables...");
    const statements = await getMigrationStatements();

    let count = 0;
    for (const stmt of statements) {
      try {
        await connection.query(stmt);
        count++;
      } catch (e: any) {
        if (e?.code !== "ER_TABLE_EXISTS_ERROR") {
          console.warn(`[Migrations] ${e?.code}: ${e?.message?.substring(0, 100)}`);
        }
      }
    }

    console.log(`[Migrations] ✓ ${count} statements executed`);
  } catch (err: any) {
    console.warn(`[Migrations] Skipped: ${err?.message}`);
  } finally {
    try {
      if (connection) await connection.end();
    } catch (e) {
      // ignore
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
