# ProLnk Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Cloudflare DNS                          │
│  prolnk.io → prolnk-production.up.railway.app               │
│  trustypro.prolnk.io → prolnk-production.up.railway.app     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      Railway (Prod)                          │
│  Node.js + Express + tRPC on Linux container                │
└─────────────────────────────────────────────────────────────┘
         ↓                    ↓                    ↓
    ┌─────────┐          ┌──────────┐         ┌───────────┐
    │   Vite  │          │ tRPC API │         │  Express  │
    │ Dev/HMR │          │ Router   │         │  Static   │
    └─────────┘          └──────────┘         │  Assets   │
         ↓                    ↓                └───────────┘
    ┌──────────────────────────────────────────────────────┐
    │         Brand Detection (hostname)                    │
    │  prolnk.io → window.__BRAND__ = 'prolnk'             │
    │  trustypro → window.__BRAND__ = 'trustypro'          │
    └──────────────────────────────────────────────────────┘
         ↓                                        ↓
    ┌─────────────────┐              ┌──────────────────────┐
    │  React Frontend │              │  TiDB Cloud Database │
    │ (React 19 + TS) │              │  (MySQL-compatible)  │
    │                 │              │  130+ tables         │
    │ • ProLnk Home   │              │  • Partners          │
    │ • TrustyPro Home│              │  • Opportunities     │
    │ • Forms         │              │  • Commissions       │
    │ • Dashboards    │              │  • Health Records    │
    └─────────────────┘              └──────────────────────┘
```

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| DNS | Cloudflare | Domain routing, SSL/TLS, DDoS protection |
| Hosting | Railway | Container-based deployment, auto-scaling |
| Frontend | React 19, Vite | UI rendering, dev experience |
| Backend | Node.js, Express | HTTP server, middleware, static serving |
| API | tRPC | Type-safe RPC, automatic Zod validation |
| Database | TiDB Cloud | Distributed MySQL, high availability |
| Email | Resend | Transactional email delivery |
| Workflows | n8n | Lead matching, notifications, processing |
| Authentication | JWT (WIP) | Session tokens, user verification |
| Payments | Stripe (WIP) | Payment processing, commission payouts |
| Monitoring | Railway Logs | Error tracking, performance monitoring |

## Directory Structure

```
ProLnk/
├── client/                      # React frontend
│   ├── src/
│   │   ├── main.tsx             # Entry point
│   │   ├── App.tsx              # Root component (RootPage with brand routing)
│   │   ├── pages/               # Page components
│   │   │   ├── RootPage.tsx     # Conditional Home/TrustyProHome
│   │   │   ├── Home.tsx         # ProLnk landing page
│   │   │   ├── TrustyProHome.tsx# TrustyPro landing page
│   │   │   └── ...              # 60-80 other pages
│   │   ├── components/          # React components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── utils/               # Utility functions
│   │   └── styles/              # CSS/styling
│   └── index.html               # HTML template
│
├── server/                      # Node.js backend
│   ├── _core/
│   │   ├── index.ts             # Entry point, app initialization
│   │   └── vite.ts              # Vite integration, brand detection
│   ├── routers/
│   │   ├── index.ts             # tRPC router composition
│   │   ├── waitlist.ts          # Pro/homeowner signup procedures
│   │   ├── opportunities.ts     # Lead management
│   │   ├── partners.ts          # Pro profile management
│   │   ├── commissions.ts       # Earnings data
│   │   └── ...                  # Other API endpoints
│   ├── webhooks/
│   │   └── n8n.ts               # n8n webhook handlers (lead-qualified, payout, referral)
│   ├── emails/
│   │   ├── confirmation.tsx     # JSX email templates
│   │   └── ...                  # Other email templates
│   ├── db/
│   │   └── index.ts             # Database connection, getDb()
│   └── api/
│       └── health.ts            # Health check endpoint
│
├── drizzle/                     # Database ORM
│   ├── schema.ts                # Table definitions (130+ tables)
│   └── migrations/              # Database migrations
│
├── docs/                        # Documentation
│   ├── AGENTS.md                # 47 AI agent specifications
│   ├── COMMISSION.md            # Network income system details
│   ├── SCHEMA.md                # Database table descriptions
│   ├── BRANDS.md                # Brand differences and routing
│   └── ...                      # Other documentation
│
├── vite.config.ts               # Vite build config
├── tsconfig.json                # TypeScript config
├── package.json                 # Dependencies and scripts
├── railway.json                 # Railway deployment config
│
└── .claude/
    ├── settings.json            # Permissions for autonomous work
    └── memory/                  # Session memory and context
