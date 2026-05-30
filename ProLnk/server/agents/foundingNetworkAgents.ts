/**
 * Founding Network Agents
 *
 * Seven agents that power the ProLnk Founding Partner Network:
 *   1. Enrollment Agent        — validates applicants, enforces tier caps
 *   2. Commission Distribution — calculates and distributes platform fee per job
 *   3. Home Origination Lock   — locks address origination rights (first-claim)
 *   4. Photo Attribution       — records photo upload credit for AI-detected jobs
 *   5. Network Genealogy       — traces upline/downline recruiting trees
 *   6. Compliance Agent        — flags inactive founding members
 *   7. Tier Promotion Agent    — reports tier fill status and cap state
 */

import { getPool } from "../db";
import { notifyInactivePartners, notifyTierFull } from "./notificationService";

// ─── Tier Configuration ───────────────────────────────────────────────────────

const TIER_CAPS = {
  charter: 25,
  founding: 125,
  level3: 525,
  level4: 2125,
} as const;

type FoundingTier = keyof typeof TIER_CAPS;

const NETWORK_RATES = {
  l1: 0.07,
  l2: 0.04,
  l3: 0.02,
  l4: 0.01,
  originator: 0.05,
} as const;

const PROLNK_FLOOR = 0.20;

// ─── Return Types ─────────────────────────────────────────────────────────────

export interface EnrollmentResult {
  approved: boolean;
  tier: string | null;
  position: number;
  reason?: string;
}

export interface DistributionResult {
  jobId: string;
  platformFee: number;
  originatorPayout: number;
  networkPayouts: Array<{ userId: string; level: number; amount: number; rate: number }>;
  prolnkRetained: number;
  floorApplied: boolean;
}

export interface OriginationLockResult {
  locked: boolean;
  isNewClaim: boolean;
  existingOriginatorEmail?: string;
}

export interface PhotoAttributionResult {
  attributionId: string;
  proEmail: string;
  address: string;
  timestamp: Date;
}

export interface GenealogyNode {
  id: number;
  userId: string;
  referralCode: string;
  networkLevel: number;
  level: number;
}

export interface GenealogyResult {
  upline: GenealogyNode[];
  downline: GenealogyNode[][];
  totalNetwork: number;
}

export interface ComplianceReport {
  totalActive: number;
  warnings: number;
  inactive: number;
  flaggedIds: number[];
}

export interface TierUpdateResult {
  charterFull: boolean;
  foundingFull: boolean;
  l3Full: boolean;
  l4Full: boolean;
  counts: Record<string, number>;
}

// ─── 1. Founding Network Enrollment Agent ────────────────────────────────────

export async function runEnrollmentAgent(applicantId: number): Promise<EnrollmentResult> {
  console.log('[EnrollmentAgent] Starting enrollment check for applicantId:', applicantId);

  try {
    const pool = await getPool();
    if (!pool) return { approved: false, tier: null, position: 0, reason: 'Database unavailable' };

    const [rows] = await pool.execute<any[]>(
      `SELECT id, email, businessName, trades, status FROM proWaitlist WHERE id = ? LIMIT 1`,
      [applicantId]
    );

    if (!rows.length) {
      return { approved: false, tier: null, position: 0, reason: 'Applicant not found' };
    }

    const applicant = rows[0];

    if (!applicant.email || !applicant.businessName) {
      return { approved: false, tier: null, position: 0, reason: 'Missing required fields: email or businessName' };
    }

    const tradesRaw = applicant.trades;
    const trades = typeof tradesRaw === 'string' ? JSON.parse(tradesRaw) : tradesRaw;
    if (!trades || !Array.isArray(trades) || trades.length === 0) {
      return { approved: false, tier: null, position: 0, reason: 'No trade specified' };
    }

    const [[countRow]] = await pool.execute<any[]>(
      `SELECT COUNT(*) as total FROM proWaitlist WHERE status = 'approved'`
    );
    const totalApproved = Number(countRow.total);

    const tierOrder: FoundingTier[] = ['charter', 'founding', 'level3', 'level4'];
    const tierCumCaps = { charter: 25, founding: 125, level3: 525, level4: 2125 };

    let assignedTier: FoundingTier | null = null;
    for (const tier of tierOrder) {
      if (totalApproved < tierCumCaps[tier]) {
        assignedTier = tier;
        break;
      }
    }

    if (!assignedTier) {
      return { approved: false, tier: null, position: 0, reason: 'All founding network tiers are at capacity (2,125 total)' };
    }

    await pool.execute(
      `UPDATE proWaitlist SET status = 'approved', approvedAt = NOW(), updatedAt = NOW() WHERE id = ?`,
      [applicantId]
    );

    const position = totalApproved + 1;
    console.log('[EnrollmentAgent] Approved:', applicant.businessName, '→ tier:', assignedTier, 'position:', position);

    return { approved: true, tier: assignedTier, position };
  } catch (err) {
    console.log('[EnrollmentAgent] Error:', err);
    return { approved: false, tier: null, position: 0, reason: 'Enrollment agent error — database may not be seeded yet' };
  }
}

