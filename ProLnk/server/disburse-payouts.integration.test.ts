/**
 * Payout disbursement integration test — PROVES the recipient-resolution contract
 * of disbursePendingPayouts (server/routers/stripeConnect.ts).
 *
 * The recipient resolution lives entirely in one SQL JOIN: a commission_payout
 * row's recipient_user_id is resolved to a partners row via THREE paths
 * (partners.id, partners.userId, OR the proWaitlist.email → partners.contactEmail
 * fallback). The disbursement loop must:
 *   - PAY a row whose recipient resolves to an `active` connected account,
 *   - SKIP (not error, not mispay) a row that resolves to no partner / no account,
 *   - NEVER pay a row that is already 'paid'.
 *
 * We drive the REAL disbursePendingPayouts against a stateful in-memory DB mock
 * that interprets the exact JOIN + fresh-status SELECT + UPDATE, and a stubbed
 * Stripe client whose transfers.create() we record. Same in-memory-interpreter
 * approach as commission-cascade.integration.test.ts / job-loop.integration.test.ts.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

// Enable the Connect gate BEFORE the module is imported.
process.env.STRIPE_CONNECT_ENABLED = "true";
process.env.STRIPE_SECRET_KEY = "sk_test_dummy";

interface PayoutRow {
  id: number;
  amount: string;
  recipient_user_id: string;
  status: string;
  payout_type: string;
  payout_month: string;
  created_at: number;
  stripe_transfer_id: string | null;
}
interface PartnerRow {
  id: number;
  userId: number | null;
  contactEmail: string | null;
  stripeConnectAccountId: string | null;
  stripeConnectStatus: string | null;
}
interface WaitlistRow {
  id: number;
  email: string | null;
}

const stores = {
  payouts: [] as PayoutRow[],
  partners: [] as PartnerRow[],
  waitlist: [] as WaitlistRow[],
};

function decodeSql(query: unknown): { text: string; params: unknown[] } {
  const chunks = (query as { queryChunks?: unknown[] }).queryChunks ?? [];
  let text = "";
  const params: unknown[] = [];
  for (const c of chunks) {
    if (c && typeof c === "object" && (c as { constructor?: { name?: string } }).constructor?.name === "StringChunk") {
      text += ((c as { value: string[] }).value ?? []).join("");
    } else {
      text += " ? ";
      params.push(c);
    }
  }
  return { text: text.replace(/\s+/g, " ").trim(), params };
}

/** Resolve recipient_user_id → partner row via the engine's three-path contract. */
function resolvePartner(recipientId: string): PartnerRow | null {
  const num = Number(recipientId);
  const pw = stores.waitlist.find((w) => w.id === num) ?? null;
  return (
    stores.partners.find(
      (p) =>
        p.id === num ||
        p.userId === num ||
        (pw?.email != null && p.contactEmail === pw.email)
    ) ?? null
  );
}

function makeDb() {
  return {
    async execute(query: unknown) {
      const { text, params } = decodeSql(query);

      // DDL self-heal (ensureConnectPayoutInfra) — no-op.
      if (/^ALTER TABLE/i.test(text)) return [[]];

      // Main JOIN: pending rows + resolved partner connect account.
      if (/FROM commission_payout cp/i.test(text) && /status = 'pending'/i.test(text)) {
        const rows = stores.payouts
          .filter((p) => p.status === "pending")
          .sort((a, b) => a.created_at - b.created_at)
          .map((cp) => {
            const partner = resolvePartner(cp.recipient_user_id);
            return {
              id: cp.id,
              amount: cp.amount,
              recipient_user_id: cp.recipient_user_id,
              status: cp.status,
              payout_type: cp.payout_type,
              payout_month: cp.payout_month,
              partnerId: partner?.id ?? null,
              accountId: partner?.stripeConnectAccountId ?? null,
              connectStatus: partner?.stripeConnectStatus ?? null,
            };
          });
        return rows;
      }

      // Per-row idempotency re-check: SELECT status, stripe_transfer_id ... WHERE id = ?
      if (/SELECT status, stripe_transfer_id FROM commission_payout WHERE id/i.test(text)) {
        const id = Number(params[0]);
        const row = stores.payouts.find((p) => p.id === id);
        return row ? [{ status: row.status, stripe_transfer_id: row.stripe_transfer_id }] : [];
      }

      // Mark paid: UPDATE ... SET status='paid', stripe_transfer_id=?, paid_at=NOW() WHERE id=? AND status='pending'
      if (/UPDATE commission_payout SET status = 'paid'/i.test(text)) {
        const transferId = params[0];
        const id = Number(params[1]);
        const row = stores.payouts.find((p) => p.id === id && p.status === "pending");
        if (row) {
          row.status = "paid";
          row.stripe_transfer_id = String(transferId);
        }
        return [{ affectedRows: row ? 1 : 0 }];
      }

      return [[]];
    },
  };
}

