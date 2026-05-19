import { useState } from 'react';

const symptoms = [
  {
    symptom: 'Upstairs 5–8°F warmer',
    icon: '🌡️',
    cause: 'Single-system undersizing or improper supply/return balance',
    detail: 'The most common DFW complaint. One system trying to cool two thermally distinct zones — upstairs gains more heat through roof and attic than supply capacity can overcome during peak afternoon hours.',
    solutions: [
      { name: 'Zoning Dampers', effectiveness: 92, cost: '$2,200–3,800', description: 'Electronic dampers redirect airflow based on zone demand. Most effective single fix for existing systems.' },
      { name: 'Dedicated Upstairs System', effectiveness: 97, cost: '$6,500–9,500', description: 'Separate system for upstairs. Gold standard — each zone sized independently for its actual load.' },
      { name: 'Variable-Speed Upgrade', effectiveness: 75, cost: '$3,500–5,500', description: 'Allows system to run longer at lower capacity, improving distribution. Helps but doesn’t solve zone separation.' },
      { name: 'Damper Manual Adjustment', effectiveness: 40, cost: '$0–200', description: 'Close some downstairs registers. Temporary relief only — causes high static pressure and efficiency loss.' },
    ],
    accent: '#ef4444',
  },
  {
    symptom: 'Upstairs OK, downstairs cold',
    icon: '❄️',
    cause: 'Over-cooling downstairs due to single thermostat placement',
    detail: 'Thermostat placed downstairs runs system until downstairs reaches setpoint. Upstairs then gets over-cooled or refrigerant isn’t reaching full coil. Common in open floor plan two-stories.',
    solutions: [
      { name: 'Relocate Thermostat', effectiveness: 60, cost: '$150–400', description: 'Move thermostat to average-temperature location, often a hallway. Quick fix with moderate results.' },
      { name: 'Zoning with Dual Thermostats', effectiveness: 88, cost: '$2,000–3,200', description: 'Independent thermostats for each floor with motorized dampers. Eliminates the core problem.' },
      { name: 'Smart Thermostat + Remote Sensors', effectiveness: 70, cost: '$400–800', description: 'Ecobee or similar averages multiple sensor readings. Good intermediate solution.' },
      { name: 'Second System', effectiveness: 95, cost: '$6,000–9,000', description: 'Independent systems eliminate all cross-floor thermal conflicts permanently.' },
    ],
    accent: '#3b82f6',
  },
  {
    symptom: 'Temperature swings all day',
    icon: '📈',
    cause: 'Oversized single-stage system short-cycling',
    detail: 'A common DFW mistake: oversizing to "beat the heat." Oversized single-stage systems cool too fast, shut off before humidity is removed, then cycle back on frequently. Short cycles = high humidity, inconsistent temps, premature compressor wear.',
    solutions: [
      { name: 'Two-Stage or Variable Compressor', effectiveness: 90, cost: '$4,000–6,500', description: 'Runs at low capacity most of the time, only stepping up during peak demand. Longer run times = better dehumidification.' },
      { name: 'Replace with Correct-Sized System', effectiveness: 85, cost: '$5,500–8,500', description: 'Get a Manual J load calculation and replace with a properly sized system. Remove the root cause.' },
      { name: 'Whole-House Dehumidifier', effectiveness: 65, cost: '$1,500–2,800', description: 'Addresses humidity symptom without fixing the short-cycling. Adds operating cost.' },
      { name: 'Zoning the Existing System', effectiveness: 55, cost: '$1,800–3,000', description: 'Reduces effective load per zone, forcing longer run times. Partial solution.' },
    ],
    accent: '#f59e0b',
  },
  {
    symptom: 'Master bedroom too warm at night',
    icon: '🛏️',
    cause: 'Bedroom wing loses heat to attic after system cycles off evening cooling',
    detail: 'DFW attics reach 140–160°F in summer. Even well-insulated ceilings allow heat transfer at night when the system isn’t running continuously. Master bedrooms farthest from supply trunk get lowest airflow.',
    solutions: [
      { name: 'Attic Insulation to R-49+', effectiveness: 70, cost: '$2,500–4,500', description: 'Reduces radiant heat gain through ceiling. Most cost-effective long-term investment for DFW homes.' },
      { name: 'Mini-Split for Master Suite', effectiveness: 94, cost: '$2,800–4,500', description: 'Independent ductless system for master only. Allows personalized temperature 24/7 without affecting main system.' },
      { name: 'Additional Supply Register in Master', effectiveness: 55, cost: '$400–900', description: 'Increases airflow to master. Check static pressure first — may require duct upsizing.' },
      { name: 'Spray Foam Attic Sealing', effectiveness: 80, cost: '$3,500–6,000', description: 'Converts attic to conditioned space. Eliminates radiant heat source entirely.' },
    ],
    accent: '#a855f7',
  },
];

export default function DFWHVACTwoStoryGuide() {
  const [selected, setSelected] = useState(symptoms[0]);
  const [showAll, setShowAll] = useState(false);

  const displaySolutions = showAll ? selected.solutions : selected.solutions.slice(0, 3);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🏠🏠</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', marginBottom: 8 }}>Two-Story DFW Home HVAC</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 620, margin: '0 auto' }}>
            "Upstairs always too hot" is DFW's #1 HVAC complaint. Select your symptom to get real solutions — not just "close the downstairs vents."
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
          {symptoms.map(s => (
            <button
              key={s.symptom}
              onClick={() => { setSelected(s); setShowAll(false); }}
              style={{
                padding: '10px 16px', borderRadius: 8, border: `2px solid ${selected.symptom === s.symptom ? '#F5E642' : '#1e3a5f'}`,
                background: selected.symptom === s.symptom ? '#F5E642' : '#0d2137',
                color: selected.symptom === s.symptom ? '#0A1628' : '#94a3b8',
                fontWeight: 600, cursor: 'pointer', fontSize: 13,
              }}
            >
              {s.icon} {s.symptom}
            </button>
          ))}
        </div>

        <div style={{ background: '#0d2137', borderRadius: 12, padding: 28, border: `2px solid ${selected.accent}`, marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', marginBottom: 6 }}>{selected.icon} {selected.symptom}</h2>
          <p style={{ color: '#22c55e', fontWeight: 600, fontSize: 14, marginBottom: 10 }}>Root Cause: {selected.cause}</p>
          <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginBottom: 24 }}>{selected.detail}</p>

          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 14, fontSize: 15 }}>Solutions Ranked by Effectiveness</p>
          {displaySolutions.map((sol, i) => (
            <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div>
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>{sol.name}</span>
                  <span style={{ color: '#94a3b8', fontSize: 13, marginLeft: 12 }}>{sol.cost}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{sol.effectiveness}%</span>
                  <div style={{ width: 80, height: 6, background: '#1e3a5f', borderRadius: 3 }}>
                    <div style={{ width: `${sol.effectiveness}%`, height: '100%', background: selected.accent, borderRadius: 3 }} />
                  </div>
                </div>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: 0, lineHeight: 1.5 }}>{sol.description}</p>
            </div>
          ))}

          {!showAll && selected.solutions.length > 3 && (
            <button onClick={() => setShowAll(true)} style={{ background: 'transparent', border: `1px solid #F5E642`, color: '#F5E642', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
              Show All {selected.solutions.length} Solutions
            </button>
          )}
        </div>

        <div style={{ textAlign: 'center', padding: '20px', background: '#0d2137', borderRadius: 12, border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 12 }}>Get a two-story zoning assessment from a certified DFW HVAC pro</p>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
            Get Zoning Assessment
          </button>
        </div>
      </div>
    </div>
  );
}