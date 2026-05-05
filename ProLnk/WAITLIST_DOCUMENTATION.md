# ProLnk Waitlist System Documentation

## Overview

ProLnk operates three distinct waitlist systems for capturing and managing demand:

1. **ProLnk Professional Waitlist** - Contractors and service professionals
2. **TrustyPro 7-Step Homeowner Waitlist** - Comprehensive intake form for homeowners
3. **TrustyPro Simple Waitlist** - Quick email capture for early adopters

## Architecture

```
Client (React) → tRPC Procedures → Server (Express) → Database (TiDB MySQL)
                                   ↓
                            Email Service (Resend)
                            Analytics Tracking
                            Logging Service
```

## API Endpoints

### Professional Waitlist

**Procedure**: `trpc.waitlist.joinProWaitlist`  
**Method**: Mutation  
**Route**: `/pro-waitlist`

#### Input Schema
```typescript
{
  firstName: string (1-100 chars)
  lastName: string (1-100 chars)
  email: string (valid email)
  phone: string (7-30 chars)
  businessName: string (1-255 chars)
  businessType: string (1-100 chars)
  yearsInBusiness: number (0-100)
  employeeCount: string
  estimatedJobsPerMonth: number (0+)
  avgJobValue: string
  trades: string[] (at least 1)
  primaryCity: string (1-100 chars)
  primaryState: string (1-50 chars)
  serviceZipCodes: string
  serviceRadiusMiles: number (1-500, default 25)
  currentSoftware: string[]
  otherSoftware?: string (max 255 chars)
  referralsGivenPerMonth: string
  referralsReceivedPerMonth: string
  currentReferralMethod?: string
  primaryGoal: string (1-100 chars)
  hearAboutUs?: string
  additionalNotes?: string (max 2000 chars)
  customTradeDescription?: string (max 500 chars)
  licenseFileUrl?: string (max 1000 chars)
  licenseFileName?: string (max 255 chars)
  smsOptIn: boolean (default false)
  referralCode?: string (max 100 chars) - Referral code if referred
}
```

#### Response
```typescript
{
  success: boolean
  position: number // User's position in the waitlist
}
```

#### Database Record
Inserted into `proWaitlist` table with all fields plus:
- `referredBy`: varchar(100) - Referral code that referred this signup
- `createdAt`: timestamp
- Auto-incremented `id`

---

### Homeowner Waitlist (7-Step Form)

**Procedure**: `trpc.trustyPro.submitRequest`  
**Method**: Mutation  
**Route**: `/pro/waitlist`

#### Step Structure
1. **Contact Info** - Name, email, phone
2. **Communication Preferences** - Email/SMS/push/marketing/data use consents
3. **Property Basics** - Address, type, year built, sq footage, lot size
4. **Home Condition** - Overall condition, years owned, recent improvements
5. **Home Systems** - Roof, HVAC, plumbing, electrical, foundation, insulation, windows, doors
6. **Projects & Goals** - Desired projects, timeline, budget, pain points
7. **Referral Source** - How they heard about us, additional notes

#### Input Schema (Complete)
```typescript
{
  // Step 1: Contact
  firstName: string (1-100)
  lastName: string (1-100)
  email: string (email)
  phone?: string (max 30)
  
  // Step 2: Communication
  consentTerms: boolean (default false)
  consentEmail: boolean (default false)
  consentSms: boolean (default false)
  consentPush: boolean (default false)
  consentMarketing: boolean (default false)
  consentDataUse: boolean (default false)
  preferredContact?: string (max 20)
  
  // Step 3: Property Basics
  address: string (1-500)
  city: string (1-100)
  state: string (1-50)
  zipCode: string (5-10)
  homeType: 'single_family'|'townhouse'|'condo'|'multi_family'|'mobile'
  yearBuilt?: number (1800-2030)
  squareFootage?: number (100-50000)
  lotSizeSqFt?: number (0+)
  bedrooms?: number (0-20)
  bathrooms?: string (max 10)
  stories?: number (1-10)
  garageSpaces?: number (0-10)
  
  // Step 4: Condition
  ownershipStatus: 'own'|'rent'
  ownershipType: 'primary_residence'|'rental'|'company_owned'
  isRental: boolean
  yearsOwned?: number (0+)
  overallCondition?: 'excellent'|'good'|'fair'|'needs_work'
  recentImprovements?: string[]
  
  // Step 5: Home Systems
  hasPool: boolean
  hasBasement: boolean
  hasAttic: boolean
  homeSystems?: Record<string, string> // e.g., {roof: "asphalt_good", hvac: "10_years_old"}
  
  // Step 6: Projects
  desiredProjects: string[] (at least 1)
  projectTimeline: 'asap'|'3_months'|'6_months'|'1_year'|'just_exploring'
  estimatedBudget?: string
  primaryPainPoint?: string (max 255)
  
  // Step 7: Referral
  hearAboutUs?: string
  additionalNotes?: string (max 2000)
}
```

