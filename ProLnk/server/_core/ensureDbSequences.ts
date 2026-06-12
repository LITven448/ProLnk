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

// Idempotent targeted schema fixes (Night 6 + day run). These run on EVERY boot,
// independent of the sequence-migration marker below, because new tweaks are added
// over time and must reach an already-migrated DB too. Each ALTER is cheap and the
// per-statement try/catch swallows "already exists" — so re-running is a no-op.
const SCHEMA_TWEAKS = [
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
  // homeWaitlist — Home Health Vault property enrichment captured at intake.
  "ALTER TABLE `homeWaitlist` ADD COLUMN `yearBuilt` INT NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `squareFootage` INT NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `lotSizeSqFt` INT NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `bedrooms` INT NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `bathrooms` VARCHAR(10) NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `stories` INT NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `garageSpaces` INT NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `hasPool` TINYINT(1) NULL DEFAULT 0",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `hasBasement` TINYINT(1) NULL DEFAULT 0",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `hasAttic` TINYINT(1) NULL DEFAULT 0",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `ownershipStatus` VARCHAR(255) NULL DEFAULT 'own'",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `yearsOwned` INT NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `overallCondition` TEXT NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `homeSystems` JSON NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `estimatedBudget` VARCHAR(50) NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `projectTimeline` VARCHAR(255) NULL DEFAULT 'just_exploring'",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `homeType` VARCHAR(50) NULL DEFAULT 'single_family'",
  // data_deletion_requests — CCPA/GDPR deletion requests recorded by
  // partnerAuth.requestAccountDeletion. RECORD-ONLY; deletion stays a manual admin action.
  "CREATE TABLE IF NOT EXISTS `data_deletion_requests` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `email` VARCHAR(255) NOT NULL, `reason` TEXT NULL, `status` VARCHAR(20) NOT NULL DEFAULT 'pending', `requestedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)",
  // commission_payout — HIGH drift: db.query.commissionPayout.findMany() in
  // commissions.getEarnings selects ALL declared cols; missing this column threw
  // "Unknown column 'stripe_transfer_id'" on the partner earnings page.
  "ALTER TABLE `commission_payout` ADD COLUMN `stripe_transfer_id` VARCHAR(255) NULL",
  // homeWaitlist — declared-but-missing intake fields (schema/prod parity).
  "ALTER TABLE `homeWaitlist` ADD COLUMN `isRental` TINYINT(1) NULL DEFAULT 0",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `companyName` VARCHAR(255) NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `companyEin` VARCHAR(20) NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `propertyManagerName` VARCHAR(255) NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `propertyManagerPhone` VARCHAR(30) NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `recentImprovements` JSON NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `homeStyle` VARCHAR(100) NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `exteriorColor` VARCHAR(100) NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `primaryPainPoint` VARCHAR(255) NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `hearAboutUs` VARCHAR(255) NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `additionalNotes` TEXT NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `consentSms` TINYINT(1) NULL DEFAULT 0",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `consentPush` TINYINT(1) NULL DEFAULT 0",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `consentMarketing` TINYINT(1) NULL DEFAULT 0",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `preferredContact` VARCHAR(20) NULL",
  "ALTER TABLE `homeWaitlist` ADD COLUMN `source` VARCHAR(100) NULL",
  // diagnosticAgent tables — declared in schema + a later (unapplied) embedded
  // migration, but missing on prod. The diagnosticAgent router queries them with
  // no lazy-create guard, so it would throw "table doesn't exist" once wired to UI.
  "CREATE TABLE IF NOT EXISTS `diagnosticSessions` (`id` int AUTO_INCREMENT NOT NULL, `homeownerId` int NOT NULL, `propertyAddress` varchar(500), `messages` json NOT NULL, `photoUrls` json, `diagnosis` text, `trade` varchar(100), `severity` enum('cosmetic','monitor','soon','urgent','emergency'), `scope` text, `recommendation` enum('diy','parts_only','pro_required','unknown'), `quoteMin` decimal(10,2), `quoteMax` decimal(10,2), `quoteMaterials` decimal(10,2), `quoteLabor` decimal(10,2), `quoteBreakdown` json, `status` enum('in_progress','completed','abandoned') NOT NULL DEFAULT 'in_progress', `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY(`id`))",
  "CREATE TABLE IF NOT EXISTS `homeProfiles` (`id` int AUTO_INCREMENT NOT NULL, `homeownerId` int NOT NULL, `propertyAddress` varchar(500) NOT NULL, `zipCode` varchar(10), `yearBuilt` int, `squareFootage` int, `bedrooms` int, `bathrooms` decimal(3,1), `hvacBrand` varchar(100), `hvacModel` varchar(100), `hvacYear` int, `hvacType` varchar(100), `hvacCondition` varchar(20) DEFAULT 'unknown', `hvacNotes` text, `roofMaterial` varchar(100), `roofYear` int, `roofCondition` varchar(20) DEFAULT 'unknown', `roofNotes` text, `waterHeaterBrand` varchar(100), `waterHeaterYear` int, `waterHeaterType` varchar(50) DEFAULT 'unknown', `waterHeaterFuel` varchar(50) DEFAULT 'unknown', `electricalPanelBrand` varchar(100), `electricalPanelAmps` int, `electricalPanelYear` int, `electricalCondition` varchar(20) DEFAULT 'unknown', `plumbingMaterial` varchar(100), `plumbingCondition` varchar(20) DEFAULT 'unknown', `flooringTypes` json, `appliances` json, `windowType` varchar(100), `windowCondition` varchar(20) DEFAULT 'unknown', `activeAlerts` json, `lastScannedAt` timestamp, `originatingPartnerId` int, `originationOverrideRate` decimal(5,4) DEFAULT '0.0500', `originationLockedAt` timestamp, `isDraft` boolean NOT NULL DEFAULT false, `draftOutreachSentAt` timestamp, `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY(`id`))",
  // Charter/partner homeowner-referral tracking: count of TrustyPro homeowners a
  // member referred (the pro `referralCount` tracks pro referrals only).
  "ALTER TABLE `proWaitlist` ADD COLUMN `homeownerReferralCount` INT NOT NULL DEFAULT 0",
  // primaryGoal stores `more_leads|<free-text notes>` (notes capped at 500); the
  // original varchar(100) overflowed and hard-failed live signups. Widen + nullable.
  "ALTER TABLE `proWaitlist` MODIFY COLUMN `primaryGoal` VARCHAR(1000) NULL",
];

async function applySchemaTweaks(db: any): Promise<void> {
  for (const s of SCHEMA_TWEAKS) {
    try { await (db as any).execute(sql.raw(s)); } catch { /* already applied */ }
  }
}

export async function ensureDbSequences(): Promise<void> {
  if (ran) return;
  ran = true;
  try {
    const db = await getDb();
    if (!db) return;

    // Targeted schema tweaks run EVERY boot (idempotent), even on a migrated DB —
    // this is what reaches prod when a new column is added to the list.
    await applySchemaTweaks(db);

    // Cheap marker: if seq_userPasswords already exists, the sequence migration is
    // done — skip the expensive 121-table pass (but tweaks above already ran).
    try {
      await (db as any).execute(sql`SELECT NEXTVAL(\`seq_userPasswords\`)`);
      return; // sequences already migrated
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

    console.log(`[ensureDbSequences] done — ${ok} tables sequenced.`);
  } catch (e: any) {
    console.warn("[ensureDbSequences] skipped:", e?.message ?? e);
  }
}
