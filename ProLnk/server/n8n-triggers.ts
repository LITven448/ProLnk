/**
 * ProLnk  n8n Outbound Webhook Triggers
 *
 * When key platform events occur, this module fires HTTP POST requests
 * to configured n8n webhook URLs. n8n then handles downstream automation:
 * SMS, email sequences, Slack alerts, CRM updates, etc.
 *
 * Patent-safe: Standard webhook integration pattern. No imagery analysis.
 *
 * Configuration: Set N8N_WEBHOOK_BASE_URL in environment variables.
 * Each event type maps to a sub-path: /partner-approved, /lead-dispatched, etc.
 *
 * Usage:
 *   import { n8n } from "./n8n-triggers";
 *   await n8n.partnerApproved({ partnerId: 42, partnerName: "Acme HVAC", ... });
 */

// --- Event Type Registry ------------------------------------------------------

export type N8nEventType =
  // Partner lifecycle
  | "partner_application_received"
  | "partner_approved"
  | "partner_rejected"
  | "partner_tier_upgraded"
  | "partner_churned"                  // 30+ days no activity
  | "partner_strike_issued"            // Admin issued a compliance strike
  | "partner_suspended"                // Account suspended
  | "partner_passport_transfer"        // Home Passport transferred to new owner
  // Lead & opportunity lifecycle
  | "lead_dispatched"
  | "lead_accepted"
  | "lead_declined"
  | "lead_expired"
  | "lead_converted"                   // Job closed, commission earned
  // Commission & payout
  | "commission_earned"
  | "commission_dispute_filed"         // Partner opened a dispute
  | "payout_queued"
  | "payout_sent"
  // Referral network
  | "partner_referred_new_partner"
  | "referral_milestone_reached"       // e.g. 5th referral
  | "homeowner_referred_by_agent"      // Real estate agent referred a homeowner
  // Photo & AI pipeline
  | "job_photo_uploaded"
  | "ai_analysis_complete"
  | "opportunity_detected"
  // Homeowner / TrustyPro
  | "homeowner_registered"             // New homeowner account created
  | "homeowner_profile_complete"
  | "homeowner_scan_complete"          // AI scan finished, offers generated
  | "homeowner_deal_viewed"
  | "homeowner_estimate_requested"
  | "homeowner_nps_submitted"          // NPS survey response received
  // Waitlist
  | "waitlist_partner_activated"       // Admin activated a waitlist partner
  | "commercial_waitlist_joined"       // Commercial property manager joined waitlist
  | "waitlist_milestone_reached"       // Waitlist hit 100/250/500/1000
  // Reviews
  | "partner_review_submitted"         // Homeowner submitted a partner review
  // Circumvention
  | "circumvention_flag_raised"        // System flagged potential commission bypass
  // Admin / ops
  | "admin_broadcast_sent"
  | "fsm_commission_auto_closed"
  | "weekly_digest_trigger"            // Cron: every Monday 8am
  | "monthly_payout_trigger";          // Cron: 1st of month

// --- Payload types ------------------------------------------------------------

export interface N8nPayload {
  event: N8nEventType;
  timestamp: string;                   // ISO 8601 UTC
  environment: "production" | "development";
  data: Record<string, unknown>;
}

// --- Core trigger function ----------------------------------------------------

/** Internal: attempt a single webhook POST with timeout. Returns true on success. */
async function attemptWebhook(
  url: string,
  payload: N8nPayload,
  event: N8nEventType,
  timeoutMs = 8000
): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-ProLnk-Secret": process.env.N8N_WEBHOOK_SECRET ?? "",
        "X-ProLnk-Event": event,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (res.ok) return true;
    console.warn(`[n8n] Webhook ${event} returned HTTP ${res.status}`);
    return false;
  } catch (err) {
    clearTimeout(timer);
    console.warn(`[n8n] Attempt failed for ${event}:`, (err as Error).message);
    return false;
  }
}

