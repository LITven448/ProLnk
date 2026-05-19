import { useState } from 'react';

export default function DFWLoadBearingWallGuide2026() {
  const [goal, setGoal] = useState('');
  const [homeType, setHomeType] = useState('');
  const [result, setResult] = useState('');

  function assess() {
    if (!goal || !homeType) { setResult('Please select both options.'); return; }
    if (goal === 'open-concept' && homeType === 'ranch') {
      setResult('🔴 HIGH RISK — Ranch homes have central load bearing walls running parallel to the ridge. Structural engineer required before any removal.');
    } else if (goal === 'open-concept' && homeType === 'two-story') {
      setResult('🔴 CRITICAL — Two-story homes rely on interior walls to transfer loads from upper floors. Do not remove without PE stamp.');
    } else if (goal === 'doorway' && homeType === 'slab') {
      setResult('🟡 MODERATE — Slab homes often have load bearing walls at 8–12 ft intervals. Engineer consult recommended for any doorway widening.');
    } else if (goal === 'closet') {
      setResult('🟢 LOWER RISK — Closet walls are usually non-structural but verify with joist direction check before proceeding.');
    } else {
      setResult('🟡 MODERATE — DFW home structural systems vary widely. Hire a structural engineer for a $300–500 assessment before demo.');
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>🏗️ DFW Load Bearing Wall Guide 2026</div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Identifying load bearing walls in Dallas-Fort Worth homes before renovation.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>🔍 How to Identify Load Bearing Walls</div>
          {['Exterior walls are almost always load bearing','Walls perpendicular to floor joists typically carry loads','Center walls running parallel to ridge beam are load bearing','Steel beams or LVL headers above openings signal load bearing','Walls stacked floor-to-floor in multi-story homes carry loads'].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', color: '#cbd5e1' }}><span style={{ color: '#F5E642' }}>▶</span>{tip}</div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>⚠️ DFW-Specific Considerations</div>
          {['Expansive clay soils cause settling — cracks near walls need evaluation','1970s–1990s DFW homes often have hidden steel columns in walls','Open-concept trend has led to many improper DIY wall removals','City of Dallas requires permit + PE stamp for structural wall removal'].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', color: '#cbd5e1' }}><span style={{ color: '#F5E642' }}>▶</span>{tip}</div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>🧮 Renovation Risk Assessment</div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <select value={goal} onChange={e => setGoal(e.target.value)} style={{ background: '#1e3a5f', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '0.5rem' }}>
              <option value="">Renovation Goal</option>
              <option value="open-concept">Open Concept Layout</option>
              <option value="doorway">Widen a Doorway</option>
              <option value="closet">Remove Closet Wall</option>
              <option value="other">Other Modification</option>
            </select>
            <select value={homeType} onChange={e => setHomeType(e.target.value)} style={{ background: '#1e3a5f', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '0.5rem' }}>
              <option value="">Home Type</option>
              <option value="ranch">Single Story Ranch</option>
              <option value="two-story">Two Story</option>
              <option value="slab">Slab Foundation</option>
              <option value="pier-beam">Pier and Beam</option>
            </select>
            <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 700, cursor: 'pointer' }}>Assess Risk</button>
          </div>
          {result && <div style={{ background: '#0f2744', borderRadius: 8, padding: '1rem', color: '#e2e8f0' }}>{result}</div>}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1rem 1.5rem', color: '#0A1628', fontWeight: 600 }}>
          🔧 TrustyPro connects you with licensed DFW structural engineers and framing contractors — get quotes before you demo anything.
        </div>
      </div>
    </div>
  );
}
