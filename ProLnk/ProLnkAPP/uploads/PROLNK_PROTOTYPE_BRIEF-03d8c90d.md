# ProLnk Prototype — Design Brief
*Paste this (or sections of it) into the Claude design tool to build the ProLnk app from scratch. It's built from the REAL app + backend, so whatever you design here ports cleanly into the live product later. ProLnk is the **pro-facing** side — the opposite end from TrustyPro (homeowner-facing).*

## What ProLnk is (the framing)
The **professional-facing** side of the platform. Service pros (plumbers, electricians, HVAC, roofers, remodelers) use ProLnk to get matched with vetted jobs, accept work, track earnings, build their referral network, and grow. **Pros pay** ($99 Core / $149 Pro / $249 Business + Enterprise; Scout add-on). It should feel like a serious tool that makes them money — confident, fast, data-rich, "this is my business dashboard," not a consumer app. Homeowners never appear here; they live on TrustyPro.

Unlike TrustyPro (where money talk is hidden), **ProLnk SHOWS the pro their own money** — earnings, tiers, commission, network income. What it must NEVER show: ProLnk's internal margins, company financials, or other pros' private numbers.

## Brand / visual system (keep consistent)
- **Palette:** ProLnk teal/deep-slate. Primary `#0D9488` (teal), deep slate `#0F172A` for headers/strong text, white surfaces, `#F8FAFC` app background, `#16A34A` for money/positive, `#D97706` for pending/expiring, `#DC2626` for declined/urgent. Borders `#E5E7EB`. Clean and professional — NO dark blue, no loud colors, consistent. (This matches the locked admin palette.)
- **Tone:** direct, pro-to-pro, money-forward, respectful of their time. "Here's a job. Here's what it pays. Accept or pass." No fluff.
- **Type:** clean sans (Inter). Dense but readable — this is a working dashboard, not a marketing page. Numbers are first-class (tabular figures).
- **Mobile-first** — pros are in trucks and on job sites. Big tap targets, one-thumb operation, fast.

## The screens to design (and the REAL data each one has)
Design these as the core journey. The fields listed are what the backend actually provides — mirror them:

