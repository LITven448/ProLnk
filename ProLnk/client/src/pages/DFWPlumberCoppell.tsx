import { useState } from 'react';

const services = [
  { id: 'water-heater', label: '🚿 Water Heater Replacement' },
  { id: 'pipe-repair', label: '🔧 Pipe Repair / Repiping' },
  { id: 'drain', label: '🌀 Drain Cleaning' },
  { id: 'fixture', label: '🪠 Fixture Upgrade' },
  { id: 'sewer', label: '🏗️ Sewer Line Service' },
  { id: 'leak', label: '💧 Leak Detection & Repair' },
];

const costData: Record<string, { standard: string; premium: string; standardDetails: string[]; premiumDetails: string[] }> = {
  'water-heater': {
    standard: '$900 – $1,400',
    premium: '$2,200 – $4,500',
    standardDetails: ['40-gal tank water heater', 'Standard install', '6-year warranty', '1 brand choice'],
    premiumDetails: ['Tankless on-demand system', 'Whole-home capacity', '12-year warranty', 'Brand of choice + smart controls'],
  },
  'pipe-repair': {
    standard: '$350 – $900',
    premium: '$4,500 – $14,000',
    standardDetails: ['Spot repair of failed section', 'PEX or CPVC patch', 'Same-day fix typical', 'Limited lifetime on repair'],
    premiumDetails: ['Full house repipe in PEX-A', 'Manifold system with shutoffs per fixture', 'Clean access restoration', 'Lifetime workmanship warranty'],
  },
  'drain': {
    standard: '$150 – $350',
    premium: '$600 – $1,800',
    standardDetails: ['Snaking single drain', 'Standard auger equipment', 'Clears most blockages', '30-day guarantee'],
    premiumDetails: ['Hydro-jetting entire drain system', 'Camera inspection included', 'Grease & scale removal', '1-year clear-flow guarantee'],
  },
  'fixture': {
    standard: '$120 – $380',
    premium: '$800 – $3,200',
    standardDetails: ['Builder-grade fixture install', 'Customer supplies fixture', 'Standard valves', '1-year labor warranty'],
    premiumDetails: ['Designer fixture selection & install', 'Thermostatic valves', 'Rough-in adjustments included', 'Lifetime fixture support'],
  },
  'sewer': {
    standard: '$350 – $900',
    premium: '$5,000 – $18,000',
    standardDetails: ['Sectional cleaning', 'Basic camera scope', 'Spot repair if needed', 'Stoppage guarantee 90 days'],
    premiumDetails: ['Full sewer line replacement', 'Trenchless where possible', 'City permit & inspection', '25-year pipe warranty'],
  },
  'leak': {
    standard: '$200 – $550',
    premium: '$900 – $3,500',
    standardDetails: ['Standard pressure test', 'Visual inspection', 'Acoustic detection basic', 'Repair of found leak'],
    premiumDetails: ['Electronic leak detection system', 'Thermal imaging scan', 'Full access & repair', 'Report for insurance claim'],
  },
};

export default function DFWPlumberCoppell() {
  const [selected, setSelected] = useState('');
  const data = selected ? costData[selected] : null;

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>

        <div style={{ borderBottom: '3px solid #F5E642', paddingBottom: 24, marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
            🏆 COPPELL TX — UPSCALE SUBURB SPECIALISTS
          </div>
          <h1 style={{ fontSize: 42, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
            Coppell Plumbers<br />Who Match Your Standards
          </h1>
          <p style={{ color: '#a0aec0', fontSize: 18, marginTop: 16, maxWidth: 640 }}>
            Coppell homeowners expect more — and our vetted plumbers deliver it. Premium materials, certified technicians, and workmanship warranties that protect your investment.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { icon: '🏫', label: 'Top-Rated Schools', detail: 'CISD drives home values' },
            { icon: '🏡', label: '1990s–2000s Builds', detail: 'Quality original construction' },
            { icon: '💰', label: 'High Property Values', detail: 'Protect your investment' },
            { icon: '⭐', label: 'Quality First', detail: 'Not just the cheapest bid' },
          ].map((item) => (
            <div key={item.label} style={{ backgroundColor: '#111f35', border: '1px solid #1e3a5f', borderRadius: 12, padding: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
              <div style={{ color: '#a0aec0', fontSize: 14 }}>{item.detail}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#111f35', border: '2px solid #F5E642', borderRadius: 16, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginTop: 0, marginBottom: 8 }}>
            💰 Standard vs Premium Cost Comparison
          </h2>
          <p style={{ color: '#a0aec0', marginBottom: 24 }}>Select the service you need to see a transparent side-by-side comparison of what you get at each tier.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10, marginBottom: 28 }}>
            {services.map((svc) => (
              <button
                key={svc.id}
                onClick={() => setSelected(svc.id)}
                style={{
                  padding: '12px 8px',
                  backgroundColor: selected === svc.id ? '#F5E642′ : '#0A1628',
                  color: selected === svc.id ? '#0A1628′ : '#fff',
                  border: `1px solid ${selected === svc.id ? '#F5E642' : '#1e3a5f'}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 13,
                  textAlign: 'left',
                }}
              >
                {svc.label}
              </button>
            ))}
          </div>

          {data && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f' }}>
                <div style={{ color: '#a0aec0', fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 12 }}>STANDARD TIER</div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: 24, marginBottom: 16 }}>{data.standard}</div>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {data.standardDetails.map((d) => (
                    <li key={d} style={{ color: '#a0aec0', marginBottom: 8, fontSize: 14 }}>{d}</li>
                  ))}
                </ul>
              </div>
              <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 24, border: '2px solid #F5E642′ }}>
                <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 12, letterSpacing: 1, marginBottom: 12 }}>⭐ PREMIUM TIER</div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 24, marginBottom: 16 }}>{data.premium}</div>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {data.premiumDetails.map((d) => (
                    <li key={d} style={{ color: '#e2e8f0', marginBottom: 8, fontSize: 14 }}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#111f35', borderRadius: 16, padding: 28, marginBottom: 40, border: '1px solid #1e3a5f' }}>
          <h3 style={{ marginTop: 0, marginBottom: 16, color: '#F5E642′ }}>Why Coppell Homeowners Choose Premium</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
            {[
              { icon: '🏠', text: 'Your home\’s value justifies doing it right the first time' },
              { icon: '📋', text: 'Better materials mean fewer service calls over 10+ years' },
              { icon: '🔒', text: 'Warranty transfers to buyers — a real selling point' },
            ].map((item) => (
              <div key={item.text} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <span style={{ color: '#a0aec0', lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#F5E642', borderRadius: 16, padding: 32, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontSize: 26, fontWeight: 800, marginBottom: 8 }}>Get a Coppell Plumber Quote Today</div>
          <p style={{ color: '#1a2f4a', marginBottom: 24 }}>Licensed, insured, background-checked. Matched to your neighborhood and your standards.</p>
          <button style={{ backgroundColor: '#0A1628', color: '#F5E642', fontWeight: 800, fontSize: 17, padding: '16px 40px', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Get My Free Quote 🏆
          </button>
        </div>

      </div>
    </div>
  );
}
