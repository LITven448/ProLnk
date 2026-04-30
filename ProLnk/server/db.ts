import { eq, and, desc, sql, count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users, partners, jobs, opportunities, commissions, broadcasts, industryRates,
  Partner, InsertPartner, InsertJob, InsertOpportunity,
  calculateCommissionRates,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// --- Users --------------------------------------------------------------------

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) { console.warn("[Database] Cannot upsert user: database not available"); return; }

  try {
    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};
    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };
    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) { values.lastSignedIn = user.lastSignedIn; updateSet.lastSignedIn = user.lastSignedIn; }
    if (user.role !== undefined) { values.role = user.role; updateSet.role = user.role; }
    else if (
      user.email?.toLowerCase() === (process.env.OWNER_EMAIL ?? '').toLowerCase() &&
      (process.env.OWNER_EMAIL ?? '') !== ''
    ) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) values.lastSignedIn = new Date();
    if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();

    await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// --- Partners -----------------------------------------------------------------

export async function createPartner(data: InsertPartner) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(partners).values(data);
}

export async function getPartnerByUserId(userId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(partners).where(eq(partners.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getPartnerByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(partners).where(eq(partners.contactEmail, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getPartnerById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(partners).where(eq(partners.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function linkPartnerToUser(partnerId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(partners).set({ userId }).where(eq(partners.id, partnerId));
}

export async function getPendingPartners() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(partners).where(eq(partners.status, "pending")).orderBy(desc(partners.appliedAt));
}

export async function getAllPartners() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(partners).orderBy(desc(partners.appliedAt));
}

export async function getApprovedPartners() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(partners).where(eq(partners.status, "approved")).orderBy(partners.businessName);
}

export async function approvePartner(partnerId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(partners)
    .set({ status: "approved", approvedAt: new Date() })
    .where(eq(partners.id, partnerId));
}

export async function rejectPartner(partnerId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(partners).set({ status: "rejected" }).where(eq(partners.id, partnerId));
}

export async function updatePartnerCommissionRates(
  partnerId: number,
  platformFeeRate: string,
  referralCommissionRate: string
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(partners)
    .set({ platformFeeRate, referralCommissionRate })
    .where(eq(partners.id, partnerId));
}

export async function updatePartnerTier(partnerId: number, referralCount: number) {
  // Tier is now subscription-based, not activity-based.
  // This function only updates referralCount; tier upgrades happen via subscription.
  const db = await getDb();
  if (!db) return;
  await db.update(partners).set({ referralCount }).where(eq(partners.id, partnerId));
}

export async function incrementPartnerStats(partnerId: number, field: "referralCount" | "leadsCount" | "jobsLogged" | "opportunitiesGenerated") {
  const db = await getDb();
  if (!db) return;
  // Atomic increment to prevent race conditions under concurrent requests
  const col = partners[field];
  await db.update(partners)
    .set({ [field]: sql`COALESCE(${col}, 0) + 1` } as any)
    .where(eq(partners.id, partnerId));
  if (field === "referralCount") {
    // Fetch updated count for tier calculation
    const updated = await db.select({ val: partners.referralCount }).from(partners).where(eq(partners.id, partnerId)).limit(1);
    const newCount = (updated[0]?.val as number) ?? 0;
    await updatePartnerTier(partnerId, newCount);
  }
}

// --- Jobs ---------------------------------------------------------------------

export async function createJob(data: InsertJob) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(jobs).values(data);
  return result;
}

export async function getJobById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getJobsByPartnerId(partnerId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(jobs).where(eq(jobs.partnerId, partnerId)).orderBy(desc(jobs.createdAt)).limit(50);
}

export async function getAllJobs() {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: jobs.id,
    partnerId: jobs.partnerId,
    partnerName: partners.businessName,
    serviceAddress: jobs.serviceAddress,
    serviceType: jobs.serviceType,
    aiAnalysisStatus: jobs.aiAnalysisStatus,
    status: jobs.status,
    createdAt: jobs.createdAt,
  }).from(jobs)
    .leftJoin(partners, eq(jobs.partnerId, partners.id))
    .orderBy(desc(jobs.createdAt))
    .limit(500);
}

export async function updateJobAiAnalysis(
  jobId: number,
  status: "processing" | "complete" | "failed",
  result: unknown
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(jobs)
    .set({
      aiAnalysisStatus: status,
      aiAnalysisResult: result as never,
      status: status === "complete" ? "analyzed" : "logged",
    })
    .where(eq(jobs.id, jobId));
}

// --- Opportunities ------------------------------------------------------------

export async function createOpportunity(data: InsertOpportunity) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(opportunities).values(data);
}

