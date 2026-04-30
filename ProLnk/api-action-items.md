# ProLnk / TrustyPro: API Setup & Workflow Testing Action Items

**Internal Operations Guide — Founder Reference**
*Prepared April 2026*

---

## Overview

This document is your complete checklist for getting every API, integration, and workflow live and testable. It is organized by priority — the items at the top are prerequisites for everything else. Each section tells you exactly what to do, where to get the credentials, and how to test that it is working.

The platform is built. The integrations are scaffolded. What remains is connecting real credentials and running end-to-end workflow tests.

---

## Priority 1: Stripe — Commission Payments (Do This First)

**Why it is first:** Stripe is the financial backbone. Until it is claimed and tested, you cannot collect commissions from partners or pay out referral earnings. The test sandbox expires **May 19, 2026**.

### Action Items

| Step | What to Do | Where |
|---|---|---|
| 1 | Claim your Stripe sandbox | https://dashboard.stripe.com/claim_sandbox/YWNjdF8xVENzNGIyUVdUMkFJZWpJLDE3NzQ1NzY1NDQv100jV96aVC2 |
| 2 | Log into Stripe Dashboard | https://dashboard.stripe.com |
| 3 | Go to Developers → API Keys | Copy the **Publishable Key** and **Secret Key** |
| 4 | Go to Developers → Webhooks → Add endpoint | Enter: `https://prolnk.io/api/stripe/webhook` — select events: `checkout.session.completed`, `payment_intent.succeeded`, `customer.subscription.created` |
| 5 | Copy the Webhook Signing Secret | Paste into Settings → Payment in the Manus Management UI |
| 6 | Test with card `4242 4242 4242 4242` | Any future date, any CVV, any zip |

### How to Verify It Works

Navigate to `/admin/finance` in the admin portal. After a test payment, you should see the transaction appear in the Financial Center. If the webhook is connected correctly, the commission record will auto-create in the database.

---

## Priority 2: OpenAI (GPT-4o Vision) — Photo Analysis Engine

**Why it matters:** This is the core AI product. Every job photo uploaded by a partner or homeowner runs through GPT-4o Vision to detect repair opportunities, identify property conditions, and generate the AI scan results. Without a live OpenAI key, the photo analysis returns mock data.

### Action Items

| Step | What to Do | Where |
|---|---|---|
| 1 | Create or log into OpenAI account | https://platform.openai.com |
| 2 | Go to API Keys → Create new secret key | Name it "ProLnk Production" |
| 3 | Add the key to the platform | Settings → Secrets in Manus Management UI — key name: `OPENAI_API_KEY` |
| 4 | Set a spending limit | Recommended: $50/month cap to start — Platform → Usage → Limits |
| 5 | Enable GPT-4o model access | Confirm your account has access to `gpt-4o` (requires payment method on file) |

### How to Test Photo Analysis

1. Log into the partner portal at `/dashboard`
2. Go to Log Job → upload 2-3 photos of any home exterior or interior
3. Submit the job
4. Within 10-15 seconds, the AI Opportunity card should appear showing detected issues
5. In the admin portal, go to `/admin/opportunities` — the detection should appear in the live feed

**What good output looks like:** The AI should return 2-5 detected opportunities per photo set, each with a category (roofing, HVAC, landscaping, etc.), confidence score (0-100), estimated job value, and a plain-English description of what it detected.

**If it fails:** Check `/admin/ai-pipeline` for error logs. Most failures are either an invalid API key or the model returning an unexpected format.

---

## Priority 3: Resend — Homeowner Email Notifications

**Why it matters:** When a partner logs a job and the AI detects an opportunity, the homeowner receives an email with the deal offer. Without Resend configured, no emails go out and the referral loop breaks.

### Action Items

| Step | What to Do | Where |
|---|---|---|
| 1 | Create a Resend account | https://resend.com |
| 2 | Add your sending domain | Resend Dashboard → Domains → Add Domain → enter `prolnk.io` |
| 3 | Add the DNS records Resend provides | In your domain registrar (wherever prolnk.io is managed) — add the 3 TXT/CNAME records |
| 4 | Wait for domain verification | Usually 5-30 minutes |
| 5 | Create an API key | Resend Dashboard → API Keys → Create Key |
| 6 | Add to platform | Settings → Secrets: key name `RESEND_API_KEY` |
| 7 | Set the from address | In the code, the from address is `noreply@prolnk.io` — this will work once the domain is verified |

### How to Test

1. In the admin portal, go to `/admin/deal-composer`
2. Create a test deal for any partner
3. Enter your own email address as the homeowner email
4. Click Send — you should receive the homeowner deal email within 60 seconds

