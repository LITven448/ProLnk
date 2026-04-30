/**
 * Founding Partner System
 *
 * The first 100 licensed, verified home service professionals to join ProLnk.
 * This is a PERMANENT STATUS — not a tier, not a title. Once the 100 slots fill,
 * it's closed forever.
 *
 * WHAT FOUNDING PARTNERS GET:
 * 1. Locked rate: $149/month forever (gets the $249/month feature set)
 * 2. Maximum commission keep rate on their own jobs (78% = Enterprise rate)
 * 3. Network job commissions from 4 levels deep:
 *    L1=7%, L2=4%, L3=2%, L4=1% of platform fee per closed job
 * 4. Network subscription commissions from 4 levels deep:
 *    L1=12%, L2=6%, L3=3%, L4=1.5% of monthly subscription fee
 * 5. Home origination rights: 1.5% of platform fee on every job
 *    at any address they were first to document — forever
 * 6. Priority lead routing (highest PPS weight)
 * 7. TrustyPro Verified Badge (top tier)
 * 8. Events, experiential rewards, early feature access
 *
 * REQUIREMENTS:
 * - Active license
 * - Pass ProLnk background check
 * - General liability insurance
 * - Complete onboarding (profile, service area, Briefcase, Stripe Connect)
 * - Minimum 15 homes added to the system
 * - Minimum 5 service pros recommended to join
 * - $149/month subscription (after 90-day free trial at launch)
 * - Active participation (feedback, jobs, referrals)
 *
 * COMMISSION MATH:
 * ProLnk platform fee is 6-15% of job value (varies by trade).
 * From that fee:
 *   → Doing pro keeps their tier rate (40-78%)
 *   → Network cuts come from ProLnk's remaining share
 *   → Cuts do NOT reduce what the doing pro earned
 *
 * Example: $5,000 HVAC job, 12% platform fee = $600
 *   Pro (55% keep) = $330 to doing pro
 *   ProLnk's net = $270
 *   FP who recruited that pro (L1) = $600 × 7% = $42
 *   FP above them (L2) = $600 × 4% = $24
 *   FP above (L3) = $600 × 2% = $12
 *   FP above (L4) = $600 × 1% = $6
 *   Total network cuts: $84
 *   ProLnk final net: $270 - $42 - $24 - $12 - $6 = $186
 */

import { getDb } from "./db";
import { sql } from "drizzle-orm";
import { notifyOwner } from "./_core/notification";
import { aiHandled, dashboard, escalate } from "./notify";

// ─── Commission rates ─────────────────────────────────────────────────────────

export const FOUNDING_PARTNER_RATES = {
  network: {
    level1: 0.07,   // 7% of platform fee
    level2: 0.04,   // 4% of platform fee
    level3: 0.02,   // 2% of platform fee
    level4: 0.01,   // 1% of platform fee
  },
  subscription: {
    level1: 0.12,   // 12% of base subscription
    level2: 0.06,   // 6% of base subscription
    level3: 0.03,   // 3% of base subscription
    level4: 0.015,  // 1.5% of base subscription
  },
  origination: 0.015,  // 1.5% of platform fee per job at documented address
  commissionKeepRate: 0.78,     // Enterprise-level keep rate (78%)
  lockedMonthlyRate: 149.00,    // $149/month locked forever
  featureSetMonthly: 249.00,    // Gets $249/month feature set
} as const;

// ─── Normalize address for origination lookup ─────────────────────────────────

export function normalizeAddress(address: string): string {
  return address.toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.,#]/g, "")
    .trim();
}

import { createHash } from "crypto";

export function hashAddress(address: string): string {
  return createHash("sha256").update(normalizeAddress(address)).digest("hex").slice(0, 64);
}

// ─── Register an origination right ───────────────────────────────────────────