export async function getOpportunitiesByReceivingPartnerId(partnerId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: opportunities.id,
    jobId: opportunities.jobId,
    opportunityType: opportunities.opportunityType,
    opportunityCategory: opportunities.opportunityCategory,
    description: opportunities.description,
    aiConfidence: opportunities.aiConfidence,
    photoUrl: opportunities.photoUrl,
    status: opportunities.status,
    estimatedJobValue: opportunities.estimatedJobValue,
    actualJobValue: opportunities.actualJobValue,
    platformFeeAmount: opportunities.platformFeeAmount,
    referralCommissionAmount: opportunities.referralCommissionAmount,
    sentAt: opportunities.sentAt,
    createdAt: opportunities.createdAt,
    sourcePartnerName: partners.businessName,
    serviceAddress: jobs.serviceAddress,
  })
    .from(opportunities)
    .leftJoin(partners, eq(opportunities.sourcePartnerId, partners.id))
    .leftJoin(jobs, eq(opportunities.jobId, jobs.id))
    .where(eq(opportunities.receivingPartnerId, partnerId))
    .orderBy(desc(opportunities.createdAt))
    .limit(50);
}

export async function getOpportunitiesBySourcePartnerId(partnerId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: opportunities.id,
    opportunityType: opportunities.opportunityType,
    opportunityCategory: opportunities.opportunityCategory,
    description: opportunities.description,
    status: opportunities.status,
    estimatedJobValue: opportunities.estimatedJobValue,
    actualJobValue: opportunities.actualJobValue,
    referralCommissionAmount: opportunities.referralCommissionAmount,
    createdAt: opportunities.createdAt,
    receivingPartnerName: partners.businessName,
    serviceAddress: jobs.serviceAddress,
  })
    .from(opportunities)
    .leftJoin(partners, eq(opportunities.receivingPartnerId, partners.id))
    .leftJoin(jobs, eq(opportunities.jobId, jobs.id))
    .where(eq(opportunities.sourcePartnerId, partnerId))
    .orderBy(desc(opportunities.createdAt))
    .limit(50);
}

export async function getAllOpportunities() {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: opportunities.id,
    opportunityType: opportunities.opportunityType,
    opportunityCategory: opportunities.opportunityCategory,
    description: opportunities.description,
    aiConfidence: opportunities.aiConfidence,
    status: opportunities.status,
    estimatedJobValue: opportunities.estimatedJobValue,
    actualJobValue: opportunities.actualJobValue,
    platformFeeAmount: opportunities.platformFeeAmount,
    referralCommissionAmount: opportunities.referralCommissionAmount,
    proLinkNetAmount: opportunities.proLinkNetAmount,
    createdAt: opportunities.createdAt,
    sourcePartnerName: sql<string>`sp.businessName`,
    receivingPartnerName: sql<string>`rp.businessName`,
    serviceAddress: jobs.serviceAddress,
    photoUrl: opportunities.photoUrl,
    jobId: opportunities.jobId,
    sourcePartnerId: opportunities.sourcePartnerId,
    receivingPartnerId: opportunities.receivingPartnerId,
  })
    .from(opportunities)
    .leftJoin(sql`partners sp`, sql`${opportunities.sourcePartnerId} = sp.id`)
    .leftJoin(sql`partners rp`, sql`${opportunities.receivingPartnerId} = rp.id`)
    .leftJoin(jobs, eq(opportunities.jobId, jobs.id))
    .orderBy(desc(opportunities.createdAt))
    .limit(200);
}

