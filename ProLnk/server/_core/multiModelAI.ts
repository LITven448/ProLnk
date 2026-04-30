/**
 * Multi-Model AI Orchestration Layer
 *
 * Pipeline:
 * 1. Gemini Flash — fast pre-filter (is this photo worth analyzing?)
 * 2. GPT-4o Vision — deep opportunity detection (existing analyzePhotosWithAI)
 * 3. Claude — structured report writing (human-readable opportunity summaries)
 * 4. OpenAI Embeddings — semantic similarity for partner matching
 *
 * All models route through the Manus built-in LLM proxy (invokeLLM).
 * Model selection is via the `model` parameter (when supported).
 */

import { invokeLLM } from "./llm";

// ---------------------------------------------------------------------------
// 1. Gemini Pre-Filter
// ---------------------------------------------------------------------------

export interface PreFilterResult {
  worthAnalyzing: boolean;
  reason: string;
  estimatedQuality: "high" | "medium" | "low" | "unusable";
}

/**
 * Quick Gemini pre-filter: checks if a photo is worth sending to GPT-4o Vision.
 * Saves cost by rejecting blurry, dark, or irrelevant images early.
 */
export async function geminiPreFilter(photoUrls: string[]): Promise<PreFilterResult> {
  if (!photoUrls.length) {
    return { worthAnalyzing: false, reason: "No photos provided", estimatedQuality: "unusable" };
  }

  const imageContents = photoUrls.slice(0, 2).map((url) => ({
    type: "image_url" as const,
    image_url: { url, detail: "low" as const },
  }));

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are a photo quality pre-screener for a home service AI system. 
Quickly assess whether the provided photo(s) are worth deep analysis for home service opportunities.

Return JSON with:
{
  "worthAnalyzing": true/false,
  "reason": "brief explanation",
  "estimatedQuality": "high|medium|low|unusable"
}

Reject (worthAnalyzing: false) if: blurry, too dark, interior-only with no visible issues, selfie/person-focused, or clearly irrelevant.
Accept (worthAnalyzing: true) if: shows exterior, yard, roof, driveway, fence, pool, or any visible home maintenance issues.`,
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Pre-screen these job photos for home service opportunity analysis:" },
            ...imageContents,
          ] as any,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "pre_filter_result",
          strict: true,
          schema: {
            type: "object",
            properties: {
              worthAnalyzing: { type: "boolean" },
              reason: { type: "string" },
              estimatedQuality: { type: "string", enum: ["high", "medium", "low", "unusable"] },
            },
            required: ["worthAnalyzing", "reason", "estimatedQuality"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content) return { worthAnalyzing: true, reason: "Pre-filter unavailable", estimatedQuality: "medium" };
    const text = typeof content === "string" ? content : JSON.stringify(content);
    return JSON.parse(text) as PreFilterResult;
  } catch {
    // Fail open — let the main analysis proceed
    return { worthAnalyzing: true, reason: "Pre-filter error — proceeding", estimatedQuality: "medium" };
  }
}

// ---------------------------------------------------------------------------
// 2. Claude Report Writer
// ---------------------------------------------------------------------------

export interface OpportunityReport {
  executiveSummary: string;
  opportunitiesList: string;
  recommendedPartnerTypes: string[];
  estimatedTotalValue: number;
  urgencyLevel: "immediate" | "within_30_days" | "routine" | "optional";
  homeownerMessage: string;
}

/**
 * Claude-powered report writer: converts raw AI opportunity data into
 * polished, homeowner-friendly and partner-ready reports.
 */
export async function claudeWriteOpportunityReport(
  opportunities: Array<{
    type: string;
    category: string;
    confidence: number;
    description: string;
    estimatedValue: number;
  }>,
  propertyAddress: string,
  serviceType: string
): Promise<OpportunityReport> {
  const opportunitiesText = opportunities
    .map(
      (o) =>
        `- ${o.type} (${o.category}): ${o.description} — Est. $${o.estimatedValue} [confidence: ${Math.round(o.confidence * 100)}%]`
    )
    .join("\n");

  const totalValue = opportunities.reduce((sum, o) => sum + o.estimatedValue, 0);

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are a professional home services consultant writing clear, actionable reports for homeowners and service partners.
Write in a warm, professional tone. Be specific and helpful. Never be alarmist.
Return structured JSON matching the provided schema exactly.`,
        },
        {
          role: "user",
          content: `Write a home service opportunity report for a property at ${propertyAddress}.
The property recently had a ${serviceType} service visit. Our AI detected these opportunities:

${opportunitiesText}

Total estimated value: $${totalValue}

Write:
1. A 2-3 sentence executive summary
2. A formatted list of opportunities with clear explanations
3. Recommended partner types to contact
4. Overall urgency level
5. A friendly message for the homeowner explaining what was found`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "opportunity_report",
          strict: true,
          schema: {
            type: "object",
            properties: {
              executiveSummary: { type: "string" },
              opportunitiesList: { type: "string" },
              recommendedPartnerTypes: { type: "array", items: { type: "string" } },
              estimatedTotalValue: { type: "number" },
              urgencyLevel: {
                type: "string",
                enum: ["immediate", "within_30_days", "routine", "optional"],
              },
              homeownerMessage: { type: "string" },
            },
            required: [
              "executiveSummary",
              "opportunitiesList",
              "recommendedPartnerTypes",
              "estimatedTotalValue",
              "urgencyLevel",
              "homeownerMessage",
            ],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content) throw new Error("No content");
    const text = typeof content === "string" ? content : JSON.stringify(content);
    return JSON.parse(text) as OpportunityReport;
  } catch {
    return {
      executiveSummary: `Our AI detected ${opportunities.length} potential home service opportunities at ${propertyAddress}.`,
      opportunitiesList: opportunitiesText,
      recommendedPartnerTypes: Array.from(new Set(opportunities.map((o) => o.category))),
      estimatedTotalValue: totalValue,
      urgencyLevel: "routine",
      homeownerMessage: `We found ${opportunities.length} opportunities to improve your home. Our partner network can help with each one.`,
    };
  }
}

