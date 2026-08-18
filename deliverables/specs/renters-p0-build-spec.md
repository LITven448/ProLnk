# TrustyPro Renters — P0 Engineering Build Specification (Rental-Operator Pilot)

**Version:** 1.0 · **Date:** 2026-08-17 · **Owner:** Andrew Frakes
**Audience:** Engineering (~3-person team), 8–12 week build
**Sources of truth:** `PROLNK_CANONICAL_SPEC.md` (platform), `PROMPT_A_TRUSTYPRO_RESIDENT.md` (design), `PLATFORM_MASTER_AUDIT.md` §3 (scope)
**Requirement IDs:** `R-3.<audit-item>.<seq>` — reference these in PR titles/descriptions (e.g., `feat(shield): R-3.3.4 resumable upload`).

---

## 0 · Scope, assumptions, and integration contract

### 0.1 In scope (pilot P0)

| Audit # | Feature | Section |
|---|---|---|
| 3.1 | Org invitation flow, resident account creation, address confirm | §1 |
| 3.2 | Resident-mode gating (no prices, no vendor names, no marketplace) | §2 |
| 3.3 | Move-In Shield (guided capture, durable timestamped store, AI catalogue) | §3 |
| 3.4 | Maintenance request → AI triage → operator approval → dispatch → tracker | §4 |
| 3.5 | Renter-pays services (basic; skips operator approval) | §5 |
| 3.7 | Moving-In hub — Utility Valet handoff link (v1 referral link only) | §6 |

### 0.2 Explicitly OUT of scope for this build

- Move-out comparison automation / dispute packet export (audit 3.6)
- Renters insurance embed (3.8)
- Shop tab / Make It Home commerce (3.9) — the Home-tab shelf ships as a static teaser at most, or is omitted
- Rent-builds-credit enrollment (3.10)
- Guardian alert engine (weather/seasonal) — design exists; not P0
- Utility Valet deep integration (plan selection in-app) — v2
- PMS write-back, auto-approval rules engine, SSO/SAML (operator side, audit §4)

Do not build stubs for these beyond feature flags. Any screen from the design spec belonging to an out-of-scope feature is simply absent in the pilot build.

### 0.3 Existing platform services this spec INTEGRATES with (do not rebuild)

| Service | What it provides | Integration point |
|---|---|---|
| **Auth** | Account creation, email+code/password sign-in, sessions, roles | Renters adds `resident` role + org/unit membership records; sign-in screen adds invite-code entry link (design §11) |
| **AI photo triage pipeline** | Photo → `{issue, trade, severity, cost_band, parts}` JSON (versioned contract, audit 7.2) | Maintenance flow (§4) calls it; resident response is a **filtered projection** (no cost_band) per §2 |
| **Job lifecycle engine** | `pending → matched → sent → accepted → in_progress → completed → paid → closed` | Operator approval (§4) inserts a **pre-lifecycle approval state**; on approve, a standard job is created and dispatch proceeds normally |
| **Pro dispatch / clearance** | Cleared-pro matching, fail-closed site-type gating | Rental units dispatch at `property_mgmt`-appropriate clearance per operator config; Renters passes `site_type` and operator vendor-pool constraints |
| **Notifications** | Push (APNs/FCM), SMS (Twilio, TCPA opt-in), email (Resend) | Renters supplies templates + the notification matrix (§8.4) |
| **Payments** | Charge + escrow-style hold/release (processor per audit 5.2 decision) | Only used by renter-pays services (§5); operator-billed work orders carry **no resident payment** in pilot |

### 0.4 Platform architecture assumptions

- Rebuild stack: Next.js (web/app shell) + Python/FastAPI (API) + Azure. Endpoint sketches below are REST-style (`/v1/...`); adapt naming to the rebuild's router conventions, keep shapes.
- Mobile client is the existing TrustyPro app (iPhone-first). Resident mode is **additive** — zero changes to homeowner screens/flows (design hard rule).
- Blob storage: Azure Blob Storage with block-blob resumable upload for Shield photos (§8.1).
- All timestamps UTC ISO-8601 server-side; render local.

### 0.5 Glossary

- **Operator** — the rental company running the pilot (e.g., a large SFR operator). Owns orgs, units, approvers, branding.
- **Org** — operator tenant record. All resident data is org-scoped.
- **Unit** — a rentable address bound to an org.
- **Approver** — operator staff user who approves/denies maintenance requests (thin Portfolio queue, audit 4.1 — separate build, shared API defined here).
- **Residency** — the link resident ⇄ unit ⇄ org with lease dates and status; the object that gates resident mode.

---

## 1 · Feature 3.1 — Org invitation flow & resident onboarding

### 1.1 User stories

- **As an operator admin**, I can generate invitations for residents at specific units (single or CSV batch) so residents onboard bound to the right address with zero manual matching.
- **As a resident**, I open an invite link and see my operator's branding and my unit address, so I trust the invite and finish signup in under 2 minutes.
- **As a resident with an existing TrustyPro (homeowner) account**, I can accept an invitation into my existing account and gain a resident context without losing my homeowner data.
- **As an operator admin**, I can see invitation status (sent / opened / accepted / expired) per unit so I can chase adoption.
- **As a platform admin**, I can revoke or reissue any invitation.

### 1.2 Requirements

