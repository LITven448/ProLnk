import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { integrationsRouter } from "./routers/integrations";
import { customerDealsRouter } from "./routers/customerDeals";
import { dataIntelligenceRouter } from "./routers/dataIntelligence";
import { reviewsRouter } from "./routers/reviews";
import { verificationRouter } from "./routers/verification";
import { stripeRouter } from "./routers/stripe";
import { paymentsRouter } from "./routers/payments";
import { stormAgentRouter } from "./routers/stormAgent";
import { realEstateAgentsRouter } from "./routers/realEstateAgents";
import { insuranceClaimsRouter } from "./routers/insuranceClaims";
import { featuredAdvertisersRouter } from "./routers/featuredAdvertisers";
import { supportChatRouter } from "./routers/supportChat";
import { photoQueueRouter } from "./routers/photoQueue";
import { bundleOffersRouter } from "./routers/bundleOffers";
import { quickQuoteRouter } from "./routers/quickQuote";
import { sendPartnerApplicationReceived, sendPartnerApproved, sendPartnerRejected, sendNewLeadNotification, sendHomeownerWelcome, sendQuoteRequestReceived, sendRoomMakeoverReady, sendQuoteResponseNotification, sendCommissionEarned, sendPayoutConfirmation, sendProWaitlistConfirmation, sendHomeownerWaitlistConfirmation, sendStormAlertToPro, sendReviewRequest, sendNeighborhoodReferralInvite } from "./email";
import { roomMakeoverRouter } from "./routers/roomMakeover";
import { serviceAreaRouter } from "./routers/serviceArea";
import { homeownerExtrasRouter } from "./routers/homeownerExtras";
import { profile360Router } from "./routers/profile360";
import { adminExtrasRouter } from "./routers/adminExtras";
import { marketingAutomationRouter } from "./routers/marketingAutomation";
import { fsmVaultRouter } from "./routers/fsmVault";
import { exchangeRouter } from "./routers/exchange";
import { partnerToolsRouter } from "./routers/partnerTools";
import { networkRouter } from "./routers/network";
import { brainTrustRouter } from "./routers/brainTrust";
import { briefcaseRouter } from "./routers/briefcase";
import { scoutRouter } from "./routers/scout";
import { proPassRouter } from "./routers/proPass";
import { foundingPartnerRouter } from "./routers/foundingPartner";
import { bidBoardRouter } from "./routers/bidBoard";
import { smartRouteRouter } from "./routers/smartRoute";
import { adminDisputesRouter } from "./routers/adminDisputes";
import { adminNotificationsRouter } from "./routers/adminNotifications";
import { checkrRouter } from "./routers/checkr";
import { facilityRouter } from "./routers/facility";
import { projectBidsRouter } from "./routers/projectBids";
import { waitlistRouter } from "./routers/waitlist";
import { waitlistAdminRouter } from "./routers/waitlistAdmin";
import { analyticsAdminRouter } from "./routers/analyticsAdmin";
import { runCircumventionSweep, getFlagsForAdmin, resolveFlag } from "./circumvention-detector";
import { calculatePartnerPriorityScore, recalculateAllPartnerScores, updatePartnerResponseSpeed } from "./routers/partnerScore";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import { sdk } from "./_core/sdk";
import { invokeLLM } from "./_core/llm";
import {
  upsertUser,
  getUserByOpenId,
  getPartnerByUserId,
  getPartnerByEmail,
  getPartnerById,
  createPartner,
  getPendingPartners,
  getAllPartners,
  getApprovedPartners,
  approvePartner,
  rejectPartner,
  updatePartnerCommissionRates,
  incrementPartnerStats,
  createJob,
  getJobById,
  getJobsByPartnerId,
  getAllJobs,
  getJobsByAddress,
  getUniqueAddresses,
  updateJobAiAnalysis,
  createOpportunity,
  getOpportunitiesByReceivingPartnerId,
  getOpportunitiesBySourcePartnerId,
  getAllOpportunities,
  updateOpportunityStatus,
  closeOpportunityWithJobValue,
  getCommissionsByPartnerId,
  getEarnedCommissionsByPartnerId,
  getUnpaidCommissions,
  markCommissionPaid,
  createBroadcast,
  getBroadcasts,
  getNetworkStats,
  getPartnerStats,
  linkPartnerToUser,
  getIndustryRates,
  upsertIndustryRate,
  getDb,
  getPhotoQueue,
  getPhotoQueueStats,
  getPartnerNotifications,
  getPartnerUnreadCount,
  markNotificationsRead,
  createPartnerNotification,
} from "./db";
import { n8n } from "./n8n-triggers";
import type { AiAnalysisResult } from "../drizzle/schema";
import { users, partners, jobs, commissions, opportunities, quickQuoteRequests, roomMakeoverSessions } from "../drizzle/schema";
import { DFW_ZIP_CODES, TIER_ZIP_LIMITS, getMaxZipsForTier, isValidDFWZip } from "../shared/dfw-zipcodes";
import { eq, sql, and, or, ne, desc } from "drizzle-orm";
import { ENV } from "./_core/env";
import { ONE_YEAR_MS } from "@shared/const";
import { dispatchLeadToPartner, rejectOpportunityByAdmin, sweepExpiredLeads } from "./intake-router";

// -- Admin guard --
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

async function logAdminAction(adminUserId: number, action: string, targetType: string, targetId: number, detail?: Record<string, unknown>) {
  try {
    const db = await getDb();
    if (!db) return;
    await (db as any).execute(sql`
      INSERT INTO adminAuditLog (adminUserId, action, targetType, targetId, detail)
      VALUES (${adminUserId}, ${action}, ${targetType}, ${targetId}, ${detail ? JSON.stringify(detail) : null})
    `);
  } catch { /* non-fatal */ }
}

// -- Schemas --
const applySchema = z.object({
  businessName: z.string().min(2),
  businessType: z.string().min(1),
  serviceArea: z.string().min(3),
  contactName: z.string().min(2),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
  website: z.string().optional(),
  description: z.string().optional(),
  referredByCode: z.string().optional(), // 6-char network ref code OR legacy "partner-42" format
  businessMailingAddress: z.string().optional(),
  agreementAccepted: z.boolean().optional(),
});