export async function updateOpportunityStatus(
  opportunityId: number,
  status: "accepted" | "declined" | "converted" | "expired"
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData: Record<string, unknown> = { status };
  if (status === "accepted") updateData.acceptedAt = new Date();
  await db.update(opportunities).set(updateData as never).where(eq(opportunities.id, opportunityId));
}

export async function closeOpportunityWithJobValue(
  opportunityId: number,
  actualJobValue: number,
  receivingPartnerId: number
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const opp = await db.select().from(opportunities).where(eq(opportunities.id, opportunityId)).limit(1);
  if (!opp.length) throw new Error("Opportunity not found");

  // Idempotency guard: if commissions already exist for this opportunity (e.g. created
  // by the V12 payments flow), skip insertion to prevent double-counting.
  const existingCommissions = await db
    .select({ id: commissions.id })
    .from(commissions)
    .where(eq(commissions.opportunityId, opportunityId))
    .limit(1);
  if (existingCommissions.length > 0) {
    throw new Error(`Commissions already exist for opportunity ${opportunityId} — use the V12 payment flow or void duplicates before re-closing`);
  }

  const partner = await db.select().from(partners).where(eq(partners.id, receivingPartnerId)).limit(1);
  if (!partner.length) throw new Error("Partner not found");

  const platformFeeRate = parseFloat((partner[0].platformFeeRate as string) || "0");
  const commissionKeepRate = parseFloat((partner[0].commissionRate as string) || "0");
  const isExempt = partner[0].isExempt;
  const monthlyCommissionEarned = parseFloat(partner[0].monthlyCommissionEarned as string ?? "0");
  const monthlyCommissionCap = partner[0].monthlyCommissionCap ? parseFloat((partner[0].monthlyCommissionCap as string) || "0") : null;

  // Look up the SOURCE partner's commission keep rate (they earn the referral commission)
  let sourceCommissionKeepRate = 0.40; // default Scout rate
  let sourceIsExempt = false;
  let sourceMonthlyEarned = 0;
  let sourceMonthlyCapAmt: number | null = null;
  if (opp[0].sourcePartnerId) {
    const sourcePtnrLookup = await db.select().from(partners).where(eq(partners.id, opp[0].sourcePartnerId)).limit(1);
    if (sourcePtnrLookup.length) {
      sourceCommissionKeepRate = parseFloat((sourcePtnrLookup[0].commissionRate as string) || "0");
      sourceIsExempt = sourcePtnrLookup[0].isExempt;
      sourceMonthlyEarned = parseFloat(sourcePtnrLookup[0].monthlyCommissionEarned as string ?? "0");
      sourceMonthlyCapAmt = sourcePtnrLookup[0].monthlyCommissionCap ? parseFloat((sourcePtnrLookup[0].monthlyCommissionCap as string) || "0") : null;
    }
  }

  const rates = calculateCommissionRates(
    actualJobValue,
    platformFeeRate,
    sourceCommissionKeepRate,
    sourceIsExempt,
    sourceMonthlyEarned,
    sourceMonthlyCapAmt,
  );

  await db.update(opportunities)
    .set({
      status: "converted",
      actualJobValue: actualJobValue.toFixed(2),
      platformFeeAmount: rates.platformFeeAmount.toFixed(2),
      referralCommissionAmount: rates.referralCommissionAmount.toFixed(2),
      proLinkNetAmount: rates.proLinkNetAmount.toFixed(2),
      jobClosedAt: new Date(),
    })
    .where(eq(opportunities.id, opportunityId));

  await db.insert(commissions).values({
    opportunityId,
    payingPartnerId: receivingPartnerId,
    receivingPartnerId: null,
    commissionType: "platform_fee",
    amount: rates.platformFeeAmount.toFixed(2),
    jobValue: actualJobValue.toFixed(2),
    feeRate: rates.effectiveFeeRate.toFixed(4),
    description: `Platform fee for ${opp[0].opportunityType} job at $${actualJobValue}`,
  });

  if (opp[0].sourcePartnerId) {
    await db.insert(commissions).values({
      opportunityId,
      payingPartnerId: receivingPartnerId,
      receivingPartnerId: opp[0].sourcePartnerId,
      commissionType: "referral_commission",
      amount: rates.referralCommissionAmount.toFixed(2),
      jobValue: actualJobValue.toFixed(2),
      feeRate: rates.effectiveKeepRate.toFixed(4),
      description: `Referral commission for ${opp[0].opportunityType} job`,
    });

    const sourcePtnr = await db.select().from(partners).where(eq(partners.id, opp[0].sourcePartnerId)).limit(1);
    if (sourcePtnr.length) {
      const currentEarned = parseFloat((sourcePtnr[0].totalCommissionEarned as string) || "0");
      await db.update(partners)
        .set({ totalCommissionEarned: (currentEarned + rates.referralCommissionAmount).toFixed(2) as unknown as string })
        .where(eq(partners.id, opp[0].sourcePartnerId));
    }
  }

  return rates;
}

