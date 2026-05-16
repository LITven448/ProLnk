import { useState } from 'react';

export default function DFWMortgagePayoffGuide2026() {
  const [rate, setRate] = useState(6.5);
  const [yearsLeft, setYearsLeft] = useState(22);
  const [balance, setBalance] = useState(320000);

  const payoffReturn = rate;
  const marketReturn = 10;
  const breakeven = 7.5;
  const recommendation = rate >= breakeven ? 'payoff' : 'invest';

  const annualInterest = Math.round(balance * (rate / 100));
  const yearsSaved = Math.round(yearsLeft * 0.15);

  return (
    <div style={{ backgroundColor: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>PROLNK FINANCIAL GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>📊 DFW Mortgage Payoff vs. Invest Guide 2026</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>Make the right call for your DFW home and financial future</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { icon: '🏠', label: 'Pay Off Mortgage', return: rate.toFixed(1) + '% guaranteed', color: '#4ade80' },
            { icon: '📈', label: 'S&P 500 Invest', return: '10% historical avg', color: '#60a5fa' },
            { icon: '⚖️', label: 'Breakeven Rate', return: '7.5% mortgage rate', color: '#F5E642' },
          ].map((item) => (
            <div key={item.label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '20px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontWeight: 800, fontSize: 16, color: item.color }}>{item.return}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>🧮 Your Payoff vs. Invest Analysis</h2>
          <div style={{ display: 'grid', gap: 20 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 14, color: '#94a3b8' }}>Mortgage Rate: <strong style={{ color: '#fff' }}>{rate.toFixed(1)}%</strong></span>
              <input type="range" min={3} max={10} step={0.1} value={rate} onChange={e => setRate(+e.target.value)} style={{ accentColor: '#F5E642' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 14, color: '#94a3b8' }}>Years Remaining: <strong style={{ color: '#fff' }}>{yearsLeft}</strong></span>
              <input type="range" min={1} max={30} value={yearsLeft} onChange={e => setYearsLeft(+e.target.value)} style={{ accentColor: '#F5E642' }} />
            </label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 14, color: '#94a3b8' }}>Remaining Balance: <strong style={{ color: '#fff' }}>${balance.toLocaleString()}</strong></span>
              <input type="range" min={50000} max={800000} step={10000} value={balance} onChange={e => setBalance(+e.target.value)} style={{ accentColor: '#F5E642' }} />
            </label>
          </div>

          <div style={{ marginTop: 24, background: recommendation === 'payoff' ? 'rgba(74,222,128,0.15)' : 'rgba(96,165,250,0.15)', border: `1px solid ${recommendation === 'payoff' ? '#4ade80' : '#60a5fa'}`, borderRadius: 12, padding: '20px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 6 }}>RECOMMENDATION</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: recommendation === 'payoff' ? '#4ade80' : '#60a5fa', marginBottom: 6 }}>
              {recommendation === 'payoff' ? '🏠 Pay Off Mortgage First' : '📈 Invest the Difference'}
            </div>
            <div style={{ fontSize: 14, color: '#94a3b8' }}>
              {recommendation === 'payoff'
                ? `At ${rate.toFixed(1)}% you save ~$${annualInterest.toLocaleString()}/yr in interest — beats average bond returns`
                : `At ${rate.toFixed(1)}% your mortgage rate is below the S&P 500 historical average — invest the difference`}
            </div>
          </div>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>🏡 DFW-Specific Factors</div>
          <ul style={{ color: '#94a3b8', fontSize: 14, paddingLeft: 20, lineHeight: 2 }}>
            <li>DFW property taxes avg 2.1% of value — lower principal helps psychologically but taxes remain</li>
            <li>Texas has no state income tax — mortgage interest deduction less impactful here</li>
            <li>DFW appreciation has averaged 6.2%/yr since 2015 — equity building accelerates naturally</li>
            <li>Psychological value of ownership is real — factor in peace of mind</li>
          </ul>
        </div>
      </div>
    </div>
  );
}