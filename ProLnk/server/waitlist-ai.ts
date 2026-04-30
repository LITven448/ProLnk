/**
 * Waitlist AI System
 *
 * Two functions:
 *
 * 1. generateWaitlistProgressEmail() — AI writes a personalized progress update
 *    email for everyone on the waitlist. Runs bi-weekly via Inngest.
 *    Content: what was built since last email, waitlist position, launch timeline.
 *
 * 2. scorePartnerApplication() — auto-scores incoming partner applications
 *    based on DFW coverage gaps, years of experience, FSM tools, etc.
 *    Returns: score, whether to auto-approve, and specific feedback if not.
 */

import { getDb } from "./db";
import { sql } from "drizzle-orm";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";

// ─── Waitlist Progress Email Generator ───────────────────────────────────────

export interface WaitlistEmailOptions {
  targetList: "pro" | "homeowner";
  platformStats?: {
    partnerCount: number;
    homeownerCount: number;
    featuresBuilt: string[];
    launchTimeline: string;
  };
}

export async function generateWaitlistProgressEmail(options: WaitlistEmailOptions): Promise<{
  subject: string;
  htmlBody: string;
  textBody: string;
}> {
  const stats = options.platformStats ?? {
    partnerCount: 0,
    homeownerCount: 0,
    featuresBuilt: ["AI photo analysis pipeline", "Home Health Vault", "Briefcase credentialing", "Scout assessment system"],
    launchTimeline: "Coming soon to DFW",
  };

  const isProList = options.targetList === "pro";

  const response = await invokeLLM({
    model: "claude-sonnet-4-5-20251022",
    provider: "anthropic",
    thinking: false,
    maxTokens: 2048,
    messages: [
      {
        role: "system",
        content: `You write engaging, professional waitlist update emails for ProLnk${isProList ? " (partner network for service professionals)" : " TrustyPro (homeowner platform)"}.
Your tone: excited but honest, transparent about progress, builds genuine anticipation.
Never hype without substance. Show real platform progress.
Write in HTML for email (inline styles, no external CSS).`,
      },
      {
        role: "user",
        content: `Write a waitlist progress email for ${isProList ? "service professionals on the ProLnk pro waitlist" : "homeowners on the TrustyPro waitlist"}.

Platform stats:
- ${stats.partnerCount} service professionals on the waitlist
- ${stats.homeownerCount} homeowners on the waitlist
- Recently built: ${stats.featuresBuilt.join(", ")}
- Launch timeline: ${stats.launchTimeline}

Write:
1. A compelling subject line
2. An HTML email body (max 400 words, warm tone)
3. Plain text version

Return JSON: { subject: string, htmlBody: string, textBody: string }`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "waitlist_email",
        strict: true,
        schema: {
          type: "object",
          properties: {
            subject: { type: "string" },
            htmlBody: { type: "string" },
            textBody: { type: "string" },
          },
          required: ["subject", "htmlBody", "textBody"],
          additionalProperties: false,
        },
      },
    },
  });

  const content = response.choices?.[0]?.message?.content;
  const parsed = typeof content === "string" ? JSON.parse(content) : content;
  return parsed;
}