// --- Commissions -------------------------------------------------------------

export async function getCommissionsByPartnerId(partnerId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(commissions)
    .where(eq(commissions.payingPartnerId, partnerId))
    .orderBy(desc(commissions.createdAt));
}

export async function getEarnedCommissionsByPartnerId(partnerId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(commissions)
    .where(eq(commissions.receivingPartnerId, partnerId))
    .orderBy(desc(commissions.createdAt));
}

export async function getUnpaidCommissions() {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: commissions.id,
    payingPartnerId: commissions.payingPartnerId,
    partnerName: partners.businessName,
    commissionType: commissions.commissionType,
    amount: commissions.amount,
    jobValue: commissions.jobValue,
    description: commissions.description,
    paid: commissions.paid,
    createdAt: commissions.createdAt,
  })
    .from(commissions)
    .leftJoin(partners, eq(commissions.payingPartnerId, partners.id))
    .where(eq(commissions.paid, false))
    .orderBy(desc(commissions.createdAt));
}

export async function markCommissionPaid(commissionId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(commissions)
    .set({ paid: true, paidAt: new Date() })
    .where(eq(commissions.id, commissionId));
}

export async function getTotalCommissionsPaid() {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({
    total: sql<number>`COALESCE(SUM(${commissions.amount}), 0)`,
  }).from(commissions).where(eq(commissions.paid, true));
  return result[0]?.total ?? 0;
}

// --- Broadcasts ---------------------------------------------------------------

export async function createBroadcast(subject: string, message: string, sentBy: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(broadcasts).values({ subject, message, sentBy });
}

export async function getBroadcasts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(broadcasts).orderBy(desc(broadcasts.createdAt)).limit(20);
}

// --- Industry Commission Rates (Wave 3) ---------------------------------------

export async function getIndustryRates() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(industryRates).orderBy(industryRates.industryName);
}

export async function upsertIndustryRate(
  industryName: string,
  platformFeeRate: string,
  referralCommissionRate: string,
  notes: string | null,
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(industryRates)
    .values({ industryName, platformFeeRate, referralCommissionRate, notes })
    .onDuplicateKeyUpdate({ set: { platformFeeRate, referralCommissionRate, notes } });
}

// --- Network Stats ------------------------------------------------------------

