# ProLnk — Pro-Side App Prototype

Interactive design prototype for **ProLnk** (prolnk.xyz) — the service-professional side of the TrustyPro / ProLnk platform. Built as a static HTML + React (Babel, no build step) showcase: open `ProLnk Showcase.html` in any browser. No install, no server needed.

## How to run
1. Open `ProLnk Showcase.html` in Chrome/Edge/Safari (double-click works; a static server is fine too).
2. Left rail = every screen in the journey, in order: signup → coaching → verification → daily use → growth → account.
3. The phone in the center is fully clickable — claim referrals, book site visits, send quotes, complete jobs.
4. The "Founding-network member" toggle in the rail shows/hides the founding-only Network tab.

## File map
- `ProLnk Showcase.html` — entry point; loads React + all JSX below
- `prolnk-showcase.jsx` — app shell: rail, routing, state, tab bar, toasts/notifications
- `prolnk-ui.jsx` — design tokens (PL palette), icons, Btn/Card/Badge/Header primitives
- `prolnk-data.jsx` — ALL demo data: tiers, add-ons, ZIPs, suppliers, board jobs, network levels
- `prolnk-onboarding.jsx` — Apply flow: trades (2 free + Extra Services upsell), business address, subscription (founding invite → Business at Pro price), ZIP picker (per-tier caps + free low-adoption areas), emergency on-call opt-in, add-ons w/ quantity steppers, payment summary
- `prolnk-coach.jsx` — 5-step "How ProLnk works" coaching
- `prolnk-verify.jsx` — verification gate: background check, multi-license credentials (person vs business), locked referrals
- `prolnk-screens-core.jsx` — referral feed, referral detail (in-app contact only), active jobs, earnings
- `prolnk-quote.jsx` — visit scheduler (claim → site visit → quote) + quote composer
- `prolnk-screens-growth.jsx` — network (founding-only), scout teaser, profile/settings
- `prolnk-scout-pro.jsx` — Scout hub (PM + home documentation), Scout project, trade-gated job board
- `prolnk-status.jsx` — TrustyPro badge ladder (Bronze/Silver/Gold/Platinum) + weighted badge wall
- `prolnk-membership.jsx` — tiers (Core/Pro/Business/Enterprise), web-checkout redirect (no app-store fees)
- `prolnk-analytics.jsx` — earnings analytics: weeks/months/years, revenue by stream
- `prolnk-briefcase.jsx` — Digital Briefcase (company compliance) + ProPasses (per-person credentials), bulk crew onboarding
- `prolnk-emergency.jsx` — emergency on-call opt-in + full-screen alert
- `prolnk-tools.jsx` — messages (in-app only), schedule, supplier savings (GPO)
- `prolnk-integrations.jsx` — Stripe, FSM tools, CompanyCam, GBP, Zapier
- `prolnk-trust.jsx` — Trust & Ranking policy screen
- `assets/` — logo + TrustyPro shield artwork

## Key business rules encoded in this prototype
- No lead fees, no commission on labor: membership + small fee on job total at settlement
- Homeowner contact is in-app only; phone numbers never shared either direction
- Referrals stay locked until background check + license + insurance clear
- Trade licenses (person) vs contractor license (business) tracked separately; lapse pauses referrals
- Tiers: Core $99 (4 ZIPs/1 seat) · Pro $149 (8/2) · Business $249 (14/4) · Enterprise from $499 (multi-market, unlimited seats)
- Founding invite = Business tier at Pro price; founding network (4 levels) hidden from non-founding members
- Scouts: quote whole multi-trade projects, post pieces to the trade-gated job board, cut off the top; also document homes (Home Score)
- Emergency on-call: free opt-in, louder alerts, 1.5× rates, rank bonus for accepting
