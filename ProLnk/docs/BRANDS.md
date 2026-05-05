# ProLnk Brand Portfolio

**Number of Brands**: 5 (2 primary, 3 tertiary)

All brands share the same backend infrastructure but have distinct positioning, UI, and target markets.

---

## Brand 1: ProLnk (Primary)

**Target Market**: Individual home service professionals (plumbers, electricians, HVAC, etc.)
**Position**: "Find quality leads, grow your business"
**Launch Date**: May 6, 2026

### Brand Identity

**Logo**: [TBD - modern, professional, trustworthy]
**Color Palette**:
- Primary: #0066CC (professional blue)
- Secondary: #F26419 (energetic orange)
- Neutral: #333333 (dark gray)

**Typography**:
- Headlines: Sans-serif (Montserrat or Inter)
- Body: Sans-serif (Open Sans or Roboto)

**Brand Voice**:
- Confident, professional
- Problem-solver focused
- Action-oriented ("start earning more today")
- Peer-to-peer tone (not corporate)

**Value Props**:
1. "Find vetted homeowner leads in your service area"
2. "Set your own prices, control your schedule"
3. "Network with other professionals, earn referral bonuses"
4. "Build permanent home data assets (Health Vault)"

### User Journey (ProLnk)

**Homepage**: 
- Hero: "Find Home Service Leads Without the Markup"
- CTA: "Sign Up Free"
- Social proof: "Join 1,000+ professionals"
- Features section: Lead feed, match notifications, commission tracking
- Pricing: Subscription + per-lead fee model

**Signup Flow**:
- Email → Password → Profile details
- Trade type (plumber, electrician, etc.)
- Service areas (zip codes)
- Phone number verification

**Post-Signup Dashboard**:
- Available leads feed (matched by trade + location)
- Match history + earnings
- Commission tracker
- Profile management
- Referral program

**Landing Pages (May 6 Scope)**: ~50 pages
- Home, About, Features, Pricing, Blog, FAQ, Contact
- Legal: Terms, Privacy, Security
- Admin: Waitlist view

### Features (May 6)

- ✅ Lead signup form
- ✅ Confirmation email
- ✅ Admin dashboard
- ❌ Lead feed (Week 2)
- ❌ Dashboard login (Week 2)
- ❌ Commission tracking (Week 3)

---

## Brand 2: TrustyPro (Primary)

**Target Market**: Established, licensed home service teams (5-50 employees)
**Position**: "Scale your business with qualified leads"
**Launch Date**: May 6, 2026 (as trustypro.prolnk.io subdomain)

### Brand Identity

**Logo**: [TBD - professional, established, trustworthy]
**Color Palette**:
- Primary: #1B365D (deep navy)
- Secondary: #F9A825 (gold/premium)
- Neutral: #4A4A4A (medium gray)

**Typography**:
- Headlines: Serif (Georgia or Lora) for premium feel
- Body: Sans-serif (Lato or Source Sans)

**Brand Voice**:
- Premium, sophisticated
- Business growth focused
- Partnership-oriented
- "We're invested in your success"

**Value Props**:
1. "Unlimited high-quality leads from vetted homeowners"
2. "Work with other established professionals"
3. "Earn network bonuses as you scale"
4. "Access Home Health Vault for customer insights"

### User Journey (TrustyPro)

**Homepage**: 
- Hero: "Predictable Leads for Growing Service Businesses"
- CTA: "Apply for Early Access"
- Social proof: "Premium professionals only"
- Features: Lead volume, team collaboration, network earning
- Pricing: Higher subscription ($499+) + lower per-lead fee

**Signup Flow**:
- Business name → License verification → Team size
- Service categories (multiple trades allowed)
- Service areas (larger regions)
- Admin contact details
- Company details (revenue, team size)

**Post-Signup Dashboard** (Week 2):
- Premium lead feed (pre-qualified, higher value)
- Team management (assign leads to techs)
- Shared commission pool
- Network bonus dashboard
- Analytics and reporting

**Landing Pages (May 6)**: ~40 pages
- Home, About (company story), Services, Pricing, Blog, Case Studies
- Why TrustyPro vs DIY
- Network model explainer
- Team features
- Admin: Applicant queue

### Features (May 6)

- ✅ Homeowner signup form
- ✅ Confirmation email
- ✅ Admin queue (review applicants)
- ❌ Lead feed (Week 2)
- ❌ Team collaboration (Week 2)
- ❌ Network dashboard (Week 3)

---

## Brand 3: Home Health Vault (Tertiary)

**Target Market**: Homeowners who want to organize home data
**Position**: "Your home's digital health record"
**Launch Date**: Month 2 (June 2026)

### Purpose

Vault is the **data collection engine** that powers all other brands. Homeowners add their homes → data becomes valuable for matching + analytics.

### User Journey

**Homepage**: "Document Your Home's Health"
**Signup**: Email → Home address → Basic info (year built, square footage)
**Dashboard**: Add home details step-by-step (roof, electrical, plumbing, etc.)
**Value**: "Get insights about your home, find the right professional when needed"

### Features

- Home profile (structure, systems, condition)
- Service history (past work done)
- Warranty tracking
- Maintenance reminders
- Professional directory (local contractors)
- Lead request (post service needs)

### Monetization

