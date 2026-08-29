# CoolSys — White-Label Vendor Ticketing Opportunity
**Research + product/revenue brainstorm. August 2026.**

---

## Who CoolSys is

| | |
|---|---|
| Revenue | ~$2B (2025) |
| Employees | ~3,700 |
| HQ | Brea, CA — operating since 1997 |
| Footprint | **45,000+ customer locations** nationwide |
| Markets | Grocery, retail, restaurant, industrial, **data centers**, education, healthcare, government |
| Owner | **Ares Management** (PE) — acquired 2019 from Audax |
| M&A | **22 acquisitions** — a serial rollup |
| Services | Commercial refrigeration + HVAC: engineering, design, install, service, maintenance, energy optimization |

**Two facts that matter most:**

1. **They are a PE-owned rollup with 22 acquisitions.** Every acquisition arrives with its own systems, its own vendor list, its own process. Excel is what survives when you merge 22 companies — it is the only common denominator. Ares is optimizing for EBITDA and an eventual exit; operational infrastructure lifts both.

2. **They already market a vendor platform they apparently don't have.** Their public Preferred Vendor Program page promises subcontractors a "digital service platform" with electronic work orders, photo documentation, digital completion reports, dedicated account managers, and expedited payment. If the reality is spreadsheets, **they have a promise outstanding to their own vendor network.** That is the single strongest wedge in this entire opportunity — you are not selling them a new idea, you are letting them deliver something they already advertise.

---

## The reframe: this is not an FM software play

Commercial facilities management software is a crowded, mature category — ServiceChannel, Corrigo (JLL), Ecotrak, FEXA, Accruent, ServiceTitan. If CoolSys were shopping for an FM platform they would have bought one years ago.

**They almost certainly aren't the buyer in that category — they're the vendor in it.** Their grocery and retail clients dispatch work *to* CoolSys through the client's own FM system. CoolSys receives the work order at the top... and then has to farm portions of it out to subcontractors across geographies they can't self-perform.

**That hand-off layer is the Excel.** Client FM system → CoolSys → subcontractor is where the data falls out of software and into a spreadsheet, an email chain, and a phone call.

So the product is narrow and defensible: **the sub-dispatch and escalation layer that sits underneath the client's FM system.** You don't replace ServiceChannel. You integrate below it and own the last mile CoolSys currently runs by hand. Much smaller build, much clearer pitch, no competitive collision.

---

## Why you're unusually well-positioned

The operator dashboard you're building for AMH is roughly the same machine with different labels:

| AMH (property operator) | CoolSys (service contractor) |
|---|---|
| Maintenance request comes in | Work order comes in from client FM system |
| AI triage + cost band | Same |
| Approval queue | Dispatch queue |
| Assign: in-house crew vs. vendor | Assign: self-perform tech vs. subcontractor |
| Vendor compliance (license, COI, expiry) | Same — and higher stakes commercially |
| Photo documentation on completion | Same |
| Escalation on aging requests | **SLA escalation — mission-critical** |
| Payment + ledger | Same |

Already built or specced and directly reusable: vendor intake v2, license/insurance/COI expiry monitoring (audit 1.5), the job lifecycle, photo capture + AI triage, dispatch and matching, escrow-style payment with hold/release, the approval/dispatch queue, and FSM integrations.

**And the patent already contemplates this:** ProPass site-type gating covers residential / commercial / school / government. A commercial deployment is inside the existing IP posture rather than outside it.

**The design implication — act on this now, it's free:** build the operator dashboard with a **persona/tenant abstraction** rather than hard-coding "property operator." If you do, CoolSys becomes a configuration instead of a second product. If you don't, you'll fork the codebase in six months.

---

## What makes their pain acute (the pitch angles)

- **Refrigeration is mission-critical.** A failed compressor at a grocery store is spoiled inventory measured in hours. SLA breaches carry real penalties and lost contracts. Escalation on a spreadsheet is a liability.
- **Vendor compliance at scale is a lawsuit waiting.** Hundreds of subcontractors, each with licenses and insurance certificates that expire. Tracking COI expiry in Excel means eventually dispatching an uninsured sub to a hospital or data center. Automated expiry monitoring with fail-closed dispatch gating is already in your build.
- **Rollup integration.** Each acquisition's vendor network needs absorbing. A single system is the integration tool Ares wants.
- **Cash conversion.** Their own page promises vendors "expedited payment." Faster documented completion → faster client invoicing → better DSO. **That is an EBITDA argument, and EBITDA is the language a PE owner speaks.**
- **Data they don't have.** Equipment failure patterns across 45,000 commercial sites — by manufacturer, model, and age. Nobody holds that. Valuable to equipment manufacturers, energy programs, and warranty underwriters. (Rights would need negotiating — see risks.)

