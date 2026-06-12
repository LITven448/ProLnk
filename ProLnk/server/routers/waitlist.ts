import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, adminProcedure, router } from "../_core/trpc";
import { getDb, getPool } from "../db";
import { sql } from "drizzle-orm";
import { sendProWaitlistConfirmation, sendHomeownerWaitlistConfirmation } from "../email";
import { sendWaitlistConfirmSMS } from "../sms";
import { automations } from "../webhooks/n8nAutomation";
import { notifyOwner } from "../_core/notification";
import { createLogger } from "../_core/logger";
import { analyticsTracker } from "../_core/analytics";

const logger = createLogger("waitlist");

// ProLnk 4-Tier Founding Network — caps are cumulative position thresholds
// Charter (25) → Founding (100) → Level 3 (400) → Level 4 (1600) = 2,125 total
// All founding network tiers get same package: $149/mo locked, 60% keep, 4-level depth
const TIER_CAP = { charter: 25, founding: 125, level3: 525, level4: 2125 };

function assignTier(position: number): string {
  if (position <= TIER_CAP.charter)  return "charter";
  if (position <= TIER_CAP.founding) return "founding";
  if (position <= TIER_CAP.level3)   return "level3";
  if (position <= TIER_CAP.level4)   return "level4";
  return "waitlist"; // after founding network closes
}

// All 4 tiers in founding network share the same rates
// (tier label differs, benefits are identical — $149/mo locked, 60% keep rate)
const FOUNDING_RATES = {
  jobCommissionKeepRate: 0.60,
  homeOriginationRate: 0.05,
  networkJob:  { l1: 0.07, l2: 0.04, l3: 0.02, l4: 0.01 },
  networkSubs: { l1: 0.12, l2: 0.06, l3: 0.03, l4: 0.015 },
  platformFeeMin: 0.03, platformFeeMax: 0.12,
  subscriptionRate: 149, trialDays: 90,
};

const TIER_LABELS: Record<string, string> = {
  charter:  "Charter Member",
  founding: "Founding Member",
  level3:   "Growth Member",
  level4:   "Network Member",
  waitlist: "Waitlist",
};

const TIER_SPOTS_REMAINING = (totalSignups: number) => ({
  charter:  Math.max(0, 25   - totalSignups),
  founding: Math.max(0, 125  - totalSignups),
  level3:   Math.max(0, 525  - totalSignups),
  level4:   Math.max(0, 2125 - totalSignups),
  total:    Math.max(0, 2125 - totalSignups),
});

// Legacy alias so existing getWaitlistStatus code works
const TIER_RATES: Record<string, { label: string; ownJob: number; networkL1: number }> = {
  charter:  { label: "Charter Member",   ownJob: FOUNDING_RATES.jobCommissionKeepRate, networkL1: FOUNDING_RATES.networkJob.l1 },
  founding: { label: "Founding Member",  ownJob: FOUNDING_RATES.jobCommissionKeepRate, networkL1: FOUNDING_RATES.networkJob.l1 },
  level3:   { label: "Growth Member",    ownJob: FOUNDING_RATES.jobCommissionKeepRate, networkL1: FOUNDING_RATES.networkJob.l1 },
  level4:   { label: "Network Member",    ownJob: FOUNDING_RATES.jobCommissionKeepRate, networkL1: FOUNDING_RATES.networkJob.l1 },
  waitlist: { label: "Waitlist",          ownJob: 0, networkL1: 0 },
};

void FOUNDING_RATES;
void TIER_LABELS;
void TIER_SPOTS_REMAINING;

function generateReferralCode(length = 7): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < length; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

const SLUG_REGEX = /^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/;
const RESERVED_SLUGS = new Set([
  "admin", "api", "app", "apply", "blog", "dashboard", "help", "home",
  "join", "login", "pro", "settings", "signup", "status", "support",
]);


