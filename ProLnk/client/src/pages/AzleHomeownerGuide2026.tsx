import { useState } from 'react';

const homeTypes = [
  { id: 'lakearea', label: '⛵ Lake Area Home', tips: ['Dock inspection annually — Eagle Mountain Lake water level fluctuations cause wood stress', 'Boat lift maintenance: grease cables and pulleys every spring', 'Flood zone: verify FEMA map classification and flood insurance coverage', 'Algae and moisture on exterior — power wash and repaint every 3-5 years', 'Shoreline erosion: riprap or seawall inspection required every 2 years'] },
  { id: 'wellwater', label: '💧 Well Water Home', tips: ['Test well water annually: bacteria, nitrates, iron, pH — Azle area has iron issues', 'Pressure tank replacement window: 10-15 years', 'Whole-house water softener ROI high in Azle — mineral buildup destroys appliances', 'Winterize well head and exposed pipes — Parker/Tarrant border gets hard freezes', 'Septic system: inspect every 3 years, pump every 5 — critical for lake-adjacent lots'] },
  { id: 'older', label: '🏠 Older Azle Home', tips: ['Pre-1990 homes: check for galvanized plumbing — replacement is urgent', 'Original electrical: 60A or 100A panels are undersized for modern use', 'Pier-and-beam foundations common — reblock and regrade annually', 'Older HVAC units often oversized for smaller homes — correct sizing on replacement', 'Tree roots and older sewer lines: scope camera inspection every 5 years'] },
  { id: 'newer', label: '🏗️ Newer Build', tips: ['Builder warranty: schedule 11-month inspection to catch all issues', 'New slab on Azle clay — foundation monitoring quarterly for first 3 years', 'Energy audit: some builders skip attic baffles — verify ventilation is correct', 'HOA covenants in newer Azle subdivisions often restrict structures — check before adding', 'Irrigation system check valve required — Azle water district rules vary'] },
];

export default function AzleHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = homeTypes.find(h => h.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>
          ProLnk · Parker/Tarrant County Border · 2026
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
          ⛵ Azle TX Homeowner Guide
        </h1>
        <p style={{ color: '#8899aa', marginBottom: 32, lineHeight: 1.6 }}>
          Azle straddles the Parker-Tarrant county line near Eagle Mountain Lake. The community blends lake homes with rural character and aging stock — well water is common, dock maintenance matters, and contractor availability is thinner than inner-ring suburbs. Select your home type for an Azle-specific checklist.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
          {homeTypes.map(h => (
            <button
              key={h.id}
              onClick={() => setSelected(h.id === selected ? null : h.id)}
              style={{
                background: selected === h.id ? '#F5E642' : '#111f38',
                color: selected === h.id ? '#0A1628' : '#fff',
                border: '2px solid' + (selected === h.id ? ' #F5E642' : ' #1e3a5f'),
                borderRadius: 10, padding: '10px 18px', cursor: 'pointer', fontWeight: 700, fontSize: 15,
                transition: 'all 0.15s',
              }}
            >
              {h.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#111f38', borderRadius: 14, padding: '24px', borderLeft: '4px solid #F5E642' }}>
            <h2 style={{ color: '#F5E642', marginBottom: 18, fontSize: 20 }}>
              {active.label} — Azle Maintenance Checklist
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {active.tips.map((tip, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < active.tips.length - 1 ? '1px solid #1e3a5f' : 'none' }}>
                  <span style={{ color: '#F5E642', fontSize: 18, minWidth: 24 }}>✓</span>
                  <span style={{ color: '#ccd9e8', lineHeight: 1.5 }}>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!active && (
          <div style={{ background: '#111f38', borderRadius: 14, padding: '32px', textAlign: 'center', color: '#8899aa' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>⛵</div>
            <p>Select your home type above to see your personalized Azle maintenance checklist.</p>
          </div>
        )}

        <div style={{ marginTop: 32, padding: 20, background: '#0d1b2e', borderRadius: 12, fontSize: 13, color: '#8899aa' }}>
          📍 Azle TX · Parker/Tarrant County Border · Pop. 15,000+ · Eagle Mountain Lake community · ProLnk verified pros available
        </div>
      </div>
    </div>
  );
}
