/**
 * partnerTools.ts — Groups 1 & 2
 * Wires fake-save pages to DB + static pages with real data
 */
import { z } from "zod";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import {
  partnerAvailability,
  partnerJobPreferences,
  partnerOnboardingChecklist,
  networkingEventRegistrations,
  trainingEnrollments,
  skillEnrollments,
  proposals,
  quotes,
  taxEstimates,
  growthProjections,
  contentItems,
  partners,
  partnerNotifications,
} from "../../drizzle/schema";
import { eq, and, desc, asc } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

async function requireDb() {
  const db = await getDb();
  if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
  return db;
}

async function getPartnerId(userId: number): Promise<number> {
  const db = await requireDb();
  const [p] = await db.select({ id: partners.id }).from(partners).where(eq(partners.userId, userId)).limit(1);
  if (!p) throw new TRPCError({ code: "NOT_FOUND", message: "Partner profile not found" });
  return p.id;
}

export const partnerToolsRouter = router({

  // ─── Availability ─────────────────────────────────────────────────────────────
  availability: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      const db = await requireDb();
      const partnerId = await getPartnerId(ctx.user.id);
      return db.select().from(partnerAvailability)
        .where(eq(partnerAvailability.partnerId, partnerId))
        .orderBy(asc(partnerAvailability.dayOfWeek), asc(partnerAvailability.startHour));
    }),
    save: protectedProcedure
      .input(z.array(z.object({
        dayOfWeek: z.number().min(0).max(6),
        startHour: z.number().min(0).max(23),
        endHour: z.number().min(1).max(24),
        isAvailable: z.boolean(),
      })))
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const partnerId = await getPartnerId(ctx.user.id);
        await db.delete(partnerAvailability).where(eq(partnerAvailability.partnerId, partnerId));
        if (input.length > 0) {
          await db.insert(partnerAvailability).values(input.map(s => ({ ...s, partnerId })));
        }
        return { success: true };
      }),
  }),

  // ─── Job Matching Preferences ─────────────────────────────────────────────────
  jobPreferences: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      const db = await requireDb();
      const partnerId = await getPartnerId(ctx.user.id);
      const [prefs] = await db.select().from(partnerJobPreferences)
        .where(eq(partnerJobPreferences.partnerId, partnerId)).limit(1);
      return prefs ?? null;
    }),
    save: protectedProcedure
      .input(z.object({
        serviceCategories: z.array(z.string()),
        maxJobDistance: z.number().min(1).max(200),
        minJobValue: z.string(),
        maxJobValue: z.string().nullable().optional(),
        preferredDays: z.array(z.number().min(0).max(6)),
        acceptsEmergency: z.boolean(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const partnerId = await getPartnerId(ctx.user.id);
        const [existing] = await db.select({ id: partnerJobPreferences.id })
          .from(partnerJobPreferences).where(eq(partnerJobPreferences.partnerId, partnerId)).limit(1);
        if (existing) {
          await db.update(partnerJobPreferences).set({ ...input }).where(eq(partnerJobPreferences.partnerId, partnerId));
        } else {
          await db.insert(partnerJobPreferences).values({ ...input, partnerId });
        }
        return { success: true };
      }),
  }),

  // ─── Onboarding Checklist ─────────────────────────────────────────────────────
  onboarding: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      const db = await requireDb();
      const partnerId = await getPartnerId(ctx.user.id);
      const [checklist] = await db.select().from(partnerOnboardingChecklist)
        .where(eq(partnerOnboardingChecklist.partnerId, partnerId)).limit(1);
      return checklist ?? null;
    }),
    update: protectedProcedure
      .input(z.object({
        profileComplete: z.boolean().optional(),
        payoutConnected: z.boolean().optional(),
        firstReferralSent: z.boolean().optional(),
        trainingComplete: z.boolean().optional(),
        agreementSigned: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const partnerId = await getPartnerId(ctx.user.id);
        const [existing] = await db.select({ id: partnerOnboardingChecklist.id })
          .from(partnerOnboardingChecklist).where(eq(partnerOnboardingChecklist.partnerId, partnerId)).limit(1);
        if (existing) {
          await db.update(partnerOnboardingChecklist).set(input).where(eq(partnerOnboardingChecklist.partnerId, partnerId));
        } else {
          await db.insert(partnerOnboardingChecklist).values({ partnerId, ...input });
        }
        return { success: true };
      }),
  }),

  // ─── Networking Events ────────────────────────────────────────────────────────
  events: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const db = await requireDb();
      const partnerId = await getPartnerId(ctx.user.id);
      return db.select().from(networkingEventRegistrations)
        .where(eq(networkingEventRegistrations.partnerId, partnerId))
        .orderBy(desc(networkingEventRegistrations.eventDate));
    }),
    register: protectedProcedure
      .input(z.object({
        eventName: z.string().min(1),
        eventDate: z.string(),
        location: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const partnerId = await getPartnerId(ctx.user.id);
        const [reg] = await db.insert(networkingEventRegistrations).values({
          partnerId,
          eventName: input.eventName,
          eventDate: new Date(input.eventDate),
          location: input.location,
        }).$returningId();
        // Confirmation notification
        await db.insert(partnerNotifications).values({
          partnerId,
          type: "system",
          title: "Event registration confirmed",
          message: `You're registered for "${input.eventName}" on ${new Date(input.eventDate).toLocaleDateString()}${input.location ? ` at ${input.location}` : ""}.`,
          actionUrl: "/dashboard/events",
        });
        return { success: true, id: reg.id };
      }),
    cancel: protectedProcedure
      .input(z.object({ registrationId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const partnerId = await getPartnerId(ctx.user.id);
        await db.update(networkingEventRegistrations).set({ status: "cancelled" })
          .where(and(eq(networkingEventRegistrations.id, input.registrationId), eq(networkingEventRegistrations.partnerId, partnerId)));
        return { success: true };
      }),
  }),

  // ─── Training Academy ─────────────────────────────────────────────────────────
  training: router({
    myEnrollments: protectedProcedure.query(async ({ ctx }) => {
      const db = await requireDb();
      const partnerId = await getPartnerId(ctx.user.id);
      return db.select().from(trainingEnrollments)
        .where(eq(trainingEnrollments.partnerId, partnerId))
        .orderBy(desc(trainingEnrollments.createdAt));
    }),
    enroll: protectedProcedure
      .input(z.object({ courseId: z.string(), courseName: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const partnerId = await getPartnerId(ctx.user.id);
        const [existing] = await db.select({ id: trainingEnrollments.id }).from(trainingEnrollments)
          .where(and(eq(trainingEnrollments.partnerId, partnerId), eq(trainingEnrollments.courseId, input.courseId))).limit(1);
        if (existing) return { success: true, alreadyEnrolled: true };
        const [enrollment] = await db.insert(trainingEnrollments).values({ partnerId, ...input }).$returningId();
        return { success: true, id: enrollment.id, alreadyEnrolled: false };
      }),
    updateProgress: protectedProcedure
      .input(z.object({ enrollmentId: z.number(), progress: z.number().min(0).max(100) }))
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const partnerId = await getPartnerId(ctx.user.id);
        const updates: Record<string, unknown> = { progress: input.progress };
        if (input.progress >= 100) { updates.status = "completed"; updates.completedAt = new Date(); }
        else if (input.progress > 0) { updates.status = "in_progress"; }
        await db.update(trainingEnrollments).set(updates)
          .where(and(eq(trainingEnrollments.id, input.enrollmentId), eq(trainingEnrollments.partnerId, partnerId)));
        return { success: true };
      }),
  }),

  // ─── Skills Marketplace ───────────────────────────────────────────────────────
  skills: router({
    mySkills: protectedProcedure.query(async ({ ctx }) => {
      const db = await requireDb();
      const partnerId = await getPartnerId(ctx.user.id);
      return db.select().from(skillEnrollments)
        .where(eq(skillEnrollments.partnerId, partnerId))
        .orderBy(desc(skillEnrollments.createdAt));
    }),
    enroll: protectedProcedure
      .input(z.object({ skillId: z.string(), skillName: z.string(), price: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const partnerId = await getPartnerId(ctx.user.id);
        const [existing] = await db.select({ id: skillEnrollments.id }).from(skillEnrollments)
          .where(and(eq(skillEnrollments.partnerId, partnerId), eq(skillEnrollments.skillId, input.skillId), eq(skillEnrollments.status, "active"))).limit(1);
        if (existing) return { success: true, alreadyEnrolled: true };
        const [enrollment] = await db.insert(skillEnrollments).values({ partnerId, ...input }).$returningId();
        return { success: true, id: enrollment.id, alreadyEnrolled: false };
      }),
  }),

  // ─── Proposals ────────────────────────────────────────────────────────────────
  proposals: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const db = await requireDb();
      const partnerId = await getPartnerId(ctx.user.id);
      return db.select().from(proposals).where(eq(proposals.partnerId, partnerId)).orderBy(desc(proposals.createdAt));
    }),
    create: protectedProcedure
      .input(z.object({
        clientName: z.string().min(1),
        clientEmail: z.string().email().optional(),
        clientPhone: z.string().optional(),
        title: z.string().min(1),
        description: z.string().optional(),
        lineItems: z.array(z.object({ description: z.string(), qty: z.number(), unitPrice: z.number() })),
        totalAmount: z.string(),
        notes: z.string().optional(),
        expiresAt: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const partnerId = await getPartnerId(ctx.user.id);
        const [p] = await db.insert(proposals).values({
          partnerId, ...input,
          expiresAt: input.expiresAt ? new Date(input.expiresAt) : undefined,
        }).$returningId();
        return { success: true, id: p.id };
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        clientName: z.string().optional(),
        clientEmail: z.string().email().optional(),
        title: z.string().optional(),
        description: z.string().optional(),
        lineItems: z.array(z.object({ description: z.string(), qty: z.number(), unitPrice: z.number() })).optional(),
        totalAmount: z.string().optional(),
        notes: z.string().optional(),
        status: z.enum(["draft", "sent", "viewed", "accepted", "rejected", "expired"]).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const partnerId = await getPartnerId(ctx.user.id);
        const { id, ...updates } = input;
        await db.update(proposals).set(updates).where(and(eq(proposals.id, id), eq(proposals.partnerId, partnerId)));
        return { success: true };
      }),
    send: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const partnerId = await getPartnerId(ctx.user.id);
        const [prop] = await db.select({ clientName: proposals.clientName, title: proposals.title })
          .from(proposals).where(and(eq(proposals.id, input.id), eq(proposals.partnerId, partnerId))).limit(1);
        await db.update(proposals).set({ status: "sent", sentAt: new Date() })
          .where(and(eq(proposals.id, input.id), eq(proposals.partnerId, partnerId)));
        // Notify partner that proposal was sent
        if (prop) {
          await db.insert(partnerNotifications).values({
            partnerId,
            type: "system",
            title: "Proposal sent",
            message: `Your proposal "${prop.title}" was sent to ${prop.clientName}.`,
            actionUrl: "/dashboard/quote-builder",
          });
        }
        return { success: true };
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const partnerId = await getPartnerId(ctx.user.id);
        await db.delete(proposals).where(and(eq(proposals.id, input.id), eq(proposals.partnerId, partnerId)));
        return { success: true };
      }),
  }),

  // ─── Quotes ───────────────────────────────────────────────────────────────────
  quotes: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const db = await requireDb();
      const partnerId = await getPartnerId(ctx.user.id);
      return db.select().from(quotes).where(eq(quotes.partnerId, partnerId)).orderBy(desc(quotes.createdAt));
    }),
    create: protectedProcedure
      .input(z.object({
        clientName: z.string().min(1),
        clientEmail: z.string().email().optional(),
        serviceCategory: z.string().optional(),
        description: z.string().optional(),
        estimatedAmount: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const partnerId = await getPartnerId(ctx.user.id);
        const [q] = await db.insert(quotes).values({ partnerId, ...input }).$returningId();
        return { success: true, id: q.id };
      }),
    send: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const partnerId = await getPartnerId(ctx.user.id);
        const [qt] = await db.select({ clientName: quotes.clientName, serviceCategory: quotes.serviceCategory })
          .from(quotes).where(and(eq(quotes.id, input.id), eq(quotes.partnerId, partnerId))).limit(1);
        await db.update(quotes).set({ status: "sent", sentAt: new Date() })
          .where(and(eq(quotes.id, input.id), eq(quotes.partnerId, partnerId)));
        if (qt) {
          await db.insert(partnerNotifications).values({
            partnerId,
            type: "system",
            title: "Quote sent",
            message: `Your quote for ${qt.clientName}${qt.serviceCategory ? ` (${qt.serviceCategory})` : ""} was sent successfully.`,
            actionUrl: "/dashboard/quote-generator",
          });
        }
        return { success: true };
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const partnerId = await getPartnerId(ctx.user.id);
        await db.delete(quotes).where(and(eq(quotes.id, input.id), eq(quotes.partnerId, partnerId)));
        return { success: true };
      }),
  }),

  // ─── Tax Estimator ────────────────────────────────────────────────────────────
  taxEstimates: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const db = await requireDb();
      const partnerId = await getPartnerId(ctx.user.id);
      return db.select().from(taxEstimates).where(eq(taxEstimates.partnerId, partnerId))
        .orderBy(desc(taxEstimates.year), desc(taxEstimates.createdAt));
    }),
    save: protectedProcedure
      .input(z.object({
        year: z.number().min(2020).max(2030),
        grossRevenue: z.string(),
        deductions: z.string(),
        estimatedTax: z.string(),
        effectiveRate: z.string(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const partnerId = await getPartnerId(ctx.user.id);
        const [est] = await db.insert(taxEstimates).values({ partnerId, ...input }).$returningId();
        return { success: true, id: est.id };
      }),
  }),

  // ─── Growth Projections ───────────────────────────────────────────────────────
  growthProjections: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      const db = await requireDb();
      const partnerId = await getPartnerId(ctx.user.id);
      return db.select().from(growthProjections).where(eq(growthProjections.partnerId, partnerId))
        .orderBy(desc(growthProjections.createdAt));
    }),
    save: protectedProcedure
      .input(z.object({
        currentMonthlyRevenue: z.string(),
        targetGrowthPct: z.string(),
        projectedRevenue12m: z.string(),
        referralGoal: z.number().min(0),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await requireDb();
        const partnerId = await getPartnerId(ctx.user.id);
        const [proj] = await db.insert(growthProjections).values({ partnerId, ...input }).$returningId();
        return { success: true, id: proj.id };
      }),
  }),

  // ─── Content Items (WhatsNew, UpsellPlaybook, TrainingHub, ResourceCenter) ────
  content: router({
    list: publicProcedure
      .input(z.object({
        contentType: z.enum(["announcement", "playbook_tip", "training_module", "resource_link"]),
        category: z.string().optional(),
      }))
      .query(async ({ input }) => {
        const db = await requireDb();
        return db.select().from(contentItems)
          .where(and(eq(contentItems.contentType, input.contentType), eq(contentItems.isPublished, true)))
          .orderBy(asc(contentItems.sortOrder), desc(contentItems.publishedAt));
      }),

    adminList: protectedProcedure
      .input(z.object({
        contentType: z.enum(["announcement", "playbook_tip", "training_module", "resource_link"]).optional(),
      }))
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const db = await requireDb();
        if (input.contentType) {
          return db.select().from(contentItems)
            .where(eq(contentItems.contentType, input.contentType))
            .orderBy(desc(contentItems.createdAt));
        }
        return db.select().from(contentItems).orderBy(desc(contentItems.createdAt));
      }),

    create: protectedProcedure
      .input(z.object({
        contentType: z.enum(["announcement", "playbook_tip", "training_module", "resource_link"]),
        title: z.string().min(1),
        body: z.string().optional(),
        url: z.string().url().optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        isPublished: z.boolean().default(false),
        sortOrder: z.number().default(0),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const db = await requireDb();
        const [item] = await db.insert(contentItems).values({
          ...input,
          publishedAt: input.isPublished ? new Date() : undefined,
          createdBy: ctx.user.id,
        }).$returningId();
        return { success: true, id: item.id };
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        body: z.string().optional(),
        url: z.string().url().optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        isPublished: z.boolean().optional(),
        sortOrder: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const db = await requireDb();
        const { id, ...updates } = input;
        const finalUpdates: Record<string, unknown> = { ...updates };
        if (updates.isPublished === true) finalUpdates.publishedAt = new Date();
        await db.update(contentItems).set(finalUpdates).where(eq(contentItems.id, id));
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const db = await requireDb();
        await db.delete(contentItems).where(eq(contentItems.id, input.id));
        return { success: true };
      }),
  }),
});
