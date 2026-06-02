/**
 * Proactive Outreach Engine — ProLnk / TrustyPro's signature moat.
 *
 * After AI photo intelligence (server/photo-intelligence.ts) analyzes a pro's job
 * photos or a homeowner scan, this engine decides whether any finding is worth
 * proactively reaching the homeowner about — "we noticed something at your home,
 * here's what it could look like fixed, want a quote?" — and, on the homeowner's
 * one-click opt-in, converts it into a real `opportunity` that flows into the
 * existing matching/offer system. Nobody else in home services does this.
 *
 * Design constraints (hard requirements):
 *   - Fully ADDITIVE + DEFENSIVE: the whole chain must no-op gracefully without an
 *     OpenAI/Resend key or a homeowner contact, and must NEVER throw into the
 *     photo-analysis flow that triggers it.
 *   - No re-spam: each (session, finding-fingerprint) is sent at most once. Tracked
 *     in a lightweight self-healing `proactiveOutreach` table.
 *   - "Nothing found" is a feature, not a no-op silence internally: we record a
 *     positive baseline touchpoint ("your home looks great") so the Home Health
 *     Vault has a timestamp + score, but we do NOT email the homeowner about it.
 */

import crypto from "crypto";
import type { Detection, PhotoScanResult } from "./photo-intelligence";

async function getDb() {
  const { getDb: gd } = await import("./db");
  return gd();
}

// ── Self-healing table for outreach tracking ────────────────────────────────────
let tableEnsured = false;
async function ensureOutreachTable(): Promise<void> {
  if (tableEnsured) return;
  const db = await getDb();
  if (!db) return;
  try {
    await (db as any).execute(`
      CREATE TABLE IF NOT EXISTS \`proactiveOutreach\` (
        \`id\` int AUTO_INCREMENT NOT NULL,
        \`sessionId\` int NULL,
        \`findingFingerprint\` varchar(64) NOT NULL,
        \`outcome\` varchar(30) NOT NULL DEFAULT 'sent',
        \`trade\` varchar(100) NULL,
        \`severity\` varchar(20) NULL,
        \`category\` varchar(100) NULL,
        \`estimatedCostRange\` varchar(60) NULL,
        \`propertyAddress\` varchar(500) NULL,
        \`homeownerEmail\` varchar(320) NULL,
        \`homeownerName\` varchar(255) NULL,
        \`renderingUrl\` text NULL,
        \`beforePhotoUrl\` text NULL,
        \`payload\` text NULL,
        \`emailSent\` tinyint NOT NULL DEFAULT 0,
        \`opportunityId\` int NULL,
        \`acceptedAt\` timestamp NULL,
        \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT \`proactiveOutreach_id\` PRIMARY KEY(\`id\`),
        UNIQUE KEY \`proactiveOutreach_fp\` (\`findingFingerprint\`)
      )
    `);
    tableEnsured = true;
  } catch {
    // Table already exists (or DDL not permitted) — treat as ensured.
    tableEnsured = true;
  }
}

// ── Actionability ────────────────────────────────────────────────────────────
// We only proactively reach out for real repair/improvement opportunities, not
// cosmetic noise. "low" severity is cosmetic; we want medium+ with reasonable
// confidence so we don't cry wolf and erode trust in the moat.
const ACTIONABLE_SEVERITIES = new Set(["medium", "high", "urgent"]);
const MIN_CONFIDENCE = 0.55;

export function isActionableFinding(d: Detection): boolean {
  if (!d || typeof d !== "object") return false;
  if (!ACTIONABLE_SEVERITIES.has(d.severity)) return false;
  if (typeof d.confidence === "number" && d.confidence < MIN_CONFIDENCE) return false;
  return true;
}

const SEVERITY_RANK: Record<string, number> = { urgent: 4, high: 3, medium: 2, low: 1 };