export async function registerHomeOrigination(opts: {
  propertyAddress: string;
  propertyZip?: string;
  originatingPartnerId: number;
  source: "field_job" | "scan" | "scout_assessment" | "homeowner_signup" | "fsm_import" | "corporate";
}): Promise<{ isNewOrigination: boolean; originatingPartnerId: number }> {
  const db = await getDb();
  if (!db) return { isNewOrigination: false, originatingPartnerId: opts.originatingPartnerId };

  const addressHash = hashAddress(opts.propertyAddress);

  // Check if origination already registered
  const existingRows = await (db as any).execute(sql`
    SELECT id, originatingPartnerId FROM homeOriginators
    WHERE propertyAddressHash = ${addressHash}
    LIMIT 1
  `);
  const existing = (existingRows.rows || existingRows)[0];

  if (existing) {
    // Already registered — original partner keeps origination
    return { isNewOrigination: false, originatingPartnerId: existing.originatingPartnerId };
  }

  // New origination — register
  await (db as any).execute(sql`
    INSERT INTO homeOriginators (
      propertyAddress, propertyAddressHash, propertyZip,
      originatingPartnerId, originationSource, firstDocumentedAt
    ) VALUES (
      ${opts.propertyAddress}, ${addressHash}, ${opts.propertyZip ?? null},
      ${opts.originatingPartnerId}, ${opts.source}, NOW()
    )
    ON DUPLICATE KEY UPDATE id = id
  `);

  console.log(`[Origination] Registered: ${opts.propertyAddress} → partner ${opts.originatingPartnerId}`);
  return { isNewOrigination: true, originatingPartnerId: opts.originatingPartnerId };
}

// ─── Process network commissions when a job closes ───────────────────────────

export async function processJobNetworkCommissions(opts: {
  jobValue: number;
  platformFeeAmount: number;
  doingPartnerId: number;
  opportunityId?: number;
  jobPaymentId?: number;
}): Promise<{
  totalNetworkCuts: number;
  commissionsCreated: number;
  originationCommission: number;
}> {
  const db = await getDb();
  if (!db) return { totalNetworkCuts: 0, commissionsCreated: 0, originationCommission: 0 };

  let totalNetworkCuts = 0;
  let commissionsCreated = 0;
  let originationCommission = 0;

  const levelRates: Record<number, number> = {
    1: FOUNDING_PARTNER_RATES.network.level1,
    2: FOUNDING_PARTNER_RATES.network.level2,
    3: FOUNDING_PARTNER_RATES.network.level3,
    4: FOUNDING_PARTNER_RATES.network.level4,
  };

  try {
    // Find all founding partners who have this doing partner in their network
    const networkRows = await (db as any).execute(sql`
      SELECT nc.foundingPartnerId, nc.networkLevel,
             fps.status as fpStatus,
             p.stripeConnectAccountId, p.stripeConnectStatus
      FROM partnerNetworkChain nc
      JOIN foundingPartnerStatus fps ON nc.foundingPartnerId = fps.partnerId
      JOIN partners p ON nc.foundingPartnerId = p.id
      WHERE nc.memberPartnerId = ${opts.doingPartnerId}
        AND nc.isActive = 1
        AND fps.status = 'active'
        AND nc.networkLevel BETWEEN 1 AND 4
    `);
    const networkMembers = networkRows.rows || networkRows;

    for (const member of networkMembers) {
      const rate = levelRates[member.networkLevel] ?? 0;
      if (!rate) continue;

      const commissionAmount = Math.round(opts.platformFeeAmount * rate * 100) / 100;
      if (commissionAmount < 0.01) continue;

      // Create network commission record
      await (db as any).execute(sql`
        INSERT INTO networkJobCommissions (
          foundingPartnerId, doingPartnerId, opportunityId, jobPaymentId,
          networkLevel, jobValue, platformFeeAmount, commissionRate, commissionAmount
        ) VALUES (
          ${member.foundingPartnerId}, ${opts.doingPartnerId},
          ${opts.opportunityId ?? null}, ${opts.jobPaymentId ?? null},
          ${member.networkLevel}, ${opts.jobValue}, ${opts.platformFeeAmount},
          ${rate}, ${commissionAmount}
        )
      `);

      // Update founding partner totals
      await (db as any).execute(sql`
        UPDATE foundingPartnerStatus
        SET totalNetworkJobCommissionsEarned = totalNetworkJobCommissionsEarned + ${commissionAmount}
        WHERE partnerId = ${member.foundingPartnerId}
      `);

      totalNetworkCuts += commissionAmount;
      commissionsCreated++;
    }
  } catch (err) {
    console.error("[FoundingPartner] Network commission error:", err);
  }

  return { totalNetworkCuts, commissionsCreated, originationCommission };
}

