# ProLnk Webhooks & APIs Audit

**Last Updated:** April 29, 2026  
**Purpose:** Complete catalog of all inbound/outbound webhooks and tRPC endpoints for system integration.

---

## Inbound Webhooks (External → ProLnk)

All webhooks are mounted at `POST /api/webhooks/*` and handled by `server/webhooks.ts`.

### CompanyCam Photo Webhook
- **Path:** `POST /api/webhooks/companycam`
- **Trigger:** Photo created event from CompanyCam
- **Required Headers:** `x-companycam-signature`
- **Purpose:** Receives photos from job sites, enqueues them for AI analysis
- **Signature Verification:** HMAC SHA-256
- **Actions:** 
  - Validates webhook signature
  - Extracts company_id from payload
  - Calls `enqueuePhoto()` to trigger AI scan pipeline
  - Fires n8n trigger if opportunity accepted

### Jobber Job Completion Webhook
- **Path:** `POST /api/webhooks/jobber`
- **Trigger:** Job completed event from Jobber FSM
- **Required Headers:** `x-jobber-signature`
- **Purpose:** Auto-closes opportunities and triggers commission payout when partner completes a job
- **Signature Verification:** HMAC SHA-256
- **Actions:**
  - Extracts job value and partner tag from payload
  - Calls `autoCloseOpportunityForJob()` to close accepted opportunity
  - Triggers n8n `leadConverted` event with commission details

### HouseCall Pro Job Completion Webhook
- **Path:** `POST /api/webhooks/housecallpro`
- **Trigger:** Job completed event from HouseCall Pro FSM
- **Purpose:** Same as Jobber (auto-close + commission)
- **Signature Verification:** API key validation
- **Actions:** Same as Jobber

### FSM Payment/Job Event Webhooks (Generic)
- **Paths:**
  - `POST /api/webhooks/fsm/housecall-pro`
  - `POST /api/webhooks/fsm/jobber`
  - `POST /api/webhooks/fsm/workiz`
  - `POST /api/webhooks/fsm/service-fusion`
  - `POST /api/webhooks/fsm/fieldedge`
  - `POST /api/webhooks/fsm/generic`
- **Purpose:** Normalize FSM events and log to `fsmWebhookEvents` table for audit trail
- **Actions:**
  - Extracts event details (partnerId, eventType, jobData)
  - Stores in database
  - Returns 200 OK (silent failures logged)

### Field App Event Webhook
- **Path:** `POST /api/webhooks/field-app`
- **Purpose:** Receives events from field service mobile app
- **Actions:** Currently placeholder; needs implementation

---

## REST API Endpoints (Express)

### File Upload Endpoints

**Photo Upload**
- **Path:** `POST /api/upload-photos`
- **Rate Limit:** 5 requests per 5 minutes (per IP)
- **Request Body:** JSON array of base64-encoded photos
- **Response:** `{ urls: string[] }`
- **File Limits:** Max 16MB per photo, max 10 photos per request
- **Purpose:** Client uploads photos before tRPC homeowner scan

**License/Insurance Upload**
- **Path:** `POST /api/upload-license`
- **Request Body:** Single base64-encoded document
- **Response:** `{ url: string, fileName: string }`
- **File Limits:** Max 10MB
- **Purpose:** Partner uploads license/COI for compliance verification

### Stripe Webhook
- **Path:** `POST /api/stripe/webhook`
- **Handler:** `server/routers/stripe.ts::handleStripeWebhook()`
- **Required:** Raw body (not JSON-parsed); registered BEFORE `express.json()`
- **Purpose:** Receives Stripe payment events (payout status, refunds, etc.)
- **Signature Verification:** Stripe signature header validation
- **Actions:**
  - Updates partner payout status
  - Triggers notifications
  - Records transaction history

### Check-in Response Endpoint
- **Path:** `GET /api/checkin/:token`
- **Query Parameters:** `?response=yes|no|undefined`
- **Purpose:** Homeowner responds to 48-hour post-job satisfaction survey
- **Response:** HTML feedback page
- **Actions:**
  - Calls `processCheckinResponse(token, response)`
  - Updates job satisfaction record
  - May trigger follow-up if negative

### Sitemap Endpoint
- **Path:** `GET /sitemap.xml`
- **Purpose:** SEO sitemap with all major app routes
- **Response:** XML with static routes and priority levels

### OAuth Routes
- **Path:** `/api/oauth/*` (multiple routes)
- **Handler:** `server/_core/oauth.ts::registerOAuthRoutes()`
- **Purpose:** Google OAuth callback for authentication
- **Actions:** Creates/updates user session

---

## tRPC API Routers

**Base Path:** `POST /api/trpc/<router>.<procedure>`  
**Authentication:** tRPC context validates `req.session` for protected procedures

### Routers & Procedures

