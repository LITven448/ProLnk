# Commission & Payout System

**Last Updated**: 2026-05-23
**Status**: Authoritative — use this doc, not the dev team's README, for commission logic

---

## How Money Flows

```
Homeowner pays for completed job
       ↓
ProLnk Platform Fee: 3%–15% of job value (varies by job type — see table below)
       ↓
Commission Pool: job value minus platform fee
       ↓
Pro's Keep: 40%–72% of commission pool (varies by tier — see tier table below)
       ↓
Remaining Pool: split across network overrides + platform reserve
```

---

## ProLnk Platform Fee by Job Type

ProLnk charges a commission on each completed job. The rate varies based on job category:

| Job Category | Platform Fee | Notes |
|---|---|---|
| Standard residential (plumbing, electrical, HVAC, etc.) | 8% | Default category |
| Emergency/urgent dispatch | 12% | Higher due to priority routing |
| Specialty/complex (roofing, foundation, solar) | 10% | |
| Commercial jobs (via ProLnk Exchange) | 5% | Lower rate for higher job values |
| Recurring/contract work | 3% | Loyalty rate for long-term contracts |
| Premium/concierge placement | 15% | White-glove matching, admin-assisted |

**Range**: 3%–15% of job value
**Note**: Exact rates per category are TBD and subject to market adjustment. This table is a working draft — confirm final rates with the team before building the fee calculation engine.

---

## Pro Commission Keep Rates (Tier Structure)

Pros keep a percentage of the **commission pool** (job value minus platform fee). Keep rate increases with tier.

| Tier | Name | Keep Rate | Advancement Threshold |
|------|------|-----------|----------------------|
| 1 | Scout | 40% | Starting tier |
| 2 | TBD | TBD | TBD |
| 3 | TBD | TBD | TBD |
| 4 | TBD | TBD | TBD |
| 5 | Enterprise | **72% (max)** | Top tier |

**Important**: The intermediate tier names, thresholds, and exact percentages between Scout (40%) and Enterprise (72%) are not yet finalized. Dev team must get confirmation on the full tier table before building tier-advancement logic.

**Tier advancement is based on**: cumulative completed job volume (exact threshold TBD — volume in dollars or number of jobs, never drops once earned)

---

## Example: Full Commission Calculation

**Scenario**: Standard residential plumbing job, $1,000 job value, Pro at Enterprise tier (72%)

```
Job Value:               $1,000.00
ProLnk Platform Fee:     - $80.00  (8% of job)
                         ---------
Commission Pool:          $920.00

Pro Keep (72%):          + $662.40  (72% of $920)
Network Overrides:         $257.60  (28% of $920 — distributed below)
```

---

## Network Cascade (4-Level Override)

When a pro earns commission, their recruiter chain earns override income from that commission:

| Level | Relationship | Override Rate | Example |
|-------|-------------|---------------|---------|
| L1 | Your direct recruit | 7% of their commission | Pro A earns $662 → you get $46.34 |
| L2 | Their recruit | 4% of their commission | Pro B earns $662 → you get $26.48 |
| L3 | Their recruit's recruit | 2% of their commission | Pro C earns $662 → you get $13.24 |
| L4 | 4 levels down | 1% of their commission | Pro D earns $662 → you get $6.62 |

**Cascade is on the pro's commission keep** (not the full job value).

### Network Override Example

You recruit Pro A, who recruits Pro B, who recruits Pro C, who recruits Pro D. All are Enterprise tier (72% keep) on a $1,000 standard job:

```
Each pro's commission keep: $662.40

Your L1 override (Pro A): $662.40 × 7%  = $46.37/job
Your L2 override (Pro B): $662.40 × 4%  = $26.50/job
Your L3 override (Pro C): $662.40 × 2%  = $13.25/job
Your L4 override (Pro D): $662.40 × 1%  =  $6.62/job

Total override per job cycle: $92.74
```

---

## 5 Income Streams

### Stream 1: Direct Job Commission
- **What**: Pro earns their tier keep rate on every completed job
- **Amount**: 40%–72% of commission pool (job value minus platform fee)
- **Trigger**: Job marked complete + payment confirmed

### Stream 2: Network Override (4 Levels)
- **What**: Passive income from your recruited pros' earnings
- **Amount**: 7% / 4% / 2% / 1% of each recruited pro's commission
- **Trigger**: Any job completed by someone in your downline (up to 4 levels)
- **Calculation**: Monthly aggregate, paid on the 15th

### Stream 3: Subscription Override (Recurring)
- **What**: Monthly passive income for every active pro you referred
- **Amount**: 10% of the referred pro's monthly subscription fee
- **Duration**: Ongoing while referred pro remains active

**Subscription Tiers**:

| Tier | Monthly Price | Your Override (10%) |
|------|--------------|---------------------|
| Starter | $79/month | $7.90/month per referral |
| Professional | $149/month | $14.90/month per referral |
| Elite | $249/month | $24.90/month per referral |

