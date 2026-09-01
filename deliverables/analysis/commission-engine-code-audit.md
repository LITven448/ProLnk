# Commission Engine — Code Audit vs Canonical Spec (§3.2–3.3)

**Audited:** `origin/main` (commit bc41f84b era), read-only via `git show` — worktree untouched.
**Spec:** `PROLNK_CANONICAL_SPEC.md` §3.2–3.3 · **Vectors:** `deliverables/analysis/commission-engine-test-vectors.md`
**Date:** 2026-08-18

---

## 1. Executive verdict

**The cascade engine itself (`ProLnk/server/agents/commissionCascadeEngine.ts`) is canonical-correct on rates, base, clamping, origination, and floor existence** — L1–L4 = 7/4/2/1% **of the platform fee**, origination 5% address-keyed (perpetual), subscription override 12/6/3/1.5%, fee-rate clamped to [6%, 15%], 20% floor guard present. It is the engine actually wired to real money events (job completion in `routers.ts:2790`, FSM webhooks `fsm-webhooks.ts:241`, Stripe job-payment webhook `routers/stripe.ts:1084`, Stripe `invoice.paid` subscription cascade `routers/stripe.ts:1144`).

**But the platform as deployed is NOT canonical-safe**, for two reasons:

1. **Two additional, mutually incompatible commission engines are still registered as live tRPC mutations** writing to the same `commission_payout` table the disburse rail pays from:
   - `routers/network.ts → network.processJobCommissions` — Joe's old model (2% fee, overrides as % of **job value**, $0.25 photo origination). Exactly the behavior §3.3 says "must change."
   - `routers/commissions.ts → commissions.distributeCommissions` — pays `own_job` 60% into the payout rail, no origination, no floor, random event IDs that **defeat the cascade engine's idempotency guard → double-pay** if both paths ever fire for one job.
   Both are `adminProcedure`-gated, but they are one admin click / one automation away from writing wrong money into the pending-payout queue.

2. Secondary deviations in the live engine: floor skip is all-or-nothing (not deepest-first per V7) and silently drops the whole cascade; floor math ignores the pro keep rate; FSM path hardcodes a 10% fee rate instead of trade-specific rates; the audit agent watches the wrong table.

**Bottom line: do not move real money until the two legacy engines are removed/disabled (Blockers 1–2) and the fix list §4 is applied.**

---

## 2. Finding-by-finding table

All line numbers from `git show origin/main:<path>`.

