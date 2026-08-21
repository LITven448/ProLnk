# PROMPT D — paste this whole file into Claude design (NEW prototype: CoolSys Service Network)

Create a **new, separate prototype**: **CoolSys Service Network** — a white-label desktop web platform that a national commercial refrigeration/HVAC contractor uses to dispatch, track, and escalate work orders across its subcontractor network. Design at **1440×900 desktop**, plus **3 mobile screens** for the field subcontractor at the end.

This is a **white-label pitch prototype**: it must look like CoolSys's own internal system, not like a vendor's product. No third-party logos. A single small "Powered by ProLnk" mark in the sidebar footer only.

## Brand & register
- **CoolSys palette:** deep navy **#0B2545** primary, ice-blue accent **#2E8BC0**, cool light tint **#EAF3F9**, canvas **#F7F9FB**, white cards, borders **#DDE5EC**, text **#0F172A** / **#475569**. Status colors used for data only: success **#15803D**, warning **#D97706**, critical **#DC2626**, breach **#991B1B**.
- Register: serious industrial operations software. Data-dense, calm, high-contrast, fast to scan at 6am in a branch office. Think Linear/Stripe discipline, not consumer polish. Cards rounded-lg, 1px borders, minimal shadow.
- **Top bar:** CoolSys wordmark left (set as text, navy, letterspaced), global search ("search work order, site, vendor"), a red **live emergency counter** chip ("3 P1 ACTIVE"), notification bell, user chip "M. Delgado · Regional Dispatch Manager — Southwest".
- **Left sidebar nav** (icons + labels): Dispatch Board · Escalations (badge 7) · Vendor Network · Sites & Assets · Refrigerant Compliance · Invoicing · Reports · Settings. Include a collapsed-state variant.
- Every table: sticky header, sortable columns, filter row, CSV export icon, 25-row pagination. Every screen: loading skeleton + empty state.

## Domain language — use these exact terms, they signal credibility
Work order (WO), truck roll, first-time fix rate, callback, PM (preventive maintenance), NTE (not-to-exceed), self-perform vs. subcontracted, RTU (rooftop unit), walk-in cooler/freezer, display case, condenser, evaporator, compressor, refrigerant charge, leak rate, EPA Section 608, R-448A / R-404A / CO₂ transcritical, P1–P4 priority, SLA clock, dispatch board, branch.
Site types: grocery, c-store, restaurant, cold storage warehouse, data center, hospital, school.

---

## Screen 1 · Dispatch Board (the daily driver — most detailed screen)

Top **KPI strip** (6 stat cards): Open work orders **312** · P1 emergencies **3** · SLA at risk **11** · Self-perform vs. sub **68% / 32%** · Avg. time to dispatch **17 min** · First-time fix **79%** (▲1.8%).

**Main table columns:** WO # · Site (name + city/state, with site-type icon) · Issue ("Walk-in freezer not holding temp — 28°F rising") · Priority chip (**P1 Emergency** red / **P2 Same-day** orange / **P3 Next-day** blue / **P4 Scheduled** gray) · **SLA clock** (live countdown pill — green >2h, amber <1h, red BREACH) · Source (small badge: "ServiceChannel" / "Corrigo" / "Direct") · Assignment (avatar+name for self-perform tech, or building icon + vendor name, or **"⚠ Unassigned"** in red) · NTE ($750) · Age.

Include at least 12 realistic rows — mix of grocery chains, c-stores, a hospital, a cold storage warehouse. Two rows must be unassigned P1s in red.

**Right rail — "Needs attention":** "2 P1 unassigned >12 min" · "Vendor: Arctic Air COI expired yesterday — 3 open WOs" · "Site #4471 third callback this month" — each row deep-links.

**Assignment drawer** (opens right, 520px, the centerpiece — design this in full):
- WO header with SLA countdown and site info
- **Recommended resources ranked list**, each row showing: name, self-perform or sub badge, distance ("14 mi"), ETA ("~38 min"), trade match, current load ("2 open WOs"), first-time-fix rate ("84%"), and a **compliance chip** — green ✓ "Insured · Licensed · EPA 608 current" or red ⚠ "COI expired 8/12 — blocked"
- A **blocked** vendor row must be visibly disabled with the reason, showing the platform prevents non-compliant dispatch
- Buttons: **Dispatch** (primary) · Offer to top 3 (first-accept) · Escalate to branch manager

## Screen 2 · Escalations & SLA

Purpose: the screen that proves nothing falls through the cracks — this is what Excel cannot do.

- **Escalation ladder visualization** (horizontal stepper): Dispatched → No accept in 15 min → Auto-offer widened → Branch manager alerted at 30 min → Regional director at 60 min → Client notified. Show one live WO moving through it with timestamps.
- **Active escalations table:** WO · Site · Priority · Escalation level (L1/L2/L3 chips) · Time in current level · Owner · Last action · Next auto-action ("Regional director in 12 min").
- **Breach log** below: SLA breaches this month with cause codes (no vendor coverage, parts delay, access denied, callback), and a small trend chart of breaches by branch.
- **Rules panel** (modal): "IF P1 AND no acceptance in [15] min THEN widen offer radius to [50] mi AND alert [Branch Manager]" — editable rule rows, add-rule button, audit note "All escalations logged with actor and timestamp."

## Screen 3 · Vendor Network (the census — the "you don't know what you have" screen)

