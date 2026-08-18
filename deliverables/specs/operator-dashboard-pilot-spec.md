# TrustyPro Portfolio — Operator Dashboard PILOT Spec (Thin Build)

**Scope source:** PLATFORM_MASTER_AUDIT items **4.1** (thin approval queue) and **4.2** (pilot metrics reporting).
**Explicit non-goal:** this is NOT the full PROMPT_C dashboard. No Overview/Assets/Turns/Compliance/Vendors/Procurement/Reports screens, no auto-approval rules engine (audit item 4.3, P1), no SSO/SAML (item 4.5), no coverage maps, no capex. Two screens, done well, pilot-ready.

**Users:** operator staff at the pilot property org (e.g., regional maintenance manager + property managers).
**Upstream dependency:** resident maintenance request flow (audit 3.4) produces the queue rows; AI triage contract (audit 7.2) produces diagnosis/urgency/cost-band. This spec consumes both; it does not build them.

---

## 1. Screens

### Screen A — Approval Queue
Single table of maintenance requests in `pending_approval` status, plus a right-side detail drawer.

**Table columns**
| Column | Content |
|---|---|
| Request ID | short id, e.g. `REQ-4821` |
| Property | address + unit + city |
| Issue | AI-diagnosed issue + trade, e.g. "Leaking P-trap — Plumbing" |
| Urgency | AI urgency chip: Emergency / Soon / Routine |
| Cost band | AI estimate band, e.g. "$120–180" |
| Age | time since submission, e.g. "2h", "3d" |
| Entry OK | resident permission-to-enter flag (✓ / requires scheduling) |
| Action | opens drawer |

Sortable by age/urgency; default sort: urgency desc, then age desc. Simple status filter (pending / recently actioned). No pagination needed under 100 rows; paginate at 50 if exceeded.

