import { useState } from 'react';

const heaterTypes = {
  gas: {
    name: 'Natural Gas',
    emoji: '🔥',
    heat_time: 'Fastest (1–4 hrs for 10°F)',
    install: '$1,500–$3,500',
    monthly_op: { small: '$80–$140', medium: '$130–$220', large: '$200–$350′ },
    best_for: 'Occasional use, fast heat-up, DFW city areas with gas lines',
    dfwNote: 'Best for DFW pools used on weekends. Low DFW gas rates ($0.90–$1.10/therm) make this cost-competitive.',
    pros: ['Fastest heating', 'Works in cold weather', 'Good for occasional use'],
    cons: ['Higher operating cost than heat pump', 'Requires gas line', 'CO2 emissions'],
  },
  heat_pump: {
    name: 'Heat Pump',
    emoji: '💨',
    heat_time: 'Moderate (8–16 hrs for 10°F)',
    install: '$2,500–$5,500',
    monthly_op: { small: '$25–$50', medium: '$40–$80', large: '$65–$120′ },
    best_for: 'DFW pools used regularly — mild DFW climate is perfect for heat pump efficiency',
    dfwNote: 'Ideal for DFW. Heat pumps work best above 50°F — DFW rarely drops below that. 70–80% lower operating cost than gas.',
    pros: ['Cheapest to operate in DFW', 'Environmentally friendly', 'DFW climate is ideal', 'Long lifespan 10–15 yrs'],
    cons: ['Slower to heat', 'Higher install cost', 'Less effective during rare DFW freezes'],
  },
  electric: {
    name: 'Electric Resistance',
    emoji: '⚡',
    heat_time: 'Slow (12–24 hrs for 10°F)',
    install: '$500–$1,200',
    monthly_op: { small: '$180–$280', medium: '$280–$420', large: '$400–$600′ },
    best_for: 'Not recommended for DFW pools',
    dfwNote: 'Avoid in DFW. TXU/Oncor electricity rates make electric resistance prohibitively expensive. Only consider if no gas line and heat pump install not feasible.',
    pros: ['Lowest install cost', 'No gas line needed', 'Simple maintenance'],
    cons: ['Extremely high operating cost in DFW', 'Slow heating', 'Not cost-effective at Texas electricity rates'],
  },
  propane: {
    name: 'Propane',
    emoji: '🛢️',
    heat_time: 'Fast (2–5 hrs for 10°F)',
    install: '$1,500–$3,200',
    monthly_op: { small: '$120–$200', medium: '$200–$320', large: '$300–$480′ },
    best_for: 'Outer DFW / rural areas without natural gas lines',
    dfwNote: 'For outer DFW areas (Weatherford, Granbury, Corsicana) without gas lines. Propane at $2.50–$3.50/gallon is 2x cost of natural gas per BTU.',
    pros: ['Fast heating like gas', 'Works without gas line', 'Reliable in outages'],
    cons: ['Higher fuel cost than gas', 'Requires propane tank', 'Price volatility'],
  },
};

const poolSizes = { small: 'Small (10,000–15,000 gal)', medium: 'Medium (15,000–25,000 gal)', large: 'Large (25,000–40,000 gal)' };

export default function DFWPoolHeaterTypeGuide() {
  const [situation, setSituation] = useState('');
  const [poolSize, setPoolSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [result, setResult] = useState<null | typeof heaterTypes.gas>(null);

  function getRecommendation() {
    if (!situation) return;
    let key = 'heat_pump';
    if (situation === 'weekend_warrior') key = 'gas';
    if (situation === 'outer_dfw') key = 'propane';
    if (situation === 'daily_swimmer') key = 'heat_pump';
    if (situation === 'city_budget') key = 'gas';
    setResult(heaterTypes[key as keyof typeof heaterTypes]);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>DFW POOL GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', lineHeight: 1.2 }}>
          🏊 DFW Pool Heater Type Comparison
        </h1>
        <p style={{ color: '#94A3B8', margin: '0 0 28px', lineHeight: 1.6 }}>
          DFW's mild winters make heat pumps the operating cost winner for regular swimmers. Gas wins for weekend warriors who need fast heat-up.
        </p>

        <div style={{ background: '#1E2D45', borderRadius: 12, padding: '16px 20px', marginBottom: 28, border: '1px solid #2D4060′ }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#F5E642', marginBottom: 10 }}>🌡️ DFW CLIMATE ADVANTAGE FOR HEAT PUMPS</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642′ }}>58°F</div>
              <div style={{ fontSize: 11, color: '#94A3B8′ }}>DFW Avg Winter Temp</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642′ }}>50°F</div>
              <div style={{ fontSize: 11, color: '#94A3B8′ }}>Heat Pump Min Temp</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#22C55E' }}>✓ Ideal</div>
              <div style={{ fontSize: 11, color: '#94A3B8′ }}>DFW = Heat Pump Country</div>
            </div>
          </div>
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🔍 Get Your DFW Heater Recommendation</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>YOUR DFW SITUATION</label>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '10px', background: '#1E2D45', border: '1px solid #2D4060', borderRadius: 8, color: '#E8EDF5', fontSize: 14 }}>
              <option value="">Select situation...</option>
              <option value="daily_swimmer">Daily swimmer — want low monthly cost</option>
              <option value="weekend_warrior">Weekend warrior — need fast heat-up</option>
              <option value="outer_dfw">Outer DFW area — no gas line</option>
              <option value="city_budget">City DFW — budget-focused</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 6 }}>POOL SIZE</label>
            <select value={poolSize} onChange={e => setPoolSize(e.target.value as 'small' | 'medium' | 'large')} style={{ width: '100%', padding: '10px', background: '#1E2D45', border: '1px solid #2D4060', borderRadius: 8, color: '#E8EDF5', fontSize: 14 }}>
              {Object.entries(poolSizes).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>
        <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 28 }}>
          Get Recommendation →
        </button>

        {result && (
          <div style={{ background: '#1E2D45', borderRadius: 12, padding: 24, marginBottom: 28, border: '2px solid #F5E642′ }}>
            <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, marginBottom: 4 }}>RECOMMENDED FOR YOUR DFW POOL</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 4px' }}>{result.emoji} {result.name}</h3>
            <p style={{ color: '#94A3B8', margin: '0 0 16px', fontSize: 13 }}>{result.dfwNote}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>INSTALL COST</div>
                <div style={{ fontWeight: 700 }}>{result.install}</div>
              </div>
              <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 4 }}>MONTHLY OPERATING COST</div>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>{result.monthly_op[poolSize]}</div>
              </div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 12, fontSize: 13 }}>
              ⏱ Heat-up time: <strong style={{ color: '#E8EDF5′ }}>{result.heat_time}</strong>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div><div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 6 }}>✅ PROS</div>{result.pros.map(p => <div key={p} style={{ fontSize: 13, marginBottom: 3 }}>• {p}</div>)}</div>
              <div><div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 6 }}>⚠️ CONS</div>{result.cons.map(c => <div key={c} style={{ fontSize: 13, marginBottom: 3 }}>• {c}</div>)}</div>
            </div>
          </div>
        )}

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📊 All DFW Heater Types at a Glance</h2>
        <div style={{ display: 'grid', gap: 10 }}>
          {Object.values(heaterTypes).map(h => (
            <div key={h.name} style={{ background: '#1E2D45', borderRadius: 10, padding: '16px 18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ fontWeight: 700 }}>{h.emoji} {h.name}</div>
                <div style={{ color: '#F5E642', fontSize: 13 }}>Install: {h.install}</div>
              </div>
              <div style={{ fontSize: 12, color: '#94A3B8′ }}>{h.best_for}</div>
              <div style={{ fontSize: 12, marginTop: 6, color: '#E8EDF5′ }}>Monthly: Medium pool = {h.monthly_op.medium}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
