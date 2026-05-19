import { useState } from 'react';

const wallSystems = [
  {
    type: 'Slatwall',
    costPerSqFt: '$3–6',
    difficulty: 'Easy',
    heatRating: 'Good',
    weightRating: '75 lbs/hook',
    notes: 'PVC slatwall warps in DFW summer heat — choose aluminum-reinforced or MDF with sealed finish.',
  },
  {
    type: 'Pegboard',
    costPerSqFt: '$1–2',
    difficulty: 'Easy',
    heatRating: 'Poor',
    weightRating: '50 lbs/section',
    notes: 'Hardboard pegboard absorbs moisture and warps. Use tempered hardboard or metal pegboard in DFW.',
  },
  {
    type: 'Wire Grid',
    costPerSqFt: '$2–4',
    difficulty: 'Moderate',
    heatRating: 'Excellent',
    weightRating: '100 lbs/panel',
    notes: 'Metal wire grid handles DFW heat with zero warping. Expands slightly but maintains integrity.',
  },
  {
    type: 'Metal Shelving',
    costPerSqFt: '$4–8',
    difficulty: 'Moderate',
    heatRating: 'Excellent',
    weightRating: '350+ lbs/shelf',
    notes: 'Best for heavy tools and bins. Steel expands minimally in DFW heat — leaves 1/8" gap at walls.',
  },
];

const recommendations: Record<string, Record<string, string>> = {
  small: {
    tools: 'Pegboard (metal) + 1 metal shelving unit along back wall. ~$400 total.',
    sports: 'Wire grid panels + overhead ceiling storage. ~$600 total.',
    mixed: 'Slatwall (aluminum-reinforced) center + metal shelving corners. ~$700 total.',
  },
  medium: {
    tools: 'Full slatwall (aluminum) on 2 walls + freestanding metal shelving. ~$1,200 total.',
    sports: 'Wire grid on 3 walls + ceiling pulley system. ~$1,500 total.',
    mixed: 'Slatwall on main wall, wire grid on side, metal shelving rear. ~$1,800 total.',
  },
  large: {
    tools: 'Metal shelving system full perimeter + slatwall center wall. ~$3,000 total.',
    sports: 'Wire grid full perimeter + 2 overhead storage lifts. ~$2,800 total.',
    mixed: 'Full slatwall system with metal shelving zones + ceiling storage. ~$4,500 total.',
  },
};

export default function DFWGarageWallSystemGuide() {
  const [garageSize, setGarageSize] = useState('');
  const [primaryUse, setPrimaryUse] = useState('');
  const [result, setResult] = useState('');

  function getRecommendation() {
    if (!garageSize || !primaryUse) return;
    const rec = recommendations[garageSize]?.[primaryUse];
    setResult(rec || 'Please select both options to get your recommendation.');
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME GUIDE</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Garage Wall Organization Systems</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          DFW summers hit 105°F+ — cheap plastic slatwall and standard pegboard warp, buckle, and fail.
          Here's what actually holds up in a Texas garage.
        </p>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🌡️ DFW Heat Reality Check</h2>
        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 16, marginBottom: 24 }}>
          <p style={{ color: '#94a3b8', margin: 0 }}>
            A DFW garage can reach <strong style={{ color: '#fff' }}>130–150°F</strong> in summer.
            PVC plastic slatwall softens at 140°F — hooks pull out under load.
            Hardboard pegboard swells with humidity swings from 20% to 70%.
            Metal systems expand ~1/16" per 8ft panel — manageable with proper installation gaps.
          </p>
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📊 Wall System Comparison</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {wallSystems.map(s => (
            <div key={s.type} style={{ background: '#1e2d45', borderRadius: 8, padding: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <strong style={{ color: '#F5E642' }}>{s.type}</strong>
                <span style={{ color: '#94a3b8', fontSize: 13 }}>
                  {s.costPerSqFt}/sq ft · {s.weightRating} · Install: {s.difficulty} · Heat: {s.heatRating}
                </span>
              </div>
              <p style={{ color: '#cbd5e1', margin: '8px 0 0', fontSize: 14 }}>{s.notes}</p>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Get Your DFW Recommendation</h2>
        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 20, marginBottom: 24 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Garage Size</label>
            <select value={garageSize} onChange={e => setGarageSize(e.target.value)}
              style={{ width: '100%', padding: 10, background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6 }}>
              <option value=''>Select size</option>
              <option value='small'>1-car / small 2-car (~400 sq ft)</option>
              <option value='medium'>Standard 2-car (~550 sq ft)</option>
              <option value='large'>3-car or larger (~750+ sq ft)</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Primary Use</label>
            <select value={primaryUse} onChange={e => setPrimaryUse(e.target.value)}
              style={{ width: '100%', padding: 10, background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 6 }}>
              <option value=''>Select use</option>
              <option value='tools'>Tools & Workshop</option>
              <option value='sports'>Sports & Recreation</option>
              <option value='mixed'>Mixed / General Storage</option>
            </select>
          </div>
          <button onClick={getRecommendation}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, cursor: 'pointer' }}>
            Get Recommendation
          </button>
          {result && (
            <div style={{ marginTop: 16, background: '#0A1628', borderRadius: 6, padding: 14 }}>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: 6 }}>✅ Your DFW Wall System Plan</div>
              <p style={{ color: '#cbd5e1', margin: 0 }}>{result}</p>
            </div>
          )}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 8, padding: 16, borderLeft: '3px solid #F5E642' }}>
          <strong style={{ color: '#F5E642' }}>💡 DFW Pro Tip</strong>
          <p style={{ color: '#94a3b8', margin: '8px 0 0', fontSize: 14 }}>
            Install wall systems in spring or fall when temps are 65–80°F.
            Installing in July heat causes metal to expand — panels installed tight will buckle when they cool in winter.
          </p>
        </div>
      </div>
    </div>
  );
}
