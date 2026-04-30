/**
 * Radar.io — Geofencing & Technician Tracking
 *
 * When a partner starts driving to a job, their device registers a trip.
 * When they enter a geofence around the homeowner's address, a notification
 * fires: "Your technician is 10 minutes away."
 *
 * This is a high-trust, high-delight homeowner feature.
 * Free tier: 100K API calls/month — covers DFW launch easily.
 */

const RADAR_SECRET_KEY = process.env.RADAR_SECRET_KEY ?? "";
const RADAR_BASE = "https://api.radar.io/v1";

function radarHeaders() {
  return {
    Authorization: RADAR_SECRET_KEY,
    "Content-Type": "application/json",
  };
}

// ─── Create a geofence around a job address ───────────────────────────────────

export async function createJobGeofence(opts: {
  jobId: number;
  lat: number;
  lng: number;
  radiusMeters?: number;
}): Promise<string | null> {
  if (!RADAR_SECRET_KEY) return null;
  try {
    const res = await fetch(`${RADAR_BASE}/geofences`, {
      method: "POST",
      headers: radarHeaders(),
      body: JSON.stringify({
        tag: "prolnk-job",
        externalId: `job-${opts.jobId}`,
        description: `Job #${opts.jobId} address`,
        type: "circle",
        coordinates: [opts.lng, opts.lat], // Radar uses [lng, lat]
        radius: opts.radiusMeters ?? 150, // ~150m / ~500ft radius
        metadata: { jobId: opts.jobId },
      }),
    });
    if (!res.ok) return null;
    const data = await res.json() as any;
    return data.geofence?._id ?? null;
  } catch {
    return null;
  }
}

// ─── Register a tech's trip (called when they start driving to a job) ─────────

export async function startTechTrip(opts: {
  partnerId: number;
  jobId: number;
  techLat: number;
  techLng: number;
}): Promise<string | null> {
  if (!RADAR_SECRET_KEY) return null;
  try {
    const res = await fetch(`${RADAR_BASE}/trips`, {
      method: "POST",
      headers: radarHeaders(),
      body: JSON.stringify({
        externalId: `tech-${opts.partnerId}-job-${opts.jobId}`,
        destinationGeofenceTag: "prolnk-job",
        destinationGeofenceExternalId: `job-${opts.jobId}`,
        mode: "car",
        scheduledArrivalAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        metadata: { partnerId: opts.partnerId, jobId: opts.jobId },
      }),
    });
    if (!res.ok) return null;
    const data = await res.json() as any;
    return data.trip?._id ?? null;
  } catch {
    return null;
  }
}

// ─── Verify address deliverability ───────────────────────────────────────────

export async function validateAddressRadar(address: string): Promise<{
  lat: number;
  lng: number;
  formattedAddress: string;
} | null> {
  if (!RADAR_SECRET_KEY) return null;
  try {
    const params = new URLSearchParams({ query: address });
    const res = await fetch(`${RADAR_BASE}/geocode/forward?${params}`, { headers: radarHeaders() });
    if (!res.ok) return null;
    const data = await res.json() as any;
    const addr = data.addresses?.[0];
    if (!addr) return null;
    return {
      lat: addr.latitude,
      lng: addr.longitude,
      formattedAddress: addr.formattedAddress,
    };
  } catch {
    return null;
  }
}
