import { useState } from 'react';

const headTypes = [
  {
    id: 'popup-spray',
    name: 'Pop-Up Spray Heads',
    icon: '💦',
    coverage: '4–15 ft radius',
    bestFor: 'Small turf areas, narrow strips, flower beds',
    waterRate: 'High precipitation rate (1.5–2+ in/hr)',
    dfwNote: 'Most common in DFW residential. Run short cycles (6–10 min) to prevent runoff on clay soil.',
    pressure: '25–30 PSI optimal',
    zones: ['small', 'beds', 'strip'],
  },
  {
    id: 'rotor',
    name: 'Rotor Heads',
    icon: '🌀',
    coverage: '15–50 ft radius',
    bestFor: 'Large turf areas, open lawns',
    waterRate: 'Low precipitation rate (0.4–0.7 in/hr)',
    dfwNote: 'Ideal for DFW Bermuda lawns. Slow rate means less runoff on DFW heavy clay.',
    pressure: '40–65 PSI optimal',
    zones: ['large', 'lawn'],
  },
  {
    id: 'drip',
    name: 'Drip Emitters',
    icon: '💧',
    coverage: '1–2 GPH per emitter',
    bestFor: 'Flower beds, shrubs, trees, vegetable gardens',
    waterRate: 'Micro-delivery directly to root zone',
    dfwNote: 'Best for DFW water restrictions. Beds + shrubs need 2–4 emitters. Run 30–60 min per cycle.',
    pressure: '15–25 PSI with pressure regulator',
    zones: ['beds', 'shrubs', 'drought'],
  },
  {
    id: 'mp-rotator',
    name: 'MP Rotator Heads',
    icon: '⚡',
    coverage: '5–30 ft radius',
    bestFor: 'Replacing spray heads, sloped areas, water-efficient zones',
    waterRate: 'Ultra-low (0.4 in/hr) — matches soil absorption',
    dfwNote: 'DFW water utilities increasingly require or incentivize MP rotators over spray. Use on slopes to prevent runoff.',
    pressure: '25–45 PSI',
    zones: ['slope', 'drought', 'upgrade'],
  },
];

const zones = [
  { id: 'large', label: 'Large Open Lawn', icon: '🌾' },
  { id: 'small', label: 'Small Turf Area', icon: '🌿' },
  { id: 'beds', label: 'Flower Beds', icon: '🌸' },
  { id: 'shrubs', label: 'Shrubs / Trees', icon: '🌳' },
  { id: 'slope', label: 'Sloped Area', icon: '⛰️' },
  { id: 'drought', label: 'Water Conservation', icon: '💰' },
  { id: 'strip', label: 'Narrow Strip', icon: '➡️' },
  { id: 'upgrade', label: 'Replacing Old Spray Heads', icon: '🔄' },
];

export default function DFWSprinklerHeadGuide2026() {
  const [selected, setSelected] = useState<string[]>([]);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const toggle = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  const recommended = headTypes.filter(h =>
    selected.length === 0 || h.zones.some(z => selected.includes(z))
  );

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 48 }}>💦</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '8px 0 4px' }}>DFW Sprinkler Head Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Choose the right irrigation head for DFW water restrictions, clay soil, and Bermuda grass demands.</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 20, borderLeft: '4px solid #F5E642' }}>
          <span style={{ color: '#F5E642', fontWeight: 700 }}>⚠️ DFW Water Restrictions:</span>
          <span style={{ color: '#94a3b8', fontSize: 14, marginLeft: 8 }}>Most DFW cities allow 2 irrigation days/week. Wrong head types cause overwatering violations. Check your city's current stage.</span>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 14 }}>🎯 Select Your Irrigation Zone Type</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {zones.map(z => (
              <button key={z.id} onClick={() => toggle(z.id)}
                style={{ padding: '8px 16px', borderRadius: 20, border: '2px solid', cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  borderColor: selected.includes(z.id) ? '#F5E642' : '#1e3a5f',
                  background: selected.includes(z.id) ? '#F5E642' : '#0A1628',
                  color: selected.includes(z.id) ? '#0A1628' : '#94a3b8' }}>
                {z.icon} {z.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
          {recommended.map(h => (
            <div key={h.id} onClick={() => setActiveCard(activeCard === h.id ? null : h.id)}
              style={{ background: '#0f2040', borderRadius: 12, padding: 20, cursor: 'pointer', border: '2px solid',
                borderColor: activeCard === h.id ? '#F5E642' : '#1e3a5f' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: 24, marginRight: 10 }}>{h.icon}</span>
                  <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 17 }}>{h.name}</span>
                </div>
                <span style={{ color: '#60a5fa', fontSize: 13, fontWeight: 600 }}>{h.coverage}</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 13, margin: '6px 0 4px' }}>{h.bestFor}</p>
              <p style={{ color: '#4ade80', fontSize: 12 }}>{h.waterRate}</p>
              {activeCard === h.id && (
                <div style={{ marginTop: 14 }}>
                  <div style={{ background: '#0A1628', borderRadius: 8, padding: 12, marginBottom: 10 }}>
                    <span style={{ color: '#F5E642', fontSize: 12, fontWeight: 700 }}>🌡️ DFW: </span>
                    <span style={{ color: '#cbd5e1', fontSize: 13 }}>{h.dfwNote}</span>
                  </div>
                  <div style={{ color: '#60a5fa', fontSize: 13 }}>⚙️ Pressure: {h.pressure}</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>💦 Get a DFW Irrigation Quote</p>
          <p style={{ color: '#94a3b8', fontSize: 13 }}>ProLnk connects you with licensed irrigation pros in Dallas-Fort Worth.</p>
        </div>
      </div>
    </div>
  );
}