// ─── Process origination commission when job closes at an address ─────────────

export async function processOriginationCommission(opts: {
  propertyAddress: string;
  jobValue: number;
  platformFeeAmount: number;
  opportunityId?: number;
  jobPaymentId?: number;
}): Promise<{ originatorPartnerId: number | null; commissionAmount: number }> {
  const db = await getDb();
  if (!db) return { originatorPartnerId: null, commissionAmount: 0 };

  const addressHash = hashAddress(opts.propertyAddress);

  try {
    // Look up originator
    const originatorRows = await (db as any).execute(sql`
      SELECT ho.id as homeOriginatorId, ho.originatingPartnerId, ho.trustyProActive,
             p.stripeConnectAccountId, p.stripeConnectStatus, p.status as partnerStatus
      FROM homeOriginators ho
      JOIN partners p ON ho.originatingPartnerId = p.id
      WHERE ho.propertyAddressHash = ${addressHash}
        AND ho.isActive = 1
        AND p.status = 'approved'
      LIMIT 1
    `);
    const originator = (originatorRows.rows || originatorRows)[0];
    if (!originator) return { originatorPartnerId: null, commissionAmount: 0 };

    // Only pay origination if house is active on TrustyPro
    // (or if it's a standard ProLnk job — origination pays on all documented addresses)
    const commissionAmount = Math.round(opts.platformFeeAmount * FOUNDING_PARTNER_RATES.origination * 100) / 100;

    if (commissionAmount < 0.01) return { originatorPartnerId: originator.originatingPartnerId, commissionAmount: 0 };

    // Create origination commission record
    await (db as any).execute(sql`
      INSERT INTO originationCommissions (
        originatingPartnerId, homeOriginatorId, opportunityId, jobPaymentId,
        jobValue, platformFeeAmount, commissionRate, commissionAmount
      ) VALUES (
        ${originator.originatingPartnerId}, ${originator.homeOriginatorId},
        ${opts.opportunityId ?? null}, ${opts.jobPaymentId ?? null},
        ${opts.jobValue}, ${opts.platformFeeAmount},
        ${FOUNDING_PARTNER_RATES.origination}, ${commissionAmount}
      )
    `);

    // Update home originator totals
    await (db as any).execute(sql`
      UPDATE homeOriginators
      SET totalOriginationEarned = totalOriginationEarned + ${commissionAmount},
          lastEarningAt = NOW()
      WHERE id = ${originator.homeOriginatorId}
    `);

    // Update founding partner status if this is a founding partner
    await (db as any).execute(sql`
      UPDATE foundingPartnerStatus
      SET totalOriginationCommissionsEarned = totalOriginationCommissionsEarned + ${commissionAmount}
      WHERE partnerId = ${originator.originatingPartnerId}
    `);

    return { originatorPartnerId: originator.originatingPartnerId, commissionAmount };
  } catch (err) {
    console.error("[Origination] Commission error:", err);
    return { originatorPartnerId: null, commissionAmount: 0 };
  }
}

// ─── Process subscription commissions (run monthly) ──────────────────────────

