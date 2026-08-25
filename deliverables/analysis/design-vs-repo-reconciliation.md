# Design ↔ Repo Reconciliation — Full Findings
**Generated from a 5-dimension, 83-agent cross-check of 7 Claude design documents against all repo deliverables.**
**78 candidate findings, 75 confirmed by adversarial verification, 3 refuted.**

Each finding states what the design document says, what the repo says, and the consequence. Verification corrections are included where a verifier refined the original claim.

---

# CRITICAL (22)

## C1 · ProLnk Business OS — the strategy's #1 build priority has zero footprint anywhere in the repo

**Design says:** §07 lists ProLnk Business OS as a distinct platform for the owner of a 2+ person company (revenue, dispatch board, roster, ProPasses, compliance, clearances, invoices, tech scorecards, subscription), status Missing. §09 ranks it #1 of 5: "We cannot close a twelve-technician company without it. This is the blocker on every deal above solo, and it is the largest gap in the product today."

**Repo says:** The string "Business OS" appears zero times in the entire /Users/andrewfrakes/Desktop/prolnk/deliverables tree. platform-architecture-personas.md demotes it to a sub-feature of codebase #2: "Web view | Business management only (reporting, team, billing). Field work is mobile." No dispatch board, no roster, no tech scorecards, no clearance management. The architecture spec's build order treats the pro app as done — "pro app (parity check)" — and 120-day-launch-plan.md scopes the pro side to "onboarding, verification, job lifecycle, commission engine, payouts" only. No phase, no gate, no owner, no line item.

**Consequence:** The item the design doc calls the largest gap in the product and the blocker on every non-solo deal is not being built in the next 120 days and no one has been told. "Reporting, team, billing" is a three-item web view; the strategy's list is nine surfaces including a live dispatch board. Anyone reading the repo believes the owner persona is covered by a parity check.

---

## C2 · Partner Portal invite management is an explicit non-goal of the only partner-facing surface in the plan

**Design says:** §07 Partner Portal (CoolSys, AMH, carriers, builders, warranty cos) must show "Their work orders, their vendor pool, SLA compliance, spend, scorecards, invite management." §09 ranks it #2: "Every partnership in section 03 depends on this existing." §01 makes invites the entire thesis — "stop optimizing the self-serve funnel and start manufacturing invites."

**Repo says:** operator-dashboard-pilot-spec.md is two screens (approval queue + pilot scoreboard) and explicitly excludes almost the whole list: "No Overview/Assets/Turns/Compliance/Vendors/Procurement/Reports screens." Invite management is doubly excluded — "Accounts created by ProLnk staff seeding (no self-serve invite flow in pilot)." 120-day-launch-plan.md scopes it as "Operator dashboard: approval queue + assignment + pilot metrics (thin version done perfectly)."

**Consequence:** The mechanism that converts a partner's whole vendor list at near-zero cost — the single strategic claim the pricing model in §02 and the onboarding rebuild in §08 both rest on — cannot be exercised by any partner at Day 120. Every invited vendor must be seeded by ProLnk staff by hand, which caps partner-sourced supply at ProLnk's own manual throughput.

---

## C3 · The renter/resident platform is the repo's dominant P0 and does not appear in the seven at all

**Design says:** §07's seven-platform table has no resident or renter entry. TrustyPro appears once, scoped to "Homeowner." The words renter, resident app, Move-In Shield, and tenant appear nowhere in the strategy doc ("residents" occurs once, as a property-manager pain point in §03). §09's build order of five contains nothing renter-related.

**Repo says:** 120-day-launch-plan.md makes it the flagship: "TrustyPro Renters: full P0 (invite, resident gating, Move-In Shield, maintenance request, tracker, Utility Valet handoff)," an entire Phase-2 parallel track (Track A), the largest spec in the folder (renters-p0-build-spec.md, 58KB), and two of the five go/no-go criteria (zero photo loss on Move-In Shield; gating never leaks). platform-architecture-personas.md makes resident mode half of codebase #1.

**Consequence:** The seven-platform list cannot be used as a scope map or a sequencing document, because the single biggest thing being built in the next 120 days is absent from it. Anyone planning headcount or dates off §09 concludes Renters is unscheduled work, and anyone reconciling the two lists finds an unexplained eighth platform consuming most of the build capacity.

---

## C4 · ProLnk Admin: named missing by one doc, in-scope by another, and absent from the plan that owns Day 120

**Design says:** §07 lists ProLnk Admin (trust and fraud ops, clearance verification queue, partner billing) with status Missing — then §09's five-item build order never mentions it. The design doc names it missing and never sequences it.

**Repo says:** platform-architecture-personas.md calls it codebase #4, "the one everyone forgets," enumerates required functions (audited impersonation, refunds/disputes, vendor approval queue, AI agent monitoring + kill switch, ledger reconciliation, feature flags, tenant config editor), and puts it in scope: "internal admin console (thin but real)" by Day 120. But 120-day-launch-plan.md's IN list never names an admin console, and nothing in Phases 1–5 builds one. Grep for "admin console" across the three specs returns only the architecture spec.

**Consequence:** Three documents, three positions, no owner. Support, refunds, disputes, vendor approval and the AI kill switch are all launch-day operational necessities that the architecture spec assumes exist by Day 120 and the launch plan never funds. Clearance verification — the queue that gates the §02 clearance revenue line — has no home in any repo spec.

---

## C5 · Sales script instructs reps to state a CoolSys partnership that the same document says is unsigned

**Design says:** ProLnk Platform Strategy, §05: "Enterprise vendor: \"CoolSys already picked you. This keeps you first in line — and puts every other commercial job in the metro on the same screen.\"" Also §05: "The partner rate is a gift from CoolSys." And §01: "CoolSys tells a refrigeration contractor to get on ProLnk. American Homes 4 Rent tells a plumber." And §06: "Decision made: the end client gets an app... CoolSys keeps their customer."

**Repo says:** The same document, §09, lists both as unclosed prospects: "We cannot close CoolSys, AMH, a carrier, or a warranty company without giving them somewhere to look. Every partnership in section 03 depends on this existing." The Partner Portal is listed as "Missing" in the §07 platform table. CoolSys, Inc. and American Homes 4 Rent (AMH) are real operating companies; neither appears in the brand portfolio memory (business_brands.md) as a signed partner.

**Consequence:** This is not a positioning slide — it is a scripted sentence to be spoken to a contractor to induce a paid subscription. A false statement of material fact made to close a sale is a deceptive trade practice (FTC Act §5; Texas DTPA §17.46(b)(5), which carries treble damages for knowing violations) and false endorsement under Lanham Act §43(a). CoolSys can sue on its own for false association regardless of whether any contractor complains. Every vendor signed on this line is also a rescission and refund claim.

---

## C6 · D.R. Horton, a real NYSE homebuilder, is labeled "fictional" and slated for co-branded shareable exports

**Design says:** TrustyPro Builder Dashboard Brief, Design direction: "The prototype used a fictional builder, D.R. Horton, in warm clay #B4552F with gold #C08A3E accents on deep umber #2A1A12". Screen 7, Sales center kit: "Co-branded exports: a sample Home Passport, community documentation stats, model-home QR, and a one-page buyer explainer. Everything shareable, everything carrying both logos."

**Repo says:** D.R. Horton, Inc. is a real, publicly traded homebuilder (NYSE: DHI) and the largest homebuilder in the United States, headquartered in Arlington, Texas — the same metro as the DFW targeting workbooks in this project. "D.R. HORTON" is a registered trademark. It is not fictional and cannot be treated as a placeholder.

**Consequence:** The brief is explicitly written to be handed to an outside builder ("hand this document to a fresh build session"), so a build session will render D.R. Horton's name and brand palette into UI and then into exports that Screen 7 says are "shareable" and "carrying both logos." That is trademark use in commerce plus false affiliation — the strongest possible fact pattern for a Lanham Act §32/§43(a) claim, because a real builder's mark appears on outbound consumer-facing marketing collateral. Replace with a genuinely invented builder name before this reaches any developer.

---

## C7 · "Coolsyn" as a product brand is a phonetically identical collision with CoolSys, the company named as a partner in the sibling document

**Design says:** Coolsyn Resident App Brief, title and throughout: "Coolsyn — Resident App Build Brief"; "this brief extracts that whole side so it can be rebuilt as its own product under the Coolsyn name"; "Coolsyn should pick its own identity, but keep the temperature"; "Even if Coolsyn doesn't have a homeowner product, keep the export promise".

**Repo says:** The file sitting beside it in the same folder is titled "CoolSys Vendor App — ProLnk White Label" and its source tree bakes the real company's name into module filenames: coolsys-persona.jsx, coolsys-app.jsx, coolsys-feed.jsx, coolsys-exchange.jsx, coolsys-showcase.jsx. CoolSys, Inc. is a real commercial refrigeration and HVAC services company operating in the property-services space.

**Consequence:** Coolsyn and CoolSys are aurally indistinguishable and would serve overlapping property-services customers — near-automatic likelihood of confusion under the DuPont/Sleekcraft factors. Worse, the paper trail shows the name was coined in the same document set that names CoolSys as a target partner, which supplies the intent/bad-faith factor that turns a defensible coincidence into willful infringement and fee-shifting exposure. It also poisons the partnership itself: CoolSys's counsel will read this as ProLnk building a competing branded product off their name. Pick a clean-room name and run a clearance search before any code ships.

---

## C8 · Insurance commission revenue with a 30% property-manager rev-share, described with no licensing caveat

**Design says:** Coolsyn Resident App Brief, unit economics: "Renters insurance | 12–18% commission on ~$180/yr premium, near-universal attach (lease-required) | ~$988k/yr gross". Screen 4: "insurance is tabbed Renters/Home with a lease-required banner (\"we'll file proof with [PM] automatically\")". And: "PM takes 30% of each stream, paid partner-direct." TrustyPro Builder Dashboard Brief: "Partner perks — insurance, warranty, security | 20% of activation fees".

**Repo says:** The ProLnk Platform Strategy document proves the team knows this caveat is required — §03 carries a boxed warning for carriers: "Legal review required — Carrier-directed repair and referral compensation are regulated differently in every state, and anti-steering rules apply. This is the highest-value partnership and the one most likely to need restructuring before launch. Get counsel involved before the first pitch, not after." The Coolsyn brief carries the largest single insurance number in the entire document set and has no equivalent warning anywhere.

**Consequence:** Taking a percentage of premium requires a resident producer or agency license in each state. Most states permit an unlicensed referrer only a flat fee that is not contingent on sale or premium volume (e.g., NY Ins. Law §2114, Cal. Ins. Code §1724.5, Tex. Ins. Code §4005.053) — a 12–18% commission is the textbook prohibited arrangement. Splitting 30% of it to a property manager compounds it: that is commission-sharing with an unlicensed entity and, in several states, unlawful rebating. Penalties are per-transaction, and "near-universal attach" across 61,000 doors means tens of thousands of transactions. Add the same boxed caveat, or restructure to a licensed agency-of-record model, before this brief is handed to a builder.

---

## C9 · Rent reporting to credit bureaus priced as a revenue line with no FCRA, CSO, or state fee-cap caveat

**Design says:** Coolsyn Resident App Brief, Screen 4: "Rent reporting to credit bureaus lives here too (~$2–3/mo platform revenue per enrollee; late payments never reported)." Economics table: "Rent reporting | Resident pays ~$8/mo; platform nets ~$3/mo | $154k–549k/yr". Design direction: "Trust microcopy is load-bearing... 'late payments never reported'... keep them verbatim or improve them, never drop them."

