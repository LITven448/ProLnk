import { describe, it, expect } from "vitest";

// Test the data pipeline module's exported functions
describe("data-pipeline", () => {
  it("anonymizeAddress hashes addresses deterministically", async () => {
    const { anonymizeAddress } = await import("./data-pipeline");
    const addr1 = anonymizeAddress("123 Main St, Dallas TX 75201");
    const addr2 = anonymizeAddress("123 Main St, Dallas TX 75201");
    const addr3 = anonymizeAddress("456 Oak Ave, Austin TX 78701");

    // Same input = same output
    expect(addr1).toBe(addr2);
    // Different input = different output
    expect(addr1).not.toBe(addr3);
    // Output should be a hex hash, not the original address
    expect(addr1).not.toContain("Main St");
    expect(addr1.length).toBeGreaterThan(10);
  });

  it("anonymizeAddress handles empty/null inputs gracefully", async () => {
    const { anonymizeAddress } = await import("./data-pipeline");
    const result = anonymizeAddress("");
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  it("extractStructuredData module exports expected functions", async () => {
    const mod = await import("./data-pipeline");
    expect(typeof mod.extractStructuredData).toBe("function");
    expect(typeof mod.storeConditionData).toBe("function");
    expect(typeof mod.anonymizeAddress).toBe("function");
    expect(typeof mod.hasDataConsent).toBe("function");
    expect(typeof mod.getDataAssetStats).toBe("function");
  });
});
