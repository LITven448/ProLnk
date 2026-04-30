// This file contains the 360 profile schema additions — to be appended to drizzle/schema.ts

// ─── 360 Customer Profiles ────────────────────────────────────────────────────

// Partner 360 Profile — deep business intelligence beyond the basic application
export const partner360Profiles = mysqlTable("partner360Profiles", {
  id: int("id").autoincrement().primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id).unique(),

  // Business depth
  yearsInBusiness: mysqlEnum("yearsInBusiness", ["under_1", "1_to_3", "3_to_7", "7_to_15", "over_15"]),
  teamSize: mysqlEnum("teamSize", ["solo", "2_to_5", "6_to_15", "16_to_50", "over_50"]),
  annualRevenue: mysqlEnum("annualRevenue", ["under_100k", "100k_to_500k", "500k_to_1m", "1m_to_5m", "over_5m"]),
  businessStructure: mysqlEnum("businessStructure", ["sole_prop", "llc", "s_corp", "c_corp", "partnership"]),
  hasEmployees: boolean("hasEmployees").default(false).notNull(),
  hasSubcontractors: boolean("hasSubcontractors").default(false).notNull(),
  isLicensed: boolean("isLicensed").default(false).notNull(),
  isInsured: boolean("isInsured").default(false).notNull(),
  isBonded: boolean("isBonded").default(false).notNull(),

  // Tech stack
  currentCrm: varchar("currentCrm", { length: 100 }),
  currentSchedulingTool: varchar("currentSchedulingTool", { length: 100 }),
  currentInvoicingTool: varchar("currentInvoicingTool", { length: 100 }),
  usesQuickbooks: boolean("usesQuickbooks").default(false).notNull(),
  techComfortLevel: mysqlEnum("techComfortLevel", ["low", "medium", "high"]).default("medium"),

  // Growth goals
  primaryGoal: mysqlEnum("primaryGoal", [
    "more_leads", "higher_revenue", "expand_team", "new_service_areas",
    "add_services", "passive_income", "network_growth", "brand_building"
  ]),
  secondaryGoals: json("secondaryGoals").$type<string[]>().default([]),
  revenueGoal12mo: mysqlEnum("revenueGoal12mo", ["under_100k", "100k_to_250k", "250k_to_500k", "500k_to_1m", "over_1m"]),
  openToHiring: boolean("openToHiring").default(false).notNull(),
  openToFranchise: boolean("openToFranchise").default(false).notNull(),
  openToAcquisition: boolean("openToAcquisition").default(false).notNull(),

  // Personality / communication style
  communicationStyle: mysqlEnum("communicationStyle", ["text_first", "call_first", "email_first", "in_app"]).default("text_first"),
  bestTimeToContact: mysqlEnum("bestTimeToContact", ["morning", "midday", "afternoon", "evening", "anytime"]).default("anytime"),
  preferredLeadType: mysqlEnum("preferredLeadType", ["residential", "commercial", "both"]).default("residential"),
  avgJobSize: mysqlEnum("avgJobSize", ["under_500", "500_to_2k", "2k_to_10k", "over_10k"]),
  biggestChallenge: mysqlEnum("biggestChallenge", [
    "finding_leads", "closing_jobs", "collecting_payment", "managing_schedule",
    "hiring_staff", "marketing", "customer_retention", "cash_flow"
  ]),

  // Referral behavior
  referralMotivation: mysqlEnum("referralMotivation", ["money", "relationships", "reciprocity", "all_of_above"]),
  willingToReferCompetitors: boolean("willingToReferCompetitors").default(false).notNull(),
  hasExistingReferralNetwork: boolean("hasExistingReferralNetwork").default(false).notNull(),
  estimatedMonthlyJobs: int("estimatedMonthlyJobs").default(0),

  // Social proof
  googleBusinessUrl: varchar("googleBusinessUrl", { length: 500 }),
  yelpUrl: varchar("yelpUrl", { length: 500 }),
  facebookUrl: varchar("facebookUrl", { length: 500 }),
  instagramUrl: varchar("instagramUrl", { length: 500 }),
  totalOnlineReviews: int("totalOnlineReviews").default(0),
  avgOnlineRating: decimal("avgOnlineRating", { precision: 3, scale: 2 }),

  // Profile completeness score (0-100)
  completenessScore: int("completenessScore").default(0).notNull(),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type Partner360Profile = typeof partner360Profiles.$inferSelect;
export type InsertPartner360Profile = typeof partner360Profiles.$inferInsert;

// Homeowner 360 Profile — lifestyle, financial comfort, communication preferences, and goals
export const homeowner360Profiles = mysqlTable("homeowner360Profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().references(() => users.id).unique(),

  // Lifestyle
  householdSize: mysqlEnum("householdSize", ["1", "2", "3_to_4", "5_plus"]),
  hasChildren: boolean("hasChildren").default(false).notNull(),
  childrenAges: json("childrenAges").$type<string[]>().default([]),
  lifestyleType: mysqlEnum("lifestyleType", ["busy_professional", "family_focused", "retiree", "investor", "weekend_warrior"]),
  hobbies: json("hobbies").$type<string[]>().default([]),
  entertainsFrequently: boolean("entertainsFrequently").default(false).notNull(),
  workFromHome: boolean("workFromHome").default(false).notNull(),

  // Financial comfort
  budgetComfort: mysqlEnum("budgetComfort", ["budget_conscious", "value_seeker", "quality_focused", "premium_only"]).default("value_seeker"),
  typicalProjectBudget: mysqlEnum("typicalProjectBudget", ["under_500", "500_to_2k", "2k_to_10k", "10k_to_50k", "over_50k"]),
  financesBigProjects: boolean("financesBigProjects").default(false).notNull(),
  hasHomeWarranty: boolean("hasHomeWarranty").default(false).notNull(),
  hasHomeInsurance: boolean("hasHomeInsurance").default(true).notNull(),
  insuranceProvider: varchar("insuranceProvider", { length: 100 }),
  hasMortgage: boolean("hasMortgage").default(true).notNull(),

  // Decision-making
  decisionMaker: mysqlEnum("decisionMaker", ["solo", "partner", "committee"]).default("solo"),
  decisionSpeed: mysqlEnum("decisionSpeed", ["same_day", "within_week", "takes_time", "research_heavy"]).default("within_week"),
  hiringCriteria: json("hiringCriteria").$type<string[]>().default([]),
  requiresBackground: boolean("requiresBackground").default(false).notNull(),

  // Communication preferences
  communicationStyle: mysqlEnum("communicationStyle", ["text_first", "call_first", "email_first", "in_app"]).default("text_first"),
  bestTimeToContact: mysqlEnum("bestTimeToContact", ["morning", "midday", "afternoon", "evening", "anytime"]).default("anytime"),
  responseExpectation: mysqlEnum("responseExpectation", ["within_1h", "within_4h", "same_day", "next_day", "flexible"]).default("same_day"),
  prefersVideoConsult: boolean("prefersVideoConsult").default(false).notNull(),

  // Home goals
  planningToSell: boolean("planningToSell").default(false).notNull(),
  sellTimeframe: mysqlEnum("sellTimeframe", ["within_1yr", "1_to_3yr", "3_to_5yr", "not_planning"]).default("not_planning"),
  primaryHomeGoal: mysqlEnum("primaryHomeGoal", [
    "maintain_value", "increase_value", "comfort_upgrade", "energy_efficiency",
    "aesthetic_refresh", "prepare_to_sell", "rental_income", "age_in_place"
  ]),
  topProjectCategories: json("topProjectCategories").$type<string[]>().default([]),
  dreamProjects: text("dreamProjects"),

  // Referral behavior
  referralMotivation: mysqlEnum("referralMotivation", ["credits", "cash", "altruism", "all"]).default("credits"),
  hasReferredBefore: boolean("hasReferredBefore").default(false).notNull(),
  socialMediaActive: boolean("socialMediaActive").default(false).notNull(),
  wouldLeaveReview: boolean("wouldLeaveReview").default(true).notNull(),

  // NPS / satisfaction
  npsScore: int("npsScore"),
  satisfactionNotes: text("satisfactionNotes"),

  // Profile completeness score (0-100)
  completenessScore: int("completenessScore").default(0).notNull(),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type Homeowner360Profile = typeof homeowner360Profiles.$inferSelect;
export type InsertHomeowner360Profile = typeof homeowner360Profiles.$inferInsert;
