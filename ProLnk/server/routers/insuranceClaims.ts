import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { sql } from "drizzle-orm";
import { notifyOwner } from "../_core/notification";

const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
  return next({ ctx });
});

export const insuranceClaimsRouter = router({
  listClaims: adminProcedure
    .input(z.object({
      page: z.number().default(1), limit: z.number().default(25),
      status: z.enum(["all","flagged","claim_filed","adjuster_scheduled","approved","denied","paid","closed"]).default("all"),
      commissionPaid: z.boolean().optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const offset = (input.page - 1) * input.limit;
      const statusClause = input.status !== "all" ? sql`AND ic.claimStatus = ${input.status}` : sql``;
      const commissionClause = input.commissionPaid !== undefined ? sql`AND ic.commissionPaid = ${input.commissionPaid}` : sql``;
      const rows = await db.execute(sql`
        SELECT ic.*, p.businessName as partnerName, p.contactName as partnerContact
        FROM insuranceClaims ic LEFT JOIN partners p ON p.id = ic.partnerId
        WHERE 1=1 ${statusClause} ${commissionClause}
        ORDER BY ic.createdAt DESC LIMIT ${input.limit} OFFSET ${offset}
      `) as any;
      const countRow = await db.execute(sql`SELECT COUNT(*) as total FROM insuranceClaims ic WHERE 1=1 ${statusClause} ${commissionClause}`) as any;
      return { claims: Array.isArray(rows[0]) ? rows[0] : rows, total: (Array.isArray(countRow[0]) ? countRow[0][0] : countRow[0])?.total ?? 0 };
    }),

  getClaim: adminProcedure
    .input(z.object({ claimId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const rows = await db.execute(sql`
        SELECT ic.*, p.businessName as partnerName, p.contactName as partnerContact, p.contactEmail as partnerEmail
        FROM insuranceClaims ic LEFT JOIN partners p ON p.id = ic.partnerId WHERE ic.id = ${input.claimId} LIMIT 1
      `) as any;
      const claim = Array.isArray(rows[0]) ? rows[0][0] : rows[0];
      if (!claim) throw new TRPCError({ code: "NOT_FOUND" });
      return claim;
    }),

  createClaim: adminProcedure
    .input(z.object({
      opportunityId: z.number(), partnerId: z.number().optional(),
      homeownerName: z.string().optional(), homeownerEmail: z.string().optional(),
      homeownerPhone: z.string().optional(), propertyAddress: z.string().optional(),
      damageType: z.string().optional(), estimatedDamageValue: z.number().optional(),
      insuranceCompany: z.string().optional(), claimNumber: z.string().optional(),
      notes: z.string().optional(), aiDetected: z.boolean().default(false),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.execute(sql`
        INSERT INTO insuranceClaims (opportunityId, partnerId, homeownerName, homeownerEmail, homeownerPhone,
          propertyAddress, damageType, estimatedDamageValue, insuranceCompany, claimNumber, notes, aiDetected)
        VALUES (${input.opportunityId}, ${input.partnerId ?? null}, ${input.homeownerName ?? null},
                ${input.homeownerEmail ?? null}, ${input.homeownerPhone ?? null}, ${input.propertyAddress ?? null},
                ${input.damageType ?? null}, ${input.estimatedDamageValue ?? null}, ${input.insuranceCompany ?? null},
                ${input.claimNumber ?? null}, ${input.notes ?? null}, ${input.aiDetected})
      `);
      await db.execute(sql`UPDATE opportunities SET isInsuranceClaim = TRUE, insuranceClaimStatus = 'pending', insuranceClaimFlaggedAt = NOW() WHERE id = ${input.opportunityId}`);
      await notifyOwner({ title: "Insurance Claim Flagged", content: `New insurance claim flagged for ${input.homeownerName ?? "a homeowner"} at ${input.propertyAddress ?? "unknown address"}. Damage: ${input.damageType ?? "unknown"}. Est. value: $${input.estimatedDamageValue?.toLocaleString() ?? "unknown"}.` });
      return { success: true };
    }),

  updateClaimStatus: adminProcedure
    .input(z.object({
      claimId: z.number(),
      claimStatus: z.enum(["flagged","claim_filed","adjuster_scheduled","approved","denied","paid","closed"]),
      claimNumber: z.string().optional(), insuranceCompany: z.string().optional(),
      jobValue: z.number().optional(), notes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.execute(sql`
        UPDATE insuranceClaims SET claimStatus = ${input.claimStatus},
          claimNumber = COALESCE(${input.claimNumber ?? null}, claimNumber),
          insuranceCompany = COALESCE(${input.insuranceCompany ?? null}, insuranceCompany),
          jobValue = COALESCE(${input.jobValue ?? null}, jobValue),
          notes = COALESCE(${input.notes ?? null}, notes), updatedAt = NOW()
        WHERE id = ${input.claimId}
      `);
      if (input.claimStatus === "paid" && input.jobValue) {
        const claimRows = await db.execute(sql`SELECT * FROM insuranceClaims WHERE id = ${input.claimId} LIMIT 1`) as any;
        const claim = Array.isArray(claimRows[0]) ? claimRows[0][0] : claimRows[0];
        if (claim?.partnerId) {
          const partnerRows = await db.execute(sql`SELECT commissionRate FROM partners WHERE id = ${claim.partnerId} LIMIT 1`) as any;
          const partner = Array.isArray(partnerRows[0]) ? partnerRows[0][0] : partnerRows[0];
          const rate = Number(partner?.commissionRate ?? 0.10);
          const fee = input.jobValue * rate;
          await db.execute(sql`UPDATE insuranceClaims SET platformFeeAmount = ${fee}, updatedAt = NOW() WHERE id = ${input.claimId}`);
          await db.execute(sql`UPDATE opportunities SET insuranceClaimStatus = 'paid', insuranceClaimResolvedAt = NOW() WHERE id = ${claim.opportunityId}`);
        }
      }
      return { success: true };
    }),

  markCommissionPaid: adminProcedure
    .input(z.object({ claimId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.execute(sql`UPDATE insuranceClaims SET commissionPaid = TRUE, commissionPaidAt = NOW(), updatedAt = NOW() WHERE id = ${input.claimId}`);
      return { success: true };
    }),

  sendReminder: adminProcedure
    .input(z.object({ claimId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.execute(sql`UPDATE insuranceClaims SET lastReminderSentAt = NOW(), reminderCount = reminderCount + 1, updatedAt = NOW() WHERE id = ${input.claimId}`);
      return { success: true, message: "Reminder queued (fires once Twilio/Resend credentials are configured)" };
    }),

  getStats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    const rows = await db.execute(sql`
      SELECT COUNT(*) as totalClaims,
        SUM(CASE WHEN claimStatus='flagged' THEN 1 ELSE 0 END) as flagged,
        SUM(CASE WHEN claimStatus='claim_filed' THEN 1 ELSE 0 END) as claimFiled,
        SUM(CASE WHEN claimStatus='approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN claimStatus='paid' THEN 1 ELSE 0 END) as paid,
        SUM(CASE WHEN claimStatus='denied' THEN 1 ELSE 0 END) as denied,
        SUM(CASE WHEN commissionPaid=FALSE AND claimStatus='paid' THEN 1 ELSE 0 END) as pendingCommissions,
        COALESCE(SUM(CASE WHEN commissionPaid=FALSE THEN platformFeeAmount ELSE 0 END),0) as unpaidCommissionValue,
        COALESCE(SUM(estimatedDamageValue),0) as totalEstimatedValue,
        SUM(CASE WHEN aiDetected=TRUE THEN 1 ELSE 0 END) as aiDetected
      FROM insuranceClaims
    `) as any;
    return Array.isArray(rows[0]) ? rows[0][0] : rows[0];
  }),
});