| # | File:Line | What the code does | What canonical says | Severity |
|---|---|---|---|---|
| F1 | `ProLnk/server/routers/network.ts:304–437` (registered live at `routers.ts:356`) | `processJobCommissions`: hardcodes `platformFeeGross = jobValue * 0.02` (L324); pays own-job 0.5–2.0% and network income 2.0/1.5/1.0/0% **of job value** keyed to the *upline's* level (L328–363, rates from `shared/const.ts:8–34`); flat **$0.25** photo origination (L367–386); `platform_fee_net = gross × 0.85` (L397); subscription-active + minimum-jobs gates not in spec (L350–358); no floor, no clamping, no idempotency — event id re-fetched by `job_id` (L400–403, can be stale/undefined → dangling rows); $149 Charter rebate credit (L426–432). Writes `commission_payout` rows the disburse rail pays. | Fee 6–15% of job value; overrides 7/4/2/1% **of platform fee** keyed to depth; origination **5% of platform fee**; 20% floor; idempotent. This is precisely the "Joe's build" behavior §3.3 flags as wrong. | **BLOCKER** |
| F2 | `ProLnk/server/routers/commissions.ts:167–276` (registered live at `routers.ts:376`) | `distributeCommissions`: writes `own_job` = 60% of platform fee **into `commission_payout`** (L211–216) — the cascade engine never writes own_job, so pro keep is double-counted if both settle; **no origination payout, no 20% floor check, no clamping** (zod at L173 *rejects* out-of-range instead of clamping); event IDs are `Math.random()` (L194, L248) so the cascade engine's `payoutsExistForEvent` guard cannot see these rows → **same job paid by this router + the engine = duplicate L1–L4 overrides**. Also mutates `partners.monthlyCommissionEarned` (L259–264), a ledger the engine never touches. | One engine, one idempotency key per job event; cascade = origination 5% + 7/4/2/1 of platform fee; floor enforced. | **BLOCKER** |
| F3 | `ProLnk/server/agents/commissionCascadeEngine.ts:291–307` | Floor breach → **skips ALL payouts** and returns `success:false`; callers (`fsm-webhooks.ts:248`, `routers/stripe.ts:1091`) just log — the job's legitimately payable levels are silently never paid, with no retry/queue. | V7: skip **deepest level first** until the floor holds, and log which levels were skipped. (§3.3's literal wording "cascade is skipped" is what the code implements — spec and vector doc conflict; vector doc is stricter.) At canonical rates max distribution is 19% so the branch is unreachable today, but it is the wrong behavior the day a promo/extra stream is added. | MAJOR |
| F4 | `commissionCascadeEngine.ts:291–293, 514` | `prolnkRetains = platformFee − cascade distributions` — the pro keep rate (60%) is not modeled anywhere in the engine, so the "≥20%" check compares against 81%, not the real ~21% (60% keep + 19% cascade). Comment at `routers/commissions.ts:33–34` confirms the floor is meant to be **after all commissions incl. keep**. The floor as coded can never detect a real retention breach. | "ProLnk always retains ≥20% of the platform fee" — after all payouts. (Note: the vector doc V1 also computes retention pre-keep; spec owner should resolve, but the safe reading is post-keep.) | MAJOR |
| F5 | `ProLnk/server/fsm-webhooks.ts:234` | `const platformFeeRate = 0.1;` hardcoded for every FSM-completed job. `routers.ts:2770–2771` shows the correct pattern (`getPlatformFeeRate(input.jobType)` from `server/config/platformFees`). | fee_rate is trade-specific within 6–15%. FSM jobs at a 15%-trade are under-fee'd (and cascades under-paid) by a third. | MAJOR |
| F6 | `ProLnk/server/agents/commissionAuditAgent.ts:39–89` | Audits only the legacy `commissions` table (large/unpaid, duplicates by `opportunityId`, missing Stripe Connect). **Never queries `commission_payout`** — the cascade rail that actually moves cascade money has zero anomaly monitoring. Header (L7–8) promises orphaned-commission and FSM-wrong-rate checks that are not implemented (`orphanedCommissions` is always 0). | The audit function should watch the ledger the cascade writes. | MAJOR |
| F7 | Vector V9 — nowhere in codebase | No channel-partner origination ledger, no 7% pro-origination override for channel-onboarded pros, no channel/sub-share exclusion logic. (`git grep` finds no implementation.) | V9 (Patrick model): 5% origination to channel ledger; 7% pro-origination override; NO subscription share for channels. | MAJOR (unbuilt, not wrong money — but vectors will fail) |
| F8 | `commissionCascadeEngine.ts:220–223` | No guard on `jobValue ≤ 0`. Negative values are (accidentally) blocked by the floor check going negative; `jobValue = 0` proceeds and inserts **$0.00 payout rows** for every chain member (dangling ledger rows, V4 fail-condition adjacent). Stripe webhook can pass 0 (`routers/stripe.ts:1066`, `amount_total || 0`). | No dangling/zero ledger rows. | MINOR |
| F9 | `commissionCascadeEngine.ts:261, 283, 291–292` | Per-split `Math.round(x*100)/100` on binary floats; `prolnkRetains` derived then re-rounded. The V11 identity `sum(distributions) + retained == platformFee` holds only up to float error; engine uses raw `number` while `routers/commissions.ts` uses `Decimal` — inconsistent money math. | V11: exact penny reconciliation, every job, property-tested 10k cases. | MINOR |
| F10 | `commissionCascadeEngine.ts:373` | Subscription idempotency key = `sub_{partnerId}_{YYYY-MM}` — one cascade per subscriber per calendar month. A legitimate second invoice in the same month (upgrade/proration/annual→monthly switch) gets no override cascade. | Override on subscription fees (each fee). | MINOR |
| F11 | `commissionCascadeEngine.ts:100–110` | `payoutsExistForEvent` **fails open** (returns `false` on DB error, by design per comment) → transient read failure can double-pay; also `jobEventKey` (L83–89) truncates SHA-256 to 31 bits — cross-job collision marks a *different* job "already paid" and silently skips it (~0.05% collision odds at 50k jobs, silent money loss when it hits). | Idempotency must be exact; skip only true duplicates. | MINOR |
| F12 | `ProLnk/server/routers/networkOverrides.ts:5–6, 56–60` | Projection endpoint hardcodes `SUB_PRICE = 149` for every downline member; actual tiers are $99/$149/$299+ (`routers/stripe.ts:32–58`). Rates themselves are canonical (12/6/3/1.5). Display-only (no writes). | Subscription override applies to each pro's actual subscription fee. Overstates projected income for Core-tier downlines. | MINOR |
| F13 | `commissionCascadeEngine.ts:260` | Origination is suppressed when originator == completing pro (self-credit guard). Not in the spec ("perpetual to the originating pro"); probably intended, but should be ratified in the spec. | §3.3 item 3 is unconditional. | MINOR |
| F14 | `routers/commissions.ts:63–99` | Public `calculateCommission` computes `prolnkRetains` assuming a full 4-level upline always exists and 60% keep — a hypothetical display; fine as marketing math, but it publishes a retention figure (26%) that disagrees with the engine's definition (F4). | Cosmetic consistency. | MINOR |

