import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const mockExecute = vi.fn();

vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue({ execute: (...args: any[]) => mockExecute(...args) }),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

vi.mock("./email", () => ({
  sendAdvertiserApplicationReceived: vi.fn().mockResolvedValue(true),
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

describe("featuredAdvertisers", () => {
  const caller = (ctx: TrpcContext) => appRouter.createCaller(ctx);

  beforeEach(() => {
    mockExecute.mockReset();
  });

  describe("list", () => {
    it("rejects non-admin users", async () => {
      const ctx = makeCtx({ user: makeUser("user") });
      await expect(caller(ctx).featuredAdvertisers.list({ status: "all" }))
        .rejects.toThrow("FORBIDDEN");
    });

    it("returns all advertisers for admin", async () => {
      mockExecute.mockResolvedValue([{ id: 1, businessName: "Test Biz", status: "active" }]);
      const ctx = makeCtx({ user: makeUser("admin") });
      const result = await caller(ctx).featuredAdvertisers.list({ status: "all" });
      expect(result).toEqual([{ id: 1, businessName: "Test Biz", status: "active" }]);
    });
  });

  describe("submitApplication", () => {
    it("inserts a new pending advertiser", async () => {
      mockExecute.mockResolvedValue({ insertId: 42 });
      const ctx = makeCtx();
      const result = await caller(ctx).featuredAdvertisers.submitApplication({
        businessName: "Test Business",
        contactName: "John Doe",
        contactEmail: "john@test.com",
        category: "Roofing",
        zipCodes: ["75001", "75002"],
        selectedTier: "featured",
      });
      expect(result).toEqual({ success: true });
      expect(mockExecute).toHaveBeenCalled();
    });
  });

  describe("trackEvent", () => {
    it("increments impressions", async () => {
      mockExecute.mockResolvedValue({ affectedRows: 1 });
      const ctx = makeCtx({ user: makeUser("user") });
      const result = await caller(ctx).featuredAdvertisers.trackEvent({ id: 1, event: "impression" });
      expect(result).toEqual({ success: true });
    });

    it("increments clicks", async () => {
      mockExecute.mockResolvedValue({ affectedRows: 1 });
      const ctx = makeCtx({ user: makeUser("user") });
      const result = await caller(ctx).featuredAdvertisers.trackEvent({ id: 1, event: "click" });
      expect(result).toEqual({ success: true });
    });
  });

  describe("getActiveBanners", () => {
    it("returns filtered banners for a zip code", async () => {
      mockExecute.mockResolvedValue([
        { id: 1, businessName: "Local Roofer", zipCodes: '["75001","75002"]', bannerTitle: "Best Roofing" },
        { id: 2, businessName: "Far Away Co", zipCodes: '["90210"]', bannerTitle: "LA Roofing" },
      ]);
      const ctx = makeCtx();
      const result = await caller(ctx).featuredAdvertisers.getActiveBanners({
        zipCode: "75001",
        placement: "dashboard",
      });
      expect(result.length).toBe(1);
      expect(result[0].businessName).toBe("Local Roofer");
    });

    it("returns all banners when no zip code is provided", async () => {
      mockExecute.mockResolvedValue([
        { id: 1, businessName: "A", zipCodes: '["75001"]' },
        { id: 2, businessName: "B", zipCodes: '["90210"]' },
      ]);
      const ctx = makeCtx();
      const result = await caller(ctx).featuredAdvertisers.getActiveBanners({ placement: "dashboard" });
      expect(result.length).toBe(2);
    });
  });

  describe("delete", () => {
    it("rejects non-admin", async () => {
      const ctx = makeCtx({ user: makeUser("user") });
      await expect(caller(ctx).featuredAdvertisers.delete({ id: 1 }))
        .rejects.toThrow("FORBIDDEN");
    });

    it("deletes an advertiser for admin", async () => {
      mockExecute.mockResolvedValue({ affectedRows: 1 });
      const ctx = makeCtx({ user: makeUser("admin") });
      const result = await caller(ctx).featuredAdvertisers.delete({ id: 1 });
      expect(result).toEqual({ success: true });
    });
  });

  describe("getStats", () => {
    it("returns stats summary for admin", async () => {
      mockExecute.mockResolvedValue([{ total: 5, active: 3, totalMrr: 1500, totalImpressions: 10000, totalClicks: 250 }]);
      const ctx = makeCtx({ user: makeUser("admin") });
      const result = await caller(ctx).featuredAdvertisers.getStats();
      expect(result.total).toBe(5);
      expect(result.active).toBe(3);
    });
  });
});
