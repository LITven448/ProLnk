/**
 * Tiered Notification System
 *
 * Three tiers — based on who needs to act:
 *
 * Tier 1 — AI Handles Automatically (no human needed)
 *   Storm detected, COI expiring, high-confidence lead auto-dispatched
 *   → Logged to notificationLog, AI takes action, nobody emailed
 *
 * Tier 2 — Admin OS Dashboard (check daily, no email)
 *   New applications, compliance alerts, payout batches completed
 *   → Stored in notificationLog for admin dashboard
 *
 * Tier 3 — Email to OWNER_EMAIL (genuine escalations only)
 *   Payout over $10K, fraud flag, legal dispute, system error in financial flow
 *   → Email sent immediately, also logged
 *
 * This replaces the old notifyOwner() which emailed everything.
 */

import { getDb } from "./db";
import { sql } from "drizzle-orm";

export type NotificationTier = "ai_handled" | "dashboard" | "email";

export interface NotifyOptions {
  tier: NotificationTier;
  title: string;
  content: string;
  category?: string;
}

const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "";
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";

/**
 * Send a tiered notification.
 *
 * Tier 1 (ai_handled): Log only. AI already handled this.
 * Tier 2 (dashboard): Log for admin OS. No email.
 * Tier 3 (email): Log + send email to OWNER_EMAIL immediately.
 */
export async function notify(opts: NotifyOptions): Promise<void> {
  const { tier, title, content, category } = opts;

  // Always log to notificationLog
  try {
    const db = await getDb();
    if (db) {
      await (db as any).execute(sql`
        INSERT INTO notificationLog (tier, title, content, category, isRead, emailSent, createdAt)
        VALUES (${tier}, ${title}, ${content}, ${category ?? null}, 0,
                ${tier === "email" ? 1 : 0}, NOW())
      `);
    }
  } catch (err) {
    console.error("[Notify] Failed to log notification:", err);
  }

  // Only send email for tier 3 escalations
  if (tier !== "email") {
    console.log(`[Notify][${tier}] ${title}`);
    return;
  }

  if (!OWNER_EMAIL || !RESEND_API_KEY) {
    console.log(`[Notify][email] ${title}\n${content}`);
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "ProLnk <noreply@prolnk.io>",
        to: [OWNER_EMAIL],
        subject: `[ProLnk] ${title}`,
        html: `<div style="font-family:monospace;max-width:600px;margin:0 auto;padding:24px;">
          <h2 style="color:#dc2626;margin:0 0 16px;">⚡ ${title}</h2>
          <pre style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;white-space:pre-wrap;font-size:14px;">${content}</pre>
          <p style="color:#6b7280;font-size:12px;margin-top:16px;">ProLnk Admin — ${new Date().toLocaleString()}</p>
        </div>`,
      }),
    });
    if (res.ok) {
      console.log(`[Notify][email] Sent: ${title}`);
    } else {
      console.error(`[Notify][email] Resend error: ${res.status}`);
    }
  } catch (err) {
    console.error("[Notify] Email send failed:", err);
  }
}

// ─── Convenience wrappers ─────────────────────────────────────────────────────

/** AI handled this automatically — log only */
export const aiHandled = (title: string, content: string, category?: string) =>
  notify({ tier: "ai_handled", title, content, category });

/** Goes to admin dashboard for daily review — no email */
export const dashboard = (title: string, content: string, category?: string) =>
  notify({ tier: "dashboard", title, content, category });

/** Genuine escalation — email andrew@prolnk.io immediately */
export const escalate = (title: string, content: string, category?: string) =>
  notify({ tier: "email", title, content, category });

// ─── Decision logic — what tier does each event get? ─────────────────────────

export function getNotificationTier(eventType: string): NotificationTier {
  // Tier 1 — AI handles automatically
  const aiHandledEvents = [
    "storm_detected", "lead_auto_dispatched", "coi_expiring_soon",
    "lead_auto_expired_rerouted", "pps_recalculated", "compliance_scan_complete",
    "postcard_sent", "waitlist_email_sent", "background_check_result",
  ];

  // Tier 2 — Admin dashboard (daily check)
  const dashboardEvents = [
    "new_partner_application", "partner_approved", "partner_rejected",
    "partner_auto_suspended", "payout_batch_complete", "dispute_opened",
    "dispute_resolved", "advertiser_application", "new_scout_assessment",
    "bid_submitted", "bid_awarded", "briefcase_document_uploaded",
  ];

  // Tier 3 — Immediate email escalation
  const emailEscalationEvents = [
    "payout_over_10k", "stripe_transfer_failed", "fraud_flag",
    "legal_dispute", "commission_calculation_error", "database_error",
    "stripe_webhook_error", "duplicate_payout_detected",
  ];

  if (aiHandledEvents.includes(eventType)) return "ai_handled";
  if (emailEscalationEvents.includes(eventType)) return "email";
  return "dashboard"; // Default to dashboard
}