**Confirmed correct in the live engine:** cascade base = platform fee ✔ (L261, 283 — multiply `platformFee`, never pro earnings; V6 safe); clamping ✔ (L222, 456: `Math.min(Math.max(rate, 0.06), 0.15)` — true clamp, V2/V3 safe); origination 5% address-hash keyed, `is_first_documentation` anchored → perpetual across ownership change ✔ (L118–125, V8 safe); subscription rates 12/6/3/1.5 ✔ (L8); floor constant 20% present ✔ (L9); job idempotency via deterministic `jobEventKey` across matched-loop + FSM ✔ (L83–110, 244–256; `routers.ts:2775–2781` builds a deterministic jobId).

---

## 3. Test coverage vs the vector doc

Existing suite: `ProLnk/server/commission-cascade.integration.test.ts` (mocked-DB integration; drives the real engine; also `network.income.test.ts`, `disburse-payouts.integration.test.ts`, `payout.requests.test.ts` cover the rail, not the math).

| Vector | Status | Reasoning (from code — nothing executed) |
|---|---|---|
| V1 full stack + origination | **PASS (covered, different numbers)** | Test at L289–314 asserts orig 5% + L1–L4 = 19% distributed, 81% retained; L242–287 asserts 7/4/2/1 amounts + recipients + persisted rows. |
| V2 clamp low (3%→6%) | **UNTESTED — would pass** | Engine clamps (L222); no test exercises an out-of-range rate. Note: the tRPC entry points (`routers.ts:6286`, `routers/commissions.ts:67`) *reject* instead of clamp. |
| V3 clamp high (20%→15%) | **UNTESTED — would pass** | Same. |
| V4 no upline, no origination | **UNTESTED — would pass** for the engine (empty chain → zero inserts). **FAIL** on the F1 path (`network.ts` still pays own_job + $0.25). Zero-value jobs create $0 rows (F8). |
| V5 partial upline L1+L2 only | **UNTESTED — would pass** | Engine iterates only existing chain nodes (L272–288); no rollup. |
| V6 base = platform fee (THE critical one) | **PASS (covered)** | Test L242–287: 7% of $1,000 fee = $70, asserted against persisted rows. The engine cannot produce the $3.36 failure. **But F1/F2 routes would fail V6 outright and are untested.** |
| V7 floor deepest-first skip | **FAIL** | Engine skips *everything* and returns `success:false` (L295–307); no per-level skip, no skipped-level logging. The test itself (test file L289–296 comment) concedes the branch can't trip at canonical rates and only asserts non-trip. |
| V8 origination perpetual across ownership | **UNTESTED — would pass** | Address-hash keyed (`hashAddress`, L64–70), not account-keyed. |
| V9 channel-partner origination | **FAIL / not implemented** (F7). |
| V10 operator separation | **PASS trivially / UNTESTED** | No operator code exists (see §5), so V1-at-operator-home ≡ V1. |
| V11 rounding + penny reconciliation property test | **UNTESTED; may fail** | Float math (F9); no property test exists anywhere in the suite. |
| V12 per-WO vendor fee ($5–8) | **Not implemented / UNTESTED** | No work-order fee netting in any payout path (expected — model 5.4 is new). |

Also well covered by the existing suite (beyond the vectors): snake_case persistence regression (N5), idempotency/double-pay across matched-loop + FSM (SEAM-2), preview read-only, subscription 12/6/3/1.5 persistence, origination self-credit guard.

**Sign-off gate per the vector doc is NOT met:** V7 fails, V9/V12 unbuilt, V11 property test absent, and V2–V5/V8 are unexercised.

---

## 4. Fix list for the dev team (ordered by severity)

