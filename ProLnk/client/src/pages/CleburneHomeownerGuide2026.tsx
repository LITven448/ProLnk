import { useState } from 'react';

const homeEras = [
  { id: 'pre1950', label: '🏛️ Pre-1950', tips: ['Knob-and-tube or aluminum wiring likely — full electrical audit required', 'Cast iron drain lines corroding — camera inspection before issues show', 'Lead paint: assume present, test before any sanding or renovation', 'Pier-and-beam foundation: recheck annually, regrade every 5 years', 'Chimney repointing often needed — downtown Cleburne freeze-thaw cycles'] },
  { id: '1950to1980', label: '🏠 1950–1980', tips: ['Galvanized steel pipes: 50-70 year lifespan — replacement window now', '200A panel upgrade likely needed for modern loads', 'Asbestos possible in floor tile, insulation, and roof shingles — test first', 'Original windows single-pane — replace for 20-30% heating savings', 'Sewer line tree root intrusion common — video inspection every 5 years'] },
  { id: '1980to2000', label: '🏡 1980–2000', tips: ['HVAC likely at or past end of life (15-20 yr avg) — budget $8-12K', 'Polybutylene plumbing: failure-prone, check for grey pipes in walls', 'Roof at replacement age if original — inspect before next storm season', 'Wood decks often need replacing — treat or replace before summer', 'Foundation warranty expired — get pro evaluation if any settling visible'] },
  { id: 'post2000', label: '🏗️ 2000+', tips: ['Check for recall notices on HVAC brands common in early 2000s builds', 'Water heater at replacement age (10-15 yrs) — consider tankless upgrade', 'Roof still likely good but inspect after any hail event', 'Smart thermostat ROI is high in Johnson County climate extremes', 'Review and renew termite bond — Cleburne soil is active termite territory'] },
];

export default function CleburneHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = homeEras.find(e => e.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>
          ProLnk · Johnson County Seat · 2026
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
          🏛️ Cleburne TX Homeowner Guide
        </h1>
        <p style={{ color: '#8899aa', marginBottom: 32, lineHeight: 1.6 }}>
          Cleburne is the historic county seat of Johnson County with a large stock of pre-1970 homes downtown and newer subdivisions on the outskirts. Older homes here often have original plumbing and electrical, and the rural service area means fewer contractors compete for your business. Select your home era for targeted priorities.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
          {homeEras.map(e => (
            <button
              key={e.id}
              onClick={() => setSelected(e.id === selected ? null : e.id)}
              style={{
                background: selected === e.id ? '#F5E642′ : '#111f38',
                color: selected === e.id ? '#0A1628′ : '#fff',
                border: '2px solid' + (selected === e.id ? ' #F5E642′ : ' #1e3a5f'),
                borderRadius: 10, padding: '10px 18px', cursor: 'pointer', fontWeight: 700, fontSize: 15,
                transition: 'all 0.15s',
              }}
            >
              {e.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#111f38', borderRadius: 14, padding: '24px', borderLeft: '4px solid #F5E642′ }}>
            <h2 style={{ color: '#F5E642', marginBottom: 18, fontSize: 20 }}>
              {active.label} — Cleburne Maintenance Priorities
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
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏛️</div>
            <p>Select your home era above to see Cleburne-specific maintenance priorities.</p>
          </div>
        )}

        <div style={{ marginTop: 32, padding: 20, background: '#0d1b2e', borderRadius: 12, fontSize: 13, color: '#8899aa' }}>
          📍 Cleburne TX · Johnson County Seat · Pop. 32,000+ · High % pre-1970 homes downtown · ProLnk verified pros available
        </div>
      </div>
    </div>
  );
}
