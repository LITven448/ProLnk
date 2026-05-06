import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@prolnk.io",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("commandCenter", () => {
  const ctx = createAdminContext();
  const caller = appRouter.createCaller(ctx);

  // ── seedAgents ──────────────────────────────────────────────────────
  describe("seedAgents", () => {
    it("seeds all 45 agents into the registry", async () => {
      const result = await caller.commandCenter.seedAgents();
      expect(result).toHaveProperty("seeded");
      expect(result).toHaveProperty("total");
      expect(result.total).toBe(45);
      expect(result.seeded).toBeGreaterThanOrEqual(0);
    });

    it("is idempotent — running again seeds 0 new agents", async () => {
      const result = await caller.commandCenter.seedAgents();
      expect(result.seeded).toBe(0);
      expect(result.total).toBe(45);
    });
  });

  // ── getSystemPulse ──────────────────────────────────────────────────
  describe("getSystemPulse", () => {
    it("returns system pulse with agent counts", async () => {
      const pulse = await caller.commandCenter.getSystemPulse();
      expect(pulse).toHaveProperty("totalAgents");
      expect(pulse).toHaveProperty("activeAgents");
      expect(pulse).toHaveProperty("monthSpendCents");
      expect(pulse).toHaveProperty("monthBudgetCents");
      expect(pulse.totalAgents).toBe(45);
      expect(pulse.activeAgents).toBeGreaterThanOrEqual(0);
    });
  });

  // ── getOrgChart ─────────────────────────────────────────────────────
  describe("getOrgChart", () => {
    it("returns departments and all 45 agents", async () => {
      const result = await caller.commandCenter.getOrgChart();
      expect(result).toHaveProperty("departments");
      expect(result).toHaveProperty("agents");
      expect(Array.isArray(result.departments)).toBe(true);
      expect(Array.isArray(result.agents)).toBe(true);
      expect(result.agents.length).toBe(45);
    });

    it("each agent has required fields", async () => {
      const result = await caller.commandCenter.getOrgChart();
      const first = result.agents[0];
      expect(first).toHaveProperty("agentId");
      expect(first).toHaveProperty("name");
      expect(first).toHaveProperty("department");
      expect(first).toHaveProperty("llmModel");
      expect(first).toHaveProperty("triggerType");
      expect(first).toHaveProperty("status");
    });

    it("includes department heads (parentAgentId is null)", async () => {
      const result = await caller.commandCenter.getOrgChart();
      const heads = result.agents.filter((a: any) => a.parentAgentId === null);
      // 7 department heads + Strategic Advisor = at least 7
      expect(heads.length).toBeGreaterThanOrEqual(7);
    });
  });

  // ── getAgentDetail ──────────────────────────────────────────────────
  describe("getAgentDetail", () => {
    it("returns detail for a valid agent", async () => {
      const detail = await caller.commandCenter.getAgentDetail({ agentId: "ops-ceo" });
      expect(detail).toHaveProperty("agent");
      expect(detail).toHaveProperty("activities");
      expect(detail).toHaveProperty("metrics");
      expect(detail).toHaveProperty("events");
      expect(detail.agent.agentId).toBe("ops-ceo");
      expect(detail.agent.name).toBe("CEO Orchestrator");
    });

    it("throws for an invalid agent ID", async () => {
      await expect(
        caller.commandCenter.getAgentDetail({ agentId: "nonexistent-agent" })
      ).rejects.toThrow();
    });
  });

  // ── getActivityFeed ─────────────────────────────────────────────────
  describe("getActivityFeed", () => {
    it("returns an array of activity entries", async () => {
      const feed = await caller.commandCenter.getActivityFeed({});
      expect(Array.isArray(feed)).toBe(true);
    });
  });

  // ── getFinancials ───────────────────────────────────────────────────
  describe("getFinancials", () => {
    it("returns financial summary with department spend, top spenders, and daily trend", async () => {
      const fin = await caller.commandCenter.getFinancials();
      expect(fin).toHaveProperty("departmentSpend");
      expect(fin).toHaveProperty("topSpenders");
      expect(fin).toHaveProperty("dailyTrend");
      expect(Array.isArray(fin.departmentSpend)).toBe(true);
      expect(Array.isArray(fin.topSpenders)).toBe(true);
      expect(Array.isArray(fin.dailyTrend)).toBe(true);
    });
  });

  // ── getAuditLog ─────────────────────────────────────────────────────
  describe("getAuditLog", () => {
    it("returns an array of Supreme Court audit entries", async () => {
      const log = await caller.commandCenter.getAuditLog({});
      expect(Array.isArray(log)).toBe(true);
    });
  });

  // ── getEventFeed ────────────────────────────────────────────────────
  describe("getEventFeed", () => {
    it("returns an array of event bus entries", async () => {
      const events = await caller.commandCenter.getEventFeed({});
      expect(Array.isArray(events)).toBe(true);
    });
  });

  // ── Event bus helper exports ────────────────────────────────────────
  describe("publishEvent and logAgentActivity helpers", () => {
    it("publishEvent is exported and callable", async () => {
      const { publishEvent } = await import("./routers/commandCenter");
      expect(typeof publishEvent).toBe("function");
      await publishEvent("test.event", "ops-ceo", { test: true }, ["ops-lead-router"]);
      // Verify it appears in the event feed
      const events = await caller.commandCenter.getEventFeed({});
      const testEvent = events.find((e: any) => e.eventType === "test.event");
      expect(testEvent).toBeDefined();
      expect(testEvent.publisherAgentId).toBe("ops-ceo");
    });

    it("logAgentActivity is exported and callable", async () => {
      const { logAgentActivity } = await import("./routers/commandCenter");
      expect(typeof logAgentActivity).toBe("function");
      await logAgentActivity({
        agentId: "ops-ceo",
        action: "Test action from vitest",
        outcome: "success",
        details: "Automated test verification",
        inputTokens: 100,
        outputTokens: 50,
        costCents: 1,
        durationMs: 200,
      });
      const feed = await caller.commandCenter.getActivityFeed({});
      const testActivity = feed.find((a: any) => a.action === "Test action from vitest");
      expect(testActivity).toBeDefined();
    });

    it("logSupremeCourtRuling is exported and callable", async () => {
      const { logSupremeCourtRuling } = await import("./routers/commandCenter");
      expect(typeof logSupremeCourtRuling).toBe("function");
      await logSupremeCourtRuling({
        requestingAgentId: "mkt-content",
        actionAttempted: "Test ruling from vitest",
        category: "content",
        ruling: "approved",
        reason: "Automated test verification",
        confidencePercent: 99,
      });
      const log = await caller.commandCenter.getAuditLog({});
      const testRuling = log.find((r: any) => r.actionAttempted === "Test ruling from vitest");
      expect(testRuling).toBeDefined();
      expect(testRuling.ruling).toBe("approved");
    });
  });
});
