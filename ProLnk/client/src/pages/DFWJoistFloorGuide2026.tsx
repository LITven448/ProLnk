import { useState } from 'react';

export default function DFWJoistFloorGuide2026() {
  const [issue, setIssue] = useState('');
  const [result, setResult] = useState('');

  function assess() {
    if (!issue) { setResult('Please select a floor issue.'); return; }
    if (issue === 'squeaky') {
      setResult('🟢 COMMON — Squeaky floors in pier and beam homes are usually caused by missing bridging or loose subfloor. A framing contractor can add blocking or secure subfloor for $300–800.');
    } else if (issue === 'sagging') {
      setResult('🔴 STRUCTURAL — Sagging floors indicate joist failure, beam settling, or pier movement. Requires structural engineer assessment. Do not ignore — worsens with time.');
    } else if (issue === 'termite') {
      setResult('🔴 URGENT — Termite-damaged joists must be professionally assessed and sistered or replaced. Get a pest inspection + structural contractor estimate immediately.');
    } else if (issue === 'moisture') {
      setResult('🟡 SERIOUS — Moisture-damaged joists weaken over time. Find and fix the moisture source first (drainage, plumbing), then assess joist replacement with a contractor.');
    } else if (issue === 'bouncy') {
      setResult('🟡 MODERATE — Bouncy floors often indicate undersized joists or missing mid-span blocking. A framing contractor can sister joists or add beam support for $500–2,000.');
    } else {
      setResult('🟢 INFORMATIONAL — Many floor joist issues in DFW pier and beam homes are repairable without full replacement. Get a professional crawl space inspection.');
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>🪵 DFW Floor Joist Guide 2026</div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Floor joist issues in Dallas-Fort Worth pier and beam homes — diagnosis, severity, and when to call a structural engineer.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>🏠 DFW Pier and Beam Context</div>
          {['Large portions of older Dallas and Fort Worth neighborhoods use pier and beam foundations','Pier and beam homes have accessible crawl spaces — repairs are often less invasive than slab','DFW clay soils cause pier movement which transfers stress to floor joists','Older homes (pre-1960) used old-growth lumber — dense and durable but often undersized by modern standards','Termites are a significant threat in DFW — annual inspections recommended for pier and beam homes'].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', color: '#cbd5e1' }}><span style={{ color: '#F5E642' }}>▶</span>{tip}</div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[{icon:'🔧',title:'Sistering',desc:'Attaching a new joist alongside a damaged one. Most common repair — cost-effective and strong.'},{icon:'🪜',title:'Bridging',desc:'Cross-bracing between joists to distribute load and reduce flex and squeaking.'},{icon:'🏗️',title:'Beam Support',desc:'Adding a mid-span beam and posts to reduce joist span and sag.'},{icon:'🔄',title:'Full Replacement',desc:'Required for severely damaged joists from termites, fire, or long-term moisture.'}].map((item, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 12, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{item.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.3rem' }}>{item.title}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>🧮 Floor Issue Assessment</div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <select value={issue} onChange={e => setIssue(e.target.value)} style={{ background: '#1e3a5f', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '0.5rem' }}>
              <option value="">Select Floor Issue</option>
              <option value="squeaky">Squeaky Floors</option>
              <option value="sagging">Sagging or Dipping Floor</option>
              <option value="termite">Suspected Termite Damage</option>
              <option value="moisture">Moisture or Rot Damage</option>
              <option value="bouncy">Bouncy or Springy Floor</option>
              <option value="general">General Concern</option>
            </select>
            <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 700, cursor: 'pointer' }}>Get Assessment</button>
          </div>
          {result && <div style={{ background: '#0f2744', borderRadius: 8, padding: '1rem', color: '#e2e8f0' }}>{result}</div>}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1rem 1.5rem', color: '#0A1628', fontWeight: 600 }}>
          🔧 TrustyPro connects DFW homeowners with vetted foundation, structural, and framing contractors — get multiple quotes on floor joist repair.
        </div>
      </div>
    </div>
  );
}
