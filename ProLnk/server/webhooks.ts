/**
 * ProLnk Webhook Receivers
 *
 * Handles inbound webhooks from external integrations:
 * - CompanyCam: photo.created events
 * - Jobber: job.completed events
 * - Housecall Pro: job.completed events (polling fallback)
 *
 * All handlers normalize the payload and call enqueuePhoto() from the Intake Router.
 */

import { Router, type Request, type Response } from "express";
import crypto from "crypto";
import { enqueuePhoto } from "./intake-router";
import { getIntegrationByPartnerAndSource, getIntegrationsByPartnerId } from "./intake-router";
import { getDb, closeOpportunityWithJobValue } from "./db";
import { partnerIntegrations, partners, opportunities, fsmWebhookEvents, commissions } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { n8n } from "./n8n-triggers";

// --- Lead Source Tag Parser ---------------------------------------------------
// Extracts partnerId from tag like "ProLnk-42" or "prolnk-42"
function parseProLnkTag(tag: string | null | undefined): number | null {
  if (!tag) return null;
  const m = tag.match(/prolnk[\-_](\d+)/i);
  if (!m) return null;
  const id = parseInt(m[1], 10);
  return isNaN(id) || id <= 0 ? null : id;
}

// Helper: auto-close any accepted opportunity for this partner and trigger commission payout
async function autoCloseOpportunityForJob(
  partnerId: number,
  estimatedJobValue: number
): Promise<void> {
  try {
    const db = await getDb();
    if (!db) return;
    const [opp] = await db
      .select()
      .from(opportunities)
      .where(and(eq(opportunities.receivingPartnerId, partnerId), eq(opportunities.status, "accepted")))
      .limit(1);
    if (!opp) return;
    await closeOpportunityWithJobValue(opp.id, estimatedJobValue, partnerId);
    console.log(`[Webhook] Auto-closed opportunity #${opp.id} for partner #${partnerId}, job value $${estimatedJobValue}`);
    // Fire n8n trigger for commission earned notification
    const commissionAmount = estimatedJobValue * 0.05;
    n8n.leadConverted({
      opportunityId: opp.id,
      receivingPartnerId: partnerId,
      receivingPartnerName: opp.receivingPartnerId ? `Partner #${opp.receivingPartnerId}` : "Partner",
      sourcePartnerId: opp.sourcePartnerId ?? 0,
      jobValue: estimatedJobValue,
      commissionAmount,
      issueType: opp.opportunityType ?? opp.opportunityCategory ?? "Service",
      serviceAddress: "",
    }).catch(() => {});
  } catch (err) {
    console.error("[Webhook] autoCloseOpportunityForJob error:", err);
  }
}

export const webhookRouter = Router();

// --- Signature Verification Helpers ------------------------------------------

function verifyHmacSignature(
  payload: string,
  signature: string,
  secret: string,
  algorithm: "sha256" | "sha1" = "sha256"
): boolean {
  try {
    const expected = crypto
      .createHmac(algorithm, secret)
      .update(payload)
      .digest("hex");
    const sigHeader = signature.replace(/^sha256=|^sha1=/, "");
    return crypto.timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(sigHeader, "hex")
    );
  } catch {
    return false;
  }
}

// --- CompanyCam Webhook -------------------------------------------------------
// Endpoint: POST /api/webhooks/companycam
// Event: photo.created
// Docs: https://developers.companycam.com/docs/webhooks

