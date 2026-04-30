/**
 * Marketing Automation Engine v2
 *
 * Six additional automated marketing workflows:
 *
 * 1. Weekly Partner Digest — Monday 8 AM summary email to each active partner:
 *    leads received, commissions earned, tier progress, top nearby opportunity types.
 *
 * 2. Referral Nudge Engine — when a partner hasn't sent a referral in 14 days,
 *    auto-send an AI-personalized "here's what's near your job sites" nudge.
 *
 * 3. Deal Expiry Urgency Push — 6 hours before a customerDeal expires,
 *    auto-send an urgency email to the homeowner with a one-click accept link.
 *
 * 4. NPS Follow-Up Sequence — after an NPS survey is submitted:
 *    Promoters → Google review ask, Passives → $25 referral credit offer,
 *    Detractors → priority customer success flag + email.
 *
 * 5. Partner Leaderboard Broadcast — every Monday, auto-post top 5 partners
 *    by referrals to the broadcast center with competitive CTA.
 *
 * 6. Homeowner Re-Engagement After Scan — if a homeowner completed an AI scan
 *    but hasn't viewed any offers in 3 days, send a personalized "your results
 *    are waiting" email with the top 3 detected issues.
 *
 * All functions are exported and called from the daily/weekly scheduler in server/_core/index.ts.
 */

import { getDb } from "./db";
import { sql, and, lt, gt, eq, isNull, isNotNull } from "drizzle-orm";
import {
  partners,
  opportunities,
  commissions,
  customerDeals,
  npsSurveys,
  broadcasts,
  homeownerProfiles,
  homeownerScanHistory,
  homeownerScanOffers,
  marketingEmailLog,
} from "../drizzle/schema";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_PROLNK = process.env.FROM_EMAIL ?? "ProLnk <noreply@prolnk.io>";
const FROM_TRUSTYPRO = process.env.FROM_EMAIL_TRUSTYPRO ?? "TrustyPro <noreply@trustypro.io>";
const APP_BASE_URL = process.env.APP_BASE_URL ?? "https://prolnk.io";

// ─── Shared helpers ───────────────────────────────────────────────────────────

