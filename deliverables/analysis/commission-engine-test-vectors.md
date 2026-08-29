# Commission Engine — Canonical Test Vectors (Item 5.1)
**Purpose:** the dev team runs these against the rebuild's `commissionCascadeEngine` before ANY payout runs. Every vector must pass exactly. Source of truth: PROLNK_CANONICAL_SPEC.md §3.3.

## Canonical rules under test
1. `platform_fee = job_value × fee_rate`, fee_rate clamped to [6%, 15%]
2. Network override paid to completing pro's upline **as % of the PLATFORM FEE** (never of the pro's earnings): L1 7% · L2 4% · L3 2% · L4 1%
3. Home-origination override: **5% of platform fee**, perpetual, to the pro/channel that originated the home
4. ProLnk floor: platform retains **≥ 20% of the platform fee**; cascade levels are skipped (deepest level first) if paying them would breach the floor
5. Founding-network keep rate = 60% (pro's share of commission pool) — never a public 72%
6. Operator (AMH-type) shares are a SEPARATE ledger (subs/commerce/move-out/data) and must NEVER be computed inside this cascade

## Test vectors

### V1 — Baseline: full 4-level upline + origination
- job_value $1,000 · fee_rate 8% → platform_fee **$80.00**
- Origination (5%): **$4.00** · L1 (7%): $5.60 · L2 (4%): $3.20 · L3 (2%): $1.60 · L4 (1%): $0.80
- Total distributed: $15.20 (19% of fee) · Platform retains: **$64.80 (81%)** ✓ floor OK

### V2 — Fee-rate clamping (low)
- job_value $500 · requested fee_rate 3% → clamp to **6%** → platform_fee $30.00
- FAIL CONDITION: engine using 3% ($15.00 fee) = clamping not implemented

### V3 — Fee-rate clamping (high)
- job_value $2,000 · requested fee_rate 20% → clamp to **15%** → platform_fee $300.00

### V4 — No upline, no origination
- platform_fee $80 · no origination record, pro has no upline → distributions $0 · platform retains $80 (100%)
- FAIL CONDITION: engine paying "house" overrides to nobody / dangling ledger rows

### V5 — Partial upline (L1, L2 only)
- platform_fee $100 · origination $5 + L1 $7 + L2 $4 = $16 out; L3/L4 rows MUST NOT exist (no rollup of missing levels to existing ones)

### V6 — THE CRITICAL ONE: cascade base = platform fee, not pro earnings
- job_value $1,000 · fee 8% → fee $80 · commission pool $80 · pro keep (founding 60%) = $48
- CORRECT L1 = 7% × **$80** = **$5.60**
- WRONG (old build behavior): 7% × $48 = $3.36 — if the engine outputs $3.36, the base is wrong. This single check catches the known historical discrepancy.

### V7 — Floor protection triggers
- job_value $100 · fee 6% → platform_fee $6.00 · floor = $1.20 minimum retained
- Full stack would distribute: orig $0.30 + L1 $0.42 + L2 $0.24 + L3 $0.12 + L4 $0.06 = $1.14 → retains $4.86 ✓ no skip needed
- Now with a hypothetical added 70% promotional override ($4.20): total would leave $0.66 < $1.20 floor → engine must SKIP from the deepest level up until floor holds, and log which levels were skipped
- FAIL CONDITION: floor breached, or skipping starts from L1 instead of deepest

### V8 — Origination is perpetual across ownership/tenant change
- Same home, new owner account, job 2 years later → origination STILL pays the original originating party (address-keyed, not account-keyed)

### V9 — Channel-partner origination (Patrick model)
- Home originated by channel partner (not a pro): origination 5% routes to channel ledger; pro-origination override 7% only on jobs completed by pros that channel onboarded; NO subscription share exists for the channel
- FAIL CONDITION: channel receiving subscription-revenue shares

### V10 — Operator separation
- Job at an operator-program home: cascade runs normally on the platform fee; operator's revenue share must NOT appear as a cascade level — it accrues in the separate operator ledger (5.5). Run V1 at an operator home and assert identical cascade output.

### V11 — Rounding & reconciliation
- Every split rounds half-up to cents; sum(distributions) + platform_retained == platform_fee EXACTLY, per job, every time. Property-based test: 10,000 random (job_value, fee_rate, upline-depth) triples, assert the identity holds.

### V12 — Per-work-order vendor fee (new model, 5.4)
- Operator work order completed: **$3 work-order fee billed to the OPERATOR** (never netted from the vendor's payout), recorded as platform revenue, NOT part of the cascade base. The vendor's payout is unreduced.

## Sign-off protocol
Engine passes when: V1–V12 green in CI, the V11 property test runs 10k cases clean, and a dry-run payout over one week of staging data reconciles to the penny. Only then does real money move.
