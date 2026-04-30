/**
 * ProLnk Photo Intake Router -- Two-Tier AI Pipeline
 *
 * Flow:
 *   1. enqueuePhoto() normalizes and inserts into photoIntakeQueue
 *   2. processPhotoById() runs TWO-TIER AI:
 *      - Tier 1: Fast quality check -- rejects blurry/unusable photos
 *      - Tier 2: Deep opportunity analysis -- only on quality-passed photos
 *   3. Opportunities created with adminReviewStatus = "pending_review"
 *   4. Admin reviews in Lead Dispatch Portal, clicks Approve & Dispatch
 *   5. dispatchLeadToPartner() sends to partner with 24-hour expiry
 *   6. sweepExpiredLeads() auto-routes to next partner on timeout/decline
 */
import { ENV } from './_core/env';
import { getDb, createPartnerNotification } from "./db";
import { photoIntakeQueue, partnerIntegrations, jobs, opportunities, partners } from "../drizzle/schema";
import { eq, and, lt } from "drizzle-orm";
import { invokeLLM, type Message, type ImageContent, type TextContent } from "./_core/llm";
import { notifyOwner } from "./_core/notification";
import { pushNewLead } from "./_core/push";
import { scheduleCheckinEmail } from "./checkin-scheduler";
import { sendNewLeadNotification } from "./email";
import type { AiAnalysisResult, AiOpportunity } from "../drizzle/schema";

export interface NormalizedPhotoInput {
  partnerId: number;
  integrationId?: number;
  source: "companycam" | "jobber" | "housecall_pro" | "google_drive" | "field_app" | "manual";
  photoUrl: string;
  thumbnailUrl?: string;
  externalJobId?: string;
  externalJobName?: string;
  serviceAddress?: string;
  serviceCity?: string;
  serviceZip?: string;
  latitude?: number;
  longitude?: number;
  capturedAt?: Date;
}

export async function enqueuePhoto(input: NormalizedPhotoInput): Promise<number | null> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await db
    .select({ id: photoIntakeQueue.id })
    .from(photoIntakeQueue)
    .where(and(eq(photoIntakeQueue.partnerId, input.partnerId), eq(photoIntakeQueue.photoUrl, input.photoUrl)))
    .limit(1);
  if (existing.length > 0) {
    console.log(`[IntakeRouter] Duplicate photo skipped: ${input.photoUrl}`);
    return null;
  }
  const [result] = await db.insert(photoIntakeQueue).values({
    partnerId: input.partnerId,
    integrationId: input.integrationId ?? null,
    source: input.source,
    photoUrl: input.photoUrl,
    thumbnailUrl: input.thumbnailUrl ?? null,
    externalJobId: input.externalJobId ?? null,
    externalJobName: input.externalJobName ?? null,
    serviceAddress: input.serviceAddress ?? null,
    serviceCity: input.serviceCity ?? null,
    serviceZip: input.serviceZip ?? null,
    latitude: input.latitude != null ? String(input.latitude) : null,
    longitude: input.longitude != null ? String(input.longitude) : null,
    capturedAt: input.capturedAt ?? null,
    status: "pending",
  });
  const insertId = (result as any).insertId as number;
  console.log(`[IntakeRouter] Enqueued photo #${insertId} from ${input.source} for partner ${input.partnerId}`);
  processPhotoById(insertId).catch((err) =>
    console.error(`[IntakeRouter] Background processing failed for #${insertId}:`, err)
  );
  return insertId;
}

