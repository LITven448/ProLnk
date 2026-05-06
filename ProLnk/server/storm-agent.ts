/**
 * Storm Tracking Agent (AGaaS Agent #4)
 * Monitors NOAA weather alerts for severe weather events (hail, wind, tornado, flood, ice)
 * in active service areas, cross-references affected properties, and auto-generates
 * emergency lead batches for roofing, tree service, water mitigation, and HVAC partners.
 *
 * Runs on a scheduled basis (every 30 minutes via background job).
 * Admin can also trigger manually from the admin dashboard.
 *
 * NOAA API: https://api.weather.gov/alerts/active
 */

import { getDb } from "./db";
import { sql } from "drizzle-orm";
import { notifyOwner } from "./_core/notification";
import { pushNetworkAlert } from "./_core/push";
import { sendStormAlertToHomeowner, sendStormAlertToPro } from "./email";

const NOAA_ALERTS_URL = "https://api.weather.gov/alerts/active";

// Severe weather event types that trigger lead generation
const STORM_EVENT_TYPES = [
  "Tornado Warning",
  "Tornado Watch",
  "Severe Thunderstorm Warning",
  "Severe Thunderstorm Watch",
  "Hail",
  "High Wind Warning",
  "High Wind Watch",
  "Wind Advisory",
  "Flash Flood Warning",
  "Flood Warning",
  "Winter Storm Warning",
  "Ice Storm Warning",
  "Blizzard Warning",
  "Hurricane Warning",
  "Hurricane Watch",
  "Tropical Storm Warning",
];

// Map event types to the trade categories that should receive leads
const EVENT_TO_TRADES: Record<string, string[]> = {
  "Tornado Warning": ["roofing", "tree_service", "water_mitigation", "general_contractor"],
  "Tornado Watch": ["roofing", "tree_service"],
  "Severe Thunderstorm Warning": ["roofing", "tree_service", "water_mitigation"],
  "Severe Thunderstorm Watch": ["roofing", "tree_service"],
  "Hail": ["roofing", "hvac", "auto_glass"],
  "High Wind Warning": ["roofing", "tree_service", "fence_repair"],
  "High Wind Watch": ["roofing", "tree_service"],
  "Wind Advisory": ["tree_service", "fence_repair"],
  "Flash Flood Warning": ["water_mitigation", "plumbing", "foundation"],
  "Flood Warning": ["water_mitigation", "plumbing"],
  "Winter Storm Warning": ["hvac", "plumbing", "roofing"],
  "Ice Storm Warning": ["hvac", "plumbing", "tree_service"],
  "Blizzard Warning": ["hvac", "plumbing"],
  "Hurricane Warning": ["roofing", "water_mitigation", "tree_service", "general_contractor", "generator"],
  "Hurricane Watch": ["roofing", "water_mitigation", "tree_service"],
  "Tropical Storm Warning": ["roofing", "water_mitigation", "tree_service"],
};

export interface StormEvent {
  id: string;
  eventType: string;
  headline: string;
  description: string;
  severity: string;
  urgency: string;
  areas: string[];
  affectedZones: string[];
  onset: string | null;
  expires: string | null;
  status: string;
}

export interface StormScanResult {
  eventsFound: number;
  eventsProcessed: number;
  leadsGenerated: number;
  propertiesAffected: number;
  errors: string[];
}

/**
 * Fetch active severe weather alerts from NOAA for a given state
 */
export async function fetchStormAlerts(state?: string): Promise<StormEvent[]> {
  try {
    const url = state
      ? `${NOAA_ALERTS_URL}?area=${state}&severity=Severe,Extreme&status=actual`
      : `${NOAA_ALERTS_URL}?severity=Severe,Extreme&status=actual`;

    const res = await fetch(url, {
      headers: { "User-Agent": "ProLnk-StormAgent/1.0 (contact@prolnk.io)" },
    });

    if (!res.ok) {
      console.warn(`[StormAgent] NOAA API error: ${res.status}`);
      return [];
    }

    const data = await res.json() as { features?: any[] };
    const features = data.features ?? [];

    return features
      .filter((f: any) => {
        const event = f.properties?.event ?? "";
        return STORM_EVENT_TYPES.some(t => event.includes(t));
      })
      .map((f: any) => ({
        id: f.properties?.id ?? f.id,
        eventType: f.properties?.event ?? "Unknown",
        headline: f.properties?.headline ?? "",
        description: (f.properties?.description ?? "").slice(0, 1000),
        severity: f.properties?.severity ?? "Unknown",
        urgency: f.properties?.urgency ?? "Unknown",
        areas: f.properties?.areaDesc ? [f.properties.areaDesc] : [],
        affectedZones: (f.properties?.affectedZones ?? []).map((z: string) => z.split("/").pop() ?? z),
        onset: f.properties?.onset ?? null,
        expires: f.properties?.expires ?? null,
        status: f.properties?.status ?? "actual",
      }));
  } catch (err) {
    console.error("[StormAgent] Failed to fetch NOAA alerts:", err);
    return [];
  }
}

