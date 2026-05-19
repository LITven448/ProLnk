import { useState } from 'react';

const topics = [
  {
    id: 'refrigerant',
    label: '🧪 Refrigerant Changes',
    title: 'R-410A Phase-Out Is Here',
    status: 'New systems must use R-32 or R-454B as of Jan 1, 2026. R-410A refrigerant is no longer manufactured for new equipment. Existing R-410A systems can still be serviced, but recharge costs have risen 40–60% due to limited supply.',
    action: 'If your system uses R-410A and needs a major recharge, compare recharge cost vs. replacement cost carefully.',
  },
  {
    id: 'heatpump',
    label: '🔁 Heat Pump Adoption',
    title: 'Heat Pumps Are the 2026 Standard',
    status: 'Texas updated its energy code in 2025 to incentivize heat pump adoption. New construction in DFW increasingly defaults to dual-fuel or all-electric heat pumps. IRS credits up to $2,000 for qualifying heat pump installs remain active through 2032.',
    action: 'Ask your ProLnk HVAC pro whether a heat pump makes economic sense for your home size and usage.',
  },
  {
    id: 'codes',
    label: '📋 Code Minimums',
    title: '2026 Texas HVAC Code Minimums',
    status: 'Minimum SEER2 rating for new central AC equipment is now 14.3 in the South climate zone (includes all of DFW). Systems below this rating cannot be installed new. Existing below-minimum systems are grandfathered for repair.',
    action: 'When replacing your system, confirm your contractor is quoting SEER2-compliant equipment — not legacy SEER-rated units.',
  },
  {
    id: 'ercot',
    label: '⚡ ERCOT Grid',
    title: 'Grid Improvements for Summer 2026',
    status: 'ERCOT added 8.4 GW of new generation capacity since 2023. Demand response programs now offer bill credits for homeowners who allow brief thermostat adjustments during peak events. Smart thermostats are required for enrollment.',
    action: 'Enroll in an ERCOT demand-response program via your utility before June 1 to earn summer credits.',
  },
  {
    id: 'prolnk',
    label: '🔗 ProLnk’s Role',
    title: 'How ProLnk Fits Into DFW HVAC in 2026',
    status: 'ProLnk matches DFW homeowners with vetted, licensed HVAC professionals in their specific ZIP code. No call centers, no upsell pressure. Quotes are transparent. Pros are background-checked and trade-licensed.',
    action: 'Sign up at prolnk.io to get matched with a vetted DFW HVAC pro — free for homeowners.',
  },
];

export default function DFWHVACDFWKnowledge2026() {
  const [selected, setSelected] = useState(topics[0].id);
  const active = topics.find(t => t.id === selected)!;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#F5E642', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>DFW HVAC 2026</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: '0 0 16px' }}>What Every DFW Homeowner Needs to Know</h1>
          <p style={{ color: '#94A3B8', fontSize: 16, maxWidth: 580, margin: '0 auto' }}>
            2026 brings real changes to HVAC rules, refrigerants, and grid programs. Select a topic to see current status.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 36 }}>
          {topics.map(t => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              style={{
                padding: '10px 18px', borderRadius: 8, border: '2px solid',
                borderColor: selected === t.id ? '#F5E642′ : '#1E3A5F',
                backgroundColor: selected === t.id ? '#F5E642′ : '#0F2340',
                color: selected === t.id ? '#0A1628′ : '#CBD5E1',
                fontWeight: 600, cursor: 'pointer', fontSize: 14,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ backgroundColor: '#0F2340', borderRadius: 16, padding: 36, border: '1px solid #1E3A5F' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#F5E642', marginTop: 0 }}>{active.title}</h2>
          <p style={{ color: '#CBD5E1', fontSize: 16, lineHeight: 1.7, marginBottom: 24 }}>{active.status}</p>
          <div style={{ backgroundColor: '#0A1628', borderRadius: 10, padding: '18px 22px', borderLeft: '4px solid #F5E642′ }}>
            <div style={{ fontSize: 12, color: '#F5E642', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>Your 2026 Action</div>
            <p style={{ color: '#E2E8F0', margin: 0, fontSize: 15 }}>{active.action}</p>
          </div>
        </div>

        <div style={{ marginTop: 40, textAlign: 'center', backgroundColor: '#0F2340', borderRadius: 12, padding: 28, border: '1px solid #F5E642′ }}>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Get Matched with a Vetted DFW HVAC Pro</div>
          <p style={{ color: '#94A3B8', marginBottom: 20 }}>Free for homeowners. No pressure. Just licensed pros in your ZIP code.</p>
          <a href="https://prolnk.io" style={{ backgroundColor: '#F5E642', color: '#0A1628', padding: '14px 32px', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}>
            Join ProLnk — It's Free
          </a>
        </div>
      </div>
    </div>
  );
}
