/**
 * Photo Queue Router
 *
 * Manages the intelligent photo processing queue for ProLnk.
 * Handles:
 *   - Live photo submissions (from Field App, LogJob)
 *   - Historical photo ingestion (from ServiceTitan, Jobber, CompanyCam)
 *   - Rate limiting (max 3 offers per address per 30 days)
 *   - Stale data detection and suppression
 *   - Queue status and admin monitoring
 */

import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import { sql } from "drizzle-orm";
import { runWaterfallAnalysis, runWaterfallBatch, type PhotoInput } from "../photoWaterfall";

// ─── Queue Status Types ───────────────────────────────────────────────────────

type QueueItemStatus = "pending" | "processing" | "completed" | "failed" | "suppressed";
type QueuePriority = "high" | "normal" | "low" | "historical";

// ─── DB Helpers ───────────────────────────────────────────────────────────────

async function getOfferCountForAddress(address: string, windowDays = 30): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const cutoff = Date.now() - windowDays * 24 * 60 * 60 * 1000;
  const rows = await (db as any).execute(
    sql`SELECT COUNT(*) as cnt FROM photoQueueItems 
        WHERE serviceAddress = ${address} 
        AND offerGenerated = 1 
        AND createdAt > ${cutoff}`
  );
  return Number(rows?.[0]?.cnt ?? 0);
}

