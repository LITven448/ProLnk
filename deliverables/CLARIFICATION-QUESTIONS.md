# Clarification Set — Answer These and Everything Gets Reconciled
**Answer in place. Where I state a current assumption, just write YES or the correction.**
**Anything marked 🔴 blocks the financial model or the dev team. Answer those first.**

---

# 1 · NAMES AND BUSINESS LINES

**1.1** 🔴 The white-label **resident** product (sold to property managers, currently mis-titled "Coolsyn") — what is it called?
- [ ] TrustyPro Renters (current internal name)
- [ ] Its own separate brand: ______
- [ ] Sold under the operator's brand only, no product name

**1.2** The white-label **commercial** product (CoolSys-style vendor dispatch) — what is it called?
- My assumption: **TrustyPro Exchange**. Correct?

**1.3** The **operator dashboard** (AMH-facing) — TrustyPro Portfolio. Correct?

**1.4** Is the **builder** product its own line or a configuration of the operator dashboard?

**1.5** List every business line you consider distinct today, in your words. I currently count five: ProLnk (pros) · TrustyPro (homeowners) · TrustyPro Renters · TrustyPro Portfolio (operators) · TrustyPro Exchange (commercial). Missing any?

---

# 2 · PRICING — you said this has changed, so I need all of it fresh

## 2A · Pro side, residential
**2.1** 🔴 Subscription tiers and prices today:
- Core $____ /mo · Pro $____ /mo · Business $____ /mo (my old numbers: $99 / $149 / $249)
- Is it still three tiers?

**2.2** 🔴 **ProPass seat price** — $20/mo per additional technician. Still correct?
- Does the base subscription include one seat, or zero?

**2.3** Scout add-on — $99 first / $49 additional. Still correct?

**2.4** Is there a **coverage / metro area pack** price? Your strategy doc lists it as a pricing component. $____ per additional metro?

**2.5** **Clearances** (fingerprinting, bonding, federal registration) — passed through at cost, or at cost + margin?

**2.6** 🔴 **Background checks** — your strategy doc says pass through at cost, itemized, no markup. Confirm? (This removes a revenue stream I had counted.)

## 2B · Pro side, commercial
**2.7** 🔴 Commercial base subscription: $____ /mo. Different from residential?

**2.8** Can a vendor buy residential only, commercial only, or both? Is "both" priced as a bundle?

**2.9** **Partner-exclusive floor** — your strategy doc says $99/mo + $20/seat for a vendor who only wants to stay on one partner's list. Still correct?

## 2C · Commission and fees
**2.10** 🔴 **Residential platform fee** — confirm all of this:
- Rate: ____% (spec says 6–15% clamped — is that still right?)
- What sets the rate inside that band?
- Charged to: the pro (my understanding)
- Timing: after the pro is paid
- Is it ever added to the homeowner's price instead?

**2.11** 🔴 **Commercial commission** — 3% on sourced/priced work only, stepping to 1.5% above $25K, negotiated above $100K. Confirm?

**2.12** 🔴 **Renters side** — undecided. What are the options you're considering? (Per-door license? Per work order? Share of partner revenue only?)

**2.13** **Per-work-order fee** for non-subscribing vendors — $5–8, charged to the vendor. Still correct?

**2.14** 🔴 **Network override** (L1 7% / L2 4% / L3 2% / L4 1% of the platform fee) — still current? Still never marketed?

**2.15** **Home-origination override** — 5% of platform fee, perpetual. Still correct?

**2.16** **Subscription override** (L1 12 / L2 6 / L3 3 / L4 1.5). Still correct?

**2.17** **ProLnk floor** — you always retain ≥20% of the platform fee. Still correct?

## 2D · Operator and partner terms
**2.18** 🔴 **AMH share** — 30% of net revenue. Confirm, and confirm it's paid **partner-direct** (never through your P&L)?

**2.19** Does the 30% apply to *every* stream, or are some excluded?

**2.20** **Maintenance marketplace with AMH** — your AMH doc says 3% of their $73M spend, with 30% back as a rebate. But the per-work-order model says $5–8/WO. **Which is it, or is it both?**

**2.21** Future non-AMH operators — ~20%. Still correct?

**2.22** Is there a **per-door license** ($2/door/month) for operators who don't get a revenue share?

---

# 3 · REVENUE STREAMS — in or out

**3.1** 🔴 **Care plan / homeowner subscription — OUT.** Confirmed today. Two consequences, confirm both:
- Remove the Care plan screen from TrustyPro v3? (or keep built, not launched)
- The builder dashboard's origination economics lead with care plans — **rebuild those numbers without it?**

**3.2** **Home Passport transfer fee** ($99–199 when a home sells) — in or out? It's in your designs, not in my model.

**3.3** **Rent reporting to credit bureaus** (resident pays ~$8/mo, you net ~$3) — in?

**3.4** **Referral program paying shop credit** ($15 renter / $30 homeowner) — in?

**3.5** **Data licensing** — your AMH doc models $300K–1.5M/yr on one 61K portfolio. My model has $11.2M at Y5 across everything. Are you comfortable carrying data revenue in the forecast at all, or should it stay documented-but-unmodeled?

