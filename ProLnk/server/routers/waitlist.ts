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
  trade: z.string().min(1).max(100),
  primaryCity: z.string().min(1).max(100),
  primaryState: z.string().min(2).max(2),
});

const HomeWaitlistSchema = z.object({
  firstName: z.string().min(1).max(100).trim(),
  lastName: z.string().min(1).max(100).trim(),
  email: z.string().email().toLowerCase(),
  phone: z.string().max(30).optional(),
  address: z.string().min(1).max(500),
  city: z.string().min(1).max(100),
  state: z.string().min(2).max(2),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/),
  serviceNeeded: z.string().min(1).max(255),
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

          await pool.query(
            `INSERT INTO proWaitlist (
              firstName, lastName, email, phone, businessName, businessType, yearsInBusiness,
              employeeCount, estimatedJobsPerMonth, avgJobValue, trades, primaryCity, primaryState,
              serviceZipCodes, serviceRadiusMiles, currentSoftware, referralsGivenPerMonth,
              referralsReceivedPerMonth, primaryGoal
            ) VALUES (
              ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )`,
            [
              input.firstName, input.lastName, input.email, input.phone,
              input.trade, input.trade, 1,
              "1", 0, "varies", JSON.stringify([input.trade]), input.primaryCity, input.primaryState,
              input.primaryState, 25, JSON.stringify([]), "0", "0", "more_leads"
            ]
          );

          // Get position
          const [countResult] = await pool.query(`SELECT COUNT(*) as cnt FROM proWaitlist`);
          const position = Number((countResult[0] as any)?.cnt ?? 1);

          sendProWaitlistConfirmation({
            to: input.email,
            firstName: input.firstName,
            trade: input.trade,
            position,
            city: input.primaryCity
          }).catch((err) => {
            logger.error("Email send failed for Pro waitlist", {
              email: input.email,
              error: err?.message
            });
          });

          notifyOwner({
            title: 'New ProLnk Pro Waitlist Signup',
            content: `${input.firstName} ${input.lastName} joined Pro waitlist. Trade: ${input.trade}. City: ${input.primaryCity}, ${input.primaryState}.`
          }).catch((err) => {
            logger.warn("Admin notification failed for Pro waitlist", { email: input.email });
          });

          await waitlistAnalytics.track({
            type: "signup",
            source: "pro_waitlist",
            email: input.email,
            formPosition: position,
            metadata: {
              trade: input.trade,
              city: input.primaryCity,
              state: input.primaryState
            }
          }, String(ipAddress), String(userAgent));

          return { success: true, position };
        } catch (error: any) {
          if (error?.code === 'CONFLICT') {
            throw error; // Re-throw TRPC errors
          }
          const errorDetails = {
            email: input.email,
            message: error?.message,
            code: error?.code || error?.errno,
            sqlState: error?.sqlState,
            sql: error?.sql
          };
          logger.error("Pro waitlist signup failed", errorDetails);
          await waitlistAnalytics.track({ type: "error", source: "pro_waitlist" }, String(ipAddress), String(userAgent));
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: `Signup failed: ${error?.message || 'Unknown error'}`
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

          await pool.query(
            `INSERT INTO homeWaitlist (
              firstName, lastName, email, phone, address, city, state, zipCode, homeType,
              desiredProjects, projectTimeline, ownershipStatus, ownershipType
            ) VALUES (
              ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )`,
            [
              input.firstName, input.lastName, input.email, input.phone ?? null,
              input.address, input.city, input.state, input.zipCode, "single_family",
              JSON.stringify([input.serviceNeeded]), "just_exploring", "own", "primary_residence"
            ]
          );

          // Get position
          const [countResult] = await pool.query(`SELECT COUNT(*) as cnt FROM homeWaitlist`);
          const position = Number((countResult[0] as any)?.cnt ?? 1);

          sendHomeownerWaitlistConfirmation({
            to: input.email,
            firstName: input.firstName,
            address: input.address,
            city: input.city,
            position,
            serviceNeeded: input.serviceNeeded
          }).catch((err) => {
            logger.error("Email send failed for Home waitlist", {
              email: input.email,
              error: err?.message
            });
          });

          notifyOwner({
            title: 'New TrustyPro Homeowner Waitlist Signup',
            content: `${input.firstName} ${input.lastName} joined homeowner waitlist. Address: ${input.address}, ${input.city}, ${input.state}. Service: ${input.serviceNeeded}.`
          }).catch(() => {});

          await waitlistAnalytics.track({
            type: "signup",
            source: "trustypro_7step",
            email: input.email,
            formPosition: position,
            metadata: {
              address: input.address,
              city: input.city,
              state: input.state,
              serviceNeeded: input.serviceNeeded
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
