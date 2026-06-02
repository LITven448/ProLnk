import { describe, expect, it, vi, beforeEach } from "vitest";
import type { TrpcContext } from "./_core/context";

// --- Mock the decomposition engine (deterministic output) ------------------
const decomposeProject = vi.fn();
vi.mock("./exchange-decomposition", () => ({
  decomposeProject: (...a: any[]) => decomposeProject(...a),
}));

// --- Mock the matching/offer engine (reused per child, do NOT reimplement) -
const createOfferForOpportunity = vi.fn();
const ensureJobOffersInfra = vi.fn().mockResolvedValue(undefined);
vi.mock("./routers/matching", () => ({
  createOfferForOpportunity: (...a: any[]) => createOfferForOpportunity(...a),
  ensureJobOffersInfra: () => ensureJobOffersInfra(),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(undefined),
}));

// --- In-memory mock DB ------------------------------------------------------
let insertedRows: any[] = [];
let nextId = 100;
const execute = vi.fn(async (sqlText: string, params: any[]) => {
  if (/INSERT INTO opportunities/i.test(sqlText)) {
    const id = ++nextId;
    insertedRows.push({ id, sqlText, params });
    return [{ insertId: id }];
  }
  return [{}];
});
vi.mock("./db", () => ({
  getDb: vi.fn(async () => ({ execute })),
}));

import { exchangeRouter } from "./routers/exchange";

function partnerCtx(id = 1): TrpcContext {
  return {
    user: {
      id, openId: `p-${id}`, email: `p${id}@t.com`, name: "P",
      loginMethod: "manus", role: "user",
      createdAt: new Date(), updatedAt: new Date(), lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

describe("exchange.postProject", () => {
  beforeEach(() => {
    insertedRows = [];
    nextId = 100;
    decomposeProject.mockReset();
    createOfferForOpportunity.mockReset();
    createOfferForOpportunity.mockImplementation(async (oppId: number) => oppId * 10);
  });

  it("creates a parent + one child per component and fires an offer per child", async () => {
    decomposeProject.mockResolvedValue({
      decomposed: true,
      components: [
        { trade: "Plumbing", description: "Rough-in", estimatedValue: 40000, sequenceOrder: 1 },
        { trade: "Electrical", description: "Wiring", estimatedValue: 30000, sequenceOrder: 2 },
        { trade: "Drywall", description: "Finish", estimatedValue: 20000, sequenceOrder: 3 },
      ],
    });

    const caller = exchangeRouter.createCaller(partnerCtx());
    const res = await caller.postProject({
      scope: "Whole house renovation with new systems",
      approvedTotal: 100000,
      postedTotal: 90000,
      zip: "75201",
    });

    // 1 parent + 3 children inserted
    expect(insertedRows.length).toBe(4);
    const parentInserts = insertedRows.filter((r) => /'project'/.test(r.sqlText));
    expect(parentInserts.length).toBe(1);

    // An offer fired for each of the 3 children
    expect(createOfferForOpportunity).toHaveBeenCalledTimes(3);

    expect(res.components.length).toBe(3);
    expect(res.components.every((c) => c.offerId != null)).toBe(true);
    expect(res.scoutMargin).toBe(10000);
    expect(res.decomposed).toBe(true);
  });

  it("still creates a single child + one offer when the LLM falls back", async () => {
    decomposeProject.mockResolvedValue({
      decomposed: false,
      components: [
        { trade: "General", description: "GC manages full scope", estimatedValue: 50000, sequenceOrder: 1 },
      ],
    });

    const caller = exchangeRouter.createCaller(partnerCtx());
    const res = await caller.postProject({
      scope: "Some large multi-trade project description",
      approvedTotal: 50000,
      zip: "75201",
    });

    expect(insertedRows.length).toBe(2); // parent + 1 child
    expect(createOfferForOpportunity).toHaveBeenCalledTimes(1);
    expect(res.components.length).toBe(1);
    expect(res.components[0].trade).toBe("General");
    expect(res.scoutMargin).toBe(0);
    expect(res.decomposed).toBe(false);
  });

  it("rejects when posted total exceeds approved total", async () => {
    const caller = exchangeRouter.createCaller(partnerCtx());
    await expect(
      caller.postProject({
        scope: "A project with too high a posted total",
        approvedTotal: 50000,
        postedTotal: 60000,
        zip: "75201",
      })
    ).rejects.toThrow(/cannot exceed/i);
    expect(decomposeProject).not.toHaveBeenCalled();
  });
});
