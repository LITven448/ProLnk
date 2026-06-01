import { describe, expect, it } from "vitest";
import { buildPartnerActivation, parseTrades, parseZipCsv } from "./partner-activation";
import {
  isMatchEligibleStatus,
  rankPartners,
  type MatchPartnerSignals,
  type OpportunityForMatch,
} from "./matching-engine";

describe("parseTrades", () => {
  it("parses a JSON string array (proWaitlist.trades shape)", () => {
    expect(parseTrades('["HVAC","Plumbing"]')).toEqual(["HVAC", "Plumbing"]);
  });
  it("parses a native array", () => {
    expect(parseTrades(["Roofing"])).toEqual(["Roofing"]);
  });
  it("falls back to delimiter split", () => {
    expect(parseTrades("HVAC, Plumbing; Electrical")).toEqual(["HVAC", "Plumbing", "Electrical"]);
  });
  it("returns [] for empty", () => {
    expect(parseTrades(null)).toEqual([]);
    expect(parseTrades("")).toEqual([]);
  });
});

describe("parseZipCsv", () => {
  it("parses comma-separated zips (proWaitlist.serviceZipCodes shape)", () => {
    expect(parseZipCsv("75201, 75202,75204")).toEqual(["75201", "75202", "75204"]);
  });
  it("parses a JSON array", () => {
    expect(parseZipCsv('["75201","75202"]')).toEqual(["75201", "75202"]);
  });
});

describe("buildPartnerActivation", () => {
  it("maps trade + zips and marks active", () => {
    const { payload, warnings } = buildPartnerActivation({
      trades: '["Plumbing"]',
      businessType: "LLC",
      serviceZipCodes: "75201, 75202",
      serviceRadiusMiles: 25,
      primaryCity: "Dallas",
      primaryState: "TX",
    });
    expect(payload.businessType).toBe("Plumbing");
    expect(payload.serviceZipCodes).toEqual(["75201", "75202"]);
    expect(payload.status).toBe("active");
    expect(payload.serviceArea).toBe("Dallas, TX");
    expect(warnings).toHaveLength(0);
  });

  it("does NOT use legal structure (LLC) as the trade", () => {
    const { payload, warnings } = buildPartnerActivation({
      trades: [],
      businessType: "Sole Prop",
      serviceZipCodes: "75201",
    });
    expect(payload.businessType).not.toMatch(/sole prop/i);
    expect(warnings.some((w) => /no trade/i.test(w))).toBe(true);
  });

  it("warns when no service zips are present", () => {
    const { warnings } = buildPartnerActivation({
      trades: ["HVAC"],
      serviceZipCodes: "",
    });
    expect(warnings.some((w) => /no service zip/i.test(w))).toBe(true);
  });

  // REGRESSION (the activation bug): a degenerate application — legal structure in
  // the trade field, no trades, no zips — used to silently produce an un-matchable
  // partner. The contract is now: such input MUST be flagged by warnings[] so it
  // never ships green.
  it("CATCHES a fully degenerate application (legal-structure trade + empty zips) via warnings", () => {
    const { payload, warnings } = buildPartnerActivation({
      trades: [],
      businessType: "LLC",
      serviceZipCodes: "",
    });
    expect(payload.businessType).not.toMatch(/^llc$/i);
    expect(warnings.some((w) => /no trade/i.test(w))).toBe(true);
    expect(warnings.some((w) => /no service zip/i.test(w))).toBe(true);
    expect(warnings.length).toBeGreaterThanOrEqual(2);
  });

  // The matcher only ever considers partners whose status is approved/active. If
  // activation ever emitted 'pending' (or anything else), every activated pro would
  // be invisible to the job loop. Lock the status against the matcher's real
  // eligibility predicate, not a hardcoded string.
  it("always emits a status the matching engine treats as eligible", () => {
    const { payload } = buildPartnerActivation({
      trades: '["Plumbing"]',
      serviceZipCodes: "75201",
    });
    expect(payload.status).toBe("active");
    expect(isMatchEligibleStatus(payload.status)).toBe(true);
    // a known-bad status the matcher would reject — guards the predicate itself
    expect(isMatchEligibleStatus("pending")).toBe(false);
  });
});

// THE CONTRACT: a partner produced by the activation flow must be matched by the
// matching engine for an opportunity in its trade + ZIP. If this breaks, every
// approval that goes through buildPartnerActivation produces an un-matchable
// partner and the job loop silently no-ops.
describe("activation → matching contract", () => {
  function partnerFromActivation(app: Parameters<typeof buildPartnerActivation>[0], id = 1): MatchPartnerSignals {
    const { payload } = buildPartnerActivation(app);
    return {
      id,
      businessName: "Activated Co",
      businessType: payload.businessType,
      tier: payload.tier,
      status: payload.status,
      suspendedAt: null,
      serviceZipCodes: payload.serviceZipCodes,
      serviceRadiusMiles: payload.serviceRadiusMiles,
      weeklyLeadCap: payload.weeklyLeadCap,
      weeklyLeadsReceived: 0,
    };
  }

  it("matches an activated waitlist pro for an opportunity in their trade + zip", () => {
    const partner = partnerFromActivation({
      trades: '["Plumbing"]',
      businessType: "LLC",
      serviceZipCodes: "75201, 75202, 75204",
      serviceRadiusMiles: 25,
      primaryCity: "Dallas",
      primaryState: "TX",
    });

    const opp: OpportunityForMatch = {
      id: 100,
      opportunityCategory: "Plumbing",
      opportunityType: "Plumbing",
      jobZip: "75201",
    };

    const ranked = rankPartners([partner], opp);
    expect(ranked).toHaveLength(1);
    expect(ranked[0].partnerId).toBe(partner.id);
    expect(ranked[0].score).toBeGreaterThan(0);
  });

  it("does NOT match outside the activated service area", () => {
    const partner = partnerFromActivation({
      trades: ["Plumbing"],
      serviceZipCodes: "75201",
    });
    const opp: OpportunityForMatch = {
      id: 101,
      opportunityCategory: "Plumbing",
      opportunityType: "Plumbing",
      jobZip: "76101",
    };
    expect(rankPartners([partner], opp)).toHaveLength(0);
  });

  it("does NOT match a different trade", () => {
    const partner = partnerFromActivation({
      trades: ["Plumbing"],
      serviceZipCodes: "75201",
    });
    const opp: OpportunityForMatch = {
      id: 102,
      opportunityCategory: "Roofing & Gutters",
      opportunityType: "Roofing",
      jobZip: "75201",
    };
    expect(rankPartners([partner], opp)).toHaveLength(0);
  });
});