- Free for homeowners (loss leader to build data)
- Data is valuable for matching → cross-sold to ProLnk/TrustyPro users

---

## Brand 4: ProMatch (B2B API - Tertiary)

**Target Market**: Other home service platforms, aggregators
**Position**: "White-label lead matching for home services"
**Launch Date**: Month 3 (July 2026)

### Purpose

Offer ProLnk's matching algorithm + network as an API for other platforms.

### Integration Points

- /api/matches - Get matches for a lead
- /api/pros - Search pro directory
- /api/pricing - Get market pricing data
- /api/webhooks - Subscribe to match events

### Monetization

- Per-API call pricing
- Revenue share on leads sent through API
- Premium features (analytics, advanced matching)

---

## Brand 5: ProLnk Network (Internal - Tertiary)

**Target Market**: Internal use, partner portals
**Position**: "The network operates itself"
**Launch Date**: Month 4 (August 2026)

### Purpose

Internal platform for managing the network itself (agent coordination, data flows, partner relationships).

### Features

- Network statistics dashboard
- Pro/homeowner directory
- Commission tracking & payouts
- Dispute resolution
- Content management (blog, emails, etc.)
- Analytics & reporting

---

## Technical Implementation: Host-Based Routing

All 5 brands run on the same codebase via hostname detection:

```typescript
// server/_core/vite.ts
const hostname = req.get("host").toLowerCase();
const brand = determineBrand(hostname);
// Injects window.__BRAND__ into HTML

// client/src/App.tsx
const BrandComponent = {
  'prolnk': Home,
  'trustypro': TrustyProHome,
  'vault': VaultHome,
  'promatch': ProMatchHome,
  'network': NetworkHome,
}[window.__BRAND__];

return <BrandComponent />;
```

### Domain Routing

| Domain | Brand | Purpose |
|--------|-------|---------|
| prolnk.io | ProLnk | Individual pros signup/dashboard |
| trustypro.prolnk.io | TrustyPro | Company/team signup/dashboard |
| vault.prolnk.io | Home Health Vault | Homeowner data collection |
| api.prolnk.io | ProMatch | API documentation |
| network.prolnk.io | ProLnk Network | Internal admin/network |

**Technical Note**: All 5 domains point to same Railway app (prolnk-production.up.railway.app), but hostname detection shows different UI.

---

## May 6 Launch Scope by Brand

### LIVE (Waitlist)
- ✅ **ProLnk**: Pro signup form + waitlist view
- ✅ **TrustyPro**: Company signup form + applicant review

### Planned (Week 2+)
- 🔄 **Home Health Vault**: Homeowner signup (data collection)
- 🔄 **ProMatch**: API documentation + early partner access
- 🔄 **ProLnk Network**: Internal dashboard

---

## Brand Co-Marketing

**Cross-promotion Strategy**:
- ProLnk pros see TrustyPro opportunities ("scale to a team")
- TrustyPro companies see ProLnk pro network ("expand your team network")
- Vault users invited to both ProLnk and TrustyPro based on home value

**Unified Metrics**:
- Combined login system (account ID spans all brands)
- Shared data (homes, professionals, opportunities)
- Cross-brand commission (earn referral bonus for recruiting across brands)

---

## Design System (Shared)

All 5 brands use consistent design system to reduce frontend work:

- **Typography**: 4 sizes (H1-H4, body, small)
- **Colors**: 5-color palette per brand + shared grays/whites
- **Components**: 30+ shared React components (buttons, forms, cards, modals)
- **Layout**: 3-column grid system
- **Spacing**: 8px base unit (8, 16, 24, 32, 48px)
- **Shadows**: 3 levels (light, medium, heavy)
- **Animations**: 200ms default, ease-in-out

**Component Library** (shared across brands):
- Button, ButtonGroup
- Input, Textarea, Select, Checkbox, Radio
- Card, CardHeader, CardBody, CardFooter
- Modal, Drawer, Popover, Tooltip
- Table, Pagination, Tabs
- Alert, Toast, Badge
- Form, FormGroup, FormField (with validation)

---

## Brand Evolution

**Phase 1 (May 2026)**: ProLnk + TrustyPro waitlist
**Phase 2 (June 2026)**: Vault + API documentation
**Phase 3 (July 2026)**: ProMatch live API
**Phase 4 (August 2026)**: ProLnk Network dashboard
**Phase 5 (Q4 2026)**: Mobile apps (5 apps if separate branding)

---

## Competitive Positioning

| Brand | Direct Competitor | Advantage |
|-------|-------------------|-----------|
| ProLnk | Thumbtack | Network income (not flat fee), no markups |
| TrustyPro | ServiceTitan | Lead quality + network benefits |
| Vault | HomeAdvisor | Privacy-first, homeowner controls data |
| ProMatch | TaskRabbit API | Industry-specific, higher commissions |
| Network | Angi (internal) | Transparent economics, pro-friendly |

---

## Future Brand Opportunities

- **ProLnk International**: Global expansion (UK, Canada, Australia)
- **ProLnk Financing**: Help pros finance equipment/vehicles
- **ProLnk Insurance**: Specialized liability insurance network
- **ProLnk Academy**: Training/certification programs
- **ProLnk Supply**: Discounted parts/materials for network members
