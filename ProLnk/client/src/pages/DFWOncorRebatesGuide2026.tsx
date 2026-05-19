import { useState } from 'react';

export default function DFWOncorRebatesGuide2026() {
  const [selected, setSelected] = useState<string | null>(null);

  const rebates = [
    {
      id: 'thermostat', icon: '🌡️', name: 'Smart Thermostat',
      oncor: 85, federal: 0, state: 0,
      note: 'Oncor $85 rebate — Nest, Ecobee, Honeywell eligible. Must be installed by licensed HVAC tech.',
    },
    {
      id: 'insulation', icon: '🏠', name: 'Attic Insulation',
      oncor: 400, federal: 1200, state: 0,
      note: 'Oncor up to $0.10/sqft (max $400). Federal 25C credit: 30% up to $1,200/yr.',
    },
    {
      id: 'ev', icon: '⚡', name: 'EV Charger (Level 2)',
      oncor: 250, federal: 1000, state: 0,
      note: 'Oncor $250 rebate + federal 30% credit (Form 8911) up to $1,000 for residential.',
    },
    {
      id: 'hvac', icon: '❄️', name: 'High-Efficiency HVAC',
      oncor: 500, federal: 2000, state: 0,
      note: 'Oncor up to $500 for 16+ SEER2 heat pump. Federal 25C: 30% up to $2,000/yr.',
    },
    {
      id: 'solar', icon: '☀️', name: 'Solar PV System',
      oncor: 0, federal: 7500, state: 0,
      note: 'No Oncor rebate for solar. Federal ITC: 30% of system cost (no cap). TX has no state income tax credit.',
    },
    {
      id: 'battery', icon: '🔋', name: 'Home Battery Storage',
      oncor: 0, federal: 5000, state: 0,
      note: 'No Oncor rebate. Federal ITC: 30% of battery cost when paired with solar.',
    },
  ];

  const sel = rebates.find(r => r.id === selected);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>💵</span>
          <h1 style={{ fontSize: 28, color: '#F5E642', margin: 0 }}>DFW Oncor Rebates Guide 2026</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Stack Oncor utility rebates with federal tax credits to maximize savings on home energy upgrades.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 24 }}>
          {rebates.map(r => (
            <button key={r.id} onClick={() => setSelected(r.id === selected ? null : r.id)}
              style={{ padding: 16, borderRadius: 12, border: `2px solid ${selected === r.id ? '#F5E642' : '#334155'}`,
                background: selected === r.id ? '#1e3a5f' : '#132040', color: '#fff', cursor: 'pointer', textAlign: 'center' }}>
              <div style={{ fontSize: 26 }}>{r.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13, marginTop: 4 }}>{r.name}</div>
              <div style={{ color: '#4ade80', fontWeight: 700, fontSize: 15, marginTop: 4 }}>
                ${(r.oncor + r.federal).toLocaleString()}+
              </div>
              <div style={{ color: '#94a3b8', fontSize: 11 }}>total available</div>
            </button>
          ))}
        </div>

        {sel && (
          <div style={{ background: '#132040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h2 style={{ color: '#F5E642', marginTop: 0 }}>{sel.icon} {sel.name} — Incentive Stack</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 16 }}>
              {[
                { label: 'Oncor Rebate', value: sel.oncor > 0 ? `$${sel.oncor}` : 'None' },
                { label: 'Federal Tax Credit', value: sel.federal > 0 ? `up to $${sel.federal.toLocaleString()}` : 'None' },
                { label: 'TX State Credit', value: 'None (no state income tax)' },
              ].map(item => (
                <div key={item.label} style={{ background: '#0A1628', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#F5E642′ }}>{item.value}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>{item.label}</div>
                </div>
              ))}
            </div>
            <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0 }}>{sel.note}</p>
          </div>
        )}

        <div style={{ background: '#132040', borderRadius: 12, padding: 24 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0 }}>📋 How to Claim Oncor Rebates</h2>
          <ol style={{ color: '#cbd5e1', lineHeight: 1.8, paddingLeft: 20 }}>
            <li>Complete upgrade with licensed contractor (keep all invoices)</li>
            <li>Submit rebate application at oncor.com/rebates within 90 days of install</li>
            <li>Include contractor license number, equipment model, and efficiency rating</li>
            <li>Rebate check mailed within 6–8 weeks</li>
            <li>File federal tax credit on Form 5695 (residential) or 8911 (EV charger) with your tax return</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
