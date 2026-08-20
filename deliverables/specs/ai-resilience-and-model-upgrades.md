# AI Resilience & Model Upgrade Spec
**Answers two questions: what happens when the AI breaks, and how we swap in better models as they ship.**
**Also supports the patent posture — the system is architecture-agnostic; no claim depends on a named vendor.**

---

## PART 1 — Context without identity (revised approach to PII)

**The platform needs the address. The model does not.** Storm correlation, property categorization, and enrichment all happen server-side in our own database. The model only ever sees the image plus non-identifying context.

**Server-side (keeps full address — unchanged):**
- address → lat/lng → NOAA/weather-event join for hail, wind, freeze correlation
- address → county/ATTOM enrichment: year built, square footage, roof material, property type
- address → attribution registry, Vault record, operator assignment

**Sent to the model instead of the address:**
```ts
interface ModelContext {
  propertyType: "single_family" | "townhome" | "condo" | "multifamily";
  yearBuilt?: number;              // from enrichment, not the resident
  climateZone: string;             // e.g. "north_texas_hail_belt"
  knownRoofMaterial?: string;      // from enrichment
  recentWeatherEvents?: string[];  // e.g. ["hail_1.75in_2026-04-12"] — computed server-side
  photoType: string;               // from Tier 1
}
```
Example prompt context: *"Single-family, built 2019, North Texas hail belt, composition shingle, hail event 1.75in twelve days ago."*

**This is strictly better for accuracy than an address was.** The model cannot geolocate a street name, but it can absolutely use "hail 12 days ago on a 2019 composition roof" — that context materially improves damage classification. We lose nothing and gain signal.

**Rule:** the `assertNoPii()` guard stays. Address, resident name, unit number, and phone never enter a prompt.

---

## PART 2 — Rendering policy (revised, narrower)

Renders are **inspiration only**. The professional owns the actual scope and quote. Policy encoded in three rules:

**Rule 1 — Render the AFTER, never the BEFORE.** The dividing line is not job type — restoration work is legitimately worth visualizing ("here's your house with the new roof"). The rule is that the *current condition* is evidence and must never be synthesized or altered.

- ALLOWED: generate a finished/repaired future state — new shingles, repaired siding, cleaned exterior, new paint
- NEVER: generate, alter, enhance, or "clean up" imagery of the existing damage or current condition. The original photo is the evidentiary record and stays untouched.

**The three photo classes.** Rules differ by class; the class is set at creation and never changes.

| Class | What it is | Evidentiary? | In exports? | Disposition |
|---|---|---|---|---|
| `documentation` | Move-In Shield captures, condition/scan photos | Yes — timestamped, immutable | Yes | Retained per policy; never user-deletable during tenancy |
| `job_record` | Real before/after photos of completed work | Yes — proof of work, warranty evidence | Yes | Retained; feeds portfolio + Home Vault history |
| `render` | AI visualizations and upgrade suggestions | **No — never** | **Never** | Homeowner accepts / rejects / deletes |

Renders behave like AI findings: they arrive in the homeowner's file as **suggestions**, sit alongside "AI found a possible issue," and the homeowner triages them.
- **Accept** → saved to their ideas/projects area, can convert to a job request
- **Reject** → archived, hidden from the feed, retained as preference signal (informs future suggestions)
- **Delete** → hard-deleted, honors CCPA/TDPSA deletion; no soft-delete, no retention of the image

Because a render is never evidentiary, the export filter is simple: exports include `documentation` and `job_record` only. A render cannot reach a claim file, dispute packet, or move-out comparison by any path.

**Rule 1a — Renders live outside the evidence chain.** This is the technical control that makes the above safe:
```ts
// Renders are a separate record type in separate storage. They are NEVER
// included in: Move-In Shield packets, move-out comparison exports,
// insurance claim exports, dispute packets, or operator documentation exports.
interface RenderedImage {
  id: number;
  sourcePhotoId: number;        // links to the original, never replaces it
  storageClass: "render";       // separate bucket from "documentation"
  excludeFromExports: true;     // enforced at the export layer, not by convention
  watermarked: boolean;         // must be true to be servable
}
```
Export functions filter on `storageClass === "documentation"`. A render cannot reach a claim file or a dispute packet even if a user tries to attach one.

**Rule 1b — Constrained scope for restoration renders.** Free-form beautification on a repair job invites the "you promised me that" dispute. Restoration prompts are scope-locked:
```ts
const RESTORATION_PROMPT_GUARD = `
Show ONLY the completed repair described. Match existing materials, profile,
and color family. Do NOT add, remove, or restyle anything else: no new windows,
no changed rooflines, no added landscaping, no altered trim colors.`;
```
Applied whenever the opportunity is `offerTrack === "repair"`. Discretionary transformation renders (paint, landscaping, patio, deck, lighting, fencing) keep the open-ended prompt.

**Rule 1c — Insurance-flagged findings render only the repaired state, never enter an export, and carry the label.** With 1a and 1b enforced, a roof-replacement visualization is a sales tool rather than a liability — the damage photo stays authentic, the render stays labeled and quarantined from every claim path.

**Rule 2 — Label it, subtly.** Not a heavy overlay. A thin bottom bar, 12px, "AI visualization — actual results will vary." Applied server-side at composite time so it cannot be skipped. If the watermark step fails, return no image rather than an unlabeled one.
Rationale: the label is not about what we promise in-app — it is about the image after it leaves the app. Screenshotted, texted, forwarded to a contractor or an adjuster, the picture arrives with no context. The label travels with it.

