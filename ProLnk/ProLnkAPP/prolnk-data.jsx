// prolnk-data.jsx — mock data (mirrors real backend fields) + shared UI atoms

// ─────────────────────────────────────────────────────────────
// BRAND
// ─────────────────────────────────────────────────────────────
const PL = {
  teal: '#0D9488', tealDark: '#0F766E', tealSoft: '#CCFBF1', tealBg: '#F0FDFA',
  slate: '#0F172A', slate2: '#1E293B', slate3: '#334155',
  ink: '#0F172A', body: '#334155', muted: '#64748B', faint: '#94A3B8',
  green: '#16A34A', greenBg: '#F0FDF4', greenSoft: '#DCFCE7',
  amber: '#D97706', amberBg: '#FFFBEB', amberSoft: '#FEF3C7',
  red: '#DC2626', redBg: '#FEF2F2', redSoft: '#FEE2E2',
  border: '#E5E7EB', border2: '#EEF1F4', bg: '#F8FAFC', surface: '#FFFFFF',
};

// ─────────────────────────────────────────────────────────────
// THE PRO (logged-in user)
// ─────────────────────────────────────────────────────────────
const PRO = {
  name: 'Marcus Reyes',
  first: 'Marcus',
  initials: 'MR',
  business: 'Reyes Plumbing & Drain',
  trade: 'Plumbing',
  trades: ['Plumbing', 'Drain'],
  tier: 'Pro',            // Core / Pro / Business
  tierPrice: 149,
  keepRate: 50,           // % of job revenue kept
  serviceZips: ['78704', '78745', '78748', '78749'],
  city: 'Austin, TX',
  license: 'TX-MPL 41882',
  rating: 4.9,
  reviews: 127,
  responseRate: 96,       // %
  responseMins: 14,       // avg accept time
  stripeConnected: true,
  bgCheck: 'clear',
  referralCode: 'REYES-7K2',
  joined: 'Mar 2025',
  founding: true,   // joined via referral from a founding-network member
  matchesThisTier: 8,
  matchesNeeded: 10,
};

// ─────────────────────────────────────────────────────────────
// OFFER FEED  (matched offers — pro never browses/bids)
// expiresInMins drives the live countdown
// ─────────────────────────────────────────────────────────────
// platform fee at settlement: 3–15% of job value by job type (8% standard residential,
// 12% emergency, 10% specialty, 3% recurring — per docs/COMMISSION.md)
const JOB_FEE = 0.08;

// storm event — auto-generates trade-matched leads
const STORM = {
  active: true, kind: 'Hard freeze warning', zips: ['78704', '78745'],
  note: 'Burst-pipe surge expected · 6 water-damage referrals generated in your areas overnight',
};

