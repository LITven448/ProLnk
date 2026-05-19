import { useState } from 'react';

const locations = [
  { id: 'dallas', label: '🏙️ Dallas Core', risk: 'Extreme', pi: '55-70', color: '#ef4444',
    notes: 'Blackland Prairie soil — highest PI in DFW. Homes shift multiple inches seasonally. Mandatory pier and beam or engineered slab.',
    actions: ['Water foundation perimeter 2x/week in dry spells', 'Install soaker hose 18″ from foundation', 'Inspect interior doors every spring/fall', 'Grade soil away from home (6″ over 10 ft)'] },
  { id: 'plano', label: '🏘️ Plano/Allen', risk: 'High', pi: '40-55', color: '#f97316',
    notes: 'Mixed clay — eastern Plano is Blackland, western is Sandy. Know your specific soil type before making repair decisions.',
    actions: ['Water 1-2x/week from May-Oct', 'Mulch beds 3-4 inches to retain moisture', 'Check foundation quarterly', 'Trim trees >20 ft from foundation'] },
  { id: 'fortworth', label: '⭐ Fort Worth West', risk: 'Moderate', pi: '25-40', color: '#F5E642',
    notes: 'Benbrook/Weatherford area transitions to limestone with sandy loam overlay. More stable but still watches out for localized clay pockets.',
    actions: ['Water 1x/week during drought', 'Annual foundation inspection sufficient', 'Standard gutters and grading' ] },
  { id: 'mckinney', label: '🌱 McKinney/Frisco', risk: 'High', pi: '45-60', color: '#f97316',
    notes: 'Collin County Blackland — rapidly developing area. New construction on expansive clay needs 5-10 year monitoring as soil stabilizes.',
    actions: ['Water aggressively first 5 years post-build', 'Foundation warranty critical', 'Avoid large trees within 30 ft', 'Seasonal door/window alignment checks'] },
];

export default function DFWFoundationClaySoilGuide2026() {
  const [selected, setSelected] = useState('dallas');
  const loc = locations.find(l => l.id === selected)!;
  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, letterSpacing: 2, marginBottom: 8 }}>PROLNK · DFW 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>🌍 DFW Clay Soil Complete Guide</h1>
        <p style={{ color: '#94a3b8', marginBottom: 12 }}>Blackland Prairie covers most of DFW. Expansive clay expands when wet and contracts when dry — moving your foundation with it.</p>
        <div style={{ background: '#132035', borderRadius: 10, padding: '12px 16px', marginBottom: 24, fontSize: 14, color: '#94a3b8′ }}>
          📐 <strong style={{ color: '#F5E642′ }}>PI (Plasticity Index)</strong> measures clay expansion risk. PI &gt; 40 = high risk. Most of DFW sits at 40–70.
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
          {locations.map(l => (
            <button key={l.id} onClick={() => setSelected(l.id)}
              style={{ padding: '8px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14,
                background: selected === l.id ? '#F5E642′ : '#1e2d45', color: selected === l.id ? '#0A1628' : '#94a3b8' }}>
              {l.label}
            </button>
          ))}
        </div>
        <div style={{ background: '#132035', borderRadius: 16, padding: '24px', marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700 }}>{loc.label}</h2>
            <span style={{ background: loc.color, color: '#0A1628', fontWeight: 700, fontSize: 13, padding: '4px 12px', borderRadius: 20 }}>
              {loc.risk} Risk · PI {loc.pi}
            </span>
          </div>
          <p style={{ color: '#cbd5e1', marginBottom: 16, lineHeight: 1.6 }}>{loc.notes}</p>
          <h3 style={{ color: '#F5E642', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>🔧 Action Guide</h3>
          {loc.actions.map((a, i) => (
            <div key={i} style={{ padding: '10px 0', borderBottom: i < loc.actions.length - 1 ? '1px solid #1e2d45′ : ’none', color: '#e2e8f0', fontSize: 14 }}>
              ✅ {a}
            </div>
          ))}
        </div>
        <div style={{ background: '#F5E642', borderRadius: 12, padding: '16px 20px', color: '#0A1628′ }}>
          <strong>🏗️ Foundation issue?</strong> ProLnk connects you with DFW-certified foundation specialists who know Blackland Prairie soil.
        </div>
      </div>
    </div>
  );
}