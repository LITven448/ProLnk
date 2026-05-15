# ProLnk / TrustyPro — Backend Requirements Document (BRD)

**Document Version:** 1.0  
**Date:** May 14, 2026  
**Prepared For:** Backend Architecture Team  
**Prepared By:** Senior Product Strategy (grounded in live codebase audit)  
**Classification:** Internal — Engineering Confidential

---

## 1. Executive Summary

ProLnk / TrustyPro is a two-sided, AI-augmented home services marketplace built by LIT Ventures. The platform connects vetted home service professionals (Partners) with homeowners needing quotes, repairs, and ongoing maintenance. It is not a simple lead-gen site — it is a multi-income network with a four-level referral cascade, AI photo analysis that generates its own leads, a storm dispatch system, a Home Health Vault data asset, and a fully automated commission-collection engine triggered by homeowner confirmation rather than pro self-reporting.

The backend must simultaneously serve:
- A franchise-like partner network (2,125 founding slots, growing to 50,000+ nationally)
- An AI lead generation pipeline (photo intake → opportunity detection → admin review → dispatch)
- A real-time routing and re-routing engine (5-minute sweep cron, 24-hour lead expiry)
- A multi-stream commission ledger with network cascade calculations
- A homeowner-facing property vault and booking system
- A storm intelligence feed that auto-creates leads for affected ZIP codes

The current stack is a Node.js / Express / tRPC monorepo on Render, backed by TiDB Cloud (MySQL-compatible), with 130+ tables already defined in Drizzle ORM. This BRD describes every backend system a senior architect needs to plan, prioritize, and build.

**Launch target:** MVP is live collecting waitlist signups. Full transactional platform is the Phase 2 target.

---

## 2. Platform Architecture Overview

### 2.1 Host-Based Multi-Brand Routing

The same backend binary serves two consumer brands from one codebase:

```
prolnk.io      → window.__BRAND__ = 'prolnk'    (Partner portal, network income, B2B)
trustypro.io   → window.__BRAND__ = 'trustypro'  (Homeowner portal, consumer-facing)
```

Brand detection occurs in `server/_core/vite.ts` via the `Host` header. API routes are shared. The backend must maintain this single-binary model through Phase 3, with the option to split into microservices if load dictates.

### 2.2 Request Lifecycle

```
Client Request
    ↓
Render Load Balancer (TLS termination)
    ↓
Express Server
    ↓
/trpc/* → tRPC Router → Procedure (public | protected | admin)
/api/*  → REST endpoints (Stripe webhooks, OAuth callbacks, integrations)
/deal/* → Public tokenized deal pages (no auth)
    ↓
Drizzle ORM → TiDB Cloud (MySQL)
    ↓
Background Jobs → Inngest (event-driven + cron)
    ↓
External APIs (Stripe, Twilio, Resend, Anthropic, Tomorrow.io, ATTOM, Smarty, Checkr)
```

### 2.3 Architectural Principles

1. **tRPC-first:** All client-facing API surface goes through tRPC. REST is reserved for third-party webhooks and legacy OAuth flows only.
2. **Event-sourcing for financials:** Every commission event is an immutable ledger record. Payouts are derived from the ledger, never edited.
3. **Admin-review gate on AI leads:** Photo AI outputs always land in `adminReviewStatus = 'pending_review'` before any partner is notified. This is intentional for quality control and RESPA compliance.
4. **Zero self-reporting commissions:** Commission collection triggers on homeowner confirmation (check-in), not partner self-report. This is a patent claim (Claims 20–23).
5. **Idempotency on all financial mutations:** Every Stripe event is processed at most once, tracked in `processedStripeEvents`.
6. **Separation of concerns — intake vs. dispatch:** `intake-router.ts` handles ingestion and AI analysis. `dispatchLeadToPartner()` handles assignment. These should remain separate execution contexts (separate Inngest functions, separate timeout budgets).

---

## 3. User Roles and Permissions Matrix

| Role | Auth Level | tRPC Procedure | Key Capabilities |
|------|-----------|----------------|-----------------|
| Anonymous | None | `publicProcedure` | View marketing pages, submit waitlist, view deal page by token |
| Homeowner | JWT (role: `user`) | `protectedProcedure` | Manage property vault, receive/accept deals, confirm jobs, rate partners |
| Partner (Scout) | JWT (role: `partner`) | `protectedProcedure` | Log jobs, upload photos, view lead queue, view earnings, manage profile |
| Partner (Pro/Crew/Company/Enterprise) | JWT (role: `partner`) | `protectedProcedure` | Above + more lead slots, more ZIP codes, expanded analytics |
| Founding Partner | JWT (role: `partner`, `isFoundingPartner: true`) | `protectedProcedure` | All partner features + locked $149/mo rate + founding tier badge |
| Scout/Field Agent | JWT (role: `agent`) | `protectedProcedure` | Recruit pros, earn per signup, view agent dashboard, manage referral pipeline |
| Admin | JWT (role: `admin`) | `adminProcedure` | Full platform access: approve leads, manage partners, view all financials, override settings |
| Super Admin | JWT (role: `superadmin`) | `adminProcedure` | Above + system settings, tier config changes, exempt partner management |
| Franchise Operator | JWT (role: `franchise`) | `protectedProcedure` | Territory-scoped partner management, regional analytics (Phase 3) |
| Investor | JWT (role: `investor`) | `protectedProcedure` | Read-only financial dashboards (Phase 3) |

### 3.1 Permission Enforcement Rules

- `adminProcedure` checks `ctx.user.role === 'admin'` (or `'superadmin'`).
- `protectedProcedure` checks `ctx.user` exists (JWT validated).
- Partner-scoped queries must always filter by `partnerId` derived from `ctx.user.id`, never from client input alone — prevents horizontal privilege escalation.
- Admin audit log (`adminAuditLog` table) must record every `adminProcedure` mutation with: admin user ID, action, affected entity ID, before/after values, timestamp.

---

## 4. Core Domain Models and Data Relationships

The live schema has 130+ tables. Below are the primary domain entities and their critical foreign key chains.

### 4.1 Primary Entity Graph

```
users
  └── partners (userId FK)          # Service pro profile
  └── homeownerProfiles (userId FK) # Consumer profile
  
partners
  └── jobs (partnerId FK)                    # Field jobs logged by partner
  └── opportunities (sourcePartnerId FK)      # Leads generated from partner's jobs
  └── opportunities (receivingPartnerId FK)   # Leads dispatched to this partner
  └── commissions (payingPartnerId / receivingPartnerId)
  └── partnerIntegrations (partnerId FK)      # Connected FSM tools
  └── photoIntakeQueue (partnerId FK)         # Photos pending AI processing
  └── partnerPerformanceScores (partnerId FK)
  └── proNetworkProfile (user_id FK)          # Network income profile
  └── proUplineChain (proUserId / uplineUserId)  # 4-level upline mapping

jobs
  └── photoIntakeQueue (jobId FK, reverse)
  └── opportunities (jobId FK)
  └── jobPayments (jobId FK)

opportunities
  └── customerDeals (opportunityId FK)   # Tokenized homeowner deal page
  └── commissions (opportunityId FK)
  └── funnelEvents (opportunityId FK)
  └── acceptanceSignals (opportunityId FK)

customerDeals
  └── partnerReviews (dealId FK)
  └── homeownerReviews (dealId FK)
  └── jobPayments (dealId FK)
  └── paymentMilestones (jobPaymentId FK)
  └── homeownerCheckins (dealId FK)

homeownerProfiles
  └── properties (ownerId FK)           # 1:many — one homeowner, many properties
  
properties
  └── propertyImprovements (propertyId FK)
  └── homeMaintenanceLogs (propertyId FK)
  └── homeSystemHealth (propertyId FK)
  └── propertyDocuments (propertyId FK)
  └── homeHealthVaultScores (propertyId FK)
  └── stormLeads (propertyId FK)

stormEvents
  └── stormLeads (stormEventId FK)      # Storm → auto-generated leads

proNetworkProfile
  └── proUplineChain (proUserId)        # Materialised 4-level upline
  └── jobCommissionEvent (proUserId)    # Every job generates cascade events
  └── commissionPayout (recipientUserId)
```

### 4.2 Commission Domain Tables (Critical)

| Table | Purpose |
|-------|---------|
| `commissions` | Immutable ledger of every commission record (referral + network) |
| `jobCommissionEvent` | One record per job, contains all cascade calculations |
| `commissionPayout` | Monthly payout summaries per partner |
| `proUplineChain` | Denormalized upline chain (levelsAbove 1–4) for O(1) cascade lookup |
| `proNetworkProfile` | Network level (1=Charter, 4=Standard), referral code, enrollment date |
| `payoutRequests` | Manual payout request records with Stripe transfer IDs |
| `industryRates` | Per-industry platform fee overrides |
| `TIER_CONFIG` | In-code tier constants (scout/pro/crew/company/enterprise) |

### 4.3 Data Integrity Requirements

- `proUplineChain` must be rebuilt atomically on every new partner enrollment. Use a transaction that inserts the new partner's `proNetworkProfile` and all upline rows in a single DB transaction.
- `commissions` rows are append-only. No UPDATE on amount, payingPartnerId, or receivingPartnerId after creation. Disputes create new resolution rows.
- `processedStripeEvents` enforces idempotency — check before processing any Stripe webhook.
- `weeklyLeadsReceived` on `partners` resets every Monday at 00:00 CST via Inngest cron.