webhookRouter.post("/companycam", async (req: Request, res: Response) => {
  try {
    const rawBody = JSON.stringify(req.body);
    const signature = req.headers["x-companycam-signature"] as string;

    // Find the partner integration that matches this webhook
    // CompanyCam sends the company_id in the payload
    const payload = req.body;
    const companyId = payload?.company?.id?.toString() ?? payload?.company_id?.toString();

    if (!companyId) {
      res.status(400).json({ error: "Missing company_id in payload" });
      return;
    }

    // Look up which partner has this CompanyCam company connected
    const db = await getDb();
    if (!db) { res.status(500).json({ error: "DB unavailable" }); return; }

    const [integration] = await db
      .select()
      .from(partnerIntegrations)
      .where(eq(partnerIntegrations.externalAccountId, companyId))
      .limit(1);

    if (!integration) {
      // Unknown company -- still return 200 to avoid webhook retries
      res.status(200).json({ received: true, status: "unknown_company" });
      return;
    }

    // Verify HMAC signature if webhook secret is stored
    const webhookSecret = integration.metadata
      ? (JSON.parse(integration.metadata) as { webhookSecret?: string }).webhookSecret
      : null;

    if (webhookSecret && signature) {
      if (!verifyHmacSignature(rawBody, signature, webhookSecret)) {
        res.status(401).json({ error: "Invalid signature" });
        return;
      }
    }

    // Only process photo.created events
    if (payload.event_type !== "photo.created" && payload.type !== "photo.created") {
      res.status(200).json({ received: true, status: "ignored_event" });
      return;
    }

    // Extract photo data from CompanyCam payload
    const photo = payload.photo ?? payload.data?.photo ?? payload;
    const photoUrl = photo?.uris?.original ?? photo?.uri ?? photo?.url;
    const thumbnailUrl = photo?.uris?.thumb ?? photo?.thumbnail_url;
    const project = payload.project ?? payload.data?.project;

    if (!photoUrl) {
      res.status(400).json({ error: "No photo URL in payload" });
      return;
    }

    const queueId = await enqueuePhoto({
      partnerId: integration.partnerId,
      integrationId: integration.id,
      source: "companycam",
      photoUrl,
      thumbnailUrl,
      externalJobId: project?.id?.toString(),
      externalJobName: project?.name ?? project?.address,
      serviceAddress: project?.address ?? project?.full_address,
      capturedAt: photo?.captured_at ? new Date(photo.captured_at * 1000) : undefined,
    });

    res.status(200).json({ received: true, queueId });
  } catch (err) {
    console.error("[Webhook/CompanyCam] Error:", err);
    res.status(500).json({ error: "Internal error" });
  }
});

// --- Jobber Webhook -----------------------------------------------------------
// Endpoint: POST /api/webhooks/jobber
// Event: JOB_COMPLETED
// Docs: https://developer.getjobber.com/docs/webhooks

webhookRouter.post("/jobber", async (req: Request, res: Response) => {
  try {
    const rawBody = JSON.stringify(req.body);
    const signature = req.headers["x-jobber-hmac-sha256"] as string;
    const payload = req.body;

    // Jobber sends accountId in the payload
    const accountId = payload?.accountId?.toString() ?? payload?.data?.accountId?.toString();

    const db = await getDb();
    if (!db) { res.status(500).json({ error: "DB unavailable" }); return; }

    const [integration] = await db
      .select()
      .from(partnerIntegrations)
      .where(eq(partnerIntegrations.externalAccountId, accountId ?? ""))
      .limit(1);

    if (!integration) {
      res.status(200).json({ received: true, status: "unknown_account" });
      return;
    }

    // Verify HMAC
    const meta = integration.metadata ? JSON.parse(integration.metadata) as { clientSecret?: string } : null;
    if (meta?.clientSecret && signature) {
      if (!verifyHmacSignature(rawBody, signature, meta.clientSecret)) {
        res.status(401).json({ error: "Invalid signature" });
        return;
      }
    }

    // Only process JOB_COMPLETED events
    const eventType = payload?.webHookEvent?.event ?? payload?.event;
    if (eventType !== "JOB_COMPLETED") {
      res.status(200).json({ received: true, status: "ignored_event" });
      return;
    }

    // Extract job data -- Jobber sends job details in the event
    const job = payload?.webHookEvent?.data?.job ?? payload?.data?.job ?? {};
    const jobId = job?.id?.toString();
    const jobTitle = job?.title ?? job?.jobType?.name;
    const address = job?.property?.address;
    const addressStr = address
      ? [address.street1, address.city, address.province, address.postalCode]
          .filter(Boolean)
          .join(", ")
      : undefined;

    // Jobber doesn't include photos in webhooks -- we need to fetch them via API
    // For now, enqueue a placeholder that the polling job will fill in
    // In production: call Jobber GraphQL API to fetch job photos
    const attachments: string[] = job?.attachments ?? [];
    const photoUrls = attachments.filter((url: string) =>
      /\.(jpg|jpeg|png|webp|heic)/i.test(url)
    );

    if (photoUrls.length === 0) {
      // No photos attached -- skip
      res.status(200).json({ received: true, status: "no_photos" });
      return;
    }

    let enqueuedCount = 0;
    for (const photoUrl of photoUrls) {
      const queueId = await enqueuePhoto({
        partnerId: integration.partnerId,
        integrationId: integration.id,
        source: "jobber",
        photoUrl,
        externalJobId: jobId,
        externalJobName: jobTitle,
        serviceAddress: addressStr,
        serviceCity: address?.city,
        serviceZip: address?.postalCode,
      });
      if (queueId) enqueuedCount++;
    }

    // Auto-close any accepted opportunity for this partner and trigger commission payout
    const estimatedJobValue = job?.total ?? job?.totalPrice ?? job?.invoiceTotal ?? 0;
    if (estimatedJobValue > 0) {
      await autoCloseOpportunityForJob(integration.partnerId, Number(estimatedJobValue));
    }

    res.status(200).json({ received: true, enqueuedCount });
  } catch (err) {
    console.error("[Webhook/Jobber] Error:", err);
    res.status(500).json({ error: "Internal error" });
  }
});