export async function sendWaitlistProgressEmails(targetList: "pro" | "homeowner"): Promise<{
  sent: number;
  failed: number;
  campaignId: number;
}> {
  const db = await getDb();
  if (!db) return { sent: 0, failed: 0, campaignId: 0 };

  // Get platform stats
  const [proCountResult] = await (db as any).execute(sql`SELECT COUNT(*) as cnt FROM proWaitlist`);
  const [homeCountResult] = await (db as any).execute(sql`SELECT COUNT(*) as cnt FROM homeWaitlist`);
  const proCount = parseInt((proCountResult.rows || proCountResult)[0]?.cnt ?? "0");
  const homeCount = parseInt((homeCountResult.rows || homeCountResult)[0]?.cnt ?? "0");

  // Generate email
  const email = await generateWaitlistProgressEmail({
    targetList,
    platformStats: {
      partnerCount: proCount,
      homeownerCount: homeCount,
      featuresBuilt: [
        "AI photo waterfall pipeline (4-tier VLM)",
        "Home Health Vault with temporal memory",
        "Briefcase + Pro Pass credentialing",
        "Scout whole-home assessment system",
        "Bid Board marketplace",
        "Domain separation (prolnk.io, trustypro.io, prolnkmedia.io)",
      ],
      launchTimeline: "DFW founding partner onboarding opening soon",
    },
  });

  // Create campaign record
  const campaignResult = await (db as any).execute(sql`
    INSERT INTO waitlistEmailCampaigns (
      campaignType, subject, aiGeneratedBody, proWaitlistCount, homeWaitlistCount,
      featuresHighlighted, scheduledAt
    ) VALUES (
      ${targetList === "pro" ? "pro_waitlist" : "homeowner_waitlist"},
      ${email.subject}, ${email.htmlBody},
      ${proCount}, ${homeCount},
      ${JSON.stringify(["AI photo waterfall", "Briefcase system", "Scout assessments"])},
      NOW()
    )
  `);
  const campaignId = (campaignResult.rows || campaignResult).insertId ?? campaignResult.insertId;

  // Get recipients
  const table = targetList === "pro" ? "proWaitlist" : "homeWaitlist";
  const recipientRows = await (db as any).execute(
    sql.raw(`SELECT email, firstName FROM ${table} WHERE status = 'waitlisted' OR status IS NULL LIMIT 5000`)
  );
  const recipients = (recipientRows.rows || recipientRows) as Array<{ email: string; firstName: string }>;

  let sent = 0;
  let failed = 0;

  // Update campaign recipient count
  await (db as any).execute(sql`
    UPDATE waitlistEmailCampaigns SET recipientCount = ${recipients.length} WHERE id = ${campaignId}
  `);

  // Send emails
  for (const recipient of recipients) {
    try {
      const personalizedHtml = email.htmlBody.replace(/\[FIRST_NAME\]/g, recipient.firstName || "there");
      const success = await sendEmail({
        to: recipient.email,
        subject: email.subject,
        html: personalizedHtml,
        text: email.textBody,
      });

      await (db as any).execute(sql`
        INSERT INTO waitlistEmailLog (campaignId, recipientEmail, recipientName, status)
        VALUES (${campaignId}, ${recipient.email}, ${recipient.firstName ?? null}, ${success ? 'sent' : 'failed'})
      `);

      if (success) sent++;
      else failed++;
    } catch (err) {
      failed++;
    }
  }

  // Update campaign
  await (db as any).execute(sql`
    UPDATE waitlistEmailCampaigns SET
      sentCount = ${sent}, failedCount = ${failed}, sentAt = NOW()
    WHERE id = ${campaignId}
  `);

  console.log(`[WaitlistEmail] Campaign ${campaignId}: ${sent} sent, ${failed} failed to ${recipients.length} recipients`);
  return { sent, failed, campaignId };
}

// ─── Application Scoring Algorithm ───────────────────────────────────────────

export interface ApplicationScoreInput {
  partnerId: number;
  businessType: string;
  serviceArea: string;
  serviceZipCodes?: string[];
  contactEmail: string;
  description?: string;
  website?: string;
  yearsInBusiness?: number;
  employeeCount?: number;
  hasFSMTool?: boolean; // CompanyCam, Jobber, ServiceTitan, etc.
  hasLicense?: boolean;
  hasInsurance?: boolean;
  referredByPartnerId?: number;
}

// DFW trades that are most needed (higher score for gaps)
const DFW_PRIORITY_TRADES: Record<string, number> = {
  roofing: 15,
  hvac: 15,
  hvac_maintenance: 15,
  electrical: 12,
  plumbing: 12,
  pest_control: 10,
  lawn_care: 10,
  landscaping: 8,
  tree_service: 8,
  foundation: 12,
  water_mitigation: 10,
  general_contractor: 10,
  fencing: 6,
  painting: 6,
  flooring: 5,
  window_cleaning: 4,
  gutter_cleaning: 4,
};

