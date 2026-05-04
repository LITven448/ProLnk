import { eq, and, desc, sql, count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import {
  InsertUser, users, partners, jobs, opportunities, commissions, broadcasts, industryRates,
  Partner, InsertPartner, InsertJob, InsertOpportunity,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;
let _pool: ReturnType<typeof mysql.createPool> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      // MySQL connection pool for TiDB Cloud
      _pool = mysql.createPool(process.env.DATABASE_URL);
      _db = drizzle(_pool);
    } catch (e) {
      console.error("[DB] Failed to connect:", e);
      return null;
    }
  }
  return _db;
}

export { eq, and, desc, sql, count };

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return rows[0] ?? null;
}

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return rows[0] ?? null;
}

export async function upsertUser(data: InsertUser) {
  const db = await getDb();
  if (!db) return null;
  const existing = await getUserByOpenId(data.openId);
  if (existing) {
    await db.update(users).set({ ...data, updatedAt: new Date() }).where(eq(users.openId, data.openId));
    return getUserByOpenId(data.openId);
  }
  await db.insert(users).values(data);
  return getUserByOpenId(data.openId);
}

export async function getPartnerByUserId(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(partners).where(eq(partners.userId, userId)).limit(1);
  return rows[0] ?? null;
}

export async function getPartnerById(id: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(partners).where(eq(partners.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getPartnerByEmail(email: string) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(partners).where(eq(partners.contactEmail, email)).limit(1);
  return rows[0] ?? null;
}

export async function createPartner(data: InsertPartner) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(partners).values(data);
  if (data.contactEmail) return getPartnerByEmail(data.contactEmail);
  return null;
}

export async function approvePartner(partnerId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(partners).set({ status: "approved", approvedAt: new Date(), updatedAt: new Date() }).where(eq(partners.id, partnerId));
}

export async function rejectPartner(partnerId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(partners).set({ status: "rejected", updatedAt: new Date() }).where(eq(partners.id, partnerId));
}

export async function linkPartnerToUser(partnerId: number, userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(partners).set({ userId, updatedAt: new Date() }).where(eq(partners.id, partnerId));
}

export async function createJob(data: InsertJob) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(jobs).values(data);
}

export async function getJobsByPartnerId(partnerId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(jobs).where(eq(jobs.partnerId, partnerId)).orderBy(desc(jobs.loggedAt));
}

export async function createOpportunity(data: InsertOpportunity) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(opportunities).values(data);
}

export async function getInboundOpportunitiesForPartner(partnerId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(opportunities)
    .where(and(eq(opportunities.receivingPartnerId, partnerId), eq(opportunities.status, "pending")))
    .orderBy(desc(opportunities.createdAt));
}

export async function markCommissionPaid(commissionId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(commissions).set({ paid: true, paidAt: new Date() }).where(eq(commissions.id, commissionId));
}

export async function getEarnedCommissionsByPartnerId(partnerId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(commissions).where(eq(commissions.partnerId, partnerId)).orderBy(desc(commissions.createdAt));
}

export async function getCommissionsByPartnerId(partnerId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(commissions).where(eq(commissions.receivingPartnerId, partnerId)).orderBy(desc(commissions.createdAt));
}

export async function getBroadcastsForPartner(partnerId: number, limit = 20) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(broadcasts).orderBy(desc(broadcasts.createdAt)).limit(limit);
}

export async function getIndustryRates() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(industryRates).orderBy(industryRates.serviceType);
}

export function calculateCommissionRates(
  jobValue: number,
  platformFeeRate = 0.12,
  referringRate = 0.04,
  receivingRate = 0.055
) {
  const platformFee = jobValue * platformFeeRate;
  const referringCommission = platformFee * (referringRate / platformFeeRate);
  const receivingCommission = platformFee * (receivingRate / platformFeeRate);
  return {
    jobValue,
    platformFee: Math.round(platformFee * 100) / 100,
    referringCommission: Math.round(referringCommission * 100) / 100,
    receivingCommission: Math.round(receivingCommission * 100) / 100,
    proLnkNet: Math.round((platformFee - referringCommission - receivingCommission) * 100) / 100,
  };
}

