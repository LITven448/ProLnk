import { getPool, getDb } from "../db";
import { sql } from "drizzle-orm";
import crypto from "crypto";

const RATES = {
  homeOrigination: 0.05,
  networkJob: { l1: 0.07, l2: 0.04, l3: 0.02, l4: 0.01 },
  subscriptionOverride: { l1: 0.12, l2: 0.06, l3: 0.03, l4: 0.015 },
  prolnkMinFloor: 0.20,
};

export interface RecruitingChainNode {
  partnerId: number;
  partnerName: string;
  level: number;
  businessType: string | null;
  primaryCity: string | null;
}

export interface CommissionDistribution {
  jobId: string;
  platformFee: number;
  distributions: Array<{
    partnerId: number;
    partnerName: string;
    type: "home_origination" | "network_l1" | "network_l2" | "network_l3" | "network_l4";
    amount: number;
    rate: number;
  }>;
  prolnkRetains: number;
  totalDistributed: number;
  success: boolean;
}

export interface SubscriptionCommissionDistribution {
  subscribingPartnerId: number;
  subscriptionAmount: number;
  distributions: Array<{
    partnerId: number;
    partnerName: string;
    level: number;
    amount: number;
    rate: number;
  }>;
  totalDistributed: number;
  success: boolean;
}

export interface CommissionPreview {
  jobValue: number;
  platformFeeRate: number;
  platformFee: number;
  distributions: Array<{
    partnerId: number;
    partnerName: string;
    type: "home_origination" | "network_l1" | "network_l2" | "network_l3" | "network_l4";
    amount: number;
    rate: number;
  }>;
  prolnkRetains: number;
  totalDistributed: number;
  valid: boolean;
  validationNote: string | null;
}

function normalizeAddress(address: string): string {
  return address.toLowerCase().trim().replace(/\s+/g, " ");
}

function hashAddress(address: string): string {
  return crypto.createHash("sha256").update(normalizeAddress(address)).digest("hex");
}

function currentPayoutMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export async function findHomeOriginator(propertyAddress: string): Promise<number | null> {
  try {
    const db = await getDb();
    if (!db) return null;
    const addressHash = hashAddress(propertyAddress);
    const rows = await (db as any).execute(
      sql`SELECT proUserId FROM home_documentation WHERE addressHash = ${addressHash} AND isFirstDocumentation = 1 LIMIT 1`
    ) as any;
    const row = rows?.[0]?.[0] ?? rows?.[0];
    if (!row?.proUserId) return null;
    const parsed = parseInt(row.proUserId, 10);
    return isNaN(parsed) ? null : parsed;
  } catch (err) {
    console.error("[CommissionCascade] findHomeOriginator error:", err);
    return null;
  }
}

export async function getRecruitingChain(partnerId: number): Promise<RecruitingChainNode[]> {
  try {
    const db = await getDb();
    if (!db) return [];

    const chainRows = await (db as any).execute(
      sql`
        SELECT u.uplineUserId, u.levelsAbove,
               COALESCE(p.firstName, '') as firstName,
               COALESCE(p.lastName, '') as lastName,
               p.businessType, p.primaryCity
        FROM pro_upline_chain u
        LEFT JOIN proWaitlist p ON p.id = CAST(u.uplineUserId AS UNSIGNED)
        WHERE u.proUserId = ${String(partnerId)}
          AND u.levelsAbove BETWEEN 1 AND 4
        ORDER BY u.levelsAbove ASC
        LIMIT 4
      `
    ) as any;

    const rows: any[] = chainRows?.[0] ?? chainRows ?? [];
    if (rows.length > 0) {
      return rows.map((r: any) => ({
        partnerId: parseInt(r.uplineUserId, 10),
        partnerName: `${r.firstName ?? ""} ${r.lastName ?? ""}`.trim() || `Partner #${r.uplineUserId}`,
        level: r.levelsAbove,
        businessType: r.businessType ?? null,
        primaryCity: r.primaryCity ?? null,
      }));
    }

    const result: RecruitingChainNode[] = [];
    let currentId = partnerId;

    for (let level = 1; level <= 4; level++) {
      const profileRows = await (db as any).execute(
        sql`
          SELECT np.referredByUserId,
                 COALESCE(pw.firstName, '') as firstName,
                 COALESCE(pw.lastName, '') as lastName,
                 pw.businessType, pw.primaryCity
          FROM pro_network_profile np
          LEFT JOIN proWaitlist pw ON pw.id = CAST(np.referredByUserId AS UNSIGNED)
          WHERE np.userId = ${String(currentId)}
          LIMIT 1
        `
      ) as any;

      const profileRow = profileRows?.[0]?.[0] ?? profileRows?.[0];
      if (!profileRow?.referredByUserId) break;

      const recruiterId = parseInt(profileRow.referredByUserId, 10);
      if (isNaN(recruiterId)) break;

      result.push({
        partnerId: recruiterId,
        partnerName: `${profileRow.firstName ?? ""} ${profileRow.lastName ?? ""}`.trim() || `Partner #${recruiterId}`,
        level,
        businessType: profileRow.businessType ?? null,
        primaryCity: profileRow.primaryCity ?? null,
      });

      currentId = recruiterId;
    }

    return result;
  } catch (err) {
    console.error("[CommissionCascade] getRecruitingChain error:", err);
    return [];
  }
}

