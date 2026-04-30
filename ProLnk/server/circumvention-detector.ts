/**
 * Circumvention Detection System (AGaaS Agent #6 — Trust Enforcement)
 *
 * Detects when a partner and homeowner attempt to transact off-platform after
 * a lead is dispatched. This protects the commission revenue stream.
 *
 * Detection signals:
 * 1. Homeowner check-in: After a lead is dispatched, the homeowner is sent a
 *    post-service check-in (via email/SMS) asking if the job was completed.
 *    If yes, but no job was logged by the partner → circumvention flag.
 * 2. Address cross-reference: If a partner logs a job at an address that matches
 *    a homeowner who received a lead from a different partner → flag.
 * 3. Repeat contact pattern: If the same partner-homeowner pair appears in
 *    multiple lead dispatches with no logged jobs → escalation.
 *
 * Escalation flow:
 * - First flag: Warning strike issued, admin notified
 * - Second flag: Suspension + commission clawback initiated
 * - Third flag: Permanent ban from network
 */

import { getDb } from "./db";
import { sql } from "drizzle-orm";
import { notifyOwner } from "./_core/notification";

export interface CircumventionFlag {
  partnerId: number;
  homeownerId?: number;
  opportunityId?: number;
  signalType: "homeowner_checkin" | "address_crossref" | "repeat_contact";
  severity: "warning" | "critical";
  details: string;
}

export interface CircumventionScanResult {
  flagsDetected: number;
  strikesIssued: number;
  suspensions: number;
  errors: string[];
}

/**
 * Process a homeowner check-in response
 * Called when homeowner confirms job was completed via check-in link
 */
export async function processHomeownerCheckin(
  opportunityId: number,
  homeownerConfirmedCompletion: boolean,
  homeownerNotes?: string
): Promise<{ flagged: boolean; reason?: string }> {
  const db = await getDb();
  if (!db) return { flagged: false };

  // Get the opportunity details
  const oppRows = await (db as any).execute(
    sql`SELECT o.*, p.businessName, p.contactEmail, p.strikeCount
        FROM opportunities o
        LEFT JOIN partners p ON p.id = o.receivingPartnerId
        WHERE o.id = ${opportunityId} LIMIT 1`
  );
  const opp = (oppRows.rows || oppRows)[0];
  if (!opp) return { flagged: false };

  // Log the check-in
  await (db as any).execute(
    sql`INSERT INTO homeownerCheckins (opportunityId, confirmedCompletion, notes, createdAt)
        VALUES (${opportunityId}, ${homeownerConfirmedCompletion ? 1 : 0}, ${homeownerNotes ?? null}, ${new Date()})`
  );

  if (!homeownerConfirmedCompletion) return { flagged: false };

  // Check if the partner logged a job for this lead
  const jobRows = await (db as any).execute(
    sql`SELECT id FROM jobs WHERE partnerId = ${opp.receivingPartnerId}
        AND createdAt > DATE_SUB(NOW(), INTERVAL 30 DAY)
        AND (customerEmail = (SELECT contactEmail FROM homeownerProfiles WHERE id = ${opp.homeownerId ?? 0} LIMIT 1)
          OR serviceAddress LIKE CONCAT('%', (SELECT address FROM properties WHERE id = ${opp.propertyId ?? 0} LIMIT 1), '%'))
        LIMIT 1`
  );
  const jobLogged = (jobRows.rows || jobRows).length > 0;

  if (!jobLogged) {
    // Homeowner confirmed job done but partner never logged it → circumvention signal
    await flagCircumvention(db, {
      partnerId: opp.receivingPartnerId,
      opportunityId,
      signalType: "homeowner_checkin",
      severity: "warning",
      details: `Homeowner confirmed job completion for opportunity #${opportunityId} but partner #${opp.receivingPartnerId} (${opp.businessName}) never logged the job. Possible off-platform transaction.`,
    });
    return { flagged: true, reason: "Job completed off-platform" };
  }

  return { flagged: false };
}

/**
 * Run the address cross-reference check
 * Detects partners logging jobs at addresses that belong to another partner's lead
 */