export async function processSubscriptionNetworkCommissions(billingPeriod: string): Promise<{
  processed: number;
  totalCommissions: number;
}> {
  const db = await getDb();
  if (!db) return { processed: 0, totalCommissions: 0 };

  let processed = 0;
  let totalCommissions = 0;

  const levelRates: Record<number, number> = {
    1: FOUNDING_PARTNER_RATES.subscription.level1,
    2: FOUNDING_PARTNER_RATES.subscription.level2,
    3: FOUNDING_PARTNER_RATES.subscription.level3,
    4: FOUNDING_PARTNER_RATES.subscription.level4,
  };

  try {
    // Get all paying active partners
    const payingRows = await (db as any).execute(sql`
      SELECT p.id, p.subscriptionFee, p.tier
      FROM partners p
      WHERE p.status = 'approved'
        AND p.subscriptionFee > 0
        AND p.trialStatus = 'active'
    `);
    const payingPartners = payingRows.rows || payingRows;

    for (const partner of payingPartners) {
      const subscriptionAmount = parseFloat(partner.subscriptionFee || "0");
      if (subscriptionAmount <= 0) continue;

      // Find founding partners who have this partner in their network
      const networkRows = await (db as any).execute(sql`
        SELECT nc.foundingPartnerId, nc.networkLevel
        FROM partnerNetworkChain nc
        JOIN foundingPartnerStatus fps ON nc.foundingPartnerId = fps.partnerId
        WHERE nc.memberPartnerId = ${partner.id}
          AND nc.isActive = 1
          AND fps.status = 'active'
          AND nc.networkLevel BETWEEN 1 AND 4
      `);
      const networkMembers = networkRows.rows || networkRows;

      for (const member of networkMembers) {
        const rate = levelRates[member.networkLevel] ?? 0;
        if (!rate) continue;

        const commissionAmount = Math.round(subscriptionAmount * rate * 100) / 100;

        // Check if already processed this billing period
        const dupCheck = await (db as any).execute(sql`
          SELECT id FROM subscriptionNetworkCommissions
          WHERE foundingPartnerId = ${member.foundingPartnerId}
            AND subscribingPartnerId = ${partner.id}
            AND billingPeriod = ${billingPeriod}
          LIMIT 1
        `);
        if ((dupCheck.rows || dupCheck)[0]) continue;

        await (db as any).execute(sql`
          INSERT INTO subscriptionNetworkCommissions (
            foundingPartnerId, subscribingPartnerId, networkLevel,
            subscriptionAmount, commissionRate, commissionAmount, billingPeriod
          ) VALUES (
            ${member.foundingPartnerId}, ${partner.id}, ${member.networkLevel},
            ${subscriptionAmount}, ${rate}, ${commissionAmount}, ${billingPeriod}
          )
        `);

        await (db as any).execute(sql`
          UPDATE foundingPartnerStatus
          SET totalSubscriptionCommissionsEarned = totalSubscriptionCommissionsEarned + ${commissionAmount}
          WHERE partnerId = ${member.foundingPartnerId}
        `);

        totalCommissions += commissionAmount;
        processed++;
      }
    }
  } catch (err) {
    console.error("[FoundingPartner] Subscription commission error:", err);
  }

  console.log(`[FoundingPartner] Subscription commissions: ${processed} records, $${totalCommissions.toFixed(2)} total`);
  return { processed, totalCommissions };
}

// ─── Enroll a new founding partner ───────────────────────────────────────────

