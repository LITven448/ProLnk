/**
 * Quick Quote Router — TrustyPro homeowner quick quote requests
 * Homeowners can request a free quote from any partner after weather events or any time.
 */
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";
import { sendQuoteRequestReceived, sendQuoteResponseNotification } from '../email';
import { getPartnerByUserId, getDb } from "../db";
import { quickQuoteRequests } from "../../drizzle/schema";
import { eq, or, and, desc, sql } from "drizzle-orm";

export const quickQuoteRouter = router({
  // Homeowner submits a quick quote request (logged in or guest)
  submit: publicProcedure
    .input(z.object({
      homeownerName: z.string().min(2).max(255),
      homeownerEmail: z.string().email(),
      homeownerPhone: z.string().optional(),
      propertyAddress: z.string().min(5).max(500),
      propertyZipCode: z.string().regex(/^\d{5}$/, 'Must be a 5-digit zip code'),
      serviceCategory: z.string().min(1).max(100),
      serviceDescription: z.string().min(10).max(2000),
      urgency: z.enum(['emergency', 'within_48h', 'this_week', 'flexible']).default('flexible'),
      isWeatherRelated: z.boolean().default(false),
      weatherEventType: z.string().optional(),
      photoUrls: z.array(z.string().url()).max(5).default([]),
      targetPartnerId: z.number().optional(),
      broadcastToZip: z.boolean().default(false),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      const userId = (ctx as any).user?.id ?? null;
      // Set expiry: emergency = 4h, within_48h = 48h, this_week = 7d, flexible = 14d
      const expiryHours: Record<string, number> = { emergency: 4, within_48h: 48, this_week: 168, flexible: 336 };
      const expiresAt = new Date(Date.now() + (expiryHours[input.urgency] ?? 336) * 3600 * 1000);
      const [result] = await db.insert(quickQuoteRequests).values({
        homeownerUserId: userId,
        homeownerName: input.homeownerName,
        homeownerEmail: input.homeownerEmail,
        homeownerPhone: input.homeownerPhone ?? null,
        propertyAddress: input.propertyAddress,
        propertyZipCode: input.propertyZipCode,
        serviceCategory: input.serviceCategory,
        serviceDescription: input.serviceDescription,
        urgency: input.urgency,
        isWeatherRelated: input.isWeatherRelated,
        weatherEventType: input.weatherEventType ?? null,
        photoUrls: input.photoUrls as any,
        targetPartnerId: input.targetPartnerId ?? null,
        broadcastToZip: input.broadcastToZip,
        status: 'pending',
        expiresAt,
      });
      // Notify owner of new quote request
      try {
        await notifyOwner({
          title: `New Quick Quote: ${input.serviceCategory}`,
          content: `${input.homeownerName} requested a quote for ${input.serviceCategory} at ${input.propertyAddress} (${input.propertyZipCode}). Urgency: ${input.urgency}. ${input.isWeatherRelated ? 'Weather-related.' : ''}`,
        });
      } catch (e) {
        console.warn('[QuickQuote] Failed to notify owner:', e);
      }
      // Send confirmation email to homeowner
      try {
        await sendQuoteRequestReceived({
          to: input.homeownerEmail,
          name: input.homeownerName,
          serviceCategory: input.serviceCategory,
          urgency: input.urgency,
          requestId: (result as any).insertId ?? 0,
        });
      } catch (e) {
        console.warn('[QuickQuote] Failed to send confirmation email:', e);
      }
      return { success: true, requestId: (result as any).insertId };
    }),

  // Partner: get quote requests in their service zip codes
  getForPartner: protectedProcedure.query(async ({ ctx }) => {
    const partner = await getPartnerByUserId(ctx.user.id);
    if (!partner) throw new TRPCError({ code: 'NOT_FOUND' });
    const db = await getDb();
    if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    const partnerZips: string[] = Array.isArray((partner as any).serviceZipCodes)
      ? (partner as any).serviceZipCodes
      : [];
    // Get requests targeting this partner directly OR in their zip codes
    const requests = await db.select().from(quickQuoteRequests)
      .where(
        and(
          or(
            eq(quickQuoteRequests.targetPartnerId, partner.id),
            and(
              eq(quickQuoteRequests.broadcastToZip, true),
              partnerZips.length > 0
                ? sql`${quickQuoteRequests.propertyZipCode} IN (${sql.join(partnerZips.map(z => sql`${z}`), sql`, `)})`
                : sql`1=0`
            )
          ),
          or(
            eq(quickQuoteRequests.status, 'pending'),
            eq(quickQuoteRequests.status, 'sent')
          )
        )
      )
      .orderBy(desc(quickQuoteRequests.createdAt))
      .limit(50);
    return requests;
  }),

  // Partner: respond to a quote request
  respond: protectedProcedure
    .input(z.object({
      requestId: z.number(),
      response: z.enum(['quoted', 'declined']),
      quotedAmount: z.number().positive().optional(),
      partnerResponse: z.string().max(1000).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const partner = await getPartnerByUserId(ctx.user.id);
      if (!partner) throw new TRPCError({ code: 'NOT_FOUND' });
      const db = await getDb();
      if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      await db.update(quickQuoteRequests).set({
        status: input.response,
        quotedAmount: input.quotedAmount ? String(input.quotedAmount) as any : null,
        partnerResponse: input.partnerResponse ?? null,
        respondedAt: new Date(),
      }).where(eq(quickQuoteRequests.id, input.requestId));
      // Notify homeowner when partner expresses interest
      if (input.response === 'quoted') {
        try {
          const [req] = await db.select().from(quickQuoteRequests)
            .where(eq(quickQuoteRequests.id, input.requestId)).limit(1);
          if (req?.homeownerEmail) {
            await sendQuoteResponseNotification({
              to: req.homeownerEmail,
              homeownerName: req.homeownerName,
              partnerName: (partner as any).businessName ?? (partner as any).ownerName ?? 'A Pro',
              serviceCategory: req.serviceCategory,
              message: input.partnerResponse ?? '',
              dashboardUrl: 'https://prolnk.io/my-home/quotes',
            });
          }
        } catch (e) {
          console.warn('[QuickQuote] Failed to send response notification:', e);
        }
      }
      return { success: true };
    }),

  // Admin: get all quote requests
  adminList: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== 'admin') throw new TRPCError({ code: 'FORBIDDEN' });
    const db = await getDb();
    if (!db) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    return db.select().from(quickQuoteRequests)
      .orderBy(desc(quickQuoteRequests.createdAt)).limit(200);
  }),
});
