import { z } from "zod";
import { router, protectedProcedure } from "../_core/trpc";
import { getDb } from "../db";
import {
  propertyProfiles,
  partnerPerformanceScores,
  aiTrainingDataset,
  funnelEvents,
  referralGraph,
  geographicDensity,
  acceptanceSignals,
  opportunities,
  partners,
  jobs,
} from "../../drizzle/schema";
import { eq, desc, sql, and, gte, count, avg, sum } from "drizzle-orm";

export const dataIntelligenceRouter = router({
  // -- Asset 1: Property Profiles ----------------------------------------------
  getPropertyProfileStats: protectedProcedure.query(async () => {
    const db = await getDb();
      if (!db) throw new Error("Database unavailable");
    const [total] = await db.select({ count: count() }).from(propertyProfiles);
    const [withOffers] = await db
      .select({ count: count() })
      .from(propertyProfiles)
      .where(sql`totalOpportunitiesDetected > 0`);
    const [converted] = await db
      .select({ count: count() })
      .from(propertyProfiles)
      .where(sql`totalOffersAccepted > 0`);
    const [revenue] = await db
      .select({ total: sum(propertyProfiles.totalRevenueGenerated) })
      .from(propertyProfiles);
    return {
      totalProfiles: total.count,
      profilesWithDetections: withOffers.count,
      profilesWithConversions: converted.count,
      totalRevenue: Number(revenue.total ?? 0),
    };
  }),

  getTopPropertyProfiles: protectedProcedure
    .input(z.object({ limit: z.number().default(10) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      return db
        .select()
        .from(propertyProfiles)
        .orderBy(desc(propertyProfiles.totalRevenueGenerated))
        .limit(input.limit);
    }),

  // -- Asset 2: Partner Performance Scores -------------------------------------
  getPartnerPerformanceStats: protectedProcedure.query(async () => {
    const db = await getDb();
      if (!db) throw new Error("Database unavailable");
    const [avgClose] = await db
      .select({ avg: avg(partnerPerformanceScores.leadCloseRate) })
      .from(partnerPerformanceScores);
    const [avgHealth] = await db
      .select({ avg: avg(partnerPerformanceScores.healthScore) })
      .from(partnerPerformanceScores);
    const [highRisk] = await db
      .select({ count: count() })
      .from(partnerPerformanceScores)
      .where(eq(partnerPerformanceScores.churnRisk, "high"));
    const [totalCommissions] = await db
      .select({ total: sum(partnerPerformanceScores.totalCommissionsEarned) })
      .from(partnerPerformanceScores);
    return {
      avgCloseRate: Number(avgClose.avg ?? 0),
      avgHealthScore: Number(avgHealth.avg ?? 50),
      highChurnRiskCount: highRisk.count,
      totalCommissionsTracked: Number(totalCommissions.total ?? 0),
    };
  }),

  getPartnerLeaderboard: protectedProcedure
    .input(z.object({ limit: z.number().default(10) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      return db
        .select({
          score: partnerPerformanceScores,
          partner: {
            id: partners.id,
            businessName: partners.businessName,
            businessType: partners.businessType,
            tier: partners.tier,
          },
        })
        .from(partnerPerformanceScores)
        .leftJoin(partners, eq(partnerPerformanceScores.partnerId, partners.id))
        .orderBy(desc(partnerPerformanceScores.healthScore))
        .limit(input.limit);
    }),

  upsertPartnerPerformanceScore: protectedProcedure
    .input(z.object({ partnerId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      // Compute score from live data
      const partnerOpps = await db
        .select()
        .from(opportunities)
        .where(eq(opportunities.receivingPartnerId, input.partnerId));

      const totalReceived = partnerOpps.length;
      const totalAccepted = partnerOpps.filter((o: typeof partnerOpps[0]) => o.status === "accepted" || o.status === "converted").length;
      const totalClosed = partnerOpps.filter((o: typeof partnerOpps[0]) => o.status === "converted").length;
      const totalDeclined = partnerOpps.filter((o: typeof partnerOpps[0]) => o.status === "declined").length;

      const leadAcceptanceRate = totalReceived > 0 ? totalAccepted / totalReceived : 0;
      const leadCloseRate = totalAccepted > 0 ? totalClosed / totalAccepted : 0;

      const closedOpps = partnerOpps.filter((o: typeof partnerOpps[0]) => o.actualJobValue);
      const avgJobValue =
        closedOpps.length > 0
          ? closedOpps.reduce((s: number, o: typeof partnerOpps[0]) => s + Number(o.actualJobValue ?? 0), 0) / closedOpps.length
          : 0;

      const totalJobValueClosed = closedOpps.reduce((s: number, o: typeof partnerOpps[0]) => s + Number(o.actualJobValue ?? 0), 0);

      // Sent referrals
      const sentOpps = await db
        .select()
        .from(opportunities)
        .where(eq(opportunities.sourcePartnerId, input.partnerId));
      const totalReferralsSent = sentOpps.length;
      const totalReferralsConverted = sentOpps.filter((o: typeof sentOpps[0]) => o.status === "converted").length;
      const referralConversionRate = totalReferralsSent > 0 ? totalReferralsConverted / totalReferralsSent : 0;

      // Health score (0-100)
      const healthScore = Math.min(
        100,
        Math.round(
          leadAcceptanceRate * 30 +
            leadCloseRate * 30 +
            Math.min(referralConversionRate * 20, 20) +
            (totalJobValueClosed > 10000 ? 20 : (totalJobValueClosed / 10000) * 20)
        )
      );

      const churnRisk = healthScore < 30 ? "high" : healthScore < 60 ? "medium" : "low";

      await db
        .insert(partnerPerformanceScores)
        .values({
          partnerId: input.partnerId,
          totalLeadsReceived: totalReceived,
          totalLeadsAccepted: totalAccepted,
          totalLeadsDeclined: totalDeclined,
          totalLeadsClosed: totalClosed,
          leadAcceptanceRate: String(leadAcceptanceRate.toFixed(4)),
          leadCloseRate: String(leadCloseRate.toFixed(4)),
          avgJobValue: String(avgJobValue.toFixed(2)),
          totalJobValueClosed: String(totalJobValueClosed.toFixed(2)),
          totalReferralsSent,
          totalReferralsConverted,
          referralConversionRate: String(referralConversionRate.toFixed(4)),
          healthScore,
          churnRisk,
        })
        .onDuplicateKeyUpdate({
          set: {
            totalLeadsReceived: totalReceived,
            totalLeadsAccepted: totalAccepted,
            totalLeadsDeclined: totalDeclined,
            totalLeadsClosed: totalClosed,
            leadAcceptanceRate: String(leadAcceptanceRate.toFixed(4)),
            leadCloseRate: String(leadCloseRate.toFixed(4)),
            avgJobValue: String(avgJobValue.toFixed(2)),
            totalJobValueClosed: String(totalJobValueClosed.toFixed(2)),
            totalReferralsSent,
            totalReferralsConverted,
            referralConversionRate: String(referralConversionRate.toFixed(4)),
            healthScore,
            churnRisk,
            calculatedAt: new Date(),
          },
        });

      return { success: true, healthScore, churnRisk };
    }),

  // -- Asset 3: AI Training Dataset --------------------------------------------
  getAiDatasetStats: protectedProcedure.query(async () => {
    const db = await getDb();
      if (!db) throw new Error("Database unavailable");
    const [total] = await db.select({ count: count() }).from(aiTrainingDataset);
    const [validated] = await db
      .select({ count: count() })
      .from(aiTrainingDataset)
      .where(eq(aiTrainingDataset.validationOutcome, "validated"));
    const [approved] = await db
      .select({ count: count() })
      .from(aiTrainingDataset)
      .where(eq(aiTrainingDataset.approvedForTraining, true));
    const [avgConf] = await db
      .select({ avg: avg(aiTrainingDataset.aiConfidenceScore) })
      .from(aiTrainingDataset);

    // Detection type breakdown
    const byType = await db
      .select({
        type: aiTrainingDataset.detectionType,
        count: count(),
      })
      .from(aiTrainingDataset)
      .groupBy(aiTrainingDataset.detectionType)
      .orderBy(desc(count()))
      .limit(10);

    return {
      totalRecords: total.count,
      validatedRecords: validated.count,
      approvedForTraining: approved.count,
      avgConfidenceScore: Number(avgConf.avg ?? 0),
      topDetectionTypes: byType,
      // Milestone thresholds
      milestones: {
        proofOfConcept: { target: 1000, reached: total.count >= 1000 },
        earlyMoat: { target: 10000, reached: total.count >= 10000 },
        strongMoat: { target: 50000, reached: total.count >= 50000 },
        acquisitionAsset: { target: 100000, reached: total.count >= 100000 },
      },
    };
  }),

  recordAiTrainingEntry: protectedProcedure
    .input(
      z.object({
        jobId: z.number().optional(),
        opportunityId: z.number().optional(),
        beforePhotoUrl: z.string().optional(),
        afterPhotoUrl: z.string().optional(),
        detectionType: z.string(),
        detectionCategory: z.string(),
        aiConfidenceScore: z.number().min(0).max(1).optional(),
        propertyZip: z.string().optional(),
        propertyState: z.string().optional(),
        capturedMonth: z.number().min(1).max(12).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const month = input.capturedMonth ?? new Date().getMonth() + 1;
      const season =
        month >= 3 && month <= 5
          ? "spring"
          : month >= 6 && month <= 8
          ? "summer"
          : month >= 9 && month <= 11
          ? "fall"
          : "winter";

      const [record] = await db
        .insert(aiTrainingDataset)
        .values({
          ...input,
          aiConfidenceScore: input.aiConfidenceScore ? String(input.aiConfidenceScore) : undefined,
          capturedMonth: month,
          capturedSeason: season,
        })
        .$returningId();

      return { id: record.id };
    }),

  // -- Asset 4: Conversion Funnel -----------------------------------------------
  getFunnelStats: protectedProcedure.query(async () => {
    const db = await getDb();
      if (!db) throw new Error("Database unavailable");
    const stages = [
      "ai_detected",
      "admin_approved",
      "notification_sent",
      "notification_opened",
      "page_visited",
      "offer_clicked",
      "offer_accepted",
      "job_completed",
      "commission_paid",
    ] as const;

    const counts = await Promise.all(
      stages.map(async (stage) => {
        const [result] = await db
          .select({ count: count() })
          .from(funnelEvents)
          .where(eq(funnelEvents.eventType, stage));
        return { stage, count: result.count };
      })
    );

    // Conversion rates between stages
    const funnelWithRates = counts.map((item, i) => ({
      ...item,
      conversionFromPrevious:
        i === 0 || counts[i - 1].count === 0
          ? 1
          : item.count / counts[i - 1].count,
    }));

    // Channel breakdown for sent notifications
    const byChannel = await db
      .select({
        channel: funnelEvents.channel,
        count: count(),
      })
      .from(funnelEvents)
      .where(eq(funnelEvents.eventType, "notification_sent"))
      .groupBy(funnelEvents.channel);

    return {
      funnel: funnelWithRates,
      channelBreakdown: byChannel,
      overallConversionRate:
        counts[0].count > 0 ? counts[6].count / counts[0].count : 0,
    };
  }),

  recordFunnelEvent: protectedProcedure
    .input(
      z.object({
        opportunityId: z.number(),
        propertyProfileId: z.number().optional(),
        partnerId: z.number().optional(),
        eventType: z.enum([
          "ai_detected",
          "admin_approved",
          "offer_composed",
          "notification_sent",
          "notification_opened",
          "page_visited",
          "offer_clicked",
          "offer_accepted",
          "offer_declined",
          "job_booked",
          "job_completed",
          "commission_paid",
        ]),
        channel: z.enum(["sms", "email", "push", "in_app"]).optional(),
        offerAmount: z.number().optional(),
        discountPct: z.number().optional(),
        deviceType: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      // Find previous event for this opportunity to calculate velocity
      const [prevEvent] = await db
        .select()
        .from(funnelEvents)
        .where(eq(funnelEvents.opportunityId, input.opportunityId))
        .orderBy(desc(funnelEvents.occurredAt))
        .limit(1);

      const secondsFromPrevious = prevEvent
        ? Math.round((Date.now() - prevEvent.occurredAt.getTime()) / 1000)
        : undefined;

      const [record] = await db
        .insert(funnelEvents)
        .values({
          ...input,
          offerAmount: input.offerAmount ? String(input.offerAmount) : undefined,
          discountPct: input.discountPct ? String(input.discountPct) : undefined,
          secondsFromPreviousEvent: secondsFromPrevious,
        })
        .$returningId();

      return { id: record.id };
    }),

  // -- Asset 5: Referral Graph --------------------------------------------------
  getReferralGraphStats: protectedProcedure.query(async () => {
    const db = await getDb();
      if (!db) throw new Error("Database unavailable");
    const [totalEdges] = await db.select({ count: count() }).from(referralGraph);
    const [totalValue] = await db
      .select({ total: sum(referralGraph.totalJobValue) })
      .from(referralGraph);
    const [avgStrength] = await db
      .select({ avg: avg(referralGraph.relationshipStrength) })
      .from(referralGraph);

    // Top trade pairs
    const topPairs = await db
      .select({
        sourceTrade: referralGraph.sourceTrade,
        receivingTrade: referralGraph.receivingTrade,
        totalReferrals: sum(referralGraph.totalReferrals),
        totalValue: sum(referralGraph.totalJobValue),
      })
      .from(referralGraph)
      .groupBy(referralGraph.sourceTrade, referralGraph.receivingTrade)
      .orderBy(desc(sum(referralGraph.totalJobValue)))
      .limit(10);

    return {
      totalRelationships: totalEdges.count,
      totalNetworkValue: Number(totalValue.total ?? 0),
      avgRelationshipStrength: Number(avgStrength.avg ?? 0),
      topTradePairs: topPairs,
    };
  }),

  upsertReferralGraphEdge: protectedProcedure
    .input(
      z.object({
        sourcePartnerId: z.number(),
        receivingPartnerId: z.number(),
        sourceTrade: z.string().optional(),
        receivingTrade: z.string().optional(),
        city: z.string().optional(),
        zip: z.string().optional(),
        jobValue: z.number().optional(),
        commissionPaid: z.number().optional(),
        converted: z.boolean().default(false),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      // Check if edge exists
      const [existing] = await db
        .select()
        .from(referralGraph)
        .where(
          and(
            eq(referralGraph.sourcePartnerId, input.sourcePartnerId),
            eq(referralGraph.receivingPartnerId, input.receivingPartnerId)
          )
        )
        .limit(1);

      if (existing) {
        const newTotal = existing.totalReferrals + 1;
        const newConverted = existing.totalConverted + (input.converted ? 1 : 0);
        const newValue = Number(existing.totalJobValue ?? 0) + (input.jobValue ?? 0);
        const newCommission = Number(existing.totalCommissionPaid ?? 0) + (input.commissionPaid ?? 0);
        const conversionRate = newTotal > 0 ? newConverted / newTotal : 0;
        const strength = Math.min(100, Math.round(conversionRate * 60 + Math.min(newTotal * 2, 40)));

        await db
          .update(referralGraph)
          .set({
            totalReferrals: newTotal,
            totalConverted: newConverted,
            totalJobValue: String(newValue.toFixed(2)),
            totalCommissionPaid: String(newCommission.toFixed(2)),
            conversionRate: String(conversionRate.toFixed(4)),
            relationshipStrength: strength,
            lastReferralAt: new Date(),
          })
          .where(eq(referralGraph.id, existing.id));
      } else {
        await db.insert(referralGraph).values({
          sourcePartnerId: input.sourcePartnerId,
          receivingPartnerId: input.receivingPartnerId,
          sourceTrade: input.sourceTrade,
          receivingTrade: input.receivingTrade,
          city: input.city,
          zip: input.zip,
          totalReferrals: 1,
          totalConverted: input.converted ? 1 : 0,
          totalJobValue: String((input.jobValue ?? 0).toFixed(2)),
          totalCommissionPaid: String((input.commissionPaid ?? 0).toFixed(2)),
          conversionRate: input.converted ? "1.0000" : "0.0000",
          relationshipStrength: input.converted ? 10 : 5,
          firstReferralAt: new Date(),
          lastReferralAt: new Date(),
        });
      }

      return { success: true };
    }),

  // -- Asset 6: Geographic Density ----------------------------------------------
  getGeographicDensityStats: protectedProcedure.query(async () => {
    const db = await getDb();
      if (!db) throw new Error("Database unavailable");
    // Get latest snapshot per zip
    const latestSnapshots = await db
      .select()
      .from(geographicDensity)
      .orderBy(desc(geographicDensity.snapshotDate))
      .limit(100);

    const totalZips = new Set(latestSnapshots.map((s: typeof latestSnapshots[0]) => s.zip)).size;
    const totalPartnersCovered = latestSnapshots.reduce((s: number, r: typeof latestSnapshots[0]) => s + (r.totalActivePartners ?? 0), 0);
    const highGapZips = latestSnapshots.filter((s: typeof latestSnapshots[0]) => (s.coverageGapScore ?? 0) > 70);

    return {
      totalZipsCovered: totalZips,
      totalPartnersCovered,
      highGapZipCount: highGapZips.length,
      topGapZips: highGapZips
        .sort((a: typeof latestSnapshots[0], b: typeof latestSnapshots[0]) => (b.coverageGapScore ?? 0) - (a.coverageGapScore ?? 0))
        .slice(0, 5),
    };
  }),

  // -- Asset 7: Acceptance Signals ----------------------------------------------
  getAcceptanceSignalStats: protectedProcedure.query(async () => {
    const db = await getDb();
      if (!db) throw new Error("Database unavailable");
    const [total] = await db.select({ count: count() }).from(acceptanceSignals);
    const [accepted] = await db
      .select({ count: count() })
      .from(acceptanceSignals)
      .where(eq(acceptanceSignals.outcome, "accepted"));
    const [declined] = await db
      .select({ count: count() })
      .from(acceptanceSignals)
      .where(eq(acceptanceSignals.outcome, "declined"));
    const [avgDiscount] = await db
      .select({ avg: avg(acceptanceSignals.discountPct) })
      .from(acceptanceSignals)
      .where(eq(acceptanceSignals.outcome, "accepted"));
    const [avgResponseTime] = await db
      .select({ avg: avg(acceptanceSignals.timeToRespondHours) })
      .from(acceptanceSignals)
      .where(eq(acceptanceSignals.outcome, "accepted"));

    // By trade
    const byTrade = await db
      .select({
        trade: acceptanceSignals.tradeCategory,
        total: count(),
        accepted: sql<number>`SUM(CASE WHEN outcome = 'accepted' THEN 1 ELSE 0 END)`,
      })
      .from(acceptanceSignals)
      .groupBy(acceptanceSignals.tradeCategory)
      .orderBy(desc(count()))
      .limit(10);

    return {
      totalSignals: total.count,
      acceptedCount: accepted.count,
      declinedCount: declined.count,
      overallAcceptanceRate: total.count > 0 ? accepted.count / total.count : 0,
      avgAcceptedDiscountPct: Number(avgDiscount.avg ?? 0),
      avgResponseTimeHours: Number(avgResponseTime.avg ?? 0),
      byTrade,
    };
  }),

  recordAcceptanceSignal: protectedProcedure
    .input(
      z.object({
        opportunityId: z.number(),
        propertyProfileId: z.number().optional(),
        tradeCategory: z.string(),
        offerAmount: z.number().optional(),
        standardMarketPrice: z.number().optional(),
        discountPct: z.number().optional(),
        outcome: z.enum(["accepted", "declined", "ignored", "expired"]),
        timeToRespondHours: z.number().optional(),
        deliveryChannel: z.enum(["sms", "email", "push", "in_app"]).optional(),
        propertyZip: z.string().optional(),
        propertyCity: z.string().optional(),
        propertyState: z.string().optional(),
        isFirstOffer: z.boolean().default(true),
        priorOfferCount: z.number().default(0),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const now = new Date();
      const month = now.getMonth() + 1;
      const season =
        month >= 3 && month <= 5
          ? "spring"
          : month >= 6 && month <= 8
          ? "summer"
          : month >= 9 && month <= 11
          ? "fall"
          : "winter";

      const [record] = await db
        .insert(acceptanceSignals)
        .values({
          ...input,
          offerAmount: input.offerAmount ? String(input.offerAmount) : undefined,
          standardMarketPrice: input.standardMarketPrice ? String(input.standardMarketPrice) : undefined,
          discountPct: input.discountPct ? String(input.discountPct) : undefined,
          timeToRespondHours: input.timeToRespondHours ? String(input.timeToRespondHours) : undefined,
          deliveryHourOfDay: now.getHours(),
          deliveryDayOfWeek: now.getDay(),
          deliveryMonth: month,
          deliverySeason: season,
        })
        .$returningId();

      return { id: record.id };
    }),

  // -- Combined Data Asset Summary (for dashboard) ------------------------------
  getDataAssetSummary: protectedProcedure.query(async () => {
    const db = await getDb();
      if (!db) throw new Error("Database unavailable");
    const [profiles] = await db.select({ count: count() }).from(propertyProfiles);
    const [scores] = await db.select({ count: count() }).from(partnerPerformanceScores);
    const [training] = await db.select({ count: count() }).from(aiTrainingDataset);
    const [funnel] = await db.select({ count: count() }).from(funnelEvents);
    const [graph] = await db.select({ count: count() }).from(referralGraph);
    const [density] = await db.select({ count: count() }).from(geographicDensity);
    const [signals] = await db.select({ count: count() }).from(acceptanceSignals);

    // Estimate data asset value based on record counts
    const trainingValue = Math.min(training.count * 0.5, 20000000); // $0.50/record up to $20M
    const profileValue = Math.min(profiles.count * 200, 30000000); // $200/profile up to $30M
    const signalValue = Math.min(signals.count * 50, 5000000); // $50/signal up to $5M

    return {
      assets: [
        {
          id: 1,
          name: "Homeowner Property Profiles",
          records: profiles.count,
          estimatedValue: profileValue,
          milestone: profiles.count >= 10000 ? "acquisition_asset" : profiles.count >= 1000 ? "strong_moat" : profiles.count >= 100 ? "early_moat" : "building",
          description: "Structured property records with service history and offer outcomes",
        },
        {
          id: 2,
          name: "Partner Performance Scores",
          records: scores.count,
          estimatedValue: scores.count * 500,
          milestone: scores.count >= 500 ? "strong_moat" : scores.count >= 100 ? "early_moat" : "building",
          description: "Proprietary quality scores for every partner in the network",
        },
        {
          id: 3,
          name: "AI Training Dataset",
          records: training.count,
          estimatedValue: trainingValue,
          milestone: training.count >= 100000 ? "acquisition_asset" : training.count >= 10000 ? "strong_moat" : training.count >= 1000 ? "early_moat" : "building",
          description: "Labeled photo pairs for AI model training and improvement",
        },
        {
          id: 4,
          name: "Conversion Funnel Events",
          records: funnel.count,
          estimatedValue: funnel.count * 10,
          milestone: funnel.count >= 50000 ? "acquisition_asset" : funnel.count >= 5000 ? "strong_moat" : "building",
          description: "Every step of the offer funnel tracked with timestamps",
        },
        {
          id: 5,
          name: "Referral Graph",
          records: graph.count,
          estimatedValue: graph.count * 1000,
          milestone: graph.count >= 10000 ? "strong_moat" : graph.count >= 1000 ? "early_moat" : "building",
          description: "Partner-to-partner referral relationships and performance",
        },
        {
          id: 6,
          name: "Geographic Density Snapshots",
          records: density.count,
          estimatedValue: density.count * 100,
          milestone: density.count >= 5000 ? "strong_moat" : "building",
          description: "Weekly coverage density by zip code and trade",
        },
        {
          id: 7,
          name: "Homeowner Acceptance Signals",
          records: signals.count,
          estimatedValue: signalValue,
          milestone: signals.count >= 10000 ? "acquisition_asset" : signals.count >= 1000 ? "strong_moat" : "building",
          description: "Price sensitivity and acceptance pattern data per offer",
        },
      ],
      totalEstimatedDataValue: profileValue + trainingValue + signalValue + scores.count * 500 + graph.count * 1000,
    };
  }),
});
