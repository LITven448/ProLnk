/**
 * ProLnk LangGraph Client
 *
 * Calls the LangGraph AI pipeline microservice for:
 * - Photo analysis (GPT-4o Vision + ATTOM market data)
 * - Partner matching (multi-factor scoring)
 * - Outreach drafting (personalized messages)
 * - Homeowner advising (stateful property assistant)
 */

const LANGGRAPH_URL = process.env.LANGGRAPH_URL || "http://localhost:8100";

interface AnalyzePhotosInput {
  photoUrls: string[];
  address?: string;
  zipCode?: string;
  propertyType?: string;
}

interface AnalyzePhotosResult {
  detections: Array<{
    issue: string;
    severity: "low" | "medium" | "high";
    trade: string;
    description: string;
    confidence: number;
  }>;
  tradeNeeded: string;
  estimatedCost: number;
  opportunityScore: number;
  marketRates: Record<string, unknown>;
  summary: string;
}

interface MatchPartnerInput {
  opportunityId: number;
  trade: string;
  zipCode: string;
  estimatedValue: number;
  urgency?: string;
}

interface MatchPartnerResult {
  bestMatch: Record<string, unknown> | null;
  rankedCandidates: Array<Record<string, unknown>>;
  totalCandidates: number;
}

interface DraftOutreachInput {
  partnerName: string;
  partnerBusiness: string;
  homeownerName: string;
  jobDescription: string;
  estimatedValue: number;
  trade: string;
}

interface DraftOutreachResult {
  subject: string;
  body: string;
  partnerName: string;
  estimatedValue: number;
}

interface AdviseHomeownerInput {
  homeownerId: number;
  question: string;
  propertyData?: Record<string, unknown>;
  vaultEntries?: Array<Record<string, unknown>>;
}

async function callLangGraph<T>(endpoint: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${LANGGRAPH_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => "Unknown error");
    throw new Error(`LangGraph ${endpoint} failed (${res.status}): ${err}`);
  }

  return res.json() as Promise<T>;
}

export async function analyzePhotos(input: AnalyzePhotosInput): Promise<AnalyzePhotosResult> {
  const result = await callLangGraph<any>("/analyze", {
    photo_urls: input.photoUrls,
    address: input.address,
    zip_code: input.zipCode,
    property_type: input.propertyType || "residential",
  });

  return {
    detections: result.detections,
    tradeNeeded: result.trade_needed,
    estimatedCost: result.estimated_cost,
    opportunityScore: result.opportunity_score,
    marketRates: result.market_rates,
    summary: result.summary,
  };
}

export async function matchPartner(input: MatchPartnerInput): Promise<MatchPartnerResult> {
  const result = await callLangGraph<any>("/match", {
    opportunity_id: input.opportunityId,
    trade: input.trade,
    zip_code: input.zipCode,
    estimated_value: input.estimatedValue,
    urgency: input.urgency || "normal",
  });

  return {
    bestMatch: result.best_match,
    rankedCandidates: result.ranked_candidates,
    totalCandidates: result.total_candidates,
  };
}

export async function draftOutreach(input: DraftOutreachInput): Promise<DraftOutreachResult> {
  return callLangGraph<DraftOutreachResult>("/draft", {
    partner_name: input.partnerName,
    partner_business: input.partnerBusiness,
    homeowner_name: input.homeownerName,
    job_description: input.jobDescription,
    estimated_value: input.estimatedValue,
    trade: input.trade,
  });
}

export async function adviseHomeowner(input: AdviseHomeownerInput): Promise<{ answer: string; homeownerId: number }> {
  return callLangGraph("/advise", {
    homeowner_id: input.homeownerId,
    question: input.question,
    property_data: input.propertyData,
    vault_entries: input.vaultEntries,
  });
}

export async function checkLangGraphHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${LANGGRAPH_URL}/health`, { method: "GET" });
    return res.ok;
  } catch {
    return false;
  }
}