**Repo says:** No caveat, disclaimer, or legal-review flag appears anywhere in the document for this stream, in contrast to the strategy document's explicit "Legal review required" box for the insurance carrier channel.

**Consequence:** Furnishing consumer data to bureaus makes the platform a "furnisher" under FCRA §623 (15 U.S.C. §1681s-2), triggering accuracy duties and mandatory dispute reinvestigation within 30 days — an operational obligation with statutory damages and a private right of action that is nowhere in these screens. Charging the consumer for credit improvement independently triggers state credit-services-organization statutes requiring registration and a surety bond (e.g., Tex. Fin. Code ch. 393, directly relevant given DFW targeting). And California AB 2747 caps the resident's rent-reporting fee at the lesser of $10/month or the landlord's actual cost — an $8 charge yielding "$3/mo" platform margin is not actual cost and would be unlawful in California. "Late payments never reported" is a defensible design but is being frozen as verbatim marketing copy before counsel has blessed the completeness question.

---

## C10 · Patent-sensitive mechanics written into unmarked hand-off documents ahead of the non-provisional deadline

**Design says:** Both briefs carry the instruction "August 2026 · hand this document to a fresh build session" and no confidentiality legend. ProLnk Platform Strategy discloses each unprotected mechanic in enabling detail: "Clearance gates the job class — Within a visible lane, school, healthcare, municipal, federal, and military work stay locked until the matching screening is active"; "Seat + ProPass | Per field technician: login, license wallet, Virtual Badge | $20/mo each"; "Scout-posted project piece | Scout scoped and priced it | 3%"; "Founding network — pro refers pro | Referral share | Belonging, plus the network income". TrustyPro Builder Dashboard Brief: "Every care plan, marketplace job, partner activation, and eventual Passport transfer at resale carries origination attribution back to the builder who documented that home first."

**Repo says:** project_patent.md: "Known unprotected features for continuations/new provisional: ProPass clearance + site-type dispatch gating; Scout property origination rights; subscription-revenue referral overrides." Provisional 64/013,097 filed 2026-03-22; non-provisional deadline 2027-03-22. These three documents disclose precisely those three unprotected items, plus builder origination attribution.

**Consequence:** Handing an unmarked, enabling written description to an outside build session without an NDA is a public disclosure. It starts the 12-month §102(b) clock on the unprotected features and immediately forfeits absolute-novelty jurisdictions (EPO, China, Japan), which have no grace period at all. It also creates prior art the examiner can cite against your own continuation. With roughly seven months left before 2027-03-22, this is the finding with the hardest deadline: add a confidentiality legend to all four files, get an NDA signed before any hand-off, and get the ProPass gating, Scout origination, and referral-override claims into a provisional before these documents circulate further.

---

## C11 · The 30% payment mechanic is inverted — HTML says partner pays AMH directly and off-P&L; the repo has Platform collecting and remitting through cost of revenue

**Design says:** "the property manager takes 30% of net revenue generated by their residents, paid directly by the partner under a three-party agreement." And explicitly: "Paying partner → manager directly (rather than TrustyPro collecting and remitting) keeps the share off TrustyPro's P&L as a cost of revenue, and the manager doesn't depend on TrustyPro to get paid. Structure it that way in the first contract; it is painful to unwind later."

**Repo says:** MASTER_BUSINESS_MODEL_2026.md line 190: "Operator revenue share (AMH 30%, others ~20%) is carried in cost of revenue, not netted above." The P&L line reads "Cost of revenue (incl. operator shares)." The draft MSA at deliverables/legal-drafts/operator-msa.md §4.1 goes further: "Platform will pay Operator the following revenue shares, calculated on amounts actually received and retained by Platform (net of refunds, chargebacks, taxes, and payment-processing costs)," with §4.3 setting quarterly payment within 45 days and a minimum-payout threshold below which nothing is paid and amounts roll forward.

**Consequence:** These are the two opposite structures, stated in the same words. The HTML tells AMH they get paid by the insurer/affiliate directly and never depend on TrustyPro; the executable document has TrustyPro collecting everything, netting processing costs, and paying quarterly in arrears with a minimum threshold. If the HTML's structure is what gets pitched and signed, every revenue line in the master forecast is overstated by the 30% (it recognizes gross), cost of revenue drops, and every gross-margin figure in the P&L (70% → 79%) has to be restated. If the MSA's structure is what gets signed, the HTML's central selling point to AMH is false.

---

## C12 · Maintenance marketplace mechanism is a 3%-of-spend platform fee in the HTML and a $5–8 per-work-order fee everywhere in the repo — 7x the revenue, and the wrong party pays it

**Design says:** "AMH already spends roughly $1,200/door/yr on maintenance and turns — about $73M/yr across 61,000 doors. Routing that through TrustyPro's pro network at a 3% platform fee is $2.2M/yr." The fee is drawn from AMH's own spend, which is why the HTML then structures the return as a rebate against that spend.

**Repo says:** RATES-MEMO.md: "No free tier; non-subscribers pay $5–$8 per work order (charged to the vendor, netted from payment)" — plus the $99–$249/mo vendor subscription ladder for everyone else. MASTER stream 4: "Per-work-order fees — $5–8 charged to non-subscriber vendors in operator programs"; stream 23 repeats it. The forecast line "Operator work-order fees (rental maintenance)" is $0.3M in Y1 on the same 61,000 doors.

**Consequence:** $2.2M vs $0.3M on the identical door base — a 7.3x overstatement of the single largest number in the HTML model. Converted to a per-order basis the gap holds: 3% of a ~$480 average work order is ~$14.40 versus the memo's $5–8. Worse, the fee incidence flips. The repo charges the vendor and nets it from the vendor's payment; the HTML charges AMH's maintenance budget. That is a different contract, a different negotiation, and a different objection ('you're taxing my repair spend' vs 'your vendors pay to be in the network').

---

## C13 · The rebate is invented, has no payer, and is then counted as new income in the headline the document is built around

**Design says:** "this is the manager's own spend, so it is structured as a rebate, not a rev-share: AMH gets 30% back as a credit against their spend, which reads on their side as a cost reduction rather than new income." Two paragraphs later the same $660k is added in: "~$1.9M/yr flowing to AMH" and "≈$31 per door per year of new income to AMH."

**Repo says:** No rebate, credit, or contra-revenue concept appears in RATES-MEMO.md, MASTER_BUSINESS_MODEL_2026.md, or operator-msa.md. RATES-MEMO scopes AMH's 30% to "their vendors' subscriptions and net affiliate/commerce commissions from their properties." MSA §4.1 lists four share bases — vendor subscriptions, resident-paid purchases, move-out services, data licensing — all of them Platform revenue, none of them AMH spend.

**Consequence:** Two compounding errors. Structurally, because the per-work-order fee is charged to the vendor and netted from the vendor's payment, AMH never pays it — there is no AMH outlay to rebate against. Presentationally, the document defines the rebate as explicitly not income and then includes it in the 'new income' total anyway. Stripping it out, the correct headline is $1.26M to AMH and ~$21/door of new income, not $1.9M and $31/door. The $31/door figure is called 'the number that closes the deal,' so the error sits on the one line the deal is meant to turn on.

---

## C14 · HTML applies attach rates to all 61,000 doors with no engagement haircut; master model says only 21,350 doors are monetizable in Y1

**Design says:** Volumes are computed against the full contracted base: 36,600 renters-insurance policies (60% of 61,000), 3,050 security activations (5% of 61,000), 15,250 rent-reporting enrollments (25% of 61,000). No engagement, activation, or adoption ramp appears anywhere in the document.

**Repo says:** MASTER lines 145–149 make this the model's headline caveat: "A signed operator delivers doors under contract on day one. Revenue comes from engaged doors — residents who actually activated the app. These are not the same number, and conflating them is the fastest way to build a forecast that misses." Y1 engagement is 35%, giving 21,350 engaged doors out of 61,000 contracted. Line 243 calls resident engagement "the most sensitive line in the model."

**Consequence:** Every door-base stream in the HTML is overstated by roughly 2.9x against the master model's own Y1 assumption. Renters insurance at 60% of engaged doors is 12,810 policies and $346k gross, not 36,600 policies and $988k. This is the exact error the master model was rewritten to prevent, reintroduced in the partner-facing document.

---

## C15 · 35% turnover and 35% engagement are the same number meaning different things — and they should compound, not substitute

**Design says:** "Assumes ~35% annual turnover (≈21,000 move-ins/yr)" — used as the base for Utility Valet (21,000 move-ins × 50% × 2 services) and Make It Home (21,000 × 25%).

**Repo says:** MASTER's Y1 engagement rate is also 35%, producing 21,350 engaged doors. There is no turnover or move-in assumption anywhere in the master model — move-in economics scale off engaged doors, not off lease turns.

**Consequence:** Two independent 35% rates landing on nearly the same absolute number (21,000 vs 21,350) is a trap that will survive review unnoticed. The move-in-triggered addressable base is 61,000 × 35% turnover × 35% engagement ≈ 7,500, not 21,000 — the two rates multiply. Utility Valet and Make It Home are both overstated ~2.8x. Anyone reconciling the two documents will see matching numbers and conclude the models agree.

---

## C16 · Commission basis: "sourced work only" vs. a platform fee on every job

**Design says:** §02: "we never take a commission on work the vendor sold" — Residential referral = No commission, Exchange bid = No commission. Only partner work orders and Scout-posted pieces carry a take.

**Repo says:** MASTER_BUSINESS_MODEL_2026.md stream 3 is "Platform fee on jobs — job value × fee rate, clamped 6–15%" and stream 8 is "Platform fee on homeowner jobs," applied to every completed job. commission-engine-code-audit.md confirms the live engine fires on job completion (routers.ts:2790), FSM webhooks, and the Stripe job-payment webhook with no source/pricing test. ProLnk/server/config/platformFees.ts derives a fee for all 91 services from average ticket size — there is no "who priced it" input anywhere in the fee path.

**Consequence:** Homeowner jobs are exactly the case the design says carries no commission, yet "Platform fees — homeowner jobs" is $24.8M of the $137.2M Year-5 forecast (plus $6.3M renter-paid services). Adopting the design as written deletes ~$31M of Y5 modeled revenue; shipping the repo model as written breaks the design's headline promise on the highest-volume job type.

---

## C17 · 3% and 1.5% are below the engine's hard 6% floor — the design's rates cannot be represented

**Design says:** §02: 3.0% up to $25,000, "1.5% on the portion above" $25,000–$100,000.

**Repo says:** platformFees.ts sets FEE_MIN = 0.06 / FEE_MAX = 0.15 / DEFAULT_FEE = 0.10, and commissionCascadeEngine.ts (L222, L456) applies a true clamp: Math.min(Math.max(rate, 0.06), 0.15). commission-engine-code-audit.md lists the clamp as "Confirmed correct" against the canonical spec.

**Consequence:** A 3% rate passed into the engine is silently clamped up to 6% — double the intended take, with no error surfaced. The 1.5% marginal band is unreachable at any input. Nobody will notice in testing because the clamp is documented as correct behavior; the first symptom is a partner invoice at twice the contracted rate.

---

## C18 · Partner work order: 3% of job value vs. a flat $5–8 per work order

**Design says:** §08 floor table: "Commission — On work we source and price — 3% on partner work orders," charged on the value of CoolSys/AMH/carrier/warranty orders.