**BLOCKER — before any real payout run:**
1. **Delete or hard-disable `network.processJobCommissions`** (`routers/network.ts:304–437`) and the legacy rate table `NETWORK_RATES.ownJob / networkIncome / networkDepth / photoOrigination` (`shared/const.ts:8–34`, keep `charterPartnerMax`). If an admin trigger is still needed, make it delegate to `distributeJobCommissions(...)` with `getPlatformFeeRate(jobType)`.
2. **Delete or hard-disable `commissions.distributeCommissions`** (`routers/commissions.ts:167–276`). If retained as an admin tool, it must: (a) call the cascade engine instead of reimplementing it; (b) never insert `own_job` into `commission_payout` unless pro-keep is formally moved onto the rail (one decision, one place); (c) use `jobEventKey(jobId)` — never `Math.random()` — so the idempotency guard is shared. Add a DB uniqueness constraint on `(job_commission_event_id, recipient_user_id, payout_type)` as a backstop against any writer bypassing the guard.
3. **One-time ledger sweep** before first disbursement: audit existing `commission_payout` rows for `payout_type` values only the legacy paths emit (`own_job`, `photo_origination`) and for events whose `rate_applied` ∉ {0.05, 0.07, 0.04, 0.02, 0.01, 0.12, 0.06, 0.03, 0.015}; quarantine before the disburse rail pays them.

**MAJOR:**
4. Floor semantics (F3): implement deepest-first level skipping — sort candidate distributions [L4, L3, L2, origination-last or per spec-owner ruling], drop until `retained ≥ floor`, log skipped levels, and still pay the surviving levels (never return an all-or-nothing `success:false` for a solvable floor breach). ~15 lines in `distributeJobCommissions` around L291–307, mirrored in `previewJobCommissions` L512–519.
5. Floor base (F4): get a one-line spec ruling — floor measured before or after pro keep. If after (the safe reading, and what `routers/commissions.ts:33` documents), the engine must receive/compute the completing pro's keep amount and include it in `totalDistributed` for the floor test.
6. FSM fee rate (F5): replace `const platformFeeRate = 0.1` at `fsm-webhooks.ts:234` with `getPlatformFeeRate(<trade/jobType from the FSM opportunity>)`, falling back to 0.10 only when the trade is unresolvable (and log it).
7. Audit agent (F6): add `commission_payout` checks — per-event reconciliation (`sum(amount) + implied retention == platform_fee` from `job_commission_event`), rate whitelist check, duplicate `(event, recipient, type)` detection, and rows with `job_commission_event_id = 0`/orphaned keys. Wire the promised orphan + FSM-rate checks or delete them from the header.
8. Channel origination (F7/V9): build the channel ledger + 7% pro-origination override, or formally defer V9 with a dated note in the vector doc so CI isn't gated on it.

**MINOR:**
9. Guard `jobValue > 0` (and `subscriptionAmount > 0`) at the top of both engine entry points; return a typed no-op instead of inserting $0 rows (F8).
10. Convert engine money math to `Decimal` (already a dependency) or integer cents; add the V11 property test (10k random triples asserting exact penny identity) (F9).
11. Subscription idempotency key: include the Stripe invoice id (available at the `invoice.paid` call site, `routers/stripe.ts:1144`) instead of `sub_{id}_{month}` (F10).
12. Widen `jobEventKey` to a proper unique column (store the jobId string or a 64-bit key) to remove the 31-bit collision class; make `payoutsExistForEvent` fail **closed** (queue for retry) rather than open (F11).
13. `networkOverrides.getOverrideIncome`: use each downline member's actual tier price instead of a flat $149 (F12); label the endpoint output as an estimate meanwhile.
14. Add the missing vector tests: V2/V3 clamp, V4 empty-everything, V5 partial upline, V8 perpetuity (two events, same address hash, different "owner").
15. Ratify the origination self-credit guard (F13) in the spec, and align `calculateCommission`'s displayed retention with the ruled floor definition (F14).

---

## 5. Operator (20%) revenue share — absence confirmed

Searched `origin/main:ProLnk/server` for `AMH`, `operator` share/ledger patterns, `0.3`/`30%` revenue-share terms: **no matches**. No cascade level, payout type, rate constant, or ledger implements an operator revenue share, and `payout_type` values across all three writers are limited to `own_job`, `network_l1–l4`, `home_origination`, `photo_origination`, `subscription_l1–l4`. This matches expectation (V10 / test-vector rule 6): the operator share is a separate ledger to be built outside the cascade, and nothing in the cascade code would need untangling first. (The only 30%-adjacent figure in code, `platform_fee_net = gross × 0.85` at `network.ts:397`, is a legacy processing-cost assumption in the F1 path slated for deletion, not an operator share.)

---

*Audit read entirely from `git show origin/main:<path>`; no checkout, no code executed.*
