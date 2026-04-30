/**
 * Scout Router — Full Home Assessment System
 *
 * Scouts are ProLnk-certified property documentation specialists who conduct
 * comprehensive whole-home assessments across 12 zones, generating an AI-powered
 * Home Intelligence Report that feeds directly into the Bid Board marketplace.
 *
 * Scout earns:
 *   1. Assessment fee — set by Scout, paid directly by homeowner (not through ProLnk)
 *   2. Origination commission — % of every job that closes from their report findings
 *   3. Project management fee (optional) — if Scout GCs the work
 *
 * The assessment is structured as a "Property Documentation Service" not a
 * licensed home inspection. AI generates the condition analysis; Scout captures
 * the raw data. This distinction is legally important in Texas (TREC licensing).
 */

import { z } from "zod";
import { sql } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, publicProcedure } from "../_core/trpc";
import { getDb } from "../db";
import { invokeLLM, VLM_MODELS } from "../_core/llm";
import { generateImage } from "../_core/imageGeneration";
import { storagePut } from "../storage";
import { notifyOwner } from "../_core/notification";
import { n8n } from "../n8n-triggers";
import pdfkit from "pdfkit";

// ─── Zone Definitions ─────────────────────────────────────────────────────────

export const ASSESSMENT_ZONES = [
  { number: 1,  name: "roof_gutters",              label: "Roof & Gutters",              icon: "🏠" },
  { number: 2,  name: "exterior_siding_foundation", label: "Exterior / Siding / Foundation", icon: "🧱" },
  { number: 3,  name: "windows_doors",              label: "Windows & Doors",             icon: "🪟" },
  { number: 4,  name: "hvac",                       label: "HVAC Systems",                icon: "❄️"  },
  { number: 5,  name: "electrical",                 label: "Electrical",                  icon: "⚡" },
  { number: 6,  name: "plumbing",                   label: "Plumbing",                    icon: "🚿" },
  { number: 7,  name: "appliances",                 label: "Appliances",                  icon: "🏭" },
  { number: 8,  name: "interior_rooms",             label: "Interior Rooms",              icon: "🛋️"  },
  { number: 9,  name: "attic",                      label: "Attic",                       icon: "🔺" },
  { number: 10, name: "crawlspace_basement",        label: "Crawl Space / Basement",      icon: "⬇️"  },
  { number: 11, name: "garage",                     label: "Garage",                      icon: "🚗" },
  { number: 12, name: "exterior_property",          label: "Exterior Property",           icon: "🌿" },
] as const;

// ─── Health Score Calculator ──────────────────────────────────────────────────

function calculateHealthScore(findings: any[]): number {
  if (!findings.length) return 100;
  const weights: Record<string, number> = {
    safety_hazard:  -25,
    code_violation: -20,
    immediate:      -12,
    routine:        -5,
    deferred:       -2,
    cosmetic:       -1,
  };
  let score = 100;
  for (const f of findings) {
    score += weights[f.urgency] ?? -3;
  }
  return Math.max(0, Math.min(100, Math.round(score)));
}

// ─── AI Zone Analysis ─────────────────────────────────────────────────────────

