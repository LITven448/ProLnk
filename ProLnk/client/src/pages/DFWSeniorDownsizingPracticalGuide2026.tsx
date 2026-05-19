import { useState } from 'react';

const situations = [
  {
    id: 'presale',
    label: '🔨 Pre-Sale Home Prep',
    steps: [
      '🏠 Start 6-12 months before listing — rushed prep shows and costs you in offers',
      '📋 Priority repairs: roof condition, HVAC age, water heater, foundation (Dallas clay soil moves)',
      '🎨 Paint: neutral colors sell faster — Sherwin-Williams "Accessible Beige" is a DFW favorite',
      '✅ ProLnk: Get a verified contractor to do a pre-sale inspection punch list',
      '💡 ROI: Kitchen and bathroom refreshes return 80-95 cents per dollar spent in DFW market',
      '🚫 Don\’t over-renovate — buyers want to personalize; focus on condition, not taste',
    ],
  },
  {
    id: 'timeline',
    label: '📅 Selling vs. Listing Timeline',
    steps: [
      '📊 DFW Market 2026: Average days on market ~28 days in Collin County, ~35 in Dallas County',
      '🗓️ Best time to list: March-May (spring buyers) or August-September (corporate relocations)',
      '🤝 Consider cash offers for speed — iBuyer programs (Opendoor, Offerpad) offer 7-day close',
      '💸 Traditional listing: 3-6% commission but often nets 5-10% more than cash offer',
      '📦 Factor in moving time: DFW movers book 4-8 weeks out in peak season (May-Aug)',
      '📞 ProLnk can complete any pre-sale repairs within your listing timeline',
    ],
  },
  {
    id: 'communities',
    label: '🏘️ DFW 55+ Communities',
    steps: [
      '🏆 Robson Ranch (Denton): ~3,800 homes, golf, pools, 100+ clubs — most popular DFW 55+ community',
      '🏗️ Del Webb Sunridge (Frisco): Newer, higher price point, top-rated amenities',
      '🌿 Sun City Texas (Georgetown): Larger community if open to 1hr from DFW',
      '🏙️ Active Adult apartments: Solera, Vi at Silverstone — no maintenance ownership model',
      '📋 Key questions: HOA fees (typically $300-600/mo), pet policies, care escalation options',
      '💡 Many 55+ communities have a 6-12 month wait list — start visiting 1 year before planned move',
    ],
  },
  {
    id: 'downsizing',
    label: '📦 Moving, Storage & Estate Sales',
    steps: [
      '🏠 Estate sale companies: DFW has 50+ licensed estate sale firms — they typically keep 30-35%',
      '📦 Senior move managers: NASMM-certified pros who specialize in helping seniors downsize compassionately',
      '🚛 Top DFW senior-friendly movers: Two Men and a Truck, College Hunks (both senior-service trained)',
      '🗄️ Storage: CubeSmart, Extra Space — month-to-month, climate-controlled for furniture/art',
      '👨‍👩‍👧 Family coordination: assign a "keeper of the list" — document who gets what before the sale',
      '✅ ProLnk can handle the pre-sale repairs while you focus on the move coordination',
    ],
  },
];

export default function DFWSeniorDownsizingPracticalGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = situations.find((s) => s.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📦</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', fontWeight: 700, margin: '0 0 0.5rem' }}>
            DFW Senior Downsizing Practical Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
            Step-by-step guide for DFW seniors ready to downsize — repairs, timing, 55+ communities, and moving logistics
          </p>
        </div>

        <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: 8, padding: '1rem', marginBottom: '2rem' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#F5E642' }}>
            📊 <strong>DFW Market 2026:</strong> Median home price in DFW has risen 40%+ since 2020. Seniors who bought before 2015 are sitting on major equity — a well-executed downsize can free $200K-$500K+ in tax-advantaged capital.
          </p>
        </div>

        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem' }}>
          Select your situation to see your downsizing action plan:
        </p>

        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {situations.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(selected === s.id ? null : s.id)}
              style={{
                background: selected === s.id ? '#F5E642' : '#1e2d45',
                color: selected === s.id ? '#0A1628' : '#fff',
                border: '1px solid #334155',
                borderRadius: 8,
                padding: '0.9rem 1.2rem',
                textAlign: 'left',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.15s',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#1e2d45', border: '1px solid #334155', borderRadius: 10, padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>{active.label} — Action Plan</h2>
            <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
              {active.steps.map((step, i) => (
                <li key={i} style={{ marginBottom: '0.6rem', color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.5 }}>{step}</li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: '#1e2d45', border: '1px solid #334155', borderRadius: 8, padding: '1rem', marginBottom: '1.5rem' }}>
          <p style={{ margin: '0 0 0.5rem', fontWeight: 700, color: '#F5E642', fontSize: '0.9rem' }}>📋 ProLnk Downsizing Checklist:</p>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#e2e8f0', fontSize: '0.9rem' }}>
            <li>Pre-sale inspection + punch list repairs</li>
            <li>Cosmetic updates: paint, fixtures, curb appeal</li>
            <li>Clean-up and junk removal before listing photos</li>
            <li>Post-sale repairs at new smaller home or condo</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', background: '#1e2d45', borderRadius: 10, padding: '1.5rem' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 0.5rem', fontSize: '1rem' }}>
            🏡 ProLnk — DFW Pre-Sale Repair Specialists
          </p>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
            Get your home ready to sell with verified DFW contractors. Fast, honest, senior-friendly service.
          </p>
        </div>
      </div>
    </div>
  );
}
