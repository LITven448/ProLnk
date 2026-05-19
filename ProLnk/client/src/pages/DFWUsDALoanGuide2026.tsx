import { useState } from 'react';

export default function DFWUsDALoanGuide2026() {
  const [county, setCounty] = useState('');
  const [income, setIncome] = useState(75000);
  const [result, setResult] = useState('');

  const eligibleCounties = [
    { name: 'Kaufman', notes: 'Largely USDA-eligible — Terrell, Forney outskirts' },
    { name: 'Ellis', notes: 'Waxahachie area has eligible zones' },
    { name: 'Parker', notes: 'Weatherford and rural areas eligible' },
    { name: 'Johnson', notes: 'Cleburne and rural areas eligible' },
    { name: 'Wise', notes: 'Decatur and most of county eligible' },
    { name: 'Hood', notes: 'Granbury area — check USDA map for exact parcels' },
  ];

  const ineligibleCounties = ['Dallas', 'Tarrant', 'Collin', 'Denton (urban)', 'Rockwall (most)'];

  const incomeLimit2026 = { '1-4': 110650, '5-8': 146050 };

  const check = () => {
    if (!county) { setResult('Please select a county.'); return; }
    const eligible = eligibleCounties.find(c => c.name === county);
    if (!eligible) {
      setResult(`❌ ${county} County — Primarily ineligible for USDA. These urban DFW counties fall outside USDA rural designation. Consider FHA or conventional financing.`);
      return;
    }
    const incomePct = income / incomeLimit2026['1-4'];
    if (income > incomeLimit2026['5-8']) {
      setResult(`⚠️ ${county} County is USDA-eligible geographically, but your income of $${income.toLocaleString()} exceeds the 2026 income limit of $${incomeLimit2026['5-8'].toLocaleString()} for large households. USDA may not qualify.`);
    } else if (income > incomeLimit2026['1-4']) {
      setResult(`✅ ${county} County is USDA-eligible! Income at $${income.toLocaleString()} — within limits for 5-8 person households ($${incomeLimit2026['5-8'].toLocaleString()} limit). Confirm household size with lender.`);
    } else {
      setResult(`✅ Strong USDA candidate! ${county} County qualifies geographically and your income of $${income.toLocaleString()} is well within the $${incomeLimit2026['1-4'].toLocaleString()} limit. 0% down payment available!`);
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>PROLNK · DFW USDA LOANS 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>DFW USDA Loan Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>0% down payment available in USDA-eligible DFW counties. Most people don't know how much of the Metroplex qualifies.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 10, padding: '1.2rem' }}>
            <h3 style={{ color: '#4ade80', marginBottom: '0.75rem' }}>✅ USDA-Eligible DFW Counties</h3>
            {eligibleCounties.map(c => (
              <div key={c.name} style={{ marginBottom: '0.5rem' }}>
                <div style={{ fontWeight: 600 }}>🌾 {c.name} County</div>
                <div style={{ color: '#94a3b8', fontSize: '0.83rem' }}>{c.notes}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 10, padding: '1.2rem' }}>
            <h3 style={{ color: '#ff6b6b', marginBottom: '0.75rem' }}>❌ Ineligible (Urban Core)</h3>
            {ineligibleCounties.map(c => <div key={c} style={{ color: '#94a3b8', padding: '0.3rem 0', fontSize: '0.9rem' }}>🏙️ {c}</div>)}
            <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 8, padding: '0.75rem', fontSize: '0.83rem', color: '#cbd5e1' }}>
              <strong>2026 Income Limits:</strong><br/>
              1-4 person: $110,650<br/>
              5-8 person: $146,050
            </div>
          </div>
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #F5E642', borderRadius: 12, padding: '1.8rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1.2rem' }}>🔍 Check USDA Eligibility</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.4rem' }}>County</label>
            <select value={county} onChange={e => setCounty(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.6rem', fontSize: '1rem' }}>
              <option value=''>Select county...</option>
              {[...eligibleCounties.map(c => c.name), ...ineligibleCounties].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Household Income: <strong style={{ color: '#fff' }}>${income.toLocaleString()}</strong></label>
            <input type='range' min={30000} max={200000} step={2500} value={income} onChange={e => setIncome(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642' }} />
          </div>
          <button onClick={check} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.75rem 2rem', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: '1rem' }}>Check Eligibility</button>
          {result && <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 8, padding: '1rem', color: '#e2e8f0', lineHeight: 1.6 }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}