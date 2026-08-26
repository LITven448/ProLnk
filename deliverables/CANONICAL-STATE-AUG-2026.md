# ProLnk / TrustyPro — Canonical State
**The single source of truth. Paste this into any design or build session before starting work.**
**Anything not in here is undecided — do not invent it, flag it.**
**Last updated: August 2026**

---

# PART 1 — DECIDED

## 1.1 · How the business is organized

Two independent axes. Everything follows from these:

**Work type** (what the pro can physically do): residential trades vs. commercial trades. A residential plumber works houses *and* rental houses. They cannot service supermarket refrigeration.

**Payer** (who pays and how): a consumer picks their pro, gets a quote, pays at completion. A company sends a work order at fixed scope, on terms, with SLAs and compliance.

| | Consumer pays | Company pays |
|---|---|---|
| **Residential trades** | Homeowner jobs | **Rental / PM work orders** |
| **Commercial trades** | (negligible) | Commercial work orders |

**Rental is residential work with a corporate payer.** It shares trades with homeowner work and payment mechanics with commercial.

## 1.2 · The three products

**ProLnk** — one app, every professional. Lanes unlock by subscription and clearance:
- Residential lane (base)
- Enterprise lane (rental/PM work orders) — requires background check + insurance minimums
- Commercial lane — requires commercial trade verification + higher coverage

**TrustyPro** — one app, every property occupant. Gated by who you are: homeowner mode, renter mode.

**TrustyPro Portfolio** — the dashboard any organization uses to send and track work. **This is the white-label.** One product, four tenant configurations: rental operator · commercial contractor · builder · HOA.

**"Exchange" is a feature name, not a product** — the marketplace inside ProLnk where jobs are posted and bid.

## 1.3 · Naming

| Pro side | Property side |
|---|---|
| ProLnk Home | TrustyPro Home |
| ProLnk Renters | TrustyPro Renters |
| ProLnk Commercial | TrustyPro Commercial |

**The builder is not a fourth segment.** It is a licensed channel into TrustyPro Home — same as AMH is a licensed channel into TrustyPro Renters.

| Licensee | Their people land in | Their dashboard |
|---|---|---|
| AMH (rental) | TrustyPro Renters | Portfolio |
| D.R. Horton (builder) | TrustyPro Home | Portfolio |
| CoolSys (commercial) | Facility managers | Portfolio |

## 1.4 · Commission and fees

**Residential (homeowner jobs)**
- Platform fee charged to the **pro**, collected **after the pro is paid**
- Never visible to the homeowner; does not change the homeowner's price
- Rate is a flat percentage of the job — see open item O-3 for the final number
- **No repeat-customer discount.** Retention comes from product value, not price
- Fee is disclosed to pros at signup

**Commercial**
- **3% on work ProLnk sourced and priced only.** Zero on work the vendor quoted themselves
- Additionally under discussion: $3–5 per work order paid by the licensing company

**Rental / operator work orders**
- **$3 per work order, paid by the rental company** (not the vendor)
- Plus an annual license fee — $150–300K depending on portfolio
- ProLnk's renter revenue comes primarily from **commerce**: furniture, electronics, art, decor, rugs, plus utilities and move-out services
- Renter-initiated small jobs (cleaning, mounting) — renter pays the pro, residential fee applies

**Founding network — strictly limited**
- **2,125 spots total** (Charter 25 · Founding 100 · L3 400 · L4 1,600), all at $149/mo locked for life
- Override applies to **residential homeowner jobs and Scout jobs ONLY** — never commercial, never rental work orders
- 4 levels: 7% / 4% / 2% / 1% of the platform fee
- **Home-origination override (5%, perpetual): founding network only**
- **Subscription override: REMOVED. Does not exist.**
- ~12 members enrolled today; free to join the waitlist, paid at launch
- Founding members get Business-tier features at the $149 price
- **Never marketed publicly.** Internal structural incentive only
- ProLnk retains ≥20% of the platform fee as a floor

## 1.5 · Subscriptions

**Terminology:** Seats = dashboard logins. ProPasses = individual technicians. Coverage = ZIP codes.

| Tier | Monthly | Job fee | Seats | ProPasses | ZIPs |
|---|---|---|---|---|---|
| **Starter** | $0 | 15% | 1 | 1 | 5 |
| **Solo** | $99 | 10% | 1 | 1 | 8 |
| **Team** | $189 | 9% | 3 | 4 | 20 |
| **Business** | $349 | 8% | 8 | 10 | 50 |

**Starter is not a free tier — you pay when you earn.** It exists because 60% of contractors are solo operators and a $99 fixed charge before first revenue is a real barrier for low-ticket trades. Break-even against Solo is ~$2,000/month of work, so upgrades are driven by math, not sales.

**Add-ons, any tier:** extra ProPass $20/mo · extra seat $29/mo · extra ZIP pack (10) $25/mo

**Lane upgrades:** Enterprise +$49/mo · Commercial +$99/mo · Clearance packs (school, healthcare, municipal, federal) priced per screening