export function pickPrimaryFinding(findings: Detection[]): Detection | null {
  const actionable = findings.filter(isActionableFinding);
  if (actionable.length === 0) return null;
  return [...actionable].sort((a, b) => {
    const s = (SEVERITY_RANK[b.severity] ?? 0) - (SEVERITY_RANK[a.severity] ?? 0);
    if (s !== 0) return s;
    return (b.confidence ?? 0) - (a.confidence ?? 0);
  })[0];
}

// Stable fingerprint so the same finding on the same property is never re-sent.
export function findingFingerprint(opts: {
  sessionId?: number | null;
  propertyAddress?: string | null;
  homeownerEmail?: string | null;
  category: string;
}): string {
  const key = [
    opts.sessionId != null ? `s:${opts.sessionId}` : "",
    opts.propertyAddress ? `a:${opts.propertyAddress.trim().toLowerCase()}` : "",
    opts.homeownerEmail ? `e:${opts.homeownerEmail.trim().toLowerCase()}` : "",
    `c:${opts.category}`,
  ].join("|");
  return crypto.createHash("sha256").update(key).digest("hex").slice(0, 64);
}

const TRADE_TO_CATEGORY: Record<string, string> = {
  Roofing: "Roofing & Gutters",
  HVAC: "HVAC",
  Plumbing: "Plumbing",
  Electrical: "Electrical",
  Landscaping: "Landscaping",
  Painting: "Painting",
  "Windows & Doors": "Windows & Doors",
  "Pest Control": "Pest Control",
  Flooring: "Flooring",
  Structural: "Structural",
  "General Contractor": "General Contractor",
};

function humanHeadline(d: Detection): string {
  const label = d.category
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const prefix = d.severity === "urgent" ? "Urgent: " : d.severity === "high" ? "Worth addressing soon: " : "";
  return `${prefix}${label}`;
}

export interface OutreachPayload {
  fingerprint: string;
  trade: string;
  category: string;
  severity: string;
  headline: string;
  description: string;
  estimatedCostRange?: string;
  renderingUrl?: string | null;
  beforePhotoUrl?: string | null;
}

export interface ProcessAnalyzedPhotosInput {
  sessionId?: number | null;
  photoFindings?: Detection[];
  propertyAddress?: string | null;
  homeownerEmail?: string | null;
  homeownerName?: string | null;
  beforePhotoUrl?: string | null;
  /** Skip the (slow, paid) image rendering — used in tests / when rendering unavailable. */
  skipRendering?: boolean;
}

export interface ProcessAnalyzedPhotosResult {
  outreach: boolean;
  reason?: string;
  fingerprint?: string;
  emailSent?: boolean;
  payload?: OutreachPayload;
}

// Pull findings off a session's stored sessionPhotos.findings (PhotoScanResult JSON).
async function loadSessionFindings(sessionId: number): Promise<{
  findings: Detection[];
  propertyAddress: string | null;
  homeownerEmail: string | null;
  homeownerName: string | null;
  beforePhotoUrl: string | null;
}> {
  const db = await getDb();
  const empty = { findings: [] as Detection[], propertyAddress: null, homeownerEmail: null, homeownerName: null, beforePhotoUrl: null };
  if (!db) return empty;

  const { sessionPhotos, photoSessions, users } = await import("../drizzle/schema");
  const { eq } = await import("drizzle-orm");

  const [session] = await db.select().from(photoSessions).where(eq(photoSessions.id, sessionId)).limit(1);
  if (!session) return empty;

  const photos = await db.select().from(sessionPhotos).where(eq(sessionPhotos.sessionId, sessionId));
  const findings: Detection[] = [];
  let beforePhotoUrl: string | null = null;
  for (const p of photos) {
    if (!beforePhotoUrl && p.photoUrl) beforePhotoUrl = p.photoUrl;
    if (!p.findings) continue;
    try {
      const parsed = JSON.parse(p.findings) as PhotoScanResult | Detection[];
      const dets = Array.isArray(parsed) ? parsed : parsed.detections ?? [];
      for (const d of dets) findings.push(d);
    } catch {
      // malformed findings JSON — skip this photo defensively.
    }
  }

  let homeownerEmail: string | null = null;
  let homeownerName: string | null = null;
  if (session.userId) {
    try {
      const [u] = await db.select().from(users).where(eq(users.id, session.userId)).limit(1);
      if (u) {
        homeownerEmail = (u as any).email ?? null;
        homeownerName = (u as any).name ?? null;
      }
    } catch {
      // user lookup failed — outreach can still record a baseline, just no email.
    }
  }

  return {
    findings,
    propertyAddress: (session as any).roomAreaCustom ?? null,
    homeownerEmail,
    homeownerName,
    beforePhotoUrl,
  };
}

