import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { invokeLLM } from "../_core/llm";

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

const SYSTEM_PROMPT_TRUSTYPRO = `You are a friendly and knowledgeable support assistant for TrustyPro, a platform that helps homeowners find and connect with trusted home service professionals in their area.

Key facts about TrustyPro:
- TrustyPro is the homeowner-facing brand of the ProLnk network
- Homeowners can upload photos of their home to get AI-powered analysis of potential repairs and maintenance needs
- The platform shows a directory of verified, trusted professionals in your local area
- All professionals on TrustyPro are vetted and reviewed
- Homeowners can track their Home Health Vault — a record of repairs, maintenance, and home improvements
- The platform is free for homeowners to use
- TrustyPro is currently in the DFW area with nationwide expansion coming

Be warm, helpful, and reassuring. Homeowners may have questions about how the photo analysis works, how professionals are vetted, privacy concerns, or how to get started. If you don't know something specific, say so honestly and suggest they reach out via the contact form.`;

export const supportChatRouter = router({
  // Public support chat for the /advertise page
  advertiserChat: publicProcedure
    .input(z.object({
      messages: z.array(z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      })).min(1).max(20),
    }))
    .mutation(async ({ input }) => {
      const llmMessages = [
        { role: "system" as const, content: SYSTEM_PROMPT_ADVERTISER },
        ...input.messages.map(m => ({ role: m.role as "user" | "assistant", content: m.content })),
      ];
      const response = await invokeLLM({ messages: llmMessages });
      const answer = (response as any)?.choices?.[0]?.message?.content ?? "I'm having trouble responding right now. Please try again or submit the application form and our team will reach out.";
      return { answer };
    }),

  // Public support chat for TrustyPro homeowner pages
  homeownerChat: publicProcedure
    .input(z.object({
      messages: z.array(z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      })).min(1).max(20),
    }))
    .mutation(async ({ input }) => {
      const llmMessages = [
        { role: "system" as const, content: SYSTEM_PROMPT_TRUSTYPRO },
        ...input.messages.map(m => ({ role: m.role as "user" | "assistant", content: m.content })),
      ];
      const response = await invokeLLM({ messages: llmMessages });
      const answer = (response as any)?.choices?.[0]?.message?.content ?? "I'm having trouble responding right now. Please try again or use the contact form.";
      return { answer };
    }),
});