```

## Request Flow

### 1. HTTP Request Arrives
```
curl https://prolnk.io/
→ Cloudflare routes to prolnk-production.up.railway.app
→ Railway container receives request
```

### 2. Express Middleware
```typescript
// server/_core/index.ts
app.use(express.json());
app.use(express.urlencoded());
app.use(setupVite(app));        // Vite or Vite middleware
app.use("/api/trpc", trpcHandler); // tRPC router
app.use(serveStatic(app));      // Static files fallback
```

### 3. Brand Detection
```typescript
// server/_core/vite.ts line 36
const hostname = req.get("host").split(":")[0].toLowerCase();
const isTrustyPro = hostname.includes("trustypro");
// Inject: window.__BRAND__ = 'trustypro' | 'prolnk'
```

### 4. Frontend Renders
```typescript
// client/src/App.tsx
if (window.__BRAND__ === 'trustypro') {
  return <TrustyProHome />;
} else {
  return <Home />;
}
```

### 5. API Calls
```typescript
// tRPC client call
const result = await trpc.waitlist.submitPro.mutate({
  name, email, trade, serviceArea, ...
});
// → server/routers/waitlist.ts
// → Database insert
// → Resend email send
```

## Database Schema Highlights

**Partners Table**:
```typescript
partners: {
  id: integer (PK)
  email: string
  name: string
  phone: string
  tradeType: string ('plumber', 'electrician', 'hvac', ...)
  serviceArea: polygon (geographic coverage)
  tier: integer (1-5, affects commission rate)
  monthlyEarnings: decimal
  status: enum ('pending', 'active', 'inactive')
  createdAt: timestamp
}
```

**Homes Table** (Health Vault):
```typescript
homes: {
  id: integer (PK)
  address: string
  homeownerId: integer (FK)
  squareFeet: integer
  yearBuilt: integer
  roofType: string
  foundation: string
  hvacType: string
  electrical: string
  plumbing: string
  // 20+ other structural attributes
}
```

**Opportunities Table** (Leads):
```typescript
opportunities: {
  id: integer (PK)
  homeownerId: integer (FK)
  homeId: integer (FK)
  serviceCategory: string
  description: string
  estimatedValue: decimal
  status: enum ('open', 'matched', 'in_progress', 'completed')
  createdAt: timestamp
}
```

**Commission Cascade**:
```typescript
commissionPayout: {
  id: integer (PK)
  recipientUserId: integer (FK to partners)
  sourceProUserId: integer (FK to partners)
  jobCommissionEventId: integer (FK to opportunities)
  payoutType: enum (
    'direct_match',      // 12-70% by tier
    'network_l1',        // 1% from direct recruits
    'network_l2',        // 0.5% from their recruits
    'network_l3',        // 0.25%
    'network_l4',        // 0.1%
    'subscription_override', // 10% of $199/mo
    'homeowner_override' // Per-lead fee
  )
  amount: decimal
  status: enum ('pending', 'processed', 'failed')
  payoutMonth: string (YYYY-MM)
}
```

## API Endpoints

### Public (No Auth)
- `POST /setup` - Initialize database (idempotent)
- `GET /api/health` - Health check
- `POST /api/trpc/waitlist.submitPro` - Pro signup
- `POST /api/trpc/waitlist.submitHomeowner` - Homeowner signup

### Protected (JWT Required)
- `GET /api/trpc/partner.getMe` - Current pro profile
- `GET /api/trpc/opportunities.getFeed` - My matched leads
- `POST /api/trpc/commissions.getHistory` - Earnings history

### Admin (JWT + admin flag)
- `GET /api/trpc/admin.waitlist.all` - All signups
- `POST /api/trpc/admin.partner.updateStatus` - Approve/reject pro

### Webhooks (n8n)
- `POST /api/webhooks/n8n/lead-qualified` - Match created
- `POST /api/webhooks/n8n/referral-bonus` - Bonus earned
- `POST /api/webhooks/n8n/notification-sent` - Notification logged

## Deployment Pipeline

```
Code Change
     ↓
git push origin main
     ↓
GitHub webhook → Railway
     ↓
Railway rebuilds Docker image
     ↓
npm install
npm run build (Vite)
npm run check (TypeScript)
     ↓
Deploy to production container
     ↓
Rails health check
     ↓
Zero-downtime deploy (old + new running, traffic switched)
```

## Scaling Considerations

**Current Capacity**:
- Single Railway container handles ~1,000 concurrent users
- TiDB Cloud starter tier: 2 replicas, auto-failover
- Cloudflare DDoS protection: 250K req/sec

**Future Scaling**:
- Multiple Railway containers behind load balancer
- TiDB cluster upgrade to standard tier (more replicas)
- Redis for session caching + rate limiting
- CDN for static assets (Cloudflare)
- Message queue for async jobs (RabbitMQ, AWS SQS)

## Performance Targets

- Page load: <2s (Lighthouse 90+)
- API response: <100ms (p95)
- Email delivery: <2 minutes
- Database query: <50ms (p95)
- Monthly uptime: 99.9%

## Security

- HTTPS everywhere (Cloudflare SSL)
- Environment variables for secrets (no hardcoding)
- Zod validation on all tRPC inputs
- JWT tokens with 24h expiry
- n8n webhook signature validation (HMAC-SHA256)
- No sensitive data in logs
- Database encryption at rest (TiDB)
