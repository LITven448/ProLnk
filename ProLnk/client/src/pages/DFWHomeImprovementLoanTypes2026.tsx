import { useState } from 'react';

export default function DFWHomeImprovementLoanTypes2026() {
  const [projectSize, setProjectSize] = useState('medium');
  const [equityLevel, setEquityLevel] = useState('some');

  const recommendations: Record<string, Record<string, { type: string; icon: string; why: string; rate: string; pros: string; cons: string }>> = {
    small: {
      none: { type: 'Personal Loan', icon: '💳', why: 'No equity needed. Fast approval, funds in 1-3 days.', rate: '8-18% fixed', pros: 'Fast, no home at risk, fixed payments', cons: 'Higher rate, shorter terms' },
      some: { type: 'Credit Card (0% intro)', icon: '🃏', why: 'Small projects under $5K are often best on a 0% intro APR card if paid off within promo period.', rate: '0% intro, then 20-28%', pros: 'No interest if paid in time', cons: 'Rate spikes after promo, discipline required' },
      high: { type: 'HELOC', icon: '🏦', why: 'Lowest rate available. Draw only what you need for small project.', rate: '7-9% variable', pros: 'Lowest rate, flexible draw', cons: 'Variable rate risk, home as collateral' },
    },
    medium: {
      none: { type: 'Personal Loan', icon: '💳', why: 'Mid-range projects without equity — personal loan is the go-to for DFW homeowners.', rate: '8-15% fixed', pros: 'Fixed rate, no home risk, 2-7 year terms', cons: 'Higher rate than equity options' },
      some: { type: 'Home Equity Loan', icon: '🏠', why: 'Fixed lump sum ideal for defined mid-range projects like kitchen or bathroom remodel.', rate: '7-9% fixed', pros: 'Fixed rate, predictable payments', cons: 'Home as collateral, closing costs' },
      high: { type: 'HELOC', icon: '🏦', why: 'Best rate + flexibility for ongoing mid-range work. Draw as needed, pay as you go.', rate: '7-9% variable', pros: 'Lowest rate, only pay on what you draw', cons: 'Rate can rise, discipline on draws' },
    },
    large: {
      none: { type: 'FHA 203k Loan', icon: '🏗️', why: 'Major renovation with little equity — FHA 203k wraps renovation cost into your mortgage.', rate: '6.5-8% fixed', pros: 'Low down payment, covers major renovation', cons: 'Complex process, requires FHA-approved contractor' },
      some: { type: 'Home Equity Loan', icon: '🏠', why: 'Large fixed-scope projects: use equity for a lump sum at a fixed rate. Best for additions, full remodels.', rate: '7-9% fixed', pros: 'Fixed rate, large amount available', cons: 'Home at risk, full closing process' },
      high: { type: 'HELOC', icon: '🏦', why: 'High equity owners get the best deal — draw as contractors invoice, pay interest only while work is underway.', rate: '7-9% variable', pros: 'Maximum flexibility, lowest rate', cons: 'Variable rate, discipline required' },
    },
  };

  const allLoans = [
    { icon: '🏦', name: 'HELOC', rate: '7-9% variable', best: 'Ongoing / phased projects', equity: 'Required', desc: 'Home Equity Line of Credit. Draw as needed up to your limit, pay interest only on drawn amount. Best for DFW homeowners with 20%+ equity doing multi-phase work.' },
    { icon: '🏠', name: 'Home Equity Loan', rate: '7-9% fixed', best: 'Defined scope projects', equity: 'Required', desc: 'Fixed lump sum at a fixed rate. Best when you know exactly what the project will cost — kitchen, bathroom, addition.' },
    { icon: '💳', name: 'Personal Loan', rate: '8-18% fixed', best: 'No equity / fast need', equity: 'Not required', desc: 'Unsecured. No home at risk. Fast approval (1-3 days). Higher rate but great for DFW homeowners without equity.' },
    { icon: '🃏', name: 'Credit Card (0% intro)', rate: '0% then 20-28%', best: 'Projects under $5K', equity: 'Not required', desc: 'Only if you can pay it off within the intro period. Great for small urgent repairs. Dangerous for large projects.' },
    { icon: '🏗️', name: 'FHA 203k', rate: '6.5-8% fixed', best: 'Major renovation at purchase', equity: '3.5% down payment', desc: 'Wraps purchase price + renovation cost into one mortgage. Complex but powerful for DFW fixer-uppers. Requires FHA-approved contractor and timeline.' },
  ];

  const rec = recommendations[projectSize]?.[equityLevel];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, marginBottom: 8 }}>🏡 ProLnk DFW Resource Hub</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Home Improvement Loan Types 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Every financing option for DFW renovations — find the best match for your project size and equity position.</p>

        <div style={{ background: '#1e2d47', borderRadius: 12, padding: 24, marginBottom: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 12, color: '#94a3b8′ }}>🔨 Project Size</label>
              <select value={projectSize} onChange={e => setProjectSize(e.target.value)} style={{ display: 'block', marginTop: 6, width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px', fontSize: 14 }}>
                <option value="small">Small — Under $15K</option>
                <option value="medium">Medium — $15K to $60K</option>
                <option value="large">Large — Over $60K</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#94a3b8′ }}>🏦 Home Equity</label>
              <select value={equityLevel} onChange={e => setEquityLevel(e.target.value)} style={{ display: 'block', marginTop: 6, width: '100%', background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px', fontSize: 14 }}>
                <option value="none">None / Very Little</option>
                <option value="some">Some (10-20%)</option>
                <option value="high">High (20%+)</option>
              </select>
            </div>
          </div>
          {rec && (
            <div style={{ background: '#F5E642', borderRadius: 10, padding: 20, color: '#0A1628′ }}>
              <div style={{ fontSize: 11, fontWeight: 700 }}>⭐ BEST FIT FOR YOUR SITUATION</div>
              <div style={{ fontSize: 22, fontWeight: 800, marginTop: 4 }}>{rec.icon} {rec.type}</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>{rec.why}</div>
              <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 12 }}>
                <span>📈 Rate: <strong>{rec.rate}</strong></span>
                <span>✅ {rec.pros}</span>
                <span>⚠️ {rec.cons}</span>
              </div>
            </div>
          )}
        </div>

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>All DFW Renovation Financing Options</h2>
        {allLoans.map((l, i) => (
          <div key={i} style={{ background: '#1e2d47', borderRadius: 10, padding: 18, marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: 22 }}>{l.icon}</span>
                <div>
                  <div style={{ fontWeight: 700 }}>{l.name}</div>
                  <div style={{ fontSize: 12, color: '#F5E642′ }}>{l.rate}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right', fontSize: 12, color: '#94a3b8′ }}>
                <div>Best: {l.best}</div>
                <div>Equity: {l.equity}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: '#94a3b8′ }}>{l.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

