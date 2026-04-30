/**
 * Exchange Router — partner-to-partner job marketplace
 * Real DB-backed procedures replacing the mock data in Exchange.tsx
 */
import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { exchangeJobs, exchangeBids, partners, partnerNotifications } from "../../drizzle/schema";
import { eq, desc, and, ne, sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const exchangeRouter = router({
  // List open exchange jobs (public, paginated)
  listJobs: publicProcedure
    .input(z.object({
      tradeCategory: z.string().optional(),
      jobType: z.enum(["residential", "commercial"]).optional(),
      limit: z.number().min(1).max(100).default(50),
      offset: z.number().min(0).default(0),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];
      const conditions = [eq(exchangeJobs.status, "open")];
      if (input.tradeCategory) conditions.push(eq(exchangeJobs.tradeCategory, input.tradeCategory));
      if (input.jobType) conditions.push(eq(exchangeJobs.jobType, input.jobType));
      const jobs = await db
        .select({
          id: exchangeJobs.id,
          title: exchangeJobs.title,
          description: exchangeJobs.description,
          jobType: exchangeJobs.jobType,
          tradeCategory: exchangeJobs.tradeCategory,
          location: exchangeJobs.location,
          totalValue: exchangeJobs.totalValue,
          brokerMargin: exchangeJobs.brokerMargin,
          deadline: exchangeJobs.deadline,
          status: exchangeJobs.status,
          scopeItems: exchangeJobs.scopeItems,
          clientName: exchangeJobs.clientName,
          isCommercial: exchangeJobs.isCommercial,
          bidsCount: exchangeJobs.bidsCount,
          createdAt: exchangeJobs.createdAt,
          postedByBusinessName: partners.businessName,
          postedByTier: partners.tier,
        })
        .from(exchangeJobs)
        .leftJoin(partners, eq(exchangeJobs.postedByPartnerId, partners.id))
        .where(and(...conditions))
        .orderBy(desc(exchangeJobs.createdAt))
        .limit(input.limit)
        .offset(input.offset);
      return jobs.map(j => ({
        ...j,
        scopeItems: j.scopeItems ? JSON.parse(j.scopeItems) : [],
      }));
    }),

  // Post a new exchange job
  postJob: protectedProcedure
    .input(z.object({
      title: z.string().min(5).max(255),
      description: z.string().min(10),
      jobType: z.enum(["residential", "commercial"]),
      tradeCategory: z.string().min(1),
      location: z.string().min(1),
      totalValue: z.number().min(100),
      brokerMargin: z.number().min(0).max(50).default(10),
      deadline: z.string().optional(),
      scopeItems: z.array(z.string()).optional(),
      clientName: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const partner = await db.select({ id: partners.id }).from(partners)
        .where(eq(partners.userId, ctx.user.id)).limit(1);
      if (!partner[0]) throw new TRPCError({ code: "FORBIDDEN", message: "Partner account required" });
      const [result] = await db.insert(exchangeJobs).values({
        postedByPartnerId: partner[0].id,
        title: input.title,
        description: input.description,
        jobType: input.jobType,
        tradeCategory: input.tradeCategory,
        location: input.location,
        totalValue: String(input.totalValue),
        brokerMargin: String(input.brokerMargin),
        deadline: input.deadline ? new Date(input.deadline) : undefined,
        scopeItems: input.scopeItems ? JSON.stringify(input.scopeItems) : undefined,
        clientName: input.clientName,
        isCommercial: input.jobType === "commercial",
      });
      return { id: (result as any).insertId };
    }),

  // Submit a bid on a job
  submitBid: protectedProcedure
    .input(z.object({
      jobId: z.number(),
      bidAmount: z.number().min(1),
      message: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const partner = await db.select({ id: partners.id }).from(partners)
        .where(eq(partners.userId, ctx.user.id)).limit(1);
      if (!partner[0]) throw new TRPCError({ code: "FORBIDDEN", message: "Partner account required" });
      const job = await db.select({ id: exchangeJobs.id, postedByPartnerId: exchangeJobs.postedByPartnerId, status: exchangeJobs.status })
        .from(exchangeJobs).where(eq(exchangeJobs.id, input.jobId)).limit(1);
      if (!job[0]) throw new TRPCError({ code: "NOT_FOUND" });
      if (job[0].status !== "open") throw new TRPCError({ code: "BAD_REQUEST", message: "Job is no longer open" });
      if (job[0].postedByPartnerId === partner[0].id) throw new TRPCError({ code: "BAD_REQUEST", message: "Cannot bid on your own job" });
      await db.insert(exchangeBids).values({
        jobId: input.jobId,
        biddingPartnerId: partner[0].id,
        bidAmount: String(input.bidAmount),
        message: input.message,
      });
      // Increment bid count
      await db.update(exchangeJobs)
        .set({ bidsCount: sql`${exchangeJobs.bidsCount} + 1` })
        .where(eq(exchangeJobs.id, input.jobId));
      return { success: true };
    }),

  // Get my posted jobs
  getMyJobs: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    const partner = await db.select({ id: partners.id }).from(partners)
      .where(eq(partners.userId, ctx.user.id)).limit(1);
    if (!partner[0]) return [];
    return db.select().from(exchangeJobs)
      .where(eq(exchangeJobs.postedByPartnerId, partner[0].id))
      .orderBy(desc(exchangeJobs.createdAt));
  }),

  // Get bids on my jobs
  getMyJobBids: protectedProcedure
    .input(z.object({ jobId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];
      const partner = await db.select({ id: partners.id }).from(partners)
        .where(eq(partners.userId, ctx.user.id)).limit(1);
      if (!partner[0]) return [];
      const job = await db.select({ postedByPartnerId: exchangeJobs.postedByPartnerId })
        .from(exchangeJobs).where(eq(exchangeJobs.id, input.jobId)).limit(1);
      if (!job[0] || job[0].postedByPartnerId !== partner[0].id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      return db.select({
        id: exchangeBids.id,
        bidAmount: exchangeBids.bidAmount,
        message: exchangeBids.message,
        status: exchangeBids.status,
        createdAt: exchangeBids.createdAt,
        biddingPartnerName: partners.businessName,
        biddingPartnerTier: partners.tier,
      })
        .from(exchangeBids)
        .leftJoin(partners, eq(exchangeBids.biddingPartnerId, partners.id))
        .where(eq(exchangeBids.jobId, input.jobId))
        .orderBy(desc(exchangeBids.createdAt));
    }),

  // Award a bid (job poster accepts a bid)
  awardBid: protectedProcedure
    .input(z.object({ bidId: z.number(), jobId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      const partner = await db.select({ id: partners.id }).from(partners)
        .where(eq(partners.userId, ctx.user.id)).limit(1);
      if (!partner[0]) throw new TRPCError({ code: "FORBIDDEN" });
      const job = await db.select({ postedByPartnerId: exchangeJobs.postedByPartnerId })
        .from(exchangeJobs).where(eq(exchangeJobs.id, input.jobId)).limit(1);
      if (!job[0] || job[0].postedByPartnerId !== partner[0].id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }
      // Get bid details to notify the winning bidder
      const bid = await db.select({
        biddingPartnerId: exchangeBids.biddingPartnerId,
        bidAmount: exchangeBids.bidAmount,
      }).from(exchangeBids).where(eq(exchangeBids.id, input.bidId)).limit(1);

      await db.update(exchangeBids).set({ status: "accepted" }).where(eq(exchangeBids.id, input.bidId));
      await db.update(exchangeJobs).set({ status: "awarded" }).where(eq(exchangeJobs.id, input.jobId));

      // Reject all other bids on this job
      await db.update(exchangeBids)
        .set({ status: "rejected" })
        .where(and(eq(exchangeBids.jobId, input.jobId), ne(exchangeBids.id, input.bidId)));

      // Notify the winning bidder
      if (bid[0]) {
        await db.insert(partnerNotifications).values({
          partnerId: bid[0].biddingPartnerId,
          type: "system",
          title: "[SUCCESS] Your bid was accepted!",
          message: `Congratulations! Your bid of $${parseFloat(bid[0].bidAmount).toFixed(2)} was accepted. Check the Exchange for job details and next steps.`,
          actionUrl: `/exchange`,
        });
      }

      return { success: true };
    }),
});
