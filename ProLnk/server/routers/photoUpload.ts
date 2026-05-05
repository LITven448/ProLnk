import { protectedProcedure, router } from "@/server/_core/trpc";
import { db } from "@/server/_core/db";
import { z } from "zod";
import { S3Client, HeadObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION || "us-east-1",
  endpoint: process.env.AWS_S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const S3_BUCKET = process.env.AWS_S3_BUCKET || "prolnk-uploads";
const PRESIGNED_URL_EXPIRY = 30 * 60; // 30 minutes

interface PhotoScanJob {
  id: string;
  proUserId: string;
  address: string;
  fileKey: string;
  status: "pending" | "processing" | "complete" | "error";
  results?: {
    issues: string[];
    categories: string[];
    confidence: number;
  };
  createdAt: Date;
}

// In-memory store for now (Phase 5 will use database)
const photoScans = new Map<string, PhotoScanJob>();

export const photoUploadRouter = router({
  // Generate presigned S3 POST URL for direct upload
  generateUploadUrl: protectedProcedure
    .input(
      z.object({
        proId: z.number(),
        propertyAddress: z.string().min(5).max(500),
      })
    )
    .query(async ({ input }) => {
      const { proId, propertyAddress } = input;

      try {
        const uploadId = uuidv4();
        const fileKey = `photos/${proId}/${uploadId}`;

        const presigned = await createPresignedPost(s3Client, {
          Bucket: S3_BUCKET,
          Key: fileKey,
          Expires: PRESIGNED_URL_EXPIRY,
          Conditions: [
            ["content-length-range", 0, 10 * 1024 * 1024], // 10MB max
            ["starts-with", "$Content-Type", "image/"],
          ],
        });

        return {
          uploadUrl: presigned.url,
          fields: presigned.fields,
          fileKey,
          expiresIn: PRESIGNED_URL_EXPIRY,
          uploadId,
        };
      } catch (error) {
        console.error("Failed to generate presigned URL:", error);
        throw new Error("Failed to generate upload URL");
      }
    }),

  // Submit photo for AI scanning
  submitPhotoForScan: protectedProcedure
    .input(
      z.object({
        fileKey: z.string(),
        address: z.string(),
        proId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      const { fileKey, address, proId } = input;

      try {
        // Verify file exists in S3
        const headCmd = new HeadObjectCommand({
          Bucket: S3_BUCKET,
          Key: fileKey,
        });
        await s3Client.send(headCmd);

        // Create scan job
        const jobId = uuidv4();
        const scanJob: PhotoScanJob = {
          id: jobId,
          proUserId: proId.toString(),
          address,
          fileKey,
          status: "pending",
          createdAt: new Date(),
        };

        photoScans.set(jobId, scanJob);

        // Queue async processing (Phase 5 will use Bull/BullMQ)
        // For now, simulate processing
        setTimeout(() => {
          const job = photoScans.get(jobId);
          if (job) {
            job.status = "processing";

            // Simulate OpenAI Vision call
            setTimeout(() => {
              if (job) {
                job.status = "complete";
                job.results = {
                  issues: [
                    "Roof needs repair",
                    "Siding damaged",
                    "Gutters clogged",
                  ],
                  categories: ["roof", "exterior", "drainage"],
                  confidence: 0.92,
                };
              }
            }, 3000);
          }
        }, 1000);

        return {
          jobId,
          status: "pending",
          message: "Photo queued for scanning",
        };
      } catch (error) {
        console.error("Failed to submit photo for scan:", error);
        throw new Error("Failed to process photo");
      }
    }),

  // Get scan job status
  getScanStatus: protectedProcedure
    .input(z.object({ jobId: z.string() }))
    .query(async ({ input }) => {
      const { jobId } = input;
      const job = photoScans.get(jobId);

      if (!job) {
        throw new Error("Scan job not found");
      }

      return {
        jobId,
        status: job.status,
        createdAt: job.createdAt,
      };
    }),

  // Get scan results
  getScanResults: protectedProcedure
    .input(z.object({ jobId: z.string() }))
    .query(async ({ input }) => {
      const { jobId } = input;
      const job = photoScans.get(jobId);

      if (!job) {
        throw new Error("Scan job not found");
      }

      if (job.status !== "complete") {
        throw new Error(`Scan not ready. Status: ${job.status}`);
      }

      return {
        jobId,
        address: job.address,
        status: job.status,
        results: job.results,
        scannedAt: job.createdAt,
      };
    }),
});
