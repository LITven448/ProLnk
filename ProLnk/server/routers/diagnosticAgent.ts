/**
 * diagnosticAgent.ts
 * 
 * The ProLnk AI Diagnostic Agent — a conversational AI that:
 * 1. Accepts photo(s) + text description from homeowner
 * 2. Analyzes with Claude vision + reasoning
 * 3. Asks targeted follow-up questions to scope the job
 * 4. Classifies: trade, severity, DIY vs parts-only vs pro-required
 * 5. Generates a real quote using live materials + labor rate data
 * 6. Returns 3 monetizable options: DIY (affiliate), Hire a Pro, Post to Exchange
 * 7. Extracts and persists equipment data to the homeowner's Home Profile
 */

import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getDb } from "../db";
import { eq, desc, and, sql } from "drizzle-orm";
import {
  diagnosticSessions,
  homeProfiles,
  materialsPricing,
  laborRates,
  affiliateProducts,
  partners,
  homeownerProfiles,
} from "../../drizzle/schema";
import { invokeLLM } from "../_core/llm";

// ─── Types ────────────────────────────────────────────────────────────────────

interface DiagnosticMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface QuoteBreakdownItem {
  description: string;
  qty: number;
  unit: string;
  unitCost: number;
  total: number;
  type: "material" | "labor";
}

interface DiagnosticResult {
  diagnosis: string;
  trade: string;
  severity: "cosmetic" | "monitor" | "soon" | "urgent" | "emergency";
  scope: string;
  recommendation: "diy" | "parts_only" | "pro_required" | "unknown";
  quoteMin: number;
  quoteMax: number;
  quoteMaterials: number;
  quoteLabor: number;
  quoteBreakdown: QuoteBreakdownItem[];
  nextQuestion: string | null;
  isComplete: boolean;
  // Home profile data extracted from the conversation
  extractedEquipment?: {
    hvacBrand?: string;
    hvacYear?: number;
    roofMaterial?: string;
    roofYear?: number;
    waterHeaterBrand?: string;
    waterHeaterYear?: number;
    plumbingMaterial?: string;
  };
}

// ─── System Prompt ────────────────────────────────────────────────────────────

const DIAGNOSTIC_SYSTEM_PROMPT = `You are the ProLnk AI Diagnostic Agent — a knowledgeable home services expert with the combined expertise of a licensed general contractor, master plumber, HVAC technician, and home inspector. You work for ProLnk, a home services platform in the DFW (Dallas-Fort Worth) area.

YOUR MISSION:
Help homeowners understand exactly what is wrong with their home, what it will cost to fix, and give them 3 clear options to act on it.

YOUR APPROACH:
- Be conversational, warm, and direct — like a trusted contractor friend
- Ask ONLY the questions you need to produce an accurate diagnosis and quote
- Never ask for information the homeowner already gave you
- Never ask more than 2 questions at once
- Stop asking questions once you have enough to produce a complete quote
- If a photo is provided, analyze it thoroughly before asking questions
- If the photo is too dark or unclear, tell the homeowner and ask them to retake it

QUESTION STRATEGY BY TRADE:
- Plumbing: location, type of fixture, when it started, any visible damage
- HVAC: brand/age if visible, symptoms, when last serviced, type of system
- Roofing: age of roof, material, extent of damage, any interior water signs
- Electrical: specific symptoms, age of home, panel brand if known
- Flooring: material type, square footage estimate, extent of damage
- Painting: interior/exterior, square footage, current condition
- Fencing: material, linear feet, extent of damage
- General: always ask for approximate square footage or linear footage for accurate quotes

SEVERITY SCALE:
- cosmetic: aesthetic only, no functional impact
- monitor: watch it but not urgent
- soon: needs attention within 30-60 days
- urgent: needs attention within 1-2 weeks
- emergency: safety risk or active damage, needs immediate attention

RECOMMENDATION LOGIC:
- diy: homeowner can reasonably fix this themselves with basic tools
- parts_only: needs a specific part but installation is straightforward
- pro_required: requires licensed professional, specialized tools, or safety risk
- unknown: need more information

QUOTE GENERATION:
When you have enough information, generate a realistic quote for DFW market rates.
Include:
- Materials: itemized list with current DFW prices
- Labor: realistic DFW contractor rates for this trade
- Total range: low to high based on typical variation

ALWAYS respond in valid JSON with this exact structure:
{
  "diagnosis": "Clear explanation of what the problem is",
  "trade": "plumbing|hvac|roofing|electrical|flooring|painting|fencing|landscaping|general",
  "severity": "cosmetic|monitor|soon|urgent|emergency",
  "scope": "Specific scope of work needed",
  "recommendation": "diy|parts_only|pro_required|unknown",
  "nextQuestion": "The next question to ask, or null if you have enough info",
  "isComplete": true/false,
  "quoteMin": 0,
  "quoteMax": 0,
  "quoteMaterials": 0,
  "quoteLabor": 0,
  "quoteBreakdown": [
    {"description": "item name", "qty": 1, "unit": "each", "unitCost": 0, "total": 0, "type": "material"}
  ],
  "extractedEquipment": {
    "hvacBrand": null,
    "hvacYear": null,
    "roofMaterial": null,
    "roofYear": null,
    "waterHeaterBrand": null,
    "waterHeaterYear": null,
    "plumbingMaterial": null
  },
  "photoQualityFlag": "ok|too_dark|too_blurry|too_far|retake_needed",
  "photoQualityNote": ""
}

Set isComplete to true only when you have enough information to produce a complete, accurate quote.
Set nextQuestion to null when isComplete is true.`;

