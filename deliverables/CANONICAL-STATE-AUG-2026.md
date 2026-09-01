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

**ProLnk** — one app, every professional. **Work types** unlock by subscription and clearance:
- Residential work (included in every plan)
- Add Rental Work (rental/PM work orders) — requires background check + insurance minimums
- Add Commercial Work — requires commercial trade verification + higher coverage

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

**Residential (homeowner jobs) — SETTLED**

The pro pays a flat platform fee set by their subscription tier. **The fee does not come back to them.** There is no "keep rate," no rebate, no pool share for the pro.

| Tier | Monthly | Platform fee |
|---|---|---|
| Starter | $0 | 15% |
| Solo | $99 | 10% |
| Team | $189 | 9% |
| Business | $349 | 8% |

- Charged to the **pro**, collected **after the pro is paid**
- Never visible to the homeowner; does not change the homeowner's price
- Disclosed to pros at signup
- **No repeat-customer discount.** Retention comes from product value, not price
- Materials stay in the fee base — trade sales commissions are calculated on total collected

**What happens to the fee (the "commission pool")**

The fee ProLnk collects is the pool. ProLnk pays out of it only when someone else has a claim:

| Claim | Share of the pool | When it applies |
|---|---|---|
| Home / photo origination | 5% | Founding network only |
| Upline L1 / L2 / L3 / L4 | 7% / 4% / 2% / 1% | Founding network only, residential + Scout jobs only |
| **ProLnk retains** | **the remainder** | Always |

- **If nobody referred the pro and no origination claim exists, ProLnk keeps 100% of the pool.** That is the normal case for the vast majority of pros.
- Maximum possible payout is 19% of the pool, so **ProLnk retains at least 81% in the worst case.**
- The **≥20% retention floor** stays in place as a safety mechanism, but with the pro's keep rate retired it can no longer trigger. It existed only because the pro's 40–60% share used to come out of this same pool first.
- **Effective ProLnk take on a residential job: 8.1%–10% of job value** (Solo tier), depending on whether a founding cascade applies.

**RETIRED: the keep-rate model.** "40 / 50 / 60% commission keep" is gone. Every surface must say the plain fee instead: *"10% platform fee — you keep 90% of every job."* `commissionKeepRate` in the database and `keepRate` in `stripe.ts` are to be removed and existing partner rows migrated.

**Commercial — SETTLED**
- The licensing company (CoolSys) pays an annual license fee **plus $3 per work order**
- **Vendors locked to that licensee work for FREE** and see only that licensee's jobs
- A vendor who wants other work pays a subscription and unlocks the marketplace
- **ProLnk takes 3% only on commercial jobs it sources for that vendor OUTSIDE their licensing company.** Zero on the licensee's own work, zero on work the vendor quoted themselves
- The residential 6–15% floor/clamp does **not** apply to commercial. Commercial needs its own fee path in code

**Rental / operator work orders — SETTLED**
- **$3 per work order, paid by the rental company** (not the vendor)
- The pro pays nothing on rental work orders. Their subscription is their only cost, and only if they want work beyond that licensee
- Plus an annual license fee — $150–300K depending on portfolio
- ProLnk's renter revenue comes primarily from **commerce**: furniture, electronics, art, decor, rugs, plus utilities and move-out services
- Renter-initiated small jobs (cleaning, mounting) — renter pays the pro, residential fee applies

**Founding network — strictly limited**
- **2,125 spots total** (Charter 25 · Founding 100 · Cornerstone 400 · Keystone 1,600), all at $149/mo locked for life
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

**Work-type upgrades** (the term "lane" is retired — say "work types" or name them directly):
- **Add Rental Work — +$49/mo.** Requires background check + insurance minimums (entering occupied homes)
- **Add Commercial Work — +$99/mo.** Requires commercial trade verification + higher coverage
- **Clearance packs** (school, healthcare, municipal, federal) priced per screening
- **Licensee-invited vendors get 20% off** their whole subscription — a CoolSys- or AMH-invited pro at Team + Commercial pays $230/mo instead of $288

