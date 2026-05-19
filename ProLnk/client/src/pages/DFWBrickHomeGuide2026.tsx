import { useState } from 'react';

const brickAges = [
  { range: '0-10 years', tasks: ['Inspect mortar joints annually', 'Check weep holes clear', 'Clean with mild detergent', 'Seal expansion joints'] },
  { range: '11-25 years', tasks: ['Professional mortar inspection', 'Tuckpointing where needed', 'Check for efflorescence', 'Inspect lintel steel', 'Repoint failed joints'] },
  { range: '26-40 years', tasks: ['Full tuckpointing assessment', 'Lintel replacement eval', 'Brick spalling check', 'Foundation crack survey', 'Flashing inspection', 'Chimney repointing'] },
  { range: '40+ years', tasks: ['Structural engineer consult', 'Full mortar replacement', 'Brick veneer anchors', 'Chimney rebuild eval', 'Window surround repointing', 'Professional acid wash'] },
];

const brickFacts = [
  { icon: '🧱', title: '70%+ DFW Homes', desc: 'Brick dominates DFW housing stock — hail resistance & low exterior maintenance drive adoption' },
  { icon: '🌧️', title: 'Weep Holes Critical', desc: 'Weep holes at base courses allow moisture to drain — blocked weeps cause wall moisture damage' },
  { icon: '🔧', title: 'Mortar Joint Life', desc: 'Mortar lasts 25-30 years in DFW heat cycles — tuckpointing before failure prevents brick damage' },
  { icon: '🌡️', title: 'Heat Expansion', desc: 'DFW summer heat causes brick expansion — expansion joints every 20 ft prevent cracking' },
  { icon: '🧹', title: 'Annual Cleaning', desc: 'Pressure wash at 500-800 PSI max — high pressure destroys mortar joints over time' },
  { icon: '🏠', title: 'Efflorescence', desc: 'White mineral deposits signal moisture intrusion — treat source before cosmetic cleanup' },
];

export default function DFWBrickHomeGuide2026() {
  const [selectedAge, setSelectedAge] = useState(0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🧱</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Brick Home Maintenance Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>70%+ of DFW homes are brick — here's how to protect your investment</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 40 }}>
          {brickFacts.map((f, i) => (
            <div key={i} style={{ background: '#0f2040', borderRadius: 10, padding: 16, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6, fontSize: 14 }}>{f.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 16px' }}>🔍 Brick Home Age → Maintenance Checklist</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {brickAges.map((a, i) => (
              <button key={i} onClick={() => setSelectedAge(i)} style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: selectedAge === i ? '#F5E642′ : '#1e3a5f', color: selectedAge === i ? '#0A1628' : '#fff' }}>{a.range}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            {brickAges[selectedAge].tasks.map((t, i) => (
              <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ color: '#F5E642', fontSize: 16 }}>✓</span>
                <span style={{ color: '#e2e8f0', fontSize: 14 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#0f2040', borderRadius: 12, border: '1px solid #F5E642′ }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Need a Brick Specialist in DFW?</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>ProLnk connects you with vetted masonry pros across the Metroplex</div>
        </div>
      </div>
    </div>
  );
}
