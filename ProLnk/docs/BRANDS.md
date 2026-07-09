# ProLnk Brand Portfolio

**Parent Company**: LIT Ventures (investment group — not a brand)
**Number of Consumer/Operator Brands**: 6
**Mobile Apps**: 2 (ProLnk App, TrustyPro App)

All brands share a single backend with host-based routing. Brand detection via `x-brand` header (set by Next.js middleware on every request in the new Azure stack; via `window.__BRAND__` injection in the current Render/Vite stack).

---

## Brand Overview

| Brand | Audience | Type | Domain |
|-------|----------|------|--------|
| ProLnk | Individual service professionals | B2B | prolnk.xyz (canonical; prolnk.io retired-for-now — returns later) |
| ProLnk Exchange | SHELVED → future commercial marketplace | B2B | — |
| TrustyPro | Homeowners — consumer service requests | B2C | trustypro.io |
| TrustyPro Commercial | Commercial property owners (future, strategy-gated) | B2B/B2C hybrid | — |
| ProLnk Media | Ad product within ProLnk Partners — real estate, title companies, adjacent businesses | B2B | — |
| LNKD | Homeowner room scan → DIY product affiliate | B2C | lnkd.trustypro.io (TBD) |

**Mobile Apps**:
- **ProLnk App** — Service professionals (iOS + Android)
- **TrustyPro App** — Homeowners (iOS + Android)

**Note on LIT Ventures**: LIT Ventures is the investment group that funds the platform. It is NOT a consumer brand and should NOT appear as a brand in the product, routing logic, or user-facing interfaces. The internal operator/admin layer is **ProLnk Network** (see below).

---

## Brand 1: ProLnk

**Target Market**: Individual home service professionals (plumbers, electricians, HVAC, roofers, etc.)
**Position**: "Find quality leads, grow your business, build passive income"
**Domain**: prolnk.xyz (canonical; prolnk.io returns later when access restored)

### Brand Identity

**Color Palette**:
- Primary: slate #1E293B
- Accent: bronze #9A6A2F
- Background: warm white #FAFAF8
- (NO yellow/green/blue)

**Brand Voice**: Confident, peer-to-peer, action-oriented. Problem-solver focused.

### Value Props
1. Vetted homeowner leads in your service area
2. Control your schedule and pricing
3. 5-stream network income (recruit, earn overrides, build passive revenue)
4. Build permanent home data assets via Home Health Vault

### User Journey
- **Homepage**: Hero → CTA "Sign Up Free" → Features → Pricing
- **Signup**: Email → Password → Trade type → Service areas → Phone verification
- **Dashboard**: Lead feed, match history, earnings tracker, referral program, commission breakdown

### Mobile App: ProLnk App
- Lead queue with push notifications
- Accept / decline / counter-offer on leads
- Commission + override earnings dashboard
- Network downline view
- Profile + license management

### Features
- ✅ Waitlist signup (live)
- ✅ Confirmation email (live)
- ✅ Admin dashboard for waitlist (live)
- ⬜ Lead feed (Phase 1)
- ⬜ Dashboard login (Phase 1)
- ⬜ Commission tracking (Phase 1)
- ⬜ Network downline view (Phase 1)
- ⬜ Mobile app (Phase 2)

---

## Brand 2: ProLnk Exchange

**Target Market**: Commercial contractors, staffing agencies, commercial property managers
**Position**: "The job board for home services at commercial scale"
**Domain**: exchange.prolnk.io

### What It Is
A separate website (exchange.prolnk.io) that serves as a job board connecting job-finders ("Scouts") with ProLnk's network of professionals. Anyone — residential homeowners, commercial property managers, or general contractors — can post a job to the Exchange. Scouts can source, quote, and sell large jobs on the board. Pros on ProLnk bid on and claim the work.

**The Scout Role**: A Scout is a qualified user of ProLnk Exchange who can assess and quote large-scope jobs (residential or commercial), post them to the job board, and earn a fee when the job is filled by a ProLnk professional. Scouts do not have to be service professionals themselves — they can be project managers, estimators, or business development people who are good at finding and scoping work. This creates a fast path for large jobs to get matched quickly.

**Integration with ProLnk**: Pros on Business/Enterprise subscription plans have access to ProLnk Exchange. When a job is posted to the Exchange, qualified pros in the relevant service area and trade category can bid. The Exchange feeds residential AND commercial jobs into the ProLnk matching engine.

### Key Differences from ProLnk Core
- Jobs posted by commercial clients or property managers (not individual homeowners)
- Contractors submit bids (not instant match)
- Jobs can be multi-phase, multi-trade
- Higher job values ($5K–$500K+)
- Company profiles, not individual pro profiles

