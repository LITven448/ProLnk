# ProLnk API Documentation

**Version**: 1.0.0 | **Last Updated**: May 6, 2026 | **Status**: Production Ready

---

## Quick Start

All endpoints are accessible via `/api/trpc` using POST requests with JSON payloads.

```bash
# Example: Join Pro Waitlist
curl -X POST https://prolnk.io/api/trpc/waitlist.joinProWaitlist \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "5551234567",
    ...
  }'
```

---

## Authentication

- **Public Procedures**: No authentication required
- **Protected Procedures**: Requires valid session (`Authorization` header or cookies)
- **Admin Procedures**: Requires valid session with `role === 'admin'`

Session management:
- Sessions created via `/api/auth/login` (email/password) or `/api/auth/google` (OAuth)
- Session cookie: `prolnk_session` (HTTP-only, Secure, SameSite=Strict)
- Token expiry: 30 days
- CSRF protection: tRPC's JSON-based RPC is inherently CSRF-resistant

---

## Waitlist Procedures

### Public Procedures

#### 1. `waitlist.joinProWaitlist`

Join the ProLnk professional network waitlist.

**Input Schema:**
```typescript
{
  firstName: string (1-100 chars)
  lastName: string (1-100 chars)
  email: string (valid email format)
  phone: string (7-30 chars)
  businessName: string (1-255 chars)
  businessType: string (1-100 chars)
  yearsInBusiness: number (0-100)
  employeeCount: string
  estimatedJobsPerMonth: number
  avgJobValue: string
  trades: string[] (min: 1, max: 20 items, each 1-50 chars)
  primaryCity: string (1-100 chars)
  primaryState: string (1-50 chars)
  serviceZipCodes: string (validated format)
  serviceRadiusMiles?: number (1-500, default: 25)
  currentSoftware: string[] (optional)
  otherSoftware?: string (max: 255 chars)
  referralsGivenPerMonth: string
  referralsReceivedPerMonth: string
  currentReferralMethod?: string (max: 255 chars)
  primaryGoal: string (1-100 chars)
  hearAboutUs?: string (max: 255 chars)
  additionalNotes?: string (max: 2000 chars)
  customTradeDescription?: string (max: 500 chars)
  licenseFileUrl?: string (valid URL, max: 1000 chars)
  licenseFileName?: string (max: 255 chars)
  smsOptIn?: boolean (default: false)
  referralCode?: string (max: 100 chars)
}
```

**Response:**
```typescript
{
  success: boolean
  position: number  // Waitlist position (e.g., #42)
}
```

**Error Codes:**
- `CONFLICT`: Email already registered on waitlist (409)
- `BAD_REQUEST`: Validation error (400)
- `INTERNAL_SERVER_ERROR`: Database or email service error (500)

