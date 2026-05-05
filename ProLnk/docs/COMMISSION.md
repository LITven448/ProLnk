# Network Income System - Complete Specification

## Overview

ProLnk uses a **5-stream commission cascade** that creates powerful economic lock-in. As pros climb the network, they earn from multiple levels, making it economically irrational to leave.

---

## Stream 1: Direct Match Commission (12-70% by Tier)

**Triggered**: When homeowner and pro match on a lead

**Base Revenue**: Homeowner pays per-match fee (model TBD, estimate $25-100)

### Tier Structure

| Tier | Name | Matches | Commission | Example |
|------|------|---------|-----------|---------|
| 1 | Novice | 0-9 | 12% | $100 match fee → $12 commission |
| 2 | Professional | 10-49 | 20% | $100 match fee → $20 commission |
| 3 | Expert | 50-99 | 35% | $100 match fee → $35 commission |
| 4 | Master | 100-499 | 50% | $100 match fee → $50 commission |
| 5 | Elite | 500+ | 70% | $100 match fee → $70 commission |

**Progression**: Tier is cumulative (never goes down), calculated daily

**Database**:
- `partners.tier` (1-5)
- `commissionPayout.payoutType = 'direct_match'`
- `commissionPayout.amount = matchValue * commission_rate`

---

## Stream 2: Pro 4-Level Network Override

**Triggered**: When your directly-recruited pro makes a match (you earn from their earnings)

**Cascading percentages**: Each level is smaller, motivating deeper recruitment

### Commission Structure

| Level | You Receive From | Rate | Depth | Example |
|-------|-----------------|------|-------|---------|
| L1 | Your direct recruits' earnings | 1.0% | Your recruits | Pro A recruits Pro B → you get 1% of B's earnings |
| L2 | Their recruits | 0.5% | Your recruits' recruits | Pro B recruits Pro C → you get 0.5% of C's earnings |
| L3 | Their recruits | 0.25% | 3 levels down | Pro C recruits Pro D → you get 0.25% of D's earnings |
| L4 | Their recruits | 0.10% | 4 levels down | Pro D recruits Pro E → you get 0.10% of E's earnings |

### Example Scenario

You recruit Pro A who recruits Pro B who recruits Pro C who recruits Pro D:

```
Pro A makes $1000 in direct commissions
  → You earn: $1000 × 1.0% = $10 (L1)

Pro B makes $2000 in direct commissions
  → You earn: $2000 × 0.5% = $10 (L2)

Pro C makes $3000 in direct commissions
  → You earn: $3000 × 0.25% = $7.50 (L3)

Pro D makes $4000 in direct commissions
  → You earn: $4000 × 0.10% = $4 (L4)

Total monthly override: $31.50
Annualized: $378
```

**Database**:
- `commissionPayout.payoutType = 'network_l1' | 'network_l2' | 'network_l3' | 'network_l4'`
- `commissionPayout.sourceProUserId` (who you recruited)
- `commissionPayout.recipientUserId` (you)
- Recalculated monthly via n8n trigger

**Calculation Logic**:
```typescript
// Pseudo-code for n8n webhook handler
function calculateNetworkOverride(sourceProId) {
  const allEarnings = getProEarningsThisMonth(sourceProId);
  
  // Get recruiter chain (who recruited source pro)
  const recruiterChain = getRecruiterChain(sourceProId);
  
  // For each recruiter in chain, calculate override
  recruiterChain.forEach((recruiter, level) => {
    const rate = [1.0, 0.5, 0.25, 0.10][level] / 100;
    const override = allEarnings * rate;
    
    createCommissionPayout({
      recipientUserId: recruiter.id,
      sourceProUserId: sourceProId,
      payoutType: `network_l${level + 1}`,
      amount: override,
    });
  });
}
```

**Strategic Impact**:
- Incentivizes recruiting (passive income)
- Network grows faster (exponential growth)
- Creates switching cost (leaving = losing override income)
- Aligns incentives (want recruits to succeed)

---

## Stream 3: Subscription Override (10% Recurring)

**Triggered**: Monthly when you referred pro pays $199/mo subscription

