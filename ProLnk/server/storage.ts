/**
 * File Storage — AWS S3 (direct, no Manus Forge proxy)
 *
 * Replaces the Manus Forge storage proxy with direct S3.
 * Objects are stored with public-read ACL so photo URLs work directly in <img> tags.
 * Optionally wrap with CloudFront by setting S3_CDN_BASE_URL.
 *
 * Required env vars:
 *   AWS_ACCESS_KEY_ID
 *   AWS_SECRET_ACCESS_KEY
 *   AWS_REGION          (default: us-east-1)
 *   S3_BUCKET_NAME
 *   S3_CDN_BASE_URL     (optional — CloudFront or custom CDN prefix)
 */

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const REGION = process.env.AWS_REGION ?? "us-east-1";
const BUCKET = process.env.S3_BUCKET_NAME ?? "";
const CDN_BASE = (process.env.S3_CDN_BASE_URL ?? "").replace(/\/+$/, "");

let _s3: S3Client | null = null;

function getS3(): S3Client {
  if (!_s3) {
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      throw new Error("AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set");
    }
    if (!BUCKET) {
      throw new Error("S3_BUCKET_NAME must be set");
    }
    _s3 = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }
  return _s3;
}

function normalizeKey(relKey: string): string {
  return relKey.replace(/^\/+/, "");
}

/** Public URL for an object. Uses CDN base if configured, otherwise direct S3 URL. */
function publicUrl(key: string): string {
  if (CDN_BASE) {
    return `${CDN_BASE}/${key}`;
  }
  return `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;
}

/**
 * Upload a file to S3. Returns the object key and a publicly accessible URL.
 * Files are stored as public-read. Use S3_CDN_BASE_URL to serve via CloudFront.
 */
export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream"
): Promise<{ key: string; url: string }> {
  const s3 = getS3();
  const key = normalizeKey(relKey);
  const body = typeof data === "string" ? Buffer.from(data) : data;

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
      // public-read so photo URLs work directly without presigned URLs
      ACL: "public-read",
      CacheControl: "max-age=31536000, immutable", // 1 year — keys include timestamps
    })
  );

  return { key, url: publicUrl(key) };
}

/**
 * Get a download URL for an existing S3 object.
 * Returns the public URL if the object is public-read, otherwise a presigned URL (1 hour TTL).
 */
export async function storageGet(relKey: string): Promise<{ key: string; url: string }> {
  const key = normalizeKey(relKey);

  // Try public URL first (works if bucket has public-read ACL or public policy)
  // Fall back to presigned URL for private objects
  try {
    const s3 = getS3();
    // Check if object exists
    await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }));
    return { key, url: publicUrl(key) };
  } catch (err: any) {
    if (err?.name === "NotFound" || err?.$metadata?.httpStatusCode === 404) {
      throw new Error(`Object not found: ${key}`);
    }
    // Object might be private — generate presigned URL
    const s3 = getS3();
    const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return { key, url };
  }
}

/**
 * Generate a presigned URL for temporary access to a private object.
 * Useful for documents like license files that should not be publicly indexed.
 */
export async function storagePresign(
  relKey: string,
  expiresInSeconds = 3600
): Promise<string> {
  const s3 = getS3();
  const key = normalizeKey(relKey);
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
  return getSignedUrl(s3, command, { expiresIn: expiresInSeconds });
}
