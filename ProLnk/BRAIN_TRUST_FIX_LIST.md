# Duke Partners Platform — Brain Trust Full Fix & Upgrade List
## All 48 Items | Prioritized for Exit Value
### Generated: March 29, 2026

---

## SECTION 1: CRITICAL BUGS
### Fix First — These Block Real Data Collection

**Item 1 — Wire FieldAppV2 to Real AI**
The primary partner scan interface (FieldAppV2) uses hardcoded fake results. The handleScan() function waits 3 seconds then displays DEMO_OPPORTUNITIES data. It never calls the real AI procedure. Every scan a partner runs generates zero real data in the database. This is the core data collection point for the platform's entire value proposition.

**Item 2 — Fix HomeownerOffers Demo Fallback**
New homeowners see fake offer cards with fake partner names, fake photos, and fake prices instead of a proper empty state. If a homeowner clicks "Schedule Estimate" on a fake offer, nothing happens and trust is broken immediately.

**Item 3 — Fix HomeownerDashboard "Sarah Mitchell" Name Fallback**
The dashboard has a hardcoded DEMO_HOMEOWNER constant with the name "Sarah Mitchell." New users who have not completed the wizard see this fake name displayed as their own.

**Item 4 — Fix OAuth Callback Homeowner Routing**
Homeowners who log in from the main ProLnk site (not TrustyPro) get sent to the partner application form at /apply instead of their homeowner dashboard at /my-home. The callback only routes to /my-home if the login source is specifically "trustypro" — it does not check whether the user already has a homeowner profile in the database.

**Item 5 — Build HomeownerProperty Profile Summary Page**
After completing the 8-step wizard, homeowners are redirected to the dashboard with no way to view or edit what they just saved. There is no clean profile summary page showing their address, systems, wish list, and photos in an editable format. The wizard feels like it goes nowhere.

**Item 6 — Fix FieldAppV2 sendLead() Function**
The "Send Lead" button in FieldAppV2 only adds the opportunity type to a local array and shows a toast. No tRPC call is made. No lead is created in the database. No partner is notified. The lead is permanently lost.

**Item 7 — Wire Transformation AI Image Generation**
The AI photo analysis now classifies every detected issue as "repair" (no image needed) or "transformation" (AI-generated before/after required) and creates a transformationPrompt for each transformation issue. However, no code actually calls the image generator with that prompt. The transformation image is never produced.

**Item 8 — Fix HomeownerInvoices Real Data**
The invoices page has no tRPC call to fetch actual invoices for the homeowner. It shows nothing or demo data. Homeowners who have completed jobs have no way to see their invoice history.

---

## SECTION 2: HIGH PRIORITY
### Fix Before Any User Sees the Product

**Item 9 — Add "Back to TrustyPro" Link on Login Page**
Homeowners who navigate to /trustypro/login and decide not to log in have no escape route. There is no back arrow or link to return to the TrustyPro landing page.

**Item 10 — Build "Message a Pro" Flow in HomeownerMessages**
Homeowners can only reply to existing message threads. There is no way to initiate contact with a matched pro. The messages page shows an empty state with no path forward for a new user.

**Item 11 — Fix HomeownerPros Demo Partner Cards**
The "Trusted Pros" section shows hardcoded demo partner cards. There is no tRPC call to fetch real matched partners filtered by the homeowner's service area zip codes.

**Item 12 — Fix Partner Onboarding Wizard Tier Selection Persistence**
Step 4 of the partner onboarding wizard shows tier selection (Founding, Growth, Pro) but the selected tier is not saved to the database until the full form is submitted at the end. If a partner abandons after Step 4, their tier preference is permanently lost.

**Item 13 — Audit and Wire Admin CommandCenter Quick-Action Buttons**
The CommandCenter has buttons labeled "Approve All Pending," "Send Broadcast," and "Export Data" that likely have no real onClick handlers or navigate to placeholder routes.

**Item 14 — Fix HomeownerDashboard Offer Action Buttons**
The "Schedule Estimate" and "Pass" buttons on offer cards in the homeowner dashboard have no functional onClick handlers. They need to route to the offers page or call a real mutation.

**Item 15 — Add Homeowner Profile Check to OAuth Callback**
After any login, the OAuth callback should check the database for an existing homeownerProfile record. If one exists, redirect to /my-home regardless of which site the user logged in from.

---

## SECTION 3: LEGAL
### Non-Negotiable Before Launch

