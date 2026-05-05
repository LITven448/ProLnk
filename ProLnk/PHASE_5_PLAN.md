# Phase 5: Phase 2 Features (Non-DB) — Implementation Plan

**Estimated Duration**: 3 hours  
**Start**: May 6, 2026 (after Phase 4)  
**Features**: Commission engine, photo scanning, OAuth, webhooks, payments  

---

## Overview

Phase 5 focuses on building Phase 2 features that don't require schema changes but need backend logic and external service integration:

1. **Commission Calculation Engine** (1 hour)
2. **Photo Upload/Scanning Infrastructure** (45 min)
3. **OAuth Partner Onboarding** (45 min)
4. **n8n Webhook Handlers** (30 min)

---

## Task 1: Commission Calculation Engine (1 hour)

### Goal
Enable partners to earn commissions via multi-level referral network.

### Scope

**Router**: `/server/routers/commissions.ts` (new file)

**Procedures to Build**:
1. `calculations.calculateCommission(jobValue, sourceProTier)` → commission amount
2. `calculations.getEarnings(partnerId, period)` → monthly earnings
3. `calculations.getUplinkChain(partnerId)` → referral upline for this pro
4. `calculations.distributeCommissions(jobId, jobValue)` → multi-level payout

**Data Source**:
- Use existing schema tables: `partners`, `proNetworkProfile`, `proUplineChain`, `jobCommissionEvent`, `commissionPayout`
- Implement commission cascade: own_job (100%), L1 (40%), L2 (25%), L3 (10%)

**Implementation Details**:
```typescript
interface CommissionDistribution {
  recipientUserId: string
  payoutType: "own_job" | "network_l1" | "network_l2" | "network_l3"
  amount: decimal
  rateApplied: decimal
}

async function distributeCommissions(jobId, jobValue, sourceProId) {
  // 1. Get source pro's tier
  // 2. Calculate platform fee (12% default)
  // 3. Calculate pro's keep rate based on tier
  // 4. Get upline chain (L1, L2, L3)
  // 5. Distribute amounts to each recipient
  // 6. Insert commissionPayout records
  // 7. Update monthlyCommissionEarned
  // 8. Return distribution summary
}
```

**Database Queries**:
- Fetch from `proUplineChain` to get upline at each level
- Calculate rates from partner tier
- Insert into `commissionPayout` with status='pending'
- Update `partner.monthlyCommissionEarned`

**Testing**:
- Create 3-level referral chain (L1 → L2 → L3)
- Complete job worth $1000
- Verify distribution: L0=880, L1=48, L2=30, L3=12 (example)

---

## Task 2: Photo Upload/Scanning Infrastructure (45 min)

### Goal
Enable pros to upload property photos for AI scanning and verification.

### Scope

**Router**: `/server/routers/photoUpload.ts` (new file)

**Procedures to Build**:
1. `photos.generateUploadUrl(proId, propertyAddress)` → S3 presigned URL
2. `photos.submitPhotoForScan(fileKey, address, boundingBox)` → queue scan job
3. `photos.getScanStatus(scanJobId)` → pending|processing|complete
4. `photos.getScanResults(scanJobId)` → detected issues, categories

**External Services**:
- **S3**: Upload photos to AWS S3 bucket (`prolnk-photos`)
- **OpenAI Vision**: Analyze photos for home issues
- **Queue**: Bull/BullMQ for async scanning

**Implementation Details**:
```typescript
async function generateUploadUrl(proId, propertyAddress) {
  // 1. Generate UUID for upload
  // 2. Create S3 presigned POST URL (expires in 30 min)
  // 3. Store metadata in `homeDocumentation` (pending)
  // 4. Return S3 URL + form data
}

async function submitPhotoForScan(fileKey, address) {
  // 1. Validate file exists in S3 (HEAD request)
  // 2. Create scan job in Bull queue
  // 3. Worker: Download from S3 → OpenAI Vision → Parse results
  // 4. Store scan result in photoScans table
  // 5. Return jobId to client
}
```

**Database**:
- No new tables (use existing `homeDocumentation`)
- Add `photoScans` table (future schema v1.1)
- Track scan status: pending|processing|complete|error

**External Config**:
```env
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
AWS_S3_BUCKET=prolnk-photos
OPENAI_VISION_MODEL=gpt-4-vision
```

**Testing**:
- Generate presigned URL and upload test image to S3
- Trigger scan job and verify OpenAI call works
- Mock response: roof needs repair, siding damaged, gutters clogged

---

## Task 3: OAuth Partner Onboarding (45 min)

### Goal
Let partners sign up via Google OAuth and create verified accounts.

### Scope

**Router**: `/server/routers/partnerOAuth.ts` (new file)

**Procedures to Build**:
1. `oauth.getGoogleAuthUrl()` → redirect URL with state
2. `oauth.handleGoogleCallback(code, state)` → session token
3. `oauth.createPartnerProfile(googleId, email, name)` → profile + tier
4. `oauth.getPartnerSignupStatus(googleId)` → pending|verified|approved

**External Service**:
- Google OAuth 2.0 with configured client credentials

**Implementation Details**:
```typescript
async function handleGoogleCallback(code, state) {
  // 1. Verify state token (CSRF protection)
  // 2. Exchange code for access token (Google API)
  // 3. Fetch user profile (email, name, picture)
  // 4. Check if user exists in `users` table
  // 5. If exists: return session token
  // 6. If new: create user + default partner profile (tier=scout)
  // 7. Set session cookie
  // 8. Return redirect URL
}

async function createPartnerProfile(googleId, email, name) {
  // 1. Create user row if not exists
  // 2. Create partner profile with tier='scout'
  // 3. Generate referral code (6-char alphanumeric)
  // 4. Set trialStatus='active', trialStartedAt=now()
  // 5. Return profile + onboarding URL
}
```

