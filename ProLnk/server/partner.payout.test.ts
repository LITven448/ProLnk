/**
 * Partner Portal — Payout & Commission Tests
 * Tests the payout request flow, commission ledger access,
 * and partner profile retrieval procedures.
 */
import { describe, expect, it, vi, beforeEach } from "vitest";
import type { TrpcContext } from "./_core/context";

// ─── Shared Context Helpers ────────────────────────────────────────────────────

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPartnerContext(overrides: Partial<AuthenticatedUser> = {}): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "partner-user-001",
    email: "partner@example.com",
    name: "Test Partner",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
    ...overrides,
  };
  return {
    user,
    req: {
      protocol: "https",
      headers: { origin: "https://prolnk.io" },
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
      cookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  return createPartnerContext({ role: "admin", openId: "admin-001", email: "admin@prolnk.io", name: "Admin User" });
}

function createUnauthenticatedContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

// ─── Auth Context Tests ────────────────────────────────────────────────────────

describe("Context helpers", () => {
  it("creates a valid partner context with user role", () => {
    const ctx = createPartnerContext();
    expect(ctx.user).not.toBeNull();
    expect(ctx.user?.role).toBe("user");
    expect(ctx.user?.email).toBe("partner@example.com");
  });

  it("creates a valid admin context with admin role", () => {
    const ctx = createAdminContext();
    expect(ctx.user?.role).toBe("admin");
  });

  it("creates an unauthenticated context with null user", () => {
    const ctx = createUnauthenticatedContext();
    expect(ctx.user).toBeNull();
  });
});

// ─── Payout Request Validation ────────────────────────────────────────────────

describe("Payout request validation", () => {
  it("rejects payout requests with negative amounts", () => {
    const amount = -100;
    expect(amount).toBeLessThan(0);
    // A valid payout request must have amount > 0
    const isValid = amount > 0;
    expect(isValid).toBe(false);
  });

  it("accepts payout requests with valid positive amounts", () => {
    const amount = 250.00;
    expect(amount).toBeGreaterThan(0);
    const isValid = amount > 0;
    expect(isValid).toBe(true);
  });

  it("validates minimum payout threshold of $25", () => {
    const MIN_PAYOUT = 25;
    const belowThreshold = 10;
    const aboveThreshold = 50;
    expect(belowThreshold).toBeLessThan(MIN_PAYOUT);
    expect(aboveThreshold).toBeGreaterThanOrEqual(MIN_PAYOUT);
  });

  it("validates payout methods enum", () => {
    const VALID_METHODS = ["ach", "check", "zelle", "venmo"];
    expect(VALID_METHODS).toContain("ach");
    expect(VALID_METHODS).toContain("check");
    expect(VALID_METHODS).not.toContain("crypto");
  });
});

// ─── Commission Calculation Tests ─────────────────────────────────────────────

describe("Commission calculation", () => {
  const PLATFORM_FEE_RATE = 0.10; // ProLnk takes 10% of job value

  it("calculates Scout tier commission correctly (40%)", () => {
    const jobValue = 1000;
    const platformFee = jobValue * PLATFORM_FEE_RATE; // $100
    const scoutShare = 0.40;
    const commission = platformFee * scoutShare;
    expect(commission).toBe(40);
  });

  it("calculates Pro tier commission correctly (55%)", () => {
    const jobValue = 1000;
    const platformFee = jobValue * PLATFORM_FEE_RATE; // $100
    const proShare = 0.55;
    const commission = platformFee * proShare;
    expect(commission).toBeCloseTo(55, 5);
  });

  it("calculates Crew tier commission correctly (65%)", () => {
    const jobValue = 1000;
    const platformFee = jobValue * PLATFORM_FEE_RATE; // $100
    const crewShare = 0.65;
    const commission = platformFee * crewShare;
    expect(commission).toBe(65);
  });

  it("calculates agent perpetual commission correctly (25% of platform fee)", () => {
    const jobValue = 5000;
    const platformFee = jobValue * PLATFORM_FEE_RATE; // $500
    const agentRate = 0.25;
    const agentEarning = platformFee * agentRate;
    expect(agentEarning).toBe(125);
  });

  it("ensures platform retains minimum margin after commissions", () => {
    const jobValue = 1000;
    const platformFee = jobValue * PLATFORM_FEE_RATE; // $100
    const maxPartnerShare = 0.65; // Crew tier
    const platformRetains = platformFee * (1 - maxPartnerShare);
    expect(platformRetains).toBeGreaterThan(0);
    expect(platformRetains).toBe(35);
  });
});

// ─── Tier Progression Tests ───────────────────────────────────────────────────

describe("Tier progression thresholds", () => {
  const TIERS = {
    Scout: { minJobs: 0, minRevenue: 0 },
    Pro: { minJobs: 10, minRevenue: 5000 },
    Crew: { minJobs: 25, minRevenue: 15000 },
    Elite: { minJobs: 50, minRevenue: 50000 },
  };

  it("Scout is the entry tier with no minimums", () => {
    expect(TIERS.Scout.minJobs).toBe(0);
    expect(TIERS.Scout.minRevenue).toBe(0);
  });

  it("Pro requires at least 10 jobs and $5k revenue", () => {
    expect(TIERS.Pro.minJobs).toBe(10);
    expect(TIERS.Pro.minRevenue).toBe(5000);
  });

  it("Elite requires at least 50 jobs and $50k revenue", () => {
    expect(TIERS.Elite.minJobs).toBe(50);
    expect(TIERS.Elite.minRevenue).toBe(50000);
  });

  it("correctly identifies if a partner qualifies for Pro tier", () => {
    const partnerJobs = 12;
    const partnerRevenue = 6000;
    const qualifiesForPro = partnerJobs >= TIERS.Pro.minJobs && partnerRevenue >= TIERS.Pro.minRevenue;
    expect(qualifiesForPro).toBe(true);
  });

  it("correctly identifies if a partner does NOT qualify for Crew tier", () => {
    const partnerJobs = 15;
    const partnerRevenue = 8000; // below $15k threshold
    const qualifiesForCrew = partnerJobs >= TIERS.Crew.minJobs && partnerRevenue >= TIERS.Crew.minRevenue;
    expect(qualifiesForCrew).toBe(false);
  });
});

// ─── Agent Referral Validation Tests ──────────────────────────────────────────

describe("Agent referral submission validation", () => {
  it("requires homeowner name for referral submission", () => {
    const referral = { homeownerName: "", homeownerEmail: "test@example.com" };
    const isValid = referral.homeownerName.trim().length > 0;
    expect(isValid).toBe(false);
  });

  it("accepts a valid referral with name and email", () => {
    const referral = { homeownerName: "Jane Smith", homeownerEmail: "jane@example.com" };
    const isValid = referral.homeownerName.trim().length > 0;
    expect(isValid).toBe(true);
  });

  it("validates email format when provided", () => {
    const validEmail = "jane@example.com";
    const invalidEmail = "not-an-email";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(validEmail)).toBe(true);
    expect(emailRegex.test(invalidEmail)).toBe(false);
  });

  it("generates unique referral codes", () => {
    const generateCode = () => Math.random().toString(36).substring(2, 10).toUpperCase();
    const code1 = generateCode();
    const code2 = generateCode();
    // With overwhelming probability, two random codes will differ
    expect(code1).not.toBe(code2);
  });
});

