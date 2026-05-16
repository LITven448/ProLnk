import { useState } from 'react';

const condoMarkets = [
  { area: 'Uptown Dallas', price: '$320K–$650K', hoa: '$300–$550/mo', financing: '✅ Most lenders comfortable', notes: 'High demand, HOA financials usually strong' },
  { area: 'Legacy West Plano', price: '$380K–$720K', hoa: '$350–$600/mo', financing: '✅ Warrantable in most cases', notes: 'Corporate hub, strong HOA management' },
  { area: 'Downtown Fort Worth', price: '$250K–$480K', hoa: '$220–$400/mo', financing: '⚠️ Verify HOA reserves before financing', notes: 'Older buildings, check reserve fund' },
  { area: 'Deep Ellum Dallas', price: '$280K–$420K', hoa: '$240–$380/mo', financing: '⚠️ Some buildings non-warrantable', notes: 'Trendy district, lender scrutiny higher' },
  { area: 'Addison / Richardson', price: '$220K–$380K', hoa: '$180–$320/mo', financing: '✅ Generally straightforward', notes: 'Suburban condo market, more affordable' },
];

const sfVsCondoAppreciation = [
  { year: '2020', sfHome: '8.2%', condo: '5.1%' },
  { year: '2021', sfHome: '22.4%', condo: '14.2%' },
  { year: '2022', sfHome: '3.1%', condo: '2.8%' },
  { year: '2023', sfHome: '1.2%', condo: '0.9%' },
  { year: '2024', sfHome: '4.8%', condo: '3.6%' },
  { year: '2025', sfHome: '5.3%', condo: '4.1%' },
];

export default function DFWCondoBuyingGuide2026() {
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [result, setResult] = useState<null | { area: typeof condoMarkets[0]; notes: string } | { notes: string; area: null }>(null);

  function getOptions() {
    const b = parseInt(budget.replace(/\D/g, ''), 10);
    if (!budget || !location) return;
    const match = condoMarkets.find(m => m.area.toLowerCase().includes(location.toLowerCase()));
    if (match && b >= parseInt(match.price.replace(/\D.*/, ''), 10)) {
      setResult({ area: match, notes: `Your $${b.toLocaleString()} budget works for ${match.area}. Check HOA financials before making an offer — lenders require healthy reserves.` });
    } else if (b < 220000) {
      setResult({ area: null, notes: '⚠️ DFW condos typically start at $220K. Consider Addison/Richardson for the most affordable entry points.' });
    } else {
      setResult({ area: condoMarkets[condoMarkets.length - 1], notes: `Budget of $${b.toLocaleString()} works well in DFW. Addison/Richardson offers the most value, with straightforward financing.` });
    }
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'sans-serif', color: '#0A1628', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '28px 32px', marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: '#F5E642', marginBottom: 8, letterSpacing: 1 }}>DFW CONDO GUIDE · 2026</div>
          <h1 style={{ color: '#fff', fontSize: 28, margin: 0 }}>Buying a Condo in DFW — 2026 Guide</h1>
          <p style={{ color: '#94a3b8', marginTop: 10, fontSize: 15 }}>
            HOA financial health is the single biggest factor banks look at when financing a condo. Know this before you fall in love with a unit.
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '1px solid #e2e8f0', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, margin: '0 0 16px' }}>📈 DFW Appreciation: Condos vs Single-Family Homes</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  {['Year', 'SF Home Appreciation', 'Condo Appreciation'].map(h => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sfVsCondoAppreciation.map(r => (
                  <tr key={r.year} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>{r.year}</td>
                    <td style={{ padding: '10px 12px', color: '#16a34a' }}>{r.sfHome}</td>
                    <td style={{ padding: '10px 12px', color: '#2563eb' }}>{r.condo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 12 }}>Condos appreciate slightly less than SF homes but still build meaningful equity — especially vs renting.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '1px solid #e2e8f0', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, margin: '0 0 4px' }}>🏦 What Banks Look At for Condo Financing</h2>
          <ul style={{ fontSize: 14, color: '#475569', lineHeight: 2, marginTop: 8 }}>
            <li><strong>HOA Reserve Fund:</strong> Must be 10%+ funded — underfunded = loan denied</li>
            <li><strong>Delinquency Rate:</strong> Less than 15% of owners behind on HOA dues</li>
            <li><strong>Commercial Space:</strong> Building can't be more than 25–35% commercial</li>
            <li><strong>Investor Concentration:</strong> Less than 50% rentals typically required</li>
            <li><strong>Warrantability:</strong> Fannie/Freddie approval = better rates</li>
          </ul>
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '1px solid #e2e8f0', marginBottom: 24 }}>
          <h2 style={{ fontSize: 18, margin: '0 0 16px' }}>🗺️ DFW Condo Markets 2026</h2>
          {condoMarkets.map(m => (
            <div key={m.area} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 14, marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
                <span style={{ fontWeight: 700 }}>{m.area}</span>
                <span style={{ fontSize: 13, color: '#0A1628', background: '#F5E642', borderRadius: 4, padding: '2px 8px' }}>{m.price}</span>
              </div>
              <div style={{ fontSize: 13, color: '#475569', marginTop: 4 }}>HOA: {m.hoa} · Financing: {m.financing}</div>
              <div style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{m.notes}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 10, padding: 24, border: '2px solid #F5E642' }}>
          <h2 style={{ fontSize: 18, margin: '0 0 16px' }}>🔍 Find Your DFW Condo Options</h2>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Your budget</label>
            <input type="text" placeholder="e.g. $350,000" value={budget} onChange={e => setBudget(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600 }}>Preferred DFW area</label>
            <select value={location} onChange={e => setLocation(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14 }}>
              <option value="">Select area...</option>
              {condoMarkets.map(m => <option key={m.area} value={m.area}>{m.area}</option>)}
            </select>
          </div>
          <button onClick={getOptions}
            style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '12px 24px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 15 }}>
            Show My Condo Options + HOA Check
          </button>
          {result && (
            <div style={{ marginTop: 16, background: '#eff6ff', border: '1px solid #93c5fd', borderRadius: 8, padding: 16, fontSize: 14 }}>
              <div>{result.notes}</div>
              {result.area && (
                <div style={{ marginTop: 10, fontWeight: 600 }}>
                  Financing outlook: {result.area.financing}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
