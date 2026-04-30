/**
 * Owner Notifications — sends an alert email to the platform owner via Resend.
 *
 * Replaces the Manus Forge notification service.
 * Falls back to console.log if RESEND_API_KEY or OWNER_EMAIL is not configured
 * (so development works without email credentials).
 *
 * Required env vars:
 *   RESEND_API_KEY    — already used by server/email.ts
 *   OWNER_EMAIL       — the platform owner's email address for admin alerts
 */

export type NotificationPayload = {
  title: string;
  content: string;
};

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const OWNER_EMAIL = process.env.OWNER_EMAIL || process.env.FROM_EMAIL?.replace(/.*</, "").replace(">", "") || "";
const FROM_EMAIL = process.env.FROM_EMAIL || "ProLnk <noreply@prolnk.io>";

/**
 * Send an admin alert to the platform owner.
 * Returns true if delivered, false on failure (non-throwing — callers use .catch(() => {})).
 */
export async function notifyOwner(payload: NotificationPayload): Promise<boolean> {
  const { title, content } = payload;

  if (!title?.trim() || !content?.trim()) {
    console.warn("[Notification] Empty title or content — skipping");
    return false;
  }

  if (!RESEND_API_KEY || !OWNER_EMAIL) {
    // Dev fallback — log to console instead of failing silently
    console.log(`[Notification] ${title}\n${content}`);
    return false;
  }

  try {
    const htmlContent = content
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [OWNER_EMAIL],
        subject: `[ProLnk Admin] ${title}`,
        html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h2 style="color:#0A1628;margin:0 0 16px;">${title}</h2>
          <div style="color:#475569;line-height:1.6;">${htmlContent}</div>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;">
          <p style="color:#94a3b8;font-size:12px;">ProLnk Admin Alert — ${new Date().toLocaleString()}</p>
        </div>`,
        text: `${title}\n\n${content}`,
      }),
    });

    if (!res.ok) {
      const err = await res.text().catch(() => res.statusText);
      console.error(`[Notification] Resend error (${res.status}): ${err}`);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[Notification] Failed to send owner alert:", err);
    return false;
  }
}