async function analyzeZonePhotos(
  zoneName: string,
  zoneLabel: string,
  photoUrls: string[],
  propertyAddress: string
): Promise<{
  condition: "good" | "fair" | "poor" | "critical" | "not_applicable";
  findings: Array<{
    componentName: string;
    componentType: string;
    condition: string;
    urgency: string;
    description: string;
    estimatedRepairCost: number;
    estimatedReplacementCost: number;
    estimatedAge: number;
    tradeType: string;
    recommendedAction: string;
    aiConfidence: number;
  }>;
  aiSummary: string;
}> {
  try {
    const imageContents = photoUrls.slice(0, 4).map(url => ({
      type: "image_url" as const,
      image_url: { url, detail: "high" as const },
    }));

    const response = await invokeLLM({
      model: VLM_MODELS.analyze.model,
      provider: VLM_MODELS.analyze.provider,
      thinking: true,
      maxTokens: 4096,
      messages: [
        {
          role: "system",
          content: `You are a property documentation AI assistant for ProLnk Scouts. You analyze photos of home systems and surfaces to document their current condition.

IMPORTANT: You are providing documentation observations, NOT a licensed home inspection. Document what is visibly observable. Do not certify structural integrity.

For the ${zoneLabel} zone, analyze each visible component and document:
1. Condition (good/fair/poor/critical/not_applicable)
2. Estimated age if visible from labels or wear patterns
3. Specific issues observed with precise descriptions
4. Estimated repair vs. replacement costs (use DFW market rates)
5. Urgency level: safety_hazard | code_violation | immediate | routine | deferred | cosmetic
6. Which trade would handle this work

Be thorough — document EVERYTHING visible, even minor items. A comprehensive report is the Scout's value.`,
        },
        {
          role: "user",
          content: [
            {
              type: "text" as const,
              text: `Document the ${zoneLabel} zone at: ${propertyAddress}. Analyze all visible components.`,
            },
            ...imageContents,
          ],
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "zone_analysis",
          strict: true,
          schema: {
            type: "object",
            properties: {
              overallCondition: { type: "string", enum: ["good", "fair", "poor", "critical", "not_applicable"] },
              findings: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    componentName: { type: "string" },
                    componentType: { type: "string" },
                    condition: { type: "string" },
                    urgency: { type: "string" },
                    description: { type: "string" },
                    estimatedRepairCost: { type: "number" },
                    estimatedReplacementCost: { type: "number" },
                    estimatedAge: { type: "number" },
                    tradeType: { type: "string" },
                    recommendedAction: { type: "string" },
                    aiConfidence: { type: "number" },
                  },
                  required: ["componentName","componentType","condition","urgency","description","estimatedRepairCost","estimatedReplacementCost","estimatedAge","tradeType","recommendedAction","aiConfidence"],
                  additionalProperties: false,
                },
              },
              aiSummary: { type: "string" },
            },
            required: ["overallCondition", "findings", "aiSummary"],
            additionalProperties: false,
          },
        },
      },
    });

    const content = response.choices?.[0]?.message?.content;
    const parsed = typeof content === "string" ? JSON.parse(content) : content;
    return {
      condition: parsed.overallCondition,
      findings: parsed.findings ?? [],
      aiSummary: parsed.aiSummary ?? "",
    };
  } catch (err) {
    console.error("[Scout] Zone analysis failed:", err);
    return { condition: "not_applicable", findings: [], aiSummary: "Analysis unavailable" };
  }
}

// ─── Report Generator ─────────────────────────────────────────────────────────

