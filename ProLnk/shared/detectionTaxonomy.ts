/**
 * ProLnk AI Detection Master Taxonomy
 * Version 1.0 — March 2026
 *
 * This is the single source of truth for all detectable property conditions
 * and their associated service trades. Used by:
 *   - AI opportunity engine (routing logic)
 *   - Photo Approval Queue (detection labels)
 *   - Admin portal (filter/search)
 *   - Partner matching (trade category lookup)
 *   - Commission calculator (estimated job values)
 *   - ProLnk Mobile App (detection result display)
 */

// ─────────────────────────────────────────────
// TRADE CATEGORIES
// ─────────────────────────────────────────────

export interface Trade {
  id: string;
  name: string;
  subCategories: string[];
  avgJobValueMin: number;
  avgJobValueMax: number;
  icon: string; // lucide icon name
  color: string; // hex
}

export const TRADES: Record<string, Trade> = {
  T01: { id: "T01", name: "Roofing", subCategories: ["Shingle repair", "Flat roof", "Metal roof", "Gutters", "Fascia", "Soffit"], avgJobValueMin: 500, avgJobValueMax: 15000, icon: "Home", color: "#EF4444" },
  T02: { id: "T02", name: "HVAC", subCategories: ["AC repair", "Furnace", "Ductwork", "Mini-split", "Attic ventilation", "Air quality"], avgJobValueMin: 300, avgJobValueMax: 8000, icon: "Wind", color: "#3B82F6" },
  T03: { id: "T03", name: "Plumbing", subCategories: ["Leak repair", "Pipe replacement", "Water heater", "Sewer line", "Irrigation"], avgJobValueMin: 100, avgJobValueMax: 6000, icon: "Droplets", color: "#06B6D4" },
  T04: { id: "T04", name: "Electrical", subCategories: ["Panel upgrade", "Outlet repair", "Lighting", "Generator", "EV charger", "Solar"], avgJobValueMin: 50, avgJobValueMax: 5000, icon: "Zap", color: "#F59E0B" },
  T05: { id: "T05", name: "Foundation & Structural", subCategories: ["Crack repair", "Pier & beam", "Slab", "Retaining wall", "Drainage"], avgJobValueMin: 1500, avgJobValueMax: 30000, icon: "Building2", color: "#78716C" },
  T06: { id: "T06", name: "Fence & Gate", subCategories: ["Wood fence", "Iron fence", "Vinyl fence", "Gate automation", "Privacy screen"], avgJobValueMin: 500, avgJobValueMax: 8000, icon: "LayoutGrid", color: "#92400E" },
  T07: { id: "T07", name: "Concrete & Flatwork", subCategories: ["Driveway", "Sidewalk", "Patio", "Pool deck", "Steps", "Curb"], avgJobValueMin: 300, avgJobValueMax: 8000, icon: "Square", color: "#6B7280" },
  T08: { id: "T08", name: "Landscaping", subCategories: ["Design", "Sod", "Mulch", "Flower beds", "Trees", "Shrubs", "Grading"], avgJobValueMin: 200, avgJobValueMax: 15000, icon: "Leaf", color: "#16A34A" },
  T09: { id: "T09", name: "Lawn Care", subCategories: ["Mowing", "Edging", "Fertilization", "Weed control", "Aeration", "Overseeding"], avgJobValueMin: 100, avgJobValueMax: 2000, icon: "Scissors", color: "#22C55E" },
  T10: { id: "T10", name: "Irrigation", subCategories: ["Sprinkler repair", "Drip system", "Controller upgrade", "Leak detection"], avgJobValueMin: 100, avgJobValueMax: 3000, icon: "Droplet", color: "#0EA5E9" },
  T11: { id: "T11", name: "Pest Control", subCategories: ["Termites", "Ants", "Roaches", "Mosquitoes", "Rodents", "Wildlife exclusion"], avgJobValueMin: 150, avgJobValueMax: 3000, icon: "Bug", color: "#84CC16" },
  T12: { id: "T12", name: "Tree Service", subCategories: ["Trimming", "Removal", "Stump grinding", "Emergency storm damage"], avgJobValueMin: 300, avgJobValueMax: 5000, icon: "Trees", color: "#15803D" },
  T13: { id: "T13", name: "Pressure Washing", subCategories: ["Driveway", "Siding", "Deck", "Fence", "Roof soft wash", "Concrete"], avgJobValueMin: 150, avgJobValueMax: 1500, icon: "Waves", color: "#0284C7" },
  T14: { id: "T14", name: "Window & Door", subCategories: ["Window replacement", "Door replacement", "Screen repair", "Weatherstripping"], avgJobValueMin: 200, avgJobValueMax: 8000, icon: "PanelTop", color: "#7C3AED" },
  T15: { id: "T15", name: "Exterior Painting", subCategories: ["Full repaint", "Touch-up", "Trim", "Stucco", "Brick staining"], avgJobValueMin: 1500, avgJobValueMax: 10000, icon: "Paintbrush", color: "#EC4899" },
  T16: { id: "T16", name: "Interior Painting", subCategories: ["Full repaint", "Touch-up", "Cabinet painting", "Accent walls"], avgJobValueMin: 500, avgJobValueMax: 6000, icon: "Palette", color: "#F472B6" },
  T17: { id: "T17", name: "Flooring", subCategories: ["Hardwood refinish", "Tile repair", "Carpet replacement", "LVP install"], avgJobValueMin: 500, avgJobValueMax: 12000, icon: "Grid3x3", color: "#D97706" },
  T18: { id: "T18", name: "Handyman", subCategories: ["General repairs", "Drywall", "Caulking", "Minor carpentry", "Fixture replacement"], avgJobValueMin: 50, avgJobValueMax: 2000, icon: "Wrench", color: "#64748B" },
  T19: { id: "T19", name: "Pool & Spa", subCategories: ["Cleaning", "Equipment repair", "Resurfacing", "Leak detection", "Automation"], avgJobValueMin: 300, avgJobValueMax: 12000, icon: "Waves", color: "#38BDF8" },
  T20: { id: "T20", name: "Gutter Service", subCategories: ["Cleaning", "Repair", "Replacement", "Guards", "Downspout extension"], avgJobValueMin: 150, avgJobValueMax: 3000, icon: "AlignBottom", color: "#94A3B8" },
  T21: { id: "T21", name: "Deck & Patio", subCategories: ["Repair", "Refinish", "Rebuild", "Pergola", "Outdoor kitchen", "Screen enclosure"], avgJobValueMin: 500, avgJobValueMax: 25000, icon: "LayoutTemplate", color: "#B45309" },
  T22: { id: "T22", name: "Garage", subCategories: ["Door repair", "Opener", "Floor coating", "Organization", "Conversion"], avgJobValueMin: 100, avgJobValueMax: 5000, icon: "Warehouse", color: "#475569" },
  T23: { id: "T23", name: "Drywall & Plaster", subCategories: ["Hole repair", "Water damage", "Texture matching", "Ceiling repair"], avgJobValueMin: 100, avgJobValueMax: 5000, icon: "Square", color: "#A8A29E" },
  T24: { id: "T24", name: "Cabinetry & Millwork", subCategories: ["Cabinet repair", "Refacing", "New install", "Trim", "Built-ins"], avgJobValueMin: 200, avgJobValueMax: 15000, icon: "BookOpen", color: "#92400E" },
  T25: { id: "T25", name: "Countertops", subCategories: ["Crack repair", "Reseal", "Replacement", "Backsplash"], avgJobValueMin: 300, avgJobValueMax: 8000, icon: "Layers", color: "#6D28D9" },
  T26: { id: "T26", name: "Insulation", subCategories: ["Attic insulation", "Crawl space", "Spray foam", "Radiant barrier"], avgJobValueMin: 800, avgJobValueMax: 6000, icon: "Thermometer", color: "#F97316" },
  T27: { id: "T27", name: "Waterproofing", subCategories: ["Basement", "Crawl space", "Foundation", "Exterior coating"], avgJobValueMin: 500, avgJobValueMax: 15000, icon: "Shield", color: "#1D4ED8" },
  T28: { id: "T28", name: "Chimney & Fireplace", subCategories: ["Cleaning", "Repair", "Cap replacement", "Liner", "Gas conversion"], avgJobValueMin: 200, avgJobValueMax: 5000, icon: "Flame", color: "#DC2626" },
  T29: { id: "T29", name: "Security", subCategories: ["Camera install", "Alarm system", "Smart lock", "Motion lighting"], avgJobValueMin: 300, avgJobValueMax: 5000, icon: "Shield", color: "#1E40AF" },
  T30: { id: "T30", name: "Smart Home", subCategories: ["Automation", "AV", "Networking", "EV charger", "Solar monitoring"], avgJobValueMin: 200, avgJobValueMax: 8000, icon: "Cpu", color: "#7C3AED" },
  T31: { id: "T31", name: "Artificial Turf", subCategories: ["Install", "Repair", "Infill refresh", "Pet turf"], avgJobValueMin: 3000, avgJobValueMax: 20000, icon: "Leaf", color: "#4ADE80" },
  T32: { id: "T32", name: "Outdoor Lighting", subCategories: ["Landscape lighting", "String lights", "Security lighting", "Pathway"], avgJobValueMin: 300, avgJobValueMax: 5000, icon: "Sun", color: "#FCD34D" },
  T33: { id: "T33", name: "Epoxy & Coatings", subCategories: ["Garage floor", "Patio", "Pool deck", "Basement floor"], avgJobValueMin: 500, avgJobValueMax: 5000, icon: "Layers", color: "#A78BFA" },
  T34: { id: "T34", name: "Water Treatment", subCategories: ["Softener", "Filtration", "RO system", "Well water testing"], avgJobValueMin: 500, avgJobValueMax: 4000, icon: "Droplets", color: "#22D3EE" },
  T35: { id: "T35", name: "Mold & Remediation", subCategories: ["Testing", "Removal", "Prevention", "Air quality"], avgJobValueMin: 300, avgJobValueMax: 10000, icon: "AlertTriangle", color: "#84CC16" },
  T36: { id: "T36", name: "Junk Removal", subCategories: ["Cleanout", "Furniture removal", "Construction debris", "Estate cleanout"], avgJobValueMin: 150, avgJobValueMax: 2000, icon: "Trash2", color: "#6B7280" },
  T37: { id: "T37", name: "Moving Services", subCategories: ["Local move", "Packing", "Storage", "Specialty items"], avgJobValueMin: 500, avgJobValueMax: 5000, icon: "Truck", color: "#F59E0B" },
  T38: { id: "T38", name: "Deep Cleaning", subCategories: ["Post-construction", "Move-in/out", "Biohazard", "Hoarding"], avgJobValueMin: 200, avgJobValueMax: 3000, icon: "Sparkles", color: "#34D399" },
  T39: { id: "T39", name: "Appliance Repair", subCategories: ["Washer", "Dryer", "Refrigerator", "Dishwasher", "Oven"], avgJobValueMin: 100, avgJobValueMax: 1500, icon: "Settings", color: "#94A3B8" },
  T40: { id: "T40", name: "Septic & Well", subCategories: ["Pumping", "Inspection", "Repair", "Well testing", "Water quality"], avgJobValueMin: 300, avgJobValueMax: 8000, icon: "Gauge", color: "#78716C" },
  T41: { id: "T41", name: "Masonry", subCategories: ["Brick repair", "Tuckpointing", "Stone veneer", "Retaining wall", "Steps"], avgJobValueMin: 500, avgJobValueMax: 10000, icon: "Layers", color: "#A16207" },
  T42: { id: "T42", name: "Siding", subCategories: ["Repair", "Replacement", "Fiber cement", "Vinyl", "Wood", "Stucco"], avgJobValueMin: 800, avgJobValueMax: 15000, icon: "PanelLeft", color: "#64748B" },
  T43: { id: "T43", name: "Awning & Shade", subCategories: ["Retractable awning", "Pergola shade", "Sail shade", "Motorized screen"], avgJobValueMin: 500, avgJobValueMax: 8000, icon: "Umbrella", color: "#F97316" },
  T44: { id: "T44", name: "Driveway Gates", subCategories: ["Automatic gate", "Intercom", "Keypad", "Solar gate operator"], avgJobValueMin: 1500, avgJobValueMax: 12000, icon: "DoorOpen", color: "#1E293B" },
  T45: { id: "T45", name: "Barn & Agricultural", subCategories: ["Fencing", "Equipment storage", "Animal housing", "Drainage", "Gravel"], avgJobValueMin: 500, avgJobValueMax: 20000, icon: "Warehouse", color: "#92400E" },
  T46: { id: "T46", name: "Shed & Outbuilding", subCategories: ["Repair", "Replacement", "Foundation", "Organization"], avgJobValueMin: 300, avgJobValueMax: 8000, icon: "Home", color: "#78716C" },
  T47: { id: "T47", name: "Hot Tub & Sauna", subCategories: ["Repair", "Chemical service", "Cover replacement", "Electrical"], avgJobValueMin: 200, avgJobValueMax: 5000, icon: "Waves", color: "#EC4899" },
  T48: { id: "T48", name: "Home Gym Equipment", subCategories: ["Assembly", "Repair", "Flooring", "Mirror install", "Rubber matting"], avgJobValueMin: 100, avgJobValueMax: 3000, icon: "Dumbbell", color: "#6366F1" },
  T49: { id: "T49", name: "Media Room & AV", subCategories: ["Projector", "Screen", "Speakers", "Wiring", "Acoustic panels"], avgJobValueMin: 300, avgJobValueMax: 10000, icon: "Monitor", color: "#8B5CF6" },
  T50: { id: "T50", name: "Pet Services", subCategories: ["Dog door install", "Pet fence", "Kennel", "Pet waste removal"], avgJobValueMin: 100, avgJobValueMax: 3000, icon: "PawPrint", color: "#F59E0B" },
};

