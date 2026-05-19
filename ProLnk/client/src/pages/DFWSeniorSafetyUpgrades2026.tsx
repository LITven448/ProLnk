import { useState } from 'react';

const concerns = [
  {
    id: 'falls',
    label: '🚶 Fall Prevention',
    upgrades: [
      { name: '🪢 Grab Bars (Bathroom)', cost: '$200–500 installed', impact: 'HIGH', note: 'Tub/shower and toilet — installed into wall studs, not drywall anchors' },
      { name: '🔆 Improved Lighting', cost: '$150–400 installed', impact: 'HIGH', note: 'Motion-sensor nightlights in hallways, bathroom, bedroom — eliminates dark navigation' },
      { name: '🧦 Non-Slip Flooring', cost: '$300–1,200', impact: 'HIGH', note: 'Anti-slip strips on tile, replace loose rugs — rugs cause 50%+ of senior in-home falls' },
      { name: '🪜 Stair Handrails', cost: '$200–600 installed', impact: 'MEDIUM', note: 'Both sides of every staircase — graspable round rail, not flat board' },
      { name: '🛏️ Bed Rail', cost: '$80–200', impact: 'MEDIUM', note: 'Prevents rolling and assists standing — pair with bed height adjustment' },
    ],
  },
  {
    id: 'mobility',
    label: '♿ Mobility Assistance',
    upgrades: [
      { name: '🚿 Walk-In Shower Conversion', cost: '$2,500–6,000', impact: 'HIGH', note: 'Remove tub lip — zero-entry shower eliminates largest fall hazard in the home' },
      { name: '🚽 Raised Toilet Seat', cost: '$50–150 + installation', impact: 'HIGH', note: 'Adds 3–6 inches of height — reduces knee/hip strain and fall risk standing up' },
      { name: '🔑 Smart Lock / Keypad', cost: '$150–350 installed', impact: 'MEDIUM', note: 'Eliminates fumbling with keys — keypad or phone-based entry, no lockouts' },
      { name: '🛁 Walk-In Tub', cost: '$3,000–10,000', impact: 'MEDIUM', note: 'Door entry eliminates step-over — includes built-in grab bars and seat' },
      { name: '🪟 Lever Door Handles', cost: '$100–300', impact: 'LOW', note: 'Replaces round knobs — easier to grip with arthritis or limited hand strength' },
    ],
  },
  {
    id: 'emergency',
    label: '🆘 Emergency Preparedness',
    upgrades: [
      { name: '📱 Medical Alert System', cost: '$25–50/month', impact: 'HIGH', note: 'Life Alert, Medical Guardian — GPS + fall detection, 24/7 monitoring center' },
      { name: '🔥 Monitored Smoke/CO Detectors', cost: '$200–500', impact: 'HIGH', note: 'Replace battery-only units — monitored systems alert 911 automatically' },
      { name: '🔔 Video Doorbell', cost: '$150–300 installed', impact: 'MEDIUM', note: 'See who is at door without opening it — critical scam protection layer' },
      { name: '💡 Smart Home Hub', cost: '$100–300', impact: 'MEDIUM', note: 'Alexa/Google — voice control for lights, locks, thermostat, emergency calls' },
      { name: '🌡️ Remote Temp Monitor', cost: '$50–100', impact: 'LOW', note: 'Family members can check home temp remotely — alerts for dangerous heat/cold' },
    ],
  },
];

const impactColor: Record<string, string> = { HIGH: '#22c55e', MEDIUM: '#f59e0b', LOW: '#94a3b8′ };

export default function DFWSeniorSafetyUpgrades2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = concerns.find((c) => c.id === selected);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🛡️</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.6rem', fontWeight: 700, margin: '0 0 0.5rem' }}>
            DFW Senior Home Safety Upgrades 2026
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0 }}>
            Practical upgrades to help DFW seniors age in place safely — costs, impact, and what to prioritize first
          </p>
        </div>

        <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: 8, padding: '1rem', marginBottom: '2rem' }}>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#F5E642′ }}>
            📊 <strong>Falls are the #1 cause of injury death for seniors 65+.</strong> Most fall-prevention upgrades cost under $500 and can be installed by a ProLnk-verified contractor in a single visit.
          </p>
        </div>

        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem' }}>
          Select your mobility concern to see your safety upgrade priority list:
        </p>

        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {concerns.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(selected === c.id ? null : c.id)}
              style={{
                background: selected === c.id ? '#F5E642′ : '#1e2d45',
                color: selected === c.id ? '#0A1628′ : '#fff',
                border: '1px solid #334155',
                borderRadius: 8,
                padding: '0.9rem 1.2rem',
                textAlign: 'left',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '1rem',
                transition: 'all 0.15s',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#1e2d45', border: '1px solid #334155', borderRadius: 10, padding: '1.5rem', marginBottom: '2rem' }}>
            <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: '1.1rem' }}>{active.label} — Priority Upgrades</h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {active.upgrades.map((u, i) => (
                <div key={i} style={{ background: '#0A1628', borderRadius: 8, padding: '1rem', border: '1px solid #1e3a5f' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{u.name}</span>
                    <span style={{ color: impactColor[u.impact], fontSize: '0.75rem', fontWeight: 700, marginLeft: '0.5rem', whiteSpace: 'nowrap' }}>{u.impact} IMPACT</span>
                  </div>
                  <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.3rem' }}>{u.cost}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{u.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', background: '#1e2d45', borderRadius: 10, padding: '1.5rem' }}>
          <p style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 0.5rem', fontSize: '1rem' }}>
            🔒 ProLnk — Verified Accessibility & Safety Contractors in DFW
          </p>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem' }}>
            Grab bar installation, walk-in shower conversions, smart lock setup — all through verified pros. No guessing.
          </p>
        </div>
      </div>
    </div>
  );
}
