/**
 * ProLnk Notification Service
 * Handles email and SMS delivery for homeowner deal notifications,
 * partner alerts, and Google Review requests.
 *
 * Uses Resend for email and Twilio for SMS.
 * Falls back gracefully if API keys are not configured.
 */

import { ENV } from "./_core/env";

// --- Types --------------------------------------------------------------------

export interface DealNotificationPayload {
  homeownerName: string;
  homeownerEmail?: string;
  homeownerPhone?: string;
  dealUrl: string;
  issueType: string;
  issueDescription: string;
  partnerName: string;
  estimatedValueLow?: number;
  estimatedValueHigh?: number;
  expiresAt?: Date;
}

export interface GoogleReviewPayload {
  homeownerName: string;
  homeownerEmail?: string;
  homeownerPhone?: string;
  partnerName: string;
  googleReviewUrl: string;
}

export interface PartnerAlertPayload {
  partnerEmail: string;
  partnerName: string;
  alertType: "new_lead" | "lead_accepted" | "commission_paid" | "tier_upgrade";
  message: string;
  actionUrl?: string;
}

// --- Email Service (Resend) ---------------------------------------------------

const RESEND_API_KEY = process.env.RESEND_API_KEY;
// FROM_EMAIL is now sourced from ENV.fromEmail (see server/_core/env.ts)

async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.log(`[Email] No RESEND_API_KEY -- would send to ${to}: ${subject}`);
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: ENV.fromEmail, to, subject, html }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error(`[Email] Resend error: ${res.status} ${err}`);
      return false;
    }

    console.log(`[Email] Sent to ${to}: ${subject}`);
    return true;
  } catch (err) {
    console.error("[Email] Send failed:", err);
    return false;
  }
}

// --- SMS Service (Twilio) -----------------------------------------------------

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER || "+18005551234";

export async function sendSms(to: string, body: string): Promise<boolean> {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    console.log(`[SMS] No Twilio credentials -- would send to ${to}: ${body.slice(0, 60)}...`);
    return false;
  }

  // Normalize phone number
  const normalized = to.replace(/\D/g, "");
  const e164 = normalized.startsWith("1") ? `+${normalized}` : `+1${normalized}`;

  try {
    const credentials = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString("base64");
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ From: TWILIO_FROM_NUMBER, To: e164, Body: body }).toString(),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error(`[SMS] Twilio error: ${res.status} ${err}`);
      return false;
    }

    console.log(`[SMS] Sent to ${e164}`);
    return true;
  } catch (err) {
    console.error("[SMS] Send failed:", err);
    return false;
  }
}

// --- Deal Notification --------------------------------------------------------

