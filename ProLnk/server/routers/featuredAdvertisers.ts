import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { notifyOwner } from "../_core/notification";
import { sendAdvertiserApplicationReceived } from "../email";
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
  return next({ ctx });
});

export const featuredAdvertisersRouter = router({
  // Admin: list all advertisers
  list: adminProcedure
    .input(z.object({
      status: z.enum(["active", "paused", "cancelled", "pending", "all"]).default("all"),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      let rows: any;
      if (input.status === "all") {
        rows = await db.execute(sql`SELECT * FROM featuredAdvertisers ORDER BY createdAt DESC`) as any;
      } else {
        rows = await db.execute(sql`SELECT * FROM featuredAdvertisers WHERE status = ${input.status} ORDER BY createdAt DESC`) as any;
      }
      const data = Array.isArray(rows[0]) ? rows[0] : rows;
      return data as any[];
    }),

  // Admin: upsert advertiser
  upsert: adminProcedure
    .input(z.object({
      id: z.number().optional(),
      businessName: z.string().min(2),
      contactName: z.string().optional(),
      contactEmail: z.string().email().optional(),
      contactPhone: z.string().optional(),
      category: z.string().min(2),
      zipCodes: z.array(z.string()).min(1),
      monthlyFee: z.number().min(0),
      status: z.enum(["active", "paused", "cancelled", "pending"]).default("pending"),
      bannerTitle: z.string().optional(),
      bannerSubtitle: z.string().optional(),
      bannerCtaText: z.string().optional(),
      bannerCtaUrl: z.string().optional(),
      bannerLogoUrl: z.string().optional(),
      showOnDashboard: z.boolean().default(true),
      showOnScanResults: z.boolean().default(true),
      showInEmails: z.boolean().default(false),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const zipCodesJson = JSON.stringify(input.zipCodes);
      const bn = input.businessName;
      const cn = input.contactName ?? null;
      const ce = input.contactEmail ?? null;
      const cp = input.contactPhone ?? null;
      const cat = input.category;
      const mf = input.monthlyFee;
      const st = input.status;
      const bt = input.bannerTitle ?? null;
      const bs = input.bannerSubtitle ?? null;
      const bct = input.bannerCtaText ?? "Learn More";
      const bcu = input.bannerCtaUrl ?? null;
      const blu = input.bannerLogoUrl ?? null;
      const sod = input.showOnDashboard ? 1 : 0;
      const sos = input.showOnScanResults ? 1 : 0;
      const sie = input.showInEmails ? 1 : 0;
      const sd = input.startDate ?? null;
      const ed = input.endDate ?? null;
      const notes = input.notes ?? null;

      if (input.id) {
        await db.execute(sql`
          UPDATE featuredAdvertisers SET
            businessName=${bn}, contactName=${cn}, contactEmail=${ce}, contactPhone=${cp},
            category=${cat}, zipCodes=${zipCodesJson}, monthlyFee=${mf}, status=${st},
            bannerTitle=${bt}, bannerSubtitle=${bs}, bannerCtaText=${bct}, bannerCtaUrl=${bcu}, bannerLogoUrl=${blu},
            showOnDashboard=${sod}, showOnScanResults=${sos}, showInEmails=${sie},
            startDate=${sd}, endDate=${ed}, notes=${notes}, updatedAt=NOW()
          WHERE id=${input.id}
        `);
        return { id: input.id };
      } else {
        const result = await db.execute(sql`
          INSERT INTO featuredAdvertisers
            (businessName, contactName, contactEmail, contactPhone, category, zipCodes, monthlyFee, status,
             bannerTitle, bannerSubtitle, bannerCtaText, bannerCtaUrl, bannerLogoUrl,
             showOnDashboard, showOnScanResults, showInEmails, startDate, endDate, notes)
          VALUES (${bn},${cn},${ce},${cp},${cat},${zipCodesJson},${mf},${st},
                  ${bt},${bs},${bct},${bcu},${blu},${sod},${sos},${sie},${sd},${ed},${notes})
        `) as any;
        const r = Array.isArray(result[0]) ? result[0] : result;
        return { id: (r as any).insertId ?? 0 };
      }
    }),

  // Admin: delete advertiser
  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.execute(sql`DELETE FROM featuredAdvertisers WHERE id = ${input.id}`);
      return { success: true };
    }),

  // Admin: track impression/click
  trackEvent: protectedProcedure
    .input(z.object({ id: z.number(), event: z.enum(["impression", "click"]) }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return { success: false };
      if (input.event === "impression") {
        await db.execute(sql`UPDATE featuredAdvertisers SET impressions = impressions + 1 WHERE id = ${input.id}`);
      } else {
        await db.execute(sql`UPDATE featuredAdvertisers SET clicks = clicks + 1 WHERE id = ${input.id}`);
      }
      return { success: true };
    }),

  // Public: get active banners for a homeowner's zip code and placement
  getActiveBanners: publicProcedure
    .input(z.object({
      zipCode: z.string().optional(),
      placement: z.enum(["dashboard", "scanResults"]).default("dashboard"),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      let rows: any;
      if (input.placement === "dashboard") {
        rows = await db.execute(sql`
          SELECT id, businessName, category, bannerTitle, bannerSubtitle, bannerCtaText, bannerCtaUrl, bannerLogoUrl, zipCodes
          FROM featuredAdvertisers
          WHERE status = 'active'
            AND (endDate IS NULL OR endDate >= CURDATE())
            AND (startDate IS NULL OR startDate <= CURDATE())
            AND showOnDashboard = 1
          ORDER BY RAND() LIMIT 5
        `) as any;
      } else {
        rows = await db.execute(sql`
          SELECT id, businessName, category, bannerTitle, bannerSubtitle, bannerCtaText, bannerCtaUrl, bannerLogoUrl, zipCodes
          FROM featuredAdvertisers
          WHERE status = 'active'
            AND (endDate IS NULL OR endDate >= CURDATE())
            AND (startDate IS NULL OR startDate <= CURDATE())
            AND showOnScanResults = 1
          ORDER BY RAND() LIMIT 5
        `) as any;
      }
      const data: any[] = Array.isArray(rows[0]) ? rows[0] : rows;
      const filtered = data.filter(a => {
        if (!input.zipCode) return true;
        try {
          const zips: string[] = JSON.parse(a.zipCodes);
          return zips.length === 0 || zips.includes(input.zipCode);
        } catch {
          return true;
        }
      });
      return filtered.slice(0, 2);
    }),

  // Public: self-serve advertiser application submission
  submitApplication: publicProcedure
    .input(z.object({
      businessName: z.string().min(2),
      contactName: z.string().min(2),
      contactEmail: z.string().email(),
      contactPhone: z.string().optional(),
      category: z.string().min(2),
      website: z.string().optional(),
      zipCodes: z.array(z.string()).min(1),
      selectedTier: z.enum(["spotlight", "featured", "exclusive"]),
      message: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const tierFees: Record<string, number> = { spotlight: 199, featured: 349, exclusive: 799 };
      const monthlyFee = tierFees[input.selectedTier];
      const zipCodesJson = JSON.stringify(input.zipCodes);
      const notes = `Tier: ${input.selectedTier}. Website: ${input.website ?? "N/A"}. Message: ${input.message ?? "N/A"}`;
      await db.execute(sql`
        INSERT INTO featuredAdvertisers
          (businessName, contactName, contactEmail, contactPhone, category, zipCodes, monthlyFee, status, notes)
        VALUES (
          ${input.businessName}, ${input.contactName}, ${input.contactEmail},
          ${input.contactPhone ?? null}, ${input.category}, ${zipCodesJson},
          ${monthlyFee}, 'pending', ${notes}
        )
      `);
      await notifyOwner({
        title: "[ProLnk] New Preferred Partner Application",
        content: `**${input.businessName}** applied for the **${input.selectedTier}** plan ($${monthlyFee}/mo).\n\nCategory: ${input.category}\nContact: ${input.contactName} — ${input.contactEmail}\nZip Codes: ${input.zipCodes.join(", ")}${input.website ? `\nWebsite: ${input.website}` : ""}${input.message ? `\nMessage: ${input.message}` : ""}`,
      }).catch(() => {});
      // Send confirmation email to applicant
      await sendAdvertiserApplicationReceived({
        to: input.contactEmail,
        businessName: input.businessName,
        tierName: input.selectedTier.charAt(0).toUpperCase() + input.selectedTier.slice(1),
        dashboardUrl: `${process.env.APP_BASE_URL || 'https://prolnk.io'}/advertise`,
      }).catch(() => {});
      return { success: true };
    }),

  getMyAdCampaign: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;
    const rows = await db.execute(sql`
      SELECT fa.*, p.businessName, p.contactEmail
      FROM featuredAdvertisers fa
      JOIN partners p ON p.id = fa.partnerId
      WHERE p.userId = ${ctx.user.id}
      LIMIT 1
    `) as any;
    const data = Array.isArray(rows[0]) ? rows[0] : rows;
    const campaign = Array.isArray(data) ? data[0] : data;
    if (!campaign) return null;
    const ctr = campaign.impressions > 0 ? (campaign.clicks / campaign.impressions * 100).toFixed(2) : "0.00";
    return { ...campaign, ctr };
  }),

  updateMyCampaign: protectedProcedure
    .input(z.object({
      bannerTitle: z.string().max(100).optional(),
      bannerSubtitle: z.string().max(255).optional(),
      bannerCtaText: z.string().max(50).optional(),
      bannerCtaUrl: z.string().url().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const bt = input.bannerTitle ?? null;
      const bs = input.bannerSubtitle ?? null;
      const bct = input.bannerCtaText ?? null;
      const bcu = input.bannerCtaUrl ?? null;
      await db.execute(sql`
        UPDATE featuredAdvertisers fa
        JOIN partners p ON p.id = fa.partnerId
        SET
          bannerTitle = COALESCE(${bt}, fa.bannerTitle),
          bannerSubtitle = COALESCE(${bs}, fa.bannerSubtitle),
          bannerCtaText = COALESCE(${bct}, fa.bannerCtaText),
          bannerCtaUrl = COALESCE(${bcu}, fa.bannerCtaUrl),
          updatedAt = NOW()
        WHERE p.userId = ${ctx.user.id}
      `);
      return { success: true };
    }),

  // Admin: stats summary
  getStats: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return { total: 0, active: 0, totalMrr: 0, totalImpressions: 0, totalClicks: 0 };
    const rows = await db.execute(sql`
      SELECT
        COUNT(*) as total,
        SUM(status = 'active') as active,
        SUM(monthlyFee) as totalMrr,
        SUM(impressions) as totalImpressions,
        SUM(clicks) as totalClicks
      FROM featuredAdvertisers
    `) as any;
    const data = Array.isArray(rows[0]) ? rows[0] : rows;
    return (Array.isArray(data) ? data[0] : data) ?? { total: 0, active: 0, totalMrr: 0, totalImpressions: 0, totalClicks: 0 };
  }),
});