export async function getNetworkStats() {
  const db = await getDb();
  if (!db) return {
    totalPartners: 0, pendingApplications: 0,
    totalJobs: 0, totalOpportunities: 0,
    convertedOpportunities: 0, totalCommissionsPaid: 0,
    totalProLnkRevenue: 0,
    totalProperties: 0, totalPropertyAssets: 0,
    totalEventTriggers: 0, totalEventDrivenLeads: 0,
    totalAIPipelineRuns: 0, activeRecallAlerts: 0,
    totalHomeowners: 0, totalWishlistItems: 0,
  };

  const [totalPartnersResult] = await db.select({ total: count() }).from(partners).where(eq(partners.status, "approved"));
  const [pendingResult] = await db.select({ total: count() }).from(partners).where(eq(partners.status, "pending"));
  const [totalJobsResult] = await db.select({ total: count() }).from(jobs);
  const [totalOppResult] = await db.select({ total: count() }).from(opportunities);
  const [convertedResult] = await db.select({ total: count() }).from(opportunities).where(eq(opportunities.status, "converted"));
  const [commPaidResult] = await db.select({
    total: sql<number>`COALESCE(SUM(${commissions.amount}), 0)`,
  }).from(commissions).where(eq(commissions.paid, true));
  const [proLinkRevResult] = await db.select({
    total: sql<number>`COALESCE(SUM(${opportunities.proLinkNetAmount}), 0)`,
  }).from(opportunities).where(eq(opportunities.status, "converted"));

  // V6 engine stats -- use raw SQL to avoid schema import issues
  let totalProperties = 0, totalPropertyAssets = 0, totalEventTriggers = 0;
  let totalEventDrivenLeads = 0, totalAIPipelineRuns = 0, activeRecallAlerts = 0;
  try {
    const [pr] = await (db as any).execute(sql`SELECT COUNT(*) as cnt FROM properties`);
    const [ar] = await (db as any).execute(sql`SELECT COUNT(*) as cnt FROM propertyAssets`);
    const [er] = await (db as any).execute(sql`SELECT COUNT(*) as cnt FROM eventTriggers`);
    const [el] = await (db as any).execute(sql`SELECT COUNT(*) as cnt FROM eventDrivenLeads`);
    const [ai] = await (db as any).execute(sql`SELECT COUNT(*) as cnt FROM aiPipelineRuns`);
    const [rc] = await (db as any).execute(sql`SELECT COUNT(*) as cnt FROM recallAlerts WHERE isActive = 1`);
    totalProperties = Number(pr[0]?.cnt ?? 0);
    totalPropertyAssets = Number(ar[0]?.cnt ?? 0);
    totalEventTriggers = Number(er[0]?.cnt ?? 0);
    totalEventDrivenLeads = Number(el[0]?.cnt ?? 0);
    totalAIPipelineRuns = Number(ai[0]?.cnt ?? 0);
    activeRecallAlerts = Number(rc[0]?.cnt ?? 0);
  } catch (_) { /* V6 tables may not exist in older deployments */ }

  let totalHomeowners = 0, totalWishlistItems = 0;
  try {
    const [hw] = await (db as any).execute(sql`SELECT COUNT(*) as cnt FROM homeownerProfiles WHERE setupComplete = 1`);
    const [wl] = await (db as any).execute(sql`SELECT COUNT(*) as cnt FROM propertyWishes`);
    totalHomeowners = Number(hw[0]?.cnt ?? 0);
    totalWishlistItems = Number(wl[0]?.cnt ?? 0);
  } catch (_) { /* homeowner tables may not exist */ }

  return {
    totalPartners: totalPartnersResult?.total ?? 0,
    pendingApplications: pendingResult?.total ?? 0,
    totalJobs: totalJobsResult?.total ?? 0,
    totalOpportunities: totalOppResult?.total ?? 0,
    convertedOpportunities: convertedResult?.total ?? 0,
    totalCommissionsPaid: Number(commPaidResult?.total ?? 0),
    totalProLnkRevenue: Number(proLinkRevResult?.total ?? 0),
    totalProperties,
    totalPropertyAssets,
    totalEventTriggers,
    totalEventDrivenLeads,
    totalAIPipelineRuns,
    activeRecallAlerts,
    totalHomeowners,
    totalWishlistItems,
  };
}