**Repo says:** RATES-MEMO.md: "non-subscribers pay $5–$8 per work order (charged to the vendor, netted from payment; final point TBD)." MASTER_BUSINESS_MODEL_2026.md streams 4, 23, 28 model the same event as a flat fee ($5–8, and $3–8 on Exchange), forecast at $11.2M by Y5. PLATFORM_MASTER_AUDIT.md 5.4 is the only build item and it is a flat-fee netting task, marked ❌.

**Consequence:** Two incompatible monetizations of the identical transaction: a $2,000 AMH work order yields $60 under the design and $6 under the repo. The forecast, the AMH term sheet economics, and the dev build item all assume the flat fee. Whichever is wrong, contracts are being drafted from the wrong one right now.

---

## C19 · The design's five pricing components contain no platform fee — which is the entire base the cascade pays from

**Design says:** §02 presents "Five components" as the complete pricing architecture: base membership, seats, coverage, clearances, and commission on sourced work only. No platform fee, no network overrides, no origination residual, no pro keep rate, no retention floor.

**Repo says:** commission-engine-code-audit.md documents the canonical model as L1–L4 overrides of 7/4/2/1% of the platform fee, 5% address-keyed perpetual origination, 12/6/3/1.5% subscription overrides, and a 20% retention floor. PLATFORM_MASTER_AUDIT.md 5.1 requires this cascade at P0; 1.8 calls photo-origination attribution "Premise of the whole pitch"; 1.10 requires the founding network's 60% keep. Code ties keep rate to tier (stripe.ts TIER_PRODUCTS: core 0.40 / pro 0.50 / business 0.60).

**Consequence:** Under the design the cascade base is $0 on residential referrals and Exchange bids and roughly a third to a fifth of today's base on partner work orders. Founding-network income, Scout origination residuals, and photo-origination attribution — all sold to pros as the reason to recruit — would pay out of a fee that no longer exists on most job types. The design does not acknowledge or repeal the cascade; it simply removes its funding.

---

## C20 · Builder origination revenue share — the Builder Edition economic model is inverted relative to the repo

**Design says:** TrustyPro Builder Dashboard Brief defines the builder as the originator of a household that pays for decades, and pays the builder a share of five downstream streams: care plan enrollment (20% of platform margin, $20–25/home/yr), marketplace jobs after warranty ends (15% of platform take, $18–30), partner perks — insurance/warranty/security (20% of activation fees, $12–20), Home Passport transfer at resale (30% of the $99–199 fee, $5–9 amortized), and appliance/systems replacement leads (20% of lead fee, $8–15). Blended origination yield $63–99/home/yr; ~$304k/yr at 3,800 lifetime originated homes. 'Every care plan, marketplace job, partner activation, and eventual Passport transfer at resale carries origination attribution back to the builder who documented that home first.'

**Repo says:** MASTER_BUSINESS_MODEL_2026.md stream #41 is the only builder line: 'Builder warranty portal — digital owner's manual licensing' — money flows builder→TrustyPro, and it is in the 'documented but NOT forecast' bucket. There is no builder revenue share anywhere in the 63 streams, no builder cost-of-revenue line in the P&L (cost of revenue names only operator shares), and no builder origination ledger in PLATFORM_MASTER_AUDIT.md. Audit 8.3/4.6 attribution registry exists only for operator/channel origination. A repo-wide grep for any builder share/origination/residual returns zero hits. builder-edition-design-brief.md contains no economics at all.

**Consequence:** The single argument that sells the builder channel — 'warranty becomes the acquisition cost of an annuity' — has no representation in the business model, no COGS line, and no attribution plumbing. Sign a builder on these terms and there is no ledger to compute what they are owed, and the P&L understates cost of revenue on every downstream stream originated through a builder.

---

## C21 · Home Passport transfer fee at resale ($99–199 per event) — an entire per-transaction revenue stream is missing

**Design says:** Builder Dashboard Brief prices 'Home Passport transfer at resale' at a $99–199 fee with 30% going to the originating builder. TrustyPro v3 SCREEN_GROUPS has two dedicated screens for it: `passportSell` ('Passport · selling') and `passportOnboard` ('Passport · new owner'). The Builder brief also makes the transfer the platform's early-warning signal on a home sale ('TrustyPro knows first — the Passport transfer runs through the platform').

**Repo says:** 'Home Passport' appears in the repo exactly once, in MASTER_AUDIT_REPORT.md line 65, as an unresolved naming question ('Home Health Vault' vs 'Home Passport'). It is not in the 63-stream inventory. The nearest stream, #49 'Premium Vault / records tier — extended storage, transferable home history, document concierge', is a subscription with no per-transfer fee, no price, and no resale event. Neither the renters P0 spec nor PLATFORM_MASTER_AUDIT.md contains a transfer, handoff, or new-owner onboarding flow.

**Consequence:** The only per-event consumer transaction tied to a home sale is unpriced, unbuilt, and unnamed. It is also the trigger for stream #51 (agent referral fees, 25–35% of commission) and #52 (listing-ready reports) — both of which depend on knowing a home is selling, which is exactly what the Passport transfer provides. Losing it strands three streams, not one.

---

## C22 · 'Homes in motion' — originated-address resale feed sold to builders as a new-home lead engine

**Design says:** Builder Dashboard Brief screen 6: 'Originated addresses currently listing or transferring, with Passport transfer status and the outbound owner flagged as a warm lead. Filter by community and by years-since-close.' The brief argues a builder pays $8–15k in marketing per sale, so a list of former customers actively moving 'is worth more than any portal feature,' and notes 'This screen does not exist in any competing product.'

**Repo says:** 'homes in motion' returns zero hits across the entire repo. No listing-detection, resale-signal, or outbound-owner lead product appears in the 63-stream inventory, in PLATFORM_MASTER_AUDIT.md, or in builder-edition-design-brief.md (whose builder dashboard is only three screens: queue, claim detail, analytics). Stream #51 captures the agent-referral side of a move but nothing that sells the move signal back to a builder.

**Consequence:** An unpriced B2B lead product built on the highest-value event in the dataset. Because it is absent from the model, the builder channel is valued only at licensing rates, and the mover signal is monetized once (agent referral) instead of twice (agent referral + builder lead).

---

# MAJOR (42)

## M1 · ProLnk Facility — an entire strategy section with a decision recorded, and no repo artifact at all

**Design says:** §06 is devoted to it: "Decision made: the end client gets an app." Report-a-problem from the floor, asset registry per location, preventive maintenance scheduling, monitoring and alerts, spend and SLA visibility. §07 lists it as a platform (Missing); §09 ranks it #5 and calls it "the highest-ceiling item on the list… what turns us from a vendor tool into the system of record."

**Repo says:** No mention in any of the three repo specs. platform-architecture-personas.md's four codebases have no slot for it — the enterprise console serves the partner (CoolSys), not the partner's customer (the grocery store manager). The commercial end-client is not in the persona list. The closest analogue in the repo, home-health-score-and-nameplate-ocr.md, is residential asset capture. The architecture spec's pitch guidance mentions an optional "end customer's view (resident, homeowner)" — residential only.

**Consequence:** A leadership decision recorded as made has no downstream spec, persona, or data model. The commercial asset registry the strategy calls the moat — "the data we are already collecting on every job" — has no schema owner and no surface that hands it back. It is correctly sequenced last, but nothing downstream of the decision exists to sequence.

---

## M2 · Direct contradiction: TrustyPro as "Separate app" vs one consumer app with two modes

**Design says:** §07's status column for TrustyPro reads literally "Separate app," alongside a seven-interface framing in which each row is its own interface.

**Repo says:** platform-architecture-personas.md §1 is the opposite and argues it explicitly: "Consumer mobile app — ONE app, two modes… A renter who buys a house keeps the app and switches modes. Two apps means re-acquiring that user and losing the home history. This is the renters-become-owners pipeline — do not split it." Mode gating is specified as server-side and test-enforced.

**Consequence:** Not a naming quibble — it determines the number of App Store and Play listings behind the 120-day plan's "Apps in both stores" line, whether one identity carries a user across the renter-to-owner transition, and whether mode gating is an in-app server check or two separate binaries. Store submissions are due Day 70; this has to be settled well before then.

---

## M3 · FieldDoc: called built and cheap to generalize, treated as an unresolved question in the pilot, funded nowhere

**Design says:** §07: ProLnk Field, status "Built as FieldDoc." §09 #4: "Promote FieldDoc to the standard Field app. It is already built for one enterprise customer. Generalizing it is a small job with immediate leverage on every multi-tech vendor."

**Repo says:** platform-architecture-personas.md never names FieldDoc; it folds the technician into the pro app as a role view ("Tech sees: assigned jobs, on-site checklist, photo capture, badge, their own docs"), implying a mode rather than a product to be promoted. 120-day-launch-plan.md has no FieldDoc line item and no generalization task. operator-dashboard-pilot-spec.md §10 leaves it open: "Does the operator's in-house crew get FieldDoc/pro-app access in the pilot, or do completion photos come back through the vendor path only?"

**Consequence:** The one item the strategy calls a small job with immediate leverage is unfunded, and the pilot cannot answer whether its own in-house crews have a field app. Completion photos and final job cost from in-house crews are hard inputs to the operator dashboard's approve→dispatch→complete loop and to its cost-per-work-order metric — if crews have no field surface, two of the seven scoreboard cards have no data path.

---

## M4 · Inviter-first onboarding rebuild (§09 #3) has no counterpart in the 120-day plan, and the repo's attribution registry solves a different problem

**Design says:** §09 #3: rebuild onboarding inviter-first — "Cheap to change, and it unlocks the pricing model in section 02." §08: ask who invited them and headcount before anything else, because the inviter pre-loads the partner rate, work scope, and pre-approved clearances. Company size then routes the account to Business OS or Field (gate 2 of the five gates).

**Repo says:** 120-day-launch-plan.md scopes the pro side as "onboarding, verification, job lifecycle, commission engine, payouts" with no rebuild task, and the vendor program as "intake v2, $99–$249 subscriptions, $5–8 per-work-order fee, no free tier" — a flat ladder, not the strategy's five-component architecture (base membership by scope / seats and ProPasses / coverage packs / clearances / commission on sourced work only). The plan's attribution registry is "address → origination source, permanent" — job-origination attribution, not vendor-inviter attribution.

**Consequence:** Onboarding will be rebuilt once and ship without the two questions (who invited you, how many people work there) that the strategy says determine price, defaults, and which app the account lands in. The registry that exists at Day 120 cannot answer "which partner brought this vendor," so partner-set pricing and gate 2 routing have no data to run on and require a second onboarding rebuild post-launch.

---

## M5 · AMH's real 61,000-door portfolio used as the basis for unqualified revenue projections

**Design says:** Coolsyn Resident App Brief: "a property-management company (modeled as American Homes 4 Rent, a 61,000-door single-family-rental operator)"; org table row "Single-family rental (AMH-style)"; and the economics table column header "At 61k doors (AMH-scale)" with figures including "~$988k/yr gross", "~$1.37M/yr gross", and "~$305k/yr".

**Repo says:** The TrustyPro Builder Dashboard Brief shows the team knows how to caveat this: "Numbers below are directional planning estimates for the design to display — replace with real terms once partner agreements are signed." The Coolsyn brief has no such qualifier on its economics table. American Homes 4 Rent is a real NYSE-listed REIT and AMH is its registered mark; 61,000 doors is its actual approximate portfolio scale, not an invented figure.

