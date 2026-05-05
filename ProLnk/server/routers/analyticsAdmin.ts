import { z } from "zod";
import { adminProcedure, router } from "../_core/trpc";
import { waitlistAnalytics } from "../_core/analytics";
import { createLogger } from "../_core/logger";

const log = createLogger("AnalyticsAdmin");

export const analyticsAdminRouter = router({
  getMetrics: adminProcedure
    .query(async () => {
      return await waitlistAnalytics.getMetrics();
    }),

  getConversionFunnels: adminProcedure
    .query(async () => {
      return await waitlistAnalytics.getConversionFunnels();
    }),

  getSignupTrends: adminProcedure
    .input(z.object({ days: z.number().int().min(1).max(365).optional() }))
    .query(async ({ input }) => {
      const days = input?.days || 30;
      return await waitlistAnalytics.getSignupTrends(days);
    }),
});
