# AI & Algorithms — Ready-to-Apply Fixes
**Companion to `ai-and-algorithms-audit.md`. Every fix below is copy-paste ready.**
**Apply to `origin/main`. Nothing here has been executed — dev team must run the test suite after each section.**

---

# BLOCKERS

## B1 · Stop sending property addresses to the AI provider
**File:** `server/photoWaterfall.ts` — three places (Tier 1, 2, 3 user messages).

REPLACE in Tier 1:
```ts
text: `Quality screen this photo from a job at: ${photo.serviceAddress}`,
```
WITH:
```ts
text: `Quality screen this photo.`,
```

REPLACE in Tier 2:
```ts
text: `Classify opportunity at: ${photo.serviceAddress}. Photo type identified: ${tier1.photoType}.`,
```
WITH:
```ts
text: `Classify the service opportunity in this photo. Photo type identified: ${tier1.photoType}.`,
```

REPLACE in Tier 3:
```ts
text: `Deep analysis for property at: ${photo.serviceAddress}
```
WITH:
```ts
text: `Deep analysis of this property photo.
```

Then add a guard so it can never regress — put this near the top of the file and call it once inside each tier before `invokeLLM`:
```ts
/** Fails loudly if PII would be sent to an external model provider. */
function assertNoPii(text: string, photo: PhotoInput): void {
  const addr = (photo.serviceAddress ?? "").trim();
  if (addr.length > 4 && text.includes(addr)) {
    throw new Error("PII GUARD: service address must never be sent to an external model provider");
  }
}
```

## B2 · Watermark every AI-generated render
**File:** `server/photoWaterfall.ts` — `runTier4Renderings()`.

REPLACE the prompt block:
```ts
const prompt = `Photorealistic home exterior transformation. ${opp.transformationPrompt}.
Professional photography quality, same camera angle and lighting as the before photo.
Show only the finished result — no watermarks, no before/after split, no text overlays.`;
```
WITH:
```ts
const prompt = `Photorealistic home exterior transformation. ${opp.transformationPrompt}.
Professional photography quality, same camera angle and lighting as the before photo.
Show only the finished result — no before/after split, no text overlays.
Do not depict any people, faces, pets, license plates, or house numbers.`;
```
(The "no watermarks" instruction is removed and the people/PII exclusion added.)

Then stamp the label after generation — the model must not be trusted to do it:
```ts
import { applyWatermark } from "./_core/imageWatermark"; // new helper, see below

const generated = await generateImage({ prompt, originalImages: [{ url: photo.url }] });
const stamped = generated.url
  ? await applyWatermark(generated.url, "AI VISUALIZATION — NOT A PHOTOGRAPH")
  : null;

results.push({
  opportunityType: opp.type,
  transformationPrompt: opp.transformationPrompt,
  renderedImageUrl: stamped,
});
```
`applyWatermark(url, text)` = server-side composite (sharp/canvas): bottom-left, 14px, white text on 60% black bar, full width. **If watermarking fails, return null — never return an unlabeled render.**

## B3 · Fail closed + spend circuit breaker + real cost accounting
**File:** `server/photoWaterfall.ts`.

(a) Tier 1 currently fails OPEN. REPLACE the catch block in `runTier1QualityScreen`:
```ts
} catch (err) {
  return { passed: true, reason: `Tier 1 error — proceeding: ...`, qualityScore: 0.5, photoType: "unclear" };
}
```
WITH:
```ts
} catch (err) {
  // Fail CLOSED: an upstream outage must not cascade every photo into paid tiers.
  return {
    passed: false,
    reason: `Tier 1 error — halting to protect spend: ${err instanceof Error ? err.message : "unknown"}`,
    qualityScore: 0,
    photoType: "unclear",
  };
}
```