// --- Housecall Pro Webhook ----------------------------------------------------
// Endpoint: POST /api/webhooks/housecallpro
// Event: job.completed

webhookRouter.post("/housecallpro", async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const eventType = payload?.event ?? payload?.type;

    if (eventType !== "job.completed" && eventType !== "job_completed") {
      res.status(200).json({ received: true, status: "ignored_event" });
      return;
    }

    const job = payload?.job ?? payload?.data ?? {};
    const companyId = payload?.company_id?.toString() ?? job?.company_id?.toString();

    const db = await getDb();
    if (!db) { res.status(500).json({ error: "DB unavailable" }); return; }

    const [integration] = await db
      .select()
      .from(partnerIntegrations)
      .where(eq(partnerIntegrations.externalAccountId, companyId ?? ""))
      .limit(1);

    if (!integration) {
      res.status(200).json({ received: true, status: "unknown_company" });
      return;
    }

    const address = job?.address ?? {};
    const addressStr = [address.street, address.city, address.state, address.zip]
      .filter(Boolean)
      .join(", ");

    const attachments: Array<{ url?: string; file_url?: string }> = job?.attachments ?? [];
    const photoUrls = attachments
      .map((a) => a.url ?? a.file_url)
      .filter((url): url is string => !!url && /\.(jpg|jpeg|png|webp)/i.test(url));

    if (photoUrls.length === 0) {
      res.status(200).json({ received: true, status: "no_photos" });
      return;
    }

    let enqueuedCount = 0;
    for (const photoUrl of photoUrls) {
      const queueId = await enqueuePhoto({
        partnerId: integration.partnerId,
        integrationId: integration.id,
        source: "housecall_pro",
        photoUrl,
        externalJobId: job?.id?.toString(),
        externalJobName: job?.name ?? job?.job_type,
        serviceAddress: addressStr,
        serviceCity: address.city,
        serviceZip: address.zip,
      });
      if (queueId) enqueuedCount++;
    }

    // Auto-close any accepted opportunity for this partner and trigger commission payout
    const estimatedJobValue = job?.total_amount ?? job?.price ?? job?.invoice_total ?? 0;
    if (estimatedJobValue > 0) {
      await autoCloseOpportunityForJob(integration.partnerId, Number(estimatedJobValue));
    }

    res.status(200).json({ received: true, enqueuedCount });
  } catch (err) {
    console.error("[Webhook/HousecallPro] Error:", err);
    res.status(500).json({ error: "Internal error" });
  }
});

// --- FSM Lead-Source Commission Protection -----------------------------------
// Endpoints: POST /api/webhooks/fsm/{platform}
// These routes receive payment/completion events from FSM platforms.
// If the job's lead source tag matches "ProLnk-{partnerId}", the commission
// is auto-closed and logged to fsmWebhookEvents.