**Duration**: Ongoing as long as pro remains active

### Subscription Fee Breakdown

```
Pro Monthly Subscription: $199
  → ProLnk Platform Fee: $0 (covered by per-match fee)
  → Your Override (10%): $19.90/month
  → Network Finance Reserve: $0 (no reserve, pure profit)
```

**Example Scenario**:

You refer 10 pros → 8 stay active for 1 year:
```
8 active pros × $19.90/month = $159.20/month
$159.20 × 12 months = $1,910.40/year
```

**Database**:
- `subscriptionOverride.proId` (the pro you referred)
- `subscriptionOverride.referrerId` (you)
- `subscriptionOverride.monthlyAmount = $19.90`
- Monthly payout includes this amount

**Calculation Logic**:
```typescript
// Monthly payout processor
function addSubscriptionOverride() {
  const activeProsByReferrer = db
    .select()
    .from(partners)
    .where(eq(partners.referrerId, referrerId));
  
  const overrideAmount = activeProsByReferrer.length * 19.90;
  
  createCommissionPayout({
    recipientUserId: referrerId,
    payoutType: 'subscription_override',
    amount: overrideAmount,
    payoutMonth: getCurrentMonth(),
  });
}
```

**Strategic Impact**:
- Recurring revenue stream (sticky)
- Low friction (passive income)
- Incentivizes pro retention
- Reduces churn incentive

---

## Stream 4: Homeowner Override (Per-Lead Fee)

**Triggered**: When homeowner is referred by you and accepts a match

**Amount**: Negotiable with homeowner (typically $25-50 per lead)

**Timeline**: One-time payment when homeowner uses platform

### Example Scenario

You're a team lead, recruit 20 homeowners:
```
20 homeowners × 2 leads/year average × $25/lead
= 20 × 2 × $25 = $1,000/year

Growth: 100 homeowners × 2 leads/year × $25
= 100 × 2 × $25 = $5,000/year
```

**Database**:
- `opportunities.homeownerId` (who submitted the lead)
- `opportunities.referrerId` (who referred them)
- `commissionPayout.payoutType = 'homeowner_override'`
- Triggers when opportunity matches

**Calculation Logic**:
```typescript
// Triggered when opportunity gets matched
function triggerHomeownerOverride(opportunityId) {
  const opportunity = getOpportunity(opportunityId);
  
  if (!opportunity.referrerId) return; // No override if not referred
  
  const overrideAmount = 25; // Default, can vary
  
  createCommissionPayout({
    recipientUserId: opportunity.referrerId,
    sourceHomeownerId: opportunity.homeownerId,
    payoutType: 'homeowner_override',
    amount: overrideAmount,
  });
}
```

**Strategic Impact**:
- Incentivizes active recruiting
- One-time easy win
- Low-friction revenue
- Encourages pro-to-homeowner recruitment

---

## Stream 5: Home Origination Override (Permanent Revenue)

**Triggered**: When homeowner adds home to Health Vault

**Duration**: Permanent (as long as home is in system)

**Amount**: Share of platform fees attributed to that home (~$2/month per home)

### Example Scenario

You help homeowners digitize their homes:
```
100 homes in vault × $2/month
= $200/month = $2,400/year (PERMANENT)

Growth: 1,000 homes × $2/month
= $2,000/month = $24,000/year (PERMANENT)
```

**Database**:
- `homes.originatorId` (who added the home to vault)
- `homeVaultPayout.homeId` (reference)
- `homeVaultPayout.amount` (monthly share)
- `commissionPayout.payoutType = 'home_origination_override'`

**Calculation Logic**:
```typescript
// Monthly payout processor
function addHomeOriginationOverride(originatorId) {
  const originalHomes = db
    .select()
    .from(homes)
    .where(eq(homes.originatorId, originatorId));
  
  const overrideAmount = originalHomes.length * 2.00;
  
  createCommissionPayout({
    recipientUserId: originatorId,
    payoutType: 'home_origination_override',
    amount: overrideAmount,
    payoutMonth: getCurrentMonth(),
  });
}
```