(b) Add a daily spend circuit breaker. New file `server/_core/aiSpendGuard.ts`:
```ts
const DAILY_LIMIT_USD = Number(process.env.AI_DAILY_SPEND_LIMIT_USD ?? 250);
let windowStart = 0;
let spentToday = 0;

export function recordSpend(usd: number): void {
  const now = Date.now();
  if (now - windowStart > 86_400_000) { windowStart = now; spentToday = 0; }
  spentToday += usd;
}

export function spendExceeded(): boolean {
  const now = Date.now();
  if (now - windowStart > 86_400_000) { windowStart = now; spentToday = 0; }
  return spentToday >= DAILY_LIMIT_USD;
}

export function spendSnapshot() {
  return { spentToday: Math.round(spentToday * 100) / 100, limit: DAILY_LIMIT_USD };
}
```
Wire into `runWaterfallAnalysis()` immediately after Tier 0 passes:
```ts
if (spendExceeded()) {
  return {
    photoUrl: photo.url, tier0,
    finalConfidence: 0, shouldGenerateOffer: false,
    processingCostUsd: 0, staleDataFlags: [...staleDataFlags, "spend_limit_reached"],
  };
}
```
and call `recordSpend(cost)` before each return that includes a cost.

(c) Use real token usage, not constants. `estimateCost()` becomes a fallback only:
```ts
function costFromUsage(response: any, fallback: number): number {
  const u = response?.usage;
  if (!u) return fallback;
  const inTok = u.prompt_tokens ?? u.input_tokens ?? 0;
  const outTok = u.completion_tokens ?? u.output_tokens ?? 0;
  // rates injected from config so they can be updated without a deploy
  const { inputPerMTok, outputPerMTok } = getModelRates(response.model);
  return (inTok / 1e6) * inputPerMTok + (outTok / 1e6) * outputPerMTok;
}
```
Each tier returns its measured cost; the orchestrator sums measured values instead of constants. Delete `estimatedSavingsVsFlatRate` or recompute it from measured cost.

---

# MAJORS

## M4 · Trade matching — stop cross-trade false positives
**File:** `server/matching-engine.ts` — replace `tradeMatches()` entirely:
```ts
/** Words that carry no trade signal — matching on these causes cross-trade
 *  false positives ("tree service" ⇄ "pool service"). */
const GENERIC_TRADE_TOKENS = new Set([
  "service","services","home","homes","house","repair","repairs","cleaning","clean",
  "installation","install","installers","residential","commercial","company","companies",
  "llc","inc","co","pro","pros","professional","professionals","solutions","group",
  "and","the","of","specialists","experts","contracting","contractor","contractors",
  "maintenance","general","quality","best","affordable","local",
]);

function meaningfulTokens(s: string): Set<string> {
  return new Set(
    s.split(" ").filter(w => w.length > 2 && !GENERIC_TRADE_TOKENS.has(w))
  );
}

export function tradeMatches(
  partnerBusinessType: string | null | undefined,
  opp: OpportunityForMatch
): boolean {
  const bt = normalize(partnerBusinessType ?? "");
  if (!bt) return false;

  const targets = [opp.opportunityCategory, opp.opportunityType]
    .filter((x): x is string => !!x)
    .map(normalize)
    .filter(Boolean);

  // An uncategorized opportunity must NOT match everyone. Route it to triage.
  if (targets.length === 0) return false;

  const btTokens = meaningfulTokens(bt);
  if (btTokens.size === 0) return false;

  return targets.some(t => {
    const tTokens = meaningfulTokens(t);
    if (tTokens.size === 0) return false;

    // Whole-phrase containment still counts, but only for substantive strings.
    if (bt.length > 3 && t.length > 3 && (bt.includes(t) || t.includes(bt))) return true;

    // Otherwise require overlap on a meaningful (non-generic) token.
    for (const tok of tTokens) if (btTokens.has(tok)) return true;
    return false;
  });
}
```
**Note for dev:** `targets.length === 0` now returns **false** instead of true. Any opportunity created without a category will stop matching. Add a triage queue or backfill categories before deploying, and log `opportunity_uncategorized` so these surface.