export async function scorePartnerApplication(input: ApplicationScoreInput): Promise<{
  totalScore: number;
  autoApprove: boolean;
  componentScores: Record<string, number>;
  feedbackItems: string[];
  tier: "pass" | "marginal" | "fail";
}> {
  const APPROVAL_THRESHOLD = 55;
  const AUTO_APPROVE_THRESHOLD = 75;

  const scores: Record<string, number> = {
    tradeGap: 0,
    yearsExperience: 0,
    employeeCount: 0,
    fsmTool: 0,
    licenseAndInsurance: 0,
    serviceArea: 0,
    referral: 0,
    profileCompleteness: 0,
  };

  const feedback: string[] = [];

  // Trade gap score (how much does DFW need this trade?)
  const tradeLower = input.businessType.toLowerCase().replace(/\s+/g, "_");
  scores.tradeGap = Object.entries(DFW_PRIORITY_TRADES)
    .find(([k]) => tradeLower.includes(k))?.[1] ?? 5;

  // Years in business
  if (input.yearsInBusiness) {
    if (input.yearsInBusiness >= 10) scores.yearsExperience = 20;
    else if (input.yearsInBusiness >= 5) scores.yearsExperience = 15;
    else if (input.yearsInBusiness >= 3) scores.yearsExperience = 10;
    else if (input.yearsInBusiness >= 1) scores.yearsExperience = 5;
    else feedback.push("Less than 1 year in business — consider applying again after your first year");
  } else {
    feedback.push("Add years in business to your application to increase your score");
  }

  // Employee count
  if (input.employeeCount) {
    if (input.employeeCount >= 10) scores.employeeCount = 15;
    else if (input.employeeCount >= 5) scores.employeeCount = 12;
    else if (input.employeeCount >= 2) scores.employeeCount = 8;
    else scores.employeeCount = 5;
  }

  // FSM tool integration
  if (input.hasFSMTool) {
    scores.fsmTool = 15;
  } else {
    feedback.push("Connect CompanyCam, Jobber, or Housecall Pro to earn 15 extra points and automate photo submissions");
  }

  // License and insurance
  if (input.hasLicense && input.hasInsurance) {
    scores.licenseAndInsurance = 20;
  } else if (input.hasLicense || input.hasInsurance) {
    scores.licenseAndInsurance = 10;
    if (!input.hasLicense) feedback.push("Upload your contractor license to earn 10 more points");
    if (!input.hasInsurance) feedback.push("Upload your Certificate of Insurance (COI) to earn 10 more points");
  } else {
    scores.licenseAndInsurance = 0;
    feedback.push("Upload your contractor license and COI to earn up to 20 points — this is required before approval");
  }

  // Service area coverage (DFW zip codes)
  const zipCount = input.serviceZipCodes?.length ?? 0;
  if (zipCount >= 10) scores.serviceArea = 10;
  else if (zipCount >= 5) scores.serviceArea = 7;
  else if (zipCount >= 1) scores.serviceArea = 4;
  else feedback.push("Add your service area zip codes to improve routing accuracy");

  // Referral bonus
  if (input.referredByPartnerId) {
    scores.referral = 5;
  }

  // Profile completeness
  let completenessScore = 0;
  if (input.description && input.description.length > 50) completenessScore += 3;
  if (input.website) completenessScore += 2;
  if (input.contactEmail) completenessScore += 2;
  scores.profileCompleteness = Math.min(completenessScore, 7);

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const cappedScore = Math.min(100, totalScore);

  const tier = cappedScore >= AUTO_APPROVE_THRESHOLD ? "pass"
    : cappedScore >= APPROVAL_THRESHOLD ? "marginal"
    : "fail";

  const autoApprove = cappedScore >= AUTO_APPROVE_THRESHOLD;

  // Add tier-specific feedback
  if (tier === "fail") {
    feedback.unshift("Your application score is below the approval threshold. Here's what to improve:");
  } else if (tier === "marginal") {
    feedback.unshift("Your application is close to approval. A few improvements will push it over:");
  }

  // Save score to DB
  try {
    const db = await getDb();
    if (db) {
      await (db as any).execute(sql`
        INSERT INTO applicationScores (
          partnerId, totalScore, tradeGapScore, yearsExperienceScore, employeeCountScore,
          fsmToolScore, licenseScore, serviceAreaScore, referralScore,
          approvalThreshold, autoApproved, feedbackSent, feedbackItems, scoredAt
        ) VALUES (
          ${input.partnerId}, ${cappedScore},
          ${scores.tradeGap}, ${scores.yearsExperience}, ${scores.employeeCount},
          ${scores.fsmTool}, ${scores.licenseAndInsurance}, ${scores.serviceArea}, ${scores.referral},
          ${APPROVAL_THRESHOLD}, ${autoApprove ? 1 : 0}, 0, ${JSON.stringify(feedback)}, NOW()
        )
        ON DUPLICATE KEY UPDATE
          totalScore = VALUES(totalScore), tradeGapScore = VALUES(tradeGapScore),
          yearsExperienceScore = VALUES(yearsExperienceScore), employeeCountScore = VALUES(employeeCountScore),
          fsmToolScore = VALUES(fsmToolScore), licenseScore = VALUES(licenseScore),
          serviceAreaScore = VALUES(serviceAreaScore), referralScore = VALUES(referralScore),
          autoApproved = VALUES(autoApproved), feedbackItems = VALUES(feedbackItems), scoredAt = NOW()
      `);
    }
  } catch (err) {
    console.error("[AppScore] Failed to save score:", err);
  }

  return {
    totalScore: cappedScore,
    autoApprove,
    componentScores: scores,
    feedbackItems: feedback,
    tier,
  };
}

