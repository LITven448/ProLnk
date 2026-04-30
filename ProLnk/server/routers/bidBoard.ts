/**
 * Bid Board Router — Project Marketplace
 *
 * Where Scout assessments and GC project bids get posted for
 * qualified trade partners to bid on. When a bid is accepted,
 * a contract stub is generated and work begins.
 *
 * Flow:
 *   Scout completes assessment → auto-posts to Bid Board
 *   OR GC manually posts a project
 *   → Partners in matching ZIP/trade see it in their lead feed
 *   → Partners submit bids (price + timeline)
 *   → Scout/homeowner reviews bids and selects winner
 *   → Contract generated → work begins → commission flows
 */

import { z } from "zod";
import { sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { notifyOwner } from "../_core/notification";
import { createPartnerNotification } from "../db";

export const bidBoardRouter = router({

  // ── Post a project to the Bid Board ────────────────────────────────────────
  postProject: protectedProcedure
    .input(z.object({
      assessmentId: z.number().int().optional(),
      projectBidId: z.number().int().optional(),
      projectTitle: z.string().min(5).max(200),
      projectDescription: z.string().min(20).max(3000),
      propertyAddress: z.string().min(5).max(500),
      propertyZip: z.string().max(20).optional(),
      propertyCity: z.string().max(100).optional(),
      propertyState: z.string().max(50).optional(),
      propertyType: z.enum(["residential","commercial","multifamily","school","healthcare","other"]).default("residential"),
      tradesNeeded: z.array(z.string()).min(1),
      lineItems: z.array(z.object({
        tradeType: z.string(),
        description: z.string(),
        estimatedCost: z.number(),
      })).optional(),
      totalEstimatedValue: z.number().positive(),
      photoUrls: z.array(z.string().url()).max(20).default([]),
      reportUrl: z.string().url().optional(),
      targetStartDate: z.string().optional(),
      targetCompletionDate: z.string().optional(),
      biddingDeadline: z.string().optional(),
      projectStructure: z.enum(["gc_managed","separate_trades","homeowner_managed"]).default("separate_trades"),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const partnerRows = await (db as any).execute(sql`
        SELECT id, businessName, commissionRate FROM partners WHERE userId = ${ctx.user.id} AND status = 'approved' LIMIT 1
      `);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) throw new TRPCError({ code: "FORBIDDEN", message: "Only approved partners can post to the Bid Board" });

      // Set bidding deadline (default 7 days if not specified)
      const biddingDeadline = input.biddingDeadline
        ? new Date(input.biddingDeadline)
        : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      const result = await (db as any).execute(sql`
        INSERT INTO bidBoardProjects (
          assessmentId, projectBidId, submittingPartnerId,
          projectTitle, projectDescription, propertyAddress, propertyZip, propertyCity, propertyState,
          propertyType, tradesNeeded, lineItems, totalEstimatedValue, photoUrls, reportUrl,
          targetStartDate, targetCompletionDate, biddingDeadline, projectStructure,
          status, scoutCommissionRate
        ) VALUES (
          ${input.assessmentId ?? null}, ${input.projectBidId ?? null}, ${partner.id},
          ${input.projectTitle}, ${input.projectDescription},
          ${input.propertyAddress}, ${input.propertyZip ?? null}, ${input.propertyCity ?? null}, ${input.propertyState ?? null},
          ${input.propertyType}, ${JSON.stringify(input.tradesNeeded)}, ${JSON.stringify(input.lineItems ?? [])},
          ${input.totalEstimatedValue}, ${JSON.stringify(input.photoUrls)}, ${input.reportUrl ?? null},
          ${input.targetStartDate ?? null}, ${input.targetCompletionDate ?? null},
          ${biddingDeadline}, ${input.projectStructure}, 'open',
          ${parseFloat(partner.commissionRate || "0.40") * 0.12}
        )
      `);
      const projectId = (result.rows || result).insertId ?? result.insertId;

      // Notify admin
      notifyOwner({
        title: `New Bid Board Project — ${input.projectTitle}`,
        content: `${partner.businessName} posted a ${input.propertyType} project at ${input.propertyAddress}. Est. value: $${input.totalEstimatedValue.toLocaleString()}. Trades: ${input.tradesNeeded.join(", ")}.`,
      }).catch(() => {});

      return { projectId, message: "Project posted to Bid Board. Partners will be notified." };
    }),

  // ── List open projects (partner feed) ───────────────────────────────────────
  listOpenProjects: protectedProcedure
    .input(z.object({
      tradeFilter: z.string().optional(),
      zipFilter: z.string().optional(),
      propertyType: z.string().optional(),
      limit: z.number().default(20),
      offset: z.number().default(0),
    }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return { projects: [], total: 0 };

      const partnerRows = await (db as any).execute(sql`
        SELECT id, serviceZipCodes, businessType FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
      `);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) return { projects: [], total: 0 };

      // Build filter
      const tradeFilter = input.tradeFilter ? sql`AND JSON_CONTAINS(p.tradesNeeded, JSON_QUOTE(${input.tradeFilter}))` : sql`1=1`;
      const zipFilter = input.zipFilter ? sql`AND p.propertyZip = ${input.zipFilter}` : sql`1=1`;
      const typeFilter = input.propertyType ? sql`AND p.propertyType = ${input.propertyType}` : sql`1=1`;

      const rows = await (db as any).execute(sql`
        SELECT p.*,
          pr.businessName as posterName,
          (SELECT COUNT(*) FROM bidSubmissions b WHERE b.projectId = p.id AND b.status != 'withdrawn') as bidCount,
          (SELECT COUNT(*) FROM bidSubmissions b WHERE b.projectId = p.id AND b.biddingPartnerId = ${partner.id}) as myBidCount
        FROM bidBoardProjects p
        JOIN partners pr ON p.submittingPartnerId = pr.id
        WHERE p.status = 'open'
          AND p.biddingDeadline > NOW()
          AND p.submittingPartnerId != ${partner.id}
          AND ${tradeFilter}
          AND ${zipFilter}
          AND ${typeFilter}
        ORDER BY p.totalEstimatedValue DESC, p.createdAt DESC
        LIMIT ${input.limit} OFFSET ${input.offset}
      `);
      const projects = rows.rows || rows;

      const countRows = await (db as any).execute(sql`
        SELECT COUNT(*) as total FROM bidBoardProjects WHERE status = 'open' AND biddingDeadline > NOW()
      `);
      const total = (countRows.rows || countRows)[0]?.total ?? 0;

      return { projects, total };
    }),

  // ── Submit a bid ────────────────────────────────────────────────────────────
  submitBid: protectedProcedure
    .input(z.object({
      projectId: z.number().int().positive(),
      bidAmount: z.number().positive(),
      laborCost: z.number().optional(),
      materialsCost: z.number().optional(),
      timelineWeeks: z.number().int().optional(),
      startDateProposed: z.string().optional(),
      tradeCoverage: z.array(z.string()).optional(),
      gcIncluded: z.boolean().default(false),
      bidDescription: z.string().max(3000).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const partnerRows = await (db as any).execute(sql`
        SELECT id, businessName FROM partners WHERE userId = ${ctx.user.id} AND status = 'approved' LIMIT 1
      `);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) throw new TRPCError({ code: "FORBIDDEN" });

      // Check project is open
      const projectRows = await (db as any).execute(sql`
        SELECT id, submittingPartnerId, projectTitle, biddingDeadline, status
        FROM bidBoardProjects WHERE id = ${input.projectId} LIMIT 1
      `);
      const project = (projectRows.rows || projectRows)[0];
      if (!project) throw new TRPCError({ code: "NOT_FOUND" });
      if (project.status !== "open") throw new TRPCError({ code: "BAD_REQUEST", message: "This project is no longer accepting bids" });
      if (new Date(project.biddingDeadline) < new Date()) throw new TRPCError({ code: "BAD_REQUEST", message: "Bidding deadline has passed" });
      if (project.submittingPartnerId === partner.id) throw new TRPCError({ code: "BAD_REQUEST", message: "Cannot bid on your own project" });

      // Check for existing bid
      const existingRows = await (db as any).execute(sql`
        SELECT id FROM bidSubmissions WHERE projectId = ${input.projectId} AND biddingPartnerId = ${partner.id} AND status != 'withdrawn' LIMIT 1
      `);
      if ((existingRows.rows || existingRows)[0]) throw new TRPCError({ code: "BAD_REQUEST", message: "You already have an active bid on this project" });

      const result = await (db as any).execute(sql`
        INSERT INTO bidSubmissions (
          projectId, biddingPartnerId, bidAmount, laborCost, materialsCost,
          timelineWeeks, startDateProposed, tradeCoverage, gcIncluded, bidDescription, status
        ) VALUES (
          ${input.projectId}, ${partner.id}, ${input.bidAmount},
          ${input.laborCost ?? null}, ${input.materialsCost ?? null},
          ${input.timelineWeeks ?? null}, ${input.startDateProposed ?? null},
          ${JSON.stringify(input.tradeCoverage ?? [])}, ${input.gcIncluded ? 1 : 0},
          ${input.bidDescription ?? null}, 'submitted'
        )
      `);
      const bidId = (result.rows || result).insertId ?? result.insertId;

      // Update bid count on project
      await (db as any).execute(sql`
        UPDATE bidBoardProjects SET bidsReceived = bidsReceived + 1 WHERE id = ${input.projectId}
      `);

      // Notify project poster
      await createPartnerNotification({
        partnerId: project.submittingPartnerId,
        type: "new_lead",
        title: `New bid on "${project.projectTitle}"`,
        message: `${partner.businessName} submitted a bid of $${input.bidAmount.toLocaleString()}. Review in your Bid Board.`,
        actionUrl: `/dashboard/bid-board/${input.projectId}`,
      });

      return { bidId, message: "Bid submitted successfully." };
    }),

  // ── Get bids for a project ──────────────────────────────────────────────────
  getProjectBids: protectedProcedure
    .input(z.object({ projectId: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];

      const partnerRows = await (db as any).execute(sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) return [];

      // Only project owner or admin can see all bids
      const projectRows = await (db as any).execute(sql`SELECT submittingPartnerId FROM bidBoardProjects WHERE id = ${input.projectId} LIMIT 1`);
      const project = (projectRows.rows || projectRows)[0];
      if (!project) return [];
      if (project.submittingPartnerId !== partner.id && ctx.user.role !== "admin") return [];

      const rows = await (db as any).execute(sql`
        SELECT b.*, p.businessName, p.tier, p.rating, p.reviewCount, p.priorityScore,
               pv.trustScore, pv.badgeLevel
        FROM bidSubmissions b
        JOIN partners p ON b.biddingPartnerId = p.id
        LEFT JOIN partnerVerifications pv ON p.id = pv.partnerId
        WHERE b.projectId = ${input.projectId} AND b.status != 'withdrawn'
        ORDER BY b.bidAmount ASC
      `);
      return rows.rows || rows;
    }),

  // ── Award a bid ─────────────────────────────────────────────────────────────
  awardBid: protectedProcedure
    .input(z.object({
      projectId: z.number().int().positive(),
      bidId: z.number().int().positive(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const partnerRows = await (db as any).execute(sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) throw new TRPCError({ code: "FORBIDDEN" });

      const projectRows = await (db as any).execute(sql`
        SELECT * FROM bidBoardProjects WHERE id = ${input.projectId} AND submittingPartnerId = ${partner.id} LIMIT 1
      `);
      const project = (projectRows.rows || projectRows)[0];
      if (!project) throw new TRPCError({ code: "NOT_FOUND" });

      const bidRows = await (db as any).execute(sql`SELECT * FROM bidSubmissions WHERE id = ${input.bidId} AND projectId = ${input.projectId} LIMIT 1`);
      const bid = (bidRows.rows || bidRows)[0];
      if (!bid) throw new TRPCError({ code: "NOT_FOUND" });

      // Award bid
      await (db as any).execute(sql`UPDATE bidSubmissions SET status = 'awarded', awardedAt = NOW() WHERE id = ${input.bidId}`);
      await (db as any).execute(sql`UPDATE bidSubmissions SET status = 'rejected' WHERE projectId = ${input.projectId} AND id != ${input.bidId} AND status = 'submitted'`);
      await (db as any).execute(sql`UPDATE bidBoardProjects SET status = 'awarded', awardedAt = NOW(), awardedToBidId = ${input.bidId} WHERE id = ${input.projectId}`);

      // Create contract stub
      const platformFeeRate = 0.10; // 10% for project work
      const contractResult = await (db as any).execute(sql`
        INSERT INTO projectContracts (
          projectId, bidId, submittingPartnerId, winningPartnerId,
          contractStatus, contractAmount, platformFeeRate, platformFeeAmount,
          scoutCommissionAmount, projectStartDate
        ) VALUES (
          ${input.projectId}, ${input.bidId}, ${partner.id}, ${bid.biddingPartnerId},
          'draft', ${bid.bidAmount}, ${platformFeeRate},
          ${bid.bidAmount * platformFeeRate},
          ${bid.bidAmount * platformFeeRate * parseFloat(project.scoutCommissionRate || "0.048")},
          ${bid.startDateProposed ?? null}
        )
      `);

      // Notify winning partner
      await createPartnerNotification({
        partnerId: bid.biddingPartnerId,
        type: "new_lead",
        title: `🎉 Your bid was awarded!`,
        message: `You won the bid for "${project.projectTitle}". A contract is being prepared. Check your Bid Board.`,
        actionUrl: `/dashboard/bid-board/${input.projectId}`,
      });

      return { success: true, message: "Bid awarded. Contract draft created." };
    }),

  // ── My submitted bids ───────────────────────────────────────────────────────
  getMyBids: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    const partnerRows = await (db as any).execute(sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`);
    const partner = (partnerRows.rows || partnerRows)[0];
    if (!partner) return [];
    const rows = await (db as any).execute(sql`
      SELECT b.*, p.projectTitle, p.propertyAddress, p.totalEstimatedValue, p.propertyType, p.status as projectStatus
      FROM bidSubmissions b
      JOIN bidBoardProjects p ON b.projectId = p.id
      WHERE b.biddingPartnerId = ${partner.id}
      ORDER BY b.submittedAt DESC LIMIT 50
    `);
    return rows.rows || rows;
  }),

  // ── My posted projects ──────────────────────────────────────────────────────
  getMyProjects: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    const partnerRows = await (db as any).execute(sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`);
    const partner = (partnerRows.rows || partnerRows)[0];
    if (!partner) return [];
    const rows = await (db as any).execute(sql`
      SELECT p.*,
        (SELECT COUNT(*) FROM bidSubmissions b WHERE b.projectId = p.id AND b.status != 'withdrawn') as bidCount
      FROM bidBoardProjects p
      WHERE p.submittingPartnerId = ${partner.id}
      ORDER BY p.createdAt DESC LIMIT 50
    `);
    return rows.rows || rows;
  }),
});