const OFFERS = [
  {
    id: 'OF-4830', trade: 'Plumbing', urgent: true, storm: true,
    title: 'Freeze damage — split supply line in attic',
    scope: 'Storm-generated lead: hard freeze overnight. Homeowner reports water staining on the ceiling below the attic run and a hissing sound. Main is shut off. Likely split PEX or copper at an uninsulated elbow.',
    city: 'Austin', zip: '78704', neighborhood: 'Zilker',
    homeowner: 'Ray', estLow: 420, estHigh: 780, pay: 590,
    expiresInMins: 38, severity: 'Urgent', category: 'Freeze damage',
    distanceMi: 1.8, photos: ['#334155', '#1E293B', '#475569'],
    findings: [
      { label: 'Trade', value: 'Plumbing' },
      { label: 'Trigger', value: 'Storm event · hard freeze' },
      { label: 'Severity', value: 'Urgent — main shut off' },
      { label: 'Est. range', value: '$420 – $780' },
    ],
    homeownerPhone: '(512) 555-0134',
  },
  {
    id: 'OF-4821', trade: 'Plumbing', urgent: true,
    title: 'Burst pipe under kitchen sink — active leak',
    scope: 'Homeowner reports water pooling in the under-sink cabinet and a steady drip from a supply line. Shutoff valve is holding but cabinet base is saturated.',
    city: 'Austin', zip: '78704', neighborhood: 'Bouldin Creek',
    homeowner: 'Dana', estLow: 380, estHigh: 640, pay: 510,
    expiresInMins: 47, severity: 'Urgent', category: 'Supply line failure',
    distanceMi: 2.1, photos: ['#1E293B', '#334155', '#475569'],
    findings: [
      { label: 'Trade', value: 'Plumbing' },
      { label: 'Severity', value: 'Urgent — active leak' },
      { label: 'Likely cause', value: 'Failed compression fitting' },
      { label: 'Est. range', value: '$380 – $640' },
    ],
    homeownerPhone: '(512) 555-0188',
  },
  {
    id: 'OF-4817', trade: 'Plumbing', urgent: false,
    title: 'Water heater replacement — 50gal gas',
    scope: '12-year-old unit, pilot won’t stay lit, rust at the base of the tank. Homeowner wants a like-for-like 50 gallon gas replacement, ground floor garage.',
    city: 'Austin', zip: '78745', neighborhood: 'Garrison Park',
    homeowner: 'Priya', estLow: 1450, estHigh: 2100, pay: 1780,
    expiresInMins: 312, severity: 'Standard', category: 'Water heater',
    distanceMi: 4.6, photos: ['#0F766E', '#0D9488', '#14B8A6'],
    findings: [
      { label: 'Trade', value: 'Plumbing' },
      { label: 'Severity', value: 'Standard — no active leak' },
      { label: 'Scope', value: '50gal gas, like-for-like' },
      { label: 'Est. range', value: '$1,450 – $2,100' },
    ],
    homeownerPhone: '(512) 555-0143',
  },
  {
    id: 'OF-4809', trade: 'Drain', urgent: false,
    title: 'Main line backup — recurring',
    scope: 'Two bathrooms backing up, gurgling toilets. Likely root intrusion in the main, this is the second time in 8 months. Cleanout is accessible in the side yard.',
    city: 'Austin', zip: '78748', neighborhood: 'Bauerle Ranch',
    homeowner: 'Tom', estLow: 290, estHigh: 520, pay: 410,
    expiresInMins: 689, severity: 'Standard', category: 'Main line / rooter',
    distanceMi: 6.2, photos: ['#475569', '#64748B', '#334155'],
    findings: [
      { label: 'Trade', value: 'Drain' },
      { label: 'Severity', value: 'Standard — recurring' },
      { label: 'Likely cause', value: 'Root intrusion in main' },
      { label: 'Est. range', value: '$290 – $520' },
    ],
    homeownerPhone: '(512) 555-0199',
  },
  {
    id: 'OF-4802', trade: 'Plumbing', urgent: false,
    title: 'Two-handle faucet + angle stops, master bath',
    scope: 'Dripping master bath faucet, homeowner also wants the angle stops replaced while you’re in there. Parts on hand or supplied.',
    city: 'Austin', zip: '78749', neighborhood: 'Legend Oaks',
    homeowner: 'Grace', estLow: 220, estHigh: 360, pay: 290,
    expiresInMins: 1320, severity: 'Standard', category: 'Fixture',
    distanceMi: 5.1, photos: ['#14B8A6', '#5EEAD4', '#0D9488'],
    findings: [
      { label: 'Trade', value: 'Plumbing' },
      { label: 'Severity', value: 'Low — no leak' },
      { label: 'Scope', value: 'Faucet + 2 angle stops' },
      { label: 'Est. range', value: '$220 – $360' },
    ],
    homeownerPhone: '(512) 555-0112',
  },
];

