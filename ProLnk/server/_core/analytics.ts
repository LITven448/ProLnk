import { createLogger } from "./logger";
import { getDb, eq, sql } from "../db";
import { analyticsEvents, InsertAnalyticsEvent } from "../drizzle/schema";

const log = createLogger("Analytics");

export interface WaitlistAnalyticsEvent {
  type: "signup" | "referral" | "tier_selected" | "form_abandoned" | "error";
  userId?: string;
  email?: string;
  source: "pro_waitlist" | "trustypro_7step" | "trustypro_simple";
  tier?: string;
  referredBy?: string;
  duration?: number;
  tradesCount?: number;
  smsOptIn?: boolean;
  hasLicense?: boolean;
  formPosition?: number;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

export interface WaitlistMetrics {
  totalSignups: number;
  signupsBySource: Record<string, number>;
  averageFormCompletionTime: number;
  referralConversions: number;
  smsOptInRate: number;
  licenseUploadRate: number;
}

export interface ConversionFunnel {
  source: string;
  totalVisits: number;
  completedSignups: number;
  abandonedForms: number;
  conversionRate: number;
  averageTimeToComplete: number;
}

class AnalyticsTracker {
  async track(event: WaitlistAnalyticsEvent, ipAddress?: string, userAgent?: string) {
    try {
      const db = await getDb();
      if (!db) {
        log.error("Database unavailable for analytics tracking");
        return;
      }

      const eventData: InsertAnalyticsEvent = {
        eventType: event.type,
        source: event.source,
        email: event.email,
        referredBy: event.referredBy,
        tradesCount: event.tradesCount,
        smsOptIn: event.smsOptIn || false,
        hasLicense: event.hasLicense || false,
        duration: event.duration,
        formPosition: event.formPosition,
        ipAddress: ipAddress,
        userAgent: userAgent,
        metadata: event.metadata || {},
      };

      await db.insert(analyticsEvents).values(eventData);
      log.debug(`Analytics event persisted`, { type: event.type, source: event.source });
    } catch (err) {
      log.error("Failed to track analytics event", { error: err instanceof Error ? err.message : String(err) });
    }
  }

  async getMetrics(): Promise<WaitlistMetrics> {
    const db = await getDb();
    if (!db) {
      return {
        totalSignups: 0,
        signupsBySource: {},
        averageFormCompletionTime: 0,
        referralConversions: 0,
        smsOptInRate: 0,
        licenseUploadRate: 0,
      };
    }

    const allEvents = await db.select().from(analyticsEvents);
    const signups = allEvents.filter((e) => e.eventType === "signup");

    const signupsBySource: Record<string, number> = {};
    let totalDuration = 0;
    let completionCount = 0;
    let smsOptInCount = 0;
    let licenseUploadCount = 0;

    for (const event of signups) {
      signupsBySource[event.source] = (signupsBySource[event.source] || 0) + 1;
      if (event.duration) {
        totalDuration += event.duration;
        completionCount++;
      }
      if (event.smsOptIn) smsOptInCount++;
      if (event.hasLicense) licenseUploadCount++;
    }

    const referrals = allEvents.filter((e) => e.eventType === "referral").length;

    return {
      totalSignups: signups.length,
      signupsBySource,
      averageFormCompletionTime: completionCount > 0 ? totalDuration / completionCount : 0,
      referralConversions: referrals,
      smsOptInRate: signups.length > 0 ? (smsOptInCount / signups.length) * 100 : 0,
      licenseUploadRate: signups.length > 0 ? (licenseUploadCount / signups.length) * 100 : 0,
    };
  }

  async getConversionFunnels(): Promise<ConversionFunnel[]> {
    const db = await getDb();
    if (!db) return [];

    const allEvents = await db.select().from(analyticsEvents);
    const sources = ["pro_waitlist", "trustypro_7step", "trustypro_simple"];
    const funnels: ConversionFunnel[] = [];

    for (const source of sources) {
      const sourceEvents = allEvents.filter((e) => e.source === source);
      const completions = sourceEvents.filter((e) => e.eventType === "signup");
      const abandonments = sourceEvents.filter((e) => e.eventType === "form_abandoned");

      const durations = completions.filter((e) => e.duration).map((e) => e.duration || 0);
      const avgTime = durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : 0;

      funnels.push({
        source,
        totalVisits: sourceEvents.length,
        completedSignups: completions.length,
        abandonedForms: abandonments.length,
        conversionRate: sourceEvents.length > 0 ? (completions.length / sourceEvents.length) * 100 : 0,
        averageTimeToComplete: avgTime,
      });
    }

    return funnels;
  }

  async getSignupTrends(days: number = 30) {
    const db = await getDb();
    if (!db) return [];

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const events = await db
      .select({
        date: sql<string>`DATE(${analyticsEvents.createdAt})`,
        source: analyticsEvents.source,
        count: sql<number>`COUNT(*)`,
      })
      .from(analyticsEvents)
      .where(sql`${analyticsEvents.eventType} = 'signup' AND ${analyticsEvents.createdAt} >= ${cutoffDate}`)
      .groupBy(sql`DATE(${analyticsEvents.createdAt}), ${analyticsEvents.source}`);

    return events;
  }
}

export const waitlistAnalytics = new AnalyticsTracker();