export async function getPartnerStats(partnerId: number) {
  const db = await getDb();
  if (!db) return null;

  const partner = await db.select().from(partners).where(eq(partners.id, partnerId)).limit(1);
  if (!partner.length) return null;

  const [inboundCount] = await db.select({ total: count() })
    .from(opportunities).where(eq(opportunities.receivingPartnerId, partnerId));
  const [convertedCount] = await db.select({ total: count() })
    .from(opportunities).where(and(eq(opportunities.receivingPartnerId, partnerId), eq(opportunities.status, "converted")));
  const [outboundCount] = await db.select({ total: count() })
    .from(opportunities).where(eq(opportunities.sourcePartnerId, partnerId));
  const [earnedResult] = await db.select({
    total: sql<number>`COALESCE(SUM(${commissions.amount}), 0)`,
  }).from(commissions).where(and(eq(commissions.receivingPartnerId, partnerId), eq(commissions.paid, false)));

  return {
    partner: partner[0],
    inboundOpportunities: inboundCount?.total ?? 0,
    convertedOpportunities: convertedCount?.total ?? 0,
    outboundReferrals: outboundCount?.total ?? 0,
    pendingEarnings: Number(earnedResult?.total ?? 0),
  };
}

// --- Photo Intake Queue -------------------------------------------------------
// Import photoIntakeQueue lazily to avoid circular deps
async function getPhotoIntakeTable() {
  const { photoIntakeQueue } = await import("../drizzle/schema");
  return photoIntakeQueue;
}

export async function getPhotoQueue(limit = 50) {
  const db = await getDb();
  if (!db) return [];
  const photoIntakeQueue = await getPhotoIntakeTable();
  return db.select({
    id: photoIntakeQueue.id,
    partnerId: photoIntakeQueue.partnerId,
    source: photoIntakeQueue.source,
    photoUrl: photoIntakeQueue.photoUrl,
    externalJobName: photoIntakeQueue.externalJobName,
    serviceAddress: photoIntakeQueue.serviceAddress,
    serviceCity: photoIntakeQueue.serviceCity,
    status: photoIntakeQueue.status,
    aiResult: photoIntakeQueue.aiResult,
    errorMessage: photoIntakeQueue.errorMessage,
    receivedAt: photoIntakeQueue.receivedAt,
    processedAt: photoIntakeQueue.processedAt,
    jobId: photoIntakeQueue.jobId,
    businessName: partners.businessName,
  })
  .from(photoIntakeQueue)
  .leftJoin(partners, eq(photoIntakeQueue.partnerId, partners.id))
  .orderBy(desc(photoIntakeQueue.receivedAt))
  .limit(limit);
}

export async function getPhotoQueueStats() {
  const db = await getDb();
  if (!db) return { totalToday: 0, completedToday: 0, oppRate: 0, estLeadValue: 0 };
  const photoIntakeQueue = await getPhotoIntakeTable();
  const now = new Date();
  const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [todayResult] = await db.select({ total: count() })
    .from(photoIntakeQueue)
    .where(sql`${photoIntakeQueue.receivedAt} >= ${dayStart}`);
  const [completedResult] = await db.select({ total: count() })
    .from(photoIntakeQueue)
    .where(and(
      sql`${photoIntakeQueue.receivedAt} >= ${dayStart}`,
      eq(photoIntakeQueue.status, 'completed')
    ));
  const totalToday = todayResult?.total ?? 0;
  const completedToday = completedResult?.total ?? 0;
  const oppRate = totalToday > 0 ? Math.round((completedToday / totalToday) * 100) : 0;
  const [valueResult] = await db.select({
    total: sql<number>`COALESCE(SUM(${opportunities.estimatedJobValue}), 0)`,
  }).from(opportunities).where(sql`${opportunities.createdAt} >= ${dayStart}`);
  return {
    totalToday,
    completedToday,
    oppRate,
    estLeadValue: Number(valueResult?.total ?? 0),
  };
}

