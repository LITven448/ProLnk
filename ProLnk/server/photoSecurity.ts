/**
 * ProLnk Photo Security Pipeline
 * ================================
 * Implements the security requirements from the
 * ProLnk Photo Security & Privacy Architecture document (Apr 2026).
 *
 * PRIVACY MODEL (CORRECTED):
 * ─────────────────────────────────────────────────────────────────────────────
 * • Service professionals (partners) UPLOAD photos after completing a job.
 *   After upload, they have NO retrieval access to those photos.
 *   The photo is handed off to the AI pipeline immediately.
 *
 * • Homeowners OWN their photos. They can view their own home's photos,
 *   AI analysis results, and improvement mockups in their TrustyPro dashboard.
 *
 * • Admins have full access for compliance and audit purposes.
 *
 * • The AI pipeline processes photos for analysis and mockup generation.
 *   Raw photos are never retained after the pipeline completes.
 *
 * • High-value item "masking" is NOT implemented — it is architecturally
 *   unnecessary because partners never see photos after upload. The AI
 *   mockup pipeline needs the full room context (including art, furniture,
 *   etc.) to generate accurate improvement previews. Privacy is enforced
 *   by the zero-access model, not by obscuring content.
 *
 * IMPLEMENTED:
 * 1. Automated EXIF Metadata Stripping — GPS, device ID, timestamps removed server-side
 * 2. Zero-Retention AI Processing — raw photos never stored post-analysis (enforced in AI pipeline)
 * 3. Role-Based Access Controls — homeowners own their photos; partners upload-only; all access logged
 * 4. Photo Access Audit Logging — every upload and access event is recorded
 * 5. Explicit Consent & Opt-In — one-time consent captured at onboarding, checked before upload
 */

import sharp from "sharp";
import { getDb } from "./db";
import { photoAccessLog, partnerPhotoConsent } from "../drizzle/schema";
import { sql } from "drizzle-orm";

// ── 1. EXIF Metadata Stripping ────────────────────────────────────────────────

/**
 * Strips ALL EXIF metadata from an image buffer (GPS coordinates, device ID,
 * timestamps, camera model, etc.) using sharp's withMetadata(false) default.
 *
 * Returns the sanitized buffer and the detected MIME type.
 * Falls back to the original buffer on error (never blocks upload).
 */
export async function stripExifMetadata(
  buffer: Buffer,
  mimeType: string
): Promise<{ buffer: Buffer<ArrayBuffer>; mimeType: string; stripped: boolean }> {
  try {
    const instance = sharp(buffer);
    let sanitized: Buffer<ArrayBuffer>;
    let outMime = mimeType;

    // sharp strips EXIF by default when re-encoding.
    // We force JPEG for unknown types to ensure stripping.
    if (mimeType === "image/png") {
      sanitized = Buffer.from(await instance.png({ compressionLevel: 6 }).toBuffer());
    } else if (mimeType === "image/webp") {
      sanitized = Buffer.from(await instance.webp({ quality: 85 }).toBuffer());
    } else {
      // Default to JPEG — covers image/jpeg, image/jpg, and unknowns
      sanitized = Buffer.from(await instance.jpeg({ quality: 85, progressive: true }).toBuffer());
      outMime = "image/jpeg";
    }

    const reduction = buffer.length - sanitized.length;
    console.log(
      `[PhotoSecurity] EXIF stripped — original: ${buffer.length}B, sanitized: ${sanitized.length}B, reduction: ${reduction}B`
    );

    return { buffer: sanitized, mimeType: outMime, stripped: true };
  } catch (err) {
    console.error("[PhotoSecurity] EXIF stripping failed, using original:", err);
    return { buffer: Buffer.from(buffer) as Buffer<ArrayBuffer>, mimeType, stripped: false };
  }
}

// ── 2. Photo Access Audit Logging ─────────────────────────────────────────────