// ─── 2. Commission Pool Distribution Agent ───────────────────────────────────

export async function runCommissionDistributionAgent(params: {
  jobId: string;
  completingProEmail: string;
  jobValue: number;
  platformFeeRate: number;
  propertyAddress: string;
}): Promise<DistributionResult> {
  const { jobId, completingProEmail, jobValue, platformFeeRate, propertyAddress } = params;
  console.log('[CommissionDistributionAgent] Processing job:', jobId, 'pro:', completingProEmail, 'value:', jobValue);

  const defaultResult: DistributionResult = {
    jobId,
    platformFee: 0,
    originatorPayout: 0,
    networkPayouts: [],
    prolnkRetained: 0,
    floorApplied: false,
  };

  try {
    const pool = await getPool();
    if (!pool) return defaultResult;

    const platformFee = Math.round(jobValue * Math.min(Math.max(platformFeeRate, 0.06), 0.15) * 100) / 100;

    const [proRows] = await pool.execute<any[]>(
      `SELECT p.userId, p.referredByUserId, p.referralCode FROM pro_network_profile p
       JOIN proWaitlist w ON w.email = ?
       LIMIT 1`,
      [completingProEmail]
    ).catch(() => [[]] as any);

    let uplineChain: Array<{ userId: string; level: number }> = [];

    if (proRows.length) {
      const proUserId = proRows[0].userId;

      const [chainRows] = await pool.execute<any[]>(
        `SELECT uplineUserId as userId, levelsAbove as level FROM pro_upline_chain
         WHERE proUserId = ? AND levelsAbove <= 4 ORDER BY levelsAbove`,
        [proUserId]
      ).catch(() => [[]] as any);

      uplineChain = chainRows.slice(0, 4);
    }

    const addressHash = Buffer.from(propertyAddress.toLowerCase().trim()).toString('hex').slice(0, 64);
    const [originRows] = await pool.execute<any[]>(
      `SELECT proUserId FROM home_documentation WHERE addressHash = ? AND isFirstDocumentation = 1 LIMIT 1`,
      [addressHash]
    ).catch(() => [[]] as any);

    const originatorUserId = originRows.length ? originRows[0].proUserId : null;

    const rates = [NETWORK_RATES.l1, NETWORK_RATES.l2, NETWORK_RATES.l3, NETWORK_RATES.l4];
    const networkPayouts = uplineChain.map((node) => ({
      userId: node.userId,
      level: node.level,
      amount: Math.round(platformFee * (rates[node.level - 1] ?? 0) * 100) / 100,
      rate: rates[node.level - 1] ?? 0,
    }));

    const originatorPayout = originatorUserId
      ? Math.round(platformFee * NETWORK_RATES.originator * 100) / 100
      : 0;

    let totalDistributed = networkPayouts.reduce((s, p) => s + p.amount, 0) + originatorPayout;
    const maxDistributable = platformFee * (1 - PROLNK_FLOOR);
    let floorApplied = false;

    if (totalDistributed > maxDistributable) {
      floorApplied = true;
      const scale = maxDistributable / totalDistributed;
      for (const p of networkPayouts) p.amount = Math.round(p.amount * scale * 100) / 100;
      totalDistributed = networkPayouts.reduce((s, p) => s + p.amount, 0) + Math.round(originatorPayout * scale * 100) / 100;
    }

    const prolnkRetained = Math.round((platformFee - totalDistributed) * 100) / 100;

    console.log('[CommissionDistributionAgent] Fee:', platformFee, '| Network:', totalDistributed, '| ProLnk:', prolnkRetained, '| FloorApplied:', floorApplied);

    return { jobId, platformFee, originatorPayout, networkPayouts, prolnkRetained, floorApplied };
  } catch (err) {
    console.log('[CommissionDistributionAgent] Error:', err);
    return defaultResult;
  }
}

// ─── 3. Home Origination Lock Agent ──────────────────────────────────────────