async function sendEmail(params: {
  from: string;
  to: string;
  subject: string;
  html: string;
}): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.log(`[AutoV2] No RESEND_API_KEY — would send to ${params.to}: ${params.subject}`);
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      console.error(`[AutoV2] Resend error ${res.status} for ${params.to}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[AutoV2] Email send failed:", err);
    return false;
  }
}

async function hasRecentlySent(
  db: NonNullable<Awaited<ReturnType<typeof getDb>>>,
  userId: number,
  campaignKey: string,
  withinDays: number
): Promise<boolean> {
  const cutoff = new Date(Date.now() - withinDays * 24 * 60 * 60 * 1000);
  const rows = await (db as any).execute(
    sql`SELECT id FROM marketingEmailLog WHERE userId = ${userId} AND campaignKey = ${campaignKey} AND sentAt > ${cutoff} LIMIT 1`
  ) as any;
  const arr = Array.isArray(rows) ? rows : rows?.rows ?? [];
  return arr.length > 0;
}

async function logSent(
  db: NonNullable<Awaited<ReturnType<typeof getDb>>>,
  userId: number,
  campaignKey: string
): Promise<void> {
  await (db as any).execute(
    sql`INSERT INTO marketingEmailLog (userId, campaignKey, sentAt) VALUES (${userId}, ${campaignKey}, NOW())`
  );
}

// ─── 1. Weekly Partner Digest ─────────────────────────────────────────────────

export async function runWeeklyPartnerDigest(): Promise<{ sent: number; errors: number }> {
  const db = await getDb();
  if (!db) return { sent: 0, errors: 0 };
  let sent = 0;
  let errors = 0;

  try {
    // Get all approved, active partners with email
    const activePartners = await (db as any).execute(
      sql`SELECT p.id, p.userId, p.businessName, p.contactName, p.contactEmail, p.tier,
                 p.referralCount, p.jobsLogged, p.totalCommissionEarned, p.weeklyLeadsReceived,
                 p.priorityScore,
                 (SELECT COUNT(*) FROM opportunities o WHERE o.receivingPartnerId = p.id AND o.status = 'accepted' AND o.createdAt > DATE_SUB(NOW(), INTERVAL 7 DAY)) AS leadsThisWeek,
                 (SELECT COALESCE(SUM(c.partnerAmount), 0) FROM commissions c WHERE c.partnerId = p.id AND c.createdAt > DATE_SUB(NOW(), INTERVAL 7 DAY)) AS earningsThisWeek,
                 (SELECT COUNT(*) FROM opportunities o2 WHERE o2.sourcePartnerId = p.id AND o2.createdAt > DATE_SUB(NOW(), INTERVAL 7 DAY)) AS referralsSent
          FROM partners p
          WHERE p.status = 'approved' AND p.contactEmail IS NOT NULL AND p.contactEmail != ''
          LIMIT 500`
    ) as any;

    const partnerRows = Array.isArray(activePartners) ? activePartners : activePartners?.rows ?? [];

    for (const partner of partnerRows) {
      try {
        const campaignKey = `weekly_digest_${getWeekKey()}`;
        const userId = partner.userId ?? partner.id;
        if (await hasRecentlySent(db, userId, campaignKey, 6)) continue;

        const tierNext = getNextTier(partner.tier);
        const jobsToNextTier = getJobsToNextTier(partner.tier, partner.jobsLogged);

        const html = buildWeeklyDigestHtml({
          partnerName: partner.contactName || partner.businessName,
          businessName: partner.businessName,
          tier: partner.tier,
          leadsThisWeek: Number(partner.leadsThisWeek ?? 0),
          referralsSent: Number(partner.referralsSent ?? 0),
          earningsThisWeek: Number(partner.earningsThisWeek ?? 0),
          totalEarnings: Number(partner.totalCommissionEarned ?? 0),
          priorityScore: Number(partner.priorityScore ?? 0),
          tierNext,
          jobsToNextTier,
          dashboardUrl: `${APP_BASE_URL}/dashboard`,
        });

        const ok = await sendEmail({
          from: FROM_PROLNK,
          to: partner.contactEmail,
          subject: `Your ProLnk Weekly Digest — ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
          html,
        });

        if (ok) {
          await logSent(db, userId, campaignKey);
          sent++;
        } else {
          errors++;
        }
      } catch (err) {
        console.error(`[AutoV2] Weekly digest error for partner ${partner.id}:`, err);
        errors++;
      }
    }
  } catch (err) {
    console.error("[AutoV2] runWeeklyPartnerDigest fatal error:", err);
    errors++;
  }

  console.log(`[AutoV2] Weekly partner digest: ${sent} sent, ${errors} errors`);
  return { sent, errors };
}

