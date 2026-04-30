/**
 * Room Makeover Router — AI-powered room redesign for TrustyPro homeowners
 * Homeowners upload up to 4 room photos + answer style questions → AI generates a redesign mockup.
 */
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import { generateImage } from "../_core/imageGeneration";
import { getDb } from "../db";
import { roomMakeoverSessions } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";

// Room type options
const ROOM_TYPES = [
  "living_room", "kitchen", "master_bedroom", "bedroom",
  "bathroom", "master_bathroom", "dining_room", "home_office",
  "laundry_room", "garage", "outdoor_patio", "basement",
  "playroom", "gym", "sunroom", "entryway",
] as const;

// Style questionnaire schema
const styleAnswersSchema = z.object({
  designStyle: z.enum([
    "modern_minimalist", "traditional_classic", "farmhouse_rustic",
    "mid_century_modern", "coastal_beach", "industrial_loft",
    "bohemian_eclectic", "transitional", "scandinavian", "glam_luxury",
  ]).describe("Overall design aesthetic"),
  colorPalette: z.enum([
    "neutral_whites_grays", "warm_earth_tones", "cool_blues_greens",
    "bold_jewel_tones", "black_white_contrast", "soft_pastels",
    "warm_wood_tones", "monochromatic",
  ]).describe("Preferred color palette"),
  budget: z.enum([
    "under_5k", "5k_to_15k", "15k_to_30k", "30k_to_60k", "60k_plus",
  ]).describe("Renovation budget range"),
  priorities: z.array(z.enum([
    "maximize_storage", "better_lighting", "open_floor_plan",
    "luxury_finishes", "family_friendly", "entertaining_space",
    "home_office_integration", "smart_home_features", "energy_efficiency",
    "pet_friendly",
  ])).max(3).describe("Top 3 renovation priorities"),
  keepItems: z.string().max(500).optional().describe("Items to keep from current room"),
  additionalNotes: z.string().max(1000).optional().describe("Any other preferences or requirements"),
});

type StyleAnswers = z.infer<typeof styleAnswersSchema>;

