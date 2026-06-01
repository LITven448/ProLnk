import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";
import { ENV } from "../_core/env";
import { notify } from "../notify";

const SYSTEM_PROMPT_ADVERTISER = `You are a friendly and knowledgeable support assistant for ProLnk, a home service partner referral network. You are on the "Advertise With Us" page helping potential advertisers — real estate agents, mortgage brokers, title companies, insurance agents, home warranty companies, and home service professionals — understand how featured advertising on ProLnk works.

Key facts about ProLnk advertising:
- ProLnk connects home service professionals across the DFW area (expanding nationwide)
- Featured advertisers appear as banners on the TrustyPro homeowner dashboard and scan results pages
- Three advertising tiers: Spotlight ($149/mo), Featured ($299/mo), Exclusive ($599/mo)
- Exclusive tier includes territory exclusivity — no competitors in your zip codes
- Impressions and click tracking are included in all tiers
- Applications are reviewed within 1-2 business days
- Target audience: homeowners actively managing home projects, repairs, and improvements

Be helpful, concise, and encouraging. If someone asks about pricing, direct them to the application form on this page. If you don't know something specific, say so honestly and suggest they submit the form so the team can follow up.`;

const SYSTEM_PROMPT_TRUSTYPRO = `You are the TrustyPro AI assistant — a warm, helpful support agent for homeowners. TrustyPro helps homeowners find and connect with trusted, verified home service professionals in their area.

Key facts about TrustyPro (the homeowner-facing side of the ProLnk network):
- Homeowners describe what they need or upload photos of their home to get AI-powered analysis of potential repairs and maintenance needs ("home scans")
- TrustyPro matches homeowners with verified, vetted professionals in their local area — every pro passes a background check before they can receive leads
- Homeowners keep a "Home Health Vault" — a private record of their home's repairs, maintenance, and improvements over time
- TrustyPro is completely free for homeowners to use
- Homeowners request a service, get matched with verified pros, and receive quotes
- Currently serving the DFW (Dallas–Fort Worth) area with nationwide expansion coming
- Support email: support@trustypro.io

Guidelines:
- Be warm, reassuring, and concise. Keep answers short (2-4 sentences) unless more detail is clearly needed.
- Common topics: how photo/home analysis works, how pros are vetted, privacy, how to get started, cost (it's free).
- NEVER invent specifics you don't know (exact pricing of a pro's quote, timelines for a specific job, legal/contractual specifics). If you're unsure, say so honestly and offer to connect them with a human — they can click "Talk to a human" in the chat or email support@trustypro.io.`;

const SYSTEM_PROMPT_PRO = `You are the ProLnk AI assistant — a knowledgeable, encouraging support agent for home service professionals (pros) considering or using ProLnk. ProLnk is the pro-facing side of the network: it sends verified, ready-to-buy homeowner leads to licensed home service professionals.

Key facts about ProLnk for pros:
- Plans (subscription, billed monthly, no long-term contract — month-to-month, cancel anytime):
  - Core: $99/mo — keep 40% of the commission pool
  - Pro: $149/mo — keep 50%
  - Business: $249/mo — keep 60%, unlocks commercial jobs (Briefcase) with ProPass verification
  - Scout: $99/mo — a separate program for sourcing and referring (network/origination focused)
- 90-day FREE TRIAL on all plans, no credit card required for the subscription. Subscription billing begins on day 91.
- One-time $35 background check at onboarding via Checkr (same service Uber/Lyft/DoorDash use). Results usually in 24–48 hours; account activates automatically when it clears. No annual renewal.
- Commission pool: ProLnk takes 3–12% of completed job value as a platform fee (varies by trade type and job size, in line with industry referral rates). Of that pool you keep your tier's percentage (40/50/60%). ProLnk always retains a minimum of 20% to cover platform operations, AI analysis, and lead sourcing. You keep 100% of what you charge the homeowner — the platform fee is collected separately.
- Payment: ProLnk's AI tracks payment to completion (lump sum, installments, or net-30/60/90). Commission is released once payment clears, not when invoiced.
- Completed job: marked complete when the homeowner confirms in the app or payment is received in full.
- Commercial jobs: available on Business ($249/mo) and require ProPass verification (commercial trade license + liability insurance check). Unlocks the commercial job board (Briefcase).
- Upgrades apply immediately to future completed jobs; downgrades take effect at the end of the billing cycle.
- Currently launching in the DFW (Dallas–Fort Worth) area, expanding nationwide.
- Support email: support@prolnk.io

Guidelines:
- Be helpful, concise, and encouraging. Keep answers short (2-4 sentences) unless more detail is clearly needed.
- If asked about something you're not sure of (exact payout timing for a specific job, legal/tax specifics, account-specific issues), say so honestly and offer to connect them with a human — they can click "Talk to a human" in the chat or email support@prolnk.io.
- Never invent numbers or guarantee earnings. Stick to the facts above.`;

