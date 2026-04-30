/**
 * Storm Lead Dispatch
 *
 * This is the missing link in the storm agent.
 * storm-agent.ts creates stormLeads records correctly but never dispatches them.
 * This module reads pending storm leads and dispatches them to partners.
 *
 * Call dispatchPendingStormLeads() at the end of runStormScan().
 */

import { getDb } from "./db";
import { sql } from "drizzle-orm";
import { dispatchLeadToPartner } from "./intake-router";
import { createPartnerNotification } from "./db";
import { aiHandled } from "./notify";

const STORM_TRADE_MAP: Record<string, string[]> = {
  roofing: ["roofing", "general_contractor"],
  tree_service: ["tree_service", "landscaping"],
  water_mitigation: ["water_mitigation", "restoration"],
  hvac: ["hvac", "hvac_maintenance"],
  fence_repair: ["fencing", "general_contractor"],
  plumbing: ["plumbing"],
  foundation: ["foundation"],
  generator: ["electrical", "generator"],
  general_contractor: ["general_contractor"],
};

function estimateStormJobValue(tradeCategory: string, severity: string): number {
  const BASE_VALUES: Record<string, number> = {
    roofing: 12000,
    tree_service: 2500,
    water_mitigation: 8000,
    hvac: 4000,
    fence_repair: 3500,
    plumbing: 2000,
    foundation: 8000,
    generator: 5000,
    general_contractor: 15000,
  };
  const base = BASE_VALUES[tradeCategory] ?? 3000;
  return severity === "Extreme" ? base * 1.5 : severity === "Severe" ? base * 1.2 : base;
}

export async function dispatchPendingStormLeads(options?: {
  stormEventId?: number;
  limit?: number;
}): Promise<{
  dispatched: number;
  skipped: number;
  errors: string[];
}> {
  const db = await getDb();
  if (!db) return { dispatched: 0, skipped: 0, errors: ["Database unavailable"] };

  const result = { dispatched: 0, skipped: 0, errors: [] as string[] };
  const limit = options?.limit ?? 100;

  try {
    // Get pending storm leads
    const whereClause = options?.stormEventId
      ? sql`sl.status = 'pending' AND sl.stormEventId = ${options.stormEventId}`
      : sql`sl.status = 'pending'`;

    const leadsRows = await (db as any).execute(sql`
      SELECT sl.*, se.eventType, se.severity, se.headline
      FROM stormLeads sl
      JOIN stormEvents se ON sl.stormEventId = se.id
      WHERE ${whereClause}
      ORDER BY se.severity DESC, sl.priority DESC, sl.id ASC
      LIMIT ${limit}
    `);
    const leads = leadsRows.rows || leadsRows;

    for (const lead of leads) {
      try {
        // Find matching partners by trade + ZIP
        const tradeTypes = STORM_TRADE_MAP[lead.tradeCategory] ?? [lead.tradeCategory];
        const tradeConditions = tradeTypes.map(t => `businessType LIKE '%${t}%'`).join(" OR ");

        const partnerRows = await (db as any).execute(
          sql.raw(`
            SELECT id, businessName, contactEmail, priorityScore, weeklyLeadsReceived, weeklyLeadCap
            FROM partners
            WHERE status = 'approved'
              AND (${tradeConditions})
              AND JSON_CONTAINS(serviceZipCodes, JSON_QUOTE('${lead.zip}'))
              AND (weeklyLeadCap = 0 OR weeklyLeadsReceived < weeklyLeadCap)
              AND suspendedAt IS NULL
            ORDER BY priorityScore DESC
            LIMIT 5
          `)
        );
        const partners = partnerRows.rows || partnerRows;

        if (!partners.length) {
          // No matching partner — mark as skipped
          await (db as any).execute(sql`
            UPDATE stormLeads SET status = 'no_partner', updatedAt = NOW() WHERE id = ${lead.id}
          `);
          result.skipped++;
          continue;
        }

        // Create a shell job for this storm lead
        const jobResult = await (db as any).execute(sql`
          INSERT INTO jobs (
            partnerId, serviceAddress, serviceType, notes,
            aiAnalysisStatus, status
          ) VALUES (
            ${partners[0].id},
            ${[lead.address, lead.city, lead.state, lead.zip].filter(Boolean).join(", ")},
            ${lead.tradeCategory},
            ${`[Storm Lead] ${lead.eventType} — ${lead.headline || "Severe weather damage inspection"}`},
            'complete', 'opportunities_sent'
          )
        `);
        const jobId = (jobResult.rows || jobResult).insertId ?? jobResult.insertId;

        // Create opportunity
        const estimatedValue = estimateStormJobValue(lead.tradeCategory, lead.severity);
        const oppResult = await (db as any).execute(sql`
          INSERT INTO opportunities (
            jobId, sourcePartnerId, opportunityType, opportunityCategory,
            description, aiConfidence, adminReviewStatus, status,
            estimatedJobValue, routingPosition,
            routingQueue
          ) VALUES (
            ${jobId}, ${partners[0].id}, ${lead.tradeCategory}, ${lead.tradeCategory},
            ${`Storm damage ${lead.tradeCategory} inspection at ${lead.address}. ${lead.eventType}: ${lead.headline || "severe weather event"}.`},
            0.90, 'approved', 'pending',
            ${estimatedValue}, 0,
            ${JSON.stringify(partners.map((p: any) => p.id))}
          )
        `);
        const oppId = (oppResult.rows || oppResult).insertId ?? oppResult.insertId;

        // Dispatch to top partner
        await dispatchLeadToPartner(oppId, partners[0].id, 0);

        // Update storm lead as dispatched
        await (db as any).execute(sql`
          UPDATE stormLeads SET
            status = 'dispatched',
            opportunityId = ${oppId},
            dispatchedPartnerId = ${partners[0].id},
            dispatchedAt = NOW()
          WHERE id = ${lead.id}
        `);

        result.dispatched++;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        result.errors.push(`Storm lead ${lead.id}: ${msg}`);
        result.skipped++;
      }
    }

    aiHandled(
      `Storm Lead Dispatch Complete`,
      `${result.dispatched} leads dispatched, ${result.skipped} skipped, ${result.errors.length} errors`,
      "storm"
    );
  } catch (err) {
    result.errors.push(`Global error: ${err instanceof Error ? err.message : String(err)}`);
  }

  console.log(`[StormDispatch] ${result.dispatched} dispatched, ${result.skipped} skipped, ${result.errors.length} errors`);
  return result;
}
