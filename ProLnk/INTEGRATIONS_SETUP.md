# ProLnk — Complete Integrations Setup

This file is the single source of truth for every third-party integration, API key, and environment variable required to run ProLnk in production. It is intended for both human developers and AI agents (Claude, Manus, etc.) working on this codebase.

**Last updated:** May 7, 2026  
**Render service:** https://prolnk-platform.onrender.com  
**GitHub repo:** LITven448/ProLnk

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Configured and working in production |
| ⚠️ | Partially configured — needs key or verification |
| ❌ | Not yet configured — key needed |
| 🔧 | Code exists, key not yet set |

---

## 1. Database

| Service | Status | Env Var | Notes |
|---------|--------|---------|-------|
| **TiDB Cloud** | ✅ | `DATABASE_URL` | 149 tables created. Cluster: `prolnk-production` on `gateway01.us-east-1.prod.aws.tidbcloud.com:4000` |

```
DATABASE_URL=mysql://3WV8GtPKfZxaGP8.root:<PASSWORD>@gateway01.us-east-1.prod.aws.tidbcloud.com:4000/prolnk?ssl={"rejectUnauthorized":true}
```

**TiDB API credentials (for cluster management only — not used in app):**
- Public Key: `K34NRHR0`
- Private Key: `0ef6d52f-4805-4239-be93-b8086ffc3a36`
- API uses Digest auth: `curl --digest -u "K34NRHR0:<private>" https://api.tidbcloud.com/api/v1beta/...`

---

## 2. Authentication

