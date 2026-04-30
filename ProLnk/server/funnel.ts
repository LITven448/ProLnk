/**
 * Funnel Events — Conversion Analytics
 *
 * Every step of the lead-to-commission funnel is tracked here.
 * The funnelEvents table (defined in schema.ts) has been empty since
 * the platform was built — this module fills it.
 *
 * Insert funnel events at:
 *   - intake-router.ts: ai_detected, offer_dispatched
 *   - routers.ts: lead_accepted, lead_declined
 *   - db.ts: job_completed, commission_paid
 *   - payments.ts: job_booked
 *   - admin dispatch: admin_approved
 */

import { getDb } from "./db";
import { sql } from "drizzle-orm";

export type FunnelEventType =
  | "ai_detected"
  | "admin_approved"
  | "offer_composed"
  | "notification_sent"
  | "notification_opened"
  | "page_visited"
  | "offer_clicked"
  | "offer_accepted"
  | "offer_declined"
  | "job_booked"
  | "job_completed"
  | "commission_paid";

export interface FunnelEventData {
  opportunityId: number;
  eventType: FunnelEventType;
  partnerId?: number;
  channel?: "sms" | "email" | "push" | "in_app";
  offerAmount?: number;
  discountPct?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Log a funnel event. Fire-and-forget — never throws.
 * Add this to every key transition in the platform.
 */
export async function logFunnelEvent(data: FunnelEventData): Promise<void> {
  try {
    const db = await getDb();
    if (!db) return;

    await (db as any).execute(sql`
      INSERT INTO funnelEvents (
        opportunityId, partnerId, eventType, channel,
        offerAmount, discountPct, metadata, occurredAt
      ) VALUES (
        ${data.opportunityId}, ${data.partnerId ?? null}, ${data.eventType},
        ${data.channel ?? null}, ${data.offerAmount ?? null}, ${data.discountPct ?? null},
        ${data.metadata ? JSON.stringify(data.metadata) : null}, NOW()
      )
    `);
  } catch (err) {
    // Never let funnel logging break the main flow
    console.error("[Funnel] Failed to log event:", err);
  }
}

// ─── Convenience wrappers for each funnel stage ───────────────────────────────

export const funnel = {
  aiDetected: (opportunityId: number, metadata?: Record<string, unknown>) =>
    logFunnelEvent({ opportunityId, eventType: "ai_detected", metadata }),

  adminApproved: (opportunityId: number, adminId: number) =>
    logFunnelEvent({ opportunityId, eventType: "admin_approved", metadata: { adminId } }),

  notificationSent: (opportunityId: number, channel: "sms" | "email" | "push" | "in_app", partnerId?: number) =>
    logFunnelEvent({ opportunityId, eventType: "notification_sent", channel, partnerId }),

  leadAccepted: (opportunityId: number, partnerId: number, responseTimeHours?: number) =>
    logFunnelEvent({ opportunityId, eventType: "offer_accepted", partnerId, metadata: { responseTimeHours } }),

  leadDeclined: (opportunityId: number, partnerId: number, reason?: string) =>
    logFunnelEvent({ opportunityId, eventType: "offer_declined", partnerId, metadata: { reason } }),

  jobBooked: (opportunityId: number, partnerId: number, jobValue?: number) =>
    logFunnelEvent({ opportunityId, eventType: "job_booked", partnerId, offerAmount: jobValue }),

  jobCompleted: (opportunityId: number, partnerId: number, finalValue?: number) =>
    logFunnelEvent({ opportunityId, eventType: "job_completed", partnerId, offerAmount: finalValue }),

  commissionPaid: (opportunityId: number, partnerId: number, amount: number) =>
    logFunnelEvent({ opportunityId, eventType: "commission_paid", partnerId, offerAmount: amount }),
};
