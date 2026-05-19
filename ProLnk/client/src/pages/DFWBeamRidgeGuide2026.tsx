import { useState } from 'react';

export default function DFWBeamRidgeGuide2026() {
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState('');

  function assess() {
    if (!concern) { setResult('Please select a framing concern.'); return; }
    if (concern === 'truss-modify') {
      setResult('🔴 STOP — Truss systems dominate DFW new construction and CANNOT be cut or modified without an engineered repair plan. Contact a structural engineer immediately.');
    } else if (concern === 'ridge-sag') {
      setResult('🔴 STRUCTURAL CONCERN — A sagging ridge board or beam indicates rafter spread or settlement. Requires structural engineer inspection before any repair.');
    } else if (concern === 'collar-ties') {
      setResult('🟡 MODERATE — Collar ties prevent rafter spread. Missing or cut collar ties can cause wall spread over time. Framing contractor can assess.');
    } else if (concern === 'attic-conversion') {
      setResult('🟡 REQUIRES ENGINEERING — Converting a truss attic requires full rafter replacement with engineered design. Budget $15,000–40,000+ for DFW homes.');
    } else {
      setResult('🟢 INFORMATIONAL — Ridge board issues in older rafter-framed DFW homes are often repairable. Have a framing contractor inspect and provide a scope.');
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>🏠 DFW Roof Ridge and Beam Guide 2026</div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Understanding roof framing systems in Dallas-Fort Worth homes — ridge boards, beams, trusses, and what you can and cannot modify.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[{icon:'📐',title:'Ridge Board',desc:'Sits at peak of rafter-framed roofs. Non-structural — rafters carry load, not the ridge board itself.'},{icon:'🔩',title:'Ridge Beam',desc:'Structural member in cathedral ceilings where no ceiling ties exist. Must be engineered and sized correctly.'},{icon:'🔺',title:'Trusses',desc:'Dominate DFW homes built after 1980. Factory-engineered, highly efficient — but cannot be cut or modified.'},{icon:'🔗',title:'Collar Ties',desc:'Horizontal boards connecting opposing rafters. Prevent wall spread — critical to roof system integrity.'}].map((item, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 12, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{item.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.3rem' }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>⚠️ The Truss Rule in DFW</div>
          {['85%+ of DFW homes built since 1985 use engineered truss systems','Trusses are designed as a complete system — cutting any member weakens the whole','Common mistake: homeowners cut bottom chord for storage — dangerous','Truss repair requires a licensed truss manufacturer and structural engineer','Attic conversions in truss homes require full roof replacement with rafters'].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', color: '#cbd5e1' }}><span style={{ color: '#F5E642' }}>▶</span>{tip}</div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>🧮 Roof Framing Concern Assessment</div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <select value={concern} onChange={e => setConcern(e.target.value)} style={{ background: '#1e3a5f', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '0.5rem' }}>
              <option value="">Select Your Concern</option>
              <option value="truss-modify">Want to Modify Trusses</option>
              <option value="ridge-sag">Ridge Appears to Sag</option>
              <option value="collar-ties">Missing or Cut Collar Ties</option>
              <option value="attic-conversion">Converting Attic to Living Space</option>
              <option value="general">General Roof Structure Question</option>
            </select>
            <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 700, cursor: 'pointer' }}>Get Assessment</button>
          </div>
          {result && <div style={{ background: '#0f2744', borderRadius: 8, padding: '1rem', color: '#e2e8f0' }}>{result}</div>}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1rem 1.5rem', color: '#0A1628', fontWeight: 600 }}>
          🔧 TrustyPro connects DFW homeowners with verified roofing and structural contractors — get expert eyes on your roof framing today.
        </div>
      </div>
    </div>
  );
}