// ─────────────────────────────────────────────────────────────
// ACTIVE JOBS + HISTORY
// ─────────────────────────────────────────────────────────────
const JOBS = [
  {
    id: 'JB-2207', trade: 'Plumbing', status: 'active', stage: 'quote_sent',
    title: 'Garbage disposal replacement',
    homeowner: 'Elena', homeownerPhone: '(512) 555-0166',
    address: '1408 Kinney Ave, Austin TX 78704',
    pay: 340, accepted: '2h ago', scheduledFor: 'Quote sent · awaiting reply',
    timeline: [
      { label: 'Referral claimed', done: true, at: '2h ago' },
      { label: 'Homeowner contacted', done: true, at: '1h ago' },
      { label: 'Quote sent · $340', done: true, at: '40m ago' },
      { label: 'Scheduled', done: false },
      { label: 'Marked complete', done: false },
    ],
  },
  {
    id: 'JB-2201', trade: 'Drain', status: 'active', stage: 'in_progress',
    title: 'Hydro-jet main line',
    homeowner: 'Marcus B.', homeownerPhone: '(512) 555-0177',
    address: '9220 Brodie Ln, Austin TX 78748',
    pay: 480, accepted: 'Yesterday', scheduledFor: 'Today, in progress',
    timeline: [
      { label: 'Referral claimed', done: true, at: 'Yesterday' },
      { label: 'Quote sent · $480', done: true, at: 'Yesterday' },
      { label: 'Quote accepted', done: true, at: 'Yesterday' },
      { label: 'On site / in progress', done: true, at: 'Now' },
      { label: 'Marked complete', done: false },
    ],
  },
  {
    id: 'JB-2188', trade: 'Plumbing', status: 'done',
    title: 'Toilet reset + wax ring', homeowner: 'Sara',
    pay: 210, completed: 'May 28', kept: 210, rated: 5,
  },
  {
    id: 'JB-2179', trade: 'Plumbing', status: 'done',
    title: 'Shower valve cartridge', homeowner: 'Will',
    pay: 295, completed: 'May 24', kept: 295, rated: 5,
  },
  {
    id: 'JB-2170', trade: 'Drain', status: 'done',
    title: 'Kitchen drain snake', homeowner: 'Nina',
    pay: 180, completed: 'May 21', kept: 180, rated: 4,
  },
];

// ─────────────────────────────────────────────────────────────
// EARNINGS
// ─────────────────────────────────────────────────────────────
const EARNINGS = {
  month: 6240, monthLabel: 'May 2026',
  lifetime: 84120, pending: 1290, nextPayout: 'Fri, Jun 5',
  monthDelta: 18,  // % vs last month
  streams: [
    { key: 'jobs', label: 'Job revenue (after platform fee)', amount: 5180, color: '#16A34A', note: 'your quotes · your prices · 8% standard fee', route: null },
    { key: 'network', label: 'Referral overrides', amount: 740, color: '#0D9488', note: 'from pros you brought onto ProLnk' },
    { key: 'origination', label: 'Scout origination', amount: 320, color: '#7C3AED', note: '3 properties earning' },
  ],
  spark: [3100, 2740, 3950, 4200, 3880, 5290, 4760, 6240],
  payouts: [
    { date: 'May 30', amount: 1840, status: 'paid' },
    { date: 'May 23', amount: 1610, status: 'paid' },
    { date: 'May 16', amount: 1500, status: 'paid' },
    { date: 'May 9', amount: 1290, status: 'paid' },
  ],
};

// add-ons (à la carte, monthly)
const ADDONS = [
  { key: 'scout', name: 'Scout', price: 49, icon: 'scout', tone: '#7C3AED', desc: 'Claim permanent origination rights on properties you onboard — recurring income forever.' },
  { key: 'boost', name: 'Priority Boost', price: 29, icon: 'bolt', tone: '#0D9488', desc: 'Jump ahead in matching. Get first dibs on referrals in your area.' },
  { key: 'featured', name: 'Featured Profile', price: 19, icon: 'star', tone: '#D97706', desc: 'Homeowners see your business first, with a verified spotlight badge.' },
  { key: 'seats', name: 'Extra Seats & ProPasses', price: 20, icon: 'user', tone: '#0891B2', qty: true, desc: 'One more crew seat with its own ProPass — license wallet, background check, badge. Stack per person.' },
  { key: 'leads', name: 'Extra Area Pack', price: 15, icon: 'pin', tone: '#2563EB', qty: true, desc: 'Adds 3 more service ZIPs. Stack as many packs as your coverage needs.' },
];

// service types: 2 included free, each extra pack adds 2 more
const SERVICES_ADDON = { included: 2, per: 2, price: 25, name: 'Extra Services' };

