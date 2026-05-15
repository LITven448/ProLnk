import { useState, useMemo } from "react";
import {
  CheckCircle2, Circle, Clock, AlertCircle, ChevronDown, ChevronRight,
  Zap, Bot, User, X, RefreshCw
} from "lucide-react";
import { T } from "@/components/AdminLayout";
import { trpc } from "@/lib/trpc";

// --- Todo Item Types ----------------------------------------------------------
type ItemStatus = "done" | "in-progress" | "needs-you" | "pending";

interface TodoItem {
  id: string;
  label: string;
  status: ItemStatus;
  tier: string;
}

// --- Master Platform Todo -- Full Backlog -------------------------------------
// Sections: Bugs, Auth, Partner Portal, Field OS, Admin, TrustyPro, Revenue,
//           Integrations, Marketing, Data & AI, Legal/Docs, Infrastructure
const TODO_ITEMS: TodoItem[] = [

  // -- BUGS & CRITICAL FIXES --------------------------------------------------
  { id: "BUG-01", label: "Fix OAuth btoa/atob decode mismatch (login 404)", status: "done", tier: "Bugs" },
  { id: "BUG-02", label: "Add DB null guards in routers.ts (crash on DB drop)", status: "done", tier: "Bugs" },
  { id: "BUG-03", label: "Fix decimal string parsing in db.ts (NaN commissions)", status: "done", tier: "Bugs" },
  { id: "BUG-04", label: "Fix useEffect missing deps in PartnerLayout (stale closure)", status: "done", tier: "Bugs" },
  { id: "BUG-05", label: "Verify partner login + Admin button work after republish", status: "needs-you", tier: "Bugs" },
  { id: "BUG-06", label: "Remove all legacy branding references (comments, metadata, package.json)", status: "done", tier: "Bugs" },
  { id: "BUG-07", label: "Full platform audit -- every route renders without crash", status: "done", tier: "Bugs" },
  { id: "BUG-08", label: "Scan browser console for errors across all major pages", status: "done", tier: "Bugs" },
  { id: "BUG-09", label: "Fix HomeownerDashboard import paths (broken in some builds)", status: "done", tier: "Bugs" },
  { id: "BUG-10", label: "Fix CommissionLedger CSV export (real payout status badges)", status: "done", tier: "Bugs" },

  // -- CREDENTIALS / EXTERNAL SERVICES (NEEDS YOU) ---------------------------
  { id: "CRED-01", label: "Add RESEND_API_KEY for email delivery", status: "needs-you", tier: "Credentials" },
  { id: "CRED-02", label: "Add TWILIO_ACCOUNT_SID, AUTH_TOKEN, FROM_NUMBER for SMS", status: "needs-you", tier: "Credentials" },
  { id: "CRED-03", label: "Claim Stripe sandbox at dashboard.stripe.com/claim_sandbox", status: "needs-you", tier: "Credentials" },
  { id: "CRED-04", label: "Add live Stripe keys after KYC in Settings  Payment", status: "needs-you", tier: "Credentials" },
  { id: "CRED-05", label: "Provide Google Maps API key (or confirm Manus proxy is sufficient)", status: "needs-you", tier: "Credentials" },

  // -- PARTNER PORTAL ---------------------------------------------------------
  { id: "PP-01", label: "Partner Onboarding Wizard -- Step 4: FSM tag setup", status: "done", tier: "Partner Portal" },
  { id: "PP-02", label: "Partner Onboarding Wizard -- Step 5: Stripe Connect payout setup", status: "done", tier: "Partner Portal" },
  { id: "PP-03", label: "Partner Onboarding Wizard -- Step 6: First job walkthrough animation", status: "done", tier: "Partner Portal" },
  { id: "PP-04", label: "Partner Onboarding -- progress indicator + 'Resume Onboarding' dashboard banner", status: "done", tier: "Partner Portal" },
  { id: "PP-05", label: "Partner Onboarding completion rate tracker in admin", status: "done", tier: "Partner Portal" },
  { id: "PP-06", label: "EarningsTracker -- tier badge + Scout cap warning banner", status: "done", tier: "Partner Portal" },
  { id: "PP-07", label: "Partner Settings page -- account, notification prefs, payout info", status: "done", tier: "Partner Portal" },
  { id: "PP-08", label: "Service Area Setup -- zip code manager (add/remove)", status: "done", tier: "Partner Portal" },
  { id: "PP-09", label: "Partner Profile Editor -- bio, services, coverage area, photo", status: "done", tier: "Partner Portal" },
  { id: "PP-10", label: "Partner Public Profile /partner/:id -- full polish", status: "done", tier: "Partner Portal" },
  { id: "PP-11", label: "Partner Public Profile -- Service Area Map (Google Maps zone circle)", status: "done", tier: "Partner Portal" },
  { id: "PP-12", label: "Partner Public Profile -- SEO (Helmet, OG tags, JSON-LD LocalBusiness)", status: "done", tier: "Partner Portal" },
  { id: "PP-13", label: "Partner Referral Funnel Tracker -- visual per-referral pipeline", status: "done", tier: "Partner Portal" },
  { id: "PP-14", label: "Partner Tier Upgrade Flow -- in-app prompt at 90% of next tier", status: "done", tier: "Partner Portal" },
  { id: "PP-15", label: "Partner Tier Upgrade -- Stripe Checkout (Pro $29, Crew $79, Co $149, Ent $299)", status: "done", tier: "Partner Portal" },
  { id: "PP-16", label: "Partner Leaderboard Gamification -- badges (Top Referrer, Fastest Responder, Rising Star)", status: "done", tier: "Partner Portal" },
  { id: "PP-17", label: "Partner Achievement Badges -- milestone unlocks displayed on profile", status: "done", tier: "Partner Portal" },
  { id: "PP-18", label: "Partner Streak Counter -- consecutive months with referrals", status: "done", tier: "Partner Portal" },
  { id: "PP-19", label: "Partner Notification Center -- in-app alerts for leads, commissions, milestones", status: "done", tier: "Partner Portal" },
  { id: "PP-20", label: "Notification Preferences page -- per-channel toggles", status: "done", tier: "Partner Portal" },
  { id: "PP-21", label: "What's New changelog page /dashboard/whats-new", status: "done", tier: "Partner Portal" },
  { id: "PP-22", label: "AI Chat Assistant /dashboard/ai -- real LLM + partner context", status: "done", tier: "Partner Portal" },
  { id: "PP-23", label: "Priority Score card on PartnerDashboard -- 7-signal breakdown", status: "done", tier: "Partner Portal" },
  { id: "PP-24", label: "Exchange Mode -- job board feed, commission calculator, Post a Job", status: "done", tier: "Partner Portal" },
  { id: "PP-25", label: "Homeowner Review Request -- partner triggers review after job close", status: "done", tier: "Partner Portal" },
  { id: "PP-26", label: "Commission Dispute Flow -- 'Flag for Review' button on commission record", status: "done", tier: "Partner Portal" },
  { id: "PP-27", label: "Commission Dispute -- reason form + disputedCommissions table", status: "done", tier: "Partner Portal" },
  { id: "PP-28", label: "Payout Setup page /dashboard/payout-setup -- Stripe Connect onboarding", status: "done", tier: "Partner Portal" },
  { id: "PP-29", label: "Payout History page -- commission timeline, pending, paid, method", status: "done", tier: "Partner Portal" },
  { id: "PP-30", label: "Request Payout button -- partners with pending commissions", status: "done", tier: "Partner Portal" },
  { id: "PP-31", label: "Co-Branded Marketing Materials -- downloadable PDF flyers, door hangers", status: "done", tier: "Partner Portal" },
  { id: "PP-32", label: "Social Graphics Pack -- downloadable assets for partner use", status: "done", tier: "Partner Portal" },
  { id: "PP-33", label: "Co-Branded Email Template -- partners can send to existing customers", status: "done", tier: "Partner Portal" },
  { id: "PP-34", label: "Partner API Documentation page /docs/api -- FSM integration reference", status: "done", tier: "Partner Portal" },
  { id: "PP-35", label: "Mobile redirect -- /dashboard  /field-os on screens < 768px", status: "done", tier: "Partner Portal" },

  // -- FIELD OS ---------------------------------------------------------------
  { id: "FOS-01", label: "FieldOS root shell /field-os -- bottom tab bar, dark theme", status: "done", tier: "Field OS" },
  { id: "FOS-02", label: "FieldHome -- earnings dashboard, AI pipeline status, streak, quick actions", status: "done", tier: "Field OS" },
  { id: "FOS-03", label: "FieldJobLog -- GPS auto-fill, job type pre-select, photo capture (1-5)", status: "done", tier: "Field OS" },
  { id: "FOS-04", label: "FieldAIFeed -- opportunity cards with commission estimate, one-tap referral", status: "done", tier: "Field OS" },
  { id: "FOS-05", label: "FieldHomeProfiles -- address history, visit count, asset health, leads generated", status: "done", tier: "Field OS" },
  { id: "FOS-06", label: "FieldEarnings -- commission timeline, this month, lifetime, pending, paid", status: "done", tier: "Field OS" },
  { id: "FOS-07", label: "GPS auto-fill with 5-second timeout + manual address fallback", status: "done", tier: "Field OS" },
  { id: "FOS-08", label: "Camera-first photo capture -- full-screen camera, up to 5 photos per job", status: "done", tier: "Field OS" },
  { id: "FOS-09", label: "Client-side photo compression (target 800KB, browser-image-compression)", status: "done", tier: "Field OS" },
  { id: "FOS-10", label: "Offline photo queue -- localStorage sync + 'X photos queued' badge", status: "done", tier: "Field OS" },
  { id: "FOS-11", label: "Photo quality indicator (Good / Retake) before submission", status: "done", tier: "Field OS" },
  { id: "FOS-12", label: "Job type pre-selection based on partner's trade category", status: "done", tier: "Field OS" },
  { id: "FOS-13", label: "'Flag a Property' flow -- nearby property scan with address tag", status: "done", tier: "Field OS" },
  { id: "FOS-14", label: "PWA install prompt on first visit to /field-os", status: "done", tier: "Field OS" },
  { id: "FOS-15", label: "Wire FieldOS photo upload to real AI pipeline (jobs.logJob tRPC)", status: "done", tier: "Field OS" },
  { id: "FOS-16", label: "Field OS -- V2 job logging: step-by-step wizard, better photo UX", status: "done", tier: "Field OS" },
  { id: "FOS-17", label: "Field OS -- job history: filterable list with AI scan results per job", status: "done", tier: "Field OS" },
  { id: "FOS-18", label: "Field OS -- inbound leads: mobile-optimized accept/pass flow", status: "done", tier: "Field OS" },

  // -- ADMIN PORTAL -----------------------------------------------------------
  { id: "ADM-01", label: "Admin Agent Workboard -- full master backlog (this list)", status: "in-progress", tier: "Admin" },
  { id: "ADM-02", label: "Admin CommandCenter -- Platform Health Monitor card (uptime, API, DB)", status: "done", tier: "Admin" },
  { id: "ADM-03", label: "Admin Broadcast 2.0 -- scheduled sends + delivery stats", status: "done", tier: "Admin" },
  { id: "ADM-04", label: "Admin Bulk Actions -- bulk approve, bulk message, bulk tier change", status: "done", tier: "Admin" },
  { id: "ADM-05", label: "Admin Partner Approval -- reject reason modal + status tracking", status: "done", tier: "Admin" },
  { id: "ADM-06", label: "Admin Commission Disputes queue -- Approve/Reject/Request More Info", status: "done", tier: "Admin" },
  { id: "ADM-07", label: "Admin FSM Webhook Events Log /admin/fsm-events -- full UI", status: "done", tier: "Admin" },
  { id: "ADM-08", label: "FSM Events Log -- manual match action for unmatched events", status: "done", tier: "Admin" },
  { id: "ADM-09", label: "FSM Events Log -- CSV export of unmatched events", status: "done", tier: "Admin" },
  { id: "ADM-10", label: "Admin n8n Webhook Manager -- add/edit/delete subscriptions", status: "done", tier: "Admin" },
  { id: "ADM-11", label: "n8n Webhook Manager -- 'Test Fire' button per subscription", status: "done", tier: "Admin" },
  { id: "ADM-12", label: "n8n Webhook Manager -- delivery log (last 20 attempts, status, response time)", status: "done", tier: "Admin" },
  { id: "ADM-13", label: "n8n triggers -- new partner application, tier upgrade, TrustyPro lead, commission paid, inactivity", status: "done", tier: "Admin" },
  { id: "ADM-14", label: "Platform Health Dashboard /admin/health -- DB status, job health, error rate, FSM health", status: "done", tier: "Admin" },
  { id: "ADM-15", label: "Platform Health -- Force PPS Recalculate + Force Lead Sweep buttons", status: "done", tier: "Admin" },
  { id: "ADM-16", label: "Admin Analytics Export -- PDF export option (CSV already done)", status: "done", tier: "Admin" },
  { id: "ADM-17", label: "Admin Activity Log -- wire to real DB activityLog (replace mock data)", status: "done", tier: "Admin" },
  { id: "ADM-18", label: "Admin Payouts -- Commission Auto-Pay dashboard (Stripe Connect readiness per partner)", status: "done", tier: "Admin" },
  { id: "ADM-19", label: "Admin Payouts -- one-click batch pay for all unpaid commissions", status: "done", tier: "Admin" },
  { id: "ADM-20", label: "Admin Leaderboard Gamification -- admin can award custom badges manually", status: "done", tier: "Admin" },
  { id: "ADM-21", label: "Admin Data Consent column in Data Marketplace -- per-homeowner opt-in count", status: "done", tier: "Admin" },
  { id: "ADM-22", label: "Admin B2B Data Exchange page (Patent Claims 23, 26-27)", status: "done", tier: "Admin" },
  { id: "ADM-23", label: "Admin Property Condition Reports page (Patent Claims 21-22)", status: "done", tier: "Admin" },
  { id: "ADM-24", label: "Admin AI Retraining Dashboard (Patent Claims 1g-h, 7)", status: "done", tier: "Admin" },
  { id: "ADM-25", label: "Admin Integration Health -- per-partner connection table, sync status, 48h alert flags", status: "done", tier: "Admin" },
  { id: "ADM-26", label: "Admin Integration Health -- platform-level summary bar (connected/degraded/disconnected)", status: "done", tier: "Admin" },
  { id: "ADM-27", label: "Admin Setup -- real system config, admin management, platform settings", status: "done", tier: "Admin" },
  { id: "ADM-28", label: "Admin Global Search -- wire to real DB (partners, jobs, opportunities)", status: "done", tier: "Admin" },
  { id: "ADM-29", label: "Admin Notifications Bell -- unread badge + real DB activityLog", status: "done", tier: "Admin" },
  { id: "ADM-30", label: "Admin Photo Density by Zip -- HeatMap upgrade with photo density table", status: "done", tier: "Admin" },

  // -- TRUSTYPRO -- HOMEOWNER PLATFORM ----------------------------------------
  { id: "TP-01", label: "TrustyPro /trustypro/scan -- AI photo scan flow (drag-drop, 5 photos)", status: "done", tier: "TrustyPro" },
  { id: "TP-02", label: "TrustyPro AI scan -- display detected issues, matched pro card, Request Estimate CTA", status: "done", tier: "TrustyPro" },
  { id: "TP-03", label: "TrustyPro AI scan -- auto-create opportunity record, route to nearest partner", status: "done", tier: "TrustyPro" },
  { id: "TP-04", label: "TrustyPro Pro Directory /trustypro/pros -- searchable, filterable", status: "done", tier: "TrustyPro" },
  { id: "TP-05", label: "TrustyPro -- wire 'Scan My Home Free' hero button to /trustypro/scan", status: "done", tier: "TrustyPro" },
  { id: "TP-06", label: "TrustyPro -- 'My Account' nav link  /my-home after login", status: "done", tier: "TrustyPro" },
  { id: "TP-07", label: "TrustyPro -- intake form style preference fields (home style, color palette, aesthetic)", status: "done", tier: "TrustyPro" },
  { id: "TP-08", label: "TrustyPro -- Value Impact badge per improvement category in intake wizard", status: "done", tier: "TrustyPro" },
  { id: "TP-09", label: "TrustyPro -- Property Value Estimator card on homeowner dashboard (AVM + improvements)", status: "done", tier: "TrustyPro" },
  { id: "TP-10", label: "TrustyPro -- Before/After AI Generator: 'Generate Vision' button in homeowner photo view", status: "done", tier: "TrustyPro" },
  { id: "TP-11", label: "TrustyPro -- AI mockup auto-attaches to outbound referral notification email", status: "done", tier: "TrustyPro" },
  { id: "TP-12", label: "TrustyPro -- homeowner sees mockup before logging in (in referral email)", status: "done", tier: "TrustyPro" },
  { id: "TP-13", label: "TrustyPro -- Property Intelligence Report: AI summary, repair costs, priority ranking", status: "done", tier: "TrustyPro" },
  { id: "TP-14", label: "TrustyPro -- Property Intelligence Report: PDF export", status: "done", tier: "TrustyPro" },
  { id: "TP-15", label: "TrustyPro -- Partner receives copy of Property Intelligence Report when matched", status: "done", tier: "TrustyPro" },
  { id: "TP-16", label: "TrustyPro -- HomeownerProjects: show submitted leads with status", status: "done", tier: "TrustyPro" },
  { id: "TP-17", label: "TrustyPro -- HomeownerPros: show matched partner profile after scan", status: "done", tier: "TrustyPro" },
  { id: "TP-18", label: "TrustyPro -- 'Rate Your Pro' flow after job completion", status: "done", tier: "TrustyPro" },
  { id: "TP-19", label: "TrustyPro -- Review & Trust Engine: wire HomeownerReviews to real partnerReviews data", status: "done", tier: "TrustyPro" },
  { id: "TP-20", label: "TrustyPro -- Homeowner SMS confirmation auto-closes commission record", status: "done", tier: "TrustyPro" },
  { id: "TP-21", label: "TrustyPro -- Scroll animations (Estatia-style) on landing page", status: "done", tier: "TrustyPro" },
  { id: "TP-22", label: "TrustyPro -- ProLnk keeps 100% commission on TrustyPro-originated leads (enforce in routing)", status: "done", tier: "TrustyPro" },

  // -- HOMEOWNER PORTAL (/my-home) --------------------------------------------
  { id: "HO-01", label: "HomeownerDashboard -- Property Health Score card (Event-Driven Engine)", status: "done", tier: "Homeowner" },
  { id: "HO-02", label: "HomeownerDashboard -- Proactive Offer Feed from event-driven engine", status: "done", tier: "Homeowner" },
  { id: "HO-03", label: "HomeownerDashboard -- wire to real DB homeowner profile data", status: "done", tier: "Homeowner" },
  { id: "HO-04", label: "HomeownerProfile -- Data & Privacy page /my-home/privacy with consent toggles", status: "done", tier: "Homeowner" },
  { id: "HO-05", label: "HomeownerProperty -- wire to real DB data (demo data removed)", status: "done", tier: "Homeowner" },
  { id: "HO-06", label: "HomeownerOffers -- referral cards show style-matched mockup preview", status: "done", tier: "Homeowner" },
  { id: "HO-07", label: "HomeownerMessages -- wire to real DB messages table", status: "done", tier: "Homeowner" },
  { id: "HO-08", label: "HomeownerInvoices -- wire to real DB via getMyDeals", status: "done", tier: "Homeowner" },
  { id: "HO-09", label: "HomeownerReviews -- wire to real DB via homeowner.getMyReviews", status: "done", tier: "Homeowner" },
  { id: "HO-10", label: "HomeownerSetup Wizard /my-home/setup -- 7-section intake (address, improvements, wishes, photos, style, consent)", status: "done", tier: "Homeowner" },
  { id: "HO-11", label: "HomeownerSetup -- multiple properties support ('Add Another Property')", status: "done", tier: "Homeowner" },
  { id: "HO-12", label: "HomeownerSetup -- redirect new homeowners to setup on first login", status: "done", tier: "Homeowner" },
  { id: "HO-13", label: "HomeownerProjects -- merged photo upload + request pro (Projects tab)", status: "done", tier: "Homeowner" },
  { id: "HO-14", label: "Before/After AI Generator /my-home/transform -- real AI mockup generation", status: "done", tier: "Homeowner" },
  { id: "HO-15", label: "HomeownerLayout -- auth redirect to Manus OAuth if not authenticated", status: "done", tier: "Homeowner" },
  { id: "HO-16", label: "HomeownerLayout -- logout button in sidebar bottom section", status: "done", tier: "Homeowner" },

  // -- REVENUE & PAYMENTS -----------------------------------------------------
  { id: "REV-01", label: "Stripe Connect -- partner bank account onboarding flow", status: "done", tier: "Revenue" },
  { id: "REV-02", label: "Stripe Connect -- webhook: account.updated marks onboarding complete", status: "done", tier: "Revenue" },
  { id: "REV-03", label: "Stripe Connect -- commission payouts trigger automatically on job close", status: "done", tier: "Revenue" },
  { id: "REV-04", label: "Stripe Connect -- payout history visible on partner earnings page", status: "done", tier: "Revenue" },
  { id: "REV-05", label: "Stripe Tier Upgrade -- Checkout session + webhook updates partner tier in DB", status: "done", tier: "Revenue" },
  { id: "REV-06", label: "Stripe Tier Upgrade -- success page shows new tier badge + commission rate", status: "done", tier: "Revenue" },
  { id: "REV-07", label: "Modular Pricing Add-Ons -- interactive selector below pricing tiers (live total)", status: "done", tier: "Revenue" },
  { id: "REV-08", label: "Add-Ons: Extra Seats ($15), Priority Routing ($29), White-Label Reports ($19), TrustyPro Connect ($39), Preferred Routing ($99), Co-Marketing ($149)", status: "done", tier: "Revenue" },
  { id: "REV-09", label: "Remove API Access as paid add-on (include in Pro/Teams base)", status: "done", tier: "Revenue" },
  { id: "REV-10", label: "Replace Territory Lock with Preferred Routing ($99/mo) in pricing", status: "done", tier: "Revenue" },
  { id: "REV-11", label: "Commission Dispute -- admin resolves with Approve/Reject/Request More Info", status: "done", tier: "Revenue" },
  { id: "REV-12", label: "Commission Dispute -- partner notified via in-app when dispute is resolved", status: "done", tier: "Revenue" },

  // -- INTEGRATIONS -----------------------------------------------------------
  { id: "INT-01", label: "Resend email -- wire for homeowner deal notifications (needs RESEND_API_KEY)", status: "needs-you", tier: "Integrations" },
  { id: "INT-02", label: "Twilio SMS -- wire for homeowner deal notifications (needs Twilio credentials)", status: "needs-you", tier: "Integrations" },
  { id: "INT-03", label: "Email/SMS send trigger from Photo Approval Queue admin action", status: "done", tier: "Integrations" },
  { id: "INT-04", label: "Google Review automation -- auto-send review link after 4-5 star rating", status: "done", tier: "Integrations" },
  { id: "INT-05", label: "FSM Webhook -- HCP/Jobber job.paid event auto-closes commission record", status: "done", tier: "Integrations" },
  { id: "INT-06", label: "FSM Webhook -- ServiceTitan-compatible POST /api/webhooks/job-complete", status: "done", tier: "Integrations" },
  { id: "INT-07", label: "n8n outbound triggers -- 24 event types, HMAC-signed, typed wrappers", status: "done", tier: "Integrations" },
  { id: "INT-08", label: "n8n setup guide card -- copy-paste workflow import instructions in admin", status: "done", tier: "Integrations" },
  { id: "INT-09", label: "CompanyCam sync -- photo import from CompanyCam to job records", status: "done", tier: "Integrations" },
  { id: "INT-10", label: "Jobber integration -- job sync, lead source tag auto-fill", status: "done", tier: "Integrations" },
  { id: "INT-11", label: "Housecall Pro integration -- job sync, lead source tag auto-fill", status: "done", tier: "Integrations" },
  { id: "INT-12", label: "ServiceTitan Marketplace -- full integration page", status: "done", tier: "Integrations" },

  // -- MARKETING & GROWTH -----------------------------------------------------
  { id: "MKT-01", label: "ProLnk landing page -- scroll-driven animations (Estatia-style)", status: "done", tier: "Marketing" },
  { id: "MKT-02", label: "ProLnk landing page -- Partner Spotlight section (rotating top-rated verified partners)", status: "done", tier: "Marketing" },
  { id: "MKT-03", label: "Public Partner Leaderboard /leaderboard -- top 10 by referrals/jobs/commissions", status: "done", tier: "Marketing" },
  { id: "MKT-04", label: "Network Stats public page /stats -- animated live counters, trust signals", status: "done", tier: "Marketing" },
  { id: "MKT-05", label: "ProLnk infographic -- commercial side mind map / visual", status: "done", tier: "Marketing" },
  { id: "MKT-06", label: "Pitch Deck -- 10-slide investor deck (content outline + generate slides)", status: "done", tier: "Marketing" },
  { id: "MKT-07", label: "Business Plan document -- executive summary, market size, revenue model, projections, GTM", status: "done", tier: "Marketing" },
  { id: "MKT-08", label: "National Expansion -- Mapbox overlay of top 20 cities for ProLnk expansion", status: "done", tier: "Marketing" },
  { id: "MKT-09", label: "Market Expansion Module -- market-by-market growth tracker + partner recruitment tools", status: "done", tier: "Marketing" },
  { id: "MKT-10", label: "PWA -- install prompt refinement + offline fallback page polish", status: "done", tier: "Marketing" },
  { id: "MKT-11", label: "PWA -- service worker cache tuning for partner dashboard", status: "done", tier: "Marketing" },
  { id: "MKT-12", label: "/sitemap.xml endpoint -- list all active partner profile URLs", status: "done", tier: "Marketing" },
  { id: "MKT-13", label: "/robots.txt -- allow crawl of /partner/* and /leaderboard", status: "done", tier: "Marketing" },
  { id: "MKT-14", label: "Watch Demo video modal -- swap placeholder with real Loom URL", status: "needs-you", tier: "Marketing" },
  { id: "MKT-15", label: "Founding Partner Live Counter -- real approved partner count from DB", status: "done", tier: "Marketing" },

  // -- DATA & AI ENGINE -------------------------------------------------------
  { id: "AI-01", label: "AI Photo Pipeline -- real GPT-4o Vision on partner job photos (live)", status: "done", tier: "Data & AI" },
  { id: "AI-02", label: "AI Photo Pipeline -- TrustyPro homeowner photo analysis (live)", status: "done", tier: "Data & AI" },
  { id: "AI-03", label: "Event-Driven Engine -- 4 trigger types (lifecycle, seasonal, recall, storm)", status: "done", tier: "Data & AI" },
  { id: "AI-04", label: "AI Pipeline Monitor /admin/ai-pipeline -- multi-stage waterfall visualization", status: "done", tier: "Data & AI" },
  { id: "AI-05", label: "Home Intelligence /admin/home-intelligence -- AI scans, condition scores, coverage", status: "done", tier: "Data & AI" },
  { id: "AI-06", label: "Storm Watch /admin/storm-watch -- weather-triggered lead engine", status: "done", tier: "Data & AI" },
  { id: "AI-07", label: "Asset Aging /admin/asset-aging -- lifecycle-triggered lead engine", status: "done", tier: "Data & AI" },
  { id: "AI-08", label: "Safety Recalls /admin/recalls -- recall-triggered lead engine", status: "done", tier: "Data & AI" },
  { id: "AI-09", label: "Data Marketplace /admin/data-marketplace -- B2C data asset page", status: "done", tier: "Data & AI" },
  { id: "AI-10", label: "Partner Priority Score (PPS) -- 7-signal algorithm, nightly recalc", status: "done", tier: "Data & AI" },
  { id: "AI-11", label: "Lead Routing -- sort by PPS DESC (not tier) in intake-router.ts", status: "done", tier: "Data & AI" },
  { id: "AI-12", label: "50+ Service Categories expansion -- sub-categories, icons, commission rates", status: "done", tier: "Data & AI" },
  { id: "AI-13", label: "AI Retraining Dashboard -- admin page for model feedback loop (Patent Claim 7)", status: "done", tier: "Data & AI" },

  // -- LEGAL & DOCUMENTATION -------------------------------------------------
  { id: "LEG-01", label: "Pro Services Agreement auto-generator /admin/agreements", status: "done", tier: "Legal & Docs" },
  { id: "LEG-02", label: "NDA template -- downloadable from admin", status: "done", tier: "Legal & Docs" },
  { id: "LEG-03", label: "Operating Agreement template -- downloadable from admin", status: "done", tier: "Legal & Docs" },
  { id: "LEG-04", label: "Privacy Policy page /privacy", status: "done", tier: "Legal & Docs" },
  { id: "LEG-05", label: "Terms of Service page /terms", status: "done", tier: "Legal & Docs" },
  { id: "LEG-06", label: "Patent Architecture documentation -- visible infringement trap copy on marketing site", status: "done", tier: "Legal & Docs" },

  // -- INFRASTRUCTURE & DEVOPS ------------------------------------------------
  { id: "DEV-01", label: "Vitest coverage for all new tRPC procedures (ongoing)", status: "in-progress", tier: "Infrastructure" },
  { id: "DEV-02", label: "No-cache headers for index.html (live site updates without hard refresh)", status: "done", tier: "Infrastructure" },
  { id: "DEV-03", label: "PWA service worker -- skipWaiting + clientsClaim + React dedupe", status: "done", tier: "Infrastructure" },
  { id: "DEV-04", label: "DB schema sync -- all ALTER TABLE migrations applied", status: "done", tier: "Infrastructure" },
  { id: "DEV-05", label: "Seed 500+ realistic DFW demo partners, 1K jobs, $350K+ commission data", status: "done", tier: "Infrastructure" },
  { id: "DEV-06", label: "Nightly PPS recalculation cron job (currently manual trigger only)", status: "done", tier: "Infrastructure" },
  { id: "DEV-07", label: "Lead sweep cron job -- auto-expire leads after 24hr (currently manual)", status: "done", tier: "Infrastructure" },
  { id: "DEV-08", label: "Monthly commission cap reset cron job (Scout $500/mo cap)", status: "done", tier: "Infrastructure" },
  { id: "DEV-09", label: "Error monitoring -- integrate Sentry or equivalent for production errors", status: "done", tier: "Infrastructure" },
  { id: "DEV-10", label: "Rate limiting on public API endpoints (prevent abuse)", status: "done", tier: "Infrastructure" },
];

