import { useState } from 'react';

const homeTypes = [
  { id: 'lakefront', label: '🚤 Lakefront / Dock Property' },
  { id: 'subdivision', label: '🏘️ HOA Subdivision' },
  { id: 'custom', label: '🏡 Custom / Estate Home' },
  { id: 'townhome', label: '🏠 Townhome / Patio Home' },
];

const guides: Record<string, { title: string; items: string[] }> = {
  lakefront: {
    title: 'Lakefront & Dock Maintenance',
    items: [
      '🔩 Inspect dock hardware, cleats, and decking annually before summer',
      '🧱 Check seawall for erosion, cracks, and soil undercutting every spring',
      '🐚 Remove zebra mussels and aquatic growth from pilings quarterly',
      '💧 Maintain sump pumps and French drains on sloped lake-facing lots',
      '🎣 Keep boat lift cables, bunks, and motors serviced before Memorial Day',
      '🌿 Shoreline erosion control: native plantings stabilize banks naturally',
    ],
  },
  subdivision: {
    title: 'HOA Subdivision Compliance & Maintenance',
    items: [
      '📋 Review HOA architectural guidelines before any exterior modification',
      '🌳 Tree trimming near power lines — submit HOA request 30 days ahead',
      '🚗 Driveway sealing required every 2-3 years per most Rockwall HOAs',
      '🎨 Approved exterior paint palette — submit color approval before painting',
      '🏊 Community pool season opens May 1 — schedule pool fence inspection',
      '🌧️ Rockwall clay soil shifts: check foundation twice yearly',
    ],
  },
  custom: {
    title: 'Custom & Estate Home Maintenance',
    items: [
      '🏗️ Larger square footage = more HVAC zones — service all units spring/fall',
      '💡 Whole-home generator testing monthly; transfer switch serviced annually',
      '🔒 Security system cameras and sensors: test and update firmware quarterly',
      '🪟 Custom window seals fail by year 10-15 — watch for fogging between panes',
      '🌊 Lake-adjacent estates: humidity control critical; check crawl space annually',
      '🛣️ Private drive maintenance: seal coat and crack fill every 3 years',
    ],
  },
  townhome: {
    title: 'Townhome & Patio Home Upkeep',
    items: [
      '🔇 Party wall inspections — check for moisture intrusion at shared walls',
      '🌬️ HVAC units often rooftop — ensure HOA handles or clarify responsibility',
      '🪣 Private patio drainage — ensure no pooling against foundation',
      '📦 Storage unit roof seals — often owner responsibility, check lease terms',
      '🔥 Shared chimney systems require annual inspection per fire code',
      '📡 Fiber and cable conduit: confirm HOA policy before drilling exterior',
    ],
  },
};

export default function RockwallHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 24px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏡</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            Rockwall TX Homeowner Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            Texas's smallest county — Lake Ray Hubbard waterfront living east of Dallas
          </p>
        </div>

        <div style={{ background: '#0f2044', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📍 Rockwall County Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 14, color: '#cbd5e1′ }}>
            <div>🏙️ County seat: Rockwall city</div>
            <div>🌊 Lake Ray Hubbard: 22,745 acres</div>
            <div>🏗️ Homes: Mostly 1990s–2020s builds</div>
            <div>📈 Fastest-growing county in Texas (per capita)</div>
            <div>🏘️ HOA coverage: 70%+ of subdivisions</div>
            <div>🧱 Soil: Blackland Prairie clay — seasonal shifting</div>
          </div>
        </div>

        <h3 style={{ color: '#F5E642', marginBottom: 16, fontSize: 17 }}>Select your home type for a tailored guide:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {homeTypes.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              style={{
                background: selected === t.id ? '#F5E642′ : '#1e3a5f',
                color: selected === t.id ? '#0A1628′ : '#fff',
                border: 'none', borderRadius: 10, padding: '14px 12px',
                cursor: 'pointer', fontWeight: 600, fontSize: 14,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {selected && guides[selected] && (
          <div style={{ background: '#0f2044', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#F5E642', marginBottom: 16 }}>{guides[selected].title}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {guides[selected].items.map((item, i) => (
                <li key={i} style={{ padding: '10px 0', borderBottom: '1px solid #1e3a5f', fontSize: 14, color: '#e2e8f0′ }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 36, color: '#475569', fontSize: 13 }}>
          🔧 ProLnk connects Rockwall homeowners with vetted local pros
        </div>
      </div>
    </div>
  );
}