export interface PhotoAccessContext {
  photoUrl: string;
  jobId?: number;
  accessedByPartnerId?: number;
  accessedByUserId?: number;
  /** "partner" = upload event; "homeowner" = homeowner viewing their own photos; "admin" = admin access; "ai_pipeline" = AI processing */
  accessedByRole: "partner" | "homeowner" | "admin" | "system" | "ai_pipeline";
  accessType: "view" | "download" | "ai_analysis" | "upload";
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Logs every photo access event to the audit table.
 * Non-blocking — errors are caught and logged but never thrown.
 */
export async function logPhotoAccess(ctx: PhotoAccessContext): Promise<void> {
  try {
    const db = await getDb();
    if (!db) return;
    await (db as any).insert(photoAccessLog).values({
      photoUrl: ctx.photoUrl,
      jobId: ctx.jobId ?? null,
      accessedByPartnerId: ctx.accessedByPartnerId ?? null,
      accessedByUserId: ctx.accessedByUserId ?? null,
      accessedByRole: ctx.accessedByRole,
      accessType: ctx.accessType,
      ipAddress: ctx.ipAddress ?? null,
      userAgent: ctx.userAgent ? ctx.userAgent.slice(0, 512) : null,
    });
  } catch (err) {
    console.error("[PhotoSecurity] Failed to log photo access:", err);
  }
}

// ── 3. RBAC — Homeowner Photo Access Validation ───────────────────────────────

/**
 * Validates that a homeowner is allowed to view photos for a specific job.
 *
 * ACCESS MODEL:
 * • Homeowners may view photos from jobs at THEIR address only.
 * • Partners (service professionals) have NO retrieval access — they upload only.
 * • Admins bypass this check entirely (handled at the procedure level).
 *
 * Returns true if access is permitted, false otherwise.
 */
export async function validateHomeownerPhotoAccess(
  homeownerEmail: string,
  jobId: number
): Promise<boolean> {
  try {
    const db = await getDb();
    if (!db) return false;
    // A homeowner can view photos from a job if their email matches the homeowner
    // email recorded on that job, or if they have a TrustyPro account linked to that address.
    const rows = await (db as any).execute(
      sql`SELECT j.id FROM jobs j
          WHERE j.id = ${jobId}
            AND j.homeownerEmail = ${homeownerEmail}
          LIMIT 1`
    );
    const row = (rows.rows || rows)[0];
    return !!row;
  } catch {
    return false;
  }
}

// ── 4. Photo Consent Management ───────────────────────────────────────────────

/**
 * Checks if a partner has given explicit consent for photo collection and AI analysis.
 *
 * CONSENT MODEL:
 * • Consent is captured ONCE during partner onboarding (Step 4 of OnboardingWizard).
 * • It is never asked again unless the partner explicitly revokes it.
 * • The upload endpoint uses this as a safety-net check only — partners who completed
 *   onboarding will always have consent already recorded.
 *
 * Returns the consent record or null if no consent exists.
 */
export async function getPartnerConsent(partnerId: number) {
  try {
    const db = await getDb();
    if (!db) return null;
    const rows = await (db as any).execute(
      sql`SELECT * FROM partnerPhotoConsent WHERE partnerId = ${partnerId} AND revokedAt IS NULL LIMIT 1`
    );
    const row = (rows.rows || rows)[0];
    return row ?? null;
  } catch {
    return null;
  }
}

/**
 * Records explicit photo consent for a partner.
 * Upserts — if consent already exists, updates the timestamp and version.
 * Called during onboarding completion (not during individual uploads).
 */
export async function recordPartnerConsent(
  partnerId: number,
  opts: {
    ipAddress?: string;
    userAgent?: string;
    consentVersion?: string;
    consentPhotoStorage?: boolean;
    consentAiAnalysis?: boolean;
    consentLeadRouting?: boolean;
  }
): Promise<boolean> {
  try {
    const db = await getDb();
    if (!db) return false;
    await (db as any).execute(
      sql`INSERT INTO partnerPhotoConsent 
        (partnerId, consentVersion, ipAddress, userAgent, consentPhotoStorage, consentAiAnalysis, consentLeadRouting, revokedAt)
        VALUES (
          ${partnerId},
          ${opts.consentVersion ?? "1.0"},
          ${opts.ipAddress ?? null},
          ${opts.userAgent ? opts.userAgent.slice(0, 512) : null},
          ${opts.consentPhotoStorage !== false ? 1 : 0},
          ${opts.consentAiAnalysis !== false ? 1 : 0},
          ${opts.consentLeadRouting !== false ? 1 : 0},
          NULL
        )
        ON DUPLICATE KEY UPDATE
          consentedAt = NOW(),
          consentVersion = VALUES(consentVersion),
          ipAddress = VALUES(ipAddress),
          revokedAt = NULL`
    );
    return true;
  } catch (err) {
    console.error("[PhotoSecurity] Failed to record consent:", err);
    return false;
  }
}

/**
 * Revokes photo consent for a partner (CCPA/GDPR right to withdraw).
 * Note: Revoking consent disables future photo uploads for this partner.
 */
export async function revokePartnerConsent(partnerId: number): Promise<boolean> {
  try {
    const db = await getDb();
    if (!db) return false;
    await (db as any).execute(
      sql`UPDATE partnerPhotoConsent SET revokedAt = NOW() WHERE partnerId = ${partnerId}`
    );
    return true;
  } catch {
    return false;
  }
}
