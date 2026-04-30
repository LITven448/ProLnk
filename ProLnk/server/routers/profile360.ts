import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, adminProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { partner360Profiles, homeowner360Profiles, partners, users, homeownerProfiles, properties } from "../../drizzle/schema";
import { eq, sql } from "drizzle-orm";

// ─── Completeness scoring helpers ─────────────────────────────────────────────

function computePartnerScore(data: Record<string, unknown>): number {
  const fields = [
    "yearsInBusiness", "teamSize", "annualRevenue", "businessStructure",
    "currentCrm", "techComfortLevel", "primaryGoal", "revenueGoal12mo",
    "communicationStyle", "bestTimeToContact", "preferredLeadType",
    "avgJobSize", "biggestChallenge", "referralMotivation", "estimatedMonthlyJobs",
  ];
  const boolFields = [
    "hasEmployees", "hasSubcontractors", "isLicensed", "isInsured", "isBonded",
    "openToHiring", "openToFranchise", "willingToReferCompetitors", "hasExistingReferralNetwork",
  ];
  const socialFields = ["googleBusinessUrl", "yelpUrl", "facebookUrl", "instagramUrl"];
  const base = fields.filter(f => data[f] != null && data[f] !== "").length;
  const bools = boolFields.filter(f => data[f] != null).length;
  const social = socialFields.filter(f => data[f] != null && data[f] !== "").length;
  const score = Math.round((base / fields.length) * 60 + (bools / boolFields.length) * 25 + (social / socialFields.length) * 15);
  return Math.min(100, score);
}

function computeHomeownerScore(data: Record<string, unknown>): number {
  const fields = [
    "householdSize", "lifestyleType", "budgetComfort", "typicalProjectBudget",
    "decisionMaker", "decisionSpeed", "communicationStyle", "bestTimeToContact",
    "responseExpectation", "primaryHomeGoal", "sellTimeframe", "referralMotivation",
  ];
  const boolFields = [
    "hasChildren", "entertainsFrequently", "workFromHome", "financesBigProjects",
    "hasHomeWarranty", "hasHomeInsurance", "hasMortgage", "requiresBackground",
    "planningToSell", "hasReferredBefore", "socialMediaActive", "wouldLeaveReview",
  ];
  const richFields = ["dreamProjects", "satisfactionNotes", "insuranceProvider"];
  const base = fields.filter(f => data[f] != null && data[f] !== "").length;
  const bools = boolFields.filter(f => data[f] != null).length;
  const rich = richFields.filter(f => data[f] != null && data[f] !== "").length;
  const score = Math.round((base / fields.length) * 60 + (bools / boolFields.length) * 25 + (rich / richFields.length) * 15);
  return Math.min(100, score);
}

// ─── Input schemas ─────────────────────────────────────────────────────────────

const partnerUpdateSchema = z.object({
  yearsInBusiness: z.enum(["under_1", "1_to_3", "3_to_7", "7_to_15", "over_15"]).optional(),
  teamSize: z.enum(["solo", "2_to_5", "6_to_15", "16_to_50", "over_50"]).optional(),
  annualRevenue: z.enum(["under_100k", "100k_to_500k", "500k_to_1m", "1m_to_5m", "over_5m"]).optional(),
  businessStructure: z.enum(["sole_prop", "llc", "s_corp", "c_corp", "partnership"]).optional(),
  hasEmployees: z.boolean().optional(),
  hasSubcontractors: z.boolean().optional(),
  isLicensed: z.boolean().optional(),
  isInsured: z.boolean().optional(),
  isBonded: z.boolean().optional(),
  currentCrm: z.string().max(100).optional(),
  currentSchedulingTool: z.string().max(100).optional(),
  currentInvoicingTool: z.string().max(100).optional(),
  usesQuickbooks: z.boolean().optional(),
  techComfortLevel: z.enum(["low", "medium", "high"]).optional(),
  primaryGoal: z.enum(["more_leads", "higher_revenue", "expand_team", "new_service_areas", "add_services", "passive_income", "network_growth", "brand_building"]).optional(),
  secondaryGoals: z.array(z.string()).optional(),
  revenueGoal12mo: z.enum(["under_100k", "100k_to_250k", "250k_to_500k", "500k_to_1m", "over_1m"]).optional(),
  openToHiring: z.boolean().optional(),
  openToFranchise: z.boolean().optional(),
  openToAcquisition: z.boolean().optional(),
  communicationStyle: z.enum(["text_first", "call_first", "email_first", "in_app"]).optional(),
  bestTimeToContact: z.enum(["morning", "midday", "afternoon", "evening", "anytime"]).optional(),
  preferredLeadType: z.enum(["residential", "commercial", "both"]).optional(),
  avgJobSize: z.enum(["under_500", "500_to_2k", "2k_to_10k", "over_10k"]).optional(),
  biggestChallenge: z.enum(["finding_leads", "closing_jobs", "collecting_payment", "managing_schedule", "hiring_staff", "marketing", "customer_retention", "cash_flow"]).optional(),
  referralMotivation: z.enum(["money", "relationships", "reciprocity", "all_of_above"]).optional(),
  willingToReferCompetitors: z.boolean().optional(),
  hasExistingReferralNetwork: z.boolean().optional(),
  estimatedMonthlyJobs: z.number().int().min(0).optional(),
  googleBusinessUrl: z.string().max(500).optional(),
  yelpUrl: z.string().max(500).optional(),
  facebookUrl: z.string().max(500).optional(),
  instagramUrl: z.string().max(500).optional(),
  totalOnlineReviews: z.number().int().min(0).optional(),
  avgOnlineRating: z.string().optional(),
});

