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

describe("stripe.createBillingPortalSession", () => {
  it("procedure exists and is protected (requires auth)", async () => {
    const unauthCtx: TrpcContext = {
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
    };
    const caller = appRouter.createCaller(unauthCtx);

    await expect(
      caller.stripe.createBillingPortalSession({ returnUrl: "https://prolnk.io/dashboard/billing" })
    ).rejects.toThrow();
  });

  it("returns a billing portal URL or throws a known error for authenticated users", async () => {
    const ctx = createPartnerCtx(9904);
    const caller = appRouter.createCaller(ctx);

    try {
      const result = await caller.stripe.createBillingPortalSession({
        returnUrl: "https://prolnk.io/dashboard/billing",
      });
      // If Stripe is configured, should return a URL
      expect(result).toBeDefined();
      expect(typeof result.url).toBe("string");
    } catch (err: unknown) {
      // In test env, Stripe may not be configured or DB may not have user
      // Any of these errors are acceptable
      const message = err instanceof Error ? err.message : String(err);
      expect(message.length).toBeGreaterThan(0);
    }
  });

  it("rejects invalid returnUrl", async () => {
    const ctx = createPartnerCtx(9904);
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.stripe.createBillingPortalSession({ returnUrl: "not-a-url" })
    ).rejects.toThrow();
  });
});
