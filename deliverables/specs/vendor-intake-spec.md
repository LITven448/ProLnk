# Vendor Intake v2 — Operator Program Onboarding Spec

**Scope source:** PLATFORM_MASTER_AUDIT item **1.3** (vendor intake v2: company size, per-individual licenses, property types served, capacity, markets, FSM used) + item **1.4** (pricing: subscriber vs per-work-order fee, **no free tier** — price points still owed by Andrew, shown here as `[SUB_PRICE]` and `[WO_FEE]`).
**Purpose:** onboard service companies into the operator program (e.g., AMH pilot vendor pool) so they can appear in the operator dashboard's vendor picklist. **Fail-closed:** no dispatch until license + insurance + background verification pass (canonical spec §3.5).
**Relation to existing pro onboarding (audit 1.1):** this is a separate, richer flow for operator-program vendors; it does not replace Core/Pro/Business pro signup.

---

## 1. Flow Overview

Multi-step wizard, 8 steps + review/submit. Progress bar, save-and-resume, per-step validation. Steps:

1. Business identity → 2. Company size → 3. Trades & licenses → 4. Insurance → 5. Property types served → 6. Service areas → 7. FSM software → 8. Background check authorization → 9. Plan selection → Review & submit.

---

## 2. Requirements

### R-1.3.1 Business Identity (Step 1)
- **R-1.3.1.1** Fields: legal business name (required), DBA (optional), EIN (required, 9 digits, format `XX-XXXXXXX`, checksum-free format validation only), entity type (required picklist: sole prop / LLC / S-corp / C-corp / partnership), business address, primary contact (name, email, mobile).
- **R-1.3.1.2** W-9 upload: PDF/image, ≤10 MB. Stored encrypted; visible only to admin reviewers.
- **R-1.3.1.3** Payout details: bank account via processor-hosted onboarding (Stripe Connect today; must survive processor migration per audit 5.2 — abstract behind `payout_account_ref`). Raw account numbers are never stored in our DB.
- **R-1.3.1.4** Email verification (magic link) required before Step 2 unlocks; creates the vendor account for save-and-resume.

### R-1.3.2 Company Size (Step 2)
- **R-1.3.2.1** Fields: total technicians (int ≥1), number of crews (int ≥1), jobs/week capacity (int ≥1), years in business (int ≥0).
- **R-1.3.2.2** Sanity checks: crews ≤ technicians; jobs/week capacity ≤ technicians × 40 (soft warn, not block).

### R-1.3.3 Trades & Licenses (Step 3)
- **R-1.3.3.1** Trades multi-select (plumbing, electrical, HVAC, appliance, general handyman, roofing, painting, flooring, landscaping, locksmith, pest, cleaning, other).
- **R-1.3.3.2** Repeatable **per-individual** license entries: person full name, trade, license type (e.g., Journeyman/Master/Contractor per state taxonomy), state, license number, expiry date, license photo/scan upload. Add/edit/remove rows; minimum one entry per selected licensed trade in each state served (unlicensed trades like cleaning exempt per state rules table).
- **R-1.3.3.3** Validation: expiry must be in the future; number format checked per state pattern where known, else free text. Each entry gets status `unverified → verified | rejected` (admin review + state API check where available, audit 1.5).
- **R-1.3.3.4** Individuals listed here seed the company **Briefcase** roster (canonical §3.5); each becomes a ProPass candidate.

### R-1.3.4 Insurance (Step 4)
- **R-1.3.4.1** General Liability COI upload (PDF/image) + carrier, policy number, coverage amount, expiry date.
- **R-1.3.4.2** Workers' comp COI upload + same fields; "exempt" checkbox (sole prop, state-dependent) requires exemption certificate upload instead.
- **R-1.3.4.3** Expiry dates must be future-dated; expiry monitor (audit 1.5) schedules reminders at T-30/T-7 and auto-suspends dispatch eligibility at expiry (fail-closed).

