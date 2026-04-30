# ProLnk n8n Workflow Library

8 ready-to-import automation workflows. Each file can be imported directly into n8n via **Workflows → Import from file**.

---

## What is n8n?

n8n is a visual workflow automation tool — think Zapier but self-hosted and far more powerful. You build automations by connecting nodes (triggers, actions, conditions) in a drag-and-drop editor. It costs ~$10–20/month to run on a VPS or Railway.

**Quick start:** Go to [n8n.io](https://n8n.io) → Start for free (cloud) or deploy to Railway in one click.

---

## Environment Variables Required in n8n

Set these in n8n → Settings → Environment Variables:

| Variable | Where to Get It |
|----------|----------------|
| `TWILIO_ACCOUNT_SID` | twilio.com → Console → Account Info |
| `TWILIO_AUTH_TOKEN` | twilio.com → Console → Account Info |
| `TWILIO_FROM_NUMBER` | twilio.com → Phone Numbers |
| `RESEND_API_KEY` | resend.com → API Keys |
| `ADMIN_EMAIL` | Your email address |
| `ADMIN_PHONE` | Your phone number (E.164 format: +12145551234) |
| `PROLNK_N8N_API_KEY` | Generate in ProLnk admin → Settings → API Keys |

---

## Workflow Index

| File | Trigger | What It Does |
|------|---------|--------------|
| `01-lead-dispatched-sms.json` | Webhook: lead_dispatched | SMS + email to partner when a lead is routed to them |
| `02-homeowner-opportunity-email.json` | Webhook: homeowner_opportunity | Email + SMS to homeowner with their personalized deal |
| `03-partner-welcome-sequence.json` | Webhook: partner_approved | Day 0 welcome, Day 1 tip, Day 7 check-in email sequence |
| `04-commission-paid-notification.json` | Webhook: commission_paid | SMS + email to partner when commission is paid out |
| `05-partner-winback-sequence.json` | Cron: daily 9am | Email to partners inactive for 30+ days |
| `06-dispute-opened-admin-alert.json` | Webhook: dispute_opened | Email + SMS to admin when partner opens a dispute |
| `07-homeowner-seasonal-checkin.json` | Cron: quarterly | Seasonal home check-in email to all active homeowners |
| `08-partner-nps-survey.json` | Webhook: partner_30day | NPS survey email to partner at 30-day mark |

---

## Webhook Setup

For webhook-triggered workflows, after importing and activating each workflow in n8n:

1. Copy the webhook URL from the Webhook node (it looks like `https://your-n8n.com/webhook/prolnk-lead-dispatched`)
2. Go to ProLnk Admin → Settings → Webhooks (once that page is built)
3. Paste the URL into the corresponding webhook field
4. Save

Until the Webhooks settings page is built, you can also set `N8N_WEBHOOK_BASE_URL` in ProLnk's environment and the `server/n8n-triggers.ts` file will auto-fire the webhooks.

---

## Priority Order

Build in this order for maximum revenue impact:

1. **01** — Lead Dispatched SMS (partners miss leads without this)
2. **02** — Homeowner Opportunity Email (no revenue without homeowner outreach)
3. **04** — Commission Paid Notification (trust signal for partners)
4. **03** — Partner Welcome Sequence (activation)
5. **06** — Dispute Alert (compliance)
6. **05** — Win-Back (retention)
7. **07** — Seasonal Check-In (LTV)
8. **08** — NPS Survey (product intelligence)