async function handleFsmPaymentEvent(
  req: Request,
  res: Response,
  source: "housecall_pro" | "jobber" | "workiz" | "service_fusion" | "fieldedge" | "other",
  extractFn: (body: Record<string, unknown>) => {
    eventType: string;
    externalJobId: string | null;
    leadSourceTag: string | null;
    jobValue: number | null;
  }
) {
  const body = req.body as Record<string, unknown>;
  let parsed: ReturnType<typeof extractFn>;
  try { parsed = extractFn(body); } catch { return res.status(400).json({ error: "Invalid payload" }); }

  const db = await getDb();
  if (!db) return res.status(503).json({ error: "DB unavailable" });

  const isPaymentEvent = /paid|completed|closed|payment|invoice/i.test(parsed.eventType);
  const partnerId = parseProLnkTag(parsed.leadSourceTag);

  // Log the event regardless
  const logStatus = !isPaymentEvent ? "unmatched" : !partnerId ? "unmatched" : "received";
  const logError = !isPaymentEvent ? "Non-payment event" : !partnerId ? "No ProLnk lead source tag" : null;

  const [logResult] = await db.insert(fsmWebhookEvents).values({
    source,
    eventType: parsed.eventType,
    externalJobId: parsed.externalJobId,
    leadSourceTag: parsed.leadSourceTag,
    matchedPartnerId: partnerId ?? undefined,
    jobValue: parsed.jobValue ? String(parsed.jobValue) : null,
    status: logStatus as "received" | "unmatched",
    errorMessage: logError,
    rawPayload: body,
  });

  if (!isPaymentEvent || !partnerId) {
    return res.json({ received: true, processed: false, reason: logError });
  }

  // Verify partner exists
  const [partner] = await db.select({ id: partners.id }).from(partners).where(eq(partners.id, partnerId)).limit(1);
  if (!partner) {
    await db.update(fsmWebhookEvents).set({ status: "error", errorMessage: `Partner ${partnerId} not found` }).where(eq(fsmWebhookEvents.id, (logResult as { insertId: number }).insertId));
    return res.json({ received: true, processed: false, reason: "partner_not_found" });
  }

  // Auto-close the commission
  const [opp] = await db.select().from(opportunities)
    .where(and(eq(opportunities.receivingPartnerId, partnerId), eq(opportunities.status, "accepted")))
    .limit(1);

  let opportunityId: number | null = null;
  let commissionId: number | null = null;

  if (opp) {
    await db.update(opportunities).set({ status: "converted", actualJobValue: parsed.jobValue ? String(parsed.jobValue) : opp.actualJobValue, jobClosedAt: new Date(), updatedAt: new Date() }).where(eq(opportunities.id, opp.id));
    opportunityId = opp.id;
    if (parsed.jobValue && parsed.jobValue > 0) {
      const amt = parseFloat((parsed.jobValue * 0.05).toFixed(2));
      const [cr] = await db.insert(commissions).values({ opportunityId: opp.id, receivingPartnerId: partnerId, commissionType: "referral_commission", amount: String(amt), jobValue: String(parsed.jobValue), feeRate: "0.0500", description: `FSM auto-close via ${source}`, paid: false });
      commissionId = (cr as { insertId: number }).insertId;
    }
  }

  await db.update(fsmWebhookEvents).set({ status: opportunityId ? "commission_closed" : "matched", matchedOpportunityId: opportunityId ?? undefined, processedAt: new Date() }).where(eq(fsmWebhookEvents.id, (logResult as { insertId: number }).insertId));

  return res.json({ received: true, processed: true, partnerId, opportunityId, commissionId });
}

// Housecall Pro -- lead source tag route
webhookRouter.post("/fsm/housecall-pro", (req, res) => handleFsmPaymentEvent(req, res, "housecall_pro", (b) => ({
  eventType: (b.event ?? b.type ?? "") as string,
  externalJobId: ((b.job ?? b.invoice ?? {}) as Record<string, unknown>).id as string ?? null,
  leadSourceTag: ((b.job ?? b.invoice ?? {}) as Record<string, unknown>).lead_source as string ?? null,
  jobValue: parseFloat(String(((b.job ?? b.invoice ?? {}) as Record<string, unknown>).total_amount ?? 0)) || null,
})));

