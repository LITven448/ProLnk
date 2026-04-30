/**
 * Authentication — Direct email/password + Google OAuth (no Manus Forge)
 *
 * Replaces the Manus OAuth flow. The JWT session system (jose + JWT_SECRET) is unchanged —
 * only the identity-verification step changes.
 *
 * Routes registered:
 *   POST /api/auth/register       — create account with email + password
 *   POST /api/auth/login          — sign in with email + password
 *   POST /api/auth/logout         — clear session cookie
 *   GET  /api/auth/google         — redirect to Google OAuth
 *   GET  /api/auth/google/callback — handle Google OAuth return
 *   GET  /api/auth/me             — return current user (for client bootstrap)
 *
 * Required env vars:
 *   JWT_SECRET                         — already used for session signing
 *   GOOGLE_CLIENT_ID                   — Google OAuth app client ID
 *   GOOGLE_CLIENT_SECRET               — Google OAuth app secret
 *   APP_BASE_URL                       — e.g. https://prolnk.io
 *
 * Password hashing: uses Node.js built-in crypto (pbkdf2) — no bcrypt dep needed.
 */

import type { Express, Request, Response } from "express";
import * as crypto from "crypto";
import * as db from "../db";
import { sdk } from "./sdk";
import { getSessionCookieOptions } from "./cookies";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { ENV } from "./env";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? "";
const APP_BASE_URL = (process.env.APP_BASE_URL ?? "https://prolnk.io").replace(/\/$/, "");

// ─── Password hashing (pbkdf2, no external dep) ───────────────────────────────

function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");
    crypto.pbkdf2(password, salt, 100_000, 64, "sha512", (err, key) => {
      if (err) reject(err);
      else resolve(`${salt}:${key.toString("hex")}`);
    });
  });
}

function verifyPassword(password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, stored] = hash.split(":");
    if (!salt || !stored) { resolve(false); return; }
    crypto.pbkdf2(password, salt, 100_000, 64, "sha512", (err, key) => {
      if (err) reject(err);
      else resolve(crypto.timingSafeEqual(Buffer.from(stored, "hex"), key));
    });
  });
}

// ─── Session helpers ──────────────────────────────────────────────────────────

async function createSession(res: Response, req: Request, openId: string, name: string) {
  const sessionToken = await sdk.createSessionToken(openId, { name, expiresInMs: ONE_YEAR_MS });
  const cookieOptions = getSessionCookieOptions(req);
  res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
  return sessionToken;
}

// ─── Google OAuth helpers ─────────────────────────────────────────────────────

function googleAuthUrl(returnPath?: string): string {
  const redirectUri = `${APP_BASE_URL}/api/auth/google/callback`;
  const state = returnPath ? Buffer.from(JSON.stringify({ returnPath })).toString("base64url") : "";
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    ...(state ? { state } : {}),
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
}

async function exchangeGoogleCode(code: string): Promise<{ sub: string; email: string; name: string }> {
  const redirectUri = `${APP_BASE_URL}/api/auth/google/callback`;
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }).toString(),
  });
  if (!tokenRes.ok) {
    const err = await tokenRes.text();
    throw new Error(`Google token exchange failed: ${err}`);
  }
  const tokens = await tokenRes.json() as { id_token?: string; access_token?: string };

  // Decode the id_token to get user info (it's a signed JWT from Google)
  if (tokens.id_token) {
    const [, payload] = tokens.id_token.split(".");
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      sub: string; email: string; name: string;
    };
    return decoded;
  }

  // Fallback: fetch userinfo endpoint
  const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });
  return userRes.json() as Promise<{ sub: string; email: string; name: string }>;
}

// ─── Route registration ───────────────────────────────────────────────────────

