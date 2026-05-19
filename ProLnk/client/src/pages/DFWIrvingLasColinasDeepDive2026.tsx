import { useState } from 'react';

const PROPERTY_TYPES = [
  { id: 'condo', label: '🏢 Canal District Condo' },
  { id: 'townhome', label: '🏠 Las Colinas Townhome' },
  { id: 'corp', label: '🏗️ Corporate HQ-Adjacent' },
  { id: 'hoa', label: '🏘️ HOA Community' },
  { id: 'urban', label: '🌆 Urban Infill Newer Build' },
];

const GUIDES: Record<string, { title: string; points: string[] }> = {
  condo: {
    title: 'Canal District Condo Guide',
    points: [
      '🔧 HVAC shared systems — confirm HOA covers or clarify unit responsibility',
      '💧 Water damage common in older canal-adjacent buildings — inspect carefully',
      '🔌 Electrical panels often 1980s vintage — breaker upgrades frequent',
      '🌡️ Summer cooling costs high due to glass-heavy architecture',
      '📋 HOA fees typically $400–$700/mo — understand what is covered',
      '🛠️ ProLnk pros: plumbing, electrical, HVAC specialists highly active',
    ],
  },
  townhome: {
    title: 'Las Colinas Townhome Guide',
    points: [
      '🏗️ Most built 1995–2010 — inspect for original plumbing under slab',
      '🔑 HOA governs exterior — coordinate service access before booking',
      '🌿 Landscaping often shared — clarity on scope before hiring landscaper',
      '💡 Electrical is unit-specific — full panel inspection recommended',
      '🛁 Bathroom tile and fixtures frequently dated — renovation demand high',
      '🤝 ProLnk matches tile, flooring, and bathroom remodel specialists',
    ],
  },
  corp: {
    title: 'Corporate HQ-Adjacent Housing Guide',
    points: [
      '🏢 Proximity to former ExxonMobil HQ means dense office-residential mix',
      '🔊 Traffic and noise considerations — soundproofing upgrades popular',
      '🌐 High-speed internet infrastructure generally strong in the area',
      '🚗 Parking-heavy neighborhoods — driveway and garage maintenance critical',
      '🌳 Mature landscaping common — tree trimming and removal in demand',
      '📡 Security system upgrades popular for rental units in corporate areas',
    ],
  },
  hoa: {
    title: 'HOA Community Deep Dive',
    points: [
      '📜 Las Colinas HOAs among strictest in DFW — review CC&Rs before any work',
      '🎨 Exterior paint, fencing, and roofing require HOA approval first',
      '🔨 Contractors must be licensed and bonded — ProLnk vets all pros',
      '📅 Project timing restrictions common (no work before 8am or after 6pm)',
      '💬 Document all service work for HOA compliance records',
      '🏅 ProLnk pros familiar with Las Colinas HOA rules and processes',
    ],
  },
  urban: {
    title: 'Urban Infill Newer Build Guide',
    points: [
      '🆕 Built 2010–2024 — warranty periods may still apply, check carefully',
      '🏗️ Builder-grade finishes common — upgrade demand high after 5 years',
      '🌊 Foundation still settling — annual inspection strongly recommended',
      '⚡ Smart home pre-wire common — integration and upgrade work popular',
      '🌿 Minimal landscaping on new builds — hardscape and sod demand high',
      '🛠️ ProLnk connects you with local pros who specialize in new construction',
    ],
  },
};

export default function DFWIrvingLasColinasDeepDive2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const guide = selected ? GUIDES[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Deep Dive 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🏙️ Irving / Las Colinas</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, fontSize: 15 }}>
          The master-planned urban district — canal condos, corporate HQ corridors, HOA-heavy communities, and urban infill. Select your property type for a tailored homeowner guide.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {PROPERTY_TYPES.map(pt => (
            <button key={pt.id} onClick={() => setSelected(pt.id)}
              style={{ background: selected === pt.id ? '#F5E642′ : '#0f2035', color: selected === pt.id ? '#0A1628' : '#fff', border: '1px solid', borderColor: selected === pt.id ? '#F5E642' : '#1e3a5f', borderRadius: 10, padding: '14px 10px', fontWeight: 600, fontSize: 14, cursor: ’pointer', textAlign: 'left' }}>
              {pt.label}
            </button>
          ))}
        </div>
        {guide && (
          <div style={{ background: '#0f2035', border: '1px solid #1e3a5f', borderRadius: 14, padding: 24 }}>
            <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>{guide.title}</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {guide.points.map((p, i) => (
                <li key={i} style={{ padding: '10px 0', borderBottom: '1px solid #1e3a5f', fontSize: 14, lineHeight: 1.6 }}>{p}</li>
              ))}
            </ul>
          </div>
        )}
        {!guide && (
          <div style={{ textAlign: 'center', color: '#475569', padding: '40px 0', fontSize: 14 }}>
            ☝️ Select a property type above to view your personalized Las Colinas homeowner guide
          </div>
        )}
        <div style={{ marginTop: 40, background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>🔗 ProLnk — Irving / Las Colinas Pros Ready</div>
          <div style={{ color: '#1a2e4a', fontSize: 13 }}>Vetted plumbing, electrical, HVAC, and remodel specialists across Las Colinas — HOA-compliant and licensed.</div>
        </div>
      </div>
    </div>
  );
}
