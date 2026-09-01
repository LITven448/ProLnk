# Design Handoff — ProLnk (the professional side)
**Paste this at the start of every ProLnk design session, with `CANONICAL-STATE-AUG-2026.md`.**
**This covers the professional-facing surfaces only. TrustyPro has its own handoff.**

---

# 1 · What ProLnk is

**One app, every service professional.** Not three products — one product where what you can see depends on what you've paid for and what you've been cleared for.

**Two work types:**
- **Residential work** — homeowner jobs **and rental-property work orders**. Included in every plan. Same trades, same pros.
- **Add Commercial Work (+$99/mo)** — requires commercial trade verification and higher coverage limits.

The gate isn't arbitrary — it reflects what each kind of work actually requires. The fee is what you charge for access once they qualify.

**Three roles, provisioned not chosen:**
| Role | Sees | Never sees |
|---|---|---|
| **Company owner** | Earnings, team, dispatch, compliance, billing, network | Other companies' anything |
| **Technician** | Today's jobs, photo capture, serial scan, complete, their badge | Pricing, earnings, marketplace, membership |
| **Scout** | Address claiming, photo origination, residuals | Full marketplace |

A technician invited by their owner lands in the technician view. **There is no switcher.**

**"Exchange" is a feature name, not a product** — the marketplace inside ProLnk where jobs are posted and bid.

---

# 2 · What already exists — do not rebuild

**25 screens are designed and in the project:**
Apply & plan · Coaching · Get verified · TrustyPro status · Background check · Credentials · Trust & ranking · Referrals · Emergency alert · Referral detail · Send quote · Active jobs · Messages · Schedule · Earnings · Analytics · Referral network · Scout · Scout project · Job board · Supplier savings · Business profile · Integrations · Digital Briefcase · Membership & billing

A **CoolSys vendor app** also exists as a persona layer over these.

---

# 3 · What needs designing

### P0 — ProLnk Business OS (the biggest gap in the product)
The current app is built for **one person with a phone.** The business model needs roughly **26,600 firms averaging 3 technicians.** Every multi-technician company needs this, and it does not exist. Nothing above a solo operator can be sold without it.

For the owner of a 2+ person company:
- **Dispatch board** — assign jobs to technicians
- **Roster** — add and remove technicians
- **ProPass seat management** — buy, assign, revoke
- **Compliance per person** — licenses, insurance, certifications with expiry tracking
- **Invoicing**
- **Per-technician scorecards** — jobs, first-time fix, response time, callbacks
- **Revenue dashboard**

### P1 — ProLnk Facility (the end-client app)
For a store manager, plant manager, or property manager **at the customer's site** — someone who is not a technician. A grocery store manager posts "Rack A is running warm."
- Report a problem with photos, from the floor
- Asset registry per location — every unit, its age, service history, warranty status, serial plate photo
- Preventive maintenance scheduling
- Spend and SLA visibility

**They never see:** vendor economics, what the partner pays, or other locations they don't manage.

### P1 — ProLnk Admin (internal)
User and tenant lookup, impersonation (audited), job and payment inspection, refunds and disputes, vendor approval queue, **AI agent monitoring with a kill switch**, ledger reconciliation, feature flags, tenant configuration.

### P1 — Marketing sites
**ProLnk residential** · **ProLnk commercial** · **ProLnk partners** — three of the four sites. Built as skins over one component library and one pricing source, never separate codebases.

---

# 4 · Rules that must hold

- **Role is provisioned, never selected.** No switcher, no toggle.
- **A lapsed subscription loses priority routing — it never locks the pro out.** Punishing a paying customer's whole livelihood over one failed card is how churn becomes permanent.
- **A non-compliant vendor must be visibly blocked from dispatch**, with the reason shown. Expired insurance is not a warning — it prevents assignment. This is a core selling point, so it has to be visible on screen.
- **Photo-first everywhere.** Typing is the fallback.
- **Every AI determination shows its basis** — the evidence next to the finding, never a verdict alone.
- **Solo operators get one app.** Do not split a one-person shop into owner and technician views — that's a bug, not a feature. The split happens at 2+ seats.