## M5 · Capacity scoring — stop rewarding unconfigured partners
**File:** `server/matching-engine.ts`.
```ts
/** Applied when a partner has not configured a weekly cap. */
export const DEFAULT_WEEKLY_LEAD_CAP = 25;

function effectiveCap(partner: MatchPartnerSignals): number {
  const cap = toNum(partner.weeklyLeadCap, 0);
  return cap > 0 ? cap : DEFAULT_WEEKLY_LEAD_CAP;
}

function atCapacity(partner: MatchPartnerSignals): boolean {
  return toNum(partner.weeklyLeadsReceived, 0) >= effectiveCap(partner);
}
```
And in `scorePartner()`, REPLACE the whole capacity block with:
```ts
const cap = effectiveCap(partner);
const used = toNum(partner.weeklyLeadsReceived, 0);
const remaining = Math.max(0, cap - used);
const capScore = (remaining / cap) * SCORING_WEIGHTS.capacity;
score += capScore;
reasons.push(
  toNum(partner.weeklyLeadCap, 0) > 0
    ? `${remaining}/${cap} weekly capacity (+${capScore.toFixed(0)})`
    : `${remaining}/${cap} weekly capacity [default cap] (+${capScore.toFixed(0)})`
);
```

## M6 · Cold start — neutral priors + exploration so new pros can enter
**File:** `server/matching-engine.ts`.

(a) Neutral priors. REPLACE the responsiveness and rating blocks:
```ts
// Responsiveness — unknown history scores at the neutral prior, not zero.
const NEUTRAL_PRIOR = 0.6;
if (partner.avgLeadResponseHours != null) {
  const hours = toNum(partner.avgLeadResponseHours, 24);
  const respScore = Math.max(0, 1 - hours / 24) * SCORING_WEIGHTS.responsiveness;
  score += respScore;
  reasons.push(`avg ${hours.toFixed(1)}h response (+${respScore.toFixed(0)})`);
} else {
  const respScore = NEUTRAL_PRIOR * SCORING_WEIGHTS.responsiveness;
  score += respScore;
  reasons.push(`no response history — neutral prior (+${respScore.toFixed(0)})`);
}

// Rating — same treatment.
const ratingVal = partner.rating != null ? toNum(partner.rating, 0) : 0;
if (ratingVal > 0) {
  const ratingScore = (Math.min(ratingVal, 5) / 5) * SCORING_WEIGHTS.rating;
  score += ratingScore;
  reasons.push(`rating ${ratingVal.toFixed(1)} (+${ratingScore.toFixed(0)})`);
} else {
  const ratingScore = NEUTRAL_PRIOR * SCORING_WEIGHTS.rating;
  score += ratingScore;
  reasons.push(`unrated — neutral prior (+${ratingScore.toFixed(0)})`);
}
```

(b) Exploration so the same partner cannot win every lead. Add to `rankPartners()`, replacing the final sort:
```ts
/** Deterministic per-opportunity rotation: identical inputs always produce the
 *  same order (unit-testable), but the winner varies across opportunities so a
 *  single partner cannot take every lead in a ZIP. */
function rotationOffset(partnerId: number, opportunityId: number): number {
  return ((partnerId * 31 + opportunityId * 17) % 100) / 100; // 0..0.99
}

const TIE_BAND = 4; // points — scores within this band are treated as equal

ranked.sort((a, b) => {
  if (Math.abs(a.score - b.score) > TIE_BAND) return b.score - a.score;
  return rotationOffset(a.partnerId, opp.id) - rotationOffset(b.partnerId, opp.id);
});
return ranked;
```

(c) New-partner boost that decays. Inside `scorePartner()`:
```ts
const lifetimeLeads = toNum((partner as any).lifetimeLeadsReceived, 0);
if (lifetimeLeads < 5) {
  const boost = (5 - lifetimeLeads); // +5 at zero leads, decays to +1
  score += boost;
  reasons.push(`new partner ramp (+${boost})`);
}
```
Requires `lifetimeLeadsReceived` on the partner query — add it to the SELECT in `rankPartnersForOpportunity()`.

