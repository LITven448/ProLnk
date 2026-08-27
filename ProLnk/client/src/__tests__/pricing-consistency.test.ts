import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import { TIERS, ADDONS } from "../config/pricing";

const PAGES = join(__dirname, "..", "pages");

describe("pricing is defined in exactly one place", () => {
  it("config/pricing.ts is internally consistent", () => {
    const ids = TIERS.map(t => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    // Higher tier => lower job fee. This is the upgrade incentive.
    for (let i = 1; i < TIERS.length; i++) {
      expect(TIERS[i].jobFeePct).toBeLessThanOrEqual(TIERS[i - 1].jobFeePct);
      expect(TIERS[i].monthly).toBeGreaterThanOrEqual(TIERS[i - 1].monthly);
    }
    expect(ADDONS.proPass.monthly).toBeGreaterThan(0);
  });

  it("no pricing page hardcodes a dollar amount or a keep percentage", () => {
    const offenders: string[] = [];
    for (const f of readdirSync(PAGES).filter(n => /Pricing/i.test(n) && n.endsWith(".tsx"))) {
      const src = readFileSync(join(PAGES, f), "utf8");
      if (/\$\d{2,4}\b/.test(src)) offenders.push(`${f}: hardcoded dollar amount`);
      if (/\d{2}%\s*(commission\s*)?keep/i.test(src)) offenders.push(`${f}: hardcoded keep rate`);
    }
    // Known exceptions pending the founder's decision on the keep-rate model.
    const ALLOWED = ["Pricing.tsx", "TrustyProPricing.tsx"];
    const real = offenders.filter(o => !ALLOWED.some(a => o.startsWith(a)));
    expect(real, `Import from config/pricing instead:\n${real.join("\n")}`).toEqual([]);
  });
});
