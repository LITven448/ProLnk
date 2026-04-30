/**
 * Partner Priority Score (PPS) Engine
 *
 * Calculates a 0-105 score for each approved partner that determines
 * their position in the lead routing queue. Higher score = first look at leads.
 *
 * Signal breakdown (max 100 base + 5 Founding Partner bonus = 105):
 *   Tier                   30 pts   enterprise=30, company=24, crew=18, pro=12, scout=6
 *   Lead close rate        20 pts   (closed / accepted)  20
 *   Lead acceptance rate   15 pts   (accepted / sent)  15
 *   Job photos uploaded    15 pts   min(photosUploaded / 50, 1)  15
 *   Customer review score  10 pts   (avgRating / 5)  min(reviewCount / 10, 1)  10
 *   Network referrals       5 pts   min(partnersReferred / 5, 1)  5
 *   Response speed          5 pts   <2h=5, <6h=4, <12h=3, <24h=1, 24h=0
 *   Founding Partner bonus +5 pts   flat bonus on top of base score
 */

import { getDb } from "../db";
import { partners, opportunities, jobs, partnerReviews } from "../../drizzle/schema";
import { eq, and, sql, count } from "drizzle-orm";

export interface PpsSignalBreakdown {
  tier: number;
  closeRate: number;
  acceptanceRate: number;
  photoScore: number;
  reviewScore: number;
  networkReferrals: number;
  responseSpeed: number;
  foundingBonus: number;
  total: number;
  // Raw inputs for display
  tierName: string;
  closeRateRaw: number;
  acceptanceRateRaw: number;
  photosUploaded: number;
  avgRating: number;
  reviewCount: number;
  partnersReferredCount: number;
  avgResponseHours: number;
}

const TIER_POINTS: Record<string, number> = {
  enterprise: 30,
  company: 24,
  crew: 18,
  pro: 12,
  scout: 6,
};

export async function calculatePartnerPriorityScore(partnerId: number): Promise<PpsSignalBreakdown | null> {
  const db = await getDb();
  if (!db) return null;

  // Fetch partner base data
  const [partner] = await db
    .select({
      id: partners.id,
      tier: partners.tier,
      isFoundingPartner: partners.isFoundingPartner,
      jobsLogged: partners.jobsLogged,
      partnersReferred: partners.partnersReferred,
      avgLeadResponseHours: partners.avgLeadResponseHours,
    })
    .from(partners)
    .where(eq(partners.id, partnerId))
    .limit(1);

  if (!partner) return null;

  // --- Signal 1: Tier (30 pts) ---
  const tierPts = TIER_POINTS[partner.tier] ?? 6;

  // --- Signals 2 & 3: Lead close rate (20 pts) + acceptance rate (15 pts) ---
  const [leadStats] = await db.execute(sql`
    SELECT
      COUNT(*) as totalSent,
      SUM(CASE WHEN status IN ('accepted', 'closed', 'completed') THEN 1 ELSE 0 END) as accepted,
      SUM(CASE WHEN status IN ('closed', 'completed') THEN 1 ELSE 0 END) as closed
    FROM opportunities
    WHERE receivingPartnerId = ${partnerId}
      AND adminReviewStatus = 'approved'
  `) as any;

  const stats = (leadStats as any[])[0] ?? {};
  const totalSent = Number(stats.totalSent ?? 0);
  const accepted = Number(stats.accepted ?? 0);
  const closed = Number(stats.closed ?? 0);

  const acceptanceRate = totalSent > 0 ? accepted / totalSent : 0;
  const closeRate = accepted > 0 ? closed / accepted : 0;

  const acceptancePts = Math.round(acceptanceRate * 15 * 10) / 10;
  const closePts = Math.round(closeRate * 20 * 10) / 10;

  // --- Signal 4: Job photos uploaded (15 pts) ---
  // Count distinct photos across all jobs for this partner
  const [photoStats] = await db.execute(sql`
    SELECT COUNT(*) as jobCount FROM jobs WHERE partnerId = ${partnerId}
  `) as any;
  const photoJobCount = Number((photoStats as any[])[0]?.jobCount ?? 0);
  // Use jobsLogged as proxy for photos (each job = at least 1 photo)
  const photosUploaded = Math.max(photoJobCount, partner.jobsLogged ?? 0);
  const photoPts = Math.round(Math.min(photosUploaded / 50, 1) * 15 * 10) / 10;

  // --- Signal 5: Customer review score (10 pts) ---
  const [reviewStats] = await db.execute(sql`
    SELECT 
      COALESCE(AVG(rating), 0) as avgRating,
      COUNT(*) as reviewCount
    FROM partnerReviews
    WHERE partnerId = ${partnerId}
  `) as any;
  const reviewRow = (reviewStats as any[])[0] ?? {};
  const avgRating = parseFloat(reviewRow.avgRating ?? "0");
  const reviewCount = Number(reviewRow.reviewCount ?? 0);
  // Weight by review count -- need at least 10 reviews for full weight
  const reviewWeight = Math.min(reviewCount / 10, 1);
  const reviewPts = Math.round((avgRating / 5) * reviewWeight * 10 * 10) / 10;

  // --- Signal 6: Network referrals (5 pts) ---
  const partnersReferredCount = partner.partnersReferred ?? 0;
  const networkPts = Math.round(Math.min(partnersReferredCount / 5, 1) * 5 * 10) / 10;

  // --- Signal 7: Response speed (5 pts) ---
  const avgHours = parseFloat(String(partner.avgLeadResponseHours ?? "24"));
  let speedPts: number;
  if (avgHours < 2) speedPts = 5;
  else if (avgHours < 6) speedPts = 4;
  else if (avgHours < 12) speedPts = 3;
  else if (avgHours < 24) speedPts = 1;
  else speedPts = 0;

  // --- Founding Partner bonus (+5 flat) ---
  const foundingBonus = partner.isFoundingPartner ? 5 : 0;

  const base = tierPts + closePts + acceptancePts + photoPts + reviewPts + networkPts + speedPts;
  const total = Math.min(Math.round((base + foundingBonus) * 10) / 10, 105);

  return {
    tier: tierPts,
    closeRate: closePts,
    acceptanceRate: acceptancePts,
    photoScore: photoPts,
    reviewScore: reviewPts,
    networkReferrals: networkPts,
    responseSpeed: speedPts,
    foundingBonus,
    total,
    // Raw inputs
    tierName: partner.tier,
    closeRateRaw: Math.round(closeRate * 100),
    acceptanceRateRaw: Math.round(acceptanceRate * 100),
    photosUploaded,
    avgRating,
    reviewCount,
    partnersReferredCount,
    avgResponseHours: avgHours,
  };
}

