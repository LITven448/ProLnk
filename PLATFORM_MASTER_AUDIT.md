# PLATFORM MASTER AUDIT — ProLnk · TrustyPro · TrustyPro Renters
**Created 2026-08-19 · Working checklist — assume ❌ NOT DONE until verified against live code**

Legend: ✅ verified live · ⚠️ partial / discrepancy found · ❌ assume not done · 🔶 decision needed from Andrew. Check items off only against running code, never against docs.

Priority: **P0** = blocks AMH pilot / launch · **P1** = blocks scale or revenue · **P2** = phase 2/3.

---

## 1 · CORE PLATFORM — ProLnk (Pro side)

| # | Item | Pri | Status | Notes |
|---|---|---|---|---|
| 1.1 | Pro onboarding: application, trades, ZIPs, subscription selection | P0 | ⚠️ | Live in old platform; verify rebuild parity |
| 1.2 | Subscription billing (Core $99 / Pro $149 / Business $249; Scout $99/$49 add-on) | P0 | ⚠️ | Live `stripe.ts` TIER_PRODUCTS — must survive processor migration (§5.2) |
| 1.3 | **Vendor intake v2 (operator program):** company size, per-individual licenses, property types served (rental/residential/both), capacity, markets, FSM used | P0 | ❌ | Designed in AMH docs only |
| 1.4 | **Vendor pricing model: subscriber vs per-work-order fee (NO free tier)** — price points | P0 | 🔶 | Andrew to set $/mo and $/job; engine must support both |
| 1.5 | Verification: license (state API), insurance COI parse + expiry monitor, background check (Checkr acct + billing to pro) | P0 | ⚠️ | `dispatch.ts`/`clearance.ts` live; Checkr production account + webhooks unverified |
| 1.6 | Fail-closed site-type clearance gating (residential/commercial/school/gov) | P1 | ✅ | Live; legal review before launch still owed |
| 1.7 | Referral/job lifecycle: claim → quote → schedule → complete → paid | P0 | ✅ | Verify in rebuild |
| 1.8 | Photo-origination referral attribution (pro uploads photos → earns on resulting job) | P1 | ❌ | Premise of the whole pitch — confirm engine writes origination records |
| 1.9 | Scout program: address claiming, origination registry | P1 | ⚠️ | Spec final; verify claim flow + perpetual ledger exists |
| 1.10 | Founding network: capacity caps (25/100/400/1,600), 60% keep, network tab | P1 | ⚠️ | Capacities referenced in `network.ts`; verify enforcement + UI |
| 1.11 | Pro app: earnings dashboard, payout statements, 1099 data export | P1 | ❌ | |
| 1.12 | Emergency dispatch flow (priority match, loud alert, first-to-accept) | P1 | ❌ | Prototype only |
| 1.13 | Digital Briefcase (company docs) + ProPass (individual) production UI | P1 | ⚠️ | Prototype screens exist; production build unverified |
| 1.14 | Virtual On-Site Badge (job-bound, time-boxed, homeowner-verifiable) | P2 | ❌ | DO NOT ship or market before patent filing |

## 2 · CORE PLATFORM — TrustyPro (Homeowner side)

| # | Item | Pri | Status | Notes |
|---|---|---|---|---|
| 2.1 | Homeowner journey: add home → photos → AI findings → request → match → track → pay → review | P0 | ⚠️ | Core journey live on old platform; rebuild = request + my-deals only |
| 2.2 | Home Health Vault: per-address record, systems registry, score | P0 | ⚠️ | Fields exist in intake; full Vault UI/store not in rebuild |
| 2.3 | Home Health Score computation (completeness/condition/maintenance/safety) | P1 | ❌ | Prototype math only |
| 2.4 | Proactive alerts: seasonal + weather event engine (patented FIG 11) | P1 | ❌ | Not wired |
| 2.5 | Property enrichment on add (ATTOM/county records autofill) | P1 | ❌ | API account + cost model needed |
| 2.6 | Magic autofill onboarding (address → digital twin) | P1 | ❌ | |
| 2.7 | Rendering engine v1: photo → inpainted reimagine with catalog products → shop-the-look | P1 | ❌ | Feasible now; needs catalog feed pipeline (§6) + image-gen pipeline + QA loop |
| 2.8 | Compare-3-quotes flow | P2 | ❌ | |
| 2.9 | Nameplate OCR → asset registry (brand/model/serial/install yr) | P1 | ❌ | Cornerstone for capex + recall products |