---

## 5. API Architecture Requirements

### 5.1 tRPC Router Registry

The following 55 routers are currently defined. They must be connected to the main `appRouter` and type-exported for the React client:

**Partner Domain:** `partnerAuth`, `partnerOAuth`, `partnerScore`, `partnerTools`, `profile360`, `verification`, `partnerScore`, `proPass`

**Network / Commission Domain:** `network`, `networkOverrides`, `commissions`, `payments`, `scout`, `rewardful`

**Lead / Dispatch Domain:** `photoQueue`, `photo-pipeline`, `integrations`, `integrationWebhooks`, `smartRoute`, `exchange`, `projectBids`, `quickQuote`, `bidBoard`

**Homeowner / Property Domain:** `homeownerExtras`, `homeHealthScore`, `fsmVault`, `propertyEnrichment`, `seasonalMaintenance`, `roomMakeover`, `homePassport (to build)`

**Admin Domain:** `adminDisputes`, `adminExtras`, `waitlistAdmin`, `analyticsAdmin`, `commandCenter`, `brainTrust`, `dataIntelligence`, `diagnosticAgent`, `automationRules`

**Comms Domain:** `supportChat`, `reviews`, `engagement`, `marketingAutomation`, `mediaLibrary`

**External Integrations:** `checkr`, `insuranceClaims`, `realEstateAgents`, `featuredAdvertisers`, `facility`, `bundleOffers`, `briefcase`, `serviceArea`

**Waitlist:** `waitlist`

### 5.2 REST Endpoints (Non-tRPC)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/webhooks/stripe` | POST | Stripe event ingestion (charge.succeeded, payout.paid, subscription events) |
| `/api/webhooks/twilio` | POST | Inbound SMS, delivery status |
| `/api/webhooks/companycam` | POST | Photo upload events from CompanyCam |
| `/api/webhooks/jobber` | POST | Job completion events from Jobber |
| `/api/webhooks/housecall-pro` | POST | Job events from HouseCall Pro |
| `/api/webhooks/servicetitan` | POST | Job sync from ServiceTitan |
| `/api/webhooks/checkr` | POST | Background check status updates |
| `/api/auth/callback` | GET | OAuth callback handler |
| `/api/deal/:token` | GET | Public tokenized deal page data |
| `/api/healthz` | GET | Render health check |
| `/api/admin/impersonate` | POST | Admin session impersonation |

### 5.3 API Versioning Strategy

All tRPC procedures are currently unversioned. For Phase 2:
- Introduce `/api/v2/` namespace for breaking changes.
- tRPC procedures should not change input/output shape — add new procedures instead of modifying existing ones.
- All external webhook endpoints must remain stable across versions.

### 5.4 Rate Limiting

| Endpoint Class | Limit | Window |
|----------------|-------|--------|
| `publicProcedure` (unauthenticated) | 60 req | 1 minute per IP |
| `publicProcedure` (waitlist submit) | 5 req | 1 hour per IP |
| `protectedProcedure` (authenticated) | 300 req | 1 minute per user |
| `adminProcedure` | 600 req | 1 minute per admin |
| Photo upload endpoint | 20 req | 1 minute per partner |
| `/api/webhooks/*` | Unlimited (verify signature) | — |

Current implementation: `server/_core/rateLimit.ts` exists. Verify it is applied to all public procedures before Phase 2 launch.

---

## 6. Authentication and Authorization

### 6.1 Current Auth Architecture

The system uses JWT-based sessions. Key files:
- `server/_core/context.ts` — builds `TrpcContext` from request headers
- `server/_core/cookies.ts` — JWT encoding/decoding
- `server/routers/partnerAuth.ts` — partner login/signup procedures
- `server/routers/partnerOAuth.ts` — OAuth integration
- `drizzle/schema.ts: userPasswords` — password credential storage
- `ENV.cookieSecret` = `JWT_SECRET` env var

### 6.2 JWT Payload Requirements

```typescript
{
  sub: string,           // users.id (numeric, as string)
  role: UserRole,        // 'user' | 'partner' | 'admin' | 'superadmin' | 'agent'
  partnerId?: number,    // if role === 'partner'
  isFoundingPartner?: boolean,
  iat: number,
  exp: number            // 30-day expiry for partners, 24h for admin
}
```

### 6.3 Auth Flows to Build (Phase 2)

**Email/Password Flow (Partners):**
1. POST `/trpc/partnerAuth.register` → validate, hash password (bcrypt, cost 12), insert `users` + `partners` rows, send verification email via Resend
2. POST `/trpc/partnerAuth.verifyEmail` → validate token, set `users.emailVerifiedAt`
3. POST `/trpc/partnerAuth.login` → bcrypt compare, issue JWT, return `Set-Cookie`
4. POST `/trpc/partnerAuth.forgotPassword` → generate token, store hash in `userPasswords.resetToken`, send email
5. POST `/trpc/partnerAuth.resetPassword` → validate token, hash new password, clear token

**OAuth Flow (Partners):**
- Google OAuth via `server/_core/oauth.ts`
- Callback inserts/updates `users.openId`, issues JWT
- Must handle case where Google account was used but partner profile doesn't exist yet → redirect to onboarding

**Homeowner Flow (TrustyPro):**
- Same email/password flow, role = `'user'`
- Phone number verification via Twilio OTP (Phase 2)

**Admin Flow:**
- Admin accounts created manually or by superadmin
- IP allowlist for admin console (Phase 2)
- Session expiry: 8 hours with refresh

### 6.4 Security Requirements

- Passwords: bcrypt with cost factor 12 minimum
- JWTs: RS256 (asymmetric) in production, HS256 acceptable in development
- All tokens (email verify, password reset, deal page): cryptographically random, minimum 32 bytes, stored as SHA-256 hash in DB
- CSRF: `SameSite=Strict` on session cookies, `Origin` header validation on mutations
- Token rotation: Refresh tokens issued on login, revocable via `userPasswords.refreshTokenHash`

---

## 7. Booking and Dispatch System

### 7.1 Lead Lifecycle State Machine

```
CREATED (opportunity inserted)
    ↓
PENDING_REVIEW (adminReviewStatus = 'pending_review')
    ↓ [admin approves]
SENT (status = 'sent', leadExpiresAt = now + 24h)
    ↓ [partner accepts within 24h]
ACCEPTED (status = 'accepted', acceptedAt = now)
    ↓ [partner confirms job start]
IN_PROGRESS (customerDeal.status = 'in_progress')
    ↓ [homeowner confirms completion via check-in]
COMPLETED (homeownerCheckins confirmed, payments triggered)
    ↓ [commissions paid]
CLOSED
    
    OR
    
SENT → [24h elapsed, no response] → EXPIRED → re-route to next in routingQueue
SENT → [partner declines] → DECLINED → re-route to next in routingQueue
[routingQueue exhausted] → FINAL_EXPIRED (status = 'expired', no further routing)
```

### 7.2 Lead Routing Algorithm

Implemented in `server/intake-router.ts: createOpportunitiesForAdminReview()`. Logic:

1. Filter `partners` where `status = 'approved'`
2. Filter by `businessType` matching `CATEGORY_MAP[opportunity.category]`
3. Exclude source partner (no self-referral)
4. Exclude partners at weekly lead capacity (`weeklyLeadsReceived >= weeklyLeadCap`)
5. Score remaining partners:
   - Base: `partner.priorityScore` (0–100, computed nightly by PPS engine)
   - Founding partner bonus: +5
   - Tier fallback if PPS not yet computed
6. Sort descending by score
7. Store ordered array of partner IDs as `routingQueue` (JSON)
8. First in queue = initial `receivingPartnerId`

**PPS (Partner Priority Score) formula — nightly recalculation:**

```
PPS = tier_score(30) + close_rate(20) + acceptance_rate(15) 
    + photo_count(15) + review_score(10) + network_referrals(5) 
    + response_speed(5) + founding_bonus(+5)
```

Maximum score: 105. Stored in `partners.priorityScore`. Recomputed by Inngest cron nightly.

### 7.3 Expired Lead Sweep

`sweepExpiredLeads()` runs every 5 minutes via Inngest cron. Selects all `opportunities` where `status = 'sent' AND leadExpiresAt < now`. For each:
- Call `advanceLeadRouting(id, 'expired')`
- If `routingPosition >= routingQueue.length`: mark `status = 'expired'`
- Else: advance to next partner in queue, reset `leadExpiresAt = now + 24h`, send notifications

### 7.4 Booking Flow (Phase 2 — Full Transactional)

1. Homeowner visits `trustypro.io`, enters address
2. Backend validates address via Smarty Streets (address validation + USPS standardization)
3. Backend enriches property data from ATTOM API (year built, sq ft, property type)
4. Check if address exists in `properties` / `propertyProfiles` — if yes, load vault history
5. Return 3 best matching partners (by PPS, distance, trade match, response rate)
6. Homeowner selects partner → creates `customerDeal` with `status = 'pending_quote'`
7. Partner receives push notification + SMS + email
8. Partner views deal, accepts → `status = 'quote_sent'`
9. Partner submits quote → homeowner approves → `status = 'scheduled'`
10. Job date set → `paymentMilestones` created (deposit 30%, balance 70%)
11. Homeowner adds card via Stripe SetupIntent
12. Job start confirmed → charge deposit
13. Job completed → homeowner check-in → charge balance → trigger commission cascade

