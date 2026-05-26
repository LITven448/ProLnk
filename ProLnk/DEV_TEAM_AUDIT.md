# Dev Team Audit — ProLnk Platform

**Prepared by**: Andrew Frakes / LIT Ventures
**Date**: 2026-05-23
**Purpose**: Issues, corrections, and missing scope to review with dev team before committing to full build

Reference docs updated to reflect the authoritative business spec:
- `docs/BRANDS.md` — 6 brands + 2 mobile apps, corrected
- `docs/COMMISSION.md` — commission structure corrected

---

## Summary

The dev team's architecture is technically sound and more production-ready than the current Render/Vite stack. The primary issues are **scope gaps** (missing brands and features), **financial number discrepancies**, and **open technical concerns** around the AI photo analysis pipeline. Nothing here is a reason to reject their approach — but all critical items must be corrected in writing before the build proceeds past foundation work.

---

## CRITICAL — Must Fix Before Proceeding

### C1. Brand Scope: 6 Brands, Not 3

**Dev team has**: ProLnk, TrustyPro, LIT Ventures (as operator layer)
**Correct state**: 6 consumer brands + internal operator layer (ProLnk Network)

| Missing Brand | What It Is | Impact if Missing |
|---------------|-----------|-------------------|
| **ProLnk Exchange** | Commercial contractor job board | Separate schema, routing, bid flow — major rework to add later |
| **TrustyPro Commercial** | Commercial property owner portal | Separate account model, multi-property, recurring contracts |
| **ProLnk Media** | Advertising platform for real estate, title, mortgage companies | Separate ad schema, billing, placement logic |
| **LNKD** | Room scan + AI product overlay + affiliate links | Requires ARKit/ARCore integration, affiliate tracking — most complex brand |

**Action**: Dev team must revise their README, route groups, middleware brand detection, and schema planning to include all 6 brands. At minimum, routing stubs and schema tables must be planned now, even if UI builds in later phases.

**LIT Ventures correction**: LIT Ventures is the investment group (parent company of the platform). It is NOT a brand, NOT an operator UI, and should NOT appear in routing, brand detection code, or user-facing anything. Remove it from all architecture diagrams and replace references with **ProLnk Network** (the actual internal operator layer name).

---

### C2. Mobile Apps Must Be First-Class in the Architecture

**Dev team has**: "React Native (Expo) — Phase 2"
**Correct state**: Mobile apps are required products, not optional phase 2 afterthoughts

| App | Audience | Priority |
|-----|----------|----------|
| **ProLnk App** | Service professionals — lead queue, earnings, network | Phase 2 but must be designed for now |
| **TrustyPro App** | Homeowners — submit requests, photo upload, track jobs | Phase 2 but must be designed for now |

**Action**: API endpoints must be designed with mobile clients in mind from day one (auth tokens, push notification registration, file upload endpoints, deep linking). The FastAPI backend needs to expose a mobile-friendly API — not just the Next.js frontend. Ask the dev team to confirm their API is built for both web and mobile clients.

---

### C3. Commission Numbers — Two Corrections

**Correction 1: Max commission keep**
- Dev team: 78% (Enterprise tier)
- Correct: **72% max** (Enterprise tier)

**Correction 2: ProLnk platform fee not documented**
- Dev team spec has no mention of ProLnk's per-job platform fee
- Correct: ProLnk takes **3%–15% of job value** depending on job type before the commission pool is calculated
- This is fundamental to the payout engine — if it's missing from the spec, the financial math is wrong

**Remaining open items** (confirm these before building payout engine):
1. Subscription price: dev team says $149/month — prior internal docs said $199/month. Lock this.
2. Full tier table: names + thresholds for all tiers between Scout (40%) and Enterprise (72%)
3. Platform fee by job category: exact rates confirmed
4. Does network cascade apply to ProLnk Exchange (commercial) jobs?

See `docs/COMMISSION.md` for the full corrected commission spec.

---

### C4. Photo Analysis Pipeline — Reliability Concerns

**What the dev team spec says**:
- Homeowner uploads 1–5 photos
- Images >4MB compressed server-side (Pillow: 85→70→55→40 quality, max 2048px)
- Claude Vision call and Azure Blob Storage upload run **in parallel**
- Claude returns: deficiency list, severity ratings, measurements, scope badge, service category, one-sentence summary

**Concerns to resolve**:

1. **Failure isolation**: If the Blob Storage upload fails, does the Claude analysis still complete and return to the user? If Claude fails, do the photos still save? These must be independent — a failure in one should not block the other.

2. **Partial failure on multi-photo**: If 3 of 5 photos upload successfully and 2 fail compression or upload, what happens? Does Claude analyze the 3 that worked? Or does the whole request fail? The UX must handle partial success gracefully.