const homeownerUpdateSchema = z.object({
  householdSize: z.enum(["1", "2", "3_to_4", "5_plus"]).optional(),
  hasChildren: z.boolean().optional(),
  childrenAges: z.array(z.string()).optional(),
  lifestyleType: z.enum(["busy_professional", "family_focused", "retiree", "investor", "weekend_warrior"]).optional(),
  hobbies: z.array(z.string()).optional(),
  entertainsFrequently: z.boolean().optional(),
  workFromHome: z.boolean().optional(),
  budgetComfort: z.enum(["budget_conscious", "value_seeker", "quality_focused", "premium_only"]).optional(),
  typicalProjectBudget: z.enum(["under_500", "500_to_2k", "2k_to_10k", "10k_to_50k", "over_50k"]).optional(),
  financesBigProjects: z.boolean().optional(),
  hasHomeWarranty: z.boolean().optional(),
  hasHomeInsurance: z.boolean().optional(),
  insuranceProvider: z.string().max(100).optional(),
  hasMortgage: z.boolean().optional(),
  decisionMaker: z.enum(["solo", "partner", "committee"]).optional(),
  decisionSpeed: z.enum(["same_day", "within_week", "takes_time", "research_heavy"]).optional(),
  hiringCriteria: z.array(z.string()).optional(),
  requiresBackground: z.boolean().optional(),
  communicationStyle: z.enum(["text_first", "call_first", "email_first", "in_app"]).optional(),
  bestTimeToContact: z.enum(["morning", "midday", "afternoon", "evening", "anytime"]).optional(),
  responseExpectation: z.enum(["within_1h", "within_4h", "same_day", "next_day", "flexible"]).optional(),
  prefersVideoConsult: z.boolean().optional(),
  planningToSell: z.boolean().optional(),
  sellTimeframe: z.enum(["within_1yr", "1_to_3yr", "3_to_5yr", "not_planning"]).optional(),
  primaryHomeGoal: z.enum(["maintain_value", "increase_value", "comfort_upgrade", "energy_efficiency", "aesthetic_refresh", "prepare_to_sell", "rental_income", "age_in_place"]).optional(),
  topProjectCategories: z.array(z.string()).optional(),
  dreamProjects: z.string().optional(),
  referralMotivation: z.enum(["credits", "cash", "altruism", "all"]).optional(),
  hasReferredBefore: z.boolean().optional(),
  socialMediaActive: z.boolean().optional(),
  wouldLeaveReview: z.boolean().optional(),
  npsScore: z.number().int().min(0).max(10).optional(),
  satisfactionNotes: z.string().optional(),
});

// ─── Router ───────────────────────────────────────────────────────────────────

