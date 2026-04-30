/**
 * ProLnk Job Bundler Engine
 *
 * Problem: A homeowner has 5 detected issues at their address.
 * Naive approach: Send 5 separate leads to 5 different pros → 5 visits, 5 commissions, annoyed homeowner.
 * Smart approach: Find the fewest pros who can collectively cover all 5 issues → 2 visits, bundled deal,
 *                 happier homeowner, higher close rate, bigger average ticket per pro.
 *
 * Algorithm:
 *   1. For each detected issue, find all qualified pros in the network who can handle it
 *   2. Score each pro by how many of the address's open issues they can cover
 *   3. Use a greedy set-cover algorithm to select the minimum number of pros
 *      that collectively cover all issues (NP-hard in general, greedy gives ~63% optimal)
 *   4. Generate a BundleOffer: "2 pros can handle all 5 of your projects in 2 visits"
 *   5. Surface the bundle to the homeowner with estimated savings vs. individual quotes
 *
 * Rate limiting for UNSOLICITED outreach only:
 *   - Homeowner-initiated: surface everything, no limits
 *   - AI-initiated (proactive outreach): max 1 bundle per address per 14 days
 *     (not 3 individual offers — 1 well-curated bundle is less annoying and more effective)
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DetectedIssue {
  id: string;
  type: string;           // e.g., "roofing", "lawn_care", "pest_control"
  category: string;       // e.g., "exterior", "landscape", "services"
  confidence: number;
  estimatedValue: number;
  description: string;
  offerTrack: "repair" | "transformation";
  isInsuranceClaim: boolean;
  photoUrl?: string;
}

export interface ProCapability {
  partnerId: number;
  partnerName: string;
  serviceTypes: string[];   // list of service types this pro handles
  serviceCategories: string[];
  priorityScore: number;    // PPS score (0-105)
  verificationBadge: "bronze" | "silver" | "gold" | "platinum";
  avgResponseHours: number;
  closeRate: number;        // 0-1
  reviewScore: number;      // 0-5
  distanceMiles?: number;
  tier: string;
}

export interface BundleAssignment {
  pro: ProCapability;
  assignedIssues: DetectedIssue[];
  coverageCount: number;
  estimatedBundleValue: number;
  bundleDiscount: number;   // % discount for bundling (incentive to close)
}

export interface BundleOffer {
  bundleId: string;
  serviceAddress: string;
  totalIssues: number;
  coveredIssues: number;
  uncoveredIssues: DetectedIssue[]; // issues no pro in network can handle
  assignments: BundleAssignment[];
  totalProCount: number;
  totalEstimatedValue: number;
  estimatedVisits: number;
  vsIndividualVisits: number;       // how many visits without bundling
  visitSavings: number;             // visits saved
  requestedByHomeowner: boolean;
  generatedAt: Date;
  expiresAt: Date;                  // 72 hours for homeowner, 14 days for AI-initiated
}

// ─── Service Type → Category Mapping ─────────────────────────────────────────

export const SERVICE_CATEGORIES: Record<string, string[]> = {
  exterior: [
    "roofing", "gutters", "siding", "windows", "doors", "garage_door",
    "driveway", "walkway", "concrete", "fencing", "deck", "patio", "pergola",
    "pool", "hot_tub", "exterior_painting", "pressure_washing", "window_cleaning",
    "gutter_cleaning", "chimney",
  ],
  landscape: [
    "lawn_care", "landscaping", "tree_service", "tree_removal", "stump_grinding",
    "irrigation", "sprinkler_repair", "mulching", "hardscaping", "retaining_wall",
    "drainage", "erosion_control", "outdoor_lighting",
  ],
  interior: [
    "flooring", "tile", "carpet", "interior_painting", "drywall", "ceiling",
    "kitchen_remodel", "bathroom_remodel", "cabinet_refinishing", "countertops",
    "backsplash", "closet_organization", "basement_finishing",
  ],
  systems: [
    "hvac", "hvac_maintenance", "plumbing", "electrical", "insulation",
    "attic_insulation", "crawl_space", "waterproofing", "foundation",
    "generator", "solar", "ev_charger", "smart_home", "security_system", "water_heater",
  ],
  services: [
    "pest_control", "termite_inspection", "mold_remediation", "air_duct_cleaning",
    "fireplace", "appliance_repair", "handyman", "junk_removal", "house_cleaning",
    "carpet_cleaning", "power_washing",
  ],
  specialty: [
    "home_warranty_item", "insurance_claim_candidate", "safety_hazard",
    "code_violation", "accessibility_upgrade", "radon_testing", "asbestos_inspection",
  ],
};

// Handyman pros can cover many small tasks across categories
const HANDYMAN_COVERAGE: string[] = [
  "drywall", "cabinet_refinishing", "door", "window_cleaning", "gutter_cleaning",
  "pressure_washing", "interior_painting", "exterior_painting", "tile", "flooring",
  "closet_organization", "appliance_repair", "smart_home", "security_system",
];

// ─── Pro Scoring ──────────────────────────────────────────────────────────────

/**
 * Score a pro's ability to cover a set of issues.
 * Higher score = better fit for this bundle.
 */
