# Payment Processor Comparison for ProLnk
### Escrow-style holds, marketplace payouts, split payments, and subscription billing — decision-ready analysis

**Prepared:** August 17, 2026
**Context:** ProLnk home-services marketplace. Currently on Stripe Connect; founder wants off Stripe. Requirements: escrow-style hold-and-release on job completion, monthly payout runs to many small contractors, dual fee models (full-flow-through and fee-only), pro membership subscriptions ($99–249/mo) plus per-work-order usage fees, multi-party revenue-share splits (operator shares, channel partner overrides). Scale: ~$1M/yr today → $100M+/yr in 3–5 years.

> **Honesty note on pricing:** Adyen, Dwolla (enterprise tiers), Trolley (above entry tier), and Modern Treasury do not publish full pricing. Where a number below is from a third-party source rather than the vendor, it is flagged. Where no reliable number exists, it says **requires sales call**. No numbers below are invented.

---

## 1. Executive Recommendation (Ranked Top 3)

### #1 — Adyen for Platforms
The only non-Stripe option that covers *every* ProLnk requirement in one contract: card acceptance, ledgered balance accounts per pro (funds held until you release them), native multi-way splits per transaction (pro + operator share + channel partner override + platform commission in a single `splits` array), hosted KYC onboarding, tokenized recurring billing for memberships, and payout scheduling. It is built for exactly the $10M–$100M+ trajectory ProLnk is targeting. The honest costs: pricing is negotiated (no public rate card), Adyen historically prefers larger platforms (~$5M+/mo processing is where they engage enthusiastically — at $1M/yr you may get a lukewarm reception or a minimum-invoice commitment), there is **no native 1099 filing** (you bolt on Trolley/Tax1099/Abound), and the integration is the heaviest of any option here. Recommended play: start the Adyen sales conversation now, negotiate hard on minimums using the $100M target, and treat it as the 18-month destination even if you bridge with #2.

### #2 — Moov
The best fit *right now* at ProLnk's current size. Published, transparent pricing (IC+ 0.60% + 15¢ cards; 25¢ ACH; $500/mo minimum), per-account wallets that function as a held balance (accept into wallet, release to the pro's bank on job confirmation), built-in KYC/KYB with hosted onboarding (Moov Drops), and — critically for the fee-only model — **fee plans**: Moov's native mechanism where each pro is the merchant and the platform monetizes via a configured markup, without funds transiting the platform. Native subscription support exists but is less mature than Stripe Billing; no native 1099 filing. Moov is a younger company than the others — that is the main risk at $100M/yr scale. Excellent as the operating platform for years 1–2 and a credible long-term answer if they keep executing.

### #3 — Stay on Stripe Connect (baseline that must be beaten)
Not the founder's preference, and that's respected — but it must appear in the ranking because it is the only option with zero migration cost, native 1099-K/1099-NEC filing, best-in-class subscription billing + usage-based metering, and multi-party splits via separate charges & transfers. Its real weaknesses for ProLnk: the 90-day cap on delayed payouts to Custom accounts (a genuine problem for long-running jobs or extended dispute windows), opaque and rising Connect platform fees at scale, and account-stability horror stories for home-services categories. **Decision discipline:** any migration should be justified by concrete numbers (basis points saved at $25M/yr, or a capability Stripe truly lacks), not by sentiment. If Adyen's negotiated rate doesn't beat Stripe's by a meaningful margin, the migration may not pay for itself until year 3.

**Not recommended as primary:** Dwolla (ACH-only — no card acceptance, so it can't be the customer-facing processor; strong as a *payout leg* only), Trolley (payouts + 1099 only, no pay-ins — but the best 1099 bolt-on to pair with Adyen or Moov), Modern Treasury + Column (the most powerful escrow/ledger architecture, but you'd be assembling a bank stack and taking on money-transmission analysis yourself — right answer at $100M+/yr with a payments team, wrong answer for a lean team at $1M/yr).

---

## 2. Comparison Table

