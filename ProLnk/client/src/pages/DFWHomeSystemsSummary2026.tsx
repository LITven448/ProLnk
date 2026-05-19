import { useState } from 'react';

const systems = [
  {
    key: 'hvac',
    label: '❄️ HVAC',
    icon: '❄️',
    lifespans: { '1960s–1970s': [0, 5], '1980s': [5, 12], '1990s': [8, 15], '2000s': [12, 20], '2010s': [18, 25] },
    avgCost: '$6,000–$14,000',
    facts: 'DFW ACs run 3,000–4,000 hours/year. Expected life is 15–20 years under DFW conditions. Heat pumps are increasingly the DFW standard for dual heating/cooling efficiency.',
  },
  {
    key: 'plumbing',
    label: '🔧 Plumbing',
    icon: '🔧',
    lifespans: { '1960s–1970s': [0, 5], '1980s': [2, 10], '1990s': [10, 20], '2000s': [20, 35], '2010s': [35, 50] },
    avgCost: '$4,000–$18,000 (repipe)',
    facts: 'Pre-1990 DFW homes may have galvanized steel supply lines — prone to corrosion and low pressure. Copper is standard 1990–2010. PEX is now the DFW standard for new builds and repiping.',
  },
  {
    key: 'electrical',
    label: '⚡ Electrical',
    icon: '⚡',
    lifespans: { '1960s–1970s': [0, 2], '1980s': [5, 12], '1990s': [15, 25], '2000s': [30, 45], '2010s': [40, 60] },
    avgCost: '$3,500–$12,000 (panel upgrade)',
    facts: 'Pre-1980 DFW homes may have Federal Pacific or Zinsco panels — known fire hazards. 100-amp service is insufficient for modern DFW homes; 200-amp is the standard. EV charging and solar add-ons require panel evaluation.',
  },
  {
    key: 'roofing',
    label: '🏠 Roofing',
    icon: '🏠',
    lifespans: { '1960s–1970s': [0, 0], '1980s': [0, 3], '1990s': [2, 8], '2000s': [8, 15], '2010s': [15, 22] },
    avgCost: '$9,000–$22,000 (full replacement)',
    facts: 'DFW hailstorms are the #1 cause of roof replacement. Most insurance-replaced roofs get architectural shingles with 25-30 year warranties, but DFW UV and heat degrade shingles faster. A 20-year DFW roof may look fine but be brittle.',
  },
  {
    key: 'foundation',
    label: '🧱 Foundation',
    icon: '🧱',
    lifespans: { '1960s–1970s': [0, 0], '1980s': [0, 5], '1990s': [5, 15], '2000s': [15, 30], '2010s': [25, 50] },
    avgCost: '$3,000–$20,000+ (leveling/repair)',
    facts: "DFW's expansive clay soil is the #1 foundation threat in North America. The clay expands when wet and contracts in drought — causing seasonal movement. Proper drainage and consistent watering are preventive measures every DFW homeowner must understand.",
  },
];

export default function DFWHomeSystemsSummary2026() {
  const [vintage, setVintage] = useState('');

  const vintages = ['1960s–1970s', '1980s', '1990s', '2000s', '2010s'];

  function getRisk(key: string) {
    if (!vintage) return null;
    const sys = systems.find(s => s.key === key);
    if (!sys) return null;
    const [remainingLow, remainingHigh] = sys.lifespans[vintage as keyof typeof sys.lifespans] || [0, 0];
    if (remainingLow <= 2) return { level: '🔴 Critical', color: '#ef4444', label: 'At or near end of life — budget now' };
    if (remainingLow <= 8) return { level: '🟡 Watch', color: '#f59e0b', label: `${remainingLow}–${remainingHigh} years of useful life remaining` };
    return { level: '🟢 Good', color: '#4ade80', label: `${remainingLow}–${remainingHigh} years of useful life remaining` };
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏠 DFW HOMEOWNER RESOURCES</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>DFW Home Systems Summary 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          Every major DFW home system has a lifespan — and DFW's climate shortens most of them.
          Select your home's build decade to see which systems are likely at or approaching end of life,
          what replacement costs to budget, and what every DFW homeowner should know about each.
        </p>

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 14 }}>🏡 Select Your Home's Build Decade</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {vintages.map(v => (
              <button key={v} onClick={() => setVintage(v)}
                style={{ background: vintage === v ? '#F5E642′ : '#1a2f4a', color: vintage === v ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '10px 18px', cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>
                {v}
              </button>
            ))}
          </div>
        </div>

        {systems.map(sys => {
          const risk = getRisk(sys.key);
          return (
            <div key={sys.key} style={{ background: '#0f2035', borderRadius: 12, padding: 24, marginBottom: 20, borderLeft: risk ? `4px solid ${risk.color}` : '4px solid #2a4060′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>{sys.label}</h3>
                {risk && (
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: risk.color }}>{risk.level}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8′ }}>{risk.label}</div>
                  </div>
                )}
              </div>
              <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Replacement Cost: {sys.avgCost}</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{sys.facts}</div>
            </div>
          );
        })}

        <div style={{ background: '#0f2035', borderRadius: 12, padding: 24, marginTop: 8 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F5E642′ }}>📋 DFW Homeowner Checklist 2026</h3>
          {[
            '✅ HVAC: Service annually before May. Replace filters monthly May–October.',
            '✅ Plumbing: Know where your main shutoff is. Inspect under sinks annually.',
            '✅ Electrical: Never ignore flickering lights or warm outlets. Panel age matters.',
            '✅ Roofing: Inspect after every DFW hailstorm. File insurance claims promptly.',
            '✅ Foundation: Water consistently in drought years. Grade soil away from foundation.',
          ].map((item, i) => (
            <div key={i} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8, lineHeight: 1.5 }}>{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
