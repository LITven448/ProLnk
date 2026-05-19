import { useState } from 'react';

const homeEras = [
  { id: '1900s-1930s', label: '🏛️ 1900s–1930s Home', tips: ['Knob-and-tube wiring likely present — full electrical audit before any renovation', 'Original plaster walls: avoid demo without moisture mapping first', 'Historic overlay may require Commission approval for exterior changes'] },
  { id: '1940s-1960s', label: '🏠 1940s–1960s Home', tips: ['Check for asbestos in floor tiles, pipe insulation, and popcorn ceilings', 'Cast iron drain lines common — camera inspect before purchasing', 'Single-pane windows drive energy loss; upgrade eligible for McKinney rebates'] },
  { id: '1970s-1990s', label: '🔧 1970s–1990s Renovation', tips: ['Polybutylene pipes used 1978–1995 — replace proactively to prevent failure', 'HVAC from this era often undersized for today — load calc recommended', 'Attic insulation likely R-11 or less; upgrade to R-38 for code compliance'] },
];

const historicDistrictFacts = [
  'McKinney Historic District covers the 1800s courthouse square and surrounding blocks',
  'COA (Certificate of Appropriateness) required for most exterior modifications',
  'Renovation market is strong — comps show 15-22% premium for restored historics',
  'Collin County seat status brings stable municipal services and funding',
];

export default function DFWMcKinneyHistoricGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = homeEras.find(e => e.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8 }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>McKINNEY · HISTORIC DOWNTOWN · 2026</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '12px 0 6px' }}>🏛️ McKinney Historic District Guide</h1>
        <p style={{ color: '#8899aa', marginBottom: 28 }}>Collin County seat · Vibrant historic square · 1900s–1960s homes · Strong renovation market</p>

        <div style={{ background: '#0d1f38', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 14 }}>📍 District Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[{ icon: '📅', label: 'Home Era', val: '1900s–1960s' }, { icon: '🏛️', label: 'Overlay', val: 'Historic District' }, { icon: '📈', label: 'Reno Premium', val: '15–22%' }, { icon: '🔧', label: 'Infrastructure', val: 'Older Systems' }].map(s => (
              <div key={s.label} style={{ background: '#162236', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ fontSize: 20 }}>{s.icon}</div>
                <div style={{ fontSize: 11, color: '#8899aa', marginTop: 4 }}>{s.label}</div>
                <div style={{ fontWeight: 700, marginTop: 2 }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0d1f38', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 14 }}>🔍 Select Your Home Era</h2>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
            {homeEras.map(e => (
              <button key={e.id} onClick={() => setSelected(e.id === selected ? null : e.id)}
                style={{ background: selected === e.id ? '#F5E642' : '#162236', color: selected === e.id ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}>
                {e.label}
              </button>
            ))}
          </div>
          {active && (
            <div style={{ background: '#162236', borderRadius: 10, padding: 16 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 14 }}>{active.label} — Owner Guide</h3>
              {active.tips.map((t, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <span style={{ color: '#F5E642' }}>✓</span>
                  <span style={{ color: '#ccd6e0', fontSize: 14 }}>{t}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0d1f38', borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 16, color: '#F5E642', marginBottom: 14 }}>📜 Historic District Key Facts</h2>
          {historicDistrictFacts.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <span style={{ color: '#F5E642' }}>→</span>
              <span style={{ color: '#ccd6e0', fontSize: 14 }}>{f}</span>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#445566', fontSize: 12, marginTop: 32 }}>ProLnk · McKinney Historic District · 2026</p>
      </div>
    </div>
  );
}