### R-1.3.5 Property Types Served (Step 5)
- **R-1.3.5.1** Single-select: rental portfolios / residential homes / both / commercial. Drives which programs the vendor is routed to; commercial-only vendors are flagged out of the operator resident-request pool.

### R-1.3.6 Service Areas (Step 6)
- **R-1.3.6.1** Markets multi-select (metro picklist, pilot: DFW) + ZIP codes per market (paste list or map-free text entry; validated as real ZIPs within the metro; max 500).

### R-1.3.7 FSM Software (Step 7)
- **R-1.3.7.1** Picklist: Housecall Pro, Jobber, Workiz, Service Fusion, ServiceTitan, other (free text), none. Multi-select allowed. Informational for integration roadmap (audit 6.12); never blocks activation.

### R-1.3.8 Background Check Authorization (Step 8)
- **R-1.3.8.1** For **each dispatched individual** (defaults to the Step-3 roster; individuals can be marked "office-only" to skip): collect legal name, email, and route through the **Checkr-hosted consent flow** (candidate invitation). We store only Checkr candidate/report IDs and status — no SSN or DOB in our systems.
- **R-1.3.8.2** Check cost billed to the vendor (audit 1.5); disclosed before invitation is sent.
- **R-1.3.8.3** Statuses per individual: `not_started → invited → consented → pending → clear | consider | failed`. Only `clear` individuals are dispatchable (ProPass Tier 1, canonical §3.5); `consider` routes to admin adjudication (FCRA adverse-action process applies — pre-adverse/adverse notices via Checkr).
- **R-1.3.8.4** Company submission may proceed with checks pending (see §4), but attestation "I am legally authorized to work in the United States" is collected per individual (work-auth, never citizenship — canonical §3.5).

### R-1.3.9 Plan Selection (Step 9)
- **R-1.3.9.1** Exactly two options, **no free tier**: (a) **Subscription** `[SUB_PRICE]`/mo, unlimited operator work orders; (b) **Per-work-order** `[WO_FEE]` deducted/netted per completed work order (audit 5.4). Radio, required.
- **R-1.3.9.2** Subscription starts billing at **activation**, not at submission. Per-WO vendors add no card at signup; fee nets from payouts.
- **R-1.3.9.3** Plan switchable later (monthly boundary); engine must support both concurrently (audit 1.4).
- **R-1.3.9.4** Price points are 🔶 Andrew's decision; build with config values, no hardcoding.

### R-1.3.10 Save-and-Resume
- **R-1.3.10.1** Every step autosaves on field blur and on Next; application status `draft`. Resume via magic link email; drafts expire after 60 days with T-14/T-3 reminder emails.
- **R-1.3.10.2** Steps are revisitable before submit; completed-step checkmarks in the progress bar. Uploads persist across sessions.

### R-1.3.11 Activation Gating (fail-closed)
- **R-1.3.11.1** **Blocks submission:** steps 1, 2, 5, 6, 9 complete and valid; ≥1 license entry per licensed trade; GL COI uploaded; W-9 uploaded; payout onboarding started.
- **R-1.3.11.2** **Can be pending at submission (status `pending_verification`):** license verification results, insurance COI human review, background check results, payout onboarding completion, workers' comp (if exemption claimed).
- **R-1.3.11.3** **Blocks activation (vendor never appears in operator dispatch picklists until ALL true):** ≥1 individual with verified license per dispatched trade · GL verified & unexpired · workers' comp verified or exemption accepted · ≥1 individual background-`clear` · payout account active · plan selected (and first subscription payment succeeded, if subscription).
- **R-1.3.11.4** Per-individual gating thereafter: only individuals with `clear` background AND (for licensed trades) a verified unexpired license are dispatchable. Company active ≠ everyone dispatchable.
- **R-1.3.11.5** Any lapse (insurance expiry, license expiry, check invalidated) auto-reverts the affected scope (individual or whole company) to non-dispatchable. Never default-open.

