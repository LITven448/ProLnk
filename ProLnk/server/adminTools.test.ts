import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const mockExecute = vi.fn();

vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue({ execute: (...args: any[]) => mockExecute(...args) }),
  getPartnerByUserId: vi.fn(),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

vi.mock("./notifications", () => ({
  sendSms: vi.fn().mockResolvedValue(true),
  sendEmail: vi.fn().mockResolvedValue(true),
}));

function makeCtx(overrides: Partial<TrpcContext> = {}): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
    ...overrides,
  };
}

function makeUser(role: "user" | "admin" = "admin") {
  return {
    id: 1,
    openId: "test-open-id",
    email: "admin@prolnk.io",
    name: "Admin User",
    loginMethod: "manus",
    role,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
}

describe("adminTools", () => {
  const caller = (ctx: TrpcContext) => appRouter.createCaller(ctx);

  beforeEach(() => {
    mockExecute.mockReset();
  });

  describe("overrideCommissionRate", () => {
    it("rejects non-admin", async () => {
      const ctx = makeCtx({ user: makeUser("user") });
      await expect(
        caller(ctx).adminTools.overrideCommissionRate({ partnerId: 1, newRate: 15 })
      ).rejects.toThrow("FORBIDDEN");
    });

    it("updates commission rate for admin", async () => {
      mockExecute.mockResolvedValue({ affectedRows: 1 });
      const ctx = makeCtx({ user: makeUser("admin") });
      const result = await caller(ctx).adminTools.overrideCommissionRate({ partnerId: 1, newRate: 15 });
      expect(result).toEqual({ success: true });
    });
  });

  describe("getMonthlyRevenue", () => {
    it("returns revenue data", async () => {
      mockExecute.mockResolvedValue([
        { month: "2026-01", revenue: 5000, commissions: 1200, partners: 10 },
        { month: "2026-02", revenue: 6000, commissions: 1500, partners: 12 },
      ]);
      const ctx = makeCtx({ user: makeUser("admin") });
      const result = await caller(ctx).adminTools.getMonthlyRevenue();
      expect(result).toHaveLength(2);
    });
  });

  describe("flagAIDetection", () => {
    it("inserts AI detection flag", async () => {
      mockExecute.mockResolvedValue({ insertId: 1 });
      const ctx = makeCtx({ user: makeUser("admin") });
      const result = await caller(ctx).adminTools.flagAIDetection({
        opportunityId: 42,
        reason: "Incorrect classification",
        correctLabel: "HVAC repair",
      });
      expect(result).toEqual({ success: true });
    });
  });

  describe("bulkPartnerAction", () => {
    it("processes bulk approve", async () => {
      mockExecute.mockResolvedValue({ affectedRows: 3 });
      const ctx = makeCtx({ user: makeUser("admin") });
      const result = await caller(ctx).adminTools.bulkPartnerAction({
        partnerIds: [1, 2, 3],
        action: "approve",
      });
      expect(result.success).toBe(true);
      expect(result.affected).toBe(3);
    });
  });
});
