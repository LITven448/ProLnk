# Design Brief — TrustyPro Builder Edition
## Digital Owner's Manual + New-Home Warranty Portal

**Paste this whole brief into Claude design. Build high-fidelity prototype screens for both surfaces described below.**

---

## The product in one paragraph

When a builder closes on a new house, the buyer today gets a folder of appliance manuals, a paint-code sheet, and a phone number for warranty requests. This product replaces that folder. The home arrives in the app **already documented** — because the builder is the one party on earth who knows everything about the house on day one: every system, every SKU, every paint code, every warranty term. The homeowner gets a living owner's manual; the builder gets a structured warranty portal that kills phone-tag and junk claims. During the 1–2 year warranty window the app becomes the place the home "lives" — then it seamlessly carries the owner into long-term home management.

## Branding

- Co-branded: fictional builder **"Sunbelt Homes"** (warm, premium new-home builder feel) powered by **TrustyPro**. Builder logo/colors lead on the welcome surfaces; TrustyPro brand on the platform chrome.
- Do NOT use any real builder's name or logo.
- Tone: proud new-home moment. This is a gift the buyer receives at closing, not a utility app. Sell the feeling of "your home came with its records."

---

## SURFACE 1 — Homeowner mobile app (design 7 phone screens)

**Screen 1 — Closing-day activation.**
Welcome screen after scanning the QR code from the closing folder: "Congratulations on your new home at 4812 Juniper Trail." Builder-branded hero, then "Your home's complete records are ready — built by Sunbelt Homes, kept for life." Single CTA: "Open my home."

**Screen 2 — Home profile (the digital owner's manual).**
The wow screen. The home is ALREADY fully documented — no setup work. Show:
- Systems registry, pre-loaded from builder construction records: HVAC (brand/model/serial/install date), water heater, kitchen appliances, roof material + install date, electrical panel, water shutoff location (with photo).
- "Finishes & materials" card: paint colors by room (with actual color chips + codes), flooring SKUs, countertop, fixture models.
- A completeness meter reading 100% with the label "Documented at construction by your builder."

**Screen 3 — Warranty hub.**
The coverage ladder with live countdown clocks:
- 1-Year Workmanship — "247 days remaining"
- 2-Year Systems (plumbing/electrical/HVAC distribution) — "1 yr 8 mo remaining"
- 10-Year Structural — "9 yrs 8 mo remaining"
- Below: per-appliance manufacturer warranties as a list (range, dishwasher, water heater…), each with its own expiry.
Everything is glanceable: what's covered, by whom, until when. CTA: "Report a warranty issue."

**Screen 4 — Warranty request flow.**
Photo-first: homeowner snaps the problem (use a nail pop / drywall crack as the example). AI identifies it and — the key moment — renders a **coverage verdict chip**: "✓ Covered — 1-Year Workmanship" with plain-English explanation and "Submit to Sunbelt Homes" CTA. Show a second state on the same screen concept: "Not covered — homeowner maintenance" with the pivot CTA "Get 3 quotes from vetted pros instead."

**Screen 5 — Request tracker.**
Submitted claim moving through: Received → Approved → Scheduled (crew + date/time window) → Completed, with completion photos and "confirm the fix" step. Timeline style, builder-branded, calm and reassuring.

**Screen 6 — Construction photo archive.**
Pre-drywall photos of the actual walls: "See inside your walls — plumbing, wiring, and framing photographed before drywall." Room selector, then photo grid with tags (wiring runs, pipe locations, blocking). Caption the value: "Hanging a TV? Know exactly where everything is. Forever."

**Screen 7 — Warranty graduation.**
The countdown hits zero: "Your builder workmanship warranty ends in 30 days." Shows (a) a pre-expiration walkthrough checklist ("report these common items before coverage ends"), (b) the handoff: "Your home's care doesn't stop — here's your seasonal maintenance plan," and (c) an extended home-warranty offer card. This screen is the bridge from builder app to lifetime home app.

---

## SURFACE 2 — Builder warranty dashboard (design 3 desktop screens)

**Screen A — Warranty queue.**
List of incoming requests across communities. Columns: home address / community, issue (AI-classified: trade + severity), coverage determination (Workmanship / Systems / Manufacturer / **Not covered — auto-resolved**), age, status. Filters by community and trade. Show a stat row up top: open requests, avg. days to close, % auto-resolved before reaching the team (make it ~31% — the junk-claim killer).

**Screen B — Claim detail.**
One request opened: homeowner's photos, AI triage summary (issue, trade, severity, coverage basis with the warranty clause it maps to), full home context in a side panel (systems registry, construction photos of that room). Actions: Approve → assign to the original trade subcontractor (dropdown of the builder's subs) or to the TrustyPro vendor network; Deny with reason (sends plain-English explanation + pro-quote alternative to homeowner); Request more photos.

**Screen C — Warranty analytics.**
The screen that sells builders: defect trends across their portfolio. Charts: requests per home by community, top issues by trade, requests by construction vintage, and a callout insight card — "Door hardware failures 3.2× above baseline in Willow Creek — vendor lot #4471." Label the section "Build-quality feedback loop."

---

## Design rules

- Photo-first everywhere; the homeowner never types a description if a photo can do it.
- Coverage verdicts always in plain English with the why — never legalese.
- No prices anywhere in the warranty flow; prices appear only in the "not covered → get quotes" pivot.
- Warm, premium, calm. This app is part of the new-home experience — closer to a keepsake than a ticketing tool.
- Mobile screens: iPhone frame. Desktop: clean data-dense SaaS, consistent with a property-operations product.
