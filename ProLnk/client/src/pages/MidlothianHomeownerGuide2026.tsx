import { useState } from 'react';

const propertyTypes = [
  { id: 'suburban', label: '🏘️ Suburban Subdivision' },
  { id: 'acreage', label: '🌾 Acreage / Rural Property' },
  { id: 'new', label: '🏗️ New Build (2015–2026)' },
  { id: 'commercial', label: '🏭 Near Industrial Zone' },
];

const guides: Record<string, { title: string; items: string[] }> = {
  suburban: {
    title: 'Midlothian Suburban Maintenance Needs',
    items: [
      '🧱 Ellis County clay: pier and beam or post-tension slab — inspect twice yearly',
      '🌬️ South wind corridor: HVAC systems work harder — service in March and October',
      '🌳 New-growth trees: stake and prune for first 3 years post-planting',
      '🚗 Subdivision roads may be HOA-managed — confirm before calling city',
      '🔌 City utilities: Midlothian MUD or city water — know your provider',
      '🏊 Pool permits: Ellis County requires permits for in-ground pools over 24 inches',
    ],
  },
  acreage: {
    title: 'Midlothian Acreage Property Maintenance',
    items: [
      '💧 Well water: test annually for nitrates, bacteria, and hardness minerals',
      '🚽 Septic system: Ellis County standard is aerobic septic — inspect annually',
      '⛽ Propane: 250–500 gallon tank standard — fill in October before price spikes',
      '🌾 Ag exemption maintenance: must maintain bona fide agricultural use to keep',
      '🦟 Pond and tank mosquito control: stock with Gambusia fish or treat with Bti',
      '🛤️ Caliche driveways: regrade and top-dress after heavy rains in spring',
    ],
  },
  new: {
    title: 'New Construction (2015–2026) Maintenance',
    items: [
      '📋 Builder warranty: 1 year cosmetic, 2 year systems, 10 year structural — act fast',
      '🧱 Foundation settling: monitor door frames and tile grout first 5 years',
      '🌱 Landscaping establishment: deep soak 2x weekly for 2 summers post-install',
      '🌬️ HVAC zoning: calibrate thermostat zones each season for efficiency',
      '🔩 Fence posts on clay: reset leaning posts every 3-5 years as soil cycles',
      '💧 Irrigation backflow preventer: annual inspection required by most MUDs',
    ],
  },
  commercial: {
    title: 'Near-Industrial Zone Homeowner Needs',
    items: [
      '🏭 Air quality: HVAC filters need monthly replacement if near cement or manufacturing',
      '🔊 Sound barriers: heavy-duty acoustic insulation in attic and walls recommended',
      '💡 Power fluctuation: install whole-home surge protector near industrial corridors',
      '🚛 Heavy truck traffic vibration: monitor foundation cracks more frequently',
      '🌿 Buffer plantings: cedar elm and live oak hedge buffers reduce dust and noise',
      '📋 Know your zoning: verify future adjacent land use via Ellis County planning',
    ],
  },
};

export default function MidlothianHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 24px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏭</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            Midlothian TX Homeowner Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            Ellis County growth hub — industrial + residential mix south of Dallas
          </p>
        </div>

        <div style={{ background: '#0f2044', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📍 Midlothian Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 14, color: '#cbd5e1' }}>
            <div>📈 Population: 35K+ growing fast</div>
            <div>🏗️ Homes: 2010–2026 majority new construction</div>
            <div>🌾 Acreage lots: common on outskirts</div>
            <div>🏭 Major employers: Holcim, US Steel, Martin Marietta</div>
            <div>💧 Water: mix of city, MUD, and private well</div>
            <div>🚽 Septic: aerobic systems required in Ellis County</div>
          </div>
        </div>

        <h3 style={{ color: '#F5E642', marginBottom: 16, fontSize: 17 }}>Select your property type for Midlothian-specific maintenance needs:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {propertyTypes.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              style={{
                background: selected === p.id ? '#F5E642' : '#1e3a5f',
                color: selected === p.id ? '#0A1628' : '#fff',
                border: 'none', borderRadius: 10, padding: '14px 12px',
                cursor: 'pointer', fontWeight: 600, fontSize: 14,
              }}
            >
              {p.label}
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
          🔧 ProLnk connects Midlothian homeowners with vetted Ellis County pros
        </div>
      </div>
    </div>
  );
}