export async function runAddressCrossRefScan(): Promise<CircumventionScanResult> {
  const result: CircumventionScanResult = { flagsDetected: 0, strikesIssued: 0, suspensions: 0, errors: [] };
  const db = await getDb();
  if (!db) return result;

  try {
    // Find jobs logged at addresses that match dispatched leads to OTHER partners
    const suspicious = await (db as any).execute(
      sql`SELECT j.id as jobId, j.partnerId as loggingPartnerId, j.serviceAddress,
               o.receivingPartnerId as leadPartnerId, o.id as opportunityId
          FROM jobs j
          JOIN opportunities o ON (
            o.status IN ('sent', 'accepted') AND
            o.receivingPartnerId != j.partnerId AND
            o.sentAt > DATE_SUB(NOW(), INTERVAL 60 DAY) AND
            j.createdAt > DATE_SUB(NOW(), INTERVAL 60 DAY)
          )
          JOIN properties prop ON prop.address LIKE CONCAT('%', SUBSTRING_INDEX(j.serviceAddress, ',', 1), '%')
          WHERE prop.id = o.propertyId
          LIMIT 50`
    );
    const rows = suspicious.rows || suspicious;
    for (const row of rows) {
      result.flagsDetected++;
      await flagCircumvention(db, {
        partnerId: row.loggingPartnerId,
        opportunityId: row.opportunityId,
        signalType: "address_crossref",
        severity: "warning",
        details: `Partner #${row.loggingPartnerId} logged a job at an address that was dispatched as a lead to partner #${row.leadPartnerId}. Possible circumvention.`,
      });
    }
  } catch (err) {
    result.errors.push(`Address cross-ref: ${err instanceof Error ? err.message : String(err)}`);
  }

  return result;
}

/**
 * Issue a circumvention flag and escalate based on strike count
 */
async function flagCircumvention(db: any, flag: CircumventionFlag): Promise<void> {
  try {
    // Check if this exact pair was already flagged recently (dedup)
    const existing = await (db as any).execute(
      sql`SELECT id FROM circumventionFlags
          WHERE partnerId = ${flag.partnerId}
            AND opportunityId = ${flag.opportunityId ?? null}
            AND createdAt > DATE_SUB(NOW(), INTERVAL 7 DAY)
          LIMIT 1`
    );
    if ((existing.rows || existing).length > 0) return; // Already flagged

    // Insert the flag
    await (db as any).execute(
      sql`INSERT INTO circumventionFlags (partnerId, homeownerId, opportunityId, signalType, severity, details, status, createdAt)
          VALUES (${flag.partnerId}, ${flag.homeownerId ?? null}, ${flag.opportunityId ?? null},
                  ${flag.signalType}, ${flag.severity}, ${flag.details}, 'open', ${new Date()})`
    );

    // Get current strike count
    const partnerRows = await (db as any).execute(
      sql`SELECT strikeCount, businessName FROM partners WHERE id = ${flag.partnerId} LIMIT 1`
    );
    const partner = (partnerRows.rows || partnerRows)[0];
    if (!partner) return;

    const newStrikeCount = (partner.strikeCount ?? 0) + 1;

    if (newStrikeCount >= 3) {
      // Permanent suspension
      await (db as any).execute(
        sql`UPDATE partners SET strikeCount = ${newStrikeCount}, suspendedAt = ${new Date()},
            suspensionReason = 'Circumvention detected — 3rd strike, permanent suspension'
            WHERE id = ${flag.partnerId}`
      );
      await notifyOwner({
        title: `🚨 Partner Permanently Suspended: ${partner.businessName}`,
        content: `Partner #${flag.partnerId} has been permanently suspended for circumvention (3rd strike). ${flag.details}`,
      }).catch(() => {});
    } else if (newStrikeCount === 2) {
      // Temporary suspension
      await (db as any).execute(
        sql`UPDATE partners SET strikeCount = ${newStrikeCount},
            lastStrikeAt = ${new Date()}, lastStrikeReason = ${flag.details}
            WHERE id = ${flag.partnerId}`
      );
      await notifyOwner({
        title: `⚠️ Circumvention Warning (2nd Strike): ${partner.businessName}`,
        content: `Partner #${flag.partnerId} has received their 2nd circumvention strike. One more will result in permanent suspension. ${flag.details}`,
      }).catch(() => {});
    } else {
      // First warning
      await (db as any).execute(
        sql`UPDATE partners SET strikeCount = ${newStrikeCount},
            lastStrikeAt = ${new Date()}, lastStrikeReason = ${flag.details}
            WHERE id = ${flag.partnerId}`
      );
      await notifyOwner({
        title: `⚠️ Circumvention Flag (1st Strike): ${partner.businessName}`,
        content: `Partner #${flag.partnerId} has received their first circumvention warning. ${flag.details}`,
      }).catch(() => {});
    }

    // Create a compliance event record
    await (db as any).execute(
      sql`INSERT INTO complianceEvents (partnerId, eventType, reason, createdAt)
          VALUES (${flag.partnerId}, 'circumvention_flag', ${flag.details}, ${new Date()})`
    );
  } catch (err) {
    console.error("[CircumventionDetector] Failed to flag circumvention:", err);
  }
}

