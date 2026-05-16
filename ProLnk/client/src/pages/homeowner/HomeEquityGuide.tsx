import { useState } from 'react';

const products = [
  {
    name: 'HELOC',
    icon: '🔄',
    rate: '8.5–10.5% variable',
    term: '10-yr draw + 20-yr repay',
    best: 'Ongoing renovation projects, phased work',
    risk: 'Variable rate — payments rise with Fed hikes',
    drawback: 'Temptation to over-borrow; requires discipline',
  },
  {
    name: 'Home Equity Loan',
    icon: '💳',
    rate: '7.5–9.5% fixed',
    term: '5–30 years fixed',
    best: 'One-time projects with known costs',
    risk: 'Fixed payment regardless of income change',
    drawback: 'Less flexible than HELOC; full amount disbursed upfront',
  },
  {
    name: 'Cash-Out Refinance',
    icon: '🔁',
    rate: '6.5–8.5% (replaces existing mortgage)',
    term: '15 or 30 years',
    best: 'Large projects when current rate is already high',
    risk: 'Resets amortization; larger total interest paid',
    drawback: 'Closing costs $3,000–6,000; only makes sense if lowering rate',
  },
];

const goodUses = ['Kitchen or bath remodel (high ROI)', 'Roof replacement (necessary maintenance)', 'Energy efficiency upgrades (solar, insulation)', 'Debt consolidation at lower rate', 'Emergency structural repairs'];
const badUses = ['Vacations or luxury purchases', 'Investing in stocks or crypto', 'Funding a business with uncertain returns', 'Paying for ongoing living expenses', 'Buying depreciating assets (cars, furniture)'];

