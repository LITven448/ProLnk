# The Data Buyer Stack — Who Buys It, What They Pay, What It's Worth
**The correction: data licensing is non-exclusive. The same record sells to many buyers at once.**

---

## The market, for scale

| | |
|---|---|
| CoreLogic annual revenue | **~$1.7B** |
| Verisk annual revenue | **~$3B** |
| Property intelligence software market | **$3.1B (2025) → $7.8B (2034)**, 10.5% CAGR |
| CoreLogic property coverage | ~140M properties → **~$12 per property per year** |

**That $12 is for commodity data** — deeds, assessor records, transaction history. Public information, resold. Every competitor has the same file.

**What ProLnk holds is categorically different:** interior and exterior condition with photo evidence, equipment identified by make/model/serial, dated repair outcomes with actual costs, and documented consent. **Nobody has this at scale.** Cape Analytics reads roofs from aerial imagery — they cannot see the water heater, the panel, or what was replaced last spring.

Differentiated data prices above commodity data, not below it.

---

## The buyer stack — same record, many buyers

Each record can license to most of these simultaneously. Prices are per record per year.

### Tier A — the anchor buyers

| Buyer | What they use it for | Willingness | $/record/yr |
|---|---|---|---|
| **P&C insurance carriers** | Roof age drives whether they underwrite at replacement cost or actual cash value, allow cosmetic-damage coverage, require inspection, or decline outright. Most insurers already make these calls on roof data alone. | Very high | **$18–25** |
| **Reinsurers** | Portfolio-level exposure and concentration modeling | High | **$4–7** |
| **Mortgage servicers & lenders** | Collateral condition, default prediction, escrow forecasting, REO valuation | High | **$7–10** |
| **Home warranty underwriters** | Component lifecycle tables price their product directly — this is their actuarial input | Very high | **$6–10** |

### Tier B — strong secondary buyers

| Buyer | What they use it for | $/record/yr |
|---|---|---|
| **Equipment manufacturers** (Carrier, Trane, Rheem, Whirlpool, GE) | Real-world failure curves by model for warranty reserving, engineering feedback, recall targeting. Warranty reserve accuracy is a live P&L line for these companies. | **$5–8** |
| **AVM & real estate platforms** (Zillow, Redfin, HouseCanary, Clear Capital) | Condition is the largest unmodeled variable in automated valuation | **$5–8** |
| **iBuyers & SFR acquirers** (Opendoor, Invitation Homes, Amherst) | Acquisition diligence and renovation budgeting at portfolio scale | **$4–7** |
| **Climate & catastrophe analytics** (First Street, Jupiter, Moody's) | Structure-level resilience, not just geographic exposure | **$3–5** |

### Tier C — volume buyers, lower unit value

| Buyer | Use | $/record/yr |
|---|---|---|
| **Retail & building products** (Home Depot, Lowe's, manufacturers) | Demand forecasting, replacement-cycle targeting | **$3–5** |
| **Utilities & efficiency programs** | Equipment age for rebate targeting, demand response, electrification planning | **$2–4** |
| **Service lead generation** (roofing, HVAC, restoration, solar) | Intent signals at the top of the replacement cycle | **$3–6** |
| **Title & appraisal** | Condition adjustment on valuation | **$2–3** |
| **Government & municipal** | Housing stock condition, code enforcement, disaster response planning | **$1–3** |
| **Academic & research** | Housing quality studies | **$0.50–1** |

---

## What a record is actually worth

Not every buyer buys every record, and no record sells to all seventeen. Realistic simultaneous licensing is **5–8 buyer types**.

| | Conservative | Base | Mature |
|---|---|---|---|
| Buyer types licensing a given record | 3–4 | 5–6 | 7–8 |
| **Homeowner record / year** | **$35** | **$62** | **$95** |
| **Rental record / year** | **$18** | **$30** | **$45** |

**Homeowner records are worth roughly 2× rental** — you hold the ownership relationship, the transaction history, and the person who is the actual insurance policyholder. On a rental, the resident is transient and the operator owns the asset (and takes up to 30% of that record's value).

**The base case is what the model uses.** It assumes 5–6 buyer types per record, which is ordinary for a differentiated dataset — not aggressive.

---

## Two things that raise the ceiling further

**1 · Carriers pay per pull, not per year.** Property data for underwriting is typically transactional — a carrier pulls a report on each quote and each renewal. A home quoted by four carriers and renewed annually generates multiple pulls a year. **Transaction-based pricing scales with market activity, not just record count**, and it is how CoreLogic and Verisk actually bill. Modeled as an annual per-record fee, this line is understated.

**2 · Tier 3 risk participation.** At $75–300 per record, sharing in underwriting results rather than selling data is a different business — MGA licensing, capital reserves, actuarial capability. **Not in any forecast**, correctly. But it is the path from a data vendor to a risk company, and it is where the $75–300 numbers in the original tier progression live.

---

## What every dollar of this depends on

None of it is built, and the order matters:

1. **Consent language live from the first resident.** Records collected before consent ships can never be licensed. Re-consenting an installed base is materially harder than consenting at invite. *(Audit 8.4 — not built.)*
2. **Qualified-record schema in code.** *(Audit 8.1 — exists in documents only.)*
3. **Vintage tracking from record one.** Data cannot be seasoned retroactively, and buyers price heavily on history depth.
4. **The validation study.** Carriers do not buy records, they buy proven loss-ratio improvement. Nothing prices above Tier 1 without it, and it needs 2–3 years of outcomes to run.
5. **A data advisor before the schema locks.** Someone from Cape Analytics, Verisk, or CoreLogic can say which fields carriers actually pay for. Getting that wrong means collecting three years of the wrong data.

**The sequencing risk is the real risk.** Every one of these gates is cheap to satisfy today and expensive-to-impossible to satisfy retroactively.
