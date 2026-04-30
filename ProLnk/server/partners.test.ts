import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue({ execute: vi.fn().mockResolvedValue([[]])}),
  getPartnerByEmail: vi.fn(),
  createPartner: vi.fn(),
  getPartnerByUserId: vi.fn(),
  getReferralsByPartnerId: vi.fn(),
  getCommissionsByPartnerId: vi.fn(),
  getMonthlyReferralStats: vi.fn(),
  getBroadcasts: vi.fn(),
  getPendingPartners: vi.fn(),
  getAllPartners: vi.fn(),
  approvePartner: vi.fn(),
  rejectPartner: vi.fn(),
  getPartnerById: vi.fn().mockResolvedValue(null),
  getUnpaidCommissions: vi.fn(),
  markCommissionPaid: vi.fn(),
  createBroadcast: vi.fn(),
  getNetworkStats: vi.fn(),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
  createPartnerNotification: vi.fn().mockResolvedValue(undefined),
}));

// Mock notification
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function makeCtx(overrides: Partial<TrpcContext> = {}): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
    ...overrides,
  };
}

function makeUser(role: "user" | "admin" = "user") {
  return {
    id: 1,
    openId: "test-open-id",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
}

describe("auth.logout", () => {
  it("clears the session cookie and reports success", async () => {
    const clearedCookies: { name: string; options: Record<string, unknown> }[] = [];
    const ctx = makeCtx({
      user: makeUser(),
      res: {
        clearCookie: (name: string, options: Record<string, unknown>) => {
          clearedCookies.push({ name, options });
        },
      } as unknown as TrpcContext["res"],
    });

    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();

    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
  });
});

describe("partners.submitApplication", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects duplicate email applications", async () => {
    const { getPartnerByEmail } = await import("./db");
    vi.mocked(getPartnerByEmail).mockResolvedValue({
      id: 1,
      businessName: "Existing Co",
      businessType: "Landscaping",
      serviceArea: "Frisco TX",
      contactName: "John",
      contactEmail: "existing@test.com",
      contactPhone: null,
      website: null,
      description: null,
      status: "pending",
      tier: "bronze",
      referralCount: 0,
      leadsCount: 0,
      totalCommissionEarned: "0.00",
      totalCommissionPaid: "0.00",
      userId: null,
      appliedAt: new Date(),
      approvedAt: null,
    });

    const ctx = makeCtx();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.partners.submitApplication({
        businessName: "New Co",
        businessType: "Landscaping",
        serviceArea: "Frisco TX",
        contactName: "Jane",
        contactEmail: "existing@test.com",
      })
    ).rejects.toThrow("already exists");
  });

  it("creates a new partner application successfully", async () => {
    const { getPartnerByEmail, createPartner } = await import("./db");
    vi.mocked(getPartnerByEmail).mockResolvedValue(undefined);
    vi.mocked(createPartner).mockResolvedValue(undefined);

    const ctx = makeCtx();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.partners.submitApplication({
      businessName: "Green Edge Landscaping",
      businessType: "Landscaping",
      serviceArea: "Frisco TX",
      contactName: "Jane Smith",
      contactEmail: "jane@greenedge.com",
    });

    expect(result).toEqual({ success: true });
    expect(createPartner).toHaveBeenCalledOnce();
  });
});

describe("admin procedures", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("blocks non-admin users from accessing admin routes", async () => {
    const ctx = makeCtx({ user: makeUser("user") });
    const caller = appRouter.createCaller(ctx);

    await expect(caller.admin.getNetworkStats()).rejects.toThrow("Admin access required");
  });

  it("allows admin users to get network stats", async () => {
    const { getNetworkStats } = await import("./db");
    vi.mocked(getNetworkStats).mockResolvedValue({
      totalPartners: 5,
      pendingApplications: 2,
      totalReferrals: 20,
      totalCommissionsPaid: 500,
    });

    const ctx = makeCtx({ user: makeUser("admin") });
    const caller = appRouter.createCaller(ctx);

    const stats = await caller.admin.getNetworkStats();
    expect(stats.totalPartners).toBe(5);
    expect(stats.pendingApplications).toBe(2);
  });

  it("allows admin to approve a partner", async () => {
    const { approvePartner } = await import("./db");
    vi.mocked(approvePartner).mockResolvedValue(undefined);

    const ctx = makeCtx({ user: makeUser("admin") });
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.approvePartner({ partnerId: 1 });
    expect(result).toEqual({ success: true });
    expect(approvePartner).toHaveBeenCalledWith(1);
  });

  it("allows admin to broadcast a message", async () => {
    const { createBroadcast } = await import("./db");
    vi.mocked(createBroadcast).mockResolvedValue(undefined);

    const ctx = makeCtx({ user: makeUser("admin") });
    const caller = appRouter.createCaller(ctx);

    const result = await caller.admin.broadcastMessage({
      subject: "Q2 Bonus",
      message: "We are doubling commissions this quarter!",
    });
    expect(result.success).toBe(true);
    expect(createBroadcast).toHaveBeenCalledWith("Q2 Bonus", "We are doubling commissions this quarter!", 1);
  });
});
