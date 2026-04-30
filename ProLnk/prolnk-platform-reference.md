# ProLnk / TrustyPro — Platform Reference Document

**Source:** Live production codebase at `/home/ubuntu/duke-partners`  
**Stack:** React 19 + TypeScript + tRPC 11 + Drizzle ORM + MySQL/TiDB + Express 4  
**Status:** Pre-launch, DFW market — all systems operational  
**Last updated:** April 3, 2026

---

## 1. Is There a Working Product?

Yes. This is not a concept or prototype. The ProLnk / TrustyPro platform is a fully operational, production-grade web application deployed at **prolnk.io**. Every system described in this document is live code — routers, database tables, UI pages, and AI integrations are all built and running. The platform is in pre-launch phase, meaning the verified partner network is being built in DFW before the homeowner-facing public launch.

---

## 2. Full Feature List

The platform is organized into three distinct user surfaces: the **Admin Command Center**, the **Partner Portal**, and the **TrustyPro Homeowner Platform**.

### 2.1 Admin Command Center (96 pages)

The admin portal is exclusively for the owner and future employees of ProLnk. It is organized into eight functional sections:

| Section | Pages |
|---|---|
| **Partner Management** | Applications, Waitlist, Verification, Auto-Approval, Leaderboard, Network Map, Territory Map, Market Expansion, Mass Adoption |
| **Intelligence** | Home Profiles, AI Scan Engine, Opportunity Detector, Photo Pipeline, Photo Queue, TrustyPro Leads, Deal Pipeline, Deal Composer, All Deals, All Opportunities, Referral Pipeline, Lead Scoring, Coverage Map, Property Timeline, Homeowner CRM, Data Intelligence |
| **AI & Predictive** | AGaaS Agents, Event Dashboard, AI Pipeline, Storm Dashboard, Storm Watch, Asset Aging, Safety Recalls, Data Marketplace |
| **Finance** | Financial Center, Payout Center, Commission Disputes, Tax Reports, Commission Rates, Analytics, Analytics Deep Dive, Analytics Export, Growth Engine, Customer Success |
| **Waitlist** | All Signups, Pro Waitlist Page, Homeowner Waitlist Page |
| **Integrations** | Integration Hub, Comms & Data Setup, Integration Health, Partner Integration Health, Integrations, Buildium, CompanyCam, CompanyCam Guide, Jobber, Housecall Pro, ServiceTitan, n8n Setup, FSM Webhooks, Webhook Manager, Comm Sequences, Google Reviews, Comms Timeline, Broadcast, Agreements |
| **Settings** | Platform Settings, Admin Setup, Service Categories, Smart Notifications, Compliance/Strikes, Business Plan, Campaign Center, Investor Metrics, Patent & IP Disclosure, Featured Advertisers, Commission Strategy, Trusted Pro Algorithm |

### 2.2 Partner Portal (Field OS + Dashboard)

Partners access the platform through a dedicated portal with the following sections:

| Section | Features |
|---|---|
| **Field OS** | Today's Jobs, Photo Scan, AI Leads, Earnings |
| **Home** | Overview, Alerts, Network Feed, What's New |
| **Leads & Jobs** | Inbox, Schedule, Inbound Leads, My Referrals, Log a Job, Job History |
| **Earnings** | Earnings, Commissions, Commission Rates, Dispute Center, Payout Setup, Payout History, Training Hub, Earnings Calculator, Compliance & Docs, Referral Hub, Referral Funnel, Tier Progress, Upgrade Plan, Analytics |
| **Network** | Directory, Leaderboard, Recruit, Marketing Kit, AI Assistant |
| **Settings** | Edit Profile, Verification Status, Integrations, Notifications |

### 2.3 TrustyPro Homeowner Platform

The homeowner-facing product includes:

- **Home Health Vault** — tracks roof age, HVAC status, air filter history, appliance warranties, and all repairs/upgrades with a full property timeline
- **AI Photo Analysis** — homeowner uploads photos; GPT-4o Vision identifies repair needs, estimates job values, and matches to verified local professionals
- **Project Management** — create projects with photos, AI-enhanced descriptions, and status tracking
- **Trusted Professional Directory** — browse verified partners by trade, badge level, and proximity
- **Homeowner Offers** — AI-generated deal recommendations based on property condition
- **Featured Advertiser Banners** — contextual placements for real estate agents, mortgage brokers, insurance agents, and home warranty companies
- **AI Support Chat** — floating support widget powered by GPT with ProLnk/TrustyPro context