| Router | Key Procedures | Purpose |
|--------|---|---------|
| **auth** | `login`, `logout`, `register`, `validateToken` | User authentication |
| **homeowner** | `uploadPhotos`, `analyze`, `getHistory`, `likePhoto`, `getHomeDetails` | Homeowner photo scan + home vault |
| **partners** | `getProfile`, `updateProfile`, `applyWaitlist`, `getDashboard`, `getLeads` | Partner accounts & lead management |
| **admin** | `getAllPartners`, `approveApplication`, `rejectApplication`, `markPayoutPaid`, `broadcastMessage` | Admin controls |
| **jobs** | `getJobHistory`, `acceptLead`, `declineLead`, `closeJob`, `dispatchNotification` | Job workflow |
| **notifications** | `getNotifications`, `markAsRead`, `setPreferences`, `testNotification` | Notification management |
| **waitlist** | `joinProWaitlist`, `joinHomeWaitlist`, `getWaitlistStatus` | Waitlist signups |
| **directory** | `searchProsByZip`, `getProProfile`, `getRatings`, `getServiceArea` | Public pro directory |
| **compliance** | `checkCOIStatus`, `requestManualReview`, `getComplianceHistory` | License/insurance tracking |
| **messaging** | `sendMessage`, `getConversation`, `getInbox` | Partner messaging |
| **ai** | `analyzePhotos`, `assessDamage`, `estimateRepairCost` | AI analysis endpoints |
| **network** | `lookupReferrer`, `enroll`, `getDashboard`, `getPayoutHistory` | Network income/MLM |
| **referralTracking** | `trackReferral`, `getReferralStats`, `generateLink` | Referral attribution |
| **serviceArea** | `getServiceAreaData`, `updateServiceZipCodes` | Zip code coverage |
| **trustyPro** | `listAllPros`, `homeownerSearch`, `getProPublicProfile` | TrustyPro homeowner portal |

---

## Outbound Webhooks & API Calls

### n8n Workflow Triggers
**Function:** `server/n8n-triggers.ts`  
**Purpose:** Trigger n8n workflows for multi-step business processes

| Trigger | Payload | Purpose |
|---------|---------|---------|
| `leadConverted` | opportunityId, partnerId, jobValue, commissionAmount | Notify partner of commission earned |
| `opportunityExpired` | opportunityId, receivingPartnerId | Notify when lead expires |
| `partnerApproved` | partnerId, businessName, trades | Send welcome email + setup guide |
| `partnerRejected` | partnerId, email, reason | Send rejection notice |
| `payoutRequested` | partnerId, amount, bankAccount | Route to finance team |
| `complianceWarning` | partnerId, docType, expiryDate | Remind to renew license/COI |

**Endpoint Pattern:** `POST https://n8n.prolnk.io/webhook/...`

### Email Notifications (Resend)
**Service:** `server/email.ts` & `server/notifications.ts`  
**Adapter:** Resend SMTP or API

| Email Type | Recipient | Trigger |
|-----------|-----------|---------|
| Pro Waitlist Confirmation | Partner | After `joinProWaitlist` |
| Homeowner Waitlist Confirmation | Homeowner | After `joinHomeWaitlist` |
| Lead Alert | Partner | New opportunity created |
| Payout Confirmation | Partner | Payout marked as paid |
| Compliance Reminder | Partner | COI expires in 30 days |
| Tier Upgrade | Partner | Achieves new tier |

**From Address:** Configured via `FROM_EMAIL` env var

### SMS Notifications (Twilio)
**Service:** Configured but rarely used  
**Credentials:** `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`  
**Use Cases:** Lead alerts, payment confirmations (if SMS opt-in enabled)

### Stripe Connect
**Purpose:** Partner payout onboarding + billing portal links  
**Endpoints Called:**
- `POST /v1/account_links` — Generate onboarding link
- `GET /v1/accounts/:id` — Fetch payout status
- Webhook receiver: `/api/stripe/webhook`

### ATTOM Data API
**Purpose:** Get property details, market rates, neighborhood data  
**Used In:** `server/attom.ts`  
**API Key:** `ATTOM_API_KEY`

### Google Maps API
**Purpose:** Geocoding, service area mapping, pro location display  
**Key Methods:**
- Geocode homeowner address → lat/lng
- Reverse geocode to confirm city/state
- Draw service area circles on map

### OpenAI API
**Purpose:** AI photo analysis, damage assessment, messaging help  
**Endpoints:**
- `POST /v1/chat/completions` — GPT text analysis
- `POST /v1/vision/...` — GPT-4o Vision for photo analysis
- **Key:** `OPENAI_API_KEY`

### Inngest (Background Jobs)
**Purpose:** Scheduled/delayed job execution (emails, compliance scans, etc.)  
**Used For:**
- Delayed lead expiry notifications
- Nightly compliance scans
- Monthly PPS recalculation
- Storm detection dispatch

