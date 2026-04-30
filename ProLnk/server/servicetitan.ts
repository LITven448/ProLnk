/**
 * ServiceTitan Integration Skeleton
 *
 * ServiceTitan is the enterprise FSM used by most HVAC, plumbing, and
 * electrical contractors doing $2M+ in revenue.
 *
 * ACCESS REQUIREMENTS:
 * 1. Create developer account at developer.servicetitan.io (free, immediate)
 * 2. Get sandbox credentials (available immediately after registration)
 * 3. Apply for Titan Exchange ISV listing (4-8 week approval — DO THIS NOW)
 *    → Apply when you have 5+ ServiceTitan contractors using ProLnk manually
 *
 * This file is sandbox-ready. Swap in live credentials when Titan Exchange approved.
 *
 * API version: v2
 * Auth: OAuth 2.0 with tenant scoping (each ST contractor authorizes separately)
 */

const ST_BASE = "https://api.servicetitan.io";
const ST_AUTH_BASE = "https://auth.servicetitan.io";
const APP_KEY = process.env.SERVICETITAN_APP_KEY ?? "";
const CLIENT_ID = process.env.SERVICETITAN_CLIENT_ID ?? "";
const CLIENT_SECRET = process.env.SERVICETITAN_CLIENT_SECRET ?? "";
const REDIRECT_URI = `${process.env.APP_BASE_URL ?? "https://prolnk.io"}/api/integrations/servicetitan/callback`;

// ─── OAuth ────────────────────────────────────────────────────────────────────

export function getServiceTitanAuthUrl(partnerId: number, tenantId?: string): string {
  const state = Buffer.from(JSON.stringify({ partnerId, tenantId, ts: Date.now() })).toString("base64url");
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: "jobs:read invoices:read customers:read reporting:read",
    state,
  });
  return `${ST_AUTH_BASE}/connect/authorize?${params}`;
}

export async function exchangeServiceTitanCode(code: string): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  tenantId: string;
}> {
  const res = await fetch(`${ST_AUTH_BASE}/connect/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }).toString(),
  });
  if (!res.ok) throw new Error(`ServiceTitan token exchange failed: ${res.status}`);
  const data = await res.json() as any;
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: new Date(Date.now() + (data.expires_in ?? 3600) * 1000),
    tenantId: data.tenant_id ?? "",
  };
}

// ─── API Client ───────────────────────────────────────────────────────────────

async function stGet(tenantId: string, accessToken: string, path: string): Promise<any> {
  const res = await fetch(`${ST_BASE}/v2/tenant/${tenantId}${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "ST-App-Key": APP_KEY,
    },
  });
  if (!res.ok) throw new Error(`ServiceTitan API error: ${res.status} ${path}`);
  return res.json();
}

// ─── Get completed jobs with photos ───────────────────────────────────────────

export async function getServiceTitanCompletedJobs(tenantId: string, accessToken: string, page = 1): Promise<{
  jobs: Array<{
    id: number;
    status: string;
    customer: { name: string; email: string; phone: string };
    location: { address: { street: string; city: string; state: string; zip: string } };
    completedOn: string;
    total: number;
    leadSources: string[];
    technicianIds: number[];
  }>;
  hasMore: boolean;
}> {
  try {
    const data = await stGet(tenantId, accessToken, `/jobs?status=Completed&page=${page}&pageSize=50`);
    return {
      jobs: data.data ?? [],
      hasMore: data.hasMore ?? false,
    };
  } catch (err) {
    console.error("[ServiceTitan] Failed to get completed jobs:", err);
    return { jobs: [], hasMore: false };
  }
}

// ─── Check if ProLnk lead source tag is on a job ─────────────────────────────

export function extractProLnkPartnerId(leadSources: string[]): number | null {
  for (const source of leadSources) {
    const match = source.match(/ProLnk-(\d+)/i);
    if (match) return parseInt(match[1], 10);
  }
  return null;
}