## M7 · Home Health Score — real scoring engine
**File:** replace `server/routers/homeHealthScore.ts`.
```ts
import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";

const IssueSchema = z.object({
  name: z.string(),
  severity: z.enum(["urgent", "moderate", "low"]),
  description: z.string(),
  tradeType: z.string(),
  estimatedCost: z.string(),
  confidence: z.number().optional(),
});

/** Systems we expect a fully documented home to have on record. */
export const EXPECTED_COMPONENTS = [
  "roof", "hvac", "water_heater", "electrical_panel",
  "plumbing", "foundation", "windows", "exterior",
] as const;

export interface ScoreInputs {
  issues: { severity: "urgent" | "moderate" | "low" }[];
  documentedComponents: string[];   // from the Vault
  lastDocumentedAt: Date | null;    // most recent photo/scan
  lastServiceAt: Date | null;       // most recent completed job
}

export interface ScoreBreakdown {
  score: number;
  label: "Excellent" | "Good" | "Fair" | "Needs Attention" | "Undocumented";
  completeness: number;   // 0..40
  condition: number;      // 0..40
  freshness: number;      // 0..20
  confidence: "high" | "medium" | "low";
  missingComponents: string[];
}

function monthsSince(d: Date | null): number {
  if (!d) return 999;
  return (Date.now() - d.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
}

export function calculateHealthScore(input: ScoreInputs): ScoreBreakdown {
  const documented = new Set(input.documentedComponents.map(c => c.toLowerCase()));
  const missing = EXPECTED_COMPONENTS.filter(c => !documented.has(c));

  // 1. COMPLETENESS (0–40) — an undocumented home cannot score well.
  const completeness = ((EXPECTED_COMPONENTS.length - missing.length) / EXPECTED_COMPONENTS.length) * 40;

  // 2. CONDITION (0–40) — penalties scale off what we actually inspected.
  const urgent = input.issues.filter(i => i.severity === "urgent").length;
  const moderate = input.issues.filter(i => i.severity === "moderate").length;
  const low = input.issues.filter(i => i.severity === "low").length;
  const rawPenalty = urgent * 15 + moderate * 7 + low * 2;
  const condition = Math.max(0, 40 - rawPenalty);

  // 3. FRESHNESS (0–20) — stale documentation is worth less.
  const docAge = monthsSince(input.lastDocumentedAt);
  const svcAge = monthsSince(input.lastServiceAt);
  const docFresh = docAge >= 999 ? 0 : Math.max(0, 1 - docAge / 24) * 12;
  const svcFresh = svcAge >= 999 ? 0 : Math.max(0, 1 - svcAge / 24) * 8;
  const freshness = docFresh + svcFresh;

  const score = Math.round(completeness + condition + freshness);

  // Confidence describes how much the score can be trusted.
  const coverage = (EXPECTED_COMPONENTS.length - missing.length) / EXPECTED_COMPONENTS.length;
  const confidence: ScoreBreakdown["confidence"] =
    coverage >= 0.75 && docAge < 12 ? "high" : coverage >= 0.4 ? "medium" : "low";

  let label: ScoreBreakdown["label"];
  if (documented.size === 0) label = "Undocumented";
  else if (score >= 80) label = "Excellent";
  else if (score >= 60) label = "Good";
  else if (score >= 40) label = "Fair";
  else label = "Needs Attention";

  return { score, label, completeness: Math.round(completeness), condition: Math.round(condition),
           freshness: Math.round(freshness), confidence, missingComponents: missing };
}

export const homeHealthScoreRouter = router({
  // NOTE: protectedProcedure — was publicProcedure (unauthenticated).
  calculate: protectedProcedure
    .input(z.object({ homeId: z.number(), issues: z.array(IssueSchema).optional() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      // Load state from the Vault — never trust client-supplied condition data.
      const home = await loadHomeVaultState(db, input.homeId, ctx.userId);
      const breakdown = calculateHealthScore({
        issues: home.openIssues,
        documentedComponents: home.documentedComponents,
        lastDocumentedAt: home.lastDocumentedAt,
        lastServiceAt: home.lastServiceAt,
      });
      await persistScoreSnapshot(db, input.homeId, breakdown); // history/vintage tracking
      return breakdown;
    }),
});
```
**Key behavior change:** a home with no documentation now scores ~0 and labels "Undocumented" instead of 95 "Excellent." `loadHomeVaultState` and `persistScoreSnapshot` are new DB helpers — the snapshot table is also what feeds qualified-record vintage tracking.

