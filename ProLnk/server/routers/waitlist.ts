import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, adminProcedure, router } from "../_core/trpc";
import { getDb, getPool } from "../db";
import { sql } from "drizzle-orm";
import { sendProWaitlistConfirmation, sendHomeownerWaitlistConfirmation } from "../email";
import { notifyOwner } from "../_core/notification";
import { createLogger } from "../_core/logger";
import { analyticsTracker } from "../_core/analytics";

const logger = createLogger("waitlist");

// Tier thresholds by position
const TIER_THRESHOLDS = { charter: 100, founding: 500, growth: 1000 };

function assignTier(position: number): string {
  if (position <= TIER_THRESHOLDS.charter) return "charter";
  if (position <= TIER_THRESHOLDS.founding) return "founding";
  if (position <= TIER_THRESHOLDS.growth) return "growth";
  return "standard";
}

// Tier commission rates
const TIER_RATES = {
  charter:  { ownJob: 0.020, networkL1: 0.010, networkL2: 0.008, networkL3: 0.006, networkL4: 0.004, label: "Charter Partner" },
  founding: { ownJob: 0.015, networkL1: 0.008, networkL2: 0.006, networkL3: 0.004, networkL4: 0.000, label: "Founding Partner" },
  growth:   { ownJob: 0.010, networkL1: 0.006, networkL2: 0.004, networkL3: 0.000, networkL4: 0.000, label: "Growth Pro" },
  standard: { ownJob: 0.005, networkL1: 0.000, networkL2: 0.000, networkL3: 0.000, networkL4: 0.000, label: "Standard Pro" },
};

function generateReferralCode(length = 7): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < length; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

const ProWaitlistSchema = z.object({
  firstName: z.string().min(1).max(100).trim(),
  lastName: z.string().min(1).max(100).trim(),
  email: z.string().email().toLowerCase(),
  phone: z.string().min(7).max(30),
  trade: z.string().min(1).max(100),
  primaryCity: z.string().min(1).max(100),
  primaryState: z.string().min(2).max(2),
  referredBy: z.string().max(20).optional(),
});

const HomeWaitlistSchema = z.object({
  firstName: z.string().min(1).max(100).trim(),
  lastName: z.string().min(1).max(100).trim(),
  email: z.string().email().toLowerCase(),
  phone: z.string().max(30).optional(),
  address: z.string().min(1).max(500),
  city: z.string().min(1).max(100),
  state: z.string().min(2).max(2),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/),
  serviceNeeded: z.string().min(1).max(255),
  referredBy: z.string().max(20).optional(),
});

const SimpleWaitlistSchema = z.object({
  name: z.string().min(1).max(200).trim(),
  email: z.string().email().toLowerCase(),
});

