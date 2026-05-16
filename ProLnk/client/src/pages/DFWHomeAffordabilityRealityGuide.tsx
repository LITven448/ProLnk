import { useState } from 'react';

const pricePoints = [
  {
    price: '$300,000',
    key: '300k',
    mortgage: '$1,520',
    propTax: '$625',
    insurance: '$185',
    hoa: '$75',
    utilities: '$220',
    total: '$2,625',
    income: '$95,000',
    areas: ['Garland (older areas)', 'Mesquite', 'Lancaster', 'Balch Springs'],
    reality: 'Older homes (1970s-1990s), likely need some updates. Foundation inspection critical. Limited new construction options.',
    downPayment: '$9,000 – $60,000',
  },
  {
    price: '$400,000',
    key: '400k',
    mortgage: '$2,027',
    propTax: '$833',
    insurance: '$225',
    hoa: '$95',
    utilities: '$240',
    total: '$3,420',
    income: '$125,000',
    areas: ['Rockwall', 'Wylie', 'Burleson', 'Mansfield', 'Forney'],
    reality: 'Mix of 2000s-2010s homes and some new construction. Good school districts. 45-55 min commute to Dallas core.',
    downPayment: '$12,000 – $80,000',
  },
  {
    price: '$500,000',
    key: '500k',
    mortgage: '$2,533',
    propTax: '$1,042',
    insurance: '$275',
    hoa: '$125',
    utilities: '$270',
    total: '$4,245',
    income: '$155,000',
    areas: ['Allen', 'Prosper', 'Celina', 'McKinney (newer)', 'Southlake (entry)'],
    reality: 'Newer builds (2015+), larger lots, top-tier school districts. HOA amenities common. Strong appreciation history.',
    downPayment: '$15,000 – $100,000',
  },
  {
    price: '$600,000',
    key: '600k',
    mortgage: '$3,040',
    propTax: '$1,250',
    insurance: '$330',
    hoa: '$175',
    utilities: '$310',
    total: '$5,105',
    income: '$185,000',
    areas: ['Frisco', 'Plano (newer)', 'Southlake', 'Colleyville', 'Westlake area'],
    reality: 'Premium school districts, newer custom builds, lifestyle amenities. PISD / Carroll ISD zones. Excellent resale value.',
    downPayment: '$18,000 – $120,000',
  },
];

export default function DFWHomeAffordabilityRealityGuide() {
  const [budget, setBudget] = useState('');
  const [income, setIncome] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const point = selected ? pricePoints.find(p => p.key === selected) : null;
  const annualIncome = parseInt(income.replace(/[^0-9]/g, '')) || 0;
  const incomeNeeded = point ? parseInt(point.income.replace(/[^0-9,]/g, '').replace(',', '')) : 0;
  const affordable = annualIncome >= incomeNeeded;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ background: '#0A1628', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>💵</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '12px 0 8px' }}>DFW Home Affordability Reality Check 2026</h1>
        <p style={{ color: '#CBD5E1', fontSize: 15 }}>What your budget really gets you — true monthly costs, real neighborhoods</p>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ background: '#FEF9C3', border: '2px solid #F5E642', borderRadius: 10, padding: 18, marginBottom: 32 }}>
          <p style={{ fontWeight: 700, margin: '0 0 6px' }}>⚠️ DFW True Cost Reality: Mortgage is only 58% of your payment</p>
          <p style={{ margin: 0, fontSize: 14 }}>Property taxes (2.0-2.8%), insurance, HOA, and utilities add 42%+ to your base mortgage. Most buyers are shocked. These numbers use 7.1% 30yr fixed, 10% down.</p>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>Select a Price Point to See the Full Reality</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
          {pricePoints.map(p => (
            <button key={p.key} onClick={() => setSelected(p.key)} style={{ padding: '16px 12px', borderRadius: 10, border: '2px solid', borderColor: selected === p.key ? '#F5E642' : '#E2E8F0', background: selected === p.key ? '#0A1628' : '#fff', color: selected === p.key ? '#F5E642' : '#0A1628', fontWeight: 700, cursor: 'pointer', fontSize: 18 }}>
              {p.price}
            </button>
          ))}
        </div>

        {point && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0', marginBottom: 32 }}>
            <h3 style={{ margin: '0 0 20px', fontSize: 20 }}>True Monthly Cost: {point.price} Home</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                  <tbody>
                    {[['🏠 Principal & Interest', point.mortgage], ['🏛 Property Tax (est.)', point.propTax], ['🛡 Homeowners Insurance', point.insurance], ['🏘 HOA (avg DFW)', point.hoa], ['⚡ Utilities (avg)', point.utilities]].map(([label, val]) => (
                      <tr key={label as string} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '10px 0', color: '#64748B' }}>{label}</td>
                        <td style={{ padding: '10px 0', fontWeight: 600, textAlign: 'right' }}>{val}</td>
                      </tr>
                    ))}
                    <tr style={{ borderTop: '2px solid #0A1628' }}>
                      <td style={{ padding: '12px 0', fontWeight: 700, fontSize: 16 }}>TOTAL Monthly</td>
                      <td style={{ padding: '12px 0', fontWeight: 700, fontSize: 16, textAlign: 'right', color: '#DC2626' }}>{point.total}</td>
                    </tr>
                  </tbody>
                </table>
                <div style={{ background: '#F1F5F9', borderRadius: 8, padding: 12, marginTop: 12 }}>
                  <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600 }}>💼 Income Needed: {point.income}/yr</p>
                  <p style={{ margin: 0, fontSize: 13, color: '#64748B' }}>Down Payment Required: {point.downPayment}</p>
                </div>
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>📍 DFW Areas at This Price</p>
                {point.areas.map((a, i) => <div key={i} style={{ padding: '6px 0', borderBottom: '1px solid #F1F5F9', fontSize: 14 }}>✓ {a}</div>)}
                <div style={{ background: '#FEF3C7', borderRadius: 8, padding: 12, marginTop: 12 }}>
                  <p style={{ margin: 0, fontSize: 13 }}>💬 <strong>Reality Check:</strong> {point.reality}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>🎯 Your DFW Affordability Check</h2>
        <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Your Annual Household Income</label>
              <input value={income} onChange={e => setIncome(e.target.value)} placeholder="e.g. $120,000" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Target Price Point</label>
              <select value={budget} onChange={e => { setBudget(e.target.value); setSelected(e.target.value); }} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 14, background: '#F9FAFB' }}>
                <option value="">Choose price range...</option>
                {pricePoints.map(p => <option key={p.key} value={p.key}>{p.price}</option>)}
              </select>
            </div>
          </div>
          {income && selected && (
            <div style={{ background: affordable ? '#DCFCE7' : '#FEE2E2', border: `2px solid ${affordable ? '#16A34A' : '#DC2626'}`, borderRadius: 10, padding: 16 }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>
                {affordable ? '✅ You can comfortably afford this — you exceed the income threshold.' : `⚠️ This may stretch your budget — income threshold is ${point?.income}/yr. Consider going down one price point.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
