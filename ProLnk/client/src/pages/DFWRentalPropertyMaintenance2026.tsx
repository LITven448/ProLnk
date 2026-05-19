import { useState } from 'react';

const unitOptions = [
  { count: '1 unit', budget: '$2,000–3,500', breakdown: [['HVAC filters x12', '$60'], ['Pest control (quarterly)', '$320'], ['Plumbing maintenance', '$400'], ['Appliance service', '$300'], ['Exterior/landscaping', '$600'], ['Misc repairs buffer', '$820–2,020']] },
  { count: '2–4 units', budget: '$4,500–9,000', breakdown: [['HVAC filters all units', '$200'], ['Pest control all units', '$800'], ['Plumbing maintenance', '$1,000'], ['Appliance service', '$800'], ['Exterior/landscaping', '$1,200'], ['Misc repairs buffer', '$2,300–5,000']] },
  { count: '5–10 units', budget: '$12,000–28,000', breakdown: [['HVAC filters all units', '$500'], ['Pest control all units', '$2,000'], ['Plumbing maintenance', '$2,500'], ['Appliance service', '$2,000'], ['Exterior/landscaping', '$3,000'], ['Misc repairs buffer', '$6,000–18,000']] },
  { count: '11–20 units', budget: '$25,000–55,000', breakdown: [['HVAC filters all units', '$1,000'], ['Pest control all units', '$4,000'], ['Plumbing maintenance', '$5,000'], ['Appliance service', '$4,000'], ['Exterior/landscaping', '$6,000'], ['Misc repairs buffer', '$15,000–35,000']] },
];

export default function DFWRentalPropertyMaintenance2026() {
  const [selected, setSelected] = useState(0);
  const opt = unitOptions[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔑</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Rental Property Maintenance Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Annual maintenance budgets and responsibilities for DFW rental landlords</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 32 }}>
          {[['$2,000–3,500', 'Per Unit Annual Budget'], ['Monthly', 'HVAC Filter Interval'], ['Quarterly', 'Pest Control Cadence'], ['Landlord', 'HVAC Repair Responsibility']].map(([val, lbl]) => (
            <div key={lbl} style={{ background: '#0f1f3d', borderRadius: 10, padding: '18px 16px', textAlign: 'center', border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 700 }}>{val}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{lbl}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>📊 Portfolio Size → Annual Maintenance Budget</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {unitOptions.map((u, i) => (
              <button key={u.count} onClick={() => setSelected(i)} style={{ background: selected === i ? '#F5E642' : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '8px 14px', fontSize: 13, cursor: 'pointer', fontWeight: selected === i ? 700 : 400 }}>
                {u.count}
              </button>
            ))}
          </div>
          <div style={{ background: '#0a1628', borderRadius: 10, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ color: '#fff', fontWeight: 700 }}>{opt.count} — Annual Budget</div>
              <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, borderRadius: 8, padding: '4px 14px', fontSize: 14 }}>{opt.budget}</div>
            </div>
            {opt.breakdown.map(([item, cost]) => (
              <div key={item} style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', fontSize: 13, marginBottom: 7 }}>
                <span>🔧 {item}</span>
                <span style={{ color: '#F5E642' }}>{cost}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 10 }}>✅ Landlord-Required Maintenance in Texas</h2>
          {['HVAC system — landlord must maintain working heating and cooling', 'Plumbing — hot water, leaks, and sewage all landlord responsibility', 'Pest control — required unless lease shifts duty to tenant', 'Smoke and CO detectors — inspect and replace batteries annually', 'Structural integrity — roof, foundation, exterior doors and windows'].map(t => (
            <div key={t} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 7 }}>• {t}</div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16 }}>ProLnk makes maintenance fast</div>
          <div style={{ color: '#0A1628', fontSize: 13, marginTop: 4 }}>Get quotes from licensed DFW contractors the same day — HVAC, plumbing, pest, and more.</div>
        </div>
      </div>
    </div>
  );
}