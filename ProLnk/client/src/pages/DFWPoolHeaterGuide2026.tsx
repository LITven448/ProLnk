import { useState } from 'react';

export default function DFWPoolHeaterGuide2026() {
  const [poolSize, setPoolSize] = useState('');
  const [usePattern, setUsePattern] = useState('');
  const [rec, setRec] = useState<{ type: string; reason: string; cost: string; note: string } | null>(null);

  const heaterTypes = [
    { name: 'Gas Heater', icon: '🔥', speed: 'Fastest (1–2 hrs)', efficiency: 'Low (80–85% efficient)', cost: '$1,500–$3,500 installed', note: 'Best for DFW cold snaps — heats pool fast when north wind drops temps to 35°F overnight.' },
    { name: 'Heat Pump', icon: '⚡', speed: 'Slow (24–48 hrs)', efficiency: 'High (500% COP)', cost: '$2,500–$5,000 installed', note: 'Most efficient for DFW mild winters — works great Oct–Nov and Feb–Mar. Struggles below 45°F.' },
    { name: 'Solar Heating', icon: '☀️', speed: 'Slow (weather-dependent)', efficiency: 'Free energy', cost: '$3,000–$6,000 installed', note: 'Excellent supplemental heat for DFW with 230+ sunny days/year. Cannot handle DFW cold snaps alone.' },
    { name: 'Dual System (Gas + Heat Pump)', icon: '🔄', speed: 'Best of both', efficiency: 'Heat pump daily, gas backup', cost: '$4,500–$8,000 installed', note: 'The ultimate DFW setup — heat pump handles 90% of season, gas handles winter cold snaps. Most popular in Frisco/Plano.' },
  ];

  const poolSizes = [
    { id: 'small', label: '🏊 Small (under 10k gal)' },
    { id: 'medium', label: '🏊 Medium (10k–20k gal)' },
    { id: 'large', label: '🏊 Large (20k+ gal)' },
  ];

  const patterns = [
    { id: 'yearround', label: '📅 Year-Round Use' },
    { id: 'seasonal', label: '🍂 Seasonal (Spring-Fall)' },
    { id: 'occasional', label: '🌡️ Cold Snap Response Only' },
    { id: 'eco', label: '🌿 Eco / Lowest Running Cost' },
  ];

  const matrix: Record<string, Record<string, { type: string; reason: string; cost: string; note: string }>> = {
    yearround: {
      small: { type: 'Dual System', reason: 'Year-round DFW use needs both efficiency (heat pump) and cold snap response (gas). Best ROI for 12-month swimmers.', cost: '$4,500–$8,000', note: 'Heat pump handles 90% of heating costs — gas covers the 5-6 DFW freeze events per year.' },
      medium: { type: 'Dual System', reason: 'Medium pools + year-round use = dual system is the clear winner in DFW cost/comfort math.', cost: '$5,000–$8,500', note: 'Expect $80–150/mo in winter energy costs vs $300+ with gas-only.' },
      large: { type: 'Dual System', reason: 'Large pools are expensive to heat with gas alone — heat pump savings are massive at scale in DFW.', cost: '$6,000–$10,000', note: 'Heat pump pays for itself in 2–3 DFW winters vs gas-only operation.' },
    },
    seasonal: {
      small: { type: 'Heat Pump', reason: 'DFW spring/fall weather is ideal for heat pump — efficient, quiet, and low operating cost for seasonal use.', cost: '$2,500–$4,000', note: 'Works perfectly Oct–Nov and Mar–May in DFW. Just drain or cover for hard winter months.' },
      medium: { type: 'Heat Pump', reason: 'Seasonal DFW use + medium pool = heat pump sweet spot. Low operating cost, high efficiency.', cost: '$3,000–$5,000', note: 'COP of 5.0+ in DFW shoulder seasons — very low monthly energy cost.' },
      large: { type: 'Dual System', reason: 'Large seasonal pool benefits from dual system — heat pump for daily use, gas for unexpected cold snaps.', cost: '$5,500–$9,000', note: 'Protects your investment when DFW weather surprises you with an early cold front.' },
    },
    occasional: {
      small: { type: 'Gas Heater', reason: 'Cold snap response only means you need fast heat — gas is the only option that warms a DFW pool in 2 hours.', cost: '$1,500–$2,500', note: 'Low upfront cost, low annual use — gas wins for DFW occasional/emergency heating.' },
      medium: { type: 'Gas Heater', reason: 'Same logic — fast response for DFW cold snaps. A heat pump is too slow when you decide to swim tomorrow.', cost: '$2,000–$3,000', note: 'Budget ~$50–80 per cold snap heating session in DFW at current gas rates.' },
      large: { type: 'Gas Heater', reason: 'Occasional use of a large pool in DFW cold snaps still points to gas — fastest heat delivery.', cost: '$2,500–$3,500', note: 'Oversized BTU rating recommended for large DFW pools — 400k BTU minimum for 20k gal.' },
    },
    eco: {
      small: { type: 'Solar Heating', reason: 'DFW gets 230+ sunny days/year — solar is free energy and perfect for eco-minded DFW homeowners.', cost: '$3,000–$5,000', note: 'Add a gas backup for DFW cold snaps. Solar + gas is the eco DFW combo.' },
      medium: { type: 'Heat Pump', reason: 'Heat pump has 500% efficiency (COP 5.0) — lowest operating cost for DFW eco homeowners with medium pools.', cost: '$3,000–$5,000', note: 'Pay once, save every month. Pairs well with solar panels if you have them on the DFW roof.' },
      large: { type: 'Heat Pump', reason: 'Large pool eco choice in DFW is clear — heat pump running costs are 5x less than gas at current DFW energy rates.', cost: '$4,000–$6,000', note: 'Variable-speed heat pump recommended — ramps down at night to save DFW peak energy charges.' },
    },
  };

  const handleGenerate = () => {
    if (poolSize && usePattern) {
      const result = matrix[usePattern]?.[poolSize];
      setRec(result || null);
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '3rem' }}>🏊</span>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '.5rem 0' }}>DFW Pool Heater Guide 2026</h1>
          <p style={{ color: '#94a3b8' }}>Gas, heat pump, solar — the right choice for your DFW pool depends on your use pattern and cold snap tolerance.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {heaterTypes.map(h => (
            <div key={h.name} style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', border: '1px solid #334155' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '.25rem' }}>{h.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '.95rem' }}>{h.name}</div>
              <div style={{ color: '#22c55e', fontSize: '.75rem', marginBottom: '.25rem' }}>⚡ {h.speed}</div>
              <div style={{ color: '#64748b', fontSize: '.75rem', marginBottom: '.5rem' }}>📊 {h.efficiency}</div>
              <div style={{ color: '#94a3b8', fontSize: '.8rem', lineHeight: 1.5, marginBottom: '.5rem' }}>{h.note}</div>
              <div style={{ color: '#F5E642', fontSize: '.85rem', fontWeight: 600 }}>💰 {h.cost}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '1rem' }}>🎯 Find Your DFW Pool Heater</h3>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: '#94a3b8', marginBottom: '.5rem', fontSize: '.9rem' }}>Pool Size:</p>
            <div style={{ display: 'flex', gap: '.5rem' }}>
              {poolSizes.map(p => (
                <button key={p.id} onClick={() => setPoolSize(p.id)} style={{ flex: 1, background: poolSize === p.id ? '#F5E642' : '#0d2137', color: poolSize === p.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '.6rem', cursor: 'pointer', fontSize: '.78rem', fontWeight: poolSize === p.id ? 700 : 400 }}>{p.label}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ color: '#94a3b8', marginBottom: '.5rem', fontSize: '.9rem' }}>Use Pattern:</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
              {patterns.map(p => (
                <button key={p.id} onClick={() => setUsePattern(p.id)} style={{ background: usePattern === p.id ? '#F5E642' : '#0d2137', color: usePattern === p.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '.6rem', cursor: 'pointer', fontSize: '.82rem', fontWeight: usePattern === p.id ? 700 : 400 }}>{p.label}</button>
              ))}
            </div>
          </div>
          <button onClick={handleGenerate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '.75rem 1.5rem', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', width: '100%' }}>Get My DFW Pool Heater Recommendation →</button>
        </div>

        {rec && (
          <div style={{ background: '#0d2137', border: '2px solid #F5E642', borderRadius: 12, padding: '1.5rem' }}>
            <h3 style={{ color: '#F5E642', marginBottom: '.5rem' }}>✅ DFW Pool Heater Recommendation</h3>
            <p style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '.5rem' }}>{rec.type}</p>
            <p style={{ color: '#94a3b8', lineHeight: 1.6, marginBottom: '.5rem' }}>{rec.reason}</p>
            <p style={{ color: '#cbd5e1', fontSize: '.9rem', lineHeight: 1.5, marginBottom: '.5rem' }}>📝 {rec.note}</p>
            <p style={{ color: '#F5E642', fontWeight: 600 }}>💰 Installed Cost: {rec.cost}</p>
          </div>
        )}
      </div>
    </div>
  );
}
