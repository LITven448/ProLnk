import { useState } from 'react';

export default function DFWRefinanceCalculator() {
  const [currentRate, setCurrentRate] = useState(7.5);
  const [newRate, setNewRate] = useState(6.5);
  const [remainingBalance, setRemainingBalance] = useState(280000);
  const [closingCosts, setClosingCosts] = useState(6000);
  const [points, setPoints] = useState(0);
  const [remainingYears, setRemainingYears] = useState(25);
  const [homeValue, setHomeValue] = useState(420000);

  const oldMonthlyRate = currentRate / 100 / 12;
  const newMonthlyRate = newRate / 100 / 12;
  const oldPayments = remainingYears * 12;
  const newPayments = 360;

  const oldPI = remainingBalance * (oldMonthlyRate * Math.pow(1 + oldMonthlyRate, oldPayments)) / (Math.pow(1 + oldMonthlyRate, oldPayments) - 1) || 0;
  const newPI = remainingBalance * (newMonthlyRate * Math.pow(1 + newMonthlyRate, newPayments)) / (Math.pow(1 + newMonthlyRate, newPayments) - 1) || 0;

  const pointsCost = remainingBalance * (points / 100);
  const totalClosingCosts = closingCosts + pointsCost;
  const monthlySavings = oldPI - newPI;
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(totalClosingCosts / monthlySavings) : 999;
  const breakEvenYears = (breakEvenMonths / 12).toFixed(1);

  const savings5yr = monthlySavings > 0 ? Math.max(0, monthlySavings * 60 - totalClosingCosts) : 0;
  const savings10yr = monthlySavings > 0 ? Math.max(0, monthlySavings * 120 - totalClosingCosts) : 0;
  const savings30yr = monthlySavings > 0 ? Math.max(0, monthlySavings * 360 - totalClosingCosts) : 0;

  const ltv = ((remainingBalance / homeValue) * 100).toFixed(1);
  const availableEquity = homeValue - remainingBalance;
  const maxCashOut = Math.max(0, homeValue * 0.80 - remainingBalance);

  const fmt = (n: number) => '$' + Math.round(n).toLocaleString();
  const rateDiff = (currentRate - newRate).toFixed(2);
  const goodRefi = newRate < currentRate && Number(rateDiff) >= 0.5;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 16, padding: '32px', marginBottom: 24 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🔄 DFW Refinance Calculator</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>Break-even analysis + DFW cash-out equity potential</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { label: '📈 Current Rate %', value: currentRate, min: 3, max: 12, step: 0.1, set: setCurrentRate, suffix: '%' },
            { label: '📉 New Rate %', value: newRate, min: 2.5, max: 11, step: 0.1, set: setNewRate, suffix: '%' },
            { label: '🏦 Remaining Balance', value: remainingBalance, min: 50000, max: 2000000, step: 5000, set: setRemainingBalance, prefix: '$' },
            { label: '🏡 Current Home Value', value: homeValue, min: 100000, max: 3000000, step: 10000, set: setHomeValue, prefix: '$' },
            { label: '💸 Closing Costs', value: closingCosts, min: 1000, max: 20000, step: 500, set: setClosingCosts, prefix: '$' },
            { label: '📋 Discount Points', value: points, min: 0, max: 4, step: 0.25, set: setPoints, suffix: ' pts' },
            { label: '📅 Remaining Years', value: remainingYears, min: 1, max: 30, step: 1, set: setRemainingYears, suffix: ' yr' },
          ].map(({ label, value, min, max, step, set, prefix, suffix }) => (
            <div key={label} style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0A1628', marginBottom: 8 }}>{label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', background: '#0A1628', borderRadius: 8, padding: '8px 12px', marginBottom: 8 }}>
                {prefix}{typeof value === 'number' && value % 1 !== 0 ? value.toFixed(value < 10 ? 2 : 1) : value.toLocaleString()}{suffix}
              </div>
              <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#F5E642′ }}>📊 Refinance Analysis</div>
            <div style={{ background: goodRefi ? '#16a34a' : '#dc2626', color: '#fff', borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 700 }}>
              {goodRefi ? '✅ LOOKS WORTH IT' : '⚠️ MARGINAL'}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 16 }}>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>Current Payment</div>
              <div style={{ color: '#f87171', fontSize: 26, fontWeight: 700 }}>{fmt(oldPI)}/mo</div>
            </div>
            <div style={{ background: 'rgba(245,230,66,0.1)', border: '1px solid #F5E642', borderRadius: 10, padding: 16 }}>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>New Payment</div>
              <div style={{ color: '#F5E642', fontSize: 26, fontWeight: 700 }}>{fmt(newPI)}/mo</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { label: '💰 Monthly Savings', val: monthlySavings > 0 ? fmt(monthlySavings) : 'None', ok: monthlySavings > 0 },
              { label: '⏳ Break-Even', val: breakEvenMonths < 999 ? `${breakEvenYears} yrs` : 'Never', ok: breakEvenMonths < 60 },
              { label: '📉 Rate Drop', val: `${rateDiff}%`, ok: Number(rateDiff) >= 0.5 },
            ].map(({ label, val, ok }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>{label}</div>
                <div style={{ color: ok ? '#4ade80′ : '#f87171', fontSize: 20, fontWeight: 700, marginTop: 4 }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
          {[
            { label: '📅 5-Year Net Savings', val: fmt(savings5yr) },
            { label: '📅 10-Year Net Savings', val: fmt(savings10yr) },
            { label: '📅 30-Year Net Savings', val: fmt(savings30yr) },
          ].map(({ label, val }) => (
            <div key={label} style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', textAlign: 'center' }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#0A1628′ }}>{val}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 12, padding: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#166534', marginBottom: 10 }}>🏠 DFW Cash-Out Potential</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, fontSize: 13, color: '#166534′ }}>
            <div><div style={{ color: '#6b7280′ }}>Current LTV</div><strong>{ltv}%</strong></div>
            <div><div style={{ color: '#6b7280′ }}>Total Equity</div><strong>{fmt(availableEquity)}</strong></div>
            <div><div style={{ color: '#6b7280′ }}>Max Cash-Out (80% LTV)</div><strong>{fmt(maxCashOut)}</strong></div>
          </div>
          <div style={{ marginTop: 10, fontSize: 13, color: '#15803d' }}>💡 DFW home values have appreciated ~4.5%/yr — your home may appraise higher than you expect. Get an appraisal before deciding.</div>
        </div>
      </div>
    </div>
  );
}
