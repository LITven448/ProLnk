/**
 * FSM-to-Vault Consent Bridge Router
 *
 * Handles the full flow:
 * 1. Pro connects FSM → trigger sync (queued/simulated for now, real API calls in Phase 2)
 * 2. Homeowner verifies address → check for matching FSM job records
 * 3. Homeowner consents → records populate their Home Health Vault
 */
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq, and, sql, desc, inArray } from "drizzle-orm";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getDb, getPartnerByUserId } from "../db";
import {
  fsmJobRecords,
  vaultImportConsents,
  fsmSyncJobs,
  partnerIntegrations,
  homeHealthVaultEntries,
  homeMaintenanceLogs,
} from "../../drizzle/schema";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Normalize an address for fuzzy matching: lowercase, remove punctuation, collapse spaces */
function normalizeAddress(addr: string): string {
  return addr
    .toLowerCase()
    .replace(/[.,#\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Map FSM trade category to vault component name */
function tradeCategoryToComponent(trade: string | null): string {
  if (!trade) return "Home Service";
  const t = trade.toLowerCase();
  if (t.includes("hvac") || t.includes("heat") || t.includes("cool") || t.includes("air")) return "HVAC System";
  if (t.includes("roof")) return "Roof";
  if (t.includes("plumb")) return "Plumbing";
  if (t.includes("electric")) return "Electrical";
  if (t.includes("paint")) return "Interior/Exterior Paint";
  if (t.includes("floor")) return "Flooring";
  if (t.includes("window")) return "Windows";
  if (t.includes("door")) return "Doors";
  if (t.includes("landscap") || t.includes("lawn")) return "Landscaping";
  if (t.includes("pest") || t.includes("termite")) return "Pest Control";
  if (t.includes("clean")) return "Cleaning Service";
  if (t.includes("garage")) return "Garage";
  if (t.includes("pool")) return "Pool/Spa";
  if (t.includes("fence")) return "Fencing";
  if (t.includes("gutter")) return "Gutters";
  if (t.includes("insul")) return "Insulation";
  if (t.includes("appli")) return "Appliances";
  return "Home Service";
}

// ─── Router ──────────────────────────────────────────────────────────────────

export const fsmVaultRouter = router({
  // ─── PRO SIDE ──────────────────────────────────────────────────────────────

  /**
   * Called after a pro connects an FSM integration.
   * Creates a sync job record and seeds demo/mock job records for the integration.
   * In production this would queue a real API call to the FSM platform.
   */
  triggerSync: protectedProcedure
    .input(
      z.object({
        integrationId: z.number(),
        source: z.enum(["companycam", "jobber", "housecall_pro", "servicetitan", "field_app"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) throw new TRPCError({ code: "NOT_FOUND", message: "Partner profile not found" });

      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Create a sync job record
      await db.insert(fsmSyncJobs).values({
        integrationId: input.integrationId,
        partnerId: partner.id,
        status: "queued",
        startedAt: new Date(),
      });

      // In production: queue a background job to call the FSM API
      // For now: mark as completed (real sync happens via webhook or scheduled job)
      await db
        .update(fsmSyncJobs)
        .set({ status: "completed", completedAt: new Date(), jobsFound: 0, jobsImported: 0 })
        .where(
          and(
            eq(fsmSyncJobs.integrationId, input.integrationId),
            eq(fsmSyncJobs.partnerId, partner.id)
          )
        );

      return { success: true, message: "Sync queued. Job records will appear as they are processed." };
    }),

  /**
   * Manually seed FSM job records for a partner (used when partner uploads
   * a CSV export from their FSM or enters past jobs manually).
   * Also used internally when real API sync runs.
   */
  seedJobRecords: protectedProcedure
    .input(
      z.object({
        integrationId: z.number(),
        source: z.enum(["companycam", "jobber", "housecall_pro", "servicetitan", "field_app", "manual"]),
        jobs: z.array(
          z.object({
            externalJobId: z.string(),
            serviceAddress: z.string().min(5),
            city: z.string().optional(),
            state: z.string().optional(),
            zipCode: z.string().optional(),
            jobTitle: z.string().optional(),
            tradeCategory: z.string().optional(),
            description: z.string().optional(),
            completedAt: z.string().optional(), // ISO date string
            photoUrls: z.array(z.string().url()).optional(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) throw new TRPCError({ code: "NOT_FOUND", message: "Partner profile not found" });

      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      let imported = 0;
      let skipped = 0;

      for (const job of input.jobs) {
        // Check for duplicate by externalJobId + integrationId
        const existing = await db
          .select({ id: fsmJobRecords.id })
          .from(fsmJobRecords)
          .where(
            and(
              eq(fsmJobRecords.externalJobId, job.externalJobId),
              eq(fsmJobRecords.integrationId, input.integrationId)
            )
          )
          .limit(1);

        if (existing.length > 0) {
          skipped++;
          continue;
        }

        const normalized = normalizeAddress(job.serviceAddress);
        await db.insert(fsmJobRecords).values({
          partnerId: partner.id,
          integrationId: input.integrationId,
          externalJobId: job.externalJobId,
          source: input.source,
          serviceAddress: job.serviceAddress,
          serviceAddressNormalized: normalized,
          city: job.city ?? null,
          state: job.state ?? null,
          zipCode: job.zipCode ?? null,
          jobTitle: job.jobTitle ?? null,
          tradeCategory: job.tradeCategory ?? null,
          description: job.description ?? null,
          completedAt: job.completedAt ? new Date(job.completedAt) : null,
          photoUrls: job.photoUrls ?? [],
          photoCount: job.photoUrls?.length ?? 0,
          importStatus: "pending",
        });
        imported++;
      }

      return { success: true, imported, skipped };
    }),

  /** Get sync history for the current partner */
  getSyncHistory: protectedProcedure.query(async ({ ctx }) => {
    const partner = await getPartnerByUserId(ctx.user.id);
    if (!partner) return [];
    const db = await getDb();
    if (!db) return [];
    return db
      .select()
      .from(fsmSyncJobs)
      .where(eq(fsmSyncJobs.partnerId, partner.id))
      .orderBy(desc(fsmSyncJobs.createdAt))
      .limit(20);
  }),

  // ─── HOMEOWNER SIDE ────────────────────────────────────────────────────────

  /**
   * Check if there are any pending FSM job records matching the homeowner's
   * verified address. Returns records that haven't been claimed or declined yet.
   */
  checkAddressForRecords: protectedProcedure
    .input(
      z.object({
        serviceAddress: z.string().min(5),
      })
    )
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return { records: [], count: 0 };

      const normalized = normalizeAddress(input.serviceAddress);

      // Fuzzy match: normalized address contains the key parts
      // Use SQL LIKE for partial matching on normalized address
      const records = await db
        .select({
          id: fsmJobRecords.id,
          source: fsmJobRecords.source,
          jobTitle: fsmJobRecords.jobTitle,
          tradeCategory: fsmJobRecords.tradeCategory,
          description: fsmJobRecords.description,
          completedAt: fsmJobRecords.completedAt,
          photoCount: fsmJobRecords.photoCount,
          photoUrls: fsmJobRecords.photoUrls,
          serviceAddress: fsmJobRecords.serviceAddress,
        })
        .from(fsmJobRecords)
        .where(
          and(
            eq(fsmJobRecords.importStatus, "pending"),
            sql`${fsmJobRecords.serviceAddressNormalized} LIKE ${`%${normalized.substring(0, 20)}%`}`
          )
        )
        .limit(20);

      return { records, count: records.length };
    }),

  /**
   * Get pending FSM records for the homeowner's primary property address.
   * Uses the homeowner's saved property address automatically.
   */
  getPendingForMyHome: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { records: [], count: 0 };

    // Get homeowner profile and primary property address
    const profileRows = await db.execute(
      sql`SELECT id FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
    ) as any;
    const profileId = profileRows[0]?.[0]?.id ?? profileRows[0]?.id;
    if (!profileId) return { records: [], count: 0 };

    const propRows = await db.execute(
      sql`SELECT address, city, state, zipCode FROM properties WHERE ownerId = ${profileId} AND isPrimary = 1 LIMIT 1`
    ) as any;
    const prop = propRows[0]?.[0] ?? propRows[0];
    if (!prop?.address) return { records: [], count: 0 };

    const fullAddress = [prop.address, prop.city, prop.state, prop.zipCode].filter(Boolean).join(", ");
    const normalized = normalizeAddress(fullAddress);
    const searchKey = normalized.substring(0, 25); // first 25 chars of normalized address

    const records = await db
      .select({
        id: fsmJobRecords.id,
        source: fsmJobRecords.source,
        jobTitle: fsmJobRecords.jobTitle,
        tradeCategory: fsmJobRecords.tradeCategory,
        description: fsmJobRecords.description,
        completedAt: fsmJobRecords.completedAt,
        photoCount: fsmJobRecords.photoCount,
        photoUrls: fsmJobRecords.photoUrls,
        serviceAddress: fsmJobRecords.serviceAddress,
      })
      .from(fsmJobRecords)
      .where(
        and(
          eq(fsmJobRecords.importStatus, "pending"),
          sql`${fsmJobRecords.serviceAddressNormalized} LIKE ${`%${searchKey}%`}`
        )
      )
      .limit(20);

    return { records, count: records.length, profileId };
  }),

  /**
   * Homeowner accepts or declines individual FSM job records.
   * Accepted records are added to the Home Health Vault as maintenance log entries.
   */
  respondToRecords: protectedProcedure
    .input(
      z.object({
        decisions: z.array(
          z.object({
            recordId: z.number(),
            decision: z.enum(["accepted", "declined"]),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Get homeowner profile
      const profileRows = await db.execute(
        sql`SELECT id FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
      ) as any;
      const profileId = profileRows[0]?.[0]?.id ?? profileRows[0]?.id;
      if (!profileId) throw new TRPCError({ code: "NOT_FOUND", message: "Homeowner profile not found" });

      // Get primary property
      const propRows = await db.execute(
        sql`SELECT id FROM properties WHERE ownerId = ${profileId} AND isPrimary = 1 LIMIT 1`
      ) as any;
      const propertyId = propRows[0]?.[0]?.id ?? propRows[0]?.id ?? null;

      let accepted = 0;
      let declined = 0;

      for (const { recordId, decision } of input.decisions) {
        // Get the FSM record
        const records = await db
          .select()
          .from(fsmJobRecords)
          .where(eq(fsmJobRecords.id, recordId))
          .limit(1);

        const record = records[0];
        if (!record || record.importStatus !== "pending") continue;

        if (decision === "accepted") {
          // Add to Home Health Vault as a maintenance log entry
          const component = tradeCategoryToComponent(record.tradeCategory);
          const completedAtMs = record.completedAt
            ? new Date(record.completedAt).getTime()
            : Date.now();

          // Insert into homeMaintenanceLogs (must have propertyId — skip if no property)
          if (!propertyId) {
            // No primary property yet — still record consent but skip vault entry
            await db.insert(vaultImportConsents).values({
              homeownerProfileId: profileId,
              propertyId: undefined,
              fsmJobRecordId: recordId,
              decision: "accepted",
            });
            await db.update(fsmJobRecords)
              .set({ importStatus: "claimed", claimedByHomeownerId: profileId, claimedAt: new Date() })
              .where(eq(fsmJobRecords.id, recordId));
            accepted++;
            continue;
          }
          const insertResult = await db.execute(
            sql`INSERT INTO homeMaintenanceLogs 
                (propertyId, systemType, serviceType, serviceDescription, servicedBy, photoUrls, servicedAt, notes, createdAt)
                VALUES (
                  ${propertyId},
                  ${record.tradeCategory ?? "General Service"},
                  ${"other"},
                  ${record.jobTitle ?? component},
                  ${"Verified via FSM Import"},
                  ${JSON.stringify(record.photoUrls ?? [])},
                  ${record.completedAt ? new Date(record.completedAt) : new Date()},
                  ${record.description ?? `Verified service record imported from ${record.source}`},
                  NOW()
                )`
          ) as any;

          const logId = insertResult[0]?.insertId ?? null;

          // Record consent
          await db.insert(vaultImportConsents).values({
            homeownerProfileId: profileId,
            propertyId: propertyId ?? undefined,
            fsmJobRecordId: recordId,
            decision: "accepted",
            vaultEntryId: logId ?? undefined,
          });

          // Mark FSM record as claimed
          await db
            .update(fsmJobRecords)
            .set({
              importStatus: "claimed",
              claimedByHomeownerId: profileId,
              claimedAt: new Date(),
            })
            .where(eq(fsmJobRecords.id, recordId));

          accepted++;
        } else {
          // Record decline consent
          await db.insert(vaultImportConsents).values({
            homeownerProfileId: profileId,
            propertyId: propertyId ?? undefined,
            fsmJobRecordId: recordId,
            decision: "declined",
          });

          // Mark FSM record as declined
          await db
            .update(fsmJobRecords)
            .set({ importStatus: "declined" })
            .where(eq(fsmJobRecords.id, recordId));

          declined++;
        }
      }

      return { success: true, accepted, declined };
    }),

  /** Accept all pending records for the homeowner's address in one click */
  acceptAllPending: protectedProcedure
    .input(z.object({ recordIds: z.array(z.number()) }))
    .mutation(async ({ ctx, input }) => {
      // Reuse respondToRecords logic
      const decisions = input.recordIds.map((id) => ({ recordId: id, decision: "accepted" as const }));
      // Delegate to the same logic — call DB directly
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const profileRows = await db.execute(
        sql`SELECT id FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
      ) as any;
      const profileId = profileRows[0]?.[0]?.id ?? profileRows[0]?.id;
      if (!profileId) throw new TRPCError({ code: "NOT_FOUND", message: "Homeowner profile not found" });

      const propRows = await db.execute(
        sql`SELECT id FROM properties WHERE ownerId = ${profileId} AND isPrimary = 1 LIMIT 1`
      ) as any;
      const propertyId = propRows[0]?.[0]?.id ?? propRows[0]?.id ?? null;

      let accepted = 0;
      for (const recordId of input.recordIds) {
        const records = await db
          .select()
          .from(fsmJobRecords)
          .where(and(eq(fsmJobRecords.id, recordId), eq(fsmJobRecords.importStatus, "pending")))
          .limit(1);
        const record = records[0];
        if (!record) continue;

        const component = tradeCategoryToComponent(record.tradeCategory);
        if (propertyId) {
          await db.execute(
            sql`INSERT INTO homeMaintenanceLogs 
                (propertyId, systemType, serviceType, serviceDescription, servicedBy, photoUrls, servicedAt, notes, createdAt)
                VALUES (
                  ${propertyId},
                  ${record.tradeCategory ?? "General Service"},
                  ${"other"},
                  ${record.jobTitle ?? component},
                  ${"Verified via FSM Import"},
                  ${JSON.stringify(record.photoUrls ?? [])},
                  ${record.completedAt ? new Date(record.completedAt) : new Date()},
                  ${record.description ?? `Verified service record imported from ${record.source}`},
                  NOW()
                )`
          );
        }

        await db.insert(vaultImportConsents).values({
          homeownerProfileId: profileId,
          propertyId: propertyId ?? undefined,
          fsmJobRecordId: recordId,
          decision: "accepted",
        });

        await db
          .update(fsmJobRecords)
          .set({ importStatus: "claimed", claimedByHomeownerId: profileId, claimedAt: new Date() })
          .where(eq(fsmJobRecords.id, recordId));

        accepted++;
      }

      return { success: true, accepted };
    }),

  // ─── ADMIN SIDE ────────────────────────────────────────────────────────────

  /** Admin: get FSM job record stats */
  adminStats: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const db = await getDb();
    if (!db) return { total: 0, pending: 0, claimed: 0, declined: 0 };

    const rows = await db.execute(
      sql`SELECT importStatus, COUNT(*) as count FROM fsmJobRecords GROUP BY importStatus`
    ) as any;
    const stats = { total: 0, pending: 0, claimed: 0, declined: 0 };
    const data = rows[0] ?? rows;
    for (const row of (Array.isArray(data) ? data : [data])) {
      const count = Number(row.count ?? 0);
      stats.total += count;
      if (row.importStatus === "pending") stats.pending = count;
      if (row.importStatus === "claimed") stats.claimed = count;
      if (row.importStatus === "declined") stats.declined = count;
    }
    return stats;
  }),
});
