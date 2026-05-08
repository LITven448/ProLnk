/**
 * Founding Network Agents
 *
 * Seven agents that power the ProLnk Founding Partner Network commission
 * structure, tier management, and origination rights enforcement.
 *
 * Agents:
 *   1. Founding Network Enrollment Agent — validates applicants, enforces tier caps, routes overflow
 *   2. Commission Pool Distribution Agent — calculates and distributes platform fee pool per job
 *   3. Home Origination Lock Agent — locks address origination rights to the first documenting Founding member
 *   4. Photo Attribution Agent — tracks photo origination commissions when AI opportunities convert to jobs
 *   5. Network Genealogy Agent — maintains recruiting tree, traces commission chains up to 4 levels
 *   6. Founding Network Compliance Agent — monitors active status, flags inactive members
 *   7. Tier Promotion Agent — handles tier fill events, updates recruiting rules, notifies members
 */

import { db } from "../db";
import { invokeLLM } from "../_core/llm";
import { addAgentMemory, searchAgentMemory } from "../memory";

// ─── Tier Configuration ───────────────────────────────────────────────────────

export const FOUNDING_TIER_CAPS = {
  charter: 25,       // Level 1 — Charter Members (most elite)
  founding: 100,     // Level 2 — Founding Members
  level3: 400,       // Level 3 Partners
  level4: 1600,      // Level 4 Partners
} as const;

export type FoundingTier = keyof typeof FOUNDING_TIER_CAPS;

// Commission rates per recruiting depth (% of platform fee pool)
export const NETWORK_COMMISSION_RATES = {
  direct: 0.07,   // L1 (direct recruit) earns 7% of platform fee
  l2: 0.04,       // L2 earns 4%
  l3: 0.02,       // L3 earns 2%
  l4: 0.01,       // L4 earns 1%
} as const;

// ProLnk minimum retained share of platform fee pool
export const PROLNK_MINIMUM_FLOOR = 0.20; // 20%

// Founding member keep rate on their own jobs (top-tier subscriber benefit)
export const FOUNDING_KEEP_RATE = 0.72; // 72%

// ─── 1. Founding Network Enrollment Agent ────────────────────────────────────