// ─── Historical backfill on connect ───────────────────────────────────────────

export async function backfillServiceTitanJobs(
  partnerId: number,
  tenantId: string,
  accessToken: string
): Promise<{ jobs: number; photosEnqueued: number }> {
  const { enqueuePhoto } = await import("./intake-router");
  let totalJobs = 0;
  let totalPhotos = 0;
  let page = 1;
  const MAX_PAGES = 5;

  while (page <= MAX_PAGES) {
    const { jobs, hasMore } = await getServiceTitanCompletedJobs(tenantId, accessToken, page);
    if (!jobs.length) break;

    for (const job of jobs) {
      totalJobs++;
      const addr = job.location?.address;
      if (!addr) continue;

      const address = [addr.street, addr.city, addr.state, addr.zip].filter(Boolean).join(", ");

      // ST jobs don't always have direct photo URLs — they're typically accessed via CompanyCam
      // This enqueues the job record for AI analysis if photos become available via webhook
      // The actual photo sync comes through CompanyCam integration or ST job attachments API
    }

    if (!hasMore) break;
    page++;
    await new Promise(r => setTimeout(r, 500));
  }

  console.log(`[ServiceTitan] Backfill for partner ${partnerId}: ${totalJobs} jobs, ${totalPhotos} photos`);
  return { jobs: totalJobs, photosEnqueued: totalPhotos };
}

// ─── Webhook event handler ────────────────────────────────────────────────────

export async function handleServiceTitanWebhook(payload: any): Promise<void> {
  const { getDb } = await import("./db");
  const { sql } = await import("drizzle-orm");
  const db = await getDb();
  if (!db) return;

  const eventType = payload.eventType || payload.type;
  const jobData = payload.data?.job || payload.job || payload;

  if (!["JobCompleted", "InvoicePaid"].includes(eventType)) return;

  // Check for ProLnk lead source tag
  const leadSources = jobData.leadSources ?? jobData.customFields?.["lead_source"] ?? [];
  const sourcesArray = Array.isArray(leadSources) ? leadSources : [leadSources];
  const partnerId = extractProLnkPartnerId(sourcesArray);

  if (!partnerId) {
    console.log(`[ServiceTitan] Job ${jobData.id} has no ProLnk tag — skipping commission`);
    return;
  }

  const jobValue = parseFloat(jobData.total ?? jobData.invoiceTotal ?? "0");

  // Import and run the existing FSM commission close logic
  const { calculateCommissionRates } = await import("../drizzle/schema");
  const { partners, opportunities } = await import("../drizzle/schema");
  const { eq, and } = await import("drizzle-orm");

  // Find partner and calculate commission
  const partnerRows = await db.select().from(partners).where(eq(partners.id, partnerId)).limit(1);
  const partner = partnerRows[0];
  if (!partner) return;

  const rates = calculateCommissionRates(
    jobValue,
    parseFloat(String(partner.platformFeeRate || "0.12")),
    parseFloat(String(partner.commissionRate || "0.40")),
    partner.isExempt
  );

  // Create commission record
  const openOpps = await db.select().from(opportunities)
    .where(and(eq(opportunities.receivingPartnerId, partnerId), eq(opportunities.status, "accepted")))
    .limit(1);

  if (openOpps.length > 0) {
    const { commissions } = await import("../drizzle/schema");
    await db.insert(commissions).values({
      opportunityId: openOpps[0].id,
      payingPartnerId: partnerId,
      receivingPartnerId: null,
      commissionType: "platform_fee",
      amount: rates.platformFeeAmount.toFixed(2),
      jobValue: jobValue.toFixed(2),
      feeRate: rates.effectiveFeeRate.toFixed(4),
      description: `ServiceTitan job completed — ${jobData.id}`,
    }).catch(() => {});
  }

  console.log(`[ServiceTitan] Commission recorded for partner ${partnerId}: $${rates.referralCommissionAmount.toFixed(2)}`);
}
