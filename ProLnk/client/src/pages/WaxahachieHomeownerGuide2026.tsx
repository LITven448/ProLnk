import { useState } from 'react';

const eras = [
  { id: 'pre1950', label: '🏛️ Pre-1950 Historic' },
  { id: 'mid', label: '🏠 1950s–1990s' },
  { id: 'new', label: '🏗️ 2000s–2020s Subdivision' },
  { id: 'acreage', label: '🌾 Rural / Acreage Home' },
];

const guides: Record<string, { title: string; items: string[] }> = {
  pre1950: {
    title: 'Pre-1950 Historic Waxahachie Home Guide',
    items: [
      '🏛️ Victorian millwork: use specialty contractors — standard lumber stores won’t match profiles',
      '🔲 Original wood windows: restore rather than replace to preserve historic character',
      '🧱 Brick foundation piers: annual inspection for mortar loss and settling',
      '🔌 Knob-and-tube wiring: hire licensed electrician — insurance may require replacement',
      '🚿 Cast iron plumbing: camera scope every 5 years for corrosion and root intrusion',
      '🎨 Historic district rules: Ellis County HD Commission approval required for exterior changes',
    ],
  },
  mid: {
    title: '1950s–1990s Waxahachie Home Guide',
    items: [
      '🔌 Federal Pacific or Zinsco panels: known fire risk — replace immediately',
      '🪟 Single-pane jalousie or aluminum windows: replace for energy savings',
      '🧱 Pier-and-beam foundations common: annual inspection under-home for moisture',
      '🌿 Mature elm and oak roots: camera scope sewer lines every 5 years',
      '🛁 Galvanized supply lines: replace with PEX if discolored water appears',
      '🌬️ Attic insulation: R-38+ recommended — older homes often have R-11 or less',
    ],
  },
  new: {
    title: '2000s–2020s Subdivision Home Guide',
    items: [
      '🧱 Ellis County clay: post-tension slabs — avoid watering lawn within 3 ft of foundation',
      '🏘️ New HOA subdivisions: review deed restrictions before landscaping or additions',
      '🌬️ HVAC: high-efficiency 2-stage systems — calibrate spring and fall',
      '🌿 Irrigation systems: install rain sensors to comply with Ellis County water rules',
      '🔩 Builder grade fixtures: replace faucets, door hardware, and light fixtures at year 10',
      '📋 Permits: verify all rooms in listing are permitted — unpermitted additions cause title issues',
    ],
  },
  acreage: {
    title: 'Waxahachie Rural / Acreage Home Guide',
    items: [
      '💧 Well water: test annually for coliform, nitrates, and arsenic (Ellis County known)',
      '🚽 Aerobic septic: Ellis County standard — inspect spray heads and compressor quarterly',
      '⛽ Propane service: compare bulk suppliers annually — Trinity, AmeriGas, Ferrellgas',
      '🌾 Ag exemption: document livestock, hay, or wildlife management for appraisal district',
      '🛤️ Caliche or concrete drives: grade low spots after spring rains to prevent wash',
      '🔥 Burn bans: Ellis County burn bans enforced May–October — know current status',
    ],
  },
};

export default function WaxahachieHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 24px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏛️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            Waxahachie TX Homeowner Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            Ellis County seat — Victorian historic homes to modern acreage estates
          </p>
        </div>

        <div style={{ background: '#0f2044', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📍 Waxahachie Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 14, color: '#cbd5e1' }}>
            <div>🏛️ Ellis County seat since 1850</div>
            <div>🎨 Victorian architecture: gingerbread district nationally known</div>
            <div>🏗️ New subdivisions: south and east of downtown</div>
            <div>🌾 Rural character: acreage lots and farm-to-market roads</div>
            <div>🎪 Scarborough Renaissance Festival: major annual event</div>
            <div>🧱 Soil: expansive Blackland Prairie clay throughout</div>
          </div>
        </div>

        <h3 style={{ color: '#F5E642', marginBottom: 16, fontSize: 17 }}>Select your home era for a Waxahachie maintenance guide:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {eras.map((e) => (
            <button
              key={e.id}
              onClick={() => setSelected(e.id)}
              style={{
                background: selected === e.id ? '#F5E642' : '#1e3a5f',
                color: selected === e.id ? '#0A1628' : '#fff',
                border: 'none', borderRadius: 10, padding: '14px 12px',
                cursor: 'pointer', fontWeight: 600, fontSize: 14,
              }}
            >
              {e.label}
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
          🔧 ProLnk connects Waxahachie homeowners with specialty-certified local pros
        </div>
      </div>
    </div>
  );
}