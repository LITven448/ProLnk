import { useState } from 'react';

const configs = [
  {
    size: 'Under 1,500 sq ft open',
    icon: '🏠',
    description: 'Compact open plans — kitchen, dining, living combined — common in townhomes and smaller DFW builds.',
    challenges: [
      'Single return air location serves too large a space — creates dead zones',
      'Cooking heat from open kitchen directly enters living area and recirculates',
      'Low ceiling open plans have better horizontal distribution but still need proper return sizing',
    ],
    returnAir: 'One large central return typically sufficient; verify it is 16″ x 25″ minimum for systems under 3 ton',
    stratification: 'Minimal in single-story; ceiling fans at 72″ or higher mitigate any layering',
    ductDesign: 'Supply registers on exterior walls; return centrally located; avoid putting both on same wall',
    solutions: [
      'Ceiling fan in kitchen/living bridge to circulate air ($200–500)',
      'Range hood vented to exterior to remove cooking heat ($800–2,000 installed)',
      'Single-zone smart thermostat with remote sensor average ($300–600)',
    ],
    accent: '#22c55e',
  },
  {
    size: '1,500–2,500 sq ft open',
    icon: '🏡',
    description: 'Mid-size open plans popular in DFW suburbs from Prosper to Rockwall. Two-story vaults common in this range.',
    challenges: [
      'Vaulted ceilings (18–22 ft) in living areas create extreme thermal stratification',
      'Large windows common in DFW open plans add 30–40% heat gain vs. closed floor plans',
      'Multiple supply registers needed but often only one return — creates pressure imbalance',
    ],
    returnAir: 'Minimum two returns: one high (for stratification) and one low. Critical for vaulted spaces.',
    stratification: 'Hot air rises to vault — 15–20F difference between floor and ceiling. Destratification fans recommended.',
    ductDesign: 'Extended plenum design with multiple supply points along exterior; returns on interior walls at two heights',
    solutions: [
      'Destratification fan at ceiling peak ($400–900 installed)',
      'High/low return air configuration ($600–1,400 to add second return)',
      'Two-stage compressor for longer run times and better air mixing ($1,200–2,000 upgrade)',
      'Window film on south/west facing glass ($600–1,500)',
    ],
    accent: '#f59e0b',
  },
  {
    size: '2,500–4,000 sq ft open',
    icon: '🏘️',
    description: 'Large open plans in DFW luxury builds — often combining great room, dining, kitchen, and study in one continuous space exceeding 1,000 sq ft.',
    challenges: [
      'Single system cannot maintain even temperatures across large open space',
      'Return air severely undersized in most builder plans — creates negative pressure in space',
      'DFW afternoon sun through west-facing glass walls can add 3–5 tons of instantaneous load',
      'Multiple occupants in large open space create localized heat pockets',
    ],
    returnAir: 'Three or more return locations required; total return area must match supply capacity',
    stratification: 'Severe without intervention — consider ceiling fans every 400 sq ft of open plan',
    ductDesign: 'Zoned system with at least two independent thermostats; perimeter supply with central return chase',
    solutions: [
      'Zoning with motorized dampers — divide space into 2+ zones ($2,500–4,000)',
      'Variable-speed air handler for continuous low-speed circulation ($1,500–2,500 upgrade)',
      'Multiple high-capacity ceiling fans with remote control ($1,200–2,500 installed)',
      'Solar shades or motorized blinds on west exposure ($2,000–5,000)',
    ],
    accent: '#3b82f6',
  },
  {
    size: 'Over 4,000 sq ft open',
    icon: '🏰',
    description: 'Expansive open plans in DFW estate homes — often 2-story great rooms opening to second-floor gallery, requiring engineered HVAC solutions.',
    challenges: [
      'Stack effect in tall open spaces drives warm air to second floor gallery constantly',
      'Multiple exposures of glass create asymmetric load throughout the day',
      'Single large space may require separate zoning for morning sun vs. afternoon sun sides',
      'Air changes per hour insufficient with standard duct design for volume of space',
    ],
    returnAir: 'Return air engineering required — typically 4+ return locations with high-capacity grilles',
    stratification: 'Dedicated mechanical destratification or hydronic radiant panels for ceiling-level heat control',
    ductDesign: 'Engineer-designed duct system with load calculations per zone; consider dedicated mechanical room',
    solutions: [
      'Full zoning system with 3–4 zones and dedicated equipment ($8,000–15,000)',
      'Dedicated mini-split for problem areas (gallery, study alcoves) ($3,000–6,000)',
      'Building automation system for schedule-based zone control ($4,000–8,000)',
      'Spray foam attic insulation to reduce peak load ($4,000–7,000)',
    ],
    accent: '#a855f7',
  },
];

export default function DFWHVACOpenFloorPlanGuide() {
  const [selected, setSelected] = useState(configs[0]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠➡️🏰</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Open Floor Plan HVAC in DFW</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 620, margin: '0 auto' }}>
            DFW open floor plans create unique HVAC challenges. Select your open-plan size to understand duct design requirements, stratification risks, and real solutions.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
          {configs.map(c => (
            <button
              key={c.size}
              onClick={() => setSelected(c)}
              style={{
                padding: '10px 16px', borderRadius: 8, border: `2px solid ${selected.size === c.size ? '#F5E642' : '#1e3a5f'}`,
                background: selected.size === c.size ? '#F5E642′ : '#0d2137',
                color: selected.size === c.size ? '#0A1628′ : '#94a3b8',
                fontWeight: 600, cursor: 'pointer', fontSize: 13,
              }}
            >
              {c.icon} {c.size}
            </button>
          ))}
        </div>

        <div style={{ background: '#0d2137', borderRadius: 12, padding: 28, border: `2px solid ${selected.accent}`, marginBottom: 20 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>{selected.icon} {selected.size} Open Plan</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginBottom: 20 }}>{selected.description}</p>

          <div style={{ marginBottom: 20 }}>
            <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 14 }}>⚠️ Open-Plan HVAC Challenges</p>
            {selected.challenges.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <span style={{ color: selected.accent, fontWeight: 700, flexShrink: 0 }}>•</span>
                <p style={{ color: '#94a3b8', fontSize: 14, margin: 0, lineHeight: 1.5 }}>{c}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6, fontSize: 13 }}>Return Air Requirements</p>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{selected.returnAir}</p>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6, fontSize: 13 }}>🌀 Stratification Risk</p>
              <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{selected.stratification}</p>
            </div>
          </div>

          <div style={{ background: '#0A1628', borderRadius: 8, padding: 14, marginBottom: 20 }}>
            <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6, fontSize: 13 }}>📐 Duct Design Approach</p>
            <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{selected.ductDesign}</p>
          </div>

          <div>
            <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10, fontSize: 14 }}>✅ Recommended Solutions</p>
            {selected.solutions.map((sol, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                <div style={{ background: selected.accent, color: '#000', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11, flexShrink: 0, marginTop: 2 }}>{i + 1}</div>
                <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0, lineHeight: 1.5 }}>{sol}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '20px', background: '#0d2137', borderRadius: 12, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Get an open floor plan HVAC analysis from a DFW specialist</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get Open Plan Analysis
          </button>
        </div>
      </div>
    </div>
  );
}