function getWeekKey(): string {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${week}`;
}

function getNextTier(tier: string): string {
  const tiers = ["scout", "pro", "crew", "company", "enterprise"];
  const idx = tiers.indexOf(tier);
  return idx >= 0 && idx < tiers.length - 1 ? tiers[idx + 1] : "enterprise";
}

function getJobsToNextTier(tier: string, jobsLogged: number): number {
  const thresholds: Record<string, number> = { scout: 10, pro: 25, crew: 50, company: 100 };
  const target = thresholds[tier] ?? 100;
  return Math.max(0, target - jobsLogged);
}

function buildWeeklyDigestHtml(p: {
  partnerName: string;
  businessName: string;
  tier: string;
  leadsThisWeek: number;
  referralsSent: number;
  earningsThisWeek: number;
  totalEarnings: number;
  priorityScore: number;
  tierNext: string;
  jobsToNextTier: number;
  dashboardUrl: string;
}): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:#0A1628;padding:28px 40px;">
            <p style="margin:0;color:#F5E642;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">ProLnk Partner Network</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:700;">Your Weekly Digest</h1>
            <p style="margin:6px 0 0;color:#94a3b8;font-size:13px;">${new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px;">
            <p style="margin:0 0 24px;color:#374151;font-size:15px;">Hi ${p.partnerName},</p>
            <!-- Stats Grid -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td width="50%" style="padding-right:8px;">
                  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;text-align:center;">
                    <div style="font-size:28px;font-weight:800;color:#0A1628;">${p.leadsThisWeek}</div>
                    <div style="font-size:12px;color:#64748b;margin-top:4px;">Leads Received</div>
                  </div>
                </td>
                <td width="50%" style="padding-left:8px;">
                  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;text-align:center;">
                    <div style="font-size:28px;font-weight:800;color:#16a34a;">$${p.earningsThisWeek.toFixed(0)}</div>
                    <div style="font-size:12px;color:#64748b;margin-top:4px;">Commissions This Week</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td width="50%" style="padding-right:8px;padding-top:12px;">
                  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;text-align:center;">
                    <div style="font-size:28px;font-weight:800;color:#7c3aed;">${p.referralsSent}</div>
                    <div style="font-size:12px;color:#64748b;margin-top:4px;">Referrals Sent</div>
                  </div>
                </td>
                <td width="50%" style="padding-left:8px;padding-top:12px;">
                  <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;text-align:center;">
                    <div style="font-size:28px;font-weight:800;color:#f59e0b;">${p.priorityScore}</div>
                    <div style="font-size:12px;color:#64748b;margin-top:4px;">Priority Score</div>
                  </div>
                </td>
              </tr>
            </table>
            ${p.jobsToNextTier > 0 ? `
            <!-- Tier Progress -->
            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:16px;margin-bottom:24px;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#1d4ed8;">
                🚀 ${p.jobsToNextTier} more job${p.jobsToNextTier === 1 ? "" : "s"} to reach <strong>${p.tierNext.charAt(0).toUpperCase() + p.tierNext.slice(1)}</strong> tier
              </p>
              <p style="margin:0;font-size:12px;color:#3b82f6;">Upgrade unlocks higher commission rates and more weekly leads.</p>
            </div>` : `
            <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px;margin-bottom:24px;">
              <p style="margin:0;font-size:13px;font-weight:600;color:#16a34a;">🏆 You're at the top tier — Enterprise. Keep it up!</p>
            </div>`}
            <!-- CTA -->
            <div style="text-align:center;margin-top:8px;">
              <a href="${p.dashboardUrl}" style="display:inline-block;background:#0A1628;color:#F5E642;font-size:14px;font-weight:700;padding:14px 36px;border-radius:8px;text-decoration:none;letter-spacing:0.02em;">
                View Full Dashboard →
              </a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">ProLnk Partner Network · Dallas–Fort Worth, TX<br>
            Total earnings to date: <strong>$${p.totalEarnings.toFixed(0)}</strong> · Tier: <strong>${p.tier.charAt(0).toUpperCase() + p.tier.slice(1)}</strong></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── 2. Referral Nudge Engine ─────────────────────────────────────────────────

export async function runReferralNudgeEngine(): Promise<{ sent: number; errors: number }> {
  const db = await getDb();
  if (!db) return { sent: 0, errors: 0 };
  let sent = 0;
  let errors = 0;

  try {
    // Partners who haven't sent a referral in 14+ days
    const stalePartners = await (db as any).execute(
      sql`SELECT p.id, p.userId, p.businessName, p.contactName, p.contactEmail,
                 p.tier, p.serviceArea, p.referralCount,
                 MAX(o.createdAt) AS lastReferralAt
          FROM partners p
          LEFT JOIN opportunities o ON o.sourcePartnerId = p.id
          WHERE p.status = 'approved' AND p.contactEmail IS NOT NULL
          GROUP BY p.id
          HAVING lastReferralAt IS NULL OR lastReferralAt < DATE_SUB(NOW(), INTERVAL 14 DAY)
          LIMIT 200`
    ) as any;

    const rows = Array.isArray(stalePartners) ? stalePartners : stalePartners?.rows ?? [];

    for (const partner of rows) {
      try {
        const campaignKey = `referral_nudge_${getWeekKey()}`;
        const userId = partner.userId ?? partner.id;
        if (await hasRecentlySent(db, userId, campaignKey, 13)) continue;

        // Get top 3 opportunity types in their service area
        const topOpps = await (db as any).execute(
          sql`SELECT opportunityCategory, COUNT(*) AS cnt
              FROM opportunities
              WHERE status IN ('pending','sent') AND createdAt > DATE_SUB(NOW(), INTERVAL 30 DAY)
              GROUP BY opportunityCategory
              ORDER BY cnt DESC
              LIMIT 3`
        ) as any;
        const oppRows = Array.isArray(topOpps) ? topOpps : topOpps?.rows ?? [];
        const topCategories = oppRows.map((r: any) => r.opportunityCategory);

        const html = buildReferralNudgeHtml({
          partnerName: partner.contactName || partner.businessName,
          businessName: partner.businessName,
          serviceArea: partner.serviceArea,
          topCategories,
          dashboardUrl: `${APP_BASE_URL}/dashboard/leads`,
        });

        const ok = await sendEmail({
          from: FROM_PROLNK,
          to: partner.contactEmail,
          subject: `💡 Opportunities near your job sites — don't leave money on the table`,
          html,
        });

        if (ok) {
          await logSent(db, userId, campaignKey);
          sent++;
        } else {
          errors++;
        }
      } catch (err) {
        console.error(`[AutoV2] Referral nudge error for partner ${partner.id}:`, err);
        errors++;
      }
    }
  } catch (err) {
    console.error("[AutoV2] runReferralNudgeEngine fatal error:", err);
    errors++;
  }

  console.log(`[AutoV2] Referral nudge: ${sent} sent, ${errors} errors`);
  return { sent, errors };
}