/**
 * Fire an outbound webhook to n8n with exponential backoff retry.
 * Non-blocking: errors are logged but never thrown to avoid disrupting the
 * primary request flow. Retries up to 3 times with 1s, 2s, 4s delays.
 */
export async function triggerN8n(
  event: N8nEventType,
  data: Record<string, unknown>
): Promise<void> {
  const baseUrl = process.env.N8N_WEBHOOK_BASE_URL;
  if (!baseUrl) {
    if (process.env.NODE_ENV !== "production") {
      console.debug(`[n8n] Skipped (N8N_WEBHOOK_BASE_URL not set): ${event}`, data);
    }
    return;
  }
  const eventPath = event.replace(/_/g, "-");
  const url = `${baseUrl.replace(/\/$/, "")}/${eventPath}`;
  const payload: N8nPayload = {
    event,
    timestamp: new Date().toISOString(),
    environment: (process.env.NODE_ENV === "production" ? "production" : "development"),
    data,
  };
  // Fire-and-forget with retry (non-blocking — never delays the caller)
  (async () => {
    const MAX_RETRIES = 3;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      const ok = await attemptWebhook(url, payload, event);
      if (ok) {
        console.log(`[n8n] Triggered: ${event} (attempt ${attempt})`);
        return;
      }
      if (attempt < MAX_RETRIES) {
        const delay = 1000 * Math.pow(2, attempt - 1); // 1s → 2s → 4s
        console.warn(`[n8n] Retrying ${event} in ${delay}ms (attempt ${attempt}/${MAX_RETRIES})...`);
        await new Promise(r => setTimeout(r, delay));
      }
    }
    console.error(`[n8n] All ${MAX_RETRIES} attempts failed for event: ${event}`);
  })();
}

// --- Convenience wrappers -----------------------------------------------------

