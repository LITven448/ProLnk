# 120-Day Launch Plan — ProLnk · TrustyPro · TrustyPro Renters
**Day 0 = plan acceptance. Functioning platform Day 90. Testing Days 90–120. LIVE Day 120.**

---

## The scope decision that makes 120 days possible

"Everything perfect" in 120 days means **everything in scope is perfect — and scope is ruthless.** The master audit holds ~93 items; roughly 60 are launch-critical. The rest are *deliberately deferred*, not forgotten. A team that tries to ship all 93 ships none of them well.

### IN — must be perfect at Day 120
- ProLnk pro side: onboarding, verification, job lifecycle, commission engine (canonical, single implementation), payouts
- TrustyPro homeowner core: add home → photos → AI findings → request → match → track → pay → review; Home Vault v1
- TrustyPro Renters: full P0 (invite, resident gating, Move-In Shield, maintenance request, tracker, Utility Valet handoff)
- Operator dashboard: approval queue + assignment + pilot metrics (thin version done perfectly)
- Vendor program: intake v2, $99–$249 subscriptions, $5–8 per-work-order fee, no free tier
- Payments: new processor live, escrow-style hold/release, all ledgers (pro cascade, operator share, channel partner)
- Data plumbing: attribution registry, PII stripping/masking, consent chain, qualified-record schema v1
- AI: triage with versioned output contract + golden test set; Move-In Shield cataloguer (human-QA loop OK); agent audit complete
- Trust & safety: security baseline, E&O/cyber bound, legal doc set through counsel, support playbook staffed
- Apps in both stores

### OUT — explicitly deferred (do not let anyone sneak these in)
- Rendering/commerce engine and Shop tab (Phase 2 — biggest scope-creep risk)
- Data monetization tiers 2–5 (need volume first)
- Financing integrations (Wisetack outreach continues; integration post-launch)
- Full PMS read-write sync (CSV import at launch; Yardi/RealPage per first big operator after)
- Virtual Badge, ProPass gating marketing, anything on the CIP list (patent filing first — hard legal gate)
- Auto-approval rules engine (manual approval fine at pilot volume), SSO/SAML (simple accounts), 1099 pipeline (Q4 deadline, not launch), homeowner P&C insurance, GPO/supply, inspection channel build

---

## PHASE 1 — Foundations (Days 1–14)
*Nothing else works if these are wrong. All hands.*

| # | Item | Owner |
|---|------|-------|
| 1.1 | **Kill both legacy commission routers** (`network.processJobCommissions`, `commissions.distributeCommissions`); ledger sweep for wrong/double pays; canonical engine becomes the only path | Dev |
| 1.2 | Execute remaining items of the 15-item commission fix list; run the test-vector suite green | Dev |
| 1.3 | **Attribution registry** (address → origination source, permanent) + bulk CSV import with attribution tagging | Dev |
| 1.4 | AI triage output contract v1 (issue/trade/severity/cost-band JSON) + golden test set started (500 labeled photos) | Dev + Andrew (photo sourcing) |
| 1.5 | Payment processor decision — Moov demo, contract signed | **Andrew** |
| 1.6 | Checkr production account + webhooks | **Andrew** (account) + Dev (wiring) |
| 1.7 | Apple + Google developer accounts opened (longest external lead time) | **Andrew** |
| 1.8 | Business attorney engaged; legal doc set handed over for counsel pass | **Andrew** |
| 1.9 | E&O + cyber quotes requested (Vouch/Embroker/Founder Shield — sheet exists) | **Andrew** |
| 1.10 | Analytics/event tracking foundation (pilot metrics must be measured from day one of testing) | Dev |
| 1.11 | Environment truth: confirm Render/TiDB vs Azure cutover date; freeze target stack for launch | **Andrew + Joe** |

**Gate 1 (Day 14):** commission engine single-path and test-green; processor contracted; attribution live. **Miss this gate and every downstream date slips — treat it as sacred.**

## PHASE 2 — Build the new surfaces (Days 15–45)
*Two parallel tracks. This is the heaviest lift.*

**Track A — Renters (per renters-p0-build-spec.md):**
- Operator-branded invite → resident account → address confirm
- Resident gating: no prices, no vendor names, no marketplace (legal + deal requirement; test-enforced)
- **Move-In Shield**: guided capture, progress, timestamped durable storage (photo-durability release gate from the spec applies — photo loss = deal loss)
- Maintenance request: photo → triage → operator approval → dispatch → tracker → completion photos
- Moving-In hub with Utility Valet handoff link (v1 = link-out)

**Track B — Operator dashboard + vendor program (per operator-dashboard-pilot-spec.md / vendor-intake-spec.md):**
- Approval queue + claim detail + approve/deny/assign (in-house crew vs vendor)
- Pilot metrics screens (cost/WO, approval time, turn days, adoption) — the pilot IS these numbers
- Vendor intake v2 + subscription billing ($99–$249) + per-WO fee netting on the new processor
- PII stripping/masking pipeline (promised in every partner doc — must be real)

