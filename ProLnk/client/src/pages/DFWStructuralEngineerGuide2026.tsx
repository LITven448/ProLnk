import { useState } from 'react';

export default function DFWStructuralEngineerGuide2026() {
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState('');

  function assess() {
    if (!concern) { setResult('Please select a concern.'); return; }
    if (concern === 'load-wall') {
      setResult('✅ YES — Structural engineer required. Dallas and Fort Worth require a PE-stamped plan for any load bearing wall removal before issuing a permit.');
    } else if (concern === 'foundation-crack') {
      setResult('✅ YES — For cracks beyond hairline or with displacement, a structural engineer provides an objective assessment separate from foundation company sales pitches. Cost: $300–700 for report.');
    } else if (concern === 'roof-modify') {
      setResult('✅ YES — Any modification to engineered trusses or cathedral rafter systems requires a PE stamp. No licensed contractor will touch roof structure without it.');
    } else if (concern === 'addition') {
      setResult('✅ YES — Additions over 200 sq ft in most DFW cities require structural drawings by a licensed engineer. Budget $800–2,000 for plans.');
    } else if (concern === 'pre-purchase') {
      setResult('✅ HIGHLY RECOMMENDED — For homes over 30 years old or with visible cracking, a structural engineer inspection ($400–600) provides peace of mind beyond a standard home inspection.');
    } else if (concern === 'hairline') {
      setResult('⏸️ NOT YET — Hairline cracks without displacement or growth are usually normal settling. Monitor for 1–2 seasons. If they grow, then engage an engineer.');
    } else {
      setResult('🟡 LIKELY YES — When in doubt, a $300–700 structural engineer consultation is cheap insurance against a $30,000+ repair surprise.');
    }
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>👷 DFW Structural Engineer Guide 2026</div>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>When to hire a licensed structural engineer in Dallas-Fort Worth — PE stamp requirements, typical costs, and how to find the right one.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          {[{icon:'💰',title:'Typical Costs',items:['Residential inspection report: $300–700','Structural drawings for addition: $800–2,000','Load bearing wall removal plan: $400–900','Expert witness / litigation: $200–400/hr']},{icon:'📋',title:'What You Get',items:['Written engineering report with findings','PE (Professional Engineer) stamp','Required for city permits in DFW cities','Defensible documentation for real estate']}].map((section, i) => (
            <div key={i} style={{ background: '#112240', borderRadius: 12, padding: '1rem' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{section.icon}</div>
              <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>{section.title}</div>
              {section.items.map((item, j) => (
                <div key={j} style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.3rem', color: '#94a3b8', fontSize: '0.85rem' }}><span style={{ color: '#F5E642' }}>▶</span>{item}</div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>📌 When DFW Permits Require a PE Stamp</div>
          {['Load bearing wall removal (all DFW cities)','Roof structure modifications or attic conversions','Additions over 200 sq ft in most municipalities','Deck or patio cover over 200 sq ft with footing','Foundation repair permits in some cities (Dallas, Plano, Frisco)','Retaining walls over 4 feet in height'].map((tip, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', color: '#cbd5e1' }}><span style={{ color: '#F5E642' }}>▶</span>{tip}</div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '1rem' }}>🧮 Do I Need a Structural Engineer?</div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <select value={concern} onChange={e => setConcern(e.target.value)} style={{ background: '#1e3a5f', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '0.5rem' }}>
              <option value="">Select Your Situation</option>
              <option value="load-wall">Removing a Load Bearing Wall</option>
              <option value="foundation-crack">Foundation Cracks Beyond Hairline</option>
              <option value="roof-modify">Modifying Roof or Trusses</option>
              <option value="addition">Building an Addition</option>
              <option value="pre-purchase">Pre-Purchase Inspection (Older Home)</option>
              <option value="hairline">Just Hairline Cracks</option>
              <option value="other">Other Structural Concern</option>
            </select>
            <button onClick={assess} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 700, cursor: 'pointer' }}>Get Answer</button>
          </div>
          {result && <div style={{ background: '#0f2744', borderRadius: 8, padding: '1rem', color: '#e2e8f0' }}>{result}</div>}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: '1rem 1.5rem', color: '#0A1628', fontWeight: 600 }}>
          🔧 TrustyPro connects DFW homeowners with verified structural engineers and general contractors — get matched with the right professional today.
        </div>
      </div>
    </div>
  );
}