async function checkIssueResolved(address: string, category: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  // Check if a job in the same category was logged at this address in the last 180 days
  const cutoff = Date.now() - 180 * 24 * 60 * 60 * 1000;
  const rows = await (db as any).execute(
    sql`SELECT COUNT(*) as cnt FROM jobs 
        WHERE serviceAddress = ${address} 
        AND serviceType LIKE ${`%${category}%`}
        AND createdAt > ${cutoff}`
  );
  return Number(rows?.[0]?.cnt ?? 0) > 0;
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const photoQueueRouter = router({

  /**
   * Submit a single photo for waterfall analysis.
   * Used by Field App and LogJob for live submissions.
   */
  submitPhoto: protectedProcedure
    .input(z.object({
      photoUrl: z.string().url(),
      serviceAddress: z.string().min(5),
      source: z.enum(["field_app", "servicetitan", "companycam", "jobber", "manual_upload"]),
      ingestionMode: z.enum(["live", "historical"]).default("live"),
      photoAgeMonths: z.number().optional(),
      partnerId: z.number().optional(),
      jobId: z.number().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Check per-address rate limit (live mode only)
      if (input.ingestionMode === "live") {
        const offerCount = await getOfferCountForAddress(input.serviceAddress);
        if (offerCount >= 3) {
          // Log as suppressed — rate limited
          await (db as any).execute(
            sql`INSERT INTO photoQueueItems 
                (photoUrl, serviceAddress, source, ingestionMode, status, staleDataFlags, createdAt, updatedAt)
                VALUES (${input.photoUrl}, ${input.serviceAddress}, ${input.source}, ${input.ingestionMode}, 
                        'suppressed', ${JSON.stringify(["rate_limited_per_address"])}, ${Date.now()}, ${Date.now()})`
          );
          return { status: "suppressed", reason: "Address has reached the 3-offer limit for this 30-day window" };
        }
      }

      // Insert into queue as pending
      const insertResult = await (db as any).execute(
        sql`INSERT INTO photoQueueItems 
            (photoUrl, serviceAddress, source, ingestionMode, photoAgeMonths, partnerId, jobId, status, createdAt, updatedAt)
            VALUES (${input.photoUrl}, ${input.serviceAddress}, ${input.source}, ${input.ingestionMode},
                    ${input.photoAgeMonths ?? null}, ${input.partnerId ?? null}, ${input.jobId ?? null},
                    'pending', ${Date.now()}, ${Date.now()})`
      );
      const queueItemId = (insertResult as any).insertId;

      // Run waterfall analysis asynchronously
      setImmediate(async () => {
        try {
          await (db as any).execute(
            sql`UPDATE photoQueueItems SET status = 'processing', updatedAt = ${Date.now()} WHERE id = ${queueItemId}`
          );

          const photoInput: PhotoInput = {
            url: input.photoUrl,
            source: input.source,
            ingestionMode: input.ingestionMode,
            serviceAddress: input.serviceAddress,
            photoAgeMonths: input.photoAgeMonths,
            partnerId: input.partnerId,
            jobId: input.jobId,
          };

          const result = await runWaterfallAnalysis(photoInput);

          // Check if the detected issue was already resolved by another job
          let issueResolved = false;
          if (result.tier2?.category) {
            issueResolved = await checkIssueResolved(input.serviceAddress, result.tier2.category);
            if (issueResolved) {
              result.shouldGenerateOffer = false;
              result.staleDataFlags.push("issue_likely_resolved");
            }
          }

          await (db as any).execute(
            sql`UPDATE photoQueueItems SET 
                status = 'completed',
                tier1Passed = ${result.tier1?.passed ? 1 : 0},
                tier2Passed = ${result.tier2?.passed ? 1 : 0},
                tier3Ran = ${result.tier3 !== undefined ? 1 : 0},
                finalConfidence = ${result.finalConfidence},
                offerGenerated = ${result.shouldGenerateOffer ? 1 : 0},
                processingCost = ${result.processingCostUsd},
                staleDataFlags = ${JSON.stringify(result.staleDataFlags)},
                analysisResult = ${JSON.stringify(result)},
                updatedAt = ${Date.now()}
                WHERE id = ${queueItemId}`
          );

          // If offer should be generated, create opportunity records
          if (result.shouldGenerateOffer && result.tier3?.opportunities) {
            for (const opp of result.tier3.opportunities) {
              if (opp.confidence >= 0.6) {
                await (db as any).execute(
                  sql`INSERT INTO opportunities 
                      (partnerId, jobId, serviceAddress, opportunityType, category, confidence, estimatedValue, 
                       description, offerTrack, isInsuranceClaim, status, source, createdAt)
                      VALUES (${input.partnerId ?? null}, ${input.jobId ?? null}, ${input.serviceAddress},
                              ${opp.type}, ${opp.category}, ${opp.confidence}, ${opp.estimatedValue},
                              ${opp.description}, ${opp.offerTrack}, ${opp.isInsuranceClaim ? 1 : 0},
                              'new', ${input.source}, ${Date.now()})`
                );
              }
            }
          }

          // Update Home Health Vault regardless of offer generation
          if (result.tier3?.homeHealthUpdates?.length) {
            for (const update of result.tier3.homeHealthUpdates) {
              await (db as any).execute(
                sql`INSERT INTO homeHealthVault 
                    (serviceAddress, component, \`condition\`, notes, estimatedAge, photoUrl, source, updatedAt)
                    VALUES (${input.serviceAddress}, ${update.component}, ${update.condition},
                            ${update.notes}, ${update.estimatedAge ?? null}, ${input.photoUrl}, ${input.source}, ${Date.now()})
                    ON DUPLICATE KEY UPDATE 
                    \`condition\` = VALUES(\`condition\`), notes = VALUES(notes), 
                    estimatedAge = VALUES(estimatedAge), updatedAt = VALUES(updatedAt)`
              );
            }
          }

        } catch (err) {
          await (db as any).execute(
            sql`UPDATE photoQueueItems SET status = 'failed', 
                analysisResult = ${JSON.stringify({ error: err instanceof Error ? err.message : "unknown" })},
                updatedAt = ${Date.now()} WHERE id = ${queueItemId}`
          );
        }
      });

      return { status: "queued", queueItemId };
    }),

  /**
   * Ingest a batch of historical photos from an integration (ServiceTitan, Jobber, CompanyCam).
   * Runs in profile-only mode — updates Home Health Vault but suppresses offers for photos > 18 months old.
   * Processes in controlled batches to avoid overwhelming the AI pipeline.
   */
  ingestHistoricalBatch: protectedProcedure
    .input(z.object({
      photos: z.array(z.object({
        url: z.string().url(),
        serviceAddress: z.string().min(5),
        photoAgeMonths: z.number(),
        source: z.enum(["servicetitan", "companycam", "jobber", "manual_upload"]),
        partnerId: z.number().optional(),
        jobId: z.number().optional(),
      })).max(500, "Maximum 500 photos per batch"),
      dryRun: z.boolean().default(false), // if true, estimate costs without processing
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      if (input.dryRun) {
        // Estimate costs without processing
        const estimatedTier1 = input.photos.length;
        const estimatedTier2 = Math.round(input.photos.length * 0.7); // ~70% pass Tier 1
        const estimatedTier3 = Math.round(estimatedTier2 * 0.3); // ~30% pass Tier 2
        const estimatedCost = (estimatedTier1 * 0.0015) + (estimatedTier2 * 0.0025) + (estimatedTier3 * 0.020);
        const costIfAllGPT4o = input.photos.length * 0.020;
        return {
          dryRun: true,
          photoCount: input.photos.length,
          estimatedCost: Math.round(estimatedCost * 100) / 100,
          estimatedCostIfAllGPT4o: Math.round(costIfAllGPT4o * 100) / 100,
          estimatedSavings: Math.round((costIfAllGPT4o - estimatedCost) * 100) / 100,
          estimatedOffersGenerated: Math.round(estimatedTier3 * 0.5), // ~50% of Tier 3 generate offers
          estimatedHomeHealthUpdates: estimatedTier3,
          message: "Dry run complete. Call again with dryRun: false to process.",
        };
      }

      // Create a batch job record
      const batchResult = await (db as any).execute(
        sql`INSERT INTO photoIngestionBatches 
            (source, totalPhotos, status, createdBy, createdAt, updatedAt)
            VALUES (${input.photos[0]?.source ?? "manual_upload"}, ${input.photos.length}, 
                    'queued', ${ctx.user.id}, ${Date.now()}, ${Date.now()})`
      );
      const batchId = (batchResult as any).insertId;

      // Queue all photos as pending
      for (const photo of input.photos) {
        await (db as any).execute(
          sql`INSERT INTO photoQueueItems 
              (photoUrl, serviceAddress, source, ingestionMode, photoAgeMonths, partnerId, jobId, 
               batchId, status, createdAt, updatedAt)
              VALUES (${photo.url}, ${photo.serviceAddress}, ${photo.source}, 'historical',
                      ${photo.photoAgeMonths}, ${photo.partnerId ?? null}, ${photo.jobId ?? null},
                      ${batchId}, 'pending', ${Date.now()}, ${Date.now()})`
        );
      }

      // Process in background — controlled batches of 10 with 2s delay between batches
      setImmediate(async () => {
        try {
          await (db as any).execute(
            sql`UPDATE photoIngestionBatches SET status = 'processing', updatedAt = ${Date.now()} WHERE id = ${batchId}`
          );

          const photoInputs: PhotoInput[] = input.photos.map(p => ({
            url: p.url,
            source: p.source,
            ingestionMode: "historical" as const,
            serviceAddress: p.serviceAddress,
            photoAgeMonths: p.photoAgeMonths,
            partnerId: p.partnerId,
            jobId: p.jobId,
          }));

          const { results, summary } = await runWaterfallBatch(photoInputs, {
            maxConcurrent: 5, // Conservative for historical batches
            requestedByHomeowner: false, // Historical ingestion — profile updates only, no unsolicited offers
          });

          // Update Home Health Vault for all results that have Tier 3 data
          for (const result of results) {
            if (result.tier3?.homeHealthUpdates?.length) {
              const photo = input.photos.find(p => p.url === result.photoUrl);
              for (const update of result.tier3.homeHealthUpdates) {
                await (db as any).execute(
                  sql`INSERT INTO homeHealthVault 
                      (serviceAddress, component, \`condition\`, notes, estimatedAge, photoUrl, source, updatedAt)
                      VALUES (${photo?.serviceAddress ?? ""}, ${update.component}, ${update.condition},
                              ${update.notes}, ${update.estimatedAge ?? null}, ${result.photoUrl}, 
                              ${photo?.source ?? "manual_upload"}, ${Date.now()})
                      ON DUPLICATE KEY UPDATE 
                      \`condition\` = VALUES(\`condition\`), notes = VALUES(notes),
                      estimatedAge = VALUES(estimatedAge), updatedAt = VALUES(updatedAt)`
                );
              }
            }
          }

          await (db as any).execute(
            sql`UPDATE photoIngestionBatches SET 
                status = 'completed',
                processedPhotos = ${summary.passedTier1},
                offersGenerated = ${summary.offersGenerated},
                homeHealthUpdates = ${summary.homeHealthUpdates},
                totalCost = ${summary.totalCostUsd},
                costSavings = ${summary.estimatedSavingsVsFlatRate},
                updatedAt = ${Date.now()}
                WHERE id = ${batchId}`
          );
        } catch (err) {
          await (db as any).execute(
            sql`UPDATE photoIngestionBatches SET status = 'failed', updatedAt = ${Date.now()} WHERE id = ${batchId}`
          );
        }
      });

      return {
        batchId,
        status: "queued",
        photoCount: input.photos.length,
        message: `${input.photos.length} photos queued for historical ingestion. Home Health Vault will be updated. Offers suppressed for photos older than 18 months.`,
      };
    }),

  /**
   * Get the current queue status for admin monitoring.
   */
  getQueueStatus: protectedProcedure
    .query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const [statusCounts, recentBatches, costSummary] = await Promise.all([
        (db as any).execute(
          sql`SELECT status, COUNT(*) as cnt FROM photoQueueItems GROUP BY status`
        ),
        (db as any).execute(
          sql`SELECT * FROM photoIngestionBatches ORDER BY createdAt DESC LIMIT 10`
        ),
        (db as any).execute(
          sql`SELECT 
              SUM(processingCost) as totalCost,
              SUM(CASE WHEN offerGenerated = 1 THEN 1 ELSE 0 END) as offersGenerated,
              SUM(CASE WHEN tier3Ran = 1 THEN 1 ELSE 0 END) as tier3Ran,
              COUNT(*) as totalProcessed
              FROM photoQueueItems WHERE status = 'completed'`
        ),
      ]);

      const statusMap: Record<string, number> = {};
      for (const row of (statusCounts as any[]) ?? []) {
        statusMap[row.status] = Number(row.cnt);
      }

      const cost = (costSummary as any[])?.[0] ?? {};

      return {
        queue: {
          pending: statusMap.pending ?? 0,
          processing: statusMap.processing ?? 0,
          completed: statusMap.completed ?? 0,
          failed: statusMap.failed ?? 0,
          suppressed: statusMap.suppressed ?? 0,
        },
        totals: {
          totalProcessed: Number(cost.totalProcessed ?? 0),
          offersGenerated: Number(cost.offersGenerated ?? 0),
          tier3Ran: Number(cost.tier3Ran ?? 0),
          totalCost: Number(cost.totalCost ?? 0),
          estimatedSavings: Number(cost.totalProcessed ?? 0) * 0.020 - Number(cost.totalCost ?? 0),
        },
        recentBatches: (recentBatches as any[]) ?? [],
      };
    }),

  /**
   * Get recent queue items for the admin feed.
   */
  getQueueFeed: protectedProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(50),
      status: z.enum(["all", "pending", "processing", "completed", "failed", "suppressed"]).default("all"),
    }))
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const rows = input.status === "all"
        ? await (db as any).execute(
            sql`SELECT * FROM photoQueueItems ORDER BY createdAt DESC LIMIT ${input.limit}`
          )
        : await (db as any).execute(
            sql`SELECT * FROM photoQueueItems WHERE status = ${input.status} ORDER BY createdAt DESC LIMIT ${input.limit}`
          );

      return (rows as any[]).map(row => ({
        ...row,
        staleDataFlags: (() => { try { return JSON.parse(row.staleDataFlags ?? "[]"); } catch { return []; } })(),
        analysisResult: (() => { try { return JSON.parse(row.analysisResult ?? "null"); } catch { return null; } })(),
      }));
    }),

  /**
   * Get Home Health Vault entries for an address.
   */
  getHomeHealthVault: publicProcedure
    .input(z.object({
      address: z.string().min(5),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const rows = await (db as any).execute(
        sql`SELECT * FROM homeHealthVault WHERE serviceAddress = ${input.address} ORDER BY updatedAt DESC`
      );

      return (rows as any[]) ?? [];
    }),

  /**
   * Retry failed queue items.
   */
  retryFailed: protectedProcedure
    .mutation(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const result = await (db as any).execute(
        sql`UPDATE photoQueueItems SET status = 'pending', updatedAt = ${Date.now()} WHERE status = 'failed'`
      );

      return { retriedCount: (result as any).affectedRows ?? 0 };
    }),
});