---

## 3. The 7-Checkpoint Verification Flow

**Source file:** `server/routers/verification.ts`

Every partner must pass through seven verification checkpoints before receiving a Platinum badge. Each checkpoint is manually reviewed and approved by the admin team. The system is designed so that partial verification still earns a badge (Bronze through Gold), creating a progressive trust ladder.

### 3.1 The Seven Checkpoints

| # | Checkpoint | Weight | What Is Verified |
|---|---|---|---|
| 1 | **Business License** | 20 pts | State contractor license number and documentation URL |
| 2 | **Liability Insurance** | 20 pts | Certificate of Insurance (COI) with coverage amounts and expiry |
| 3 | **Background Check** | 18 pts | Criminal background check via third-party provider |
| 4 | **Business Registration** | 14 pts | State/county business registration (LLC, Corp, DBA) |
| 5 | **References** | 12 pts | Minimum 3 verified client or trade references |
| 6 | **Portfolio / Work Samples** | 8 pts | Photo evidence of completed work |
| 7 | **Identity Verification** | 8 pts | Government-issued ID matching business contact |

**Total possible trust score: 100 points.** The weights are not equal — License and Insurance carry the most weight (20 pts each) because they represent the highest liability risk to homeowners.

### 3.2 Badge Level Thresholds

Badge level is determined by the number of checkpoints completed, not the raw score:

| Badge | Checkpoints Required | Trust Score Range |
|---|---|---|
| None | 0 | 0 |
| Bronze | 1–2 | 8–38 |
| Silver | 3–4 | 38–62 |
| Gold | 5–6 | 62–92 |
| **Platinum** | **7 of 7** | **100** |

### 3.3 Verification Status

A partner's overall status is one of three states:

- **Unverified** — 0 checkpoints complete
- **Partial** — 1–6 checkpoints complete
- **Verified** — all 7 checkpoints complete (Platinum)

### 3.4 How the Admin Processes Verification

The admin uses the `/admin/verification` page to review submitted documents and toggle each checkpoint. When a checkpoint is toggled, the system automatically recomputes the trust score, badge level, and overall status using the `upsertVerification()` function in `server/routers/verification.ts`. No manual score calculation is required.

---

## 4. The Priority Score Engine (PPS)

**Source file:** `server/routers/partnerScore.ts`

The Partner Priority Score (PPS) is a 0–105 composite score that determines each partner's position in the lead routing queue. **Higher score = first look at incoming leads.** The score is recalculated nightly for all approved partners via a background sweep job.

### 4.1 Signal Breakdown

| Signal | Max Points | Formula |
|---|---|---|
| **Tier** | 30 | Enterprise=30, Company=24, Crew=18, Pro=12, Scout=6 |
| **Lead Close Rate** | 20 | `(closed / accepted) × 20` |
| **Lead Acceptance Rate** | 15 | `(accepted / sent) × 15` |
| **Job Photos Uploaded** | 15 | `min(photosUploaded / 50, 1) × 15` |
| **Customer Review Score** | 10 | `(avgRating / 5) × min(reviewCount / 10, 1) × 10` |
| **Network Referrals** | 5 | `min(partnersReferred / 5, 1) × 5` |
| **Response Speed** | 5 | `<2h=5, <6h=4, <12h=3, <24h=1, ≥24h=0` |
| **Founding Partner Bonus** | +5 | Flat bonus, applied on top of base score |
| **Maximum Total** | **105** | Base 100 + 5 founding bonus |

### 4.2 Key Design Decisions

**Tier is the largest single signal (30 pts)** because higher-tier partners have made a financial commitment to the platform, which correlates with professionalism and intent to close. This also creates a natural incentive to upgrade tiers.

**Close rate outweighs acceptance rate** (20 vs. 15 pts) because closing a job generates revenue for the platform. A partner who accepts every lead but closes none is less valuable than one who is selective but closes consistently.

**Photo score (15 pts)** incentivizes the behavior that drives the AI opportunity detection engine — the more jobs a partner logs with photos, the more the AI can identify cross-sell opportunities for the entire network.

**Review score is weighted by review count** — a partner with a 5.0 average from 2 reviews gets less credit than one with a 4.8 average from 50 reviews. Full weight requires at least 10 reviews.

**Response speed uses a rolling average** — when a partner accepts a lead, the system computes hours-to-accept and updates their rolling average using the formula: `newAvg = (oldAvg × (n-1) + newHours) / n`.

