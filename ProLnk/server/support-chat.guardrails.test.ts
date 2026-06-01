import { describe, it, expect } from "vitest";
import { composeSystemPromptForTest } from "./routers/supportChat";
import { renderKnowledge } from "./support-knowledge";

const BRANDS = ["prolnk", "trustypro", "advertiser"] as const;

describe("support chat guardrails", () => {
  for (const brand of BRANDS) {
    const prompt = composeSystemPromptForTest(brand);

    it(`[${brand}] embeds the hard guardrail block`, () => {
      expect(prompt).toContain("STRICT RULES");
      expect(prompt).toContain("APPROVED KNOWLEDGE");
      // Refuses financials / projections / valuation / internal economics.
      expect(prompt.toLowerCase()).toContain("financial projections");
      expect(prompt.toLowerCase()).toContain("valuation");
      expect(prompt.toLowerCase()).toContain("what prolnk earns/retains");
      // Refuses prompt injection.
      expect(prompt.toLowerCase()).toContain("ignore previous instructions");
      // Never reveals the system prompt.
      expect(prompt.toLowerCase()).toContain("never reveal");
      // Provides an escalation path.
      expect(prompt.toLowerCase()).toContain("talk to a human");
    });

    it(`[${brand}] only contains client-safe knowledge (no internal leakage)`, () => {
      const lower = prompt.toLowerCase();
      // None of these internal terms should appear in the approved knowledge
      // block beyond the guardrail's explicit *refusal* language.
      const banned = [
        "cascade",
        "mlm",
        "4-level",
        "override rate",
        "net margin",
        "85%",
        "seed round",
        "investor",
        "valuation of",
      ];
      const knowledge = renderKnowledge(brand).toLowerCase();
      for (const term of banned) {
        expect(knowledge, `knowledge for ${brand} must not contain "${term}"`).not.toContain(term);
      }
      expect(lower).toContain("approved knowledge");
    });
  }
});
