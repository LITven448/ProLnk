/**
 * Marketing Automation Engine
 *
 * Handles three automated marketing workflows:
 *
 * 1. Seasonal Maintenance Reminders — sent to homeowners each quarter
 *    based on the current season, prompting them to schedule relevant services.
 *
 * 2. Win-Back Campaign — sent to homeowners who haven't logged into TrustyPro
 *    or booked a service in 60+ days, with a personalized re-engagement message.
 *
 * 3. Tier Milestone Notifications — sent to pros when they are within 1 job
 *    of reaching the next tier, creating urgency and driving engagement.
 *
 * Runs daily at 8:00 AM via the background scheduler.
 */

import { getDb } from "./db";
import { sql } from "drizzle-orm";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const APP_BASE_URL = process.env.APP_BASE_URL ?? "https://prolnk.io";
const FROM_EMAIL = process.env.FROM_EMAIL ?? "ProLnk <noreply@prolnk.io>";
const FROM_TRUSTYPRO = process.env.FROM_EMAIL_TRUSTYPRO ?? "TrustyPro <noreply@trustypro.io>";
const FROM_PROLNK = FROM_EMAIL;

async function sendEmail(params: { from: string; to: string; subject: string; html: string }) {
  if (!RESEND_API_KEY) {
    console.log(`[MarketingAuto] No RESEND_API_KEY — would send to ${params.to}: ${params.subject}`);
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    if (!res.ok) { console.error(`[MarketingAuto] Resend error: ${res.status}`); return false; }
    return true;
  } catch (err) {
    console.error("[MarketingAuto] Send failed:", err);
    return false;
  }
}

// ─── Seasonal Maintenance Reminders ──────────────────────────────────────────

const SEASONAL_TIPS: Record<string, { season: string; emoji: string; tips: string[]; cta: string }> = {
  winter: {
    season: "Winter",
    emoji: "❄️",
    tips: [
      "Check your furnace filter and schedule an HVAC tune-up before the cold sets in",
      "Inspect your roof for missing shingles or ice dam risk",
      "Wrap exposed pipes to prevent freezing",
      "Test your carbon monoxide and smoke detectors",
    ],
    cta: "Find a Verified HVAC or Roofing Pro",
  },
  spring: {
    season: "Spring",
    emoji: "🌸",
    tips: [
      "Schedule a roof inspection after winter — catch damage early",
      "Clean gutters and downspouts to prevent water damage",
      "Check your AC unit before summer heat arrives",
      "Inspect your foundation and driveway for winter cracks",
    ],
    cta: "Book a Spring Home Inspection",
  },
  summer: {
    season: "Summer",
    emoji: "☀️",
    tips: [
      "Have your AC serviced — peak season means longer wait times",
      "Check attic ventilation to reduce cooling costs",
      "Inspect your deck or patio for rot or loose boards",
      "Trim trees and shrubs away from your home and power lines",
    ],
    cta: "Find a Verified AC or Landscaping Pro",
  },
  fall: {
    season: "Fall",
    emoji: "🍂",
    tips: [
      "Schedule a furnace tune-up before temperatures drop",
      "Clean gutters after leaves fall to prevent ice dams",
      "Seal windows and doors to improve energy efficiency",
      "Have your chimney inspected and cleaned before fireplace season",
    ],
    cta: "Schedule Fall Home Maintenance",
  },
};

function getCurrentSeason(): string {
  const month = new Date().getMonth() + 1; // 1-12
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "fall";
  return "winter";
}