let dbMock = makeDb();
vi.mock("./db", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./db")>();
  return { ...actual, getDb: vi.fn(async () => dbMock) };
});

const transferCalls: Array<{ amount: number; destination: string; metadata: unknown }> = [];
let transferSeq = 0;
const stripeStub = {
  transfers: {
    create: vi.fn(async (args: { amount: number; destination: string; metadata: unknown }) => {
      transferCalls.push({ amount: args.amount, destination: args.destination, metadata: args.metadata });
      return { id: `tr_${++transferSeq}` };
    }),
  },
};
vi.mock("stripe", () => ({ default: vi.fn(() => stripeStub) }));

// Imported AFTER mocks + env are set.
import { disbursePendingPayouts } from "./routers/stripeConnect";

function pendingPayout(over: Partial<PayoutRow> & { id: number; recipient_user_id: string; amount: string }): PayoutRow {
  return {
    status: "pending",
    payout_type: "network_l1",
    payout_month: "2026-06",
    created_at: over.id,
    stripe_transfer_id: null,
    ...over,
  };
}

beforeEach(() => {
  stores.payouts = [];
  stores.partners = [];
  stores.waitlist = [];
  transferCalls.length = 0;
  transferSeq = 0;
  stripeStub.transfers.create.mockClear();
  dbMock = makeDb();
});