export const profile360Router = router({
  // ── Partner procedures ──────────────────────────────────────────────────────

  getMyPartner360: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;
    const [partnerRow] = await db.select().from(partners).where(eq(partners.userId, ctx.user.id)).limit(1);
    if (!partnerRow) return null;
    const [profile] = await db.select().from(partner360Profiles).where(eq(partner360Profiles.partnerId, partnerRow.id)).limit(1);
    return { partner: partnerRow, profile: profile ?? null };
  }),

  upsertPartner360: protectedProcedure
    .input(partnerUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
      const [partnerRow] = await db.select().from(partners).where(eq(partners.userId, ctx.user.id)).limit(1);
      if (!partnerRow) throw new TRPCError({ code: "NOT_FOUND", message: "Partner profile not found" });

      const score = computePartnerScore(input as Record<string, unknown>);
      const [existing] = await db.select().from(partner360Profiles).where(eq(partner360Profiles.partnerId, partnerRow.id)).limit(1);

      const payload = {
        ...input,
        secondaryGoals: input.secondaryGoals ? JSON.stringify(input.secondaryGoals) : undefined,
        completenessScore: score,
      };

      if (existing) {
        await db.update(partner360Profiles).set(payload as any).where(eq(partner360Profiles.partnerId, partnerRow.id));
      } else {
        await db.insert(partner360Profiles).values({ partnerId: partnerRow.id, ...payload, completenessScore: score } as any);
      }
      return { success: true, completenessScore: score };
    }),

  // ── Homeowner procedures ────────────────────────────────────────────────────

  getMyHomeowner360: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;
    const [profile] = await db.select().from(homeowner360Profiles).where(eq(homeowner360Profiles.userId, ctx.user.id)).limit(1);
    const [homeProfile] = await db.select().from(homeownerProfiles).where(eq(homeownerProfiles.userId, ctx.user.id)).limit(1);
    // properties.ownerId references homeownerProfiles.id, so join via homeProfile
    const userProps = homeProfile
      ? await db.select().from(properties).where(eq(properties.ownerId, homeProfile.id)).limit(10)
      : [];
    return {
      profile360: profile ?? null,
      homeProfile: homeProfile ?? null,
      properties: userProps,
      user: ctx.user,
    };
  }),

  upsertHomeowner360: protectedProcedure
    .input(homeownerUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const score = computeHomeownerScore(input as Record<string, unknown>);
      const [existing] = await db.select().from(homeowner360Profiles).where(eq(homeowner360Profiles.userId, ctx.user.id)).limit(1);

      const payload = {
        ...input,
        childrenAges: input.childrenAges ? JSON.stringify(input.childrenAges) : undefined,
        hobbies: input.hobbies ? JSON.stringify(input.hobbies) : undefined,
        hiringCriteria: input.hiringCriteria ? JSON.stringify(input.hiringCriteria) : undefined,
        topProjectCategories: input.topProjectCategories ? JSON.stringify(input.topProjectCategories) : undefined,
        completenessScore: score,
      };

      if (existing) {
        await db.update(homeowner360Profiles).set(payload as any).where(eq(homeowner360Profiles.userId, ctx.user.id));
      } else {
        await db.insert(homeowner360Profiles).values({ userId: ctx.user.id, ...payload, completenessScore: score } as any);
      }
      return { success: true, completenessScore: score };
    }),

  // ── Admin procedures ────────────────────────────────────────────────────────

  adminGetMember360: adminProcedure
    .input(z.object({
      type: z.enum(["partner", "homeowner"]),
      id: z.number().int(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      if (input.type === "partner") {
        const [partnerRow] = await db.select().from(partners).where(eq(partners.id, input.id)).limit(1);
        if (!partnerRow) return null;
        const [profile360] = await db.select().from(partner360Profiles).where(eq(partner360Profiles.partnerId, input.id)).limit(1);
        const userRow = partnerRow.userId
          ? (await db.select().from(users).where(eq(users.id, partnerRow.userId)).limit(1))[0]
          : null;
        return { type: "partner" as const, partner: partnerRow, profile360: profile360 ?? null, user: userRow ?? null };
      } else {
        const [userRow] = await db.select().from(users).where(eq(users.id, input.id)).limit(1);
        if (!userRow) return null;
        const [profile360] = await db.select().from(homeowner360Profiles).where(eq(homeowner360Profiles.userId, input.id)).limit(1);
        const [homeProfile] = await db.select().from(homeownerProfiles).where(eq(homeownerProfiles.userId, input.id)).limit(1);
        const userProps = homeProfile
          ? await db.select().from(properties).where(eq(properties.ownerId, homeProfile.id)).limit(10)
          : [];
        return { type: "homeowner" as const, user: userRow, profile360: profile360 ?? null, homeProfile: homeProfile ?? null, properties: userProps };
      }
    }),

  adminListMembers360: adminProcedure
    .input(z.object({
      type: z.enum(["partners", "homeowners"]),
      limit: z.number().int().min(1).max(100).default(50),
      offset: z.number().int().min(0).default(0),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      if (input.type === "partners") {
        const rows = await db.select().from(partners).limit(input.limit).offset(input.offset);
        const profiles = await db.select().from(partner360Profiles);
        const profileMap = new Map(profiles.map(p => [p.partnerId, p]));
        return rows.map(p => ({ ...p, profile360: profileMap.get(p.id) ?? null }));
      } else {
        const rows = await db.select().from(homeownerProfiles).limit(input.limit).offset(input.offset);
        const profiles = await db.select().from(homeowner360Profiles);
        const profileMap = new Map(profiles.map(p => [p.userId, p]));
        return rows.map(h => ({ ...h, profile360: profileMap.get(h.userId) ?? null }));
      }
    }),
});