**Side Effects:**
- Creates record in `proWaitlist` table
- Sends confirmation email with position number
- Sends admin notification
- Tracks analytics event with form_type, referral source, SMS opt-in status
- Fire-and-forget email (doesn't block response)

**Example Request:**
```bash
curl -X POST https://prolnk.io/api/trpc/waitlist.joinProWaitlist \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "5551234567",
    "businessName": "Acme Plumbing",
    "businessType": "Plumbing",
    "yearsInBusiness": 5,
    "employeeCount": "3-5",
    "estimatedJobsPerMonth": 10,
    "avgJobValue": "$500-1000",
    "trades": ["plumbing", "hvac"],
    "primaryCity": "Dallas",
    "primaryState": "TX",
    "serviceZipCodes": "75001, 75002",
    "currentSoftware": ["jobber"],
    "referralsGivenPerMonth": "2-3",
    "referralsReceivedPerMonth": "1-2",
    "primaryGoal": "Grow my network",
    "smsOptIn": true
  }'
```

---

#### 2. `waitlist.joinHomeWaitlist`

Join the TrustyPro homeowner waitlist for home evaluations and projects.

**Input Schema:**
```typescript
{
  firstName: string (1-100 chars)
  lastName: string (1-100 chars)
  email: string (valid email format)
  phone?: string (max: 30 chars)
  address: string (1-500 chars)
  city: string (1-100 chars)
  state: string (1-50 chars)
  zipCode: string (regex: ^\d{5}(-\d{4})?$)
  homeType: enum ['single_family', 'townhouse', 'condo', 'multi_family', 'mobile']
  yearBuilt?: number (1800-current_year+1)
  squareFootage?: number (100-50000)
  lotSizeSqFt?: number (0+)
  bedrooms?: number (0-20)
  bathrooms?: string (max: 10 chars)
  stories?: number (1-10)
  garageSpaces?: number (0-10)
  hasPool?: boolean (default: false)
  hasBasement?: boolean (default: false)
  hasAttic?: boolean (default: false)
  ownershipStatus?: enum ['own', 'rent'] (default: 'own')
  ownershipType?: enum ['primary_residence', 'rental', 'company_owned'] (default: 'primary_residence')
  isRental?: boolean (default: false)
  companyName?: string (max: 255 chars)
  companyEin?: string (max: 20 chars)
  propertyManagerName?: string (max: 255 chars)
  propertyManagerPhone?: string (max: 30 chars)
  yearsOwned?: number (0+)
  overallCondition?: enum ['excellent', 'good', 'fair', 'needs_work']
  recentImprovements?: string[]
  desiredProjects: string[] (min: 1, max: 20)
  projectTimeline?: enum ['asap', '3_months', '6_months', '1_year', 'just_exploring'] (default: 'just_exploring')
  estimatedBudget?: string (max: 50 chars)
  homeSystems?: Record<string, string>
  homeStyle?: string (max: 100 chars)
  exteriorColor?: string (max: 100 chars)
  primaryPainPoint?: string (max: 255 chars)
  hearAboutUs?: string (max: 255 chars)
  additionalNotes?: string (max: 2000 chars)
  consentTerms?: boolean (default: false)
  consentEmail?: boolean (default: false)
  consentSms?: boolean (default: false)
  consentPush?: boolean (default: false)
  consentMarketing?: boolean (default: false)
  consentDataUse?: boolean (default: false)
  preferredContact?: string (max: 20 chars)
}
```

**Response:**
```typescript
{
  success: boolean
  position: number
}
```

**Error Codes:** (same as joinProWaitlist)

**Example Request:**
```bash
curl -X POST https://prolnk.io/api/trpc/waitlist.joinHomeWaitlist \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "address": "123 Oak Street",
    "city": "Dallas",
    "state": "TX",
    "zipCode": "75001",
    "homeType": "single_family",
    "desiredProjects": ["kitchen_remodel", "bathroom"],
    "projectTimeline": "6_months",
    "consentTerms": true,
    "consentEmail": true
  }'
```

---

#### 3. `waitlist.joinSimpleWaitlist`

Quick email capture for TrustyPro homeowner waitlist (minimal info).

**Input Schema:**
```typescript
{
  name: string (1-200 chars, will be split into firstName/lastName)
  email: string (valid email format)
}
```

**Response:**
```typescript
{
  success: boolean
  position: number
}
```

**Example Request:**
```bash
curl -X POST https://prolnk.io/api/trpc/waitlist.joinSimpleWaitlist \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com"
  }'
```

---

### Admin Procedures

All admin procedures require authentication with `role === 'admin'`.

#### 4. `waitlistAdmin.getProWaitlist`

Get all professional network waitlist entries.

**Input:** None

**Response:**
```typescript
Array<{
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  businessName: string
  businessType: string
  trades: string
  tier?: string
  referredBy?: string
  smsOptIn: boolean
  createdAt: Date
  position?: number
}>
```

---

#### 5. `waitlistAdmin.getHomeWaitlist`

Get all homeowner waitlist entries.

**Input:** None

**Response:**
```typescript
Array<{
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  address: string
  city?: string
  state?: string
  homeType: string
  desiredProjects: string
  projectTimeline: string
  createdAt: Date
  position?: number
}>
```

---

#### 6. `waitlistAdmin.getWaitlistMetrics`

Get summary metrics for both waitlists.

**Input:** None

**Response:**
```typescript
{
  totalSignups: number
  proSignups: number
  trustyproSignups: number
  referrals: number
  conversionRate: number  // Percentage of pro signups that came via referral
}
```

---

#### 7. `waitlistAdmin.searchWaitlist`

Search across both waitlists by name, email, or business.

**Input:**
```typescript
{
  query: string (1-255 chars)
  source?: enum ['pro', 'home', 'all'] (default: 'all')
}
```

**Response:**
```typescript
Array<{
  source: 'pro' | 'home'
  id: number
  firstName: string
  lastName: string
  email: string
  businessName?: string  // pro only
  address?: string       // home only
}>
```

---

#### 8. `waitlistAdmin.exportWaitlist`

Export waitlist data for external use (CSV format).

**Input:**
```typescript
{
  source: enum ['pro', 'home', 'all']
}
```

**Response:**
```typescript
{
  pro?: Array<{
    firstName: string
    lastName: string
    email: string
    phone: string
    businessName: string
    businessType: string
    trades: string
    referredBy?: string
    createdAt: Date
  }>
  home?: Array<{
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    homeType: string
    desiredProjects: string
    createdAt: Date
  }>
}
```

---

#### 9. `waitlistAdmin.getSignupTrends`

Get daily signup trends for the past 30 days.

**Input:** None

**Response:**
```typescript
Array<{
  date: string  // YYYY-MM-DD
  source: 'pro' | 'home'
  count: number
}>
```

---

#### 10. `waitlistAdmin.updateProStatus`

Update status of a pro waitlist entry.

**Input:**
```typescript
{
  id: number
  status: enum ['pending', 'approved', 'rejected', 'invited']
  adminNotes?: string (max: 1000 chars)
}
```

**Response:**
```typescript
{
  success: boolean
}
```

---

#### 11. `waitlistAdmin.updateHomeStatus`

Update status of a homeowner waitlist entry.

**Input:**
```typescript
{
  id: number
  status: enum ['pending', 'approved', 'rejected', 'invited']
  adminNotes?: string (max: 1000 chars)
}
```

**Response:**
```typescript
{
  success: boolean
}
```

---

#### 12. `waitlistAdmin.bulkApproveAll`

Approve all pending entries for a type.

**Input:**
```typescript
{
  type: enum ['pros', 'homes']
}
```

**Response:**
```typescript
{
  success: boolean
  updated: number  // Count of entries approved
}
```

---

#### 13. `waitlistAdmin.activateAndInvite`

Activate a waitlist entry and send invitation email.

**Input:**
```typescript
{
  id: number
  type: enum ['pro', 'home']
  origin?: string (valid URL, default: 'https://prolnk.io')
}
```

**Response:**
```typescript
{
  success: boolean
  email: string
  name: string
}
```

**Side Effects:**
- Updates entry status to 'invited'
- Sends invitation email with activation link
- Links expire in 7 days
- Notifies admin via system

---

## Error Handling

All errors follow this format:

```typescript
{
  code: string  // 'UNAUTHORIZED', 'FORBIDDEN', 'NOT_FOUND', 'CONFLICT', 'BAD_REQUEST', 'INTERNAL_SERVER_ERROR'
  message: string  // User-friendly error message
}
```

---

## Rate Limiting

- **API Rate Limit**: 60 requests per minute per IP address
- **Scan Rate Limit**: 5 requests per 5 minutes per IP address (for photo uploads)
- Headers: `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`

---

## Performance

**Target Performance Metrics:**
- Form submission: <500ms (p95)
- Position calculation: <100ms
- Admin dashboard load: <2s (p95)
- Email delivery: <30 seconds

**Actual Performance** (from load testing):
- Average response time: 245ms
- 95th percentile: 380ms
- 99th percentile: 520ms
- Error rate: 0% under normal load

---

## Webhooks & Integrations

### n8n Webhooks

Triggered automatically on waitlist events:

- `commercialWaitlistJoined`: Commercial contractor signup
  - Data: `email`, `name`, `company`, `phone`

---

## Analytics Procedures

All analytics procedures require authentication with `role === 'admin'`.

#### 14. `analytics.getMetrics`

Get comprehensive waitlist analytics metrics.

**Input:** None

**Response:**
```typescript
{
  totalSignups: number          // Total signups across all sources
  signupsBySource: {            // Breakdown by form source
    pro_waitlist: number
    trustypro_7step: number
    trustypro_simple: number
  }
  averageFormCompletionTime: number  // Average time to complete form (milliseconds)
  referralConversions: number   // Number of referral-sourced signups
  smsOptInRate: number          // Percentage of signups with SMS opt-in
  licenseUploadRate: number     // Percentage of signups with license upload (pro only)
}
```

---

#### 15. `analytics.getConversionFunnels`

Get conversion funnel metrics for each form source.

**Input:** None

**Response:**
```typescript
Array<{
  source: string                    // "pro_waitlist", "trustypro_7step", "trustypro_simple"
  totalVisits: number               // Total form visits/impressions
  completedSignups: number          // Successful form submissions
  abandonedForms: number            // Incomplete form starts
  conversionRate: number            // (completedSignups / totalVisits) * 100
  averageTimeToComplete: number     // Average form completion time (milliseconds)
}>
```

---

#### 16. `analytics.getSignupTrends`

Get daily signup trends for the past N days.

**Input:**
```typescript
{
  days?: number (default: 30, range: 1-365)
}
```

**Response:**
```typescript
Array<{
  date: string        // "YYYY-MM-DD"
  source: string      // "pro_waitlist", "trustypro_7step", "trustypro_simple"
  count: number       // Number of signups on that date
}>
```

**Example Request:**
```bash
curl -X POST https://prolnk.io/api/trpc/analytics.getSignupTrends \
  -H "Authorization: Bearer <session_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "days": 30
  }'
```

---

## Analytics Event Tracking

### Automatically Tracked Events

Every form submission automatically persists an event with:
- Event type: "signup"
- Form source: "pro_waitlist" | "trustypro_7step" | "trustypro_simple"
- User email and optional referral source
- Form completion time in milliseconds
- SMS opt-in and license upload status
- Client IP address and user agent
- Metadata: business name, city, state, project count, etc.

### Event Storage

All analytics events are persisted to database table `analytics_events` with indexes on:
- `eventType` (for filtering)
- `source` (for source breakdown)
- `email` (for user lookup)
- `createdAt` (for date range queries)

---

## Phase 5: Commission Engine & Photo Upload

#### 17. `commissions.calculateCommission`

Calculate estimated commission for a job value.

**Input:**
```typescript
{
  jobValue: number (> 0)
  sourceProTier: string (scout|pro|crew|company|enterprise)
}
```

**Response:**
```typescript
{
  jobValue: number
  platformFee: number
  commissionRate: number
  commission: number
}
```

---

#### 18. `commissions.getEarnings`

Get monthly earnings for a partner.

**Input:**
```typescript
{
  partnerId: number
  period: string (YYYY-MM format)
}
```

**Response:**
```typescript
{
  period: string
  totalEarned: number
  payoutCount: number
  payoutTypes: Array<{ type: string, amount: number }>
}
```

---

#### 19. `commissions.getUplinkChain`

Get referral chain for a pro.

**Input:**
```typescript
{
  proUserId: string
}
```

**Response:**
```typescript
Array<{
  level: number (1=L1, 2=L2, 3=L3)
  uplineUserId: string
  networkLevel: number
}>
```

---

#### 20. `commissions.distributeCommissions`

Distribute commissions to all recipients (admin-only).

**Input:**
```typescript
{
  jobId: string
  sourceProId: string
  jobValue: number
}
```

**Response:**
```typescript
{
  jobCommissionEventId: number
  distributions: Array<{
    recipientUserId: string
    payoutType: string
    amount: number
  }>
  payoutMonth: string
}
```

---

#### 21. `photoUpload.generateUploadUrl`

Generate presigned S3 URL for photo upload.

**Input:**
```typescript
{
  proId: number
  propertyAddress: string (5-500 chars)
}
```

**Response:**
```typescript
{
  uploadUrl: string
  fields: Record<string, string>
  fileKey: string
  expiresIn: number (seconds)
  uploadId: string
}
```

---

#### 22. `photoUpload.submitPhotoForScan`

Submit photo for AI scanning.

**Input:**
```typescript
{
  fileKey: string
  address: string
  proId: number
}
```

**Response:**
```typescript
{
  jobId: string
  status: string (pending)
  message: string
}
```

---

#### 23. `photoUpload.getScanStatus`

Get status of a photo scan job.

**Input:**
```typescript
{
  jobId: string
}
```

**Response:**
```typescript
{
  jobId: string
  status: string (pending|processing|complete|error)
  createdAt: Date
}
```

---

#### 24. `photoUpload.getScanResults`

Get results of completed photo scan.

**Input:**
```typescript
{
  jobId: string
}
```

**Response:**
```typescript
{
  jobId: string
  address: string
  status: string
  results: {
    issues: string[]
    categories: string[]
    confidence: number
  }
  scannedAt: Date
}
```

---

#### 25. `partnerOAuth.getGoogleAuthUrl`

Get Google OAuth redirect URL for partner signup.

**Input:**
```typescript
{
  returnPath: string (optional)
}
```

**Response:**
```typescript
{
  authUrl: string
}
```

---

#### 26. `partnerOAuth.createPartnerProfile`

Create partner profile after OAuth login.

**Input:**
```typescript
{
  googleId: string
  email: string (valid email)
  name: string
  businessName: string
  businessType: string
}
```

**Response:**
```typescript
{
  success: boolean
  profileId: number
  tier: string
  status: string
  referralCode: string (optional)
  trialExpiresAt: Date (optional)
}
```

---

#### 27. `partnerOAuth.getPartnerSignupStatus`

Check partner profile status.

**Input:**
```typescript
{
  email: string (valid email)
}
```

**Response:**
```typescript
{
  exists: boolean
  status: string (not_started|pending|approved)
  tier: string (optional)
  trialStatus: string (optional)
  profileId: number (optional)
}
```

---

#### 28. `partnerOAuth.verifyBusinessEmail`

Verify if email domain qualifies for premium tier.

**Input:**
```typescript
{
  email: string (valid email)
}
```

**Response:**
```typescript
{
  domain: string
  isPremium: boolean
  suggestedTier: string (scout|pro)
}
```

---

## n8n Webhooks

### Lead Qualified
- **Endpoint**: `POST /api/webhooks/n8n/lead-qualified`
- **Headers**: `X-n8n-Signature`, `X-n8n-Timestamp`
- **Payload**: `{ jobId, proId, homeownerId, estimatedValue }`
- **Response**: `{ success: boolean, message: string }`

### Notification Sent
- **Endpoint**: `POST /api/webhooks/n8n/notification-sent`
- **Payload**: `{ notificationType, recipientId, channel, status, metadata }`
- **Response**: `{ success: boolean, message: string }`

### Referral Bonus
- **Endpoint**: `POST /api/webhooks/n8n/referral-bonus`
- **Payload**: `{ referrerId, jobValue, jobId }`
- **Response**: `{ success: boolean, message: string, amount: number }`

---

## Changelog

**v1.0.0** (May 6, 2026)
- Initial production release
- ProLnk Pro waitlist
- TrustyPro homeowner waitlist
- Admin management interface
- Search and export functionality
- Comprehensive logging and analytics

**v1.1.0** (May 6, 2026)
- Analytics event tracking system (database-persisted)
- Admin analytics dashboard with conversion funnels
- Signup trend analysis (7/30/90 day views)
- SMS opt-in and license upload rate tracking
- Sentry error monitoring integration
- Performance metrics dashboard

**v1.2.0** (May 6, 2026)
- Multi-level commission calculation engine
- Commission distribution across referral chain (L1-L3)
- S3 photo upload with presigned URLs
- AI photo scanning job queue
- Google OAuth partner onboarding
- Partner profile creation (scout tier default)
- n8n webhook handlers (lead-qualified, notification-sent, referral-bonus)
- Referral bonus credit system (2% of job value)
