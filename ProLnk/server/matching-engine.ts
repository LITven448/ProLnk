/**
 * ProLnk Matching Engine — the core marketplace primitive.
 *
 * Turns a structured `opportunity` (a homeowner/Scout job request) into a ranked
 * list of eligible partners. The output feeds the offer/accept/decline cascade
 * (see server/routers/matching via the `matching` tRPC router).
 *
 * ── Eligibility (hard filters) ────────────────────────────────────────────────
 *   1. Partner status is active/approved and not suspended
 *   2. Trade/category matches the opportunity (businessType ⇆ opportunityCategory)
 *   3. The opportunity's ZIP is in the partner's service area
 *        (serviceZipCodes JSON array, OR within serviceRadiusMiles of the partner
 *         centroid when geo is available). If neither signal is present we keep the
 *         partner (defensive — never crash on missing data).
 *   4. Partner is not at their weekly lead cap
 *
 * ── Scoring (soft ranking) ────────────────────────────────────────────────────
 * Each signal contributes additively to a 0..~100 score. Signals that are absent
 * in the schema/data are simply omitted (weight 0) so the engine degrades
 * gracefully rather than throwing.
 *
 *   TIER          (max 30)  Business > Pro > Crew > Company > Enterprise ranking.
 *                           Founding/exempt partners get a priority bump.
 *   ZIP / PROXIMITY (max 25) Exact ZIP-in-service-area match scores full; otherwise
 *                           distance-decayed from the partner centroid.
 *   CAPACITY      (max 15)  More remaining weekly capacity = higher score.
 *   RESPONSIVENESS(max 15)  Faster avgLeadResponseHours = higher score.
 *   RATING        (max 10)  rating (0..5) scaled.
 *   PRIORITY      (max  5)  Blended in from the nightly Partner Priority Score.
 *
 * The weights are intentionally documented here so they can be tuned in one place.
 */

import { getDb } from "./db";
import { getZipInfo } from "../shared/dfw-zipcodes";

export const SCORING_WEIGHTS = {
  tier: 30,
  proximity: 25,
  capacity: 15,
  responsiveness: 15,
  rating: 10,
  priority: 5,
} as const;

// Higher = better. Business tier is the platform's premium tier; map the
// 5-tier ladder (scout..enterprise) plus the marketing tiers (core/pro/business).
const TIER_RANK: Record<string, number> = {
  enterprise: 5,
  business: 5,
  company: 4,
  crew: 3,
  pro: 2,
  core: 1,
  scout: 0,
};

export interface MatchPartnerSignals {
  id: number;
  businessName?: string | null;
  businessType?: string | null;
  tier?: string | null;
  status?: string | null;
  suspendedAt?: Date | string | null;
  isFoundingPartner?: boolean | null;
  isExempt?: boolean | null;
  priorityScore?: number | null;
  serviceZipCodes?: string[] | null;
  serviceAreaLat?: string | number | null;
  serviceAreaLng?: string | number | null;
  serviceRadiusMiles?: number | null;
  weeklyLeadCap?: number | null;
  weeklyLeadsReceived?: number | null;
  avgLeadResponseHours?: string | number | null;
  rating?: string | number | null;
}

export interface OpportunityForMatch {
  id: number;
  opportunityCategory?: string | null;
  opportunityType?: string | null;
  jobZip?: string | null;
  estimatedJobValue?: string | number | null;
  sourcePartnerId?: number | null;
}

export interface RankedPartner {
  partnerId: number;
  businessName?: string | null;
  score: number;
  reasons: string[];
}

function toNum(v: unknown, fallback = 0): number {
  if (v === null || v === undefined) return fallback;
  const n = typeof v === "number" ? v : parseFloat(String(v));
  return Number.isFinite(n) ? n : fallback;
}