**Homeowner side in parallel (smaller):** rebuild-parity check on the core journey; Home Vault v1 record store; seasonal alerts wiring if time allows (else defer).

**Gate 2 (Day 45):** a resident can complete Move-In Shield and file a request; an operator can approve/assign it; a vendor gets dispatched and the ledger accrues correctly — end to end on staging.

## PHASE 3 — Money, hardening, ops (Days 46–75)

- Payments migration complete: hold/release live on new rails; Stripe fully retired; refunds/disputes flow + reserve policy
- All three ledgers reconciling to the penny: pro cascade, operator share (subs/commerce/move-out/data), channel partner (Patrick L1)
- Move-In Shield durability hardening: backup verification, restore drill, corruption checks
- Security baseline provable: encryption, backups + tested restore, audit logs, access controls; security questionnaire pack updated to match reality
- Support playbook staffed (28 macros live), status page, incident comms
- Vendor recruiting kit + resident adoption kit produced with AMH branding variables
- Legal docs back from counsel, signed versions loaded (operator MSA, resident ToS/privacy, lease addendum, vendor terms, pro amendments)
- App store submissions IN by Day 70 (review buffer)

**Gate 3 (Day 75):** real money moves correctly on staging with test accounts; insurance bound; apps submitted.

## PHASE 4 — Integration freeze + dress rehearsal (Days 76–90)

- **Day 76: feature freeze.** Nothing new ships after this — only fixes.
- 20-home internal dress rehearsal: real phones, real photos, real (test) money, every role played by a human — resident, operator admin, vendor, pro, support
- Full payout dry run: month-end close simulated, every ledger hand-audited against the canonical spec
- Load test at 10× pilot volume; chaos drill (kill a service mid-request, verify recovery + no data loss)
- Fix list from rehearsal burned down to zero P0/P1

**Gate 4 (Day 90): "FUNCTIONING."** Definition: a stranger can complete every core journey without help, and every dollar lands where the spec says.

## PHASE 5 — The 30 days of testing (Days 91–120)

| Days | Activity |
|------|----------|
| 91–97 | Structured QA sweep: every screen, every state, every role; accessibility + device matrix (old Androids included — residents don't have new phones) |
| 91–105 | **Friendly-user beta**: 50–100 real users (waitlist homeowners, founding pros, 2–3 friendly vendors) on production rails with real money, small volume |
| 98–105 | External security pen-test; fix criticals; PII pipeline audit |
| 106–112 | **AMH staging UAT** if the deal is signed (their team drives the dashboard with seeded data); else simulate with Patrick's team as proxy operators |
| 106–115 | Payout cycle #2 in the wild; reconciliation must be zero-variance twice in a row |
| 113–117 | Regression pass on everything fixed; freeze again |
| 118–119 | Go/no-go review against launch criteria (below) |
| 120 | **LIVE** |

### Go/no-go criteria — the five things that must be perfect
1. **Zero photo loss.** Move-In Shield storage passes backup/restore/corruption drills. One lost photo set = deal-killing headline.
2. **Payouts exact.** Two consecutive zero-variance payout cycles. Money errors end marketplaces.
3. **Gating never leaks.** No price, vendor name, or marketplace content ever reaches a resident session — verified by automated tests, not eyeballs.
4. **Triage accuracy floor** hit on the golden set (per the output-contract spec), with human-QA fallback wired.
5. **Uptime + recovery**: chaos drill passes; status page and incident process real.

If any of the five fails at Day 118: **launch slips, scope doesn't.** A late perfect launch recovers; a broken one doesn't.

---

## Andrew's personal critical path (long-lead items — start Week 1, all of these block someone else)
1. Payment processor contract (blocks all of Phase 3)
2. Apple/Google dev accounts (blocks store submission Day 70)
3. Business attorney hired (blocks legal docs Day 75, Patrick JV, warrants)
4. Checkr production account (blocks vendor verification)
5. E&O/cyber bound (blocks first real dispatch)
6. Patent NP filing + CIP decisions with patent attorney (blocks marketing Move-In Shield publicly)
7. AMH decisions as talks progress: final rate card confirmations, pilot market selection, UAT participants
8. Patrick agreement signed (blocks Utility Valet handoff + channel ledger config)

## Standing risks to watch weekly
- **Dev team velocity** — this plan assumes the team can run two parallel tracks in Phase 2. Two weeks in, if Gate-1 items are slipping, the honest fixes are: add contract engineers (costs money) or cut homeowner-side polish (costs scope) — never cut testing.
- **App store review** — submit Day 70, not Day 85; a rejection cycle eats 1–2 weeks.
- **Payments migration** — the most common source of silent week-long slips; demo and contract in Week 1 or Phase 3 compresses dangerously.
- **Azure cutover mid-plan** — do NOT migrate infrastructure during Phases 3–5. Either cut over before Day 45 or after Day 120. A platform migration during testing invalidates the testing.