export async function runOriginationLockAgent(params: {
  proEmail: string;
  propertyAddress: string;
  photos: string[];
}): Promise<OriginationLockResult> {
  const { proEmail, propertyAddress } = params;
  const normalizedAddress = propertyAddress.toLowerCase().trim();
  const addressHash = Buffer.from(normalizedAddress).toString('hex').slice(0, 64);

  console.log('[OriginationLockAgent] Checking claim for:', normalizedAddress, 'by:', proEmail);

  try {
    const pool = await getPool();
    if (!pool) return { locked: false, isNewClaim: false };

    const [existingRows] = await pool.execute<any[]>(
      `SELECT d.proUserId, w.email as proEmail
       FROM home_documentation d
       LEFT JOIN proWaitlist w ON w.email = d.proUserId
       WHERE d.addressHash = ? LIMIT 1`,
      [addressHash]
    );

    if (existingRows.length) {
      const existingEmail = existingRows[0].proEmail || existingRows[0].proUserId;
      console.log('[OriginationLockAgent] Address already claimed by:', existingEmail);
      return { locked: false, isNewClaim: false, existingOriginatorEmail: existingEmail };
    }

    await pool.execute(
      `INSERT INTO home_documentation
         (proUserId, addressHash, fullAddress, isFirstDocumentation, originationCreditEarned, originationCreditAmount, documentedAt)
       VALUES (?, ?, ?, 1, 0, 0.00, NOW())`,
      [proEmail, addressHash, normalizedAddress]
    );

    console.log('[OriginationLockAgent] New claim locked for:', proEmail, 'at:', normalizedAddress);
    return { locked: true, isNewClaim: true };
  } catch (err) {
    console.log('[OriginationLockAgent] Error:', err);
    return { locked: false, isNewClaim: false };
  }
}

// ─── 4. Photo Attribution Agent ──────────────────────────────────────────────