### Schema Needs (Not Yet Built)
- `company_profiles` — contractor companies (distinct from individual `partners`)
- `job_postings` — commercial job listings with scope, timeline, budget
- `job_applications` / `job_bids` — bid tracking with versioning
- `commercial_contracts` — signed agreements
- `commercial_commissions` — separate commission logic from residential

### Features
- ⬜ Company profile creation
- ⬜ Job board (search, filter by trade, location, value)
- ⬜ Bid submission and tracking
- ⬜ Admin review and routing
- ⬜ Commission on placed jobs

---

## Brand 3: TrustyPro

**Target Market**: Homeowners seeking vetted service professionals
**Position**: "Find a trusted pro without the guesswork"
**Domain**: trustypro.io

### Brand Identity

**Color Palette**:
- Primary: indigo #4F46E5
- Secondary: #F9A825 (warm gold)
- Neutral: #4A4A4A (medium gray)

**Brand Voice**: Warm, protective, reassuring. "We've done the vetting so you don't have to."

### User Journey
- **Homepage**: Hero → How It Works → Why TrustyPro → CTA
- **Request Flow**: 2-step inline form (create account + submit request without leaving page)
  - If already logged in: opens at Step 2 directly
- **AI Photo Analysis**: Upload 1–5 photos → Claude Vision returns deficiency list, severity, measurements, scope badge, auto-detected category
- **Dashboard**: Active requests, matched pros, deal pages, service history

### Mobile App: TrustyPro App
- Submit and track service requests
- Photo upload with AI analysis
- Chat with matched pros
- Payment and deal confirmation
- Home Health Vault access

### Features
- ✅ Homeowner waitlist signup (live)
- ✅ Confirmation email (live)
- ⬜ Full inline registration + request flow (Phase 1)
- ⬜ AI photo analysis — Claude Vision (Phase 1)
- ⬜ Homeowner dashboard (Phase 1)
- ⬜ Deal/tokenized pages (Phase 1)
- ⬜ Mobile app (Phase 2)

---

## Brand 4: TrustyPro Commercial

**Target Market**: Commercial property owners, HOAs, property management companies
**Position**: "Managed service for commercial properties"
**Domain**: commercial.trustypro.io

### What It Is
A commercial-facing variant of TrustyPro for higher-value, recurring, or multi-unit service needs. Distinct from the consumer TrustyPro flow.

### Key Differences from TrustyPro Core
- Multi-property management under one account
- Recurring service contracts (not one-off requests)
- Bulk RFQ (request for quote) across multiple addresses
- Procurement-style approval flows
- Higher job values, different ProLnk platform fee tier (see COMMISSION.md)

### Schema Needs (Not Yet Built)
- `commercial_accounts` — property management company accounts
- `commercial_properties` — portfolio of managed addresses
- `commercial_service_requests` — bulk/recurring request model
- `commercial_contracts` — ongoing service agreements
- `commercial_invoices` — invoicing separate from consumer payment flow

### Features
- ⬜ Commercial account onboarding
- ⬜ Multi-property dashboard
- ⬜ Bulk service request submission
- ⬜ Contract management

---

## Brand 5: ProLnk Media

**Target Market**: Real estate agents, title companies, mortgage lenders, home warranty companies, and other businesses that benefit from reaching homeowners and service professionals
**Position**: "Reach homeowners and pros at the point of need"
**Domain**: media.prolnk.io

### What It Is
An advertising platform that lets adjacent businesses (real estate, title, mortgage, home warranty, insurance) place targeted ads within the ProLnk and TrustyPro ecosystems at the moment homeowners and pros are actively engaged with home services.

### Targeting Parameters
- Homeowner zip code / service area
- Job category (roofing, HVAC, plumbing, etc.)
- Homeowner profile (property value, ownership status)
- Pro tier and market

### Pricing Models (TBD)
- CPM (cost per thousand impressions)
- CPC (cost per click)
- Flat monthly placement (category + geo exclusive)
- Lead referral fee (advertiser pays per converted homeowner referral)

### Schema Needs (Not Yet Built)
- `advertiser_accounts` — media buyer profiles
- `ad_campaigns` — campaign setup, budget, targeting rules
- `ad_placements` — where/when ads appear in the product
- `ad_impressions` / `ad_clicks` — tracking
- `media_invoices` — billing for advertisers

### Features
- ⬜ Advertiser self-serve portal (or direct sales)
- ⬜ Ad placement in TrustyPro request flow and homeowner dashboard
- ⬜ Ad placement in ProLnk lead feed and dashboard
- ⬜ Analytics dashboard for advertisers
- ⬜ Billing and invoicing

---

## Brand 6: LNKD

**Target Market**: Homeowners who want to plan renovations or purchase home products
**Position**: "Scan your room, shop the upgrade"
**Domain**: TBD (likely lnkd.trustypro.io or lnkd.io if available)

