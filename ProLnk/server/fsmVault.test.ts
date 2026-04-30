import { describe, it, expect, vi, beforeEach } from "vitest";

// ─── Mock the DB layer ─────────────────────────────────────────────────────────
vi.mock("./db", () => ({
  getDb: vi.fn().mockResolvedValue({
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockResolvedValue([]),
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockResolvedValue(undefined),
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    execute: vi.fn().mockResolvedValue([{ insertId: 1 }]),
  }),
}));

vi.mock("./db", () => ({
  getDb: vi.fn(),
  getPartnerByUserId: vi.fn(),
}));

// ─── Unit tests for address normalization helper ───────────────────────────────
describe("FSM Vault — address normalization", () => {
  function normalizeAddress(addr: string): string {
    return addr
      .toLowerCase()
      .replace(/\s+/g, " ")
      .replace(/\bstreet\b/g, "st")
      .replace(/\bavenue\b/g, "ave")
      .replace(/\bdrive\b/g, "dr")
      .replace(/\bboulevard\b/g, "blvd")
      .replace(/\broad\b/g, "rd")
      .replace(/\blane\b/g, "ln")
      .replace(/\bcourt\b/g, "ct")
      .replace(/[^a-z0-9 ]/g, "")
      .trim();
  }

  it("normalizes 'Street' to 'st'", () => {
    expect(normalizeAddress("123 Main Street")).toBe("123 main st");
  });

  it("normalizes 'Avenue' to 'ave'", () => {
    expect(normalizeAddress("456 Oak Avenue")).toBe("456 oak ave");
  });

  it("normalizes 'Boulevard' to 'blvd'", () => {
    expect(normalizeAddress("789 Sunset Boulevard")).toBe("789 sunset blvd");
  });

  it("strips punctuation and normalizes whitespace", () => {
    expect(normalizeAddress("  100  Elm  Drive,  ")).toBe("100 elm dr");
  });

  it("handles already-abbreviated addresses", () => {
    expect(normalizeAddress("100 Elm Dr")).toBe("100 elm dr");
  });

  it("matches equivalent addresses", () => {
    const a = normalizeAddress("123 Main Street Dallas TX");
    const b = normalizeAddress("123 Main St Dallas TX");
    expect(a).toBe(b);
  });
});

// ─── Trade category to system component mapping ────────────────────────────────
describe("FSM Vault — trade category mapping", () => {
  function tradeCategoryToComponent(category: string | null | undefined): string {
    const map: Record<string, string> = {
      hvac: "hvac",
      plumbing: "plumbing",
      electrical: "electrical_panel",
      roofing: "roof",
      landscaping: "fence",
      cleaning: "other",
      pest_control: "other",
      pool: "pool",
      solar: "solar_panels",
      appliance: "appliances",
      painting: "siding",
      flooring: "other",
      general: "other",
    };
    return map[category?.toLowerCase() ?? ""] ?? "other";
  }

  it("maps hvac to hvac", () => {
    expect(tradeCategoryToComponent("hvac")).toBe("hvac");
  });

  it("maps roofing to roof", () => {
    expect(tradeCategoryToComponent("roofing")).toBe("roof");
  });

  it("maps unknown categories to other", () => {
    expect(tradeCategoryToComponent("unknown_trade")).toBe("other");
  });

  it("handles null/undefined gracefully", () => {
    expect(tradeCategoryToComponent(null)).toBe("other");
    expect(tradeCategoryToComponent(undefined)).toBe("other");
  });

  it("is case-insensitive", () => {
    expect(tradeCategoryToComponent("HVAC")).toBe("hvac");
    expect(tradeCategoryToComponent("Roofing")).toBe("roof");
  });
});

// ─── Consent decision logic ────────────────────────────────────────────────────
describe("FSM Vault — consent decision validation", () => {
  type Decision = "accepted" | "declined";

  function validateDecisions(decisions: { recordId: number; decision: Decision }[]): boolean {
    if (!decisions.length) return false;
    return decisions.every(
      (d) => typeof d.recordId === "number" && (d.decision === "accepted" || d.decision === "declined")
    );
  }

  it("accepts valid decision arrays", () => {
    expect(validateDecisions([
      { recordId: 1, decision: "accepted" },
      { recordId: 2, decision: "declined" },
    ])).toBe(true);
  });

  it("rejects empty decision arrays", () => {
    expect(validateDecisions([])).toBe(false);
  });

  it("rejects invalid decision values", () => {
    expect(validateDecisions([
      { recordId: 1, decision: "maybe" as Decision },
    ])).toBe(false);
  });

  it("counts accepted vs declined correctly", () => {
    const decisions = [
      { recordId: 1, decision: "accepted" as Decision },
      { recordId: 2, decision: "accepted" as Decision },
      { recordId: 3, decision: "declined" as Decision },
    ];
    const accepted = decisions.filter((d) => d.decision === "accepted").length;
    const declined = decisions.filter((d) => d.decision === "declined").length;
    expect(accepted).toBe(2);
    expect(declined).toBe(1);
  });
});
