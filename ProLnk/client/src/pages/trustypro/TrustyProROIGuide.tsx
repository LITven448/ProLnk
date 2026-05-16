import { useState } from 'react';

const roiScenarios = [
  {
    situation: 'Buying a Home',
    roi: '$5,000–$15,000 saved on foundation negotiations',
    description: 'A TrustyPro scan before making an offer reveals foundation concerns a standard inspection might miss. Armed with data, buyers negotiate repairs or price reductions averaging $8,400.',
    timeframe: 'Before closing',
    multiplier: '40x ROI on scan cost',
  },
  {
    situation: 'Selling a Home',
    roi: '$8,000–$12,000 listing premium',
    description: 'Sellers with verified TrustyPro scan history command higher prices. Buyers pay more for documented home health, and deals close 11 days faster on average in DFW.',
    timeframe: 'At listing',
    multiplier: '55x ROI on scan cost',
  },
  {
    situation: 'Hiring a Contractor',
    roi: 'Stop overpaying by 20–40%',
    description: 'When a contractor quotes $12,000 for HVAC work, your TrustyPro scan data shows what actually needs replacing vs. what is being upsold. Average savings: $2,800 per project.',
    timeframe: 'Before work begins',
    multiplier: '14x ROI on scan cost',
  },
  {
    situation: 'Planning Renovations',
    roi: 'Prioritize the right projects first',
    description: 'Spending $40K on a kitchen remodel before fixing a moisture issue costs more long-term. TrustyPro identifies hidden priorities so your renovation budget goes where it matters.',
    timeframe: 'Before budgeting',
    multiplier: 'Avoid $10K+ mistakes',
  },
  {
    situation: 'Inherited Property',
    roi: 'Full condition clarity in one afternoon',
    description: 'Inheriting a property with unknown history is stressful. A TrustyPro scan gives you a clear picture of what you own — foundation, roof, moisture, HVAC indicators — in hours.',
    timeframe: 'Immediately',
    multiplier: 'Replace months of guessing',
  },
];

export default function TrustyProROIGuide() {
  const [selected, setSelected] = useState(0);
  const scenario = roiScenarios[selected];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050d1a', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '48px 24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>📊</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '12px' }}>TrustyPro ROI Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            DFW homeowners who scan before they act save thousands. Here is how the numbers break down for your situation.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '36px' }}>
          {roiScenarios.map((s, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              style={{
                padding: '12px 8px',
                borderRadius: '10px',
                border: `2px solid ${selected === i ? '#4F46E5' : '#1e2d45'}`,
                backgroundColor: selected === i ? '#4F46E5' : '#0d1f35',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
              }}
            >
              {s.situation}
            </button>
          ))}
        </div>
        <div style={{ backgroundColor: '#0d1f35', borderRadius: '16px', padding: '36px', border: '1px solid #1e2d45', marginBottom: '36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '6px' }}>{scenario.situation}</h2>
              <span style={{ backgroundColor: '#FACC1522', color: '#FACC15', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700 }}>
                {scenario.multiplier}
              </span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#4F46E5', fontSize: '0.8rem', marginBottom: '4px' }}>TYPICAL ROI</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FACC15' }}>{scenario.roi}</div>
            </div>
          </div>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: '20px' }}>{scenario.description}</p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '16px' }}>⏱️</span>
            <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Best time to scan: <strong style={{ color: '#fff' }}>{scenario.timeframe}</strong></span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '48px' }}>
          {[
            { icon: '🏠', label: 'Avg DFW Home Value', value: '$385K' },
            { icon: '💰', label: 'Avg Savings Per Scan', value: '$6,200' },
            { icon: '📅', label: 'DFW Beta Access', value: 'Summer 2026' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: '#0d1f35', borderRadius: '12px', padding: '20px', textAlign: 'center', border: '1px solid #1e2d45' }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FACC15', marginBottom: '4px' }}>{stat.value}</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
            TrustyPro is launching in DFW first. Join the waitlist to be part of the beta scan program.
          </p>
        </div>
      </div>
    </div>
  );
}