**Example**: 10 active referrals at mixed tiers (3 Starter, 5 Professional, 2 Elite):
```
3 × $7.90  = $23.70
5 × $14.90 = $74.50
2 × $24.90 = $49.80
Total: $148.00/month recurring
```

### Stream 4: Homeowner Override (Per Lead)
- **What**: One-time payment when a homeowner you referred accepts a match
- **Amount**: ~$25 per lead (configurable)
- **Trigger**: Referred homeowner's opportunity is matched and accepted

### Stream 5: Home Origination Override (Permanent)
- **What**: Monthly passive income for every home you added to the Home Health Vault
- **Amount**: ~$2/month per home (as long as home remains in system)
- **Duration**: Permanent — creates long-term passive income

---

## Combined Example: 5-Stream Monthly Income

**Scenario**: Enterprise-tier Pro, 5 direct recruits, referred 20 homeowners, originated 100 homes in Vault

```
Stream 1 — Direct Jobs (72% keep on $5,000 monthly job value, 8% platform fee):
  $5,000 - $400 (8%) = $4,600 pool × 72% = $3,312.00

Stream 2 — Network Overrides:
  L1 recruits earn $3,000 combined → $3,000 × 7% = $210.00
  L2 recruits earn $2,000 combined → $2,000 × 4% =  $80.00
  L3 recruits earn $1,000 combined → $1,000 × 2% =  $20.00
  L4 recruits earn $500 combined  →  $500  × 1% =   $5.00
  Subtotal: $315.00

Stream 3 — Subscription Override (assumed Professional tier):
  5 active referrals × 10% of $149 = 5 × $14.90 = $74.50

Stream 4 — Homeowner Override:
  20 homeowners × avg 2 jobs/year ÷ 12 months ≈ 3.3 jobs/month × $25 = $82.50

Stream 5 — Home Origination:
  100 homes × $2/month = $200.00

TOTAL MONTHLY: $3,312 + $315 + $74.50 + $82.50 + $200 = $3,984.00
ANNUAL: ~$47,808
```

---

## Payout Schedule

- **Frequency**: Monthly, paid on the 15th of each following month
- **Earnings window**: 1st–last day of month
- **Calculation window**: 1st–5th of following month
- **Minimum payout**: $10 (smaller amounts held)
- **Payment method**: Stripe Connect (default), ACH
- **Tax**: 1099-NEC filed annually for payouts > $20K/year

---

## Subscription Tiers

| Tier | Price | Commission Keep Starts | Key Differentiators |
|------|-------|----------------------|---------------------|
| **Scout** | $99/mo | 40% | 1 seat (+$25/seat/mo), standard queue, Exchange access |
| **Crew** | $149/mo | 55% | 3 seats (+$20/seat/mo), priority queue, Exchange, PhotoScan AI, Storm alerts |
| **Company** | $249/mo | 65% | 8 seats (+$15/seat/mo), top queue, analytics, company branding |
| **Enterprise** | Custom | Negotiated | Custom seat packages (9+), API, dedicated account manager, SLA |

**Founding members**: Locked at $149/mo (Crew price) with 72% commission keep from day one — permanently. They also get all Crew + Company features.

**Commission keep progression**: Regardless of subscription tier, a pro's keep rate grows automatically as they complete more jobs (Scout 40% → Enterprise 72%). The subscription tier sets the *floor* — higher tiers start at a higher floor.

**ProLnk Exchange access**: Crew, Company, and Enterprise tiers. Not available on Pro.

---

## Commission by Brand

| Brand | Commission Model | Notes |
|-------|-----------------|-------|
| ProLnk (core) | 3%–15% platform fee + tier keep + cascade | Primary model |
| ProLnk Exchange | 5% on commercial jobs | Lower rate, higher job values |
| TrustyPro | Same backend model — consumer request routes to ProLnk pros | |
| TrustyPro Commercial | 3% recurring contract rate | Long-term relationship pricing |
| ProLnk Media | Ad revenue — separate CPM/CPC model | No job commission |
| LNKD | Affiliate commission passthrough | ProLnk earns % of affiliate fee |

---

## Open Items (Must Resolve Before Building Payout Engine)

1. **Tier table**: Full breakdown of tiers between Scout (40%) and Enterprise (72%) — names, thresholds, percentages.
2. **Platform fee table**: Exact rates per job category, confirmed.
3. **Override calculation basis**: Cascade is on pro's commission keep — confirm this is correct (not on gross job value).
4. **ProLnk Exchange commission rules**: How do commercial job commissions interact with the cascade? Does network override apply to Exchange jobs?
5. **Which subscription tier unlocks which features?** Document what Starter ($79) vs. Professional ($149) vs. Elite ($249) includes so the dev team can build the subscription gate logic.

---

## Fraud & Abuse Prevention

- Multiple accounts from same person: flagged and commissions frozen
- Match between affiliated accounts: disabled
- Unusual earning spikes: flagged for manual review
- Rapid tier advancement: reviewed by admin
- Network override requires recruit to be genuinely active (minimum job volume TBD)
