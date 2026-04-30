/**
 * ProLnk Tiered Waterfall AI Photo Analysis Pipeline
 *
 * Four tiers, each more expensive than the last. A photo only advances to the
 * next tier if it passes the current one. This keeps cost low and reserves
 * expensive compute for photos that actually deserve it.
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ Tier 0 — Heuristic Triage           free   URL + metadata check │
 * │   ↓ pass                                                        │
 * │ Tier 1 — VLM Quality Screen    ~$0.001   cheapest model (triage)│
 * │   ↓ pass                                                        │
 * │ Tier 2 — Opportunity Detection  ~$0.002   fast model, low detail│
 * │   ↓ confidence ≥ 0.65                                          │
 * │ Tier 3 — Deep Analysis          ~$0.015   full model, hi detail │
 * │   ↓ offerTrack = "transformation"                               │
 * │ Tier 4 — Visual Rendering       ~$0.020   AI image generation   │
 * └─────────────────────────────────────────────────────────────────│
 *
 * Expected blended cost: ~$0.003–$0.005/photo (vs. $0.020 flat GPT-4o).
 */

import { invokeLLM, VLM_MODELS } from "./_core/llm";
import { generateImage } from "./_core/imageGeneration";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PhotoSource = "field_app" | "servicetitan" | "companycam" | "jobber" | "manual_upload";
export type IngestionMode = "live" | "historical";

export interface PhotoInput {
  url: string;
  source: PhotoSource;
  ingestionMode: IngestionMode;
  serviceAddress: string;
  photoAgeMonths?: number;
  partnerId?: number;
  jobId?: number;
}

export interface Tier0Result {
  passed: boolean;
  reason: string;
}

export interface Tier1Result {
  passed: boolean;
  reason: string;
  qualityScore: number; // 0–1
  photoType: "exterior" | "interior" | "damage" | "equipment" | "unclear";
}

export interface Tier2Result {
  passed: boolean;
  opportunityType: string;
  category: string;
  confidence: number;
  rawConfidence: number;
  estimatedValue: number;
  offerTrack: "repair" | "transformation" | "none";
  reason: string;
}

export interface Tier3Opportunity {
  type: string;
  category: string;
  confidence: number;
  description: string;
  estimatedValue: number;
  offerTrack: "repair" | "transformation";
  transformationPrompt: string;
  isInsuranceClaim: boolean;
  urgency: "immediate" | "within_30_days" | "routine" | "optional";
}

export interface HomeHealthUpdate {
  component: string;
  condition: "good" | "fair" | "poor" | "unknown";
  notes: string;
  estimatedAge: number;
}

export interface Tier3Result {
  opportunities: Tier3Opportunity[];
  homeHealthUpdates: HomeHealthUpdate[];
  photoQuality: "good" | "poor" | "unusable";
  analysisNotes: string;
  suppressOffers: boolean;
}

export interface Tier4Rendering {
  opportunityType: string;
  transformationPrompt: string;
  renderedImageUrl: string | null;
  error?: string;
}

export interface WaterfallResult {
  photoUrl: string;
  tier0: Tier0Result;
  tier1?: Tier1Result;
  tier2?: Tier2Result;
  tier3?: Tier3Result;
  tier4Renderings?: Tier4Rendering[];
  finalConfidence: number;
  shouldGenerateOffer: boolean;
  processingCostUsd: number;
  staleDataFlags: string[];
}

// ─── Tier 0: Heuristic Triage ─────────────────────────────────────────────────
// Zero cost — reject obvious garbage before spending any API budget.