| Service | Status | Env Var | Notes |
|---------|--------|---------|-------|
| **JWT Secret** | ✅ | `JWT_SECRET` | Session cookie signing — set on Render |
| **Manus OAuth** | ⚠️ | `VITE_APP_ID`, `OAUTH_SERVER_URL`, `VITE_OAUTH_PORTAL_URL` | Used for Manus-hosted version only. For Render/custom auth, `partnerAuth` router handles login via bcrypt. Can be removed once fully migrated off Manus. |
| **Google OAuth** | ❌ | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | For homeowner Google sign-in. Get from [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials |

---

## 3. Payments

| Service | Status | Env Var | Notes |
|---------|--------|---------|-------|
| **Stripe** | ⚠️ | `STRIPE_SECRET_KEY`, `VITE_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` | Test sandbox provisioned. Claim at: https://dashboard.stripe.com/claim_sandbox/YWNjdF8xVENzNGIyUVdUMkFJZWpJLDE3NzQ1NzY1NDQv100jV96aVC2 (expires 2026-05-19). Use card `4242 4242 4242 4242` for testing. |
| **Stripe Connect** | ❌ | (via Stripe dashboard) | For partner payouts. Enable in Stripe Dashboard → Connect |
| **ACH / Plaid** | ❌ | `PLAID_CLIENT_ID`, `PLAID_SECRET` | For ACH bank transfers. Get from [Plaid Dashboard](https://dashboard.plaid.com) |

---

## 4. Email

| Service | Status | Env Var | Notes |
|---------|--------|---------|-------|
| **Resend** | ❌ | `RESEND_API_KEY` | Used for all transactional email (partner approval, leads, commissions, etc.). Get from [resend.com](https://resend.com) → API Keys. Domain `prolnk.io` must be verified in Resend. |
| **From Email** | ❌ | `FROM_EMAIL` | Set to `ProLnk <noreply@prolnk.io>` |
| **From Email TrustyPro** | ❌ | `FROM_EMAIL_TRUSTYPRO` | Set to `TrustyPro <noreply@trustypro.com>` |

**Email templates in use (server/email.ts):**
- `sendPartnerApplicationReceived` — when partner applies
- `sendPartnerApproved` / `sendPartnerRejected` — admin decisions
- `sendNewLeadNotification` — when AI detects a lead
- `sendHomeownerWelcome` — homeowner signup
- `sendQuoteRequestReceived` / `sendQuoteResponseNotification`
- `sendCommissionEarned` / `sendPayoutConfirmation`
- `sendProWaitlistConfirmation` / `sendHomeownerWaitlistConfirmation`
- `sendStormAlertToPro` — storm agent alerts
- `sendReviewRequest` / `sendNeighborhoodReferralInvite`
- `sendRoomMakeoverReady`

---

## 5. AI / LLM

| Service | Status | Env Var | Notes |
|---------|--------|---------|-------|
| **OpenAI** | ❌ | `OPENAI_API_KEY` | Primary LLM for photo analysis, room makeover, quick quotes, brain trust, storm agent, diagnostic agent. Get from [platform.openai.com](https://platform.openai.com/api-keys) |
| **Anthropic (Claude)** | ❌ | `ANTHROPIC_API_KEY` | Secondary LLM used in some routers. Get from [console.anthropic.com](https://console.anthropic.com) |
| **LangGraph** | ❌ | `LANGGRAPH_URL` | For multi-agent orchestration. Self-hosted or LangSmith Cloud URL |
| **Inngest** | ❌ | `INNGEST_EVENT_KEY` | Background job queue for AI pipeline runs. Get from [inngest.com](https://app.inngest.com) |

---

## 6. Monitoring & Analytics

| Service | Status | Env Var | Notes |
|---------|--------|---------|-------|
| **Sentry** | ❌ | `SENTRY_DSN` (server), `VITE_SENTRY_DSN` (client) | Error monitoring. Create project at [sentry.io](https://sentry.io) → Settings → Projects → New Project → Node.js + React. DSN looks like `https://abc123@o123.ingest.sentry.io/456` |
| **PostHog** | ❌ | `VITE_POSTHOG_KEY`, `VITE_POSTHOG_HOST` | Product analytics. Create project at [posthog.com](https://app.posthog.com). Key looks like `phc_abc123`. Host is `https://app.posthog.com` or your self-hosted URL |

---

## 7. SMS / Notifications

| Service | Status | Env Var | Notes |
|---------|--------|---------|-------|
| **Twilio** | ❌ | `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`, `TWILIO_PHONE_NUMBER` | SMS for storm alerts, lead notifications, OTP. Get from [twilio.com](https://console.twilio.com) |
| **OneSignal** | ❌ | `ONESIGNAL_APP_ID`, `ONESIGNAL_REST_API_KEY` | Push notifications for mobile/web. Get from [onesignal.com](https://onesignal.com) → Apps → New App |

---

## 8. Maps & Location

| Service | Status | Env Var | Notes |
|---------|--------|---------|-------|
| **Google Maps** | ❌ | `GOOGLE_MAPS_API_KEY` | Used for geocoding, service area mapping, property location. Enable: Maps JavaScript API, Geocoding API, Places API in [Google Cloud Console](https://console.cloud.google.com) |
| **Radar** | ❌ | `RADAR_SECRET_KEY` | Geofencing and address validation. Get from [radar.com](https://radar.com) → Dashboard → API Keys |
| **Smarty** | ❌ | `SMARTY_AUTH_ID`, `SMARTY_AUTH_TOKEN` | US address verification/standardization. Get from [smarty.com](https://smarty.com) |
| **ATTOM Data** | ❌ | `ATTOM_API_KEY` | Property data (value, age, sq ft, permits). Get from [api.attomdata.com](https://api.attomdata.com) |

---

## 9. Field Service Management (FSM) Integrations

| Service | Status | Env Var | Notes |
|---------|--------|---------|-------|
| **Jobber** | ❌ | `JOBBER_CLIENT_ID`, `JOBBER_CLIENT_SECRET` | OAuth 2.0. Register app at [developer.getjobber.com](https://developer.getjobber.com). Webhook URL: `https://prolnk-platform.onrender.com/api/webhooks/jobber` |
| **ServiceTitan** | ❌ | `SERVICETITAN_APP_KEY`, `SERVICETITAN_CLIENT_ID`, `SERVICETITAN_CLIENT_SECRET` | OAuth 2.0. Apply at [developer.servicetitan.io](https://developer.servicetitan.io). Requires approval. |
| **CompanyCam** | ❌ | `COMPANYCAM_CLIENT_ID`, `COMPANYCAM_CLIENT_SECRET` | Photo management integration. Register at [developer.companycam.com](https://developer.companycam.com) |
| **Buildium** | ❌ | `BUILDIUM_CLIENT_ID`, `BUILDIUM_CLIENT_SECRET` | Property management. Register at [developer.buildium.com](https://developer.buildium.com) |

---

## 10. Background Jobs & Automation

| Service | Status | Env Var | Notes |
|---------|--------|---------|-------|
| **N8N** | ❌ | `N8N_WEBHOOK_BASE_URL`, `N8N_WEBHOOK_SECRET` | Workflow automation. Self-hosted or [n8n.cloud](https://n8n.cloud). Base URL example: `https://your-n8n.cloud/webhook`. Secret is a shared HMAC key for webhook verification. |

---

## 11. File Storage

| Service | Status | Env Var | Notes |
|---------|--------|---------|-------|
| **AWS S3** | ❌ | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `S3_BUCKET_NAME`, `S3_CDN_BASE_URL` | For photo uploads, documents, media library. Create bucket in [AWS Console](https://s3.console.aws.amazon.com). Region: `us-east-1`. CDN base URL is CloudFront or direct S3 URL. |

---

## 12. Background Checks

| Service | Status | Env Var | Notes |
|---------|--------|---------|-------|
| **Checkr** | ❌ | `CHECKR_API_KEY` | Partner background check verification. Get from [checkr.com](https://checkr.com) → Dashboard → API Keys |

---

## 13. Memory / Vector DB

| Service | Status | Env Var | Notes |
|---------|--------|---------|-------|
| **Mem0** | ❌ | `MEM0_API_KEY`, `MEM0_HOST` | AI agent memory layer. Get from [mem0.ai](https://mem0.ai) |
| **Qdrant** | ❌ | `QDRANT_URL`, `QDRANT_API_KEY` | Vector database for semantic search. Self-hosted or [cloud.qdrant.io](https://cloud.qdrant.io) |
| **Zep** | ❌ | `ZEP_API_KEY` | Long-term memory for AI agents. Get from [getzep.com](https://getzep.com) |

---

## 14. Tax & Compliance

| Service | Status | Env Var | Notes |
|---------|--------|---------|-------|
| **Tax1099** | ❌ | `TAX1099_API_KEY` | 1099 filing for partner payouts. Get from [tax1099.com](https://tax1099.com) |
| **LOB** | ❌ | `LOB_API_KEY` | Direct mail / physical letters for compliance notices. Get from [lob.com](https://lob.com) |
| **ProLnk EIN** | ❌ | `PROLNK_EIN` | Your business EIN for 1099 filings |

---

## 15. App Configuration

| Env Var | Value | Notes |
|---------|-------|-------|
| `APP_BASE_URL` | `https://prolnk.io` | Public-facing base URL |
| `OWNER_EMAIL` | your email | Owner notification email |
| `OWNER_OPEN_ID` | your Manus OpenID | For Manus-hosted admin access |
| `NODE_ENV` | `production` | Set automatically by Render |
| `PORT` | (auto) | Set automatically by Render |

---

## Priority Order for Setup

Set these up first — they block core functionality:

1. **`RESEND_API_KEY`** — email is broken without this (partner approvals, leads, etc.)
2. **`OPENAI_API_KEY`** — photo analysis, AI features all broken
3. **`STRIPE_SECRET_KEY`** — claim sandbox first, then activate
4. **`GOOGLE_MAPS_API_KEY`** — maps and geocoding broken
5. **`TWILIO_*`** — SMS alerts broken
6. **`AWS_*` / S3** — photo uploads broken
7. **`SENTRY_DSN`** + **`VITE_SENTRY_DSN`** — error monitoring
8. **`VITE_POSTHOG_KEY`** — analytics
9. **FSM integrations** (Jobber, ServiceTitan) — partner sync broken
10. **`N8N_WEBHOOK_BASE_URL`** — automation workflows

---

## How to Set Env Vars on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Select your service `prolnk-platform`
3. Click **Environment** in the left sidebar
4. Add each key-value pair
5. Click **Save Changes** — Render will auto-redeploy

---

## Webhook URLs to Register

When setting up integrations, use these webhook endpoints:

| Integration | Webhook URL |
|-------------|------------|
| Stripe | `https://prolnk-platform.onrender.com/api/stripe/webhook` |
| Jobber | `https://prolnk-platform.onrender.com/api/webhooks/jobber` |
| ServiceTitan | `https://prolnk-platform.onrender.com/api/webhooks/servicetitan` |
| CompanyCam | `https://prolnk-platform.onrender.com/api/webhooks/companycam` |
| N8N | `https://prolnk-platform.onrender.com/api/webhooks/n8n` |
| Inngest | `https://prolnk-platform.onrender.com/api/inngest` |

---

## DNS / Domain

| Domain | Status | Notes |
|--------|--------|-------|
| `prolnk.io` | ⚠️ | Currently pointing to Manus-hosted version. To cut over to Render: add CNAME `prolnk-platform.onrender.com` in your DNS provider. |
| `trustypro.com` | ⚠️ | Separate site — not yet on Render |

---

## For Claude / AI Agents Working on This Codebase

- All env vars are accessed via `process.env.VAR_NAME` on the server
- Frontend vars must be prefixed with `VITE_` and accessed via `import.meta.env.VITE_VAR_NAME`
- Never hardcode credentials — always use env vars
- The `server/_core/env.ts` file exports a typed `ENV` object for server-side use
- Add new env vars to `server/_core/env.ts` when adding new integrations
- Render auto-deploys on every push to the `main` branch of `LITven448/ProLnk`
- TiDB schema changes: edit `drizzle/schema.ts` → run `pnpm db:push` → commit