- **Header stat row:** Total vendor firms **1,247** · Active last 90 days **612** · **Compliance current 71%** (ring, amber) · **COI expiring in 30 days: 88** (red) · States covered **43**.
- **Coverage map** of the US: states shaded by coverage depth (navy = strong self-perform, ice-blue = sub-covered, light gray with hatch = **gap**). Legend. Callout markers on 3 gap states: "Montana — 0 vendors · 4 sites."
- **Vendor table:** Firm name · Branch relationship · Trades (chips: Refrigeration / HVAC / Electrical / Plumbing) · States served · **Compliance status** (✓ Current / ⚠ Expiring 14d / ✗ Expired — with the specific document named) · EPA 608 techs (count) · WOs completed (90d) · First-time fix % · Avg. response · Rating.
- Show at least 10 rows with a realistic mix, including 2 expired and 3 expiring.
- **Bulk action bar:** "Request updated COI from 88 vendors" — one-click compliance chase.

## Screen 4 · Vendor Detail / Scorecard

Single vendor opened: header with firm name, primary contact, service area map inset, onboarding date.
- **Compliance panel:** document cards for General Liability, Workers' Comp, Auto, W-9, MSA, EPA 608 certs — each with expiry date, status chip, and uploaded-file preview. Expired items in red with "Dispatch blocked" note.
- **Performance panel:** 6 stat tiles (WOs completed, first-time fix, avg. accept time, avg. on-site time, callback rate, invoice accuracy) + a 12-month trend line.
- **Work history table** and **payment history** (invoices submitted, approved, paid, avg. days to pay — with "Avg. 11 days" highlighted, supporting the expedited-payment promise).

## Screen 5 · Work Order Detail

- Left: issue summary, site info, equipment involved (pulled from asset registry: "Hussmann display case, R-448A, installed 2019, 3rd service this year"), full **timeline** (created → dispatched → accepted → on-site → parts ordered → completed → invoiced) with timestamps and actors.
- Center: **field photo grid** from the technician (before/after), tech notes, parts used table with costs against NTE.
- Right: SLA clock, priority, client contact, NTE authorization with an "Request NTE increase" action, and the **client-visible status** toggle showing what the grocery chain sees on their end.

## Screen 6 · Refrigerant Compliance (the screen no competitor shows)

EPA Section 608 requires tracking refrigerant leak rates on commercial systems — this is a legal obligation that lives in spreadsheets today.
- **Stat row:** Systems tracked **8,940** · Systems over leak-rate threshold **37** (red) · Repairs due in 30 days **14** · Refrigerant added YTD **41,208 lbs** · Reclaimed **9,415 lbs**.
- **Table:** Site · System ID · Refrigerant type (R-448A / R-404A / CO₂) · Full charge (lbs) · Added last 12 mo · **Calculated annual leak rate %** (with a bar, red over the 20% commercial-refrigeration threshold) · Repair deadline · Verification test status.
- **Callout card:** "3 systems exceed threshold with repair deadlines inside 14 days — EPA verification testing required."
- Small chart: leak rate trend by refrigerant type; note the CO₂ transcritical conversions trending down.

## Screen 7 · Executive Dashboard (design this one to impress a CEO)

This is the screen shown to leadership and to Ares. Every metric should map to EBITDA, risk, or client retention.
- **Hero row (4 large stat tiles):** SLA compliance **94.2%** (▲3.1 pts) · Cost per work order **$418** (▼$37) · Days sales outstanding **41** (▼9) · Compliance exposure **$0 uninsured dispatches** (was 14 last quarter).
- **"Before / After" comparison band** — two columns, spreadsheet era vs. platform: time to dispatch 47 min → 17 min · SLA breaches/mo 63 → 19 · uninsured dispatches 14 → 0 · avg. days to invoice 23 → 11. Understated styling, no marketing language.
- **Branch leaderboard table:** 110 branches ranked by SLA compliance and cost per WO, top 5 and bottom 5 shown.
- **Charts:** work orders by month (stacked self-perform vs. sub); first-time-fix trend; cost per WO by trade.
- **Acquisition integration tracker:** small card — "22 acquired companies · 19 fully onboarded · 3 in migration" with a progress bar. This speaks directly to the rollup problem.

---

## MOBILE — Subcontractor field app (3 phone screens, iPhone frame)

**M1 · Job offer.** Push-style card: "P1 EMERGENCY — Walk-in freezer down. Kroger #4471, Plano TX. 14 mi · NTE $750 · Respond within 15:00." Big **Accept** / Decline buttons with a live countdown ring.

**M2 · On-site job.** Checklist flow: Arrive (GPS-stamped) → capture equipment nameplate photo → diagnose (trade/issue picker) → parts used → **before/after photo capture** with a required-shots progress bar → customer signature → Complete.

**M3 · Earnings & compliance.** "Paid in 11 days average." List of completed WOs with payment status, plus a compliance card: "General Liability expires in 22 days — Upload renewal" with an upload button.

---

## Design rules
- Never show a non-compliant vendor as dispatchable — the blocked state must be visible on screen, it is a core selling point
- SLA countdowns and priority are the loudest elements on any screen; everything else recedes
- Photo evidence appears on every completed job
- No consumer-app flourishes: no gradients, no illustrations, no rounded-full buttons. Industrial and precise.
- Include realistic data everywhere — real-sounding grocery/c-store chain names (invented, not real brands), Texas and Southwest cities, plausible dollar amounts