export const waitlistRouter = router({
  joinProWaitlist: publicProcedure
    .input(ProWaitlistSchema)
    .mutation(async ({ input, ctx }) => {
      return await logger.track("waitlist:joinProWaitlist", async () => {
        const db = await getDb();
        const pool = await getPool();
        const ipAddress = ctx.req.ip || ctx.req.headers["x-forwarded-for"] || "unknown";
        const userAgent = ctx.req.headers["user-agent"];

        if (!db || !pool) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
        }

        // Check for duplicate
        const [existingRows] = await pool.query(
          "SELECT id FROM proWaitlist WHERE email = ? LIMIT 1",
          [input.email]
        );
        if ((existingRows as any[])?.[0]) {
          await analyticsTracker.track({ type: "error", source: "pro_waitlist", email: input.email }, String(ipAddress), String(userAgent));
          throw new TRPCError({ code: "CONFLICT", message: "This email is already registered on the ProLnk waitlist." });
        }

        // Get current position
        const [countRows] = await pool.query("SELECT COUNT(*) as cnt FROM proWaitlist");
        const currentCount = Number((countRows as any[])[0]?.cnt ?? 0);
        const position = currentCount + 1;
        const tier = assignTier(position);

        // Generate unique referral code
        let referralCode = generateReferralCode();
        let codeAttempts = 0;
        while (codeAttempts < 10) {
          const [existing] = await pool.query("SELECT id FROM proWaitlist WHERE referralCode = ? LIMIT 1", [referralCode]);
          if (!(existing as any[])[0]) break;
          referralCode = generateReferralCode();
          codeAttempts++;
        }

        // Validate referredBy code if provided
        let referrerId: number | null = null;
        if (input.referredBy) {
          const [refRows] = await pool.query("SELECT id FROM proWaitlist WHERE referralCode = ? LIMIT 1", [input.referredBy.toUpperCase()]);
          if ((refRows as any[])[0]) {
            referrerId = (refRows as any[])[0].id;
          }
        }

        const proId = Math.floor(Math.random() * 2_000_000_000) + 1;

        await pool.query(
          `INSERT INTO proWaitlist (
            id, firstName, lastName, email, phone, businessName, businessType, yearsInBusiness,
            employeeCount, estimatedJobsPerMonth, avgJobValue, trades, primaryCity, primaryState,
            serviceZipCodes, serviceRadiusMiles, currentSoftware, referralsGivenPerMonth,
            referralsReceivedPerMonth, primaryGoal,
            referralCode, referredBy, tier, waitlistPosition, referralCount
          ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?
          )`,
          [
            proId,
            input.firstName, input.lastName, input.email, input.phone,
            input.trade, input.trade, 1,
            "1", 0, "varies", JSON.stringify([input.trade]), input.primaryCity, input.primaryState,
            input.primaryState, 25, JSON.stringify([]), "0", "0", "more_leads",
            referralCode,
            input.referredBy ? input.referredBy.toUpperCase() : null,
            tier,
            position,
            0
          ]
        );

        // Increment referral count for the referring partner
        if (referrerId) {
          await pool.query(
            "UPDATE proWaitlist SET referralCount = referralCount + 1 WHERE id = ?",
            [referrerId]
          ).catch(() => {});
        }

        const rates = TIER_RATES[tier as keyof typeof TIER_RATES];

        sendProWaitlistConfirmation({
          to: input.email,
          firstName: input.firstName,
          trade: input.trade,
          position,
          city: input.primaryCity,
        }).catch((err) => {
          console.error("[waitlist] Email send failed for Pro waitlist", { email: input.email, error: err?.message });
        });

        notifyOwner({
          subject: `New ProLnk Pro Signup: ${input.firstName} ${input.lastName} (${input.trade})`,
          body: `Position #${position} | Tier: ${rates.label} | Referred by: ${input.referredBy || "organic"} | City: ${input.primaryCity}, ${input.primaryState}`,
        }).catch(() => {});

        return {
          success: true as const,
          position,
          tier,
          tierLabel: rates.label,
          referralCode,
          ownJobRate: rates.ownJob,
          spotsRemaining: Math.max(0, TIER_THRESHOLDS.charter - position),
        };
      });
    }),

  // Get waitlist status by email or referral code
  getWaitlistStatus: publicProcedure
    .input(z.object({
      email: z.string().email().optional(),
      referralCode: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const pool = await getPool();
      if (!pool) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      let rows: any[];
      if (input.email) {
        const [r] = await pool.query(
          "SELECT id, firstName, lastName, email, businessType as trade, primaryCity, primaryState, referralCode, referredBy, tier, waitlistPosition, referralCount, createdAt FROM proWaitlist WHERE email = ? LIMIT 1",
          [input.email]
        );
        rows = r as any[];
      } else if (input.referralCode) {
        const [r] = await pool.query(
          "SELECT id, firstName, lastName, email, businessType as trade, primaryCity, primaryState, referralCode, referredBy, tier, waitlistPosition, referralCount, createdAt FROM proWaitlist WHERE referralCode = ? LIMIT 1",
          [input.referralCode.toUpperCase()]
        );
        rows = r as any[];
      } else {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Provide email or referralCode" });
      }

      if (!rows[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Not found on waitlist" });

      const row = rows[0];
      const tier = (row.tier as string) || "standard";
      const rates = TIER_RATES[tier as keyof typeof TIER_RATES];
      const position = row.waitlistPosition || 1;

      // Calculate tier upgrade path
      const referralCount = row.referralCount || 0;
      let upgradeMessage = "";
      if (tier === "standard") upgradeMessage = `Refer ${Math.max(0, 1 - referralCount)} more pro to reach Growth tier`;
      else if (tier === "growth") upgradeMessage = `Refer ${Math.max(0, 3 - referralCount)} more pros to reach Founding tier`;
      else if (tier === "founding") upgradeMessage = `Refer ${Math.max(0, 5 - referralCount)} more pros to reach Charter tier`;
      else upgradeMessage = "You are at the top Charter Partner tier!";

      // Get direct referrals
      const [refRows] = await pool.query(
        "SELECT firstName, lastName, trade, createdAt FROM proWaitlist WHERE referredBy = ? ORDER BY createdAt DESC LIMIT 20",
        [row.referralCode]
      );

      // Get total count for leaderboard context
      const [totalRows] = await pool.query("SELECT COUNT(*) as cnt FROM proWaitlist");
      const totalSignups = Number((totalRows as any[])[0]?.cnt ?? 0);

      return {
        found: true,
        firstName: row.firstName,
        lastName: row.lastName,
        trade: row.trade,
        city: row.primaryCity,
        state: row.primaryState,
        referralCode: row.referralCode,
        referredBy: row.referredBy,
        tier,
        tierLabel: rates.label,
        position,
        totalSignups,
        referralCount,
        rates,
        upgradeMessage,
        referrals: (refRows as any[]).map(r => ({
          firstName: r.firstName,
          trade: r.trade,
          joinedAt: r.createdAt,
        })),
        spotsRemaining: {
          charter: Math.max(0, TIER_THRESHOLDS.charter - totalSignups),
          founding: Math.max(0, TIER_THRESHOLDS.founding - totalSignups),
        },
      };
    }),

  // Get public leaderboard (top referrers, no PII)
  getLeaderboard: publicProcedure.query(async () => {
    const pool = await getPool();
    if (!pool) return { leaders: [], totalSignups: 0 };
    const [rows] = await pool.query(
      "SELECT firstName, LEFT(lastName, 1) as lastInitial, businessType as trade, primaryCity, primaryState, referralCount, tier, waitlistPosition FROM proWaitlist WHERE referralCount > 0 ORDER BY referralCount DESC LIMIT 20"
    );
    const [total] = await pool.query("SELECT COUNT(*) as cnt FROM proWaitlist");
    return {
      leaders: (rows as any[]).map((r, i) => ({
        rank: i + 1,
        name: `${r.firstName} ${r.lastInitial}.`,
        trade: r.trade,
        city: r.primaryCity,
        state: r.primaryState,
        referralCount: r.referralCount,
        tier: r.tier,
      })),
      totalSignups: Number((total as any[])[0]?.cnt ?? 0),
    };
  }),

  joinHomeWaitlist: publicProcedure
    .input(HomeWaitlistSchema)
    .mutation(async ({ input, ctx }) => {
      return await logger.track("waitlist:joinHomeWaitlist", async () => {
        const db = await getDb();
        const pool = await getPool();
        const ipAddress = ctx.req.ip || ctx.req.headers["x-forwarded-for"] || "unknown";
        const userAgent = ctx.req.headers["user-agent"];

        if (!db || !pool) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
        }

        const [existingRows] = await pool.query("SELECT id FROM homeWaitlist WHERE email = ? LIMIT 1", [input.email]);
        if ((existingRows as any[])?.[0]) {
          await analyticsTracker.track({ type: "error", source: "home_waitlist", email: input.email }, String(ipAddress), String(userAgent));
          throw new TRPCError({ code: "CONFLICT", message: "This email is already registered on the TrustyPro waitlist." });
        }

        const [countRows] = await pool.query("SELECT COUNT(*) as cnt FROM homeWaitlist");
        const position = Number((countRows as any[])[0]?.cnt ?? 0) + 1;

        const homeId = Math.floor(Math.random() * 2_000_000_000) + 1;

        await pool.query(
          `INSERT INTO homeWaitlist (
            id, firstName, lastName, email, phone, address, city, state, zipCode, homeType,
            desiredProjects, projectTimeline, ownershipStatus, ownershipType, status, referredBy
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            homeId,
            input.firstName, input.lastName, input.email, input.phone ?? null,
            input.address, input.city, input.state, input.zipCode, "single_family",
            JSON.stringify([input.serviceNeeded]), "just_exploring", "own", "primary_residence",
            "pending", input.referredBy ?? null
          ]
        );

        sendHomeownerWaitlistConfirmation({
          to: input.email,
          firstName: input.firstName,
          city: input.city,
          serviceNeeded: input.serviceNeeded,
          position,
        }).catch((err) => {
          console.error("[waitlist] Email send failed for Homeowner waitlist", { email: input.email, error: err?.message });
        });

        notifyOwner({
          subject: `New TrustyPro Homeowner Signup: ${input.firstName} ${input.lastName}`,
          body: `Position #${position} | Service: ${input.serviceNeeded} | City: ${input.city}, ${input.state}`,
        }).catch(() => {});

        return { success: true as const, position };
      });
    }),

  joinSimpleWaitlist: publicProcedure
    .input(SimpleWaitlistSchema)
    .mutation(async ({ input }) => {
      const pool = await getPool();
      if (!pool) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
      const [existing] = await pool.query("SELECT id FROM proWaitlist WHERE email = ? LIMIT 1", [input.email]);
      if ((existing as any[])[0]) return { success: true as const, position: 1, alreadyRegistered: true };
      const [countRows] = await pool.query("SELECT COUNT(*) as cnt FROM proWaitlist");
      const position = Number((countRows as any[])[0]?.cnt ?? 0) + 1;
      const [nameparts] = [input.name.split(" ")];
      const firstName = nameparts[0] || input.name;
      const lastName = nameparts.slice(1).join(" ") || "";
      const id = Math.floor(Math.random() * 2_000_000_000) + 1;
      const referralCode = generateReferralCode();
      const tier = assignTier(position);
      await pool.query(
        "INSERT INTO proWaitlist (id, firstName, lastName, email, phone, businessName, businessType, yearsInBusiness, employeeCount, estimatedJobsPerMonth, avgJobValue, trades, primaryCity, primaryState, serviceZipCodes, serviceRadiusMiles, currentSoftware, referralsGivenPerMonth, referralsReceivedPerMonth, primaryGoal, referralCode, tier, waitlistPosition, referralCount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [id, firstName, lastName, input.email, "", "", "", 1, "1", 0, "varies", "[]", "", "", "", 25, "[]", "0", "0", "more_leads", referralCode, tier, position, 0]
      );
      return { success: true as const, position };
    }),

  getWaitlistMetrics: adminProcedure.query(async () => {
    const pool = await getPool();
    if (!pool) return {};
    const [pros] = await pool.query("SELECT COUNT(*) as cnt FROM proWaitlist");
    const [homes] = await pool.query("SELECT COUNT(*) as cnt FROM homeWaitlist");
    const [tiers] = await pool.query("SELECT tier, COUNT(*) as cnt FROM proWaitlist GROUP BY tier");
    const [topRefs] = await pool.query("SELECT firstName, LEFT(lastName,1) as li, referralCount, tier FROM proWaitlist ORDER BY referralCount DESC LIMIT 10");
    return {
      totalPros: Number((pros as any[])[0]?.cnt ?? 0),
      totalHomes: Number((homes as any[])[0]?.cnt ?? 0),
      tierBreakdown: (tiers as any[]).reduce((acc, r) => ({ ...acc, [r.tier]: Number(r.cnt) }), {}),
      topReferrers: topRefs,
    };
  }),

  exportWaitlist: adminProcedure.query(async () => {
    const pool = await getPool();
    if (!pool) return [];
    const [rows] = await pool.query(
      "SELECT firstName, lastName, email, phone, businessType as trade, primaryCity, primaryState, tier, waitlistPosition, referralCode, referredBy, referralCount, status, createdAt FROM proWaitlist ORDER BY waitlistPosition ASC"
    );
    return rows as any[];
  }),
});