3. **Claude Vision timeout**: Claude calls can take 10–30 seconds per image. With 5 images, what is the timeout strategy? Is each photo sent in a separate API call (parallelized) or batched? If one photo call times out, does the user wait?

4. **Fallback UX**: If the entire AI analysis fails (Claude API down, quota exceeded, network error), can the homeowner still submit their service request without the AI analysis? The request form should not be blocked by a failed AI call.

5. **Retry logic**: Is there retry logic on the Claude call? On the Blob Storage upload? What happens if ProLnk is rate-limited by the Anthropic API?

6. **Cost control**: Claude Vision charges per image. With 5 images per request and high volume, this adds up. Is there a max image count enforced? Is there a fallback to text-only if Claude budget is exceeded?

**Action**: Dev team must provide a detailed flow diagram for the photo analysis pipeline showing exactly what happens on success, partial failure, and full failure. The analysis should be non-blocking — homeowner can submit without it.

---

### C5. Domain Situation

**Current live site**: prolnk.xyz + trustypro.io → Render (must stay live during full rebuild)
**Target domain**: prolnk.io (currently locked in Manus — release timeline unknown)

**Action items**:
1. Andrew to contact Manus support immediately to initiate prolnk.io domain release
2. Dev team must confirm their build works with prolnk.xyz as the primary domain until prolnk.io is released
3. At prolnk.io release: redirect prolnk.xyz → prolnk.io (301), confirm SEO impact is acceptable
4. Dev team needs a migration plan: when does the new Azure build replace the current Render build? What is the cutover moment?

---

## HIGH PRIORITY — Address in Sprint Planning

### H1. Existing Data Migration

The current live system has real data in TiDB Cloud (MySQL on Render):
- `partner_signups` — Pro waitlist entries
- `homeowner_signups` — Homeowner waitlist entries
- Any seeded demo data

**Action**: Dev team needs a migration script to move this data to Azure MySQL Flexible Server before the Render system is decommissioned. The migration must be a one-time script, tested on a staging database first.

---

### H2. LNKD Brand — Needs a Technical Spec Before Any Build Work

LNKD is significantly more complex than the other brands and has not been scoped at all by the dev team. It requires:

- **Room scanning decision**: ARKit (iOS) / ARCore (Android) vs. photo-based 2D room analysis vs. third-party SDK (Polycam, Matterport API)
- **Product catalog**: Integration with Amazon Product Advertising API, Home Depot API, or a managed product feed
- **Affiliate tracking**: Click → purchase attribution, retailer webhook for conversion confirmation
- **AI matching**: Logic to map detected room features/materials to relevant products

**Action**: Do not build LNKD until a dedicated technical spec is written and approved. This is a separate product that needs its own scoping session.

---

### H3. ProLnk Media — Advertiser Model Not Defined

The dev team has no schema or design for ProLnk Media. Before this can be built, define:
- Is it self-serve (advertisers sign up and manage their own campaigns) or direct sales?
- What ad formats: banner, sponsored listing, native card, email insert?
- Billing model: CPM, CPC, flat rate, or lead referral fee?
- Targeting: by zip code, service category, homeowner demographics?

**Action**: Write a one-page advertiser model spec before assigning dev work to ProLnk Media.

---

### H4. ProLnk Exchange — Schema Gap

ProLnk Exchange (commercial job board) requires a distinct schema that doesn't exist in the current 130-table design. At minimum:
- `company_profiles` (contractor companies, not individual pros)
- `job_postings` (commercial jobs with scope, timeline, budget)
- `job_bids` (multi-party bidding with versioning)
- `commercial_contracts`
- `commercial_commissions` (separate logic — 5% platform fee, no homeowner cascade)

**Action**: Dev team must add these tables to their schema planning before the commercial brand is scoped into sprint work.

---

## MEDIUM — Confirm Before or During Build

### M1. Subscription Tiers — 3 Prices, Not One
There are 3 subscription tiers, not a single price. The dev team's spec shows only $149/month which is the middle tier.

| Tier | Price | Override Earned by Referrer (10%) |
|------|-------|----------------------------------|
| Starter | $79/month | $7.90/month |
| Professional | $149/month | $14.90/month |
| Elite | $249/month | $24.90/month |

**Action**: Dev team must build subscription tier logic (which features are gated to which tier) and ensure Stream 3 override calculations use the actual tier price for each referred pro, not a flat $149.

### M2. Full Tier Table
Dev team has endpoints only (Scout = 40%, Enterprise = 72%). The intermediate tiers — names, advancement thresholds, and keep percentages — are not specified. This must be defined before the tier-advancement engine is built.

