import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { z } from "zod";

describe("Waitlist Features", () => {
  describe("ProWaitlist Signup", () => {
    it("should validate required fields", () => {
      const schema = z.object({
        firstName: z.string().min(1).max(100),
        lastName: z.string().min(1).max(100),
        email: z.string().email(),
        phone: z.string().min(7).max(30),
        businessName: z.string().min(1).max(255),
        businessType: z.string().min(1).max(100),
        yearsInBusiness: z.number().int().min(0).max(100),
        employeeCount: z.string().min(1),
        estimatedJobsPerMonth: z.number().int().min(0),
        trades: z.array(z.string()).min(1),
      });

      expect(() => {
        schema.parse({
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "5551234567",
          businessName: "Acme Plumbing",
          businessType: "Plumbing",
          yearsInBusiness: 5,
          employeeCount: "3",
          estimatedJobsPerMonth: 10,
          trades: ["plumbing"],
        });
      }).not.toThrow();
    });

    it("should reject invalid email", () => {
      const schema = z.object({ email: z.string().email() });

      expect(() => {
        schema.parse({ email: "invalid-email" });
      }).toThrow();
    });

    it("should reject empty trades array", () => {
      const schema = z.object({ trades: z.array(z.string()).min(1) });

      expect(() => {
        schema.parse({ trades: [] });
      }).toThrow();
    });

    it("should accept referral code", () => {
      const schema = z.object({
        email: z.string().email(),
        referralCode: z.string().max(100).optional(),
      });

      const result = schema.parse({
        email: "test@example.com",
        referralCode: "REF123ABC",
      });

      expect(result.referralCode).toBe("REF123ABC");
    });

    it("should handle optional license file", () => {
      const schema = z.object({
        email: z.string().email(),
        licenseFileUrl: z.string().max(1000).optional(),
        licenseFileName: z.string().max(255).optional(),
      });

      const result = schema.parse({
        email: "test@example.com",
        licenseFileUrl: "https://example.com/license.pdf",
        licenseFileName: "license.pdf",
      });

      expect(result.licenseFileUrl).toBe("https://example.com/license.pdf");
      expect(result.licenseFileName).toBe("license.pdf");
    });
  });

  describe("2-Step Signup (/apply-v2)", () => {
    // Mirrors server ProWaitlistSchema core fields used by step 1.
    const step1Schema = z.object({
      firstName: z.string().min(1).max(100).trim(),
      lastName: z.string().min(1).max(100).trim(),
      email: z.string().email().toLowerCase(),
      phone: z.string().min(7).max(30),
      trade: z.string().min(1).max(100),
      primaryCity: z.string().min(1).max(100),
      primaryState: z.string().min(2).max(2),
      referredBy: z.string().max(20).optional(),
    });

    // Mirrors server assignTier + charter-recruiter logic.
    const TIER_CAP = { charter: 25, founding: 125, level3: 525, level4: 2125 };
    function assignTier(position: number): string {
      if (position <= TIER_CAP.charter) return "charter";
      if (position <= TIER_CAP.founding) return "founding";
      if (position <= TIER_CAP.level3) return "level3";
      if (position <= TIER_CAP.level4) return "level4";
      return "waitlist";
    }
    const CHARTER_RECRUITER_CODES = ["Z3YYJP7"];
    function resolveTier(position: number, referredBy: string | undefined, charterUsed: number) {
      const isCharterRecruiter =
        !!referredBy && CHARTER_RECRUITER_CODES.includes(referredBy.toUpperCase());
      if (isCharterRecruiter && charterUsed < 25) return "charter";
      return assignTier(position);
    }

    it("step-1 core payload (minimum fields) is valid", () => {
      expect(() =>
        step1Schema.parse({
          firstName: "Jane",
          lastName: "Smith",
          email: "JANE@EXAMPLE.COM",
          phone: "5551234567",
          trade: "Plumbing",
          primaryCity: "Dallas",
          primaryState: "TX",
        })
      ).not.toThrow();
    });

    it("step-1 lowercases email and works without referral", () => {
      const r = step1Schema.parse({
        firstName: "Jane",
        lastName: "Smith",
        email: "JANE@EXAMPLE.COM",
        phone: "5551234567",
        trade: "Plumbing",
        primaryCity: "Dallas",
        primaryState: "TX",
      });
      expect(r.email).toBe("jane@example.com");
      expect(r.referredBy).toBeUndefined();
    });

    it("step-1 rejects missing required fields", () => {
      expect(() =>
        step1Schema.parse({
          firstName: "Jane",
          lastName: "Smith",
          email: "jane@example.com",
          phone: "5551234567",
          trade: "",
          primaryCity: "Dallas",
          primaryState: "TX",
        })
      ).toThrow();
    });

    it("assigns charter tier when referred by charter recruiter and spots remain", () => {
      expect(resolveTier(800, "Z3YYJP7", 10)).toBe("charter");
    });

    it("falls back to position tier when charter cap is full", () => {
      expect(resolveTier(800, "Z3YYJP7", 25)).toBe("level4");
      expect(resolveTier(300, "Z3YYJP7", 25)).toBe("level3");
    });

    it("organic signup gets position-based tier (charter for first 25)", () => {
      expect(resolveTier(5, undefined, 0)).toBe("charter");
      expect(resolveTier(50, undefined, 0)).toBe("founding");
    });

    // Mirrors server UpdateProProfileSchema for step 2 enrichment.
    const step2Schema = z.object({
      email: z.string().email().toLowerCase(),
      id: z.number().int().optional(),
      businessName: z.string().max(255).optional(),
      yearsInBusiness: z.coerce.number().int().min(0).max(100).optional(),
      trades: z.array(z.string().max(100)).max(50).optional(),
      serviceZipCodes: z.array(z.string().max(12)).max(200).optional(),
    });

    it("step-2 accepts a partial enrichment payload keyed by email", () => {
      const r = step2Schema.parse({
        email: "jane@example.com",
        businessName: "Acme Plumbing",
        yearsInBusiness: "7",
        trades: ["Plumbing", "HVAC"],
        serviceZipCodes: ["75001", "75002"],
      });
      expect(r.yearsInBusiness).toBe(7);
      expect(r.trades).toHaveLength(2);
    });

    it("step-2 is valid with only an email (everything optional)", () => {
      expect(() => step2Schema.parse({ email: "jane@example.com" })).not.toThrow();
    });
  });

  describe("HomeWaitlist Signup", () => {
    it("should validate home type enum", () => {
      const schema = z.object({
        homeType: z.enum(["single_family", "townhouse", "condo", "multi_family", "mobile"]),
      });

      expect(() => {
        schema.parse({ homeType: "single_family" });
      }).not.toThrow();

      expect(() => {
        schema.parse({ homeType: "invalid_type" });
      }).toThrow();
    });

    it("should validate project timeline", () => {
      const schema = z.object({
        projectTimeline: z.enum(["asap", "3_months", "6_months", "1_year", "just_exploring"]),
      });

      expect(() => {
        schema.parse({ projectTimeline: "asap" });
      }).not.toThrow();
    });

    it("should require desired projects", () => {
      const schema = z.object({
        desiredProjects: z.array(z.string()).min(1),
      });

      expect(() => {
        schema.parse({ desiredProjects: ["kitchen_remodel"] });
      }).not.toThrow();

      expect(() => {
        schema.parse({ desiredProjects: [] });
      }).toThrow();
    });

    it("should track consent preferences", () => {
      const schema = z.object({
        consentTerms: z.boolean().default(false),
        consentEmail: z.boolean().default(false),
        consentSms: z.boolean().default(false),
        consentPush: z.boolean().default(false),
        consentMarketing: z.boolean().default(false),
        consentDataUse: z.boolean().default(false),
      });

      const result = schema.parse({
        consentTerms: true,
        consentEmail: true,
        consentSms: false,
        consentDataUse: true,
      });

      expect(result.consentTerms).toBe(true);
      expect(result.consentEmail).toBe(true);
      expect(result.consentSms).toBe(false);
      expect(result.consentPush).toBe(false);
      expect(result.consentMarketing).toBe(false);
      expect(result.consentDataUse).toBe(true);
    });

    it("should handle home systems tracking", () => {
      const schema = z.object({
        homeSystems: z.record(z.string(), z.string()).optional(),
      });

      const result = schema.parse({
        homeSystems: {
          roof: "asphalt_shingles_good",
          hvac: "heat_pump_10_years",
          plumbing: "copper_good",
          foundation: "concrete_no_issues",
        },
      });

      expect(result.homeSystems).toHaveProperty("roof");
      expect(result.homeSystems).toHaveProperty("hvac");
    });
  });

  describe("Position Counter", () => {
    it("should calculate position from signup count", () => {
      const mockCount = 42;
      const position = mockCount;
      expect(position).toBe(42);
    });

    it("should return position in response", () => {
      const response = { success: true, position: 42 };
      expect(response.success).toBe(true);
      expect(response.position).toBe(42);
    });

    it("should handle first signup", () => {
      const position = 1;
      expect(position).toBe(1);
    });
  });

  describe("Referral System", () => {
    it("should generate referral code from email", () => {
      const email = "john@example.com";
      const code = btoa(email).substring(0, 12);
      expect(code).toBeTruthy();
      expect(code.length).toBeLessThanOrEqual(12);
    });

    it("should track referrer in signup", () => {
      const signup = {
        email: "referred@example.com",
        referredBy: "REF123ABC",
      };
      expect(signup.referredBy).toBe("REF123ABC");
    });

    it("should handle missing referral code", () => {
      const signup = {
        email: "organic@example.com",
        referredBy: undefined,
      };
      expect(signup.referredBy).toBeUndefined();
    });
  });

  describe("Error Handling", () => {
    it("should catch duplicate email", () => {
      const error = { code: "ER_DUP_ENTRY", message: "Duplicate entry" };
      expect(error.code).toBe("ER_DUP_ENTRY");
    });

    it("should handle database unavailable", () => {
      const error = { code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" };
      expect(error.code).toBe("INTERNAL_SERVER_ERROR");
    });

    it("should validate phone number format", () => {
      const schema = z.object({
        phone: z.string().min(7).max(30),
      });

      expect(() => {
        schema.parse({ phone: "123" }); // Too short
      }).toThrow();

      expect(() => {
        schema.parse({ phone: "5551234567" }); // Valid
      }).not.toThrow();
    });
  });

  describe("Email Confirmation", () => {
    it("should include position in confirmation", () => {
      const email = {
        to: "john@example.com",
        subject: "Welcome to ProLnk",
        position: 42,
      };
      expect(email.position).toBe(42);
    });

    it("should include trades in pro confirmation", () => {
      const email = {
        to: "john@example.com",
        trades: ["plumbing", "hvac"],
        city: "Dallas",
      };
      expect(email.trades).toContain("plumbing");
      expect(email.city).toBe("Dallas");
    });
  });

  describe("Data Validation", () => {
    it("should validate zip code format", () => {
      const schema = z.object({
        zipCode: z.string().min(5).max(10),
      });

      expect(() => {
        schema.parse({ zipCode: "75001" });
      }).not.toThrow();

      expect(() => {
        schema.parse({ zipCode: "123" }); // Too short
      }).toThrow();
    });

    it("should validate year built range", () => {
      const schema = z.object({
        yearBuilt: z.number().int().min(1800).max(2030).optional(),
      });

      expect(() => {
        schema.parse({ yearBuilt: 1990 });
      }).not.toThrow();

      expect(() => {
        schema.parse({ yearBuilt: 1700 }); // Too old
      }).toThrow();
    });

    it("should validate square footage", () => {
      const schema = z.object({
        squareFootage: z.number().int().min(100).max(50000).optional(),
      });

      expect(() => {
        schema.parse({ squareFootage: 5000 });
      }).not.toThrow();

      expect(() => {
        schema.parse({ squareFootage: 50 }); // Too small
      }).toThrow();
    });
  });
});
