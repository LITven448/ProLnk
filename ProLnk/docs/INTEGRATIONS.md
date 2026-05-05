# External Integrations Guide

**Total Integrations**: 8 (7 active, 1 planned)

---

## 1. Stripe ✅

**Purpose**: Payment processing, commission payouts
**Status**: Configured (basic setup complete, full features Week 3)

### Keys

```
STRIPE_SECRET_KEY=sk_live_[your_key] (production)
STRIPE_WEBHOOK_SECRET=whsec_[your_key]
STRIPE_PUBLISHABLE_KEY=pk_live_[your_key] (client-side)
```

### API Endpoints

- `POST /api/trpc/payments.createPaymentIntent` - Create payment intent (future)
- `POST /api/webhooks/stripe/payout` - Handle payout events

### Implementation

**May 6**: Payment processing not yet implemented
**Week 3**: Integrate Stripe Connect for pro payouts

```typescript
// Future implementation (Week 3)
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create payout to pro
await stripe.payouts.create({
  amount: commissionAmount * 100, // cents
  currency: 'usd',
  destination: pro.stripeAccountId,
});
```

### Testing

Use Stripe test keys for development:
- `sk_test_4eC39HqLyjWDarhtT657a494` (test secret)
- `pk_test_51234567890ABCDEF` (test publishable)

---

## 2. Resend ✅

**Purpose**: Transactional email
**Status**: Fully integrated

### Keys

```
RESEND_API_KEY=re_[your_key]
RESEND_DOMAIN=noreply@prolnk.io (verified sender)
```

### API Reference

```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'noreply@prolnk.io',
  to: recipient,
  subject: 'Welcome to ProLnk',
  html: template, // JSX or HTML string
  text: plainText, // Optional
});
```

### Email Templates

Located in `/server/emails/`:
- `SignupConfirmation.tsx` - Pro/homeowner signup confirmation
- `MatchNotification.tsx` - New match alert
- `PayoutNotification.tsx` - Monthly payout notice
- `WelcomeSeries*.tsx` - Onboarding sequence (5 emails)

### Current Usage (May 6)

```typescript
// server/routers/waitlist.ts
await resend.emails.send({
  from: 'noreply@prolnk.io',
  to: formData.email,
  subject: 'Welcome to ProLnk',
  html: renderToString(<SignupConfirmation name={formData.name} />),
});
```

### Sending Limits

- Resend free tier: 100/day
- Pro tier: Unlimited
- Current plan: [Check Resend dashboard]

### Testing

Send test emails to any address. No bounces/complaints on test tier.

---

## 3. TiDB Cloud ✅

**Purpose**: Primary database
**Status**: Production configured

### Credentials

```
DATABASE_URL=mysql://[user]:[password]@gateway01.us-east-1.prod.aws.tidbcloud.com:4000/prolnk
TIDB_HOST=gateway01.us-east-1.prod.aws.tidbcloud.com
TIDB_PORT=4000
TIDB_USER=[username from dashboard]
TIDB_PASSWORD=[password - store in Railway secrets]
TIDB_DATABASE=prolnk
```

### Connection

```typescript
import { createPool } from 'mysql2/promise';

const pool = createPool({
  host: process.env.TIDB_HOST,
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE,
  port: 4000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const connection = await pool.getConnection();
```

### Drizzle ORM Integration

```typescript
// server/db/index.ts
import { drizzle } from 'drizzle-orm/mysql2';

export async function getDb() {
  const connection = await pool.getConnection();
  return drizzle(connection);
}
```

### Monitoring

