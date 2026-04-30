/**
 * FSM Webhook Receiver -- Wave 1
 *
 * Receives inbound webhook events from partner FSM platforms:
 *   - Housecall Pro: job.completed, invoice.paid
 *   - Jobber: JOB_COMPLETION, INVOICE_PAYMENT
 *   - Workiz: job_paid, job_completed
 *   - Service Fusion: job.closed
 *   - FieldEdge: job_closed
 *
 * Commission protection flow:
 *   1. Parse the inbound payload
 *   2. Extract the lead source tag (must match "ProLnk-{partnerId}")
 *   3. Match to a ProLnk partner and open opportunity
 *   4. Auto-close the commission record
 *   5. Log the event to fsmWebhookEvents
 *
 * Patent-safe: this is a standard webhook integration pattern.
 * No imagery analysis, no third-party property data pulls.
 */

import { Router, Request, Response } from "express";
import { getDb } from "./db";
import {
  fsmWebhookEvents,
  opportunities,
  partners,
  commissions,
} from "../drizzle/schema";
import { eq, and } from "drizzle-orm";

export const fsmWebhookRouter = Router();

// --- Shared lead source tag parser --------------------------------------------
// Extracts "ProLnk-42"  partnerId = 42
function parseLeadSourceTag(tag: string | undefined | null): number | null {
  if (!tag) return null;
  const match = tag.match(/ProLnk-(\d+)/i);
  if (!match) return null;
  const id = parseInt(match[1], 10);
  return isNaN(id) || id <= 0 ? null : id;
}

// --- Platform-specific payload extractors -------------------------------------

interface NormalizedEvent {
  source: "housecall_pro" | "jobber" | "workiz" | "service_fusion" | "fieldedge" | "other";
  eventType: string;
  externalJobId: string | null;
  leadSourceTag: string | null;
  jobValue: number | null;
}

function extractHousecallPro(body: Record<string, unknown>): NormalizedEvent {
  const event = (body.event as string) ?? "";
  const job = (body.job ?? body.invoice ?? {}) as Record<string, unknown>;
  const leadSource =
    (job.lead_source as string) ??
    (job.custom_fields as Record<string, string>)?.lead_source ??
    null;
  const total =
    parseFloat((job.total_amount as string) ?? (job.total as string) ?? "0") || null;
  return {
    source: "housecall_pro",
    eventType: event,
    externalJobId: (job.id as string) ?? null,
    leadSourceTag: leadSource,
    jobValue: total,
  };
}

function extractJobber(body: Record<string, unknown>): NormalizedEvent {
  const eventType = (body.webHookEvent as string) ?? "";
  const data = (body.data ?? {}) as Record<string, unknown>;
  const job = (data.job ?? data.invoice ?? {}) as Record<string, unknown>;
  const leadSource =
    (job.source as string) ??
    (job.customFields as Record<string, string>)?.lead_source ??
    null;
  const total =
    parseFloat((job.total as string) ?? (job.totalPrice as string) ?? "0") || null;
  return {
    source: "jobber",
    eventType,
    externalJobId: (job.id as string) ?? null,
    leadSourceTag: leadSource,
    jobValue: total,
  };
}

function extractWorkiz(body: Record<string, unknown>): NormalizedEvent {
  const eventType = (body.event_type as string) ?? (body.action as string) ?? "";
  const job = (body.data ?? body.job ?? body) as Record<string, unknown>;
  const leadSource =
    (job.lead_source as string) ??
    (job.source as string) ??
    null;
  const total =
    parseFloat((job.total_price as string) ?? (job.amount as string) ?? "0") || null;
  return {
    source: "workiz",
    eventType,
    externalJobId: (job.job_id as string) ?? (job.id as string) ?? null,
    leadSourceTag: leadSource,
    jobValue: total,
  };
}

function extractServiceFusion(body: Record<string, unknown>): NormalizedEvent {
  const eventType = (body.event as string) ?? "";
  const job = (body.job ?? body) as Record<string, unknown>;
  const leadSource = (job.lead_source as string) ?? null;
  const total = parseFloat((job.total as string) ?? "0") || null;
  return {
    source: "service_fusion",
    eventType,
    externalJobId: (job.id as string) ?? null,
    leadSourceTag: leadSource,
    jobValue: total,
  };
}

