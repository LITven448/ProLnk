// AUTO-DERIVED from client/src/data/serviceCategories.ts — the canonical 91-service list.
// Platform fee is determined SERVER-SIDE by service type, never accepted from the client.
// Fee inversely tracks average ticket size (big projects lower %, small/frequent higher %),
// clamped to the canonical 6-15% band. Admin overrides live in the `industryRates` table
// (AdminCommissionRates page) and take precedence when present.

const FEE_MIN = 0.06;
const FEE_MAX = 0.15;
const DEFAULT_FEE = 0.10;

// serviceId -> average job value ($), from serviceCategories.ts
const SERVICE_AVG_VALUE: Record<string, number> = {
  "hvac": 425,
  "plumbing": 310,
  "electrical": 380,
  "roofing": 1200,
  "house-cleaning": 180,
  "landscaping": 250,
  "pest-control": 220,
  "handyman": 195,
  "painting": 950,
  "appliance-repair": 215,
  "flooring": 1800,
  "carpet-cleaning": 180,
  "carpet-installation": 1400,
  "pool-service": 280,
  "tree-service": 650,
  "concrete": 2100,
  "fencing": 2800,
  "garage-door": 320,
  "window-cleaning": 250,
  "pressure-washing": 280,
  "gutter-service": 220,
  "moving": 850,
  "junk-removal": 290,
  "locksmith": 175,
  "drywall": 680,
  "tile": 1500,
  "kitchen-remodel": 8500,
  "bathroom-remodel": 6000,
  "cabinet-install": 3200,
  "deck-patio": 4500,
  "foundation-repair": 5500,
  "insulation": 2200,
  "chimney": 380,
  "masonry": 2800,
  "siding": 7500,
  "window-replacement": 3800,
  "door-install": 750,
  "irrigation": 1200,
  "drainage": 1800,
  "air-duct-cleaning": 350,
  "septic": 420,
  "security-systems": 850,
  "smart-home": 650,
  "generator": 3200,
  "solar": 18000,
  "ev-charger": 1100,
  "countertops": 2800,
  "water-heater": 1100,
  "water-softener": 1800,
  "wallpaper": 750,
  "stairs-railing": 2200,
  "fireplace": 1500,
  "gutter-guards": 1200,
  "pool-construction": 45000,
  "home-theater": 3500,
  "shower-refinishing": 650,
  "sauna-hot-tub": 2800,
  "attic-conversion": 22000,
  "basement-finishing": 28000,
  "mold-remediation": 2500,
  "fire-water-restoration": 8500,
  "asbestos-removal": 3800,
  "roof-coating": 2800,
  "skylight": 2200,
  "sunroom": 18000,
  "radiant-floor": 5500,
  "window-tinting": 480,
  "epoxy-flooring": 2200,
  "stucco-repair": 1800,
  "mosquito-control": 320,
  "wildlife-removal": 480,
  "home-inspection": 380,
  "radon-testing": 280,
  "lead-paint": 550,
  "holiday-lighting": 850,
  "home-organizing": 420,
  "mobile-car-mechanic": 280,
  "mobile-auto-detailing": 220,
  "mobile-dog-grooming": 95,
  "dog-walking": 45,
  "tv-mounting": 180,
  "furniture-assembly": 120,
  "appliance-install": 175,
  "moving-packing": 480,
  "personal-chef": 350,
  "home-photography": 280,
  "interior-design": 2200,
  "estate-sale": 1800,
  "home-staging": 1500,
  "biohazard-cleanup": 4500,
  "notary": 85
};

/** Fee band by average job value. Tune these 6 numbers to reprice globally. */
export function feeForAvgValue(avg: number): number {
  if (avg >= 2000) return 0.07;
  if (avg >= 1000) return 0.08;
  if (avg >= 600)  return 0.09;
  if (avg >= 350)  return 0.10;
  if (avg >= 200)  return 0.12;
  return 0.14;
}

function clamp(r: number): number {
  return Math.min(FEE_MAX, Math.max(FEE_MIN, r));
}

/**
 * Server-authoritative platform-fee rate for a job's service type.
 * Accepts a service id ("kitchen-remodel") or display name ("Kitchen Remodel").
 * Falls back to DEFAULT_FEE for anything unrecognized. ALWAYS clamped to 6-15%.
 */
export function getPlatformFeeRate(serviceType?: string | null): number {
  if (!serviceType) return DEFAULT_FEE;
  const key = serviceType.trim().toLowerCase().replace(/\s+/g, "-").replace(/&/g, "").replace(/--+/g, "-");
  const avg = SERVICE_AVG_VALUE[key] ?? SERVICE_AVG_VALUE[serviceType.trim().toLowerCase()];
  if (avg == null) return DEFAULT_FEE;
  return clamp(feeForAvgValue(avg));
}