export async function enrollFoundingPartner(opts: {
  partnerId: number;
  enrolledBy?: number;  // admin user ID
}): Promise<{ success: boolean; enrollmentNumber: number | null; message: string }> {
  const db = await getDb();
  if (!db) return { success: false, enrollmentNumber: null, message: "Database unavailable" };

  // Check enrollment count
  const countRows = await (db as any).execute(sql`
    SELECT COUNT(*) as cnt FROM foundingPartnerStatus WHERE status != 'churned'
  `);
  const currentCount = parseInt((countRows.rows || countRows)[0]?.cnt ?? "0");

  if (currentCount >= 100) {
    return { success: false, enrollmentNumber: null, message: "Founding partner enrollment window is closed (100/100 slots filled)" };
  }

  // Check if already enrolled
  const existingRows = await (db as any).execute(sql`
    SELECT id FROM foundingPartnerStatus WHERE partnerId = ${opts.partnerId} LIMIT 1
  `);
  if ((existingRows.rows || existingRows)[0]) {
    return { success: false, enrollmentNumber: null, message: "Partner is already a founding partner" };
  }

  const enrollmentNumber = currentCount + 1;
  const trialEndsAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // 90 days

  // Create founding partner record
  await (db as any).execute(sql`
    INSERT INTO foundingPartnerStatus (
      partnerId, enrollmentNumber, status, trialEndsAt
    ) VALUES (
      ${opts.partnerId}, ${enrollmentNumber}, 'trial', ${trialEndsAt}
    )
  `);

  // Update partners table
  await (db as any).execute(sql`
    UPDATE partners SET
      isFoundingPartner = 1,
      foundingPartnerNumber = ${enrollmentNumber},
      tier = 'enterprise',
      commissionRate = 0.7800,  -- 78% keep rate (enterprise)
      subscriptionFee = 149.00,
      networkLevel1CommissionRate = 0.0700,
      networkLevel2CommissionRate = 0.0400,
      networkLevel3CommissionRate = 0.0200,
      networkLevel4CommissionRate = 0.0100,
      originationCommissionRate = 0.0150,
      updatedAt = NOW()
    WHERE id = ${opts.partnerId}
  `);

  // Add to notification
  await dashboard(
    `🎉 Founding Partner Enrolled #${enrollmentNumber}`,
    `Partner ${opts.partnerId} enrolled as Founding Partner #${enrollmentNumber}. ${100 - enrollmentNumber} slots remaining.`,
    "founding_partner"
  );

  return { success: true, enrollmentNumber, message: `Welcome! You are Founding Partner #${enrollmentNumber} of 100.` };
}

// ─── Build network chain when a partner joins through a founding partner ───────

export async function buildNetworkChain(opts: {
  newPartnerId: number;
  recruitingPartnerId: number;
}): Promise<void> {
  const db = await getDb();
  if (!db) return;

  try {
    // Find if recruiting partner is in any founding partner network
    const chainRows = await (db as any).execute(sql`
      SELECT nc.foundingPartnerId, nc.networkLevel
      FROM partnerNetworkChain nc
      WHERE nc.memberPartnerId = ${opts.recruitingPartnerId}
        AND nc.isActive = 1
    `);
    const existingChain = chainRows.rows || chainRows;

    for (const chain of existingChain) {
      const newLevel = chain.networkLevel + 1;
      if (newLevel > 4) continue; // Max 4 levels deep

      await (db as any).execute(sql`
        INSERT IGNORE INTO partnerNetworkChain (
          foundingPartnerId, memberPartnerId, networkLevel, recruitedByPartnerId
        ) VALUES (
          ${chain.foundingPartnerId}, ${opts.newPartnerId}, ${newLevel}, ${opts.recruitingPartnerId}
        )
      `);
    }

    // If recruiting partner is a founding partner, add at level 1
    const fpRows = await (db as any).execute(sql`
      SELECT id FROM foundingPartnerStatus WHERE partnerId = ${opts.recruitingPartnerId} AND status = 'active' LIMIT 1
    `);
    if ((fpRows.rows || fpRows)[0]) {
      await (db as any).execute(sql`
        INSERT IGNORE INTO partnerNetworkChain (
          foundingPartnerId, memberPartnerId, networkLevel, recruitedByPartnerId
        ) VALUES (
          ${opts.recruitingPartnerId}, ${opts.newPartnerId}, 1, ${opts.recruitingPartnerId}
        )
      `);
    }
  } catch (err) {
    console.error("[FoundingPartner] Network chain build error:", err);
  }
}

// ─── Check requirements progress ────────────────────────────────────────────

