/**
 * Home Profile Match Agent
 *
 * When an opportunity is detected, this agent queries the homeowner's Zep
 * memory and Mem0 preferences to determine:
 * 1. Has this home already been contacted about this type of issue?
 * 2. What's the homeowner's price sensitivity and engagement history?
 * 3. What's the best messaging angle for this homeowner?
 *
 * Used to personalize deal cards and prioritize which opportunities
 * get dispatched first based on homeowner conversion likelihood.
 */

import { queryPropertyHistory, getPropertyContext } from "../zep";
import { searchUserMemory } from "../memory";
import { invokeLLM, VLM_MODELS } from "../_core/llm";

export interface HomeProfileContext {
  propertyAddress: string;
  opportunityType: string;
  hasBeenContactedBefore: boolean;
  previousDeclines: number;
  homeownerPreferences: string;
  suggestedMessagingAngle: string;
  estimatedConversionLikelihood: "high" | "medium" | "low";
  personalizationNotes: string;
}

export async function runHomeProfileMatchAgent(opts: {
  propertyAddress: string;
  homeownerEmail?: string;
  opportunityType: string;
  estimatedValue: number;
}): Promise<HomeProfileContext> {
  const [propertyHistory, homeownerContext] = await Promise.all([
    queryPropertyHistory(opts.propertyAddress, `${opts.opportunityType} history contact declined`),
    opts.homeownerEmail ? getPropertyContext(opts.propertyAddress) : Promise.resolve(null),
  ]);

  const homeownerPreferences = opts.homeownerEmail
    ? await searchUserMemory(opts.homeownerEmail, "preferences budget communication style")
    : [];

  // Check for previous declines on same opportunity type
  const declineSignals = propertyHistory.filter((r: any) => {
    const content = typeof r.content === "string" ? r.content : JSON.stringify(r);
    return content.includes("declined") && content.includes(opts.opportunityType);
  });

  const previousDeclines = declineSignals.length;
  const hasBeenContactedBefore = propertyHistory.length > 0 || previousDeclines > 0;

  // If we have enough context, use AI to generate personalized messaging
  let suggestedMessagingAngle = "Standard opportunity card";
  let estimatedConversionLikelihood: "high" | "medium" | "low" = "medium";
  let personalizationNotes = "";

  if (homeownerContext || homeownerPreferences.length > 0) {
    try {
      const response = await invokeLLM({
        model: VLM_MODELS.classify.model,
        provider: VLM_MODELS.classify.provider,
        thinking: false,
        maxTokens: 512,
        messages: [
          {
            role: "system",
            content: `You are a conversion optimization agent for ProLnk. Given a homeowner's history and preferences, suggest how to best present a home service opportunity to maximize acceptance.`,
          },
          {
            role: "user",
            content: `Opportunity: ${opts.opportunityType} ($${opts.estimatedValue.toLocaleString()})
Property: ${opts.propertyAddress}
Previous contacts: ${hasBeenContactedBefore ? "Yes" : "No"}
Previous declines: ${previousDeclines}
Homeowner preferences: ${homeownerPreferences.join(". ")}
Property context: ${homeownerContext?.slice(0, 300) ?? "No prior data"}

Return JSON: { messagingAngle: string, likelihood: "high"|"medium"|"low", notes: string }`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "profile_match",
            strict: true,
            schema: {
              type: "object",
              properties: {
                messagingAngle: { type: "string" },
                likelihood: { type: "string", enum: ["high", "medium", "low"] },
                notes: { type: "string" },
              },
              required: ["messagingAngle", "likelihood", "notes"],
              additionalProperties: false,
            },
          },
        },
      });

      const content = response.choices?.[0]?.message?.content;
      const parsed = typeof content === "string" ? JSON.parse(content) : content;
      suggestedMessagingAngle = parsed.messagingAngle;
      estimatedConversionLikelihood = parsed.likelihood;
      personalizationNotes = parsed.notes;
    } catch {
      // Use defaults if AI fails
    }
  }

  // Adjust likelihood based on previous declines
  if (previousDeclines >= 2) {
    estimatedConversionLikelihood = "low";
    personalizationNotes = `Homeowner has declined ${previousDeclines} similar offers. Consider longer delay before re-contacting.`;
  }

  return {
    propertyAddress: opts.propertyAddress,
    opportunityType: opts.opportunityType,
    hasBeenContactedBefore,
    previousDeclines,
    homeownerPreferences: homeownerPreferences.join("; "),
    suggestedMessagingAngle,
    estimatedConversionLikelihood,
    personalizationNotes,
  };
}
