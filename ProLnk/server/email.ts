/**
 * ProLnk / TrustyPro Transactional Email Service
 * Uses Resend API for all outbound emails.
 * Sending domain: onboarding@resend.dev (fallback until custom domains are verified)
 * Future: noreply@prolnk.io (ProLnk) | noreply@trustypro.com (TrustyPro)
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_PROLNK = process.env.FROM_EMAIL || "ProLnk <hello@prolnk.xyz>";
const FROM_TRUSTYPRO = process.env.FROM_EMAIL_TRUSTYPRO || "TrustyPro <hello@prolnk.xyz>";
const BASE_URL = process.env.APP_BASE_URL ?? "https://prolnk.xyz";

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail(payload: EmailPayload): Promise<boolean> {
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
  trade: string;
  position: number;
  city: string;
  tier?: string;
  referralCode?: string;
  referralLink?: string;
}) {
  const tierLabel =
    opts.tier === "charter" ? "Charter Member" :
    opts.tier === "founding" ? "Founding Member" :
    opts.tier === "level3" ? "Growth Member" :
    opts.tier === "level4" ? "Network Member" :
    "Founding Network Member";
  const tierBadgeColor =
    opts.tier === "charter" ? "#F5E642" :
    opts.tier === "founding" ? "#FBB040" :
    opts.tier === "level3" ? "#A78BFA" :
    "#60A5FA";
  const refCode = opts.referralCode ?? Buffer.from(opts.to).toString("base64").replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase();
  const refLink = opts.referralLink ?? `${BASE_URL}/join/${refCode}`;
  const statusUrl = `${BASE_URL}/waitlist-status?ref=${refCode}`;
  return sendEmail({
    from: FROM_PROLNK,
    to: opts.to,
    subject:
      opts.tier === "charter"  ? `${opts.firstName}, you've been selected as one of 25 ProLnk Charter Members` :
      opts.tier === "founding" ? `${opts.firstName}, you've been nominated for the ProLnk Founding 100` :
      opts.tier === "level3"   ? `${opts.firstName}, welcome to ProLnk — you're a Growth Member` :
      opts.tier === "level4"   ? `${opts.firstName}, welcome to ProLnk — you're a Network Member` :
                                  `${opts.firstName}, thanks for joining the ProLnk waitlist`,
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:20px 0;background:#0f172a;">
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background:#0A1628;border-radius:16px;overflow:hidden;">

  <!-- Header -->
  <div style="background:linear-gradient(160deg,#0A1628 0%,#0d1f3c 50%,#0A1628 100%);padding:52px 40px 40px;text-align:center;border-bottom:1px solid rgba(245,230,66,0.2);">
    <div style="font-size:34px;font-weight:900;color:#ffffff;letter-spacing:-1.5px;line-height:1;">ProLnk</div>
    <div style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px;letter-spacing:2px;text-transform:uppercase;">Founding Partner Network</div>
    <div style="display:inline-block;background:${tierBadgeColor};color:#0A1628;font-size:12px;font-weight:800;padding:7px 22px;border-radius:100px;margin-top:20px;letter-spacing:0.8px;text-transform:uppercase;">${tierLabel}</div>
    <div style="color:#ffffff;font-size:28px;font-weight:900;margin-top:22px;line-height:1.2;">Your Charter Spot is Reserved</div>
    <div style="color:rgba(255,255,255,0.5);font-size:13px;margin-top:6px;">One of a limited number of founding professionals in DFW</div>
  </div>

  <!-- Body -->
  <div style="padding:40px;">
    <h1 style="color:#ffffff;margin:0 0 10px;font-size:22px;font-weight:800;">You're in, ${opts.firstName}.</h1>
    <p style="color:rgba(255,255,255,0.6);line-height:1.7;margin:0 0 32px;font-size:15px;">${
      opts.tier === "charter"  ? "You are one of just 25 service professionals personally selected as a Charter Member. You are why ProLnk exists — every pro who joins after comes through you." :
      opts.tier === "founding" ? "You have been nominated to the Founding 100, the second tier of the network — opened by personal invitation from our 25 Charter Members. Your spot is reserved." :
      opts.tier === "level3"   ? "You have been brought into ProLnk as a Growth Member — the third wave of founding pros in DFW. Your spot among the 400 Growth Members is reserved." :
      opts.tier === "level4"   ? "Welcome to ProLnk as a Network Member — part of the founding 2,125 professionals building this network across DFW. Your spot is reserved." :
                                  "Thanks for joining the ProLnk waitlist. We will reach out as we open enrollment in your area."
    }</p>

    <!-- Position card -->
    <div style="background:linear-gradient(135deg,#111e35,#0d2245);border:2px solid ${tierBadgeColor};border-radius:14px;padding:28px;margin:0 0 24px;text-align:center;">
      <div style="color:${tierBadgeColor};font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin:0 0 6px;">Your Reserved Waitlist Position</div>
      <div style="color:#ffffff;font-size:72px;font-weight:900;line-height:1;margin:0 0 10px;">#${opts.position}</div>
      <div style="color:rgba(255,255,255,0.5);font-size:13px;">${tierLabel}&nbsp;&nbsp;·&nbsp;&nbsp;${opts.trade}&nbsp;&nbsp;·&nbsp;&nbsp;${opts.city}</div>
      <div style="display:inline-block;background:rgba(245,230,66,0.1);border:1px solid rgba(245,230,66,0.25);color:${tierBadgeColor};font-size:11px;font-weight:700;padding:5px 16px;border-radius:100px;margin-top:14px;letter-spacing:0.5px;">SPOT LOCKED</div>
    </div>

    <!-- Benefits checklist -->
    <div style="background:#111e35;border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:24px;margin:0 0 24px;">
      <div style="color:${tierBadgeColor};font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin:0 0 16px;">Your Founding Network Benefits</div>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);vertical-align:middle;width:24px;"><span style="color:${tierBadgeColor};font-size:16px;">✓</span></td><td style="padding:8px 0 8px 10px;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:#ffffff;font-size:14px;font-weight:600;">72% Network Bonus</span><span style="color:rgba(255,255,255,0.45);font-size:13px;"> — share of platform fee (3-15% of job value), on top of normal earnings</span></td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);vertical-align:middle;"><span style="color:${tierBadgeColor};font-size:16px;">✓</span></td><td style="padding:8px 0 8px 10px;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:#ffffff;font-size:14px;font-weight:600;">90 days free top-tier ($249/mo benefits)</span><span style="color:rgba(255,255,255,0.45);font-size:13px;"> — after, $149/mo locked for life with full top-tier features</span></td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);vertical-align:middle;"><span style="color:${tierBadgeColor};font-size:16px;">✓</span></td><td style="padding:8px 0 8px 10px;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:#ffffff;font-size:14px;font-weight:600;">4-generation override income</span><span style="color:rgba(255,255,255,0.45);font-size:13px;"> — earn on every pro you recruit, 4 levels deep</span></td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);vertical-align:middle;"><span style="color:${tierBadgeColor};font-size:16px;">✓</span></td><td style="padding:8px 0 8px 10px;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:#ffffff;font-size:14px;font-weight:600;">Home Origination Bonus</span><span style="color:rgba(255,255,255,0.45);font-size:13px;"> — permanent recurring revenue on homes you bring onto TrustyPro</span></td></tr>
        <tr><td style="padding:8px 0;vertical-align:middle;"><span style="color:${tierBadgeColor};font-size:16px;">✓</span></td><td style="padding:8px 0 8px 10px;"><span style="color:#ffffff;font-size:14px;font-weight:600;">AI-matched leads</span><span style="color:rgba(255,255,255,0.45);font-size:13px;"> — photo-detected jobs delivered to your inbox</span></td></tr>
      </table>
    </div>

    <!-- Referral code box -->
    <div style="background:#0d2245;border:1px solid rgba(245,230,66,0.2);border-radius:14px;padding:24px;margin:0 0 24px;">
      <div style="color:rgba(255,255,255,0.5);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 6px;">Your Referral Code</div>
      <div style="color:#F5E642;font-size:28px;font-weight:900;font-family:'Courier New',monospace;letter-spacing:4px;margin:0 0 18px;">${refCode}</div>

      <!-- Pro referral link -->
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px;margin:0 0 14px;">
        <div style="color:rgba(245,230,66,0.85);font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 8px;">Invite other pros</div>
        <div style="background:rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:10px 12px;margin:0 0 10px;word-break:break-all;">
          <span style="color:rgba(255,255,255,0.7);font-size:12px;font-family:'Courier New',monospace;">${refLink}</span>
        </div>
        <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0;line-height:1.5;">Send to other service professionals. Every pro who signs up through your link becomes part of your 4-generation override network.</p>
      </div>

      <!-- Homeowner referral link -->
      <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px;margin:0 0 16px;">
        <div style="color:rgba(245,230,66,0.85);font-size:11px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 8px;">Invite homeowners</div>
        <div style="background:rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:10px 12px;margin:0 0 10px;word-break:break-all;">
          <span style="color:rgba(255,255,255,0.7);font-size:12px;font-family:'Courier New',monospace;">https://trustypro.io/join/${refCode}</span>
        </div>
        <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0;line-height:1.5;">Send to homeowners in your area. Every home that signs up through you pays a permanent Home Origination Bonus — recurring revenue from their property forever.</p>
      </div>

      <a href="${refLink}" style="display:inline-block;background:#F5E642;color:#0A1628;padding:12px 26px;border-radius:9px;text-decoration:none;font-weight:800;font-size:14px;">View Your Referral Hub →</a>
    </div>

    <!-- What happens next timeline -->
    <div style="background:#111e35;border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:24px;margin:0 0 24px;">
      <div style="color:${tierBadgeColor};font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin:0 0 18px;">What Happens Next</div>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="vertical-align:top;">
          <td style="width:56px;padding:0 0 20px;">
            <div style="width:36px;height:36px;border-radius:50%;background:rgba(245,230,66,0.12);border:1.5px solid ${tierBadgeColor};text-align:center;line-height:36px;color:${tierBadgeColor};font-weight:900;font-size:14px;">1</div>
          </td>
          <td style="padding:0 0 20px;padding-left:4px;">
            <div style="color:#ffffff;font-size:14px;font-weight:700;margin:0 0 3px;">Application reviewed (24–48 hrs)</div>
            <div style="color:rgba(255,255,255,0.45);font-size:13px;line-height:1.5;">Our team will verify your trade license and service area. You'll get an approval email with your activation link.</div>
          </td>
        </tr>
        <tr style="vertical-align:top;">
          <td style="width:56px;padding:0 0 20px;">
            <div style="width:36px;height:36px;border-radius:50%;background:rgba(245,230,66,0.12);border:1.5px solid rgba(245,230,66,0.3);text-align:center;line-height:36px;color:rgba(245,230,66,0.5);font-weight:900;font-size:14px;">2</div>
          </td>
          <td style="padding:0 0 20px;padding-left:4px;">
            <div style="color:#ffffff;font-size:14px;font-weight:700;margin:0 0 3px;">Start your 90 days free top-tier ($249/mo benefits)</div>
            <div style="color:rgba(255,255,255,0.45);font-size:13px;line-height:1.5;">Set your service zip codes, upload your license, and you're live. $0 for 90 days — no credit card required at signup.</div>
          </td>
        </tr>
        <tr style="vertical-align:top;">
          <td style="width:56px;padding:0 0 20px;">
            <div style="width:36px;height:36px;border-radius:50%;background:rgba(245,230,66,0.12);border:1.5px solid rgba(245,230,66,0.3);text-align:center;line-height:36px;color:rgba(245,230,66,0.5);font-weight:900;font-size:14px;">3</div>
          </td>
          <td style="padding:0 0 20px;padding-left:4px;">
            <div style="color:#ffffff;font-size:14px;font-weight:700;margin:0 0 3px;">Receive your first AI-matched leads</div>
            <div style="color:rgba(255,255,255,0.45);font-size:13px;line-height:1.5;">Homeowners in your zip codes will start requesting quotes. You get notified instantly — accept or pass in one tap.</div>
          </td>
        </tr>
        <tr style="vertical-align:top;">
          <td style="width:56px;">
            <div style="width:36px;height:36px;border-radius:50%;background:rgba(245,230,66,0.12);border:1.5px solid rgba(245,230,66,0.3);text-align:center;line-height:36px;color:rgba(245,230,66,0.5);font-weight:900;font-size:14px;">4</div>
          </td>
          <td style="padding-left:4px;">
            <div style="color:#ffffff;font-size:14px;font-weight:700;margin:0 0 3px;">Invite other pros &amp; start earning passively</div>
            <div style="color:rgba(255,255,255,0.45);font-size:13px;line-height:1.5;">Share your referral code above. Every pro you recruit earns you 12% of their $149/mo — on autopilot, every month.</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin:0 0 32px;">
      <a href="${statusUrl}" style="display:inline-block;background:#F5E642;color:#0A1628;padding:16px 40px;border-radius:10px;text-decoration:none;font-weight:800;font-size:16px;">View Your Dashboard →</a>
      <div style="color:rgba(255,255,255,0.35);font-size:12px;margin-top:10px;">Track your position, referrals, and launch timeline</div>
    </div>

    <!-- TrustyPro nudge -->
    <div style="background:#0d2245;border:1px solid rgba(0,181,184,0.2);border-radius:12px;padding:20px;">
      <div style="color:#00B5B8;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;">Also for You: TrustyPro</div>
      <p style="color:rgba(255,255,255,0.55);font-size:13px;margin:0 0 14px;line-height:1.6;">As a ProLnk pro, you get TrustyPro access for your own home — AI-powered home scan, track maintenance history, document systems, and protect your home's value for resale.</p>
      <a href="${BASE_URL}/trustypro/waitlist" style="display:inline-block;background:rgba(0,181,184,0.15);color:#00B5B8;border:1px solid rgba(0,181,184,0.4);padding:10px 22px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px;">Join TrustyPro Waitlist →</a>
    </div>
  </div>

  <!-- Footer -->
  <div style="background:#060f1e;padding:20px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
    <div style="color:rgba(255,255,255,0.2);font-size:12px;">© 2026 ProLnk Partner Network · DFW, Texas · Patent Pending</div>
    <div style="color:rgba(255,255,255,0.12);font-size:11px;margin-top:4px;">You're receiving this because you joined the ProLnk Founding Network waitlist.</div>
  </div>

</div>
</body></html>`,
  });
}

// ─── Homeowner Waitlist Confirmation ─────────────────────────────────────────
export async function sendHomeownerWaitlistConfirmation(opts: {
  to: string;
  firstName: string;
  address: string;
  city: string;
  position: number;
  serviceNeeded: string;
}) {
  const confirmationNumber = `TP-${opts.position.toString().padStart(5, "0")}-${Buffer.from(opts.to).toString("base64").replace(/[^A-Z0-9]/gi, "").slice(0, 4).toUpperCase()}`;
  return sendEmail({
    from: FROM_TRUSTYPRO,
    to: opts.to,
    subject: `You're on the list! Confirmation #${confirmationNumber} — TrustyPro`,
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:20px 0;background:#f0fdfe;">
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid rgba(0,181,184,0.15);">

  <!-- Header -->
  <div style="background:linear-gradient(160deg,#062336 0%,#065f6b 60%,#007b7e 100%);padding:52px 40px 44px;text-align:center;">
    <div style="font-size:34px;font-weight:900;color:#ffffff;letter-spacing:-1.5px;">TrustyPro</div>
    <div style="font-size:12px;color:rgba(255,255,255,0.5);margin-top:4px;letter-spacing:2px;text-transform:uppercase;">Your Home. Protected. Smart.</div>
    <div style="color:#ffffff;font-size:30px;font-weight:900;margin-top:22px;line-height:1.15;">You're on the list!</div>
    <div style="color:rgba(255,255,255,0.65);font-size:14px;margin-top:8px;">You'll receive up to 3 verified quotes within 24 hours of launch</div>
    <div style="display:inline-block;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);color:#ffffff;font-size:11px;font-weight:700;padding:6px 20px;border-radius:100px;margin-top:18px;letter-spacing:1px;font-family:'Courier New',monospace;">CONF# ${confirmationNumber}</div>
  </div>

  <!-- Body -->
  <div style="padding:40px;">
    <h1 style="color:#0f172a;margin:0 0 10px;font-size:22px;font-weight:800;">Welcome, ${opts.firstName}!</h1>
    <p style="color:#475569;line-height:1.7;margin:0 0 28px;font-size:15px;">Your spot is confirmed. We're launching in DFW first — when your area activates, you'll receive up to <strong style="color:#0f172a;">3 competitive quotes from verified, licensed professionals</strong> for your home at <strong style="color:#0f172a;">${opts.address}, ${opts.city}</strong>.</p>

    <!-- Position + confirmation card -->
    <div style="background:linear-gradient(135deg,#e6fafa,#f0fdfe);border:2px solid #00B5B8;border-radius:14px;padding:28px;margin:0 0 28px;text-align:center;">
      <div style="display:flex;justify-content:center;gap:32px;flex-wrap:wrap;">
        <div>
          <div style="color:#0e7490;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;">Waitlist Position</div>
          <div style="color:#00B5B8;font-size:64px;font-weight:900;line-height:1;">#${opts.position}</div>
        </div>
        <div style="border-left:1px solid #99e6e8;padding-left:32px;">
          <div style="color:#0e7490;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;">Confirmation #</div>
          <div style="color:#065f6b;font-size:18px;font-weight:900;font-family:'Courier New',monospace;margin-top:12px;">${confirmationNumber}</div>
          <div style="color:#0e7490;font-size:12px;margin-top:6px;">Save this for your records</div>
        </div>
      </div>
      <div style="color:#0e7490;font-size:13px;margin-top:16px;padding-top:16px;border-top:1px solid #99e6e8;">${opts.city}&nbsp;&nbsp;·&nbsp;&nbsp;${opts.serviceNeeded}</div>
    </div>

    <!-- 3 quotes promise -->
    <div style="background:#0A1628;border-radius:14px;padding:24px;margin:0 0 28px;text-align:center;">
      <div style="color:#00B5B8;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin:0 0 10px;">What Happens When You Activate</div>
      <div style="color:#ffffff;font-size:22px;font-weight:900;line-height:1.3;">Up to 3 verified quotes<br><span style="color:#00B5B8;">within 24 hours</span></div>
      <div style="color:rgba(255,255,255,0.55);font-size:13px;margin-top:10px;line-height:1.6;">No cold calls. No searching. Our AI matches your <strong style="color:rgba(255,255,255,0.8);">${opts.serviceNeeded}</strong> request with background-checked pros in your zip code — they come to you.</div>
    </div>

    <!-- How it works -->
    <div style="margin:0 0 28px;">
      <div style="color:#0e7490;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin:0 0 16px;">How TrustyPro Works for You</div>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="vertical-align:top;">
          <td style="padding:14px 16px 14px 0;border-bottom:1px solid #e2e8f0;width:40px;">
            <div style="background:#e6fafa;border:1.5px solid #00B5B8;border-radius:50%;width:32px;height:32px;text-align:center;line-height:32px;color:#00B5B8;font-weight:900;font-size:14px;">1</div>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid #e2e8f0;">
            <div style="color:#0f172a;font-weight:700;font-size:14px;margin:0 0 3px;">We activate your spot</div>
            <div style="color:#64748b;font-size:13px;line-height:1.5;">You'll get an email when DFW launches. No action needed — your <strong>${opts.serviceNeeded}</strong> request is already queued.</div>
          </td>
        </tr>
        <tr style="vertical-align:top;">
          <td style="padding:14px 16px 14px 0;border-bottom:1px solid #e2e8f0;">
            <div style="background:#e6fafa;border:1.5px solid rgba(0,181,184,0.4);border-radius:50%;width:32px;height:32px;text-align:center;line-height:32px;color:#00B5B8;font-weight:900;font-size:14px;">2</div>
          </td>
          <td style="padding:14px 0;border-bottom:1px solid #e2e8f0;">
            <div style="color:#0f172a;font-weight:700;font-size:14px;margin:0 0 3px;">Receive up to 3 quotes in 24 hours</div>
            <div style="color:#64748b;font-size:13px;line-height:1.5;">AI-matched, background-checked, licensed pros send you competitive quotes. Compare side-by-side and pick your favorite.</div>
          </td>
        </tr>
        <tr style="vertical-align:top;">
          <td style="padding:14px 16px 14px 0;">
            <div style="background:#e6fafa;border:1.5px solid rgba(0,181,184,0.4);border-radius:50%;width:32px;height:32px;text-align:center;line-height:32px;color:#00B5B8;font-weight:900;font-size:14px;">3</div>
          </td>
          <td style="padding:14px 0;">
            <div style="color:#0f172a;font-weight:700;font-size:14px;margin:0 0 3px;">Build your Home Health Vault</div>
            <div style="color:#64748b;font-size:13px;line-height:1.5;">Every repair is permanently logged — protecting your home's value and making resale 20% faster with verified maintenance records.</div>
          </td>
        </tr>
      </table>
    </div>

    <!-- TrustyPro AI scan nudge -->
    <div style="background:linear-gradient(135deg,#e6fafa,#f0fdfe);border:1px solid #99e6e8;border-radius:14px;padding:22px;margin:0 0 28px;">
      <div style="color:#065f6b;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin:0 0 10px;">Coming Soon: TrustyPro AI Home Scan</div>
      <p style="color:#0e7490;font-size:13px;margin:0 0 12px;line-height:1.6;">Point your phone at any part of your home. Our AI visually detects maintenance issues, estimates repair costs, and routes the right pro directly to you — before small problems become expensive ones.</p>
      <div style="color:#065f6b;font-size:12px;font-weight:700;">As a waitlist member, you'll get early access before public launch.</div>
    </div>

    <!-- Service requested highlight -->
    <div style="background:#f8fafc;border-left:4px solid #00B5B8;border-radius:0 10px 10px 0;padding:16px 20px;margin:0 0 28px;">
      <div style="color:#0e7490;font-size:11px;font-weight:800;letter-spacing:1px;text-transform:uppercase;margin:0 0 4px;">Your Queued Service Request</div>
      <div style="color:#0f172a;font-size:15px;font-weight:700;">${opts.serviceNeeded}</div>
      <div style="color:#64748b;font-size:13px;margin-top:2px;">${opts.address}, ${opts.city}</div>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin:0 0 12px;">
      <a href="${BASE_URL}/join" style="display:inline-block;background:#00B5B8;color:#ffffff;padding:16px 44px;border-radius:10px;text-decoration:none;font-weight:800;font-size:16px;">View My Waitlist Status →</a>
    </div>
    <div style="text-align:center;color:#94a3b8;font-size:12px;margin:0 0 28px;">We'll email you the moment your area goes live. No spam, ever.</div>

    <!-- Trust badge -->
    <div style="background:linear-gradient(135deg,#e6fafa,#f0fdfe);border:1px solid #99e6e8;border-radius:12px;padding:18px 20px;text-align:center;">
      <div style="color:#0e7490;font-size:13px;font-weight:700;margin:0 0 6px;">Why Homeowners Choose TrustyPro</div>
      <div style="color:#475569;font-size:13px;line-height:1.7;">Verified &amp; licensed pros &nbsp;·&nbsp; AI-matched to your exact need &nbsp;·&nbsp; Permanent home records &nbsp;·&nbsp; Up to 3 quotes in 24 hrs</div>
    </div>
  </div>

  <!-- Footer -->
  <div style="background:#f1f5f9;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
    <div style="color:#94a3b8;font-size:12px;">© 2026 TrustyPro · DFW, Texas</div>
    <div style="color:#cbd5e1;font-size:11px;margin-top:4px;">Confirmation #${confirmationNumber} · You're receiving this because you joined the TrustyPro homeowner waitlist.</div>
  </div>

</div>
</body></html>`,
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

// ─── Partner Approval Email ───────────────────────────────────────────────────
export async function sendPartnerApprovalEmail(params: {
  to: string;
  firstName: string;
  tier: string;
  tierLabel: string;
  referralCode: string;
  position: number;
  setupUrl?: string;
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[Email] RESEND_API_KEY not set — skipping approval email to ${params.to}`);
    return;
  }
  const referralLink = `${BASE_URL}/apply?ref=${params.referralCode}`;
  const primaryCtaUrl = params.setupUrl ?? `${BASE_URL}/checkout`;
  const primaryCtaLabel = params.setupUrl ? "Set Your Password &amp; Activate Account →" : "Start Your 90-Day Free Trial →";
  const dashboardUrl = `${BASE_URL}/waitlist-status?ref=${params.referralCode}`;
  await sendEmail({
    from: FROM_PROLNK,
    to: params.to,
    subject: `You're In! Welcome to ProLnk Founding Network — ${params.tierLabel}`,
    html: `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;padding:20px 0;background:#0f172a;">
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:600px;margin:0 auto;background:#0A1628;border-radius:16px;overflow:hidden;">

  <!-- Hero header -->
  <div style="background:linear-gradient(160deg,#0A1628 0%,#0d1f3c 40%,#0A1628 100%);padding:52px 40px 44px;text-align:center;border-bottom:1px solid rgba(245,230,66,0.2);">
    <div style="font-size:48px;margin:0 0 14px;">🎉</div>
    <div style="font-size:34px;font-weight:900;color:#ffffff;letter-spacing:-1.5px;line-height:1;">ProLnk</div>
    <div style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px;letter-spacing:2px;text-transform:uppercase;">Founding Partner Network</div>
    <div style="color:#F5E642;font-size:36px;font-weight:900;margin-top:20px;line-height:1.15;">You're In!</div>
    <div style="margin-top:14px;">
      <div style="display:inline-block;background:#F5E642;color:#0A1628;font-size:14px;font-weight:900;padding:10px 28px;border-radius:100px;letter-spacing:0.5px;">${params.tierLabel.toUpperCase()} · APPROVED</div>
    </div>
    <div style="color:rgba(255,255,255,0.45);font-size:13px;margin-top:12px;">Founding Network · Position #${params.position}</div>
  </div>

  <!-- Body -->
  <div style="padding:40px;">
    <h2 style="color:#ffffff;margin:0 0 10px;font-size:22px;font-weight:800;">Congratulations, ${params.firstName}!</h2>
    <p style="color:rgba(255,255,255,0.6);line-height:1.7;margin:0 0 28px;font-size:15px;">Your application to join the ProLnk Founding Partner Network has been approved. You're one of the first professionals in DFW to get in — your rates are locked, your position is permanent, and you start earning the moment you activate.</p>

    <!-- Commission rate quick-reference -->
    <div style="background:#111e35;border:1px solid rgba(245,230,66,0.15);border-radius:14px;overflow:hidden;margin:0 0 24px;">
      <div style="background:rgba(245,230,66,0.08);padding:16px 20px;border-bottom:1px solid rgba(245,230,66,0.12);">
        <div style="color:#F5E642;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">Your ${params.tierLabel} Commission Rates</div>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
          <td style="padding:14px 20px;color:rgba(255,255,255,0.45);font-size:13px;width:45%;">Keep Rate</td>
          <td style="padding:14px 20px;"><span style="color:#F5E642;font-size:18px;font-weight:900;">72%</span><span style="color:rgba(255,255,255,0.5);font-size:13px;"> of every job match</span></td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
          <td style="padding:14px 20px;color:rgba(255,255,255,0.45);font-size:13px;">Network Job Commissions</td>
          <td style="padding:14px 20px;"><span style="color:#F5E642;font-size:15px;font-weight:800;">7/4/2/1%</span><span style="color:rgba(255,255,255,0.5);font-size:13px;"> — 4 levels deep</span></td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
          <td style="padding:14px 20px;color:rgba(255,255,255,0.45);font-size:13px;">Subscription Overrides</td>
          <td style="padding:14px 20px;"><span style="color:#F5E642;font-size:15px;font-weight:800;">12/6/3/1.5%</span><span style="color:rgba(255,255,255,0.5);font-size:13px;"> per $149/mo — recurring</span></td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
          <td style="padding:14px 20px;color:rgba(255,255,255,0.45);font-size:13px;">Origination Rights</td>
          <td style="padding:14px 20px;"><span style="color:#F5E642;font-size:15px;font-weight:800;">1.5%</span><span style="color:rgba(255,255,255,0.5);font-size:13px;"> per documented home, forever</span></td>
        </tr>
        <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
          <td style="padding:14px 20px;color:rgba(255,255,255,0.45);font-size:13px;">Monthly Fee</td>
          <td style="padding:14px 20px;color:#ffffff;font-size:14px;font-weight:700;">$149/mo — locked in forever</td>
        </tr>
        <tr>
          <td style="padding:14px 20px;color:rgba(255,255,255,0.45);font-size:13px;">Free Trial</td>
          <td style="padding:14px 20px;"><span style="background:rgba(245,230,66,0.12);color:#F5E642;font-size:13px;font-weight:700;padding:4px 10px;border-radius:6px;">90 days free — $0 today</span></td>
        </tr>
      </table>
    </div>

    <!-- Referral code -->
    <div style="background:#0d2245;border:1px solid rgba(245,230,66,0.2);border-radius:14px;padding:24px;margin:0 0 24px;">
      <div style="color:rgba(255,255,255,0.45);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin:0 0 6px;">Your Referral Code — Start Earning Today</div>
      <div style="color:#F5E642;font-size:28px;font-weight:900;font-family:'Courier New',monospace;letter-spacing:4px;margin:0 0 14px;">${params.referralCode}</div>
      <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:11px 14px;margin:0 0 14px;word-break:break-all;">
        <span style="color:rgba(255,255,255,0.4);font-size:12px;font-family:'Courier New',monospace;">${referralLink}</span>
      </div>
      <p style="color:rgba(255,255,255,0.5);font-size:13px;margin:0 0 16px;line-height:1.6;">Share this with other contractors <strong style="color:rgba(255,255,255,0.7);">right now</strong>. Every pro who joins under your code pays $149/mo — you earn 12% of that, recurring, every single month. Invite 10 pros = $214/mo passive income before you do a single job.</p>
      <a href="${referralLink}" style="display:inline-block;background:#F5E642;color:#0A1628;padding:12px 26px;border-radius:9px;text-decoration:none;font-weight:800;font-size:14px;">Share Your Referral Link →</a>
    </div>

    <!-- Two CTAs -->
    <div style="margin:0 0 14px;">
      <a href="${primaryCtaUrl}" style="display:block;background:#F5E642;color:#0A1628;padding:17px 32px;border-radius:10px;text-decoration:none;font-weight:800;font-size:16px;text-align:center;">${primaryCtaLabel}</a>
    </div>
    <div style="margin:0 0 8px;">
      <a href="${referralLink}" style="display:block;background:transparent;color:#F5E642;border:2px solid rgba(245,230,66,0.4);padding:15px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;text-align:center;">Share Your Referral Link</a>
    </div>
    <div style="text-align:center;color:rgba(255,255,255,0.3);font-size:12px;margin:0 0 32px;">$149/mo after trial · Cancel anytime before day 90 · No price increases, ever</div>

    <!-- Onboarding call -->
    <div style="background:linear-gradient(135deg,#0d1f3c,#111e35);border:1px solid rgba(245,230,66,0.15);border-radius:14px;padding:22px;margin:0 0 24px;">
      <div style="color:#F5E642;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin:0 0 10px;">Book Your Free Onboarding Call</div>
      <p style="color:rgba(255,255,255,0.6);font-size:13px;margin:0 0 16px;line-height:1.6;">Our team will walk you through setting up your profile, configuring your service zip codes, and claiming your first origination rights — in under 30 minutes. Founding members get priority scheduling.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a href="mailto:andrew@lit-ventures.com?subject=Onboarding Call - ${encodeURIComponent(params.firstName)} (${params.tierLabel})&body=Hi, I just got approved as a ${params.tierLabel} and would love to schedule my onboarding call." style="display:inline-block;background:rgba(245,230,66,0.12);color:#F5E642;border:1px solid rgba(245,230,66,0.3);padding:10px 22px;border-radius:8px;text-decoration:none;font-weight:700;font-size:13px;">Request Onboarding Call →</a>
      </div>
    </div>

    <!-- What happens next -->
    <div style="background:#111e35;border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:22px;margin:0 0 12px;">
      <div style="color:rgba(255,255,255,0.5);font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;margin:0 0 16px;">Your First 4 Steps to Earning</div>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.05);color:#F5E642;font-size:16px;width:28px;vertical-align:middle;">1</td><td style="padding:9px 0 9px 10px;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:#ffffff;font-size:13px;font-weight:700;">Start your free trial</span><span style="color:rgba(255,255,255,0.4);font-size:13px;"> — no charge for 90 days, activate above</span></td></tr>
        <tr><td style="padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.05);color:#F5E642;font-size:16px;vertical-align:middle;">2</td><td style="padding:9px 0 9px 10px;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:#ffffff;font-size:13px;font-weight:700;">Set your service zip codes</span><span style="color:rgba(255,255,255,0.4);font-size:13px;"> — define exactly where you want leads</span></td></tr>
        <tr><td style="padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.05);color:#F5E642;font-size:16px;vertical-align:middle;">3</td><td style="padding:9px 0 9px 10px;border-bottom:1px solid rgba(255,255,255,0.05);"><span style="color:#ffffff;font-size:13px;font-weight:700;">Log your first job photo</span><span style="color:rgba(255,255,255,0.4);font-size:13px;"> — claim 1.5% origination rights on that home, forever</span></td></tr>
        <tr><td style="padding:9px 0;color:#F5E642;font-size:16px;vertical-align:middle;">4</td><td style="padding:9px 0 9px 10px;"><span style="color:#ffffff;font-size:13px;font-weight:700;">Invite 3 contractors this week</span><span style="color:rgba(255,255,255,0.4);font-size:13px;"> — earn $53/mo recurring before you finish your first job</span></td></tr>
      </table>
    </div>

    <div style="text-align:center;margin-top:20px;">
      <a href="${dashboardUrl}" style="color:rgba(245,230,66,0.7);text-decoration:none;font-size:13px;font-weight:600;">View your waitlist dashboard →</a>
    </div>
  </div>

  <!-- Footer -->
  <div style="background:#060f1e;padding:20px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
    <div style="color:rgba(255,255,255,0.2);font-size:12px;">© 2026 ProLnk Partner Network · DFW, Texas · Patent Pending</div>
  </div>

</div>
</body></html>`,
  });
}

// ─── Partner Rejection Email ───────────────────────────────────────────────────
export async function sendPartnerRejectionEmail(params: {
  to: string;
  firstName: string;
  reason?: string;
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[Email] RESEND_API_KEY not set — skipping rejection email to ${params.to}`);
    return;
  }
  await sendEmail({
    from: FROM_PROLNK,
    to: params.to,
    subject: `ProLnk Application Update`,
    html: `
<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
  <div style="background:#0A1628;padding:40px 32px;text-align:center;">
    <div style="font-size:32px;font-weight:900;color:#F5E642;letter-spacing:-1px;">ProLnk</div>
    <div style="font-size:13px;color:rgba(255,255,255,0.5);margin-top:4px;">Founding Partner Network</div>
  </div>
  <div style="padding:40px 36px;">
    <h2 style="color:#0f172a;margin:0 0 8px;font-size:20px;">Application Update, ${params.firstName}</h2>
    <p style="color:#475569;line-height:1.7;margin:0 0 20px;">Thank you for your interest in the ProLnk Founding Partner Network. After reviewing your application, we're unable to move forward at this time.</p>
    ${params.reason ? `<div style="background:#FFF7ED;border:1px solid #FED7AA;border-radius:10px;padding:16px;margin:0 0 20px;"><p style="color:#c2410c;font-weight:700;margin:0 0 4px;font-size:13px;">Note from our team:</p><p style="color:#9a3412;font-size:14px;margin:0;line-height:1.6;">${params.reason}</p></div>` : ""}
    <p style="color:#475569;line-height:1.7;margin:0 0 28px;">You're welcome to reapply in 90 days. If you believe this was an error, reply to this email and we'll take another look.</p>
    <div style="background:#F8FAFC;border-radius:10px;padding:16px;margin:0 0 12px;">
      <p style="color:#64748b;font-size:13px;margin:0;">In the meantime, you can still join <a href="${BASE_URL}/trustypro/waitlist" style="color:#1B4FD8;text-decoration:none;font-weight:600;">TrustyPro as a homeowner</a> to protect your own home's health records.</p>
    </div>
  </div>
  <div style="background:#F1F5F9;padding:20px 32px;text-align:center;">
    <p style="color:#94a3b8;font-size:12px;margin:0;">© 2026 ProLnk Partner Network · DFW, Texas</p>
  </div>
</div>`,
  });
}

// ─── Welcome to Network Email ──────────────────────────────────────────────────
export async function sendWelcomeToNetworkEmail(params: {
  to: string;
  firstName: string;
  trade: string;
  tier: string;
  referralLink: string;
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[Email] RESEND_API_KEY not set — skipping welcome email to ${params.to}`);
    return;
  }
  const tierLabel =
    params.tier === "charter" ? "Charter Member" :
    params.tier === "founding" ? "Founding Member" :
    params.tier === "level3" ? "Level 3 Partner" :
    params.tier === "level4" ? "Level 4 Partner" : "Founding Member";
  const refCode = params.referralLink.split("ref=")[1] ?? "PROLNK";
  await sendEmail({
    from: FROM_PROLNK,
    to: params.to,
    subject: `Welcome to the ProLnk Network, ${params.firstName}!`,
    html: `
<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
  <div style="background:linear-gradient(135deg,#0A1628 0%,#1B4FD8 50%,#0A1628 100%);padding:56px 32px;text-align:center;">
    <div style="font-size:48px;margin-bottom:16px;">🎉</div>
    <div style="font-size:36px;font-weight:900;color:#fff;letter-spacing:-1px;">Welcome to ProLnk</div>
    <div style="font-size:14px;color:rgba(255,255,255,0.7);margin-top:6px;">You're officially in the network.</div>
    <div style="display:inline-block;background:#F5E642;color:#0A1628;font-size:13px;font-weight:800;padding:8px 24px;border-radius:100px;margin-top:24px;letter-spacing:0.5px;">${tierLabel}</div>
  </div>
  <div style="padding:40px 36px;">
    <h2 style="color:#0f172a;margin:0 0 8px;font-size:22px;">You did it, ${params.firstName}!</h2>
    <p style="color:#475569;line-height:1.7;margin:0 0 28px;">You're now an active member of the ProLnk Founding Network as a <strong style="color:#0A1628;">${params.trade}</strong> professional. Here's everything you need to start earning across all 3 commission streams — starting today.</p>

    <div style="background:#0A1628;border-radius:16px;padding:28px;margin:0 0 24px;text-align:center;">
      <p style="color:rgba(255,255,255,0.6);font-size:12px;font-weight:700;margin:0 0 6px;text-transform:uppercase;letter-spacing:1px;">Your Referral Code</p>
      <p style="color:#F5E642;font-size:32px;font-weight:900;font-family:monospace;margin:0 0 16px;letter-spacing:4px;">${refCode}</p>
      <div style="background:rgba(255,255,255,0.08);border-radius:8px;padding:12px 16px;margin:0 0 18px;word-break:break-all;">
        <p style="color:#94a3b8;font-size:12px;font-family:monospace;margin:0;">${params.referralLink}</p>
      </div>
      <p style="color:rgba(255,255,255,0.55);font-size:13px;margin:0;">Share this link. Every pro who signs up becomes your Level 1 — earning you subscription overrides every month, forever.</p>
    </div>

    <div style="margin:0 0 24px;">
      <p style="color:#0f172a;font-weight:700;font-size:14px;margin:0 0 14px;">Your 3 Commission Streams</p>
      ${[
        ["🏠", "Home Origination", "1.5% of every platform fee at homes you've documented. Perpetual.", "#f0fdf4", "#15803d"],
        ["👥", "Network Job Commissions", "7% of platform fees when L1 pros complete jobs. 4%/2%/1% for L2–L4.", "#EFF6FF", "#1d4ed8"],
        ["🔄", "Subscription Overrides", "12% of each L1 recruit's $149/mo. Recurring, every month.", "#faf5ff", "#7c3aed"],
      ].map(([icon, title, desc, bg, color]) => `
      <div style="background:${bg};border-radius:10px;padding:16px;margin-bottom:10px;display:flex;gap:12px;align-items:flex-start;">
        <span style="font-size:22px;line-height:1;">${icon}</span>
        <div>
          <p style="color:${color};font-weight:700;font-size:14px;margin:0 0 3px;">${title}</p>
          <p style="color:#475569;font-size:13px;margin:0;line-height:1.5;">${desc}</p>
        </div>
      </div>`).join("")}
    </div>

    <div style="text-align:center;margin:0 0 28px;">
      <a href="${BASE_URL}/dashboard" style="display:inline-block;background:#0A1628;color:#F5E642;padding:16px 40px;border-radius:10px;text-decoration:none;font-weight:800;font-size:15px;">Go to My Dashboard →</a>
    </div>

    <div style="background:#FFF9E6;border:1px solid #FDE68A;border-radius:10px;padding:16px;">
      <p style="color:#92400e;font-weight:700;margin:0 0 6px;font-size:13px;">Pro Tip: Earn in the first 24 hours</p>
      <p style="color:#78350f;font-size:13px;margin:0;line-height:1.6;">Log one job photo today. You'll claim origination rights on that home immediately — before anyone else can.</p>
    </div>
  </div>
  <div style="background:#F1F5F9;padding:20px 32px;text-align:center;">
    <p style="color:#94a3b8;font-size:12px;margin:0;">© 2026 ProLnk Partner Network · DFW, Texas · Patent Pending</p>
  </div>
</div>`,
  });
}

// ─── Partner Password Reset ────────────────────────────────────────────────────
export async function sendPartnerPasswordReset(opts: {
  to: string;
  partnerName: string;
  resetUrl: string;
}) {
  return sendEmail({
    from: FROM_PROLNK,
    to: opts.to,
    subject: `Reset your ProLnk password`,
    html: `<div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;"><div style="background:linear-gradient(135deg,#0A1628,#00B5B8);padding:32px;text-align:center;"><div style="font-size:28px;font-weight:800;color:#fff;">ProLnk</div></div><div style="padding:32px;"><h2 style="color:#0f172a;margin:0 0 8px;">Reset Your Password</h2><p style="color:#475569;line-height:1.7;">Hi ${opts.partnerName}, we received a request to reset your ProLnk partner account password. Click the button below to set a new password.</p><div style="text-align:center;margin:24px 0;"><a href="${opts.resetUrl}" style="background:#00B5B8;color:#fff;padding:14px 36px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">Reset Password</a></div><p style="color:#94a3b8;font-size:13px;">This link expires in 1 hour. If you did not request a password reset, you can safely ignore this email.</p></div><div style="background:#f1f5f9;padding:20px 32px;text-align:center;"><p style="color:#94a3b8;font-size:12px;margin:0;">2026 ProLnk - DFW, Texas</p></div></div>`,
  });
}