export function registerOAuthRoutes(app: Express) {

  // ── Register with email + password ──────────────────────────────────────────
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    const { email, password, name } = req.body as { email?: string; password?: string; name?: string };
    if (!email || !password || !name) {
      return res.status(400).json({ error: "email, password, and name are required" });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: "Password must be at least 8 characters" });
    }
    // Check if email already exists
    const existing = await db.getUserByOpenId(`email:${email.toLowerCase()}`);
    if (existing) {
      return res.status(409).json({ error: "An account with this email already exists" });
    }

    const openId = `email:${email.toLowerCase()}`;
    const passwordHash = await hashPassword(password);

    await db.upsertUser({
      openId,
      name,
      email: email.toLowerCase(),
      loginMethod: "email",
      lastSignedIn: new Date(),
    });

    // Store password hash — stored in a dedicated table not in schema yet; use raw SQL
    const dbConn = await db.getDb();
    if (dbConn) {
      await (dbConn as any).execute(
        `INSERT INTO userPasswords (openId, passwordHash) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE passwordHash = VALUES(passwordHash), updatedAt = NOW()`,
        [openId, passwordHash]
      );
    }

    await createSession(res, req, openId, name);
    return res.json({ success: true });
  });

  // ── Login with email + password ──────────────────────────────────────────────
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    const { email, password } = req.body as { email?: string; password?: string };
    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const openId = `email:${email.toLowerCase()}`;
    const user = await db.getUserByOpenId(openId);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const dbConn = await db.getDb();
    if (!dbConn) return res.status(503).json({ error: "Database unavailable" });

    const pwRows = await (dbConn as any).execute(
      `SELECT passwordHash FROM userPasswords WHERE openId = ? LIMIT 1`, [openId]
    );
    const storedHash = (pwRows.rows ?? pwRows)[0]?.passwordHash ?? (pwRows[0]?.[0]?.passwordHash ?? pwRows[0]?.passwordHash);
    if (!storedHash) {
      return res.status(401).json({ error: "This account uses Google sign-in. Please continue with Google." });
    }

    const valid = await verifyPassword(password, storedHash);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    await db.upsertUser({ openId, lastSignedIn: new Date() });
    await createSession(res, req, openId, user.name ?? "");
    return res.json({ success: true });
  });

  // ── Logout ───────────────────────────────────────────────────────────────────
  app.post("/api/auth/logout", (req: Request, res: Response) => {
    const cookieOptions = getSessionCookieOptions(req);
    res.clearCookie(COOKIE_NAME, cookieOptions);
    return res.json({ success: true });
  });

  // ── Google OAuth — start ─────────────────────────────────────────────────────
  app.get("/api/auth/google", (req: Request, res: Response) => {
    if (!GOOGLE_CLIENT_ID) {
      return res.status(503).json({ error: "Google OAuth is not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET." });
    }
    const returnPath = typeof req.query.returnPath === "string" ? req.query.returnPath : undefined;
    return res.redirect(302, googleAuthUrl(returnPath));
  });

  // ── Google OAuth — callback ──────────────────────────────────────────────────
  app.get("/api/auth/google/callback", async (req: Request, res: Response) => {
    const code = typeof req.query.code === "string" ? req.query.code : null;
    const stateStr = typeof req.query.state === "string" ? req.query.state : null;

    if (!code) {
      return res.redirect(302, "/?auth_error=google_missing_code");
    }

    try {
      const googleUser = await exchangeGoogleCode(code);
      const openId = `google:${googleUser.sub}`;

      await db.upsertUser({
        openId,
        name: googleUser.name,
        email: googleUser.email,
        loginMethod: "google",
        lastSignedIn: new Date(),
      });

      await createSession(res, req, openId, googleUser.name);

      // Determine where to redirect
      let returnPath = "/dashboard";
      if (stateStr) {
        try {
          const state = JSON.parse(Buffer.from(stateStr, "base64url").toString()) as { returnPath?: string };
          if (state.returnPath) returnPath = state.returnPath;
        } catch {}
      }

      const savedUser = await db.getUserByOpenId(openId);
      if (savedUser?.role === "admin") returnPath = "/admin";

      return res.redirect(302, returnPath);
    } catch (err) {
      console.error("[Auth] Google OAuth callback error:", err);
      return res.redirect(302, "/?auth_error=google_failed");
    }
  });

  // ── Current user (for client bootstrap) ─────────────────────────────────────
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    try {
      const user = await sdk.authenticateRequest(req);
      if (!user) return res.json({ user: null });
      // Never send sensitive fields to the client
      const { openId: _, ...safe } = user as any;
      return res.json({ user: { ...safe, openId: user.openId } });
    } catch {
      return res.json({ user: null });
    }
  });

  // ── Legacy Manus OAuth callback — redirect to new login ──────────────────────
  // Handles any old deep links that still point to /api/oauth/callback
  app.get("/api/oauth/callback", (_req: Request, res: Response) => {
    return res.redirect(302, "/login?message=Please+sign+in+with+your+new+account");
  });
}
