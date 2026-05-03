import {
  integer,
  bigint,
  text,
  pgTable,
  varchar,
  boolean,
  jsonb,
  timestamp,
  decimal,
  numeric,
  date,
  index,
  uniqueIndex,
  serial,
  pgEnum,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Partner profiles (approved businesses in the network)
export const partners = pgTable("partners", {
  id: integer("id").primaryKey(),
  userId: integer("userId").references(() => users.id),
  // Application fields
  businessName: varchar("businessName", { length: 255 }).notNull(),
  businessType: varchar("businessType", { length: 100 }).notNull(),
  serviceArea: varchar("serviceArea", { length: 255 }).notNull(),
  serviceAreaLat: decimal("serviceAreaLat", { precision: 10, scale: 6 }),
  serviceAreaLng: decimal("serviceAreaLng", { precision: 10, scale: 6 }),
  serviceRadiusMiles: integer("serviceRadiusMiles").default(15),
  // Tier-gated zip code coverage (JSON array of zip code strings)
  // scout=5 zips, pro=15 zips, crew=30 zips, company=60 zips, enterprise=unlimited(999)
  serviceZipCodes: jsonb("serviceZipCodes").$type<string[]>().default([]),
  maxZipCodes: integer("maxZipCodes").default(5).notNull(),
  contactName: varchar("contactName", { length: 255 }).notNull(),
  contactEmail: varchar("contactEmail", { length: 320 }).notNull(),
  contactPhone: varchar("contactPhone", { length: 30 }),
  website: varchar("website", { length: 500 }),
  description: text("description"),
  // Status & tier
  status: text("status").default("pending").notNull(),
  // 5-tier subscription model: scout (free), pro, crew, company, enterprise
  tier: text("tier").default("scout").notNull(),
  // Monthly subscription fee for this partner's tier (0 for scout/exempt)
  subscriptionFee: decimal("subscriptionFee", { precision: 8, scale: 2 }).default("0.00").notNull(),
  // Commission keep rate: % of the platform fee the REFERRING partner keeps
  // scout=0.40, pro=0.55, crew=0.65, company=0.72, enterprise=0.78, exempt=1.00
  commissionRate: decimal("commissionRate", { precision: 5, scale: 4 }).default("0.4000").notNull(),
  // Commission rates (admin-configurable per partner)
  // platformFeeRate: % the platform charges the RECEIVING partner (e.g. 0.12 = 12%)
  platformFeeRate: decimal("platformFeeRate", { precision: 5, scale: 4 }).default("0.1200").notNull(),
  // referralCommissionRate: derived from platformFeeRate * commissionRate — stored for fast reads
  referralCommissionRate: decimal("referralCommissionRate", { precision: 5, scale: 4 }).default("0.0480").notNull(),
  // Monthly commission cap (null = no cap; scout = $500)
  monthlyCommissionCap: decimal("monthlyCommissionCap", { precision: 10, scale: 2 }),
  // Running total of commissions earned this calendar month (resets on 1st)
  monthlyCommissionEarned: decimal("monthlyCommissionEarned", { precision: 10, scale: 2 }).default("0.00").notNull(),
  // Exempt flag: founding/exempt partners — no fees, no commission split, treated as enterprise
  isExempt: boolean("isExempt").default(false).notNull(),
  // Legacy founding partner flag (kept for backwards compat)
  isFoundingPartner: boolean("isFoundingPartner").default(false).notNull(),
  // Lead capacity limits (tier-based; 0 = unlimited)
  // scout=5/wk, pro=15/wk, crew=30/wk, company=60/wk, enterprise=unlimited
  weeklyLeadCap: integer("weeklyLeadCap").default(5).notNull(),
  weeklyLeadsReceived: integer("weeklyLeadsReceived").default(0).notNull(),
  weeklyLeadsResetAt: timestamp("weeklyLeadsResetAt"),
  // Stats
  referralCount: integer("referralCount").default(0).notNull(),
  leadsCount: integer("leadsCount").default(0).notNull(),
  jobsLogged: integer("jobsLogged").default(0).notNull(),
  opportunitiesGenerated: integer("opportunitiesGenerated").default(0).notNull(),
  totalCommissionEarned: decimal("totalCommissionEarned", { precision: 10, scale: 2 }).default("0.00").notNull(),
  totalCommissionPaid: decimal("totalCommissionPaid", { precision: 10, scale: 2 }).default("0.00").notNull(),
  // Stripe Connect (payout infrastructure)
  stripeConnectAccountId: varchar("stripeConnectAccountId", { length: 255 }),
  stripeConnectStatus: text("stripeConnectStatus").default("not_connected").notNull(),
  bankAccountLast4: varchar("bankAccountLast4", { length: 4 }),
  payoutReadyAt: timestamp("payoutReadyAt"),
  // Trial & subscription
  trialStatus: text("trialStatus").default("trial").notNull(),
  trialStartedAt: timestamp("trialStartedAt"),
  trialEndsAt: timestamp("trialEndsAt"),
  subscriptionPlan: text("subscriptionPlan"),
  // Partner Priority Score (PPS) — 0 to 105, recalculated nightly by PPS engine
  // Signals: tier(30) + closeRate(20) + acceptanceRate(15) + photos(15) + reviews(10) + networkReferrals(5) + responseSpeed(5) + foundingBonus(+5)
  priorityScore: integer("priorityScore").default(0).notNull(),
  // Average hours to accept a lead (rolling average, updated on each acceptance)
  avgLeadResponseHours: decimal("avgLeadResponseHours", { precision: 6, scale: 2 }).default("24.00").notNull(),
  // Review stats
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0.00").notNull(),
  reviewCount: integer("reviewCount").default(0).notNull(),
  // Number of partners this partner has recruited to the network
  partnersReferred: integer("partnersReferred").default(0).notNull(),
  // FK to the partner who recruited this partner (null = organic/direct)
  referredByPartnerId: integer("referredByPartnerId"),
  // Notification preferences (JSON object with boolean flags per event type)
  notificationPrefs: jsonb("notificationPrefs").$type<{
    newLead: boolean;
    leadExpired: boolean;
    commissionPaid: boolean;
    tierUpgrade: boolean;
    newReview: boolean;
    broadcastMessages: boolean;
    weeklyDigest: boolean;
    emailEnabled: boolean;
    smsEnabled: boolean;
  }>(),
  // Compliance & Strike System (Brain Trust: 3 strikes = suspension, warning at 2)
  strikeCount: integer("strikeCount").default(0).notNull(),
  lastStrikeAt: timestamp("lastStrikeAt"),
  lastStrikeReason: varchar("lastStrikeReason", { length: 500 }),
  suspendedAt: timestamp("suspendedAt"),
  suspensionReason: varchar("suspensionReason", { length: 500 }),
  // COI & License verification
  coiUrl: varchar("coiUrl", { length: 1000 }),
  coiExpiresAt: timestamp("coiExpiresAt"),
  coiVerifiedAt: timestamp("coiVerifiedAt"),
  licenseNumber: varchar("licenseNumber", { length: 100 }),
  licenseUrl: varchar("licenseUrl", { length: 1000 }),
  licenseExpiresAt: timestamp("licenseExpiresAt"),
  licenseVerifiedAt: timestamp("licenseVerifiedAt"),
  backgroundCheckVerifiedAt: timestamp("backgroundCheckVerifiedAt"),
  // Google Review
  googleReviewUrl: varchar("googleReviewUrl", { length: 1000 }),
  // CCPA / data export
  dataExportRequestedAt: timestamp("dataExportRequestedAt"),
  dataDeleteRequestedAt: timestamp("dataDeleteRequestedAt"),
  // Last activity timestamp for win-back detection
  lastActiveAt: timestamp("lastActiveAt"),
  // Streak & Achievement System (CS-06, CS-07)
  referralStreakMonths: integer("referralStreakMonths").default(0).notNull(),
  streakUpdatedAt: timestamp("streakUpdatedAt"),
  achievementBadges: jsonb("achievementBadges").$type<string[]>().default([]),
  achievementsUpdatedAt: timestamp("achievementsUpdatedAt"),
  // Timestamps
  appliedAt: timestamp("appliedAt").defaultNow().notNull(),
  approvedAt: timestamp("approvedAt"),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Partner = typeof partners.$inferSelect;
export type InsertPartner = typeof partners.$inferInsert;

// Jobs logged by technicians in the field
export const jobs = pgTable("jobs", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  loggedByUserId: integer("loggedByUserId").references(() => users.id),
  // Job details
  customerName: varchar("customerName", { length: 255 }),
  customerEmail: varchar("customerEmail", { length: 320 }),
  customerPhone: varchar("customerPhone", { length: 30 }),
  serviceAddress: varchar("serviceAddress", { length: 500 }).notNull(),
  serviceAddressLat: decimal("serviceAddressLat", { precision: 10, scale: 6 }),
  serviceAddressLng: decimal("serviceAddressLng", { precision: 10, scale: 6 }),
  serviceType: varchar("serviceType", { length: 100 }),
  notes: text("notes"),
  // Photo URLs (stored in S3)
  photoUrls: jsonb("photoUrls").$type<string[]>().default([]),
  // AI analysis status
  aiAnalysisStatus: text("aiAnalysisStatus").default("pending").notNull(),
  aiAnalysisResult: jsonb("aiAnalysisResult").$type<AiAnalysisResult | null>().default(null),
  // Job status
  status: text("status").default("logged").notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Job = typeof jobs.$inferSelect;
export type InsertJob = typeof jobs.$inferInsert;

// AI-detected upsell opportunities from job photos
export const opportunities = pgTable("opportunities", {
  id: integer("id").primaryKey(),
  jobId: integer("jobId").notNull().references(() => jobs.id),
  // Who generated this opportunity (the partner whose tech took the photo)
  sourcePartnerId: integer("sourcePartnerId").notNull().references(() => partners.id),
  // Who received this opportunity (the partner matched to handle it)
  receivingPartnerId: integer("receivingPartnerId").references(() => partners.id),
  // Opportunity details from AI
  opportunityType: varchar("opportunityType", { length: 100 }).notNull(),
  opportunityCategory: varchar("opportunityCategory", { length: 100 }).notNull(),
  description: text("description").notNull(),
  aiConfidence: decimal("aiConfidence", { precision: 4, scale: 3 }),
  photoUrl: varchar("photoUrl", { length: 1000 }),
  // Admin review workflow — all AI-detected opportunities go through admin before being dispatched
  adminReviewStatus: text("adminReviewStatus").default("pending_review").notNull(),
  adminReviewedAt: timestamp("adminReviewedAt"),
  adminReviewedBy: integer("adminReviewedBy"),
  // Status
  status: text("status").default("pending").notNull(),
  // 24-hour lead expiry — set when lead is dispatched to a partner
  leadExpiresAt: timestamp("leadExpiresAt"),
  // Routing queue — JSON array of partner IDs to try in order if first partner declines/times out
  routingQueue: text("routingQueue"),
  routingPosition: integer("routingPosition").default(0).notNull(),
  // Job value and commission (filled when job closes)
  estimatedJobValue: decimal("estimatedJobValue", { precision: 10, scale: 2 }),
  actualJobValue: decimal("actualJobValue", { precision: 10, scale: 2 }),
  platformFeeAmount: decimal("platformFeeAmount", { precision: 10, scale: 2 }),
  referralCommissionAmount: decimal("referralCommissionAmount", { precision: 10, scale: 2 }),
  proLinkNetAmount: decimal("proLinkNetAmount", { precision: 10, scale: 2 }),
  jobClosedAt: timestamp("jobClosedAt"),
  // Timestamps
  sentAt: timestamp("sentAt"),
  acceptedAt: timestamp("acceptedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Opportunity = typeof opportunities.$inferSelect;
export type InsertOpportunity = typeof opportunities.$inferInsert;

// Commission records (financial ledger)
export const commissions = pgTable("commissions", {
  id: integer("id").primaryKey(),
  opportunityId: integer("opportunityId").references(() => opportunities.id),
  // Who owes / who receives
  payingPartnerId: integer("payingPartnerId").references(() => partners.id),
  receivingPartnerId: integer("receivingPartnerId").references(() => partners.id), // null = ProLnk keeps it
  commissionType: text("commissionType").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  jobValue: decimal("jobValue", { precision: 10, scale: 2 }),
  feeRate: decimal("feeRate", { precision: 5, scale: 4 }),
  description: varchar("description", { length: 500 }),
  paid: boolean("paid").default(false).notNull(),
  paidAt: timestamp("paidAt"),
  // Dispute tracking (Wave 17)
  disputeStatus: text("disputeStatus").default("none").notNull(),
  disputeReason: varchar("disputeReason", { length: 1000 }),
  disputeOpenedAt: timestamp("disputeOpenedAt"),
  disputeResolvedAt: timestamp("disputeResolvedAt"),
  disputeResolvedBy: integer("disputeResolvedBy"),
  disputeResolutionNote: varchar("disputeResolutionNote", { length: 1000 }),
  // Dispute enhancements (DIS-02, DIS-03, DIS-06)
  disputeEvidenceUrls: text("disputeEvidenceUrls"), // JSON array of S3 URLs
  disputeAiAssessment: varchar("disputeAiAssessment", { length: 200 }), // "likely_valid" | "likely_invalid" | "unclear"
  disputeAiConfidence: decimal("disputeAiConfidence", { precision: 4, scale: 2 }), // 0.00-1.00
  disputeAiReasoning: varchar("disputeAiReasoning", { length: 500 }),
  disputeAppealedAt: timestamp("disputeAppealedAt"),
  disputeAppealReason: varchar("disputeAppealReason", { length: 1000 }),
  disputeAppealStatus: text("disputeAppealStatus").default("none").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Commission = typeof commissions.$inferSelect;
export type InsertCommission = typeof commissions.$inferInsert;

// Industry-level commission rate defaults (Wave 3)
export const industryRates = pgTable("industryRates", {
  id: integer("id").primaryKey(),
  industryName: varchar("industryName", { length: 100 }).notNull().unique(),
  // platformFeeRate: % ProLnk takes (e.g. 0.1200 = 12%)
  platformFeeRate: decimal("platformFeeRate", { precision: 5, scale: 4 }).default("0.1200").notNull(),
  // referralCommissionRate: % paid to referring partner (e.g. 0.0500 = 5%)
  referralCommissionRate: decimal("referralCommissionRate", { precision: 5, scale: 4 }).default("0.0500").notNull(),
  notes: text("notes"),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type IndustryRate = typeof industryRates.$inferSelect;
export type InsertIndustryRate = typeof industryRates.$inferInsert;

// Admin broadcast messages to all partners
export const broadcasts = pgTable("broadcasts", {
  id: integer("id").primaryKey(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  sentBy: integer("sentBy").references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Broadcast = typeof broadcasts.$inferSelect;
export type InsertBroadcast = typeof broadcasts.$inferInsert;

// Shared TypeScript types for AI analysis
export type AiOpportunity = {
  type: string;
  category: string;
  confidence: number;
  description: string;
  estimatedValue?: number;
};

export type AiAnalysisResult = {
  opportunities: AiOpportunity[];
  photoQuality: "good" | "poor" | "unusable";
  analysisNotes?: string;
};

// ─── Tier Configuration ──────────────────────────────────────────────────────
// Single source of truth for all 5 subscription tiers.
// commissionKeepRate = fraction of platformFeeAmount the REFERRING partner keeps.
// Example: $1,000 job, 12% platform fee = $120 platform fee.
//   Scout keeps 40% → earns $48, platform nets $72.
//   Enterprise keeps 78% → earns $93.60, platform nets $26.40.
export const TIER_CONFIG = {
  scout:      { monthlyFee: 0,   commissionKeepRate: 0.40, commissionCap: 500,  seats: 1,   label: "Scout" },
  pro:        { monthlyFee: 29,  commissionKeepRate: 0.55, commissionCap: null, seats: 3,   label: "Pro" },
  crew:       { monthlyFee: 79,  commissionKeepRate: 0.65, commissionCap: null, seats: 5,   label: "Crew" },
  company:    { monthlyFee: 149, commissionKeepRate: 0.72, commissionCap: null, seats: 15,  label: "Company" },
  enterprise: { monthlyFee: 299, commissionKeepRate: 0.78, commissionCap: null, seats: 999, label: "Enterprise" },
} as const;

export type TierKey = keyof typeof TIER_CONFIG;

// Commission tier calculation
export function calculateCommissionRates(
  jobValue: number,
  platformFeeRate: number,
  commissionKeepRate: number,  // partner's tier keep rate (0.40–1.00)
  isExempt: boolean = false,
  monthlyCommissionEarned: number = 0,
  monthlyCommissionCap: number | null = null,
) {
  // Exempt partners pay zero and keep everything
  if (isExempt) {
    return {
      effectiveFeeRate: 0,
      effectiveKeepRate: 1.0,
      platformFeeAmount: 0,
      referralCommissionAmount: 0,
      proLinkNetAmount: 0,
      capApplied: false,
    };
  }

  // Tiered platform fee cap by job size
  let effectiveFeeRate = platformFeeRate;
  if (jobValue >= 50000) {
    effectiveFeeRate = Math.min(platformFeeRate, 0.06);
  } else if (jobValue >= 10000) {
    effectiveFeeRate = Math.min(platformFeeRate, 0.08);
  } else if (jobValue >= 2500) {
    effectiveFeeRate = Math.min(platformFeeRate, 0.10);
  }

  const platformFeeAmount = jobValue * effectiveFeeRate;
  let referralCommissionAmount = platformFeeAmount * commissionKeepRate;

  // Enforce monthly cap (Scout tier: $500/mo)
  let capApplied = false;
  if (monthlyCommissionCap !== null) {
    const remaining = monthlyCommissionCap - monthlyCommissionEarned;
    if (remaining <= 0) {
      referralCommissionAmount = 0;
      capApplied = true;
    } else if (referralCommissionAmount > remaining) {
      referralCommissionAmount = remaining;
      capApplied = true;
    }
  }

  const proLinkNetAmount = platformFeeAmount - referralCommissionAmount;

  return {
    effectiveFeeRate,
    effectiveKeepRate: commissionKeepRate,
    platformFeeAmount: Math.round(platformFeeAmount * 100) / 100,
    referralCommissionAmount: Math.round(referralCommissionAmount * 100) / 100,
    proLinkNetAmount: Math.round(proLinkNetAmount * 100) / 100,
    capApplied,
  };
}

// ─── Integration Architecture Tables ─────────────────────────────────────────

// Stores each partner's connected external integrations (CompanyCam, Jobber, etc.)
export const partnerIntegrations = pgTable("partnerIntegrations", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  // Integration source identifier
  source: varchar("source", { length: 50 }).notNull(), // "companycam" | "jobber" | "housecall_pro" | "google_drive" | "servicetitan" | "field_app"
  // OAuth access token or API key (encrypted at rest in production)
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  tokenExpiresAt: timestamp("tokenExpiresAt"),
  // External account identifiers
  externalAccountId: varchar("externalAccountId", { length: 255 }),
  externalAccountName: varchar("externalAccountName", { length: 255 }),
  // Webhook registration ID (for platforms that support webhooks)
  webhookId: varchar("webhookId", { length: 255 }),
  // Integration status
  status: varchar("status", { length: 20 }).default("active").notNull(), // "active" | "disconnected" | "error"
  lastSyncAt: timestamp("lastSyncAt"),
  errorMessage: text("errorMessage"),
  // Metadata (JSON blob for source-specific config)
  metadata: text("metadata"), // JSON string
  connectedAt: timestamp("connectedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type PartnerIntegration = typeof partnerIntegrations.$inferSelect;
export type InsertPartnerIntegration = typeof partnerIntegrations.$inferInsert;

// Normalized photo intake queue — all photos from all sources land here before AI processing
export const photoIntakeQueue = pgTable("photoIntakeQueue", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  integrationId: integer("integrationId").references(() => partnerIntegrations.id),
  // Source of the photo
  source: varchar("source", { length: 50 }).notNull(), // "companycam" | "jobber" | "housecall_pro" | "google_drive" | "field_app" | "manual"
  // Photo storage
  photoUrl: text("photoUrl").notNull(),
  thumbnailUrl: text("thumbnailUrl"),
  // Deduplication hash (perceptual hash of photo to avoid processing same image twice)
  photoHash: varchar("photoHash", { length: 64 }),
  // Job context from the source system
  externalJobId: varchar("externalJobId", { length: 255 }),
  externalJobName: varchar("externalJobName", { length: 500 }),
  serviceAddress: text("serviceAddress"),
  serviceCity: varchar("serviceCity", { length: 100 }),
  serviceZip: varchar("serviceZip", { length: 20 }),
  // GPS coordinates
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  // Processing state
  status: varchar("status", { length: 20 }).default("pending").notNull(), // "pending" | "processing" | "completed" | "failed" | "skipped"
  // Link to the job record created after AI processing
  jobId: integer("jobId").references(() => jobs.id),
  // AI analysis result (JSON)
  aiResult: text("aiResult"), // JSON: AiAnalysisResult
  processedAt: timestamp("processedAt"),
  errorMessage: text("errorMessage"),
  // Timestamp of when the photo was taken/uploaded in the source system
  capturedAt: timestamp("capturedAt"),
  receivedAt: timestamp("receivedAt").defaultNow().notNull(),
});
export type PhotoIntakeItem = typeof photoIntakeQueue.$inferSelect;
export type InsertPhotoIntakeItem = typeof photoIntakeQueue.$inferInsert;

// ─── 7 Data Value Asset Tables ────────────────────────────────────────────────
// These tables capture the proprietary data assets that drive acquisition value.

// Asset 1: Homeowner Property Profiles
// Structured record of every property ProLnk has touched — service history, AI detections, offer outcomes.
// This is the most valuable standalone data asset (comparable to Porch Group's property data).
export const propertyProfiles = pgTable("propertyProfiles", {
  id: integer("id").primaryKey(),
  // Property identity
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 50 }),
  zip: varchar("zip", { length: 20 }),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  // Homeowner contact (optional — populated when they engage with an offer)
  homeownerName: varchar("homeownerName", { length: 255 }),
  homeownerPhone: varchar("homeownerPhone", { length: 30 }),
  homeownerEmail: varchar("homeownerEmail", { length: 255 }),
  // Service history summary (denormalized for fast reads)
  totalJobsLogged: integer("totalJobsLogged").default(0).notNull(),
  totalOpportunitiesDetected: integer("totalOpportunitiesDetected").default(0).notNull(),
  totalOffersAccepted: integer("totalOffersAccepted").default(0).notNull(),
  totalOffersDeclined: integer("totalOffersDeclined").default(0).notNull(),
  totalRevenueGenerated: decimal("totalRevenueGenerated", { precision: 12, scale: 2 }).default("0.00"),
  // Trades that have serviced this property
  tradesServiced: jsonb("tradesServiced").$type<string[]>().default([]),
  // AI detection history (JSON array of detection types seen at this property)
  detectionHistory: jsonb("detectionHistory").$type<{type: string; detectedAt: string; converted: boolean}[]>().default([]),
  // Price sensitivity signal (avg discount % at which this homeowner accepts)
  avgAcceptedDiscountPct: decimal("avgAcceptedDiscountPct", { precision: 5, scale: 2 }),
  lastServicedAt: timestamp("lastServicedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type PropertyProfile = typeof propertyProfiles.$inferSelect;
export type InsertPropertyProfile = typeof propertyProfiles.$inferInsert;

// Asset 2: Partner Performance Scores
// Proprietary quality-scoring dataset for every partner — close rate, response time, job value, churn risk.
// This referral-performance dataset does not exist anywhere else at scale.
export const partnerPerformanceScores = pgTable("partnerPerformanceScores", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id).unique(),
  // Lead performance
  totalLeadsReceived: integer("totalLeadsReceived").default(0).notNull(),
  totalLeadsAccepted: integer("totalLeadsAccepted").default(0).notNull(),
  totalLeadsDeclined: integer("totalLeadsDeclined").default(0).notNull(),
  totalLeadsClosed: integer("totalLeadsClosed").default(0).notNull(),
  leadAcceptanceRate: decimal("leadAcceptanceRate", { precision: 5, scale: 4 }).default("0"),
  leadCloseRate: decimal("leadCloseRate", { precision: 5, scale: 4 }).default("0"),
  // Response time (hours from lead received to accepted/declined)
  avgResponseTimeHours: decimal("avgResponseTimeHours", { precision: 8, scale: 2 }),
  // Job value
  avgJobValue: decimal("avgJobValue", { precision: 10, scale: 2 }),
  totalJobValueClosed: decimal("totalJobValueClosed", { precision: 12, scale: 2 }).default("0"),
  // Commission history
  totalCommissionsEarned: decimal("totalCommissionsEarned", { precision: 12, scale: 2 }).default("0"),
  totalCommissionsPaid: decimal("totalCommissionsPaid", { precision: 12, scale: 2 }).default("0"),
  // Referral output (how many leads this partner generates for others)
  totalReferralsSent: integer("totalReferralsSent").default(0).notNull(),
  totalReferralsConverted: integer("totalReferralsConverted").default(0).notNull(),
  referralConversionRate: decimal("referralConversionRate", { precision: 5, scale: 4 }).default("0"),
  // Health score (0-100, computed from all above metrics)
  healthScore: integer("healthScore").default(50),
  churnRisk: text("churnRisk").default("low"),
  // Last activity
  lastJobLoggedAt: timestamp("lastJobLoggedAt"),
  lastLeadAcceptedAt: timestamp("lastLeadAcceptedAt"),
  calculatedAt: timestamp("calculatedAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type PartnerPerformanceScore = typeof partnerPerformanceScores.$inferSelect;
export type InsertPartnerPerformanceScore = typeof partnerPerformanceScores.$inferInsert;

// Asset 3: AI Training Dataset
// Every photo pair analyzed becomes a labeled training example.
// After 100K labeled images this is a trade-secret moat worth $5M–$20M.
export const aiTrainingDataset = pgTable("aiTrainingDataset", {
  id: integer("id").primaryKey(),
  jobId: integer("jobId").references(() => jobs.id),
  opportunityId: integer("opportunityId").references(() => opportunities.id),
  // Photo references
  beforePhotoUrl: text("beforePhotoUrl"),
  afterPhotoUrl: text("afterPhotoUrl"),
  // Detection label
  detectionType: varchar("detectionType", { length: 100 }).notNull(), // e.g. "fence_staining", "drainage_issue"
  detectionCategory: varchar("detectionCategory", { length: 100 }).notNull(),
  aiConfidenceScore: decimal("aiConfidenceScore", { precision: 4, scale: 3 }),
  // Ground truth validation (was the detection accurate?)
  // Validated = homeowner accepted the offer (strong positive signal)
  // Rejected = homeowner declined (weak negative signal — could be price, not detection)
  validationOutcome: text("validationOutcome").default("pending"),
  // Property context
  propertyType: varchar("propertyType", { length: 50 }), // "single_family", "townhome", "condo"
  propertyZip: varchar("propertyZip", { length: 20 }),
  propertyState: varchar("propertyState", { length: 50 }),
  // Temporal context (seasonality matters for detection accuracy)
  capturedMonth: integer("capturedMonth"), // 1-12
  capturedSeason: text("capturedSeason"),
  // Model version that produced this detection
  modelVersion: varchar("modelVersion", { length: 50 }).default("v1"),
  // Whether this record is approved for retraining
  approvedForTraining: boolean("approvedForTraining").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type AiTrainingRecord = typeof aiTrainingDataset.$inferSelect;
export type InsertAiTrainingRecord = typeof aiTrainingDataset.$inferInsert;

// Asset 4: Conversion Funnel Events
// Every step of the offer funnel tracked with timestamps.
// 12+ months of funnel data is required for a 15-25x ARR acquisition multiple.
export const funnelEvents = pgTable("funnelEvents", {
  id: integer("id").primaryKey(),
  opportunityId: integer("opportunityId").notNull().references(() => opportunities.id),
  propertyProfileId: integer("propertyProfileId").references(() => propertyProfiles.id),
  partnerId: integer("partnerId").references(() => partners.id),
  // Funnel stage
  eventType: text("eventType").notNull(),
  // Delivery channel
  channel: text("channel"),
  // Offer details at time of event
  offerAmount: decimal("offerAmount", { precision: 10, scale: 2 }),
  discountPct: decimal("discountPct", { precision: 5, scale: 2 }),
  // Time from previous event (seconds) — measures funnel velocity
  secondsFromPreviousEvent: integer("secondsFromPreviousEvent"),
  // Device/context
  deviceType: varchar("deviceType", { length: 50 }), // "mobile", "desktop", "tablet"
  // Metadata (JSON for event-specific data)
  metadata: text("metadata"), // JSON
  occurredAt: timestamp("occurredAt").defaultNow().notNull(),
});
export type FunnelEvent = typeof funnelEvents.$inferSelect;
export type InsertFunnelEvent = typeof funnelEvents.$inferInsert;

// Asset 5: Referral Graph
// Partner-to-partner referral relationship records.
// This graph shows which partners refer to which, which trades are most complementary,
// and where the next expansion market should be. No competitor has this dataset.
export const referralGraph = pgTable("referralGraph", {
  id: integer("id").primaryKey(),
  // The relationship
  sourcePartnerId: integer("sourcePartnerId").notNull().references(() => partners.id),
  receivingPartnerId: integer("receivingPartnerId").notNull().references(() => partners.id),
  // Trade categories of each partner
  sourceTrade: varchar("sourceTrade", { length: 100 }),
  receivingTrade: varchar("receivingTrade", { length: 100 }),
  // Geographic context
  city: varchar("city", { length: 100 }),
  zip: varchar("zip", { length: 20 }),
  // Relationship performance
  totalReferrals: integer("totalReferrals").default(0).notNull(),
  totalConverted: integer("totalConverted").default(0).notNull(),
  totalJobValue: decimal("totalJobValue", { precision: 12, scale: 2 }).default("0"),
  totalCommissionPaid: decimal("totalCommissionPaid", { precision: 12, scale: 2 }).default("0"),
  conversionRate: decimal("conversionRate", { precision: 5, scale: 4 }).default("0"),
  avgDaysToClose: decimal("avgDaysToClose", { precision: 6, scale: 2 }),
  // Relationship strength (0-100)
  relationshipStrength: integer("relationshipStrength").default(0),
  firstReferralAt: timestamp("firstReferralAt"),
  lastReferralAt: timestamp("lastReferralAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type ReferralGraphEdge = typeof referralGraph.$inferSelect;
export type InsertReferralGraphEdge = typeof referralGraph.$inferInsert;

// Asset 6: Geographic Density Snapshots
// Weekly snapshots of partner coverage density by zip code and trade.
// Proves network effect to acquirers — shows density compounding over time.
export const geographicDensity = pgTable("geographicDensity", {
  id: integer("id").primaryKey(),
  zip: varchar("zip", { length: 20 }).notNull(),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 50 }),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  // Snapshot date (weekly)
  snapshotDate: timestamp("snapshotDate").notNull(),
  // Coverage metrics
  totalActivePartners: integer("totalActivePartners").default(0),
  totalTradesCovered: integer("totalTradesCovered").default(0),
  tradeBreakdown: jsonb("tradeBreakdown").$type<Record<string, number>>().default({}),
  // Demand metrics
  totalJobsLogged: integer("totalJobsLogged").default(0),
  totalOpportunitiesDetected: integer("totalOpportunitiesDetected").default(0),
  totalOffersAccepted: integer("totalOffersAccepted").default(0),
  // Coverage gap score (0-100, higher = more unmet demand)
  coverageGapScore: integer("coverageGapScore").default(0),
  // Unmet demand by trade (trades with detected opportunities but no receiving partner)
  unmetDemandTrades: jsonb("unmetDemandTrades").$type<string[]>().default([]),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type GeographicDensitySnapshot = typeof geographicDensity.$inferSelect;
export type InsertGeographicDensitySnapshot = typeof geographicDensity.$inferInsert;

// Asset 7: Homeowner Acceptance Signals
// Price sensitivity and acceptance pattern data per offer.
// After 10K records this is a proprietary pricing intelligence dataset.
export const acceptanceSignals = pgTable("acceptanceSignals", {
  id: integer("id").primaryKey(),
  opportunityId: integer("opportunityId").notNull().references(() => opportunities.id),
  propertyProfileId: integer("propertyProfileId").references(() => propertyProfiles.id),
  // Offer details
  tradeCategory: varchar("tradeCategory", { length: 100 }).notNull(),
  offerAmount: decimal("offerAmount", { precision: 10, scale: 2 }),
  standardMarketPrice: decimal("standardMarketPrice", { precision: 10, scale: 2 }),
  discountPct: decimal("discountPct", { precision: 5, scale: 2 }),
  // Outcome
  outcome: text("outcome").notNull(),
  // Time signals
  timeToRespondHours: decimal("timeToRespondHours", { precision: 8, scale: 2 }),
  // Context
  deliveryChannel: text("deliveryChannel"),
  deliveryHourOfDay: integer("deliveryHourOfDay"), // 0-23
  deliveryDayOfWeek: integer("deliveryDayOfWeek"), // 0=Sunday, 6=Saturday
  deliveryMonth: integer("deliveryMonth"), // 1-12
  deliverySeason: text("deliverySeason"),
  // Property context
  propertyZip: varchar("propertyZip", { length: 20 }),
  propertyCity: varchar("propertyCity", { length: 100 }),
  propertyState: varchar("propertyState", { length: 50 }),
  // Whether this was the homeowner's first offer from ProLnk
  isFirstOffer: boolean("isFirstOffer").default(true),
  // Number of previous offers this homeowner has received
  priorOfferCount: integer("priorOfferCount").default(0),
  recordedAt: timestamp("recordedAt").defaultNow().notNull(),
});
export type AcceptanceSignal = typeof acceptanceSignals.$inferSelect;
export type InsertAcceptanceSignal = typeof acceptanceSignals.$inferInsert;

// ============================================================
// Customer Deal Page — Sprint 1
// ============================================================

// Customer Deals: tokenized deal pages sent to homeowners
// Each deal is linked to an opportunity and has a unique token
// for the homeowner-facing URL: /deal/:token
export const customerDeals = pgTable("customerDeals", {
  id: integer("id").primaryKey(),
  // Unique token for the public URL (e.g., /deal/abc123xyz)
  token: varchar("token", { length: 64 }).notNull().unique(),
  // Linked opportunity
  opportunityId: integer("opportunityId").notNull().references(() => opportunities.id),
  // Referring partner (whose technician took the photo)
  referringPartnerId: integer("referringPartnerId").notNull().references(() => partners.id),
  // Receiving partner (who will do the work)
  receivingPartnerId: integer("receivingPartnerId").references(() => partners.id),
  // Homeowner contact info (collected when they engage)
  homeownerName: varchar("homeownerName", { length: 255 }),
  homeownerEmail: varchar("homeownerEmail", { length: 320 }),
  homeownerPhone: varchar("homeownerPhone", { length: 30 }),
  homeownerAddress: text("homeownerAddress"),
  homeownerCity: varchar("homeownerCity", { length: 100 }),
  homeownerZip: varchar("homeownerZip", { length: 20 }),
  // Issue details (from AI analysis)
  issueType: varchar("issueType", { length: 100 }).notNull(),
  issueCategory: varchar("issueCategory", { length: 100 }).notNull(),
  issueDescription: text("issueDescription").notNull(),
  issueDescriptionShort: varchar("issueDescriptionShort", { length: 100 }),
  photoUrl: varchar("photoUrl", { length: 1000 }),
  photoUrls: jsonb('photoUrls').$type<string[]>().default([]),
  signatureData: text('signatureData'),
  signedAt: integer('signedAt'),
  signerName: varchar('signerName', { length: 255 }),
  aiConfidence: integer("aiConfidence"), // 0-100
  estimatedValueLow: decimal("estimatedValueLow", { precision: 10, scale: 2 }),
  estimatedValueHigh: decimal("estimatedValueHigh", { precision: 10, scale: 2 }),
  // Personalized homeowner message snippet from AI
  homeownerMessageSnippet: text("homeownerMessageSnippet"),
  // Deal status lifecycle
  status: text("status").default("draft").notNull(),
  // Scheduling
  scheduledAt: timestamp("scheduledAt"),         // When estimate is booked for
  scheduleConfirmedAt: timestamp("scheduleConfirmedAt"), // When homeowner confirmed
  calBookingId: varchar("calBookingId", { length: 255 }), // Cal.com booking reference
  // Expiry (48 hours from sent)
  expiresAt: timestamp("expiresAt"),
  // Engagement tracking
  viewCount: integer("viewCount").default(0).notNull(),
  firstViewedAt: timestamp("firstViewedAt"),
  lastViewedAt: timestamp("lastViewedAt"),
  // Communication tracking
  emailSentAt: timestamp("emailSentAt"),
  smsSentAt: timestamp("smsSentAt"),
  emailOpenedAt: timestamp("emailOpenedAt"),
  // Job outcome
  actualJobValue: decimal("actualJobValue", { precision: 10, scale: 2 }),
  jobClosedAt: timestamp("jobClosedAt"),
  // Homeowner job confirmation (Patent Core: commission triggers on homeowner confirmation)
  homeownerConfirmedAt: timestamp("homeownerConfirmedAt"),   // When homeowner confirmed job done
  homeownerConfirmRating: integer("homeownerConfirmRating"),     // 1-5 star rating at confirmation
  homeownerConfirmNote: text("homeownerConfirmNote"),        // optional note from homeowner
  // Visual Fix Generator (Wave 11 — Patent Core Claim)
  // Surgical AI inpainting: replaces ONLY the broken element, nothing else changes
  aiFixImageUrl: text("aiFixImageUrl"),          // S3/CDN URL of the AI-generated fixed photo
  aiFixGeneratedAt: timestamp("aiFixGeneratedAt"), // When the fix was generated
  aiFixPrompt: text("aiFixPrompt"),               // The exact prompt used (for audit/replay)
  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type CustomerDeal = typeof customerDeals.$inferSelect;
export type InsertCustomerDeal = typeof customerDeals.$inferInsert;

// Partner Reviews: ratings left by homeowners after a job
// Feeds into Trust Score and triggers Google/Yelp review request
export const partnerReviews = pgTable("partnerReviews", {
  id: integer("id").primaryKey(),
  dealId: integer("dealId").notNull().references(() => customerDeals.id),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  // Homeowner info (from deal)
  homeownerName: varchar("homeownerName", { length: 255 }),
  homeownerEmail: varchar("homeownerEmail", { length: 320 }),
  // Rating (1–5 stars)
  rating: integer("rating").notNull(), // 1-5
  // Review text
  reviewText: text("reviewText"),
  // Sub-ratings
  ratingPunctuality: integer("ratingPunctuality"),   // 1-5
  ratingQuality: integer("ratingQuality"),           // 1-5
  ratingCommunication: integer("ratingCommunication"), // 1-5
  ratingValue: integer("ratingValue"),               // 1-5
  // External review status
  googleReviewRequested: boolean("googleReviewRequested").default(false).notNull(),
  googleReviewRequestedAt: timestamp("googleReviewRequestedAt"),
  yelpReviewRequested: boolean("yelpReviewRequested").default(false).notNull(),
  // Whether this review is publicly visible on the partner's profile
  isPublic: boolean("isPublic").default(true).notNull(),
  // Admin moderation
  flagged: boolean("flagged").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type PartnerReview = typeof partnerReviews.$inferSelect;
export type InsertPartnerReview = typeof partnerReviews.$inferInsert;

// Homeowner Reviews: ratings left by partners after a job (bidirectional)
// Partners rate homeowners for reliability, communication, and payment
export const homeownerReviews = pgTable("homeownerReviews", {
  id: integer("id").primaryKey(),
  dealId: integer("dealId").notNull().references(() => customerDeals.id),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  // Homeowner being reviewed
  homeownerEmail: varchar("homeownerEmail", { length: 320 }),
  homeownerName: varchar("homeownerName", { length: 255 }),
  // Rating (1–5 stars)
  rating: integer("rating").notNull(), // 1-5
  reviewText: text("reviewText"),
  // Sub-ratings
  ratingReliability: integer("ratingReliability"),    // 1-5 (showed up, accessible)
  ratingCommunication: integer("ratingCommunication"), // 1-5
  ratingPayment: integer("ratingPayment"),             // 1-5 (paid on time)
  // Whether this review is publicly visible
  isPublic: boolean("isPublic").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type HomeownerReview = typeof homeownerReviews.$inferSelect;
export type InsertHomeownerReview = typeof homeownerReviews.$inferInsert;

// Homeowner Profiles (TrustyPro — one per user account)
export const homeownerProfiles = pgTable("homeownerProfiles", {
  id: integer("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id).unique(),
  displayName: varchar("displayName", { length: 255 }),
  phone: varchar("phone", { length: 30 }),
  bio: text("bio"),
  photoUrl: text("photoUrl"),
  setupComplete: boolean("setupComplete").default(false).notNull(),
  // Preferences
  contactPreference: text("contactPreference").default("email"),
  openToRecommendations: boolean("openToRecommendations").default(true).notNull(),
  // Consent flags
  consentTerms: boolean("consentTerms").default(false).notNull(),
  consentPhotos: boolean("consentPhotos").default(false).notNull(),
  consentPartnerContact: boolean("consentPartnerContact").default(false).notNull(),
  consentAiData: boolean("consentAiData").default(false).notNull(),
  creditBalance: decimal("creditBalance", { precision: 10, scale: 2 }).default("0.00").notNull(),
  referralCount: integer("referralCount").default(0).notNull(),
  referralCode: varchar("referralCode", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type HomeownerProfile = typeof homeownerProfiles.$inferSelect;
export type InsertHomeownerProfile = typeof homeownerProfiles.$inferInsert;

// Properties — multiple properties per homeowner account
export const properties = pgTable("properties", {
  id: integer("id").primaryKey(),
  ownerId: integer("ownerId").notNull().references(() => homeownerProfiles.id),
  // Identity
  nickname: varchar("nickname", { length: 100 }), // e.g. "Main Home", "Lake House"
  address: varchar("address", { length: 500 }).notNull(),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 50 }),
  zip: varchar("zip", { length: 20 }),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  // Property details
  propertyType: text("propertyType").default("single_family"),
  yearBuilt: integer("yearBuilt"),
  sqft: integer("sqft"),
  bedrooms: integer("bedrooms"),
  bathrooms: decimal("bathrooms", { precision: 3, scale: 1 }),
  lotSize: text("lotSize"),
  hasPool: boolean("hasPool").default(false).notNull(),
  hasGarage: boolean("hasGarage").default(false).notNull(),
  garageType: text("garageType").default("none"),
  hasFence: boolean("hasFence").default(false).notNull(),
  fenceType: text("fenceType").default("none"),
  // Additional exterior features
  hasSpa: boolean("hasSpa").default(false).notNull(),
  hasOutdoorKitchen: boolean("hasOutdoorKitchen").default(false).notNull(),
  hasDeck: boolean("hasDeck").default(false).notNull(),
  hasPatio: boolean("hasPatio").default(false).notNull(),
  hasBasement: boolean("hasBasement").default(false).notNull(),
  hasAttic: boolean("hasAttic").default(false).notNull(),
  hasSolarPanels: boolean("hasSolarPanels").default(false).notNull(),
  hasGenerator: boolean("hasGenerator").default(false).notNull(),
  hasSmartHome: boolean("hasSmartHome").default(false).notNull(),
  hasIrrigationSystem: boolean("hasIrrigationSystem").default(false).notNull(),
  hasSecuritySystem: boolean("hasSecuritySystem").default(false).notNull(),
  hasEvCharger: boolean("hasEvCharger").default(false).notNull(),
  hasWaterSoftener: boolean("hasWaterSoftener").default(false).notNull(),
  hasOutdoorLighting: boolean("hasOutdoorLighting").default(false).notNull(),
  drivewaySurface: text("drivewaySurface").default("none"),
  garageSpaces: integer("garageSpaces").default(0),
  storiesCount: text("storiesCount"),
  // Interior features
  flooringTypes: jsonb("flooringTypes").$type<string[]>().default([]),
  kitchenCountertop: text("kitchenCountertop").default("unknown"),
  primaryBathType: text("primaryBathType").default("unknown"),
  fireplaceType: text("fireplaceType").default("none"),
  fireplaceCount: integer("fireplaceCount").default(0),
  ceilingHeight: text("ceilingHeight").default("standard_8ft"),
  windowType: text("windowType").default("unknown"),
  applianceBrands: jsonb("applianceBrands").$type<Record<string, string>>().default({}),
  // Outdoor / landscaping
  lawnSize: text("lawnSize"),
  hasGardenBeds: boolean("hasGardenBeds").default(false).notNull(),
  treeCount: text("treeCount").default("none"),
  // Pet ownership — critical for service matching (pet-safe products, pet waste, pet doors)
  hasPets: boolean("hasPets").default(false).notNull(),
  dogCount: integer("dogCount").default(0),
  dogBreedSize: text("dogBreedSize").default("none"),
  catCount: integer("catCount").default(0),
  otherPets: varchar("otherPets", { length: 255 }),
  petServiceNeeds: jsonb("petServiceNeeds").$type<string[]>().default([]),
  // Ownership context
  isPrimary: boolean("isPrimary").default(true).notNull(),
  isRental: boolean("isRental").default(false).notNull(),
  occupancy: text("occupancy").default("owner_occupied"),
  ownershipYears: text("ownershipYears"),
  // Home systems selected in wizard (e.g. ["hvac", "plumbing", "electrical"])
  homeSystems: jsonb("homeSystems").$type<string[]>().default([]),
  // Age of each system (e.g. { hvac: "6_to_10", plumbing: "over_20" })
  systemAges: jsonb("systemAges").$type<Record<string, string>>().default({}),
  // What matters to this owner when hiring
  hiringPriorities: jsonb("hiringPriorities").$type<string[]>().default([]),
  // Style preferences — used for AI mockup generation and pro matching
  stylePreferences: jsonb("stylePreferences").$type<{
    homeStyle?: string;
    exteriorColor?: string;
    interiorPalette?: string;
    designAesthetic?: string;
    styleNotes?: string;
  }>().default({}),
  // Inspiration photos uploaded by homeowner (S3 URLs)
  inspirationPhotoUrls: jsonb("inspirationPhotoUrls").$type<string[]>().default([]),
  // AI-generated mockup of the property after improvements
  aiMockupUrl: varchar("aiMockupUrl", { length: 1024 }),
  aiMockupStatus: text("aiMockupStatus").default("pending"),
  aiMockupGeneratedAt: timestamp("aiMockupGeneratedAt"),
  aiMockupSourcePhotoUrl: varchar("aiMockupSourcePhotoUrl", { length: 1024 }),
  // Setup progress
  setupStep: integer("setupStep").default(1).notNull(), // 1-7
  setupComplete: boolean("setupComplete").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type Property = typeof properties.$inferSelect;
export type InsertProperty = typeof properties.$inferInsert;

// Property Improvements — what has been done in the last 5 years
export const propertyImprovements = pgTable("propertyImprovements", {
  id: integer("id").primaryKey(),
  propertyId: integer("propertyId").notNull().references(() => properties.id),
  category: varchar("category", { length: 100 }).notNull(), // e.g. "roof", "hvac", "kitchen_cabinets"
  completedYear: integer("completedYear"),
  hasWarranty: boolean("hasWarranty").default(false).notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type PropertyImprovement = typeof propertyImprovements.$inferSelect;
export type InsertPropertyImprovement = typeof propertyImprovements.$inferInsert;

// Property Wishes — projects the homeowner wants to do
export const propertyWishes = pgTable("propertyWishes", {
  id: integer("id").primaryKey(),
  propertyId: integer("propertyId").notNull().references(() => properties.id),
  category: varchar("category", { length: 100 }).notNull(),
  budgetRange: text("budgetRange"),
  urgency: text("urgency"),
  preferredTimeline: varchar("preferredTimeline", { length: 100 }),
  notes: text("notes"),
  // Lead routing — has this wish been turned into a lead?
  leadCreated: boolean("leadCreated").default(false).notNull(),
  leadCreatedAt: timestamp("leadCreatedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type PropertyWish = typeof propertyWishes.$inferSelect;
export type InsertPropertyWish = typeof propertyWishes.$inferInsert;

// Property Photos — homeowner-uploaded photos per property
export const propertyPhotos = pgTable("propertyPhotos", {
  id: integer("id").primaryKey(),
  propertyId: integer("propertyId").notNull().references(() => properties.id),
  uploadedByUserId: integer("uploadedByUserId").references(() => users.id),
  // Storage
  s3Key: varchar("s3Key", { length: 500 }).notNull(),
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnailUrl"),
  // Photo context
  roomLabel: varchar("roomLabel", { length: 100 }), // e.g. "exterior_front", "kitchen", "primary_bathroom"
  caption: text("caption"),
  // AI processing
  aiScanned: boolean("aiScanned").default(false).notNull(),
  aiSignals: jsonb("aiSignals").$type<AiOpportunity[]>().default([]),
  aiScannedAt: timestamp("aiScannedAt"),
  // Pet signal — incidental pet appearances trigger pet service referral
  hasPetSignal: boolean("hasPetSignal").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type PropertyPhoto = typeof propertyPhotos.$inferSelect;
export type InsertPropertyPhoto = typeof propertyPhotos.$inferInsert;

// ─── Activity Log ─────────────────────────────────────────────────────────────
export const activityLog = pgTable("activityLog", {
  id: integer("id").primaryKey(),
  eventType: varchar("eventType", { length: 64 }).notNull(),
  actorId: integer("actorId"),
  actorName: varchar("actorName", { length: 128 }),
  actorRole: text("actorRole").notNull().default("system"),
  entityType: varchar("entityType", { length: 64 }),
  entityId: integer("entityId"),
  entityName: varchar("entityName", { length: 255 }),
  description: text("description").notNull(),
  metadata: jsonb("metadata"),
  ipAddress: varchar("ipAddress", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow(),
});
export type ActivityLog = typeof activityLog.$inferSelect;
export type InsertActivityLog = typeof activityLog.$inferInsert;

// ─── FSM Webhook Events ──────────────────────────────────────────────────────
// Inbound webhook events from partner FSM platforms (Housecall Pro, Jobber, etc.)
// When a job is paid in the partner's FSM and the lead source tag matches ProLnk-[PARTNERID],
// the platform auto-closes the commission record.
export const fsmWebhookEvents = pgTable("fsmWebhookEvents", {
  id: integer("id").primaryKey(),
  // Source platform
  source: text("source").notNull(),
  // Raw event type from the FSM (e.g. "job.completed", "invoice.paid")
  eventType: varchar("eventType", { length: 100 }).notNull(),
  // External job ID from the FSM
  externalJobId: varchar("externalJobId", { length: 255 }),
  // Lead source tag extracted from the FSM payload (e.g. "ProLnk-42")
  leadSourceTag: varchar("leadSourceTag", { length: 100 }),
  // Matched ProLnk partner ID (null if no match found)
  matchedPartnerId: integer("matchedPartnerId").references(() => partners.id),
  // Matched opportunity ID (null if no match found)
  matchedOpportunityId: integer("matchedOpportunityId").references(() => opportunities.id),
  // Job value from FSM payload
  jobValue: decimal("jobValue", { precision: 10, scale: 2 }),
  // Processing status
  status: text("status").default("received").notNull(),
  errorMessage: text("errorMessage"),
  // Raw payload (for debugging)
  rawPayload: jsonb("rawPayload"),
  processedAt: timestamp("processedAt"),
  receivedAt: timestamp("receivedAt").defaultNow().notNull(),
});
export type FsmWebhookEvent = typeof fsmWebhookEvents.$inferSelect;
export type InsertFsmWebhookEvent = typeof fsmWebhookEvents.$inferInsert;

// ─── Outbound Webhook Subscriptions (n8n integration) ────────────────────────
// Platform events fire outbound webhooks to n8n or any configured URL.
export const webhookSubscriptions = pgTable("webhookSubscriptions", {
  id: integer("id").primaryKey(),
  // Human-readable name
  name: varchar("name", { length: 255 }).notNull(),
  // Target URL (n8n webhook URL)
  url: text("url").notNull(),
  // HMAC signing secret for payload verification
  secret: varchar("secret", { length: 255 }),
  // Which events this subscription listens to (JSON array of event names)
  events: jsonb("events").$type<string[]>().default([]),
  isActive: boolean("isActive").default(true).notNull(),
  // Delivery stats
  totalFired: integer("totalFired").default(0).notNull(),
  totalSucceeded: integer("totalSucceeded").default(0).notNull(),
  totalFailed: integer("totalFailed").default(0).notNull(),
  lastFiredAt: timestamp("lastFiredAt"),
  lastStatus: integer("lastStatus"), // HTTP status code of last delivery
  createdBy: integer("createdBy").references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type WebhookSubscription = typeof webhookSubscriptions.$inferSelect;
export type InsertWebhookSubscription = typeof webhookSubscriptions.$inferInsert;

// ─── Outbound Webhook Delivery Log ───────────────────────────────────────────
export const webhookDeliveryLog = pgTable("webhookDeliveryLog", {
  id: integer("id").primaryKey(),
  subscriptionId: integer("subscriptionId").notNull().references(() => webhookSubscriptions.id),
  eventName: varchar("eventName", { length: 100 }).notNull(),
  payload: jsonb("payload"),
  statusCode: integer("statusCode"),
  responseBody: text("responseBody"),
  success: boolean("success").default(false).notNull(),
  durationMs: integer("durationMs"),
  firedAt: timestamp("firedAt").defaultNow().notNull(),
});
export type WebhookDeliveryLog = typeof webhookDeliveryLog.$inferSelect;
export type InsertWebhookDeliveryLog = typeof webhookDeliveryLog.$inferInsert;

// ─── Pro Services Agreements ─────────────────────────────────────────────────
// Auto-generated agreements for each partner — pre-filled PDF, e-signed in platform.
export const proAgreements = pgTable("proAgreements", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  // Agreement version / template
  templateVersion: varchar("templateVersion", { length: 20 }).default("v1.0").notNull(),
  // Pre-filled terms
  tierAtSigning: text("tierAtSigning").notNull(),
  commissionRateAtSigning: decimal("commissionRateAtSigning", { precision: 5, scale: 4 }).notNull(),
  effectiveDate: timestamp("effectiveDate").notNull(),
  // E-signature
  status: text("status").default("pending").notNull(),
  signedAt: timestamp("signedAt"),
  signerName: varchar("signerName", { length: 255 }),
  signatureData: text("signatureData"), // base64 canvas signature
  ipAddress: varchar("ipAddress", { length: 64 }),
  // PDF storage
  pdfS3Key: varchar("pdfS3Key", { length: 500 }),
  pdfUrl: text("pdfUrl"),
  // Sent to partner via
  sentAt: timestamp("sentAt"),
  sentVia: text("sentVia"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type ProAgreement = typeof proAgreements.$inferSelect;
export type InsertProAgreement = typeof proAgreements.$inferInsert;

// ── Partner In-App Notifications ─────────────────────────────────────────────
export const partnerNotifications = pgTable("partnerNotifications", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  type: text("type").notNull().default("system"),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  actionUrl: varchar("actionUrl", { length: 512 }),
  isRead: boolean("isRead").notNull().default(false),
  metadata: jsonb("metadata"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type PartnerNotification = typeof partnerNotifications.$inferSelect;
export type InsertPartnerNotification = typeof partnerNotifications.$inferInsert;

// ── Review Requests (Wave 24) ─────────────────────────────────────────────────
export const reviewRequests = pgTable("reviewRequests", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  jobId: integer("jobId").references(() => jobs.id),
  token: varchar("token", { length: 64 }).notNull().unique(),
  homeownerName: varchar("homeownerName", { length: 255 }),
  homeownerEmail: varchar("homeownerEmail", { length: 255 }),
  homeownerPhone: varchar("homeownerPhone", { length: 50 }),
  serviceAddress: varchar("serviceAddress", { length: 512 }),
  status: text("status").notNull().default("pending"),
  submittedAt: timestamp("submittedAt"),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type ReviewRequest = typeof reviewRequests.$inferSelect;
export type InsertReviewRequest = typeof reviewRequests.$inferInsert;

// ═══════════════════════════════════════════════════════════════════════════════
// V6 EVENT-DRIVEN LEAD GENERATION ENGINE (Patent Claims 28-32)
// ═══════════════════════════════════════════════════════════════════════════════

// ── Event Triggers — External trigger events ingested by the engine ───────────
export const eventTriggers = pgTable("eventTriggers", {
  id: integer("id").primaryKey(),
  type: text("type").notNull(),
  sourceData: jsonb("sourceData"),
  title: varchar("title", { length: 512 }).notNull(),
  description: text("description"),
  region: varchar("region", { length: 255 }),
  zipCodes: jsonb("zipCodes").$type<string[]>(),
  latitude: decimal("latitude", { precision: 10, scale: 6 }),
  longitude: decimal("longitude", { precision: 10, scale: 6 }),
  radiusMiles: integer("radiusMiles"),
  severity: integer("severity").default(3).notNull(),
  status: text("status").default("active").notNull(),
  propertiesMatched: integer("propertiesMatched").default(0).notNull(),
  leadsGenerated: integer("leadsGenerated").default(0).notNull(),
  estimatedRevenue: decimal("estimatedRevenue", { precision: 10, scale: 2 }).default("0.00").notNull(),
  eventDate: timestamp("eventDate"),
  firedAt: timestamp("firedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type EventTrigger = typeof eventTriggers.$inferSelect;
export type InsertEventTrigger = typeof eventTriggers.$inferInsert;

// ── Property Assets — Assets identified by AI in property photos (Claim 30) ──
export const propertyAssets = pgTable("propertyAssets", {
  id: integer("id").primaryKey(),
  propertyId: integer("propertyId").references(() => properties.id),
  photoId: integer("photoId").references(() => propertyPhotos.id),
  jobId: integer("jobId").references(() => jobs.id),
  assetType: text("assetType").notNull(),
  condition: text("condition").default("good").notNull(),
  confidenceScore: decimal("confidenceScore", { precision: 5, scale: 4 }),
  estimatedAge: integer("estimatedAge"),
  estimatedLifespan: integer("estimatedLifespan"),
  estimatedEndOfLife: timestamp("estimatedEndOfLife"),
  manufacturer: varchar("manufacturer", { length: 255 }),
  modelNumber: varchar("modelNumber", { length: 255 }),
  replacementLeadTriggered: boolean("replacementLeadTriggered").default(false).notNull(),
  lastAssessedAt: timestamp("lastAssessedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type PropertyAsset = typeof propertyAssets.$inferSelect;
export type InsertPropertyAsset = typeof propertyAssets.$inferInsert;

// ── Event-Driven Leads — Leads generated by the Event-Driven Engine ──────────
export const eventDrivenLeads = pgTable("eventDrivenLeads", {
  id: integer("id").primaryKey(),
  triggerId: integer("triggerId").references(() => eventTriggers.id),
  propertyId: integer("propertyId").references(() => properties.id),
  partnerId: integer("partnerId").references(() => partners.id),
  leadType: text("leadType").notNull(),
  context: jsonb("context"),
  status: text("status").default("generated").notNull(),
  estimatedJobValue: decimal("estimatedJobValue", { precision: 10, scale: 2 }),
  actualJobValue: decimal("actualJobValue", { precision: 10, scale: 2 }),
  commissionEarned: decimal("commissionEarned", { precision: 10, scale: 2 }),
  priority: integer("priority").default(3).notNull(),
  dispatchedAt: timestamp("dispatchedAt"),
  acceptedAt: timestamp("acceptedAt"),
  completedAt: timestamp("completedAt"),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type EventDrivenLead = typeof eventDrivenLeads.$inferSelect;
export type InsertEventDrivenLead = typeof eventDrivenLeads.$inferInsert;

// ── Recall Alerts — Active manufacturer recalls being monitored (Claim 32) ───
export const recallAlerts = pgTable("recallAlerts", {
  id: integer("id").primaryKey(),
  recallNumber: varchar("recallNumber", { length: 100 }).notNull(),
  productName: varchar("productName", { length: 512 }).notNull(),
  manufacturer: varchar("manufacturer", { length: 255 }).notNull(),
  description: text("description"),
  hazardDescription: text("hazardDescription"),
  assetTypes: jsonb("assetTypes").$type<string[]>(),
  manufacturerPatterns: jsonb("manufacturerPatterns").$type<string[]>(),
  affectedProperties: integer("affectedProperties").default(0).notNull(),
  leadsGenerated: integer("leadsGenerated").default(0).notNull(),
  status: text("status").default("active").notNull(),
  publishedDate: timestamp("publishedDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type RecallAlert = typeof recallAlerts.$inferSelect;
export type InsertRecallAlert = typeof recallAlerts.$inferInsert;

// ── AI Pipeline Runs — Tracks each photo through the 5-stage waterfall (Claim 19) ─
export const aiPipelineRuns = pgTable("aiPipelineRuns", {
  id: integer("id").primaryKey(),
  photoId: integer("photoId").references(() => propertyPhotos.id),
  jobId: integer("jobId").references(() => jobs.id),
  partnerId: integer("partnerId").references(() => partners.id),
  stage: text("stage").default("preprocessing").notNull(),
  preprocessResult: jsonb("preprocessResult"),
  relevanceResult: jsonb("relevanceResult"),
  featureResult: jsonb("featureResult"),
  classificationResult: jsonb("classificationResult"),
  confidenceResult: jsonb("confidenceResult"),
  conditionsDetected: integer("conditionsDetected").default(0).notNull(),
  leadsGenerated: integer("leadsGenerated").default(0).notNull(),
  highestConfidence: decimal("highestConfidence", { precision: 5, scale: 4 }),
  totalProcessingMs: integer("totalProcessingMs"),
  status: text("status").default("running").notNull(),
  errorMessage: text("errorMessage"),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});
export type AiPipelineRun = typeof aiPipelineRuns.$inferSelect;
export type InsertAiPipelineRun = typeof aiPipelineRuns.$inferInsert;

// ─── NPS Survey ───────────────────────────────────────────────────────────────
export const npsSurveys = pgTable("npsSurveys", {
  id: integer("id").primaryKey(),
  token: varchar("token", { length: 64 }).notNull().unique(),
  jobId: integer("jobId").notNull(),
  partnerId: integer("partnerId").notNull(),
  homeownerEmail: varchar("homeownerEmail", { length: 255 }),
  homeownerName: varchar("homeownerName", { length: 255 }),
  score: integer("score"),
  category: varchar("category", { length: 32 }),
  comment: text("comment"),
  followUpOk: boolean("followUpOk").default(false),
  completedAt: timestamp("completedAt"),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type NpsSurvey = typeof npsSurveys.$inferSelect;
export type InsertNpsSurvey = typeof npsSurveys.$inferInsert;

// ─── Compliance Events (full audit trail) ─────────────────────────────────────
export const complianceEvents = pgTable("complianceEvents", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  eventType: text("eventType").notNull(),
  reason: varchar("reason", { length: 500 }).notNull(),
  adminUserId: integer("adminUserId").references(() => users.id),
  adminName: varchar("adminName", { length: 255 }),
  resolutionNote: text("resolutionNote"),
  resolvedAt: timestamp("resolvedAt"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type ComplianceEvent = typeof complianceEvents.$inferSelect;
export type InsertComplianceEvent = typeof complianceEvents.$inferInsert;

// ── Homeowner In-App Notifications ────────────────────────────────────────────
export const homeownerNotifications = pgTable("homeownerNotifications", {
  id: integer("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id),
  type: text("type").notNull().default("system"),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  actionUrl: varchar("actionUrl", { length: 512 }),
  isRead: boolean("isRead").notNull().default(false),
  metadata: jsonb("metadata"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type HomeownerNotification = typeof homeownerNotifications.$inferSelect;
export type InsertHomeownerNotification = typeof homeownerNotifications.$inferInsert;

// ── CCPA Data Export Requests ─────────────────────────────────────────────────
export const dataExportRequests = pgTable("dataExportRequests", {
  id: integer("id").primaryKey(),
  homeownerId: integer("homeownerId").notNull().references(() => users.id),
  status: text("status").notNull().default("pending"),
  requestedAt: integer("requestedAt").notNull(),
  processedAt: integer("processedAt"),
  exportUrl: varchar("exportUrl", { length: 1024 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type DataExportRequest = typeof dataExportRequests.$inferSelect;
export type InsertDataExportRequest = typeof dataExportRequests.$inferInsert;

// ── System Settings / Feature Flags ──────────────────────────────────────────
export const systemSettings = pgTable("systemSettings", {
  id: integer("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value").notNull(),
  description: varchar("description", { length: 500 }),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type SystemSetting = typeof systemSettings.$inferSelect;
export type InsertSystemSetting = typeof systemSettings.$inferInsert;

// ── ProLnk Pro Waitlist ───────────────────────────────────────────────────────
export const proWaitlist = pgTable("proWaitlist", {
  id: integer("id").primaryKey(),
  // Contact
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  phone: varchar("phone", { length: 30 }).notNull(),
  // Business
  businessName: varchar("businessName", { length: 255 }).notNull(),
  businessType: varchar("businessType", { length: 100 }).notNull(), // LLC, Sole Prop, Corp, etc.
  yearsInBusiness: integer("yearsInBusiness").notNull(),
  employeeCount: varchar("employeeCount", { length: 50 }).notNull(), // "1", "2-5", "6-15", "16-50", "50+"
  estimatedJobsPerMonth: integer("estimatedJobsPerMonth").notNull(),
  avgJobValue: varchar("avgJobValue", { length: 50 }).notNull(), // "$500-$1k", "$1k-$5k", etc.
  // Trades (JSON array of strings)
  trades: jsonb("trades").notNull(), // ["HVAC", "Plumbing", "Roofing", ...]
  // Service area
  primaryCity: varchar("primaryCity", { length: 100 }).notNull(),
  primaryState: varchar("primaryState", { length: 50 }).notNull(),
  serviceZipCodes: text("serviceZipCodes").notNull(), // comma-separated
  serviceRadiusMiles: integer("serviceRadiusMiles").default(25).notNull(),
  // Current software stack
  currentSoftware: jsonb("currentSoftware").notNull(), // ["Jobber", "Housecall Pro", "ServiceTitan", "None", ...]
  otherSoftware: varchar("otherSoftware", { length: 255 }),
  // Referral behavior
  referralsGivenPerMonth: varchar("referralsGivenPerMonth", { length: 50 }).notNull(), // "0", "1-3", "4-10", "10+"
  referralsReceivedPerMonth: varchar("referralsReceivedPerMonth", { length: 50 }).notNull(),
  currentReferralMethod: varchar("currentReferralMethod", { length: 255 }), // "text/call", "no system", etc.
  // Goals & motivation
  primaryGoal: varchar("primaryGoal", { length: 100 }).notNull(), // "more leads", "passive income", "both"
  hearAboutUs: varchar("hearAboutUs", { length: 255 }),
  additionalNotes: text("additionalNotes"),
  // Trade & license details
  customTradeDescription: varchar("customTradeDescription", { length: 500 }),
  licenseFileUrl: varchar("licenseFileUrl", { length: 1000 }),
  licenseFileName: varchar("licenseFileName", { length: 255 }),
  smsOptIn: boolean("smsOptIn").default(false),
  // Admin
  status: text("status").default("pending").notNull(),
  approvedAt: timestamp("approvedAt"),
  approvedBy: integer("approvedBy").references(() => users.id),
  invitedAt: timestamp("invitedAt"),
  adminNotes: text("adminNotes"),
  source: varchar("source", { length: 100 }).default("prolnk-waitlist"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type ProWaitlist = typeof proWaitlist.$inferSelect;
export type InsertProWaitlist = typeof proWaitlist.$inferInsert;

// ── TrustyPro Homeowner Waitlist ──────────────────────────────────────────────
export const homeWaitlist = pgTable("homeWaitlist", {
  id: integer("id").primaryKey(),
  // Contact
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  phone: varchar("phone", { length: 30 }),
  // Property
  address: varchar("address", { length: 500 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 50 }).notNull(),
  zipCode: varchar("zipCode", { length: 10 }).notNull(),
  homeType: text("homeType").notNull(),
  yearBuilt: integer("yearBuilt"),
  squareFootage: integer("squareFootage"),
  lotSizeSqFt: integer("lotSizeSqFt"),
  bedrooms: integer("bedrooms"),
  bathrooms: varchar("bathrooms", { length: 10 }), // "1", "1.5", "2", "2.5", "3", "3.5", "4+"
  stories: integer("stories"),
  garageSpaces: integer("garageSpaces"),
  hasPool: boolean("hasPool").default(false),
  hasBasement: boolean("hasBasement").default(false),
  hasAttic: boolean("hasAttic").default(false),
  // Ownership & condition
  ownershipStatus: text("ownershipStatus").default("own"),
  ownershipType: text("ownershipType").default("primary_residence"),
  isRental: boolean("isRental").default(false),
  companyName: varchar("companyName", { length: 255 }),
  companyEin: varchar("companyEin", { length: 20 }),
  propertyManagerName: varchar("propertyManagerName", { length: 255 }),
  propertyManagerPhone: varchar("propertyManagerPhone", { length: 30 }),
  yearsOwned: integer("yearsOwned"),
  overallCondition: text("overallCondition"),
  // Recent work (JSON array)
  recentImprovements: jsonb("recentImprovements"), // ["New roof 2022", "HVAC replaced 2021", ...]
  // Desired projects (JSON array of categories)
  desiredProjects: jsonb("desiredProjects").notNull(), // ["Roofing", "HVAC", "Kitchen Remodel", ...]
  projectTimeline: text("projectTimeline").default("just_exploring"),
  estimatedBudget: varchar("estimatedBudget", { length: 50 }), // "$5k-$15k", "$15k-$50k", "$50k+", etc.
  // Home systems (JSON)
  homeSystems: jsonb("homeSystems"), // { roof: "asphalt shingle", hvac: "central air", water_heater: "gas tank", ... }
  // Style preferences
  homeStyle: varchar("homeStyle", { length: 100 }), // "Modern", "Traditional", "Farmhouse", etc.
  exteriorColor: varchar("exteriorColor", { length: 100 }),
  // Referral & motivation
  primaryPainPoint: varchar("primaryPainPoint", { length: 255 }), // "finding trusted pros", "tracking maintenance", etc.
  hearAboutUs: varchar("hearAboutUs", { length: 255 }),
  additionalNotes: text("additionalNotes"),
  // Communication consent
  consentEmail: boolean("consentEmail").default(false).notNull(),
  consentSms: boolean("consentSms").default(false).notNull(),
  consentPush: boolean("consentPush").default(false).notNull(),
  consentMarketing: boolean("consentMarketing").default(false).notNull(),
  consentTerms: boolean("consentTerms").default(false).notNull(),
  consentDataUse: boolean("consentDataUse").default(false).notNull(),
  preferredContact: varchar("preferredContact", { length: 20 }),
  // Admin
  status: text("status").default("pending").notNull(),
  approvedAt: timestamp("approvedAt"),
  approvedBy: integer("approvedBy").references(() => users.id),
  invitedAt: timestamp("invitedAt"),
  adminNotes: text("adminNotes"),
  source: varchar("source", { length: 100 }).default("trustypro-waitlist"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type HomeWaitlist = typeof homeWaitlist.$inferSelect;
export type InsertHomeWaitlist = typeof homeWaitlist.$inferInsert;

// ═══════════════════════════════════════════════════════════════════════════════
// HOME HEALTH VAULT — TrustyPro Home Passport System
// ═══════════════════════════════════════════════════════════════════════════════

// System health records — one row per home system per property
// Tracks install date, condition, life expectancy, and AI-estimated remaining life
export const homeSystemHealth = pgTable("homeSystemHealth", {
  id: integer("id").primaryKey(),
  propertyId: integer("propertyId").notNull().references(() => properties.id),
  // System type
  systemType: text("systemType").notNull(),
  systemLabel: varchar("systemLabel", { length: 255 }), // e.g. "Main HVAC Unit", "Master Bath Water Heater"
  // Installation / age
  installYear: integer("installYear"),
  installMonth: integer("installMonth"), // 1-12
  manufacturer: varchar("manufacturer", { length: 255 }),
  modelNumber: varchar("modelNumber", { length: 255 }),
  serialNumber: varchar("serialNumber", { length: 255 }),
  warrantyExpiresYear: integer("warrantyExpiresYear"),
  // Life expectancy
  expectedLifespanYears: integer("expectedLifespanYears"), // e.g. 20 for roof, 15 for HVAC
  estimatedEndOfLifeYear: integer("estimatedEndOfLifeYear"), // computed: installYear + expectedLifespanYears
  // Current condition (AI-assessed or manually set)
  condition: text("condition").default("unknown").notNull(),
  conditionNotes: text("conditionNotes"),
  // Health score 0-100 (100 = brand new, 0 = end of life)
  healthScore: integer("healthScore").default(100).notNull(),
  // AI-derived from photo analysis
  aiAssessedAt: timestamp("aiAssessedAt"),
  aiConditionNotes: text("aiConditionNotes"),
  // Maintenance interval (months between recommended service)
  maintenanceIntervalMonths: integer("maintenanceIntervalMonths"),
  lastServicedAt: timestamp("lastServicedAt"),
  nextServiceDueAt: timestamp("nextServiceDueAt"),
  // Replacement cost estimate
  estimatedReplacementCostLow: decimal("estimatedReplacementCostLow", { precision: 10, scale: 2 }),
  estimatedReplacementCostHigh: decimal("estimatedReplacementCostHigh", { precision: 10, scale: 2 }),
  // Photo documentation
  photoUrls: jsonb("photoUrls").$type<string[]>().default([]),
  // Manual notes from homeowner
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type HomeSystemHealth = typeof homeSystemHealth.$inferSelect;
export type InsertHomeSystemHealth = typeof homeSystemHealth.$inferInsert;

// Maintenance log — every service event against a home system
export const homeMaintenanceLogs = pgTable("homeMaintenanceLogs", {
  id: integer("id").primaryKey(),
  propertyId: integer("propertyId").notNull().references(() => properties.id),
  systemHealthId: integer("systemHealthId").references(() => homeSystemHealth.id),
  systemType: varchar("systemType", { length: 100 }).notNull(),
  // Service details
  serviceType: text("serviceType").notNull(),
  serviceDescription: text("serviceDescription").notNull(),
  servicedBy: varchar("servicedBy", { length: 255 }), // company/person name
  servicedByPartnerId: integer("servicedByPartnerId").references(() => partners.id), // if done by a ProLnk partner
  cost: decimal("cost", { precision: 10, scale: 2 }),
  // Warranty on this service
  serviceWarrantyMonths: integer("serviceWarrantyMonths"),
  serviceWarrantyExpiresAt: timestamp("serviceWarrantyExpiresAt"),
  // Documentation
  receiptUrl: text("receiptUrl"),
  photoUrls: jsonb("photoUrls").$type<string[]>().default([]),
  invoiceNumber: varchar("invoiceNumber", { length: 100 }),
  // When the service happened
  servicedAt: timestamp("servicedAt").notNull(),
  // Notes
  notes: text("notes"),
  // Condition after service
  conditionAfter: text("conditionAfter"),
  // Did this service reset the next service due date?
  resetMaintenanceClock: boolean("resetMaintenanceClock").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type HomeMaintenanceLog = typeof homeMaintenanceLogs.$inferSelect;
export type InsertHomeMaintenanceLog = typeof homeMaintenanceLogs.$inferInsert;

// Home Passport Transfers — tracks when a home is sold and the passport is transferred
export const homePassportTransfers = pgTable("homePassportTransfers", {
  id: integer("id").primaryKey(),
  propertyId: integer("propertyId").notNull().references(() => properties.id),
  // Previous owner
  previousOwnerId: integer("previousOwnerId").references(() => homeownerProfiles.id),
  previousOwnerName: varchar("previousOwnerName", { length: 255 }),
  previousOwnerEmail: varchar("previousOwnerEmail", { length: 320 }),
  // New owner (filled when they claim)
  newOwnerEmail: varchar("newOwnerEmail", { length: 320 }),
  newOwnerName: varchar("newOwnerName", { length: 255 }),
  newOwnerId: integer("newOwnerId").references(() => homeownerProfiles.id),
  // Transfer token (unique link sent to new owner)
  transferToken: varchar("transferToken", { length: 64 }).notNull().unique(),
  // Passport snapshot at time of transfer (JSON)
  passportSnapshot: jsonb("passportSnapshot"),
  // Status
  status: text("status").default("pending").notNull(),
  // Sale details
  saleDate: timestamp("saleDate"),
  salePrice: decimal("salePrice", { precision: 12, scale: 2 }),
  // Generated PDF stored in S3
  pdfUrl: text("pdfUrl"),
  // Expiry (30 days to claim)
  expiresAt: timestamp("expiresAt").notNull(),
  claimedAt: timestamp("claimedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type HomePassportTransfer = typeof homePassportTransfers.$inferSelect;
export type InsertHomePassportTransfer = typeof homePassportTransfers.$inferInsert;

// ── Storm Tracking Agent ────────────────────────────────────────────────────────
export const stormEvents = pgTable("stormEvents", {
  id: integer("id").primaryKey(),
  noaaEventId: varchar("eventId", { length: 255 }).notNull().unique(),
  eventType: varchar("eventType", { length: 100 }).notNull(),
  headline: text("headline"),
  description: text("description"),
  severity: varchar("severity", { length: 50 }),
  urgency: varchar("urgency", { length: 50 }),
  affectedAreas: jsonb("affectedAreas").$type<string[]>().default([]),
  status: text("status").default("active").notNull(),
  onsetAt: timestamp("onsetAt"),
  expiresAt: timestamp("expiresAt"),
  // Stats
  propertiesAffected: integer("propertiesAffected").default(0).notNull(),
  leadsGenerated: integer("leadsGenerated").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type StormEvent = typeof stormEvents.$inferSelect;
export type InsertStormEvent = typeof stormEvents.$inferInsert;

export const stormLeads = pgTable("stormLeads", {
  id: integer("id").primaryKey(),
  stormEventId: integer("stormEventId").notNull().references(() => stormEvents.id),
  propertyId: integer("propertyId").references(() => properties.id),
  tradeCategory: varchar("tradeCategory", { length: 100 }).notNull(),
  address: varchar("address", { length: 500 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 10 }),
  zip: varchar("zip", { length: 20 }),
  status: text("status").default("pending").notNull(),
  priority: text("priority").default("normal").notNull(),
  dispatchedToPartnerId: integer("dispatchedToPartnerId").references(() => partners.id),
  dispatchedAt: timestamp("dispatchedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type StormLead = typeof stormLeads.$inferSelect;
export type InsertStormLead = typeof stormLeads.$inferInsert;

// ── Homeowner Check-ins (post-job completion confirmation) ──────────────────
export const homeownerCheckins = pgTable("homeownerCheckins", {
  id: integer("id").primaryKey(),
  opportunityId: integer("opportunityId").notNull(),
  confirmedCompletion: boolean("confirmedCompletion").notNull().default(false),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  // Extended fields for the check-in email scheduler
  checkinToken: varchar("checkinToken", { length: 64 }),
  scheduledSendAt: timestamp("scheduledSendAt"),
  checkinEmailSentAt: timestamp("checkinEmailSentAt"),
  homeownerEmail: varchar("homeownerEmail", { length: 320 }),
  homeownerName: varchar("homeownerName", { length: 255 }),
  partnerName: varchar("partnerName", { length: 255 }),
  serviceAddress: varchar("serviceAddress", { length: 500 }),
});
export type HomeownerCheckin = typeof homeownerCheckins.$inferSelect;

// ── Circumvention Flags ──────────────────────────────────────────────────────
export const circumventionFlags = pgTable("circumventionFlags", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull(),
  homeownerId: integer("homeownerId"),
  opportunityId: integer("opportunityId"),
  signalType: varchar("signalType", { length: 50 }).notNull(),
  severity: varchar("severity", { length: 20 }).notNull().default("warning"),
  details: text("details").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("open"),
  resolvedAt: timestamp("resolvedAt"),
  resolvedBy: integer("resolvedBy"),
  resolutionNote: text("resolutionNote"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type CircumventionFlag = typeof circumventionFlags.$inferSelect;

// ── Featured Advertisers (Sponsored Partner Banners) ────────────────────────
export const featuredAdvertisers = pgTable("featuredAdvertisers", {
  id: integer("id").primaryKey(),
  businessName: varchar("businessName", { length: 200 }).notNull(),
  contactName: varchar("contactName", { length: 200 }),
  contactEmail: varchar("contactEmail", { length: 200 }),
  contactPhone: varchar("contactPhone", { length: 50 }),
  category: varchar("category", { length: 100 }).notNull(),
  zipCodes: text("zipCodes").notNull().default("[]"),
  monthlyFee: decimal("monthlyFee", { precision: 10, scale: 2 }).notNull().default("0"),
  status: text("status").notNull().default("pending"),
  bannerTitle: varchar("bannerTitle", { length: 200 }),
  bannerSubtitle: varchar("bannerSubtitle", { length: 500 }),
  bannerCtaText: varchar("bannerCtaText", { length: 100 }).default("Learn More"),
  bannerCtaUrl: varchar("bannerCtaUrl", { length: 500 }),
  bannerLogoUrl: varchar("bannerLogoUrl", { length: 500 }),
  showOnDashboard: boolean("showOnDashboard").notNull().default(true),
  showOnScanResults: boolean("showOnScanResults").notNull().default(true),
  showInEmails: boolean("showInEmails").notNull().default(false),
  impressions: integer("impressions").notNull().default(0),
  clicks: integer("clicks").notNull().default(0),
  startDate: date("startDate"),
  endDate: date("endDate"),
  partnerId: integer("partnerId"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type FeaturedAdvertiser = typeof featuredAdvertisers.$inferSelect;
export type InsertFeaturedAdvertiser = typeof featuredAdvertisers.$inferInsert;

// ─── Photo Queue & Waterfall Pipeline ────────────────────────────────────────

export const photoQueueItems = pgTable("photoQueueItems", {
  id: integer("id").primaryKey(),
  photoUrl: varchar("photoUrl", { length: 1000 }).notNull(),
  serviceAddress: varchar("serviceAddress", { length: 500 }).notNull(),
  source: text("source").notNull().default("field_app"),
  ingestionMode: text("ingestionMode").notNull().default("live"),
  photoAgeMonths: integer("photoAgeMonths"),
  partnerId: integer("partnerId"),
  jobId: integer("jobId"),
  batchId: integer("batchId"),
  status: text("status").notNull().default("pending"),
  tier1Passed: boolean("tier1Passed"),
  tier2Passed: boolean("tier2Passed"),
  tier3Ran: boolean("tier3Ran"),
  finalConfidence: decimal("finalConfidence", { precision: 4, scale: 3 }),
  offerGenerated: boolean("offerGenerated").default(false),
  processingCost: decimal("processingCost", { precision: 8, scale: 6 }),
  staleDataFlags: text("staleDataFlags"),
  analysisResult: text("analysisResult"),
  createdAt: bigint("createdAt", { mode: "number" }).notNull(),
  updatedAt: bigint("updatedAt", { mode: "number" }).notNull(),
});
export type PhotoQueueItem = typeof photoQueueItems.$inferSelect;

export const homeHealthVaultEntries = pgTable("homeHealthVaultEntries", {
  id: integer("id").primaryKey(),
  serviceAddress: varchar("serviceAddress", { length: 500 }).notNull(),
  component: varchar("component", { length: 200 }).notNull(),
  condition: text("condition").notNull().default("unknown"),
  notes: text("notes"),
  estimatedAge: integer("estimatedAge"),
  photoUrl: varchar("photoUrl", { length: 1000 }),
  source: varchar("source", { length: 100 }),
  updatedAt: bigint("updatedAt", { mode: "number" }).notNull(),
});
export type HomeHealthVaultEntry = typeof homeHealthVaultEntries.$inferSelect;

export const photoIngestionBatches = pgTable("photoIngestionBatches", {
  id: integer("id").primaryKey(),
  source: varchar("source", { length: 100 }).notNull(),
  totalPhotos: integer("totalPhotos").notNull(),
  processedPhotos: integer("processedPhotos").default(0),
  offersGenerated: integer("offersGenerated").default(0),
  homeHealthUpdates: integer("homeHealthUpdates").default(0),
  totalCost: decimal("totalCost", { precision: 10, scale: 6 }),
  costSavings: decimal("costSavings", { precision: 10, scale: 6 }),
  status: text("status").notNull().default("queued"),
  createdBy: integer("createdBy"),
  createdAt: bigint("createdAt", { mode: "number" }).notNull(),
  updatedAt: bigint("updatedAt", { mode: "number" }).notNull(),
});
export type PhotoIngestionBatch = typeof photoIngestionBatches.$inferSelect;

// Item 46: Processed Stripe Events — webhook idempotency guard
export const processedStripeEvents = pgTable("processedStripeEvents", {
  id: integer("id").primaryKey(),
  eventId: varchar("eventId", { length: 255 }).notNull().unique(),
  eventType: varchar("eventType", { length: 100 }).notNull(),
  processedAt: timestamp("processedAt").defaultNow().notNull(),
});
export type ProcessedStripeEvent = typeof processedStripeEvents.$inferSelect;


// === AUTOMATED PAYMENT ARCHITECTURE V12 ===
// Core design: Stripe Connect destination charges model.
// - Homeowner pays the PLATFORM (not the partner directly).
// - Platform auto-splits: partner receives job value minus platform fee.
// - Platform fee = commission rate x job value (8-12% default, per-industry configurable).
// - For insurance jobs: partner signs ACH debit authorization; platform pulls
//   commission from partner bank after homeowner check-in confirms completion.
// - All flows are zero-self-reporting: triggers fire automatically on status transitions.
// Patent Note: The automatic commission-pull-on-check-in mechanism is a core
// novel claim in the ProLnk patent application (Claim 20+).

// Job Payments - Master payment record per deal
export const jobPayments = pgTable("jobPayments", {
  id: integer("id").primaryKey(),
  dealId: integer("dealId").notNull().references(() => customerDeals.id),
  homeownerId: integer("homeownerId"),
  referringPartnerId: integer("referringPartnerId").notNull(),
  receivingPartnerId: integer("receivingPartnerId"),
  totalJobValue: decimal("totalJobValue", { precision: 10, scale: 2 }).notNull(),
  platformFeeRate: decimal("platformFeeRate", { precision: 5, scale: 4 }).notNull().default("0.1000"),
  platformFeeAmount: decimal("platformFeeAmount", { precision: 10, scale: 2 }).notNull(),
  referringPartnerCommission: decimal("referringPartnerCommission", { precision: 10, scale: 2 }),
  receivingPartnerPayout: decimal("receivingPartnerPayout", { precision: 10, scale: 2 }),
  paymentMethod: text("paymentMethod").notNull().default("card_on_file"),
  isInsuranceJob: boolean("isInsuranceJob").notNull().default(false),
  insurancePolicyNumber: varchar("insurancePolicyNumber", { length: 100 }),
  insuranceCarrier: varchar("insuranceCarrier", { length: 200 }),
  insuranceAdjusterName: varchar("insuranceAdjusterName", { length: 200 }),
  insuranceAdjusterEmail: varchar("insuranceAdjusterEmail", { length: 320 }),
  insuranceClaimNumber: varchar("insuranceClaimNumber", { length: 100 }),
  insuranceApprovedAmount: decimal("insuranceApprovedAmount", { precision: 10, scale: 2 }),
  insuranceAdjusterReportUrl: varchar("insuranceAdjusterReportUrl", { length: 1000 }),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  stripeSetupIntentId: varchar("stripeSetupIntentId", { length: 255 }),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripeTransferId: varchar("stripeTransferId", { length: 255 }),
  stripeAchMandateId: varchar("stripeAchMandateId", { length: 255 }),
  status: text("status").notNull().default("pending"),
  depositAmount: decimal("depositAmount", { precision: 10, scale: 2 }),
  depositChargedAt: timestamp("depositChargedAt"),
  depositStripeIntentId: varchar("depositStripeIntentId", { length: 255 }),
  balanceAmount: decimal("balanceAmount", { precision: 10, scale: 2 }),
  balanceChargedAt: timestamp("balanceChargedAt"),
  balanceStripeIntentId: varchar("balanceStripeIntentId", { length: 255 }),
  commissionPullAmount: decimal("commissionPullAmount", { precision: 10, scale: 2 }),
  commissionPullChargedAt: timestamp("commissionPullChargedAt"),
  commissionPullStripeIntentId: varchar("commissionPullStripeIntentId", { length: 255 }),
  disputeReason: text("disputeReason"),
  disputeOpenedAt: timestamp("disputeOpenedAt"),
  disputeResolvedAt: timestamp("disputeResolvedAt"),
  disputeResolution: varchar("disputeResolution", { length: 500 }),
  triggeredByCheckinId: integer("triggeredByCheckinId"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type JobPayment = typeof jobPayments.$inferSelect;
export type InsertJobPayment = typeof jobPayments.$inferInsert;

// Payment Milestones - Scheduled charge events for a job
export const paymentMilestones = pgTable("paymentMilestones", {
  id: integer("id").primaryKey(),
  jobPaymentId: integer("jobPaymentId").notNull().references(() => jobPayments.id),
  dealId: integer("dealId").notNull().references(() => customerDeals.id),
  milestoneType: text("milestoneType").notNull(),
  milestoneLabel: varchar("milestoneLabel", { length: 100 }).notNull(),
  percentageOfTotal: decimal("percentageOfTotal", { precision: 5, scale: 4 }).notNull(),
  amountCents: integer("amountCents").notNull(),
  triggerEvent: text("triggerEvent").notNull(),
  status: text("status").notNull().default("scheduled"),
  scheduledFor: timestamp("scheduledFor"),
  triggeredAt: timestamp("triggeredAt"),
  completedAt: timestamp("completedAt"),
  stripeIntentId: varchar("stripeIntentId", { length: 255 }),
  failureReason: text("failureReason"),
  retryCount: integer("retryCount").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type PaymentMilestone = typeof paymentMilestones.$inferSelect;
export type InsertPaymentMilestone = typeof paymentMilestones.$inferInsert;

// ACH Authorizations - Partner-signed debit mandates for insurance jobs
// Patent Claim 21: ACH-on-check-in - automatic commission pull from partner bank
// triggered by homeowner confirmation, with no manual intervention required.
export const achAuthorizations = pgTable("achAuthorizations", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull(),
  jobPaymentId: integer("jobPaymentId").references(() => jobPayments.id),
  dealId: integer("dealId").references(() => customerDeals.id),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripePaymentMethodId: varchar("stripePaymentMethodId", { length: 255 }),
  stripeMandateId: varchar("stripeMandateId", { length: 255 }),
  bankName: varchar("bankName", { length: 200 }),
  bankLast4: varchar("bankLast4", { length: 4 }),
  bankRoutingNumber: varchar("bankRoutingNumber", { length: 9 }),
  accountType: text("accountType").default("checking"),
  authorizationType: text("authorizationType").notNull().default("single_job"),
  maxPullAmount: decimal("maxPullAmount", { precision: 10, scale: 2 }),
  authorizationText: text("authorizationText").notNull(),
  signedAt: timestamp("signedAt"),
  signerName: varchar("signerName", { length: 255 }),
  signerIpAddress: varchar("signerIpAddress", { length: 45 }),
  signerUserAgent: text("signerUserAgent"),
  status: text("status").notNull().default("pending_signature"),
  expiresAt: timestamp("expiresAt"),
  revokedAt: timestamp("revokedAt"),
  revokedReason: text("revokedReason"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type AchAuthorization = typeof achAuthorizations.$inferSelect;
export type InsertAchAuthorization = typeof achAuthorizations.$inferInsert;

// Homeowner Payment Methods - Card-on-file for milestone charges
// Homeowners save a payment method when they accept a deal.
// The platform charges this card automatically at each milestone trigger.
export const homeownerPaymentMethods = pgTable("homeownerPaymentMethods", {
  id: integer("id").primaryKey(),
  homeownerId: integer("homeownerId").notNull(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }).notNull(),
  stripePaymentMethodId: varchar("stripePaymentMethodId", { length: 255 }).notNull(),
  cardBrand: varchar("cardBrand", { length: 20 }),
  cardLast4: varchar("cardLast4", { length: 4 }),
  cardExpMonth: integer("cardExpMonth"),
  cardExpYear: integer("cardExpYear"),
  isAch: boolean("isAch").notNull().default(false),
  achBankName: varchar("achBankName", { length: 200 }),
  achLast4: varchar("achLast4", { length: 4 }),
  isDefault: boolean("isDefault").notNull().default(true),
  isActive: boolean("isActive").notNull().default(true),
  consentText: text("consentText"),
  consentSignedAt: timestamp("consentSignedAt"),
  consentIpAddress: varchar("consentIpAddress", { length: 45 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type HomeownerPaymentMethod = typeof homeownerPaymentMethods.$inferSelect;
export type InsertHomeownerPaymentMethod = typeof homeownerPaymentMethods.$inferInsert;

// Item 47: Commercial Contractor Waitlist
export const commercialWaitlist = pgTable("commercialWaitlist", {
  id: integer("id").primaryKey(),
  businessName: varchar("businessName", { length: 255 }).notNull(),
  contactName: varchar("contactName", { length: 255 }).notNull(),
  contactEmail: varchar("contactEmail", { length: 255 }).notNull().unique(),
  contactPhone: varchar("contactPhone", { length: 30 }),
  businessType: varchar("businessType", { length: 100 }).notNull(),
  portfolioSize: varchar("portfolioSize", { length: 100 }).notNull(),
  serviceArea: varchar("serviceArea", { length: 255 }),
  yearsInBusiness: varchar("yearsInBusiness", { length: 20 }),
  currentSoftware: varchar("currentSoftware", { length: 255 }),
  establishedJobsPerMonth: varchar("establishedJobsPerMonth", { length: 20 }),
  notes: text("notes"),
  status: varchar("status", { length: 30 }).default("pending"),
  reviewedAt: bigint("reviewedAt", { mode: "number" }),
  invitedAt: bigint("invitedAt", { mode: "number" }),
  createdAt: bigint("createdAt", { mode: "number" }).notNull(),
});

// ── Quick Quote Requests (TrustyPro) ─────────────────────────────────────────
// Homeowners can request a free quote from any partner after weather events or any time
export const quickQuoteRequests = pgTable("quickQuoteRequests", {
  id: integer("id").primaryKey(),
  // Homeowner info
  homeownerUserId: integer("homeownerUserId").references(() => users.id),
  homeownerName: varchar("homeownerName", { length: 255 }).notNull(),
  homeownerEmail: varchar("homeownerEmail", { length: 320 }).notNull(),
  homeownerPhone: varchar("homeownerPhone", { length: 30 }),
  // Property
  propertyAddress: varchar("propertyAddress", { length: 500 }).notNull(),
  propertyZipCode: varchar("propertyZipCode", { length: 10 }).notNull(),
  // Service request
  serviceCategory: varchar("serviceCategory", { length: 100 }).notNull(), // "roofing", "hvac", "plumbing", etc.
  serviceDescription: text("serviceDescription").notNull(),
  urgency: text("urgency").default("flexible").notNull(),
  isWeatherRelated: boolean("isWeatherRelated").default(false).notNull(),
  weatherEventType: varchar("weatherEventType", { length: 100 }), // "hail", "tornado", "flood", "ice_storm"
  photoUrls: jsonb("photoUrls").$type<string[]>().default([]),
  // Targeting
  targetPartnerId: integer("targetPartnerId").references(() => partners.id), // specific partner, or null for broadcast
  broadcastToZip: boolean("broadcastToZip").default(false).notNull(), // send to all partners in that zip
  // Status
  status: text("status").default("pending").notNull(),
  quotedAmount: decimal("quotedAmount", { precision: 10, scale: 2 }),
  partnerResponse: text("partnerResponse"),
  respondedAt: timestamp("respondedAt"),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type QuickQuoteRequest = typeof quickQuoteRequests.$inferSelect;
export type InsertQuickQuoteRequest = typeof quickQuoteRequests.$inferInsert;

// ── AI Room Makeover Sessions ─────────────────────────────────────────────────
// Homeowners upload room photos + answer style questions → AI generates redesign mockup
export const roomMakeoverSessions = pgTable("roomMakeoverSessions", {
  id: integer("id").primaryKey(),
  homeownerUserId: integer("homeownerUserId").references(() => users.id),
  // Guest session support (no login required)
  guestEmail: varchar("guestEmail", { length: 320 }),
  guestName: varchar("guestName", { length: 255 }),
  // Room info
  roomType: varchar("roomType", { length: 100 }).notNull(), // "living_room", "kitchen", "bedroom", etc.
  // Uploaded photos (up to 4)
  photoUrls: jsonb("photoUrls").$type<string[]>().default([]),
  // Style questionnaire answers (JSON)
  styleAnswers: jsonb("styleAnswers").$type<Record<string, string>>().default({}),
  // AI generation
  aiPrompt: text("aiPrompt"),
  generatedImageUrl: varchar("generatedImageUrl", { length: 1000 }),
  generationStatus: text("generationStatus").default("pending").notNull(),
  generationError: text("generationError"),
  // Home profile integration
  savedToHomeProfile: boolean("savedToHomeProfile").default(false).notNull(),
  // Service opportunities detected from room analysis
  detectedOpportunities: jsonb("detectedOpportunities").$type<Array<{
    category: string;
    description: string;
    estimatedValue: number;
  }>>().default([]),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type RoomMakeoverSession = typeof roomMakeoverSessions.$inferSelect;
export type InsertRoomMakeoverSession = typeof roomMakeoverSessions.$inferInsert;


// ─── 360 Customer Profiles ────────────────────────────────────────────────────

// Partner 360 Profile — deep business intelligence beyond the basic application
export const partner360Profiles = pgTable("partner360Profiles", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id).unique(),
  yearsInBusiness: text("yearsInBusiness"),
  teamSize: text("teamSize"),
  annualRevenue: text("annualRevenue"),
  businessStructure: text("businessStructure"),
  hasEmployees: boolean("hasEmployees").default(false).notNull(),
  hasSubcontractors: boolean("hasSubcontractors").default(false).notNull(),
  isLicensed: boolean("isLicensed").default(false).notNull(),
  isInsured: boolean("isInsured").default(false).notNull(),
  isBonded: boolean("isBonded").default(false).notNull(),
  currentCrm: varchar("currentCrm", { length: 100 }),
  currentSchedulingTool: varchar("currentSchedulingTool", { length: 100 }),
  currentInvoicingTool: varchar("currentInvoicingTool", { length: 100 }),
  usesQuickbooks: boolean("usesQuickbooks").default(false).notNull(),
  techComfortLevel: text("techComfortLevel").default("medium"),
  primaryGoal: text("primaryGoal"),
  secondaryGoals: jsonb("secondaryGoals").$type<string[]>().default([]),
  revenueGoal12mo: text("revenueGoal12mo"),
  openToHiring: boolean("openToHiring").default(false).notNull(),
  openToFranchise: boolean("openToFranchise").default(false).notNull(),
  openToAcquisition: boolean("openToAcquisition").default(false).notNull(),
  communicationStyle: text("communicationStyle").default("text_first"),
  bestTimeToContact: text("bestTimeToContact").default("anytime"),
  preferredLeadType: text("preferredLeadType").default("residential"),
  avgJobSize: text("avgJobSize"),
  biggestChallenge: text("biggestChallenge"),
  referralMotivation: text("referralMotivation"),
  willingToReferCompetitors: boolean("willingToReferCompetitors").default(false).notNull(),
  hasExistingReferralNetwork: boolean("hasExistingReferralNetwork").default(false).notNull(),
  estimatedMonthlyJobs: integer("estimatedMonthlyJobs").default(0),
  googleBusinessUrl: varchar("googleBusinessUrl", { length: 500 }),
  yelpUrl: varchar("yelpUrl", { length: 500 }),
  facebookUrl: varchar("facebookUrl", { length: 500 }),
  instagramUrl: varchar("instagramUrl", { length: 500 }),
  totalOnlineReviews: integer("totalOnlineReviews").default(0),
  avgOnlineRating: decimal("avgOnlineRating", { precision: 3, scale: 2 }),
  completenessScore: integer("completenessScore").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type Partner360Profile = typeof partner360Profiles.$inferSelect;
export type InsertPartner360Profile = typeof partner360Profiles.$inferInsert;

// Homeowner 360 Profile — lifestyle, financial comfort, communication preferences, and goals
export const homeowner360Profiles = pgTable("homeowner360Profiles", {
  id: integer("id").primaryKey(),
  userId: integer("userId").notNull().references(() => users.id).unique(),
  householdSize: text("householdSize"),
  hasChildren: boolean("hasChildren").default(false).notNull(),
  childrenAges: jsonb("childrenAges").$type<string[]>().default([]),
  lifestyleType: text("lifestyleType"),
  hobbies: jsonb("hobbies").$type<string[]>().default([]),
  entertainsFrequently: boolean("entertainsFrequently").default(false).notNull(),
  workFromHome: boolean("workFromHome").default(false).notNull(),
  budgetComfort: text("budgetComfort").default("value_seeker"),
  typicalProjectBudget: text("typicalProjectBudget"),
  financesBigProjects: boolean("financesBigProjects").default(false).notNull(),
  hasHomeWarranty: boolean("hasHomeWarranty").default(false).notNull(),
  hasHomeInsurance: boolean("hasHomeInsurance").default(true).notNull(),
  insuranceProvider: varchar("insuranceProvider", { length: 100 }),
  hasMortgage: boolean("hasMortgage").default(true).notNull(),
  decisionMaker: text("decisionMaker").default("solo"),
  decisionSpeed: text("decisionSpeed").default("within_week"),
  hiringCriteria: jsonb("hiringCriteria").$type<string[]>().default([]),
  requiresBackground: boolean("requiresBackground").default(false).notNull(),
  communicationStyle: text("communicationStyle").default("text_first"),
  bestTimeToContact: text("bestTimeToContact").default("anytime"),
  responseExpectation: text("responseExpectation").default("same_day"),
  prefersVideoConsult: boolean("prefersVideoConsult").default(false).notNull(),
  planningToSell: boolean("planningToSell").default(false).notNull(),
  sellTimeframe: text("sellTimeframe").default("not_planning"),
  primaryHomeGoal: text("primaryHomeGoal"),
  topProjectCategories: jsonb("topProjectCategories").$type<string[]>().default([]),
  dreamProjects: text("dreamProjects"),
  referralMotivation: text("referralMotivation").default("credits"),
  hasReferredBefore: boolean("hasReferredBefore").default(false).notNull(),
  socialMediaActive: boolean("socialMediaActive").default(false).notNull(),
  wouldLeaveReview: boolean("wouldLeaveReview").default(true).notNull(),
  npsScore: integer("npsScore"),
  satisfactionNotes: text("satisfactionNotes"),
  completenessScore: integer("completenessScore").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type Homeowner360Profile = typeof homeowner360Profiles.$inferSelect;
export type InsertHomeowner360Profile = typeof homeowner360Profiles.$inferInsert;

// -- Homeowner Leads (matches live DB) --
export const homeownerLeads = pgTable("homeownerLeads", {
  id: integer("id").primaryKey(),
  homeownerName: varchar("homeownerName", { length: 255 }),
  homeownerEmail: varchar("homeownerEmail", { length: 255 }).unique(),
  homeownerPhone: varchar("homeownerPhone", { length: 50 }),
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 50 }).default("TX"),
  zipCode: varchar("zipCode", { length: 20 }),
  photoUrls: jsonb("photoUrls").$type<string[]>(),
  aiAnalysis: jsonb("aiAnalysis"),
  detectedServices: jsonb("detectedServices"),
  matchedPartnerId: integer("matchedPartnerId"),
  opportunityId: integer("opportunityId"),
  source: varchar("source", { length: 50 }).notNull().default("trustypro"),
  fullCommission: boolean("fullCommission").notNull().default(true),
  status: text("status").notNull().default("new"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
export type HomeownerLead = typeof homeownerLeads.$inferSelect;

// -- Homeowner Scan Offers (matches live DB) --
export const homeownerScanOffers = pgTable("homeownerScanOffers", {
  id: integer("id").primaryKey(),
  homeownerProfileId: integer("homeownerProfileId"),
  homeownerEmail: varchar("homeownerEmail", { length: 320 }),
  roomLabel: varchar("roomLabel", { length: 100 }),
  issueType: varchar("issueType", { length: 100 }).notNull(),
  issueCategory: varchar("issueCategory", { length: 100 }).notNull(),
  issueDescription: text("issueDescription").notNull(),
  severity: text("severity").notNull().default("medium"),
  estimatedCostLow: decimal("estimatedCostLow", { precision: 10, scale: 2 }),
  estimatedCostHigh: decimal("estimatedCostHigh", { precision: 10, scale: 2 }),
  photoUrl: text("photoUrl"),
  status: text("status").notNull().default("new"),
  source: varchar("source", { length: 50 }).default("ai_scan"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  offerTrack: varchar("offerTrack", { length: 50 }).default("repair"),
  transformationImageUrl: text("transformationImageUrl"),
  isInsuranceClaim: boolean("isInsuranceClaim").default(false),
  transformationPrompt: text("transformationPrompt"),
  propertyId: integer("propertyId"),
});
export type HomeownerScanOffer = typeof homeownerScanOffers.$inferSelect;

// -- Homeowner Scan History (matches live DB) --
export const homeownerScanHistory = pgTable("homeownerScanHistory", {
  id: integer("id").primaryKey(),
  homeownerProfileId: integer("homeownerProfileId"),
  homeownerEmail: varchar("homeownerEmail", { length: 320 }),
  roomLabel: varchar("roomLabel", { length: 100 }),
  photoUrls: jsonb("photoUrls").$type<string[]>(),
  analysisJson: jsonb("analysisJson"),
  overallCondition: varchar("overallCondition", { length: 50 }),
  issueCount: integer("issueCount").default(0),
  upgradeCount: integer("upgradeCount").default(0),
  photoQualityFlag: varchar("photoQualityFlag", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow(),
  propertyId: integer("propertyId"),
});
export type HomeownerScanHistoryEntry = typeof homeownerScanHistory.$inferSelect;

// ===== TABLES THAT EXISTED IN DB BUT WERE MISSING FROM SCHEMA =====

// -- Forum Posts --
export const forumPosts = pgTable("forumPosts", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull(),
  category: varchar("category", { length: 50 }).notNull().default("general"),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  likes: integer("likes").notNull().default(0),
  pinned: boolean("pinned").notNull().default(false),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});
export type ForumPost = typeof forumPosts.$inferSelect;

// -- Forum Replies --
export const forumReplies = pgTable("forumReplies", {
  id: integer("id").primaryKey(),
  postId: integer("postId").notNull(),
  partnerId: integer("partnerId").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("createdAt").notNull(),
});
export type ForumReply = typeof forumReplies.$inferSelect;

// -- Forum Likes --
export const forumLikes = pgTable("forumLikes", {
  id: integer("id").primaryKey(),
  postId: integer("postId").notNull(),
  partnerId: integer("partnerId").notNull(),
  createdAt: timestamp("createdAt").notNull(),
});
export type ForumLike = typeof forumLikes.$inferSelect;

// -- Partner Gallery Projects --
export const partnerGalleryProjects = pgTable("partnerGalleryProjects", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }),
  beforeImageUrl: text("beforeImageUrl"),
  afterImageUrl: text("afterImageUrl"),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").notNull(),
});
export type PartnerGalleryProject = typeof partnerGalleryProjects.$inferSelect;

// -- Agent Homeowner Referrals --
export const agentHomeownerReferrals = pgTable("agentHomeownerReferrals", {
  id: integer("id").primaryKey(),
  agentId: integer("agentId").notNull(),
  homeownerName: varchar("homeownerName", { length: 200 }).notNull(),
  homeownerEmail: varchar("homeownerEmail", { length: 300 }),
  homeownerPhone: varchar("homeownerPhone", { length: 30 }),
  propertyAddress: varchar("propertyAddress", { length: 500 }),
  referralDirection: text("referralDirection").notNull(),
  saleStatus: text("saleStatus").notNull().default("active"),
  salePrice: decimal("salePrice", { precision: 12, scale: 2 }),
  agentCommissionAmount: decimal("agentCommissionAmount", { precision: 12, scale: 2 }),
  proLnkReferralFee: decimal("proLnkReferralFee", { precision: 12, scale: 2 }),
  saleClosedAt: timestamp("saleClosedAt"),
  referralFeePaidAt: timestamp("referralFeePaidAt"),
  homeownerUserId: integer("homeownerUserId"),
  perpetualCommissionActive: boolean("perpetualCommissionActive").notNull().default(true),
  totalPerpetualEarned: decimal("totalPerpetualEarned", { precision: 12, scale: 2 }).notNull().default("0.00"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type AgentHomeownerReferral = typeof agentHomeownerReferrals.$inferSelect;

// -- Agent Perpetual Commissions --
export const agentPerpetualCommissions = pgTable("agentPerpetualCommissions", {
  id: integer("id").primaryKey(),
  agentId: integer("agentId").notNull(),
  referralId: integer("referralId").notNull(),
  opportunityId: integer("opportunityId"),
  proLnkCommissionAmount: decimal("proLnkCommissionAmount", { precision: 10, scale: 2 }).notNull(),
  agentEarnedAmount: decimal("agentEarnedAmount", { precision: 10, scale: 2 }).notNull(),
  paid: boolean("paid").notNull().default(false),
  paidAt: timestamp("paidAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type AgentPerpetualCommission = typeof agentPerpetualCommissions.$inferSelect;

// -- Insurance Claims --
export const insuranceClaims = pgTable("insuranceClaims", {
  id: integer("id").primaryKey(),
  opportunityId: integer("opportunityId").notNull(),
  homeownerProfileId: integer("homeownerProfileId"),
  partnerId: integer("partnerId"),
  claimType: varchar("claimType", { length: 100 }).notNull(),
  description: text("description").notNull(),
  damageDate: timestamp("damageDate"),
  insuranceCompany: varchar("insuranceCompany", { length: 200 }),
  policyNumber: varchar("policyNumber", { length: 100 }),
  claimNumber: varchar("claimNumber", { length: 100 }),
  estimatedDamage: decimal("estimatedDamage", { precision: 10, scale: 2 }),
  approvedAmount: decimal("approvedAmount", { precision: 10, scale: 2 }),
  deductible: decimal("deductible", { precision: 10, scale: 2 }),
  status: text("status").notNull().default("flagged"),
  jobValue: decimal("jobValue", { precision: 10, scale: 2 }),
  platformFeeAmount: decimal("platformFeeAmount", { precision: 10, scale: 2 }),
  commissionPaid: boolean("commissionPaid").notNull().default(false),
  commissionPaidAt: timestamp("commissionPaidAt"),
  lastReminderSentAt: timestamp("lastReminderSentAt"),
  reminderCount: integer("reminderCount").notNull().default(0),
  notes: text("notes"),
  aiDetected: boolean("aiDetected").notNull().default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type InsuranceClaim = typeof insuranceClaims.$inferSelect;

// -- Messages --
export const messages = pgTable("messages", {
  id: integer("id").primaryKey(),
  threadId: varchar("thread_id", { length: 64 }).notNull(),
  senderType: text("sender_type").notNull().default("homeowner"),
  senderUserId: integer("sender_user_id").notNull(),
  recipientUserId: integer("recipient_user_id").notNull(),
  homeownerEmail: varchar("homeowner_email", { length: 255 }),
  partnerId: integer("partner_id"),
  body: text("body").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: bigint("created_at", { mode: "number" }).notNull(),
});
export type Message = typeof messages.$inferSelect;

// -- Partner Alerts --
export const partnerAlerts = pgTable("partnerAlerts", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull(),
  alertType: varchar("alertType", { length: 100 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  severity: text("severity").notNull().default("info"),
  isRead: boolean("isRead").notNull().default(false),
  isDismissed: boolean("isDismissed").notNull().default(false),
  metadata: jsonb("metadata"),
  createdAt: timestamp("createdAt").defaultNow(),
});
export type PartnerAlert = typeof partnerAlerts.$inferSelect;

// -- Partner Verifications --
export const partnerVerifications = pgTable("partnerVerifications", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull(),
  licenseVerified: boolean("licenseVerified").notNull().default(false),
  licenseNumber: varchar("licenseNumber", { length: 100 }),
  licenseState: varchar("licenseState", { length: 10 }),
  licenseExpiresAt: bigint("licenseExpiresAt", { mode: "number" }),
  licenseDocUrl: text("licenseDocUrl"),
  licenseVerifiedAt: bigint("licenseVerifiedAt", { mode: "number" }),
  licenseVerifiedBy: integer("licenseVerifiedBy"),
  licenseNotes: text("licenseNotes"),
  insuranceVerified: boolean("insuranceVerified").notNull().default(false),
  insuranceCarrier: varchar("insuranceCarrier", { length: 200 }),
  insurancePolicyNumber: varchar("insurancePolicyNumber", { length: 100 }),
  insuranceExpiresAt: bigint("insuranceExpiresAt", { mode: "number" }),
  insuranceDocUrl: text("insuranceDocUrl"),
  insuranceVerifiedAt: bigint("insuranceVerifiedAt", { mode: "number" }),
  insuranceVerifiedBy: integer("insuranceVerifiedBy"),
  insuranceNotes: text("insuranceNotes"),
  backgroundCheckVerified: boolean("backgroundCheckVerified").notNull().default(false),
  backgroundCheckProvider: varchar("backgroundCheckProvider", { length: 100 }),
  backgroundCheckDate: bigint("backgroundCheckDate", { mode: "number" }),
  backgroundCheckDocUrl: text("backgroundCheckDocUrl"),
  backgroundCheckVerifiedAt: bigint("backgroundCheckVerifiedAt", { mode: "number" }),
  backgroundCheckVerifiedBy: integer("backgroundCheckVerifiedBy"),
  backgroundCheckNotes: text("backgroundCheckNotes"),
  businessRegistrationVerified: boolean("businessRegistrationVerified").notNull().default(false),
  businessRegistrationDocUrl: text("businessRegistrationDocUrl"),
  businessRegistrationVerifiedAt: bigint("businessRegistrationVerifiedAt", { mode: "number" }),
  businessRegistrationVerifiedBy: integer("businessRegistrationVerifiedBy"),
  businessRegistrationNotes: text("businessRegistrationNotes"),
  referencesVerified: boolean("referencesVerified").notNull().default(false),
  referencesCount: integer("referencesCount").default(0),
  referencesNotes: text("referencesNotes"),
  referencesVerifiedAt: bigint("referencesVerifiedAt", { mode: "number" }),
  referencesVerifiedBy: integer("referencesVerifiedBy"),
  portfolioVerified: boolean("portfolioVerified").notNull().default(false),
  portfolioUrl: text("portfolioUrl"),
  portfolioNotes: text("portfolioNotes"),
  portfolioVerifiedAt: bigint("portfolioVerifiedAt", { mode: "number" }),
  portfolioVerifiedBy: integer("portfolioVerifiedBy"),
  identityVerified: boolean("identityVerified").notNull().default(false),
  identityDocType: varchar("identityDocType", { length: 50 }),
  identityDocUrl: text("identityDocUrl"),
  identityVerifiedAt: bigint("identityVerifiedAt", { mode: "number" }),
  identityVerifiedBy: integer("identityVerifiedBy"),
  identityNotes: text("identityNotes"),
  trustScore: integer("trustScore").notNull().default(0),
  badgeLevel: text("badgeLevel").notNull().default("none"),
  overallStatus: text("overallStatus").notNull().default("unverified"),
  createdAt: bigint("createdAt", { mode: "number" }).notNull().default(0),
  updatedAt: bigint("updatedAt", { mode: "number" }).notNull().default(0),
});
export type PartnerVerification = typeof partnerVerifications.$inferSelect;

// -- Real Estate Agents --
export const realEstateAgents = pgTable("realEstateAgents", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull(),
  licenseNumber: varchar("licenseNumber", { length: 100 }),
  brokerageName: varchar("brokerageName", { length: 200 }),
  mlsId: varchar("mlsId", { length: 100 }),
  serviceZipCodes: text("serviceZipCodes"),
  averageHomeSalePrice: decimal("averageHomeSalePrice", { precision: 12, scale: 2 }),
  proLnkReferralRate: decimal("proLnkReferralRate", { precision: 5, scale: 4 }).notNull().default("0.1000"),
  homeownerRecruitRate: decimal("homeownerRecruitRate", { precision: 5, scale: 4 }).notNull().default("0.2500"),
  totalReferralsSent: integer("totalReferralsSent").notNull().default(0),
  totalSalesCompleted: integer("totalSalesCompleted").notNull().default(0),
  totalEarned: decimal("totalEarned", { precision: 12, scale: 2 }).notNull().default("0.00"),
  totalOwed: decimal("totalOwed", { precision: 12, scale: 2 }).notNull().default("0.00"),
  agreementSignedAt: timestamp("agreementSignedAt"),
  agreementSignedBy: varchar("agreementSignedBy", { length: 200 }),
  agreementVersion: varchar("agreementVersion", { length: 20 }),
  referralCode: varchar("referralCode", { length: 50 }),
  contactName: varchar("contactName", { length: 200 }),
  contactEmail: varchar("contactEmail", { length: 255 }),
  businessName: varchar("businessName", { length: 200 }),
  userId: integer("userId"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type RealEstateAgent = typeof realEstateAgents.$inferSelect;

// -- Referral Clicks --
export const referralClicks = pgTable("referralClicks", {
  id: integer("id").primaryKey(),
  referrerId: integer("referrerId").notNull(),
  referralCode: varchar("referralCode", { length: 100 }).notNull(),
  clickedAt: timestamp("clickedAt").defaultNow(),
  convertedAt: timestamp("convertedAt"),
  convertedPartnerId: integer("convertedPartnerId"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
});
export type ReferralClick = typeof referralClicks.$inferSelect;

// -- Referrals --
export const referrals = pgTable("referrals", {
  id: integer("id").primaryKey(),
  fromPartnerId: integer("fromPartnerId").notNull(),
  toPartnerId: integer("toPartnerId"),
  customerName: varchar("customerName", { length: 255 }),
  customerEmail: varchar("customerEmail", { length: 320 }),
  customerPhone: varchar("customerPhone", { length: 30 }),
  serviceType: varchar("serviceType", { length: 100 }),
  notes: text("notes"),
  status: text("status").notNull().default("pending"),
  commissionAmount: decimal("commissionAmount", { precision: 10, scale: 2 }).default("0.00"),
  commissionPaid: boolean("commissionPaid").notNull().default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type Referral = typeof referrals.$inferSelect;

// -- Stripe Connect Onboarding --
export const stripeConnectOnboarding = pgTable("stripeConnectOnboarding", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull(),
  stripeAccountId: varchar("stripeAccountId", { length: 255 }),
  onboardingUrl: text("onboardingUrl"),
  onboardingExpiresAt: timestamp("onboardingExpiresAt"),
  status: text("status").notNull().default("not_started"),
  chargesEnabled: boolean("chargesEnabled").notNull().default(false),
  payoutsEnabled: boolean("payoutsEnabled").notNull().default(false),
  detailsSubmitted: boolean("detailsSubmitted").notNull().default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type StripeConnectOnboarding = typeof stripeConnectOnboarding.$inferSelect;


// ═══════════════════════════════════════════════════════════════════════════════
// PLANNED FEATURE TABLES (scaffolded for future implementation)
// ═══════════════════════════════════════════════════════════════════════════════

// -- Agent Properties (real estate agent property listings) --
export const agentProperties = pgTable("agentProperties", {
  id: integer("id").primaryKey(),
  agentUserId: integer("agentUserId").notNull(),
  address: varchar("address", { length: 500 }).notNull(),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 10 }),
  zipCode: varchar("zipCode", { length: 10 }),
  mlsNumber: varchar("mlsNumber", { length: 50 }),
  listPrice: integer("listPrice"),
  status: text("status").notNull().default("active"),
  propertyType: varchar("propertyType", { length: 50 }),
  bedrooms: integer("bedrooms"),
  bathrooms: varchar("bathrooms", { length: 10 }),
  squareFootage: integer("squareFootage"),
  yearBuilt: integer("yearBuilt"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type AgentProperty = typeof agentProperties.$inferSelect;

// -- Home Maintenance Items (master list of trackable maintenance items) --
export const homeMaintenanceItems = pgTable("homeMaintenanceItems", {
  id: integer("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  defaultIntervalDays: integer("defaultIntervalDays"),
  description: text("description"),
  importance: text("importance").notNull().default("medium"),
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type HomeMaintenanceItem = typeof homeMaintenanceItems.$inferSelect;

// -- Home Maintenance Records (per-property maintenance history) --
export const homeMaintenanceRecords = pgTable("homeMaintenanceRecords", {
  id: integer("id").primaryKey(),
  propertyId: integer("propertyId").notNull(),
  maintenanceItemId: integer("maintenanceItemId"),
  itemName: varchar("itemName", { length: 200 }).notNull(),
  performedAt: timestamp("performedAt"),
  performedBy: varchar("performedBy", { length: 200 }),
  cost: integer("cost"),
  notes: text("notes"),
  photoUrls: jsonb("photoUrls"),
  nextDueAt: timestamp("nextDueAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type HomeMaintenanceRecord = typeof homeMaintenanceRecords.$inferSelect;

// -- Home System Records (HVAC, roof, plumbing, etc. tracking for Home Health Vault) --
export const homeSystemRecords = pgTable("homeSystemRecords", {
  id: integer("id").primaryKey(),
  propertyId: integer("propertyId").notNull(),
  systemType: varchar("systemType", { length: 100 }).notNull(),
  brand: varchar("brand", { length: 100 }),
  model: varchar("model", { length: 100 }),
  installedAt: timestamp("installedAt"),
  expectedLifespanYears: integer("expectedLifespanYears"),
  warrantyExpiresAt: timestamp("warrantyExpiresAt"),
  lastServicedAt: timestamp("lastServicedAt"),
  condition: text("condition").notNull().default("good"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type HomeSystemRecord = typeof homeSystemRecords.$inferSelect;

// -- Property Documents (uploaded docs for properties) --
export const propertyDocuments = pgTable("propertyDocuments", {
  id: integer("id").primaryKey(),
  propertyId: integer("propertyId").notNull(),
  documentType: varchar("documentType", { length: 100 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  fileUrl: text("fileUrl").notNull(),
  fileKey: varchar("fileKey", { length: 500 }),
  mimeType: varchar("mimeType", { length: 100 }),
  fileSize: integer("fileSize"),
  uploadedByUserId: integer("uploadedByUserId"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type PropertyDocument = typeof propertyDocuments.$inferSelect;

// -- Property Timeline (event log for property changes, repairs, inspections) --
export const propertyTimeline = pgTable("propertyTimeline", {
  id: integer("id").primaryKey(),
  propertyId: integer("propertyId").notNull(),
  eventType: varchar("eventType", { length: 100 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  eventDate: timestamp("eventDate"),
  metadata: jsonb("metadata"),
  createdByUserId: integer("createdByUserId"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type PropertyTimelineEvent = typeof propertyTimeline.$inferSelect;

// -- Review Responses (partner responses to homeowner reviews) --
export const reviewResponses = pgTable("reviewResponses", {
  id: integer("id").primaryKey(),
  reviewId: integer("reviewId").notNull(),
  partnerId: integer("partnerId").notNull(),
  body: text("body").notNull(),
  isPublic: boolean("isPublic").notNull().default(true),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type ReviewResponse = typeof reviewResponses.$inferSelect;

// -- Service Requests (homeowner requests for specific services) --
export const serviceRequests = pgTable("serviceRequests", {
  id: integer("id").primaryKey(),
  homeownerProfileId: integer("homeownerProfileId").notNull(),
  propertyId: integer("propertyId"),
  serviceCategory: varchar("serviceCategory", { length: 100 }).notNull(),
  description: text("description"),
  urgency: text("urgency").notNull().default("normal"),
  budget: varchar("budget", { length: 50 }),
  preferredDate: timestamp("preferredDate"),
  photoUrls: jsonb("photoUrls"),
  status: text("status").notNull().default("open"),
  matchedPartnerId: integer("matchedPartnerId"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type ServiceRequest = typeof serviceRequests.$inferSelect;

// -- Storm Alerts (weather alerts for properties) --
export const stormAlerts = pgTable("stormAlerts", {
  id: integer("id").primaryKey(),
  propertyId: integer("propertyId"),
  zipCode: varchar("zipCode", { length: 10 }).notNull(),
  alertType: varchar("alertType", { length: 100 }).notNull(),
  headline: varchar("headline", { length: 500 }).notNull(),
  severity: text("severity").notNull().default("moderate"),
  description: text("description"),
  startsAt: timestamp("startsAt"),
  endsAt: timestamp("endsAt"),
  source: varchar("source", { length: 100 }),
  notificationSent: boolean("notificationSent").notNull().default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type StormAlert = typeof stormAlerts.$inferSelect;

// ============================================================
// FSM-TO-VAULT CONSENT BRIDGE
// When a pro connects their FSM (Jobber, ServiceTitan, CompanyCam),
// their historical job records are pulled and indexed by service address.
// When a homeowner verifies their address, they are prompted to claim
// verified service records into their Home Health Vault.
// ============================================================

// -- FSM Job Records (indexed by service address, sourced from pro FSM integrations) --
export const fsmJobRecords = pgTable("fsmJobRecords", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  integrationId: integer("integrationId").notNull().references(() => partnerIntegrations.id),
  externalJobId: varchar("externalJobId", { length: 255 }).notNull(),
  source: varchar("source", { length: 50 }).notNull(),
  serviceAddress: varchar("serviceAddress", { length: 500 }).notNull(),
  serviceAddressNormalized: varchar("serviceAddressNormalized", { length: 500 }).notNull(),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 50 }),
  zipCode: varchar("zipCode", { length: 10 }),
  jobTitle: varchar("jobTitle", { length: 255 }),
  tradeCategory: varchar("tradeCategory", { length: 100 }),
  description: text("description"),
  completedAt: timestamp("completedAt"),
  photoUrls: jsonb("photoUrls").$type<string[]>().default([]),
  photoCount: integer("photoCount").default(0),
  importStatus: text("importStatus").notNull().default("pending"),
  claimedByHomeownerId: integer("claimedByHomeownerId"),
  claimedAt: timestamp("claimedAt"),
  rawData: jsonb("rawData"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type FsmJobRecord = typeof fsmJobRecords.$inferSelect;
export type InsertFsmJobRecord = typeof fsmJobRecords.$inferInsert;

// -- Vault Import Consents (tracks homeowner consent decisions for FSM record imports) --
export const vaultImportConsents = pgTable("vaultImportConsents", {
  id: integer("id").primaryKey(),
  homeownerProfileId: integer("homeownerProfileId").notNull(),
  propertyId: integer("propertyId"),
  fsmJobRecordId: integer("fsmJobRecordId").notNull().references(() => fsmJobRecords.id),
  decision: text("decision").notNull(),
  decidedAt: timestamp("decidedAt").notNull().defaultNow(),
  vaultEntryId: integer("vaultEntryId"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type VaultImportConsent = typeof vaultImportConsents.$inferSelect;
export type InsertVaultImportConsent = typeof vaultImportConsents.$inferInsert;

// -- FSM Sync Jobs (tracks background sync runs per integration) --
export const fsmSyncJobs = pgTable("fsmSyncJobs", {
  id: integer("id").primaryKey(),
  integrationId: integer("integrationId").notNull().references(() => partnerIntegrations.id),
  partnerId: integer("partnerId").notNull(),
  status: text("status").notNull().default("queued"),
  jobsFound: integer("jobsFound").default(0),
  jobsImported: integer("jobsImported").default(0),
  jobsSkipped: integer("jobsSkipped").default(0),
  errorMessage: text("errorMessage"),
  startedAt: timestamp("startedAt"),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type FsmSyncJob = typeof fsmSyncJobs.$inferSelect;

// -- Marketing Email Log (prevents duplicate campaign emails per user per campaign) --
export const marketingEmailLog = pgTable("marketingEmailLog", {
  id: integer("id").primaryKey(),
  userId: integer("userId").notNull(),
  campaignKey: varchar("campaignKey", { length: 128 }).notNull(),
  sentAt: timestamp("sentAt").notNull().defaultNow(),
});
export type MarketingEmailLog = typeof marketingEmailLog.$inferSelect;

// -- Payout Requests (partner-initiated payout requests for admin review) --
export const payoutRequests = pgTable("payoutRequests", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  requestedAmount: decimal("requestedAmount", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"),
  note: text("note"),
  adminNote: text("adminNote"),
  reviewedByAdminId: integer("reviewedByAdminId"),
  reviewedAt: timestamp("reviewedAt"),
  paidAt: timestamp("paidAt"),
  stripeTransferId: varchar("stripeTransferId", { length: 255 }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type PayoutRequest = typeof payoutRequests.$inferSelect;
export type InsertPayoutRequest = typeof payoutRequests.$inferInsert;

// -- Exchange Jobs (partner-to-partner job marketplace) --
export const exchangeJobs = pgTable("exchangeJobs", {
  id: integer("id").primaryKey(),
  postedByPartnerId: integer("postedByPartnerId").notNull().references(() => partners.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  jobType: text("jobType").notNull().default("residential"),
  tradeCategory: varchar("tradeCategory", { length: 100 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  totalValue: decimal("totalValue", { precision: 10, scale: 2 }).notNull(),
  brokerMargin: decimal("brokerMargin", { precision: 5, scale: 2 }).notNull().default("10.00"),
  deadline: timestamp("deadline"),
  status: text("status").notNull().default("open"),
  scopeItems: text("scopeItems"), // JSON array
  clientName: varchar("clientName", { length: 255 }),
  isCommercial: boolean("isCommercial").default(false),
  bidsCount: integer("bidsCount").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type ExchangeJob = typeof exchangeJobs.$inferSelect;
export type InsertExchangeJob = typeof exchangeJobs.$inferInsert;

// -- Exchange Bids (partner bids on exchange jobs) --
export const exchangeBids = pgTable("exchangeBids", {
  id: integer("id").primaryKey(),
  jobId: integer("jobId").notNull().references(() => exchangeJobs.id),
  biddingPartnerId: integer("biddingPartnerId").notNull().references(() => partners.id),
  bidAmount: decimal("bidAmount", { precision: 10, scale: 2 }).notNull(),
  message: text("message"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type ExchangeBid = typeof exchangeBids.$inferSelect;

// -- Homeowner Saved Pros (favorites) --
export const homeownerFavorites = pgTable("homeownerFavorites", {
  id: integer("id").primaryKey(),
  homeownerProfileId: integer("homeownerProfileId").notNull().references(() => homeownerProfiles.id),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  notes: text("notes"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type HomeownerFavorite = typeof homeownerFavorites.$inferSelect;

// ============================================================
// NEW TABLES — Sprint: All 57 Autonomous Items
// ============================================================

// -- Partner Availability Slots --
export const partnerAvailability = pgTable("partnerAvailability", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  dayOfWeek: integer("dayOfWeek").notNull(),
  startHour: integer("startHour").notNull(),
  endHour: integer("endHour").notNull(),
  isAvailable: boolean("isAvailable").notNull().default(true),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type PartnerAvailability = typeof partnerAvailability.$inferSelect;

// -- Partner Job Matching Preferences --
export const partnerJobPreferences = pgTable("partnerJobPreferences", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  serviceCategories: jsonb("serviceCategories").$type<string[]>().notNull().default([]),
  maxJobDistance: integer("maxJobDistance").notNull().default(25),
  minJobValue: decimal("minJobValue", { precision: 10, scale: 2 }).notNull().default("0"),
  maxJobValue: decimal("maxJobValue", { precision: 10, scale: 2 }),
  preferredDays: jsonb("preferredDays").$type<number[]>().notNull().default([]),
  acceptsEmergency: boolean("acceptsEmergency").notNull().default(false),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type PartnerJobPreference = typeof partnerJobPreferences.$inferSelect;

// -- Partner Onboarding Checklist --
export const partnerOnboardingChecklist = pgTable("partnerOnboardingChecklist", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  profileComplete: boolean("profileComplete").notNull().default(false),
  payoutConnected: boolean("payoutConnected").notNull().default(false),
  firstReferralSent: boolean("firstReferralSent").notNull().default(false),
  trainingComplete: boolean("trainingComplete").notNull().default(false),
  agreementSigned: boolean("agreementSigned").notNull().default(false),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type PartnerOnboardingChecklist = typeof partnerOnboardingChecklist.$inferSelect;

// -- Networking Event Registrations --
export const networkingEventRegistrations = pgTable("networkingEventRegistrations", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  eventName: varchar("eventName", { length: 255 }).notNull(),
  eventDate: timestamp("eventDate").notNull(),
  location: varchar("location", { length: 255 }),
  status: text("status").notNull().default("registered"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type NetworkingEventRegistration = typeof networkingEventRegistrations.$inferSelect;

// -- Training Academy Enrollments --
export const trainingEnrollments = pgTable("trainingEnrollments", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  courseId: varchar("courseId", { length: 100 }).notNull(),
  courseName: varchar("courseName", { length: 255 }).notNull(),
  status: text("status").notNull().default("enrolled"),
  progress: integer("progress").notNull().default(0),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type TrainingEnrollment = typeof trainingEnrollments.$inferSelect;

// -- Skills Marketplace Enrollments --
export const skillEnrollments = pgTable("skillEnrollments", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  skillId: varchar("skillId", { length: 100 }).notNull(),
  skillName: varchar("skillName", { length: 255 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
  status: text("status").notNull().default("active"),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type SkillEnrollment = typeof skillEnrollments.$inferSelect;

// -- Proposals --
export const proposals = pgTable("proposals", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }),
  clientPhone: varchar("clientPhone", { length: 30 }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  lineItems: jsonb("lineItems").$type<Array<{ description: string; qty: number; unitPrice: number }>>().notNull().default([]),
  totalAmount: decimal("totalAmount", { precision: 10, scale: 2 }).notNull().default("0"),
  status: text("status").notNull().default("draft"),
  sentAt: timestamp("sentAt"),
  viewedAt: timestamp("viewedAt"),
  respondedAt: timestamp("respondedAt"),
  expiresAt: timestamp("expiresAt"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type Proposal = typeof proposals.$inferSelect;
export type InsertProposal = typeof proposals.$inferInsert;

// -- Quotes --
export const quotes = pgTable("quotes", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }),
  serviceCategory: varchar("serviceCategory", { length: 100 }),
  description: text("description"),
  estimatedAmount: decimal("estimatedAmount", { precision: 10, scale: 2 }).notNull().default("0"),
  status: text("status").notNull().default("draft"),
  sentAt: timestamp("sentAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = typeof quotes.$inferInsert;

// -- Platform Content Items (WhatsNew, UpsellPlaybook, TrainingHub, ResourceCenter) --
export const contentItems = pgTable("contentItems", {
  id: integer("id").primaryKey(),
  contentType: text("contentType").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body"),
  url: varchar("url", { length: 1024 }),
  category: varchar("category", { length: 100 }),
  tags: jsonb("tags").$type<string[]>().default([]),
  isPublished: boolean("isPublished").notNull().default(false),
  publishedAt: timestamp("publishedAt"),
  sortOrder: integer("sortOrder").notNull().default(0),
  createdBy: integer("createdBy").references(() => users.id),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type ContentItem = typeof contentItems.$inferSelect;
export type InsertContentItem = typeof contentItems.$inferInsert;

// -- Tax Estimates --
export const taxEstimates = pgTable("taxEstimates", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  year: integer("year").notNull(),
  grossRevenue: decimal("grossRevenue", { precision: 12, scale: 2 }).notNull(),
  deductions: decimal("deductions", { precision: 12, scale: 2 }).notNull().default("0"),
  estimatedTax: decimal("estimatedTax", { precision: 12, scale: 2 }).notNull(),
  effectiveRate: decimal("effectiveRate", { precision: 5, scale: 2 }).notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type TaxEstimate = typeof taxEstimates.$inferSelect;

// -- Growth Projections --
export const growthProjections = pgTable("growthProjections", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  currentMonthlyRevenue: decimal("currentMonthlyRevenue", { precision: 12, scale: 2 }).notNull(),
  targetGrowthPct: decimal("targetGrowthPct", { precision: 5, scale: 2 }).notNull(),
  projectedRevenue12m: decimal("projectedRevenue12m", { precision: 12, scale: 2 }).notNull(),
  referralGoal: integer("referralGoal").notNull().default(0),
  notes: text("notes"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type GrowthProjection = typeof growthProjections.$inferSelect;

// -- FieldOS Job Log --
export const fieldJobLog = pgTable("fieldJobLog", {
  id: integer("id").primaryKey(),
  partnerId: integer("partnerId").notNull().references(() => partners.id),
  jobTitle: varchar("jobTitle", { length: 255 }).notNull(),
  clientName: varchar("clientName", { length: 255 }),
  address: varchar("address", { length: 500 }),
  serviceCategory: varchar("serviceCategory", { length: 100 }),
  scheduledAt: timestamp("scheduledAt"),
  completedAt: timestamp("completedAt"),
  jobValue: decimal("jobValue", { precision: 10, scale: 2 }),
  commissionAmount: decimal("commissionAmount", { precision: 10, scale: 2 }),
  status: text("status").notNull().default("scheduled"),
  notes: text("notes"),
  source: text("source").notNull().default("manual"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type FieldJobLogEntry = typeof fieldJobLog.$inferSelect;
export type InsertFieldJobLogEntry = typeof fieldJobLog.$inferInsert;

// -- Seasonal Prep Guide Items (admin-managed) --
export const seasonalPrepItems = pgTable("seasonalPrepItems", {
  id: integer("id").primaryKey(),
  season: text("season").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  priority: text("priority").notNull().default("medium"),
  estimatedCost: varchar("estimatedCost", { length: 100 }),
  diyDifficulty: text("diyDifficulty").notNull().default("moderate"),
  sortOrder: integer("sortOrder").notNull().default(0),
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type SeasonalPrepItem = typeof seasonalPrepItems.$inferSelect;

// -- Industry Rates Data (for TrueCostGuide) --
export const industryRatesData = pgTable("industryRatesData", {
  id: integer("id").primaryKey(),
  serviceCategory: varchar("serviceCategory", { length: 100 }).notNull(),
  jobType: varchar("jobType", { length: 255 }).notNull(),
  region: varchar("region", { length: 100 }).notNull().default("national"),
  lowEstimate: decimal("lowEstimate", { precision: 10, scale: 2 }).notNull(),
  highEstimate: decimal("highEstimate", { precision: 10, scale: 2 }).notNull(),
  avgEstimate: decimal("avgEstimate", { precision: 10, scale: 2 }).notNull(),
  unit: varchar("unit", { length: 50 }).notNull().default("per job"),
  lastUpdated: timestamp("lastUpdated").notNull().defaultNow(),
});

// ─── Project Bids (GC/Assessor Commission Flow) ───────────────────────────────
// A GC visits a property, scopes the project, submits it to the platform.
// Each line item becomes an opportunity; the GC earns commission on each close.
export const projectBids = pgTable("projectBids", {
  id: integer("id").primaryKey(),
  jobId: integer("jobId").notNull().references(() => jobs.id),
  submittingPartnerId: integer("submittingPartnerId").notNull().references(() => partners.id),
  propertyAddress: varchar("propertyAddress", { length: 500 }).notNull(),
  propertyZip: varchar("propertyZip", { length: 20 }),
  propertyCity: varchar("propertyCity", { length: 100 }),
  propertyState: varchar("propertyState", { length: 50 }),
  projectTitle: varchar("projectTitle", { length: 200 }).notNull(),
  projectDescription: text("projectDescription").notNull(),
  homeownerName: varchar("homeownerName", { length: 255 }),
  homeownerEmail: varchar("homeownerEmail", { length: 320 }),
  homeownerPhone: varchar("homeownerPhone", { length: 30 }),
  // JSON array of {tradeType, description, estimatedCost, notes}
  lineItems: jsonb("lineItems").$type<Array<{
    tradeType: string;
    description: string;
    estimatedCost: number;
    notes?: string;
  }>>().notNull(),
  photoUrls: jsonb("photoUrls").$type<string[]>().default([]),
  totalEstimatedValue: decimal("totalEstimatedValue", { precision: 12, scale: 2 }).notNull(),
  targetStartDate: varchar("targetStartDate", { length: 50 }),
  confidence: decimal("confidence", { precision: 4, scale: 3 }).default("0.850"),
  status: text("status").default("pending_review").notNull(),
  approvedAt: timestamp("approvedAt"),
  approvedBy: integer("approvedBy"),
  rejectedAt: timestamp("rejectedAt"),
  rejectedBy: integer("rejectedBy"),
  rejectionReason: varchar("rejectionReason", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type ProjectBid = typeof projectBids.$inferSelect;
export type InsertProjectBid = typeof projectBids.$inferInsert;

// ─── User Passwords (for direct email/password auth — replaces Manus OAuth) ───
// Separate table to avoid storing password hashes in the main users table.
// Hash format: pbkdf2 — "salt:hash" (see server/_core/oauth.ts)
export const userPasswords = pgTable("userPasswords", {
  id: integer("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique().references(() => users.openId),
  passwordHash: varchar("passwordHash", { length: 256 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type IndustryRateData = typeof industryRatesData.$inferSelect;

// ─── Admin Audit Log ───────────────────────────────────────────────────────────
// Records every consequential admin action for compliance and dispute resolution.
export const adminAuditLog = pgTable("adminAuditLog", {
  id: integer("id").primaryKey(),
  adminUserId: integer("adminUserId").notNull().references(() => users.id),
  action: varchar("action", { length: 100 }).notNull(), // e.g. "approve_partner", "reject_partner", "mark_paid", "suspend_partner"
  targetType: varchar("targetType", { length: 50 }), // e.g. "partner", "commission", "payout_request"
  targetId: integer("targetId"), // the ID of the affected record
  detail: text("detail"), // JSON blob with before/after or extra context
  ipAddress: varchar("ipAddress", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type AdminAuditLogEntry = typeof adminAuditLog.$inferSelect;
export type InsertAdminAuditLogEntry = typeof adminAuditLog.$inferInsert;

// ─── Network Income System ────────────────────────────────────────────────────
// L1=Charter Partner, L2=Founding Partner, L3=Growth Pro, L4=Standard Pro

export const proNetworkProfile = pgTable("pro_network_profile", {
  id: integer("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull().unique(),
  networkLevel: integer("network_level").notNull().default(4), // 1-4
  referredByUserId: varchar("referred_by_user_id", { length: 255 }),
  referralCode: varchar("referral_code", { length: 10 }).notNull().unique(), // 6-char alphanum
  subscriptionActive: boolean("subscription_active").notNull().default(false),
  lastJobCompletedAt: timestamp("last_job_completed_at"),
  jobsCompletedThisMonth: integer("jobs_completed_this_month").notNull().default(0),
  totalNetworkIncomeEarned: decimal("total_network_income_earned", { precision: 12, scale: 2 }).notNull().default("0.00"),
  pendingPayoutAmount: decimal("pending_payout_amount", { precision: 12, scale: 2 }).notNull().default("0.00"),
  starterKitShipped: boolean("starter_kit_shipped").notNull().default(false),
  starterKitShippedAt: timestamp("starter_kit_shipped_at"),
  businessMailingAddress: text("business_mailing_address"),
  agreementSignedAt: timestamp("agreement_signed_at"),
  agreementVersion: varchar("agreement_version", { length: 20 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
export type ProNetworkProfile = typeof proNetworkProfile.$inferSelect;

// Denormalized upline chain for fast commission calculation
export const proUplineChain = pgTable("pro_upline_chain", {
  id: integer("id").primaryKey(),
  proUserId: varchar("pro_user_id", { length: 255 }).notNull(),
  uplineUserId: varchar("upline_user_id", { length: 255 }).notNull(),
  levelsAbove: integer("levels_above").notNull(), // 1=direct referrer, 2=referrer's referrer, etc.
  uplineNetworkLevel: integer("upline_network_level").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  proIdx: index("pro_upline_pro_idx").on(table.proUserId),
  uplineIdx: index("pro_upline_upline_idx").on(table.uplineUserId),
}));
export type ProUplineChain = typeof proUplineChain.$inferSelect;

// Every job completion that generates commissions
export const jobCommissionEvent = pgTable("job_commission_event", {
  id: integer("id").primaryKey(),
  proUserId: varchar("pro_user_id", { length: 255 }).notNull(),
  jobId: varchar("job_id", { length: 255 }).notNull(),
  jobValue: decimal("job_value", { precision: 10, scale: 2 }).notNull(),
  jobCompletedAt: timestamp("job_completed_at").notNull(),
  homeownerConfirmed: boolean("homeowner_confirmed").notNull().default(false),
  homeownerConfirmedAt: timestamp("homeowner_confirmed_at"),
  platformFeeGross: decimal("platform_fee_gross", { precision: 10, scale: 2 }).notNull(),
  platformFeeNet: decimal("platform_fee_net", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"), // pending|confirmed|paid|disputed
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  proIdx: index("commission_event_pro_idx").on(table.proUserId),
  statusIdx: index("commission_event_status_idx").on(table.status),
}));
export type JobCommissionEvent = typeof jobCommissionEvent.$inferSelect;

// Individual payout line items — one row per upline pro per job
export const commissionPayout = pgTable("commission_payout", {
  id: integer("id").primaryKey(),
  jobCommissionEventId: integer("job_commission_event_id").notNull(),
  recipientUserId: varchar("recipient_user_id", { length: 255 }).notNull(),
  sourceProUserId: varchar("source_pro_user_id", { length: 255 }).notNull(),
  payoutType: varchar("payout_type", { length: 30 }).notNull(), // own_job|network_l1|network_l2|network_l3|photo_origination
  rateApplied: decimal("rate_applied", { precision: 5, scale: 4 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"), // pending|approved|paid|suspended
  payoutMonth: varchar("payout_month", { length: 7 }).notNull(), // "2025-03"
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  recipientIdx: index("payout_recipient_idx").on(table.recipientUserId),
  monthIdx: index("payout_month_idx").on(table.payoutMonth),
  statusIdx: index("payout_status_idx").on(table.status),
}));
export type CommissionPayout = typeof commissionPayout.$inferSelect;

// Photo origination — $0.25 for first pro to document each unique address
export const homeDocumentation = pgTable("home_documentation", {
  id: integer("id").primaryKey(),
  proUserId: varchar("pro_user_id", { length: 255 }).notNull(),
  addressHash: varchar("address_hash", { length: 64 }).notNull(), // SHA-256 of normalized address
  fullAddress: text("full_address").notNull(),
  isFirstDocumentation: boolean("is_first_documentation").notNull().default(true),
  originationCreditEarned: boolean("origination_credit_earned").notNull().default(false),
  originationCreditAmount: decimal("origination_credit_amount", { precision: 5, scale: 2 }).notNull().default("0.00"),
  documentedAt: timestamp("documented_at").notNull().defaultNow(),
}, (table) => ({
  addressIdx: uniqueIndex("home_doc_address_idx").on(table.addressHash),
  proIdx: index("home_doc_pro_idx").on(table.proUserId),
}));