- [TiDB Cloud Dashboard](https://tidbcloud.com) - View cluster status, metrics
- Monitor: Connection count, query latency, storage usage
- Backups: Automatic daily backups (30-day retention)

### Scaling

Current plan: Serverless tier (auto-scaling)
- Max concurrent connections: 100
- Storage included: 100GB free tier
- Next upgrade: Standard tier (2+ replicas) at $200+/month

---

## 4. Cloudflare ✅

**Purpose**: DNS, SSL/TLS, DDoS protection
**Status**: Configured

### API Keys

```
CLOUDFLARE_API_TOKEN=[your_token]
CLOUDFLARE_ZONE_ID=[prolnk.io zone ID]
CLOUDFLARE_ACCOUNT_ID=[account ID]
```

### DNS Records

| Name | Type | Target | Status |
|------|------|--------|--------|
| prolnk.io | CNAME | prolnk-production.up.railway.app | ✅ Active |
| trustypro.prolnk.io | CNAME | prolnk-production.up.railway.app | ✅ Active |
| api.prolnk.io | CNAME | prolnk-production.up.railway.app | 🔄 Planned |
| www | CNAME | prolnk.io | ✅ Active |
| mail | MX | (to be set up) | ❌ Pending |

### SSL/TLS

- Mode: Full (strict) - Cloudflare to origin uses HTTPS
- Certificate: Auto-provisioned by Cloudflare
- Renewal: Automatic
- HSTS: Enabled (max-age=31536000)

### WAF Rules

- Enable: SQL Injection protection
- Enable: XSS protection
- Rate limit: 100 requests/10 seconds per IP

### Configuration

```bash
# Upgrade from free plan to prevent zone limit
# Cost: $20/month (Pro) or $200/month (Business for more zones)

# Current plan: Free (1 zone = prolnk.io only)
# Solution: Use subdomain for trustypro.prolnk.io
```

---

## 5. Railway ✅

**Purpose**: Hosting, deployment
**Status**: Production configured

### Credentials

```
RAILWAY_API_TOKEN=[your_token]
RAILWAY_PROJECT_ID=[project ID]
RAILWAY_ENVIRONMENT_ID=[production environment]
```

### Environment Variables (Set in Railway Dashboard)

```
DATABASE_URL=mysql://...
RESEND_API_KEY=re_...
N8N_WEBHOOK_SECRET=...
NODE_ENV=production
PORT=3000
```

### Deployment

- Source: GitHub (LITven448/ProLnk)
- Branch: main (auto-deploys on push)
- Build: `npm install && npm run build`
- Start: `npm start`
- Health check: `GET /api/health`

### Monitoring

- Logs: Real-time streaming via Railway dashboard
- Metrics: CPU, memory, network usage
- Alerts: Errors > threshold or health check fails

### Scaling

Current: Single container (~1K concurrent users)
Future: Multi-container load balancer for 10K+ users

---

## 6. n8n 🔄

**Purpose**: Workflow automation (lead matching, notifications, payouts)
**Status**: Planned (basic workflows ready)

### Webhooks

Incoming webhooks to /api/webhooks/n8n/:

```
POST /api/webhooks/n8n/lead-qualified - Match created
POST /api/webhooks/n8n/referral-bonus - Referral bonus earned
POST /api/webhooks/n8n/notification-sent - Notification delivered
```

### Implementation (Week 2+)

```typescript
// server/webhooks/n8n.ts - Already has handlers

app.post('/api/webhooks/n8n/lead-qualified', async (req, res) => {
  const { jobId, proId, homeownerId, estimatedValue } = req.body;
  
  // Validate signature
  if (!validateWebhookSignature(req)) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  // Create match record
  // Calculate commission
  // Send notification
  // Update analytics
});
```

### Workflows (To Build)

1. **Lead Matching**: When opportunity arrives, match to pros
2. **Match Notification**: Send SMS/email to pro about match
3. **Referral Bonus**: When referral converts, calculate bonus
4. **Monthly Payouts**: Aggregate commissions, create payout record
5. **Compliance Checks**: Daily fraud/compliance checks

### Setup

1. Create n8n account (self-hosted or managed)
2. Create workflows with HTTP nodes
3. Add webhook URLs: `https://prolnk-production.up.railway.app/api/webhooks/n8n/[event]`
4. Set webhook signatures for security

---

## 7. GitHub ✅

**Purpose**: Source control, CI/CD
**Status**: Configured

### Repository

- **Repo**: github.com/LITven448/ProLnk (private)
- **Branch**: main (production)
- **Deployment**: Connected to Railway

### Webhooks

- Push to main → Trigger Railway deploy
- PR create/update → Run tests (future)
- PR review → Require approval (future)

### Usage

```bash
git push origin main  # Auto-deploys to Railway
git log --oneline  # View commit history
git revert <commit>  # Revert a commit
```

---

## 8. Google Analytics 🔄

**Purpose**: Traffic analytics, user behavior
**Status**: Planned (Month 2)

### Setup

```html
<!-- Will add to HTML template -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Tracking

- Page views
- Form submissions (signups)
- Match events
- Button clicks
- Conversion funnel

---

## Integration Architecture

```
┌──────────────┐
│  ProLnk App  │
│  (Railway)   │
└──────┬───────┘
       │
       ├─ Stripe ────────── Payment processing
       ├─ Resend ────────── Email notifications
       ├─ TiDB ──────────── Database
       ├─ Cloudflare ────── DNS + CDN
       ├─ n8n ──────────── Workflow automation
       ├─ GitHub ────────── Source control
       └─ Analytics ────── User tracking
```

---

## Security Best Practices

1. **Secrets Management**:
   - Store all keys in Railway environment variables
   - Never commit secrets to git
   - Use `.env.example` (public) for documentation

2. **Webhook Validation**:
   - Verify signatures on incoming webhooks
   - Use HMAC-SHA256 validation
   - Log all webhook events

3. **API Rate Limiting**:
   - Stripe: 100 requests/second
   - Resend: Depends on plan
   - TiDB: Monitor connection count

4. **Monitoring**:
   - Alert on integration failures
   - Log all API calls (in production)
   - Review error rates weekly

---

## Testing Integrations

### Stripe
```bash
# Use test keys
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Test payment: Use card 4242 4242 4242 4242
```

### Resend
```bash
# Send test email
await resend.emails.send({
  from: 'onboarding@resend.dev',  // Use Resend test sender
  to: 'delivered@resend.dev',      // Use Resend test recipient
  subject: 'Test',
  html: '<p>Test email</p>',
});
```

### TiDB
```bash
# Connect via CLI
mysql -h gateway01.us-east-1.prod.aws.tidbcloud.com -u root -p prolnk

# Or via node
const result = await db.execute('SELECT 1');
console.log(result);
```

---

## Troubleshooting

| Integration | Issue | Fix |
|-------------|-------|-----|
| Stripe | Payment fails | Check secret key, test mode, webhook signature |
| Resend | Emails not arriving | Verify sender email, check spam, review bounce log |
| TiDB | Connection timeout | Check IP whitelist, verify credentials, test via MySQL CLI |
| Cloudflare | DNS not resolving | Verify CNAME target, check zone settings, clear cache |
| Railway | Deploy fails | Check build logs, verify environment variables, test locally |
| n8n | Webhook not triggered | Verify URL, test signature validation, check logs |