### 7.5 Deal Page Architecture

Each `customerDeal` gets a unique `token` (64-char hex). Public URL: `/deal/:token`. No auth required.

The deal page must:
- Display AI-generated issue description, photo, estimated value range
- Collect homeowner name, phone, email (stored on `customerDeals`)
- Support scheduling via Cal.com integration (`calBookingId`)
- Display the AI-generated visual fix preview image (`aiFixImageUrl`)
- Track view events (`viewCount`, `firstViewedAt`, `lastViewedAt`)
- Accept homeowner job confirmation with rating (triggers commission cascade)
- Support e-signature (`signatureData`, `signedAt`, `signerName`)
- Expire at `expiresAt` (48h from sent)

---

## 8. Lead Management System

### 8.1 Lead Sources

| Source | Ingestion Point | Initial Status |
|--------|----------------|----------------|
| Photo AI pipeline | `intake-router.ts: enqueuePhoto()` | `pending` → `pending_review` |
| Storm dispatch | `stormEvents` → `stormLeads` → auto-create opportunities | `pending_review` |
| Homeowner direct request | `serviceRequests` table, admin creates opportunity | `pending_review` |
| Partner referral | Manual via admin dashboard | `pending_review` |
| Exchange marketplace | `exchangeJobs` → `exchangeBids` → awarded partner | Separate flow |
| Quick Quote | `quickQuoteRequests` → route to best partner | `pending_review` |

All sources converge at the admin review gate before dispatch. This is required for quality control and RESPA compliance.

### 8.2 Lead Scoring

AI-generated leads have an `aiConfidence` score (0.0–1.0). Leads with `confidence < 0.35` are auto-skipped (not inserted as opportunities). Admin dashboard shows confidence distribution to tune this threshold.

Manual `leadScore` (0–100) applied by Lead Scorer AI agent incorporates:
- Homeowner verification status
- Property data completeness
- Service request urgency signals
- Budget indication
- Historical acceptance rate for this ZIP

### 8.3 Exchange Marketplace

`exchangeJobs` / `exchangeBids` tables implement a separate peer-to-peer job exchange where partners can post overflow work and accept bids from other partners. This is a secondary lead channel. Commission structure differs (partner-to-partner fee, not homeowner-to-platform). Full spec in `server/routers/exchange.ts`.

### 8.4 Lead Circumvention Detection

`circumventionFlags` table tracks cases where a partner may be attempting to take the job off-platform (direct contact with homeowner to avoid platform fee). Detection signals:
- Partner and homeowner exchanging contact info via in-platform messages (regex detection)
- Job completed but no Stripe payment recorded
- Homeowner check-in not submitted within expected window

Automated flag → admin review → strike system (`partners.strikeCount`). Three strikes → suspension.

---

## 9. Commission and Payment Architecture

**This is the most complex system in the platform. Read carefully.**

### 9.1 Two Commission Systems in Parallel

The platform operates two distinct commission flows that must not be conflated:

**System A: Job Commission (Direct Referral)**
The partner whose technician identified the opportunity earns a referral commission when the job closes.

**System B: Network Override (4-Level MLM Cascade)**
Partners who recruited other partners earn an override on every job those downline partners close.

### 9.2 System A — Job Commission Math

```
Given:
  jobValue = $10,000
  platformFeeRate = 10% (capped for large jobs: 12% default, 10% if job ≥ $2,500, 8% if ≥ $10,000, 6% if ≥ $50,000)
  partnerTier = 'company' → commissionKeepRate = 0.72
  
Calculation:
  platformFeeAmount    = $10,000 × 10% = $1,000
  referralCommission   = $1,000 × 72% = $720    → paid to referring partner
  proLinkNet           = $1,000 - $720 = $280    → retained by platform
  receivingPartnerPayout = $10,000 - $1,000 = $9,000 → paid to receiving partner
```

**Tier keep rates (from live schema `TIER_CONFIG`):**
| Tier | Monthly Fee | Keep Rate | Weekly Lead Cap | ZIP Cap |
|------|------------|-----------|-----------------|---------|
| Scout | $0 | 40% | 5 | 5 |
| Pro | $29 | 55% | 15 | 15 |
| Crew | $79 | 65% | 30 | 30 |
| Company | $149 | 72% | 60 | 60 |
| Enterprise | $299 | 78% | Unlimited | Unlimited |

**Monthly commission cap:** Scout tier is capped at $500/month. Once hit, referralCommission = $0 for remainder of month. Resets on 1st of month.

**Exempt partners:** `isExempt = true` → platformFeeRate = 0, keepRate = 1.0. Used for founding/charter arrangements.

### 9.3 System B — Network Override Cascade Math

From `shared/const.ts: NETWORK_RATES`:

```
Network Levels: 1=Charter, 2=Founding, 3=Growth Pro, 4=Standard Pro
Own-job rates: L1=2.0%, L2=1.5%, L3=1.0%, L4=0.5% of job value
Network income depth:
  L1 Charter earns on 3 levels below them (L2, L3, L4)
  L2 Founding earns on 2 levels below (L3, L4)
  L3 Growth earns on 1 level below (L4)
  L4 Standard earns nothing on downline
```

**Cascade calculation on a $10,000 job:**
```
Receiving partner (L4 Standard): earns 0.5% = $50 own-job commission
Their upline L3: earns 1.0% = $100 network income
Their upline L2: earns 1.5% = $150 network income  
Their upline L1: earns 2.0% = $200 network income
Total cascade payout: $500 from platform
```

**Subscription Override Rates:**
```
Partner at L1 earns 12% of $149/mo on every L2 they recruited directly
Partner at L2 earns 6% on L3 they recruited
Partner at L3 earns 3% on L4 they recruited
Partner at L4 earns 1.5% on anyone they recruited
```

**Activity requirement:** L1, L2, L3 must log minimum 2 jobs/month to earn network income. `NETWORK_RATES.minimumJobsPerMonth = 2`.

### 9.4 Upline Chain Materialization

`proUplineChain` table is a denormalized, pre-computed mapping of every partner's full upline:

```sql
pro_upline_chain:
  proUserId       -- the partner who earned the job
  uplineUserId    -- each upline partner
  levelsAbove     -- 1, 2, 3, or 4
  uplineNetworkLevel -- the upline's own network level (1-4)
```

**This table must be rebuilt transactionally when any new partner enrolls.** The `network.ts: enroll()` mutation handles this. The chain must walk up to 4 levels and insert one row per level found.

**Critical:** Circular reference check is required at enrollment time. If partner A referred B, and B tries to use A's referral code, the system must detect and reject this.

### 9.5 Payment Architecture — Stripe Integration

**Flow A: Standard Card-on-File Job**

```
1. homeownerPaymentMethods.setupIntentId = Stripe SetupIntent created
2. Homeowner confirms payment method → PaymentMethod ID stored encrypted
3. Job start confirmed → Stripe PaymentIntent created (30% deposit)
4. jobPayments.depositChargeId = PaymentIntent ID
5. Homeowner check-in confirms completion → Stripe PaymentIntent (70% balance)
6. Platform auto-splits via Stripe Connect:
   - Transfer to receivingPartner.stripeConnectAccountId: jobValue - platformFee
   - Commission retained in platform account
7. commissions rows inserted (immutable ledger)
8. commissionPayout updated for month
```

**Flow B: Insurance Job ACH Debit**

```
1. Partner flags job as insurance_funded
2. Partner signs ACH authorization stored in achAuthorizations
3. Homeowner confirms completion
4. Platform pulls platformFeeAmount from partner's bank account via Stripe ACH
5. Referring partner commission transferred from platform balance
```

**Stripe Connect Architecture:**
- Platform = Stripe Connect platform account
- Each partner = connected account (`stripeConnectAccountId` in `stripeConnectOnboarding`)
- Payouts use destination charges, not separate transfers, for simplicity
- Partners who haven't completed Stripe Connect onboarding cannot receive payouts
- `stripeConnectStatus` tracks: `'not_connected'` | `'pending'` | `'active'` | `'restricted'`

**Subscription Billing:**
- Partners subscribe at `$149/mo` (or tier-appropriate amount) via Stripe Subscriptions
- `subscriptionPlan` on `partners` stores Stripe `sub_` ID
- Failed payment → 3-day grace period → suspension → eventual deactivation
- Founding network: $149 locked rate permanently

**Nightly Payout Sweep:**
- Inngest cron: nightly at 02:00 CST
- Collect all `commissions` where `paid = false` and `createdAt < now - 24h`
- Group by `receivingPartnerId`
- Sum eligible commissions
- Skip if sum < `NETWORK_RATES.payoutMinimumThreshold` ($50)
- Create `payoutRequests` record
- Execute Stripe transfer to partner's Connect account
- Mark `commissions.paid = true`, `paidAt = now`
- Update `commissionPayout` monthly summary
- Send payout confirmation email via Resend

