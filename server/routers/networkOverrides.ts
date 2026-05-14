import { z } from "zod";
import { router, publicProcedure } from "../_core/trpc";
import { getPool } from "../db";

const SUB_PRICE = 149;
const RATES = { l1: 0.12, l2: 0.06, l3: 0.03, l4: 0.015 } as const;

export const networkOverridesRouter = router({
  getOverrideIncome: publicProcedure
    .input(z.object({ referralCode: z.string() }))
    .query(async ({ input }) => {
      const pool = await getPool();
      if (!pool) {
        return { l1Count: 0, l2Count: 0, l3Count: 0, l4Count: 0, monthlyIncome: 0, annualIncome: 0 };
      }

      const { referralCode } = input;

      const [l1Rows] = await pool.query(
        "SELECT referralCode FROM proWaitlist WHERE referredBy = ? AND status = 'active'",
        [referralCode.toUpperCase()]
      );
      const l1Codes = (l1Rows as any[]).map((r) => r.referralCode as string).filter(Boolean);

      let l2Codes: string[] = [];
      if (l1Codes.length > 0) {
        const [l2Rows] = await pool.query(
          `SELECT referralCode FROM proWaitlist WHERE referredBy IN (${l1Codes.map(() => "?").join(",")}) AND status = 'active'`,
          l1Codes
        );
        l2Codes = (l2Rows as any[]).map((r) => r.referralCode as string).filter(Boolean);
      }

      let l3Codes: string[] = [];
      if (l2Codes.length > 0) {
        const [l3Rows] = await pool.query(
          `SELECT referralCode FROM proWaitlist WHERE referredBy IN (${l2Codes.map(() => "?").join(",")}) AND status = 'active'`,
          l2Codes
        );
        l3Codes = (l3Rows as any[]).map((r) => r.referralCode as string).filter(Boolean);
      }

      let l4Count = 0;
      if (l3Codes.length > 0) {
        const [l4Rows] = await pool.query(
          `SELECT COUNT(*) as cnt FROM proWaitlist WHERE referredBy IN (${l3Codes.map(() => "?").join(",")}) AND status = 'active'`,
          l3Codes
        );
        l4Count = parseInt((l4Rows as any[])[0]?.cnt ?? "0");
      }

      const l1Count = l1Codes.length;
      const l2Count = l2Codes.length;
      const l3Count = l3Codes.length;

      const monthlyIncome =
        l1Count * SUB_PRICE * RATES.l1 +
        l2Count * SUB_PRICE * RATES.l2 +
        l3Count * SUB_PRICE * RATES.l3 +
        l4Count * SUB_PRICE * RATES.l4;

      return {
        l1Count,
        l2Count,
        l3Count,
        l4Count,
        monthlyIncome: Math.round(monthlyIncome * 100) / 100,
        annualIncome: Math.round(monthlyIncome * 12 * 100) / 100,
      };
    }),
});
