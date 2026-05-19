import { useState } from 'react';

export default function DFWHVACFinanceOptions2026B() {
  const [creditScore, setCreditScore] = useState(700);
  const [loanAmount, setLoanAmount] = useState(8000);
  const [result, setResult] = useState('');

  const lenders = [
    { name: 'GreenSky', apr: '6.99–26.99%', terms: '24–84 mo', minScore: 600, notes: 'Fast approval, used by many HVAC dealers' },
    { name: 'Service Finance', apr: '7.99–24.99%', terms: '24–120 mo', minScore: 620, notes: 'Specialty home improvement lender' },
    { name: 'HFS (Home Finance Solutions)', apr: '8.49–22.99%', terms: '36–84 mo', minScore: 640, notes: 'Tailored for home service trades' },
    { name: 'Synchrony HOME', apr: '9.99–28.99%', terms: '12–60 mo', minScore: 580, notes: 'Promo 0% offers common, deferred interest risk' },
    { name: 'Manufacturer (Carrier, Trane, etc.)', apr: '0–14.99%', terms: '12–72 mo', minScore: 650, notes: 'Best promos but limited to brand equipment' },
  ];

  const getRecommendation = () => {
    let rec = '';
    if (creditScore >= 720 && loanAmount >= 10000) rec = '✅ Manufacturer financing or GreenSky — you qualify for best promo rates. Ask ProLnk contractor for 0% offers.';
    else if (creditScore >= 680) rec = '✅ Service Finance or HFS — solid mid-range options with competitive APR. Avoid Synchrony deferred interest traps.';
    else if (creditScore >= 620) rec = '⚠️ GreenSky or Synchrony likely. Shop carefully — read deferred interest terms. Consider improving score 20–30 pts first.';
    else rec = '🔴 Limited options. FHA Title I home improvement loan or personal loan may be safer. Talk to ProLnk for contractor payment plans.';
    setResult(rec);
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>PROLNK · DFW HVAC FINANCING 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>DFW HVAC Financing Deep Dive 2026 (Part 2)</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Manufacturer vs. third-party financing — GreenSky, Service Finance, HFS, Synchrony compared for DFW homeowners.</p>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2.5rem' }}>
          {lenders.map(l => (
            <div key={l.name} style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 10, padding: '1.2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>🏦 {l.name}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{l.apr} APR</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.88rem' }}>Terms: {l.terms} · Min Score: {l.minScore}</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.3rem' }}>{l.notes}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #F5E642', borderRadius: 12, padding: '1.8rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1.2rem' }}>🔍 Find Your Financing Option</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.3rem' }}>Credit Score: <strong style={{ color: '#fff' }}>{creditScore}</strong></label>
            <input type='range' min={500} max={850} value={creditScore} onChange={e => setCreditScore(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.3rem' }}>Loan Amount: <strong style={{ color: '#fff' }}>${loanAmount.toLocaleString()}</strong></label>
            <input type='range' min={2000} max={30000} step={500} value={loanAmount} onChange={e => setLoanAmount(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>
          <button onClick={getRecommendation} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.75rem 2rem', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: '1rem' }}>Get Recommendation</button>
          {result && <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 8, padding: '1rem', color: '#e2e8f0', lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.2rem', color: '#94a3b8', fontSize: '0.88rem' }}>
          💡 ProLnk contractors are pre-screened and many offer in-house financing options. Get matched with a DFW HVAC pro today.
        </div>
      </div>
    </div>
  );
}