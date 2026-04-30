#!/usr/bin/env node
/**
 * Adds unique constraint on commissions(opportunityId, commissionType)
 * to prevent double-counting at the database level.
 * Run: node patches-bugs/add-commission-constraint.mjs
 */
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);
try {
  // Check if constraint already exists
  const [rows] = await conn.execute(`
    SELECT COUNT(*) as cnt FROM information_schema.statistics
    WHERE table_schema = DATABASE()
      AND table_name = 'commissions'
      AND index_name = 'idx_opp_type_unique'
  `);
  if (rows[0].cnt > 0) {
    console.log("✅ Constraint already exists — skipping");
  } else {
    await conn.execute(`
      ALTER TABLE commissions
      ADD UNIQUE INDEX idx_opp_type_unique (opportunityId, commissionType)
    `);
    console.log("✅ Added unique constraint on commissions(opportunityId, commissionType)");
  }
} catch (e) {
  console.error("❌ Error:", e.message);
} finally {
  await conn.end();
}
