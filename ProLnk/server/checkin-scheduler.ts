/**
 * W24: Homeowner Check-In Email Scheduler
 *
 * When a lead is dispatched to a partner, this module schedules a check-in
 * email to the homeowner 48 hours later asking if the job was completed.
 * The homeowner's response activates the circumvention detection loop.
 *
 * Flow:
 *   1. Lead dispatched → scheduleCheckinEmail() called
 *   2. 48h later → sweepPendingCheckins() sends the email
 *   3. Homeowner clicks YES/NO in email → /api/checkin/:token endpoint
 *   4. Confirmation stored → circumvention detector reads it
 */

import { randomBytes } from "crypto";
import { eq, isNull, lte, isNotNull, and } from "drizzle-orm";
import { homeownerCheckins, circumventionFlags, opportunities } from "../drizzle/schema";
import { getDb } from "./db";

// Email helper (mirrors notifications.ts pattern)
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || "ProLnk <noreply@prolnk.com>";

async function sendEmail(params: { to: string; subject: string; html: string }): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.log(`[CheckinEmail] No RESEND_API_KEY -- would send to ${params.to}: ${params.subject}`);
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM_EMAIL, to: params.to, subject: params.subject, html: params.html }),
    });
    if (!res.ok) { console.error(`[CheckinEmail] Resend error: ${res.status}`); return false; }
    console.log(`[CheckinEmail] Sent to ${params.to}: ${params.subject}`);
    return true;
  } catch (err) { console.error("[CheckinEmail] Send failed:", err); return false; }
}

export async function scheduleCheckinEmail(params: {
  opportunityId: number;
  homeownerEmail: string;
  homeownerName: string;
  partnerName: string;
  serviceAddress: string;
  serviceCategory: string;
}): Promise<void> {
  const db = await getDb();
  if (!db) return;

  const token = randomBytes(24).toString("hex");
  const scheduledSendAt = new Date(Date.now() + 48 * 60 * 60 * 1000);

  try {
    await db.insert(homeownerCheckins).values({
      opportunityId: params.opportunityId,
      checkinToken: token,
      scheduledSendAt,
      homeownerEmail: params.homeownerEmail,
      homeownerName: params.homeownerName,
      partnerName: params.partnerName,
      serviceAddress: params.serviceAddress,
    });
    console.log(
      `[CheckinScheduler] Scheduled check-in email for opportunity #${params.opportunityId} at ${scheduledSendAt.toISOString()}`
    );
  } catch (err) {
    console.warn("[CheckinScheduler] Failed to schedule check-in:", err);
  }
}

export async function sweepPendingCheckins(origin: string): Promise<void> {
  const db = await getDb();
  if (!db) return;

  const now = new Date();

  try {
    // Use proper Drizzle ORM query builder — no raw SQL
    const rows = await db
      .select()
      .from(homeownerCheckins)
      .where(
        and(
          isNull(homeownerCheckins.checkinEmailSentAt),
          lte(homeownerCheckins.scheduledSendAt, now),
          isNotNull(homeownerCheckins.homeownerEmail)
        )
      )
      .limit(50);

    if (!rows || rows.length === 0) return;

    console.log(`[CheckinScheduler] Sending ${rows.length} pending check-in emails...`);

    for (const row of rows) {
      try {
        const yesUrl = `${origin}/api/checkin/${row.checkinToken}?response=yes`;
        const noUrl = `${origin}/api/checkin/${row.checkinToken}?response=no`;

        await sendEmail({
          to: row.homeownerEmail!,
          subject: `Quick check-in: Did ${row.partnerName} complete your service?`,
          html: buildCheckinEmailHtml({
            homeownerName: row.homeownerName || "Homeowner",
            partnerName: row.partnerName || "your service professional",
            serviceAddress: row.serviceAddress || "your property",
            yesUrl,
            noUrl,
          }),
        });

        await db
          .update(homeownerCheckins)
          .set({ checkinEmailSentAt: now })
          .where(eq(homeownerCheckins.id, row.id));

        console.log(`[CheckinScheduler] Sent check-in email to ${row.homeownerEmail} for opportunity #${row.opportunityId}`);
      } catch (err) {
        console.warn(`[CheckinScheduler] Failed to send check-in to ${row.homeownerEmail}:`, err);
      }
    }
  } catch (err) {
    console.warn("[CheckinScheduler] sweepPendingCheckins error:", err);
  }
}

