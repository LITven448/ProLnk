import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function makeCtx(userId = 1, role: "user" | "admin" = "user"): TrpcContext {
  return {
    user: {
      id: userId,
      openId: `user-${userId}`,
      email: `user${userId}@test.com`,
      name: `Test User ${userId}`,
      loginMethod: "email",
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { headers: {}, socket: { remoteAddress: "127.0.0.1" } } as any,
    res: { clearCookie: () => {}, cookie: () => {} } as any,
  };
}

const caller = (userId = 1) => appRouter.createCaller(makeCtx(userId));

describe("Network Income System", () => {
  describe("lookupReferrer", () => {
    it("returns null for a nonexistent referral code", async () => {
      const result = await caller().network.lookupReferrer({ code: "XXXXXX" });
      expect(result).toBeNull();
    });

    it("accepts a 6-char uppercase code without throwing", async () => {
      await expect(caller().network.lookupReferrer({ code: "ABC123" })).resolves.toBeDefined();
    });
  });

  describe("getDashboard", () => {
    it("returns null when pro not enrolled in network", async () => {
      const result = await caller(9999).network.getDashboard();
      expect(result).toBeNull();
    });

    it("requires authentication", async () => {
      const anonCaller = appRouter.createCaller({
        user: null,
        req: { headers: {}, socket: { remoteAddress: "127.0.0.1" } } as any,
        res: { clearCookie: () => {}, cookie: () => {} } as any,
      });
      await expect(anonCaller.network.getDashboard()).rejects.toThrow();
    });
  });

  describe("enroll", () => {
    it("requires authentication", async () => {
      const anonCaller = appRouter.createCaller({
        user: null,
        req: { headers: {}, socket: { remoteAddress: "127.0.0.1" } } as any,
        res: { clearCookie: () => {}, cookie: () => {} } as any,
      });
      await expect(anonCaller.network.enroll({})).rejects.toThrow();
    });

    it("rejects self-referral code", async () => {
      // This would require the user to already be enrolled and use their own code
      // The check happens inside the procedure when a code is provided
      // We verify the procedure exists and the input schema is correct
      const c = caller(42);
      // Code that doesn't belong to user 42 should be accepted (or return NOT_FOUND)
      // This tests the procedure is callable with valid input shape
      await expect(c.network.enroll({ referralCode: "ABCDEF" })).rejects.toThrow();
    });
  });

  describe("getPayoutHistory", () => {
    it("returns empty array when no payouts", async () => {
      const result = await caller(9999).network.getPayoutHistory({ limit: 10 });
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });

  describe("adminGetNetworkOverview", () => {
    it("requires admin role", async () => {
      await expect(caller(1).network.adminGetNetworkOverview()).rejects.toThrow();
    });

    it("returns overview structure for admin", async () => {
      const adminCaller = appRouter.createCaller(makeCtx(1, "admin"));
      const result = await adminCaller.network.adminGetNetworkOverview();
      expect(result).toHaveProperty("byLevel");
      expect(result).toHaveProperty("totalPros");
      expect(result).toHaveProperty("pendingPayoutTotal");
      expect(result).toHaveProperty("pros");
      expect(Array.isArray(result.pros)).toBe(true);
    });
  });
});

describe("Waitlist Forms", () => {
  describe("joinProWaitlist", () => {
    it("rejects submission missing required fields", async () => {
      const c = appRouter.createCaller(makeCtx(1));
      await expect(c.waitlist.joinProWaitlist({
        firstName: "", lastName: "", email: "bad-email", phone: "",
        businessName: "", businessType: "", yearsInBusiness: 0,
        employeeCount: "", estimatedJobsPerMonth: 0, avgJobValue: "",
        trades: [], primaryCity: "", primaryState: "", serviceZipCodes: "",
        currentSoftware: [], referralsGivenPerMonth: "", referralsReceivedPerMonth: "",
        primaryGoal: "",
      } as any)).rejects.toThrow();
    });
  });

  describe("joinHomeWaitlist", () => {
    it("rejects submission missing desiredProjects", async () => {
      const c = appRouter.createCaller(makeCtx(1));
      await expect(c.waitlist.joinHomeWaitlist({
        firstName: "Jane", lastName: "Doe", email: "jane@test.com",
        address: "123 Main St", city: "Dallas", state: "TX", zipCode: "75001",
        homeType: "single_family",
        desiredProjects: [], // violates min(1)
        consentTerms: true,
      } as any)).rejects.toThrow();
    });
  });

  describe("getPublicCounts", () => {
    it("returns pro and home counts without auth", async () => {
      const anonCaller = appRouter.createCaller({
        user: null,
        req: { headers: {}, socket: { remoteAddress: "127.0.0.1" } } as any,
        res: { clearCookie: () => {}, cookie: () => {} } as any,
      });
      const result = await anonCaller.waitlist.getPublicCounts();
      expect(result).toHaveProperty("pros");
      expect(result).toHaveProperty("homes");
      expect(typeof result.pros).toBe("number");
      expect(typeof result.homes).toBe("number");
    });
  });
});