**3.6** Of these, which are real and which do I drop? Escrow float · payment processing spread · fast-pay · agent referral fees · listing-ready report · sponsored placement in renderings · patent licensing · pro insurance commissions · supply house/GPO rebates.

**3.7** 🔴 The **move-out marketplace** (free report + checklist → movers, painters, cleaners, stagers, storage) — you liked this. In the model? Both homeowner and renter sides?

---

# 4 · THE APPS — what exists, what's needed

**4.1** 🔴 Your strategy doc names **seven platforms**. Confirm this list and the status of each:

| Platform | Who | Status per your doc | Correct? |
|---|---|---|---|
| ProLnk Pro | Owner-operator | Built | |
| ProLnk Field (FieldDoc) | W-2 tech, crew | Built | |
| **ProLnk Business OS** | Owner of 2+ person company | **Missing** | |
| **Partner Portal** | CoolSys, AMH, carriers, builders | **Missing** | |
| **ProLnk Facility** | End client (store manager) | **Missing** | |
| TrustyPro | Homeowner | Separate app | |
| **ProLnk Admin** | You | **Missing** | |

**4.2** Add to that list? (Operator dashboard/Portfolio, resident app, builder dashboard — are those separate or configurations?)

**4.3** 🔴 **Business OS scope** — which of these are must-have for v1?
- [ ] Dispatch board (assign jobs to techs)
- [ ] Roster / add-remove technicians
- [ ] ProPass seat purchase and management
- [ ] Compliance docs per person with expiry
- [ ] Invoicing
- [ ] Per-tech scorecards
- [ ] Revenue dashboard
- [ ] Payroll or time tracking
- [ ] Something else: ______

**4.4** 🔴 Does Business OS make the **120-day launch**, or is it immediately after? (Your strategy doc calls it the #1 blocker for any company above solo.)

**4.5** Same question for **Partner Portal** — AMH will need somewhere to look on day one of the pilot. In the 120 days?

**4.6** **ProLnk Facility** (the end-client app — a grocery store manager reporting "Rack A is running warm") — is that decided, or still a proposal?

---

# 5 · CUSTOMER JOURNEY AND GATING

**5.1** 🔴 **Onboarding opens with "who invited you"** — your strategy doc's biggest change. Confirmed for the rebuild?

**5.2** The five doors: enterprise invite · demand partner invite · founding network · Scout/agent/inspector · self-serve. Complete?

**5.3** **Role is provisioned, never chosen.** A tech invited by their owner lands in Field only. Confirm?

**5.4** **Lapsed subscription = loses priority routing, never locked out.** Confirm? (This contradicts the fail-closed gating in the audit — I need to know which wins.)

**5.5** **Solo operator** — one app, not split into Business OS + Field. Confirm the threshold is 2+ seats?

**5.6** 🔴 **Resident gating** — no prices, no vendor names, no marketplace in resident sessions. Still absolute for the AMH deal?

**5.7** **"Convert, don't cancel"** when a partner drops a vendor — move to verified-no-priority, keep ProPasses alive. Confirm as the policy?

---

# 6 · FINANCIAL MODEL INPUTS

**6.1** 🔴 **Rental door ramp.** Y1 = 61,000. What are Y2–Y5? (I modeled 175K / 350K / 550K / 800K.)

**6.2** 🔴 **Resident engagement rate** — what % of doors under contract actually activate? (I modeled 35% → 70%.)

**6.3** **Turnover** — your AMH doc says 35%/yr. Use that everywhere?

**6.4** 🔴 **Homeowner homes** by year. (I modeled 8K / 30K / 75K / 150K / 250K.)

**6.5** **Service ratio** — 20 properties per pro. Confirm?

**6.6** **Average firm size** — I assumed 4 technicians. Real number?

**6.7** What % of firms **subscribe** vs pay per-work-order? (I assumed 70/30.)

**6.8** **Commercial tenants** by year — I modeled 1 / 3 / 7 / 12 / 20. Realistic?

**6.9** Average **residential job value** and **jobs per home per year** — I used ~$600 and 1.5. Right?

---

# 7 · DEV TEAM AND CODE

**7.1** 🔴 Kill the two legacy commission routers — proceed now? (They're wrong under any model.)

**7.2** 🔴 Commission engine must support **three** structures now: residential platform fee · commercial 3%-on-sourced · operator/AMH share. Confirm that's the requirement?

**7.3** 🔴 **Payments: split at settlement, no escrow hold.** Confirms your decision today and your strategy doc. Should I change audit item 5.3?

**7.4** Should the dev team **hold** on rate configuration until this document is answered?

**7.5** Does Joe know about Business OS, Partner Portal, and Facility? They're in your design docs but not in anything I've given him.

---

# 8 · THINGS I MAY HAVE WRONG

**8.1** Is the **network override** still part of the product at all, or has the strategy moved past it?

**8.2** Your strategy doc says **four separate marketing sites** (residential, commercial, partners, TrustyPro). Decided?

**8.3** **Virtual Badge** — built in the designs (`prolnk-vbadge.jsx`) and named as a top-four differentiator. But it's on the patent CIP list and shouldn't be publicly marketed before filing. Where does that stand?

**8.4** **Move-In Shield, ProPass gating, Scout origination** — same question. Filed, or still hold-before-marketing?

**8.5** Anything decided in the last month I haven't seen at all?