function runTier0Heuristic(photo: PhotoInput): Tier0Result {
  const url = photo.url.toLowerCase();

  if (url.includes("placehold") || url.includes("placeholder") || url.includes("test-image")) {
    return { passed: false, reason: "Placeholder image" };
  }

  const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif", ".avif"];
  const isImageUrl =
    imageExtensions.some(ext => url.includes(ext)) ||
    url.includes("s3.amazonaws.com") ||
    url.includes("cdn.") ||
    url.includes("storage.") ||
    url.includes("forge") ||
    url.includes("cloudfront");

  if (!isImageUrl) {
    return { passed: false, reason: "URL does not appear to point to an image" };
  }

  // Hard reject: photos older than 48 months have virtually zero lead value
  if (photo.photoAgeMonths && photo.photoAgeMonths > 48) {
    return { passed: false, reason: `Photo is ${photo.photoAgeMonths} months old — exceeds 48-month cutoff` };
  }

  return { passed: true, reason: "Heuristic check passed" };
}

// ─── Tier 1: VLM Quality Screen ───────────────────────────────────────────────
// Cheapest model, low detail, minimal tokens. Answer: is this worth analyzing?

async function runTier1QualityScreen(photo: PhotoInput): Promise<Tier1Result> {
  try {
    const response = await invokeLLM({
      model: VLM_MODELS.triage.model,
      provider: VLM_MODELS.triage.provider,
      thinking: false, // disable extended thinking — not needed for a yes/no check
      maxTokens: 512,
      messages: [
        {
          role: "system",
          content: `You are a photo quality screener for a home service platform.
Determine if this photo is usable for AI home-service opportunity analysis.

ACCEPT if: shows exterior surfaces, yard, roof, siding, fence, driveway, pool,
gutters, HVAC unit, windows, damage, wear, aging materials, or any home component.

REJECT if: blurry, pitch black, selfie, shows only people, indoor lifestyle shot
with no visible issues, screenshot of a document, or is clearly irrelevant.

Respond with JSON only.`,
        },
        {
          role: "user",
          content: [
            { type: "text" as const, text: `Quality screen this photo from a job at: ${photo.serviceAddress}` },
            { type: "image_url" as const, image_url: { url: photo.url, detail: "low" as const } },
          ],
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "quality_screen",
          strict: true,
          schema: {
            type: "object",
            properties: {
              passed: { type: "boolean" },
              reason: { type: "string" },
              qualityScore: { type: "number" },
              photoType: { type: "string", enum: ["exterior", "interior", "damage", "equipment", "unclear"] },
            },
            required: ["passed", "reason", "qualityScore", "photoType"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices?.[0]?.message?.content;
    const parsed = typeof content === "string" ? JSON.parse(content) : content;

    // Apply age decay to qualityScore
    let qualityScore = parsed?.qualityScore ?? 0.5;
    if (photo.photoAgeMonths && photo.photoAgeMonths > 12) {
      const decayFactor = Math.max(1 - (photo.photoAgeMonths - 12) / 48, 0.4);
      qualityScore = qualityScore * decayFactor;
    }

    return {
      passed: parsed?.passed === true && qualityScore >= 0.3,
      reason: parsed?.reason ?? "Unknown",
      qualityScore,
      photoType: parsed?.photoType ?? "unclear",
    };
  } catch (err) {
    // Fail open on Tier 1 error — let more expensive tiers decide
    return { passed: true, reason: `Tier 1 error — proceeding: ${err instanceof Error ? err.message : "unknown"}`, qualityScore: 0.5, photoType: "unclear" };
  }
}

// ─── Tier 2: Opportunity Detection ────────────────────────────────────────────
// Medium model, low detail. Identify WHAT opportunity exists + whether it
// warrants a repair track or a visual transformation rendering.

async function runTier2OpportunityDetection(
  photo: PhotoInput,
  tier1: Tier1Result
): Promise<Tier2Result> {
  try {
    const response = await invokeLLM({
      model: VLM_MODELS.classify.model,
      provider: VLM_MODELS.classify.provider,
      thinking: false,
      maxTokens: 1024,
      messages: [
        {
          role: "system",
          content: `You are a home service opportunity classifier for ProLnk.

Identify the single BEST service opportunity visible in this photo.

Service categories:
EXTERIOR: roofing, gutters, siding, windows, doors, garage_door, driveway, concrete, fencing, deck, patio, pergola, pool, exterior_painting, pressure_washing, chimney
LANDSCAPE: lawn_care, landscaping, tree_service, irrigation, drainage, hardscaping, outdoor_lighting
INTERIOR: flooring, interior_painting, drywall, kitchen_remodel, bathroom_remodel, cabinet_refinishing, countertops
SYSTEMS: hvac, hvac_maintenance, plumbing, electrical, insulation, waterproofing, foundation, generator, solar, water_heater
SPECIALTY: insurance_claim_candidate, safety_hazard, accessibility_upgrade, pest_control, mold_remediation

Offer track:
- "repair": safety or maintenance issue (leaking, broken, expired, damaged)
- "transformation": discretionary upgrade the homeowner would WANT to see rendered visually
- "none": no meaningful opportunity

Confidence 0.0–1.0. Be honest — if unclear, score low.`,
        },
        {
          role: "user",
          content: [
            {
              type: "text" as const,
              text: `Classify opportunity at: ${photo.serviceAddress}. Photo type identified: ${tier1.photoType}.`,
            },
            { type: "image_url" as const, image_url: { url: photo.url, detail: "low" as const } },
          ],
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "opportunity_classification",
          strict: true,
          schema: {
            type: "object",
            properties: {
              hasOpportunity: { type: "boolean" },
              type: { type: "string" },
              category: { type: "string" },
              confidence: { type: "number" },
              estimatedValue: { type: "number" },
              offerTrack: { type: "string", enum: ["repair", "transformation", "none"] },
            },
            required: ["hasOpportunity", "type", "category", "confidence", "estimatedValue", "offerTrack"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices?.[0]?.message?.content;
    const parsed = typeof content === "string" ? JSON.parse(content) : content;

    if (!parsed?.hasOpportunity || parsed.confidence < 0.4) {
      return {
        passed: false,
        opportunityType: parsed?.type ?? "none",
        category: parsed?.category ?? "none",
        confidence: 0,
        rawConfidence: parsed?.confidence ?? 0,
        estimatedValue: 0,
        offerTrack: "none",
        reason: `Low confidence (${(parsed?.confidence ?? 0).toFixed(2)}) — not worth deep analysis`,
      };
    }

    // Age decay: older photos get confidence reduced proportionally
    const rawConfidence = parsed.confidence;
    let confidence = rawConfidence;
    if (photo.photoAgeMonths && photo.photoAgeMonths > 12) {
      const decayFactor = Math.max(1 - (photo.photoAgeMonths - 12) / 36, 0.3);
      confidence = confidence * decayFactor * tier1.qualityScore;
    }

    const DEEP_ANALYSIS_THRESHOLD = 0.65;
    const passed = confidence >= DEEP_ANALYSIS_THRESHOLD;

    return {
      passed,
      opportunityType: parsed.type,
      category: parsed.category,
      confidence,
      rawConfidence,
      estimatedValue: parsed.estimatedValue ?? 0,
      offerTrack: parsed.offerTrack ?? "repair",
      reason: passed
        ? `Confidence ${confidence.toFixed(2)} ≥ threshold — proceeding to deep analysis`
        : `Confidence ${confidence.toFixed(2)} after decay — below threshold (${DEEP_ANALYSIS_THRESHOLD})`,
    };
  } catch (err) {
    return {
      passed: false,
      opportunityType: "none",
      category: "none",
      confidence: 0,
      rawConfidence: 0,
      estimatedValue: 0,
      offerTrack: "none",
      reason: `Tier 2 error: ${err instanceof Error ? err.message : "unknown"}`,
    };
  }
}

// ─── Tier 3: Deep Analysis ────────────────────────────────────────────────────
// Full model, high-detail vision. Multi-opportunity extraction, Home Health
// Vault updates, insurance claim detection, urgency classification.

async function runTier3DeepAnalysis(
  photo: PhotoInput,
  tier2: Tier2Result
): Promise<Tier3Result> {
  const suppressOffers =
    photo.ingestionMode === "historical" ||
    (photo.photoAgeMonths !== undefined && photo.photoAgeMonths > 18);

  try {
    const response = await invokeLLM({
      model: VLM_MODELS.analyze.model,
      provider: VLM_MODELS.analyze.provider,
      thinking: true,
      maxTokens: 4096,
      messages: [
        {
          role: "system",
          content: `You are a professional home inspector AI for ProLnk/TrustyPro.

Analyze this photo in detail. For EVERY visible issue or opportunity:
1. Specific type and category
2. Confidence 0.0–1.0 — only report what you can genuinely see
3. Clear description of the specific visual evidence
4. Estimated job value in USD (realistic market rate)
5. offerTrack: "repair" (safety/maintenance) or "transformation" (discretionary upgrade)
6. transformationPrompt: if transformation, write a DALL-E/image-gen prompt showing the finished result
7. isInsuranceClaim: true if damage appears storm/hail/wind/flood/fire related
8. urgency: immediate / within_30_days / routine / optional

Home Health Vault: for each visible home component, record condition.

${suppressOffers ? "HISTORICAL PHOTO: Focus on Home Health Vault updates only. Set suppressOffers = true." : "LIVE PHOTO: Generate offers for all confirmed opportunities."}

Do NOT fabricate issues. Only report what is genuinely visible.`,
        },
        {
          role: "user",
          content: [
            {
              type: "text" as const,
              text: `Deep analysis for property at: ${photo.serviceAddress}
Pre-classified by Tier 2 as: ${tier2.opportunityType} (${tier2.category})
Tier 2 confidence: ${tier2.confidence.toFixed(2)}, estimated value: $${tier2.estimatedValue}`,
            },
            { type: "image_url" as const, image_url: { url: photo.url, detail: "high" as const } },
          ],
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "deep_analysis",
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
                    offerTrack: { type: "string", enum: ["repair", "transformation"] },
                    transformationPrompt: { type: "string" },
                    isInsuranceClaim: { type: "boolean" },
                    urgency: { type: "string", enum: ["immediate", "within_30_days", "routine", "optional"] },
                  },
                  required: ["type", "category", "confidence", "description", "estimatedValue", "offerTrack", "transformationPrompt", "isInsuranceClaim", "urgency"],
                  additionalProperties: false,
                },
              },
              homeHealthUpdates: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    component: { type: "string" },
                    condition: { type: "string", enum: ["good", "fair", "poor", "unknown"] },
                    notes: { type: "string" },
                    estimatedAge: { type: "number" },
                  },
                  required: ["component", "condition", "notes", "estimatedAge"],
                  additionalProperties: false,
                },
              },
              photoQuality: { type: "string", enum: ["good", "poor", "unusable"] },
              analysisNotes: { type: "string" },
            },
            required: ["opportunities", "homeHealthUpdates", "photoQuality", "analysisNotes"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices?.[0]?.message?.content;
    const parsed = typeof content === "string" ? JSON.parse(content) : content;

    const filteredOpportunities = ((parsed?.opportunities ?? []) as Tier3Opportunity[])
      .filter(o => o.confidence >= 0.55);

    return {
      opportunities: filteredOpportunities,
      homeHealthUpdates: parsed?.homeHealthUpdates ?? [],
      photoQuality: parsed?.photoQuality ?? "poor",
      analysisNotes: parsed?.analysisNotes ?? "",
      suppressOffers,
    };
  } catch (err) {
    return {
      opportunities: [],
      homeHealthUpdates: [],
      photoQuality: "poor",
      analysisNotes: `Tier 3 error: ${err instanceof Error ? err.message : "unknown"}`,
      suppressOffers,
    };
  }
}

// ─── Tier 4: Visual Rendering ─────────────────────────────────────────────────
// Generate before→after transformation images for "transformation" track
// opportunities. Only runs when the caller requests it and the opportunity
// has a valid transformation prompt.

async function runTier4Renderings(
  photo: PhotoInput,
  opportunities: Tier3Opportunity[],
  options: { maxRenderings?: number }
): Promise<Tier4Rendering[]> {
  const transformationOpps = opportunities
    .filter(o => o.offerTrack === "transformation" && o.transformationPrompt?.trim())
    .slice(0, options.maxRenderings ?? 2); // cap at 2 per photo to control cost

  if (transformationOpps.length === 0) return [];

  const results: Tier4Rendering[] = [];

  for (const opp of transformationOpps) {
    try {
      const prompt = `Photorealistic home exterior transformation. ${opp.transformationPrompt}.
Professional photography quality, same camera angle and lighting as the before photo.
Show only the finished result — no watermarks, no before/after split, no text overlays.`;

      const generated = await generateImage({
        prompt,
        originalImages: [{ url: photo.url }],
      });

      results.push({
        opportunityType: opp.type,
        transformationPrompt: opp.transformationPrompt,
        renderedImageUrl: generated.url ?? null,
      });
    } catch (err) {
      results.push({
        opportunityType: opp.type,
        transformationPrompt: opp.transformationPrompt,
        renderedImageUrl: null,
        error: err instanceof Error ? err.message : "Rendering failed",
      });
    }
  }

  return results;
}

// ─── Stale Data Detection ─────────────────────────────────────────────────────

function detectStaleDataFlags(photo: PhotoInput): string[] {
  const flags: string[] = [];
  if (photo.ingestionMode === "historical") flags.push("historical_ingestion");
  if (photo.photoAgeMonths !== undefined) {
    if (photo.photoAgeMonths > 36) flags.push("photo_over_36_months");
    else if (photo.photoAgeMonths > 24) flags.push("photo_over_24_months");
    else if (photo.photoAgeMonths > 12) flags.push("photo_over_12_months");
  }
  if (["servicetitan", "jobber", "companycam"].includes(photo.source)) {
    flags.push("third_party_integration");
  }
  return flags;
}

// ─── Cost Estimator ───────────────────────────────────────────────────────────

function estimateCost(
  tier0: Tier0Result,
  tier1?: Tier1Result,
  tier2?: Tier2Result,
  tier3?: Tier3Result,
  tier4?: Tier4Rendering[]
): number {
  let cost = 0;
  if (!tier0.passed) return 0;
  if (tier1) cost += 0.0008;  // cheapest model, low detail
  if (tier2) cost += 0.0015;  // fast model, low detail
  if (tier3) cost += 0.015;   // full model, high detail
  if (tier4) cost += (tier4.filter(r => r.renderedImageUrl).length) * 0.020; // image gen
  return Math.round(cost * 10000) / 10000;
}

// ─── Main Waterfall Orchestrator ──────────────────────────────────────────────

export interface WaterfallOptions {
  /**
   * Generate visual transformation renderings (Tier 4).
   * Adds ~$0.02 per rendering. Default: false.
   */
  generateRenderings?: boolean;
  /** Max Tier 4 renderings per photo. Default: 2. */
  maxRenderingsPerPhoto?: number;
  /** If true, homeowner-initiated scan — never suppress offers. */
  requestedByHomeowner?: boolean;
}

export async function runWaterfallAnalysis(
  photo: PhotoInput,
  options: WaterfallOptions = {}
): Promise<WaterfallResult> {
  const staleDataFlags = detectStaleDataFlags(photo);

  // ── Tier 0 ──────────────────────────────────────────────────────────────────
  const tier0 = runTier0Heuristic(photo);
  if (!tier0.passed) {
    return {
      photoUrl: photo.url,
      tier0,
      finalConfidence: 0,
      shouldGenerateOffer: false,
      processingCostUsd: 0,
      staleDataFlags,
    };
  }

  // ── Tier 1 ──────────────────────────────────────────────────────────────────
  const tier1 = await runTier1QualityScreen(photo);
  if (!tier1.passed) {
    return {
      photoUrl: photo.url,
      tier0,
      tier1,
      finalConfidence: 0,
      shouldGenerateOffer: false,
      processingCostUsd: estimateCost(tier0, tier1),
      staleDataFlags,
    };
  }

  // ── Tier 2 ──────────────────────────────────────────────────────────────────
  const tier2 = await runTier2OpportunityDetection(photo, tier1);
  if (!tier2.passed) {
    return {
      photoUrl: photo.url,
      tier0,
      tier1,
      tier2,
      finalConfidence: tier2.confidence,
      shouldGenerateOffer: false,
      processingCostUsd: estimateCost(tier0, tier1, tier2),
      staleDataFlags,
    };
  }

  // ── Tier 3 ──────────────────────────────────────────────────────────────────
  const tier3 = await runTier3DeepAnalysis(photo, tier2);

  let finalConfidence = tier3.opportunities.length > 0
    ? Math.max(...tier3.opportunities.map(o => o.confidence))
    : tier2.confidence;

  // Homeowner-initiated scans always surface offers regardless of stale flags
  const isStale = staleDataFlags.some(f => f.startsWith("photo_over_24"));
  const shouldGenerateOffer =
    (options.requestedByHomeowner || !tier3.suppressOffers) &&
    tier3.opportunities.length > 0 &&
    finalConfidence >= 0.55 &&
    (options.requestedByHomeowner || !isStale);

  // ── Tier 4 ──────────────────────────────────────────────────────────────────
  let tier4Renderings: Tier4Rendering[] | undefined;
  if (options.generateRenderings && shouldGenerateOffer && tier3.opportunities.length > 0) {
    tier4Renderings = await runTier4Renderings(photo, tier3.opportunities, {
      maxRenderings: options.maxRenderingsPerPhoto ?? 2,
    });
  }

  return {
    photoUrl: photo.url,
    tier0,
    tier1,
    tier2,
    tier3,
    tier4Renderings,
    finalConfidence,
    shouldGenerateOffer,
    processingCostUsd: estimateCost(tier0, tier1, tier2, tier3, tier4Renderings),
    staleDataFlags,
  };
}

// ─── Batch Processor ─────────────────────────────────────────────────────────

export async function runWaterfallBatch(
  photos: PhotoInput[],
  options: WaterfallOptions & {
    /** Max simultaneous Tier 3 calls. Default: 3 (Forge rate limits). */
    maxConcurrent?: number;
  } = {}
): Promise<{
  results: WaterfallResult[];
  summary: {
    total: number;
    passedTier0: number;
    passedTier1: number;
    passedTier2: number;
    passedTier3: number;
    offersGenerated: number;
    renderingsGenerated: number;
    homeHealthUpdates: number;
    totalCostUsd: number;
    estimatedSavingsVsFlatRate: number;
  };
}> {
  const maxConcurrent = options.maxConcurrent ?? 3;
  const results: WaterfallResult[] = [];

  for (let i = 0; i < photos.length; i += maxConcurrent) {
    const batch = photos.slice(i, i + maxConcurrent);
    const settled = await Promise.allSettled(
      batch.map(photo => runWaterfallAnalysis(photo, options))
    );
    for (const result of settled) {
      if (result.status === "fulfilled") results.push(result.value);
    }
    if (i + maxConcurrent < photos.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  const flatRateCostPerPhoto = 0.020; // what it would cost running full Tier 3 on every photo
  const totalCostUsd = results.reduce((s, r) => s + r.processingCostUsd, 0);

  return {
    results,
    summary: {
      total: photos.length,
      passedTier0: results.filter(r => r.tier0.passed).length,
      passedTier1: results.filter(r => r.tier1?.passed).length,
      passedTier2: results.filter(r => r.tier2?.passed).length,
      passedTier3: results.filter(r => r.tier3 !== undefined).length,
      offersGenerated: results.filter(r => r.shouldGenerateOffer).length,
      renderingsGenerated: results.reduce((s, r) => s + (r.tier4Renderings?.filter(t => t.renderedImageUrl).length ?? 0), 0),
      homeHealthUpdates: results.reduce((s, r) => s + (r.tier3?.homeHealthUpdates.length ?? 0), 0),
      totalCostUsd: Math.round(totalCostUsd * 10000) / 10000,
      estimatedSavingsVsFlatRate: Math.max(0, Math.round((photos.length * flatRateCostPerPhoto - totalCostUsd) * 10000) / 10000),
    },
  };
}