// --- Status Config ------------------------------------------------------------
const STATUS_CONFIG: Record<ItemStatus, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  "done":        { icon: CheckCircle2, color: "#82D616", bg: "#F0FAE0", label: "Done" },
  "in-progress": { icon: Clock,        color: "#17C1E8", bg: "#E8F9FC", label: "In Progress" },
  "needs-you":   { icon: AlertCircle,  color: "#FBB140", bg: "#FFF8EC", label: "Needs You" },
  "pending":     { icon: Circle,       color: "#AEAEAE", bg: "transparent", label: "Pending" },
};

// --- Tier grouping ------------------------------------------------------------
const TIERS = [
  "Bugs", "Credentials", "Partner Portal", "Field OS", "Admin",
  "TrustyPro", "Homeowner", "Revenue", "Integrations",
  "Marketing", "Data & AI", "Legal & Docs", "Infrastructure"
];
const TIER_LABELS: Record<string, string> = {
  "Bugs":          "Bugs & Critical Fixes",
  "Credentials":   "Credentials / External Services",
  "Partner Portal":"Partner Portal",
  "Field OS":      "Field OS (Mobile App)",
  "Admin":         "Admin Portal",
  "TrustyPro":     "TrustyPro Platform",
  "Homeowner":     "Homeowner Portal (/my-home)",
  "Revenue":       "Revenue & Payments",
  "Integrations":  "Integrations (FSM, Email, SMS)",
  "Marketing":     "Marketing & Growth",
  "Data & AI":     "Data & AI Engine",
  "Legal & Docs":  "Legal & Documentation",
  "Infrastructure":"Infrastructure & DevOps",
};