---

# 5 · Never show publicly

**The network override.** L1/L2/L3/L4 income, downline, "4 levels deep," recruiting language. It is an internal structural incentive limited to **2,125 founding firms** and is **never marketed.** *(It was live on the public /join page and has been removed.)*

**"Keep rate" language — retired.** Say the plain fee: *"10% platform fee — you keep 90% of every job."* Never "you keep 40% of the commission."

**Patent-pending features in public marketing.** **Virtual Badge**, **ProPass site-type gating**, and **Scout origination** are not yet filed as continuations. The non-provisional is due around **March 2027.** Design them, prototype them, show them under NDA — do not put them on a public marketing page.

**Scout add-on must not promise origination rights.** The current copy sells "permanent origination rights… forever" to any $49 buyer. **The 5% origination override is founding-network only.** Scout sells address claiming and photo capture — not a perpetual revenue right.

**Real company brands used as fictional.** CoolSys and AMH are real companies in live conversations. Use invented names in any prototype that could be shown to a competitor of theirs.

---

# 6 · Pricing, as it should appear on screen

| Tier | Monthly | Fee per job | Seats | ProPasses | ZIPs |
|---|---|---|---|---|---|
| **Starter** | $0 | 15% | 1 | 1 | 5 |
| **Solo** | $99 | 10% | 1 | 1 | 8 |
| **Team** | $189 | 9% | 3 | 4 | 20 |
| **Business** | $349 | 8% | 8 | 10 | 50 |

**Starter is not a free tier — you pay when you earn.** 60% of contractors are solo operators, and a fixed monthly charge before first revenue is a real barrier. Break-even against Solo lands around $2,000/month of work, so upgrading is a math decision, not a sales pitch.

**Add-ons:** ProPass $20/mo · dashboard seat $29/mo · 10-ZIP pack $25/mo
**Work type:** Add Commercial Work +$99/mo
**Licensee-invited vendors: 20% off** the whole subscription. A CoolSys-invited pro on Team + Commercial pays $230/mo instead of $288.
**Vendors locked to one licensee's work: free.**

**The fee is charged to the pro and collected after they get paid.** It is never visible to the homeowner and never changes the homeowner's price.

**Terminology:** *Seats* = dashboard logins · *ProPasses* = individual technicians · *Coverage* = ZIP codes. **Never say "lane."**

---

# 7 · The complete money logic — how a pro actually pays

## What the pro pays, step by step

1. Pro completes a job for a homeowner. **The homeowner pays the pro directly, at the pro's own price.**
2. Payment splits at settlement — the pro's share goes to them **same day**, ProLnk's fee is retained automatically. Nothing is invoiced, nothing is chased, and money is never held in escrow.
3. **The fee is a flat percentage set by the pro's subscription tier** — 15% Starter, 10% Solo, 9% Team, 8% Business.
4. **The fee does not come back to the pro.** There is no rebate, no "keep rate," no pool share for the person who did the work.

**The fee is charged on the full quoted amount, including materials.** This matches how trade sales commissions work — a roofing salesperson earns on total collected, not labor only.

## What happens to the fee after ProLnk collects it

The fee ProLnk collects is called the **commission pool**. ProLnk pays out of it only where someone else has an earned claim:

| Claim | Share of the pool | When it applies |
|---|---|---|
| Home / photo origination | 5% | **Founding network only** |
| Upline L1 | 7% | **Founding network only**, residential + Scout jobs only |
| Upline L2 | 4% | same |
| Upline L3 | 2% | same |
| Upline L4 | 1% | same |
| **ProLnk retains** | **the remainder** | always |