// Jobber -- lead source tag route
webhookRouter.post("/fsm/jobber", (req, res) => handleFsmPaymentEvent(req, res, "jobber", (b) => {
  const job = ((b.data ?? {}) as Record<string, unknown>).job ?? b.job ?? {};
  return {
    eventType: (b.webHookEvent ?? b.event ?? "") as string,
    externalJobId: (job as Record<string, unknown>).id as string ?? null,
    leadSourceTag: (job as Record<string, unknown>).source as string ?? null,
    jobValue: parseFloat(String((job as Record<string, unknown>).total ?? 0)) || null,
  };
}));

// Workiz -- lead source tag route
webhookRouter.post("/fsm/workiz", (req, res) => handleFsmPaymentEvent(req, res, "workiz", (b) => ({
  eventType: (b.event_type ?? b.action ?? "") as string,
  externalJobId: (b.job_id ?? b.id ?? null) as string | null,
  leadSourceTag: (b.lead_source ?? b.source ?? null) as string | null,
  jobValue: parseFloat(String(b.total_price ?? b.amount ?? 0)) || null,
})));

// Service Fusion -- lead source tag route
webhookRouter.post("/fsm/service-fusion", (req, res) => handleFsmPaymentEvent(req, res, "service_fusion", (b) => ({
  eventType: (b.event ?? "") as string,
  externalJobId: ((b.job ?? b) as Record<string, unknown>).id as string ?? null,
  leadSourceTag: ((b.job ?? b) as Record<string, unknown>).lead_source as string ?? null,
  jobValue: parseFloat(String(((b.job ?? b) as Record<string, unknown>).total ?? 0)) || null,
})));

// FieldEdge -- lead source tag route
webhookRouter.post("/fsm/fieldedge", (req, res) => handleFsmPaymentEvent(req, res, "fieldedge", (b) => ({
  eventType: (b.eventType ?? b.event ?? "") as string,
  externalJobId: ((b.job ?? b.data ?? b) as Record<string, unknown>).jobId as string ?? null,
  leadSourceTag: ((b.job ?? b.data ?? b) as Record<string, unknown>).leadSource as string ?? null,
  jobValue: parseFloat(String(((b.job ?? b.data ?? b) as Record<string, unknown>).totalAmount ?? 0)) || null,
})));

// Generic fallback
webhookRouter.post("/fsm/generic", (req, res) => handleFsmPaymentEvent(req, res, "other", (b) => ({
  eventType: (b.event ?? b.event_type ?? b.eventType ?? "unknown") as string,
  externalJobId: (b.job_id ?? b.jobId ?? b.id ?? null) as string | null,
  leadSourceTag: (b.lead_source ?? b.leadSource ?? b.source ?? null) as string | null,
  jobValue: parseFloat(String(b.total ?? b.amount ?? b.job_value ?? 0)) || null,
})));

// --- Field App Photo Submission -----------------------------------------------
// Endpoint: POST /api/webhooks/field-app
// Used by the ProLnk Field App PWA to submit photos directly

webhookRouter.post("/field-app", async (req: Request, res: Response) => {
  try {
    const { partnerId, photoUrl, serviceAddress, serviceCity, serviceZip, latitude, longitude, jobName } = req.body;

    if (!partnerId || !photoUrl) {
      res.status(400).json({ error: "partnerId and photoUrl are required" });
      return;
    }

    const queueId = await enqueuePhoto({
      partnerId: Number(partnerId),
      source: "field_app",
      photoUrl,
      externalJobName: jobName,
      serviceAddress,
      serviceCity,
      serviceZip,
      latitude: latitude ? Number(latitude) : undefined,
      longitude: longitude ? Number(longitude) : undefined,
    });

    res.status(200).json({ received: true, queueId });
  } catch (err) {
    console.error("[Webhook/FieldApp] Error:", err);
    res.status(500).json({ error: "Internal error" });
  }
});
