import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { partners } from "../../drizzle/schema";
import { z } from "zod";
import * as crypto from "crypto";

const APP_BASE_URL = (process.env.APP_BASE_URL ?? "https://prolnk.io").replace(/\/$/, "");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? "";

function generateReferralCode(): string {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
}

interface VerifiedGoogleToken {
  sub: string;
  email: string;
  aud: string;
}

async function verifyGoogleIdToken(idToken: string): Promise<VerifiedGoogleToken | null> {
  if (!idToken) return null;
  try {
    const resp = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`
    );
    if (!resp.ok) return null;
    const data = (await resp.json()) as {
      sub?: string;
      email?: string;
      aud?: string;
      email_verified?: string | boolean;
    };
    if (!data.sub || !data.email) return null;
    if (data.email_verified === "false" || data.email_verified === false) return null;
    return { sub: data.sub, email: data.email, aud: data.aud ?? "" };
  } catch (err) {
    console.error("[partnerOAuth] Google token verification failed:", err);
    return null;
  }
}

export const partnerOAuthRouter = router({
  // Get Google OAuth redirect URL for partner signup
  getGoogleAuthUrl: publicProcedure
    .input(
      z.object({
        returnPath: z.string().optional(),
      })
    )
    .query(({ input }) => {
      const redirectUri = `${APP_BASE_URL}/api/auth/google/callback`;
      const state = input.returnPath
        ? Buffer.from(JSON.stringify({ returnPath: input.returnPath, partner: true })).toString("base64url")
        : Buffer.from(JSON.stringify({ partner: true })).toString("base64url");

      const params = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        state,
      });

      return {
        authUrl: `https://accounts.google.com/o/oauth2/v2/auth?${params}`,
      };
    }),

  // Create partner profile after OAuth login
  createPartnerProfile: publicProcedure
    .input(
      z.object({
        idToken: z.string(),
        googleId: z.string(),
        email: z.string().email(),
        name: z.string(),
        businessName: z.string(),
        businessType: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { idToken, googleId, email, name, businessName, businessType } = input;

      const verified = await verifyGoogleIdToken(idToken);
      if (!verified) {
        throw new Error("Invalid Google identity token");
      }
      if (verified.sub !== googleId || verified.email.toLowerCase() !== email.toLowerCase()) {
        throw new Error("Identity token does not match supplied account");
      }
      if (GOOGLE_CLIENT_ID && verified.aud !== GOOGLE_CLIENT_ID) {
        throw new Error("Identity token issued for a different client");
      }

      try {
        const db = await getDb();
        if (!db) throw new Error("Database unavailable");
        // Check if partner profile exists
        const existing = await db.query.partners.findFirst({
          where: (partners, { eq }) => eq(partners.contactEmail, email),
        });

        if (existing) {
          return {
            success: true,
            profileId: existing.id,
            tier: existing.tier,
            status: existing.status,
            message: "Partner profile already exists",
          };
        }

        // Create new partner profile (scout tier by default)
        const referralCode = generateReferralCode();

        const [newPartner] = await db
          .insert(partners)
          .values({
            businessName,
            businessType,
            serviceArea: "",
            contactName: name,
            contactEmail: email,
            description: `Partner profile created via OAuth`,
            status: "pending",
            tier: "scout",
            commissionRate: "0.40",
            platformFeeRate: "0.12",
            referralCommissionRate: "0.048",
            trialStatus: "active",
            trialStartedAt: new Date(),
            stripeConnectStatus: "not_connected",
          })
          .returning();

        return {
          success: true,
          profileId: newPartner.id,
          tier: newPartner.tier,
          status: newPartner.status,
          referralCode,
          trialExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        };
      } catch (error) {
        console.error("Failed to create partner profile:", error);
        throw new Error("Failed to create partner profile");
      }
    }),

  // Get partner signup/profile status
  getPartnerSignupStatus: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(async ({ input }) => {
      const { email } = input;

      try {
        const partner = await db.query.partners.findFirst({
          where: (partners, { eq }) => eq(partners.contactEmail, email),
        });

        if (!partner) {
          return {
            exists: false,
            status: "not_started",
          };
        }

        return {
          exists: true,
          status: partner.status,
          tier: partner.tier,
          trialStatus: partner.trialStatus,
          profileId: partner.id,
        };
      } catch (error) {
        console.error("Failed to get partner status:", error);
        throw new Error("Failed to fetch partner status");
      }
    }),

  // Verify partner email domain (optional for domain-based tier)
  verifyBusinessEmail: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .query(({ input }) => {
      const domain = input.email.split("@")[1];

      // List of premium domains (Fortune 500, common contractors)
      const premiumDomains = [
        "servicetitan.com",
        "jobber.com",
        "homeadvisor.com",
        "angi.com",
        "lowes.com",
        "homedepot.com",
      ];

      const isPremium = premiumDomains.includes(domain?.toLowerCase() || "");

      return {
        domain,
        isPremium,
        suggestedTier: isPremium ? "pro" : "scout",
      };
    }),
});