| | **Adyen for Platforms** | **Moov** | **Dwolla** | **Trolley** | **Modern Treasury (+ Column)** | **Stripe Connect (baseline)** |
|---|---|---|---|---|---|---|
| **What it is** | Full-stack acquirer + licensed platform ledger | Payments platform: accept + wallet + payout, one API | ACH/RTP bank-payment API (no cards) | Payout + tax-compliance platform (no pay-ins) | Payment-ops ledger layer over your own bank account(s) | Incumbent; payfac-as-a-service |
| **Hold/escrow mechanism** | Ledgered balance accounts; hold funds until payout trigger; delayed capture also available | Wallet per account; funds sit until you release; delayed card capture | Dwolla Balance (FBO wallet at partner bank) + labeled ledger entries | None (payout-only; you hold funds upstream) | True ledgered FBO/virtual accounts at your bank; strongest hold semantics | Manual payout schedule; separate charges & transfers |
| **Max hold duration** | No published hard cap for balance-account funds; auth-hold (delayed capture) limited by card-network auth windows (~7–30 days by scheme) | No published hard cap on wallet balances; card auth window applies to delayed capture | No published cap on Balance funds (FBO at partner bank) | N/A | Effectively unlimited (your bank account, your ledger) | **90 days** max delayed payout to Custom accounts — documented hard cap |
| **Split payments (multi-party per tx)** | ✅ Native `splits` array: multiple balance accounts + commission + fees per transaction; rule-based automation | ✅ Wallet-to-wallet transfers + fee plans; multi-leg flows composed via API | ⚠️ Composable via multiple transfers from Balance; no single-call split | ⚠️ Batch payouts to many recipients; not per-transaction splits | ✅ Arbitrary N-way ledger entries — most flexible, but you build the logic | ✅ Separate charges & transfers to multiple connected accounts |
| **Fee-only mode (pro = MoR)** | ✅ Sub-merchant is merchant of record; platform takes commission via split | ✅ Best-in-class: fee plans (cost-plus or flat-rate) monetize accounts that own their merchant relationship | ⚠️ Possible (bill pros via ACH debit) but no card acceptance for the pro | ⚠️ N/A for acceptance; can pay pros regardless of who accepted | ✅ Ledger-only mode: track fees, debit pros via ACH | ✅ Direct charges on connected accounts + application fee |
| **Subscriptions ($99–249/mo) + usage fees** | ✅ Tokenized recurring payments; you build the billing/metering logic (no Stripe-Billing-style product) | ⚠️ Subscriptions use-case supported (saved methods + scheduled transfers); metering logic is yours | ⚠️ Recurring ACH debits work well; no card option; metering yours | ❌ Not a billing product | ⚠️ Recurring ACH via payment orders; billing logic yours | ✅ Best in class: Stripe Billing + usage-based metering native |
| **Payee KYC/onboarding** | Hosted onboarding + API; tiered KYC by volume (higher tiers re-trigger verification and can pause payouts) | Hosted Drops or API; KYC $2.50/person + $0.50/mo, KYB $4.50 (published) | Verified Customer onboarding (CIP/KYC) via API/drop-ins | White-label recipient widget: W-9/W-8 capture + ID verification | KYB/KYC available as add-on ("Accounts & Compliance" component) | Stripe-hosted Express/Custom onboarding (current state) |
| **1099 support** | ❌ None native — pair with Trolley/Tax1099/Abound | ❌ None native — same bolt-on needed | ❌ None native | ✅ **Best in class**: W-9/W-8 collection, TIN matching, 1099-NEC/1099-K/1042-S e-file + delivery | ❌ None native | ✅ Native 1099-K/NEC dashboards + filing |
| **Published pricing** | ❌ Negotiated. Third-party reporting: ~IC++ with ~0.60% markup + ~$0.13/tx; ~€1,000/mo minimum invoice commonly cited (Adyen disputes monthly-fee framing). **Requires sales call** | ✅ IC+ 0.60% + 15¢ card; 25¢ ACH next-day / 40¢ same-day; RTP 0.95% (50¢–$5); wallet 50¢/mo; **$500/mo minimum** | ⚠️ Pay-as-you-go ~0.5%/transfer capped at $5; monthly plans from ~$250/mo (third-party reporting; enterprise = **requires sales call**) | ⚠️ Entry ~$1,199/yr (third-party reporting) + per-payout fees; tax module priced per filing. **Requires sales call** above entry tier | ❌ Usage-based, minimum commitment, all custom. Column (bank): ~$0.50/ACH, ~$5/wire per third-party reporting. **Requires sales call** | 2.9% + 30¢ + Connect fees (Custom accounts: $2/mo active account + payout fees + 0.25% payout volume) |
| **Monthly payout runs / thresholds** | ✅ Scheduled payouts per balance account; threshold logic via API | ✅ Scheduled wallet→bank transfers; thresholds via your logic | ✅ Mass-payout API (a core use case) | ✅ Built for batch runs; recipient-level minimum-threshold rules native | ✅ Payment-order scheduling; thresholds via ledger rules | ✅ Manual/scheduled payouts |
| **Migration effort from Stripe Connect** | **High** — full re-onboard of pros (KYC redo), new acceptance integration, card token migration via Stripe's portability process | **Medium** — re-onboard pros to Moov accounts; card tokens portable from Stripe on request | **Medium** (payout leg only; keep acceptance elsewhere) | **Low** — additive (payouts/tax only), keep acceptance anywhere | **High** — new bank account(s), ledger build, compliance program | None |
| **Minimum viable volume** | Prefers large platforms (~$5M+/mo cited by ecosystem sources); will quote smaller with commitments | $500/mo minimum fee — fine at $1M/yr | Entry plans fine at $1M/yr | Entry tier fine at $1M/yr | Built for scaled fintechs; minimum commitment. Column engages via partners at small scale | Fine at any scale |
| **Fit at $100M/yr** | ✅ Designed for it | ⚠️ Credible but less proven at that scale | ⚠️ Payout leg only | ⚠️ Tax/payout leg only | ✅ Designed for it | ✅ Proven |
| **Key weakness** | Sales-gated pricing; heavy build; no 1099; may be indifferent at $1M/yr | Younger company; billing product immaturity; no 1099 | No cards = not a full solution | No pay-ins = not a full solution | You become your own payments company | It's Stripe; 90-day hold cap; fees at scale |

