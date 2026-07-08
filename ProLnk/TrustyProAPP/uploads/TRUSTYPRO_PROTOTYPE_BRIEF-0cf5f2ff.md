# TrustyPro Prototype — Design Brief
*Paste this (or sections of it) into the Claude design tool to keep refining the prototype. It's built from the REAL app + backend, so whatever you design here ports cleanly into the live product later.*

## What TrustyPro is (the framing)
The **homeowner-facing** side of the platform. Homeowners use TrustyPro to understand, maintain, and improve their home — and to get matched with vetted, background-checked pros. **Free for homeowners.** It should feel calm, trustworthy, premium, and effortless — like a concierge for your home, not a lead-gen form. Pros never appear here; they live on ProLnk.

## Brand / visual system (keep consistent)
- **Palette:** indigo primary `#4F46E5`, white surfaces, soft neutral backgrounds, rounded corners (xl/2xl), generous whitespace. Warm and reassuring, not corporate-cold.
- **Tone:** plain-spoken, homeowner-friendly, confidence-building. No jargon, no "leads," no commission/financial talk.
- **Type:** clean sans (Inter). Big friendly headings, readable body.
- Mobile-first — most homeowners are on phones.

## The screens to design (and the REAL data each one has)
Design these as the core journey. The data fields listed are what the backend actually provides, so mirror them:

1. **Home / Welcome**
   - Hero: "Your home, handled." Primary action: scan your home OR request service.
   - If returning homeowner: their home(s), health score, recent activity.

2. **Add / Scan Home**
   - Address autofill → auto-pulls real property data (ATTOM): beds, baths, sq ft, year built, stories, garage, lot size, pool, etc. (≈12 fields available).
   - Upload/take photos → AI scan.

3. **Home Health Vault** (the signature screen)
   - A **Home Health Score** (0–100) with a clear ring/gauge.
   - Property facts (from ATTOM).
   - Detected issues / opportunities from the AI photo scan: each has `category`, `severity` (low/medium/high/urgent), `description`, `trade`, `estimated cost range`.
   - "All clear" state when nothing's found (positive, not empty).
   - Scan history timeline.

4. **Request Service**
   - Trade/category picker, address (autofill), scope description, contact.
   - Calm, 2–3 step, not a 15-field form.
   - Success → tracking link.

5. **Request Status / Tracking** (`/my-request`)
   - Status timeline: **Submitted → Matching → Pro Assigned**.
   - When assigned: the matched pro's business name + trade + "they'll be in touch."

6. **The Rendering + "Shop This Look"** (the wow moment)
   - AI rendering of a room *improved/repaired*.
   - Below it: purchasable products placed in the room (furniture, rugs, lighting) with prices → tap to shop.
   - Optional AR "view in my room."

7. **Proactive Notification** (the moat, as a screen/state)
   - "We noticed something at your home" — a detected issue + before/after render + "Get a quote" opt-in.

## The journeys (design the flow, not just screens)
- **New homeowner:** land → add home (autofill) → scan → see Health Vault + score → (optionally) request service on a finding → track → matched.
- **Returning:** home dashboard → vault → request service → track.
- **Proactive:** receives "we noticed something" → views render → opts in → tracked.

## Functional behaviors the design must account for (so it ports)
- Address autofill drives property data — design the "magic autofill" moment.
- The matching is **invisible** to the homeowner — they request, they get matched; no bidding, no pro list to choose from. Design for "we'll find the right pro," not a marketplace browse.
- "Nothing found" is a real, positive state — design it.
- No prices/commissions about the *platform* — only consumer product prices in "shop this look."

## How to refine effectively in the Claude design tool
1. **One screen per iteration.** "Design the Home Health Vault screen" → refine → then the next. Don't try to do all 7 at once.
2. **Feed it the real data fields** (above) so the screen shows realistic content, not lorem ipsum.
3. **Lock the brand tokens** in your first message (indigo #4F46E5, rounded, mobile-first) so every screen is consistent.
4. **Ask for component-structured output** ("build it as reusable components: HealthScoreRing, FindingCard, etc.") — that makes porting to the real app far easier later.
5. **Keep a running spec** — each time you finalize a screen, note what's locked. This doc is the start of that.

## When you're ready to make it real
Tell me "port the prototype" and share the artifact (paste the code or describe each screen). I'll rebuild the screens you've locked into the live TrustyPro app, wired to the real backend (`submitJobRequest`, `getRequestStatus`, the photo-scan + rendering pipeline, the Home Health Vault data) — turning the blueprint into the functional product. The backend for all of this already exists and works; the prototype just decides how it looks and feels.