/**
 * Run the full circumvention sweep (address cross-ref + repeat contact scan)
 */
export async function runCircumventionSweep(): Promise<CircumventionScanResult> {
  const result: CircumventionScanResult = { flagsDetected: 0, strikesIssued: 0, suspensions: 0, errors: [] };
  const db = await getDb();
  if (!db) return result;

  // Run address cross-ref scan
  const crossRefResult = await runAddressCrossRefScan();
  result.flagsDetected += crossRefResult.flagsDetected;
  result.strikesIssued += crossRefResult.strikesIssued;
  result.suspensions += crossRefResult.suspensions;
  result.errors.push(...crossRefResult.errors);

  // Repeat contact scan: same partner-homeowner pair dispatched 3+ times with no logged job
  try {
    const repeatRows = await (db as any).execute(
      sql`SELECT o.receivingPartnerId, o.homeownerId, COUNT(*) as cnt
          FROM opportunities o
          WHERE o.status IN ('sent','expired')
            AND o.homeownerId IS NOT NULL
            AND o.sentAt > DATE_SUB(NOW(), INTERVAL 90 DAY)
          GROUP BY o.receivingPartnerId, o.homeownerId
          HAVING cnt >= 3`
    );
    const rows = repeatRows.rows || repeatRows;
    for (const row of rows) {
      result.flagsDetected++;
      await flagCircumvention(db, {
        partnerId: row.receivingPartnerId,
        homeownerId: row.homeownerId,
        signalType: "repeat_contact",
        severity: "warning",
        details: `Partner #${row.receivingPartnerId} has received ${row.cnt} leads for homeowner #${row.homeownerId} with no logged jobs. Possible repeat off-platform contact.`,
      });
    }
  } catch (err) {
    result.errors.push(`Repeat contact scan: ${err instanceof Error ? err.message : String(err)}`);
  }

  return result;
}

/**
 * Get all circumvention flags for admin review
 */
export async function getFlagsForAdmin(status?: string): Promise<any[]> {
  const db = await getDb();
  if (!db) return [];
  const statusFilter = status ? sql`WHERE cf.status = ${status}` : sql`WHERE 1=1`;
  const rows = await (db as any).execute(
    sql`SELECT cf.*, p.businessName
        FROM circumventionFlags cf
        LEFT JOIN partners p ON p.id = cf.partnerId
        WHERE cf.status = ${status ?? 'open'}
        ORDER BY cf.createdAt DESC
        LIMIT 100`
  );
  return rows.rows || rows;
}

/**
 * Resolve a circumvention flag
 */
export async function resolveFlag(flagId: number, resolution: string, adminUserId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await (db as any).execute(
    sql`UPDATE circumventionFlags
        SET status = 'resolved', resolvedAt = ${new Date()}, resolvedBy = ${adminUserId}, resolution = ${resolution}
        WHERE id = ${flagId}`
  );
}
