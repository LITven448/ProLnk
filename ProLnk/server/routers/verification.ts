/**
 * Partner Verification Router -- 7-point trust checkpoint system
 * 
 * Checkpoints:
 * 1. Business License
 * 2. Liability Insurance
 * 3. Background Check
 * 4. Business Registration
 * 5. References (3 minimum)
 * 6. Portfolio / Work Samples
 * 7. Identity Verification
 *
 * Trust Score: Each checkpoint = ~14 points (max 100)
 * Badge Levels: None  Bronze (1-2)  Silver (3-4)  Gold (5-6)  Platinum (7/7)
 */
import { z } from "zod";
import { sql } from "drizzle-orm";
import { router, protectedProcedure } from "../_core/trpc";
import { getDb } from "../db";

// --- Helpers ------------------------------------------------------------------
const CHECKPOINT_WEIGHTS: Record<string, number> = {
  licenseVerified: 20,
  insuranceVerified: 20,
  backgroundCheckVerified: 18,
  businessRegistrationVerified: 14,
  referencesVerified: 12,
  portfolioVerified: 8,
  identityVerified: 8,
};

function computeTrustScore(v: Record<string, any>): number {
  let score = 0;
  for (const [key, weight] of Object.entries(CHECKPOINT_WEIGHTS)) {
    if (v[key]) score += weight;
  }
  return Math.min(score, 100);
}

function computeBadgeLevel(score: number, checkpointCount: number): string {
  if (checkpointCount === 7) return "platinum";
  if (checkpointCount >= 5) return "gold";
  if (checkpointCount >= 3) return "silver";
  if (checkpointCount >= 1) return "bronze";
  return "none";
}

function computeOverallStatus(checkpointCount: number): string {
  if (checkpointCount === 0) return "unverified";
  if (checkpointCount === 7) return "verified";
  return "partial";
}

async function upsertVerification(partnerId: number, updates: Record<string, any>) {
  const db = await getDb();
  if (!db) return null;

  // Get current record
  const rows = await (db as any).execute(sql`
    SELECT * FROM partnerVerifications WHERE partnerId = ${partnerId} LIMIT 1
  `);
  const current = (rows.rows || rows)[0] || {};

  const merged = { ...current, ...updates };

  // Compute derived fields
  const checkpointFields = Object.keys(CHECKPOINT_WEIGHTS);
  const checkpointCount = checkpointFields.filter(f => merged[f]).length;
  const trustScore = computeTrustScore(merged);
  const badgeLevel = computeBadgeLevel(trustScore, checkpointCount);
  const overallStatus = computeOverallStatus(checkpointCount);
  const now = Date.now();

  if (!current.id) {
    // Insert
    await (db as any).execute(sql`
      INSERT INTO partnerVerifications (
        partnerId, trustScore, badgeLevel, overallStatus, createdAt, updatedAt,
        licenseVerified, insuranceVerified, backgroundCheckVerified,
        businessRegistrationVerified, referencesVerified, portfolioVerified, identityVerified
      ) VALUES (
        ${partnerId}, ${trustScore}, ${badgeLevel}, ${overallStatus}, ${now}, ${now},
        0, 0, 0, 0, 0, 0, 0
      )
    `);
    const newRows = await (db as any).execute(sql`
      SELECT * FROM partnerVerifications WHERE partnerId = ${partnerId} LIMIT 1
    `);
    return (newRows.rows || newRows)[0];
  } else {
    // Update
    await (db as any).execute(sql`
      UPDATE partnerVerifications
      SET trustScore = ${trustScore},
          badgeLevel = ${badgeLevel},
          overallStatus = ${overallStatus},
          updatedAt = ${now}
      WHERE partnerId = ${partnerId}
    `);
    return { ...merged, trustScore, badgeLevel, overallStatus };
  }
}

