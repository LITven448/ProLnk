/**
 * OneSignal Push Notification Helper
 * Sends web push notifications to tagged users via OneSignal REST API.
 * Gracefully no-ops if ONESIGNAL_APP_ID / ONESIGNAL_REST_API_KEY are not set.
 *
 * Usage:
 *   await sendPush({ externalUserId: "123", title: "New Lead", body: "You have a new referral." });
 *   await sendPush({ tag: { key: "role", value: "partner" }, title: "Network Alert", body: "..." });
 */

const ONESIGNAL_APP_ID = process.env.ONESIGNAL_APP_ID;
const ONESIGNAL_REST_API_KEY = process.env.ONESIGNAL_REST_API_KEY;

export interface PushPayload {
  /** Target a specific user by their external user ID (ProLnk user ID as string) */
  externalUserId?: string;
  /** Target all users with a specific tag (e.g. { key: "role", value: "partner" }) */
  tag?: { key: string; value: string };
  title: string;
  body: string;
  /** Optional deep-link URL opened when the notification is tapped */
  url?: string;
  /** Optional data object attached to the notification */
  data?: Record<string, unknown>;
}

export async function sendPush(payload: PushPayload): Promise<boolean> {
  if (!ONESIGNAL_APP_ID || !ONESIGNAL_REST_API_KEY) {
    console.log(`[Push] No OneSignal credentials — would send: "${payload.title}" → ${payload.externalUserId ?? payload.tag?.value ?? "all"}`);
    return false;
  }

  // Build the filters / include_aliases targeting
  const body: Record<string, unknown> = {
    app_id: ONESIGNAL_APP_ID,
    headings: { en: payload.title },
    contents: { en: payload.body },
  };

  if (payload.externalUserId) {
    body.include_aliases = { external_id: [payload.externalUserId] };
    body.target_channel = "push";
  } else if (payload.tag) {
    body.filters = [{ field: "tag", key: payload.tag.key, relation: "=", value: payload.tag.value }];
  } else {
    body.included_segments = ["All"];
  }

  if (payload.url) body.url = payload.url;
  if (payload.data) body.data = payload.data;

  try {
    const res = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${ONESIGNAL_REST_API_KEY}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error(`[Push] OneSignal error ${res.status}: ${err}`);
      return false;
    }
    const result = await res.json() as { id?: string; recipients?: number };
    console.log(`[Push] Sent "${payload.title}" — id: ${result.id}, recipients: ${result.recipients ?? "?"}`);
    return true;
  } catch (err) {
    console.error("[Push] OneSignal fetch error:", err);
    return false;
  }
}

/**
 * Convenience: notify a specific partner about a new lead
 */
export async function pushNewLead(partnerId: number, category: string, estimatedValue?: string | null): Promise<boolean> {
  const valueStr = estimatedValue ? ` (est. $${Number(estimatedValue).toLocaleString()})` : "";
  return sendPush({
    externalUserId: String(partnerId),
    title: `New Lead: ${category}${valueStr}`,
    body: "A new referral lead is waiting for your review. You have 24 hours to accept.",
    url: "/partner/leads",
    data: { type: "new_lead", category, estimatedValue },
  });
}

/**
 * Convenience: notify all partners about a network-wide event
 */
export async function pushNetworkAlert(title: string, body: string, url?: string): Promise<boolean> {
  return sendPush({ tag: { key: "role", value: "partner" }, title, body, url });
}
