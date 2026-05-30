import { describe, expect, it } from "vitest";
import {
  tradeMatches,
  evaluateProximity,
  scorePartner,
  rankPartners,
  type MatchPartnerSignals,
  type OpportunityForMatch,
} from "./matching-engine";

const baseOpp: OpportunityForMatch = {
  id: 1,
  opportunityCategory: "Roofing & Gutters",
  opportunityType: "Roofing",
  jobZip: "75201",
};

function partner(overrides: Partial<MatchPartnerSignals>): MatchPartnerSignals {
  return {
    id: 1,
    businessName: "Test Co",
    businessType: "Roofing & Gutters",
    tier: "pro",
    status: "approved",
    suspendedAt: null,
    serviceZipCodes: ["75201", "75202"],
    weeklyLeadCap: 15,
    weeklyLeadsReceived: 0,
    avgLeadResponseHours: 4,
    rating: 4.5,
    priorityScore: 80,
    ...overrides,
  };
}

describe("tradeMatches", () => {
  it("matches exact category", () => {
    expect(tradeMatches("Roofing & Gutters", baseOpp)).toBe(true);
  });
  it("matches on token overlap", () => {
    expect(tradeMatches("Roofing Contractor", baseOpp)).toBe(true);
  });
  it("rejects unrelated trade", () => {
    expect(tradeMatches("House Cleaning", baseOpp)).toBe(false);
  });
  it("does not exclude when opportunity has no category", () => {
    expect(tradeMatches("Anything", { id: 1 })).toBe(true);
  });
});

describe("evaluateProximity", () => {
  it("scores full when zip in service area", () => {
    const r = evaluateProximity(partner({}), "75201");
    expect(r.inServiceArea).toBe(true);
    expect(r.distanceMiles).toBe(0);
  });
  it("excludes when zip not covered and no geo", () => {
    const r = evaluateProximity(partner({ serviceZipCodes: ["76101"] }), "75201");
    expect(r.inServiceArea).toBe(false);
  });
  it("is defensive when no location signal exists", () => {
    const r = evaluateProximity(
      partner({ serviceZipCodes: [], serviceAreaLat: null, serviceAreaLng: null }),
      null
    );
    expect(r.inServiceArea).toBe(true);
    expect(r.distanceMiles).toBeNull();
  });
});

describe("scorePartner", () => {
  it("higher tier scores higher", () => {
    const prox = { inServiceArea: true, distanceMiles: 0 };
    const biz = scorePartner(partner({ tier: "enterprise" }), prox, baseOpp).score;
    const scout = scorePartner(partner({ tier: "scout" }), prox, baseOpp).score;
    expect(biz).toBeGreaterThan(scout);
  });
  it("omits rating signal without crashing when absent", () => {
    const prox = { inServiceArea: true, distanceMiles: 0 };
    const { score, reasons } = scorePartner(partner({ rating: null }), prox, baseOpp);
    expect(score).toBeGreaterThan(0);
    expect(reasons.some((r) => r.startsWith("rating"))).toBe(false);
  });
});

describe("rankPartners", () => {
  it("filters ineligible and ranks eligible by score", () => {
    const candidates: MatchPartnerSignals[] = [
      partner({ id: 1, tier: "scout", businessName: "Scout Co" }),
      partner({ id: 2, tier: "enterprise", businessName: "Ent Co" }),
      partner({ id: 3, businessType: "House Cleaning", businessName: "Wrong Trade" }),
      partner({ id: 4, status: "pending", businessName: "Not Approved" }),
      partner({ id: 5, serviceZipCodes: ["76101"], businessName: "Out Of Area" }),
      partner({ id: 6, weeklyLeadCap: 5, weeklyLeadsReceived: 5, businessName: "At Capacity" }),
    ];
    const ranked = rankPartners(candidates, baseOpp);
    expect(ranked.map((r) => r.partnerId)).toEqual([2, 1]);
    expect(ranked[0].score).toBeGreaterThan(ranked[1].score);
  });

  it("excludes the source partner", () => {
    const ranked = rankPartners([partner({ id: 9 })], { ...baseOpp, sourcePartnerId: 9 });
    expect(ranked).toHaveLength(0);
  });
});
