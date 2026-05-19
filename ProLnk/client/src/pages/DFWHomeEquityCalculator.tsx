import { useState } from 'react';

export default function DFWHomeEquityCalculator() {
  const [purchasePrice, setPurchasePrice] = useState(350000);
  const [downPaymentPct, setDownPaymentPct] = useState(10);
  const [yearsOwned, setYearsOwned] = useState(5);
  const [appreciationRate, setAppreciationRate] = useState(4.5);
  const [interestRate, setInterestRate] = useState(6.5);
  const [extraMonthly, setExtraMonthly] = useState(0);
  const [equityUse, setEquityUse] = useState<'renovation' | 'investment' | 'debt'>('renovation');

  const downAmt = purchasePrice * (downPaymentPct / 100);
  const originalLoan = purchasePrice - downAmt;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = 360;
  const monthlyPI = originalLoan * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1) || 0;

  let balance = originalLoan;
  for (let i = 0; i < yearsOwned * 12; i++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPI + extraMonthly - interest;
    balance = Math.max(0, balance - principal);
  }

  const currentValue = purchasePrice * Math.pow(1 + appreciationRate / 100, yearsOwned);
  const currentEquity = currentValue - balance;
  const ltv = ((balance / currentValue) * 100).toFixed(1);
  const equityPct = ((currentEquity / currentValue) * 100).toFixed(1);

  const maxHELOC = Math.max(0, currentValue * 0.85 - balance);
  const maxCashOut = Math.max(0, currentValue * 0.80 - balance);
  const maxBorrow = equityUse === 'renovation' ? maxHELOC : maxCashOut;

  const helocRate = 0.085;
  const helocMonthly = (maxHELOC * helocRate / 12).toFixed(0);
  const cashOutRate = (interestRate / 100 / 12);
  const cashOutMonthly = maxCashOut > 0 ? (maxCashOut * (cashOutRate * Math.pow(1 + cashOutRate, 240)) / (Math.pow(1 + cashOutRate, 240) - 1)).toFixed(0) : '0';

  const renovationROI = maxHELOC * 0.7;
  const investmentReturn = maxCashOut * 0.07 * 5;
  const debtSavings = maxCashOut * 0.18;

  const useDetails = {
    renovation: { label: '🔨 Home Renovation', rate: '8.5% HELOC', monthly: helocMonthly, return: fmt(renovationROI), returnLabel: 'Est. home value added (70% ROI)' },
    investment: { label: '📈 Investment Property', rate: '8.0% cash-out refi', monthly: cashOutMonthly, return: fmt(investmentReturn), returnLabel: '5-yr est. return at 7%/yr' },
    debt: { label: '💳 Pay Off High-Interest Debt', rate: '8.0% cash-out refi', monthly: cashOutMonthly, return: fmt(debtSavings), returnLabel: 'Annual interest saved at 18% avg' },
  };

  function fmt(n: number) { return '$' + Math.round(Math.abs(n)).toLocaleString(); }

  const principalPaid = originalLoan - balance;
  const appreciationGain = currentValue - purchasePrice;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#0A1628', borderRadius: 16, padding: '32px', marginBottom: 24 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', marginBottom: 8 }}>🏛️ DFW Home Equity Calculator</div>
          <div style={{ color: '#94a3b8', fontSize: 14 }}>See your equity, LTV, HELOC & cash-out potential — DFW appreciated</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
          {[
            { label: '🏡 Purchase Price', value: purchasePrice, min: 100000, max: 2000000, step: 5000, set: setPurchasePrice, prefix: '$' },
            { label: '📉 Down Payment %', value: downPaymentPct, min: 3, max: 50, step: 1, set: setDownPaymentPct, suffix: '%' },
            { label: '📅 Years Owned', value: yearsOwned, min: 1, max: 30, step: 1, set: setYearsOwned, suffix: ' yr' },
            { label: '🏙️ DFW Appreciation %/yr', value: appreciationRate, min: 0, max: 12, step: 0.5, set: setAppreciationRate, suffix: '%' },
            { label: '📈 Original Rate %', value: interestRate, min: 3, max: 12, step: 0.1, set: setInterestRate, suffix: '%' },
            { label: '➕ Extra Principal/mo', value: extraMonthly, min: 0, max: 3000, step: 50, set: setExtraMonthly, prefix: '$' },
          ].map(({ label, value, min, max, step, set, prefix, suffix }) => (
            <div key={label} style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0A1628', marginBottom: 8 }}>{label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#F5E642', background: '#0A1628', borderRadius: 8, padding: '8px 12px', marginBottom: 8 }}>
                {prefix}{typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value.toLocaleString()}{suffix}
              </div>
              <input type="range" min={min} max={max} step={step} value={value} onChange={e => set(Number(e.target.value))} style={{ width: '100%', accentColor: '#F5E642′ }} />
            </div>
          ))}
        </div>

        <div style={{ background: '#0A1628', borderRadius: 16, padding: 24, marginBottom: 24 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#F5E642', marginBottom: 16 }}>📊 Equity Snapshot</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div style={{ background: 'rgba(245,230,66,0.1)', border: '1px solid #F5E642', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>🏠 Current Home Value</div>
              <div style={{ color: '#F5E642', fontSize: 30, fontWeight: 700 }}>{fmt(currentValue)}</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6 }}>💰 Your Equity</div>
              <div style={{ color: '#4ade80', fontSize: 30, fontWeight: 700 }}>{fmt(currentEquity)}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{equityPct}% of home value</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {[
              { label: 'LTV Ratio', val: `${ltv}%`, note: Number(ltv) < 80 ? '✅ Great' : '⚠️ High' },
              { label: 'Equity from Payments', val: fmt(principalPaid) },
              { label: 'Equity from Appreciation', val: fmt(appreciationGain) },
            ].map(({ label, val, note }) => (
              <div key={label} style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 11 }}>{label}</div>
                <div style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginTop: 4 }}>{val}</div>
                {note && <div style={{ color: '#4ade80', fontSize: 11 }}>{note}</div>}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', marginBottom: 24 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#0A1628', marginBottom: 12 }}>💸 How Would You Use Your Equity?</div>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            {(['renovation', 'investment', 'debt'] as const).map(use => (
              <button key={use} onClick={() => setEquityUse(use)} style={{
                flex: 1, padding: '10px 8px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                background: equityUse === use ? '#0A1628′ : '#f1f5f9', color: equityUse === use ? '#F5E642' : '#475569',
              }}>{useDetails[use].label}</button>
            ))}
          </div>
          <div style={{ background: '#F9FAFB', borderRadius: 10, padding: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Max Available</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#0A1628′ }}>{fmt(maxBorrow)}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#64748b' }}>Est. Monthly Payment</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#dc2626′ }}>${useDetails[equityUse].monthly}/mo</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#64748b' }}>{useDetails[equityUse].returnLabel}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#16a34a' }}>{useDetails[equityUse].return}</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: '#fefce8', border: '1px solid #fde047', borderRadius: 12, padding: 16, fontSize: 13, color: '#713f12′ }}>
          🏙️ <strong>DFW Equity Insight:</strong> DFW has appreciated ~4.5%/yr on average. On a {fmt(purchasePrice)} home, that's {fmt(purchasePrice * 0.045)}/year in passive equity gain — your biggest wealth-building lever beyond paying down principal.
        </div>
      </div>
    </div>
  );
}
