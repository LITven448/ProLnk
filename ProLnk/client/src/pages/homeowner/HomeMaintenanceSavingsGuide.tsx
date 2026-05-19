import { useState } from 'react';

interface Strategy {
  id: string;
  rank: number;
  title: string;
  detail: string;
  savings: number;
  emoji: string;
}

const strategies: Strategy[] = [
  {
    id: 'hvac-contract',
    rank: 1,
    emoji: '❄️',
    title: 'Annual HVAC service contract',
    detail: 'Prevents $2,800+ emergency calls. Bi-annual tune-ups catch refrigerant leaks, dirty coils, and failing capacitors before they escalate.',
    savings: 1400,
  },
  {
    id: 'off-season',
    rank: 2,
    emoji: '📅',
    title: 'Book off-season (Oct-Apr for HVAC, May for roofing)',
    detail: 'Contractors discount 20-30% during slow season. Same work, same crew, lower price.',
    savings: 450,
  },
  {
    id: 'diy-basics',
    rank: 3,
    emoji: '🔧',
    title: 'DIY basic maintenance',
    detail: 'Air filters ($12 each), caulk ($6), and gutter cleaning (2 hrs/yr) prevent expensive downstream damage.',
    savings: 400,
  },
  {
    id: 'neighbor-group',
    rank: 4,
    emoji: '🏘️',
    title: 'Group service with neighbors',
    detail: 'Contractors love same-street jobs. Coordinate 3+ neighbors for 10% off — splits travel time.',
    savings: 200,
  },
  {
    id: 'foundation-water',
    rank: 5,
    emoji: '💧',
    title: 'Preventive foundation watering',
    detail: 'DFW clay soil is notorious. $80 soaker hose + timer prevents $8,000-22,000 foundation repairs. Most impactful DFW-specific action.',
    savings: 750,
  },
  {
    id: 'pest-contract',
    rank: 6,
    emoji: '🐜',
    title: 'Annual pest contract vs. reactive treatment',
    detail: '$480/yr contract vs. $1,200+ in reactive callouts. Includes termite inspection — DFW termite activity is among the highest in the US.',
    savings: 720,
  },
  {
    id: 'insurance',
    rank: 7,
    emoji: '🛡️',
    title: 'Insurance review + available discounts',
    detail: 'Security system: $162/yr off. New roof: $486/yr off. Bundle auto + home: $200/yr off. Most homeowners never ask.',
    savings: 325,
  },
  {
    id: 'catch-early',
    rank: 8,
    emoji: '🔍',
    title: 'Catch small issues early',
    detail: 'A $50 plumber call for a slow drain prevents a $600 pipe clearing. A $30 caulk job prevents a $400 water damage repair.',
    savings: 300,
  },
  {
    id: 'water-softener',
    rank: 9,
    emoji: '🌊',
    title: 'Water softener (DFW water is very hard)',
    detail: 'Hard water destroys water heaters, dishwashers, and washing machines 30% faster. Softener extends all appliance lifespans.',
    savings: 400,
  },
  {
    id: 'prolnk-ai',
    rank: 10,
    emoji: '🤖',
    title: 'ProLnk AI detection (active members)',
    detail: 'AI flags deteriorating home systems before they fail. Active TrustyPro vault members save avg $847/yr by catching issues in the $50-200 range before they hit $2,000+.',
    savings: 847,
  },
];

export default function HomeMaintenanceSavingsGuide() {
  const [active, setActive] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setActive(prev => ({ ...prev, [id]: !prev[id] }));
  const totalPotential = strategies.reduce((s, st) => s + st.savings, 0);
  const totalSelected = strategies.filter(st => active[st.id]).reduce((s, st) => s + st.savings, 0);
  const selectedCount = Object.values(active).filter(Boolean).length;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#F1F5F9', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '12px', color: '#3B82F6', fontWeight: '700', letterSpacing: '0.1em', marginBottom: '8px' }}>
            DFW HOMEOWNER RESOURCE
          </div>
          <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: '800', lineHeight: 1.2 }}>
            Home Maintenance Savings Guide
          </h1>
          <p style={{ margin: '0 0 6px', color: '#94A3B8', fontSize: '15px' }}>
            DFW homeowners spend avg <strong style={{ color: '#F1F5F9' }}>$4,200/year</strong> on maintenance.
            These strategies reduce it by 30-40%.
          </p>
          <p style={{ margin: 0, color: '#64748B', fontSize: '13px' }}>
            Toggle the strategies you'll apply to see your personalized savings estimate.
          </p>
        </div>

        <div style={{
          background: '#0F2035',
          border: '1px solid #1E4080',
          borderRadius: '14px',
          padding: '24px',
          marginBottom: '32px',
          display: 'flex',
          gap: '32px',
          flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1, minWidth: '160px' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600', letterSpacing: '0.06em', marginBottom: '6px' }}>
              TOTAL POTENTIAL SAVINGS
            </div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: '#34D399' }}>
              ${totalPotential.toLocaleString()}/yr
            </div>
            <div style={{ fontSize: '13px', color: '#64748B' }}>if you apply all 10 strategies</div>
          </div>
          <div style={{ flex: 1, minWidth: '160px' }}>
            <div style={{ fontSize: '12px', color: '#64748B', fontWeight: '600', letterSpacing: '0.06em', marginBottom: '6px' }}>
              YOUR SELECTED SAVINGS
            </div>
            <div style={{ fontSize: '36px', fontWeight: '800', color: selectedCount > 0 ? '#FBBF24' : '#1E3A5F' }}>
              ${totalSelected.toLocaleString()}/yr
            </div>
            <div style={{ fontSize: '13px', color: '#64748B' }}>{selectedCount} strategies selected</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          {strategies.map(st => (
            <div
              key={st.id}
              onClick={() => toggle(st.id)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '16px',
                background: active[st.id] ? '#0F2918' : '#0F1E38',
                borderRadius: '12px',
                border: `1px solid ${active[st.id] ? '#166534' : '#1E3A5F'}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '6px',
                border: `2px solid ${active[st.id] ? '#22C55E' : '#3B82F6'}`,
                background: active[st.id] ? '#22C55E' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px',
                fontSize: '14px',
                fontWeight: '700',
                color: '#0A1628',
              }}>
                {active[st.id] ? '✓' : ''}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '18px' }}>{st.emoji}</span>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: active[st.id] ? '#6EE7B7' : '#F1F5F9' }}>
                    {st.title}
                  </span>
                  <span style={{
                    marginLeft: 'auto',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: active[st.id] ? '#34D399' : '#64748B',
                    background: active[st.id] ? '#0F2918' : '#0A1628',
                    border: `1px solid ${active[st.id] ? '#166534' : '#1E3A5F'}`,
                    padding: '2px 10px',
                    borderRadius: '20px',
                  }}>
                    saves ${st.savings.toLocaleString()}/yr
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.6 }}>{st.detail}</div>
              </div>
            </div>
          ))}
        </div>

        {selectedCount >= 5 && (
          <div style={{
            background: '#0F2918',
            border: '1px solid #166534',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🏆</div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#22C55E', marginBottom: '4px' }}>
              You're in the top 20% of DFW homeowners
            </div>
            <div style={{ fontSize: '14px', color: '#86EFAC' }}>
              Applying {selectedCount} strategies saves you ${totalSelected.toLocaleString()}/yr — that's ${Math.round(totalSelected / 12).toLocaleString()}/month back in your pocket.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