async function generateHomeIntelligenceReport(
  assessmentId: number,
  address: string,
  allFindings: any[],
  zoneResults: any[]
): Promise<{
  healthScore: number;
  executiveSummary: string;
  homeownerMessage: string;
  keyFindings: any[];
  prioritizedActions: any[];
  totalCost: number;
  immediateActionCost: number;
  routineMaintenanceCost: number;
  deferredCost: number;
}> {
  const healthScore = calculateHealthScore(allFindings);
  const totalCost = allFindings.reduce((s, f) => s + (f.estimatedRepairCost || 0), 0);
  const immediateActionCost = allFindings
    .filter(f => ["safety_hazard","code_violation","immediate"].includes(f.urgency))
    .reduce((s, f) => s + (f.estimatedRepairCost || 0), 0);
  const routineMaintenanceCost = allFindings
    .filter(f => f.urgency === "routine")
    .reduce((s, f) => s + (f.estimatedRepairCost || 0), 0);
  const deferredCost = allFindings
    .filter(f => ["deferred","cosmetic"].includes(f.urgency))
    .reduce((s, f) => s + (f.estimatedRepairCost || 0), 0);

  const criticalCount = allFindings.filter(f => ["safety_hazard","code_violation"].includes(f.urgency)).length;
  const immediateCount = allFindings.filter(f => f.urgency === "immediate").length;

  try {
    const response = await invokeLLM({
      model: "claude-sonnet-4-5-20251022",
      provider: "anthropic",
      maxTokens: 2048,
      thinking: false,
      messages: [
        {
          role: "system",
          content: `You write Home Intelligence Reports for TrustyPro/ProLnk. Your tone is professional, clear, and helpful — like a trusted advisor, not an alarmist. You focus on facts and actionable next steps. Keep the homeowner message warm and empowering.`,
        },
        {
          role: "user",
          content: `Write a Home Intelligence Report summary for: ${address}

Home Health Score: ${healthScore}/100
Total findings: ${allFindings.length} (${criticalCount} safety/code, ${immediateCount} immediate)
Total estimated cost: $${totalCost.toLocaleString()}
Immediate action cost: $${immediateActionCost.toLocaleString()}

Top findings (by urgency):
${allFindings.slice(0, 8).map(f => `- ${f.componentName}: ${f.description} ($${f.estimatedRepairCost?.toLocaleString() ?? 0})`).join("\n")}

Write:
1. executiveSummary (2-3 sentences, professional)
2. homeownerMessage (warm, empowering, 3-4 sentences)
3. keyFindings (top 5 as array of {finding, whyItMatters, estimatedCost})
4. prioritizedActions (top 5 action items ranked by urgency + ROI)`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "report_summary",
          strict: true,
          schema: {
            type: "object",
            properties: {
              executiveSummary: { type: "string" },
              homeownerMessage: { type: "string" },
              keyFindings: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    finding: { type: "string" },
                    whyItMatters: { type: "string" },
                    estimatedCost: { type: "number" },
                  },
                  required: ["finding","whyItMatters","estimatedCost"],
                  additionalProperties: false,
                },
              },
              prioritizedActions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    action: { type: "string" },
                    urgency: { type: "string" },
                    estimatedCost: { type: "number" },
                    tradeType: { type: "string" },
                  },
                  required: ["action","urgency","estimatedCost","tradeType"],
                  additionalProperties: false,
                },
              },
            },
            required: ["executiveSummary","homeownerMessage","keyFindings","prioritizedActions"],
            additionalProperties: false,
          },
        },
      },
    });
    const content = response.choices?.[0]?.message?.content;
    const parsed = typeof content === "string" ? JSON.parse(content) : content;
    return {
      healthScore,
      executiveSummary: parsed.executiveSummary,
      homeownerMessage: parsed.homeownerMessage,
      keyFindings: parsed.keyFindings ?? [],
      prioritizedActions: parsed.prioritizedActions ?? [],
      totalCost,
      immediateActionCost,
      routineMaintenanceCost,
      deferredCost,
    };
  } catch (err) {
    console.error("[Scout] Report generation failed:", err);
    return {
      healthScore,
      executiveSummary: `Assessment of ${address} complete. ${allFindings.length} items documented across 12 zones.`,
      homeownerMessage: `Your home assessment is complete. Our Scout has documented ${allFindings.length} items across all major systems. Review the findings and connect with verified ProLnk contractors to address any issues.`,
      keyFindings: allFindings.slice(0, 5).map(f => ({ finding: f.componentName, whyItMatters: f.description, estimatedCost: f.estimatedRepairCost })),
      prioritizedActions: allFindings.slice(0, 5).map(f => ({ action: f.recommendedAction, urgency: f.urgency, estimatedCost: f.estimatedRepairCost, tradeType: f.tradeType })),
      totalCost,
      immediateActionCost,
      routineMaintenanceCost,
      deferredCost,
    };
  }
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const scoutRouter = router({

  // ── Get zone definitions ────────────────────────────────────────────────────
  getZones: publicProcedure.query(() => ASSESSMENT_ZONES),

  // ── Create a new assessment ─────────────────────────────────────────────────
  createAssessment: protectedProcedure
    .input(z.object({
      propertyAddress: z.string().min(5).max(500),
      propertyZip: z.string().max(20).optional(),
      propertyCity: z.string().max(100).optional(),
      propertyState: z.string().max(50).optional(),
      propertyLat: z.number().optional(),
      propertyLng: z.number().optional(),
      homeownerName: z.string().max(255).optional(),
      homeownerEmail: z.string().email().optional(),
      homeownerPhone: z.string().max(30).optional(),
      homeownerConsent: z.boolean().default(false),
      propertyType: z.enum(["single_family","condo","townhome","multifamily","commercial","other"]).default("single_family"),
      yearBuilt: z.number().optional(),
      squareFootage: z.number().optional(),
      assessmentType: z.enum(["residential","commercial","multifamily"]).default("residential"),
      assessmentFeeCharged: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Verify caller is an approved partner (Scout certified or regular partner)
      const partnerRows = await (db as any).execute(sql`
        SELECT id, businessName, status, isScout FROM partners WHERE userId = ${ctx.user.id} LIMIT 1
      `);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner || partner.status !== "approved") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Only approved partners can create assessments" });
      }

      // Create assessment record
      const result = await (db as any).execute(sql`
        INSERT INTO scoutAssessments (
          scoutPartnerId, propertyAddress, propertyZip, propertyCity, propertyState,
          propertyLat, propertyLng, homeownerName, homeownerEmail, homeownerPhone,
          homeownerConsent, homeownerConsentAt, propertyType, yearBuilt, squareFootage,
          assessmentType, assessmentFeeCharged, status, startedAt
        ) VALUES (
          ${partner.id},
          ${input.propertyAddress}, ${input.propertyZip ?? null}, ${input.propertyCity ?? null},
          ${input.propertyState ?? null}, ${input.propertyLat ?? null}, ${input.propertyLng ?? null},
          ${input.homeownerName ?? null}, ${input.homeownerEmail ?? null}, ${input.homeownerPhone ?? null},
          ${input.homeownerConsent ? 1 : 0}, ${input.homeownerConsent ? new Date() : null},
          ${input.propertyType}, ${input.yearBuilt ?? null}, ${input.squareFootage ?? null},
          ${input.assessmentType}, ${input.assessmentFeeCharged ?? null}, 'in_progress', NOW()
        )
      `);
      const assessmentId = (result.rows || result).insertId ?? result.insertId;

      // Create all 12 zone records (pending)
      for (const zone of ASSESSMENT_ZONES) {
        await (db as any).execute(sql`
          INSERT INTO assessmentZones (assessmentId, zoneNumber, zoneName, status)
          VALUES (${assessmentId}, ${zone.number}, ${zone.name}, 'pending')
        `);
      }

      return { assessmentId, zones: ASSESSMENT_ZONES, message: "Assessment created. Complete all 12 zones." };
    }),

  // ── Get assessment with all zones and findings ──────────────────────────────
  getAssessment: protectedProcedure
    .input(z.object({ assessmentId: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return null;

      const partnerRows = await (db as any).execute(sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`);
      const partner = (partnerRows.rows || partnerRows)[0];

      const assessmentRows = await (db as any).execute(sql`
        SELECT a.*, p.businessName as scoutBusinessName
        FROM scoutAssessments a
        JOIN partners p ON a.scoutPartnerId = p.id
        WHERE a.id = ${input.assessmentId}
          AND (a.scoutPartnerId = ${partner?.id ?? 0} OR ${ctx.user.role === "admin" ? 1 : 0} = 1)
        LIMIT 1
      `);
      const assessment = (assessmentRows.rows || assessmentRows)[0];
      if (!assessment) throw new TRPCError({ code: "NOT_FOUND" });

      const zonesRows = await (db as any).execute(sql`
        SELECT * FROM assessmentZones WHERE assessmentId = ${input.assessmentId} ORDER BY zoneNumber ASC
      `);
      const zones = zonesRows.rows || zonesRows;

      const findingsRows = await (db as any).execute(sql`
        SELECT * FROM assessmentFindings WHERE assessmentId = ${input.assessmentId} ORDER BY urgency ASC, id ASC
      `);
      const findings = findingsRows.rows || findingsRows;

      return { assessment, zones, findings };
    }),

  // ── Upload photos for a zone and run AI analysis ────────────────────────────
  submitZonePhotos: protectedProcedure
    .input(z.object({
      assessmentId: z.number().int().positive(),
      zoneNumber: z.number().int().min(1).max(12),
      photoUrls: z.array(z.string().url()).min(1).max(8),
      componentNotes: z.string().max(2000).optional(),
      manualFindings: z.array(z.object({
        componentName: z.string(),
        condition: z.string(),
        notes: z.string(),
        estimatedAge: z.number().optional(),
      })).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      // Verify ownership
      const assessmentRows = await (db as any).execute(sql`
        SELECT a.id, a.propertyAddress, a.scoutPartnerId, p.id as partnerId
        FROM scoutAssessments a
        JOIN partners p ON a.scoutPartnerId = p.id
        WHERE a.id = ${input.assessmentId} AND p.userId = ${ctx.user.id}
        LIMIT 1
      `);
      const assessment = (assessmentRows.rows || assessmentRows)[0];
      if (!assessment) throw new TRPCError({ code: "NOT_FOUND", message: "Assessment not found" });

      const zone = ASSESSMENT_ZONES.find(z => z.number === input.zoneNumber);
      if (!zone) throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid zone number" });

      // Mark zone in_progress
      await (db as any).execute(sql`
        UPDATE assessmentZones
        SET status = 'in_progress', photoCount = ${input.photoUrls.length}
        WHERE assessmentId = ${input.assessmentId} AND zoneNumber = ${input.zoneNumber}
      `);

      // Run AI analysis on zone photos
      const analysis = await analyzeZonePhotos(
        zone.name,
        zone.label,
        input.photoUrls,
        assessment.propertyAddress
      );

      // Update zone with results
      await (db as any).execute(sql`
        UPDATE assessmentZones
        SET status = 'complete',
            overallCondition = ${analysis.condition},
            aiSummary = ${analysis.aiSummary},
            notes = ${input.componentNotes ?? null},
            completedAt = NOW()
        WHERE assessmentId = ${input.assessmentId} AND zoneNumber = ${input.zoneNumber}
      `);

      // Get zone ID
      const zoneRows = await (db as any).execute(sql`
        SELECT id FROM assessmentZones WHERE assessmentId = ${input.assessmentId} AND zoneNumber = ${input.zoneNumber} LIMIT 1
      `);
      const zoneId = (zoneRows.rows || zoneRows)[0]?.id;

      // Insert findings
      for (const finding of analysis.findings) {
        await (db as any).execute(sql`
          INSERT INTO assessmentFindings (
            assessmentId, zoneId, componentName, componentType, condition, urgency,
            description, photoUrls, estimatedAge, estimatedRepairCost, estimatedReplacementCost,
            recommendedAction, tradeType, aiConfidence
          ) VALUES (
            ${input.assessmentId}, ${zoneId}, ${finding.componentName}, ${finding.componentType},
            ${finding.condition}, ${finding.urgency}, ${finding.description},
            ${JSON.stringify(input.photoUrls)}, ${finding.estimatedAge},
            ${finding.estimatedRepairCost}, ${finding.estimatedReplacementCost},
            ${finding.recommendedAction}, ${finding.tradeType}, ${finding.aiConfidence}
          )
        `);
      }

      // Update assessment totals
      await (db as any).execute(sql`
        UPDATE scoutAssessments SET
          totalFindingsCount = (SELECT COUNT(*) FROM assessmentFindings WHERE assessmentId = ${input.assessmentId}),
          criticalFindingsCount = (SELECT COUNT(*) FROM assessmentFindings WHERE assessmentId = ${input.assessmentId} AND urgency IN ('safety_hazard','code_violation')),
          totalEstimatedRepairCost = (SELECT COALESCE(SUM(estimatedRepairCost),0) FROM assessmentFindings WHERE assessmentId = ${input.assessmentId}),
          updatedAt = NOW()
        WHERE id = ${input.assessmentId}
      `);

      return {
        zoneComplete: true,
        condition: analysis.condition,
        findingsCount: analysis.findings.length,
        aiSummary: analysis.aiSummary,
        findings: analysis.findings,
      };
    }),

  // ── Generate the Home Intelligence Report ───────────────────────────────────
  generateReport: protectedProcedure
    .input(z.object({
      assessmentId: z.number().int().positive(),
      matterportScanUrl: z.string().url().optional(),
      additionalNotes: z.string().max(2000).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const assessmentRows = await (db as any).execute(sql`
        SELECT a.*, p.id as partnerId
        FROM scoutAssessments a
        JOIN partners p ON a.scoutPartnerId = p.id
        WHERE a.id = ${input.assessmentId} AND p.userId = ${ctx.user.id}
        LIMIT 1
      `);
      const assessment = (assessmentRows.rows || assessmentRows)[0];
      if (!assessment) throw new TRPCError({ code: "NOT_FOUND" });

      // Get all findings
      const findingsRows = await (db as any).execute(sql`
        SELECT * FROM assessmentFindings WHERE assessmentId = ${input.assessmentId} ORDER BY urgency ASC
      `);
      const allFindings = findingsRows.rows || findingsRows;

      // Get zone results
      const zonesRows = await (db as any).execute(sql`
        SELECT * FROM assessmentZones WHERE assessmentId = ${input.assessmentId} ORDER BY zoneNumber
      `);
      const zoneResults = zonesRows.rows || zonesRows;

      // Generate report
      const report = await generateHomeIntelligenceReport(
        input.assessmentId,
        assessment.propertyAddress,
        allFindings,
        zoneResults
      );

      // Save report
      await (db as any).execute(sql`
        INSERT INTO assessmentReports (
          assessmentId, homeHealthScore,
          executiveSummary, homeownerMessage, keyFindings, prioritizedActionItems,
          totalEstimatedCost, immediateActionCost, routineMaintenanceCost, deferredImprovementCost,
          generatedAt, generatedBy, modelUsed
        ) VALUES (
          ${input.assessmentId}, ${report.healthScore},
          ${report.executiveSummary}, ${report.homeownerMessage},
          ${JSON.stringify(report.keyFindings)}, ${JSON.stringify(report.prioritizedActions)},
          ${report.totalCost}, ${report.immediateActionCost},
          ${report.routineMaintenanceCost}, ${report.deferredCost},
          NOW(), 'ai', 'gpt-4o+claude-sonnet'
        )
        ON DUPLICATE KEY UPDATE
          homeHealthScore = VALUES(homeHealthScore),
          executiveSummary = VALUES(executiveSummary),
          homeownerMessage = VALUES(homeownerMessage),
          keyFindings = VALUES(keyFindings),
          prioritizedActionItems = VALUES(prioritizedActionItems),
          totalEstimatedCost = VALUES(totalEstimatedCost),
          immediateActionCost = VALUES(immediateActionCost),
          routineMaintenanceCost = VALUES(routineMaintenanceCost),
          deferredImprovementCost = VALUES(deferredImprovementCost),
          generatedAt = NOW()
      `);

      // Update assessment status
      await (db as any).execute(sql`
        UPDATE scoutAssessments SET
          homeHealthScore = ${report.healthScore},
          aiExecutiveSummary = ${report.executiveSummary},
          aiRecommendations = ${JSON.stringify(report.prioritizedActions)},
          matterportScanUrl = ${input.matterportScanUrl ?? null},
          status = 'report_generated',
          completedAt = NOW()
        WHERE id = ${input.assessmentId}
      `);

      // Auto-create opportunities from high-urgency findings
      let opportunitiesCreated = 0;
      for (const finding of allFindings.filter((f: any) => ["safety_hazard","code_violation","immediate"].includes(f.urgency) && f.aiConfidence >= 0.65)) {
        try {
          // Create a shell job for this finding
          const jobResult = await (db as any).execute(sql`
            INSERT INTO jobs (partnerId, loggedByUserId, serviceAddress, serviceType, notes, aiAnalysisStatus, status, assessmentId)
            VALUES (${assessment.scoutPartnerId}, ${ctx.user.id}, ${assessment.propertyAddress}, ${finding.tradeType},
                    ${`[Scout Assessment Finding] ${finding.componentName}: ${finding.description}`},
                    'complete', 'opportunities_sent', ${input.assessmentId})
          `);
          const jobId = (jobResult.rows || jobResult).insertId ?? jobResult.insertId;

          await (db as any).execute(sql`
            INSERT INTO opportunities (
              jobId, sourcePartnerId, opportunityType, opportunityCategory,
              description, aiConfidence, adminReviewStatus, status, estimatedJobValue, routingPosition
            ) VALUES (
              ${jobId}, ${assessment.scoutPartnerId}, ${finding.tradeType}, ${finding.componentType ?? finding.tradeType},
              ${`${finding.componentName}: ${finding.description}. Recommended: ${finding.recommendedAction}`},
              ${finding.aiConfidence},
              ${finding.aiConfidence >= 0.85 ? 'approved' : 'pending_review'},
              'pending', ${finding.estimatedRepairCost ?? 0}, 0
            )
          `);
          opportunitiesCreated++;
        } catch (err) {
          console.error("[Scout] Failed to create opportunity from finding:", err);
        }
      }

      // Notify admin of completed assessment
      notifyOwner({
        title: `Scout Assessment Complete — ${assessment.propertyAddress}`,
        content: `Health Score: ${report.healthScore}/100. ${allFindings.length} findings, ${opportunitiesCreated} opportunities created. Est. total: $${report.totalCost.toLocaleString()}`,
      }).catch(() => {});

      return {
        ...report,
        assessmentId: input.assessmentId,
        opportunitiesCreated,
        message: "Home Intelligence Report generated successfully.",
      };
    }),

  // ── Share report with homeowner ─────────────────────────────────────────────
  shareReport: protectedProcedure
    .input(z.object({
      assessmentId: z.number().int().positive(),
      homeownerEmail: z.string().email(),
      homeownerName: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await (db as any).execute(sql`
        UPDATE scoutAssessments SET
          homeownerEmail = ${input.homeownerEmail},
          homeownerName = ${input.homeownerName ?? null},
          reportSharedAt = NOW(),
          reportSharedWith = ${input.homeownerEmail},
          status = 'report_shared'
        WHERE id = ${input.assessmentId}
      `);

      // TODO: Send report email via Resend when credentials available
      return { success: true, message: `Report will be sent to ${input.homeownerEmail}` };
    }),

  // ── My assessments (Scout dashboard) ────────────────────────────────────────
  getMyAssessments: protectedProcedure
    .input(z.object({
      status: z.enum(["in_progress","report_generated","report_shared","all"]).default("all"),
      limit: z.number().default(20),
    }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];

      const partnerRows = await (db as any).execute(sql`SELECT id FROM partners WHERE userId = ${ctx.user.id} LIMIT 1`);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) return [];

      const whereStatus = input.status === "all" ? sql`1=1` : sql`a.status = ${input.status}`;
      const rows = await (db as any).execute(sql`
        SELECT a.*,
          (SELECT COUNT(*) FROM assessmentFindings f WHERE f.assessmentId = a.id) as findingCount,
          (SELECT homeHealthScore FROM assessmentReports r WHERE r.assessmentId = a.id LIMIT 1) as healthScore
        FROM scoutAssessments a
        WHERE a.scoutPartnerId = ${partner.id} AND ${whereStatus}
        ORDER BY a.createdAt DESC
        LIMIT ${input.limit}
      `);
      return rows.rows || rows;
    }),

  // ── Admin: list all assessments ─────────────────────────────────────────────
  adminListAssessments: protectedProcedure
    .input(z.object({ limit: z.number().default(50) }))
    .query(async ({ ctx, input }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) return [];
      const rows = await (db as any).execute(sql`
        SELECT a.*, p.businessName as scoutName, p.contactEmail as scoutEmail,
          (SELECT COUNT(*) FROM assessmentFindings WHERE assessmentId = a.id) as findingCount
        FROM scoutAssessments a
        JOIN partners p ON a.scoutPartnerId = p.id
        ORDER BY a.createdAt DESC LIMIT ${input.limit}
      `);
      return rows.rows || rows;
    }),

  // ── Get commission estimate for Scout ───────────────────────────────────────
  estimateScoutEarnings: protectedProcedure
    .input(z.object({ assessmentId: z.number().int().positive() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return null;

      const partnerRows = await (db as any).execute(sql`
        SELECT p.platformFeeRate, p.commissionRate, p.tier
        FROM partners p WHERE p.userId = ${ctx.user.id} LIMIT 1
      `);
      const partner = (partnerRows.rows || partnerRows)[0];
      if (!partner) return null;

      const findingsRows = await (db as any).execute(sql`
        SELECT SUM(estimatedRepairCost) as totalRepairCost,
               COUNT(*) as findingCount
        FROM assessmentFindings WHERE assessmentId = ${input.assessmentId}
      `);
      const stats = (findingsRows.rows || findingsRows)[0];
      if (!stats) return null;

      const totalJobValue = parseFloat(stats.totalRepairCost || "0");
      const platformFeeRate = parseFloat(partner.platformFeeRate || "0.12");
      const commissionKeepRate = parseFloat(partner.commissionRate || "0.40");
      const estimatedPlatformFee = totalJobValue * platformFeeRate;
      const estimatedScoutCommission = estimatedPlatformFee * commissionKeepRate;

      return {
        totalEstimatedJobValue: totalJobValue,
        estimatedPlatformFee,
        estimatedScoutCommission,
        tier: partner.tier,
        commissionRate: commissionKeepRate,
        findingCount: parseInt(stats.findingCount || "0"),
        disclaimer: "Actual commission depends on which jobs close and at what final value.",
      };
    }),
});
