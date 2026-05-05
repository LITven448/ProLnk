# ProLnk System Architecture

**Version**: 1.0.0 | **Last Updated**: May 6, 2026

---

## System Overview

ProLnk is a two-sided marketplace platform connecting skilled home service professionals (ProLnk) with homeowners (TrustyPro) through AI-powered home health assessments.

```
┌─────────────────────────────────────────────────────────────┐
│                    ProLnk / TrustyPro Platform              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────┐         ┌──────────────────┐        │
│  │   ProLnk Pro     │ ◄─────► │  Admin Portal    │        │
│  │   Waitlist       │         │  & Dashboard     │        │
│  │                  │         │                  │        │
│  │ • Signup Form    │         │ • Metrics        │        │
│  │ • Referral Codes │         │ • Search/Filter  │        │
│  │ • Position Track │         │ • Bulk Actions   │        │
│  └──────────────────┘         └──────────────────┘        │
│          ▲                              │                  │
│          │                              │                  │
│  ┌──────────────────┐         ┌──────────────────┐        │
│  │   TrustyPro      │ ◄─────► │   Auth System    │        │
│  │   Homeowner      │         │                  │        │
│  │   Waitlist       │         │ • Email/Password │        │
│  │                  │         │ • Google OAuth   │        │
│  │ • 7-Step Form    │         │ • Session Mgmt   │        │
│  │ • Property Data  │         │                  │        │
│  │ • Projects List  │         └──────────────────┘        │
│  └──────────────────┘                  │                  │
│                                         ▼                  │
│                        ┌──────────────────────────┐        │
│                        │   tRPC API Router        │        │
│                        │                          │        │
│                        │ • 50+ public procedures │        │
│                        │ • 30+ admin procedures  │        │
│                        │ • Type-safe endpoints   │        │
│                        └──────────────────────────┘        │
│                                  │                         │
│                        ┌─────────┴────────┐               │
│                        ▼                  ▼               │
│                  ┌──────────┐      ┌──────────┐          │
│                  │ TiDB     │      │ Resend   │          │
│                  │ Database │      │ Email    │          │
│                  │          │      │ Service  │          │
│                  │ 130+tbl  │      │ API      │          │
│                  └──────────┘      └──────────┘          │
│                                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Type Safety**: TypeScript (strict mode)
- **State Management**: tRPC useQuery/useMutation hooks
- **Validation**: Zod schemas (client-side mirrors server schemas)
- **Routing**: wouter (lightweight router)

### Backend
- **Runtime**: Node.js (ES2020+)
- **Framework**: Express.js
- **API**: tRPC v11 (JSON-RPC over HTTP)
- **Type Safety**: TypeScript (strict mode)
- **Database**: TiDB Cloud (MySQL-compatible)
- **ORM**: Drizzle ORM (type-safe, lightweight)
- **Email**: Resend API (transactional emails)
- **Authentication**: Session-based (cookies + server-side validation)
- **Error Tracking**: Sentry

### DevOps
- **Deployment**: Railway (Cloud Native)
- **Domain**: prolnk.io (managed DNS)
- **SSL/TLS**: Auto-renewed certificates
- **Database**: TiDB Serverless cluster
- **Monitoring**: Sentry + Railway Dashboard

---

## Code Organization

```
ProLnk/
├── client/src/                    # React frontend
│   ├── pages/                     # Page components
│   │   ├── admin/                 # Admin-only pages
│   │   ├── ProWaitlist.tsx        # Pro waitlist form
│   │   ├── TrustyProWaitlist.tsx  # Homeowner forms
│   │   └── Login.tsx              # Auth page
│   ├── components/                # Reusable components
│   ├── lib/                       # Utilities & hooks
│   │   └── trpc.ts               # tRPC client setup
│   └── App.tsx                    # Main app
│
├── server/                        # Backend
│   ├── routers/                   # tRPC procedure definitions
│   │   ├── waitlist.ts           # Hardened waitlist procedures (public)
│   │   ├── waitlistAdmin.ts      # Admin-only waitlist procedures
│   │   └── [40+ other routers]   # Partner, payment, scout, etc.
│   ├── _core/                     # Core infrastructure
│   │   ├── index.ts              # Express server setup
│   │   ├── trpc.ts               # tRPC router + middleware
│   │   ├── context.ts            # Request context
│   │   ├── logger.ts             # Structured logging
│   │   ├── analytics.ts          # Event tracking
│   │   ├── notification.ts       # Admin notifications
│   │   ├── oauth.ts              # Google/OAuth flow
│   │   └── [10+ others]          # Auth, email, storage, etc.
│   ├── db.ts                      # Database connection
│   ├── email.ts                   # Email templates
│   ├── webhooks/                  # External integrations
│   └── agents/                    # AI agents
│
├── shared/                        # Shared types & constants
│   ├── const.ts                   # Error messages, etc.
│   └── types.ts                   # Shared TypeScript types
│
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── vite.config.ts                 # Vite bundler config
└── README.md                       # Project overview
```

---

## Data Flow: Waitlist Signup

```
1. USER FILLS FORM (Client)
   ├─ React component collects data
   ├─ Client-side Zod validation
   └─ Submit to tRPC endpoint