export async function runFoundingEnrollmentAgent(applicantId: number): Promise<{
  approved: boolean;
  assignedTier: FoundingTier | null;
  reason: string;
  tierCounts: Record<FoundingTier, number>;
  overflowTier: FoundingTier | null;
}> {
  try {
    // Get current tier counts from DB
    const tierCounts = await db.execute<{ tier: string; count: number }>(
      `SELECT tier, COUNT(*) as count FROM foundingPartners WHERE status = 'active' GROUP BY tier`
    );

    const counts: Record<FoundingTier, number> = {
      charter: 0,
      founding: 0,
      level3: 0,
      level4: 0,
    };

    for (const row of tierCounts.rows as Array<{ tier: string; count: number }>) {
      if (row.tier in counts) {
        counts[row.tier as FoundingTier] = Number(row.count);
      }
    }

    // Determine which tier to assign — sequential fill logic
    // Everyone recruits down one level until full, then next open level
    let assignedTier: FoundingTier | null = null;
    let overflowTier: FoundingTier | null = null;

    const tierOrder: FoundingTier[] = ["charter", "founding", "level3", "level4"];
    for (const tier of tierOrder) {
      if (counts[tier] < FOUNDING_TIER_CAPS[tier]) {
        assignedTier = tier;
        break;
      }
    }

    if (!assignedTier) {
      return {
        approved: false,
        assignedTier: null,
        reason: "All founding network tiers are at capacity (2,125 total). The founding network is closed.",
        tierCounts: counts,
        overflowTier: null,
      };
    }

    // Check if the primary tier is full and we're overflowing
    const primaryTierIndex = tierOrder.indexOf(assignedTier);
    if (primaryTierIndex > 0 && counts[tierOrder[primaryTierIndex - 1]] >= FOUNDING_TIER_CAPS[tierOrder[primaryTierIndex - 1]]) {
      overflowTier = assignedTier;
    }

    // Get applicant details for qualification check
    const applicantRows = await db.execute<{ businessName: string; trade: string; yearsInBusiness: number; licenseVerified: boolean }>(
      `SELECT businessName, trade, yearsInBusiness, licenseVerified FROM partners WHERE id = ?`,
      [applicantId]
    );

    if (!applicantRows.rows.length) {
      return {
        approved: false,
        assignedTier: null,
        reason: "Applicant not found in partner database.",
        tierCounts: counts,
        overflowTier: null,
      };
    }

    const applicant = applicantRows.rows[0] as { businessName: string; trade: string; yearsInBusiness: number; licenseVerified: boolean };

    // AI qualification review
    const qualificationPrompt = `You are the ProLnk Founding Network enrollment reviewer.

ProLnk is a premium home services platform. The Founding Network is exclusive — not every professional qualifies.
Standards: Must be a licensed, insured professional with at least 2 years in business. Must be able to provide
the highest level of service inside customers' homes. Must represent their trade with excellence.

Applicant:
- Business: ${applicant.businessName}
- Trade: ${applicant.trade}
- Years in business: ${applicant.yearsInBusiness}
- License verified: ${applicant.licenseVerified}

Evaluate qualification. Return JSON: { "qualified": boolean, "reason": string }`;

    const aiResponse = await invokeLLM({
      messages: [{ role: "user", content: qualificationPrompt }],
      response_format: { type: "json_schema", json_schema: {
        name: "qualification_result",
        strict: true,
        schema: {
          type: "object",
          properties: {
            qualified: { type: "boolean" },
            reason: { type: "string" },
          },
          required: ["qualified", "reason"],
          additionalProperties: false,
        },
      }},
    });

    const result = JSON.parse(aiResponse.choices[0].message.content as string);

    if (!result.qualified) {
      await addAgentMemory("founding_enrollment_agent", `Applicant ${applicantId} (${applicant.businessName}) rejected: ${result.reason}`);
      return {
        approved: false,
        assignedTier: null,
        reason: result.reason,
        tierCounts: counts,
        overflowTier: null,
      };
    }

    await addAgentMemory("founding_enrollment_agent", `Applicant ${applicantId} (${applicant.businessName}) approved for ${assignedTier} tier`);

    return {
      approved: true,
      assignedTier,
      reason: result.reason,
      tierCounts: counts,
      overflowTier,
    };
  } catch (err) {
    console.error("[FoundingEnrollmentAgent] Error:", err);
    return {
      approved: false,
      assignedTier: null,
      reason: "Enrollment agent encountered an error. Please retry.",
      tierCounts: { charter: 0, founding: 0, level3: 0, level4: 0 },
      overflowTier: null,
    };
  }
}

// ─── 2. Commission Pool Distribution Agent ───────────────────────────────────

export interface CommissionDistribution {
  jobId: number;
  platformFeeTotal: number;
  prolnkRetained: number;
  photoOriginatorPayout: number;
  homeOriginatorPayout: number;
  networkPayouts: Array<{ partnerId: number; level: number; amount: number; rate: number }>;
  totalNetworkPaid: number;
  prolnkFloorMet: boolean;
}

