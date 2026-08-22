# Platform Architecture — How Many Apps, and Who Gets Their Own
**The decision that determines whether new enterprise deals cost weeks or months.**

---

## The rule

**Build 4 codebases. Configure them into many experiences. Never fork.**

Every enterprise customer will ask for "just one custom thing." If that request forks the codebase, the company dies of maintenance by year three. If it's a configuration row, the next customer takes days instead of months.

---

## The 4 things to build

### 1 · Consumer mobile app — ONE app, two modes
| | |
|---|---|
| Personas | Homeowner (TrustyPro) · Resident/renter (TrustyPro Renters) |
| Why one app | A renter who buys a house **keeps the app and switches modes**. Two apps means re-acquiring that user and losing the home history. This is the renters-become-owners pipeline — do not split it. |
| Mode differences | Resident mode: no prices, no vendor names, no marketplace, operator-branded, approval-gated. Homeowner mode: full marketplace, prices, Vault, financing. |
| Enforcement | Gating is server-side by mode, never client-side. Test-enforced. |

### 2 · Pro app — mobile-first, with a web business view
| | |
|---|---|
| Personas | Company owner/admin · Individual technician (ProPass) · Scout (origination only) |
| Owner sees | Earnings, network/downline, subscription, team, compliance docs, job pipeline |
| Tech sees | Assigned jobs, on-site checklist, photo capture, badge, their own docs — **not** company financials |
| Scout mode | Address claiming, photo origination, residuals. A **mode**, not a separate app. |
| Web view | Business management only (reporting, team, billing). Field work is mobile. |

### 3 · Enterprise console — ONE codebase, tenant-configured
**This is the big one.** All of the following are the same product with different configuration:

| Tenant type | What it's called there | Work item |
|---|---|---|
| Property operator (AMH) | TrustyPro Portfolio | Maintenance request |
| Commercial contractor (CoolSys) | Service Network | Work order |
| Homebuilder | Warranty Portal | Warranty claim |
| HOA management co. | Community Portal | Violation / ARC request |
| Warranty administrator | Claims Console | Claim |

They share the identical spine: **item arrives → AI triage → approve/assign → dispatch to internal crew or vendor → track → complete with photos → pay/report.**

Roles inside a tenant: org admin · regional manager · site/property manager · dispatcher · field crew · executive (read-only dashboard). Same screens, different scope and permissions.

### 4 · Internal admin console — the one everyone forgets
Support cannot work without it, and it is always discovered late. Needs: user/tenant lookup and impersonation (audited), job and payment inspection, refunds/disputes, vendor approval queue, content moderation, **AI agent monitoring + kill switch**, ledger reconciliation, feature flags, tenant configuration editor.

**Not a fifth app:** the **channel partner portal** (Utility Valet, future operators) is a limited role inside the enterprise console — attribution, volume, earnings statements. Don't build it separately.

---

## What's configuration, not code

Per tenant, all editable without a deploy:
- Branding (logo, colors, product name)
- **Taxonomy** ("maintenance request" vs "work order" vs "warranty claim" vs "violation")
- Roles and permission sets
- Workflow rules (approval thresholds, NTE limits, escalation ladders, SLA definitions)
- **Enabled modules** — refrigerant compliance for CoolSys, capex forecasting for AMH, warranty ladder for builders, ARC review for HOAs
- Integrations (Yardi/RealPage vs ServiceChannel/Corrigo)
- Revenue-share configuration

## What's shared and built once
Auth/SSO · work-item state machine · AI triage · photo capture, storage, and classes (documentation / job_record / render) · vendor registry + compliance engine (license, COI, expiry, fail-closed dispatch gating) · matching and dispatch · payments, escrow, and all ledgers · attribution registry · notifications · reporting engine.

**Test:** if a feature request can't be met by config, ask whether the *config layer* should be extended rather than the app forked. Forking is a last resort requiring founder sign-off.

---

## Build order against the 120-day plan

**In scope by Day 120:** consumer app (resident mode; homeowner mode already exists), pro app (parity check), enterprise console configured for **one tenant type only — AMH**, internal admin console (thin but real).

**After launch:** CoolSys tenant config, builder warranty config, HOA config, channel partner role, executive dashboards per tenant.

**The one thing that must happen NOW, at design time, and costs nothing extra:** build the enterprise console against a **tenant/persona configuration model** instead of hard-coding "property operator." Doing this in Phase 2 is free. Retrofitting it after CoolSys signs is a rewrite.

---

## For enterprise pitches: show three views, never one

A single-persona prototype reads as a demo, not a system. Every enterprise pitch shows the full loop:
1. **The frontline daily screen** — the dispatcher, property manager, or approver who lives in it all day
2. **The mobile field view** — the tech or vendor actually doing the work, with photo evidence
3. **The executive dashboard** — the metrics the person signing the contract is measured on

Optionally a fourth: **the end customer's view** (resident, homeowner) — proves the loop closes.

The buyer needs to see that their whole organization is covered, not one job function. This is why the AMH and CoolSys prototypes each include operator screens, mobile field screens, and an executive view.
