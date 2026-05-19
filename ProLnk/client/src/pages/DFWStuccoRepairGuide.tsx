import { useState } from 'react';

const CRACK_TYPES = [
  { id: 'hairline', label: 'Hairline Cracks (< 1/16″)', base: 5, patch: true },
  { id: 'medium', label: 'Medium Cracks (1/16″–1/4″)', base: 10, patch: true },
  { id: 'wide', label: 'Wide Cracks / Delamination', base: 18, patch: false },
  { id: 'moisture', label: 'Moisture Intrusion / Bubbling', base: 22, patch: false },
  { id: 'eifs_fail', label: 'EIFS System Failure', base: 28, patch: false },
];

const AGE_RANGES = [
  { id: 'new', label: 'Under 10 years', mult: 0.8 },
  { id: 'mid', label: '10–20 years', mult: 1.0 },
  { id: 'old', label: '20+ years', mult: 1.4 },
];

const EXTENTS = [
  { id: 'small', label: 'Small area (< 50 sq ft)', mult: 1.3 },
  { id: 'medium', label: 'Medium area (50–200 sq ft)', mult: 1.0 },
  { id: 'large', label: 'Large area (200+ sq ft)', mult: 0.85 },
];

export default function DFWStuccoRepairGuide() {
  const [crackType, setCrackType] = useState('');
  const [age, setAge] = useState('');
  const [extent, setExtent] = useState('');
  const [result, setResult] = useState(null);

  function calculate() {
    if (!crackType || !age || !extent) return;
    const ct = CRACK_TYPES.find(x => x.id === crackType);
    const ag = AGE_RANGES.find(x => x.id === age);
    const ex = EXTENTS.find(x => x.id === extent);
    const sqft = extent === 'small' ? 30 : extent === 'medium' ? 125 : 300;
    const low = Math.round(ct.base * ag.mult * ex.mult * sqft);
    const high = Math.round(ct.base * ag.mult * ex.mult * sqft * 1.45);
    const action = ct.patch && age !== 'old' ? 'Patch Repair' : 'Full Section Replacement';
    setResult({ low, high, action, patch: ct.patch });
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW EXTERIOR GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>🏠 Stucco Repair Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          Stucco is standard on DFW new construction built after 2000. DFW's extreme heat accelerates stucco failure faster than northern climates, and moisture intrusion behind stucco is the region’s leading exterior repair issue.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '🌡️', title: 'DFW Heat Acceleration', desc: 'Dallas summers exceed 100°F for weeks. Traditional stucco expands and contracts daily, opening cracks 2–3x faster than in cooler climates. Elastomeric paint helps but is not a substitute for proper repair.' },
            { icon: '🆚', title: 'EIFS vs Traditional Stucco', desc: 'EIFS (synthetic stucco) is common in DFW 1990s–2010s construction. It looks identical but traps moisture differently. EIFS failures require complete removal and re-installation — no patch fix exists.' },
            { icon: '💧', title: 'Moisture Intrusion', desc: 'DFW’s combination of heavy spring rains and extreme summer heat creates pressure cycling that drives water behind stucco. Look for bubbling, discoloration, or soft spots — all indicate moisture behind the system.' },
            { icon: '🔄', title: 'Repair vs Replace', desc: 'Patches on traditional stucco work well if the substrate is sound and cracks are isolated. EIFS failures, widespread delamination, or moisture damage always require full section replacement.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#112240', borderRadius: 10, padding: '16px 20px', border: '1px solid #1e3a5f', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642′ }}>🧮 Repair Cost Estimator</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>Crack / Damage Type</label>
              <select value={crackType} onChange={e => setCrackType(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="">Select damage type...</option>
                {CRACK_TYPES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>Stucco Age</label>
              <select value={age} onChange={e => setAge(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="">Select age...</option>
                {AGE_RANGES.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>Affected Extent</label>
              <select value={extent} onChange={e => setExtent(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="">Select extent...</option>
                {EXTENTS.map(ex => <option key={ex.id} value={ex.id}>{ex.label}</option>)}
              </select>
            </div>
            <button onClick={calculate} style={{ padding: '12px 24px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Calculate Estimate</button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>${result.low.toLocaleString()} – ${result.high.toLocaleString()}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Estimated repair cost</div>
              <div style={{ display: 'inline-block', background: result.patch ? '#14532d' : '#7f1d1d', padding: '4px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 12 }}>
                {result.patch ? '🩹' : '🏗️'} Recommended: {result.action}
              </div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>
                {result.patch
                  ? 'Clean damaged area, apply bonding agent, fill with matching stucco mix in 2–3 coats. Final coat must be color-matched — DFW UV causes fading so use fresh pigment batches.'
                  : 'Remove affected section to sheathing, inspect for moisture damage, replace vapor barrier if needed, re-lath, apply 3-coat stucco system. Do not patch over EIFS or moisture-damaged areas.'}
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>💡 DFW Warning</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>Always get a moisture reading before accepting a patch quote. Undetected moisture behind stucco causes mold and structural wood rot within 12–18 months in DFW's climate. A $200 moisture inspection can prevent a $20,000 remediation.</div>
        </div>
      </div>
    </div>
  );
}
