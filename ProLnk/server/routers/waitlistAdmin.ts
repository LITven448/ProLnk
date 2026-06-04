import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { adminProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { sql } from "drizzle-orm";
import { createLogger } from "../_core/logger";
import { buildPartnerActivation } from "../partner-activation";
import { initiateBackgroundCheck } from "./checkr";

const log = createLogger("WaitlistAdmin");

export const waitlistAdminRouter = router({
  getProWaitlist: adminProcedure.query(async () => {
    return log.track("Get Pro Waitlist", async () => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const result = await db.execute(
        sql`SELECT id, firstName, lastName, email, phone, businessName, businessType, trades, tier, referredBy, smsOptIn, adminNotes, createdAt FROM proWaitlist ORDER BY createdAt DESC LIMIT 1000`
      );

      return (result?.[0] || []) as Array<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        businessName: string;
        businessType: string;
        trades: string;
        tier?: string;
        referredBy?: string;
        smsOptIn: boolean;
        adminNotes?: string;
        createdAt: Date;
        position?: number;
      }>;
    });
  }),

  getHomeWaitlist: adminProcedure.query(async () => {
    return log.track("Get Home Waitlist", async () => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const result = await db.execute(
        sql`SELECT id, firstName, lastName, email, phone, address, city, state, homeType, desiredProjects, projectTimeline, createdAt FROM homeWaitlist ORDER BY createdAt DESC LIMIT 1000`
      );

      return (result?.[0] || []) as Array<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phone?: string;
        address: string;
        city?: string;
        state?: string;
        homeType: string;
        desiredProjects: string;
        projectTimeline: string;
        createdAt: Date;
        position?: number;
      }>;
    });
  }),

  getWaitlistMetrics: adminProcedure.query(async () => {
    return log.track("Get Waitlist Metrics", async () => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [proResult, homeResult, referralResult] = await Promise.all([
        db.execute(sql`SELECT COUNT(*) as cnt FROM proWaitlist`),
        db.execute(sql`SELECT COUNT(*) as cnt FROM homeWaitlist`),
        db.execute(sql`SELECT COUNT(*) as cnt FROM proWaitlist WHERE referredBy IS NOT NULL`),
      ]);

      const proSignups = Number((proResult?.[0]?.[0] as any)?.cnt ?? 0);
      const homeSignups = Number((homeResult?.[0]?.[0] as any)?.cnt ?? 0);
      const referrals = Number((referralResult?.[0]?.[0] as any)?.cnt ?? 0);

      return {
        totalSignups: proSignups + homeSignups,
        proSignups,
        trustyproSignups: homeSignups,
        referrals,
        conversionRate: proSignups > 0 ? Math.round((referrals / proSignups) * 100) : 0,
      };
    });
  }),

  searchWaitlist: adminProcedure
    .input(
      z.object({
        query: z.string().min(1).max(255),
        source: z.enum(["pro", "home", "all"]).default("all"),
      })
    )
    .query(async ({ input }) => {
      return log.track("Search Waitlist", async () => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

        const searchTerm = `%${input.query}%`;
        const results: any[] = [];

        if (input.source === "pro" || input.source === "all") {
          const proResult = await db.execute(
            sql`SELECT 'pro' as source, id, firstName, lastName, email, businessName FROM proWaitlist WHERE firstName LIKE ${searchTerm} OR lastName LIKE ${searchTerm} OR email LIKE ${searchTerm} LIMIT 50`
          );
          if (proResult?.[0]) results.push(...proResult[0]);
        }

        if (input.source === "home" || input.source === "all") {
          const homeResult = await db.execute(
            sql`SELECT 'home' as source, id, firstName, lastName, email, address FROM homeWaitlist WHERE firstName LIKE ${searchTerm} OR lastName LIKE ${searchTerm} OR email LIKE ${searchTerm} LIMIT 50`
          );
          if (homeResult?.[0]) results.push(...homeResult[0]);
        }

        return results;
      });
    }),

  exportWaitlist: adminProcedure
    .input(z.object({ source: z.enum(["pro", "home", "all"]) }))
    .query(async ({ input }) => {
      return log.track("Export Waitlist", async () => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

        const results: any = {};

        if (input.source === "pro" || input.source === "all") {
          const proResult = await db.execute(
            sql`SELECT firstName, lastName, email, phone, businessName, businessType, trades, referredBy, createdAt FROM proWaitlist ORDER BY createdAt DESC`
          );
          results.pro = proResult?.[0] || [];
        }

        if (input.source === "home" || input.source === "all") {
          const homeResult = await db.execute(
            sql`SELECT firstName, lastName, email, phone, address, city, state, homeType, desiredProjects, createdAt FROM homeWaitlist ORDER BY createdAt DESC`
          );
          results.home = homeResult?.[0] || [];
        }

        return results;
      });
    }),

  getSignupTrends: adminProcedure.query(async () => {
    return log.track("Get Signup Trends", async () => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const result = await db.execute(
        sql`
        SELECT
          DATE(createdAt) as date,
          'pro' as source,
          COUNT(*) as count
        FROM proWaitlist
        WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        GROUP BY DATE(createdAt)
        ORDER BY date DESC
        `
      );

      return (result?.[0] || []) as Array<{
        date: string;
        source: string;
        count: number;
      }>;
    });
  }),

  approveProWaitlistEntry: adminProcedure
    .input(z.object({ id: z.number(), notes: z.string().optional() }))
    .mutation(async ({ input }) => {
      return log.track("Approve Pro Waitlist", async () => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.execute(sql`
          UPDATE proWaitlist SET status = 'approved', adminNotes = ${input.notes || ""}, approvedAt = NOW() WHERE id = ${input.id}
        `);
        return { success: true };
      });
    }),

  rejectProWaitlistEntry: adminProcedure
    .input(z.object({ id: z.number(), reason: z.string().optional() }))
    .mutation(async ({ input }) => {
      return log.track("Reject Pro Waitlist", async () => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.execute(sql`
          UPDATE proWaitlist SET status = 'rejected', rejectionReason = ${input.reason || ""}, rejectedAt = NOW() WHERE id = ${input.id}
        `);
        return { success: true };
      });
    }),

  // Activate a waitlisted pro into a MATCHABLE partner row.
  // The matching engine only queries the `partners` table, so flipping the
  // proWaitlist status alone is a no-op for matching. This creates/updates a
  // partners row mapped to satisfy every rankPartnersForOpportunity hard filter
  // (status active, businessType = trade, serviceZipCodes JSON array).
  activateProWaitlistEntry: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return log.track("Activate Pro Waitlist", async () => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

        const appRows = await db.execute(sql`
          SELECT id, firstName, lastName, email, phone, businessName, businessType,
                 trades, serviceZipCodes, serviceRadiusMiles, primaryCity, primaryState
          FROM proWaitlist WHERE id = ${input.id} LIMIT 1
        `);
        const app = (appRows?.[0]?.[0] ?? null) as {
          firstName: string; lastName: string; email: string; phone?: string;
          businessName: string; businessType?: string; trades?: unknown;
          serviceZipCodes?: unknown; serviceRadiusMiles?: number;
          primaryCity?: string; primaryState?: string;
        } | null;
        if (!app) throw new TRPCError({ code: "NOT_FOUND", message: "Waitlist entry not found" });

        const { payload, warnings } = buildPartnerActivation(app);
        const contactName = `${app.firstName ?? ""} ${app.lastName ?? ""}`.trim() || app.businessName;
        const zipsJson = JSON.stringify(payload.serviceZipCodes);

        // Link to an existing user if one matches this email.
        const userRows = await db.execute(sql`SELECT id FROM users WHERE email = ${app.email} LIMIT 1`);
        const userId = (userRows?.[0]?.[0] as { id?: number } | undefined)?.id ?? null;

        // Idempotent: update existing partner (by email) into a matchable state,
        // otherwise insert a fresh one.
        const existingRows = await db.execute(sql`SELECT id FROM partners WHERE contactEmail = ${app.email} LIMIT 1`);
        const existingId = (existingRows?.[0]?.[0] as { id?: number } | undefined)?.id ?? null;

        let partnerId: number;
        if (existingId) {
          await db.execute(sql`
            UPDATE partners SET
              businessType = ${payload.businessType},
              serviceArea = ${payload.serviceArea},
              serviceZipCodes = ${zipsJson},
              serviceRadiusMiles = ${payload.serviceRadiusMiles},
              maxZipCodes = ${payload.maxZipCodes},
              status = 'active',
              suspendedAt = NULL,
              approvedAt = NOW(),
              updatedAt = NOW()
            WHERE id = ${existingId}
          `);
          partnerId = existingId;
        } else {
          await db.execute(sql`
            INSERT INTO partners (
              userId, businessName, businessType, serviceArea, serviceZipCodes,
              serviceRadiusMiles, maxZipCodes, contactName, contactEmail, contactPhone,
              status, tier, weeklyLeadCap, appliedAt, approvedAt, updatedAt
            ) VALUES (
              ${userId}, ${app.businessName}, ${payload.businessType}, ${payload.serviceArea},
              ${zipsJson}, ${payload.serviceRadiusMiles}, ${payload.maxZipCodes},
              ${contactName}, ${app.email}, ${app.phone ?? null},
              'active', 'scout', ${payload.weeklyLeadCap}, NOW(), NOW(), NOW()
            )
          `);
          const idRow = await db.execute(sql`SELECT id FROM partners WHERE contactEmail = ${app.email} LIMIT 1`);
          partnerId = Number((idRow?.[0]?.[0] as { id?: number } | undefined)?.id ?? 0);
        }

        await db.execute(sql`
          UPDATE proWaitlist SET status = 'active', activatedAt = NOW() WHERE id = ${input.id}
        `);

        // Auto-initiate the background check on activation. Safe no-op until
        // CHECKR_API_KEY is set (initiateBackgroundCheck catches + returns nulls);
        // never blocks activation.
        let backgroundCheck: { invitationUrl: string | null; candidateId: string | null } =
          { invitationUrl: null, candidateId: null };
        try {
          backgroundCheck = await initiateBackgroundCheck({
            partnerEmail: app.email,
            firstName: app.firstName,
            lastName: app.lastName,
            phone: app.phone,
            partnerId,
          });
        } catch (e) {
          console.warn("[activate] background check init failed (non-fatal):", e);
        }

        return {
          success: true,
          partnerId,
          businessType: payload.businessType,
          serviceZipCodes: payload.serviceZipCodes,
          backgroundCheck,
          warnings,
        };
      });
    }),

  approveHomeWaitlistEntry: adminProcedure
    .input(z.object({ id: z.number(), notes: z.string().optional() }))
    .mutation(async ({ input }) => {
      return log.track("Approve Home Waitlist", async () => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.execute(sql`
          UPDATE homeWaitlist SET status = 'approved', adminNotes = ${input.notes || ""}, approvedAt = NOW() WHERE id = ${input.id}
        `);
        return { success: true };
      });
    }),

  rejectHomeWaitlistEntry: adminProcedure
    .input(z.object({ id: z.number(), reason: z.string().optional() }))
    .mutation(async ({ input }) => {
      return log.track("Reject Home Waitlist", async () => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.execute(sql`
          UPDATE homeWaitlist SET status = 'rejected', rejectionReason = ${input.reason || ""}, rejectedAt = NOW() WHERE id = ${input.id}
        `);
        return { success: true };
      });
    }),

  activateHomeWaitlistEntry: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return log.track("Activate Home Waitlist", async () => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await db.execute(sql`
          UPDATE homeWaitlist SET status = 'active', activatedAt = NOW() WHERE id = ${input.id}
        `);
        return { success: true };
      });
    }),
});
