/**
 * Smarty Streets — Address Validation & Geocoding
 * USPS-authoritative. Returns normalized address + GPS coordinates.
 * Install: pnpm add smartystreets-javascript-sdk
 */

const SMARTY_AUTH_ID = process.env.SMARTY_AUTH_ID ?? "";
const SMARTY_AUTH_TOKEN = process.env.SMARTY_AUTH_TOKEN ?? "";

export interface ValidatedAddress {
  deliveryLine1: string;
  lastLine: string;
  city: string;
  state: string;
  zip5: string;
  zip4: string;
  latitude: number;
  longitude: number;
  residential: boolean;
  deliverable: boolean;
}

export async function validateAddress(rawAddress: string, city?: string, state?: string, zip?: string): Promise<ValidatedAddress | null> {
  if (!SMARTY_AUTH_ID || !SMARTY_AUTH_TOKEN) {
    // Graceful fallback — return raw address parsed
    console.warn("[Address] Smarty Streets not configured — skipping validation");
    return null;
  }

  try {
    const params = new URLSearchParams({
      "auth-id": SMARTY_AUTH_ID,
      "auth-token": SMARTY_AUTH_TOKEN,
      street: rawAddress,
      ...(city ? { city } : {}),
      ...(state ? { state } : {}),
      ...(zip ? { zipcode: zip } : {}),
      candidates: "1",
      match: "strict",
    });

    const res = await fetch(`https://us-street.api.smartystreets.com/street-address?${params}`);
    if (!res.ok) return null;

    const data = await res.json() as any[];
    if (!data.length) return null;

    const result = data[0];
    return {
      deliveryLine1: result.delivery_line_1 ?? rawAddress,
      lastLine: result.last_line ?? "",
      city: result.components?.city_name ?? city ?? "",
      state: result.components?.state_abbreviation ?? state ?? "",
      zip5: result.components?.zipcode ?? zip ?? "",
      zip4: result.components?.plus4_code ?? "",
      latitude: result.metadata?.latitude ?? 0,
      longitude: result.metadata?.longitude ?? 0,
      residential: result.metadata?.rdi === "Residential",
      deliverable: result.analysis?.dpv_match_code === "Y" || result.analysis?.dpv_match_code === "S",
    };
  } catch (err) {
    console.error("[Address] Smarty validation error:", err);
    return null;
  }
}

/**
 * Validate and enrich a job address — called on job creation and partner application.
 * Returns geocoordinates for ZIP-based proximity matching.
 */
export async function enrichJobAddress(address: string, city?: string, state?: string, zip?: string) {
  const validated = await validateAddress(address, city, state, zip);
  if (!validated) return { address, city, state, zip, lat: null, lng: null, valid: false };
  return {
    address: validated.deliveryLine1,
    city: validated.city,
    state: validated.state,
    zip: validated.zip5,
    lat: validated.latitude,
    lng: validated.longitude,
    valid: validated.deliverable,
    residential: validated.residential,
  };
}