// metroplex ZIPs, sorted from the pro's business address; `free` = low-adoption bonus areas
const ZIP_SUGGEST = [
  { zip: '78704', area: 'Bouldin / Travis Hts', mi: 1.2, demand: 'High' },
  { zip: '78745', area: 'Garrison Park', mi: 3.1, demand: 'High' },
  { zip: '78741', area: 'Riverside', mi: 3.4, demand: 'Med' },
  { zip: '78744', area: 'McKinney', mi: 4.9, demand: 'Med' },
  { zip: '78748', area: 'Bauerle Ranch', mi: 5.4, demand: 'Med' },
  { zip: '78749', area: 'Legend Oaks', mi: 5.8, demand: 'Med' },
  { zip: '78735', area: 'Barton Creek', mi: 6.9, demand: 'Med' },
  { zip: '78739', area: 'Circle C', mi: 7.2, demand: 'High' },
  { zip: '78747', area: 'Onion Creek', mi: 8.1, demand: 'Med' },
  { zip: '78660', area: 'Pflugerville', mi: 15.8, demand: 'High' },
  { zip: '78664', area: 'Round Rock', mi: 18.9, demand: 'High' },
  { zip: '78652', area: 'Manchaca', mi: 9.0, demand: 'Low', free: true },
  { zip: '78617', area: 'Del Valle', mi: 10.2, demand: 'Low', free: true },
  { zip: '78610', area: 'Buda', mi: 11.6, demand: 'Low', free: true },
  { zip: '78640', area: 'Kyle', mi: 16.6, demand: 'Low', free: true },
];

// tier ladder
const TIERS = [
  { name: 'Core', price: 99, keep: 40, priority: 'Standard', areas: 4, seats: 1, scout: false, icon: 'wrench', tone: '#64748B', bg: '#F1F5F9',
    perks: ['4 service ZIPs · 1 seat', 'Matched referrals + storm & event leads', 'FSM integrations (Jobber, HCP, ServiceTitan)', 'Checkr background check'] },
  { name: 'Pro', price: 149, keep: 50, priority: 'Priority', areas: 8, seats: 2, scout: 'add-on', icon: 'bolt', tone: '#0D9488', bg: '#CCFBF1',
    perks: ['8 service ZIPs · 2 seats + ProPasses', 'Priority matching', 'Digital Briefcase included', 'Weekly performance analytics', 'API & webhook access'] },
  { name: 'Business', price: 249, keep: 60, priority: 'Top', areas: 14, seats: 4, scout: true, icon: 'building', tone: '#2563EB', bg: '#DBEAFE',
    perks: ['14 service ZIPs · 4 seats + ProPasses', 'First-priority matching + featured profile', 'Scout included · Digital Briefcase', 'Advanced analytics & forecasting', 'Monthly strategy reviews'] },
  { name: 'Enterprise', price: null, priceNote: 'from $499', keep: 60, priority: 'Top', areas: '∞', seats: '∞', scout: true, icon: 'crown', tone: '#B45309', bg: '#FEF3C7',
    perks: ['Multi-market coverage · Austin, Houston, San Antonio+', 'Unlimited seats & ProPasses', 'Bulk crew onboarding · roster sync', 'Dedicated account manager', 'White-label portal · custom terms'] },
];

// ─────────────────────────────────────────────────────────────
// NETWORK (referral tree)  — shown as THEIR earnings
// ─────────────────────────────────────────────────────────────
const NETWORK = {
  code: 'REYES-7K2',
  link: 'prolnk.xyz/r/REYES-7K2',
  totalEarned: 4820, monthEarned: 740,
  invitesPending: 2, active: 9,
  levels: [
    { depth: 1, rate: 7, count: 4, earned: 3120, label: 'Direct recruits', name: 'Charter Partner', tone: '#B45309', bg: '#FEF3C7' },
    { depth: 2, rate: 4, count: 3, earned: 1080, label: 'Their recruits', name: 'Founding Partner', tone: '#1D4ED8', bg: '#DBEAFE' },
    { depth: 3, rate: 2, count: 2, earned: 480, label: '3rd level', name: 'Growth Pro', tone: '#7C3AED', bg: '#EDE9FE' },
    { depth: 4, rate: 1, count: 0, earned: 140, label: '4th level', name: 'Standard Pro', tone: '#475569', bg: '#F1F5F9' },
  ],
  recruits: [
    { name: 'Carlos Vega', trade: 'HVAC', initials: 'CV', level: 1, earned: 1180, jobs: 22, active: true },
    { name: 'Jenny Okafor', trade: 'Electrical', initials: 'JO', level: 1, earned: 940, jobs: 18, active: true },
    { name: 'Ray Tann', trade: 'Roofing', initials: 'RT', level: 1, earned: 620, jobs: 9, active: true },
    { name: 'Pete Salas', trade: 'Plumbing', initials: 'PS', level: 1, earned: 380, jobs: 7, active: false },
  ],
};

