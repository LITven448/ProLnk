import { useState } from 'react';

export default function DFWHomeLoanTypesGuide2026() {
  const [firstTime, setFirstTime] = useState(false);
  const [veteran, setVeteran] = useState(false);
  const [rural, setRural] = useState(false);
  const [luxury, setLuxury] = useState(false);
  const [result, setResult] = useState('');

  const loans = [
    { type: 'Conventional', min: '620+', down: '3–20%', limit: '$766,550', best: 'Strong credit buyers, primary or investment' },
    { type: 'FHA', min: '580+', down: '3.5%', limit: '$498,257 (DFW)', best: 'First-time buyers, lower credit scores' },
    { type: 'VA', min: 'No minimum', down: '0%', limit: 'No limit', best: 'Veterans and active-duty military' },
    { type: 'USDA', min: '640+', down: '0%', limit: 'Income limits apply', best: 'Outer DFW counties — Kaufman, Parker, Wise, Ellis, Johnson' },
    { type: 'Jumbo', min: '720+', down: '10–20%', limit: 'Above $766,550', best: 'Southlake, Westlake, Park Cities luxury buyers' },
    { type: 'Construction-to-Perm', min: '680+', down: '10–20%', limit: 'Varies by lender', best: 'New builds, custom homes in DFW suburbs' },
  ];

  const recommend = () => {
    if (veteran) { setResult('🎖️ VA Loan — Best option. 0% down, no PMI, competitive rates. Many DFW lenders specialize in VA.'); return; }
    if (rural) { setResult('🌾 USDA Loan — 0% down if in eligible outer DFW county. Check USDA map for Kaufman, Parker, Ellis, Johnson, Wise counties.'); return; }
    if (luxury) { setResult('🏰 Jumbo Loan — Required above $766,550 conforming limit. Expect 720+ credit, 20% down, stricter DTI review.'); return; }
    if (firstTime) { setResult('🏠 FHA Loan — Lower down payment and credit requirements. Great for DFW first-timers. Watch for MIP costs over loan life.'); return; }
    setResult('📋 Conventional Loan — Flexible, no upfront MIP if 20%+ down. Best rates at 740+ credit score. Most DFW buyers choose conventional.');
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>PROLNK · DFW HOME LOANS 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>DFW Home Loan Types Complete Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Every major loan type explained for Dallas-Fort Worth buyers — with 2026 limits and requirements.</p>

        <div style={{ display: 'grid', gap: '0.9rem', marginBottom: '2.5rem' }}>
          {loans.map(l => (
            <div key={l.type} style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 10, padding: '1.1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
                <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>🏦 {l.type}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>Min Score: {l.min}</span>
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Down: {l.down} · Limit: {l.limit}</div>
              <div style={{ color: '#cbd5e1', fontSize: '0.88rem', marginTop: '0.3rem' }}>Best for: {l.best}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #F5E642', borderRadius: 12, padding: '1.8rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1.2rem' }}>🎯 Find Your Best Loan Type</h2>
          {[
            { label: '🏠 First-Time Buyer', val: firstTime, set: setFirstTime },
            { label: '🎖️ Veteran / Active Military', val: veteran, set: setVeteran },
            { label: '🌾 Buying in Outer DFW County', val: rural, set: setRural },
            { label: '🏰 Buying Luxury ($766K+)', val: luxury, set: setLuxury },
          ].map(opt => (
            <label key={opt.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', cursor: 'pointer' }}>
              <input type='checkbox' checked={opt.val} onChange={e => opt.set(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#F5E642′ }} />
              <span style={{ fontSize: '1rem' }}>{opt.label}</span>
            </label>
          ))}
          <button onClick={recommend} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.75rem 2rem', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: '1rem', marginTop: '0.5rem' }}>Get Recommendation</button>
          {result && <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 8, padding: '1rem', color: '#e2e8f0', lineHeight: 1.6 }}>{result}</div>}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 10, padding: '1.2rem', color: '#94a3b8', fontSize: '0.88rem' }}>
          💡 ProLnk helps DFW homeowners connect with trusted home service pros — protecting your investment from day one.
        </div>
      </div>
    </div>
  );
}