# Commission Model — CANONICAL (matches PROLNK_CANONICAL_SPEC + live commissionCascadeEngine.ts)

**Last Updated:** 2026-07-08
**Status:** Authoritative. The previous version of this file described a 40–72% earned-tier ladder — that model is **retired and banned** (72% must never appear publicly). Keep rates come from the purchased subscription tier, not an earned ladder.

## The one-paragraph version
Every job pays a **platform fee of 6–15% of job value** (rate clamped in code). Out of that fee:
the **completing pro keeps their tier's share** — **Core 40% · Pro 50% · Business/Enterprise 60%**
(founding-network members: 60%). The remainder funds the network cascade, origination, and ProLnk's
floor. **ProLnk always retains ≥ 20% of the platform fee** — the cascade skips levels rather than
breach the floor.

## Rates (of the PLATFORM FEE, never of job value)
| Stream | L1 | L2 | L3 | L4 |
|---|---|---|---|---|
| Network job override (upline of completing pro) | 7% | 4% | 2% | 1% |
| Subscription override (on recruits' monthly subs) | 12% | 6% | 3% | 1.5% |

- **Home origination:** 5% of the platform fee, perpetual, to the pro/Scout who first documented the home.
- **ProLnk floor:** ≥ 20% of the platform fee, always.

## Subscription tiers (purchased — these set price + keep rate)
| Tier | Price | Keep rate |
|---|---|---|
| Core | $99/mo | 40% |
| Pro | $149/mo | 50% |
| Business | $249/mo | 60% |
| Enterprise | custom | 60% |
| **Scout** | **$99/mo standalone · $49/mo add-on** for existing pro members | n/a (field-agent program; earns origination) |

## Worked example — $1,000 job, 10% fee, completing pro on Business (60%)
```
Platform fee:            $100.00
Completing pro (60%):     $60.00
Upline L1 (7%):            $7.00
Upline L2 (4%):            $4.00
Upline L3 (2%):            $2.00
Upline L4 (1%):            $1.00
Origination (5%):          $5.00
ProLnk retains:           $21.00  (≥20% floor ✓)
```
If paying every level would push ProLnk below 20%, the engine skips the deepest levels first.

## Network position ≠ subscription tier
Charter/Founding/L3/L4 (capacities 25/100/400/1,600) govern **network-income eligibility/depth only**
and are **internal — never shown publicly**. Price + keep rate come solely from the subscription tier.
Founding-network members pay $149/mo locked and keep 60%.

## Retired concepts (do not rebuild)
- 40–72% earned tier ladder ("Scout→Enterprise tiers") — gone.
- 3–12% platform fee range — canonical is 6–15%.
- ProLnk Exchange as a current product — shelved; repositioned as the future COMMERCIAL marketplace. Scout handles large home projects.
