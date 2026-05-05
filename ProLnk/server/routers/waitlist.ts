import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, adminProcedure, router } from "../_core/trpc";
import { getDb, getPool } from "../db";
import { sql } from "drizzle-orm";
import { sendProWaitlistConfirmation, sendHomeownerWaitlistConfirmation } from "../email";
import { notifyOwner } from "../_core/notification";
import { logger } from "../_core/logger";
import { analyticsTracker } from "../_core/analytics";

const ProWaitlistSchema = z.object({
  firstName: z.string().min(1).max(100).trim(),
  lastName: z.string().min(1).max(100).trim(),
  email: z.string().email().toLowerCase(),
  phone: z.string().min(7).max(30),
  businessName: z.string().min(1).max(255),
  businessType: z.string().min(1).max(100),
  yearsInBusiness: z.number().int().min(0).max(100),
  employeeCount: z.string().min(1),
  estimatedJobsPerMonth: z.number().int().min(0),
  avgJobValue: z.string().min(1),
  trades: z.array(z.string().min(1).max(50)).min(1).max(20),
  primaryCity: z.string().min(1).max(100),
  primaryState: z.string().min(1).max(50),
  serviceZipCodes: z.string().min(1),
  serviceRadiusMiles: z.number().int().min(1).max(500).default(25),
  currentSoftware: z.array(z.string()),
  otherSoftware: z.string().max(255).optional(),
  referralsGivenPerMonth: z.string().min(1),
  referralsReceivedPerMonth: z.string().min(1),
  currentReferralMethod: z.string().max(255).optional(),
  primaryGoal: z.string().min(1).max(100),
  hearAboutUs: z.string().max(255).optional(),
  additionalNotes: z.string().max(2000).optional(),
  customTradeDescription: z.string().max(500).optional(),
  licenseFileUrl: z.string().url().max(1000).optional(),
  licenseFileName: z.string().max(255).optional(),
  smsOptIn: z.boolean().default(false),
  referralCode: z.string().max(100).optional(),
});

const HomeWaitlistSchema = z.object({
  firstName: z.string().min(1).max(100).trim(),
  lastName: z.string().min(1).max(100).trim(),
  email: z.string().email().toLowerCase(),
  phone: z.string().max(30).optional(),
  address: z.string().min(1).max(500),
  city: z.string().min(1).max(100),
  state: z.string().min(1).max(50),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/),
  homeType: z.enum(['single_family','townhouse','condo','multi_family','mobile']),
  yearBuilt: z.number().int().min(1800).max(new Date().getFullYear() + 1).optional(),
  squareFootage: z.number().int().min(100).max(50000).optional(),
  lotSizeSqFt: z.number().int().min(0).optional(),
  bedrooms: z.number().int().min(0).max(20).optional(),
  bathrooms: z.string().max(10).optional(),
  stories: z.number().int().min(1).max(10).optional(),
  garageSpaces: z.number().int().min(0).max(10).optional(),
  hasPool: z.boolean().default(false),
  hasBasement: z.boolean().default(false),
  hasAttic: z.boolean().default(false),
  ownershipStatus: z.enum(['own','rent']).default('own'),
  ownershipType: z.enum(['primary_residence','rental','company_owned']).default('primary_residence'),
  isRental: z.boolean().default(false),
  companyName: z.string().max(255).optional(),
  companyEin: z.string().max(20).optional(),
  propertyManagerName: z.string().max(255).optional(),
  propertyManagerPhone: z.string().max(30).optional(),
  yearsOwned: z.number().int().min(0).optional(),
  overallCondition: z.enum(['excellent','good','fair','needs_work']).optional(),
  recentImprovements: z.array(z.string()).optional(),
  desiredProjects: z.array(z.string()).min(1).max(20),
  projectTimeline: z.enum(['asap','3_months','6_months','1_year','just_exploring']).default('just_exploring'),
  estimatedBudget: z.string().max(50).optional(),
  homeSystems: z.record(z.string(), z.string()).optional(),
  homeStyle: z.string().max(100).optional(),
  exteriorColor: z.string().max(100).optional(),
  primaryPainPoint: z.string().max(255).optional(),
  hearAboutUs: z.string().max(255).optional(),
  additionalNotes: z.string().max(2000).optional(),
  consentTerms: z.boolean().default(false),
  consentEmail: z.boolean().default(false),
  consentSms: z.boolean().default(false),
  consentPush: z.boolean().default(false),
  consentMarketing: z.boolean().default(false),
  consentDataUse: z.boolean().default(false),
  preferredContact: z.string().max(20).optional(),
});

const SimpleWaitlistSchema = z.object({
  name: z.string().min(1).max(200).trim(),
  email: z.string().email().toLowerCase(),
});

