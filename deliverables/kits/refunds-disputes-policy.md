# Refunds, Disputes & Chargebacks — Internal Policy

**INTERNAL ONLY — never share externally or quote to customers verbatim.**
**Owner:** Andrew Frakes · **Operated by:** [OPS_LEAD_NAME] + support · **Audit ref:** PLATFORM_MASTER_AUDIT §5.9
**Companion:** support-playbook.md §5 (dispute intake script) and macros M14–M21.
**Payments context:** charges + pro payouts via Stripe / Stripe Connect. Payout release on confirmed completion is the platform's main lever — **when in doubt, hold the payout; never claw back what a hold could have prevented.**

---

## 1. Dispute categories

| Category | Definition | Typical trigger |
|---|---|---|
| **Quality** | Work performed but defective, incomplete, or below scope | Customer complaint within [QUALITY_WINDOW, e.g. 7 days] of completion |
| **No-show** | Pro accepted and failed to appear in window without valid notice | Customer report; GPS/check-in absence |
| **Damage** | Property or belongings damaged during the job | Customer claim + photos |
| **Overcharge** | Amount charged exceeds quote/scope without approved change order | Billing complaint |
| **Chargeback** | Customer disputes the charge with their bank (any underlying reason) | Processor notification |

Every dispute gets: a case ID, a named owner, a category, an evidence file, and a decision logged in [DISPUTE_LOG_LOCATION]. Intake per support-playbook §5. **On case open: pause payout release for the job immediately** (if not yet released).

## 2. Decision matrix — who eats the cost

| Scenario | Evidence says | Customer remedy | Cost falls on |
|---|---|---|---|
| Quality — pro at fault | Completion photos don't support the work / return visit failed | Rework or refund | **Pro** (payout forfeited/reduced; platform refunds customer, recovers from held payout) |
| Quality — customer unreasonable | Completion photos + scope support the pro | Explanation; goodwill credit ≤ $[GOODWILL_CAP] optional | **Platform** (goodwill only) |
| Quality — ambiguous | Evidence genuinely split | 50% remedy or return visit | **Split platform/pro** [SPLIT_RATIO, default 50/50]; log for pattern review |
| No-show — pro fault | No check-in, no valid notice | Full refund of anything paid + priority rebooking | **Pro** (strike + any trip fee refunded from pro side) |
| No-show — customer fault (no access) | Pro checked in / documented arrival | No refund; rebooking fee may apply | **Customer** |
| Damage — pro caused, under $[SMALL_DAMAGE_CAP] | Photos + Move-In Shield baseline confirm new damage | Repair or reimbursement | **Pro** (from held payout / next payouts); platform fronts customer immediately |
| Damage — pro caused, over $[SMALL_DAMAGE_CAP] | Same | Insurance claim | **Pro's insurance** (GL cert on file); platform coordinates; reserve fund fronts if claim is slow, recovered on settlement |
| Damage — pre-existing | Move-In Shield / before-photos show it predates job | Claim declined with evidence shown | **Nobody** (this is why completion + baseline photos exist) |
| Overcharge — unapproved scope creep | No signed change order | Refund of delta | **Pro** |
| Overcharge — platform/billing error | Our pricing/fee bug | Immediate refund | **Platform** |
| Chargeback lost despite valid evidence | We fought and lost | n/a (bank decided) | **Platform** (reserve fund); pro keeps payout if their evidence was clean |
| Chargeback caused by pro failure | Underlying quality/no-show substantiated | n/a | **Pro** (payout recovery) + strike |
| Fraud (either side) | Fabricated claim or fake completion | Per case | **Fraudulent party**; immediate removal + [LEGAL/LAW_ENFORCEMENT] review |

**Principles:**
1. Make the customer whole **fast** (platform fronts the money), then settle internally. Speed of remedy is the product.
2. The pro pays only when evidence supports it — and pros are told exactly what evidence protects them (completion photos).
3. The platform eats ambiguity at pilot scale; track it. If "platform eats it" exceeds [X]% of disputes, tighten evidence requirements, not fairness.
4. Operator-property disputes additionally get an FYI to the operator's account contact within [X] hours — they hear it from us first, never from the resident.

## 3. Refund authority levels

| Level | Role | May approve alone | Notes |
|---|---|---|---|
| L1 | Support agent | **≤ $[L1_LIMIT, e.g. 100]** per case; obvious billing errors/duplicates **≤ $[L1_BILLING_LIMIT, e.g. 500]** | Same-day; log reason code |
| L2 | Ops lead | **≤ $[L2_LIMIT, e.g. 1,000]**; any pro-payout forfeiture; goodwill credits | Reviews all L1 refunds weekly |
| L3 | Andrew | Above $[L2_LIMIT]; anything touching an operator contract, insurance claim, or legal exposure; all clawbacks from already-paid funds | Final |

- Refunds always to the **original payment method**. Credits/coupons only as goodwill on top, never instead of an owed refund.
- One refund per job per approver — a second refund attempt on the same job auto-escalates one level.
- Weekly refund report to Andrew: count, $ total, category mix, by-pro concentration.

## 4. Chargeback response process

**Clock:** processor response windows are short (typically 7–21 days) — treat every chargeback notice as **P2, owner assigned same day**.

