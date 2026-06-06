/**
 * Exchange Router — partner-to-partner job marketplace
 * Real DB-backed procedures replacing the mock data in Exchange.tsx
 */
import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { firstRow } from "../_core/dbRows";
import { exchangeJobs, exchangeBids, partners, partnerNotifications, opportunities } from "../../drizzle/schema";
import { eq, desc, and, ne, sql, inArray } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { notifyOwner } from "../_core/notification";
import { decomposeProject } from "../exchange-decomposition";
import { createOfferForOpportunity, ensureJobOffersInfra } from "./matching";

export const exchangeRouter = router({
  // Pre-launch public job submission — stores via owner notification, no auth required
  publicPostJob: publicProcedure
    .input(z.object({
      title: z.string().min(5).max(255),
      tradeCategory: z.string().min(1),
      description: z.string().min(20),
      budgetRange: z.string().min(1),
      city: z.string().min(1),
      state: z.string().min(2).max(2),
      zip: z.string().min(5).max(5),
      startDate: z.string().optional(),
      bidDeadline: z.string().optional(),
      contactEmail: z.string().email(),
      notifyWhenLive: z.boolean().default(false),
    }))
    .mutation(async ({ input }) => {
      const location = `${input.city}, ${input.state} ${input.zip}`;
      await notifyOwner({
        title: `New Exchange Job Posted: ${input.title}`,
        content: `**Trade:** ${input.tradeCategory}\n**Location:** ${location}\n**Budget:** ${input.budgetRange}\n**Start Date:** ${input.startDate || "TBD"}\n**Bid Deadline:** ${input.bidDeadline || "TBD"}\n**Contact:** ${input.contactEmail}\n**Notify when live:** ${input.notifyWhenLive ? "Yes" : "No"}\n\n**Description:**\n${input.description}`,
      }).catch(() => {});
      return { success: true, jobId: `job_${Date.now()}` };
    }),

  // Pre-launch public bid expression — notify owner, no auth required
  publicSubmitBid: publicProcedure
    .input(z.object({
      jobId: z.number(),
      jobTitle: z.string(),
      name: z.string().min(1).max(255),
      email: z.string().email(),
      message: z.string().min(1),
    }))
    .mutation(async ({ input }) => {
      await notifyOwner({
        title: `New Bid Expression: Job #${input.jobId}`,
        content: `**Job:** ${input.jobTitle}\n**Bidder:** ${input.name}\n**Email:** ${input.email}\n\n**Message:**\n${input.message}`,
      }).catch(() => {});
      return { success: true };
    }),

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

  // -- Multi-trade Exchange decomposition -----------------------------------
  // A Scout (or homeowner) posts a large multi-trade project. AI breaks it into
  // trade components; each becomes its own FIXED-price child opportunity that is
  // routed to the best-matched pro through the existing offer/accept/cascade system.
  postProject: protectedProcedure
    .input(z.object({
      scope: z.string().min(10),
      // Homeowner-approved total. ProLnk takes its % off this full approved value.
      approvedTotal: z.number().min(100),
      // Total the Scout posts components against (margin = approvedTotal - postedTotal).
      // Defaults to approvedTotal when omitted (no margin held back).
      postedTotal: z.number().min(100).optional(),
      zip: z.string().min(3).max(20),
      address: z.string().optional(),
      title: z.string().max(255).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
      await ensureJobOffersInfra();

      const postedTotal = input.postedTotal ?? input.approvedTotal;
      if (postedTotal > input.approvedTotal) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Posted total cannot exceed approved total" });
      }

      const { components, decomposed } = await decomposeProject({
        scope: input.scope,
        totalValue: postedTotal,
        propertyZip: input.zip,
        address: input.address,
      });

      const submittedByUserId = ctx.user?.id ?? null;
      const title = input.title?.trim() || input.scope.slice(0, 120);

      // Parent project opportunity (status "project" — never offered directly).
      const parentIdRow = await (db as any).execute(sql`SELECT NEXTVAL(\`seq_opportunities\`) AS id`);
      const parentId = Number(firstRow(parentIdRow)?.id) as number;
      await (db as any).execute(
        sql`INSERT INTO opportunities
           (id, intakeSource, opportunityType, opportunityCategory, description,
            jobZip, jobAddress, estimatedJobValue, submittedByUserId,
            approvedProjectValue, postedComponentTotal,
            adminReviewStatus, status, routingPosition)
         VALUES (${parentId}, 'exchange', 'Project', 'Project', ${title}, ${input.zip}, ${input.address ?? null}, ${String(input.approvedTotal)}, ${submittedByUserId}, ${String(input.approvedTotal)}, ${String(postedTotal)}, 'approved', 'project', 0)`
      );
      if (!parentId) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create project" });

      const childResults: Array<{ opportunityId: number; trade: string; estimatedValue: number; offerId: number | null }> = [];
      for (const c of components) {
        const childIdRow = await (db as any).execute(sql`SELECT NEXTVAL(\`seq_opportunities\`) AS id`);
        const childId = Number(firstRow(childIdRow)?.id) as number;
        await (db as any).execute(
          sql`INSERT INTO opportunities
             (id, intakeSource, opportunityType, opportunityCategory, description,
              jobZip, jobAddress, estimatedJobValue, submittedByUserId,
              parentOpportunityId, adminReviewStatus, status, routingPosition)
           VALUES (${childId}, 'exchange', ${c.trade}, ${c.trade}, ${c.description}, ${input.zip}, ${input.address ?? null}, ${String(c.estimatedValue)}, ${submittedByUserId}, ${parentId}, 'approved', 'new', 0)`
        );
        let offerId: number | null = null;
        if (childId) {
          try {
            // Reuse the existing matching/cascade engine — best match first, 24h, cascade on decline.
            offerId = await createOfferForOpportunity(childId);
          } catch (err) {
            console.warn("[exchange.postProject] auto-offer failed for child", childId, err);
          }
        }
        childResults.push({ opportunityId: childId, trade: c.trade, estimatedValue: c.estimatedValue, offerId });
      }

      try {
        await notifyOwner({
          title: `New Exchange Project Posted: ${title}`,
          content: `Approved $${input.approvedTotal} / posted $${postedTotal} / ${components.length} trade components in ${input.zip}.`,
        });
      } catch {}

      return {
        projectId: parentId,
        decomposed,
        approvedTotal: input.approvedTotal,
        postedTotal,
        scoutMargin: Math.round((input.approvedTotal - postedTotal) * 100) / 100,
        components: childResults,
      };
    }),

  // Watch a project assemble: parent + each child's status and assigned pro.
  getProject: protectedProcedure
    .input(z.object({ projectId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [parent] = await db
        .select({
          id: opportunities.id,
          description: opportunities.description,
          jobZip: opportunities.jobZip,
          jobAddress: opportunities.jobAddress,
          status: opportunities.status,
          approvedProjectValue: opportunities.approvedProjectValue,
          postedComponentTotal: opportunities.postedComponentTotal,
          createdAt: opportunities.createdAt,
        })
        .from(opportunities)
        .where(eq(opportunities.id, input.projectId))
        .limit(1);
      if (!parent) throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" });

      const children = await db
        .select({
          id: opportunities.id,
          trade: opportunities.opportunityCategory,
          description: opportunities.description,
          estimatedValue: opportunities.estimatedJobValue,
          status: opportunities.status,
          assignedPartnerId: opportunities.assignedPartnerId,
          receivingPartnerId: opportunities.receivingPartnerId,
        })
        .from(opportunities)
        .where(eq(opportunities.parentOpportunityId, input.projectId))
        .orderBy(opportunities.id);

      const partnerIds = Array.from(
        new Set(
          children
            .map((c) => c.assignedPartnerId ?? c.receivingPartnerId)
            .filter((x): x is number => typeof x === "number")
        )
      );
      const partnerRows = partnerIds.length
        ? await db
            .select({ id: partners.id, businessName: partners.businessName, tier: partners.tier })
            .from(partners)
            .where(inArray(partners.id, partnerIds))
        : [];
      const partnerById = new Map(partnerRows.map((p) => [p.id, p]));

      const approved = parent.approvedProjectValue != null ? Number(parent.approvedProjectValue) : null;
      const posted = parent.postedComponentTotal != null ? Number(parent.postedComponentTotal) : null;

      return {
        id: parent.id,
        title: parent.description,
        zip: parent.jobZip,
        address: parent.jobAddress,
        status: parent.status,
        approvedTotal: approved,
        postedTotal: posted,
        scoutMargin: approved != null && posted != null ? Math.round((approved - posted) * 100) / 100 : null,
        createdAt: parent.createdAt,
        components: children.map((c) => {
          const pid = c.assignedPartnerId ?? c.receivingPartnerId;
          const p = pid != null ? partnerById.get(pid) : undefined;
          return {
            opportunityId: c.id,
            trade: c.trade,
            description: c.description,
            estimatedValue: c.estimatedValue != null ? Number(c.estimatedValue) : null,
            status: c.status,
            assignedPartner: p ? { id: p.id, businessName: p.businessName, tier: p.tier } : null,
          };
        }),
      };
    }),
});
