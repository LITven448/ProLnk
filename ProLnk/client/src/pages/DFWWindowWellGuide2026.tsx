import { useState } from 'react';

export default function DFWWindowWellGuide2026() {
  const [situation, setSituation] = useState('');
  const [result, setResult] = useState('');

  const situations = [
    { label: 'Adding egress window to basement bedroom', guide: 'IRC egress requirements: minimum 20 inches wide, 24 inches high, 5.7 sq ft net opening. Window well must be at least 9 sq ft area and 36 inches projection from wall. DFW permit required. Window well drain critical — DFW clay colects water fast. Budget $3,500–$6,000 installed.' },
    { label: 'Window well always filling with water', guide: 'DFW clay problem — well base has no drainage. Fix: excavate to window sill depth, add 6 inches of crushed gravel, connect 4-inch drain pipe to French drain or daylight. Temporary: pump out water after storms. Never let water sit — hydrostatic pressure against window frame causes seal failure.' },
    { label: 'Critters getting into window well', guide: 'Install polycarbonate bubble cover — allows light, blocks rain and animals. For egress wells, use hinged cover rated for fire egress (opens from inside). Mesh covers allow rain in and are not recommended for DFW where storms dump 2–5 inches in hours.' },
    { label: 'Window well cover options comparison', guide: 'Polycarbonate bubble: $80–$200, blocks rain + critters, reduces light slightly. Grate/mesh: $40–$80, does not block rain (bad for DFW). Custom fitted: $200–$400, best fit for egress compliance. For egress: must be openable from inside without key or tool — check before buying.' },
    { label: 'Water leaking around window frame', guide: 'Three causes: failed window seal (caulk/glazing), failed well drain causing hydrostatic buildup, or improper window well flashing. DFW heat cycles degrade seals fast — inspect caulk annually. Replace caulk every 3–5 years. If water intrusion persists after resealing, excavate and inspect waterproofing membrane.' },
    { label: 'Ladder requirement for deep window well', guide: 'IRC requires ladder or steps for window wells deeper than 44 inches. In DFW most egress wells are 48–60 inches deep. Use galvanized steel ladder bolted to wall — do not use plastic. Ladder must extend 6 inches above window sill. Include in permit drawings.' },
  ];

  const handle = () => {
    const match = situations.find(s => s.label === situation);
    setResult(match ? match.guide : 'Select a window well situation above for compliance and maintenance guidance.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Window Well Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Window wells in DFW have a unique enemy: clay soil that pools water at the base. Proper drainage and covers are non-negotiable.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '📏', title: 'Egress Minimum Size', desc: '20″ wide × 24″ high × 5.7 sq ft net opening — IRC minimum for bedroom egress compliance.' },
            { icon: '🌧️', title: 'DFW Drainage Critical', desc: 'Clay soil around well base holds water. 6″ crushed gravel + drain pipe prevents hydrostatic window damage.' },
            { icon: '🦝', title: 'Cover Required', desc: 'Polycarbonate bubble cover blocks DFW storms and critters. Egress covers must open from inside without tools.' },
            { icon: '🪜', title: 'Ladder for Deep Wells', desc: 'IRC requires ladder for wells deeper than 44″. Most DFW egress wells are 48–60″ deep — ladder required.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#1e3a5f', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 6 }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Window Well Situation Guide</h2>
          <select value={situation} onChange={e => setSituation(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #2d4a7a', marginBottom: 12, fontSize: 15 }}>
            <option value="">Select your window well situation...</option>
            {situations.map(s => <option key={s.label} value={s.label}>{s.label}</option>)}
          </select>
          <button onClick={handle} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Get Guide →</button>
          {result && <div style={{ marginTop: 16, padding: 16, background: '#0A1628', borderRadius: 8, color: '#e2e8f0', lineHeight: 1.7 }}>{result}</div>}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>💡 DFW Annual Maintenance Checklist</div>
          <ul style={{ color: '#94a3b8', fontSize: 14, lineHeight: 2, margin: 0, paddingLeft: 20 }}>
            <li>Spring: inspect well for debris accumulation and standing water</li>
            <li>Spring: test drain pipe — pour water and confirm it exits properly</li>
            <li>Summer: inspect window frame caulk, replace if cracked from DFW heat</li>
            <li>Fall: clear leaves from gravel base before wet season</li>
            <li>After major storm: check for water intrusion at window corners</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