export async function createPartnerNotification(partnerId: number, message: string) {
  console.log(`Notification for partner ${partnerId}: ${message}`);
}

export async function getPendingPartners() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(partners).where(eq(partners.status, 'pending'));
}

export async function getAllPartners() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(partners);
}

export async function getApprovedPartners() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(partners).where(eq(partners.status, 'approved'));
}

export async function getJobById(jobId: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);
  return rows[0] ?? null;
}

export async function getAllJobs() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(jobs).orderBy(desc(jobs.loggedAt));
}

export async function getJobsByAddress(address: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(jobs).where(eq(jobs.address, address)).orderBy(desc(jobs.loggedAt));
}

export async function getUniqueAddresses() {
  const db = await getDb();
  if (!db) return [];
  return db.selectDistinct({ address: jobs.address }).from(jobs).orderBy(jobs.address);
}

export async function updatePartnerCommissionRates(partnerId: number, rates: { referringRate?: number; receivingRate?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(partners).set({ updatedAt: new Date(), ...rates }).where(eq(partners.id, partnerId));
}

export async function incrementPartnerStats(partnerId: number, stats: { jobsCompleted?: number; referrals?: number; revenue?: number }) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  const partner = await getPartnerById(partnerId);
  if (!partner) return;
  await db.update(partners).set({ updatedAt: new Date() }).where(eq(partners.id, partnerId));
}

export async function getAllOpportunities() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(opportunities).orderBy(desc(opportunities.createdAt));
}

export async function getOpportunitiesBySourcePartnerId(partnerId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(opportunities).where(eq(opportunities.sourcingPartnerId, partnerId)).orderBy(desc(opportunities.createdAt));
}

export async function getOpportunitiesByReceivingPartnerId(partnerId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(opportunities).where(eq(opportunities.receivingPartnerId, partnerId)).orderBy(desc(opportunities.createdAt));
}

export async function updateOpportunityStatus(opportunityId: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(opportunities).set({ status, updatedAt: new Date() }).where(eq(opportunities.id, opportunityId));
}

export async function updateJobAiAnalysis(jobId: number, analysis: any) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(jobs).set({ aiAnalysis: analysis, updatedAt: new Date() }).where(eq(jobs.id, jobId));
}

export async function closeOpportunityWithJobValue(opportunityId: number, jobValue: number) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.update(opportunities).set({ status: 'closed', jobValue, updatedAt: new Date() }).where(eq(opportunities.id, opportunityId));
}

export async function createBroadcast(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(broadcasts).values(data);
}

export async function getBroadcasts(limit = 50) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(broadcasts).orderBy(desc(broadcasts.createdAt)).limit(limit);
}

export async function getPartnerStats(partnerId: number) {
  const db = await getDb();
  if (!db) return null;
  const partner = await getPartnerById(partnerId);
  return partner ? { partnerId, stats: partner } : null;
}

export async function getNetworkStats() {
  const db = await getDb();
  if (!db) return { totalPartners: 0, totalJobs: 0, totalOpportunities: 0 };
  const partnerCount = await db.select({ count: count() }).from(partners);
  const jobCount = await db.select({ count: count() }).from(jobs);
  const oppCount = await db.select({ count: count() }).from(opportunities);
  return {
    totalPartners: partnerCount[0]?.count || 0,
    totalJobs: jobCount[0]?.count || 0,
    totalOpportunities: oppCount[0]?.count || 0,
  };
}

export async function getUnpaidCommissions() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(commissions).where(eq(commissions.paid, false)).orderBy(desc(commissions.createdAt));
}

export async function upsertIndustryRate(data: any) {
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");
  await db.insert(industryRates).values(data);
}

export async function getPhotoQueue() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(photoIntakeQueue || {}).orderBy(desc('createdAt'));
}

export async function getPhotoQueueStats() {
  const db = await getDb();
  if (!db) return { pending: 0, processed: 0 };
  return { pending: 0, processed: 0 };
}

export async function getPartnerNotifications(partnerId: number) {
  return [];
}

export async function getPartnerUnreadCount(partnerId: number) {
  return 0;
}

export async function markNotificationsRead(notificationIds: number[]) {
  return true;
}

export type { Partner };