---

## Priority 4: Twilio — SMS Notifications

**Why it matters:** The homeowner deal notification also goes out via SMS. SMS has a 98% open rate vs. 20% for email. This is the primary channel for getting homeowners to view and respond to deal offers.

### Action Items

| Step | What to Do | Where |
|---|---|---|
| 1 | Create a Twilio account | https://www.twilio.com |
| 2 | Get a phone number | Twilio Console → Phone Numbers → Buy a Number — get a DFW area code (214, 469, 972) |
| 3 | Get your Account SID and Auth Token | Twilio Console → Dashboard (top of page) |
| 4 | Add to platform | Settings → Secrets: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER` |
| 5 | Verify your own number for testing | Twilio trial accounts require verifying recipient numbers — add your cell phone |

### How to Test

Same as Resend test above — create a test deal in `/admin/deal-composer`, enter your own cell number as the homeowner phone, and click Send. You should receive an SMS within 30 seconds.

**Cost note:** Twilio charges approximately $0.0079 per SMS sent. At 1,000 deals per month, that is $7.90/month. Not a meaningful cost.

---

## Priority 5: CompanyCam — Photo Intake from Field Pros

**Why it matters:** Most professional contractors already use CompanyCam to document their jobs. Connecting CompanyCam means their job photos automatically flow into the ProLnk AI pipeline without any extra steps from the partner. This is the primary integration for partner adoption.

### Action Items

| Step | What to Do | Where |
|---|---|---|
| 1 | Apply for CompanyCam Developer Access | https://companycam.com/developers — click "Apply for API Access" |
| 2 | Fill out the developer application | Describe ProLnk as a "partner network platform that routes AI-detected opportunities to licensed contractors" |
| 3 | Wait for approval | Typically 3-7 business days |
| 4 | Get your Client ID and Client Secret | CompanyCam Developer Dashboard after approval |
| 5 | Add to platform | Settings → Secrets: `COMPANYCAM_CLIENT_ID`, `COMPANYCAM_CLIENT_SECRET` |
| 6 | Register your webhook URL | In CompanyCam Developer settings, add webhook: `https://prolnk.io/api/webhooks/companycam` — select event: `photo.created` |

### How to Test

1. Go to `/admin/companycam-guide` in the admin portal — this has the full step-by-step workflow
2. Once credentials are live, a partner can connect their CompanyCam account from their partner portal Settings page
3. When they upload a photo in CompanyCam, it should appear in `/admin/photo-pipeline` within 60 seconds

**The full developer registration workflow is already built at `/admin/companycam-guide`** — walk through it step by step.

---

## Priority 6: Jobber — Automatic Job Sync

**Why it matters:** Jobber is the most popular field service management software for home service companies. Connecting Jobber means job completions automatically trigger the AI analysis pipeline — no manual photo upload required.

### Action Items

| Step | What to Do | Where |
|---|---|---|
| 1 | Create a Jobber Developer account | https://developer.getjobber.com |
| 2 | Create a new application | Name: "ProLnk Partner Network" — Redirect URI: `https://prolnk.io/api/oauth/jobber/callback` |
| 3 | Get Client ID and Client Secret | Jobber Developer Dashboard |
| 4 | Add to platform | Settings → Secrets: `JOBBER_CLIENT_ID`, `JOBBER_CLIENT_SECRET` |
| 5 | Register webhook | In Jobber app settings: webhook URL `https://prolnk.io/api/webhooks/jobber` — event: `job.completed` |

### How to Test

1. Go to `/admin/jobber` in the admin portal
2. Once credentials are live, partners connect their Jobber account via OAuth from their Settings page
3. Complete a test job in Jobber — within 2 minutes it should appear in the ProLnk photo pipeline

---

## Priority 7: Housecall Pro — API Key Integration

**Why it matters:** Housecall Pro is the second most popular FSM for residential contractors. Unlike Jobber, it uses API key authentication (simpler to set up).

### Action Items

| Step | What to Do | Where |
|---|---|---|
| 1 | Apply for Housecall Pro API access | https://www.housecallpro.com/partners — click "Become a Partner" |
| 2 | Get your API key after approval | Housecall Pro Developer Portal |
| 3 | Add to platform | Settings → Secrets: `HOUSECALLPRO_API_KEY` |
| 4 | Configure webhook | Webhook URL: `https://prolnk.io/api/webhooks/housecallpro` — event: `job.completed` |

---

## Priority 8: Google Maps — Already Working, Verify It

