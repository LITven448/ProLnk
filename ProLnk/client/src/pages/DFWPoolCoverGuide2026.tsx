import { useState } from 'react';

export default function DFWPoolCoverGuide2026() {
  const [goal, setGoal] = useState('');
  const [rec, setRec] = useState('');

  const goals = [
    { id: 'safety', label: '🛡️ Child/Pet Safety' },
    { id: 'heat', label: '☀️ Heat Retention' },
    { id: 'auto', label: '⚡ Convenience/Auto' },
    { id: 'winter', label: '❄️ Winter Storage' },
  ];

  const recs: Record<string, { title: string; desc: string; cost: string }> = {
    safety: { title: 'Mesh Safety Cover', desc: 'TX Pool Safety Act compliant. Solid or mesh options, supports 485 lbs. Mesh drains rain, solid blocks debris. Required if pool is within 5ft of structure. Annual inspection recommended.', cost: '$1,200 – $3,500 installed' },
    heat: { title: 'Solar Bubble Cover', desc: 'Reduces DFW evaporation by 95% and heats water 10-15°F passively. Perfect for DFW spring (March) and fall (Oct-Nov) shoulder seasons. Blue or clear; clear heats slightly better.', cost: '$200 – $600' },
    auto: { title: 'Automatic Retractable Cover', desc: 'One-button operation. Doubles as safety cover (ASTM F1346 certified). Most popular luxury upgrade in DFW 2024-2026. Works with any pool shape. Motorized track system.', cost: '$10,000 – $20,000 installed' },
    winter: { title: 'Solid Winter Cover + Water Bags', desc: 'Heavy-duty solid cover anchored with water bags. DFW winters rarely freeze hard but debris management is key Nov-Feb. Replace water bags annually.', cost: '$400 – $900' },
  };

  function handleSelect(id: string) {
    setGoal(id);
    setRec(id);
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui,sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '4px 14px', display: 'inline-block', fontSize: 13, fontWeight: 700, marginBottom: 16 }}>DFW POOL GUIDE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>🏊 DFW Pool Cover Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          Choosing the right pool cover for DFW depends on your primary goal. Texas Pool Safety Act requires compliant barriers. Solar covers can extend your swim season by 6+ weeks. Auto covers offer top convenience.
        </p>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F5E642' }}>What is your primary goal?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 28 }}>
          {goals.map(g => (
            <button key={g.id} onClick={() => handleSelect(g.id)} style={{ background: goal === g.id ? '#F5E642' : '#1e2d45', color: goal === g.id ? '#0A1628' : '#fff', border: '2px solid' + (goal === g.id ? ' #F5E642' : ' #2d3f5a'), borderRadius: 10, padding: '16px', fontSize: 15, fontWeight: 600, cursor: 'pointer', textAlign: 'left' }}>
              {g.label}
            </button>
          ))}
        </div>

        {rec && recs[rec] && (
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 11, letterSpacing: 1, marginBottom: 8 }}>RECOMMENDED</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>✅ {recs[rec].title}</h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.7, marginBottom: 14 }}>{recs[rec].desc}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: '10px 16px', display: 'inline-block', color: '#F5E642', fontWeight: 700, fontSize: 15 }}>💰 {recs[rec].cost}</div>
          </div>
        )}

        <div style={{ marginTop: 36, background: '#1e2d45', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>📋 DFW Pool Cover Quick Facts</h3>
          <ul style={{ color: '#94a3b8', lineHeight: 2, paddingLeft: 20 }}>
            <li>TX Pool Safety Act: fencing OR compliant cover required</li>
            <li>Solar covers save avg. $400/yr on heating in DFW</li>
            <li>DFW evaporation: 60-80 inches/year without cover</li>
            <li>Auto covers qualify for some homeowner insurance discounts</li>
          </ul>
        </div>
        <div style={{ marginTop: 24, textAlign: 'center', color: '#475569', fontSize: 13 }}>ProLnk © 2026 — Connecting DFW Homeowners with Pool Pros</div>
      </div>
    </div>
  );
}
