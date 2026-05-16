import { useState } from 'react';

const countyReqs: Record<string, { req: string; type: string; note: string }> = {
  'Tarrant County': { req: 'Rare — mostly municipal sewer', type: 'Visual only if present', note: 'Confirm municipal sewer connection with city' },
  'Dallas County': { req: 'Rare — mostly municipal sewer', type: 'Visual only if present', note: 'ETJ areas may have septic — verify plat' },
  'Parker County': { req: 'Very common — required inspection', type: 'Pump test + bacterial', note: 'Parker County OSSF office permits all systems' },
  'Hood County': { req: 'Common in rural areas', type: 'Full pump and inspection', note: 'Granbury area growing — older systems common' },
  'Johnson County': { req: 'Common in rural areas', type: 'Full pump and inspection', note: 'Cleburne ETJ — verify with county' },
  'Wise County': { req: 'Common — most properties', type: 'Full pump and inspection', note: 'Decatur area — consult county OSSF office' },
  'Kaufman County': { req: 'Common in outer areas', type: 'Full inspection recommended', note: 'Forney and Terrell have mixed sewer/septic' },
};

export default function DFWSepticInspectionGuide2026() {
  const [county, setCounty] = useState('');

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '32px 20px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌿</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: '0 0 8px' }}>DFW Septic Inspection Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Outer DFW counties — what you must inspect before buying</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20, borderLeft: '4px solid #ef4444' }}>
          <h2 style={{ color: '#ef4444', fontSize: 16, margin: '0 0 10px' }}>⚠️ Septic Replacement Cost: $8,000–25,000</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>A failed septic system is not a minor repair. Texas OSSF (On-Site Sewage Facility) regulations are strict — a failing system can require complete replacement of tank and drain field. Negotiate hard or walk.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 14px' }}>🔎 Inspection Types Explained</h2>
          {[
            { type: '👁️ Visual Inspection', desc: 'Inspector locates tank, checks lids, looks for surfacing effluent. Minimum — does NOT tell you if drain field is failing.', cost: '$150–250' },
            { type: '🚰 Pump Test', desc: 'Tank pumped, interior inspected for cracks, baffles checked. Reveals tank condition clearly.', cost: '$300–500' },
            { type: '🧫 Bacterial/Load Test', desc: 'System loaded with water to simulate use, monitored for backup or slow drain. Best indicator of drain field health.', cost: '$400–700' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#0d1e36', borderRadius: 10, padding: 14, marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{item.type}</span>
                <span style={{ color: '#22c55e', fontWeight: 700, fontSize: 13 }}>{item.cost}</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 10px' }}>💸 What Fails + Cost to Fix</h2>
          {[
            ['Drain field failure', '$5,000–15,000', 'Most common failure in clay soils'],
            ['Tank cracks/leaks', '$1,500–5,000', 'Steel tanks corrode, concrete cracks'],
            ['Baffle failure', '$500–1,500', 'Causes solids to enter drain field'],
            ['Full system replacement', '$8,000–25,000', 'New tank + aerobic system if required'],
            ['Aerobic system upgrade (county required)', '$10,000–20,000', 'Many counties now require aerobic'],
          ].map(([item, cost, note], i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid #1e3a5f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#e2e8f0', fontSize: 13, fontWeight: 600 }}>{item}</span>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 13 }}>{cost}</span>
              </div>
              <div style={{ color: '#64748b', fontSize: 12 }}>{note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, margin: '0 0 14px' }}>📍 Select Your County → Inspection Requirements</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {Object.keys(countyReqs).map(c => (
              <button key={c} onClick={() => setCounty(c)}
                style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid', cursor: 'pointer', fontSize: 12,
                  borderColor: county === c ? '#F5E642' : '#334155', background: county === c ? '#F5E642' : 'transparent',
                  color: county === c ? '#0A1628' : '#94a3b8', fontWeight: county === c ? 700 : 400 }}>
                {c}
              </button>
            ))}
          </div>
          {county && (
            <div style={{ background: '#0d1e36', borderRadius: 10, padding: 16, borderLeft: '4px solid #F5E642' }}>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>{county}</div>
              <div style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 4 }}>📋 Requirement: {countyReqs[county].req}</div>
              <div style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 4 }}>🔎 Inspection Type: {countyReqs[county].type}</div>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>ℹ️ {countyReqs[county].note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