// --- Partner In-App Notifications --------------------------------------------
async function getPartnerNotificationsTable() {
  const { partnerNotifications } = await import("../drizzle/schema");
  return partnerNotifications;
}

export async function createPartnerNotification(data: {
  partnerId: number;
  type: "new_lead" | "lead_expired" | "commission_paid" | "approval" | "broadcast" | "system";
  title: string;
  message: string;
  actionUrl?: string;
  metadata?: Record<string, unknown>;
}) {
  const db = await getDb();
  if (!db) return null;
  const partnerNotifications = await getPartnerNotificationsTable();
  const [result] = await db.insert(partnerNotifications).values({
    partnerId: data.partnerId,
    type: data.type,
    title: data.title,
    message: data.message,
    actionUrl: data.actionUrl ?? null,
    isRead: false,
    metadata: data.metadata ?? null,
  });
  return result;
}

export async function getPartnerNotifications(partnerId: number, limit = 20) {
  const db = await getDb();
  if (!db) return [];
  const partnerNotifications = await getPartnerNotificationsTable();
  return db.select()
    .from(partnerNotifications)
    .where(eq(partnerNotifications.partnerId, partnerId))
    .orderBy(desc(partnerNotifications.createdAt))
    .limit(limit);
}

export async function getPartnerUnreadCount(partnerId: number) {
  const db = await getDb();
  if (!db) return 0;
  const partnerNotifications = await getPartnerNotificationsTable();
  const [result] = await db.select({ total: count() })
    .from(partnerNotifications)
    .where(and(eq(partnerNotifications.partnerId, partnerId), eq(partnerNotifications.isRead, false)));
  return result?.total ?? 0;
}

export async function markNotificationsRead(partnerId: number, notificationIds?: number[]) {
  const db = await getDb();
  if (!db) return;
  const partnerNotifications = await getPartnerNotificationsTable();
  if (notificationIds?.length) {
    await db.update(partnerNotifications)
      .set({ isRead: true })
      .where(and(
        eq(partnerNotifications.partnerId, partnerId),
        sql`${partnerNotifications.id} IN (${sql.join(notificationIds.map(id => sql`${id}`), sql`, `)})`
      ));
  } else {
    await db.update(partnerNotifications)
      .set({ isRead: true })
      .where(eq(partnerNotifications.partnerId, partnerId));
  }
}

// ─── Property Timeline helpers ────────────────────────────────────────────────
export async function getJobsByAddress(address: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    id: jobs.id,
    partnerId: jobs.partnerId,
    partnerName: partners.businessName,
    serviceAddress: jobs.serviceAddress,
    serviceType: jobs.serviceType,
    customerName: jobs.customerName,
    customerEmail: jobs.customerEmail,
    customerPhone: jobs.customerPhone,
    notes: jobs.notes,
    photoUrls: jobs.photoUrls,
    aiAnalysisStatus: jobs.aiAnalysisStatus,
    aiAnalysisResult: jobs.aiAnalysisResult,
    status: jobs.status,
    createdAt: jobs.createdAt,
  }).from(jobs)
    .leftJoin(partners, eq(jobs.partnerId, partners.id))
    .where(sql`LOWER(${jobs.serviceAddress}) LIKE LOWER(${'%' + address + '%'})`)
    .orderBy(desc(jobs.createdAt))
    .limit(100);
}

export async function getUniqueAddresses() {
  const db = await getDb();
  if (!db) return [];
  return db.select({
    serviceAddress: jobs.serviceAddress,
    jobCount: sql<number>`COUNT(*)`,
    lastJobAt: sql<Date>`MAX(${jobs.createdAt})`,
    partnerName: partners.businessName,
  }).from(jobs)
    .leftJoin(partners, eq(jobs.partnerId, partners.id))
    .groupBy(jobs.serviceAddress)
    .orderBy(desc(sql`MAX(${jobs.createdAt})`))
    .limit(200);
}
