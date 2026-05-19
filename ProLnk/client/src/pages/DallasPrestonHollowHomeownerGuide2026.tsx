import { useState } from 'react';

export default function DallasPrestonHollowHomeownerGuide2026() {
  const [feature, setFeature] = useState<string>('');

  const features = [
    {
      id: 'multi-hvac', label: '🌡️ Multi-Zone HVAC System', desc: '3–8 zones, commercial-grade equipment',
      scope: ['Annual full-system commissioning by certified tech ($800–$2,000)', 'Filter replacement every 30–60 days across all zones', 'Refrigerant level check per zone annually', 'Smart thermostat calibration and firmware updates', 'Ductwork inspection every 5 years for custom homes'],
      contractors: 'Requires Trane, Carrier, or Lennox authorized commercial-grade HVAC firm',
      annual: '$3,000–$8,000/yr depending on system size'
    },
    {
      id: 'smart-home', label: '🏠 Smart Home Integration', desc: 'Crestron, Lutron, Savant, or Control4',
      scope: ['Annual system refresh and firmware update ($500–$1,500)', 'Network infrastructure review (mesh WiFi, switches)', 'AV equipment calibration and cleaning', 'Lighting scene reprogramming as needs evolve', 'Security system integration testing'],
      contractors: 'Only certified integrators for your platform — Crestron and Savant require factory-trained techs',
      annual: '$2,000–$6,000/yr for full smart home maintenance contract'
    },
    {
      id: 'pool-spa', label: '🏊 Pool, Spa, and Water Features', desc: 'Custom pools with automation and water features',
      scope: ['Weekly chemical balance and cleaning ($200–$400/mo)', 'Annual drain and acid wash for plaster pools', 'Pump and filter annual service', 'Heater inspection before each season', 'Automation system software updates'],
      contractors: 'Specialty pool companies only — Preston Hollow estates often have complex hydraulic systems',
      annual: '$6,000–$15,000/yr including chemicals, service, and repairs'
    },
    {
      id: 'generator', label: '⚡ Whole-Home Generator', desc: 'Standby generator 22kW–150kW',
      scope: ['Weekly self-test cycle monitoring', 'Annual professional service (oil, filters, plugs, load bank test)', 'Transfer switch inspection and cleaning', 'Fuel supply management (propane or natural gas)', 'Load calculation review if adding major appliances'],
      contractors: 'Generac, Kohler, or Cummins authorized service dealer only',
      annual: '$800–$2,500/yr depending on generator size'
    },
  ];

  const prestonTips = [
    { icon: '🔑', tip: 'Preston Hollow contractors charge premium rates — use ProLnk to benchmark quotes and verify credentials' },
    { icon: '🌳', tip: 'Estate-grade tree service requires certified arborists — large canopy oaks need annual health assessment' },
    { icon: '🔒', tip: 'High-value estates need estate management coordination — one trusted point of contact for all contractor access' },
    { icon: '🏗️', tip: 'Any structural work near NorthPark or Inwood corridor needs soil engineer due to expansive clays' },
    { icon: '💎', tip: 'Use specialty insurance riders for smart home tech and custom finishes — standard policies leave gaps' },
  ];

  const selected = features.find(f => f.id === feature);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48 }}>👑</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#F5E642', margin: '12px 0 8px' }}>Preston Hollow Homeowner Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Dallas most affluent neighborhood — complex estate systems, specialty contractors</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔧 Select Estate Feature</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {features.map(f => (
              <button key={f.id} onClick={() => setFeature(f.id)}
                style={{ background: feature === f.id ? '#F5E642' : '#0f1f3d', color: feature === f.id ? '#0A1628' : '#fff', border: '1px solid #334155', borderRadius: 8, padding: '14px 18px', textAlign: 'left', cursor: 'pointer', fontSize: 15, fontWeight: 600 }}>
                {f.label} <span style={{ fontWeight: 400, fontSize: 13, opacity: 0.75 }}>— {f.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {selected && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ background: '#1e293b', borderRadius: 12, padding: 20, marginBottom: 16 }}>
              <h3 style={{ color: '#F5E642', marginBottom: 12, fontSize: 15 }}>📋 Annual Maintenance Scope</h3>
              {selected.scope.map((s, i) => <p key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 8 }}>• {s}</p>)}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ background: '#1e293b', borderRadius: 10, padding: 16 }}>
                <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>🏢 Contractor Requirements</p>
                <p style={{ color: '#cbd5e1', fontSize: 13, margin: 0 }}>{selected.contractors}</p>
              </div>
              <div style={{ background: '#1e293b', borderRadius: 10, padding: 16 }}>
                <p style={{ color: '#F5E642', fontWeight: 700, fontSize: 14, marginBottom: 8 }}>💰 Annual Cost Estimate</p>
                <p style={{ color: '#cbd5e1', fontSize: 13, margin: 0 }}>{selected.annual}</p>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>💡 Preston Hollow Insider Tips</h2>
          {prestonTips.map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>{t.icon}</span>
              <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{t.tip}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32, padding: 20, background: '#F5E642', borderRadius: 12 }}>
          <p style={{ color: '#0A1628', fontWeight: 700, fontSize: 16, margin: 0 }}>🔧 ProLnk pre-vets specialty contractors for Preston Hollow estate needs.</p>
        </div>
      </div>
    </div>
  );
}