// ─────────────────────────────────────────────────────────────
// SCOUT (origination)
// ─────────────────────────────────────────────────────────────
const SCOUT = {
  active: true, addon: 49,
  properties: 3, monthIncome: 320, lifetimeIncome: 2140,
  homes: [
    { addr: '1408 Kinney Ave', city: 'Austin 78704', onboarded: 'Jan 2026', lifetime: 1240, jobs: 6, trend: [40, 60, 55, 90, 120, 140] },
    { addr: '610 Mary St', city: 'Austin 78704', onboarded: 'Feb 2026', lifetime: 580, jobs: 3, trend: [0, 30, 45, 60, 80, 95] },
    { addr: '3302 Banton Rd', city: 'Austin 78722', onboarded: 'Apr 2026', lifetime: 320, jobs: 2, trend: [0, 0, 25, 40, 70, 85] },
  ],
};

// ─────────────────────────────────────────────────────────────
// MESSAGES · SCHEDULE · SUPPLY (GPO) · REVIEWS
// ─────────────────────────────────────────────────────────────
const THREADS = [
  { id: 'TH-1', name: 'Elena', job: 'Garbage disposal replacement', unread: 2, last: 'Perfect, see you tomorrow at 9!', at: '10:42 AM',
    msgs: [
      { me: false, text: 'Hi Marcus! Saw your quote come through — looks fair. Does that include hauling the old unit away?', at: '10:12 AM' },
      { me: true, text: 'Morning Elena — yes, haul-away is the $35 line item. I\u2019ll have it out of your way same visit.', at: '10:18 AM' },
      { me: false, text: 'Great. Is tomorrow 9 AM still good? Gate code is 4482.', at: '10:31 AM' },
      { me: true, text: 'Locked in for 9 AM. I\u2019ll text when I\u2019m 20 minutes out.', at: '10:38 AM' },
      { me: false, text: 'Perfect, see you tomorrow at 9!', at: '10:42 AM' },
    ] },
  { id: 'TH-2', name: 'Marcus B.', job: 'Hydro-jet main line', unread: 0, last: 'Crew is on site — camera footage after.', at: 'Yesterday',
    msgs: [
      { me: false, text: 'Any update on arrival?', at: '8:02 AM' },
      { me: true, text: 'Crew is on site — camera footage after.', at: '8:10 AM' },
    ] },
];

const WEEK = [
  { d: 'Mon', n: 6, am: true, pm: true },
  { d: 'Tue', n: 7, am: true, pm: true },
  { d: 'Wed', n: 8, am: true, pm: false },
  { d: 'Thu', n: 9, am: true, pm: true },
  { d: 'Fri', n: 10, am: true, pm: true },
  { d: 'Sat', n: 11, am: false, pm: false },
  { d: 'Sun', n: 12, am: false, pm: false },
];
const BOOKINGS = [
  { day: 'Tue 7', win: '9:00–11:00 AM', title: 'Garbage disposal replacement', who: 'Elena', zip: '78704' },
  { day: 'Tue 7', win: '2:00–4:00 PM', title: 'Freeze damage — attic supply line', who: 'Ray', zip: '78704' },
  { day: 'Wed 8', win: '10:00 AM–12:00 PM', title: 'Hydro-jet main line', who: 'Marcus B.', zip: '78748' },
];

