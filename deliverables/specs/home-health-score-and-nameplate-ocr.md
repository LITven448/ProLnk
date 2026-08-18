# Home Health Score Spec (Item 2.3) + Nameplate OCR Spec (Items 2.9/7.4)

## PART A — Home Health Score
**Purpose:** one number per address (0–100) that makes condition legible and progress feel earnable. Sub-scores match the prototype: Completeness, Condition, Maintenance, Safety.

### Formula v1
`score = 0.25·Completeness + 0.35·Condition + 0.25·Maintenance + 0.15·Safety` (weights configurable)

**Completeness (0–100):** documentation coverage — % of expected capture slots filled (rooms, roof, HVAC, water heater, panel, appliances), aligned with the qualified-record schema so one capture feeds both.

**Condition (0–100):** start 100; subtract per open AI finding by severity (emergency −25, soon −10, routine −4; caps: max −60 total, max −30 per system). Resolving a finding (verified completion photo) restores its deduction.

**Maintenance (0–100):** recurring-task recency — % of applicable seasonal/interval tasks (filter change, gutter clear, water-heater flush…) done within window. No history = 50 (neutral), not 0 (don't punish new users).

**Safety (0–100):** start 100; deductions for safety-class findings only (gas, electrical hazard, water intrusion, recalled unit present: −20 each, floor 0). Resolving restores.

### Behavior rules
- **Score must be earnable in session one:** completing add-home + first scan should land a typical decent home in the 60s–70s, visibly rising per action ("+8 pts" toasts). Never show a shame-score below 25 on first scan — floor initial display at 25 with "let's build your baseline" framing.
- Recompute on: media ingest, finding open/resolve, task completion, monthly decay sweep (Maintenance only decays)
- Store every recompute (append-only) → sparkline history; expose `delta_reasons[]` so UI always explains movement
- Renters variant: Completeness/Condition only (Maintenance/Safety are owner-controlled) — displayed as "Documentation strength," not "health," to avoid implying the renter is responsible for the home's condition

### Acceptance tests
1. New home, 0 media → display floor 25, Completeness 0
2. Complete Shield + nameplates → Completeness jumps proportionally; toast reasons emitted
3. Emergency finding opens → Condition −25 & Safety hit if safety-class; resolve restores both
4. Weights config change → historical rows unchanged (recompute forward only)

## PART B — Nameplate OCR Pipeline
**Purpose:** photo of a data plate → structured asset record (brand, model, serial, capacity, install/manufacture year) with zero typing. Feeds asset registry, capex forecasting, warranty checks, recall matching.

### Flow
```
capture (guided close-up UI w/ live blur check) → OCR extraction (vision model, structured prompt)
→ field parser → manufacturer normalization → date decoding → confidence gate → asset record
```

### Output contract (`nameplate.v1`)
```json
{ "contract_version":"nameplate.v1", "asset_type":"water_heater|hvac_condenser|hvac_furnace|dishwasher|range|refrigerator|washer|dryer|garage_opener|other",
  "brand":"...", "model":"...", "serial":"...", "capacity":"40 gal|3.5 ton|...",
  "mfg_date":{"year":2019,"month":6,"method":"serial_decode|plate_printed|estimated"},
  "confidence":0.0, "raw_text":"...", "needs_review":false }
```

### The hard part: serial → manufacture date
Each manufacturer encodes dates differently (Rheem: yy-mm in serial prefix; Carrier: week/year; Whirlpool: letter-coded year…). Build `serial_decoders/` as a per-brand rule table (start with top 12 brands ≈ 90% of installed base: Rheem, AO Smith, Bradford White, Carrier, Trane, Lennox, Goodman, Whirlpool, GE, Samsung, LG, Bosch). Unknown pattern → `method:"estimated"` from model release range, `needs_review:true`.

### Rules
- confidence < 0.7 or missing brand+model → `needs_review:true` → human-QA queue (pilot volume makes this cheap); corrected rows become training/eval data
- Recall matching: nightly job joins (brand, model, serial-range) against CPSC recall feed → recall flag on asset + operator alert (this powers the "96 recalled dishwashers" dashboard moment)
- Eval set: 100 labeled nameplate photos, gates: brand ≥95%, model ≥90%, serial ≥85% exact; same harness pattern as triage contract

### Acceptance tests
1. Clean Rheem plate → full record, decoded date, needs_review=false
2. Glare/partial plate → needs_review=true, raw_text preserved
3. Recalled Bosch model+serial in range → recall flag within 24h
4. QA correction → correction event stored; eval set grows