1. **Apply / Join (Waitlist + Tiers)**
   - Trade picker, business name, service ZIP codes (multi), contact, license info.
   - **Tier selection:** Core $99 / Pro $149 / Business $249 / Enterprise (custom). Show what each unlocks (keep rate, # service areas, Scout access). Do NOT expose the founding-network cascade publicly.
   - Charter/referral code field (if they arrived via a referral link, it's prefilled and locks their tier).
   - Success → "you're in, next step: background check."

2. **Background Check (Checkr)**
   - Pro pays for their own check, in-flow, on the site. States: `not started → payment → submitted → pending → clear / consider`.
   - Calm, "this is what builds homeowner trust" framing. Show status clearly; don't make them wonder.

3. **Job / Offer Feed** (the daily-driver screen)
   - List of incoming **offers** matched to them. Each offer has: `trade`, `job description/scope`, `location` (city/ZIP, not full address pre-accept), `homeowner first name`, `estimated value / pay`, `offer expires in` (24h countdown), `status` (pending/accepted/declined/expired).
   - Two big actions per offer: **Accept** / **Pass**. Accepting reveals full details + homeowner contact.
   - Empty state: "No offers right now — here's how to get more" (expand service areas, raise responsiveness).

4. **Offer Detail / Accept**
   - Full scope, photos from the homeowner/scan, the AI-detected findings (category, severity, trade, estimated cost range), location, pay.
   - Accept → "you've got it, here's how to reach them" → moves to active jobs.

5. **Earnings Dashboard** (the why-I-pay screen)
   - **This month's earnings**, lifetime earnings, pending payouts.
   - Breakdown by stream (the pro sees THEIR money, plainly): job revenue kept (by tier — 40/50/60% / founding 60%), referral/network income, origination income.
   - **Tier + progress:** current tier, matches completed, progress bar to next tier (e.g. "8 / 10 matches to Pro tier — unlock higher keep rate").
   - Payout history + next payout date. Stripe Connect onboarding status.

6. **My Network** (referral / founding network)
   - Their personal referral link + code to recruit other pros.
   - Network tree: who they recruited, levels deep, network income earned from each level (7/4/2/1% — shown as THEIR earnings, not as company mechanics).
   - "Invite a pro" CTA. Leaderboard / milestones optional.

7. **Scout** (add-on / standalone $49 add-on, $99 standalone)
   - Onboard a property → claim permanent origination rights → earn recurring origination income on everything that home ever generates.
   - Show: properties onboarded, origination income compounding, "add a property" flow (address autofill → claim).

8. **Active Jobs / Match History**
   - Jobs in progress (accepted, contact homeowner, mark complete) + completed history.
   - On complete → triggers commission/payout (handled by backend). Status timeline per job.

9. **Profile / Business Settings**
   - Trade(s), service ZIP codes (add/remove — extra ZIPs are an add-on), business info, subscription/tier management, notification prefs.

## The journeys (design the flow, not just screens)
- **New pro:** apply → pick tier (or arrive via referral link, tier locked) → pay → background check → land in offer feed → accept first offer → complete → see earnings → invite pros to network.
- **Daily driver:** open app → offer feed → accept/pass → manage active jobs → glance at earnings.
- **Growth (Scout/network):** invite pros via link OR onboard properties as a Scout → watch network + origination income compound on the earnings dashboard.

## Functional behaviors the design must account for (so it ports)
- **Offers expire (24h countdown)** and cascade to the next pro if passed/expired — design the urgency and the countdown.
- **Matching is invisible to the pro too** — they don't browse a job board and bid against each other (no race-to-the-bottom). They get offered the right jobs based on trade + ZIP + tier + capacity + responsiveness. Design "here's a job for you," not "compete for this."
- **Tier gates real things** — keep rate, # service areas, Scout access. Make the upgrade value obvious.
- **The pro sees their own money in full** — earnings, tiers, network, origination. NEVER show ProLnk company margins, other pros' numbers, or internal financial projections.
- **Background check is a paid, in-flow step** — not an afterthought.
- **Referral link locks tier** — someone who joins via a Charter/founding link inherits that tier (until that tier's slots fill, then cascades down).

## How to refine effectively in the Claude design tool
1. **One screen per iteration.** Start with the **Offer Feed** (the daily-driver, highest-impact) → then **Earnings Dashboard** → then the rest. Don't do all 9 at once.
2. **Feed it the real data fields** (above) so screens show realistic content, not lorem ipsum.
3. **Lock the brand tokens** in your first message (teal #0D9488, slate #0F172A, money-green #16A34A, mobile-first) so every screen is consistent.
4. **Ask for component-structured output** ("build it as reusable components: OfferCard, CountdownBadge, EarningsStat, TierProgress, NetworkTree, etc.") — that makes porting to the real app far easier later.
5. **Keep a running spec** — each time you finalize a screen, note what's locked. This doc is the start of that.

## When you're ready to make it real
Tell me **"port the prolnk prototype"** and share the artifact (paste the code or describe each screen). I'll rebuild the screens you've locked into the live ProLnk app, wired to the real backend — the matching engine (`rankPartnersForOpportunity`), the offer/accept/cascade system, the commission + cascade payout engine, Stripe Connect payouts, Checkr background checks, the Scout origination flow, and the referral/Charter logic. The backend for all of this already exists and works; the prototype just decides how it looks and feels.

---
### Quick reference: ProLnk vs TrustyPro (two sides, one platform)
| | **ProLnk** (this doc) | **TrustyPro** |
|---|---|---|
| User | Service pros | Homeowners |
| Pays? | Yes (subscription) | Free |
| Money shown | Their own earnings (full) | None — no platform money talk |
| Brand | Teal/slate, dashboard | Indigo, concierge |
| Core screen | Offer Feed | Home Health Vault |
| Vibe | "My business, my money" | "My home, handled" |