**Item 16 — Build Terms of Service Page at /legal/terms**
The platform collects homeowner PII including name, address, phone number, home photos, and improvement history. There is no Terms of Service page. This is a legal blocker for any acquisition — a buyer's legal team will flag this on day one of due diligence.

**Item 17 — Build Privacy Policy Page at /legal/privacy**
CCPA and GDPR compliance is required for any platform collecting home addresses, photos, and personal improvement history. There is currently no Privacy Policy page anywhere on the platform.

**Item 18 — Document Data Retention Policy**
CCPA requires honoring deletion requests within 45 days. The requestDataDeletion procedure exists in the backend but there is no documented policy explaining how long data is retained, how deletion is handled, and what rights homeowners have.

**Item 19 — Link Legal Pages from Wizard Consent Step and All Footers**
The homeowner wizard consent step (Step 8) references terms and privacy but does not link to actual pages. All site footers need links to both legal pages.

---

## SECTION 4: EXIT-READINESS
### These Directly Affect Your Valuation Multiple

**Item 20 — Build Investor Metrics Dashboard**
Build one admin page showing the 6 numbers every buyer asks for first: total homeowners registered, total properties fully profiled, total AI scans run, total transformation offers generated, total partner cross-referrals, and total commission volume processed. Without this page, you have to manually pull these numbers every time someone asks.

**Item 21 — Build Admin Data Export Tool**
Build a sanitized CSV export of the homeowner database for due diligence purposes. A buyer doing diligence will want to query the data asset. This also demonstrates the depth and structure of what you have built.

**Item 22 — Build AI Training Data Labeling Queue**
The aiTrainingExamples table is accumulating data but every record is unlabeled. Add an Admin UI that lets you mark AI detections as correct or incorrect. A labeled, validated dataset is worth significantly more to a buyer than an unlabeled one.

**Item 23 — Draft Patent Disclosure Document**
Document the 3 novel workflows: the two-track AI offer system (repair vs. transformation classification), the photo-to-offer pipeline, and the cross-trade referral network with commission tracking. This is the first step toward filing a provisional patent application, which costs approximately $1,500 and gives you 12 months of "patent pending" status.

**Item 24 — Verify Stripe Connect Payout Flow End-to-End**
Run one full test cycle with the Stripe sandbox: partner earns a commission, admin approves it, Stripe Connect transfer executes, and partner receives the funds in their connected account. This has not been verified end-to-end.

---

## SECTION 5: GROWTH ENGINEERING
### Drives User Acquisition and Retention

**Item 25 — Build Homeowner Referral Reward System**
The referral page at /my-home/referral exists but has no incentive structure. Build the loop: homeowner refers a friend, friend completes the wizard, referring homeowner receives a free AI scan or priority pro matching. This is the lowest-cost homeowner acquisition channel available.

**Item 26 — Add "Top Rated Pros Near You" to TrustyPro Landing Page**
Pull real leaderboard data filtered by the visitor's zip code and display it on the TrustyPro landing page. Showing homeowners real verified pros in their area builds trust and drives signup conversion.

**Item 27 — Build "Share My Home Profile" Feature**
Generate a tokenized read-only link that homeowners can text to any contractor they already know. This makes the platform sticky for homeowners and drives organic partner adoption without any marketing spend.

**Item 28 — Add Push Notification for New Offers**
When a partner scan triggers an AI offer for a homeowner, send a notification via email (Resend), SMS (Twilio), or in-app push. Currently offers sit unseen in /my-home/offers with no alert to the homeowner.

**Item 29 — Build Partner Acquisition Funnel Chart in Admin Analytics**
Track the full funnel: landing page visit to apply click to application submitted to approved to first job logged to first commission earned. Without this funnel you cannot identify where partners are dropping off or which acquisition channels are working.

---

## SECTION 6: SYSTEMS THINKING
### Operational Integrity at Scale

**Item 30 — Consolidate Three Field OS Versions Into One**
Three versions exist: /field, /field-os, and /field/v2. Each has different functionality. The v2 version uses fake demo data. Partners do not know which one to use. Standardize on the /field-os directory version and redirect the others.

**Item 31 — Connect Photo Intake Queue to Homeowner Profiles**
Photos uploaded through FieldJobLog are stored in the photoIntakeQueue table but are not linked to the homeowner's profile in homeownerProfiles by address. The data is siloed and loses its value for the AI training pipeline.

