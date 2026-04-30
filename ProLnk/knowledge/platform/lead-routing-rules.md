# ProLnk Lead Routing Rules

## How Leads Are Created
1. Field tech takes before/after photos during a job
2. Photos enter the AI waterfall (Tier 0-4)
3. AI detects opportunities in the photos
4. Opportunities with admin review status "approved" get dispatched
5. High-confidence opportunities (≥0.85) are auto-approved and instantly dispatched

## Partner Priority Score (PPS)
The PPS (0-105) determines which partner receives a lead first.

### PPS Components
| Signal | Max Points | How It's Calculated |
|--------|-----------|---------------------|
| Tier | 30 | Scout=6, Pro=12, Crew=18, Company=24, Enterprise=30 |
| Close Rate | 20 | % of accepted leads that convert to completed jobs |
| Acceptance Rate | 15 | % of leads accepted vs. declined |
| Photos Uploaded | 15 | Volume of photos uploaded to the platform |
| Review Rating | 10 | Average homeowner rating (0-5 stars) |
| Partner Referrals | 5 | Number of partners recruited to the network |
| Response Speed | 5 | Average hours to accept/decline a lead |
| Founding Bonus | +5 | Applied for founding partners for 12 months |

### PPS Recalculation
- Runs nightly at 2 AM server time
- Partners with no activity for 30+ days have PPS decay applied

## Lead Dispatch Process
1. Opportunity approved (admin or auto-approved)
2. Find partners matching: ZIP code + trade type
3. Rank by PPS score (highest first)
4. Dispatch to #1 ranked partner
5. Partner has 24 hours to accept or decline
6. If no response in 24 hours: auto-expire → route to next partner
7. Routing queue stores up to 5 partners per opportunity

## Lead Acceptance/Decline
- Partner accepts via: Twilio SMS reply "Y", app button, or email link
- Partner declines: lead immediately routes to next in queue
- Partner ignores for 24h: treated as decline, affects acceptance rate

## ZIP Code Matching
- Partner must have the job's ZIP code in their serviceZipCodes array
- Partners without ZIPs set are excluded from routing
- ZIP codes set during onboarding wizard

## Auto-Approval Threshold
- Confidence ≥ 0.85 + source in [companycam, servicetitan, jobber, housecall_pro] + estimated value ≤ $25,000
- These dispatch instantly without admin review
- Lower confidence or manual field app uploads go to admin review queue

## Lead Expiry
- Lead timer starts when dispatched to first partner
- 24-hour window to accept
- Auto-routes to next partner if not accepted
- Opportunity marked "expired" if routing queue exhausted

## Weekly Lead Caps by Tier
- Scout: 5 leads/week
- Pro: 15 leads/week
- Crew: 30 leads/week
- Company: 60 leads/week
- Enterprise: Unlimited
- Caps reset every Monday
