# AI Agents & Algorithms Audit — ProLnk / TrustyPro
**Reviewed Aug 2026 against `origin/main`. Files: `photoWaterfall.ts`, `matching-engine.ts`, `homeHealthScore.ts`, `agentOrchestrator.ts`, agent suite.**
**Method: static code review. Nothing was executed — no staging access. Every finding is line-verifiable; none are runtime-confirmed.**

---

## First, the good news (and one audit correction)

**CORRECTION to master audit item 7.1.** The audit says "waterfall pipeline is not live; `multiModelAI.ts` is DEAD CODE; live scans run single-path." **That is now wrong.** `multiModelAI` does not exist anywhere in `origin/main`. The real implementation is `server/photoWaterfall.ts` (702 lines) and it is a genuine 5-tier waterfall: heuristic → quality screen → classification → deep analysis → rendering, with confidence gating between tiers. Item 7.1 should be re-marked. The architecture is sound and the cost logic is real.

Also solid: strict JSON-schema structured outputs on every LLM call; graceful degradation instead of throwing; the matching engine is well-documented with pure exported functions and real unit tests; the commission cascade engine remains canonical-correct.

The problems below are in the *details* — and several would be caught by an enterprise security review.

---

## P0 — BLOCKERS

### 1. Full property address is sent to the third-party AI provider on every call
`photoWaterfall.ts` Tiers 1, 2, and 3 each interpolate `photo.serviceAddress` directly into the prompt:
`text: "Quality screen this photo from a job at: ${photo.serviceAddress}"`

This ships a resident's street address to an external subprocessor with every photo analyzed. It contradicts master audit item 8.2 (PII stripping before API calls), the privacy-pipeline schema, and the explicit promises in the AMH partner documents. **The address contributes nothing to the analysis** — the model cannot see the property from its address. Remove it from all three prompts, or replace with an opaque job token. This is the single finding most likely to blow up an AMH security review.

### 2. Tier 4 rendering prompt explicitly forbids the required watermark
`runTier4Renderings()` instructs: *"no watermarks, no before/after split, no text overlays."*
Master audit item 7.5 requires an "AI visualization" watermark on generated images. The code actively instructs the opposite, and there is no "no people" guardrail. Photorealistic renders of a homeowner's actual house, unlabeled, presented next to real photos, is a consumer-deception exposure. Add the watermark at composite time (post-generation, so the model can't refuse it) and add a people-exclusion instruction.

### 3. No cost ceiling anywhere, and Tier 1 fails OPEN
`runTier1QualityScreen()` returns `passed: true` on any error. If the provider has an outage or rate-limits, **every photo fails open into Tiers 2 and 3** — the expensive ones. There is no budget cap, no circuit breaker, no per-tenant spend limit.
Compounding it: `estimateCost()` returns hardcoded constants (`0.0008`, `0.0015`, `0.015`) rather than actual token usage from the API response. So the cost figure you would monitor is fiction, and `estimatedSavingsVsFlatRate` is a vanity metric derived from that fiction. **Fix: fail closed on Tier 1 error, add a daily spend circuit breaker, and read real usage off the API response.**

---

## P1 — MAJORS

### 4. Trade matching produces cross-trade false positives
`tradeMatches()` matches on shared tokens longer than 2 characters. Any partner whose `businessType` shares a common word with the opportunity matches:
- "tree **service**" vs "pool **service**" → MATCH
- "window **cleaning**" vs "gutter **cleaning**" → MATCH
- anything containing "repair", "home", "installation" → MATCH

Result: the wrong trade gets dispatched to a homeowner. Fix with a category-token blocklist (`service`, `home`, `repair`, `cleaning`, `installation`, `residential`) or, better, an explicit trade→category mapping table instead of fuzzy string overlap.
Also `if (targets.length === 0) return true` — an opportunity with no category matches *every* partner.

### 5. Capacity scoring rewards partners who never configure a cap
`atCapacity()`: `cap <= 0` means unlimited. `scorePartner()`: when `cap <= 0`, award the **full 15 points** ("unlimited capacity").
A partner who has never set `weeklyLeadCap` (null → 0) therefore gets maximum capacity score **and** can never be capacity-filtered. Partners who responsibly configure limits are ranked below those who didn't. Fix: treat unset as a default cap, or award neutral (not maximum) points.

