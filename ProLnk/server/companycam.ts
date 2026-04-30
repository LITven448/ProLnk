/**
 * CompanyCam Integration
 *
 * CompanyCam is the primary photo source for the ProLnk AI pipeline.
 * Most contractors already use it — we just need to plug in.
 *
 * Flow:
 *   Partner connects CompanyCam OAuth → we store token → register webhook
 *   → Webhook fires on photo.created → we enqueue photo for AI waterfall
 *   → Same pipeline as field app: waterfall → opportunity → dispatch → commission
 *
 * OAuth App: Register at developers.companycam.com
 * Scopes needed: read:photos, read:projects, write:webhooks
 *
 * CompanyCam photo data we extract:
 *   - original_uri (full-res photo URL)
 *   - captured_at (when photo was taken)
 *   - latitude/longitude (GPS coordinates — huge for address matching)
 *   - project.address.formatted_address
 *   - project_id (links to the job)
 *   - tags (before/after/damage/complete — auto-classify photo type)
 */

import { getDb } from "./db";
import { sql } from "drizzle-orm";
import { enqueuePhoto } from "./intake-router";

const COMPANYCAM_BASE = "https://api.companycam.com/v2";
const CLIENT_ID = process.env.COMPANYCAM_CLIENT_ID ?? "";
const CLIENT_SECRET = process.env.COMPANYCAM_CLIENT_SECRET ?? "";
const REDIRECT_URI = `${process.env.APP_BASE_URL ?? "https://prolnk.io"}/api/integrations/companycam/callback`;

// ─── OAuth ────────────────────────────────────────────────────────────────────

export function getCompanyCamAuthUrl(partnerId: number): string {
  const state = Buffer.from(JSON.stringify({ partnerId, ts: Date.now() })).toString("base64url");
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: "read:photos read:projects write:webhooks",
    state,
  });
  return `https://app.companycam.com/oauth/authorize?${params}`;
}

export async function exchangeCompanyCamCode(code: string): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  accountId: string;
  accountName: string;
}> {
  const res = await fetch("https://app.companycam.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });
  if (!res.ok) throw new Error(`CompanyCam token exchange failed: ${res.status}`);
  const data = await res.json() as any;

  // Get account info
  const profileRes = await fetch(`${COMPANYCAM_BASE}/users/current`, {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });
  const profile = profileRes.ok ? await profileRes.json() as any : {};

  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: new Date(Date.now() + (data.expires_in ?? 3600) * 1000),
    accountId: String(profile.company?.id ?? profile.id ?? "unknown"),
    accountName: profile.company?.name ?? profile.name ?? "CompanyCam Account",
  };
}

export async function refreshCompanyCamToken(refreshToken: string): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}> {
  const res = await fetch("https://app.companycam.com/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error(`CompanyCam token refresh failed: ${res.status}`);
  const data = await res.json() as any;
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? refreshToken,
    expiresAt: new Date(Date.now() + (data.expires_in ?? 3600) * 1000),
  };
}

// ─── Webhook Registration ─────────────────────────────────────────────────────