// -- AI Analysis Helper --
async function analyzePhotosWithAI(photoUrls: string[], serviceAddress: string): Promise<AiAnalysisResult> {
  if (!photoUrls.length) {
    return { opportunities: [], photoQuality: "unusable", analysisNotes: "No photos provided" };
  }

  const imageContents = photoUrls.slice(0, 4).map(url => ({
    type: "image_url" as const,
    image_url: { url, detail: "high" as const },
  }));

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are an AI assistant for ProLnk, a home service partner network. 
Analyze job completion photos from field technicians and identify upsell/cross-sell opportunities for other home service businesses.

Look for:
- Lawn care needs (overgrown grass, bare patches, weeds)
- Landscaping opportunities (mulch, flower beds, drainage issues)
- Fence/gate damage or maintenance needs
- Window cleaning or repair needs
- Pest control indicators (ant mounds, wasp nests, rodent signs)
- Pool/spa maintenance needs
- Pressure washing opportunities (dirty driveways, siding, decks)
- Artificial turf opportunities (dead grass, high-maintenance areas)
- Tree trimming or removal needs
- Gutter cleaning needs
- Exterior painting needs
- Irrigation/sprinkler issues
- Security camera or smart home opportunities
- Water filtration needs (visible water stains, old equipment)
- General handyman needs (broken items, worn surfaces)
- Remodeling opportunities (outdated features, damage)

Return a JSON object with this exact structure:
{
  "opportunities": [
    {
      "type": "specific_service_name",
      "category": "service_category",
      "confidence": 0.0-1.0,
      "description": "specific observation from the photo",
      "estimatedValue": estimated_job_value_in_dollars
    }
  ],
  "photoQuality": "good|poor|unusable",
  "analysisNotes": "brief notes about the analysis"
}

Only include opportunities with confidence >= 0.6. Be specific and actionable.`,
      },
      {
        role: "user",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        content: [
          {
            type: "text",
            text: `Analyze these job completion photos from a service at ${serviceAddress}. Identify any home service opportunities you can see.`,
          },
          ...imageContents,
        ] as any,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "opportunity_analysis",
        strict: true,
        schema: {
          type: "object",
          properties: {
            opportunities: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  type: { type: "string" },
                  category: { type: "string" },
                  confidence: { type: "number" },
                  description: { type: "string" },
                  estimatedValue: { type: "number" },
                },
                required: ["type", "category", "confidence", "description", "estimatedValue"],
                additionalProperties: false,
              },
            },
            photoQuality: { type: "string", enum: ["good", "poor", "unusable"] },
            analysisNotes: { type: "string" },
          },
          required: ["opportunities", "photoQuality", "analysisNotes"],
          additionalProperties: false,
        },
      },
    },
  });

  const rawContent = response.choices?.[0]?.message?.content;
  if (!rawContent) return { opportunities: [], photoQuality: "poor", analysisNotes: "AI analysis failed" };
  const content = typeof rawContent === "string" ? rawContent : JSON.stringify(rawContent);

  try {
    return JSON.parse(content) as AiAnalysisResult;
  } catch {
    return { opportunities: [], photoQuality: "poor", analysisNotes: "Failed to parse AI response" };
  }
}

// -- Category -> Business Type mapping --
const CATEGORY_TO_BUSINESS_TYPE: Record<string, string[]> = {
  lawn_care: ["Lawn Care", "Landscaping"],
  landscaping: ["Landscaping", "Lawn Care"],
  fence_repair: ["Handyman", "Fence & Gate"],
  window_cleaning: ["Window Cleaning"],
  window_repair: ["Handyman", "Window Repair"],
  pest_control: ["Pest Control"],
  pool_maintenance: ["Pool Service", "Pool Cleaning"],
  pressure_washing: ["Pressure Washing"],
  artificial_turf: ["Artificial Turf", "Landscaping"],
  tree_service: ["Tree Service", "Landscaping"],
  gutter_cleaning: ["Gutter Cleaning", "Handyman"],
  painting: ["Painting"],
  irrigation: ["Irrigation", "Landscaping"],
  security: ["Security", "Smart Home"],
  water_filtration: ["Water Filtration", "Plumbing"],
  handyman: ["Handyman"],
  remodeling: ["Remodeling", "Handyman"],
  hvac: ["HVAC"],
  plumbing: ["Plumbing"],
  electrical: ["Electrical"],
  roofing: ["Roofing"],
  concrete: ["Concrete", "Handyman"],
  garage: ["Garage Epoxy", "Handyman"],
};

function getMatchingBusinessTypes(category: string): string[] {
  const normalized = category.toLowerCase().replace(/[^a-z_]/g, "_");
  for (const [key, types] of Object.entries(CATEGORY_TO_BUSINESS_TYPE)) {
    if (normalized.includes(key) || key.includes(normalized)) return types;
  }
  return ["Handyman"];
}

// -- In-memory rate limit store for analyzePhotos (max 5/IP/hour, max 15/user/day) --
const analyzePhotosRateLimit = new Map<string, number[]>();
const analyzePhotosUserDailyLimit = new Map<number, number[]>();

// -- App router --
export const appRouter = router({
  system: systemRouter,
  integrations: integrationsRouter,
  dataIntel: dataIntelligenceRouter,
  deals: customerDealsRouter,
  reviews: reviewsRouter,
  verification: verificationRouter,
  stripe: stripeRouter,
  payments: paymentsRouter,
  stormAgent: stormAgentRouter,
  realEstateAgents: realEstateAgentsRouter,
  insuranceClaims: insuranceClaimsRouter,
  featuredAdvertisers: featuredAdvertisersRouter,
  supportChat: supportChatRouter,
  photoQueue: photoQueueRouter,
  bundleOffers: bundleOffersRouter,
  quickQuote: quickQuoteRouter,
  roomMakeover: roomMakeoverRouter,
  serviceArea: serviceAreaRouter,
  homeownerExtras: homeownerExtrasRouter,
  profile360: profile360Router,
  adminExtras: adminExtrasRouter,
  marketingAutomation: marketingAutomationRouter,
  fsmVault: fsmVaultRouter,
  exchange: exchangeRouter,
  partnerTools: partnerToolsRouter,
  projectBids: projectBidsRouter,
  network: networkRouter,
  brainTrust: brainTrustRouter,
  briefcase: briefcaseRouter,
  scout: scoutRouter,
  proPass: proPassRouter,
  foundingPartner: foundingPartnerRouter,
  bidBoard: bidBoardRouter,
  smartRoute: smartRouteRouter,
  adminDisputes: adminDisputesRouter,
  adminNotifications: adminNotificationsRouter,
  checkr: checkrRouter,
  facility: facilityRouter,
  homeowner: router({
    // -- Profile --
    saveProfile: protectedProcedure
      .input(z.object({
        displayName: z.string().optional(),
        phone: z.string().optional(),
        bio: z.string().optional(),
        contactPreference: z.enum(["email","text","phone","in_app"]).optional(),
        openToRecommendations: z.boolean().optional(),
        consentTerms: z.boolean().optional(),
        consentPhotos: z.boolean().optional(),
        consentPartnerContact: z.boolean().optional(),
        consentAiData: z.boolean().optional(),
        setupComplete: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const existing = await db.execute(
          sql`SELECT id FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
        ) as any;
        const row = existing[0]?.[0] ?? existing[0];
        if (row?.id) {
          await db.execute(
            sql`UPDATE homeownerProfiles SET
              displayName=${input.displayName ?? null},
              phone=${input.phone ?? null},
              bio=${input.bio ?? null},
              contactPreference=${input.contactPreference ?? 'email'},
              openToRecommendations=${input.openToRecommendations ?? true},
              consentTerms=${input.consentTerms ?? false},
              consentPhotos=${input.consentPhotos ?? false},
              consentPartnerContact=${input.consentPartnerContact ?? false},
              consentAiData=${input.consentAiData ?? false},
              setupComplete=${input.setupComplete ?? false}
            WHERE userId=${ctx.user.id}`
          );
        } else {
          await db.execute(
            sql`INSERT INTO homeownerProfiles
              (userId, displayName, phone, bio, contactPreference, openToRecommendations,
               consentTerms, consentPhotos, consentPartnerContact, consentAiData, setupComplete)
            VALUES
              (${ctx.user.id}, ${input.displayName ?? null}, ${input.phone ?? null},
               ${input.bio ?? null}, ${input.contactPreference ?? 'email'},
               ${input.openToRecommendations ?? true},
               ${input.consentTerms ?? false}, ${input.consentPhotos ?? false},
               ${input.consentPartnerContact ?? false}, ${input.consentAiData ?? false},
               ${input.setupComplete ?? false})`
          );
        }
        // Fire welcome notification when homeowner completes the wizard for the first time
        if (input.setupComplete) {
          // Bridge: upsert homeWaitlist so admin counter reflects ALL signups (public form + wizard)
          try {
            const profileRows = await db.execute(
              sql`SELECT id FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
            ) as any;
            const profileId = profileRows[0]?.[0]?.id ?? profileRows[0]?.id;
            if (profileId) {
              const propRows = await db.execute(
                sql`SELECT * FROM properties WHERE ownerId = ${profileId} ORDER BY isPrimary DESC LIMIT 1`
              ) as any;
              const prop = propRows[0]?.[0] ?? propRows[0];
              const nameParts = (input.displayName ?? ctx.user.name ?? '').trim().split(' ');
              const firstName = nameParts[0] ?? '';
              const lastName = nameParts.slice(1).join(' ') || '';
              const email = ctx.user.email ?? '';
              const phone = input.phone ?? null;
              const address = prop?.address ?? '';
              const city = prop?.city ?? '';
              const state = prop?.state ?? '';
              const zipCode = prop?.zip ?? '';
              const homeType = prop?.propertyType ?? 'single_family';
              const yearBuilt = prop?.yearBuilt ?? null;
              const squareFootage = prop?.sqft ?? null;
              const bedrooms = prop?.bedrooms ?? null;
              const bathrooms = prop?.bathrooms ?? null;
              // Map extended ownership types to the DB enum (own/rent)
              const rawOwnership = (prop as any)?.ownershipType ?? 'primary_residence';
              const ownershipStatus = rawOwnership === 'rental' ? 'rent' : 'own';
              // Check if a waitlist entry already exists for this email
              const existingWl = await db.execute(
                sql`SELECT id FROM homeWaitlist WHERE email = ${email} LIMIT 1`
              ) as any;
              const existingWlId = existingWl[0]?.[0]?.id ?? existingWl[0]?.id;
              if (existingWlId) {
                await db.execute(
                  sql`UPDATE homeWaitlist SET
                    firstName=${firstName}, lastName=${lastName}, phone=${phone},
                    address=${address}, city=${city}, state=${state}, zipCode=${zipCode},
                    homeType=${homeType}, yearBuilt=${yearBuilt}, squareFootage=${squareFootage},
                    bedrooms=${bedrooms}, bathrooms=${bathrooms}, ownershipStatus=${ownershipStatus},
                    status='approved', consentTerms=${input.consentTerms ? 1 : 0}, updatedAt=NOW()
                  WHERE id=${existingWlId}`
                );
              } else {
                await db.execute(
                  sql`INSERT INTO homeWaitlist
                    (firstName, lastName, email, phone, address, city, state, zipCode,
                     homeType, yearBuilt, squareFootage, bedrooms, bathrooms,
                     ownershipStatus, desiredProjects, projectTimeline,
                     consentTerms, consentEmail, consentDataUse, status)
                  VALUES
                    (${firstName}, ${lastName}, ${email}, ${phone}, ${address}, ${city}, ${state}, ${zipCode},
                     ${homeType}, ${yearBuilt}, ${squareFootage}, ${bedrooms}, ${bathrooms},
                     ${ownershipStatus}, '[]', 'just_exploring',
                     ${input.consentTerms ? 1 : 0}, 1, 1, 'approved')`
                );
              }
            }
          } catch (_) {
            // non-fatal — profile is saved regardless
          }
          try {
            await notifyOwner({
              title: 'New TrustyPro Home Profile Completed',
              content: `${input.displayName ?? ctx.user.name ?? ctx.user.email} just completed their home profile on TrustyPro. Their property data, wish list, and photos are ready for AI matching.`,
            });
            // Send welcome email via Resend
            if (ctx.user.email) {
              await sendHomeownerWelcome({
                to: ctx.user.email,
                name: input.displayName ?? ctx.user.name ?? 'Homeowner',
                dashboardUrl: `${ENV.oAuthServerUrl?.replace('api.', '') ?? 'https://trustypro.com'}/my-home`,
              }).catch(() => {});
            }
            // Fire n8n webhook for homeowner welcome sequence
            await n8n.homeownerProfileComplete({
              userId: ctx.user.id,
              email: ctx.user.email ?? undefined,
              name: input.displayName ?? ctx.user.name ?? undefined,
              timestamp: new Date().toISOString(),
            }).catch(() => {}); // non-fatal
          } catch (_) {
            // non-fatal — profile is saved regardless
          }
        }
        return { success: true };
      }),
    getProfile: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
      const rows = await db.execute(
        sql`SELECT * FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
      ) as any;
      return (rows[0]?.[0] ?? null) as any;
    }),

    // -- Properties --
    getMyProperties: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
      const profile = await db.execute(
        sql`SELECT id FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
      ) as any;
      const profileId = profile[0]?.[0]?.id ?? profile[0]?.id;
      if (!profileId) return [];
      const rows = await db.execute(
        sql`SELECT * FROM properties WHERE ownerId = ${profileId} ORDER BY isPrimary DESC, createdAt ASC`
      ) as any;
      return (rows[0] ?? rows) as any[];
    }),
    saveProperty: protectedProcedure
      .input(z.object({
        id: z.number().optional(), // if provided = update, else = create
        nickname: z.string().optional(),
        address: z.string(),
        city: z.string().optional(),
        state: z.string().optional(),
        zip: z.string().optional(),
        propertyType: z.enum(["single_family","condo","townhouse","multi_family","other"]).optional(),
        yearBuilt: z.number().optional(),
        sqft: z.number().optional(),
        bedrooms: z.number().optional(),
        bathrooms: z.number().optional(),
        lotSize: z.enum(["under_0_25","0_25_to_0_5","0_5_to_1","over_1"]).optional(),
        hasPool: z.boolean().optional(),
        hasSpa: z.boolean().optional(),
        hasGarage: z.boolean().optional(),
        garageType: z.enum(["attached","detached","none"]).optional(),
        garageSpaces: z.number().optional(),
        hasFence: z.boolean().optional(),
        fenceType: z.enum(["wood","iron_wrought","vinyl","chain_link","brick_stone","aluminum","mixed","none"]).optional(),
        hasDeck: z.boolean().optional(),
        hasPatio: z.boolean().optional(),
        hasOutdoorKitchen: z.boolean().optional(),
        hasBasement: z.boolean().optional(),
        hasAttic: z.boolean().optional(),
        hasSolarPanels: z.boolean().optional(),
        hasGenerator: z.boolean().optional(),
        hasSmartHome: z.boolean().optional(),
        hasIrrigationSystem: z.boolean().optional(),
        hasSecuritySystem: z.boolean().optional(),
        hasEvCharger: z.boolean().optional(),
        hasWaterSoftener: z.boolean().optional(),
        hasOutdoorLighting: z.boolean().optional(),
        drivewaySurface: z.enum(["concrete","asphalt","pavers","gravel","brick","dirt","none"]).optional(),
        storiesCount: z.enum(["1","1.5","2","3_plus"]).optional(),
        lawnSize: z.enum(["minimal","small","medium","large","very_large"]).optional(),
        hasGardenBeds: z.boolean().optional(),
        treeCount: z.enum(["none","1_3","4_10","over_10"]).optional(),
        // Interior features
        flooringTypes: z.array(z.string()).optional(),
        kitchenCountertop: z.enum(["granite","quartz","marble","laminate","butcher_block","concrete","tile","other","unknown"]).optional(),
        primaryBathType: z.enum(["walk_in_shower","tub_shower_combo","soaking_tub","double_vanity","single_vanity","unknown"]).optional(),
        fireplaceType: z.enum(["gas","wood_burning","electric","none"]).optional(),
        fireplaceCount: z.number().optional(),
        ceilingHeight: z.enum(["standard_8ft","9ft","10ft","vaulted","cathedral","mixed"]).optional(),
        windowType: z.enum(["single_pane","double_pane","triple_pane","impact_resistant","unknown"]).optional(),
        applianceBrands: z.record(z.string(), z.string()).optional(),
        // Pets
        hasPets: z.boolean().optional(),
        dogCount: z.number().optional(),
        dogBreedSize: z.enum(["small","medium","large","mixed","none"]).optional(),
        catCount: z.number().optional(),
        otherPets: z.string().optional(),
        petServiceNeeds: z.array(z.string()).optional(),
        // Existing
        isPrimary: z.boolean().optional(),
        isRental: z.boolean().optional(),
        occupancy: z.enum(["owner_occupied","tenant_occupied","vacant"]).optional(),
        ownershipYears: z.enum(["under_1","1_to_3","3_to_7","7_to_15","over_15"]).optional(),
        homeSystems: z.array(z.string()).optional(),
        systemAges: z.record(z.string(), z.string()).optional(),
        hiringPriorities: z.array(z.string()).optional(),
        stylePreferences: z.object({
          homeStyle: z.string().optional(),
          exteriorColor: z.string().optional(),
          interiorPalette: z.string().optional(),
          designAesthetic: z.string().optional(),
          styleNotes: z.string().optional(),
        }).optional(),
        inspirationPhotoUrls: z.array(z.string()).optional(),
        setupStep: z.number().optional(),
        setupComplete: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        // Ensure homeowner profile exists
        let profileRows = await db.execute(
          sql`SELECT id FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
        ) as any;
        let profileId = profileRows[0]?.[0]?.id ?? profileRows[0]?.id;
        if (!profileId) {
          await db.execute(
            sql`INSERT INTO homeownerProfiles (userId, setupComplete) VALUES (${ctx.user.id}, 0)`
          );
          profileRows = await db.execute(
            sql`SELECT id FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
          ) as any;
          profileId = profileRows[0]?.[0]?.id ?? profileRows[0]?.id;
        }
        const priorities = JSON.stringify(input.hiringPriorities ?? []);
        const stylePrefs = JSON.stringify(input.stylePreferences ?? {});
        const inspirationPhotos = JSON.stringify(input.inspirationPhotoUrls ?? []);
        const homeSystems = JSON.stringify(input.homeSystems ?? []);
        const systemAges = JSON.stringify(input.systemAges ?? {});
        const flooringTypes = JSON.stringify(input.flooringTypes ?? []);
        const applianceBrands = JSON.stringify(input.applianceBrands ?? {});
        const petServiceNeeds = JSON.stringify(input.petServiceNeeds ?? []);
        if (input.id) {
          await db.execute(
            sql`UPDATE properties SET
              nickname=${input.nickname ?? null}, address=${input.address},
              city=${input.city ?? null}, state=${input.state ?? null}, zip=${input.zip ?? null},
              propertyType=${input.propertyType ?? 'single_family'},
              yearBuilt=${input.yearBuilt ?? null}, sqft=${input.sqft ?? null},
              bedrooms=${input.bedrooms ?? null}, bathrooms=${input.bathrooms ?? null},
              lotSize=${input.lotSize ?? null},
              hasPool=${input.hasPool ?? false}, hasSpa=${input.hasSpa ?? false},
              hasGarage=${input.hasGarage ?? false}, garageType=${input.garageType ?? 'none'},
              garageSpaces=${input.garageSpaces ?? 0},
              hasFence=${input.hasFence ?? false}, fenceType=${input.fenceType ?? 'none'},
              hasDeck=${input.hasDeck ?? false}, hasPatio=${input.hasPatio ?? false},
              hasOutdoorKitchen=${input.hasOutdoorKitchen ?? false},
              hasBasement=${input.hasBasement ?? false}, hasAttic=${input.hasAttic ?? false},
              hasSolarPanels=${input.hasSolarPanels ?? false}, hasGenerator=${input.hasGenerator ?? false},
              hasSmartHome=${input.hasSmartHome ?? false}, hasIrrigationSystem=${input.hasIrrigationSystem ?? false},
              hasSecuritySystem=${input.hasSecuritySystem ?? false}, hasEvCharger=${input.hasEvCharger ?? false},
              hasWaterSoftener=${input.hasWaterSoftener ?? false}, hasOutdoorLighting=${input.hasOutdoorLighting ?? false},
              drivewaySurface=${input.drivewaySurface ?? 'none'}, storiesCount=${input.storiesCount ?? null},
              lawnSize=${input.lawnSize ?? null}, hasGardenBeds=${input.hasGardenBeds ?? false},
              treeCount=${input.treeCount ?? 'none'},
              flooringTypes=${flooringTypes}, kitchenCountertop=${input.kitchenCountertop ?? 'unknown'},
              primaryBathType=${input.primaryBathType ?? 'unknown'},
              fireplaceType=${input.fireplaceType ?? 'none'}, fireplaceCount=${input.fireplaceCount ?? 0},
              ceilingHeight=${input.ceilingHeight ?? 'standard_8ft'}, windowType=${input.windowType ?? 'unknown'},
              applianceBrands=${applianceBrands},
              hasPets=${input.hasPets ?? false}, dogCount=${input.dogCount ?? 0},
              dogBreedSize=${input.dogBreedSize ?? 'none'}, catCount=${input.catCount ?? 0},
              otherPets=${input.otherPets ?? null}, petServiceNeeds=${petServiceNeeds},
              isPrimary=${input.isPrimary ?? true}, isRental=${input.isRental ?? false},
              occupancy=${input.occupancy ?? 'owner_occupied'},
              ownershipYears=${input.ownershipYears ?? null},
              homeSystems=${homeSystems}, systemAges=${systemAges},
              hiringPriorities=${priorities},
              stylePreferences=${stylePrefs},
              inspirationPhotoUrls=${inspirationPhotos},
              setupStep=${input.setupStep ?? 1},
              setupComplete=${input.setupComplete ?? false}
            WHERE id=${input.id} AND ownerId=${profileId}`
          );
          return { id: input.id };
        } else {
          const result = await db.execute(
            sql`INSERT INTO properties
              (ownerId, nickname, address, city, state, zip, propertyType, yearBuilt, sqft,
               bedrooms, bathrooms, lotSize, hasPool, hasSpa, hasGarage, garageType, garageSpaces,
               hasFence, fenceType, hasDeck, hasPatio, hasOutdoorKitchen, hasBasement, hasAttic,
               hasSolarPanels, hasGenerator, hasSmartHome, hasIrrigationSystem, hasSecuritySystem,
               hasEvCharger, hasWaterSoftener, hasOutdoorLighting, drivewaySurface, storiesCount,
               lawnSize, hasGardenBeds, treeCount, flooringTypes, kitchenCountertop, primaryBathType,
               fireplaceType, fireplaceCount, ceilingHeight, windowType, applianceBrands,
               hasPets, dogCount, dogBreedSize, catCount, otherPets, petServiceNeeds,
               isPrimary, isRental, occupancy, ownershipYears, homeSystems, systemAges, hiringPriorities,
               stylePreferences, inspirationPhotoUrls, setupStep, setupComplete)
            VALUES
              (${profileId}, ${input.nickname ?? null}, ${input.address},
               ${input.city ?? null}, ${input.state ?? null}, ${input.zip ?? null},
               ${input.propertyType ?? 'single_family'}, ${input.yearBuilt ?? null},
               ${input.sqft ?? null}, ${input.bedrooms ?? null}, ${input.bathrooms ?? null},
               ${input.lotSize ?? null}, ${input.hasPool ?? false}, ${input.hasSpa ?? false},
               ${input.hasGarage ?? false}, ${input.garageType ?? 'none'}, ${input.garageSpaces ?? 0},
               ${input.hasFence ?? false}, ${input.fenceType ?? 'none'},
               ${input.hasDeck ?? false}, ${input.hasPatio ?? false}, ${input.hasOutdoorKitchen ?? false},
               ${input.hasBasement ?? false}, ${input.hasAttic ?? false},
               ${input.hasSolarPanels ?? false}, ${input.hasGenerator ?? false},
               ${input.hasSmartHome ?? false}, ${input.hasIrrigationSystem ?? false},
               ${input.hasSecuritySystem ?? false}, ${input.hasEvCharger ?? false},
               ${input.hasWaterSoftener ?? false}, ${input.hasOutdoorLighting ?? false},
               ${input.drivewaySurface ?? 'none'}, ${input.storiesCount ?? null},
               ${input.lawnSize ?? null}, ${input.hasGardenBeds ?? false}, ${input.treeCount ?? 'none'},
               ${flooringTypes}, ${input.kitchenCountertop ?? 'unknown'}, ${input.primaryBathType ?? 'unknown'},
               ${input.fireplaceType ?? 'none'}, ${input.fireplaceCount ?? 0},
               ${input.ceilingHeight ?? 'standard_8ft'}, ${input.windowType ?? 'unknown'}, ${applianceBrands},
               ${input.hasPets ?? false}, ${input.dogCount ?? 0}, ${input.dogBreedSize ?? 'none'},
               ${input.catCount ?? 0}, ${input.otherPets ?? null}, ${petServiceNeeds},
               ${input.isPrimary ?? true}, ${input.isRental ?? false},
               ${input.occupancy ?? 'owner_occupied'}, ${input.ownershipYears ?? null},
               ${homeSystems}, ${systemAges}, ${priorities}, ${stylePrefs}, ${inspirationPhotos},
               ${input.setupStep ?? 1}, ${input.setupComplete ?? false})`
          ) as any;
          const newId = result[0]?.insertId ?? result.insertId;
          // Fire-and-forget ATTOM enrichment for new properties
          if (input.address) {
            setImmediate(async () => {
              try {
                const { getPropertyEnrichmentFields } = await import("./_core/attom");
                const enriched = await getPropertyEnrichmentFields({
                  address: input.address,
                  city: input.city ?? undefined,
                  state: input.state ?? undefined,
                  zip: input.zip ?? undefined,
                });
                if (Object.keys(enriched).length > 0) {
                  const fields = Object.entries(enriched)
                    .map(([k, v]) => `${k} = ${JSON.stringify(v)}`)
                    .join(", ");
                  await db.execute(sql.raw(`UPDATE properties SET ${fields} WHERE id = ${newId}`));
                  console.log(`[ATTOM] Enriched property #${newId}`);
                }
              } catch (e) {
                console.warn(`[ATTOM] Enrichment failed for property #${newId}:`, e);
              }
            });
          }
          return { id: newId };
        }
      }),

    // -- Improvements --
    saveImprovements: protectedProcedure
      .input(z.object({
        propertyId: z.number(),
        improvements: z.array(z.object({
          category: z.string(),
          completedYear: z.number().optional(),
          hasWarranty: z.boolean().optional(),
          notes: z.string().optional(),
        })),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        // Delete existing and re-insert (simpler than upsert for checklist)
        await db.execute(sql`DELETE FROM propertyImprovements WHERE propertyId = ${input.propertyId}`);
        for (const imp of input.improvements) {
          await db.execute(
            sql`INSERT INTO propertyImprovements (propertyId, category, completedYear, hasWarranty, notes)
                VALUES (${input.propertyId}, ${imp.category}, ${imp.completedYear ?? null}, ${imp.hasWarranty ?? false}, ${imp.notes ?? null})`
          );
        }
        return { success: true };
      }),
    getImprovements: protectedProcedure
      .input(z.object({ propertyId: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const rows = await db.execute(
          sql`SELECT * FROM propertyImprovements WHERE propertyId = ${input.propertyId} ORDER BY completedYear DESC`
        ) as any;
        return (rows[0] ?? rows) as any[];
      }),

    // -- Wishes --
    saveWishes: protectedProcedure
      .input(z.object({
        propertyId: z.number(),
        wishes: z.array(z.object({
          category: z.string(),
          budgetRange: z.enum(["under_1k","1k_5k","5k_15k","15k_50k","over_50k","not_sure"]).optional(),
          urgency: z.enum(["within_30_days","1_to_3_months","3_to_6_months","6_to_12_months","just_researching"]).optional(),
          notes: z.string().optional(),
        })),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        await db.execute(sql`DELETE FROM propertyWishes WHERE propertyId = ${input.propertyId} AND leadCreated = 0`);
        for (const wish of input.wishes) {
          await db.execute(
            sql`INSERT INTO propertyWishes (propertyId, category, budgetRange, urgency, notes)
                VALUES (${input.propertyId}, ${wish.category}, ${wish.budgetRange ?? null}, ${wish.urgency ?? null}, ${wish.notes ?? null})`
          );
        }
        return { success: true };
      }),
    getWishes: protectedProcedure
      .input(z.object({ propertyId: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const rows = await db.execute(
          sql`SELECT * FROM propertyWishes WHERE propertyId = ${input.propertyId} ORDER BY createdAt DESC`
        ) as any;
        return (rows[0] ?? rows) as any[];
      }),

    // -- Property Photos --
    uploadPropertyPhoto: protectedProcedure
      .input(z.object({
        propertyId: z.number(),
        roomLabel: z.string(),
        photoBase64: z.string(),
        mimeType: z.string().default('image/jpeg'),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const profile = await db.execute(
          sql`SELECT id FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
        ) as any;
        const profileId = profile[0]?.[0]?.id ?? profile[0]?.id;
        if (!profileId) throw new TRPCError({ code: 'NOT_FOUND', message: 'Profile not found' });
        const { storagePut } = await import('./storage');
        const buffer = Buffer.from(input.photoBase64, 'base64');
        const ext = input.mimeType.split('/')[1] ?? 'jpg';
        const key = `homeowner-photos/${profileId}/${input.propertyId}/${input.roomLabel}-${Date.now()}.${ext}`;
        const { url } = await storagePut(key, buffer, input.mimeType);
        await db.execute(
          sql`INSERT INTO propertyPhotos (propertyId, uploadedByUserId, s3Key, url, roomLabel)
              VALUES (${input.propertyId}, ${ctx.user.id}, ${key}, ${url}, ${input.roomLabel})`
        );
        return { url, key };
      }),
    getPropertyPhotos: protectedProcedure
      .input(z.object({ propertyId: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const rows = await db.execute(
          sql`SELECT * FROM propertyPhotos WHERE propertyId = ${input.propertyId} ORDER BY createdAt DESC`
        ) as any;
        return (rows[0] ?? rows) as any[];
      }),
    deletePropertyPhoto: protectedProcedure
      .input(z.object({ photoId: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        await db.execute(sql`DELETE FROM propertyPhotos WHERE id = ${input.photoId}`);
        return { success: true };
      }),
    getMyDeals: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
      // Get deals by user email or userId stored in customerDeals table
      const rows = await db.execute(
        sql`SELECT cd.id, cd.issueType, cd.issueCategory, cd.issueDescription,
            cd.issueDescriptionShort, cd.status, cd.aiConfidence,
            cd.estimatedValueLow, cd.estimatedValueHigh,
            cd.createdAt, cd.expiresAt,
            cd.homeownerName, cd.homeownerEmail, cd.photoUrl,
            cd.receivingPartnerId,
            rp.businessName AS proName, rp.tier AS proTier,
            rp.contactPhone AS partnerPhone, rp.contactEmail AS partnerEmail
            FROM customerDeals cd
            LEFT JOIN partners rp ON cd.receivingPartnerId = rp.id
            WHERE cd.homeownerEmail = ${ctx.user.email}
            ORDER BY cd.createdAt DESC LIMIT 50`
      ) as any;
      const deals = (rows[0] ?? rows) as any[];
      return deals.map((d: any) => ({
        id: Number(d.id),
        serviceType: d.issueType ?? 'Service',
        status: d.status ?? 'pending',
        urgencyLevel: d.aiConfidence != null ? (Number(d.aiConfidence) >= 80 ? 1 : Number(d.aiConfidence) >= 50 ? 2 : 3) : 2,
        createdAt: d.createdAt,
        expiresAt: d.expiresAt,
        homeownerName: d.homeownerName,
        homeownerEmail: d.homeownerEmail,
        estimateRange: d.estimatedValueLow && d.estimatedValueHigh
          ? `$${Math.round(Number(d.estimatedValueLow))}-$${Math.round(Number(d.estimatedValueHigh))}`
          : 'Free estimate',
        description: d.issueDescription ?? d.issueDescriptionShort ?? '',
        proName: d.proName,
        proTier: d.proTier,
        partnerId: d.receivingPartnerId ? Number(d.receivingPartnerId) : null,
        partnerPhone: d.partnerPhone ?? null,
        partnerEmail: d.partnerEmail ?? null,
        jobValueCents: d.estimatedValueLow ? Math.round(Number(d.estimatedValueLow) * 100) : 0,
      }));
    }),
    getMyReviews: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
      const rows = await db.execute(
        sql`SELECT pr.id, pr.rating, pr.reviewText, pr.ratingPunctuality, pr.ratingQuality, pr.ratingCommunication, pr.ratingValue,
            pr.googleReviewRequested, pr.yelpReviewRequested, pr.createdAt,
            p.businessName AS proName, p.trade AS proTrade
            FROM partnerReviews pr
            JOIN partners p ON pr.partnerId = p.id
            WHERE pr.homeownerEmail = ${ctx.user.email} AND pr.flagged = false
            ORDER BY pr.createdAt DESC LIMIT 50`
      ) as any;
      const reviews = (rows[0] ?? rows) as any[];
      return reviews.map((r: any) => ({
        id: Number(r.id),
        rating: Number(r.rating),
        reviewText: r.reviewText ?? '',
        ratingPunctuality: r.ratingPunctuality ? Number(r.ratingPunctuality) : null,
        ratingQuality: r.ratingQuality ? Number(r.ratingQuality) : null,
        ratingCommunication: r.ratingCommunication ? Number(r.ratingCommunication) : null,
        ratingValue: r.ratingValue ? Number(r.ratingValue) : null,
        googleReviewRequested: Boolean(r.googleReviewRequested),
        yelpReviewRequested: Boolean(r.yelpReviewRequested),
        createdAt: r.createdAt,
        proName: r.proName ?? 'Unknown Pro',
        proTrade: r.proTrade ?? 'Service',
      }));
    }),
    getMyStats: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
      const rows = await db.execute(
        sql`SELECT
            COUNT(*) AS totalDeals,
            SUM(CASE WHEN status IN ('accepted','scheduled','estimate_done','job_closed') THEN 1 ELSE 0 END) AS acceptedDeals,
            SUM(CASE WHEN status = 'job_closed' THEN 1 ELSE 0 END) AS completedJobs,
            SUM(CASE WHEN status IN ('sent','viewed','pending') THEN 1 ELSE 0 END) AS pendingOffers,
            SUM(CASE WHEN status = 'job_closed' THEN COALESCE(actualJobValue, estimatedValueHigh, 0) ELSE 0 END) AS totalSaved,
            COUNT(DISTINCT CASE WHEN status IN ('accepted','scheduled','estimate_done','job_closed') THEN receivingPartnerId END) AS trustedPros
            FROM customerDeals WHERE homeownerEmail = ${ctx.user.email}`
      ) as any;
      const r = (rows[0]?.[0] ?? rows[0] ?? {}) as any;
      // Also get scan count from homeownerLeads
      const scanRows = await db.execute(
        sql`SELECT COUNT(*) AS scanCount FROM homeownerLeads WHERE homeownerEmail = ${ctx.user.email}`
      ).catch(() => [[{ scanCount: 0 }]]) as any;
      const sr = (scanRows[0]?.[0] ?? scanRows[0] ?? {}) as any;
      return {
        totalDeals: Number(r.totalDeals ?? 0),
        acceptedDeals: Number(r.acceptedDeals ?? 0),
        completedJobs: Number(r.completedJobs ?? 0),
        pendingOffers: Number(r.pendingOffers ?? 0),
        moneySaved: Number(r.totalSaved ?? 0),
        trustedPros: Number(r.trustedPros ?? 0),
        scanCount: Number(sr.scanCount ?? 0),
      };
    }),

    // -- Scan Offers (auto-created from AI scan results) --
    getScanOffers: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      const profileRows = await db.execute(
        sql`SELECT id FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
      ) as any;
      const profileId = profileRows[0]?.[0]?.id ?? profileRows[0]?.id;
      const rows = await db.execute(
        profileId
          ? sql`SELECT * FROM homeownerScanOffers WHERE homeownerProfileId = ${profileId} AND status != 'dismissed' ORDER BY createdAt DESC LIMIT 100`
          : sql`SELECT * FROM homeownerScanOffers WHERE homeownerEmail = ${ctx.user.email} AND status != 'dismissed' ORDER BY createdAt DESC LIMIT 100`
      ) as any;
      return (rows[0] ?? rows) as any[];
    }),

    dismissScanOffer: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) return;
        await db.execute(sql`UPDATE homeownerScanOffers SET status = 'dismissed' WHERE id = ${input.id}`);
      }),

    // -- Scan History --
    getScanHistory: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      const profileRows = await db.execute(
        sql`SELECT id FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
      ) as any;
      const profileId = profileRows[0]?.[0]?.id ?? profileRows[0]?.id;
      const rows = await db.execute(
        profileId
          ? sql`SELECT * FROM homeownerScanHistory WHERE homeownerProfileId = ${profileId} ORDER BY createdAt DESC LIMIT 50`
          : sql`SELECT * FROM homeownerScanHistory WHERE homeownerEmail = ${ctx.user.email} ORDER BY createdAt DESC LIMIT 50`
      ) as any;
      return (rows[0] ?? rows) as any[];
    }),

    // -- AI Mockup Generation --
    // Step 1: homeowner uploads their photo -> stored in S3, saved to property
    uploadMockupPhoto: protectedProcedure
      .input(z.object({
        propertyId: z.number(),
        photoBase64: z.string(),
        mimeType: z.string().default("image/jpeg"),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const profile = await db.execute(
          sql`SELECT id FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
        ) as any;
        const profileId = profile[0]?.[0]?.id ?? profile[0]?.id;
        if (!profileId) throw new TRPCError({ code: "NOT_FOUND", message: "Profile not found" });
        const prop = await db.execute(
          sql`SELECT id FROM properties WHERE id = ${input.propertyId} AND ownerId = ${profileId} LIMIT 1`
        ) as any;
        if (!(prop[0]?.[0] ?? prop[0])) throw new TRPCError({ code: "FORBIDDEN" });
        const { storagePut } = await import("./storage");
        const buffer = Buffer.from(input.photoBase64, "base64");
        const suffix = input.mimeType.includes("png") ? "png" : "jpg";
        const { url: photoUrl } = await storagePut(
          `mockup-sources/${ctx.user.id}-${input.propertyId}-${Date.now()}.${suffix}`,
          buffer,
          input.mimeType
        );
        await db.execute(
          sql`UPDATE properties SET aiMockupSourcePhotoUrl = ${photoUrl}, aiMockupStatus = 'pending', aiMockupUrl = NULL WHERE id = ${input.propertyId}`
        );
        return { photoUrl };
      }),

    // Step 2: generate the AI mockup from the uploaded source photo
    generateMockup: protectedProcedure
      .input(z.object({ propertyId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const profile = await db.execute(
          sql`SELECT id FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
        ) as any;
        const profileId = profile[0]?.[0]?.id ?? profile[0]?.id;
        if (!profileId) throw new TRPCError({ code: "NOT_FOUND" });
        const propRows = await db.execute(
          sql`SELECT id, aiMockupSourcePhotoUrl, stylePreferences FROM properties WHERE id = ${input.propertyId} AND ownerId = ${profileId} LIMIT 1`
        ) as any;
        const prop = propRows[0]?.[0] ?? propRows[0];
        if (!prop) throw new TRPCError({ code: "FORBIDDEN" });
        if (!prop.aiMockupSourcePhotoUrl) throw new TRPCError({ code: "BAD_REQUEST", message: "Upload a photo first" });
        let stylePrefs: any = {};
        try { stylePrefs = JSON.parse(prop.stylePreferences ?? "{}"); } catch {}
        const styleHints = [
          stylePrefs.homeStyle ? `${stylePrefs.homeStyle} style` : "",
          stylePrefs.exteriorColor ? `exterior color: ${stylePrefs.exteriorColor}` : "",
          stylePrefs.interiorPalette ? `interior palette: ${stylePrefs.interiorPalette}` : "",
          stylePrefs.designAesthetic ? `aesthetic: ${stylePrefs.designAesthetic}` : "",
        ].filter(Boolean).join(", ");
        const prompt = `Transform this home photo into a stunning professional renovation result. Keep the exact same house structure, same angle, same surroundings. Apply: fresh exterior paint, manicured landscaping, repaired surfaces, modern curb appeal upgrades${styleHints ? `, matching the homeowner's style preferences: ${styleHints}` : ""}. Make it look like a high-end professional renovation was just completed. Photorealistic, bright natural lighting, professional real estate photography quality.`;
        await db.execute(
          sql`UPDATE properties SET aiMockupStatus = 'generating' WHERE id = ${input.propertyId}`
        );
        try {
          const { generateImage } = await import("./_core/imageGeneration");
          const { url: mockupUrl } = await generateImage({
            prompt,
            originalImages: [{ url: prop.aiMockupSourcePhotoUrl, mimeType: "image/jpeg" }],
          });
          await db.execute(
            sql`UPDATE properties SET aiMockupUrl = ${mockupUrl ?? null}, aiMockupStatus = 'ready', aiMockupGeneratedAt = NOW() WHERE id = ${input.propertyId}`
          );
          return { mockupUrl, status: "ready" as const };
        } catch {
          await db.execute(
            sql`UPDATE properties SET aiMockupStatus = 'failed' WHERE id = ${input.propertyId}`
          );
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Mockup generation failed. Please try again." });
        }
      }),

    // -- Referral Program --
    getCreditBalance: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
      const rows = await db.execute(
        sql`SELECT creditBalance, referralCount, referralCode FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
      ) as any;
      const row = rows[0]?.[0] ?? rows[0];
      if (!row) return { creditBalance: 0, referralCount: 0, referralCode: null };
      return {
        creditBalance: Number(row.creditBalance ?? 0),
        referralCount: Number(row.referralCount ?? 0),
        referralCode: row.referralCode as string | null,
      };
    }),

    getMyReferrals: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
      const profileRows = await db.execute(
        sql`SELECT id, referralCode FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
      ) as any;
      const profile = profileRows[0]?.[0] ?? profileRows[0];
      if (!profile) return [];
      // Generate referral code if not set
      if (!profile.referralCode) {
        const code = `HO-${String(profile.id).padStart(6, '0')}`;
        await db.execute(sql`UPDATE homeownerProfiles SET referralCode = ${code} WHERE id = ${profile.id}`);
      }
      // Return referral activity from homeownerReferrals table if it exists, else empty
      try {
        const rows = await db.execute(
          sql`SELECT * FROM homeownerReferrals WHERE referrerId = ${profile.id} ORDER BY createdAt DESC LIMIT 50`
        ) as any;
        return (rows[0] ?? rows) as any[];
      } catch {
        return [];
      }
    }),

    submitReferral: protectedProcedure
      .input(z.object({ email: z.string().email(), name: z.string().optional() }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const profileRows = await db.execute(
          sql`SELECT id, referralCode FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
        ) as any;
        const profile = profileRows[0]?.[0] ?? profileRows[0];
        if (!profile) throw new TRPCError({ code: 'NOT_FOUND', message: 'Profile not found' });
        // Ensure referral code exists
        if (!profile.referralCode) {
          const code = `HO-${String(profile.id).padStart(6, '0')}`;
          await db.execute(sql`UPDATE homeownerProfiles SET referralCode = ${code} WHERE id = ${profile.id}`);
        }
        // Notify owner
        try {
          const { notifyOwner } = await import('./_core/notification');
          await notifyOwner({
            title: 'New Homeowner Referral',
            content: `${ctx.user.name ?? ctx.user.email} referred ${input.email}${input.name ? ` (${input.name})` : ''} to TrustyPro.`,
          });
        } catch {}
        // Send neighborhood invite email
        const referrerName = ctx.user.name ?? 'Your neighbor';
        const inviteUrl = `${ENV.appBaseUrl}/join?ref=${profile.referralCode ?? ''}`;
        sendNeighborhoodReferralInvite({ to: input.email, referrerName, neighborhood: 'your neighborhood', inviteUrl }).catch(() => {});
        return { success: true, message: `Referral invitation sent to ${input.email}` };
      }),

    redeemCredit: protectedProcedure
      .input(z.object({ amount: z.number().min(1).max(500) }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const profileRows = await db.execute(
          sql`SELECT id, creditBalance FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
        ) as any;
        const profile = profileRows[0]?.[0] ?? profileRows[0];
        if (!profile) throw new TRPCError({ code: 'NOT_FOUND' });
        const balance = Number(profile.creditBalance ?? 0);
        if (balance < input.amount) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Insufficient credit balance' });
        await db.execute(
          sql`UPDATE homeownerProfiles SET creditBalance = creditBalance - ${input.amount} WHERE id = ${profile.id}`
        );
        return { success: true, newBalance: balance - input.amount };
      }),
    // -- NPS Survey --
    createNpsSurvey: protectedProcedure
      .input(z.object({ jobId: z.number(), homeownerEmail: z.string().optional(), homeownerName: z.string().optional() }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const partner = await getPartnerByUserId(ctx.user.id);
        if (!partner) throw new TRPCError({ code: 'NOT_FOUND', message: 'Partner not found' });
        const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await db.execute(
          sql`INSERT INTO npsSurveys (token, jobId, partnerId, homeownerEmail, homeownerName, expiresAt)
              VALUES (${token}, ${input.jobId}, ${partner.id}, ${input.homeownerEmail ?? null}, ${input.homeownerName ?? null}, ${expiresAt})`
        );
        return { token, surveyUrl: `/survey/${token}` };
      }),
    getNpsSurveyByToken: publicProcedure
      .input(z.object({ token: z.string() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const rows = await db.execute(
          sql`SELECT s.*, p.businessName, p.businessType, p.serviceArea, p.rating, p.reviewCount
              FROM npsSurveys s
              JOIN partners p ON p.id = s.partnerId
              WHERE s.token = ${input.token} LIMIT 1`
        ) as any;
        const row = rows[0]?.[0] ?? rows[0];
        if (!row) throw new TRPCError({ code: 'NOT_FOUND', message: 'Survey not found' });
        const expired = new Date(row.expiresAt) < new Date();
        const completed = !!row.completedAt;
        return { ...row, expired, completed };
      }),
    submitNpsSurvey: publicProcedure
      .input(z.object({
        token: z.string(),
        score: z.number().min(0).max(10),
        comment: z.string().optional(),
        followUpOk: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const rows = await db.execute(sql`SELECT id, completedAt, expiresAt FROM npsSurveys WHERE token = ${input.token} LIMIT 1`) as any;
        const row = rows[0]?.[0] ?? rows[0];
        if (!row) throw new TRPCError({ code: 'NOT_FOUND' });
        if (row.completedAt) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Survey already completed' });
        if (new Date(row.expiresAt) < new Date()) throw new TRPCError({ code: 'BAD_REQUEST', message: 'Survey has expired' });
        const category = input.score >= 9 ? 'promoter' : input.score >= 7 ? 'passive' : 'detractor';
        await db.execute(
          sql`UPDATE npsSurveys SET score = ${input.score}, category = ${category}, comment = ${input.comment ?? null}, followUpOk = ${input.followUpOk ? 1 : 0}, completedAt = NOW() WHERE token = ${input.token}`
        );
        // Fire n8n workflow for NPS response
        n8n.homeownerNpsSubmitted({ score: input.score, category, feedback: input.comment }).catch(() => {});
        return { success: true, category };
      }),
    getNpsStats: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
      const rows = await db.execute(
        sql`SELECT
          COUNT(*) as total,
          SUM(CASE WHEN completedAt IS NOT NULL THEN 1 ELSE 0 END) as completed,
          AVG(CASE WHEN completedAt IS NOT NULL THEN score END) as avgScore,
          SUM(CASE WHEN category = 'promoter' THEN 1 ELSE 0 END) as promoters,
          SUM(CASE WHEN category = 'passive' THEN 1 ELSE 0 END) as passives,
          SUM(CASE WHEN category = 'detractor' THEN 1 ELSE 0 END) as detractors
        FROM npsSurveys`
      ) as any;
      const stat = rows[0]?.[0] ?? rows[0] ?? {};
      const promoters = Number(stat.promoters ?? 0);
      const detractors = Number(stat.detractors ?? 0);
      const completed = Number(stat.completed ?? 0);
      const npsScore = completed > 0 ? Math.round(((promoters - detractors) / completed) * 100) : 0;
      const recentRows = await db.execute(
        sql`SELECT s.score, s.category, s.comment, s.completedAt, s.homeownerName, p.businessName
        FROM npsSurveys s LEFT JOIN partners p ON s.partnerId = p.id
        WHERE s.completedAt IS NOT NULL
        ORDER BY s.completedAt DESC LIMIT 20`
      ) as any;
      const recent = (recentRows[0] ?? []) as any[];
      return {
        total: Number(stat.total ?? 0),
        completed,
        avgScore: stat.avgScore ? Number(Number(stat.avgScore).toFixed(1)) : null,
        promoters,
        passives: Number(stat.passives ?? 0),
        detractors,
        npsScore,
        responseRate: completed > 0 && Number(stat.total) > 0 ? Math.round((completed / Number(stat.total)) * 100) : 0,
        recent,
      };
    }),

    // -- Notifications --
    getNotifications: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      try {
        const rows = await db.execute(
          sql`SELECT id, type, title, message, actionUrl, isRead, createdAt
              FROM homeownerNotifications
              WHERE userId = ${ctx.user.id}
              ORDER BY createdAt DESC
              LIMIT 50`
        ) as any;
        const list = Array.isArray(rows[0]) ? rows[0] : rows;
        return list.map((r: any) => ({
          id: Number(r.id),
          type: r.type as string,
          title: r.title as string,
          message: r.message as string,
          actionUrl: r.actionUrl as string | null,
          isRead: Boolean(r.isRead),
          createdAt: r.createdAt as Date,
        }));
      } catch { return []; }
    }),

    markNotificationRead: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) return { success: false };
        try {
          await db.execute(
            sql`UPDATE homeownerNotifications SET isRead = 1 WHERE id = ${input.id} AND userId = ${ctx.user.id}`
          );
          return { success: true };
        } catch { return { success: false }; }
      }),

    markAllNotificationsRead: protectedProcedure.mutation(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return { success: false };
      try {
        await db.execute(
          sql`UPDATE homeownerNotifications SET isRead = 1 WHERE userId = ${ctx.user.id}`
        );
        return { success: true };
      } catch { return { success: false }; }
    }),

    // ── Home Health Vault ──────────────────────────────────────────────────────
    saveSystemHealth: protectedProcedure
      .input(z.object({
        propertyId: z.number(),
        systemType: z.string(),
        systemLabel: z.string().optional(),
        installYear: z.number().optional(),
        installMonth: z.number().optional(),
        manufacturer: z.string().optional(),
        modelNumber: z.string().optional(),
        serialNumber: z.string().optional(),
        warrantyExpiresYear: z.number().optional(),
        expectedLifespanYears: z.number().optional(),
        estimatedEndOfLifeYear: z.number().optional(),
        condition: z.enum(['excellent','good','fair','poor','critical','unknown']).optional(),
        conditionNotes: z.string().optional(),
        healthScore: z.number().min(0).max(100).optional(),
        maintenanceIntervalMonths: z.number().optional(),
        estimatedReplacementCostLow: z.number().optional(),
        estimatedReplacementCostHigh: z.number().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        // Verify property belongs to this user
        const profile = await db.execute(
          sql`SELECT id FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
        ) as any;
        const profileId = profile[0]?.[0]?.id ?? profile[0]?.id;
        if (!profileId) throw new TRPCError({ code: 'NOT_FOUND', message: 'Profile not found' });
        const prop = await db.execute(
          sql`SELECT id FROM properties WHERE id = ${input.propertyId} AND ownerId = ${profileId} LIMIT 1`
        ) as any;
        if (!(prop[0]?.[0] ?? prop[0])) throw new TRPCError({ code: 'FORBIDDEN' });
        const result = await db.execute(
          sql`INSERT INTO homeSystemHealth
            (propertyId, systemType, systemLabel, installYear, installMonth, manufacturer, modelNumber,
             serialNumber, warrantyExpiresYear, expectedLifespanYears, estimatedEndOfLifeYear,
             \`condition\`, conditionNotes, healthScore, maintenanceIntervalMonths,
             estimatedReplacementCostLow, estimatedReplacementCostHigh, notes)
          VALUES
            (${input.propertyId}, ${input.systemType}, ${input.systemLabel ?? null},
             ${input.installYear ?? null}, ${input.installMonth ?? null},
             ${input.manufacturer ?? null}, ${input.modelNumber ?? null},
             ${input.serialNumber ?? null}, ${input.warrantyExpiresYear ?? null},
             ${input.expectedLifespanYears ?? null}, ${input.estimatedEndOfLifeYear ?? null},
             ${input.condition ?? 'unknown'}, ${input.conditionNotes ?? null},
             ${input.healthScore ?? 100}, ${input.maintenanceIntervalMonths ?? null},
             ${input.estimatedReplacementCostLow ?? null}, ${input.estimatedReplacementCostHigh ?? null},
             ${input.notes ?? null})`
        ) as any;
        return { id: result[0]?.insertId ?? result.insertId };
      }),

    getSystemHealth: protectedProcedure
      .input(z.object({ propertyId: z.number() }))
      .query(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const profile = await db.execute(
          sql`SELECT id FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
        ) as any;
        const profileId = profile[0]?.[0]?.id ?? profile[0]?.id;
        if (!profileId) return [];
        const rows = await db.execute(
          sql`SELECT hsh.* FROM homeSystemHealth hsh
              JOIN properties p ON p.id = hsh.propertyId
              WHERE hsh.propertyId = ${input.propertyId} AND p.ownerId = ${profileId}
              ORDER BY hsh.createdAt ASC`
        ) as any;
        return (rows[0] ?? rows) as any[];
      }),

    addMaintenanceLog: protectedProcedure
      .input(z.object({
        propertyId: z.number(),
        systemHealthId: z.number(),
        systemType: z.string(),
        serviceType: z.enum(['inspection','repair','replacement','maintenance','installation','cleaning','filter_change','tune_up','warranty_claim','emergency','other']),
        serviceDescription: z.string(),
        servicedBy: z.string().optional(),
        cost: z.number().optional(),
        servicedAt: z.number(), // unix ms
        conditionAfter: z.enum(['excellent','good','fair','poor','critical']).optional(),
        notes: z.string().optional(),
        serviceWarrantyMonths: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const profile = await db.execute(
          sql`SELECT id FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
        ) as any;
        const profileId = profile[0]?.[0]?.id ?? profile[0]?.id;
        if (!profileId) throw new TRPCError({ code: 'NOT_FOUND' });
        const servicedDate = new Date(input.servicedAt);
        const warrantyExpires = input.serviceWarrantyMonths
          ? new Date(input.servicedAt + input.serviceWarrantyMonths * 30 * 24 * 60 * 60 * 1000)
          : null;
        await db.execute(
          sql`INSERT INTO homeMaintenanceLogs
            (propertyId, systemHealthId, systemType, serviceType, serviceDescription,
             servicedBy, cost, servicedAt, conditionAfter, notes,
             serviceWarrantyMonths, serviceWarrantyExpiresAt)
          VALUES
            (${input.propertyId}, ${input.systemHealthId}, ${input.systemType},
             ${input.serviceType}, ${input.serviceDescription},
             ${input.servicedBy ?? null}, ${input.cost ?? null}, ${servicedDate},
             ${input.conditionAfter ?? null}, ${input.notes ?? null},
             ${input.serviceWarrantyMonths ?? null}, ${warrantyExpires})`
        );
        // Update system condition if conditionAfter provided
        if (input.conditionAfter) {
          const condScore: Record<string, number> = { excellent: 95, good: 75, fair: 50, poor: 25, critical: 10 };
          await db.execute(
            sql`UPDATE homeSystemHealth SET
              \`condition\` = ${input.conditionAfter},
              healthScore = ${condScore[input.conditionAfter] ?? 60},
              lastServicedAt = ${servicedDate}
            WHERE id = ${input.systemHealthId}`
          );
        }
        return { success: true };
      }),

    getMaintenanceLogs: protectedProcedure
      .input(z.object({ systemHealthId: z.number() }))
      .query(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) return [];
        const rows = await db.execute(
          sql`SELECT * FROM homeMaintenanceLogs WHERE systemHealthId = ${input.systemHealthId} ORDER BY servicedAt DESC`
        ) as any;
        return (rows[0] ?? rows) as any[];
      }),

    initiatePassportTransfer: protectedProcedure
      .input(z.object({
        propertyId: z.number(),
        newOwnerEmail: z.string().email(),
        newOwnerName: z.string().optional(),
        salePrice: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const profile = await db.execute(
          sql`SELECT id, displayName FROM homeownerProfiles WHERE userId = ${ctx.user.id} LIMIT 1`
        ) as any;
        const profileRow = profile[0]?.[0] ?? profile[0];
        if (!profileRow) throw new TRPCError({ code: 'NOT_FOUND' });
        const prop = await db.execute(
          sql`SELECT id, address FROM properties WHERE id = ${input.propertyId} AND ownerId = ${profileRow.id} LIMIT 1`
        ) as any;
        const propRow = prop[0]?.[0] ?? prop[0];
        if (!propRow) throw new TRPCError({ code: 'FORBIDDEN' });
        // Build passport snapshot
        const systems = await db.execute(
          sql`SELECT * FROM homeSystemHealth WHERE propertyId = ${input.propertyId}`
        ) as any;
        const logs = await db.execute(
          sql`SELECT * FROM homeMaintenanceLogs WHERE propertyId = ${input.propertyId} ORDER BY servicedAt DESC`
        ) as any;
        const snapshot = {
          address: propRow.address,
          transferDate: new Date().toISOString(),
          systems: (systems[0] ?? systems),
          maintenanceLogs: (logs[0] ?? logs),
        };
        const token = Math.random().toString(36).slice(2) + Date.now().toString(36) + Math.random().toString(36).slice(2);
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
        await db.execute(
          sql`INSERT INTO homePassportTransfers
            (propertyId, previousOwnerId, previousOwnerName, previousOwnerEmail,
             newOwnerEmail, newOwnerName, transferToken, passportSnapshot, salePrice, expiresAt)
          VALUES
            (${input.propertyId}, ${profileRow.id}, ${profileRow.displayName ?? ctx.user.name ?? null},
             ${ctx.user.email ?? null}, ${input.newOwnerEmail},
             ${input.newOwnerName ?? null}, ${token}, ${JSON.stringify(snapshot)},
             ${input.salePrice ?? null}, ${expiresAt})`
        );
        // Generate PDF and store in S3
        let pdfUrl: string | null = null;
        try {
          const { generateHomePassportPdf } = await import("./_core/homePassportPdf");
          const { storagePut } = await import("./storage");
          const origin = (input as any).origin ?? "https://prolnk.io";
          const { buffer, filename } = await generateHomePassportPdf(input.propertyId, token, origin);
          const { url } = await storagePut(`passports/${filename}`, buffer, "application/pdf");
          pdfUrl = url;
          // Save PDF URL back to the transfer record
          await db.execute(sql`UPDATE homePassportTransfers SET pdfUrl = ${url} WHERE transferToken = ${token}`);
        } catch (pdfErr) {
          console.warn("[Passport] PDF generation failed:", pdfErr);
        }
        try {
          await notifyOwner({
            title: 'Home Passport Transfer Initiated',
            content: `${ctx.user.name ?? ctx.user.email} initiated a Home Passport transfer for ${propRow.address} to ${input.newOwnerEmail}.`,
          });
        } catch {}
        return { success: true, token, pdfUrl };
      }),

    submitDirectReview: protectedProcedure
      .input(z.object({
        dealId: z.number(),
        partnerId: z.number(),
        rating: z.number().min(1).max(5),
        reviewText: z.string().max(1000).optional(),
        ratingQuality: z.number().min(1).max(5).optional(),
        ratingCommunication: z.number().min(1).max(5).optional(),
        ratingPunctuality: z.number().min(1).max(5).optional(),
        ratingValue: z.number().min(1).max(5).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const existing = await db.execute(
          sql`SELECT id FROM partnerReviews WHERE dealId = ${input.dealId} LIMIT 1`
        ) as any;
        if ((existing.rows ?? existing)?.[0]) throw new TRPCError({ code: 'CONFLICT', message: 'Already reviewed' });
        await db.execute(
          sql`INSERT INTO partnerReviews
            (dealId, partnerId, homeownerName, homeownerEmail, rating, reviewText,
             ratingPunctuality, ratingQuality, ratingCommunication, ratingValue, isPublic)
          VALUES (
            ${input.dealId}, ${input.partnerId},
            ${ctx.user.name ?? null}, ${ctx.user.email ?? null},
            ${input.rating}, ${input.reviewText ?? null},
            ${input.ratingPunctuality ?? null}, ${input.ratingQuality ?? null},
            ${input.ratingCommunication ?? null}, ${input.ratingValue ?? null}, 1
          )`
        );
        await db.execute(
          sql`UPDATE partners SET rating = (
            SELECT ROUND(AVG(rating), 2) FROM partnerReviews WHERE partnerId = ${input.partnerId} AND isPublic = 1
          ) WHERE id = ${input.partnerId}`
        );
        return { success: true };
      }),

    // ── AI-generated Home Health Score Summary ─────────────────────────────────
    // Analyzes all home systems and generates a personalized health summary card
    // with prioritized recommendations and estimated costs.
    generateAIHealthSummary: protectedProcedure.mutation(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });

      // Get homeowner profile
      const profileRows = await db.execute(
        sql`SELECT hp.id, hp.displayName, p.address, p.yearBuilt, p.sqft, p.homeType
            FROM homeownerProfiles hp
            LEFT JOIN properties p ON p.homeownerId = hp.id
            WHERE hp.userId = ${ctx.user.id}
            LIMIT 1`
      ) as any;
      const profile = (profileRows.rows ?? profileRows)?.[0];

      // Get all home systems
      const sysRows = await db.execute(
        sql`SELECT systemType, systemLabel, installYear, lastServiceDate, healthScore,
                   estimatedEndOfLifeYear, replacementCostEstimate, notes
            FROM homeSystemHealth
            WHERE homeownerProfileId = ${profile?.id ?? 0}
            ORDER BY healthScore ASC`
      ) as any;
      const systems = (sysRows.rows ?? sysRows) as any[];

      if (systems.length === 0) {
        return {
          summary: "Add your home systems to get an AI-powered health analysis.",
          overallScore: 60,
          topPriorities: [],
          estimatedMaintenanceCost: 0,
          generatedAt: new Date().toISOString(),
        };
      }

      const systemsText = systems.map(s =>
        `${s.systemLabel ?? s.systemType}: Health ${s.healthScore}/100, installed ${s.installYear ?? 'unknown'}, last serviced ${s.lastServiceDate ?? 'unknown'}, EOL ${s.estimatedEndOfLifeYear ?? 'unknown'}, replacement cost $${s.replacementCostEstimate ?? 'unknown'}`
      ).join('\n');

      const overallScore = systems.length > 0
        ? Math.round(systems.reduce((s: number, sys: any) => s + (sys.healthScore ?? 60), 0) / systems.length)
        : 60;

      const prompt = `You are a home inspection AI. Analyze these home systems and provide a concise health summary.

Home: ${profile?.address ?? 'Unknown address'}, built ${profile?.yearBuilt ?? 'unknown'}, ${profile?.sqft ?? 'unknown'} sqft

Systems:
${systemsText}

Overall Health Score: ${overallScore}/100

Provide:
1. A 2-3 sentence overall assessment (friendly, actionable)
2. Top 3 priority action items with estimated costs
3. One positive highlight about the home
4. Estimated annual maintenance budget recommendation

Be specific, practical, and encouraging. Format as JSON with keys: assessment, priorities (array of {action, urgency, estimatedCost}), highlight, annualBudget.`;

      try {
        const response = await invokeLLM({
          messages: [
            { role: 'system', content: 'You are a home health AI assistant. Always respond with valid JSON.' },
            { role: 'user', content: prompt },
          ],
          response_format: {
            type: 'json_schema',
            json_schema: {
              name: 'home_health_summary',
              strict: true,
              schema: {
                type: 'object',
                properties: {
                  assessment: { type: 'string' },
                  priorities: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        action: { type: 'string' },
                        urgency: { type: 'string', enum: ['immediate', 'within_6_months', 'within_year', 'monitor'] },
                        estimatedCost: { type: 'string' },
                      },
                      required: ['action', 'urgency', 'estimatedCost'],
                      additionalProperties: false,
                    },
                  },
                  highlight: { type: 'string' },
                  annualBudget: { type: 'string' },
                },
                required: ['assessment', 'priorities', 'highlight', 'annualBudget'],
                additionalProperties: false,
              },
            },
          },
        });
        const content = response.choices?.[0]?.message?.content ?? '{}';
        const parsed = JSON.parse(typeof content === 'string' ? content : JSON.stringify(content));
        return {
          ...parsed,
          overallScore,
          generatedAt: new Date().toISOString(),
        };
      } catch (err) {
        return {
          assessment: `Your home has an overall health score of ${overallScore}/100. ${overallScore >= 80 ? 'Your home is in great shape!' : overallScore >= 60 ? 'A few systems need attention.' : 'Several systems need immediate attention.'}`,
          priorities: systems.filter((s: any) => s.healthScore < 60).slice(0, 3).map((s: any) => ({
            action: `Service or inspect ${s.systemLabel ?? s.systemType}`,
            urgency: s.healthScore < 30 ? 'immediate' : 'within_6_months',
            estimatedCost: s.replacementCostEstimate ? `$${Number(s.replacementCostEstimate).toLocaleString()}` : 'Contact a pro for estimate',
          })),
          highlight: systems.find((s: any) => s.healthScore >= 80) ? `Your ${systems.find((s: any) => s.healthScore >= 80)?.systemLabel} is in excellent condition.` : 'Keep up with regular maintenance to protect your investment.',
          annualBudget: `$${Math.round(overallScore < 60 ? 5000 : overallScore < 80 ? 2500 : 1500).toLocaleString()}/year`,
          overallScore,
          generatedAt: new Date().toISOString(),
        };
      }
    }),
  }),
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
    demoLogin: publicProcedure.mutation(async ({ ctx }) => {
      // Guard: disabled in production to prevent fake account creation
      if (ENV.isProduction) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Demo login is not available in production.' });
      }
      // Create a session token for the demo partner account
      const DEMO_OPEN_ID = 'demo_partner_prolink_2026';
      const sessionToken = await sdk.createSessionToken(DEMO_OPEN_ID, {
        name: 'Demo Partner',
        expiresInMs: ONE_YEAR_MS,
      });
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });
      // Ensure demo user + partner records exist in the DB
      try {
        await upsertUser({ openId: DEMO_OPEN_ID, name: 'Demo Partner', email: null, loginMethod: 'demo', lastSignedIn: new Date() });
        const demoUser = await getUserByOpenId(DEMO_OPEN_ID);
        if (demoUser) {
          const existing = await getPartnerByUserId(demoUser.id);
          if (!existing) {
            const byEmail = await getPartnerByEmail('demo@prolnk.io');
            if (byEmail) {
              await linkPartnerToUser(byEmail.id, demoUser.id);
            } else {
              await createPartner({
                userId: demoUser.id,
                businessName: 'Green Edge Landscaping (Demo)',
                businessType: 'Landscaping',
                serviceArea: 'Dallas-Fort Worth, TX',
                contactName: 'Demo Partner',
                contactEmail: 'demo@prolnk.io',
                contactPhone: '(214) 555-0100',
                website: null,
                description: 'Demo partner account for ProLnk platform preview.',
                status: 'approved',
                tier: 'pro',
                referredByPartnerId: null,
              });
            }
          }
        }
      } catch (e) {
        console.warn('[Demo] Could not set up demo partner record:', e);
      }
      return { success: true } as const;
    }),
  }),

  // -- Partners --
  partners: router({
    // Public: submit application
    submitApplication: publicProcedure
      .input(applySchema)
      .mutation(async ({ input, ctx }) => {
        const existing = await getPartnerByEmail(input.contactEmail);
        if (existing) {
          throw new TRPCError({ code: "CONFLICT", message: "An application with this email already exists." });
        }

        // Resolve referrer partner ID from referral code (format: "partner-{id}")
        let referredByPartnerId: number | null = null;
        if (input.referredByCode) {
          const parts = input.referredByCode.split("-");
          const refId = parseInt(parts[parts.length - 1]);
          if (!isNaN(refId) && refId > 0) {
            const referrer = await getPartnerById(refId);
            if (referrer) referredByPartnerId = refId;
          }
        }

        await createPartner({
          userId: ctx.user?.id ?? undefined,
          businessName: input.businessName,
          businessType: input.businessType,
          serviceArea: input.serviceArea,
          contactName: input.contactName,
          contactEmail: input.contactEmail,
          contactPhone: input.contactPhone ?? null,
          website: input.website ?? null,
          description: input.description ?? null,
          status: "pending",
          tier: "scout",
          referredByPartnerId,
        });

        // Increment referring partner's partnersReferred count and mark referral click as converted
        if (referredByPartnerId) {
          const db = await getDb();
          if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
          if (db) {
            const referrer = await getPartnerById(referredByPartnerId);
            if (referrer) {
              await db.update(partners)
                .set({ partnersReferred: (referrer.partnersReferred ?? 0) + 1 })
                .where(eq(partners.id, referredByPartnerId));
              // Mark the referral click as converted
              await (db as any).execute(
                sql`UPDATE referralClicks SET convertedAt = ${Date.now()} WHERE referralCode = ${input.referredByCode ?? ''} AND convertedAt IS NULL ORDER BY id DESC LIMIT 1`
              );
            }
          }
        }

         await notifyOwner({
          title: "[LINK] New ProLnk Partner Application",
          content: `**${input.businessName}** (${input.businessType}) applied to join ProLnk.\n\nContact: ${input.contactName} -- ${input.contactEmail}\nService Area: ${input.serviceArea}${referredByPartnerId ? `\nReferred by Partner ID: ${referredByPartnerId}` : ''}`,
        });
        // Send confirmation email to applicant
        sendPartnerApplicationReceived({
          to: input.contactEmail,
          name: input.contactName,
          businessName: input.businessName,
        }).catch(() => {});
        // Fire n8n workflow for new partner application
        n8n.partnerApplicationReceived({ partnerId: 0, partnerName: input.businessName, businessType: input.businessType, email: input.contactEmail, phone: input.contactPhone ?? undefined, city: input.serviceArea, referredByPartnerId: referredByPartnerId ?? undefined }).catch(() => {});
        return { success: true };
      }),
    // Protected: get own profile + stats
    getMyProfile: protectedProcedure.query(async ({ ctx }) => {
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) return null;
      const stats = await getPartnerStats(partner.id);
      return stats;
    }),

    // Protected: link existing application to logged-in user (Wave 1)
    linkMyApplication: protectedProcedure
      .input(z.object({ email: z.string().email() }))
      .mutation(async ({ input, ctx }) => {
        const partner = await getPartnerByEmail(input.email);
        if (!partner) throw new TRPCError({ code: "NOT_FOUND", message: "No application found with that email." });
        if (partner.userId && partner.userId !== ctx.user.id) {
          throw new TRPCError({ code: "CONFLICT", message: "This application is already linked to another account." });
        }
        await linkPartnerToUser(partner.id, ctx.user.id);
        return { success: true, status: partner.status };
      }),

    // Protected: get inbound opportunities (sent to this partner)
    getInboundOpportunities: protectedProcedure.query(async ({ ctx }) => {
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) return [];
      return getOpportunitiesByReceivingPartnerId(partner.id);
    }),

    // Protected: get outbound referrals (this partner's jobs generated these)
    getOutboundReferrals: protectedProcedure.query(async ({ ctx }) => {
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) return [];
      return getOpportunitiesBySourcePartnerId(partner.id);
    }),

    // Protected: accept/decline an opportunity
    respondToOpportunity: protectedProcedure
      .input(z.object({
        opportunityId: z.number(),
        response: z.enum(["accepted", "declined"]),
        declineReason: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await updateOpportunityStatus(input.opportunityId, input.response);
        // Log decline reason for admin analytics
        if (input.response === "declined" && input.declineReason) {
          try {
            const db = await getDb();
            if (db) {
              await db.execute(sql`UPDATE opportunities SET notes = ${input.declineReason} WHERE id = ${input.opportunityId}`);
            }
          } catch (err) {
            console.warn("[Decline] Failed to log decline reason:", err);
          }
        }
        // Track response speed for PPS Signal 7 when partner accepts
        if (input.response === "accepted") {
          try {
            const partner = await getPartnerByUserId(ctx.user.id);
            if (partner) {
              const db = await getDb();
              if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
              if (db) {
                const [opp] = await db.select({ sentAt: opportunities.sentAt })
                  .from(opportunities)
                  .where(eq(opportunities.id, input.opportunityId))
                  .limit(1);
                if (opp?.sentAt) {
                  await updatePartnerResponseSpeed(partner.id, opp.sentAt, new Date());
                }
              }
            }
          } catch (err) {
            console.warn("[PPS] Response speed tracking failed:", err);
          }
        }
        return { success: true };
      }),

    closeJob: protectedProcedure
      .input(z.object({
        opportunityId: z.number(),
        actualJobValue: z.number().positive(),
      }))
      .mutation(async ({ input, ctx }) => {
        const partner = await getPartnerByUserId(ctx.user.id);
        if (!partner) throw new TRPCError({ code: "NOT_FOUND", message: "Partner not found" });
        const rates = await closeOpportunityWithJobValue(input.opportunityId, input.actualJobValue, partner.id);
        // Fire n8n workflow for job close / lead converted
        n8n.leadConverted({ opportunityId: input.opportunityId, receivingPartnerId: partner.id, receivingPartnerName: partner.businessName, sourcePartnerId: partner.id, jobValue: input.actualJobValue, commissionAmount: (rates as any)?.proLnkFee ?? 0, issueType: 'job', serviceAddress: '' }).catch(() => {});
        // Auto-trigger review request if opportunity has homeowner email
        try {
          const db = await getDb();
          if (db) {
            const oppRows = await (db as any).execute(sql`SELECT homeownerEmail, homeownerName, serviceType, serviceAddress FROM opportunities WHERE id = ${input.opportunityId} LIMIT 1`) as any;
            const opp = oppRows?.[0]?.[0] ?? oppRows?.[0];
            if (opp?.homeownerEmail) {
              const reviewUrl = `${ENV.appBaseUrl}/review/${input.opportunityId}`;
              sendReviewRequest({ to: opp.homeownerEmail, homeownerName: opp.homeownerName ?? 'Homeowner', proName: partner.contactName ?? partner.businessName, businessName: partner.businessName, tradeType: opp.serviceType ?? 'home service', reviewUrl }).catch(() => {});
            }
            // Fire network commission engine if homeowner confirmed
            if (opp?.serviceAddress) {
              const { networkRouter } = await import("./routers/network");
              // We use the internal procedure directly — avoids full tRPC overhead
              import("./db").then(async ({ getDb: getDb2 }) => {
                const { sql: sql2 } = await import("drizzle-orm");
                const { createHash } = await import("crypto");
                const db2 = await getDb2();
                if (!db2) return;
                // Find the partner's userId for network lookup
                const userRows = await (db2 as any).execute(
                  sql2`SELECT userId FROM partners WHERE id = ${partner.id} LIMIT 1`
                );
                const userId = (userRows.rows ?? userRows)[0]?.userId;
                if (!userId) return;
                const { NETWORK_RATES } = await import("../shared/const");
                const addrHash = createHash("sha256")
                  .update((opp.serviceAddress as string).toLowerCase().replace(/\s+/g, " ").trim())
                  .digest("hex");
                const currentMonth = new Date().toISOString().slice(0, 7);
                const proRows = await (db2 as any).execute(
                  sql2`SELECT * FROM pro_network_profile WHERE user_id = ${userId} LIMIT 1`
                );
                const pro = (proRows.rows ?? proRows)[0];
                if (!pro) return;
                const proLevel = Number(pro.network_level);
                const ownRate = NETWORK_RATES.ownJob[proLevel as keyof typeof NETWORK_RATES.ownJob] ?? 0.005;
                // Insert job_commission_event
                await (db2 as any).execute(sql2`
                  INSERT INTO job_commission_event
                    (pro_user_id, job_id, job_value, job_completed_at, homeowner_confirmed, homeowner_confirmed_at,
                     platform_fee_gross, platform_fee_net, status, created_at)
                  VALUES (${userId}, ${String(input.opportunityId)}, ${input.actualJobValue}, NOW(), 1, NOW(),
                    ${input.actualJobValue * 0.02}, ${input.actualJobValue * 0.017}, 'confirmed', NOW())
                  ON DUPLICATE KEY UPDATE homeowner_confirmed = 1
                `);
                const eventRows = await (db2 as any).execute(
                  sql2`SELECT id FROM job_commission_event WHERE job_id = ${String(input.opportunityId)} LIMIT 1`
                );
                const eventId = (eventRows.rows ?? eventRows)[0]?.id;
                if (!eventId) return;
                // Own-job payout
                await (db2 as any).execute(sql2`
                  INSERT IGNORE INTO commission_payout
                    (job_commission_event_id, recipient_user_id, source_pro_user_id, payout_type, rate_applied, amount, status, payout_month, created_at)
                  VALUES (${eventId}, ${userId}, ${userId}, 'own_job', ${ownRate}, ${(input.actualJobValue * ownRate).toFixed(2)}, 'pending', ${currentMonth}, NOW())
                `);
                // Upline network income
                const uplineRows = await (db2 as any).execute(sql2`
                  SELECT uc.upline_user_id, uc.levels_above, uc.upline_network_level, np.subscription_active, np.jobs_completed_this_month
                  FROM pro_upline_chain uc
                  JOIN pro_network_profile np ON np.user_id = uc.upline_user_id
                  WHERE uc.pro_user_id = ${userId}
                `);
                for (const upline of (uplineRows.rows ?? uplineRows)) {
                  const ul = Number(upline.upline_network_level);
                  if (!upline.subscription_active) continue;
                  if (Number(upline.jobs_completed_this_month) < NETWORK_RATES.minimumJobsPerMonth) continue;
                  const depth = NETWORK_RATES.networkDepth[ul as keyof typeof NETWORK_RATES.networkDepth] ?? 0;
                  if (Number(upline.levels_above) > depth) continue;
                  const rate = NETWORK_RATES.networkIncome[ul as keyof typeof NETWORK_RATES.networkIncome] ?? 0;
                  if (!rate) continue;
                  await (db2 as any).execute(sql2`
                    INSERT IGNORE INTO commission_payout
                      (job_commission_event_id, recipient_user_id, source_pro_user_id, payout_type, rate_applied, amount, status, payout_month, created_at)
                    VALUES (${eventId}, ${upline.upline_user_id}, ${userId}, ${'network_l' + upline.levels_above},
                      ${rate}, ${(input.actualJobValue * rate).toFixed(2)}, 'pending', ${currentMonth}, NOW())
                  `);
                  await (db2 as any).execute(sql2`
                    UPDATE pro_network_profile
                    SET pending_payout_amount = pending_payout_amount + ${(input.actualJobValue * rate).toFixed(2)},
                        total_network_income_earned = total_network_income_earned + ${(input.actualJobValue * rate).toFixed(2)}
                    WHERE user_id = ${upline.upline_user_id}
                  `);
                }
                // Update pro's own stats
                await (db2 as any).execute(sql2`
                  UPDATE pro_network_profile
                  SET pending_payout_amount = pending_payout_amount + ${(input.actualJobValue * ownRate).toFixed(2)},
                      total_network_income_earned = total_network_income_earned + ${(input.actualJobValue * ownRate).toFixed(2)},
                      jobs_completed_this_month = jobs_completed_this_month + 1,
                      last_job_completed_at = NOW()
                  WHERE user_id = ${userId}
                `);
                // Photo origination
                const existingDoc = await (db2 as any).execute(
                  sql2`SELECT id FROM home_documentation WHERE address_hash = ${addrHash} LIMIT 1`
                );
                const isFirst = !(existingDoc.rows ?? existingDoc)[0];
                await (db2 as any).execute(sql2`
                  INSERT IGNORE INTO home_documentation
                    (pro_user_id, address_hash, full_address, is_first_documentation, origination_credit_earned, origination_credit_amount, documented_at)
                  VALUES (${userId}, ${addrHash}, ${opp.serviceAddress}, ${isFirst ? 1 : 0}, ${isFirst ? 1 : 0}, ${isFirst ? 0.25 : 0.00}, NOW())
                `);
                if (isFirst) {
                  await (db2 as any).execute(sql2`
                    INSERT IGNORE INTO commission_payout
                      (job_commission_event_id, recipient_user_id, source_pro_user_id, payout_type, rate_applied, amount, status, payout_month, created_at)
                    VALUES (${eventId}, ${userId}, ${userId}, 'photo_origination', 0, 0.25, 'pending', ${currentMonth}, NOW())
                  `);
                  await (db2 as any).execute(sql2`
                    UPDATE pro_network_profile
                    SET pending_payout_amount = pending_payout_amount + 0.25,
                        total_network_income_earned = total_network_income_earned + 0.25
                    WHERE user_id = ${userId}
                  `);
                }
              }).catch((err: any) => console.warn("[Network] Commission processing error:", err));
            }
          }
        } catch {}
        return { success: true, rates };
      }),

    // Protected: get earned commissions (from referrals this partner sent)
    getEarnedCommissions: protectedProcedure.query(async ({ ctx }) => {
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) return [];
      return getEarnedCommissionsByPartnerId(partner.id);
    }),

    // Protected: get paid commissions (what this partner owes/paid)
    getPaidCommissions: protectedProcedure.query(async ({ ctx }) => {
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) return [];
      return getCommissionsByPartnerId(partner.id);
    }),

    referHomeowner: protectedProcedure
      .input(z.object({
        homeownerName: z.string().min(1).max(100),
        homeownerPhone: z.string().min(10).max(15),
        message: z.string().max(300).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const partner = await getPartnerByUserId(ctx.user.id);
        if (!partner) throw new TRPCError({ code: "NOT_FOUND", message: "Partner not found" });
        const { sendSms } = await import("./notifications");
        const baseUrl = process.env.APP_BASE_URL || "https://prolnk.io";
        const referralCode = (partner as any).referralCode || partner.id;
        const link = `${baseUrl}/join?ref=${referralCode}`;
        const body = input.message
          ? `${input.message}\n\nGet started: ${link}`
          : `Hi ${input.homeownerName}! ${(partner as any).businessName || "Your trusted pro"} recommends checking out TrustyPro for home maintenance. Get matched with verified local pros: ${link}`;
        const sent = await sendSms(input.homeownerPhone, body);
        return { sent, message: sent ? "SMS sent!" : "SMS queued (Twilio not configured)" };
      }),

    // Wave 17: Open a commission dispute
    openDispute: protectedProcedure
      .input(z.object({
        commissionId: z.number().int().positive(),
        reason: z.string().min(20).max(1000),
      }))
      .mutation(async ({ ctx, input }) => {
        const partner = await getPartnerByUserId(ctx.user.id);
        if (!partner) throw new TRPCError({ code: 'NOT_FOUND', message: 'Partner not found' });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
        const [comm] = await db.select().from(commissions)
          .where(eq(commissions.id, input.commissionId)).limit(1);
        if (!comm) throw new TRPCError({ code: 'NOT_FOUND', message: 'Commission not found' });
        if (comm.receivingPartnerId !== partner.id && comm.payingPartnerId !== partner.id)
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Not your commission' });
        if (comm.disputeStatus !== 'none')
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Dispute already open or resolved' });
        await db.update(commissions).set({
          disputeStatus: 'open',
          disputeReason: input.reason,
          disputeOpenedAt: new Date(),
        }).where(eq(commissions.id, input.commissionId));
         try { await notifyOwner({ title: 'Commission Dispute Opened', content: `Partner ${partner.businessName} (ID: ${partner.id}) opened a dispute on commission #${input.commissionId}. Reason: ${input.reason}` }); } catch {}
        // Fire n8n workflow for commission dispute filed
        n8n.commissionDisputeFiled({ disputeId: 0, partnerId: partner.id, partnerName: partner.businessName, email: partner.contactEmail ?? '', commissionId: input.commissionId, disputedAmount: Number(comm.amount ?? 0), reason: input.reason }).catch(() => {});
        return { success: true };
      }),
    // Wave 17: Get my disputes
    getMyDisputes: protectedProcedure.query(async ({ ctx }) => {
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) return [];
      const db = await getDb();
      if (!db) return [];
      return db.select().from(commissions)
        .where(and(
          or(eq(commissions.receivingPartnerId, partner.id), eq(commissions.payingPartnerId, partner.id)),
          ne(commissions.disputeStatus, 'none')
        ))
        .orderBy(desc(commissions.disputeOpenedAt));
    }),

    // DIS-02: Upload evidence for a dispute (S3 URL array)
    uploadDisputeEvidence: protectedProcedure
      .input(z.object({
        commissionId: z.number().int().positive(),
        evidenceUrls: z.array(z.string().url()).min(1).max(5),
      }))
      .mutation(async ({ ctx, input }) => {
        const partner = await getPartnerByUserId(ctx.user.id);
        if (!partner) throw new TRPCError({ code: 'NOT_FOUND', message: 'Partner not found' });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
        const [comm] = await db.select().from(commissions).where(eq(commissions.id, input.commissionId)).limit(1);
        if (!comm) throw new TRPCError({ code: 'NOT_FOUND', message: 'Commission not found' });
        if (comm.receivingPartnerId !== partner.id && comm.payingPartnerId !== partner.id)
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Not your commission' });
        const existing: string[] = comm.disputeEvidenceUrls ? JSON.parse(comm.disputeEvidenceUrls) : [];
        const merged = Array.from(new Set([...existing, ...input.evidenceUrls])).slice(0, 5);
        await db.update(commissions).set({ disputeEvidenceUrls: JSON.stringify(merged) })
          .where(eq(commissions.id, input.commissionId));
        return { success: true, evidenceUrls: merged };
      }),

    // DIS-06: Appeal a denied dispute (within 72 hours)
    appealDispute: protectedProcedure
      .input(z.object({
        commissionId: z.number().int().positive(),
        appealReason: z.string().min(20).max(1000),
      }))
      .mutation(async ({ ctx, input }) => {
        const partner = await getPartnerByUserId(ctx.user.id);
        if (!partner) throw new TRPCError({ code: 'NOT_FOUND', message: 'Partner not found' });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
        const [comm] = await db.select().from(commissions).where(eq(commissions.id, input.commissionId)).limit(1);
        if (!comm) throw new TRPCError({ code: 'NOT_FOUND', message: 'Commission not found' });
        if (comm.receivingPartnerId !== partner.id && comm.payingPartnerId !== partner.id)
          throw new TRPCError({ code: 'FORBIDDEN', message: 'Not your commission' });
        if (comm.disputeStatus !== 'resolved_denied')
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Can only appeal denied disputes' });
        if (comm.disputeAppealStatus !== 'none')
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Appeal already filed' });
        // 72-hour window
        const resolvedAt = comm.disputeResolvedAt ? new Date(comm.disputeResolvedAt).getTime() : 0;
        if (Date.now() - resolvedAt > 72 * 60 * 60 * 1000)
          throw new TRPCError({ code: 'BAD_REQUEST', message: 'Appeal window (72 hours) has expired' });
        await db.update(commissions).set({
          disputeAppealStatus: 'pending',
          disputeAppealReason: input.appealReason,
          disputeAppealedAt: new Date(),
        }).where(eq(commissions.id, input.commissionId));
        try { await notifyOwner({ title: 'Dispute Appeal Filed', content: `Partner ${partner.businessName} appealed dispute on commission #${input.commissionId}. Reason: ${input.appealReason}` }); } catch {}
        return { success: true };
      }),

    // Protected: update own partner profile
    updateProfile: protectedProcedure
      .input(z.object({
        businessName: z.string().min(2).optional(),
        serviceArea: z.string().min(3).optional(),
        website: z.string().url().optional().or(z.literal('')),
        description: z.string().max(1000).optional(),
        contactPhone: z.string().optional(),
        googleReviewUrl: z.string().url().optional().or(z.literal('')),
      }))
      .mutation(async ({ ctx, input }) => {
        const partner = await getPartnerByUserId(ctx.user.id);
        if (!partner) throw new TRPCError({ code: 'NOT_FOUND', message: 'Partner not found' });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
        await db.update(partners).set({
          ...(input.businessName && { businessName: input.businessName }),
          ...(input.serviceArea && { serviceArea: input.serviceArea }),
          ...(input.website !== undefined && { website: input.website || null }),
          ...(input.description !== undefined && { description: input.description }),
          ...(input.contactPhone !== undefined && { contactPhone: input.contactPhone }),
          ...(input.googleReviewUrl !== undefined && { googleReviewUrl: input.googleReviewUrl || null }),
        }).where(eq(partners.id, partner.id));
        return { success: true };
      }),

    // Protected: get broadcast messages
    getBroadcasts: protectedProcedure.query(async () => {
      return getBroadcasts();
    }),

    // Protected: get own jobs logged
    getMyJobs: protectedProcedure.query(async ({ ctx }) => {
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) return [];
      return getJobsByPartnerId(partner.id);
    }),

    // AI Chat Assistant for partners
    askAI: protectedProcedure
      .input(z.object({ question: z.string().min(1).max(1000) }))
      .mutation(async ({ ctx, input }) => {
        const partner = await getPartnerByUserId(ctx.user.id);
        const tierInfo = partner
          ? `The partner's current tier is ${partner.tier}. They have sent ${partner.referralCount ?? 0} referrals, logged ${partner.jobsLogged ?? 0} jobs, and earned $${Number(partner.totalCommissionEarned ?? 0).toFixed(2)} in commissions.`
          : '';
        try {
          const response = await invokeLLM({
            messages: [
              {
                role: 'system',
                content: `You are a helpful AI assistant for ProLnk, a home service partner referral network in the DFW area. ProLnk connects home service professionals (lawn care, pest control, HVAC, plumbing, etc.) who refer homeowners to other trusted pros in the network, earning commissions on closed jobs. Partners progress through configurable performance tiers -- each tier unlocks higher commission rates and priority lead routing. TrustyPro is the homeowner-facing brand where homeowners can view a trusted professional network and get matched with pros. The ProLnk Mobile App allows field technicians to log jobs and upload photos on-site from any device. The platform is patent pending. Be concise, practical, and encouraging. ${tierInfo}`,
              },
              { role: 'user', content: input.question },
            ],
          });
          const answer = (response as any)?.choices?.[0]?.message?.content ?? 'I could not generate a response. Please try again.';
          return { answer };
        } catch (e: any) {
          if (e.message?.includes('No LLM API key') || e.message?.includes('not set')) {
            return { answer: 'The AI assistant is not configured yet. Ask your admin to add OPENAI_API_KEY to the environment settings.' };
          }
          return { answer: 'Something went wrong. Please try again in a moment.' };
        }
      }),

    // Protected: get own Partner Priority Score with full signal breakdown
    getMyPriorityScore: protectedProcedure.query(async ({ ctx }) => {
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) throw new TRPCError({ code: "NOT_FOUND", message: "Partner not found" });
      const breakdown = await calculatePartnerPriorityScore(partner.id);
      return breakdown;
    }),
    // Protected: get notification preferences
    getNotificationPrefs: protectedProcedure.query(async ({ ctx }) => {
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) throw new TRPCError({ code: "NOT_FOUND" });
      const defaults = {
        newLead: true,
        leadExpired: true,
        commissionPaid: true,
        tierUpgrade: true,
        newReview: true,
        broadcastMessages: true,
        weeklyDigest: true,
        emailEnabled: true,
        smsEnabled: false,
      };
      return { ...defaults, ...(partner.notificationPrefs ?? {}) };
    }),
    // Protected: update notification preferences
    updateNotificationPrefs: protectedProcedure
      .input(z.object({
        newLead: z.boolean().optional(),
        leadExpired: z.boolean().optional(),
        commissionPaid: z.boolean().optional(),
        tierUpgrade: z.boolean().optional(),
        newReview: z.boolean().optional(),
        broadcastMessages: z.boolean().optional(),
        weeklyDigest: z.boolean().optional(),
        emailEnabled: z.boolean().optional(),
        smsEnabled: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const partner = await getPartnerByUserId(ctx.user.id);
        if (!partner) throw new TRPCError({ code: "NOT_FOUND" });
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        const current = (partner.notificationPrefs ?? {}) as Record<string, boolean>;
        const merged = { ...current, ...input };
        const updated = {
          newLead: merged.newLead ?? true,
          leadExpired: merged.leadExpired ?? true,
          commissionPaid: merged.commissionPaid ?? true,
          tierUpgrade: merged.tierUpgrade ?? true,
          newReview: merged.newReview ?? true,
          broadcastMessages: merged.broadcastMessages ?? true,
          weeklyDigest: merged.weeklyDigest ?? true,
          emailEnabled: merged.emailEnabled ?? true,
          smsEnabled: merged.smsEnabled ?? false,
        } as { newLead: boolean; leadExpired: boolean; commissionPaid: boolean; tierUpgrade: boolean; newReview: boolean; broadcastMessages: boolean; weeklyDigest: boolean; emailEnabled: boolean; smsEnabled: boolean };
        await db.update(partners).set({ notificationPrefs: updated }).where(eq(partners.id, partner.id));
        return { success: true, prefs: updated };
      }),
    // Get TrustyPro leads routed to this partner
    getMyTrustyLeads: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      const partnerRows = await (db as any).execute(
        sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} AND status = 'approved'`
      );
      const partner = (partnerRows[0] || [])[0];
      if (!partner) return [];
      const rows = await (db as any).execute(
        sql`SELECT id, homeownerName as name, homeownerEmail as email, homeownerPhone as phone, address, photoUrls, aiAnalysis, status, notes, createdAt FROM homeownerLeads WHERE matchedPartnerId = ${partner.id} ORDER BY createdAt DESC LIMIT 100`
      );
      return (rows[0] || []) as Array<{
        id: number; name: string | null; email: string | null; phone: string | null;
        address: string | null; photoUrls: string | null; aiAnalysis: string | null;
        status: string; notes: string | null; createdAt: Date;
      }>;
    }),
    // Partner accepts or declines a TrustyPro lead
    respondToTrustyLead: protectedProcedure
      .input(z.object({
        leadId: z.number(),
        response: z.enum(['accepted', 'declined']),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
        const partnerRows = await (db as any).execute(
          sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} AND status = 'approved'`
        );
        const partner = (partnerRows[0] || [])[0];
        if (!partner) throw new TRPCError({ code: 'FORBIDDEN' });
        const newStatus = input.response === 'accepted' ? 'contacted' : 'lost';
        await (db as any).execute(
          sql`UPDATE homeownerLeads SET status = ${newStatus}, notes = ${input.notes ?? null}, updatedAt = NOW() WHERE id = ${input.leadId} AND matchedPartnerId = ${partner.id}`
        );
        await notifyOwner({
          title: `TrustyPro Lead ${input.response === 'accepted' ? 'Accepted' : 'Declined'}`,
          content: `Partner ID ${partner.id} ${input.response} lead #${input.leadId}. ${input.notes ? `Notes: ${input.notes}` : ''}`,
        });
        return { success: true };
      }),
    getPartnerReceivedReviews: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return [];
      const partnerRows = await (db as any).execute(
        sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`
      ) as any;
      const partner = (partnerRows[0]?.[0] ?? partnerRows[0]);
      if (!partner?.id) return [];
      const rows = await (db as any).execute(
        sql`SELECT pr.id, pr.rating, pr.reviewText, pr.ratingPunctuality, pr.ratingQuality,
            pr.ratingCommunication, pr.ratingValue, pr.serviceType, pr.createdAt,
            pr.replyText, pr.repliedAt, pr.homeownerEmail
            FROM partnerReviews pr
            WHERE pr.partnerId = ${partner.id} AND pr.flagged = false
            ORDER BY pr.createdAt DESC LIMIT 50`
      ) as any;
      const reviews = (rows[0] ?? rows) as any[];
      return reviews.map((r: any) => ({
        id: Number(r.id),
        rating: Number(r.rating),
        reviewText: r.reviewText ?? '',
        ratingPunctuality: r.ratingPunctuality ? Number(r.ratingPunctuality) : null,
        ratingQuality: r.ratingQuality ? Number(r.ratingQuality) : null,
        ratingCommunication: r.ratingCommunication ? Number(r.ratingCommunication) : null,
        ratingValue: r.ratingValue ? Number(r.ratingValue) : null,
        serviceType: r.serviceType ?? '',
        createdAt: r.createdAt,
        replyText: r.replyText ?? null,
        repliedAt: r.repliedAt ?? null,
        homeownerEmail: r.homeownerEmail ?? '',
      }));
    }),
    replyToReview: protectedProcedure
      .input(z.object({ reviewId: z.number(), replyText: z.string().min(1).max(1000) }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const partnerRows = await (db as any).execute(
          sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`
        ) as any;
        const partner = (partnerRows[0]?.[0] ?? partnerRows[0]);
        if (!partner?.id) throw new TRPCError({ code: 'FORBIDDEN', message: 'Partner profile not found' });
        await (db as any).execute(
          sql`UPDATE partnerReviews SET replyText = ${input.replyText}, repliedAt = NOW()
              WHERE id = ${input.reviewId} AND partnerId = ${partner.id}`
        );
        return { success: true };
      }),
  }),
  // -- Jobs --
  jobs: router({
    // Log a new job with photos
    logJob: protectedProcedure
      .input(z.object({
        serviceAddress: z.string().min(5),
        serviceType: z.string().optional(),
        customerName: z.string().optional(),
        customerEmail: z.string().email().optional(),
        customerPhone: z.string().optional(),
        notes: z.string().optional(),
        photoUrls: z.array(z.string().url()).min(1, "At least one photo is required"),
      }))
      .mutation(async ({ input, ctx }) => {
        const partner = await getPartnerByUserId(ctx.user.id);
        if (!partner) throw new TRPCError({ code: "NOT_FOUND", message: "Partner profile not found" });
        if (partner.status !== "approved") throw new TRPCError({ code: "FORBIDDEN", message: "Only approved partners can log jobs" });

        // Create job record
        const result = await createJob({
          partnerId: partner.id,
          loggedByUserId: ctx.user.id,
          serviceAddress: input.serviceAddress,
          serviceType: input.serviceType ?? null,
          customerName: input.customerName ?? null,
          customerEmail: input.customerEmail ?? null,
          customerPhone: input.customerPhone ?? null,
          notes: input.notes ?? null,
          photoUrls: input.photoUrls,
          aiAnalysisStatus: "pending",
          status: "logged",
        });

        const insertId = (result as unknown as { insertId: number }).insertId;
        await incrementPartnerStats(partner.id, "jobsLogged");

        // Trigger async AI analysis
        setImmediate(async () => {
          try {
            await updateJobAiAnalysis(insertId, "processing", null);
            const analysis = await analyzePhotosWithAI(input.photoUrls, input.serviceAddress);
            await updateJobAiAnalysis(insertId, "complete", analysis);

            if (analysis.opportunities.length > 0) {
              const approvedPartners = await getApprovedPartners();

              for (const opp of analysis.opportunities) {
                if (opp.confidence < 0.6) continue;

                const matchingTypes = getMatchingBusinessTypes(opp.category);
                const matchedPartners = approvedPartners.filter(p =>
                  p.id !== partner.id &&
                  matchingTypes.some(t => p.businessType.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(p.businessType.toLowerCase()))
                );

                const receivingPartner = matchedPartners[0] ?? null;

                await createOpportunity({
                  jobId: insertId,
                  sourcePartnerId: partner.id,
                  receivingPartnerId: receivingPartner?.id ?? null,
                  opportunityType: opp.type,
                  opportunityCategory: opp.category,
                  description: opp.description,
                  aiConfidence: opp.confidence.toFixed(3),
                  photoUrl: input.photoUrls[0],
                  estimatedJobValue: opp.estimatedValue ? opp.estimatedValue.toFixed(2) : null,
                  status: receivingPartner ? "sent" : "pending",
                  sentAt: receivingPartner ? new Date() : null,
                });

                if (receivingPartner) {
                  await incrementPartnerStats(receivingPartner.id, "leadsCount");
                  await incrementPartnerStats(partner.id, "opportunitiesGenerated");

                  await notifyOwner({
                    title: "[TARGET] New ProLnk Opportunity Detected",
                    content: `AI found a **${opp.type}** opportunity at ${input.serviceAddress}.\n\nConfidence: ${Math.round(opp.confidence * 100)}%\nDescription: ${opp.description}\nEstimated Value: $${opp.estimatedValue ?? "Unknown"}\nRouted to: ${receivingPartner.businessName}`,
                  });
                }
              }
            }
          } catch (err) {
            console.error("[AI Analysis] Failed:", err);
            await updateJobAiAnalysis(insertId, "failed", null);
          }
        });

        return { success: true, jobId: insertId };
      }),

    // Get a specific job's analysis results
    getJobAnalysis: protectedProcedure
      .input(z.object({ jobId: z.number() }))
      .query(async ({ input }) => {
        const job = await getJobById(input.jobId);
        if (!job) throw new TRPCError({ code: "NOT_FOUND", message: "Job not found" });
        return job;
      }),

  }),
  // -- Partner Notifications --
  notifications: router({
    getMyNotifications: protectedProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ ctx, input }) => {
        const partner = await getPartnerByUserId(ctx.user.id);
        if (!partner) return [];
        return getPartnerNotifications(partner.id, input.limit ?? 20);
      }),
    getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) return { count: 0 };
      const count = await getPartnerUnreadCount(partner.id);
      return { count };
    }),
    markAllRead: protectedProcedure.mutation(async ({ ctx }) => {
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) return { success: false };
      await markNotificationsRead(partner.id);
      return { success: true };
    }),    markRead: protectedProcedure
      .input(z.object({ ids: z.array(z.number()) }))
      .mutation(async ({ ctx, input }) => {
        const partner = await getPartnerByUserId(ctx.user.id);
        if (!partner) return { success: false };
        await markNotificationsRead(partner.id, input.ids);
        return { success: true };
      }),

    // Admin: send smart notification to a specific partner
    adminSendSmartNotification: adminProcedure
      .input(z.object({
        partnerId: z.number(),
        type: z.enum(["new_lead", "lead_expired", "commission_paid", "approval", "broadcast", "system"]),
        title: z.string().min(1),
        message: z.string().min(1),
        actionUrl: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await createPartnerNotification({
          partnerId: input.partnerId,
          type: input.type,
          title: input.title,
          message: input.message,
          actionUrl: input.actionUrl,
        });
        return { success: true };
      }),

    // Admin: broadcast smart notification to all approved partners
    adminBroadcastSmartNotification: adminProcedure
      .input(z.object({
        type: z.enum(["new_lead", "lead_expired", "commission_paid", "approval", "broadcast", "system"]),
        title: z.string().min(1),
        message: z.string().min(1),
        actionUrl: z.string().optional(),
        tierFilter: z.enum(["all", "scout", "pro", "crew", "company", "enterprise"]).optional(),
      }))
      .mutation(async ({ input }) => {
        const allPartners = await getApprovedPartners();
        const targets = input.tierFilter && input.tierFilter !== "all"
          ? allPartners.filter(p => p.tier === input.tierFilter)
          : allPartners;
        await Promise.all(targets.map(p =>
          createPartnerNotification({
            partnerId: p.id,
            type: input.type,
            title: input.title,
            message: input.message,
            actionUrl: input.actionUrl,
          })
        ));
        return { success: true, sent: targets.length };
      }),

    // ── Service Area Management ──────────────────────────────────────────────
    // Get all DFW zip codes with tier limit info for the current partner
    getServiceAreaData: protectedProcedure.query(async ({ ctx }) => {
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) throw new TRPCError({ code: 'NOT_FOUND', message: 'Partner not found' });
      const tier = partner.tier ?? 'scout';
      const maxAllowed = getMaxZipsForTier(tier);
      const currentZips: string[] = Array.isArray((partner as any).serviceZipCodes)
        ? (partner as any).serviceZipCodes
        : [];
      return {
        currentZips,
        maxAllowed,
        tier,
        tierLimits: TIER_ZIP_LIMITS,
        allZips: DFW_ZIP_CODES,
        remainingSlots: Math.max(0, maxAllowed - currentZips.length),
      };
    }),

    // Update partner's selected service zip codes (tier-enforced)
    updateServiceZipCodes: protectedProcedure
      .input(z.object({
        zipCodes: z.array(z.string().regex(/^\d{5}$/)).min(1).max(999),
      }))
      .mutation(async ({ ctx, input }) => {
        const partner = await getPartnerByUserId(ctx.user.id);
        if (!partner) throw new TRPCError({ code: 'NOT_FOUND', message: 'Partner not found' });
        const tier = partner.tier ?? 'scout';
        const maxAllowed = getMaxZipsForTier(tier);
        // Validate all zips are in DFW service area
        const invalidZips = input.zipCodes.filter(z => !isValidDFWZip(z));
        if (invalidZips.length > 0) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: `These zip codes are not in the DFW service area: ${invalidZips.join(', ')}`,
          });
        }
        // Enforce tier limit
        if (input.zipCodes.length > maxAllowed) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: `Your ${tier} plan allows up to ${maxAllowed} zip codes. You selected ${input.zipCodes.length}. Upgrade to add more coverage.`,
          });
        }
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
        await db.update(partners).set({
          serviceZipCodes: input.zipCodes as any,
          maxZipCodes: maxAllowed,
        }).where(eq(partners.id, partner.id));
        return { success: true, savedZips: input.zipCodes.length, maxAllowed };
      }),

    // Admin: get coverage density analysis (how many partners cover each zip)
    getCoverageDensity: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      const allPartners = await db.select({
        id: partners.id,
        businessName: partners.businessName,
        businessType: partners.businessType,
        tier: partners.tier,
        serviceZipCodes: partners.serviceZipCodes,
        status: partners.status,
      }).from(partners).where(eq(partners.status, 'approved'));
      // Build zip → partners map
      const zipCoverage: Record<string, { count: number; partners: string[]; trades: string[] }> = {};
      for (const p of allPartners) {
        const zips: string[] = Array.isArray((p as any).serviceZipCodes) ? (p as any).serviceZipCodes : [];
        for (const zip of zips) {
          if (!zipCoverage[zip]) zipCoverage[zip] = { count: 0, partners: [], trades: [] };
          zipCoverage[zip].count++;
          zipCoverage[zip].partners.push(p.businessName);
          if (!zipCoverage[zip].trades.includes(p.businessType)) {
            zipCoverage[zip].trades.push(p.businessType);
          }
        }
      }
      // Identify gaps (DFW zips with 0 coverage)
      const coveredZips = new Set(Object.keys(zipCoverage));
      const gaps = DFW_ZIP_CODES
        .filter(z => !coveredZips.has(z.zip))
        .map(z => ({ zip: z.zip, city: z.city, submarket: z.submarket, medianHomeValue: z.medianHomeValue }));
      return { zipCoverage, gaps, totalCovered: coveredZips.size, totalDFW: DFW_ZIP_CODES.length };
    }),

  }),
  // -- Admin --
  admin: router({
    getNetworkStats: adminProcedure.query(async () => {
      return getNetworkStats();
    }),

    // Admin: manually trigger PPS recalculation for all partners
    recalculatePartnerScores: adminProcedure.mutation(async () => {
      const result = await recalculateAllPartnerScores();
      return result;
    }),

    // Admin: get PPS breakdown for a specific partner
    getPartnerPriorityScore: adminProcedure
      .input(z.object({ partnerId: z.number() }))
      .query(async ({ input }) => {
        const breakdown = await calculatePartnerPriorityScore(input.partnerId);
        return breakdown;
      }),

    getPendingApplications: adminProcedure.query(async () => {
      return getPendingPartners();
    }),

    getRecentHomeProfiles: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      const rows = await (db as any).execute(sql`
        SELECT p.id, p.address, p.city, p.state, p.zipCode,
               p.homeScore, p.createdAt,
               COUNT(DISTINCT i.id) as issueCount,
               MAX(i.severity) as topSeverity,
               MIN(i.title) as topIssue
        FROM properties p
        LEFT JOIN improvements i ON i.propertyId = p.id AND i.status = 'pending'
        ORDER BY p.createdAt DESC
        LIMIT 20
      `);
      return (rows[0] as Array<{
        id: number; address: string; city: string | null; state: string | null;
        zipCode: string | null; homeScore: number | null; createdAt: number;
        issueCount: number; topSeverity: string | null; topIssue: string | null;
      }>).map(r => ({
        id: r.id,
        address: [r.address, r.city, r.state].filter(Boolean).join(', '),
        score: r.homeScore ?? Math.floor(Math.random() * 40 + 50),
        issues: Number(r.issueCount),
        topIssue: r.topIssue ?? 'No issues detected',
        status: (r.homeScore ?? 70) < 50 ? 'urgent' : (r.homeScore ?? 70) < 70 ? 'active' : 'healthy',
        lastScan: new Date(r.createdAt).toLocaleDateString(),
      }));
    }),

    getPropertyConditionReports: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      const rows = await (db as any).execute(sql`
        SELECT id, homeownerEmail, roomLabel, overallCondition, issueCount, upgradeCount,
               photoQualityFlag, createdAt, photoUrls, analysisJson
        FROM homeownerScanHistory
        ORDER BY createdAt DESC
        LIMIT 100
      `);
      return (rows[0] as any[]).map((r: any) => ({
        id: r.id,
        email: r.homeownerEmail ?? 'Unknown',
        room: r.roomLabel ?? 'General',
        condition: r.overallCondition ?? 'unknown',
        issueCount: Number(r.issueCount ?? 0),
        upgradeCount: Number(r.upgradeCount ?? 0),
        photoQuality: r.photoQualityFlag ?? 'ok',
        createdAt: r.createdAt ? new Date(r.createdAt).toISOString() : new Date().toISOString(),
        photoCount: Array.isArray(r.photoUrls) ? r.photoUrls.length : 0,
        score: r.overallCondition === 'good' ? 85 : r.overallCondition === 'fair' ? 65 : r.overallCondition === 'poor' ? 40 : 70,
        grade: r.overallCondition === 'good' ? 'A' : r.overallCondition === 'fair' ? 'B' : r.overallCondition === 'poor' ? 'D' : 'C',
      }));
    }),

    getAllPartners: adminProcedure.query(async () => {
      return getAllPartners();
    }),

    getAllJobs: adminProcedure.query(async () => {
      return getAllJobs();
    }),

    getUniqueAddresses: adminProcedure.query(async () => {
      return getUniqueAddresses();
    }),

    getJobsByAddress: adminProcedure
      .input(z.object({ address: z.string().min(1) }))
      .query(async ({ input }) => {
        return getJobsByAddress(input.address);
      }),

    getAllOpportunities: adminProcedure.query(async () => {
      return getAllOpportunities();
    }),

    approvePartner: adminProcedure
      .input(z.object({ partnerId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await approvePartner(input.partnerId);
        logAdminAction(ctx.user.id, "approve_partner", "partner", input.partnerId);
        const partner = await getPartnerById(input.partnerId);
        if (partner) {
          await notifyOwner({
            title: `[OK] Partner Approved: ${partner.businessName}`,
            content: `${partner.businessName} (${partner.contactEmail ?? "no email"}) has been approved and is now active in the ProLnk network.`,
          }).catch(() => {});
           // Fire n8n trigger for welcome sequence
          n8n.partnerApproved({
            partnerId: partner.id,
            partnerName: partner.businessName,
            businessType: partner.businessType ?? "",
            email: partner.contactEmail ?? "",
            tier: partner.tier ?? "standard",
          }).catch(() => {});
          // Send approval email
          if (partner.contactEmail) {
            sendPartnerApproved({
              to: partner.contactEmail,
            name: partner.contactName ?? partner.businessName,
              businessName: partner.businessName,
              loginUrl: `${ENV.appBaseUrl}/dashboard`,
            }).catch(() => {});
          }
        }
        return { success: true };
      }),
    // Auto-approval engine: runs eligibility checks and approves if criteria met
    autoApprovePartner: adminProcedure
      .input(z.object({ partnerId: z.number() }))
      .mutation(async ({ input }) => {
        const partner = await getPartnerById(input.partnerId);
        if (!partner) throw new TRPCError({ code: "NOT_FOUND", message: "Partner not found" });
        if (partner.status !== "pending") {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Partner is not in pending status" });
        }
        const checks: { label: string; passed: boolean; reason: string }[] = [
          {
            label: "Business Name",
            passed: (partner.businessName?.split(" ").length ?? 0) >= 2 || /llc|inc|co\.|corp|group|services|solutions/i.test(partner.businessName ?? ""),
            reason: "Business name should be at least 2 words or include a business suffix",
          },
          {
            label: "Contact Phone",
            passed: !!partner.contactPhone && partner.contactPhone.replace(/\D/g, "").length >= 10,
            reason: "A valid 10-digit phone number is required",
          },
          {
            label: "Service Area",
            passed: (partner.serviceArea?.length ?? 0) >= 5,
            reason: "Service area must be specified",
          },
          {
            label: "Business Description or Website",
            passed: !!(partner.description || partner.website),
            reason: "Either a website or business description is required",
          },
        ];
        const failedChecks = checks.filter(c => !c.passed);
        if (failedChecks.length > 0) {
          return {
            success: false,
            approved: false,
            failedChecks,
            message: `Auto-approval failed: ${failedChecks.map(c => c.reason).join("; ")}`
          };
        }
        await approvePartner(input.partnerId);
        await notifyOwner({
          title: `[AUTO-APPROVED] ${partner.businessName}`,
          content: `${partner.businessName} passed all auto-approval criteria and has been automatically approved.`,
        }).catch(() => {});
        n8n.partnerApproved({
          partnerId: partner.id,
          partnerName: partner.businessName,
          businessType: partner.businessType ?? "",
          email: partner.contactEmail ?? "",
          tier: partner.tier ?? "standard",
        }).catch(() => {});
        return { success: true, approved: true, failedChecks: [], message: "Partner auto-approved" };
      }),

    rejectPartner: adminProcedure
      .input(z.object({ partnerId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await rejectPartner(input.partnerId);
        logAdminAction(ctx.user.id, "reject_partner", "partner", input.partnerId);
        const partner = await getPartnerById(input.partnerId);
        if (partner) {
          await notifyOwner({
            title: `[FAIL] Partner Rejected: ${partner.businessName}`,
            content: `${partner.businessName} (${partner.contactEmail ?? "no email"}) application has been rejected.`,
          }).catch(() => {});
          n8n.partnerRejected({
            partnerId: partner.id,
            partnerName: partner.businessName,
            email: partner.contactEmail ?? "",
          }).catch(() => {});
          // Send rejection email
          if (partner.contactEmail) {
            sendPartnerRejected({
              to: partner.contactEmail,
              name: partner.contactName ?? partner.businessName,
            }).catch(() => {});
          }
        }
        return { success: true };
      }),
    updatePartnerRates: adminProcedure
      .input(z.object({
        partnerId: z.number(),
        platformFeeRate: z.number().min(0).max(0.30),
        referralCommissionRate: z.number().min(0).max(0.15),
      }))
      .mutation(async ({ input }) => {
        await updatePartnerCommissionRates(
          input.partnerId,
          input.platformFeeRate.toFixed(4),
          input.referralCommissionRate.toFixed(4),
        );
        return { success: true };
      }),

    getUnpaidCommissions: adminProcedure.query(async () => {
      return getUnpaidCommissions();
    }),
    // Win-back: partners inactive for N days
    getInactivePartners: adminProcedure
      .input(z.object({ daysSinceLastJob: z.number().default(60) }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        const cutoff = Date.now() - input.daysSinceLastJob * 24 * 60 * 60 * 1000;
        const rows = await (db as any).execute(sql`
          SELECT p.id, p.businessName, p.contactEmail, p.tier, p.status,
                 MAX(j.createdAt) AS lastJobDate
          FROM partners p
          LEFT JOIN jobs j ON j.partnerId = p.id
          WHERE p.status = 'approved'
          GROUP BY p.id
          HAVING lastJobDate IS NULL OR lastJobDate < ${cutoff}
          ORDER BY lastJobDate ASC
          LIMIT 100
        `);
        return (rows.rows || rows) as any[];
      }),
    // 1099 report: all paid commissions with partner infoo
    getAllPaidCommissions: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      const rows = await (db as any).execute(sql`
        SELECT c.id, c.receivingPartnerId, c.payingPartnerId, c.amount, c.paid,
               c.paidAt, c.createdAt, c.description, c.disputeStatus,
               p.businessName, p.contactEmail
        FROM commissions c
        LEFT JOIN partners p ON c.receivingPartnerId = p.id
        WHERE c.paid = 1
        ORDER BY c.paidAt DESC
      `);
      return rows.rows || rows;
    }),

    markCommissionPaid: adminProcedure
      .input(z.object({ commissionId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await markCommissionPaid(input.commissionId);
        logAdminAction(ctx.user.id, "mark_commission_paid", "commission", input.commissionId);
        // Send commission earned email to partner
        try {
          const db = await getDb();
          if (db) {
            const rows = await (db as any).execute(sql`
              SELECT c.amount, c.description, p.businessName, u.email, u.name
              FROM commissions c
              LEFT JOIN partners p ON p.id = c.partnerId
              LEFT JOIN users u ON u.id = p.userId
              WHERE c.id = ${input.commissionId} LIMIT 1
            `);
            const row = (rows[0] || [])[0];
            if (row?.email) {
              await sendCommissionEarned({
                to: row.email,
                partnerName: row.name || row.businessName,
                amount: Number(row.amount ?? 0),
                jobDescription: row.description || 'Commission payment',
                fromPartnerName: 'ProLnk Network',
                dashboardUrl: `${ENV.appBaseUrl}/dashboard/earnings`,
              }).catch(() => {});
            }
          }
        } catch (e) {
          console.warn('[markCommissionPaid] Failed to send commission email:', e);
        }
        return { success: true };
      }),

    broadcastMessage: adminProcedure
      .input(z.object({
        subject: z.string().min(1),
        message: z.string().min(1),
        audience: z.enum(['all', 'scout', 'pro', 'crew', 'company', 'enterprise', 'pending']).default('all'),
        channels: z.array(z.string()).default(['in_app']),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
        // Save broadcast record
        await createBroadcast(input.subject, input.message, ctx.user.id);
        // Send in-app notifications to matching partners
        if (input.channels.includes('in_app')) {
          let partnerRows: Array<{ id: number }>;
          if (input.audience === 'all') {
            const rows = await (db as any).execute(sql`SELECT id FROM partners WHERE status = 'approved'`);
            partnerRows = rows[0] || [];
          } else if (input.audience === 'pending') {
            const rows = await (db as any).execute(sql`SELECT id FROM partners WHERE status = 'pending'`);
            partnerRows = rows[0] || [];
          } else {
            const rows = await (db as any).execute(sql`SELECT id FROM partners WHERE status = 'approved' AND tier = ${input.audience}`);
            partnerRows = rows[0] || [];
          }
          for (const p of partnerRows) {
            await createPartnerNotification({
              partnerId: p.id,
              type: 'broadcast',
              title: input.subject,
              message: input.message.slice(0, 500),
              actionUrl: '/dashboard',
            });
          }
        }
        return { success: true, recipientCount: 0 };
      }),

    // Wave 17: Get all open disputes for admin review
    getOpenDisputes: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      return db.select().from(commissions)
        .where(or(eq(commissions.disputeStatus, 'open'), eq(commissions.disputeStatus, 'under_review')))
        .orderBy(desc(commissions.disputeOpenedAt));
    }),

    // Wave 17: Resolve a dispute (approve or deny)
    resolveDispute: adminProcedure
      .input(z.object({
        commissionId: z.number().int().positive(),
        resolution: z.enum(['resolved_approved', 'resolved_denied']),
        resolutionNote: z.string().min(5).max(1000),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
        await db.update(commissions).set({
          disputeStatus: input.resolution,
          disputeResolvedAt: new Date(),
          disputeResolvedBy: ctx.user.id,
          disputeResolutionNote: input.resolutionNote,
        }).where(eq(commissions.id, input.commissionId));
        // REV-12: Notify the partner in-app when their dispute is resolved
        try {
          const [comm] = await db.select().from(commissions).where(eq(commissions.id, input.commissionId)).limit(1);
          if (comm?.receivingPartnerId) {
            const isApproved = input.resolution === 'resolved_approved';
            const alertTitle = isApproved ? 'Dispute Approved — Commission Adjusted' : 'Dispute Resolved — Decision Issued';
            const alertBody = isApproved
              ? `Your commission dispute has been reviewed and approved. ${input.resolutionNote}`
              : `Your commission dispute has been reviewed. Decision: ${input.resolutionNote}`;
            await (db as any).execute(sql`INSERT INTO partnerAlerts (partnerId, alertType, title, body, severity, isRead, isDismissed, createdAt) VALUES (${comm.receivingPartnerId}, 'dispute_resolved', ${alertTitle}, ${alertBody}, ${isApproved ? 'success' : 'info'}, 0, 0, NOW())`);
          }
        } catch { /* non-fatal */ }
        return { success: true };
      }),

    // Wave 17: Mark dispute as under review
    markDisputeUnderReview: adminProcedure
      .input(z.object({ commissionId: z.number().int().positive() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
        await db.update(commissions).set({ disputeStatus: 'under_review' })
          .where(eq(commissions.id, input.commissionId));
        return { success: true };
      }),

    // DIS-03: AI pre-assessment of a dispute
    aiAssessDispute: adminProcedure
      .input(z.object({ commissionId: z.number().int().positive() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
        const [comm] = await db.select().from(commissions).where(eq(commissions.id, input.commissionId)).limit(1);
        if (!comm) throw new TRPCError({ code: 'NOT_FOUND', message: 'Commission not found' });
        const { invokeLLM } = await import('./_core/llm');
        const evidenceUrls: string[] = comm.disputeEvidenceUrls ? JSON.parse(comm.disputeEvidenceUrls) : [];
        const prompt = `You are a commission dispute analyst for ProLnk, a home services partner network.

Dispute details:
- Commission ID: ${comm.id}
- Amount: $${comm.amount}
- Commission type: ${comm.commissionType}
- Dispute reason: ${comm.disputeReason ?? 'Not provided'}
- Evidence files attached: ${evidenceUrls.length}

Assess whether this dispute is likely valid or invalid based on the reason provided.
Respond with JSON only: { "assessment": "likely_valid" | "likely_invalid" | "unclear", "confidence": 0.0-1.0, "reasoning": "one sentence" }`;
        const resp = await invokeLLM({
          messages: [
            { role: 'system', content: 'You are a fair and objective commission dispute analyst. Respond only with valid JSON.' },
            { role: 'user', content: prompt },
          ],
          response_format: { type: 'json_schema', json_schema: { name: 'dispute_assessment', strict: true, schema: { type: 'object', properties: { assessment: { type: 'string' }, confidence: { type: 'number' }, reasoning: { type: 'string' } }, required: ['assessment', 'confidence', 'reasoning'], additionalProperties: false } } },
        });
        const content = resp.choices?.[0]?.message?.content ?? '{}';
        const parsed = JSON.parse(typeof content === 'string' ? content : JSON.stringify(content));
        await db.update(commissions).set({
          disputeAiAssessment: parsed.assessment ?? 'unclear',
          disputeAiConfidence: String(Math.min(1, Math.max(0, parsed.confidence ?? 0.5))),
          disputeAiReasoning: (parsed.reasoning ?? '').slice(0, 500),
        }).where(eq(commissions.id, input.commissionId));
        return { assessment: parsed.assessment, confidence: parsed.confidence, reasoning: parsed.reasoning };
      }),

    // Wave 3: Industry commission rates management
    getIndustryRates: adminProcedure.query(async () => {
      return getIndustryRates();
    }),

    upsertIndustryRate: adminProcedure
      .input(z.object({
        industryName: z.string().min(1),
        platformFeeRate: z.number().min(0).max(0.30),
        referralCommissionRate: z.number().min(0).max(0.15),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await upsertIndustryRate(
          input.industryName,
          input.platformFeeRate.toFixed(4),
          input.referralCommissionRate.toFixed(4),
          input.notes ?? null,
        );
        return { success: true };
      }),

    // Wave 1: Self-promote to admin (owner only, first-time setup)
    selfPromoteToAdmin: protectedProcedure.mutation(async ({ ctx }) => {
      if (ctx.user.openId !== ENV.ownerOpenId) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Only the network owner can use this action." });
      }
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      await db.update(users).set({ role: "admin" }).where(eq(users.id, ctx.user.id));
      return { success: true };
    }),

    // Wave 5: Get all opportunities with full detail for AI feed
    getOpportunityFeed: adminProcedure.query(async () => {
      return getAllOpportunities();
    }),
    // Lead Dispatch Portal: get opportunities pending admin review
    getPendingLeads: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      const { opportunities: oppsTable } = await import("../drizzle/schema");
      const { eq: eqFn, desc } = await import("drizzle-orm");
      return db.select().from(oppsTable).where(eqFn(oppsTable.adminReviewStatus, "pending_review")).orderBy(desc(oppsTable.createdAt));
    }),
    // Lead Dispatch Portal: get approved partners for routing selection
    getApprovedPartnersForDispatch: adminProcedure.query(async () => {
      return getApprovedPartners();
    }),
    // Lead Dispatch Portal: admin approves and dispatches a lead to a specific partner
    dispatchLead: adminProcedure
      .input(z.object({
        opportunityId: z.number(),
        targetPartnerId: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        await dispatchLeadToPartner(input.opportunityId, input.targetPartnerId, ctx.user.id);
        // Fire n8n trigger for lead dispatch notification
        const opp = await getAllOpportunities().then(list => list.find(o => o.id === input.opportunityId));
        const receivingPartner = await getPartnerById(input.targetPartnerId);
        if (opp && receivingPartner) {
          n8n.leadDispatched({
            opportunityId: input.opportunityId,
            receivingPartnerId: input.targetPartnerId,
            receivingPartnerName: receivingPartner.businessName,
            receivingPartnerPhone: receivingPartner.contactPhone ?? undefined,
            receivingPartnerEmail: receivingPartner.contactEmail ?? undefined,
            issueType: opp.opportunityType ?? opp.opportunityCategory ?? "Service Request",
            serviceCity: opp.serviceAddress ?? "",
            estimatedJobValue: opp.estimatedJobValue ? Number(opp.estimatedJobValue) : undefined,
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          }).catch(() => {});
        }
        return { success: true };
      }),
    // Lead Dispatch Portal: admin rejects a lead
    rejectLead: adminProcedure
      .input(z.object({ opportunityId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        await rejectOpportunityByAdmin(input.opportunityId, ctx.user.id);
        return { success: true };
      }),
    // Sweep expired leads manually
    sweepExpiredLeads: adminProcedure.mutation(async () => {
      await sweepExpiredLeads();
      return { success: true };
    }),

    // Photo Pipeline: get photo intake queue
    getPhotoQueue: adminProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ input }) => {
        return getPhotoQueue(input.limit ?? 50);
      }),

    // Photo Pipeline: get stats for today
    getPhotoQueueStats: adminProcedure.query(async () => {
      return getPhotoQueueStats();
    }),

    // -- Wave 14: FSM Webhook Events Log --
    getFsmWebhookEvents: adminProcedure
      .input(z.object({
        limit: z.number().min(1).max(500).default(100),
        status: z.enum(["received", "matched", "unmatched", "commission_closed", "error", "all"]).default("all"),
        source: z.enum(["housecall_pro", "jobber", "workiz", "service_fusion", "fieldedge", "other", "all"]).default("all"),
      }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        const conditions: string[] = [];
        const params: (string | number)[] = [];
        if (input.status !== "all") { conditions.push(`e.status = ?`); params.push(input.status); }
        if (input.source !== "all") { conditions.push(`e.source = ?`); params.push(input.source); }
        const where = conditions.length ? `WHERE ` + conditions.join(" AND ") : "";
        params.push(input.limit);
        // Build safe parameterized query using drizzle sql template
        const limitVal = input.limit;
        let rows: any;
        if (input.status !== "all" && input.source !== "all") {
          rows = await (db as any).execute(sql`SELECT e.*, p.businessName as partnerName FROM fsmWebhookEvents e LEFT JOIN partners p ON e.matchedPartnerId = p.id WHERE e.status = ${input.status} AND e.source = ${input.source} ORDER BY e.receivedAt DESC LIMIT ${limitVal}`);
        } else if (input.status !== "all") {
          rows = await (db as any).execute(sql`SELECT e.*, p.businessName as partnerName FROM fsmWebhookEvents e LEFT JOIN partners p ON e.matchedPartnerId = p.id WHERE e.status = ${input.status} ORDER BY e.receivedAt DESC LIMIT ${limitVal}`);
        } else if (input.source !== "all") {
          rows = await (db as any).execute(sql`SELECT e.*, p.businessName as partnerName FROM fsmWebhookEvents e LEFT JOIN partners p ON e.matchedPartnerId = p.id WHERE e.source = ${input.source} ORDER BY e.receivedAt DESC LIMIT ${limitVal}`);
        } else {
          rows = await (db as any).execute(sql`SELECT e.*, p.businessName as partnerName FROM fsmWebhookEvents e LEFT JOIN partners p ON e.matchedPartnerId = p.id ORDER BY e.receivedAt DESC LIMIT ${limitVal}`);
        }
        return (Array.isArray(rows) ? rows : rows.rows ?? []) as any[];
      }),
    getFsmWebhookStats: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return { total: 0, matched: 0, unmatched: 0, commissionsClosed: 0, errors: 0 };
      const rows = await (db as any).execute(sql`
        SELECT
          COUNT(*) as total,
          SUM(CASE WHEN status = 'matched' THEN 1 ELSE 0 END) as matched,
          SUM(CASE WHEN status = 'unmatched' THEN 1 ELSE 0 END) as unmatched,
          SUM(CASE WHEN status = 'commission_closed' THEN 1 ELSE 0 END) as commissionsClosed,
          SUM(CASE WHEN status = 'error' THEN 1 ELSE 0 END) as errors
        FROM fsmWebhookEvents
      `);
      const r = (Array.isArray(rows) ? rows[0] : (rows.rows ?? [])[0]) ?? {};
      return {
        total: Number(r.total ?? 0),
        matched: Number(r.matched ?? 0),
        unmatched: Number(r.unmatched ?? 0),
        commissionsClosed: Number(r.commissionsClosed ?? 0),
        errors: Number(r.errors ?? 0),
      };
    }),

    // -- Wave 15: n8n Webhook Subscription Manager --
    getWebhookSubscriptions: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      const rows = await (db as any).execute(sql`SELECT * FROM webhookSubscriptions ORDER BY createdAt DESC`);
      return (Array.isArray(rows) ? rows : rows.rows ?? []) as any[];
    }),
    createWebhookSubscription: adminProcedure
      .input(z.object({
        event: z.string().min(1),
        url: z.string().url(),
        secret: z.string().optional(),
        isActive: z.boolean().default(true),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
        await (db as any).execute(sql`
          INSERT INTO webhookSubscriptions (event, url, secret, isActive, createdAt, updatedAt)
          VALUES (${input.event}, ${input.url}, ${input.secret ?? null}, ${input.isActive ? 1 : 0}, NOW(), NOW())
        `);
        return { success: true };
      }),
    updateWebhookSubscription: adminProcedure
      .input(z.object({
        id: z.number(),
        isActive: z.boolean().optional(),
        url: z.string().url().optional(),
        secret: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
        if (input.isActive !== undefined) {
          await (db as any).execute(sql`UPDATE webhookSubscriptions SET isActive = ${input.isActive ? 1 : 0}, updatedAt = NOW() WHERE id = ${input.id}`);
        }
        if (input.url) {
          await (db as any).execute(sql`UPDATE webhookSubscriptions SET url = ${input.url}, updatedAt = NOW() WHERE id = ${input.id}`);
        }
        if (input.secret !== undefined) {
          await (db as any).execute(sql`UPDATE webhookSubscriptions SET secret = ${input.secret}, updatedAt = NOW() WHERE id = ${input.id}`);
        }
        return { success: true };
      }),
    deleteWebhookSubscription: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });
        await (db as any).execute(sql`DELETE FROM webhookSubscriptions WHERE id = ${input.id}`);
        return { success: true };
      }),
    // Wave 23: Analytics Export
    exportNetworkReport: adminProcedure
      .input(z.object({
        reportType: z.enum(['partners', 'opportunities', 'commissions', 'jobs', 'leads']),
        dateFrom: z.string().optional(),
        dateTo: z.string().optional(),
      }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
        const fromClause = input.dateFrom ? `AND createdAt >= '${input.dateFrom}'` : '';
        const toClause = input.dateTo ? `AND createdAt <= '${input.dateTo} 23:59:59'` : '';
        if (input.reportType === 'partners') {
          const rows = await (db as any).execute(sql`SELECT id, businessName, businessType, contactName, contactEmail, contactPhone, serviceArea, tier, status, referralCount, totalJobValue, approvedAt, createdAt FROM partners ORDER BY createdAt DESC`);
          return { type: 'partners', rows: rows[0] || [] };
        }
        if (input.reportType === 'opportunities') {
          const rows = await (db as any).execute(sql`SELECT o.id, o.opportunityType, o.opportunityCategory, o.description, o.aiConfidence, o.status, o.adminReviewStatus, o.estimatedJobValue, o.actualJobValue, o.platformFeeAmount, o.referralCommissionAmount, o.createdAt, sp.businessName as sourcePartner, rp.businessName as receivingPartner FROM opportunities o LEFT JOIN partners sp ON sp.id = o.sourcePartnerId LEFT JOIN partners rp ON rp.id = o.receivingPartnerId ORDER BY o.createdAt DESC LIMIT 1000`);
          return { type: 'opportunities', rows: rows[0] || [] };
        }
        if (input.reportType === 'commissions') {
          const rows = await (db as any).execute(sql`SELECT c.id, c.amount, c.type, c.paid, c.paidAt, c.createdAt, p.businessName as partnerName FROM commissions c LEFT JOIN partners p ON p.id = c.receivingPartnerId ORDER BY c.createdAt DESC LIMIT 1000`);
          return { type: 'commissions', rows: rows[0] || [] };
        }
        if (input.reportType === 'jobs') {
          const rows = await (db as any).execute(sql`SELECT j.id, j.serviceAddress, j.serviceCity, j.serviceState, j.jobValue, j.status, j.completedAt, j.createdAt, p.businessName as partnerName FROM jobs j LEFT JOIN partners p ON p.id = j.partnerId ORDER BY j.createdAt DESC LIMIT 1000`);
          return { type: 'jobs', rows: rows[0] || [] };
        }
        if (input.reportType === 'leads') {
          const rows = await (db as any).execute(sql`SELECT id, homeownerName, homeownerEmail, homeownerPhone, address, city, zipCode, source, status, matchedPartnerId, createdAt FROM homeownerLeads ORDER BY createdAt DESC LIMIT 1000`);
          return { type: 'leads', rows: rows[0] || [] };
        }
        return { type: input.reportType, rows: [] };
      }),

    getDataExportRequests: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      const rows = await (db as any).execute(sql`
        SELECT der.id, der.homeownerId, der.status, der.requestedAt, der.processedAt, der.exportUrl,
               u.email as homeownerEmail
        FROM dataExportRequests der
        LEFT JOIN users u ON u.id = der.homeownerId
        ORDER BY der.requestedAt DESC
        LIMIT 50
      `);
      return (rows[0] as any[]) ?? [];
    }),

    processDataExport: adminProcedure
      .input(z.object({ requestId: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        await (db as any).execute(sql`
          UPDATE dataExportRequests
          SET status = 'completed', processedAt = ${Date.now()},
              exportUrl = ${`/api/data-export/${input.requestId}`}
          WHERE id = ${input.requestId}
        `);
        return { success: true };
      }),

    getFeatureFlags: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return { homeownerSignupOpen: false, trustyProLive: false, partnerApplicationsOpen: true };
      const rows = await (db as any).execute(sql`SELECT \`key\`, value FROM systemSettings`);
      const settings: Record<string, string> = {};
      for (const row of (rows[0] as any[])) settings[row.key] = row.value;
      return {
        homeownerSignupOpen: settings.homeownerSignupOpen === 'true',
        trustyProLive: settings.trustyProLive === 'true',
        partnerApplicationsOpen: settings.partnerApplicationsOpen !== 'false',
      };
    }),

    setFeatureFlag: adminProcedure
      .input(z.object({ key: z.string(), value: z.boolean() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        await (db as any).execute(sql`
          INSERT INTO systemSettings (\`key\`, value, description)
          VALUES (${input.key}, ${String(input.value)}, ${`Feature flag: ${input.key}`})
          ON DUPLICATE KEY UPDATE value = ${String(input.value)}, updatedAt = NOW()
        `);
        return { success: true };
      }),
  }),

  // -- Public: partner directory (Wave 2) --
  directory: router({
    getPublicProfile: publicProcedure
      .input(z.object({ partnerId: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return null;
        // Get partner basic info
        const rows = await (db as any).execute(sql`
          SELECT p.id, p.businessName, p.businessType, p.serviceArea, p.serviceAreaLat, p.serviceAreaLng,
            p.serviceRadiusMiles, p.tier, p.website, p.description, p.referralCount, p.approvedAt,
            pv.licenseVerified, pv.insuranceVerified, pv.backgroundCheckVerified,
            pv.businessRegistrationVerified, pv.referencesVerified, pv.portfolioVerified,
            pv.identityVerified, pv.trustScore, pv.badgeLevel
          FROM partners p
          LEFT JOIN partnerVerifications pv ON pv.partnerId = p.id
          WHERE p.id = ${input.partnerId} AND p.status = 'approved'
          LIMIT 1
        `);
        const partner = (rows[0] || [])[0];
        if (!partner) return null;
        // Get public reviews
        const reviewRows = await (db as any).execute(sql`
          SELECT rating, reviewText, ratingPunctuality, ratingQuality, ratingCommunication, ratingValue,
            homeownerName, createdAt
          FROM partnerReviews
          WHERE partnerId = ${input.partnerId} AND isPublic = true AND flagged = false
          ORDER BY createdAt DESC
          LIMIT 10
        `);
        const reviews = (reviewRows[0] || []);
        const avgRating = reviews.length > 0
          ? reviews.reduce((sum: number, r: any) => sum + (r.rating || 0), 0) / reviews.length
          : null;
        return { partner, reviews, avgRating };
      }),
    getSpotlightPartners: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      const rows = await (db as any).execute(sql`
        SELECT p.id, p.businessName, p.businessType, p.serviceArea, p.tier,
          p.referralCount, p.description,
          COALESCE(pv.trustScore, 0) as trustScore,
          COALESCE(pv.badgeLevel, 'bronze') as badgeLevel,
          COALESCE(AVG(pr.rating), 0) as avgRating,
          COUNT(pr.id) as reviewCount
        FROM partners p
        LEFT JOIN partnerVerifications pv ON pv.partnerId = p.id
        LEFT JOIN partnerReviews pr ON pr.partnerId = p.id AND pr.flagged = false
        WHERE p.status = 'approved'
        GROUP BY p.id, p.businessName, p.businessType, p.serviceArea, p.tier, p.referralCount, p.description, pv.trustScore, pv.badgeLevel
        ORDER BY p.referralCount DESC, pv.trustScore DESC
        LIMIT 6
      `);
      return (rows[0] || []);
    }),
    getLeaderboard: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      const rows = await (db as any).execute(sql`
        SELECT p.id, p.businessName, p.businessType, p.serviceArea, p.tier,
          p.referralCount, p.jobsLogged as jobCount, p.totalCommissionEarned as totalCommissionsEarned,
          COALESCE(pv.trustScore, 0) as trustScore,
          COALESCE(pv.badgeLevel, 'bronze') as badgeLevel,
          COALESCE(AVG(pr.rating), 0) as avgRating,
          COUNT(pr.id) as reviewCount
        FROM partners p
        LEFT JOIN partnerVerifications pv ON pv.partnerId = p.id
        LEFT JOIN partnerReviews pr ON pr.partnerId = p.id AND pr.flagged = false
        WHERE p.status = 'approved'
        GROUP BY p.id, p.businessName, p.businessType, p.serviceArea, p.tier, p.referralCount, p.jobsLogged, p.totalCommissionEarned, pv.trustScore, pv.badgeLevel
        ORDER BY p.referralCount DESC
        LIMIT 10
      `);
      return (rows[0] || []);
    }),
    getPublicStats: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return { totalPartners: 0, totalJobs: 0, totalLeads: 0, totalCommissionsPaid: 0 };
      const { count: cnt } = await import("drizzle-orm");
      const [partnersResult] = await db.select({ total: cnt() }).from(partners).where(eq(partners.status, "approved"));
      const [jobsResult] = await db.select({ total: cnt() }).from(jobs);
      const [leadsResult] = await db.select({ total: cnt() }).from(opportunities).where(eq(opportunities.status, "converted"));
      const [commResult] = await db.select({
        total: sql<number>`COALESCE(SUM(${commissions.amount}), 0)`,
      }).from(commissions).where(eq(commissions.paid, true));
      return {
        totalPartners: partnersResult?.total ?? 0,
        totalJobs: jobsResult?.total ?? 0,
        totalLeads: leadsResult?.total ?? 0,
        totalCommissionsPaid: Number(commResult?.total ?? 0),
      };
    }),
    getFoundingPartnerCount: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return { approvedCount: 0, spotsRemaining: 50 };
      const { count } = await import("drizzle-orm");
      const [result] = await db.select({ total: count() }).from(partners).where(eq(partners.status, "approved"));
      const approvedCount = result?.total ?? 0;
      const spotsRemaining = Math.max(0, 50 - approvedCount);
      return { approvedCount, spotsRemaining };
    }),
    getApprovedPartners: publicProcedure.query(async () => {
      const all = await getApprovedPartners();
      // Return safe public fields only
      return all.map(p => ({
        id: p.id,
        businessName: p.businessName,
        businessType: p.businessType,
        serviceArea: p.serviceArea,
        serviceAreaLat: p.serviceAreaLat,
        serviceAreaLng: p.serviceAreaLng,
        serviceRadiusMiles: p.serviceRadiusMiles,
        tier: p.tier,
        website: p.website,
        description: p.description,
        referralCount: p.referralCount,
        approvedAt: p.approvedAt,
      }));
    }),
  }),

  partnerAlerts: router({
    getAlerts: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) return [];
      // Auto-generate smart alerts based on partner performance
      const alerts: Array<{ alertType: string; title: string; body: string; severity: string }> = [];

      // Check for unread inbound leads
      const pendingLeads = await (db as any).execute(sql`SELECT COUNT(*) as cnt FROM opportunities WHERE receivingPartnerId = ${partner.id} AND status = 'sent'`);
      const leadCount = Number(pendingLeads[0]?.[0]?.cnt ?? 0);
      if (leadCount > 0) {
        alerts.push({ alertType: 'pending_leads', title: `${leadCount} lead${leadCount > 1 ? 's' : ''} waiting for your response`, body: `You have ${leadCount} inbound lead${leadCount > 1 ? 's' : ''} that need a response. Respond within 48 hours to maintain your response rate.`, severity: 'warning' });
      }

      // Check tier progress
      const totalJobs = Number((partner as any).jobsLogged ?? 0);
      const totalReferrals = Number(partner.referralCount ?? 0);
      const tier = partner.tier ?? 'scout';
      if (tier === 'scout' && totalJobs >= 8) {
        alerts.push({ alertType: 'tier_upgrade', title: 'Ready to upgrade to Pro?', body: 'You have strong job volume. Upgrading to Pro ($29/mo) unlocks 55% commission keep -- up from 40% on Scout. At your current volume, Pro pays for itself.', severity: 'milestone' });
      } else if (tier === 'scout' && totalJobs >= 5) {
        alerts.push({ alertType: 'tier_progress', title: `${10 - totalJobs} more jobs -- then consider upgrading`, body: 'Pro tier keeps 55% of every commission and removes the $500/mo cap. Keep logging jobs to see your break-even.', severity: 'info' });
      }
      if (tier === 'pro' && totalReferrals >= 15) {
        alerts.push({ alertType: 'tier_upgrade', title: 'Consider upgrading to Crew', body: 'Your referral volume is strong. Crew tier ($79/mo) keeps 65% of commissions and supports up to 5 team members.', severity: 'milestone' });
      }

      // Milestone celebrations
      if (totalJobs === 10) alerts.push({ alertType: 'milestone_10jobs', title: '[SUCCESS] 10 Jobs Milestone!', body: 'You just logged your 10th job on ProLnk. You\'re in the top 20% of active partners.', severity: 'milestone' });
      if (totalJobs === 25) alerts.push({ alertType: 'milestone_25jobs', title: '[AWARD] 25 Jobs -- Power Partner!', body: 'Incredible! 25 jobs logged. You\'re officially a Power Partner. Expect priority lead routing starting next week.', severity: 'milestone' });
      if (totalReferrals === 5) alerts.push({ alertType: 'milestone_5refs', title: '[LINK] 5 Referrals Sent!', body: 'You\'ve sent 5 referrals to the network. Partners who send 10+ referrals earn 40% more in commissions.', severity: 'success' });

      // Check for deals expiring within 24 hours
      const expiringDeals = await (db as any).execute(sql`SELECT COUNT(*) as cnt FROM opportunities WHERE receivingPartnerId = ${partner.id} AND status = 'sent' AND expiresAt IS NOT NULL AND expiresAt > NOW() AND expiresAt < DATE_ADD(NOW(), INTERVAL 24 HOUR)`);
      const expiringCount = Number(expiringDeals[0]?.[0]?.cnt ?? 0);
      if (expiringCount > 0) {
        alerts.push({ alertType: 'deal_expiring', title: `${expiringCount} deal${expiringCount > 1 ? 's' : ''} expiring in 24 hours`, body: `You have ${expiringCount} inbound lead${expiringCount > 1 ? 's' : ''} that will expire soon. Accept or pass now to keep your response rate high.`, severity: 'warning' });
      }

      // Check for pending earnings
      const pendingEarnings = await (db as any).execute(sql`SELECT COALESCE(SUM(amount),0) as total FROM commissions WHERE receivingPartnerId = ${partner.id} AND paid = 0`);
      const pending = Number(pendingEarnings[0]?.[0]?.total ?? 0);
      if (pending >= 100) {
        alerts.push({ alertType: 'payout_ready', title: `$${pending.toFixed(0)} ready for payout`, body: 'Your commission balance has reached the $100 minimum payout threshold. Your next payout will be processed on the 1st of the month.', severity: 'success' });
      }

      // Also fetch stored alerts from DB
      const storedAlerts = await (db as any).execute(sql`SELECT * FROM partnerAlerts WHERE partnerId = ${partner.id} AND isDismissed = 0 ORDER BY createdAt DESC LIMIT 20`);
      const stored = storedAlerts[0] as Array<{ id: number; alertType: string; title: string; body: string; severity: string; isRead: number; createdAt: Date }>;

      return [
        ...alerts.map((a, i) => ({ id: -(i + 1), ...a, isRead: false, createdAt: new Date() })),
        ...stored.map(s => ({ ...s, isRead: s.isRead === 1 })),
      ];
    }),
    markRead: protectedProcedure
      .input(z.object({ alertId: z.number() }))
      .mutation(async ({ input }) => {
        if (input.alertId < 0) return { success: true }; // auto-generated alerts
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        await (db as any).execute(sql`UPDATE partnerAlerts SET isRead = 1 WHERE id = ${input.alertId}`);
        return { success: true };
      }),
    dismiss: protectedProcedure
      .input(z.object({ alertId: z.number() }))
      .mutation(async ({ input }) => {
        if (input.alertId < 0) return { success: true };
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        await (db as any).execute(sql`UPDATE partnerAlerts SET isDismissed = 1 WHERE id = ${input.alertId}`);
        return { success: true };
      }),
  }),

  partnerAnalytics: router({
    getAdvanced: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) return null;
      const pid = partner.id;

      // Monthly job counts (last 6 months)
      const monthlyJobs = await (db as any).execute(sql`
        SELECT DATE_FORMAT(createdAt, '%Y-%m') as month, COUNT(*) as count
        FROM jobs WHERE partnerId = ${pid}
        AND createdAt >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY month ORDER BY month ASC
      `);

      // Opportunity conversion funnel
      const funnelRows = await (db as any).execute(sql`
        SELECT status, COUNT(*) as count FROM opportunities
        WHERE receivingPartnerId = ${pid}
        GROUP BY status
      `);

      // Earnings by month (last 6 months)
      const earningsByMonth = await (db as any).execute(sql`
        SELECT DATE_FORMAT(createdAt, '%Y-%m') as month, SUM(amount) as total
        FROM commissions WHERE receivingPartnerId = ${pid}
        AND createdAt >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY month ORDER BY month ASC
      `);

      // Outbound referrals sent by month
      const outboundByMonth = await (db as any).execute(sql`
        SELECT DATE_FORMAT(createdAt, '%Y-%m') as month, COUNT(*) as count
        FROM opportunities WHERE sourcePartnerId = ${pid}
        AND createdAt >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY month ORDER BY month ASC
      `);

      // Total stats
      const totalJobs = await (db as any).execute(sql`SELECT COUNT(*) as cnt FROM jobs WHERE partnerId = ${pid}`);
      const totalEarnings = await (db as any).execute(sql`SELECT COALESCE(SUM(amount),0) as total FROM commissions WHERE receivingPartnerId = ${pid} AND paid = 1`);
      const pendingEarnings = await (db as any).execute(sql`SELECT COALESCE(SUM(amount),0) as total FROM commissions WHERE receivingPartnerId = ${pid} AND paid = 0`);
      const avgJobValue = await (db as any).execute(sql`SELECT COALESCE(AVG(jobValue),0) as avg FROM commissions WHERE receivingPartnerId = ${pid}`);

      return {
        partner: { id: partner.id, businessName: partner.businessName, tier: partner.tier, businessType: partner.businessType },
        monthlyJobs: monthlyJobs[0] as Array<{ month: string; count: number }>,
        funnel: funnelRows[0] as Array<{ status: string; count: number }>,
        earningsByMonth: earningsByMonth[0] as Array<{ month: string; total: number }>,
        outboundByMonth: outboundByMonth[0] as Array<{ month: string; count: number }>,
        totals: {
          jobs: Number(totalJobs[0]?.[0]?.cnt ?? 0),
          earned: Number(totalEarnings[0]?.[0]?.total ?? 0),
          pending: Number(pendingEarnings[0]?.[0]?.total ?? 0),
          avgJobValue: Number(avgJobValue[0]?.[0]?.avg ?? 0),
        },
      };
    }),
  }),

  referralTracking: router({
    getStats: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) return { clicks: 0, conversions: 0, bonusEarned: 0, referredPartners: [] };
      const referralCode = `partner-${partner.id}`;
      const clickRows = await (db as any).execute(sql`SELECT COUNT(*) as cnt FROM referralClicks WHERE referralCode = ${referralCode}`);
      const convRows = await (db as any).execute(sql`SELECT COUNT(*) as cnt FROM referralClicks WHERE referralCode = ${referralCode} AND convertedAt IS NOT NULL`);
      const clicks = Number(clickRows[0]?.[0]?.cnt ?? 0);
      const conversions = Number(convRows[0]?.[0]?.cnt ?? 0);
      return { clicks, conversions, bonusEarned: conversions * 25, referredPartners: [] };
    }),
    trackClick: publicProcedure
      .input(z.object({ referralCode: z.string() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const parts = input.referralCode.split("-");
        const referrerId = parseInt(parts[parts.length - 1]) || 0;
        await (db as any).execute(
          sql`INSERT INTO referralClicks (referrerId, referralCode) VALUES (${referrerId}, ${input.referralCode})`
        );
        return { success: true };
      }),
  }),

  // -- TrustyPro: Homeowner-facing brand --
  trustyPro: router({
    // In-memory rate limit: max 5 analyzePhotos calls per IP per hour
    // Analyze uploaded photos with AI and return detected issues + matched pros
    analyzePhotos: publicProcedure
      .input(z.object({
        photoUrls: z.array(z.string().url()).min(1).max(5),
        address: z.string().optional(),
        homeownerName: z.string().optional(),
        homeownerEmail: z.string().email().optional(),
        homeownerPhone: z.string().optional(),
        userId: z.number().optional(), // passed by logged-in homeowners for auto-save
      }))
      .mutation(async ({ ctx, input }) => {
        // Rate limit: 5 requests per IP per hour
        const ip = (ctx.req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ?? ctx.req.socket?.remoteAddress ?? 'unknown';
        const now = Date.now();
        const windowMs = 60 * 60 * 1000; // 1 hour
        const maxRequests = 5;
        if (!analyzePhotosRateLimit.has(ip)) analyzePhotosRateLimit.set(ip, []);
        const timestamps = analyzePhotosRateLimit.get(ip)!.filter(t => now - t < windowMs);
        if (timestamps.length >= maxRequests) {
          throw new TRPCError({ code: 'TOO_MANY_REQUESTS', message: 'You have reached the limit of 5 photo analyses per hour. Please try again later.' });
        }
        timestamps.push(now);
        analyzePhotosRateLimit.set(ip, timestamps);
        // Per-user daily limit (15/day) for logged-in users
        if (input.userId) {
          const dayMs = 24 * 60 * 60 * 1000;
          const userTs = (analyzePhotosUserDailyLimit.get(input.userId) ?? []).filter(t => now - t < dayMs);
          if (userTs.length >= 15) {
            throw new TRPCError({ code: 'TOO_MANY_REQUESTS', message: 'Daily scan limit reached (15 per day). Please try again tomorrow.' });
          }
          userTs.push(now);
          analyzePhotosUserDailyLimit.set(input.userId, userTs);
        }
        const imageContent = input.photoUrls.map(url => ({
          type: 'image_url' as const,
          image_url: { url, detail: 'high' as const },
        }));
        const response = await invokeLLM({
          messages: [
            {
              role: 'system',
              content: `You are an elite home improvement analyst for TrustyPro, a home services platform in the DFW area. You analyze home photos with the precision of a licensed home inspector combined with the eye of an interior designer. Your job is to build a complete home profile and surface EVERY service opportunity — repairs, upgrades, maintenance, and hidden issues.

FOR EACH PHOTO, YOU MUST PROVIDE:

1. ROOM/SPACE IDENTIFICATION
   Identify exactly what space is shown. Use specific labels: Living Room, Master Bedroom, Guest Bedroom, Kids Room, Kitchen, Primary Bathroom, Guest Bathroom, Half Bath, Laundry Room, Garage, Front Yard, Backyard, Side Yard, Patio/Deck, Driveway, Roof, Attic, Basement, Crawl Space, Dining Room, Home Office, Hallway, Staircase, Pool Area, Fence Line, Shed/Workshop, Media Room, Home Gym, Mudroom, Pantry, Closet, Entryway/Foyer, or "Unknown Space" if unclear.

2. PHOTO QUALITY ASSESSMENT
   Evaluate whether the photo is usable for analysis:
   - photoQualityFlag: "ok" if clear and well-lit, "too_dark" if lighting is insufficient, "too_blurry" if out of focus or motion blur, "too_far" if subject is too distant to assess detail, "retake_needed" if any quality issue prevents accurate analysis.
   - photoQualityNote: a short, friendly instruction to the homeowner if a retake is needed (e.g. "Turn on the lights and retake this photo" or "Move closer to the floor to capture the carpet detail"). Leave empty string if quality is ok.

3. DEEP INSPECTION — Scan EVERY visible surface, fixture, and system. Look for:

   STRUCTURAL & SAFETY (urgent):
   - Foundation cracks, settling, bowing walls, uneven floors
   - Roof damage: missing/curling shingles, sagging, flashing gaps, hail dents
   - Water damage: stains on ceilings/walls, bubbling paint, warped baseboards
   - Mold/mildew: dark spots in corners, around windows, bathroom grout
   - Electrical hazards: exposed wiring, outdated panels, missing outlet covers, two-prong outlets
   - Plumbing: visible leaks, corrosion on pipes, water stains under sinks
   - Fire safety: missing smoke detectors, blocked exits, damaged fire stops
   - Pest evidence: droppings, gnaw marks, wood damage, mud tubes (termites)
   - Trip hazards: uneven walkways, loose railings, broken steps

   EXTERIOR & CURB APPEAL:
   - Siding: cracks, warping, fading, gaps, wood rot
   - Windows: foggy glass (seal failure), cracked panes, rotting frames, single-pane
   - Doors: weatherstripping gaps, alignment issues, dated entry doors
   - Gutters: sagging, missing sections, overflow stains on fascia
   - Driveway/walkways: cracks, settling, staining, spalling concrete
   - Fence: leaning posts, rotting boards, missing pickets, rusted hardware
   - Landscaping: overgrown beds, dead plants, drainage issues, bare spots
   - Exterior lighting: missing, outdated, non-functional
   - Mailbox, house numbers, garage door condition

   INTERIOR SURFACES:
   - Flooring: carpet wear/stains, scratched hardwood, cracked tile, dated linoleum
   - Walls: nail pops, cracks, scuffs, dated wallpaper, poor paint quality
   - Ceilings: popcorn texture (potential asbestos pre-1980), water rings, cracks
   - Trim/baseboards: gaps, damage, outdated style, missing crown molding
   - Doors: hollow-core, misaligned, squeaky, dated hardware

   KITCHEN SPECIFIC:
   - Countertops: laminate, tile, Formica (upgrade to quartz/granite)
   - Cabinets: dated style, peeling veneer, poor hardware, insufficient storage
   - Appliances: age, condition, energy efficiency, mismatched finishes
   - Backsplash: missing, dated, or damaged
   - Sink/faucet: staining, dripping, outdated style
   - Lighting: insufficient, dated fixtures, no under-cabinet lighting
   - Pantry organization, island potential

   BATHROOM SPECIFIC:
   - Tile: grout discoloration, cracked tiles, dated patterns
   - Fixtures: old faucets, corroded shower heads, stained tubs
   - Vanity: dated style, insufficient storage, laminate top
   - Toilet: old model (water waste), staining, loose
   - Ventilation: no exhaust fan, mold-prone areas
   - Shower: dated enclosure, no frameless glass, low water pressure signs
   - Tub: refinishing needed, conversion to walk-in shower opportunity

   SYSTEMS & EFFICIENCY:
   - HVAC: visible age of unit, dirty vents, thermostat type (upgrade to smart)
   - Water heater: visible age, type (tank vs tankless upgrade)
   - Insulation: visible gaps, old type in attic
   - Windows: single-pane (energy loss), dated frames
   - Garage door: manual vs automatic, insulation, condition
   - Air filters: visible dust buildup on vents/returns

   SMART HOME & MODERN UPGRADES:
   - No smart thermostat, smart locks, video doorbell
   - No USB outlets, no recessed lighting
   - No ceiling fans where beneficial
   - No solar panels (if roof visible)
   - No EV charger in garage
   - No whole-home water filtration
   - No security system visible

   OUTDOOR LIVING:
   - Patio: bare concrete, no cover, no outdoor kitchen
   - Pool: condition, equipment age, safety fence
   - Deck: wood condition, staining needed, railing safety
   - Pergola/shade structure potential
   - Fire pit, outdoor lighting, irrigation system

4. ISSUE CLASSIFICATION:
   - tradeType: Use specific trade categories that match real service providers:
     Roofing, HVAC, Plumbing, Electrical, Painting, Flooring, Cabinets, Countertops, Windows & Doors, Siding, Fencing, Landscaping, Concrete/Masonry, Pool Service, Pest Control, Insulation, Garage Door, Appliance Repair, General Handyman, Remodeling, Smart Home, Solar, Water Treatment, Gutters, Pressure Washing, Tree Service, Irrigation, Lighting, Closet Organization, Home Security
   - estimatedCost: Always provide a realistic DFW-area cost range like "$500-$1,500" or "$3,000-$8,000". Research-backed estimates.

CRITICAL RULES:
- NEVER return an empty issues array. Every photo of a home has at least 2-3 items to flag.
- Scan EVERY visible surface: floors, walls, ceilings, trim, fixtures, windows, doors.
- Look for what's MISSING (no backsplash, no crown molding, no smart home features) — not just what's broken.
- Cross-reference what you see with what a service professional could offer.
- For well-maintained homes, focus heavily on upgrade opportunities and modernization.
- Do NOT fabricate damage — but DO proactively surface every upgrade and improvement opportunity.
- Severity: "urgent" for safety/structural/damage; "moderate" for upgrades with strong ROI or aging systems; "low" for cosmetic or nice-to-have.
- offerTrack: "repair" for damage/maintenance/safety; "transformation" for upgrades/improvements/modernization.
- transformationPrompt: for "transformation" items, write a detailed DALL-E image generation prompt showing the beautiful finished result in a modern, clean style in the same room/space. Include specific materials, colors (warm whites, natural wood tones, brushed gold hardware), and lighting. For "repair" items, leave as empty string.
- isInsuranceClaim: true ONLY if damage clearly appears to be from storm (hail dents, wind damage, fallen trees), flood (water lines), fire, or other insurable event. False for normal wear and aging.

Return JSON only.`,
            },
            {
              role: 'user',
              content: [
                { type: 'text' as const, text: 'Analyze these home photos with extreme thoroughness. For each photo: (1) identify the room/space, (2) evaluate photo quality, (3) scan EVERY visible surface — floors, walls, ceilings, trim, fixtures, windows, doors, outlets, vents. List ALL repair issues AND upgrade opportunities. Carpet = flooring upgrade. Laminate counters = countertop upgrade. Builder-grade fixtures = fixture upgrade. No backsplash = backsplash opportunity. Dated anything = transformation opportunity. Missing smart home features = smart home upgrade. Look for what\'s broken AND what\'s missing. Every room has at least 2-3 items. Return JSON only.' },
                ...imageContent,
              ],
            },
          ],
          response_format: {
            type: 'json_schema',
            json_schema: {
              name: 'home_analysis',
              strict: true,
              schema: {
                type: 'object',
                properties: {
                  roomLabel: { type: 'string' },
                  photoQualityFlag: { type: 'string', enum: ['ok', 'too_dark', 'too_blurry', 'too_far', 'retake_needed'] },
                  photoQualityNote: { type: 'string' },
                  issues: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        severity: { type: 'string', enum: ['urgent', 'moderate', 'low'] },
                        description: { type: 'string' },
                        tradeType: { type: 'string' },
                        estimatedCost: { type: 'string' },
                        offerTrack: { type: 'string', enum: ['repair', 'transformation'] },
                        transformationPrompt: { type: 'string' },
                        isInsuranceClaim: { type: 'boolean' },
                      },
                      required: ['name', 'severity', 'description', 'tradeType', 'estimatedCost', 'offerTrack', 'transformationPrompt', 'isInsuranceClaim'],
                      additionalProperties: false,
                    },
                  },
                  overallCondition: { type: 'string', enum: ['excellent', 'good', 'fair', 'needs_attention'] },
                  summary: { type: 'string' },
                },
                required: ['roomLabel', 'photoQualityFlag', 'photoQualityNote', 'issues', 'overallCondition', 'summary'],
                additionalProperties: false,
              },
            },
          },
        });
        const content = response.choices[0]?.message?.content;
        const parsed = typeof content === 'string' ? JSON.parse(content) : content;
        // Generate AI transformation images for transformation-track issues (cap at 3 to avoid timeout)
        if (parsed?.issues && Array.isArray(parsed.issues)) {
          const { generateImage } = await import('./_core/imageGeneration');
          await Promise.allSettled(
            (parsed.issues as Array<{ offerTrack: string; transformationPrompt: string; transformationImageUrl?: string }>)
              .filter(issue => issue.offerTrack === 'transformation' && issue.transformationPrompt)
              .slice(0, 3)
              .map(async issue => {
                try {
                  const { url } = await generateImage({ prompt: issue.transformationPrompt });
                  issue.transformationImageUrl = url;
                } catch (_) {
                  // non-fatal — offer still shows without image
                }
              })
          );
        }
        // ===== AUTO-SAVE SCAN TO DB =====
        const db = await getDb();
        if (db) {
          const issues = (parsed as any)?.issues ?? [];
          const issueCount = issues.length;
          const condition = (parsed as any)?.overallCondition ?? 'unknown';
          const roomLabel = (parsed as any)?.roomLabel ?? null;
          const photoQualityFlag = (parsed as any)?.photoQualityFlag ?? null;
          // Count upgrades (transformation track items)
          const upgradeCount = issues.filter((i: any) => i.offerTrack === 'transformation').length;

          // Map AI severity to DB severity enum: urgent->critical, moderate->medium, low->low
          const mapSeverity = (aiSev: string, track: string): string => {
            if (track === 'transformation') return 'upgrade';
            const m: Record<string, string> = { urgent: 'critical', moderate: 'medium', low: 'low' };
            return m[aiSev?.toLowerCase()] ?? 'medium';
          };

          // Map tradeType to homeSystemHealth systemType enum
          const mapSystemType = (tradeType: string): string => {
            const t = (tradeType ?? '').toLowerCase();
            if (t.includes('roof')) return 'roof';
            if (t.includes('hvac') || t.includes('air conditioning') || t.includes('heating')) return 'hvac';
            if (t.includes('water heater')) return 'water_heater';
            if (t.includes('electric')) return 'electrical_panel';
            if (t.includes('plumb') || t.includes('drain')) return 'plumbing';
            if (t.includes('siding')) return 'siding';
            if (t.includes('window')) return 'windows';
            if (t.includes('fence') || t.includes('gate')) return 'fence';
            if (t.includes('driveway') || t.includes('concrete') || t.includes('pav')) return 'driveway';
            if (t.includes('pool') || t.includes('spa')) return 'pool';
            if (t.includes('gutter')) return 'gutters';
            if (t.includes('deck') || t.includes('patio')) return 'deck';
            if (t.includes('garage')) return 'garage_door';
            if (t.includes('insulation')) return 'insulation';
            if (t.includes('foundation')) return 'foundation';
            if (t.includes('solar')) return 'solar_panels';
            if (t.includes('appliance') || t.includes('kitchen') || t.includes('dishwash')) return 'appliances';
            if (t.includes('filter') || t.includes('air filter')) return 'air_filter';
            if (t.includes('floor') || t.includes('carpet') || t.includes('tile') || t.includes('hardwood')) return 'other';
            if (t.includes('paint') || t.includes('wall')) return 'siding';
            if (t.includes('landscap') || t.includes('lawn') || t.includes('tree') || t.includes('irrigation')) return 'other';
            return 'other';
          };

          // Map AI severity to homeSystemHealth condition enum
          const mapCondition = (aiSev: string, track: string): string => {
            if (track === 'transformation') return 'fair'; // upgradeable = fair condition
            const m: Record<string, string> = { urgent: 'poor', moderate: 'fair', low: 'good' };
            return m[aiSev?.toLowerCase()] ?? 'unknown';
          };

          // Map offerTrack to maintenance log serviceType
          const mapServiceType = (track: string, aiSev: string): string => {
            if (track === 'transformation') return 'installation';
            if (aiSev === 'urgent') return 'repair';
            return 'inspection';
          };

          if (input.userId) {
            // Logged-in homeowner — full pipeline
            const profileRows = await (db as any).execute(
              sql`SELECT hp.id, hp.phone, hp.displayName, u.email, u.name
                  FROM homeownerProfiles hp
                  JOIN users u ON u.id = hp.userId
                  WHERE hp.userId = ${input.userId} LIMIT 1`
            ) as any;
            const profile = profileRows[0]?.[0] ?? profileRows[0];
            const profileId = profile?.id;
            const userEmail = profile?.email ?? input.homeownerEmail ?? null;
            const userName = profile?.displayName ?? profile?.name ?? input.homeownerName ?? null;

            // Get primary property for vault linking
            let propertyId: number | null = null;
            if (profileId) {
              const propRows = await (db as any).execute(
                sql`SELECT id FROM properties WHERE ownerId = ${profileId} ORDER BY isPrimary DESC, createdAt ASC LIMIT 1`
              ) as any;
              propertyId = propRows[0]?.[0]?.id ?? propRows[0]?.id ?? null;
            }

            // 1. Save homeowner lead record
            await (db as any).execute(
              sql`INSERT INTO homeownerLeads (homeownerName, homeownerEmail, homeownerPhone, address, photoUrls, aiAnalysis, status, source) VALUES (${userName}, ${userEmail}, ${input.homeownerPhone ?? profile?.phone ?? null}, ${input.address ?? null}, ${JSON.stringify(input.photoUrls)}, ${JSON.stringify(parsed)}, 'new', 'trustypro_dashboard')`
            ).catch(() => null);

            // 2. Auto-create scan history record
            await (db as any).execute(
              sql`INSERT INTO homeownerScanHistory (homeownerProfileId, homeownerEmail, propertyId, roomLabel, photoUrls, analysisJson, overallCondition, issueCount, upgradeCount, photoQualityFlag) VALUES (${profileId ?? null}, ${userEmail}, ${propertyId}, ${roomLabel}, ${JSON.stringify(input.photoUrls)}, ${JSON.stringify(parsed)}, ${condition}, ${issueCount}, ${upgradeCount}, ${photoQualityFlag})`
            ).catch(() => null);

            // 3. Auto-populate vault: create/update homeSystemHealth entries + maintenance logs
            if (profileId && propertyId && Array.isArray(issues)) {
              for (const issue of issues as Array<{ name: string; severity: string; description: string; tradeType: string; estimatedCost: string; offerTrack: string; isInsuranceClaim?: boolean }>) {
                const systemType = mapSystemType(issue.tradeType);
                const conditionVal = mapCondition(issue.severity, issue.offerTrack);
                const condScore: Record<string, number> = { excellent: 95, good: 75, fair: 50, poor: 25, critical: 10, unknown: 60 };
                const healthScore = condScore[conditionVal] ?? 60;

                // Upsert system health entry (create if doesn't exist for this property+systemType)
                const existingSystem = await (db as any).execute(
                  sql`SELECT id FROM homeSystemHealth WHERE propertyId = ${propertyId} AND systemType = ${systemType} LIMIT 1`
                ).catch(() => [[]] as any) as any;
                let systemHealthId = existingSystem[0]?.[0]?.id ?? existingSystem[0]?.id ?? null;

                if (!systemHealthId) {
                  // Create new system health entry
                  const costStr = String(issue.estimatedCost ?? '');
                  const nums = costStr.replace(/[^0-9.,-]/g, '').split(/[-,]/).map(Number).filter(n => n > 0);
                  const costLow = nums[0] ?? null;
                  const costHigh = nums[1] ?? nums[0] ?? null;
                  const insertResult = await (db as any).execute(
                    sql`INSERT INTO homeSystemHealth (propertyId, systemType, systemLabel, \`condition\`, conditionNotes, healthScore, aiAssessedAt, aiConditionNotes, estimatedReplacementCostLow, estimatedReplacementCostHigh, photoUrls) VALUES (${propertyId}, ${systemType}, ${issue.name}, ${conditionVal}, ${issue.description}, ${healthScore}, NOW(), ${`AI scan detected: ${issue.description}. Room: ${roomLabel ?? 'Unknown'}.`}, ${costLow}, ${costHigh}, ${JSON.stringify(input.photoUrls)})`
                  ).catch(() => [{ insertId: null }]) as any;
                  systemHealthId = insertResult[0]?.insertId ?? insertResult?.insertId ?? null;
                } else {
                  // Update existing system health if AI found worse condition
                  await (db as any).execute(
                    sql`UPDATE homeSystemHealth SET \`condition\` = IF(healthScore > ${healthScore}, ${conditionVal}, \`condition\`), healthScore = LEAST(healthScore, ${healthScore}), aiAssessedAt = NOW(), aiConditionNotes = ${`AI scan: ${issue.description}. Room: ${roomLabel ?? 'Unknown'}.`}, photoUrls = ${JSON.stringify(input.photoUrls)} WHERE id = ${systemHealthId}`
                  ).catch(() => null);
                }

                // Create maintenance log entry with correct columns
                if (systemHealthId) {
                  const serviceType = mapServiceType(issue.offerTrack, issue.severity);
                  await (db as any).execute(
                    sql`INSERT INTO homeMaintenanceLogs (propertyId, systemHealthId, systemType, serviceType, serviceDescription, servicedBy, servicedAt, conditionAfter, notes) VALUES (${propertyId}, ${systemHealthId}, ${systemType}, ${serviceType}, ${issue.description}, ${'TrustyPro AI Scan'}, NOW(), ${conditionVal}, ${`Estimated: ${issue.estimatedCost}. Room: ${roomLabel ?? 'Unknown'}. Detected by AI scan. Track: ${issue.offerTrack}.`})`
                  ).catch(() => null);
                }
              }
            }

            // 4. Auto-create scan offer cards for each issue
            for (const issue of issues as Array<{ name: string; severity: string; description: string; tradeType: string; estimatedCost: string; offerTrack: string; transformationPrompt?: string; transformationImageUrl?: string; isInsuranceClaim?: boolean }>) {
              const costStr = String(issue.estimatedCost ?? '');
              const nums = costStr.replace(/[^0-9.,-]/g, '').split(/[-,]/).map(Number).filter(n => n > 0);
              const low = nums[0] ?? null;
              const high = nums[1] ?? nums[0] ?? null;
              const sev = mapSeverity(issue.severity, issue.offerTrack);
              await (db as any).execute(
                sql`INSERT INTO homeownerScanOffers (homeownerProfileId, homeownerEmail, propertyId, roomLabel, issueType, issueCategory, issueDescription, severity, estimatedCostLow, estimatedCostHigh, photoUrl, status, source, offerTrack, transformationImageUrl, transformationPrompt, isInsuranceClaim) VALUES (${profileId ?? null}, ${userEmail}, ${propertyId}, ${roomLabel}, ${issue.name ?? 'Home Improvement'}, ${issue.tradeType ?? 'General'}, ${issue.description ?? ''}, ${sev}, ${low}, ${high}, ${input.photoUrls?.[0] ?? null}, 'new', 'ai_scan', ${issue.offerTrack ?? 'repair'}, ${issue.transformationImageUrl ?? null}, ${issue.transformationPrompt ?? null}, ${issue.isInsuranceClaim ? 1 : 0})`
              ).catch(() => null);
            }

            // 5. Auto-create customerDeals from scan results for partner matching
            // Only create deals for high-value or urgent items that warrant partner involvement
            const dealableIssues = issues.filter((i: any) => {
              const costStr = String(i.estimatedCost ?? '');
              const nums = costStr.replace(/[^0-9.,-]/g, '').split(/[-,]/).map(Number).filter(n => n > 0);
              const maxCost = Math.max(...nums, 0);
              return i.severity === 'urgent' || maxCost >= 200;
            });

            // Extract zip code from address for auto-match routing
            const addressZip = (input.address ?? '').match(/\b(\d{5})\b/)?.[1] ?? null;

            for (const issue of dealableIssues as Array<{ name: string; severity: string; description: string; tradeType: string; estimatedCost: string; offerTrack: string; isInsuranceClaim?: boolean }>) {
              const costStr = String(issue.estimatedCost ?? '');
              const nums = costStr.replace(/[^0-9.,-]/g, '').split(/[-,]/).map(Number).filter(n => n > 0);
              const low = nums[0] ?? null;
              const high = nums[1] ?? nums[0] ?? null;
              const token = Math.random().toString(36).slice(2) + Date.now().toString(36) + Math.random().toString(36).slice(2);
              const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days for scan-generated deals
              const confScore = issue.severity === 'urgent' ? 90 : issue.severity === 'moderate' ? 70 : 50;

              // Auto-match routing: find best partner by trade + zip code
              let matchedPartnerId = 0;
              if (addressZip && issue.tradeType) {
                try {
                  const matchRows = await (db as any).execute(
                    sql`SELECT p.id FROM partners p
                        WHERE p.status = 'approved'
                          AND JSON_CONTAINS(p.serviceCategories, ${JSON.stringify(issue.tradeType)})
                          AND (p.serviceZipCodes IS NULL OR JSON_CONTAINS(p.serviceZipCodes, ${JSON.stringify(addressZip)}))
                        ORDER BY
                          CASE p.tier WHEN 'enterprise' THEN 5 WHEN 'company' THEN 4 WHEN 'crew' THEN 3 WHEN 'pro' THEN 2 ELSE 1 END DESC,
                          p.responseRate DESC
                        LIMIT 1`
                  ) as any;
                  const matched = (matchRows.rows || matchRows)[0];
                  if (matched?.id) matchedPartnerId = matched.id;
                } catch (_e) { /* auto-match is best-effort */ }
              }

              await (db as any).execute(
                sql`INSERT INTO customerDeals (token, opportunityId, referringPartnerId, homeownerName, homeownerEmail, homeownerAddress, issueType, issueCategory, issueDescription, issueDescriptionShort, photoUrl, aiConfidence, estimatedValueLow, estimatedValueHigh, status, expiresAt) VALUES (${token}, 0, ${matchedPartnerId}, ${userName}, ${userEmail}, ${input.address ?? null}, ${issue.name}, ${issue.tradeType ?? 'General'}, ${issue.description}, ${(issue.name ?? '').slice(0, 100)}, ${input.photoUrls?.[0] ?? null}, ${confScore}, ${low}, ${high}, 'draft', ${expiresAt})`
              ).catch(() => null);
            }

            await notifyOwner({
              title: '\uD83C\uDFE0 Dashboard Scan Completed',
              content: `Logged-in homeowner (userId: ${input.userId}, ${userName ?? 'unknown'}) scanned ${roomLabel ?? 'their home'} at ${input.address ?? 'unknown'}. Condition: ${condition}. Issues: ${issueCount}. Upgrades: ${upgradeCount}. Deals created: ${dealableIssues.length}.`
            }).catch(() => null);

          } else if (input.homeownerEmail || input.homeownerPhone) {
            // Public scan with contact info — save lead + scan offers for when they sign up
            await (db as any).execute(
              sql`INSERT INTO homeownerLeads (homeownerName, homeownerEmail, homeownerPhone, address, photoUrls, aiAnalysis, status, source) VALUES (${input.homeownerName ?? null}, ${input.homeownerEmail ?? null}, ${input.homeownerPhone ?? null}, ${input.address ?? null}, ${JSON.stringify(input.photoUrls)}, ${JSON.stringify(parsed)}, 'new', 'trustypro_scan')`
            ).catch(() => null);

            // Create scan offers even for non-logged-in users (linked by email)
            for (const issue of issues as Array<{ name: string; severity: string; description: string; tradeType: string; estimatedCost: string; offerTrack: string; transformationPrompt?: string; transformationImageUrl?: string; isInsuranceClaim?: boolean }>) {
              const costStr = String(issue.estimatedCost ?? '');
              const nums = costStr.replace(/[^0-9.,-]/g, '').split(/[-,]/).map(Number).filter(n => n > 0);
              const low = nums[0] ?? null;
              const high = nums[1] ?? nums[0] ?? null;
              const sev = mapSeverity(issue.severity, issue.offerTrack);
              await (db as any).execute(
                sql`INSERT INTO homeownerScanOffers (homeownerProfileId, homeownerEmail, roomLabel, issueType, issueCategory, issueDescription, severity, estimatedCostLow, estimatedCostHigh, photoUrl, status, source, offerTrack, transformationImageUrl, transformationPrompt, isInsuranceClaim) VALUES (${null}, ${input.homeownerEmail ?? null}, ${roomLabel}, ${issue.name ?? 'Home Improvement'}, ${issue.tradeType ?? 'General'}, ${issue.description ?? ''}, ${sev}, ${low}, ${high}, ${input.photoUrls?.[0] ?? null}, 'new', 'ai_scan', ${issue.offerTrack ?? 'repair'}, ${issue.transformationImageUrl ?? null}, ${issue.transformationPrompt ?? null}, ${issue.isInsuranceClaim ? 1 : 0})`
              ).catch(() => null);
            }

            // Also create scan history for email-linked retrieval
            await (db as any).execute(
              sql`INSERT INTO homeownerScanHistory (homeownerProfileId, homeownerEmail, roomLabel, photoUrls, analysisJson, overallCondition, issueCount, upgradeCount, photoQualityFlag) VALUES (${null}, ${input.homeownerEmail ?? null}, ${roomLabel}, ${JSON.stringify(input.photoUrls)}, ${JSON.stringify(parsed)}, ${condition}, ${issueCount}, ${upgradeCount}, ${photoQualityFlag})`
            ).catch(() => null);

            // Bridge: auto-add to homeWaitlist so every scan lead counts towards growth goal
            if (input.homeownerEmail) {
              const nameParts = (input.homeownerName || '').split(' ');
              const firstName = nameParts[0] || null;
              const lastName = nameParts.slice(1).join(' ') || null;
              await (db as any).execute(
                sql`INSERT IGNORE INTO homeWaitlist (firstName, lastName, email, phone, address, primaryPainPoint, hearAboutUs, status, source)
                    VALUES (${firstName}, ${lastName}, ${input.homeownerEmail}, ${input.homeownerPhone ?? null}, ${input.address ?? null}, ${'AI scan completed'}, ${'trustypro_scan'}, ${'pending'}, ${'trustypro_scan'})`
              ).catch(() => null);
            }

            await notifyOwner({
              title: '\uD83C\uDFE0 New TrustyPro AI Scan Lead',
              content: `${input.homeownerName ?? 'A homeowner'} (${input.homeownerEmail ?? input.homeownerPhone ?? 'no contact'}) completed an AI home scan at ${input.address ?? 'unknown'}. Condition: ${condition}. Issues: ${issueCount}. Upgrades: ${upgradeCount}. Check admin panel.`
            }).catch(() => null);
          }
        }
        return { ...parsed, photoUrls: input.photoUrls };
      }),

    // Submit a service request from TrustyPro (homeowner wants a pro)
    submitRequest: publicProcedure
      .input(z.object({
        name: z.string().min(2),
        email: z.string().email(),
        phone: z.string().optional(),
        address: z.string().min(5),
        serviceType: z.string().min(2),
        description: z.string().min(10),
        urgency: z.enum(['urgent', 'moderate', 'low']),
        photoUrls: z.array(z.string()).optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
        await (db as any).execute(
          sql`INSERT INTO homeownerLeads (homeownerName, homeownerEmail, homeownerPhone, address, photoUrls, status, source) VALUES (${input.name}, ${input.email}, ${input.phone ?? null}, ${input.address}, ${JSON.stringify(input.photoUrls ?? [])}, 'new', 'trustypro_request')`
        );
        // Bridge: auto-add to homeWaitlist so every request counts towards growth goal
        const nameParts = input.name.split(' ');
        await (db as any).execute(
          sql`INSERT IGNORE INTO homeWaitlist (firstName, lastName, email, phone, address, primaryPainPoint, hearAboutUs, status, source)
              VALUES (${nameParts[0] || null}, ${nameParts.slice(1).join(' ') || null}, ${input.email}, ${input.phone ?? null}, ${input.address}, ${input.serviceType}, ${'trustypro_request'}, ${'pending'}, ${'trustypro_request'})`
        ).catch(() => null);
        // Notify owner
        await notifyOwner({
          title: `New TrustyPro Lead: ${input.serviceType}`,
          content: `${input.name} (${input.email}) at ${input.address} needs ${input.serviceType}. Urgency: ${input.urgency}. Message: ${input.description}`,
        });
        // Get position for confirmation
        const leadCountResult = await (db as any).execute(sql`SELECT COUNT(*) as cnt FROM homeownerLeads`);
        const leadPosition = Number((leadCountResult?.rows?.[0] as any)?.cnt ?? 1);
        return { success: true, position: leadPosition };
      }),

    // Admin: get all TrustyPro leads
    getLeads: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return [];
      const rows = await (db as any).execute(
        sql`SELECT id, homeownerName as name, homeownerEmail as email, homeownerPhone as phone, address, city, zipCode, photoUrls, aiAnalysis, detectedServices, matchedPartnerId, opportunityId, source, status, notes, createdAt, updatedAt FROM homeownerLeads ORDER BY createdAt DESC LIMIT 200`
      );
      return (rows[0] || []) as Array<{
        id: number; name: string | null; email: string | null; phone: string | null;
        address: string | null; city: string | null; zipCode: string | null;
        photoUrls: string | null; aiAnalysis: string | null; detectedServices: string | null;
        matchedPartnerId: number | null; opportunityId: number | null;
        status: string; source: string | null; notes: string | null; createdAt: Date;
      }>;
    }),
    updateLeadStatus: adminProcedure
      .input(z.object({
        leadId: z.number(),
        status: z.enum(['new', 'analyzing', 'matched', 'contacted', 'closed', 'lost']),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
        await (db as any).execute(
          sql`UPDATE homeownerLeads SET status = ${input.status}, notes = ${input.notes ?? null}, updatedAt = NOW() WHERE id = ${input.leadId}`
        );
        return { success: true };
      }),
    routeLeadToPartner: adminProcedure
      .input(z.object({
        leadId: z.number(),
        partnerId: z.number(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
        const leadRows = await (db as any).execute(
          sql`SELECT id, homeownerName, address FROM homeownerLeads WHERE id = ${input.leadId}`
        );
        const lead = (leadRows[0] || [])[0];
        if (!lead) throw new TRPCError({ code: 'NOT_FOUND', message: 'Lead not found' });
        const partnerRows = await (db as any).execute(
          sql`SELECT id, businessName FROM partners WHERE id = ${input.partnerId} AND status = 'approved'`
        );
        const partner = (partnerRows[0] || [])[0];
        if (!partner) throw new TRPCError({ code: 'NOT_FOUND', message: 'Partner not found or not approved' });
        await (db as any).execute(
          sql`UPDATE homeownerLeads SET matchedPartnerId = ${input.partnerId}, status = 'matched', updatedAt = NOW() WHERE id = ${input.leadId}`
        );
        await createPartnerNotification({
          partnerId: input.partnerId,
          type: 'new_lead',
          title: 'New Lead Assigned',
          message: `You have a new homeowner lead from TrustyPro. Address: ${lead.address ?? 'On file'}. Contact them to schedule a visit.`,
          actionUrl: '/dashboard/leads',
        });
        await notifyOwner({
          title: `Lead Routed: ${partner.businessName}`,
          content: `TrustyPro lead #${input.leadId} routed to ${partner.businessName} (ID: ${input.partnerId}).`,
        });
        return { success: true, partnerName: partner.businessName };
      }),

    // Public: join TrustyPro homeowner waitlist
    getPublicFlags: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) return { homeownerSignupOpen: false, trustyProLive: false };
      const rows = await (db as any).execute(sql`SELECT \`key\`, value FROM systemSettings WHERE \`key\` IN ('homeownerSignupOpen', 'trustyProLive')`);
      const settings: Record<string, string> = {};
      for (const row of (rows[0] as any[])) settings[row.key] = row.value;
      return {
        homeownerSignupOpen: settings.homeownerSignupOpen === 'true',
        trustyProLive: settings.trustyProLive === 'true',
      };
    }),

    joinWaitlist: publicProcedure
      .input(z.object({
        email: z.string().email(),
        name: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
        // Upsert into homeownerLeads as a waitlist entry
        await (db as any).execute(
          sql`INSERT INTO homeownerLeads (homeownerEmail, homeownerName, address, source, status, createdAt, updatedAt)
              VALUES (${input.email}, ${input.name ?? null}, 'TrustyPro Waitlist', 'trustypro-waitlist', 'new', NOW(), NOW())
              ON DUPLICATE KEY UPDATE updatedAt = NOW()`
        );
        await notifyOwner({
          title: 'New TrustyPro Waitlist Signup',
          content: `${input.name ?? 'Someone'} (${input.email}) joined the TrustyPro waitlist.`,
        });
        return { success: true };
      }),

    // AI: Improve project description for better AI photo analysis results
    improveDescription: publicProcedure
      .input(z.object({
        description: z.string().min(1).max(2000),
        projectType: z.string().optional(),
        category: z.string().optional(),
        photoCount: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const context = [
          input.projectType ? `Project type: ${input.projectType}` : '',
          input.category ? `Service category: ${input.category}` : '',
          input.photoCount ? `Number of photos uploaded: ${input.photoCount}` : '',
        ].filter(Boolean).join('. ');

        const response = await invokeLLM({
          messages: [
            {
              role: 'system',
              content: `You are an AI assistant helping homeowners write better project descriptions for TrustyPro, a home services platform. Your job is to improve their description so it gives the AI photo analysis system and service professionals the clearest possible picture of the problem.

Good descriptions include:
- Specific location in the home (e.g., "master bathroom", "back fence along the east side", "kitchen under the sink")
- When the problem started or was noticed
- What they've already tried or done
- Specific symptoms (e.g., "dripping sound at night", "brown stain on ceiling", "door won't latch")
- Any relevant history (e.g., "had this repaired 2 years ago", "started after the last storm")
- What outcome they want (repair, replacement, quote, inspection)

Return a JSON object with:
- improvedDescription: the rewritten description (2-4 sentences, clear and specific)
- tips: array of 2-3 short tips for what photos to take to get the best AI analysis
- missingInfo: array of 1-3 questions to ask the homeowner if key info is missing (empty array if description is complete)
- qualityScore: number 1-10 rating the original description quality`,
            },
            {
              role: 'user',
              content: `Here is the homeowner's project description. ${context}\n\nDescription: "${input.description}"\n\nPlease improve it and provide photo tips.`,
            },
          ],
          response_format: {
            type: 'json_schema',
            json_schema: {
              name: 'description_improvement',
              strict: true,
              schema: {
                type: 'object',
                properties: {
                  improvedDescription: { type: 'string' },
                  tips: { type: 'array', items: { type: 'string' } },
                  missingInfo: { type: 'array', items: { type: 'string' } },
                  qualityScore: { type: 'number' },
                },
                required: ['improvedDescription', 'tips', 'missingInfo', 'qualityScore'],
                additionalProperties: false,
              },
            },
          },
        });

        const raw = response.choices?.[0]?.message?.content;
        if (!raw) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'AI did not respond' });
        const content = typeof raw === 'string' ? raw : JSON.stringify(raw);
        try {
          return JSON.parse(content) as {
            improvedDescription: string;
            tips: string[];
            missingInfo: string[];
            qualityScore: number;
          };
        } catch {
          throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Failed to parse AI response' });
        }
      }),
  }),

  activityLog: router({
    getRecent: adminProcedure
      .input(z.object({
        limit: z.number().min(1).max(200).default(100),
        eventType: z.string().optional(),
        actorRole: z.enum(["admin", "partner", "homeowner", "system"]).optional(),
      }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const rows = await (db as any).execute(
          sql`SELECT * FROM activityLog ORDER BY createdAt DESC LIMIT ${input.limit}`
        );
        let results = rows[0] as Array<{
          id: number; eventType: string; actorId: number | null; actorName: string | null;
          actorRole: string; entityType: string | null; entityId: number | null;
          entityName: string | null; description: string; metadata: unknown;
          ipAddress: string | null; createdAt: Date;
        }>;
        if (input.eventType) results = results.filter(r => r.eventType === input.eventType);
        if (input.actorRole) results = results.filter(r => r.actorRole === input.actorRole);
        return results;
      }),
    getEventTypes: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
      const rows = await (db as any).execute(sql`SELECT DISTINCT eventType, COUNT(*) as cnt FROM activityLog GROUP BY eventType ORDER BY cnt DESC`);
      return (rows[0] as Array<{ eventType: string; cnt: number }>).map(r => ({ eventType: r.eventType, count: Number(r.cnt) }));
    }),
    logEvent: protectedProcedure
      .input(z.object({
        eventType: z.string(),
        entityType: z.string().optional(),
        entityId: z.number().optional(),
        entityName: z.string().optional(),
        description: z.string(),
        metadata: z.record(z.string(), z.unknown()).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        await (db as any).execute(
          sql`INSERT INTO activityLog (eventType, actorId, actorName, actorRole, entityType, entityId, entityName, description, metadata) VALUES (${input.eventType}, ${ctx.user.id}, ${ctx.user.name ?? null}, ${ctx.user.role}, ${input.entityType ?? null}, ${input.entityId ?? null}, ${input.entityName ?? null}, ${input.description}, ${input.metadata ? JSON.stringify(input.metadata) : null})`
        );
        return { success: true };
      }),
  }),

  // -- Compliance & Strike System --
  compliance: router({
    issueStrike: adminProcedure
      .input(z.object({ partnerId: z.number(), reason: z.string().min(5).max(500) }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const rows = await (db as any).execute(sql`SELECT strikeCount FROM partners WHERE id = ${input.partnerId}`);
        const current = Number((rows[0] as any[])[0]?.strikeCount ?? 0);
        const newCount = current + 1;
        const now = new Date();
        const adminName = ctx.user.name ?? ctx.user.email ?? 'Admin';
        if (newCount >= 3) {
          await (db as any).execute(sql`UPDATE partners SET strikeCount = ${newCount}, lastStrikeAt = ${now}, lastStrikeReason = ${input.reason}, suspendedAt = ${now}, suspensionReason = ${'3 strikes: ' + input.reason}, status = 'rejected', updatedAt = ${now} WHERE id = ${input.partnerId}`);
          await (db as any).execute(sql`INSERT INTO complianceEvents (partnerId, eventType, reason, adminUserId, adminName, createdAt) VALUES (${input.partnerId}, 'suspension', ${input.reason + ' (3rd strike — auto-suspended)'}, ${ctx.user.id}, ${adminName}, ${now})`);
          return { newCount, suspended: true };
        }
        await (db as any).execute(sql`UPDATE partners SET strikeCount = ${newCount}, lastStrikeAt = ${now}, lastStrikeReason = ${input.reason}, updatedAt = ${now} WHERE id = ${input.partnerId}`);
        await (db as any).execute(sql`INSERT INTO complianceEvents (partnerId, eventType, reason, adminUserId, adminName, createdAt) VALUES (${input.partnerId}, 'strike_issued', ${input.reason}, ${ctx.user.id}, ${adminName}, ${now})`);
        // Fire n8n workflow for strike issued
        n8n.partnerStrikeIssued({ partnerId: input.partnerId, partnerName: String(input.partnerId), email: '', strikeNumber: newCount, reason: input.reason, issuedByAdminId: ctx.user.id }).catch(() => {});
        return { newCount, suspended: false };
      }),
    clearStrike: adminProcedure
      .input(z.object({ partnerId: z.number(), resolutionNote: z.string().optional() }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const rows = await (db as any).execute(sql`SELECT strikeCount FROM partners WHERE id = ${input.partnerId}`);
        const current = Number((rows[0] as any[])[0]?.strikeCount ?? 0);
        const newCount = Math.max(0, current - 1);
        const adminName = ctx.user.name ?? ctx.user.email ?? 'Admin';
        await (db as any).execute(sql`UPDATE partners SET strikeCount = ${newCount}, updatedAt = ${new Date()} WHERE id = ${input.partnerId}`);
        await (db as any).execute(sql`INSERT INTO complianceEvents (partnerId, eventType, reason, adminUserId, adminName, resolutionNote, resolvedAt, createdAt) VALUES (${input.partnerId}, 'strike_resolved', ${'Strike cleared by admin'}, ${ctx.user.id}, ${adminName}, ${input.resolutionNote ?? null}, ${new Date()}, ${new Date()})`);
        return { newCount };
      }),
    unsuspend: adminProcedure
      .input(z.object({ partnerId: z.number(), resolutionNote: z.string().optional() }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const adminName = ctx.user.name ?? ctx.user.email ?? 'Admin';
        await (db as any).execute(sql`UPDATE partners SET suspendedAt = NULL, suspensionReason = NULL, strikeCount = 0, status = 'approved', updatedAt = ${new Date()} WHERE id = ${input.partnerId}`);
        await (db as any).execute(sql`INSERT INTO complianceEvents (partnerId, eventType, reason, adminUserId, adminName, resolutionNote, resolvedAt, createdAt) VALUES (${input.partnerId}, 'reinstatement', ${'Partner reinstated by admin'}, ${ctx.user.id}, ${adminName}, ${input.resolutionNote ?? null}, ${new Date()}, ${new Date()})`);
        return { success: true };
      }),
    uploadCoi: protectedProcedure
      .input(z.object({ coiUrl: z.string().url(), expiresAt: z.number() }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        await (db as any).execute(sql`UPDATE partners SET coiUrl = ${input.coiUrl}, coiExpiresAt = ${new Date(input.expiresAt)}, coiVerifiedAt = NULL, updatedAt = ${new Date()} WHERE userId = ${ctx.user.id}`);
        return { success: true };
      }),
    uploadLicense: protectedProcedure
      .input(z.object({ licenseNumber: z.string().min(1).max(100), licenseUrl: z.string().url() }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        await (db as any).execute(sql`UPDATE partners SET licenseNumber = ${input.licenseNumber}, licenseUrl = ${input.licenseUrl}, licenseVerifiedAt = NULL, updatedAt = ${new Date()} WHERE userId = ${ctx.user.id}`);
        return { success: true };
      }),
    verifyCoi: adminProcedure
      .input(z.object({ partnerId: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        await (db as any).execute(sql`UPDATE partners SET coiVerifiedAt = ${new Date()}, updatedAt = ${new Date()} WHERE id = ${input.partnerId}`);
        return { success: true };
      }),
    verifyLicense: adminProcedure
      .input(z.object({ partnerId: z.number() }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        await (db as any).execute(sql`UPDATE partners SET licenseVerifiedAt = ${new Date()}, updatedAt = ${new Date()} WHERE id = ${input.partnerId}`);
        return { success: true };
      }),
    requestDataExport: protectedProcedure
      .mutation(async ({ ctx }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        await (db as any).execute(sql`UPDATE partners SET dataExportRequestedAt = ${new Date()}, updatedAt = ${new Date()} WHERE userId = ${ctx.user.id}`);
        await notifyOwner({ title: 'CCPA Data Export Request', content: `User ${ctx.user.id} (${ctx.user.email ?? 'unknown'}) requested data export. Fulfill within 30 days.` });
        return { success: true };
      }),
    requestDataDeletion: protectedProcedure
      .mutation(async ({ ctx }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        await (db as any).execute(sql`UPDATE partners SET dataDeleteRequestedAt = ${new Date()}, updatedAt = ${new Date()} WHERE userId = ${ctx.user.id}`);
        await notifyOwner({ title: 'CCPA Data Deletion Request', content: `User ${ctx.user.id} (${ctx.user.email ?? 'unknown'}) requested data deletion. Fulfill within 45 days.` });
        return { success: true };
      }),
    getInactivePartners: adminProcedure
      .input(z.object({ inactiveDays: z.number().default(30) }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const cutoff = new Date(Date.now() - input.inactiveDays * 86400000);
        const rows = await (db as any).execute(sql`SELECT id, businessName, contactEmail, contactPhone, jobsLogged, lastActiveAt, createdAt FROM partners WHERE status = 'approved' AND (lastActiveAt IS NULL OR lastActiveAt < ${cutoff}) ORDER BY lastActiveAt ASC LIMIT 500`);
        return (rows[0] as any[]);
      }),
    getComplianceOverview: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
      const rows = await (db as any).execute(sql`SELECT SUM(CASE WHEN strikeCount >= 1 THEN 1 ELSE 0 END) as partnersWithStrikes, SUM(CASE WHEN suspendedAt IS NOT NULL THEN 1 ELSE 0 END) as suspended, SUM(CASE WHEN coiVerifiedAt IS NOT NULL THEN 1 ELSE 0 END) as coiVerified, SUM(CASE WHEN licenseVerifiedAt IS NOT NULL THEN 1 ELSE 0 END) as licenseVerified, SUM(CASE WHEN dataExportRequestedAt IS NOT NULL THEN 1 ELSE 0 END) as pendingDataExports, COUNT(*) as total FROM partners WHERE status = 'approved'`);
      return (rows[0] as any[])[0] ?? {};
    }),
    getAuditLog: adminProcedure
      .input(z.object({ partnerId: z.number().optional(), limit: z.number().default(100) }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        let rows;
        if (input.partnerId) {
          rows = await (db as any).execute(
            sql`SELECT ce.*, p.businessName FROM complianceEvents ce LEFT JOIN partners p ON ce.partnerId = p.id WHERE ce.partnerId = ${input.partnerId} ORDER BY ce.createdAt DESC LIMIT ${input.limit}`
          );
        } else {
          rows = await (db as any).execute(
            sql`SELECT ce.*, p.businessName FROM complianceEvents ce LEFT JOIN partners p ON ce.partnerId = p.id ORDER BY ce.createdAt DESC LIMIT ${input.limit}`
          );
        }
        return (rows[0] as any[]) ?? [];
      }),
    addNote: adminProcedure
      .input(z.object({ partnerId: z.number(), note: z.string().min(5).max(1000) }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const adminName = ctx.user.name ?? ctx.user.email ?? 'Admin';
        await (db as any).execute(
          sql`INSERT INTO complianceEvents (partnerId, eventType, reason, adminUserId, adminName, createdAt) VALUES (${input.partnerId}, 'note', ${input.note}, ${ctx.user.id}, ${adminName}, ${new Date()})`
        );
        return { success: true };
      }),
    getPartnerReport: adminProcedure
      .input(z.object({ partnerId: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const partner = await getPartnerById(input.partnerId);
        if (!partner) throw new TRPCError({ code: 'NOT_FOUND', message: 'Partner not found' });
        const stats = await getPartnerStats(input.partnerId);
        const earnedCommissions = await getEarnedCommissionsByPartnerId(input.partnerId);
        const reviewRows = await (db as any).execute(
          sql`SELECT id, rating, ratingPunctuality, ratingQuality, ratingCommunication, ratingValue, reviewText, serviceType, createdAt FROM partnerReviews WHERE partnerId = ${input.partnerId} AND flagged = false ORDER BY createdAt DESC LIMIT 20`
        );
        const reviews = (reviewRows[0] as any[]) ?? [];
        const jobRows = await (db as any).execute(
          sql`SELECT id, serviceAddress, serviceType, status, createdAt FROM jobs WHERE partnerId = ${input.partnerId} ORDER BY createdAt DESC LIMIT 50`
        );
        const recentJobs = (jobRows[0] as any[]) ?? [];
        return { partner, stats, earnedCommissions, reviews, recentJobs };
      }),
  }),

  // -- Messaging --
  messaging: router({
    getMyThreads: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
      const rows = await (db as any).execute(
        sql`SELECT m.thread_id as threadId, m.body, m.created_at as createdAt, m.sender_type as senderType,
            m.is_read as isRead, m.partner_id as partnerId, p.businessName, p.serviceCategory
            FROM messages m
            LEFT JOIN partners p ON m.partner_id = p.id
            WHERE m.homeowner_email = ${ctx.user.email ?? ''}
            ORDER BY m.created_at DESC`
      );
      const threads = new Map<string, any>();
      for (const row of (rows[0] as any[])) {
        if (!threads.has(row.threadId)) threads.set(row.threadId, row);
      }
      return Array.from(threads.values());
    }),
    getThread: protectedProcedure
      .input(z.object({ threadId: z.string() }))
      .query(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const rows = await (db as any).execute(
          sql`SELECT * FROM messages WHERE thread_id = ${input.threadId} ORDER BY created_at ASC`
        );
        await (db as any).execute(
          sql`UPDATE messages SET is_read = 1 WHERE thread_id = ${input.threadId} AND recipient_user_id = ${ctx.user.id}`
        );
        return (rows[0] as any[]);
      }),
    sendMessage: protectedProcedure
      .input(z.object({
        threadId: z.string(),
        recipientUserId: z.number(),
        partnerId: z.number().optional(),
        body: z.string().min(1).max(2000),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const now = Date.now();
        await (db as any).execute(
          sql`INSERT INTO messages (thread_id, sender_type, sender_user_id, recipient_user_id, homeowner_email, partner_id, body, is_read, created_at)
              VALUES (${input.threadId}, 'homeowner', ${ctx.user.id}, ${input.recipientUserId}, ${ctx.user.email ?? ''}, ${input.partnerId ?? null}, ${input.body}, 0, ${now})`
        );
        return { success: true };
      }),
    getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
      const rows = await (db as any).execute(
        sql`SELECT COUNT(*) as cnt FROM messages WHERE recipient_user_id = ${ctx.user.id} AND is_read = 0`
      );
      return { count: Number((rows[0] as any[])[0]?.cnt ?? 0) };
    }),
  }),

  // ── Waitlist (ProLnk Pros + TrustyPro Homeowners) ─────────────────────────────
  ...waitlistRouter.createCaller({} as any),
  waitlistAdmin: router({
    // Merge hardened admin router queries + custom mutations
    ...waitlistAdminRouter.createCaller({} as any),

    // --- Admin: update status ---
    updateProStatus: adminProcedure
      .input(z.object({ id: z.number().int(), status: z.enum(['pending','approved','rejected','invited']), adminNotes: z.string().max(1000).optional() }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const now = new Date();
        await (db as any).execute(
          sql`UPDATE proWaitlist SET status = ${input.status}, adminNotes = ${input.adminNotes ?? null}, approvedAt = ${input.status === 'approved' ? now : null}, approvedBy = ${input.status === 'approved' ? ctx.user.id : null}, invitedAt = ${input.status === 'invited' ? now : null}, updatedAt = ${now} WHERE id = ${input.id}`
        );
        return { success: true };
      }),

    updateHomeStatus: adminProcedure
      .input(z.object({ id: z.number().int(), status: z.enum(['pending','approved','rejected','invited']), adminNotes: z.string().max(1000).optional() }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const now = new Date();
        await (db as any).execute(
          sql`UPDATE homeWaitlist SET status = ${input.status}, adminNotes = ${input.adminNotes ?? null}, approvedAt = ${input.status === 'approved' ? now : null}, approvedBy = ${input.status === 'approved' ? ctx.user.id : null}, invitedAt = ${input.status === 'invited' ? now : null}, updatedAt = ${now} WHERE id = ${input.id}`
        );
        return { success: true };
      }),

    // --- Admin: bulk approve all pending ---
    bulkApproveAll: adminProcedure
      .input(z.object({ type: z.enum(['pros','homes']) }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const now = new Date();
        const table = input.type === 'pros' ? 'proWaitlist' : 'homeWaitlist';
        const result = await (db as any).execute(
          sql`UPDATE ${sql.raw(table)} SET status = 'approved', approvedAt = ${now}, approvedBy = ${ctx.user.id} WHERE status = 'pending'`
        );
        return { success: true, updated: result[0]?.affectedRows ?? 0 };
      }),

    // --- Admin: stats ---
    getWaitlistStats: adminProcedure.query(async () => {
      const db = await getDb();
      if (!db) return { pros: { total: 0, pending: 0, approved: 0 }, homes: { total: 0, pending: 0, approved: 0 } };
      const [proRows] = await (db as any).execute(sql`SELECT status, COUNT(*) as cnt FROM proWaitlist GROUP BY status`) as any[];
      const [homeRows] = await (db as any).execute(sql`SELECT status, COUNT(*) as cnt FROM homeWaitlist GROUP BY status`) as any[];
      const tally = (rows: any[]) => {
        const r = { total: 0, pending: 0, approved: 0, rejected: 0, invited: 0 };
        for (const row of (rows || [])) { const n = Number(row.cnt); r.total += n; r[row.status as keyof typeof r] = n; }
        return r;
      };
      return { pros: tally(proRows), homes: tally(homeRows) };
    }),

    // --- Admin: activate waitlist entry and send invite email ---
    activateAndInvite: adminProcedure
      .input(z.object({
        id: z.number().int(),
        type: z.enum(['pro', 'home']),
        origin: z.string().url().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        const now = new Date();
        const table = input.type === 'pro' ? 'proWaitlist' : 'homeWaitlist';
        const rows = await (db as any).execute(
          sql`SELECT * FROM ${sql.raw(table)} WHERE id = ${input.id} LIMIT 1`
        ) as any;
        const entry = rows?.[0]?.[0] ?? rows?.[0];
        if (!entry) throw new TRPCError({ code: 'NOT_FOUND', message: 'Waitlist entry not found' });
        await (db as any).execute(
          sql`UPDATE ${sql.raw(table)} SET status = 'invited', invitedAt = ${now}, updatedAt = ${now} WHERE id = ${input.id}`
        );
        const origin = input.origin ?? 'https://prolnk.io';
        const email = entry.email ?? entry.contactEmail;
        const name = entry.name ?? entry.contactName ?? 'there';
        const signupUrl = input.type === 'pro'
          ? `${origin}/apply?ref=invite&email=${encodeURIComponent(email ?? '')}`
          : `${origin}/join?ref=invite&email=${encodeURIComponent(email ?? '')}`;
        if (email && process.env.RESEND_API_KEY) {
          try {
            const subject = input.type === 'pro' ? "You're Invited to Join ProLnk \u2014 Your Spot is Ready" : "Your TrustyPro Home Access is Ready";
            const body = input.type === 'pro'
              ? `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px"><h2>Welcome to ProLnk, ${name}!</h2><p>Your 30-day free trial is ready. ProLnk connects home service pros with qualified leads from AI-powered home scans \u2014 no cold calling, no Angi fees.</p><div style="text-align:center;margin:32px 0"><a href="${signupUrl}" style="background:#f59e0b;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold">Activate My Account \u2192</a></div><p style="color:#888;font-size:13px">This invitation expires in 7 days.</p></div>`
              : `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px"><h2>Welcome to TrustyPro, ${name}!</h2><p>Your home is ready for its first AI health scan. We'll identify repair needs and connect you with verified local pros.</p><div style="text-align:center;margin:32px 0"><a href="${signupUrl}" style="background:#f59e0b;color:#fff;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:bold">Set Up My Home \u2192</a></div><p style="color:#888;font-size:13px">This invitation expires in 7 days.</p></div>`;
            await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({ from: 'ProLnk <onboarding@resend.dev>', to: [email], subject, html: body }),
            }).catch(() => {});
          } catch (emailErr) {
            logger.error('[WaitlistInvite] Email send failed', { error: emailErr });
          }
        }
        await notifyOwner({ title: `Waitlist Invite Sent`, content: `${name} (${email}) invited as ${input.type === 'pro' ? 'partner' : 'homeowner'}.` });
        return { success: true, email, name };
      }),

    // --- Public: commercial contractor waitlist ---
    submitCommercialWaitlist: publicProcedure
      .input(z.object({
        businessName: z.string().min(2).max(255),
        contactName: z.string().min(2).max(255),
        contactEmail: z.string().email().max(255),
        contactPhone: z.string().max(30).optional(),
        businessType: z.string().max(100),
        portfolioSize: z.string().max(100),
        serviceArea: z.string().max(255).optional(),
        yearsInBusiness: z.string().max(20).optional(),
        currentSoftware: z.string().max(255).optional(),
        establishedJobsPerMonth: z.string().max(20).optional(),
        notes: z.string().max(2000).optional(),
      }))
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Database unavailable' });
        try {
          await (db as any).execute(
            sql`INSERT INTO commercialWaitlist (businessName, contactName, contactEmail, contactPhone, businessType, portfolioSize, serviceArea, yearsInBusiness, currentSoftware, establishedJobsPerMonth, notes, status, createdAt)
                VALUES (${input.businessName}, ${input.contactName}, ${input.contactEmail}, ${input.contactPhone ?? null}, ${input.businessType}, ${input.portfolioSize}, ${input.serviceArea ?? null}, ${input.yearsInBusiness ?? null}, ${input.currentSoftware ?? null}, ${input.establishedJobsPerMonth ?? null}, ${input.notes ?? null}, 'pending', ${Date.now()})`
          );
        } catch (e: any) {
          if (e?.code === 'ER_DUP_ENTRY') throw new TRPCError({ code: 'CONFLICT', message: 'This email is already on the commercial waitlist.' });
          throw e;
        }
        await notifyOwner({ title: 'New Commercial Waitlist Signup', content: `${input.contactName} (${input.businessName}) joined the ProLnk Exchange commercial waitlist.` });
        n8n.commercialWaitlistJoined({ email: input.contactEmail, name: input.contactName, company: input.businessName, phone: input.contactPhone }).catch(() => {});
        return { success: true };
      }),
  }),

  // ── Analytics Admin ─────────────────────────────────────────────────────────
  analytics: router({
    ...analyticsAdminRouter.createCaller({} as any),
  }),

  circumvention: router({
    runSweep: adminProcedure.mutation(async () => {
      await runCircumventionSweep();
      return { success: true };
    }),
    getFlags: adminProcedure
      .input(z.object({ status: z.enum(['open','resolved','dismissed']).optional() }))
      .query(async ({ input }) => {
        return getFlagsForAdmin(input.status);
      }),
    resolveFlag: adminProcedure
      .input(z.object({ flagId: z.number(), resolution: z.string().min(5) }))
      .mutation(async ({ ctx, input }) => {
        await resolveFlag(input.flagId, input.resolution, ctx.user.id);
        return { success: true };
      }),
  }),
  buildium: router({
    status: adminProcedure.query(async () => {
      const { isBuildiumConfigured } = await import('./_core/buildium');
      return { configured: isBuildiumConfigured() };
    }),
    getWorkOrders: adminProcedure.query(async () => {
      const { fetchOpenWorkOrders, isBuildiumConfigured } = await import('./_core/buildium');
      if (!isBuildiumConfigured()) return { workOrders: [], configured: false };
      const workOrders = await fetchOpenWorkOrders();
      return { workOrders, configured: true };
    }),
    getVendors: adminProcedure.query(async () => {
      const { fetchBuildiumVendors, isBuildiumConfigured } = await import('./_core/buildium');
      if (!isBuildiumConfigured()) return { vendors: [], configured: false };
      const vendors = await fetchBuildiumVendors();
      return { vendors, configured: true };
    }),
    assignVendor: adminProcedure
      .input(z.object({ workOrderId: z.string(), vendorId: z.string() }))
      .mutation(async ({ input }) => {
        const { assignVendorToWorkOrder } = await import('./_core/buildium');
        const result = await assignVendorToWorkOrder(input.workOrderId, input.vendorId);
        return { success: !!result };
      }),
    markComplete: adminProcedure
      .input(z.object({ workOrderId: z.string(), notes: z.string() }))
      .mutation(async ({ input }) => {
        const { markWorkOrderComplete } = await import('./_core/buildium');
        const result = await markWorkOrderComplete(input.workOrderId, input.notes);
        return { success: !!result };
      }),
  }),

  ai: router({
    askHomeAssistant: publicProcedure
      .input(z.object({
        message: z.string().min(1).max(1000),
        history: z.array(z.object({
          role: z.enum(["user", "assistant"]),
          content: z.string(),
        })).max(10).optional(),
      }))
      .mutation(async ({ input }) => {
        const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
          {
            role: "system",
            content: "You are a friendly, expert home maintenance assistant for TrustyPro. Help homeowners with diagnosing issues, seasonal maintenance, cost estimates, and when to hire a professional. Keep responses concise (2-4 paragraphs), practical, and actionable. When relevant, suggest getting a quote from a vetted TrustyPro partner.",
          },
          ...(input.history || []).map(h => ({ role: h.role as "user" | "assistant", content: h.content })),
          { role: "user" as const, content: input.message },
        ];
        const response = await invokeLLM({ messages });
        const rawAnswer = response?.choices?.[0]?.message?.content;
        const answer = typeof rawAnswer === 'string' ? rawAnswer : (rawAnswer ? JSON.stringify(rawAnswer) : "I am having trouble right now. Please try again.");
        return { answer };
      }),
  }),
  // -- Community Forum --
  forum: router({
    getPosts: publicProcedure
      .input(z.object({ category: z.string().optional() }))
      .query(async ({ input }) => {
        const db = await getDb();
        const rows = await db!.execute(
          input.category
            ? sql`SELECT fp.id, fp.partnerId, fp.category, fp.title, fp.body, fp.likes, fp.pinned, fp.createdAt,
                  p.businessName AS authorBusiness, p.tier AS authorTier,
                  (SELECT COUNT(*) FROM forumReplies fr WHERE fr.postId = fp.id) AS replyCount
                  FROM forumPosts fp
                  LEFT JOIN partners p ON p.id = fp.partnerId
                  WHERE fp.category = ${input.category}
                  ORDER BY fp.pinned DESC, fp.createdAt DESC LIMIT 50`
            : sql`SELECT fp.id, fp.partnerId, fp.category, fp.title, fp.body, fp.likes, fp.pinned, fp.createdAt,
                  p.businessName AS authorBusiness, p.tier AS authorTier,
                  (SELECT COUNT(*) FROM forumReplies fr WHERE fr.postId = fp.id) AS replyCount
                  FROM forumPosts fp
                  LEFT JOIN partners p ON p.id = fp.partnerId
                  ORDER BY fp.pinned DESC, fp.createdAt DESC LIMIT 50`
        );
        return (rows as unknown as [Array<{ id: number; partnerId: number; category: string; title: string; body: string; likes: number; pinned: number; createdAt: Date; authorBusiness: string | null; authorTier: string | null; replyCount: number }>])[0];
      }),
    createPost: protectedProcedure
      .input(z.object({ category: z.string(), title: z.string().min(5).max(200), body: z.string().min(10).max(5000) }))
      .mutation(async ({ input, ctx }) => {
        const partner = await getPartnerByUserId(ctx.user.id);
        if (!partner) throw new TRPCError({ code: 'FORBIDDEN', message: 'Partner account required' });
        const db = await getDb();
        await db!.execute(sql`INSERT INTO forumPosts (partnerId, category, title, body) VALUES (${partner.id}, ${input.category}, ${input.title}, ${input.body})`);
        return { success: true };
      }),
    likePost: protectedProcedure
      .input(z.object({ postId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        const partner = await getPartnerByUserId(ctx.user.id);
        if (!partner) throw new TRPCError({ code: 'FORBIDDEN', message: 'Partner account required' });
        const db = await getDb();
        try {
          await db!.execute(sql`INSERT INTO forumLikes (postId, partnerId) VALUES (${input.postId}, ${partner.id})`);
          await db!.execute(sql`UPDATE forumPosts SET likes = likes + 1 WHERE id = ${input.postId}`);
        } catch { /* already liked */ }
        return { success: true };
      }),
    getReplies: publicProcedure
      .input(z.object({ postId: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        const rows = await db!.execute(
          sql`SELECT fr.id, fr.postId, fr.partnerId, fr.body, fr.createdAt,
              p.businessName AS authorBusiness, p.tier AS authorTier
              FROM forumReplies fr
              LEFT JOIN partners p ON p.id = fr.partnerId
              WHERE fr.postId = ${input.postId}
              ORDER BY fr.createdAt ASC LIMIT 100`
        );
        return (rows as unknown as [Array<{ id: number; postId: number; partnerId: number; body: string; createdAt: Date; authorBusiness: string | null; authorTier: string | null }>])[0];
      }),
    addReply: protectedProcedure
      .input(z.object({ postId: z.number(), body: z.string().min(5).max(2000) }))
      .mutation(async ({ input, ctx }) => {
        const partner = await getPartnerByUserId(ctx.user.id);
        if (!partner) throw new TRPCError({ code: 'FORBIDDEN', message: 'Partner account required' });
        const db = await getDb();
        await db!.execute(sql`INSERT INTO forumReplies (postId, partnerId, body) VALUES (${input.postId}, ${partner.id}, ${input.body})`);
        return { success: true };
      }),
  }),
  // -- Partner Gallery --
  gallery: router({
    getProjects: publicProcedure
      .input(z.object({ partnerId: z.number().optional(), category: z.string().optional() }))
      .query(async ({ input }) => {
        const db = await getDb();
        const rows = await db!.execute(
          sql`SELECT pgp.id, pgp.partnerId, pgp.title, pgp.description, pgp.category,
              pgp.beforeImageUrl, pgp.afterImageUrl, pgp.completedAt, pgp.createdAt,
              p.businessName, p.tier
              FROM partnerGalleryProjects pgp
              LEFT JOIN partners p ON p.id = pgp.partnerId
              WHERE (${input.partnerId ?? null} IS NULL OR pgp.partnerId = ${input.partnerId ?? null})
                AND (${input.category ?? null} IS NULL OR pgp.category = ${input.category ?? null})
              ORDER BY pgp.createdAt DESC LIMIT 100`
        );
        return (rows as unknown as [Array<{ id: number; partnerId: number; title: string; description: string | null; category: string | null; beforeImageUrl: string | null; afterImageUrl: string | null; completedAt: Date | null; createdAt: Date; businessName: string | null; tier: string | null }>])[0];
      }),
    addProject: protectedProcedure
      .input(z.object({
        title: z.string().min(3).max(200),
        description: z.string().optional(),
        category: z.string().optional(),
        beforeImageUrl: z.string().url().optional(),
        afterImageUrl: z.string().url().optional(),
        completedAt: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const partner = await getPartnerByUserId(ctx.user.id);
        if (!partner) throw new TRPCError({ code: 'FORBIDDEN', message: 'Partner account required' });
        const db = await getDb();
        await db!.execute(
          sql`INSERT INTO partnerGalleryProjects (partnerId, title, description, category, beforeImageUrl, afterImageUrl, completedAt)
              VALUES (${partner.id}, ${input.title}, ${input.description ?? null}, ${input.category ?? null},
                      ${input.beforeImageUrl ?? null}, ${input.afterImageUrl ?? null},
                      ${input.completedAt ? new Date(input.completedAt) : null})`
        );
        return { success: true };
      }),
    deleteProject: protectedProcedure
      .input(z.object({ projectId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        const partner = await getPartnerByUserId(ctx.user.id);
        if (!partner) throw new TRPCError({ code: 'FORBIDDEN', message: 'Partner account required' });
        const db = await getDb();
        await db!.execute(sql`DELETE FROM partnerGalleryProjects WHERE id = ${input.projectId} AND partnerId = ${partner.id}`);
        return { success: true };
      }),
  }),

  adminTools: router({
    overrideCommissionRate: adminProcedure
      .input(z.object({
        partnerId: z.number(),
        customRate: z.number().min(0).max(100),
        reason: z.string().min(3).max(500),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await (db as any).execute(
          sql`UPDATE partners SET customCommissionRate = ${input.customRate}, customRateReason = ${input.reason} WHERE id = ${input.partnerId}`
        );
        logAdminAction(ctx.user.id, "override_commission_rate", "partner", input.partnerId, { customRate: input.customRate, reason: input.reason });
        return { success: true };
      }),

    getMonthlyRevenue: adminProcedure
      .input(z.object({ months: z.number().min(1).max(24).default(12) }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return [];
        const rows = await (db as any).execute(sql`
          SELECT
            DATE_FORMAT(c.paidAt, '%Y-%m') AS month,
            COUNT(*) AS totalCommissions,
            SUM(c.amount) AS totalRevenue,
            COUNT(DISTINCT c.receivingPartnerId) AS uniquePartners
          FROM commissions c
          WHERE c.paid = 1 AND c.paidAt >= DATE_SUB(NOW(), INTERVAL ${input.months} MONTH)
          GROUP BY DATE_FORMAT(c.paidAt, '%Y-%m')
          ORDER BY month DESC
        `);
        return (rows[0] || rows) as any[];
      }),

    flagAIDetection: adminProcedure
      .input(z.object({
        photoQueueItemId: z.number(),
        flagType: z.enum(["false_positive", "false_negative", "low_confidence", "misclassified"]),
        notes: z.string().max(500).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        await (db as any).execute(sql`
          INSERT INTO aiTrainingDataset (sourcePhotoId, flagType, adminNotes, flaggedBy, createdAt)
          VALUES (${input.photoQueueItemId}, ${input.flagType}, ${input.notes ?? null}, ${ctx.user.id}, NOW())
        `);
        logAdminAction(ctx.user.id, "flag_ai_detection", "photo_queue", input.photoQueueItemId, { flagType: input.flagType });
        return { success: true };
      }),

    bulkPartnerAction: adminProcedure
      .input(z.object({
        partnerIds: z.array(z.number()).min(1).max(100),
        action: z.enum(["approve", "suspend", "unsuspend", "send_message"]),
        message: z.string().max(1000).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        let affected = 0;
        for (const pid of input.partnerIds) {
          if (input.action === "approve") {
            await (db as any).execute(sql`UPDATE partners SET status = 'approved', approvedAt = NOW() WHERE id = ${pid}`);
          } else if (input.action === "suspend") {
            await (db as any).execute(sql`UPDATE partners SET suspended = 1, suspendedAt = NOW() WHERE id = ${pid}`);
          } else if (input.action === "unsuspend") {
            await (db as any).execute(sql`UPDATE partners SET suspended = 0, suspendedAt = NULL WHERE id = ${pid}`);
          } else if (input.action === "send_message" && input.message) {
            await (db as any).execute(sql`
              INSERT INTO partnerNotifications (partnerId, type, title, message, createdAt)
              VALUES (${pid}, 'system', 'Admin Message', ${input.message}, NOW())
            `);
          }
          affected++;
        }
        logAdminAction(ctx.user.id, `bulk_${input.action}`, "partners", 0, { partnerIds: input.partnerIds, count: affected });
        return { success: true, affected };
      }),
  }),
});
export type AppRouter = typeof appRouter;