### What It Is
A feature (potentially its own brand) within the TrustyPro ecosystem where homeowners can scan a room using their phone camera, then receive an AI-curated product overlay — showing materials, fixtures, and products relevant to that room with affiliate purchase links. Homeowners can buy directly or request a pro to install.

### Revenue Model
- Affiliate commission on product purchases (Amazon, Home Depot, Lowe's, etc.)
- Lead referral to TrustyPro pros for installation requests

### Technical Requirements (Not Yet Scoped by Dev Team)
- Room scanning: ARKit (iOS) / ARCore (Android) or third-party SDK (Polycam, Matterport, or simplified photo-based)
- Product catalog: integration with affiliate APIs (Amazon Product API, Home Depot API)
- AI product matching: map detected room features to relevant products
- Affiliate link tracking: click attribution, conversion tracking

### Schema Needs (Not Yet Built)
- `room_scans` — scan session metadata, photo references
- `scan_products` — products surfaced per scan, with affiliate links
- `affiliate_clicks` — click tracking for attribution
- `affiliate_conversions` — purchase confirmation (via affiliate webhook)
- `diy_requests` — when homeowner requests a pro for installation instead of DIY

### Features
- ⬜ Technical stack decision (ARKit/ARCore vs. photo-based)
- ⬜ Room scan UI in TrustyPro App
- ⬜ Product overlay and recommendation engine
- ⬜ Affiliate link generation and tracking
- ⬜ "Get a Pro to Install This" → routes to TrustyPro request flow

---

## ProLnk Network (Internal Operator Layer)

**Audience**: Platform operators (LIT Ventures team + admins)
**Domain**: Internal / network.prolnk.io

This is NOT a consumer brand. It is the internal admin and operator layer for managing the platform. It includes:
- Platform-wide KPI dashboard (leads, jobs, commissions, revenue)
- Partner management (approve, suspend, tier overrides)
- Commission calculation oversight and dispute resolution
- Brand configuration (feature flags, pricing overrides)
- Audit log and compliance reporting
- Network tier management

**Note**: The dev team's current README calls this the "LIT Ventures" operator layer. It should be renamed to **ProLnk Network** in all code, routing logic, and documentation.

---

## Technical: Host-Based Routing

All brands share one backend. Brand is detected from the request hostname and set as the `x-brand` header via Next.js middleware:

```typescript
// middleware.ts
const hostname = request.headers.get('host') || '';
const brand = detectBrand(hostname); // 'prolnk' | 'prolnk-exchange' | 'trustypro' | 'trustypro-commercial' | 'prolnk-media' | 'lnkd'
request.headers.set('x-brand', brand);
```

### Domain → Brand Mapping

| Domain | Brand Key | Route Group |
|--------|-----------|-------------|
| prolnk.io / prolnk.xyz | `prolnk` | /(prolnk) |
| exchange.prolnk.io | `prolnk-exchange` | /(exchange) |
| trustypro.io | `trustypro` | /(trustypro) |
| commercial.trustypro.io | `trustypro-commercial` | /(trustypro-commercial) |
| media.prolnk.io | `prolnk-media` | /(media) |
| lnkd.trustypro.io | `lnkd` | /(lnkd) |
| network.prolnk.io | `prolnk-network` | /(admin) |

**Note on prolnk.io**: This domain is currently held by Manus (prior AI build platform). prolnk.xyz is the live domain and will redirect to prolnk.io once the domain is released. All architecture should support both domains pointing to the same deployment.

---

## Domain Situation

| Domain | Status | Action Needed |
|--------|--------|---------------|
| prolnk.xyz | Live on Render | Keep live during full rebuild |
| trustypro.io | Live on Render | Keep live during full rebuild |
| prolnk.io | Locked in Manus | Contact Manus to release |
| exchange.prolnk.io | Not configured | Set up after prolnk.io is released |
| media.prolnk.io | Not configured | Set up when ProLnk Media launches |
| commercial.trustypro.io | Not configured | Set up when TrustyPro Commercial launches |

---

## Phase Launch Plan

| Phase | Brands / Features | Timeline |
|-------|------------------|----------|
| P0 (Render/Vite) | ProLnk waitlist, TrustyPro waitlist | Live |
| P1 | ProLnk full, TrustyPro full, ProLnk Network admin | Q3 2026 |
| P2 | Mobile apps (ProLnk App + TrustyPro App) | Q4 2026 |
| P3 | ProLnk Partners (incl. Media ad product) | Q1 2027 |
| P4 | TrustyPro Commercial (strategy-gated) | 2027 |
| P5 | LNKD (room scan + affiliate) | 2027 |
| P6 | ProLnk Exchange (future commercial marketplace — currently SHELVED) | TBD |