export async function runCommissionPoolDistribution(jobId: number): Promise<CommissionDistribution> {
  try {
    // Get job details
    const jobRows = await db.execute<{
      jobValue: number;
      platformFeeRate: number;
      completingPartnerId: number;
      homeId: number;
      photoOriginatorId: number | null;
    }>(
      `SELECT jobValue, platformFeeRate, completingPartnerId, homeId, photoOriginatorId FROM jobs WHERE id = ?`,
      [jobId]
    );

    if (!jobRows.rows.length) throw new Error(`Job ${jobId} not found`);

    const job = jobRows.rows[0] as {
      jobValue: number;
      platformFeeRate: number;
      completingPartnerId: number;
      homeId: number;
      photoOriginatorId: number | null;
    };

    const platformFeeTotal = job.jobValue * job.platformFeeRate;

    // Get home originator (Founding Network member who first documented this home)
    const homeRows = await db.execute<{ originatorPartnerId: number | null }>(
      `SELECT originatorPartnerId FROM homes WHERE id = ?`,
      [job.homeId]
    );
    const homeOriginatorId = homeRows.rows.length ? (homeRows.rows[0] as { originatorPartnerId: number | null }).originatorPartnerId : null;

    // Get recruiting chain for completing partner (up to 4 levels)
    const chainRows = await db.execute<{ level: number; partnerId: number }>(
      `WITH RECURSIVE chain AS (
        SELECT id as partnerId, recruitedById, 1 as level
        FROM foundingPartners WHERE partnerId = ?
        UNION ALL
        SELECT fp.id, fp.recruitedById, c.level + 1
        FROM foundingPartners fp
        JOIN chain c ON fp.id = c.recruitedById
        WHERE c.level < 4
      )
      SELECT level, partnerId FROM chain WHERE level > 0 ORDER BY level`,
      [job.completingPartnerId]
    );

    const networkPayouts: Array<{ partnerId: number; level: number; amount: number; rate: number }> = [];
    const rateMap = [NETWORK_COMMISSION_RATES.direct, NETWORK_COMMISSION_RATES.l2, NETWORK_COMMISSION_RATES.l3, NETWORK_COMMISSION_RATES.l4];

    for (const row of chainRows.rows as Array<{ level: number; partnerId: number }>) {
      const rate = rateMap[row.level - 1] ?? 0;
      if (rate > 0) {
        networkPayouts.push({
          partnerId: row.partnerId,
          level: row.level,
          amount: platformFeeTotal * rate,
          rate,
        });
      }
    }

    // Photo originator gets 3% of platform fee if different from home originator
    const photoOriginatorRate = 0.03;
    let photoOriginatorPayout = 0;
    if (job.photoOriginatorId && job.photoOriginatorId !== homeOriginatorId) {
      photoOriginatorPayout = platformFeeTotal * photoOriginatorRate;
    }

    // Home originator gets 5% of platform fee
    const homeOriginatorRate = 0.05;
    let homeOriginatorPayout = 0;
    if (homeOriginatorId) {
      homeOriginatorPayout = platformFeeTotal * homeOriginatorRate;
    }

    const totalNetworkPaid = networkPayouts.reduce((sum, p) => sum + p.amount, 0) + photoOriginatorPayout + homeOriginatorPayout;
    const prolnkRetained = platformFeeTotal - totalNetworkPaid;
    const prolnkFloorMet = prolnkRetained / platformFeeTotal >= PROLNK_MINIMUM_FLOOR;

    // If floor not met, scale down network payouts proportionally
    if (!prolnkFloorMet) {
      const maxNetworkPool = platformFeeTotal * (1 - PROLNK_MINIMUM_FLOOR);
      const scaleFactor = maxNetworkPool / totalNetworkPaid;
      for (const payout of networkPayouts) {
        payout.amount = payout.amount * scaleFactor;
      }
      photoOriginatorPayout *= scaleFactor;
      homeOriginatorPayout *= scaleFactor;
    }

    const finalNetworkPaid = networkPayouts.reduce((sum, p) => sum + p.amount, 0) + photoOriginatorPayout + homeOriginatorPayout;
    const finalProlnkRetained = platformFeeTotal - finalNetworkPaid;

    await addAgentMemory("commission_pool_agent", `Job ${jobId}: fee pool $${platformFeeTotal.toFixed(2)}, ProLnk retained $${finalProlnkRetained.toFixed(2)}, network paid $${finalNetworkPaid.toFixed(2)}`);

    return {
      jobId,
      platformFeeTotal,
      prolnkRetained: finalProlnkRetained,
      photoOriginatorPayout,
      homeOriginatorPayout,
      networkPayouts,
      totalNetworkPaid: finalNetworkPaid,
      prolnkFloorMet: finalProlnkRetained / platformFeeTotal >= PROLNK_MINIMUM_FLOOR,
    };
  } catch (err) {
    console.error("[CommissionPoolAgent] Error:", err);
    throw err;
  }
}