## M8 · Confidence multiplier applied consistently
**File:** `server/photoWaterfall.ts` — `runTier2OpportunityDetection()`. REPLACE:
```ts
const rawConfidence = parsed.confidence;
let confidence = rawConfidence;
if (photo.photoAgeMonths && photo.photoAgeMonths > 12) {
  const decayFactor = Math.max(1 - (photo.photoAgeMonths - 12) / 36, 0.3);
  confidence = confidence * decayFactor * tier1.qualityScore;
}
```
WITH:
```ts
const rawConfidence = parsed.confidence;
// Photo quality always modulates confidence, regardless of age.
let confidence = rawConfidence * tier1.qualityScore;
// Age decay applies on top, when age is known.
if (photo.photoAgeMonths != null && photo.photoAgeMonths > 12) {
  const decayFactor = Math.max(1 - (photo.photoAgeMonths - 12) / 36, 0.3);
  confidence = confidence * decayFactor;
}
```

## M9 · Clamp AI-generated dollar values
**File:** `server/photoWaterfall.ts` — add near the top:
```ts
/** Sane job-value bounds per category. Anything outside is clamped and flagged. */
const VALUE_BOUNDS: Record<string, [number, number]> = {
  roofing: [800, 60000],      hvac: [150, 30000],      plumbing: [100, 25000],
  electrical: [100, 25000],   foundation: [1000, 90000], windows: [300, 45000],
  siding: [800, 60000],       flooring: [500, 40000],  painting: [300, 25000],
  landscaping: [100, 30000],  concrete: [500, 40000],  pool: [200, 80000],
};
const DEFAULT_BOUNDS: [number, number] = [100, 50000];

export function clampEstimatedValue(
  category: string, value: unknown
): { value: number; flagged: boolean } {
  const [min, max] = VALUE_BOUNDS[(category ?? "").toLowerCase()] ?? DEFAULT_BOUNDS;
  const n = typeof value === "number" && Number.isFinite(value) ? value : 0;
  if (n < min) return { value: min, flagged: n > 0 };
  if (n > max) return { value: max, flagged: true };
  return { value: n, flagged: false };
}
```
Apply wherever `estimatedValue` is read from the model (Tier 2 and each Tier 3 opportunity):
```ts
const { value: estimatedValue, flagged } = clampEstimatedValue(parsed.category, parsed.estimatedValue);
```
Push `"value_out_of_range"` onto `staleDataFlags` when `flagged` — those go to human review before any offer is shown.

## M10 · Batch processor must not silently drop photos
**File:** `server/photoWaterfall.ts` — `runWaterfallBatch()`. REPLACE the settle loop:
```ts
for (const result of settled) {
  if (result.status === "fulfilled") results.push(result.value);
}
```
WITH:
```ts
settled.forEach((result, idx) => {
  if (result.status === "fulfilled") {
    results.push(result.value);
  } else {
    const failedPhoto = batch[idx];
    failures.push({
      photoUrl: failedPhoto.url,
      jobId: failedPhoto.jobId,
      partnerId: failedPhoto.partnerId,
      error: result.reason instanceof Error ? result.reason.message : String(result.reason),
    });
    console.error("[Waterfall] photo failed", failedPhoto.url, result.reason);
  }
});
```
Declare `const failures: { photoUrl: string; jobId?: number; partnerId?: number; error: string }[] = [];` above the loop, return `failures` alongside `results`, and add to the summary:
```ts
failed: failures.length,
processed: results.length,   // was mislabeled as `total`
total: photos.length,
```
Callers must persist `failures` to a retry/dead-letter table. **This same pattern must be used for Move-In Shield ingestion — a dropped photo there is a lost dispute case.**

