/**
 * AI Image Generation — OpenAI DALL-E 3 + GPT-image-1 (direct, no Manus Forge)
 *
 * Two modes:
 *   - Text-only prompt: DALL-E 3 ($0.040/image at 1024x1024)
 *   - Image + prompt (transformation): GPT-image-1 edit endpoint — grounds the output
 *     to the reference photo structure (same angle, same surroundings)
 *
 * Required env:
 *   OPENAI_API_KEY
 *
 * Falls back to Forge image service if OPENAI_API_KEY is not set (for dev/transition).
 */

import { storagePut } from "../storage";
import { ENV } from "./env";

export type GenerateImageOptions = {
  prompt: string;
  /** Reference images to ground the generation. Pass the "before" photo for transformations. */
  originalImages?: Array<{ url?: string; b64Json?: string; mimeType?: string }>;
  /** Image size. Default: "1024x1024". */
  size?: "1024x1024" | "1792x1024" | "1024x1792";
  /** Quality. Default: "standard". Use "hd" for premium renderings. */
  quality?: "standard" | "hd";
};

export type GenerateImageResponse = {
  url?: string;
};

// ─── Direct OpenAI image generation ──────────────────────────────────────────

async function generateViaOpenAI(options: GenerateImageOptions): Promise<GenerateImageResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY not configured");

  const hasReferenceImages = (options.originalImages ?? []).length > 0;

  if (hasReferenceImages) {
    // Use the images/edits endpoint to ground the output in the reference photo
    // This preserves the original structure (house shape, angle, surroundings)
    const formData = new FormData();

    // Fetch and attach reference image(s)
    for (const img of (options.originalImages ?? []).slice(0, 1)) {
      if (img.url) {
        const res = await fetch(img.url);
        if (!res.ok) throw new Error(`Failed to fetch reference image: ${res.status}`);
        const blob = await res.blob();
        formData.append("image", blob, "reference.jpg");
      } else if (img.b64Json) {
        const buffer = Buffer.from(img.b64Json, "base64");
        const blob = new Blob([buffer], { type: img.mimeType ?? "image/jpeg" });
        formData.append("image", blob, "reference.jpg");
      }
    }

    formData.append("prompt", options.prompt);
    formData.append("model", "gpt-image-1");
    formData.append("n", "1");
    formData.append("size", options.size ?? "1024x1024");

    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: formData,
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`OpenAI image edit failed (${response.status}): ${err}`);
    }

    const result = await response.json() as { data?: Array<{ b64_json?: string; url?: string }> };
    const imageData = result.data?.[0];

    if (!imageData) throw new Error("OpenAI returned no image data");

    // If base64, upload to S3 and return CDN URL
    if (imageData.b64_json) {
      const buffer = Buffer.from(imageData.b64_json, "base64");
      const { url } = await storagePut(`generated/${Date.now()}-render.png`, buffer, "image/png");
      return { url };
    }

    return { url: imageData.url };
  }

  // Text-only generation via DALL-E 3
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: options.prompt,
      n: 1,
      size: options.size ?? "1024x1024",
      quality: options.quality ?? "standard",
      response_format: "b64_json",
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI DALL-E 3 failed (${response.status}): ${err}`);
  }

  const result = await response.json() as { data?: Array<{ b64_json?: string; url?: string }> };
  const imageData = result.data?.[0];
  if (!imageData?.b64_json) throw new Error("DALL-E 3 returned no image data");

  const buffer = Buffer.from(imageData.b64_json, "base64");
  const { url } = await storagePut(`generated/${Date.now()}-dalle3.png`, buffer, "image/png");
  return { url };
}

// ─── Forge fallback (Manus — only used if OPENAI_API_KEY is not set) ──────────

async function generateViaForge(options: GenerateImageOptions): Promise<GenerateImageResponse> {
  if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
    throw new Error("Neither OPENAI_API_KEY nor Manus Forge credentials are configured");
  }

  const baseUrl = ENV.forgeApiUrl.endsWith("/") ? ENV.forgeApiUrl : `${ENV.forgeApiUrl}/`;
  const fullUrl = new URL("images.v1.ImageService/GenerateImage", baseUrl).toString();

  const response = await fetch(fullUrl, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "connect-protocol-version": "1",
      authorization: `Bearer ${ENV.forgeApiKey}`,
    },
    body: JSON.stringify({
      prompt: options.prompt,
      original_images: (options.originalImages ?? []).map(img => ({
        url: img.url,
        b64_json: img.b64Json,
        mime_type: img.mimeType,
      })),
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Forge image generation failed (${response.status}): ${detail}`);
  }

  const result = await response.json() as { image: { b64Json: string; mimeType: string } };
  const buffer = Buffer.from(result.image.b64Json, "base64");
  const { url } = await storagePut(`generated/${Date.now()}.png`, buffer, result.image.mimeType);
  return { url };
}

// ─── Public entry point ───────────────────────────────────────────────────────

export async function generateImage(options: GenerateImageOptions): Promise<GenerateImageResponse> {
  if (process.env.OPENAI_API_KEY) {
    return generateViaOpenAI(options);
  }
  // Forge fallback for development / migration transition
  console.warn("[ImageGen] OPENAI_API_KEY not set — falling back to Manus Forge. Set OPENAI_API_KEY to remove this dependency.");
  return generateViaForge(options);
}
