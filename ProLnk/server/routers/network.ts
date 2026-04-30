import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { sql } from "drizzle-orm";
import { NETWORK_RATES } from "../../shared/const";
import { createHash } from "crypto";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateReferralCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no ambiguous chars
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

async function getUniqueReferralCode(db: any): Promise<string> {
  for (let attempt = 0; attempt < 20; attempt++) {
    const code = generateReferralCode();
    const existing = await db.execute(
      sql`SELECT id FROM pro_network_profile WHERE referral_code = ${code} LIMIT 1`
    );
    const rows = existing.rows ?? existing;
    if (!rows[0]) return code;
  }
  throw new Error("Could not generate unique referral code");
}

function hashAddress(address: string): string {
  return createHash("sha256")
    .update(address.toLowerCase().replace(/\s+/g, " ").trim())
    .digest("hex");
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const networkRouter = router({

  // Public: look up who referred this pro (for the /join landing page)
  lookupReferrer: publicProcedure
    .input(z.object({ code: z.string().length(6) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;
      const rows = await (db as any).execute(sql`
        SELECT p.businessName, p.businessType, p.contactName, np.networkLevel
        FROM pro_network_profile np
        JOIN partners p ON p.userId = np.user_id
        WHERE np.referral_code = ${input.code.toUpperCase()}
        LIMIT 1
      `);
      const row = (rows.rows ?? rows)[0];
      if (!row) return null;
      return {
        name: row.contactName || row.businessName,
        businessName: row.businessName,
        trade: row.businessType,
        networkLevel: Number(row.networkLevel),
      };
    }),

  // Protected: enroll a new pro and build their upline chain
  enroll: protectedProcedure
    .input(z.object({
      referralCode: z.string().optional(),
      businessMailingAddress: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      // Check if already enrolled
      const existing = await (db as any).execute(
        sql`SELECT id FROM pro_network_profile WHERE user_id = ${ctx.user.id} LIMIT 1`
      );
      if ((existing.rows ?? existing)[0]) {
        throw new TRPCError({ code: "CONFLICT", message: "Already enrolled in the network." });
      }

      let referrerUserId: string | null = null;
      let networkLevel = 4; // Default: Standard Pro

      if (input.referralCode) {
        const code = input.referralCode.toUpperCase();

        // Self-referral check
        const selfCheck = await (db as any).execute(
          sql`SELECT user_id FROM pro_network_profile WHERE referral_code = ${code} LIMIT 1`
        );
        const referrerRow = (selfCheck.rows ?? selfCheck)[0];
        if (!referrerRow) throw new TRPCError({ code: "NOT_FOUND", message: "Referral code not found." });
        if (referrerRow.user_id === ctx.user.id) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "You cannot use your own referral code." });
        }

        // Circular referral check
        const circularCheck = await (db as any).execute(
          sql`SELECT id FROM pro_upline_chain WHERE pro_user_id = ${referrerRow.user_id} AND upline_user_id = ${ctx.user.id} LIMIT 1`
        );
        if ((circularCheck.rows ?? circularCheck)[0]) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Circular referral detected." });
        }

        referrerUserId = referrerRow.user_id;

        // Determine network level from referrer's level
        const referrerProfile = await (db as any).execute(
          sql`SELECT network_level FROM pro_network_profile WHERE user_id = ${referrerUserId} LIMIT 1`
        );
        const referrerLevel = Number((referrerProfile.rows ?? referrerProfile)[0]?.network_level ?? 4);

        if (referrerLevel === 1) networkLevel = 2;       // Charter → Founding Partner
        else if (referrerLevel === 2) networkLevel = 3;  // Founding → Growth Pro
        else networkLevel = 4;                           // Growth/Standard → Standard Pro
      }

      // Check Charter Partner cap
      if (networkLevel === 1) {
        const count = await (db as any).execute(
          sql`SELECT COUNT(*) as cnt FROM pro_network_profile WHERE network_level = 1`
        );
        const cnt = Number((count.rows ?? count)[0]?.cnt ?? 0);
        if (cnt >= NETWORK_RATES.charterPartnerMax) {
          networkLevel = 2; // Overflow to Founding Partner
        }
      }

      const referralCode = await getUniqueReferralCode(db as any);

      // Create profile
      await (db as any).execute(sql`
        INSERT INTO pro_network_profile
          (user_id, network_level, referred_by_user_id, referral_code, subscription_active,
           business_mailing_address, created_at, updated_at)
        VALUES
          (${ctx.user.id}, ${networkLevel}, ${referrerUserId}, ${referralCode}, 0,
           ${input.businessMailingAddress ?? null}, NOW(), NOW())
      `);

      // Build upline chain (walk up to 3 levels)
      if (referrerUserId) {
        // L1 = direct referrer
        await (db as any).execute(sql`
          INSERT INTO pro_upline_chain (pro_user_id, upline_user_id, levels_above, upline_network_level, created_at)
          SELECT ${ctx.user.id}, np.user_id, 1, np.network_level, NOW()
          FROM pro_network_profile np WHERE np.user_id = ${referrerUserId}
        `);
        // L2 = referrer's referrer
        await (db as any).execute(sql`
          INSERT INTO pro_upline_chain (pro_user_id, upline_user_id, levels_above, upline_network_level, created_at)
          SELECT ${ctx.user.id}, uc.upline_user_id, 2, np2.network_level, NOW()
          FROM pro_upline_chain uc
          JOIN pro_network_profile np2 ON np2.user_id = uc.upline_user_id
          WHERE uc.pro_user_id = ${referrerUserId} AND uc.levels_above = 1
        `);
        // L3 = referrer's referrer's referrer
        await (db as any).execute(sql`
          INSERT INTO pro_upline_chain (pro_user_id, upline_user_id, levels_above, upline_network_level, created_at)
          SELECT ${ctx.user.id}, uc.upline_user_id, 3, np3.network_level, NOW()
          FROM pro_upline_chain uc
          JOIN pro_network_profile np3 ON np3.user_id = uc.upline_user_id
          WHERE uc.pro_user_id = ${referrerUserId} AND uc.levels_above = 2
        `);
      }

      return { success: true, referralCode, networkLevel };
    }),

  // Protected: partner's full network income dashboard data
  getDashboard: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    const profileRows = await (db as any).execute(
      sql`SELECT * FROM pro_network_profile WHERE user_id = ${ctx.user.id} LIMIT 1`
    );
    const profile = (profileRows.rows ?? profileRows)[0];
    if (!profile) return null;

    const currentMonth = new Date().toISOString().slice(0, 7);

    // Monthly income breakdown
    const incomeRows = await (db as any).execute(sql`
      SELECT payout_type, SUM(amount) as total
      FROM commission_payout
      WHERE recipient_user_id = ${ctx.user.id} AND payout_month = ${currentMonth}
      GROUP BY payout_type
    `);
    const incomeByType: Record<string, number> = {};
    for (const r of (incomeRows.rows ?? incomeRows)) {
      incomeByType[r.payout_type] = Number(r.total ?? 0);
    }

    // Downline counts
    const downlineRows = await (db as any).execute(sql`
      SELECT COUNT(*) as total,
        SUM(CASE WHEN levels_above = 1 THEN 1 ELSE 0 END) as direct
      FROM pro_upline_chain WHERE upline_user_id = ${ctx.user.id}
    `);
    const downline = (downlineRows.rows ?? downlineRows)[0];

    // Direct referrals with their info
    const directRows = await (db as any).execute(sql`
      SELECT p.businessName, p.businessType, np.network_level, np.jobs_completed_this_month,
             np.referral_code, np.created_at
      FROM pro_upline_chain uc
      JOIN pro_network_profile np ON np.user_id = uc.pro_user_id
      JOIN partners p ON p.userId = uc.pro_user_id
      WHERE uc.upline_user_id = ${ctx.user.id} AND uc.levels_above = 1
      ORDER BY uc.created_at DESC
      LIMIT 50
    `);

    const appBaseUrl = process.env.APP_BASE_URL ?? "https://prolnk.io";

    return {
      referralCode: profile.referral_code as string,
      referralLink: `${appBaseUrl}/join?ref=${profile.referral_code}`,
      networkLevel: Number(profile.network_level),
      subscriptionActive: Boolean(profile.subscription_active),
      jobsCompletedThisMonth: Number(profile.jobs_completed_this_month),
      totalNetworkIncomeEarned: Number(profile.total_network_income_earned),
      pendingPayoutAmount: Number(profile.pending_payout_amount),
      agreementSignedAt: profile.agreement_signed_at,
      incomeByType,
      monthlyTotal: Object.values(incomeByType).reduce((a, b) => a + b, 0),
      directReferrals: Number(downline?.direct ?? 0),
      totalDownline: Number(downline?.total ?? 0),
      directReferralList: (directRows.rows ?? directRows).map((r: any) => ({
        businessName: r.businessName,
        trade: r.businessType,
        level: Number(r.network_level),
        jobsThisMonth: Number(r.jobs_completed_this_month),
        referralCode: r.referral_code,
        joinedAt: r.created_at,
      })),
    };
  }),

  // Protected: payout history
  getPayoutHistory: protectedProcedure
    .input(z.object({ limit: z.number().default(50) }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];
      const rows = await (db as any).execute(sql`
        SELECT cp.*, jce.job_value, jce.job_completed_at
        FROM commission_payout cp
        LEFT JOIN job_commission_event jce ON jce.id = cp.job_commission_event_id
        WHERE cp.recipient_user_id = ${ctx.user.id}
        ORDER BY cp.created_at DESC
        LIMIT ${input.limit}
      `);
      return (rows.rows ?? rows).map((r: any) => ({
        id: r.id,
        payoutType: r.payout_type,
        amount: Number(r.amount),
        rateApplied: Number(r.rate_applied),
        status: r.status,
        payoutMonth: r.payout_month,
        jobValue: Number(r.job_value ?? 0),
        paidAt: r.paid_at,
        createdAt: r.created_at,
      }));
    }),

  // Sign agreement
  signAgreement: protectedProcedure
    .input(z.object({ version: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await (db as any).execute(sql`
        UPDATE pro_network_profile
        SET agreement_signed_at = NOW(), agreement_version = ${input.version}
        WHERE user_id = ${ctx.user.id}
      `);
      return { success: true };
    }),

  // Internal: process commissions after homeowner confirms a job
  processJobCommissions: protectedProcedure
    .input(z.object({
      jobId: z.string(),
      proUserId: z.string(),
      jobValue: z.number().positive(),
      propertyAddress: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const currentMonth = new Date().toISOString().slice(0, 7);

      // Get the pro's network profile
      const proRows = await (db as any).execute(
        sql`SELECT * FROM pro_network_profile WHERE user_id = ${input.proUserId} LIMIT 1`
      );
      const pro = (proRows.rows ?? proRows)[0];
      if (!pro) return { success: false, reason: "Pro not enrolled in network" };

      const proLevel = Number(pro.network_level);
      const platformFeeGross = input.jobValue * 0.02; // 2% platform fee
      const networkPayouts: Array<{ userId: string; type: string; rate: number; amount: number }> = [];

      // Own-job commission
      const ownRate = NETWORK_RATES.ownJob[proLevel as keyof typeof NETWORK_RATES.ownJob] ?? 0.005;
      networkPayouts.push({
        userId: input.proUserId,
        type: "own_job",
        rate: ownRate,
        amount: input.jobValue * ownRate,
      });

      // Network income for upline
      const uplineRows = await (db as any).execute(sql`
        SELECT uc.upline_user_id, uc.levels_above, uc.upline_network_level, np.subscription_active, np.jobs_completed_this_month
        FROM pro_upline_chain uc
        JOIN pro_network_profile np ON np.user_id = uc.upline_user_id
        WHERE uc.pro_user_id = ${input.proUserId}
        ORDER BY uc.levels_above ASC
      `);

      for (const upline of (uplineRows.rows ?? uplineRows)) {
        const uplineLevel = Number(upline.upline_network_level);
        const maxDepth = NETWORK_RATES.networkDepth[uplineLevel as keyof typeof NETWORK_RATES.networkDepth] ?? 0;

        // Activity gate: skip if below minimum jobs, but don't break chain
        if (Number(upline.jobs_completed_this_month) < NETWORK_RATES.minimumJobsPerMonth) continue;
        // Subscription gate
        if (!upline.subscription_active) continue;
        // Depth gate: only earns if this upline is within their allowed depth
        if (Number(upline.levels_above) > maxDepth) continue;

        const rate = NETWORK_RATES.networkIncome[uplineLevel as keyof typeof NETWORK_RATES.networkIncome] ?? 0;
        if (rate <= 0) continue;

        networkPayouts.push({
          userId: upline.upline_user_id,
          type: `network_l${upline.levels_above}`,
          rate,
          amount: input.jobValue * rate,
        });
      }

      // Photo origination ($0.25 for first documentation of this address)
      const addressHash = hashAddress(input.propertyAddress);
      const existingDoc = await (db as any).execute(
        sql`SELECT id FROM home_documentation WHERE address_hash = ${addressHash} LIMIT 1`
      );
      const isFirst = !(existingDoc.rows ?? existingDoc)[0];

      await (db as any).execute(sql`
        INSERT IGNORE INTO home_documentation
          (pro_user_id, address_hash, full_address, is_first_documentation, origination_credit_earned, origination_credit_amount, documented_at)
        VALUES
          (${input.proUserId}, ${addressHash}, ${input.propertyAddress}, ${isFirst ? 1 : 0}, ${isFirst ? 1 : 0}, ${isFirst ? 0.25 : 0.00}, NOW())
      `);

      if (isFirst) {
        networkPayouts.push({
          userId: input.proUserId,
          type: "photo_origination",
          rate: 0,
          amount: NETWORK_RATES.photoOrigination,
        });
      }

      // Create job_commission_event
      await (db as any).execute(sql`
        INSERT INTO job_commission_event
          (pro_user_id, job_id, job_value, job_completed_at, homeowner_confirmed, homeowner_confirmed_at,
           platform_fee_gross, platform_fee_net, status, created_at)
        VALUES
          (${input.proUserId}, ${input.jobId}, ${input.jobValue}, NOW(), 1, NOW(),
           ${platformFeeGross}, ${platformFeeGross * 0.85}, 'confirmed', NOW())
      `);

      const eventRows = await (db as any).execute(
        sql`SELECT id FROM job_commission_event WHERE job_id = ${input.jobId} LIMIT 1`
      );
      const eventId = (eventRows.rows ?? eventRows)[0]?.id;

      // Insert commission_payout rows
      for (const p of networkPayouts) {
        await (db as any).execute(sql`
          INSERT INTO commission_payout
            (job_commission_event_id, recipient_user_id, source_pro_user_id, payout_type, rate_applied, amount, status, payout_month, created_at)
          VALUES
            (${eventId}, ${p.userId}, ${input.proUserId}, ${p.type}, ${p.rate}, ${p.amount.toFixed(2)}, 'pending', ${currentMonth}, NOW())
        `);

        // Update pending payout amount on profile
        await (db as any).execute(sql`
          UPDATE pro_network_profile
          SET pending_payout_amount = pending_payout_amount + ${p.amount.toFixed(2)},
              total_network_income_earned = total_network_income_earned + ${p.amount.toFixed(2)},
              jobs_completed_this_month = jobs_completed_this_month + 1,
              last_job_completed_at = NOW()
          WHERE user_id = ${p.userId}
        `);
      }

      // Update subscription rebate for Charter Partners after 90 days
      await (db as any).execute(sql`
        UPDATE pro_network_profile
        SET pending_payout_amount = pending_payout_amount + ${NETWORK_RATES.subscriptionMonthly}
        WHERE user_id = ${input.proUserId}
          AND network_level = 1
          AND subscription_active = 1
          AND DATEDIFF(NOW(), created_at) >= 90
          AND agreement_signed_at IS NOT NULL
      `).catch(() => {}); // Non-fatal

      return { success: true, payoutsCreated: networkPayouts.length };
    }),

  // Admin: full network overview
  adminGetNetworkOverview: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    const currentMonth = new Date().toISOString().slice(0, 7);

    // Counts by level
    const levelCounts = await (db as any).execute(sql`
      SELECT network_level, COUNT(*) as cnt FROM pro_network_profile GROUP BY network_level
    `);

    // Pending payouts total
    const pendingTotal = await (db as any).execute(sql`
      SELECT SUM(amount) as total FROM commission_payout WHERE status = 'pending' AND payout_month = ${currentMonth}
    `);

    // All pros with stats
    const pros = await (db as any).execute(sql`
      SELECT np.*, p.businessName, p.businessType, p.contactEmail,
        (SELECT COUNT(*) FROM pro_upline_chain WHERE upline_user_id = np.user_id) as downlineCount,
        (SELECT SUM(amount) FROM commission_payout WHERE recipient_user_id = np.user_id AND payout_month = ${currentMonth}) as monthlyIncome
      FROM pro_network_profile np
      JOIN partners p ON p.userId = np.user_id
      ORDER BY np.network_level ASC, np.total_network_income_earned DESC
      LIMIT 500
    `);

    const byLevel: Record<number, number> = {};
    for (const r of (levelCounts.rows ?? levelCounts)) {
      byLevel[Number(r.network_level)] = Number(r.cnt);
    }

    const LEVEL_NAMES: Record<number, string> = {
      1: "Charter Partner",
      2: "Founding Partner",
      3: "Growth Pro",
      4: "Standard Pro",
    };

    return {
      byLevel,
      totalPros: Object.values(byLevel).reduce((a, b) => a + b, 0),
      pendingPayoutTotal: Number((pendingTotal.rows ?? pendingTotal)[0]?.total ?? 0),
      pros: (pros.rows ?? pros).map((r: any) => ({
        userId: r.user_id,
        businessName: r.businessName,
        trade: r.businessType,
        email: r.contactEmail,
        networkLevel: Number(r.network_level),
        levelName: LEVEL_NAMES[Number(r.network_level)] ?? "Unknown",
        referralCode: r.referral_code,
        subscriptionActive: Boolean(r.subscription_active),
        jobsThisMonth: Number(r.jobs_completed_this_month),
        downlineCount: Number(r.downlineCount ?? 0),
        monthlyIncome: Number(r.monthlyIncome ?? 0),
        totalEarned: Number(r.total_network_income_earned),
        pendingPayout: Number(r.pending_payout_amount),
        joinedAt: r.created_at,
      })),
    };
  }),
});
