import { z } from "zod";
import { protectedProcedure } from "../_core/trpc";
import { router } from "../_core/trpc";
import { getDb } from "../db";
import { seasonalMaintenanceTasks } from "../../drizzle/schema";
import { eq, and, desc, sql } from "drizzle-orm";

export const seasonalMaintenanceRouter = router({
  // Get tasks for a property
  getTasksByProperty: protectedProcedure
    .input(z.object({ propertyId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      const tasks = await db.select().from(seasonalMaintenanceTasks)
        .where(eq(seasonalMaintenanceTasks.propertyId, input.propertyId))
        .orderBy(seasonalMaintenanceTasks.dueMonth);
      return tasks;
    }),

  // Get tasks for a user across all properties
  getMyTasks: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    const tasks = await db.select().from(seasonalMaintenanceTasks)
      .where(eq(seasonalMaintenanceTasks.userId, ctx.user.id))
      .orderBy(seasonalMaintenanceTasks.dueMonth);
    return tasks;
  }),

  // Get tasks by season
  getTasksBySeason: protectedProcedure
    .input(z.object({
      season: z.enum(["spring", "summer", "fall", "winter"]),
      propertyId: z.number().optional(),
    }))
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      const conditions = [
        eq(seasonalMaintenanceTasks.season, input.season),
        eq(seasonalMaintenanceTasks.userId, ctx.user.id),
      ];
      if (input.propertyId) {
        conditions.push(eq(seasonalMaintenanceTasks.propertyId, input.propertyId));
      }
      const tasks = await db.select().from(seasonalMaintenanceTasks)
        .where(and(...conditions))
        .orderBy(seasonalMaintenanceTasks.priority);
      return tasks;
    }),

  // Create a maintenance task
  createTask: protectedProcedure
    .input(z.object({
      propertyId: z.number(),
      taskName: z.string().min(1),
      description: z.string().optional(),
      category: z.enum(["hvac", "roof", "plumbing", "electrical", "exterior", "interior", "landscaping", "pest_control", "appliance"]),
      season: z.enum(["spring", "summer", "fall", "winter"]),
      dueMonth: z.number().min(1).max(12).optional(),
      priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
      estimatedCost: z.number().optional(),
      assignedPartnerId: z.number().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      const [result] = await db.insert(seasonalMaintenanceTasks).values({
        ...input,
        userId: ctx.user.id,
        status: "pending",
      });
      return { success: true, id: result.insertId };
    }),

  // Update task status
  updateTaskStatus: protectedProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["pending", "scheduled", "in_progress", "completed", "skipped"]),
      completedAt: z.date().optional(),
      actualCost: z.number().optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      const { id, ...updates } = input;
      await db.update(seasonalMaintenanceTasks)
        .set(updates)
        .where(eq(seasonalMaintenanceTasks.id, id));
      return { success: true };
    }),

  // Generate default seasonal tasks for a property
  generateDefaultTasks: protectedProcedure
    .input(z.object({ propertyId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      const defaultTasks = [
        // Spring
        { taskName: "HVAC Spring Tune-Up", category: "hvac" as const, season: "spring" as const, dueMonth: 3, priority: "high" as const, description: "Schedule annual AC inspection and filter replacement before summer heat" },
        { taskName: "Gutter Cleaning", category: "exterior" as const, season: "spring" as const, dueMonth: 3, priority: "medium" as const, description: "Clear gutters and downspouts of winter debris" },
        { taskName: "Roof Inspection", category: "roof" as const, season: "spring" as const, dueMonth: 4, priority: "high" as const, description: "Check for winter storm damage, missing shingles, and flashing issues" },
        { taskName: "Irrigation System Check", category: "landscaping" as const, season: "spring" as const, dueMonth: 3, priority: "medium" as const, description: "Test sprinkler heads, check for leaks, adjust coverage" },
        { taskName: "Pest Prevention Treatment", category: "pest_control" as const, season: "spring" as const, dueMonth: 4, priority: "medium" as const, description: "Schedule preventive pest treatment before bug season" },
        // Summer
        { taskName: "AC Filter Replacement", category: "hvac" as const, season: "summer" as const, dueMonth: 6, priority: "high" as const, description: "Replace AC filters for peak summer performance" },
        { taskName: "Exterior Paint Touch-Up", category: "exterior" as const, season: "summer" as const, dueMonth: 6, priority: "low" as const, description: "Touch up exterior paint before fall weather" },
        { taskName: "Window Seal Inspection", category: "interior" as const, season: "summer" as const, dueMonth: 7, priority: "medium" as const, description: "Check window seals for energy efficiency" },
        // Fall
        { taskName: "HVAC Fall Tune-Up", category: "hvac" as const, season: "fall" as const, dueMonth: 9, priority: "high" as const, description: "Schedule furnace inspection before winter" },
        { taskName: "Gutter Cleaning (Fall)", category: "exterior" as const, season: "fall" as const, dueMonth: 11, priority: "medium" as const, description: "Clear fall leaves from gutters and downspouts" },
        { taskName: "Water Heater Flush", category: "plumbing" as const, season: "fall" as const, dueMonth: 10, priority: "medium" as const, description: "Flush water heater to remove sediment buildup" },
        { taskName: "Weatherstripping Check", category: "interior" as const, season: "fall" as const, dueMonth: 10, priority: "medium" as const, description: "Replace worn weatherstripping on doors and windows" },
        // Winter
        { taskName: "Pipe Insulation Check", category: "plumbing" as const, season: "winter" as const, dueMonth: 12, priority: "high" as const, description: "Ensure exposed pipes are insulated against freezing" },
        { taskName: "Smoke/CO Detector Test", category: "electrical" as const, season: "winter" as const, dueMonth: 1, priority: "high" as const, description: "Test all smoke and carbon monoxide detectors, replace batteries" },
        { taskName: "Appliance Deep Clean", category: "appliance" as const, season: "winter" as const, dueMonth: 1, priority: "low" as const, description: "Deep clean oven, dishwasher, and refrigerator coils" },
      ];

      const values = defaultTasks.map(task => ({
        ...task,
        propertyId: input.propertyId,
        userId: ctx.user.id,
        status: "pending" as const,
      }));

      await db.insert(seasonalMaintenanceTasks).values(values);
      return { success: true, count: values.length };
    }),

  // Get maintenance calendar summary
  getCalendarSummary: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    const [summary] = await db.select({
      total: sql<number>`COUNT(*)`,
      pending: sql<number>`SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END)`,
      completed: sql<number>`SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END)`,
      overdue: sql<number>`SUM(CASE WHEN status = 'pending' AND dueMonth < MONTH(CURDATE()) THEN 1 ELSE 0 END)`,
      thisMonth: sql<number>`SUM(CASE WHEN dueMonth = MONTH(CURDATE()) THEN 1 ELSE 0 END)`,
    }).from(seasonalMaintenanceTasks)
      .where(eq(seasonalMaintenanceTasks.userId, ctx.user.id));
    return summary;
  }),
});
