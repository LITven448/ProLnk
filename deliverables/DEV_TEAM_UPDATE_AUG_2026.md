# Dev Team Update — All Changes & New Requirements, Aug 1 → Aug 19, 2026
**ProLnk · TrustyPro · TrustyPro Renters**
**Everything below lives on GitHub branch `deliverables-aug2026`. Pull it before starting anything.**

---

## 1 · CRITICAL — Commission engine (act on this first)

A full code audit of the commission system was completed (`deliverables/analysis/commission-engine-code-audit.md`). Findings:

- The core cascade engine (`ProLnk/server/agents/commissionCascadeEngine.ts`) is **correct** against the canonical spec.
- **BLOCKER 1:** `routers/network.ts` (`network.processJobCommissions`, lines ~304–437) is a live-registered legacy router running the OLD model — 2% hardcoded fee, overrides computed as % of job value instead of % of platform fee, $0.25 origination, no floor, no clamp, no idempotency — and it writes into the paid `commission_payout` table.
- **BLOCKER 2:** `routers/commissions.ts` (`commissions.distributeCommissions`, lines ~167–276) pays own-job at 60% with `Math.random()` event IDs (defeats idempotency) → double-pays L1–L4 overrides.
- **Required:** delete/deregister both legacy routers so the canonical engine is the ONLY payout path; run a ledger sweep for historical wrong/double pays; then execute the 15-item ordered fix list in the audit doc. Test vectors are provided (`deliverables/analysis/commission-engine-test-vectors.md`) — the suite must pass green before any real money moves.

## 2 · Pricing & rate decisions — FINAL (build to these)

Full detail in `deliverables/legal-drafts/RATES-MEMO.md`. Summary:

| Item | Decision |
|---|---|
| **Pro subscription ladder** | **Starter $0 (15%/job) · Solo $99 (10%) · Team $189 (9%) · Business $349 (8%)**. Replaces Core/Pro/Business $99/$149/$249. |
| **Platform fee** | Flat % per tier, charged to the pro, collected AFTER the pro is paid. **The keep-rate model is retired** — no rebate back to the pro. |
| **The fee is the commission pool** | ProLnk pays out of it only on origination (5%) and upline (7/4/2/1%), founding network only, residential + Scout jobs only. **No claim = ProLnk keeps 100%.** Max payout 19%. |
| Add-ons | ProPass $20/mo · dashboard seat $29/mo · 10-ZIP pack $25/mo |
| Work-type upgrades | Rental work +$49/mo · Commercial work +$99/mo · licensee-invited vendors 20% off |
| **Rental work orders** | **$3 per work order, paid by the rental company** (not the vendor). Vendors pay nothing on rental work orders. |
| **Licensee-locked vendors** | **FREE** — see only that licensee's work. Pay only to unlock other work. |
| Commercial | Licensee pays annual license + $3/WO. ProLnk takes **3% only on commercial jobs it sources OUTSIDE the licensee**. The 6–15% residential clamp does NOT apply to commercial — it needs its own fee path. |
| AMH revenue share | **30%**, **split at settlement and paid partner-direct** — never through ProLnk's P&L, no remittance ledger |
| Future (non-Patrick) operators | ~**20%** share, or **$1.50–2.50/door/month with no share** for operators under 10,000 doors |
| Channel partner (Utility Valet / Patrick, L1) | **5%** of platform fee on channel-originated homes (perpetual), **7%** on channel-originated pros. NO subscription share. |
| Founding network | **Capped at 2,125** (Charter 25 · Founding 100 · L3 400 · L4 1,600), $149/mo locked for life. Override applies to residential + Scout jobs ONLY. **Subscription override REMOVED.** |
| Payments | **Split at settlement, no escrow hold.** Partner shares never land in ProLnk's account. |

**Pricing lives in ONE place:** `client/src/config/pricing.ts` (branch `website-fixes`). A regression test fails the build if a price is hardcoded elsewhere. Five conflicting tier systems previously existed in code — see that branch.

The engine must support **two distinct structures simultaneously**: (a) the pro-network cascade per canonical spec §3.2–3.3, and (b) the operator/AMH share model. They are separate intentional models — keep them isolated in code and ledgers.

## 3 · New build specs (all in `deliverables/specs/`)

