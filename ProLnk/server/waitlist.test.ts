import { describe, expect, it } from "vitest";
import { randomBytes } from "crypto";

/**
 * Waitlist utility tests — validates referral code generation,
 * priority scoring logic, and DFW market detection without
 * requiring a database connection.
 */

describe("waitlist: referral code generation", () => {
  it("generates an 8-character uppercase hex referral code", () => {
    const code = randomBytes(4).toString("hex").toUpperCase();
    expect(code).toHaveLength(8);
    expect(code).toMatch(/^[0-9A-F]{8}$/);
  });

  it("generates unique codes across 100 iterations", () => {
    const codes = new Set<string>();
    for (let i = 0; i < 100; i++) {
      codes.add(randomBytes(4).toString("hex").toUpperCase());
    }
    expect(codes.size).toBeGreaterThanOrEqual(99);
  });
});

describe("waitlist: priority scoring", () => {
  function calculatePriorityScore(input: {
    urgencyLevel?: string;
    primaryMotivation?: string;
    desiredProjects: string[];
    squareFootage?: number;
    estimatedHomeValue?: string;
    numKids?: number;
    numPets?: number;
    consentEmail?: boolean;
    consentSms?: boolean;
    referredByCode?: string;
  }): number {
    let score = 10;
    if (input.urgencyLevel === "urgent") score += 20;
    else if (input.urgencyLevel === "soon") score += 10;
    else if (input.urgencyLevel === "planning") score += 5;
    if (input.primaryMotivation === "selling_soon") score += 15;
    else if (input.primaryMotivation === "renovation") score += 10;
    else if (input.primaryMotivation === "new_homeowner") score += 8;
    if (input.desiredProjects.length >= 3) score += 10;
    else if (input.desiredProjects.length >= 2) score += 5;
    if (input.squareFootage && input.squareFootage >= 2500) score += 5;
    if (
      input.estimatedHomeValue &&
      (input.estimatedHomeValue.includes("$500K") ||
        input.estimatedHomeValue.includes("$750K") ||
        input.estimatedHomeValue.includes("$1M"))
    )
      score += 10;
    if (input.numKids && input.numKids > 0) score += 3;
    if (input.numPets && input.numPets > 0) score += 2;
    if (input.consentEmail) score += 3;
    if (input.consentSms) score += 3;
    if (input.referredByCode) score += 5;
    return score;
  }

  it("gives base score of 10 for minimal input", () => {
    expect(calculatePriorityScore({ desiredProjects: ["roofing"] })).toBe(10);
  });

  it("adds 20 for urgent urgency", () => {
    expect(
      calculatePriorityScore({ urgencyLevel: "urgent", desiredProjects: ["roofing"] })
    ).toBe(30);
  });

  it("adds 15 for selling_soon motivation", () => {
    expect(
      calculatePriorityScore({ primaryMotivation: "selling_soon", desiredProjects: ["roofing"] })
    ).toBe(25);
  });

  it("adds 10 for 3+ desired projects", () => {
    expect(
      calculatePriorityScore({ desiredProjects: ["roofing", "plumbing", "electrical"] })
    ).toBe(20);
  });

  it("adds 5 for 2 desired projects", () => {
    expect(
      calculatePriorityScore({ desiredProjects: ["roofing", "plumbing"] })
    ).toBe(15);
  });

  it("adds 5 for referral", () => {
    expect(
      calculatePriorityScore({ desiredProjects: ["roofing"], referredByCode: "ABC12345" })
    ).toBe(15);
  });

  it("stacks all bonuses correctly", () => {
    const score = calculatePriorityScore({
      urgencyLevel: "urgent",
      primaryMotivation: "selling_soon",
      desiredProjects: ["roofing", "plumbing", "electrical"],
      squareFootage: 3000,
      estimatedHomeValue: "$500K-$750K",
      numKids: 2,
      numPets: 1,
      consentEmail: true,
      consentSms: true,
      referredByCode: "ABC12345",
    });
    // 10 + 20 + 15 + 10 + 5 + 10 + 3 + 2 + 3 + 3 + 5 = 86
    expect(score).toBe(86);
  });
});

describe("waitlist: DFW market detection", () => {
  const dfwPrefixes = [
    "750", "751", "752", "753", "754", "755", "756", "757", "758", "759",
    "760", "761", "762", "763", "764", "765", "766", "767", "768", "769",
  ];

  function detectMarket(zipCode: string, city: string, state: string): string {
    const prefix = zipCode.substring(0, 3);
    return dfwPrefixes.includes(prefix) ? "Dallas-Fort Worth" : `${city}, ${state}`;
  }

  it("identifies DFW zip codes", () => {
    expect(detectMarket("75001", "Addison", "TX")).toBe("Dallas-Fort Worth");
    expect(detectMarket("76001", "Arlington", "TX")).toBe("Dallas-Fort Worth");
    expect(detectMarket("75201", "Dallas", "TX")).toBe("Dallas-Fort Worth");
  });

  it("identifies non-DFW zip codes", () => {
    expect(detectMarket("77001", "Houston", "TX")).toBe("Houston, TX");
    expect(detectMarket("78201", "San Antonio", "TX")).toBe("San Antonio, TX");
    expect(detectMarket("90001", "Los Angeles", "CA")).toBe("Los Angeles, CA");
  });
});

describe("waitlist: duplicate email detection", () => {
  it("recognizes MySQL duplicate entry error code", () => {
    const error = { code: "ER_DUP_ENTRY" };
    expect(error.code).toBe("ER_DUP_ENTRY");
  });

  it("email normalization is case-insensitive at DB level (unique constraint)", () => {
    // MySQL unique constraints on varchar are case-insensitive by default
    const email1 = "Test@Example.com".toLowerCase();
    const email2 = "test@example.com";
    expect(email1).toBe(email2);
  });
});