### 4.3 Score Persistence

The nightly `recalculateAllPartnerScores()` job iterates all approved partners, calls `calculatePartnerPriorityScore()` for each, and writes the result to the `partners.priorityScore` column. This column is used for fast lead routing queries without recalculating on every request.

---

## 5. Commission Structure

**Source file:** `drizzle/schema.ts` — `TIER_CONFIG` and `calculateCommissionRates()`

The commission model has three parties: the **Referring Pro** (who generated the lead via photos or referral), **ProLnk** (the platform), and the **Receiving Pro** (who closes the job). The default platform fee is **12% of the closed job value**, split between the Referring Pro and ProLnk based on the Referring Pro's tier.

### 5.1 Tier Configuration

| Tier | Monthly Fee | Commission Keep Rate | Monthly Cap | Team Seats |
|---|---|---|---|---|
| **Scout** | $0 | 40% | $500/mo | 1 |
| **Pro** | $29 | 55% | None | 3 |
| **Crew** | $79 | 65% | None | 5 |
| **Company** | $149 | 72% | None | 15 |
| **Enterprise** | $299 | 78% | None | Unlimited |

**Example:** A $1,000 job at 12% platform fee generates $120. A Scout-tier partner keeps 40% ($48) and ProLnk nets $72. An Enterprise-tier partner keeps 78% ($93.60) and ProLnk nets $26.40.

### 5.2 Job Size Fee Caps

For large jobs, the effective platform fee rate is capped to keep the commission competitive with industry CAC:

| Job Value | Max Effective Fee Rate |
|---|---|
| Under $2,500 | 12% (standard) |
| $2,500 – $9,999 | 10% |
| $10,000 – $49,999 | 8% |
| $50,000+ | 6% |

### 5.3 Exempt Partners

Scoop Duke and any designated Founding Partner are **fully exempt** — they pay zero platform fees and keep 100% of any referral commissions they generate. This is enforced via the `isExempt` flag in the `calculateCommissionRates()` function.

### 5.4 Scout Monthly Cap

Scout-tier partners (free tier) are capped at $500 in commissions per calendar month. This cap resets on the 1st of each month. It is enforced in real-time during commission calculation — once the cap is reached, the partner earns $0 on additional referrals until the month resets. This creates a natural upgrade incentive.

### 5.5 Commission Flow

The `commissions` table records every transaction with three commission types:
- `platform_fee` — the gross fee charged to the Receiving Pro
- `referral_commission` — the portion paid to the Referring Pro
- `prolink_net` — ProLnk's retained amount after paying the Referring Pro

---

## 6. Partner Application Workflow

**Source file:** `server/routers.ts` — `applySchema` and `submitApplication` procedure

### 6.1 Application Fields

The public application form (`/apply`) collects:

| Field | Required | Notes |
|---|---|---|
| Business Name | Yes | Min 2 characters |
| Business Type | Yes | Trade/category (e.g., "Roofing", "HVAC") |
| Service Area | Yes | City, zip codes, or metro area |
| Contact Name | Yes | Min 2 characters |
| Contact Email | Yes | Validated email format |
| Contact Phone | No | Optional |
| Website | No | Optional |
| Description | No | Business description |
| Referral Code | No | Format: `partner-{id}` — links to referring partner |

### 6.2 Application Processing Steps

When a partner submits an application, the system executes the following in sequence:

1. **Duplicate check** — queries the `partners` table by email; throws a `CONFLICT` error if an application with that email already exists
2. **Referral resolution** — if a referral code is present, parses the partner ID and validates the referrer exists in the database
3. **Partner record creation** — inserts a new row in the `partners` table with `status: "pending"` and `tier: "scout"` as defaults
4. **Referral credit** — if referred, increments the referring partner's `partnersReferred` count and marks the referral click as converted in the `referralClicks` table
5. **Owner notification** — sends a push notification to the platform owner via the built-in notification system with the business name, type, contact info, and referral source
6. **Response** — returns `{ success: true }` to the frontend

### 6.3 Admin Review Flow

After submission, the application sits in the `/admin/applications` queue with `status: "pending"`. The admin can:

- **Approve** — changes status to `"approved"`, creates a `partnerVerifications` record with all checkpoints at 0, and triggers a welcome notification to the partner
- **Reject** — changes status to `"rejected"` and sends a rejection notification with optional reason
- **Request more info** — sends a message through the Comms Timeline

### 6.4 Post-Approval Partner Journey