export const waitlistRouter = router({
  joinProWaitlist: publicProcedure
    .input(ProWaitlistSchema)
    .mutation(async ({ input, ctx }) => {
      return await logger.track("waitlist:joinProWaitlist", async () => {
        const db = await getDb();
        const pool = await getPool();
        const ipAddress = ctx.req.ip || ctx.req.headers["x-forwarded-for"] || "unknown";
        const userAgent = ctx.req.headers["user-agent"];

        if (!db || !pool) {
          await waitlistAnalytics.track({ type: "error", source: "pro_waitlist" }, String(ipAddress), String(userAgent));
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database service temporarily unavailable. Please try again.' });
        }

        try {
          // Validate email is not already in system (catch duplicate early)
          const [existingProSignup] = await pool.query(
            `SELECT id FROM proWaitlist WHERE email = ? LIMIT 1`,
            [input.email]
          );
          if ((existingProSignup as any[])?.[0]) {
            await waitlistAnalytics.track({ type: "error", source: "pro_waitlist", email: input.email }, String(ipAddress), String(userAgent));
            throw new TRPCError({ code: 'CONFLICT', message: 'This email is already registered on the ProLnk waitlist.' });
          }

          // Insert with full field validation
          await pool.query(
            `INSERT INTO proWaitlist (
              firstName, lastName, email, phone, businessName, businessType, yearsInBusiness,
              employeeCount, estimatedJobsPerMonth, avgJobValue, trades, customTradeDescription,
              licenseFileUrl, licenseFileName, smsOptIn, primaryCity, primaryState, serviceZipCodes,
              serviceRadiusMiles, currentSoftware, otherSoftware, referralsGivenPerMonth,
              referralsReceivedPerMonth, currentReferralMethod, primaryGoal, hearAboutUs,
              additionalNotes, createdAt
            ) VALUES (
              ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW()
            )`,
            [
              input.firstName, input.lastName, input.email, input.phone,
              input.businessName, input.businessType, input.yearsInBusiness,
              input.employeeCount, input.estimatedJobsPerMonth, input.avgJobValue,
              JSON.stringify(input.trades), input.customTradeDescription ?? null,
              input.licenseFileUrl ?? null, input.licenseFileName ?? null,
              input.smsOptIn ? 1 : 0, input.primaryCity, input.primaryState,
              input.serviceZipCodes, input.serviceRadiusMiles,
              JSON.stringify(input.currentSoftware), input.otherSoftware ?? null,
              input.referralsGivenPerMonth, input.referralsReceivedPerMonth,
              input.currentReferralMethod ?? null, input.primaryGoal,
              input.hearAboutUs ?? null, input.additionalNotes ?? null
            ]
          );

          // Get position
          const [countResult] = await pool.query(`SELECT COUNT(*) as cnt FROM proWaitlist`);
          const position = Number((countResult[0] as any)?.cnt ?? 1);

          // Send confirmation email (fire-and-forget, errors logged separately)
          sendProWaitlistConfirmation({
            to: input.email,
            firstName: input.firstName,
            businessName: input.businessName,
            position,
            trades: input.trades,
            city: input.primaryCity
          }).catch((err) => {
            logger.error("Email send failed for Pro waitlist", {
              email: input.email,
              error: err?.message
            });
          });

          // Send admin notification
          const smsNote = input.smsOptIn ? ' (SMS opt-in: YES)' : '';
          const licenseNote = input.licenseFileUrl ? ' | License uploaded' : '';
          const customTrade = input.customTradeDescription ? ` | Custom trade: ${input.customTradeDescription}` : '';
          notifyOwner({
            title: 'New ProLnk Pro Waitlist Signup',
            content: `${input.firstName} ${input.lastName} (${input.businessName}) joined Pro waitlist. Trades: ${input.trades.join(', ')}.${customTrade} City: ${input.primaryCity}, ${input.primaryState}.${smsNote}${licenseNote}`
          }).catch((err) => {
            logger.warn("Admin notification failed for Pro waitlist", { email: input.email });
          });

          // Track analytics
          await waitlistAnalytics.track({
            type: "signup",
            source: "pro_waitlist",
            email: input.email,
            referredBy: input.referralCode,
            tradesCount: input.trades.length,
            smsOptIn: input.smsOptIn,
            hasLicense: !!input.licenseFileUrl,
            formPosition: position,
            metadata: {
              businessName: input.businessName,
              businessType: input.businessType,
              city: input.primaryCity,
              state: input.primaryState
            }
          }, String(ipAddress), String(userAgent));

          return { success: true, position };
        } catch (error: any) {
          if (error?.code === 'CONFLICT') {
            throw error; // Re-throw TRPC errors
          }
          logger.error("Pro waitlist signup failed", { email: input.email, error: error?.message });
          await waitlistAnalytics.track({ type: "error", source: "pro_waitlist" }, String(ipAddress), String(userAgent));
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Signup failed. Please try again.'
          });
        }
      });
    }),

  joinHomeWaitlist: publicProcedure
    .input(HomeWaitlistSchema)
    .mutation(async ({ input, ctx }) => {
      return await logger.track("waitlist:joinHomeWaitlist", async () => {
        const db = await getDb();
        const pool = await getPool();
        const ipAddress = ctx.req.ip || ctx.req.headers["x-forwarded-for"] || "unknown";
        const userAgent = ctx.req.headers["user-agent"];

        if (!db || !pool) {
          await waitlistAnalytics.track({ type: "error", source: "trustypro_7step" }, String(ipAddress), String(userAgent));
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database service temporarily unavailable.' });
        }

        try {
          // Check for existing signup
          const [existingHomeSignup] = await pool.query(
            `SELECT id FROM homeWaitlist WHERE email = ? LIMIT 1`,
            [input.email]
          );
          if ((existingHomeSignup as any[])?.[0]) {
            await waitlistAnalytics.track({ type: "error", source: "trustypro_7step", email: input.email }, String(ipAddress), String(userAgent));
            throw new TRPCError({ code: 'CONFLICT', message: 'This email is already registered on the TrustyPro waitlist.' });
          }

          // Insert
          await pool.query(
            `INSERT INTO homeWaitlist (
              firstName, lastName, email, phone, address, city, state, zipCode, homeType,
              yearBuilt, squareFootage, lotSizeSqFt, bedrooms, bathrooms, stories, garageSpaces,
              hasPool, hasBasement, hasAttic, ownershipStatus, ownershipType, isRental,
              companyName, companyEin, propertyManagerName, propertyManagerPhone, yearsOwned,
              overallCondition, recentImprovements, desiredProjects, projectTimeline,
              estimatedBudget, homeSystems, homeStyle, exteriorColor, primaryPainPoint,
              hearAboutUs, additionalNotes, consentTerms, consentEmail, consentSms,
              consentPush, consentMarketing, consentDataUse, preferredContact, createdAt
            ) VALUES (
              ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW()
            )`,
            [
              input.firstName, input.lastName, input.email, input.phone ?? null,
              input.address, input.city, input.state, input.zipCode, input.homeType,
              input.yearBuilt ?? null, input.squareFootage ?? null, input.lotSizeSqFt ?? null,
              input.bedrooms ?? null, input.bathrooms ?? null, input.stories ?? null,
              input.garageSpaces ?? null, input.hasPool ? 1 : 0, input.hasBasement ? 1 : 0,
              input.hasAttic ? 1 : 0, input.ownershipStatus, input.ownershipType,
              input.isRental ? 1 : 0, input.companyName ?? null, input.companyEin ?? null,
              input.propertyManagerName ?? null, input.propertyManagerPhone ?? null,
              input.yearsOwned ?? null, input.overallCondition ?? null,
              input.recentImprovements ? JSON.stringify(input.recentImprovements) : null,
              JSON.stringify(input.desiredProjects), input.projectTimeline,
              input.estimatedBudget ?? null,
              input.homeSystems ? JSON.stringify(input.homeSystems) : null,
              input.homeStyle ?? null, input.exteriorColor ?? null,
              input.primaryPainPoint ?? null, input.hearAboutUs ?? null,
              input.additionalNotes ?? null, input.consentTerms ? 1 : 0,
              input.consentEmail ? 1 : 0, input.consentSms ? 1 : 0,
              input.consentPush ? 1 : 0, input.consentMarketing ? 1 : 0,
              input.consentDataUse ? 1 : 0, input.preferredContact ?? null
            ]
          );

          // Get position
          const [countResult] = await pool.query(`SELECT COUNT(*) as cnt FROM homeWaitlist`);
          const position = Number((countResult[0] as any)?.cnt ?? 1);

          // Send confirmation email
          sendHomeownerWaitlistConfirmation({
            to: input.email,
            firstName: input.firstName,
            address: input.address,
            city: input.city,
            position,
            projects: input.desiredProjects
          }).catch((err) => {
            logger.error("Email send failed for Home waitlist", {
              email: input.email,
              error: err?.message
            });
          });

          // Admin notification
          notifyOwner({
            title: 'New TrustyPro Homeowner Waitlist Signup',
            content: `${input.firstName} ${input.lastName} (${input.email}) joined homeowner waitlist. Address: ${input.address}, ${input.city}, ${input.state}. Projects: ${input.desiredProjects.join(', ')}.`
          }).catch(() => {});

          // Analytics
          await waitlistAnalytics.track({
            type: "signup",
            source: "trustypro_7step",
            email: input.email,
            formPosition: position,
            metadata: {
              homeType: input.homeType,
              projectTimeline: input.projectTimeline,
              projectsCount: input.desiredProjects.length,
              address: input.address,
              city: input.city,
              state: input.state
            }
          }, String(ipAddress), String(userAgent));

          return { success: true, position };
        } catch (error: any) {
          if (error?.code === 'CONFLICT') throw error;
          logger.error("Home waitlist signup failed", { email: input.email, error: error?.message });
          await waitlistAnalytics.track({ type: "error", source: "trustypro_7step" }, String(ipAddress), String(userAgent));
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Signup failed. Please try again.' });
        }
      });
    }),

  joinSimpleWaitlist: publicProcedure
    .input(SimpleWaitlistSchema)
    .mutation(async ({ input, ctx }) => {
      return await logger.track("waitlist:joinSimpleWaitlist", async () => {
        const db = await getDb();
        const ipAddress = ctx.req.ip || ctx.req.headers["x-forwarded-for"] || "unknown";
        const userAgent = ctx.req.headers["user-agent"];

        if (!db) {
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Service unavailable.' });
        }

        try {
          const existing = await (db as any).execute(
            sql`SELECT id FROM homeWaitlist WHERE email = ${input.email} LIMIT 1`
          );
          if (existing?.rows?.[0]) {
            throw new TRPCError({ code: 'CONFLICT', message: 'Email already registered.' });
          }

          const [firstName, ...lastNameParts] = input.name.split(' ');
          const lastName = lastNameParts.join(' ') || 'Homeowner';

          await (db as any).execute(
            sql`INSERT INTO homeWaitlist (firstName, lastName, email, createdAt)
                VALUES (${firstName}, ${lastName}, ${input.email}, NOW())`
          );

          const countResult = await (db as any).execute(
            sql`SELECT COUNT(*) as cnt FROM homeWaitlist`
          );
          const position = Number((countResult?.rows?.[0] as any)?.cnt ?? 1);

          sendHomeownerWaitlistConfirmation({
            to: input.email,
            firstName,
            address: "Home",
            city: "Your Area",
            position,
            projects: ["Home Improvements"]
          }).catch(() => {});

          await waitlistAnalytics.track({
            type: "signup",
            source: "trustypro_simple",
            email: input.email,
            formPosition: position
          }, String(ipAddress), String(userAgent));

          return { success: true, position };
        } catch (error: any) {
          if (error?.code === 'CONFLICT') throw error;
          logger.error("Simple waitlist signup failed", { email: input.email });
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Signup failed.' });
        }
      });
    }),

  getWaitlistMetrics: adminProcedure
    .query(async () => {
      return await logger.track("waitlist:getMetrics", async () => {
        const db = await getDb();
        if (!db) return { pro: 0, home: 0, total: 0, referrals: 0 };

        const [proCount, homeCount, referralCount] = await Promise.all([
          (db as any).execute(sql`SELECT COUNT(*) as cnt FROM proWaitlist`),
          (db as any).execute(sql`SELECT COUNT(*) as cnt FROM homeWaitlist`),
          (db as any).execute(sql`SELECT COUNT(*) as cnt FROM proWaitlist WHERE referredBy IS NOT NULL AND referredBy != ''`)
        ]);

        return {
          pro: Number(proCount?.rows?.[0]?.cnt ?? 0),
          home: Number(homeCount?.rows?.[0]?.cnt ?? 0),
          total: Number((proCount?.rows?.[0]?.cnt ?? 0)) + Number((homeCount?.rows?.[0]?.cnt ?? 0)),
          referrals: Number(referralCount?.rows?.[0]?.cnt ?? 0)
        };
      });
    }),

  exportWaitlist: adminProcedure
    .input(z.object({ source: z.enum(['pro', 'home', 'all']) }))
    .query(async ({ input }) => {
      return await logger.track("waitlist:export", async () => {
        const db = await getDb();
        if (!db) return [];

        if (input.source === 'all') {
          const [pro, home] = await Promise.all([
            (db as any).execute(sql`SELECT * FROM proWaitlist ORDER BY createdAt DESC`),
            (db as any).execute(sql`SELECT * FROM homeWaitlist ORDER BY createdAt DESC`)
          ]);
          return [...(pro?.rows || []), ...(home?.rows || [])];
        }

        const result = await (db as any).execute(
          input.source === 'pro'
            ? sql`SELECT * FROM proWaitlist ORDER BY createdAt DESC`
            : sql`SELECT * FROM homeWaitlist ORDER BY createdAt DESC`
        );
        return result?.rows || [];
      });
    })
});