export async function processPhotoById(queueId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const [item] = await db.select().from(photoIntakeQueue).where(eq(photoIntakeQueue.id, queueId)).limit(1);
  if (!item) throw new Error(`Queue item #${queueId} not found`);
  if (item.status !== "pending") return;
  await db.update(photoIntakeQueue).set({ status: "processing" }).where(eq(photoIntakeQueue.id, queueId));
  try {
    // TIER 1: Quality Check
    console.log(`[IntakeRouter] Tier 1 quality check for photo #${queueId}`);
    const qualityResult = await runQualityCheck(item.photoUrl);
    if (qualityResult === "unusable") {
      console.log(`[IntakeRouter] Photo #${queueId} rejected (unusable)`);
      await db.update(photoIntakeQueue).set({
        status: "skipped",
        errorMessage: "Rejected by quality check: unusable/blurry",
        processedAt: new Date(),
        aiResult: JSON.stringify({ photoQuality: "unusable", opportunities: [] }),
      }).where(eq(photoIntakeQueue.id, queueId));
      return;
    }
    // TIER 2: Deep Opportunity Analysis
    console.log(`[IntakeRouter] Tier 2 deep analysis for photo #${queueId} (quality: ${qualityResult})`);
    const aiResult = await analyzePhotoWithAI(item.photoUrl, item.serviceAddress ?? undefined);
    const [jobResult] = await db.insert(jobs).values({
      partnerId: item.partnerId,
      serviceAddress: item.serviceAddress ?? "Unknown",
      serviceType: detectServiceType(item.externalJobName ?? "", item.source),
      photoUrls: [item.photoUrl],
      aiAnalysisStatus: "complete",
      aiAnalysisResult: aiResult,
      status: "analyzed",
    });
    const jobId = (jobResult as any).insertId as number;
    if (aiResult.opportunities.length > 0) {
      await createOpportunitiesForAdminReview(item.partnerId, jobId, aiResult.opportunities, item);
    }
    await db.update(photoIntakeQueue).set({
      status: "completed",
      jobId,
      aiResult: JSON.stringify(aiResult),
      processedAt: new Date(),
    }).where(eq(photoIntakeQueue.id, queueId));
    const oppCount = aiResult.opportunities.length;
    console.log(`[IntakeRouter] Photo #${queueId} processed: ${oppCount} opportunities pending admin review`);
    if (oppCount > 0) {
      await notifyOwner({
        title: `New Leads Awaiting Review (${oppCount})`,
        content: `AI detected ${oppCount} opportunity${oppCount > 1 ? "ies" : ""} from partner #${item.partnerId}. Review in Lead Dispatch Portal.`,
      }).catch(() => {});
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    await db.update(photoIntakeQueue).set({ status: "failed", errorMessage, processedAt: new Date() }).where(eq(photoIntakeQueue.id, queueId));
    console.error(`[IntakeRouter] Processing failed for #${queueId}:`, errorMessage);
  }
}

async function runQualityCheck(photoUrl: string): Promise<"good" | "poor" | "unusable"> {
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are a photo quality checker. Evaluate if this photo is usable for property condition analysis. Return JSON only with "quality": "good", "poor", or "unusable". "unusable" = completely blurry, black, corrupted, or shows no property features.`,
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Evaluate this photo quality." },
            { type: "image_url", image_url: { url: photoUrl } },
          ] as (TextContent | ImageContent)[],
        },
      ] as Message[],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "quality_check",
          strict: true,
          schema: {
            type: "object",
            properties: { quality: { type: "string", enum: ["good", "poor", "unusable"] } },
            required: ["quality"],
            additionalProperties: false,
          },
        },
      },
    });
    const raw = response.choices?.[0]?.message?.content;
    if (!raw) return "poor";
    const parsed = JSON.parse(typeof raw === "string" ? raw : JSON.stringify(raw));
    return parsed.quality ?? "poor";
  } catch {
    return "poor";
  }
}

async function analyzePhotoWithAI(photoUrl: string, address?: string): Promise<AiAnalysisResult> {
  const systemPrompt = `You are an AI assistant for ProLnk, a home service partner referral network.
Analyze this job site photo and identify any visible opportunities for OTHER home service businesses.
Look for conditions including, but not limited to: overgrown lawn/landscaping, dirty windows, pest signs,
damaged fencing, clogged gutters, peeling paint, pressure washing needs, tree trimming, pool maintenance,
HVAC units, water damage, cracked driveways, garage door issues, roofing damage, irrigation problems,
exterior lighting, holiday lighting, junk removal, or any other home service need.
Respond with JSON only. Be conservative - only flag what is clearly visible.`;
  const userContent: (TextContent | ImageContent)[] = [
    { type: "text", text: `Analyze this job site photo${address ? ` at ${address}` : ""} for cross-sell opportunities.` },
    { type: "image_url", image_url: { url: photoUrl } },
  ];
  try {
    const response = await invokeLLM({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ] as Message[],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "ai_analysis_result",
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
                  required: ["type", "category", "confidence", "description"],
                  additionalProperties: false,
                },
              },
              photoQuality: { type: "string", enum: ["good", "poor", "unusable"] },
              analysisNotes: { type: "string" },
            },
            required: ["opportunities", "photoQuality"],
            additionalProperties: false,
          },
        },
      },
    });
    const rawContent = response.choices?.[0]?.message?.content;
    if (!rawContent) throw new Error("Empty AI response");
    const content = typeof rawContent === "string" ? rawContent : JSON.stringify(rawContent);
    return JSON.parse(content) as AiAnalysisResult;
  } catch (err) {
    console.error("[IntakeRouter] AI analysis failed:", err);
    return { opportunities: [], photoQuality: "poor", analysisNotes: "AI analysis failed" };
  }
}

async function createOpportunitiesForAdminReview(
  sourcePartnerId: number,
  jobId: number,
  aiOpportunities: AiOpportunity[],
  item: typeof photoIntakeQueue.$inferSelect
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const allPartners = await db
    .select({ id: partners.id, businessType: partners.businessType, tier: partners.tier, priorityScore: partners.priorityScore, isFoundingPartner: partners.isFoundingPartner, weeklyLeadCap: partners.weeklyLeadCap, weeklyLeadsReceived: partners.weeklyLeadsReceived })
    .from(partners)
    .where(eq(partners.status, "approved"));
  // Tier-based weekly lead caps: scout=5, pro=15, crew=30, company=60, enterprise=unlimited
  const TIER_CAPS: Record<string, number> = { scout: 5, pro: 15, crew: 30, company: 60, enterprise: 0 };
  for (const opp of aiOpportunities) {
    if (opp.confidence < 0.35) continue;
    const matchingCategories = CATEGORY_MAP[opp.category] ?? [opp.category];
    const matchingPartners = allPartners
      .filter(
        (p) => {
          const cap = p.weeklyLeadCap ?? TIER_CAPS[p.tier ?? 'scout'] ?? 5;
          const atCapacity = cap > 0 && (p.weeklyLeadsReceived ?? 0) >= cap;
          return (
            p.id !== sourcePartnerId &&
            !atCapacity &&
            matchingCategories.some(
              (cat) =>
                p.businessType?.toLowerCase().includes(cat.toLowerCase()) ||
                cat.toLowerCase().includes((p.businessType ?? "").toLowerCase())
            )
          );
        }
      )
      .sort((a, b) => {
        // Sort by PPS DESC; Founding Partners get +5 bonus; fall back to tier rank if PPS not yet set
        const tierRank: Record<string, number> = { enterprise: 0, company: 1, crew: 2, pro: 3, scout: 4 };
        const baseA = a.priorityScore ?? (80 - (tierRank[a.tier] ?? 4) * 15);
        const baseB = b.priorityScore ?? (80 - (tierRank[b.tier] ?? 4) * 15);
        const scoreA = baseA + (a.isFoundingPartner ? 5 : 0);
        const scoreB = baseB + (b.isFoundingPartner ? 5 : 0);
        return scoreB - scoreA; // highest score first
      });
    if (matchingPartners.length === 0) continue;
    const routingQueue = matchingPartners.map((p) => p.id);
    await db.insert(opportunities).values({
      sourcePartnerId,
      receivingPartnerId: matchingPartners[0].id,
      jobId,
      opportunityType: opp.type,
      opportunityCategory: opp.category,
      description: opp.description,
      estimatedJobValue: opp.estimatedValue ? String(opp.estimatedValue) : null,
      aiConfidence: String(Math.round(opp.confidence * 100) / 100),
      photoUrl: item.photoUrl,
      adminReviewStatus: "pending_review",
      status: "pending",
      routingQueue: JSON.stringify(routingQueue),
      routingPosition: 0,
    });
  }
}

export async function dispatchLeadToPartner(
  opportunityId: number,
  targetPartnerId: number,
  adminUserId: number
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await db.update(opportunities).set({
    receivingPartnerId: targetPartnerId,
    adminReviewStatus: "approved",
    adminReviewedAt: new Date(),
    adminReviewedBy: adminUserId,
    status: "sent",
    sentAt: new Date(),
    leadExpiresAt: expiresAt,
  }).where(eq(opportunities.id, opportunityId));
  console.log(`[IntakeRouter] Lead #${opportunityId} dispatched to partner #${targetPartnerId}, expires ${expiresAt.toISOString()}`);
  // Increment weekly lead counter for capacity tracking
  await (db as any).execute(`UPDATE partners SET weeklyLeadsReceived = weeklyLeadsReceived + 1 WHERE id = ${targetPartnerId}`);
  // Send in-app notification to the receiving partnerr
  try {
    // Get opportunity details for the notification message
    const [opp] = await db.select().from(opportunities).where(eq(opportunities.id, opportunityId)).limit(1);
    const category = opp?.opportunityCategory ?? opp?.opportunityType ?? "Home Service";
    const estValue = opp?.estimatedJobValue ? `$${Number(opp.estimatedJobValue).toLocaleString()}` : "";
    const valueStr = estValue ? ` (est. ${estValue})` : "";
    await createPartnerNotification({
      partnerId: targetPartnerId,
      type: "new_lead",
      title: `New Lead: ${category}${valueStr}`,
      message: `You have a new referral lead waiting for your review. You have 24 hours to accept before it routes to the next partner.`,
      actionUrl: "/partner/leads",
      metadata: { opportunityId, category, estimatedValue: opp?.estimatedJobValue },
    });
    // Also notify the admin/owner
    await notifyOwner({
      title: `Lead #${opportunityId} Dispatched`,
      content: `Lead dispatched to partner #${targetPartnerId} -- ${category}${valueStr}. Expires in 24 hours.`,
    });
    // OneSignal push to the receiving partner's device
    pushNewLead(targetPartnerId, category, opp?.estimatedJobValue).catch(() => {});
    // Email notification to partner about the new lead
    try {
      const [partnerRow] = await (db as any).execute(
        `SELECT p.businessName, u.email, u.name FROM partners p LEFT JOIN users u ON u.id = p.userId WHERE p.id = ? LIMIT 1`,
        [targetPartnerId]
      ) as any[];
      const pRow = partnerRow?.[0];
      if (pRow?.email) {
        await sendNewLeadNotification({
          to: pRow.email,
          partnerName: pRow.name || pRow.businessName || 'Partner',
          serviceType: category,
          address: 'On file',
          estimatedValue: opp?.estimatedJobValue ? Number(opp.estimatedJobValue) : 0,
          confidence: 90,
          dashboardUrl: `${ENV.appBaseUrl}/dashboard/leads`,
        }).catch(() => {});
      }
    } catch (emailErr) {
      console.warn('[IntakeRouter] Failed to send lead email:', emailErr);
    }
    // Schedule homeowner check-in email 48 hours after dispatch
    try {
      const [checkinRow] = await (db as any).execute(
        `SELECT j.serviceAddress, u.email, u.name, par.businessName
         FROM opportunities o
         LEFT JOIN jobs j ON j.id = o.jobId
         LEFT JOIN properties p ON p.address = j.serviceAddress
         LEFT JOIN users u ON u.id = p.userId
         LEFT JOIN partners par ON par.id = ?
         WHERE o.id = ? LIMIT 1`,
        [targetPartnerId, opportunityId]
      ) as any[];
      const cRow = checkinRow?.[0];
      if (cRow?.email && cRow?.serviceAddress) {
        await scheduleCheckinEmail({
          opportunityId,
          homeownerEmail: cRow.email,
          homeownerName: cRow.name || "Homeowner",
          partnerName: cRow.businessName || "your service professional",
          serviceAddress: cRow.serviceAddress,
          serviceCategory: category,
        });
      }
    } catch (checkinErr) {
      console.warn("[IntakeRouter] Failed to schedule check-in email:", checkinErr);
    }
  } catch (notifyErr) {
    console.warn("[IntakeRouter] Failed to send dispatch notification:", notifyErr);
  }
}

export async function rejectOpportunityByAdmin(
  opportunityId: number,
  adminUserId: number
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(opportunities).set({
    adminReviewStatus: "rejected",
    adminReviewedAt: new Date(),
    adminReviewedBy: adminUserId,
    status: "expired",
  }).where(eq(opportunities.id, opportunityId));
}

export async function sweepExpiredLeads(): Promise<void> {
  const db = await getDb();
  if (!db) return;
  const now = new Date();
  const expiredLeads = await db
    .select()
    .from(opportunities)
    .where(and(eq(opportunities.status, "sent"), lt(opportunities.leadExpiresAt, now)));
  for (const lead of expiredLeads) {
    await advanceLeadRouting(lead.id, "expired");
  }
  if (expiredLeads.length > 0) {
    console.log(`[IntakeRouter] Swept ${expiredLeads.length} expired leads`);
  }
}

export async function advanceLeadRouting(
  opportunityId: number,
  reason: "declined" | "expired"
): Promise<void> {
  const db = await getDb();
  if (!db) return;
  const [opp] = await db.select().from(opportunities).where(eq(opportunities.id, opportunityId)).limit(1);
  if (!opp) return;
  const routingQueue: number[] = opp.routingQueue ? JSON.parse(opp.routingQueue) : [];
  const nextPosition = (opp.routingPosition ?? 0) + 1;
  if (nextPosition >= routingQueue.length) {
    await db.update(opportunities).set({ status: "expired", routingPosition: nextPosition }).where(eq(opportunities.id, opportunityId));
    console.log(`[IntakeRouter] Lead #${opportunityId} exhausted all partners (${reason})`);
    return;
  }
  const nextPartnerId = routingQueue[nextPosition];
  const newExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await db.update(opportunities).set({
    receivingPartnerId: nextPartnerId,
    status: "sent",
    sentAt: new Date(),
    leadExpiresAt: newExpiresAt,
    routingPosition: nextPosition,
  }).where(eq(opportunities.id, opportunityId));
  console.log(`[IntakeRouter] Lead #${opportunityId} re-routed to partner #${nextPartnerId} after ${reason}`);
}

const CATEGORY_MAP: Record<string, string[]> = {
  "Lawn & Landscaping": ["Lawn Care & Mowing", "Landscaping & Design", "Irrigation & Sprinklers"],
  "Window Cleaning": ["Window Cleaning"],
  "Pest Control": ["Pest Control"],
  "Fence & Gate": ["Fencing & Gates"],
  "Gutter Cleaning": ["Gutter Cleaning & Guards"],
  "Pressure Washing": ["Pressure Washing"],
  "Tree Services": ["Tree Trimming & Removal"],
  "Pool & Spa": ["Pool Service & Repair"],
  "HVAC": ["HVAC & Air Conditioning"],
  "Roofing": ["Roofing & Gutters"],
  "Painting": ["Interior Painting", "Exterior Painting"],
  "Handyman": ["Handyman Services"],
  "Junk Removal": ["Junk Removal & Hauling"],
  "Holiday Lighting": ["Holiday Lighting & Decor"],
  "Garage": ["Garage Door Service", "Garage Organization & Storage"],
  "Plumbing": ["Plumbing & Drain"],
  "Electrical": ["Electrical Services"],
  "Flooring": ["Flooring & Carpet"],
  "Concrete": ["Concrete & Masonry"],
  "Cleaning": ["House Cleaning & Maid Service"],
};

function detectServiceType(jobName: string, source: string): string {
  const name = jobName.toLowerCase();
  if (name.includes("lawn") || name.includes("mow")) return "Lawn Care";
  if (name.includes("pest") || name.includes("bug")) return "Pest Control";
  if (name.includes("clean")) return "Cleaning";
  if (name.includes("hvac") || name.includes("ac") || name.includes("heat")) return "HVAC";
  if (name.includes("plumb")) return "Plumbing";
  if (name.includes("electric")) return "Electrical";
  if (name.includes("roof")) return "Roofing";
  if (name.includes("pool")) return "Pool Service";
  if (name.includes("window")) return "Window Cleaning";
  if (source === "field_app") return "Field Service";
  return "General Service";
}

export async function getIntegrationByPartnerAndSource(
  partnerId: number,
  source: string
): Promise<typeof partnerIntegrations.$inferSelect | null> {
  const db = await getDb();
  if (!db) return null;
  const [result] = await db
    .select()
    .from(partnerIntegrations)
    .where(and(eq(partnerIntegrations.partnerId, partnerId), eq(partnerIntegrations.source, source)))
    .limit(1);
  return result ?? null;
}

export async function getIntegrationsByPartnerId(
  partnerId: number
): Promise<(typeof partnerIntegrations.$inferSelect)[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(partnerIntegrations).where(eq(partnerIntegrations.partnerId, partnerId));
}

export async function upsertIntegration(
  partnerId: number,
  source: string,
  data: Partial<typeof partnerIntegrations.$inferInsert>
): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const existing = await getIntegrationByPartnerAndSource(partnerId, source);
  if (existing) {
    await db.update(partnerIntegrations).set({ ...data, updatedAt: new Date() }).where(eq(partnerIntegrations.id, existing.id));
    return existing.id;
  } else {
    const [result] = await db.insert(partnerIntegrations).values({ partnerId, source, ...data });
    return (result as any).insertId as number;
  }
}

export async function disconnectIntegration(integrationId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(partnerIntegrations)
    .set({ status: "disconnected", accessToken: null, refreshToken: null, webhookId: null })
    .where(eq(partnerIntegrations.id, integrationId));
}

export async function getIntakeQueueStats(partnerId?: number) {
  const db = await getDb();
  if (!db) return { total: 0, pending: 0, processing: 0, completed: 0, failed: 0, skipped: 0 };
  const query = db.select().from(photoIntakeQueue);
  const items = partnerId ? await query.where(eq(photoIntakeQueue.partnerId, partnerId)) : await query;
  return {
    total: items.length,
    pending: items.filter((i) => i.status === "pending").length,
    processing: items.filter((i) => i.status === "processing").length,
    completed: items.filter((i) => i.status === "completed").length,
    failed: items.filter((i) => i.status === "failed").length,
    skipped: items.filter((i) => i.status === "skipped").length,
  };
}