// ─── Helper: Get live materials prices ────────────────────────────────────────

async function getLivePrices(trade: string, db: any) {
  try {
    const prices = await db
      .select()
      .from(materialsPricing)
      .where(eq(materialsPricing.category, trade))
      .limit(20);
    return prices;
  } catch {
    return [];
  }
}

// ─── Helper: Get live labor rates ─────────────────────────────────────────────

async function getLiveRates(trade: string, db: any) {
  try {
    const [rate] = await db
      .select()
      .from(laborRates)
      .where(and(eq(laborRates.trade, trade), eq(laborRates.zipCluster, "DFW")))
      .limit(1);
    return rate || null;
  } catch {
    return null;
  }
}

// ─── Helper: Get affiliate products ───────────────────────────────────────────

async function getAffiliateProducts(trade: string, db: any) {
  try {
    const products = await db
      .select()
      .from(affiliateProducts)
      .where(
        and(
          eq(affiliateProducts.repairCategory, trade),
          eq(affiliateProducts.isActive, true)
        )
      )
      .limit(3);
    return products;
  } catch {
    return [];
  }
}

// ─── Helper: Get matched partners ─────────────────────────────────────────────

async function getMatchedPartners(trade: string, db: any) {
  try {
    const matchedPartners = await db
      .select({
        id: partners.id,
        businessName: partners.businessName,
        businessType: partners.businessType,
        rating: partners.rating,
        reviewCount: partners.reviewCount,
        tier: partners.tier,
        contactPhone: partners.contactPhone,
        website: partners.website,
      })
      .from(partners)
      .where(
        and(
          eq(partners.status, "approved"),
          sql`LOWER(${partners.businessType}) LIKE ${`%${trade.toLowerCase()}%`}`
        )
      )
      .orderBy(desc(partners.priorityScore))
      .limit(3);
    return matchedPartners;
  } catch {
    return [];
  }
}

// ─── Helper: Update home profile ──────────────────────────────────────────────

