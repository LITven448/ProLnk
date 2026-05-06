/**
 * Photo Pipeline Router
 * 
 * Handles the TrustyPro photo analysis pipeline:
 * - Photo session creation and management
 * - Photo upload to S3
 * - AI analysis trigger (quality check → classification → analysis → segmentation)
 * - Home Health Vault score aggregation
 */
import { z } from "zod";
import { router, protectedProcedure, adminProcedure } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { sql, eq, desc, and } from "drizzle-orm";
import { photoSessions, sessionPhotos, homeHealthVaultScores } from "../../drizzle/schema";
import { storagePut } from "../storage";

async function getDb() {
  const { getDb: gd } = await import("../db");
  return gd();
}

export const photoPipelineRouter = router({
  // ── Create a new photo session ──────────────────────────────────────────────
  createSession: protectedProcedure
    .input(z.object({
      propertyId: z.number().optional(),
      propertyAddress: z.string().optional(),
      sessionType: z.enum(["homeowner_scan", "pro_job_photo", "storm_assessment"]).default("homeowner_scan"),
      roomArea: z.string(),
      roomAreaCustom: z.string().optional(),
      platform: z.enum(["prolnk", "trustypro"]).default("trustypro"),
      photoType: z.enum(["before", "after", "both", "reference"]).default("both"),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const [result] = await db.insert(photoSessions).values({
        userId: ctx.user.id,
        sessionType: input.sessionType,
        roomArea: input.roomArea,
        roomAreaCustom: input.roomAreaCustom ?? null,
        platform: input.platform,
        photoType: input.photoType,
        propertyId: input.propertyId ?? null,
        analysisStatus: "pending",
      }).$returningId();

      return { sessionId: result.id };
    }),

  // ── Upload a photo to a session ─────────────────────────────────────────────
  uploadPhoto: protectedProcedure
    .input(z.object({
      sessionId: z.number(),
      photoBase64: z.string(),
      fileName: z.string(),
      mimeType: z.string().default("image/jpeg"),
      isReference: z.boolean().default(false),
      roomLabel: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Verify session belongs to user
      const [session] = await db.select().from(photoSessions)
        .where(and(eq(photoSessions.id, input.sessionId), eq(photoSessions.userId, ctx.user.id)))
        .limit(1);
      if (!session) throw new TRPCError({ code: "NOT_FOUND", message: "Session not found" });

      // Upload to S3
      const buffer = Buffer.from(input.photoBase64, "base64");
      const suffix = Math.random().toString(36).substring(2, 8);
      const key = `photo-sessions/${input.sessionId}/${input.fileName}-${suffix}`;
      const { url } = await storagePut(key, buffer, input.mimeType);

      // Save photo record
      const [photo] = await db.insert(sessionPhotos).values({
        sessionId: input.sessionId,
        photoUrl: url,
        roomType: session.roomArea,
        roomLabel: input.roomLabel ?? session.roomArea,
        analysisStatus: "pending",
      }).$returningId();

      // Update session photo count
      await db.execute(
        sql`UPDATE photoSessions SET photoCount = photoCount + 1 WHERE id = ${input.sessionId}`
      );

      // If reference photo, update session
      if (input.isReference) {
        await db.execute(
          sql`UPDATE photoSessions SET referencePhotoUrl = ${url}, referencePhotoKey = ${key} WHERE id = ${input.sessionId}`
        );
      }

      return { photoId: photo.id, url };
    }),

  // ── Get sessions for the current user ───────────────────────────────────────
  getMySessions: protectedProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(20),
      offset: z.number().min(0).default(0),
    }).optional())
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];
      const limit = input?.limit ?? 20;
      const offset = input?.offset ?? 0;

      const sessions = await db.select().from(photoSessions)
        .where(eq(photoSessions.userId, ctx.user.id))
        .orderBy(desc(photoSessions.createdAt))
        .limit(limit)
        .offset(offset);

      return sessions;
    }),

  // ── Get photos for a session ────────────────────────────────────────────────
  getSessionPhotos: protectedProcedure
    .input(z.object({ sessionId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];

      // Verify session belongs to user
      const [session] = await db.select().from(photoSessions)
        .where(and(eq(photoSessions.id, input.sessionId), eq(photoSessions.userId, ctx.user.id)))
        .limit(1);
      if (!session) throw new TRPCError({ code: "NOT_FOUND", message: "Session not found" });

      const photos = await db.select().from(sessionPhotos)
        .where(eq(sessionPhotos.sessionId, input.sessionId))
        .orderBy(desc(sessionPhotos.createdAt));

      return photos;
    }),

  // ── Trigger AI analysis on a session ────────────────────────────────────────
  triggerAnalysis: protectedProcedure
    .input(z.object({ sessionId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      // Verify session belongs to user and has photos
      const [session] = await db.select().from(photoSessions)
        .where(and(eq(photoSessions.id, input.sessionId), eq(photoSessions.userId, ctx.user.id)))
        .limit(1);
      if (!session) throw new TRPCError({ code: "NOT_FOUND", message: "Session not found" });
      if (session.photoCount === 0) throw new TRPCError({ code: "BAD_REQUEST", message: "No photos in session" });

      // Update status to processing
      await db.execute(
        sql`UPDATE photoSessions SET analysisStatus = 'processing' WHERE id = ${input.sessionId}`
      );

      // In production, this would trigger the 8-stage pipeline via n8n or a background job
      // For now, mark as queued and return
      return { status: "queued", message: "Analysis queued. You will be notified when results are ready." };
    }),

  // ── Get Home Health Vault scores ────────────────────────────────────────────
  getVaultScores: protectedProcedure
    .query(async ({ ctx }) => {
      const db = await getDb();
      if (!db) return null;

      const [vault] = await db.select().from(homeHealthVaultScores)
        .where(eq(homeHealthVaultScores.userId, ctx.user.id))
        .limit(1);

      return vault ?? null;
    }),

  // ── Admin: Get all sessions with stats ──────────────────────────────────────
  adminGetSessions: adminProcedure
    .input(z.object({
      status: z.string().optional(),
      limit: z.number().min(1).max(100).default(50),
      offset: z.number().min(0).default(0),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { sessions: [], total: 0 };
      const limit = input?.limit ?? 50;
      const offset = input?.offset ?? 0;

      const sessions = await db.select().from(photoSessions)
        .orderBy(desc(photoSessions.createdAt))
        .limit(limit)
        .offset(offset);

      const [countResult] = await db.execute(
        sql`SELECT COUNT(*) as total FROM photoSessions`
      ) as any;
      const total = Number(countResult?.[0]?.total ?? 0);

      return { sessions, total };
    }),

  // ── Admin: Get pipeline stats ───────────────────────────────────────────────
  adminGetPipelineStats: adminProcedure
    .query(async () => {
      const db = await getDb();
      if (!db) return { total: 0, pending: 0, processing: 0, complete: 0, failed: 0, avgPhotosPerSession: 0 };

      const [stats] = await db.execute(sql`
        SELECT
          COUNT(*) as total,
          SUM(CASE WHEN analysisStatus = 'pending' THEN 1 ELSE 0 END) as pending,
          SUM(CASE WHEN analysisStatus = 'processing' THEN 1 ELSE 0 END) as processing,
          SUM(CASE WHEN analysisStatus = 'complete' THEN 1 ELSE 0 END) as complete,
          SUM(CASE WHEN analysisStatus = 'failed' THEN 1 ELSE 0 END) as failed,
          ROUND(AVG(photoCount), 1) as avgPhotosPerSession
        FROM photoSessions
      `) as any;

      const row = stats?.[0] ?? {};
      return {
        total: Number(row.total ?? 0),
        pending: Number(row.pending ?? 0),
        processing: Number(row.processing ?? 0),
        complete: Number(row.complete ?? 0),
        failed: Number(row.failed ?? 0),
        avgPhotosPerSession: Number(row.avgPhotosPerSession ?? 0),
      };
    }),
});
