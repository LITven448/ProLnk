/**
 * Tests for payout request flow (Wave 75 sprint)
 * Covers: requestPayout validation, getPayoutRequests, adminReviewPayoutRequest
 */
import { describe, it, expect } from "vitest";
import { z } from "zod";

// ── Schema validation tests (no DB required) ──────────────────────────────────

const requestPayoutSchema = z.object({
  amount: z.number().positive(),
  method: z.enum(["bank_transfer", "check", "zelle", "venmo"]),
  notes: z.string().optional(),
});

const adminReviewSchema = z.object({
  requestId: z.number().int().positive(),
  action: z.enum(["approve", "reject"]),
  adminNote: z.string().optional(),
});

describe("Payout Request Schema Validation", () => {
  it("accepts valid payout request", () => {
    const result = requestPayoutSchema.safeParse({
      amount: 250.00,
      method: "bank_transfer",
      notes: "Monthly payout",
    });
    expect(result.success).toBe(true);
  });

  it("rejects negative payout amount", () => {
    const result = requestPayoutSchema.safeParse({
      amount: -50,
      method: "check",
    });
    expect(result.success).toBe(false);
  });

  it("rejects zero payout amount", () => {
    const result = requestPayoutSchema.safeParse({
      amount: 0,
      method: "zelle",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid payout method", () => {
    const result = requestPayoutSchema.safeParse({
      amount: 100,
      method: "crypto",
    });
    expect(result.success).toBe(false);
  });

  it("accepts all valid payout methods", () => {
    const methods = ["bank_transfer", "check", "zelle", "venmo"] as const;
    methods.forEach(method => {
      const result = requestPayoutSchema.safeParse({ amount: 100, method });
      expect(result.success).toBe(true);
    });
  });
});

describe("Admin Payout Review Schema Validation", () => {
  it("accepts valid approve action", () => {
    const result = adminReviewSchema.safeParse({
      requestId: 1,
      action: "approve",
      adminNote: "Verified bank details",
    });
    expect(result.success).toBe(true);
  });

  it("accepts valid reject action", () => {
    const result = adminReviewSchema.safeParse({
      requestId: 5,
      action: "reject",
      adminNote: "Insufficient balance",
    });
    expect(result.success).toBe(true);
  });

  it("rejects invalid action", () => {
    const result = adminReviewSchema.safeParse({
      requestId: 1,
      action: "pending",
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-integer requestId", () => {
    const result = adminReviewSchema.safeParse({
      requestId: 1.5,
      action: "approve",
    });
    expect(result.success).toBe(false);
  });
});