**Partner-locked vendors** (a vendor who only wants that one licensee's work): **free or $29/mo.** This is an acquisition channel, not a revenue line — the value is their credential entering the registry.

## 1.6 · Licensing to organizations

- **Large operators (>10,000 doors):** free or low license + **20% revenue share** on partner streams, vendor subscriptions, and data licensing
- **SETTLED — the partner's share is split at settlement and paid automatically. It never lands in ProLnk's account.** ProLnk's percentage is therefore 100% margin, with no remittance ledger, no monthly payout run, and no clawback exposure on the partner's portion
- **Small operators (<10,000 doors):** **$1.50–2.50 per door per month, no revenue share**
- **The 20% is the price of becoming their resident platform** — not a marketing incentive. The contract must specify that TrustyPro *is* the resident app: in the lease flow, in their portal, at move-in
- White-label pricing is set separately from all pro subscriptions

## 1.7 · Why a pro pays when partner portals are free

A free vendor portal gives you **one company's work**. ProLnk gives you that company's work *plus* other commercial *plus* rental *plus* homeowner — and the verification travels. **Verify once, work everywhere.** That is the product.

## 1.8 · Financial model inputs

| | Y1 | Y2 | Y3 | Y4 | Y5 |
|---|---|---|---|---|---|
| Rental doors (all types incl. multifamily) | 61,000 | 250,000 | 550,000 | 850,000 | 1,100,000 |
| Homeowner homes | 10,000 | 30,000 | 100,000 | 350,000 | 550,000 |
| Resident engagement | 85% | → | → | → | 95% |

**Engagement is high by design, not by promotion.** The app is issued as part of the move-in process and used again at move-out, so effectively the whole resident base is in it. AMH earns share on move-in commerce (furniture, electronics, rugs, beds) and on move-out services (movers, storage, cleaning).

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
- **Move-in checklist** (new home) and **move-out / pre-sale checklist** (selling or preparing to sell) — **IN.** These are checklists inside the app, not a separate marketplace product. Work is delivered by the pro network or affiliate partners depending on what the job needs. Both generate jobs and affiliate revenue as a by-product.

## 1.11 · Legal and patent constraints

- **Provisional filed March 2026. Non-provisional due approximately March 2027.**
- Virtual Badge, Move-In Shield, ProPass gating and Scout origination are **not yet filed** as continuations
- These features have **not yet been disclosed** to AMH, CoolSys, or D.R. Horton
- **Every document containing them needs a confidentiality legend, and an NDA before it goes to a third party.** The existing AMH Company Overview contains a full Move-In Shield section and has neither
- Do not label real companies "fictional" in any prototype. Do not render a real builder's brand into shareable exports
- Do not script sales claims about partnerships that are not signed

---

# PART 2 — STILL OPEN

Everything material has been decided. The remaining items are research tasks, not founder decisions.

**Nothing is blocking. The fee model was settled: flat rate per tier, no keep rate, pool distributed only to origination and upline claims.** See §1.4.

## 🟡 Open, but not blocking — assigned to research, not to the founder

- **O-6 · Commercial and bundle subscription pricing.** Benchmarking underway.
- **O-9 · Average firm size for modeling.** Research so far: industry average is 12 employees, but 60% are solo operators and ~70% have fewer than 10.
- **O-10 · Trade cost-band table.** The typical-cost-by-trade data behind AI triage estimates ("leaking P-trap — $120–180") and the operator dashboard's cost bands. Being built.

# PART 3 — KNOWN CONTRADICTIONS TO FIX

Found by a verified cross-check of the design documents against the repo. Full detail in `deliverables/analysis/design-vs-repo-reconciliation.md` (75 confirmed findings).

1. **The engine has a hard 6% floor.** A 3% commercial rate is silently clamped to 6% — double the contracted take, no error raised. The 1.5% tier is unreachable. There is no bracket or tier concept in the code at all.
2. **AMH model applies attach rates to all 61,000 doors** with no engagement haircut — overstating every stream by ~2.9×.
3. **35% turnover and 35% engagement are different rates that should multiply, not substitute.**
4. **The 30% share is documented two ways** — paid partner-direct (design) vs. collected and remitted through cost of revenue (repo). These are opposite structures.
5. ~~Maintenance marketplace 3%-of-spend vs $5–8/work-order~~ — **RESOLVED.** The operator pays **$3 per work order**. Vendors are never charged per work order. The $5–8 vendor-charged fee is retired everywhere.
6. **The ProLnk Platform Strategy doc's pricing table says "no commission on residential referrals."** That is wrong — residential carries the platform fee. Correct that document.

## Resolved since this document was written
- **Websites fixed** — branch `website-fixes`. Per-domain identity, TrustyPro routing unblocked, ten pricing pages collapsed to one config, orphaned tier ladder removed, pro ratio corrected to 20:1, regression test added. `keepRate` deliberately retained pending O-1.
- **The 6% floor** applies to residential only. Commercial requires its own fee path.
- **Materials** stay in the fee base — roofers already pay ~12% to salespeople on total collected.
- **Background checks:** ~10% rebate from Checkr, not a markup on the pro.
- **Starter tier** ($0 + 15%) approved.
- **Pro-to-property ratio:** 20:1.
- **120-day scope:** Business OS, Partner Portal and Facility all in. Pilot date moves if needed; scope does not get cut.