// ─────────────────────────────────────────────
// PROPERTY ZONES
// ─────────────────────────────────────────────

export type PropertyZone =
  | "roof_attic"
  | "exterior_walls"
  | "foundation_drainage"
  | "driveway_hardscape"
  | "front_yard"
  | "back_yard"
  | "garage"
  | "kitchen"
  | "bathroom"
  | "living_areas"
  | "bedroom"
  | "laundry_utility"
  | "attic_interior"
  | "basement_crawlspace"
  | "home_gym"
  | "media_room"
  | "rural_agricultural"
  | "urban_townhome";

export const ZONE_LABELS: Record<PropertyZone, string> = {
  roof_attic: "Roof & Attic",
  exterior_walls: "Exterior Walls & Siding",
  foundation_drainage: "Foundation & Drainage",
  driveway_hardscape: "Driveway & Hardscape",
  front_yard: "Front Yard",
  back_yard: "Back Yard",
  garage: "Garage",
  kitchen: "Kitchen",
  bathroom: "Bathroom",
  living_areas: "Living Areas",
  bedroom: "Bedroom",
  laundry_utility: "Laundry & Utility",
  attic_interior: "Attic (Interior)",
  basement_crawlspace: "Basement & Crawl Space",
  home_gym: "Home Gym",
  media_room: "Media Room",
  rural_agricultural: "Rural & Agricultural",
  urban_townhome: "Urban & Townhome",
};