export default function HomeEquityGuide() {
  const [homeValue, setHomeValue] = useState('');
  const [mortgage, setMortgage] = useState('');
  const [loanType, setLoanType] = useState('HELOC');
  const [loanYears, setLoanYears] = useState(10);

  const hv = parseFloat(homeValue.replace(/,/g, '')) || 0;
  const mv = parseFloat(mortgage.replace(/,/g, '')) || 0;
  const equity = Math.max(hv - mv, 0);
  const maxBorrow = Math.max(hv * 0.85 - mv, 0);
  const ltv = hv > 0 ? Math.round((mv / hv) * 100) : 0;

  const rateMap: Record<string, number> = { HELOC: 0.095, 'Home Equity Loan': 0.085, 'Cash-Out Refinance': 0.075 };
  const r = rateMap[loanType] / 12;
  const n = loanYears * 12;
  const monthly = maxBorrow > 0 ? (maxBorrow * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : 0;

  const fmt = (v: number) => '$' + v.toLocaleString(undefined, { maximumFractionDigits: 0 });

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px 0' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a2a45 100%)', borderBottom: '2px solid #F5E642', padding: '48px 24px 36px' }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>🏠 DFW Homeowner Guide</div>
          <h1 style={{ fontSize: 38, fontWeight: 800, margin: '0 0 16px', lineHeight: 1.2 }}>Home Equity Guide</h1>
          <p style={{ color: '#94a3b8', fontSize: 17, margin: 0, maxWidth: 600 }}>
            HELOC vs home equity loan vs cash-out refi — and an interactive calculator for DFW homeowners.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 880, margin: '0 auto', padding: '40px 24px 0' }}>
        <div style={{ background: '#0f1e35', border: '1px solid #F5E642', borderRadius: 12, padding: 24, marginBottom: 36 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, fontWeight: 700, margin: '0 0 10px' }}>📈 DFW Home Values (2025)</h2>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, margin: '0 0 14px' }}>
            The average DFW home value is approximately $380,000, up from $280,000 in 2020 — a 36% appreciation in 5 years. Many homeowners who purchased pre-2021 are sitting on $100,000–$200,000 in untapped equity.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { label: 'DFW Avg Home Value', value: '$380,000' },
              { label: 'Avg 5-yr Appreciation', value: '+36%' },
              { label: 'Max LTV for Borrowing', value: '85%' },
            ].map(s => (
              <div key={s.label} style={{ background: '#0A1628', borderRadius: 10, padding: '14px 16px', textAlign: 'center' }}>
                <div style={{ color: '#F5E642', fontSize: 20, fontWeight: 800 }}>{s.value}</div>
                <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginBottom: 40 }}>
          {products.map(p => (
            <div key={p.name} style={{ background: '#0f1e35', border: '1px solid #1E2D45', borderRadius: 12, padding: 22 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{p.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 17, color: '#F5E642', marginBottom: 14 }}>{p.name}</div>
              <div style={{ fontSize: 13, lineHeight: 1.8 }}>
                {[
                  { label: 'Rate', val: p.rate },
                  { label: 'Term', val: p.term },
                  { label: 'Best for', val: p.best },
                  { label: 'Risk', val: p.risk },
                  { label: 'Drawback', val: p.drawback },
                ].map(row => (
                  <div key={row.label} style={{ marginBottom: 6 }}>
                    <span style={{ color: '#64748b', fontWeight: 600 }}>{row.label}: </span>
                    <span style={{ color: '#94a3b8' }}>{row.val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>
          <div style={{ background: '#0f1e35', border: '1px solid #22c55e', borderRadius: 12, padding: 22 }}>
            <div style={{ color: '#22c55e', fontWeight: 700, fontSize: 15, marginBottom: 14 }}>✅ Good Uses of Equity</div>
            <ul style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.9, paddingLeft: 18, margin: 0 }}>
              {goodUses.map(u => <li key={u}>{u}</li>)}
            </ul>
          </div>
          <div style={{ background: '#0f1e35', border: '1px solid #ef4444', borderRadius: 12, padding: 22 }}>
            <div style={{ color: '#ef4444', fontWeight: 700, fontSize: 15, marginBottom: 14 }}>❌ Risky Uses of Equity</div>
            <ul style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.9, paddingLeft: 18, margin: 0 }}>
              {badUses.map(u => <li key={u}>{u}</li>)}
            </ul>
          </div>
        </div>

        <div style={{ background: '#0f1e35', border: '2px solid #F5E642', borderRadius: 14, padding: 32, marginBottom: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>🧮 Equity Calculator</h2>
          <p style={{ color: '#94a3b8', fontSize: 14, marginBottom: 24 }}>Enter your home value and remaining mortgage to see your borrowing power.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Home Value ($)</label>
              <input
                type="number"
                value={homeValue}
                onChange={e => setHomeValue(e.target.value)}
                placeholder="e.g. 380000"
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D45', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Outstanding Mortgage ($)</label>
              <input
                type="number"
                value={mortgage}
                onChange={e => setMortgage(e.target.value)}
                placeholder="e.g. 220000"
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D45', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Product</label>
              <select
                value={loanType}
                onChange={e => setLoanType(e.target.value)}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E2D45', borderRadius: 8, padding: '10px 14px', color: '#fff', fontSize: 15, boxSizing: 'border-box' }}
              >
                {products.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Loan Term: {loanYears} yrs</label>
              <input
                type="range" min={5} max={30} step={5} value={loanYears} onChange={e => setLoanYears(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642', marginTop: 8 }}
              />
            </div>
          </div>

          {hv > 0 && mv > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14 }}>
              {[
                { label: 'Total Equity', value: fmt(equity) },
                { label: 'Current LTV', value: `${ltv}%` },
                { label: 'Max You Can Borrow', value: fmt(maxBorrow) },
                { label: 'Est. Monthly Payment', value: monthly > 0 ? fmt(monthly) : '—' },
              ].map(s => (
                <div key={s.label} style={{ background: '#0A1628', borderRadius: 10, padding: '18px 20px', textAlign: 'center' }}>
                  <div style={{ color: '#F5E642', fontSize: 22, fontWeight: 800 }}>{s.value}</div>
                  <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          )}
          {(hv === 0 || mv === 0) && (
            <div style={{ textAlign: 'center', color: '#475569', fontSize: 14, padding: 20 }}>Enter your home value and mortgage balance above</div>
          )}
          <div style={{ color: '#475569', fontSize: 12, marginTop: 16 }}>Monthly payment estimates only. Rates vary by lender, credit score, and market conditions. Consult a licensed mortgage professional.</div>
        </div>

        <div style={{ background: '#0f1e35', border: '1px solid #1E2D45', borderRadius: 12, padding: 24 }}>
          <h3 style={{ color: '#F5E642', fontWeight: 700, margin: '0 0 14px' }}>🏗️ How Renovations Affect Equity</h3>
          <ul style={{ color: '#94a3b8', lineHeight: 1.9, paddingLeft: 20, margin: 0 }}>
            <li>Kitchen remodels return 60–80% of cost; minor remodels return more than major ones</li>
            <li>Bathroom additions return 50–60%; master bath remodels slightly higher</li>
            <li>Curb appeal upgrades (landscaping, door replacement) return 70–95%</li>
            <li>Pools in DFW add $20,000–$40,000 in appraised value on average</li>
            <li>Over-improving beyond neighborhood comps reduces ROI — cap your spend at 10–15% above median neighborhood value</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