#### Response
```typescript
{
  success: boolean
  position: number // User's position in the queue
}
```

---

### Simple TrustyPro Waitlist

**Procedure**: `trpc.trustyPro.joinWaitlist`  
**Method**: Mutation  
**Route**: `/trustypro/waitlist`

#### Input Schema
```typescript
{
  name: string (1-100)
  email: string (valid email)
}
```

#### Response
```typescript
{
  success: boolean
  position: number
}
```

---

## Position Counter System

### How It Works
1. When a user submits a form, the server calculates `COUNT(*) FROM [waitlist_table]`
2. This count is included in the API response
3. Frontend displays position with messaging: "Position #42 — You're #42 in the queue"
4. Position is included in confirmation email for gamification/FOMO effect

### Implementation
```typescript
// Server-side (e.g., in joinProWaitlist)
const proCountResult = await (db as any).execute(sql`SELECT COUNT(*) as cnt FROM proWaitlist`);
const proPosition = Number((proCountResult?.rows?.[0] as any)?.cnt ?? 1);
return { success: true, position: proPosition };
```

```typescript
// Client-side display
{join.data && (
  <div className="bg-[#F5E642]/20 border border-[#F5E642] rounded-lg px-4 py-3">
    <p className="text-lg font-bold">Position: #{join.data.position}</p>
    <p className="text-sm text-gray-600 mt-1">You're #{join.data.position} in the ProLnk network</p>
  </div>
)}
```

---

## Referral System

### How It Works
1. ProLnk generates shareable referral links: `prolnk.io/pro-waitlist?ref=BASE64ENCODED`
2. When someone clicks a referral link and signs up, the `ref` parameter is captured
3. The referral code is stored in the `referredBy` field of the signup record
4. Referrals are tracked in analytics for conversion metrics

### Implementation
```typescript
// Client: Capture URL parameter
const inboundRefCode = new URLSearchParams(window.location.search).get("ref");

// Client: Send in signup
trpc.joinProWaitlist.mutate({
  // ... other fields
  referralCode: inboundRefCode || undefined
});

// Server: Store in database
sql`INSERT INTO proWaitlist (..., referredBy) VALUES (..., ${input.referralCode ?? null})`
```

### Referral Link Generation
```typescript
// On success screen
const referralLink = `${window.location.origin}/pro-waitlist?ref=${btoa(email)}`;
```

---

## Email Confirmations

### Pro Waitlist Confirmation
```
To: [signup email]
Subject: Welcome to ProLnk Founding Network!

Your Position: #42
Tier: [Scout|Pro|Crew|Company|Enterprise]
Trades: Plumbing, HVAC, Electrical
City: Dallas, TX

[Share your referral link]
[View your dashboard]
[Join TrustyPro]
```

### Homeowner Confirmation
```
To: [homeowner email]
Subject: Your TrustyPro Request Received

Your Position: #128
Next Steps: We'll review your property details and connect you with qualified contractors

[Track your request status]
[View similar projects]
```

---

## Admin Dashboard

### Location
`/admin/waitlist` - Admin-only route

### Features
- View all waitlist signups (Pro + TrustyPro)
- Search by name, email, or business
- Filter by source (Pro, TrustyPro 7-step, etc.)
- Sort by newest, oldest, or position
- Export to CSV
- View key metrics:
  - Total signups
  - Signups by source
  - Referral rate
  - Conversion rate

### Admin API Procedures
```typescript
trpc.waitlistAdmin.getProWaitlist.query()
trpc.waitlistAdmin.getHomeWaitlist.query()
trpc.waitlistAdmin.getWaitlistMetrics.query()
trpc.waitlistAdmin.searchWaitlist.query({ query, source })
trpc.waitlistAdmin.exportWaitlist.query({ source })
trpc.waitlistAdmin.getSignupTrends.query()
```

---

## Analytics & Logging

### Events Tracked
- Signup completion (source, tier, duration)
- Referral clicks
- Form abandonment
- Errors and exceptions

