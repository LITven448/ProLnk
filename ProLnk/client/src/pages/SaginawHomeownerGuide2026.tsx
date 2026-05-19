import { useState } from 'react';

const homeDecades = [
  { id: '1990s', label: '🏠 1990s Build', tips: ['HVAC at or past end of life — budget $8-12K for full replacement', 'Polybutylene plumbing: grey pipes, failure-prone — inspect for signs of seeping', 'Roof likely at 25-30 years — inspect before storm season, insurance may require replacement', 'Original water heater long gone — if replaced once, check age of current unit', 'Alliance corridor industrial growth = more heavy trucks on local roads = more foundation vibration'] },
  { id: '2000s', label: '🏡 2000s Build', tips: ['Water heater at 15-20 yrs — tankless upgrade ROI is strong in Saginaw utility rates', 'HVAC: R-22 refrigerant units should be replaced — R-22 is phased out', 'Slab foundation on North Tarrant clay — watch for sticking doors after wet-dry cycles', 'Roof at 15-20 yrs: have it inspected before next insurance renewal', 'Fence boards at end of life in many 2000s builds — privacy fence replacement costs $15-25/linear ft'] },
  { id: '2010s', label: '🏗️ 2010s Build', tips: ['Foundation still in active settling phase — recheck grade and drainage annually', 'Builder-grade HVAC often undersized — verify load calculation matches actual sqft', 'Smart irrigation controller: Saginaw water district tier pricing makes savings easy', 'Check attic insulation: some 2010s builders skipped baffles — verify ventilation', 'HOA compliance: Saginaw near Alliance has active HOAs — review exterior rules'] },
  { id: 'pre1990s', label: '🏛️ Pre-1990s', tips: ['Older Saginaw homes may have galvanized drain lines — scope before issues arise', '100A panel: undersized for modern loads — upgrade budget $3-5K', 'Original windows likely single-pane — replacement adds value and comfort', 'Crawl spaces in older NE Tarrant homes: moisture barrier and vent inspection annually', 'HVAC replacement: move registers for modern open floor plan if reconfiguring'] },
];

export default function SaginawHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = homeDecades.find(d => d.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>
          ProLnk · North Tarrant County · 2026
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
          🏘️ Saginaw TX Homeowner Guide
        </h1>
        <p style={{ color: '#8899aa', marginBottom: 32, lineHeight: 1.6 }}>
          Saginaw is a north Tarrant suburb built primarily in the 1990s-2010s, close to the Alliance employment corridor. Slab foundations on clay soil are standard, and HVAC systems in older builds are at or past replacement age. Industrial traffic near Alliance adds vibration stress on infrastructure. Select your home decade for targeted guidance.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
          {homeDecades.map(d => (
            <button
              key={d.id}
              onClick={() => setSelected(d.id === selected ? null : d.id)}
              style={{
                background: selected === d.id ? '#F5E642' : '#111f38',
                color: selected === d.id ? '#0A1628' : '#fff',
                border: '2px solid' + (selected === d.id ? ' #F5E642' : ' #1e3a5f'),
                borderRadius: 10, padding: '10px 18px', cursor: 'pointer', fontWeight: 700, fontSize: 15,
                transition: 'all 0.15s',
              }}
            >
              {d.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#111f38', borderRadius: 14, padding: '24px', borderLeft: '4px solid #F5E642' }}>
            <h2 style={{ color: '#F5E642', marginBottom: 18, fontSize: 20 }}>
              {active.label} — Saginaw Maintenance Guide
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
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏘️</div>
            <p>Select your home decade above to see your Saginaw maintenance guide.</p>
          </div>
        )}

        <div style={{ marginTop: 32, padding: 20, background: '#0d1b2e', borderRadius: 12, fontSize: 13, color: '#8899aa' }}>
          📍 Saginaw TX · North Tarrant County · Pop. 27,000+ · Alliance Corridor adjacent · ProLnk verified pros available
        </div>
      </div>
    </div>
  );
}
