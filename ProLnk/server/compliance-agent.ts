/**
 * Compliance Monitor Agent (AGaaS Agent #5)
 * Runs daily to:
 * 1. Detect COI (Certificate of Insurance) expiring within 30 days → alert partner + admin
 * 2. Detect COI already expired → auto-flag partner, suspend after 7-day grace period
 * 3. Detect background check older than 2 years → alert partner + admin
 * 4. Detect license expiry within 30 days → alert partner + admin
 * 5. Send daily compliance digest to admin
 * 6. Reset weekly lead caps every Monday
 */

import { getDb } from "./db";
import { sql } from "drizzle-orm";
import { notifyOwner } from "./_core/notification";
// SMS is handled inline via fetch to Twilio if creds exist
import { pushNetworkAlert } from "./_core/push";

export interface ComplianceScanResult {
  coiExpiringSoon: number;
  coiExpired: number;
  backgroundCheckStale: number;
  licenseExpiringSoon: number;
  autoSuspended: number;
  weeklyCapReset: number;
  errors: string[];
}

/**
 * Main compliance sweep — called nightly
 */
export async function runComplianceScan(): Promise<ComplianceScanResult> {
  const result: ComplianceScanResult = {
    coiExpiringSoon: 0,
    coiExpired: 0,
    backgroundCheckStale: 0,
    licenseExpiringSoon: 0,
    autoSuspended: 0,
    weeklyCapReset: 0,
    errors: [],
  };

  const db = await getDb();
  if (!db) {
    result.errors.push("Database unavailable");
    return result;
  }

  const now = new Date();
  const in30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const twoYearsAgo = new Date(now.getTime() - 2 * 365 * 24 * 60 * 60 * 1000);

  // ── 1. COI expiring within 30 days ──────────────────────────────────────────
  try {
    const expiringSoon = await (db as any).execute(
      sql`SELECT id, businessName, contactEmail, contactPhone, coiExpiresAt
          FROM partners
          WHERE status = 'approved'
            AND coiExpiresAt IS NOT NULL
            AND coiExpiresAt > ${now}
            AND coiExpiresAt <= ${in30Days}
            AND suspendedAt IS NULL`
    );
    const rawExpiring = expiringSoon.rows ?? expiringSoon;
    const rows = Array.isArray(rawExpiring[0]) ? rawExpiring[0] : rawExpiring;
    for (const p of rows) {
      result.coiExpiringSoon++;
      const daysLeft = Math.ceil((new Date(p.coiExpiresAt).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      await createComplianceAlert(db, p.id, "coi_expiring_soon",
        `Your Certificate of Insurance expires in ${daysLeft} days (${new Date(p.coiExpiresAt).toLocaleDateString()}). Upload a renewed COI to avoid service interruption.`
      );
      // SMS alert via Twilio (when credentials are configured)
    }
  } catch (err) {
    result.errors.push(`COI expiry check: ${err instanceof Error ? err.message : String(err)}`);
  }

  // ── 2. COI already expired ───────────────────────────────────────────────────
  try {
    const expired = await (db as any).execute(
      sql`SELECT id, businessName, contactEmail, contactPhone, coiExpiresAt, suspendedAt
          FROM partners
          WHERE status = 'approved'
            AND coiExpiresAt IS NOT NULL
            AND coiExpiresAt < ${now}
            AND suspendedAt IS NULL`
    );
    const rawExpired = expired.rows ?? expired;
    const rows = Array.isArray(rawExpired[0]) ? rawExpired[0] : rawExpired;
    for (const p of rows) {
      result.coiExpired++;
      const daysExpired = Math.ceil((now.getTime() - new Date(p.coiExpiresAt).getTime()) / (1000 * 60 * 60 * 24));

      if (daysExpired > 7) {
        // Auto-suspend after 7-day grace period
        await (db as any).execute(
          sql`UPDATE partners SET suspendedAt = ${now}, suspensionReason = 'COI expired — auto-suspended by Compliance Agent' WHERE id = ${p.id}`
        );
        await createComplianceAlert(db, p.id, "auto_suspended",
          `Your account has been automatically suspended because your Certificate of Insurance expired ${daysExpired} days ago. Upload a valid COI to be reinstated.`
        );
        result.autoSuspended++;
        await notifyOwner({
          title: `⚠️ Partner Auto-Suspended: ${p.businessName}`,
          content: `Partner #${p.id} (${p.businessName}) was auto-suspended by the Compliance Agent. COI expired ${daysExpired} days ago.`,
        }).catch(() => {});
      } else {
        await createComplianceAlert(db, p.id, "coi_expired",
          `Your Certificate of Insurance expired ${daysExpired} day(s) ago. Upload a renewed COI within ${7 - daysExpired} days to avoid suspension.`
        );
      }
    }
  } catch (err) {
    result.errors.push(`COI expired check: ${err instanceof Error ? err.message : String(err)}`);
  }

  // ── 3. Background check older than 2 years ───────────────────────────────────
  try {
    const staleChecks = await (db as any).execute(
      sql`SELECT id, businessName, contactEmail, backgroundCheckVerifiedAt
          FROM partners
          WHERE status = 'approved'
            AND backgroundCheckVerifiedAt IS NOT NULL
            AND backgroundCheckVerifiedAt < ${twoYearsAgo}
            AND suspendedAt IS NULL`
    );
    const rawStale = staleChecks.rows ?? staleChecks;
    const rows = Array.isArray(rawStale[0]) ? rawStale[0] : rawStale;
    for (const p of rows) {
      result.backgroundCheckStale++;
      await createComplianceAlert(db, p.id, "background_check_stale",
        `Your background check is over 2 years old. Please complete a new background check to maintain your TrustyPro verification status.`
      );
    }
  } catch (err) {
    result.errors.push(`Background check check: ${err instanceof Error ? err.message : String(err)}`);
  }

  // ── 4. License expiring within 30 days ──────────────────────────────────────
  try {
    const licenseExpiring = await (db as any).execute(
      sql`SELECT id, businessName, contactEmail, licenseExpiresAt
          FROM partners
          WHERE status = 'approved'
            AND licenseExpiresAt IS NOT NULL
            AND licenseExpiresAt > ${now}
            AND licenseExpiresAt <= ${in30Days}
            AND suspendedAt IS NULL`
    );
    const rawLicense = licenseExpiring.rows ?? licenseExpiring;
    const licenseRows = Array.isArray(rawLicense[0]) ? rawLicense[0] : rawLicense;
    for (const p of licenseRows) {
      result.licenseExpiringSoon++;
      const daysLeft = Math.ceil((new Date(p.licenseExpiresAt).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      await createComplianceAlert(db, p.id, "license_expiring_soon",
        `Your contractor license expires in ${daysLeft} days (${new Date(p.licenseExpiresAt).toLocaleDateString()}). Upload a renewed license to avoid service interruption.`
      );
    }
  } catch (err) {
    result.errors.push(`License expiry check: ${err instanceof Error ? err.message : String(err)}`);
  }

  // ── 5. Reset weekly lead caps every Monday ───────────────────────────────────
  try {
    const dayOfWeek = now.getDay(); // 0=Sunday, 1=Monday
    if (dayOfWeek === 1) {
      const resetResult = await (db as any).execute(
        sql`UPDATE partners SET weeklyLeadsReceived = 0, weeklyLeadsResetAt = ${now} WHERE weeklyLeadsReceived > 0`
      );
      result.weeklyCapReset = resetResult.rowsAffected ?? 0;
      console.log(`[ComplianceAgent] Weekly lead caps reset for ${result.weeklyCapReset} partners`);
    }
  } catch (err) {
    result.errors.push(`Weekly cap reset: ${err instanceof Error ? err.message : String(err)}`);
  }

  // ── 6. Daily compliance digest to admin ─────────────────────────────────────
  const hasIssues = result.coiExpiringSoon > 0 || result.coiExpired > 0 || result.backgroundCheckStale > 0 || result.autoSuspended > 0;
  if (hasIssues) {
    await notifyOwner({
      title: "📋 Daily Compliance Report",
      content: [
        result.autoSuspended > 0 ? `🔴 ${result.autoSuspended} partner(s) auto-suspended (expired COI)` : null,
        result.coiExpired > 0 ? `🟠 ${result.coiExpired} partner(s) with expired COI (in grace period)` : null,
        result.coiExpiringSoon > 0 ? `🟡 ${result.coiExpiringSoon} partner(s) with COI expiring within 30 days` : null,
        result.backgroundCheckStale > 0 ? `🔵 ${result.backgroundCheckStale} partner(s) with stale background checks (>2 years)` : null,
      ].filter(Boolean).join("\n"),
    }).catch(() => {});
  }

  console.log(`[ComplianceAgent] Scan complete — COI expiring: ${result.coiExpiringSoon}, expired: ${result.coiExpired}, suspended: ${result.autoSuspended}, bg stale: ${result.backgroundCheckStale}`);
  return result;
}

/**
 * Create a compliance alert notification for a partner
 */
async function createComplianceAlert(db: any, partnerId: number, alertType: string, message: string): Promise<void> {
  try {
    await (db as any).execute(
      sql`INSERT INTO partnerNotifications (partnerId, type, title, message, actionUrl, isRead, createdAt)
          VALUES (${partnerId}, 'system', 'Compliance Alert', ${message}, '/dashboard/compliance', 0, ${new Date()})`
    );
  } catch (err) {
    console.warn(`[ComplianceAgent] Failed to create alert for partner ${partnerId}:`, err);
  }
}
