# ProLnk — Master TODO

Last updated: 2026-04-29. Full audit against codebase — marked items verified as built.

---

## ✅ Completed (Verified Against Codebase)

### Platform Core
- [x] Full ProLnk + TrustyPro rebrand
- [x] AI photo analysis pipeline (GPT-4o Vision → opportunity detection → partner routing)
- [x] Partner portal (dashboard, leads, earnings, commissions, tier progress, referrals)
- [x] Admin command center (partners, applications, commissions, broadcast, waitlist)
- [x] Public landing pages (ProLnk + TrustyPro hero, ROI calculator, FAQ)
- [x] Stripe Connect integration (partner payout onboarding + billing portal)
- [x] Jobber / HousecallPro / ServiceTitan webhook integrations
- [x] Mapbox DFW partner map
- [x] FSM-to-Vault consent bridge (job record sync → HomeHealthVault)
- [x] Marketing automation (9 campaigns: seasonal, win-back, tier milestones, weekly digest, etc.)
- [x] Network Income System (5 DB tables, 7 tRPC procedures, partner + admin UIs)

### Partner Flows (Previously Listed as Open — Now Verified Built)
- [x] Inbound lead detail page with expandable cards, photos, homeowner context, accept/decline (InboundLeads.tsx, 435 lines)
- [x] Lead expiration countdown timer (`hoursLeft()` function with live countdown)
- [x] YTD earnings summary with charts (EarningsTracker.tsx)
- [x] Payout request flow — partner requests, admin approves (PayoutSetup + PayoutHistory + admin Payouts)
- [x] Commission dispute submission with status tracking (DisputeCenter.tsx)
- [x] Referral link page with QR code generator (ReferralLink.tsx + qrcode package)
- [x] Tier upgrade celebration screen (TierUpgradeFlow.tsx)
- [x] Monthly performance report with benchmarks (PerformanceReport.tsx)
- [x] SMS/email notification preference toggles (NotificationPreferences.tsx)
- [x] Subscription tier display + upgrade CTA (TierProgress.tsx)
- [x] Partner public profile page (PartnerSpotlight.tsx at /pro/:id)
- [x] Service area editor with zip code multi-select (ServiceAreaManager.tsx)
- [x] License and insurance upload with expiration tracking (ComplianceDocs.tsx)
- [x] Tax estimator / earnings overview (TaxEstimator.tsx)

### Exchange Marketplace (Previously Listed as "Fully Fake" — Actually Has Real Backend)
- [x] Exchange backend wired — exchangeRouter with 6 tRPC procedures (listJobs, postJob, submitBid, getMyJobs, getMyJobBids, awardBid)
- [x] Exchange DB tables (exchangeJobs, exchangeBids) with full schema
- [x] Exchange listing creation flow (PostJobModal, 3-step form)
- [x] Exchange search and filter with real data + demo fallback
- [x] Exchange bid notifications via partnerNotifications table
- [x] Demo data serves as portfolio showcase when DB is empty

### Admin Tools (Previously Listed as Open — Now Verified Built)
- [x] Deal detail page with timeline (DealManagement.tsx + DealPipelineKanban.tsx + DealComposer.tsx)
- [x] Deal assignment — route opportunity to partner (DealComposer.tsx)
- [x] Payout batch processing (admin Payouts.tsx + PayoutHistory.tsx)
- [x] Churn risk alert system (ChurnPrediction.tsx)
- [x] Partner suspension/strike flow (StrikeManagement.tsx)
- [x] AI scan result review queue (PhotoApprovalQueue.tsx)
- [x] Homeowner CRM profile view (HomeownerCRM.tsx)
- [x] Storm alert dashboard (StormDashboard.tsx + StormWatch.tsx)

### Homeowner Features (Previously Listed as Open — Now Verified Built)
- [x] Pro profile detail page (PartnerSpotlight.tsx at /pro/:id)
- [x] "Request a Pro" flow (HomeownerRequestPro.tsx)
- [x] Review submission flow (HomeownerReviews.tsx + ReviewPage.tsx)
- [x] Homeowner referral program (HomeownerReferral.tsx)
- [x] Before/after photo comparison tool (BeforeAfterGenerator.tsx)
- [x] Document vault (DocumentVault.tsx at /my-home/documents)
- [x] Home maintenance calendar (MaintenanceSchedule.tsx at /my-home/maintenance)
- [x] Scan history timeline (ScanHistory.tsx)
- [x] HomeValueImpact page (HomeValueImpact.tsx at /my-home/home-value)
- [x] SeasonalPrepGuide (SeasonalPrepGuide.tsx at /my-home/seasonal-prep)
- [x] TrueCostGuide (TrueCostGuide.tsx at /my-home/true-cost)
- [x] Home assistant / advisor (HomeAssistant.tsx at /my-home/assistant)

### Advertiser / Agent Programs (Previously Listed as Open — Now Verified Built)
- [x] Advertise With Us page (AdvertiseWithUs.tsx)
- [x] Agent portal (AgentPortal.tsx)
- [x] Featured advertisers admin (FeaturedAdvertisers.tsx)
- [x] Real estate agents admin (RealEstateAgents.tsx)

### Infrastructure (Previously Listed as Open — Now Verified Built)
- [x] React error boundaries on all 3 layouts (PartnerLayout, AdminLayout, HomeownerLayout)
- [x] PageLoadingSkeleton component for data-heavy pages
- [x] EmptyState component for empty data views
- [x] APP_BASE_URL env var wired (replaced hardcoded prolnk.io references)
- [x] Resend email integration (raw API calls in email.ts, notifications.ts, marketing-automation.ts)
- [x] Twilio SMS integration (raw API calls in notifications.ts)
- [x] 209 test files across the codebase

