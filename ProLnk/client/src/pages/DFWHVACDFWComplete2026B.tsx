import { useState } from 'react';

const concerns = [
  {
    id: 'heat-pump',
    label: 'New Heat Pump Models',
    guidance: 'Carrier, Trane, and Lennox have released 2026 DFW-optimized heat pumps rated for Texas heat extremes. Variable-speed compressors now standard on mid-tier and above. Look for "DFW Climate Series" branding when shopping.',
  },
  {
    id: 'seer2',
    label: 'SEER2 15 Minimum Standard',
    guidance: 'As of Jan 1, 2026 all new residential HVAC installs in Texas must meet SEER2 15 minimum. Older SEER 14 units can still be serviced but cannot be replaced with equivalent older units. Budget 8-12% more for compliant systems.',
  },
  {
    id: 'refrigerant',
    label: 'Refrigerant Transition Timeline',
    guidance: 'R-410A phaseout accelerated. After Dec 31, 2025 no new R-410A equipment may be manufactured. DFW contractors are stocking R-32 and R-454B systems. If your unit uses R-22 or R-410A and fails, replacement is now the cost-effective path.',
  },
  {
    id: 'efficiency',
    label: 'Tax Credits & Efficiency',
    guidance: '2026 federal HVAC tax credits: up to $2,000 for heat pumps meeting efficiency thresholds, $600 for qualifying central AC units. Texas offers no additional state rebate but many DFW utilities (Oncor, TXU) still run seasonal efficiency rebate programs.',
  },
  {
    id: 'sizing',
    label: 'Proper Load Calculations',
    guidance: '2026 DFW code now requires Manual J load calculations for all new installs. Oversized units are a leading cause of humidity problems and short cycling. Demand a signed load calc report from any contractor before approving a new system.',
  },
  {
    id: 'warranty',
    label: 'Extended Warranty Changes',
    guidance: 'Most major manufacturers have shifted to 10-year parts warranties on R-32 and R-454B systems registered within 60 days of install. Labor warranties vary widely — ProLnk vetted contractors offer 1-year minimum labor coverage on all new DFW installs.',
  },
];

export default function DFWHVACDFWComplete2026B() {
  const [selected, setSelected] = useState<string | null>(null);

  const active = concerns.find(c => c.id === selected);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
          DFW HVAC 2026 — PART B
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, lineHeight: 1.2 }}>
          2026 DFW HVAC Complete Guide
        </h1>
        <p style={{ color: '#94A3B8', fontSize: 16, marginBottom: 36, lineHeight: 1.6 }}>
          New heat pump models, SEER2 standards, refrigerant transitions, and what DFW homeowners need to know heading into summer 2026.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginBottom: 32 }}>
          {concerns.map(c => (
            <button
              key={c.id}
              onClick={() => setSelected(selected === c.id ? null : c.id)}
              style={{
                background: selected === c.id ? '#F5E642' : '#0F2040',
                color: selected === c.id ? '#0A1628' : '#fff',
                border: '1px solid',
                borderColor: selected === c.id ? '#F5E642' : '#1E3A5F',
                borderRadius: 10,
                padding: '14px 16px',
                textAlign: 'left',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: 14,
                transition: 'all 0.15s',
              }}
            >
              ⚡ {c.label}
            </button>
          ))}
        </div>

        {active && (
          <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 14, padding: 28, marginBottom: 32 }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
              2026 Guidance
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{active.label}</h2>
            <p style={{ color: '#CBD5E1', lineHeight: 1.7, fontSize: 15 }}>{active.guidance}</p>
          </div>
        )}

        <div style={{ background: '#0F2040', border: '1px solid #1E3A5F', borderRadius: 14, padding: 24 }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🏠 ProLnk DFW HVAC Network</div>
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6 }}>
            All ProLnk DFW HVAC contractors are verified for 2026 SEER2 compliance and R-454B/R-32 installation capability. Charter members receive priority matching during peak summer demand.
          </p>
        </div>
      </div>
    </div>
  );
}