export const n8n = {
  // ── Partner Lifecycle ────────────────────────────────────────────────────────

  partnerApplicationReceived: (data: {
    partnerId: number;
    partnerName: string;
    businessType: string;
    email: string;
    phone?: string;
    city?: string;
    state?: string;
    referredByPartnerId?: number;
  }) => triggerN8n("partner_application_received", data),

  partnerApproved: (data: {
    partnerId: number;
    partnerName: string;
    businessType: string;
    email: string;
    tier: string;
  }) => triggerN8n("partner_approved", data),

  partnerRejected: (data: {
    partnerId: number;
    partnerName: string;
    email: string;
    reason?: string;
  }) => triggerN8n("partner_rejected", data),

  partnerTierUpgraded: (data: {
    partnerId: number;
    partnerName: string;
    oldTier: string;
    newTier: string;
    email?: string;
  }) => triggerN8n("partner_tier_upgraded", data),

  partnerChurned: (data: {
    partnerId: number;
    partnerName: string;
    email: string;
    daysSinceLastActivity: number;
    tier: string;
  }) => triggerN8n("partner_churned", data),

  partnerStrikeIssued: (data: {
    partnerId: number;
    partnerName: string;
    email: string;
    strikeNumber: number;
    reason: string;
    issuedByAdminId?: number;
  }) => triggerN8n("partner_strike_issued", data),

  partnerSuspended: (data: {
    partnerId: number;
    partnerName: string;
    email: string;
    reason: string;
    suspendedUntil?: string;
  }) => triggerN8n("partner_suspended", data),

  partnerPassportTransfer: (data: {
    fromPartnerId: number;
    toPartnerId: number;
    homeownerName: string;
    propertyAddress: string;
    transferredAt: string;
  }) => triggerN8n("partner_passport_transfer", data),

  // ── Lead & Opportunity Lifecycle ─────────────────────────────────────────────

  leadDispatched: (data: {
    opportunityId: number;
    receivingPartnerId: number;
    receivingPartnerName: string;
    receivingPartnerPhone?: string;
    receivingPartnerEmail?: string;
    issueType: string;
    serviceCity: string;
    serviceZip?: string;
    estimatedJobValue?: number;
    expiresAt: string;
  }) => triggerN8n("lead_dispatched", data),

  leadAccepted: (data: {
    opportunityId: number;
    receivingPartnerId: number;
    receivingPartnerName: string;
    receivingPartnerPhone?: string;
    issueType: string;
    serviceAddress: string;
    homeownerEmail?: string;
    homeownerName?: string;
  }) => triggerN8n("lead_accepted", data),

  leadDeclined: (data: {
    opportunityId: number;
    receivingPartnerId: number;
    receivingPartnerName: string;
    issueType: string;
    declineReason?: string;
  }) => triggerN8n("lead_declined", data),

  leadExpired: (data: {
    opportunityId: number;
    receivingPartnerId: number;
    issueType: string;
    serviceCity?: string;
    homeownerEmail?: string;
    estimatedJobValue?: number;
  }) => triggerN8n("lead_expired", data),

  leadConverted: (data: {
    opportunityId: number;
    receivingPartnerId: number;
    receivingPartnerName: string;
    sourcePartnerId: number;
    jobValue: number;
    commissionAmount: number;
    issueType: string;
    serviceAddress: string;
  }) => triggerN8n("lead_converted", data),

  // ── Commission & Payout ──────────────────────────────────────────────────────

  commissionEarned: (data: {
    commissionId: number;
    partnerId: number;
    partnerName: string;
    email?: string;
    amount: number;
    jobValue: number;
    source: string;
    runningTotal?: number;
  }) => triggerN8n("commission_earned", data),

  commissionDisputeFiled: (data: {
    disputeId: number;
    partnerId: number;
    partnerName: string;
    email: string;
    commissionId: number;
    disputedAmount: number;
    reason: string;
  }) => triggerN8n("commission_dispute_filed", data),

  payoutQueued: (data: {
    partnerId: number;
    partnerName: string;
    email: string;
    amount: number;
    periodStart: string;
    periodEnd: string;
  }) => triggerN8n("payout_queued", data),

  payoutSent: (data: {
    partnerId: number;
    partnerName: string;
    email: string;
    amount: number;
    stripeTransferId?: string;
  }) => triggerN8n("payout_sent", data),

  // ── Referral Network ─────────────────────────────────────────────────────────

  partnerReferredNewPartner: (data: {
    referringPartnerId: number;
    referringPartnerName: string;
    referringPartnerEmail: string;
    referredPartnerName: string;
    referredPartnerEmail: string;
    referralCount: number;
  }) => triggerN8n("partner_referred_new_partner", data),

  referralMilestoneReached: (data: {
    partnerId: number;
    partnerName: string;
    email: string;
    milestoneCount: number;
    rewardDescription?: string;
  }) => triggerN8n("referral_milestone_reached", data),

  homeownerReferredByAgent: (data: {
    agentPartnerId: number;
    agentName: string;
    agentEmail: string;
    homeownerName: string;
    homeownerEmail: string;
    commissionAmount?: number;
    jobType?: string;
  }) => triggerN8n("homeowner_referred_by_agent", data),

  // ── Photo & AI Pipeline ──────────────────────────────────────────────────────

  jobPhotoUploaded: (data: {
    jobId: number;
    partnerId: number;
    partnerName: string;
    photoCount: number;
    serviceAddress?: string;
  }) => triggerN8n("job_photo_uploaded", data),

  aiAnalysisComplete: (data: {
    jobId: number;
    partnerId: number;
    opportunitiesDetected: number;
    issueTypes: string[];
    serviceAddress: string;
  }) => triggerN8n("ai_analysis_complete", data),

  opportunityDetected: (data: {
    opportunityId: number;
    issueType: string;
    severity: string;
    estimatedValue?: number;
    serviceAddress: string;
    zipCode?: string;
  }) => triggerN8n("opportunity_detected", data),

  // ── Homeowner / TrustyPro ────────────────────────────────────────────────────

  homeownerRegistered: (data: {
    userId: number;
    email: string;
    name?: string;
    source?: string;
  }) => triggerN8n("homeowner_registered", data),

  homeownerProfileComplete: (data: {
    userId: number;
    email?: string;
    name?: string;
    propertyAddress?: string;
    timestamp: string;
  }) => triggerN8n("homeowner_profile_complete", data),

  homeownerScanComplete: (data: {
    userId: number;
    email: string;
    name?: string;
    issueCount: number;
    upgradeCount: number;
    offersGenerated: number;
    highSeverityIssues: boolean;
    roomLabel?: string;
  }) => triggerN8n("homeowner_scan_complete", data),

  homeownerDealViewed: (data: {
    dealToken: string;
    homeownerEmail?: string;
    issueType: string;
    partnerName?: string;
  }) => triggerN8n("homeowner_deal_viewed", data),

  homeownerEstimateRequested: (data: {
    dealToken: string;
    receivingPartnerId: number;
    receivingPartnerName: string;
    homeownerName: string;
    homeownerEmail: string;
    homeownerPhone?: string;
    serviceAddress: string;
  }) => triggerN8n("homeowner_estimate_requested", data),

  homeownerNpsSubmitted: (data: {
    userId?: number;
    email?: string;
    score: number;
    category: "promoter" | "passive" | "detractor";
    feedback?: string;
  }) => triggerN8n("homeowner_nps_submitted", data),

  // ── Waitlist ─────────────────────────────────────────────────────────────────

  waitlistPartnerActivated: (data: {
    partnerId: number;
    partnerName: string;
    email: string;
    businessType: string;
    tier: string;
  }) => triggerN8n("waitlist_partner_activated", data),

  commercialWaitlistJoined: (data: {
    email: string;
    name: string;
    company?: string;
    propertyCount?: number;
    propertyTypes?: string[];
    phone?: string;
  }) => triggerN8n("commercial_waitlist_joined", data),

  waitlistMilestoneReached: (data: {
    type: "partner" | "homeowner" | "commercial";
    count: number;
    milestone: number;
  }) => triggerN8n("waitlist_milestone_reached", data),

  // ── Reviews ──────────────────────────────────────────────────────────────────

  partnerReviewSubmitted: (data: {
    reviewId: number;
    partnerId: number;
    partnerName: string;
    partnerEmail?: string;
    rating: number;
    reviewText?: string;
    homeownerName?: string;
    jobType?: string;
  }) => triggerN8n("partner_review_submitted", data),

  // ── Circumvention ────────────────────────────────────────────────────────────

  circumventionFlagRaised: (data: {
    flagId: number;
    partnerId: number;
    partnerName: string;
    partnerEmail?: string;
    homeownerEmail?: string;
    opportunityId?: number;
    estimatedJobValue?: number;
    evidence: string;
    severity: "low" | "medium" | "high";
  }) => triggerN8n("circumvention_flag_raised", data),

  // ── Admin / Ops ──────────────────────────────────────────────────────────────

  adminBroadcastSent: (data: {
    broadcastId: number;
    title: string;
    recipientCount: number;
    targetTier?: string;
  }) => triggerN8n("admin_broadcast_sent", data),

  fsmCommissionAutoClosed: (data: {
    fsmSource: string;
    partnerId: number;
    opportunityId: number | null;
    commissionId: number | null;
    jobValue: number;
    leadSourceTag: string;
  }) => triggerN8n("fsm_commission_auto_closed", data),

  weeklyDigestTrigger: () =>
    triggerN8n("weekly_digest_trigger", { triggeredAt: new Date().toISOString() }),

  monthlyPayoutTrigger: () =>
    triggerN8n("monthly_payout_trigger", { triggeredAt: new Date().toISOString() }),
};
