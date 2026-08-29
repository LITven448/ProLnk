# Commercial White-Label — Business Model & Scaling Strategy

---

## The trap in white labeling, and how to avoid it

**Pure white label kills network effects.** If every deployment is a private island under someone else's brand, you are a software vendor: revenue is linear in salespeople, nothing compounds, and any competitor can copy the feature set. That is a fine $20M business and a bad $200M one.

**The fix: white-label the interface, share the credential layer underneath.**

```
  CoolSys portal        Competitor A portal      Competitor B portal
  (their brand)          (their brand)            (their brand)
        │                      │                        │
        └──────────────┬───────┴────────────────────────┘
                       ▼
        SHARED VENDOR CREDENTIAL LAYER  ← this is the asset you own
   identity · license verification · COI + expiry · EPA 608 certs ·
   W-9 · safety record · trade + geographic coverage · performance history
```

A vendor verifies **once** with ProLnk and can then be connected to any contractor network. Each contractor keeps their own branded portal, their own vendor list, their own data — but the verification, credentials, and identity are shared infrastructure.

**Why every party says yes:**
- **Vendor:** stops re-submitting the same COI to eight different contractors, gets paid faster, gets more work
- **Contractor:** onboards a vendor who is already verified in minutes instead of weeks, and never dispatches someone uninsured
- **You:** every new contractor makes the vendor pool more valuable; every new vendor makes you more valuable to contractors. That is the compounding white label alone would have destroyed.

**This is already your patent.** ProPass is a portable individual credential passport with site-type gating (residential / commercial / school / government). The commercial credential layer is that claim, deployed. Protected, and hard to dislodge once vendors live inside it.

---

## Ideal customer profile: PE-backed multi-location service rollups

CoolSys is not unusual — it is a **category**. The profile that always has this pain:
- Private-equity owned, growing by acquisition (each acquisition brings its own systems and vendor list)
- Multi-location, multi-state, with self-perform coverage gaps filled by subcontractors
- Mission-critical or SLA-bound work
- EBITDA-focused ownership with an exit horizon

**The target list:**

| Segment | Companies |
|---|---|
| Refrigeration / HVAC / mechanical | CoolSys, Service Logic, Legence, Southland Industries, Comfort Systems USA *(public)*, EMCOR *(public)* |
| Facilities / multi-trade | ABM Industries *(public)*, Lessen (absorbed SMS Assist), Divisions Inc |
| Fire & life safety | **Pye-Barker** — a very large PE rollup with an enormous acquisition count; same integration problem, arguably worse |
| Roofing | Tecta America |
| Electrical | IES Holdings |
| Landscape | BrightView |
| Plumbing / mechanical | numerous regional PE rollups |

*Verify ownership and current status before outreach — the PE landscape shifts.*

## The scaling unlock: sell to the sponsor, not just the company

**Ares owns a portfolio, not just CoolSys.** PE firms run formal value-creation programs and actively push proven tools across portfolio companies — it is how operating partners earn their keep.

The motion:
1. Land CoolSys, run the pilot, produce hard numbers (SLA compliance, cost per WO, DSO, uninsured dispatches eliminated)
2. Get in front of the **Ares operating partner** who covers industrials/services — a warm intro from CoolSys leadership is the whole ask
3. One relationship becomes access to every services company in the portfolio, and a reference that other sponsors respect

This converts enterprise sales from cold outreach into sponsor-led introductions — the single biggest lever available on the commercial side. Every metric in the pitch should be phrased in EBITDA and exit-multiple terms because that is the language of the room.

---

## Revenue streams, ranked by quality

**Tier 1 — build the model on these**
1. **Platform license** — $150K–500K/yr per tenant, scaled by seats and locations. Predictable, high margin, the base of the P&L.
2. **Per-work-order fee** — $3 per subcontracted WO, paid by the licensee. Grows with the customer without a new negotiation.
3. **Vendor subscriptions** — $99–$249/mo, paid by vendors, and it is **your** revenue across every tenant. This is the network layer monetized, and it is the stream that compounds.
4. **Implementation / integration fee** — $25K–100K one-time per tenant. Covers the cost to serve and qualifies serious buyers.

**Tier 2 — meaningful, sell after trust exists**
5. **Credential verification** — per-vendor annual fee for license/COI/608 verification and monitoring. The Checkr model, applied to trades. Low churn, high margin.
6. **Payment rails and fast-pay** — commercial subs routinely wait 30–90 days. Offering 3–5 day payment at a 1.5–3% discount is a real business on high-quality receivables, and you are building the escrow rails anyway. Requires capital or a factoring partner; do not self-fund it early.
7. **Parts procurement / GPO** — commercial refrigeration parts carry real margin. Needs volume first.

**Tier 3 — later**
8. Predictive maintenance module (sold as a feature, priced per site)
9. Refrigerant/ESG compliance module (see below — this one may be underrated)

---

## Is the commercial data worth anything? Mostly no — with one exception

**Your instinct is correct.** Commercial data is not the prize here, for three reasons:
- **Scale:** 45,000 commercial locations against ~145M US homes. The residential dataset is three orders of magnitude larger.
- **Buyer depth:** residential data has insurers, lenders, real estate, and marketers bidding. Commercial equipment data has a handful of manufacturers and one insurance niche.
- **Ownership:** the equipment belongs to the contractor's *clients* (grocery chains), not to the contractor. Rights are murky, and the client — not CoolSys — may own the data. That is a contract fight you don't want.

**Realistic ceiling: a few million a year at scale, not hundreds of millions.** Do not build the commercial thesis on data.

**The one exception worth pursuing: refrigerant / ESG compliance data.**
- EPA Section 608 already mandates leak-rate tracking and repair on commercial systems, and HFC phase-down under the AIM Act tightens it further
- Grocery and retail chains must report refrigerant emissions in corporate climate disclosures — HFCs are potent greenhouse gases and refrigerant leakage is a material line in a grocer's emissions footprint
- Today that reporting is assembled by hand from service records
- **Your platform generates that data as a byproduct of every work order.** Auditable, timestamped, per-system

That is not a data-brokerage play — it is a **compliance product** sold to the end client (the grocery chain), with real willingness to pay because the alternative is a manual audit. It also gives you a direct relationship with the site owner, above your own customer.

**And the better use of the data is product, not sale:** equipment failure patterns feed predictive maintenance, which makes the platform stickier and is billable as a module. Sell the prediction, not the records.

---

## Honest assessment of commercial as a business line

**Why it is genuinely attractive:**
- **It pays cash now**, from large solvent companies, while the residential side is still building. That funds the roadmap and de-risks the story for investors.
- Retention in this category is extremely high — once dispatch runs through you, switching is painful
- It reuses the enterprise console; the marginal build is configuration
- ARPU is 10–50× a residential operator deal

**Why it is dangerous:**
- **It is an enterprise sales business.** It scales with salespeople and reference customers, not virally. No channel trick shortcuts it.
- Sales cycles run two to four quarters, with procurement, IT, and security reviews
- It is a different muscle from everything else you are building, and splitting founder attention before the residential launch is the real risk

**The rule that keeps it safe: sell now, configure later, never custom-build.** Every commercial deal must be expressible as tenant configuration. The moment one requires a code fork, the economics invert.

**Sequencing:** CoolSys as a paid design partner → pilot metrics → Ares operating-partner introduction → two or three more rollups → *then* hire commercial sales. Not before.