**Detail drawer (opens right)**
1. Resident photo carousel (original uploads, tap to zoom).
2. AI diagnosis card: issue, trade, urgency, cost band, **confidence %**, model/contract version (small print).
3. Property context strip: address, unit, resident name, move-in date, prior requests count.
4. Assignment selector — radio: **In-house crew** (crew picklist) OR **Vendor** (vendor picklist from operator's approved vendor list).
5. Actions: **Approve & Schedule** (primary) · **Deny with reason** (required free-text + reason code picklist: duplicate / resident-caused / not covered by lease / defer / other).

### Screen B — Pilot Scoreboard
Metric cards, each showing **current value vs. a manually-entered baseline** (baseline set once by an approver in a small edit modal; stored, editable, edit-audited).

| Card | Definition |
|---|---|
| Open requests | count in pending/in-progress statuses |
| Median approval time | submission → approve/deny decision, rolling 30 days |
| Cost per completed work order | mean of final work-order cost, completed jobs, pilot-to-date |
| Jobs completed | pilot-to-date count |
| Resident adoption % | activated resident accounts ÷ occupied units in pilot scope |
| Move-In Shield completion rate | new leases with completed Move-In Shield capture ÷ new leases since pilot start |
| Disputes | count of disputed/reopened work orders |

Date-range picker (pilot-to-date default, last 30 days option). **CSV export** button: one file, one row per metric, columns `metric, period, value, baseline, delta`.

---

## 2. Auth & Roles

- Email + password only (bcrypt/argon2 hashing, standard session cookie, 15-min idle timeout). **No SSO in pilot.**
- Two roles: **approver** (queue actions + baseline edits + everything viewer has) and **viewer** (read-only queue + scoreboard + export).
- Accounts created by ProLnk staff seeding (no self-serve invite flow in pilot).

---

## 3. Requirements (numbered)

### R-4.1 Approval Queue
- **R-4.1.1** Queue lists all requests in `pending_approval` for the operator's org, with the 8 columns in §1.
- **R-4.1.2** Drawer shows photos, AI diagnosis with confidence, and property context for the selected request.
- **R-4.1.3** Approve requires an assignment (in-house crew or vendor) before the Approve & Schedule button enables.
- **R-4.1.4** Deny requires a reason code + free text ≥10 chars.
- **R-4.1.5** Approve transitions request to `approved`, creates a work order in the core job lifecycle (audit 1.7), and notifies the resident via the resident app.
- **R-4.1.6** Vendor picklist contains only vendors who are activation-eligible per vendor-intake fail-closed gating (R-1.3.x spec); ineligible vendors never appear.
- **R-4.1.7** Requests are soft-locked while a drawer is open (see edge case E-1); lock expires after 5 min of inactivity.
- **R-4.1.8** Queue auto-refreshes (poll ≤30s or SSE); actioned rows leave the pending view without full-page reload.

### R-4.2 Pilot Scoreboard
- **R-4.2.1** All 7 metric cards computed server-side per §1 definitions; definitions documented in a tooltip on each card.
- **R-4.2.2** Each card shows baseline and delta; baseline is manually entered/edited by approvers only, with an audit row per edit.
- **R-4.2.3** CSV export produces the file described in §1 and logs an analytics event.
- **R-4.2.4** Metrics recompute at least every 15 minutes; card shows "as of" timestamp.

### R-4.3 Auth
- **R-4.3.1** Email/password auth, rate-limited (5 failures → 15-min lockout), passwords ≥12 chars.
- **R-4.3.2** Roles `approver` and `viewer` enforced server-side on every mutation endpoint (viewer mutations → 403).
- **R-4.3.3** 15-minute idle session timeout; re-auth required.

### R-4.4 Audit Trail
- **R-4.4.1** Every approve/deny/baseline-edit writes an **immutable** audit row: actor user id, timestamp (UTC), action, request id, full decision payload (assignment or denial reason), before/after status.
- **R-4.4.2** Audit rows are append-only: no UPDATE/DELETE grants on the table for the app role; corrections are new rows.
- **R-4.4.3** Audit rows for a request are viewable in the drawer (small "history" section) by both roles.

---

## 4. User Stories & Acceptance Criteria

**US-1** As an approver, I review a resident maintenance request and approve it with an assignment so the job gets scheduled.
> **Given** a request in `pending_approval`, **when** I open its drawer, select "In-house crew → Team 4", and click Approve & Schedule, **then** the request becomes `approved`, a work order is created, an audit row is written with my user id and the assignment, and the row leaves the pending queue.

**US-2** As an approver, I deny an out-of-scope request with a documented reason.
> **Given** an open drawer, **when** I click Deny, pick "not covered by lease", and enter a reason, **then** the request becomes `denied`, the resident is notified with the reason, and an audit row records reason code + text. **When** I attempt to deny with empty text, **then** the action is blocked with inline validation.

**US-3** As an approver, I triage fastest-first.
> **Given** a queue with mixed urgencies, **when** it loads, **then** Emergency rows sort above Soon above Routine, ties broken by age descending.

**US-4** As a viewer, I monitor the pilot without being able to change anything.
> **Given** a viewer session, **when** I view the queue and scoreboard, **then** all data renders but Approve/Deny/baseline-edit controls are absent, **and** direct API mutation calls return 403.

**US-5** As an approver, I set baselines so the scoreboard shows deltas.
> **Given** a card with no baseline, **when** I enter baseline "$412 cost/WO" and save, **then** the card shows current vs 412 with a delta, and an audit row records the edit.

**US-6** As a viewer, I export the scoreboard for the weekly pilot email.
> **Given** the scoreboard with a date range selected, **when** I click Export CSV, **then** I download a CSV whose values match the on-screen cards for that range.

---

## 5. API Sketch

Base: `/api/portfolio/v1` (JSON, session-cookie auth, org scoped from session).

```
POST   /auth/login                    {email, password} → session
POST   /auth/logout
GET    /requests?status=pending       → [{id, property, issue, trade, urgency, costBandLow/High, submittedAt, entryPermitted, lock}]
GET    /requests/:id                  → full detail: photos[], aiDiagnosis{issue,trade,urgency,costBand,confidence,contractVersion}, propertyContext, auditTrail[]
POST   /requests/:id/lock             → soft lock (409 if held by another user; returns holder)
DELETE /requests/:id/lock
POST   /requests/:id/approve          {assigneeType: "crew"|"vendor", assigneeId} → 200 | 409 state-conflict
POST   /requests/:id/deny             {reasonCode, reasonText} → 200 | 409 state-conflict
GET    /crews                         → active in-house crews
GET    /vendors?eligible=true         → activation-eligible vendors only
GET    /metrics?from&to               → {metrics: [{key, value, baseline, asOf}]}
PUT    /metrics/:key/baseline         {value} (approver only)
GET    /metrics/export.csv?from&to
GET    /audit?requestId=              (both roles, read-only)
```

Approve/deny are guarded by a state check: mutation allowed only from `pending_approval` (compare-and-swap on status) → concurrent second action returns **409** with the winning decision.

---

## 6. Data Model (additions; core request/job tables exist upstream)

```
users            id, org_id, email, password_hash, role ENUM(approver,viewer), created_at, last_login_at
request_locks    request_id PK, user_id, acquired_at, expires_at
approval_decisions  id, request_id, decided_by, decision ENUM(approved,denied),
                    assignee_type ENUM(crew,vendor) NULL, assignee_id NULL,
                    reason_code NULL, reason_text NULL, decided_at
audit_log        id, org_id, actor_user_id, action, entity_type, entity_id,
                 payload JSON, created_at            -- append-only, no UPDATE/DELETE
metric_baselines key PK(org_id, metric_key), value, unit, set_by, set_at
metric_snapshots id, org_id, metric_key, value, period_start, period_end, computed_at
```

Request status enum (owned upstream, consumed here): `submitted → ai_triaged → pending_approval → approved | denied → scheduled → in_progress → completed → paid → closed`, plus `cancelled_by_resident`.

---

## 7. Edge Cases

- **E-1 Two approvers open the same request.** First open acquires soft lock; second sees a banner "R. Alvarez is viewing" and read-only actions. If both act anyway (lock expired), the status compare-and-swap makes the first write win; the second gets 409 + "Already approved by R. Alvarez at 10:42" and the drawer refreshes. Audit records only the winning decision.
- **E-2 Approval after resident cancels.** If the resident cancels while the drawer is open, approve/deny returns 409 `state-conflict: cancelled_by_resident`; drawer shows "Resident cancelled this request" and the row moves out of pending. No work order is created. Audit records the attempted action as `approve_rejected_cancelled` (attempts on cancelled requests are still logged).
- **E-3** AI triage missing/failed (no diagnosis): row still appears with "Needs manual review" in Issue/Urgency/Cost columns; approve still requires assignment.
- **E-4** Vendor becomes ineligible (insurance lapse) between page load and approve: server re-checks eligibility at approve time → 422 with message; approver picks another assignee.
- **E-5** Zero denominators on scoreboard (no new leases yet): card shows "—" not 0%, with tooltip.
- **E-6** Session expires mid-drawer: action returns 401, client preserves drawer state through re-login.

---

## 8. Analytics Events

All events carry `org_id, user_id, role, ts`.

| Event | Props |
|---|---|
| `queue_viewed` | pending_count |
| `request_drawer_opened` | request_id, urgency, age_hours |
| `request_approved` | request_id, assignee_type, urgency, cost_band, time_in_queue_min, drawer_dwell_sec |
| `request_denied` | request_id, reason_code, time_in_queue_min |
| `decision_conflict` | request_id, losing_action |
| `scoreboard_viewed` | date_range |
| `baseline_edited` | metric_key, old, new |
| `csv_exported` | date_range, metric_count |
| `login_succeeded` / `login_failed` | — |

These feed audit item 10.5 (pilot analytics) — median approval time on the scoreboard is derived server-side, not from these events.

---

## 9. Build Estimate (2-week increments)

| Increment | Deliverable |
|---|---|
| **Weeks 1–2** | Auth + roles, data model + migrations, queue table read path against upstream request store, audit_log write path |
| **Weeks 3–4** | Detail drawer (photos, AI card, context), approve/deny with locking + CAS + notifications, crew/vendor pickers with eligibility check |
| **Weeks 5–6** | Scoreboard: metric computation jobs, baseline entry, CSV export, analytics events, hardening (rate limits, idle timeout), pilot dress rehearsal |

Total: **6 weeks / 3 increments**, one full-stack engineer + part-time reviewer. Assumes upstream 3.4 (resident request flow) and 7.2 (triage contract) land by end of Weeks 1–2; if not, Weeks 3–4 proceed against a stubbed request store.

---

## 10. Open Questions

1. **Biggest:** what exactly does "Schedule" mean at pilot volume — does Approve & Schedule actually book a crew/vendor time slot (needs crew calendars + vendor acceptance flow, neither built), or does it just dispatch and leave scheduling to phone/text? Recommend pilot = dispatch-only, rename button accordingly. Andrew to confirm.
2. Who owns the cost-per-work-order input — is final job cost captured in the platform at completion (job lifecycle `paid`), or invoiced outside and entered manually for the pilot?
3. Does the operator's in-house crew get FieldDoc/pro-app access in the pilot, or do completion photos come back through the vendor path only?