const ProWaitlistSchema = z.object({
  firstName: z.string().min(1).max(100).trim(),
  lastName: z.string().min(1).max(100).trim(),
  email: z.string().email().toLowerCase(),
  phone: z.string().min(7).max(30),
  trade: z.string().min(1).max(100),
  primaryCity: z.string().min(1).max(100),
  primaryState: z.string().min(2).max(2),
  referredBy: z.string().max(20).optional(),
  workStyle: z.enum(["solo", "owner", "scout"]).optional(),
  employeeCount: z.string().max(20).optional(),
  notes: z.string().max(500).optional(),
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
  // Home Health Vault — optional property enrichment (additive, never required)
  homeType: z.string().max(50).optional(),
  yearBuilt: z.coerce.number().int().min(1700).max(2100).optional(),
  squareFootage: z.coerce.number().int().min(0).max(1_000_000).optional(),
  lotSizeSqFt: z.coerce.number().int().min(0).max(100_000_000).optional(),
  bedrooms: z.coerce.number().int().min(0).max(100).optional(),
  bathrooms: z.string().max(10).optional(),
  stories: z.coerce.number().int().min(0).max(100).optional(),
  garageSpaces: z.coerce.number().int().min(0).max(50).optional(),
  hasPool: z.boolean().optional(),
  hasBasement: z.boolean().optional(),
  hasAttic: z.boolean().optional(),
  ownershipStatus: z.string().max(50).optional(),
  yearsOwned: z.coerce.number().int().min(0).max(200).optional(),
  overallCondition: z.string().max(100).optional(),
  roofType: z.string().max(100).optional(),
  roofAge: z.coerce.number().int().min(0).max(200).optional(),
  hvacType: z.string().max(100).optional(),
  hvacAge: z.coerce.number().int().min(0).max(200).optional(),
  waterHeaterType: z.string().max(100).optional(),
  waterHeaterAge: z.coerce.number().int().min(0).max(200).optional(),
  projectTimeline: z.string().max(255).optional(),
  estimatedBudget: z.string().max(50).optional(),
});

const SimpleWaitlistSchema = z.object({
  name: z.string().min(1).max(200).trim(),
  email: z.string().email().toLowerCase(),
});