// ─── 3. Home Origination Lock Agent ──────────────────────────────────────────

export async function runHomeOriginationLockAgent(homeId: number, claimingPartnerId: number): Promise<{
  locked: boolean;
  existingOriginatorId: number | null;
  isNewClaim: boolean;
  conflictResolution: string | null;
}> {
  try {
    // Check if home already has an originator
    const homeRows = await db.execute<{ originatorPartnerId: number | null; originatedAt: string | null }>(
      `SELECT originatorPartnerId, originatedAt FROM homes WHERE id = ?`,
      [homeId]
    );

    if (!homeRows.rows.length) {
      return { locked: false, existingOriginatorId: null, isNewClaim: false, conflictResolution: "Home not found in database." };
    }

    const home = homeRows.rows[0] as { originatorPartnerId: number | null; originatedAt: string | null };

    // Already locked — return existing originator
    if (home.originatorPartnerId !== null) {
      const isSamePro = home.originatorPartnerId === claimingPartnerId;
      return {
        locked: true,
        existingOriginatorId: home.originatorPartnerId,
        isNewClaim: false,
        conflictResolution: isSamePro
          ? "You are the originator of this home."
          : `This home was already claimed by partner ${home.originatorPartnerId} on ${home.originatedAt}. Origination rights are permanent and cannot be transferred.`,
      };
    }

    // Check if claiming partner is in the Founding Network
    const fpRows = await db.execute<{ id: number; tier: string; status: string }>(
      `SELECT id, tier, status FROM foundingPartners WHERE partnerId = ? AND status = 'active'`,
      [claimingPartnerId]
    );

    if (!fpRows.rows.length) {
      return {
        locked: false,
        existingOriginatorId: null,
        isNewClaim: false,
        conflictResolution: "Only active Founding Network members can claim home origination rights.",
      };
    }

    // Lock the home to this partner
    await db.execute(
      `UPDATE homes SET originatorPartnerId = ?, originatedAt = NOW() WHERE id = ?`,
      [claimingPartnerId, homeId]
    );

    await addAgentMemory("home_origination_agent", `Home ${homeId} locked to partner ${claimingPartnerId} (${(fpRows.rows[0] as { tier: string }).tier} tier)`);

    return {
      locked: true,
      existingOriginatorId: claimingPartnerId,
      isNewClaim: true,
      conflictResolution: null,
    };
  } catch (err) {
    console.error("[HomeOriginationLockAgent] Error:", err);
    throw err;
  }
}

// ─── 4. Photo Attribution Agent ──────────────────────────────────────────────

