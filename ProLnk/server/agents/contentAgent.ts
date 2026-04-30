/**
 * Content Agent
 *
 * Generates marketing content for partners:
 * - Bio/profile descriptions (from their trade + years experience)
 * - Service descriptions (for each trade they offer)
 * - Review response templates (professional responses to reviews)
 * - Social media posts (job completion highlights)
 *
 * Partners can request content generation from their Profile settings.
 */

import { invokeLLM } from "../_core/llm";
import { queryKnowledge } from "../knowledge";

export async function generatePartnerBio(opts: {
  businessName: string;
  businessType: string;
  yearsInBusiness: number;
  serviceArea: string;
  specialties?: string[];
  tone?: "professional" | "friendly" | "authoritative";
}): Promise<string> {
  const tradeKnowledge = await queryKnowledge(`${opts.businessType} trade knowledge Texas`);

  const response = await invokeLLM({
    model: "claude-sonnet-4-5-20251022",
    provider: "anthropic" as const,
    thinking: false,
    maxTokens: 512,
    messages: [
      {
        role: "system",
        content: `You write professional partner bios for ProLnk, a home service network. Write in a ${opts.tone ?? "professional"} tone. Keep it under 150 words. Focus on trust, experience, and local expertise.`,
      },
      {
        role: "user",
        content: `Write a compelling business bio for:
Business: ${opts.businessName}
Trade: ${opts.businessType}
Years in business: ${opts.yearsInBusiness}
Service area: ${opts.serviceArea}
Specialties: ${opts.specialties?.join(", ") ?? "General services"}

Context: ${tradeKnowledge.slice(0, 200)}`,
      },
    ],
  });

  return response.choices?.[0]?.message?.content?.toString() ?? "";
}

export async function generateServiceDescription(opts: {
  serviceName: string;
  partnerName: string;
  serviceArea: string;
}): Promise<string> {
  const response = await invokeLLM({
    model: VLM_MODELS.report.model,
    provider: VLM_MODELS.report.provider as any,
    thinking: false,
    maxTokens: 256,
    messages: [
      {
        role: "system",
        content: "Write a short service description (60-80 words) for a home service professional on TrustyPro. Professional, specific, trust-building. No superlatives like 'best' or 'amazing'.",
      },
      {
        role: "user",
        content: `Service: ${opts.serviceName}
Provider: ${opts.partnerName} (${opts.serviceArea})`,
      },
    ],
  });

  return response.choices?.[0]?.message?.content?.toString() ?? "";
}

export async function generateReviewResponse(opts: {
  reviewText: string;
  rating: number;
  businessName: string;
}): Promise<string> {
  const response = await invokeLLM({
    model: "claude-sonnet-4-5-20251022",
    provider: "anthropic" as const,
    thinking: false,
    maxTokens: 256,
    messages: [
      {
        role: "system",
        content: "You write professional responses to customer reviews for home service businesses. Keep responses under 80 words. Be genuine and specific to the review content.",
      },
      {
        role: "user",
        content: `Write a professional response to this ${opts.rating}-star review for ${opts.businessName}:

Review: "${opts.reviewText}"

${opts.rating >= 4 ? "Thank them genuinely and reinforce the specific positive." : "Address the concern professionally and explain how you've improved."}`,
      },
    ],
  });

  return response.choices?.[0]?.message?.content?.toString() ?? "";
}

import { VLM_MODELS } from "../_core/llm";
