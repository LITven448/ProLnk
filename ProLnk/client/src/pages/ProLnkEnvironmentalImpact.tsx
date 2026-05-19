import { useState } from 'react';

const envPriorities = {
  efficiency: {
    label: 'Energy Efficiency',
    icon: '⚡',
    headline: 'Connecting DFW homeowners to energy efficiency pros',
    points: [
      { icon: '🌡️', title: 'HVAC efficiency upgrades', detail: 'DFW summers push HVAC systems to the limit. ProLnk connects homeowners with TDLR-certified HVAC technicians who specialize in high-efficiency equipment and proper load calculations — reducing energy consumption by up to 30%.' },
      { icon: '💡', title: 'LED and smart home upgrades', detail: 'Licensed electricians in the ProLnk network offer LED retrofits, smart thermostats, and home automation that reduce electricity consumption. All upgrades documented in the Home Health Vault for resale value.' },
      { icon: '🏠', title: 'Insulation and air sealing', detail: 'Many DFW homes built before 2000 are under-insulated. ProLnk matches homeowners with certified insulation contractors who use blower door tests and thermal imaging for precision upgrades.' },
      { icon: '📊', title: 'Home Health Vault energy tracking', detail: 'Every energy efficiency upgrade is recorded in the Home Health Vault with before/after performance data, helping homeowners track their energy investment and demonstrate value at resale.' },
    ],
  },
  water: {
    label: 'Water Conservation',
    icon: '💧',
    headline: 'Protecting North Texas water resources',
    points: [
      { icon: '🔧', title: 'Leak detection and repair', detail: 'A single slab leak can waste 100+ gallons per day. ProLnk verified plumbers use electronic leak detection to find and repair leaks with minimal excavation, protecting DFW water supply.' },
      { icon: '🌿', title: 'Low-flow fixture upgrades', detail: 'ProLnk connects homeowners with licensed plumbers who install EPA WaterSense certified fixtures — reducing indoor water use by up to 20% with zero sacrifice in performance.' },
      { icon: '🌱', title: 'Irrigation efficiency', detail: 'Outdated irrigation systems waste thousands of gallons per year. ProLnk landscaping pros install smart controllers and drip systems that cut outdoor water use in half.' },
      { icon: '📋', title: 'Water upgrade documentation', detail: 'All water efficiency upgrades are documented in the Home Health Vault including fixture model numbers, installation dates, and estimated annual savings for insurance and resale purposes.' },
    ],
  },
  waste: {
    label: 'Waste Reduction',
    icon: '♻️',
    headline: 'Fewer wasted trips, less material waste, smarter jobs',
    points: [
      { icon: '🎯', title: 'AI matching eliminates wasted service calls', detail: 'ProLnk AI matching sends the right pro the first time — a plumber does not show up to do electrical work. Fewer wasted trips mean fewer vehicle emissions and lower carbon footprint per job.' },
      { icon: '🏗️', title: 'Repair over replace philosophy', detail: 'ProLnk prioritizes qualified repair specialists. The Home Health Vault tracks repair history so contractors know what has already been done — avoiding redundant work and unnecessary material waste.' },
      { icon: '🔄', title: 'Material recycling programs', detail: 'ProLnk is building partnerships with DFW recycling facilities for HVAC equipment disposal, old plumbing fixtures, and construction debris — keeping waste out of North Texas landfills.' },
      { icon: '📍', title: 'Territory matching reduces drive time', detail: 'Territory-based lead assignment means pros travel shorter distances to jobs. Less drive time per job means less fuel consumption and lower per-job carbon emissions across the entire network.' },
    ],
  },
  solar: {
    label: 'Solar and Clean Energy',
    icon: '☀️',
    headline: 'Accelerating DFW solar adoption through trusted pros',
    points: [
      { icon: '☀️', title: 'Verified solar installers', detail: 'Texas has no specific solar license requirement — which means the market is full of unqualified installers. ProLnk only works with NABCEP-certified solar professionals verified through our accreditation process.' },
      { icon: '🔋', title: 'Battery storage integration', detail: 'ProLnk connects homeowners with certified electricians who can pair solar installs with battery storage — providing backup power during Texas grid events and reducing peak demand charges.' },
      { icon: '💰', title: 'Incentive documentation', detail: 'Federal solar tax credits and local utility rebates require proper documentation. ProLnk pros provide and upload all required documentation to the Home Health Vault for seamless tax filing.' },
      { icon: '📈', title: 'ROI tracking in the Vault', detail: 'Solar performance data, utility bill reductions, and incentive captures are all tracked in the Home Health Vault — giving homeowners a real-time view of their clean energy return on investment.' },
    ],
  },
};

type EnvKey = keyof typeof envPriorities;

export default function ProLnkEnvironmentalImpact() {
  const [active, setActive] = useState<EnvKey>('efficiency');
  const e = envPriorities[active];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌱</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#F5E642', margin: '0 0 12px' }}>ProLnk Environmental Impact</h1>
          <p style={{ color: '#94a3b8', fontSize: 16, maxWidth: 560, margin: '0 auto' }}>Smarter home services means greener homes. ProLnk connects DFW homeowners with the right pros for efficiency upgrades, conservation, and clean energy.</p>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 36, flexWrap: 'wrap' }}>
          {(Object.keys(envPriorities) as EnvKey[]).map(k => (
            <button key={k} onClick={() => setActive(k)} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 14, background: active === k ? '#F5E642′ : '#1e2d4a', color: active === k ? '#0A1628' : '#94a3b8' }}>
              {envPriorities[k].icon} {envPriorities[k].label}
            </button>
          ))}
        </div>

        <div style={{ background: '#1e2d4a', borderRadius: 16, padding: 28, border: '1px solid #2d4a7a', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, fontWeight: 700, marginBottom: 24 }}>{e.icon} {e.headline}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {e.points.map(pt => (
              <div key={pt.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 26, flexShrink: 0 }}>{pt.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: 15, marginBottom: 5 }}>{pt.title}</div>
                  <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.65 }}>{pt.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[['30%', 'Energy reduction from HVAC upgrades'], ['100%', 'Vault-documented green upgrades'], ['Zero', 'Wasted service calls with AI matching']].map(([val, lbl]) => (
            <div key={lbl} style={{ background: '#1e2d4a', borderRadius: 12, padding: 18, textAlign: 'center', border: '1px solid #2d4a7a' }}>
              <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700 }}>{val}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4, lineHeight: 1.4 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
