import { useState } from 'react';

export default function DFWDrainageSystemsGuide2026() {
  const [problem, setProblem] = useState('');
  const [result, setResult] = useState('');

  const problems = [
    { label: 'Water pools near foundation', solution: 'Surface grading + French drain combo. Regrade to 6-inch drop in first 10 feet. Install 4-inch perforated pipe 18 inches deep along foundation, daylight to yard or street.' },
    { label: 'Standing water in yard', solution: 'Surface swales or dry creek bed. Grade shallow channels to redirect sheet flow. Dry creek adds aesthetics + 3x more flow capacity than pipe alone.' },
    { label: 'Downspout dumps at foundation', solution: 'Extend minimum 6 feet away or bury corrugated pipe to daylight 10+ feet out. DFW clay cannot absorb fast volume — must transport water away, not just disperse.' },
    { label: 'Basement or crawl space wet', solution: 'Interior drain tile + sump pump + exterior French drain. DFW clay hydrostatic pressure builds fast — multi-system approach required for persistent wet basements.' },
    { label: 'Driveway or patio flooding', solution: 'Channel drain (slot drain) across low point. Connects to underground pipe daylighting to street or rear swale. DFW code requires no flow increase to neighbor.' },
    { label: 'Rain garden feasibility', solution: 'Rain gardens work in DFW but require special soil mix — native clay must be replaced 18 inches deep with 60% sand / 30% compost / 10% topsoil. Size for 1-inch storm runoff from contributing roof area.' },
  ];

  const handle = () => {
    const match = problems.find(p => p.label === problem);
    setResult(match ? match.solution : 'Select a drainage problem above to get your solution.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Home Drainage Systems Complete Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>DFW expansive clay soil means drainage is the #1 foundation protector. Get the right system for your problem.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🌊', title: 'Surface Drainage', desc: 'Grading + swales move water across the surface away from structures. First line of defense in DFW.' },
            { icon: '🕳️', title: 'French Drains', desc: 'Perforated pipe in gravel trench captures subsurface water. Critical along foundations in DFW clay.' },
            { icon: '💧', title: 'Downspout Management', desc: 'Extensions and buried pipes carry roof runoff away. Each downspout moves 10–50 gallons per minute in a DFW storm.' },
            { icon: '🪨', title: 'Dry Creek Beds', desc: 'Functional drainage channel disguised as landscape feature. Handles 3x more flow than buried pipe of same width.' },
            { icon: '🌿', title: 'Rain Gardens', desc: 'Engineered depression with amended soil absorbs runoff. Must replace DFW clay with sand/compost mix to function.' },
            { icon: '🏗️', title: 'Channel Drains', desc: 'Slot drains at low points in hardscape. Required for driveways and patios that collect water in DFW storms.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#1e3a5f', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 600, color: '#F5E642', marginBottom: 6 }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 14 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Drainage Problem Solver</h2>
          <select value={problem} onChange={e => setProblem(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #2d4a7a', marginBottom: 12, fontSize: 15 }}>
            <option value="">Select your drainage problem...</option>
            {problems.map(p => <option key={p.label} value={p.label}>{p.label}</option>)}
          </select>
          <button onClick={handle} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Get Solution →</button>
          {result && <div style={{ marginTop: 16, padding: 16, background: '#0A1628', borderRadius: 8, color: '#e2e8f0', lineHeight: 1.7 }}>{result}</div>}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>⚠️ Drainage + Foundation Connection</div>
          <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>In DFW, 80% of foundation movement is moisture-related. Proper drainage keeps soil moisture consistent — the enemy is not water, it is uneven moisture. Wet one side, dry the other = differential movement = cracked slab. Every dollar spent on drainage is worth $10 in avoided foundation repair.</p>
        </div>
      </div>
    </div>
  );
}
