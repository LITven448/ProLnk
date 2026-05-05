import { publicProcedure, router } from "@/server/_core/trpc";
import { db } from "@/server/_core/db";
import { partners } from "@/drizzle/schema";
import { z } from "zod";
import * as crypto from "crypto";

const APP_BASE_URL = (process.env.APP_BASE_URL ?? "https://prolnk.io").replace(/\/$/, "");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? "";

function generateReferralCode(): string {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
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
        googleId: z.string(),
        email: z.string().email(),
        name: z.string(),
        businessName: z.string(),
        businessType: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { googleId, email, name, businessName, businessType } = input;

      try {
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
