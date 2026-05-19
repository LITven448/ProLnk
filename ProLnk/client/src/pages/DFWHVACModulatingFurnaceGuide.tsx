import { useState } from 'react';

const stages = [
  {
    type: 'Single Stage',
    icon: '🔵',
    description: 'On or off — runs at 100% capacity every time.',
    dfwFit: 'Adequate',
    bestFor: 'Tight budgets, older homes with simple ductwork',
    cost: 'Base price',
    dfwNote: 'Most DFW homes use heat 2–4 months/year. Single stage handles this just fine at lowest cost.',
    color: '#4A9EFF',
  },
  {
    type: 'Two Stage',
    icon: '🟡',
    description: 'Low stage (65%) for mild days, high stage (100%) for cold snaps.',
    dfwFit: 'Best Match for DFW',
    bestFor: 'Most DFW homes — captures 80% of modulating benefits at 30% of premium',
    cost: '+$300–$600 vs single stage',
    dfwNote: 'DFW\’s occasional cold snaps (20–30°F) benefit from the high stage, while mild winter days run efficiently on low. This is the DFW sweet spot.',
    color: '#F5E642',
  },
  {
    type: 'Modulating',
    icon: '🟢',
    description: 'Runs anywhere from 40–100% in tiny increments — maximum comfort and efficiency.',
    dfwFit: 'Overkill for Most DFW Homes',
    bestFor: 'Large custom homes, cold climates, year-round comfort obsessives',
    cost: '+$1,200–$2,500 vs single stage',
    dfwNote: 'DFW rarely needs a furnace. You\’re paying $2K+ premium for a system that runs 3 months/year. ROI is very poor for typical DFW usage patterns.',
    color: '#7ED321',
  },
];

const scenarios = [
  { usage: 'Small home (< 1,500 sq ft)', months: 2, rec: 'Single Stage', reason: 'Low heating load, short season — extra cost never pays back.' },
  { usage: 'Medium home (1,500–2,500 sq ft)', months: 3, rec: 'Two Stage', reason: 'DFW sweet spot — low stage for mild days, high stage for cold snaps, $400 premium recovers in 5–7 years.' },
  { usage: 'Large home (2,500–4,000 sq ft)', months: 3, rec: 'Two Stage', reason: 'High-stage capacity handles large DFW cold snaps without oversizing a modulating unit.' },
  { usage: 'Very large / custom (4,000+ sq ft)', months: 4, rec: 'Modulating', reason: 'Complex duct system, zoning, premium comfort expectations justify the modulating cost.' },
  { usage: 'Year-round allergies / air quality', months: 3, rec: 'Two Stage', reason: 'Longer, lower-speed runtime improves filtration — modulating adds cost without proportional benefit.' },
];

export default function DFWHVACModulatingFurnaceGuide() {
  const [stageOpen, setStageOpen] = useState<number | null>(null);
  const [homeSize, setHomeSize] = useState<number | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', color: '#F5E642', fontSize: '0.85rem', fontWeight: 700, letterSpacing: 2 }}>DFW HVAC GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.2 }}>Modulating vs Two-Stage Furnace for DFW</h1>
        <p style={{ color: '#8A9BB5', marginBottom: '2rem' }}>DFW uses furnaces 2–4 months per year. Here's which furnace stage is actually worth paying for.</p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '2rem', fontWeight: 700 }}>
          ❄️ DFW Bottom Line: <span style={{ fontWeight: 400 }}>Modulating furnaces are overkill for most DFW homes. Two-stage is the sweet spot — captures 80% of the efficiency/comfort benefits at a fraction of the premium. Single stage is fine for smaller homes.</span>
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>Furnace Stage Comparison</h2>
        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
          {stages.map((s, i) => (
            <div key={i} onClick={() => setStageOpen(stageOpen === i ? null : i)}
              style={{ background: stageOpen === i ? '#162035' : '#111D33', border: `1.5px solid ${stageOpen === i ? s.color : '#1E2D45'}`, borderRadius: 10, padding: '1rem 1.25rem', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
                  <div>
                    <span style={{ fontWeight: 800, color: s.color }}>{s.type}</span>
                    <div style={{ fontSize: '0.8rem', color: '#8A9BB5', marginTop: 2 }}>DFW Fit: {s.dfwFit}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.85rem' }}>{s.cost}</div>
                  <div style={{ color: '#8A9BB5', fontSize: '0.75rem', marginTop: 2 }}>{stageOpen === i ? '▲' : '▼'}</div>
                </div>
              </div>
              {stageOpen === i && (
                <div style={{ marginTop: '0.75rem', borderTop: '1px solid #1E2D45', paddingTop: '0.75rem' }}>
                  <p style={{ marginBottom: '0.5rem' }}>{s.description}</p>
                  <div style={{ background: '#0A1628', borderRadius: 6, padding: '0.5rem 0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#8A9BB5', fontSize: '0.85rem' }}>Best for: </span>{s.bestFor}
                  </div>
                  <div style={{ background: stageOpen === i ? '#0D1F0D' : '#0A1628', borderRadius: 6, padding: '0.5rem 0.75rem', borderLeft: `3px solid ${s.color}` }}>
                    <span style={{ color: s.color, fontWeight: 700, fontSize: '0.85rem' }}>DFW Reality: </span>
                    <span style={{ fontSize: '0.9rem' }}>{s.dfwNote}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', color: '#F5E642' }}>🏠 My DFW Home → Furnace Recommendation</h2>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {scenarios.map((s, i) => (
            <div key={i} onClick={() => setHomeSize(homeSize === i ? null : i)}
              style={{ background: homeSize === i ? '#162035' : '#111D33', border: `1.5px solid ${homeSize === i ? '#F5E642' : '#1E2D45'}`, borderRadius: 8, padding: '0.75rem 1rem', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>{s.usage}</span>
                <span style={{ color: '#F5E642', fontWeight: 800 }}>{s.rec}</span>
              </div>
              {homeSize === i && (
                <div style={{ marginTop: '0.5rem', color: '#8A9BB5', fontSize: '0.9rem' }}>
                  <div style={{ marginBottom: '0.25rem', color: '#8A9BB5' }}>Avg DFW heating use: {s.months} months/year</div>
                  {s.reason}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
