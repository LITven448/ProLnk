import { z } from "zod";
import { protectedProcedure } from "../_core/trpc";
import { router } from "../_core/trpc";
import { getDb } from "../db";
import { mediaLibrary } from "../../drizzle/schema";
import { eq, desc, and, sql, like } from "drizzle-orm";
import { storagePut } from "../storage";

export const mediaLibraryRouter = router({
  // Get media items with filtering
  getItems: protectedProcedure
    .input(z.object({
      category: z.enum(["job_photo", "before_after", "profile", "property", "document", "marketing", "ai_generated"]).optional(),
      uploaderType: z.enum(["partner", "homeowner", "admin", "ai"]).optional(),
      propertyId: z.number().optional(),
      jobId: z.number().optional(),
      limit: z.number().default(50),
      offset: z.number().default(0),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      const conditions = [];
      if (input.category) conditions.push(eq(mediaLibrary.category, input.category));
      if (input.uploaderType) conditions.push(eq(mediaLibrary.uploaderType, input.uploaderType));
      if (input.propertyId) conditions.push(eq(mediaLibrary.propertyId, input.propertyId));
      if (input.jobId) conditions.push(eq(mediaLibrary.jobId, input.jobId));

      const items = await db.select().from(mediaLibrary)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(desc(mediaLibrary.createdAt))
        .limit(input.limit)
        .offset(input.offset);
      return items;
    }),

  // Upload media item
  upload: protectedProcedure
    .input(z.object({
      fileName: z.string(),
      mimeType: z.string(),
      fileData: z.string(), // base64 encoded
      category: z.enum(["job_photo", "before_after", "profile", "property", "document", "marketing", "ai_generated"]).default("job_photo"),
      uploaderType: z.enum(["partner", "homeowner", "admin", "ai"]).default("partner"),
      propertyId: z.number().optional(),
      jobId: z.number().optional(),
      sessionId: z.number().optional(),
      tags: z.string().optional(),
      isPublic: z.boolean().default(false),
    }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      const buffer = Buffer.from(input.fileData, "base64");
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      const fileKey = `media/${ctx.user.id}/${input.category}/${Date.now()}-${randomSuffix}-${input.fileName}`;

      const { url } = await storagePut(fileKey, buffer, input.mimeType);

      const [result] = await db.insert(mediaLibrary).values({
        uploaderId: ctx.user.id,
        uploaderType: input.uploaderType,
        fileUrl: url,
        fileKey,
        fileName: input.fileName,
        mimeType: input.mimeType,
        fileSizeBytes: buffer.length,
        category: input.category,
        tags: input.tags,
        propertyId: input.propertyId,
        jobId: input.jobId,
        sessionId: input.sessionId,
        isPublic: input.isPublic,
      });

      return { success: true, id: result.insertId, url };
    }),

  // Get media stats
  getStats: protectedProcedure.query(async () => {
    const db = await getDb();
    const [stats] = await db.select({
      total: sql<number>`COUNT(*)`,
      totalSizeBytes: sql<number>`COALESCE(SUM(fileSizeBytes), 0)`,
      jobPhotos: sql<number>`SUM(CASE WHEN category = 'job_photo' THEN 1 ELSE 0 END)`,
      beforeAfter: sql<number>`SUM(CASE WHEN category = 'before_after' THEN 1 ELSE 0 END)`,
      aiGenerated: sql<number>`SUM(CASE WHEN category = 'ai_generated' THEN 1 ELSE 0 END)`,
      aiAnalyzed: sql<number>`SUM(CASE WHEN aiAnalyzed = true THEN 1 ELSE 0 END)`,
    }).from(mediaLibrary);
    return stats;
  }),

  // Delete media item
  deleteItem: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      await db.delete(mediaLibrary).where(eq(mediaLibrary.id, input.id));
      return { success: true };
    }),

  // Update AI analysis results
  updateAiAnalysis: protectedProcedure
    .input(z.object({
      id: z.number(),
      aiTags: z.string(),
      aiDescription: z.string(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      await db.update(mediaLibrary)
        .set({
          aiAnalyzed: true,
          aiTags: input.aiTags,
          aiDescription: input.aiDescription,
        })
        .where(eq(mediaLibrary.id, input.id));
      return { success: true };
    }),

  // Search media by tags
  searchByTags: protectedProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      const items = await db.select().from(mediaLibrary)
        .where(like(mediaLibrary.tags, `%${input.query}%`))
        .orderBy(desc(mediaLibrary.createdAt))
        .limit(50);
      return items;
    }),
});