// ─── Send feedback email to below-threshold applicants ────────────────────────

export async function sendApplicationFeedbackEmail(opts: {
  partnerEmail: string;
  partnerName: string;
  businessName: string;
  score: number;
  feedbackItems: string[];
}): Promise<void> {
  const html = `
<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0A1628;color:#fff;border-radius:12px;overflow:hidden;">
  <div style="background:linear-gradient(135deg,#0A1628,#0d2040);padding:40px 32px;text-align:center;">
    <div style="font-size:28px;font-weight:800;color:#14b8a6;">ProLnk</div>
    <div style="font-size:12px;color:#64748b;margin-top:4px;">Partner Application Update</div>
  </div>
  <div style="padding:32px;">
    <h2 style="color:#fff;margin:0 0 16px;">Hi ${opts.partnerName},</h2>
    <p style="color:#94a3b8;line-height:1.6;">
      Thank you for applying to join the ProLnk Partner Network for <strong style="color:#fff;">${opts.businessName}</strong>.
      We've reviewed your application and your current score is <strong style="color:#14b8a6;">${opts.score}/100</strong>.
    </p>
    <p style="color:#94a3b8;line-height:1.6;">
      Here's what you can do to improve your score and get approved:
    </p>
    <div style="background:#0d2040;border:1px solid #1e3a5f;border-radius:8px;padding:20px;margin:24px 0;">
      <ul style="color:#94a3b8;margin:0;padding-left:20px;line-height:2.2;">
        ${opts.feedbackItems.map(item => `<li>${item}</li>`).join("")}
      </ul>
    </div>
    <p style="color:#94a3b8;line-height:1.6;">
      Once you've made these improvements, you can reapply and we'll re-score your application immediately.
      You're welcome to reapply after 30 days.
    </p>
    <div style="text-align:center;margin:32px 0;">
      <a href="https://prolnk.io/apply" style="background:#14b8a6;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;display:inline-block;">
        Update My Application →
      </a>
    </div>
  </div>
  <div style="background:#060f1e;padding:20px 32px;text-align:center;">
    <p style="color:#475569;font-size:12px;margin:0;">© 2026 ProLnk Partner Network · DFW, Texas</p>
  </div>
</div>`;

  await sendEmail({ to: opts.partnerEmail, subject: "Your ProLnk Application — Next Steps", html });
}

// ─── Internal email sender (thin wrapper) ────────────────────────────────────

async function sendEmail(opts: { to: string; subject: string; html: string; text?: string }): Promise<boolean> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.log(`[WaitlistEmail] No RESEND_API_KEY — would send to ${opts.to}: ${opts.subject}`);
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: "ProLnk <noreply@prolnk.io>", to: [opts.to], subject: opts.subject, html: opts.html, text: opts.text }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
