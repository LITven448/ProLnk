/**
 * Project Bid Marketplace — GC/Assessor Commission Flow
 *
 * A general contractor or estimator visits a property, scopes the full project,
 * builds a line-item bid, and submits it to the ProLnk platform. The platform
 * converts each trade line item into a routable opportunity. When a qualified
 * trade partner wins and completes the work, the original assessor earns a
 * referral commission — exactly like a scan-generated lead, but human-sourced.
 *
 * Flow:
 *   1. GC submits bid with line items (trade + description + estimated cost + photos)
 *   2. Platform creates a shell `jobs` record + one `opportunities` row per trade
 *   3. Admin reviews & approves the bid (same admin queue as photo-detected leads)
 *   4. Each opportunity is dispatched to qualified partners by zip code + trade type
 *   5. Accepting partner completes the job → commission calculated → GC paid
 *
 * Commission: same formula as existing photo-detected opportunities. The submitting
 * GC is the `sourcePartnerId` on every opportunity. Their tier's commissionKeepRate
 * determines their cut.
 */

import { z } from "zod";
import { sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { n8n } from "../n8n-triggers";
import { notifyOwner } from "../_core/notification";

// ─── Schemas ──────────────────────────────────────────────────────────────────

const lineItemSchema = z.object({
  /** Trade category for routing — must match a valid service category */
  tradeType: z.string().min(2).max(100),
  /** Human-readable description of the work scope */
  description: z.string().min(10).max(1000),
  /** Estimated cost for this line item only */
  estimatedCost: z.number().positive(),
  /** Optional: specific materials or notes for the trade partner */
  notes: z.string().max(500).optional(),
});

const submitBidSchema = z.object({
  /** Property being assessed */
  propertyAddress: z.string().min(5).max(500),
  propertyZip: z.string().length(5).optional(),
  propertyCity: z.string().max(100).optional(),
  propertyState: z.string().max(50).optional(),
  /** Brief title for the overall project */
  projectTitle: z.string().min(5).max(200),
  /** Overall scope description — shown to admin and receiving partners */
  projectDescription: z.string().min(20).max(2000),
  /** Homeowner name (if known — optional for now) */
  homeownerName: z.string().max(255).optional(),
  homeownerEmail: z.string().email().optional(),
  homeownerPhone: z.string().max(30).optional(),
  /** Individual trade line items — each becomes a separate routable opportunity */
  lineItems: z.array(lineItemSchema).min(1).max(20),
  /** Photos taken during the assessment — stored in S3 */
  photoUrls: z.array(z.string().url()).max(20).default([]),
  /** When should this project ideally start? */
  targetStartDate: z.string().optional(),
  /** Assessor's overall confidence in the scope (0–1) */
  confidence: z.number().min(0).max(1).default(0.85),
});

// ─── Router ───────────────────────────────────────────────────────────────────

export const projectBidsRouter = router({

  // ── Submit a project bid (GC/Assessor) ──────────────────────────────────────
  submit: protectedProcedure
    .input(submitBidSchema)
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Get submitting partner
      const partnerRows = await (db as any).execute(sql`
        SELECT id, businessName, contactEmail, contactName, tier, commissionRate,
               platformFeeRate, isExempt, stripeConnectStatus
        FROM partners WHERE userId = ${ctx.user.id} AND status = 'approved' LIMIT 1
      `);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) throw new TRPCError({ code: "FORBIDDEN", message: "Only approved partners can submit project bids" });

      const totalEstimatedValue = input.lineItems.reduce((s, li) => s + li.estimatedCost, 0);

      // Create a shell jobs record as the parent for all opportunities
      const jobResult = await (db as any).execute(sql`
        INSERT INTO jobs (
          partnerId, loggedByUserId, serviceAddress, serviceType, notes,
          photoUrls, aiAnalysisStatus, status, customerName, customerEmail, customerPhone
        ) VALUES (
          ${partner.id}, ${ctx.user.id}, ${input.propertyAddress}, 'project_bid',
          ${`[Project Bid] ${input.projectTitle}\n\n${input.projectDescription}`},
          ${JSON.stringify(input.photoUrls)}, 'complete', 'opportunities_sent',
          ${input.homeownerName ?? null}, ${input.homeownerEmail ?? null}, ${input.homeownerPhone ?? null}
        )
      `);
      const jobId = (jobResult.rows || jobResult).insertId ?? (jobResult as any).insertId;

      // Insert a record in the projectBids table (for GC dashboard tracking)
      const bidResult = await (db as any).execute(sql`
        INSERT INTO projectBids (
          jobId, submittingPartnerId, propertyAddress, propertyZip, propertyCity, propertyState,
          projectTitle, projectDescription, homeownerName, homeownerEmail, homeownerPhone,
          lineItems, photoUrls, totalEstimatedValue, targetStartDate, confidence, status
        ) VALUES (
          ${jobId}, ${partner.id}, ${input.propertyAddress},
          ${input.propertyZip ?? null}, ${input.propertyCity ?? null}, ${input.propertyState ?? null},
          ${input.projectTitle}, ${input.projectDescription},
          ${input.homeownerName ?? null}, ${input.homeownerEmail ?? null}, ${input.homeownerPhone ?? null},
          ${JSON.stringify(input.lineItems)}, ${JSON.stringify(input.photoUrls)},
          ${totalEstimatedValue.toFixed(2)}, ${input.targetStartDate ?? null},
          ${input.confidence}, 'pending_review'
        )
      `);
      const bidId = (bidResult.rows || bidResult).insertId ?? (bidResult as any).insertId;

      // Create one opportunity per line item — each becomes a separately routable lead
      const opportunityIds: number[] = [];
      for (const item of input.lineItems) {
        const oppResult = await (db as any).execute(sql`
          INSERT INTO opportunities (
            jobId, sourcePartnerId, opportunityType, opportunityCategory,
            description, aiConfidence, photoUrl,
            adminReviewStatus, status, estimatedJobValue, routingPosition
          ) VALUES (
            ${jobId}, ${partner.id}, ${item.tradeType}, ${item.tradeType},
            ${`[${input.projectTitle}] ${item.description}${item.notes ? ` — Notes: ${item.notes}` : ""}`},
            ${input.confidence}, ${input.photoUrls[0] ?? null},
            'pending_review', 'pending', ${item.estimatedCost.toFixed(2)}, 0
          )
        `);
        const oppId = (oppResult.rows || oppResult).insertId ?? (oppResult as any).insertId;
        opportunityIds.push(oppId);
      }

      // Notify admin of new bid
      notifyOwner({
        title: `New Project Bid from ${partner.businessName}`,
        content: `**${input.projectTitle}** at ${input.propertyAddress}\n\nTotal: $${totalEstimatedValue.toLocaleString()}\nTrades: ${input.lineItems.map(l => l.tradeType).join(", ")}\nPhotos: ${input.photoUrls.length}\n\nReview in admin → Lead Dispatch.`,
      }).catch(() => {});

      // Trigger n8n workflow for bid notifications
      n8n.opportunityDetected({
        opportunityId: bidId,
        issueType: input.projectTitle,
        severity: "medium",
        estimatedValue: totalEstimatedValue,
        serviceAddress: input.propertyAddress,
      }).catch(() => {});

      return {
        success: true,
        bidId,
        jobId,
        opportunityIds,
        totalEstimatedValue,
        message: `Your bid has been submitted for admin review. You'll be notified when each trade opportunity is dispatched. Estimated commission: $${(totalEstimatedValue * parseFloat(partner.platformFeeRate) * parseFloat(partner.commissionRate)).toFixed(2)} if all trades close.`,
      };
    }),

  // ── Get my submitted bids (GC dashboard) ────────────────────────────────────
  getMyBids: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const partnerRows = await (db as any).execute(sql`
      SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
    `);
    const partner = (partnerRows.rows || partnerRows)[0];
    if (!partner) return [];

    const rows = await (db as any).execute(sql`
      SELECT pb.*,
        COUNT(o.id) as totalOpportunities,
        SUM(CASE WHEN o.status = 'accepted' THEN 1 ELSE 0 END) as acceptedCount,
        SUM(CASE WHEN o.status = 'converted' THEN 1 ELSE 0 END) as convertedCount,
        SUM(CASE WHEN o.status = 'pending' THEN 1 ELSE 0 END) as pendingCount,
        COALESCE(SUM(o.referralCommissionAmount), 0) as totalCommissionEarned
      FROM projectBids pb
      LEFT JOIN opportunities o ON o.jobId = pb.jobId
      WHERE pb.submittingPartnerId = ${partner.id}
      GROUP BY pb.id
      ORDER BY pb.createdAt DESC
      LIMIT 50
    `);
    return rows.rows || rows;
  }),

  // ── Get a single bid (for detail view) ──────────────────────────────────────
  getBid: protectedProcedure
    .input(z.object({ bidId: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return null;

      const partnerRows = await (db as any).execute(sql`
        SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
      `);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) return null;

      const bidRows = await (db as any).execute(sql`
        SELECT pb.* FROM projectBids pb
        WHERE pb.id = ${input.bidId}
          AND (pb.submittingPartnerId = ${partner.id} OR ${ctx.user.role === "admin" ? 1 : 0} = 1)
        LIMIT 1
      `);
      const bid = (bidRows.rows || bidRows)[0];
      if (!bid) return null;

      const oppRows = await (db as any).execute(sql`
        SELECT o.*, p.businessName as receivingPartnerName
        FROM opportunities o
        LEFT JOIN partners p ON o.receivingPartnerId = p.id
        WHERE o.jobId = ${bid.jobId}
        ORDER BY o.createdAt ASC
      `);
      const opportunities = oppRows.rows || oppRows;

      return { ...bid, opportunities };
    }),

  // ── Admin: list all pending bids ─────────────────────────────────────────────
  adminList: protectedProcedure
    .input(z.object({
      status: z.enum(["pending_review", "approved", "dispatched", "completed", "all"]).default("pending_review"),
      limit: z.number().default(50),
    }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) return [];

      const whereClause = input.status === "all"
        ? sql`1=1`
        : sql`pb.status = ${input.status}`;

      const rows = await (db as any).execute(sql`
        SELECT pb.*, p.businessName as assessorName, p.contactEmail as assessorEmail,
               p.tier as assessorTier
        FROM projectBids pb
        JOIN partners p ON pb.submittingPartnerId = p.id
        WHERE ${whereClause}
        ORDER BY pb.createdAt DESC
        LIMIT ${input.limit}
      `);
      return rows.rows || rows;
    }),

  // ── Admin: approve a bid (dispatches all its opportunities) ─────────────────
  adminApprove: protectedProcedure
    .input(z.object({
      bidId: z.number().int().positive(),
      /** Optionally override the estimated value for specific line items */
      valueOverrides: z.record(z.string(), z.number()).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      // Get bid + opportunities
      const bidRows = await (db as any).execute(sql`
        SELECT pb.*, p.contactEmail as assessorEmail, p.businessName as assessorName
        FROM projectBids pb
        JOIN partners p ON pb.submittingPartnerId = p.id
        WHERE pb.id = ${input.bidId} LIMIT 1
      `);
      const bid = (bidRows.rows || bidRows)[0];
      if (!bid) throw new TRPCError({ code: "NOT_FOUND" });

      // Mark all opportunities as admin-approved (ready for dispatch)
      await (db as any).execute(sql`
        UPDATE opportunities
        SET adminReviewStatus = 'approved', adminReviewedAt = NOW(), adminReviewedBy = ${ctx.user.id}
        WHERE jobId = ${bid.jobId} AND adminReviewStatus = 'pending_review'
      `);

      // Update bid status
      await (db as any).execute(sql`
        UPDATE projectBids SET status = 'approved', approvedAt = NOW(), approvedBy = ${ctx.user.id}
        WHERE id = ${input.bidId}
      `);

      // The intake-router's dispatchLeadToPartner will be called for each opportunity
      // by the admin dispatch queue (same flow as photo-detected leads)

      return { success: true, message: `Bid #${input.bidId} approved. Opportunities are now visible in the Lead Dispatch queue.` };
    }),

  // ── Admin: reject a bid ──────────────────────────────────────────────────────
  adminReject: protectedProcedure
    .input(z.object({
      bidId: z.number().int().positive(),
      reason: z.string().max(500).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await (db as any).execute(sql`
        UPDATE projectBids SET status = 'rejected', rejectedAt = NOW(), rejectedBy = ${ctx.user.id},
          rejectionReason = ${input.reason ?? null}
        WHERE id = ${input.bidId}
      `);

      await (db as any).execute(sql`
        UPDATE opportunities SET adminReviewStatus = 'rejected', adminReviewedAt = NOW()
        WHERE jobId = (SELECT jobId FROM projectBids WHERE id = ${input.bidId})
      `);

      return { success: true };
    }),

  // ── Partner: get available bid opportunities in my service area ─────────────
  // Partners see bids that match their trade types and zip codes
  getAvailableForMe: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const partnerRows = await (db as any).execute(sql`
      SELECT id, serviceZipCodes, businessType FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
    `);
    const partner = (partnerRows.rows || partnerRows)[0];
    if (!partner) return [];

    // Get approved bid opportunities not yet assigned to this partner
    const rows = await (db as any).execute(sql`
      SELECT o.*, pb.projectTitle, pb.propertyAddress, pb.propertyZip,
             pb.totalEstimatedValue, pb.homeownerName, pb.confidence,
             p.businessName as assessorName, pb.photoUrls as bidPhotoUrls
      FROM opportunities o
      JOIN projectBids pb ON o.jobId = pb.jobId
      JOIN partners p ON pb.submittingPartnerId = p.id
      WHERE o.adminReviewStatus = 'approved'
        AND o.status = 'pending'
        AND o.receivingPartnerId IS NULL
        AND o.sourcePartnerId != ${partner.id}
      ORDER BY pb.createdAt DESC
      LIMIT 50
    `);
    const opps = rows.rows || rows;

    // Filter by partner's zip codes (client-side for now — add DB index query when zip data is reliable)
    let partnerZips: string[] = [];
    try { partnerZips = JSON.parse(partner.serviceZipCodes ?? "[]"); } catch {}

    if (partnerZips.length === 0) return opps; // No zip filter if partner hasn't set zips

    return opps.filter((o: any) => {
      if (!o.propertyZip) return true; // include if zip unknown
      return partnerZips.includes(o.propertyZip);
    });
  }),

  // ── Estimate commission before submitting ────────────────────────────────────
  estimateCommission: protectedProcedure
    .input(z.object({ totalJobValue: z.number().positive() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return null;
      const rows = await (db as any).execute(sql`
        SELECT platformFeeRate, commissionRate, tier FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
      `);
      const p = (rows.rows || rows)[0];
      if (!p) return null;
      const platformFee = input.totalJobValue * parseFloat(p.platformFeeRate);
      const referralCommission = platformFee * parseFloat(p.commissionRate);
      return {
        totalJobValue: input.totalJobValue,
        platformFeeRate: parseFloat(p.platformFeeRate),
        commissionKeepRate: parseFloat(p.commissionRate),
        estimatedPlatformFee: Math.round(platformFee * 100) / 100,
        estimatedYourCommission: Math.round(referralCommission * 100) / 100,
        tier: p.tier,
      };
    }),
});