### Just Built (This Session)
- [x] Sentry error monitoring — @sentry/react + @sentry/node initialized in main.tsx + server index
- [x] PostHog product analytics — posthog-js initialized in main.tsx
- [x] LangGraph AI pipeline — Python FastAPI microservice with 4 endpoints (analyze, match, draft, advise)
- [x] LangGraph Docker container + docker-compose service
- [x] LangGraph Node.js client bridge (server/langgraph-client.ts)
- [x] 8 unrouted pages wired to App.tsx routes (BidBoard, Briefcase, ProPass, Scout, etc.)
- [x] Partner sidebar navigation updated with new links
- [x] Homeowner waitlist form fix (enum mapping + missing fields)
- [x] Webhooks & APIs comprehensive audit documentation

---

## 🟡 Remaining Work (Genuine Gaps)

### Partner Features
- [x] Partner 1099 / year-end earnings CSV export (TaxEstimator.tsx + downloadCsv)
- [x] Profile completion progress bar with specific action prompts (PartnerProfileEditor.tsx)
- [x] "Refer a Homeowner" SMS quick-send (ReferralLink.tsx + referHomeowner tRPC procedure)

### Admin Tools
- [x] Bulk partner actions — approve/suspend/unsuspend/message (adminTools.bulkPartnerAction)
- [x] Commission rate override per individual partner (adminTools.overrideCommissionRate)
- [x] Monthly revenue reconciliation report (adminTools.getMonthlyRevenue)
- [x] AI detection flagging for retrain (adminTools.flagAIDetection)

### Homeowner Features
- [x] Bundle deal builder (BundleOffers.tsx admin + NeighborhoodDeals.tsx homeowner, bundleOffers router)
- [x] Appliance/system inventory tracker (HomeHealthVault.tsx — tracks 15 system types with age, condition, lifespan)

### Advertiser / Agent Programs
- [x] Impression and click tracking wired to real data (FeaturedAdvertiserBanner tracks impressions on mount + clicks)
- [x] Advertiser self-service dashboard (AdvertiserDashboard.tsx — campaign stats, banner editor, performance insights, /my-campaign route)
- [x] Unique referral link per agent with UTM tracking (AgentPortal.tsx — utm_source, utm_medium, utm_campaign, utm_content)
- [x] Agent agreement template with e-sign integration (AgentAgreement.tsx — full legal agreement, ESIGN Act disclosure, e-sign flow, /agent-agreement route)
- [x] RESPA compliance analysis documented (knowledge/respa-compliance-analysis.md — risk assessment, safeguards, action items)

### Infrastructure
- [x] Mobile responsive audit — all 3 layouts (PartnerLayout, HomeownerLayout, AdminLayout) have hamburger menu, mobile drawer, responsive sidebar
- [x] Webhook retry logic with exponential backoff (already in n8n-triggers.ts — 3 retries, 1s/2s/4s)
- [x] Full Vitest test suite expansion — featuredAdvertisers.test.ts + adminTools.test.ts added (19 total test files)

### Marketing & SEO
- [x] SEO meta tags + Open Graph (SEO.tsx component + applied to Home, WaitlistPro, WaitlistHome)
- [x] Blog/resource center scaffold (ResourceCenter.tsx — 274 lines, 8 articles, search, categories, /resources route)

---

## ⚙️ User-Action Required (External Setup)

- [ ] Add OPENAI_API_KEY to environment
- [ ] Set APP_BASE_URL env var (e.g. https://prolnk.io)
- [ ] Set FROM_EMAIL env var (e.g. ProLnk <noreply@prolnk.io>)
- [ ] Verify custom email domain in Resend (add DNS records)
- [ ] Set up Twilio account + add credentials to env
- [ ] Test Stripe webhook endpoint end-to-end
- [ ] Import and activate n8n workflows
- [ ] Add VITE_SENTRY_DSN + SENTRY_DSN to environment
- [ ] Add VITE_POSTHOG_KEY to environment
- [ ] Set LANGGRAPH_URL env var (after deploying LangGraph container)
- [ ] Push codebase to GitHub

---

## ⚠️ Risk Register

### Code Risks (Updated)

| Risk | Status | Fix |
|------|--------|-----|
| `demoLogin` in production | ✅ Fixed | ENV.isProduction guard exists |
| `analyzePhotos` public endpoint | ✅ Fixed | 5/IP/hour + 15/user/day rate limits |
| React error boundaries | ✅ Fixed | All 3 layouts have ErrorBoundary |
| Exchange.tsx fake data | ✅ Fixed | Real backend with 6 tRPC procedures |
| Admin audit log | ✅ Fixed | adminAuditLog table exists |
| n8n webhook secret | ✅ Fixed | X-ProLnk-Secret header sent on all outbound calls (n8n-triggers.ts:95) |
| No database backups | ⚠️ Open | Enable at provider level |
| Suspended partner login | ✅ Fixed | PartnerLayout shows locked page |

### Business Risks (Unchanged)

| Risk | Impact | Action |
|------|--------|--------|
| RESPA violation — agent referral fees | ⚠️ Mitigated | Analysis documented (knowledge/respa-compliance-analysis.md), safeguards in agent agreement — engage TX attorney before live commissions |
| LLM cost spikes | ✅ Fixed | 5/IP/hour + 15/user/day rate limits in analyzePhotos |
| Commission disputes no escrow | ✅ Mitigated | Commissions only fire after homeowner_confirmed flag + job close (routers.ts:1884) |
| No formal partner agreement | ✅ Fixed | PartnerAgreement.tsx + AgentAgreement.tsx with e-sign flows |
| Homeowner data consent | ✅ Fixed | Consent checkbox added to PhotoScan.tsx before AI analysis |