// ─────────────────────────────────────────────
// DETECTION DEFINITIONS
// ─────────────────────────────────────────────

export type Urgency = "safety" | "high" | "medium" | "low";

export interface Detection {
  id: string;
  label: string;
  description: string;
  zone: PropertyZone;
  visualSignal: string;
  confidenceTrigger: "high" | "medium" | "low";
  primaryTrade: string; // Trade ID
  secondaryTrades: string[]; // Trade IDs
  estimatedValueMin: number;
  estimatedValueMax: number;
  urgency: Urgency;
  keywords: string[]; // for AI prompt matching and search
}

export const DETECTIONS: Detection[] = [
  // ── ROOF & ATTIC ──────────────────────────────────────────────────────────
  { id: "D001", label: "Missing or Lifted Shingles", description: "Visible gaps, curled edges, or exposed roof decking", zone: "roof_attic", visualSignal: "Gaps in shingle coverage, curled or lifted edges", confidenceTrigger: "high", primaryTrade: "T01", secondaryTrades: [], estimatedValueMin: 500, estimatedValueMax: 3500, urgency: "high", keywords: ["shingles", "missing", "lifted", "curled", "roof", "exposed decking"] },
  { id: "D002", label: "Granule Loss on Shingles", description: "Bald patches, color inconsistency, granules in gutters", zone: "roof_attic", visualSignal: "Bald or discolored shingle patches", confidenceTrigger: "medium", primaryTrade: "T01", secondaryTrades: [], estimatedValueMin: 800, estimatedValueMax: 5000, urgency: "medium", keywords: ["granules", "bald", "shingles", "aging", "wear"] },
  { id: "D003", label: "Sagging Roofline", description: "Visible dip or wave in the ridge line — structural indicator", zone: "roof_attic", visualSignal: "Non-linear ridge line, visible sag", confidenceTrigger: "high", primaryTrade: "T01", secondaryTrades: ["T05"], estimatedValueMin: 3000, estimatedValueMax: 15000, urgency: "safety", keywords: ["sagging", "ridge", "structural", "roofline", "wave"] },
  { id: "D004", label: "Damaged Chimney Flashing", description: "Rust, separation, or missing metal flashing around chimney or vents", zone: "roof_attic", visualSignal: "Rust staining, visible gaps at chimney base", confidenceTrigger: "medium", primaryTrade: "T01", secondaryTrades: ["T28"], estimatedValueMin: 300, estimatedValueMax: 1500, urgency: "high", keywords: ["flashing", "chimney", "rust", "separation", "vent"] },
  { id: "D005", label: "Moss or Algae on Roof", description: "Green or black streaking on shingles", zone: "roof_attic", visualSignal: "Green or black discoloration on shingles", confidenceTrigger: "high", primaryTrade: "T01", secondaryTrades: ["T13"], estimatedValueMin: 300, estimatedValueMax: 1200, urgency: "medium", keywords: ["moss", "algae", "green", "black streaks", "roof"] },
  { id: "D006", label: "Damaged Soffit or Fascia", description: "Rot, holes, paint peeling, or animal damage on soffit/fascia boards", zone: "roof_attic", visualSignal: "Discolored, soft, or missing soffit/fascia material", confidenceTrigger: "high", primaryTrade: "T01", secondaryTrades: ["T42"], estimatedValueMin: 500, estimatedValueMax: 3000, urgency: "medium", keywords: ["soffit", "fascia", "rot", "animal damage", "holes"] },
  { id: "D007", label: "Clogged or Damaged Gutters", description: "Sagging gutters, overflow staining, visible debris", zone: "roof_attic", visualSignal: "Gutters pulling away from fascia, debris visible", confidenceTrigger: "high", primaryTrade: "T20", secondaryTrades: [], estimatedValueMin: 150, estimatedValueMax: 800, urgency: "medium", keywords: ["gutters", "clogged", "sagging", "debris", "overflow"] },
  { id: "D008", label: "Missing Downspout Extensions", description: "Water pooling at foundation from short downspouts", zone: "roof_attic", visualSignal: "Downspout ending within 3 feet of foundation", confidenceTrigger: "high", primaryTrade: "T20", secondaryTrades: ["T05"], estimatedValueMin: 100, estimatedValueMax: 400, urgency: "high", keywords: ["downspout", "extension", "foundation", "drainage"] },
  { id: "D009", label: "Animal Entry Points in Roof", description: "Holes in soffit, chewed wood, or droppings near roofline", zone: "roof_attic", visualSignal: "Holes, chewed material, or staining near roofline", confidenceTrigger: "high", primaryTrade: "T11", secondaryTrades: ["T01"], estimatedValueMin: 400, estimatedValueMax: 2000, urgency: "safety", keywords: ["animal", "rodent", "hole", "chewed", "entry", "soffit"] },
  { id: "D010", label: "Chimney Cap Missing or Damaged", description: "Open flue, cracked cap, or missing mortar crown", zone: "roof_attic", visualSignal: "Open chimney top, cracked or absent cap", confidenceTrigger: "high", primaryTrade: "T28", secondaryTrades: [], estimatedValueMin: 200, estimatedValueMax: 1500, urgency: "high", keywords: ["chimney", "cap", "crown", "missing", "cracked"] },
  { id: "D011", label: "Chimney Leaning or Separating", description: "Visible gap between chimney and roofline — structural emergency", zone: "roof_attic", visualSignal: "Gap or lean visible at chimney-roof junction", confidenceTrigger: "high", primaryTrade: "T28", secondaryTrades: ["T41"], estimatedValueMin: 2000, estimatedValueMax: 12000, urgency: "safety", keywords: ["chimney", "leaning", "separating", "structural", "gap"] },
  { id: "D012", label: "Solar Panel Damage", description: "Cracked panel, loose mounting, or debris accumulation", zone: "roof_attic", visualSignal: "Cracked glass, loose racking, debris on panels", confidenceTrigger: "high", primaryTrade: "T04", secondaryTrades: ["T01"], estimatedValueMin: 500, estimatedValueMax: 5000, urgency: "high", keywords: ["solar", "panel", "cracked", "loose", "debris"] },
  { id: "D013", label: "Inadequate Attic Insulation", description: "Thin or missing insulation batts visible from attic hatch", zone: "roof_attic", visualSignal: "Visible joists, thin insulation layer", confidenceTrigger: "high", primaryTrade: "T26", secondaryTrades: [], estimatedValueMin: 1500, estimatedValueMax: 4000, urgency: "medium", keywords: ["insulation", "attic", "thin", "missing", "joists visible"] },

  // ── EXTERIOR WALLS & SIDING ────────────────────────────────────────────────
  { id: "D020", label: "Peeling Exterior Paint", description: "Visible paint failure, bubbling, or severe fading on exterior walls", zone: "exterior_walls", visualSignal: "Peeling, bubbling, or faded paint on siding", confidenceTrigger: "high", primaryTrade: "T15", secondaryTrades: [], estimatedValueMin: 1500, estimatedValueMax: 8000, urgency: "medium", keywords: ["peeling", "paint", "exterior", "bubbling", "fading"] },
  { id: "D021", label: "Missing Caulking Around Windows/Doors", description: "Visible gaps in caulking allowing air and water infiltration", zone: "exterior_walls", visualSignal: "Gaps, cracks, or missing caulk at window/door frames", confidenceTrigger: "high", primaryTrade: "T18", secondaryTrades: ["T14"], estimatedValueMin: 200, estimatedValueMax: 800, urgency: "high", keywords: ["caulking", "gaps", "windows", "doors", "weatherstripping"] },
  { id: "D022", label: "Wood Rot on Trim or Siding", description: "Soft, discolored, or missing wood on trim, siding, or window frames", zone: "exterior_walls", visualSignal: "Discolored, soft, or missing wood material", confidenceTrigger: "high", primaryTrade: "T42", secondaryTrades: ["T18"], estimatedValueMin: 500, estimatedValueMax: 4000, urgency: "high", keywords: ["rot", "wood", "trim", "siding", "soft", "discolored"] },
  { id: "D023", label: "Damaged Vinyl Siding", description: "Cracks, holes, warping, or severe fading in vinyl siding panels", zone: "exterior_walls", visualSignal: "Cracked, warped, or missing siding panels", confidenceTrigger: "high", primaryTrade: "T42", secondaryTrades: [], estimatedValueMin: 800, estimatedValueMax: 5000, urgency: "medium", keywords: ["vinyl", "siding", "cracked", "warped", "holes", "fading"] },
  { id: "D024", label: "Stucco Cracks", description: "Hairline to wide cracks in stucco exterior, or efflorescence staining", zone: "exterior_walls", visualSignal: "Cracks, white mineral deposits on stucco surface", confidenceTrigger: "high", primaryTrade: "T42", secondaryTrades: ["T41"], estimatedValueMin: 500, estimatedValueMax: 5000, urgency: "high", keywords: ["stucco", "cracks", "efflorescence", "hairline", "white deposits"] },
  { id: "D025", label: "Brick Mortar Deterioration", description: "Crumbling mortar joints or spalling brick on exterior walls", zone: "exterior_walls", visualSignal: "Missing or crumbling mortar, spalled brick faces", confidenceTrigger: "high", primaryTrade: "T41", secondaryTrades: [], estimatedValueMin: 800, estimatedValueMax: 6000, urgency: "high", keywords: ["brick", "mortar", "tuckpointing", "spalling", "crumbling"] },
  { id: "D026", label: "Mold or Mildew on Siding", description: "Dark streaking or green patches on exterior siding", zone: "exterior_walls", visualSignal: "Dark or green discoloration on siding surface", confidenceTrigger: "high", primaryTrade: "T35", secondaryTrades: ["T13"], estimatedValueMin: 300, estimatedValueMax: 3000, urgency: "high", keywords: ["mold", "mildew", "siding", "dark streaks", "green"] },
  { id: "D027", label: "Hose Bib Leaking", description: "Visible drip or rust staining on exterior wall near hose connection", zone: "exterior_walls", visualSignal: "Rust staining, water marks below hose bib", confidenceTrigger: "high", primaryTrade: "T03", secondaryTrades: [], estimatedValueMin: 100, estimatedValueMax: 400, urgency: "medium", keywords: ["hose bib", "spigot", "leaking", "rust", "water stain"] },
  { id: "D028", label: "Dryer Vent Clogged or Damaged", description: "Lint buildup or damaged vent cover on exterior wall", zone: "exterior_walls", visualSignal: "Lint visible at vent opening, damaged cover", confidenceTrigger: "high", primaryTrade: "T18", secondaryTrades: ["T39"], estimatedValueMin: 100, estimatedValueMax: 300, urgency: "safety", keywords: ["dryer vent", "lint", "clogged", "fire hazard", "cover"] },

  // ── FOUNDATION & DRAINAGE ─────────────────────────────────────────────────
  { id: "D040", label: "Horizontal Foundation Cracks", description: "Wide horizontal cracks in block or poured concrete foundation wall", zone: "foundation_drainage", visualSignal: "Horizontal crack lines in foundation wall", confidenceTrigger: "high", primaryTrade: "T05", secondaryTrades: [], estimatedValueMin: 5000, estimatedValueMax: 30000, urgency: "safety", keywords: ["foundation", "horizontal crack", "structural", "block wall", "poured concrete"] },
  { id: "D041", label: "Diagonal Foundation Cracks", description: "Diagonal cracks in foundation indicating settling or movement", zone: "foundation_drainage", visualSignal: "Diagonal crack lines at corners or mid-wall", confidenceTrigger: "high", primaryTrade: "T05", secondaryTrades: [], estimatedValueMin: 1500, estimatedValueMax: 15000, urgency: "high", keywords: ["foundation", "diagonal crack", "settling", "movement"] },
  { id: "D042", label: "Standing Water Near Foundation", description: "Pooling water at or near the foundation after rain", zone: "foundation_drainage", visualSignal: "Water pooling, water staining on foundation", confidenceTrigger: "high", primaryTrade: "T05", secondaryTrades: ["T03"], estimatedValueMin: 500, estimatedValueMax: 5000, urgency: "high", keywords: ["standing water", "foundation", "pooling", "drainage"] },
  { id: "D043", label: "Negative Grade Toward House", description: "Soil or lawn slopes toward the foundation rather than away", zone: "foundation_drainage", visualSignal: "Visible slope toward house, water channels toward foundation", confidenceTrigger: "medium", primaryTrade: "T08", secondaryTrades: ["T05"], estimatedValueMin: 500, estimatedValueMax: 3000, urgency: "high", keywords: ["grade", "slope", "drainage", "foundation", "negative grade"] },
  { id: "D044", label: "Retaining Wall Leaning or Cracking", description: "Visible tilt, cracks, or separated sections in retaining wall", zone: "foundation_drainage", visualSignal: "Leaning wall, visible cracks, separated blocks", confidenceTrigger: "high", primaryTrade: "T05", secondaryTrades: ["T41"], estimatedValueMin: 2000, estimatedValueMax: 15000, urgency: "safety", keywords: ["retaining wall", "leaning", "cracking", "tilt", "blocks"] },
  { id: "D045", label: "French Drain Needed", description: "Chronic standing water or soggy lawn areas indicating drainage issue", zone: "foundation_drainage", visualSignal: "Persistent wet areas, dead grass from waterlogging", confidenceTrigger: "medium", primaryTrade: "T03", secondaryTrades: ["T08"], estimatedValueMin: 1500, estimatedValueMax: 6000, urgency: "high", keywords: ["french drain", "drainage", "standing water", "soggy", "waterlogging"] },

  // ── DRIVEWAY & HARDSCAPE ──────────────────────────────────────────────────
  { id: "D060", label: "Cracked Driveway Concrete", description: "Hairline to wide cracks or heaving sections in driveway", zone: "driveway_hardscape", visualSignal: "Visible cracks, heaved sections, crumbling edges", confidenceTrigger: "high", primaryTrade: "T07", secondaryTrades: [], estimatedValueMin: 500, estimatedValueMax: 8000, urgency: "medium", keywords: ["driveway", "crack", "concrete", "heaving", "crumbling"] },
  { id: "D061", label: "Cracked or Uneven Sidewalk", description: "Trip hazard from raised or cracked sidewalk sections", zone: "driveway_hardscape", visualSignal: "Raised edges, cracks, crumbling concrete on sidewalk", confidenceTrigger: "high", primaryTrade: "T07", secondaryTrades: [], estimatedValueMin: 300, estimatedValueMax: 3000, urgency: "safety", keywords: ["sidewalk", "crack", "uneven", "trip hazard", "raised"] },
  { id: "D062", label: "Paver Driveway Settling", description: "Sunken pavers, uneven surface, or sand loss between pavers", zone: "driveway_hardscape", visualSignal: "Sunken or raised paver sections, sand visible", confidenceTrigger: "high", primaryTrade: "T07", secondaryTrades: ["T08"], estimatedValueMin: 500, estimatedValueMax: 5000, urgency: "medium", keywords: ["pavers", "settling", "sunken", "uneven", "sand loss"] },
  { id: "D063", label: "Cracked or Damaged Patio", description: "Heaving, cracks, or spalling on concrete or paver patio", zone: "driveway_hardscape", visualSignal: "Cracks, heaved sections, surface erosion on patio", confidenceTrigger: "high", primaryTrade: "T07", secondaryTrades: ["T21"], estimatedValueMin: 500, estimatedValueMax: 6000, urgency: "medium", keywords: ["patio", "crack", "heaving", "spalling", "concrete"] },
  { id: "D064", label: "Steps Cracking or Settling", description: "Cracked risers, uneven steps, or loose handrail", zone: "driveway_hardscape", visualSignal: "Cracked concrete, uneven step surfaces, loose rail", confidenceTrigger: "high", primaryTrade: "T07", secondaryTrades: ["T41"], estimatedValueMin: 500, estimatedValueMax: 4000, urgency: "safety", keywords: ["steps", "stairs", "crack", "settling", "handrail", "loose"] },

  // ── FRONT YARD ────────────────────────────────────────────────────────────
  { id: "D080", label: "Dead or Diseased Trees", description: "Brown canopy, bare branches, or fungal growth on trees", zone: "front_yard", visualSignal: "Brown or absent foliage, fungal conks on trunk", confidenceTrigger: "high", primaryTrade: "T12", secondaryTrades: [], estimatedValueMin: 500, estimatedValueMax: 5000, urgency: "safety", keywords: ["dead tree", "diseased", "brown", "fungal", "bare branches"] },
  { id: "D081", label: "Overhanging Branches Near Roof", description: "Tree branches touching or within 3 feet of roof surface", zone: "front_yard", visualSignal: "Branches contacting or nearly contacting roofline", confidenceTrigger: "high", primaryTrade: "T12", secondaryTrades: [], estimatedValueMin: 300, estimatedValueMax: 2000, urgency: "high", keywords: ["overhanging", "branches", "roof", "tree", "trimming"] },
  { id: "D082", label: "Tree Roots Lifting Hardscape", description: "Visible root damage to sidewalk, driveway, or patio", zone: "front_yard", visualSignal: "Raised concrete sections with visible root cause", confidenceTrigger: "high", primaryTrade: "T12", secondaryTrades: ["T07"], estimatedValueMin: 500, estimatedValueMax: 5000, urgency: "safety", keywords: ["tree roots", "lifting", "sidewalk", "driveway", "concrete"] },
  { id: "D083", label: "Broken or Misaligned Sprinkler Heads", description: "Broken sprinkler head or water spraying onto hardscape", zone: "front_yard", visualSignal: "Broken head, water spraying sidewalk or street", confidenceTrigger: "high", primaryTrade: "T10", secondaryTrades: [], estimatedValueMin: 100, estimatedValueMax: 500, urgency: "medium", keywords: ["sprinkler", "broken", "misaligned", "irrigation", "water waste"] },
  { id: "D084", label: "Overgrown Shrubs Blocking Windows", description: "Shrubs taller than window sill, blocking natural light and egress", zone: "front_yard", visualSignal: "Shrubs at or above window height", confidenceTrigger: "high", primaryTrade: "T08", secondaryTrades: [], estimatedValueMin: 150, estimatedValueMax: 800, urgency: "medium", keywords: ["shrubs", "overgrown", "windows", "blocking", "trimming"] },
  { id: "D085", label: "Lawn Bare Spots or Dead Grass", description: "Bare soil, brown patches, or weed-dominant lawn", zone: "front_yard", visualSignal: "Bare soil, brown or dead grass areas", confidenceTrigger: "high", primaryTrade: "T09", secondaryTrades: ["T08"], estimatedValueMin: 200, estimatedValueMax: 2000, urgency: "medium", keywords: ["bare spots", "dead grass", "lawn", "brown patches", "weeds"] },
  { id: "D086", label: "Artificial Turf Opportunity", description: "Patchy or bare lawn in high-water-use area suitable for turf conversion", zone: "front_yard", visualSignal: "Patchy lawn, visible irrigation, water restrictions", confidenceTrigger: "medium", primaryTrade: "T31", secondaryTrades: [], estimatedValueMin: 3000, estimatedValueMax: 15000, urgency: "low", keywords: ["artificial turf", "synthetic grass", "water saving", "conversion"] },
  { id: "D087", label: "Outdoor Lighting Not Working", description: "Dark fixture, broken lens, or missing bulb in landscape lighting", zone: "front_yard", visualSignal: "Dark or damaged outdoor light fixture", confidenceTrigger: "high", primaryTrade: "T32", secondaryTrades: [], estimatedValueMin: 100, estimatedValueMax: 800, urgency: "safety", keywords: ["outdoor lighting", "broken", "dark", "landscape light", "security"] },
  { id: "D088", label: "Mosquito Breeding Areas", description: "Standing water in planters, birdbaths, or low spots", zone: "front_yard", visualSignal: "Standing water in containers or low areas", confidenceTrigger: "high", primaryTrade: "T11", secondaryTrades: [], estimatedValueMin: 150, estimatedValueMax: 600, urgency: "high", keywords: ["mosquito", "standing water", "breeding", "planters", "birdbath"] },

  // ── BACK YARD ─────────────────────────────────────────────────────────────
  { id: "D100", label: "Fence Damage or Rot", description: "Leaning, broken boards, or missing fence sections", zone: "back_yard", visualSignal: "Leaning or broken fence boards, gaps in fence line", confidenceTrigger: "high", primaryTrade: "T06", secondaryTrades: [], estimatedValueMin: 500, estimatedValueMax: 5000, urgency: "medium", keywords: ["fence", "damage", "rot", "leaning", "broken boards"] },
  { id: "D101", label: "Gate Not Closing or Latching", description: "Sagging gate, broken hardware, or gate that won't latch", zone: "back_yard", visualSignal: "Sagging gate, visible gap when closed", confidenceTrigger: "high", primaryTrade: "T06", secondaryTrades: [], estimatedValueMin: 150, estimatedValueMax: 600, urgency: "safety", keywords: ["gate", "sagging", "latch", "broken", "not closing"] },
  { id: "D102", label: "Deck Rotting or Damaged", description: "Soft boards, discoloration, or missing balusters on deck", zone: "back_yard", visualSignal: "Soft or discolored deck boards, missing balusters", confidenceTrigger: "high", primaryTrade: "T21", secondaryTrades: [], estimatedValueMin: 500, estimatedValueMax: 8000, urgency: "safety", keywords: ["deck", "rot", "soft boards", "balusters", "damage"] },
  { id: "D103", label: "Pool Equipment Damage", description: "Rust, broken pump housing, or cracked pipes on pool equipment", zone: "back_yard", visualSignal: "Rust, cracks, or visible damage on pool equipment", confidenceTrigger: "high", primaryTrade: "T19", secondaryTrades: [], estimatedValueMin: 300, estimatedValueMax: 3000, urgency: "high", keywords: ["pool", "equipment", "pump", "rust", "cracked pipes"] },
  { id: "D104", label: "Pool Surface Staining or Cracking", description: "Visible stains, cracks, or rough surface in pool interior", zone: "back_yard", visualSignal: "Stains, cracks, or rough texture on pool surface", confidenceTrigger: "high", primaryTrade: "T19", secondaryTrades: [], estimatedValueMin: 2000, estimatedValueMax: 12000, urgency: "medium", keywords: ["pool", "staining", "cracking", "resurfacing", "rough"] },
  { id: "D105", label: "Pergola or Shade Structure Damaged", description: "Rot, missing slats, or leaning posts on pergola", zone: "back_yard", visualSignal: "Rot, missing components, or structural lean", confidenceTrigger: "high", primaryTrade: "T21", secondaryTrades: ["T43"], estimatedValueMin: 500, estimatedValueMax: 6000, urgency: "medium", keywords: ["pergola", "shade", "rot", "leaning", "missing slats"] },
  { id: "D106", label: "Drainage Issue in Back Yard", description: "Standing water, erosion channels, or soggy areas after rain", zone: "back_yard", visualSignal: "Standing water, erosion, or dead grass from waterlogging", confidenceTrigger: "high", primaryTrade: "T03", secondaryTrades: ["T08"], estimatedValueMin: 1000, estimatedValueMax: 5000, urgency: "high", keywords: ["drainage", "standing water", "erosion", "soggy", "backyard"] },
  { id: "D107", label: "Shed Deteriorating", description: "Rot, missing siding, or damaged roof on storage shed", zone: "back_yard", visualSignal: "Rot, holes, or damaged roofing on shed", confidenceTrigger: "high", primaryTrade: "T46", secondaryTrades: [], estimatedValueMin: 500, estimatedValueMax: 5000, urgency: "medium", keywords: ["shed", "rot", "deteriorating", "damaged", "storage"] },
  { id: "D108", label: "Hot Tub Cover Damaged", description: "Torn, waterlogged, or severely faded hot tub cover", zone: "back_yard", visualSignal: "Torn, sagging, or discolored hot tub cover", confidenceTrigger: "high", primaryTrade: "T47", secondaryTrades: [], estimatedValueMin: 200, estimatedValueMax: 800, urgency: "medium", keywords: ["hot tub", "cover", "torn", "waterlogged", "damaged"] },

  // ── GARAGE ────────────────────────────────────────────────────────────────
  { id: "D120", label: "Garage Door Dented or Damaged", description: "Visible dents, bent panels, or rust on garage door", zone: "garage", visualSignal: "Dents, bent panels, rust on garage door surface", confidenceTrigger: "high", primaryTrade: "T22", secondaryTrades: [], estimatedValueMin: 300, estimatedValueMax: 2500, urgency: "medium", keywords: ["garage door", "dented", "bent", "rust", "damaged panels"] },
  { id: "D121", label: "Garage Floor Cracked or Stained", description: "Cracks, oil stains, or spalling on garage floor", zone: "garage", visualSignal: "Cracks, oil stains, or surface erosion on floor", confidenceTrigger: "high", primaryTrade: "T33", secondaryTrades: ["T07"], estimatedValueMin: 500, estimatedValueMax: 3500, urgency: "low", keywords: ["garage floor", "crack", "oil stain", "epoxy", "spalling"] },
  { id: "D122", label: "Garage Ceiling Water Staining", description: "Brown stains or sagging drywall on garage ceiling", zone: "garage", visualSignal: "Brown stains or sagging on garage ceiling", confidenceTrigger: "high", primaryTrade: "T23", secondaryTrades: ["T01"], estimatedValueMin: 300, estimatedValueMax: 3000, urgency: "high", keywords: ["garage ceiling", "water stain", "sagging", "drywall", "leak"] },
  { id: "D123", label: "EV Charger Not Installed", description: "No Level 2 outlet visible in garage for electric vehicle charging", zone: "garage", visualSignal: "No 240V outlet or charger unit visible", confidenceTrigger: "medium", primaryTrade: "T04", secondaryTrades: ["T30"], estimatedValueMin: 500, estimatedValueMax: 1500, urgency: "low", keywords: ["EV charger", "electric vehicle", "Level 2", "240V", "outlet"] },
  { id: "D124", label: "Water Heater Aging or Leaking", description: "Rust, age label showing 10+ years, or water staining around base", zone: "garage", visualSignal: "Rust on tank, water staining at base, old age label", confidenceTrigger: "high", primaryTrade: "T03", secondaryTrades: [], estimatedValueMin: 800, estimatedValueMax: 2500, urgency: "high", keywords: ["water heater", "aging", "rust", "leaking", "old"] },
  { id: "D125", label: "Pest Evidence in Garage", description: "Droppings, chewed boxes, or nests visible in garage", zone: "garage", visualSignal: "Droppings, chewed materials, or nesting material", confidenceTrigger: "high", primaryTrade: "T11", secondaryTrades: [], estimatedValueMin: 150, estimatedValueMax: 600, urgency: "high", keywords: ["pest", "rodent", "droppings", "chewed", "nesting", "garage"] },

  // ── KITCHEN ───────────────────────────────────────────────────────────────
  { id: "D140", label: "Cabinet Doors Damaged or Misaligned", description: "Broken hinges, warped doors, or missing hardware on cabinets", zone: "kitchen", visualSignal: "Misaligned, warped, or damaged cabinet doors", confidenceTrigger: "high", primaryTrade: "T24", secondaryTrades: [], estimatedValueMin: 200, estimatedValueMax: 3000, urgency: "low", keywords: ["cabinets", "doors", "hinges", "warped", "misaligned"] },
  { id: "D141", label: "Countertop Cracked or Chipped", description: "Visible crack, chip, or seam separation in countertop", zone: "kitchen", visualSignal: "Crack, chip, or separated seam on countertop surface", confidenceTrigger: "high", primaryTrade: "T25", secondaryTrades: [], estimatedValueMin: 300, estimatedValueMax: 5000, urgency: "medium", keywords: ["countertop", "crack", "chip", "seam", "granite", "quartz"] },
  { id: "D142", label: "Under-Sink Leak Evidence", description: "Water staining or swollen cabinet bottom under kitchen sink", zone: "kitchen", visualSignal: "Water staining, swollen or warped cabinet base", confidenceTrigger: "high", primaryTrade: "T03", secondaryTrades: [], estimatedValueMin: 200, estimatedValueMax: 1500, urgency: "high", keywords: ["under sink", "leak", "water stain", "swollen cabinet", "plumbing"] },
  { id: "D143", label: "Kitchen Floor Damaged", description: "Cracked tile, scratched hardwood, or bubbling LVP in kitchen", zone: "kitchen", visualSignal: "Cracks, scratches, or bubbling on kitchen floor", confidenceTrigger: "high", primaryTrade: "T17", secondaryTrades: [], estimatedValueMin: 500, estimatedValueMax: 5000, urgency: "medium", keywords: ["kitchen floor", "cracked tile", "scratched", "LVP", "bubbling"] },
  { id: "D144", label: "Ceiling Water Stain Above Kitchen", description: "Brown stain or sagging ceiling above kitchen area", zone: "kitchen", visualSignal: "Brown stain or sag on kitchen ceiling", confidenceTrigger: "high", primaryTrade: "T23", secondaryTrades: ["T03", "T01"], estimatedValueMin: 300, estimatedValueMax: 3000, urgency: "high", keywords: ["ceiling", "water stain", "brown", "sagging", "kitchen"] },

  // ── BATHROOMS ─────────────────────────────────────────────────────────────
  { id: "D160", label: "Grout Cracking or Missing", description: "Visible gaps, dark grout, or crumbling grout in bathroom", zone: "bathroom", visualSignal: "Gaps, dark discoloration, or crumbling grout lines", confidenceTrigger: "high", primaryTrade: "T18", secondaryTrades: ["T17"], estimatedValueMin: 200, estimatedValueMax: 1500, urgency: "high", keywords: ["grout", "cracking", "missing", "bathroom", "tile"] },
  { id: "D161", label: "Caulk Failing Around Tub or Shower", description: "Mold, gaps, or missing caulk at tub/shower surround", zone: "bathroom", visualSignal: "Mold, gaps, or missing caulk at tub/shower junction", confidenceTrigger: "high", primaryTrade: "T18", secondaryTrades: ["T35"], estimatedValueMin: 100, estimatedValueMax: 500, urgency: "high", keywords: ["caulk", "tub", "shower", "mold", "gaps", "failing"] },
  { id: "D162", label: "Mold on Bathroom Ceiling or Walls", description: "Visible black or green mold growth in bathroom", zone: "bathroom", visualSignal: "Black or green mold patches on ceiling or walls", confidenceTrigger: "high", primaryTrade: "T35", secondaryTrades: [], estimatedValueMin: 300, estimatedValueMax: 3000, urgency: "safety", keywords: ["mold", "bathroom", "black", "green", "ceiling", "walls"] },
  { id: "D163", label: "Toilet Running or Leaking", description: "Visible water on floor or running toilet sound", zone: "bathroom", visualSignal: "Water on floor, rust staining around toilet base", confidenceTrigger: "high", primaryTrade: "T03", secondaryTrades: [], estimatedValueMin: 100, estimatedValueMax: 600, urgency: "high", keywords: ["toilet", "running", "leaking", "water on floor", "rust"] },
  { id: "D164", label: "Bathroom Exhaust Fan Not Working", description: "Condensation on mirror or mold on ceiling from poor ventilation", zone: "bathroom", visualSignal: "Condensation, mold, or damaged fan cover", confidenceTrigger: "high", primaryTrade: "T04", secondaryTrades: ["T35"], estimatedValueMin: 100, estimatedValueMax: 400, urgency: "high", keywords: ["exhaust fan", "ventilation", "condensation", "mold", "bathroom"] },

  // ── LIVING AREAS ──────────────────────────────────────────────────────────
  { id: "D180", label: "Scratched or Damaged Hardwood Floors", description: "Visible scratches, gouges, or dull finish on hardwood floors", zone: "living_areas", visualSignal: "Scratches, gouges, or dull areas on hardwood", confidenceTrigger: "high", primaryTrade: "T17", secondaryTrades: [], estimatedValueMin: 500, estimatedValueMax: 4000, urgency: "medium", keywords: ["hardwood", "scratched", "gouges", "dull", "refinish"] },
  { id: "D181", label: "Water Stain on Ceiling", description: "Brown stain or bubbling paint on ceiling indicating active or past leak", zone: "living_areas", visualSignal: "Brown ring or bubble on ceiling surface", confidenceTrigger: "high", primaryTrade: "T23", secondaryTrades: ["T01", "T03"], estimatedValueMin: 300, estimatedValueMax: 3000, urgency: "high", keywords: ["ceiling", "water stain", "brown", "bubbling", "leak"] },
  { id: "D182", label: "Drywall Holes or Damage", description: "Visible holes, dents, or scuffs in drywall surfaces", zone: "living_areas", visualSignal: "Holes, dents, or scuffs on wall surfaces", confidenceTrigger: "high", primaryTrade: "T23", secondaryTrades: [], estimatedValueMin: 100, estimatedValueMax: 800, urgency: "low", keywords: ["drywall", "holes", "dents", "scuffs", "damage"] },
  { id: "D183", label: "Interior Paint Faded or Damaged", description: "Scuffs, fading, or outdated paint color throughout interior", zone: "living_areas", visualSignal: "Scuffs, fading, or dated paint on walls", confidenceTrigger: "high", primaryTrade: "T16", secondaryTrades: [], estimatedValueMin: 500, estimatedValueMax: 5000, urgency: "low", keywords: ["interior paint", "faded", "scuffs", "outdated", "walls"] },
  { id: "D184", label: "Windows Fogged or Broken", description: "Condensation between panes or cracked glass in windows", zone: "living_areas", visualSignal: "Foggy or condensation-filled window panes", confidenceTrigger: "high", primaryTrade: "T14", secondaryTrades: [], estimatedValueMin: 200, estimatedValueMax: 1500, urgency: "high", keywords: ["windows", "fogged", "condensation", "cracked", "broken seal"] },
  { id: "D185", label: "Fireplace Damaged or Outdated", description: "Cracked surround, outdated brick, or damaged mantel", zone: "living_areas", visualSignal: "Cracks, outdated style, or damage on fireplace", confidenceTrigger: "high", primaryTrade: "T28", secondaryTrades: ["T41"], estimatedValueMin: 500, estimatedValueMax: 5000, urgency: "medium", keywords: ["fireplace", "cracked", "surround", "mantel", "outdated"] },
  { id: "D186", label: "Electrical Outlets Damaged or Non-GFCI", description: "Cracked covers, discoloration, or non-GFCI outlets in wet areas", zone: "living_areas", visualSignal: "Cracked or discolored outlet covers", confidenceTrigger: "high", primaryTrade: "T04", secondaryTrades: [], estimatedValueMin: 50, estimatedValueMax: 300, urgency: "safety", keywords: ["outlets", "GFCI", "cracked", "discolored", "electrical"] },

  // ── LAUNDRY & UTILITY ─────────────────────────────────────────────────────
  { id: "D200", label: "Water Heater Aging", description: "Age label showing 10+ years, rust, or water staining at base", zone: "laundry_utility", visualSignal: "Rust, water staining, or old age label on water heater", confidenceTrigger: "high", primaryTrade: "T03", secondaryTrades: [], estimatedValueMin: 800, estimatedValueMax: 2500, urgency: "high", keywords: ["water heater", "aging", "rust", "old", "replacement"] },
  { id: "D201", label: "Washer Hose Aging", description: "Rubber (non-braided) washer hoses — high burst risk", zone: "laundry_utility", visualSignal: "Rubber hoses visible behind washer", confidenceTrigger: "high", primaryTrade: "T03", secondaryTrades: [], estimatedValueMin: 50, estimatedValueMax: 200, urgency: "high", keywords: ["washer hose", "rubber", "burst", "braided", "replacement"] },
  { id: "D202", label: "Sump Pump Aging or Absent", description: "Old sump pump, no battery backup, or no pump in flood-prone area", zone: "laundry_utility", visualSignal: "Old unit, no backup battery, or empty sump pit", confidenceTrigger: "high", primaryTrade: "T27", secondaryTrades: ["T03"], estimatedValueMin: 500, estimatedValueMax: 2000, urgency: "high", keywords: ["sump pump", "aging", "absent", "battery backup", "flood"] },

  // ── BASEMENT & CRAWL SPACE ────────────────────────────────────────────────
  { id: "D220", label: "Basement Water Intrusion", description: "Efflorescence, water staining, or standing water in basement", zone: "basement_crawlspace", visualSignal: "White mineral deposits, water stains, or standing water", confidenceTrigger: "high", primaryTrade: "T27", secondaryTrades: [], estimatedValueMin: 2000, estimatedValueMax: 15000, urgency: "high", keywords: ["basement", "water", "efflorescence", "staining", "flooding"] },
  { id: "D221", label: "Mold in Basement or Crawl Space", description: "Visible mold on walls, joists, or insulation", zone: "basement_crawlspace", visualSignal: "Mold growth on surfaces, musty appearance", confidenceTrigger: "high", primaryTrade: "T35", secondaryTrades: [], estimatedValueMin: 1500, estimatedValueMax: 10000, urgency: "safety", keywords: ["mold", "basement", "crawl space", "joists", "remediation"] },
  { id: "D222", label: "Structural Beam Damage", description: "Rot, insect damage, or sagging in structural beams or joists", zone: "basement_crawlspace", visualSignal: "Rot, insect galleries, or visible sag in beams", confidenceTrigger: "high", primaryTrade: "T05", secondaryTrades: [], estimatedValueMin: 2000, estimatedValueMax: 15000, urgency: "safety", keywords: ["structural beam", "rot", "insect damage", "sagging", "joists"] },
  { id: "D223", label: "Vapor Barrier Absent or Damaged", description: "Bare soil or torn poly sheeting in crawl space", zone: "basement_crawlspace", visualSignal: "Bare soil or torn/missing vapor barrier", confidenceTrigger: "high", primaryTrade: "T27", secondaryTrades: [], estimatedValueMin: 500, estimatedValueMax: 2500, urgency: "high", keywords: ["vapor barrier", "crawl space", "bare soil", "moisture", "poly"] },

  // ── RURAL & AGRICULTURAL ──────────────────────────────────────────────────
  { id: "D240", label: "Field Fence Damaged", description: "Broken wire, leaning posts, or gaps in agricultural fencing", zone: "rural_agricultural", visualSignal: "Broken wire, leaning posts, gaps in fence line", confidenceTrigger: "high", primaryTrade: "T45", secondaryTrades: [], estimatedValueMin: 500, estimatedValueMax: 5000, urgency: "high", keywords: ["field fence", "barbed wire", "broken", "leaning", "agricultural"] },
  { id: "D241", label: "Barn Roof Damaged", description: "Missing metal panels, rust, or holes in barn roof", zone: "rural_agricultural", visualSignal: "Missing panels, rust, or holes on barn roof", confidenceTrigger: "high", primaryTrade: "T01", secondaryTrades: ["T45"], estimatedValueMin: 1000, estimatedValueMax: 10000, urgency: "high", keywords: ["barn", "roof", "metal", "missing panels", "rust"] },
  { id: "D242", label: "Septic System Indicators", description: "Wet area over drain field, odor, or old tank visible", zone: "rural_agricultural", visualSignal: "Wet or lush grass over drain field, old tank", confidenceTrigger: "high", primaryTrade: "T40", secondaryTrades: [], estimatedValueMin: 500, estimatedValueMax: 8000, urgency: "safety", keywords: ["septic", "drain field", "wet area", "odor", "old tank"] },
  { id: "D243", label: "Well Pump Aging", description: "Old pressure tank, rust, or low water pressure from well", zone: "rural_agricultural", visualSignal: "Old pressure tank, rust, or small tank size", confidenceTrigger: "high", primaryTrade: "T40", secondaryTrades: [], estimatedValueMin: 500, estimatedValueMax: 3000, urgency: "high", keywords: ["well pump", "pressure tank", "aging", "rust", "low pressure"] },
];

