import { useState } from 'react';

export default function DFWSolarPanelElectricalGuide2026() {
  const [size, setSize] = useState('');

  const systems = [
    { id: '5kw', label: '☀️ 5 kW System', scope: 'Panel assessment required. Most 200A panels can handle 5kW without upgrade.', items: ['Interconnection disconnect switch', 'Net meter socket upgrade (Oncor)', 'Permit + city inspection'], cost: '$800–1,500', days: '1 day' },
    { id: '10kw', label: '☀️ 10 kW System', scope: 'Panel upgrade likely needed if currently 100A. 200A minimum for 10kW solar.', items: ['200A panel upgrade if needed', 'Solar disconnect + production meter', 'Oncor net metering application'], cost: '$1,500–3,500', days: '1–2 days' },
    { id: '15kw', label: '☀️ 15 kW System', scope: '200A panel required. Subpanel may be needed. Utility review takes 10–30 days.', items: ['200A panel + potential subpanel', 'Solar-ready load center', 'Oncor capacity review (10–30 days)', 'Full permit + inspection package'], cost: '$2,500–5,000', days: '2–3 days work + utility wait' },
    { id: 'battery', label: '🔋 Solar + Battery', scope: 'Most complex. Battery backup requires additional wiring for critical loads. No export without interconnection.', items: ['Critical load subpanel', 'Battery inverter wiring', 'Transfer switch or auto-cutover', 'Backup circuit labeling'], cost: '$3,500–7,000', days: '2–4 days' },
  ];

  const selected = systems.find(s => s.id === size);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>☀️</div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#F5E642', margin: '0 0 10px' }}>DFW Solar Panel Electrical Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: '16px' }}>What a licensed DFW electrician does for your solar install</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {[
            { icon: '🏢', label: 'Utility', value: 'Oncor DFW' },
            { icon: '📋', label: 'Permit', value: 'City + Oncor' },
            { icon: '🔌', label: 'Net Metering', value: 'Available in DFW' },
            { icon: '⚡', label: 'Panel Req', value: '200A Minimum' },
          ].map(stat => (
            <div key={stat.label} style={{ backgroundColor: '#132036', borderRadius: '10px', padding: '18px', textAlign: 'center' }}>
              <div style={{ fontSize: '28px' }}>{stat.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: '12px', marginTop: '6px' }}>{stat.label}</div>
              <div style={{ color: '#F5E642', fontWeight: '700', fontSize: '15px', marginTop: '4px' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={{ backgroundColor: '#132036', borderRadius: '12px', padding: '28px', marginBottom: '28px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', margin: '0 0 16px' }}>⚡ Select Your Solar System Size</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '10px' }}>
            {systems.map(s => (
              <button key={s.id} onClick={() => setSize(s.id === size ? '' : s.id)}
                style={{ padding: '14px', borderRadius: '8px', border: '2px solid', cursor: 'pointer', fontSize: '14px', fontWeight: '600', transition: 'all 0.2s',
                  borderColor: size === s.id ? '#F5E642′ : '#1e3a5f', backgroundColor: size === s.id ? '#1a2e4a' : '#0d1f35', color: size === s.id ? '#F5E642' : '#cbd5e1' }}>
                {s.label}
              </button>
            ))}
          </div>
          {selected && (
            <div style={{ marginTop: '20px', backgroundColor: '#0d1f35', borderRadius: '10px', padding: '20px', borderLeft: '4px solid #F5E642′ }}>
              <h3 style={{ color: '#F5E642', margin: '0 0 10px', fontSize: '18px' }}>{selected.label} — Electrical Scope</h3>
              <p style={{ color: '#94a3b8', margin: '0 0 14px', lineHeight: '1.6′ }}>{selected.scope}</p>
              <ul style={{ margin: '0 0 14px', paddingLeft: '20px' }}>
                {selected.items.map((item, i) => <li key={i} style={{ color: '#cbd5e1', marginBottom: '6px', lineHeight: '1.5′ }}>{item}</li>)}
              </ul>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <span style={{ color: '#4ade80', fontWeight: '700′ }}>💰 Electrical Cost: {selected.cost}</span>
                <span style={{ color: '#60a5fa', fontWeight: '700′ }}>⏱ {selected.days}</span>
              </div>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: '#132036', borderRadius: '12px', padding: '28px' }}>
          <h2 style={{ color: '#F5E642', fontSize: '20px', margin: '0 0 14px' }}>⚠️ DFW Solar Electrical Notes</h2>
          {['Cannot export to grid without Oncor interconnection agreement (takes 10–30 days)', 'Battery systems without interconnection = zero export allowed by Oncor', 'TDLR licensed electrician required — solar company cannot do electrical work without license', 'All solar electrical work requires city permit and inspection in DFW municipalities'].map((note, i) => (
            <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '10px', color: '#cbd5e1', fontSize: '14px' }}>
              <span style={{ color: '#F5E642', flexShrink: 0 }}>▸</span>
              <span>{note}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}