function scoreProForBundle(pro: ProCapability, issues: DetectedIssue[]): number {
  const coverableIssues = issues.filter(issue => canProHandleIssue(pro, issue));
  if (coverableIssues.length === 0) return 0;

  // Base score: number of issues covered
  let score = coverableIssues.length * 10;

  // Bonus: PPS score (quality signal)
  score += pro.priorityScore * 0.1;

  // Bonus: verification level
  const badgeBonus = { bronze: 0, silver: 2, gold: 4, platinum: 6 };
  score += badgeBonus[pro.verificationBadge] ?? 0;

  // Bonus: close rate (pros who close deals are more valuable)
  score += pro.closeRate * 5;

  // Bonus: review score
  score += pro.reviewScore * 2;

  // Penalty: distance (prefer local pros)
  if (pro.distanceMiles) {
    score -= Math.min(pro.distanceMiles * 0.1, 5);
  }

  // Bonus: estimated bundle value (higher value = more commission)
  const bundleValue = coverableIssues.reduce((sum, i) => sum + i.estimatedValue, 0);
  score += bundleValue * 0.001;

  return score;
}

/**
 * Determine if a pro can handle a specific issue type.
 */
export function canProHandleIssue(pro: ProCapability, issue: DetectedIssue): boolean {
  // Direct service type match
  if (pro.serviceTypes.includes(issue.type)) return true;

  // Category-level match (pro covers the whole category)
  if (pro.serviceCategories.includes(issue.category)) return true;

  // Handyman can cover many small tasks
  if (pro.serviceTypes.includes("handyman") && HANDYMAN_COVERAGE.includes(issue.type)) return true;

  // General contractor can cover most exterior/interior work
  if (pro.serviceTypes.includes("general_contractor")) {
    if (["exterior", "interior"].includes(issue.category)) return true;
  }

  return false;
}

// ─── Greedy Set Cover Algorithm ───────────────────────────────────────────────

/**
 * Greedy set cover: find the minimum number of pros to cover all issues.
 * This is the classic greedy approximation for the NP-hard set cover problem.
 * Greedy gives a ln(n)+1 approximation ratio — good enough for our use case.
 *
 * Modified to also optimize for pro quality (PPS score) when coverage is equal.
 */
export function greedySetCover(
  issues: DetectedIssue[],
  pros: ProCapability[]
): BundleAssignment[] {
  const uncoveredIssues = new Set(issues.map(i => i.id));
  const assignments: BundleAssignment[] = [];
  const usedPros = new Set<number>();

  // Continue until all issues are covered or no more pros can help
  while (uncoveredIssues.size > 0) {
    let bestPro: ProCapability | null = null;
    let bestCoverage: DetectedIssue[] = [];
    let bestScore = -1;

    for (const pro of pros) {
      if (usedPros.has(pro.partnerId)) continue;

      // Find which uncovered issues this pro can handle
      const coverable = issues.filter(
        issue => uncoveredIssues.has(issue.id) && canProHandleIssue(pro, issue)
      );

      if (coverable.length === 0) continue;

      const score = scoreProForBundle(pro, coverable);
      if (score > bestScore) {
        bestScore = score;
        bestPro = pro;
        bestCoverage = coverable;
      }
    }

    if (!bestPro || bestCoverage.length === 0) break; // no more coverage possible

    // Assign this pro to their covered issues
    const bundleValue = bestCoverage.reduce((sum, i) => sum + i.estimatedValue, 0);
    const bundleDiscount = bestCoverage.length >= 3 ? 5 : bestCoverage.length >= 2 ? 3 : 0;

    assignments.push({
      pro: bestPro,
      assignedIssues: bestCoverage,
      coverageCount: bestCoverage.length,
      estimatedBundleValue: bundleValue,
      bundleDiscount,
    });

    usedPros.add(bestPro.partnerId);
    bestCoverage.forEach(issue => uncoveredIssues.delete(issue.id));
  }

  return assignments;
}

// ─── Bundle Offer Generator ───────────────────────────────────────────────────

/**
 * Main entry point: given a list of detected issues and available pros,
 * generate the optimal bundle offer for the homeowner.
 */
