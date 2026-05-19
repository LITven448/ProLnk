import { useState } from 'react';

const coveringTypes = [
  { type: 'Honeycomb/Cellular Shades', emoji: '🔷', rValue: 'R-3 to R-4.8', coverage: 'Full window', cost: '$40-120', savings: '20-30% cooling', best: 'North-facing rooms, DFW winters' },
  { type: 'Blackout Curtains', emoji: '🌑', rValue: 'R-1 to R-2', coverage: 'Full window + wall', cost: '$25-80', savings: '15-25% cooling', best: 'West-facing DFW bedrooms' },
  { type: 'Thermal Drapes', emoji: '🎭', rValue: 'R-2 to R-3.5', coverage: 'Full window + surround', cost: '$45-150', savings: '18-28% cooling', best: 'South-facing DFW living areas' },
  { type: 'Roman Shades (Insulated)', emoji: '🗂️', rValue: 'R-1.5 to R-2.5', coverage: 'Window only', cost: '$50-140', savings: '12-20% cooling', best: 'Kitchen/dining, DFW east exposure' },
];

const windowSizes = ['Small (under 3ft wide)', 'Medium (3-5ft wide)', 'Large (5-7ft wide)', 'Extra Large / Patio Door'];
const exposures = ['South-facing (DFW max sun)', 'West-facing (DFW afternoon)', 'East-facing (DFW morning)', 'North-facing (DFW shade)'];

export default function DFWInsulatedBlindsGuide() {
  const [size, setSize] = useState('');
  const [exposure, setExposure] = useState('');
  const [rec, setRec] = useState(null);

  const getRecommendation = () => {
    if (!size || !exposure) return;
    const isWest = exposure.includes('West');
    const isSouth = exposure.includes('South');
    const isLarge = size.includes('Large');
    if (isWest) {
      const base = coveringTypes[1];
      setRec({ ...base, coverage: isLarge ? 'Extend 6-12″ beyond window each side' : base.coverage, tip: 'Layer blackout curtains over cellular shades for DFW west walls — combined R-value of R-5+' });
    } else if (isSouth) {
      const base = coveringTypes[2];
      setRec({ ...base, tip: 'Thermal drapes on south-facing DFW windows can replace 25% of AC run-time on peak summer days' });
    } else {
      const base = coveringTypes[0];
      setRec({ ...base, tip: 'Double-cell honeycomb for DFW — single-cell loses effectiveness above 100°F ambient' });
    }
  };

  const reset = () => { setSize(''); setExposure(''); setRec(null); };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E2E8F0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🪟</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>DFW Insulated Blinds & Curtain Guide</h1>
          <p style={{ color: '#94A3B8', fontSize: 16 }}>Insulated window coverings reduce DFW cooling costs by 15-30% — honeycomb shades and thermal drapes are the highest-performing options.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[['🌡️', 'DFW Cooling Cost', 'Windows account for 30% of DFW cooling load'], ['🔷', 'Cellular R-Value', 'Double-cell honeycomb reaches R-4.8 — significant for DFW'], ['🌑', 'Blackout Savings', '15-25% cooling reduction on DFW west windows'], ['⚡', 'Peak Savings', 'Proper coverings reduce AC runtime on 105°F DFW days']].map(([icon, label, val]) => (
            <div key={label} style={{ background: '#1E293B', borderRadius: 12, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{label}</div>
              <div style={{ color: '#94A3B8', fontSize: 13, marginTop: 4 }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1E293B', borderRadius: 16, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 20 }}>🎯 Find Your Covering</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>Window Size</label>
              <select value={size} onChange={e => setSize(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, padding: '10px 12px', color: '#E2E8F0', fontSize: 14 }}>
                <option value=''>Select window size</option>
                {windowSizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#94A3B8', fontSize: 13, display: 'block', marginBottom: 8 }}>DFW Sun Exposure</label>
              <select value={exposure} onChange={e => setExposure(e.target.value)} style={{ width: '100%', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, padding: '10px 12px', color: '#E2E8F0', fontSize: 14 }}>
                <option value=''>Select exposure</option>
                {exposures.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Get Recommendation</button>
            <button onClick={reset} style={{ background: 'transparent', color: '#94A3B8', border: '1px solid #334155', borderRadius: 8, padding: '12px 20px', cursor: 'pointer', fontSize: 15 }}>Reset</button>
          </div>
          {rec && (
            <div style={{ marginTop: 24, background: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #F5E642′ }}>
              <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 18, marginBottom: 12 }}>{rec.emoji} Recommended: {rec.type}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 12 }}>
                {[['R-Value', rec.rValue], ['Coverage', rec.coverage], ['Cost Range', rec.cost], ['DFW Savings', rec.savings]].map(([k, v]) => (
                  <div key={k} style={{ background: '#1E293B', borderRadius: 8, padding: 12 }}>
                    <div style={{ color: '#64748B', fontSize: 12 }}>{k}</div>
                    <div style={{ color: '#E2E8F0', fontWeight: 600, fontSize: 13, marginTop: 4 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ color: '#94A3B8', fontSize: 14 }}>💡 DFW Tip: {rec.tip}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#1E293B', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 16 }}>📊 R-Value Comparison for DFW</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {coveringTypes.map(c => (
              <div key={c.type} style={{ display: 'flex', gap: 16, alignItems: 'center', background: '#0A1628', borderRadius: 10, padding: '14px 16px' }}>
                <div style={{ fontSize: 24, flexShrink: 0 }}>{c.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#E2E8F0', fontWeight: 600, fontSize: 14 }}>{c.type}</div>
                  <div style={{ color: '#94A3B8', fontSize: 12, marginTop: 2 }}>Best for: {c.best}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{c.rValue}</div>
                  <div style={{ color: '#64748B', fontSize: 12 }}>{c.cost}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
