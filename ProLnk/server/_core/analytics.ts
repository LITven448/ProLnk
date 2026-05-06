interface AnalyticsEvent {
  type: string;
  source?: string;
  [key: string]: any;
}

class AnalyticsTracker {
  async track(event: AnalyticsEvent, ipAddress?: string, userAgent?: string): Promise<void> {
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics]", event);
    }
  }

  async getMetrics(): Promise<any> {
    return { pro: 0, home: 0, total: 0 };
  }

  async getConversionFunnels(): Promise<any> {
    return [];
  }

  async getSignupTrends(days: number): Promise<any> {
    return [];
  }
}

export const analyticsTracker = new AnalyticsTracker();
export const waitlistAnalytics = analyticsTracker;