type ChatMode = "advertiser" | "homeowner" | "pro";

const PROMPTS: Record<ChatMode, string> = {
  advertiser: SYSTEM_PROMPT_ADVERTISER,
  homeowner: SYSTEM_PROMPT_TRUSTYPRO,
  pro: SYSTEM_PROMPT_PRO,
};

const FALLBACK: Record<ChatMode, string> = {
  advertiser: "I'm having trouble responding right now. Please submit the application form on this page and our team will reach out shortly.",
  homeowner: "I'm having trouble responding right now. You can reach our team directly at support@trustypro.io and we'll help you out.",
  pro: "I'm having trouble responding right now. You can reach our team directly at support@prolnk.io and we'll help you out.",
};

function hasLLMKey(): boolean {
  return !!ENV.forgeApiKey || !!process.env.OPENAI_API_KEY || !!process.env.ANTHROPIC_API_KEY;
}

const messagesSchema = z.array(z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
})).min(1).max(20);

async function answerFor(mode: ChatMode, messages: z.infer<typeof messagesSchema>): Promise<string> {
  if (!hasLLMKey()) {
    return FALLBACK[mode];
  }
  try {
    const llmMessages = [
      { role: "system" as const, content: PROMPTS[mode] },
      ...messages.map(m => ({ role: m.role as "user" | "assistant", content: m.content })),
    ];
    const response = await invokeLLM({ messages: llmMessages, maxTokens: 700, thinking: false });
    const answer = (response as any)?.choices?.[0]?.message?.content;
    if (typeof answer === "string" && answer.trim().length > 0) {
      return answer;
    }
    return FALLBACK[mode];
  } catch (err) {
    console.error("[supportChat] LLM error:", err);
    return FALLBACK[mode];
  }
}

export const supportChatRouter = router({
  // Generic brand-aware support chat. brand → which assistant persona to use.
  sendMessage: publicProcedure
    .input(z.object({
      brand: z.enum(["prolnk", "trustypro", "advertiser"]).default("prolnk"),
      messages: messagesSchema,
    }))
    .mutation(async ({ input }) => {
      const mode: ChatMode =
        input.brand === "trustypro" ? "homeowner"
        : input.brand === "advertiser" ? "advertiser"
        : "pro";
      const answer = await answerFor(mode, input.messages);
      return { answer };
    }),

  // Backward-compatible: advertiser chat (Advertise With Us page)
  advertiserChat: publicProcedure
    .input(z.object({ messages: messagesSchema }))
    .mutation(async ({ input }) => {
      return { answer: await answerFor("advertiser", input.messages) };
    }),

  // Backward-compatible: TrustyPro homeowner chat
  homeownerChat: publicProcedure
    .input(z.object({ messages: messagesSchema }))
    .mutation(async ({ input }) => {
      return { answer: await answerFor("homeowner", input.messages) };
    }),

  // Pro-facing chat (ProLnk)
  proChat: publicProcedure
    .input(z.object({ messages: messagesSchema }))
    .mutation(async ({ input }) => {
      return { answer: await answerFor("pro", input.messages) };
    }),

  // Human escalation — captures the conversation + contact info and notifies the team.
  createTicket: publicProcedure
    .input(z.object({
      brand: z.enum(["prolnk", "trustypro", "advertiser"]).default("prolnk"),
      email: z.string().email().max(200),
      name: z.string().max(120).optional(),
      message: z.string().max(2000).optional(),
      transcript: z.array(z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(2000),
      })).max(40).optional(),
    }))
    .mutation(async ({ input }) => {
      const brandName =
        input.brand === "trustypro" ? "TrustyPro"
        : input.brand === "advertiser" ? "ProLnk (Advertiser)"
        : "ProLnk";
      const transcriptText = (input.transcript ?? [])
        .map(m => `${m.role === "user" ? "Visitor" : "AI"}: ${m.content}`)
        .join("\n");
      const content = [
        `Brand: ${brandName}`,
        `Name: ${input.name ?? "(not provided)"}`,
        `Email: ${input.email}`,
        input.message ? `\nMessage:\n${input.message}` : "",
        transcriptText ? `\nConversation:\n${transcriptText}` : "",
      ].filter(Boolean).join("\n");

      try {
        await notify({
          tier: "email",
          category: "support_chat",
          title: `Support chat handoff — ${brandName}`,
          content,
        });
      } catch (err) {
        console.error("[supportChat] createTicket notify failed:", err);
      }
      return { ok: true };
    }),
});
