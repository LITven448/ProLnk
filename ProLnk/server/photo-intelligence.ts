import OpenAI from "openai";
import { TRPCError } from "@trpc/server";

const DETECTION_CATEGORIES = [
  // Roofing
  "aging_roof", "roof_damage", "missing_shingles", "roof_moss_algae",
  // HVAC
  "aging_hvac_unit", "hvac_damage", "hvac_rust", "old_thermostat",
  // Plumbing
  "aging_water_heater", "pipe_corrosion", "water_stains", "drainage_issues",
  // Electrical
  "old_electrical_panel", "exposed_wiring", "outdated_outlets",
  // Exterior
  "siding_damage", "faded_siding", "cracked_foundation", "damaged_gutters",
  "clogged_gutters", "fascia_damage", "soffit_damage",
  // Landscaping
  "overgrown_landscaping", "dead_trees", "drainage_slope_issues",
  "driveway_cracks", "walkway_damage",
  // Windows & Doors
  "aging_windows", "damaged_windows", "weatherstripping_needed",
  "door_damage", "garage_door_aging",
  // Painting
  "peeling_paint", "faded_paint", "wood_rot",
  // Flooring
  "damaged_flooring", "carpet_wear", "tile_cracking",
  // Pest & Mold
  "mold_signs", "pest_evidence", "wood_damage",
  // Safety
  "structural_concerns", "safety_hazard", "carbon_monoxide_risk",
  // Upgrades
  "insulation_opportunity", "energy_efficiency_upgrade",
  "smart_home_opportunity", "ev_charger_opportunity",
  // General
  "deferred_maintenance", "curb_appeal_opportunity"
];

interface Detection {
  category: string;
  severity: "low" | "medium" | "high" | "urgent";
  description: string;
  trade: string;
  estimatedJobValue: string;
  confidence: number;
}

export interface PhotoScanResult {
  detections: Detection[];
  summary: string;
  totalOpportunities: number;
  highPriorityCount: number;
  estimatedTotalValue: string;
  scanDurationMs: number;
}

export async function analyzeJobPhoto(photoUrl: string): Promise<PhotoScanResult> {
  const start = Date.now();
  
  if (!process.env.OPENAI_API_KEY) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "OPENAI_API_KEY not configured" });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const prompt = `You are ProLnk's AI Photo Intelligence engine. Analyze this job-site photo and identify home maintenance, repair, and improvement opportunities.

For each issue detected, return a JSON array with objects containing:
- category: one of the predefined categories
- severity: "low" | "medium" | "high" | "urgent"
- description: specific observation (1-2 sentences, very specific)
- trade: the home service trade needed (e.g., "Roofing", "HVAC", "Plumbing", "Electrical", "Landscaping", "Painting", "Windows", "Pest Control")
- estimatedJobValue: realistic job value range (e.g., "$500-$1,500")
- confidence: 0.0-1.0

Available categories: ${DETECTION_CATEGORIES.join(", ")}

Focus on what you can actually SEE in the photo. Be specific. Return ONLY valid JSON, no markdown.
Example format: [{"category":"aging_hvac_unit","severity":"high","description":"Outdoor HVAC unit showing heavy rust on condenser coils, estimated 12+ years old","trade":"HVAC","estimatedJobValue":"$3,000-$8,000","confidence":0.87}]

If no issues detected, return [].`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: photoUrl, detail: "high" } }
          ]
        }
      ],
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    const raw = response.choices[0]?.message?.content ?? "[]";
    let detections: Detection[] = [];
    
    try {
      const parsed = JSON.parse(raw);
      detections = Array.isArray(parsed) ? parsed : (parsed.detections ?? parsed.results ?? []);
    } catch {
      // Try to extract JSON array from response
      const match = raw.match(/\[.*\]/s);
      if (match) {
        detections = JSON.parse(match[0]);
      }
    }

    // Calculate summary stats
    const highPriority = detections.filter(d => d.severity === "high" || d.severity === "urgent");
    const totalValue = detections.reduce((sum, d) => {
      const match = d.estimatedJobValue?.match(/\$([\d,]+)/);
      return sum + (match ? parseInt(match[1].replace(",", "")) : 500);
    }, 0);

    return {
      detections,
      summary: detections.length > 0
        ? `Detected ${detections.length} opportunities across ${new Set(detections.map(d => d.trade)).size} trades. ${highPriority.length} high-priority items.`
        : "No significant issues detected in this photo.",
      totalOpportunities: detections.length,
      highPriorityCount: highPriority.length,
      estimatedTotalValue: totalValue > 0 ? `$${totalValue.toLocaleString()}+` : "$0",
      scanDurationMs: Date.now() - start,
    };
  } catch (err: any) {
    console.error("[PhotoIntelligence] Error:", err?.message);
    throw new TRPCError({ 
      code: "INTERNAL_SERVER_ERROR", 
      message: `Photo analysis failed: ${err?.message ?? "Unknown error"}` 
    });
  }
}
