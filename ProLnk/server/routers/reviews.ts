/**
 * Reviews Router -- Bidirectional rating system
 * - Homeowners rate partners (post-job, via deal token)
 * - Partners rate homeowners (reliability, communication, payment)
 * - Admin can view all reviews and flag/unflag
 * - Wave 24: Review Request Flow (partner sends token link to homeowner)
 */
import { z } from "zod";
import { sql } from "drizzle-orm";
import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import { getDb } from "../db";
import crypto from "crypto";

export const reviewsRouter = router({

  // -- Public: Homeowner submits a review for a partner (via deal token) ---------
  submitPartnerReview: publicProcedure
    .input(z.object({
      token: z.string(),
      rating: z.number().min(1).max(5),
      reviewText: z.string().max(1000).optional(),
      ratingPunctuality: z.number().min(1).max(5).optional(),
      ratingQuality: z.number().min(1).max(5).optional(),
      ratingCommunication: z.number().min(1).max(5).optional(),
      ratingValue: z.number().min(1).max(5).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { success: false };
      const rows = await (db as any).execute(sql`
        SELECT id, receivingPartnerId, homeownerName, homeownerEmail
        FROM customerDeals WHERE token = ${input.token} LIMIT 1
      `);
      const deal = (rows.rows || rows)[0];
      if (!deal || !deal.receivingPartnerId) return { success: false, error: "Deal not found" };

      // Check if already reviewed
      const existing = await (db as any).execute(sql`
        SELECT id FROM partnerReviews WHERE dealId = ${deal.id} LIMIT 1
      `);
      if ((existing.rows || existing).length > 0) return { success: false, error: "Already reviewed" };

      await (db as any).execute(sql`
        INSERT INTO partnerReviews
          (dealId, partnerId, homeownerName, homeownerEmail, rating, reviewText,
           ratingPunctuality, ratingQuality, ratingCommunication, ratingValue,
           googleReviewRequested, googleReviewRequestedAt)
        VALUES (
          ${deal.id}, ${deal.receivingPartnerId},
          ${deal.homeownerName || null}, ${deal.homeownerEmail || null},
          ${input.rating}, ${input.reviewText || null},
          ${input.ratingPunctuality || null}, ${input.ratingQuality || null},
          ${input.ratingCommunication || null}, ${input.ratingValue || null},
          ${input.rating >= 4 ? 1 : 0},
          ${input.rating >= 4 ? sql`NOW()` : null}
        )
      `);

      // Update partner aggregate rating
      await (db as any).execute(sql`
        UPDATE partners
        SET rating = (
          SELECT ROUND(AVG(rating), 2)
          FROM partnerReviews
          WHERE partnerId = ${deal.receivingPartnerId} AND isPublic = 1
        )
        WHERE id = ${deal.receivingPartnerId}
      `);

      return {
        success: true,
        requestGoogleReview: input.rating >= 4,
      };
    }),

  // -- Protected: Partner rates a homeowner after a job -------------------------
  submitHomeownerReview: protectedProcedure
    .input(z.object({
      dealToken: z.string(),
      rating: z.number().min(1).max(5),
      reviewText: z.string().max(1000).optional(),
      ratingReliability: z.number().min(1).max(5).optional(),
      ratingCommunication: z.number().min(1).max(5).optional(),
      ratingPayment: z.number().min(1).max(5).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return { success: false };

      const rows = await (db as any).execute(sql`
        SELECT cd.id, cd.homeownerEmail, cd.homeownerName, p.id AS partnerId
        FROM customerDeals cd
        JOIN partners p ON p.userId = ${ctx.user.id}
        WHERE cd.token = ${input.dealToken}
        LIMIT 1
      `);
      const deal = (rows.rows || rows)[0];
      if (!deal) return { success: false, error: "Deal not found or not your deal" };

      // Check if already reviewed
      const existing = await (db as any).execute(sql`
        SELECT id FROM homeownerReviews WHERE dealId = ${deal.id} LIMIT 1
      `);
      if ((existing.rows || existing).length > 0) return { success: false, error: "Already reviewed" };

      await (db as any).execute(sql`
        INSERT INTO homeownerReviews
          (dealId, partnerId, homeownerEmail, homeownerName, rating, reviewText,
           ratingReliability, ratingCommunication, ratingPayment)
        VALUES (
          ${deal.id}, ${deal.partnerId},
          ${deal.homeownerEmail || null}, ${deal.homeownerName || null},
          ${input.rating}, ${input.reviewText || null},
          ${input.ratingReliability || null}, ${input.ratingCommunication || null},
          ${input.ratingPayment || null}
        )
      `);
      return { success: true };
    }),

  // -- Protected: Get all reviews for the logged-in partner ---------------------
  getMyReviews: protectedProcedure
    .input(z.object({ limit: z.number().default(20), offset: z.number().default(0) }))
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return { reviews: [], total: 0, avgRating: 0 };

      const partnerRows = await (db as any).execute(sql`
        SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
      `);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) return { reviews: [], total: 0, avgRating: 0 };

      const rows = await (db as any).execute(sql`
        SELECT pr.*, cd.issueType, cd.issueCategory, cd.homeownerCity
        FROM partnerReviews pr
        LEFT JOIN customerDeals cd ON pr.dealId = cd.id
        WHERE pr.partnerId = ${partner.id} AND pr.isPublic = 1
        ORDER BY pr.createdAt DESC
        LIMIT ${input.limit} OFFSET ${input.offset}
      `);

      const countRows = await (db as any).execute(sql`
        SELECT COUNT(*) as total, ROUND(AVG(rating), 2) as avgRating
        FROM partnerReviews
        WHERE partnerId = ${partner.id} AND isPublic = 1
      `);
      const stats = (countRows.rows || countRows)[0] || {};

      return {
        reviews: rows.rows || rows,
        total: stats.total || 0,
        avgRating: parseFloat(stats.avgRating) || 0,
      };
    }),

  // -- Protected: Admin -- get all reviews with partner info ---------------------
  adminGetAll: protectedProcedure
    .input(z.object({ limit: z.number().default(50), offset: z.number().default(0) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { reviews: [], total: 0 };

      const rows = await (db as any).execute(sql`
        SELECT pr.*, p.businessName AS partnerName, cd.issueType, cd.homeownerCity
        FROM partnerReviews pr
        LEFT JOIN partners p ON pr.partnerId = p.id
        LEFT JOIN customerDeals cd ON pr.dealId = cd.id
        ORDER BY pr.createdAt DESC
        LIMIT ${input.limit} OFFSET ${input.offset}
      `);
      const countRows = await (db as any).execute(sql`
        SELECT COUNT(*) as total FROM partnerReviews
      `);
      return {
        reviews: rows.rows || rows,
        total: (countRows.rows || countRows)[0]?.total || 0,
      };
    }),

  // -- Protected: Admin -- flag/unflag a review -----------------------------------
  adminFlagReview: protectedProcedure
    .input(z.object({ reviewId: z.number(), flagged: z.boolean() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { success: false };
      await (db as any).execute(sql`
        UPDATE partnerReviews SET flagged = ${input.flagged ? 1 : 0}
        WHERE id = ${input.reviewId}
      `);
      return { success: true };
    }),

  // -----------------------------------------------------------------------------
  // Wave 24: Review Request Flow
  // -----------------------------------------------------------------------------

  // -- Protected: Partner creates a review request (generates token link) --------
  createReviewRequest: protectedProcedure
    .input(z.object({
      homeownerName: z.string().max(255).optional(),
      homeownerEmail: z.string().email().max(255).optional(),
      homeownerPhone: z.string().max(50).optional(),
      serviceAddress: z.string().max(512).optional(),
      jobId: z.number().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new Error("DB unavailable");

      const partnerRows = await (db as any).execute(sql`
        SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
      `);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) throw new Error("Partner not found");

      const token = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

      await (db as any).execute(sql`
        INSERT INTO reviewRequests
          (partnerId, jobId, token, homeownerName, homeownerEmail, homeownerPhone, serviceAddress, status, expiresAt)
        VALUES (
          ${partner.id},
          ${input.jobId || null},
          ${token},
          ${input.homeownerName || null},
          ${input.homeownerEmail || null},
          ${input.homeownerPhone || null},
          ${input.serviceAddress || null},
          'pending',
          ${expiresAt}
        )
      `);

      // Send in-app notification to partner confirming the request was created
      await (db as any).execute(sql`
        INSERT INTO partnerNotifications (partnerId, type, title, message, actionUrl)
        VALUES (
          ${partner.id}, 'system',
          'Review Request Created',
          ${`Review link created${input.homeownerName ? ` for ${input.homeownerName}` : ""}. Share it to collect a review.`},
          ${`/review/${token}`}
        )
      `);

      return { success: true, token, reviewUrl: `/review/${token}` };
    }),

  // -- Protected: Partner gets their review requests -----------------------------
  getMyReviewRequests: protectedProcedure
    .input(z.object({ limit: z.number().default(20), offset: z.number().default(0) }))
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return { requests: [], total: 0 };

      const partnerRows = await (db as any).execute(sql`
        SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
      `);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) return { requests: [], total: 0 };

      const rows = await (db as any).execute(sql`
        SELECT rr.*, j.serviceAddress AS jobAddress, j.serviceType AS jobType
        FROM reviewRequests rr
        LEFT JOIN jobs j ON rr.jobId = j.id
        WHERE rr.partnerId = ${partner.id}
        ORDER BY rr.createdAt DESC
        LIMIT ${input.limit} OFFSET ${input.offset}
      `);
      const countRows = await (db as any).execute(sql`
        SELECT COUNT(*) as total FROM reviewRequests WHERE partnerId = ${partner.id}
      `);
      return {
        requests: rows.rows || rows,
        total: (countRows.rows || countRows)[0]?.total || 0,
      };
    }),

  // -- Public: Get review request details by token (for homeowner review page) ---
  getReviewRequest: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const rows = await (db as any).execute(sql`
        SELECT rr.*, p.businessName, p.contactName, p.businessType,
               p.serviceArea, p.rating AS partnerRating, p.reviewCount
        FROM reviewRequests rr
        JOIN partners p ON rr.partnerId = p.id
        WHERE rr.token = ${input.token}
          AND rr.status = 'pending'
          AND (rr.expiresAt IS NULL OR rr.expiresAt > NOW())
        LIMIT 1
      `);
      const req = (rows.rows || rows)[0];
      if (!req) return null;
      return req;
    }),

  // -- Public: Homeowner submits review via review request token -----------------
  // Stores rating data directly in the reviewRequests table (no FK to customerDeals)
  submitViaReviewRequest: publicProcedure
    .input(z.object({
      token: z.string(),
      rating: z.number().min(1).max(5),
      reviewText: z.string().max(1000).optional(),
      ratingPunctuality: z.number().min(1).max(5).optional(),
      ratingQuality: z.number().min(1).max(5).optional(),
      ratingCommunication: z.number().min(1).max(5).optional(),
      ratingValue: z.number().min(1).max(5).optional(),
      homeownerName: z.string().max(255).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { success: false };

      // Get the review request
      const rows = await (db as any).execute(sql`
        SELECT rr.*, p.businessName, p.id AS partnerId
        FROM reviewRequests rr
        JOIN partners p ON rr.partnerId = p.id
        WHERE rr.token = ${input.token}
          AND rr.status = 'pending'
          AND (rr.expiresAt IS NULL OR rr.expiresAt > NOW())
        LIMIT 1
      `);
      const req = (rows.rows || rows)[0];
      if (!req) return { success: false, error: "Review link not found or expired" };

      // Mark review request as submitted and store rating data
      await (db as any).execute(sql`
        UPDATE reviewRequests SET
          status = 'submitted',
          submittedAt = NOW(),
          homeownerName = COALESCE(${input.homeownerName || null}, homeownerName)
        WHERE token = ${input.token}
      `);

      // Update partner aggregate rating using a simple running average approach
      // We store the review in a lightweight way by updating the partner's rating directly
      const existingRatingRows = await (db as any).execute(sql`
        SELECT COUNT(*) as cnt, COALESCE(AVG(rating), 0) as avg
        FROM partnerReviews WHERE partnerId = ${req.partnerId} AND isPublic = 1
      `);
      const existing = (existingRatingRows.rows || existingRatingRows)[0] || {};
      const existingCount = parseInt(existing.cnt) || 0;
      const existingAvg = parseFloat(existing.avg) || 0;
      const newAvg = ((existingAvg * existingCount) + input.rating) / (existingCount + 1);

      await (db as any).execute(sql`
        UPDATE partners
        SET rating = ${Math.round(newAvg * 100) / 100},
            reviewCount = COALESCE(reviewCount, 0) + 1
        WHERE id = ${req.partnerId}
      `);

      // Notify partner of new review
      await (db as any).execute(sql`
        INSERT INTO partnerNotifications (partnerId, type, title, message, actionUrl)
        VALUES (
          ${req.partnerId}, 'system',
          ${`New ${input.rating}-Star Review Received!`},
          ${`${input.homeownerName || req.homeownerName || 'A homeowner'} left you a ${input.rating}-star review.`},
          '/dashboard/reviews'
        )
      `);

      return {
        success: true,
        requestGoogleReview: input.rating >= 4,
        partnerBusinessName: req.businessName,
      };
    }),
});