### 6. Cold-start burial — new pros can never enter the rotation
`rating == null` → 0 points. `avgLeadResponseHours == null` → 0 points. A brand-new partner starts 25 points behind an established one, and there is **no randomization, round-robin, or exploration term** in `rankPartners()` — it is a deterministic sort. So the same partner wins every lead in a ZIP until they hit a cap (and per #5, many have no cap).
Consequence: new pros get no leads → build no history → never rank → churn. This is a supply-side death spiral, and it also conflicts with fair-distribution expectations for founding members. Fix: neutral priors for unrated partners (e.g. score at the median, not zero) plus a small exploration allocation.

### 7. Home Health Score is not a scoring engine
`homeHealthScore.ts` in full: a pure function over issues **supplied by the caller**, with no database read, no persistence, no history — and it is a `publicProcedure` (unauthenticated).
The critical defect: **`if (issues.length === 0) return 95`.** A home with zero photos and zero documentation scores 95 = "Excellent." That is backwards — an undocumented home should score *low* on completeness. The audit spec calls for completeness + condition + maintenance + safety; this implements only "issues found," and inverts the completeness signal.
This matters commercially: Home Health Score is a marketed feature and a component of the qualified-record data value. As written it cannot support either. Needs a rewrite against the spec, with persistence and vintage tracking.

### 8. Confidence math applies the quality multiplier inconsistently
`runTier2OpportunityDetection()` multiplies by `tier1.qualityScore` **only inside the `photoAgeMonths > 12` branch**. So:
- fresh photo, terrible quality (0.31) → confidence unpenalized, advances to Tier 3
- 13-month photo, perfect quality (1.0) → confidence penalized

Backwards. Apply the quality multiplier uniformly, independent of age decay.

### 9. LLM-generated dollar values reach the user unbounded
`estimatedValue` comes straight from the model into `Tier2Result`/`Tier3Opportunity` with no clamping or sanity bounds. A hallucinated `$250,000` roof estimate flows through to an offer. Clamp per category against a rate table and flag outliers for review.

### 10. Batch processor silently drops failed photos
`runWaterfallBatch()` uses `Promise.allSettled` and pushes only fulfilled results. Rejected photos vanish — no retry, no dead-letter queue, no error surfaced. `summary.total` reports `photos.length` while every other count comes from the shorter `results` array, so the summary silently over-states coverage.
**This pattern must not be reused for Move-In Shield ingestion**, where a dropped photo is a lost dispute case.

### 11. Agent failures are invisible in production
`agentOrchestrator.ts` catches rejections and `console.log`s them. No alerting, no retry, no dead-letter, no persisted failure state. If the morning compliance/tier cycle fails for a week, nobody finds out. Wire to the agent audit logging in the spec and alert on failure.

---

## P2 — MINORS

12. **Broken staleness check (latent).** `detectStaleDataFlags()` sets `photo_over_36_months` *instead of* `photo_over_24_months` (if/else chain), but the consumer tests `f.startsWith("photo_over_24")` — so the **oldest** photos are not flagged stale. Currently masked by the separate `suppressOffers` (>18 months) guard, which means it is dead logic today and a live bug the moment thresholds change.
13. **Tier 0 image detection is substring matching** on the URL (`url.includes("forge")`, `"cdn."`, etc.) — weak and spoofable. Validate content-type on fetch instead.
14. **Proximity decay hardcoded to 30 miles** regardless of the partner's actual `serviceRadiusMiles` (default 15). A partner legitimately serving a 50-mile radius scores 0 proximity at 40 miles while still being "in area."
15. **Score scale drift.** Documented max is 100, but the founding/exempt bonus adds 5 → 105. PPS separately clamps at 105. Pick one scale.
16. **Unknown photo age fails open.** `if (photo.photoAgeMonths && ...)` skips the 48-month rejection when age is undefined — and `0` is falsy, so a same-day photo takes the same path as an unknown one.

---

## Recommended order of work

1. Strip address from all LLM prompts (#1) — one-line change per tier, biggest risk reduction
2. Watermark + people guardrail on renders (#2)
3. Fail-closed Tier 1 + spend circuit breaker + real usage accounting (#3)
4. Trade-match blocklist or mapping table (#4)
5. Capacity + cold-start scoring fixes (#5, #6) — these two decide who gets paid
6. Home Health Score rewrite against spec (#7)
7. Confidence multiplier, value clamping, batch dead-letter, agent alerting (#8–#11)
8. Minors during hardening

## What this review could NOT cover
Static reading only. Not assessed: actual model output quality (needs the golden test set — audit 7.2, still unbuilt), real API costs, live latency, DB-layer behavior, race conditions under concurrency, the React apps' UI logic, and mobile clients. **Triage accuracy remains unmeasured** — no accuracy claim in any partner document is currently backed by evidence.