## 3 · CORE PLATFORM — TrustyPro Renters (Resident gate) — **assume 0% built**

| # | Item | Pri | Status | Notes |
|---|---|---|---|---|
| 3.1 | Org invitation flow (operator-branded), resident account, address confirm | P0 | ❌ | |
| 3.2 | Resident mode gating: NO prices, NO vendor names, NO marketplace content | P0 | ❌ | Hard rule — legal + deal requirement |
| 3.3 | Move-In Shield: guided room-by-room capture, progress, timestamped store, AI catalogue, pre-existing flags | P0 | ❌ | The flagship; photo loss = deal loss — storage durability is P0 of P0 |
| 3.4 | Maintenance request: photo → AI triage → operator approval → dispatch → tracker → completion photos | P0 | ❌ | Reuses core AI + job lifecycle |
| 3.5 | Renter-pays services (cleaning, mounting, etc.) — skip approval path | P1 | ❌ | |
| 3.6 | Move-out comparison (assisted-manual OK for pilot) + dispute packet export | P1 | ❌ | |
| 3.7 | Moving-In hub (Utility Valet handoff link v1; deep integration v2) | P0 | ❌ | v1 = referral link, 1 day |
| 3.8 | Renters insurance embed (required-by-lease flag, proof auto-filed to operator) | P1 | ❌ | Partner needed (§6.3) |
| 3.9 | Shop tab: curated commerce shelf over renter's room photo | P2 | ❌ | Depends on 2.7 |
| 3.10 | Rent-builds-credit partner enroll | P2 | ❌ | Partner (Esusu-type) — later |

## 4 · OPERATOR DASHBOARD — TrustyPro Portfolio — **assume 0% built**

| # | Item | Pri | Status | Notes |
|---|---|---|---|---|
| 4.1 | Thin pilot version: approval queue + detail (AI triage, cost band, entry OK) + approve/deny + assign (in-house crew vs vendor) | P0 | ❌ | ONE screen done well = pilot-ready |
| 4.2 | Pilot metrics reporting (cost/WO, approval time, turn days, disputes, adoption) | P0 | ❌ | The pilot IS these numbers |
| 4.3 | Auto-approval rules engine (NTE by trade/urgency) + audit trail (who/when/rule) | P1 | ❌ | Manual approve OK at pilot volume |
| 4.4 | Full dashboard: Overview KPIs, Assets/capex, Turns, Compliance, Vendors, Procurement, Reports | P1 | ❌ | Full spec exists |
| 4.5 | Roles/SSO (org admin/regional/PM/field-tech), SAML/Okta | P1 | ❌ | Pilot = simple accounts |
| 4.6 | Bulk address import (CSV) + attribution tagging at creation (origination source) | P0 | ❌ | Attribution = every future revenue split; must exist Day 1 |
| 4.7 | PMS sync: v1 CSV/scheduled read; v2 read-write (Yardi/RealPage/AppFolio per operator) | P1 | ❌ | v1 for pilot |

## 5 · PAYMENTS & COMMISSIONS

| # | Item | Pri | Status | Notes |
|---|---|---|---|---|
| 5.1 | Commission engine supports BOTH structures: (a) pro-network cascade per canonical spec — on platform fee, origination 5%, ≥20% floor; (b) **operator/AMH deal structure** — operator shares on vendor subs, resident commerce, move-out services, and data (§5.5) — its own intentional model, separate from the pro cascade | P0 | ⚠️ | Rebuild must implement both and keep them distinct; reconcile rebuild's cascade math against canonical before any payout |
| 5.2 | 🔶 **Processor selection — escrow-capable, non-Stripe preferred** | P0 | 🔶 | Evaluate: Adyen (platforms), Moov, Dwolla, Trolley, or bank-side via Modern Treasury/Column; also decide pros-as-merchant-of-record (fee-only processing protects margin). Migration plan from `stripe.ts` needed. True "escrow" may require licensed third party — legal check |
| 5.3 | Escrow-style hold → release on completion confirmation | P0 | ⚠️ | Exists on Stripe; re-implement on chosen rails |
| 5.4 | Per-work-order vendor fee netting (non-subscriber model, §1.4) | P0 | ❌ | New |
| 5.5 | Operator revenue-share ledger (subs %, commerce %, move-out %, data %) — accrual + statements | P1 | ❌ | Needed before first AMH dollar |
| 5.6 | Channel partner ledger (Patrick L1: 5% home-orig, 7% pro-orig; no sub share) | P1 | ❌ | |
| 5.7 | Monthly payout runs, minimum rollover, clawback handling | P1 | ⚠️ | Verify in rebuild |
| 5.8 | 1099-NEC generation pipeline | P2 | ❌ | Season-driven; don't slip past Q4 |
| 5.9 | Refunds/disputes/chargeback flow + reserve policy | P1 | ❌ | |