### 9.6 Commission Dispute System

Partners may dispute commissions via `commissions.disputeStatus`. Flow:
1. Partner opens dispute → `disputeStatus = 'open'`, `disputeReason` stored
2. Partner uploads evidence → `disputeEvidenceUrls` (S3 URLs)
3. AI assessment runs automatically: `disputeAiAssessment` = `'likely_valid'` / `'likely_invalid'` / `'unclear'`, with `disputeAiConfidence` and `disputeAiReasoning`
4. Admin reviews AI assessment + evidence → resolves: `disputeStatus = 'resolved'`
5. If resolved in partner's favor → new commission record created (credit)
6. Partner may appeal once: `disputeAppealedAt`, `disputeAppealStatus`

### 9.7 1099 Generation (Compliance)

- Tax year end: identify all partners where sum of paid commissions ≥ $600
- Generate 1099-NEC via Tax1099 API (`PVW37B74RIYR9G6DRWFIO23LDYHUUMVG`)
- Deadline: January 31 of following year
- Store in `taxEstimates` table
- Email PDF to partner, file electronically with IRS
- FCRA-compliant: do not share 1099 data with non-authorized parties

---

## 10. Messaging and Notification System

### 10.1 In-Platform Messaging

`messages` table: bidirectional between homeowner and partner, scoped to a `customerDeal`.

Required features:
- Thread view per deal
- AI-suggested reply templates (Claude API — context-aware based on deal state)
- Attachment support (photos via S3 presigned URLs)
- Read receipts
- Message flagging for platform ops review
- Circumvention detection (phone/email pattern regex, triggers `circumventionFlags`)

### 10.2 Notification Channels

| Channel | Provider | Purpose |
|---------|----------|---------|
| Transactional email | Resend | Job updates, commission paid, lead dispatched, verification |
| SMS | Twilio | New lead alerts, job status, homeowner outreach |
| Push (web/mobile) | OneSignal | Real-time lead notifications, job reminders |
| In-app notifications | `partnerNotifications` + `homeownerNotifications` tables | All events, dashboard bell icon |
| Admin notifications | `notifyOwner()` function | Critical platform events |

### 10.3 Notification Preferences

`notificationPrefs` JSON on `partners`:
```typescript
{
  newLead: boolean,
  leadExpired: boolean,
  commissionPaid: boolean,
  tierUpgrade: boolean,
  newReview: boolean,
  broadcastMessages: boolean,
  weeklyDigest: boolean,
  emailEnabled: boolean,
  smsEnabled: boolean
}
```

`notificationPreferences` table provides homeowner-level granularity.

### 10.4 TCPA Compliance Requirements

- SMS requires explicit opt-in consent before first message
- Store consent timestamp and IP in `homeownerDataConsent` / `partnerPhotoConsent`
- Honor STOP keyword: Twilio webhook updates `smsEnabled = false` on partner/homeowner record
- Do not send marketing SMS — only transactional (job updates, lead alerts)
- All SMS must include: "Reply STOP to unsubscribe"

### 10.5 Email Architecture

All email goes through Resend API (`ENV.fromEmail = 'ProLnk <noreply@prolnk.io>'`). Templates in `server/emails/`. Required templates:
- `newLeadNotification` — dispatched lead to partner
- `payoutConfirmation` — commission paid
- `homeownerCheckin` — 48h post-dispatch homeowner follow-up (via `checkin-scheduler.ts`)
- `dealExpiry` — 4h before deal token expires
- `weeklyDigest` — partner performance summary
- `partnerWelcome` — onboarding flow
- `subscriptionRenewal` — 7 days before billing
- `paymentFailed` — grace period notice
- `1099Notice` — year-end tax notification

---

## 11. AI/ML Pipeline Architecture

### 11.1 Photo Analysis Pipeline

Implemented in `server/intake-router.ts`. Two-tier pipeline:

**Tier 1: Quality Check**
- Model: GPT-4o (via `invokeLLM` wrapper in `server/_core/llm.ts`)
- Input: photo URL
- Output: `"good"` | `"poor"` | `"unusable"`
- Threshold: `"unusable"` = skip, no Tier 2 analysis
- Cost optimization: Tier 1 uses smallest viable model

**Tier 2: Deep Opportunity Analysis**
- Model: GPT-4o or Claude claude-sonnet-4-6 (configurable)
- Input: photo URL + service address context
- Output: structured JSON with array of opportunities (type, category, confidence, description, estimatedValue)
- Minimum confidence threshold: 0.35 (below this = not inserted)
- Response format: `json_schema` (strict mode) to prevent hallucinated keys
- Failure mode: returns empty opportunities array, does not throw, marks queue item `failed`

**AI Training Dataset Accumulation:**
Every processed photo-opportunity pair is written to `aiTrainingDataset` with `validationOutcome = 'pending'`. When homeowner accepts the deal, `validationOutcome = 'accepted'` (positive label). This dataset accumulates proprietary labeled training data. After ~100K records, this becomes an independent data asset.

### 11.2 LLM Abstraction Layer

`server/_core/llm.ts` provides a provider-agnostic `invokeLLM()` function. Supports:
- OpenAI (primary for vision tasks)
- Anthropic Claude (primary for text/reasoning tasks)
- Multi-model routing: `server/_core/multiModelAI.ts`

Both `ANTHROPIC_API_KEY` and `OPENAI_API_KEY` must be set in environment.

### 11.3 Storm Intelligence Agent

Uses Tomorrow.io weather API (`TOMORROW_IO_API_KEY`) to monitor DFW ZIP codes.

Flow:
1. Inngest cron: every 6 hours, fetch weather forecast for all active ZIP codes
2. Detect hail events, high-wind events, flash flood events above severity threshold
3. Insert `stormEvents` record
4. Query `properties` in affected ZIPs
5. For each property, insert `stormLeads` record
6. Auto-create `opportunities` with `opportunityCategory = 'Roofing'` or `'Exterior'`
7. `adminReviewStatus = 'pending_review'` — admin approves before dispatch
8. Batch notify relevant partners: "Storm event in your area — leads available"

### 11.4 AI Agent Registry

`agentRegistry` and `agentRunLog` tables track the 47 AI agents. Each agent is:
- Registered by name, type, and config
- Invoked via `agentEventBus` (event-driven) or Inngest cron (scheduled)
- Run log captures: start time, end time, status, output summary, error if any

Key agents requiring Phase 2 backend implementation:

| Agent | Trigger | Primary Action |
|-------|---------|----------------|
| Lead Router | `opportunity.created` event | Score and assign leads |
| Storm Agent | Weather cron (6h) | Generate storm leads |
| Payout Processor | Nightly cron (02:00 CST) | Calculate + dispatch payouts |
| PPS Calculator | Nightly cron (01:00 CST) | Recompute all partner priority scores |
| Compliance Monitor | Partner action events | Check for strike-worthy behavior |
| Comms Agent | Various notification events | Send emails, SMS, push |
| Fraud Detector | Payment events | Detect circumvention, chargebacks |
| Lead Scorer | `lead.created` event | Apply quality scoring |

### 11.5 AI Memory System

- `Mem0` + `Zep` for agent memory (per-partner context, per-homeowner context)
- `diagnosticSessions` table for AI diagnostic conversation history
- `supportChat` router handles AI-assisted support
- Vector search via Qdrant (`QDRANT_URL`, `QDRANT_API_KEY`) for semantic property matching

### 11.6 Visual Fix Generator

When a `customerDeal` is created, an optional AI inpainting job generates `aiFixImageUrl` — a photo showing the property issue resolved. This uses image generation API (`server/_core/imageGeneration.ts`). The prompt is stored in `aiFixPrompt` for audit. This is a patent claim (surgical AI inpainting replacing only the broken element).

---

## 12. Background Jobs and Event System

### 12.1 Inngest Architecture

All background jobs use Inngest (`INNGEST_EVENT_KEY`, `INNGEST_SIGNING_KEY`). Inngest provides:
- Cron scheduling
- Event-driven function invocation
- Automatic retries with exponential backoff
- Function concurrency control
- Observability dashboard

### 12.2 Required Inngest Functions

**Cron Jobs:**

| Function | Schedule | Action |
|----------|----------|--------|
| `sweep-expired-leads` | Every 5 minutes | Call `sweepExpiredLeads()` |
| `pps-calculator` | Daily 01:00 CST | Recompute all `partners.priorityScore` |
| `payout-sweep` | Daily 02:00 CST | Process unpaid commissions → Stripe transfers |
| `storm-monitor` | Every 6 hours | Fetch weather data, generate storm leads |
| `weekly-lead-reset` | Monday 00:01 CST | Reset `weeklyLeadsReceived = 0` for all partners |
| `subscription-billing-check` | Daily 09:00 CST | Flag overdue subscriptions, send payment failed emails |
| `coiexpiry-check` | Daily 10:00 CST | Warn partners of expiring COI/licenses |
| `geographic-density-snapshot` | Weekly Sunday 23:00 CST | Insert `geographicDensity` snapshot |
| `referral-graph-update` | Nightly 03:00 CST | Recompute `referralGraph` edge metrics |
| `property-enrichment-batch` | Nightly 04:00 CST | Enrich new properties via ATTOM API |

