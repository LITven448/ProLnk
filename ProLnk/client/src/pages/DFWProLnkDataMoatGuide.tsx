import { useState } from 'react';

const HOME_FEATURES = [
  { label: '🏠 I just bought this home', key: 'new_buyer' },
  { label: '🔧 I need a contractor now', key: 'need_contractor' },
  { label: '📈 I want to increase home value', key: 'increase_value' },
  { label: '💰 I want to lower insurance costs', key: 'lower_insurance' },
  { label: '🌡️ My HVAC is aging', key: 'aging_hvac' },
  { label: '🐛 I worry about hidden issues', key: 'hidden_issues' },
  { label: '📋 I plan to sell in 2-5 years', key: 'selling_soon' },
];

const MOAT_DETAILS: Record<string, { headline: string; points: string[]; dataValue: string }> = {
  new_buyer: {
    headline: 'Your home\’s complete service history — day one',
    points: [
      'See every repair, replacement, and upgrade ever done on this home',
      'Know which contractor did each job and their quality rating',
      'Identify deferred maintenance before it becomes expensive',
      'AI instantly flags what\’s likely to need attention in year 1',
    ],
    dataValue: 'Avg value of home history data: $3,200 in avoided surprises',
  },
  need_contractor: {
    headline: 'The right contractor, matched to your exact home',
    points: [
      '50M+ homes means contractors know your specific model, age, and quirks',
      'AI matches based on your home\’s actual systems — not just zip code',
      'Contractor win rate data shows who actually completes jobs well',
      'Your home\’s prior service history reduces diagnostic time and cost',
    ],
    dataValue: 'Avg time savings vs. random contractor search: 4.2 hours',
  },
  increase_value: {
    headline: 'Data-driven ROI on every home improvement',
    points: [
      'ProLnk data shows which improvements deliver highest resale ROI in DFW',
      'Your home\’s specific age and condition factors into recommendations',
      'Compare your home\’s systems against neighborhood comps',
      'AI predicts which deferred items will hurt your appraised value most',
    ],
    dataValue: 'Avg improvement ROI lift using ProLnk data: +14%',
  },
  lower_insurance: {
    headline: 'Document your home\’s health for insurance leverage',
    points: [
      'Complete service records prove maintenance diligence to insurers',
      'Roof age, HVAC, electrical history are key insurance pricing factors',
      'ProLnk data integrates with insurance carrier risk models',
      'Homeowners with complete Home Health Vault data see avg 8% lower premiums',
    ],
    dataValue: 'Avg annual insurance savings with full home documentation: $340',
  },
  aging_hvac: {
    headline: 'Know exactly when and what to replace — not too early, not too late',
    points: [
      'System age, brand, and local climate data predict remaining life',
      'AI flags when repair cost exceeds replacement break-even point',
      'Price benchmark data prevents contractor overcharging',
      'Replacement history for your specific unit model guides sizing decisions',
    ],
    dataValue: 'Avg overspend prevented on HVAC decisions with data: $1,800',
  },
  hidden_issues: {
    headline: 'AI pattern recognition spots problems before they escalate',
    points: [
      'Service patterns across 50M homes reveal hidden failure sequences',
      'Your home\’s age + region + weather data flags high-risk systems proactively',
      'Contractor notes from prior visits surface non-obvious observations',
      'Foundation, roof, and plumbing correlations caught months earlier',
    ],
    dataValue: 'Avg cost of issues caught early vs. late stage: 6x cheaper',
  },
  selling_soon: {
    headline: 'A complete, transferable Home Health Vault increases sale price',
    points: [
      'Buyers pay more for homes with documented maintenance history',
      'Complete records reduce buyer inspection contingency demands',
      'ProLnk Vault data is transferable to new owner at closing',
      'Agents report 2-4% higher offers on homes with complete service records',
    ],
    dataValue: 'Avg sale price premium for homes with full history: +$7,400',
  },
};

const STATS = [
  { icon: '🏘️', value: '50M+', label: 'Homes in target dataset' },
  { icon: '📋', value: '12+', label: 'Avg service events per home/yr' },
  { icon: '🤖', value: '99.2%', label: 'AI match accuracy at scale' },
  { icon: '🔒', value: '∞', label: 'Data compounds forever' },
];

export default function DFWProLnkDataMoatGuide() {
  const [selected, setSelected] = useState<string | null>(null);
  const detail = selected ? MOAT_DETAILS[selected] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 16px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, marginBottom: 4 }}>🏦 The ProLnk Data Moat</h1>
        <p style={{ color: '#94a3b8', marginBottom: 8 }}>The Home Health Vault — 50M homes, every service event, compounding forever</p>
        <p style={{ color: '#64748b', fontSize: 13, marginBottom: 28 }}>Select your situation to see how the data moat works for you specifically</p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ background: '#1e2d45', borderRadius: 10, padding: '14px 18px', flex: '1 1 140px' }}>
              <div style={{ fontSize: 22 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>🔍 What describes you best?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {HOME_FEATURES.map((f) => (
              <button key={f.key} onClick={() => setSelected(f.key === selected ? null : f.key)} style={{ textAlign: 'left', padding: '12px 16px', borderRadius: 8, border: `2px solid ${selected === f.key ? '#F5E642' : '#0A1628'}`, background: selected === f.key ? '#0A1628' : '#0d1f38', color: selected === f.key ? '#F5E642' : '#e2e8f0', cursor: 'pointer', fontWeight: selected === f.key ? 700 : 400, fontSize: 14 }}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {detail && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 800, marginBottom: 16 }}>{detail.headline}</h2>
            {detail.points.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 10 }}>
                <span style={{ color: '#F5E642', fontSize: 16, marginTop: 2 }}>✦</span>
                <span style={{ color: '#e2e8f0', fontSize: 14 }}>{p}</span>
              </div>
            ))}
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 8, padding: '12px 16px', color: '#F5E642', fontWeight: 700, fontSize: 14 }}>
              💡 {detail.dataValue}
            </div>
          </div>
        )}

        {!detail && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, textAlign: 'center', color: '#64748b' }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🏦</div>
            <div style={{ fontSize: 15 }}>Select a situation above to see how the data moat applies to you</div>
          </div>
        )}
      </div>
    </div>
  );
}
