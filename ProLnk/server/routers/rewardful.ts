import { z } from "zod";
import { router, publicProcedure } from "../_core/trpc";

const REWARDFUL_BASE = "https://api.getrewardful.com/v1";

function authHeader(): string {
  const secret = process.env.REWARDFUL_API_SECRET ?? "";
  return `Basic ${Buffer.from(`${secret}:`).toString("base64")}`;
}

function hasSecret(): boolean {
  return Boolean(process.env.REWARDFUL_API_SECRET);
}

export const rewardfulRouter = router({
  trackReferral: publicProcedure
    .input(z.object({
      referralId: z.string(),
      stripeCustomerId: z.string(),
      email: z.string().email(),
    }))
    .mutation(async ({ input }) => {
      if (!hasSecret()) {
        return { success: true, mock: true, referralId: input.referralId };
      }
      const res = await fetch(`${REWARDFUL_BASE}/referrals`, {
        method: "POST",
        headers: {
          Authorization: authHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          referral_id: input.referralId,
          stripe_customer_id: input.stripeCustomerId,
          email: input.email,
          campaign_id: process.env.REWARDFUL_CAMPAIGN_ID,
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        return { success: false, error: text };
      }
      const data = await res.json() as Record<string, unknown>;
      return { success: true, data };
    }),

  getAffiliateStats: publicProcedure
    .input(z.object({ referralCode: z.string() }))
    .query(async ({ input }) => {
      if (!hasSecret()) {
        return {
          mock: true,
          clicks: 0,
          conversions: 0,
          commissionEarned: 0,
          referralCode: input.referralCode,
        };
      }
      const res = await fetch(
        `${REWARDFUL_BASE}/affiliates?campaign_id=${process.env.REWARDFUL_CAMPAIGN_ID ?? ""}&referral_code=${input.referralCode}`,
        { headers: { Authorization: authHeader() } }
      );
      if (!res.ok) {
        return { clicks: 0, conversions: 0, commissionEarned: 0, error: await res.text() };
      }
      const data = await res.json() as { data?: Array<{ clicks: number; conversions: number; commission_amount: number }> };
      const affiliate = data.data?.[0];
      return {
        clicks: affiliate?.clicks ?? 0,
        conversions: affiliate?.conversions ?? 0,
        commissionEarned: affiliate?.commission_amount ?? 0,
      };
    }),

  createAffiliateLink: publicProcedure
    .input(z.object({ code: z.string() }))
    .mutation(({ input }) => {
      const url = `https://prolnk.xyz/pro-waitlist?via=${encodeURIComponent(input.code)}`;
      return { url };
    }),
});