describe("disbursePendingPayouts — recipient resolution contract", () => {
  it("PAYS a payout whose recipient resolves to a partner by partners.id with an active account", async () => {
    stores.partners = [
      { id: 201, userId: 11, contactEmail: "a@x.com", stripeConnectAccountId: "acct_1", stripeConnectStatus: "active" },
    ];
    stores.payouts = [pendingPayout({ id: 1, recipient_user_id: "201", amount: "70.00" })];

    const res = await disbursePendingPayouts();
    expect(res.enabled).toBe(true);
    expect(res.paid).toBe(1);
    expect(res.skipped).toBe(0);
    expect(res.errors).toBe(0);
    expect(transferCalls).toHaveLength(1);
    expect(transferCalls[0].destination).toBe("acct_1");
    expect(transferCalls[0].amount).toBe(7000); // dollars → cents
    expect(stores.payouts[0].status).toBe("paid");
    expect(stores.payouts[0].stripe_transfer_id).toBe("tr_1");
  });

  it("resolves a recipient by partners.userId", async () => {
    stores.partners = [
      { id: 999, userId: 42, contactEmail: null, stripeConnectAccountId: "acct_u", stripeConnectStatus: "active" },
    ];
    // recipient_user_id matches userId (42), not the partner.id (999)
    stores.payouts = [pendingPayout({ id: 1, recipient_user_id: "42", amount: "10.00" })];

    const res = await disbursePendingPayouts();
    expect(res.paid).toBe(1);
    expect(transferCalls[0].destination).toBe("acct_u");
  });

  it("resolves a recipient via the proWaitlist.email → partners.contactEmail fallback", async () => {
    stores.waitlist = [{ id: 500, email: "pro@trade.com" }];
    stores.partners = [
      { id: 7, userId: 88, contactEmail: "pro@trade.com", stripeConnectAccountId: "acct_email", stripeConnectStatus: "active" },
    ];
    // recipient id 500 matches neither partners.id (7) nor userId (88) — only the email fallback.
    stores.payouts = [pendingPayout({ id: 1, recipient_user_id: "500", amount: "25.00" })];

    const res = await disbursePendingPayouts();
    expect(res.paid).toBe(1);
    expect(transferCalls[0].destination).toBe("acct_email");
  });

  it("SKIPS (does not error, does not pay) a payout whose recipient resolves to no partner", async () => {
    stores.partners = [];
    stores.payouts = [pendingPayout({ id: 1, recipient_user_id: "404", amount: "50.00" })];

    const res = await disbursePendingPayouts();
    expect(res.paid).toBe(0);
    expect(res.skipped).toBe(1);
    expect(res.errors).toBe(0);
    expect(transferCalls).toHaveLength(0);
    expect(stores.payouts[0].status).toBe("pending"); // untouched, not mispaid
  });

  it("SKIPS a payout whose partner has no/inactive connected account", async () => {
    stores.partners = [
      { id: 1, userId: 1, contactEmail: null, stripeConnectAccountId: null, stripeConnectStatus: "not_connected" },
      { id: 2, userId: 2, contactEmail: null, stripeConnectAccountId: "acct_pending", stripeConnectStatus: "pending" },
    ];
    stores.payouts = [
      pendingPayout({ id: 1, recipient_user_id: "1", amount: "30.00" }),
      pendingPayout({ id: 2, recipient_user_id: "2", amount: "40.00" }),
    ];

    const res = await disbursePendingPayouts();
    expect(res.paid).toBe(0);
    expect(res.skipped).toBe(2);
    expect(res.errors).toBe(0);
    expect(transferCalls).toHaveLength(0);
  });

  it("does NOT pay a row that is already 'paid' (no double-pay)", async () => {
    stores.partners = [
      { id: 1, userId: 1, contactEmail: null, stripeConnectAccountId: "acct_1", stripeConnectStatus: "active" },
    ];
    // already-paid row should never be selected (status filter) nor transferred.
    stores.payouts = [
      { ...pendingPayout({ id: 1, recipient_user_id: "1", amount: "70.00" }), status: "paid", stripe_transfer_id: "tr_old" },
    ];

    const res = await disbursePendingPayouts();
    expect(res.paid).toBe(0);
    expect(transferCalls).toHaveLength(0);
    expect(stores.payouts[0].stripe_transfer_id).toBe("tr_old"); // unchanged
  });

  it("pays only the resolvable rows in a mixed batch and skips the rest", async () => {
    stores.waitlist = [{ id: 500, email: "pro@trade.com" }];
    stores.partners = [
      { id: 201, userId: 11, contactEmail: "a@x.com", stripeConnectAccountId: "acct_a", stripeConnectStatus: "active" },
      { id: 7, userId: 88, contactEmail: "pro@trade.com", stripeConnectAccountId: "acct_b", stripeConnectStatus: "active" },
    ];
    stores.payouts = [
      pendingPayout({ id: 1, recipient_user_id: "201", amount: "70.00" }), // by id → pay
      pendingPayout({ id: 2, recipient_user_id: "404", amount: "40.00" }), // unresolved → skip
      pendingPayout({ id: 3, recipient_user_id: "500", amount: "25.00" }), // by email → pay
    ];

    const res = await disbursePendingPayouts();
    expect(res.paid).toBe(2);
    expect(res.skipped).toBe(1);
    expect(res.errors).toBe(0);
    expect(transferCalls.map((t) => t.destination).sort()).toEqual(["acct_a", "acct_b"]);
    expect(stores.payouts.find((p) => p.id === 2)!.status).toBe("pending");
  });
});
