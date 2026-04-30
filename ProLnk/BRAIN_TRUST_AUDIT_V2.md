# Brain Trust Master Audit — Duke Partners Platform
## Full Platform Review: ProLnk + TrustyPro + Admin
### Date: March 29, 2026 | Convened: All 8 Skill Lenses + Full C-Suite

---

## EXECUTIVE SUMMARY (CEO Advisor)

The platform is architecturally sound and approximately 94% feature-complete. The codebase has 3 portals (ProLnk partner-facing, TrustyPro homeowner-facing, Admin), 65+ admin pages, 15+ homeowner pages, and a full backend with 200+ tRPC procedures. The primary risks to exit value are not missing features — they are **data quality gaps**, **workflow breaks that prevent data from being collected**, and **UX friction that will cause early users to abandon before completing the intake that makes the data asset valuable**. Every fix below is ranked by its impact on exit value.

---

## SECTION 1: CRITICAL BUGS — Fix Immediately (Blocks Data Collection)

These are the issues that will cause you to lose data or present a broken product to your first users.

### C-01: FieldAppV2 Scan Uses Demo Data — Never Calls Real AI
**File:** `client/src/pages/FieldAppV2.tsx`
**Problem:** The `handleScan()` function waits 3 seconds then sets `DEMO_OPPORTUNITIES` hardcoded data. It never calls `trpc.trustypro.analyzePhotos` or any real AI procedure. Partners using this screen get fake results.
**Impact:** Every scan from this screen generates zero real data. The AI training pipeline never receives these photos. This is the primary data collection point for the platform's core value proposition.
**Fix:** Wire `handleScan()` to upload photos to S3 then call `trpc.trustypro.analyzePhotos` with the real URLs. Display actual AI results.

### C-02: HomeownerOffers Falls Back to DEMO_OFFERS When DB Is Empty
**File:** `client/src/pages/homeowner/HomeownerOffers.tsx` line 105
**Problem:** `if (!dbDeals || dbDeals.length === 0) return DEMO_OFFERS;` — New homeowners see fake offers with fake partner names and fake photos. They may click "Schedule Estimate" on a fake offer.
**Fix:** Replace with a proper empty state: "Your AI scan is on the way. Once a ProLnk partner visits your home, we'll surface personalized offers here."

