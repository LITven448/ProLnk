import { useState } from 'react';

const SCENARIOS = [100, 200, 500, 1000];

function calcPayoff(balance: number, rate: number, extraMonthly: number) {
  const monthlyRate = rate / 100 / 12;
  const minPayment = balance * (monthlyRate * Math.pow(1 + monthlyRate, 360)) / (Math.pow(1 + monthlyRate, 360) - 1);
  let bal = balance;
  let months = 0;
  let totalPaid = 0;
  while (bal > 0 && months < 600) {
    const interest = bal * monthlyRate;
    const payment = minPayment + extraMonthly;
    const principal = Math.min(payment - interest, bal);
    bal -= principal;
    totalPaid += interest + principal;
    months++;
  }
  const baseInterest = minPayment * 360 - balance;
  const newInterest = totalPaid - balance;
  return { months, interestSaved: baseInterest - newInterest, monthsSaved: 360 - months };
}

function addMonths(months: number) {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export default function DFWMortgagePayoffCalculator() {
  const [balance, setBalance] = useState(320000);
  const [rate, setRate] = useState(6.75);
  const [extra, setExtra] = useState(200);

  const base = calcPayoff(balance, rate, 0);
  const custom = calcPayoff(balance, rate, extra);

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', fontFamily: 'system-ui, sans-serif', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏠</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a2744', margin: 0 }}>DFW Mortgage Payoff Calculator</h1>
          <p style={{ color: '#555', marginTop: '0.5rem' }}>See how extra payments cut years off your mortgage</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 700, color: '#1a2744', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Loan Balance</label>
              <input type="range" min={50000} max={900000} step={5000} value={balance}
                onChange={e => setBalance(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#1a2744′ }} />
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#1a2744', fontSize: '1.1rem' }}>${balance.toLocaleString()}</div>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, color: '#1a2744', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Interest Rate (%)</label>
              <input type="range" min={3} max={10} step={0.25} value={rate}
                onChange={e => setRate(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#1a2744′ }} />
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#1a2744', fontSize: '1.1rem' }}>{rate.toFixed(2)}%</div>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 700, color: '#1a2744', marginBottom: '0.5rem', fontSize: '0.85rem' }}>Extra Monthly ($)</label>
              <input type="range" min={0} max={2000} step={50} value={extra}
                onChange={e => setExtra(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#1a2744′ }} />
              <div style={{ textAlign: 'center', fontWeight: 700, color: '#1a2744', fontSize: '1.1rem' }}>${extra.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#1a2744', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem', color: '#fff' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', color: '#aab4cc' }}>Your Custom Extra Payment: +${extra}/mo</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', textAlign: 'center' }}>
            <div><div style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642′ }}>{custom.monthsSaved}</div><div style={{ fontSize: '0.8rem', color: '#aab4cc' }}>Months Saved</div></div>
            <div><div style={{ fontSize: '2rem', fontWeight: 800, color: '#F5E642′ }}>${Math.round(custom.interestSaved).toLocaleString()}</div><div style={{ fontSize: '0.8rem', color: '#aab4cc' }}>Interest Saved</div></div>
            <div><div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F5E642′ }}>{addMonths(custom.months)}</div><div style={{ fontSize: '0.8rem', color: '#aab4cc' }}>New Payoff Date</div></div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {SCENARIOS.map(s => {
            const r = calcPayoff(balance, rate, s);
            return (
              <div key={s} style={{ background: '#fff', borderRadius: 12, padding: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center' }}>
                <div style={{ fontWeight: 700, color: '#1a2744', marginBottom: '0.5rem', fontSize: '0.9rem' }}>+${s}/mo</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2e7d32′ }}>{r.monthsSaved}mo</div>
                <div style={{ fontSize: '0.75rem', color: '#888′ }}>saved</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1a2744', marginTop: '0.25rem' }}>${Math.round(r.interestSaved / 1000)}K less interest</div>
              </div>
            );
          })}
        </div>
        <p style={{ textAlign: 'center', color: '#aaa', fontSize: '0.75rem', marginTop: '1.5rem' }}>Based on 30-year fixed loan. Assumes no prepayment penalty.</p>
      </div>
    </div>
  );
}
