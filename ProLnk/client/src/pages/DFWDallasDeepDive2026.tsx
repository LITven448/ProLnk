import { useState } from 'react';

const AREAS = [
  { id: 'preston', label: '🏰 Preston Hollow / North Dallas' },
  { id: 'oak', label: '🌳 Oak Cliff / South Dallas' },
  { id: 'east', label: '🏙️ East Dallas / Lakewood' },
  { id: 'uptown', label: '🌆 Uptown / Knox-Henderson' },
  { id: 'far', label: '🏗️ Far North Dallas / Addison' },
];

const GUIDES: Record<string, { title: string; points: string[] }> = {
  preston: {
    title: 'Preston Hollow / North Dallas Homeowner Guide',
    points: [
      '🏰 Estate-scale properties — pool, landscaping, and gate systems require specialist pros',
      '🔌 Older estates may have sub-panel configurations — full electrical mapping recommended',
      '💧 Large lot irrigation systems common — backflow testing and head replacement in demand',
      '🌳 Mature oak and pecan trees — preventive root intrusion work protects sewer lines',
      '🏗️ Post-tensioned slabs on larger homes — only certified foundation repair firms',
      '🤝 ProLnk vets luxury-tier pros for high-end North Dallas properties',
    ],
  },
  oak: {
    title: 'Oak Cliff / South Dallas Homeowner Guide',
    points: [
      '🏠 1920s–1960s bungalow stock — original plumbing and electrical is the norm',
      '🔌 Knob-and-tube and early 60-amp panels still found — full upgrade often needed',
      '💧 Cast iron sewer lines from era — camera inspection before any renovation',
      '🌿 Pier and beam foundations — moisture barriers and leveling in high demand',
      '🎨 Historic character preservation — renovations often require city design review',
      '🛠️ ProLnk connects Oak Cliff homeowners with pros experienced in historic Dallas stock',
    ],
  },
  east: {
    title: 'East Dallas / Lakewood Homeowner Guide',
    points: [
      '🌳 Lakewood: 1920s–1940s homes with character — original wood floors, plaster walls',
      '💧 Cast iron drains and galvanized supply — phase replacement before full failure',
      '🔌 100–150 amp panel common — EV charging or HVAC additions require upgrade',
      '🏗️ Mature tree canopy on clay soil — root management is an ongoing priority',
      '🎨 Historic district overlays apply in some blocks — check before exterior changes',
      '🔧 ProLnk: East Dallas remodel and restoration pros very active in this market',
    ],
  },
  uptown: {
    title: 'Uptown / Knox-Henderson Homeowner Guide',
    points: [
      '🌆 Mix of 1980s-2000s townhomes and condos — HOA coordination required for most work',
      '🔌 Townhome electrical is unit-specific — breaker panel location varies by build year',
      '🚿 High-end finish expectation — bathroom and kitchen upgrades drive premium quotes',
      '🌿 Minimal outdoor space — privacy screens, balcony upgrades, and rooftop work popular',
      '📡 Smart home integration very popular in this demographic — AV and security installs',
      '🤝 ProLnk matches Uptown owners with licensed, professional-grade contractors',
    ],
  },
  far: {
    title: 'Far North Dallas / Addison Homeowner Guide',
    points: [
      '🏗️ 1980s–2000s suburban homes — approaching first major systems replacement cycle',
      '🌡️ HVAC systems 20–30 years old in many homes — budget for full replacement',
      '💧 PVC plumbing standard — inspect supply lines, water heaters, and irrigation',
      '🌿 Established landscaping — tree removal and drainage re-grading common needs',
      '🔑 Pool homes common — pump, filter, and plaster refresh on 10–15 year cycles',
      '🛠️ ProLnk: HVAC and pool service pros most requested in far north Dallas corridor',
    ],
  },
};

export default function DFWDallasDeepDive2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const guide = selected ? GUIDES[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Deep Dive 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🏙️ Dallas City Proper</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, fontSize: 15 }}>
          230+ square miles, extreme income diversity, and home vintages spanning 100+ years. Each area has its own character and homeowner challenges. Select your Dallas area.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {AREAS.map(a => (
            <button key={a.id} onClick={() => setSelected(a.id)}
              style={{ background: selected === a.id ? '#F5E642′ : '#0f2035', color: selected === a.id ? '#0A1628' : '#fff', border: '1px solid', borderColor: selected === a.id ? '#F5E642' : '#1e3a5f', borderRadius: 10, padding: '14px 10px', fontWeight: 600, fontSize: 14, cursor: ’pointer', textAlign: 'left' }}>
              {a.label}
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
            ☝️ Select your Dallas area above for a neighborhood-specific homeowner guide
          </div>
        )}
        <div style={{ marginTop: 40, background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>🔗 ProLnk — Dallas City Pros Across Every District</div>
          <div style={{ color: '#1a2e4a', fontSize: 13 }}>Licensed, vetted contractors across all of Dallas — historic bungalows to luxury estates, we match the right pro.</div>
        </div>
      </div>
    </div>
  );
}
