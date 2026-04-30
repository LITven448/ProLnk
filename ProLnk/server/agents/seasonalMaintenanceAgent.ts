/**
 * Seasonal Maintenance Agent
 *
 * Generates personalized seasonal maintenance checklists for homeowners
 * based on their Home Health Vault data (system ages, conditions, location).
 *
 * Runs quarterly for each homeowner with an active profile.
 * Output: AI-written maintenance email + in-app checklist.
 */

import { getDb } from "../db";
import { sql } from "drizzle-orm";
import { invokeLLM } from "../_core/llm";
import { queryPropertyHistory } from "../zep";

const DFW_SEASONAL_CONTEXT: Record<string, string> = {
  spring: "In DFW, spring brings hail season (April-June), severe thunderstorms, and extreme pollen. HVAC tune-up season as heat approaches. Check roof and gutters after winter.",
  summer: "DFW summers are brutal (100°F+). HVAC runs constantly. Check for signs of AC strain. Irrigation system maintenance critical. Watch for foundation movement from dry soil.",
  fall: "Temperatures dropping after extreme heat. Prepare heating system. Clean gutters from leaf fall. Rodents seeking warmth — seal entry points. HVAC filter changes.",
  winter: "Ice storms possible (rare but devastating as 2021 showed). Insulate pipes. Keep exterior faucets covered. Know where your water shutoff is. Check weatherstripping.",
};

function getCurrentSeason(): "spring" | "summer" | "fall" | "winter" {
  const month = new Date().getMonth(); // 0-11
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 8) return "summer";
  if (month >= 9 && month <= 10) return "fall";
  return "winter";
}

export async function generateSeasonalMaintenanceChecklist(opts: {
  homeownerEmail: string;
  homeownerName: string;
  propertyAddress: string;
  homeHealthScore?: number;
}): Promise<{
  season: string;
  subject: string;
  checklistItems: Array<{ task: string; priority: "urgent" | "this_month" | "optional"; trade: string; estimatedTime: string }>;
  personalizedNotes: string;
}> {
  const season = getCurrentSeason();
  const seasonContext = DFW_SEASONAL_CONTEXT[season];

  // Get property history from Zep if available
  const propertyHistory = await queryPropertyHistory(opts.propertyAddress, "hvac age condition roof plumbing").catch(() => []);
  const historyContext = propertyHistory.length > 0
    ? `Known property data: ${propertyHistory.slice(0, 3).map((r: any) => r.content || "").join(" | ")}`
    : "No prior property data available";

  const response = await invokeLLM({
    model: "claude-sonnet-4-5-20251022",
    provider: "anthropic" as const,
    thinking: false,
    maxTokens: 1024,
    messages: [
      {
        role: "system",
        content: `You are a home maintenance expert creating personalized seasonal checklists for DFW homeowners. Be practical, specific to Texas climate, and prioritize items based on urgency and property data.`,
      },
      {
        role: "user",
        content: `Create a ${season} maintenance checklist for:
Homeowner: ${opts.homeownerName}
Address: ${opts.propertyAddress}
Home Health Score: ${opts.homeHealthScore ?? "unknown"}/100
Season context: ${seasonContext}
${historyContext}

Return JSON with 5-8 specific maintenance tasks, prioritized for this homeowner.`,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "seasonal_checklist",
        strict: true,
        schema: {
          type: "object",
          properties: {
            subject: { type: "string" },
            checklistItems: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  task: { type: "string" },
                  priority: { type: "string", enum: ["urgent", "this_month", "optional"] },
                  trade: { type: "string" },
                  estimatedTime: { type: "string" },
                },
                required: ["task", "priority", "trade", "estimatedTime"],
                additionalProperties: false,
              },
            },
            personalizedNotes: { type: "string" },
          },
          required: ["subject", "checklistItems", "personalizedNotes"],
          additionalProperties: false,
        },
      },
    },
  });

  const content = response.choices?.[0]?.message?.content;
  const parsed = typeof content === "string" ? JSON.parse(content) : content;
  return { season, ...parsed };
}

export async function runSeasonalMaintenanceForAllHomeowners(): Promise<{
  processed: number;
  errors: number;
}> {
  const db = await getDb();
  if (!db) return { processed: 0, errors: 0 };

  let processed = 0;
  let errors = 0;

  try {
    const homeownerRows = await (db as any).execute(sql`
      SELECT hp.id, hp.displayName, u.email, u.name,
             p.address, p.city, p.state
      FROM homeownerProfiles hp
      JOIN users u ON hp.userId = u.id
      LEFT JOIN properties p ON p.ownerId = hp.id
      WHERE hp.setupComplete = 1
        AND u.email IS NOT NULL
      LIMIT 100
    `);
    const homeowners = homeownerRows.rows || homeownerRows;

    for (const ho of homeowners) {
      try {
        const address = [ho.address, ho.city, ho.state].filter(Boolean).join(", ");
        if (!address || !ho.email) continue;

        const checklist = await generateSeasonalMaintenanceChecklist({
          homeownerEmail: ho.email,
          homeownerName: ho.displayName || ho.name || "Homeowner",
          propertyAddress: address,
        });

        // Store checklist in homeownerScanOffers or a new table
        // For now, create in-app notification
        await (db as any).execute(sql`
          INSERT INTO partnerNotifications (partnerId, type, title, message, actionUrl, isRead, createdAt)
          SELECT hp.userId, 'system',
            ${`${checklist.season.charAt(0).toUpperCase() + checklist.season.slice(1)} Maintenance Checklist`},
            ${checklist.personalizedNotes},
            '/my-home/maintenance',
            0, NOW()
          FROM homeownerProfiles hp WHERE hp.id = ${ho.id}
        `).catch(() => {});

        processed++;
      } catch {
        errors++;
      }
    }
  } catch (err) {
    console.error("[SeasonalAgent] Error:", err);
    errors++;
  }

  return { processed, errors };
}