export async function sendDealNotification(payload: DealNotificationPayload): Promise<{
  emailSent: boolean;
  smsSent: boolean;
}> {
  const {
    homeownerName, homeownerEmail, homeownerPhone,
    dealUrl, issueType, issueDescription, partnerName,
    estimatedValueLow, estimatedValueHigh, expiresAt,
  } = payload;

  const firstName = homeownerName?.split(" ")[0] || "Homeowner";
  const valueRange = estimatedValueLow && estimatedValueHigh
    ? `$${estimatedValueLow.toLocaleString()}-$${estimatedValueHigh.toLocaleString()}`
    : estimatedValueLow
    ? `~$${estimatedValueLow.toLocaleString()}`
    : "competitive pricing";

  const expiryText = expiresAt
    ? `This offer expires in 48 hours (${expiresAt.toLocaleDateString()}).`
    : "This offer is time-sensitive.";

  // Full URL for the deal page
  const fullDealUrl = dealUrl.startsWith("http")
    ? dealUrl
    : `${ENV.appBaseUrl}${dealUrl}`;

  // -- Email --
  const emailSubject = `${firstName}, a local pro spotted something at your home`;
  const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f9fafb; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; margin-top: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <!-- Header -->
    <div style="background: #00B5B8; padding: 24px 32px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">ProLnk</h1>
      <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0; font-size: 14px;">Your Home Service Partner Network</p>
    </div>
    <!-- Body -->
    <div style="padding: 32px;">
      <p style="font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 8px;">Hi ${firstName},</p>
      <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">
        While <strong>${partnerName}</strong> was recently servicing a home near yours, their technician noticed something that may need attention at your property:
      </p>
      <!-- Issue Card -->
      <div style="background: #f0fdfa; border: 1px solid #99f6e4; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
        <p style="font-size: 13px; font-weight: 600; color: #0d9488; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 6px;">Detected Issue</p>
        <p style="font-size: 17px; font-weight: 700; color: #111827; margin: 0 0 8px;">${issueType}</p>
        <p style="color: #374151; font-size: 14px; line-height: 1.5; margin: 0;">${issueDescription}</p>
      </div>
      <!-- Value + CTA -->
      <p style="color: #374151; font-size: 15px; margin: 0 0 8px;">
        A verified local pro can provide a <strong>free estimate</strong> -- estimated range: <strong>${valueRange}</strong>.
      </p>
      <p style="color: #6b7280; font-size: 13px; margin: 0 0 24px;">${expiryText}</p>
      <div style="text-align: center; margin-bottom: 24px;">
        <a href="${fullDealUrl}" style="display: inline-block; background: #00B5B8; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 600;">
          View My Free Estimate Offer 
        </a>
      </div>
      <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
        This is a complimentary service from ProLnk. You are under no obligation to accept.
        <br>To unsubscribe, reply STOP.
      </p>
    </div>
  </div>
</body>
</html>`;

  // -- SMS --
  const smsBody = `Hi ${firstName}! A local pro noticed a potential issue at your home: ${issueType}. Get a FREE estimate from a verified pro: ${fullDealUrl} (Offer expires in 48hrs) -- ProLnk`;

  const [emailSent, smsSent] = await Promise.all([
    homeownerEmail ? sendEmail(homeownerEmail, emailSubject, emailHtml) : Promise.resolve(false),
    homeownerPhone ? sendSms(homeownerPhone, smsBody) : Promise.resolve(false),
  ]);

  return { emailSent, smsSent };
}

// --- Google Review Request ----------------------------------------------------

export async function sendGoogleReviewRequest(payload: GoogleReviewPayload): Promise<{
  emailSent: boolean;
  smsSent: boolean;
}> {
  const { homeownerName, homeownerEmail, homeownerPhone, partnerName, googleReviewUrl } = payload;
  const firstName = homeownerName?.split(" ")[0] || "there";

  const emailSubject = `How did ${partnerName} do? Leave a quick review`;
  const emailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f9fafb; margin: 0; padding: 24px;">
  <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <h2 style="color: #111827; margin: 0 0 16px;">Thanks for using ProLnk, ${firstName}!</h2>
    <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">
      We're glad your experience with <strong>${partnerName}</strong> went well. Would you take 60 seconds to leave them a Google review? It helps other homeowners find trusted pros.
    </p>
    <div style="text-align: center; margin: 24px 0;">
      <a href="${googleReviewUrl}" style="display: inline-block; background: #4285F4; color: white; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 15px; font-weight: 600;">
         Leave a Google Review
      </a>
    </div>
    <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">ProLnk -- Your Home Service Partner Network</p>
  </div>
</body>
</html>`;

  const smsBody = `Hi ${firstName}! Thanks for using ProLnk. Would you leave ${partnerName} a quick Google review? It only takes 60 seconds: ${googleReviewUrl}`;

  const [emailSent, smsSent] = await Promise.all([
    homeownerEmail ? sendEmail(homeownerEmail, emailSubject, emailHtml) : Promise.resolve(false),
    homeownerPhone ? sendSms(homeownerPhone, smsBody) : Promise.resolve(false),
  ]);

  return { emailSent, smsSent };
}

// --- Partner Alert ------------------------------------------------------------

export async function sendPartnerAlert(payload: PartnerAlertPayload): Promise<boolean> {
  const { partnerEmail, partnerName, alertType, message, actionUrl } = payload;

  const subjects: Record<string, string> = {
    new_lead: "[TARGET] New lead waiting for you on ProLnk",
    lead_accepted: "[OK] Your referral was accepted",
    commission_paid: "[MONEY] Commission payment processed",
    tier_upgrade: "[AWARD] You've been upgraded to a new tier!",
  };

  const emailHtml = `
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f9fafb; margin: 0; padding: 24px;">
  <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 12px; padding: 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
    <div style="background: #00B5B8; padding: 16px 24px; border-radius: 8px; margin-bottom: 24px;">
      <h2 style="color: white; margin: 0; font-size: 18px;">ProLnk Partner Alert</h2>
    </div>
    <p style="font-size: 16px; font-weight: 600; color: #111827; margin: 0 0 12px;">Hi ${partnerName},</p>
    <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">${message}</p>
    ${actionUrl ? `<div style="text-align: center; margin: 20px 0;"><a href="${actionUrl}" style="display: inline-block; background: #00B5B8; color: white; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 15px; font-weight: 600;">View on ProLnk </a></div>` : ""}
    <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 16px 0 0;">ProLnk Partner Network</p>
  </div>
</body>
</html>`;

  return sendEmail(partnerEmail, subjects[alertType] || "ProLnk Update", emailHtml);
}