export async function checkFoundingPartnerRequirements(partnerId: number): Promise<{
  meetsAll: boolean;
  progress: {
    hasActiveLicense: boolean;
    hasPassedBackgroundCheck: boolean;
    hasGeneralLiability: boolean;
    hasCompletedOnboarding: boolean;
    homesAdded: number;
    homesRequired: number;
    prosReferred: number;
    prosRequired: number;
    isPayingSubscription: boolean;
  };
  missingItems: string[];
}> {
  const db = await getDb();
  if (!db) return { meetsAll: false, progress: {} as any, missingItems: ["Database unavailable"] };

  const missingItems: string[] = [];

  const partnerRows = await (db as any).execute(sql`
    SELECT p.*, fps.homesAdded, fps.prosReferred,
           cb.generalLiabilityStatus, cb.workersCompStatus,
           pp.backgroundCheckStatus
    FROM partners p
    LEFT JOIN foundingPartnerStatus fps ON fps.partnerId = p.id
    LEFT JOIN companyBriefcases cb ON cb.partnerId = p.id
    LEFT JOIN proPassCards pp ON pp.partnerId = p.id AND pp.status = 'active'
    WHERE p.id = ${partnerId} LIMIT 1
  `);
  const partner = (partnerRows.rows || partnerRows)[0];
  if (!partner) return { meetsAll: false, progress: {} as any, missingItems: ["Partner not found"] };

  const homesAdded = parseInt(partner.homesAdded ?? "0");
  const prosReferred = parseInt(partner.prosReferred ?? partner.partnersReferred ?? "0");

  const hasActiveLicense = partner.licenseVerifiedAt !== null;
  const hasPassedBackgroundCheck = partner.backgroundCheckStatus === "clear";
  const hasGeneralLiability = partner.generalLiabilityStatus === "verified";
  const hasCompletedOnboarding = partner.approvedAt !== null && partner.stripeConnectStatus === "active";
  const isPayingSubscription = partner.trialStatus === "active";

  if (!hasActiveLicense) missingItems.push("Active contractor license verification required");
  if (!hasPassedBackgroundCheck) missingItems.push("Background check must be completed and clear");
  if (!hasGeneralLiability) missingItems.push("General liability insurance (verified COI) required");
  if (!hasCompletedOnboarding) missingItems.push("Complete onboarding: profile, service area, Stripe Connect");
  if (homesAdded < 15) missingItems.push(`Add ${15 - homesAdded} more homes to the system (${homesAdded}/15)`);
  if (prosReferred < 5) missingItems.push(`Refer ${5 - prosReferred} more service professionals (${prosReferred}/5)`);
  if (!isPayingSubscription) missingItems.push("Active $149/month subscription required (after 90-day trial)");

  const meetsAll = missingItems.length === 0;

  if (meetsAll && partner.requirementsMet !== 1) {
    await (db as any).execute(sql`
      UPDATE foundingPartnerStatus SET requirementsMet = 1, requirementsMetAt = NOW(), status = 'active'
      WHERE partnerId = ${partnerId}
    `);
  }

  return {
    meetsAll,
    progress: {
      hasActiveLicense,
      hasPassedBackgroundCheck,
      hasGeneralLiability,
      hasCompletedOnboarding,
      homesAdded,
      homesRequired: 15,
      prosReferred,
      prosRequired: 5,
      isPayingSubscription,
    },
    missingItems,
  };
}

// ─── Get founding partner earnings summary ────────────────────────────────────

export async function getFoundingPartnerEarnings(partnerId: number) {
  const db = await getDb();
  if (!db) return null;

  const rows = await (db as any).execute(sql`
    SELECT fps.*,
      (SELECT COUNT(*) FROM partnerNetworkChain WHERE foundingPartnerId = ${partnerId} AND networkLevel = 1) as directRecruits,
      (SELECT COUNT(*) FROM partnerNetworkChain WHERE foundingPartnerId = ${partnerId}) as totalNetworkSize,
      (SELECT COUNT(*) FROM homeOriginators WHERE originatingPartnerId = ${partnerId} AND isActive = 1) as homesOriginated,
      (SELECT SUM(commissionAmount) FROM networkJobCommissions WHERE foundingPartnerId = ${partnerId} AND paid = 0) as unpaidJobCommissions,
      (SELECT SUM(commissionAmount) FROM subscriptionNetworkCommissions WHERE foundingPartnerId = ${partnerId} AND paid = 0) as unpaidSubCommissions,
      (SELECT SUM(commissionAmount) FROM originationCommissions WHERE originatingPartnerId = ${partnerId} AND paid = 0) as unpaidOriginationCommissions
    FROM foundingPartnerStatus fps
    WHERE fps.partnerId = ${partnerId}
    LIMIT 1
  `);
  return (rows.rows || rows)[0] ?? null;
}
