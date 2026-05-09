import axios from "axios";
import { TRPCError } from "@trpc/server";

const DETECTION_CATEGORIES = [
  // Roofing (8)
  "aging_roof","roof_damage","missing_shingles","roof_moss_algae","flat_roof_ponding","flashing_failure","roof_ventilation_issue","chimney_damage",
  // HVAC (7)
  "aging_hvac_unit","hvac_damage","hvac_rust","old_thermostat","ductwork_damage","refrigerant_line_damage","hvac_filter_neglect",
  // Plumbing (7)
  "aging_water_heater","pipe_corrosion","water_stains","drainage_issues","sump_pump_needed","irrigation_leak","water_pressure_issue",
  // Electrical (5)
  "old_electrical_panel","exposed_wiring","outdated_outlets","no_gfci_near_water","generator_opportunity",
  // Exterior Structure (8)
  "siding_damage","faded_siding","cracked_foundation","damaged_gutters","clogged_gutters","fascia_damage","soffit_damage","deck_railing_damage",
  // Landscaping (8)
  "overgrown_landscaping","dead_trees","driveway_cracks","walkway_damage","drainage_grading_issue","lawn_disease","tree_limb_hazard","retaining_wall_failure",
  // Windows & Doors (5)
  "aging_windows","damaged_windows","weatherstripping_needed","door_damage","garage_door_damage",
  // Paint & Finishes (4)
  "peeling_paint","faded_paint","wood_rot","stucco_crack",
  // Interior (4)
  "damaged_flooring","carpet_wear","tile_cracking","subfloor_soft_spot",
  // Health & Safety (5)
  "mold_signs","pest_evidence","wood_damage","asbestos_risk","radon_risk",
  // Structural (3)
  "structural_concerns","safety_hazard","settling_foundation",
  // Upgrades & Efficiency (7)
  "insulation_opportunity","energy_efficiency_upgrade","smart_home_opportunity","solar_opportunity","ev_charger_opportunity","water_filtration_needed","whole_home_generator",
  // General (4)
  "deferred_maintenance","curb_appeal_opportunity","pressure_wash_needed","fence_damage",
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

  const categoryList = DETECTION_CATEGORIES.join(", ");
  const prompt = `You are ProLnk's AI Photo Intelligence engine. Analyze this job-site photo and identify ALL visible home maintenance, repair, and improvement opportunities across 65+ detection categories.

For EVERY issue you can observe, return a JSON object with these exact fields:
- category: one of [${categoryList}]
- severity: "low" (cosmetic/minor), "medium" (should address within 6 months), "high" (address within 60 days), or "urgent" (immediate safety/damage risk)
- description: 1-2 sentences describing the specific visible issue and its location/extent
- trade: the primary trade needed — one of: Roofing, HVAC, Plumbing, Electrical, Landscaping, Painting, Windows & Doors, Pest Control, Flooring, Structural, General Contractor, Other
- estimatedJobValue: realistic market price range like "$800-$2,500"
- confidence: 0.0-1.0 (how certain you are this issue exists based on what you see)

Be thorough — look at EVERY element: roof, gutters, siding, foundation, windows, doors, paint, landscaping, driveway, fencing, visible mechanical equipment.
Return ONLY a JSON object in this format: {"detections": [...]}. If nothing is visible, return {"detections": []}.`;

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
        max_tokens: 4096,
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
