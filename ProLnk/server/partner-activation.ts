/**
 * Partner activation — turns an approved application into a *matchable* partner.
 *
 * The matching engine (server/matching-engine.ts `rankPartnersForOpportunity`)
 * only ever queries the `partners` table and applies these hard filters:
 *   1. status IN ('approved','active') AND suspendedAt IS NULL
 *   2. businessType token-matches the opportunity category/type
 *   3. the opportunity ZIP is in serviceZipCodes (JSON array) — or geo radius
 *   4. partner is under weeklyLeadCap
 *
 * Waitlist signups live in `proWaitlist`, whose shape does NOT line up with the
 * matcher's contract:
 *   - proWaitlist.businessType is the *legal* structure ("LLC", "Sole Prop") —
 *     NOT the trade. The trade lives in proWaitlist.trades (JSON string[]).
 *   - proWaitlist.serviceZipCodes is a comma-separated string, but the matcher
 *     expects a JSON array.
 *
 * This module owns the mapping so the approval flow produces partners the engine
 * will actually offer jobs to, and so the contract can be unit-tested without a DB.
 */

export interface ApplicationForActivation {
  trades?: unknown;
  businessType?: string | null;
  serviceZipCodes?: unknown;
  serviceRadiusMiles?: number | null;
  primaryCity?: string | null;
  primaryState?: string | null;
}

export interface PartnerActivationPayload {
  businessType: string;
  serviceArea: string;
  serviceZipCodes: string[];
  serviceRadiusMiles: number;
  maxZipCodes: number;
  status: "active";
  tier: "scout";
  weeklyLeadCap: number;
}

/** Parse proWaitlist.trades (JSON string[] | string[] | "a, b" string) → string[]. */
export function parseTrades(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map((t) => String(t).trim()).filter(Boolean);
  if (typeof raw === "string") {
    const s = raw.trim();
    if (!s) return [];
    try {
      const parsed = JSON.parse(s);
      if (Array.isArray(parsed)) return parsed.map((t) => String(t).trim()).filter(Boolean);
    } catch {
      /* fall through to delimiter split */
    }
    return s.split(/[,;|]/).map((t) => t.trim()).filter(Boolean);
  }
  return [];
}

/** Parse proWaitlist.serviceZipCodes (comma-separated text | JSON array | array). */
export function parseZipCsv(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map((z) => String(z).trim()).filter(Boolean);
  if (typeof raw === "string") {
    const s = raw.trim();
    if (!s) return [];
    try {
      const parsed = JSON.parse(s);
      if (Array.isArray(parsed)) return parsed.map((z) => String(z).trim()).filter(Boolean);
    } catch {
      /* fall through to delimiter split */
    }
    return s.split(/[,;|\s]+/).map((z) => z.trim()).filter(Boolean);
  }
  return [];
}

/**
 * Build the matchable partner payload from an approved application.
 *
 * The resulting partner is guaranteed to satisfy the matching engine's hard
 * filters PROVIDED the application carried a trade and at least one service ZIP.
 * The caller should surface `warnings` so an admin knows when a partner will be
 * un-matchable (no trade or no zips) and can fix the application.
 */
export function buildPartnerActivation(app: ApplicationForActivation): {
  payload: PartnerActivationPayload;
  warnings: string[];
} {
  const warnings: string[] = [];

  const trades = parseTrades(app.trades);
  // businessType drives trade matching. Prefer the first declared trade; fall
  // back to the application's businessType only if it doesn't look like a legal
  // structure (which proWaitlist.businessType usually is).
  const legalStructure = /^(llc|l\.l\.c|sole\s*prop|sole\s*proprietor|corp|corporation|inc|s-?corp|c-?corp|partnership|dba)\.?$/i;
  let businessType = trades[0] ?? "";
  if (!businessType) {
    const bt = (app.businessType ?? "").trim();
    if (bt && !legalStructure.test(bt)) businessType = bt;
  }
  if (!businessType) {
    warnings.push(
      "No trade found on application — partner will NOT match any opportunity until a trade is set."
    );
    businessType = "General Contractor";
  }

  const serviceZipCodes = parseZipCsv(app.serviceZipCodes);
  if (serviceZipCodes.length === 0) {
    warnings.push(
      "No service ZIP codes on application — partner will only match via geo radius (none set here), i.e. not at all."
    );
  }

  const serviceRadiusMiles =
    typeof app.serviceRadiusMiles === "number" && app.serviceRadiusMiles > 0
      ? app.serviceRadiusMiles
      : 25;

  const serviceArea =
    [app.primaryCity, app.primaryState].filter(Boolean).join(", ") || "DFW";

  return {
    payload: {
      businessType,
      serviceArea,
      serviceZipCodes,
      serviceRadiusMiles,
      maxZipCodes: Math.max(5, serviceZipCodes.length),
      status: "active",
      tier: "scout",
      weeklyLeadCap: 5,
    },
    warnings,
  };
}
