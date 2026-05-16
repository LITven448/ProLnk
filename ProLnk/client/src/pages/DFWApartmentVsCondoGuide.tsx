import { useState } from 'react';

const data = {
  apartment: {
    label: 'Apartment',
    icon: '🏢',
    ownership: 'You rent — no equity built',
    maintenance: 'Landlord handles most repairs',
    hoa: 'None (amenities included in rent)',
    flexibility: 'Move out with 30–60 day notice',
    buildWealth: false,
  },
  condo: {
    label: 'Condo',
    icon: '🏙️',
    ownership: 'You own the interior unit',
    maintenance: 'You handle interior; HOA handles exterior',
    hoa: '$200–$600/mo typical in DFW',
    flexibility: 'Sell when ready — less liquid than stocks',
    buildWealth: true,
  },
};

const dfwCondoMarkets = [
  { area: 'Uptown Dallas', avgPrice: '$375K', hoa: '$350/mo', notes: 'High walkability, strong appreciation' },
  { area: 'Downtown Fort Worth', avgPrice: '$295K', hoa: '$280/mo', notes: 'Arts district, growing demand' },
  { area: 'Legacy West Plano', avgPrice: '$420K', hoa: '$410/mo', notes: 'Corporate hub, luxury finishes' },
  { area: 'Deep Ellum Dallas', avgPrice: '$310K', hoa: '$290/mo', notes: 'Entertainment district, younger buyers' },
];

export default function DFWApartmentVsCondoGuide() {
  const [lifestyle, setLifestyle] = useState('');
  const [budget, setBudget] = useState('');
  const [result, setResult] = useState<null | string>(null);

  function getRecommendation() {
    const b = parseInt(budget.replace(/\D/g, ''), 10);
    if (!lifestyle || !budget) return;
    let rec = '';
    if (b < 200000 || lifestyle === 'renting') {
      rec = '🏢 Apartment fits your current situation. Focus on saving for a down payment — DFW condos start around $250K.';
    } else if (b >= 200000 && b < 350000) {
      rec = '🏙️ A condo in Downtown Fort Worth or Deep Ellum may be within reach. Budget ~$1,800–$2,400/mo total (mortgage + HOA).';
    } else {
      rec = '🏙️ You have strong condo buying power in DFW. Uptown Dallas or Legacy West Plano offer premium units with high appreciation.';
    }
    setResult(rec);
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', color: '#0A1628', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1 }}>DFW REAL ESTATE GUIDE</div>
          <h1 style={{ color: '#fff', fontSize: 28, margin: 0 }}>Apartment vs Condo in DFW</h1>
          <p style={{ color: '#94a3b8', marginTop: 10, fontSize: 15 }}>
            Renting and owning feel similar on the surface — but one builds equity and the other doesn't.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
          {Object.values(data).map(d => (
            <div key={d.label} style={{ background: '#fff', borderRadius: 10, padding: 20, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{d.icon}</div>
              <h2 style={{ fontSize: 18, margin: '0 0 12px' }}>{d.label}</h2>
              <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.8 }}>
                <div><strong>Ownership:</strong> {d.ownership}</div>
                <div><strong>Maintenance:</strong> {d.maintenance}</div>
                <div><strong>HOA:</strong> {d.hoa}</div>
                <div><strong>Flexibility:</strong> {d.flexibility}</div>
                <div style={{ marginTop: 8, color: d.buildWealth ? '#16a34a' : '#dc2626', fontWeight: 600 }}>
                  {d.buildWealth ? '✅ Builds equity' : '❌ No equity built'}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '1px solid #e2e8f0', marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, margin: '0 0 16px' }}>🗺️ DFW Condo Market Overview</h2>
          {dfwCondoMarkets.map(m => (
            <div key={m.area} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 12, marginBottom: 12 }}>
              <div style={{ fontWeight: 600 }}>{m.area}</div>
              <div style={{ fontSize: 13, color: '#475569' }}>Avg price: {m.avgPrice} · HOA: {m.hoa} · {m.notes}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '2px solid #F5E642' }}>
          <h2 style={{ fontSize: 18, margin: '0 0 16px' }}>🔍 Apartment vs Condo Recommender</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Your current lifestyle</label>
            <select value={lifestyle} onChange={e => setLifestyle(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}>
              <option value="">Select...</option>
              <option value="renting">Currently renting, not ready to buy</option>
              <option value="buying">Ready to buy, want to build equity</option>
              <option value="flexible">Flexible — open to either</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Budget (purchase price or annual rent)</label>
            <input type="text" placeholder="e.g. $300,000 or $25,000/yr" value={budget} onChange={e => setBudget(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, boxSizing: 'border-box' }} />
          </div>
          <button onClick={getRecommendation}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '12px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 15 }}>
            Get My DFW Recommendation
          </button>
          {result && (
            <div style={{ marginTop: 16, background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, padding: 16, fontSize: 14 }}>
              {result}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