const SUPPLIERS = [
  { cat: 'Plumbing & PVF', items: [
    { key: 'ferguson', name: 'Ferguson', mono: 'F', tone: '#00539B', disc: '8–15%', linked: true },
    { key: 'winsupply', name: 'Winsupply', mono: 'W', tone: '#0B7B3E', disc: '7–12%', linked: false },
    { key: 'coreandmain', name: 'Core & Main', mono: 'CM', tone: '#D22630', disc: '6–10%', linked: false },
    { key: 'reece', name: 'Reece', mono: 'R', tone: '#003DA5', disc: '7–12%', linked: false },
  ]},
  { cat: 'HVAC / R', items: [
    { key: 'watsco', name: 'Gemaire (Watsco)', mono: 'GE', tone: '#E31837', disc: '10–18%', linked: false },
    { key: 'johnstone', name: 'Johnstone Supply', mono: 'JS', tone: '#00703C', disc: '8–15%', linked: false },
    { key: 'carrier', name: 'Carrier Enterprise', mono: 'CE', tone: '#0033AB', disc: '10–16%', linked: false },
  ]},
  { cat: 'Electrical', items: [
    { key: 'rexel', name: 'Rexel', mono: 'RX', tone: '#00539F', disc: '8–14%', linked: false },
    { key: 'ced', name: 'CED', mono: 'CD', tone: '#C8102E', disc: '7–12%', linked: false },
    { key: 'graybar', name: 'Graybar', mono: 'GB', tone: '#6E2585', disc: '6–12%', linked: false },
  ]},
  { cat: 'Roofing & exterior', items: [
    { key: 'abc', name: 'ABC Supply', mono: 'ABC', tone: '#DA291C', disc: '8–14%', linked: false },
    { key: 'beacon', name: 'Beacon Building Products', mono: 'B', tone: '#5B2D82', disc: '7–13%', linked: false },
    { key: 'srs', name: 'SRS Distribution', mono: 'SRS', tone: '#1A428A', disc: '8–14%', linked: false },
  ]},
  { cat: 'General & specialty', items: [
    { key: 'homedepot', name: 'Home Depot Pro', mono: 'HD', tone: '#F96302', disc: '5–10%', linked: true },
    { key: 'lowes', name: 'Lowe\u2019s Pro', mono: 'L', tone: '#004990', disc: '5–10%', linked: false },
    { key: 'whitecap', name: 'White Cap', mono: 'WC', tone: '#DA291C', disc: '8–15%', linked: false },
    { key: 'siteone', name: 'SiteOne Landscape', mono: 'S1', tone: '#5E8AB4', disc: '7–12%', linked: false },
    { key: 'sherwin', name: 'Sherwin-Williams Pro', mono: 'SW', tone: '#0066B2', disc: '15–25%', linked: false },
    { key: 'grainger', name: 'Grainger', mono: 'GR', tone: '#CE1126', disc: '8–15%', linked: false },
    { key: 'sunbelt', name: 'Sunbelt Rentals', mono: 'SB', tone: '#00843D', disc: '10–20%', linked: false },
  ]},
];
const SUPPLY_STATS = { saved: 1840, rebate: 220 };

const REVIEWS = [
  { who: 'Elena R.', stars: 5, when: 'May 30', text: 'Marcus was on time, fair on price, and left the kitchen cleaner than he found it. Booking him for the water heater next.' },
  { who: 'Will T.', stars: 5, when: 'May 24', text: 'Quoted exactly what he charged. Shower fixed in under an hour.' },
];

// ─────────────────────────────────────────────────────────────
// SCOUT PROJECTS · JOB BOARD · HOME CHECK-UP
// ─────────────────────────────────────────────────────────────
const SCOUT_PROJECT = {
  id: 'PRJ-118', title: 'Full kitchen remodel', homeowner: 'Priya',
  addr: '2204 Alta Vista Ave, Austin 78704', source: 'Homeowner',
  quote: 48500, cutPct: 8,
  pieces: [
    { trade: 'Demolition', pay: 4200, status: 'scheduled', by: 'RG Hauling' },
    { trade: 'Plumbing', pay: 8600, status: 'open' },
    { trade: 'Electrical', pay: 7400, status: 'claimed', by: 'Okafor Electric' },
    { trade: 'Cabinets & Countertops', pay: 15200, status: 'open' },
    { trade: 'Flooring', pay: 6800, status: 'claimed', by: 'Tran Floors' },
    { trade: 'Painting', pay: 2420, status: 'open' },
  ],
};