1. **`renters-p0-build-spec.md`** — TrustyPro Renters end-to-end: operator-branded invite, resident gating (NO prices / NO vendor names / NO marketplace content in resident sessions — test-enforced), Move-In Shield guided capture with a **photo-durability release gate** (backup + restore + corruption drills must pass before ship), maintenance request → AI triage → operator approval → dispatch → tracker, Utility Valet handoff link.
2. **`operator-dashboard-pilot-spec.md`** — thin pilot dashboard: approval queue, claim detail with AI triage + cost band, approve/deny/assign (in-house crew vs vendor), pilot metrics screens (cost/WO, approval time, turn days, adoption). **Andrew mandate: full dashboard live within 120 days — approval queue ships first, remaining screens during pilot.**
3. **`vendor-intake-spec.md`** — vendor intake v2: company size, per-individual licenses, property types served, capacity, markets, FSM used; wired to the subscription ladder above; no per-WO vendor charge.
4. **`rendering-engine-v1.md`** and **`home-health-score-and-nameplate-ocr.md`** — Phase 2, do not start; read for architecture awareness only.
5. **`builder-edition-design-brief.md`** — prototype design brief (Claude design), not a build order yet.
6. **`120-day-launch-plan.md`** — **the schedule.** 90-day build in 4 phases with hard gates, 30-day test protocol, five go/no-go criteria. Feature freeze Day 76. Read it first; it sequences everything on this page.

## 4 · Data-layer requirements (all in `deliverables/schemas/`)

- **`attribution-registry.md`** — permanent address → origination-source registry, written at address creation (bulk CSV import must tag attribution). Every future revenue split computes from this. Day-1 requirement.
- **`qualified-record.md`** — the unit of data value (roof/HVAC/water heater/panel + refresh cadence).
- **`privacy-pipeline.md`** — PII stripping at ingestion, image masking, role-gated unmask. Promised in every partner document and covered by patent claims — must be real code, not policy.
- **`revenue-share-ledgers.md`** — three ledgers: pro cascade, operator share (subs/commerce/move-out/data), channel partner. Accrual + monthly statements. Zero-variance reconciliation is a launch gate.

## 5 · AI requirements (in `deliverables/ai/`)

- **`triage-output-contract.md`** — versioned JSON contract (issue/trade/severity/cost-band/parts); golden test set (500 labeled photos) with accuracy floor as a release gate.
- **`guardrails-and-agent-audit.md`** — every agent/automation inventoried: prompt version control, cost caps, rate limits, fallbacks, PII redaction pre-API, logging, kill switch. Nothing un-audited touches residents.
- Note from audit: `multiModelAI.ts` is currently dead code — live scans run single-path. Decide consciously: wire the waterfall or ship single-model for pilot; don't leave it ambiguous.

## 6 · Payments direction

- Migrating OFF Stripe. Direction: **Moov now → Adyen at scale** (`deliverables/analysis/payment-processor-comparison.md`). Andrew signs the contract; build **split-at-settlement payouts (no escrow hold)**, refunds/disputes flow, and operator-billed work-order fees.
- **Do not build new features on `stripe.ts`.**

## 7 · Legal & compliance (drafts done, counsel pass pending)

`deliverables/legal-drafts/`: operator MSA, resident ToS + privacy, lease addendum, vendor terms, affiliate partner template (includes rendering-rights clause), pro-agreement amendments. Counsel-reviewed versions will replace drafts — build consent-capture points now (operator MSA acceptance, resident ToS at signup, lease-addendum flag).
Security: `deliverables/analysis/security-questionnaire-pack.md` — note the flagged Render-vs-Azure discrepancy; answers must match the ACTUAL launch stack.

## 8 · Infrastructure constraint — Azure cutover

**Do not migrate infrastructure during launch-plan Days 46–120.** Cut over before Day 45 or after go-live. A platform migration during the testing window invalidates the testing. Coordinate the date with Andrew explicitly.

## 9 · Business context changes (awareness, not build orders)

- AMH (~60K homes) in late-stage talks; the 120-day date exists because of it. Pilot metrics (cost/WO, approval time, turn days, adoption) are the product — analytics/event tracking is P0.
- Partner map Rev 2 (`sunbelt-partner-expansion-map.md`): Two Men and a Truck permanently excluded — never integrate or reference.
- `path-to-2-million-doors.md`: growth strategy context.
- Patent: Move-In Shield, Virtual Badge, ProPass gating, Scout origination must NOT be publicly marketed before filings — no public marketing pages for these features without Andrew's OK.

## 10 · Where everything lives

- **Branch:** `deliverables-aug2026` on the ProLnk repo — 36 files under `deliverables/` (specs, schemas, ai, analysis, legal-drafts, kits, outreach) + `PLATFORM_MASTER_AUDIT.md` (93-item checklist; statuses assume NOT DONE until verified against live code).
- **Order of reading:** 120-day launch plan → commission code audit → renters P0 spec → operator dashboard spec → schemas → this document as the index.
- Questions route to Andrew; anything marked 🔶 in the master audit is a decision he owns.