function extractFieldEdge(body: Record<string, unknown>): NormalizedEvent {
  const eventType = (body.eventType as string) ?? (body.event as string) ?? "";
  const job = (body.job ?? body.data ?? body) as Record<string, unknown>;
  const leadSource = (job.leadSource as string) ?? (job.lead_source as string) ?? null;
  const total = parseFloat((job.totalAmount as string) ?? "0") || null;
  return {
    source: "fieldedge",
    eventType,
    externalJobId: (job.jobId as string) ?? (job.id as string) ?? null,
    leadSourceTag: leadSource,
    jobValue: total,
  };
}

// --- Commission auto-close -----------------------------------------------------
async function autoCloseCommission(
  partnerId: number,
  jobValue: number | null
): Promise<{ opportunityId: number | null; commissionId: number | null }> {
  const db = await getDb();
  if (!db) return { opportunityId: null, commissionId: null };
  // Find the most recent open opportunity for this partner
  const openOpps = await db
    .select()
    .from(opportunities)
    .where(
      and(
        eq(opportunities.receivingPartnerId, partnerId),
        eq(opportunities.status, "accepted")
      )
    )
    .limit(1);

  if (!openOpps.length) {
    return { opportunityId: null, commissionId: null };
  }

  const opp = openOpps[0];

  // Close the opportunity
  await db
    .update(opportunities)
    .set({
      status: "converted",
      actualJobValue: jobValue ? jobValue.toFixed(2) : opp.actualJobValue,
      jobClosedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(opportunities.id, opp.id));

  // Create commission record if not already present
  // Use tier-based commission math instead of 5% flat
  let commissionAmount: number | null = null;
  if (jobValue && jobValue > 0) {
    // Fetch partner's actual commission rates
    const pRows = await db.select({
      platformFeeRate: partners.platformFeeRate,
      commissionRate: partners.commissionRate,
      isExempt: partners.isExempt,
      monthlyCommissionEarned: partners.monthlyCommissionEarned,
      monthlyCommissionCap: partners.monthlyCommissionCap,
    }).from(partners).where(eq(partners.id, partnerId)).limit(1);
    if (pRows.length) {
      const { calculateCommissionRates } = await import("../drizzle/schema");
      const p = pRows[0];
      const rates = calculateCommissionRates(
        jobValue,
        parseFloat(String(p.platformFeeRate) || "0.12"),
        parseFloat(String(p.commissionRate) || "0.40"),
        p.isExempt,
        parseFloat(String(p.monthlyCommissionEarned) || "0"),
        p.monthlyCommissionCap ? parseFloat(String(p.monthlyCommissionCap)) : null
      );
      commissionAmount = rates.referralCommissionAmount > 0 ? rates.referralCommissionAmount : null;
    }
  }

  if (commissionAmount && commissionAmount > 0) {
    const [result] = await db.insert(commissions).values({
      opportunityId: opp.id,
      receivingPartnerId: partnerId,
      commissionType: "referral_commission",
      amount: commissionAmount.toFixed(2),
      jobValue: jobValue ? jobValue.toFixed(2) : null,
      feeRate: "0.0500",
      description: `FSM auto-close: job value $${jobValue?.toFixed(2) ?? "unknown"}`,
      paid: false,
    });
    return { opportunityId: opp.id, commissionId: (result as { insertId: number }).insertId };
  }

  return { opportunityId: opp.id, commissionId: null };
}

// --- Main webhook handler ------------------------------------------------------
async function handleFsmWebhook(
  req: Request,
  res: Response,
  source: NormalizedEvent["source"],
  extractFn: (body: Record<string, unknown>) => NormalizedEvent
) {
  const body = req.body as Record<string, unknown>;
  let event: NormalizedEvent;

  try {
    event = extractFn(body);
  } catch (err) {
    console.error(`[FSM Webhook] Parse error (${source}):`, err);
    return res.status(400).json({ error: "Invalid payload" });
  }

  const db = await getDb();
  if (!db) return res.status(503).json({ error: "Database unavailable" });

  // Only process payment/completion events
  const isPaymentEvent =
    /paid|completed|closed|payment|invoice/i.test(event.eventType);

  if (!isPaymentEvent) {
    // Log and acknowledge non-payment events without processing
    await db.insert(fsmWebhookEvents).values({
      source: event.source,
      eventType: event.eventType,
      externalJobId: event.externalJobId,
      leadSourceTag: event.leadSourceTag,
      jobValue: event.jobValue ? event.jobValue.toFixed(2) : null,
      status: "unmatched",
      rawPayload: body,
    });
    return res.json({ received: true, processed: false, reason: "non-payment event" });
  }

  const partnerId = parseLeadSourceTag(event.leadSourceTag);

  if (!partnerId) {
    // No ProLnk tag -- log as unmatched
    await db.insert(fsmWebhookEvents).values({
      source: event.source,
      eventType: event.eventType,
      externalJobId: event.externalJobId,
      leadSourceTag: event.leadSourceTag,
      jobValue: event.jobValue ? event.jobValue.toFixed(2) : null,
      status: "unmatched",
      errorMessage: "No ProLnk lead source tag found",
      rawPayload: body,
    });
    return res.json({ received: true, processed: false, reason: "no_prolnk_tag" });
  }

  // Verify partner exists
  const partnerRows = await db
    .select({ id: partners.id })
    .from(partners)
    .where(eq(partners.id, partnerId))
    .limit(1);

  if (!partnerRows.length) {
    await db.insert(fsmWebhookEvents).values({
      source: event.source,
      eventType: event.eventType,
      externalJobId: event.externalJobId,
      leadSourceTag: event.leadSourceTag,
      matchedPartnerId: partnerId,
      jobValue: event.jobValue ? event.jobValue.toFixed(2) : null,
      status: "error",
      errorMessage: `Partner ID ${partnerId} not found in ProLnk`,
      rawPayload: body,
    });
    return res.json({ received: true, processed: false, reason: "partner_not_found" });
  }

  // Auto-close commission
  const { opportunityId, commissionId } = await autoCloseCommission(
    partnerId,
    event.jobValue
  );

  // Log the event
  await db.insert(fsmWebhookEvents).values({
    source: event.source,
    eventType: event.eventType,
    externalJobId: event.externalJobId,
    leadSourceTag: event.leadSourceTag,
    matchedPartnerId: partnerId,
    matchedOpportunityId: opportunityId,
    jobValue: event.jobValue ? event.jobValue.toFixed(2) : null,
    status: opportunityId ? "commission_closed" : "matched",
    processedAt: new Date(),
    rawPayload: body,
  });

  console.log(
    `[FSM Webhook] ${event.source} ${event.eventType}  partner ${partnerId}  opp ${opportunityId}  commission ${commissionId}`
  );

  return res.json({
    received: true,
    processed: true,
    partnerId,
    opportunityId,
    commissionId,
  });
}

// --- Route definitions ---------------------------------------------------------

// Housecall Pro
fsmWebhookRouter.post("/housecall-pro", (req, res) =>
  handleFsmWebhook(req, res, "housecall_pro", extractHousecallPro)
);

// Jobber
fsmWebhookRouter.post("/jobber", (req, res) =>
  handleFsmWebhook(req, res, "jobber", extractJobber)
);

// Workiz
fsmWebhookRouter.post("/workiz", (req, res) =>
  handleFsmWebhook(req, res, "workiz", extractWorkiz)
);

// Service Fusion
fsmWebhookRouter.post("/service-fusion", (req, res) =>
  handleFsmWebhook(req, res, "service_fusion", extractServiceFusion)
);

// FieldEdge
fsmWebhookRouter.post("/fieldedge", (req, res) =>
  handleFsmWebhook(req, res, "fieldedge", extractFieldEdge)
);

// Generic fallback (for any FSM with configurable webhook URL)
fsmWebhookRouter.post("/generic", (req, res) =>
  handleFsmWebhook(req, res, "other", (body) => ({
    source: "other",
    eventType: (body.event ?? body.event_type ?? body.eventType ?? "unknown") as string,
    externalJobId: (body.job_id ?? body.jobId ?? body.id ?? null) as string | null,
    leadSourceTag: (body.lead_source ?? body.leadSource ?? body.source ?? null) as string | null,
    jobValue: parseFloat((body.total ?? body.amount ?? body.job_value ?? "0") as string) || null,
  }))
);