// Build a detailed AI image generation prompt from the style answers
async function buildRoomPrompt(
  roomType: string,
  styleAnswers: StyleAnswers,
  photoUrls: string[],
): Promise<string> {
  const roomLabel = roomType.replace(/_/g, " ");
  const styleLabel = styleAnswers.designStyle.replace(/_/g, " ");
  const colorLabel = styleAnswers.colorPalette.replace(/_/g, " ");
  const budgetLabel = styleAnswers.budget.replace(/_/g, " ");
  const priorityLabels = styleAnswers.priorities.map(p => p.replace(/_/g, " ")).join(", ");

  // Use LLM to generate a high-quality, detailed image prompt
  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are an expert interior design AI that creates detailed, photorealistic image generation prompts for room makeovers.
Your prompts must be specific, vivid, and technically precise to produce stunning, realistic interior design renders.
Always describe: lighting quality, materials, textures, furniture arrangement, color harmony, and architectural details.
Format: Write a single paragraph of 150-200 words, starting with "Photorealistic interior design render of a".
Do NOT include any explanations, just the prompt.`,
      },
      {
        role: "user",
        content: `Create an image generation prompt for a ${budgetLabel} ${styleLabel} ${roomLabel} makeover.
Color palette: ${colorLabel}.
Top priorities: ${priorityLabels}.
${styleAnswers.keepItems ? `Items to keep/incorporate: ${styleAnswers.keepItems}.` : ""}
${styleAnswers.additionalNotes ? `Additional requirements: ${styleAnswers.additionalNotes}.` : ""}
The result should look like a professional interior design magazine photo.`,
      },
    ],
  });

  const rawPrompt = response?.choices?.[0]?.message?.content;
  const basePrompt = typeof rawPrompt === "string" ? rawPrompt : `Photorealistic interior design render of a ${styleLabel} ${roomLabel} with ${colorLabel} color palette, professional lighting, high-end finishes, and magazine-quality photography.`;

  return basePrompt;
}

// Identify room type from photo using AI vision
async function identifyRoomFromPhoto(photoUrl: string): Promise<{ roomType: string; confidence: number; description: string }> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "You are an AI that identifies room types from photos. Respond with JSON only.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Identify the room type in this photo. Respond with JSON: { \"roomType\": \"living_room|kitchen|bedroom|bathroom|dining_room|home_office|laundry_room|garage|outdoor_patio|basement|playroom|gym|sunroom|entryway|other\", \"confidence\": 0.0-1.0, \"description\": \"brief description of what you see\" }",
            },
            { type: "image_url", image_url: { url: photoUrl, detail: "low" as const } },
          ] as any,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "room_identification",
          strict: true,
          schema: {
            type: "object",
            properties: {
              roomType: { type: "string" },
              confidence: { type: "number" },
              description: { type: "string" },
            },
            required: ["roomType", "confidence", "description"],
            additionalProperties: false,
          },
        },
      },
    });
    const raw = response?.choices?.[0]?.message?.content;
    const content = typeof raw === "string" ? raw : JSON.stringify(raw);
    return JSON.parse(content);
  } catch {
    return { roomType: "living_room", confidence: 0.5, description: "Could not identify room type" };
  }
}

export const roomMakeoverRouter = router({
  // Identify room type from a photo (used for home profile tagging)
  identifyRoom: publicProcedure
    .input(z.object({ photoUrl: z.string().url() }))
    .mutation(async ({ input }) => {
      return identifyRoomFromPhoto(input.photoUrl);
    }),

  // Start a new makeover session (save photos + answers, queue AI generation)
  startSession: publicProcedure
    .input(z.object({
      roomType: z.enum(ROOM_TYPES),
      photoUrls: z.array(z.string().url()).min(1).max(4),
      styleAnswers: styleAnswersSchema,
      guestEmail: z.string().email().optional(),
      guestName: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      const userId = (ctx as any).user?.id ?? null;

      // Build the AI prompt
      const aiPrompt = await buildRoomPrompt(input.roomType, input.styleAnswers, input.photoUrls);

      // Insert session record
      const [result] = await db.insert(roomMakeoverSessions).values({
        homeownerUserId: userId,
        guestEmail: input.guestEmail ?? null,
        guestName: input.guestName ?? null,
        roomType: input.roomType,
        photoUrls: input.photoUrls as any,
        styleAnswers: input.styleAnswers as any,
        aiPrompt,
        generationStatus: 'processing',
      });
      const sessionId = (result as any).insertId;

      // Generate the AI image (async — update session when done)
      generateImage({
        prompt: aiPrompt,
        originalImages: input.photoUrls.slice(0, 1).map(url => ({ url, mimeType: "image/jpeg" })),
      }).then(async ({ url }) => {
        const db2 = await getDb();
        if (!db2 || !url) return;
        await db2.update(roomMakeoverSessions).set({
          generatedImageUrl: url,
          generationStatus: 'complete',
        }).where(eq(roomMakeoverSessions.id, sessionId));
      }).catch(async (err) => {
        console.error('[RoomMakeover] Image generation failed:', err);
        const db2 = await getDb();
        if (!db2) return;
        await db2.update(roomMakeoverSessions).set({
          generationStatus: 'failed',
          generationError: String(err?.message ?? err),
        }).where(eq(roomMakeoverSessions.id, sessionId));
      });

      return { success: true, sessionId, aiPrompt };
    }),

  // Poll session status (frontend polls until generationStatus = 'complete' or 'failed')
  getSession: publicProcedure
    .input(z.object({ sessionId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      const [session] = await db.select().from(roomMakeoverSessions)
        .where(eq(roomMakeoverSessions.id, input.sessionId))
        .limit(1);
      if (!session) throw new TRPCError({ code: 'NOT_FOUND' });
      return session;
    }),

  // Get all sessions for the logged-in homeowner
  getMySessions: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    return db.select().from(roomMakeoverSessions)
      .where(eq(roomMakeoverSessions.homeownerUserId, ctx.user.id))
      .orderBy(desc(roomMakeoverSessions.createdAt))
      .limit(20);
  }),

  // Save session to home profile
  saveToProfile: protectedProcedure
    .input(z.object({ sessionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      const [session] = await db.select().from(roomMakeoverSessions)
        .where(eq(roomMakeoverSessions.id, input.sessionId)).limit(1);
      if (!session) throw new TRPCError({ code: 'NOT_FOUND' });
      if (session.homeownerUserId !== ctx.user.id) throw new TRPCError({ code: 'FORBIDDEN' });
      await db.update(roomMakeoverSessions).set({ savedToHomeProfile: true })
        .where(eq(roomMakeoverSessions.id, input.sessionId));
      return { success: true };
    }),

  // Get available room types and style options (for the frontend wizard)
  getOptions: publicProcedure.query(() => {
    return {
      roomTypes: ROOM_TYPES,
      designStyles: [
        { value: "modern_minimalist", label: "Modern Minimalist", description: "Clean lines, neutral tones, uncluttered spaces" },
        { value: "traditional_classic", label: "Traditional Classic", description: "Timeless elegance with rich woods and ornate details" },
        { value: "farmhouse_rustic", label: "Farmhouse Rustic", description: "Warm, cozy with natural textures and vintage charm" },
        { value: "mid_century_modern", label: "Mid-Century Modern", description: "Retro-inspired with organic shapes and bold accents" },
        { value: "coastal_beach", label: "Coastal Beach", description: "Light, airy with ocean-inspired blues and natural materials" },
        { value: "industrial_loft", label: "Industrial Loft", description: "Raw materials, exposed elements, urban sophistication" },
        { value: "bohemian_eclectic", label: "Bohemian Eclectic", description: "Layered textures, global patterns, artistic expression" },
        { value: "transitional", label: "Transitional", description: "Perfect blend of traditional and contemporary" },
        { value: "scandinavian", label: "Scandinavian", description: "Functional simplicity with warm, hygge-inspired comfort" },
        { value: "glam_luxury", label: "Glam & Luxury", description: "Opulent finishes, metallic accents, statement pieces" },
      ],
      colorPalettes: [
        { value: "neutral_whites_grays", label: "Neutral Whites & Grays", preview: ["#F5F5F5", "#E0E0E0", "#9E9E9E"] },
        { value: "warm_earth_tones", label: "Warm Earth Tones", preview: ["#D4A574", "#8B6F47", "#5C4033"] },
        { value: "cool_blues_greens", label: "Cool Blues & Greens", preview: ["#B3D9E8", "#5B9BD5", "#2E7D32"] },
        { value: "bold_jewel_tones", label: "Bold Jewel Tones", preview: ["#7B1FA2", "#1565C0", "#00695C"] },
        { value: "black_white_contrast", label: "Black & White Contrast", preview: ["#FFFFFF", "#757575", "#212121"] },
        { value: "soft_pastels", label: "Soft Pastels", preview: ["#F8BBD9", "#B3E5FC", "#DCEDC8"] },
        { value: "warm_wood_tones", label: "Warm Wood Tones", preview: ["#EFEBE9", "#A1887F", "#4E342E"] },
        { value: "monochromatic", label: "Monochromatic", preview: ["#E3F2FD", "#1976D2", "#0D47A1"] },
      ],
      budgets: [
        { value: "under_5k", label: "Under $5,000", description: "Refresh with paint, accessories, and small updates" },
        { value: "5k_to_15k", label: "$5,000 – $15,000", description: "New furniture, lighting, and cosmetic upgrades" },
        { value: "15k_to_30k", label: "$15,000 – $30,000", description: "Significant renovation with new fixtures and finishes" },
        { value: "30k_to_60k", label: "$30,000 – $60,000", description: "Full room transformation with structural changes" },
        { value: "60k_plus", label: "$60,000+", description: "Premium renovation with luxury materials and custom work" },
      ],
      priorities: [
        { value: "maximize_storage", label: "Maximize Storage" },
        { value: "better_lighting", label: "Better Lighting" },
        { value: "open_floor_plan", label: "Open Floor Plan" },
        { value: "luxury_finishes", label: "Luxury Finishes" },
        { value: "family_friendly", label: "Family-Friendly" },
        { value: "entertaining_space", label: "Entertaining Space" },
        { value: "home_office_integration", label: "Home Office Integration" },
        { value: "smart_home_features", label: "Smart Home Features" },
        { value: "energy_efficiency", label: "Energy Efficiency" },
        { value: "pet_friendly", label: "Pet-Friendly" },
      ],
    };
  }),
});
