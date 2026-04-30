/**
 * homeownerExtras.ts
 * Additional homeowner procedures for features that were previously static:
 * - Document Vault (upload/list/delete documents)
 * - Savings Tracker (log savings from deals)
 * - Emergency Services (find emergency partners)
 * - Neighborhood Deals (group discount requests)
 * - Notification Settings (homeowner prefs)
 * - Job Timeline (homeowner job history with status)
 * - Property Comparison (compare own property to area)
 * - Seasonal Prep Guide (AI-generated seasonal checklist)
 * - True Cost Guide (AI cost estimates for services)
 * - Home Value Impact (track improvements vs value)
 * - Contractor Comparison (compare quotes side-by-side)
 * - Maintenance Schedule (upcoming maintenance tasks)
 */

import { router, protectedProcedure } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getDb } from "../db";
import { sql, eq, desc, and } from "drizzle-orm";
import {
  homeHealthVaultEntries,
  homeMaintenanceLogs,
  homeownerNotifications,
  homeownerProfiles,
  properties,
  partners,
  jobs,
  customerDeals,
  quickQuoteRequests,
  homeownerFavorites,
} from "../../drizzle/schema";
import { invokeLLM } from "../_core/llm";

export const homeownerExtrasRouter = router({

  // ─── Document Vault ────────────────────────────────────────────────────────
  // Uses homeHealthVaultEntries as document storage (type = 'document')
  getDocuments: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    try {
      const rows = await db.execute(
        sql`SELECT hve.* FROM homeHealthVaultEntries hve
            JOIN homeSystemHealth hsh ON hve.systemHealthId = hsh.id
            JOIN properties p ON hsh.propertyId = p.id
            JOIN homeownerProfiles hp ON p.ownerId = hp.id
            WHERE hp.userId = ${ctx.user.id}
            ORDER BY hve.createdAt DESC LIMIT 100`
      ) as any;
      return (Array.isArray(rows[0]) ? rows[0] : rows) as any[];
    } catch { return []; }
  }),

  saveDocument: protectedProcedure
    .input(z.object({
      title: z.string().min(1).max(200),
      category: z.enum(['warranty', 'permit', 'receipt', 'insurance', 'manual', 'contract', 'inspection', 'photo', 'other']),
      fileUrl: z.string().url().optional(),
      notes: z.string().max(1000).optional(),
      propertyId: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      // Get or create a "Documents" system health entry for the property
      const profileRows = await db.execute(
        sql`SELECT id FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
      ) as any;
      const profileId = profileRows[0]?.[0]?.id ?? profileRows[0]?.id;
      if (!profileId) throw new TRPCError({ code: 'NOT_FOUND' });

      // Find primary property if not specified
      let propId = input.propertyId;
      if (!propId) {
        const propRows = await db.execute(
          sql`SELECT id FROM properties WHERE ownerId = ${profileId} AND isPrimary = 1 LIMIT 1`
        ) as any;
        propId = propRows[0]?.[0]?.id ?? propRows[0]?.id;
      }
      if (!propId) throw new TRPCError({ code: 'NOT_FOUND', message: 'No property found. Please add your home first.' });

      // Get or create a "Documents" system health record
      let sysHealthId: number;
      const sysRows = await db.execute(
        sql`SELECT id FROM homeSystemHealth WHERE propertyId = ${propId} AND systemType = 'documents' LIMIT 1`
      ) as any;
      const sysRow = sysRows[0]?.[0] ?? sysRows[0];
      if (sysRow) {
        sysHealthId = Number(sysRow.id);
      } else {
        const ins = await db.execute(
          sql`INSERT INTO homeSystemHealth (propertyId, systemType, systemLabel, \`condition\`, healthScore)
              VALUES (${propId}, 'documents', 'Document Vault', 'good', 100)`
        ) as any;
        sysHealthId = Number((ins as any).insertId ?? ins[0]?.insertId ?? 0);
      }

      await db.execute(
        sql`INSERT INTO homeHealthVaultEntries
          (systemHealthId, entryType, title, description, fileUrl, fileType, createdAt)
          VALUES (${sysHealthId}, ${input.category}, ${input.title}, ${input.notes ?? null}, ${input.fileUrl ?? null}, 'document', NOW())`
      );
      return { success: true };
    }),

  // ─── Savings Tracker ───────────────────────────────────────────────────────
  getSavingsData: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { totalSaved: 0, deals: [] };
    try {
      // Get completed deals with savings data
      const rows = await db.execute(
        sql`SELECT cd.*, p.businessName as partnerName, p.trade
            FROM customerDeals cd
            LEFT JOIN partners p ON cd.partnerId = p.id
            WHERE cd.homeownerUserId = ${ctx.user.id}
              AND cd.status IN ('completed', 'accepted')
            ORDER BY cd.createdAt DESC LIMIT 50`
      ) as any;
      const deals = (Array.isArray(rows[0]) ? rows[0] : rows) as any[];
      const totalSaved = deals.reduce((sum: number, d: any) => {
        const orig = Number(d.originalPrice ?? 0);
        const final = Number(d.dealPrice ?? d.finalPrice ?? orig);
        return sum + Math.max(0, orig - final);
      }, 0);
      return { totalSaved, deals };
    } catch { return { totalSaved: 0, deals: [] }; }
  }),

  // ─── Emergency Services ────────────────────────────────────────────────────
  getEmergencyPartners: protectedProcedure
    .input(z.object({ zipCode: z.string().optional(), category: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];
      try {
        // Get partners who have emergency availability and are in the user's zip
        const rows = await db.execute(
          sql`SELECT p.id, p.businessName, p.trade, p.phone, p.email, p.profilePhotoUrl,
                     p.averageRating, p.reviewCount, p.tier, p.serviceArea,
                     p.serviceZipCodes, p.isVerified
              FROM partners p
              WHERE p.status = 'approved'
                AND p.isActive = 1
              ORDER BY p.averageRating DESC, p.reviewCount DESC
              LIMIT 20`
        ) as any;
        return (Array.isArray(rows[0]) ? rows[0] : rows) as any[];
      } catch { return []; }
    }),

  // ─── Neighborhood Deals ────────────────────────────────────────────────────
  getNeighborhoodDeals: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    try {
      // Get active deals in the homeowner's zip code area
      const profileRows = await db.execute(
        sql`SELECT hp.id, p.zip FROM homeownerProfiles hp
            LEFT JOIN properties p ON p.ownerId = hp.id AND p.isPrimary = 1
            WHERE hp.userId = ${ctx.user.id} LIMIT 1`
      ) as any;
      const profile = profileRows[0]?.[0] ?? profileRows[0];
      const zip = profile?.zip;

      const rows = await db.execute(
        sql`SELECT cd.*, p.businessName as partnerName, p.trade, p.averageRating
            FROM customerDeals cd
            LEFT JOIN partners p ON cd.partnerId = p.id
            WHERE cd.status = 'active'
              AND cd.expiresAt > NOW()
            ORDER BY cd.createdAt DESC LIMIT 20`
      ) as any;
      return (Array.isArray(rows[0]) ? rows[0] : rows) as any[];
    } catch { return []; }
  }),

  // ─── Homeowner Notification Preferences ───────────────────────────────────
  getHomeownerNotifPrefs: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;
    try {
      const rows = await db.execute(
        sql`SELECT notificationPrefs FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
      ) as any;
      const row = rows[0]?.[0] ?? rows[0];
      const defaults = {
        jobUpdates: true, paymentConfirmations: true, reviewRequests: true,
        maintenanceReminders: true, dealAlerts: true, emergencyAlerts: true,
        neighborhoodDeals: false, weeklyDigest: true,
        emailEnabled: true, smsEnabled: false, pushEnabled: true,
      };
      return { ...defaults, ...(row?.notificationPrefs ?? {}) };
    } catch { return null; }
  }),

  updateHomeownerNotifPrefs: protectedProcedure
    .input(z.object({
      jobUpdates: z.boolean().optional(),
      paymentConfirmations: z.boolean().optional(),
      reviewRequests: z.boolean().optional(),
      maintenanceReminders: z.boolean().optional(),
      dealAlerts: z.boolean().optional(),
      emergencyAlerts: z.boolean().optional(),
      neighborhoodDeals: z.boolean().optional(),
      weeklyDigest: z.boolean().optional(),
      emailEnabled: z.boolean().optional(),
      smsEnabled: z.boolean().optional(),
      pushEnabled: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      await db.execute(
        sql`UPDATE homeownerProfiles SET notificationPrefs = ${JSON.stringify(input)} WHERE userId = ${ctx.user.id}`
      );
      return { success: true };
    }),

  // ─── Job Timeline ──────────────────────────────────────────────────────────
  getJobTimeline: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    try {
      const rows = await db.execute(
        sql`SELECT j.*, p.businessName as partnerName, p.trade, p.profilePhotoUrl as partnerPhoto
            FROM jobs j
            LEFT JOIN partners p ON j.partnerId = p.id
            WHERE j.homeownerUserId = ${ctx.user.id}
            ORDER BY j.createdAt DESC LIMIT 50`
      ) as any;
      return (Array.isArray(rows[0]) ? rows[0] : rows) as any[];
    } catch { return []; }
  }),

  // ─── Maintenance Schedule ─────────────────────────────────────────────────
  getMaintenanceSchedule: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { upcoming: [], overdue: [], completed: [] };
    try {
      const profileRows = await db.execute(
        sql`SELECT hp.id FROM homeownerProfiles hp WHERE hp.userId = ${ctx.user.id} LIMIT 1`
      ) as any;
      const profileId = profileRows[0]?.[0]?.id ?? profileRows[0]?.id;
      if (!profileId) return { upcoming: [], overdue: [], completed: [] };

      const propRows = await db.execute(
        sql`SELECT id FROM properties WHERE ownerId = ${profileId} AND isPrimary = 1 LIMIT 1`
      ) as any;
      const propId = propRows[0]?.[0]?.id ?? propRows[0]?.id;
      if (!propId) return { upcoming: [], overdue: [], completed: [] };

      const rows = await db.execute(
        sql`SELECT hml.*, hsh.systemLabel FROM homeMaintenanceLogs hml
            JOIN homeSystemHealth hsh ON hml.systemHealthId = hsh.id
            WHERE hml.propertyId = ${propId}
            ORDER BY hml.servicedAt DESC LIMIT 100`
      ) as any;
      const all = (Array.isArray(rows[0]) ? rows[0] : rows) as any[];

      // Generate upcoming maintenance based on last service dates
      const upcoming: any[] = [];
      const overdue: any[] = [];
      const completed = all.slice(0, 10);

      // Standard maintenance intervals (months)
      const intervals: Record<string, { label: string; months: number }> = {
        hvac: { label: "HVAC Filter Change", months: 3 },
        plumbing: { label: "Plumbing Inspection", months: 12 },
        electrical: { label: "Electrical Check", months: 24 },
        roof: { label: "Roof Inspection", months: 12 },
        gutter: { label: "Gutter Cleaning", months: 6 },
        pest: { label: "Pest Inspection", months: 12 },
        chimney: { label: "Chimney Cleaning", months: 12 },
        water_heater: { label: "Water Heater Flush", months: 12 },
      };

      const now = new Date();
      for (const [type, config] of Object.entries(intervals)) {
        const lastService = all.find((l: any) => l.systemType === type);
        const lastDate = lastService ? new Date(lastService.servicedAt) : null;
        const nextDate = lastDate
          ? new Date(lastDate.getTime() + config.months * 30 * 24 * 60 * 60 * 1000)
          : new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000); // overdue if never done

        const item = {
          type,
          label: config.label,
          lastServiceDate: lastDate?.toISOString() ?? null,
          nextDueDate: nextDate.toISOString(),
          intervalMonths: config.months,
          isOverdue: nextDate < now,
        };

        if (nextDate < now) {
          overdue.push(item);
        } else {
          upcoming.push(item);
        }
      }

      return { upcoming: upcoming.sort((a, b) => new Date(a.nextDueDate).getTime() - new Date(b.nextDueDate).getTime()), overdue, completed };
    } catch { return { upcoming: [], overdue: [], completed: [] }; }
  }),

  // ─── AI Seasonal Prep Guide ───────────────────────────────────────────────
  getSeasonalPrepGuide: protectedProcedure
    .input(z.object({ season: z.enum(['spring', 'summer', 'fall', 'winter']).optional() }))
    .query(async ({ ctx, input }) => {
      const now = new Date();
      const month = now.getMonth(); // 0-11
      const season = input.season ?? (
        month >= 2 && month <= 4 ? 'spring' :
        month >= 5 && month <= 7 ? 'summer' :
        month >= 8 && month <= 10 ? 'fall' : 'winter'
      );

      // Static seasonal checklists for DFW Texas climate
      const checklists: Record<string, any[]> = {
        spring: [
          { task: "AC Tune-Up & Filter Replacement", priority: "high", category: "HVAC", estimatedCost: "$80-150", diy: false },
          { task: "Roof Inspection After Winter Storms", priority: "high", category: "Roof", estimatedCost: "$150-300", diy: false },
          { task: "Gutter Cleaning & Downspout Check", priority: "medium", category: "Exterior", estimatedCost: "$100-200", diy: true },
          { task: "Lawn Aeration & Fertilization", priority: "medium", category: "Lawn", estimatedCost: "$150-400", diy: true },
          { task: "Sprinkler System Activation & Check", priority: "medium", category: "Irrigation", estimatedCost: "$75-150", diy: false },
          { task: "Window & Door Seal Inspection", priority: "low", category: "Weatherproofing", estimatedCost: "$50-200", diy: true },
          { task: "Exterior Paint Touch-Up", priority: "low", category: "Exterior", estimatedCost: "$200-800", diy: true },
          { task: "Deck/Patio Cleaning & Sealing", priority: "medium", category: "Outdoor", estimatedCost: "$200-600", diy: true },
        ],
        summer: [
          { task: "AC Filter Check (Monthly in Summer)", priority: "high", category: "HVAC", estimatedCost: "$10-30", diy: true },
          { task: "Attic Insulation Check", priority: "medium", category: "Insulation", estimatedCost: "$500-2000", diy: false },
          { task: "Pest Control Treatment", priority: "high", category: "Pest Control", estimatedCost: "$100-300", diy: false },
          { task: "Pool Service & Chemical Balance", priority: "high", category: "Pool", estimatedCost: "$100-200/mo", diy: false },
          { task: "Irrigation System Check", priority: "medium", category: "Irrigation", estimatedCost: "$75-150", diy: true },
          { task: "Exterior Caulking & Sealing", priority: "low", category: "Weatherproofing", estimatedCost: "$50-200", diy: true },
          { task: "Ceiling Fan Direction Check", priority: "low", category: "Electrical", estimatedCost: "$0", diy: true },
        ],
        fall: [
          { task: "Heating System Tune-Up", priority: "high", category: "HVAC", estimatedCost: "$80-150", diy: false },
          { task: "Chimney Cleaning & Inspection", priority: "high", category: "Fireplace", estimatedCost: "$150-300", diy: false },
          { task: "Gutter Cleaning (Leaf Season)", priority: "high", category: "Exterior", estimatedCost: "$100-200", diy: true },
          { task: "Weatherstripping Replacement", priority: "medium", category: "Weatherproofing", estimatedCost: "$50-150", diy: true },
          { task: "Sprinkler System Winterization", priority: "medium", category: "Irrigation", estimatedCost: "$75-150", diy: false },
          { task: "Tree Trimming (Before Ice Storms)", priority: "medium", category: "Landscaping", estimatedCost: "$300-1000", diy: false },
          { task: "Roof Inspection Before Winter", priority: "high", category: "Roof", estimatedCost: "$150-300", diy: false },
          { task: "Insulate Exposed Pipes", priority: "medium", category: "Plumbing", estimatedCost: "$50-200", diy: true },
        ],
        winter: [
          { task: "Pipe Freeze Protection (DFW Ice Storms)", priority: "high", category: "Plumbing", estimatedCost: "$50-500", diy: true },
          { task: "Heating System Check", priority: "high", category: "HVAC", estimatedCost: "$80-150", diy: false },
          { task: "Roof & Attic Inspection", priority: "medium", category: "Roof", estimatedCost: "$150-300", diy: false },
          { task: "Fireplace & Chimney Check", priority: "medium", category: "Fireplace", estimatedCost: "$150-300", diy: false },
          { task: "Door & Window Draft Sealing", priority: "medium", category: "Weatherproofing", estimatedCost: "$50-200", diy: true },
          { task: "Water Heater Inspection", priority: "medium", category: "Plumbing", estimatedCost: "$100-200", diy: false },
          { task: "Exterior Faucet Covers", priority: "high", category: "Plumbing", estimatedCost: "$10-30", diy: true },
          { task: "Emergency Kit Check (Power Outages)", priority: "medium", category: "Safety", estimatedCost: "$50-200", diy: true },
        ],
      };

      return {
        season,
        checklist: checklists[season] ?? [],
        tip: season === 'winter'
          ? "DFW winters can bring sudden ice storms. Prioritize pipe protection and have an emergency plumber on speed dial."
          : season === 'summer'
          ? "DFW summers are brutal — your AC is your most critical system. Don't skip the summer tune-up."
          : season === 'fall'
          ? "Fall is the best time to prep for DFW's unpredictable winter storms. Get your roof and HVAC checked early."
          : "Spring in DFW means storm season. Roof and gutter checks are non-negotiable.",
      };
    }),

  // ─── True Cost Guide ──────────────────────────────────────────────────────
  getTrueCostEstimate: protectedProcedure
    .input(z.object({ service: z.string().min(3).max(200) }))
    .query(async ({ ctx, input }) => {
      // Static DFW cost data for common services
      const costData: Record<string, { low: number; avg: number; high: number; unit: string; notes: string }> = {
        "roof replacement": { low: 8000, avg: 14000, high: 25000, unit: "per job", notes: "DFW average for 2,000 sq ft home. Varies by material (asphalt vs metal)." },
        "ac replacement": { low: 3500, avg: 6500, high: 12000, unit: "per unit", notes: "Full HVAC system. DFW homes often need 2 units." },
        "ac tune-up": { low: 75, avg: 120, high: 200, unit: "per visit", notes: "Includes filter, coil check, refrigerant check." },
        "plumbing repair": { low: 150, avg: 350, high: 1200, unit: "per job", notes: "Varies widely by issue. Emergency calls add 50-100%." },
        "electrical panel": { low: 1500, avg: 2500, high: 4500, unit: "per job", notes: "200-amp upgrade. Permit required in most DFW cities." },
        "foundation repair": { low: 3000, avg: 8000, high: 25000, unit: "per job", notes: "DFW clay soil causes significant foundation movement. Get 3 quotes." },
        "window replacement": { low: 300, avg: 600, high: 1200, unit: "per window", notes: "Double-pane energy efficient. Whole-house discounts available." },
        "kitchen remodel": { low: 15000, avg: 35000, high: 80000, unit: "per job", notes: "Full gut remodel. Cosmetic updates start at $5,000." },
        "bathroom remodel": { low: 5000, avg: 12000, high: 30000, unit: "per job", notes: "Full remodel. Tile work and fixtures are biggest cost drivers." },
        "fence installation": { low: 1500, avg: 3500, high: 8000, unit: "per job", notes: "6-ft wood privacy fence, 150 linear ft. Cedar most popular in DFW." },
        "pool installation": { low: 35000, avg: 55000, high: 100000, unit: "per job", notes: "Gunite pool with basic equipment. DFW permits add 2-4 months." },
        "landscaping": { low: 500, avg: 2500, high: 15000, unit: "per job", notes: "Full yard design and install. Seasonal maintenance $150-400/mo." },
        "painting exterior": { low: 2000, avg: 4500, high: 9000, unit: "per job", notes: "2,000 sq ft home. Includes prep, primer, 2 coats." },
        "painting interior": { low: 1500, avg: 3500, high: 7000, unit: "per job", notes: "Whole house. Per room rates $200-600." },
        "flooring": { low: 3, avg: 8, high: 20, unit: "per sq ft installed", notes: "LVP most popular in DFW. Hardwood adds 50-100%." },
        "gutter cleaning": { low: 100, avg: 175, high: 300, unit: "per visit", notes: "Standard home. Guards installation $500-2000." },
        "pest control": { low: 75, avg: 150, high: 400, unit: "per treatment", notes: "Quarterly plans $300-600/yr. Termite treatment $500-2500." },
        "tree removal": { low: 300, avg: 800, high: 3000, unit: "per tree", notes: "Varies by size and access. Stump grinding $100-300 extra." },
      };

      const serviceLower = input.service.toLowerCase();
      let match = null;
      for (const [key, data] of Object.entries(costData)) {
        if (serviceLower.includes(key) || key.includes(serviceLower.split(' ')[0])) {
          match = { service: key, ...data };
          break;
        }
      }

      if (!match) {
        // Use AI for unknown services
        try {
          const response = await invokeLLM({
            messages: [
              { role: "system", content: "You are a home services cost expert for the DFW (Dallas-Fort Worth) Texas area. Provide realistic cost estimates." },
              { role: "user", content: `What does "${input.service}" typically cost in DFW Texas? Respond in JSON: {"low": number, "avg": number, "high": number, "unit": "string", "notes": "string"}` },
            ],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "cost_estimate",
                strict: true,
                schema: {
                  type: "object",
                  properties: {
                    low: { type: "number" },
                    avg: { type: "number" },
                    high: { type: "number" },
                    unit: { type: "string" },
                    notes: { type: "string" },
                  },
                  required: ["low", "avg", "high", "unit", "notes"],
                  additionalProperties: false,
                },
              },
            },
          });
          const rawContent = response.choices?.[0]?.message?.content;
          const content = typeof rawContent === 'string' ? rawContent : JSON.stringify(rawContent ?? {});
          const parsed = JSON.parse(content || "{}");
          match = { service: input.service, ...parsed };
        } catch {
          match = { service: input.service, low: 200, avg: 800, high: 3000, unit: "per job", notes: "Estimate based on DFW averages. Get 3 quotes for accuracy." };
        }
      }

      return match;
    }),

  // ─── Home Value Impact ────────────────────────────────────────────────────
  getHomeValueImpact: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { improvements: [], estimatedValueAdded: 0, propertyValue: null };
    try {
      const profileRows = await db.execute(
        sql`SELECT hp.id, p.id as propId, p.estimatedValue, p.address
            FROM homeownerProfiles hp
            LEFT JOIN properties p ON p.ownerId = hp.id AND p.isPrimary = 1
            WHERE hp.userId = ${ctx.user.id} LIMIT 1`
      ) as any;
      const profile = profileRows[0]?.[0] ?? profileRows[0];

      const improvements = profile?.propId ? await db.execute(
        sql`SELECT * FROM propertyImprovements WHERE propertyId = ${profile.propId} ORDER BY completedAt DESC LIMIT 20`
      ) as any : [];

      const impList = (Array.isArray(improvements[0]) ? improvements[0] : improvements) as any[];

      // ROI estimates for common improvements (% of cost returned in value)
      const roiMap: Record<string, number> = {
        kitchen: 0.70, bathroom: 0.65, flooring: 0.75, roof: 0.60,
        hvac: 0.55, landscaping: 0.80, paint: 0.90, windows: 0.70,
        deck: 0.65, garage: 0.75, pool: 0.40, addition: 0.50,
      };

      const estimatedValueAdded = impList.reduce((sum: number, imp: any) => {
        const cost = Number(imp.cost ?? 0);
        const category = (imp.category ?? '').toLowerCase();
        const roi = Object.entries(roiMap).find(([k]) => category.includes(k))?.[1] ?? 0.60;
        return sum + (cost * roi);
      }, 0);

      return {
        improvements: impList,
        estimatedValueAdded: Math.round(estimatedValueAdded),
        propertyValue: profile?.estimatedValue ? Number(profile.estimatedValue) : null,
        address: profile?.address ?? null,
      };
    } catch { return { improvements: [], estimatedValueAdded: 0, propertyValue: null }; }
  }),

  // ─── Contractor Comparison ────────────────────────────────────────────────
  getContractorComparisons: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    try {
      // Get quotes received by this homeowner
      const rows = await db.execute(
        sql`SELECT qq.*, p.businessName, p.trade, p.averageRating, p.reviewCount, p.tier, p.profilePhotoUrl
            FROM quickQuoteRequests qq
            LEFT JOIN partners p ON qq.targetPartnerId = p.id
            WHERE qq.homeownerUserId = ${ctx.user.id}
              AND qq.status = 'quoted'
              AND qq.quotedAmount IS NOT NULL
            ORDER BY qq.createdAt DESC LIMIT 20`
      ) as any;
      return (Array.isArray(rows[0]) ? rows[0] : rows) as any[];
    } catch { return []; }
  }),

  // ─── Property Comparison ──────────────────────────────────────────────────
  getPropertyComparison: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;
    try {
      const profileRows = await db.execute(
        sql`SELECT hp.id, p.* FROM homeownerProfiles hp
            LEFT JOIN properties p ON p.ownerId = hp.id AND p.isPrimary = 1
            WHERE hp.userId = ${ctx.user.id} LIMIT 1`
      ) as any;
      const prop = profileRows[0]?.[0] ?? profileRows[0];
      if (!prop?.id) return null;

      // Get area stats from other properties in same zip
      const areaStats = await db.execute(
        sql`SELECT
          AVG(sqft) as avgSqft,
          AVG(estimatedValue) as avgValue,
          AVG(yearBuilt) as avgYearBuilt,
          COUNT(*) as totalInArea
          FROM properties
          WHERE zip = ${prop.zip} AND id != ${prop.id}`
      ) as any;
      const stats = areaStats[0]?.[0] ?? areaStats[0];

      return {
        property: prop,
        areaAvgSqft: stats?.avgSqft ? Math.round(Number(stats.avgSqft)) : null,
        areaAvgValue: stats?.avgValue ? Math.round(Number(stats.avgValue)) : null,
        areaAvgYearBuilt: stats?.avgYearBuilt ? Math.round(Number(stats.avgYearBuilt)) : null,
        totalInArea: Number(stats?.totalInArea ?? 0),
      };
    } catch { return null; }
  }),

  // ─── Saved Pros (Favorites) ────────────────────────────────────────────────
  getFavorites: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    const profile = await db.select({ id: homeownerProfiles.id })
      .from(homeownerProfiles).where(eq(homeownerProfiles.userId, ctx.user.id)).limit(1);
    if (!profile[0]) return [];
    return db.select({
      id: homeownerFavorites.id,
      partnerId: homeownerFavorites.partnerId,
      notes: homeownerFavorites.notes,
      createdAt: homeownerFavorites.createdAt,
      businessName: partners.businessName,
      businessType: partners.businessType,
      tier: partners.tier,
      serviceArea: partners.serviceArea,
      contactName: partners.contactName,
      contactEmail: partners.contactEmail,
      contactPhone: partners.contactPhone,
      website: partners.website,
      rating: partners.rating,
      reviewCount: partners.reviewCount,
    })
      .from(homeownerFavorites)
      .leftJoin(partners, eq(homeownerFavorites.partnerId, partners.id))
      .where(eq(homeownerFavorites.homeownerProfileId, profile[0].id))
      .orderBy(desc(homeownerFavorites.createdAt));
  }),

  saveFavorite: protectedProcedure
    .input(z.object({ partnerId: z.number(), notes: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      const profile = await db.select({ id: homeownerProfiles.id })
        .from(homeownerProfiles).where(eq(homeownerProfiles.userId, ctx.user.id)).limit(1);
      if (!profile[0]) throw new TRPCError({ code: 'NOT_FOUND', message: 'Homeowner profile not found' });
      const existing = await db.select({ id: homeownerFavorites.id })
        .from(homeownerFavorites)
        .where(and(eq(homeownerFavorites.homeownerProfileId, profile[0].id), eq(homeownerFavorites.partnerId, input.partnerId)))
        .limit(1);
      if (existing[0]) {
        await db.update(homeownerFavorites).set({ notes: input.notes }).where(eq(homeownerFavorites.id, existing[0].id));
        return { action: 'updated' };
      }
      await db.insert(homeownerFavorites).values({
        homeownerProfileId: profile[0].id,
        partnerId: input.partnerId,
        notes: input.notes,
      });
      return { action: 'saved' };
    }),

  removeFavorite: protectedProcedure
    .input(z.object({ partnerId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      const profile = await db.select({ id: homeownerProfiles.id })
        .from(homeownerProfiles).where(eq(homeownerProfiles.userId, ctx.user.id)).limit(1);
      if (!profile[0]) throw new TRPCError({ code: 'NOT_FOUND' });
      await db.delete(homeownerFavorites)
        .where(and(eq(homeownerFavorites.homeownerProfileId, profile[0].id), eq(homeownerFavorites.partnerId, input.partnerId)));
      return { success: true };
    }),
});