---

## 3. The Escrow Question — What "Holding Funds" Actually Means (Legal Distinction)

This is the most important section of this document, because "escrow" gets used loosely and the differences carry licensing consequences.

**1. True escrow** — a neutral, licensed third party (a state-licensed escrow agent or trust company) holds funds under an escrow agreement with defined release conditions. Virtually no payment processor offers this. If ProLnk marketing says "escrow," legal should review the wording: **true escrow requires a licensed escrow agent**, and holding customer funds pending release conditions is, in most states, either escrow activity or money transmission — both licensed activities. ([InnReg MTL guide](https://www.innreg.com/blog/money-transmitter-license-steps-and-requirements))

**2. Auth/capture (delayed capture)** — authorize the customer's card at job booking, capture on completion. No funds actually move until capture, so no money-transmission question arises. Limitation: card-network authorization windows (roughly 7–30 days depending on scheme/MCC), so it fails for jobs longer than the auth window, and auths can drop. Adyen, Moov, and Stripe all support this.

**3. Ledgered balance ("escrow-style")** — funds are captured and held in accounts at the *processor's* licensed structure (Adyen is a licensed acquirer/EMI; Moov and Dwolla hold funds at partner banks in FBO structures), sub-ledgered per pro, and released on your API call. This is what marketplaces actually use, and it's what "escrow" means in Adyen's own marketplace docs ("delayed payout, or escrow" — [Sharetribe's Adyen overview](https://www.sharetribe.com/academy/marketplace-payments/adyen-for-platforms-overview/)). **The licensing point:** the reason ProLnk can do this *without* its own money transmitter license is that the regulated entity (Adyen / Moov's bank partners / Dwolla's partner banks) is the one receiving and transmitting the funds, and payment-facilitator style flows generally fit the FinCEN payment-processor exemption when settlement runs through BSA-regulated entities under agreement with the seller ([Venable on money transmission in the payfac model](https://www.venable.com/insights/publications/2018/06/money-transmission-in-the-payment-facilitator-mode), [FinCEN exemption analysis](https://www.hlhunt.org/uncategorized/marketplace-payments-paying-sellers-without-becoming-a-money-transmitter/)). If ProLnk ever takes custody of funds in its *own* operating account before paying pros (the Modern Treasury + own-bank-account architecture), that exemption analysis gets materially harder — state MTL exposure, FinCEN registration, AML program ([ComplyOne AML overview](https://complyone.tech/blog/aml-compliance-for-marketplace-platforms-what-you-need-to-know)).

**Recommendation for ProLnk:** use pattern 3 (ledgered balance at the provider), keep pattern 2 (auth/capture) as an option for short jobs, and never call it "escrow" in customer-facing legal copy without counsel review — "payment protection" / "funds released on completion" is safer language.

---

## 4. Per-Provider Detail

### 4.1 Adyen for Platforms

**What it is.** Adyen's marketplace product: your platform creates *account holders* (pros) with *balance accounts*; customer payments are split across balance accounts at transaction time; Adyen holds funds and pays out on your schedule. Adyen is itself the licensed acquirer, so the money-transmission burden sits with Adyen. ([Adyen Platforms docs](https://docs.adyen.com/platforms))

**Escrow/hold.** Two mechanisms: (a) delayed capture (auth at booking, capture on completion — limited by card auth windows); (b) hold captured funds in the pro's balance account and trigger payout only on completion confirmation. Adyen's docs describe holding funds until payout as a core platform capability ([Adyen docs — process payments](https://docs.adyen.com/marketplaces/process-payments)). No published hard cap on how long balance-account funds may sit; practical limits come from KYC tier rules — an account holder that crosses volume tiers gets re-verified and **payouts pause until checks clear** ([verification process](https://docs.adyen.com/platforms/verification-overview)). Plan for that operationally.

**Splits.** The strongest native split model of any provider here: each payment carries a `splits` array allocating amounts to multiple balance accounts, commission, and fees — this directly maps to ProLnk's pro-share + operator-share + channel-partner-override + platform-commission structure in a single call, with rule-based automation available ([split transactions docs](https://docs.adyen.com/marketplaces/split-transactions)).

**Fee-only mode.** Supported: the sub-merchant is merchant of record; the platform's take is just the commission split. Running *both* models (full flow-through for some jobs, fee-only for others) is a configuration matter, not an architectural fight.

**KYC/onboarding.** Hosted onboarding pages or full API; Adyen runs tiered KYC based on country/entity/volume ([onboarding & KYC](https://docs.adyen.com/platforms/quickstart-guide/onboarding-and-kyc)). Burden on pros is comparable to Stripe Express — but every pro must re-onboard when migrating (see §5).

**Subscriptions.** Tokenized recurring payments are native; there is no Stripe-Billing-equivalent product, so ProLnk builds plan management, proration, dunning, and usage metering (or pairs a billing engine like Chargebee/Recurly on top of Adyen tokens).

**Pricing.** Not published for platforms; negotiated per deal ([fintechspecs comparison](https://fintechspecs.com/blog/marketplace-payout-api-split-payments-seller-onboarding/)). Third-party reporting: interchange++ with markup starting ~0.60% + ~€/$0.11–0.13 per transaction; a ~€1,000/mo minimum invoice is commonly cited, while Adyen's own pricing page says no monthly/setup fees ([Adyen pricing](https://www.adyen.com/pricing), [TODA Pay analysis](https://todapay.com/blog/adyen-fees-in-2026-the-true-cost-for-high-volume-merchants/), [Eightx TCO](https://eightx.co/blog/compare/how-much-does-adyen-cost)). **Requires sales call** — and at $100M target volume, IC++ pricing will likely beat Stripe's blended 2.9% materially.

**1099.** None. Budget for Trolley's tax module or Tax1099/Abound.

**Minimum volume.** Ecosystem sources describe Adyen as best suited to large platforms (~$5M+/mo), with negotiated deals a friction point for early-stage companies ([fintechspecs](https://fintechspecs.com/blog/marketplace-payout-api-split-payments-seller-onboarding/)). At $1M/yr ProLnk is small for them — lead the conversation with the growth plan.

**Weaknesses.** Sales-gated everything; heaviest integration on this list; docs assume payments sophistication; no billing product; no tax product; US support is thinner than EU; small platforms report slow-moving account management.

### 4.2 Moov

**What it is.** A single API for accepting (cards, ACH, RTP), storing (wallets), and disbursing money, designed for platforms; Moov is the processor and works with partner banks ([moov.io/platform](https://moov.io/platform/)).

**Escrow/hold.** Every pro gets a Moov account with an optional wallet. Customer payment lands in a wallet (platform's or pro's, per your flow design); funds sit until ProLnk triggers wallet→bank payout on job confirmation ([wallets](https://moov.io/platform/wallets/)). No published maximum hold duration for wallet balances; delayed card capture is also available for short jobs. This is the ledgered-balance pattern with Moov's regulated structure carrying the licensing load.

**Splits.** No single-call multi-split primitive like Adyen's, but multi-leg flows (charge → platform wallet → transfers to pro wallet, operator wallet, partner wallet) are the documented pattern for marketplaces and are fully API-composable. Slightly more orchestration code on ProLnk's side; same end result, and the ledger stays inside Moov.

**Fee-only mode — Moov's standout.** **Fee plans** are a first-class product: each pro can be the merchant (their account is underwritten, they own the processing relationship) and ProLnk configures either *cost-plus* (interchange + Moov markup passed to the pro, platform adds its own margin) or *flat-rate* per-merchant pricing; Moov bills and remits your margin ([fee plan docs](https://docs.moov.io/guides/billing/plan-options/)). This is precisely ProLnk's "pro is merchant of record, platform only takes its fee" model, natively.

**KYC/onboarding.** Hosted components (Moov Drops) or API; published costs: KYC $2.50/individual + $0.50/mo, KYB $4.50/business. Underwriting is required before an account can accept payments ([underwriting docs](https://docs.moov.io/guides/accounts/requirements/underwriting/)) — for the fee-only model, every pro goes through merchant underwriting, which is a heavier ask of a solo handyman than payee-only KYC. For the flow-through model, pros need payee-level verification only.

**Subscriptions.** A documented use case (saved payment methods + scheduled transfers) ([subscriptions](https://docs.moov.io/use-cases/subscriptions/)), but it is not a billing suite — plan/proration/dunning/usage-metering logic is ProLnk's to build, same as Adyen.

**Pricing (published — the most transparent on this list).** Cards IC+ 0.60% + 15¢; ACH 25¢ next-day / 40¢ same-day; RTP & push-to-card 0.95% (50¢ min, $5 cap); wallets 50¢/mo active; disputes $15; **$500/mo minimum** ([moov.io/pricing](https://moov.io/pricing/)). At $1M/yr (~$83K/mo) the minimum is easily cleared. Note monthly payout runs to ~hundreds of pros cost cents per pro (25¢ ACH) — dramatically cheaper than Stripe's 0.25% payout-volume fee.

**1099.** None native. Same bolt-on requirement as Adyen.

**Weaknesses.** Youngest major company on this list (founded 2018; venture-backed) — counterparty durability at $100M/yr is the real question to press in diligence; billing tooling immature; brand unknown to pros (Stripe Express has consumer trust); fewer enterprise references than Adyen; support org smaller.

### 4.3 Dwolla

**What it is.** A bank-payment (ACH/RTP/FedNow) API with an FBO-account architecture — no card acceptance ([dwolla.com](https://www.dwolla.com/)).

**Escrow/hold.** Genuinely good: the **Dwolla Balance** is a wallet-like FBO funding source held at Dwolla's partner banks; funds can be received, held indefinitely, and disbursed; **Labels** provide sub-ledger allocation within a balance ([Balance docs](https://developers.dwolla.com/concepts/balance-funding-source), [Labels API](https://developers.dwolla.com/docs/balance/api-reference/labels/create-a-label-ledger-entry)). No published hold cap.

**Fatal flaw for ProLnk as primary:** customers pay for home services by card. Dwolla cannot accept cards, so it can only ever be the *payout/held-funds leg* behind a separate card acquirer — at which point Adyen or Moov do both legs in one contract. ACH pull from consumers (the Dwolla-native funding method) is a poor fit for one-off home-service jobs (NSF/return risk, 3–5 day settlement before work can be confirmed funded).

**Payouts/KYC.** Mass-payout API is a core use case ([payouts](https://www.dwolla.com/use-case/pay-outs)); pros onboard as Verified Customers (CIP/KYC) via API or drop-ins. **1099:** none.

**Pricing.** Third-party reporting: pay-as-you-go ~0.5%/transfer capped at $5; monthly plans from ~$250/mo; enterprise custom ([GetApp](https://www.getapp.com/finance-accounting-software/a/dwolla/), [TrustRadius](https://www.trustradius.com/products/dwolla/pricing)). **Requires sales call** for real numbers.

**Verdict.** Only relevant if ProLnk deliberately assembles a multi-vendor stack (card acquirer + Dwolla payout leg). Otherwise dominated by Moov, which includes Dwolla's capabilities plus card acceptance.

### 4.4 Trolley

**What it is.** A payout and tax-compliance platform: onboard recipients, collect W-9/W-8, verify identity, pay out to 210+ countries, e-file 1099-NEC/1099-K/1042-S ([trolley.com](https://trolley.com/use-cases/professional-service-platforms/), [1099-K announcement](https://trolley.com/blog/irs-form-1099k/)).

**Escrow/hold.** **None** — Trolley never touches the customer-payment side. Funds arrive at Trolley from ProLnk's bank account and go out to pros. Whatever holds funds pending job completion must live upstream (and if that's ProLnk's own bank account, re-read §3's licensing warning).

**Payouts/thresholds/1099 — best in class.** White-label recipient onboarding widget (banking + tax form capture + ID verification), batch payout runs, **recipient-level minimum-threshold rules** (native support for "hold until balance ≥ $X" monthly runs), instant debit-card payouts at 1%, and the full 1099 lifecycle including TIN matching and e-delivery. Note reported **4–6 week bank-partner onboarding** before first disbursement ([HR.software review](https://www.hr.software/reviews/trolley)).

**Pricing.** Entry ~$1,199/yr per third-party reporting ([SaaSpartout](https://saaspartout.com/marketplace/trolley/), [Capterra](https://www.capterra.com/p/179294/Payment-Rails/)); per-payout fees and tax-filing fees on top; volume tiers **require sales call**.

**Verdict.** Not a competitor to Adyen/Moov — a **complement**. The strongest 1099 answer on this list; the natural bolt-on for whichever primary processor wins, or usable even alongside Stripe today to fix tax season.

### 4.5 Modern Treasury (+ Column or another underlying bank)

**What it is.** A payment-operations layer — payment orders, reconciliation, virtual accounts, and a double-entry **Ledgers** product (millions of sub-accounts, five-level hierarchy, immutable entries) — sitting on top of bank accounts ProLnk itself holds at partner banks ([Ledgers](https://www.moderntreasury.com/products/ledgers), [Virtual Accounts](https://docs.moderntreasury.com/payments/docs/virtual-accounts), [marketplace solution](https://www.moderntreasury.com/solutions/marketplaces)). **Column** is a developer-first nationally chartered bank often paired with such stacks; third-party reporting puts Column at ~$0.50/ACH and ~$5/wire with monthly minimums ([Sacra](https://sacra.com/c/column/), [Column docs](https://column.com/docs/ach/)).

**Escrow/hold.** Architecturally the *strongest*: funds sit in ProLnk-controlled accounts, sub-ledgered per pro/per job, releasable on any condition, held for any duration, with virtual accounts giving each pro a stable "address." N-way splits are trivial ledger entries. This is how a marketplace at $500M/yr builds its money layer.

**The catch — and it's disqualifying for now:** ProLnk becomes the funds-holder. That means the money-transmission/escrow licensing analysis from §3 lands on ProLnk (or requires structuring every flow as bank-held FBO with counsel sign-off), MT does not acquire card payments (you still need Adyen/Moov/Stripe in front for customer cards), there's no native payee-KYC-lite path (KYB/KYC is an add-on component), no 1099, and pricing is a custom usage-based minimum commitment — **requires sales call** ([MT pricing](https://www.moderntreasury.com/pricing)). Contrary Research pegs MT's customer base as scaled fintechs, not seed-stage marketplaces ([Contrary](https://research.contrary.com/company/modern-treasury)).

**Verdict.** The right year-4 architecture if ProLnk hits $100M+ and wants to own its float and shave processor margin. Wrong tool at $1M/yr: highest build cost, highest compliance burden, and it still doesn't accept cards.

### 4.6 Baseline: Staying on Stripe Connect

For completeness: separate charges & transfers already supports ProLnk's multi-party splits (one charge, transfers to pro + operator + partner, remainder as platform fee — [Stripe docs](https://docs.stripe.com/connect/separate-charges-and-transfers)); manual payouts give escrow-like behavior but **capped at 90 days** for Custom accounts ([legacy-transfers docs](https://docs.stripe.com/connect/legacy-transfers)); Stripe Billing covers memberships + usage fees natively; 1099s are filed for you. Costs at scale: 2.9% + 30¢ blended (negotiable to IC+ at volume — many platforms don't realize Stripe will quote IC+ at $10M+/yr), plus Connect account fees and 0.25% payout volume. The rational framing: **Stripe is the hurdle rate.** Adyen wins if its negotiated IC++ saves ≥30–50bps at target volume *and* the 90-day-hold and platform-control issues are worth the migration. Also worth knowing: Stripe supports **card-data portability** — it will export PAN-level tokens to another PCI Level 1 processor on request, which is what makes leaving actually feasible.

---

## 5. Migration Plan Sketch (Stripe Connect → Adyen or Moov)

**What breaks when you leave Stripe Connect — the honest list:**

1. **Every pro must re-onboard.** Connected-account KYC does not transfer. Identity docs, bank details, and TOS acceptance must be re-collected on the new provider. Expect 10–25% of long-tail pros to stall — plan an incentive ("complete migration onboarding to receive your next payout") and a 60-day dual-running window.
2. **Saved customer cards.** Request PAN-level token export from Stripe to the new PCI-L1 processor (Stripe's data-portability process). Subscriptions on saved cards *can* survive — but network tokens/`customer` objects and Stripe Billing subscription state do **not** port; you rebuild subscription records and re-map to migrated card credentials. Budget for a few % of cards failing on first re-charge (expired/unmigratable) → dunning flow required.
3. **Stripe Billing logic.** Plans, proration behavior, dunning schedules, and usage-record metering must be rebuilt (in-house or Chargebee/Recurly/Metronome on top of the new processor). This is the single largest engineering line item — neither Adyen nor Moov replaces Stripe Billing off the shelf.
4. **In-flight money.** Held balances, pending disputes, and refund rights on old charges stay on Stripe for months. You will run Stripe in wind-down mode for **6+ months** post-cutover (refunds on old charges must go out via Stripe; chargebacks arrive up to ~120 days after the sale).
5. **1099 continuity.** In a mid-year cutover, each pro has earnings on both processors. Since Adyen/Moov file nothing, the year-of-migration answer is: export Stripe's totals + new-processor totals into Trolley/Tax1099 and file consolidated forms yourself. Do **not** let Stripe auto-file partial-year 1099-Ks while you also file — coordinate to avoid duplicate forms.
6. **Webhooks/reconciliation/reporting.** Every Stripe webhook consumer, payout-reconciliation job, and finance report rebuilt for the new event model.

**Sequencing (recommended):**

- **Phase 0 (now, 2–4 wks):** Run the Adyen and Moov sales processes in parallel; get real IC++ quotes against Stripe's current effective rate. Simultaneously stand up **Trolley for 1099s only** (works with Stripe today; de-risks tax season regardless of processor outcome).
- **Phase 1 (4–8 wks):** Build acceptance + wallet/balance-account flow on the chosen provider in sandbox; design the split schema (pro/operator/partner/platform) as config, not code.
- **Phase 2 (6–10 wks):** New-pro onboarding goes to the new provider first (stops the migration debt from growing). New customer jobs process on the new rail. Existing pros/subscriptions stay on Stripe.
- **Phase 3 (8–12 wks):** Card-token portability export from Stripe; rebuild membership billing; migrate subscriptions in cohorts with dunning safety nets.
- **Phase 4 (ongoing to +6 mo):** Migrate existing pros in waves with payout-gated incentives; Stripe in wind-down for refunds/disputes; decommission when dispute tail dies.

Total realistic timeline: **6–9 months** of overlapping effort, with billing rebuild as the critical path.

---

## 6. Ten Questions to Ask in Every Demo

1. **Holds:** "How long can funds sit in a pro's balance/wallet before release — is there any hard cap, dormancy rule, or escheatment process we need to design around, and what happens to held funds if the pro fails a KYC re-verification mid-hold?"
2. **Splits:** "Show me one $1,000 job split live four ways — pro 72%, operator 7%, channel partner 4%, platform remainder — in a single transaction. Can split rules be config-driven per job, and can they change after auth but before capture?"
3. **Dual fee models:** "Can we run flow-through jobs and fee-only jobs (pro as merchant of record) *side by side* on one contract — and in fee-only mode, who eats the chargeback, and how do we collect our fee if the pro's account has insufficient balance?"
4. **Pricing:** "Give me the all-in effective rate on $1M/yr today with the rate card at $25M and $100M pre-agreed in the contract — including every per-account, per-payout, per-KYC, dispute, and minimum-invoice line item. What's negotiable now vs. at renewal?"
5. **Onboarding friction:** "Walk me through your hosted onboarding for a solo handyman with a phone — how many minutes, what documents, what % of applicants complete it, and what's your manual-review turnaround when someone gets flagged?"
6. **KYC tiers:** "At what processing-volume thresholds do pros get re-verified, and do payouts pause during re-verification? What's our visibility and appeal path?"
7. **1099s:** "What exactly do you provide at tax season — raw earnings exports, TIN matching, filing? If nothing, which tax partners have you actually seen customers integrate, and can you export in their format?"
8. **Migration:** "Have you executed a card-token import from Stripe? What's the process, timeline, and failure rate — and can you import ACH mandates/bank details, or does every saved bank account need re-authorization?"
9. **Subscriptions:** "For $99–249/mo memberships plus per-work-order usage fees: what do you provide natively (retry logic, proration, metering) vs. what do we build or buy — and which billing platforms are proven on top of you?"
10. **Counterparty risk & term:** "Who are your sponsor banks / what licenses do you hold, what happens to held pro balances if you or a bank partner fails, what are your uptime SLAs with penalties, and what are the contract termination terms if we outgrow you or you deprioritize us?"

---

## 7. Sources

- Adyen: [Platforms docs](https://docs.adyen.com/platforms) · [Split transactions](https://docs.adyen.com/marketplaces/split-transactions) · [Process payments](https://docs.adyen.com/marketplaces/process-payments) · [Onboarding & KYC](https://docs.adyen.com/platforms/quickstart-guide/onboarding-and-kyc) · [Verification](https://docs.adyen.com/platforms/verification-overview) · [Pricing page](https://www.adyen.com/pricing) · [Sharetribe overview](https://www.sharetribe.com/academy/marketplace-payments/adyen-for-platforms-overview/) · [TODA Pay fee analysis](https://todapay.com/blog/adyen-fees-in-2026-the-true-cost-for-high-volume-merchants/) · [Eightx TCO](https://eightx.co/blog/compare/how-much-does-adyen-cost) · [fintechspecs payout-API comparison](https://fintechspecs.com/blog/marketplace-payout-api-split-payments-seller-onboarding/)
- Moov: [Pricing](https://moov.io/pricing/) · [Fee plans](https://docs.moov.io/guides/billing/plan-options/) · [Underwriting](https://docs.moov.io/guides/accounts/requirements/underwriting/) · [Wallets](https://moov.io/platform/wallets/) · [Subscriptions use case](https://docs.moov.io/use-cases/subscriptions/) · [Platform overview](https://moov.io/platform/)
- Dwolla: [Balance concept](https://developers.dwolla.com/concepts/balance-funding-source) · [Labels ledger API](https://developers.dwolla.com/docs/balance/api-reference/labels/create-a-label-ledger-entry) · [Payouts](https://www.dwolla.com/use-case/pay-outs) · [Marketplaces](https://www.dwolla.com/use-case/marketplaces) · [Pricing page](https://www.dwolla.com/pricing) · [GetApp pricing](https://www.getapp.com/finance-accounting-software/a/dwolla/) · [TrustRadius pricing](https://www.trustradius.com/products/dwolla/pricing)
- Trolley: [Service-platform use case](https://trolley.com/use-cases/professional-service-platforms/) · [1099-K capability](https://trolley.com/blog/irs-form-1099k/) · [SaaSpartout pricing](https://saaspartout.com/marketplace/trolley/) · [Capterra](https://www.capterra.com/p/179294/Payment-Rails/) · [HR.software review](https://www.hr.software/reviews/trolley)
- Modern Treasury / Column: [Pricing](https://www.moderntreasury.com/pricing) · [Ledgers](https://www.moderntreasury.com/products/ledgers) · [Virtual accounts](https://docs.moderntreasury.com/payments/docs/virtual-accounts) · [Marketplaces](https://www.moderntreasury.com/solutions/marketplaces) · [Contrary Research](https://research.contrary.com/company/modern-treasury) · [Sacra on Column](https://sacra.com/c/column/) · [Column ACH docs](https://column.com/docs/ach/)
- Stripe: [Separate charges & transfers](https://docs.stripe.com/connect/separate-charges-and-transfers) · [90-day delayed payouts](https://docs.stripe.com/connect/legacy-transfers) · [Charge types](https://docs.stripe.com/connect/charges)
- Legal/regulatory: [InnReg MTL guide](https://www.innreg.com/blog/money-transmitter-license-steps-and-requirements) · [Venable — money transmission in the payfac model](https://www.venable.com/insights/publications/2018/06/money-transmission-in-the-payment-facilitator-mode) · [HL Hunt — paying sellers without becoming a money transmitter](https://www.hlhunt.org/uncategorized/marketplace-payments-paying-sellers-without-becoming-a-money-transmitter/) · [ComplyOne — AML for marketplaces](https://complyone.tech/blog/aml-compliance-for-marketplace-platforms-what-you-need-to-know)

*Third-party pricing figures (Adyen markup, Dwolla plans, Trolley entry tier, Column per-transfer fees) are reported estimates, not vendor-confirmed quotes — verify all in sales conversations.*