## M11 · Agent failures must be visible
**File:** `server/agents/agentOrchestrator.ts` — replace each `console.log('... failed:', x.reason)` with a real handler:
```ts
import { recordAgentFailure } from "./agentLogger";

async function handleAgentResult(
  agentId: string, label: string, result: PromiseSettledResult<unknown>
): Promise<void> {
  if (result.status === "fulfilled") return;
  const message = result.reason instanceof Error ? result.reason.message : String(result.reason);
  console.error(`[AgentOrchestrator] ${label} FAILED:`, message);
  await recordAgentFailure({
    agentId, label, message,
    stack: result.reason instanceof Error ? result.reason.stack : undefined,
  }); // persists + fires the alert hook (email/Slack/PagerDuty)
}
```
Call it for every settled promise in both `runMorningAgentCycle()` and the job-complete cycle. `recordAgentFailure` writes to the agent-run table and triggers an alert — an agent that fails silently for a week is the failure mode being closed here.

---

# MINORS

## m12 · Staleness flags — make them cumulative
**File:** `server/photoWaterfall.ts` — `detectStaleDataFlags()`. REPLACE the if/else chain:
```ts
if (photo.photoAgeMonths > 36) flags.push("photo_over_36_months");
else if (photo.photoAgeMonths > 24) flags.push("photo_over_24_months");
else if (photo.photoAgeMonths > 12) flags.push("photo_over_12_months");
```
WITH:
```ts
if (photo.photoAgeMonths > 12) flags.push("photo_over_12_months");
if (photo.photoAgeMonths > 24) flags.push("photo_over_24_months");
if (photo.photoAgeMonths > 36) flags.push("photo_over_36_months");
```
Now `staleDataFlags.some(f => f.startsWith("photo_over_24"))` correctly catches 36+ month photos.

## m13 · Validate that a URL is actually an image
**File:** `server/photoWaterfall.ts` — `runTier0Heuristic()` keeps the cheap substring pre-check, but add a real verification before Tier 1:
```ts
async function verifyImageContentType(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(5000) });
    const type = res.headers.get("content-type") ?? "";
    return res.ok && type.startsWith("image/");
  } catch { return false; }
}
```
Call in `runWaterfallAnalysis()` after Tier 0 passes; on false, return early with `reason: "URL is not a reachable image"`.

## m14 · Distance decay should use the partner's real radius
**File:** `server/matching-engine.ts` — `scorePartner()`. REPLACE:
```ts
const decay = Math.max(0, 1 - proximity.distanceMiles / 30);
```
WITH:
```ts
const radius = toNum(partner.serviceRadiusMiles, 15) || 15;
const decay = Math.max(0, 1 - proximity.distanceMiles / radius);
```

## m15 · Keep the score on a 100-point scale
**File:** `server/matching-engine.ts`. Fold the founding bonus into the documented weights instead of adding past 100:
```ts
export const SCORING_WEIGHTS = {
  tier: 27, proximity: 25, capacity: 15,
  responsiveness: 15, rating: 8, priority: 5, founding: 5,
} as const; // sums to 100
```
and use `SCORING_WEIGHTS.founding` for the founding/exempt bump. Clamp the final value: `Math.min(100, Math.round(score * 100) / 100)`.

## m16 · Unknown photo age must not fail open
**File:** `server/photoWaterfall.ts` — `runTier0Heuristic()`. REPLACE:
```ts
if (photo.photoAgeMonths && photo.photoAgeMonths > 48) {
```
WITH:
```ts
if (photo.photoAgeMonths != null && photo.photoAgeMonths > 48) {
```
and flag unknown age explicitly in `detectStaleDataFlags()`:
```ts
if (photo.photoAgeMonths == null) flags.push("photo_age_unknown");
```

---

# Verification checklist for the dev team
- [ ] `matching-engine.test.ts` passes; ADD cases: tree-service-vs-pool must NOT match; unset cap does not outrank a configured cap; unrated new partner places mid-pack; same ZIP across 10 opportunities does not return an identical winner every time
- [ ] `photo-pipeline.test.ts` passes; ADD cases: no prompt in any tier contains the service address (assert with the PII guard); Tier 1 error halts instead of proceeding; out-of-range estimated value is clamped and flagged; batch with one failing photo reports `failed: 1` and `processed: n-1`
- [ ] NEW test: undocumented home scores "Undocumented", not 95
- [ ] Render output visually confirmed to carry the watermark; watermark failure returns null
- [ ] Spend guard trips correctly in a forced-limit test
- [ ] Agent failure writes a row and fires the alert hook
