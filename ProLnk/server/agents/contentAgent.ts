import { VLM_MODELS } from "../_core/llm";

async function callOpenAI(prompt: string, systemPrompt: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) return "Content generation requires OPENAI_API_KEY.";
  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }, { role: "user", content: prompt }],
      max_tokens: 500,
    }),
  });
  const data = await resp.json() as any;
  return data.choices?.[0]?.message?.content || "Unable to generate content.";
}

export async function generatePartnerBio(opts: {
  businessName: string;
  businessType: string;
  yearsInBusiness: number;
  serviceArea: string;
  specialties?: string[];
  tone?: "professional" | "friendly" | "authoritative";
}): Promise<string> {
  const systemPrompt = `You write professional partner bios for ProLnk, a home service network. Write in a ${opts.tone ?? "professional"} tone. Keep it under 150 words. Focus on trust, experience, and local expertise.`;
  const prompt = `Write a compelling business bio for:
Business: ${opts.businessName}
Trade: ${opts.businessType}
Years in business: ${opts.yearsInBusiness}
Service area: ${opts.serviceArea}
Specialties: ${opts.specialties?.join(", ") ?? "General services"}`;

  return callOpenAI(prompt, systemPrompt);
}

export async function generateServiceDescription(opts: {
  serviceName?: string;
  businessType?: string;
  partnerName?: string;
  serviceArea: string;
}): Promise<string> {
  const systemPrompt = "Write a short service description (60-80 words) for a home service professional on TrustyPro. Professional, specific, trust-building. No superlatives like 'best' or 'amazing'.";
  const prompt = `Service: ${opts.serviceName ?? opts.businessType ?? "Home Services"}
Provider: ${opts.partnerName ?? "ProLnk Partner"} (${opts.serviceArea})`;

  return callOpenAI(prompt, systemPrompt);
}

export async function generateReviewResponse(opts: {
  reviewText: string;
  rating: number;
  businessName: string;
}): Promise<string> {
  const systemPrompt = "You write professional responses to customer reviews for home service businesses. Keep responses under 80 words. Be genuine and specific to the review content.";
  const prompt = `Write a professional response to this ${opts.rating}-star review for ${opts.businessName}:

Review: "${opts.reviewText}"

${opts.rating >= 4 ? "Thank them genuinely and reinforce the specific positive." : "Address the concern professionally and explain how you've improved."}`;

  return callOpenAI(prompt, systemPrompt);
}

export { VLM_MODELS };