2. tRPC API PROCESSES (Server)
   ├─ Input validation via Zod schema
   ├─ Extract & normalize user data
   ├─ Check for duplicate email (pre-insert)
   └─ Insert into database (TiDB)

3. POSITION CALCULATION
   ├─ COUNT(*) FROM waitlist table
   └─ Return position to client

4. EMAIL & NOTIFICATIONS
   ├─ Fire-and-forget email send (Resend API)
   ├─ Send admin notification
   └─ Continue without blocking response

5. ANALYTICS TRACKING
   ├─ Log event with metadata
   ├─ Track form_type, referral source, etc.
   └─ Store in analytics service

6. RESPONSE TO USER
   ├─ Return { success: true, position: 42 }
   ├─ Display success screen
   └─ Show referral link (for Pro tier)
```

---

## Database Schema (Waitlist)

### `proWaitlist` Table (Pro network signups)
```sql
CREATE TABLE proWaitlist (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(30),
  businessName VARCHAR(255),
  businessType VARCHAR(100),
  yearsInBusiness INT,
  employeeCount VARCHAR(50),
  estimatedJobsPerMonth INT,
  avgJobValue VARCHAR(50),
  trades JSON,           -- ["plumbing", "hvac"]
  customTradeDescription VARCHAR(500),
  primaryCity VARCHAR(100),
  primaryState VARCHAR(50),
  serviceZipCodes VARCHAR(255),
  serviceRadiusMiles INT DEFAULT 25,
  currentSoftware JSON,  -- ["jobber", "hcp"]
  otherSoftware VARCHAR(255),
  referralsGivenPerMonth VARCHAR(50),
  referralsReceivedPerMonth VARCHAR(50),
  currentReferralMethod VARCHAR(255),
  primaryGoal VARCHAR(100),
  hearAboutUs VARCHAR(255),
  additionalNotes VARCHAR(2000),
  licenseFileUrl VARCHAR(1000),
  licenseFileName VARCHAR(255),
  smsOptIn BOOLEAN DEFAULT false,
  referredBy VARCHAR(100),
  status ENUM('pending', 'approved', 'rejected', 'invited') DEFAULT 'pending',
  adminNotes VARCHAR(1000),
  approvedAt DATETIME,
  approvedBy INT,
  invitedAt DATETIME,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  
  KEY idx_email (email),
  KEY idx_createdAt (createdAt DESC),
  KEY idx_referredBy (referredBy)
);
```

### `homeWaitlist` Table (Homeowner signups)
```sql
CREATE TABLE homeWaitlist (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(30),
  address VARCHAR(500),
  city VARCHAR(100),
  state VARCHAR(50),
  zipCode VARCHAR(10),
  homeType ENUM('single_family', 'townhouse', 'condo', 'multi_family', 'mobile'),
  yearBuilt INT,
  squareFootage INT,
  lotSizeSqFt INT,
  bedrooms INT,
  bathrooms VARCHAR(10),
  stories INT,
  garageSpaces INT,
  hasPool BOOLEAN DEFAULT false,
  hasBasement BOOLEAN DEFAULT false,
  hasAttic BOOLEAN DEFAULT false,
  ownershipStatus ENUM('own', 'rent') DEFAULT 'own',
  ownershipType ENUM('primary_residence', 'rental', 'company_owned'),
  isRental BOOLEAN DEFAULT false,
  companyName VARCHAR(255),
  companyEin VARCHAR(20),
  propertyManagerName VARCHAR(255),
  propertyManagerPhone VARCHAR(30),
  yearsOwned INT,
  overallCondition ENUM('excellent', 'good', 'fair', 'needs_work'),
  recentImprovements JSON,
  desiredProjects JSON,
  projectTimeline ENUM('asap', '3_months', '6_months', '1_year', 'just_exploring'),
  estimatedBudget VARCHAR(50),
  homeSystems JSON,
  homeStyle VARCHAR(100),
  exteriorColor VARCHAR(100),
  primaryPainPoint VARCHAR(255),
  hearAboutUs VARCHAR(255),
  additionalNotes VARCHAR(2000),
  consentTerms BOOLEAN DEFAULT false,
  consentEmail BOOLEAN DEFAULT false,
  consentSms BOOLEAN DEFAULT false,
  consentPush BOOLEAN DEFAULT false,
  consentMarketing BOOLEAN DEFAULT false,
  consentDataUse BOOLEAN DEFAULT false,
  preferredContact VARCHAR(20),
  status ENUM('pending', 'approved', 'rejected', 'invited') DEFAULT 'pending',
  adminNotes VARCHAR(1000),
  approvedAt DATETIME,
  approvedBy INT,
  invitedAt DATETIME,
  createdAt DATETIME DEFAULT NOW(),
  updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
  
  KEY idx_email (email),
  KEY idx_createdAt (createdAt DESC),
  KEY idx_zipCode (zipCode)
);
```

---

## Security Architecture

### Input Validation
- **Client-side**: Zod schemas (TypeScript validation)
- **Server-side**: Zod schemas (mandatory re-validation)
- **Database**: SQL parameterization via Drizzle ORM

### SQL Injection Prevention
- **Method**: Parameterized queries with template literals
- **Implementation**: Drizzle ORM handles parameter binding
- **Result**: 100% SQL injection protection

### XSS Prevention
- **Method**: No raw HTML generation from user input
- **Strategy**: Zod trim/lowercase/validation + JSON serialization for arrays
- **Email**: HTML templates use static content, dynamic data is escaped

### CSRF Prevention
- **Method**: tRPC's JSON-based RPC is inherently CSRF-resistant
- **Reason**: Requires proper Content-Type headers + SOP enforcement
- **Fallback**: Rate limiting provides additional protection

### Authentication & Authorization
- **Session Management**: HTTP-only, Secure, SameSite=Strict cookies
- **User Context**: Extracted from cookies, validated on each request
- **Admin Check**: Middleware verifies `user.role === 'admin'`
- **Error Messages**: Generic messages for auth failures (no user enumeration)

---

## Performance Optimization

### Database Indexes
```sql
-- Email lookup (duplicate detection)
CREATE INDEX idx_proWaitlist_email ON proWaitlist(email);