1. **Notice arrives** (Stripe dashboard/webhook) → open case, tag `chargeback`, freeze any unreleased payout on the job.
2. **Decide: fight or accept.** Accept (refund stands) when the underlying complaint is valid or evidence is weak and amount < $[FIGHT_THRESHOLD, e.g. 150] — fighting bad cases burns processor standing. Fight when evidence is solid.
3. **Assemble evidence pack** (checklist below) and submit through the processor before deadline.
4. **Parallel:** contact the customer — many chargebacks are confusion ("didn't recognize the charge"); a customer can withdraw a dispute with their bank.
5. **Log outcome** (won/lost/withdrawn) and root cause; recurring "didn't recognize" = fix the statement descriptor.
6. **Monitor rate:** chargebacks / transactions must stay **< [0.5]%**. At [0.75]% → Andrew + processor-relationship review.

**Evidence checklist (per submission):**
- [ ] Signed estimate/quote and any change orders (amount authorization)
- [ ] Job record: request, photos submitted by customer, AI triage, dispatch, acceptance
- [ ] **Completion confirmation:** completion photos (before/after), customer sign-off/signature, timestamp
- [ ] In-app **message thread** with the customer (scheduling, updates, any satisfaction confirmation)
- [ ] Pro check-in/GPS/timestamp data if available
- [ ] Terms of service acceptance record (date/IP)
- [ ] Prior refund/remedy offers made and customer's responses
- [ ] For rentals: Move-In Shield baseline photos if condition is at issue

## 5. Reserve fund policy

- **Reserve rate: [X]% of processed job volume** [suggested starting point: 5% at pilot, revisit quarterly] swept to a segregated reserve account [ACCOUNT_REF].
- **Pays for:** customer refunds fronted before internal recovery, lost chargebacks + fees, damage fronts pending insurance settlement, goodwill credits.
- **Floor:** reserve never drops below [MIN_BALANCE, e.g. the greater of $[FLOOR_$] or 90 days' trailing dispute cost]. Below floor → raise reserve rate, Andrew notified.
- **Recoveries** (payout forfeitures, insurance settlements, clawbacks) flow back into the reserve.
- **Review:** quarterly — if trailing dispute cost < [Y]% of volume for two consecutive quarters, step the rate down [0.5–1] point at a time.
- **Pro-side rolling reserve (optional lever):** for pros with an active strike or elevated dispute rate, hold [Z]% of each payout for [30/60] days before release. Applied per-pro by L2, disclosed to the pro in writing.

## 6. Pro-side consequences — strike system

**Strikeable events:** no-show (fault), substantiated quality dispute, substantiated damage with failure to cooperate, unapproved overcharge, falsified completion, harassment/conduct.
*(Not strikeable: declined jobs, disputes resolved in the pro's favor, customer-fault outcomes.)*

| Stage | Trigger | Consequence | Communicated |
|---|---|---|---|
| **Strike 1 — Warning** | First substantiated event | Written warning; event logged; coaching note (what evidence/behavior fixes it) | Email + in-app, within 24h of decision |
| **Strike 2 — Hold** | Second event within [12] months | **Dispatch hold [7–14] days** + priority-rank reset; payouts on completed work continue; operator-portfolio access reviewed with operator | Email + call from ops lead |
| **Strike 3 — Removal** | Third event within [12] months, or any single severe event* | Removed from platform; final payouts held [X] days against open disputes, then released net of recoveries; operator notified | Call + written notice (Andrew approves all removals) |

*\*Immediate-removal severe events (skip to Strike 3): safety threat, falsified completion/fraud, working while clearance-lapsed, criminal conduct on site.*

- Strikes expire [12] months after issuance (rolling window).
- **Appeal:** pro may appeal any strike within [7] days with new evidence; ops lead hears strike 1–2 appeals, Andrew hears removal appeals. One appeal per strike.
- Strike status feeds queue priority — a pro on strike 1 loses tie-breaks; strike 2 sits behind clean pros.

## 7. Clawback execution steps

*Clawback = recovering money already paid out to a pro. Last resort — payout **holds** are always preferred. L3 (Andrew) approval required for every clawback.*

1. **Verify the debt:** case decided, appeal window lapsed or appeal denied, amount computed (customer remedy + fees attributable to the pro).
2. **Notify in writing:** amount, case ID, basis, and the recovery path below. Give [5] business days to respond or arrange voluntary repayment.
3. **Recovery waterfall (in order):**
   a. Offset against **held/unreleased payouts** on other jobs.
   b. Offset against **future payouts** — up to [50]% of each payout until recovered (leaves the pro income to keep working; full offset only for fraud).
   c. **Negative-balance debit** via Stripe Connect where permitted by the pro's Connect agreement.
   d. Voluntary **repayment plan** (written, max [90] days).
   e. If pro leaves platform with balance owing: demand letter; over $[COLLECTIONS_THRESHOLD] consider collections/small claims — Andrew's call, weigh cost vs. amount.
4. **Insurance-covered damage:** claim against the pro's GL policy runs **instead of** clawback for the covered portion; claw back only deductible/uncovered remainder if pro-fault.
5. **Log everything:** amounts, offsets, dates in [DISPUTE_LOG_LOCATION]; recovered funds credit the reserve.
6. **Never**: claw back on an undecided case, exceed the substantiated amount, or apply offsets without the written notice in step 2. (These aren't just fairness — they're what keeps consequences defensible if a pro disputes them legally.)

---

## Quick reference card (pin in support tool)

- Dispute opened → **pause payout**, case ID, owner, category.
- Customer made whole fast; settle internally after.
- Refunds: L1 ≤ $[L1_LIMIT] · L2 ≤ $[L2_LIMIT] · Andrew above / all clawbacks / all removals.
- Chargeback = P2 same-day owner; evidence pack per §4 checklist; never miss the processor deadline.
- Strikes: warn → hold → remove, [12]-month window, appeals allowed.
- Reserve: [X]% of volume; floor = [MIN_BALANCE].
