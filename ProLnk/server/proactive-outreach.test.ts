/**
 * Proactive Outreach Engine test — the signature moat, proven at the function level.
 *
 * Mocks the DB (stateful in-memory `proactiveOutreach` + `opportunities`), the email
 * sender, and the image renderer. Covers:
 *   1. actionable findings → outreach payload built + email fired + tracking row written
 *   2. repeat call with same finding → no re-send (deduped by fingerprint)
 *   3. no actionable findings → clean baseline recorded, NO email (no spam)
 *   4. acceptProactiveQuote → creates a 'proactive' opportunity the matching system picks up
 *   5. no homeowner email → outreach still records, just doesn't send
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Detection } from "./photo-intelligence";

// ── In-memory stores ────────────────────────────────────────────────────────
interface Row { [k: string]: unknown }
const stores = {
  proactiveOutreach: [] as Row[],
  opportunities: [] as Row[],
};
let nextOppId = 500;

// ── Email mock ────────────────────────────────────────────────────────────────
const sentEmails: Array<Record<string, unknown>> = [];
vi.mock("./email", () => ({
  sendProactiveOpportunityNotification: vi.fn(async (opts: Record<string, unknown>) => {
    sentEmails.push(opts);
    return true;
  }),
}));

// ── Image renderer mock (so rendering never hits the network) ──────────────────
vi.mock("./_core/imageGeneration", () => ({
  generateImage: vi.fn(async () => ({ url: "https://cdn.test/render.png" })),
}));

// ── Matching infra mock (acceptProactiveQuote calls ensureJobOffersInfra) ──────
vi.mock("./routers/matching", () => ({
  ensureJobOffersInfra: vi.fn(async () => {}),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(async () => {}),
}));

// ── Raw-SQL aware DB mock ───────────────────────────────────────────────────────
function makeDb() {
  return {
    async execute(sqlText: string, params?: unknown[]) {
      const text = String(sqlText).replace(/\s+/g, " ").trim();
      const p = params ?? [];

      if (/^CREATE TABLE/i.test(text)) return [[]];

      // SELECT id FROM proactiveOutreach WHERE findingFingerprint = ? (dedup read)
      if (/SELECT id FROM proactiveOutreach WHERE findingFingerprint/i.test(text)) {
        const fp = p[0];
        const found = stores.proactiveOutreach.filter((r) => r.findingFingerprint === fp);
        return [found.map((r) => ({ id: r.id }))];
      }

      // SELECT ... FROM proactiveOutreach WHERE findingFingerprint = ? (accept read)
      if (/FROM proactiveOutreach WHERE findingFingerprint/i.test(text)) {
        const fp = p[0];
        const found = stores.proactiveOutreach.filter((r) => r.findingFingerprint === fp);
        return [found];
      }

      // INSERT IGNORE INTO proactiveOutreach (baseline)
      if (/INSERT IGNORE INTO proactiveOutreach/i.test(text) && /'baseline_clean'/i.test(text)) {
        const fp = p[1];
        if (!stores.proactiveOutreach.some((r) => r.findingFingerprint === fp)) {
          stores.proactiveOutreach.push({
            id: stores.proactiveOutreach.length + 1,
            sessionId: p[0], findingFingerprint: fp, outcome: "baseline_clean",
            propertyAddress: p[2], homeownerEmail: p[3], homeownerName: p[4], emailSent: 0,
          });
        }
        return [{ insertId: 0 }];
      }

      // INSERT IGNORE INTO proactiveOutreach (sent marker)
      if (/INSERT IGNORE INTO proactiveOutreach/i.test(text) && /'sent'/i.test(text)) {
        const fp = p[1];
        if (!stores.proactiveOutreach.some((r) => r.findingFingerprint === fp)) {
          stores.proactiveOutreach.push({
            id: stores.proactiveOutreach.length + 1,
            sessionId: p[0], findingFingerprint: fp, outcome: "sent",
            trade: p[2], severity: p[3], category: p[4], estimatedCostRange: p[5],
            propertyAddress: p[6], homeownerEmail: p[7], homeownerName: p[8],
            renderingUrl: p[9], beforePhotoUrl: p[10], payload: p[11], emailSent: 0,
            opportunityId: null,
          });
        }
        return [{ insertId: 0 }];
      }

      // UPDATE proactiveOutreach SET emailSent = 1 ...
      if (/UPDATE proactiveOutreach SET emailSent = 1/i.test(text)) {
        const fp = p[0];
        for (const r of stores.proactiveOutreach) if (r.findingFingerprint === fp) r.emailSent = 1;
        return [[]];
      }

      // UPDATE proactiveOutreach SET opportunityId = ? ... (accept)
      if (/UPDATE proactiveOutreach SET opportunityId/i.test(text)) {
        const oppId = p[0]; const fp = p[1];
        for (const r of stores.proactiveOutreach) if (r.findingFingerprint === fp) {
          r.opportunityId = oppId; r.outcome = "accepted"; r.acceptedAt = new Date();
        }
        return [[]];
      }

      // INSERT INTO opportunities ... (accept conversion)
      if (/INSERT INTO opportunities/i.test(text)) {
        const id = nextOppId++;
        stores.opportunities.push({
          id,
          intakeSource: "proactive",
          opportunityType: p[0], opportunityCategory: p[1], description: p[2],
          jobAddress: p[3], estimatedJobValue: p[4],
          homeownerName: p[5], homeownerEmail: p[6],
          status: "new", adminReviewStatus: "pending_review",
        });
        return [{ insertId: id }];
      }

      return [[]];
    },
    // drizzle select() — only used by loadSessionFindings, which we bypass by
    // passing photoFindings directly, so a permissive stub is fine.
    select() {
      const builder: Record<string, unknown> = {
        from() { return builder; },
        where() { return builder; },
        async limit() { return []; },
        then(resolve: (rows: Row[]) => void) { resolve([]); },
      };
      return builder;
    },
  };
}

let dbMock = makeDb();
vi.mock("./db", () => ({ getDb: vi.fn(async () => dbMock) }));

// Imported AFTER mocks.
import {
  processAnalyzedPhotos,
  acceptProactiveQuote,
  isActionableFinding,
  pickPrimaryFinding,
} from "./proactive-outreach";

function det(overrides: Partial<Detection>): Detection {
  return {
    category: "roof_damage",
    severity: "high",
    description: "Visible missing shingles on the south-facing roof slope.",
    trade: "Roofing",
    estimatedJobValue: "$2,000-$6,000",
    confidence: 0.9,
    ...overrides,
  };
}

beforeEach(() => {
  stores.proactiveOutreach = [];
  stores.opportunities = [];
  nextOppId = 500;
  sentEmails.length = 0;
  dbMock = makeDb();
  delete process.env.OPENAI_API_KEY;
});

describe("actionability filter", () => {
  it("treats medium/high/urgent with confidence as actionable, low as noise", () => {
    expect(isActionableFinding(det({ severity: "high" }))).toBe(true);
    expect(isActionableFinding(det({ severity: "medium" }))).toBe(true);
    expect(isActionableFinding(det({ severity: "urgent" }))).toBe(true);
    expect(isActionableFinding(det({ severity: "low" }))).toBe(false);
    expect(isActionableFinding(det({ severity: "high", confidence: 0.2 }))).toBe(false);
  });

  it("picks the highest-severity actionable finding", () => {
    const primary = pickPrimaryFinding([
      det({ category: "faded_paint", severity: "low" }),
      det({ category: "old_electrical_panel", severity: "medium", trade: "Electrical" }),
      det({ category: "structural_concerns", severity: "urgent", trade: "Structural" }),
    ]);
    expect(primary?.category).toBe("structural_concerns");
  });
});

describe("processAnalyzedPhotos — actionable findings", () => {
  it("builds an outreach payload, fires the email, and writes a tracking row", async () => {
    const res = await processAnalyzedPhotos({
      sessionId: 1,
      photoFindings: [det({})],
      propertyAddress: "123 Main St, Dallas TX",
      homeownerEmail: "home@owner.com",
      homeownerName: "Jane Doe",
      skipRendering: true,
    });

    expect(res.outreach).toBe(true);
    expect(res.fingerprint).toBeTruthy();
    expect(res.payload?.trade).toBe("Roofing");
    expect(res.payload?.estimatedCostRange).toBe("$2,000-$6,000");
    expect(res.emailSent).toBe(true);

    expect(sentEmails).toHaveLength(1);
    expect(sentEmails[0].homeownerEmail).toBe("home@owner.com");
    expect(String(sentEmails[0].acceptUrl)).toContain(res.fingerprint);

    const row = stores.proactiveOutreach[0];
    expect(row.outcome).toBe("sent");
    expect(row.emailSent).toBe(1);
  });

  it("does NOT re-send the same finding on a repeat trigger", async () => {
    const opts = {
      sessionId: 1,
      photoFindings: [det({})],
      propertyAddress: "123 Main St",
      homeownerEmail: "home@owner.com",
      skipRendering: true,
    };
    const first = await processAnalyzedPhotos(opts);
    expect(first.outreach).toBe(true);

    const second = await processAnalyzedPhotos(opts);
    expect(second.outreach).toBe(false);
    expect(second.reason).toBe("already_sent");
    expect(sentEmails).toHaveLength(1); // still just the one email
  });

  it("records the outreach even with no homeowner email, but sends nothing", async () => {
    const res = await processAnalyzedPhotos({
      sessionId: 2,
      photoFindings: [det({})],
      propertyAddress: "456 Oak Ave",
      skipRendering: true,
    });
    expect(res.outreach).toBe(true);
    expect(res.emailSent).toBe(false);
    expect(sentEmails).toHaveLength(0);
    expect(stores.proactiveOutreach[0].outcome).toBe("sent");
  });
});

describe("processAnalyzedPhotos — nothing found", () => {
  it("records a clean baseline and sends no email (no spam)", async () => {
    const res = await processAnalyzedPhotos({
      sessionId: 3,
      photoFindings: [det({ severity: "low", category: "faded_paint" })],
      propertyAddress: "789 Pine Rd",
      homeownerEmail: "clean@home.com",
      skipRendering: true,
    });
    expect(res.outreach).toBe(false);
    expect(res.reason).toBe("no_actionable_findings");
    expect(sentEmails).toHaveLength(0);
    expect(stores.proactiveOutreach).toHaveLength(1);
    expect(stores.proactiveOutreach[0].outcome).toBe("baseline_clean");
  });

  it("handles an empty findings array gracefully", async () => {
    const res = await processAnalyzedPhotos({ sessionId: 4, photoFindings: [], skipRendering: true });
    expect(res.outreach).toBe(false);
    expect(res.reason).toBe("no_actionable_findings");
  });
});

describe("acceptProactiveQuote — the conversion", () => {
  it("creates a 'proactive' opportunity the matching system would pick up", async () => {
    const out = await processAnalyzedPhotos({
      sessionId: 5,
      photoFindings: [det({})],
      propertyAddress: "123 Main St, Dallas TX",
      homeownerEmail: "home@owner.com",
      homeownerName: "Jane Doe",
      skipRendering: true,
    });
    const fp = out.fingerprint!;

    const result = await acceptProactiveQuote(fp);
    expect(result.opportunityId).toBeTruthy();
    expect(result.alreadyAccepted).toBe(false);

    const opp = stores.opportunities.find((o) => o.id === result.opportunityId)!;
    expect(opp).toBeTruthy();
    expect(opp.intakeSource).toBe("proactive");
    expect(opp.opportunityCategory).toBe("Roofing & Gutters");
    expect(opp.status).toBe("new");
    expect(opp.homeownerEmail).toBe("home@owner.com");
    // midpoint of $2,000-$6,000
    expect(Number(opp.estimatedJobValue)).toBe(4000);

    // outreach row now linked to the opportunity
    const row = stores.proactiveOutreach.find((r) => r.findingFingerprint === fp)!;
    expect(row.opportunityId).toBe(result.opportunityId);
    expect(row.outcome).toBe("accepted");
  });

  it("is idempotent — a second accept returns the same opportunity", async () => {
    const out = await processAnalyzedPhotos({
      sessionId: 6,
      photoFindings: [det({})],
      homeownerEmail: "home@owner.com",
      skipRendering: true,
    });
    const fp = out.fingerprint!;
    const first = await acceptProactiveQuote(fp);
    const second = await acceptProactiveQuote(fp);
    expect(second.opportunityId).toBe(first.opportunityId);
    expect(second.alreadyAccepted).toBe(true);
    expect(stores.opportunities).toHaveLength(1);
  });
});