export async function processCheckinResponse(
  token: string,
  response?: "yes" | "no"
): Promise<{ opportunityId: number; confirmed: boolean } | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const rows = await db
      .select()
      .from(homeownerCheckins)
      .where(eq(homeownerCheckins.checkinToken, token))
      .limit(1);

    if (!rows || rows.length === 0) return null;
    const row = rows[0];

    // If no response provided, just validate the token exists (show the question page)
    if (!response) return { opportunityId: row.opportunityId!, confirmed: false };

    const confirmed = response === "yes";
    await db
      .update(homeownerCheckins)
      .set({ confirmedCompletion: confirmed })
      .where(eq(homeownerCheckins.id, row.id));

    if (!confirmed) {
      // Flag for circumvention review — homeowner says job wasn't done
      try {
        const addr = row.serviceAddress || "unknown address";
        // Get the opportunity to find the partner
        const oppRows = await db
          .select()
          .from(opportunities)
          .where(eq(opportunities.id, row.opportunityId!))
          .limit(1);

        if (oppRows.length > 0) {
          const opp = oppRows[0];
          await db.insert(circumventionFlags).values({
            partnerId: opp.receivingPartnerId!,
            opportunityId: opp.id,
            signalType: "homeowner_denied_completion",
            severity: "high",
            details: `Homeowner at ${addr} denied that the job was completed by partner.`,
          });
          console.log(`[CheckinScheduler] Circumvention flag created for opportunity #${row.opportunityId}`);
        }
      } catch (flagErr) {
        console.warn("[CheckinScheduler] Failed to create circumvention flag:", flagErr);
      }
    }

    return { opportunityId: row.opportunityId!, confirmed };
  } catch (err) {
    console.warn("[CheckinScheduler] processCheckinResponse error:", err);
    return null;
  }
}

function buildCheckinEmailHtml(params: {
  homeownerName: string;
  partnerName: string;
  serviceAddress: string;
  yesUrl: string;
  noUrl: string;
}): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:#0f172a;padding:28px 40px;">
            <p style="margin:0;color:#22d3ee;font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">ProLnk Partner Network</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:700;">Quick Check-In</h1>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:36px 40px;">
            <p style="margin:0 0 16px;color:#374151;font-size:16px;">Hi ${params.homeownerName},</p>
            <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.6;">
              We connected you with <strong>${params.partnerName}</strong> for a service at 
              <strong>${params.serviceAddress}</strong>.
            </p>
            <p style="margin:0 0 28px;color:#374151;font-size:15px;line-height:1.6;">
              Did they complete the work to your satisfaction?
            </p>
            <!-- CTA Buttons -->
            <table cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
              <tr>
                <td style="padding-right:12px;">
                  <a href="${params.yesUrl}" style="display:inline-block;background:#16a34a;color:#ffffff;font-size:15px;font-weight:600;padding:14px 32px;border-radius:8px;text-decoration:none;">
                    ✓ Yes, job complete
                  </a>
                </td>
                <td>
                  <a href="${params.noUrl}" style="display:inline-block;background:#dc2626;color:#ffffff;font-size:15px;font-weight:600;padding:14px 32px;border-radius:8px;text-decoration:none;">
                    ✗ No, not done
                  </a>
                </td>
              </tr>
            </table>
            <p style="margin:0;color:#9ca3af;font-size:13px;line-height:1.5;">
              Your response helps us maintain quality in the ProLnk network and ensures 
              our partners are delivering great service.
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">
              ProLnk Partner Network · Dallas–Fort Worth, TX<br>
              You received this because a service professional was matched to your property.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
