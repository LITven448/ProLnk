import crypto from "crypto";

// Deterministic HMAC of an opportunity id, used to let a homeowner track their
// submitted request without an account (mirrors the customerDeals unguessable-token
// pattern). No schema change required — recomputed/verified on demand.
const REQUEST_TOKEN_SECRET = process.env.JWT_SECRET || "prolnk-request-track";

export function makeRequestTrackingToken(opportunityId: number): string {
  return crypto
    .createHmac("sha256", REQUEST_TOKEN_SECRET)
    .update(`req:${opportunityId}`)
    .digest("base64url")
    .slice(0, 24);
}

export function verifyRequestTrackingToken(opportunityId: number, token: string): boolean {
  const expected = makeRequestTrackingToken(opportunityId);
  if (token.length !== expected.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function requestStatusUrl(opportunityId: number, baseUrl: string): string {
  const token = makeRequestTrackingToken(opportunityId);
  return `${baseUrl.replace(/\/$/, "")}/my-request/${opportunityId}?t=${token}`;
}