async function updateHomeProfile(
  homeownerId: number,
  address: string,
  equipment: DiagnosticResult["extractedEquipment"],
  db: any
) {
  if (!equipment || !address) return;
  try {
      const [existing] = await db
        .select({ id: homeProfiles.id })
        .from(homeProfiles)
        .where(
          and(
            eq(homeProfiles.homeownerId, homeownerId),
            eq(homeProfiles.propertyAddress, address)
          )
        )
        .limit(1);

      const updates = {
        lastScannedAt: new Date(),
        ...(equipment.hvacBrand ? { hvacBrand: equipment.hvacBrand } : {}),
        ...(equipment.hvacYear ? { hvacYear: equipment.hvacYear } : {}),
        ...(equipment.roofMaterial ? { roofMaterial: equipment.roofMaterial } : {}),
        ...(equipment.roofYear ? { roofYear: equipment.roofYear } : {}),
        ...(equipment.waterHeaterBrand ? { waterHeaterBrand: equipment.waterHeaterBrand } : {}),
        ...(equipment.waterHeaterYear ? { waterHeaterYear: equipment.waterHeaterYear } : {}),
        ...(equipment.plumbingMaterial ? { plumbingMaterial: equipment.plumbingMaterial } : {}),
      };

      if (existing) {
        await db
          .update(homeProfiles)
          .set(updates)
          .where(eq(homeProfiles.id, existing.id));
      } else {
        await db.insert(homeProfiles).values({
          homeownerId,
          propertyAddress: address,
          ...updates,
        });
      }
  } catch (e) {
    // Non-fatal — don't block the diagnostic flow
    console.error("[DiagnosticAgent] Failed to update home profile:", e);
  }
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const diagnosticAgentRouter = router({
  /**
   * Start a new diagnostic session.
   * Accepts an initial description and optional photo URLs.
   * Returns the first AI question or a complete diagnosis if enough info provided.
   */
  start: protectedProcedure
    .input(
      z.object({
        description: z.string().min(1).max(2000).optional().default("[Photo provided - please analyze the image]"),
        photoUrls: z.array(z.string().url()).max(5).default([]),
        propertyAddress: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Build initial message
      const userMessage: DiagnosticMessage = {
        role: "user",
        content: input.description,
        timestamp: Date.now(),
      };

      // Build LLM messages
      const llmMessages: Array<{role: string; content: string | Array<{type: string; image_url?: {url: string; detail: string}; text?: string}>}> = [
        { role: "system", content: DIAGNOSTIC_SYSTEM_PROMPT },
      ];

      // Add photo content if provided
      if (input.photoUrls.length > 0) {
        const imageContent = input.photoUrls.map((url) => ({
          type: "image_url" as const,
          image_url: { url, detail: "high" as const },
        }));
        llmMessages.push({
          role: "user",
          content: [
            ...imageContent,
            { type: "text", text: input.description },
          ],
        });
      } else {
        llmMessages.push({ role: "user", content: input.description });
      }

      // Call Claude
      const response = await invokeLLM({ messages: llmMessages as any });
      const rawMsg = response?.choices?.[0]?.message?.content;
      const rawContent = typeof rawMsg === "string" ? rawMsg : (Array.isArray(rawMsg) ? ((rawMsg.find((m: any) => m.type === "text") as any)?.text ?? "{}") : "{}");

      let result: DiagnosticResult;
      try {
        result = JSON.parse(rawContent);
      } catch {
        result = {
          diagnosis: "I need a bit more information to help you.",
          trade: "general",
          severity: "monitor",
          scope: "",
          recommendation: "unknown",
          nextQuestion: "Can you describe the problem in more detail? What are you seeing or experiencing?",
          isComplete: false,
          quoteMin: 0,
          quoteMax: 0,
          quoteMaterials: 0,
          quoteLabor: 0,
          quoteBreakdown: [],
        };
      }

      // Create session in DB
      const messages: DiagnosticMessage[] = [
        userMessage,
        {
          role: "assistant",
          content: result.nextQuestion || result.diagnosis,
          timestamp: Date.now(),
        },
      ];

      const inserted = await db
        .insert(diagnosticSessions)
        .values({
          homeownerId: ctx.user.id,
          propertyAddress: input.propertyAddress ?? undefined,
          messages: messages,
          photoUrls: input.photoUrls,
          diagnosis: result.isComplete ? result.diagnosis : undefined,
          trade: result.trade || undefined,
          severity: result.isComplete ? (result.severity as any) : undefined,
          scope: result.isComplete ? result.scope : undefined,
          recommendation: result.isComplete ? (result.recommendation as any) : undefined,
          quoteMin: result.isComplete ? String(result.quoteMin) : undefined,
          quoteMax: result.isComplete ? String(result.quoteMax) : undefined,
          quoteMaterials: result.isComplete ? String(result.quoteMaterials) : undefined,
          quoteLabor: result.isComplete ? String(result.quoteLabor) : undefined,
          quoteBreakdown: result.isComplete ? result.quoteBreakdown : undefined,
          status: result.isComplete ? "completed" : "in_progress",
        });

      const sessionId = (inserted as any).insertId as number;

      // If complete, update home profile and get options
      let options = null;
      if (result.isComplete) {
        if (result.extractedEquipment && input.propertyAddress) {
          await updateHomeProfile(ctx.user.id, input.propertyAddress, result.extractedEquipment, db);
        }
        const [products, matchedPartners] = await Promise.all([
          getAffiliateProducts(result.trade, db),
          getMatchedPartners(result.trade, db),
        ]);
        options = { products, partners: matchedPartners };
      }

      return {
        sessionId,
        isComplete: result.isComplete,
        nextQuestion: result.nextQuestion,
        photoQualityFlag: (result as any).photoQualityFlag || "ok",
        photoQualityNote: (result as any).photoQualityNote || "",
        diagnosis: result.isComplete ? result.diagnosis : null,
        trade: result.trade,
        severity: result.isComplete ? result.severity : null,
        recommendation: result.isComplete ? result.recommendation : null,
        quote: result.isComplete
          ? {
              min: result.quoteMin,
              max: result.quoteMax,
              materials: result.quoteMaterials,
              labor: result.quoteLabor,
              breakdown: result.quoteBreakdown,
            }
          : null,
        options,
      };
    }),

  /**
   * Continue an existing diagnostic session with a follow-up answer.
   */
  continue: protectedProcedure
    .input(
      z.object({
        sessionId: z.number(),
        answer: z.string().min(1).max(2000),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Load session
      const [session] = await db
        .select()
        .from(diagnosticSessions)
        .where(
          and(
            eq(diagnosticSessions.id, input.sessionId),
            eq(diagnosticSessions.homeownerId, ctx.user.id)
          )
        )
        .limit(1);

      if (!session) throw new TRPCError({ code: "NOT_FOUND", message: "Session not found" });
      if (session.status === "completed") {
        throw new TRPCError({ code: "BAD_REQUEST", message: "This diagnostic session is already complete" });
      }

      const existingMessages: DiagnosticMessage[] = Array.isArray(session.messages)
        ? (session.messages as any[])
        : JSON.parse((session.messages as unknown as string) || "[]");

      const photoUrls: string[] = Array.isArray(session.photoUrls)
        ? session.photoUrls
        : JSON.parse((session.photoUrls as unknown as string) || "[]");

      // Build full conversation for LLM
      const llmMessages: any[] = [
        { role: "system", content: DIAGNOSTIC_SYSTEM_PROMPT },
      ];

      // Add photo on first message if available
      if (photoUrls.length > 0 && existingMessages.length > 0) {
        const imageContent = photoUrls.map((url) => ({
          type: "image_url" as const,
          image_url: { url, detail: "high" as const },
        }));
        (llmMessages as any[]).push({
          role: "user",
          content: [
            ...imageContent,
            { type: "text", text: existingMessages[0].content },
          ],
        });
        // Add remaining conversation
        for (let i = 1; i < existingMessages.length; i++) {
          llmMessages.push({
            role: existingMessages[i].role,
            content: existingMessages[i].content,
          });
        }
      } else {
        for (const msg of existingMessages) {
          llmMessages.push({ role: msg.role, content: msg.content });
        }
      }

      // Add new user answer
      llmMessages.push({ role: "user", content: input.answer });

      // Call Claude
      const response = await invokeLLM({ messages: llmMessages as any });
      const rawMsg2 = response?.choices?.[0]?.message?.content;
      const rawContent = typeof rawMsg2 === "string" ? rawMsg2 : (Array.isArray(rawMsg2) ? ((rawMsg2.find((m: any) => m.type === "text") as any)?.text ?? "{}") : "{}");

      let result: DiagnosticResult;
      try {
        result = JSON.parse(rawContent);
      } catch {
        result = {
          diagnosis: "Let me ask you one more thing.",
          trade: session.trade || "general",
          severity: "monitor",
          scope: "",
          recommendation: "unknown",
          nextQuestion: "Could you give me a bit more detail about what you're seeing?",
          isComplete: false,
          quoteMin: 0,
          quoteMax: 0,
          quoteMaterials: 0,
          quoteLabor: 0,
          quoteBreakdown: [],
        };
      }

      // Update messages
      const updatedMessages: DiagnosticMessage[] = [
        ...existingMessages,
        { role: "user", content: input.answer, timestamp: Date.now() },
        {
          role: "assistant",
          content: result.nextQuestion || result.diagnosis,
          timestamp: Date.now(),
        },
      ];

      // Update session in DB
      await db
        .update(diagnosticSessions)
        .set({
          messages: updatedMessages as any,
          trade: result.trade || session.trade,
          ...(result.isComplete
            ? {
                diagnosis: result.diagnosis,
                severity: result.severity as any,
                scope: result.scope,
                recommendation: result.recommendation as any,
                quoteMin: String(result.quoteMin),
                quoteMax: String(result.quoteMax),
                quoteMaterials: String(result.quoteMaterials),
                quoteLabor: String(result.quoteLabor),
                quoteBreakdown: result.quoteBreakdown,
                status: "completed" as const,
              }
            : {}),
        })
        .where(eq(diagnosticSessions.id, input.sessionId));

      // If complete, update home profile and get options
      let options = null;
      if (result.isComplete) {
        if (result.extractedEquipment && session.propertyAddress) {
          await updateHomeProfile(ctx.user.id, session.propertyAddress, result.extractedEquipment, db);
        }
        const [products, matchedPartners] = await Promise.all([
          getAffiliateProducts(result.trade, db),
          getMatchedPartners(result.trade, db),
        ]);
        options = { products, partners: matchedPartners };
      }

      return {
        sessionId: input.sessionId,
        isComplete: result.isComplete,
        nextQuestion: result.nextQuestion,
        diagnosis: result.isComplete ? result.diagnosis : null,
        trade: result.trade,
        severity: result.isComplete ? result.severity : null,
        recommendation: result.isComplete ? result.recommendation : null,
        quote: result.isComplete
          ? {
              min: result.quoteMin,
              max: result.quoteMax,
              materials: result.quoteMaterials,
              labor: result.quoteLabor,
              breakdown: result.quoteBreakdown,
            }
          : null,
        options,
      };
    }),

  /**
   * Get a completed diagnostic session with full 3-option output.
   */
  getSession: protectedProcedure
    .input(z.object({ sessionId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [session] = await db
        .select()
        .from(diagnosticSessions)
        .where(
          and(
            eq(diagnosticSessions.id, input.sessionId),
            eq(diagnosticSessions.homeownerId, ctx.user.id)
          )
        )
        .limit(1);

      if (!session) throw new TRPCError({ code: "NOT_FOUND", message: "Session not found" });

      const [products, matchedPartners] = await Promise.all([
        session.trade ? getAffiliateProducts(session.trade, db) : Promise.resolve([]),
        session.trade ? getMatchedPartners(session.trade, db) : Promise.resolve([]),
      ]);

      return {
        ...session,
        messages: Array.isArray(session.messages)
          ? session.messages
          : JSON.parse((session.messages as string) || "[]"),
        options: {
          products,
          partners: matchedPartners,
        },
      };
    }),

  /**
   * List all diagnostic sessions for the current homeowner.
   */
  listSessions: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    return db
      .select({
        id: diagnosticSessions.id,
        propertyAddress: diagnosticSessions.propertyAddress,
        trade: diagnosticSessions.trade,
        severity: diagnosticSessions.severity,
        diagnosis: diagnosticSessions.diagnosis,
        recommendation: diagnosticSessions.recommendation,
        quoteMin: diagnosticSessions.quoteMin,
        quoteMax: diagnosticSessions.quoteMax,
        status: diagnosticSessions.status,
        createdAt: diagnosticSessions.createdAt,
      })
      .from(diagnosticSessions)
      .where(eq(diagnosticSessions.homeownerId, ctx.user.id))
      .orderBy(desc(diagnosticSessions.createdAt))
      .limit(20);
  }),

  /**
   * Get the homeowner's home profile.
   */
  getHomeProfile: protectedProcedure
    .input(z.object({ propertyAddress: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return null;

      const conditions = [eq(homeProfiles.homeownerId, ctx.user.id)];
      if (input.propertyAddress) {
        conditions.push(eq(homeProfiles.propertyAddress, input.propertyAddress));
      }

      const [profile] = await db
        .select()
        .from(homeProfiles)
        .where(and(...conditions))
        .orderBy(desc(homeProfiles.updatedAt))
        .limit(1);

      return profile || null;
    }),

  /**
   * Get all home profiles for the current homeowner.
   */
  listHomeProfiles: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    return db
      .select()
      .from(homeProfiles)
      .where(eq(homeProfiles.homeownerId, ctx.user.id))
      .orderBy(desc(homeProfiles.updatedAt));
  }),

  /**
   * Manually update a home profile field.
   */
  updateHomeProfile: protectedProcedure
    .input(
      z.object({
        propertyAddress: z.string(),
        yearBuilt: z.number().optional(),
        squareFootage: z.number().optional(),
        bedrooms: z.number().optional(),
        bathrooms: z.number().optional(),
        hvacBrand: z.string().optional(),
        hvacYear: z.number().optional(),
        roofMaterial: z.string().optional(),
        roofYear: z.number().optional(),
        waterHeaterBrand: z.string().optional(),
        waterHeaterYear: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const { propertyAddress, ...fieldUpdates } = input;

      const [existing] = await db
        .select({ id: homeProfiles.id })
        .from(homeProfiles)
        .where(
          and(
            eq(homeProfiles.homeownerId, ctx.user.id),
            eq(homeProfiles.propertyAddress, propertyAddress)
          )
        )
        .limit(1);

      if (existing) {
        await db
          .update(homeProfiles)
          .set({
            ...fieldUpdates,
            bathrooms: fieldUpdates.bathrooms !== undefined ? String(fieldUpdates.bathrooms) : undefined,
          })
          .where(eq(homeProfiles.id, existing.id));
      } else {
        await db.insert(homeProfiles).values({
          homeownerId: ctx.user.id,
          propertyAddress,
          yearBuilt: fieldUpdates.yearBuilt,
          squareFootage: fieldUpdates.squareFootage,
          bedrooms: fieldUpdates.bedrooms,
          bathrooms: fieldUpdates.bathrooms ? String(fieldUpdates.bathrooms) : undefined,
          hvacBrand: fieldUpdates.hvacBrand,
          hvacYear: fieldUpdates.hvacYear,
          roofMaterial: fieldUpdates.roofMaterial,
          roofYear: fieldUpdates.roofYear,
          waterHeaterBrand: fieldUpdates.waterHeaterBrand,
          waterHeaterYear: fieldUpdates.waterHeaterYear,
        });
      }

      return { success: true };
    }),
});
