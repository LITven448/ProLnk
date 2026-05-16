import { useState } from 'react';

const surfaceMaterials = [
  { name: 'Rubber Mulch', tempRating: 'Coolest', cost: '$8-12/sqft', notes: 'Stays significantly cooler than wood, ADA compliant' },
  { name: 'Engineered Wood Fiber', tempRating: 'Moderate', cost: '$4-7/sqft', notes: 'Natural look, gets warm in direct sun' },
  { name: 'Artificial Turf', tempRating: 'Hottest', cost: '$12-18/sqft', notes: 'Can exceed 150°F in DFW summer — shade required' },
  { name: 'Poured Rubber', tempRating: 'Cool', cost: '$10-15/sqft', notes: 'Best safety rating, moderate heat absorption' },
];

export default function DFWKidPlayAreaGuide() {
  const [ages, setAges] = useState('');
  const [yardSize, setYardSize] = useState('medium');
  const [sunExposure, setSunExposure] = useState('full');
  const [result, setResult] = useState<null | { surface: string; shade: string; equipment: string[]; cost: string }>(null);

  function calculate() {
    const ageList = ages.split(',').map(a => parseInt(a.trim())).filter(Boolean);
    const avgAge = ageList.length ? ageList.reduce((a, b) => a + b, 0) / ageList.length : 6;
    const surface = sunExposure === 'full' ? 'Rubber Mulch (mandatory in full DFW sun)' : 'Engineered Wood Fiber';
    const shade = sunExposure === 'full'
      ? '20x20 sail shade minimum — 70% UV block rated for DFW winds (25+ mph gusts)'
      : '12x12 shade sail or pergola over primary play zone';
    const equipment: string[] = [];
    if (avgAge < 5) equipment.push('Toddler structure (3-5ft max)', 'Sensory sandbox with shade cover', 'Spring riders');
    else if (avgAge < 9) equipment.push('Full play structure 6-8ft', 'Slide + climbing wall', 'Belt swings + tire swing');
    else equipment.push('Challenge course 8-12ft', 'Zipline if yard allows', 'Basketball hoop', 'Ninja warrior elements');
    const baseCost = yardSize === 'small' ? 4500 : yardSize === 'medium' ? 8500 : 14000;
    const shadeCost = sunExposure === 'full' ? 1800 : 900;
    setResult({ surface, shade, equipment, cost: `$${(baseCost + shadeCost).toLocaleString()} – $${(baseCost + shadeCost + 3000).toLocaleString()}` });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600 }}>🏠 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Kids Play Area Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW summers hit 100°F+ for weeks. Surface choice and shade are not optional — they are safety decisions.</p>

        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '16px 20px', marginBottom: 32, fontWeight: 600 }}>
          ⚠️ DFW Heat Warning: Artificial turf in full sun can exceed 150°F. Children can burn in seconds. Always require shade structures over turf.
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🌡️ Surface Material Comparison</h2>
        <div style={{ display: 'grid', gap: 12, marginBottom: 36 }}>
          {surfaceMaterials.map(m => (
            <div key={m.name} style={{ background: '#1e293b', borderRadius: 10, padding: '14px 18px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>{m.name}</span>
                <span style={{ color: m.tempRating === 'Coolest' || m.tempRating === 'Cool' ? '#4ade80' : m.tempRating === 'Hottest' ? '#f87171' : '#fbbf24', fontWeight: 600, fontSize: 13 }}>{m.tempRating} in Sun</span>
              </div>
              <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#94a3b8' }}>
                <span>💰 {m.cost}</span>
                <span>{m.notes}</span>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>🧮 Play Area Planner</h2>
        <div style={{ background: '#1e293b', borderRadius: 12, padding: '24px', marginBottom: 24 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8' }}>Children's Ages (comma separated)</label>
            <input value={ages} onChange={e => setAges(e.target.value)} placeholder="e.g. 4, 7, 10" style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15, boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8' }}>Yard Size</label>
              <select value={yardSize} onChange={e => setYardSize(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value="small">Small (&lt;1,500 sqft)</option>
                <option value="medium">Medium (1,500-3,000 sqft)</option>
                <option value="large">Large (3,000+ sqft)</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 14, color: '#94a3b8' }}>Sun Exposure</label>
              <select value={sunExposure} onChange={e => setSunExposure(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #334155', borderRadius: 8, color: '#fff', fontSize: 15 }}>
                <option value="full">Full Sun (6+ hrs)</option>
                <option value="partial">Partial (3-6 hrs)</option>
                <option value="shaded">Mostly Shaded</option>
              </select>
            </div>
          </div>
          <button onClick={calculate} style={{ width: '100%', padding: '12px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Get My Play Area Plan →
          </button>
        </div>

        {result && (
          <div style={{ background: '#1e293b', borderRadius: 12, padding: '24px', border: '1px solid #F5E642' }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16, fontWeight: 700 }}>✅ Your DFW Play Area Recommendation</h3>
            <div style={{ marginBottom: 12 }}><strong>Surface:</strong> {result.surface}</div>
            <div style={{ marginBottom: 12 }}><strong>☂️ Shade Solution:</strong> {result.shade}</div>
            <div style={{ marginBottom: 12 }}><strong>🛝 Recommended Equipment:</strong>
              <ul style={{ marginTop: 6, paddingLeft: 20 }}>{result.equipment.map((e, i) => <li key={i} style={{ color: '#94a3b8', marginBottom: 4 }}>{e}</li>)}</ul>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', marginTop: 16 }}>
              <span style={{ color: '#F5E642', fontWeight: 700 }}>💰 Estimated Cost Range: </span>{result.cost}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
