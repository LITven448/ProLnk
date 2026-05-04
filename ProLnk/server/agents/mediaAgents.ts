/**
 * ProLnk Media Agents
 *
 * Four agents for the advertising business:
 *   - Targeting Agent — match advertisers to homeowner segments by ZIP/category
 *   - Performance Agent — track advertiser ROI, impressions, clicks
 *   - Report Agent — generate monthly performance reports for advertisers
 *   - Advertiser Retention Agent — flag at-risk advertisers, trigger win-back
 */

import { getDb } from "../db";
import { sql } from "drizzle-orm";
import { invokeLLM } from "../_core/llm";
import { dashboard } from "../notify";

// ─── Targeting Agent ──────────────────────────────────────────────────────────

export async function runTargetingAgent(): Promise<{
  matchedSegments: Array<{ advertiserCategory: string; bestZips: string[]; homeownerCount: number; matchScore: number }>;
  untappedOpportunities: string[];
}> {
  const db = await getDb();
  if (!db) return { matchedSegments: [], untappedOpportunities: [] };

  try {
    // Find homeowner concentration by ZIP and match with advertiser categories
    const homeownerZips = await (db as any).execute(sql`
      SELECT p.zip, COUNT(*) as homeownerCount
      FROM homeownerProfiles hp
      LEFT JOIN properties p ON p.ownerId = hp.id
      WHERE hp.setupComplete = 1 AND p.zip IS NOT NULL
      GROUP BY p.zip
      ORDER BY homeownerCount DESC
      LIMIT 20
    `);
    const zips = homeownerZips.rows || homeownerZips;

    // Get active advertiser categories
    const advertiserRows = await (db as any).execute(sql`
      SELECT category, COUNT(*) as cnt, GROUP_CONCAT(DISTINCT JSON_UNQUOTE(JSON_EXTRACT(zipCodes, '$[0]'))) as coverageZips
      FROM featuredAdvertisers
      WHERE status = 'active'
      GROUP BY category
    `);
    const advertisers = advertiserRows.rows || advertiserRows;

    // Calculate real match scoring
    const totalHomeowners = zips.reduce((s: number, z: any) => s + parseInt(z.homeownerCount || "0"), 0);
    const topZips = zips.slice(0, 5).map((z: any) => z.zip).filter(Boolean);

    // Match scoring algorithm (0-100)
    const calculateMatchScore = (advertiser: any): number => {
      let score = 50; // Base score

      // Category relevance boost (20 pts)
      const categoryKeywords = advertiser.category?.toLowerCase() || "";
      if (["real estate", "insurance", "warranty", "contractor", "repair", "service"].some(k => categoryKeywords.includes(k))) {
        score += 20;
      }

      // Zip coverage boost (20 pts for high overlap)
      const advZips = (advertiser.coverageZips || "").split(",").filter(Boolean);
      const overlapCount = topZips.filter((z: string) => advZips.includes(z)).length;
      score += Math.min(20, overlapCount * 4);

      // Market size bonus (10 pts if large market)
      if (totalHomeowners > 5000) score += 10;
      else if (totalHomeowners > 2000) score += 5;

      // Cap at 100
      return Math.min(100, Math.max(50, score));
    };

    const segments = advertisers.map((adv: any) => ({
      advertiserCategory: adv.category,
      bestZips: topZips,
      homeownerCount: totalHomeowners,
      matchScore: calculateMatchScore(adv),
    }));

    const untappedOpportunities: string[] = [];
    if (advertisers.length < 5) untappedOpportunities.push("Real estate agents — high homeowner overlap, strong referral potential");
    if (!advertisers.some((a: any) => a.category?.toLowerCase().includes("insurance"))) {
      untappedOpportunities.push("Homeowners insurance agents — every homeowner needs insurance updates");
    }
    if (!advertisers.some((a: any) => a.category?.toLowerCase().includes("warranty"))) {
      untappedOpportunities.push("Home warranty companies — natural fit with Home Health Vault data");
    }

    return { matchedSegments: segments, untappedOpportunities };
  } catch {
    return { matchedSegments: [], untappedOpportunities: [] };
  }
}

// ─── Performance Agent ────────────────────────────────────────────────────────

export async function runPerformanceAgent(): Promise<{
  topPerformers: Array<{ businessName: string; ctr: number; impressions: number; clicks: number; tier: string }>;
  underperformers: Array<{ businessName: string; businessId: number; ctr: number; recommendation: string }>;
  avgCtr: number;
}> {
  const db = await getDb();
  if (!db) return { topPerformers: [], underperformers: [], avgCtr: 0 };

  try {
    const rows = await (db as any).execute(sql`
      SELECT id, businessName, category, impressions, clicks, monthlyFee,
             (SELECT name FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'featuredAdvertisers' LIMIT 1) as tier
      FROM featuredAdvertisers
      WHERE status = 'active' AND impressions > 0
      ORDER BY clicks DESC
    `);
    const advertisers = rows.rows || rows;

    const withCtr = advertisers.map((a: any) => ({
      ...a,
      ctr: a.impressions > 0 ? (a.clicks / a.impressions) * 100 : 0,
    }));

    const avgCtr = withCtr.length > 0
      ? withCtr.reduce((s: number, a: any) => s + a.ctr, 0) / withCtr.length
      : 0;

    const topPerformers = withCtr
      .filter((a: any) => a.ctr >= avgCtr)
      .slice(0, 5)
      .map((a: any) => ({ businessName: a.businessName, ctr: Math.round(a.ctr * 100) / 100, impressions: a.impressions, clicks: a.clicks, tier: "featured" }));

    const underperformers = withCtr
      .filter((a: any) => a.ctr < avgCtr * 0.5 && a.impressions > 100)
      .slice(0, 5)
      .map((a: any) => ({
        businessName: a.businessName,
        businessId: a.id,
        ctr: Math.round(a.ctr * 100) / 100,
        recommendation: a.ctr < 0.5 ? "Update banner creative — current CTR critically low" : "Consider ZIP code expansion for more impression volume",
      }));

    return { topPerformers, underperformers, avgCtr: Math.round(avgCtr * 100) / 100 };
  } catch {
    return { topPerformers: [], underperformers: [], avgCtr: 0 };
  }
}

