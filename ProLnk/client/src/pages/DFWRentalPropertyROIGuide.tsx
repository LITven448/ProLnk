import { useState } from 'react';

const submarkets = [
  { name: 'Frisco', capRate: 5.2, vacancy: 4.1, growth: '+8.2%' },
  { name: 'Plano', capRate: 5.5, vacancy: 4.3, growth: '+7.1%' },
  { name: 'McKinney', capRate: 5.8, vacancy: 3.9, growth: '+9.4%' },
  { name: 'Allen', capRate: 5.6, vacancy: 4.0, growth: '+7.8%' },
  { name: 'East Dallas', capRate: 6.8, vacancy: 5.2, growth: '+5.3%' },
  { name: 'Uptown/Oak Lawn', capRate: 5.0, vacancy: 5.8, growth: '+4.1%' },
  { name: 'Irving', capRate: 6.2, vacancy: 5.5, growth: '+3.9%' },
  { name: 'South Dallas', capRate: 8.1, vacancy: 7.2, growth: '+2.1%' },
  { name: 'Garland', capRate: 6.5, vacancy: 5.1, growth: '+4.7%' },
  { name: 'Arlington', capRate: 6.9, vacancy: 5.6, growth: '+5.0%' },
];

export default function DFWRentalPropertyROIGuide() {
  const [purchasePrice, setPurchasePrice] = useState(350000);
  const [monthlyRent, setMonthlyRent] = useState(2200);
  const [downPercent, setDownPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(7.2);
  const [monthlyExpenses, setMonthlyExpenses] = useState(400);
  const [mgmtPercent, setMgmtPercent] = useState(10);

  const downPayment = purchasePrice * (downPercent / 100);
  const loanAmount = purchasePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = 360;
  const mortgage = loanAmount > 0 ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1) : 0;
  const mgmtFee = monthlyRent * (mgmtPercent / 100);
  const totalExpenses = monthlyExpenses + mgmtFee + mortgage;
  const monthlyNOI = monthlyRent - monthlyExpenses - mgmtFee;
  const annualNOI = monthlyNOI * 12;
  const capRate = purchasePrice > 0 ? ((annualNOI / purchasePrice) * 100).toFixed(2) : '0.00';
  const monthlyCashFlow = monthlyRent - totalExpenses;
  const annualCashFlow = monthlyCashFlow * 12;
  const cashOnCash = downPayment > 0 ? ((annualCashFlow / downPayment) * 100).toFixed(2) : '0.00';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '60px 24px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>📊</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: '#F5E642', margin: '12px 0 8px' }}>DFW Rental Property ROI Guide</h1>
        <p style={{ fontSize: 18, color: '#8899AA', maxWidth: 640, margin: '0 auto' }}>Cap rates, cash flow analysis, and ROI calculator by DFW submarket</p>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ background: '#112240', borderRadius: 16, padding: 32, margin: '32px 0', border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🗺️ DFW Submarket Cap Rates (2026)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
            {submarkets.map(s => (
              <div key={s.name} style={{ background: '#0A1628', borderRadius: 10, padding: 16, border: '1px solid #1E3A5F' }}>
                <div style={{ color: '#E8EDF5', fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{s.name}</div>
                <div style={{ color: '#F5E642', fontSize: 24, fontWeight: 800 }}>{s.capRate}%</div>
                <div style={{ color: '#8899AA', fontSize: 11, marginTop: 4 }}>Cap Rate</div>
                <div style={{ color: '#4ADE80', fontSize: 12, marginTop: 6 }}>{s.growth} YoY</div>
                <div style={{ color: '#8899AA', fontSize: 11 }}>{s.vacancy}% vacancy</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, margin: '32px 0', border: '2px solid #F5E642′ }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 20 }}>🧮 ROI Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
            {[
              { label: 'Purchase Price ($)', value: purchasePrice, setter: setPurchasePrice, min: 100000, max: 2000000, step: 5000 },
              { label: 'Monthly Rent ($)', value: monthlyRent, setter: setMonthlyRent, min: 500, max: 10000, step: 50 },
              { label: 'Down Payment (%)', value: downPercent, setter: setDownPercent, min: 5, max: 50, step: 1 },
              { label: 'Interest Rate (%)', value: interestRate, setter: setInterestRate, min: 3, max: 15, step: 0.1 },
              { label: 'Monthly Expenses ($)', value: monthlyExpenses, setter: setMonthlyExpenses, min: 0, max: 5000, step: 50 },
              { label: 'Property Mgmt Fee (%)', value: mgmtPercent, setter: setMgmtPercent, min: 0, max: 20, step: 1 },
            ].map(({ label, value, setter, min, max, step }) => (
              <div key={label}>
                <label style={{ display: 'block', color: '#8899AA', fontSize: 13, marginBottom: 6 }}>{label}</label>
                <input type="number" value={value} min={min} max={max} step={step} onChange={e => setter(parseFloat(e.target.value) || 0)} style={{ width: '100%', background: '#0A1628', color: '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', fontSize: 15, boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { label: 'Cap Rate', value: `${capRate}%`, sub: 'NOI / Purchase Price', good: parseFloat(capRate) >= 5.5 },
              { label: 'Cash-on-Cash Return', value: `${cashOnCash}%`, sub: 'Annual Cash Flow / Down Payment', good: parseFloat(cashOnCash) >= 5 },
              { label: 'Monthly Cash Flow', value: `$${Math.round(monthlyCashFlow).toLocaleString()}`, sub: 'After all expenses', good: monthlyCashFlow >= 0 },
            ].map(({ label, value, sub, good }) => (
              <div key={label} style={{ background: '#0A1628', borderRadius: 12, padding: 20, textAlign: 'center', border: `1px solid ${good ? '#4ADE80' : '#F87171'}` }}>
                <div style={{ color: '#8899AA', fontSize: 13 }}>{label}</div>
                <div style={{ color: good ? '#4ADE80′ : '#F87171', fontSize: 30, fontWeight: 800, margin: '8px 0 4px' }}>{value}</div>
                <div style={{ color: '#8899AA', fontSize: 11 }}>{sub}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, textAlign: 'center' }}>
            <div><div style={{ color: '#8899AA', fontSize: 12 }}>Monthly Mortgage</div><div style={{ color: '#E8EDF5', fontSize: 18, fontWeight: 700 }}>${Math.round(mortgage).toLocaleString()}</div></div>
            <div><div style={{ color: '#8899AA', fontSize: 12 }}>Mgmt Fee/mo</div><div style={{ color: '#E8EDF5', fontSize: 18, fontWeight: 700 }}>${Math.round(mgmtFee).toLocaleString()}</div></div>
            <div><div style={{ color: '#8899AA', fontSize: 12 }}>Annual NOI</div><div style={{ color: '#F5E642', fontSize: 18, fontWeight: 700 }}>${annualNOI.toLocaleString()}</div></div>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 16, padding: 32, border: '1px solid #1E3A5F' }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, marginBottom: 16 }}>💡 DFW Market Benchmarks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {[['Property management fees', '8–12% of monthly rent'], ['Typical vacancy rate', '4–7% across DFW'], ['Maintenance reserve', '1–2% of property value/yr'], ['Target cap rate', '5.5%+ for positive leverage'], ['Cash-on-cash target', '6%+ with 20% down'], ['Break-even occupancy', '85–90% typical']].map(([k, v]) => (
              <div key={k} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ color: '#8899AA', fontSize: 12, marginBottom: 4 }}>{k}</div>
                <div style={{ color: '#F5E642', fontSize: 16, fontWeight: 700 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