- **If nobody referred the pro and no origination claim exists, ProLnk keeps 100% of the pool.** That is the normal case for the overwhelming majority of pros.
- **Maximum possible payout is 19%**, so ProLnk retains at least 81% in the worst case.
- The **≥20% retention floor** remains as a safety mechanism but can no longer trigger — it existed only because the pro's old 40–60% keep-rate came out of this same pool first.
- **Effective ProLnk take on a residential job: 8.1%–10% of job value** at Solo tier, depending on whether a founding cascade applies.

## Commission by work type — these are three different models

| Work type | Who pays ProLnk | How much |
|---|---|---|
| **Residential (homeowner)** | The pro | Tier rate: 15% / 10% / 9% / 8% of job value |
| **Rental work orders** | **The rental company** | **$3 per work order.** The pro pays nothing. |
| **Commercial — licensee's own work** | The licensee (annual license + $3/WO) | The vendor pays nothing on that work |
| **Commercial — work ProLnk sourced outside the licensee** | The vendor | **3%** — and the residential 6–15% clamp does not apply |

**The rule that ties them together:** ProLnk takes a commission on work it *sold*, never on work the vendor sold themselves. A homeowner job is ProLnk-sourced demand, so it carries the tier fee. A CoolSys vendor doing CoolSys work costs nothing, because CoolSys is paying for the platform.

## The founding network — strictly limited, never marketed

- **Capped at 2,125 total**: Charter 25 · Founding 100 · Cornerstone 400 · Keystone 1,600
- All at **$149/mo base locked for life**, receiving Business-tier features at that price
- **The lock is on the base rate only.** Extra ZIPs, ProPasses, seats, and the commercial upgrade are billed at current rates and can rise
- Roughly **12 firms enrolled today**. Free to join the waitlist, paid at launch
- Override applies to **residential homeowner jobs and Scout jobs only** — never commercial, never rental work orders
- **Home-origination override (5%, perpetual): founding network only**
- **Subscription override: removed entirely. It does not exist.**
- **Never marketed publicly** — internal structural incentive only

## Background checks and clearances

- Background check paid by the pro at onboarding (~$35, Checkr). **ProLnk earns roughly a 10% rebate from Checkr** — it is not a markup on the pro.
- **Clearance packs** (school, healthcare, municipal, federal, military) priced per screening. Each carries a real vendor cost. These gate specific job classes within a work type the pro can already see.

---

# 8 · The numbers behind the design

Why the pro-side surfaces matter, in scale terms:

| | Y1 | Y3 | Y5 | Y7 |
|---|---|---|---|---|
| Active pros (20 properties per pro) | 3,093 | 30,025 | 79,750 | 135,750 |
| **Subcontractor firms** (~3 techs avg) | 1,031 | 10,008 | 26,583 | 45,250 |
| Subscription + seat revenue | $1.6M | $15.3M | $40.6M | **$69.1M** |
| Platform fees on homeowner jobs | $1.0M | $10.3M | $60.5M | **$128.2M** |

**Platform fees are the single largest revenue line in the whole company by Year 7.** They come from homeowner jobs done by pros — which means the pro app's job flow, quoting, and completion experience are load-bearing for the entire business model.

**The market shape that drives the tier design:** roughly **60% of contractors are solo operators** and ~70% have fewer than 10 employees. The industry average is 12 employees, but that average is dragged up by large shops. **Design the entry experience for one person with a truck**, and treat multi-tech features as the upgrade.

---

# 9 · Brand

**Teal `#0D9488`, slate text `#0F172A` / `#475569`, calm and industrial.** This is a working tool for someone with a truck and a phone — precise, fast to scan, no consumer flourishes.

**The promise:** *"The network where pros set their own price."* No lead fees, no auctions, no pay-to-play ranking. You quote it, you keep it, and ProLnk only earns when the pro gets paid.

**The competitor to beat, in one line:** Angi charges roughly $333 per booked job whether you win or lose. ProLnk charges nothing until you're paid.
