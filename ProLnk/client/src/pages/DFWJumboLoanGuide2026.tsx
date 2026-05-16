import { useState } from 'react';

export default function DFWJumboLoanGuide2026() {
  const [price, setPrice] = useState(900000);
  const [down, setDown] = useState(180000);
  const [result, setResult] = useState('');

  const loanAmount = price - down;
  const conformingLimit = 766550;
  const isJumbo = loanAmount > conformingLimit;

  const neighborhoods = [
    { name: 'Southlake', median: '$1.2M', notes: 'Almost all buyers need jumbo financing' },
    { name: 'Westlake', median: '$1.8M', notes: 'Ultra-luxury, large down payments common' },
    { name: 'Highland Park / Park Cities', median: '$1.5M', notes: 'Dense jumbo market, multiple offers common' },
    { name: 'Frisco / Prosper luxury', median: '$850K', notes: 'Some buyers near conforming limit' },
    { name: 'Colleyville', median: '$720K', notes: 'Mix of conforming and jumbo' },
  ];

  const check = () => {
    if (!isJumbo) {
      setResult(`✅ CONFORMING LOAN — Your loan of $${loanAmount.toLocaleString()} is below the $766,550 conforming limit. Standard conventional financing applies — easier qualification and lower rates.`);
    } else {
      const extra = loanAmount - conformingLimit;
      setResult(`⚠️ JUMBO LOAN REQUIRED — Your loan of $${loanAmount.toLocaleString()} exceeds the conforming limit by $${extra.toLocaleString()}. Expect: 720+ credit score, 12–18 months reserves, stricter DTI (43% max), and rates typically 0.25–0.5% above conforming.`);
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>PROLNK · DFW JUMBO LOANS 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>DFW Jumbo Loan Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: '0.75rem' }}>2026 conforming limit: <strong style={{ color: '#F5E642' }}>$766,550</strong>. Any loan above this is jumbo — stricter rules, but DFW luxury buyers navigate this daily.</p>

        <div style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 10, padding: '1.2rem', marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginBottom: '0.75rem' }}>Jumbo Requirements at a Glance</h3>
          {['720+ credit score (many lenders require 740)', '10–20% down payment minimum', '12–18 months cash reserves post-close', 'DTI ratio 43% or lower', 'Full income documentation — W2 and self-employed', '2 home appraisals sometimes required on high-end'].map(r => (
            <div key={r} style={{ color: '#cbd5e1', fontSize: '0.9rem', padding: '0.25rem 0' }}>✅ {r}</div>
          ))}
        </div>

        <div style={{ display: 'grid', gap: '0.8rem', marginBottom: '2rem' }}>
          <h3 style={{ color: '#F5E642', margin: 0 }}>🏘️ DFW Jumbo Neighborhoods</h3>
          {neighborhoods.map(n => (
            <div key={n.name} style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 8, padding: '1rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <div style={{ fontWeight: 700 }}>🏠 {n.name}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{n.notes}</div>
              </div>
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{n.median}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #F5E642', borderRadius: 12, padding: '1.8rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1.2rem' }}>🧮 Jumbo vs. Conforming Calculator</h2>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#94a3b8' }}>Purchase Price: <strong style={{ color: '#fff' }}>${price.toLocaleString()}</strong></label>
            <input type='range' min={500000} max={3000000} step={25000} value={price} onChange={e => setPrice(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642', marginTop: '0.3rem' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#94a3b8' }}>Down Payment: <strong style={{ color: '#fff' }}>${down.toLocaleString()}</strong></label>
            <input type='range' min={50000} max={price * 0.5} step={10000} value={Math.min(down, price * 0.5)} onChange={e => setDown(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642', marginTop: '0.3rem' }} />
          </div>
          <div style={{ color: '#94a3b8', marginBottom: '1rem' }}>Loan Amount: <strong style={{ color: isJumbo ? '#ff6b6b' : '#4ade80' }}>${loanAmount.toLocaleString()}</strong> {isJumbo ? '— JUMBO' : '— Conforming'}</div>
          <button onClick={check} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.75rem 2rem', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: '1rem' }}>Check Loan Type</button>
          {result && <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 8, padding: '1rem', color: '#e2e8f0', lineHeight: 1.6 }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}