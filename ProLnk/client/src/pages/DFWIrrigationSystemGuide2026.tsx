import { useState } from 'react';

export default function DFWIrrigationSystemGuide2026() {
  const [lotSize, setLotSize] = useState('');
  const [zoneCount, setZoneCount] = useState('');
  const [result, setResult] = useState('');

  function calculate() {
    const lot = parseFloat(lotSize);
    const zones = parseInt(zoneCount);
    if (!lot || !zones) { setResult('Enter lot size and zone count.'); return; }
    const heads = Math.round((lot / 1000) * 4);
    const baseCost = zones * 800 + heads * 12;
    const low = Math.round(baseCost * 0.85 / 100) * 100;
    const high = Math.round(baseCost * 1.15 / 100) * 100;
    setResult(`Estimated ${heads} heads across ${zones} zones. Installed cost: $${low.toLocaleString()}–$${high.toLocaleString()}. TCEQ-licensed irrigator required in TX.`);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>💧</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Irrigation System Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>Everything DFW homeowners need to know about irrigation systems — costs, zones, licensing, and maintenance.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '💰', label: 'Average Install Cost', value: '$4,500–$8,000′ },
            { icon: '🗺️', label: 'Typical Zones (1/4 acre)', value: '4–6 zones' },
            { icon: '📋', label: 'TX License Required', value: 'TCEQ Irrigator' },
            { icon: '🔁', label: 'Backflow Test', value: 'Annual required' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#1e293b', borderRadius: 12, padding: '16px', border: '1px solid #334155′ }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 18 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 20, border: '1px solid #334155′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🌿 Drip vs Spray for DFW</h2>
          {[
            { type: 'Spray Heads', best: 'Turf grass', water: '1–1.5 in/hr', note: 'Most common in DFW' },
            { type: 'Rotor Heads', best: 'Large turf areas', water: '0.4–0.6 in/hr', note: 'More efficient coverage' },
            { type: 'Drip Emitters', best: 'Beds, shrubs, trees', water: '0.5–2 gph', note: '50% less water than spray' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 2 ? '1px solid #334155′ : ’none' }}>
              <div><div style={{ fontWeight: 600 }}>{r.type}</div><div style={{ color: '#94a3b8', fontSize: 13 }}>{r.note}</div></div>
              <div style={{ textAlign: 'right' }}><div style={{ color: '#F5E642′ }}>{r.water}</div><div style={{ color: '#94a3b8', fontSize: 13 }}>Best for: {r.best}</div></div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, border: '1px solid #334155′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>🧮 System Size Estimator</h2>
          <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
            <input value={lotSize} onChange={e => setLotSize(e.target.value)} placeholder="Lot size (sq ft)" style={{ flex: 1, minWidth: 140, padding: '10px', borderRadius: 8, border: '1px solid #475569', background: '#0f172a', color: '#fff' }} />
            <input value={zoneCount} onChange={e => setZoneCount(e.target.value)} placeholder="Number of zones" style={{ flex: 1, minWidth: 140, padding: '10px', borderRadius: 8, border: '1px solid #475569', background: '#0f172a', color: '#fff' }} />
            <button onClick={calculate} style={{ padding: '10px 20px', background: '#F5E642', color: '#0A1628', fontWeight: 700, borderRadius: 8, border: 'none', cursor: 'pointer' }}>Estimate</button>
          </div>
          {result && <div style={{ background: '#0f172a', borderRadius: 8, padding: 14, color: '#F5E642', fontSize: 14 }}>{result}</div>}
        </div>
        <p style={{ color: '#475569', fontSize: 12, marginTop: 20, textAlign: 'center' }}>Estimates for planning only. Get quotes from TCEQ-licensed irrigators in your area.</p>
      </div>
    </div>
  );
}