**Rule 3 — No people, no identifiers.** Prompt excludes people, faces, pets, license plates, house numbers.

**Copy in the UI** (once, near the render): *"AI concept based on your photo — your pro will confirm what's actually possible."* That sentence plus the label closes the gap without dampening the feature.

---

## PART 3 — What happens when the AI breaks

**Principle: capture never depends on AI.** Photos are stored and the request is submitted whether or not any model is reachable. AI enriches; it is never in the critical path of a resident documenting their home or filing a request. This is absolute for Move-In Shield.

### Failure ladder
| Stage | Behavior |
|---|---|
| Single call fails | Retry 3× with exponential backoff (1s, 4s, 12s) + jitter |
| Still failing | Fail over to the secondary provider configured for that tier |
| Secondary fails | Photo → `analysis_pending` queue. User sees "Analyzing — we'll notify you," never an error |
| Error rate > 25% over 5 min | Circuit breaker opens: stop calling that provider for 10 min, all traffic to secondary |
| Both providers down | Degraded mode: capture + storage + manual request flow continue. Operator dashboard shows "AI triage unavailable — manual review" |
| Recovery | Queue drains automatically, oldest first, rate-limited |

```ts
// server/_core/aiCircuitBreaker.ts
interface BreakerState { failures: number; total: number; openedAt: number | null; }
const state = new Map<string, BreakerState>();
const WINDOW_MS = 5 * 60_000, OPEN_MS = 10 * 60_000, THRESHOLD = 0.25, MIN_SAMPLES = 8;

export function recordResult(provider: string, ok: boolean): void { /* rolling window */ }
export function isOpen(provider: string): boolean { /* honors OPEN_MS cooldown */ }
```

### Spend protection (from the fixes doc)
- Daily cap via `aiSpendGuard`, default `$250`, env-tunable
- **Separate, lower cap for bulk/backfill jobs** — historical FSM ingestion runs under its own budget with renderings force-disabled
- Alert at 50% / 80% / 100% of cap
- Real token usage recorded per call, not constants — this is also what makes COGS-per-home reportable

### Never-fail-open rule
Tier 1 failing open was the original defect: the cost gate disappears exactly when the provider is unhealthy. Tier 1 now fails to the retry queue, not to the expensive tiers.

---

## PART 4 — Upgrading models as AI improves

**Goal: change models without a deploy, and never regress accuracy.**

### 4.1 Model registry (config, not code)
```ts
// One row per tier. Editable in admin UI / DB — no redeploy.
interface ModelBinding {
  tier: "triage" | "classify" | "analyze" | "render";
  primary:   { provider: string; model: string; inputPerMTok: number; outputPerMTok: number };
  secondary: { provider: string; model: string; inputPerMTok: number; outputPerMTok: number };
  promptVersion: string;   // prompts are versioned WITH the model binding
  status: "active" | "shadow" | "retired";
  activatedAt: Date;
  activatedBy: string;
}
```
`VLM_MODELS` becomes a lookup against this registry. Pricing lives here too, so cost accounting updates when rates change.

### 4.2 Promotion gate — nothing ships on vibes
A candidate model must clear all four before it can become `primary`:
1. **Golden set accuracy ≥ current primary** (the 500-photo labeled set — audit item 7.2)
2. **No regression on any severity class** — specifically, urgent findings must not drop
3. **Cost per photo within 1.5× of current**, or the improvement must justify it explicitly
4. **p95 latency ≤ 1.5× current**

### 4.3 Shadow mode
New model runs in parallel on a sampled % of live traffic. Outputs are logged and compared; **the user never sees shadow output.** Promote only when the comparison report shows a win. One-click rollback restores the prior binding — the previous registry row is retained.

### 4.4 Prompt versioning
Prompts are stored with the binding, not inline in source. Changing a prompt creates a new version, which must clear the same gate. Every stored analysis records `{modelId, promptVersion}` so any past result is reproducible and explainable — this matters when a partner asks why a call was made.

### 4.5 Continuous evaluation
- Weekly automated run of the golden set against production bindings → accuracy dashboard
- Drift alert if accuracy drops >3 points week over week
- Human-QA sampling: 2% of live analyses reviewed and fed back into the golden set, which grows over time

### 4.6 Patent alignment
No claim depends on a named vendor. The registry is the concrete embodiment of "architecture-agnostic model selection" — swapping providers is a config change, which is exactly the posture V14.1 describes. Keep it that way in any public description.

---

## Build order
1. Model registry + config-driven bindings (unblocks everything else)
2. Circuit breaker + retry queue + degraded mode
3. Spend guard with separate bulk budget
4. Golden test set (blocked on Andrew sourcing ~500 labeled photos)
5. Promotion gate + shadow mode (needs #4 to be meaningful)
6. Continuous eval dashboard


---

## APPENDIX — Real job photos are the golden test set

`job_record` before/after pairs are labeled training data we already own: a before photo, the trade and scope actually performed, the real invoice value, and an after photo confirming the outcome. That is precisely the structure the golden test set needs (audit 7.2).

**Use them:** export completed jobs that have a before photo + confirmed trade + final invoice, and treat the recorded work as ground truth for what the AI should have detected and what it should have estimated. This validates both triage accuracy and cost-band accuracy against real money — stronger than hand-labeling, because the label is what a professional actually did and charged.

Sourcing ~500 labeled photos is on the founder's task list; the completed-job archive may already satisfy most of it.
