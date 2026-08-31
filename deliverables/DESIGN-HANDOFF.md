# Design Handoff — ProLnk & TrustyPro
**Paste this at the start of every Claude design session, alongside `CANONICAL-STATE-AUG-2026.md`.**
**That file holds the business decisions. This one holds what to design and what not to.**

---

# 1 · The products, and what each one is

**Three products. Two consumer apps and one dashboard.** Everything else is a configuration of these.

### ProLnk — the professional app
One app, every professional. What differs is which work they can see:
- **Residential work** — homeowner jobs. Included in every plan.
- **Rental work** (+$49/mo) — work orders from rental companies. Requires background check + insurance minimums, because they enter occupied homes.
- **Commercial work** (+$99/mo) — requires commercial trade verification and higher coverage.

Roles inside it: **company owner** (earnings, team, compliance, billing) · **technician** (today's jobs, photos, badge — never company financials) · **Scout** (origination only).

### TrustyPro — the property app
One app, everyone who lives in a home. Two modes:
- **Homeowner mode** — full app: Vault, marketplace, quotes, prices, commerce
- **Renter mode** — gated: **no prices, no vendor names, no marketplace.** Move-In Shield, maintenance requests, commerce shelf, move-in/move-out checklists

A renter who buys a house **switches modes and keeps their history.** Do not design these as separate apps.

### TrustyPro Portfolio — the organization dashboard
One product, four configurations: **rental operator** (AMH) · **commercial contractor** (CoolSys) · **builder** (D.R. Horton) · **HOA**. Same spine every time: work item arrives → AI triage → approve/assign → dispatch → track → photo completion → pay.

### Naming
| Pro side | Property side |
|---|---|
| ProLnk Home | TrustyPro Home |
| ProLnk Renters | TrustyPro Renters |
| ProLnk Commercial | TrustyPro Commercial |

**The builder is not a fourth product.** It is a licensed channel into TrustyPro Home — the buyer's house simply arrives pre-documented.

**"Exchange" is a feature name, not a product** — the marketplace inside ProLnk where jobs are posted and bid.

---

# 2 · What already exists (do not rebuild)

**ProLnk — 25 screens designed:** Apply & plan · Coaching · Get verified · TrustyPro status · Background check · Credentials · Trust & ranking · Referrals · Emergency alert · Referral detail · Send quote · Active jobs · Messages · Schedule · Earnings · Analytics · Referral network · Scout · Scout project · Job board · Supplier savings · Business profile · Integrations · Digital Briefcase · Membership & billing

**TrustyPro v3 — three modes designed:** homeowner (welcome → autofill → scan → score → Vault → request → track), resident (invite → Shield → maintenance → shop → rent credit → access ended), builder (closing day → warranty hub → claim → tracker → pre-drywall archive → graduation)

**CoolSys vendor app** exists as a persona layer over ProLnk.

---

# 3 · What still needs designing

| Priority | Surface | Who uses it |
|---|---|---|
| **P0** | **ProLnk Business OS** | Owner of a 2+ person company: dispatch board, roster, ProPass seats, compliance docs with expiry, invoicing, per-tech scorecards, revenue |
| **P0** | **Partner Portal** | AMH, CoolSys, builders: their work orders, their vendor pool, SLA compliance, spend, **invite management** |
| **P1** | **ProLnk Facility** | End client — a store manager reporting "Rack A is running warm," asset registry per location, PM schedule, spend |
| **P1** | **ProLnk Admin** | Internal: user lookup, refunds, disputes, vendor approval, AI agent monitoring + kill switch, ledger reconciliation |
| **P1** | Four marketing sites | Residential · Commercial · Partners · TrustyPro — built as four skins over one component library and one pricing source |

**Business OS is the biggest gap.** The current pro app is built for one person with a phone. The model needs ~26,600 firms averaging 3 technicians. Every multi-tech company needs Business OS, and it does not exist.

---

# 4 · Rules that must hold in every design

**Resident gating is absolute.** No prices, no vendor names, no marketplace content in a renter session. This is a legal and contractual requirement of the AMH deal, not a preference.

**Role is provisioned, never chosen.** A technician invited by their owner lands in the technician view only. There is no switcher.

**A lapsed subscription loses priority routing — it never locks the pro out.** Punishing a paying customer's whole livelihood over one failed card is how churn becomes permanent.

**Photo-first everywhere.** Typing is the fallback, never the default. AI moments get a brief processing state, then a plain-English verdict with a "that's right / not quite" confirmation.

**Every AI determination shows its basis.** The warranty clause next to the coverage verdict. The evidence next to the finding. Never a verdict alone.

**Renders are labeled and quarantined.** AI visualizations carry a small "AI visualization — actual results will vary" mark, are never generated for insurance or structural work, and can never appear in a claim file, dispute packet, or documentation export.

---

# 5 · Never show these publicly

**The network override.** L1/L2/L3/L4 income, downline, "4 levels deep," recruiting language. It is an internal structural incentive limited to 2,125 founding members and is **never marketed.** *(It was live on the public /join page and has been removed.)*

**Patent-pending features in public marketing.** Virtual Badge, Move-In Shield, ProPass site-type gating, and Scout origination are **not yet filed** as continuations. The non-provisional is due approximately **March 2027.** Design them, prototype them, show them under NDA — do not put them on a public marketing page.

**"Keep rate" language.** Retired. Say the plain fee: *"10% platform fee — you keep 90% of every job."* Never "you keep 40% of the commission."

**Real company brands as fictional.** D.R. Horton, CoolSys, and AMH are real companies in active conversations. Use invented names in any prototype that might be shown to a different company in the same category.

---

# 6 · Pricing, as it should appear on any screen

| Tier | Monthly | Fee per job | Seats | ProPasses | ZIPs |
|---|---|---|---|---|---|
| **Starter** | $0 | 15% | 1 | 1 | 5 |
| **Solo** | $99 | 10% | 1 | 1 | 8 |
| **Team** | $189 | 9% | 3 | 4 | 20 |
| **Business** | $349 | 8% | 8 | 10 | 50 |

**Starter is not free — you pay when you earn.** 60% of contractors are solo operators; a fixed charge before first revenue is a real barrier. Break-even against Solo is around $2,000/month of work.

**Add-ons:** ProPass $20/mo · dashboard seat $29/mo · 10-ZIP pack $25/mo
**Work types:** Add Rental Work +$49/mo · Add Commercial Work +$99/mo · **licensee-invited vendors 20% off**
**Homeowners and residents: always free.**

**Terminology:** *Seats* = dashboard logins. *ProPasses* = individual technicians. *Coverage* = ZIP codes. Never say "lane."

---

# 7 · Brand direction

**ProLnk** — teal `#0D9488`, slate text, calm and industrial. A contractor's working tool. *"The network where pros set their own price."*

**TrustyPro** — indigo `#4F46E5`, soft neutrals, warm and reassuring. Consumer software someone chose to like, not a portal they were assigned. *"Your home, handled."* Plain-spoken, no jargon, nothing gamified, never the word "leads."

**TrustyPro Portfolio** — enterprise register. Data-dense, fast to scan, calm. The partner's brand is a re-skin layer (accent color, wordmark, the word they use for their people) — never the structure. Every configuration should be one config change, and watching the app re-skin itself live is the sales demo.
