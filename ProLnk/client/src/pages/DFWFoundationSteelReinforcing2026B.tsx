import { useState } from 'react';

const questions = [
  { q: 'What grade rebar is standard in DFW residential foundations today', a: 'Grade 60 (ASTM A615 or A706) is the current DFW residential standard. 60,000 PSI yield strength. Required by most DFW engineering specifications since the 1990s. If your builder spec sheet says Grade 40, push back — it is an older, weaker standard no longer appropriate for DFW expansive soil conditions.' },
  { q: 'My foundation has Grade 40 rebar — is it deficient', a: 'Grade 40 (40,000 PSI yield) was the code-minimum standard for decades and remains technically compliant in some jurisdictions. However, Grade 60 provides 50% more yield strength for similar cost. If your foundation was designed around Grade 40 spacing and cover, switching to Grade 60 at the same layout is a meaningful upgrade. Check your engineering plans for the grade specified.' },
  { q: 'Should I request epoxy-coated rebar for my DFW foundation', a: 'Epoxy coating is not standard in DFW residential construction and is generally unnecessary. DFW soils are not chloride-rich marine environments. Epoxy provides marginal benefit vs cost premium (15-25% more expensive). Focus instead on: proper concrete cover (3 inches minimum at bottom), Grade 60 rebar, and good curing practices. Epoxy is more relevant for DFW bridge decks and parking structures.' },
  { q: 'My contractor proposed fiber reinforcement — does that replace rebar', a: 'No — fibers supplement rebar, they do not replace it. Synthetic (polypropylene) or steel fibers reduce plastic shrinkage cracking during curing and improve post-crack ductility, but they do not provide the structural tensile capacity of deformed rebar. For PT slabs, fibers are sometimes added as a secondary reinforcement. Never accept fiber as a substitute for specified rebar.' },
  { q: 'How close should rebar be to the bottom of my slab', a: 'Minimum 3 inches of concrete cover at the bottom of a DFW residential slab-on-grade. This protects rebar from moisture migration through the slab and from expansive soil contact. Chairs (plastic or metal spacers) must maintain this clearance. Inspectors check for chair presence before pour — no chairs means rebar may be resting on the grade beam forms.' },
];

export default function DFWFoundationSteelReinforcing2026B() {
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const toggle = (i: number) => setOpen(prev => ({ ...prev, [i]: !prev[i] }));

  const grades = [
    { grade: 'Grade 40', psi: '40,000 PSI yield', color: '#ef4444', era: 'Pre-1990s DFW', use: 'Legacy only — avoid for new construction' },
    { grade: 'Grade 60', psi: '60,000 PSI yield', color: '#22c55e', era: 'Current DFW standard', use: 'All new residential foundations' },
    { grade: 'Grade 80', psi: '80,000 PSI yield', color: '#3b82f6', era: 'Commercial / heavy', use: 'Not typical in DFW residential' },
    { grade: 'Epoxy-Coated', psi: 'Grade 60 base', color: '#a855f7', era: 'Marine/industrial', use: 'DFW bridge decks, not homes' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔩</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>DFW Foundation Steel Reinforcing Grade Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Rebar grades used in DFW construction — Part 2: Grade selection and specifications</p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 28, border: '1px solid #2d5a8e' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📊 DFW Rebar Grade Comparison</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {grades.map((g, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '14px 16px', border: '1px solid #2d5a8e', display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ minWidth: 100 }}>
                  <div style={{ color: g.color, fontWeight: 800, fontSize: 15 }}>{g.grade}</div>
                  <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700 }}>{g.psi}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#94a3b8', fontSize: 12 }}>Era: {g.era}</div>
                  <div style={{ color: '#cbd5e1', fontSize: 14 }}>{g.use}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, marginBottom: 28, border: '1px solid #2d5a8e' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 8 }}>🏗️ DFW Residential Rebar Standards</h2>
          <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            Most DFW foundation engineers specify #4 rebar (0.5-inch diameter) at 18-24 inch on-center spacing, Grade 60. PT slabs use rebar primarily in the grade beam (perimeter and interior beams) with PT cables providing the main tensile resistance in the slab field. Conventional (non-PT) slabs need more rebar — typically #4 at 12-18 inches both ways. DFW soil movement requires rebar to be continuous — no splices shorter than 30 bar diameters (15 inches for #4).
          </p>
        </div>

        <div style={{ background: '#1e3a5f', borderRadius: 12, padding: 20, border: '1px solid #2d5a8e' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>🏠 My Foundation Rebar Question</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {questions.map((q, i) => (
              <div key={i}>
                <button onClick={() => toggle(i)} style={{ width: '100%', textAlign: 'left', background: open[i] ? '#0d2137′ : '#0A1628', border: '1px solid', borderColor: open[i] ? '#F5E642' : '#2d5a8e', borderRadius: 8, padding: '12px 16px', color: open[i] ? '#F5E642' : '#cbd5e1', cursor: ’pointer', fontSize: 14, fontWeight: open[i] ? 700 : 400, display: 'flex', justifyContent: 'space-between' }}>
                  {q.q} <span>{open[i] ? '▲' : '▼'}</span>
                </button>
                {open[i] && <div style={{ background: '#0d2137', border: '1px solid #F5E642', borderTop: 'none', borderRadius: '0 0 8px 8px', padding: '14px 16px', color: '#e2e8f0', fontSize: 14, lineHeight: 1.7 }}>{q.a}</div>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 24, color: '#64748b', fontSize: 12 }}>
          ProLnk DFW Foundation Guide 2026 · prolnk.io
        </div>
      </div>
    </div>
  );
}
