/**
 * Brand FROM-address contract (regression for the email-domain bug).
 *
 * Background: TrustyPro-brand emails were going out from the ProLnk domain. A
 * brand/domain mismatch breaks DKIM/SPF alignment for that brand and silently
 * tanks deliverability — the send "succeeds" but lands in spam. This locks the
 * brand → FROM mapping so a domain regression fails loudly here.
 *
 * Pure unit test: exercises fromForBrand() + the exported FROM constants. No
 * network, no Resend, deterministic.
 */
import { describe, expect, it } from "vitest";
import { FROM_PROLNK, FROM_TRUSTYPRO, fromForBrand } from "./email";

describe("brand FROM-address contract", () => {
  it("ProLnk-brand senders use the prolnk.xyz domain", () => {
    expect(fromForBrand("prolnk")).toBe(FROM_PROLNK);
    expect(fromForBrand("prolnk")).toMatch(/@prolnk\.xyz>?$/);
    expect(fromForBrand("prolnk")).not.toMatch(/@trustypro\.io/);
  });

  it("TrustyPro-brand senders use the trustypro.io domain", () => {
    expect(fromForBrand("trustypro")).toBe(FROM_TRUSTYPRO);
    expect(fromForBrand("trustypro")).toMatch(/@trustypro\.io>?$/);
    expect(fromForBrand("trustypro")).not.toMatch(/@prolnk\.xyz/);
  });

  it("the two brands never share a FROM (no cross-brand domain leak)", () => {
    expect(FROM_PROLNK).not.toBe(FROM_TRUSTYPRO);
    const prolnkDomain = FROM_PROLNK.match(/@([^>]+)>?$/)?.[1];
    const trustyDomain = FROM_TRUSTYPRO.match(/@([^>]+)>?$/)?.[1];
    expect(prolnkDomain).toBe("prolnk.xyz");
    expect(trustyDomain).toBe("trustypro.io");
  });

  it("constants carry the correct brand display names", () => {
    expect(FROM_PROLNK).toMatch(/^ProLnk </);
    expect(FROM_TRUSTYPRO).toMatch(/^TrustyPro </);
  });
});