// ─────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────

/** Get all detections for a given zone */
export function getDetectionsByZone(zone: PropertyZone): Detection[] {
  return DETECTIONS.filter(d => d.zone === zone);
}

/** Get all detections that route to a given trade */
export function getDetectionsByTrade(tradeId: string): Detection[] {
  return DETECTIONS.filter(d => d.primaryTrade === tradeId || d.secondaryTrades.includes(tradeId));
}

/** Get a detection by ID */
export function getDetectionById(id: string): Detection | undefined {
  return DETECTIONS.find(d => d.id === id);
}

/** Get the trade object for a detection */
export function getTradeForDetection(detection: Detection): Trade {
  return TRADES[detection.primaryTrade];
}

/** Get urgency color for display */
export function getUrgencyColor(urgency: Urgency): string {
  switch (urgency) {
    case "safety": return "#EF4444";
    case "high": return "#F59E0B";
    case "medium": return "#3B82F6";
    case "low": return "#10B981";
  }
}

/** Get urgency label */
export function getUrgencyLabel(urgency: Urgency): string {
  switch (urgency) {
    case "safety": return "Safety Issue";
    case "high": return "High Priority";
    case "medium": return "Medium Priority";
    case "low": return "Low Priority";
  }
}

/** Search detections by keyword */
export function searchDetections(query: string): Detection[] {
  const q = query.toLowerCase();
  return DETECTIONS.filter(d =>
    d.label.toLowerCase().includes(q) ||
    d.description.toLowerCase().includes(q) ||
    d.keywords.some(k => k.toLowerCase().includes(q))
  );
}

