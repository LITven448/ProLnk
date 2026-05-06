/**
 * AI Data Collection Pipeline
 * 
 * Extracts structured property condition data from every AI scan
 * (partner job photos + homeowner TrustyPro scans) and stores it
 * in the propertyConditionData table for the data licensing business.
 * 
 * This runs AFTER the existing AI analysis — it takes the raw AI response
 * and extracts/enriches the structured fields without changing the
 * existing user-facing output.
 */

import { sql } from "drizzle-orm";
import { invokeLLM } from "./_core/llm";
import crypto from "crypto";

import type {
  RoomConditionScore,
  SystemAgeEstimate,
  MaterialIdentification,
  DamageFlag,
  ApplianceEntry,
  EnergyIndicator,
  SafetyFeature,
  StructuralIndicator,
  FutureValueField,
} from "../drizzle/schema";

// ── Types ────────────────────────────────────────────────────────────────────

export interface StructuredConditionData {
  roomConditionScores: RoomConditionScore[];
  systemAgeEstimates: SystemAgeEstimate[];
  materialIdentifications: MaterialIdentification[];
  damageFlags: DamageFlag[];
  applianceInventory: ApplianceEntry[];
  energyIndicators: EnergyIndicator[];
  safetyFeatures: SafetyFeature[];
  structuralIndicators: StructuralIndicator[];
  futureValueFields: FutureValueField[];
  overallConditionScore: number; // 1-100
  dataQualityScore: number;     // 0-100
}

export interface DataPipelineInput {
  // Source identification
  source: "partner_job" | "trustypro_scan" | "homeowner_upload" | "field_app";
  sourcePartnerId?: number;
  sourceUserId?: number;
  // Property linkage
  propertyId?: number;
  scanHistoryId?: number;
  photoId?: number;
  // Photo metadata
  photoUrl?: string;
  photoTimestamp?: Date;
  photoLatitude?: number;
  photoLongitude?: number;
  // Location (for anonymization)
  address?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  // The raw AI analysis result from the existing scan
  rawAiResponse: any;
  roomLabel?: string;
}

// ── Structured Data Extraction ───────────────────────────────────────────────

/**
 * Extract structured condition data from an existing AI scan result.
 * This is a secondary LLM call that takes the raw analysis and produces
 * the structured JSON fields for the data asset.
 */
