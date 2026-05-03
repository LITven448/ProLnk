import { eq, and, desc, sql, count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  InsertUser, users, partners, jobs, opportunities, commissions, broadcasts, industryRates,
  Partner, InsertPartner, InsertJob, InsertOpportunity,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;
let _client: ReturnType<typeof postgres> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _client = postgres(process.env.DATABASE_URL, { prepare: false, ssl: "require" });
      _db = drizzle(_client);
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

export type { Partner };