**Strategic Impact**:
- **CRITICAL**: Creates permanent, passive income (key to lock-in)
- Incentivizes data collection
- Grows with platform scale
- Makes leaving economically irrational

---

## Combined Example: 5-Stream Income

**Scenario**: Pro at Tier 3 (Expert), recruited 5 others, originated 100 homes

### Monthly Income Breakdown

```
Stream 1 - Direct Matches (35% of $500 match value):
  → 10 matches × $500 × 35% = $1,750

Stream 2 - Network Override (1% + 0.5% + 0.25%):
  → Direct recruits earning: $5,000 × 1% = $50
  → Their recruits earning: $3,000 × 0.5% = $15
  → 3rd level earning: $2,000 × 0.25% = $5
  Subtotal: $70

Stream 3 - Subscription Override (10% of $199):
  → 5 active pros × $19.90 = $99.50

Stream 4 - Homeowner Override ($25 per lead):
  → 20 homeowners × 2 leads/year ÷ 12 months = ~3 leads/month
  → 3 leads × $25 = $75

Stream 5 - Home Origination Override ($2 per home):
  → 100 homes × $2 = $200

TOTAL MONTHLY: $1,750 + $70 + $99.50 + $75 + $200 = $2,194.50
ANNUAL: $2,194.50 × 12 = $26,334
```

This creates massive switching cost: leaving = losing all 5 streams.

---

## Tier Advancement Mechanics

**Automatic Progression**: Tiers update daily based on match count (all-time)

```typescript
function updateProTier(proId) {
  const matchCount = getProMatchCount(proId);
  
  let tier = 1;
  if (matchCount >= 500) tier = 5;
  else if (matchCount >= 100) tier = 4;
  else if (matchCount >= 50) tier = 3;
  else if (matchCount >= 10) tier = 2;
  
  updatePartner(proId, { tier });
}
```

**No Tier Reduction**: Once you hit a tier, you never drop down (even if matches decrease)

**Strategic Timing**: Tier can be frozen temporarily for strategic reasons (e.g., new feature launch)

---

## Payout Frequency

**Monthly Payouts**: Every 15th of month
- All 5 streams combined
- Paid via Stripe Connect (default) or ACH
- Minimum payout: $10 (smaller amounts held for next month)

**Payout Timing**:
```
Month: May
Earnings: May 1-31
Calculation: June 1-5
Payout: June 15
```

**Tax Reporting**:
- 1099-NEC filed annually (if > $20K/year)
- Annual summary available to pro
- Quarterly estimates provided

---

## Commission Waterfall Example

When homeowner pays $100 match fee:

```
$100 Match Fee (Homeowner pays)
  ├─ $12 → ProLnk Platform (12%)
  └─ $88 → Pro's Commission (88%)
             ├─ $30.80 → Pro Direct (Stream 1, at Tier 3: 35%)
             └─ $57.20 → Network & Overrides
                  ├─ Network Override to Recruiter (Streams 2-3)
                  ├─ Homeowner Override to Referrer (Stream 4)
                  └─ Home Origination Override to Originator (Stream 5)
```

---

## Safety & Abuse Prevention

**Anti-Collusion**:
- Multiple accounts from same person flagged
- Match between accounts disabled
- Referral bonuses rejected

**Quality Thresholds**:
- Tier advancement: Must maintain >70% match acceptance rate
- Network override: Recruits must stay active (can't farm dead accounts)
- Home origination: Real homes must have matching opportunities

**Fraud Detection**:
- Unusual earning spikes flagged
- Rapid tier advancement reviewed
- Large payouts verified manually

---

## Future Enhancements

**Potential Add-ons** (not in May 6 scope):

1. **Service Quality Multiplier**: Higher tier for high-rated pros (currently 12-70%, could go 15-85%)
2. **Geographic Bonus**: Extra commission for hard-to-reach areas
3. **Seasonal Adjustments**: Winter HVAC work pays more
4. **Performance Ceilings**: Cap earn-outs at certain levels (prevent billionaire problems)
5. **Retention Bonuses**: Extra commission for reaching 1-year, 5-year milestones
