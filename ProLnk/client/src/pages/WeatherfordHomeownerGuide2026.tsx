import { useState } from 'react';

const propertyTypes = [
  { id: 'suburban', label: '🏠 Suburban Home', tips: ['Limestone soil drains fast — adjust irrigation schedules vs DFW clay', 'Foundation movement different from clay: less heave, more uniform settling', 'Weatherford avg home age 15-25 yrs — HVAC likely needs service or replacement', 'Hailstorms frequent on western edge — inspect roof post every storm', 'Scorpions more common in limestone areas — seal all entry points'] },
  { id: 'ranchette', label: '🌵 Ranchette/Acreage', tips: ['Well water: test annually for bacteria, nitrates, and total dissolved solids', 'Septic inspection every 3 years, pump every 5 — Parker County has strict enforcement', 'Propane tank sizing: 500 gal min for primary heat; schedule pre-winter fill', 'Fencing: cedar posts in limestone last longer than pine — plan accordingly', 'Burn ban compliance: Parker County active burn bans April-October'] },
  { id: 'new', label: '🏗️ New Construction', tips: ['Builder warranty: document every issue before 1-year walkthrough', 'Caliche subgrade: get foundation inspection in year 2-3 as home settles', 'Irrigation system winterization critical — Weatherford gets hard freezes', 'Check drainage grade away from foundation — limestone-area builders vary', 'Alliance-area growth means supply chain delays for warranty repairs — log early'] },
  { id: 'historic', label: '🏛️ Historic/Downtown', tips: ['Downtown Weatherford homes often pier-and-beam — inspect annually', 'Original plumbing may be cast iron or galvanized — camera scope before issues', 'Historic district permit requirements: verify before any exterior changes', 'Older electrical panels: 60A or 100A — likely need upgrade for modern loads', 'Brick and stone exteriors: repointing every 20-30 years, inspect after freeze'] },
];

export default function WeatherfordHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = propertyTypes.find(p => p.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>
          ProLnk · Parker County · 2026
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
          🌵 Weatherford TX Homeowner Guide
        </h1>
        <p style={{ color: '#8899aa', marginBottom: 32, lineHeight: 1.6 }}>
          Weatherford is the Parker County seat and a fast-growing exurb west of Fort Worth. Limestone soil sets it apart from DFW clay — different foundation behavior, faster drainage, and scorpion territory. Well water and septic are common on ranchettes. Select your property type for Weatherford-specific guidance.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
          {propertyTypes.map(p => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id === selected ? null : p.id)}
              style={{
                background: selected === p.id ? '#F5E642' : '#111f38',
                color: selected === p.id ? '#0A1628' : '#fff',
                border: '2px solid' + (selected === p.id ? ' #F5E642' : ' #1e3a5f'),
                borderRadius: 10, padding: '10px 18px', cursor: 'pointer', fontWeight: 700, fontSize: 15,
                transition: 'all 0.15s',
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#111f38', borderRadius: 14, padding: '24px', borderLeft: '4px solid #F5E642' }}>
            <h2 style={{ color: '#F5E642', marginBottom: 18, fontSize: 20 }}>
              {active.label} — Weatherford Maintenance Guide
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
            <div style={{ fontSize: 48, marginBottom: 12 }}>🌵</div>
            <p>Select your property type above for your Weatherford-specific maintenance guide.</p>
          </div>
        )}

        <div style={{ marginTop: 32, padding: 20, background: '#0d1b2e', borderRadius: 12, fontSize: 13, color: '#8899aa' }}>
          📍 Weatherford TX · Parker County Seat · Pop. 38,000+ · Limestone soil territory · ProLnk verified pros available
        </div>
      </div>
    </div>
  );
}
