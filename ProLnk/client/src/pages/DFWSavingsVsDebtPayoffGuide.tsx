import { useState } from 'react';

interface DebtItem {
  name: string;
  balance: number;
  rate: number;
  payment: number;
}

const DEFAULTS: DebtItem[] = [
  { name: 'Credit Card', balance: 8000, rate: 22, payment: 240 },
  { name: 'Car Loan', balance: 15000, rate: 6.5, payment: 350 },
  { name: 'Student Loans', balance: 25000, rate: 5.0, payment: 280 },
];

export default function DFWSavingsVsDebtPayoffGuide() {
  const [debts, setDebts] = useState<DebtItem[]>(DEFAULTS);
  const [currentSavings, setCurrentSavings] = useState(10000);
  const [monthlySurplus, setMonthlySurplus] = useState(1200);
  const [goalMonths, setGoalMonths] = useState(36);
  const [homePriceK, setHomePriceK] = useState(375);

  const homePrice = homePriceK * 1000;
  const mortgageRate = 7.0;
  const downNeeded = homePrice * 0.1 + homePrice * 0.025 + homePrice * 0.006;
  const savingsNeeded = Math.max(0, downNeeded - currentSavings);
  const monthsToDown = monthlySurplus > 0 ? Math.ceil(savingsNeeded / monthlySurplus) : 999;

  const highRateDebts = debts.filter(d => d.rate > mortgageRate);
  const lowRateDebts = debts.filter(d => d.rate <= mortgageRate);
  const totalHighInterestCost = highRateDebts.reduce((s, d) => s + d.balance * d.rate / 100, 0);
  const totalDebtPayments = debts.reduce((s, d) => s + d.payment, 0);

  const payDebtFirst = highRateDebts.length > 0;
  const strategy = payDebtFirst
    ? { label: 'Pay High-Interest Debt First', icon: '💳', color: '#ef4444′ }
    : { label: 'Save for House First', icon: '🏠', color: '#22c55e' };

  const hyMortgageDiff = highRateDebts.reduce((s, d) => s + (d.rate - mortgageRate) / 100 * d.balance, 0);

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#0A1628′ }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '2rem', marginBottom: '2rem', color: '#fff' }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>⚖️ Save for House vs. Pay Off Debt First?</div>
          <p style={{ color: '#cbd5e1', margin: 0 }}>The math for DFW buyers — when paying debt saves money, when saving first wins, and how DFW market conditions affect the decision.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>🏠 Your DFW Home Goal</h2>
          <label style={{ fontWeight: 600 }}>Target Home Price: <span style={{ color: '#F5E642', background: '#0A1628', padding: '2px 10px', borderRadius: 6 }}>${homePriceK}K</span></label>
          <input type="range" min={200} max={800} step={25} value={homePriceK} onChange={e => setHomePriceK(+e.target.value)} style={{ width: '100%', margin: '0.5rem 0', accentColor: '#F5E642′ }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14 }}>Current Savings ($)</label>
              <input type="number" value={currentSavings} onChange={e => setCurrentSavings(+e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 16, marginTop: 4 }} />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14 }}>Monthly Surplus ($)</label>
              <input type="number" value={monthlySurplus} onChange={e => setMonthlySurplus(+e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 16, marginTop: 4 }} />
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>💳 Your Debts vs. Mortgage Rate ({mortgageRate}%)</h2>
          {debts.map((d, i) => {
            const aboveMortgage = d.rate > mortgageRate;
            return (
              <div key={i} style={{
                border: `2px solid ${aboveMortgage ? '#ef4444' : '#22c55e'}`,
                borderRadius: 10, padding: '0.75rem', marginBottom: 8,
                background: aboveMortgage ? '#fef2f2′ : '#f0fdf4'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontWeight: 700 }}>{d.name}</span>
                    <span style={{ marginLeft: 8, fontSize: 12, color: '#64748b' }}>${d.balance.toLocaleString()} @ {d.rate}% APR</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: aboveMortgage ? '#ef4444′ : '#22c55e' }}>
                      {aboveMortgage ? `⬆️ +${(d.rate - mortgageRate).toFixed(1)}% above mortgage` : `✅ Below mortgage rate`}
                    </div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{aboveMortgage ? 'Pay this off first' : 'OK to carry while saving'}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>📊 Path Comparison</h2>
          {[
            {
              path: 'Pay High-Interest Debt First, Then Save',
              pros: ['Save ~$' + Math.round(totalHighInterestCost * 0.5).toLocaleString() + ' in interest', 'Lower DTI → better mortgage rate', 'Less financial stress'],
              cons: ['Delays home purchase by ~' + Math.round(highRateDebts.reduce((s,d) => s + d.balance, 0) / monthlySurplus) + ' months', 'DFW prices may rise during delay'],
              color: '#3b82f6'
            },
            {
              path: 'Save for House While Carrying Debt',
              pros: ['Buy sooner, lock in current DFW prices', 'Build equity faster', 'Works if debt rate < mortgage rate'],
              cons: ['Higher DTI may hurt rate', 'Paying high-rate debt + mortgage = expensive', 'Qualifying harder with high payments'],
              color: '#8b5cf6'
            }
          ].map((p, i) => (
            <div key={i} style={{ border: `2px solid ${p.color}`, borderRadius: 10, padding: '1rem', marginBottom: 10 }}>
              <div style={{ fontWeight: 700, marginBottom: 8, color: p.color }}>{p.path}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div><div style={{ fontSize: 12, fontWeight: 600, color: '#22c55e', marginBottom: 4 }}>✅ PROS</div>{p.pros.map((x,j) => <div key={j} style={{ fontSize: 13, marginBottom: 2 }}>• {x}</div>)}</div>
                <div><div style={{ fontSize: 12, fontWeight: 600, color: '#ef4444', marginBottom: 4 }}>❌ CONS</div>{p.cons.map((x,j) => <div key={j} style={{ fontSize: 13, marginBottom: 2 }}>• {x}</div>)}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: '1.5rem', color: '#fff' }}>
          <h2 style={{ marginTop: 0, color: '#F5E642′ }}>🎯 Our Recommendation</h2>
          <div style={{ background: strategy.color === '#ef4444′ ? '#7c2d12' : '#166534', borderRadius: 8, padding: '1rem', marginBottom: 12 }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{strategy.icon} {strategy.label}</div>
          </div>
          <div style={{ background: '#1e293b', borderRadius: 8, padding: '1rem' }}>
            {payDebtFirst
              ? <div style={{ color: '#94a3b8', fontSize: 14 }}>You have {highRateDebts.length} high-interest debt(s) above your future mortgage rate of {mortgageRate}%. Paying those off first saves ~${Math.round(hyMortgageDiff).toLocaleString()}/year in excess interest and improves your DTI for a better mortgage rate. DFW home prices have been relatively stable — the math favors paying debt first.</div>
              : <div style={{ color: '#94a3b8', fontSize: 14 }}>All your debts are at or below expected mortgage rates. Carrying them while saving makes financial sense. Your ${monthlySurplus.toLocaleString()}/mo surplus gets you to your down payment in {monthsToDown} months.</div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
