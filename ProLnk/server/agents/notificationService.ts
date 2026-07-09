/**
 * Agent Notification Service
 * Sends alerts via Resend email when agents detect important events.
 * Also supports SMS via Twilio when configured.
 */

import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const FROM = process.env.FROM_EMAIL || "ProLnk Agents <agents@prolnk.xyz>";
const ADMIN_EMAIL = process.env.OWNER_EMAIL || "andrew@lit-ventures.com";

export async function notifyAdmin(subject: string, body: string, priority: "high" | "normal" = "normal"): Promise<void> {
  if (!resend) {
    console.log(`[Notify] ${priority.toUpperCase()}: ${subject}`);
    return;
  }
  try {
    await resend.emails.send({
      from: FROM,
      to: ADMIN_EMAIL,
      subject: `${priority === "high" ? "🚨 " : "📊 "}${subject}`,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px">
        <h2 style="color:#0A1628">${subject}</h2>
        <div style="white-space:pre-wrap;color:#444;line-height:1.6">${body}</div>
        <hr>
        <p style="font-size:12px;color:#888">ProLnk Agent System · ${new Date().toISOString()}</p>
      </div>`,
    });
  } catch (e) {
    console.warn("[Notify] Email failed:", e);
  }
}

export async function notifyStormAlert(state: string, affectedZips: string[], severity: string): Promise<void> {
  await notifyAdmin(
    `Storm Alert — ${state} (${severity})`,
    `A ${severity} storm event was detected in ${state}.\n\nAffected ZIP codes: ${affectedZips.slice(0, 10).join(", ")}${affectedZips.length > 10 ? `... and ${affectedZips.length - 10} more` : ""}\n\nThe Storm Agent has triggered lead notifications to affected homeowners.`,
    "high"
  );
}

export async function notifyTierFull(tier: string, count: number): Promise<void> {
  await notifyAdmin(
    `Tier Full — ${tier} (${count} members)`,
    `The ${tier} tier has reached capacity at ${count} members.\n\nNew recruits will now be placed in the next available tier.\n\nAction: Review and confirm the overflow routing is working correctly.`,
    "high"
  );
}

export async function notifyCommissionDistributed(jobId: string, totalDistributed: number, proEmail: string): Promise<void> {
  await notifyAdmin(
    `Commission Distributed — Job ${jobId}`,
    `Job completed by ${proEmail}\n\nTotal commissions distributed: $${totalDistributed.toFixed(2)}\n\nAll network partners have been credited.`
  );
}

export async function notifyPartnerApproved(name: string, email: string, tier: string, position: number): Promise<void> {
  await notifyAdmin(
    `New Partner Approved — ${name}`,
    `${name} (${email}) has been approved as a ${tier} member at position #${position}.\n\nThey have been sent a confirmation email with their referral code.`
  );
}

export async function notifyInactivePartners(count: number, flaggedIds: number[]): Promise<void> {
  if (count === 0) return;
  await notifyAdmin(
    `Inactive Partners Report — ${count} flagged`,
    `${count} founding network members have not logged a job in 90+ days.\n\nFlagged IDs: ${flaggedIds.slice(0, 20).join(", ")}\n\nConsider sending re-engagement emails to these partners.`,
    count > 5 ? "high" : "normal"
  );
}
