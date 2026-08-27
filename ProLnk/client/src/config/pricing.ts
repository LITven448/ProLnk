/**
 * THE ONLY PLACE PRICING IS DEFINED.
 *
 * Before this file existed there were five conflicting tier systems in the
 * codebase and ten public pricing pages, two of which quoted different rates
 * for the same tier. Every page, email, and checkout path must import from
 * here. A regression test fails the build if a price is hardcoded elsewhere.
 */

export type TierId = "starter" | "solo" | "team" | "business";

export interface Tier {
  id: TierId;
  name: string;
  /** USD per month. */
  monthly: number;
  /** Platform fee as a % of job value, charged to the pro after they are paid. */
  jobFeePct: number;
  /** Dashboard logins included. */
  seats: number;
  /** Individual technician credentials (ProPasses) included. */
  proPasses: number;
  /** ZIP codes of coverage included. */
  zips: number;
  tagline: string;
  featured?: boolean;
}

export const TIERS: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    monthly: 0,
    jobFeePct: 15,
    seats: 1,
    proPasses: 1,
    zips: 5,
    tagline: "No monthly cost. You pay only when you get paid.",
  },
  {
    id: "solo",
    name: "Solo",
    monthly: 99,
    jobFeePct: 10,
    seats: 1,
    proPasses: 1,
    zips: 8,
    tagline: "For the one-truck operation. Pays for itself around $2,000/mo of work.",
  },
  {
    id: "team",
    name: "Team",
    monthly: 189,
    jobFeePct: 9,
    seats: 3,
    proPasses: 4,
    zips: 20,
    tagline: "For a small crew. Assign work, track your techs.",
    featured: true,
  },
  {
    id: "business",
    name: "Business",
    monthly: 349,
    jobFeePct: 8,
    seats: 8,
    proPasses: 10,
    zips: 50,
    tagline: "For an established shop. Lowest rate on the platform.",
  },
];

export const ADDONS = {
  proPass: { id: "propass", label: "Additional ProPass (technician)", monthly: 20 },
  seat:    { id: "seat",    label: "Additional dashboard seat",       monthly: 29 },
  zipPack: { id: "zippack", label: "Coverage pack (10 ZIP codes)",    monthly: 25 },
} as const;

/** Lane upgrades. Residential is included in every tier. */
export const LANES = {
  enterprise: {
    id: "enterprise",
    label: "Enterprise lane",
    blurb: "Rental and property-manager work orders. Requires background check and insurance minimums.",
    monthly: 49,
  },
  commercial: {
    id: "commercial",
    label: "Commercial lane",
    blurb: "Commercial trades and facilities work. Requires trade verification and higher coverage.",
    monthly: 99,
  },
} as const;

/**
 * Partner-locked vendors: a pro who only wants work from the licensee that
 * invited them (CoolSys, AMH). Free — this is an acquisition channel, not a
 * revenue line. They upgrade when they want work from anyone else.
 */
export const PARTNER_LOCKED = { monthly: 0, label: "Partner network access" };

/** Founding network. Closed at 2,125. NEVER MARKETED PUBLICLY. */
export const FOUNDING = {
  cap: 2125,
  monthly: 149,
  lockedForLife: true,
  breakdown: { charter: 25, founding: 100, l3: 400, l4: 1600 },
} as const;

/** TrustyPro is free to homeowners and to residents, always. */
export const HOMEOWNER_PRICE = { monthly: 0, label: "Free for homeowners" };

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getTier(id: TierId): Tier {
  const t = TIERS.find(x => x.id === id);
  if (!t) throw new Error(`Unknown tier: ${id}`);
  return t;
}

/** What a pro pays on one job, before any founding-network cascade. */
export function platformFeeFor(tierId: TierId, jobValue: number): number {
  return Math.round(jobValue * (getTier(tierId).jobFeePct / 100) * 100) / 100;
}

/** Monthly cost of a shop at a given tier and headcount. */
export function monthlyCostFor(tierId: TierId, technicians: number, seats: number, zips: number): number {
  const t = getTier(tierId);
  const extraPasses = Math.max(0, technicians - t.proPasses) * ADDONS.proPass.monthly;
  const extraSeats  = Math.max(0, seats - t.seats) * ADDONS.seat.monthly;
  const extraZips   = Math.ceil(Math.max(0, zips - t.zips) / 10) * ADDONS.zipPack.monthly;
  return t.monthly + extraPasses + extraSeats + extraZips;
}
