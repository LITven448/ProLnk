import { useState } from 'react';

const sidingAges = [
  { range: '0-5 years', tasks: ['Annual visual inspection', 'Check for buckling or gaps', 'Clean with low-pressure wash', 'Inspect caulk at trim seams'] },
  { range: '6-15 years', tasks: ['Check UV fading severity', 'Inspect heat expansion gaps', 'Look for warping near soffit', 'Replace failed caulk joints', 'Check j-channel drainage'] },
  { range: '16-25 years', tasks: ['Full panel replacement eval', 'Check for moisture intrusion', 'Inspect OSB sheathing', 'Consider Hardie upgrade', 'Full color fade assessment', 'Nail hem crack inspection'] },
  { range: '25+ years', tasks: ['Replacement strongly advised', 'Get Hardie board quotes', 'Full moisture barrier check', 'Inspect all penetrations', 'Structural sheathing eval', 'Insurance claim review'] },
];

const facts = [
  { icon: '☀️', title: 'UV Fading', desc: 'DFW UV index causes vinyl fading in 7-10 years — insist on UV-stabilized grade' },
  { icon: '🌡️', title: 'Heat Buckling', desc: 'DFW summer heat causes expansion — improper installation gaps cause buckling' },
  { icon: '🌩️', title: 'Hail Vulnerability', desc: 'Standard vinyl cracks in DFW hail — Class 4 impact-resistant vinyl adds 10-15% cost' },
  { icon: '🏗️', title: 'Hardie vs Vinyl', desc: 'Hardie board costs 20% more upfront but lasts 50 yrs vs 20-25 yrs for vinyl' },
  { icon: '💧', title: 'J-Channel Drainage', desc: 'J-channels must allow water exit — blocked channels cause OSB rot behind siding' },
  { icon: '🔒', title: 'Insurance Impact', desc: 'Class 4 rated vinyl can reduce DFW homeowner insurance premiums 15-25%' },
];

const comparison = [
  { item: 'Lifespan', vinyl: '20-25 years', hardie: '50+ years' },
  { item: 'Hail resistance', vinyl: 'Low (Class 1)', hardie: 'High (Class 4)' },
  { item: 'UV resistance', vinyl: 'Fades in 10 yrs', hardie: 'Paint refresh 15 yrs' },
  { item: 'Maintenance', vinyl: 'Wash yearly', hardie: 'Caulk + paint' },
  { item: 'Install cost', vinyl: '$4-7/sq ft', hardie: '$8-12/sq ft' },
];

export default function DFWVinylSidingHomeGuide2026() {
  const [selectedAge, setSelectedAge] = useState(0);
  const [showCompare, setShowCompare] = useState(false);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Vinyl Siding Home Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>UV fading, heat buckling & hail — what DFW vinyl homeowners must know</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
          {facts.map((f, i) => (
            <div key={i} style={{ background: '#0f2040', borderRadius: 10, padding: 16, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 6, fontSize: 14 }}>{f.title}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: 0 }}>Siding Age → Maintenance Guide</h2>
            <button onClick={() => setShowCompare(!showCompare)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '6px 14px', fontWeight: 700, cursor: 'pointer', fontSize: 12 }}>
              {showCompare ? '📋 Show Checklist' : '⚖️ Compare Materials'}
            </button>
          </div>
          {!showCompare ? (
            <>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                {sidingAges.map((a, i) => (
                  <button key={i} onClick={() => setSelectedAge(i)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13, background: selectedAge === i ? '#F5E642′ : '#1e3a5f', color: selectedAge === i ? '#0A1628' : '#fff' }}>{a.range}</button>
                ))}
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                {sidingAges[selectedAge].tasks.map((t, i) => (
                  <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#F5E642′ }}>✓</span>
                    <span style={{ color: '#e2e8f0', fontSize: 14 }}>{t}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead><tr>
                  <th style={{ color: '#94a3b8', padding: '8px', textAlign: 'left' }}>Feature</th>
                  <th style={{ color: '#F5E642', padding: '8px' }}>Vinyl Siding</th>
                  <th style={{ color: '#F5E642', padding: '8px' }}>Hardie Board</th>
                </tr></thead>
                <tbody>{comparison.map((r, i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e3a5f' }}>
                    <td style={{ padding: '10px 8px', color: '#94a3b8′ }}>{r.item}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'center', color: '#e2e8f0′ }}>{r.vinyl}</td>
                    <td style={{ padding: '10px 8px', textAlign: 'center', color: '#e2e8f0′ }}>{r.hardie}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: 20, background: '#0f2040', borderRadius: 12, border: '1px solid #F5E642′ }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Get Siding Quotes in DFW</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>ProLnk matches you with top-rated siding contractors across the Metroplex</div>
        </div>
      </div>
    </div>
  );
}