/**
 * Recalculate PPS for all approved partners and persist to DB.
 * Called nightly by the background sweep job.
 */
export async function recalculateAllPartnerScores(): Promise<{ updated: number; errors: number }> {
  const db = await getDb();
  if (!db) return { updated: 0, errors: 0 };

  const allPartners = await db
    .select({ id: partners.id })
    .from(partners)
    .where(eq(partners.status, "approved"));

  let updated = 0;
  let errors = 0;

  for (const p of allPartners) {
    try {
      const breakdown = await calculatePartnerPriorityScore(p.id);
      if (!breakdown) continue;
      await db
        .update(partners)
        .set({ priorityScore: Math.round(breakdown.total) })
        .where(eq(partners.id, p.id));
      updated++;
    } catch (err) {
      console.error(`[PPS] Failed to calculate score for partner #${p.id}:`, err);
      errors++;
    }
  }

  console.log(`[PPS] Recalculated scores for ${updated} partners (${errors} errors)`);
  return { updated, errors };
}

/**
 * Update a single partner's response speed metric when they accept a lead.
 * Uses a rolling average: newAvg = (oldAvg * (n-1) + newHours) / n
 */
export async function updatePartnerResponseSpeed(
  partnerId: number,
  sentAt: Date,
  acceptedAt: Date
): Promise<void> {
  const db = await getDb();
  if (!db) return;

  const hoursToAccept = (acceptedAt.getTime() - sentAt.getTime()) / (1000 * 60 * 60);

  // Get current avg and accepted count to compute rolling average
  const [current] = await db
    .select({ avgLeadResponseHours: partners.avgLeadResponseHours, leadsCount: partners.leadsCount })
    .from(partners)
    .where(eq(partners.id, partnerId))
    .limit(1);

  if (!current) return;

  const n = Math.max(Number(current.leadsCount ?? 0), 1);
  const oldAvg = parseFloat(String(current.avgLeadResponseHours ?? "24"));
  const newAvg = (oldAvg * (n - 1) + hoursToAccept) / n;

  await db
    .update(partners)
    .set({ avgLeadResponseHours: String(Math.round(newAvg * 100) / 100) })
    .where(eq(partners.id, partnerId));
}
