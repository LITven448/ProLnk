/**
 * n8n Integration Tests
 * Validates that the n8n credentials are configured and the triggerN8n
 * function handles both configured and unconfigured states correctly.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("n8n Integration", () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
    vi.restoreAllMocks();
  });

  it("should have N8N_WEBHOOK_BASE_URL configured", () => {
    const baseUrl = process.env.N8N_WEBHOOK_BASE_URL;
    expect(baseUrl).toBeDefined();
    expect(baseUrl).toMatch(/^https?:\/\//);
    expect(baseUrl).toContain("n8n");
  });

  it("should have N8N_WEBHOOK_SECRET configured", () => {
    const secret = process.env.N8N_WEBHOOK_SECRET;
    expect(secret).toBeDefined();
    expect(typeof secret).toBe("string");
    expect((secret as string).length).toBeGreaterThan(8);
  });

  it("should build correct webhook URL from base URL and event type", () => {
    const baseUrl = "https://prolnk.app.n8n.cloud";
    const event = "partner_approved";
    const eventPath = event.replace(/_/g, "-");
    const url = `${baseUrl.replace(/\/$/, "")}/${eventPath}`;
    expect(url).toBe("https://prolnk.app.n8n.cloud/partner-approved");
  });

  it("should silently skip when N8N_WEBHOOK_BASE_URL is not set", async () => {
    delete process.env.N8N_WEBHOOK_BASE_URL;
    const consoleSpy = vi.spyOn(console, "debug").mockImplementation(() => {});
    const { triggerN8n } = await import("./n8n-triggers");
    await expect(triggerN8n("partner_approved", { test: true })).resolves.toBeUndefined();
  });

  it("should not throw when n8n webhook call fails (resilience check)", async () => {
    process.env.N8N_WEBHOOK_BASE_URL = "https://prolnk.app.n8n.cloud";
    const fetchSpy = vi.spyOn(global, "fetch").mockRejectedValue(new Error("Network error"));
    const { triggerN8n } = await import("./n8n-triggers");
    // Should not throw even when fetch fails
    await expect(triggerN8n("partner_approved", { test: true })).resolves.toBeUndefined();
  });
});