**Good news:** The Google Maps integration uses the Manus proxy and requires no API key from you. It is already fully functional. However, you should verify it is working correctly in production.

### How to Test

1. Go to `/admin/map` in the admin portal
2. The DFW partner map should load with colored pins for each partner
3. Go to `/partners` on the public site — the partner directory map should load
4. Go to the TrustyPro homeowner platform and try the address lookup — it should autocomplete DFW addresses

If any of these fail, it is a proxy configuration issue that can be resolved without any API key changes.

---

## Workflow Testing Checklist

Once the APIs above are configured, run these end-to-end workflow tests in order. Each test validates a complete user journey.

### Test 1: The Core Referral Loop (Most Important)

This is the entire business model in one test.

1. Log into the partner portal as a test partner (`/dashboard`)
2. Go to Log Job → enter a DFW address, select "Roofing" as service type, upload 2-3 photos of a house
3. Submit the job
4. **Expected:** AI analysis runs (10-15 seconds), opportunity card appears showing detected issues
5. Go to `/admin/opportunities` — the detection should appear in the live feed
6. In admin, go to `/admin/deal-composer` — compose a deal for the detected opportunity
7. Enter your own email and phone as the homeowner
8. Click Send
9. **Expected:** You receive an email and SMS with the deal offer within 60 seconds
10. Click the link in the email — the homeowner deal page (`/deal/:token`) should load
11. Click "I'm Interested" — fill out the contact form
12. **Expected:** The partner receives a notification in their portal under Inbound Leads
13. In admin, go to `/admin/deal-pipeline` — the deal should have moved from "Deal Sent" to "Homeowner Responded"

### Test 2: The TrustyPro Homeowner Photo Scan

1. Go to `prolnk.io/trustypro` (or the TrustyPro home page)
2. Sign up as a test homeowner
3. Go to My Projects → Create New Project
4. Upload 3-4 photos of any home (interior or exterior)
5. Type a description and click "Enhance with AI"
6. **Expected:** AI rewrites the description to be precise and repair-focused
7. Submit the project
8. **Expected:** AI analysis returns repair recommendations within 15 seconds
9. Go to `/homeowner/offers` — featured advertiser banners should appear alongside the AI recommendations

### Test 3: The Partner Verification Flow

1. Go to `/apply` on the ProLnk site
2. Fill out the partner application with test data (use a real license number format)
3. Submit
4. **Expected:** Owner notification email arrives (via the `notifyOwner` system)
5. Log into admin → `/admin/pipeline` — the application should appear in the "Applied" column
6. Click Approve
7. **Expected:** Partner receives approval email and can now log into the partner portal

### Test 4: Commission Calculation

1. In the partner portal, log a completed job with a $5,000 job value
2. Mark it as closed in the admin deal pipeline
3. Go to `/admin/finance` — the commission should appear as pending
4. Go to `/admin/payouts` — the partner should appear in the payout queue
5. **Expected:** Commission = $500 (10% ProLnk) + $250 (5% referring partner) = $750 total platform take

---

## API Cost Estimates (Monthly, at 500 jobs/month)

| Service | Usage | Estimated Monthly Cost |
|---|---|---|
| OpenAI GPT-4o Vision | 500 photo analyses @ ~$0.05/analysis | ~$25 |
| Twilio SMS | 500 deal notifications + follow-ups | ~$8 |
| Resend Email | 1,500 emails (deal + follow-up + confirmation) | ~$3 |
| Stripe | 2.9% + $0.30 per transaction | Variable (taken from commissions) |
| CompanyCam API | Free for approved partners | $0 |
| Jobber API | Free for approved partners | $0 |
| **Total fixed API costs** | | **~$36/month** |

At 500 jobs/month with an average job value of $3,000 and a 10% platform commission, ProLnk generates $150,000/month in gross commission revenue against $36/month in API costs. The unit economics are extremely favorable.

---

## What to Do Right Now (Ordered by Impact)

The single highest-leverage action today is claiming the Stripe sandbox before it expires on May 19. Everything else can be done in parallel over the next two weeks. Here is the recommended sequence:

**This week:** Claim Stripe → Get OpenAI key → Test the core referral loop (Test 1 above)

**Next week:** Set up Resend + Twilio → Test the full deal notification flow (Test 2 above) → Apply for CompanyCam developer access

**Week 3:** CompanyCam approval arrives → Connect first real partner → Run live end-to-end test with a real contractor

**Week 4:** Apply for Jobber developer access → Begin partner recruitment outreach in DFW with the platform fully live

---

*All integration pages are already built in the admin portal. Navigate to Settings → Integration Hub for the full list.*