export async function runPhotoAttributionAgent(opportunityId: number): Promise<{
  photoOriginatorId: number | null;
  photoCount: number;
  attributedPhotoId: number | null;
  commissionEligible: boolean;
  reason: string;
}> {
  try {
    // Get the opportunity and its source photo
    const oppRows = await db.execute<{ sourcePhotoId: number | null; homeId: number; jobId: number | null }>(
      `SELECT sourcePhotoId, homeId, jobId FROM opportunities WHERE id = ?`,
      [opportunityId]
    );

    if (!oppRows.rows.length) {
      return { photoOriginatorId: null, photoCount: 0, attributedPhotoId: null, commissionEligible: false, reason: "Opportunity not found." };
    }

    const opp = oppRows.rows[0] as { sourcePhotoId: number | null; homeId: number; jobId: number | null };

    if (!opp.sourcePhotoId) {
      return { photoOriginatorId: null, photoCount: 0, attributedPhotoId: null, commissionEligible: false, reason: "No source photo linked to this opportunity." };
    }

    // Get the photo and its uploader
    const photoRows = await db.execute<{ uploadedByPartnerId: number; uploadedAt: string }>(
      `SELECT uploadedByPartnerId, uploadedAt FROM jobPhotos WHERE id = ?`,
      [opp.sourcePhotoId]
    );

    if (!photoRows.rows.length) {
      return { photoOriginatorId: null, photoCount: 0, attributedPhotoId: null, commissionEligible: false, reason: "Source photo not found." };
    }

    const photo = photoRows.rows[0] as { uploadedByPartnerId: number; uploadedAt: string };

    // Check if the photo uploader is in the Founding Network (required for commission)
    const fpRows = await db.execute<{ id: number }>(
      `SELECT id FROM foundingPartners WHERE partnerId = ? AND status = 'active'`,
      [photo.uploadedByPartnerId]
    );

    const commissionEligible = fpRows.rows.length > 0;

    // Count total photos from this pro on this home
    const countRows = await db.execute<{ count: number }>(
      `SELECT COUNT(*) as count FROM jobPhotos WHERE uploadedByPartnerId = ? AND homeId = ?`,
      [photo.uploadedByPartnerId, opp.homeId]
    );

    const photoCount = Number((countRows.rows[0] as { count: number }).count);

    await addAgentMemory("photo_attribution_agent", `Opportunity ${opportunityId}: attributed to partner ${photo.uploadedByPartnerId}, commission eligible: ${commissionEligible}`);

    return {
      photoOriginatorId: photo.uploadedByPartnerId,
      photoCount,
      attributedPhotoId: opp.sourcePhotoId,
      commissionEligible,
      reason: commissionEligible
        ? `Photo uploaded by active Founding Network member. ${photoCount} total photos from this pro on this home.`
        : "Photo uploader is not an active Founding Network member — no photo origination commission applies.",
    };
  } catch (err) {
    console.error("[PhotoAttributionAgent] Error:", err);
    throw err;
  }
}

// ─── 5. Network Genealogy Agent ──────────────────────────────────────────────

export interface NetworkNode {
  partnerId: number;
  businessName: string;
  tier: FoundingTier;
  level: number; // depth from root (0 = this member)
  recruitedById: number | null;
  directRecruits: number;
  totalNetworkSize: number;
  estimatedMonthlyCommission: number;
}

export async function runNetworkGenealogyAgent(rootPartnerId: number): Promise<{
  root: NetworkNode;
  tree: NetworkNode[];
  totalNetworkSize: number;
  deepestLevel: number;
  summary: string;
}> {
  try {
    // Build the full downline tree using recursive CTE
    const treeRows = await db.execute<{
      partnerId: number;
      businessName: string;
      tier: string;
      level: number;
      recruitedById: number | null;
    }>(
      `WITH RECURSIVE downline AS (
        SELECT fp.partnerId, p.businessName, fp.tier, 0 as level, fp.recruitedById
        FROM foundingPartners fp
        JOIN partners p ON p.id = fp.partnerId
        WHERE fp.partnerId = ? AND fp.status = 'active'
        UNION ALL
        SELECT fp.partnerId, p.businessName, fp.tier, d.level + 1, fp.recruitedById
        FROM foundingPartners fp
        JOIN partners p ON p.id = fp.partnerId
        JOIN downline d ON fp.recruitedById = d.partnerId
        WHERE fp.status = 'active' AND d.level < 4
      )
      SELECT * FROM downline ORDER BY level, partnerId`,
      [rootPartnerId]
    );

    const nodes: NetworkNode[] = [];
    const rows = treeRows.rows as Array<{ partnerId: number; businessName: string; tier: string; level: number; recruitedById: number | null }>;

    for (const row of rows) {
      const directRecruits = rows.filter(r => r.recruitedById === row.partnerId).length;
      const totalNetworkSize = rows.filter(r => r.level > row.level).length; // simplified

      // Estimate monthly commission based on tier and network size
      const estimatedMonthlyCommission = directRecruits * 2 * 600 * NETWORK_COMMISSION_RATES.direct; // rough: 2 jobs/mo per recruit at $600 pool

      nodes.push({
        partnerId: row.partnerId,
        businessName: row.businessName,
        tier: row.tier as FoundingTier,
        level: row.level,
        recruitedById: row.recruitedById,
        directRecruits,
        totalNetworkSize,
        estimatedMonthlyCommission,
      });
    }

    const root = nodes.find(n => n.level === 0) ?? nodes[0];
    const deepestLevel = Math.max(...nodes.map(n => n.level), 0);

    const summary = `Network rooted at partner ${rootPartnerId}: ${nodes.length} total members across ${deepestLevel} levels. Direct recruits: ${root?.directRecruits ?? 0}. Estimated monthly commission: $${root?.estimatedMonthlyCommission.toFixed(0) ?? 0}.`;

    await addAgentMemory("network_genealogy_agent", summary);

    return {
      root: root ?? { partnerId: rootPartnerId, businessName: "Unknown", tier: "charter", level: 0, recruitedById: null, directRecruits: 0, totalNetworkSize: 0, estimatedMonthlyCommission: 0 },
      tree: nodes,
      totalNetworkSize: nodes.length,
      deepestLevel,
      summary,
    };
  } catch (err) {
    console.error("[NetworkGenealogyAgent] Error:", err);
    throw err;
  }
}

