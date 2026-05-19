import { useState } from 'react';

export default function DFWRefinanceGuide2026() {
  const [currentRate, setCurrentRate] = useState(7.2);
  const [loanBalance, setLoanBalance] = useState(320000);
  const [closingCosts, setClosingCosts] = useState(6000);
  const [showHeloc, setShowHeloc] = useState(false);

  const newRate = 6.5;
  const r1 = currentRate / 100 / 12;
  const r2 = newRate / 100 / 12;
  const monthlyOld = (loanBalance * r1) / (1 - Math.pow(1 + r1, -360));
  const monthlyNew = (loanBalance * r2) / (1 - Math.pow(1 + r2, -360));
  const monthlySavings = monthlyOld - monthlyNew;
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : 999;
  const makeSense = currentRate > newRate + 0.5 && breakEvenMonths < 36;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, fontSize: 13, color: '#F5E642', letterSpacing: 1 }}>DFW REAL ESTATE 2026</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📊 DFW Refinance Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.7 }}>
          DFW 2026 rates sit at <strong style={{ color: '#F5E642′ }}>6.2–6.8%</strong> for 30-year conventional.
          Refinancing makes sense when you can drop your rate 0.5%+ and recoup closing costs in under 3 years.
          Use the calculator below to run your numbers.
        </p>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 20 }}>🧮 Break-Even Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>
                Current Rate: <strong style={{ color: '#F5E642′ }}>{currentRate.toFixed(1)}%</strong>
              </label>
              <input type="range" min={5} max={9} step={0.1} value={currentRate}
                onChange={e => setCurrentRate(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>
                Loan Balance: <strong style={{ color: '#F5E642′ }}>${loanBalance.toLocaleString()}</strong>
              </label>
              <input type="range" min={100000} max={800000} step={10000} value={loanBalance}
                onChange={e => setLoanBalance(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>
                Closing Costs: <strong style={{ color: '#F5E642′ }}>${closingCosts.toLocaleString()}</strong>
              </label>
              <input type="range" min={2000} max={15000} step={500} value={closingCosts}
                onChange={e => setClosingCosts(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
            <div style={{ background: '#1a3a5c', borderRadius: 10, padding: 14 }}>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>DFW 2026 Avg New Rate</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#F5E642′ }}>{newRate}%</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
            {[
              { label: 'Monthly Savings', value: monthlySavings > 0 ? '$' + monthlySavings.toFixed(0) + '/mo' : 'None' },
              { label: 'Break-Even', value: breakEvenMonths < 500 ? breakEvenMonths + ' months' : 'N/A' },
              { label: 'Verdict', value: makeSense ? '✅ Refi Now' : '⏳ Hold Off' },
            ].map(s => (
              <div key={s.label} style={{ background: '#1a3a5c', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontWeight: 800, color: '#F5E642', fontSize: 16 }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ color: '#F5E642', fontSize: 18, margin: 0 }}>🏦 HELOC vs Cash-Out Refi</h2>
            <button onClick={() => setShowHeloc(!showHeloc)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
              {showHeloc ? 'Hide' : 'Compare'}
            </button>
          </div>
          {showHeloc && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { title: '🔄 Cash-Out Refi', pros: ['Fixed rate (predictable)', 'One loan one payment', 'Best for large amounts'], cons: ['Resets your loan term', 'Higher closing costs', 'Rate must beat current'] },
                { title: '💳 HELOC', pros: ['Pay only what you use', 'Lower closing costs', 'Flexible drawdown'], cons: ['Variable rate (risky)', 'Two payments possible', 'Draw period expires'] },
              ].map(opt => (
                <div key={opt.title} style={{ background: '#1a3a5c', borderRadius: 10, padding: 14 }}>
                  <div style={{ fontWeight: 800, marginBottom: 10, fontSize: 15 }}>{opt.title}</div>
                  {opt.pros.map(p => <div key={p} style={{ fontSize: 12, color: '#22c55e', marginBottom: 4 }}>+ {p}</div>)}
                  {opt.cons.map(c => <div key={c} style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>- {c}</div>)}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 16, marginBottom: 12 }}>📋 DFW 2026 Rate Environment</h2>
          {[
            '30-year fixed: 6.2–6.8% (conventional, 20% down)',
            '15-year fixed: 5.7–6.2% — best if you can afford higher payment',
            'FHA loans: 6.0–6.5% — 3.5% down but includes MIP',
            'Cash-out refi: typically 0.25–0.5% higher than rate-term refi',
            'HELOC prime rate: ~8.5% variable — better short-term draws only',
          ].map(t => (
            <div key={t} style={{ color: '#94a3b8', fontSize: 14, marginBottom: 8, paddingLeft: 12, borderLeft: '2px solid #F5E642′ }}>{t}</div>
          ))}
        </div>

        <div style={{ background: '#F5E642', borderRadius: 12, padding: 20, textAlign: 'center' }}>
          <div style={{ color: '#0A1628', fontWeight: 800, fontSize: 16 }}>🏠 Know Your Equity Before You Refi</div>
          <div style={{ color: '#1a3a5c', fontSize: 13, marginTop: 6 }}>ProLnk gives you a free DFW home value estimate in seconds</div>
        </div>
      </div>
    </div>
  );
}
