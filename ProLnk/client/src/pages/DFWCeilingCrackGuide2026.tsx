import { useState } from 'react';

export default function DFWCeilingCrackGuide2026() {
  const [crackDesc, setCrackDesc] = useState('');
  const [result, setResult] = useState('');

  function assess() {
    if (!crackDesc) { setResult('Please describe the crack.'); return; }
    if (crackDesc === 'displacement') {
      setResult('🔴 SERIOUS STRUCTURAL CONCERN — Cracks with vertical displacement (one side higher than the other) indicate structural movement. Call a structural engineer before any repairs.');
    } else if (crackDesc === 'wide') {
      setResult('🔴 NEEDS EVALUATION — Cracks wider than 1/4 inch are beyond normal settling. Measure, photograph, and have a structural engineer or foundation specialist evaluate promptly.');
    } else if (crackDesc === 'water-stain') {
      setResult('🟡 MOISTURE ISSUE — Ceiling cracks with brown water staining indicate a roof leak or plumbing issue above. Fix the moisture source first, then assess if crack is structural.');
    } else if (crackDesc === 'spider-web') {
      setResult('🟢 PLASTER AGING — Spider web or map cracking is typical in older DFW homes with plaster ceilings. Usually cosmetic — skim coat repair or replace with drywall.');
    } else if (crackDesc === 'hairline') {
      setResult('🟢 NORMAL — Hairline ceiling cracks are common in DFW due to seasonal humidity and clay soil movement. Monitor for widening; patch with flexible joint compound.');
    } else {
      setResult('🟡 MONITOR — Document with photos. If crack grows over 1/8 inch or develops displacement, consult a structural engineer or foundation company.');
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>🔭 DFW Ceiling Crack Guide 2026</div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>What ceiling cracks mean in Dallas-Fort Worth homes — from harmless settling to signs of serious structural movement.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[{icon:'✂️',title:'Hairline Cracks',severity:'Normal',color:'#22c55e',desc:'Thin cracks under 1/16 inch. Normal in DFW climate — seasonal humidity and soil movement.'},{icon:'📏',title:'Wide Cracks',severity:'Concern',color:'#ef4444',desc:'Over 1/4 inch wide. Evaluate for structural cause before patching.'},{icon:'⬆️',title:'Cracks with Displacement',severity:'Serious',color:'#ef4444',desc:'One side higher than other. Structural engineer required.'},{icon:'🕸️',title:'Spider Web Pattern',severity:'Cosmetic',color:'#22c55e',desc:'Map cracking in plaster ceilings. Normal aging — cosmetic repair only.'}].map((item, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 12, padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                <span style={{ background: item.color, color: '#fff', borderRadius: 6, padding: '0.1rem 0.5rem', fontSize: '0.75rem', fontWeight: 700 }}>{item.severity}</span>
              </div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.3rem' }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>💧 Water Stains vs Structural Cracks</div>
          {['Brown or yellow staining around a crack = moisture source (roof, AC condensate, plumbing)','Fix the leak before patching — wet drywall will fail again','White mineral deposits around crack = chronic moisture intrusion','Structural cracks are usually clean with no staining','In DFW, AC units in attics are a common ceiling stain culprit'].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', color: '#cbd5e1′ }}><span style={{ color: '#F5E642' }}>▶</span>{tip}</div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>🧮 Ceiling Crack Assessment</div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <select value={crackDesc} onChange={e => setCrackDesc(e.target.value)} style={{ background: '#1e3a5f', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '0.5rem' }}>
              <option value="">Describe the Crack</option>
              <option value="hairline">Hairline (very thin)</option>
              <option value="wide">Wide (over 1/4 inch)</option>
              <option value="displacement">One side higher than other</option>
              <option value="water-stain">Has brown water staining</option>
              <option value="spider-web">Spider web pattern</option>
              <option value="long">Long single crack across ceiling</option>
            </select>
            <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 700, cursor: 'pointer' }}>Get Assessment</button>
          </div>
          {result && <div style={{ background: '#0f2744', borderRadius: 8, padding: '1rem', color: '#e2e8f0′ }}>{result}</div>}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1rem 1.5rem', color: '#0A1628', fontWeight: 600 }}>
          🔧 TrustyPro connects DFW homeowners with structural engineers, drywall contractors, and roofing pros — get the right expert for your ceiling issue.
        </div>
      </div>
    </div>
  );
}