/**
 * Cross-reference storm-affected areas with registered properties
 * Returns property IDs and zip codes in the affected area
 */
async function findAffectedProperties(db: any, affectedAreas: string[]): Promise<{ id: number; address: string; zip: string; city: string; state: string }[]> {
  if (affectedAreas.length === 0) return [];

  // Extract state abbreviations from area descriptions (e.g., "Dallas County, TX")
  const stateMatches = affectedAreas
    .flatMap(a => a.match(/\b([A-Z]{2})\b/g) ?? [])
    .filter(s => s.length === 2);

  if (stateMatches.length === 0) return [];

  // Query properties in affected states (broad match — refine with zip/county when NOAA zone data is available)
  const stateList = Array.from(new Set(stateMatches)).map(s => `'${s}'`).join(", ");
  const rows = await (db as any).execute(
    sql.raw(`SELECT id, address, zip, city, state FROM properties WHERE state IN (${stateList}) LIMIT 500`)
  );
  return (rows.rows || rows) as any[];
}

/**
 * Log a storm event to the database (creates or updates)
 */
async function upsertStormEvent(db: any, event: StormEvent): Promise<number> {
  const existing = await (db as any).execute(
    sql`SELECT id FROM stormEvents WHERE eventId = ${event.id} LIMIT 1`
  );
  const row = (existing.rows || existing)[0];

  if (row?.id) {
    await (db as any).execute(
      sql`UPDATE stormEvents SET
        headline = ${event.headline},
        severity = ${event.severity},
        urgency = ${event.urgency},
        expires = ${event.expires ? new Date(event.expires) : null}
      WHERE id = ${row.id}`
    );
    return row.id as number;
  }

  const result = await (db as any).execute(
    sql`INSERT INTO stormEvents
      (eventId, eventType, headline, description, severity, urgency, affectedZones, onset, expires, status)
    VALUES
      (${event.id}, ${event.eventType}, ${event.headline}, ${event.description},
       ${event.severity}, ${event.urgency}, ${JSON.stringify(event.areas)},
       ${event.onset ? new Date(event.onset) : null},
       ${event.expires ? new Date(event.expires) : null},
       'actual')`
  );
  return (result.rows || result)[0]?.insertId ?? result.insertId;
}

/**
 * Main storm scan — called by background scheduler and admin manual trigger
 */
