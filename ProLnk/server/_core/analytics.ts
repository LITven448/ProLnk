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
}

export const analyticsTracker = new AnalyticsTracker();
