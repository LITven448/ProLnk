/**
 * Tests for Exchange backend and Homeowner Favorites (Wave 75 sprint)
 * Covers: exchange job schema validation, bid schema, favorites schema
 */
import { describe, it, expect } from "vitest";
import { z } from "zod";

// ── Exchange Job Schema ───────────────────────────────────────────────────────

const createExchangeJobSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1),
  category: z.string().min(1),
  budget: z.number().positive().optional(),
  zipCode: z.string().min(5).max(10),
  urgency: z.enum(["flexible", "within_week", "within_month", "emergency"]),
  isCommercial: z.boolean().optional(),
});

const placeBidSchema = z.object({
  jobId: z.number().int().positive(),
  amount: z.number().positive(),
  message: z.string().min(1),
  estimatedDays: z.number().int().positive().optional(),
});

// ── Favorites Schema ──────────────────────────────────────────────────────────

const saveFavoriteSchema = z.object({
  partnerId: z.number().int().positive(),
  notes: z.string().optional(),
});

// ── Exchange Tests ────────────────────────────────────────────────────────────

describe("Exchange Job Schema Validation", () => {
  it("accepts valid job posting", () => {
    const result = createExchangeJobSchema.safeParse({
      title: "Roof inspection needed",
      description: "Need a licensed roofer to inspect after recent hail storm",
      category: "Roofing",
      budget: 500,
      zipCode: "75201",
      urgency: "within_week",
      isCommercial: false,
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty title", () => {
    const result = createExchangeJobSchema.safeParse({
      title: "",
      description: "Some description",
      category: "Roofing",
      zipCode: "75201",
      urgency: "flexible",
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative budget", () => {
    const result = createExchangeJobSchema.safeParse({
      title: "Test job",
      description: "Description",
      category: "HVAC",
      budget: -100,
      zipCode: "75201",
      urgency: "flexible",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid urgency value", () => {
    const result = createExchangeJobSchema.safeParse({
      title: "Test job",
      description: "Description",
      category: "Plumbing",
      zipCode: "75201",
      urgency: "asap",
    });
    expect(result.success).toBe(false);
  });

  it("accepts all valid urgency levels", () => {
    const urgencies = ["flexible", "within_week", "within_month", "emergency"] as const;
    urgencies.forEach(urgency => {
      const result = createExchangeJobSchema.safeParse({
        title: "Test",
        description: "Test description",
        category: "General",
        zipCode: "75201",
        urgency,
      });
      expect(result.success).toBe(true);
    });
  });
});

describe("Exchange Bid Schema Validation", () => {
  it("accepts valid bid", () => {
    const result = placeBidSchema.safeParse({
      jobId: 1,
      amount: 450,
      message: "I can complete this job within 3 days",
      estimatedDays: 3,
    });
    expect(result.success).toBe(true);
  });

  it("rejects zero bid amount", () => {
    const result = placeBidSchema.safeParse({
      jobId: 1,
      amount: 0,
      message: "Free job offer",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty message", () => {
    const result = placeBidSchema.safeParse({
      jobId: 1,
      amount: 200,
      message: "",
    });
    expect(result.success).toBe(false);
  });
});

// ── Favorites Tests ───────────────────────────────────────────────────────────

describe("Homeowner Favorites Schema Validation", () => {
  it("accepts valid favorite with notes", () => {
    const result = saveFavoriteSchema.safeParse({
      partnerId: 42,
      notes: "Great plumber, very responsive",
    });
    expect(result.success).toBe(true);
  });

  it("accepts favorite without notes", () => {
    const result = saveFavoriteSchema.safeParse({
      partnerId: 7,
    });
    expect(result.success).toBe(true);
  });

  it("rejects non-integer partnerId", () => {
    const result = saveFavoriteSchema.safeParse({
      partnerId: 1.5,
    });
    expect(result.success).toBe(false);
  });

  it("rejects negative partnerId", () => {
    const result = saveFavoriteSchema.safeParse({
      partnerId: -1,
    });
    expect(result.success).toBe(false);
  });
});
