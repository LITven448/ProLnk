import { useState } from 'react';

const programs = [
  {
    name: 'TSAHC Home Sweet Texas',
    provider: 'Texas State Affordable Housing Corp',
    assistance: 'Up to 5% of loan amount for down payment/closing costs',
    incomeLimits: 'Up to $97,000 (varies by area and family size)',
    firstTime: false,
    minCredit: 620,
    notes: 'Available to all buyers — not just first-timers. Can be grant or 0% loan.',
  },
  {
    name: 'TDHCA My First Texas Home',
    provider: 'Texas Dept of Housing & Community Affairs',
    assistance: 'Up to 5% DPA, 30-year fixed mortgage',
    incomeLimits: 'Up to $97,000 depending on county and family size',
    firstTime: true,
    minCredit: 620,
    notes: 'First-time buyers only. Offers both conventional and FHA loan options.',
  },
  {
    name: 'City of Dallas Homebuyer Assistance',
    provider: 'City of Dallas',
    assistance: 'Up to $60,000 in down payment assistance',
    incomeLimits: '80% of Dallas Area Median Income (AMI)',
    firstTime: true,
    minCredit: 640,
    notes: 'Forgivable loan for Dallas city limits. Must occupy home for 5–10 years.',
  },
  {
    name: 'TDHCA Texas Homebuyer Program',
    provider: 'Texas Dept of Housing',
    assistance: '2–5% assistance, below-market interest rates',
    incomeLimits: 'Varies by county — DFW limits range $78K–$110K',
    firstTime: false,
    minCredit: 620,
    notes: 'Available statewide including all DFW counties.',
  },
];

export default function DFWHomeBuyerAssistanceGuide() {
  const [income, setIncome] = useState('');
  const [familySize, setFamilySize] = useState('');
  const [homePrice, setHomePrice] = useState('');
  const [result, setResult] = useState<null | { qualified: typeof programs; savings: number; monthlyWithAssist: number }>(null);

  function calculate() {
    const inc = parseInt(income);
    const price = parseInt(homePrice);
    const qualified = programs.filter(p => inc <= 97000);
    const maxAssist = price * 0.05;
    const loanAfterAssist = price - maxAssist - price * 0.03;
    const rate = 6.5 / 100 / 12;
    const monthly = Math.round((loanAfterAssist * rate) / (1 - Math.pow(1 + rate, -360)));
    setResult({ qualified, savings: Math.round(maxAssist), monthlyWithAssist: monthly });
  }

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '32px', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, margin: '0 0 8px' }}>DFW Homebuyer Assistance Programs</h1>
          <p style={{ color: '#CBD5E1', fontSize: 15, margin: 0 }}>Texas state and local programs that help DFW buyers get into a home with less out of pocket.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ color: '#0A1628', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>📋 Available Programs in DFW</h2>
          {programs.map(prog => (
            <div key={prog.name} style={{ background: '#F9FAFB', borderRadius: 8, padding: 16, marginBottom: 12, border: '1px solid #E2E8F0′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <div style={{ color: '#0A1628', fontWeight: 700, fontSize: 15 }}>{prog.name}</div>
                {prog.firstTime && <span style={{ background: '#0A1628', color: '#F5E642', borderRadius: 6, padding: '2px 8px', fontSize: 11, flexShrink: 0 }}>First-time only</span>}
              </div>
              <div style={{ color: '#64748B', fontSize: 12, marginBottom: 4 }}>Provider: {prog.provider}</div>
              <div style={{ color: '#374151', fontSize: 13, marginBottom: 3 }}>Assistance: <strong>{prog.assistance}</strong></div>
              <div style={{ color: '#374151', fontSize: 13, marginBottom: 3 }}>Income limits: {prog.incomeLimits}</div>
              <div style={{ color: '#374151', fontSize: 13, marginBottom: 3 }}>Min credit score: {prog.minCredit}</div>
              <div style={{ color: '#64748B', fontSize: 12 }}>{prog.notes}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, marginBottom: 16 }}>🧮 Program Eligibility + Savings Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ color: '#CBD5E1', fontSize: 13, display: 'block', marginBottom: 4 }}>Household income ($)</label>
              <input type="number" value={income} onChange={e => setIncome(e.target.value)} placeholder="e.g. 75000″ style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#CBD5E1', fontSize: 13, display: 'block', marginBottom: 4 }}>Family size</label>
              <select value={familySize} onChange={e => setFamilySize(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', fontSize: 14 }}>
                <option value="">Select...</option>
                {['1', '2', '3', '4', '5+'].map(n => <option key={n} value={n}>{n} {n === '1′ ? ’person' : 'people'}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#CBD5E1', fontSize: 13, display: 'block', marginBottom: 4 }}>Target home price ($)</label>
              <input type="number" value={homePrice} onChange={e => setHomePrice(e.target.value)} placeholder="e.g. 320000″ style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Show Qualified Programs + Savings</button>
          {result && (
            <div style={{ background: '#1E3A5F', borderRadius: 8, padding: 16, marginTop: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div style={{ background: '#0A1628', borderRadius: 6, padding: 10 }}>
                  <div style={{ color: '#94A3B8', fontSize: 12 }}>Max assistance available</div>
                  <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 700 }}>${result.savings.toLocaleString()}</div>
                </div>
                <div style={{ background: '#0A1628', borderRadius: 6, padding: 10 }}>
                  <div style={{ color: '#94A3B8', fontSize: 12 }}>Est. monthly payment with DPA</div>
                  <div style={{ color: '#CBD5E1', fontSize: 22, fontWeight: 700 }}>${result.monthlyWithAssist.toLocaleString()}</div>
                </div>
              </div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6 }}>Qualified programs: {result.qualified.length}</div>
              {result.qualified.map(p => (
                <div key={p.name} style={{ color: '#CBD5E1', fontSize: 13, marginBottom: 3 }}>→ {p.name}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}