// ─── 6. Founding Network Compliance Agent ────────────────────────────────────

export async function runFoundingNetworkComplianceAgent(): Promise<{
  totalActive: number;
  inactiveMembers: Array<{ partnerId: number; businessName: string; tier: string; lastJobDate: string | null; daysSinceLastJob: number }>;
  atRiskCount: number;
  recommendations: string[];
}> {
  try {
    const INACTIVITY_THRESHOLD_DAYS = 90;

    // Find founding members with no jobs in the last 90 days
    const inactiveRows = await db.execute<{
      partnerId: number;
      businessName: string;
      tier: string;
      lastJobDate: string | null;
    }>(
      `SELECT fp.partnerId, p.businessName, fp.tier,
        MAX(j.completedAt) as lastJobDate
       FROM foundingPartners fp
       JOIN partners p ON p.id = fp.partnerId
       LEFT JOIN jobs j ON j.completingPartnerId = fp.partnerId AND j.completedAt > DATE_SUB(NOW(), INTERVAL 180 DAY)
       WHERE fp.status = 'active'
       GROUP BY fp.partnerId, p.businessName, fp.tier
       HAVING lastJobDate IS NULL OR lastJobDate < DATE_SUB(NOW(), INTERVAL ? DAY)`,
      [INACTIVITY_THRESHOLD_DAYS]
    );

    const totalActiveRows = await db.execute<{ count: number }>(
      `SELECT COUNT(*) as count FROM foundingPartners WHERE status = 'active'`
    );
    const totalActive = Number((totalActiveRows.rows[0] as { count: number }).count);

    const inactiveMembers = (inactiveRows.rows as Array<{ partnerId: number; businessName: string; tier: string; lastJobDate: string | null }>).map(row => {
      const daysSinceLastJob = row.lastJobDate
        ? Math.floor((Date.now() - new Date(row.lastJobDate).getTime()) / (1000 * 60 * 60 * 24))
        : 999;
      return { ...row, daysSinceLastJob };
    });

    const recommendations: string[] = [];
    if (inactiveMembers.length > 0) {
      recommendations.push(`${inactiveMembers.length} founding members have been inactive for 90+ days. Consider sending re-engagement outreach.`);
    }
    if (inactiveMembers.filter(m => m.tier === "charter").length > 0) {
      recommendations.push(`${inactiveMembers.filter(m => m.tier === "charter").length} Charter Members are inactive — these are top-tier slots that should be actively utilized.`);
    }

    await addAgentMemory("founding_compliance_agent", `Compliance scan: ${totalActive} active members, ${inactiveMembers.length} inactive (90+ days)`);

    return {
      totalActive,
      inactiveMembers,
      atRiskCount: inactiveMembers.length,
      recommendations,
    };
  } catch (err) {
    console.error("[FoundingNetworkComplianceAgent] Error:", err);
    return { totalActive: 0, inactiveMembers: [], atRiskCount: 0, recommendations: ["Compliance agent encountered an error."] };
  }
}