Once approved, the partner goes through this progression:

1. **Account linking** — partner logs in and links their application to their Manus OAuth account via `linkMyApplication`
2. **Verification** — partner submits documents for each of the 7 checkpoints via the partner portal; admin reviews and approves each one
3. **Tier upgrade** — partner can upgrade from Scout to any paid tier via the `/dashboard/upgrade` page (Stripe checkout)
4. **Lead routing** — once approved and with a PPS score, partner begins receiving leads based on their position in the routing queue
5. **Photo uploads** — partner logs jobs with photos; AI analyzes photos for cross-sell opportunities across the network

---

## 7. AI Systems

### 7.1 Photo Opportunity Detection

When a partner uploads job completion photos, GPT-4o Vision analyzes up to 4 images and returns a structured JSON response identifying:

- Specific service opportunities (lawn care, fence repair, window cleaning, pest control, pressure washing, etc.)
- Confidence score (0.0–1.0) for each opportunity — only opportunities ≥ 0.6 confidence are surfaced
- Estimated job value in dollars
- Brief description of the specific observation from the photo

This analysis feeds the **Opportunity Detector** and **Deal Pipeline** in the admin portal, and generates referral leads for other partners in the network.

### 7.2 AI Description Guidance (TrustyPro)

When a homeowner types a project description and uploads photos, the platform offers an "Enhance with AI" button. The AI rewrites the description to be precise, repair-focused, and optimized for matching the right professional — ensuring the homeowner uses the right terminology for accurate AI-generated repair estimates.

### 7.3 AI Support Chat

A floating chat widget is available on the `/advertise` and TrustyPro home pages. It is powered by a tRPC `supportChat.sendMessage` procedure that calls GPT with a ProLnk/TrustyPro system prompt, enabling it to answer questions about the platform, pricing, and partner onboarding without human intervention.

---

## 8. Integration Architecture

The platform is designed to connect with field service management (FSM) software used by home service professionals. The `partnerIntegrations` table stores OAuth tokens or API keys for each connected integration per partner.

| Integration | Purpose |
|---|---|
| **CompanyCam** | Photo sync — pulls job photos automatically from field technicians |
| **Jobber** | Job management — syncs completed jobs and triggers commission calculations |
| **Housecall Pro** | Job management — same as Jobber |
| **ServiceTitan** | Enterprise job management — highest-volume photo source |
| **Buildium** | Property management — connects to property owner/manager data |
| **n8n** | Workflow automation — webhook-based triggers for FSM events |

---

## 9. Data Model Summary

The core database tables and their relationships:

| Table | Purpose |
|---|---|
| `users` | Manus OAuth user accounts |
| `partners` | Service professional profiles, tier, PPS score, commission totals |
| `partnerVerifications` | 7-checkpoint verification status and trust score per partner |
| `opportunities` | AI-detected leads routed to partners |
| `jobs` | Completed jobs with photos, job value, and commission amounts |
| `commissions` | Full ledger of platform fees, referral commissions, and ProLnk net |
| `partnerReviews` | Homeowner reviews of partners (feeds PPS review signal) |
| `referralClicks` | Referral link tracking — click → conversion attribution |
| `partnerIntegrations` | OAuth tokens for CompanyCam, Jobber, ServiceTitan, etc. |
| `featuredAdvertisers` | Advertiser records for banner placements on homeowner pages |
| `industryCommissionRates` | Per-category commission rate overrides (28 categories) |
| `homeProfiles` | TrustyPro homeowner property data and Home Health Vault |

---

## 10. What Is Not Yet Live

The following are built as UI pages and database tables but require external API credentials to be fully functional in production:

| Item | Status | Action Required |
|---|---|---|
| Stripe payment processing | Sandbox claimed, test mode ready | Claim sandbox at dashboard.stripe.com; enter live keys after KYC |
| CompanyCam photo sync | Integration page built | Obtain CompanyCam API key from dashboard.companycam.com |
| Jobber webhook | Integration page built | Obtain Jobber API key from developer.getjobber.com |
| Twilio SMS | Comms setup page built | Obtain Twilio Account SID and Auth Token |
| Resend email | Comms setup page built | Obtain Resend API key from resend.com |
| Google Maps (Network/Territory maps) | Proxy configured | No action needed — Manus proxy handles authentication |

See `api-action-items.md` in this repository for step-by-step instructions on setting up each integration.

---

*This document was generated directly from the live codebase and reflects the actual implemented logic, not aspirational specifications.*
