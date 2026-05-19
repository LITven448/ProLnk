import { useState } from 'react';

const templates = [
  {
    trade: 'HVAC System Replacement',
    icon: '❄️',
    color: '#1E3A5F',
    template: `Dear [Homeowner Name],

Thank you for allowing me to assess your home's HVAC system at [Address] on [Date].

SCOPE OF WORK
- Complete removal and disposal of existing [Brand/Model] unit
- Installation of new [Brand] [Tonnage] ton, [SEER] SEER heat pump system
- Installation of air handler in [location]
- Replacement of [X] feet of refrigerant line set
- New programmable/smart thermostat installation
- System startup, calibration, and commissioning
- Ductwork inspection and repair of identified leaks

MATERIALS
- [Brand] [Model Number] outdoor condenser
- [Brand] [Model Number] air handler
- [Brand] thermostat
- All copper refrigerant lines, disconnect, whip
- Electrical: 240V circuit, breaker, permits

TIMELINE
Start: [Date] | Estimated Completion: [1-2 Days]
Permits pulled same day — no delays.

WARRANTY
- Equipment: 10-year parts, 10-year compressor
- Labor: 2-year workmanship guarantee
- Annual maintenance reminder included

PAYMENT TERMS
- Deposit: 0% required (we trust our work)
- Upon completion: 100% due (cash, check, or card)
- Financing available: 12 months same as cash through [Lender]

Total Investment: $[Amount]

[Your Name] | [License #] | [Phone] | [Email]
Questions? Call me anytime — I answer 7 days a week.`
  },
  {
    trade: 'Roof Replacement',
    icon: '🏠',
    color: '#7B4F2E',
    template: `Dear [Homeowner Name],

Following my inspection of your roof at [Address] on [Date], I am pleased to provide this proposal.

SCOPE OF WORK
- Complete tear-off of existing [Layer Count] layer(s) of shingles
- Disposal of all debris — property left cleaner than found
- Decking inspection; replacement of any deteriorated or soft decking (per sheet)
- Installation of [Brand] synthetic underlayment
- New drip edge on all eaves and rakes
- Ice and water shield in valleys and along eaves (first 3 feet)
- Installation of [Brand] [Product Line] architectural shingles, [Color]
- New pipe boot flashings (all penetrations)
- Ridge cap installation
- Cleanup with magnetic nail sweep

MATERIALS
- [Brand] [Product] shingles: [Quantity] squares
- [Brand] synthetic underlayment
- [Brand] ridge vent: [Linear Feet]
- All flashings, drip edge, and accessory materials

TIMELINE
Start: [Date] | Completion: 1 Day (weather permitting)
We do not leave jobs open overnight.

WARRANTY
- Shingles: [X]-year manufacturer warranty
- Labor: 5-year workmanship warranty
- Storm damage: we will re-inspect within 48 hours at no charge

PAYMENT TERMS
- Insurance job: work with your adjuster directly, balance due upon completion
- Cash/card: 10% deposit, remainder upon completion
- Financing: available

Total Investment: $[Amount] (or insurance net after deductible: $[Deductible])

[Your Name] | [License/Contractor #] | [Phone] | [Email]`
  },
  {
    trade: 'Foundation Pier Installation',
    icon: '🏗️',
    color: '#2D5016',
    template: `Dear [Homeowner Name],

Thank you for trusting me to evaluate the foundation at [Address]. Here is my professional assessment and proposal.

SCOPE OF WORK
- Installation of [X] steel push piers at identified failure points
- Excavation at each pier location (hand-dug to preserve landscaping where possible)
- Pier installation to stable load-bearing stratum (verified by torque monitoring)
- Hydraulic lift and leveling of affected slab sections
- Backfill and compaction of all excavations
- Interior crack injection at [X] locations (if applicable)
- Final elevation readings before and after (provided to you in writing)

MATERIALS
- [Brand] steel push piers, galvanized
- Hydraulic manifold system for uniform lift
- Polyurethane crack injection materials (if included)

TIMELINE
Start: [Date] | Completion: [1-2 Days]
All permits secured prior to start date.

WARRANTY
- Lifetime transferable warranty on all installed piers
- Annual elevation checks available at no charge for first 3 years
- Warranty transfers to new owner if home is sold

PAYMENT TERMS
- 10% deposit upon contract signing
- 90% due upon job completion
- Financing available: [Lender], rates from [X]%

Total Investment: $[Amount]

Note: This proposal is based on visible symptoms and standard pier depth for your soil type. Any additional piers identified during excavation will be presented before proceeding.

[Your Name] | [License #] | [Phone] | [Email]`
  },
  {
    trade: 'Electrical Panel Upgrade',
    icon: '⚡',
    color: '#8B4513',
    template: `Dear [Homeowner Name],

Thank you for having me evaluate your electrical system at [Address]. Below is my proposal for the work discussed.

SCOPE OF WORK
- Removal of existing [Brand/Amp] panel
- Installation of new [Brand] [200/400]-amp main breaker panel
- Transfer and labeling of all existing circuits
- Installation of [X] new circuits (as listed below)
- GFCI/AFCI protection updated per current code
- New grounding electrode system (if required)
- Coordination with [Utility] for meter pull and reconnect
- City permit, inspection, and final sign-off included

NEW CIRCUITS
[List specific circuits discussed, e.g.:]
- EV charger circuit: 240V/50A to garage
- Kitchen small appliance circuits (code compliance)
- Master bathroom update

MATERIALS
- [Brand] [Amp] residential load center
- All breakers, wire, conduit, and hardware
- New meter base (if required by utility)

TIMELINE
Start: [Date] | Day 1: Panel replacement | Day 2: Inspection
Power outage expected: 4-6 hours on installation day

WARRANTY
- 2-year labor warranty on all work performed
- Manufacturer warranty on panel and breakers
- Permit and inspection documents provided upon completion

PAYMENT TERMS
- 0% deposit for residential customers
- Full payment upon inspection sign-off
- Card, check, cash accepted

Total Investment: $[Amount]

[Your Name] | Master Electrician License #[XXXX] | [Phone] | [Email]`
  },
  {
    trade: 'Plumbing Repipe',
    icon: '🔧',
    color: '#1A3A5C',
    template: `Dear [Homeowner Name],

Following my inspection of the plumbing at [Address], I am providing this proposal for a complete repipe.

SCOPE OF WORK
- Complete removal of all existing [Galvanized/Polybutylene/Other] supply lines
- Installation of [PEX-A/Copper] throughout entire home
- [X] bathrooms, kitchen, laundry, and exterior hose bibs
- New angle stops at all fixtures
- New braided supply lines at all connections
- Water heater connections replaced
- Pressure test of completed system
- Drywall access patches (paint-ready finish)
- City permit, rough-in inspection, and final inspection included

MATERIALS
- [Brand] PEX-A tubing (most flexible, freeze-resistant)
- [Brand] expansion fittings (no crimps, no failures)
- All shutoffs, supply lines, and hardware
- Patch materials included

TIMELINE
Start: [Date] | Completion: 2-3 Days
Water service: interrupted Day 1 only (restored each evening)

WARRANTY
- Lifetime warranty on PEX-A pipe (manufacturer)
- 5-year labor warranty on all connections
- No leak — guaranteed or we fix it free

PAYMENT TERMS
- 10% deposit to schedule
- Progress payment (50%) after rough-in inspection passes
- Final payment upon completion and punch-walk
- Financing available

Total Investment: $[Amount]

[Your Name] | Master Plumber License #[XXXX] | [Phone] | [Email]
"We treat your home like our own — because your referrals are our future."`
  }
];

