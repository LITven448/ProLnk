import { useState } from 'react';

const risks = [
  {
    id: 'failure',
    label: 'Failure Risk by Age',
    icon: '💥',
    rows: [
      { age: '1–5 years', risk: 'Very Low', color: '#22c55e', note: 'Manufacturer warranty active' },
      { age: '6–10 years', risk: 'Low–Moderate', color: '#84cc16', note: 'Annual tune-up critical' },
      { age: '11–14 years', risk: 'High', color: '#f59e0b', note: 'DFW heat stress accelerates wear' },
      { age: '15+ years', risk: 'Critical', color: '#ef4444', note: 'Replace before DFW summer' },
    ],
  },
  {
    id: 'financial',
    label: 'Financial Risk of Delay',
    icon: '💸',
    rows: [
      { age: 'Delay 1 season', risk: '$0–$500', color: '#22c55e', note: 'Minor repair likely' },
      { age: 'Delay 2 seasons', risk: '$500–$2,000', color: '#84cc16', note: 'Compressor strain builds' },
      { age: 'Delay 3+ seasons', risk: '$2,000–$5,000+', color: '#ef4444', note: 'Emergency call in 105°F heat = premium pricing' },
      { age: 'Total failure in July', risk: '$8,000–$16,000', color: '#ef4444', note: 'No leverage, emergency install' },
    ],
  },
  {
    id: 'comfort',
    label: 'Comfort Risk in DFW Summer',
    icon: '🥵',
    rows: [
      { age: 'System 90% efficient', risk: 'Minimal', color: '#22c55e', note: '1–2°F off target on peak days' },
      { age: 'System 75% efficient', risk: 'Moderate', color: '#f59e0b', note: 'Struggle above 100°F' },
      { age: 'System 60% efficient', risk: 'High', color: '#ef4444', note: 'Cannot maintain 78°F in Dallas July' },
      { age: 'System failing', risk: 'Dangerous', color: '#7f1d1d', note: 'Health risk for elderly/children' },
    ],
  },
];

const mitigation = [
  { icon: '📅', text: 'Schedule spring tune-up in March before DFW heat arrives' },
  { icon: '💧', text: 'Replace air filters every 30 days during DFW peak season' },
  { icon: '🌡️', text: 'Set thermostat to 78°F — every degree below 78 adds 6–8% energy cost' },
  { icon: '🛡️', text: 'Add HVAC protection plan ($15–$25/mo) for units 8+ years old' },
  { icon: '💰', text: 'Budget $500/yr for DFW HVAC maintenance fund' },
];

export default function DFWHVACRiskManagement() {
  const [active, setActive] = useState(risks[0]);
  const [tolerance, setTolerance] = useState('moderate');

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40 }}>🛡️</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '8px 0 4px' }}>
            DFW HVAC Risk Management
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>How to protect yourself from HVAC risk in the DFW heat</p>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
          {risks.map(r => (
            <button
              key={r.id}
              onClick={() => setActive(r)}
              style={{
                padding: '10px 18px',
                borderRadius: 8,
                border: '2px solid',
                borderColor: active.id === r.id ? '#F5E642' : '#1e3a5f',
                background: active.id === r.id ? '#F5E642' : '#112240',
                color: active.id === r.id ? '#0A1628' : '#94a3b8',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              {r.icon} {r.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 14, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>{active.icon} {active.label}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {active.rows.map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#0A1628', borderRadius: 8, padding: '12px 16px' }}>
                <div style={{ minWidth: 130, fontSize: 13, fontWeight: 600 }}>{row.age}</div>
                <div style={{ minWidth: 100 }}>
                  <span style={{ background: row.color, color: '#0A1628', padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{row.risk}</span>
                </div>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>{row.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 14, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🛡️ DFW Risk Mitigation Strategies</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {mitigation.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: '#0A1628', borderRadius: 8, padding: '12px 16px' }}>
                <span style={{ fontSize: 20 }}>{m.icon}</span>
                <span style={{ color: '#e2e8f0', fontSize: 14 }}>{m.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>
            🏠 TrustyPro-verified pros assess your DFW HVAC risk for free
          </p>
          <div style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', padding: '10px 24px', borderRadius: 8, fontWeight: 700, fontSize: 14 }}>
            Get My DFW Risk Assessment
          </div>
        </div>
      </div>
    </div>
  );
}