**Consequence:** Building a revenue model on a named real company's actual operating scale, in a document with no projection disclaimer and no confidentiality legend, reads to any recipient as a modeled deal rather than a hypothetical. Given the executed investment agreements sitting in the same directory, an unqualified projection tied to a named counterparty that has not signed is Rule 10b-5 and Securities Act §17(a) exposure — and private issuers get no PSLRA forward-looking safe harbor. Rename the archetype ("a 60,000-door SFR operator") and port over the builder brief's disclaimer verbatim.

---

## M6 · "Homes in motion" resells homeowner move signals as builder leads, contradicting the privacy promise in the sibling app

**Design says:** TrustyPro Builder Dashboard Brief, Screen 6 and the revenue argument: "The dashboard should surface a \"homes in motion\" feed: originated addresses currently listing, with the outbound owner flagged as a warm lead for the builder's current communities. A builder pays $8–15k in marketing per sale; a list of former customers actively moving is worth more than any portal feature." Plus "Home Passport transfer at resale | 30% of the $99–199 fee".

**Repo says:** The Coolsyn Resident App Brief promises the opposite to the end user, in copy the same document set marks as load-bearing and non-negotiable: "privacy line: '[PM] never sees your personal data'" and "Your Shield records remain yours forever". No consent, notice, or opt-out mechanism for lead resale appears in either document.

**Consequence:** Three separate exposures on one screen. Receiving consideration for delivering identified home-seller prospects to a builder can constitute unlicensed real estate brokerage or an unlawful referral fee in most states (e.g., Tex. Occ. Code §1101.351). If the builder's affiliated mortgage or title arm touches the transaction — and ProLnk Media sells to "title companies, mortgage lenders" — RESPA §8(a) prohibits the fee outright, with criminal penalties and treble damages. And repurposing a Passport-transfer signal into a marketing lead is a "sale" or "share" of personal information under CCPA/CPRA and the Texas TDPSA, requiring notice at collection and an opt-out that does not exist here. The direct contradiction with the resident-facing privacy line is what turns a compliance gap into a deception claim.

---

## M7 · Virtual Badge identity matching and technician fingerprinting described with no biometric or FCRA adverse-action caveat

**Design says:** ProLnk Platform Strategy, Differentiator 02: "Identity verified at the door. The Virtual Badge proves the licensed professional is the person standing there." §02: "Clearances — priced per screening. Fingerprinting, bonding, and federal registration cost real money." §08: "a ProPass invite texted to every technician so they complete their own screening and badge photo" and "Background check | Per person, annually".

**Repo says:** No consent flow, written-release step, disclosure screen, or adverse-action path appears anywhere in the onboarding sequence, which is otherwise specified step by step.

**Consequence:** "Proves the person standing there" plus a stored badge photo describes face matching, and fingerprinting is unambiguously biometric. Illinois BIPA requires written release before collection and carries $1,000/$5,000 per-violation statutory damages with a private right of action — applied per technician, that scales into the millions and is the most-litigated privacy statute in the country. Texas CUBI applies in your primary market. Separately, using consumer-report background checks to gate a person's access to work triggers FCRA §604(b) standalone disclosure and authorization, plus the pre-adverse-action notice and copy-of-report sequence under §1681b(b)(3) before any technician is denied a badge. None of that is built into the flow as specified.

---

## M8 · Absolute, perpetual consumer promises frozen as non-editable copy

**Design says:** Coolsyn Resident App Brief, Screen 2: "the trust line — 'Neither you nor your property manager can edit these after today.' That immutability line is the product." Screen 7: "'Your Shield records remain yours forever — [PM] can't remove them, and neither can we.'" Design direction: "Trust microcopy is load-bearing: immutability of Shield records, 'late payments never reported,' 'billed by the provider,' '[PM] never sees your personal data.' These lines close the loop on every mechanic — keep them verbatim or improve them, never drop them."

**Repo says:** These are stated as absolute and permanent with no qualifier, and the brief specifically forbids removing them.

**Consequence:** "Neither you nor we can remove them" and "yours forever" are promises the company cannot legally keep. CCPA/CPRA §1798.105 and equivalent state deletion rights compel erasure on request; a litigation hold, subpoena, or preservation order compels alteration of access; and no company can bind itself past its own wind-down. Each is an enforceable express warranty in consumer UI, and the gap between promise and legal reality is a straightforward UDAP claim. There is also a second-order problem: the app is positioned as manufacturing evidence in landlord-tenant deposit disputes ("Protect your deposit") without disclaiming that the record is not a legal determination of liability. Qualify with "we do not permit edits after submission" and add a records-retention and legal-process caveat.

---

## M9 · Unsubstantiated category-wide superiority and novelty claims

**Design says:** ProLnk Platform Strategy, Differentiator 02: "Nobody else in the category has this." Differentiator 01: "Every competitor in the category monetizes the opposite way." TrustyPro Builder Dashboard Brief, Screen 6: "This screen does not exist in any competing product."

**Repo says:** No competitive analysis, clearance search, or substantiation file is referenced anywhere in the four documents.

**Consequence:** Absolute superiority claims about competitors require prior substantiation under FTC doctrine and expose you to a Lanham Act §43(a)(1)(B) false-advertising suit brought by any competitor — competitors do not need consumer harm to sue, and injunctions issue fast. There is a second, less obvious cost: project_patent.md notes the ground-level-imagery limitation was drafted around Cape Analytics prior art, meaning the art in this space is crowded. A written company assertion that "nobody else in the category has this" can be used as an admission about the state of the art during prosecution or in an IPR, and cuts against you if it turns out to be wrong. Soften to "we are not aware of a competitor offering this" and keep a dated substantiation file.

---

## M10 · Six product names in use with no evidence of trademark clearance, two with identifiable conflicts

**Design says:** Coolsyn Resident App Brief: "Guardian cards + seasonal quest", "Guardian alerts", "hard-freeze warning", alongside the monetized module "Smart home / security | $75–150 per activation"; "Deposit Shield: ACTIVE"; "Move-In Shield". ProLnk Platform Strategy: "ProLnk Field | ... | Built as FieldDoc" and "Promote FieldDoc to the standard Field app"; "ProPass"; "Scout / agent / inspector". TrustyPro Builder Dashboard Brief: "Home Passport transfer at resale".

**Repo says:** business_brands.md lists the six sanctioned brands as ProLnk, ProLnk Exchange, TrustyPro, TrustyPro Commercial, ProLnk Media, and LNKD. None of Guardian, FieldDoc, ProPass, Move-In Shield, Deposit Shield, Home Passport, or Scout appears in that list, and no clearance search is referenced for any of them.

**Consequence:** Two are concrete rather than speculative. "Guardian" attached to home security and smart-home alerts sits directly on top of Guardian Protection Services, an operating residential security company in the identical service class — the highest-risk name in the set after Coolsyn. "FieldDoc" is an existing named software product. "Deposit Shield" and "Home Passport" are the kind of descriptive-suggestive marks that are heavily occupied in proptech and insurance. Each is cheap to clear now and expensive to rebrand after it is compiled into an app, an app store listing, and partner collateral. Run a knockout search on all seven before the build session starts.

---

## M11 · Residents enrolled without affirmative signup are then texted, with a forced-exposure gate on monetized modules

**Design says:** Coolsyn Resident App Brief, Screen 1: "No account creation friction — the account is pre-provisioned by the PM." Screen 4: "Skip pattern matters: users cannot skip from the checklist — each service screen offers 'Already set up' / 'Don't need this' only after showing the options." And: "we'll text you before each install." ProLnk Platform Strategy §08: "a ProPass invite texted to every technician".

**Repo says:** No consent capture, notice at collection, or messaging opt-in step appears in the onboarding sequence, which is otherwise specified screen by screen.

**Consequence:** Texting a resident who never affirmatively signed up — their landlord provisioned the account — is TCPA exposure at $500 per message, trebled to $1,500 for willful violations, with a private right of action and no cap. Across a 61,000-door portfolio that is a class action, not a nuisance. The forced-exposure gate compounds it: requiring a captive audience of renters to view insurance and credit-product offers before they can decline is the pattern the FTC has pursued as a dark pattern in the ROSCA and Epic Games matters, and it is aggravated here because the offers are monetized and the user was enrolled by their landlord rather than by choice. Add an express written consent step for messaging and let users decline a service from the checklist itself.

---

## M12 · The Utility Valet / Patrick channel is absent from the entire waterfall, though the memo puts AMH inside it

**Design says:** Renters insurance and Utility Valet are modeled as clean two-party splits — $692k and $955k to TrustyPro at 70%, $296k and $410k to AMH at 30%. No channel partner, override, or insurance carrier appears in either stream.

**Repo says:** RATES-MEMO.md: "Patrick / Utility Valet: L1 structure per existing term sheet — 5% of platform fee on channel-originated homes, 7% on channel-originated pros' jobs, no subscription share. AMH is within Patrick's channel. Renters insurance is fulfilled via Utility Valet's existing insurance partner."

**Consequence:** A third party with a contractual claim on every AMH-originated dollar is missing from the model. Because AMH sits inside Patrick's channel, the 5%/7% override applies across the account, not just to the utility line — so every 'TrustyPro (70%)' figure in the document is overstated. And renters insurance, the stream labeled 'Largest near-term,' is fulfilled through someone else's carrier relationship, meaning TrustyPro is not keeping 70% of $988k.

---

## M13 · Data licensing takes a flat 30% where the memo and MSA specify a tiered share with 30% as the ceiling

**Design says:** "Conservative aggregate for one 61k-door portfolio: $300k–1.5M/yr, with AMH taking 30%." The summary table applies it flat: $800k gross, $240k to AMH, $560k to TrustyPro.

**Repo says:** RATES-MEMO.md: "Data licensing: tiered UP TO a 30% ceiling on qualified records (tier by documentation completeness; 30% = max, Andrew Aug 2026)." operator-msa.md §4.2: "The data-licensing share applies per Qualified Record on a tiered basis: Tier 1 ([0]–[N1] Qualified Records): [RATE]%; Tier 2: [RATE]%; Tier 3: [RATE]%."

**Consequence:** The HTML uses the negotiating ceiling as the base case and drops the documentation-completeness gate that makes the tier ladder work. It also concedes 30% before AMH asks — the memo's whole design is that the operator earns its way up the ladder by delivering complete records. Presenting a flat 30% forfeits that lever, and it does so in the stream the document itself flags as the one AMH will fight over on ownership grounds.

---

## M14 · Data licensing is sized below the master model's own per-record floor, and booked in a year the master model shows as zero

**Design says:** $300k–1.5M/yr for a 61,000-door portfolio, mid-case $800k — equivalent to $4.92–$24.59 per door per year. Presented as a running-rate stream in the same year as the other five.

**Repo says:** MASTER stream 36: "Tier 1 — record licensing ($20–40 per qualified home/yr)," which is $1.22M–$2.44M across 61,000 doors. The Y1 forecast column for data licensing is "—" (zero), with $0.5M first appearing in Y2. MASTER line 289 gates it: "Consent chain + 100K qualified records" is the milestone that "Unlocks Data Tier 1 revenue."

**Consequence:** Two contradictions pulling opposite directions. The HTML's mid-case is below the bottom of the master model's own Tier 1 range and its top end barely reaches it, so the stream is undersized on a per-record basis. Simultaneously it is booked a full year early, against a 100K-record milestone that 61,000 doors cannot reach alone. AMH will be shown a number the master forecast says is zero.

---

## M15 · Vendor subscriptions — the first-listed revenue stream of the operator program — do not appear in the HTML at all