// Step-2 enrichment for the 2-step signup at /apply-v2.
// Public + keyed by the email/id created in step 1. Purely additive — does NOT
// touch the joinProWaitlist required-field contract, so the live modal is unaffected.
export const UpdateProProfileSchema = z.object({
  email: z.string().email().toLowerCase(),
  id: z.number().int().optional(),
  businessName: z.string().max(255).optional(),
  businessType: z.string().max(100).optional(),
  yearsInBusiness: z.coerce.number().int().min(0).max(100).optional(),
  employeeCount: z.string().max(50).optional(),
  estimatedJobsPerMonth: z.coerce.number().int().min(0).max(100000).optional(),
  avgJobValue: z.string().max(50).optional(),
  trades: z.array(z.string().max(100)).max(50).optional(),
  serviceZipCodes: z.array(z.string().max(12)).max(200).optional(),
  serviceRadiusMiles: z.coerce.number().int().min(1).max(500).optional(),
  licenseNumber: z.string().max(100).optional(),
  insuranceCarrier: z.string().max(200).optional(),
  currentSoftware: z.array(z.string().max(100)).max(50).optional(),
  hearAboutUs: z.string().max(255).optional(),
  notes: z.string().max(1000).optional(),
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


      // Charter invite token — if provided and valid, force Charter tier
      let forcedTier: string | null = null;

      // Charter slug recruiter — anyone referred by Andrew's link gets Charter tier (up to 25 cap)
      const CHARTER_RECRUITER_SLUGS = ["andrew-frakes"];
      const CHARTER_RECRUITER_CODES = ["Z3YYJP7"];
      const referrerSlug = (input.referredBy ?? "").toLowerCase();
      const isCharterRecruiter =
        CHARTER_RECRUITER_SLUGS.includes(referrerSlug) ||
        CHARTER_RECRUITER_CODES.includes((input.referredBy ?? "").toUpperCase());

      if (isCharterRecruiter) {
        const [[charterCountRow]] = await (db as any).execute(
          sql`SELECT COUNT(*) as cnt FROM proWaitlist WHERE tier = 'charter'`
        ) as any;
        const charterUsed = Number(charterCountRow?.cnt ?? 0);
        if (charterUsed < 25) forcedTier = "charter";
      }

            // Get current position
        const [countRows] = await pool.query("SELECT COUNT(*) as cnt FROM proWaitlist");
        const currentCount = Number((countRows as any[])[0]?.cnt ?? 0);
        const position = currentCount + 1;
        const tier = forcedTier ?? assignTier(position);

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
          const [refRows] = await pool.query("SELECT id FROM proWaitlist WHERE referralCode = ? OR customSlug = ? LIMIT 1", [input.referredBy.toUpperCase(), input.referredBy.toLowerCase()]);
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
            input.trade, input.workStyle ?? "solo", 1,
            input.employeeCount ?? "1", 0, "varies", JSON.stringify([input.trade]), input.primaryCity, input.primaryState,
            input.primaryState, 25, JSON.stringify([]), "0", "0", input.notes ? `more_leads|${input.notes}` : "more_leads",
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

        const rates = TIER_RATES[tier as keyof typeof TIER_RATES] ?? TIER_RATES.waitlist;

        sendProWaitlistConfirmation({
          to: input.email,
          firstName: input.firstName,
          trade: input.trade,
          position,
          city: input.primaryCity,
          tier,
          referralCode,
        }).catch((err) => {
          console.error("[waitlist] Email send failed for Pro waitlist", { email: input.email, error: err?.message });
        });

        if (input.phone) {
          sendWaitlistConfirmSMS(input.phone, input.firstName, position).catch(() => {});
        }

        automations.partnerWaitlistJoined({ email: input.email, tier, position, referralCode, trade: input.trade, city: input.primaryCity }).catch(() => {});

        notifyOwner({
          title: `New ProLnk Pro Signup: ${input.firstName} ${input.lastName} (${input.trade})`,
          content: `Position #${position} | Tier: ${rates.label} | Referred by: ${input.referredBy || "organic"} | City: ${input.primaryCity}, ${input.primaryState}`,
        }).catch(() => {});

        return {
          success: true as const,
          position,
          tier,
          tierLabel: rates.label,
          referralCode,
          ownJobRate: rates.ownJob,
          spotsRemaining: { charter: Math.max(0, TIER_CAP.charter - position), founding: Math.max(0, TIER_CAP.founding - position), total: Math.max(0, TIER_CAP.level4 - position) },
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
          "SELECT id, firstName, lastName, email, businessType as trade, primaryCity, primaryState, referralCode, referredBy, tier, waitlistPosition, referralCount, homeownerReferralCount, createdAt FROM proWaitlist WHERE email = ? LIMIT 1",
          [input.email]
        );
        rows = r as any[];
      } else if (input.referralCode) {
        const [r] = await pool.query(
          "SELECT id, firstName, lastName, email, businessType as trade, primaryCity, primaryState, referralCode, referredBy, tier, waitlistPosition, referralCount, homeownerReferralCount, createdAt FROM proWaitlist WHERE referralCode = ? LIMIT 1",
          [input.referralCode.toUpperCase()]
        );
        rows = r as any[];
      } else {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Provide email or referralCode" });
      }

      if (!rows[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Not found on waitlist" });

      const row = rows[0];
      const tier = (row.tier as string) || "standard";
      const rates = TIER_RATES[tier as keyof typeof TIER_RATES] ?? TIER_RATES.waitlist;
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
        homeownerReferralCount: row.homeownerReferralCount || 0,
        rates,
        upgradeMessage,
        referrals: (refRows as any[]).map(r => ({
          firstName: r.firstName,
          trade: r.trade,
          joinedAt: r.createdAt,
        })),
        spotsRemaining: {
          charter: Math.max(0, TIER_CAP.charter - totalSignups),
          founding: Math.max(0, TIER_CAP.founding - totalSignups),
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

        const homeSystems: Record<string, string | number> = {};
        if (input.roofType !== undefined) homeSystems.roofType = input.roofType;
        if (input.roofAge !== undefined) homeSystems.roofAge = input.roofAge;
        if (input.hvacType !== undefined) homeSystems.hvacType = input.hvacType;
        if (input.hvacAge !== undefined) homeSystems.hvacAge = input.hvacAge;
        if (input.waterHeaterType !== undefined) homeSystems.waterHeaterType = input.waterHeaterType;
        if (input.waterHeaterAge !== undefined) homeSystems.waterHeaterAge = input.waterHeaterAge;

        const columns: Record<string, unknown> = {
          id: homeId,
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone ?? null,
          address: input.address,
          city: input.city,
          state: input.state,
          zipCode: input.zipCode,
          homeType: input.homeType ?? "single_family",
          desiredProjects: JSON.stringify([input.serviceNeeded]),
          projectTimeline: input.projectTimeline ?? "just_exploring",
          ownershipStatus: input.ownershipStatus ?? "own",
          ownershipType: "primary_residence",
          status: "pending",
          referredBy: input.referredBy ?? null,
        };
        if (input.yearBuilt !== undefined) columns.yearBuilt = input.yearBuilt;
        if (input.squareFootage !== undefined) columns.squareFootage = input.squareFootage;
        if (input.lotSizeSqFt !== undefined) columns.lotSizeSqFt = input.lotSizeSqFt;
        if (input.bedrooms !== undefined) columns.bedrooms = input.bedrooms;
        if (input.bathrooms !== undefined) columns.bathrooms = input.bathrooms;
        if (input.stories !== undefined) columns.stories = input.stories;
        if (input.garageSpaces !== undefined) columns.garageSpaces = input.garageSpaces;
        if (input.hasPool !== undefined) columns.hasPool = input.hasPool ? 1 : 0;
        if (input.hasBasement !== undefined) columns.hasBasement = input.hasBasement ? 1 : 0;
        if (input.hasAttic !== undefined) columns.hasAttic = input.hasAttic ? 1 : 0;
        if (input.yearsOwned !== undefined) columns.yearsOwned = input.yearsOwned;
        if (input.overallCondition !== undefined) columns.overallCondition = input.overallCondition;
        if (input.estimatedBudget !== undefined) columns.estimatedBudget = input.estimatedBudget;
        if (Object.keys(homeSystems).length > 0) columns.homeSystems = JSON.stringify(homeSystems);

        const colNames = Object.keys(columns);
        const placeholders = colNames.map(() => "?").join(", ");
        await pool.query(
          `INSERT INTO homeWaitlist (${colNames.map((c) => `\`${c}\``).join(", ")}) VALUES (${placeholders})`,
          colNames.map((c) => columns[c])
        );

        // Credit the referring partner/charter member for a homeowner referral.
        // referredBy may be their referralCode OR their customSlug. Never blocks
        // the signup — purely additive tracking (homeownerReferralCount column).
        if (input.referredBy) {
          try {
            await pool.query(
              "UPDATE proWaitlist SET homeownerReferralCount = homeownerReferralCount + 1 WHERE referralCode = ? OR customSlug = ? LIMIT 1",
              [input.referredBy.toUpperCase(), input.referredBy.toLowerCase()]
            );
          } catch (err) {
            console.error("[waitlist] homeowner referral credit failed", { ref: input.referredBy, error: (err as Error)?.message });
          }
        }

        sendHomeownerWaitlistConfirmation({
          to: input.email,
          firstName: input.firstName,
          address: input.address,
          city: input.city,
          serviceNeeded: input.serviceNeeded,
          position,
        }).catch((err) => {
          console.error("[waitlist] Email send failed for Homeowner waitlist", { email: input.email, error: err?.message });
        });

        automations.homeownerWaitlistJoined({ email: input.email, city: input.city, state: input.state, serviceNeeded: input.serviceNeeded }).catch(() => {});

        notifyOwner({
          title: `New TrustyPro Homeowner Signup: ${input.firstName} ${input.lastName}`,
          content: `Position #${position} | Service: ${input.serviceNeeded} | City: ${input.city}, ${input.state}`,
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

  // Step-2 profile enrichment for the 2-step /apply-v2 signup.
  // Updates the SAME proWaitlist row created in step 1 (looked up by id or email).
  // Only writes columns the partner actually filled in; tier/position/referral
  // untouched. Backward compatible — additive endpoint, no impact on live modal.
  updateProWaitlistProfile: publicProcedure
    .input(UpdateProProfileSchema)
    .mutation(async ({ input }) => {
      const pool = await getPool();
      if (!pool) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      let row: any;
      if (input.id) {
        const [r] = await pool.query("SELECT id, additionalNotes FROM proWaitlist WHERE id = ? LIMIT 1", [input.id]);
        row = (r as any[])[0];
      }
      if (!row) {
        const [r] = await pool.query("SELECT id, additionalNotes FROM proWaitlist WHERE email = ? LIMIT 1", [input.email]);
        row = (r as any[])[0];
      }
      if (!row) throw new TRPCError({ code: "NOT_FOUND", message: "No waitlist entry found for this email. Complete step 1 first." });

      const sets: string[] = [];
      const vals: any[] = [];
      const push = (col: string, val: any) => { sets.push(`${col} = ?`); vals.push(val); };

      if (input.businessName !== undefined) push("businessName", input.businessName);
      if (input.businessType !== undefined) push("businessType", input.businessType);
      if (input.yearsInBusiness !== undefined) push("yearsInBusiness", input.yearsInBusiness);
      if (input.employeeCount !== undefined) push("employeeCount", input.employeeCount);
      if (input.estimatedJobsPerMonth !== undefined) push("estimatedJobsPerMonth", input.estimatedJobsPerMonth);
      if (input.avgJobValue !== undefined) push("avgJobValue", input.avgJobValue);
      if (input.trades !== undefined && input.trades.length) push("trades", JSON.stringify(input.trades));
      if (input.serviceZipCodes !== undefined) push("serviceZipCodes", input.serviceZipCodes.join(","));
      if (input.serviceRadiusMiles !== undefined) push("serviceRadiusMiles", input.serviceRadiusMiles);
      if (input.currentSoftware !== undefined && input.currentSoftware.length) push("currentSoftware", JSON.stringify(input.currentSoftware));
      if (input.hearAboutUs !== undefined) push("hearAboutUs", input.hearAboutUs);

      // proWaitlist has no licenseNumber/insuranceCarrier columns — fold these,
      // plus any free-text notes, into additionalNotes so they're captured.
      const noteParts: string[] = [];
      if (input.licenseNumber !== undefined && input.licenseNumber) noteParts.push(`License #: ${input.licenseNumber}`);
      if (input.insuranceCarrier !== undefined && input.insuranceCarrier) noteParts.push(`Insurance: ${input.insuranceCarrier}`);
      if (input.notes !== undefined && input.notes) noteParts.push(input.notes);
      if (noteParts.length) {
        const existing = (row.additionalNotes as string) || "";
        const merged = existing ? `${existing}\n${noteParts.join("\n")}` : noteParts.join("\n");
        push("additionalNotes", merged.slice(0, 2000));
      }

      if (!sets.length) return { success: true as const, id: row.id, updated: 0 };

      vals.push(row.id);
      await pool.query(`UPDATE proWaitlist SET ${sets.join(", ")} WHERE id = ?`, vals);

      notifyOwner({
        title: `Profile enriched (step 2): ${input.email}`,
        content: `Updated ${sets.length} field(s) via /apply-v2.`,
      }).catch(() => {});

      return { success: true as const, id: row.id, updated: sets.length };
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

  // Public query — returns count of homeowners who opted into beta program
  // Used by waitlist form to hide the beta checkbox once 1,000 spots are filled
  getBetaCount: publicProcedure.query(async () => {
    const pool = await getPool();
    if (!pool) return { count: 0, spotsRemaining: 1000, isOpen: true, cap: 1000 };
    // serviceNeeded has no column of its own — the intake maps it into the
    // desiredProjects JSON (see joinHomeWaitlist), so the BETA marker lands there.
    const [rows] = await pool.query("SELECT COUNT(*) as cnt FROM homeWaitlist WHERE desiredProjects LIKE '%BETA: yes%'");
    const count = Number((rows as any[])[0]?.cnt ?? 0);
    const cap = 1000;
    return {
      count,
      cap,
      spotsRemaining: Math.max(0, cap - count),
      isOpen: count < cap,
    };
  }),

  claimSlug: publicProcedure
    .input(z.object({
      email: z.string().email().toLowerCase(),
      slug: z.string().min(3).max(30),
    }))
    .mutation(async ({ input }) => {
      const pool = await getPool();
      if (!pool) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const slug = input.slug.toLowerCase();
      if (!SLUG_REGEX.test(slug)) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Slug must be 3-30 characters, lowercase alphanumeric and hyphens only, no leading/trailing hyphens." });
      }
      if (RESERVED_SLUGS.has(slug)) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "This slug is reserved. Please choose another." });
      }

      const [userRows] = await pool.query("SELECT id, customSlug FROM proWaitlist WHERE email = ? LIMIT 1", [input.email]);
      if (!(userRows as any[])[0]) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Email not found on waitlist. Sign up first." });
      }

      try { await pool.query("ALTER TABLE proWaitlist ADD COLUMN customSlug VARCHAR(64) UNIQUE", []); } catch {}

      const [existing] = await pool.query("SELECT id FROM proWaitlist WHERE customSlug = ? LIMIT 1", [slug]);
      if ((existing as any[])[0]) {
        throw new TRPCError({ code: "CONFLICT", message: "This slug is already taken. Try another." });
      }

      await pool.query("UPDATE proWaitlist SET customSlug = ? WHERE email = ?", [slug, input.email]);
      return { success: true as const, slug, shareUrl: `https://prolnk.xyz/join/${slug}` };
    }),

  resolveSlug: publicProcedure
    .input(z.object({ slug: z.string().min(1).max(30) }))
    .query(async ({ input }) => {
      const pool = await getPool();
      if (!pool) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
      const [rows] = await pool.query(
        "SELECT firstName, businessType, referralCode FROM proWaitlist WHERE customSlug = ? OR referralCode = ? LIMIT 1",
        [input.slug.toLowerCase(), input.slug.toUpperCase()]
      );
      const row = (rows as any[])[0];
      if (!row) return { found: false as const };
      return { found: true as const, firstName: row.firstName as string, businessType: row.businessType as string, referralCode: row.referralCode as string };
    }),

});
