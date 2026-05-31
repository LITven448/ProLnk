/**
 * Job-loop integration test — proves the END-TO-END assignment flow works at the
 * function level, not just that it compiles. Mocks the DB layer with a stateful
 * in-memory store that interprets the exact Drizzle / raw-SQL calls the matching
 * engine + matching router make.
 *
 * Loop covered:
 *   1. opportunity exists (trade, zip, scope)
 *   2. rankPartnersForOpportunity ranks only eligible partners, correct order
 *   3. createOfferForOpportunity offers the top partner with a 24h expiry
 *   4. respondToOffer(accept) → opportunity 'assigned' + assignedPartnerId
 *   5. respondToOffer(decline) → cascades to next-ranked partner
 *   6. sweepExpiredOffers → expired 'offered' row → 'expired' + cascades next
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { jobOffers, opportunities, partners } from "../drizzle/schema";

// ── In-memory data stores (reset per test) ──────────────────────────────────
interface Row {
  [k: string]: unknown;
}
const stores = {
  opportunities: [] as Row[],
  partners: [] as Row[],
  jobOffers: [] as Row[],
};
let nextOfferId = 1;

function storeFor(table: unknown): Row[] {
  if (table === jobOffers) return stores.jobOffers;
  if (table === opportunities) return stores.opportunities;
  if (table === partners) return stores.partners;
  throw new Error("unknown table in mock");
}

/**
 * Predicate captured from drizzle `eq()` / `and()` / `lt()`. The real drizzle
 * helpers return opaque SQL objects, so we replace them (below) with plain
 * descriptors the mock can evaluate against an in-memory row.
 */
type Pred = (row: Row) => boolean;

// Mock drizzle operators so where-clauses are inspectable.
vi.mock("drizzle-orm", async (importOriginal) => {
  const actual = await importOriginal<typeof import("drizzle-orm")>();
  return {
    ...actual,
    eq: (col: { _key: string }, val: unknown) =>
      ((row: Row) => row[col._key] === val) as Pred & { __pred: true },
    lt: (col: { _key: string }, val: unknown) =>
      ((row: Row) => {
        const v = row[col._key];
        return v != null && (v as number | Date) < (val as number | Date);
      }) as Pred & { __pred: true },
    and: (...preds: Pred[]) => ((row: Row) => preds.every((p) => p(row))) as Pred,
    inArray: (col: { _key: string }, vals: unknown[]) =>
      ((row: Row) => vals.includes(row[col._key])) as Pred,
    desc: (col: { _key: string }) => ({ _orderKey: col._key }),
  };
});

// drizzle column accessors used in where/order — make them carry their key.
// The schema columns are objects; we tag the ones the router touches by name.
function tagColumns() {
  const tag = (table: Record<string, unknown>) => {
    for (const k of Object.keys(table)) {
      const col = table[k] as Record<string, unknown> | null;
      if (col && typeof col === "object") (col as { _key?: string })._key = k;
    }
  };
  tag(jobOffers as unknown as Record<string, unknown>);
  tag(opportunities as unknown as Record<string, unknown>);
  tag(partners as unknown as Record<string, unknown>);
}
tagColumns();

// ── Stateful db mock ─────────────────────────────────────────────────────────
function makeDb() {
  return {
    // drizzle select() builder
    select(_cols?: unknown) {
      let table: unknown;
      let pred: Pred = () => true;
      const builder: Record<string, unknown> = {
        from(t: unknown) {
          table = t;
          return builder;
        },
        where(p: Pred) {
          pred = p ?? (() => true);
          return builder;
        },
        orderBy() {
          return builder;
        },
        async limit(n: number) {
          return storeFor(table).filter(pred).slice(0, n);
        },
        then(resolve: (rows: Row[]) => void) {
          resolve(storeFor(table).filter(pred));
        },
      };
      return builder;
    },
    insert(table: unknown) {
      return {
        async values(vals: Row) {
          const id = nextOfferId++;
          storeFor(table).push({ id, ...vals });
          return [{ insertId: id }];
        },
      };
    },
    update(table: unknown) {
      let patch: Row = {};
      const builder: Record<string, unknown> = {
        set(p: Row) {
          patch = p;
          return builder;
        },
        async where(pred: Pred) {
          for (const row of storeFor(table)) if (pred(row)) Object.assign(row, patch);
        },
      };
      return builder;
    },
    // raw execute — used by ensureJobOffersInfra (DDL, ignored) and
    // rankPartnersForOpportunity (SELECTs that must return data).
    async execute(sqlText: string, params?: unknown[]) {
      const text = String(sqlText);
      if (/FROM opportunities WHERE id =/i.test(text)) {
        const id = (params?.[0] as number) ?? null;
        const row = stores.opportunities.find((o) => o.id === id);
        return [row ? [row] : []];
      }
      if (/FROM partners/i.test(text) && /status IN/i.test(text)) {
        const rows = stores.partners.filter(
          (p) =>
            ["approved", "active"].includes(p.status as string) && p.suspendedAt == null
        );
        return [rows];
      }
      // DDL / notifications / misc — no-op.
      return [[]];
    },
  };
}