**Design says:** Six streams are modeled (insurance, utility, rent reporting, security, furnishings, data) plus the maintenance marketplace. There is no vendor-side monetization anywhere in the document.

**Repo says:** RATES-MEMO.md leads with it: "Operator-program vendor subscriptions: $99–$249/mo ladder... Vendors working exclusively with the anchor operator (AMH): minimum $99/mo," and scopes AMH's 30% to "their vendors' subscriptions and net affiliate/commerce commissions." MASTER stream 22 is "Operator-program vendor subscriptions — $99 / $149 / $249 per month." operator-msa.md §4.1's first share row is "Vendor subscriptions attributable to Operator-invited Vendors."

**Consequence:** The stream that all three repo documents put first in the operator program is missing from the operator-facing model. It is also the stream that makes the maintenance line coherent: the repo monetizes AMH's vendor network through subscriptions plus per-order fees on non-subscribers, which is why there is no percentage-of-spend fee. Omitting it leaves the HTML with a gap it fills using the 3%-of-spend mechanic that contradicts the memo.

---

## M16 · Per-door yield to TrustyPro exceeds the top of the master model's stated range, and is computed on contracted rather than engaged doors

**Design says:** "Per door, TrustyPro nets ≈$74/yr" ($4.48M ÷ 61,000), alongside "≈$31 per door per year of new income to AMH" ($1.92M ÷ 61,000).

**Repo says:** MASTER unit economics table, line 136: "Per rental door | ~$35–70/yr net | After 30% operator share."

**Consequence:** $74 sits above the ceiling of the master model's own range for the same metric on the same basis (net of the 30% share). The gap is much wider than it looks, because the master model's $35–70 is a mature figure while the HTML's $74 is claimed in year one against contracted doors with no engagement ramp — roughly $15/contracted door on the master model's Y1 assumptions. Both per-door numbers in the closing callout, the ones the document says close the deal, fail against the repo.

---

## M17 · The HTML's single-account net to TrustyPro ($4.5M) exceeds the master model's entire Y1 company revenue ($3.7M)

**Design says:** "one 61,000-door partner represents roughly $6.4M/yr gross, with ~$1.9M/yr flowing to AMH and ~$4.5M/yr to TrustyPro."

**Repo says:** MASTER's Y1 total revenue across all five product lines is $3.7M — including $0.9M of TrustyPro Exchange commercial revenue and $0.7M of homeowner platform fees that have nothing to do with AMH. AMH is 61,000 of 61,000 Y1 contracted doors, i.e. the entire Y1 rental base, and the rental-attributable Y1 lines total roughly $1.0M gross.

**Consequence:** One account is claimed to produce more than the whole company earns in the year that account represents 100% of the rental book — a ~4.5x gap on gross. Two internal contradictions in the master model make this harder to adjudicate and should be resolved before either number is shown externally: line 242's sensitivity table gives base-case Y1 revenue as $7.0M against the forecast table's $3.7M, and line 277 calls AMH "~40% of near-term rental revenue" when it is the only operator in Y1.

---

## M18 · Renters insurance plus Utility Valet net 8x the master model's line for exactly those two streams

**Design says:** Renters insurance $692k to TrustyPro and Utility Valet $955k — $1.65M net from the two move-in streams on 61,000 doors.

**Repo says:** MASTER's Y1 forecast line is literally scoped to these two: "Move-in economics (utility, renters insurance) | 0.2" — $0.2M. Even crediting the entire adjacent "Insurance / warranty / financing referrals" line ($0.3M, which also carries homeowner and commercial referrals) the ceiling is $0.5M.

**Consequence:** $1.65M vs $0.2M is 8.2x, or 3.3x on the most generous reading. Same two streams, same 61,000 doors, same year, same document set. This is the cleanest like-for-like comparison available between the two models and it does not reconcile.

---

## M19 · "30% of net revenue" in the prose, 30% of gross in every table

**Design says:** The structure section states the manager "takes 30% of net revenue generated by their residents." Every table then computes on gross: $988,200 gross → $296k to AMH (30.0% of gross); $1.37M → $410k; $800k → $240k.

**Repo says:** RATES-MEMO.md scopes the share to "net affiliate/commerce commissions." MASTER stream 24 is "Net commerce share after operator revenue share." operator-msa.md §4.1 defines the base precisely: "amounts actually received and retained by Platform (net of refunds, chargebacks, taxes, and payment-processing costs)," and each row's base column reads "Net subscription revenue" / "Net platform revenue" / "Net data-licensing revenue."

**Consequence:** The document says net and computes gross, so it is internally inconsistent and it overstates AMH's take against the contract base in the MSA. On insurance the difference compounds with the missing Utility Valet channel override — if 'net' correctly means after the 5% channel fee, carrier costs, chargebacks and processing, AMH's actual 30% is materially below $296k. A partner shown gross-based numbers and later paid net-based ones is a predictable dispute, and MSA §12.1 gives AMH audit rights to find it.

---

## M20 · Job-size step-down tiers and per-partner rate overrides exist nowhere in the repo

**Design says:** §02: a tiered rate table (3.0% / 1.5% marginal / negotiated above $100,000) plus "Rate should vary by partner as deals dictate."

**Repo says:** No job-size tiering in any repo file. platformFees.ts sets the rate by service type only (inversely to average ticket), with admin overrides in an `industryRates` table keyed by industry — not by partner or job size. commission-engine-code-audit.md F5 notes the FSM path hardcodes 0.10 for every completed job regardless of trade.

**Consequence:** The $50,000 rack rebuild the design uses as its worked example bills $1,125 under the tiered design and $3,000–$7,500 under the repo (6–15%, $5,000 at the 10% default). That is 3–7× the intended take on exactly the job size the design says triggers vendors to go off-platform — the defection risk the tier table was written to remove is currently unmitigated in code.

---

## M21 · Zeroing the residential platform fee zeroes the Patrick / Utility Valet channel term sheet

**Design says:** §02: residential referrals carry no commission because the vendor quotes the homeowner at their own price.

**Repo says:** RATES-MEMO.md: "Patrick / Utility Valet: L1 structure per existing term sheet — 5% of platform fee on channel-originated homes, 7% on channel-originated pros' jobs." PLATFORM_MASTER_AUDIT.md 5.6 makes this a P1 ledger build. commission-engine-code-audit.md F7/V9 confirms it is unbuilt.

**Consequence:** Both legs of the channel's compensation are percentages of a platform fee that the design eliminates on residential work — the channel's entire volume. Counsel is filling contract placeholders from RATES-MEMO against a base the strategy doc has already removed; the term sheet would compute to $0 and the discrepancy would surface after signature.

---

## M22 · ProPass seat count: every technician vs. every additional technician

**Design says:** §08: "Seat + ProPass — Per field technician — $20/mo each," worked as "A four-technician shop: $99 base, $80 in seats" — i.e. 4 × $20, no seat included in the base.

**Repo says:** MASTER_BUSINESS_MODEL_2026.md: "Each additional ProPass inside that firm is +$20/month… a 6-tech firm pays ~$149 + (5 × $20) = $249/month" — the first seat is bundled into the base.

**Consequence:** A 4-tech shop is $179/mo under the design and $159/mo under the forecast. Applied across the modeled ~10,125 firms at ~4 techs average, the design's seat convention overstates the "Firm subscriptions + ProPass seats" line (Y5 $17.8M) by roughly 25% of its seat component — and sales would quote a price billing cannot produce.

---

## M23 · The $20 ProPass seat price is absent from the counsel rates memo and from code

**Design says:** §08 makes $20/mo per field technician a headline floor-price line item, and §08 onboarding requires "seats auto-calculated from the employee count."

**Repo says:** RATES-MEMO.md — the document explicitly written to fill contract placeholders — lists only the $99–$249 ladder, the $99 AMH-exclusive minimum, and the $5–8 per-work-order fee. No seat price. Code has no seat SKU either: stripe.ts TIER_PRODUCTS contains only core/pro/business/enterprise monthly products, and a repo-wide search for per-seat pricing returns nothing.

**Consequence:** Vendor agreements drafted from RATES-MEMO will have no per-seat rate, so a firm adding its fifth technician has no contractual basis for the charge — and no Stripe product to bill it against. The seat line is the second-largest subscription revenue component in the forecast.

---

## M24 · The pricing floor: "$99 base for everyone" vs. a $0/mo non-subscriber path

**Design says:** §08: "There is no free tier… A contractor who wants ProLnk purely to stay a CoolSys vendor — no marketplace, no residential, no Exchange — still pays" $99/mo base plus $20/seat.

**Repo says:** RATES-MEMO.md: "No free tier; non-subscribers pay $5–$8 per work order." MASTER_BUSINESS_MODEL_2026.md: "Roughly 30% of firms stay on the per-work-order model instead of subscribing." PLATFORM_MASTER_AUDIT.md 1.4 records this as DECIDED Aug 2026 with "DEV to implement both billing paths."

**Consequence:** Both documents claim "no free tier" while describing different floors: $119+/mo versus $0/mo plus usage. The design silently deletes a billing path that is already a decided requirement handed to dev and that carries ~30% of the modeled firm base. The per-work-order band is also internally inconsistent in the repo ($5–8 for operator programs, $3–8 for Exchange).

---

## M25 · Background check markup: at cost, with margin, or a revenue stream

**Design says:** The doc contradicts itself. §02 component 4: "Pass those through with margin rather than absorbing them into the seat price." §08: "Background checks are passed through at cost, itemized. Marking up a screening the vendor can price-check in thirty seconds trades a few dollars for the trust the whole platform runs on."

**Repo says:** MASTER_BUSINESS_MODEL_2026.md lists credential verification as revenue stream 5 ("background checks and license/COI monitoring") and stream 31 ("Credential verification — per-vendor annual") — both revenue, which implies margin. PLATFORM_MASTER_AUDIT.md 1.5 says only "background check (Checkr acct + billing to pro)" with no markup policy. RATES-MEMO.md has no background-check line at all.

**Consequence:** Three different policies across two documents, and the one place it matters — the memo counsel drafts vendor terms from — is silent. "At cost, itemized" is a contractual commitment that becomes a misrepresentation if billing applies any margin, and it removes streams 5 and 31 from the revenue inventory.

---

## M26 · Base membership priced by scope vs. a feature-tier ladder that gates commercial behind the top tier

**Design says:** §02: "Base membership — priced by scope: which lanes of work reach you: residential, commercial, or both," sold as "separate products a vendor can buy either or both of," with commercial carrying the higher price. §08 calls scope "the pricing fork."

**Repo says:** RATES-MEMO.md describes the $99–$249 ladder as "the same tier structure as existing pro plans, chosen by what the vendor wants to do," with homeowner-side Core/Pro/Business "UNCHANGED." In code the ladder is a feature tier, not a scope: ProLnk/server/support-knowledge.ts:52 — "Business $249/mo (keep 60%, unlocks commercial jobs…)" — and keep rate is bound to tier (0.40/0.50/0.60). Commercial vendor subs in Exchange (stream 29) use the same $99–249 ladder as residential.

**Consequence:** There is no commercial-only SKU: a vendor who wants commercial lanes must buy the top tier, which also bundles residential and a 60% keep rate. The design's scope fork also has no counterpart in PLATFORM_MASTER_AUDIT 1.3, where residential/commercial is captured as intake data (and as "rental/residential/both", a different taxonomy), not as a price dimension.

---

## M27 · Lapsed subscription: design says it gates priority only; code zeroes commission income

