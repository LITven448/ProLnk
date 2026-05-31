import { useState } from 'react';

const decades = [
  { id: '1980s', label: '🏚️ 1980s Build' },
  { id: '1990s', label: '🏠 1990s Build' },
  { id: '2000s', label: '🏡 2000s Build' },
  { id: 'post2015', label: '🔨 Post-2015 Storm-Rebuilt' },
];

const guides: Record<string, { title: string; items: string[] }> = {
  '1980s': {
    title: '1980s Home Storm Resilience Checklist',
    items: [
      '🌪️ Roofs 35+ years old: full replacement likely needed — inspect for hail damage',
      '🔩 Retrofit hurricane straps to rafter connections — critical pre-2000 builds',
      '🪟 Single-pane aluminum windows: replace with impact-rated or add storm film',
      '🧱 Older brick veneer: check mortar joints annually for water infiltration',
      '🌊 Foundation drainage: install channel drains to redirect flash flood runoff',
      '💡 Panel upgrade: 100-amp panels common — upgrade to 200A for storm generators',
    ],
  },
  '1990s': {
    title: '1990s Home Storm Resilience Checklist',
    items: [
      '🛡️ Garage doors are #1 tornado vulnerability — brace kits under $300 available',
      '🏗️ Roof decking: 1990s used staples, not nails — uplift risk in high winds',
      '🌿 Mature tree roots encroach on foundation: inspect and trim every 3 years',
      '🪟 Double-pane windows fogging by now: seal failure — budget for replacement',
      '🔌 GFCI outlets required in wet areas — older homes often lack these',
      '🌧️ Lake clay expansive soil: French drain system crucial post-storm',
    ],
  },
  '2000s': {
    title: '2000s Home Storm Resilience Checklist',
    items: [
      '🌪️ Post-2015 tornado: if unaffected, still inspect for micro-damage yearly',
      '🧲 Metal roofing upgrade: 2000s comp shingles approaching 20-year life',
      '🏠 Engineered lumber used in 2000s: inspect I-joists for moisture damage',
      '🔐 Safe rooms: 2000s homes often lack them — FEMA-rated room adds resale value',
      '🌊 Storm drainage: ensure gutters direct water 6+ ft from foundation',
      '⚡ Whole-home surge protector: protects electronics after storm power spikes',
    ],
  },
  post2015: {
    title: 'Post-2015 Storm-Rebuilt Home Checklist',
    items: [
      '📋 Verify all permits were closed properly — request city records',
      '🏗️ New construction standards (2015 IRC): confirm contractor followed code',
      '🌪️ Newly rebuilt homes should have hurricane straps and impact-rated windows',
      '🧾 Document all work with photos — insurance will require it for future claims',
      '🔒 Safe room addition: FEMA-rated in-ground or above-ground cost $3K–$8K',
      '💧 Sump pump: critical if on Rowlett creek flood plain — test annually',
    ],
  },
};

export default function RowlettHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 24px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌪️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            Rowlett TX Homeowner Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            Lake Ray Hubbard community — storm-resilient homeownership on east Dallas clay
          </p>
        </div>

        <div style={{ background: '#0f2044', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📍 Rowlett Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 14, color: '#cbd5e1' }}>
            <div>🌪️ 2015 EF4 tornado: direct hit on Rowlett</div>
            <div>🌊 Lake Ray Hubbard waterfront access</div>
            <div>🏗️ Homes: 1980s–2000s majority stock</div>
            <div>🗺️ Split county: Dallas + Rockwall jurisdictions</div>
            <div>🧱 Clay soil: Blackland Prairie expands/contracts</div>
            <div>🔨 Post-storm rebuild boom: 2016–2020</div>
          </div>
        </div>

        <h3 style={{ color: '#F5E642', marginBottom: 16, fontSize: 17 }}>Select your home decade for a storm resilience checklist:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {decades.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelected(d.id)}
              style={{
                background: selected === d.id ? '#F5E642' : '#1e3a5f',
                color: selected === d.id ? '#0A1628' : '#fff',
                border: 'none', borderRadius: 10, padding: '14px 12px',
                cursor: 'pointer', fontWeight: 600, fontSize: 14,
              }}
            >
              {d.label}
            </button>
          ))}
        </div>

        {selected && guides[selected] && (
          <div style={{ background: '#0f2044', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>{guides[selected].title}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {guides[selected].items.map((item, i) => (
                <li key={i} style={{ padding: '10px 0', borderBottom: '1px solid #1e3a5f', fontSize: 14, color: '#e2e8f0' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 36, color: '#475569', fontSize: 13 }}>
          🔧 ProLnk connects Rowlett homeowners with storm-rated local contractors
        </div>
      </div>
    </div>
  );
}