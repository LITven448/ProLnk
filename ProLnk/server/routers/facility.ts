/**
 * Facility Router — Commercial/School/Hospital Verified Vendor Access
 *
 * Facilities (schools, hospitals, HOAs, commercial buildings) can register
 * and access ProLnk's pre-verified vendor network. They set their own
 * requirements; the system auto-matches companies whose Briefcases meet them.
 *
 * Revenue: Facility subscription fee ($199-499/month) + commission on jobs booked.
 */

import { z } from "zod";
import { sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";

export const facilityRouter = router({

  // ── Register a facility ──────────────────────────────────────────────────────
  register: publicProcedure
    .input(z.object({
      facilityName: z.string().min(2).max(255),
      facilityType: z.enum(["school","hospital","hoa","commercial","government","residential_complex","other"]),
      contactName: z.string().min(2).max(255),
      contactEmail: z.string().email(),
      contactPhone: z.string().max(30).optional(),
      address: z.string().max(500).optional(),
      city: z.string().max(100).optional(),
      state: z.string().max(50).optional(),
      zip: z.string().max(20).optional(),
      website: z.string().url().optional(),
      facilityCount: z.number().int().default(1),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const result = await (db as any).execute(sql`
        INSERT INTO facilityAccounts (
          facilityName, facilityType, contactName, contactEmail, contactPhone,
          address, city, state, zip, website, facilityCount, status, subscriptionTier
        ) VALUES (
          ${input.facilityName}, ${input.facilityType},
          ${input.contactName}, ${input.contactEmail}, ${input.contactPhone ?? null},
          ${input.address ?? null}, ${input.city ?? null}, ${input.state ?? null}, ${input.zip ?? null},
          ${input.website ?? null}, ${input.facilityCount}, 'pending', 'basic'
        )
      `);
      const facilityId = (result.rows || result).insertId ?? result.insertId;

      // Set default requirements based on facility type
      const defaults = {
        school: { minGL: 2000000, requiresBg: true, requiresOsha: true, clearanceLevel: "school" },
        hospital: { minGL: 2000000, requiresBg: true, requiresOsha: false, clearanceLevel: "healthcare" },
        government: { minGL: 2000000, requiresBg: true, requiresOsha: true, clearanceLevel: "government" },
        hoa: { minGL: 1000000, requiresBg: false, requiresOsha: false, clearanceLevel: "residential" },
        commercial: { minGL: 2000000, requiresBg: false, requiresOsha: false, clearanceLevel: "commercial" },
        residential_complex: { minGL: 1000000, requiresBg: false, requiresOsha: false, clearanceLevel: "commercial" },
        other: { minGL: 1000000, requiresBg: false, requiresOsha: false, clearanceLevel: "commercial" },
      };
      const req = defaults[input.facilityType];

      await (db as any).execute(sql`
        INSERT INTO facilityRequirements (
          facilityId, minGeneralLiability, requiresWorkersComp, requiresBackgroundCheck,
          requiresOsha, requiredClearanceLevel
        ) VALUES (
          ${facilityId}, ${req.minGL}, 1, ${req.requiresBg ? 1 : 0},
          ${req.requiresOsha ? 1 : 0}, ${req.clearanceLevel}
        )
      `);

      return { facilityId, message: "Facility registered. We'll review your account within 1-2 business days." };
    }),

  // ── Search verified vendors ──────────────────────────────────────────────────
  // Facilities use this to find pre-vetted contractors for their needs
  searchVendors: protectedProcedure
    .input(z.object({
      facilityId: z.number().int().positive(),
      tradeType: z.string().optional(),
      zip: z.string().optional(),
      minScore: z.number().default(60),
    }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];

      // Get facility requirements
      const reqRows = await (db as any).execute(sql`
        SELECT fr.*, fa.status as facilityStatus
        FROM facilityRequirements fr
        JOIN facilityAccounts fa ON fr.facilityId = fa.id
        WHERE fr.facilityId = ${input.facilityId}
        LIMIT 1
      `);
      const requirements = (reqRows.rows || reqRows)[0];
      if (!requirements || requirements.facilityStatus !== "active") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Facility access not active" });
      }

      // Find matching briefcases
      const tradeFilter = input.tradeType ? sql`AND LOWER(p.businessType) LIKE LOWER(CONCAT('%', ${input.tradeType}, '%'))` : sql`1=1`;

      const rows = await (db as any).execute(sql`
        SELECT
          cb.id as briefcaseId, cb.briefcaseSlug, cb.briefcaseScore, cb.status,
          cb.generalLiabilityAmount, cb.workersCompAmount, cb.clearanceLevels,
          cb.lastReviewedAt, cb.generalLiabilityExpiresAt,
          p.id as partnerId, p.businessName, p.businessType, p.description,
          p.rating, p.reviewCount, p.tier, p.website,
          (SELECT COUNT(*) FROM proPassCards pp WHERE pp.partnerId = p.id AND pp.status = 'active') as activePassCount
        FROM companyBriefcases cb
        JOIN partners p ON cb.partnerId = p.id
        WHERE cb.status = 'active'
          AND cb.briefcaseScore >= ${input.minScore}
          AND cb.generalLiabilityAmount >= ${requirements.minGeneralLiability}
          AND (${requirements.requiresWorkersComp} = 0 OR cb.workersCompStatus = 'verified')
          AND ${tradeFilter}
        ORDER BY cb.briefcaseScore DESC, p.rating DESC
        LIMIT 20
      `);

      return rows.rows || rows;
    }),

  // ── Pre-approve a vendor ─────────────────────────────────────────────────────
  approveVendor: protectedProcedure
    .input(z.object({
      facilityId: z.number().int().positive(),
      briefcaseId: z.number().int().positive(),
      notes: z.string().max(500).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000); // 1 year

      await (db as any).execute(sql`
        INSERT INTO facilityApprovals (facilityId, briefcaseId, status, approvedAt, approvedBy, expiresAt, notes)
        VALUES (${input.facilityId}, ${input.briefcaseId}, 'approved', NOW(), ${ctx.user.id}, ${expiresAt}, ${input.notes ?? null})
        ON DUPLICATE KEY UPDATE
          status = 'approved', approvedAt = NOW(), expiresAt = ${expiresAt}, notes = ${input.notes ?? null}
      `);

      return { success: true, message: "Vendor approved for your facility for 1 year." };
    }),

  // ── Get facility's approved vendor list ──────────────────────────────────────
  getApprovedVendors: protectedProcedure
    .input(z.object({ facilityId: z.number().int().positive() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      const rows = await (db as any).execute(sql`
        SELECT fa.*, cb.briefcaseScore, cb.briefcaseSlug, cb.generalLiabilityAmount,
               cb.generalLiabilityExpiresAt, p.businessName, p.businessType, p.rating
        FROM facilityApprovals fa
        JOIN companyBriefcases cb ON fa.briefcaseId = cb.id
        JOIN partners p ON cb.partnerId = p.id
        WHERE fa.facilityId = ${input.facilityId}
          AND fa.status = 'approved'
          AND fa.expiresAt > NOW()
        ORDER BY p.businessName
      `);
      return rows.rows || rows;
    }),
});
