import { useState } from 'react';

const HOME_DECADES = [
  { id: '1960s', label: '🏠 1960s Home' },
  { id: '1970s', label: '🏡 1970s Home' },
  { id: '1980s', label: '🏘️ 1980s Home' },
  { id: '1990s', label: '🏗️ 1990s Home' },
  { id: '2000s', label: '🔑 2000s Home' },
];

const GUIDES: Record<string, { title: string; points: string[] }> = {
  "1960s": {
    title: '1960s Garland Home — What You Need to Know',
    points: [
      '🔌 Knob-and-tube or early breaker panels — full electrical inspection critical',
      '💧 Original galvanized steel pipes likely — expect pinhole leaks or full replacement',
      '🏗️ Pier and beam foundations common — annual inspection recommended',
      '🌡️ No original insulation in walls — energy efficiency upgrades save hundreds/year',
      '🪟 Single-pane windows standard — replacement boosts comfort and value significantly',
      '🛠️ ProLnk: plumbing and electrical pros very active in east Garland',
    ],
  },
  "1970s": {
    title: '1970s Garland Home — Deep Dive',
    points: [
      '⚡ 60–100 amp panels common — may need upgrade for modern appliance loads',
      '💧 Mix of copper and galvanized — identify which before planning any renovation',
      '🏠 Slab foundation era begins — watch for crack patterns and drainage issues',
      '🌡️ Early central HVAC — likely needs full system replacement if original',
      '🎨 Popcorn ceilings may contain asbestos — test before scraping',
      '🔧 ProLnk matches HVAC and plumbing specialists experienced with 70s Garland stock',
    ],
  },
  "1980s": {
    title: '1980s Garland Home — Renovation Guide',
    points: [
      '⚡ Aluminum wiring possible on branch circuits — fire risk, requires licensed eval',
      '💧 Polybutylene pipe alert — prone to failure, insurance may not cover',
      '🏠 Slab foundations predominate — expansive clay soil means crack monitoring needed',
      '🚿 Original bathrooms due for renovation — tile, fixtures, and water heaters',
      '🌳 Mature trees now 40+ years — root intrusion into sewer lines very common',
      '🔍 ProLnk pros include sewer scope specialists and poly pipe replacement experts',
    ],
  },
  "1990s": {
    title: '1990s Garland Home — Current Condition Check',
    points: [
      '🌡️ Original HVAC systems reaching end of life — budget for replacement',
      '🔑 Builder-grade appliances and fixtures — kitchen/bath refresh ROI is strong',
      '🏠 Slab in good shape typically — check for hairline cracks near doors/windows',
      '💧 PVC plumbing is standard — generally reliable, inspect supply lines under sinks',
      '🌿 Landscaping fully mature — drainage and grading assessment recommended',
      '🛠️ ProLnk: HVAC replacement and kitchen remodel pros most requested in Garland',
    ],
  },
  "2000s": {
    title: '2000s Garland Home — Ownership Guide',
    points: [
      '🏗️ Builder-grade quality common — countertops and cabinets often due for upgrade',
      '⚡ 200-amp panels standard — capacity is fine, check breaker health',
      '💧 PVC throughout — inspect toilet supply lines and water heater connections',
      '🌡️ HVAC approaching first replacement cycle — 15–20 year lifespan',
      '🌿 Neighborhoods maturing — tree work and fence replacement in demand',
      '🔧 ProLnk connects 2000s-era Garland homeowners with affordable local pros',
    ],
  },
};

export default function DFWGarlandDeepDive2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const guide = selected ? GUIDES[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Deep Dive 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🏡 Garland, TX</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, fontSize: 15 }}>
          DFW's most underrated city — diverse, affordable, and packed with renovation opportunity. 1960s–1990s homes dominate. Select your home's decade for a targeted ownership guide.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {HOME_DECADES.map(d => (
            <button key={d.id} onClick={() => setSelected(d.id)}
              style={{ background: selected === d.id ? '#F5E642' : '#0f2035', color: selected === d.id ? '#0A1628' : '#fff', border: '1px solid', borderColor: selected === d.id ? '#F5E642' : '#1e3a5f', borderRadius: 10, padding: '14px 10px', fontWeight: 600, fontSize: 14, cursor: 'pointer', textAlign: 'left' }}>
              {d.label}
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
            ☝️ Select your home's decade above to get your Garland deep dive guide
          </div>
        )}
        <div style={{ marginTop: 40, background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>🔗 ProLnk — Garland Pros On Deck</div>
          <div style={{ color: '#1a2e4a', fontSize: 13 }}>Licensed plumbing, electrical, HVAC, and remodel contractors serving Garland — affordable and vetted.</div>
        </div>
      </div>
    </div>
  );
}
