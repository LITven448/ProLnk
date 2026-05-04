import {
  int,
  bigint,
  text,
  mysqlTable,
  varchar,
  boolean,
  json,
  timestamp,
  decimal,
  numeric,
  date,
  index,
  uniqueIndex,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: varchar("role", { length: 255 }).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Partner profiles (approved businesses in the network)
export const partners = mysqlTable("partners", {
  id: int("id").primaryKey(),
  userId: int("userId").references(() => users.id),
  // Application fields
  businessName: varchar("businessName", { length: 255 }).notNull(),
  businessType: varchar("businessType", { length: 100 }).notNull(),
  serviceArea: varchar("serviceArea", { length: 255 }).notNull(),
  serviceAreaLat: decimal("serviceAreaLat", { precision: 10, scale: 6 }),
  serviceAreaLng: decimal("serviceAreaLng", { precision: 10, scale: 6 }),
  serviceRadiusMiles: int("serviceRadiusMiles").default(15),
  // Tier-gated zip code coverage (JSON array of zip code strings)
  // scout=5 zips, pro=15 zips, crew=30 zips, company=60 zips, enterprise=unlimited(999)
  serviceZipCodes: json("serviceZipCodes").$type<string[]>().default([]),
  maxZipCodes: int("maxZipCodes").default(5).notNull(),
  contactName: varchar("contactName", { length: 255 }).notNull(),
  contactEmail: varchar("contactEmail", { length: 320 }).notNull(),
  contactPhone: varchar("contactPhone", { length: 30 }),
  website: varchar("website", { length: 500 }),
  description: text("description"),
  // Status & tier
  status: varchar("status", { length: 255 }).default("pending").notNull(),
  // 5-tier subscription model: scout (free), pro, crew, company, enterprise
  tier: varchar("tier", { length: 255 }).default("scout").notNull(),
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
  weeklyLeadCap: int("weeklyLeadCap").default(5).notNull(),
  weeklyLeadsReceived: int("weeklyLeadsReceived").default(0).notNull(),
  weeklyLeadsResetAt: timestamp("weeklyLeadsResetAt"),
  // Stats
  referralCount: int("referralCount").default(0).notNull(),
  leadsCount: int("leadsCount").default(0).notNull(),
  jobsLogged: int("jobsLogged").default(0).notNull(),
  opportunitiesGenerated: int("opportunitiesGenerated").default(0).notNull(),
  totalCommissionEarned: decimal("totalCommissionEarned", { precision: 10, scale: 2 }).default("0.00").notNull(),
  totalCommissionPaid: decimal("totalCommissionPaid", { precision: 10, scale: 2 }).default("0.00").notNull(),
  // Stripe Connect (payout infrastructure)
  stripeConnectAccountId: varchar("stripeConnectAccountId", { length: 255 }),
  stripeConnectStatus: varchar("stripeConnectStatus", { length: 255 }).default("not_connected").notNull(),
  bankAccountLast4: varchar("bankAccountLast4", { length: 4 }),
  payoutReadyAt: timestamp("payoutReadyAt"),
  // Trial & subscription
  trialStatus: varchar("trialStatus", { length: 255 }).default("trial").notNull(),
  trialStartedAt: timestamp("trialStartedAt"),
  trialEndsAt: timestamp("trialEndsAt"),
  subscriptionPlan: text("subscriptionPlan"),
  // Partner Priority Score (PPS) — 0 to 105, recalculated nightly by PPS engine
  // Signals: tier(30) + closeRate(20) + acceptanceRate(15) + photos(15) + reviews(10) + networkReferrals(5) + responseSpeed(5) + foundingBonus(+5)
  priorityScore: int("priorityScore").default(0).notNull(),
  // Average hours to accept a lead (rolling average, updated on each acceptance)
  avgLeadResponseHours: decimal("avgLeadResponseHours", { precision: 6, scale: 2 }).default("24.00").notNull(),
  // Review stats
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0.00").notNull(),
  reviewCount: int("reviewCount").default(0).notNull(),
  // Number of partners this partner has recruited to the network
  partnersReferred: int("partnersReferred").default(0).notNull(),
  // FK to the partner who recruited this partner (null = organic/direct)
  referredByPartnerId: int("referredByPartnerId"),
  // Notification preferences (JSON object with boolean flags per event type)
  notificationPrefs: json("notificationPrefs").$type<{
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
  strikeCount: int("strikeCount").default(0).notNull(),
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
  referralStreakMonths: int("referralStreakMonths").default(0).notNull(),
  streakUpdatedAt: timestamp("streakUpdatedAt"),
  achievementBadges: json("achievementBadges").$type<string[]>().default([]),
  achievementsUpdatedAt: timestamp("achievementsUpdatedAt"),
  // Timestamps
  appliedAt: timestamp("appliedAt").defaultNow().notNull(),
  approvedAt: timestamp("approvedAt"),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Partner = typeof partners.$inferSelect;
export type InsertPartner = typeof partners.$inferInsert;

// Jobs logged by technicians in the field
export const jobs = mysqlTable("jobs", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  loggedByUserId: int("loggedByUserId").references(() => users.id),
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
  photoUrls: json("photoUrls").$type<string[]>().default([]),
  // AI analysis status
  aiAnalysisStatus: varchar("aiAnalysisStatus", { length: 255 }).default("pending").notNull(),
  aiAnalysisResult: json("aiAnalysisResult").$type<AiAnalysisResult | null>().default(null),
  // Job status
  status: varchar("status", { length: 255 }).default("logged").notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Job = typeof jobs.$inferSelect;
export type InsertJob = typeof jobs.$inferInsert;

// AI-detected upsell opportunities from job photos
export const opportunities = mysqlTable("opportunities", {
  id: int("id").primaryKey(),
  jobId: int("jobId").notNull().references(() => jobs.id),
  // Who generated this opportunity (the partner whose tech took the photo)
  sourcePartnerId: int("sourcePartnerId").notNull().references(() => partners.id),
  // Who received this opportunity (the partner matched to handle it)
  receivingPartnerId: int("receivingPartnerId").references(() => partners.id),
  // Opportunity details from AI
  opportunityType: varchar("opportunityType", { length: 100 }).notNull(),
  opportunityCategory: varchar("opportunityCategory", { length: 100 }).notNull(),
  description: text("description").notNull(),
  aiConfidence: decimal("aiConfidence", { precision: 4, scale: 3 }),
  photoUrl: varchar("photoUrl", { length: 1000 }),
  // Admin review workflow — all AI-detected opportunities go through admin before being dispatched
  adminReviewStatus: varchar("adminReviewStatus", { length: 255 }).default("pending_review").notNull(),
  adminReviewedAt: timestamp("adminReviewedAt"),
  adminReviewedBy: int("adminReviewedBy"),
  // Status
  status: varchar("status", { length: 255 }).default("pending").notNull(),
  // 24-hour lead expiry — set when lead is dispatched to a partner
  leadExpiresAt: timestamp("leadExpiresAt"),
  // Routing queue — JSON array of partner IDs to try in order if first partner declines/times out
  routingQueue: text("routingQueue"),
  routingPosition: int("routingPosition").default(0).notNull(),
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
export const commissions = mysqlTable("commissions", {
  id: int("id").primaryKey(),
  opportunityId: int("opportunityId").references(() => opportunities.id),
  // Who owes / who receives
  payingPartnerId: int("payingPartnerId").references(() => partners.id),
  receivingPartnerId: int("receivingPartnerId").references(() => partners.id), // null = ProLnk keeps it
  commissionType: text("commissionType").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  jobValue: decimal("jobValue", { precision: 10, scale: 2 }),
  feeRate: decimal("feeRate", { precision: 5, scale: 4 }),
  description: varchar("description", { length: 500 }),
  paid: boolean("paid").default(false).notNull(),
  paidAt: timestamp("paidAt"),
  // Dispute tracking (Wave 17)
  disputeStatus: varchar("disputeStatus", { length: 255 }).default("none").notNull(),
  disputeReason: varchar("disputeReason", { length: 1000 }),
  disputeOpenedAt: timestamp("disputeOpenedAt"),
  disputeResolvedAt: timestamp("disputeResolvedAt"),
  disputeResolvedBy: int("disputeResolvedBy"),
  disputeResolutionNote: varchar("disputeResolutionNote", { length: 1000 }),
  // Dispute enhancements (DIS-02, DIS-03, DIS-06)
  disputeEvidenceUrls: text("disputeEvidenceUrls"), // JSON array of S3 URLs
  disputeAiAssessment: varchar("disputeAiAssessment", { length: 200 }), // "likely_valid" | "likely_invalid" | "unclear"
  disputeAiConfidence: decimal("disputeAiConfidence", { precision: 4, scale: 2 }), // 0.00-1.00
  disputeAiReasoning: varchar("disputeAiReasoning", { length: 500 }),
  disputeAppealedAt: timestamp("disputeAppealedAt"),
  disputeAppealReason: varchar("disputeAppealReason", { length: 1000 }),
  disputeAppealStatus: varchar("disputeAppealStatus", { length: 255 }).default("none").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Commission = typeof commissions.$inferSelect;
export type InsertCommission = typeof commissions.$inferInsert;

// Industry-level commission rate defaults (Wave 3)
export const industryRates = mysqlTable("industryRates", {
  id: int("id").primaryKey(),
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
export const broadcasts = mysqlTable("broadcasts", {
  id: int("id").primaryKey(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  sentBy: int("sentBy").references(() => users.id),
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
export const partnerIntegrations = mysqlTable("partnerIntegrations", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id),
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
export const photoIntakeQueue = mysqlTable("photoIntakeQueue", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  integrationId: int("integrationId").references(() => partnerIntegrations.id),
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
  jobId: int("jobId").references(() => jobs.id),
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
export const propertyProfiles = mysqlTable("propertyProfiles", {
  id: int("id").primaryKey(),
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
  totalJobsLogged: int("totalJobsLogged").default(0).notNull(),
  totalOpportunitiesDetected: int("totalOpportunitiesDetected").default(0).notNull(),
  totalOffersAccepted: int("totalOffersAccepted").default(0).notNull(),
  totalOffersDeclined: int("totalOffersDeclined").default(0).notNull(),
  totalRevenueGenerated: decimal("totalRevenueGenerated", { precision: 12, scale: 2 }).default("0.00"),
  // Trades that have serviced this property
  tradesServiced: json("tradesServiced").$type<string[]>().default([]),
  // AI detection history (JSON array of detection types seen at this property)
  detectionHistory: json("detectionHistory").$type<{type: string; detectedAt: string; converted: boolean}[]>().default([]),
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
export const partnerPerformanceScores = mysqlTable("partnerPerformanceScores", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id).unique(),
  // Lead performance
  totalLeadsReceived: int("totalLeadsReceived").default(0).notNull(),
  totalLeadsAccepted: int("totalLeadsAccepted").default(0).notNull(),
  totalLeadsDeclined: int("totalLeadsDeclined").default(0).notNull(),
  totalLeadsClosed: int("totalLeadsClosed").default(0).notNull(),
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
  totalReferralsSent: int("totalReferralsSent").default(0).notNull(),
  totalReferralsConverted: int("totalReferralsConverted").default(0).notNull(),
  referralConversionRate: decimal("referralConversionRate", { precision: 5, scale: 4 }).default("0"),
  // Health score (0-100, computed from all above metrics)
  healthScore: int("healthScore").default(50),
  churnRisk: varchar("churnRisk", { length: 255 }).default("low"),
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
export const aiTrainingDataset = mysqlTable("aiTrainingDataset", {
  id: int("id").primaryKey(),
  jobId: int("jobId").references(() => jobs.id),
  opportunityId: int("opportunityId").references(() => opportunities.id),
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
  validationOutcome: varchar("validationOutcome", { length: 255 }).default("pending"),
  // Property context
  propertyType: varchar("propertyType", { length: 50 }), // "single_family", "townhome", "condo"
  propertyZip: varchar("propertyZip", { length: 20 }),
  propertyState: varchar("propertyState", { length: 50 }),
  // Temporal context (seasonality matters for detection accuracy)
  capturedMonth: int("capturedMonth"), // 1-12
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
export const funnelEvents = mysqlTable("funnelEvents", {
  id: int("id").primaryKey(),
  opportunityId: int("opportunityId").notNull().references(() => opportunities.id),
  propertyProfileId: int("propertyProfileId").references(() => propertyProfiles.id),
  partnerId: int("partnerId").references(() => partners.id),
  // Funnel stage
  eventType: text("eventType").notNull(),
  // Delivery channel
  channel: text("channel"),
  // Offer details at time of event
  offerAmount: decimal("offerAmount", { precision: 10, scale: 2 }),
  discountPct: decimal("discountPct", { precision: 5, scale: 2 }),
  // Time from previous event (seconds) — measures funnel velocity
  secondsFromPreviousEvent: int("secondsFromPreviousEvent"),
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
export const referralGraph = mysqlTable("referralGraph", {
  id: int("id").primaryKey(),
  // The relationship
  sourcePartnerId: int("sourcePartnerId").notNull().references(() => partners.id),
  receivingPartnerId: int("receivingPartnerId").notNull().references(() => partners.id),
  // Trade categories of each partner
  sourceTrade: varchar("sourceTrade", { length: 100 }),
  receivingTrade: varchar("receivingTrade", { length: 100 }),
  // Geographic context
  city: varchar("city", { length: 100 }),
  zip: varchar("zip", { length: 20 }),
  // Relationship performance
  totalReferrals: int("totalReferrals").default(0).notNull(),
  totalConverted: int("totalConverted").default(0).notNull(),
  totalJobValue: decimal("totalJobValue", { precision: 12, scale: 2 }).default("0"),
  totalCommissionPaid: decimal("totalCommissionPaid", { precision: 12, scale: 2 }).default("0"),
  conversionRate: decimal("conversionRate", { precision: 5, scale: 4 }).default("0"),
  avgDaysToClose: decimal("avgDaysToClose", { precision: 6, scale: 2 }),
  // Relationship strength (0-100)
  relationshipStrength: int("relationshipStrength").default(0),
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
export const geographicDensity = mysqlTable("geographicDensity", {
  id: int("id").primaryKey(),
  zip: varchar("zip", { length: 20 }).notNull(),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 50 }),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  // Snapshot date (weekly)
  snapshotDate: timestamp("snapshotDate").notNull(),
  // Coverage metrics
  totalActivePartners: int("totalActivePartners").default(0),
  totalTradesCovered: int("totalTradesCovered").default(0),
  tradeBreakdown: json("tradeBreakdown").$type<Record<string, number>>().default({}),
  // Demand metrics
  totalJobsLogged: int("totalJobsLogged").default(0),
  totalOpportunitiesDetected: int("totalOpportunitiesDetected").default(0),
  totalOffersAccepted: int("totalOffersAccepted").default(0),
  // Coverage gap score (0-100, higher = more unmet demand)
  coverageGapScore: int("coverageGapScore").default(0),
  // Unmet demand by trade (trades with detected opportunities but no receiving partner)
  unmetDemandTrades: json("unmetDemandTrades").$type<string[]>().default([]),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type GeographicDensitySnapshot = typeof geographicDensity.$inferSelect;
export type InsertGeographicDensitySnapshot = typeof geographicDensity.$inferInsert;

// Asset 7: Homeowner Acceptance Signals
// Price sensitivity and acceptance pattern data per offer.
// After 10K records this is a proprietary pricing intelligence dataset.
export const acceptanceSignals = mysqlTable("acceptanceSignals", {
  id: int("id").primaryKey(),
  opportunityId: int("opportunityId").notNull().references(() => opportunities.id),
  propertyProfileId: int("propertyProfileId").references(() => propertyProfiles.id),
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
  deliveryHourOfDay: int("deliveryHourOfDay"), // 0-23
  deliveryDayOfWeek: int("deliveryDayOfWeek"), // 0=Sunday, 6=Saturday
  deliveryMonth: int("deliveryMonth"), // 1-12
  deliverySeason: text("deliverySeason"),
  // Property context
  propertyZip: varchar("propertyZip", { length: 20 }),
  propertyCity: varchar("propertyCity", { length: 100 }),
  propertyState: varchar("propertyState", { length: 50 }),
  // Whether this was the homeowner's first offer from ProLnk
  isFirstOffer: boolean("isFirstOffer").default(true),
  // Number of previous offers this homeowner has received
  priorOfferCount: int("priorOfferCount").default(0),
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
export const customerDeals = mysqlTable("customerDeals", {
  id: int("id").primaryKey(),
  // Unique token for the public URL (e.g., /deal/abc123xyz)
  token: varchar("token", { length: 64 }).notNull().unique(),
  // Linked opportunity
  opportunityId: int("opportunityId").notNull().references(() => opportunities.id),
  // Referring partner (whose technician took the photo)
  referringPartnerId: int("referringPartnerId").notNull().references(() => partners.id),
  // Receiving partner (who will do the work)
  receivingPartnerId: int("receivingPartnerId").references(() => partners.id),
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
  photoUrls: json('photoUrls').$type<string[]>().default([]),
  signatureData: text('signatureData'),
  signedAt: int('signedAt'),
  signerName: varchar('signerName', { length: 255 }),
  aiConfidence: int("aiConfidence"), // 0-100
  estimatedValueLow: decimal("estimatedValueLow", { precision: 10, scale: 2 }),
  estimatedValueHigh: decimal("estimatedValueHigh", { precision: 10, scale: 2 }),
  // Personalized homeowner message snippet from AI
  homeownerMessageSnippet: text("homeownerMessageSnippet"),
  // Deal status lifecycle
  status: varchar("status", { length: 255 }).default("draft").notNull(),
  // Scheduling
  scheduledAt: timestamp("scheduledAt"),         // When estimate is booked for
  scheduleConfirmedAt: timestamp("scheduleConfirmedAt"), // When homeowner confirmed
  calBookingId: varchar("calBookingId", { length: 255 }), // Cal.com booking reference
  // Expiry (48 hours from sent)
  expiresAt: timestamp("expiresAt"),
  // Engagement tracking
  viewCount: int("viewCount").default(0).notNull(),
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
  homeownerConfirmRating: int("homeownerConfirmRating"),     // 1-5 star rating at confirmation
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
export const partnerReviews = mysqlTable("partnerReviews", {
  id: int("id").primaryKey(),
  dealId: int("dealId").notNull().references(() => customerDeals.id),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  // Homeowner info (from deal)
  homeownerName: varchar("homeownerName", { length: 255 }),
  homeownerEmail: varchar("homeownerEmail", { length: 320 }),
  // Rating (1–5 stars)
  rating: int("rating").notNull(), // 1-5
  // Review text
  reviewText: text("reviewText"),
  // Sub-ratings
  ratingPunctuality: int("ratingPunctuality"),   // 1-5
  ratingQuality: int("ratingQuality"),           // 1-5
  ratingCommunication: int("ratingCommunication"), // 1-5
  ratingValue: int("ratingValue"),               // 1-5
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
export const homeownerReviews = mysqlTable("homeownerReviews", {
  id: int("id").primaryKey(),
  dealId: int("dealId").notNull().references(() => customerDeals.id),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  // Homeowner being reviewed
  homeownerEmail: varchar("homeownerEmail", { length: 320 }),
  homeownerName: varchar("homeownerName", { length: 255 }),
  // Rating (1–5 stars)
  rating: int("rating").notNull(), // 1-5
  reviewText: text("reviewText"),
  // Sub-ratings
  ratingReliability: int("ratingReliability"),    // 1-5 (showed up, accessible)
  ratingCommunication: int("ratingCommunication"), // 1-5
  ratingPayment: int("ratingPayment"),             // 1-5 (paid on time)
  // Whether this review is publicly visible
  isPublic: boolean("isPublic").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type HomeownerReview = typeof homeownerReviews.$inferSelect;
export type InsertHomeownerReview = typeof homeownerReviews.$inferInsert;

// Homeowner Profiles (TrustyPro — one per user account)
export const homeownerProfiles = mysqlTable("homeownerProfiles", {
  id: int("id").primaryKey(),
  userId: int("userId").notNull().references(() => users.id).unique(),
  displayName: varchar("displayName", { length: 255 }),
  phone: varchar("phone", { length: 30 }),
  bio: text("bio"),
  photoUrl: text("photoUrl"),
  setupComplete: boolean("setupComplete").default(false).notNull(),
  // Preferences
  contactPreference: varchar("contactPreference", { length: 255 }).default("email"),
  openToRecommendations: boolean("openToRecommendations").default(true).notNull(),
  // Consent flags
  consentTerms: boolean("consentTerms").default(false).notNull(),
  consentPhotos: boolean("consentPhotos").default(false).notNull(),
  consentPartnerContact: boolean("consentPartnerContact").default(false).notNull(),
  consentAiData: boolean("consentAiData").default(false).notNull(),
  creditBalance: decimal("creditBalance", { precision: 10, scale: 2 }).default("0.00").notNull(),
  referralCount: int("referralCount").default(0).notNull(),
  referralCode: varchar("referralCode", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type HomeownerProfile = typeof homeownerProfiles.$inferSelect;
export type InsertHomeownerProfile = typeof homeownerProfiles.$inferInsert;

// Properties — multiple properties per homeowner account
export const properties = mysqlTable("properties", {
  id: int("id").primaryKey(),
  ownerId: int("ownerId").notNull().references(() => homeownerProfiles.id),
  // Identity
  nickname: varchar("nickname", { length: 100 }), // e.g. "Main Home", "Lake House"
  address: varchar("address", { length: 500 }).notNull(),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 50 }),
  zip: varchar("zip", { length: 20 }),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  // Property details
  propertyType: varchar("propertyType", { length: 255 }).default("single_family"),
  yearBuilt: int("yearBuilt"),
  sqft: int("sqft"),
  bedrooms: int("bedrooms"),
  bathrooms: decimal("bathrooms", { precision: 3, scale: 1 }),
  lotSize: text("lotSize"),
  hasPool: boolean("hasPool").default(false).notNull(),
  hasGarage: boolean("hasGarage").default(false).notNull(),
  garageType: varchar("garageType", { length: 255 }).default("none"),
  hasFence: boolean("hasFence").default(false).notNull(),
  fenceType: varchar("fenceType", { length: 255 }).default("none"),
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
  drivewaySurface: varchar("drivewaySurface", { length: 255 }).default("none"),
  garageSpaces: int("garageSpaces").default(0),
  storiesCount: text("storiesCount"),
  // Interior features
  flooringTypes: json("flooringTypes").$type<string[]>().default([]),
  kitchenCountertop: varchar("kitchenCountertop", { length: 255 }).default("unknown"),
  primaryBathType: varchar("primaryBathType", { length: 255 }).default("unknown"),
  fireplaceType: varchar("fireplaceType", { length: 255 }).default("none"),
  fireplaceCount: int("fireplaceCount").default(0),
  ceilingHeight: varchar("ceilingHeight", { length: 255 }).default("standard_8ft"),
  windowType: varchar("windowType", { length: 255 }).default("unknown"),
  applianceBrands: json("applianceBrands").$type<Record<string, string>>().default({}),
  // Outdoor / landscaping
  lawnSize: text("lawnSize"),
  hasGardenBeds: boolean("hasGardenBeds").default(false).notNull(),
  treeCount: varchar("treeCount", { length: 255 }).default("none"),
  // Pet ownership — critical for service matching (pet-safe products, pet waste, pet doors)
  hasPets: boolean("hasPets").default(false).notNull(),
  dogCount: int("dogCount").default(0),
  dogBreedSize: varchar("dogBreedSize", { length: 255 }).default("none"),
  catCount: int("catCount").default(0),
  otherPets: varchar("otherPets", { length: 255 }),
  petServiceNeeds: json("petServiceNeeds").$type<string[]>().default([]),
  // Ownership context
  isPrimary: boolean("isPrimary").default(true).notNull(),
  isRental: boolean("isRental").default(false).notNull(),
  occupancy: varchar("occupancy", { length: 255 }).default("owner_occupied"),
  ownershipYears: text("ownershipYears"),
  // Home systems selected in wizard (e.g. ["hvac", "plumbing", "electrical"])
  homeSystems: json("homeSystems").$type<string[]>().default([]),
  // Age of each system (e.g. { hvac: "6_to_10", plumbing: "over_20" })
  systemAges: json("systemAges").$type<Record<string, string>>().default({}),
  // What matters to this owner when hiring
  hiringPriorities: json("hiringPriorities").$type<string[]>().default([]),
  // Style preferences — used for AI mockup generation and pro matching
  stylePreferences: json("stylePreferences").$type<{
    homeStyle?: string;
    exteriorColor?: string;
    interiorPalette?: string;
    designAesthetic?: string;
    styleNotes?: string;
  }>().default({}),
  // Inspiration photos uploaded by homeowner (S3 URLs)
  inspirationPhotoUrls: json("inspirationPhotoUrls").$type<string[]>().default([]),
  // AI-generated mockup of the property after improvements
  aiMockupUrl: varchar("aiMockupUrl", { length: 1024 }),
  aiMockupStatus: varchar("aiMockupStatus", { length: 255 }).default("pending"),
  aiMockupGeneratedAt: timestamp("aiMockupGeneratedAt"),
  aiMockupSourcePhotoUrl: varchar("aiMockupSourcePhotoUrl", { length: 1024 }),
  // Setup progress
  setupStep: int("setupStep").default(1).notNull(), // 1-7
  setupComplete: boolean("setupComplete").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type Property = typeof properties.$inferSelect;
export type InsertProperty = typeof properties.$inferInsert;

// Property Improvements — what has been done in the last 5 years
export const propertyImprovements = mysqlTable("propertyImprovements", {
  id: int("id").primaryKey(),
  propertyId: int("propertyId").notNull().references(() => properties.id),
  category: varchar("category", { length: 100 }).notNull(), // e.g. "roof", "hvac", "kitchen_cabinets"
  completedYear: int("completedYear"),
  hasWarranty: boolean("hasWarranty").default(false).notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type PropertyImprovement = typeof propertyImprovements.$inferSelect;
export type InsertPropertyImprovement = typeof propertyImprovements.$inferInsert;

// Property Wishes — projects the homeowner wants to do
export const propertyWishes = mysqlTable("propertyWishes", {
  id: int("id").primaryKey(),
  propertyId: int("propertyId").notNull().references(() => properties.id),
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
export const propertyPhotos = mysqlTable("propertyPhotos", {
  id: int("id").primaryKey(),
  propertyId: int("propertyId").notNull().references(() => properties.id),
  uploadedByUserId: int("uploadedByUserId").references(() => users.id),
  // Storage
  s3Key: varchar("s3Key", { length: 500 }).notNull(),
  url: text("url").notNull(),
  thumbnailUrl: text("thumbnailUrl"),
  // Photo context
  roomLabel: varchar("roomLabel", { length: 100 }), // e.g. "exterior_front", "kitchen", "primary_bathroom"
  caption: text("caption"),
  // AI processing
  aiScanned: boolean("aiScanned").default(false).notNull(),
  aiSignals: json("aiSignals").$type<AiOpportunity[]>().default([]),
  aiScannedAt: timestamp("aiScannedAt"),
  // Pet signal — incidental pet appearances trigger pet service referral
  hasPetSignal: boolean("hasPetSignal").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type PropertyPhoto = typeof propertyPhotos.$inferSelect;
export type InsertPropertyPhoto = typeof propertyPhotos.$inferInsert;

// ─── Activity Log ─────────────────────────────────────────────────────────────
export const activityLog = mysqlTable("activityLog", {
  id: int("id").primaryKey(),
  eventType: varchar("eventType", { length: 64 }).notNull(),
  actorId: int("actorId"),
  actorName: varchar("actorName", { length: 128 }),
  actorRole: varchar("actorRole", { length: 255 }).notNull().default("system"),
  entityType: varchar("entityType", { length: 64 }),
  entityId: int("entityId"),
  entityName: varchar("entityName", { length: 255 }),
  description: text("description").notNull(),
  metadata: json("metadata"),
  ipAddress: varchar("ipAddress", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow(),
});
export type ActivityLog = typeof activityLog.$inferSelect;
export type InsertActivityLog = typeof activityLog.$inferInsert;

// ─── FSM Webhook Events ──────────────────────────────────────────────────────
// Inbound webhook events from partner FSM platforms (Housecall Pro, Jobber, etc.)
// When a job is paid in the partner's FSM and the lead source tag matches ProLnk-[PARTNERID],
// the platform auto-closes the commission record.
export const fsmWebhookEvents = mysqlTable("fsmWebhookEvents", {
  id: int("id").primaryKey(),
  // Source platform
  source: text("source").notNull(),
  // Raw event type from the FSM (e.g. "job.completed", "invoice.paid")
  eventType: varchar("eventType", { length: 100 }).notNull(),
  // External job ID from the FSM
  externalJobId: varchar("externalJobId", { length: 255 }),
  // Lead source tag extracted from the FSM payload (e.g. "ProLnk-42")
  leadSourceTag: varchar("leadSourceTag", { length: 100 }),
  // Matched ProLnk partner ID (null if no match found)
  matchedPartnerId: int("matchedPartnerId").references(() => partners.id),
  // Matched opportunity ID (null if no match found)
  matchedOpportunityId: int("matchedOpportunityId").references(() => opportunities.id),
  // Job value from FSM payload
  jobValue: decimal("jobValue", { precision: 10, scale: 2 }),
  // Processing status
  status: varchar("status", { length: 255 }).default("received").notNull(),
  errorMessage: text("errorMessage"),
  // Raw payload (for debugging)
  rawPayload: json("rawPayload"),
  processedAt: timestamp("processedAt"),
  receivedAt: timestamp("receivedAt").defaultNow().notNull(),
});
export type FsmWebhookEvent = typeof fsmWebhookEvents.$inferSelect;
export type InsertFsmWebhookEvent = typeof fsmWebhookEvents.$inferInsert;

// ─── Outbound Webhook Subscriptions (n8n integration) ────────────────────────
// Platform events fire outbound webhooks to n8n or any configured URL.
export const webhookSubscriptions = mysqlTable("webhookSubscriptions", {
  id: int("id").primaryKey(),
  // Human-readable name
  name: varchar("name", { length: 255 }).notNull(),
  // Target URL (n8n webhook URL)
  url: text("url").notNull(),
  // HMAC signing secret for payload verification
  secret: varchar("secret", { length: 255 }),
  // Which events this subscription listens to (JSON array of event names)
  events: json("events").$type<string[]>().default([]),
  isActive: boolean("isActive").default(true).notNull(),
  // Delivery stats
  totalFired: int("totalFired").default(0).notNull(),
  totalSucceeded: int("totalSucceeded").default(0).notNull(),
  totalFailed: int("totalFailed").default(0).notNull(),
  lastFiredAt: timestamp("lastFiredAt"),
  lastStatus: int("lastStatus"), // HTTP status code of last delivery
  createdBy: int("createdBy").references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type WebhookSubscription = typeof webhookSubscriptions.$inferSelect;
export type InsertWebhookSubscription = typeof webhookSubscriptions.$inferInsert;

// ─── Outbound Webhook Delivery Log ───────────────────────────────────────────
export const webhookDeliveryLog = mysqlTable("webhookDeliveryLog", {
  id: int("id").primaryKey(),
  subscriptionId: int("subscriptionId").notNull().references(() => webhookSubscriptions.id),
  eventName: varchar("eventName", { length: 100 }).notNull(),
  payload: json("payload"),
  statusCode: int("statusCode"),
  responseBody: text("responseBody"),
  success: boolean("success").default(false).notNull(),
  durationMs: int("durationMs"),
  firedAt: timestamp("firedAt").defaultNow().notNull(),
});
export type WebhookDeliveryLog = typeof webhookDeliveryLog.$inferSelect;
export type InsertWebhookDeliveryLog = typeof webhookDeliveryLog.$inferInsert;

// ─── Pro Services Agreements ─────────────────────────────────────────────────
// Auto-generated agreements for each partner — pre-filled PDF, e-signed in platform.
export const proAgreements = mysqlTable("proAgreements", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  // Agreement version / template
  templateVersion: varchar("templateVersion", { length: 20 }).default("v1.0").notNull(),
  // Pre-filled terms
  tierAtSigning: text("tierAtSigning").notNull(),
  commissionRateAtSigning: decimal("commissionRateAtSigning", { precision: 5, scale: 4 }).notNull(),
  effectiveDate: timestamp("effectiveDate").notNull(),
  // E-signature
  status: varchar("status", { length: 255 }).default("pending").notNull(),
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
export const partnerNotifications = mysqlTable("partnerNotifications", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  type: varchar("type", { length: 255 }).notNull().default("system"),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  actionUrl: varchar("actionUrl", { length: 512 }),
  isRead: boolean("isRead").notNull().default(false),
  metadata: json("metadata"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type PartnerNotification = typeof partnerNotifications.$inferSelect;
export type InsertPartnerNotification = typeof partnerNotifications.$inferInsert;

// ── Review Requests (Wave 24) ─────────────────────────────────────────────────
export const reviewRequests = mysqlTable("reviewRequests", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  jobId: int("jobId").references(() => jobs.id),
  token: varchar("token", { length: 64 }).notNull().unique(),
  homeownerName: varchar("homeownerName", { length: 255 }),
  homeownerEmail: varchar("homeownerEmail", { length: 255 }),
  homeownerPhone: varchar("homeownerPhone", { length: 50 }),
  serviceAddress: varchar("serviceAddress", { length: 512 }),
  status: varchar("status", { length: 255 }).notNull().default("pending"),
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
export const eventTriggers = mysqlTable("eventTriggers", {
  id: int("id").primaryKey(),
  type: text("type").notNull(),
  sourceData: json("sourceData"),
  title: varchar("title", { length: 512 }).notNull(),
  description: text("description"),
  region: varchar("region", { length: 255 }),
  zipCodes: json("zipCodes").$type<string[]>(),
  latitude: decimal("latitude", { precision: 10, scale: 6 }),
  longitude: decimal("longitude", { precision: 10, scale: 6 }),
  radiusMiles: int("radiusMiles"),
  severity: int("severity").default(3).notNull(),
  status: varchar("status", { length: 255 }).default("active").notNull(),
  propertiesMatched: int("propertiesMatched").default(0).notNull(),
  leadsGenerated: int("leadsGenerated").default(0).notNull(),
  estimatedRevenue: decimal("estimatedRevenue", { precision: 10, scale: 2 }).default("0.00").notNull(),
  eventDate: timestamp("eventDate"),
  firedAt: timestamp("firedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type EventTrigger = typeof eventTriggers.$inferSelect;
export type InsertEventTrigger = typeof eventTriggers.$inferInsert;

// ── Property Assets — Assets identified by AI in property photos (Claim 30) ──
export const propertyAssets = mysqlTable("propertyAssets", {
  id: int("id").primaryKey(),
  propertyId: int("propertyId").references(() => properties.id),
  photoId: int("photoId").references(() => propertyPhotos.id),
  jobId: int("jobId").references(() => jobs.id),
  assetType: text("assetType").notNull(),
  condition: varchar("condition", { length: 255 }).default("good").notNull(),
  confidenceScore: decimal("confidenceScore", { precision: 5, scale: 4 }),
  estimatedAge: int("estimatedAge"),
  estimatedLifespan: int("estimatedLifespan"),
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
export const eventDrivenLeads = mysqlTable("eventDrivenLeads", {
  id: int("id").primaryKey(),
  triggerId: int("triggerId").references(() => eventTriggers.id),
  propertyId: int("propertyId").references(() => properties.id),
  partnerId: int("partnerId").references(() => partners.id),
  leadType: text("leadType").notNull(),
  context: json("context"),
  status: varchar("status", { length: 255 }).default("generated").notNull(),
  estimatedJobValue: decimal("estimatedJobValue", { precision: 10, scale: 2 }),
  actualJobValue: decimal("actualJobValue", { precision: 10, scale: 2 }),
  commissionEarned: decimal("commissionEarned", { precision: 10, scale: 2 }),
  priority: int("priority").default(3).notNull(),
  dispatchedAt: timestamp("dispatchedAt"),
  acceptedAt: timestamp("acceptedAt"),
  completedAt: timestamp("completedAt"),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type EventDrivenLead = typeof eventDrivenLeads.$inferSelect;
export type InsertEventDrivenLead = typeof eventDrivenLeads.$inferInsert;

// ── Recall Alerts — Active manufacturer recalls being monitored (Claim 32) ───
export const recallAlerts = mysqlTable("recallAlerts", {
  id: int("id").primaryKey(),
  recallNumber: varchar("recallNumber", { length: 100 }).notNull(),
  productName: varchar("productName", { length: 512 }).notNull(),
  manufacturer: varchar("manufacturer", { length: 255 }).notNull(),
  description: text("description"),
  hazardDescription: text("hazardDescription"),
  assetTypes: json("assetTypes").$type<string[]>(),
  manufacturerPatterns: json("manufacturerPatterns").$type<string[]>(),
  affectedProperties: int("affectedProperties").default(0).notNull(),
  leadsGenerated: int("leadsGenerated").default(0).notNull(),
  status: varchar("status", { length: 255 }).default("active").notNull(),
  publishedDate: timestamp("publishedDate"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type RecallAlert = typeof recallAlerts.$inferSelect;
export type InsertRecallAlert = typeof recallAlerts.$inferInsert;

// ── AI Pipeline Runs — Tracks each photo through the 5-stage waterfall (Claim 19) ─
export const aiPipelineRuns = mysqlTable("aiPipelineRuns", {
  id: int("id").primaryKey(),
  photoId: int("photoId").references(() => propertyPhotos.id),
  jobId: int("jobId").references(() => jobs.id),
  partnerId: int("partnerId").references(() => partners.id),
  stage: varchar("stage", { length: 255 }).default("preprocessing").notNull(),
  preprocessResult: json("preprocessResult"),
  relevanceResult: json("relevanceResult"),
  featureResult: json("featureResult"),
  classificationResult: json("classificationResult"),
  confidenceResult: json("confidenceResult"),
  conditionsDetected: int("conditionsDetected").default(0).notNull(),
  leadsGenerated: int("leadsGenerated").default(0).notNull(),
  highestConfidence: decimal("highestConfidence", { precision: 5, scale: 4 }),
  totalProcessingMs: int("totalProcessingMs"),
  status: varchar("status", { length: 255 }).default("running").notNull(),
  errorMessage: text("errorMessage"),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});
export type AiPipelineRun = typeof aiPipelineRuns.$inferSelect;
export type InsertAiPipelineRun = typeof aiPipelineRuns.$inferInsert;

// ─── NPS Survey ───────────────────────────────────────────────────────────────
export const npsSurveys = mysqlTable("npsSurveys", {
  id: int("id").primaryKey(),
  token: varchar("token", { length: 64 }).notNull().unique(),
  jobId: int("jobId").notNull(),
  partnerId: int("partnerId").notNull(),
  homeownerEmail: varchar("homeownerEmail", { length: 255 }),
  homeownerName: varchar("homeownerName", { length: 255 }),
  score: int("score"),
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
export const complianceEvents = mysqlTable("complianceEvents", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  eventType: text("eventType").notNull(),
  reason: varchar("reason", { length: 500 }).notNull(),
  adminUserId: int("adminUserId").references(() => users.id),
  adminName: varchar("adminName", { length: 255 }),
  resolutionNote: text("resolutionNote"),
  resolvedAt: timestamp("resolvedAt"),
  metadata: json("metadata"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type ComplianceEvent = typeof complianceEvents.$inferSelect;
export type InsertComplianceEvent = typeof complianceEvents.$inferInsert;

// ── Homeowner In-App Notifications ────────────────────────────────────────────
export const homeownerNotifications = mysqlTable("homeownerNotifications", {
  id: int("id").primaryKey(),
  userId: int("userId").notNull().references(() => users.id),
  type: varchar("type", { length: 255 }).notNull().default("system"),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  actionUrl: varchar("actionUrl", { length: 512 }),
  isRead: boolean("isRead").notNull().default(false),
  metadata: json("metadata"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type HomeownerNotification = typeof homeownerNotifications.$inferSelect;
export type InsertHomeownerNotification = typeof homeownerNotifications.$inferInsert;

// ── CCPA Data Export Requests ─────────────────────────────────────────────────
export const dataExportRequests = mysqlTable("dataExportRequests", {
  id: int("id").primaryKey(),
  homeownerId: int("homeownerId").notNull().references(() => users.id),
  status: varchar("status", { length: 255 }).notNull().default("pending"),
  requestedAt: int("requestedAt").notNull(),
  processedAt: int("processedAt"),
  exportUrl: varchar("exportUrl", { length: 1024 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type DataExportRequest = typeof dataExportRequests.$inferSelect;
export type InsertDataExportRequest = typeof dataExportRequests.$inferInsert;

// ── System Settings / Feature Flags ──────────────────────────────────────────
export const systemSettings = mysqlTable("systemSettings", {
  id: int("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value").notNull(),
  description: varchar("description", { length: 500 }),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type SystemSetting = typeof systemSettings.$inferSelect;
export type InsertSystemSetting = typeof systemSettings.$inferInsert;

// ── ProLnk Pro Waitlist ───────────────────────────────────────────────────────
export const proWaitlist = mysqlTable("proWaitlist", {
  id: int("id").primaryKey(),
  // Contact
  firstName: varchar("firstName", { length: 100 }).notNull(),
  lastName: varchar("lastName", { length: 100 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  phone: varchar("phone", { length: 30 }).notNull(),
  // Business
  businessName: varchar("businessName", { length: 255 }).notNull(),
  businessType: varchar("businessType", { length: 100 }).notNull(), // LLC, Sole Prop, Corp, etc.
  yearsInBusiness: int("yearsInBusiness").notNull(),
  employeeCount: varchar("employeeCount", { length: 50 }).notNull(), // "1", "2-5", "6-15", "16-50", "50+"
  estimatedJobsPerMonth: int("estimatedJobsPerMonth").notNull(),
  avgJobValue: varchar("avgJobValue", { length: 50 }).notNull(), // "$500-$1k", "$1k-$5k", etc.
  // Trades (JSON array of strings)
  trades: json("trades").notNull(), // ["HVAC", "Plumbing", "Roofing", ...]
  // Service area
  primaryCity: varchar("primaryCity", { length: 100 }).notNull(),
  primaryState: varchar("primaryState", { length: 50 }).notNull(),
  serviceZipCodes: text("serviceZipCodes").notNull(), // comma-separated
  serviceRadiusMiles: int("serviceRadiusMiles").default(25).notNull(),
  // Current software stack
  currentSoftware: json("currentSoftware").notNull(), // ["Jobber", "Housecall Pro", "ServiceTitan", "None", ...]
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
  status: varchar("status", { length: 255 }).default("pending").notNull(),
  approvedAt: timestamp("approvedAt"),
  approvedBy: int("approvedBy").references(() => users.id),
  invitedAt: timestamp("invitedAt"),
  adminNotes: text("adminNotes"),
  source: varchar("source", { length: 100 }).default("prolnk-waitlist"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type ProWaitlist = typeof proWaitlist.$inferSelect;
export type InsertProWaitlist = typeof proWaitlist.$inferInsert;

// ── TrustyPro Homeowner Waitlist ──────────────────────────────────────────────
export const homeWaitlist = mysqlTable("homeWaitlist", {
  id: int("id").primaryKey(),
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
  yearBuilt: int("yearBuilt"),
  squareFootage: int("squareFootage"),
  lotSizeSqFt: int("lotSizeSqFt"),
  bedrooms: int("bedrooms"),
  bathrooms: varchar("bathrooms", { length: 10 }), // "1", "1.5", "2", "2.5", "3", "3.5", "4+"
  stories: int("stories"),
  garageSpaces: int("garageSpaces"),
  hasPool: boolean("hasPool").default(false),
  hasBasement: boolean("hasBasement").default(false),
  hasAttic: boolean("hasAttic").default(false),
  // Ownership & condition
  ownershipStatus: varchar("ownershipStatus", { length: 255 }).default("own"),
  ownershipType: varchar("ownershipType", { length: 255 }).default("primary_residence"),
  isRental: boolean("isRental").default(false),
  companyName: varchar("companyName", { length: 255 }),
  companyEin: varchar("companyEin", { length: 20 }),
  propertyManagerName: varchar("propertyManagerName", { length: 255 }),
  propertyManagerPhone: varchar("propertyManagerPhone", { length: 30 }),
  yearsOwned: int("yearsOwned"),
  overallCondition: text("overallCondition"),
  // Recent work (JSON array)
  recentImprovements: json("recentImprovements"), // ["New roof 2022", "HVAC replaced 2021", ...]
  // Desired projects (JSON array of categories)
  desiredProjects: json("desiredProjects").notNull(), // ["Roofing", "HVAC", "Kitchen Remodel", ...]
  projectTimeline: varchar("projectTimeline", { length: 255 }).default("just_exploring"),
  estimatedBudget: varchar("estimatedBudget", { length: 50 }), // "$5k-$15k", "$15k-$50k", "$50k+", etc.
  // Home systems (JSON)
  homeSystems: json("homeSystems"), // { roof: "asphalt shingle", hvac: "central air", water_heater: "gas tank", ... }
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
  status: varchar("status", { length: 255 }).default("pending").notNull(),
  approvedAt: timestamp("approvedAt"),
  approvedBy: int("approvedBy").references(() => users.id),
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
export const homeSystemHealth = mysqlTable("homeSystemHealth", {
  id: int("id").primaryKey(),
  propertyId: int("propertyId").notNull().references(() => properties.id),
  // System type
  systemType: text("systemType").notNull(),
  systemLabel: varchar("systemLabel", { length: 255 }), // e.g. "Main HVAC Unit", "Master Bath Water Heater"
  // Installation / age
  installYear: int("installYear"),
  installMonth: int("installMonth"), // 1-12
  manufacturer: varchar("manufacturer", { length: 255 }),
  modelNumber: varchar("modelNumber", { length: 255 }),
  serialNumber: varchar("serialNumber", { length: 255 }),
  warrantyExpiresYear: int("warrantyExpiresYear"),
  // Life expectancy
  expectedLifespanYears: int("expectedLifespanYears"), // e.g. 20 for roof, 15 for HVAC
  estimatedEndOfLifeYear: int("estimatedEndOfLifeYear"), // computed: installYear + expectedLifespanYears
  // Current condition (AI-assessed or manually set)
  condition: varchar("condition", { length: 255 }).default("unknown").notNull(),
  conditionNotes: text("conditionNotes"),
  // Health score 0-100 (100 = brand new, 0 = end of life)
  healthScore: int("healthScore").default(100).notNull(),
  // AI-derived from photo analysis
  aiAssessedAt: timestamp("aiAssessedAt"),
  aiConditionNotes: text("aiConditionNotes"),
  // Maintenance interval (months between recommended service)
  maintenanceIntervalMonths: int("maintenanceIntervalMonths"),
  lastServicedAt: timestamp("lastServicedAt"),
  nextServiceDueAt: timestamp("nextServiceDueAt"),
  // Replacement cost estimate
  estimatedReplacementCostLow: decimal("estimatedReplacementCostLow", { precision: 10, scale: 2 }),
  estimatedReplacementCostHigh: decimal("estimatedReplacementCostHigh", { precision: 10, scale: 2 }),
  // Photo documentation
  photoUrls: json("photoUrls").$type<string[]>().default([]),
  // Manual notes from homeowner
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type HomeSystemHealth = typeof homeSystemHealth.$inferSelect;
export type InsertHomeSystemHealth = typeof homeSystemHealth.$inferInsert;

// Maintenance log — every service event against a home system
export const homeMaintenanceLogs = mysqlTable("homeMaintenanceLogs", {
  id: int("id").primaryKey(),
  propertyId: int("propertyId").notNull().references(() => properties.id),
  systemHealthId: int("systemHealthId").references(() => homeSystemHealth.id),
  systemType: varchar("systemType", { length: 100 }).notNull(),
  // Service details
  serviceType: text("serviceType").notNull(),
  serviceDescription: text("serviceDescription").notNull(),
  servicedBy: varchar("servicedBy", { length: 255 }), // company/person name
  servicedByPartnerId: int("servicedByPartnerId").references(() => partners.id), // if done by a ProLnk partner
  cost: decimal("cost", { precision: 10, scale: 2 }),
  // Warranty on this service
  serviceWarrantyMonths: int("serviceWarrantyMonths"),
  serviceWarrantyExpiresAt: timestamp("serviceWarrantyExpiresAt"),
  // Documentation
  receiptUrl: text("receiptUrl"),
  photoUrls: json("photoUrls").$type<string[]>().default([]),
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
export const homePassportTransfers = mysqlTable("homePassportTransfers", {
  id: int("id").primaryKey(),
  propertyId: int("propertyId").notNull().references(() => properties.id),
  // Previous owner
  previousOwnerId: int("previousOwnerId").references(() => homeownerProfiles.id),
  previousOwnerName: varchar("previousOwnerName", { length: 255 }),
  previousOwnerEmail: varchar("previousOwnerEmail", { length: 320 }),
  // New owner (filled when they claim)
  newOwnerEmail: varchar("newOwnerEmail", { length: 320 }),
  newOwnerName: varchar("newOwnerName", { length: 255 }),
  newOwnerId: int("newOwnerId").references(() => homeownerProfiles.id),
  // Transfer token (unique link sent to new owner)
  transferToken: varchar("transferToken", { length: 64 }).notNull().unique(),
  // Passport snapshot at time of transfer (JSON)
  passportSnapshot: json("passportSnapshot"),
  // Status
  status: varchar("status", { length: 255 }).default("pending").notNull(),
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
export const stormEvents = mysqlTable("stormEvents", {
  id: int("id").primaryKey(),
  noaaEventId: varchar("eventId", { length: 255 }).notNull().unique(),
  eventType: varchar("eventType", { length: 100 }).notNull(),
  headline: text("headline"),
  description: text("description"),
  severity: varchar("severity", { length: 50 }),
  urgency: varchar("urgency", { length: 50 }),
  affectedAreas: json("affectedAreas").$type<string[]>().default([]),
  status: varchar("status", { length: 255 }).default("active").notNull(),
  onsetAt: timestamp("onsetAt"),
  expiresAt: timestamp("expiresAt"),
  // Stats
  propertiesAffected: int("propertiesAffected").default(0).notNull(),
  leadsGenerated: int("leadsGenerated").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type StormEvent = typeof stormEvents.$inferSelect;
export type InsertStormEvent = typeof stormEvents.$inferInsert;

export const stormLeads = mysqlTable("stormLeads", {
  id: int("id").primaryKey(),
  stormEventId: int("stormEventId").notNull().references(() => stormEvents.id),
  propertyId: int("propertyId").references(() => properties.id),
  tradeCategory: varchar("tradeCategory", { length: 100 }).notNull(),
  address: varchar("address", { length: 500 }),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 10 }),
  zip: varchar("zip", { length: 20 }),
  status: varchar("status", { length: 255 }).default("pending").notNull(),
  priority: varchar("priority", { length: 255 }).default("normal").notNull(),
  dispatchedToPartnerId: int("dispatchedToPartnerId").references(() => partners.id),
  dispatchedAt: timestamp("dispatchedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type StormLead = typeof stormLeads.$inferSelect;
export type InsertStormLead = typeof stormLeads.$inferInsert;

// ── Homeowner Check-ins (post-job completion confirmation) ──────────────────
export const homeownerCheckins = mysqlTable("homeownerCheckins", {
  id: int("id").primaryKey(),
  opportunityId: int("opportunityId").notNull(),
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
export const circumventionFlags = mysqlTable("circumventionFlags", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull(),
  homeownerId: int("homeownerId"),
  opportunityId: int("opportunityId"),
  signalType: varchar("signalType", { length: 50 }).notNull(),
  severity: varchar("severity", { length: 20 }).notNull().default("warning"),
  details: text("details").notNull(),
  status: varchar("status", { length: 20 }).notNull().default("open"),
  resolvedAt: timestamp("resolvedAt"),
  resolvedBy: int("resolvedBy"),
  resolutionNote: text("resolutionNote"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type CircumventionFlag = typeof circumventionFlags.$inferSelect;

// ── Featured Advertisers (Sponsored Partner Banners) ────────────────────────
export const featuredAdvertisers = mysqlTable("featuredAdvertisers", {
  id: int("id").primaryKey(),
  businessName: varchar("businessName", { length: 200 }).notNull(),
  contactName: varchar("contactName", { length: 200 }),
  contactEmail: varchar("contactEmail", { length: 200 }),
  contactPhone: varchar("contactPhone", { length: 50 }),
  category: varchar("category", { length: 100 }).notNull(),
  zipCodes: varchar("zipCodes", { length: 255 }).notNull().default("[]"),
  monthlyFee: decimal("monthlyFee", { precision: 10, scale: 2 }).notNull().default("0"),
  status: varchar("status", { length: 255 }).notNull().default("pending"),
  bannerTitle: varchar("bannerTitle", { length: 200 }),
  bannerSubtitle: varchar("bannerSubtitle", { length: 500 }),
  bannerCtaText: varchar("bannerCtaText", { length: 100 }).default("Learn More"),
  bannerCtaUrl: varchar("bannerCtaUrl", { length: 500 }),
  bannerLogoUrl: varchar("bannerLogoUrl", { length: 500 }),
  showOnDashboard: boolean("showOnDashboard").notNull().default(true),
  showOnScanResults: boolean("showOnScanResults").notNull().default(true),
  showInEmails: boolean("showInEmails").notNull().default(false),
  impressions: int("impressions").notNull().default(0),
  clicks: int("clicks").notNull().default(0),
  startDate: date("startDate"),
  endDate: date("endDate"),
  partnerId: int("partnerId"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type FeaturedAdvertiser = typeof featuredAdvertisers.$inferSelect;
export type InsertFeaturedAdvertiser = typeof featuredAdvertisers.$inferInsert;

// ─── Photo Queue & Waterfall Pipeline ────────────────────────────────────────

export const photoQueueItems = mysqlTable("photoQueueItems", {
  id: int("id").primaryKey(),
  photoUrl: varchar("photoUrl", { length: 1000 }).notNull(),
  serviceAddress: varchar("serviceAddress", { length: 500 }).notNull(),
  source: varchar("source", { length: 255 }).notNull().default("field_app"),
  ingestionMode: varchar("ingestionMode", { length: 255 }).notNull().default("live"),
  photoAgeMonths: int("photoAgeMonths"),
  partnerId: int("partnerId"),
  jobId: int("jobId"),
  batchId: int("batchId"),
  status: varchar("status", { length: 255 }).notNull().default("pending"),
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

export const homeHealthVaultEntries = mysqlTable("homeHealthVaultEntries", {
  id: int("id").primaryKey(),
  serviceAddress: varchar("serviceAddress", { length: 500 }).notNull(),
  component: varchar("component", { length: 200 }).notNull(),
  condition: varchar("condition", { length: 255 }).notNull().default("unknown"),
  notes: text("notes"),
  estimatedAge: int("estimatedAge"),
  photoUrl: varchar("photoUrl", { length: 1000 }),
  source: varchar("source", { length: 100 }),
  updatedAt: bigint("updatedAt", { mode: "number" }).notNull(),
});
export type HomeHealthVaultEntry = typeof homeHealthVaultEntries.$inferSelect;

export const photoIngestionBatches = mysqlTable("photoIngestionBatches", {
  id: int("id").primaryKey(),
  source: varchar("source", { length: 100 }).notNull(),
  totalPhotos: int("totalPhotos").notNull(),
  processedPhotos: int("processedPhotos").default(0),
  offersGenerated: int("offersGenerated").default(0),
  homeHealthUpdates: int("homeHealthUpdates").default(0),
  totalCost: decimal("totalCost", { precision: 10, scale: 6 }),
  costSavings: decimal("costSavings", { precision: 10, scale: 6 }),
  status: varchar("status", { length: 255 }).notNull().default("queued"),
  createdBy: int("createdBy"),
  createdAt: bigint("createdAt", { mode: "number" }).notNull(),
  updatedAt: bigint("updatedAt", { mode: "number" }).notNull(),
});
export type PhotoIngestionBatch = typeof photoIngestionBatches.$inferSelect;

// Item 46: Processed Stripe Events — webhook idempotency guard
export const processedStripeEvents = mysqlTable("processedStripeEvents", {
  id: int("id").primaryKey(),
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
export const jobPayments = mysqlTable("jobPayments", {
  id: int("id").primaryKey(),
  dealId: int("dealId").notNull().references(() => customerDeals.id),
  homeownerId: int("homeownerId"),
  referringPartnerId: int("referringPartnerId").notNull(),
  receivingPartnerId: int("receivingPartnerId"),
  totalJobValue: decimal("totalJobValue", { precision: 10, scale: 2 }).notNull(),
  platformFeeRate: decimal("platformFeeRate", { precision: 5, scale: 4 }).notNull().default("0.1000"),
  platformFeeAmount: decimal("platformFeeAmount", { precision: 10, scale: 2 }).notNull(),
  referringPartnerCommission: decimal("referringPartnerCommission", { precision: 10, scale: 2 }),
  receivingPartnerPayout: decimal("receivingPartnerPayout", { precision: 10, scale: 2 }),
  paymentMethod: varchar("paymentMethod", { length: 255 }).notNull().default("card_on_file"),
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
  status: varchar("status", { length: 255 }).notNull().default("pending"),
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
  triggeredByCheckinId: int("triggeredByCheckinId"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type JobPayment = typeof jobPayments.$inferSelect;
export type InsertJobPayment = typeof jobPayments.$inferInsert;

// Payment Milestones - Scheduled charge events for a job
export const paymentMilestones = mysqlTable("paymentMilestones", {
  id: int("id").primaryKey(),
  jobPaymentId: int("jobPaymentId").notNull().references(() => jobPayments.id),
  dealId: int("dealId").notNull().references(() => customerDeals.id),
  milestoneType: text("milestoneType").notNull(),
  milestoneLabel: varchar("milestoneLabel", { length: 100 }).notNull(),
  percentageOfTotal: decimal("percentageOfTotal", { precision: 5, scale: 4 }).notNull(),
  amountCents: int("amountCents").notNull(),
  triggerEvent: text("triggerEvent").notNull(),
  status: varchar("status", { length: 255 }).notNull().default("scheduled"),
  scheduledFor: timestamp("scheduledFor"),
  triggeredAt: timestamp("triggeredAt"),
  completedAt: timestamp("completedAt"),
  stripeIntentId: varchar("stripeIntentId", { length: 255 }),
  failureReason: text("failureReason"),
  retryCount: int("retryCount").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type PaymentMilestone = typeof paymentMilestones.$inferSelect;
export type InsertPaymentMilestone = typeof paymentMilestones.$inferInsert;

// ACH Authorizations - Partner-signed debit mandates for insurance jobs
// Patent Claim 21: ACH-on-check-in - automatic commission pull from partner bank
// triggered by homeowner confirmation, with no manual intervention required.
export const achAuthorizations = mysqlTable("achAuthorizations", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull(),
  jobPaymentId: int("jobPaymentId").references(() => jobPayments.id),
  dealId: int("dealId").references(() => customerDeals.id),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  stripePaymentMethodId: varchar("stripePaymentMethodId", { length: 255 }),
  stripeMandateId: varchar("stripeMandateId", { length: 255 }),
  bankName: varchar("bankName", { length: 200 }),
  bankLast4: varchar("bankLast4", { length: 4 }),
  bankRoutingNumber: varchar("bankRoutingNumber", { length: 9 }),
  accountType: varchar("accountType", { length: 255 }).default("checking"),
  authorizationType: varchar("authorizationType", { length: 255 }).notNull().default("single_job"),
  maxPullAmount: decimal("maxPullAmount", { precision: 10, scale: 2 }),
  authorizationText: text("authorizationText").notNull(),
  signedAt: timestamp("signedAt"),
  signerName: varchar("signerName", { length: 255 }),
  signerIpAddress: varchar("signerIpAddress", { length: 45 }),
  signerUserAgent: text("signerUserAgent"),
  status: varchar("status", { length: 255 }).notNull().default("pending_signature"),
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
export const homeownerPaymentMethods = mysqlTable("homeownerPaymentMethods", {
  id: int("id").primaryKey(),
  homeownerId: int("homeownerId").notNull(),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }).notNull(),
  stripePaymentMethodId: varchar("stripePaymentMethodId", { length: 255 }).notNull(),
  cardBrand: varchar("cardBrand", { length: 20 }),
  cardLast4: varchar("cardLast4", { length: 4 }),
  cardExpMonth: int("cardExpMonth"),
  cardExpYear: int("cardExpYear"),
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
export const commercialWaitlist = mysqlTable("commercialWaitlist", {
  id: int("id").primaryKey(),
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
export const quickQuoteRequests = mysqlTable("quickQuoteRequests", {
  id: int("id").primaryKey(),
  // Homeowner info
  homeownerUserId: int("homeownerUserId").references(() => users.id),
  homeownerName: varchar("homeownerName", { length: 255 }).notNull(),
  homeownerEmail: varchar("homeownerEmail", { length: 320 }).notNull(),
  homeownerPhone: varchar("homeownerPhone", { length: 30 }),
  // Property
  propertyAddress: varchar("propertyAddress", { length: 500 }).notNull(),
  propertyZipCode: varchar("propertyZipCode", { length: 10 }).notNull(),
  // Service request
  serviceCategory: varchar("serviceCategory", { length: 100 }).notNull(), // "roofing", "hvac", "plumbing", etc.
  serviceDescription: text("serviceDescription").notNull(),
  urgency: varchar("urgency", { length: 255 }).default("flexible").notNull(),
  isWeatherRelated: boolean("isWeatherRelated").default(false).notNull(),
  weatherEventType: varchar("weatherEventType", { length: 100 }), // "hail", "tornado", "flood", "ice_storm"
  photoUrls: json("photoUrls").$type<string[]>().default([]),
  // Targeting
  targetPartnerId: int("targetPartnerId").references(() => partners.id), // specific partner, or null for broadcast
  broadcastToZip: boolean("broadcastToZip").default(false).notNull(), // send to all partners in that zip
  // Status
  status: varchar("status", { length: 255 }).default("pending").notNull(),
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
export const roomMakeoverSessions = mysqlTable("roomMakeoverSessions", {
  id: int("id").primaryKey(),
  homeownerUserId: int("homeownerUserId").references(() => users.id),
  // Guest session support (no login required)
  guestEmail: varchar("guestEmail", { length: 320 }),
  guestName: varchar("guestName", { length: 255 }),
  // Room info
  roomType: varchar("roomType", { length: 100 }).notNull(), // "living_room", "kitchen", "bedroom", etc.
  // Uploaded photos (up to 4)
  photoUrls: json("photoUrls").$type<string[]>().default([]),
  // Style questionnaire answers (JSON)
  styleAnswers: json("styleAnswers").$type<Record<string, string>>().default({}),
  // AI generation
  aiPrompt: text("aiPrompt"),
  generatedImageUrl: varchar("generatedImageUrl", { length: 1000 }),
  generationStatus: varchar("generationStatus", { length: 255 }).default("pending").notNull(),
  generationError: text("generationError"),
  // Home profile integration
  savedToHomeProfile: boolean("savedToHomeProfile").default(false).notNull(),
  // Service opportunities detected from room analysis
  detectedOpportunities: json("detectedOpportunities").$type<Array<{
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
export const partner360Profiles = mysqlTable("partner360Profiles", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id).unique(),
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
  techComfortLevel: varchar("techComfortLevel", { length: 255 }).default("medium"),
  primaryGoal: text("primaryGoal"),
  secondaryGoals: json("secondaryGoals").$type<string[]>().default([]),
  revenueGoal12mo: text("revenueGoal12mo"),
  openToHiring: boolean("openToHiring").default(false).notNull(),
  openToFranchise: boolean("openToFranchise").default(false).notNull(),
  openToAcquisition: boolean("openToAcquisition").default(false).notNull(),
  communicationStyle: varchar("communicationStyle", { length: 255 }).default("text_first"),
  bestTimeToContact: varchar("bestTimeToContact", { length: 255 }).default("anytime"),
  preferredLeadType: varchar("preferredLeadType", { length: 255 }).default("residential"),
  avgJobSize: text("avgJobSize"),
  biggestChallenge: text("biggestChallenge"),
  referralMotivation: text("referralMotivation"),
  willingToReferCompetitors: boolean("willingToReferCompetitors").default(false).notNull(),
  hasExistingReferralNetwork: boolean("hasExistingReferralNetwork").default(false).notNull(),
  estimatedMonthlyJobs: int("estimatedMonthlyJobs").default(0),
  googleBusinessUrl: varchar("googleBusinessUrl", { length: 500 }),
  yelpUrl: varchar("yelpUrl", { length: 500 }),
  facebookUrl: varchar("facebookUrl", { length: 500 }),
  instagramUrl: varchar("instagramUrl", { length: 500 }),
  totalOnlineReviews: int("totalOnlineReviews").default(0),
  avgOnlineRating: decimal("avgOnlineRating", { precision: 3, scale: 2 }),
  completenessScore: int("completenessScore").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type Partner360Profile = typeof partner360Profiles.$inferSelect;
export type InsertPartner360Profile = typeof partner360Profiles.$inferInsert;

// Homeowner 360 Profile — lifestyle, financial comfort, communication preferences, and goals
export const homeowner360Profiles = mysqlTable("homeowner360Profiles", {
  id: int("id").primaryKey(),
  userId: int("userId").notNull().references(() => users.id).unique(),
  householdSize: text("householdSize"),
  hasChildren: boolean("hasChildren").default(false).notNull(),
  childrenAges: json("childrenAges").$type<string[]>().default([]),
  lifestyleType: text("lifestyleType"),
  hobbies: json("hobbies").$type<string[]>().default([]),
  entertainsFrequently: boolean("entertainsFrequently").default(false).notNull(),
  workFromHome: boolean("workFromHome").default(false).notNull(),
  budgetComfort: varchar("budgetComfort", { length: 255 }).default("value_seeker"),
  typicalProjectBudget: text("typicalProjectBudget"),
  financesBigProjects: boolean("financesBigProjects").default(false).notNull(),
  hasHomeWarranty: boolean("hasHomeWarranty").default(false).notNull(),
  hasHomeInsurance: boolean("hasHomeInsurance").default(true).notNull(),
  insuranceProvider: varchar("insuranceProvider", { length: 100 }),
  hasMortgage: boolean("hasMortgage").default(true).notNull(),
  decisionMaker: varchar("decisionMaker", { length: 255 }).default("solo"),
  decisionSpeed: varchar("decisionSpeed", { length: 255 }).default("within_week"),
  hiringCriteria: json("hiringCriteria").$type<string[]>().default([]),
  requiresBackground: boolean("requiresBackground").default(false).notNull(),
  communicationStyle: varchar("communicationStyle", { length: 255 }).default("text_first"),
  bestTimeToContact: varchar("bestTimeToContact", { length: 255 }).default("anytime"),
  responseExpectation: varchar("responseExpectation", { length: 255 }).default("same_day"),
  prefersVideoConsult: boolean("prefersVideoConsult").default(false).notNull(),
  planningToSell: boolean("planningToSell").default(false).notNull(),
  sellTimeframe: varchar("sellTimeframe", { length: 255 }).default("not_planning"),
  primaryHomeGoal: text("primaryHomeGoal"),
  topProjectCategories: json("topProjectCategories").$type<string[]>().default([]),
  dreamProjects: text("dreamProjects"),
  referralMotivation: varchar("referralMotivation", { length: 255 }).default("credits"),
  hasReferredBefore: boolean("hasReferredBefore").default(false).notNull(),
  socialMediaActive: boolean("socialMediaActive").default(false).notNull(),
  wouldLeaveReview: boolean("wouldLeaveReview").default(true).notNull(),
  npsScore: int("npsScore"),
  satisfactionNotes: text("satisfactionNotes"),
  completenessScore: int("completenessScore").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type Homeowner360Profile = typeof homeowner360Profiles.$inferSelect;
export type InsertHomeowner360Profile = typeof homeowner360Profiles.$inferInsert;

// -- Homeowner Leads (matches live DB) --
export const homeownerLeads = mysqlTable("homeownerLeads", {
  id: int("id").primaryKey(),
  homeownerName: varchar("homeownerName", { length: 255 }),
  homeownerEmail: varchar("homeownerEmail", { length: 255 }).unique(),
  homeownerPhone: varchar("homeownerPhone", { length: 50 }),
  address: text("address").notNull(),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 50 }).default("TX"),
  zipCode: varchar("zipCode", { length: 20 }),
  photoUrls: json("photoUrls").$type<string[]>(),
  aiAnalysis: json("aiAnalysis"),
  detectedServices: json("detectedServices"),
  matchedPartnerId: int("matchedPartnerId"),
  opportunityId: int("opportunityId"),
  source: varchar("source", { length: 50 }).notNull().default("trustypro"),
  fullCommission: boolean("fullCommission").notNull().default(true),
  status: varchar("status", { length: 255 }).notNull().default("new"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
});
export type HomeownerLead = typeof homeownerLeads.$inferSelect;

// -- Homeowner Scan Offers (matches live DB) --
export const homeownerScanOffers = mysqlTable("homeownerScanOffers", {
  id: int("id").primaryKey(),
  homeownerProfileId: int("homeownerProfileId"),
  homeownerEmail: varchar("homeownerEmail", { length: 320 }),
  roomLabel: varchar("roomLabel", { length: 100 }),
  issueType: varchar("issueType", { length: 100 }).notNull(),
  issueCategory: varchar("issueCategory", { length: 100 }).notNull(),
  issueDescription: text("issueDescription").notNull(),
  severity: varchar("severity", { length: 255 }).notNull().default("medium"),
  estimatedCostLow: decimal("estimatedCostLow", { precision: 10, scale: 2 }),
  estimatedCostHigh: decimal("estimatedCostHigh", { precision: 10, scale: 2 }),
  photoUrl: text("photoUrl"),
  status: varchar("status", { length: 255 }).notNull().default("new"),
  source: varchar("source", { length: 50 }).default("ai_scan"),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow(),
  offerTrack: varchar("offerTrack", { length: 50 }).default("repair"),
  transformationImageUrl: text("transformationImageUrl"),
  isInsuranceClaim: boolean("isInsuranceClaim").default(false),
  transformationPrompt: text("transformationPrompt"),
  propertyId: int("propertyId"),
});
export type HomeownerScanOffer = typeof homeownerScanOffers.$inferSelect;

// -- Homeowner Scan History (matches live DB) --
export const homeownerScanHistory = mysqlTable("homeownerScanHistory", {
  id: int("id").primaryKey(),
  homeownerProfileId: int("homeownerProfileId"),
  homeownerEmail: varchar("homeownerEmail", { length: 320 }),
  roomLabel: varchar("roomLabel", { length: 100 }),
  photoUrls: json("photoUrls").$type<string[]>(),
  analysisJson: json("analysisJson"),
  overallCondition: varchar("overallCondition", { length: 50 }),
  issueCount: int("issueCount").default(0),
  upgradeCount: int("upgradeCount").default(0),
  photoQualityFlag: varchar("photoQualityFlag", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow(),
  propertyId: int("propertyId"),
});
export type HomeownerScanHistoryEntry = typeof homeownerScanHistory.$inferSelect;

// ===== TABLES THAT EXISTED IN DB BUT WERE MISSING FROM SCHEMA =====

// -- Forum Posts --
export const forumPosts = mysqlTable("forumPosts", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull(),
  category: varchar("category", { length: 50 }).notNull().default("general"),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  likes: int("likes").notNull().default(0),
  pinned: boolean("pinned").notNull().default(false),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});
export type ForumPost = typeof forumPosts.$inferSelect;

// -- Forum Replies --
export const forumReplies = mysqlTable("forumReplies", {
  id: int("id").primaryKey(),
  postId: int("postId").notNull(),
  partnerId: int("partnerId").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("createdAt").notNull(),
});
export type ForumReply = typeof forumReplies.$inferSelect;

// -- Forum Likes --
export const forumLikes = mysqlTable("forumLikes", {
  id: int("id").primaryKey(),
  postId: int("postId").notNull(),
  partnerId: int("partnerId").notNull(),
  createdAt: timestamp("createdAt").notNull(),
});
export type ForumLike = typeof forumLikes.$inferSelect;

// -- Partner Gallery Projects --
export const partnerGalleryProjects = mysqlTable("partnerGalleryProjects", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull(),
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
export const agentHomeownerReferrals = mysqlTable("agentHomeownerReferrals", {
  id: int("id").primaryKey(),
  agentId: int("agentId").notNull(),
  homeownerName: varchar("homeownerName", { length: 200 }).notNull(),
  homeownerEmail: varchar("homeownerEmail", { length: 300 }),
  homeownerPhone: varchar("homeownerPhone", { length: 30 }),
  propertyAddress: varchar("propertyAddress", { length: 500 }),
  referralDirection: text("referralDirection").notNull(),
  saleStatus: varchar("saleStatus", { length: 255 }).notNull().default("active"),
  salePrice: decimal("salePrice", { precision: 12, scale: 2 }),
  agentCommissionAmount: decimal("agentCommissionAmount", { precision: 12, scale: 2 }),
  proLnkReferralFee: decimal("proLnkReferralFee", { precision: 12, scale: 2 }),
  saleClosedAt: timestamp("saleClosedAt"),
  referralFeePaidAt: timestamp("referralFeePaidAt"),
  homeownerUserId: int("homeownerUserId"),
  perpetualCommissionActive: boolean("perpetualCommissionActive").notNull().default(true),
  totalPerpetualEarned: decimal("totalPerpetualEarned", { precision: 12, scale: 2 }).notNull().default("0.00"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type AgentHomeownerReferral = typeof agentHomeownerReferrals.$inferSelect;

// -- Agent Perpetual Commissions --
export const agentPerpetualCommissions = mysqlTable("agentPerpetualCommissions", {
  id: int("id").primaryKey(),
  agentId: int("agentId").notNull(),
  referralId: int("referralId").notNull(),
  opportunityId: int("opportunityId"),
  proLnkCommissionAmount: decimal("proLnkCommissionAmount", { precision: 10, scale: 2 }).notNull(),
  agentEarnedAmount: decimal("agentEarnedAmount", { precision: 10, scale: 2 }).notNull(),
  paid: boolean("paid").notNull().default(false),
  paidAt: timestamp("paidAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type AgentPerpetualCommission = typeof agentPerpetualCommissions.$inferSelect;

// -- Insurance Claims --
export const insuranceClaims = mysqlTable("insuranceClaims", {
  id: int("id").primaryKey(),
  opportunityId: int("opportunityId").notNull(),
  homeownerProfileId: int("homeownerProfileId"),
  partnerId: int("partnerId"),
  claimType: varchar("claimType", { length: 100 }).notNull(),
  description: text("description").notNull(),
  damageDate: timestamp("damageDate"),
  insuranceCompany: varchar("insuranceCompany", { length: 200 }),
  policyNumber: varchar("policyNumber", { length: 100 }),
  claimNumber: varchar("claimNumber", { length: 100 }),
  estimatedDamage: decimal("estimatedDamage", { precision: 10, scale: 2 }),
  approvedAmount: decimal("approvedAmount", { precision: 10, scale: 2 }),
  deductible: decimal("deductible", { precision: 10, scale: 2 }),
  status: varchar("status", { length: 255 }).notNull().default("flagged"),
  jobValue: decimal("jobValue", { precision: 10, scale: 2 }),
  platformFeeAmount: decimal("platformFeeAmount", { precision: 10, scale: 2 }),
  commissionPaid: boolean("commissionPaid").notNull().default(false),
  commissionPaidAt: timestamp("commissionPaidAt"),
  lastReminderSentAt: timestamp("lastReminderSentAt"),
  reminderCount: int("reminderCount").notNull().default(0),
  notes: text("notes"),
  aiDetected: boolean("aiDetected").notNull().default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type InsuranceClaim = typeof insuranceClaims.$inferSelect;

// -- Messages --
export const messages = mysqlTable("messages", {
  id: int("id").primaryKey(),
  threadId: varchar("thread_id", { length: 64 }).notNull(),
  senderType: varchar("sender_type", { length: 255 }).notNull().default("homeowner"),
  senderUserId: int("sender_user_id").notNull(),
  recipientUserId: int("recipient_user_id").notNull(),
  homeownerEmail: varchar("homeowner_email", { length: 255 }),
  partnerId: int("partner_id"),
  body: text("body").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: bigint("created_at", { mode: "number" }).notNull(),
});
export type Message = typeof messages.$inferSelect;

// -- Partner Alerts --
export const partnerAlerts = mysqlTable("partnerAlerts", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull(),
  alertType: varchar("alertType", { length: 100 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  severity: varchar("severity", { length: 255 }).notNull().default("info"),
  isRead: boolean("isRead").notNull().default(false),
  isDismissed: boolean("isDismissed").notNull().default(false),
  metadata: json("metadata"),
  createdAt: timestamp("createdAt").defaultNow(),
});
export type PartnerAlert = typeof partnerAlerts.$inferSelect;

// -- Partner Verifications --
export const partnerVerifications = mysqlTable("partnerVerifications", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull(),
  licenseVerified: boolean("licenseVerified").notNull().default(false),
  licenseNumber: varchar("licenseNumber", { length: 100 }),
  licenseState: varchar("licenseState", { length: 10 }),
  licenseExpiresAt: bigint("licenseExpiresAt", { mode: "number" }),
  licenseDocUrl: text("licenseDocUrl"),
  licenseVerifiedAt: bigint("licenseVerifiedAt", { mode: "number" }),
  licenseVerifiedBy: int("licenseVerifiedBy"),
  licenseNotes: text("licenseNotes"),
  insuranceVerified: boolean("insuranceVerified").notNull().default(false),
  insuranceCarrier: varchar("insuranceCarrier", { length: 200 }),
  insurancePolicyNumber: varchar("insurancePolicyNumber", { length: 100 }),
  insuranceExpiresAt: bigint("insuranceExpiresAt", { mode: "number" }),
  insuranceDocUrl: text("insuranceDocUrl"),
  insuranceVerifiedAt: bigint("insuranceVerifiedAt", { mode: "number" }),
  insuranceVerifiedBy: int("insuranceVerifiedBy"),
  insuranceNotes: text("insuranceNotes"),
  backgroundCheckVerified: boolean("backgroundCheckVerified").notNull().default(false),
  backgroundCheckProvider: varchar("backgroundCheckProvider", { length: 100 }),
  backgroundCheckDate: bigint("backgroundCheckDate", { mode: "number" }),
  backgroundCheckDocUrl: text("backgroundCheckDocUrl"),
  backgroundCheckVerifiedAt: bigint("backgroundCheckVerifiedAt", { mode: "number" }),
  backgroundCheckVerifiedBy: int("backgroundCheckVerifiedBy"),
  backgroundCheckNotes: text("backgroundCheckNotes"),
  businessRegistrationVerified: boolean("businessRegistrationVerified").notNull().default(false),
  businessRegistrationDocUrl: text("businessRegistrationDocUrl"),
  businessRegistrationVerifiedAt: bigint("businessRegistrationVerifiedAt", { mode: "number" }),
  businessRegistrationVerifiedBy: int("businessRegistrationVerifiedBy"),
  businessRegistrationNotes: text("businessRegistrationNotes"),
  referencesVerified: boolean("referencesVerified").notNull().default(false),
  referencesCount: int("referencesCount").default(0),
  referencesNotes: text("referencesNotes"),
  referencesVerifiedAt: bigint("referencesVerifiedAt", { mode: "number" }),
  referencesVerifiedBy: int("referencesVerifiedBy"),
  portfolioVerified: boolean("portfolioVerified").notNull().default(false),
  portfolioUrl: text("portfolioUrl"),
  portfolioNotes: text("portfolioNotes"),
  portfolioVerifiedAt: bigint("portfolioVerifiedAt", { mode: "number" }),
  portfolioVerifiedBy: int("portfolioVerifiedBy"),
  identityVerified: boolean("identityVerified").notNull().default(false),
  identityDocType: varchar("identityDocType", { length: 50 }),
  identityDocUrl: text("identityDocUrl"),
  identityVerifiedAt: bigint("identityVerifiedAt", { mode: "number" }),
  identityVerifiedBy: int("identityVerifiedBy"),
  identityNotes: text("identityNotes"),
  trustScore: int("trustScore").notNull().default(0),
  badgeLevel: varchar("badgeLevel", { length: 255 }).notNull().default("none"),
  overallStatus: varchar("overallStatus", { length: 255 }).notNull().default("unverified"),
  createdAt: bigint("createdAt", { mode: "number" }).notNull().default(0),
  updatedAt: bigint("updatedAt", { mode: "number" }).notNull().default(0),
});
export type PartnerVerification = typeof partnerVerifications.$inferSelect;

// -- Real Estate Agents --
export const realEstateAgents = mysqlTable("realEstateAgents", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull(),
  licenseNumber: varchar("licenseNumber", { length: 100 }),
  brokerageName: varchar("brokerageName", { length: 200 }),
  mlsId: varchar("mlsId", { length: 100 }),
  serviceZipCodes: text("serviceZipCodes"),
  averageHomeSalePrice: decimal("averageHomeSalePrice", { precision: 12, scale: 2 }),
  proLnkReferralRate: decimal("proLnkReferralRate", { precision: 5, scale: 4 }).notNull().default("0.1000"),
  homeownerRecruitRate: decimal("homeownerRecruitRate", { precision: 5, scale: 4 }).notNull().default("0.2500"),
  totalReferralsSent: int("totalReferralsSent").notNull().default(0),
  totalSalesCompleted: int("totalSalesCompleted").notNull().default(0),
  totalEarned: decimal("totalEarned", { precision: 12, scale: 2 }).notNull().default("0.00"),
  totalOwed: decimal("totalOwed", { precision: 12, scale: 2 }).notNull().default("0.00"),
  agreementSignedAt: timestamp("agreementSignedAt"),
  agreementSignedBy: varchar("agreementSignedBy", { length: 200 }),
  agreementVersion: varchar("agreementVersion", { length: 20 }),
  referralCode: varchar("referralCode", { length: 50 }),
  contactName: varchar("contactName", { length: 200 }),
  contactEmail: varchar("contactEmail", { length: 255 }),
  businessName: varchar("businessName", { length: 200 }),
  userId: int("userId"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type RealEstateAgent = typeof realEstateAgents.$inferSelect;

// -- Referral Clicks --
export const referralClicks = mysqlTable("referralClicks", {
  id: int("id").primaryKey(),
  referrerId: int("referrerId").notNull(),
  referralCode: varchar("referralCode", { length: 100 }).notNull(),
  clickedAt: timestamp("clickedAt").defaultNow(),
  convertedAt: timestamp("convertedAt"),
  convertedPartnerId: int("convertedPartnerId"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
});
export type ReferralClick = typeof referralClicks.$inferSelect;

// -- Referrals --
export const referrals = mysqlTable("referrals", {
  id: int("id").primaryKey(),
  fromPartnerId: int("fromPartnerId").notNull(),
  toPartnerId: int("toPartnerId"),
  customerName: varchar("customerName", { length: 255 }),
  customerEmail: varchar("customerEmail", { length: 320 }),
  customerPhone: varchar("customerPhone", { length: 30 }),
  serviceType: varchar("serviceType", { length: 100 }),
  notes: text("notes"),
  status: varchar("status", { length: 255 }).notNull().default("pending"),
  commissionAmount: decimal("commissionAmount", { precision: 10, scale: 2 }).default("0.00"),
  commissionPaid: boolean("commissionPaid").notNull().default(false),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type Referral = typeof referrals.$inferSelect;

// -- Stripe Connect Onboarding --
export const stripeConnectOnboarding = mysqlTable("stripeConnectOnboarding", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull(),
  stripeAccountId: varchar("stripeAccountId", { length: 255 }),
  onboardingUrl: text("onboardingUrl"),
  onboardingExpiresAt: timestamp("onboardingExpiresAt"),
  status: varchar("status", { length: 255 }).notNull().default("not_started"),
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
export const agentProperties = mysqlTable("agentProperties", {
  id: int("id").primaryKey(),
  agentUserId: int("agentUserId").notNull(),
  address: varchar("address", { length: 500 }).notNull(),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 10 }),
  zipCode: varchar("zipCode", { length: 10 }),
  mlsNumber: varchar("mlsNumber", { length: 50 }),
  listPrice: int("listPrice"),
  status: varchar("status", { length: 255 }).notNull().default("active"),
  propertyType: varchar("propertyType", { length: 50 }),
  bedrooms: int("bedrooms"),
  bathrooms: varchar("bathrooms", { length: 10 }),
  squareFootage: int("squareFootage"),
  yearBuilt: int("yearBuilt"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type AgentProperty = typeof agentProperties.$inferSelect;

// -- Home Maintenance Items (master list of trackable maintenance items) --
export const homeMaintenanceItems = mysqlTable("homeMaintenanceItems", {
  id: int("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  defaultIntervalDays: int("defaultIntervalDays"),
  description: text("description"),
  importance: varchar("importance", { length: 255 }).notNull().default("medium"),
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type HomeMaintenanceItem = typeof homeMaintenanceItems.$inferSelect;

// -- Home Maintenance Records (per-property maintenance history) --
export const homeMaintenanceRecords = mysqlTable("homeMaintenanceRecords", {
  id: int("id").primaryKey(),
  propertyId: int("propertyId").notNull(),
  maintenanceItemId: int("maintenanceItemId"),
  itemName: varchar("itemName", { length: 200 }).notNull(),
  performedAt: timestamp("performedAt"),
  performedBy: varchar("performedBy", { length: 200 }),
  cost: int("cost"),
  notes: text("notes"),
  photoUrls: json("photoUrls"),
  nextDueAt: timestamp("nextDueAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type HomeMaintenanceRecord = typeof homeMaintenanceRecords.$inferSelect;

// -- Home System Records (HVAC, roof, plumbing, etc. tracking for Home Health Vault) --
export const homeSystemRecords = mysqlTable("homeSystemRecords", {
  id: int("id").primaryKey(),
  propertyId: int("propertyId").notNull(),
  systemType: varchar("systemType", { length: 100 }).notNull(),
  brand: varchar("brand", { length: 100 }),
  model: varchar("model", { length: 100 }),
  installedAt: timestamp("installedAt"),
  expectedLifespanYears: int("expectedLifespanYears"),
  warrantyExpiresAt: timestamp("warrantyExpiresAt"),
  lastServicedAt: timestamp("lastServicedAt"),
  condition: varchar("condition", { length: 255 }).notNull().default("good"),
  notes: text("notes"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type HomeSystemRecord = typeof homeSystemRecords.$inferSelect;

// -- Property Documents (uploaded docs for properties) --
export const propertyDocuments = mysqlTable("propertyDocuments", {
  id: int("id").primaryKey(),
  propertyId: int("propertyId").notNull(),
  documentType: varchar("documentType", { length: 100 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  fileUrl: text("fileUrl").notNull(),
  fileKey: varchar("fileKey", { length: 500 }),
  mimeType: varchar("mimeType", { length: 100 }),
  fileSize: int("fileSize"),
  uploadedByUserId: int("uploadedByUserId"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type PropertyDocument = typeof propertyDocuments.$inferSelect;

// -- Property Timeline (event log for property changes, repairs, inspections) --
export const propertyTimeline = mysqlTable("propertyTimeline", {
  id: int("id").primaryKey(),
  propertyId: int("propertyId").notNull(),
  eventType: varchar("eventType", { length: 100 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  eventDate: timestamp("eventDate"),
  metadata: json("metadata"),
  createdByUserId: int("createdByUserId"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type PropertyTimelineEvent = typeof propertyTimeline.$inferSelect;

// -- Review Responses (partner responses to homeowner reviews) --
export const reviewResponses = mysqlTable("reviewResponses", {
  id: int("id").primaryKey(),
  reviewId: int("reviewId").notNull(),
  partnerId: int("partnerId").notNull(),
  body: text("body").notNull(),
  isPublic: boolean("isPublic").notNull().default(true),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type ReviewResponse = typeof reviewResponses.$inferSelect;

// -- Service Requests (homeowner requests for specific services) --
export const serviceRequests = mysqlTable("serviceRequests", {
  id: int("id").primaryKey(),
  homeownerProfileId: int("homeownerProfileId").notNull(),
  propertyId: int("propertyId"),
  serviceCategory: varchar("serviceCategory", { length: 100 }).notNull(),
  description: text("description"),
  urgency: varchar("urgency", { length: 255 }).notNull().default("normal"),
  budget: varchar("budget", { length: 50 }),
  preferredDate: timestamp("preferredDate"),
  photoUrls: json("photoUrls"),
  status: varchar("status", { length: 255 }).notNull().default("open"),
  matchedPartnerId: int("matchedPartnerId"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type ServiceRequest = typeof serviceRequests.$inferSelect;

// -- Storm Alerts (weather alerts for properties) --
export const stormAlerts = mysqlTable("stormAlerts", {
  id: int("id").primaryKey(),
  propertyId: int("propertyId"),
  zipCode: varchar("zipCode", { length: 10 }).notNull(),
  alertType: varchar("alertType", { length: 100 }).notNull(),
  headline: varchar("headline", { length: 500 }).notNull(),
  severity: varchar("severity", { length: 255 }).notNull().default("moderate"),
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
export const fsmJobRecords = mysqlTable("fsmJobRecords", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  integrationId: int("integrationId").notNull().references(() => partnerIntegrations.id),
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
  photoUrls: json("photoUrls").$type<string[]>().default([]),
  photoCount: int("photoCount").default(0),
  importStatus: varchar("importStatus", { length: 255 }).notNull().default("pending"),
  claimedByHomeownerId: int("claimedByHomeownerId"),
  claimedAt: timestamp("claimedAt"),
  rawData: json("rawData"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type FsmJobRecord = typeof fsmJobRecords.$inferSelect;
export type InsertFsmJobRecord = typeof fsmJobRecords.$inferInsert;

// -- Vault Import Consents (tracks homeowner consent decisions for FSM record imports) --
export const vaultImportConsents = mysqlTable("vaultImportConsents", {
  id: int("id").primaryKey(),
  homeownerProfileId: int("homeownerProfileId").notNull(),
  propertyId: int("propertyId"),
  fsmJobRecordId: int("fsmJobRecordId").notNull().references(() => fsmJobRecords.id),
  decision: text("decision").notNull(),
  decidedAt: timestamp("decidedAt").notNull().defaultNow(),
  vaultEntryId: int("vaultEntryId"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type VaultImportConsent = typeof vaultImportConsents.$inferSelect;
export type InsertVaultImportConsent = typeof vaultImportConsents.$inferInsert;

// -- FSM Sync Jobs (tracks background sync runs per integration) --
export const fsmSyncJobs = mysqlTable("fsmSyncJobs", {
  id: int("id").primaryKey(),
  integrationId: int("integrationId").notNull().references(() => partnerIntegrations.id),
  partnerId: int("partnerId").notNull(),
  status: varchar("status", { length: 255 }).notNull().default("queued"),
  jobsFound: int("jobsFound").default(0),
  jobsImported: int("jobsImported").default(0),
  jobsSkipped: int("jobsSkipped").default(0),
  errorMessage: text("errorMessage"),
  startedAt: timestamp("startedAt"),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type FsmSyncJob = typeof fsmSyncJobs.$inferSelect;

// -- Marketing Email Log (prevents duplicate campaign emails per user per campaign) --
export const marketingEmailLog = mysqlTable("marketingEmailLog", {
  id: int("id").primaryKey(),
  userId: int("userId").notNull(),
  campaignKey: varchar("campaignKey", { length: 128 }).notNull(),
  sentAt: timestamp("sentAt").notNull().defaultNow(),
});
export type MarketingEmailLog = typeof marketingEmailLog.$inferSelect;

// -- Payout Requests (partner-initiated payout requests for admin review) --
export const payoutRequests = mysqlTable("payoutRequests", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  requestedAmount: decimal("requestedAmount", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 255 }).notNull().default("pending"),
  note: text("note"),
  adminNote: text("adminNote"),
  reviewedByAdminId: int("reviewedByAdminId"),
  reviewedAt: timestamp("reviewedAt"),
  paidAt: timestamp("paidAt"),
  stripeTransferId: varchar("stripeTransferId", { length: 255 }),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type PayoutRequest = typeof payoutRequests.$inferSelect;
export type InsertPayoutRequest = typeof payoutRequests.$inferInsert;

// -- Exchange Jobs (partner-to-partner job marketplace) --
export const exchangeJobs = mysqlTable("exchangeJobs", {
  id: int("id").primaryKey(),
  postedByPartnerId: int("postedByPartnerId").notNull().references(() => partners.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  jobType: varchar("jobType", { length: 255 }).notNull().default("residential"),
  tradeCategory: varchar("tradeCategory", { length: 100 }).notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  totalValue: decimal("totalValue", { precision: 10, scale: 2 }).notNull(),
  brokerMargin: decimal("brokerMargin", { precision: 5, scale: 2 }).notNull().default("10.00"),
  deadline: timestamp("deadline"),
  status: varchar("status", { length: 255 }).notNull().default("open"),
  scopeItems: text("scopeItems"), // JSON array
  clientName: varchar("clientName", { length: 255 }),
  isCommercial: boolean("isCommercial").default(false),
  bidsCount: int("bidsCount").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type ExchangeJob = typeof exchangeJobs.$inferSelect;
export type InsertExchangeJob = typeof exchangeJobs.$inferInsert;

// -- Exchange Bids (partner bids on exchange jobs) --
export const exchangeBids = mysqlTable("exchangeBids", {
  id: int("id").primaryKey(),
  jobId: int("jobId").notNull().references(() => exchangeJobs.id),
  biddingPartnerId: int("biddingPartnerId").notNull().references(() => partners.id),
  bidAmount: decimal("bidAmount", { precision: 10, scale: 2 }).notNull(),
  message: text("message"),
  status: varchar("status", { length: 255 }).notNull().default("pending"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type ExchangeBid = typeof exchangeBids.$inferSelect;

// -- Homeowner Saved Pros (favorites) --
export const homeownerFavorites = mysqlTable("homeownerFavorites", {
  id: int("id").primaryKey(),
  homeownerProfileId: int("homeownerProfileId").notNull().references(() => homeownerProfiles.id),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  notes: text("notes"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type HomeownerFavorite = typeof homeownerFavorites.$inferSelect;

// ============================================================
// NEW TABLES — Sprint: All 57 Autonomous Items
// ============================================================

// -- Partner Availability Slots --
export const partnerAvailability = mysqlTable("partnerAvailability", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  dayOfWeek: int("dayOfWeek").notNull(),
  startHour: int("startHour").notNull(),
  endHour: int("endHour").notNull(),
  isAvailable: boolean("isAvailable").notNull().default(true),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type PartnerAvailability = typeof partnerAvailability.$inferSelect;

// -- Partner Job Matching Preferences --
export const partnerJobPreferences = mysqlTable("partnerJobPreferences", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  serviceCategories: json("serviceCategories").$type<string[]>().notNull().default([]),
  maxJobDistance: int("maxJobDistance").notNull().default(25),
  minJobValue: decimal("minJobValue", { precision: 10, scale: 2 }).notNull().default("0"),
  maxJobValue: decimal("maxJobValue", { precision: 10, scale: 2 }),
  preferredDays: json("preferredDays").$type<number[]>().notNull().default([]),
  acceptsEmergency: boolean("acceptsEmergency").notNull().default(false),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type PartnerJobPreference = typeof partnerJobPreferences.$inferSelect;

// -- Partner Onboarding Checklist --
export const partnerOnboardingChecklist = mysqlTable("partnerOnboardingChecklist", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  profileComplete: boolean("profileComplete").notNull().default(false),
  payoutConnected: boolean("payoutConnected").notNull().default(false),
  firstReferralSent: boolean("firstReferralSent").notNull().default(false),
  trainingComplete: boolean("trainingComplete").notNull().default(false),
  agreementSigned: boolean("agreementSigned").notNull().default(false),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type PartnerOnboardingChecklist = typeof partnerOnboardingChecklist.$inferSelect;

// -- Networking Event Registrations --
export const networkingEventRegistrations = mysqlTable("networkingEventRegistrations", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  eventName: varchar("eventName", { length: 255 }).notNull(),
  eventDate: timestamp("eventDate").notNull(),
  location: varchar("location", { length: 255 }),
  status: varchar("status", { length: 255 }).notNull().default("registered"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type NetworkingEventRegistration = typeof networkingEventRegistrations.$inferSelect;

// -- Training Academy Enrollments --
export const trainingEnrollments = mysqlTable("trainingEnrollments", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  courseId: varchar("courseId", { length: 100 }).notNull(),
  courseName: varchar("courseName", { length: 255 }).notNull(),
  status: varchar("status", { length: 255 }).notNull().default("enrolled"),
  progress: int("progress").notNull().default(0),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type TrainingEnrollment = typeof trainingEnrollments.$inferSelect;

// -- Skills Marketplace Enrollments --
export const skillEnrollments = mysqlTable("skillEnrollments", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  skillId: varchar("skillId", { length: 100 }).notNull(),
  skillName: varchar("skillName", { length: 255 }).notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull().default("0"),
  status: varchar("status", { length: 255 }).notNull().default("active"),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type SkillEnrollment = typeof skillEnrollments.$inferSelect;

// -- Proposals --
export const proposals = mysqlTable("proposals", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }),
  clientPhone: varchar("clientPhone", { length: 30 }),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  lineItems: json("lineItems").$type<Array<{ description: string; qty: number; unitPrice: number }>>().notNull().default([]),
  totalAmount: decimal("totalAmount", { precision: 10, scale: 2 }).notNull().default("0"),
  status: varchar("status", { length: 255 }).notNull().default("draft"),
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
export const quotes = mysqlTable("quotes", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }),
  serviceCategory: varchar("serviceCategory", { length: 100 }),
  description: text("description"),
  estimatedAmount: decimal("estimatedAmount", { precision: 10, scale: 2 }).notNull().default("0"),
  status: varchar("status", { length: 255 }).notNull().default("draft"),
  sentAt: timestamp("sentAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type Quote = typeof quotes.$inferSelect;
export type InsertQuote = typeof quotes.$inferInsert;

// -- Platform Content Items (WhatsNew, UpsellPlaybook, TrainingHub, ResourceCenter) --
export const contentItems = mysqlTable("contentItems", {
  id: int("id").primaryKey(),
  contentType: text("contentType").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body"),
  url: varchar("url", { length: 1024 }),
  category: varchar("category", { length: 100 }),
  tags: json("tags").$type<string[]>().default([]),
  isPublished: boolean("isPublished").notNull().default(false),
  publishedAt: timestamp("publishedAt"),
  sortOrder: int("sortOrder").notNull().default(0),
  createdBy: int("createdBy").references(() => users.id),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type ContentItem = typeof contentItems.$inferSelect;
export type InsertContentItem = typeof contentItems.$inferInsert;

// -- Tax Estimates --
export const taxEstimates = mysqlTable("taxEstimates", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  year: int("year").notNull(),
  grossRevenue: decimal("grossRevenue", { precision: 12, scale: 2 }).notNull(),
  deductions: decimal("deductions", { precision: 12, scale: 2 }).notNull().default("0"),
  estimatedTax: decimal("estimatedTax", { precision: 12, scale: 2 }).notNull(),
  effectiveRate: decimal("effectiveRate", { precision: 5, scale: 2 }).notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type TaxEstimate = typeof taxEstimates.$inferSelect;

// -- Growth Projections --
export const growthProjections = mysqlTable("growthProjections", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  currentMonthlyRevenue: decimal("currentMonthlyRevenue", { precision: 12, scale: 2 }).notNull(),
  targetGrowthPct: decimal("targetGrowthPct", { precision: 5, scale: 2 }).notNull(),
  projectedRevenue12m: decimal("projectedRevenue12m", { precision: 12, scale: 2 }).notNull(),
  referralGoal: int("referralGoal").notNull().default(0),
  notes: text("notes"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type GrowthProjection = typeof growthProjections.$inferSelect;

// -- FieldOS Job Log --
export const fieldJobLog = mysqlTable("fieldJobLog", {
  id: int("id").primaryKey(),
  partnerId: int("partnerId").notNull().references(() => partners.id),
  jobTitle: varchar("jobTitle", { length: 255 }).notNull(),
  clientName: varchar("clientName", { length: 255 }),
  address: varchar("address", { length: 500 }),
  serviceCategory: varchar("serviceCategory", { length: 100 }),
  scheduledAt: timestamp("scheduledAt"),
  completedAt: timestamp("completedAt"),
  jobValue: decimal("jobValue", { precision: 10, scale: 2 }),
  commissionAmount: decimal("commissionAmount", { precision: 10, scale: 2 }),
  status: varchar("status", { length: 255 }).notNull().default("scheduled"),
  notes: text("notes"),
  source: varchar("source", { length: 255 }).notNull().default("manual"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
export type FieldJobLogEntry = typeof fieldJobLog.$inferSelect;
export type InsertFieldJobLogEntry = typeof fieldJobLog.$inferInsert;

// -- Seasonal Prep Guide Items (admin-managed) --
export const seasonalPrepItems = mysqlTable("seasonalPrepItems", {
  id: int("id").primaryKey(),
  season: text("season").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  priority: varchar("priority", { length: 255 }).notNull().default("medium"),
  estimatedCost: varchar("estimatedCost", { length: 100 }),
  diyDifficulty: varchar("diyDifficulty", { length: 255 }).notNull().default("moderate"),
  sortOrder: int("sortOrder").notNull().default(0),
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
export type SeasonalPrepItem = typeof seasonalPrepItems.$inferSelect;

// -- Industry Rates Data (for TrueCostGuide) --
export const industryRatesData = mysqlTable("industryRatesData", {
  id: int("id").primaryKey(),
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
export const projectBids = mysqlTable("projectBids", {
  id: int("id").primaryKey(),
  jobId: int("jobId").notNull().references(() => jobs.id),
  submittingPartnerId: int("submittingPartnerId").notNull().references(() => partners.id),
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
  lineItems: json("lineItems").$type<Array<{
    tradeType: string;
    description: string;
    estimatedCost: number;
    notes?: string;
  }>>().notNull(),
  photoUrls: json("photoUrls").$type<string[]>().default([]),
  totalEstimatedValue: decimal("totalEstimatedValue", { precision: 12, scale: 2 }).notNull(),
  targetStartDate: varchar("targetStartDate", { length: 50 }),
  confidence: decimal("confidence", { precision: 4, scale: 3 }).default("0.850"),
  status: varchar("status", { length: 255 }).default("pending_review").notNull(),
  approvedAt: timestamp("approvedAt"),
  approvedBy: int("approvedBy"),
  rejectedAt: timestamp("rejectedAt"),
  rejectedBy: int("rejectedBy"),
  rejectionReason: varchar("rejectionReason", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type ProjectBid = typeof projectBids.$inferSelect;
export type InsertProjectBid = typeof projectBids.$inferInsert;

// ─── User Passwords (for direct email/password auth — replaces Manus OAuth) ───
// Separate table to avoid storing password hashes in the main users table.
// Hash format: pbkdf2 — "salt:hash" (see server/_core/oauth.ts)
export const userPasswords = mysqlTable("userPasswords", {
  id: int("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique().references(() => users.openId),
  passwordHash: varchar("passwordHash", { length: 256 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
export type IndustryRateData = typeof industryRatesData.$inferSelect;

// ─── Admin Audit Log ───────────────────────────────────────────────────────────
// Records every consequential admin action for compliance and dispute resolution.
export const adminAuditLog = mysqlTable("adminAuditLog", {
  id: int("id").primaryKey(),
  adminUserId: int("adminUserId").notNull().references(() => users.id),
  action: varchar("action", { length: 100 }).notNull(), // e.g. "approve_partner", "reject_partner", "mark_paid", "suspend_partner"
  targetType: varchar("targetType", { length: 50 }), // e.g. "partner", "commission", "payout_request"
  targetId: int("targetId"), // the ID of the affected record
  detail: text("detail"), // JSON blob with before/after or extra context
  ipAddress: varchar("ipAddress", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type AdminAuditLogEntry = typeof adminAuditLog.$inferSelect;
export type InsertAdminAuditLogEntry = typeof adminAuditLog.$inferInsert;

// ─── Network Income System ────────────────────────────────────────────────────
// L1=Charter Partner, L2=Founding Partner, L3=Growth Pro, L4=Standard Pro

export const proNetworkProfile = mysqlTable("pro_network_profile", {
  id: int("id").primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull().unique(),
  networkLevel: int("network_level").notNull().default(4), // 1-4
  referredByUserId: varchar("referred_by_user_id", { length: 255 }),
  referralCode: varchar("referral_code", { length: 10 }).notNull().unique(), // 6-char alphanum
  subscriptionActive: boolean("subscription_active").notNull().default(false),
  lastJobCompletedAt: timestamp("last_job_completed_at"),
  jobsCompletedThisMonth: int("jobs_completed_this_month").notNull().default(0),
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
export const proUplineChain = mysqlTable("pro_upline_chain", {
  id: int("id").primaryKey(),
  proUserId: varchar("pro_user_id", { length: 255 }).notNull(),
  uplineUserId: varchar("upline_user_id", { length: 255 }).notNull(),
  levelsAbove: int("levels_above").notNull(), // 1=direct referrer, 2=referrer's referrer, etc.
  uplineNetworkLevel: int("upline_network_level").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => ({
  proIdx: index("pro_upline_pro_idx").on(table.proUserId),
  uplineIdx: index("pro_upline_upline_idx").on(table.uplineUserId),
}));
export type ProUplineChain = typeof proUplineChain.$inferSelect;

// Every job completion that generates commissions
export const jobCommissionEvent = mysqlTable("job_commission_event", {
  id: int("id").primaryKey(),
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
export const commissionPayout = mysqlTable("commission_payout", {
  id: int("id").primaryKey(),
  jobCommissionEventId: int("job_commission_event_id").notNull(),
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
export const homeDocumentation = mysqlTable("home_documentation", {
  id: int("id").primaryKey(),
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