// ─── 7. Tier Promotion Agent ─────────────────────────────────────────────────

export async function runTierPromotionAgent(): Promise<{
  tiersFull: FoundingTier[];
  tiersOpen: Array<{ tier: FoundingTier; spotsRemaining: number }>;
  recruitingRuleUpdates: string[];
  notificationsQueued: number;
}> {
  try {
    const tierCounts = await db.execute<{ tier: string; count: number }>(
      `SELECT tier, COUNT(*) as count FROM foundingPartners WHERE status = 'active' GROUP BY tier`
    );

    const counts: Record<FoundingTier, number> = { charter: 0, founding: 0, level3: 0, level4: 0 };
    for (const row of tierCounts.rows as Array<{ tier: string; count: number }>) {
      if (row.tier in counts) counts[row.tier as FoundingTier] = Number(row.count);
    }

    const tiersFull: FoundingTier[] = [];
    const tiersOpen: Array<{ tier: FoundingTier; spotsRemaining: number }> = [];
    const tierOrder: FoundingTier[] = ["charter", "founding", "level3", "level4"];

    for (const tier of tierOrder) {
      const spotsRemaining = FOUNDING_TIER_CAPS[tier] - counts[tier];
      if (spotsRemaining <= 0) {
        tiersFull.push(tier);
      } else {
        tiersOpen.push({ tier, spotsRemaining });
      }
    }

    const recruitingRuleUpdates: string[] = [];
    if (tiersFull.includes("charter")) {
      recruitingRuleUpdates.push("Charter Member tier is full (25/25). Charter Members now recruit directly into Founding Member tier.");
    }
    if (tiersFull.includes("founding")) {
      recruitingRuleUpdates.push("Founding Member tier is full (100/100). Founding Members now recruit directly into Level 3.");
    }
    if (tiersFull.includes("level3")) {
      recruitingRuleUpdates.push("Level 3 tier is full (400/400). Level 3 Partners now recruit directly into Level 4.");
    }
    if (tiersFull.includes("level4")) {
      recruitingRuleUpdates.push("Level 4 tier is full (1600/1600). The Founding Network is at full capacity.");
    }

    // Queue notifications for members who need to know their recruiting tier changed
    let notificationsQueued = 0;
    for (const fullTier of tiersFull) {
      const memberRows = await db.execute<{ partnerId: number }>(
        `SELECT partnerId FROM foundingPartners WHERE tier = ? AND status = 'active'`,
        [fullTier]
      );
      notificationsQueued += memberRows.rows.length;
    }

    await addAgentMemory("tier_promotion_agent", `Tier status: full=[${tiersFull.join(",")}], open=[${tiersOpen.map(t => `${t.tier}(${t.spotsRemaining})`).join(",")}]`);

    return {
      tiersFull,
      tiersOpen,
      recruitingRuleUpdates,
      notificationsQueued,
    };
  } catch (err) {
    console.error("[TierPromotionAgent] Error:", err);
    return { tiersFull: [], tiersOpen: [], recruitingRuleUpdates: [], notificationsQueued: 0 };
  }
}

// ─── Run all Founding Network agents ─────────────────────────────────────────

export async function runAllFoundingNetworkAgents() {
  const [compliance, tierStatus] = await Promise.all([
    runFoundingNetworkComplianceAgent(),
    runTierPromotionAgent(),
  ]);
  return { compliance, tierStatus };
}
