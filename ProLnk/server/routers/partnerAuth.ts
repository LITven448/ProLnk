/**
 * Partner Auth Router — email/password login for partners
 * No Manus OAuth required. Partners sign up and log in with email/password.
 * Uses the same JWT session cookie as the rest of the app (COOKIE_NAME).
 * Partner openIds are prefixed with "partner_" to distinguish from Manus OAuth users.
 *
 * IMPORTANT: Drizzle mysql2 db.execute() returns [rows[], fields[]] — so:
 *   const [rows] = await db.execute(sql`SELECT ...`);
 *   const row = (rows as any[])[0];  // first row or undefined
 */
import { z } from "zod";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sql } from "drizzle-orm";
import { router, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { sdk } from "../_core/sdk";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getSessionCookieOptions } from "../_core/cookies";
import { TRPCError } from "@trpc/server";
import { sendPartnerPasswordReset } from "../email";
import { getPartnerConsent, recordPartnerConsent, revokePartnerConsent } from "../photoSecurity";

function makeOpenId(email: string) {
  return `partner_${email.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
}

/** Extract first row from Drizzle mysql2 db.execute() result */
function firstRow(result: unknown): Record<string, unknown> | undefined {
  // Drizzle mysql2 returns [rows[], fields[]] — result[0] is the rows array
  const rows = (result as any)[0];
  if (Array.isArray(rows)) return rows[0] as Record<string, unknown> | undefined;
  // Fallback for other drivers
  if ((result as any).rows) return (result as any).rows[0];
  return undefined;
}

export const partnerAuthRouter = router({
  // --- Login with email + password ---
  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const result = await db.execute(sql`
        SELECT id, businessName, contactName, contactEmail, passwordHash, status, tier,
               suspendedAt, strikeCount
        FROM partners WHERE contactEmail = ${input.email} LIMIT 1
      `);
      const partner = firstRow(result);

      if (!partner || !partner.passwordHash) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
      }

      const valid = await bcrypt.compare(input.password, partner.passwordHash as string);
      if (!valid) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
      }

      if (partner.suspendedAt) {
        throw new TRPCError({ code: "FORBIDDEN", message: "This account has been suspended. Please contact support." });
      }

      // Update last active (fire-and-forget)
      db.execute(sql`UPDATE partners SET lastActiveAt = NOW() WHERE id = ${partner.id}`).catch(() => {});

      const openId = makeOpenId(input.email);
      // Upsert local user record (fire-and-forget)
      db.execute(sql`
        INSERT INTO users (openId, name, email, loginMethod, lastSignedIn)
        VALUES (${openId}, ${(partner.contactName ?? partner.businessName) as string}, ${input.email}, 'partner_password', NOW())
        ON DUPLICATE KEY UPDATE name = VALUES(name), lastSignedIn = NOW()
      `).catch(e => console.warn('[partnerAuth] user upsert failed (non-fatal):', e));

      const sessionToken = await sdk.createSessionToken(openId, {
        name: (partner.contactName ?? partner.businessName) as string,
        expiresInMs: ONE_YEAR_MS,
      });
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      return {
        success: true as const,
        partner: {
          id: partner.id,
          businessName: partner.businessName,
          email: partner.contactEmail,
          status: partner.status,
          tier: partner.tier,
        },
      };
    }),

  // --- Register a new partner account (from onboarding wizard) ---
  register: publicProcedure
    .input(z.object({
      businessName: z.string().min(2).max(255),
      businessType: z.string().min(2).max(100),
      contactName: z.string().min(2).max(255),
      contactEmail: z.string().email(),
      contactPhone: z.string().optional(),
      password: z.string().min(8),
      serviceArea: z.string().default("DFW"),
      serviceZipCodes: z.array(z.string()).default([]),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Check for existing partner with this email
      const existingResult = await db.execute(sql`
        SELECT id FROM partners WHERE contactEmail = ${input.contactEmail} LIMIT 1
      `);
      const existingRow = firstRow(existingResult);
      if (existingRow) {
        throw new TRPCError({ code: "CONFLICT", message: "An account with this email already exists" });
      }

      const passwordHash = await bcrypt.hash(input.password, 10);
      const openId = makeOpenId(input.contactEmail);

      // Upsert local user record (fire-and-forget)
      db.execute(sql`
        INSERT INTO users (openId, name, email, loginMethod, lastSignedIn)
        VALUES (${openId}, ${input.contactName}, ${input.contactEmail}, 'partner_password', NOW())
        ON DUPLICATE KEY UPDATE name = VALUES(name), lastSignedIn = NOW()
      `).catch(e => console.warn('[partnerAuth] user upsert failed (non-fatal):', e));

      // Get the user id (may be null if user insert hasn't completed yet — that's ok)
      const userResult = await db.execute(sql`SELECT id FROM users WHERE openId = ${openId} LIMIT 1`);
      const user = firstRow(userResult);

      await db.execute(sql`
        INSERT INTO partners (
          userId, businessName, businessType, contactName, contactEmail, contactPhone,
          serviceArea, serviceZipCodes, maxZipCodes, passwordHash,
          status, tier, commissionRate, platformFeeRate, referralCommissionRate,
          weeklyLeadCap, appliedAt, updatedAt
        ) VALUES (
          ${user?.id ?? null},
          ${input.businessName}, ${input.businessType}, ${input.contactName},
          ${input.contactEmail}, ${input.contactPhone ?? null},
          ${input.serviceArea},
          ${JSON.stringify(input.serviceZipCodes)},
          5,
          ${passwordHash},
          'pending', 'scout', 0.4000, 0.1200, 0.0480, 5,
          NOW(), NOW()
        )
      `);

      // Issue session token
      const sessionToken = await sdk.createSessionToken(openId, {
        name: input.contactName,
        expiresInMs: ONE_YEAR_MS,
      });
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      return { success: true as const };
    }),

  // --- Set/reset password (for waitlist activation via magic link) ---
  setPassword: publicProcedure
    .input(z.object({
      token: z.string(),
      password: z.string().min(8),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const rows = await db.execute(sql`
        SELECT id, contactName, contactEmail FROM partners
        WHERE passwordResetToken = ${input.token}
        AND passwordResetExpiresAt > NOW()
        LIMIT 1
      `);
      const partner = firstRow(rows);
      if (!partner) throw new TRPCError({ code: "NOT_FOUND", message: "Invalid or expired activation link" });

      const passwordHash = await bcrypt.hash(input.password, 10);
      await db.execute(sql`
        UPDATE partners
        SET passwordHash = ${passwordHash},
            passwordResetToken = NULL,
            passwordResetExpiresAt = NULL,
            status = 'approved'
        WHERE id = ${partner.id}
      `);

      const openId = makeOpenId(partner.contactEmail as string);
      db.execute(sql`
        INSERT INTO users (openId, name, email, loginMethod, lastSignedIn)
        VALUES (${openId}, ${partner.contactName as string}, ${partner.contactEmail as string}, 'partner_password', NOW())
        ON DUPLICATE KEY UPDATE name = VALUES(name), lastSignedIn = NOW()
      `).catch(e => console.warn('[partnerAuth] user upsert failed (non-fatal):', e));

      const sessionToken = await sdk.createSessionToken(openId, {
        name: partner.contactName as string,
        expiresInMs: ONE_YEAR_MS,
      });
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      return { success: true as const };
    }),

  // --- Request password reset (forgot password) ---
  requestPasswordReset: publicProcedure
    .input(z.object({
      email: z.string().email(),
      origin: z.string().url(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { sent: true }; // silent fail
      const result = await db.execute(sql`
        SELECT id, contactName, contactEmail FROM partners
        WHERE contactEmail = ${input.email} AND status = 'approved'
        LIMIT 1
      `);
      const partner = firstRow(result);
      // Always return success to prevent email enumeration
      if (!partner) return { sent: true };
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
      await db.execute(sql`
        UPDATE partners
        SET passwordResetToken = ${token},
            passwordResetExpiresAt = ${expiresAt}
        WHERE id = ${partner.id as number}
      `);
      const resetUrl = `${input.origin}/set-password?token=${token}&mode=reset`;
      await sendPartnerPasswordReset({
        to: partner.contactEmail as string,
        partnerName: (partner.contactName as string) || 'Partner',
        resetUrl,
      });
      return { sent: true };
    }),

  // --- Photo Consent Management ---
  getPhotoConsent: publicProcedure
    .input(z.object({ partnerId: z.number() }))
    .query(async ({ input }) => {
      const consent = await getPartnerConsent(input.partnerId);
      return { hasConsent: !!consent, consent: consent ?? null };
    }),

  grantPhotoConsent: publicProcedure
    .input(z.object({
      partnerId: z.number(),
      consentPhotoStorage: z.boolean().default(true),
      consentAiAnalysis: z.boolean().default(true),
      consentLeadRouting: z.boolean().default(true),
    }))
    .mutation(async ({ input, ctx }) => {
      const success = await recordPartnerConsent(input.partnerId, {
        consentVersion: "1.0",
        ipAddress: (ctx.req?.headers?.["x-forwarded-for"] as string)?.split(",")[0]?.trim() || ctx.req?.socket?.remoteAddress || undefined,
        userAgent: ctx.req?.headers?.["user-agent"] || undefined,
        consentPhotoStorage: input.consentPhotoStorage,
        consentAiAnalysis: input.consentAiAnalysis,
        consentLeadRouting: input.consentLeadRouting,
      });
      return { success };
    }),

  revokePhotoConsent: publicProcedure
    .input(z.object({ partnerId: z.number() }))
    .mutation(async ({ input }) => {
      const success = await revokePartnerConsent(input.partnerId);
      return { success };
    }),
});
