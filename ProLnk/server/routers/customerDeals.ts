/**
 * Customer Deals Router -- Sprint 1
 *
 * Handles the Customer Deal Page lifecycle:
 * - Creating a deal (admin triggers after photo approval)
 * - Public deal page lookup by token (no auth required)
 * - Homeowner engagement tracking (view, schedule, decline)
 * - Admin deal management
 * - Partner review submission
 */

import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { sql, eq, and, lt, inArray, isNotNull } from "drizzle-orm";
import { customerDeals } from "../../drizzle/schema";
import crypto from "crypto";
import { sendDealNotification, sendGoogleReviewRequest } from "../notifications";

// --- Helpers -----------------------------------------------------------------

function generateDealToken(): string {
  return crypto.randomBytes(24).toString("base64url").slice(0, 32);
}

async function rawQuery(query: string, params: any[] = []) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  // Use drizzle's execute for raw SQL
  const result = await (db as any).execute(sql.raw(
    query.replace(/\?/g, () => {
      const p = params.shift();
      if (p === null || p === undefined) return "NULL";
      if (typeof p === "number") return String(p);
      if (p instanceof Date) return `'${p.toISOString().slice(0, 19).replace("T", " ")}'`;
      return `'${String(p).replace(/'/g, "''")}'`;
    })
  ));
  return result.rows || result;
}

// --- Router ------------------------------------------------------------------

