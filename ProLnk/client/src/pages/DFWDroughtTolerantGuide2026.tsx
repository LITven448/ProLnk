import { useState } from 'react';

export default function DFWDroughtTolerantGuide2026() {
  const [yardArea, setYardArea] = useState('');
  const [currentPlants, setCurrentPlants] = useState('');
  const [result, setResult] = useState('');

  function plan() {
    const area = parseFloat(yardArea);
    if (!area) { setResult('Enter your yard area to get started.'); return; }
    const mulchBags = Math.ceil(area / 50);
    const plants = Math.ceil(area / 20);
    const waterSavings = Math.round(area * 0.003);
    setResult(`For ${area} sq ft: ~${plants} drought-tolerant plants, ${mulchBags} bags of decomposed granite/mulch. Estimated water savings: ${waterSavings} gal/day. Conversion cost: $${Math.round(area * 2.5).toLocaleString()}–$${Math.round(area * 4).toLocaleString()}.`);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🌵</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Drought-Tolerant Landscaping Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Beat DFW drought cycles with xeriscaping — cut water use 50–75% while keeping a beautiful yard.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '💧', label: 'Water Reduction', value: '50–75%' },
            { icon: '🌡️', label: 'DFW Drought Status', value: 'Recurring cycles' },
            { icon: '🪨', label: 'Ground Cover', value: 'Decomp granite' },
            { icon: '🌸', label: 'Best Mulch Depth', value: '3–4 inches' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#1e293b', borderRadius: 12, padding: '16px', border: '1px solid #334155′ }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 20, border: '1px solid #334155′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🌿 Best Drought-Tolerant Plants for DFW</h2>
          {[
            { name: 'Texas Sage (Leucophyllum)', water: 'Very low', note: 'Purple blooms after rain — thrives in DFW heat' },
            { name: 'Lantana', water: 'Low', note: 'Full sun, attracts pollinators, blooms all season' },
            { name: 'Yucca', water: 'Very low', note: 'Architectural, deer-resistant, zero summer water' },
            { name: 'Agave', water: 'Minimal', note: 'Bold focal point, survives DFW freezes if mulched' },
            { name: 'Mexican Feathergrass', water: 'Low', note: 'Elegant movement, golden summer color' },
          ].map((p, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 4 ? '1px solid #334155′ : ’none' }}>
              <div><div style={{ fontWeight: 600 }}>{p.name}</div><div style={{ color: '#94a3b8', fontSize: 13 }}>{p.note}</div></div>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', paddingLeft: 8 }}>{p.water}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, border: '1px solid #334155′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🧮 Conversion Plan Estimator</h2>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
            <input value={yardArea} onChange={e => setYardArea(e.target.value)} placeholder="Yard area (sq ft)" style={{ flex: 1, minWidth: 160, padding: '10px', borderRadius: 8, border: '1px solid #475569', background: '#0f172a', color: '#fff' }} />
            <input value={currentPlants} onChange={e => setCurrentPlants(e.target.value)} placeholder="Current plants (optional)" style={{ flex: 1, minWidth: 160, padding: '10px', borderRadius: 8, border: '1px solid #475569', background: '#0f172a', color: '#fff' }} />
            <button onClick={plan} style={{ padding: '10px 20px', background: '#F5E642', color: '#0A1628', fontWeight: 700, borderRadius: 8, border: 'none', cursor: 'pointer' }}>Plan</button>
          </div>
          {result && <div style={{ background: '#0f172a', borderRadius: 8, padding: 14, color: '#F5E642', fontSize: 14 }}>{result}</div>}
        </div>
        <p style={{ color: '#475569', fontSize: 12, marginTop: 20, textAlign: 'center' }}>Some DFW cities offer water-wise rebates for converting turf to drought-tolerant landscapes.</p>
      </div>
    </div>
  );
}
