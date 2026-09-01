# Design Handoff — TrustyPro (the property side)
**Paste this at the start of every TrustyPro design session, with `CANONICAL-STATE-AUG-2026.md`.**
**This covers property-facing surfaces only. ProLnk has its own handoff.**

---

# 1 · What TrustyPro is

**One app, everyone who lives in a home. Two modes, gated by who you are.**

| | **Homeowner mode** | **Renter mode** |
|---|---|---|
| Sees | Full app — Vault, marketplace, quotes, prices, vendor names, commerce, financing | Move-In Shield, maintenance requests, commerce shelf, move-in/move-out checklists |
| **Never sees** | Vendor economics | **Prices · vendor names · marketplace content** |
| Pays | Nothing. Free forever. | Nothing. Free forever. |
| Issued by | Themselves, a builder, an agent, an inspector | Their property manager |

**A renter who buys a house switches modes and keeps their entire home history.** Do not design these as two apps — that transition is one of the most valuable moments in the business.

**The builder is not a separate product.** It is a licensed channel into homeowner mode: the buyer's house simply arrives pre-documented on closing day. Same app, richer starting state.

**TrustyPro Portfolio** is the organization dashboard — one product, four configurations: **rental operator** (AMH) · **commercial contractor** (CoolSys) · **builder** (D.R. Horton) · **HOA**. Same spine each time: work item arrives → AI triage → approve/assign → dispatch → track → photo completion → pay.

---

# 2 · What already exists — do not rebuild

**TrustyPro v3 has three complete modes designed:**

**Homeowner:** Welcome · Magic autofill · Coaching · Camera · Score reveal · Dashboard · Health Vault · Request service · Tracking · Proactive alert · Profile · Capture hub · Fix (AI chat) · Document 3D · Redesign (AI chat) · AI render · Shop the look · Filing cabinet · Doc AI filing · Nameplate AI log · Compare 3 quotes · Book a time · Approve & pay · Rate the pro · Care plan · Refer a neighbor · Recall alert · Notifications · Home inspections · Emergency · All services · Service intake · Scout project · Partner perks · Passport (selling) · Passport (new owner)

**Resident:** Enterprise gating · Sign in · Invite accept · Address confirm · First run · Resident home · Shield rooms · Shield capture · Shield room done · Shield sealed · Maintenance report · Maintenance tracker · Maintenance tab · Shop (Make It Home) · Product · Checkout · Rent builds credit · Refer a friend · Just for you · Book a service · More · Access ended

**Builder:** Closing day handover · Builder records in Vault · Warranty hub · Warranty request + verdict · Request tracker · Inside your walls (pre-drywall archive) · Warranty ends → Care

**Moving in (both modes):** checklist · electricity · internet · insurance · done

**The Vault already anticipates the document-parsing strategy** — it has categories for closing & title, closing disclosure, and home inspections. That is where the closing-packet upload lands.

---

# 3 · What needs designing

### P0 — Partner Portal / TrustyPro Portfolio
What AMH, CoolSys, a builder, or an HOA actually logs into. **AMH needs somewhere to look on day one of the pilot** and it does not exist.
- Their work orders, filtered and prioritized, with SLA clocks
- Their vendor pool with compliance status and expiry
- **Invite management** — the mechanism that converts a partner's whole vendor list at near-zero cost. This is the single strategic claim the whole partner model rests on.
- Spend, scorecards, pilot metrics (cost per work order, approval time, turn days, adoption)
- Four tenant configurations, one codebase. **Switching org type should re-skin and re-gate every screen live — that is the sales demo.**

### P1 — Move-in and move-out checklists
Not a marketplace. **Two checklists inside the app:**
- **Move-in checklist** (new home) — utilities, security, address changes, first-week setup
- **Move-out / pre-sale checklist** — for a renter leaving, or a homeowner preparing to sell: what to fix first, ranked, with cost estimates

Both generate jobs and affiliate revenue as a by-product. The pre-sale version is generated from Vault data the homeowner already has.

