/**
 * Briefcase Router — Company-Level Credentialing System
 *
 * The Briefcase is a digital company credential portfolio that contains
 * all verification documents for a partner company: insurance, licenses,
 * business registration, EIN, bonding, and W-9.
 *
 * Briefcases are reviewed quarterly by an automated agent.
 * Each briefcase has a shareable public URL so facilities (schools,
 * hospitals, HOAs) can verify a company's credentials in seconds.
 *
 * Briefcase score (0–100) is calculated from document completeness
 * and verification status. This feeds into partner PPS score.
 */

import { z } from "zod";
import { sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { storagePut } from "../storage";
import { notifyOwner } from "../_core/notification";
import { nanoid } from "nanoid";

// ─── Score Calculator ─────────────────────────────────────────────────────────

const DOCUMENT_WEIGHTS: Record<string, number> = {
  generalLiabilityStatus:  25,
  workersCompStatus:        20,
  contractorLicenseStatus:  20,
  w9Status:                 10,
  einStatus:                10,
  llcRegistrationStatus:     8,
  businessLicenseStatus:     5,
  bondingStatus:             2,
};

function calculateBriefcaseScore(briefcase: Record<string, string>): number {
  let score = 0;
  for (const [field, weight] of Object.entries(DOCUMENT_WEIGHTS)) {
    const status = briefcase[field];
    if (status === "verified") score += weight;
    else if (status === "pending") score += Math.floor(weight * 0.3);
    // missing/expired = 0
  }
  return Math.min(100, score);
}

// ─── Quarterly Review Agent ───────────────────────────────────────────────────

export async function runBriefcaseQuarterlyReview(): Promise<{
  reviewed: number;
  flagged: number;
  suspended: number;
  errors: string[];
}> {
  const db = await getDb();
  if (!db) return { reviewed: 0, flagged: 0, suspended: 0, errors: ["Database unavailable"] };

  const result = { reviewed: 0, flagged: 0, suspended: 0, errors: [] as string[] };
  const now = new Date();
  const in60Days = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
  const in30Days = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  try {
    // Get all active briefcases due for review
    const briefcases = await (db as any).execute(sql`
      SELECT cb.*, p.businessName, p.contactEmail, p.id as partnerId
      FROM companyBriefcases cb
      JOIN partners p ON cb.partnerId = p.id
      WHERE cb.status IN ('active','restricted')
        AND (cb.nextReviewDueAt IS NULL OR cb.nextReviewDueAt <= ${now})
    `);
    const rows = briefcases.rows || briefcases;

    for (const briefcase of rows) {
      try {
        const issues: string[] = [];
        const criticalIssues: string[] = [];

        // Check general liability expiry
        if (briefcase.generalLiabilityExpiresAt) {
          const expiry = new Date(briefcase.generalLiabilityExpiresAt);
          if (expiry < now) {
            criticalIssues.push("General liability insurance EXPIRED");
            await (db as any).execute(sql`
              UPDATE companyBriefcases SET generalLiabilityStatus = 'expired' WHERE id = ${briefcase.id}
            `);
          } else if (expiry < in30Days) {
            issues.push(`General liability expires ${expiry.toLocaleDateString()}`);
          }
        }

        // Check workers comp expiry
        if (briefcase.workersCompExpiresAt) {
          const expiry = new Date(briefcase.workersCompExpiresAt);
          if (expiry < now) {
            criticalIssues.push("Workers compensation insurance EXPIRED");
            await (db as any).execute(sql`
              UPDATE companyBriefcases SET workersCompStatus = 'expired' WHERE id = ${briefcase.id}
            `);
          } else if (expiry < in30Days) {
            issues.push(`Workers comp expires ${expiry.toLocaleDateString()}`);
          }
        }

        // Check contractor license expiry
        if (briefcase.contractorLicenseExpiresAt) {
          const expiry = new Date(briefcase.contractorLicenseExpiresAt);
          if (expiry < now) {
            criticalIssues.push("Contractor license EXPIRED");
            await (db as any).execute(sql`
              UPDATE companyBriefcases SET contractorLicenseStatus = 'expired' WHERE id = ${briefcase.id}
            `);
          } else if (expiry < in60Days) {
            issues.push(`Contractor license expires ${expiry.toLocaleDateString()}`);
          }
        }

        // Recalculate score
        const updatedBriefcase = await (db as any).execute(sql`
          SELECT * FROM companyBriefcases WHERE id = ${briefcase.id} LIMIT 1
        `);
        const current = (updatedBriefcase.rows || updatedBriefcase)[0];
        const newScore = calculateBriefcaseScore(current);
        const newStatus = criticalIssues.length > 0 ? "restricted" : (issues.length > 0 ? "active" : "active");

        // Update briefcase
        const nextReview = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
        await (db as any).execute(sql`
          UPDATE companyBriefcases SET
            briefcaseScore = ${newScore},
            status = ${newStatus},
            lastReviewedAt = ${now},
            nextReviewDueAt = ${nextReview}
          WHERE id = ${briefcase.id}
        `);

        // Create in-app notifications for issues
        if (issues.length > 0 || criticalIssues.length > 0) {
          const allIssues = [...criticalIssues, ...issues];
          await (db as any).execute(sql`
            INSERT INTO partnerNotifications (partnerId, type, title, message, actionUrl, isRead, createdAt)
            VALUES (${briefcase.partnerId}, 'system', 'Briefcase Review — Action Required',
                    ${`Your quarterly Briefcase review found ${allIssues.length} issue(s): ${allIssues.join("; ")}. Update your documents to maintain your Active status.`},
                    '/dashboard/briefcase', 0, ${now})
          `);
          result.flagged++;
        }

        if (criticalIssues.length > 0 && newStatus === "restricted") {
          result.suspended++;
          notifyOwner({
            title: `⚠️ Briefcase Restricted: ${briefcase.businessName}`,
            content: `Critical document issues: ${criticalIssues.join(", ")}. Briefcase restricted.`,
          }).catch(() => {});
        }

        result.reviewed++;
      } catch (err) {
        result.errors.push(`Briefcase ${briefcase.id}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  } catch (err) {
    result.errors.push(`Global error: ${err instanceof Error ? err.message : String(err)}`);
  }

  console.log(`[Briefcase] Quarterly review: ${result.reviewed} reviewed, ${result.flagged} flagged, ${result.suspended} restricted`);
  return result;
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const briefcaseRouter = router({

  // ── Get my briefcase ────────────────────────────────────────────────────────
  getMyBriefcase: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;
    const partnerRows = await (db as any).execute(sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`);
    const partner = (partnerRows.rows || partnerRows)[0];
    if (!partner) return null;

    const rows = await (db as any).execute(sql`SELECT * FROM companyBriefcases WHERE partnerId = ${partner.id} LIMIT 1`);
    const briefcase = (rows.rows || rows)[0];
    if (!briefcase) return null;

    const docsRows = await (db as any).execute(sql`SELECT * FROM briefcaseDocuments WHERE briefcaseId = ${briefcase.id} ORDER BY documentType`);
    const documents = docsRows.rows || docsRows;

    return { briefcase, documents };
  }),

  // ── Initialize briefcase (on partner approval) ──────────────────────────────
  initializeBriefcase: protectedProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const partnerRows = await (db as any).execute(sql`SELECT id, businessName FROM partners WHERE userId = ${ctx.user.id} AND status = 'approved' LIMIT 1`);
    const partner = (partnerRows.rows || partnerRows)[0];
    if (!partner) throw new TRPCError({ code: "FORBIDDEN", message: "Only approved partners can create a briefcase" });

    // Check if briefcase already exists
    const existing = await (db as any).execute(sql`SELECT id FROM companyBriefcases WHERE partnerId = ${partner.id} LIMIT 1`);
    if ((existing.rows || existing)[0]) throw new TRPCError({ code: "BAD_REQUEST", message: "Briefcase already exists" });

    const slug = partner.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 50) + "-" + nanoid(6);
    const nextReview = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

    const result = await (db as any).execute(sql`
      INSERT INTO companyBriefcases (partnerId, briefcaseSlug, briefcaseScore, status, nextReviewDueAt)
      VALUES (${partner.id}, ${slug}, 0, 'draft', ${nextReview})
    `);
    const briefcaseId = (result.rows || result).insertId ?? result.insertId;

    return { briefcaseId, slug, message: "Briefcase created. Start uploading your credentials." };
  }),

  // ── Upload a document ───────────────────────────────────────────────────────
  uploadDocument: protectedProcedure
    .input(z.object({
      documentType: z.enum([
        "business_license","llc_registration","ein","general_liability","workers_comp",
        "commercial_auto","bonding","w9","contractor_license","osha_certification",
        "manufacturer_cert","trade_association","other"
      ]),
      documentTitle: z.string().max(255).optional(),
      fileBase64: z.string(),
      fileName: z.string().max(255),
      mimeType: z.string().max(100).default("application/pdf"),
      // Extracted info
      issuer: z.string().max(255).optional(),
      policyNumber: z.string().max(100).optional(),
      coverageAmount: z.number().optional(),
      effectiveDate: z.string().optional(),
      expiryDate: z.string().optional(),
      notes: z.string().max(1000).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const partnerRows = await (db as any).execute(sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) throw new TRPCError({ code: "FORBIDDEN" });

      const briefcaseRows = await (db as any).execute(sql`SELECT id FROM companyBriefcases WHERE partnerId = ${partner.id} LIMIT 1`);
      const briefcase = (briefcaseRows.rows || briefcaseRows)[0];
      if (!briefcase) throw new TRPCError({ code: "NOT_FOUND", message: "Initialize your briefcase first" });

      // Upload file
      const buffer = Buffer.from(input.fileBase64.replace(/^data:[^;]+;base64,/, ""), "base64");
      if (buffer.length > 25 * 1024 * 1024) throw new TRPCError({ code: "BAD_REQUEST", message: "File must be under 25MB" });

      const ext = input.mimeType.includes("pdf") ? "pdf" : input.mimeType.includes("png") ? "png" : "jpg";
      const key = `briefcase/${partner.id}/${input.documentType}-${Date.now()}.${ext}`;
      const { url } = await storagePut(key, buffer, input.mimeType);

      // Upsert document (replace if same type already exists)
      const existing = await (db as any).execute(sql`
        SELECT id FROM briefcaseDocuments WHERE briefcaseId = ${briefcase.id} AND documentType = ${input.documentType} LIMIT 1
      `);
      const existingDoc = (existing.rows || existing)[0];

      if (existingDoc) {
        await (db as any).execute(sql`
          UPDATE briefcaseDocuments SET
            fileUrl = ${url}, fileName = ${input.fileName}, documentTitle = ${input.documentTitle ?? null},
            issuer = ${input.issuer ?? null}, policyNumber = ${input.policyNumber ?? null},
            coverageAmount = ${input.coverageAmount ?? null},
            effectiveDate = ${input.effectiveDate ? new Date(input.effectiveDate) : null},
            expiryDate = ${input.expiryDate ? new Date(input.expiryDate) : null},
            notes = ${input.notes ?? null}, verificationStatus = 'pending', verifiedAt = NULL,
            uploadedAt = NOW()
          WHERE id = ${existingDoc.id}
        `);
      } else {
        await (db as any).execute(sql`
          INSERT INTO briefcaseDocuments (
            briefcaseId, documentType, documentTitle, fileUrl, fileName,
            issuer, policyNumber, coverageAmount, effectiveDate, expiryDate, notes, verificationStatus
          ) VALUES (
            ${briefcase.id}, ${input.documentType}, ${input.documentTitle ?? null}, ${url}, ${input.fileName},
            ${input.issuer ?? null}, ${input.policyNumber ?? null}, ${input.coverageAmount ?? null},
            ${input.effectiveDate ? new Date(input.effectiveDate) : null},
            ${input.expiryDate ? new Date(input.expiryDate) : null},
            ${input.notes ?? null}, 'pending'
          )
        `);
      }

      // Update document status on briefcase to 'pending'
      const statusField = input.documentType === "general_liability" ? "generalLiabilityStatus"
        : input.documentType === "workers_comp" ? "workersCompStatus"
        : input.documentType === "contractor_license" ? "contractorLicenseStatus"
        : input.documentType === "business_license" ? "businessLicenseStatus"
        : input.documentType === "llc_registration" ? "llcRegistrationStatus"
        : input.documentType === "ein" ? "einStatus"
        : input.documentType === "bonding" ? "bondingStatus"
        : input.documentType === "w9" ? "w9Status"
        : null;

      if (statusField) {
        await (db as any).execute(
          `UPDATE companyBriefcases SET \`${statusField}\` = 'pending', updatedAt = NOW() WHERE id = ?`,
          [briefcase.id]
        );
      }

      // Update expiry dates on briefcase
      if (input.expiryDate && input.documentType === "general_liability") {
        await (db as any).execute(sql`UPDATE companyBriefcases SET generalLiabilityExpiresAt = ${new Date(input.expiryDate)} WHERE id = ${briefcase.id}`);
      } else if (input.expiryDate && input.documentType === "workers_comp") {
        await (db as any).execute(sql`UPDATE companyBriefcases SET workersCompExpiresAt = ${new Date(input.expiryDate)} WHERE id = ${briefcase.id}`);
      } else if (input.expiryDate && input.documentType === "contractor_license") {
        await (db as any).execute(sql`UPDATE companyBriefcases SET contractorLicenseExpiresAt = ${new Date(input.expiryDate)} WHERE id = ${briefcase.id}`);
      }

      // Notify admin for review
      notifyOwner({
        title: `Briefcase document uploaded: ${input.documentType}`,
        content: `Partner ${partner.id} uploaded ${input.documentType}. Pending verification.`,
      }).catch(() => {});

      return { success: true, fileUrl: url, message: "Document uploaded. Pending admin verification." };
    }),

  // ── Admin: verify a document ────────────────────────────────────────────────
  adminVerifyDocument: protectedProcedure
    .input(z.object({
      documentId: z.number().int().positive(),
      approved: z.boolean(),
      rejectionReason: z.string().max(500).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const docRows = await (db as any).execute(sql`
        SELECT d.*, b.partnerId FROM briefcaseDocuments d JOIN companyBriefcases b ON d.briefcaseId = b.id WHERE d.id = ${input.documentId} LIMIT 1
      `);
      const doc = (docRows.rows || docRows)[0];
      if (!doc) throw new TRPCError({ code: "NOT_FOUND" });

      const newStatus = input.approved ? "verified" : "rejected";
      await (db as any).execute(sql`
        UPDATE briefcaseDocuments SET
          verificationStatus = ${newStatus},
          verifiedAt = ${input.approved ? new Date() : null},
          verifiedBy = ${ctx.user.id},
          rejectionReason = ${input.rejectionReason ?? null}
        WHERE id = ${input.documentId}
      `);

      // Update document status on briefcase
      const statusField = doc.documentType === "general_liability" ? "generalLiabilityStatus"
        : doc.documentType === "workers_comp" ? "workersCompStatus"
        : doc.documentType === "contractor_license" ? "contractorLicenseStatus"
        : doc.documentType === "business_license" ? "businessLicenseStatus"
        : doc.documentType === "llc_registration" ? "llcRegistrationStatus"
        : doc.documentType === "ein" ? "einStatus"
        : doc.documentType === "bonding" ? "bondingStatus"
        : doc.documentType === "w9" ? "w9Status"
        : null;

      if (statusField) {
        await (db as any).execute(
          `UPDATE companyBriefcases SET \`${statusField}\` = ?, updatedAt = NOW() WHERE id = ?`,
          [newStatus, doc.briefcaseId]
        );
      }

      // Recalculate briefcase score
      const briefcaseRows = await (db as any).execute(sql`SELECT * FROM companyBriefcases WHERE id = ${doc.briefcaseId} LIMIT 1`);
      const briefcase = (briefcaseRows.rows || briefcaseRows)[0];
      if (briefcase) {
        const newScore = calculateBriefcaseScore(briefcase);
        const newBriefcaseStatus = newScore >= 60 ? "active" : newScore >= 30 ? "restricted" : "draft";
        await (db as any).execute(sql`
          UPDATE companyBriefcases SET briefcaseScore = ${newScore}, status = ${newBriefcaseStatus} WHERE id = ${doc.briefcaseId}
        `);
      }

      return { success: true, newStatus };
    }),

  // ── Public: verify a briefcase by slug ─────────────────────────────────────
  // This is the page schools/facilities see when given a briefcase link
  publicVerify: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const rows = await (db as any).execute(sql`
        SELECT cb.*, p.businessName, p.businessType, p.contactName, p.website,
               p.description, p.rating, p.reviewCount, p.tier
        FROM companyBriefcases cb
        JOIN partners p ON cb.partnerId = p.id
        WHERE cb.briefcaseSlug = ${input.slug} AND cb.status IN ('active','restricted')
        LIMIT 1
      `);
      const briefcase = (rows.rows || rows)[0];
      if (!briefcase) return null;

      // Get verified documents (don't expose private file URLs publicly)
      const docsRows = await (db as any).execute(sql`
        SELECT documentType, documentTitle, issuer, policyNumber, coverageAmount,
               effectiveDate, expiryDate, verificationStatus, verifiedAt
        FROM briefcaseDocuments
        WHERE briefcaseId = ${briefcase.id} AND verificationStatus = 'verified'
        ORDER BY documentType
      `);
      const verifiedDocs = docsRows.rows || docsRows;

      // Get Pro Pass summary (just counts, not personal info)
      const passRows = await (db as any).execute(sql`
        SELECT COUNT(*) as total,
               SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active,
               SUM(CASE WHEN backgroundCheckStatus = 'clear' THEN 1 ELSE 0 END) as backgroundClear,
               SUM(CASE WHEN osha10Certified = 1 OR osha30Certified = 1 THEN 1 ELSE 0 END) as oshaCount
        FROM proPassCards WHERE partnerId = ${briefcase.partnerId} AND status = 'active'
      `);
      const passSummary = (passRows.rows || passRows)[0];

      return {
        businessName: briefcase.businessName,
        businessType: briefcase.businessType,
        tier: briefcase.tier,
        rating: briefcase.rating,
        reviewCount: briefcase.reviewCount,
        briefcaseScore: briefcase.briefcaseScore,
        status: briefcase.status,
        verifiedDocuments: verifiedDocs,
        generalLiabilityAmount: briefcase.generalLiabilityAmount,
        generalLiabilityExpiresAt: briefcase.generalLiabilityExpiresAt,
        workersCompAmount: briefcase.workersCompAmount,
        clearanceLevels: briefcase.clearanceLevels,
        proPassSummary: passSummary,
        lastReviewedAt: briefcase.lastReviewedAt,
        nextReviewDueAt: briefcase.nextReviewDueAt,
        verifiedAt: briefcase.approvedAt,
      };
    }),

  // ── Admin: list all briefcases needing review ───────────────────────────────
  adminListPending: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const db = await getDb();
    if (!db) return [];
    const rows = await (db as any).execute(sql`
      SELECT cb.*, p.businessName, p.contactEmail,
        (SELECT COUNT(*) FROM briefcaseDocuments d WHERE d.briefcaseId = cb.id AND d.verificationStatus = 'pending') as pendingDocs
      FROM companyBriefcases cb
      JOIN partners p ON cb.partnerId = p.id
      WHERE cb.status IN ('draft','restricted') OR EXISTS (
        SELECT 1 FROM briefcaseDocuments d WHERE d.briefcaseId = cb.id AND d.verificationStatus = 'pending'
      )
      ORDER BY cb.updatedAt DESC LIMIT 100
    `);
    return rows.rows || rows;
  }),

  // ── Admin: run quarterly review manually ────────────────────────────────────
  adminRunQuarterlyReview: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    return runBriefcaseQuarterlyReview();
  }),
});
