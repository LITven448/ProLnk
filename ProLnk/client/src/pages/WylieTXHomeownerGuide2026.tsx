import { useState } from 'react';

const communityTypes = [
  { id: 'masterplanned', label: '🏘️ Master-Planned Community' },
  { id: 'newer', label: '🏗️ New Construction (2015+)' },
  { id: 'established', label: '🏡 Established Neighborhood' },
  { id: 'acreage', label: '🌾 Acreage / Rural Lot' },
];

const guides: Record<string, { title: string; items: string[] }> = {
  masterplanned: {
    title: 'Master-Planned Community Maintenance Profile',
    items: [
      '🏊 Amenity center access: verify HOA dues current before pool season opens',
      '🌳 Common area trees overhang lots — report limbs to HOA before storm season',
      '🛣️ HOA-managed streets: not city-maintained — report potholes to HOA directly',
      '🔊 Noise buffers near 544 and 78 corridors: window seals critical for comfort',
      '📋 Exterior mods require ACC approval — submit 30 days before project start',
      '💧 Irrigation systems: Wylie water rates increase June–Aug — schedule smartly',
    ],
  },
  newer: {
    title: 'New Construction (2015+) Maintenance Profile',
    items: [
      '🧱 Foundation settling common in first 5 years on expansive Collin County clay',
      '📐 Monitor interior door gaps and cracked grout — early signs of foundation shift',
      '🌿 Sod establishment: deep water 2x weekly first two summers to reduce cracking',
      '🌬️ HVAC efficiency: newer builds use 2-stage systems — calibrate seasonal transitions',
      '🔩 Builder warranty expires at 1 year cosmetic, 10 years structural — document now',
      '🚰 Tankless water heaters common: flush annually to prevent mineral buildup',
    ],
  },
  established: {
    title: 'Established Neighborhood Maintenance Profile',
    items: [
      '🏠 2000s-era homes: roof at 20+ years — inspect after every hail event',
      '🌲 Mature trees: roots can encroach plumbing — camera scope sewer every 5 years',
      '🔌 Electrical panels from early 2000s: consider whole-home surge protection',
      '🪟 Window seals degrading by year 15-20 — watch for fogging between panes',
      '🧹 Gutter guards: established lots have heavy leaf fall — clean bi-annually',
      '🏫 Wylie ISD drives high resale: curb appeal maintenance protects value',
    ],
  },
  acreage: {
    title: 'Acreage / Rural Lot Maintenance Profile',
    items: [
      '🌾 Pasture mowing: fire risk if grass exceeds 12 inches — cut before July',
      '💧 Private well testing: recommend annual bacteria and mineral panel',
      '🚽 Septic system: pump every 3-5 years; inspect risers and d-box annually',
      '⚡ Propane tank: keep 30%+ minimum through winter — refill in October',
      '🦟 Mosquito control on ponds or stock tanks: treat with Bti monthly',
      '🛤️ Caliche or gravel drive: grade and top-dress after wet winters',
    ],
  },
};

export default function WylieTXHomeownerGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '40px 24px', fontFamily: 'sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏫</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>
            Wylie TX Homeowner Guide 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>
            Fast-growing Collin County suburb — master-planned communities and Wylie ISD excellence
          </p>
        </div>

        <div style={{ background: '#0f2044', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 16 }}>📍 Wylie Snapshot</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, fontSize: 14, color: '#cbd5e1′ }}>
            <div>📈 Population: 60K+ and growing rapidly</div>
            <div>🏗️ New construction: 40%+ built after 2010</div>
            <div>🏫 Wylie ISD: drives high homeownership demand</div>
            <div>🧱 Collin County clay: foundation monitoring essential</div>
            <div>🏘️ Master-planned: Inspiration, Braddock, Stone Ranch</div>
            <div>🌾 Eastern edge: acreage lots still available</div>
          </div>
        </div>

        <h3 style={{ color: '#F5E642', marginBottom: 16, fontSize: 17 }}>Select your community type for a Wylie maintenance profile:</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
          {communityTypes.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              style={{
                background: selected === c.id ? '#F5E642′ : '#1e3a5f',
                color: selected === c.id ? '#0A1628′ : '#fff',
                border: 'none', borderRadius: 10, padding: '14px 12px',
                cursor: 'pointer', fontWeight: 600, fontSize: 14,
              }}
            >
              {c.label}
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
          🔧 ProLnk connects Wylie homeowners with vetted Collin County pros
        </div>
      </div>
    </div>
  );
}