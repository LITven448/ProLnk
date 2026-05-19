import { useState } from 'react';

const profiles = [
  {
    type: 'Small Home (<1,500 sqft)', icon: '🏠', bill: 145,
    priorities: [
      { item: 'Smart Thermostat', savings: '$22/mo', cost: '$180-280', rebate: '$50 Oncor' },
      { item: 'Solar Window Screens', savings: '$18/mo', cost: '$400-600', rebate: 'None' },
      { item: 'Attic Insulation (R-38)', savings: '$30/mo', cost: '$1,200-1,800', rebate: '$200 Oncor' },
    ]
  },
  {
    type: 'Mid Home (1,500–2,800 sqft)', icon: '🏡', bill: 187,
    priorities: [
      { item: 'HVAC Tune-Up + Filter', savings: '$25/mo', cost: '$150-300', rebate: '$100 Oncor' },
      { item: 'Attic Insulation (R-49)', savings: '$38/mo', cost: '$1,800-2,800', rebate: '$200 Oncor' },
      { item: 'Smart Thermostat', savings: '$28/mo', cost: '$180-280', rebate: '$50 Oncor' },
    ]
  },
  {
    type: 'Large Home (2,800+ sqft)', icon: '🏰', bill: 260,
    priorities: [
      { item: 'HVAC Replacement (16+ SEER)', savings: '$65/mo', cost: '$6,000-9,000', rebate: '$300 Oncor' },
      { item: 'Attic Air Sealing + Insulation', savings: '$55/mo', cost: '$3,500-5,000', rebate: '$200 Oncor' },
      { item: 'Solar Screens (all S/W windows)', savings: '$35/mo', cost: '$1,200-1,800', rebate: 'None' },
    ]
  },
];

export default function DFWEnergyEfficiency2026() {
  const [selected, setSelected] = useState(profiles[1]);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2 }}>PROLNK — DFW MARKET REPORT</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>DFW Energy Efficiency — 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 24 }}>
          Average DFW electric bill: <span style={{ color: '#f87171', fontWeight: 700 }}>$187/mo</span>. The right upgrades can cut it by <span style={{ color: '#4ade80', fontWeight: 700 }}>30–45%</span> — and Oncor rebates offset upfront costs.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 24 }}>
          {profiles.map(p => (
            <div key={p.type} onClick={() => setSelected(p)}
              style={{ background: selected.type === p.type ? '#1a2f52′ : '#111c35', border: `1px solid ${selected.type === p.type ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: 14, cursor: ’pointer', textAlign: 'center', transition: 'all 0.2s' }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>{p.icon}</div>
              <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.3 }}>{p.type}</div>
              <div style={{ color: '#f87171', fontWeight: 700, marginTop: 6 }}>${p.bill}/mo avg</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111c35', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <div style={{ fontWeight: 700, marginBottom: 14 }}>⚡ Priority Upgrades for {selected.icon} {selected.type}</div>
          {selected.priorities.map((p, i) => (
            <div key={i} style={{ background: '#0d1f3a', borderRadius: 8, padding: 14, marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontWeight: 700 }}>#{i + 1} {p.item}</span>
                <span style={{ color: '#4ade80', fontWeight: 700 }}>{p.savings}</span>
              </div>
              <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#94a3b8′ }}>
                <span>💰 Cost: <span style={{ color: '#cbd5e1′ }}>{p.cost}</span></span>
                <span>🎁 Rebate: <span style={{ color: '#F5E642′ }}>{p.rebate}</span></span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2444', border: '1px solid #F5E642', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🔌 ProLnk Energy Pros</div>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>Every ProLnk contractor for energy work is verified for Oncor rebate paperwork and Texas TDLR licensing — get the savings you qualify for.</p>
        </div>
      </div>
    </div>
  );
}