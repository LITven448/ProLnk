import { useState } from 'react';

export default function DFWPoolHeaterSizing2026() {
  const [poolSize, setPoolSize] = useState('');
  const [tempGoal, setTempGoal] = useState('');
  const [result, setResult] = useState('');

  const poolSizes = [
    { id: 'small', label: '🏊 Small (< 10,000 gal)', gal: 8000, btu: 150000 },
    { id: 'medium', label: '🏊 Medium (10-20k gal)', gal: 15000, btu: 250000 },
    { id: 'large', label: '🏊 Large (20-40k gal)', gal: 30000, btu: 400000 },
    { id: 'xl', label: '🏊 XL (40k+ gal)', gal: 50000, btu: 600000 },
  ];

  const tempGoals = [
    { id: 'comfortable', label: '🌡️ Comfortable (80°F)', rise: 20 },
    { id: 'warm', label: '♨️ Warm (85°F)', rise: 25 },
    { id: 'hot', label: '🔥 Hot Tub Style (90°F+)', rise: 30 },
  ];

  function calculate() {
    if (!poolSize || !tempGoal) return;
    const ps = poolSizes.find(p => p.id === poolSize)!;
    const tg = tempGoals.find(t => t.id === tempGoal)!;
    const btus = Math.round(ps.gal * tg.rise * 12 / 1000) * 1000;
    setResult(btus.toLocaleString());
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>DFW POOL GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🔥 DFW Pool Heater Sizing 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW pool season runs March–November. Gas heaters heat fast but cost more to run. Heat pumps are efficient but slower — ideal for maintaining temp. BTU formula: pool volume × temp rise × 12.
        </p>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>Pool Size</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 24 }}>
          {poolSizes.map(p => (
            <button key={p.id} onClick={() => setPoolSize(p.id)} style={{ background: poolSize === p.id ? '#F5E642′ : '#1e2d45', color: poolSize === p.id ? '#0A1628' : '#fff', border: '2px solid' + (poolSize === p.id ? ' #F5E642' : ' #2d3f5a'), borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 600, cursor: ’pointer', textAlign: 'left' }}>
              {p.label}
            </button>
          ))}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642′ }}>Temperature Goal</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 28 }}>
          {tempGoals.map(t => (
            <button key={t.id} onClick={() => setTempGoal(t.id)} style={{ background: tempGoal === t.id ? '#F5E642′ : '#1e2d45', color: tempGoal === t.id ? '#0A1628' : '#fff', border: '2px solid' + (tempGoal === t.id ? ' #F5E642' : ' #2d3f5a'), borderRadius: 10, padding: '14px', fontSize: 14, fontWeight: 600, cursor: ’pointer' }}>
              {t.label}
            </button>
          ))}
        </div>

        <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 800, cursor: 'pointer', marginBottom: 28 }}>Calculate BTUs →</button>

        {result && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642', marginBottom: 24 }}>
            <div style={{ color: '#F5E642', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>RECOMMENDED MINIMUM BTU</div>
            <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 10 }}>🔥 {result} BTU/hr</div>
            <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>Gas heater: size to this BTU. Heat pump: multiply by 1.5× for same warm-up time. Add 20% BTU buffer for covered/shaded pools. DFW gas avg payback: 3-4 yrs vs heat pump: 5-7 yrs.</p>
          </div>
        )}

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>⚡ DFW Heater Comparison</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {[{ type: 'Gas', cost: '$2,500-5,000', op: '$80-150/mo', icon: '🔥' },{ type: 'Heat Pump', cost: '$3,500-6,000', op: '$30-60/mo', icon: '💨' },{ type: 'Solar', cost: '$3,000-8,000', op: '$5/mo', icon: '☀️' }].map(h => (
              <div key={h.type} style={{ background: '#0A1628', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 28 }}>{h.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{h.type}</div>
                <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600 }}>{h.cost}</div>
                <div style={{ color: '#64748b', fontSize: 12 }}>{h.op} DFW avg</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 24, textAlign: 'center', color: '#475569', fontSize: 13 }}>ProLnk © 2026 — Connecting DFW Homeowners with Pool Pros</div>
      </div>
    </div>
  );
}