### Log Levels
- **DEBUG**: Form interactions, performance timing
- **INFO**: Successful signups, email sent
- **WARN**: Retryable errors, soft failures
- **ERROR**: Critical failures, email failures, DB errors

### Example Log Entry
```json
{
  "timestamp": "2026-05-06T10:30:45.123Z",
  "level": "info",
  "service": "waitlist",
  "message": "New ProLnk Pro signup",
  "context": {
    "email": "john@example.com",
    "businessName": "Acme Plumbing",
    "position": 42,
    "referredBy": "abc123def"
  },
  "durationMs": 245
}
```

---

## Error Handling

### Duplicate Email
```
Error Code: CONFLICT
Message: "This email is already on the waitlist."
HTTP Status: 409
```

### Database Unavailable
```
Error Code: INTERNAL_SERVER_ERROR
Message: "Database unavailable"
HTTP Status: 500
```

### Validation Errors
Invalid fields are caught by Zod schema and return:
```
Error Code: BAD_REQUEST
Details: List of validation errors
HTTP Status: 400
```

---

## Database Schema

### proWaitlist Table
```sql
CREATE TABLE proWaitlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(30),
  businessName VARCHAR(255),
  businessType VARCHAR(100),
  yearsInBusiness INT,
  employeeCount VARCHAR(50),
  estimatedJobsPerMonth INT,
  avgJobValue VARCHAR(50),
  trades JSON,
  customTradeDescription VARCHAR(500),
  licenseFileUrl VARCHAR(1000),
  licenseFileName VARCHAR(255),
  smsOptIn BOOLEAN DEFAULT FALSE,
  primaryCity VARCHAR(100),
  primaryState VARCHAR(50),
  serviceZipCodes VARCHAR(500),
  serviceRadiusMiles INT DEFAULT 25,
  currentSoftware JSON,
  otherSoftware VARCHAR(255),
  referralsGivenPerMonth VARCHAR(50),
  referralsReceivedPerMonth VARCHAR(50),
  currentReferralMethod VARCHAR(255),
  primaryGoal VARCHAR(100),
  hearAboutUs VARCHAR(255),
  additionalNotes TEXT,
  referredBy VARCHAR(100), -- Referral tracking
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### homeWaitlist Table
```sql
CREATE TABLE homeWaitlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(30),
  address VARCHAR(500),
  city VARCHAR(100),
  state VARCHAR(50),
  zipCode VARCHAR(10),
  homeType ENUM('single_family','townhouse','condo','multi_family','mobile'),
  yearBuilt INT,
  squareFootage INT,
  -- ... 30+ additional columns for all form fields
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## Testing

Run test suite:
```bash
npm run test -- waitlist.test.ts
```

Test coverage includes:
- Schema validation
- Email validation
- Duplicate handling
- Position calculation
- Referral tracking
- Error scenarios
- Data validation ranges

---

## Deployment

### Production Credentials Required
```
DATABASE_URL=mysql://user:password@gateway01.us-east-1.prod.aws.tidbcloud.com:4000/prolnk_production
RESEND_API_KEY=re_xxxxx (Email service)
NODE_ENV=production
APP_BASE_URL=https://prolnk.io
```

### Deployment Steps
1. Update `.env` with production credentials
2. Run: `git push origin main`
3. Railway auto-deploys
4. Visit `/setup` to initialize database schema
5. Test all three waitlist forms

---

## Troubleshooting

### "Email already on waitlist"
User already signed up. Recommend sign-in to view dashboard instead.

### "Database unavailable"
Check DATABASE_URL in .env. Verify TiDB Cloud instance is online.

### Position not displaying
Ensure response includes `position` field. Check network tab for API response.

### Emails not arriving
Verify RESEND_API_KEY is valid. Check spam folder. Review Resend dashboard for failures.

---

## Performance

### Expected Load Times
- Form submission: < 1 second
- Position calculation: < 100ms
- Email send: Fire-and-forget (async)
- Admin dashboard load: < 2 seconds

### Scaling Notes
- TiDB auto-scales. No manual limits for 10K+ signups
- Position COUNT(*) remains fast with index on createdAt
- Consider caching position metrics after 1000s of signups

---

## Future Enhancements

### Phase 2
- Commission calculation engine
- n8n webhook automations
- Photo scanning with AI
- Partner dashboard
- Referral network visualization

### Phase 3
- SMS notifications
- Push notifications
- ML-driven lead scoring
- Automated tier upgrades

