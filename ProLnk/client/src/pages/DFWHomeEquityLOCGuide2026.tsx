import { useState } from 'react';

export default function DFWHomeEquityLOCGuide2026() {
  const [homeValue, setHomeValue] = useState(450000);
  const [mortgage, setMortgage] = useState(280000);
  const [useCase, setUseCase] = useState('');
  const [result, setResult] = useState('');

  const maxLTV = 0.80;
  const maxBorrow = Math.max(0, homeValue * maxLTV - mortgage);
  const currentEquity = homeValue - mortgage;
  const equityPct = Math.round((currentEquity / homeValue) * 100);

  const useCases = ['Kitchen / Bath Renovation', 'HVAC Replacement', 'Roof Replacement', 'Debt Consolidation', 'Emergency Fund', 'Investment Property Down Payment'];

  const analyze = () => {
    if (!useCase) { setResult('Select a use case to continue.'); return; }
    const reno = ['Kitchen / Bath Renovation', 'HVAC Replacement', 'Roof Replacement'].includes(useCase);
    if (maxBorrow < 10000) {
      setResult('❌ Insufficient equity for HELOC. Texas 80% LTV rule limits your available borrowing. Consider waiting until equity grows or explore personal loan options.');
      return;
    }
    if (reno) {
      setResult(`✅ HELOC is ideal for ${useCase}. You can access up to $${maxBorrow.toLocaleString()} (Texas 80% LTV rule). Draw only what you need during the draw period — variable rate risk is manageable for phased projects. ProLnk can connect you with vetted contractors before you draw.`);
    } else if (useCase === 'Debt Consolidation') {
      setResult('⚠️ HELOC for debt consolidation requires discipline. Variable rates can rise — if you can get a fixed cash-out refi at a better rate, that may be safer. Compare total cost of both options.');
    } else if (useCase === 'Investment Property Down Payment') {
      setResult('⚠️ Using HELOC for investment property down payment is common but risky. Two variable-rate obligations simultaneously. Make sure rental income covers both. Texas lenders may require additional reserves.');
    } else {
      setResult(`HELOC available: up to $${maxBorrow.toLocaleString()}. For ${useCase}, a HELOC draw-as-needed structure preserves flexibility. Compare against personal loan for smaller amounts under $25K.`);
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>PROLNK · DFW HELOC GUIDE 2026</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>DFW HELOC Guide 2026 (Part 2)</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Texas has strict HELOC rules — max 80% LTV including all liens. Here's what DFW homeowners need to know before tapping equity.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: '📜 Texas 80% LTV Rule', desc: 'All mortgages + HELOC combined cannot exceed 80% of home value. Stricter than most states.' },
            { label: '📅 Draw Period', desc: 'Typically 10 years — borrow as needed, interest only payments. Rate is variable (Prime + margin).' },
            { label: '💳 Repayment Period', desc: 'After draw period, 10-20 year repayment. Payment jumps significantly — plan ahead.' },
            { label: '🔁 HELOC vs. Cash-Out Refi', desc: 'HELOC: flexible draw, variable rate. Cash-out refi: fixed rate, full amount, higher closing costs.' },
          ].map(item => (
            <div key={item.label} style={{ background: '#0f2040', border: '1px solid #1e3a5f', borderRadius: 10, padding: '1rem' }}>
              <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>{item.label}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0f2040', border: '1px solid #F5E642', borderRadius: 12, padding: '1.8rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', marginBottom: '1.2rem' }}>🏠 DFW HELOC Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.2rem', background: '#0A1628', borderRadius: 8, padding: '1rem' }}>
            <div>Home Equity: <strong style={{ color: '#4ade80′ }}>${currentEquity.toLocaleString()} ({equityPct}%)</strong></div>
            <div>Max HELOC: <strong style={{ color: '#F5E642′ }}>${maxBorrow.toLocaleString()}</strong></div>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Home Value: <strong style={{ color: '#fff' }}>${homeValue.toLocaleString()}</strong></label>
            <input type='range' min={200000} max={1500000} step={10000} value={homeValue} onChange={e => setHomeValue(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.3rem' }}>Existing Mortgage Balance: <strong style={{ color: '#fff' }}>${mortgage.toLocaleString()}</strong></label>
            <input type='range' min={0} max={homeValue * 0.95} step={5000} value={Math.min(mortgage, homeValue * 0.95)} onChange={e => setMortgage(+e.target.value)} style={{ width: '100%', accentColor: '#F5E642′ }} />
          </div>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{ color: '#94a3b8', display: 'block', marginBottom: '0.4rem' }}>Use Case</label>
            <select value={useCase} onChange={e => setUseCase(e.target.value)} style={{ width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '0.6rem', fontSize: '1rem' }}>
              <option value=''>Select use case...</option>
              {useCases.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <button onClick={analyze} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, padding: '0.75rem 2rem', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: '1rem' }}>Analyze My Options</button>
          {result && <div style={{ marginTop: '1rem', background: '#0A1628', borderRadius: 8, padding: '1rem', color: '#e2e8f0', lineHeight: 1.6 }}>{result}</div>}
        </div>
      </div>
    </div>
  );
}