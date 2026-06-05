/**
 * Homeowner Auth Router — email/password login for homeowners (customers).
 *
 * Mirrors partnerAuth.ts patterns (bcrypt, JWT session via sdk.createSessionToken,
 * COOKIE_NAME, getSessionCookieOptions) but is fully independent — it never touches
 * the `partners` table or the partner login flow.
 *
 * Password storage: the app stores email/password hashes in the dedicated
 * `userPasswords` table keyed by `openId` (see server/_core/oauth.ts). We reuse that
 * exact mechanism — NOT a column on `users`/`homeownerProfiles`.
 *
 * User id assignment: `users.id` is declared as a bare primaryKey in the Drizzle
 * schema (no $autoincrement), but the live table assigns ids on plain INSERTs — the
 * canonical path is db.upsertUser(), which inserts without an explicit id. We mirror
 * that exactly instead of computing ids ourselves.
 *
 * Homeowner openIds are prefixed with "homeowner_" to distinguish from Manus OAuth
 * users ("email:"/google) and partners ("partner_").
 */
import { z } from "zod";
import bcrypt from "bcryptjs";
import { sql } from "drizzle-orm";
import { router, publicProcedure, protectedProcedure } from "../_core/trpc";
import { getDb, getUserByOpenId, upsertUser } from "../db";
import { sdk } from "../_core/sdk";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { getSessionCookieOptions } from "../_core/cookies";
import { firstRow } from "../_core/dbRows";
import { TRPCError } from "@trpc/server";

function makeOpenId(email: string) {
  return `homeowner_${email.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
}

export const homeownerAuthRouter = router({
  // --- Register a new homeowner account ---
  register: publicProcedure
    .input(z.object({
      name: z.string().min(2).max(255),
      email: z.string().email(),
      password: z.string().min(8),
      phone: z.string().max(30).optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const openId = makeOpenId(input.email);

      // Block if this homeowner account already has a password set.
      const existing = await getUserByOpenId(openId);
      if (existing) {
        const pwRows = await db.execute(sql`
          SELECT passwordHash FROM userPasswords WHERE openId = ${openId} LIMIT 1
        `);
        if (firstRow(pwRows)?.passwordHash) {
          throw new TRPCError({ code: "CONFLICT", message: "An account with this email already exists" });
        }
      }

      const passwordHash = await bcrypt.hash(input.password, 10);

      // Create/locate the user record (id assigned by upsertUser, mirroring oauth.ts).
      await upsertUser({
        openId,
        name: input.name,
        email: input.email.toLowerCase(),
        loginMethod: "homeowner_password",
        lastSignedIn: new Date(),
      });

      // Store the password hash in the same place the app already stores passwords.
      await db.execute(sql`
        INSERT INTO userPasswords (openId, passwordHash)
        VALUES (${openId}, ${passwordHash})
        ON DUPLICATE KEY UPDATE passwordHash = VALUES(passwordHash), updatedAt = NOW()
      `);

      // Create the homeownerProfiles row if one doesn't already exist for this user.
      const user = await getUserByOpenId(openId);
      if (user) {
        const existingProfile = await db.execute(sql`
          SELECT id FROM homeownerProfiles WHERE userId = ${user.id} LIMIT 1
        `);
        if (!firstRow(existingProfile)) {
          await db.execute(sql`
            INSERT INTO homeownerProfiles (userId, displayName, phone, createdAt, updatedAt)
            VALUES (${user.id}, ${input.name}, ${input.phone ?? null}, NOW(), NOW())
          `);
        }
      }

      const sessionToken = await sdk.createSessionToken(openId, {
        name: input.name,
        expiresInMs: ONE_YEAR_MS,
      });
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      return { success: true as const };
    }),

  // --- Login with email + password ---
  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const openId = makeOpenId(input.email);
      const user = await getUserByOpenId(openId);
      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
      }

      const pwRows = await db.execute(sql`
        SELECT passwordHash FROM userPasswords WHERE openId = ${openId} LIMIT 1
      `);
      const storedHash = firstRow(pwRows)?.passwordHash as string | undefined;
      if (!storedHash) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
      }

      const valid = await bcrypt.compare(input.password, storedHash);
      if (!valid) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid email or password" });
      }

      db.execute(sql`UPDATE users SET lastSignedIn = NOW() WHERE openId = ${openId}`).catch(() => {});

      const sessionToken = await sdk.createSessionToken(openId, {
        name: user.name ?? "",
        expiresInMs: ONE_YEAR_MS,
      });
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      return {
        success: true as const,
        homeowner: {
          name: user.name ?? "",
          email: user.email ?? input.email,
        },
      };
    }),

  // --- Current homeowner's safe profile ---
  me: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

    const profileRows = await db.execute(sql`
      SELECT id, displayName, phone, bio, photoUrl, setupComplete,
             contactPreference, openToRecommendations, creditBalance,
             referralCount, referralCode, createdAt
      FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1
    `);
    const profile = firstRow(profileRows) ?? null;

    return {
      user: {
        id: ctx.user.id,
        name: ctx.user.name ?? "",
        email: ctx.user.email ?? null,
      },
      profile,
    };
  }),
});
