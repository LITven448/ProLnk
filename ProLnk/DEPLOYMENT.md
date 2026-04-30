# ProLnk Deployment Guide

**Last Updated:** 2026-04-30  
**Build Status:** All 84 features complete, ready for deployment

---

## Pre-Deployment Checklist

### Phase 1: Environment Setup (30 min)

Add these environment variables to your `.env.local` (development) and `.env.production` (production):

```bash
# Core App
APP_BASE_URL=https://prolnk.io
NODE_ENV=production
VITE_FRONTEND_FORGE_API_URL=https://prolnk.io

# Authentication & Database
GOOGLE_OAUTH_CLIENT_ID=your_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_client_secret
DATABASE_URL=mysql://user:pass@host:3306/prolnk

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx
FROM_EMAIL=ProLnk <noreply@prolnk.io>

# SMS (Twilio)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Payments (Stripe)
STRIPE_PUBLIC_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_CONNECT_CLIENT_ID=ca_xxxxx

# Analytics & Monitoring
VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
VITE_POSTHOG_KEY=phc_xxxxxxxxxxxxx

# Integrations
ATTOM_API_KEY=your_attom_api_key
QDRANT_URL=http://qdrant:6333
LANGGRAPH_URL=http://langgraph:8100

# External APIs
OPENAI_API_KEY=sk-xxxxx
N8N_WEBHOOK_BASE_URL=https://prolnk.app.n8n.cloud
N8N_WEBHOOK_SECRET=your_webhook_secret

# Field Service OAuth
JOBBER_OAUTH_CLIENT_ID=your_id
JOBBER_OAUTH_CLIENT_SECRET=your_secret
SERVICETITAN_OAUTH_CLIENT_ID=your_id
SERVICETITAN_OAUTH_CLIENT_SECRET=your_secret
COMPANYCAM_OAUTH_CLIENT_ID=your_id
COMPANYCAM_OAUTH_CLIENT_SECRET=your_secret
```

### Phase 2: Pre-Push Validation

```bash
cd /Users/andrewfrakes/Desktop/prolnk/ProLnk

# Type check
npx tsc --noEmit

# Lint
npm run lint

# Run tests
npm run test

# Build
npm run build
```

### Phase 3: GitHub Push

```bash
git add .
git commit -m "Production build: All 84 features complete

- Sentry + PostHog monitoring
- LangGraph AI pipeline
- All features verified in todo.md"

git push origin main
```

---

## Deployment Steps

### 1. Production Database

```bash
# Run migrations
npm run migrate

# Verify schema
npm run db:inspect
```

### 2. Deploy

**Vercel:**
```bash
vercel --prod
```

**Docker:**
```bash
docker build -t prolnk:latest .
docker run -p 3000:3000 --env-file .env.production prolnk:latest
```

### 3. Configure External Services

**Stripe:**
- Copy Live keys to env vars
- Webhook: `https://prolnk.io/api/webhooks/stripe`
- Subscribe to: charge, payout, account events

**Resend:**
- Add domain noreply@prolnk.io
- Verify DNS records
- Copy API key to env

**Twilio:**
- Get Account SID, auth token, phone number
- Add to env vars

**n8n:**
- Import workflows from knowledge/n8n-workflows/
- Update webhook URLs to production
- Activate workflows

**LangGraph:**
```bash
docker build -f Dockerfile.langgraph -t prolnk-langgraph .
docker run -p 8100:8100 prolnk-langgraph
```

### 4. Enable Monitoring

**Sentry:** Create project, copy DSN to env vars
**PostHog:** Create project, copy API key to env vars

---

## Post-Deployment Tests (30 min)

Run these immediately after deploying:

1. **Partner Login** → Sign in with Google → Dashboard loads
2. **Homeowner Signup** → Fill waitlist form → Email confirmation sent
3. **Photo Upload** → Upload test image → AI analysis completes
4. **Stripe Payout** → Request payout → Transfer initiated
5. **Webhook** → Send test from Jobber → Record syncs to ProLnk
6. **LangGraph** → Call /analyze endpoint → Returns JSON

---

## Rollback

```bash
git revert HEAD
npm run build
vercel --prod
```

---

## Success Criteria

✅ All env vars set  
✅ GitHub push complete  
✅ Build passes TypeScript  
✅ All 6 post-deployment tests pass  
✅ Sentry receiving events  
✅ PostHog tracking events  
✅ Database backups enabled