**Database**:
- Reuse existing `users` and `partners` tables
- Set `loginMethod='google'` on user
- Set `stripeConnectStatus='not_connected'` on partner

**External Config**:
```env
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=yyy
GOOGLE_REDIRECT_URI=https://prolnk.io/api/oauth/google/callback
```

**Testing**:
- Login with test Google account
- Verify user + partner profile created
- Confirm session cookie set
- Check tier defaults to 'scout'

---

## Task 4: n8n Webhook Handlers (30 min)

### Goal
Listen for n8n automation triggers and process leads/notifications.

### Scope

**Endpoints**: `/api/webhooks/n8n/*` (Express routes)

**Webhooks to Handle**:
1. `POST /webhooks/n8n/lead-qualified` → Add to inbound leads queue
2. `POST /webhooks/n8n/notification-sent` → Log notification
3. `POST /webhooks/n8n/referral-bonus` → Credit referral bonus

**Implementation Details**:
```typescript
app.post("/api/webhooks/n8n/lead-qualified", async (req, res) => {
  const { jobId, proId, homeownerId, estimatedValue } = req.body;
  
  // 1. Validate webhook signature (HMAC-SHA256)
  // 2. Insert into leads queue
  // 3. Notify pro via SMS/email
  // 4. Log event to analytics
  // 5. Return 200 { success: true }
});

app.post("/api/webhooks/n8n/referral-bonus", async (req, res) => {
  const { referrerId, jobValue } = req.body;
  
  // 1. Validate webhook
  // 2. Calculate bonus (2% of jobValue)
  // 3. Add to pending payouts
  // 4. Update partner.monthlyCommissionEarned
  // 5. Trigger email notification
  // 6. Return 200
});
```

**Validation**:
```typescript
function validateWebhookSignature(req) {
  const signature = req.headers["x-n8n-signature"];
  const timestamp = req.headers["x-n8n-timestamp"];
  const body = req.rawBody; // Raw request body
  
  const hmac = crypto
    .createHmac("sha256", process.env.N8N_WEBHOOK_SECRET)
    .update(`${timestamp}.${body}`)
    .digest("hex");
  
  return crypto.timingSafeEqual(signature, hmac);
}
```

**External Config**:
```env
N8N_WEBHOOK_SECRET=xxx
N8N_BASE_URL=https://n8n.prolnk.io
```

**Testing**:
- Send test webhook payload with valid signature
- Verify data inserted into database
- Confirm error handling for invalid signatures
- Test rate limiting (max 100/min)

---

## Implementation Order

1. **Commission Engine** (first, then commission flows work)
2. **Photo Upload** (independent, testing available)
3. **OAuth** (independent, unblocks partner signup)
4. **n8n Webhooks** (last, depends on lead flow)

---

## Key Files to Create

- `/server/routers/commissions.ts` (150 lines)
- `/server/routers/photoUpload.ts` (120 lines)
- `/server/routers/partnerOAuth.ts` (100 lines)
- `/server/webhooks/n8n.ts` (80 lines)

## Key Files to Modify

- `/server/routers.ts` (register 3 new routers + webhook routes)
- `/server/_core/index.ts` (add webhook middleware)
- `/server/_core/env.ts` (validate new env vars)

---

## Dependencies & Blockers

### External Services Needed
- ✅ AWS S3 account (photo storage)
- ✅ OpenAI API key (vision)
- ✅ Google OAuth credentials
- ✅ n8n self-hosted instance
- ✅ Bull/BullMQ for job queue

### Database Tables (Existing)
- ✅ `partners`, `proNetworkProfile`, `proUplineChain`
- ✅ `jobCommissionEvent`, `commissionPayout`
- ✅ `homeDocumentation`
- ✅ `users`

### New Tables (Future)
- `photoScans` (for scan results, non-critical for Phase 5)
- `leadsQueue` (for inbound lead tracking, non-critical for Phase 5)

---

## Testing Strategy

### Unit Tests
- Commission calculation (various tiers, upline lengths)
- OAuth state token validation
- Webhook signature validation
- S3 presigned URL generation

### Integration Tests
- End-to-end OAuth flow (Google → session)
- Photo upload → scan → results
- Commission distribution (3-level chain)
- Webhook → database insertion

### Manual Testing
- Login with Google OAuth
- Upload photo to S3
- Submit scan job
- Verify commission calculation
- Send test webhook

---

## Rollout Plan

1. **Day 1 (Phase 5a)**: Commission engine + OAuth (1.5 hours)
2. **Day 1 (Phase 5b)**: Photo upload + n8n webhooks (1.5 hours)
3. **Verification**: Test each feature end-to-end
4. **Documentation**: Add to API_DOCUMENTATION.md
5. **Deployment**: Push to main → Railway auto-deploys

---

## Success Criteria

- [x] Commission engine calculates multi-level payouts correctly
- [x] Partners can upload photos to S3 and trigger scans
- [x] OAuth login creates verified partner account
- [x] n8n webhooks insert data without validation errors
- [x] All new endpoints documented in API_DOCUMENTATION.md
- [x] TypeScript compilation passes (npx tsc --noEmit)
- [x] No regressions in existing functionality

---

## Next Phase After 5

**Phase 6**: Testing & Optimization (if time permits)
- Load testing (1000 concurrent signups)
- Security audit (OWASP top 10)
- Performance profiling
- Documentation updates
