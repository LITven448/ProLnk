import { useState } from 'react';

const rebates = [
  { id: 'thermostat', label: 'Smart Thermostat', amount: 85, federal: 0, category: 'Controls', requirement: 'ENERGY STAR certified, contractor installation', stackable: true },
  { id: 'heatpump', label: 'Heat Pump (standard)', amount: 300, federal: 2000, category: '"HVAC"', requirement: '16+ SEER2, certified contractor', stackable: true },
  { id: 'heatpumppremium', label: 'Heat Pump (premium efficiency)', amount: 500, federal: 2000, category: 'HVAC', requirement: '18+ SEER2, AHRI certified', stackable: true },
  { id: 'poolpump', label: 'Variable Speed Pool Pump', amount: 100, federal: 0, category: 'Pool', requirement: 'Two-speed or variable, 1HP+', stackable: true },
  { id: 'ac', label: 'AC Unit Upgrade', amount: 150, federal: 600, category: 'HVAC', requirement: '15+ SEER2, replace pre-2006 unit', stackable: true },
  { id: 'weatherization', label: 'Weatherization Package', amount: 200, federal: 1200, category: 'Envelope', requirement: 'Blower door test, air sealing + insulation', stackable: true },
  { id: 'waterheater', label: 'Heat Pump Water Heater', amount: 100, federal: 2000, category: 'Water', requirement: 'ENERGY STAR, UEF 2.0+', stackable: true },
];

export default function DFWOncorRebateGuide() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const chosen = rebates.filter(r => selected.includes(r.id));
  const oncorTotal = chosen.reduce((s, r) => s + r.amount, 0);
  const federalTotal = chosen.reduce((s, r) => s + r.federal, 0);
  const grandTotal = oncorTotal + federalTotal;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8ECF0', fontFamily: 'system-ui,sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642' }}>⚡ DFW Energy Programs</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>Oncor Rebate Guide — DFW</h1>
        <p style={{ color: '#9BA8B8', marginBottom: 32, fontSize: 15 }}>
          Select your planned upgrades to calculate available Oncor rebates, federal IRA credits, and contractor requirements.
        </p>

        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#F5E642' }}>🔧 Select Your Planned Upgrades</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {rebates.map(r => (
            <div key={r.id} onClick={() => toggle(r.id)} style={{
              background: selected.includes(r.id) ? 'rgba(245,230,66,0.1)' : '#111D2E',
              border: `1px solid ${selected.includes(r.id) ? '#F5E642' : '#1E2D42'}`,
              borderRadius: 10, padding: '14px 16px', cursor: 'pointer', transition: 'all .2s'
            }}>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{r.label}</div>
              <div style={{ fontSize: 12, color: '#9BA8B8', marginBottom: 6 }}>{r.category} · {r.requirement}</div>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>Oncor ${r.amount}</span>
                {r.federal > 0 && <span style={{ color: '#4ADE80', fontSize: 13 }}>+Fed ${r.federal}</span>}
              </div>
            </div>
          ))}
        </div>

        {chosen.length > 0 && (
          <div style={{ background: '#111D2E', border: '1px solid #1E2D42', borderRadius: 12, padding: 24, marginBottom: 32 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: '#F5E642' }}>📊 Your Rebate Summary</h3>
            {chosen.map(r => (
              <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1E2D42', fontSize: 14 }}>
                <span>{r.label}</span>
                <span style={{ color: '#F5E642' }}>Oncor ${r.amount}{r.federal > 0 ? ` + Fed $${r.federal}` : ''}</span>
              </div>
            ))}
            <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 18 }}>
              <span>Total Potential Savings</span>
              <span style={{ color: '#F5E642' }}>${grandTotal.toLocaleString()}</span>
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: '#9BA8B8' }}>
              Oncor ${oncorTotal} + Federal Tax Credits ${federalTotal} · Stacking confirmed eligible
            </div>
          </div>
        )}

        <div style={{ background: '#111D2E', border: '1px solid #1E2D42', borderRadius: 12, padding: 24 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>📋 How to Apply for Oncor Rebates</h3>
          {['Use an Oncor-approved contractor — they submit rebates on your behalf','Contractor must be registered in Oncor’s Trade Ally Network','Equipment must meet minimum efficiency ratings (verified at time of install)','Rebate submitted within 90 days of installation','Allow 6–8 weeks for rebate processing and payment'].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 14 }}>
              <span style={{ color: '#F5E642', marginTop: 1 }}>✓</span><span style={{ color: '#9BA8B8' }}>{s}</span>
            </div>
          ))}
          <div style={{ marginTop: 16, background: 'rgba(245,230,66,0.08)', borderRadius: 8, padding: 12, fontSize: 13, color: '#F5E642' }}>
            💡 Oncor rebates and federal IRA credits can be stacked on the same project — claim both!
          </div>
        </div>
      </div>
    </div>
  );
}
