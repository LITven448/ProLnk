# Qualified Property Record — Schema (Item 8.1)
**Why:** operator data-shares (the AMH deal) pay tiered percentages **only on "qualified records."** The software must compute qualification continuously — it gates real money and it's the enforcement mechanism that keeps documentation quality high.

## Definition (contract-grade)
A property record is **QUALIFIED** at a point in time when ALL of:
1. **Roof** — exterior photo set (≥2 angles) within the freshness window
2. **HVAC** — nameplate captured (brand/model legible or OCR-extracted) + unit photo
3. **Water heater** — nameplate + unit photo
4. **Electrical panel** — panel photo (door open, breakers visible)
5. **Interior baseline** — Move-In Shield complete (all rooms) for current occupancy
6. **Freshness** — items 1–5 refreshed within the current tenancy (rentals: re-captured each turn via Move-In Shield; owner homes: within 24 months)
7. **Integrity** — photos passed quality gate (not blurred/black), timestamped, PII-stripped (8.2 pipeline ran)

Partial states are tracked per-system so the operator dashboard can show "what's missing to qualify."

## Schema
```sql
CREATE TABLE record_qualification (
  address_id      CHAR(26) PRIMARY KEY,
  roof_ok         BOOLEAN NOT NULL DEFAULT FALSE,
  hvac_ok         BOOLEAN NOT NULL DEFAULT FALSE,
  water_heater_ok BOOLEAN NOT NULL DEFAULT FALSE,
  panel_ok        BOOLEAN NOT NULL DEFAULT FALSE,
  interior_ok     BOOLEAN NOT NULL DEFAULT FALSE,
  qualified       BOOLEAN GENERATED ALWAYS AS (roof_ok AND hvac_ok AND water_heater_ok AND panel_ok AND interior_ok) STORED,
  qualified_since TIMESTAMP NULL,
  expires_at      TIMESTAMP NULL,          -- freshness horizon; recompute job flips flags when passed
  computed_at     TIMESTAMP NOT NULL
);
CREATE TABLE qualification_events (        -- append-only history: which capture satisfied which slot
  id CHAR(26) PRIMARY KEY, address_id CHAR(26), slot ENUM('roof','hvac','water_heater','panel','interior'),
  media_id CHAR(26), satisfied BOOLEAN, reason VARCHAR(200), at TIMESTAMP
);
```

## Computation rules
- Recompute on: every media ingest for the address, every Move-In Shield completion, nightly freshness sweep
- A tenancy turn RESETS `interior_ok` until the new Move-In Shield completes (rentals) — this is by design: it forces the refresh the data buyers pay for
- Operator monthly statement counts `qualified=TRUE` **days** per address (day-weighted share, not month-end snapshot — prevents gaming month boundaries)

## Tier mapping (contract placeholders)
| Portfolio qualification rate (day-weighted) | Operator data-share tier |
|---|---|
| ≥ [80]% | Full rate [20]% |
| [50–80)% | Mid rate [15]% |
| < [50]% | Base rate [10]% |

## Acceptance tests
1. Address with 4/5 slots → qualified=FALSE; dashboard shows the missing slot
2. Turn event → interior_ok flips FALSE same day; new Shield completion flips TRUE
3. Freshness expiry → nightly job flips slot FALSE; qualification_events row explains why
4. Statement math: 30-day month, qualified days 15 → address counts 0.5 toward portfolio rate
