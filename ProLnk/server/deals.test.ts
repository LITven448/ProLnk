import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock getDb to return a fake db that captures the SQL
// MySQL2 execute returns [[rows], fields] format
const mockExecute = vi.fn().mockResolvedValue([[], []]);
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue({ execute: (...args: any[]) => mockExecute(...args) }),
  createPartnerNotification: vi.fn(),
}));

function createUserContext(email: string = "test@example.com"): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      email,
      name: "Test User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("homeowner.getMyDeals", () => {
  beforeEach(() => {
    mockExecute.mockClear();
  });

  it("returns empty array when no deals exist", async () => {
    // MySQL format: [[rows], fields]
    mockExecute.mockResolvedValue([[], []]);
    const caller = appRouter.createCaller(createUserContext());
    const result = await caller.homeowner.getMyDeals();
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(0);
  });

  it("correctly maps deal fields from actual DB columns", async () => {
    // MySQL format: [[rows], fields]
    mockExecute.mockResolvedValue([[{
      id: 1,
      issueType: "roofing",
      issueCategory: "Roofing",
      issueDescription: "Aging roof shingles detected",
      issueDescriptionShort: "Aging roof",
      aiConfidence: 85,
      status: "sent",
      estimatedValueLow: "500.00",
      estimatedValueHigh: "1200.00",
      createdAt: new Date("2025-01-01"),
      expiresAt: null,
      homeownerName: "Test User",
      homeownerEmail: "test@example.com",
      photoUrl: "https://example.com/photo.jpg",
      proName: "Ace Roofing",
      proTier: "pro",
    }], []]);
    const caller = appRouter.createCaller(createUserContext());
    const result = await caller.homeowner.getMyDeals();
    expect(result).toHaveLength(1);
    const deal = result[0];
    expect(deal.serviceType).toBe("roofing");
    expect(deal.urgencyLevel).toBe(1); // aiConfidence 85 >= 80 → urgency 1 (high)
    expect(deal.estimateRange).toBe("$500-$1200");
    expect(deal.description).toBe("Aging roof shingles detected");
    expect(deal.proName).toBe("Ace Roofing");
  });

  it("handles null aiConfidence gracefully", async () => {
    // MySQL format: [[rows], fields]
    mockExecute.mockResolvedValue([[{
      id: 2,
      issueType: null,
      issueCategory: null,
      issueDescription: null,
      issueDescriptionShort: null,
      aiConfidence: null,
      status: "pending",
      estimatedValueLow: null,
      estimatedValueHigh: null,
      createdAt: new Date(),
      expiresAt: null,
      homeownerName: null,
      homeownerEmail: "test@example.com",
      photoUrl: null,
      proName: null,
      proTier: null,
    }], []]);
    const caller = appRouter.createCaller(createUserContext());
    const result = await caller.homeowner.getMyDeals();
    expect(result).toHaveLength(1);
    const deal = result[0];
    expect(deal.serviceType).toBe("Service");
    expect(deal.urgencyLevel).toBe(2); // null aiConfidence → default 2 (medium)
    expect(deal.estimateRange).toBe("Free estimate");
    expect(deal.description).toBe("");
  });
});

describe("homeowner.getMyStats", () => {
  beforeEach(() => {
    mockExecute.mockClear();
  });

  it("returns zero stats when no data exists", async () => {
    // MySQL format: [[rows], fields]
    mockExecute
      .mockResolvedValueOnce([[{ totalDeals: 0, acceptedDeals: 0, completedJobs: 0, pendingOffers: 0, totalSaved: 0, trustedPros: 0 }], []])
      .mockResolvedValueOnce([[{ scanCount: 0 }], []]);
    const caller = appRouter.createCaller(createUserContext());
    const result = await caller.homeowner.getMyStats();
    expect(result.totalDeals).toBe(0);
    expect(result.moneySaved).toBe(0);
    expect(result.scanCount).toBe(0);
  });
});