**Design says:** §07 gate 5: "Subscription gates priority, never access. A lapsed partner subscription loses first-look routing. It does not lock the vendor out of the marketplace — punishing a paying customer's whole livelihood over one failed card is how churn becomes permanent."

**Repo says:** ProLnk/server/routers/network.ts (~L350) skips any upline whose subscription lapsed — `if (!upline.subscription_active) continue;` — plus a minimum-jobs-per-month activity gate. commission-engine-code-audit.md F1 flags both as "subscription-active + minimum-jobs gates not in spec (L350–358)" on a live adminProcedure that writes to the payout table. No repo file defines any lapse, dunning, or downgrade behavior.

**Consequence:** A failed card stops the vendor's network and override earnings entirely, not just their routing priority — the exact punitive outcome the design forbids, on a code path that is one admin trigger from writing real money. The audit's fix list schedules that router for deletion, but the replacement engine has no lapse policy at all, so the behavior is currently undefined rather than corrected.

---

## M28 · "Convert, don't cancel" — the verified-no-priority tier and its billing rules do not exist

**Design says:** §08: when a partner drops a vendor, "move them automatically to a verified-no-priority tier, keep every ProPass and clearance alive," re-rate automatically at the next cycle, "Prorate, do not refund," notify the same day, and grant "Thirty days of full marketplace access at the partner-exclusive price."

**Repo says:** No such tier appears in RATES-MEMO.md, in the $99/$149/$249 ladder, or in stripe.ts TIER_PRODUCTS. PLATFORM_MASTER_AUDIT.md has no line item for tier transitions, proration, or dunning — 5.9 covers only "Refunds/disputes/chargeback flow + reserve policy" (❌).

**Consequence:** Five distinct billing rules (auto re-rate, proration policy, grace-window pricing, credential persistence, notification timing) with no SKU, no build item, and no contract language. Since the AMH program is the anchor, the first vendor a partner drops hits an undefined billing path — most likely a hard cancellation, which is the outcome the design is written to prevent.

---

## M29 · Payment rail: retain-at-settlement with same-day transfer vs. accrue-then-pay-out monthly

**Design says:** §02: "Sit in the middle of the money. The partner pays ProLnk. We retain the commission automatically and transfer the remainder to the vendor's connected account, same day" — a connected-accounts split where "our percentage is retained at settlement." It explicitly rejects detect-and-extract as "collections, not payments."

**Repo says:** commission-engine-code-audit.md describes an accrual model: the engine writes rows to `commission_payout` that a separate "disburse rail" pays later. PLATFORM_MASTER_AUDIT.md 5.7 is "Monthly payout runs, minimum rollover, clawback handling"; 5.3 is an escrow hold released on completion; 5.2 is still 🔶 undecided on the processor and is weighing "pros-as-merchant-of-record (fee-only processing protects margin)" — the opposite architecture, where the money never lands in the platform account.

**Consequence:** The design's model has nothing to claw back and no payout run; the repo's has monthly runs, minimum rollovers, and clawbacks as P1 requirements. These cannot both be built. The MOR question in 5.2 is the fork — deciding it as "pro is MOR" makes retain-at-settlement impossible, and that decision is currently listed as open with three demos unscheduled.

---

## M30 · Appliance & systems replacement lead fees

**Design says:** Builder Dashboard Brief lists 'Appliance & systems replacement leads' as its own origination revenue line, 20% of lead fee to the builder, $8–15/home/yr. The mechanic is implied by the documented systems registry plus install dates: a documented asset reaching end of life becomes a sellable replacement lead.

**Repo says:** No replacement-lead stream exists in the 63-stream inventory. #9 'Affiliate commerce — furniture, appliances, décor' is a commission on a completed purchase, and #50 'Recall monitoring service' is a safety subscription — neither is a lead fee paid by a manufacturer or retailer for an age-triggered replacement prospect. PLATFORM_MASTER_AUDIT.md 2.9 builds the nameplate registry but attaches no downstream lead product to it.

**Consequence:** The nameplate/asset registry (audit 2.9, called a 'cornerstone for capex + recall products') has no revenue mechanic booked against its highest-intent output. Replacement leads are typically higher yield per event than affiliate commission and are the natural monetization of install-date data the builder hands over for free.

---

## M31 · Origination P&L screen — warranty-spend vs origination-revenue crossover and cohort-by-close-year table

**Design says:** Builder Dashboard Brief screen 1, the home screen and 'the reframe': warranty spend and origination revenue on one timeline with the crossover point marked, plus a cohort table by close year showing homes originated, warranty cost to date, origination revenue to date, net position, and lifetime revenue projection. 'A cohort from 2019 should be visibly, permanently profitable — that is the moment the argument lands.' Named 'the single most important graphic in the product.' Benchmark: warranty spend ~$18–22/home/month during coverage vs $63–99/home/yr of origination revenue that never stops.

**Repo says:** builder-edition-design-brief.md Surface 2 specifies three desktop screens — warranty queue, claim detail, warranty analytics (defect trends) — and no P&L, no cohort view, no crossover chart, and explicitly 'No prices anywhere in the warranty flow.' No cohort-by-close-year construct appears in MASTER_BUSINESS_MODEL_2026.md's builder treatment.

**Consequence:** The dashboard as specced in the repo is the ticketing system the design brief says every competitor already sells and nobody loves. Without the P&L screen the builder sees only cost, which undercuts renewal on stream #41 and makes the origination share (Finding 1) invisible to the party being paid it.

---

## M32 · Care plan price conflicts three ways across designs and model

**Design says:** Builder Dashboard Brief prices care plan enrollment at $399/yr and derives the builder's $20–25/home/yr from 20% of the platform margin on that price. The TrustyPro v3 prototype's own Care plan screen (`plans` in SCREEN_GROUPS, implemented in tp3-more.jsx) offers $19/mo or $199/yr ('save $29').

**Repo says:** MASTER_BUSINESS_MODEL_2026.md stream #48 prices the homeowner maintenance plan at $15–30/month, calls it 'the largest missing stream,' models 250,000 homes × 20% attach ≈ $12M/yr, and places it in the 'documented but NOT forecast' bucket. No repo document contains '$399' or 'care plan'.

**Consequence:** Three prices for one product, and the builder origination math depends on the highest of them. At $199/yr the builder's care-plan line drops from $20–25 to roughly $10–12/home/yr, which pulls the blended origination yield below the $63 floor and weakens the crossover argument. Pick one price before either the builder brief or the model is shown externally.

---

## M33 · Trade & vendor scorecards and chargeback-to-subcontractor

**Design says:** Builder Dashboard Brief screen 4: per-subcontractor claims per home installed, average cost per claim, repeat-visit rate, days to close, and chargebacks issued — ranked and filterable by community and construction quarter. Called 'the screen that makes a VP renew — it converts anecdote into a number they can take into a bid negotiation.' Screen 3 (claim detail) adds chargeback-to-sub as an action alongside cost estimate vs actual.

**Repo says:** builder-edition-design-brief.md Screen B allows assigning a claim to the original trade sub but has no scorecard, no per-sub metrics, and no chargeback action. 'vendor scorecard' returns zero repo hits. 'Chargeback' in PLATFORM_MASTER_AUDIT.md 5.9 and stream #47 means payment-dispute chargebacks — a different mechanic entirely (card disputes, not warranty cost recovery from a subcontractor).

**Consequence:** The named retention driver for the builder relationship is unbuilt, and chargeback-to-sub is a money-movement flow with no ledger, no accounting treatment, and no place in the commission engine (audit 5.1 handles pro cascade and operator shares only). Cost recovery from subs is real cash the builder expects the product to move.

---

## M34 · Defect intelligence — cluster detection by community, vintage, plan type, and vendor lot with dollar exposure

**Design says:** Builder Dashboard Brief screen 5: 'the pattern engine, expanded from the prototype's vendor-lot alert. Cluster detection across community, vintage, plan type, and vendor lot — each with estimated dollar exposure and an affected-homes list.' Includes a plan-level view: 'Plan 2840-B generates 2.1× the drywall claims of Plan 2620-A' — described as 'a design-department insight worth real money.'