export const customerDealsRouter = router({

  // -- Public: Get deal by token (no auth -- homeowner visits this) -------------
  getByToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const rows = await (db as any).execute(sql`
        SELECT 
          cd.*,
          rp.businessName AS receivingPartnerName,
          rp.businessType AS receivingPartnerType,
          rp.contactPhone AS receivingPartnerPhone,
          rp.website AS receivingPartnerWebsite,
          rp.description AS receivingPartnerDescription,
          rp.tier AS receivingPartnerTier,
          rp.serviceArea AS receivingPartnerServiceArea,
          sp.businessName AS referringPartnerName,
          sp.businessType AS referringPartnerType
        FROM customerDeals cd
        LEFT JOIN partners rp ON cd.receivingPartnerId = rp.id
        LEFT JOIN partners sp ON cd.referringPartnerId = sp.id
        WHERE cd.token = ${input.token}
        LIMIT 1
      `);

      const deal = (rows.rows || rows)[0];
      if (!deal) return null;

      // Check expiry
      const isExpired = deal.expiresAt && new Date(deal.expiresAt) < new Date();
      if (isExpired && deal.status === "sent") {
        await (db as any).execute(sql`
          UPDATE customerDeals SET status = 'expired', updatedAt = NOW() WHERE token = ${input.token}
        `);
        deal.status = "expired";
      }

      // Get partner reviews
      let reviews: any[] = [];
      let avgRating = "0.0";
      let reviewCount = 0;

      if (deal.receivingPartnerId) {
        const reviewRows = await (db as any).execute(sql`
          SELECT rating, reviewText, ratingPunctuality, ratingQuality,
                 ratingCommunication, ratingValue, homeownerName, createdAt
          FROM partnerReviews
          WHERE partnerId = ${deal.receivingPartnerId} AND isPublic = 1 AND flagged = 0
          ORDER BY createdAt DESC LIMIT 10
        `);
        reviews = reviewRows.rows || reviewRows;

        const ratingRows = await (db as any).execute(sql`
          SELECT AVG(rating) as avgRating, COUNT(*) as reviewCount
          FROM partnerReviews
          WHERE partnerId = ${deal.receivingPartnerId} AND isPublic = 1 AND flagged = 0
        `);
        const rData = (ratingRows.rows || ratingRows)[0];
        avgRating = parseFloat(rData?.avgRating || "0").toFixed(1);
        reviewCount = rData?.reviewCount || 0;
      }

      return { ...deal, reviews, avgRating, reviewCount, isExpired };
    }),

  // -- Public: Track page view --------------------------------------------------
  trackView: publicProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { success: false };
      const now = new Date();
      await (db as any).execute(sql`
        UPDATE customerDeals
        SET viewCount = viewCount + 1,
            firstViewedAt = COALESCE(firstViewedAt, ${now}),
            lastViewedAt = ${now},
            status = CASE WHEN status = 'sent' THEN 'viewed' ELSE status END,
            updatedAt = NOW()
        WHERE token = ${input.token}
      `);
      return { success: true };
    }),

  // -- Public: Homeowner submits contact info to schedule ------------------------
  submitContact: publicProcedure
    .input(z.object({
      token: z.string(),
      homeownerName: z.string().min(1),
      homeownerEmail: z.string().email(),
      homeownerPhone: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { success: false, error: "Database unavailable" };

      // Check deal exists and is not expired/declined
      const rows = await (db as any).execute(sql`
        SELECT id, status, expiresAt FROM customerDeals WHERE token = ${input.token} LIMIT 1
      `);
      const deal = (rows.rows || rows)[0];
      if (!deal) return { success: false, error: "Deal not found" };
      if (deal.status === "expired") return { success: false, error: "This offer has expired" };
      if (deal.status === "declined") return { success: false, error: "This offer was declined" };

      await (db as any).execute(sql`
        UPDATE customerDeals
        SET homeownerName = ${input.homeownerName},
            homeownerEmail = ${input.homeownerEmail},
            homeownerPhone = ${input.homeownerPhone || null},
            status = CASE WHEN status IN ('sent','viewed') THEN 'scheduled' ELSE status END,
            scheduledAt = COALESCE(scheduledAt, NOW()),
            updatedAt = NOW()
        WHERE token = ${input.token}
      `);

      // Send confirmation SMS to homeowner + alert to assigned partner
      try {
        const fullRows = await (db as any).execute(sql`
          SELECT cd.issueType, cd.issueCategory, cd.receivingPartnerId,
                 rp.businessName AS partnerName, rp.contactPhone AS partnerPhone
          FROM customerDeals cd
          LEFT JOIN partners rp ON cd.receivingPartnerId = rp.id
          WHERE cd.token = ${input.token} LIMIT 1
        `);
        const fullDeal = (fullRows.rows || fullRows)[0];
        if (fullDeal && input.homeownerPhone) {
          // Homeowner confirmation SMS
          const { sendDealNotification: _unused, ...notifs } = await import('../notifications');
          const smsBody = `Hi ${input.homeownerName.split(' ')[0]}! You're confirmed with ${fullDeal.partnerName ?? 'your ProLnk pro'} for ${fullDeal.issueType ?? 'your home service'}. They'll reach out within 24 hours. Questions? Reply STOP to opt out. -- ProLnk`;
          // Fire-and-forget SMS (no Twilio creds in dev = no-op)
          import('../notifications').then(({ sendDealNotification: _n }) => {
            // Use raw fetch to Twilio if creds exist
            const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID;
            const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN;
            const TWILIO_FROM = process.env.TWILIO_PHONE_NUMBER;
            if (TWILIO_SID && TWILIO_TOKEN && TWILIO_FROM) {
              const e164 = input.homeownerPhone!.replace(/\D/g, '');
              const to = e164.length === 10 ? `+1${e164}` : `+${e164}`;
              const body = new URLSearchParams({ To: to, From: TWILIO_FROM, Body: smsBody });
              fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
                method: 'POST',
                headers: {
                  Authorization: `Basic ${Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString('base64')}`,
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: body.toString(),
              }).catch(() => {});
            } else {
              console.log(`[SMS] Homeowner confirmation (no Twilio creds): ${smsBody.slice(0, 80)}...`);
            }
          }).catch(() => {});
        }
        // Notify assigned partner via in-app notification
        if (fullDeal?.receivingPartnerId) {
          const { createPartnerNotification: cpn } = await import('../db');
          const { partners: partnersTable } = await import('../../drizzle/schema');
          const { eq: eqFn } = await import('drizzle-orm');
          const [pExists] = await db.select({ id: partnersTable.id }).from(partnersTable).where(eqFn(partnersTable.id, fullDeal.receivingPartnerId)).limit(1);
          if (pExists) {
            await cpn({
              partnerId: fullDeal.receivingPartnerId,
              type: 'new_lead',
              title: 'Homeowner Confirmed — Contact Submitted',
              message: `${input.homeownerName} confirmed interest in ${fullDeal.issueType ?? 'your service'}. They expect you to reach out within 24 hours.`,
              actionUrl: '/dashboard/leads',
              metadata: { homeownerName: input.homeownerName, homeownerPhone: input.homeownerPhone },
            });
          }
        }
      } catch (notifErr) {
        console.warn('[CustomerDeals] Failed to send confirmation notifications:', notifErr);
      }

      return { success: true };
    }),
  // -- Public: Homeowner declines the offerr -------------------------------------
  decline: publicProcedure
    .input(z.object({ token: z.string(), reason: z.string().optional() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { success: false };
      await (db as any).execute(sql`
        UPDATE customerDeals
        SET status = 'declined', updatedAt = NOW()
        WHERE token = ${input.token} AND status NOT IN ('job_closed','accepted')
      `);
      return { success: true };
    }),

  // -- Public: Submit a review after job completion -----------------------------
  submitReview: publicProcedure
    .input(z.object({
      token: z.string(),
      rating: z.number().min(1).max(5),
      reviewText: z.string().optional(),
      ratingPunctuality: z.number().min(1).max(5).optional(),
      ratingQuality: z.number().min(1).max(5).optional(),
      ratingCommunication: z.number().min(1).max(5).optional(),
      ratingValue: z.number().min(1).max(5).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { success: false, error: "Database unavailable" };

      const rows = await (db as any).execute(sql`
        SELECT id, receivingPartnerId, homeownerName, homeownerEmail
        FROM customerDeals WHERE token = ${input.token} LIMIT 1
      `);
      const deal = (rows.rows || rows)[0];
      if (!deal || !deal.receivingPartnerId) return { success: false, error: "Deal not found" };

      await (db as any).execute(sql`
        INSERT INTO partnerReviews
        (dealId, partnerId, homeownerName, homeownerEmail, rating, reviewText,
         ratingPunctuality, ratingQuality, ratingCommunication, ratingValue)
        VALUES (
          ${deal.id}, ${deal.receivingPartnerId},
          ${deal.homeownerName || null}, ${deal.homeownerEmail || null},
          ${input.rating}, ${input.reviewText || null},
          ${input.ratingPunctuality || null}, ${input.ratingQuality || null},
          ${input.ratingCommunication || null}, ${input.ratingValue || null}
        )
      `);

      if (input.rating >= 4) {
        await (db as any).execute(sql`
          UPDATE partnerReviews
          SET googleReviewRequested = 1, googleReviewRequestedAt = NOW()
          WHERE dealId = ${deal.id} AND partnerId = ${deal.receivingPartnerId}
          ORDER BY id DESC LIMIT 1
        `);
      }

      return { success: true, requestGoogleReview: input.rating >= 4 };
    }),

  // -- Public: Homeowner signs the deal (e-signature capture) -----------------
  saveSignature: publicProcedure
    .input(z.object({
      token: z.string(),
      signerName: z.string().min(1),
      signatureData: z.string().min(10), // base64 PNG data URL
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { success: false, error: "Database unavailable" };
      const rows = await (db as any).execute(sql`
        SELECT id, status FROM customerDeals WHERE token = ${input.token} LIMIT 1
      `);
      const deal = (rows.rows || rows)[0];
      if (!deal) return { success: false, error: "Deal not found" };
      if (["declined", "expired"].includes(deal.status)) {
        return { success: false, error: "This deal is no longer active" };
      }
      await (db as any).execute(sql`
        UPDATE customerDeals
        SET signatureData = ${input.signatureData},
            signerName = ${input.signerName},
            signedAt = ${Math.floor(Date.now() / 1000)},
            status = 'accepted',
            updatedAt = NOW()
        WHERE token = ${input.token}
      `);
      return { success: true };
    }),

  // -- Protected: Admin creates a deal from an approved opportunity -------------
  createDeal: protectedProcedure
    .input(z.object({
      opportunityId: z.number(),
      referringPartnerId: z.number(),
      receivingPartnerId: z.number().optional(),
      issueType: z.string(),
      issueCategory: z.string(),
      issueDescription: z.string(),
      issueDescriptionShort: z.string().optional(),
      photoUrl: z.string().optional(),
      aiConfidence: z.number().optional(),
      estimatedValueLow: z.number().optional(),
      estimatedValueHigh: z.number().optional(),
      homeownerMessageSnippet: z.string().optional(),
      homeownerAddress: z.string().optional(),
      homeownerCity: z.string().optional(),
      homeownerZip: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      const token = generateDealToken();
      const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

      await (db as any).execute(sql`
        INSERT INTO customerDeals
        (token, opportunityId, referringPartnerId, receivingPartnerId,
         issueType, issueCategory, issueDescription, issueDescriptionShort,
         photoUrl, aiConfidence, estimatedValueLow, estimatedValueHigh,
         homeownerMessageSnippet, homeownerAddress, homeownerCity, homeownerZip,
         status, expiresAt)
        VALUES (
          ${token}, ${input.opportunityId}, ${input.referringPartnerId},
          ${input.receivingPartnerId || null},
          ${input.issueType}, ${input.issueCategory}, ${input.issueDescription},
          ${input.issueDescriptionShort || null},
          ${input.photoUrl || null}, ${input.aiConfidence || null},
          ${input.estimatedValueLow || null}, ${input.estimatedValueHigh || null},
          ${input.homeownerMessageSnippet || null},
          ${input.homeownerAddress || null}, ${input.homeownerCity || null},
          ${input.homeownerZip || null},
          'draft', ${expiresAt}
        )
      `);

      return { success: true, token, dealUrl: `/deal/${token}` };
    }),

  // -- Protected: Admin lists all deals -----------------------------------------
  listDeals: protectedProcedure
    .input(z.object({
      status: z.string().optional(),
      limit: z.number().default(50),
      offset: z.number().default(0),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { deals: [], total: 0 };

      const rows = await (db as any).execute(sql`
        SELECT
          cd.id, cd.token, cd.status, cd.issueType, cd.issueCategory,
          cd.issueDescriptionShort, cd.photoUrl, cd.aiConfidence,
          cd.estimatedValueLow, cd.estimatedValueHigh,
          cd.homeownerName, cd.homeownerCity, cd.homeownerZip,
          cd.viewCount, cd.scheduledAt, cd.expiresAt,
          cd.emailSentAt, cd.smsSentAt, cd.createdAt,
          rp.businessName AS receivingPartnerName,
          sp.businessName AS referringPartnerName
        FROM customerDeals cd
        LEFT JOIN partners rp ON cd.receivingPartnerId = rp.id
        LEFT JOIN partners sp ON cd.referringPartnerId = sp.id
        ORDER BY cd.createdAt DESC
        LIMIT ${input.limit} OFFSET ${input.offset}
      `);

      const countRows = await (db as any).execute(sql`
        SELECT COUNT(*) as total FROM customerDeals
      `);

      return {
        deals: rows.rows || rows,
        total: (countRows.rows || countRows)[0]?.total || 0,
      };
    }),

  // -- Protected: Admin sends deal notification (email + SMS) -----------------
  sendDeal: protectedProcedure
    .input(z.object({ token: z.string() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      const rows = await (db as any).execute(sql`
        SELECT
          cd.*,
          rp.businessName AS partnerName,
          rp.googlePlaceId AS googlePlaceId
        FROM customerDeals cd
        LEFT JOIN partners rp ON cd.receivingPartnerId = rp.id
        WHERE cd.token = ${input.token}
        LIMIT 1
      `);
      const deal = (rows.rows || rows)[0];
      if (!deal) throw new Error("Deal not found");

      const baseUrl = process.env.APP_BASE_URL || "https://prolnk.io";
      const result = await sendDealNotification({
        homeownerName: deal.homeownerName || "Homeowner",
        homeownerEmail: deal.homeownerEmail || undefined,
        homeownerPhone: deal.homeownerPhone || undefined,
        dealUrl: `${baseUrl}/deal/${deal.token}`,
        issueType: deal.issueType,
        issueDescription: deal.issueDescription,
        partnerName: deal.partnerName || "a local pro",
        estimatedValueLow: deal.estimatedValueLow ? parseFloat(deal.estimatedValueLow) : undefined,
        estimatedValueHigh: deal.estimatedValueHigh ? parseFloat(deal.estimatedValueHigh) : undefined,
        expiresAt: deal.expiresAt ? new Date(deal.expiresAt) : undefined,
      });

      // Update deal status and tracking timestamps
      await (db as any).execute(sql`
        UPDATE customerDeals
        SET status = CASE WHEN status = 'draft' THEN 'sent' ELSE status END,
            emailSentAt = CASE WHEN ${result.emailSent} THEN NOW() ELSE emailSentAt END,
            smsSentAt = CASE WHEN ${result.smsSent} THEN NOW() ELSE smsSentAt END,
            updatedAt = NOW()
        WHERE token = ${input.token}
      `);

      return { success: true, ...result };
    }),

  // -- Protected: Admin closes a job and records actual value -------------------
  closeJob: protectedProcedure
    .input(z.object({
      token: z.string(),
      actualJobValue: z.number(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      // Fetch deal info before closing for check-in scheduling
      const [dealRows] = await (db as any).execute(sql`
        SELECT cd.id, cd.homeownerEmail, cd.homeownerName, cd.homeownerAddress,
               cd.issueType, rp.businessName AS partnerName
        FROM customerDeals cd
        LEFT JOIN partners rp ON cd.receivingPartnerId = rp.id
        WHERE cd.token = ${input.token} LIMIT 1
      `) as any[];
      await (db as any).execute(sql`
        UPDATE customerDeals
        SET status = 'job_closed', actualJobValue = ${input.actualJobValue},
            jobClosedAt = NOW(), updatedAt = NOW()
        WHERE token = ${input.token}
      `);
      // Schedule 48-hour check-in email for the homeowner
      const deal = dealRows?.[0];
      if (deal?.homeownerEmail) {
        try {
          const { scheduleCheckinEmail } = await import("../checkin-scheduler");
          await scheduleCheckinEmail({
            opportunityId: deal.id,
            homeownerEmail: deal.homeownerEmail,
            homeownerName: deal.homeownerName || "Homeowner",
            partnerName: deal.partnerName || "your service professional",
            serviceAddress: deal.homeownerAddress || "your property",
            serviceCategory: deal.issueType || "home service",
          });
        } catch (err) {
          console.warn("[CustomerDeals] Failed to schedule check-in:", err);
        }
      }
      return { success: true };
    }),

  // -- Public: Homeowner confirms job is done (triggers commission release) --------
  // Patent Core: commission triggers ONLY when homeowner confirms, not when partner reports
  confirmJobDone: publicProcedure
    .input(z.object({
      token: z.string(),
      rating: z.number().min(1).max(5).optional(),
      note: z.string().max(500).optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      // Fetch deal to validate it exists and is in a confirmable state
      const [rows] = await (db as any).execute(sql`
        SELECT id, opportunityId, status, receivingPartnerId, referringPartnerId,
               actualJobValue, estimatedValueHigh, estimatedValueLow,
               homeownerEmail, homeownerName, issueType
        FROM customerDeals
        WHERE token = ${input.token} LIMIT 1
      `) as any[];
      const deal = rows?.[0] ?? rows;
      if (!deal?.id) throw new Error("Deal not found");
      // Allow confirmation if job is in accepted/scheduled/estimate_done state
      const confirmableStatuses = ["accepted", "scheduled", "estimate_done", "sent", "viewed"];
      if (!confirmableStatuses.includes(deal.status) && deal.status !== "job_closed") {
        throw new Error(`Deal cannot be confirmed in status: ${deal.status}`);
      }
      // Update deal: mark homeowner confirmed + close job
      await (db as any).execute(sql`
        UPDATE customerDeals
        SET homeownerConfirmedAt = NOW(),
            homeownerConfirmRating = ${input.rating ?? null},
            homeownerConfirmNote = ${input.note ?? null},
            status = 'job_closed',
            jobClosedAt = COALESCE(jobClosedAt, NOW()),
            updatedAt = NOW()
        WHERE token = ${input.token}
      `);
      // Trigger commission calculation if job value is known
      const jobValue = deal.actualJobValue || deal.estimatedValueHigh || deal.estimatedValueLow;
      if (jobValue && deal.receivingPartnerId) {
        try {
          const { closeOpportunityWithJobValue } = await import("../db");
          if (deal.opportunityId) {
            await closeOpportunityWithJobValue(deal.opportunityId, Number(jobValue), deal.receivingPartnerId);
          }
        } catch (err) {
          console.warn("[ConfirmJobDone] Commission calc failed:", err);
        }
      }
      // Notify receiving partner
      if (deal.receivingPartnerId) {
        try {
          const { createPartnerNotification } = await import("../db");
          await createPartnerNotification({
            partnerId: deal.receivingPartnerId,
            type: "system",
            title: "Homeowner Confirmed Job Complete",
            message: `${deal.homeownerName || "Your homeowner"} confirmed the ${deal.issueType || "job"} is complete. Commission has been calculated.`,
            actionUrl: "/dashboard/earnings",
          });
        } catch (err) {
          console.warn("[ConfirmJobDone] Notification failed:", err);
        }
      }
      return { success: true, message: "Job confirmed. Thank you for your feedback!" };
    }),

  // -- Public: Get all deals for a homeowner by email ----------------------------
  // Used by TrustyPro homeowner portal to show real deals from admin
  getForHomeowner: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      const rows = await (db as any).execute(sql`
        SELECT
          cd.id, cd.token, cd.issueType, cd.issueCategory, cd.issueDescription,
          cd.issueDescriptionShort, cd.aiConfidence, cd.status,
          cd.estimatedValueLow, cd.estimatedValueHigh,
          cd.homeownerName, cd.homeownerCity, cd.homeownerAddress,
          cd.photoUrl, cd.expiresAt, cd.createdAt,
          cd.homeownerMessageSnippet,
          rp.businessName AS proName,
          rp.rating AS proRating,
          sp.businessName AS referredBy
        FROM customerDeals cd
        LEFT JOIN partners rp ON cd.receivingPartnerId = rp.id
        LEFT JOIN partners sp ON cd.referringPartnerId = sp.id
        WHERE cd.homeownerEmail = ${input.email}
          AND cd.status NOT IN ('draft', 'expired')
        ORDER BY cd.createdAt DESC
        LIMIT 50
      `);
      return (rows.rows || rows) as any[];
    }),

  // -- Protected: Generate surgical AI fix for a specific issue in a deal photo --
  // Patent core claim: replace ONLY the broken element, leave everything else untouched.
  generateSurgicalFix: protectedProcedure
    .input(z.object({
      token: z.string(),
      issueType: z.string(),
      issueDescription: z.string(),
      photoUrl: z.string().url(),
      customPrompt: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database unavailable');

      // Build a surgical prompt that names the exact element to replace
      // and explicitly protects everything else from being changed
      const issueLabel = input.issueType
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c: string) => c.toUpperCase());

      const surgicalPrompt = input.customPrompt ||
        `Replace ONLY the ${issueLabel.toLowerCase()} in this photo with a brand new, professionally installed replacement. ` +
        `The replacement should be modern, clean, and appropriate for the home style. ` +
        `Do NOT change the house, driveway, landscaping, trees, sky, neighboring structures, ` +
        `paint color, windows, doors, or any other element. ` +
        `Only the ${issueLabel.toLowerCase()} should look different. ` +
        `The result should look like a professional contractor just completed the repair. ` +
        `Photorealistic, same lighting, same angle, same perspective as the original photo.`;

      const { generateImage } = await import('../_core/imageGeneration');
      const { url: fixedImageUrl } = await generateImage({
        prompt: surgicalPrompt,
        originalImages: [{ url: input.photoUrl, mimeType: 'image/jpeg' }],
      });

      // Persist the fix URL and prompt back to the deal record for audit trail
      await (db as any).execute(sql`
        UPDATE customerDeals
        SET aiFixImageUrl = ${fixedImageUrl ?? null},
            aiFixGeneratedAt = NOW(),
            aiFixPrompt = ${surgicalPrompt},
            updatedAt = NOW()
        WHERE token = ${input.token}
      `);

      return {
        fixedImageUrl,
        originalImageUrl: input.photoUrl,
        issueType: input.issueType,
        promptUsed: surgicalPrompt,
      };
    }),

  // -- Protected: Get deal stats for admin dashboard -----------------------------
  getStats: protectedProcedure.query(async () => {
    const db = await getDb();
    if (!db) return {};
    const rows = await (db as any).execute(sql`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft,
        SUM(CASE WHEN status = 'sent' THEN 1 ELSE 0 END) as sent,
        SUM(CASE WHEN status = 'viewed' THEN 1 ELSE 0 END) as viewed,
        SUM(CASE WHEN status = 'scheduled' THEN 1 ELSE 0 END) as scheduled,
        SUM(CASE WHEN status = 'job_closed' THEN 1 ELSE 0 END) as closed,
        SUM(CASE WHEN status = 'declined' THEN 1 ELSE 0 END) as declined,
        SUM(CASE WHEN status = 'expired' THEN 1 ELSE 0 END) as expired,
        SUM(CASE WHEN status = 'job_closed' THEN actualJobValue ELSE 0 END) as totalRevenue
      FROM customerDeals
    `);
    return (rows.rows || rows)[0] || {};
  }),
});

// ---------------------------------------------------------------------------
// Background sweep: expire overdue deals + notify assigned partner
// Called every 5 minutes from server/_core/index.ts
// ---------------------------------------------------------------------------
import { createPartnerNotification } from '../db';
import { partners } from '../../drizzle/schema';

export async function sweepExpiredDeals(): Promise<void> {
  const db = await getDb();
  if (!db) return;
  const now = new Date();

  // Find expired deals using Drizzle ORM (avoids rawQuery interpolation issues)
  const expired = await db
    .select({
      id: customerDeals.id,
      token: customerDeals.token,
      receivingPartnerId: customerDeals.receivingPartnerId,
      issueDescriptionShort: customerDeals.issueDescriptionShort,
      issueType: customerDeals.issueType,
    })
    .from(customerDeals)
    .where(
      and(
        inArray(customerDeals.status, ['sent', 'viewed', 'scheduled']),
        isNotNull(customerDeals.expiresAt),
        lt(customerDeals.expiresAt, now)
      )
    );

  for (const deal of expired) {
    await db
      .update(customerDeals)
      .set({ status: 'expired', updatedAt: now })
      .where(eq(customerDeals.id, deal.id));

    if (deal.receivingPartnerId) {
      // Guard: only notify if partner actually exists (avoids FK constraint errors from stale seeded data)
      const [partnerExists] = await db
        .select({ id: partners.id })
        .from(partners)
        .where(eq(partners.id, deal.receivingPartnerId))
        .limit(1);
      if (partnerExists) {
        const desc = deal.issueDescriptionShort ?? deal.issueType ?? 'a service opportunity';
        await createPartnerNotification({
          partnerId: deal.receivingPartnerId,
          type: 'lead_expired',
          title: 'Deal Expired — No Homeowner Response',
          message: `Your deal for "${desc}" has expired without a homeowner response. Check your pipeline for new opportunities.`,
          actionUrl: '/dashboard/leads',
        });
      }
    }
  }

  console.log(`[CustomerDeals] Swept ${expired.length} expired deal(s) and notified assigned partners`);
}