export async function extractStructuredData(
  rawAnalysis: any,
  photoUrls: string[],
  roomLabel?: string
): Promise<StructuredConditionData> {
  const imageContents = photoUrls.slice(0, 2).map(url => ({
    type: "image_url" as const,
    image_url: { url, detail: "low" as const }, // low detail to save cost — structured extraction doesn't need high res
  }));

  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are a property condition data extraction system. Given an AI home analysis result and photos, extract STRUCTURED data fields for a property condition database.

You must extract ALL of the following categories. If a category has no data visible, return an empty array for it.

CATEGORIES:
1. roomConditionScores: Score each visible room/space 1-10 (10=perfect)
2. systemAgeEstimates: Estimate age of visible systems (HVAC, water heater, roof, electrical, plumbing)
3. materialIdentifications: Identify materials (flooring type, countertop, cabinet material, pipe material)
4. damageFlags: Flag any damage (water stains, cracks, mold, rust, wood rot, wear)
5. applianceInventory: List visible appliances with make/model if readable, estimated age, condition
6. energyIndicators: Note energy features (window type, insulation, smart thermostat, solar)
7. safetyFeatures: Check for smoke detectors, CO detectors, security cameras, fire extinguishers
8. structuralIndicators: Flag foundation issues, roof problems, settling, load-bearing concerns
9. futureValueFields: Capture anything else of potential value (pest signs, code issues, smart home devices, landscaping/drainage)

Also provide:
- overallConditionScore: 1-100 composite score for the property based on what's visible
- dataQualityScore: 0-100 based on photo clarity, field completeness, and confidence

Return JSON only.`,
        },
        {
          role: "user",
          content: [
            {
              type: "text" as const,
              text: `Room: ${roomLabel ?? "Unknown"}
Previous AI Analysis: ${JSON.stringify(rawAnalysis).slice(0, 3000)}

Extract all structured condition data fields from this analysis and photos.`,
            },
            ...imageContents,
          ] as any,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "structured_condition_data",
          strict: true,
          schema: {
            type: "object",
            properties: {
              roomConditionScores: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    roomLabel: { type: "string" },
                    conditionScore: { type: "number" },
                    notes: { type: "string" },
                  },
                  required: ["roomLabel", "conditionScore", "notes"],
                  additionalProperties: false,
                },
              },
              systemAgeEstimates: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    systemType: { type: "string" },
                    estimatedAge: { type: ["number", "null"] },
                    estimatedInstallYear: { type: ["number", "null"] },
                    confidence: { type: "number" },
                    notes: { type: "string" },
                  },
                  required: ["systemType", "estimatedAge", "estimatedInstallYear", "confidence", "notes"],
                  additionalProperties: false,
                },
              },
              materialIdentifications: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    location: { type: "string" },
                    materialType: { type: "string" },
                    materialSubtype: { type: "string" },
                    confidence: { type: "number" },
                  },
                  required: ["location", "materialType", "materialSubtype", "confidence"],
                  additionalProperties: false,
                },
              },
              damageFlags: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    location: { type: "string" },
                    damageType: { type: "string" },
                    severity: { type: "string", enum: ["minor", "moderate", "severe"] },
                    description: { type: "string" },
                    estimatedRepairCost: { type: ["number", "null"] },
                  },
                  required: ["location", "damageType", "severity", "description", "estimatedRepairCost"],
                  additionalProperties: false,
                },
              },
              applianceInventory: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    applianceType: { type: "string" },
                    make: { type: ["string", "null"] },
                    model: { type: ["string", "null"] },
                    estimatedAge: { type: ["number", "null"] },
                    condition: { type: "string", enum: ["new", "good", "fair", "worn", "end_of_life", "unknown"] },
                  },
                  required: ["applianceType", "make", "model", "estimatedAge", "condition"],
                  additionalProperties: false,
                },
              },
              energyIndicators: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    feature: { type: "string" },
                    value: { type: "string" },
                    energyImpact: { type: "string", enum: ["positive", "neutral", "negative"] },
                    notes: { type: "string" },
                  },
                  required: ["feature", "value", "energyImpact", "notes"],
                  additionalProperties: false,
                },
              },
              safetyFeatures: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    featureType: { type: "string" },
                    present: { type: "boolean" },
                    condition: { type: "string", enum: ["good", "fair", "poor", "missing"] },
                    location: { type: "string" },
                  },
                  required: ["featureType", "present", "condition", "location"],
                  additionalProperties: false,
                },
              },
              structuralIndicators: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    indicatorType: { type: "string" },
                    severity: { type: "string", enum: ["minor", "moderate", "severe"] },
                    location: { type: "string" },
                    description: { type: "string" },
                  },
                  required: ["indicatorType", "severity", "location", "description"],
                  additionalProperties: false,
                },
              },
              futureValueFields: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    category: { type: "string" },
                    observation: { type: "string" },
                    value: { type: "string" },
                  },
                  required: ["category", "observation", "value"],
                  additionalProperties: false,
                },
              },
              overallConditionScore: { type: "number" },
              dataQualityScore: { type: "number" },
            },
            required: [
              "roomConditionScores", "systemAgeEstimates", "materialIdentifications",
              "damageFlags", "applianceInventory", "energyIndicators", "safetyFeatures",
              "structuralIndicators", "futureValueFields", "overallConditionScore", "dataQualityScore"
            ],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content) throw new Error("No LLM response");
    return (typeof content === "string" ? JSON.parse(content) : content) as StructuredConditionData;
  } catch (err) {
    console.warn("[DataPipeline] Structured extraction failed, using fallback:", err);
    return buildFallbackFromRawAnalysis(rawAnalysis, roomLabel);
  }
}

/**
 * Fallback: extract what we can from the raw AI analysis without a second LLM call.
 * This ensures we always capture SOME structured data even if the extraction LLM fails.
 */
function buildFallbackFromRawAnalysis(rawAnalysis: any, roomLabel?: string): StructuredConditionData {
  const issues = rawAnalysis?.issues ?? rawAnalysis?.opportunities ?? [];
  const condition = rawAnalysis?.overallCondition ?? "unknown";
  
  const conditionMap: Record<string, number> = {
    excellent: 90, good: 70, fair: 50, needs_attention: 30, critical: 15, unknown: 50,
  };

  const damageFlags: DamageFlag[] = [];
  const materialIds: MaterialIdentification[] = [];

  for (const issue of issues) {
    if (issue.offerTrack === "repair" || issue.severity === "urgent") {
      damageFlags.push({
        location: roomLabel ?? "unknown",
        damageType: issue.tradeType ?? issue.type ?? "unknown",
        severity: issue.severity === "urgent" ? "severe" : issue.severity === "moderate" ? "moderate" : "minor",
        description: issue.description ?? "",
        estimatedRepairCost: null,
      });
    }
  }

  return {
    roomConditionScores: roomLabel ? [{
      roomLabel,
      conditionScore: Math.round((conditionMap[condition] ?? 50) / 10),
      notes: rawAnalysis?.summary ?? "",
    }] : [],
    systemAgeEstimates: [],
    materialIdentifications: materialIds,
    damageFlags,
    applianceInventory: [],
    energyIndicators: [],
    safetyFeatures: [],
    structuralIndicators: [],
    futureValueFields: [],
    overallConditionScore: conditionMap[condition] ?? 50,
    dataQualityScore: 30, // Low quality since this is fallback
  };
}

// ── Anonymization ────────────────────────────────────────────────────────────

/**
 * Generate an anonymized hash from an address.
 * Used for deduplication in licensed datasets without exposing PII.
 */
export function anonymizeAddress(address: string): string {
  return crypto
    .createHash("sha256")
    .update(address.toLowerCase().trim())
    .digest("hex");
}

// ── Database Storage ─────────────────────────────────────────────────────────

/**
 * Store a structured condition data record in the database.
 * Called after every AI scan (both partner job photos and TrustyPro scans).
 */
export async function storeConditionData(
  db: any,
  input: DataPipelineInput,
  structured: StructuredConditionData
): Promise<number | null> {
  try {
    const fieldsPopulated = countPopulatedFields(structured);
    const anonymizedHash = input.address ? anonymizeAddress(input.address) : null;

    const result = await (db as any).execute(
      sql`INSERT INTO propertyConditionData (
        propertyId, scanHistoryId, photoId, source, sourcePartnerId, sourceUserId,
        photoUrl, photoTimestamp, photoLatitude, photoLongitude,
        roomLabel, roomConditionScore,
        roomConditionScores, systemAgeEstimates, materialIdentifications,
        damageFlags, applianceInventory, energyIndicators, safetyFeatures,
        structuralIndicators, futureValueFields,
        hasBeforeAfter, overallConditionScore, overallConditionLabel,
        dataQualityScore, fieldsPopulated, totalPossibleFields,
        zipCode, city, state, anonymizedHash, rawAiResponse
      ) VALUES (
        ${input.propertyId ?? null}, ${input.scanHistoryId ?? null}, ${input.photoId ?? null},
        ${input.source}, ${input.sourcePartnerId ?? null}, ${input.sourceUserId ?? null},
        ${input.photoUrl ?? null}, ${input.photoTimestamp ?? null},
        ${input.photoLatitude ?? null}, ${input.photoLongitude ?? null},
        ${input.roomLabel ?? null}, ${structured.roomConditionScores?.[0]?.conditionScore ?? null},
        ${JSON.stringify(structured.roomConditionScores)},
        ${JSON.stringify(structured.systemAgeEstimates)},
        ${JSON.stringify(structured.materialIdentifications)},
        ${JSON.stringify(structured.damageFlags)},
        ${JSON.stringify(structured.applianceInventory)},
        ${JSON.stringify(structured.energyIndicators)},
        ${JSON.stringify(structured.safetyFeatures)},
        ${JSON.stringify(structured.structuralIndicators)},
        ${JSON.stringify(structured.futureValueFields)},
        ${false},
        ${structured.overallConditionScore},
        ${mapScoreToLabel(structured.overallConditionScore)},
        ${structured.dataQualityScore},
        ${fieldsPopulated}, ${17},
        ${input.zipCode ?? null}, ${input.city ?? null}, ${input.state ?? null},
        ${anonymizedHash},
        ${JSON.stringify(input.rawAiResponse)}
      )`
    );

    const insertId = result?.[0]?.insertId ?? result?.insertId ?? null;
    console.log(`[DataPipeline] Stored condition data record #${insertId} (${fieldsPopulated}/17 fields, quality: ${structured.dataQualityScore})`);
    return insertId;
  } catch (err) {
    console.error("[DataPipeline] Failed to store condition data:", err);
    return null;
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function countPopulatedFields(data: StructuredConditionData): number {
  let count = 0;
  if (data.roomConditionScores.length > 0) count++;
  if (data.systemAgeEstimates.length > 0) count++;
  if (data.materialIdentifications.length > 0) count++;
  if (data.damageFlags.length > 0) count++;
  if (data.applianceInventory.length > 0) count++;
  if (data.energyIndicators.length > 0) count++;
  if (data.safetyFeatures.length > 0) count++;
  if (data.structuralIndicators.length > 0) count++;
  if (data.futureValueFields.length > 0) count++;
  if (data.overallConditionScore > 0) count++;
  if (data.dataQualityScore > 0) count++;
  // Room label, photo metadata, geo data, renovation tracking, before/after, anonymized hash
  count += 6; // These are always populated from the input context
  return Math.min(count, 17);
}

function mapScoreToLabel(score: number): "excellent" | "good" | "fair" | "needs_attention" | "critical" {
  if (score >= 80) return "excellent";
  if (score >= 60) return "good";
  if (score >= 40) return "fair";
  if (score >= 20) return "needs_attention";
  return "critical";
}

// ── Data Consent Check ───────────────────────────────────────────────────────

/**
 * Check if a user has consented to data collection.
 * Returns true if consent exists and hasn't been revoked.
 */
export async function hasDataConsent(db: any, userId: number): Promise<boolean> {
  try {
    const rows = await (db as any).execute(
      sql`SELECT id FROM homeownerDataConsent 
          WHERE userId = ${userId} 
          AND consentAnonymizedDataLicensing = true 
          AND revokedAt IS NULL 
          LIMIT 1`
    ) as any;
    return (rows?.[0]?.length ?? rows?.length ?? 0) > 0;
  } catch {
    return false;
  }
}

/**
 * Get aggregate stats for the data asset (used by admin dashboard).
 */
export async function getDataAssetStats(db: any): Promise<{
  totalRecords: number;
  avgQualityScore: number;
  avgFieldsPopulated: number;
  bySource: Record<string, number>;
  byCondition: Record<string, number>;
  consentedUsers: number;
  uniqueProperties: number;
  uniqueZipCodes: number;
}> {
  try {
    const [totalRows] = await (db as any).execute(
      sql`SELECT COUNT(*) as total FROM propertyConditionData`
    ) as any;
    const totalRecords = totalRows?.[0]?.total ?? totalRows?.total ?? 0;

    const [avgRows] = await (db as any).execute(
      sql`SELECT AVG(dataQualityScore) as avgQuality, AVG(fieldsPopulated) as avgFields FROM propertyConditionData`
    ) as any;

    const [sourceRows] = await (db as any).execute(
      sql`SELECT source, COUNT(*) as cnt FROM propertyConditionData GROUP BY source`
    ) as any;
    const bySource: Record<string, number> = {};
    for (const row of (sourceRows ?? [])) {
      bySource[row.source] = row.cnt;
    }

    const [condRows] = await (db as any).execute(
      sql`SELECT overallConditionLabel, COUNT(*) as cnt FROM propertyConditionData WHERE overallConditionLabel IS NOT NULL GROUP BY overallConditionLabel`
    ) as any;
    const byCondition: Record<string, number> = {};
    for (const row of (condRows ?? [])) {
      byCondition[row.overallConditionLabel] = row.cnt;
    }

    const [consentRows] = await (db as any).execute(
      sql`SELECT COUNT(*) as cnt FROM homeownerDataConsent WHERE consentAnonymizedDataLicensing = true AND revokedAt IS NULL`
    ) as any;

    const [propRows] = await (db as any).execute(
      sql`SELECT COUNT(DISTINCT propertyId) as cnt FROM propertyConditionData WHERE propertyId IS NOT NULL`
    ) as any;

    const [zipRows] = await (db as any).execute(
      sql`SELECT COUNT(DISTINCT zipCode) as cnt FROM propertyConditionData WHERE zipCode IS NOT NULL`
    ) as any;

    return {
      totalRecords,
      avgQualityScore: Math.round(avgRows?.[0]?.avgQuality ?? 0),
      avgFieldsPopulated: Math.round((avgRows?.[0]?.avgFields ?? 0) * 10) / 10,
      bySource,
      byCondition,
      consentedUsers: consentRows?.[0]?.cnt ?? 0,
      uniqueProperties: propRows?.[0]?.cnt ?? 0,
      uniqueZipCodes: zipRows?.[0]?.cnt ?? 0,
    };
  } catch (err) {
    console.error("[DataPipeline] Failed to get stats:", err);
    return {
      totalRecords: 0, avgQualityScore: 0, avgFieldsPopulated: 0,
      bySource: {}, byCondition: {}, consentedUsers: 0, uniqueProperties: 0, uniqueZipCodes: 0,
    };
  }
}
