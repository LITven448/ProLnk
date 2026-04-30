# Environment Setup Checklist

Complete these setup steps before deploying to production.

## 1. Core Application (Required)

```bash
# .env.production
APP_BASE_URL=https://prolnk.io
NODE_ENV=production
```

## 2. Authentication (Required)

```bash
# Google OAuth
GOOGLE_OAUTH_CLIENT_ID=<from Google Cloud Console>
GOOGLE_OAUTH_CLIENT_SECRET=<from Google Cloud Console>

# Database
DATABASE_URL=mysql://user:password@host:3306/prolnk
```

**Setup Instructions:**
1. Go to console.cloud.google.com
2. Create OAuth 2.0 credentials (Web application)
3. Add authorized redirect URI: `https://prolnk.io/api/auth/callback`
4. Copy Client ID and Secret

## 3. Email Service (Required)

```bash
RESEND_API_KEY=re_<your_api_key>
FROM_EMAIL=ProLnk <noreply@prolnk.io>
```

**Setup Instructions:**
1. Go to resend.com and sign up
2. Add domain: noreply@prolnk.io
3. Add DNS records provided by Resend
4. Wait for domain verification (usually 5-10 min)
5. Copy API key

## 4. SMS Service (Optional)

```bash
TWILIO_ACCOUNT_SID=AC<your_sid>
TWILIO_AUTH_TOKEN=<your_token>
TWILIO_PHONE_NUMBER=+1234567890
```

**Setup Instructions:**
1. Go to twilio.com and sign up
2. Get Account SID from dashboard
3. Generate Auth Token
4. Purchase a phone number for sending SMS
5. Copy all three values

## 5. Payment Processing (Required)

```bash
STRIPE_PUBLIC_KEY=pk_live_<your_key>
STRIPE_SECRET_KEY=sk_live_<your_key>
STRIPE_WEBHOOK_SECRET=whsec_<your_secret>
STRIPE_CONNECT_CLIENT_ID=ca_<your_id>
```

**Setup Instructions:**
1. Go to dashboard.stripe.com
2. Switch to Live mode
3. Copy Public Key from Publishable Keys section
4. Copy Secret Key from Secret Keys section
5. Create webhook endpoint at `https://prolnk.io/api/webhooks/stripe`
6. Subscribe to events:
   - charge.succeeded
   - charge.failed
   - charge.dispute.created
   - payout.paid
   - payout.failed
   - account.updated
7. Copy webhook signing secret

## 6. Analytics & Error Tracking (Required)

```bash
VITE_SENTRY_DSN=https://<key>@<org>.ingest.sentry.io/<project>
SENTRY_DSN=https://<key>@<org>.ingest.sentry.io/<project>
VITE_POSTHOG_KEY=phc_<your_key>
```

**Setup Instructions:**

**Sentry:**
1. Go to sentry.io and sign up
2. Create project: Node.js backend
3. Create project: React frontend
4. Copy DSN from settings
5. Add both to env vars

**PostHog:**
1. Go to posthog.com and sign up
2. Create organization/project
3. Copy API key from settings
4. Add to env var

## 7. AI & LLM (Required)

```bash
OPENAI_API_KEY=sk-<your_key>
```

**Setup Instructions:**
1. Go to platform.openai.com
2. Create API key in Settings → API Keys
3. Copy key (you can only see it once)

## 8. Vector Database (Optional for local dev, required for production search)

```bash
QDRANT_URL=https://qdrant.prolnk.io:6333
QDRANT_API_KEY=<your_api_key>
```

**Setup Instructions:**
1. Deploy Qdrant: `docker run -p 6333:6333 qdrant/qdrant`
2. Or use hosted Qdrant Cloud
3. Set URL and API key

## 9. Workflow Automation (Optional)

```bash
N8N_WEBHOOK_BASE_URL=https://prolnk.app.n8n.cloud
N8N_WEBHOOK_SECRET=<your_secret>
```

**Setup Instructions:**
1. Deploy n8n instance (self-hosted or cloud)
2. Generate webhook secret (any random string)
3. Update webhook URL in n8n workflows

## 10. AI Pipeline (Optional for Phase 3)

```bash
LANGGRAPH_URL=http://langgraph:8100
```

**Setup Instructions:**
1. Deploy LangGraph container: `docker build -f Dockerfile.langgraph -t prolnk-langgraph . && docker run -p 8100:8100 prolnk-langgraph`
2. Verify it's running on port 8100

## 11. Field Service Integrations (Optional)

```bash
# Jobber
JOBBER_OAUTH_CLIENT_ID=<from Jobber App Center>
JOBBER_OAUTH_CLIENT_SECRET=<from Jobber App Center>

# ServiceTitan
SERVICETITAN_OAUTH_CLIENT_ID=<from ServiceTitan>
SERVICETITAN_OAUTH_CLIENT_SECRET=<from ServiceTitan>

# CompanyCam
COMPANYCAM_OAUTH_CLIENT_ID=<from CompanyCam>
COMPANYCAM_OAUTH_CLIENT_SECRET=<from CompanyCam>
```

**Setup Instructions:**
1. Jobber: Go to app.getjobber.com → Developer Apps → Register App
2. ServiceTitan: Go to developer.servicetitan.com → Create App
3. CompanyCam: Go to companycam.com → API Settings → Generate API Key
4. For each, set redirect URI to `https://prolnk.io/api/integrations/<service>/callback`

## 12. Data Enrichment (Optional)

```bash
ATTOM_API_KEY=<from Attom Data>
```

**Setup Instructions:**
1. Sign up at attomdata.com
2. Create API key in dashboard
3. Copy key

---

## Verification

After setting all env vars, verify connectivity:

```bash
# Test database
npm run db:inspect

# Test Stripe
curl -H "Authorization: Bearer $STRIPE_SECRET_KEY" https://api.stripe.com/v1/charges?limit=1

# Test Resend
curl -X POST "https://api.resend.com/emails" \
  -H "Authorization: Bearer $RESEND_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"from":"test@example.com","to":"test@example.com","subject":"Test","html":"<p>Test</p>"}'

# Test Twilio
curl -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN" https://api.twilio.com/2010-04-01/Accounts.json

# Test OpenAI
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

---

## Critical Security Notes

1. **Never commit `.env.production`** to git
2. **Never share API keys** via email or chat
3. **Rotate keys** if they're accidentally exposed
4. **Use environment variables** only — never hardcode secrets
5. **Enable API key rate limiting** on all external services
6. **Monitor usage** on OpenAI and Stripe (these are expensive)

---

## Environment File Structure

```
.env.local              # Development (git-ignored)
.env.production         # Production (git-ignored, deploy via Vercel/hosting)
.env.example           # Template with placeholders (COMMIT THIS)
```

Copy `.env.example` to `.env.production` and fill in your actual values.
