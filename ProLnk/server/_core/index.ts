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
import { registerN8nWebhooks } from "../webhooks/n8n";
import { handleStripeWebhook } from "../routers/stripe";
import { storagePut } from "../storage";
import { sweepExpiredLeads } from "../intake-router";
import { sweepExpiredDeals } from "../routers/customerDeals";
import { recalculateAllPartnerScores } from "../routers/partnerScore";
import { runComplianceScan } from "../compliance-agent";
import { runStormScan } from "../storm-agent";
import { sweepPendingCheckins, processCheckinResponse } from "../checkin-scheduler";
import mysql from "mysql2/promise";

// Safely cap timeout values to prevent 32-bit overflow
// Max safe value is 2^31 - 1 = 2147483647ms (about 24.8 days)
function safeTimeout(ms: number): number {
  const MAX_TIMEOUT = 2147483647;
  return Math.min(Math.max(ms, 0), MAX_TIMEOUT);
}

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

async function validateEnvironment() {
  const required = [
    'DATABASE_URL',
    'NODE_ENV',
    'RESEND_API_KEY',
  ];

  const missing = required.filter(v => !process.env[v]);
  if (missing.length > 0) {
    console.error(`[ERROR] Missing required environment variables: ${missing.join(', ')}`);
    console.error('Server startup blocked. Check your .env file.');
    process.exit(1);
  }

  const warnings = [];
  if (!process.env.STRIPE_SECRET_KEY) warnings.push('STRIPE_SECRET_KEY (payments disabled)');
  if (!process.env.OPENAI_API_KEY) warnings.push('OPENAI_API_KEY');
  if (!process.env.ANTHROPIC_API_KEY) warnings.push('ANTHROPIC_API_KEY');
  if (!process.env.SENTRY_DSN) warnings.push('SENTRY_DSN (error tracking disabled)');

  if (warnings.length > 0) {
    console.warn(`[WARN] Optional env vars not set: ${warnings.join(', ')}`);
  }
}

async function startServer() {
  await validateEnvironment();

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
  // n8n automation webhooks
  registerN8nWebhooks(app);

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

  // One-time database setup endpoint
  app.get("/setup", async (req, res) => {
    try {
      const { MIGRATION_0000, MIGRATION_0001 } = await import("./migrations-embedded");
      const dbUrl = process.env.DATABASE_URL?.replace(/\?.*$/, '');

      if (!dbUrl) {
        return res.status(500).json({ error: "DATABASE_URL not set" });
      }

      const connection = await mysql.createConnection({
        uri: dbUrl,
        ssl: { rejectUnauthorized: false },
        connectionTimeout: 10000,
      });

      // Disable foreign key checks to allow flexible table creation order
      await connection.query("SET FOREIGN_KEY_CHECKS=0");

      // Truncate all existing tables to start fresh
      try {
        const [tables]: any = await connection.query(
          "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE()"
        );
        for (const { TABLE_NAME } of tables || []) {
          try {
            await connection.query(`TRUNCATE TABLE \`${TABLE_NAME}\``);
          } catch (e) {
            // Ignore truncate errors
          }
        }
      } catch (e) {
        console.error("Error truncating tables:", e);
      }

      const statements = [
        ...MIGRATION_0000.split("--> statement-breakpoint").map(s => s.trim()).filter(s => s),
        ...MIGRATION_0001.split("--> statement-breakpoint").map(s => s.trim()).filter(s => s),
      ];

      let succeeded = 0;
      const errors: string[] = [];
      const skipPatterns = ["You have an error in your SQL syntax"];

      for (const stmt of statements) {
        try {
          await connection.query(stmt);
          succeeded++;
        } catch (e: any) {
          const msg = e?.message || "";
          // Skip expected errors (TiDB incompatibility)
          if (!skipPatterns.some(p => msg.includes(p))) {
            errors.push(msg.substring(0, 100));
          }
        }
      }

      // Re-enable foreign key checks
      await connection.query("SET FOREIGN_KEY_CHECKS=1");
      await connection.end();
      res.json({ status: "success", created: succeeded, errors: errors.slice(0, 5) });
    } catch (e: any) {
      res.status(500).json({ error: e?.message });
    }
  });

  // Health check endpoint for Railway/load balancers
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: Date.now() });
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

  // Migrations are run via GET /setup endpoint instead of at startup
  // This allows them to be executed on-demand after deployment

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

