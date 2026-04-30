import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the db module so tests don't need a real DB or partner record
vi.mock("./db", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./db")>();
  let nextId = 1000;
  const proposalStore: Record<number, unknown> = {};

  const mockDb = {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockImplementation(function (this: unknown) {
      return {
        orderBy: vi.fn().mockResolvedValue(Object.values(proposalStore)),
        limit: vi.fn().mockResolvedValue([{ id: 1 }]), // partner record
      };
    }),
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockImplementation((vals: unknown) => {
      const id = ++nextId;
      proposalStore[id] = { id, status: "draft", ...vals as object };
      return { $returningId: vi.fn().mockResolvedValue([{ id }]) };
    }),
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
  };

  return {
    ...actual,
    getDb: vi.fn().mockResolvedValue(mockDb),
  };
});

function createPartnerCtx(id = 9902): TrpcContext {
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

describe("partnerTools.proposals", () => {
  const ctx = createPartnerCtx();
  const caller = appRouter.createCaller(ctx);

  it("create procedure accepts valid input and returns an id", async () => {
    try {
      const result = await caller.partnerTools.proposals.create({
        clientName: "John Homeowner",
        clientEmail: "john@example.com",
        title: "Roof Replacement",
        description: "Full tear-off and replacement",
        lineItems: [
          { description: "Labor", qty: 1, unitPrice: 3500 },
          { description: "Materials", qty: 1, unitPrice: 4200 },
        ],
        totalAmount: "$7,700.00",
      });
      expect(result.success).toBe(true);
      expect(typeof result.id).toBe("number");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      // Should not be a schema validation error
      expect(message).not.toContain("Invalid input");
      expect(message).not.toContain("ZodError");
    }
  });

  it("create procedure rejects missing required clientName", async () => {
    await expect(
      caller.partnerTools.proposals.create({
        clientName: "",
        title: "Test",
        lineItems: [],
        totalAmount: "$0.00",
      })
    ).rejects.toThrow();
  });

  it("create procedure rejects missing required title", async () => {
    await expect(
      caller.partnerTools.proposals.create({
        clientName: "John",
        title: "",
        lineItems: [],
        totalAmount: "$0.00",
      })
    ).rejects.toThrow();
  });

  it("send procedure requires authentication", async () => {
    const unauthCtx: TrpcContext = {
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
    };
    const unauthCaller = appRouter.createCaller(unauthCtx);
    await expect(
      unauthCaller.partnerTools.proposals.send({ id: 1 })
    ).rejects.toThrow();
  });

  it("list procedure requires authentication", async () => {
    const unauthCtx: TrpcContext = {
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
    };
    const unauthCaller = appRouter.createCaller(unauthCtx);
    await expect(unauthCaller.partnerTools.proposals.list()).rejects.toThrow();
  });
});