**Repo says:** builder-edition-design-brief.md Screen C is warranty analytics with charts and one static callout card ('Door hardware failures 3.2× above baseline in Willow Creek — vendor lot #4471'). No plan-type dimension, no dollar-exposure model, no affected-homes list. 'defect intelligence' returns zero repo hits. The same component-failure asset is sold in the data tiers (#36–40) but builder-side defect clustering is never named as an input or an output.

**Consequence:** The builder's own defect data is the cleanest failure-curve dataset the platform can get (known install date, known lot, known plan) and it currently has no product surface and no line into the data-licensing streams. Plan-level clustering is also the insight most likely to be sold to a builder's design department as a separate seat.

---

## M35 · Sales center kit — co-branded marketing exports for the builder's sales VP

**Design says:** Builder Dashboard Brief screen 7: co-branded exports comprising a sample Home Passport, community documentation stats, a model-home QR, and a one-page buyer explainer, 'everything shareable, everything carrying both logos.' Framed as the argument that documented homes sell better and 'belongs in their sales center, not buried in a settings page' — 'turns the dashboard into something the sales VP asks for.'

**Repo says:** 'sales center' returns zero repo hits. builder-edition-design-brief.md has no marketing/export surface. deliverables/kits/ contains a vendor-recruiting kit and a resident-adoption kit (audit 10.2/10.3) but no builder sales-center kit. Not represented in stream #41 or anywhere else.

**Consequence:** This is the builder channel's acquisition loop — new buyers enter the platform through the model home QR before they close — and it is also what moves the account from the warranty department (a cost center that renews grudgingly) to the sales VP (a budget holder). Its absence means the builder channel has distribution but no funnel.

---

## M36 · Coolsyn — a standalone white-label resident product sold to property managers generally, and a name collision with CoolSys

**Design says:** The Coolsyn Resident App Brief extracts the entire enterprise-resident side of the TrustyPro prototype 'as a standalone commercial application' under a new brand: 'white-label resident software sold to property managers. The PM issues it; the resident uses it free.' Revenue from partner streams with 30% back to the PM. It is a product with its own identity, its own design language, and its own buyer.

**Repo says:** 'Coolsyn' returns zero hits repo-wide. MASTER_BUSINESS_MODEL_2026.md defines exactly five product lines and states 'One platform... sold to five different customers'; the resident experience appears only as 'TrustyPro Renters' delivered through anchor operators. The only PM-license stream is #25, 'Per-door license — future non-anchor operators, ~$2/door/month', which is in the not-forecast bucket. Separately, 'CoolSys' is the named commercial HVAC anchor for TrustyPro Exchange across eight repo documents (coolsys-deal-economics.md, coolsys-opportunity.md, PROMPT_D_COOLSYS_COMMERCIAL.md).

**Consequence:** A sixth product line and second brand exists in design with no line in the business model, no forecast, and no place in the five-engine narrative. The near-homophone with CoolSys — an actual named commercial partner in the same company's deal pipeline — will cause confusion in diligence and is a trademark problem worth resolving before either name is used externally.

---

## M37 · Org-type module gating as a productized config layer (4+ org types, 'seven contracts, one app')

**Design says:** Coolsyn brief calls this 'the core mechanic': every resident experience is issued by an ORG whose TYPE decides which modules unlock, what the user is called, and what the moving-in checklist contains — 'Build this as a config object, not as forks.' Four types are tabled: single-family rental (everything on), multifamily (Guardian off, no water/sewer), boutique PM (shop and rent-credit off, PM's own vendor list), corporate housing/relocation (user word becomes 'Guest'; commerce, credit reporting, Guardian all off). Each org carries name, short code, brand color + tint, unit address, module flags. TrustyPro v3 JOURNEYS goes further: `resOrg` — 'Compare org types · Seven contracts, one app' — and SCREEN_GROUPS includes an `orgGating` screen. The brief also asks for a visible 'Compare org types' demo screen with a live ON/GATED module matrix: 'that's the sales demo.'

**Repo says:** renters-p0-build-spec.md is single-operator SFR throughout; its glossary defines Org as 'operator tenant record' with branding but no type, and grep for org_type/multifamily/boutique/corporate housing returns nothing. R-3.2.8 provides server-driven tab config per org + residency state — the plumbing exists — but there is no type taxonomy, no user-word switching, and no module-flag matrix. APP_ENTERPRISE_GATING_SPEC.md (outside the four named docs) lists verticals descriptively but not as shipped config, and no repo doc contains the comparison-matrix demo screen.

**Consequence:** Without the type layer, operator #2 through #7 each require a fork or a bespoke config, which is precisely the 'five codebases is the failure mode' risk the business model names in §8. It also removes the demo asset the brief says is the moment enterprise buyers understand the product.

---

## M38 · 30% operator/PM share paid partner-direct under a three-party agreement — off the platform P&L

**Design says:** Coolsyn brief: revenue comes from partner streams 'with a 30% rev-share back to the PM — paid partner-direct so it never touches the platform's P&L.' The corroborating AMH Partnership Model doc adds the reasoning: 'Paying partner → manager directly (rather than TrustyPro collecting and remitting) keeps the share off TrustyPro's P&L as a cost of revenue, and the manager doesn't depend on TrustyPro to get paid. Structure it that way in the first contract; it is painful to unwind later.'

**Repo says:** MASTER_BUSINESS_MODEL_2026.md does the opposite: 'Operator revenue share (AMH 30%, others ~20%) is carried in cost of revenue, not netted above,' with a cost-of-revenue line running $1.1M (Y1) to $28.8M (Y5). PLATFORM_MASTER_AUDIT.md 5.5 specs an 'Operator revenue-share ledger — accrual + statements,' i.e. TrustyPro collects and remits. The design's three-party structure appears nowhere.

**Consequence:** A direct structural contradiction with two consequences: revenue recognition (gross vs net) across every partner stream in the forecast, and whether audit 5.5's remittance ledger needs to be built at all. The design brief explicitly warns this is painful to unwind after the first contract, and the first contract is the AMH pilot.

---

## M39 · Rent reporting to credit bureaus — the economics, tiering, and enrollment assumptions

**Design says:** Coolsyn brief: rent reporting lives in the Moving-In hub, resident pays ~$8/mo and the platform nets ~$3/mo, with the trust line 'late payments never reported.' The AMH model adds volume tiering to push for ($3 to 10k enrolled, $3.75 above 25k, $4.50 above 50k) and the enrollment spread that carries the whole rev-share argument: 7% unpromoted ($154k gross) vs 25% manager-promoted ($549k gross) — 'the gap between those two rows is the entire argument for rev-share.'

**Repo says:** MASTER_BUSINESS_MODEL_2026.md stream #21 is one line — 'Rent-reporting / credit building partner fees' — with no price, no net, no tiering, and no enrollment assumption, and it does not appear in any forecast row. PLATFORM_MASTER_AUDIT.md 3.10 marks it P2, ❌, 'Partner (Esusu-type) — later.' renters-p0-build-spec.md §0.2 puts it explicitly out of scope. 'rent report' returns no hits in the P0 spec.

**Consequence:** The stream exists as a name only. The volume tiering in particular is a negotiating position that must be taken with the furnishing partner before signing, not after — at 135k distribution the $3 → $4.50 step is a 50% margin difference on the line, and nothing in the repo tells anyone to ask for it.

---

## M40 · Guardian cards and the seasonal quest — the retention engine, with no revenue stream attached

**Design says:** Coolsyn brief screen 5, categorized as 'Retention': one contextual card at a time on the home screen, never a feed — hard-freeze warning ('drip your faucets'), post-hail photo prompt routing to the camera, filter-change reminder with a streak counter; when no alert is live, a six-task seasonal quest ('Spring Refresh') with checkboxes and a points reward. 'This is what makes the app get opened between maintenance events.' Gated off for multifamily and corporate-housing orgs.

**Repo says:** renters-p0-build-spec.md §0.2 lists 'Guardian alert engine (weather/seasonal) — design exists; not P0' and instructs 'Do not build stubs for these beyond feature flags.' PLATFORM_MASTER_AUDIT.md 2.4 marks proactive alerts P1 ❌ 'Not wired.' Neither the quest, the points reward, nor the streak counter appears in the four named docs, and none of the 63 streams monetizes any of it.

**Consequence:** Engagement between maintenance events is what turns an engaged door into a monetizable one, and the model's single most sensitive line is resident engagement rate (35%→70%; halving it costs $60M+ of Y5 revenue). The mechanic designed to drive that number is deferred and has no stream attached — the filter reminder is a consumables commerce trigger, and the post-hail photo prompt is a claim-condition capture event feeding the insurance data tier.

---

## M41 · Referral credit programs — resident and homeowner, both paying in credit rather than cash

**Design says:** Coolsyn brief screen 6: 'Referral program pays shop credit, not cash: $15 for a renter friend, $30 for a homeowner friend, credit unlocking only after the friend documents their place. Balance card + tier cards + copyable link.' TrustyPro v3 has a parallel homeowner program (`referral` — 'Refer a neighbor'; tp3-more.jsx): the referrer earns a free month of TrustyPro Care each time a neighbor books a first service ('12 referrals = a free year') and the referee gets their home's past inspection report free (a $29 value) so their Vault starts pre-filled. v3 also has `rRefer` on the resident side.

**Repo says:** No consumer or resident referral program appears in MASTER_BUSINESS_MODEL_2026.md, PLATFORM_MASTER_AUDIT.md, renters-p0-build-spec.md, or builder-edition-design-brief.md. 'shop credit' and 'referral credit' return zero repo hits. The repo's referral concepts are all supply- or channel-side: audit 1.8 photo-origination attribution for pros, 5.6 channel partner ledger (Patrick), and streams #6/#11–15 which are outbound referral commissions the platform earns.

**Consequence:** No CAC-offset mechanic and no credit-liability line. The design's gating rule — credit unlocks only after the friend completes documentation — is also the cheapest available lever on Shield completion rate and on the qualified-record count that gates every data stream, and it is currently unmodeled on both the cost and the benefit side.

---

## M42 · Data-licensing consent must be captured in the invitation flow from day one

**Design says:** Coolsyn brief (and the AMH model) are explicit that this cannot be retrofitted: 'the resident consent language has to permit it — build that into the invitation flow from day one, not retroactively,' and 'consent — data licensing and insurance placement both require resident opt-in language present from the first invitation.' The design also pairs it with the trust line shown on the invite screen: '[PM] never sees your personal data.'

**Repo says:** renters-p0-build-spec.md R-3.1.3 specifies the invite-accept screen as org logo, invitation copy, benefit bullets, and footer, then account creation — no data-use consent capture, no consent-scope record on the residency. Consent appears in the spec only as SMS/TCPA consent (R-3.1.2), operator read consent on Shield exports, and a `consent_scope` column on the utility-handoff table. PLATFORM_MASTER_AUDIT.md 8.4 marks the consent chain P1, ❌, 'Gate for all future data revenue' — a priority below the P0 invite flow it must live inside.

**Consequence:** Every resident onboarded through the pilot before consent language ships produces records that cannot be licensed, and re-consenting an installed base is materially harder than consenting at invite. Data licensing is $11.2M of Y5 revenue in the forecast and, per the model, most of the terminal value — this is a one-line change to a P0 screen that is currently scheduled after that screen ships.

---

# MINOR (14)

## M1 · Headline platform counts do not reconcile and no document contains the mapping

**Design says:** §07: "Seven distinct interfaces. Three exist, four do not." §09 tail adds four more surfaces: "residential, commercial, partners, and TrustyPro each get their own site," to be built as "four skins over one component library and one pricing source."

**Repo says:** platform-architecture-personas.md opens with a different rule: "Build 4 codebases. Configure them into many experiences. Never fork," and explicitly collapses one of the strategy's rows — "Not a fifth app: the channel partner portal (Utility Valet, future operators) is a limited role inside the enterprise console." It also expands one row the strategy treats as single: the enterprise console is one codebase serving five tenant types (TrustyPro Portfolio / Service Network / Warranty Portal / Community Portal / Claims Console). No repo spec mentions marketing sites.

**Consequence:** Seven vs four vs "the five" in the build order, with four unmentioned marketing properties on top. The two counts are partly reconcilable (Field and Business OS are modes/views of the pro codebase; Partner Portal is the enterprise console) but nothing written down does the reconciling, so the two lists read as competing scope documents rather than two altitudes on one plan.

---

## M2 · Background-check pass-through is specified as at-cost in one section and marked-up in another, across four separate pricing sites

**Design says:** ProLnk Platform Strategy §02, pricing component 4: "Clearances — priced per screening. Fingerprinting, bonding, and federal registration cost real money. Pass those through with margin rather than absorbing them into the seat price." §08, the floor table and the note beneath it: "Background check | Per person, annually — passed through at cost as a visible line item" and "Background checks are passed through at cost, itemized. Marking up a screening the vendor can price-check in thirty seconds trades a few dollars for the trust the whole platform runs on."

**Repo says:** The same document flags the distribution risk in §09: "The honest cost is fragmented SEO authority, a split brand, and four properties to keep current — a residential price change that lands on three sites and misses the fourth is a support problem and a legal one."

**Consequence:** The document already identifies the category of risk and then contains a live instance of it: two sections give contradictory instructions on the same line item. If marketing publishes "at cost" on any of the four sites while billing applies the §02 margin, that is a false statement about a specific charge on a specific invoice — the easiest kind of DTPA or FTC §5 claim to prove, since the vendor can price-check it in thirty seconds exactly as the document says. Resolve to one policy and put it in the shared pricing source before the four sites are built.

---

## M3 · Fifteen-minute emergency callback promised in-app with no service-level disclaimer

**Design says:** Coolsyn Resident App Brief, Screen 3: "Urgency picker (Emergency / Soon / Whenever — emergency shows a 15-minute-callback banner and a 911 note)".

**Repo says:** The document includes a 911 note, showing awareness of the life-safety context, but specifies no disclaimer, no best-efforts qualifier, and no defined coverage hours for the 15-minute commitment.

**Consequence:** An unqualified 15-minute response banner displayed at the moment a resident reports a gas smell, an active leak, or an electrical fault is a voluntarily undertaken duty. If the callback is late and the water damage or injury is worse for it, the banner is the plaintiff's first exhibit in a negligent-undertaking claim, and it undercuts any limitation-of-liability clause in the resident terms. This is the cheapest fix in the set: qualify the banner ("we aim to call back within 15 minutes"), state coverage hours, and keep the 911 line prominent.

---

## M4 · The 135,000-door extrapolation applies AMH's anchor 30% to all partners and drops the non-anchor per-door license

**Design says:** "Scaled to 135,000 doors: ~$4.2M/yr to partners, ~$10M/yr to TrustyPro" — a flat $31/door to partners and $74/door to TrustyPro across the whole base.

**Repo says:** RATES-MEMO.md: "Future non-anchor operators (Andrew-sourced, outside Patrick's channel): ~20% share (confirmed working number)." MASTER stream 24 repeats "AMH 30%; future operators ~20%" and line 190 confirms it. MASTER also carries stream 25, absent from the HTML: "Per-door license — future non-anchor operators, ~$2/door/month."

**Consequence:** Extrapolating the anchor rate to every partner overpays the 74,000 non-AMH doors by 10 points. At ~20% the correct split is roughly $3.5M to partners and $10.7M to TrustyPro, not $4.2M/$10.0M — and the omitted per-door license adds ~$1.8M/yr on those same doors. The document also gives AMH a written basis to object if it ever learns later operators pay 20%, since it presents 30% as the standard rather than an anchor concession.

---

## M5 · "Free to the resident" contradicts the resident-paid services stream, which is also one of AMH's four contractual share bases

**Design says:** "TrustyPro is free to the property manager and free to the resident. Every stream is monetized through a partner." No resident-paid service revenue appears in the model.

**Repo says:** MASTER stream 17: "Resident-paid services — cleaning, mounting, add-on work outside the lease," carried in the forecast as "Platform fees — renter-paid services" at $0.2M in Y1 rising to $6.3M in Y5. operator-msa.md §4.1 makes it an explicit operator share base: "Resident-paid purchases and services at Covered Properties."

**Consequence:** The claim is inaccurate as stated and it removes a stream from AMH's share base — understating both gross and AMH's take, and contradicting a row of the MSA AMH will be asked to sign. The related "Move-out services" row of MSA §4.1 (MASTER stream 26) is likewise absent, folded instead into the maintenance-spend rebate rather than modeled as a shared revenue stream.

---

## M6 · Rent reporting cites a 135,000-door distribution base that appears nowhere in the volume plan

**Design says:** "Push the furnishing partner for a volume-tiered rate — at 135k total distribution the leverage is real ($3 to 10k enrolled, $3.75 above 25k, $4.50 above 50k)."

**Repo says:** MASTER's contracted-door ramp is 61,000 (Y1) → 175,000 (Y2) → 350,000 → 550,000 → 800,000. 135,000 is not a milestone in the plan, and on an engaged-door basis Y1 is 21,350 and Y2 is 87,500.

**Consequence:** The negotiating leverage is asserted against a distribution number the forecast never produces — it falls between Y1 and Y2 contracted, and roughly doubles Y2 engaged. The tier ladder is quoted but never applied (both table rows compute at a flat $3/mo), so the paragraph reads as though a volume rate has been secured when neither the volume nor the rate is in the model.

---

## M7 · Coverage priced per metro area pack — and free low-density areas — appear nowhere

**Design says:** §02 component 3: "Coverage — priced per area pack. Metro regions beyond what the plan includes." §08 adds "free low-density areas offered as a seeding incentive."

**Repo says:** Absent from all four files. MASTER_BUSINESS_MODEL_2026.md presents a "Complete revenue stream inventory" of 63 streams; no coverage or territory pack is among them. PLATFORM_MASTER_AUDIT.md 1.1 lists ZIPs as onboarding data only, with no pricing attached.

**Consequence:** One of the five stated pricing components has no revenue line, no SKU, and no build item. A discount rule (free low-density coverage) is also being promised in onboarding with no billing mechanism to honor it.

---

## M8 · Clearances priced per screening are not billable anywhere

**Design says:** §02 component 4: "Clearances — priced per screening. Fingerprinting, bonding, and federal registration cost real money."

**Repo says:** PLATFORM_MASTER_AUDIT.md 1.6 confirms fail-closed clearance gating is live (✅) for residential/commercial/school/gov, but nothing bills for obtaining a clearance. Revenue stream 5 covers only background checks and license/COI monitoring; fingerprinting, bonding, and federal registration are not itemized in the 63-stream inventory or in RATES-MEMO.md.

**Consequence:** The gating that unlocks school, healthcare, municipal, federal, and military job classes is enforced but free. Each clearance carries a real vendor cost that the platform currently absorbs, and there is no line item to pass through — with or without the margin §02 calls for.

---

## M9 · "No commission on labor" is contradicted by the live fee and by what the support bot already tells pros

**Design says:** §04 Differentiator 01: "You set your own price. No lead auctions, no per-lead fees, no commission on labor." §02: "you set your price, we take nothing." §09 requires all four marketing sites to run off "one pricing source."

**Repo says:** The live platform fee is job value × 6–15% on completed jobs — a commission on labor. ProLnk/server/support-knowledge.ts:52 already tells pros they "keep 40% / 50% / 60% of the platform fee" by tier. The repo's own pricing figures have drifted: docs say Business $249, commission-engine-code-audit.md F12 cites "$99/$149/$299+" from stripe.ts, and networkOverrides.ts hardcodes $149 for every downline member.

**Consequence:** The marketing promise and the chatbot's knowledge base contradict each other today, before four separate sites multiply the surface. PLATFORM_MASTER_AUDIT 7.7 (chatbot guardrails: "never legal/pricing promises") has its tests unwritten, so nothing catches it. The design flags exactly this failure mode — "a residential price change that lands on three sites and misses the fourth is a support problem and a legal one" — and the drift has already started inside the repo.

---

## M10 · "The vendor pays their own payment processing" vs. a modeled processing spread

**Design says:** §02: "the vendor pays their own payment processing… the vendor covers processing on their portion" — framed as pass-through, on top of which the 3% sits.

**Repo says:** MASTER_BUSINESS_MODEL_2026.md stream 45: "Payment processing spread — margin between processor cost and the rate charged to pros/vendors." PLATFORM_MASTER_AUDIT.md 5.2 reinforces it: "fee-only processing protects margin."

**Consequence:** The design's framing is a pass-through the vendor can price-check; the repo models it as a marked-up spread. Same trust exposure as the background-check markup question, and it needs the same one-line ruling before processing terms go into vendor agreements.

---

## M11 · Commerce rendered over the resident's own Move-In Shield photos, with partner PROGRAM PRICE and a renter-friendly catalog

**Design says:** Coolsyn brief screen 6: 'Renter-friendly decor (rugs, lighting, curtains, peel-and-stick; "no drilling" badges), PROGRAM PRICE tags on partner items, "see it in your room" using the resident's own Shield photos, checkout billed by the supply partner.' The distinctive mechanic is that the rendering substrate already exists — the Shield walkthrough captured every room — so commerce requires no additional capture step. ~15% program margin on ~$250 move-in orders.

**Repo says:** renters-p0-build-spec.md §0.2 puts the Shop tab out of scope ('ships as a static teaser at most, or is omitted') and R-3.2.8 keeps Shop off the resident tab bar entirely. PLATFORM_MASTER_AUDIT.md 3.9 makes the shop dependent on 2.7 (the rendering engine, ❌). Streams #9 and #10 cover affiliate and rendering-driven commerce generally, but nothing in the four docs connects the rendering pipeline to Shield photos as its input, and 'program price' / 'no drilling' appear only in older prompt docs outside the named specs.

**Consequence:** The cheapest possible path to rendering-driven commerce — reusing photos the resident already took for deposit protection — is not written down where the build team will see it, so the Shop is scoped as if it needs its own capture flow. Also leaves the PROGRAM PRICE partner-pricing construct (distinct from affiliate commission) unmodeled.

---

## M12 · Builder dashboard role architecture and coordinator-workflow upgrades

**Design says:** Builder Dashboard Brief: 'Three roles use this product and they want different things. Design for role, not for feature list' — warranty coordinator (daily: speed, queue, assignment), VP of Construction (weekly: patterns, vendor accountability, cost per home), owner/CFO (monthly: the P&L). Nav grouped Daily / Analysis / Growth. Queue additions over the prototype: bulk assignment, per-row SLA countdown (not just age), saved views per coordinator, keyboard-driven flow ('should never need the mouse'). Claim detail additions: chargeback-to-sub, cost estimate vs actual, and the homeowner's full history with this address. Plus two global rules: every AI determination must show the quoted clause it came from, and 'no dollar figure without its comparison.'

**Repo says:** builder-edition-design-brief.md specs three desktop screens with no roles, no nav structure, no SLA countdown, no bulk actions, no saved views, and no keyboard model; its Screen A stat row is open requests / avg days to close / % auto-resolved. It does carry the clause-quoting rule ('coverage basis with the warranty clause it maps to') and 'No prices anywhere in the warranty flow' — which is in tension with the design brief's dollar-comparison rule for the dashboard surface.

**Consequence:** The repo brief will produce a three-screen queue tool for one persona. The two personas who hold budget (VP of Construction, owner/CFO) have no surface, which is the same reason the design brief says nobody in the industry loves their warranty software.

---

## M13 · Utility Valet activation economics and the anti-skip pattern

**Design says:** Coolsyn brief screen 4 quantifies the hub: $50–100 affiliate bounty per activation at ~2 services per move-in, ~$1.37M/yr gross at 61k doors (50% of move-ins × 2 services × $65). Six gated categories (Electricity, Internet & TV, Water/Sewer/Trash, Renters insurance, Security, Movers), three real plan cards per service with address pre-filled from the lease, install-window picking for internet, an 'I already have coverage — snap your declaration page' path for insurance, and a deliberate anti-skip rule: 'users cannot skip from the checklist — each service screen offers "Already set up" / "Don't need this" only after showing the options.' All deals billed by the provider on the web — no app-store fees.

**Repo says:** renters-p0-build-spec.md §6 reduces this to a single handoff link ('v1 = referral link, 1 day') and §0.2 defers the plan-selection flow to v2. Streams #19/#20 name utility connection and move-in commerce without per-activation economics, and MASTER_BUSINESS_MODEL_2026.md's assumptions table has no attach-rate or bounty line for move-in (the forecast row 'Move-in economics' is unexplained). The declaration-page capture path and the anti-skip rule appear nowhere; the app-store-fee avoidance rationale appears nowhere.

**Consequence:** The v1 deferral is deliberate and documented, so this is a modeling gap rather than a scope gap — but the attach-rate assumptions that produce the forecast's move-in revenue are not written down anywhere they can be challenged, and the anti-skip pattern is the single behavioral rule that moves attach from the 3–8% unpromoted case to the 15–25% promoted case the rev-share is buying.

---

## M14 · Checked and not present in the designs: clearance pricing and coverage-area packs

**Design says:** Neither mechanic appears in the Builder Dashboard Brief, the Coolsyn Resident App Brief, TrustyPro v3 (SCREEN_GROUPS, JOURNEYS, or inline content), or the AMH Partnership Model. Grep for clearance / coverage area / zip pack / service area across all four files returns zero hits — expected, since all four are demand-side (homeowner, resident, builder) and these are pro-side supply monetization.

**Repo says:** The repo is where these live, not the designs. PLATFORM_MASTER_AUDIT.md 1.5/1.6 covers verification and fail-closed site-type clearance gating, and 1.10 covers founding-network capacity caps; deliverables/kits/vendor-recruiting-kit.md references a vendor's trades and coverage area as a dispatch-priority input. Neither is priced as a product in the 63-stream inventory — clearance tiers are a gating rule, not an upsell, and coverage area is a config field, not a pack.

**Consequence:** No design-vs-repo gap to close here. Worth noting separately that both are unmonetized in the repo: charging pros for higher clearance tiers or additional coverage areas would be new supply-side streams, but that is a repo-side opportunity, not something the designs are asking for.

---
