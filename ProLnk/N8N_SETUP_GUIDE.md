# n8n Automation Setup Guide

## What is n8n?
n8n is the workflow automation tool that powers ProLnk's automated sequences — partner onboarding emails, weekly digests, storm alerts, and inactivity nudges.

ProLnk already has all the webhook triggers built in. You just need to connect n8n.

---

## Option 1: n8n Cloud (Easiest — Recommended)
1. Go to https://n8n.io and sign up for a free account
2. Copy your webhook URL (format: `https://your-instance.n8n.cloud/webhook/`)
3. Set on Render:
   - `N8N_WEBHOOK_BASE_URL` = your n8n cloud URL
   - `N8N_WEBHOOK_SECRET` = any random string (used to verify requests)
4. In n8n, create workflows for each trigger (see below)

## Option 2: Self-hosted n8n (Zero cost)
Run n8n on Railway or Render:
```
Service: Docker
Image: n8nio/n8n
Port: 5678
```

---

## ProLnk Webhook Triggers

Each fires when the event happens. n8n receives a POST with JSON payload.

| Webhook Path | When It Fires | Payload |
|-------------|---------------|---------|
| `partner-waitlist-joined` | Pro signs up | `{ email, tier, position, referralCode, trade, city }` |
| `homeowner-waitlist-joined` | Homeowner signs up | `{ email, city, state, serviceNeeded }` |
| `partner-approved` | Admin approves a partner | `{ email, name, tier, referralLink }` |
| `job-completed` | Job closes (Stripe webhook) | `{ jobId, proEmail, jobValue, address, platformFee }` |
| `storm-detected` | NOAA detects weather event | `{ state, zipCodes, severity, affectedCount }` |
| `weekly-digest` | Every Sunday midnight | `{ week, totalSignups, newReferrals }` |
| `partner-inactive` | No jobs in 90 days | `{ email, name, daysSinceActivity }` |

---

## Recommended n8n Workflows to Build

### 1. Partner Onboarding Sequence (partner-waitlist-joined)
Trigger: `partner-waitlist-joined`
Actions:
- Day 0: Welcome email with tier + referral link
- Day 3: "Upload your first job photos" reminder
- Day 7: "5 spots remain in Charter tier" urgency email (if charter tier)
- Day 14: "Refer 3 pros to move up" coaching email

### 2. Homeowner Welcome (homeowner-waitlist-joined)
Trigger: `homeowner-waitlist-joined`
Actions:
- Day 0: TrustyPro welcome email
- Day 3: "How TrustyPro protects your home" educational email
- Day 7: "Get your free home health scan" CTA

### 3. Storm Alert Broadcast (storm-detected)
Trigger: `storm-detected`
Actions:
- Send SMS via Twilio to all pros in affected zip codes
- Send email blast to pros with jobs in affected area
- Create leads in the admin dashboard

### 4. Weekly Network Digest (weekly-digest)
Trigger: `weekly-digest` (fires every Sunday)
Actions:
- Send weekly summary email to all approved partners
- Include: total network signups, leaderboard, tips of the week

---

## Connecting to Resend for Emails
In n8n, use the HTTP Request node:
```
POST https://api.resend.com/emails
Headers: Authorization: Bearer {RESEND_API_KEY}
Body: { from, to, subject, html }
```

## Connecting to Twilio for SMS
Use n8n's built-in Twilio node with your credentials.

---

## Environment Variables to Set on Render

```
N8N_WEBHOOK_BASE_URL=https://your-n8n-instance.com
N8N_WEBHOOK_SECRET=your-secret-here-make-it-random
```

Once set, all 7 webhook triggers activate automatically. No code changes needed.