export async function runPhotoAttributionAgent(params: {
  photoUrl: string;
  uploaderEmail: string;
  propertyAddress: string;
  jobId?: string;
}): Promise<PhotoAttributionResult> {
  const { uploaderEmail, propertyAddress, jobId } = params;
  const timestamp = new Date();
  const attributionId = `attr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  console.log('[PhotoAttributionAgent] Recording attribution for:', uploaderEmail, 'at:', propertyAddress, 'job:', jobId ?? 'none');

  try {
    const pool = await getPool();
    if (!pool) return { attributionId, proEmail: uploaderEmail, address: propertyAddress, timestamp };

    const normalizedAddress = propertyAddress.toLowerCase().trim();
    const addressHash = Buffer.from(normalizedAddress).toString('hex').slice(0, 64);

    const [existing] = await pool.execute<any[]>(
      `SELECT id FROM home_documentation WHERE addressHash = ? LIMIT 1`,
      [addressHash]
    );

    if (!existing.length) {
      await pool.execute(
        `INSERT INTO home_documentation
           (proUserId, addressHash, fullAddress, isFirstDocumentation, originationCreditEarned, originationCreditAmount, documentedAt)
         VALUES (?, ?, ?, 1, 1, 0.25, NOW())`,
        [uploaderEmail, addressHash, normalizedAddress]
      );
      console.log('[PhotoAttributionAgent] First-time documentation recorded for address; origination credit: $0.25');
    } else {
      console.log('[PhotoAttributionAgent] Address already documented; attribution recorded without origination credit');
    }
  } catch (err) {
    console.log('[PhotoAttributionAgent] DB write error (non-fatal):', err);
  }

  return { attributionId, proEmail: uploaderEmail, address: propertyAddress, timestamp };
}

// ─── 5. Network Genealogy Agent ──────────────────────────────────────────────

export async function runGenealogyAgent(partnerId: number): Promise<GenealogyResult> {
  console.log('[GenealogyAgent] Building network tree for partnerId:', partnerId);

  const emptyResult: GenealogyResult = { upline: [], downline: [], totalNetwork: 0 };

  try {
    const pool = await getPool();
    if (!pool) return emptyResult;

    const [rootRows] = await pool.execute<any[]>(
      `SELECT id, userId, referralCode, networkLevel, referredByUserId FROM pro_network_profile WHERE id = ? LIMIT 1`,
      [partnerId]
    );

    if (!rootRows.length) return emptyResult;

    const root = rootRows[0];

    const upline: GenealogyNode[] = [];
    let currentUserId = root.referredByUserId;
    for (let level = 1; level <= 4 && currentUserId; level++) {
      const [upRows] = await pool.execute<any[]>(
        `SELECT id, userId, referralCode, networkLevel, referredByUserId FROM pro_network_profile WHERE userId = ? LIMIT 1`,
        [currentUserId]
      ).catch(() => [[]] as any);

      if (!upRows.length) break;
      upline.push({ id: upRows[0].id, userId: upRows[0].userId, referralCode: upRows[0].referralCode, networkLevel: upRows[0].networkLevel, level });
      currentUserId = upRows[0].referredByUserId;
    }

    const downline: GenealogyNode[][] = [];
    let currentLevel = [root.userId];

    for (let depth = 1; depth <= 4 && currentLevel.length; depth++) {
      const placeholders = currentLevel.map(() => '?').join(',');
      const [downRows] = await pool.execute<any[]>(
        `SELECT id, userId, referralCode, networkLevel FROM pro_network_profile
         WHERE referredByUserId IN (${placeholders}) LIMIT 100`,
        currentLevel
      ).catch(() => [[]] as any);

      if (!downRows.length) break;
      downline.push(downRows.map((r: any) => ({ id: r.id, userId: r.userId, referralCode: r.referralCode, networkLevel: r.networkLevel, level: depth })));
      currentLevel = downRows.map((r: any) => r.userId);
    }

    const totalNetwork = upline.length + downline.reduce((s, lvl) => s + lvl.length, 0);
    console.log('[GenealogyAgent] Upline:', upline.length, '| Downline levels:', downline.length, '| Total:', totalNetwork);

    return { upline, downline, totalNetwork };
  } catch (err) {
    console.log('[GenealogyAgent] Error:', err);
    return emptyResult;
  }
}

// ─── 6. Founding Network Compliance Agent ────────────────────────────────────

export async function runComplianceCheckAgent(): Promise<ComplianceReport> {
  console.log('[ComplianceAgent] Running compliance scan on approved founding members');

  try {
    const pool = await getPool();
    if (!pool) return { totalActive: 0, warnings: 0, inactive: 0, flaggedIds: [] };

    const [approvedRows] = await pool.execute<any[]>(
      `SELECT id, updatedAt FROM proWaitlist WHERE status = 'approved' LIMIT 500`
    );

    const now = Date.now();
    const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000;
    const flaggedIds: number[] = [];
    let warnings = 0;
    let inactive = 0;

    for (const row of approvedRows) {
      const updatedAt = new Date(row.updatedAt).getTime();
      const daysSince = (now - updatedAt) / (24 * 60 * 60 * 1000);

      if (daysSince >= 90) {
        flaggedIds.push(row.id);
        if (daysSince >= 120) {
          inactive++;
        } else {
          warnings++;
        }
      }
    }

    console.log('[ComplianceAgent] Total approved:', approvedRows.length, '| Warnings:', warnings, '| Inactive:', inactive);
    return { totalActive: approvedRows.length, warnings, inactive, flaggedIds };
  } catch (err) {
    console.log('[ComplianceAgent] Error:', err);
    return { totalActive: 0, warnings: 0, inactive: 0, flaggedIds: [] };
  }
}

// ─── 7. Tier Promotion Agent ─────────────────────────────────────────────────

export async function runTierPromotionAgent(): Promise<TierUpdateResult> {
  console.log('[TierPromotionAgent] Checking tier fill status');

  try {
    const pool = await getPool();
    if (!pool) return { charterFull: false, foundingFull: false, l3Full: false, l4Full: false, counts: {} };

    const [[countRow]] = await pool.execute<any[]>(
      `SELECT COUNT(*) as total FROM proWaitlist WHERE status = 'approved'`
    );

    const total = Number(countRow.total);

    const charterFull = total >= TIER_CAPS.charter;
    const foundingFull = total >= TIER_CAPS.founding;
    const l3Full = total >= TIER_CAPS.level3;
    const l4Full = total >= TIER_CAPS.level4;

    const counts: Record<string, number> = {
      charter: Math.min(total, TIER_CAPS.charter),
      founding: Math.max(0, Math.min(total - TIER_CAPS.charter, TIER_CAPS.founding - TIER_CAPS.charter)),
      level3: Math.max(0, Math.min(total - TIER_CAPS.founding, TIER_CAPS.level3 - TIER_CAPS.founding)),
      level4: Math.max(0, Math.min(total - TIER_CAPS.level3, TIER_CAPS.level4 - TIER_CAPS.level3)),
      total,
    };

    if (charterFull) console.log('[TierPromotionAgent] Charter tier FULL (25/25)');
    if (foundingFull) console.log('[TierPromotionAgent] Founding tier FULL (125 cumulative)');
    if (l3Full) console.log('[TierPromotionAgent] Level 3 FULL (525 cumulative)');
    if (l4Full) console.log('[TierPromotionAgent] Level 4 FULL (2125 cumulative) — Founding Network CLOSED');

    // Notify admin when tiers fill up
    if (charterFull) await notifyTierFull("Charter Member", counts.charter || 25).catch(() => {});
    if (foundingFull && !charterFull) await notifyTierFull("Founding Member", counts.founding || 100).catch(() => {});
    return { charterFull, foundingFull, l3Full, l4Full, counts };
  } catch (err) {
    console.log('[TierPromotionAgent] Error:', err);
    return { charterFull: false, foundingFull: false, l3Full: false, l4Full: false, counts: {} };
  }
}