async function getPartnerName(partnerId: number, db: any): Promise<string> {
  try {
    const rows = await (db as any).execute(
      sql`SELECT firstName, lastName FROM proWaitlist WHERE id = ${partnerId} LIMIT 1`
    ) as any;
    const row = rows?.[0]?.[0] ?? rows?.[0];
    if (!row) return `Partner #${partnerId}`;
    return `${row.firstName ?? ""} ${row.lastName ?? ""}`.trim() || `Partner #${partnerId}`;
  } catch {
    return `Partner #${partnerId}`;
  }
}

export async function distributeJobCommissions(params: {
  jobId: string;
  completingProId: number;
  propertyAddress: string;
  jobValue: number;
  platformFeeRate: number;
}): Promise<CommissionDistribution> {
  const { jobId, completingProId, propertyAddress, jobValue, platformFeeRate } = params;

  const safeRate = Math.min(Math.max(platformFeeRate, 0.06), 0.15);
  const platformFee = Math.round(jobValue * safeRate * 100) / 100;

  const distributions: CommissionDistribution["distributions"] = [];

  try {
    const db = await getDb();
    if (!db) {
      return {
        jobId,
        platformFee,
        distributions: [],
        prolnkRetains: platformFee,
        totalDistributed: 0,
        success: false,
      };
    }

    const [originatorId, chain] = await Promise.all([
      findHomeOriginator(propertyAddress),
      getRecruitingChain(completingProId),
    ]);

    if (originatorId !== null && originatorId !== completingProId) {
      const amount = Math.round(platformFee * RATES.homeOrigination * 100) / 100;
      const name = await getPartnerName(originatorId, db);
      distributions.push({
        partnerId: originatorId,
        partnerName: name,
        type: "home_origination",
        amount,
        rate: RATES.homeOrigination,
      });
    }

    const levelKeys: Array<keyof typeof RATES.networkJob> = ["l1", "l2", "l3", "l4"];
    const typeKeys: Array<CommissionDistribution["distributions"][0]["type"]> = [
      "network_l1", "network_l2", "network_l3", "network_l4",
    ];

    for (const node of chain) {
      const levelIndex = node.level - 1;
      if (levelIndex < 0 || levelIndex >= levelKeys.length) continue;
      const rate = RATES.networkJob[levelKeys[levelIndex]];
      const amount = Math.round(platformFee * rate * 100) / 100;
      distributions.push({
        partnerId: node.partnerId,
        partnerName: node.partnerName,
        type: typeKeys[levelIndex],
        amount,
        rate,
      });
    }

    const totalDistributed = distributions.reduce((sum, d) => sum + d.amount, 0);
    const prolnkRetains = Math.round((platformFee - totalDistributed) * 100) / 100;
    const prolnkFloor = Math.round(platformFee * RATES.prolnkMinFloor * 100) / 100;

    if (prolnkRetains < prolnkFloor) {
      console.warn(
        `[CommissionCascade] prolnkRetains (${prolnkRetains}) < floor (${prolnkFloor}) for job ${jobId}. Skipping payouts.`
      );
      return {
        jobId,
        platformFee,
        distributions: [],
        prolnkRetains: platformFee,
        totalDistributed: 0,
        success: false,
      };
    }

    const payoutMonth = currentPayoutMonth();

    for (const dist of distributions) {
      (db as any).execute(
        sql`
          INSERT INTO commission_payout
            (jobCommissionEventId, recipientUserId, sourceProUserId, payoutType, rateApplied, amount, status, payoutMonth, createdAt)
          VALUES
            (0, ${String(dist.partnerId)}, ${String(completingProId)}, ${dist.type}, ${dist.rate}, ${dist.amount}, 'pending', ${payoutMonth}, NOW())
        `
      ).catch((err: any) => {
        console.error("[CommissionCascade] payout insert error:", err);
      });
    }

    console.log(
      `[CommissionCascade] Job ${jobId}: fee=$${platformFee}, distributed=$${totalDistributed}, prolnk retains=$${prolnkRetains}, payouts=${distributions.length}`
    );

    return {
      jobId,
      platformFee,
      distributions,
      prolnkRetains,
      totalDistributed,
      success: true,
    };
  } catch (err) {
    console.error("[CommissionCascade] distributeJobCommissions error:", err);
    return {
      jobId,
      platformFee,
      distributions: [],
      prolnkRetains: platformFee,
      totalDistributed: 0,
      success: false,
    };
  }
}