---

## Background Jobs & Schedulers

| Job | Frequency | Handler | Purpose |
|-----|-----------|---------|---------|
| Lead Expiry Sweep | Every 5 min | `sweepExpiredLeads()` | Auto-route to next partner |
| Deal Expiry Sweep | Every 5 min | `sweepExpiredDeals()` | Mark stale deals as closed |
| Partner Priority Score | Nightly @ 2 AM | `recalculateAllPartnerScores()` | Recalc match scores |
| Compliance Scan | Nightly @ 3 AM | `runComplianceScan()` | Flag expiring COI/license |
| Storm Scan | Nightly @ 4 AM | `runStormScan()` | Detect hail/flood events, generate leads |
| Check-in Sweep | Every 30 min | `sweepPendingCheckins()` | Send 48-hour post-job surveys |
| Monthly Reset | 1st of month | `resetJobsCompletedThisMonth()` | Reset network income counters |

---

## Authentication & Security

### Session Management
- **Method:** JWT tokens in HTTP-only cookies
- **Expiry:** 7 days (default)
- **Secret:** `JWT_SECRET` env var
- **Protection:** CSRF tokens on state-changing requests

### Rate Limiting
- **API Rate Limit:** 60 requests per minute (per IP)
- **Scan Rate Limit:** 5 requests per 5 minutes (per IP)
- **Stripe Webhook:** No rate limit (internal processing)

### Webhook Signature Verification
- **CompanyCam:** HMAC SHA-256 (`x-companycam-signature` header)
- **Jobber:** HMAC SHA-256 (`x-jobber-signature` header)
- **Stripe:** Custom signature algorithm (`stripe-signature` header)
- **n8n:** Custom signature (`X-N8N-Signature` header) — NOT YET VALIDATED (security gap)

### Database Connection
- **Database:** MySQL (TiDB on Planetscale or direct MySQL)
- **ORM:** Drizzle ORM
- **Encryption:** Connection pooling with SSL/TLS
- **Backups:** Configured at provider level (Planetscale)

---

## Known Issues & Gaps

### Security Gaps
- ⚠️ **n8n webhook signature not validated** — Any external caller can trigger workflows
- ⚠️ **No database backups configured in code** — Depends on provider auto-backups
- ⚠️ **LLM API public (analyzePhotos endpoint)** — No auth required; add IP-based throttle

### Missing Webhooks
- [ ] Pending payout batch processing (admin endpoint needed)
- [ ] Partner suspension notifications (n8n trigger needed)
- [ ] Real estate agent referral tracking (not implemented)

### Missing Endpoints
- [ ] Advertiser dashboard (advertiser program incomplete)
- [ ] Exchange backend (currently fake data with 936 hardcoded listings)
- [ ] Agent portal (referral link tracking done, but dashboard missing)

---

## Configuration Checklist

Before deploying:

- [ ] Set `APP_BASE_URL` env var (used in emails + redirects)
- [ ] Set `FROM_EMAIL` env var (e.g., `ProLnk <noreply@prolnk.io>`)
- [ ] Configure Resend custom domain + DNS records
- [ ] Rotate `JWT_SECRET` if exposed
- [ ] Set `OPENAI_API_KEY` for AI features
- [ ] Set `ATTOM_API_KEY` for property data
- [ ] Configure Stripe webhook endpoint URL in dashboard
- [ ] Test all webhooks end-to-end with sample payloads
- [ ] Validate n8n webhook signatures (add to webhooks.ts)
- [ ] Enable database automated backups

---

## Testing Webhooks Locally

```bash
# CompanyCam test
curl -X POST http://localhost:3000/api/webhooks/companycam \
  -H "Content-Type: application/json" \
  -H "x-companycam-signature: <COMPUTED_HMAC>" \
  -d '{"company_id":"test","photo":{"id":"123"}}'

# Jobber test
curl -X POST http://localhost:3000/api/webhooks/jobber \
  -H "Content-Type: application/json" \
  -H "x-jobber-signature: <COMPUTED_HMAC>" \
  -d '{"job":{"id":"456","client_tag":"ProLnk-5"}}'

# Stripe test (using Stripe CLI)
stripe listen --forward-to localhost:3000/api/stripe/webhook
stripe trigger payment_intent.succeeded
```

---

## Next Steps

1. **Validate n8n signatures** — Update `webhooks.ts` to check `X-N8N-Signature` header
2. **Add advertiser webhooks** — New endpoints for advertiser click tracking, impression logging
3. **Implement exchange backend** — Wire Exchange.tsx to real tRPC endpoints instead of hardcoded data
4. **Document all tRPC input/output schemas** — Generate OpenAPI spec from tRPC routers
5. **Add request/response logging** — Middleware to log all API calls for audit trail