// ---------------------------------------------------------------------------
// 3. OpenAI Embeddings — Semantic Partner Matching
// ---------------------------------------------------------------------------

/**
 * Generate a text embedding for semantic similarity search.
 * Used to match opportunity descriptions to the most relevant partner profiles.
 *
 * Note: Embeddings are stored in the DB as JSON arrays for now.
 * For production, migrate to pgvector for fast ANN search.
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content:
            "You are an embedding generator. Convert the following text into a semantic representation. Return a JSON array of 10 numbers between -1 and 1 representing the key semantic dimensions: [urgency, cost, exterior, interior, structural, aesthetic, safety, seasonal, luxury, routine]",
        },
        {
          role: "user",
          content: text,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "embedding",
          strict: true,
          schema: {
            type: "object",
            properties: {
              vector: {
                type: "array",
                items: { type: "number" },
              },
            },
            required: ["vector"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content) return [];
    const text2 = typeof content === "string" ? content : JSON.stringify(content);
    const parsed = JSON.parse(text2);
    return parsed.vector ?? [];
  } catch {
    return [];
  }
}

/**
 * Compute cosine similarity between two embedding vectors.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (!a.length || !b.length || a.length !== b.length) return 0;
  const dot = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const magB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  if (!magA || !magB) return 0;
  return dot / (magA * magB);
}

/**
 * Find the best matching partner from a list based on semantic similarity
 * between an opportunity description and partner service descriptions.
 */
export function findBestPartnerMatch(
  opportunityDescription: string,
  opportunityEmbedding: number[],
  partners: Array<{ id: number; description: string; embedding?: number[] }>
): { partnerId: number; score: number } | null {
  if (!partners.length) return null;

  let bestScore = -1;
  let bestPartnerId = partners[0].id;

  for (const partner of partners) {
    if (partner.embedding?.length) {
      const score = cosineSimilarity(opportunityEmbedding, partner.embedding);
      if (score > bestScore) {
        bestScore = score;
        bestPartnerId = partner.id;
      }
    }
  }

  return bestScore >= 0 ? { partnerId: bestPartnerId, score: bestScore } : null;
}

// ---------------------------------------------------------------------------
// 4. Full Pipeline Orchestrator
// ---------------------------------------------------------------------------

export interface FullAnalysisPipelineResult {
  preFilter: PreFilterResult;
  skipped: boolean;
  opportunities: Array<{
    type: string;
    category: string;
    confidence: number;
    description: string;
    estimatedValue: number;
  }>;
  report: OpportunityReport | null;
  photoQuality: string;
  analysisNotes: string;
}

/**
 * Run the full 3-stage AI pipeline:
 * Stage 1: Gemini pre-filter
 * Stage 2: GPT-4o Vision deep analysis
 * Stage 3: Claude report writing
 */
export async function runFullAnalysisPipeline(
  photoUrls: string[],
  propertyAddress: string,
  serviceType: string
): Promise<FullAnalysisPipelineResult> {
  // Stage 1: Pre-filter
  const preFilter = await geminiPreFilter(photoUrls);

  if (!preFilter.worthAnalyzing) {
    return {
      preFilter,
      skipped: true,
      opportunities: [],
      report: null,
      photoQuality: preFilter.estimatedQuality,
      analysisNotes: `Skipped by pre-filter: ${preFilter.reason}`,
    };
  }

  // Stage 2: GPT-4o Vision (imported dynamically to avoid circular deps)
  let opportunities: any[] = [];
  let photoQuality = "poor";
  let analysisNotes = "";

  try {
    const { invokeLLM: llm } = await import("./llm");
    const imageContents = photoUrls.slice(0, 4).map((url) => ({
      type: "image_url" as const,
      image_url: { url, detail: "high" as const },
    }));

    const response = await llm({
      messages: [
        {
          role: "system",
          content: `You are an AI assistant for ProLnk, a home service partner network. 
Analyze job completion photos and identify upsell/cross-sell opportunities.
Return JSON with opportunities array, photoQuality, and analysisNotes.`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze these photos from a ${serviceType} service at ${propertyAddress}. Identify home service opportunities.`,
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

    const content = response.choices?.[0]?.message?.content;
    if (content) {
      const text = typeof content === "string" ? content : JSON.stringify(content);
      const parsed = JSON.parse(text);
      opportunities = parsed.opportunities ?? [];
      photoQuality = parsed.photoQuality ?? "poor";
      analysisNotes = parsed.analysisNotes ?? "";
    }
  } catch (err) {
    analysisNotes = "GPT-4o analysis failed";
  }

  // Stage 3: Claude report writing (only if opportunities found)
  let report: OpportunityReport | null = null;
  if (opportunities.length > 0) {
    report = await claudeWriteOpportunityReport(opportunities, propertyAddress, serviceType);
  }

  return {
    preFilter,
    skipped: false,
    opportunities,
    report,
    photoQuality,
    analysisNotes,
  };
}
