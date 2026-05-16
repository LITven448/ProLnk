import { useState } from 'react';

export default function DFWGreenRoofGuide2026() {
  const [structType, setStructType] = useState('');
  const [feasibility, setFeasibility] = useState('');

  const structTypes = [
    'Single-family home',
    'Garage or ADU',
    'Commercial building',
    'Flat-roof townhome',
  ];

  const getFeasibility = () => {
    if (!structType) return;
    if (structType === 'Single-family home') setFeasibility('🔴 Low Feasibility — DFW pitched roofs not suited for green roofs. Weight load (80-150 lbs/sq ft wet) exceeds most residential structures. Maintenance in 100°F+ heat is demanding. Consider cool roof coating or solar instead.');
    else if (structType === 'Garage or ADU') setFeasibility('🟡 Moderate — Flat garage roof can support extensive green roof (sedum/succulents, 20-40 lbs/sq ft dry). Requires waterproofing membrane, drainage layer, and irrigation. Budget $15-$30/sq ft installed. Viable if structure is engineered for load.');
    else if (structType === 'Commercial building') setFeasibility('🟢 Best Fit — Commercial flat roofs designed for load. Intensive systems possible (planters, walkways). LEED credits available. DFW stormwater credit from city. Must include drip irrigation for DFW heat. Budget $20-$50/sq ft.');
    else setFeasibility('🟡 Conditional — Verify structural load capacity first (engineer required). Extensive sedum system only — no trees or large planters. DFW summer requires automated drip irrigation or plants die in days during 105°F heat waves. Waterproofing warranty critical.');
  };

  const systemTypes = [
    { name: 'Extensive', icon: '🌿', weight: '10-50 lbs/sqft', depth: '2-6 inches', cost: '$10-$25/sqft', plants: 'Sedum, succulents', dfwNote: 'Best for DFW heat tolerance' },
    { name: 'Intensive', icon: '🌳', weight: '80-150 lbs/sqft', depth: '8-24+ inches', cost: '$25-$50+/sqft', plants: 'Shrubs, trees, garden', dfwNote: 'Commercial only in DFW' },
  ];

  const dfwChallenges = [
    '☀️ 100°F+ summers — plants can die without daily irrigation',
    '🌧️ Extreme rain events — must manage 4-8 inches of rainfall in hours',
    '⚖️ Clay soil below = foundation concern if water pools',
    '🏗️ Most DFW homes have pitched roofs — not suitable',
    '💸 Maintenance cost in DFW climate is 2-3x national average',
  ];

  const benefits = [
    { icon: '🌡️', text: 'Reduces roof surface temp by 40-80°F' },
    { icon: '💧', text: 'Retains 50-90% of rainfall, reduces runoff' },
    { icon: '🔇', text: 'Sound insulation — reduces noise by 40 dB' },
    { icon: '🏛️', text: 'Extends roof membrane life 2-3x' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🌱</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Green Roof Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Living roofs for DFW climate — feasibility, costs, and reality check</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 24 }}>
          {systemTypes.map(s => (
            <div key={s.name} style={{ background: '#1e2d45', borderRadius: 12, padding: 16, border: '1px solid #2d4a6b' }}>
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15, marginTop: 6 }}>{s.name} System</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6 }}>⚖️ {s.weight}</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>📏 Depth: {s.depth}</div>
              <div style={{ fontSize: 12, color: '#4ade80' }}>💰 {s.cost}</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>🌿 {s.plants}</div>
              <div style={{ fontSize: 11, color: '#f97316', marginTop: 6, background: '#0A1628', borderRadius: 6, padding: '4px 8px' }}>☀️ {s.dfwNote}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10, marginBottom: 24 }}>
          {benefits.map(b => (
            <div key={b.text} style={{ background: '#1e2d45', borderRadius: 8, padding: 12, fontSize: 12, color: '#94a3b8' }}>
              <span style={{ fontSize: 16, marginRight: 6 }}>{b.icon}</span>{b.text}
            </div>
          ))}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🏗️ Check Green Roof Feasibility for Your Structure</h2>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Structure type:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {structTypes.map(s => (
                <button key={s} onClick={() => setStructType(s)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: structType === s ? '#F5E642' : '#0A1628', color: structType === s ? '#0A1628' : '#fff', fontSize: 13, textAlign: 'left' }}>{s}</button>
              ))}
            </div>
          </div>
          <button onClick={getFeasibility} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Check Feasibility →</button>
          {feasibility && <div style={{ marginTop: 14, background: '#0A1628', borderRadius: 8, padding: 14, fontSize: 13, lineHeight: 1.6 }}>{feasibility}</div>}
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: 16 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 14 }}>⚠️ DFW Green Roof Challenges</div>
          {dfwChallenges.map((c, i) => <div key={i} style={{ fontSize: 12, color: '#94a3b8', marginBottom: 6 }}>{c}</div>)}
        </div>
      </div>
    </div>
  );
}