const checklist = [
  'Homeowner name and property address at the top',
  'Specific scope — what exactly will be done (no vague language)',
  'Brand names and model numbers for major equipment',
  'Start date and completion timeline',
  'Warranty terms — equipment AND labor separately',
  'Payment schedule with accepted payment methods',
  'Your license number and insurance confirmation',
  'Your direct cell number — not just an office line'
];

const mistakes = [
  '"Price good for 30 days" — creates urgency but also distrust. Use 7 days max.',
  'No scope of work — just a dollar amount with "labor and materials" is not a bid.',
  'Vague timelines like "weather permitting" without a defined start date.',
  'Missing warranty language — homeowners assume the worst if you don’t specify.',
  'Typos and grammatical errors — they signal you don’t care about details.'
];

const tips = [
  'Use the homeowner’s name in the opening and at least once more in the body.',
  'Reference something specific you observed: "the rust staining near your main shutoff suggests..."',
  'Follow up within 24 hours of delivering the bid — response rate drops 60% after that.',
  'Add a photo of the problem area in your email — it reinforces your diagnosis.',
  'Send via email AND text — different homeowners prefer different channels.'
];

export default function ProBidTemplates() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [copied, setCopied] = useState<number | null>(null);

  const handleCopy = (idx: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div style={{ background: '#FAFAF9', minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '60px 24px' }}>

        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'inline-block', background: '#FFC107', color: '#1E3A5F', fontFamily: 'sans-serif', fontWeight: 700, fontSize: 13, padding: '4px 14px', borderRadius: 20, marginBottom: 20, letterSpacing: 1 }}>
            FREE RESOURCE
          </div>
          <h1 style={{ fontSize: 38, fontWeight: 800, color: '#1E3A5F', lineHeight: 1.2, marginBottom: 20, fontFamily: 'Georgia, serif' }}>
            Win More Jobs — Proven Bid Templates<br />for DFW Home Service Pros
          </h1>
          <p style={{ fontSize: 18, color: '#444', maxWidth: 620, margin: '0 auto', lineHeight: 1.7, fontFamily: 'sans-serif' }}>
            ProLnk partners who use a professional bid format win <strong>34% more jobs</strong> than those who quote verbally or by text. These templates are yours — free.
          </p>
        </div>

        <div style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#1E3A5F', marginBottom: 24, fontFamily: 'Georgia, serif' }}>
            5 Trade-Specific Bid Templates
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {templates.map((t, idx) => (
              <div key={idx} style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E5E0', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <button
                  onClick={() => setExpanded(expanded === idx ? null : idx)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontSize: 28 }}>{t.icon}</span>
                    <span style={{ fontSize: 18, fontWeight: 700, color: '#1E3A5F', fontFamily: 'Georgia, serif' }}>{t.trade}</span>
                  </div>
                  <span style={{ fontSize: 22, color: '#FFC107', fontWeight: 700 }}>{expanded === idx ? '−' : '+'}</span>
                </button>
                {expanded === idx && (
                  <div style={{ padding: '0 24px 24px' }}>
                    <pre style={{ background: '#F5F5F0', borderRadius: 8, padding: 20, fontSize: 13.5, lineHeight: 1.8, color: '#333', whiteSpace: 'pre-wrap', fontFamily: 'Courier New, monospace', border: '1px solid #E0E0D8', margin: 0 }}>
                      {t.template}
                    </pre>
                    <button
                      onClick={() => handleCopy(idx, t.template)}
                      style={{ marginTop: 12, background: copied === idx ? '#4CAF50' : '#1E3A5F', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: 600, fontSize: 14, transition: 'background 0.2s' }}
                    >
                      {copied === idx ? '✓ Copied!' : 'Copy Template'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 56 }}>
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E5E0', padding: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#1E3A5F', marginBottom: 20, fontFamily: 'Georgia, serif' }}>
              ✅ What Every Winning Bid Includes
            </h2>
            <ol style={{ paddingLeft: 20, margin: 0, fontFamily: 'sans-serif' }}>
              {checklist.map((item, i) => (
                <li key={i} style={{ color: '#333', marginBottom: 10, lineHeight: 1.6, fontSize: 14.5 }}>{item}</li>
              ))}
            </ol>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E5E0', padding: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#C0392B', marginBottom: 20, fontFamily: 'Georgia, serif' }}>
              🚩 Common Bid Mistakes That Lose Jobs
            </h2>
            <ul style={{ paddingLeft: 20, margin: 0, fontFamily: 'sans-serif' }}>
              {mistakes.map((item, i) => (
                <li key={i} style={{ color: '#333', marginBottom: 12, lineHeight: 1.6, fontSize: 14.5 }}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E5E0', padding: 32, marginBottom: 56 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1E3A5F', marginBottom: 20, fontFamily: 'Georgia, serif' }}>
            💡 Personalization Tips That Increase Close Rate
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {tips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#FFC107', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: '#1E3A5F', flexShrink: 0, fontFamily: 'sans-serif' }}>
                  {i + 1}
                </div>
                <p style={{ color: '#444', lineHeight: 1.7, margin: 0, fontFamily: 'sans-serif', fontSize: 15 }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1E3A5F', borderRadius: 16, padding: '48px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#FFC107', marginBottom: 16, fontFamily: 'Georgia, serif' }}>
            Join ProLnk — Where Bids Become Leads Automatically
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, marginBottom: 28, lineHeight: 1.7, fontFamily: 'sans-serif', maxWidth: 500, margin: '0 auto 28px' }}>
            Stop chasing jobs. ProLnk delivers pre-qualified DFW homeowners who are ready to hire — so you spend your time doing work, not selling it.
          </p>
          <a
            href="/apply"
            style={{ display: 'inline-block', background: '#FFC107', color: '#1E3A5F', fontWeight: 800, fontSize: 17, padding: '16px 40px', borderRadius: 10, textDecoration: 'none', fontFamily: 'sans-serif', letterSpacing: 0.3 }}
          >
            Apply for Pro Access →
          </a>
        </div>

      </div>
    </div>
  );
}