// --- Router -------------------------------------------------------------------
export const verificationRouter = router({

  // Get verification status for the logged-in partner
  getMyVerification: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;
    const partnerRows = await (db as any).execute(sql`
      SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
    `);
    const partner = (partnerRows.rows || partnerRows)[0];
    if (!partner) return null;

    const rows = await (db as any).execute(sql`
      SELECT * FROM partnerVerifications WHERE partnerId = ${partner.id} LIMIT 1
    `);
    return (rows.rows || rows)[0] || null;
  }),

  // Admin: get verification for any partner
  adminGetVerification: protectedProcedure
    .input(z.object({ partnerId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;
      const rows = await (db as any).execute(sql`
        SELECT pv.*, p.businessName, p.businessType, p.email
        FROM partnerVerifications pv
        JOIN partners p ON pv.partnerId = p.id
        WHERE pv.partnerId = ${input.partnerId} LIMIT 1
      `);
      return (rows.rows || rows)[0] || null;
    }),

  // Admin: list all partners with verification status
  adminListVerifications: protectedProcedure
    .input(z.object({
      limit: z.number().default(50),
      offset: z.number().default(0),
      status: z.enum(["all", "unverified", "partial", "verified"]).default("all"),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { partners: [], total: 0 };

      const statusFilter = input.status === "all"
        ? sql`1=1`
        : sql`COALESCE(pv.overallStatus, 'unverified') = ${input.status}`;

      const rows = await (db as any).execute(sql`
        SELECT 
          p.id, p.businessName, p.businessType, p.email, p.status AS partnerStatus,
          COALESCE(pv.trustScore, 0) AS trustScore,
          COALESCE(pv.badgeLevel, 'none') AS badgeLevel,
          COALESCE(pv.overallStatus, 'unverified') AS overallStatus,
          COALESCE(pv.licenseVerified, 0) AS licenseVerified,
          COALESCE(pv.insuranceVerified, 0) AS insuranceVerified,
          COALESCE(pv.backgroundCheckVerified, 0) AS backgroundCheckVerified,
          COALESCE(pv.businessRegistrationVerified, 0) AS businessRegistrationVerified,
          COALESCE(pv.referencesVerified, 0) AS referencesVerified,
          COALESCE(pv.portfolioVerified, 0) AS portfolioVerified,
          COALESCE(pv.identityVerified, 0) AS identityVerified,
          pv.updatedAt
        FROM partners p
        LEFT JOIN partnerVerifications pv ON pv.partnerId = p.id
        WHERE p.status = 'approved' AND ${statusFilter}
        ORDER BY COALESCE(pv.trustScore, 0) DESC
        LIMIT ${input.limit} OFFSET ${input.offset}
      `);

      const countRows = await (db as any).execute(sql`
        SELECT COUNT(*) as total
        FROM partners p
        LEFT JOIN partnerVerifications pv ON pv.partnerId = p.id
        WHERE p.status = 'approved' AND ${statusFilter}
      `);

      return {
        partners: rows.rows || rows,
        total: (countRows.rows || countRows)[0]?.total || 0,
      };
    }),

  // Admin: update a specific checkpoint
  adminUpdateCheckpoint: protectedProcedure
    .input(z.object({
      partnerId: z.number(),
      checkpoint: z.enum([
        "license", "insurance", "backgroundCheck",
        "businessRegistration", "references", "portfolio", "identity"
      ]),
      verified: z.boolean(),
      notes: z.string().optional(),
      // Checkpoint-specific fields
      licenseNumber: z.string().optional(),
      licenseState: z.string().optional(),
      licenseExpiresAt: z.number().optional(),
      insuranceCarrier: z.string().optional(),
      insurancePolicyNumber: z.string().optional(),
      insuranceExpiresAt: z.number().optional(),
      backgroundCheckProvider: z.string().optional(),
      referencesCount: z.number().optional(),
      portfolioUrl: z.string().optional(),
      identityDocType: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return { success: false };

      const now = Date.now();
      const verifiedBy = ctx.user.id;

      const checkpointMap: Record<string, Record<string, any>> = {
        license: {
          licenseVerified: input.verified ? 1 : 0,
          licenseNumber: input.licenseNumber,
          licenseState: input.licenseState,
          licenseExpiresAt: input.licenseExpiresAt,
          licenseNotes: input.notes,
          licenseVerifiedAt: input.verified ? now : null,
          licenseVerifiedBy: input.verified ? verifiedBy : null,
        },
        insurance: {
          insuranceVerified: input.verified ? 1 : 0,
          insuranceCarrier: input.insuranceCarrier,
          insurancePolicyNumber: input.insurancePolicyNumber,
          insuranceExpiresAt: input.insuranceExpiresAt,
          insuranceNotes: input.notes,
          insuranceVerifiedAt: input.verified ? now : null,
          insuranceVerifiedBy: input.verified ? verifiedBy : null,
        },
        backgroundCheck: {
          backgroundCheckVerified: input.verified ? 1 : 0,
          backgroundCheckProvider: input.backgroundCheckProvider,
          backgroundCheckDate: input.verified ? now : null,
          backgroundCheckNotes: input.notes,
          backgroundCheckVerifiedAt: input.verified ? now : null,
          backgroundCheckVerifiedBy: input.verified ? verifiedBy : null,
        },
        businessRegistration: {
          businessRegistrationVerified: input.verified ? 1 : 0,
          businessRegistrationNotes: input.notes,
          businessRegistrationVerifiedAt: input.verified ? now : null,
          businessRegistrationVerifiedBy: input.verified ? verifiedBy : null,
        },
        references: {
          referencesVerified: input.verified ? 1 : 0,
          referencesCount: input.referencesCount,
          referencesNotes: input.notes,
          referencesVerifiedAt: input.verified ? now : null,
          referencesVerifiedBy: input.verified ? verifiedBy : null,
        },
        portfolio: {
          portfolioVerified: input.verified ? 1 : 0,
          portfolioUrl: input.portfolioUrl,
          portfolioNotes: input.notes,
          portfolioVerifiedAt: input.verified ? now : null,
          portfolioVerifiedBy: input.verified ? verifiedBy : null,
        },
        identity: {
          identityVerified: input.verified ? 1 : 0,
          identityDocType: input.identityDocType,
          identityNotes: input.notes,
          identityVerifiedAt: input.verified ? now : null,
          identityVerifiedBy: input.verified ? verifiedBy : null,
        },
      };

      const updates = checkpointMap[input.checkpoint];

      // Ensure record exists first
      await upsertVerification(input.partnerId, {});

      // Build dynamic update
      const setFields = Object.entries(updates)
        .filter(([, v]) => v !== undefined)
        .map(([k]) => k);

      if (setFields.length === 0) return { success: true };

      // Update each field individually to avoid complex dynamic SQL
      for (const [field, value] of Object.entries(updates)) {
        if (value === undefined) continue;
        if (value === null) {
          await (db as any).execute(sql`
            UPDATE partnerVerifications SET updatedAt = ${now} WHERE partnerId = ${input.partnerId}
          `);
        } else {
          // Use raw query for dynamic field name
          const fieldSql = field;
          await (db as any).execute(
            `UPDATE partnerVerifications SET \`${fieldSql}\` = ?, updatedAt = ? WHERE partnerId = ?`,
            [value, now, input.partnerId]
          );
        }
      }

      // Recompute trust score
      const rows = await (db as any).execute(sql`
        SELECT * FROM partnerVerifications WHERE partnerId = ${input.partnerId} LIMIT 1
      `);
      const current = (rows.rows || rows)[0];
      if (current) {
        const checkpointFields = Object.keys(CHECKPOINT_WEIGHTS);
        const checkpointCount = checkpointFields.filter(f => current[f]).length;
        const trustScore = computeTrustScore(current);
        const badgeLevel = computeBadgeLevel(trustScore, checkpointCount);
        const overallStatus = computeOverallStatus(checkpointCount);
        await (db as any).execute(sql`
          UPDATE partnerVerifications
          SET trustScore = ${trustScore}, badgeLevel = ${badgeLevel}, overallStatus = ${overallStatus}, updatedAt = ${now}
          WHERE partnerId = ${input.partnerId}
        `);
      }

      return { success: true };
    }),
});
