import { useState } from 'react';

interface Debt {
  name: string;
  balance: number;
  payment: number;
  rate: number;
}

const DEFAULT_DEBTS: Debt[] = [
  { name: 'Car Loan', balance: 18000, payment: 420, rate: 6.5 },
  { name: 'Student Loan', balance: 22000, payment: 280, rate: 5.0 },
  { name: 'Credit Card', balance: 4500, payment: 135, rate: 22.0 },
];

export default function DFWDebtToIncomeImprovementGuide() {
  const [income, setIncome] = useState(7500);
  const [dtiLimit, setDtiLimit] = useState(43);
  const [debts, setDebts] = useState<Debt[]>(DEFAULT_DEBTS);
  const [targetMortgage, setTargetMortgage] = useState(1800);

  const totalDebtPayments = debts.reduce((s, d) => s + d.payment, 0);
  const currentDTI = Math.round(((totalDebtPayments + targetMortgage) / income) * 100);
  const maxAllowedDebt = Math.round(income * (dtiLimit / 100));
  const availableForMortgage = Math.max(0, maxAllowedDebt - totalDebtPayments);
  const gap = Math.max(0, (totalDebtPayments + targetMortgage) - maxAllowedDebt);

  const sorted = [...debts].sort((a, b) => {
    const scoreA = (a.payment / a.balance) * (a.rate / 10);
    const scoreB = (b.payment / b.balance) * (b.rate / 10);
    return scoreB - scoreA;
  });

  const dtiColor = currentDTI <= dtiLimit ? '#22c55e' : currentDTI <= dtiLimit + 5 ? '#eab308′ : '#ef4444';

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif', color: '#0A1628′ }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 12, padding: '2rem', marginBottom: '2rem', color: '#fff' }}>
          <div style={{ fontSize: 30, marginBottom: 8 }}>📉 DFW DTI Improvement Guide</div>
          <p style={{ color: '#cbd5e1', margin: 0 }}>Reduce your debt-to-income ratio before buying in DFW. See which debts to eliminate first for maximum DTI improvement.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>💼 Your Financial Inputs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14 }}>Gross Monthly Income ($)</label>
              <input type="number" value={income} onChange={e => setIncome(+e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 16, marginTop: 4 }} />
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: 14 }}>Target Mortgage Payment ($)</label>
              <input type="number" value={targetMortgage} onChange={e => setTargetMortgage(+e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 16, marginTop: 4 }} />
            </div>
          </div>
          <label style={{ fontWeight: 600 }}>Lender DTI Limit: <span style={{ color: '#F5E642', background: '#0A1628', padding: '2px 10px', borderRadius: 6 }}>{dtiLimit}%</span></label>
          <input type="range" min={36} max={50} value={dtiLimit} onChange={e => setDtiLimit(+e.target.value)} style={{ width: '100%', margin: '0.5rem 0', accentColor: '#F5E642′ }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: 12 }}>
            <span>36% (Conservative)</span><span>43% (FHA/Conv standard)</span><span>50% (FHA max)</span>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>📋 Your Current Debts</h2>
          {debts.map((d, i) => (
            <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: '0.75rem', marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600 }}>{d.name}</span>
                <span style={{ color: '#64748b', fontSize: 13 }}>${d.payment}/mo | {d.rate}% APR | ${d.balance.toLocaleString()} balance</span>
              </div>
            </div>
          ))}
          <div style={{ background: '#f8fafc', borderRadius: 8, padding: '0.75rem', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
            <span>Total Monthly Debt</span><span>${totalDebtPayments}/mo</span>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0 }}>🎯 Eliminate These First (Highest Impact)</h2>
          {sorted.map((d, i) => {
            const newDTI = Math.round(((totalDebtPayments - d.payment + targetMortgage) / income) * 100);
            const improvement = currentDTI - newDTI;
            return (
              <div key={i} style={{ border: `2px solid ${i === 0 ? '#F5E642' : '#e2e8f0'}`, borderRadius: 10, padding: '1rem', marginBottom: 10, background: i === 0 ? '#fefce8′ : '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontWeight: 700 }}>{i + 1}. {d.name}</span>
                    {i === 0 && <span style={{ marginLeft: 8, background: '#0A1628', color: '#F5E642', fontSize: 11, padding: '2px 8px', borderRadius: 10, fontWeight: 700 }}>PAY OFF FIRST</span>}
                    <div style={{ color: '#64748b', fontSize: 13, marginTop: 2 }}>Payoff: ${d.balance.toLocaleString()} | Saves ${d.payment}/mo</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#22c55e', fontWeight: 700 }}>DTI -{improvement}%</div>
                    <div style={{ color: '#64748b', fontSize: 12 }}>→ {newDTI}% DTI</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 12, padding: '1.5rem', color: '#fff' }}>
          <h2 style={{ marginTop: 0, color: '#F5E642′ }}>📊 Your DTI Snapshot</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div><div style={{ fontSize: 48, fontWeight: 800, color: dtiColor }}>{currentDTI}%</div><div style={{ color: '#94a3b8′ }}>Current DTI</div></div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Limit: {dtiLimit}%</div>
              {gap > 0
                ? <div style={{ color: '#ef4444', fontWeight: 600 }}>Over by ${gap}/mo</div>
                : <div style={{ color: '#22c55e', fontWeight: 600 }}>✅ Within limit</div>
              }
            </div>
          </div>
          <div style={{ background: '#1e293b', borderRadius: 8, padding: '1rem' }}>
            <div style={{ fontWeight: 700 }}>Max available for mortgage: <span style={{ color: '#F5E642′ }}>${availableForMortgage}/mo</span></div>
            <div style={{ color: '#94a3b8', fontSize: 14, marginTop: 4 }}>Based on your income and current debts at {dtiLimit}% DTI limit.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
