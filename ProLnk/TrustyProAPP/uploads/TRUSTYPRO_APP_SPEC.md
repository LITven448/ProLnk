# TrustyPro App — Design Spec

**For Claude Design / Figma prototyping**
**Brand:** TrustyPro (homeowner side of ProLnk ecosystem)
**Platform:** Mobile-first (iOS + Android via React Native), responsive web fallback

---

## 1. The Concept in One Paragraph

TrustyPro is a homeowner app that builds a complete profile of your home — every room, every system, every appliance — and assigns a single **Home Health Score** (0–100). The user's job is to scan and document each space; the app guides them through what to capture using public property data we pre-populate at sign-up. As the score rises, risks surface (aging HVAC, recalled panels, expired warranties), and from any captured item the user can either **book a trusted pro**, **plan it themselves with material affiliate links**, or **export reports** (free for them, monetized B2B).

Visual feel: Architectural Digest meets Apple. White, sophisticated, photography-led. **Not** gamified, **not** childish, **not** "level up" — it's adult, rigorous, beautiful.

---

## 2. Brand Tokens

### Color
```
Background           #FFFFFF   (90% of all screens)
Surface              #FAFBFC   (cards, secondary panels)
Brand Navy           #0A1628   (primary brand, headings, dark CTAs)
Brand Blue           #1A73E8   (accent, links, primary CTAs)
Soft Blue Tint       #E8F0FE   (badge backgrounds, highlights)
Text Primary         #0F172A
Text Secondary       #475569
Text Muted           #94A3B8
Border               #E5E7EB
Border Subtle        #F1F5F9
Success Green        #10B981   (sparingly — completion, verified status)
Warning Amber        #F59E0B   (maintenance reminders)
Risk Red             #EF4444   (safety flags only — use sparingly)
```

### Typography
```
Display headings     Fraunces or Recoleta (serif), 700 weight
Section headings     Inter Display 700
Body                 Inter 400 / 500
Numbers / IDs        JetBrains Mono 500
```

Type scale:
- Display: 40–56px (welcome screens)
- H1: 28px
- H2: 22px
- H3: 18px
- Body: 16px
- Caption: 14px
- Micro: 12px

### Spacing (4px base unit)
- xs: 4 / sm: 8 / md: 16 / lg: 24 / xl: 32 / 2xl: 48 / 3xl: 64

### Radius
- Cards: 16px
- Buttons: 12px (or pill 999px for primary CTA)
- Photos: 12px
- Small chips: 8px

### Shadows
- Card rest: `0 1px 3px rgba(15, 23, 42, 0.04)`
- Card hover/focus: `0 4px 16px rgba(15, 23, 42, 0.08)`
- Floating CTA: `0 8px 24px rgba(26, 115, 232, 0.16)`

### Photography style
- Real interior/exterior photos of beautiful homes
- Natural light, slight desaturation
- Reference: Apple website, Architectural Digest, Hem.com, Nordstrom Home
- **Avoid:** stock photos of "happy contractor", cartoon house illustrations, anything Canva-templated

---

## 3. Information Architecture

