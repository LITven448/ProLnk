import { useState } from 'react';

const cities = [
  { name: 'Dallas', permit: 'Required', permitNote: 'Dallas requires STR permit via Permit Center. Annual fee ~$200. Must meet zoning requirements.', hoa: '⚠️ HOA often bans STR — verify CC&Rs before listing', status: '🟡 Regulated', turnover: 'High (2–5 day stays)', maintenance: ['Same-day deep clean between guests', 'HVAC filters monthly minimum', 'Inspect appliances after each guest', 'Pest control quarterly', 'ProLnk connects to vetted DFW cleaners and maintenance pros'] },
  { name: 'Fort Worth', permit: 'Not Required (City)', permitNote: 'Fort Worth has no citywide STR permit as of 2026. HOA rules still apply in many neighborhoods.', hoa: '⚠️ HOA rules vary — check your subdivision CC&Rs', status: '🟢 Less Regulated', turnover: 'High (2–4 day stays)', maintenance: ['Deep clean between every guest', 'HVAC filters monthly', 'Inspect plumbing fixtures weekly', 'Pest control quarterly'] },
  { name: 'Frisco', permit: 'Check HOA First', permitNote: 'Frisco has no specific STR ordinance as of 2026, but most subdivisions have HOA restrictions that effectively ban STR.', hoa: '🔴 Most HOAs ban STR — verify before listing', status: '🔴 Effectively Restricted', turnover: 'High if allowed', maintenance: ['HOA compliance review required first', 'If allowed: full STR maintenance protocol', 'ProLnk for quick maintenance between bookings'] },
  { name: 'Plano', permit: 'Not Required (City)', permitNote: 'No city STR permit required in Plano as of 2026. Standard property maintenance rules apply.', hoa: '⚠️ Many HOAs restrict or ban STR — verify', status: '🟡 HOA-Dependent', turnover: 'Moderate-High', maintenance: ['Clean between every guest', 'Monthly HVAC filter change', 'Appliance and plumbing checks', 'Quarterly pest control'] },
  { name: 'Irving', permit: 'Not Required', permitNote: 'No STR permit requirement in Irving as of 2026. Near DFW Airport — strong short-term demand.', hoa: '✅ Many non-HOA properties available', status: '🟢 STR-Friendly', turnover: 'Very High (1–3 day stays)', maintenance: ['Deep clean between every stay', 'HVAC monthly', 'High turnover = fast ProLnk contractor access critical', 'Appliance check weekly'] },
];

export default function DFWShortTermRentalGuide2026() {
  const [selected, setSelected] = useState(0);
  const city = cities[selected];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, margin: '8px 0 4px' }}>DFW Short-Term Rental Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 15 }}>Airbnb/VRBO regulations by city, HOA rules, and maintenance requirements</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 16, marginBottom: 32 }}>
          {[['$2,800–5,500', 'DFW STR Avg Monthly Revenue'], ['3–5x', 'Higher Turnover vs LTR'], ['$300–600', 'Monthly Cleaning Budget'], ['Quarterly', 'Pest Control Minimum']].map(([val, lbl]) => (
            <div key={lbl} style={{ background: '#0f1f3d', borderRadius: 10, padding: '16px', textAlign: 'center', border: '1px solid #1e3a5f' }}>
              <div style={{ color: '#F5E642', fontSize: 17, fontWeight: 700 }}>{val}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{lbl}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f1f3d', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #1e3a5f' }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>🗺️ City → STR Regulatory Status + Maintenance Guide</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {cities.map((c, i) => (
              <button key={c.name} onClick={() => setSelected(i)} style={{ background: selected === i ? '#F5E642′ : '#1e3a5f', color: selected === i ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '8px 14px', fontSize: 13, cursor: 'pointer', fontWeight: selected === i ? 700 : 400 }}>
                {c.name}
              </button>
            ))}
          </div>
          <div style={{ background: '#0a1628', borderRadius: 10, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>{city.name}</div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{city.status}</div>
            </div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>🏛️ Permit: <span style={{ color: '#fff' }}>{city.permit}</span></div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 8 }}>{city.permitNote}</div>
            <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 14 }}>{city.hoa}</div>
            <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8, fontSize: 13 }}>🔧 Maintenance Requirements:</div>
            {city.maintenance.map(m => <div key={m} style={{ color: '#cbd5e1', fontSize: 13, marginBottom: 6 }}>• {m}</div>)}
          </div>
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 16 }}>STR maintenance demands speed — use ProLnk</div>
          <div style={{ color: '#0A1628', fontSize: 13, marginTop: 4 }}>Vetted DFW cleaners, HVAC techs, and maintenance pros available fast between guest stays.</div>
        </div>
      </div>
    </div>
  );
}