export async function runStormScan(options?: { state?: string; adminUserId?: number }): Promise<StormScanResult> {
  const result: StormScanResult = {
    eventsFound: 0,
    eventsProcessed: 0,
    leadsGenerated: 0,
    propertiesAffected: 0,
    errors: [],
  };

  const db = await getDb();
  if (!db) {
    result.errors.push("Database unavailable");
    return result;
  }

  // Fetch active alerts
  const alerts = await fetchStormAlerts(options?.state ?? "TX"); // Default to TX for launch
  result.eventsFound = alerts.length;

  if (alerts.length === 0) {
    console.log("[StormAgent] No active severe weather alerts found");
    return result;
  }

  console.log(`[StormAgent] Found ${alerts.length} active severe weather alerts`);

  for (const event of alerts) {
    try {
      // Check if we've already processed this event recently (within 6 hours)
      const recentCheck = await (db as any).execute(
        sql`SELECT id, leadsGenerated FROM stormEvents WHERE eventId = ${event.id} AND createdAt > DATE_SUB(NOW(), INTERVAL 6 HOUR) LIMIT 1`
      );
      const existing = (recentCheck.rows || recentCheck)[0];
      if (existing?.leadsGenerated > 0) {
        console.log(`[StormAgent] Skipping already-processed event: ${event.eventType}`);
        continue;
      }

      // Upsert the storm event record
      const stormEventId = await upsertStormEvent(db, event);

      // Find affected properties
      const affectedProps = await findAffectedProperties(db, event.areas);
      result.propertiesAffected += affectedProps.length;

      // Determine which trades should receive leads
      const targetTrades = EVENT_TO_TRADES[event.eventType] ??
        EVENT_TO_TRADES[Object.keys(EVENT_TO_TRADES).find(k => event.eventType.includes(k)) ?? ""] ??
        ["roofing", "general_contractor"];

      // Generate emergency leads for affected properties
      let leadsForThisEvent = 0;
      for (const prop of affectedProps.slice(0, 100)) { // Cap at 100 properties per event
        for (const trade of targetTrades) {
          await (db as any).execute(
            sql`INSERT IGNORE INTO stormLeads
              (stormEventId, propertyId, tradeCategory, address, city, state, zip, status, priority)
            VALUES
              (${stormEventId}, ${prop.id}, ${trade},
               ${prop.address}, ${prop.city}, ${prop.state}, ${prop.zip},
               'pending', ${event.severity === "Extreme" ? "high" : "normal"})`
          );
          leadsForThisEvent++;
        }
      }

      result.leadsGenerated += leadsForThisEvent;

      // Update storm event with lead count
      await (db as any).execute(
        sql`UPDATE stormEvents SET leadsGenerated = ${leadsForThisEvent}, propertiesAffected = ${affectedProps.length} WHERE id = ${stormEventId}`
      );

      result.eventsProcessed++;

      // Notify owner if significant event
      if (affectedProps.length > 10 || event.severity === "Extreme") {
        notifyOwner({
          title: `⚡ Storm Alert: ${event.eventType}`,
          content: `${event.headline}. ${affectedProps.length} properties affected. ${leadsForThisEvent} emergency leads generated for ${targetTrades.join(", ")}.`,
        }).catch(() => {});

        pushNetworkAlert(
          `Storm Alert: ${event.eventType}`,
          `${event.areas[0] ?? "Your area"} — emergency leads available for ${targetTrades[0]}.`,
          "/partner/leads"
        ).catch(() => {});

        // Notify homeowners whose properties are affected (cap at 50 emails per event)
        const homeownerRows = await (db as any).execute(
          sql`SELECT DISTINCT hp.userId, hp.displayName, hp.phone, u.email, u.name,
                p.address, p.city, p.state, p.zip
              FROM homeownerProfiles hp
              JOIN users u ON u.id = hp.userId
              JOIN properties p ON p.ownerId = hp.id
              WHERE p.id IN (${affectedProps.slice(0, 50).map(p => p.id).join(",") || 0})
                AND u.email IS NOT NULL
              LIMIT 50`
        ).catch(() => ({ rows: [] })) as any;
        const homeowners = (homeownerRows.rows ?? homeownerRows) as any[];
        const dashboardUrl = 'https://prolnk.io/my-home';
        for (const ho of homeowners.slice(0, 50)) {
          sendStormAlertToHomeowner({
            homeownerEmail: ho.email,
            homeownerName: ho.displayName ?? ho.name ?? 'Homeowner',
            propertyAddress: `${ho.address}, ${ho.city}, ${ho.state} ${ho.zip}`,
            stormType: event.eventType,
            headline: event.headline,
            severity: event.severity,
            dashboardUrl,
          }).catch(() => {});
        }
        if (homeowners.length > 0) {
          console.log(`[StormAgent] Sent storm alerts to ${homeowners.length} homeowners`);
        }

        // Notify pros in the affected zip codes (cap at 100 per event)
        const affectedZips = Array.from(new Set(affectedProps.map((p: any) => p.zip).filter(Boolean))) as string[];
        if (affectedZips.length > 0 && leadsForThisEvent > 0) {
          const zipList = affectedZips.slice(0, 20).map(z => `'${z}'`).join(',');
          const proRows = await (db as any).execute(
            sql.raw(`SELECT DISTINCT p.contactName, p.contactEmail, p.businessName, p.trades
                FROM partners p
                WHERE p.contactEmail IS NOT NULL
                  AND p.status = 'approved'
                  AND p.serviceZipCodes IS NOT NULL
                LIMIT 100`)
          ).catch(() => ({ rows: [] })) as any;
          const pros = (proRows.rows ?? proRows) as any[];
          // Filter pros whose service zip codes overlap with affected zips
          const filteredPros = pros.filter((pro: any) => {
            const proZips = (pro.serviceZipCodes ?? '').split(/[,\s]+/).filter(Boolean);
            return proZips.some((z: string) => affectedZips.includes(z));
          });
          const leadsUrl = 'https://prolnk.io/dashboard/leads';
          for (const pro of filteredPros.slice(0, 100)) {
            sendStormAlertToPro({
              to: pro.contactEmail,
              partnerName: pro.contactName ?? pro.businessName,
              stormType: event.eventType,
              affectedZips: affectedZips.slice(0, 10),
              homeownerCount: affectedProps.length,
              dashboardUrl: leadsUrl,
            }).catch(() => {});
          }
          if (filteredPros.length > 0) {
            console.log(`[StormAgent] Sent storm lead alerts to ${filteredPros.length} pros`);
          }
        }
      }

      console.log(`[StormAgent] Processed: ${event.eventType} — ${affectedProps.length} properties, ${leadsForThisEvent} leads`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      result.errors.push(`${event.eventType}: ${msg}`);
      console.error(`[StormAgent] Error processing ${event.eventType}:`, err);
    }
  }

  console.log(`[StormAgent] Scan complete — ${result.eventsProcessed} events, ${result.leadsGenerated} leads, ${result.propertiesAffected} properties`);
  return result;
}