### M3. Network Cascade on Commercial Jobs
Does the 4-level network cascade (7/4/2/1%) apply to ProLnk Exchange (commercial) jobs? Or is the commercial model simpler (flat 5% to platform, remainder to contractor, no cascade)? Confirm before building commission calculation logic.

### M4. "ProMatch" / B2B API Product
The original internal docs included a "ProMatch" B2B API product (white-label lead matching for other platforms). This is not in the dev team's README. Is this still in scope? If yes, it needs to be included in brand routing and API design. If no, formally drop it.

### M5. Home Health Vault Brand Positioning
The original internal docs listed "Home Health Vault" as its own brand. The dev team's build incorporates this as a TrustyPro feature (not a separate brand). Confirm: is Home Health Vault a sub-feature of TrustyPro, or is it still intended to be a standalone brand with its own domain?

---

## LOW PRIORITY — Future Planning

### L1. ProLnk Exchange Pricing Model
How does ProLnk Exchange charge? Per job posting, subscription for contractor companies, or commission on placed jobs only? This affects the schema and billing integration.

### L2. TrustyPro Commercial vs. ProLnk Exchange Overlap
Both target commercial/B2B. TrustyPro Commercial is for property owners buying services; ProLnk Exchange is for contractors selling services. Confirm these are distinct audiences and the routing/matching logic doesn't create confusion.

### L3. Tax and Compliance Scope
The current schema has extensive 1099, GDPR, CCPA, TCPA, and AML tables. Confirm which of these are required for the Azure MVP and which can be deferred. AML screening in particular adds significant operational overhead.

### L4. Multi-Market Expansion
The dev team's Phase 3 timeline references "multi-market." Confirm whether this means geographic expansion (more US cities/states) or international (UK, Canada, Australia as hinted in the old brand docs).

---

## What's Good — Don't Change

These items in the dev team's approach are correct and should be preserved:

- **Azure architecture**: Container Apps + Static Web Apps + Front Door + Key Vault is the right production stack
- **Next.js 15 App Router + FastAPI**: Clean separation of frontend and backend; scales well
- **x-brand header via middleware**: Better than window.__BRAND__ injection — keep this pattern for all 6 brands
- **Security hardening (Phase G)**: Rate limiting, CSP, audit log, HttpOnly/SameSite cookies — all correct, keep in scope for MVP not Phase 2
- **Celery + Azure Service Bus**: Right choice for commission calculations, payout processing, email sequences
- **Claude Vision integration pattern**: The approach (compress → parallel upload + analyze) is correct — just needs failure handling added
- **Alembic migrations**: Better than the current Drizzle migration setup for a Python stack
- **Azure Blob Storage for photos**: Required for LNKD room scan feature and AI photo analysis — correct infrastructure choice

---

## Action Items for Dev Team Meeting

| # | Item | Owner | Deadline |
|---|------|-------|---------|
| 1 | Revise README to include all 6 brands + 2 apps | Dev team | Before next sprint |
| 2 | Remove "LIT Ventures" as a brand — replace with ProLnk Network | Dev team | Before next sprint |
| 3 | Fix max commission: 78% → 72% | Dev team | Before building payout engine |
| 4 | Add ProLnk platform fee (3–15%) to commission spec | Dev team | Before building payout engine |
| 5 | Confirm subscription price ($149 or $199) | Andrew + Dev team | This week |
| 6 | Provide full tier table (Scout → Enterprise with all intermediates) | Andrew | This week |
| 7 | Provide photo analysis failure-handling flow diagram | Dev team | Before Phase E work |
| 8 | Add ProLnk Exchange schema tables to database plan | Dev team | Before Phase 1 schema finalization |
| 9 | Write LNKD technical spec (scanning tech, affiliate APIs) | Andrew + Dev team | Before Phase 4 |
| 10 | Write ProLnk Media advertiser model (pricing, formats, targeting) | Andrew | Before Phase 3 |
| 11 | Provide data migration script plan (TiDB → Azure MySQL) | Dev team | Before cutover |
| 12 | Confirm prolnk.io domain release timeline from Manus | Andrew | ASAP — potential deployment blocker |
| 13 | Confirm build works with prolnk.xyz until prolnk.io is released | Dev team | Before Phase 1 deploy |
| 14 | Confirm mobile API is designed for ProLnk App + TrustyPro App | Dev team | Before Phase 1 API design finalization |
| 15 | Confirm or drop "ProMatch" B2B API product from scope | Andrew | This week |
| 16 | Confirm Home Health Vault: TrustyPro feature vs. standalone brand | Andrew | This week |