export function generateBundleOffer(
  serviceAddress: string,
  issues: DetectedIssue[],
  availablePros: ProCapability[],
  options: {
    requestedByHomeowner?: boolean;
  } = {}
): BundleOffer {
  const requestedByHomeowner = options.requestedByHomeowner ?? false;

  // Sort pros by PPS score descending (best pros first)
  const sortedPros = [...availablePros].sort((a, b) => b.priorityScore - a.priorityScore);

  // Run greedy set cover
  const assignments = greedySetCover(issues, sortedPros);

  // Find uncovered issues
  const coveredIssueIds = new Set(assignments.flatMap(a => a.assignedIssues.map(i => i.id)));
  const uncoveredIssues = issues.filter(i => !coveredIssueIds.has(i.id));

  const totalEstimatedValue = assignments.reduce((sum, a) => sum + a.estimatedBundleValue, 0);
  const vsIndividualVisits = issues.length; // worst case: 1 visit per issue
  const estimatedVisits = assignments.length;
  const visitSavings = vsIndividualVisits - estimatedVisits;

  // Expiry: homeowner-initiated = 72h (urgency), AI-initiated = 14 days
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + (requestedByHomeowner ? 72 : 14 * 24));

  return {
    bundleId: `bundle_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    serviceAddress,
    totalIssues: issues.length,
    coveredIssues: coveredIssueIds.size,
    uncoveredIssues,
    assignments,
    totalProCount: assignments.length,
    totalEstimatedValue,
    estimatedVisits,
    vsIndividualVisits,
    visitSavings,
    requestedByHomeowner,
    generatedAt: new Date(),
    expiresAt,
  };
}

// ─── Unsolicited Outreach Rate Limiter ────────────────────────────────────────

/**
 * For AI-initiated (unsolicited) outreach only.
 * Tracks when we last sent a bundle to each address to avoid spamming.
 *
 * Rules:
 *   - Max 1 bundle per address per 14 days (not per issue — 1 curated bundle is better than 3 individual offers)
 *   - Only send if the bundle has at least 2 issues (single-issue = just send a normal lead)
 *   - Never send if the homeowner has already been contacted in the last 14 days
 *   - Never applies to homeowner-initiated requests
 */
export function shouldSendUnsolicitedBundle(
  serviceAddress: string,
  bundle: BundleOffer,
  lastOutreachByAddress: Record<string, Date>
): { shouldSend: boolean; reason: string } {
  // Homeowner-initiated: always send
  if (bundle.requestedByHomeowner) {
    return { shouldSend: true, reason: "Homeowner-initiated request — no rate limit" };
  }

  // Single issue: route as a normal lead, not a bundle
  if (bundle.totalIssues < 2) {
    return { shouldSend: false, reason: "Single issue — route as individual lead, not bundle" };
  }

  // Check last outreach date
  const lastOutreach = lastOutreachByAddress[serviceAddress];
  if (lastOutreach) {
    const daysSince = (Date.now() - lastOutreach.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSince < 14) {
      return {
        shouldSend: false,
        reason: `Address contacted ${Math.floor(daysSince)} days ago — waiting for 14-day window`,
      };
    }
  }

  // No coverage: nothing to send
  if (bundle.coveredIssues === 0) {
    return { shouldSend: false, reason: "No issues covered by network pros" };
  }

  return { shouldSend: true, reason: "Ready to send bundle offer" };
}

// ─── Bundle Summary Formatter ─────────────────────────────────────────────────

/**
 * Generate a human-readable summary of the bundle offer for the homeowner UI.
 */
export function formatBundleSummary(bundle: BundleOffer): {
  headline: string;
  subheadline: string;
  proSummaries: Array<{ name: string; tasks: string; value: string; badge: string }>;
  totalValue: string;
  visitMessage: string;
  urgencyMessage: string;
} {
  const proSummaries = bundle.assignments.map(a => ({
    name: a.pro.partnerName,
    tasks: a.assignedIssues.map(i => i.type.replace(/_/g, " ")).join(", "),
    value: `$${a.estimatedBundleValue.toLocaleString()}`,
    badge: a.pro.verificationBadge,
  }));

  const visitMessage = bundle.visitSavings > 0
    ? `${bundle.estimatedVisits} visit${bundle.estimatedVisits !== 1 ? "s" : ""} instead of ${bundle.vsIndividualVisits} — save ${bundle.visitSavings} appointment${bundle.visitSavings !== 1 ? "s" : ""}`
    : `${bundle.estimatedVisits} visit${bundle.estimatedVisits !== 1 ? "s" : ""} to handle everything`;

  const hoursLeft = Math.round((bundle.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60));
  const urgencyMessage = bundle.requestedByHomeowner
    ? `This bundle expires in ${hoursLeft} hours`
    : `Offer valid for 14 days`;

  return {
    headline: bundle.totalProCount === 1
      ? `1 pro can handle all ${bundle.coveredIssues} of your projects`
      : `${bundle.totalProCount} pros can handle all ${bundle.coveredIssues} of your projects`,
    subheadline: `We matched your home's needs to the best available professionals in your area`,
    proSummaries,
    totalValue: `$${bundle.totalEstimatedValue.toLocaleString()} estimated total`,
    visitMessage,
    urgencyMessage,
  };
}
