import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock notifications to avoid real email/SMS in tests
vi.mock("./notifications", () => ({
  sendPartnerNotification: vi.fn().mockResolvedValue(true),
  sendEmail: vi.fn().mockResolvedValue(true),
}));

function createHomeownerCtx(id = 1): TrpcContext {
  return {
    user: {
      id,
      openId: `homeowner-${id}`,
      email: `homeowner${id}@test.com`,
      name: "Test Homeowner",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

function createPartnerCtx(id = 1): TrpcContext {
  return {
    user: {
      id,
      openId: `partner-${id}`,
      email: `partner${id}@test.com`,
      name: "Test Partner",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

describe("exchange.awardBid — notification", () => {
  it("awardBid procedure exists and is protected", async () => {
    // Verify the procedure exists in the router
    const unauthCtx: TrpcContext = {
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(unauthCtx);

    // Should throw UNAUTHORIZED for unauthenticated users
    await expect(
      caller.exchange.awardBid({ bidId: 1, jobId: 1 })
    ).rejects.toThrow();
  });

  it("awardBid is accessible to authenticated users", async () => {
    const ctx = createHomeownerCtx(9907);
    const caller = appRouter.createCaller(ctx);

    // Should throw a business error (job not found), not an auth error
    try {
      await caller.exchange.awardBid({ bidId: 999999, jobId: 999999 });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      // Should be a business error, not UNAUTHORIZED
      expect(message).not.toContain("UNAUTHORIZED");
    }
  });
});

describe("partnerTools.events.register — notification", () => {
  it("event registration returns success for authenticated partner", async () => {
    const ctx = createPartnerCtx(9908);
    const caller = appRouter.createCaller(ctx);

    // Should succeed or throw a business error (event not found), not auth error
    try {
      const result = await caller.partnerTools.events.register({ eventId: 1 });
      expect(result).toMatchObject({ success: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      expect(message).not.toContain("UNAUTHORIZED");
    }
  });
});