let dbMock = makeDb();
vi.mock("./db", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./db")>();
  return {
    ...actual,
    getDb: vi.fn(async () => dbMock),
  };
});

// Imported AFTER mocks are registered.
import { rankPartnersForOpportunity } from "./matching-engine";
import {
  createOfferForOpportunity,
  sweepExpiredOffers,
} from "./routers/matching";

// We test respondToOffer's accept/decline branches via the matching router's
// exported helpers + a direct state check, since calling the tRPC procedure
// requires auth ctx. To exercise the real respondToOffer logic we replicate the
// caller through appRouter would need a full ctx; instead we drive the same
// state transitions the procedure performs by importing the router caller.
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function partnerCtx(userId: number): TrpcContext {
  return {
    user: {
      id: userId,
      openId: `u-${userId}`,
      email: `u${userId}@test.com`,
      name: "P",
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

function seed() {
  stores.opportunities = [
    {
      id: 100,
      opportunityCategory: "Roofing & Gutters",
      opportunityType: "Roofing",
      jobZip: "75201",
      estimatedJobValue: "8000",
      sourcePartnerId: null,
      status: "approved",
    },
  ];
  // 4 partners: matching+in-zip pro (top tier), matching+in-zip scout (lower),
  // wrong trade, out-of-zip, suspended. Only the first two should rank.
  stores.partners = [
    {
      id: 1,
      userId: 11,
      businessName: "TopRoof Pro",
      businessType: "Roofing & Gutters",
      tier: "business",
      status: "approved",
      suspendedAt: null,
      isFoundingPartner: 0,
      isExempt: 0,
      priorityScore: 90,
      serviceZipCodes: JSON.stringify(["75201", "75202"]),
      serviceAreaLat: null,
      serviceAreaLng: null,
      serviceRadiusMiles: null,
      weeklyLeadCap: 15,
      weeklyLeadsReceived: 0,
      avgLeadResponseHours: 2,
      rating: 4.8,
    },
    {
      id: 2,
      userId: 12,
      businessName: "BudgetRoof Scout",
      businessType: "Roofing",
      tier: "scout",
      status: "approved",
      suspendedAt: null,
      isFoundingPartner: 0,
      isExempt: 0,
      priorityScore: 40,
      serviceZipCodes: JSON.stringify(["75201"]),
      serviceAreaLat: null,
      serviceAreaLng: null,
      serviceRadiusMiles: null,
      weeklyLeadCap: 15,
      weeklyLeadsReceived: 0,
      avgLeadResponseHours: 8,
      rating: 4.0,
    },
    {
      id: 3,
      userId: 13,
      businessName: "CleanCo",
      businessType: "House Cleaning",
      tier: "pro",
      status: "approved",
      suspendedAt: null,
      serviceZipCodes: JSON.stringify(["75201"]),
      weeklyLeadCap: 15,
      weeklyLeadsReceived: 0,
      avgLeadResponseHours: 1,
      rating: 5.0,
      priorityScore: 100,
    },
    {
      id: 4,
      userId: 14,
      businessName: "FarRoof",
      businessType: "Roofing & Gutters",
      tier: "pro",
      status: "approved",
      suspendedAt: null,
      serviceZipCodes: JSON.stringify(["99999"]),
      weeklyLeadCap: 15,
      weeklyLeadsReceived: 0,
      avgLeadResponseHours: 1,
      rating: 5.0,
      priorityScore: 100,
    },
    {
      id: 5,
      userId: 15,
      businessName: "SuspendedRoof",
      businessType: "Roofing & Gutters",
      tier: "business",
      status: "approved",
      suspendedAt: new Date(),
      serviceZipCodes: JSON.stringify(["75201"]),
      weeklyLeadCap: 15,
      weeklyLeadsReceived: 0,
      avgLeadResponseHours: 1,
      rating: 5.0,
      priorityScore: 100,
    },
  ];
  stores.jobOffers = [];
  nextOfferId = 1;
}

beforeEach(() => {
  dbMock = makeDb();
  seed();
});

describe("job loop — ranking (step 1-2)", () => {
  it("ranks only eligible partners (matching trade + in-zip, not suspended)", async () => {
    const ranked = await rankPartnersForOpportunity(100);
    const ids = ranked.map((r) => r.partnerId);
    expect(ids).toContain(1);
    expect(ids).toContain(2);
    expect(ids).not.toContain(3); // wrong trade
    expect(ids).not.toContain(4); // out of zip
    expect(ids).not.toContain(5); // suspended (filtered at SQL + isActive)
    expect(ranked).toHaveLength(2);
  });

  it("orders the higher-tier / better-signal partner first", async () => {
    const ranked = await rankPartnersForOpportunity(100);
    expect(ranked[0].partnerId).toBe(1); // business tier, faster, higher rating
    expect(ranked[0].score).toBeGreaterThan(ranked[1].score);
  });
});

describe("job loop — offer creation (step 3)", () => {
  it("creates an offer to the top-ranked partner with a ~24h expiry", async () => {
    const offerId = await createOfferForOpportunity(100);
    expect(offerId).not.toBeNull();
    const offer = stores.jobOffers.find((o) => o.id === offerId)!;
    expect(offer.partnerId).toBe(1);
    expect(offer.status).toBe("offered");
    const ttl = (offer.expiresAt as Date).getTime() - Date.now();
    expect(ttl).toBeGreaterThan(23 * 3600 * 1000);
    expect(ttl).toBeLessThanOrEqual(24 * 3600 * 1000 + 5000);
    // opportunity flips to 'sent'
    const opp = stores.opportunities.find((o) => o.id === 100)!;
    expect(opp.status).toBe("sent");
    expect(opp.receivingPartnerId).toBe(1);
  });

  it("does not re-offer to a partner already offered (cascade target moves on)", async () => {
    await createOfferForOpportunity(100); // → partner 1
    const second = await createOfferForOpportunity(100); // skips 1 → partner 2
    const offer = stores.jobOffers.find((o) => o.id === second)!;
    expect(offer.partnerId).toBe(2);
  });
});

describe("job loop — accept (step 4)", () => {
  it("respondToOffer(accept) assigns the opportunity to the partner", async () => {
    const offerId = await createOfferForOpportunity(100);
    const caller = appRouter.createCaller(partnerCtx(11)); // partner 1's user
    const res = await caller.matching.respondToOffer({ offerId: offerId!, accept: true });
    expect(res.status).toBe("accepted");
    const opp = stores.opportunities.find((o) => o.id === 100)!;
    expect(opp.status).toBe("assigned");
    expect(opp.assignedPartnerId).toBe(1);
    const offer = stores.jobOffers.find((o) => o.id === offerId)!;
    expect(offer.status).toBe("accepted");
  });
});

describe("job loop — decline cascade (step 5)", () => {
  it("respondToOffer(decline) cascades to the next-ranked partner", async () => {
    const offerId = await createOfferForOpportunity(100); // → partner 1
    const caller = appRouter.createCaller(partnerCtx(11));
    const res = await caller.matching.respondToOffer({ offerId: offerId!, accept: false });
    expect(res.status).toBe("declined");
    expect(res.nextOfferId).not.toBeNull();
    const declined = stores.jobOffers.find((o) => o.id === offerId)!;
    expect(declined.status).toBe("declined");
    const next = stores.jobOffers.find((o) => o.id === res.nextOfferId)!;
    expect(next.partnerId).toBe(2); // cascaded to second-ranked
    expect(next.status).toBe("offered");
  });
});

describe("job loop — expiry sweep (step 6)", () => {
  it("sweepExpiredOffers expires a stale offer and cascades to next", async () => {
    const offerId = await createOfferForOpportunity(100); // → partner 1
    // force-expire it
    const offer = stores.jobOffers.find((o) => o.id === offerId)!;
    offer.expiresAt = new Date(Date.now() - 60_000);
    const result = await sweepExpiredOffers();
    expect(result.expired).toBe(1);
    expect(result.cascaded).toBe(1);
    expect(offer.status).toBe("expired");
    const next = stores.jobOffers.find(
      (o) => o.partnerId === 2 && o.status === "offered"
    );
    expect(next).toBeTruthy();
  });

  it("cascade exhaustion marks the opportunity expired when no partners remain", async () => {
    // offer + decline both eligible partners, then sweep finds nothing to cascade
    const o1 = await createOfferForOpportunity(100); // p1
    const c1 = appRouter.createCaller(partnerCtx(11));
    await c1.matching.respondToOffer({ offerId: o1!, accept: false }); // → p2 offered
    const o2 = stores.jobOffers.find((o) => o.partnerId === 2 && o.status === "offered")!;
    const c2 = appRouter.createCaller(partnerCtx(12));
    const res = await c2.matching.respondToOffer({ offerId: o2.id as number, accept: false });
    expect(res.nextOfferId).toBeNull(); // exhausted
    const opp = stores.opportunities.find((o) => o.id === 100)!;
    expect(opp.status).toBe("expired");
  });
});
