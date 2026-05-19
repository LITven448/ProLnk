import { useState } from 'react';

export default function DFWWallCrackGuide2026() {
  const [crackType, setCrackType] = useState('');
  const [pattern, setPattern] = useState('');
  const [result, setResult] = useState('');

  function assess() {
    if (!crackType) { setResult('Please select a crack type.'); return; }
    if (crackType === 'horizontal') {
      setResult('🔴 SERIOUS — Horizontal cracks in walls indicate lateral pressure (soil or hydrostatic). This is a structural warning sign. Call a structural engineer or foundation specialist immediately.');
    } else if (crackType === 'diagonal' && pattern === 'door-corner') {
      setResult('🟡 FOUNDATION MOVEMENT — Diagonal cracks from door or window corners are classic signs of differential foundation settling in DFW clay soil. Monitor for growth; consult foundation company.');
    } else if (crackType === 'stair-step') {
      setResult('🟡 FOUNDATION CONCERN — Stair-step cracks in brick follow mortar joints and indicate foundation movement. Common in DFW but should be evaluated by a foundation specialist.');
    } else if (crackType === 'hairline') {
      setResult('🟢 NORMAL SETTLING — Hairline cracks under 1/16 inch wide are normal in DFW homes due to seasonal clay soil movement. Monitor seasonally; patch with flexible sealant.');
    } else if (crackType === 'wide') {
      setResult('🔴 NEEDS EVALUATION — Cracks wider than 1/4 inch are beyond normal settling. Measure and photograph them. If growing, call a foundation or structural engineer promptly.');
    } else {
      setResult('🟡 MONITOR — Document the crack with photos and measurements. If it grows more than 1/8 inch over 3 months, have a foundation specialist evaluate.');
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>🧱 DFW Wall Crack Guide 2026</div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>What wall cracks really mean in Dallas-Fort Worth homes — DFW clay soil causes unique cracking patterns every homeowner should understand.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[{icon:'✂️',title:'Hairline Cracks',severity:'Normal',color:'#22c55e',desc:'Under 1/16 inch. Normal seasonal movement in DFW clay soils.'},{icon:'↔️',title:'Horizontal Cracks',severity:'Serious',color:'#ef4444',desc:'Indicate lateral pressure. Structural engineer required.'},{icon:'↗️',title:'Diagonal Cracks',severity:'Moderate',color:'#f59e0b',desc:'From door corners = foundation movement. Monitor closely.'},{icon:'🧱',title:'Stair-Step Brick',severity:'Moderate',color:'#f59e0b',desc:'Follow mortar joints in brick. Foundation settling indicator.'}].map((item, i) => (
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
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>🌡️ DFW Clay Soil — Why Cracks Happen Here</div>
          {['DFW sits on expansive Blackland Prairie clay — one of the most reactive soils in the US','Clay expands when wet (winter rain) and contracts when dry (summer heat)','Homes experience seasonal movement of up to 2–4 inches in extreme conditions','New construction cracks in year 1–3 are often just settlement — not structural failure','Proper drainage and foundation watering programs reduce cracking dramatically'].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', color: '#cbd5e1' }}><span style={{ color: '#F5E642' }}>▶</span>{tip}</div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>🧮 Crack Severity Assessment</div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <select value={crackType} onChange={e => setCrackType(e.target.value)} style={{ background: '#1e3a5f', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '0.5rem' }}>
              <option value="">Crack Type</option>
              <option value="hairline">Hairline (under 1/16 inch)</option>
              <option value="diagonal">Diagonal Crack</option>
              <option value="horizontal">Horizontal Crack</option>
              <option value="stair-step">Stair-Step in Brick</option>
              <option value="wide">Wide Crack (over 1/4 inch)</option>
            </select>
            <select value={pattern} onChange={e => setPattern(e.target.value)} style={{ background: '#1e3a5f', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '0.5rem' }}>
              <option value="">Pattern (optional)</option>
              <option value="door-corner">From Door or Window Corner</option>
              <option value="center-wall">Center of Wall</option>
              <option value="ceiling-junction">At Ceiling Junction</option>
              <option value="multiple">Multiple Cracks</option>
            </select>
            <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 700, cursor: 'pointer' }}>Assess Severity</button>
          </div>
          {result && <div style={{ background: '#0f2744', borderRadius: 8, padding: '1rem', color: '#e2e8f0' }}>{result}</div>}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1rem 1.5rem', color: '#0A1628', fontWeight: 600 }}>
          🔧 TrustyPro connects DFW homeowners with vetted foundation and structural contractors — get a professional crack evaluation today.
        </div>
      </div>
    </div>
  );
}
