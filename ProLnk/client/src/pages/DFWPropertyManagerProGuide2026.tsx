import { useState } from 'react';

const portfolioOptions = [
  { label: '1–5 units', value: 'Starter PM', savings: '$800–2,400/yr', benefits: ['Consistent contractor relationships = lower call-out fees', 'ProLnk match history tracks your best pros', 'Avg 15% faster response vs. one-off requests', 'Access to Charter-tier vetted pros'], annualValue: '~$1,600 saved vs. cold-calling contractors' },
  { label: '6–15 units', value: 'Growing PM', savings: '$3,000–7,500/yr', benefits: ['Volume discount potential with recurring pros', 'Priority dispatch from Charter-tier pros', 'Single dashboard for all unit contractor activity', 'Avg turnover 20% faster with ProLnk network', 'Documented work history for insurance claims'], annualValue: '~$5,200 saved in contractor mgmt efficiency' },
  { label: '16–50 units', value: 'Professional PM', savings: '$9,000–25,000/yr', benefits: ['Dedicated contractor network across all trades', 'Charter-tier pros prioritize high-volume accounts', 'Reduced vacancy via faster turnover cycle', 'Annual maintenance contracts via ProLnk pros', 'Centralized invoice + work order history'], annualValue: '~$16,000 saved annually vs. ad-hoc contractor mgmt' },
  { label: '50+ units', value: 'Enterprise PM', savings: '$30,000–80,000/yr', benefits: ['Enterprise ProLnk account — custom pricing', 'Dedicated account manager for contractor matching', 'Portfolio-wide SLA agreements with top-tier pros', 'Emergency coverage across all locations', 'Bulk reporting for ownership group reviews'], annualValue: '~$50,000 saved — contact ProLnk for enterprise terms' },
];

export default function DFWPropertyManagerProGuide2026() {
  const [selected, setSelected] = useState(0);
  const opt = portfolioOptions[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🗂️</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Property Manager Pro Guide on ProLnk</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>How property managers unlock priority service, volume value, and Charter-tier pros on ProLnk</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: 16, marginBottom: 32 }}>
          {[['Charter Tier', 'Priority Pro Access'], ['15–30%', 'Faster Dispatch for PMs'], ['4 Trades', 'HVAC, Plumbing, Electric, General'], ['$0', 'ProLnk Platform Fee for HOs']].map(([val, lbl]) => (
            <div key={lbl} style={{ background: '#0f1f3d', borderRadius: 10, padding: '16px', textAlign: 'center', border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontSize: 17, fontWeight: 700 }}>{val}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{lbl}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>📊 Portfolio Size → ProLnk Value Estimate</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {portfolioOptions.map((p, i) => (
              <button key={p.label} onClick={() => setSelected(i)} style={{ background: selected === i ? '#F5E642′ : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '8px 14px', fontSize: 13, cursor: 'pointer', fontWeight: selected === i ? 700 : 400 }}>
                {p.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0a1628', borderRadius: 10, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
              <div style={{ color: '#fff', fontWeight: 700 }}>{opt.value}</div>
              <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, borderRadius: 8, padding: '4px 14px', fontSize: 13 }}>Save {opt.savings}</div>
            </div>
            {opt.benefits.map(b => <div key={b} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 7 }}>✅ {b}</div>)}
            <div style={{ background: '#1e3a5f', borderRadius: 8, padding: '12px 16px', marginTop: 14, color: '#F5E642', fontWeight: 700, fontSize: 13 }}>
              💰 {opt.annualValue}
            </div>
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 10 }}>🏆 Charter-Tier Pro Advantages for PMs</h2>
          {['Charter pros ($149/mo) are vetted, licensed, and insured — PM-grade quality', 'Priority routing means PM accounts jump the queue vs. one-off requests', 'Recurring relationships = pros learn your property portfolio over time', 'Volume relationships unlock negotiated rates outside the platform', 'ProLnk tracks work history — full paper trail for owner reporting'].map(t => (
            <div key={t} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 7 }}>• {t}</div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16 }}>Property managers — join ProLnk today</div>
          <div style={{ color: '#0A1628', fontSize: 13, marginTop: 4 }}>Get priority access to DFW Charter-tier pros across all your units. Waitlist now open.</div>
        </div>
      </div>
    </div>
  );
}