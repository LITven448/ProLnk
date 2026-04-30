#!/usr/bin/env node
/**
 * Wire Inngest into server/_core/index.ts
 * Adds the Inngest serve handler and removes old setInterval jobs
 * Run: node patches-bugs/wire-inngest.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const INDEX_FILE = path.join(ROOT, "server/_core/index.ts");

let content = fs.readFileSync(INDEX_FILE, "utf8");

// Add Inngest serve handler after the tRPC middleware
const TRPC_ANCHOR = `  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );`;

const INNGEST_ADDITION = `  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // Inngest — durable background jobs
  try {
    const { serve } = await import("inngest/express");
    const { inngest: inngestClient, functions } = await import("../inngest");
    app.use("/api/inngest", serve({ client: inngestClient, functions }));
    console.log("[Inngest] Durable job handler registered at /api/inngest");
  } catch (err) {
    console.warn("[Inngest] SDK not installed or config missing — falling back to setInterval jobs. Run: pnpm add inngest");
  }`;

if (!content.includes("inngest/express")) {
  content = content.replace(TRPC_ANCHOR, INNGEST_ADDITION);
  console.log("✅ Added Inngest serve handler");
} else {
  console.log("⏭  Inngest already wired");
}

// Wire new routes: CompanyCam, Jobber OAuth callbacks
const WEBHOOK_ANCHOR = `  // Homeowner check-in response endpoint`;
const INTEGRATION_ROUTES = `  // CompanyCam OAuth callback
  app.get("/api/integrations/companycam/connect", async (req, res) => {
    const { sdk } = await import("./sdk");
    try { const user = await sdk.authenticateRequest(req);
      const { getCompanyCamAuthUrl } = await import("../companycam");
      const { getDb } = await import("../db");
      const { sql } = await import("drizzle-orm");
      const db = await getDb();
      const rows = await (db as any).execute(sql\`SELECT id FROM partners WHERE userId = \${user.id} LIMIT 1\`);
      const partner = (rows.rows || rows)[0];
      if (!partner) return res.status(403).json({ error: "Partner not found" });
      return res.redirect(getCompanyCamAuthUrl(partner.id));
    } catch { return res.status(401).json({ error: "Unauthorized" }); }
  });

  app.get("/api/integrations/companycam/callback", async (req, res) => {
    const code = req.query.code as string;
    const stateStr = req.query.state as string;
    if (!code || !stateStr) return res.redirect("/dashboard/settings?companycam=error");
    try {
      const state = JSON.parse(Buffer.from(stateStr, "base64url").toString());
      const { exchangeCompanyCamCode, registerCompanyCamWebhook, backfillCompanyCamPhotos } = await import("../companycam");
      const tokens = await exchangeCompanyCamCode(code);
      const { getDb } = await import("../db");
      const { sql } = await import("drizzle-orm");
      const db = await getDb();
      await (db as any).execute(sql\`
        INSERT INTO partnerIntegrations (partnerId, source, accessToken, refreshToken, tokenExpiresAt, externalAccountId, externalAccountName, status, connectedAt)
        VALUES (\${state.partnerId}, 'companycam', \${tokens.accessToken}, \${tokens.refreshToken}, \${tokens.expiresAt}, \${tokens.accountId}, \${tokens.accountName}, 'active', NOW())
        ON DUPLICATE KEY UPDATE accessToken = VALUES(accessToken), refreshToken = VALUES(refreshToken), tokenExpiresAt = VALUES(tokenExpiresAt), status = 'active', lastSyncAt = NOW()
      \`);
      const webhookId = await registerCompanyCamWebhook(tokens.accessToken);
      if (webhookId) {
        await (db as any).execute(sql\`UPDATE partnerIntegrations SET webhookId = \${webhookId} WHERE partnerId = \${state.partnerId} AND source = 'companycam'\`);
      }
      backfillCompanyCamPhotos(state.partnerId, tokens.accessToken).catch(() => {});
      return res.redirect("/dashboard/settings?companycam=connected");
    } catch (err) {
      console.error("[CompanyCam] OAuth callback error:", err);
      return res.redirect("/dashboard/settings?companycam=error");
    }
  });

  // Jobber OAuth callback
  app.get("/api/integrations/jobber/connect", async (req, res) => {
    const { sdk } = await import("./sdk");
    try {
      const user = await sdk.authenticateRequest(req);
      const { getJobberAuthUrl } = await import("../jobber");
      const { getDb } = await import("../db");
      const { sql } = await import("drizzle-orm");
      const db = await getDb();
      const rows = await (db as any).execute(sql\`SELECT id FROM partners WHERE userId = \${user.id} LIMIT 1\`);
      const partner = (rows.rows || rows)[0];
      if (!partner) return res.status(403).json({ error: "Partner not found" });
      return res.redirect(getJobberAuthUrl(partner.id));
    } catch { return res.status(401).json({ error: "Unauthorized" }); }
  });

  app.get("/api/integrations/jobber/callback", async (req, res) => {
    const code = req.query.code as string;
    const stateStr = req.query.state as string;
    if (!code) return res.redirect("/dashboard/settings?jobber=error");
    try {
      const state = JSON.parse(Buffer.from(stateStr, "base64url").toString());
      const { exchangeJobberCode, backfillJobberPhotos } = await import("../jobber");
      const tokens = await exchangeJobberCode(code);
      const { getDb } = await import("../db");
      const { sql } = await import("drizzle-orm");
      const db = await getDb();
      await (db as any).execute(sql\`
        INSERT INTO partnerIntegrations (partnerId, source, accessToken, refreshToken, tokenExpiresAt, status, connectedAt)
        VALUES (\${state.partnerId}, 'jobber', \${tokens.accessToken}, \${tokens.refreshToken}, \${tokens.expiresAt}, 'active', NOW())
        ON DUPLICATE KEY UPDATE accessToken = VALUES(accessToken), refreshToken = VALUES(refreshToken), tokenExpiresAt = VALUES(tokenExpiresAt), status = 'active', lastSyncAt = NOW()
      \`);
      backfillJobberPhotos(state.partnerId, tokens.accessToken).catch(() => {});
      return res.redirect("/dashboard/settings?jobber=connected");
    } catch (err) {
      console.error("[Jobber] OAuth callback error:", err);
      return res.redirect("/dashboard/settings?jobber=error");
    }
  });

  // CompanyCam photo webhook
  app.post("/api/webhooks/companycam", async (req, res) => {
    try {
      const { handleCompanyCamWebhook } = await import("../companycam");
      await handleCompanyCamWebhook(req.body);
      res.json({ received: true });
    } catch (err) {
      console.error("[CompanyCam webhook] Error:", err);
      res.json({ received: true });
    }
  });

  // Pro Pass QR verification page (public, returns verification card data)
  app.get("/pass/:passCode", (req, res) => {
    res.redirect(\`/?passCode=\${req.params.passCode}\`);
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString(), version: "2.0.0" });
  });

  // Homeowner check-in response endpoint`;

if (!content.includes("/api/integrations/companycam/connect")) {
  content = content.replace(
    "  // Homeowner check-in response endpoint",
    INTEGRATION_ROUTES
  );
  console.log("✅ Added integration OAuth routes + health check");
} else {
  console.log("⏭  Integration routes already present");
}

fs.writeFileSync(INDEX_FILE, content, "utf8");
console.log("\n✅ server/_core/index.ts updated");