export async function runSeasonalReminderCampaign(): Promise<{ sent: number; errors: number }> {
  const db = await getDb();
  if (!db) return { sent: 0, errors: 0 };

  const season = getCurrentSeason();
  const seasonal = SEASONAL_TIPS[season];
  const campaignKey = `seasonal_${season}_${new Date().getFullYear()}`;

  // Find homeowners who haven't received this season's reminder yet
  const rows = await (db as any).execute(
    sql.raw(`
      SELECT hp.userId, hp.displayName, u.email, u.name
      FROM homeownerProfiles hp
      JOIN users u ON u.id = hp.userId
      WHERE u.email IS NOT NULL
        AND NOT EXISTS (
          SELECT 1 FROM marketingEmailLog mel
          WHERE mel.userId = hp.userId
            AND mel.campaignKey = '${campaignKey}'
        )
      LIMIT 200
    `)
  ).catch(() => ({ rows: [] })) as any;

  const homeowners = (rows.rows ?? rows) as any[];
  let sent = 0;
  let errors = 0;
  const dashboardUrl = `${APP_BASE_URL}/my-home`;

  for (const ho of homeowners) {
    const name = ho.displayName ?? ho.name ?? "Homeowner";
    const tipsHtml = seasonal.tips
      .map(t => `<li style="margin-bottom:8px;color:#475569;">${t}</li>`)
      .join("");

    const ok = await sendEmail({
      from: FROM_TRUSTYPRO,
      to: ho.email,
      subject: `${seasonal.emoji} ${seasonal.season} Home Maintenance Checklist — TrustyPro`,
      html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
        <div style="background:linear-gradient(135deg,#1e3a5f,#00B5B8);padding:32px;text-align:center;">
          <div style="font-size:40px;margin-bottom:8px;">${seasonal.emoji}</div>
          <div style="font-size:24px;font-weight:800;color:#fff;">${seasonal.season} Home Checklist</div>
          <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">TrustyPro — Your Home Health Partner</p>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#0f172a;margin:0 0 8px;">Hi ${name},</h2>
          <p style="color:#475569;line-height:1.7;">${seasonal.season} is here — here are the top maintenance tasks to protect your home's value this season:</p>
          <ul style="padding-left:20px;margin:20px 0;">${tipsHtml}</ul>
          <div style="background:#E6FAFA;border:1px solid #99E6E8;border-radius:12px;padding:20px;margin:20px 0;text-align:center;">
            <p style="color:#0e7490;font-weight:700;margin:0 0 8px;">All tasks are logged in your Home Health Vault</p>
            <p style="color:#475569;font-size:14px;margin:0;">Every service you book through TrustyPro is automatically documented and adds to your home's verified history.</p>
          </div>
          <div style="text-align:center;margin:24px 0;">
            <a href="${dashboardUrl}?utm_source=email&utm_medium=seasonal&utm_campaign=${campaignKey}" style="background:#00B5B8;color:#fff;padding:14px 36px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">${seasonal.cta}</a>
          </div>
        </div>
        <div style="background:#f1f5f9;padding:20px 32px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">© 2026 TrustyPro — DFW, Texas | <a href="${dashboardUrl}/settings" style="color:#94a3b8;">Manage Notifications</a></p>
        </div>
      </div>`,
    });

    if (ok) {
      // Log that this email was sent so we don't resend
      await (db as any).execute(
        sql.raw(`INSERT IGNORE INTO marketingEmailLog (userId, campaignKey, sentAt) VALUES (${ho.userId}, '${campaignKey}', NOW())`)
      ).catch(() => {});
      sent++;
    } else {
      errors++;
    }
  }

  console.log(`[MarketingAuto] Seasonal reminders (${season}): ${sent} sent, ${errors} errors`);
  return { sent, errors };
}

// ─── Win-Back Campaign ────────────────────────────────────────────────────────

export async function runWinBackCampaign(): Promise<{ sent: number; errors: number }> {
  const db = await getDb();
  if (!db) return { sent: 0, errors: 0 };

  const campaignKey = `winback_${new Date().toISOString().slice(0, 7)}`; // Monthly

  // Find homeowners inactive for 60+ days who haven't received this month's win-back
  const rows = await (db as any).execute(
    sql.raw(`
      SELECT hp.userId, hp.displayName, u.email, u.name,
             DATEDIFF(NOW(), u.lastLoginAt) as daysSinceLogin
      FROM homeownerProfiles hp
      JOIN users u ON u.id = hp.userId
      WHERE u.email IS NOT NULL
        AND u.lastLoginAt IS NOT NULL
        AND DATEDIFF(NOW(), u.lastLoginAt) >= 60
        AND NOT EXISTS (
          SELECT 1 FROM marketingEmailLog mel
          WHERE mel.userId = hp.userId
            AND mel.campaignKey = '${campaignKey}'
        )
      ORDER BY u.lastLoginAt ASC
      LIMIT 100
    `)
  ).catch(() => ({ rows: [] })) as any;

  const homeowners = (rows.rows ?? rows) as any[];
  let sent = 0;
  let errors = 0;
  const dashboardUrl = `${APP_BASE_URL}/my-home`;

  for (const ho of homeowners) {
    const name = ho.displayName ?? ho.name ?? "Homeowner";
    const days = ho.daysSinceLogin ?? 60;

    const ok = await sendEmail({
      from: FROM_TRUSTYPRO,
      to: ho.email,
      subject: `Your Home Health Vault is waiting for you — TrustyPro`,
      html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
        <div style="background:linear-gradient(135deg,#1e3a5f,#00B5B8);padding:32px;text-align:center;">
          <div style="font-size:40px;margin-bottom:8px;">🏠</div>
          <div style="font-size:24px;font-weight:800;color:#fff;">We Miss You</div>
          <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">TrustyPro — Your Home Health Partner</p>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#0f172a;margin:0 0 8px;">Hi ${name},</h2>
          <p style="color:#475569;line-height:1.7;">It's been ${days} days since you last checked in on your home. Your Home Health Vault is ready whenever you are — and there may be seasonal maintenance tasks worth scheduling before they become expensive repairs.</p>
          <div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:12px;padding:20px;margin:20px 0;">
            <p style="color:#c2410c;font-weight:700;margin:0 0 8px;">💡 Did you know?</p>
            <p style="color:#9a3412;font-size:14px;margin:0;">Homes with documented maintenance histories sell for 3–5% more than comparable homes without records. Every service you log in TrustyPro adds to your home's verified value.</p>
          </div>
          <div style="text-align:center;margin:24px 0;">
            <a href="${dashboardUrl}?utm_source=email&utm_medium=winback&utm_campaign=${campaignKey}" style="background:#00B5B8;color:#fff;padding:14px 36px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Check My Home Health Vault</a>
          </div>
        </div>
        <div style="background:#f1f5f9;padding:20px 32px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">© 2026 TrustyPro — DFW, Texas | <a href="${dashboardUrl}/settings" style="color:#94a3b8;">Unsubscribe</a></p>
        </div>
      </div>`,
    });

    if (ok) {
      await (db as any).execute(
        sql.raw(`INSERT IGNORE INTO marketingEmailLog (userId, campaignKey, sentAt) VALUES (${ho.userId}, '${campaignKey}', NOW())`)
      ).catch(() => {});
      sent++;
    } else {
      errors++;
    }
  }

  console.log(`[MarketingAuto] Win-back campaign: ${sent} sent, ${errors} errors`);
  return { sent, errors };
}