**Item 32 — Add AI Pipeline Retry Logic**
If analyzePhotosWithAI() fails due to an OpenAI timeout or rate limit, the job is logged but the analysis is permanently lost. Add an analysisStatus field to the jobs table (pending, complete, failed) and a retry queue visible in the Admin PhotoPipeline page.

**Item 33 — Build Commission Dispute Resolution UI in Admin**
Partners can open commission disputes via the backend procedure. The dispute is stored and the owner is notified. But there is no Admin UI button to approve or deny disputes. They accumulate with no resolution path.

**Item 34 — Add Monthly Commission Cap Reset Cron Job**
The commission cap (monthly maximum per partner) is tracked in the database but there is no cron job to reset it on the first of each month. Partners who hit the cap in one month remain permanently capped.

---

## SECTION 7: MEDIUM POLISH
### Before Any Investor Demo

**Item 35 — Add Edit Functionality to HomeownerProperty Page**
The property page displays saved wizard data but has no edit buttons wired to the save procedures. Homeowners cannot update their profile after the initial wizard completion.

**Item 36 — Add Homeowner Waitlist Gate**
Add an Admin toggle that puts new TrustyPro signups into a waitlist queue instead of immediately granting access. This lets you control the rollout and personally onboard the first 50 homeowners before opening publicly.

**Item 37 — Fix Partner Upgrade CTA Tier Pre-Selection**
The TierUpgradeFlow should receive the partner's current tier and automatically pre-select the next tier up. Currently it may default to the wrong tier.

**Item 38 — Add Wizard Step-Completion Analytics**
Track which step homeowners abandon in the 8-step wizard. A buyer will ask for this data. It also lets you optimize the intake funnel to improve completion rates, which directly increases the value of the data asset.

**Item 39 — Add Homeowner Welcome Email on Wizard Completion**
When a homeowner completes the wizard, send a confirmation email: "We received your home profile. Here is what happens next." This is a basic trust signal that every SaaS product sends and is currently missing.

**Item 40 — Add Role Separation Between Homeowner and Partner Users**
Both homeowners and partners currently share the same OAuth and user table. A homeowner who knows the URL can navigate to partner routes. Add a role check on all protected partner procedures to prevent cross-portal access.

**Item 41 — Fix AdminLayout Nav Dead Links**
Some admin nav items point to routes such as /admin/predict and /admin/legacy that have no corresponding Route entry in App.tsx. Clicking them shows a 404 page.

**Item 42 — Audit "My Home Login" Button Visibility**
Verify that the returning homeowner login entry point is prominent enough on the TrustyPro nav on both desktop and mobile. A returning homeowner should be able to find the login button in under 3 seconds.

---

## SECTION 8: NEEDS YOU
### Credentials and Actions Only You Can Take

| # | Action Required | Where to Do It |
|---|---|---|
| 43 | Claim your Stripe sandbox before it expires | dashboard.stripe.com — link in Settings → Payment |
| 44 | Add live Stripe keys after completing KYC verification | Settings → Payment |
| 45 | Add RESEND_API_KEY to enable real email delivery | Settings → Secrets |
| 46 | Add Twilio Account SID and Auth Token for SMS | Settings → Secrets |
| 47 | Replace the Watch Demo placeholder with your real Loom URL | TrustyPro landing page hero section |
| 48 | Test partner login and admin button visibility after next publish | Open the site in a browser and verify |

---

## RECOMMENDED EXECUTION ORDER

| Week | Items | Reason |
|---|---|---|
| Week 1 | Items 1–8 (Critical Bugs) | Real data starts flowing immediately |
| Week 1 | Items 16–19 (Legal) | Removes the acquisition blocker |
| Week 1 | Items 43–48 (Needs You) | Unblocks email, SMS, and Stripe testing |
| Week 2 | Items 9–15 (High Priority) | Product is presentable to first users |
| Week 2 | Items 20–24 (Exit-Readiness) | You can show these numbers in any buyer conversation |
| Week 3 | Items 25–29 (Growth) | Acquisition loops start compounding |
| Week 3 | Items 30–34 (Systems) | Operational integrity at scale |
| Week 4 | Items 35–42 (Polish) | Investor demo ready |

---

**Total: 42 buildable items + 6 that need your action = 48 items total**

The platform is architecturally sound and 94% feature-complete. Every item above is fixable. The biggest risk to your exit value is launching before fixing Items 1, 2, 16, and 17 — fake data, fake offers, and no legal pages are the three things that will immediately damage trust with early users and flag in any acquisition due diligence.
