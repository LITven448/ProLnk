/**
 * Pro Pass Router — Individual Credential System
 *
 * Every person who works for a ProLnk partner company gets a Pro Pass —
 * a digital credential card containing their background check, licenses,
 * certifications, and clearance level.
 *
 * The Pro Pass:
 *   - Has a unique QR code that facility staff scan at the door
 *   - Shows real-time status (active/suspended/expired)
 *   - Tracks clearance levels (residential/commercial/school/healthcare/government)
 *   - Is monitored continuously for new criminal activity via Checkr
 *   - Is reviewed automatically every quarter
 *
 * Pro Passes are included in partner subscription tiers:
 *   Scout: 1 pass included
 *   Pro: 3 passes
 *   Crew: 5 passes
 *   Company: 15 passes
 *   Enterprise: unlimited
 */

import { z } from "zod";
import { sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { storagePut } from "../storage";
import { notifyOwner } from "../_core/notification";
import { nanoid } from "nanoid";

// ─── Pass limits by tier ──────────────────────────────────────────────────────

const TIER_PASS_LIMITS: Record<string, number> = {
  scout:      1,
  pro:        3,
  crew:       5,
  company:    15,
  enterprise: 9999,
};

// ─── Score Calculator ─────────────────────────────────────────────────────────

function calculatePassScore(pass: Record<string, any>): number {
  let score = 0;
  if (pass.backgroundCheckStatus === "clear") score += 35;
  else if (pass.backgroundCheckStatus === "consider") score += 15;
  if (pass.govIdVerifiedAt) score += 15;
  if (pass.contractorLicenseNumber && pass.contractorLicenseExpiresAt) {
    const expiry = new Date(pass.contractorLicenseExpiresAt);
    if (expiry > new Date()) score += 20;
  }
  if (pass.osha10Certified || pass.osha30Certified) score += 10;
  if (pass.primaryTrade) score += 10;
  if (pass.epa608CertType) score += 5;
  if (pass.i9Verified) score += 5;
  return Math.min(100, score);
}

// ─── Quarterly Review Agent ───────────────────────────────────────────────────

export async function runProPassQuarterlyReview(): Promise<{
  reviewed: number;
  flagged: number;
  errors: string[];
}> {
  const db = await getDb();
  if (!db) return { reviewed: 0, flagged: 0, errors: ["Database unavailable"] };

  const result = { reviewed: 0, flagged: 0, errors: [] as string[] };
  const now = new Date();
  const twoYearsAgo = new Date(now.getTime() - 2 * 365 * 24 * 60 * 60 * 1000);

  try {
    const passes = await (db as any).execute(sql`
      SELECT pp.*, p.contactEmail as partnerEmail
      FROM proPassCards pp
      JOIN partners p ON pp.partnerId = p.id
      WHERE pp.status = 'active'
        AND (pp.nextReviewDueAt IS NULL OR pp.nextReviewDueAt <= ${now})
    `);
    const rows = passes.rows || passes;

    for (const pass of rows) {
      try {
        const issues: string[] = [];

        // Check background check age
        if (pass.backgroundCheckDate) {
          const checkDate = new Date(pass.backgroundCheckDate);
          if (checkDate < twoYearsAgo) {
            issues.push("Background check is over 2 years old — renewal required");
          }
        } else if (pass.backgroundCheckStatus !== "not_submitted") {
          issues.push("Background check date not recorded");
        }

        // Check license expiry
        if (pass.contractorLicenseExpiresAt) {
          const expiry = new Date(pass.contractorLicenseExpiresAt);
          const in60Days = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
          if (expiry < now) {
            issues.push("Contractor license EXPIRED");
          } else if (expiry < in60Days) {
            issues.push(`Contractor license expires ${expiry.toLocaleDateString()}`);
          }
        }

        // Recalculate score
        const newScore = calculatePassScore(pass);
        const nextReview = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);

        await (db as any).execute(sql`
          UPDATE proPassCards SET
            passScore = ${newScore},
            lastReviewedAt = ${now},
            nextReviewDueAt = ${nextReview}
          WHERE id = ${pass.id}
        `);

        if (issues.length > 0) {
          await (db as any).execute(sql`
            INSERT INTO partnerNotifications (partnerId, type, title, message, actionUrl, isRead, createdAt)
            VALUES (${pass.partnerId}, 'system', 'Pro Pass Review — Action Required',
                    ${`${pass.firstName} ${pass.lastName}'s Pro Pass has ${issues.length} issue(s): ${issues.join("; ")}`},
                    '/dashboard/pro-passes', 0, ${now})
          `);
          result.flagged++;
        }

        result.reviewed++;
      } catch (err) {
        result.errors.push(`Pass ${pass.id}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  } catch (err) {
    result.errors.push(`Global error: ${err instanceof Error ? err.message : String(err)}`);
  }

  return result;
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const proPassRouter = router({

  // ── Get my company's Pro Passes ─────────────────────────────────────────────
  getMyPasses: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { passes: [], limit: 1, used: 0 };
    const partnerRows = await (db as any).execute(sql`SELECT id, tier FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`);
    const partner = (partnerRows.rows || partnerRows)[0];
    if (!partner) return { passes: [], limit: 1, used: 0 };

    const rows = await (db as any).execute(sql`SELECT * FROM proPassCards WHERE partnerId = ${partner.id} ORDER BY firstName, lastName`);
    const passes = rows.rows || rows;
    const limit = TIER_PASS_LIMITS[partner.tier] ?? 1;

    return { passes, limit, used: passes.length };
  }),

  // ── Create a Pro Pass for an employee ──────────────────────────────────────
  createPass: protectedProcedure
    .input(z.object({
      firstName: z.string().min(1).max(100),
      lastName: z.string().min(1).max(100),
      email: z.string().email().optional(),
      phone: z.string().max(30).optional(),
      role: z.string().max(100).optional(),
      employmentType: z.enum(["employee","contractor","owner"]).default("employee"),
      primaryTrade: z.string().max(100).optional(),
      secondaryTrades: z.array(z.string()).optional(),
      experienceYears: z.number().int().optional(),
      clearanceLevel: z.enum(["residential","commercial","school","healthcare","government"]).default("residential"),
      photoBase64: z.string().optional(),
      emergencyContactName: z.string().max(255).optional(),
      emergencyContactPhone: z.string().max(30).optional(),
      emergencyContactRelation: z.string().max(50).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const partnerRows = await (db as any).execute(sql`SELECT id, tier, status FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner || partner.status !== "approved") throw new TRPCError({ code: "FORBIDDEN" });

      // Check pass limit
      const countRows = await (db as any).execute(sql`SELECT COUNT(*) as cnt FROM proPassCards WHERE partnerId = ${partner.id}`);
      const usedCount = parseInt((countRows.rows || countRows)[0]?.cnt ?? "0");
      const limit = TIER_PASS_LIMITS[partner.tier] ?? 1;
      if (usedCount >= limit) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Your ${partner.tier} plan includes ${limit} Pro Pass${limit === 1 ? "" : "es"}. Upgrade your plan to add more.`
        });
      }

      // Upload photo if provided
      let photoUrl: string | null = null;
      if (input.photoBase64) {
        const buffer = Buffer.from(input.photoBase64.replace(/^data:[^;]+;base64,/, ""), "base64");
        const { url } = await storagePut(`propass-photos/${partner.id}-${Date.now()}.jpg`, buffer, "image/jpeg");
        photoUrl = url;
      }

      // Generate unique pass code
      const passCode = nanoid(16);

      const result = await (db as any).execute(sql`
        INSERT INTO proPassCards (
          partnerId, passCode, firstName, lastName, email, phone, role, employmentType,
          primaryTrade, secondaryTrades, experienceYears, clearanceLevel, photoUrl,
          emergencyContactName, emergencyContactPhone, emergencyContactRelation,
          status, passScore, nextReviewDueAt
        ) VALUES (
          ${partner.id}, ${passCode}, ${input.firstName}, ${input.lastName},
          ${input.email ?? null}, ${input.phone ?? null}, ${input.role ?? null}, ${input.employmentType},
          ${input.primaryTrade ?? null}, ${JSON.stringify(input.secondaryTrades ?? [])},
          ${input.experienceYears ?? null}, ${input.clearanceLevel}, ${photoUrl},
          ${input.emergencyContactName ?? null}, ${input.emergencyContactPhone ?? null},
          ${input.emergencyContactRelation ?? null},
          'pending', 0, ${new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)}
        )
      `);
      const passId = (result.rows || result).insertId ?? result.insertId;

      return {
        passId,
        passCode,
        qrUrl: `/pass/${passCode}`,
        message: `Pro Pass created for ${input.firstName} ${input.lastName}. Add their background check and license to activate.`,
      };
    }),

  // ── Update pass details ─────────────────────────────────────────────────────
  updatePass: protectedProcedure
    .input(z.object({
      passId: z.number().int().positive(),
      // Licenses
      contractorLicenseNumber: z.string().max(100).optional(),
      contractorLicenseState: z.string().max(10).optional(),
      contractorLicenseType: z.string().max(100).optional(),
      contractorLicenseExpiresAt: z.string().optional(),
      // Certifications
      osha10Certified: z.boolean().optional(),
      osha10CertDate: z.string().optional(),
      osha30Certified: z.boolean().optional(),
      osha30CertDate: z.string().optional(),
      epa608CertType: z.string().max(50).optional(),
      epa608CertDate: z.string().optional(),
      electricalLicenseLevel: z.string().max(50).optional(),
      plumbingLicenseLevel: z.string().max(50).optional(),
      otherCertifications: z.array(z.string()).optional(),
      // HR
      i9Verified: z.boolean().optional(),
      // Skills
      primaryTrade: z.string().max(100).optional(),
      secondaryTrades: z.array(z.string()).optional(),
      experienceYears: z.number().optional(),
      specialties: z.array(z.string()).optional(),
      clearanceLevel: z.enum(["residential","commercial","school","healthcare","government"]).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const partnerRows = await (db as any).execute(sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) throw new TRPCError({ code: "FORBIDDEN" });

      const { passId, ...updates } = input;

      // Build dynamic update
      const fields: string[] = [];
      const values: any[] = [];

      const addField = (field: string, value: any) => {
        if (value !== undefined) { fields.push(`${field} = ?`); values.push(value); }
      };

      addField("contractorLicenseNumber", updates.contractorLicenseNumber);
      addField("contractorLicenseState", updates.contractorLicenseState);
      addField("contractorLicenseType", updates.contractorLicenseType);
      addField("contractorLicenseExpiresAt", updates.contractorLicenseExpiresAt ? new Date(updates.contractorLicenseExpiresAt) : undefined);
      addField("osha10Certified", updates.osha10Certified !== undefined ? (updates.osha10Certified ? 1 : 0) : undefined);
      addField("osha10CertDate", updates.osha10CertDate ? new Date(updates.osha10CertDate) : undefined);
      addField("osha30Certified", updates.osha30Certified !== undefined ? (updates.osha30Certified ? 1 : 0) : undefined);
      addField("osha30CertDate", updates.osha30CertDate ? new Date(updates.osha30CertDate) : undefined);
      addField("epa608CertType", updates.epa608CertType);
      addField("epa608CertDate", updates.epa608CertDate ? new Date(updates.epa608CertDate) : undefined);
      addField("electricalLicenseLevel", updates.electricalLicenseLevel);
      addField("plumbingLicenseLevel", updates.plumbingLicenseLevel);
      addField("otherCertifications", updates.otherCertifications ? JSON.stringify(updates.otherCertifications) : undefined);
      addField("i9Verified", updates.i9Verified !== undefined ? (updates.i9Verified ? 1 : 0) : undefined);
      addField("primaryTrade", updates.primaryTrade);
      addField("secondaryTrades", updates.secondaryTrades ? JSON.stringify(updates.secondaryTrades) : undefined);
      addField("experienceYears", updates.experienceYears);
      addField("specialties", updates.specialties ? JSON.stringify(updates.specialties) : undefined);
      addField("clearanceLevel", updates.clearanceLevel);

      if (fields.length === 0) return { success: true };

      values.push(partner.id, passId);
      await (db as any).execute(
        `UPDATE proPassCards SET ${fields.join(", ")}, updatedAt = NOW() WHERE partnerId = ? AND id = ?`,
        values
      );

      // Recalculate score
      const passRows = await (db as any).execute(sql`SELECT * FROM proPassCards WHERE id = ${passId} LIMIT 1`);
      const pass = (passRows.rows || passRows)[0];
      if (pass) {
        const newScore = calculatePassScore(pass);
        const newStatus = newScore >= 50 ? "active" : "pending";
        await (db as any).execute(sql`
          UPDATE proPassCards SET passScore = ${newScore}, status = ${newStatus}, updatedAt = NOW() WHERE id = ${passId}
        `);
      }

      return { success: true };
    }),

  // ── Record background check result ──────────────────────────────────────────
  recordBackgroundCheck: protectedProcedure
    .input(z.object({
      passId: z.number().int().positive(),
      checkrReportId: z.string().optional(),
      checkrCandidateId: z.string().optional(),
      status: z.enum(["pending","clear","consider","suspended"]),
      checkDate: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const partnerRows = await (db as any).execute(sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) throw new TRPCError({ code: "FORBIDDEN" });

      const checkDate = new Date(input.checkDate);
      const expiryDate = new Date(checkDate.getTime() + 2 * 365 * 24 * 60 * 60 * 1000);

      await (db as any).execute(sql`
        UPDATE proPassCards SET
          checkrCandidateId = ${input.checkrCandidateId ?? null},
          checkrReportId = ${input.checkrReportId ?? null},
          backgroundCheckStatus = ${input.status},
          backgroundCheckDate = ${checkDate},
          backgroundCheckExpiresAt = ${expiryDate},
          updatedAt = NOW()
        WHERE id = ${input.passId} AND partnerId = ${partner.id}
      `);

      // Recalculate score
      const passRows = await (db as any).execute(sql`SELECT * FROM proPassCards WHERE id = ${input.passId} LIMIT 1`);
      const pass = (passRows.rows || passRows)[0];
      if (pass) {
        const newScore = calculatePassScore(pass);
        const newStatus = newScore >= 50 ? "active" : "pending";
        await (db as any).execute(sql`UPDATE proPassCards SET passScore = ${newScore}, status = ${newStatus} WHERE id = ${input.passId}`);
      }

      return { success: true };
    }),

  // ── PUBLIC: Verify a Pro Pass by QR code ───────────────────────────────────
  // Called when a facility scans a pro's QR code at the door
  publicVerifyPass: publicProcedure
    .input(z.object({ passCode: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const rows = await (db as any).execute(sql`
        SELECT pp.firstName, pp.lastName, pp.role, pp.photoUrl, pp.passScore, pp.status,
               pp.clearanceLevel, pp.backgroundCheckStatus, pp.backgroundCheckExpiresAt,
               pp.osha10Certified, pp.osha30Certified, pp.epa608CertType,
               pp.contractorLicenseNumber, pp.contractorLicenseState, pp.contractorLicenseExpiresAt,
               pp.primaryTrade, pp.secondaryTrades, pp.updatedAt,
               p.businessName, p.businessType, p.tier
        FROM proPassCards pp
        JOIN partners p ON pp.partnerId = p.id
        WHERE pp.passCode = ${input.passCode}
        LIMIT 1
      `);
      const pass = (rows.rows || rows)[0];
      if (!pass) return { valid: false, reason: "Pro Pass not found" };
      if (pass.status !== "active") return { valid: false, reason: `Pro Pass is ${pass.status}`, name: `${pass.firstName} ${pass.lastName}` };

      // Check background check expiry
      if (pass.backgroundCheckExpiresAt && new Date(pass.backgroundCheckExpiresAt) < new Date()) {
        return { valid: false, reason: "Background check expired", name: `${pass.firstName} ${pass.lastName}` };
      }

      return {
        valid: true,
        firstName: pass.firstName,
        lastName: pass.lastName,
        role: pass.role,
        photoUrl: pass.photoUrl,
        passScore: pass.passScore,
        clearanceLevel: pass.clearanceLevel,
        backgroundCheckStatus: pass.backgroundCheckStatus,
        backgroundCheckExpiresAt: pass.backgroundCheckExpiresAt,
        osha10Certified: pass.osha10Certified,
        osha30Certified: pass.osha30Certified,
        contractorLicenseNumber: pass.contractorLicenseNumber,
        contractorLicenseState: pass.contractorLicenseState,
        contractorLicenseExpiresAt: pass.contractorLicenseExpiresAt,
        primaryTrade: pass.primaryTrade,
        company: pass.businessName,
        companyTier: pass.tier,
        verifiedAt: new Date().toISOString(),
      };
    }),

  // ── Admin: run quarterly review ─────────────────────────────────────────────
  adminRunQuarterlyReview: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    return runProPassQuarterlyReview();
  }),
});
