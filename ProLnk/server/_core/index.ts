import "dotenv/config";
import * as Sentry from "@sentry/node";

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || "development",
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,
  });
}

import express from "express";
import rateLimit from "express-rate-limit";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { webhookRouter } from "../webhooks";
import { handleStripeWebhook } from "../routers/stripe";
import { storagePut } from "../storage";
import { sweepExpiredLeads } from "../intake-router";
import { sweepExpiredDeals } from "../routers/customerDeals";
import { recalculateAllPartnerScores } from "../routers/partnerScore";
import { runComplianceScan } from "../compliance-agent";
import { runStormScan } from "../storm-agent";
import { sweepPendingCheckins, processCheckinResponse } from "../checkin-scheduler";
import { runMigrations } from "./migrations";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Trust proxy for proper rate limiting behind reverse proxy
  app.set('trust proxy', 1);
  // Item 47: Rate limiting — protect AI scan and API endpoints
  const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many requests, please try again in a minute." },
  });
  const scanLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many scan requests. Please wait 5 minutes before trying again." },
  });
  app.use("/api/trpc", apiLimiter);
  app.use("/api/upload-photos", scanLimiter);
  // Stripe webhook MUST be registered BEFORE express.json() to preserve raw body for signature verification
  app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // Webhook receivers for external integrations
  app.use("/api/webhooks", webhookRouter);

  // Photo upload endpoint -- accepts base64 encoded images
  app.post("/api/upload-photos", async (req, res) => {
    try {
      const { photos } = req.body as { photos: Array<{ data: string; type: string; name: string }> };
      if (!photos || !Array.isArray(photos)) {
        return res.status(400).json({ error: "No photos provided" });
      }
      const urls: string[] = [];
      for (const photo of photos.slice(0, 10)) {
        const base64Data = photo.data.replace(/^data:[^;]+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        // Item 48: Server-side file size validation (16MB limit)
        if (buffer.length > 16 * 1024 * 1024) {
          return res.status(400).json({ error: `Photo "${photo.name}" exceeds 16MB limit. Please use a smaller image.` });
        }
        const ext = photo.type === "image/png" ? "png" : photo.type === "image/webp" ? "webp" : "jpg";
        const key = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { url } = await storagePut(key, buffer, photo.type || "image/jpeg");
        urls.push(url);
      }
      return res.json({ urls });
    } catch (err) {
      console.error("[upload-photos] Error:", err);
      return res.status(500).json({ error: "Upload failed" });
    }
  });

  // License/insurance file upload endpoint -- accepts base64 encoded documents
  app.post("/api/upload-license", async (req, res) => {
    try {
      const { file } = req.body as { file: { data: string; type: string; name: string } };
      if (!file) return res.status(400).json({ error: "No file provided" });
      const base64Data = file.data.replace(/^data:[^;]+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      if (buffer.length > 10 * 1024 * 1024) {
        return res.status(400).json({ error: "File exceeds 10MB limit." });
      }
      const ext = file.type === "application/pdf" ? "pdf" : file.type.includes("png") ? "png" : file.type.includes("jpeg") || file.type.includes("jpg") ? "jpg" : "pdf";
      const key = `licenses/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { url } = await storagePut(key, buffer, file.type || "application/pdf");
      return res.json({ url, fileName: file.name });
    } catch (err) {
      console.error("[upload-license] Error:", err);
      return res.status(500).json({ error: "Upload failed" });
    }
  });

  // Sitemap.xml endpoint for SEO
  app.get("/sitemap.xml", async (_req, res) => {
    const baseUrl = process.env.APP_BASE_URL || "https://prolnk.io";
    const staticRoutes = [
      { path: "/", priority: "1.0", changefreq: "weekly" },
      { path: "/apply", priority: "0.9", changefreq: "monthly" },
      { path: "/partners", priority: "0.8", changefreq: "weekly" },
      { path: "/trust", priority: "0.8", changefreq: "monthly" },
      { path: "/trustypro", priority: "0.8", changefreq: "weekly" },
      { path: "/leaderboard", priority: "0.6", changefreq: "daily" },
      { path: "/stats", priority: "0.6", changefreq: "daily" },
      { path: "/resources", priority: "0.7", changefreq: "weekly" },
      { path: "/advertise", priority: "0.8", changefreq: "monthly" },
      { path: "/pricing", priority: "0.8", changefreq: "monthly" },
      { path: "/agent-portal", priority: "0.6", changefreq: "monthly" },
      { path: "/trustypro/scan", priority: "0.9", changefreq: "weekly" },
      { path: "/trustypro/pros", priority: "0.8", changefreq: "weekly" },
      { path: "/privacy", priority: "0.3", changefreq: "yearly" },
      { path: "/terms", priority: "0.3", changefreq: "yearly" },
    ];
    const now = new Date().toISOString().split("T")[0];
    const urls = staticRoutes.map(r => `  <url>\n    <loc>${baseUrl}${r.path}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`).join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
    res.setHeader("Content-Type", "application/xml");
    res.send(xml);
  });

  // Homeowner check-in response endpoint (linked from 48-hour email)
  app.get("/api/checkin/:token", async (req, res) => {
    try {
      const { token } = req.params;
      const { response } = req.query as { response?: string };
      if (!token) return res.status(400).json({ error: "Missing token" });
      const result = await processCheckinResponse(token, (response === "yes" || response === "no") ? response : undefined);
      if (!result) return res.status(404).send("<h2>Check-in link not found or already used.</h2>");
      const msg = response === "yes"
        ? "<h2 style='color:green'>✓ Thank you! We're glad the job went well.</h2><p>Your feedback helps keep our network accountable.</p>"
        : response === "no"
        ? "<h2 style='color:orange'>✗ Thank you for letting us know.</h2><p>Our team will follow up to make sure your experience is resolved.</p>"
        : "<h2>Did the service professional complete the job?</h2><p><a href='?response=yes' style='margin-right:20px;font-size:1.2em'>✓ Yes</a><a href='?response=no' style='font-size:1.2em'>✗ No</a></p>";
      res.send(`<!DOCTYPE html><html><body style='font-family:sans-serif;max-width:600px;margin:60px auto;padding:20px'>${msg}</body></html>`);
    } catch (err) {
      console.error("[checkin] Error:", err);
      res.status(500).send("<h2>Something went wrong. Please try again later.</h2>");
    }
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  // Run database migrations on startup
  try {
    await runMigrations();
  } catch (err) {
    console.error("[Server] Migration failed, but continuing with startup:", err);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

// Background job: sweep expired leads every 5 minutes and auto-route to next partner
setInterval(async () => {
  try {
    await sweepExpiredLeads();
    await sweepExpiredDeals();
  } catch (err: any) {
    // Suppress transient TiDB/network timeouts -- they self-resolve on next tick
    const msg = String(err?.message || "");
    const causeMsg = String(err?.cause?.message || err?.cause?.code || "");
    const isTransient = [msg, causeMsg].some(s =>
      s.includes("timeout") || s.includes("safe point") ||
      s.includes("ECONNRESET") || s.includes("ETIMEDOUT") ||
      s.includes("ECONNREFUSED") || s.includes("read ECONNRESET")
    );
    if (!isTransient) {
      console.error("[Background] sweepExpiredLeads error:", err);
    }
  }
}, 5 * 60 * 1000);
console.log("[Background] Lead expiry sweep scheduled every 5 minutes");

// Background job: recalculate Partner Priority Scores nightly at 2 AM server time
function scheduleNightlyPpsRecalculation() {
  const now = new Date();
  const next2am = new Date(now);
  next2am.setHours(2, 0, 0, 0);
  if (next2am <= now) next2am.setDate(next2am.getDate() + 1);
  const msUntilNext2am = next2am.getTime() - now.getTime();
  setTimeout(async () => {
    try {
      console.log("[Background] Starting nightly PPS recalculation...");
      const result = await recalculateAllPartnerScores();
      console.log(`[Background] PPS recalculation complete: ${result.updated} updated, ${result.errors} errors`);
    } catch (err) {
      console.error("[Background] PPS recalculation error:", err);
    }
    // Schedule next run in 24 hours
    setInterval(async () => {
      try {
        const result = await recalculateAllPartnerScores();
        console.log(`[Background] PPS recalculation complete: ${result.updated} updated, ${result.errors} errors`);
      } catch (err) {
        console.error("[Background] PPS recalculation error:", err);
      }
    }, 24 * 60 * 60 * 1000);
  }, msUntilNext2am);
  console.log(`[Background] Nightly PPS recalculation scheduled (next run: ${next2am.toISOString()})`);
}
scheduleNightlyPpsRecalculation();

// Background job: daily compliance scan at 3 AM server time
function scheduleNightlyComplianceScan() {
  const now = new Date();
  const next3am = new Date(now);
  next3am.setHours(3, 0, 0, 0);
  if (next3am <= now) next3am.setDate(next3am.getDate() + 1);
  const msUntilNext3am = next3am.getTime() - now.getTime();
  setTimeout(async () => {
    try {
      console.log("[Background] Starting nightly compliance scan...");
      const result = await runComplianceScan();
      console.log(`[Background] Compliance scan complete: ${result.coiExpiringSoon} expiring, ${result.coiExpired} expired, ${result.autoSuspended} suspended`);
    } catch (err) {
      console.error("[Background] Compliance scan error:", err);
    }
    setInterval(async () => {
      try { await runComplianceScan(); } catch (err) { console.error("[Background] Compliance scan error:", err); }
    }, 24 * 60 * 60 * 1000);
  }, msUntilNext3am);
  console.log(`[Background] Nightly compliance scan scheduled (next run: ${next3am.toISOString()})`);
}
scheduleNightlyComplianceScan();

// Background job: nightly storm scan at 4 AM server time
function scheduleNightlyStormScan() {
  const now = new Date();
  const next4am = new Date(now);
  next4am.setHours(4, 0, 0, 0);
  if (next4am <= now) next4am.setDate(next4am.getDate() + 1);
  const msUntilNext4am = next4am.getTime() - now.getTime();
  setTimeout(async () => {
    try {
      console.log("[Background] Starting nightly storm scan...");
      const result = await runStormScan();
      console.log(`[Background] Storm scan complete: ${result.eventsFound} events found, ${result.leadsGenerated} leads generated, ${result.propertiesAffected} properties affected`);
    } catch (err) {
      console.error("[Background] Storm scan error:", err);
    }
    setInterval(async () => {
      try { await runStormScan(); } catch (err) { console.error("[Background] Storm scan error:", err); }
    }, 24 * 60 * 60 * 1000);
  }, msUntilNext4am);
  console.log(`[Background] Nightly storm scan scheduled (next run: ${next4am.toISOString()})`);
}
scheduleNightlyStormScan();

// Background job: sweep pending check-ins every 30 minutes
setInterval(async () => {
  try {
    const origin = process.env.VITE_APP_URL || `http://localhost:${process.env.PORT || 3000}`;
    await sweepPendingCheckins(origin);
  } catch (err) {
    console.error("[Background] sweepPendingCheckins error:", err);
  }
}, 30 * 60 * 1000);
console.log("[Background] Check-in sweep scheduled every 30 minutes");

// Background job: nightly commission auto-payout at 2:30 AM server time
// Sweeps jobPayments with status = 'balance_charged' and triggers Stripe Connect transfers
function scheduleNightlyPayoutSweep() {
  const now = new Date();
  const next230am = new Date(now);
  next230am.setHours(2, 30, 0, 0);
  if (next230am <= now) next230am.setDate(next230am.getDate() + 1);
  const msUntilFirst = next230am.getTime() - now.getTime();

  setTimeout(async () => {
    try { await runPayoutSweep(); } catch (err) { console.error("[Background] Payout sweep error:", err); }
    setInterval(async () => {
      try { await runPayoutSweep(); } catch (err) { console.error("[Background] Payout sweep error:", err); }
    }, 24 * 60 * 60 * 1000);
  }, msUntilFirst);

  console.log(`[Background] Nightly commission payout sweep scheduled (next run: ${next230am.toISOString()})`);
}

async function runPayoutSweep() {
  const { getDb } = await import("../db");
  const StripeLib = (await import("stripe")).default;
  const stripeClient = new StripeLib(process.env.STRIPE_SECRET_KEY ?? "", { apiVersion: "2025-02-24.acacia" as any });

  const db = await getDb();
  if (!db) return;

  const rows = await (db as any).execute(`
    SELECT jp.id, jp.dealId, jp.receivingPartnerId, jp.receivingPartnerPayout,
           p.stripeConnectAccountId, p.businessName
    FROM jobPayments jp
    JOIN partners p ON jp.receivingPartnerId = p.id
    WHERE jp.status = 'balance_charged'
      AND p.stripeConnectStatus = 'active'
      AND p.stripeConnectAccountId IS NOT NULL
      AND jp.stripeTransferId IS NULL
    LIMIT 50
    -- Note: referring partner commissions are in the commissions table
    -- and swept separately below
  `);
  const payments = rows.rows || rows;

  let swept = 0, errors = 0;
  for (const jp of payments) {
    try {
      const amountCents = Math.round(parseFloat(jp.receivingPartnerPayout || "0") * 100);
      if (amountCents < 2500) continue; // $25 minimum payout threshold
      const transfer = await stripeClient.transfers.create({
        amount: amountCents,
        currency: "usd",
        destination: jp.stripeConnectAccountId,
        description: `ProLnk nightly payout — Job Payment #${jp.id}`,
        metadata: { jobPaymentId: String(jp.id), dealId: String(jp.dealId), sweep: "nightly" },
      });
      await (db as any).execute(`UPDATE jobPayments SET status = 'paid_out', stripeTransferId = '${transfer.id}', updatedAt = NOW() WHERE id = ${jp.id}`);
      swept++;
      console.log(`[PayoutSweep] Transferred $${(amountCents / 100).toFixed(2)} to ${jp.businessName} (transfer: ${transfer.id})`);
    } catch (err: any) {
      errors++;
      console.error(`[PayoutSweep] Failed for jobPayment ${jp.id}:`, err.message);
    }
  }
  console.log(`[PayoutSweep] Complete: ${swept} paid out, ${errors} errors`);
}

scheduleNightlyPayoutSweep();

// Background job: daily marketing automation at 8:00 AM (seasonal reminders, win-back, tier milestones)
function scheduleDailyMarketingAutomation() {
  const now = new Date();
  const next8am = new Date(now);
  next8am.setHours(8, 0, 0, 0);
  if (next8am <= now) next8am.setDate(next8am.getDate() + 1);
  const msUntilFirst = next8am.getTime() - now.getTime();
  setTimeout(async () => {
    try {
      const { runDailyMarketingAutomation } = await import("../marketing-automation");
      await runDailyMarketingAutomation();
    } catch (err) { console.error("[Background] Marketing automation error:", err); }
    setInterval(async () => {
      try {
        const { runDailyMarketingAutomation } = await import("../marketing-automation");
        await runDailyMarketingAutomation();
      } catch (err) { console.error("[Background] Marketing automation error:", err); }
    }, 24 * 60 * 60 * 1000);
  }, msUntilFirst);
  console.log(`[Background] Daily marketing automation scheduled (next run: ${next8am.toISOString()})`);
}
scheduleDailyMarketingAutomation();

// Background job: extended marketing automation v2 at 9:00 AM
// Handles: weekly partner digest, referral nudge, deal expiry push, NPS follow-up, leaderboard broadcast, scan re-engagement
function scheduleDailyMarketingAutomationV2() {
  const now = new Date();
  const next9am = new Date(now);
  next9am.setHours(9, 0, 0, 0);
  if (next9am <= now) next9am.setDate(next9am.getDate() + 1);
  const msUntilFirst = next9am.getTime() - now.getTime();
  setTimeout(async () => {
    try {
      const { runExtendedMarketingAutomation } = await import("../marketing-automation-v2");
      await runExtendedMarketingAutomation();
    } catch (err) { console.error("[Background] Marketing automation v2 error:", err); }
    setInterval(async () => {
      try {
        const { runExtendedMarketingAutomation } = await import("../marketing-automation-v2");
        await runExtendedMarketingAutomation();
      } catch (err) { console.error("[Background] Marketing automation v2 error:", err); }
    }, 24 * 60 * 60 * 1000);
  }, msUntilFirst);
  console.log(`[Background] Extended marketing automation v2 scheduled (next run: ${next9am.toISOString()})`);
}
scheduleDailyMarketingAutomationV2();

// Background job: reset network income monthly job counts on the 1st of each month at midnight
let monthlyResetScheduled = false;
function scheduleMonthlyNetworkReset() {
  if (monthlyResetScheduled) return;
  monthlyResetScheduled = true;

  function msUntilNextMonthStart(): number {
    const now = new Date();
    const next = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
    const delay = next.getTime() - now.getTime();
    return Math.min(Math.max(delay, 1000), 30 * 24 * 60 * 60 * 1000); // Between 1s and 30 days
  }
  setTimeout(async () => {
    try {
      const { getDb } = await import("../db");
      const { sql } = await import("drizzle-orm");
      const db = await getDb();
      if (db) {
        await (db as any).execute(sql`UPDATE pro_network_profile SET jobs_completed_this_month = 0`);
        console.log("[Background] Network monthly job count reset complete");
      }
    } catch (err) {
      console.error("[Background] Network monthly reset error:", err);
    }
    monthlyResetScheduled = false;
    scheduleMonthlyNetworkReset();
  }, msUntilNextMonthStart());
  console.log("[Background] Network monthly reset scheduled");
}
scheduleMonthlyNetworkReset();