/** Get all trade IDs sorted by detection count (most detectable first) */
export function getTradesByDetectionCount(): { tradeId: string; count: number }[] {
  const counts: Record<string, number> = {};
  DETECTIONS.forEach(d => {
    counts[d.primaryTrade] = (counts[d.primaryTrade] ?? 0) + 1;
    d.secondaryTrades.forEach(t => {
      counts[t] = (counts[t] ?? 0) + 0.5;
    });
  });
  return Object.entries(counts)
    .map(([tradeId, count]) => ({ tradeId, count }))
    .sort((a, b) => b.count - a.count);
}

/** Estimated annual platform revenue per trade at 500 partners */
export const TRADE_REVENUE_PROJECTIONS: Record<string, { annualDetections: number; conversionRate: number; avgJobValue: number }> = {
  T01: { annualDetections: 1800, conversionRate: 0.12, avgJobValue: 4200 },
  T02: { annualDetections: 2200, conversionRate: 0.15, avgJobValue: 2800 },
  T03: { annualDetections: 3800, conversionRate: 0.20, avgJobValue: 1200 },
  T04: { annualDetections: 1600, conversionRate: 0.12, avgJobValue: 1800 },
  T05: { annualDetections: 600, conversionRate: 0.08, avgJobValue: 8500 },
  T06: { annualDetections: 3500, conversionRate: 0.18, avgJobValue: 1800 },
  T07: { annualDetections: 2800, conversionRate: 0.14, avgJobValue: 2200 },
  T08: { annualDetections: 4200, conversionRate: 0.20, avgJobValue: 1400 },
  T09: { annualDetections: 3200, conversionRate: 0.22, avgJobValue: 600 },
  T10: { annualDetections: 2400, conversionRate: 0.20, avgJobValue: 800 },
  T11: { annualDetections: 5500, conversionRate: 0.25, avgJobValue: 450 },
  T12: { annualDetections: 2100, conversionRate: 0.16, avgJobValue: 1600 },
  T13: { annualDetections: 3000, conversionRate: 0.22, avgJobValue: 500 },
  T14: { annualDetections: 1400, conversionRate: 0.11, avgJobValue: 2400 },
  T15: { annualDetections: 1600, conversionRate: 0.10, avgJobValue: 3800 },
  T16: { annualDetections: 1800, conversionRate: 0.12, avgJobValue: 2200 },
  T17: { annualDetections: 1400, conversionRate: 0.11, avgJobValue: 3200 },
  T19: { annualDetections: 900, conversionRate: 0.14, avgJobValue: 2600 },
  T20: { annualDetections: 2500, conversionRate: 0.20, avgJobValue: 600 },
  T21: { annualDetections: 1200, conversionRate: 0.12, avgJobValue: 4500 },
  T26: { annualDetections: 1500, conversionRate: 0.14, avgJobValue: 2500 },
  T27: { annualDetections: 1000, conversionRate: 0.10, avgJobValue: 5000 },
  T28: { annualDetections: 800, conversionRate: 0.15, avgJobValue: 1800 },
  T31: { annualDetections: 700, conversionRate: 0.08, avgJobValue: 8000 },
  T35: { annualDetections: 1200, conversionRate: 0.15, avgJobValue: 3500 },
};

export const PLATFORM_FEE_RATE = 0.12; // 12% of job value
export const FIELD_PARTNER_COMMISSION_RATE = 0.05; // 5% of job value to referring partner