## 6 · AFFILIATE & PARTNER INTEGRATIONS

| # | Category | Pri | Status | v1 path → v2 path |
|---|---|---|---|---|
| 6.1 | Furniture/decor/appliances (Wayfair, Nebraska Furniture Mart, Home Depot, Amazon, Overstock) | P1 | ❌ | v1: affiliate signups + **catalog feed ingestion** (image/price/SKU/dimensions) powering Shop + renderings; v2: cart/checkout APIs. NFM = direct outreach (regional powerhouse, no public affiliate API — pitch the rendering placement) |
| 6.2 | Move-in: utilities/internet (Utility Valet) | P0 | ⚠️ | Handoff link trivial — Patrick agreement unsigned |
| 6.3 | Renters insurance (SURE, Assurant, Lemonade APIs) | P1 | ❌ | Pick one embed partner; proof-to-operator webhook |
| 6.4 | Homeowner P&C referral (agency licensing later) | P2 | ❌ | Counsel before quoting |
| 6.5 | Home warranty distribution (Frontdoor/AHS, Cinch) | P2 | ❌ | Post-pilot |
| 6.6 | Security/smart home (SimpliSafe, ADT, Ring affiliate) | P2 | ❌ | |
| 6.7 | Moving companies + storage (moving-affiliate networks, PODS/Extra Space) | P1 | ❌ | Move-out revenue leg |
| 6.8 | Inspection companies channel (report-parse intake + residuals — patented) | P2 | ❌ | Homeowner acquisition web |
| 6.9 | Financing (Wisetack first; GreenSky/Regions big-ticket) | P1 | ❌ | Outreach not started |
| 6.10 | GPO/supply (Ferguson, HD Pro) | P2 | ❌ | Needs pro volume first |
| 6.11 | Rendering catalog rights (brands approve product imagery in AI renders) | P1 | ❌ | Contract clause per partner — don't skip |
| 6.12 | FSM integrations: Housecall Pro, Jobber, Workiz webhooks; Service Fusion polling — completion verification (Claim 23) | P1 | ❌ | Marketplace listings double as pro acquisition |

## 7 · AI STACK

| # | Item | Pri | Status | Notes |
|---|---|---|---|---|
| 7.1 | **Waterfall pipeline LIVE** (Tier 0 heuristic → confidence-gated escalation) — `multiModelAI.ts` is DEAD CODE today | P0 | ⚠️ | Live scans run single-path Forge/Gemini. Wire target architecture or consciously ship single-model for pilot |
| 7.2 | Triage output contract: issue/trade/severity/cost-band/parts JSON — versioned, evaluated | P0 | ❌ | Golden test set (500+ labeled photos), accuracy dashboard |
| 7.3 | Move-In Shield cataloguer (room/component tagging, pre-existing flagging) | P0 | ❌ | Async + human-QA loop acceptable at pilot |
| 7.4 | Nameplate OCR pipeline | P1 | ❌ | |
| 7.5 | Rendering/inpainting pipeline + guardrails (no people, "AI visualization" watermark) | P1 | ❌ | |
| 7.6 | **AI agent audit:** every agent/automation inventoried — prompt version control, cost caps, rate limits, fallbacks, PII redaction pre-API, logging, kill switch | P0 | ❌ | Nothing un-audited touches residents |
| 7.7 | Chatbot guardrails (never legal/pricing promises) regression tests | P1 | ⚠️ | Rules written; tests not |
| 7.8 | Model-vendor abstraction (swap models without redeploy — matches patent posture) | P1 | ❌ | |

## 8 · DATA & MOAT