- **R-3.1.1 — Invitation object.** An invitation binds: org, unit, resident email and/or phone, lease start date, expiry (default 30 days, org-configurable), single-use token (≥128-bit random, stored hashed), status (`created | sent | opened | accepted | expired | revoked`).
- **R-3.1.2 — Delivery.** Invitations send via email and/or SMS (SMS only with operator-attested resident consent; TCPA per canonical §7). Message contains a universal link that deep-links into the app or falls back to mobile web.
- **R-3.1.3 — Invite-first entry.** Opening an invite link with no session shows the org-branded invite-accept screen FIRST (org logo, "「Operator」 invited you to TrustyPro", benefit bullets, footer "「Operator」 homes · powered by TrustyPro"), then account creation (name, email, phone, code verify) **pre-bound to the unit**. Never generic signup followed by invite hunting (design §11.4).
- **R-3.1.4 — Existing-account path.** If the invite email matches an existing account, offer sign-in instead of creation; on success, attach a residency to that account (dual-role, §2 / R-3.2.6).
- **R-3.1.5 — Address confirm.** After accept, resident sees the pre-filled unit address + lease start and must tap "This is my home ✓". A "This isn't my address" path exists (see edge cases).
- **R-3.1.6 — Manual code entry.** Sign-in screen carries the quiet link "Have an invitation? Enter code" accepting a short human code (8 chars, unambiguous alphabet) equivalent to the link token.
- **R-3.1.7 — First-run.** After address confirm: 2-slide intro, then Resident Home with the Move-In Shield card in its one-time pulse state.
- **R-3.1.8 — Single-use + revocation.** An accepted, expired, or revoked token can never create or attach another residency. Operator admins and platform admins can revoke; revocation of an *accepted* invite does not remove the residency (that's residency termination, R-3.2.7).
- **R-3.1.9 — Batch issuance.** CSV import (unit address or unit_id, email, phone, lease_start) creates invitations in bulk with per-row validation report. (Serves audit 4.6 adoption; attribution tagging of units at creation happens on the operator-import side — this API must accept and persist `origination_source` passthrough on unit creation.)
- **R-3.1.10 — Staff routing.** "Property staff? Sign in here" link routes to Portfolio web with a redirect interstitial; staff accounts can never enter the resident app experience.

### 1.3 API surface

```
POST /v1/orgs/{org_id}/invitations                    (operator admin)
  req:  { unit_id, email?, phone?, lease_start, expires_in_days? }
  res:  { invitation_id, status, expires_at, short_code, universal_link }

POST /v1/orgs/{org_id}/invitations/batch              (operator admin)
  req:  multipart CSV
  res:  { created: n, failed: [{row, reason}] }

GET  /v1/orgs/{org_id}/invitations?status=&unit_id=   (operator admin)
  res:  { items: [{invitation_id, unit, email_masked, status, sent_at, opened_at, accepted_at}] }

POST /v1/invitations/{token}/open                     (public; token from link)
  res:  { org: {name, logo_url, accent_color}, unit_address_masked, lease_start, status }
        // 410 Gone if expired/revoked/used — body carries operator support contact

POST /v1/invitations/{token}/accept                   (public → creates or attaches)
  req:  { mode: "create" | "attach", profile?: {name, email, phone}, otp_code }
  res:  { session, residency_id, requires_address_confirm: true }

POST /v1/residencies/{id}/confirm-address
  req:  { confirmed: true } | { confirmed: false, reason_text }
  res:  { residency_status }                          // false → residency held, ops ticket raised

DELETE /v1/orgs/{org_id}/invitations/{invitation_id}  (revoke)
```

### 1.4 Data model additions

```
orgs                 id, name, logo_blob_ref, accent_color, support_email, support_phone,
                     sms_consent_attested (bool), invite_expiry_days, created_at
units                id, org_id, address_line1/2, city, state, zip, unit_number,
                     origination_source (nullable, permanent once set), created_at
invitations          id, org_id, unit_id, email, phone, lease_start,
                     token_hash, short_code_hash, status, expires_at,
                     sent_at, opened_at, accepted_at, revoked_at, accepted_user_id
residencies          id, user_id, org_id, unit_id, lease_start, lease_end (nullable),
                     status (pending_confirm | active | ended | held),
                     confirmed_at, ended_at, end_reason
users (existing)     + roles gains 'resident' capability derived from active residencies (do
                     not denormalize a boolean; derive from residencies at token issuance)
```

### 1.5 Edge cases & failure behavior

- **Expired link:** `/open` returns 410 with org support contact; screen copy: "This invitation has expired — ask 「Operator」 to resend it," plus a "Request a new invite" button that notifies the operator admin (creates a `reissue_requested` event; does NOT auto-reissue).
- **Already-used link (forwarded to a roommate):** 410 with "This invitation was already used." Roommates require their own invitation (one residency per user per unit; multiple residencies per unit allowed).
- **Resident at wrong address:** "This isn't my address" → residency moves to `held`, resident sees "We've flagged this to 「Operator」 — sit tight," operator admin gets a task. **The app must not proceed to Shield/maintenance on a held residency** (wrong-address Shield photos poison the deposit record).
- **Email typo by operator:** invite accepted with a different email than addressed (user creates account with their real email) — allowed, but record `accepted_email_mismatch=true` and surface in operator invite list for audit.
- **Lease start in the future:** residency activates immediately for onboarding + Move-In Shield (residents document before/at move-in), but maintenance submission is allowed only from `lease_start − 3 days` (config) to avoid work orders on units still in turn.
- **Operator SMS to a landline / bounce:** delivery failure marks invitation `sent` with `delivery_failed` flag visible to admin; no retry storm (max 1 auto-retry after 1h).
- **Invite link opened on desktop:** mobile-web fallback supports accept + address confirm; Shield capture prompts "Continue on your phone" with QR handoff.

### 1.6 Analytics events

| Event | Properties |
|---|---|
| `invite_sent` | org_id, unit_id, channel (email/sms), batch (bool) |
| `invite_opened` | org_id, invitation_id, platform (ios/android/web) |
| `invite_accepted` | org_id, invitation_id, mode (create/attach), secs_from_open |
| `invite_expired` | org_id, invitation_id |
| `address_confirmed` / `address_disputed` | org_id, residency_id |

(`invite_accepted / invite_sent` per org = the pilot adoption-rate numerator/denominator — audit 4.2.)

---

## 2 · Feature 3.2 — Resident-mode gating (SERVER-enforced)

> Hard rule (audit 3.2, legal + deal requirement): a resident never sees **prices/quotes/costs, vendor or pro names, vendor selection, marketplace CTAs, pro-network content, or Home Health Vault UI**. This is enforced at the API layer, not by hiding UI.

### 2.1 User stories

- **As an operator**, I need certainty that residents can never see job costs or vendor identities, because that exposure breaks my vendor agreements and creates legal risk — a UI toggle is not certainty.
- **As a resident**, I see a clean, calm app scoped to my rental — nothing about buying services, choosing vendors, or what things cost.
- **As a dual-role user** (homeowner who also rents), I can switch contexts explicitly, and each context only ever receives its own data.
- **As a platform admin**, I can audit exactly which fields are stripped for resident tokens and verify with an automated test suite.

### 2.2 Requirements

- **R-3.2.1 — Context-scoped tokens.** Sessions carry an explicit `context` claim: `{type: "homeowner"} | {type: "resident", residency_id, org_id, unit_id}`. Every Renters API call is authorized against the token's residency; a resident-context token is structurally incapable of calling homeowner/pro/marketplace endpoints (403, not empty data).
- **R-3.2.2 — Response projection layer.** All objects returned to resident-context tokens pass through per-type serializers that **whitelist** fields (never blacklist). Prohibited field classes: any monetary amount (`cost_band`, `quote`, `price`, `fee`, payout fields), pro/vendor identity beyond first name + photo of the *assigned tech at scheduled state* (design §6 tracker explicitly shows tech first name + photo — this is the ONLY identity exposure permitted), company names, marketplace/product/pro-network objects. Exception: renter-pays services (§5) display prices for those services only, via their own serializer.
- **R-3.2.3 — Gating test suite (release gate).** An automated contract test suite runs every resident-reachable endpoint with a resident token and asserts zero occurrences of prohibited field names/patterns (regex over response bodies: `price|cost|quote|fee|payout|vendor|company_name` allowlist-aware). CI-blocking. New endpoints must register a resident serializer or be default-denied to resident tokens.
- **R-3.2.4 — Role landing, no chooser.** Post sign-in: single-role users land directly in their mode (design §11.2). No role picker for single-role users, ever.
- **R-3.2.5 — Dual-role switcher.** Profile-header context switcher per design §11.3; switching swaps the tab set and **mints a new context token** (R-3.2.1) — the client never re-filters one super-token.
- **R-3.2.6 — Notification scoping.** Push/SMS/email content rendered for a residency obeys the same projection rules (no costs/vendor names in notification copy).
- **R-3.2.7 — Residency end = graceful downgrade.** When a residency ends (operator terminates, lease end passed + operator confirms): resident-context token invalidated; user sees the downgrade screen ("Your 「Operator」 residency access ended — your Move-In Shield records remain yours forever") with Shield export and homeowner-mode offer (design §11.5). **Shield records remain readable + exportable by the ex-resident indefinitely** (read-only), and remain visible to the operator per the consent terms. Maintenance history becomes read-only to the ex-resident.
- **R-3.2.8 — Server-side tab config.** The resident tab bar / home-card list is server-driven config per org + residency state, so out-of-scope cards (Shop, credit, insurance) simply never arrive at the client. Pilot resident tabs: **Home · Maintenance · Shield · More** (Shop omitted — out of scope).

### 2.3 API surface

```
GET  /v1/me/contexts
  res: { contexts: [{type:"homeowner", label}, {type:"resident", residency_id, org:{name,logo,accent}, unit_label, status}] }

POST /v1/me/contexts/switch
  req: { context: {...} }         res: { token }        // new short-lived context token

GET  /v1/resident/home            // server-driven home layout
  res: { cards: [ {type:"shield", state, progress}, {type:"maintenance", open_request?},
                  {type:"moving_in", state}, ... ], tabs: [...] }

POST /v1/orgs/{org_id}/residencies/{id}/end            (operator admin)
  req: { end_reason, effective_at }
```

### 2.4 Data model additions

```
resident_serializer_registry   (code, not DB): per-type whitelists, versioned in repo,
                               reviewed via CODEOWNERS on the Renters team
audit_gating_runs              id, git_sha, endpoints_tested, violations (json), ran_at
residencies                    (see §1.4) status transitions logged to an events table
context_tokens                 standard session store + context claim; revocation list keyed
                               by residency_id for R-3.2.7 instant invalidation
```

### 2.5 Edge cases & failure behavior

- **Serializer miss (new field added upstream):** whitelist projection means new fields are dropped by default — fail-closed. The gating test suite (R-3.2.3) is the second net.
- **Push notification rendered before residency ended, delivered after:** notification deep-links re-authorize on open; a dead residency shows the downgrade screen, not the content.
- **Dual-role user submits a maintenance request while in the wrong context:** impossible by construction — resident endpoints require a resident-context token bound to one residency; homeowner requests go through homeowner endpoints.
- **Operator staff member who is also a resident elsewhere:** staff accounts live in Portfolio (separate app, R-3.1.10); if the same human has a resident account it is a separate user context — no privilege mixing.
- **AI triage response leaks cost band:** the triage pipeline's full JSON (`issue/trade/severity/cost_band/parts`) is stored server-side; the resident projection returns only `{issue_label, trade, confidence}` (§4). Cost band flows only to the operator approval queue.

### 2.6 Analytics events

`context_switched` (from, to) · `gating_violation_blocked` (endpoint, field — should be zero in prod; alerting on >0) · `residency_ended_screen_viewed` · `shield_export_after_end`.

---

## 3 · Feature 3.3 — Move-In Shield (flagship)

> Audit note: "photo loss = deal loss — storage durability is P0 of P0." Durability requirements in §8.1 are part of this feature's definition of done.

### 3.1 User stories

- **As a resident**, I document my home's move-in condition room-by-room in ~15 minutes with guided shots, so my deposit is protected by evidence neither I nor my landlord can alter.
- **As a resident**, if my connection drops mid-capture, I keep shooting and everything uploads later — I never lose a photo and I never have to wonder whether a photo "took."
- **As a resident**, I flag pre-existing damage with pins and notes so it's on the record from day one.
- **As an operator**, I receive a tamper-evident, timestamped condition record per unit that reduces move-out disputes.
- **As a platform admin**, I can prove any photo's capture time and integrity (hash chain) if a record is challenged.
- **As the AI pipeline (system)**, I asynchronously catalogue rooms/components from Shield photos to seed the unit's asset record — without blocking the resident's flow.

### 3.2 Requirements — flow

- **R-3.3.1 — Room list.** Rooms per design §5.1: Entry/Living · Kitchen · Bedroom 1 · Bedroom 2 · Bathroom(s) · Laundry · Garage/Exterior · Anything else. Room set is a server-side template per unit type (org-configurable count of bedrooms/bathrooms; default template above). Each room row: photo-count chip ("0 of ~6"), status ring; header shows overall progress ring.
- **R-3.3.2 — Guided capture.** Full-screen camera with shot-list chips (Wide shot · Floors · Walls · Windows · Fixtures · Damage close-up), current chip highlighted, framing hint text, thumbnail tray with tap-to-retake. Shots are *guided, not mandatory* — a room can complete with any ≥1 photo, but the completion recap shows which suggested shots are missing.
- **R-3.3.3 — Damage tagging.** Post-photo optional flow: tap-to-pin on photo → chip picker (Scuff · Stain · Crack · Chip · Broken · Wear · Other) + ≤40-char note. Pins stored as normalized coordinates (0–1 x/y) + chip + note; rendered as numbered indigo dots.
- **R-3.3.4 — Durable capture pipeline (client).** Every captured photo is immediately written to on-device persistent storage (app-private, survives app kill and OS restart) and enqueued in a client upload queue. Upload uses resumable block upload; queue retries with exponential backoff; queue survives sign-out (design §11.6: "Your 12 photos are safe — sign back in to continue"). **UI only shows a photo as "saved" after server write-confirmation** (R-3.3.6); until then it shows an explicit pending state (subtle cloud-arrow icon), never a silent success.
- **R-3.3.5 — Offline tolerance.** Full capture flow (all rooms, all photos, pins, notes, room-complete) works with zero connectivity. Offline banner: "Photos will upload when you're back online." Shield cannot reach the `complete` state (R-3.3.9) until every photo is server-confirmed.
- **R-3.3.6 — Server write confirmation.** The server acknowledges a photo only after: blob durably committed to storage (Azure block blob `Put Block List` success on zone-redundant storage), metadata row written, and SHA-256 of the received bytes matches the client-supplied hash. The ack returns `{photo_id, server_hash, committed_at}`; client marks saved only on hash match.
- **R-3.3.7 — Trusted timestamps + immutability.** `committed_at` is server-assigned. Client capture time and coarse GPS (if permitted) are stored as *claimed* metadata, clearly distinguished. After Shield completion, all photos + metadata become immutable: storage-level immutability (blob legal hold / time-based retention ≥ lease term + 2y) + application-level: no update/delete endpoints exist for completed-Shield objects. A per-Shield hash chain (each photo's hash + prev chain hash) is computed at completion and stored; the export includes it. Small-print copy per design §5.6.
- **R-3.3.8 — Appliance capture.** Kitchen/laundry rooms include the "snap the sticker" prompt; the photo routes to the async recognition pipeline; recognized `{brand, model, serial, year}` renders as an editable chip. Recognition is best-effort/async — never blocks room completion; unrecognized plates store the photo with `recognition: none`.
- **R-3.3.9 — Completion.** When all template rooms are marked complete AND all photos server-confirmed: shield-complete moment (seal animation, confetti once), stats row (photo count · rooms · flags · timestamp), "Email me a copy" (sends export link) and status flips to `ACTIVE`. Home-tab hero collapses to the slim ACTIVE bar with View/Export.
- **R-3.3.10 — Export.** Resident (and operator, per consent) can export: PDF summary (per-room contact sheets, pins/notes, appliance data, timestamps, hash-chain digest) + full-resolution photo archive (zip via expiring signed URLs). Export remains available forever, including post-residency (R-3.2.7).
- **R-3.3.11 — AI cataloguing (async).** Completed rooms enqueue to the existing AI pipeline for room/component tagging + pre-existing-condition flagging (audit 7.3). Results attach as `ai_annotations` — never modifying originals — with human-QA loop acceptable at pilot volume. Failures retry; permanent failures flag for manual QA; **no AI outcome ever blocks or alters the resident record**.
- **R-3.3.12 — Nudges.** If Shield is incomplete at lease_start+3d and +7d, send one reminder each (matrix §8.4). Hero card persists until complete.

### 3.3 API surface

```
POST /v1/resident/shield                              // create/instantiate from template
  res: { shield_id, rooms: [{room_id, name, suggested_shots[], status}], status:"in_progress" }

GET  /v1/resident/shield                              // current state incl. per-photo confirm status
POST /v1/resident/shield/photos/initiate
  req: { room_id, shot_type, client_hash_sha256, byte_size, captured_at_client, gps? }
  res: { photo_id, upload: {kind:"azure_block", sas_url, block_size} }

POST /v1/resident/shield/photos/{photo_id}/commit     // after final block list
  res: { photo_id, server_hash, committed_at }        // THE ack that flips UI to saved
        // 409 hash_mismatch → client re-uploads from local copy

POST /v1/resident/shield/photos/{photo_id}/pins
  req: { pins: [{x, y, chip, note}] }                 // rejected once shield complete (423 Locked)

POST /v1/resident/shield/rooms/{room_id}/complete
POST /v1/resident/shield/complete
  res: { status:"active", stats:{photos, rooms, flags}, completed_at, chain_digest }
        // 409 if any photo unconfirmed — body lists pending photo_ids

POST /v1/resident/shield/export
  req: { format: "pdf" | "archive", email_copy: bool }
  res: { export_id, status:"processing" }             // link delivered via notification/email

GET  /v1/orgs/{org_id}/units/{unit_id}/shield         (operator, per consent) — read-only projection
```

### 3.4 Data model additions

```
shields            id, residency_id, unit_id, template_version, status (in_progress|active),
                   started_at, completed_at, chain_digest, retention_hold_until
shield_rooms       id, shield_id, name, sort, suggested_shots (json), status, completed_at
shield_photos      id, shield_id, room_id, shot_type, blob_ref, byte_size,
                   client_hash, server_hash, captured_at_client, gps_claimed (nullable),
                   committed_at (server), upload_status (pending|committed), sort
shield_pins        id, photo_id, x, y, chip, note_40
shield_appliances  id, room_id, photo_id, brand, model, serial, year,
                   recognition_source (ai|manual|none), edited_by_resident (bool)
shield_ai_annotations  id, photo_id, pipeline_version, payload (json), qa_status
shield_exports     id, shield_id, requested_by, format, status, signed_url_expiry
```

### 3.5 Edge cases & failure behavior

- **Photo upload fails mid-Shield (the canonical failure):** photo stays in the client queue backed by on-device storage; UI shows per-photo pending badge + a queue banner ("4 photos uploading…"); user continues capturing. Retries: exponential backoff, resume from last confirmed block (never restart the byte stream from zero on flaky links). If a photo is still unconfirmed at room-complete, room completes locally with a "pending upload" marker; **Shield-complete is blocked** (409, R-3.3.9) with a clear list of what's pending and a retry-all button.
- **App killed / phone dies mid-capture:** on relaunch, queue restores from local storage; captured-but-unenqueued camera output is written to local storage synchronously at shutter time, so the loss window is ~0. Acceptance: kill the app immediately after shutter → photo present on relaunch.
- **Device storage full:** shutter blocks with actionable error ("Free up ~200 MB to keep documenting") BEFORE capture, never after (pre-flight free-space check at flow entry and per-room).
- **Hash mismatch on commit:** server discards blob, returns 409; client re-uploads from local copy (local copy is only deleted after confirmed commit + configurable grace of 7 days).
- **Signed-out mid-upload (session expiry):** queue pauses; re-auth sheet with photo-safety banner (design §11.6); on sign-in, resume. Local queue is keyed to user_id — a *different* user signing in on the device cannot flush another user's queue.
- **Clock-skewed device:** client capture times wildly divergent from server receipt time (>24h) are stored but flagged `time_suspect`; the authoritative timestamp is always `committed_at`.
- **Resident tries to add photos after completion:** all mutation endpoints return 423 Locked; UI offers no entry points. (Move-out capture is a separate future flow, out of scope.)
- **Duplicate commit (network retry of the commit call):** commit is idempotent on `photo_id`; second call returns the original ack.
- **Residency held (wrong address, §1.5):** Shield entry blocked with explanation — never let a resident document the wrong unit.
- **Two devices, same resident:** Shield state is server-merged; photo initiate/commit is per-photo so parallel devices can't corrupt state; room-complete uses last-write-wins with both devices' photos retained.

### 3.6 Analytics events

| Event | Properties |
|---|---|
| `shield_started` | residency_id, template_version |
| `shield_photo_captured` | room, shot_type, offline (bool) |
| `shield_photo_committed` | secs_capture_to_commit, retries |
| `shield_room_completed` | room, photos, pins |
| `shield_completed` | total_photos, rooms, flags, elapsed_mins, pct_offline_captured |
| `shield_upload_stalled` | pending_count, oldest_pending_mins  *(ops alert ≥30 min)* |
| `shield_export_requested` | format, post_residency (bool) |

---

## 4 · Feature 3.4 — Maintenance request → operator approval → dispatch → tracker

### 4.1 User stories

- **As a resident**, I report something broken in ~30 seconds with photos, get an instant AI read on what it is, and track the fix like a pizza order — without ever seeing costs or choosing vendors.
- **As an operator approver**, I see each request with AI triage (issue, trade, severity, **cost band**), entry permission, and pet notes, and approve/deny/assign in one tap from the Portfolio queue.
- **As an operator approver**, when I'm out, requests escalate to a backup automatically so residents never sit in limbo.
- **As a resident with an emergency**, I get a phone-call-grade response path, with a 911 disclaimer for fire/gas.
- **As a pro**, an approved rental work order arrives through normal dispatch — same claim/schedule/complete flow, plus required completion photos.
- **As a platform admin**, every approval decision is attributable (who, when) for the pilot's approval-time metric.

### 4.2 Requirements

- **R-3.4.1 — Report flow.** One sheet, 3 steps (design §6): (1) up to 4 photos (camera or library; same durable-queue client machinery as Shield, §8.1); (2) AI triage moment — shimmer → result card "Looks like a **「issue」** · 「trade」" with "That's right / Not quite (edit)" — edit shows a trade/issue picker; (3) details: urgency (Emergency 🔴 / Soon 🟠 / Whenever 🟢 with the design's helper copy), entry-permission toggle ("OK to enter if I'm not home"), pets note. Submit → success sheet "Sent to 「Operator」 — you'll get updates here."
- **R-3.4.2 — Triage integration + projection.** Photos run through the existing triage pipeline; full JSON (incl. `severity`, `cost_band`, `parts`) is stored on the request and delivered to the operator queue. Resident sees ONLY `{issue_label, trade}` (R-3.2.2). Resident's "Not quite" correction is stored alongside (never overwriting) the AI output, feeding the accuracy dashboard (audit 7.2).
- **R-3.4.3 — Approval state machine (pre-lifecycle).** Request states: `submitted → pending_approval → approved | denied | more_info` . `approved` creates a platform job (entering the existing lifecycle at `pending`, carrying unit site-type + operator vendor-pool constraints into dispatch). `denied` requires a resident-safe reason from a template list (operator free-text is operator-internal only). `more_info` sends the resident a specific ask (e.g., "add a photo of the shutoff valve") and returns to `pending_approval` on reply.
- **R-3.4.4 — Approval API is shared with Portfolio (audit 4.1).** This spec defines the endpoints; the thin operator queue UI is a sibling deliverable consuming them. Nothing in the resident app blocks on Portfolio UI polish — approvals can be executed via these APIs from day one.
- **R-3.4.5 — Escalation timer.** Per-org config: `approval_sla_hours` by urgency (defaults: Emergency 0.25h · Soon 24h · Whenever 72h). On breach: escalate to the org's backup-approver chain (ordered list); each hop notifies + re-arms the timer; final hop alerts platform ops + flags in pilot metrics. Emergency additionally triggers the phone path (R-3.4.8) regardless of approval state.
- **R-3.4.6 — Tracker.** Vertical stepper with timestamps mapping lifecycle → resident-visible states: `Received ✓ → Approved ✓ → Scheduled (window + tech first name + photo) → In progress → Fixed`. Each transition = push notification (matrix §8.4). Denied and more-info render their own tracker states with the resident-safe reason / ask. The mini-tracker appears on Resident Home while any request is open.
- **R-3.4.7 — Completion + CSAT.** Pro must attach ≥1 completion photo to complete (rental work orders enforce this even where homeowner jobs don't). On `Fixed`: resident gets 1–5 stars + one-tap chips (On time · Clean · Fixed first visit) + optional comment. CSAT is org-visible aggregated; pro-identifying breakdown stays platform-internal.
- **R-3.4.8 — Emergency path.** Urgency 🔴 shows the immediate banner: "Calling within 15 minutes — for fire or gas leaks call 911 first" + live status. Backend: raise priority dispatch (existing emergency-ish path or manual ops runbook at pilot volume — pilot minimum is an ops pager alert with a 15-min human-callback SLA and an on-call rota; do NOT ship the copy without the operational backing). Org config may route emergencies to the operator's own emergency line instead — copy adapts.
- **R-3.4.9 — Cancellation.** Resident can cancel while `submitted/pending_approval`; after approval, cancellation requests notify the operator (who cancels the job) — resident cannot kill a dispatched job unilaterally.
- **R-3.4.10 — No payment surface.** Operator-approved work orders show the resident nothing about money at any point, including receipts. Billing is operator-side and out of this app entirely.

### 4.3 API surface

```
POST /v1/resident/requests
  req: { photos: [photo_id...(≤4)], urgency, entry_ok: bool, pets_note?, 
         triage_ack: {accepted: bool, corrected?: {trade, issue_label}} }
  res: { request_id, state:"pending_approval", tracker: [...] }

POST /v1/resident/requests/photos/initiate|commit     // same durable pattern as Shield (§3.3)
GET  /v1/resident/requests?state=open|closed
GET  /v1/resident/requests/{id}                       // resident projection: tracker, no costs
POST /v1/resident/requests/{id}/more-info-reply       { text?, photos? }
POST /v1/resident/requests/{id}/cancel
POST /v1/resident/requests/{id}/csat                  { stars, chips[], comment? }

# Operator (consumed by Portfolio thin queue — audit 4.1)
GET  /v1/orgs/{org_id}/approvals?state=pending&urgency=
  res: { items: [{request_id, unit, submitted_at, urgency, entry_ok, pets_note,
                  triage: {issue, trade, severity, cost_band, parts, confidence},
                  photos[], sla_deadline, escalation_level}] }
POST /v1/orgs/{org_id}/approvals/{request_id}/approve { assign: "vendor_pool" | "in_house", notes_internal? }
POST /v1/orgs/{org_id}/approvals/{request_id}/deny    { reason_code, notes_internal? }
POST /v1/orgs/{org_id}/approvals/{request_id}/more-info { ask_text }
PUT  /v1/orgs/{org_id}/approver-chain                 { chain: [user_id...], sla_hours: {emergency, soon, whenever} }
```

### 4.4 Data model additions

```
maintenance_requests   id, residency_id, unit_id, org_id, state, urgency,
                       entry_ok, pets_note, submitted_at,
                       triage_json (full), triage_version, resident_correction (nullable),
                       job_id (nullable, set on approve), denied_reason_code,
                       cancelled_at, csat_stars, csat_chips, csat_comment
request_photos         id, request_id, kind (report|more_info|completion), blob_ref,
                       client_hash, server_hash, committed_at
approval_events        id, request_id, actor_user_id, action (approve|deny|more_info|escalate|auto_escalate),
                       at, escalation_level, notes_internal      // immutable audit trail (audit 4.3 seed)
org_approver_chains    org_id, position, user_id
org_sla_config         org_id, urgency, sla_hours
```

### 4.5 Edge cases & failure behavior

- **Approver on vacation / unresponsive:** escalation timer (R-3.4.5) walks the chain; every hop writes an `approval_events` row (`auto_escalate`). If the chain exhausts: platform ops notified, resident receives an honest holding update at SLA×2 ("Still with 「Operator」 — we've nudged them"), and the request is flagged in pilot metrics (approval-time outliers are exactly what the pilot report must surface, audit 4.2). Never auto-approve on timeout in pilot (auto-approval rules are audit 4.3, P1).
- **AI triage pipeline down/slow:** after 10s, resident flow degrades gracefully — skip the AI card, show manual trade/issue picker ("Tell us what's going on"), submit normally with `triage_json = null`; a background retry populates triage for the operator queue when the pipeline recovers. The resident is never blocked by AI availability.
- **AI confidently wrong + resident taps "That's right":** operator queue shows both AI output and photos; approver correction at approve-time is recorded for the golden set. No silent trust of either party.
- **Emergency at 3 AM:** the 15-minute-call promise is an ops commitment — build the pager alert + on-call escalation BEFORE enabling the 🔴 path in production; feature-flag Emergency to route to the operator's emergency phone number (tap-to-call) if our rota isn't staffed.
- **Duplicate reports (roommates both report the same leak):** operator queue groups by unit + trade + 72h window with a "possible duplicate" badge; approver can merge (deny-as-duplicate resident copy: "Already on it — tracking here" and the duplicate's tracker mirrors the primary request).
- **Photo upload incomplete at submit:** submit is blocked until report photos are server-confirmed (small count, ≤4 — acceptable to block, unlike Shield); offline submit queues the whole request with a clear "Will send when online" state.
- **Resident revokes entry permission after scheduling:** toggle change notifies operator + assigned pro; job stays scheduled (coordination is human at pilot volume).
- **Job fails/no-show:** lifecycle exceptions (pro cancels, expires) map to a resident-safe tracker state "Rescheduling — we'll confirm a new time" + operator alert; never expose dispatch internals.
- **CSAT after residency ends:** allowed within 14 days of `Fixed` even if residency ended in between.

### 4.6 Analytics events

| Event | Properties |
|---|---|
| `request_submitted` | urgency, photo_count, triage_available (bool), triage_accepted (bool), offline (bool) |
| `request_approved` | secs_to_approve, escalation_level, assign_type |
| `request_denied` | reason_code, secs_to_decision |
| `request_more_info` / `request_more_info_replied` | round_trip_secs |
| `request_scheduled` | secs_from_approval |
| `job_completed` | secs_submit_to_fixed, first_visit_fix (bool from chips) |
| `csat_submitted` | stars, chips |
| `approval_escalated` | level, urgency  *(pilot red-flag metric)* |
| `emergency_triggered` | callback_secs |

(These feed the pilot scorecard directly: cost/WO comes from operator-side job data; approval time = `request_approved.secs_to_approve`; resident satisfaction = `csat_submitted`.)

---

## 5 · Feature 3.5 — Renter-pays services (basic)

> Services the resident buys personally (cleaning, TV mounting, etc.). Skips operator approval; resident DOES see prices here — this is the one sanctioned price surface in resident mode (R-3.2.2 exception), strictly limited to the curated renter-pays catalog.

### 5.1 User stories

- **As a resident**, I can book and pay for personal services (cleaning, furniture assembly, TV mounting) at a flat listed price, without my landlord involved.
- **As an operator**, I control which service categories are offered in my buildings (some operators ban mounting) and I'm never billed for them.
- **As a resident**, I never choose a vendor — a vetted pro just shows up in a window I pick, keeping the no-vendor-selection rule intact.
- **As the platform**, renter-pays jobs run the normal paid lifecycle (charge → escrow-style hold → release on completion) and standard commission math.

### 5.2 Requirements

- **R-3.5.1 — Curated flat-price catalog.** Small server-defined catalog (pilot: Cleaning — standard/deep by beds/baths · Furniture assembly · TV mounting · Junk haul). Each item: fixed price or simple size-based matrix set platform-side. **No quotes, no bidding, no pro selection** — flat price + time-window pick only.
- **R-3.5.2 — Org allowlist.** Per-org category allowlist; operators can also flag categories as "requires notice" → operator gets an FYI notification (not an approval) on booking (e.g., mounting = wall penetration).
- **R-3.5.3 — Booking flow.** Category → options (size matrix) → price → date + arrival window → entry/pets (reuse §4 fields) → pay (saved card / Apple Pay via platform payments) → confirmation. Booking creates a platform job entering the normal lifecycle; dispatch is invisible to the resident.
- **R-3.5.4 — Tracker reuse.** Same pizza-tracker component as §4, minus the `Approved` step: `Booked ✓ → Scheduled → In progress → Done`. Completion → same CSAT sheet. Receipt (this flow only) available in More.
- **R-3.5.5 — Payments.** Charge at booking with hold; release on completion per platform escrow rules (audit 5.3). Refund path: cancellation >24h before window = full refund; inside 24h = org-configurable fee (default full refund at pilot — goodwill over policy). Processor abstraction respects the pending migration (audit 5.2) — integrate via the platform payments service interface, never a direct processor SDK call from Renters code.
- **R-3.5.6 — No commission/tier exposure.** Commission math (canonical §3.3) runs platform-side; nothing about fees/keep-rates/network ever surfaces to the resident (R-3.2.2 still governs everything except the catalog list price and the resident's own receipt).
- **R-3.5.7 — Entry point.** Services list within the Maintenance tab ("Book a service — you pay, no landlord needed") + a More-tab row. No marketplace-style merchandising; calm list, per design tone.

### 5.3 API surface

```
GET  /v1/resident/services/catalog                     // org-filtered, priced
  res: { items: [{service_id, name, options: [{option_id, label, price_cents}], notice_flag}] }

POST /v1/resident/services/bookings
  req: { service_id, option_id, window: {date, start, end}, entry_ok, pets_note?, payment_method_id }
  res: { booking_id, job_id, receipt: {amount_cents, last4}, tracker }

GET  /v1/resident/services/bookings/{id}
POST /v1/resident/services/bookings/{id}/cancel        // refund per policy
POST /v1/resident/services/bookings/{id}/csat
GET  /v1/orgs/{org_id}/service-settings  ·  PUT ...    // category allowlist + notice flags
```

### 5.4 Data model additions

```
service_catalog        service_id, name, category, active
service_options        option_id, service_id, label, price_cents, duration_est
org_service_settings   org_id, service_id, allowed (bool), notice_flag (bool)
service_bookings       id, residency_id, service_id, option_id, price_cents, window,
                       payment_ref, job_id, state, cancelled_at, refund_ref,
                       csat_stars, csat_chips
```

### 5.5 Edge cases & failure behavior

- **Payment auth succeeds, job creation fails:** transactional outbox — booking row + job creation are atomic from the client's view; on downstream failure, auto-void the hold and show "That didn't go through — you weren't charged."
- **No pro available for the window:** platform matching fails post-booking → auto-offer 3 alternate windows; if declined, auto-refund. Never leave a paid booking silently unmatched >4h (ops alert).
- **Operator disables a category with open bookings:** existing bookings honor; catalog hides for new ones.
- **Dispute ("they scratched my wall"):** CSAT ≤2 stars or a damage keyword opens a support ticket routed to platform support (audit 10.1) — never to the operator (it's not their job) — resident copy sets that expectation.
- **Residency ends with a future booking:** booking auto-cancels + refunds on residency end.

### 5.6 Analytics events

`service_catalog_viewed` · `service_booked` (service, price_cents) · `service_cancelled` (hrs_before_window, refunded) · `job_completed` (booking context, `paid:true`) · `csat_submitted` (booking context).

---

## 6 · Feature 3.7 — Moving-In hub: Utility Valet handoff (v1)

> Audit: "v1 = referral link, 1 day." Keep it that small. The 5-screen in-app plan-selection flow in the design spec is **v2** — do not build it in P0.

### 6.1 User stories

- **As a resident (or homeowner)**, during move-in I tap one card and land in Utility Valet with my address pre-filled, so utility setup is one tap instead of six phone calls.
- **As the platform**, every handoff carries attribution (user, unit, org, timestamp) so referral revenue is trackable from day one.
- **As an operator**, the hub is co-branded and I can toggle it off if I have a competing arrangement.

### 6.2 Requirements

- **R-3.7.1 — Card.** Full-width "Moving in?" card per design §2 (🚚 icon, title, subtitle, "Powered by Utility Valet" caption) on Home for residents during onboarding and 60 days after residency start (homeowner side: 60 days after address change — additive, no homeowner-flow changes beyond inserting this card); plus a row in Services/More.
- **R-3.7.2 — Handoff.** Tap → interstitial ("You're heading to Utility Valet — they'll take it from here") → external browser / in-app browser to the Utility Valet URL with signed query params: `partner=trustypro`, `ref_id` (opaque handoff id), address fields (**only with explicit resident tap-through consent on the interstitial**; never PII in URLs beyond what the interstitial disclosed — align with platform privacy rules, prefer a server-to-server handoff token that Utility Valet exchanges for address, keeping PII out of the URL entirely if their side supports it; else minimal address only, no name/phone/email in the URL).
- **R-3.7.3 — Attribution record.** Every tap writes a permanent handoff record `{user, residency/unit, org, ts, ref_id}` — this is the referral-revenue ledger seed (relates audit 8.3 discipline: attribution exists from the first click).
- **R-3.7.4 — Dismiss/complete.** Card carries "Done with setup" quiet action → collapses card (state per residency). No checklist state machine in v1.
- **R-3.7.5 — Kill switch.** Org-level and global feature flags (Utility Valet agreement is unsigned per audit 6.2 — the card must be launchable/killable without a release).

### 6.3 API surface

```
GET  /v1/resident/moving-in            res: { visible, dismissed, partner_url_template }
POST /v1/resident/moving-in/handoff    res: { redirect_url }      // mints ref_id, writes attribution
POST /v1/resident/moving-in/dismiss
```

### 6.4 Data model additions

```
utility_handoffs   id (ref_id), user_id, residency_id (nullable for homeowner), unit_id, org_id,
                   created_at, consent_scope
moving_in_state    residency_id (or homeowner address_id), dismissed_at
```

### 6.5 Edge cases

- **Partner URL down/agreement not live:** flag off (R-3.7.5) — card absent, zero dead-ends.
- **Tap with no connectivity:** card disabled offline with hint.
- **Repeat taps:** each mints a new ref_id (dedupe on partner side); attribution keeps first-touch + all touches.

### 6.6 Analytics events

`moving_in_card_viewed` · `moving_in_handoff` (ref_id) · `moving_in_dismissed`.

---

## 7 · Cross-cutting UI states (all features)

- **R-3.9.1** Empty states per design §9 (no requests: "Nothing broken — nice." + illustration).
- **R-3.9.2** Loading shimmers on all async cards; AI moments get the shimmer-then-result pattern.
- **R-3.9.3** Global offline banner + per-feature behavior as specified (§3 capture-first, §4 block-submit-queue, §5/§6 disabled).
- **R-3.9.4** Error toast pattern: human copy, retry affordance, never raw error codes.
- **R-3.9.5** Brand/tone per design §10 and theming per §8.3 — TrustyPro indigo baseline (#4F46E5 family), org accent applied per theming rules. (Note: the ProLnk slate/bronze palette rules in the canonical spec §1.5 apply to the ProLnk public site, NOT this app.)

---

## 8 · Non-functional requirements

### 8.1 Photo durability (NFR-1 — highest priority in this build)

- **R-NF.1.1** Client persists every captured photo to app-private durable storage synchronously at shutter, before any UI advance. Survives app kill, OS restart, sign-out.
- **R-NF.1.2** Upload queue: persistent (survives restarts), per-photo state machine (`local → uploading → committed`), exponential backoff (1s→2m cap, jitter), resumable block uploads (resume at last confirmed block), automatic on connectivity-regain and app-foreground, background upload via OS background-transfer where available.
- **R-NF.1.3** Server confirms only after durable storage commit + hash verification (R-3.3.6). **UI shows "saved" only on server confirmation** — a pending photo is always visibly pending. This applies to Shield AND maintenance photos.
- **R-NF.1.4** Storage: zone-redundant (ZRS minimum); Shield blobs additionally under immutability policy post-completion (R-3.3.7). Deletion of committed Shield blobs is impossible via application code paths (no delete permission on the app's storage credential for the shield container; lifecycle managed by a separate ops role).
- **R-NF.1.5** Local copies retained until commit + 7 days.
- **R-NF.1.6** Monitoring: `shield_upload_stalled` alert (≥30 min pending), daily reconciliation job comparing client-reported capture counts vs committed counts per shield; discrepancy pages ops.
- **R-NF.1.7** Acceptance drills (release gate, run on device): airplane-mode full-room capture then reconnect; app force-kill at shutter; storage-full; token expiry mid-queue; 2% packet loss network profile. Zero photo loss in all drills.

### 8.2 Server-side gating (NFR-2)

All of §2 — restated as NFR because it is a property of every endpoint, not a feature: whitelist serializers (R-3.2.2), context tokens (R-3.2.1), CI contract tests (R-3.2.3), default-deny for unregistered endpoints. Client-side hiding is a UX courtesy only; the security boundary is the API. Pen-test item pre-pilot: attempt to reach prices/vendor names with a resident token via every known endpoint incl. websockets/notification payloads.

### 8.3 Operator branding/theming (NFR-3)

- **R-NF.3.1** Per-org theme: `{logo (light/dark variants), display_name, accent_color, support contacts}`. Applied to: invite screens, resident header, notification sender display, export PDF cover, downgrade screen.
- **R-NF.3.2** Accent usage is constrained: accent applies to org-identity moments (invite header, "Sent to 「Operator」" chips); the app's structural indigo system stays fixed — do not let arbitrary operator colors restyle CTAs/system states (accessibility + design integrity). Validate accent contrast (WCAG AA against white and #0F172A) at upload; fall back to indigo on failure.
- **R-NF.3.3** Theme is server-delivered with the residency context and cached; logo assets served from platform CDN, not operator URLs.

### 8.4 Notification matrix (NFR-4)

| Event | Push | SMS | Email | Notes |
|---|---|---|---|---|
| Invite | — | ✓* | ✓ | *only with attested consent (R-3.1.2); reminder at day 7 |
| Invite reissue requested | — | — | ✓ (operator admin) | |
| Shield incomplete nudge (d3, d7) | ✓ | — | fallback if no push | |
| Shield completed + export ready | ✓ | — | ✓ (export link) | |
| Request received | ✓ | — | — | in-app tracker is primary |
| Request approved | ✓ | — | fallback | design provides copy |
| Request denied / more-info | ✓ | — | fallback | resident-safe reason only |
| Tech scheduled | ✓ | ✓ | — | window info; SMS because it's calendar-critical |
| Tech en-route | ✓ | ✓ | — | |
| Fixed + rate prompt | ✓ | — | — | |
| Emergency acknowledgement | ✓ | ✓ | — | + phone call per R-3.4.8 |
| Renter-pays: booked/scheduled/en-route/done | ✓ | ✓ (scheduled, en-route) | ✓ receipt | |
| Approval SLA escalation | — | — | ✓ + ops channel | operator-side |
| Residency ended | ✓ | — | ✓ (export link) | |

Rules: all SMS honors opt-out (TCPA, canonical §7); "fallback" = send email only when no push token or push unopened for 24h; every notification body passes resident projection (R-3.2.6); quiet hours 9 PM–8 AM local for non-emergency.

### 8.5 Offline tolerance (NFR-5)

Summarized per feature: Shield = fully offline-capable capture (§3); Maintenance = compose offline, queue submit; Services/Moving-In = online-only, disabled gracefully; Trackers = cached last state with staleness indicator. All queues user-scoped and encrypted at rest on device.

### 8.6 Baseline (inherits audit 9.1)

TLS everywhere, encryption at rest, audit logs on approval + residency + export actions, backups with restore test covering the shield metadata DB and blob store, rate limiting on public invitation endpoints (token brute-force: constant-time compare + per-IP throttle + lockout on `short_code` guessing).

---

## 9 · Build sequencing — 6 increments × 2 weeks (~3 engineers)

Assumes weeks 1–2 of the master plan (triage contract, attribution, processor demos) are proceeding in parallel outside this team. App-store lead time (audit 10.6): submit TestFlight/internal builds from Increment 2 on; production store submission enters review during Increment 5.

**Increment 1 (wk 1–2) — Foundations & invitation spine.**
Org/unit/residency/invitation schema + APIs (R-3.1.1–1.10) · context tokens + projection layer skeleton + CI gating test harness (R-3.2.1–2.3) · org theming service (R-NF.3) · analytics event pipeline wired (audit 10.5) with the §1.6/§2.6 events.
**Milestone (testable):** invite issued via API → link opened → branded accept → account created bound to unit → address confirmed → lands on a stub Resident Home; gating test suite runs in CI and blocks a seeded violation.

**Increment 2 (wk 3–4) — Durable capture engine + Shield capture.**
Client durable photo store + upload queue + resumable blocks + commit/confirm protocol (R-NF.1.1–1.5, R-3.3.4–3.3.6) · Shield room list + guided camera + pins + room complete (R-3.3.1–3.3.3, 3.3.5) · offline banner + states.
**Milestone:** full Shield capture on-device in airplane mode, reconnect, all photos commit with hash verification; the R-NF.1.7 drill list passes on a physical device.

**Increment 3 (wk 5–6) — Shield completion, immutability, export; Resident Home real.**
Shield complete flow + hash chain + immutability policy + stats moment (R-3.3.7, 3.3.9) · export PDF/archive (R-3.3.10) · appliance capture w/ async recognition hook (R-3.3.8) · AI cataloguing enqueue (R-3.3.11) · server-driven Resident Home cards + slim ACTIVE bar (R-3.2.8) · nudges (R-3.3.12).
**Milestone:** end-to-end Shield: capture → complete → sealed record with chain digest → PDF export emailed; post-completion mutation attempts return 423; operator read-only Shield view via API.

**Increment 4 (wk 7–8) — Maintenance request + approval + tracker.**
Report sheet + triage integration + projection (R-3.4.1–3.4.2) · approval state machine + operator approval APIs + audit trail (R-3.4.3–3.4.4) · escalation timers + approver chains (R-3.4.5) · tracker + notifications for the core path (R-3.4.6, matrix rows) · job-creation bridge into existing lifecycle + dispatch constraints.
**Milestone:** resident submits with photos → AI card → operator approves via API (Postman-level OK; Portfolio UI is the sibling track) → job dispatched → state changes push to the resident tracker through `Fixed`; SLA breach demonstrably escalates through a 2-person chain.

**Increment 5 (wk 9–10) — Completion loop, emergency, renter-pays, Moving-In.**
Completion photos requirement + CSAT (R-3.4.7) · emergency path + ops pager rota (R-3.4.8) — flag off until rota confirmed · cancellation/more-info/duplicate handling (R-3.4.3, 3.4.9, §4.5) · renter-pays catalog + booking + payment via platform interface + tracker reuse (R-3.5.*) · Moving-In card + handoff + attribution (R-3.7.*) · dual-role switcher + downgrade screen (R-3.2.5, 3.2.7) · production store submission.
**Milestone:** paid renter-pays booking end-to-end incl. refund-on-cancel; Moving-In handoff writes attribution; emergency drill executes the pager + callback; residency end shows downgrade with working Shield export.

**Increment 6 (wk 11–12) — Hardening, gating pen-test, pilot dress rehearsal.**
Full R-NF.1.7 drill matrix on iOS + Android · gating pen-test (§8.2) with fixes · notification matrix QA incl. quiet hours + TCPA opt-out · load test invitation + photo-commit paths · reconciliation job + ops alerts live · pilot metrics dashboard fed by §1.6/§4.6 events · bug burn-down · **20-unit internal dress rehearsal** (real phones, real photos, scripted approver behavior incl. a vacation/escalation scenario) per master-audit attack order.
**Milestone:** GO/NO-GO review against this spec's requirement checklist; zero photo loss across rehearsal; pilot scorecard renders real numbers (invite→accept %, shield completion %, median approval time, CSAT).

**If the schedule holds at 8 weeks** (compressed): merge 5 into 4/6 by cutting renter-pays to catalog+booking without cancellation polish and shipping Moving-In in week 6. Shield durability work (Increments 2–3) is never the thing compressed.

---

## 10 · Requirement index (PR reference)

§1 R-3.1.1–R-3.1.10 · §2 R-3.2.1–R-3.2.8 · §3 R-3.3.1–R-3.3.12 · §4 R-3.4.1–R-3.4.10 · §5 R-3.5.1–R-3.5.7 · §6 R-3.7.1–R-3.7.5 · §7 R-3.9.1–R-3.9.5 · §8 R-NF.1.1–R-NF.1.7, R-NF.3.1–R-NF.3.3 (+ NFR-2/4/5/6 prose requirements).

---

*This spec integrates with, and must not fork, the canonical platform behaviors in `PROLNK_CANONICAL_SPEC.md`. Where this spec and the canonical spec conflict, fix it in the canonical spec first.*