### Bottom tab bar (4 tabs)
1. **Home** — the hub (Home Profile, Health Score, what's next)
2. **Scan** — large center button, launches scan flow
3. **Discover** — articles, inspiration, DIY guides, find pros
4. **Profile** — account, saved homes, settings, perks

### Persistent UI elements
- **Top bar:** small "TrustyPro" wordmark left, profile avatar right
- **Bottom tab bar** always visible except during scan/onboarding

---

## 4. Screen Specifications

### 4.1 Welcome Screen (first launch)

**Layout:** Full-bleed, single-column

**Top half:**
- Full-width hero photo of a beautiful living room interior (natural light, modern style — Hem-like aesthetic)
- Image height: 60% of viewport

**Bottom half:**
- White background, generous padding (32px sides)
- Display headline (Fraunces 48px, navy): *"Know your home like never before."*
- Body (Inter 17px, text-secondary, max 280px wide): *"TrustyPro builds your home's complete profile — so you can protect, maintain, and improve what matters most."*
- Primary CTA button (full-width, brand blue, white text, 56px tall, 12px radius): *"Start your profile →"*
- Below CTA, tiny text-muted link: *"Already have an account? Sign in"*

**Microinteractions:**
- On screen load: subtle fade-in on the headline (200ms)
- Photo: slight Ken Burns zoom on the hero image (slow, 20s loop)

---

### 4.2 Address Entry

**Layout:** Centered single field, lots of breathing room

**Content:**
- Header (Inter 22px navy, 32px from top): *"Where's your home?"*
- Subheader (Inter 15px text-secondary): *"We'll pull your property records and guide you from there."*
- Address autocomplete input field:
  - White with subtle border
  - 56px tall, 16px font
  - Placeholder: *"Enter address"*
  - Right side icon: search magnifier
  - Inline dropdown shows Google-style suggestions
- Below the field, fine print (12px text-muted): *"We use public property records to set up your home. Your data stays private — opt in any time to share."*

**Interaction:**
- As user types, dropdown shows up to 5 address suggestions
- Selecting one auto-advances to next screen

---

### 4.3 "We Found Your Home" Confirmation

**Layout:**
- Top 40%: hero photo (street view of the house if available via Google Maps Static API, else a neutral home illustration)
- Bottom 60%: white card overlapping the photo bottom edge (15% overlap), 24px radius top corners

**Card content:**
- Eyebrow text (12px brand blue, uppercase, letterspaced): *"YOUR HOME"*
- H1 (Fraunces 28px navy): the address — *"1234 Main St, Frisco, TX 75033"*
- Property facts grid (2 columns, 16px gap):
  - **4 bed**
  - **2.5 bath**
  - **2,400 sqft**
  - **Built 2003**
  - **2-car garage**
  - **0.18 acre lot**
- Subtle bottom divider
- Section label (12px text-muted): *"Roof"*
- Detail row: *"Asphalt shingle · est. 22 years old"*
- Section label: *"HVAC"*
- Detail row: *"Central air · gas furnace"*
- Primary CTA: *"Looks right — let's start →"*
- Secondary text-link: *"Edit details"*

---

### 4.4 First Scan — Pre-Scan Coaching

**Layout:** Soft branded background (soft blue tint #E8F0FE), centered content

**Content:**
- Top: small breadcrumb chip (navy on white): *"1 of 11 spaces"*
- H1 (Fraunces 32px navy): *"Let's start with your kitchen."*
- Body (Inter 16px text-secondary): *"Stand in the doorway and slowly pan from left to right. The app will guide you."*
- Two small example photos side-by-side showing the right angle (illustrated or actual reference photos)
- Below photos, 3-step list (numbered, navy circles with white numbers, body text):
  1. *Stand back so the whole room is visible*
  2. *Pan slowly — about 5 seconds per wall*
  3. *Tap the model number on any appliances when you spot them*
- Primary CTA: *"Open camera →"*
- Below CTA: *"Skip — choose a different room"* (text-muted link)

---

### 4.5 Camera / Scan View

**Layout:** Full-screen camera viewfinder

**Overlays:**
- Top bar (semi-transparent navy gradient):
  - Left: close X (returns to coaching screen)
  - Center: *"Kitchen scan"* (white, Inter 17px)
  - Right: flash toggle icon
- Bottom area (semi-transparent navy gradient):
  - Coaching label (white): *"Pan slowly to the right →"*
  - Capture button (large white circle, 80px), centered
  - Counter on right: *"3 / 8 walls captured"*
- Center of viewfinder: AR-style frame guides that animate as the user moves

**Interaction:**
- Auto-capture as user pans (no need to tap each time)
- Subtle haptic on each capture
- When complete: tick animation, slides into next screen

---

### 4.6 Scan Complete

**Layout:** Center-aligned, white background, generous spacing

**Content:**
- Top: small check icon in soft blue circle (subtle, NOT a confetti animation)
- H1 (Fraunces 28px navy): *"Kitchen documented."*
- Body (Inter 16px text-secondary, centered, max 320px): *"We captured 8 angles and 3 appliances. Your Home Health Score just went up."*
- Score widget (large, centered):
  - Circular progress ring (160px diameter)
  - Center number: **"12"** (Fraunces 56px navy)
  - Below number: *"of 100"* (text-muted)
  - Below ring: *"+12 this scan"* in green
- Below score: list of what was captured
  - *"✓ Room dimensions"*
  - *"✓ Refrigerator (LG model LRMVS3006S — tap to view)"*
  - *"✓ Range (GE)"*
  - *"✓ Dishwasher"*
- Primary CTA: *"Continue — Living Room →"*
- Secondary text link: *"Take a break, I'll come back"*

---

### 4.7 Home Profile (THE HUB — most important screen)

**Layout:** Scrollable single-column, white background

**Section 1 — Health Score banner:**
- Full-width card, soft blue tint background
- Left: large score number (Fraunces 64px navy) *"73"* / *"of 100"* below
- Right: small progress ring matching the number visually
- Below number: status text (Inter 14px navy) *"Strong — 3 spaces left to capture"*
- Bottom row: 4 mini-bars showing component breakdown (Completeness · Condition · Maintenance · Safety), each with current % and a thin bar
- Tap → expands to detail screen

**Section 2 — What's next:**
- Section title (Inter 13px uppercase navy letterspaced): *"WHAT'S NEXT"*
- Horizontally scrollable card row (each card 280×160px):
  1. Card: *"Capture your electrical panel"* (illustrated icon, "+10 to score", small CTA *"Scan now →"*)
  2. Card: *"Your HVAC is 14 years old"* (warning amber dot, *"Schedule an inspection"* link)
  3. Card: *"Spring is coming"* (seasonal article, *"Read maintenance guide"*)

**Section 3 — Home inventory (the Pokédex equivalent):**
- Section title: *"YOUR HOME"*
- Tab bar (segmented): **Rooms** · **Systems** · **Appliances** · **Exterior**
- For each tab, a 2-column grid of cards (image + label + status):
  - **Rooms:** Kitchen ✓, Living Room ✓, Master Bed ✓, Bed 2 ✓, Bed 3 (greyed, "Not scanned"), Bath (greyed)
  - **Systems:** HVAC ✓ (14yr), Electrical Panel (greyed), Water Heater ✓, Roof (greyed)
  - **Appliances:** Refrigerator, Range, Dishwasher, Microwave, Washer, Dryer
- Card style:
  - 16px radius
  - Photo or illustrated icon top half
  - Bottom half: name (Inter 15px navy), tiny status (12px text-muted) or chip
  - Subtle border, hover lifts slightly

**Section 4 — Recently captured / activity:**
- Section title: *"RECENT ACTIVITY"*
- Vertical list of 3-5 rows (no card, just clean rows)
- Each row: small thumbnail · activity text · timestamp
  - *"You captured the kitchen — 2 hours ago"*
  - *"3 appliances added — yesterday"*

**Section 5 — Discover:**
- Magazine-style row (full-width photos with overlaid title)
- 2 cards: *"How to prep for storm season"* / *"Should you replace or repair your 12-year-old AC?"*

**Floating Scan button:**
- Large brand-blue pill at bottom (above tab bar), shadow: *"+ Scan something"*
- Persistent across the Home tab

---

### 4.8 Room Detail Card (example — Kitchen)

**Layout:** Bottom-sheet modal or full screen on tap from Home Profile

**Hero:** Full-width photo of the room (one of the captured frames), 16:9
**Below hero:**
- Eyebrow (12px brand blue uppercase): *"ROOM"*
- H1 (Fraunces 26px): *"Kitchen"*
- Stats row (3 columns): *"180 sqft"* / *"3 fixtures"* / *"4 appliances"*
- Tabs: **Photos** · **Items** · **History**

**Photos tab:**
- 3×3 grid of captured photos
- Tap any → fullscreen lightbox

**Items tab:**
- Vertical list of captured items in this room
- Each row: thumbnail · item name · subtle status chip (e.g. "12yrs old, due for replacement")
- Tap any → opens the item's detail (an Appliance or System card)

**History tab:**
- Timeline view: scans, pro visits, maintenance logged
- *"Captured Mar 18, 2026"* / *"Pro service — leak repair — Feb 4, 2026"*

**Bottom action bar (sticky):**
- *"Add a photo"* (secondary button)
- *"Schedule a service"* (primary button — opens TrustyPro pro flow)

---

### 4.9 System Detail Card (example — HVAC)

**Layout:** Same pattern as Room Detail

**Hero:** Photo of HVAC unit (the nameplate close-up if captured, else outdoor condenser)
**Below hero:**
- Eyebrow: *"SYSTEM"*
- H1: *"Central Air Conditioning"*
- Sub-line (Inter 14px text-secondary): *"Carrier · Model 24ACC636A003 · Installed 2012"*

**Status banner:**
- Soft amber background (`#FEF3C7`)
- Icon: clock
- Title (navy 15px): *"Aging — average lifespan reached"*
- Body (text-secondary 13px): *"Most units this age benefit from an inspection to catch issues early."*
- CTA: *"Schedule inspection →"* (text link, brand blue)

**Stats grid (2×2):**
- Age: **14 years**
- Capacity: **3 tons**
- Last service: **None recorded**
- Replacement cost range: **$6,800–$9,200**

**Maintenance log section:**
- *"No service records yet"* placeholder
- CTA: *"Log a service"*

**Bottom action bar:**
- *"Find replacements"* (secondary) — opens DIY shopping
- *"Get inspection quote"* (primary) — opens TrustyPro pro flow

---

### 4.10 Health Score Detail (drill-down from banner)

**Layout:** Single-column scroll, white

**Hero:**
- Large circular score (200px diameter), centered
- Big number, "of 100", status text below

**Components section:**
- 4 stacked cards, one per component (Completeness, Condition, Maintenance, Safety)
- Each card:
  - Component name (H3)
  - Current % (Fraunces 32px navy)
  - Thin progress bar
  - One-line explanation
  - "View what's missing →" link

**Glossary section** (collapsible):
- Plain-language explanation of how the score is calculated

---

### 4.11 Discover tab

**Layout:** Magazine-style scroll, mixed cards

**Hero card (full-width):**
- Large photo (16:9), title overlay at bottom
- *"Spring Home Prep Checklist"*

**Mixed grid below:**
- Articles, DIY guides, "Featured Pros in your area"
- 2-column grid of editorial cards

**Filters at top:**
- Pills: All · Maintenance · DIY · Inspiration · Find a Pro

---

### 4.12 Profile / Account tab

**Layout:** List view, iOS Settings-style cleanliness

**Top section:**
- Avatar (large), Name (H2), Address chip
- Health Score mini-widget on right

**List sections:**
1. **Home**
   - Edit property details
   - Add another property
2. **Perks & Savings**
   - Verified Home Status
   - Active discounts
   - Referral code
3. **Reports**
   - Download Home Health Report (PDF)
   - Pre-listing report (premium)
4. **Settings**
   - Notifications
   - Privacy & data
   - Sharing
5. **Help**
   - Support, FAQ, About

---

## 5. Component Library Needed

### Cards
- **HomeCard** — generic content card with optional photo header
- **RoomCard** — grid item: photo + label + status chip
- **SystemCard** — grid item: icon + label + age/status
- **ApplianceCard** — grid item: thumbnail + brand + status
- **ScoreBanner** — large hero with score number + ring + breakdown
- **WhatsNextCard** — horizontal scroller item, 280×160

### Buttons
- **PrimaryCTA** — brand blue, 56px tall, full-width or pill
- **SecondaryCTA** — outlined navy, same height
- **TextLink** — brand blue, no underline, gentle hover
- **IconButton** — circular 44×44, neutral background
- **ScanFAB** — floating pill on Home tab

### Inputs
- **AddressAutocomplete** — single input + dropdown
- **StatChip** — small pill (16px tall) for "12yrs", "Built 2003"
- **StatusChip** — small colored pill for "Scanned", "Pending", "Action needed"

### Layout
- **SectionHeader** — uppercase eyebrow + optional view-all link
- **HorizontalScroller** — for "What's next"
- **GridList** — 2-column responsive

### Score / Data viz
- **ScoreRing** — circular progress, customizable size (40 / 80 / 160 / 200)
- **ComponentBar** — thin horizontal bar with label + percentage
- **TimelineEntry** — for history views

---

## 6. Iconography

Use **Lucide** or **SF Symbols** (thin / light weight).
Avoid emoji-style icons or colored illustrations except in onboarding.

Critical icons to design / source:
- Room types (kitchen, bedroom, bathroom, living room, dining, garage, attic, basement, exterior)
- Systems (HVAC, electrical panel, water heater, roof, gutters, plumbing)
- Appliance types (fridge, range, dishwasher, microwave, washer, dryer, water heater)
- Actions (scan, schedule, share, edit, report)
- Navigation (home, scan, discover, profile)

---

## 7. User Flow Map

```
Welcome
  → Sign up (email or phone)
  → Address entry
  → Property data confirmation
  → First scan coaching
  → Camera scan
  → Scan complete (score appears)
  → Continue to next room OR
  → Home Profile (hub)

Home Profile (hub) — three primary entry points:
  → Tap a captured card → Detail view → Action menu
  → Tap "What's next" → Scan something new
  → Tap a flagged system → Pro booking flow OR DIY flow

Pro booking flow:
  → Card detail → "Get quote" → Brief form → TrustyPro matched → Quote → Accept → Job
  → Job complete → Pro uploads photo → Home Profile updates → Score adjusts

DIY flow:
  → Card detail → "Plan it myself" → Tutorial + Shopping list (affiliate links)
  → User logs work done → Maintenance log updates → Score adjusts

Reports flow:
  → Profile → Reports → Download PDF (free)
  → Premium: pre-listing report for realtors
```

---

## 8. Tone of Voice (microcopy guidelines)

- **Confident, not chirpy.** Avoid exclamation marks except in rare moments.
- **Quietly proud of the rigor.** "Your home has 4 documented systems and 6 captured appliances."
- **Plain English.** No jargon. "Your AC is 14 years old" not "Your central air HVAC unit is approaching end-of-life."
- **Action-oriented CTAs.** "Schedule inspection" not "Click here for service."
- **Never gamified language.** No "Level up!", "XP", "Points!", "Quest!"

Examples:
- ✅ *"Your kitchen is documented. 10 spaces to go."*
- ❌ *"Awesome job!! +50 points!!"*

- ✅ *"This system is aging. A check-up could save you from a surprise replacement."*
- ❌ *"Uh oh! Your HVAC is OLD! Better act fast!"*

---

## 9. Reference / Inspiration

For visual style, lean on these (qualitatively, not literally copy):
- **Apple Home (app)** — clean information density
- **Notion** — typography rigor, calm UI
- **Linear** — sharp minimal interactions
- **Architectural Digest (web)** — editorial photography integration
- **Hem.com** — quiet luxury, restraint
- **Apple Wallet** — card-stack metaphor for Home Profile cards
- **Strava (subtly)** — for data viz of "score components" without it feeling gamey

---

## 10. Out of Scope for First Prototype

To keep the prototype focused:
- ❌ Settings / account management deep flows
- ❌ Multi-home portfolio (single home only)
- ❌ Insurance / realtor B2B reports
- ❌ Pro-side dashboard (separate app)
- ❌ Gaussian splat capture (future)
- ❌ Drone/aerial roof integration
- ❌ Notifications inbox

**Focus the prototype on:**
1. Welcome → Address → Confirm → First scan flow (4 screens)
2. Home Profile hub screen
3. One Room Detail card
4. One System Detail card (HVAC)
5. Score detail drill-down

That's the minimum viable prototype to validate the core concept.

---

## 11. Deliverables Requested from Design

1. **Style guide** — colors, type, spacing, radii, shadows applied
2. **Component library** — buttons, cards, chips, score ring, inputs
3. **5 key screens** (high fidelity):
   - Welcome
   - Address confirmation (with auto-pulled property data)
   - Home Profile hub
   - Room detail (Kitchen)
   - System detail (HVAC, with aging-status banner)
4. **Optional:** scan flow screens (3 sub-screens) if time
5. **Hi-fi prototype** with tap-through between the 5 screens
6. **Brand asset audit** — confirm photography sources (Adobe Stock / Unsplash Plus) and one or two licensed hero images

---

## 12. Open Design Questions (worth raising with the designer)

1. Should the Health Score number be a single integer (73) or include a decimal (73.4) for ego/precision?
2. Bottom tab bar or top nav for mobile?
3. Should the Home Profile open with a hero photo of the user's actual home (Google Street View API)? Could feel personal — or could feel weird.
4. Where does the "Find a pro" entry point sit — discoverable from every system card, or also a dedicated entry in Discover?
5. Color of the Health Score ring at different ranges (green/amber/red gradient, or stay navy/blue across the board)?
