import { useState } from 'react';

const problems = [
  { label: 'Bouncy/Springy Floor', value: 'bounce' },
  { label: 'Squeaking Noise', value: 'squeak' },
  { label: 'Soft Spots / Rot', value: 'rot' },
  { label: 'Sagging / Visible Dip', value: 'sag' },
];
const vintages = [
  { label: 'Pre-1960 (Older Pier & Beam)', value: 'pre60' },
  { label: '1960–1990', value: '60to90' },
  { label: '1990–Present', value: 'post90' },
];

const assess: Record<string, Record<string, { cause: string; repair: string; cost: string }>> = {
  bounce: {
    pre60: { cause: 'Original 2×8 joists undersized for span; DFW clay shifted piers', repair: 'Sister joists full length + re-level piers', cost: '$1,200–$3,500' },
    '60to90': { cause: 'Joist crown reversed by moisture cycling; mid-span sag', repair: 'Sister joist + bridging installation', cost: '$800–$2,500' },
    post90: { cause: 'Engineered I-joist web damage or improper notching', repair: 'Web filler patch or full joist replacement', cost: '$600–$2,000' },
  },
  squeak: {
    pre60: { cause: 'Subfloor boards rubbing original lumber joists; nail fatigue', repair: 'Screw subfloor to joist from below + shim gaps', cost: '$400–$1,200' },
    '60to90': { cause: 'Seasonal DFW expansion pulling nails; subfloor separation', repair: 'Construction adhesive + screw from above', cost: '$300–$900' },
    post90: { cause: 'OSB subfloor separation from I-joist flange', repair: 'Squeeeeek No More screws from below', cost: '$200–$700' },
  },
  rot: {
    pre60: { cause: 'Ground moisture + poor ventilation in old crawl space', repair: 'Replace rotted section + install vapor barrier', cost: '$1,500–$5,000' },
    '60to90': { cause: 'Plumbing leak or inadequate crawl space venting', repair: 'Remediate moisture source + sister or replace joist', cost: '$1,200–$4,000' },
    post90: { cause: 'Improper drainage grading directing water to crawl', repair: 'Full joist replacement + drainage correction', cost: '$1,800–$6,000' },
  },
  sag: {
    pre60: { cause: 'Pier settlement from DFW expansive clay; joist overspanned', repair: 'Re-level piers + sister joists + center beam check', cost: '$2,500–$8,000' },
    '60to90': { cause: 'Overloaded mid-span; added heavy appliance without reinforcement', repair: 'Add mid-span support beam or sister joists', cost: '$1,500–$4,500' },
    post90: { cause: 'Engineered lumber moisture damage causing camber loss', repair: 'Full I-joist replacement in affected bay', cost: '$2,000–$6,000' },
  },
};

export default function DFWFloorJoistGuide() {
  const [problem, setProblem] = useState('');
  const [vintage, setVintage] = useState('');

  const result = problem && vintage ? assess[problem]?.[vintage] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: 'uppercase' }}>🏠 DFW Home Health Vault</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Floor Joist Guide</h1>
        <p style={{ color: '#9BA3B5', marginBottom: 32, lineHeight: 1.6 }}>DFW pier-and-beam homes sit on expansive clay soil that swells in rain and shrinks in drought. That constant movement stresses floor joists year-round — more than almost anywhere in the U.S.</p>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>⚙️ What Floor Joists Do</h2>
          <p style={{ color: '#C5CAD8', lineHeight: 1.7 }}>Floor joists are the horizontal framing members that span between your foundation beams and support the subfloor above. In DFW pier-and-beam homes they're typically 2×8 or 2×10 lumber (older homes) or engineered I-joists (newer builds). They carry all live and dead loads — furniture, people, appliances — and transfer weight to the beams and piers below.</p>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>🌧️ Why DFW Clay Soil Is the Enemy</h2>
          <ul style={{ color: '#C5CAD8', lineHeight: 2, paddingLeft: 20 }}>
            <li>Clay expands up to 10% in wet seasons → piers heave unevenly</li>
            <li>Drought causes shrinkage → piers drop, joists lose support mid-span</li>
            <li>Repeated cycles fatigue fasteners and open gaps between subfloor and joists</li>
            <li>Poor crawl space ventilation accelerates moisture damage to lumber</li>
          </ul>
        </section>

        <section style={{ marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 12 }}>🔧 Sister Joist Repair Explained</h2>
          <p style={{ color: '#C5CAD8', lineHeight: 1.7 }}>Sistering means running a new joist alongside the damaged one and fastening them together. It restores full structural capacity without removing the original member. In DFW crawl spaces (typical 18–24" clearance) sistering requires a skilled crew — not a DIY project.</p>
        </section>

        <div style={{ background: '#0F2040', border: '2px solid #F5E642', borderRadius: 12, padding: 28, marginBottom: 32 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Symptom Assessor</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#9BA3B5', fontSize: 13, display: 'block', marginBottom: 8 }}>What are you experiencing?</label>
            <select value={problem} onChange={e => setProblem(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select symptom…</option>
              {problems.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#9BA3B5', fontSize: 13, display: 'block', marginBottom: 8 }}>Home vintage</label>
            <select value={vintage} onChange={e => setVintage(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, color: '#E8EAF0', fontSize: 15 }}>
              <option value=''>Select vintage…</option>
              {vintages.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 20 }}>
              <div style={{ marginBottom: 12 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Likely Cause: </span><span style={{ color: '#C5CAD8' }}>{result.cause}</span></div>
              <div style={{ marginBottom: 12 }}><span style={{ color: '#F5E642', fontWeight: 700 }}>Repair Approach: </span><span style={{ color: '#C5CAD8' }}>{result.repair}</span></div>
              <div><span style={{ color: '#F5E642', fontWeight: 700 }}>Typical DFW Cost: </span><span style={{ color: '#4ADE80' }}>{result.cost}</span></div>
            </div>
          )}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 8, padding: 20, border: '1px solid #1E3A5F' }}>
          <p style={{ color: '#9BA3B5', fontSize: 13, margin: 0 }}>⚠️ Structural assessments require an in-person inspection. This guide is educational. Always consult a licensed structural engineer or foundation specialist for load-bearing decisions in DFW.</p>
        </div>
      </div>
    </div>
  );
}