// ─── Report Agent ─────────────────────────────────────────────────────────────

export async function generateAdvertiserReport(advertiserId: number): Promise<{
  reportHtml: string;
  subject: string;
  metrics: Record<string, number | string>;
}> {
  const db = await getDb();
  if (!db) return { reportHtml: "", subject: "ProLnk Media Monthly Report", metrics: {} };

  try {
    const rows = await (db as any).execute(sql`
      SELECT * FROM featuredAdvertisers WHERE id = ${advertiserId} LIMIT 1
    `);
    const advertiser = (rows.rows || rows)[0];
    if (!advertiser) throw new Error("Advertiser not found");

    const ctr = advertiser.impressions > 0 ? ((advertiser.clicks / advertiser.impressions) * 100).toFixed(2) : "0";

    const reportResponse = await invokeLLM({
      model: "claude-sonnet-4-5-20251022",
      provider: "anthropic" as const,
      thinking: false,
      maxTokens: 1024,
      messages: [
        {
          role: "system",
          content: "You write professional monthly performance reports for advertisers on the ProLnk Media platform. Be data-driven, highlight wins, and give 2-3 specific improvement recommendations.",
        },
        {
          role: "user",
          content: `Write a monthly performance report for ${advertiser.businessName} (${advertiser.category}).
Metrics: ${advertiser.impressions} impressions, ${advertiser.clicks} clicks, ${ctr}% CTR.
ZIP codes covered: ${advertiser.zipCodes ?? "Not specified"}.
Tier: ${advertiser.monthlyFee === 199 ? "Connect ($199/mo)" : advertiser.monthlyFee === 349 ? "Preferred ($349/mo)" : "Exclusive ($799/mo)"}.
Return HTML for an email body.`,
        },
      ],
    });

    const reportHtml = reportResponse.choices?.[0]?.message?.content?.toString() ?? "";

    return {
      reportHtml,
      subject: `Your ProLnk Media Report — ${new Date().toLocaleString("default", { month: "long", year: "numeric" })}`,
      metrics: {
        impressions: advertiser.impressions,
        clicks: advertiser.clicks,
        ctr: `${ctr}%`,
        monthlyFee: `$${advertiser.monthlyFee}/month`,
      },
    };
  } catch (err) {
    return {
      reportHtml: `<p>Report generation failed: ${err instanceof Error ? err.message : "unknown error"}</p>`,
      subject: "ProLnk Media Monthly Report",
      metrics: {},
    };
  }
}

// ─── Advertiser Retention Agent ───────────────────────────────────────────────

export async function runAdvertiserRetentionAgent(): Promise<{
  atRiskAdvertisers: Array<{ id: number; businessName: string; reason: string; daysUntilChurn: number }>;
  action: string;
}> {
  const db = await getDb();
  if (!db) return { atRiskAdvertisers: [], action: "Database unavailable" };

  try {
    // Find advertisers with very low engagement or approaching renewal
    const rows = await (db as any).execute(sql`
      SELECT id, businessName, category, impressions, clicks, monthlyFee,
             createdAt, endDate
      FROM featuredAdvertisers
      WHERE status = 'active'
        AND (
          (impressions < 50 AND createdAt < DATE_SUB(NOW(), INTERVAL 14 DAY))
          OR (endDate IS NOT NULL AND endDate < DATE_ADD(NOW(), INTERVAL 30 DAY))
        )
    `);
    const advertisers = rows.rows || rows;

    const atRisk = advertisers.map((a: any) => {
      const ctr = a.impressions > 0 ? (a.clicks / a.impressions) * 100 : 0;
      const daysUntilEndDate = a.endDate
        ? Math.floor((new Date(a.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : 365;

      return {
        id: a.id,
        businessName: a.businessName,
        reason: a.impressions < 50
          ? `Only ${a.impressions} impressions in first 2 weeks — may not see ROI`
          : `Contract ends in ${daysUntilEndDate} days — renewal risk`,
        daysUntilChurn: Math.min(daysUntilEndDate, ctr < 1 ? 30 : 60),
      };
    });

    if (atRisk.length > 0) {
      await dashboard(
        `Advertiser Retention Alert — ${atRisk.length} at risk`,
        `${atRisk.map((a: any) => `${a.businessName}: ${a.reason}`).join("\n")}`,
        "advertiser_retention"
      );
    }

    return {
      atRiskAdvertisers: atRisk,
      action: atRisk.length > 0
        ? "Contact at-risk advertisers with performance optimization tips and renewal offers"
        : "Advertiser retention healthy",
    };
  } catch {
    return { atRiskAdvertisers: [], action: "Error running retention analysis" };
  }
}
