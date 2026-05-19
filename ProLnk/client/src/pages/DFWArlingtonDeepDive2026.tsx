import { useState } from 'react';

const AREAS = [
  { id: 'north', label: '🏟️ Near AT&T Stadium / Globe Life' },
  { id: 'south', label: '🏘️ South Arlington (New Builds)' },
  { id: 'uta', label: '🎓 UTA / College Park Area' },
  { id: 'downtown', label: '🏙️ Historic Downtown Arlington' },
  { id: 'sixflags', label: '🎡 Six Flags / Entertainment Corridor' },
];

const GUIDES: Record<string, { title: string; points: string[] }> = {
  north: {
    title: 'Stadium District Homeowner Guide',
    points: [
      '🏟️ Event traffic is real — noise, parking, and landscaping all impacted',
      '🏠 Homes range 1960s–1990s in this corridor — original systems may still be in place',
      '🔌 Many homes on 100-amp panels — upgrade before adding EV charger or HVAC',
      '💧 Slab foundations in clay soil — watch for door sticking, cracks near corners',
      '🌿 Mature trees near stadium areas — root intrusion into sewer lines is common',
      '🛠️ ProLnk pros handle everything from plumbing to fence repairs in this zone',
    ],
  },
  south: {
    title: 'South Arlington New Build Guide',
    points: [
      '🆕 New builds 2015–2025 — builder warranty periods may still apply',
      '🏗️ Expansive Tarrant County clay — foundation settling in years 2–5 is normal',
      '🌡️ Builder HVAC systems — get 5-year service contract at minimum',
      '🌿 Minimal landscaping on delivery — sod, sprinkler, and hardscape installs popular',
      '🔑 Smart home rough-in common — integration and upgrade work in demand',
      '🤝 ProLnk matches south Arlington homeowners with landscaping and warranty pros',
    ],
  },
  uta: {
    title: 'UTA / College Park Homeowner Guide',
    points: [
      '🎓 High rental density — if renting, ensure all systems are up to code before listing',
      '🏠 1970s–1990s homes dominate — polybutylene pipe risk in 80s builds',
      '🔊 Noise from student traffic — soundproofing and privacy fence installs popular',
      '💡 Electrical capacity upgrades common for rental density needs',
      '🌿 Landscaping often deferred in rental stock — new ownership = immediate investment',
      '🛠️ ProLnk: rental-ready plumbing and electrical specialists active in UTA corridor',
    ],
  },
  downtown: {
    title: 'Historic Downtown Arlington Guide',
    points: [
      '🏙️ Homes from 1940s–1970s — expect original everything in un-renovated homes',
      '🔌 Knob-and-tube or early breaker panels in oldest stock — full electrical audit needed',
      '💧 Galvanized pipe failures common — proactive replacement saves major damage',
      '🌳 Oldest tree canopy in Arlington — beautiful but root intrusion risk is high',
      '🏗️ Pier and beam in oldest blocks — foundation vents and moisture barriers matter',
      '🔧 ProLnk connects historic Arlington owners with specialists in older home systems',
    ],
  },
  sixflags: {
    title: 'Entertainment Corridor Homeowner Guide',
    points: [
      '🎡 Tourism traffic year-round — exterior maintenance and curb appeal matter more here',
      '🏠 Mixed 1980s–2000s housing stock — varied system ages and conditions',
      '🌡️ High AC demand in summer entertainment months — HVAC maintenance critical',
      '🏗️ Older commercial-adjacent streets may have shared infrastructure quirks',
      '🌿 Privacy landscaping popular — wood fence and screening installs in demand',
      '📡 Security systems and cameras — popular in high foot traffic zones',
    ],
  },
};

export default function DFWArlingtonDeepDive2026() {
  const [selected, setSelected] = useState<string | null>(null);
  const guide = selected ? GUIDES[selected] : null;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 2, textTransform: 'uppercase' }}>DFW Deep Dive 2026</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>🏟️ Arlington, TX</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, fontSize: 15 }}>
          The entertainment capital of DFW — Globe Life Field, AT&T Stadium, Six Flags, and UTA. Home vintages span 1940s to 2020s. Select your Arlington area for a tailored homeowner guide.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {AREAS.map(a => (
            <button key={a.id} onClick={() => setSelected(a.id)}
              style={{ background: selected === a.id ? '#F5E642' : '#0f2035', color: selected === a.id ? '#0A1628' : '#fff', border: '1px solid', borderColor: selected === a.id ? '#F5E642' : '#1e3a5f', borderRadius: 10, padding: '14px 10px', fontWeight: 600, fontSize: 14, cursor: 'pointer', textAlign: 'left' }}>
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
            ☝️ Select your Arlington area above to get your personalized homeowner deep dive
          </div>
        )}
        <div style={{ marginTop: 40, background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>🔗 ProLnk — Arlington Pros Ready to Match</div>
          <div style={{ color: '#1a2e4a', fontSize: 13 }}>Vetted plumbing, HVAC, electrical, and remodel pros across all of Arlington — licensed and insured.</div>
        </div>
      </div>
    </div>
  );
}
