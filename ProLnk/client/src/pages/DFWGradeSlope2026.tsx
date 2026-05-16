import { useState } from 'react';

export default function DFWGradeSlope2026() {
  const [issue, setIssue] = useState('');
  const [result, setResult] = useState('');

  const issues = [
    { label: 'Ground flat against foundation', assessment: 'High risk. DFW clay with zero slope traps moisture against stem wall. Target: 6-inch drop in first 10 feet. Add clean fill dirt (no organic matter) and compact in 2-inch lifts. Annual touchup expected as DFW clay continues settling.' },
    { label: 'Ground slopes toward house', assessment: 'Critical. Negative grade channels all storm runoff directly to foundation. Requires immediate regrading — add 4–8 inches of compacted fill dirt sloping away. Cost: $1,500–$4,000 DIY to $8,000 professional depending on scope.' },
    { label: 'Slope looks OK but still getting wet', assessment: 'DFW clay problem. Clay surface sheds water but subsurface layers channel it horizontally to foundation. Correct fix: French drain 3–4 feet from foundation plus verify downspouts discharge 6+ feet away.' },
    { label: 'Just added dirt — anything to avoid?', assessment: 'Never use topsoil, compost, or mulch against foundation — organic matter retains moisture and compresses over time. Use compacted fill dirt (caliche or clay mix). Do not bury wood, concrete debris, or roots. Slope away at 1.5-inch drop per foot minimum.' },
    { label: 'How often to regrade in DFW?', assessment: 'DFW clay shifts every season — wet season swells, dry season shrinks. Inspect grade every spring after wet season settles. Most DFW homes need minor grading touchup every 2–3 years. Major regrading every 7–10 years depending on drainage and tree root activity.' },
    { label: 'Need professional grading — when?', assessment: 'Call a pro when: slope is more than 12 inches off target, large area (2,000+ sq ft) needs correction, drainage conflicts with neighbor property, or you have confirmed foundation movement. Average DFW professional grading: $3,000–$12,000 for typical residential lot.' },
  ];

  const handle = () => {
    const match = issues.find(i => i.label === issue);
    setResult(match ? match.assessment : 'Select a grading issue to see assessment and fix.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOME GUIDE 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Property Grading and Slope Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Grade is the single most impactful thing a DFW homeowner controls for foundation health. DFW clay makes grading both more important and more maintenance-intensive than most of the country.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '📐', stat: '6 inches', label: 'Drop in first 10 feet from foundation (minimum)' },
            { icon: '📅', stat: '2–3 years', label: 'Typical DFW regrade interval due to clay settling' },
            { icon: '💰', stat: '10:1', label: 'Return on grading vs foundation repair costs avoided' },
          ].map(item => (
            <div key={item.stat} style={{ background: '#1e3a5f', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{item.stat}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{item.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📋 DFW Grading Rules</h2>
          <ul style={{ color: '#94a3b8', fontSize: 14, lineHeight: 2, margin: 0, paddingLeft: 20 }}>
            <li>Minimum slope: 1 inch drop per 1 foot of run (ideally 1.5 inches per foot)</li>
            <li>Critical zone: first 10 feet from foundation</li>
            <li>Fill material: compacted clean fill dirt only — no organic matter, no mulch</li>
            <li>DFW clay swells and settles seasonally — inspect every spring</li>
            <li>Never raise grade above weep screed or brick course on exterior wall</li>
            <li>Trees within 20 feet: roots will undo grading — budget for more frequent touchups</li>
          </ul>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Grading Issue Assessor</h2>
          <select value={issue} onChange={e => setIssue(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: 8, background: '#0A1628', color: '#fff', border: '1px solid #2d4a7a', marginBottom: 12, fontSize: 15 }}>
            <option value="">Select your grading situation...</option>
            {issues.map(i => <option key={i.label} value={i.label}>{i.label}</option>)}
          </select>
          <button onClick={handle} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Get Assessment →</button>
          {result && <div style={{ marginTop: 16, padding: 16, background: '#0A1628', borderRadius: 8, color: '#e2e8f0', lineHeight: 1.7 }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}
