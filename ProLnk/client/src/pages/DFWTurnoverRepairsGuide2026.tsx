import { useState } from 'react';

const ageGroups = [
  { label: '0–5 yrs old', scope: 'Light touch-up', items: ['Touch-up paint ($300–600)', 'Carpet steam clean ($200)', 'HVAC filter replacement', 'Deep clean ($250–400)', 'Re-key locks ($80)', 'Inspect appliances'], estimate: '$1,000–1,500′ },
  { label: '6–10 yrs old', scope: 'Moderate refresh', items: ['Full interior paint ($600–1,000)', 'Carpet clean or patch ($350)', 'HVAC service + filter', 'Deep clean ($300–450)', 'Minor drywall repairs ($200)', 'Faucet/fixture check'], estimate: '$1,800–2,800′ },
  { label: '11–20 yrs old', scope: 'Significant refresh', items: ['Full paint ($900–1,400)', 'Carpet replace 1–2 rooms ($800)', 'HVAC tune-up or repair', 'Deep clean ($400)', 'Appliance inspect/replace', 'Door hardware update', 'Caulk bathrooms/kitchen'], estimate: '$2,500–4,000′ },
  { label: '20+ yrs old', scope: 'Full renovation scope', items: ['Paint entire unit ($1,200+)', 'Full carpet/flooring replace ($1,500+)', 'HVAC evaluate for replacement', 'Deep clean ($500)', 'Update fixtures + hardware', 'Inspect plumbing + electrical', 'Consider countertop/cabinet refresh'], estimate: '$4,000–7,000+' },
];

export default function DFWTurnoverRepairsGuide2026() {
  const [selected, setSelected] = useState(0);
  const ag = ageGroups[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🔄</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Rental Turnover Repairs Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Between-tenant repair scope & cost estimates for DFW landlords</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 32 }}>
          {[['$2,500–4,500', 'Avg DFW Turnover Cost'], ['18–25 days', 'Avg Vacancy Window'], ['$800–1,500', 'Paint Cost Range'], ['$200–1,500', 'Carpet Clean/Replace']].map(([val, lbl]) => (
            <div key={lbl} style={{ background: '#0f1f3d', borderRadius: 10, padding: '18px 16px', textAlign: 'center', border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontSize: 18, fontWeight: 700 }}>{val}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{lbl}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>🏚️ Property Age → Turnover Repair Scope</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {ageGroups.map((ag, i) => (
              <button key={ag.label} onClick={() => setSelected(i)} style={{ background: selected === i ? '#F5E642′ : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '8px 14px', fontSize: 13, cursor: 'pointer', fontWeight: selected === i ? 700 : 400 }}>
                {ag.label}
              </button>
            ))}
          </div>
          <div style={{ background: '#0a1628', borderRadius: 10, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 15 }}>{ag.scope}</div>
              <div style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, borderRadius: 8, padding: '4px 12px', fontSize: 14 }}>Est: {ag.estimate}</div>
            </div>
            {ag.items.map(item => (
              <div key={item} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 7 }}>🔧 {item}</div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 20, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 10 }}>💡 DFW Turnover Tips</h2>
          {['Schedule contractors before tenant move-out date to minimize vacancy', 'Paint + carpet are the highest-ROI turnover investments in DFW', 'ProLnk connects to vetted painters, carpet pros, and cleaners fast', 'Document everything with photos before and after for deposit disputes'].map(t => (
            <div key={t} style={{ color: '#94a3b8', fontSize: 13, marginBottom: 7 }}>• {t}</div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16 }}>Turn units faster with ProLnk</div>
          <div style={{ color: '#0A1628', fontSize: 13, marginTop: 4 }}>Get quotes from licensed DFW contractors — painters, cleaners, HVAC, flooring & more.</div>
        </div>
      </div>
    </div>
  );
}