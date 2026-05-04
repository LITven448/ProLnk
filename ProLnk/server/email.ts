/**
 * ProLnk / TrustyPro Transactional Email Service
 * Uses Resend API for all outbound emails.
 * Sending domain: onboarding@resend.dev (fallback until custom domains are verified)
 * Future: noreply@prolnk.io (ProLnk) | noreply@trustypro.com (TrustyPro)
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_PROLNK = "ProLnk <onboarding@resend.dev>";
const FROM_TRUSTYPRO = "TrustyPro <onboarding@resend.dev>";
const BASE_URL = process.env.APP_BASE_URL ?? "https://prolnk.io";

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

async function sendEmail(payload: EmailPayload): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn("[Email] RESEND_API_KEY not set — skipping email send");
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: payload.from ?? FROM_PROLNK,
        to: [payload.to],
        subject: payload.subject,
        html: payload.html,
      }),
    });
    const data = await res.json() as any;
    if (!res.ok) {
      console.error("[Email] Resend error:", data);
      return false;
    }
    console.log(`[Email] Sent "${payload.subject}" to ${payload.to} — id: ${data.id}`);
    return true;
  } catch (err) {
    console.error("[Email] Failed to send:", err);
    return false;
  }
}

// ─── ProLnk Partner Emails ───────────────────────────────────────────────────

export async function sendPartnerApplicationReceived(opts: {
  to: string;
  name: string;
  businessName: string;
}) {
  return sendEmail({
    to: opts.to,
    subject: "We received your ProLnk application!",
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0A1628;color:#fff;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#0A1628,#0d2040);padding:40px 32px;text-align:center;">
          <div style="font-size:28px;font-weight:800;color:#14b8a6;letter-spacing:-1px;">ProLnk</div>
          <div style="font-size:12px;color:#64748b;margin-top:4px;">Partner Network</div>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#fff;margin:0 0 16px;">Application Received, ${opts.name}!</h2>
          <p style="color:#94a3b8;line-height:1.6;">Thanks for applying to join the ProLnk Partner Network on behalf of <strong style="color:#fff;">${opts.businessName}</strong>.</p>
          <p style="color:#94a3b8;line-height:1.6;">Our team reviews every application manually to ensure we're building the right network. You'll hear back from us within <strong style="color:#14b8a6;">1–2 business days</strong>.</p>
          <div style="background:#0d2040;border:1px solid #1e3a5f;border-radius:8px;padding:20px;margin:24px 0;">
            <p style="color:#94a3b8;margin:0 0 8px;font-size:14px;">While you wait, explore how ProLnk works:</p>
            <a href="${BASE_URL}/#how-it-works" style="color:#14b8a6;text-decoration:none;font-weight:600;">See How It Works →</a>
          </div>
          <p style="color:#64748b;font-size:13px;">Questions? Reply to this email and we'll get back to you.</p>
        </div>
        <div style="background:#060f1e;padding:20px 32px;text-align:center;">
          <p style="color:#475569;font-size:12px;margin:0;">© 2026 ProLnk Partner Network · DFW, Texas</p>
        </div>
      </div>
    `,
  });
}

export async function sendPartnerApproved(opts: {
  to: string;
  name: string;
  businessName: string;
  loginUrl: string;
}) {
  return sendEmail({
    to: opts.to,
    subject: "🎉 You're approved — Welcome to ProLnk!",
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0A1628;color:#fff;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#14b8a6,#0891b2);padding:40px 32px;text-align:center;">
          <div style="font-size:28px;font-weight:800;color:#fff;letter-spacing:-1px;">ProLnk</div>
          <div style="font-size:14px;color:rgba(255,255,255,0.8);margin-top:4px;">You're in the network.</div>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#fff;margin:0 0 16px;">Welcome aboard, ${opts.name}!</h2>
          <p style="color:#94a3b8;line-height:1.6;"><strong style="color:#fff;">${opts.businessName}</strong> is now an approved ProLnk partner. You can start logging jobs, receiving AI-detected leads, and earning commissions today.</p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${opts.loginUrl}" style="background:#14b8a6;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;display:inline-block;">Access Your Partner Portal →</a>
          </div>
          <div style="background:#0d2040;border:1px solid #1e3a5f;border-radius:8px;padding:20px;margin:24px 0;">
            <p style="color:#14b8a6;font-weight:700;margin:0 0 12px;">Your First 3 Steps:</p>
            <ol style="color:#94a3b8;margin:0;padding-left:20px;line-height:2;">
              <li>Complete your partner profile</li>
              <li>Set your service area zip codes</li>
              <li>Log your first job photo to activate AI detection</li>
            </ol>
          </div>
        </div>
        <div style="background:#060f1e;padding:20px 32px;text-align:center;">
          <p style="color:#475569;font-size:12px;margin:0;">© 2026 ProLnk Partner Network · DFW, Texas</p>
        </div>
      </div>
    `,
  });
}

export async function sendPartnerRejected(opts: {
  to: string;
  name: string;
  reason?: string;
}) {
  return sendEmail({
    to: opts.to,
    subject: "ProLnk Application Update",
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0A1628;color:#fff;border-radius:12px;overflow:hidden;">
        <div style="background:#0d2040;padding:40px 32px;text-align:center;">
          <div style="font-size:28px;font-weight:800;color:#14b8a6;letter-spacing:-1px;">ProLnk</div>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#fff;margin:0 0 16px;">Application Update, ${opts.name}</h2>
          <p style="color:#94a3b8;line-height:1.6;">Thank you for your interest in the ProLnk Partner Network. After reviewing your application, we're unable to move forward at this time.</p>
          ${opts.reason ? `<p style="color:#94a3b8;line-height:1.6;"><strong style="color:#fff;">Reason:</strong> ${opts.reason}</p>` : ""}
          <p style="color:#94a3b8;line-height:1.6;">You're welcome to reapply in 90 days. If you believe this was an error, reply to this email and we'll take another look.</p>
        </div>
        <div style="background:#060f1e;padding:20px 32px;text-align:center;">
          <p style="color:#475569;font-size:12px;margin:0;">© 2026 ProLnk Partner Network · DFW, Texas</p>
        </div>
      </div>
    `,
  });
}

export async function sendNewLeadNotification(opts: {
  to: string;
  partnerName: string;
  serviceType: string;
  address: string;
  estimatedValue: number;
  confidence: number;
  dashboardUrl: string;
}) {
  return sendEmail({
    to: opts.to,
    subject: `New lead: ${opts.serviceType} — ${opts.address}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#0A1628;color:#fff;border-radius:12px;overflow:hidden;">
        <div style="background:linear-gradient(135deg,#0A1628,#0d2040);padding:32px;text-align:center;">
          <div style="font-size:28px;font-weight:800;color:#14b8a6;letter-spacing:-1px;">ProLnk</div>
          <div style="font-size:13px;color:#64748b;margin-top:4px;">New Lead Alert</div>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#fff;margin:0 0 8px;">New Lead for You, ${opts.partnerName}</h2>
          <p style="color:#94a3b8;margin:0 0 24px;">Our AI detected a new opportunity that matches your services.</p>
          <div style="background:#0d2040;border:1px solid #14b8a6;border-radius:8px;padding:20px;margin-bottom:24px;">
            <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
              <span style="color:#64748b;font-size:13px;">Service Type</span>
              <span style="color:#fff;font-weight:600;">${opts.serviceType}</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
              <span style="color:#64748b;font-size:13px;">Location</span>
              <span style="color:#fff;font-weight:600;">${opts.address}</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
              <span style="color:#64748b;font-size:13px;">Est. Job Value</span>
              <span style="color:#14b8a6;font-weight:700;">$${opts.estimatedValue.toLocaleString()}</span>
            </div>
            <div style="display:flex;justify-content:space-between;">
              <span style="color:#64748b;font-size:13px;">AI Confidence</span>
              <span style="color:#fff;font-weight:600;">${Math.round(opts.confidence * 100)}%</span>
            </div>
          </div>
          <div style="text-align:center;">
            <a href="${opts.dashboardUrl}" style="background:#14b8a6;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;display:inline-block;">View Lead & Respond →</a>
          </div>
          <p style="color:#64748b;font-size:12px;text-align:center;margin-top:16px;">Leads expire — respond quickly to maximize your chances.</p>
        </div>
        <div style="background:#060f1e;padding:20px 32px;text-align:center;">
          <p style="color:#475569;font-size:12px;margin:0;">© 2026 ProLnk Partner Network · DFW, Texas</p>
        </div>
      </div>
    `,
  });
}

// ─── TrustyPro Homeowner Emails ───────────────────────────────────────────────

export async function sendHomeownerWelcome(opts: {
  to: string;
  name: string;
  dashboardUrl: string;
}) {
  return sendEmail({
    from: FROM_TRUSTYPRO,
    to: opts.to,
    subject: "Welcome to TrustyPro — Your home is in good hands",
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
        <div style="background:linear-gradient(135deg,#1e3a5f,#0891b2);padding:40px 32px;text-align:center;">
          <div style="font-size:28px;font-weight:800;color:#fff;letter-spacing:-1px;">TrustyPro</div>
          <div style="font-size:13px;color:rgba(255,255,255,0.7);margin-top:4px;">Your Trusted Home Network</div>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#1e293b;margin:0 0 16px;">Welcome, ${opts.name}!</h2>
          <p style="color:#64748b;line-height:1.6;">Your TrustyPro account is ready. Upload photos of your home and our AI will identify maintenance needs, improvement opportunities, and connect you with verified pros in your area.</p>
          <div style="text-align:center;margin:32px 0;">
            <a href="${opts.dashboardUrl}" style="background:#0891b2;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;display:inline-block;">Go to My Home Dashboard →</a>
          </div>
          <div style="background:#f8fafc;border-radius:8px;padding:20px;margin:24px 0;">
            <p style="color:#0891b2;font-weight:700;margin:0 0 12px;">Start with these 3 things:</p>
            <ol style="color:#64748b;margin:0;padding-left:20px;line-height:2;">
              <li>Add your home address and details</li>
              <li>Upload photos of your home's exterior and key rooms</li>
              <li>Get your free AI home health scan</li>
            </ol>
          </div>
        </div>
        <div style="background:#f1f5f9;padding:20px 32px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">© 2026 TrustyPro · DFW, Texas</p>
        </div>
      </div>
    `,
  });
}

export async function sendQuoteRequestReceived(opts: {
  to: string;
  name: string;
  serviceCategory: string;
  urgency: string;
  requestId: number;
}) {
  const urgencyLabel: Record<string, string> = {
    emergency: "Emergency (responding within hours)",
    within_48h: "Within 48 hours",
    this_week: "This week",
    flexible: "Flexible timing",
  };
  return sendEmail({
    from: FROM_TRUSTYPRO,
    to: opts.to,
    subject: `Your quote request for ${opts.serviceCategory} was received`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
        <div style="background:linear-gradient(135deg,#1e3a5f,#0891b2);padding:32px;text-align:center;">
          <div style="font-size:28px;font-weight:800;color:#fff;letter-spacing:-1px;">TrustyPro</div>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#1e293b;margin:0 0 16px;">Quote Request Received!</h2>
          <p style="color:#64748b;line-height:1.6;">Hi ${opts.name}, we've received your request for <strong style="color:#1e293b;">${opts.serviceCategory}</strong> and are matching you with verified pros in your area.</p>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin:24px 0;">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
              <span style="color:#64748b;font-size:13px;">Request ID</span>
              <span style="color:#1e293b;font-weight:600;">#${opts.requestId}</span>
            </div>
            <div style="display:flex;justify-content:space-between;">
              <span style="color:#64748b;font-size:13px;">Urgency</span>
              <span style="color:#0891b2;font-weight:600;">${urgencyLabel[opts.urgency] ?? opts.urgency}</span>
            </div>
          </div>
          <p style="color:#64748b;line-height:1.6;">Pros in your area will reach out directly. You can also track your request in your TrustyPro dashboard.</p>
        </div>
        <div style="background:#f1f5f9;padding:20px 32px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">© 2026 TrustyPro · DFW, Texas</p>
        </div>
      </div>
    `,
  });
}

export async function sendRoomMakeoverReady(opts: {
  to: string;
  name: string;
  roomType: string;
  viewUrl: string;
}) {
  const roomLabel = opts.roomType.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  return sendEmail({
    from: FROM_TRUSTYPRO,
    to: opts.to,
    subject: `Your AI ${roomLabel} makeover is ready!`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
        <div style="background:linear-gradient(135deg,#1e3a5f,#7c3aed);padding:32px;text-align:center;">
          <div style="font-size:28px;font-weight:800;color:#fff;letter-spacing:-1px;">TrustyPro</div>
          <div style="font-size:13px;color:rgba(255,255,255,0.7);margin-top:4px;">AI Room Makeover</div>
        </div>
        <div style="padding:32px;text-align:center;">
          <div style="font-size:48px;margin-bottom:16px;">🏠✨</div>
          <h2 style="color:#1e293b;margin:0 0 16px;">Your ${roomLabel} Makeover is Ready!</h2>
          <p style="color:#64748b;line-height:1.6;">Hi ${opts.name}, your AI-generated room redesign is complete. See your transformed space and get matched with pros who can make it a reality.</p>
          <div style="margin:32px 0;">
            <a href="${opts.viewUrl}" style="background:linear-gradient(135deg,#0891b2,#7c3aed);color:#fff;padding:16px 40px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;display:inline-block;">View My Makeover →</a>
          </div>
          <p style="color:#94a3b8;font-size:13px;">Love what you see? We can connect you with interior designers and contractors in your area to bring it to life.</p>
        </div>
        <div style="background:#f1f5f9;padding:20px 32px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">© 2026 TrustyPro · DFW, Texas</p>
        </div>
      </div>
    `,
  });
}

export async function sendQuoteResponseNotification(opts: {
  to: string;
  homeownerName: string;
  partnerName: string;
  serviceCategory: string;
  message: string;
  dashboardUrl: string;
}) {
  return sendEmail({
    from: FROM_TRUSTYPRO,
    to: opts.to,
    subject: `${opts.partnerName} responded to your quote request`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
        <div style="background:linear-gradient(135deg,#1e3a5f,#0891b2);padding:32px;text-align:center;">
          <div style="font-size:28px;font-weight:800;color:#fff;letter-spacing:-1px;">TrustyPro</div>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#1e293b;margin:0 0 16px;">A Pro Responded to Your Request</h2>
          <p style="color:#64748b;line-height:1.6;"><strong style="color:#1e293b;">${opts.partnerName}</strong> is interested in your <strong style="color:#1e293b;">${opts.serviceCategory}</strong> request.</p>
          ${opts.message ? `<div style="background:#f8fafc;border-left:4px solid #0891b2;padding:16px;margin:20px 0;border-radius:0 8px 8px 0;"><p style="color:#1e293b;margin:0;font-style:italic;">"${opts.message}"</p></div>` : ""}
          <div style="text-align:center;margin:24px 0;">
            <a href="${opts.dashboardUrl}" style="background:#0891b2;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;display:inline-block;">View Response →</a>
          </div>
        </div>
        <div style="background:#f1f5f9;padding:20px 32px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">© 2026 TrustyPro · DFW, Texas</p>
        </div>
      </div>
    `,
  });
}

export async function sendStormAlertToHomeowner(opts: {
  homeownerEmail: string;
  homeownerName: string;
  propertyAddress: string;
  stormType: string;
  headline: string;
  severity: string;
  dashboardUrl: string;
}) {
  const severityColor = opts.severity === "Extreme" ? "#dc2626" : opts.severity === "Severe" ? "#ea580c" : "#d97706";
  await sendEmail({
    to: opts.homeownerEmail,
    subject: `⚡ Storm Alert for Your Property — ${opts.stormType}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <div style="background:${severityColor};padding:28px 32px;">
          <h1 style="color:#fff;margin:0;font-size:22px;font-weight:800;">⚡ Storm Alert</h1>
          <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">${opts.stormType} — ${opts.severity} Severity</p>
        </div>
        <div style="padding:32px;">
          <p style="color:#1e293b;font-size:16px;line-height:1.6;">Hi ${opts.homeownerName},</p>
          <p style="color:#64748b;line-height:1.6;">A weather event has been detected near your property at <strong style="color:#1e293b;">${opts.propertyAddress}</strong>.</p>
          <div style="background:#fef3c7;border:1px solid #fcd34d;border-radius:8px;padding:16px;margin:20px 0;">
            <p style="color:#92400e;margin:0;font-weight:600;">${opts.headline}</p>
          </div>
          <p style="color:#64748b;line-height:1.6;">TrustyPro has automatically notified vetted contractors in your area who specialize in storm damage repair. You may receive quotes soon.</p>
          <div style="text-align:center;margin:24px 0;">
            <a href="${opts.dashboardUrl}" style="background:#0A1628;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:16px;display:inline-block;">View My Dashboard →</a>
          </div>
          <p style="color:#94a3b8;font-size:12px;text-align:center;">You're receiving this because your property is registered with TrustyPro. <a href="${opts.dashboardUrl}/settings" style="color:#0891b2;">Manage notifications</a></p>
        </div>
        <div style="background:#f1f5f9;padding:20px 32px;text-align:center;">
          <p style="color:#94a3b8;font-size:12px;margin:0;">© 2026 TrustyPro · DFW, Texas</p>
        </div>
      </div>
    `,
  });
}

// ─── Payout Confirmation ──────────────────────────────────────────────────────
export async function sendPayoutConfirmation(opts: {
  to: string;
  partnerName: string;
  amount: number;
  method: string;
  periodLabel: string;
  dashboardUrl: string;
}) {
  return sendEmail({
    from: FROM_PROLNK,
    to: opts.to,
    subject: `Your ProLnk payout of $${opts.amount.toFixed(2)} has been processed`,
    html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;"><div style="background:linear-gradient(135deg,#0A1628,#1B4FD8);padding:32px;text-align:center;"><div style="font-size:28px;font-weight:800;color:#fff;">ProLnk</div><p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">Partner Commission Payout</p></div><div style="padding:32px;"><h2 style="color:#1e293b;margin:0 0 8px;">Hi ${opts.partnerName},</h2><p style="color:#64748b;line-height:1.6;">Your commission payout has been processed!</p><div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:24px;margin:24px 0;text-align:center;"><p style="color:#166534;font-size:13px;font-weight:600;margin:0 0 8px;">Payout Amount</p><p style="color:#15803d;font-size:40px;font-weight:800;margin:0;">$${opts.amount.toFixed(2)}</p><p style="color:#4ade80;font-size:13px;margin:8px 0 0;">${opts.periodLabel} - ${opts.method}</p></div><div style="text-align:center;margin:24px 0;"><a href="${opts.dashboardUrl}" style="background:#0A1628;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">View Payout History</a></div></div><div style="background:#f1f5f9;padding:20px 32px;text-align:center;"><p style="color:#94a3b8;font-size:12px;margin:0;">2026 ProLnk - DFW, Texas</p></div></div>`,
  });
}

// ─── Commission Earned Notification ──────────────────────────────────────────
export async function sendCommissionEarned(opts: {
  to: string;
  partnerName: string;
  amount: number;
  jobDescription: string;
  fromPartnerName: string;
  dashboardUrl: string;
}) {
  return sendEmail({
    from: FROM_PROLNK,
    to: opts.to,
    subject: `You earned $${opts.amount.toFixed(2)} in commission from ProLnk!`,
    html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;"><div style="background:linear-gradient(135deg,#0A1628,#7C3AED);padding:32px;text-align:center;"><div style="font-size:28px;font-weight:800;color:#fff;">ProLnk</div><p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">Commission Earned</p></div><div style="padding:32px;"><h2 style="color:#1e293b;margin:0 0 8px;">Hi ${opts.partnerName},</h2><p style="color:#64748b;line-height:1.6;">You just earned a commission from a referral in your network!</p><div style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:12px;padding:24px;margin:24px 0;text-align:center;"><p style="color:#6d28d9;font-size:13px;font-weight:600;margin:0 0 8px;">Commission Earned</p><p style="color:#7c3aed;font-size:40px;font-weight:800;margin:0;">$${opts.amount.toFixed(2)}</p><p style="color:#a78bfa;font-size:13px;margin:8px 0 0;">From: ${opts.fromPartnerName}</p></div><div style="background:#f8fafc;border-left:4px solid #7c3aed;padding:16px;margin:16px 0;"><p style="color:#1e293b;margin:0;font-size:14px;"><strong>Job:</strong> ${opts.jobDescription}</p></div><div style="text-align:center;margin:24px 0;"><a href="${opts.dashboardUrl}" style="background:#7c3aed;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">View My Earnings</a></div></div><div style="background:#f1f5f9;padding:20px 32px;text-align:center;"><p style="color:#94a3b8;font-size:12px;margin:0;">2026 ProLnk - DFW, Texas</p></div></div>`,
  });
}

// ─── Real Estate Agent Welcome ────────────────────────────────────────────────
export async function sendAgentWelcome(opts: {
  to: string;
  agentName: string;
  referralCode: string;
  dashboardUrl: string;
}) {
  return sendEmail({
    from: FROM_PROLNK,
    to: opts.to,
    subject: `Welcome to the ProLnk Real Estate Agent Network`,
    html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;"><div style="background:linear-gradient(135deg,#0A1628,#0891b2);padding:32px;text-align:center;"><div style="font-size:28px;font-weight:800;color:#fff;">ProLnk</div><p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">Real Estate Agent Partner Network</p></div><div style="padding:32px;"><h2 style="color:#1e293b;margin:0 0 8px;">Welcome, ${opts.agentName}!</h2><p style="color:#64748b;line-height:1.6;">You are now a ProLnk Real Estate Agent Partner. Start earning by referring homeowners to TrustyPro.</p><div style="background:#f0f9ff;border:1px solid #bae6fd;border-radius:12px;padding:20px;margin:20px 0;"><p style="color:#0369a1;font-weight:700;margin:0 0 12px;">Your Referral Code</p><p style="color:#0c4a6e;font-size:24px;font-weight:800;letter-spacing:0.1em;margin:0;font-family:monospace;">${opts.referralCode}</p></div><div style="text-align:center;margin:28px 0;"><a href="${opts.dashboardUrl}" style="background:#0A1628;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">View My Dashboard</a></div></div><div style="background:#f1f5f9;padding:20px 32px;text-align:center;"><p style="color:#94a3b8;font-size:12px;margin:0;">2026 ProLnk - DFW, Texas</p></div></div>`,
  });
}

// ─── Advertiser Application Received ─────────────────────────────────────────
export async function sendAdvertiserApplicationReceived(opts: {
  to: string;
  businessName: string;
  tierName: string;
  dashboardUrl: string;
}) {
  return sendEmail({
    from: FROM_TRUSTYPRO,
    to: opts.to,
    subject: `Your TrustyPro Advertising Application - We will be in touch!`,
    html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;"><div style="background:linear-gradient(135deg,#1e3a5f,#00B5B8);padding:32px;text-align:center;"><div style="font-size:28px;font-weight:800;color:#fff;">TrustyPro</div><p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">Preferred Partner Program</p></div><div style="padding:32px;"><h2 style="color:#1e293b;margin:0 0 8px;">Hi ${opts.businessName},</h2><p style="color:#64748b;line-height:1.6;">Thank you for applying to the TrustyPro <strong>${opts.tierName}</strong> advertising program. Our team will review it within 1-2 business days.</p><div style="background:#e6fafa;border:1px solid #99e6e8;border-radius:12px;padding:20px;margin:20px 0;"><p style="color:#0e7490;font-weight:600;margin:0 0 8px;">What happens next?</p><p style="color:#164e63;margin:0;font-size:14px;line-height:1.6;">Our team will reach out within 48 hours to confirm placement details, zip code coverage, and billing setup.</p></div><div style="text-align:center;margin:24px 0;"><a href="${opts.dashboardUrl}" style="background:#00B5B8;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Learn More About the Program</a></div></div><div style="background:#f1f5f9;padding:20px 32px;text-align:center;"><p style="color:#94a3b8;font-size:12px;margin:0;">2026 TrustyPro - DFW, Texas</p></div></div>`,
  });
}

// ─── Tier Upgrade Congratulations ────────────────────────────────────────────
export async function sendTierUpgradeCongrats(opts: {
  to: string;
  partnerName: string;
  newTierName: string;
  keepRate: number;
  dashboardUrl: string;
}) {
  return sendEmail({
    from: FROM_PROLNK,
    to: opts.to,
    subject: `Congrats! You have been upgraded to ProLnk ${opts.newTierName}`,
    html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;"><div style="background:linear-gradient(135deg,#0A1628,#7C3AED);padding:32px;text-align:center;"><div style="font-size:40px;margin-bottom:8px;">🎉</div><div style="font-size:28px;font-weight:800;color:#fff;">ProLnk</div><p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">Tier Upgrade</p></div><div style="padding:32px;"><h2 style="color:#1e293b;margin:0 0 8px;">Congratulations, ${opts.partnerName}!</h2><p style="color:#64748b;line-height:1.6;">You have been upgraded to <strong>${opts.newTierName}</strong> on ProLnk.</p><div style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:12px;padding:24px;margin:20px 0;text-align:center;"><p style="color:#6d28d9;font-size:13px;font-weight:600;margin:0 0 8px;">New Commission Rate</p><p style="color:#7c3aed;font-size:48px;font-weight:800;margin:0;">${opts.keepRate}%</p><p style="color:#a78bfa;font-size:13px;margin:8px 0 0;">of every referral commission</p></div><div style="text-align:center;margin:24px 0;"><a href="${opts.dashboardUrl}" style="background:#7c3aed;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">View My New Benefits</a></div></div><div style="background:#f1f5f9;padding:20px 32px;text-align:center;"><p style="color:#94a3b8;font-size:12px;margin:0;">2026 ProLnk - DFW, Texas</p></div></div>`,
  });
}


// ─── Pro Waitlist Confirmation ────────────────────────────────────────────────
export async function sendProWaitlistConfirmation(opts: {
  to: string;
  firstName: string;
  businessName: string;
  position: number;
  trades: string[];
  city: string;
  referralLink?: string;
}) {
  const refLink = opts.referralLink ?? `${BASE_URL}/join?ref=${Buffer.from(opts.to).toString("base64").replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase()}`;
  return sendEmail({
    from: FROM_PROLNK,
    to: opts.to,
    subject: `You're on the ProLnk Founding Partner Waitlist — Welcome, ${opts.firstName}!`,
    html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
<div style="background:linear-gradient(135deg,#0A1628,#1B4FD8);padding:40px 32px;text-align:center;">
  <div style="font-size:32px;font-weight:900;color:#fff;">ProLnk</div>
  <p style="color:rgba(255,255,255,0.75);margin:8px 0 0;font-size:14px;">Founding Partner Program</p>
</div>
<div style="padding:36px 32px;">
  <h2 style="color:#0f172a;margin:0 0 8px;">You're in, ${opts.firstName}!</h2>
  <p style="color:#475569;line-height:1.7;margin:0 0 24px;">Thanks for joining the ProLnk Founding Partner waitlist. You're among the first service professionals to get access to a referral network that works as hard as you do.</p>
  <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:12px;padding:24px;margin:0 0 24px;text-align:center;">
    <p style="color:#1e40af;font-size:13px;font-weight:600;margin:0 0 4px;">YOUR WAITLIST POSITION</p>
    <p style="color:#1d4ed8;font-size:52px;font-weight:900;margin:0;line-height:1;">#${opts.position}</p>
    <p style="color:#3b82f6;font-size:13px;margin:8px 0 0;">${opts.businessName} — ${opts.trades.slice(0,3).join(', ')} — ${opts.city}</p>
  </div>
  <div style="background:#0A1628;border-radius:12px;padding:24px;margin:0 0 24px;">
    <p style="color:#F5E642;font-size:13px;font-weight:700;margin:0 0 8px;">YOUR PERSONAL REFERRAL LINK</p>
    <p style="color:rgba(255,255,255,0.7);font-size:13px;margin:0 0 16px;">Share this with other contractors. Every pro you bring in counts toward your founding tier and future network income.</p>
    <div style="background:rgba(255,255,255,0.1);border-radius:8px;padding:12px 16px;margin:0 0 16px;word-break:break-all;">
      <p style="color:#fff;font-size:13px;font-family:monospace;margin:0;">${refLink}</p>
    </div>
    <a href="${refLink}" style="background:#F5E642;color:#0A1628;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;font-size:14px;">Copy &amp; Share Your Link</a>
  </div>
  <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:12px;padding:20px;margin:0 0 24px;">
    <p style="color:#1e40af;font-size:13px;font-weight:700;margin:0 0 8px;">NEXT STEP: PROTECT YOUR OWN HOME</p>
    <p style="color:#475569;font-size:13px;margin:0 0 16px;">As a ProLnk pro, you also get TrustyPro access for your own home — track maintenance, document your systems, and get matched with vetted pros in the network.</p>
    <a href="${BASE_URL}/trustypro/waitlist" style="background:#1B4FD8;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;font-size:14px;">Sign Up for TrustyPro →</a>
  </div>
  <p style="color:#64748b;font-size:14px;line-height:1.6;margin:0 0 24px;">We're launching in DFW first. You'll get a personal email when your market opens with a direct link to activate your account at the founding partner rate.</p>
</div>
<div style="background:#F1F5F9;padding:20px 32px;text-align:center;"><p style="color:#94a3b8;font-size:12px;margin:0;">2026 ProLnk — DFW, Texas</p></div>
</div>`,
  });
}

// ─── Homeowner Waitlist Confirmation ─────────────────────────────────────────
export async function sendHomeownerWaitlistConfirmation(opts: {
  to: string;
  firstName: string;
  address: string;
  city: string;
  position: number;
  projects: string[];
}) {
  const projectList = opts.projects.slice(0, 5).map(p => "<li style=\"color:#475569;font-size:14px;line-height:1.8;\">" + p + "</li>").join('');
  return sendEmail({
    from: FROM_TRUSTYPRO,
    to: opts.to,
    subject: `Your TrustyPro Home is Reserved — Welcome, ${opts.firstName}!`,
    html: "<div style=\"font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;\"><div style=\"background:linear-gradient(135deg,#1e3a5f,#00B5B8);padding:40px 32px;text-align:center;\"><div style=\"font-size:32px;font-weight:900;color:#fff;\">TrustyPro</div><p style=\"color:rgba(255,255,255,0.75);margin:8px 0 0;font-size:14px;\">Your Home. Protected. Verified. Smart.</p></div><div style=\"padding:36px 32px;\"><h2 style=\"color:#0f172a;margin:0 0 8px;\">Welcome to TrustyPro, " + opts.firstName + "!</h2><p style=\"color:#475569;line-height:1.7;margin:0 0 24px;\">Your home at <strong>" + opts.address + ", " + opts.city + "</strong> is reserved on the TrustyPro platform.</p><div style=\"background:#E6FAFA;border:1px solid #99E6E8;border-radius:12px;padding:24px;margin:0 0 24px;text-align:center;\"><p style=\"color:#0e7490;font-size:13px;font-weight:600;margin:0 0 4px;\">YOUR WAITLIST POSITION</p><p style=\"color:#0891b2;font-size:52px;font-weight:900;margin:0;line-height:1;\">#" + opts.position + "</p></div><div style=\"background:#F8FAFC;border-radius:12px;padding:20px;margin:0 0 24px;\"><p style=\"color:#0f172a;font-weight:700;margin:0 0 12px;\">Projects we'll match you with pros for:</p><ul style=\"margin:0;padding-left:20px;\">" + projectList + "</ul></div><div style=\"text-align:center;\"><a href=\"${BASE_URL}/join\" style=\"background:#00B5B8;color:#fff;padding:14px 36px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;\">View My Waitlist Status</a></div></div><div style=\"background:#F1F5F9;padding:20px 32px;text-align:center;\"><p style=\"color:#94a3b8;font-size:12px;margin:0;\">2026 TrustyPro - DFW, Texas</p></div></div>",
  });
}

// ─── Storm Alert to Pro ────────────────────────────────────────────────────────
export async function sendStormAlertToPro(opts: {
  to: string;
  partnerName: string;
  stormType: string;
  affectedZips: string[];
  homeownerCount: number;
  dashboardUrl: string;
}) {
  return sendEmail({
    from: FROM_PROLNK,
    to: opts.to,
    subject: `Storm Alert: ${opts.homeownerCount} homes in your service area may need attention`,
    html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;"><div style="background:linear-gradient(135deg,#1e1b4b,#7c3aed);padding:32px;text-align:center;"><div style="font-size:40px;margin-bottom:8px;">⚡</div><div style="font-size:28px;font-weight:800;color:#fff;">Storm Alert</div><p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">ProLnk Partner Network</p></div><div style="padding:32px;"><h2 style="color:#0f172a;margin:0 0 8px;">Action Opportunity, ${opts.partnerName}</h2><p style="color:#475569;line-height:1.7;">A <strong>${opts.stormType}</strong> has been detected in your service area. Approximately <strong>${opts.homeownerCount} TrustyPro homeowners</strong> in the affected area may need inspections or repairs.</p><div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:12px;padding:20px;margin:20px 0;"><p style="color:#c2410c;font-weight:700;margin:0 0 8px;">Affected Zip Codes</p><p style="color:#9a3412;font-size:15px;font-weight:600;margin:0;font-family:monospace;">${opts.affectedZips.join(' - ')}</p></div><div style="text-align:center;margin:24px 0;"><a href="${opts.dashboardUrl}" style="background:#7c3aed;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">View Inbound Leads</a></div></div><div style="background:#f1f5f9;padding:20px 32px;text-align:center;"><p style="color:#94a3b8;font-size:12px;margin:0;">2026 ProLnk - DFW, Texas</p></div></div>`,
  });
}

// ─── Review Request (Post-Job) ────────────────────────────────────────────────
export async function sendReviewRequest(opts: {
  to: string;
  homeownerName: string;
  proName: string;
  businessName: string;
  tradeType: string;
  reviewUrl: string;
}) {
  return sendEmail({
    from: FROM_TRUSTYPRO,
    to: opts.to,
    subject: `How did ${opts.businessName} do? Leave a quick review`,
    html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;"><div style="background:linear-gradient(135deg,#1e3a5f,#00B5B8);padding:32px;text-align:center;"><div style="font-size:28px;font-weight:800;color:#fff;">TrustyPro</div><p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">Verified Reviews</p></div><div style="padding:32px;"><h2 style="color:#0f172a;margin:0 0 8px;">How was your experience?</h2><p style="color:#475569;line-height:1.7;">Hi ${opts.homeownerName}, your recent <strong>${opts.tradeType}</strong> service with <strong>${opts.businessName}</strong> has been logged in your Home Health Vault. Take 30 seconds to leave a verified review.</p><div style="background:#F8FAFC;border-radius:12px;padding:20px;margin:20px 0;text-align:center;"><p style="color:#64748b;font-size:13px;margin:0 0 16px;">Rate your experience with ${opts.proName}</p><div style="font-size:36px;letter-spacing:4px;">⭐⭐⭐⭐⭐</div></div><div style="text-align:center;margin:24px 0;"><a href="${opts.reviewUrl}" style="background:#00B5B8;color:#fff;padding:14px 36px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Leave My Review</a></div></div><div style="background:#f1f5f9;padding:20px 32px;text-align:center;"><p style="color:#94a3b8;font-size:12px;margin:0;">2026 TrustyPro - DFW, Texas</p></div></div>`,
  });
}

// ─── Neighborhood Referral Invite ─────────────────────────────────────────────
export async function sendNeighborhoodReferralInvite(opts: {
  to: string;
  referrerName: string;
  neighborhood: string;
  inviteUrl: string;
}) {
  return sendEmail({
    from: FROM_TRUSTYPRO,
    to: opts.to,
    subject: `Your neighbor ${opts.referrerName} invited you to TrustyPro`,
    html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;"><div style="background:linear-gradient(135deg,#1e3a5f,#00B5B8);padding:32px;text-align:center;"><div style="font-size:28px;font-weight:800;color:#fff;">TrustyPro</div></div><div style="padding:32px;"><h2 style="color:#0f172a;margin:0 0 8px;">Your neighbor invited you</h2><p style="color:#475569;line-height:1.7;"><strong>${opts.referrerName}</strong> from <strong>${opts.neighborhood}</strong> thinks you'd love TrustyPro — the platform that keeps your home healthy, documents every repair, and connects you with verified pros your neighbors already trust.</p><div style="background:#E6FAFA;border:1px solid #99E6E8;border-radius:12px;padding:20px;margin:20px 0;text-align:center;"><p style="color:#0e7490;font-weight:700;margin:0 0 8px;">Join ${opts.neighborhood} on TrustyPro</p><p style="color:#475569;font-size:14px;margin:0;">See which pros your neighbors use, share maintenance tips, and protect your home's value together.</p></div><div style="text-align:center;margin:24px 0;"><a href="${opts.inviteUrl}" style="background:#00B5B8;color:#fff;padding:14px 36px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Join My Neighborhood</a></div></div><div style="background:#f1f5f9;padding:20px 32px;text-align:center;"><p style="color:#94a3b8;font-size:12px;margin:0;">2026 TrustyPro - DFW, Texas</p></div></div>`,
  });
}

// ─── Scout Assessment Report Shared ────────────────────────────────────────────
export async function sendScoutReportEmail(to: string, homeownerName: string, reportUrl: string, propertyAddress: string) {
  return sendEmail({
    from: FROM_PROLNK,
    to,
    subject: `Your Scout Assessment Report is Ready`,
    html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;"><div style="background:linear-gradient(135deg,#1e1b4b,#7c3aed);padding:32px;text-align:center;"><div style="font-size:40px;margin-bottom:8px;">📋</div><div style="font-size:28px;font-weight:800;color:#fff;">Your Home Assessment</div><p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:14px;">ProLnk Scout Report</p></div><div style="padding:32px;"><h2 style="color:#0f172a;margin:0 0 8px;">Report Ready: ${propertyAddress}</h2><p style="color:#475569;line-height:1.7;">Hi ${homeownerName}, your comprehensive home assessment report has been completed and is ready to review. Your Scout documented your entire property across 12 zones and generated an AI-powered analysis of condition, priorities, and estimated costs.</p><div style="background:#F3E8FF;border:1px solid #DDD6FE;border-radius:12px;padding:20px;margin:20px 0;"><p style="color:#6B21A8;font-weight:700;margin:0 0 8px;">What's Inside Your Report</p><ul style="color:#7C3A00;margin:8px 0;padding-left:20px;"><li>12-zone property assessment</li><li>Condition analysis & health score</li><li>Priority repair recommendations</li><li>Estimated costs for repairs</li><li>Post to Bid Board (sellers find pros)</li></ul></div><div style="text-align:center;margin:24px 0;"><a href="${reportUrl}" style="background:#7c3aed;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">View Your Report</a></div></div><div style="background:#f1f5f9;padding:20px 32px;text-align:center;"><p style="color:#94a3b8;font-size:12px;margin:0;">2026 ProLnk - DFW, Texas</p></div></div>`,
  });
}
