import { getPool } from "../db";

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
  estimatedValue?: number;
  completingProId?: number;
}): Promise<HomeProfileContext> {
  const pool = await getPool();
  if (!pool) return defaultContext(opts);

  try {
    const [rows]: any = await pool.query(
      "SELECT COUNT(*) as cnt FROM homeWaitlist WHERE address LIKE ? LIMIT 1",
      [`%${opts.propertyAddress.slice(0, 20)}%`]
    );
    const hasBeenContacted = Number((rows as any[])[0]?.cnt || 0) > 0;

    return {
      propertyAddress: opts.propertyAddress,
      opportunityType: opts.opportunityType,
      hasBeenContactedBefore: hasBeenContacted,
      previousDeclines: 0,
      homeownerPreferences: "Unknown",
      suggestedMessagingAngle: hasBeenContacted ? "follow-up" : "first-contact",
      estimatedConversionLikelihood: hasBeenContacted ? "medium" : "high",
      personalizationNotes: `First contact for ${opts.opportunityType} at this address.`,
    };
  } catch {
    return defaultContext(opts);
  }
}

function defaultContext(opts: { propertyAddress: string; opportunityType: string }): HomeProfileContext {
  return {
    propertyAddress: opts.propertyAddress,
    opportunityType: opts.opportunityType,
    hasBeenContactedBefore: false,
    previousDeclines: 0,
    homeownerPreferences: "Unknown",
    suggestedMessagingAngle: "value-based",
    estimatedConversionLikelihood: "medium",
    personalizationNotes: "No prior history found.",
  };
}