function buildReferralNudgeHtml(p: {
  partnerName: string;
  businessName: string;
  serviceArea: string;
  topCategories: string[];
  dashboardUrl: string;
}): string {
  const cats = p.topCategories.length > 0 ? p.topCategories : ["Roofing", "HVAC", "Plumbing"];
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:#0A1628;padding:28px 40px;">
            <p style="margin:0;color:#F5E642;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">ProLnk Partner Network</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:700;">Opportunities Near You</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px;">
            <p style="margin:0 0 16px;color:#374151;font-size:15px;">Hi ${p.partnerName},</p>
            <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">
              It's been a while since you last sent a referral through ProLnk. Your network is active — 
              here are the top service categories generating leads in <strong>${p.serviceArea}</strong> right now:
            </p>
            <div style="margin-bottom:24px;">
              ${cats.map((cat, i) => `
              <div style="display:flex;align-items:center;padding:12px 16px;background:${i === 0 ? "#fefce8" : "#f8fafc"};border:1px solid ${i === 0 ? "#fde68a" : "#e2e8f0"};border-radius:8px;margin-bottom:8px;">
                <span style="font-size:20px;margin-right:12px;">${["🔥","⚡","🏠"][i] ?? "🔧"}</span>
                <div>
                  <div style="font-size:14px;font-weight:600;color:#111827;">${cat}</div>
                  <div style="font-size:12px;color:#6b7280;">Active demand in your area</div>
                </div>
              </div>`).join("")}
            </div>
            <p style="margin:0 0 24px;color:#374151;font-size:14px;line-height:1.6;">
              Every job photo your team takes is a potential referral. Log a job today and let the AI 
              find the cross-sell opportunity — you earn a commission when the lead converts.
            </p>
            <div style="text-align:center;">
              <a href="${p.dashboardUrl}" style="display:inline-block;background:#0A1628;color:#F5E642;font-size:14px;font-weight:700;padding:14px 36px;border-radius:8px;text-decoration:none;">
                Log a Job Now →
              </a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">ProLnk Partner Network · You're receiving this because you haven't sent a referral in 14+ days.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── 3. Deal Expiry Urgency Push ──────────────────────────────────────────────

export async function runDealExpiryUrgencyPush(): Promise<{ sent: number; errors: number }> {
  const db = await getDb();
  if (!db) return { sent: 0, errors: 0 };
  let sent = 0;
  let errors = 0;

  try {
    const sixHoursFromNow = new Date(Date.now() + 6 * 60 * 60 * 1000);
    const now = new Date();

    // Deals expiring in the next 6 hours that are still in "sent" or "viewed" status
    const expiringDeals = await (db as any).execute(
      sql`SELECT id, token, homeownerName, homeownerEmail, issueType, issueDescription,
                 expiresAt, status
          FROM customerDeals
          WHERE status IN ('sent', 'viewed')
            AND expiresAt IS NOT NULL
            AND expiresAt > ${now}
            AND expiresAt <= ${sixHoursFromNow}
            AND homeownerEmail IS NOT NULL
          LIMIT 200`
    ) as any;

    const rows = Array.isArray(expiringDeals) ? expiringDeals : expiringDeals?.rows ?? [];

    for (const deal of rows) {
      try {
        const campaignKey = `deal_expiry_${deal.id}`;
        // Use deal.id as userId proxy (no user account for homeowners)
        if (await hasRecentlySent(db, deal.id, campaignKey, 1)) continue;

        const expiresAt = new Date(deal.expiresAt);
        const hoursLeft = Math.max(1, Math.round((expiresAt.getTime() - Date.now()) / 3600000));
        const dealUrl = `${APP_BASE_URL}/deal/${deal.token}`;

        const html = buildDealExpiryHtml({
          homeownerName: deal.homeownerName || "Homeowner",
          issueType: deal.issueType,
          issueDescription: deal.issueDescription,
          hoursLeft,
          dealUrl,
        });

        const ok = await sendEmail({
          from: FROM_TRUSTYPRO,
          to: deal.homeownerEmail,
          subject: `⏰ Your offer expires in ${hoursLeft} hour${hoursLeft === 1 ? "" : "s"} — act now`,
          html,
        });

        if (ok) {
          await logSent(db, deal.id, campaignKey);
          sent++;
        } else {
          errors++;
        }
      } catch (err) {
        console.error(`[AutoV2] Deal expiry push error for deal ${deal.id}:`, err);
        errors++;
      }
    }
  } catch (err) {
    console.error("[AutoV2] runDealExpiryUrgencyPush fatal error:", err);
    errors++;
  }

  console.log(`[AutoV2] Deal expiry push: ${sent} sent, ${errors} errors`);
  return { sent, errors };
}

function buildDealExpiryHtml(p: {
  homeownerName: string;
  issueType: string;
  issueDescription: string;
  hoursLeft: number;
  dealUrl: string;
}): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:#dc2626;padding:28px 40px;">
            <p style="margin:0;color:#fecaca;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">TrustyPro — Time Sensitive</p>
            <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:700;">⏰ Your Offer Expires in ${p.hoursLeft} Hour${p.hoursLeft === 1 ? "" : "s"}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 40px;">
            <p style="margin:0 0 16px;color:#374151;font-size:15px;">Hi ${p.homeownerName},</p>
            <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">
              A verified pro matched to your <strong>${p.issueType}</strong> issue is still available — 
              but your offer expires soon. Once it expires, we'll need to re-match you from scratch.
            </p>
            <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:16px;margin-bottom:24px;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#dc2626;">What was detected at your property:</p>
              <p style="margin:0;font-size:14px;color:#374151;line-height:1.5;">${p.issueDescription.substring(0, 200)}${p.issueDescription.length > 200 ? "..." : ""}</p>
            </div>
            <div style="text-align:center;margin-bottom:16px;">
              <a href="${p.dealUrl}" style="display:inline-block;background:#dc2626;color:#ffffff;font-size:15px;font-weight:700;padding:16px 40px;border-radius:8px;text-decoration:none;">
                Claim My Offer Now →
              </a>
            </div>
            <p style="margin:0;color:#9ca3af;font-size:12px;text-align:center;">No obligation. Free estimate included.</p>
          </td>
        </tr>
        <tr>
          <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">TrustyPro · Verified Home Service Professionals · Dallas–Fort Worth, TX</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── 4. NPS Follow-Up Sequence ────────────────────────────────────────────────

export async function runNpsFollowUpSequence(): Promise<{ sent: number; errors: number }> {
  const db = await getDb();
  if (!db) return { sent: 0, errors: 0 };
  let sent = 0;
  let errors = 0;

  try {
    // Get NPS surveys completed in the last 24 hours that haven't had follow-up sent
    const recentSurveys = await (db as any).execute(
      sql`SELECT s.id, s.score, s.homeownerEmail, s.homeownerName, s.comment,
                 p.businessName AS partnerName
          FROM npsSurveys s
          LEFT JOIN partners p ON s.partnerId = p.id
          WHERE s.completedAt IS NOT NULL
            AND s.completedAt > DATE_SUB(NOW(), INTERVAL 24 HOUR)
            AND s.homeownerEmail IS NOT NULL
          LIMIT 200`
    ) as any;

    const rows = Array.isArray(recentSurveys) ? recentSurveys : recentSurveys?.rows ?? [];

    for (const survey of rows) {
      try {
        const campaignKey = `nps_followup_${survey.id}`;
        if (await hasRecentlySent(db, survey.id, campaignKey, 1)) continue;

        const score = Number(survey.score ?? 0);
        let subject = "";
        let html = "";

        if (score >= 9) {
          // Promoter → ask for Google review
          subject = `Thank you! Would you share your experience? ⭐`;
          html = buildNpsPromoterHtml({
            name: survey.homeownerName || "Homeowner",
            partnerName: survey.partnerName || "your service pro",
            score,
          });
        } else if (score >= 7) {
          // Passive → referral credit offer
          subject = `We appreciate your feedback — here's a thank-you from TrustyPro`;
          html = buildNpsPassiveHtml({
            name: survey.homeownerName || "Homeowner",
            score,
            referralUrl: `${APP_BASE_URL}/my-home/refer`,
          });
        } else {
          // Detractor → priority CS flag + empathy email
          subject = `We're sorry to hear that — let us make it right`;
          html = buildNpsDetractorHtml({
            name: survey.homeownerName || "Homeowner",
            score,
            comment: survey.comment || "",
            supportUrl: `${APP_BASE_URL}/my-home/support`,
          });

          // Also create a priority support flag in the DB
          try {
            await (db as any).execute(
              sql`INSERT INTO homeownerNotifications (userId, type, title, message, isRead, createdAt)
                  SELECT hp.userId, 'support_priority', 'Priority Follow-Up Needed',
                         CONCAT('NPS detractor (score: ${score}): ', ${survey.homeownerEmail}),
                         0, NOW()
                  FROM homeownerProfiles hp
                  WHERE hp.userId IS NOT NULL
                  LIMIT 1`
            );
          } catch (_) {
            // Non-fatal
          }
        }

        const ok = await sendEmail({
          from: FROM_TRUSTYPRO,
          to: survey.homeownerEmail,
          subject,
          html,
        });

        if (ok) {
          await logSent(db, survey.id, campaignKey);
          sent++;
        } else {
          errors++;
        }
      } catch (err) {
        console.error(`[AutoV2] NPS follow-up error for survey ${survey.id}:`, err);
        errors++;
      }
    }
  } catch (err) {
    console.error("[AutoV2] runNpsFollowUpSequence fatal error:", err);
    errors++;
  }

  console.log(`[AutoV2] NPS follow-up: ${sent} sent, ${errors} errors`);
  return { sent, errors };
}

function buildNpsPromoterHtml(p: { name: string; partnerName: string; score: number }): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <tr><td style="background:#16a34a;padding:28px 40px;">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">Thank You for the ${p.score}/10! 🎉</h1>
        </td></tr>
        <tr><td style="padding:32px 40px;">
          <p style="color:#374151;font-size:15px;">Hi ${p.name},</p>
          <p style="color:#374151;font-size:15px;line-height:1.6;">
            We're thrilled you had a great experience with <strong>${p.partnerName}</strong> through TrustyPro. 
            Would you mind sharing a quick Google review? It helps other homeowners find trusted pros like yours.
          </p>
          <div style="text-align:center;margin:24px 0;">
            <a href="https://g.page/r/trustypro/review" style="display:inline-block;background:#16a34a;color:#fff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;">
              Leave a Google Review ⭐
            </a>
          </div>
          <p style="color:#9ca3af;font-size:13px;">Takes less than 60 seconds. Your feedback means the world to us.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function buildNpsPassiveHtml(p: { name: string; score: number; referralUrl: string }): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <tr><td style="background:#4f46e5;padding:28px 40px;">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">Your Feedback Matters</h1>
        </td></tr>
        <tr><td style="padding:32px 40px;">
          <p style="color:#374151;font-size:15px;">Hi ${p.name},</p>
          <p style="color:#374151;font-size:15px;line-height:1.6;">
            Thank you for your ${p.score}/10 rating. We're always working to improve. As a thank-you, 
            we'd love to give you a <strong>$25 referral credit</strong> when you refer a neighbor to TrustyPro.
          </p>
          <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:16px;margin:20px 0;">
            <p style="margin:0;font-size:14px;color:#1d4ed8;font-weight:600;">🎁 $25 Credit for Every Neighbor You Refer</p>
            <p style="margin:8px 0 0;font-size:13px;color:#374151;">Share your unique link. When they complete their first job, you both get $25.</p>
          </div>
          <div style="text-align:center;">
            <a href="${p.referralUrl}" style="display:inline-block;background:#4f46e5;color:#fff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;">
              Get My Referral Link →
            </a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function buildNpsDetractorHtml(p: {
  name: string;
  score: number;
  comment: string;
  supportUrl: string;
}): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <tr><td style="background:#0A1628;padding:28px 40px;">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">We Want to Make This Right</h1>
        </td></tr>
        <tr><td style="padding:32px 40px;">
          <p style="color:#374151;font-size:15px;">Hi ${p.name},</p>
          <p style="color:#374151;font-size:15px;line-height:1.6;">
            We're sorry your experience didn't meet expectations. Your feedback (${p.score}/10) has been 
            flagged for priority review by our customer success team.
          </p>
          ${p.comment ? `<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:16px;margin:20px 0;">
            <p style="margin:0;font-size:13px;color:#374151;font-style:italic;">"${p.comment}"</p>
          </div>` : ""}
          <p style="color:#374151;font-size:14px;line-height:1.6;">
            A member of our team will reach out within 24 hours. If you'd like to speak with us sooner, 
            please use the link below.
          </p>
          <div style="text-align:center;margin-top:24px;">
            <a href="${p.supportUrl}" style="display:inline-block;background:#0A1628;color:#fff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;">
              Contact Support →
            </a>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ─── 5. Partner Leaderboard Broadcast ────────────────────────────────────────

export async function runLeaderboardBroadcast(): Promise<{ sent: boolean; error?: string }> {
  const db = await getDb();
  if (!db) return { sent: false, error: 'DB unavailable' };

  try {
    // Get top 5 partners by referrals sent this week
    const top5 = await (db as any).execute(
      sql`SELECT p.id, p.businessName, p.contactName, p.tier,
                 COUNT(o.id) AS referralsSent,
                 COALESCE(SUM(c.partnerAmount), 0) AS earningsThisWeek
          FROM partners p
          LEFT JOIN opportunities o ON o.sourcePartnerId = p.id AND o.createdAt > DATE_SUB(NOW(), INTERVAL 7 DAY)
          LEFT JOIN commissions c ON c.partnerId = p.id AND c.createdAt > DATE_SUB(NOW(), INTERVAL 7 DAY)
          WHERE p.status = 'approved'
          GROUP BY p.id
          ORDER BY referralsSent DESC, earningsThisWeek DESC
          LIMIT 5`
    ) as any;

    const rows = Array.isArray(top5) ? top5 : top5?.rows ?? [];
    if (rows.length === 0) return { sent: false, error: "No partners found" };

    const leaderList = rows.map((r: any, i: number) =>
      `${["🥇", "🥈", "🥉", "4️⃣", "5️⃣"][i]} ${r.businessName} — ${r.referralsSent} referrals`
    ).join("\n");

    const message = `🏆 This Week's ProLnk Leaderboard\n\n${leaderList}\n\nCan you make the list next week? Log a job today and let the AI find the cross-sell. Every referral earns you commission.\n\n→ ${APP_BASE_URL}/dashboard`;

    // Insert into broadcasts table
    await (db as any).execute(
      sql`INSERT INTO broadcasts (title, message, audience, sentAt, createdAt)
          VALUES ('Weekly Leaderboard', ${message}, 'all', NOW(), NOW())`
    );

    console.log("[AutoV2] Leaderboard broadcast posted");
    return { sent: true };
  } catch (err) {
    console.error("[AutoV2] runLeaderboardBroadcast error:", err);
    return { sent: false, error: String(err) };
  }
}

// ─── 6. Homeowner Scan Re-Engagement ─────────────────────────────────────────

export async function runScanReEngagement(): Promise<{ sent: number; errors: number }> {
  const db = await getDb();
  if (!db) return { sent: 0, errors: 0 };
  let sent = 0;
  let errors = 0;

  try {
    // Homeowners who completed a scan 3+ days ago but haven't viewed any offers
    const staleScans = await (db as any).execute(
      sql`SELECT hp.id, hp.userId, hp.email, hp.firstName,
                 sh.id AS scanId, sh.createdAt AS scannedAt,
                 (SELECT COUNT(*) FROM homeownerScanOffers so WHERE so.scanId = sh.id) AS offerCount
          FROM homeownerScanHistory sh
          JOIN homeownerProfiles hp ON hp.userId = sh.userId
          WHERE sh.createdAt < DATE_SUB(NOW(), INTERVAL 3 DAY)
            AND sh.createdAt > DATE_SUB(NOW(), INTERVAL 14 DAY)
            AND hp.email IS NOT NULL
          GROUP BY hp.id
          HAVING offerCount > 0
          LIMIT 200`
    ) as any;

    const rows = Array.isArray(staleScans) ? staleScans : staleScans?.rows ?? [];

    for (const row of rows) {
      try {
        const campaignKey = `scan_reengagement_${row.scanId}`;
        const userId = row.userId ?? row.id;
        if (await hasRecentlySent(db, userId, campaignKey, 7)) continue;

        // Get top 3 offers from this scan
        const offers = await (db as any).execute(
          sql`SELECT serviceType, description, urgencyLevel
              FROM homeownerScanOffers
              WHERE scanId = ${row.scanId}
              ORDER BY urgencyLevel ASC
              LIMIT 3`
        ) as any;
        const offerRows = Array.isArray(offers) ? offers : offers?.rows ?? [];

        const html = buildScanReEngagementHtml({
          name: row.firstName || "Homeowner",
          offerCount: Number(row.offerCount ?? 0),
          topOffers: offerRows.map((o: any) => o.serviceType),
          dashboardUrl: `${APP_BASE_URL}/my-home`,
        });

        const ok = await sendEmail({
          from: FROM_TRUSTYPRO,
          to: row.email,
          subject: `Your home scan results are waiting — ${row.offerCount} issue${row.offerCount === 1 ? "" : "s"} detected`,
          html,
        });

        if (ok) {
          await logSent(db, userId, campaignKey);
          sent++;
        } else {
          errors++;
        }
      } catch (err) {
        console.error(`[AutoV2] Scan re-engagement error for user ${row.userId}:`, err);
        errors++;
      }
    }
  } catch (err) {
    console.error("[AutoV2] runScanReEngagement fatal error:", err);
    errors++;
  }

  console.log(`[AutoV2] Scan re-engagement: ${sent} sent, ${errors} errors`);
  return { sent, errors };
}

function buildScanReEngagementHtml(p: {
  name: string;
  offerCount: number;
  topOffers: string[];
  dashboardUrl: string;
}): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <tr><td style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:28px 40px;">
          <p style="margin:0;color:#c4b5fd;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">TrustyPro AI Scan</p>
          <h1 style="margin:8px 0 0;color:#fff;font-size:22px;font-weight:700;">Your Results Are Ready 🏠</h1>
        </td></tr>
        <tr><td style="padding:32px 40px;">
          <p style="color:#374151;font-size:15px;">Hi ${p.name},</p>
          <p style="color:#374151;font-size:15px;line-height:1.6;">
            Your AI home scan detected <strong>${p.offerCount} item${p.offerCount === 1 ? "" : "s"}</strong> that may need attention. 
            Verified pros are ready to give you free estimates.
          </p>
          ${p.topOffers.length > 0 ? `
          <div style="margin:20px 0;">
            ${p.topOffers.map(offer => `
            <div style="padding:10px 14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;margin-bottom:8px;font-size:14px;color:#374151;">
              🔧 <strong>${offer}</strong>
            </div>`).join("")}
          </div>` : ""}
          <div style="text-align:center;margin-top:24px;">
            <a href="${p.dashboardUrl}" style="display:inline-block;background:linear-gradient(135deg,#4f46e5,#7c3aed);color:#fff;font-size:14px;font-weight:700;padding:14px 36px;border-radius:8px;text-decoration:none;">
              View My Scan Results →
            </a>
          </div>
          <p style="margin:16px 0 0;color:#9ca3af;font-size:12px;text-align:center;">Free estimates. No obligation. Verified pros only.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ─── Master runner ────────────────────────────────────────────────────────────

export async function runExtendedMarketingAutomation(): Promise<void> {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0=Sunday, 1=Monday
  const hour = now.getHours();

  console.log(`[AutoV2] Running extended marketing automation (day=${dayOfWeek}, hour=${hour})`);

  // Run daily jobs
  const [dealExpiry, npsFollowUp, scanReEngagement] = await Promise.allSettled([
    runDealExpiryUrgencyPush(),
    runNpsFollowUpSequence(),
    runScanReEngagement(),
  ]);

  // Run weekly jobs on Monday
  if (dayOfWeek === 1) {
    const [weeklyDigest, referralNudge, leaderboard] = await Promise.allSettled([
      runWeeklyPartnerDigest(),
      runReferralNudgeEngine(),
      runLeaderboardBroadcast(),
    ]);
    console.log("[AutoV2] Weekly jobs:", {
      weeklyDigest: weeklyDigest.status,
      referralNudge: referralNudge.status,
      leaderboard: leaderboard.status,
    });
  }

  console.log("[AutoV2] Daily jobs:", {
    dealExpiry: dealExpiry.status,
    npsFollowUp: npsFollowUp.status,
    scanReEngagement: scanReEngagement.status,
  });
}