| # | Item | Pri | Status | Notes |
|---|---|---|---|---|
| 8.1 | Qualified-record schema (roof/HVAC/water heater/panel + refresh cadence) — the unit of data value | P1 | ❌ | Defined in AMH docs; not in code |
| 8.2 | PII stripping at ingestion + image masking + role-gated unmask (Claims 15/21) | P0 | ❌ | Patented AND promised in every partner doc — must be real |
| 8.3 | Attribution registry (address → origination source, permanent) | P0 | ❌ | Same as 4.6 |
| 8.4 | Consent chain live from Day 1: operator MSA + resident ToS + lease addendum templates → counsel | P1 | ❌ | Gate for all future data revenue |
| 8.5 | Data warehouse + vintage tracking (validation study depends on clean history) | P1 | ❌ | |

## 9 · ENTERPRISE / SECURITY / LEGAL

| # | Item | Pri | Status | Notes |
|---|---|---|---|---|
| 9.1 | Security baseline: SSO-ready auth, encryption at rest/in transit, backups + restore test, audit logs | P0 | ❌ | Assume none until proven |
| 9.2 | SOC 2: questionnaire answer pack now; Type I engagement when AMH advances | P1 | ❌ | Not legally required; commercially required |
| 9.3 | Legal doc set: pro agreement (clawback/audit), operator MSA, resident ToS + privacy, lease addendum, vendor terms, affiliate agreements | P0 | ⚠️ | Some drafts exist; counsel pass required |
| 9.4 | Trust-model legal review (work-auth, fail-closed gating) — pre-launch | P0 | ❌ | Flagged in canonical spec |
| 9.5 | TCPA (SMS opt-in/out), CCPA/TDPSA deletion flow | P1 | ⚠️ | Spec'd; verify built |
| 9.6 | E&O + cyber insurance bound | P0 | ❌ | Before first real dispatch |
| 9.7 | Patent actions: file NP (V14.1) — deadline 2027-03-22; CIP list (Badge, ProPass gating, Scout, Move-In Shield) before public marketing | P0 | ⚠️ | V14.1 package ready; filing not confirmed |
| 9.8 | Repo/secrets ownership under Andrew's org + billing | P0 | ❌ | Acknowledged months ago; still open |

## 10 · OPS & GTM READINESS

| # | Item | Pri | Status | Notes |
|---|---|---|---|---|
| 10.1 | Support: intake channel, macros, dispute playbook, on-call | P0 | ❌ | |
| 10.2 | Vendor recruiting kit (operator-branded landing + onboarding drip) | P0 | ❌ | |
| 10.3 | Resident adoption kit (invite email/SMS templates, move-in QR one-pager) | P0 | ❌ | |
| 10.4 | Status page + incident comms | P1 | ❌ | |
| 10.5 | Analytics/event tracking (adoption funnels per pilot metric) | P0 | ❌ | Can't run a measured pilot blind |
| 10.6 | App store presence (iOS/Android builds, review lead time ~2 wks) | P0 | ❌ | Longest external lead time — start early |

---

## DECISIONS ANDREW OWES (blocking 🔶)

1. Vendor pricing: subscriber $/mo + per-work-order $ (no free tier confirmed)
2. Payment processor pick (escrow-capable, non-Stripe preferred) — schedule 3 demos
3. Operator share rates (subs % / commerce % / move-out % / data % tiers) — before any AMH term sheet
4. Pilot commitment language ceiling (90-day pilot only; no portfolio dates)
5. Rendering catalog launch partner #1 (Wayfair affiliate = fastest; NFM = direct pitch)

## SUGGESTED ATTACK ORDER (90-day lens)

1. **Weeks 1–2:** §5.1 engine reconciliation · §4.6/8.3 attribution · §7.2 triage contract + golden set · processor demos · Checkr production · counsel engaged on doc set · app-store accounts
2. **Weeks 3–6:** Renters P0 (§3.1–3.4, 3.7) · thin operator queue (§4.1–4.2) · vendor intake v2 + pricing engine · PII/masking (§8.2) · analytics
3. **Weeks 7–10:** payments migration · payout ledgers (§5.5–5.6) · Move-In Shield hardening · pilot kits (§10.2–10.3) · security baseline proof
4. **Weeks 11–13:** end-to-end dress rehearsal on 20 internal test homes · fix list · GO
