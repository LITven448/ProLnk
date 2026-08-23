# CoolSys Deal Economics — INTERNAL ONLY
**Do not send. Companion to `coolsys-proposal.md`.**
**All figures are modeled estimates on stated assumptions, not quotes or commitments.**

---

## Key assumptions (change these and everything moves)

| Assumption | Value | Confidence |
|---|---|---|
| Subcontractor firms in network | 1,200 | **Low** — not public; could be 500 or 2,000 |
| Vendor subscription adoption | 40% | Medium — untested in commercial |
| Vendor subscription price | $149/mo avg | Medium |
| Subcontracted work orders/year | 45,000 | Low — derived from 45K locations × ~2–4 events × ~1/3 subbed |
| Per-work-order fee | $5 | Medium |
| Loaded engineering cost | ~$180K/yr per FTE | High |

**The vendor count is the single biggest swing factor. Get it in discovery before signing anything.**

---

## Revenue

### Year 1
| Line | Amount |
|---|---|
| Pilot fee (90 days, fixed) | $150,000 |
| Platform license (post-pilot, ~6 months of year 1) | $200,000 |
| Work-order fees (partial year) | $110,000 |
| Vendor subscriptions (ramping, ~25% avg adoption over the year) | $320,000 |
| Implementation / integration | $100,000 |
| **Year 1 total** | **~$880,000** |

### Year 2+ (steady state)
| Line | Amount |
|---|---|
| Platform license | $400,000 |
| Work-order fees (45,000 × $5) | $225,000 |
| Vendor subscriptions (1,200 × 40% × $149 × 12) | $858,000 |
| **Recurring total** | **~$1,483,000** |

### Sensitivity on vendor adoption (the number that matters most)
| Vendors | 20% adopt | 40% adopt | 60% adopt |
|---|---|---|---|
| 500 | $179K | $358K | $536K |
| 1,200 | $429K | $858K | $1,287K |
| 2,000 | $715K | $1,430K | $2,146K |

**Recurring revenue range across those scenarios: $800K – $2.8M.** Model the deal at the low end and treat the rest as upside.

---

## Costs to serve

### One-time build (commercial configuration)
The enterprise console is being built for AMH regardless. The incremental commercial work — tenant configuration layer, dispatch board + SLA escalation, refrigerant/EPA 608 module, FM system integrations, subcontractor mobile variant, vendor registry and bulk import — is estimated by the founder at **~$25,000 in cash cost**.

That figure reflects an equity-compensated, AI-assisted dev team: the build is paid in dilution and calendar time, not payroll. It is a genuine structural margin advantage and the model uses it.

**Two caveats that are real regardless of build speed:**
- **Integrations are the wildcard.** ServiceChannel/Corrigo connections depend on third-party API access, sandboxes, and partner approval. Cap the number included in the pilot contract.
- **The binding cost is dev-weeks, not dollars** — every one competes with the 120-day launch.

**Pricing implication: do not discount because the build is cheap.** The $150K pilot fee covers the build six times over. Price on the value delivered — the DSO reduction alone dwarfs the fee.

### Annual cost to serve CoolSys
| Item | Cost |
|---|---|
| Engineering (0.75 FTE — maintenance, commercial features) | $135,000 |
| Customer success / account management (0.5 FTE) | $65,000 |
| 24/7 support coverage allocation (mission-critical SLA) | $90,000 |
| Infrastructure / hosting | $25,000 |
| Vendor credential verification data (1,200 × ~$30) | $36,000 |
| AI triage (~45K work orders — negligible) | $1,000 |
| **Total annual** | **~$352,000** |

Sales cost is separate: expect $120–150K in commission/comp allocated against year-one revenue if a salesperson closes it (zero if founder-led).

---

## Profit

| | Year 1 | Year 2+ |
|---|---|---|
| Revenue | $880,000 | $1,483,000 |
| Cost to serve | $352,000 | $352,000 |
| One-time build (amortized over 3 yrs) | $8,000 | $8,000 |
| **Contribution profit** | **~$520,000** | **~$1,123,000** |
| **Contribution margin** | **~59%** | **~76%** |

*Contribution margin = revenue minus direct cost to serve, before shared G&A, founder comp, and company overhead.*

**Customer #2 is dramatically better:** no one-time build, and support/engineering costs are shared. A second Tier A customer runs ~$250K to serve against ~$1.4M revenue → **~82% contribution margin.** This is the entire argument for treating commercial as a product line rather than a one-off deal.

---

## Upside beyond the base case

| Lever | Annual value | Notes |
|---|---|---|
| Fast-pay / factoring referral (1.5–3% on subcontractor invoices) | $200–500K | Needs a factoring partner, not your capital |
| Refrigerant/ESG compliance sold to their grocery clients | $100–300K | Direct relationship above your customer |
| Parts GPO / procurement margin | $150–400K | Requires volume first |
| Predictive maintenance module | $100–200K | Built from their own equipment failure data |
| **Mature account potential** | **$2.0–2.9M/yr** | vs. $1.48M base |

**Portfolio upside:** the CoolSys reference plus an Ares operating-partner introduction is the path to Tier A customers #2–4. Three Tier A accounts ≈ **$4.4M revenue, ~$3.3M contribution.** Fifteen to twenty-five accounts over five years ≈ **$25–40M ARR**, which at enterprise SaaS multiples of 6–10× revenue is a **$150–400M business** standing on its own.

---

## What could go wrong

- **Vendor adoption undershoots.** If CoolSys won't push subscriptions to their network, that $858K becomes $200K and the deal is merely fine instead of great. **Mitigation:** the license-offset structure — vendor revenue reduces their license fee — gives them a direct financial reason to drive adoption.
- **Integration scope explodes.** Client FM systems vary; some have no usable API. **Mitigation:** scope integrations explicitly in the pilot contract, cap the number included.
- **24/7 support is underpriced.** Mission-critical refrigeration means real on-call. If SLA obligations are tight, $90K becomes $200K. **Mitigation:** define support tiers and response commitments in writing before signing.
- **Focus cost.** Every hour on commercial is an hour off the 120-day residential launch. **This is the real risk and it isn't on this spreadsheet.** Sell now, build after Day 120.
- **Procurement grind.** A $2B PE-owned company may take two to four quarters and a security review to sign even a pilot.

---

## The rule
**Never write a check to a customer who is paying you.** No revenue share on vendor subscriptions — offer the license offset instead, and pay referral fees (10–15% of first-year revenue) only for contractors they actually bring you.