---

## Revenue models — ranked

**1. Platform license floor + per-work-order variable (recommended)**
- Annual license: **$150K–500K** depending on seats and scope
- Plus **$3 per work order** routed to a subcontractor, paid by the licensee
- Rough volume math: 45,000 locations × 2–4 service events/year ≈ 90K–180K work orders; if even a third are subbed out, that's 30K–60K × $5 ≈ **$150K–300K/yr variable** on top of the license
- Why this one: the floor covers your cost to serve, the variable grows with them, and it's easy for a CFO to model

**2. Per-subcontractor subscription** — your existing $99–$249 ladder, charged to their vendors. Mirrors the AMH structure exactly. CoolSys may resist charging their own network; the counter is that vendors get paid faster and get more work, which is what the program already promises them.

**3. Per-location/per-site fee** — $2–5/location/month × 45,000 = $90K–225K/month. Biggest number, hardest sell, and it prices off *their* footprint rather than your value delivered.

**4. Payment rails** — you're building escrow and vendor payouts anyway. Taking a thin cut of subcontractor payment flow is high margin and sticky, but it's a second sales conversation — don't lead with it.

**5. Compliance-monitoring module** — per-vendor per-month for license/COI tracking with automated expiry gating. Small standalone revenue, but it's the easiest thing to demo and the one with obvious liability ROI. Good land-and-expand wedge.

**6. Data licensing** — commercial equipment condition and failure data. Real long-term asset, zero near-term revenue, and it requires rights language in the original contract. Get the rights, monetize later.

---

## The structure that de-risks this: make them fund it

**Sell a paid design partnership, not a product.** CoolSys pays **$100–250K** as a design partner for a scoped pilot — one region or one acquired subsidiary, their 20–50 most active subcontractors. In exchange they get preferential pricing at rollout and input on the roadmap.

Why this is the right structure:
- Their money funds a build you were doing anyway for the operator dashboard core
- It proves demand before you commit roadmap
- A signed pilot with a $2B PE-backed company is a Series A slide regardless of outcome
- If they won't pay for a pilot, the pain isn't as expensive as the conversation suggests — which is itself worth learning cheaply

---

## Risks — say these out loud

- **Roadmap collision.** You have a 120-day launch with a hard date. This must not touch it. **Sell now, build after Day 120.** The only work permitted before then is the persona abstraction in the dashboard, which costs nothing extra if done at design time.
- **Different domain.** Commercial refrigeration trades, SLAs, and compliance differ from residential. The primitives transfer; the taxonomy and rules do not. Budget discovery time.
- **Enterprise + PE sales cycle.** A $2B PE-owned company moves in quarters, not weeks. Multiple stakeholders: ops leadership, IT, procurement, and Ares' operating partners.
- **Integration reality.** Their value depends on ingesting work orders from client FM systems (ServiceChannel, Corrigo, etc.). Some have partner APIs, some don't. Scope this in discovery before quoting — it's the item most likely to blow up an estimate.
- **Data rights.** If the equipment data matters to you long-term, the rights language belongs in the first contract. Retrofitting it later is nearly impossible.

---

## Next steps

1. **Discovery call** — map the actual flow: work order in from client system → who touches it → how a sub gets chosen → how escalation happens today → where the spreadsheet lives. Quantify: how many subs, how many work orders/month, average SLA penalty, DSO.
2. **Ask the diagnostic question:** *"Your vendor page promises subcontractors a digital platform — what are they actually using today?"* The answer defines the whole scope.
3. **Confirm who owns the problem** — operations, IT, or an Ares operating partner. The last one is the fastest path if the pitch is EBITDA.
4. **Propose the paid pilot** — one region, 20–50 subs, 90 days, fixed fee.
5. **Do nothing in code before Day 120** except the persona abstraction.

## Sources
- CoolSys corporate site and Preferred Vendor Program page
- Ares Management acquisition coverage (2019, from Audax)
- Acquisition history via Tracxn; revenue/employee figures via company profiles — **verify current revenue directly before quoting it in a pitch**