// Best-effort "what it could look like fixed" rendering. Defensive: any failure
// (no key, API error) returns null and outreach proceeds with text only.
async function tryRenderImproved(d: Detection, beforePhotoUrl: string | null): Promise<string | null> {
  if (!process.env.OPENAI_API_KEY) return null;
  try {
    const { generateImage } = await import("./_core/imageGeneration");
    const subject = d.category.replace(/_/g, " ");
    const prompt = `Photorealistic before/after style render showing the same home with the "${subject}" issue professionally repaired and restored to excellent condition. Keep the same structure, angle, and surroundings; show a clean, well-maintained, high-quality finished result.`;
    const { url } = await generateImage({
      prompt,
      originalImages: beforePhotoUrl ? [{ url: beforePhotoUrl, mimeType: "image/jpeg" }] : undefined,
      size: "1024x1024",
    });
    return url ?? null;
  } catch (err) {
    console.warn("[ProactiveOutreach] rendering skipped:", (err as any)?.message ?? err);
    return null;
  }
}

async function recordBaseline(opts: {
  sessionId?: number | null;
  propertyAddress?: string | null;
  homeownerEmail?: string | null;
  homeownerName?: string | null;
}): Promise<void> {
  await ensureOutreachTable();
  const db = await getDb();
  if (!db) return;
  const fp = findingFingerprint({
    sessionId: opts.sessionId,
    propertyAddress: opts.propertyAddress,
    homeownerEmail: opts.homeownerEmail,
    category: "__baseline__",
  });
  try {
    await (db as any).execute(
      `INSERT IGNORE INTO proactiveOutreach
         (sessionId, findingFingerprint, outcome, propertyAddress, homeownerEmail, homeownerName, emailSent)
       VALUES (?, ?, 'baseline_clean', ?, ?, ?, 0)`,
      [
        opts.sessionId ?? null,
        fp,
        opts.propertyAddress ?? null,
        opts.homeownerEmail ?? null,
        opts.homeownerName ?? null,
      ]
    );
  } catch {
    // tracking write failed — non-fatal.
  }
}