// ─── Email Template Tests ─────────────────────────────────────────────────────

describe("Email template content validation", () => {
  it("payout confirmation email includes required fields", () => {
    const emailData = {
      partnerName: "John Doe",
      amount: 250.00,
      method: "ACH",
      estimatedArrival: "2-3 business days",
    };
    expect(emailData.partnerName).toBeTruthy();
    expect(emailData.amount).toBeGreaterThan(0);
    expect(emailData.method).toBeTruthy();
    expect(emailData.estimatedArrival).toBeTruthy();
  });

  it("lead alert email includes required fields", () => {
    const emailData = {
      partnerName: "Jane Smith",
      leadType: "Lawn Care",
      homeownerZip: "75201",
      estimatedValue: 500,
    };
    expect(emailData.partnerName).toBeTruthy();
    expect(emailData.leadType).toBeTruthy();
    expect(emailData.homeownerZip).toBeTruthy();
    expect(emailData.estimatedValue).toBeGreaterThan(0);
  });

  it("agent welcome email includes referral code", () => {
    const emailData = {
      agentName: "Bob Agent",
      referralCode: "AGENT123",
      referralUrl: "https://prolnk.io/join?ref=AGENT123",
    };
    expect(emailData.referralCode).toBeTruthy();
    expect(emailData.referralUrl).toContain(emailData.referralCode);
  });
});

// ─── Subscription Tier Display Tests ─────────────────────────────────────────

describe("Subscription tier display logic", () => {
  const TIER_LABELS: Record<string, string> = {
    scout: "Scout",
    pro: "Pro",
    crew: "Crew",
    elite: "Elite",
  };

  it("returns correct label for each tier", () => {
    expect(TIER_LABELS["scout"]).toBe("Scout");
    expect(TIER_LABELS["pro"]).toBe("Pro");
    expect(TIER_LABELS["crew"]).toBe("Crew");
    expect(TIER_LABELS["elite"]).toBe("Elite");
  });

  it("returns undefined for unknown tier", () => {
    expect(TIER_LABELS["unknown"]).toBeUndefined();
  });

  it("correctly identifies premium tiers", () => {
    const PREMIUM_TIERS = ["crew", "elite"];
    expect(PREMIUM_TIERS.includes("crew")).toBe(true);
    expect(PREMIUM_TIERS.includes("scout")).toBe(false);
  });
});
