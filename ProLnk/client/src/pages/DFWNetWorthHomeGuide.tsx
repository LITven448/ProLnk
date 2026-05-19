import { useState } from 'react';

const formatCurrency = (n: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

export default function DFWNetWorthHomeGuide() {
  const [purchasePrice, setPurchasePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(70000);
  const [yearsOwned, setYearsOwned] = useState(7);
  const [appreciationRate, setAppreciationRate] = useState(6.2);
  const [altReturn, setAltReturn] = useState(9.0);
  const [rate, setRate] = useState(7.0);

  const currentValue = purchasePrice * Math.pow(1 + appreciationRate / 100, yearsOwned);
  const loanAmount = purchasePrice - downPayment;
  const monthlyRate = rate / 100 / 12;
  const paymentsMade = yearsOwned * 12;
  const monthlyPayment = loanAmount > 0 ? (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -360)) : 0;
  const remainingBalance = loanAmount > 0
    ? loanAmount * Math.pow(1 + monthlyRate, paymentsMade) - monthlyPayment * ((Math.pow(1 + monthlyRate, paymentsMade) - 1) / monthlyRate)
    : 0;
  const currentEquity = currentValue - remainingBalance;
  const equityGain = currentEquity - downPayment;

  const altPortfolio = downPayment * Math.pow(1 + altReturn / 100, yearsOwned);
  const altGain = altPortfolio - downPayment;

  const homeROI = downPayment > 0 ? ((currentEquity - downPayment) / downPayment) * 100 : 0;
  const altROI = ((altPortfolio - downPayment) / downPayment) * 100;

  const appreciationGain = currentValue - purchasePrice;
  const principalPaydown = loanAmount - remainingBalance;

  return (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', color: '#0A1628′ }}>
      <div style={{ background: '#0A1628', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: 36 }}>📈</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 800, margin: '12px 0 8px' }}>
          Home Equity as Wealth Building in DFW
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: 16, maxWidth: 640, margin: '0 auto' }}>
          DFW homes have appreciated 6.2% annually over the last decade. See how equity builds and how it compares to investing that down payment.
        </p>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 40 }}>
          {[
            { label: 'DFW Avg Annual Appreciation', value: '6.2%', sub: 'Last 10 years (2015–2025)', icon: '📊' },
            { label: 'Equity from $350K Home (7 yrs)', value: formatCurrency(350000 * Math.pow(1.062, 7) - 280000), sub: 'Appreciation + principal paydown', icon: '💰' },
            { label: 'Leverage Multiplier', value: '5–8x', sub: 'Home equity vs. cash invested', icon: '⚡' },
          ].map(card => (
            <div key={card.label} style={{ background: '#fff', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{card.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#0A1628′ }}>{card.value}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#0A1628', margin: '4px 0 2px' }}>{card.label}</div>
              <div style={{ fontSize: 11, color: '#94a3b8′ }}>{card.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0', marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>💡 Two Ways Equity Builds</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 14, color: '#475569′ }}>
            <div style={{ background: '#F9FAFB', borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: 6 }}>📉 Principal Paydown</div>
              Each mortgage payment reduces what you owe. In year 1, only ~15% goes to principal; by year 10 it flips toward 60%+. Over 30 years you eliminate the entire debt.
            </div>
            <div style={{ background: '#F9FAFB', borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 700, color: '#0A1628', marginBottom: 6 }}>🏠 Appreciation</div>
              DFW's job growth, population influx, and land constraints push values up ~6% annually. At 20% down, you control 100% of a home on 20% capital — a 5x leverage position.
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 12, padding: 24, border: '1px solid #e2e8f0', marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>⚖️ When to Leverage Equity vs Let It Grow</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 14, color: '#475569′ }}>
            <div style={{ background: '#fef3c7', borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 700, color: '#92400e', marginBottom: 6 }}>✅ Good Time to Leverage</div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                <li>Fund home improvements that increase value</li>
                <li>Invest in rental property (HELOC as down payment)</li>
                <li>Eliminate high-interest debt (&gt;8%)</li>
                <li>Start a business with clear ROI plan</li>
              </ul>
            </div>
            <div style={{ background: '#fce7f3', borderRadius: 8, padding: 16 }}>
              <div style={{ fontWeight: 700, color: '#9d174d', marginBottom: 6 }}>⚠️ Let It Grow Instead</div>
              <ul style={{ margin: 0, paddingLeft: 18 }}>
                <li>Lifestyle spending (vacations, cars)</li>
                <li>Income is uncertain or variable</li>
                <li>Close to retirement and reducing debt exposure</li>
                <li>Market feels uncertain — protect your primary asset</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid #e2e8f0', marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>🧮 Equity vs. Invested Alternatives Calculator</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
            {[
              { label: 'Purchase Price', value: purchasePrice, setValue: setPurchasePrice, step: 10000 },
              { label: 'Down Payment ($)', value: downPayment, setValue: setDownPayment, step: 5000 },
              { label: 'Years Owned', value: yearsOwned, setValue: setYearsOwned, step: 1 },
              { label: 'DFW Appreciation Rate (%)', value: appreciationRate, setValue: setAppreciationRate, step: 0.1 },
              { label: 'Mortgage Rate (%)', value: rate, setValue: setRate, step: 0.1 },
              { label: 'Alt Investment Return (%)', value: altReturn, setValue: setAltReturn, step: 0.5 },
            ].map(field => (
              <div key={field.label}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 4 }}>{field.label}</label>
                <input
                  type="number"
                  step={field.step}
                  value={field.value}
                  onChange={e => field.setValue(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #cbd5e1', borderRadius: 8, fontSize: 15, boxSizing: 'border-box' }}
                />
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#0A1628', borderRadius: 12, padding: 24, color: '#fff' }}>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12, fontWeight: 600 }}>🏡 HOME EQUITY PATH</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#94a3b8', fontSize: 13 }}>Current Est. Value</span><br /><span style={{ fontSize: 22, fontWeight: 800, color: '#F5E642′ }}>{formatCurrency(currentValue)}</span></div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#94a3b8', fontSize: 13 }}>Current Equity</span><br /><span style={{ fontSize: 20, fontWeight: 700 }}>{formatCurrency(currentEquity)}</span></div>
              <div style={{ fontSize: 12, color: '#64748b', borderTop: '1px solid #1e293b', paddingTop: 12 }}>
                <div>Appreciation gain: {formatCurrency(appreciationGain)}</div>
                <div>Principal paydown: {formatCurrency(principalPaydown)}</div>
                <div>ROI on down payment: {homeROI.toFixed(1)}%</div>
              </div>
            </div>
            <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, color: '#fff' }}>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12, fontWeight: 600 }}>📊 INVESTED ALTERNATIVE</div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#94a3b8', fontSize: 13 }}>Portfolio Value</span><br /><span style={{ fontSize: 22, fontWeight: 800, color: '#F5E642′ }}>{formatCurrency(altPortfolio)}</span></div>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#94a3b8', fontSize: 13 }}>Investment Gain</span><br /><span style={{ fontSize: 20, fontWeight: 700 }}>{formatCurrency(altGain)}</span></div>
              <div style={{ fontSize: 12, color: '#64748b', borderTop: '1px solid #334155', paddingTop: 12 }}>
                <div>Starting investment: {formatCurrency(downPayment)}</div>
                <div>Annual return assumed: {altReturn}%</div>
                <div>ROI: {altROI.toFixed(1)}%</div>
              </div>
            </div>
          </div>
          <div style={{ background: equityGain > altGain ? '#dcfce7′ : '#fce7f3', borderRadius: 8, padding: 12, marginTop: 16, fontSize: 14, textAlign: ’center' }}>
            {equityGain > altGain
              ? `🏡 Home equity outperforms by ${formatCurrency(equityGain - altGain)} over ${yearsOwned} years`
              : `📊 Investing outperforms by ${formatCurrency(altGain - equityGain)} over ${yearsOwned} years`}
          </div>
        </div>
      </div>
    </div>
  );
}
