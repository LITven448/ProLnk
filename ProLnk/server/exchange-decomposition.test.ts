import { describe, expect, it, vi, beforeEach } from "vitest";

const invokeLLM = vi.fn();
vi.mock("./_core/llm", () => ({
  invokeLLM: (...args: any[]) => invokeLLM(...args),
}));

import { decomposeProject } from "./exchange-decomposition";

function llmText(text: string) {
  return { choices: [{ message: { content: text } }] };
}

function sum(components: { estimatedValue: number }[]) {
  return components.reduce((a, c) => a + c.estimatedValue, 0);
}

describe("decomposeProject", () => {
  beforeEach(() => invokeLLM.mockReset());

  it("returns structured components that reconcile to the posted total", async () => {
    invokeLLM.mockResolvedValue(
      llmText(
        JSON.stringify([
          { trade: "Demolition", description: "Tear out", estimatedValue: 5000, sequenceOrder: 1 },
          { trade: "Plumbing", description: "Rough-in", estimatedValue: 15000, sequenceOrder: 2 },
          { trade: "Electrical", description: "Wiring", estimatedValue: 12000, sequenceOrder: 3 },
          { trade: "Drywall", description: "Hang & finish", estimatedValue: 8000, sequenceOrder: 4 },
          { trade: "Finish Carpentry", description: "Trim", estimatedValue: 10000, sequenceOrder: 5 },
        ])
      )
    );

    const res = await decomposeProject({ scope: "Kitchen remodel", totalValue: 90000, propertyZip: "75201" });

    expect(res.decomposed).toBe(true);
    expect(res.components.length).toBe(5);
    expect(sum(res.components)).toBeCloseTo(90000, 2);
    expect(res.components.map((c) => c.sequenceOrder)).toEqual([1, 2, 3, 4, 5]);
    expect(res.components[0].trade).toBe("Demolition");
  });

  it("parses JSON even when wrapped in prose / code fences", async () => {
    invokeLLM.mockResolvedValue(
      llmText(
        'Here is the breakdown:\n```json\n[{"trade":"Roofing","description":"New roof","estimatedValue":20000,"sequenceOrder":1},{"trade":"Painting","description":"Exterior","estimatedValue":5000,"sequenceOrder":2}]\n```\nLet me know!'
      )
    );

    const res = await decomposeProject({ scope: "Roof + paint", totalValue: 30000 });
    expect(res.decomposed).toBe(true);
    expect(res.components.length).toBe(2);
    expect(sum(res.components)).toBeCloseTo(30000, 2);
  });

  it("falls back to a single general contractor component when the LLM returns junk", async () => {
    invokeLLM.mockResolvedValue(llmText("sorry, I cannot help with that"));

    const res = await decomposeProject({ scope: "Whole house", totalValue: 50000 });
    expect(res.decomposed).toBe(false);
    expect(res.components.length).toBe(1);
    expect(res.components[0].trade).toBe("General");
    expect(res.components[0].estimatedValue).toBeCloseTo(50000, 2);
  });

  it("falls back when the LLM returns an empty/unusable result (unavailable)", async () => {
    invokeLLM.mockResolvedValue({ choices: [{ message: { content: "" } }] });

    const res = await decomposeProject({ scope: "Bathroom", totalValue: 12000 });
    expect(res.decomposed).toBe(false);
    expect(res.components.length).toBe(1);
    expect(res.components[0].estimatedValue).toBeCloseTo(12000, 2);
  });

  it("falls back when the LLM client errors mid-call (no API key / unavailable)", async () => {
    // Simulate the client surfacing an error (e.g. assertApiKey) without the test
    // spy itself recording a throw: the result object errors on property access.
    invokeLLM.mockResolvedValue({
      get choices(): never {
        throw new Error("No LLM API key configured");
      },
    });

    const res = await decomposeProject({ scope: "Bathroom", totalValue: 8000 });
    expect(res.decomposed).toBe(false);
    expect(res.components.length).toBe(1);
    expect(res.components[0].estimatedValue).toBeCloseTo(8000, 2);
  });
});