**Event-Driven Functions:**

| Event | Function | Action |
|-------|----------|--------|
| `opportunity.dispatched` | `send-lead-notifications` | Push + SMS + email to receiving partner |
| `opportunity.accepted` | `notify-source-partner` | Confirm acceptance to referring partner |
| `opportunity.expired` | `advance-routing` | Call `advanceLeadRouting()` |
| `deal.homeowner-confirmed` | `trigger-commission-cascade` | Run full commission calculation and insert records |
| `partner.enrolled` | `build-upline-chain` | Insert `proUplineChain` rows |
| `photo.enqueued` | `process-photo` | Call `processPhotoById()` |
| `stripe.payment-intent.succeeded` | `record-payment` | Insert `jobPayments` record |
| `stripe.payout.paid` | `mark-commissions-paid` | Update `commissions.paid = true` |
| `partner.strike-added` | `check-suspension` | Suspend if `strikeCount >= 3` |
| `storm.event-detected` | `generate-storm-leads` | Create storm opportunity records |

### 12.3 Job Queue Concurrency Limits

- Photo processing: max 10 concurrent (Vision API rate limits)
- Payout processing: max 1 concurrent (prevents double-payout race condition)
- Lead routing sweep: max 1 concurrent instance
- Storm lead generation: max 1 concurrent per ZIP

---

## 13. Third-Party Integration Requirements

### 13.1 Stripe

**Purpose:** Payment collection, partner payouts, subscription management, ACH  
**Keys:** `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`  
**Data Flow:**  
- Platform → Stripe: Create PaymentIntents, SetupIntents, Customers, Subscriptions, Connect transfers
- Stripe → Platform: Webhooks for `payment_intent.succeeded`, `invoice.payment_failed`, `account.updated`, `payout.paid`  
**Critical:** All webhooks must validate Stripe signature via `STRIPE_WEBHOOK_SECRET`. Use `processedStripeEvents` table for idempotency.

### 13.2 Twilio

**Purpose:** SMS notifications, homeowner outreach  
**Keys:** `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`  
**Data Flow:**  
- Platform → Twilio: Send SMS on lead dispatch, job status, deal expiry
- Twilio → Platform: Delivery status webhooks, inbound STOP/HELP replies  
**TCPA:** Must check `smsEnabled` flag before every outbound SMS.

### 13.3 Resend

**Purpose:** Transactional email  
**Keys:** `RESEND_API_KEY`  
**Data Flow:** Platform → Resend → homeowner/partner inbox  
**Domain authentication:** SPF, DKIM, DMARC must be configured for `@prolnk.io` and `@trustypro.io`

### 13.4 OneSignal

**Purpose:** Web push and mobile push notifications  
**Keys:** `ONESIGNAL_APP_ID`, `ONESIGNAL_REST_API_KEY`  
**Data Flow:**  
- Frontend registers device → OneSignal player ID stored on partner/user record
- Platform → OneSignal: Send push on lead dispatch, job update, commission paid  
**Implementation:** `server/_core/push.ts: pushNewLead()`

### 13.5 Anthropic Claude

**Purpose:** Opportunity analysis (text reasoning), AI agent orchestration, deal description generation, support chat, dispute AI assessment  
**Keys:** `ANTHROPIC_API_KEY`  
**Model:** `claude-sonnet-4-6` (as per system context)  
**Caching:** Enable prompt caching on all system prompts to reduce cost  
**Data Flow:** Platform → Anthropic API → structured JSON response

### 13.6 OpenAI

**Purpose:** Photo analysis (Vision), image generation (visual fix), quality check  
**Keys:** `OPENAI_API_KEY`  
**Models:** GPT-4o (vision), DALL-E 3 (image gen)  
**Data Flow:** Platform uploads photo URLs → OpenAI analyzes → structured JSON returned

### 13.7 Tomorrow.io

**Purpose:** Weather monitoring, storm detection, hail events  
**Keys:** `TOMORROW_IO_API_KEY`  
**Data Flow:**  
- Platform polls Tomorrow.io Timeline API for ZIP codes every 6 hours
- Detect precipitation type = hail, wind > 60mph, or flood events
- Insert `stormEvents`, generate `stormLeads`

### 13.8 ATTOM

**Purpose:** Property data enrichment (year built, sq ft, assessed value, ownership history)  
**Keys:** `ATTOM_API_KEY` (LIVE)  
**Data Flow:**  
- On property registration: POST address → ATTOM returns property attributes
- Populate `properties` table fields
- Store raw ATTOM response in `propertyConditionData` for audit

### 13.9 Smarty Streets

**Purpose:** Address validation, USPS standardization, geocoding  
**Keys:** `SMARTY_AUTH_ID`, `SMARTY_AUTH_TOKEN` (LIVE)  
**Data Flow:**  
- On homeowner address entry: validate and standardize
- Return `latitude`, `longitude`, `deliverability` score
- Reject non-deliverable addresses before creating property record

### 13.10 Checkr

**Purpose:** Background checks for partner verification  
**Integration:** `server/routers/checkr.ts`  
**Keys:** `CHECKR_API_KEY`  
**Data Flow:**  
- Admin initiates background check for partner
- Platform → Checkr: POST candidate (SSN, name, DOB)
- Checkr → Platform: Webhook with `report.completed` status
- Update `partnerVerifications.backgroundCheckStatus`  
**FCRA:** Adverse action notice required if check results in denial. Store raw report ID, not PII.

### 13.11 Tax1099

**Purpose:** 1099-NEC generation for partners earning ≥$600/year  
**Keys:** `TAX1099_API_KEY = PVW37B74RIYR9G6DRWFIO23LDYHUUMVG` (LIVE)  
**Data Flow:**  
- Year-end batch: identify qualifying partners, sum annual commissions
- Platform → Tax1099: POST recipient data + amounts
- Tax1099 generates PDF, files with IRS electronically
- Store filing confirmation in `taxEstimates`

### 13.12 Mapbox

**Purpose:** Maps on partner directory, service area visualization, distance calculations  
**Keys:** `MAPBOX_ACCESS_TOKEN`  
**Data Flow:** Client-side only for map rendering; server-side for distance matrix calculations in lead routing

### 13.13 CompanyCam

**Purpose:** Photo sync from partners using CompanyCam for job documentation  
**Integration:** `server/routers/integrations.ts`, `server/_core/oauth.ts`  
**Data Flow:**  
- OAuth 2.0 connection stored in `partnerIntegrations`
- Webhook on new photo upload: POST to `/api/webhooks/companycam`
- Backend calls `enqueuePhoto()` with source = `'companycam'`

### 13.14 Jobber

**Purpose:** Job management sync for partners using Jobber  
**Data Flow:** Same pattern as CompanyCam — OAuth + webhook → `enqueuePhoto()`

### 13.15 HouseCall Pro

**Purpose:** Field service management integration (pending partner approval)  
**Status:** Pending API partner approval. Implement when approved.

### 13.16 ServiceTitan

**Purpose:** Enterprise CRM sync for large service companies  
**Data Flow:** Bidirectional sync — jobs logged in ServiceTitan appear in ProLnk dashboard

### 13.17 Qdrant

**Purpose:** Vector storage for semantic property/partner search  
**Keys:** `QDRANT_URL`, `QDRANT_API_KEY`  
**Collections:** `properties` (for semantic home matching), `partners` (for semantic trade matching)

### 13.18 Mem0 / Zep

**Purpose:** AI agent memory persistence  
**Keys:** `MEM0_API_KEY`, `ZEP_API_KEY`  
**Data Flow:** AI agents write/read contextual memory about partners and homeowners

---

## 14. Mobile Architecture

### 14.1 Current State

No native mobile app exists yet. The React web app is mobile-responsive. The backend is API-ready for mobile clients.

### 14.2 React Native App (Phase 2)

Two apps required:

**FieldOS (Partner App):**
- Job check-in / check-out with GPS timestamp
- Photo capture and upload (direct to S3 presigned URL)
- Lead queue view with accept/decline
- Commission tracker
- Messaging with homeowners
- Push notifications via OneSignal

**TrustyPro Homeowner App:**
- Property vault management
- Deal viewing and acceptance
- Job status tracking
- Photo uploads (before/after)
- Review submission
- Push notifications

### 14.3 Mobile Backend Requirements

- All tRPC procedures are mobile-compatible (JSON over HTTPS)
- S3 presigned URL generation: `POST /trpc/photoUpload.getPresignedUrl` → returns S3 upload URL + final CDN URL
- Push tokens: partners/homeowners submit OneSignal player ID on app launch
- Offline support: queue photo uploads locally, submit when connectivity restored (client-side concern, but backend must be idempotent on resubmission)
- GPS check-ins: `partnerCheckIns` table stores lat/lng at job start/end

### 14.4 Mobile-Specific Endpoints Needed

- `photoUpload.getPresignedUrl` — returns S3 presigned PUT URL
- `partnerCheckIns.logCheckin` — GPS + timestamp on job site arrival
- `jobs.logField` — quick job log from field app
- `notifications.registerDevice` — register push token
- `leads.acceptFromPush` — deep link from push notification → accept lead

---

## 15. Geographic and Multi-Tenant Architecture

### 15.1 Current Market

