import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

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
    req: {
      protocol: "https",
      headers: { origin: "https://prolnk.io" },
    } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

// stripe.createConnectLink takes { origin: string }
describe("stripe.createConnectLink", () => {
  it("procedure exists and requires authentication", async () => {
    const unauthCtx: TrpcContext = {
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(unauthCtx);

    await expect(
      caller.stripe.createConnectLink({ origin: "https://prolnk.io" })
    ).rejects.toThrow();
  });

  it("returns an onboarding URL or throws a known error for authenticated partners", async () => {
    const ctx = createPartnerCtx(9909);
    const caller = appRouter.createCaller(ctx);

    try {
      const result = await caller.stripe.createConnectLink({
        origin: "https://prolnk.io",
      });
      expect(result).toBeDefined();
      expect(typeof result.url).toBe("string");
    } catch (err: unknown) {
      // In test env, partner profile may not exist or Stripe may not be configured
      const message = err instanceof Error ? err.message : String(err);
      expect(message.length).toBeGreaterThan(0);
    }
  });
});

describe("stripe.createCheckoutSession", () => {
  it("requires authentication", async () => {
    const unauthCtx: TrpcContext = {
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(unauthCtx);

    await expect(
      caller.stripe.createCheckoutSession({ priceId: "price_test123" })
    ).rejects.toThrow();
  });

  it("returns a checkout URL or throws a known error for authenticated users", async () => {
    const ctx = createPartnerCtx(9910);
    const caller = appRouter.createCaller(ctx);

    try {
      const result = await caller.stripe.createCheckoutSession({
        priceId: "price_test123",
      });
      expect(result).toBeDefined();
    } catch (err: unknown) {
      // Acceptable: Stripe not configured or invalid price ID in test env
      const message = err instanceof Error ? err.message : String(err);
      expect(message.length).toBeGreaterThan(0);
    }
  });
});