export async function distributeSubscriptionCommissions(params: {
  subscribingPartnerId: number;
  subscriptionAmount: number;
}): Promise<SubscriptionCommissionDistribution> {
  const { subscribingPartnerId, subscriptionAmount } = params;

  const distributions: SubscriptionCommissionDistribution["distributions"] = [];

  try {
    const db = await getDb();
    if (!db) {
      return {
        subscribingPartnerId,
        subscriptionAmount,
        distributions: [],
        totalDistributed: 0,
        success: false,
      };
    }

    const chain = await getRecruitingChain(subscribingPartnerId);
    const levelRates = [
      RATES.subscriptionOverride.l1,
      RATES.subscriptionOverride.l2,
      RATES.subscriptionOverride.l3,
      RATES.subscriptionOverride.l4,
    ];

    for (const node of chain) {
      const levelIndex = node.level - 1;
      if (levelIndex < 0 || levelIndex >= levelRates.length) continue;
      const rate = levelRates[levelIndex];
      const amount = Math.round(subscriptionAmount * rate * 100) / 100;
      distributions.push({
        partnerId: node.partnerId,
        partnerName: node.partnerName,
        level: node.level,
        amount,
        rate,
      });
    }

    const totalDistributed = distributions.reduce((sum, d) => sum + d.amount, 0);
    const payoutMonth = currentPayoutMonth();

    for (const dist of distributions) {
      (db as any).execute(
        sql`
          INSERT INTO commission_payout
            (jobCommissionEventId, recipientUserId, sourceProUserId, payoutType, rateApplied, amount, status, payoutMonth, createdAt)
          VALUES
            (0, ${String(dist.partnerId)}, ${String(subscribingPartnerId)}, ${"subscription_l" + dist.level}, ${dist.rate}, ${dist.amount}, 'pending', ${payoutMonth}, NOW())
        `
      ).catch((err: any) => {
        console.error("[CommissionCascade] subscription payout insert error:", err);
      });
    }

    console.log(
      `[CommissionCascade] Subscription for partner ${subscribingPartnerId}: amount=$${subscriptionAmount}, distributed=$${totalDistributed}, payouts=${distributions.length}`
    );

    return {
      subscribingPartnerId,
      subscriptionAmount,
      distributions,
      totalDistributed,
      success: true,
    };
  } catch (err) {
    console.error("[CommissionCascade] distributeSubscriptionCommissions error:", err);
    return {
      subscribingPartnerId,
      subscriptionAmount,
      distributions: [],
      totalDistributed: 0,
      success: false,
    };
  }
}

export async function previewJobCommissions(params: {
  jobValue: number;
  platformFeeRate: number;
  completingProId: number;
  propertyAddress: string;
}): Promise<CommissionPreview> {
  const { jobValue, platformFeeRate, completingProId, propertyAddress } = params;

  const safeRate = Math.min(Math.max(platformFeeRate, 0.06), 0.15);
  const platformFee = Math.round(jobValue * safeRate * 100) / 100;

  const distributions: CommissionPreview["distributions"] = [];

  try {
    const db = await getDb();
    if (!db) {
      return {
        jobValue,
        platformFeeRate: safeRate,
        platformFee,
        distributions: [],
        prolnkRetains: platformFee,
        totalDistributed: 0,
        valid: false,
        validationNote: "Database unavailable",
      };
    }

    const [originatorId, chain] = await Promise.all([
      findHomeOriginator(propertyAddress),
      getRecruitingChain(completingProId),
    ]);

    if (originatorId !== null && originatorId !== completingProId) {
      const amount = Math.round(platformFee * RATES.homeOrigination * 100) / 100;
      const name = await getPartnerName(originatorId, db);
      distributions.push({
        partnerId: originatorId,
        partnerName: name,
        type: "home_origination",
        amount,
        rate: RATES.homeOrigination,
      });
    }

    const levelKeys: Array<keyof typeof RATES.networkJob> = ["l1", "l2", "l3", "l4"];
    const typeKeys: Array<CommissionPreview["distributions"][0]["type"]> = [
      "network_l1", "network_l2", "network_l3", "network_l4",
    ];

    for (const node of chain) {
      const levelIndex = node.level - 1;
      if (levelIndex < 0 || levelIndex >= levelKeys.length) continue;
      const rate = RATES.networkJob[levelKeys[levelIndex]];
      const amount = Math.round(platformFee * rate * 100) / 100;
      distributions.push({
        partnerId: node.partnerId,
        partnerName: node.partnerName,
        type: typeKeys[levelIndex],
        amount,
        rate,
      });
    }

    const totalDistributed = distributions.reduce((sum, d) => sum + d.amount, 0);
    const prolnkRetains = Math.round((platformFee - totalDistributed) * 100) / 100;
    const prolnkFloor = Math.round(platformFee * RATES.prolnkMinFloor * 100) / 100;

    const valid = prolnkRetains >= prolnkFloor;
    const validationNote = valid
      ? null
      : `ProLnk would retain $${prolnkRetains} (below required floor of $${prolnkFloor})`;

    return {
      jobValue,
      platformFeeRate: safeRate,
      platformFee,
      distributions,
      prolnkRetains,
      totalDistributed,
      valid,
      validationNote,
    };
  } catch (err) {
    console.error("[CommissionCascade] previewJobCommissions error:", err);
    return {
      jobValue,
      platformFeeRate: safeRate,
      platformFee,
      distributions: [],
      prolnkRetains: platformFee,
      totalDistributed: 0,
      valid: false,
      validationNote: "Preview calculation failed",
    };
  }
}
