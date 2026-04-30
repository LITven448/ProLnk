/**
 * Google Maps Backend Geocoding
 * Converts addresses to lat/lng for proximity-based contractor matching.
 * Used at job creation, partner application, and homeowner registration.
 */

const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_API_KEY ?? "";

export interface GeocodedAddress {
  lat: number;
  lng: number;
  formattedAddress: string;
  city: string;
  state: string;
  zip: string;
  placeId: string;
}

export async function geocodeAddress(address: string): Promise<GeocodedAddress | null> {
  if (!GOOGLE_MAPS_KEY) return null;
  try {
    const params = new URLSearchParams({ address, key: GOOGLE_MAPS_KEY });
    const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${params}`);
    if (!res.ok) return null;
    const data = await res.json() as any;
    if (data.status !== "OK" || !data.results?.length) return null;
    const result = data.results[0];
    const components = result.address_components ?? [];
    const get = (type: string) => components.find((c: any) => c.types.includes(type))?.long_name ?? "";
    const getShort = (type: string) => components.find((c: any) => c.types.includes(type))?.short_name ?? "";
    return {
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
      formattedAddress: result.formatted_address,
      city: get("locality") || get("sublocality"),
      state: getShort("administrative_area_level_1"),
      zip: get("postal_code"),
      placeId: result.place_id,
    };
  } catch (err) {
    console.error("[Geocoding] Error:", err);
    return null;
  }
}

/**
 * Calculate distance between two lat/lng points (Haversine formula).
 * Returns distance in miles.
 */
export function distanceMiles(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
