import type { Express, Request, Response } from "express";
import * as crypto from "crypto";
import { getDb } from "../db";
import { partners, commissionPayout } from "../../drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { Decimal } from "decimal.js";

const N8N_WEBHOOK_SECRET = process.env.N8N_WEBHOOK_SECRET || "";

function validateWebhookSignature(req: Request): boolean {
  if (!N8N_WEBHOOK_SECRET) {
    console.warn("N8N_WEBHOOK_SECRET not set, skipping signature validation");
    return true;
  }

  const signature = req.headers["x-n8n-signature"] as string;
  const timestamp = req.headers["x-n8n-timestamp"] as string;
  const body = (req as any).rawBody || JSON.stringify(req.body);

  if (!signature || !timestamp) {
    console.error("Missing signature headers");
    return false;
  }

  const hmac = crypto
    .createHmac("sha256", N8N_WEBHOOK_SECRET)
    .update(`${timestamp}.${body}`)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(hmac));
}

export function registerN8nWebhooks(app: Express) {
  // ── Lead Qualified ──────────────────────────────────────────────────────────
  app.post("/api/webhooks/n8n/lead-qualified", async (req: Request, res: Response) => {
    try {
      if (!validateWebhookSignature(req)) {
        console.error("Invalid webhook signature");
        return res.status(401).json({ error: "Invalid signature" });
      }

      const { jobId, proId, homeownerId, estimatedValue, referringPartnerId } = req.body;

      if (!jobId || !proId || !homeownerId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Find or create job payment record for this match
      const dbConn = await getDb();
      if (!dbConn) {
        return res.status(503).json({ error: "Database unavailable" });
      }

      const existingPayment = await (dbConn as any).execute(sql`
        SELECT id FROM jobPayments
        WHERE homeownerId = ${homeownerId} AND receivingPartnerId = ${parseInt(proId)}
        LIMIT 1
      `);

      if (existingPayment?.rows?.[0]) {
        console.log(`[n8n] Job payment already exists for homeowner=${homeownerId}, pro=${proId}`);
        return res.json({ success: true, message: "Lead already matched" });
      }

      // Create new job payment record
      const platformFeeRate = new Decimal("0.12");
      const estimatedValueDecimal = new Decimal(estimatedValue || "0");
      const platformFeeAmount = estimatedValueDecimal.mul(platformFeeRate);

      // For TrustyPro leads, use a placeholder dealId (will be linked to actual deal when homeowner accepts)
      const dealId = 0; // Placeholder for TrustyPro leads

      const result = await (dbConn as any).execute(sql`
        INSERT INTO jobPayments (
          dealId, homeownerId, referringPartnerId, receivingPartnerId,
          totalJobValue, platformFeeRate, platformFeeAmount,
          status, notes, createdAt
        ) VALUES (
          ${dealId}, ${homeownerId}, ${referringPartnerId || parseInt(proId)}, ${parseInt(proId)},
          ${estimatedValueDecimal}, ${platformFeeRate}, ${platformFeeAmount},
          'lead_matched', ${'Matched via n8n — Job value: $' + estimatedValue}, NOW()
        )
      `);

      console.log(`[n8n] Lead qualified: jobId=${jobId}, pro=${proId}, homeowner=${homeownerId}, value=${estimatedValue}`);

      return res.json({
        success: true,
        message: "Lead matched with pro",
        matchedProId: parseInt(proId),
        homeownerId,
        estimatedValue
      });
    } catch (error) {
      console.error("[n8n] Lead webhook error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // ── Notification Sent ───────────────────────────────────────────────────────
  app.post("/api/webhooks/n8n/notification-sent", async (req: Request, res: Response) => {
    try {
      if (!validateWebhookSignature(req)) {
        return res.status(401).json({ error: "Invalid signature" });
      }

      const { notificationType, recipientId, channel, status, metadata } = req.body;

      if (!notificationType || !recipientId) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      console.log(`[n8n] Notification sent: type=${notificationType}, recipient=${recipientId}, channel=${channel}`);

      // TODO: Store in notifications table
      return res.json({ success: true, message: "Notification logged" });
    } catch (error) {
      console.error("[n8n] Notification webhook error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // ── Referral Bonus ──────────────────────────────────────────────────────────
  app.post("/api/webhooks/n8n/referral-bonus", async (req: Request, res: Response) => {
    try {
      if (!validateWebhookSignature(req)) {
        return res.status(401).json({ error: "Invalid signature" });
      }

      const { referrerId, jobValue, jobId } = req.body;

      if (!referrerId || !jobValue) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      try {
        const dbConn = await getDb();
        if (!dbConn) {
          return res.status(503).json({ error: "Database unavailable" });
        }

        const jobValueDecimal = new Decimal(jobValue);
        const bonusRate = new Decimal(0.02); // 2% referral bonus
        const bonusAmount = jobValueDecimal.mul(bonusRate);
        const payoutMonth = new Date().toISOString().slice(0, 7);

        // Insert payout record
        await (dbConn as any).execute(sql`
          INSERT INTO commissionPayout (
            jobCommissionEventId, recipientUserId, sourceProUserId,
            payoutType, rateApplied, amount, status, payoutMonth
          ) VALUES (
            0, ${referrerId.toString()}, ${referrerId.toString()},
            'network_l1', ${bonusRate}, ${bonusAmount}, 'pending', ${payoutMonth}
          )
        `);

        // Get current partner earnings
        const partnerRows = await (dbConn as any).execute(sql`
          SELECT monthlyCommissionEarned FROM partners WHERE id = ${parseInt(referrerId)} LIMIT 1
        `);
        const partner = (partnerRows.rows || partnerRows)[0];

        if (partner) {
          const newEarnings = new Decimal(partner.monthlyCommissionEarned?.toString() || "0").add(bonusAmount);

          // Update partner earnings
          await (dbConn as any).execute(sql`
            UPDATE partners SET monthlyCommissionEarned = ${newEarnings}
            WHERE id = ${parseInt(referrerId)}
          `);
        }

        console.log(
          `[n8n] Referral bonus: referrer=${referrerId}, bonus=${bonusAmount.toString()}`
        );

        // TODO: Send email notification to referrer
        return res.json({
          success: true,
          message: "Bonus credited",
          amount: bonusAmount.toNumber(),
        });
      } catch (error) {
        console.error("[n8n] Failed to process referral bonus:", error);
        return res.status(500).json({ error: "Failed to process bonus" });
      }
    } catch (error) {
      console.error("[n8n] Referral webhook error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
}
