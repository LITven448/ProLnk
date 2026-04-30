# ProLnk / TrustyPro — Owner Action Items & API Credits Guide

**Last updated:** April 3, 2026  
**Purpose:** Everything you personally need to do — account creation, API key setup, free credits, and the difference between subscription vs. API accounts.

---

## Part 1: What You Need to Do (Prioritized)

### Tier 1 — Do This Week (Blockers)

| # | Action | Why It's Blocking | Time |
|---|--------|-------------------|------|
| 1 | **Claim your Stripe sandbox** at [dashboard.stripe.com/claim_sandbox/YWNjdF8x...](https://dashboard.stripe.com/claim_sandbox/YWNjdF8xVENzNGIyUVdUMkFJZWpJLDE3NzQ1NzY1NDQv100jV96aVC2) | Expires May 19, 2026. Without this, no commission payments can be tested or processed. | 5 min |
| 2 | **Create an OpenAI account** at [platform.openai.com](https://platform.openai.com) | The AI photo analysis (GPT-4o Vision), AI support chat, and description guidance all require an OpenAI API key. | 10 min |
| 3 | **Add your OpenAI API key** to the platform under Settings → Secrets → `OPENAI_API_KEY` | Without this, every AI feature in the platform returns a fallback error. | 5 min |
| 4 | **Create a Twilio account** at [twilio.com](https://twilio.com) | SMS notifications to partners and homeowners require Twilio. Free trial gives $15 credit. | 10 min |
| 5 | **Create a Resend account** at [resend.com](https://resend.com) | Transactional email (partner approvals, commission notifications, homeowner scan results) requires Resend. Free tier: 3,000 emails/month. | 10 min |

### Tier 2 — Do This Month (High Value)

| # | Action | Why | Time |
|---|--------|-----|------|
| 6 | **Create a Google Cloud account** and enable the Maps API | The partner map, homeowner address geocoding, and territory management all use Google Maps. $200/month free credit. | 20 min |
| 7 | **Apply for CompanyCam API access** at [companycam.com/developers](https://companycam.com/developers) | CompanyCam is the #1 photo tool for field service pros. Integrating it means every photo a partner takes in CompanyCam automatically flows into ProLnk's AI pipeline — no extra step for the partner. | 15 min |
| 8 | **Apply for Jobber API access** at [developer.getjobber.com](https://developer.getjobber.com) | Jobber is used by 200,000+ home service businesses. Their API lets you pull completed job data, addresses, and photos automatically. | 15 min |
| 9 | **Apply for ServiceTitan API access** at [developer.servicetitan.io](https://developer.servicetitan.io) | ServiceTitan is the enterprise-tier field service platform. This is the integration that unlocks historical photo ingestion for large partners. Requires a partner application — not instant. | 30 min |
| 10 | **Verify your domain** (prolnk.io) with Resend | Transactional emails sent from `@prolnk.io` require DNS verification. Without this, emails go to spam. | 15 min |

### Tier 3 — Before Public Launch

| # | Action | Why | Time |
|---|--------|-----|------|
| 11 | **Complete Stripe KYC verification** | Required before you can accept real money. Stripe will ask for business info, EIN, and bank account. | 30 min |
| 12 | **Create an Anthropic account** at [console.anthropic.com](https://console.anthropic.com) | Claude 3 Haiku is the cheap triage model in the waterfall AI pipeline (see Part 3). Much cheaper than GPT-4o for the first-pass filter. | 10 min |
| 13 | **Apply for Google Cloud Vision API** | Used as the cheapest first-pass in the waterfall pipeline — $1.50 per 1,000 images vs. $15+ for GPT-4o. | 15 min |
| 14 | **Set up Mapbox account** at [mapbox.com](https://mapbox.com) | Partner territory maps, coverage gap analysis, and national expansion maps. Free tier: 50,000 map loads/month. | 10 min |
| 15 | **Register for HousecallPro API** at [developer.housecallpro.com](https://developer.housecallpro.com) | HousecallPro is the mid-market alternative to ServiceTitan with 40,000+ users. Easier API access than ServiceTitan. | 15 min |

---

## Part 2: API vs. Subscription — What's the Difference?

This is one of the most important things to understand before spending money on AI tools.

### The Core Difference

**A subscription** is a flat monthly fee that gives you access to a product — usually a user interface (website, app, chat window). You pay the same amount whether you use it a little or a lot. Think of it like a gym membership.

**An API account** is a pay-per-use developer account. You pay only for what you actually process — measured in tokens (words), images, API calls, or messages. There is no monthly fee unless you set a minimum. Think of it like a utility bill.

### Anthropic Example (Claude)

| Account Type | What You Get | Who It's For | Cost |
|---|---|---|---|
| **Claude.ai Pro** (subscription) | Access to Claude chatbot at claude.ai, unlimited conversations, priority access | You personally using Claude to write, research, think | $20/month flat |
| **Anthropic API** (developer) | Programmatic access to Claude models from your code/platform | Your platform calling Claude to analyze photos, generate text | Pay per token (~$0.25 per million input tokens for Haiku) |

**For ProLnk, you need the API account — not the Pro subscription.** The Pro subscription is for you personally chatting with Claude. The API is what lets your platform call Claude automatically when a partner uploads a photo.

### OpenAI Example (ChatGPT)

| Account Type | What You Get | Who It's For | Cost |
|---|---|---|---|
| **ChatGPT Plus** (subscription) | Access to ChatGPT at chat.openai.com, GPT-4o in the browser | You personally using ChatGPT | $20/month flat |
| **OpenAI API** (developer) | Programmatic access to GPT-4o, GPT-4o-mini, DALL-E, Whisper | Your platform calling GPT-4o to analyze photos | Pay per token/image |

**Again — you need the API account for ProLnk.** Your ChatGPT Plus subscription does not give your platform any AI capability. They are completely separate billing accounts.

### Key Rule

> If you are using AI inside a product you built (ProLnk, TrustyPro), you always need an API account. If you are using AI yourself in a browser or app, a subscription is fine.

---

## Part 3: Free Credits You Can Apply For

These are legitimate free credits available right now — most require only account creation.

| Service | Free Credit | How to Get It | Expires |
|---|---|---|---|
| **OpenAI API** | $5 free credit on new accounts | Create account at platform.openai.com | 3 months |
| **Anthropic API** | $5 free credit on new accounts | Create account at console.anthropic.com | 3 months |
| **Google Cloud** | $300 free credit | New GCP account at cloud.google.com | 90 days |
| **Google Maps API** | $200/month recurring free | Included with any GCP account | Ongoing |
| **Google Cloud Vision API** | 1,000 free requests/month | Included with GCP account | Ongoing |
| **Twilio** | $15 free credit | New account at twilio.com | No expiry |
| **Resend** | 3,000 emails/month free | Free tier at resend.com | Ongoing |
| **Mapbox** | 50,000 map loads/month free | Free tier at mapbox.com | Ongoing |
| **Stripe** | No fees in test mode | Already set up — claim sandbox | Until May 19 |
| **CompanyCam** | Developer sandbox (free) | Apply at companycam.com/developers | Ongoing |
| **Jobber** | Developer sandbox (free) | Apply at developer.getjobber.com | Ongoing |
| **Vercel** | Hobby tier free | vercel.com | Ongoing |
| **Cloudflare** | Free CDN + DDoS protection | cloudflare.com | Ongoing |

**Estimated total free credits available:** ~$320 in one-time credits + $200+/month in recurring free tiers.

---

## Part 4: Cost Estimates for the Waterfall AI Pipeline

The waterfall pipeline (built in this session) processes photos in three tiers, cheapest first:

| Tier | Model | Cost per Image | When Used | Purpose |
|---|---|---|---|---|
| **Tier 1 — Triage** | Google Cloud Vision | $0.0015 | Every photo | Label detection, object detection, blur/quality check. Rejects unusable photos before they reach expensive models. |
| **Tier 2 — Classification** | Claude 3 Haiku | $0.0025 | Photos that pass Tier 1 | Lightweight text analysis of Vision labels. Classifies opportunity type and estimates confidence. Rejects low-confidence results. |
| **Tier 3 — Deep Analysis** | GPT-4o Vision | $0.015–$0.025 | Only high-confidence photos | Full visual analysis, transformation image generation, insurance claim detection, Home Health Vault update. |

### Cost Scenario: 10,000 Photos Ingested from ServiceTitan

| Stage | Photos Processed | Cost |
|---|---|---|
| Tier 1 (all photos) | 10,000 | $15.00 |
| Tier 2 (70% pass Tier 1) | 7,000 | $17.50 |
| Tier 3 (30% pass Tier 2) | 2,100 | $42.00–$52.50 |
| **Total** | **10,000 photos analyzed** | **~$74–$85** |

Without the waterfall (all GPT-4o): 10,000 × $0.020 = **$200**. The waterfall saves approximately **60%** on AI costs while improving accuracy by rejecting blurry, irrelevant, or duplicate photos before they reach the expensive model.

---

## Part 5: The Stale Data Problem — What Was Built

When you ingest historical photos from ServiceTitan (or any integration), the platform now applies the following checks before generating any homeowner offers:

1. **Ownership verification** — Cross-references the service address against the homeowner lead database. If the address has a different homeowner name than the one on file, the system flags it as "possible ownership change" and suppresses offers until verified.

2. **Issue resolution check** — If a photo was analyzed and an issue was detected (e.g., broken fence), the system checks whether a subsequent job at the same address by a partner in the same category was logged within 180 days. If yes, the issue is marked "likely resolved" and suppressed from the offer queue.

3. **Photo age decay** — Photos older than 24 months receive a confidence penalty. A 0.85 confidence score on a 3-year-old photo becomes 0.51 after decay — below the 0.6 threshold, so no offer is generated. The photo still updates the Home Health Vault profile.

4. **Rate limiting** — No homeowner receives more than 3 AI-generated offers per 30-day window, regardless of how many issues are detected. The highest-priority issues (by severity × estimated value) are surfaced first.

5. **Historical ingestion mode** — When processing a batch of historical photos (e.g., 5 years of ServiceTitan data), the system runs in "profile-only" mode by default. It updates the Home Health Vault and drafts the home profile but does not generate any outbound offers. Offers are only generated from photos taken within the last 90 days unless manually overridden by admin.

---

## Part 6: Subscription vs. API — Quick Reference Card

| You want to... | Use this | Cost model |
|---|---|---|
| Chat with Claude yourself | Claude.ai Pro | $20/month flat |
| Have your platform call Claude | Anthropic API | Pay per token |
| Chat with ChatGPT yourself | ChatGPT Plus | $20/month flat |
| Have your platform call GPT-4o | OpenAI API | Pay per token/image |
| Use Midjourney yourself | Midjourney subscription | $10–$60/month flat |
| Generate images in your platform | OpenAI DALL-E API or Stability AI API | Pay per image |
| Send emails to yourself | Gmail / Outlook | Free |
| Send transactional emails from your platform | Resend API or SendGrid API | Pay per email |
| Use Google Maps yourself | Google Maps (browser) | Free |
| Embed maps in your platform | Google Maps JavaScript API | Pay per load (first $200/month free) |

**The pattern is always the same:** the consumer product (subscription) is for humans using a UI. The API is for your code calling the service programmatically. They are always separate accounts with separate billing.

---

*This document was generated from the live ProLnk platform codebase and reflects the actual integrations built and planned as of April 3, 2026.*