-- Sorting by creation date
CREATE INDEX idx_proWaitlist_createdAt ON proWaitlist(createdAt DESC);

-- Referral tracking
CREATE INDEX idx_proWaitlist_referredBy ON proWaitlist(referredBy);
```

### API Response Optimization
- **Minimal payload**: Only return `{success, position}`
- **Async operations**: Fire-and-forget email (doesn't block response)
- **Caching opportunity**: Position counter could be cached for 10 seconds
- **Compression**: gzip enabled (Railway default)

### Current Performance
- Form submission: **~200ms** (p95: 380ms)
- Position calculation: **<100ms**
- Admin dashboard: **~1200ms** (p95: <2s)

---

## Logging & Monitoring

### Structured Logging
```typescript
logger.track("waitlist:joinProWaitlist", async () => {
  // Tracks:
  // - Operation name
  // - Execution time (ms)
  // - Success/failure
  // - Error details (if failed)
});
```

### Analytics Events
```typescript
analyticsTracker.track("signup", {
  form_type: "pro",
  email: sanitized_email,
  trades_count: 2,
  position: 42,
  referred_by: "referral",  // or "direct"
  sms_optin: true,
  has_license: true
});
```

### Error Tracking (Sentry)
- **Events**: All exceptions caught and reported
- **Breadcrumbs**: Request/response cycle tracking
- **Rate Limiting**: 20% sample rate in production (0% errors = no cost)

---

## Deployment Pipeline

```
1. Developer commits to main branch
   └─ Pre-commit hooks check linting & formatting

2. GitHub Actions runs CI
   ├─ npm run lint
   ├─ npx tsc --noEmit
   └─ npm run build

3. Railway detects main push
   ├─ Builds Docker image
   ├─ Installs dependencies
   ├─ Runs build command
   └─ Deploys to staging/production

4. Post-deployment
   ├─ Health check endpoint responds
   ├─ Database migrations run (manual via /setup endpoint)
   └─ Sentry captures first error
```

---

## Scaling Strategy

### Current Scale (May 2026)
- **Users**: ~100 concurrent, 500+ signups
- **Database**: TiDB Serverless (auto-scaling)
- **API**: Railway single instance (512MB RAM)
- **Email**: Resend free tier (10K/month)

### Growth Thresholds
| Signups | Action |
|---------|--------|
| <5K | Single node (current) |
| 5K-50K | Add TiDB node 2 + caching layer |
| 50K-500K | Add TiDB node 3 + pagination |
| 500K+ | Multi-region replication |

---

## Future Enhancements

- [ ] Redis cache for position counter (reduce DB queries)
- [ ] Email queue (Bull/BullMQ for reliability)
- [ ] Commission calculation engine (Phase 2)
- [ ] n8n automation workflows
- [ ] Payment processing (Stripe integration)
- [ ] Photo upload/scanning infrastructure
- [ ] Partner onboarding flow
- [ ] Analytics dashboard (conversion funnels, trends)

---

## Compliance & Standards

- **TypeScript**: Strict mode enabled
- **Accessibility**: WCAG 2.1 level AA target
- **GDPR**: Consent forms, data export via API
- **CCPA**: Privacy policy, user data access
- **PCI DSS**: Payment processing (external provider)

