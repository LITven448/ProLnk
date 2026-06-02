/**
 * Scout origination idempotency test.
 *
 * PROVES scout.onboardProperty is idempotent per address: the FIRST documenter of
 * an address claims permanent origination rights, and any SECOND onboard of the
 * SAME address (whether by the same Scout or a different one) must NOT create a
 * duplicate home_documentation row and must NOT steal the origination claim.
 *
 * The procedure normalizes + SHA-256 hashes the address with the EXACT logic in
 * server/agents/commissionCascadeEngine.ts (findHomeOriginator), so a property
 * claimed here is recognized when jobs at that address later close. The test
 * drives the REAL router against a stateful in-memory DB mock that enforces the
 * unique address_hash index (mirroring `INSERT IGNORE`).
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

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

interface DocRow {
  id: number;
  pro_user_id: string;
  address_hash: string;
  full_address: string;
  is_first_documentation: number;
}

const docTable: DocRow[] = [];
let nextId = 1;

function makeDb() {
  return {
    async execute(query: unknown) {
      const { text, params } = decodeSql(query);

      // SELECT existing documentation by address_hash
      if (/SELECT .* FROM home_documentation WHERE address_hash =/i.test(text)) {
        const hash = params[0];
        const row = docTable.find((d) => d.address_hash === hash);
        return row
          ? [{ proUserId: row.pro_user_id, fullAddress: row.full_address, documentedAt: new Date() }]
          : [];
      }

      // INSERT IGNORE — honor the unique address_hash index
      if (/INSERT IGNORE INTO home_documentation/i.test(text)) {
        const [pro_user_id, address_hash, full_address] = params as string[];
        const exists = docTable.some((d) => d.address_hash === address_hash);
        if (!exists) {
          docTable.push({
            id: nextId++,
            pro_user_id: String(pro_user_id),
            address_hash: String(address_hash),
            full_address: String(full_address),
            is_first_documentation: 1,
          });
        }
        return [];
      }

      return [];
    },
  };
}

vi.mock("../server/db", () => ({ getDb: async () => makeDb() }));
vi.mock("./db", () => ({ getDb: async () => makeDb() }));

async function callOnboard(userId: number, address: string) {
  const { scoutRouter } = await import("./routers/scout");
  const caller = scoutRouter.createCaller({ user: { id: userId, role: "partner" } } as any);
  return caller.onboardProperty({ address });
}

describe("scout.onboardProperty idempotency", () => {
  beforeEach(() => {
    docTable.length = 0;
    nextId = 1;
  });

  it("first documenter claims origination; second onboard of same address does not duplicate or steal", async () => {
    const ADDR = "123 Main St, Dallas, TX 75201";

    const first = await callOnboard(101, ADDR);
    expect(first.claimed).toBe(true);
    expect(first.heldByMe).toBe(true);
    expect(String(first.originatorUserId)).toBe("101");
    expect(docTable.length).toBe(1);

    // Same Scout re-onboards same address → no new row, no steal.
    const again = await callOnboard(101, ADDR);
    expect(again.claimed).toBe(false);
    expect(again.heldByMe).toBe(true);
    expect(docTable.length).toBe(1);

    // DIFFERENT Scout onboards same address → must NOT steal; origination stays with 101.
    const other = await callOnboard(202, ADDR);
    expect(other.claimed).toBe(false);
    expect(other.heldByMe).toBe(false);
    expect(String(other.originatorUserId)).toBe("101");
    expect(docTable.length).toBe(1);
  });

  it("normalizes address so case/whitespace variants map to the same claim", async () => {
    await callOnboard(101, "456 Oak Ave, Plano, TX");
    const variant = await callOnboard(202, "  456   OAK ave,   plano, tx  ");
    expect(variant.claimed).toBe(false);
    expect(String(variant.originatorUserId)).toBe("101");
    expect(docTable.length).toBe(1);
  });
});