export async function processAnalyzedPhotos(
  input: ProcessAnalyzedPhotosInput
): Promise<ProcessAnalyzedPhotosResult> {
  try {
    await ensureOutreachTable();

    let findings = input.photoFindings ?? [];
    let propertyAddress = input.propertyAddress ?? null;
    let homeownerEmail = input.homeownerEmail ?? null;
    let homeownerName = input.homeownerName ?? null;
    let beforePhotoUrl = input.beforePhotoUrl ?? null;

    if ((!findings || findings.length === 0) && input.sessionId != null) {
      const loaded = await loadSessionFindings(input.sessionId);
      findings = loaded.findings;
      propertyAddress = propertyAddress ?? loaded.propertyAddress;
      homeownerEmail = homeownerEmail ?? loaded.homeownerEmail;
      homeownerName = homeownerName ?? loaded.homeownerName;
      beforePhotoUrl = beforePhotoUrl ?? loaded.beforePhotoUrl;
    }

    const primary = pickPrimaryFinding(findings ?? []);

    // ── No actionable findings → positive baseline touchpoint, no email/spam. ──
    if (!primary) {
      await recordBaseline({ sessionId: input.sessionId, propertyAddress, homeownerEmail, homeownerName });
      return { outreach: false, reason: "no_actionable_findings" };
    }

    const category = TRADE_TO_CATEGORY[primary.trade] ?? primary.trade ?? primary.category;
    const fingerprint = findingFingerprint({
      sessionId: input.sessionId,
      propertyAddress,
      homeownerEmail,
      category: primary.category,
    });

    // ── No re-spam: bail if this exact finding was already actioned. ──
    const db = await getDb();
    if (db) {
      try {
        const existing = (await (db as any).execute(
          `SELECT id FROM proactiveOutreach WHERE findingFingerprint = ? LIMIT 1`,
          [fingerprint]
        )) as any;
        const rows = existing?.rows ?? existing?.[0] ?? existing;
        if (Array.isArray(rows) && rows.length > 0) {
          return { outreach: false, reason: "already_sent", fingerprint };
        }
      } catch {
        // dedup read failed — fall through; UNIQUE key still protects against dupes.
      }
    }

    const renderingUrl = input.skipRendering ? null : await tryRenderImproved(primary, beforePhotoUrl);

    const payload: OutreachPayload = {
      fingerprint,
      trade: primary.trade || category,
      category,
      severity: primary.severity,
      headline: humanHeadline(primary),
      description: primary.description,
      estimatedCostRange: primary.estimatedJobValue || undefined,
      renderingUrl,
      beforePhotoUrl,
    };

    // ── Record the outreach FIRST (sent-marker) so a duplicate trigger racing us
    // hits the UNIQUE key and stops. emailSent flips below once delivery is attempted. ──
    if (db) {
      try {
        await (db as any).execute(
          `INSERT IGNORE INTO proactiveOutreach
             (sessionId, findingFingerprint, outcome, trade, severity, category,
              estimatedCostRange, propertyAddress, homeownerEmail, homeownerName,
              renderingUrl, beforePhotoUrl, payload, emailSent)
           VALUES (?, ?, 'sent', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
          [
            input.sessionId ?? null,
            fingerprint,
            payload.trade,
            payload.severity,
            payload.category,
            payload.estimatedCostRange ?? null,
            propertyAddress ?? null,
            homeownerEmail ?? null,
            homeownerName ?? null,
            renderingUrl ?? null,
            beforePhotoUrl ?? null,
            JSON.stringify(payload),
          ]
        );
      } catch {
        // tracking write failed — proceed to email anyway (best-effort outreach).
      }
    }

    // ── Send the homeowner the "we noticed something" email (defensive). ──
    let emailSent = false;
    if (homeownerEmail) {
      const { sendProactiveOpportunityNotification } = await import("./email");
      const baseUrl = process.env.APP_BASE_URL ?? "https://trustypro.io";
      const acceptUrl = `${baseUrl.replace(/\/$/, "")}/proactive/accept/${fingerprint}`;
      emailSent = await sendProactiveOpportunityNotification({
        homeownerEmail,
        homeownerName: homeownerName ?? undefined,
        propertyAddress: propertyAddress ?? undefined,
        trade: payload.trade,
        headline: payload.headline,
        description: payload.description,
        estimatedCostRange: payload.estimatedCostRange,
        renderingUrl: payload.renderingUrl,
        beforePhotoUrl: payload.beforePhotoUrl,
        acceptUrl,
      }).catch((e) => {
        console.warn("[ProactiveOutreach] email send failed:", (e as any)?.message ?? e);
        return false;
      });
      if (emailSent && db) {
        await (db as any)
          .execute(`UPDATE proactiveOutreach SET emailSent = 1 WHERE findingFingerprint = ?`, [fingerprint])
          .catch(() => {});
      }
    }

    return { outreach: true, fingerprint, emailSent, payload };
  } catch (err) {
    // Absolute backstop — proactive outreach must NEVER break the analysis flow.
    console.error("[ProactiveOutreach] processAnalyzedPhotos failed (suppressed):", (err as any)?.message ?? err);
    return { outreach: false, reason: "error" };
  }
}

// ── Conversion: homeowner opt-in → real opportunity → matching system. ──────────
export interface AcceptProactiveQuoteResult {
  opportunityId: number | null;
  alreadyAccepted: boolean;
  trade: string | null;
}

export async function acceptProactiveQuote(fingerprint: string): Promise<AcceptProactiveQuoteResult> {
  await ensureOutreachTable();
  const db = await getDb();
  if (!db) throw new Error("Database unavailable");

  const res = (await (db as any).execute(
    `SELECT id, opportunityId, trade, category, severity, estimatedCostRange,
            propertyAddress, homeownerEmail, homeownerName, acceptedAt
     FROM proactiveOutreach WHERE findingFingerprint = ? LIMIT 1`,
    [fingerprint]
  )) as any;
  const rows = res?.rows ?? res?.[0] ?? res;
  const row = Array.isArray(rows) ? rows[0] : null;
  if (!row) throw new Error("Outreach not found");

  // Idempotent: if already converted, return the existing opportunity.
  if (row.opportunityId) {
    return { opportunityId: Number(row.opportunityId), alreadyAccepted: true, trade: row.trade ?? null };
  }

  const { ensureJobOffersInfra } = await import("./routers/matching");
  await ensureJobOffersInfra();

  const category = row.category || row.trade || "Home Service";
  const description = `AI-detected ${String(category).replace(/_/g, " ")} opportunity${
    row.estimatedCostRange ? ` (est. ${row.estimatedCostRange})` : ""
  }. Homeowner opted in via proactive outreach.`;
  const estimatedValue = parseCostMidpoint(row.estimatedCostRange);

  const insertRes = (await (db as any).execute(
    `INSERT INTO opportunities
       (intakeSource, opportunityType, opportunityCategory, description,
        jobAddress, estimatedJobValue,
        homeownerName, homeownerEmail,
        adminReviewStatus, status, routingPosition)
     VALUES ('proactive', ?, ?, ?, ?, ?, ?, ?, 'pending_review', 'new', 0)`,
    [
      category,
      category,
      description,
      row.propertyAddress ?? null,
      estimatedValue != null ? String(estimatedValue) : null,
      row.homeownerName ?? null,
      row.homeownerEmail ?? null,
    ]
  )) as any;
  const opportunityId = Number(insertRes?.[0]?.insertId ?? insertRes?.insertId ?? 0) || null;

  if (opportunityId) {
    await (db as any)
      .execute(
        `UPDATE proactiveOutreach SET opportunityId = ?, outcome = 'accepted', acceptedAt = CURRENT_TIMESTAMP WHERE findingFingerprint = ?`,
        [opportunityId, fingerprint]
      )
      .catch(() => {});
    try {
      const { notifyOwner } = await import("./_core/notification");
      await notifyOwner({
        title: "Proactive AI Lead Converted",
        content: `Homeowner opted into a ${category} quote from AI outreach. Review in Lead Dispatch Portal.`,
      });
    } catch {
      // notification best-effort.
    }
  }

  return { opportunityId, alreadyAccepted: false, trade: row.trade ?? null };
}

function parseCostMidpoint(range?: string | null): number | null {
  if (!range) return null;
  const nums = range.replace(/,/g, "").match(/\d+/g);
  if (!nums || nums.length === 0) return null;
  const vals = nums.map(Number).filter((n) => !Number.isNaN(n));
  if (vals.length === 0) return null;
  if (vals.length === 1) return vals[0];
  return Math.round((vals[0] + vals[vals.length - 1]) / 2);
}
