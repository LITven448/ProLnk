# TrustyPro Homeowner App — Design Prototype

High-fidelity, clickable prototype of the TrustyPro homeowner app. This is the **design source of truth** for the production build — every screen, flow, and interaction the app needs is demonstrated here.

## How to view it

No build step. Open `TrustyPro v3.html` in a browser (double-click, or any static server). Everything runs client-side with React 18 + Babel standalone from CDN.

> `TrustyPro v2.html` and `TrustyPro Homeowner App.html` (v1) are earlier iterations, kept for reference. **v3 is current.**

## What's in the prototype

Four playable journeys (left rail): New homeowner, Returning, Proactive alert, All clear. Plus jump-to-screen chips for every screen.

Flows demonstrated:
- **Onboarding** — welcome → address entry → auto-pulled property records (ATTOM-style fields cascade in) → first scan
- **Capture hub** — room scan (3D-ready), quick photo of a problem, systems & appliances capture, document scan
- **Health Vault** — home health score gauge, findings (severity, trade, cost range), rooms/systems/appliances inventory (+ add custom), scan history, property record
- **Filing cabinet** — document storage by category incl. home inspections & past pros; AI auto-organizes
- **Request service** — trade picker (full ~55-service catalog, searchable, grouped) → AI chat scoping → 3-quote pro matching → in-app-only messaging (no phone numbers exchanged)
- **Emergency Services** — prominent button, urgent dispatch path for water/gas/electrical/etc.
- **Scout (big projects)** — multi-trade remodels: one Scout visits, one quote (trade-by-trade breakdown), Scout assembles the crew via ProLnk; homeowner tracks crew assembly live
- **AI renders + Shop this look** — restyle a room, chat-driven design preferences, product hotspots with affiliate links
- **Care plans** — $199/yr maintenance subscription incl. water-heater flush
- **Home inspections** — buy past inspections ($29) / book new ones
- **Referrals** — neighbor referral program
- **Payments** — milestone payments happen on trustypro.io (web), NOT in-app (avoids app-store fees)

## Design system

- Tokens, icons, and shared components: `tp3-ui.jsx` (`T3` object = colors/type/shadows; `I3` = Lucide-style icons)
- Indigo `#4F46E5` primary, ink `#14122B`, soft neutral surfaces, Inter (400–800)
- Logo assets: `trustypro-logo.png`, `trustypro-logo-white.png`, `trustypro-mark.png`

## File map (v3 = current)

| File | Contents |
|---|---|
| `TrustyPro v3.html` | Entry point, journey/stage shell, screen routing rail |
| `tp3-app.jsx` | App shell: navigation, tab bar, journey state |
| `tp3-ui.jsx` | Design tokens, icons, ScoreRing, FindingCard, StatusTimeline, buttons |
| `tp3-data.jsx` | Mock data mirroring backend shapes (ATTOM fields, findings, trades) |
| `tp3-onboarding.jsx` | Welcome, magic autofill, scan flow |
| `tp3-vault.jsx` | Health Vault, dashboard, profile |
| `tp3-capture.jsx` | Capture hub (rooms, problems, systems, appliances, docs) |
| `tp3-docs.jsx` | Filing cabinet |
| `tp3-service.jsx` | Request service, tracking, shop-this-look, proactive alert |
| `tp3-jobs.jsx` | Jobs/requests surfaces |
| `tp3-ai.jsx` | AI chat (scoping + design chat) |
| `tp3-scout.jsx` | Scout: big-project request, one-quote, live project tracking |
| `tp3-more.jsx` | All-services directory, emergency, care plan, referrals, misc |
| `ios-frame.jsx` | iPhone device frame for presentation |
| `uploads/` | Product briefs & specs the design was built from |

## Production notes for the dev team

- Target stack per spec: React Native / Expo, tRPC backend at `prolnk-v2.onrender.com` — this prototype's screens/flows map 1:1; the JSX is web-React for design iteration, not RN code to copy verbatim.
- Data shapes in `tp3-data.jsx` intentionally mirror backend fields (findings: category/severity/description/trade/costRange; property: ATTOM fields) to port cleanly.
- All pro↔homeowner communication is in-app only. No phone numbers exchanged anywhere.
- Payments must stay off-app (web checkout on trustypro.io) to avoid app-store fees.
- The pro-side app (ProLnk) is a separate product; Scout crew mechanics live there.