export async function registerCompanyCamWebhook(accessToken: string): Promise<string | null> {
  const webhookUrl = `${process.env.APP_BASE_URL ?? "https://prolnk.io"}/api/webhooks/companycam`;
  try {
    const res = await fetch(`${COMPANYCAM_BASE}/webhooks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: webhookUrl,
        events: ["photo.created", "project.completed"],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json() as any;
    return data.id ?? null;
  } catch {
    return null;
  }
}

// ─── Photo type detection from tags ──────────────────────────────────────────

function detectPhotoType(tags: string[]): "before" | "after" | "during" | "inspection" | "unknown" {
  const tagStr = tags.join(" ").toLowerCase();
  if (tagStr.includes("after") || tagStr.includes("complete") || tagStr.includes("finished")) return "after";
  if (tagStr.includes("before") || tagStr.includes("existing") || tagStr.includes("original")) return "before";
  if (tagStr.includes("during") || tagStr.includes("progress") || tagStr.includes("wip")) return "during";
  if (tagStr.includes("inspection") || tagStr.includes("damage") || tagStr.includes("issue")) return "inspection";
  return "unknown";
}

// ─── Webhook Handler ──────────────────────────────────────────────────────────

export async function handleCompanyCamWebhook(payload: any): Promise<void> {
  const db = await getDb();
  if (!db) return;

  const eventType = payload.type || payload.event;

  if (eventType !== "photo.created" && eventType !== "photo:created") return;

  const photo = payload.payload?.photo || payload.photo || payload.data?.photo;
  if (!photo) {
    console.warn("[CompanyCam] Webhook missing photo data");
    return;
  }

  const companyId = String(payload.payload?.company_id || payload.company_id || photo.company_id || "unknown");

  // Find the partner who owns this CompanyCam account
  const integrationRows = await (db as any).execute(sql`
    SELECT partnerId FROM partnerIntegrations
    WHERE source = 'companycam' AND externalAccountId = ${companyId} AND status = 'active'
    LIMIT 1
  `);
  const integration = (integrationRows.rows || integrationRows)[0];
  if (!integration) {
    console.log(`[CompanyCam] No integration found for company ${companyId}`);
    return;
  }

  const photoUrl = photo.original_uri || photo.image_url || photo.uri;
  if (!photoUrl) return;

  // Build service address from project
  const project = photo.project || payload.payload?.project || {};
  const address = project.address?.formatted_address ||
    [project.address?.street, project.address?.city, project.address?.state, project.address?.postal_code]
      .filter(Boolean).join(", ");

  // Detect photo type from tags
  const tags = photo.tags?.map((t: any) => typeof t === "string" ? t : t.label || "") ?? [];
  const photoType = detectPhotoType(tags);

  // Enqueue for AI waterfall
  const queueId = await enqueuePhoto({
    partnerId: integration.partnerId,
    source: "companycam",
    photoUrl,
    thumbnailUrl: photo.thumbnail_uri || photo.thumbnail_url,
    externalJobId: String(photo.project_id || project.id || ""),
    externalJobName: project.name || project.title || "",
    serviceAddress: address || undefined,
    serviceCity: project.address?.city,
    serviceZip: project.address?.postal_code,
    latitude: photo.latitude ? parseFloat(photo.latitude) : undefined,
    longitude: photo.longitude ? parseFloat(photo.longitude) : undefined,
    capturedAt: photo.captured_at ? new Date(photo.captured_at) : new Date(),
  });

  // Update photo type if we detected it
  if (queueId && photoType !== "unknown") {
    await (db as any).execute(sql`
      UPDATE photoIntakeQueue SET photoType = ${photoType} WHERE id = ${queueId}
    `);
  }

  console.log(`[CompanyCam] Enqueued photo ${queueId} (${photoType}) for partner ${integration.partnerId} from project ${project.name}`);
}

// ─── Historical Photo Backfill ────────────────────────────────────────────────
// When a partner first connects CompanyCam, pull their last 90 days of photos

export async function backfillCompanyCamPhotos(partnerId: number, accessToken: string): Promise<{
  enqueued: number;
  skipped: number;
}> {
  const since = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
  let page = 1;
  let enqueued = 0;
  let skipped = 0;

  try {
    while (page <= 10) { // Cap at 10 pages (500 photos)
      const res = await fetch(`${COMPANYCAM_BASE}/photos?page=${page}&per_page=50&captured_after=${since}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!res.ok) break;
      const data = await res.json() as any[];
      if (!data.length) break;

      for (const photo of data) {
        const photoUrl = photo.original_uri || photo.image_url;
        if (!photoUrl) { skipped++; continue; }

        const project = photo.project || {};
        const address = project.address?.formatted_address || "";

        const tags = photo.tags?.map((t: any) => typeof t === "string" ? t : t.label) ?? [];
        const photoType = detectPhotoType(tags);

        try {
          await enqueuePhoto({
            partnerId,
            source: "companycam",
            photoUrl,
            externalJobId: String(photo.project_id || ""),
            externalJobName: project.name || "",
            serviceAddress: address || undefined,
            latitude: photo.latitude ? parseFloat(photo.latitude) : undefined,
            longitude: photo.longitude ? parseFloat(photo.longitude) : undefined,
            capturedAt: photo.captured_at ? new Date(photo.captured_at) : undefined,
          });
          enqueued++;
        } catch {
          skipped++;
        }
      }

      if (data.length < 50) break;
      page++;
      await new Promise(r => setTimeout(r, 300)); // Rate limit respect
    }
  } catch (err) {
    console.error("[CompanyCam] Backfill error:", err);
  }

  console.log(`[CompanyCam] Backfill complete for partner ${partnerId}: ${enqueued} enqueued, ${skipped} skipped`);
  return { enqueued, skipped };
}