// ─── Tier Milestone Notifications ────────────────────────────────────────────

export async function runTierMilestoneNotifications(): Promise<{ sent: number; errors: number }> {
  const db = await getDb();
  if (!db) return { sent: 0, errors: 0 };

  // Tier thresholds: jobs needed to reach each tier
  const TIER_THRESHOLDS: Record<string, { jobsNeeded: number; nextTier: string; perks: string }> = {
    bronze: { jobsNeeded: 10, nextTier: "Silver", perks: "priority lead routing + 5% commission reduction" },
    silver: { jobsNeeded: 25, nextTier: "Gold", perks: "featured placement + 10% commission reduction + dedicated support" },
    gold: { jobsNeeded: 50, nextTier: "Platinum", perks: "top-of-feed placement + 15% commission reduction + co-marketing" },
  };

  // Find pros who are within 2 jobs of the next tier and haven't been notified this week
  const rows = await (db as any).execute(
    sql.raw(`
      SELECT p.id, p.contactName, p.contactEmail, p.businessName, p.currentTier, p.totalJobsCompleted
      FROM partners p
      WHERE p.contactEmail IS NOT NULL
        AND p.status = 'approved'
        AND p.currentTier IN ('bronze', 'silver', 'gold')
        AND NOT EXISTS (
          SELECT 1 FROM marketingEmailLog mel
          WHERE mel.userId = p.id
            AND mel.campaignKey LIKE 'tier_milestone_%'
            AND mel.sentAt > DATE_SUB(NOW(), INTERVAL 7 DAY)
        )
      LIMIT 50
    `)
  ).catch(() => ({ rows: [] })) as any;

  const pros = (rows.rows ?? rows) as any[];
  let sent = 0;
  let errors = 0;
  const dashboardUrl = `${APP_BASE_URL}/dashboard/tier-progress`;

  for (const pro of pros) {
    const tier = (pro.currentTier ?? "bronze").toLowerCase();
    const threshold = TIER_THRESHOLDS[tier];
    if (!threshold) continue;

    const jobsDone = pro.totalJobsCompleted ?? 0;
    const jobsRemaining = threshold.jobsNeeded - jobsDone;

    // Only notify if within 2 jobs of the next tier
    if (jobsRemaining > 2 || jobsRemaining <= 0) continue;

    const name = pro.contactName ?? pro.businessName;
    const campaignKey = `tier_milestone_${pro.id}_${tier}`;

    const ok = await sendEmail({
      from: FROM_PROLNK,
      to: pro.contactEmail,
      subject: `You're ${jobsRemaining} job${jobsRemaining === 1 ? "" : "s"} away from ${threshold.nextTier} tier — ProLnk`,
      html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
        <div style="background:linear-gradient(135deg,#1e1b4b,#7c3aed);padding:32px;text-align:center;">
          <div style="font-size:40px;margin-bottom:8px;">🏆</div>
          <div style="font-size:24px;font-weight:800;color:#fff;">Almost There!</div>
          <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">ProLnk Partner Network</p>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#0f172a;margin:0 0 8px;">Hi ${name},</h2>
          <p style="color:#475569;line-height:1.7;">You're only <strong>${jobsRemaining} job${jobsRemaining === 1 ? "" : "s"} away</strong> from reaching <strong>${threshold.nextTier} tier</strong> on ProLnk. Here's what you unlock:</p>
          <div style="background:#F5F3FF;border:1px solid #DDD6FE;border-radius:12px;padding:20px;margin:20px 0;">
            <p style="color:#7c3aed;font-weight:700;margin:0 0 8px;">✨ ${threshold.nextTier} Tier Perks</p>
            <p style="color:#4c1d95;font-size:14px;margin:0;">${threshold.perks}</p>
          </div>
          <div style="background:#F8FAFC;border-radius:12px;padding:16px;margin:16px 0;text-align:center;">
            <p style="color:#64748b;font-size:13px;margin:0 0 8px;">Your progress</p>
            <div style="background:#e2e8f0;border-radius:999px;height:12px;overflow:hidden;">
              <div style="background:linear-gradient(90deg,#7c3aed,#a855f7);height:100%;width:${Math.min(100, Math.round((jobsDone / threshold.jobsNeeded) * 100))}%;border-radius:999px;"></div>
            </div>
            <p style="color:#0f172a;font-weight:700;margin:8px 0 0;">${jobsDone} / ${threshold.jobsNeeded} jobs completed</p>
          </div>
          <div style="text-align:center;margin:24px 0;">
            <a href="${dashboardUrl}?utm_source=email&utm_medium=milestone&utm_campaign=${campaignKey}" style="background:#7c3aed;color:#fff;padding:14px 36px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">View My Progress</a>
          </div>
        </div>
        <div style="background:#f1f5f9;padding:20px 32px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">© 2026 ProLnk — DFW, Texas</p>
        </div>
      </div>`,
    });

    if (ok) {
      await (db as any).execute(
        sql.raw(`INSERT IGNORE INTO marketingEmailLog (userId, campaignKey, sentAt) VALUES (${pro.id}, '${campaignKey}', NOW())`)
      ).catch(() => {});
      sent++;
    } else {
      errors++;
    }
  }

  console.log(`[MarketingAuto] Tier milestone notifications: ${sent} sent, ${errors} errors`);
  return { sent, errors };
}

// ─── Main runner (called by background scheduler) ────────────────────────────

export async function runDailyMarketingAutomation(): Promise<void> {
  console.log("[MarketingAuto] Starting daily marketing automation run...");
  const [seasonal, winback, milestones] = await Promise.allSettled([
    runSeasonalReminderCampaign(),
    runWinBackCampaign(),
    runTierMilestoneNotifications(),
  ]);
  console.log("[MarketingAuto] Daily run complete:", {
    seasonal: seasonal.status === "fulfilled" ? seasonal.value : "error",
    winback: winback.status === "fulfilled" ? winback.value : "error",
    milestones: milestones.status === "fulfilled" ? milestones.value : "error",
  });
}