### P1 — TrustyPro marketing site
One of the four sites. Consumer register, not the contractor voice. *(The live trustypro.io currently serves ProLnk's title and description — fixed on branch `website-fixes`, not yet deployed.)*

---

# 4 · Rules that must hold

**Resident gating is absolute.** No prices, no vendor names, no marketplace content in a renter session. This is a **legal and contractual requirement of the AMH deal**, not a design preference. It should be enforced server-side and covered by automated tests.

**Move-In Shield records are immutable and that is the product.** The trust line — *"Neither you nor your property manager can edit these after today"* — is what makes a resident document honestly. Photo loss is deal loss; treat storage durability as the highest-priority requirement in the resident flow.

**Photo-first everywhere.** Typing is the fallback. AI moments get a brief processing state, then a plain-English verdict with "that's right / not quite" confirmation.

**Every AI determination shows its basis.** The warranty clause next to the coverage verdict. The evidence next to the finding. Never a verdict alone.

**Renders are labeled and quarantined.** AI visualizations carry a small *"AI visualization — actual results will vary"* mark. **Never generated for insurance, structural, roofing, or HVAC work.** They live in a separate storage class and **can never appear in a claim file, dispute packet, move-out comparison, or documentation export.** The original photo is evidence; the render is a suggestion.

**Three photo classes, and the rules differ:**
| Class | What | Evidence? | In exports? |
|---|---|---|---|
| `documentation` | Move-In Shield, condition scans | Yes — timestamped, immutable | Yes |
| `job_record` | Real before/after of completed work | Yes — proof of work | Yes |
| `render` | AI visualizations | **Never** | **Never** |

**Renders behave like AI findings** — suggestions in the feed the homeowner accepts, rejects, or deletes. Reject archives it (kept as preference signal). Delete means genuinely deleted.

---

# 5 · Never show publicly

**Patent-pending features in public marketing.** **Move-In Shield** and **Scout origination** are not yet filed as continuations. The non-provisional is due around **March 2027.** Design them, prototype them, show them under NDA — do not put them on a public marketing page.

**Real company brands used as fictional.** AMH and D.R. Horton are real companies in active conversations. The builder brief currently calls D.R. Horton "a fictional builder" — it is not. Use invented names (e.g. "Sunbelt Homes") in any prototype that might be shown to a different builder.

**Care plans — remove the remnants.** Deferred until the platform is established. Two places still reference it and both need rewording: the homeowner referral screen rewards "a free month of TrustyPro Care" (→ shop credit or points), and the builder journey ends at "Warranty ends → TrustyPro Care" (→ scheduled maintenance).

**Gamification rule, refined:** the old "nothing gamified" was too broad. **Never gamify anything that carries trust** — no points on Move-In Shield completion, no streaks on maintenance requests, no badges on deposit protection. Points and quests are fine on optional seasonal maintenance and referrals, on both sides.

**Renter prices — the boundary.** A renter paying for their own cleaning **must** see what they'll pay. The gate is about marketplace, not money: ✅ price for services they personally buy · ❌ vendor names · ❌ prices for operator-paid maintenance · ❌ quote comparison.

---

# 6 · The money — how TrustyPro actually earns

**Homeowners and residents never pay for the app.** All revenue comes from the transactions and partners around them.

### Homeowner side, per home per year
| Stream | How it works | Net/home/yr |
|---|---|---|
| **Platform fee on jobs** | 1.5 jobs/yr × ~$600–700, tier rate charged to the *pro* — invisible to the homeowner | ~$70–95 |
| Furniture, appliances, decor | Rendering-driven "shop the look" | **$42** |
| Moving & storage | ~9% turnover × $200 | $13 |
| Consumer financing | 8% finance a ~$8,000 project × 2.5% | $16 |
| Home warranty referral | 8% attach × $75 | $6 |
| Homeowner insurance referral | 5% attach × $125 | $6 |
| Security / smart home | 4%/yr × $125 | $5 |
| Solar / energy | 1%/yr × $300 | $3 |

### Renter side, per engaged door per year
| Stream | How it works | Net/door/yr |
|---|---|---|
| **Utility connections** | Multifamily: recurring ~$6/door/mo on bulk-internet deals. Single-family: ~2 services × $65 bounty per move-in | **$20** |
| Furniture, electronics, decor | $30 per move-in + $6/yr ongoing | $13 |
| Renters insurance | 60% attach × $27 — **haircut 50%** for state licensing limits | $11 |
| Moving companies | 30% of move-ins × $80 | $10 |
| Rent reporting to bureaus | 20% enrollment × $3/mo net | $7.20 |
| Storage | 15% of move-ins × $80 | $5 |
| Security / smart home | 5%/yr × $100 | $5 |
| **Renter-paid services** | Cleaning, mounting — resident pays the pro, tier fee applies | ~$8 |

**The move-in moment is worth roughly $71 per door per year on its own.** That is the entire argument for the app being part of the operator's move-in process rather than an optional download.

### Operator side
- **$3 per work order, paid by the rental company.** Vendors are never charged.
- **Annual license: $150–300K** for large operators, or **$1.50–2.50 per door per month with no revenue share** for operators under 10,000 doors.
- **Operators over 10,000 doors take 30% of partner-stream revenue**, split at settlement and **paid partner-direct** — it never touches ProLnk's books. The 30% is the price of becoming their resident platform, not a marketing incentive.

### The data layer
Every documented property becomes a licensable record. **Homeowner records are worth ~2× rental records** — the ownership relationship, transaction history, and the actual policyholder. Records license **non-exclusively to 5–8 buyer types at once**: insurance carriers, reinsurers, mortgage servicers, warranty underwriters, equipment manufacturers, AVM platforms, iBuyers, climate analytics.

**Homeowner record ~$62/yr · rental record ~$30/yr.** By Year 7 that is **$61M** — and it exists only because the app documents homes. Every design decision that increases documentation completeness increases this line.

---

# 7 · Scale, so the design decisions have context

| | Y1 | Y3 | Y5 | Y7 |
|---|---|---|---|---|
| Rental doors contracted | 61,000 | 550,000 | 1,100,000 | 1,700,000 |
| **Engaged rental doors** | 51,850 | 500,500 | 1,045,000 | 1,615,000 |
| Homeowner homes | 10,000 | 100,000 | 550,000 | 1,100,000 |
| Engagement rate | 85% | 91% | 95% | 95% |

**Engagement is 85–95% by design, not by marketing.** The app is issued as part of the move-in process and used again at move-out, so effectively the whole resident base is in it. That assumption is doing enormous work in the model — the onboarding and first-run experience have to earn it.

---

# 8 · Brand

**Indigo `#4F46E5`, soft neutrals, warm and generous.** Consumer software someone chose to like, not a portal they were assigned.

**Voice:** plain-spoken and confidence-building. **No jargon, nothing gamified, and never the word "leads."** A homeowner is not a lead and a resident is not a unit.

**The promise:** *"Your home, handled."*

**For the resident experience specifically:** the register is a **keepsake, not a ticketing tool.** Move-In Shield protects their deposit. The Vault is their home's record, kept for life, and **it stays theirs when they leave** — *"Your Shield records remain yours forever."* That promise is what makes people document honestly at move-in, which is what makes the whole data layer real.

**For Portfolio (the organization dashboard):** enterprise register — data-dense, fast to scan at 6am, calm. **The partner's brand is a re-skin layer** (accent color, wordmark, the word they use for their people) — never the structure.