DFW Texas. All ZIPs, lat/lng stored as standard coordinates. No multi-tenancy needed for Phase 1.

### 15.2 Geographic Data Model

Partners define service areas two ways:
1. `serviceAreaLat/Lng + serviceRadiusMiles` — circle-based
2. `serviceZipCodes` — explicit ZIP array (tier-gated: Scout=5, Enterprise=unlimited)

Lead matching uses ZIP code matching first (fast), then haversine distance as a fallback.

**`geographicDensity` table** takes weekly snapshots of partner coverage by ZIP. Used to:
- Identify coverage gaps (no partner for a trade in a ZIP)
- Guide partner recruitment (agents shown highest-gap ZIPs first)
- Prove network density to investors

### 15.3 Phase 3 — Multi-Market Architecture

When expanding beyond DFW:
- Add `marketId` FK to `partners`, `opportunities`, `stormEvents`
- `markets` table: market name, city/metro, ZIP list, launch date, active flag
- Franchise operators scoped to a `marketId` (role-based filter)
- Storm monitoring extended to all active market ZIPs
- Commission rates remain global (no per-market variation initially)

### 15.4 Franchise Operator Architecture (Phase 3)

`franchiseOperators` table (to build):
- `userId`, `marketId`, `commissionSplitRate` (% of platform net shared with franchise operator)
- Access scoped to partners in their market
- Cannot see financial data outside their market
- Can approve/reject partner applications in their market

---

## 16. Data Storage Architecture

### 16.1 Primary Database

**TiDB Cloud (MySQL-compatible, serverless)**  
- Connection: `DATABASE_URL` env var  
- ORM: Drizzle (strict TypeScript types)  
- Schema: `drizzle/schema.ts` (3,779 lines, 130+ tables)  
- Migrations: `drizzle/migrations/` tracked  
- Config: `drizzle.config.ts`

**Index Requirements (Critical for Performance):**
```sql
-- Lead routing (most frequent query)
CREATE INDEX idx_opportunities_status_expires ON opportunities(status, leadExpiresAt);
CREATE INDEX idx_partners_status_score ON partners(status, priorityScore DESC);
CREATE INDEX idx_partners_businesstype ON partners(businessType);
CREATE INDEX idx_partners_zip ON partners(serviceZipCodes(50));  -- JSON prefix index

-- Commission cascade
CREATE INDEX idx_proUplineChain_proUserId ON pro_upline_chain(proUserId);
CREATE INDEX idx_commissions_paid ON commissions(paid, receivingPartnerId);

-- Photo pipeline
CREATE INDEX idx_photoIntakeQueue_status ON photoIntakeQueue(status, receivedAt);
CREATE INDEX idx_photoIntakeQueue_partner ON photoIntakeQueue(partnerId);

-- Storm leads
CREATE INDEX idx_stormLeads_status ON stormLeads(status);
CREATE INDEX idx_stormEvents_zip ON stormEvents(affectedZips(100));
```

### 16.2 File Storage

**AWS S3 + Cloudflare R2 (CDN caching layer)**  
- Partner photo uploads → S3 (presigned PUT)
- AI-generated fix images → S3 (server-side PUT)
- Property documents → S3 (encrypted at rest)
- 1099 PDF documents → S3 (encrypted, access-controlled)
- Cloudflare R2 used as CDN cache for frequently accessed photos

**Bucket structure:**
```
prolnk-uploads/
  ├── photos/{partnerId}/{jobId}/{timestamp}.jpg
  ├── documents/{partnerId}/{type}/{timestamp}.pdf
  ├── ai-generated/{opportunityId}/fix.jpg
  └── deals/{dealId}/{photoHash}.jpg
```

### 16.3 Vector Database

**Qdrant**  
- `QDRANT_URL`, `QDRANT_API_KEY` env vars  
- Collections: `property_embeddings`, `partner_embeddings`  
- Embedding model: text-embedding-3-small (OpenAI) for text; CLIP for images  
- Used by: semantic home matching, property similarity search, AI agent context retrieval

### 16.4 AI Agent Memory

**Mem0** (`MEM0_API_KEY`): Per-entity memory store for AI agents  
**Zep** (`ZEP_API_KEY`): Conversation history and context windows for long-running agent sessions

### 16.5 Caching Strategy

Currently: no explicit caching layer. For Phase 2:
- **Redis** (or Render KV): Session store, rate limit counters, lead routing queue locks
- **TiDB query cache**: enabled by default for reads
- **CDN caching (Cloudflare)**: static assets, public marketing pages
- **Application-level cache**: `TIER_CONFIG` constants, `industryRates` (change infrequently, cache in process memory with 5-minute TTL)

---

## 17. Security and Compliance Requirements

### 17.1 TCPA (Telemarketing Consumer Protection Act)

- SMS requires opt-in consent before first message
- Store `tcpaConsentAt` + IP in `homeownerDataConsent` / partner record
- Honor STOP keyword via Twilio inbound webhook
- Do not auto-enroll in SMS on signup — must be explicit opt-in
- Bulk SMS campaigns: only to opted-in users, include opt-out mechanism

### 17.2 RESPA (Real Estate Settlement Procedures Act)

- Lead routing must be algorithmic, not human-directed steering
- Admin can approve/reject AI leads (quality control) but cannot re-assign to a specific partner for non-algorithmic reasons
- `adminAuditLog` must capture every admin dispatch decision with timestamp
- Platform cannot accept kickbacks for referrals to specific pros (commission is disclosed)
- Document: platform is not a settlement service provider as defined under RESPA for most trades. Consult legal for any real-estate-transaction-adjacent services.

### 17.3 CCPA / GDPR

- `dataExportRequests` table: process within 30 days
- `dataDeleteRequests`: hard delete of PII within 30 days (soft-delete job records for financial audit trail, anonymize PII fields)
- Privacy policy link required on all data-collection forms
- Homeowner consent flags in `homeownerProfiles`: `consentTerms`, `consentPhotos`, `consentPartnerContact`, `consentAiData`
- AI training data: only use photos where `consentAiData = true`

### 17.4 FCRA (Fair Credit Reporting Act)

- Background check results (Checkr) must not be stored in raw form beyond 7 years
- Adverse action: if partner denied due to background check, send adverse action notice with Checkr's contact info
- Access to Checkr results: admin only, logged in `adminAuditLog`

### 17.5 Data Encryption

- Database: TiDB Cloud encryption at rest (enabled by default)
- PII fields (SSN if collected, bank account info): encrypt at application layer before storage, decrypt only when needed
- OAuth tokens in `partnerIntegrations`: encrypt before storing, decrypt on use
- Stripe payment methods: never stored raw — Stripe handles PCI compliance
- Environment secrets: managed via Render environment vars (not in codebase)

### 17.6 API Security

- All HTTPS (TLS 1.2+)
- Stripe webhook signature validation (`stripe.webhooks.constructEvent()`)
- Twilio webhook signature validation (X-Twilio-Signature header)
- SQL injection: Drizzle ORM parameterizes all queries — no raw string interpolation
- XSS: React handles output encoding; server returns JSON only
- Content-Security-Policy header on all HTML responses

