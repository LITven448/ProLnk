import { useState } from 'react';

const challenges = [
  {
    id: 'clay',
    label: '🧱 Blackland Prairie Clay',
    content: [
      'DFW sits on Blackland Prairie — the worst expansive clay soil in the US',
      'Clay expands up to 30% in volume when wet, shrinks drastically when dry',
      'This movement creates forces that crack and shift foundations constantly',
      'No other major US metro has this level of soil instability across the region',
      'Every DFW homeowner must manage their soil moisture year-round',
      'Concrete piers are preferred over steel in DFW due to soil corrosivity',
    ],
  },
  {
    id: 'cycles',
    label: '🌧️ Dramatic Wet/Dry Cycles',
    content: [
      'DFW gets 37 inches of rain/year but in extreme feast-or-famine patterns',
      'Wet springs followed by brutal dry summers create rapid soil swings',
      'A 3-month dry stretch can cause 2–4 inches of differential settlement',
      'Installing soaker hoses around the perimeter is standard DFW practice',
      'Run soaker hoses 20–30 minutes daily when no rain for 7+ days',
      'Gutters and downspout extensions are foundation protection, not luxury',
    ],
  },
  {
    id: 'capital',
    label: '🏆 Foundation Repair Capital of the US',
    content: [
      'DFW has more foundation repair companies per capita than any US city',
      'Estimates vary widely — always get 3+ quotes before signing anything',
      'National average foundation repair: $4,500; DFW average: $6,000–$12,000',
      'Structural warranty transfer is a major factor in DFW home sales',
      'Always ask if warranty is transferable and what exclusions apply',
      'ProLnk vets foundation contractors — unlicensed work is common here',
    ],
  },
  {
    id: 'moisture',
    label: '💧 Active Moisture Management',
    content: [
      'Most US homeowners never think about foundation moisture — DFW owners must',
      'Create a moisture management calendar: daily checks April–October',
      'Soil should feel like a wrung-out sponge at 6 inches depth',
      'Flower beds against the house can help retain moisture in dry months',
      'Avoid large trees within 20 feet — roots drink moisture, destabilize soil',
      'French drains redirect water away; soaker hoses add it back — both needed',
    ],
  },
  {
    id: 'signs',
    label: '⚠️ Early Warning Signs',
    content: [
      'Sticking doors or windows in spring/summer = soil drying and shrinking',
      'Diagonal cracks from door corners = differential settlement in progress',
      'Gaps between walls and ceiling = foundation movement, not just settling',
      'Sloping floors more than 1 inch per 20 feet = get an evaluation now',
      'Exterior brick stair-step cracks = pier failure or soil loss underneath',
      'Annual foundation inspection (free from most DFW firms) is best practice',
    ],
  },
];

export default function DFWFoundationDFWSpecific2026() {
  const [active, setActive] = useState('clay');
  const current = challenges.find(c => c.id === active)!;

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 42, marginBottom: 12 }}>🏗️🧱</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: '0 0 10px' }}>
            What Makes DFW Foundation Different — 2026 Guide
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 15, margin: 0 }}>
            DFW is the foundation repair capital of the US. Blackland Prairie clay makes it unavoidable — here's what every homeowner must know.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28, justifyContent: 'center' }}>
          {challenges.map(c => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              style={{
                padding: '10px 16px', borderRadius: 8, border: '2px solid',
                borderColor: active === c.id ? '#F5E642′ : '#1e3a5f',
                background: active === c.id ? '#F5E642′ : '#0f2240',
                color: active === c.id ? '#0A1628′ : '#cbd5e1',
                fontWeight: 700, cursor: 'pointer', fontSize: 13,
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div style={{ background: '#0f2240', border: '2px solid #F5E642', borderRadius: 12, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginTop: 0, marginBottom: 18 }}>
            {current.label}
          </h2>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {current.content.map((item, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
                <span style={{ color: '#F5E642', marginTop: 2, flexShrink: 0 }}>→</span>
                <span style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.5 }}>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 28, background: '#0f2240', borderRadius: 12, padding: 22, textAlign: 'center', border: '1px solid #1e3a5f' }}>
          <p style={{ color: '#94a3b8', fontSize: 14, margin: '0 0 14px' }}>
            🏠 Need a vetted DFW foundation specialist?
          </p>
          <a
            href="https://prolnk.io"
            style={{ display: 'inline-block', background: '#F5E642', color: '#0A1628', padding: '12px 28px', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 15 }}
          >
            Connect via ProLnk — Free for Homeowners
          </a>
        </div>

        <p style={{ color: '#475569', fontSize: 12, textAlign: 'center', marginTop: 24 }}>
          ProLnk DFW Foundation Guide 2026 · Serving Dallas–Fort Worth homeowners · prolnk.io
        </p>
      </div>
    </div>
  );
}
