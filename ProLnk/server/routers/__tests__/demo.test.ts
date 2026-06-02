import { describe, it, expect, beforeEach, vi } from "vitest";

// --- Mocks for the demo router's dependencies -------------------------------
const offerCalls: number[] = [];

vi.mock("../matching", () => ({
  ensureJobOffersInfra: vi.fn(async () => {}),
  createOfferForOpportunity: vi.fn(async (oppId: number) => {
    offerCalls.push(oppId);
    return 9000 + oppId;
  }),
}));

vi.mock("../../_core/requestToken", () => ({
  makeRequestTrackingToken: (id: number) => `tok-${id}`,
}));

// In-memory fake of the two tables the demo router touches.
let partnersTable: Array<{ id: number; businessName: string; contactEmail: string }>;
let oppsTable: Array<{
  id: number;
  homeownerEmail: string;
  homeownerName: string;
  opportunityCategory: string;
  jobZip: string;
  description: string;
}>;
let nextPartnerId: number;
let nextOppId: number;

const fakeDb = {
  // Tagged-template path used by sql`...`
  execute: vi.fn(async (q: any, params?: any[]) => {
    // Drizzle sql`` passes an object; raw string INSERT passes a string + params.
    const text: string = typeof q === "string" ? q : (q?.queryChunks?.map((c: any) => c?.value?.join?.("") ?? "").join(" ") ?? "");
    // We branch on the raw-string INSERT for opportunities (submitJobRequest style).
    if (typeof q === "string" && q.includes("INSERT INTO opportunities")) {
      const id = nextOppId++;
      oppsTable.push({
        id,
        opportunityCategory: params![1],
        description: params![3],
        jobZip: params![4],
        homeownerName: params![7],
        homeownerEmail: params![8],
      });
      return [{ insertId: id }];
    }
    return [];
  }),
};

// Helper that mimics the sql`SELECT id FROM partners WHERE contactEmail = ...`
// and opportunities lookups by intercepting the tagged-template calls. Because
// the real router uses drizzle's sql``, we instead route through a smarter mock
// installed per-test below.

vi.mock("../../db", () => ({
  getDb: vi.fn(async () => fakeDb),
}));

describe("demo router", () => {
  beforeEach(() => {
    partnersTable = [];
    oppsTable = [];
    nextPartnerId = 1;
    nextOppId = 100;
    offerCalls.length = 0;
    vi.clearAllMocks();
  });

  it("rejects an invalid preview key", async () => {
    const { demoRouter } = await import("../demo");
    const caller = demoRouter.createCaller({} as any);
    await expect(caller.seedAll({ previewKey: "wrong" })).rejects.toThrow(/preview key/i);
    await expect(caller.reset({ previewKey: "" })).rejects.toThrow(/preview key/i);
  });

  it("accepts the documented default preview key", async () => {
    // We can't run the full DB flow against the simplistic mock, but the gate
    // itself must pass for the default key before any DB work begins.
    const { demoRouter } = await import("../demo");
    const caller = demoRouter.createCaller({} as any);
    // Use a DB that returns empty for every select and records inserts so the
    // call completes without throwing the FORBIDDEN gate error.
    fakeDb.execute.mockImplementation(async (q: any, params?: any[]) => {
      if (typeof q === "string" && q.includes("INSERT INTO opportunities")) {
        const id = nextOppId++;
        return [{ insertId: id }];
      }
      return []; // all SELECTs => not found, all UPDATE/DELETE => no rows
    });
    const res = await caller.seedAll({ previewKey: "prolnk-preview-2026" });
    expect(res.success).toBe(true);
    // Two demo requests => two createOfferForOpportunity calls.
    expect(offerCalls.length).toBe(2);
    expect(res.requests.length).toBe(2);
  });
});