### 17.7 Security Headers (Required)

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: [appropriate directives]
```

### 17.8 Audit Logging

`adminAuditLog` table must capture:
- Every `adminProcedure` mutation
- Admin ID, timestamp, action type, entity type + ID
- Before/after JSON snapshots for edits
- IP address

`complianceEvents` table:
- Every data export request
- Every data delete request
- Every adverse action decision
- Every circumvention flag resolution
- Every dispute resolution

---

## 18. Analytics and Reporting

### 18.1 PostHog Integration

`POSTHOG_API_KEY` used for product analytics. Track:
- Partner funnel: signup → onboarding → first lead → first job → first payout
- Homeowner funnel: signup → property add → deal view → deal accept → job confirm
- Lead acceptance rates by tier, trade, ZIP
- Deal page conversion rates
- Commission payout rates

Custom events in `analyticsEvents` table for platform-internal analytics (separate from PostHog, no data sent externally).

### 18.2 Admin Analytics Dashboards

Required dashboard views for `adminProcedure` queries:

**Platform Health:**
- Active partners by tier
- Leads dispatched / accepted / expired (last 7d, 30d)
- Average PPS score distribution
- ZIP code coverage heat map

**Financial:**
- Gross job value by week/month
- Platform net revenue (after commissions)
- Subscription MRR
- Payout volume
- Top earners list (anonymized for investor view)

**AI Pipeline:**
- Photos processed / day
- Opportunity detection rate (opportunities per photo)
- Admin review queue depth
- Average confidence score distribution
- Acceptance rate by trade category

**Growth:**
- New partner signups by week
- Referral chain depth distribution
- Geographic density by ZIP (from `geographicDensity` snapshots)
- Waitlist conversion rate (waitlist → active partner)

### 18.3 Partner Analytics (Self-Service)

Partners access `protectedProcedure` analytics:
- Monthly earnings breakdown (own-job + network override)
- Lead acceptance rate, close rate, response time average
- PPS score history
- Network tree visualization (who they recruited, their production)
- Commission ledger (filterable by month)
- Weekly digest email (generated from same data)

---

## 19. Admin System Requirements

### 19.1 Core Admin Capabilities

**Partner Management:**
- View/search all partners with tier, status, PPS, earnings
- Approve / reject partner applications
- Add/remove strikes, with reason
- Manually adjust tier (documented override)
- View partner's full network tree
- Initiate background check via Checkr
- Verify COI and license documents
- Exempt partner from fees (`isExempt = true`)
- Impersonate partner for support

**Lead Dispatch Portal:**
- View all `opportunities` where `adminReviewStatus = 'pending_review'`
- See AI confidence, opportunity type, photo, address
- Approve → dispatches to top partner in routing queue
- Reject → marks expired
- Override routing → select specific partner (logged in `adminAuditLog`)
- View dispatch history and outcome by opportunity

**Financial Management:**
- View full `commissions` ledger
- Process manual payout requests
- Override payout hold for specific partners
- View Stripe Connect account statuses
- Trigger 1099 generation batch
- View all subscription statuses, flag overdue

**System Operations:**
- Broadcast messages to all partners
- Edit `systemSettings` (key/value store for platform config)
- Edit `industryRates` (per-industry fee overrides)
- View `agentRunLog` — 47 AI agents' execution history
- View `systemHealthLog`
- Trigger manual Inngest function runs

### 19.2 Command Center

`server/routers/commandCenter.ts` provides real-time platform operations view:
- Live lead queue depth
- Active jobs count
- Pending payouts total
- AI pipeline queue depth
- Recent admin audit actions

### 19.3 Waitlist Management

`server/routers/waitlistAdmin.ts` manages pre-launch waitlist:
- View all `proWaitlist` and `homeWaitlist` records
- Export to CSV
- Approve/activate individual waitlist members
- Send batch communications

---

## 20. Scalability and Performance Requirements

### 20.1 Scale Targets

| Phase | Partners | Homes | Jobs/Day | Photos/Day | API req/sec |
|-------|---------|-------|----------|-----------|-------------|
| Launch (now) | 500 | 1,000 | 50 | 100 | 10 |
| Phase 2 (Y1) | 2,125 | 10,000 | 500 | 1,000 | 100 |
| Phase 3 (Y2) | 10,000 | 100,000 | 5,000 | 10,000 | 500 |
| Phase 4 (Y3) | 50,000 | 1,000,000 | 50,000 | 100,000 | 2,000 |

### 20.2 Current Bottlenecks (Known)

1. **Photo AI processing** — synchronous in current implementation (called in background but blocks queue item status). For Phase 2: move to Inngest async job with dedicated concurrency control.
2. **Lead routing query** — full table scan on `partners` to match by businessType. Add composite index on `(status, businessType, priorityScore DESC)`.
3. **Weekly lead reset** — single UPDATE on all partners simultaneously. Use batch updates (1,000 rows at a time) to avoid lock contention.
4. **Cascade commission calculation** — must query `proUplineChain` for every job. Pre-computed chain = O(1) lookup. Already implemented correctly.
5. **Nightly PPS recalculation** — iterates all partners. Use Inngest batch function with fan-out pattern.

### 20.3 TiDB Scaling Strategy

TiDB Cloud serverless auto-scales by default. Ensure:
- Connection pooling: use `mysql2` pool (not single connection)
- Max pool size: 50 for production
- Read replicas: enable for analytics queries (Phase 3)
- Slow query log: enable in TiDB Cloud, alert on queries > 500ms

### 20.4 Render Scaling

- Current: Standard plan (1 instance)
- Phase 2: Scale to 2+ instances via Render autoscaling
- Inngest workers: separate Render service to prevent background job contention with web requests
- Phase 3: Consider Render's persistent disk or migrate to Railway/AWS ECS

### 20.5 Performance Requirements

| Operation | Target P99 Latency |
|-----------|-------------------|
| Lead dispatch | < 200ms |
| tRPC query (authenticated) | < 150ms |
| Partner dashboard load | < 500ms |
| Photo AI Tier 1 quality check | < 3s |
| Photo AI Tier 2 analysis | < 15s |
| Commission cascade calculation | < 500ms |
| Payout sweep (1,000 partners) | < 2 minutes |

---

## 21. MVP vs Phase 2 vs Phase 3 Feature Breakdown

### MVP (Live Now — Waitlist Collection)

- ✅ Pro waitlist signup (`proWaitlist`)
- ✅ Homeowner waitlist signup (`homeWaitlist`)
- ✅ Confirmation emails via Resend
- ✅ Admin waitlist dashboard
- ✅ Referral code tracking on waitlist
- ✅ Basic partner dashboard (static)
- ❌ No live matching
- ❌ No payments
- ❌ No pro activation

### Phase 2 (Full Transactional Platform — Q3 2026)

**Must Have:**
- [ ] Custom auth system (email/password + JWT)
- [ ] Partner application + approval flow
- [ ] Stripe Connect onboarding for partners
- [ ] Homeowner property registration + ATTOM enrichment
- [ ] Photo upload + AI analysis pipeline (Inngest async)
- [ ] Lead dispatch portal (admin review + approve)
- [ ] Partner lead queue (accept/decline)
- [ ] Customer deal pages (tokenized, public)
- [ ] Homeowner check-in (triggers payment + commission)
- [ ] Stripe payment collection (card on file)
- [ ] Commission cascade calculation + ledger
- [ ] Nightly payout sweep (Stripe Connect transfers)
- [ ] Partner earnings dashboard
- [ ] SMS notifications (Twilio)
- [ ] Push notifications (OneSignal)
- [ ] In-platform messaging (deal-scoped)
- [ ] Partner review system (post-job)
- [ ] PPS nightly recalculation
- [ ] Expired lead sweep (5-minute cron)
- [ ] CompanyCam OAuth + webhook integration
- [ ] Jobber OAuth + webhook integration
- [ ] Checkr background check integration
- [ ] Smarty Streets address validation
- [ ] Sentry error tracking
- [ ] Basic admin audit log

**Should Have:**
- [ ] Storm intelligence (Tomorrow.io) + storm lead generation
- [ ] Network tree visualization (partner recruiting dashboard)
- [ ] Subscription override calculations (4-level cascade)
- [ ] Weekly digest emails (partner performance)
- [ ] 1099 generation (Tax1099 API)
- [ ] Homeowner deal page e-signature
- [ ] AI visual fix generator (DALL-E inpainting)
- [ ] Data export / delete (CCPA compliance)
- [ ] ACH authorization for insurance jobs

### Phase 3 (Scale and Expansion — Q1 2027)

- [ ] React Native apps (partner FieldOS + homeowner TrustyPro)
- [ ] Multi-market architecture (`marketId` on entities)
- [ ] Franchise operator role + scoped dashboards
- [ ] Google Business Profile sync (auto-request reviews)
- [ ] ServiceTitan + HouseCall Pro integrations
- [ ] EagleView aerial measurement (roofing)
- [ ] NOAA weather data integration (secondary storm source)
- [ ] Investor read-only dashboard
- [ ] PostHog advanced funnels + cohort analysis
- [ ] AI training dataset → model retraining pipeline
- [ ] Qdrant semantic property/partner matching
- [ ] Automated fraud detection (circumvention pattern ML)
- [ ] Exchange marketplace (full peer-to-peer job posting)
- [ ] Real estate agent partner program
- [ ] Home Health Vault public API (B2B licensing)
- [ ] Advanced commission dispute automation
- [ ] Warranty tracking + recall alerts

---

## 22. Recommended Technical Decisions

### 22.1 Immediate Actions (Pre-Phase 2 Launch)

1. **Connect all 55 routers to `appRouter`** — currently 9 routers are defined but not exported from the main router. This is blocking (TypeScript errors show these are unreachable).

2. **Move photo processing to Inngest** — current implementation calls `processPhotoById` in a fire-and-forget `catch()`. This loses errors silently and has no retry logic. Move to a dedicated Inngest function with 3-retry exponential backoff.

3. **Add `processedStripeEvents` check to ALL Stripe webhook handlers** — the table exists but must be enforced everywhere, especially payout processing.

4. **Switch from synchronous DB calls to connection pool** — `getDb()` / `getPool()` inconsistency. Standardize on a single pool pattern with connection reuse.

5. **Add Sentry** — `SENTRY_DSN` is referenced in architecture docs but not implemented. Error tracking is critical before any payment flows go live.

### 22.2 Architecture Recommendations

**Commission cascade: use Decimal.js for all monetary math** — already done in `commissions.ts` (`new Decimal()`). Enforce this across all commission-touching code. Never use JavaScript floating-point arithmetic on money.

**Upline chain: never traverse at query time** — the `proUplineChain` denormalization is the correct approach. If the chain is missing for a partner, generate it on-demand as a fallback, then persist it. Do not recursively query at commission calculation time.

**Lead routing: pre-compute ZIP → partner mapping** — instead of scanning all approved partners on every opportunity, maintain a `zipPartnerMap` cache (Redis or in-memory) that maps `{zip: {trade: [partnerIds ordered by PPS]}}`. Rebuild this on every partner status or PPS change event. This reduces the lead routing query from O(n partners) to O(1) cache lookup.

**Stripe: use destination charges for Connect payouts** — simpler than separate transfers, funds move atomically, and commission capture is built into the charge itself.

**TiDB JSON columns: add virtual generated columns for frequently queried JSON fields** — `serviceZipCodes` is a JSON array, queried for ZIP matching. Add a generated column or a normalized `partnerZipCodes` join table to enable indexed ZIP lookups.

**Webhook handlers: always return 200 immediately, process async** — Stripe and Twilio have short timeouts. Acknowledge webhooks instantly, then process via Inngest event. Current pattern may time out on slow AI calls.

**Admin impersonation: time-limited tokens** — Implement admin impersonation as a time-limited JWT (4-hour max) with a separate `isImpersonating: true` flag in payload. All actions during impersonation are logged separately.

### 22.3 What Not to Build (Yet)

- **Don't build a custom real-time messaging WebSocket layer** — the current deal-scoped messaging is sufficient for Phase 2. Use polling (tRPC query with 5s interval) until mobile app justifies WebSocket complexity.
- **Don't build your own ML model** — the AI training dataset approach is correct, but model retraining is Phase 3+. Use OpenAI/Anthropic APIs for Phase 2 entirely.
- **Don't split into microservices** — the monorepo is the right architecture through 10,000 partners. The Inngest worker is the only service that warrants separation.
- **Don't implement ACH before card payments are stable** — card payments are simpler and cover 80% of jobs. ACH/insurance flow is Phase 2 late or Phase 3.

---

## 23. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Stripe Connect onboarding friction | High | High | Build async Stripe Connect onboarding flow with status polling; show partners exactly what's needed |
| AI photo analysis cost overrun | Medium | Medium | Tier 1 quality gate already implemented. Add monthly AI spend cap in admin settings. Monitor per-photo cost. |
| Commission calculation bug causes partner underpayment | Medium | Critical | Implement commission shadow-run: calculate but don't pay, have admin review for first 30 days |
| Upline chain inconsistency on enrollment | Low | High | Wrap enrollment + chain build in a DB transaction with rollback |
| TiDB connection exhaustion under load | Medium | High | Implement connection pooling with max 50 connections; add retry with exponential backoff on `ECONNREFUSED` |
| RESPA violation from admin lead steering | Low | Critical | All admin dispatch decisions logged; algorithmic routing queue is the default; override requires documented reason |
| TCPA violation from SMS blast | Medium | High | Add SMS opt-in check in Twilio send wrapper; fail-safe = don't send if consent not confirmed |
| Stripe webhook replay attack | Low | Critical | `processedStripeEvents` idempotency table is the defense; must be enforced on every handler |
| Partner self-referral / circular referral fraud | Medium | Medium | Circular check implemented in `network.ts: enroll()`; add fraud detection cron to scan for suspicious upline patterns |
| Photo circumvention (pro contacts homeowner off-platform) | Medium | High | Circumvention regex on messages + `circumventionFlags` table; strike system; fraud detector agent |
| Render instance cold start delays lead notifications | Low | Medium | Keep Render service awake with Inngest pings; Phase 2 upgrade to standard-plus tier |
| Tomorrow.io API downtime during storm | Low | High | Cache last weather data; retry with 15-minute backoff; manual storm lead creation available in admin |
| 1099 filing deadline miss | Low | Critical | Set Inngest reminder cron in November, December, January; Tax1099 API has its own reminder system |
| Data breach of homeowner PII | Very Low | Critical | TiDB encryption at rest; application-layer encryption for SSN/bank data; Cloudflare WAF; access logs |

---

## 24. Estimated Infrastructure Complexity

### 24.1 Complexity Score by Domain

| Domain | Complexity | Primary Challenge |
|--------|-----------|-------------------|
| Auth System | Medium | Multiple roles, OAuth, JWT refresh |
| Photo AI Pipeline | High | Async processing, cost management, quality control |
| Commission Cascade | Very High | 4-level MLM math, Decimal precision, payout timing |
| Lead Routing | High | Real-time matching, expiry sweep, re-routing logic |
| Storm Intelligence | Medium | Weather API, ZIP → property mapping, auto-lead creation |
| Stripe Payments | High | Connect onboarding, ACH, webhook idempotency, dispute handling |
| Messaging | Low–Medium | Thread scoping, circumvention detection |
| Notifications | Medium | Multi-channel (email/SMS/push), preferences, TCPA |
| Data Vault (Home Health) | Medium | Property enrichment, ATTOM integration, historical record |
| Admin System | Medium | Audit logging, role enforcement, impersonation |
| Mobile | High | React Native app, GPS, offline photo queue, push deep links |
| Multi-Market / Franchise | High | Row-level security, scoped views, market management |

### 24.2 Engineering Estimate (Backend Only)

| Phase | Domain | Estimated Weeks |
|-------|--------|----------------|
| Phase 2 | Auth (email/password complete) | 1 week |
| Phase 2 | Photo pipeline (Inngest async) | 1 week |
| Phase 2 | Lead dispatch + deal pages | 2 weeks |
| Phase 2 | Stripe card payments + Commission A | 3 weeks |
| Phase 2 | Commission B (network cascade) | 2 weeks |
| Phase 2 | Payout sweep + Stripe Connect | 2 weeks |
| Phase 2 | Notifications (all channels) | 1 week |
| Phase 2 | FSM integrations (CompanyCam, Jobber) | 1 week |
| Phase 2 | Background jobs (all Inngest crons) | 1 week |
| Phase 2 | Admin system completion | 1 week |
| **Phase 2 Total** | | **~15 weeks** |
| Phase 3 | Storm intelligence | 1 week |
| Phase 3 | React Native API compatibility | 1 week |
| Phase 3 | Multi-market architecture | 3 weeks |
| Phase 3 | 1099 + Tax compliance | 1 week |
| Phase 3 | Home Health Vault B2B API | 2 weeks |
| Phase 3 | Fraud detection ML integration | 2 weeks |
| **Phase 3 Total** | | **~10 weeks** |

**Minimum viable backend team for Phase 2:** 2 senior backend engineers + 1 DevOps/infra engineer. Commission cascade and Stripe Connect are the highest-risk workstreams and should be assigned to the most experienced engineer.

---

## Appendix A — Environment Variables Reference

| Variable | Required | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | Yes | TiDB Cloud MySQL connection string |
| `JWT_SECRET` | Yes | Cookie signing key |
| `STRIPE_SECRET_KEY` | Phase 2 | Stripe API |
| `STRIPE_PUBLISHABLE_KEY` | Phase 2 | Client-side Stripe |
| `STRIPE_WEBHOOK_SECRET` | Phase 2 | Webhook signature validation |
| `RESEND_API_KEY` | Yes | Email delivery |
| `TWILIO_ACCOUNT_SID` | Phase 2 | SMS |
| `TWILIO_AUTH_TOKEN` | Phase 2 | SMS |
| `TWILIO_FROM_NUMBER` | Phase 2 | SMS from number |
| `ONESIGNAL_APP_ID` | Phase 2 | Push notifications |
| `ONESIGNAL_REST_API_KEY` | Phase 2 | Push notifications |
| `ANTHROPIC_API_KEY` | Phase 2 | AI agents, text analysis |
| `OPENAI_API_KEY` | Phase 2 | Vision AI, image generation |
| `TOMORROW_IO_API_KEY` | Phase 2 | Weather/storm data |
| `ATTOM_API_KEY` | Phase 2 | Property enrichment (LIVE) |
| `SMARTY_AUTH_ID` | Phase 2 | Address validation (LIVE) |
| `SMARTY_AUTH_TOKEN` | Phase 2 | Address validation (LIVE) |
| `CHECKR_API_KEY` | Phase 2 | Background checks |
| `TAX1099_API_KEY` | Phase 3 | 1099 filing (LIVE) |
| `MAPBOX_ACCESS_TOKEN` | Phase 2 | Maps + geocoding |
| `QDRANT_URL` | Phase 3 | Vector DB |
| `QDRANT_API_KEY` | Phase 3 | Vector DB |
| `MEM0_API_KEY` | Phase 3 | AI agent memory |
| `ZEP_API_KEY` | Phase 3 | AI conversation memory |
| `INNGEST_EVENT_KEY` | Phase 2 | Background jobs |
| `INNGEST_SIGNING_KEY` | Phase 2 | Inngest webhook auth |
| `APP_BASE_URL` | Yes | Canonical platform URL |
| `FROM_EMAIL` | Yes | Outbound email from address |
| `SENTRY_DSN` | Phase 2 | Error tracking |

---

*This document reflects the live codebase as of May 14, 2026. The schema (`drizzle/schema.ts`, 3,779 lines, 130+ tables), 55 tRPC routers, and `server/intake-router.ts` were audited directly. All architectural decisions, table names, field names, and commission math are grounded in the actual implementation, not specification.*

---

**Key findings for the engineering team:**

The foundational data model is exceptionally well-designed. The commission cascade, photo pipeline, and upline chain tables are all built correctly. The primary gaps before Phase 2 launch are: (1) connecting all routers to the main `appRouter`, (2) moving photo AI processing to Inngest for reliability, (3) enforcing Stripe webhook idempotency universally, and (4) completing the Stripe Connect payout sweep. The commission math in `commissions.ts` using `Decimal.js` is correct and should be treated as the canonical reference implementation. The `proUplineChain` pre-computation pattern is the right architecture and must be protected — never replace it with a recursive query at runtime.