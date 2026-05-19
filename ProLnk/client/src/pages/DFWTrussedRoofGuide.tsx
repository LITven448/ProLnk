import { useState } from 'react';

const trussIssues = ['Truss chord cracked', 'Web member cut or missing', 'Truss plate pulling away', 'Sagging truss bottom chord', 'Attic storage weight concern', 'No visible issues'];
const homeVintages = ['Pre-1980 (likely rafters)', '1980–1995', '1996–2010', '2011–present'];

function getTrussAssessment(issue: string, vintage: string) {
  if (issue === 'Truss chord cracked') {
    return {
      level: 'CRITICAL',
      color: '#FF2222',
      assessment: 'A cracked top or bottom chord is a structural emergency. Trusses are engineered systems — one failed member compromises the entire truss.',
      safe: 'UNSAFE — Do not occupy attic space. Temporary shoring may be required.',
      action: 'Engage licensed structural engineer immediately. Do not attempt DIY repair.',
    };
  }
  if (issue === 'Web member cut or missing') {
    return {
      level: 'CRITICAL',
      color: '#FF2222',
      assessment: 'Cut or removed web members are a leading cause of DFW roof collapses during storms. Even a single altered web destroys the engineered load path.',
      safe: 'UNSAFE — The truss cannot be considered structurally sound until evaluated by an engineer.',
      action: 'Structural engineer + licensed framing contractor for approved truss repair or replacement.',
    };
  }
  if (issue === 'Truss plate pulling away') {
    return {
      level: 'HIGH',
      color: '#FF8C00',
      assessment: 'Metal connector plates anchor web members to chords. Separation typically means overload, moisture damage, or improper installation — common in pre-2000 DFW builds.',
      safe: 'CAUTION — Reduce attic loads immediately. Schedule inspection before next wind event.',
      action: 'Framing contractor + engineer sign-off on repair approach. Hurricane ties may also need upgrading.',
    };
  }
  if (issue === 'Attic storage weight concern') {
    return {
      level: 'MODERATE',
      color: '#F5E642',
      assessment: 'Most DFW residential trusses are engineered for 10–20 psf attic live load. HVAC equipment, heavy boxes, and flooring can exceed design limits.',
      safe: 'Store only on structural attic floor systems or bottom chord rated for storage. Never on insulation bays between chords.',
      action: 'Ask your framing contractor if storage trusses (raised bottom chord) were specified. Add attic flooring only over designed storage zones.',
    };
  }
  if (issue === 'Sagging truss bottom chord') {
    return {
      level: 'HIGH',
      color: '#FF8C00',
      assessment: 'Bottom chord deflection in DFW homes is often caused by moisture cycling from AC condensation, plumbing leaks above, or overloading. Not always visible until ceiling cracks appear.',
      safe: 'Reduce loads. Investigate moisture source. Do not assume cosmetic.',
      action: 'Roofing + HVAC inspection for leak sources. Engineer assessment if deflection exceeds L/360.',
    };
  }
  return {
    level: 'LOW',
    color: '#00CC66',
    assessment: vintage === 'Pre-1980 (likely rafters)'
      ? 'Pre-1980 DFW homes almost certainly have stick-frame rafters, not trusses. Different rules apply — consult the Rafter Span Guide.'
      : 'No visible truss issues. Continue annual attic inspection, especially after DFW hail or wind events.',
    safe: 'Safe for normal use. Keep attic loads within design limits.',
    action: 'Annual inspection by roofing contractor. Check connector plates for rust after moisture events.',
  };
}

export default function DFWTrussedRoofGuide() {
  const [issue, setIssue] = useState('');
  const [vintage, setVintage] = useState('');
  const result = issue && vintage ? getTrussAssessment(issue, vintage) : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>🏠 DFW Structural Series</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF', marginBottom: 8, lineHeight: 1.2 }}>Trussed Roof Guide for DFW Homes</h1>
        <p style={{ color: '#8899BB', fontSize: 15, marginBottom: 32, lineHeight: 1.6 }}>
          Most DFW homes built after 1980 use engineered trusses. Understanding what you can — and absolutely cannot — do with trusses is critical knowledge for every DFW homeowner.
        </p>

        <div style={{ background: '#FF2222', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 8 }}>🚫 NEVER Cut or Modify a Truss</div>
          <div style={{ fontSize: 14, lineHeight: 1.6 }}>Trusses are precision-engineered load systems. Cutting a web member, notching a chord, or removing any component — even partially — can cause catastrophic failure. This is true even if the modification looks minor. Always consult a structural engineer before any attic modification.</div>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '📅', title: 'DFW Truss Adoption Timeline', body: 'Pre-1980: stick-frame rafters common. 1980–1995: truss adoption grew rapidly. 1996+: virtually all production DFW homes use prefab trusses from manufacturers like Lumber One or Truss Systems.' },
            { icon: '📦', title: 'Attic Storage Rules', body: "Standard trusses allow 10–20 psf on the bottom chord — that's about 1 layer of stored items in designated zones. Storage trusses (raised bottom chord) allow full floor systems. Check your original plans." },
            { icon: '🔧', title: 'When Repair vs Replace', body: 'Minor plate repairs with engineered clips: repair. Cut or cracked chords: usually full truss replacement. Web repairs can sometimes be made with sister members — but only with stamped engineering drawings.' },
          ].map(c => (
            <div key={c.title} style={{ background: '#0F2040', borderRadius: 12, padding: 20, border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6, fontSize: 15 }}>{c.title}</div>
              <div style={{ color: '#8899BB', fontSize: 14, lineHeight: 1.6 }}>{c.body}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 16, padding: 28, border: '1px solid #F5E642' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 20 }}>🔍 Truss Concern Assessment</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', color: '#8899BB', fontSize: 13, marginBottom: 8 }}>What is the truss concern?</label>
            <select value={issue} onChange={e => setIssue(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select concern...</option>
              {trussIssues.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', color: '#8899BB', fontSize: 13, marginBottom: 8 }}>Home vintage</label>
            <select value={vintage} onChange={e => setVintage(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 12px', fontSize: 14 }}>
              <option value="">Select vintage...</option>
              {homeVintages.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          {result && (
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 20, border: `2px solid ${result.color}` }}>
              <div style={{ fontWeight: 800, color: result.color, fontSize: 16, marginBottom: 12 }}>{result.level}</div>
              <div style={{ color: '#E8EDF5', fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>{result.assessment}</div>
              <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 6 }}>🛡 {result.safe}</div>
              <div style={{ color: '#8899BB', fontSize: 13 }}>✅ {result.action}</div>
            </div>
          )}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: '#0F2040', borderRadius: 12, border: '1px solid #1E3A5F' }}>
          <div style={{ color: '#8899BB', fontSize: 12, lineHeight: 1.6 }}>⚠️ Educational only. Structural concerns require a licensed professional. DFW building departments require permits for structural repairs.</div>
        </div>
      </div>
    </div>
  );
}
