import { useState } from 'react';

const yearsOptions = [
  { id: 'new', label: '🔑 0–2 Years', tips: ['Foundation is still settling — monitor for cracks at door frames and slab edges', 'Submit builder warranty claims NOW — most issues must be filed within year 1', 'Irrigation: verify head coverage and check for builder installation shortcuts', 'HVAC commissioning check: confirm airflow is balanced across all rooms', 'Grading inspection: Alliance-area new builds often have insufficient slope away from foundation'] },
  { id: 'early', label: '🏡 3–7 Years', tips: ['Builder warranty is expired — switch to annual professional home inspection', 'Roof at mid-life: document any hail events and file insurance claims promptly', 'Concrete driveway and sidewalk: first crack repairs are cheaper than full replacement', 'HOA landscaping maturity: trees planted at build are now stressing irrigation zones', 'Smart home device battery backup: Haslet power flickers during Alliance storms'] },
  { id: 'mid', label: '🏠 8–14 Years', tips: ['Water heater at or approaching replacement window (10-15 yrs) — consider tankless', 'HVAC first major service: check refrigerant, coil cleaning, capacitor replacement', 'Master-planned community amenity fees: verify HOA is solvent and reserves are funded', 'Fence: HOA-standard cedar is at 10-12 year life in North Texas sun and rain', 'Garage door springs: typical 7-10 year life on high-use doors'] },
  { id: 'established', label: '🌳 15+ Years', tips: ['HVAC full replacement window: budget $9-14K for Haslet home sizing', 'Roof at end of warranted life — insurance may require replacement before renewing', 'Tree root and slab: mature landscaping trees create foundation risk — assess proximity', 'Alliance Airport growth = ongoing low-frequency vibration — inspect slab annually', 'Whole-home electrical audit: verify panel capacity and AFCI/GFCI code compliance'] },
];

export default function HasletHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = yearsOptions.find(y => y.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase' }}>
          ProLnk · North Tarrant · Alliance Corridor · 2026
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
          ✈️ Haslet TX Homeowner Guide
        </h1>
        <p style={{ color: '#8899aa', marginBottom: 32, lineHeight: 1.6 }}>
          Haslet is one of the fastest-growing cities in North Tarrant County, driven by Alliance Airport employment and a wave of master-planned communities built 2015–2026. New construction dominates, but foundations are still settling on many lots and builder warranty clocks are ticking. Select your years in home for targeted Haslet guidance.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
          {yearsOptions.map(y => (
            <button
              key={y.id}
              onClick={() => setSelected(y.id === selected ? null : y.id)}
              style={{
                background: selected === y.id ? '#F5E642′ : '#111f38',
                color: selected === y.id ? '#0A1628′ : '#fff',
                border: '2px solid' + (selected === y.id ? ' #F5E642′ : ' #1e3a5f'),
                borderRadius: 10, padding: '10px 18px', cursor: 'pointer', fontWeight: 700, fontSize: 15,
                transition: 'all 0.15s',
              }}
            >
              {y.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#111f38', borderRadius: 14, padding: '24px', borderLeft: '4px solid #F5E642′ }}>
            <h2 style={{ color: '#F5E642', marginBottom: 18, fontSize: 20 }}>
              {active.label} — Haslet Maintenance Checklist
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
            <div style={{ fontSize: 48, marginBottom: 12 }}>✈️</div>
            <p>Select how long you have been in your home to see your Haslet-specific maintenance checklist.</p>
          </div>
        )}

        <div style={{ marginTop: 32, padding: 20, background: '#0d1b2e', borderRadius: 12, fontSize: 13, color: '#8899aa' }}>
          📍 Haslet TX · North Tarrant County · Alliance Airport corridor · New construction boom 2015-2026 · ProLnk verified pros available
        </div>
      </div>
    </div>
  );
}