function haversineMiles(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/** Trade/category match: tolerant substring/token overlap between the partner's
 *  businessType and the opportunity's category/type. */
export function tradeMatches(partnerBusinessType: string | null | undefined, opp: OpportunityForMatch): boolean {
  const bt = normalize(partnerBusinessType ?? "");
  if (!bt) return false;
  const targets = [opp.opportunityCategory, opp.opportunityType]
    .filter((x): x is string => !!x)
    .map(normalize);
  if (targets.length === 0) return true; // no category constraint → don't exclude
  return targets.some((t) => {
    if (!t) return false;
    if (bt.includes(t) || t.includes(bt)) return true;
    const btTokens = new Set(bt.split(" ").filter((w) => w.length > 2));
    const tTokens = t.split(" ").filter((w) => w.length > 2);
    return tTokens.some((tok) => btTokens.has(tok));
  });
}

interface ProximityResult {
  inServiceArea: boolean;
  distanceMiles: number | null;
}

/** Determine whether the opportunity's ZIP is in the partner's service area, and
 *  the centroid distance when geo is available. Defensive: if no ZIP and no geo,
 *  treats the partner as eligible (returns inServiceArea=true, distance=null). */
export function evaluateProximity(partner: MatchPartnerSignals, jobZip: string | null | undefined): ProximityResult {
  const zips = Array.isArray(partner.serviceZipCodes) ? partner.serviceZipCodes : [];
  const hasGeo =
    partner.serviceAreaLat != null &&
    partner.serviceAreaLng != null &&
    jobZip != null;

  // Direct ZIP membership is the strongest signal.
  if (jobZip && zips.length > 0) {
    if (zips.includes(jobZip)) {
      return { inServiceArea: true, distanceMiles: 0 };
    }
    // ZIP known but not listed — fall through to geo radius if possible.
  }

  if (hasGeo) {
    const zipInfo = getZipInfo(String(jobZip));
    if (zipInfo) {
      const dist = haversineMiles(
        zipInfo.lat,
        zipInfo.lng,
        toNum(partner.serviceAreaLat),
        toNum(partner.serviceAreaLng)
      );
      const radius = toNum(partner.serviceRadiusMiles, 15) || 15;
      return { inServiceArea: dist <= radius, distanceMiles: dist };
    }
  }

  // No usable location signal on either side → don't exclude (defensive).
  if (zips.length === 0 && !hasGeo) {
    return { inServiceArea: true, distanceMiles: null };
  }

  // We had ZIP data but no match and no geo fallback → not in area.
  if (jobZip && zips.length > 0) {
    return { inServiceArea: false, distanceMiles: null };
  }

  return { inServiceArea: true, distanceMiles: null };
}

function atCapacity(partner: MatchPartnerSignals): boolean {
  const cap = toNum(partner.weeklyLeadCap, 0);
  if (cap <= 0) return false; // 0 = unlimited
  return toNum(partner.weeklyLeadsReceived, 0) >= cap;
}

/** The ONLY partner statuses the matcher (SQL filter + isActive) treats as
 *  eligible. Exported so the activation flow can assert its output status is one
 *  the matcher will actually consider. */
export function isMatchEligibleStatus(status: string | null | undefined): boolean {
  const s = (status ?? "").toLowerCase();
  return s === "approved" || s === "active";
}

function isActive(partner: MatchPartnerSignals): boolean {
  return isMatchEligibleStatus(partner.status) && !partner.suspendedAt;
}

/** Pure scoring function — given an eligible partner + proximity, produce a score
 *  and human-readable reasons. Exported for unit testing. */
export function scorePartner(
  partner: MatchPartnerSignals,
  proximity: ProximityResult,
  opp: OpportunityForMatch
): { score: number; reasons: string[] } {
  const reasons: string[] = [];
  let score = 0;

  // Tier
  const tierKey = (partner.tier ?? "scout").toLowerCase();
  const tierRank = TIER_RANK[tierKey] ?? 0;
  const tierScore = (tierRank / 5) * SCORING_WEIGHTS.tier;
  score += tierScore;
  reasons.push(`tier=${tierKey} (+${tierScore.toFixed(0)})`);
  if (partner.isFoundingPartner || partner.isExempt) {
    score += 5;
    reasons.push("founding/exempt priority (+5)");
  }

  // Proximity
  if (proximity.distanceMiles === 0) {
    score += SCORING_WEIGHTS.proximity;
    reasons.push(`ZIP ${opp.jobZip ?? ""} in service area (+${SCORING_WEIGHTS.proximity})`);
  } else if (proximity.distanceMiles != null) {
    const decay = Math.max(0, 1 - proximity.distanceMiles / 30);
    const proxScore = decay * SCORING_WEIGHTS.proximity;
    score += proxScore;
    reasons.push(`~${proximity.distanceMiles.toFixed(1)}mi away (+${proxScore.toFixed(0)})`);
  } else {
    reasons.push("no proximity signal (+0)");
  }

  // Capacity (remaining headroom)
  const cap = toNum(partner.weeklyLeadCap, 0);
  if (cap > 0) {
    const used = toNum(partner.weeklyLeadsReceived, 0);
    const remaining = Math.max(0, cap - used);
    const capScore = (remaining / cap) * SCORING_WEIGHTS.capacity;
    score += capScore;
    reasons.push(`${remaining}/${cap} weekly capacity (+${capScore.toFixed(0)})`);
  } else {
    score += SCORING_WEIGHTS.capacity;
    reasons.push(`unlimited capacity (+${SCORING_WEIGHTS.capacity})`);
  }

  // Responsiveness (lower hours = better; 0h→full, >=24h→0)
  if (partner.avgLeadResponseHours != null) {
    const hours = toNum(partner.avgLeadResponseHours, 24);
    const respScore = Math.max(0, 1 - hours / 24) * SCORING_WEIGHTS.responsiveness;
    score += respScore;
    reasons.push(`avg ${hours.toFixed(1)}h response (+${respScore.toFixed(0)})`);
  }

  // Rating (0..5)
  if (partner.rating != null) {
    const rating = toNum(partner.rating, 0);
    if (rating > 0) {
      const ratingScore = (Math.min(rating, 5) / 5) * SCORING_WEIGHTS.rating;
      score += ratingScore;
      reasons.push(`rating ${rating.toFixed(1)} (+${ratingScore.toFixed(0)})`);
    }
  }

  // Priority score (nightly PPS), blended lightly
  if (partner.priorityScore != null) {
    const pps = toNum(partner.priorityScore, 0);
    const ppsScore = (Math.min(pps, 105) / 105) * SCORING_WEIGHTS.priority;
    score += ppsScore;
    reasons.push(`PPS ${pps} (+${ppsScore.toFixed(0)})`);
  }

  return { score: Math.round(score * 100) / 100, reasons };
}

/** Pure ranking over an in-memory candidate set. Applies hard filters then scores.
 *  Exported so it can be unit-tested without a database. */
export function rankPartners(
  partners: MatchPartnerSignals[],
  opp: OpportunityForMatch
): RankedPartner[] {
  const ranked: RankedPartner[] = [];
  for (const p of partners) {
    if (p.id === opp.sourcePartnerId) continue;
    if (!isActive(p)) continue;
    if (!tradeMatches(p.businessType, opp)) continue;
    const proximity = evaluateProximity(p, opp.jobZip);
    if (!proximity.inServiceArea) continue;
    if (atCapacity(p)) continue;
    const { score, reasons } = scorePartner(p, proximity, opp);
    ranked.push({ partnerId: p.id, businessName: p.businessName ?? null, score, reasons });
  }
  return ranked.sort((a, b) => b.score - a.score);
}

/** Load the opportunity + all candidate partners and return a ranked list.
 *  This is the public entry point used by the matching tRPC router. */
export async function rankPartnersForOpportunity(opportunityId: number): Promise<RankedPartner[]> {
  const db = await getDb();
  if (!db) return [];

  const oppRows = (await (db as any).execute(
    `SELECT id, opportunityCategory, opportunityType, jobZip, estimatedJobValue, sourcePartnerId
     FROM opportunities WHERE id = ? LIMIT 1`,
    [opportunityId]
  )) as any;
  const oppRow = oppRows?.[0]?.[0] ?? oppRows?.rows?.[0] ?? oppRows?.[0];
  if (!oppRow) return [];

  const opp: OpportunityForMatch = {
    id: toNum(oppRow.id, opportunityId),
    opportunityCategory: oppRow.opportunityCategory ?? null,
    opportunityType: oppRow.opportunityType ?? null,
    jobZip: oppRow.jobZip ?? null,
    estimatedJobValue: oppRow.estimatedJobValue ?? null,
    sourcePartnerId: oppRow.sourcePartnerId ?? null,
  };

  const partnerRows = (await (db as any).execute(
    `SELECT id, businessName, businessType, tier, status, suspendedAt,
            isFoundingPartner, isExempt, priorityScore, serviceZipCodes,
            serviceAreaLat, serviceAreaLng, serviceRadiusMiles,
            weeklyLeadCap, weeklyLeadsReceived, avgLeadResponseHours, rating
     FROM partners
     WHERE status IN ('approved','active') AND suspendedAt IS NULL`
  )) as any;
  const rows: any[] = partnerRows?.[0] ?? partnerRows?.rows ?? partnerRows ?? [];

  const candidates: MatchPartnerSignals[] = rows.map((r) => ({
    id: toNum(r.id),
    businessName: r.businessName,
    businessType: r.businessType,
    tier: r.tier,
    status: r.status,
    suspendedAt: r.suspendedAt,
    isFoundingPartner: !!r.isFoundingPartner,
    isExempt: !!r.isExempt,
    priorityScore: r.priorityScore != null ? toNum(r.priorityScore) : null,
    serviceZipCodes: parseZips(r.serviceZipCodes),
    serviceAreaLat: r.serviceAreaLat,
    serviceAreaLng: r.serviceAreaLng,
    serviceRadiusMiles: r.serviceRadiusMiles != null ? toNum(r.serviceRadiusMiles) : null,
    weeklyLeadCap: r.weeklyLeadCap != null ? toNum(r.weeklyLeadCap) : null,
    weeklyLeadsReceived: r.weeklyLeadsReceived != null ? toNum(r.weeklyLeadsReceived) : null,
    avgLeadResponseHours: r.avgLeadResponseHours,
    rating: r.rating,
  }));

  return rankPartners(candidates, opp);
}

function parseZips(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map((z) => String(z));
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.map((z) => String(z)) : [];
    } catch {
      return [];
    }
  }
  return [];
}