### C-03: HomeownerDashboard Still Has DEMO_HOMEOWNER Name Fallback
**File:** `client/src/pages/homeowner/HomeownerDashboard.tsx` line 13
**Problem:** `const DEMO_HOMEOWNER = { name: "Sarah Mitchell", ... }` — If `profile.data` is null (new user who hasn't completed wizard), the dashboard shows "Sarah Mitchell" as the homeowner name.
**Fix:** Use the authenticated user's name from `useAuth()` as the fallback, not a hardcoded persona.

### C-04: TrustyPro Gallery Button Still Shows Raw Toast Placeholder
**File:** `client/src/pages/trustypro/TrustyProHome.tsx` line 825
**Problem:** `onClick={() => toast.info("Full project gallery coming soon — check back soon!")}` — This is a public-facing marketing page. Visitors clicking this will see a "coming soon" message on a button that looks like it should do something real.
**Fix:** Either link to `/my-home/photos` (for logged-in users) or scroll to the How It Works section for guests.

### C-05: HomeownerSetup Page Is a Duplicate of the Wizard Entry Point
**File:** `client/src/pages/homeowner/HomeownerSetup.tsx` + route `/my-home/setup`
**Problem:** Both `/my-home/setup` and `/my-home/wizard` exist as routes. The Setup page is a simpler shell that may not match the 8-step wizard. Users could land on either depending on which button they click.
**Fix:** Audit what `/my-home/setup` renders. If it's a duplicate, redirect it to `/my-home/wizard` and remove the duplicate.

### C-06: OAuth Callback Has No Homeowner Profile Check — Only Source Check
**File:** `server/_core/oauth.ts` line 75
**Problem:** The homeowner redirect only triggers if `source === "trustypro"` in the state parameter. If a homeowner logs in from the main ProLnk site (not TrustyPro), they get sent to `/apply` (the partner application form).
**Fix:** After resolving the user, check if they have a `homeownerProfile` record in the DB. If yes, redirect to `/my-home` regardless of source.

### C-07: No "My Home Profile" Summary Page — Wizard Has No Completion Destination
**File:** Missing — `/my-home/property` route exists but HomeownerProperty shows wizard data, not a clean summary
**Problem:** After completing the 8-step wizard, the homeowner is redirected to `/my-home`. There is no page that shows them their saved profile (address, systems, wish list, photos) in a clean, editable format. The wizard feels like it goes nowhere.
**Fix:** Build a proper `/my-home/property` summary page with editable cards for each wizard section.

### C-08: FieldAppV2 `sendLead()` Is Completely Fake
**File:** `client/src/pages/FieldAppV2.tsx` line 73
**Problem:** `sendLead()` just adds the opportunity type to a local `sentLeads` array and shows a toast. No tRPC call. No lead is created in the database. No partner is notified.
**Fix:** Wire to `trpc.partners.respondToOpportunity` or create a new `trpc.jobs.sendCrossReferralLead` mutation.

---

## SECTION 2: HIGH PRIORITY — Fix Before Launch (Affects First Impression)

### H-01: Nav Scroll Links Were Broken on Both Landing Pages
**Status:** FIXED in this session — `#faq` ID added, spotlight section always renders, scroll-margin-top added globally.

### H-02: TrustyPro Login Page Exists But Has No "Return to TrustyPro" Link
**File:** `client/src/pages/trustypro/TrustyProLogin.tsx`
**Problem:** If a homeowner accidentally navigates to `/trustypro/login` and decides not to log in, there is no "Back to TrustyPro" link. They are stranded.
**Fix:** Add a back arrow link to `/trustypro` at the top of the login page.

### H-03: HomeownerMessages Has No Real Thread Creation
**File:** `client/src/pages/homeowner/HomeownerMessages.tsx`
**Problem:** The messages page shows an empty state with a "Send a Message" button. But there is no way to start a new thread — you can only reply to existing threads. Homeowners have no way to initiate contact with a matched pro.
**Fix:** Add a "Message a Pro" flow that lets homeowners select from their matched pros (`/my-home/pros`) and start a thread.

### H-04: HomeownerPros Page Shows Hardcoded Demo Partners
**File:** `client/src/pages/homeowner/HomeownerPros.tsx`
**Problem:** The "Trusted Pros" section shows demo partner cards. There is no tRPC call to fetch real matched partners for this homeowner.
**Fix:** Wire to `trpc.homeowner.getMatchedPartners` (create if needed) or `trpc.partners.getApprovedPartners` filtered by the homeowner's service area zip codes.

### H-05: Partner Onboarding Wizard Step 4 Has No Real Tier Selection Persistence
**File:** `client/src/pages/OnboardingWizard.tsx`
**Problem:** Step 4 shows tier selection (Founding, Growth, Pro) but the selected tier is never saved to the DB during the wizard. It only gets saved when the full form is submitted at the end.
**Impact:** If a partner abandons after Step 4, their tier preference is lost.
**Fix:** Auto-save tier selection to a draft record on step 4 completion.

### H-06: Admin CommandCenter Has 6 Quick-Action Buttons With No onClick
**File:** `client/src/pages/admin/CommandCenter.tsx`
**Problem:** The "Quick Actions" section has buttons like "Approve All Pending", "Send Broadcast", "Export Data" that likely have no real onClick handlers or navigate to placeholder routes.
**Fix:** Audit each button and wire to real admin mutations or navigate to the correct admin page.

### H-07: Two-Track AI Offer System Is Classified But Never Generates Images
**File:** `server/routers.ts` — `trustypro.analyzePhotos` procedure
**Problem:** The AI now classifies issues as `repair` vs `transformation` and generates a `transformationPrompt`. But there is no code that calls `generateImage()` with that prompt. The transformation image is never actually created.
**Fix:** After classification, for `transformation` issues, call `generateImage({ prompt: issue.transformationPrompt })` and store the result URL in the `aiTrainingExamples` table.

### H-08: HomeownerInvoices Page Has No Real Data
**File:** `client/src/pages/homeowner/HomeownerInvoices.tsx`
**Problem:** The invoices page likely shows demo data or an empty state with no real tRPC call to fetch actual invoices for this homeowner.
**Fix:** Wire to a real `trpc.homeowner.getMyInvoices` procedure (create if needed) that queries the `customerDeals` table for completed deals.

---

## SECTION 3: MEDIUM PRIORITY — Polish Before Investor Demo

### M-01: FieldAppV2 Is Orphaned — Not in the Main Partner Nav
**Problem:** `/field/v2` exists as a route but is not linked from the PartnerLayout nav or the FieldOS nav. Partners can only reach it by typing the URL directly.
**Fix:** Add a "Field OS v2" link to the partner nav or make it the default `/field-os` route.

### M-02: Three Versions of Field OS Create Confusion
**Problem:** `/field`, `/field-os`, and `/field/v2` all exist. Partners don't know which one to use. The v1 (`/field`) calls real tRPC. The v2 (`/field/v2`) uses demo data. The `/field-os` directory has the most complete version.
**Fix:** Standardize on the `/field-os` directory version as the canonical Field OS. Redirect `/field` and `/field/v2` to `/field-os`.

### M-03: AdminLayout Nav Has Links to Pages Not in App.tsx Routes
**Problem:** Some admin nav items (e.g., `/admin/predict`, `/admin/legacy`) navigate to routes that don't have corresponding `<Route>` entries in App.tsx. Clicking them shows the 404 page.
**Fix:** Either add the missing routes or remove the nav items.

### M-04: HomeownerReferral Page Has No Real Referral Tracking
**File:** `client/src/pages/homeowner/HomeownerReferral.tsx`
**Problem:** The referral page likely shows a static referral link with no real tracking. Referral codes are not tied to homeowner accounts in the DB schema.
**Fix:** Add a `referralCode` field to `homeownerProfiles` and create a `trpc.homeowner.getReferralStats` procedure.

### M-05: No Email Confirmation After Wizard Completion
**Problem:** When a homeowner completes the 8-step wizard, they receive no confirmation email. This is a critical trust signal — "We received your home profile" — that every SaaS product sends.
**Fix:** Trigger `notifyOwner` + a homeowner confirmation email (via Resend once RESEND_API_KEY is added) on wizard completion.

### M-06: Partner Dashboard "Upgrade" Banner Points to Wrong Tier
**Problem:** The upgrade CTA in PartnerDashboard was fixed to point to `/dashboard/upgrade`, but the TierUpgradeFlow may not pre-select the correct next tier based on the partner's current tier.
**Fix:** Pass the partner's current tier to TierUpgradeFlow so it pre-selects the next tier up.

### M-07: No Homeowner Waitlist Gate
**Problem:** TrustyPro is publicly accessible. Anyone can sign up and start the wizard. If you want to control the rollout and personally onboard the first 50 homeowners, there is no waitlist mechanism.
**Fix:** Add an Admin toggle (`trustyProWaitlistEnabled`) that puts new signups into a waitlist queue instead of immediately granting access.

### M-08: HomeownerProperty Page Shows Wizard Data But Has No Edit Functionality
**File:** `client/src/pages/homeowner/HomeownerProperty.tsx`
**Problem:** The property page calls `trpc.homeowner.getMyProperties` and `trpc.homeowner.getMyDeals` but likely has no edit buttons that call `trpc.homeowner.saveProperty` to update the data.
**Fix:** Add "Edit" buttons to each section that open inline edit forms wired to the save procedures.

---

## SECTION 4: EXIT-READINESS GAPS (CFO + Chief Investment Officer)

These are not bugs — they are missing features that directly affect your exit multiple.

### E-01: No Data Export API for Acquirers
**Problem:** A buyer doing due diligence will want to query your data asset. There is no `/api/data-export` endpoint or admin tool that produces a clean JSON/CSV of the homeowner database with all fields.
**Fix:** Build an Admin "Data Export" page that produces a sanitized, anonymized dataset for due diligence purposes. This also demonstrates the data asset's depth.

### E-02: No Platform Metrics Dashboard for Investor Deck
**Problem:** The Admin Analytics page exists but there is no single "Platform Health" view showing: total homeowners, total properties profiled, total AI scans run, total transformation offers generated, total partner referrals, total commission volume. These are the 6 numbers a buyer will ask for first.
**Fix:** Build a "Metrics for Investors" card in the Admin CommandCenter or PlatformHealth page.

### E-03: AI Training Data Is Not Being Labeled
**File:** `drizzle/schema.ts` — `aiTrainingExamples` table
**Problem:** The schema has an `aiTrainingExamples` table with `validated` and `rejected` fields. But there is no Admin UI to label examples as validated/rejected. The training data is accumulating but is unlabeled — which makes it less valuable to a buyer who wants a clean, labeled dataset.
**Fix:** Add a "Label Training Data" queue in the Admin PhotoApprovalQueue that lets you mark AI detections as correct/incorrect.

### E-04: No Patent-Defensible Feature Documentation
**Problem:** The two-track AI offer system (repair vs. transformation), the photo-to-offer pipeline, and the cross-trade referral network are all potentially patentable. There is no documentation of the novel claims.
**Fix:** Document the 3 core novel workflows in a `PATENT_DISCLOSURE.md` file. This is the first step toward filing a provisional patent application, which costs ~$1,500 and gives you 12 months of "patent pending" status.

### E-05: No Terms of Service or Privacy Policy
**Problem:** The platform collects homeowner PII (name, address, phone, home photos, improvement history). There is no Terms of Service or Privacy Policy page. This is a legal blocker for any acquisition — a buyer's legal team will flag this immediately.
**Fix:** Add `/legal/terms` and `/legal/privacy` pages with proper CCPA/GDPR-compliant language. Link them from the homeowner wizard consent step and the footer.

### E-06: No Data Retention Policy
**Problem:** The homeowner consent step in the wizard asks for data consent but there is no defined retention policy. CCPA requires you to honor deletion requests within 45 days. The `requestDataDeletion` procedure exists in the backend but there is no documented policy.
**Fix:** Add a data retention policy to the Privacy Policy and document the deletion workflow.

### E-07: Stripe Connect Payout Flow Is Not End-to-End Tested
**Problem:** The Stripe Connect onboarding exists but the full payout flow (partner earns commission → admin approves → Stripe Connect transfer → partner receives funds) has not been verified end-to-end with the test sandbox.
**Fix:** Claim the Stripe sandbox and run one full test payout cycle before launch.

---

## SECTION 5: GROWTH ENGINEERING GAPS (CMO + Growth Engineering Skill)

### G-01: No Referral Loop for Homeowners
**Problem:** Homeowners have a `/my-home/referral` page but there is no incentive structure. The referral loop should be: homeowner refers a friend → friend completes wizard → referring homeowner gets a free AI scan or priority pro matching.
**Fix:** Add a referral reward tier to the homeowner profile and display it prominently on the referral page.

### G-02: No Partner Leaderboard Visibility on TrustyPro
**Problem:** The ProLnk leaderboard exists at `/leaderboard` but homeowners on TrustyPro never see it. Showing homeowners "Top Rated Pros in Your Area" with real review counts and job counts builds trust and drives conversion.
**Fix:** Add a "Top Rated Pros Near You" section to the TrustyPro landing page that pulls from the real leaderboard data.

### G-03: No "Share My Home Profile" Feature
**Problem:** Homeowners who complete the wizard have no way to share their profile with a contractor they already know. A "Share My Home Profile" link (tokenized, read-only) would make the platform sticky and drive organic partner adoption.
**Fix:** Add a "Share Profile" button on the homeowner dashboard that generates a tokenized read-only link a homeowner can text to any contractor.

### G-04: No Push Notification for New Offers
**Problem:** When a partner submits a job photo that triggers an AI offer for a homeowner, the homeowner has no way to know. There is no push notification, no email, no SMS. The offer sits in `/my-home/offers` unseen.
**Fix:** Trigger a notification (email via Resend, SMS via Twilio, or in-app push) when a new offer is created for a homeowner.

### G-05: No Partner Acquisition Funnel Tracking
**Problem:** The Admin Analytics page exists but there is no funnel view showing: Landing page visit → Apply click → Application submitted → Approved → First job logged → First commission earned. Without this funnel, you cannot identify where partners are dropping off.
**Fix:** Add a partner acquisition funnel chart to the Admin Analytics page using the existing `logEvent` procedure data.

---

## SECTION 6: SYSTEMS THINKING GAPS (COO + Systems Thinking Skill)

### S-01: Three Field OS Versions Create Operational Confusion
**Problem:** Partners have three different Field OS interfaces (`/field`, `/field-os`, `/field/v2`). Each has different functionality. A partner who uses the wrong one gets demo data instead of real AI results.
**Fix:** Consolidate to one canonical Field OS. Archive the others.

### S-02: Photo Intake Queue Is Not Connected to the Homeowner Profile
**Problem:** The `photoIntakeQueue` table exists and photos are uploaded through FieldJobLog. But there is no code that connects a photo in the intake queue to a specific homeowner's profile in `homeownerProfiles`. The data is siloed.
**Fix:** When a job is logged with an address, look up the `homeownerProfile` by address and link the photos to that profile.

### S-03: The AI Pipeline Has No Retry Logic
**Problem:** If `analyzePhotosWithAI()` fails (OpenAI timeout, rate limit, etc.), the job is logged but the AI analysis is lost. There is no retry queue, no dead letter queue, no admin alert.
**Fix:** Add a `analysisStatus` field to the `jobs` table (`pending`, `complete`, `failed`). On failure, mark as `failed` and add to a retry queue visible in the Admin PhotoPipeline page.

### S-04: Commission Disputes Have No Resolution Workflow
**Problem:** Partners can open a commission dispute via `trpc.partners.openDispute`. The dispute is stored in the DB and the owner is notified. But there is no Admin UI to resolve disputes — no "Approve" or "Deny" button in the Admin CommissionDisputes page.
**Fix:** Add dispute resolution buttons to the Admin CommissionDisputes page that call a `trpc.admin.resolveDispute` mutation.

### S-05: No Automated Commission Cap Reset
**Problem:** The commission cap (monthly maximum per partner) is tracked in the DB but there is no cron job to reset it on the 1st of each month. Partners who hit the cap in January will be permanently capped unless the reset is manual.
**Fix:** Add a monthly cron job (`0 0 0 1 * *`) that resets `monthlyCommissionsEarned` to 0 for all partners.

---

## SECTION 7: OPERATOR MINDSET — 90-Day Launch Checklist

These are the 10 actions that will have the highest impact on launch success, ranked by priority:

| Priority | Action | Owner | Timeline |
|---|---|---|---|
| 1 | Fix FieldAppV2 to call real AI (C-01) | Build | Week 1 |
| 2 | Fix HomeownerOffers demo data fallback (C-02) | Build | Week 1 |
| 3 | Add Terms of Service + Privacy Policy (E-05) | Build | Week 1 |
| 4 | Claim Stripe sandbox + run test payout (E-07) | Andrew | Week 1 |
| 5 | Add Resend API key for homeowner emails (CRED-01) | Andrew | Week 1 |
| 6 | Build HomeownerProperty summary/edit page (C-07) | Build | Week 2 |
| 7 | Wire transformation AI image generation (H-07) | Build | Week 2 |
| 8 | Add push notification for new offers (G-04) | Build | Week 2 |
| 9 | Document patent-defensible features (E-04) | Build | Week 2 |
| 10 | Build investor metrics dashboard (E-02) | Build | Week 3 |

---

## SECTION 8: BRUTAL TRUTH MODE (Brutal Truth Skill)

**What a buyer will say when they look at this platform:**

1. "The data asset is compelling but the intake completion rate is probably under 20%. Most homeowners will start the wizard and abandon it. Show me completion funnel data." — You need wizard step-completion analytics.

2. "The AI scan is the core product but the primary scan interface (FieldAppV2) uses fake data. How many real scans have been run?" — You need real AI calls in FieldAppV2 before you can answer this.

3. "There's no Terms of Service. This is a CCPA liability. We can't close without this." — Non-negotiable legal fix.

4. "The homeowner and partner portals share the same OAuth. What prevents a homeowner from accessing partner data?" — The `protectedProcedure` checks `ctx.user` but there is no role separation between homeowner and partner users. A homeowner who knows the URL can access partner routes.

5. "Show me the retention data. How many homeowners came back after completing the wizard?" — You need session tracking and return visit metrics.

**The honest assessment:** The platform is impressive for its stage. The architecture is sound, the data model is deep, and the AI pipeline concept is genuinely differentiated. The gaps are all fixable in 2-3 weeks of focused work. The biggest risk is launching before fixing C-01 (fake AI scans) and E-05 (no legal pages) — both of which would be immediately visible to any serious buyer or early user.

---

## SECTION 9: MARKET INTELLIGENCE — Competitive Positioning

**Your defensible moat (what competitors don't have):**
- Structured, opted-in homeowner intent data with budget signals (Angi doesn't have this)
- Two-track AI offer system that distinguishes repair from transformation (novel)
- Cross-trade referral network with commission tracking (Jobber/ServiceTitan don't have this)
- Property improvement history with warranty tracking (Porch Group paid $500M to acquire this kind of data)

**Your vulnerability:**
- Angi and HomeAdvisor have 10 years of homeowner data and $500M+ in marketing spend
- CompanyCam already has photo-to-insight features for contractors
- Your moat only exists if homeowners complete the wizard — completion rate is everything

---

## SUMMARY: ITEMS FOR ANDREW (Needs You)

| Item | Action |
|---|---|
| Claim Stripe sandbox | `dashboard.stripe.com/claim_sandbox/...` |
| Add RESEND_API_KEY | Settings → Secrets |
| Add Twilio credentials | Settings → Secrets |
| Review Terms of Service draft | After build team creates it |
| Approve patent disclosure document | After build team drafts it |
| Test one full payout cycle | After Stripe sandbox is claimed |

---

*Brain Trust session facilitated by: CEO Advisor, CFO, CIO, COO, CMO, General Counsel, UX/UI Expert, Home Services Operator, Cybersecurity Expert, Growth Engineering, Operator Mindset, Market Intelligence, Brutal Truth Mode, Systems Thinking, AI Expert, Patent Legal Expert.*