### R-1.3.12 Admin Review Queue
- **R-1.3.12.1** Internal queue lists submitted applications with per-item verification checklist (each license, each COI, W-9, each background status) and per-item approve/reject + note.
- **R-1.3.12.2** Rejection of an item notifies the vendor with the reason and reopens just that step for correction (status `needs_correction`); resubmission returns to the queue.
- **R-1.3.12.3** Full approval flips status to `active`, triggers subscription billing start (if applicable) and a welcome email; every reviewer action writes an append-only audit row (who/when/item/decision/note).
- **R-1.3.12.4** SLA surfaced in queue: applications aging >3 business days highlighted.

---

## 3. Application Status Machine

`draft → submitted → pending_verification → active`, with side states `needs_correction` (→ back to `pending_verification` on resubmit), `rejected` (terminal, reason recorded), `suspended` (from `active`, on lapse per R-1.3.11.5, reversible).

---

## 4. Data Model

```
vendors             id, org_program_id, legal_name, dba, ein_enc, entity_type, address JSON,
                    contact JSON, status ENUM(draft,submitted,pending_verification,
                    needs_correction,active,rejected,suspended), plan ENUM(subscription,per_wo),
                    payout_account_ref, fsm_software JSON, property_types ENUM(rental,residential,both,commercial),
                    technicians_ct, crews_ct, jobs_week_capacity, years_in_business,
                    created_at, submitted_at, activated_at
vendor_documents    id, vendor_id, kind ENUM(w9,gl_coi,wc_coi,wc_exemption,license_photo),
                    file_ref, uploaded_at, review_status ENUM(unreviewed,approved,rejected), review_note
vendor_individuals  id, vendor_id, full_name, email, dispatched BOOL, work_auth_attested_at,
                    checkr_candidate_id, checkr_report_id,
                    bg_status ENUM(not_started,invited,consented,pending,clear,consider,failed)
vendor_licenses     id, individual_id, trade, license_type, state, number, expiry_date,
                    document_id, status ENUM(unverified,verified,rejected), verified_at, verified_by
vendor_insurance    id, vendor_id, kind ENUM(gl,wc), carrier, policy_number, coverage_amount,
                    expiry_date, document_id, status ENUM(unverified,verified,rejected)
vendor_service_areas id, vendor_id, market, zips JSON
vendor_trades       vendor_id, trade  (multi-row)
intake_audit_log    id, vendor_id, actor (vendor|admin user id|system), action, item_ref,
                    payload JSON, created_at   -- append-only
```

Dispatch eligibility is computed, not stored: `company_active AND individual.bg_status='clear' AND (trade unlicensed OR has verified unexpired license in job state) AND insurance unexpired`.

---

## 5. Key Validation Summary

| Field | Rule |
|---|---|
| EIN | `^\d{2}-?\d{7}$` |
| Uploads | PDF/JPG/PNG ≤10 MB, virus-scanned |
| License/COI expiry | > today at entry; monitored thereafter |
| ZIPs | valid USPS ZIPs within selected metro, ≤500 |
| Counts | ints, crews ≤ technicians |
| Deny/reject notes | required on any admin rejection |

---

## 6. Analytics Events

`intake_started`, `step_completed {step, elapsed_sec}`, `draft_resumed`, `application_submitted`, `verification_item_decided {item, decision}`, `bg_check_invited/completed {status}`, `vendor_activated {days_from_start, plan}`, `application_rejected {reason}`, `vendor_suspended {cause}` — funnel per audit 10.5.

---

## 7. Open Questions

1. **Biggest:** `[SUB_PRICE]` and `[WO_FEE]` are unset (audit decision #1, Andrew) — pricing UI, billing engine config, and per-WO netting math (audit 5.4) all block on these numbers, and the netting interacts with the processor migration decision (5.2). Need both numbers and the processor pick before Step 9 + activation billing can be finished.
2. Which states' license registries have usable verification APIs for the pilot (TX TDLR/TSBPE?) vs. manual admin verification only?
3. Is workers'-comp exemption acceptable to the pilot operator (AMH may contractually require WC regardless of state exemption)?