// --- Component ----------------------------------------------------------------
export default function AdminTodoPanel({ onClose }: { onClose: () => void }) {
  const [expandedTiers, setExpandedTiers] = useState<Set<string>>(new Set(["Bugs", "Credentials"]));
  const [filter, setFilter] = useState<ItemStatus | "all">("all");

  // Live platform data to surface actionable alerts
  const { data: pending, refetch: refetchPending }   = trpc.admin.getPendingApplications.useQuery();
  const { data: unpaid,  refetch: refetchUnpaid }    = trpc.admin.getUnpaidCommissions.useQuery();
  const { data: qStats,  refetch: refetchQueue }     = trpc.integrations.adminQueueStats.useQuery();

  const pendingApps   = pending?.length ?? 0;
  const unpaidComms   = unpaid?.length  ?? 0;
  const queueBacklog  = (qStats as any)?.pending ?? 0;

  // Build dynamic live items that reflect real DB state
  const LIVE_ITEMS: TodoItem[] = useMemo(() => [
    ...(pendingApps > 0 ? [{ id: "LIVE-01", label: `${pendingApps} partner application${pendingApps > 1 ? 's' : ''} awaiting review`, status: "needs-you" as ItemStatus, tier: "Live Alerts" }] : []),
    ...(unpaidComms > 0 ? [{ id: "LIVE-02", label: `${unpaidComms} commission${unpaidComms > 1 ? 's' : ''} pending payout`, status: "needs-you" as ItemStatus, tier: "Live Alerts" }] : []),
    ...(queueBacklog > 10 ? [{ id: "LIVE-03", label: `Photo intake queue backlog: ${queueBacklog} items`, status: "in-progress" as ItemStatus, tier: "Live Alerts" }] : []),
  ], [pendingApps, unpaidComms, queueBacklog]);

  const ALL_ITEMS = [...LIVE_ITEMS, ...TODO_ITEMS];

  const handleRefresh = () => { refetchPending(); refetchUnpaid(); refetchQueue(); };

  const toggleTier = (tier: string) => {
    setExpandedTiers(prev => {
      const next = new Set(prev);
      if (next.has(tier)) next.delete(tier);
      else next.add(tier);
      return next;
    });
  };

  const filteredItems = filter === "all"
    ? ALL_ITEMS
    : ALL_ITEMS.filter(i => i.status === filter);

  const doneCount       = ALL_ITEMS.filter(i => i.status === "done").length;
  const inProgressCount = ALL_ITEMS.filter(i => i.status === "in-progress").length;
  const needsYouCount   = ALL_ITEMS.filter(i => i.status === "needs-you").length;
  const pendingCount    = ALL_ITEMS.filter(i => i.status === "pending").length;
  const progressPct     = Math.round((doneCount / ALL_ITEMS.length) * 100);

  return (
    <div
      className="flex flex-col h-full"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* -- Header -- */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ borderBottom: `1px solid ${T.border}` }}
      >
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4" style={{ color: T.accent }} />
          <span className="text-sm font-bold" style={{ color: T.text }}>Agent Workboard</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ backgroundColor: T.accent + "20", color: T.accent }}>
            {ALL_ITEMS.length} items
          </span>
          {LIVE_ITEMS.length > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ backgroundColor: "#FFF8EC", color: "#FBB140" }}>
              {LIVE_ITEMS.length} live
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 rounded-lg flex items-center justify-center transition-all"
          style={{ color: T.muted }}
          onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = T.bg}
          onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* -- Progress Summary -- */}
      <div className="px-4 py-3 flex-shrink-0" style={{ borderBottom: `1px solid ${T.border}` }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold" style={{ color: T.text }}>{doneCount}/{TODO_ITEMS.length} Complete</span>
          <span className="text-xs font-bold" style={{ color: T.accent }}>{progressPct}%</span>
        </div>
        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
          <div
            className="h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%`, backgroundColor: T.accent }}
          />
        </div>

        {/* Status pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {inProgressCount > 0 && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: "#E8F9FC", color: "#17C1E8" }}>
              <Clock className="w-2.5 h-2.5" /> {inProgressCount} In Progress
            </div>
          )}
          {needsYouCount > 0 && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: "#FFF8EC", color: "#FBB140" }}>
              <User className="w-2.5 h-2.5" /> {needsYouCount} Needs You
            </div>
          )}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: "#F0FAE0", color: "#82D616" }}>
            <CheckCircle2 className="w-2.5 h-2.5" /> {doneCount} Done
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: T.bg, color: T.muted }}>
            <Circle className="w-2.5 h-2.5" /> {pendingCount} Pending
          </div>
        </div>
      </div>

      {/* -- Filter Bar -- */}
      <div className="flex gap-1 px-3 py-2 flex-shrink-0" style={{ borderBottom: `1px solid ${T.border}` }}>
        {(["all", "needs-you", "in-progress", "pending", "done"] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-2 py-0.5 rounded text-[10px] font-semibold capitalize transition-all"
            style={{
              backgroundColor: filter === f ? T.accent : T.bg,
              color: filter === f ? "#fff" : T.muted,
              border: `1px solid ${filter === f ? T.accent : T.border}`,
            }}
          >
            {f === "all" ? "All" : f === "needs-you" ? "Needs You" : f === "in-progress" ? "Active" : f === "pending" ? "Pending" : "Done"}
          </button>
        ))}
      </div>

      {/* -- Needs You Banner -- */}
      {needsYouCount > 0 && (
        <div
          className="mx-3 mt-2 px-3 py-2 rounded-xl flex items-start gap-2 flex-shrink-0"
          style={{ backgroundColor: "#FFF8EC", border: "1px solid #FBB14030" }}
        >
          <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "#FBB140" }} />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#FBB140" }}>Action Required From You</p>
            <p className="text-[10px] leading-snug mt-0.5" style={{ color: T.text }}>
              {TODO_ITEMS.filter(i => i.status === "needs-you").map(i => i.id).join(", ")} -- see Credentials section
            </p>
          </div>
        </div>
      )}

      {/* -- Checklist -- */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {TIERS.map(tier => {
          const allTierItems = TODO_ITEMS.filter(i => i.tier === tier);
          const items = filter === "all"
            ? allTierItems
            : allTierItems.filter(i => i.status === filter);

          if (items.length === 0) return null;

          const tierDone = allTierItems.filter(i => i.status === "done").length;
          const isExpanded = expandedTiers.has(tier);

          return (
            <div key={tier} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${T.border}` }}>
              {/* Tier header */}
              <button
                onClick={() => toggleTier(tier)}
                className="w-full flex items-center justify-between px-3 py-2 transition-all"
                style={{ backgroundColor: T.bg }}
              >
                <div className="flex items-center gap-2">
                  {isExpanded
                    ? <ChevronDown className="w-3 h-3" style={{ color: T.muted }} />
                    : <ChevronRight className="w-3 h-3" style={{ color: T.muted }} />
                  }
                  <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: T.text }}>
                    {TIER_LABELS[tier]}
                  </span>
                </div>
                <span className="text-[10px] font-semibold" style={{ color: tierDone === allTierItems.length ? "#82D616" : T.muted }}>
                  {tierDone}/{allTierItems.length}
                </span>
              </button>

              {/* Items */}
              {isExpanded && (
                <div className="divide-y" style={{ borderColor: T.border }}>
                  {items.map(item => {
                    const cfg = STATUS_CONFIG[item.status];
                    return (
                      <div
                        key={item.id}
                        className="flex items-start gap-2.5 px-3 py-2.5"
                        style={{
                          backgroundColor:
                            item.status === "in-progress" ? "#F8FEFF" :
                            item.status === "needs-you"   ? "#FFFDF5" : "white"
                        }}
                      >
                        <cfg.icon
                          className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                          style={{ color: cfg.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-[11px] leading-snug"
                            style={{
                              color: item.status === "done" ? T.muted : T.text,
                              textDecoration: item.status === "done" ? "line-through" : "none",
                              fontWeight: item.status === "in-progress" || item.status === "needs-you" ? 600 : 400,
                            }}
                          >
                            {item.label}
                          </p>
                          <p className="text-[9px] mt-0.5 font-semibold uppercase tracking-wider" style={{ color: cfg.color }}>
                            {item.id}  {cfg.label}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* -- Footer -- */}
      <div
        className="px-4 py-3 flex-shrink-0 text-center"
        style={{ borderTop: `1px solid ${T.border}` }}
      >
        <p className="text-[9px] uppercase tracking-wider" style={{ color: T.dim }}>
          {TODO_ITEMS.length} total items  auto-updates as agent completes work
        </p>
      </div>
    </div>
  );
}
