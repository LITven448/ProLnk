/**
 * Self-heal for the "no AUTO_INCREMENT on id" problem (Night 6).
 *
 * This TiDB instance has ~121 tables whose `id` column is an INT PRIMARY KEY with
 * NO auto_increment — so any INSERT that omits `id` fails. TiDB refuses to add
 * auto_increment to an existing column, so we attach a SEQUENCE as the column
 * DEFAULT (NEXTVAL) instead. This was applied to prod manually on 2026-06-04; this
 * function reproduces it idempotently so a rebuilt DB (or newly-created tables) is
 * self-healed on boot.
 *
 * Guarded by a cheap marker check (seq_userPasswords) so it does NOTHING on an
 * already-migrated DB. Never throws — boot must not depend on it.
 */
import { sql } from "drizzle-orm";
import { getDb } from "../db";

let ran = false;

export async function ensureDbSequences(): Promise<void> {
  if (ran) return;
  ran = true;
  try {
    const db = await getDb();
    if (!db) return;

    // Cheap marker: if seq_userPasswords already exists, assume migration done.
    try {
      await (db as any).execute(sql`SELECT NEXTVAL(\`seq_userPasswords\`)`);
      return; // already migrated
    } catch {
      // marker sequence missing -> run the migration
    }

    console.log("[ensureDbSequences] applying sequence-default ids (one-time)...");

    // All non-auto-increment INT id columns with a key.
    const colsRes: any = await (db as any).execute(sql`
      SELECT TABLE_NAME FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND COLUMN_NAME = 'id'
        AND EXTRA NOT LIKE '%auto_increment%'
        AND DATA_TYPE IN ('int','bigint') AND COLUMN_KEY <> ''
    `);
    const rows: any[] = Array.isArray(colsRes) && Array.isArray(colsRes[0]) ? colsRes[0]
      : Array.isArray(colsRes?.rows) ? colsRes.rows
      : Array.isArray(colsRes) ? colsRes : [];

    let ok = 0;
    for (const r of rows) {
      const t = r.TABLE_NAME as string;
      if (!t || !/^[A-Za-z0-9_]+$/.test(t)) continue; // identifier safety
      try {
        const mx: any = await (db as any).execute(sql.raw(`SELECT COALESCE(MAX(id),0)+1 AS n FROM \`${t}\``));
        const mrows: any[] = Array.isArray(mx) && Array.isArray(mx[0]) ? mx[0] : (mx?.rows ?? mx ?? []);
        const start = Number(mrows[0]?.n ?? 1) || 1;
        await (db as any).execute(sql.raw(`DROP SEQUENCE IF EXISTS \`seq_${t}\``));
        await (db as any).execute(sql.raw(`CREATE SEQUENCE \`seq_${t}\` START WITH ${start} NOCACHE`));
        await (db as any).execute(sql.raw(`ALTER TABLE \`${t}\` ALTER COLUMN \`id\` SET DEFAULT (NEXTVAL(\`seq_${t}\`))`));
        ok++;
      } catch (e: any) {
        console.warn(`[ensureDbSequences] ${t}: ${e?.message ?? e}`);
      }
    }

    // Targeted schema fixes also applied to prod (Night 6 + day run).
    const tweaks = [
      "ALTER TABLE `opportunities` MODIFY `jobId` int NULL",
      "ALTER TABLE `opportunities` MODIFY `sourcePartnerId` int NULL",
      "ALTER TABLE `opportunities` ADD COLUMN `siteType` VARCHAR(32) NULL DEFAULT 'residential'",
      "ALTER TABLE `partnerReviews` ADD COLUMN `replyText` TEXT NULL",
      "ALTER TABLE `partnerReviews` ADD COLUMN `repliedAt` TIMESTAMP NULL",
      // partners drifted from schema.ts — these 12 columns broke every full partner
      // select (completeJob, getConnectStatus, etc.). Re-apply idempotently.
      "ALTER TABLE `partners` ADD COLUMN `accountType` VARCHAR(20) NULL",
      "ALTER TABLE `partners` ADD COLUMN `businessLicenseNo` VARCHAR(100) NULL",
      "ALTER TABLE `partners` ADD COLUMN `staffVettingAttestedAt` TIMESTAMP NULL",
      "ALTER TABLE `partners` ADD COLUMN `newLead` TINYINT(1) NOT NULL DEFAULT 1",
      "ALTER TABLE `partners` ADD COLUMN `leadExpired` TINYINT(1) NOT NULL DEFAULT 1",
      "ALTER TABLE `partners` ADD COLUMN `commissionPaid` TINYINT(1) NOT NULL DEFAULT 1",
      "ALTER TABLE `partners` ADD COLUMN `tierUpgrade` TINYINT(1) NOT NULL DEFAULT 1",
      "ALTER TABLE `partners` ADD COLUMN `newReview` TINYINT(1) NOT NULL DEFAULT 1",
      "ALTER TABLE `partners` ADD COLUMN `broadcastMessages` TINYINT(1) NOT NULL DEFAULT 1",
      "ALTER TABLE `partners` ADD COLUMN `weeklyDigest` TINYINT(1) NOT NULL DEFAULT 1",
      "ALTER TABLE `partners` ADD COLUMN `emailEnabled` TINYINT(1) NOT NULL DEFAULT 1",
      "ALTER TABLE `partners` ADD COLUMN `smsEnabled` TINYINT(1) NOT NULL DEFAULT 1",
    ];
    for (const s of tweaks) {
      try { await (db as any).execute(sql.raw(s)); } catch { /* already applied */ }
    }

    console.log(`[ensureDbSequences] done — ${ok} tables sequenced.`);
  } catch (e: any) {
    console.warn("[ensureDbSequences] skipped:", e?.message ?? e);
  }
}
