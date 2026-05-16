import { useState } from 'react';

const FINANCING_OPTIONS = [
  { id: 'heloc', name: 'HELOC', rate: 8.5, type: 'variable', maxLtv: 85, term: 10, pros: 'Draw as needed, interest-only phase', cons: 'Variable rate, requires ~20% equity' },
  { id: 'heq', name: 'Home Equity Loan', rate: 8.1, type: 'fixed', maxLtv: 85, term: 15, pros: 'Fixed rate, lump sum, predictable payments', cons: 'Closing costs 2-5%, full draw required' },
  { id: 'cashout', name: 'Cash-Out Refi', rate: 6.9, type: 'fixed', maxLtv: 80, term: 30, pros: 'Lowest rate, single payment', cons: 'Resets mortgage, closing costs ~3%' },
  { id: 'personal', name: 'Personal Loan', rate: 12.5, type: 'fixed', maxLtv: 100, term: 5, pros: 'No equity needed, fast approval', cons: 'Highest rate, short term' },
  { id: 'fha203k', name: 'FHA 203k', rate: 7.1, type: 'fixed', maxLtv: 96.5, term: 30, pros: 'Low down payment, finances purchase+reno', cons: 'MIP required, repair limits apply' },
  { id: 'homestyle', name: 'Fannie Mae HomeStyle', rate: 7.2, type: 'fixed', maxLtv: 97, term: 30, pros: 'Up to 75% of after-improved value', cons: 'Complex process, contractor approval needed' },
];

const DFW_EQUITY_NOTE = 'DFW homes have appreciated ~42% since 2019, giving most owners significant equity to tap.';

export default function DFWRenovationFinancingGuide2026() {
  const [homeValue, setHomeValue] = useState(420000);
  const [mortgageBalance, setMortgageBalance] = useState(280000);
  const [renoAmount, setRenoAmount] = useState(50000);

  const equity = homeValue - mortgageBalance;
  const ltv = mortgageBalance / homeValue;

  const available = FINANCING_OPTIONS.map(opt => {
    const maxBorrow = Math.max(0, homeValue * (opt.maxLtv / 100) - mortgageBalance);
    const canFund = opt.id === 'personal' ? true : maxBorrow >= renoAmount;
    const borrowAmount = opt.id === 'personal' ? renoAmount : Math.min(maxBorrow, renoAmount);
    const rate = opt.rate / 100 / 12;
    const months = opt.term * 12;
    const monthlyPayment = borrowAmount * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    return { ...opt, maxBorrow, canFund, borrowAmount, monthlyPayment };
  }).sort((a, b) => (b.canFund ? 1 : -1) - (a.canFund ? 1 : -1) || a.rate - b.rate);

  const best = available.find(o => o.canFund);

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628' }}>
      <div style={{ background: '#0A1628', color: '#fff', padding: '40px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 36, marginBottom: 8 }}>🔨</div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>DFW Renovation Financing Guide 2026</h1>
        <p style={{ margin: '8px 0 0', color: '#CBD5E1', fontSize: 15 }}>
          HELOC, cash-out refi, 203k — find the best way to fund your project
        </p>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ background: '#F5E642', borderRadius: 12, padding: '16px 20px', marginBottom: 24, fontSize: 14, color: '#0A1628' }}>
          <strong>📈 DFW Equity Opportunity:</strong> {DFW_EQUITY_NOTE}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '24px', marginBottom: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 20 }}>🧮 Find Your Best Financing Option</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { label: 'Current Home Value', value: homeValue, min: 150000, max: 2000000, step: 10000, fmt: (v: number) => `$${v.toLocaleString()}`, set: setHomeValue },
              { label: 'Remaining Mortgage Balance', value: mortgageBalance, min: 0, max: 1500000, step: 5000, fmt: (v: number) => `$${v.toLocaleString()}`, set: setMortgageBalance },
              { label: 'Renovation Budget', value: renoAmount, min: 5000, max: 500000, step: 5000, fmt: (v: number) => `$${v.toLocaleString()}`, set: setRenoAmount },
            ].map(f => (
              <div key={f.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 14 }}>
                  <span style={{ fontWeight: 600 }}>{f.label}</span>
                  <span style={{ fontWeight: 700 }}>{f.fmt(f.value)}</span>
                </div>
                <input type="range" min={f.min} max={f.max} step={f.step} value={f.value}
                  onChange={e => f.set(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#F5E642' }} />
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 20 }}>
            {[
              { label: 'Available Equity', value: `$${equity.toLocaleString()}` },
              { label: 'Current LTV', value: `${(ltv * 100).toFixed(1)}%` },
              { label: 'Renovation Cost', value: `$${renoAmount.toLocaleString()}` },
            ].map(s => (
              <div key={s.label} style={{ background: '#F8FAFC', borderRadius: 8, padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase' }}>{s.label}</div>
                <div style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>{s.value}</div>
              </div>
            ))}
          </div>

          {best && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '16px 20px', marginTop: 20, color: '#fff' }}>
              <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 4 }}>RECOMMENDED FOR YOUR SITUATION</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642' }}>{best.name}</div>
              <div style={{ fontSize: 14, color: '#CBD5E1', marginTop: 4 }}>Rate: {best.rate}% · {best.term}-year · ${best.monthlyPayment.toFixed(0)}/mo estimated payment</div>
              <div style={{ fontSize: 13, marginTop: 6, color: '#94A3B8' }}>✅ {best.pros}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 20 }}>📊 All Options Compared</h2>
          {available.map(opt => (
            <div key={opt.id} style={{ borderRadius: 10, padding: '16px', marginBottom: 12, border: `2px solid ${opt.canFund ? '#E2E8F0' : '#FEE2E2'}`, background: opt.canFund ? '#F8FAFC' : '#FFF5F5', opacity: opt.canFund ? 1 : 0.7 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>{opt.name} {!opt.canFund && <span style={{ color: '#DC2626', fontSize: 13 }}>⚠️ Insufficient equity</span>}</div>
                  <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>Rate: {opt.rate}% {opt.type} · {opt.term}-yr term · Max LTV: {opt.maxLtv}%</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, fontSize: 17 }}>{opt.canFund ? `$${opt.monthlyPayment.toFixed(0)}/mo` : 'N/A'}</div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>Max borrow: ${opt.maxBorrow.toLocaleString()}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 13 }}>
                <span style={{ color: '#16A34A' }}>✅ {opt.pros}</span>
                <span style={{ color: '#DC2626' }}>❌ {opt.cons}</span>
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: 12, marginTop: 24 }}>
          Rates as of May 2026. Consult a licensed lender for actual loan terms and eligibility.
        </p>
      </div>
    </div>
  );
}