const SCOUT_REQUESTS = [
  { from: 'Inspector', name: 'ATX Home Inspections', what: 'Report with 14 repair items — needs scoping & teams', when: '2h ago', tone: '#2563EB', share: true },
  { from: 'Agent', name: 'Kelly Nguyen · Compass', what: 'Pre-closing repairs — 6 items, closes Jul 24', when: 'Yesterday', tone: '#D97706', share: true },
  { from: 'Homeowner', name: 'Priya', what: 'Kitchen remodel — full scope', when: 'Active', tone: '#0D9488', share: false },
];

const HOME_CHECKUP = {
  addr: '2204 Alta Vista Ave', scoreBefore: 62, scoreAfter: 84,
  assets: [
    { k: 'Water heater', v: '50gal gas · 2014', flag: 'Aging — 12 yrs' },
    { k: 'Roof', v: 'Comp shingle · 2019', flag: null },
    { k: 'HVAC', v: '3-ton split · 2016', flag: 'Service due' },
    { k: 'Appliances', v: '6 documented · photos', flag: null },
    { k: 'Electrical panel', v: '200A · 2010', flag: null },
    { k: 'Plumbing', v: 'PEX repipe · 2021', flag: null },
  ],
};

// job board — pieces across all scout projects; claim is gated to your trades
const BOARD_JOBS = [
  { id: 'BD-301', trade: 'Plumbing', title: 'Rough-in & fixture set', project: 'Full kitchen remodel', scout: 'Marcus Reyes', addr: '2204 Alta Vista Ave, Austin 78704', mi: 2.4, start: 'Jul 14', pay: 8600,
    scope: 'Relocate sink supply and drain 3 ft left, run pot-filler line, set dishwasher, disposal, and faucet after cabinet install. Scope sheet + scout photos attached.' },
  { id: 'BD-298', trade: 'Drain', title: 'Main line descale — inspector item', project: 'Pre-closing repair package', scout: 'D. Furman', addr: '88 Rainey St #1204, Austin 78701', mi: 4.1, start: 'Jul 10', pay: 1150,
    scope: 'Inspection report item #6: descale cast-iron main, camera footage before and after for the closing file.' },
  { id: 'BD-297', trade: 'Freight & Hauling', title: 'Transport equipment to site', project: 'Full kitchen remodel', scout: 'Marcus Reyes', addr: '2204 Alta Vista Ave, Austin 78704', mi: 2.4, start: 'Jul 12', pay: 640,
    scope: 'Move cabinet order and appliance package from supplier dock to the jobsite. Liftgate required, two-person crew.' },
  { id: 'BD-295', trade: 'Electrical', title: 'Circuits, cans & under-cabinet', project: 'Full kitchen remodel', scout: 'Marcus Reyes', addr: '2204 Alta Vista Ave, Austin 78704', mi: 2.4, start: 'Jul 15', pay: 7400,
    scope: 'Two new 20A small-appliance circuits, 8 recessed cans, under-cabinet lighting, GFCI updates to code.' },
  { id: 'BD-292', trade: 'Cabinets & Countertops', title: 'Install — 14 boxes + quartz', project: 'Full kitchen remodel', scout: 'Marcus Reyes', addr: '2204 Alta Vista Ave, Austin 78704', mi: 2.4, start: 'Jul 21', pay: 15200,
    scope: 'Set 14 cabinet boxes, level and shim, template and install quartz counters with waterfall end.' },
  { id: 'BD-290', trade: 'Painting', title: 'Walls, ceiling & trim', project: 'Pre-closing repair package', scout: 'D. Furman', addr: '88 Rainey St #1204, Austin 78701', mi: 4.1, start: 'Jul 28', pay: 2420,
    scope: 'Patch, prime, two coats on walls and ceiling, enamel trim package per the closing punch list.' },
];

Object.assign(window, { PL, PRO, OFFERS, JOBS, EARNINGS, TIERS, NETWORK, SCOUT, ADDONS, SERVICES_ADDON, ZIP_SUGGEST, JOB_FEE, STORM, THREADS, WEEK, BOOKINGS, SUPPLIERS, SUPPLY_STATS, REVIEWS, SCOUT_PROJECT, SCOUT_REQUESTS, HOME_CHECKUP, BOARD_JOBS });
