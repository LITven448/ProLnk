import axios from "axios";
import { TRPCError } from "@trpc/server";

const DETECTION_CATEGORIES = [
  "aging_roof","roof_damage","missing_shingles","roof_moss_algae",
  "aging_hvac_unit","hvac_damage","hvac_rust","old_thermostat",
  "aging_water_heater","pipe_corrosion","water_stains","drainage_issues",
  "old_electrical_panel","exposed_wiring","outdated_outlets",
  "siding_damage","faded_siding","cracked_foundation","damaged_gutters",
  "clogged_gutters","fascia_damage","soffit_damage",
  "overgrown_landscaping","dead_trees","driveway_cracks","walkway_damage",
  "aging_windows","damaged_windows","weatherstripping_needed","door_damage",
  "peeling_paint","faded_paint","wood_rot",
  "damaged_flooring","carpet_wear","tile_cracking",
  "mold_signs","pest_evidence","wood_damage",
  "structural_concerns","safety_hazard",
  "insulation_opportunity","energy_efficiency_upgrade","smart_home_opportunity",
  "deferred_maintenance","curb_appeal_opportunity"
];

export interface Detection {
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

  const prompt = `You are ProLnk\'s AI Photo Intelligence engine. Analyze this job-site photo and identify home maintenance, repair, and improvement opportunities for a home service referral network.

For each issue you can SEE, return a JSON array item with:
- category: one of [${DETECTION_CATEGORIES.slice(0, 20).join(", ")}, ...]
- severity: "low"|"medium"|"high"|"urgent"
- description: specific 1-2 sentence observation
- trade: service trade needed (Roofing/HVAC/Plumbing/Electrical/Landscaping/Painting/Windows/Pest Control/Flooring/Other)
- estimatedJobValue: realistic range like "$500-$1,500"
- confidence: 0.0-1.0

Return ONLY a valid JSON array. If no issues visible, return [].`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
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
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 30000
      }
    );

    const raw = response.data.choices?.[0]?.message?.content ?? "[]";
    let detections: Detection[] = [];

    try {
      const parsed = JSON.parse(raw);
      detections = Array.isArray(parsed) ? parsed : (parsed.detections ?? parsed.results ?? parsed.items ?? []);
    } catch {
      const match = raw.match(/\[.*?\]/s);
      if (match) { try { detections = JSON.parse(match[0]); } catch {} }
    }

    const highPriority = detections.filter(d => d.severity === "high" || d.severity === "urgent");
    const totalValue = detections.reduce((sum, d) => {
      const match = d.estimatedJobValue?.match(/\$([\d,]+)/);
      return sum + (match ? parseInt(match[1].replace(",", "")) : 500);
    }, 0);

    return {
      detections,
      summary: detections.length > 0
        ? `Detected ${detections.length} opportunities across ${new Set(detections.map(d => d.trade)).size} trades. ${highPriority.length} high-priority.`
        : "No significant issues detected.",
      totalOpportunities: detections.length,
      highPriorityCount: highPriority.length,
      estimatedTotalValue: totalValue > 0 ? `$${totalValue.toLocaleString()}+` : "$0",
      scanDurationMs: Date.now() - start,
    };
  } catch (err: any) {
    const msg = err?.response?.data?.error?.message ?? err?.message ?? "Unknown error";
    console.error("[PhotoIntelligence]", msg);
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: `Photo analysis failed: ${msg}` });
  }
}
