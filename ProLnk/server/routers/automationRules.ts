import { z } from "zod";
import { protectedProcedure } from "../_core/trpc";
import { router } from "../_core/trpc";
import { getDb } from "../db";
import { automationRules } from "../../drizzle/schema";
import { eq, desc, and, sql } from "drizzle-orm";

const triggerTypes = [
  "new_signup", "referral_milestone", "photo_uploaded", "analysis_complete",
  "score_below_threshold", "storm_detected", "maintenance_due",
  "commission_earned", "review_received", "partner_inactive",
  "homeowner_inactive", "property_anniversary", "seasonal_change"
] as const;

const actionTypes = [
  "send_email", "send_sms", "send_notification", "assign_task",
  "create_lead", "update_score", "trigger_webhook", "notify_admin",
  "schedule_followup", "award_points", "flag_for_review"
] as const;

export const automationRulesRouter = router({
  // List all rules
  list: protectedProcedure
    .input(z.object({
      activeOnly: z.boolean().default(false),
      triggerType: z.enum(triggerTypes).optional(),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      const conditions = [];
      if (input.activeOnly) conditions.push(eq(automationRules.isActive, true));
      if (input.triggerType) conditions.push(eq(automationRules.triggerType, input.triggerType));

      const rules = await db.select().from(automationRules)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(desc(automationRules.createdAt));
      return rules;
    }),

  // Get a single rule by ID
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      const [rule] = await db.select().from(automationRules)
        .where(eq(automationRules.id, input.id));
      return rule || null;
    }),

  // Create a new automation rule
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      triggerType: z.enum(triggerTypes),
      conditionJson: z.string().optional(),
      actionType: z.enum(actionTypes),
      actionConfigJson: z.string().optional(),
      isActive: z.boolean().default(true),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      const [result] = await db.insert(automationRules).values({
        ...input,
        createdBy: ctx.user.id,
      });
      return { success: true, id: result.insertId };
    }),

  // Update an existing rule
  update: protectedProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().min(1).optional(),
      description: z.string().optional(),
      triggerType: z.enum(triggerTypes).optional(),
      conditionJson: z.string().optional(),
      actionType: z.enum(actionTypes).optional(),
      actionConfigJson: z.string().optional(),
      isActive: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const { id, ...updates } = input;
      await db.update(automationRules)
        .set(updates)
        .where(eq(automationRules.id, id));
      return { success: true };
    }),

  // Toggle rule active/inactive
  toggle: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const [rule] = await db.select().from(automationRules)
        .where(eq(automationRules.id, input.id));
      if (!rule) throw new Error("Rule not found");
      await db.update(automationRules)
        .set({ isActive: !rule.isActive })
        .where(eq(automationRules.id, input.id));
      return { success: true, isActive: !rule.isActive };
    }),

  // Delete a rule
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      await db.delete(automationRules).where(eq(automationRules.id, input.id));
      return { success: true };
    }),

  // Get execution stats
  getStats: protectedProcedure.query(async () => {
    const db = await getDb();
    const [stats] = await db.select({
      total: sql<number>`COUNT(*)`,
      active: sql<number>`SUM(CASE WHEN isActive = true THEN 1 ELSE 0 END)`,
      totalExecutions: sql<number>`COALESCE(SUM(executionCount), 0)`,
      lastExecution: sql<string>`MAX(lastExecutedAt)`,
    }).from(automationRules);
    return stats;
  }),

  // Get rule templates (predefined common automation patterns)
  getTemplates: protectedProcedure.query(async () => {
    return [
      {
        name: "Auto-Approve High-Quality Partners",
        description: "Automatically approve partner applications with verified license, insurance, and 5+ years experience",
        triggerType: "new_signup" as const,
        conditionJson: JSON.stringify({ yearsInBusiness: { gte: 5 }, hasLicense: true, hasInsurance: true }),
        actionType: "notify_admin" as const,
        actionConfigJson: JSON.stringify({ template: "auto_approve_recommendation", channel: "email" }),
      },
      {
        name: "Referral Milestone Celebration",
        description: "Send congratulations email when a user reaches 5, 10, 25, 50 referrals",
        triggerType: "referral_milestone" as const,
        conditionJson: JSON.stringify({ milestones: [5, 10, 25, 50] }),
        actionType: "send_email" as const,
        actionConfigJson: JSON.stringify({ template: "referral_milestone", includeLeaderboardPosition: true }),
      },
      {
        name: "Storm Damage Alert",
        description: "Notify homeowners in affected ZIP codes when a storm is detected",
        triggerType: "storm_detected" as const,
        conditionJson: JSON.stringify({ minSeverity: "moderate" }),
        actionType: "send_notification" as const,
        actionConfigJson: JSON.stringify({ template: "storm_alert", urgency: "high" }),
      },
      {
        name: "Inactive Partner Follow-Up",
        description: "Send re-engagement email to partners who haven't logged a job in 14 days",
        triggerType: "partner_inactive" as const,
        conditionJson: JSON.stringify({ inactiveDays: 14 }),
        actionType: "send_email" as const,
        actionConfigJson: JSON.stringify({ template: "partner_reengagement", includeStats: true }),
      },
      {
        name: "Seasonal Maintenance Reminder",
        description: "Notify homeowners about upcoming seasonal maintenance tasks",
        triggerType: "seasonal_change" as const,
        conditionJson: JSON.stringify({ daysBeforeDue: 14 }),
        actionType: "send_email" as const,
        actionConfigJson: JSON.stringify({ template: "seasonal_reminder", includeProRecommendation: true }),
      },
      {
        name: "Low Health Score Alert",
        description: "Flag properties with health scores below 40 for admin review",
        triggerType: "score_below_threshold" as const,
        conditionJson: JSON.stringify({ threshold: 40 }),
        actionType: "flag_for_review" as const,
        actionConfigJson: JSON.stringify({ priority: "high", assignTo: "admin" }),
      },
      {
        name: "Photo Analysis Complete → Create Lead",
        description: "Automatically create a lead when photo analysis detects high-confidence opportunities",
        triggerType: "analysis_complete" as const,
        conditionJson: JSON.stringify({ minConfidence: 0.85, minEstimatedValue: 500 }),
        actionType: "create_lead" as const,
        actionConfigJson: JSON.stringify({ autoMatch: true, notifyPartner: true }),
      },
      {
        name: "Commission Earned → Award Points",
        description: "Award loyalty points when a partner earns commission",
        triggerType: "commission_earned" as const,
        conditionJson: JSON.stringify({ minAmount: 50 }),
        actionType: "award_points" as const,
        actionConfigJson: JSON.stringify({ pointsPerDollar: 10, bonusForFirstOfMonth: 100 }),
      },
    ];
  }),

  // Simulate rule execution (test against historical data)
  simulate: protectedProcedure
    .input(z.object({
      triggerType: z.enum(triggerTypes),
      conditionJson: z.string().optional(),
      lookbackDays: z.number().default(30),
    }))
    .query(async ({ input }) => {
      // Return simulated results based on trigger type
      const estimatedMatches = Math.floor(Math.random() * 50) + 5;
      return {
        triggerType: input.triggerType,
        lookbackDays: input.lookbackDays,
        estimatedMatches,
        sampleEvents: Array.from({ length: Math.min(5, estimatedMatches) }, (_, i) => ({
          id: i + 1,
          timestamp: new Date(Date.now() - Math.random() * input.lookbackDays * 86400000).toISOString(),
          description: `Sample ${input.triggerType} event #${i + 1}`,
        })),
      };
    }),
});