**Partner-locked vendors** (a vendor who only wants that one licensee's work): **free or $29/mo.** This is an acquisition channel, not a revenue line — the value is their credential entering the registry.

## 1.6 · Licensing to organizations

- **Large operators (>10,000 doors):** free or low license + **30% revenue share** on partner streams, **paid partner-direct, never through ProLnk's P&L**
- **Small operators (<10,000 doors):** **$1.50–2.50 per door per month, no revenue share**
- **The 30% is the price of becoming their resident platform** — not a marketing incentive. The contract must specify that TrustyPro *is* the resident app: in the lease flow, in their portal, at move-in
- White-label pricing is set separately from all pro subscriptions

## 1.7 · Why a pro pays when partner portals are free

A free vendor portal gives you **one company's work**. ProLnk gives you that company's work *plus* other commercial *plus* rental *plus* homeowner — and the verification travels. **Verify once, work everywhere.** That is the product.

## 1.8 · Financial model inputs

| | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---|---|---|---|---|
| Rental doors (all types incl. multifamily) | 61,000 | 250,000 | 550,000 | 850,000 | 1,100,000 |
| Homeowner homes | 10,000 | 30,000 | 100,000 | 350,000 | 550,000 |
| Resident engagement | 85% | → | → | → | 95% |

## 1.9 · Products that must exist

| Platform | Who | Status |
|---|---|---|
| ProLnk Pro | Owner-operator | Built |
| ProLnk Field | Technician / crew | Built (FieldDoc) |
| **ProLnk Business OS** | Owner of a 2+ person company | **Missing — in the 120 days** |
| **Partner Portal** | AMH, CoolSys, builders, carriers | **Missing — in the 120 days** |
| **ProLnk Facility** | End client (store manager) | **Missing — approved** |
| TrustyPro | Homeowner + renter modes | Partial |
| **ProLnk Admin** | Internal ops | **Missing** |

Plus **four functioning marketing websites**: residential · commercial · partners · TrustyPro. Built as four skins over one component library and one pricing source, not four codebases.

## 1.10 · Decided out / deferred

- **Care plans / homeowner subscription** — deferred until the platform is established. Builder origination economics must be rebuilt without them.
- **Repeat-customer discount** — rejected.
- **Subscription override** — removed entirely.
- **Move-out marketplace** (free report + checklist → movers, painters, cleaners, stagers, storage) — **IN**, work delivered by the pro network and affiliate partners depending on need.

## 1.11 · Legal and patent constraints

- **Provisional filed March 2026. Non-provisional due approximately March 2027.**
- Virtual Badge, Move-In Shield, ProPass gating and Scout origination are **not yet filed** as continuations
- These features have **not yet been disclosed** to AMH, CoolSys, or D.R. Horton
- **Every document containing them needs a confidentiality legend, and an NDA before it goes to a third party.** The existing AMH Company Overview contains a full Move-In Shield section and has neither
- Do not label real companies "fictional" in any prototype. Do not render a real builder's brand into shareable exports
- Do not script sales claims about partnerships that are not signed

---

# PART 2 — STILL OPEN

**Do not guess at these. Flag them and ask.**

**O-1 · Keep rate.** Five different tier/keep-rate systems exist in live code (`stripe.ts`, `Pricing.tsx`, `PostFoundingPricing.tsx`, `dfw-zipcodes.ts`, `adminExtras.ts`) with conflicting rates and even conflicting price points ($29/$79/$149/$299 vs $99/$149/$249), including a free Scout tier that contradicts policy. **Recommendation: delete keep rates entirely and use the flat per-tier job fee in §1.5.** Needs a decision.

**O-2 · Does the pro pay a platform fee on rental work orders?** Or is the rental company's $3/WO + license the only take on that job?

**O-3 · Final residential rate.** Flat 10% recommended. Open: whether to add a per-job cap (suggested $2,500) now or later.

**O-4 · Materials in the fee base.** Fee currently charged on the full quoted amount including materials. Market commission benchmarks support this, but on a $30K roof with $18K of materials the effective take on labor is ~20%. A cap solves it. Undecided.

**O-5 · Background check margin.** Decided: charge with margin. Amount not set.

**O-6 · Commercial-only and commercial+residential bundle pricing.** Not set.

**O-7 · Starter tier at $0 + 15%.** Proposed, not approved.

**O-8 · Pro-to-property ratio.** Founder says 20:1. Code says 40–60 homes per partner (`TARGET_PARTNER_TO_HOMEOWNER_RATIO`). At 1.6M engaged properties this is the difference between 32,000 and 80,000 pros.

**O-9 · Average firm size for modeling.** Research: industry average is 12 employees, but 60% are solo and ~70% have fewer than 10.

**O-10 · Trade cost-band table.** Needed for AI triage estimates and operator dashboard cost bands — a different table from rates. Not yet built.

**O-11 · 120-day scope.** Business OS, Partner Portal and Facility roughly double the original plan. The dev team has not been told. Nothing has been cut to make room.

**O-12 · Commercial commission mechanics.** Whether the 3% is instead of or in addition to $3–5/WO; whether it steps down on large jobs.

---

# PART 3 — KNOWN CONTRADICTIONS TO FIX

Found by a verified cross-check of the design documents against the repo. Full detail in `deliverables/analysis/design-vs-repo-reconciliation.md` (75 confirmed findings).

1. **The engine has a hard 6% floor.** A 3% commercial rate is silently clamped to 6% — double the contracted take, no error raised. The 1.5% tier is unreachable. There is no bracket or tier concept in the code at all.
2. **AMH model applies attach rates to all 61,000 doors** with no engagement haircut — overstating every stream by ~2.9×.
3. **35% turnover and 35% engagement are different rates that should multiply, not substitute.**
4. **The 30% share is documented two ways** — paid partner-direct (design) vs. collected and remitted through cost of revenue (repo). These are opposite structures.
5. **Maintenance marketplace is 3%-of-spend in one document and $5–8/work-order in another** — a 7× difference, with a different party paying.
6. **The ProLnk Platform Strategy doc's pricing table says "no commission on residential referrals."** That is wrong — residential carries the platform fee. Correct that document.
