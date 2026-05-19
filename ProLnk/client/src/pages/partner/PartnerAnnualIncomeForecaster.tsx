import { useState } from 'react';

function calcMonthly(
  month: number,
  directJobs: number,
  avgJobValue: number,
  directPartners: number,
  subPartners: number,
) {
  const directRate = 0.12;
  const l1Rate = 0.07;
  const l2Rate = 0.04;

  const directIncome = directJobs * avgJobValue * directRate;

  const networkMultiplier = Math.pow(1.15, month - 1);
  const l1Partners = directPartners * networkMultiplier;
  const l2Partners = l1Partners * subPartners;

  const l1Estimate = l1Partners * 2 * avgJobValue * l1Rate;
  const l2Estimate = l2Partners * 1.5 * avgJobValue * l2Rate;

  const subscriptionIncome = directPartners * networkMultiplier * 149 * 0.12;

  return directIncome + l1Estimate + l2Estimate + subscriptionIncome;
}

function fmt(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function PartnerAnnualIncomeForecaster() {
  const [directJobs, setDirectJobs] = useState(10);
  const [avgJobValue, setAvgJobValue] = useState(500);
  const [directPartners, setDirectPartners] = useState(3);
  const [subPartners, setSubPartners] = useState(2);

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const incomes = months.map(m => calcMonthly(m, directJobs, avgJobValue, directPartners, subPartners));
  const annual = incomes.reduce((a, b) => a + b, 0);

  const monthLabels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const maxIncome = Math.max(...incomes, 1);

  return (
    <div style={{ backgroundColor: '#F9FAFB', minHeight: '100vh', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 32 }}>📈</span>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0A1628', margin: 0 }}>Annual Income Forecaster</h1>
          </div>
          <p style={{ color: '#64748B', fontSize: 15, margin: 0 }}>
            Adjust the sliders to project your 12-month earning potential with network compounding.
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ fontWeight: 700, color: '#0A1628', fontSize: 16, marginTop: 0, marginBottom: 20 }}>🎛️ Your Inputs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[
              { label: 'Direct jobs / month', value: directJobs, set: setDirectJobs, min: 1, max: 50, suffix: 'jobs' },
              { label: 'Average job value ($)', value: avgJobValue, set: setAvgJobValue, min: 100, max: 5000, step: 50, suffix: '$' },
              { label: 'Partners you recruit (Month 1)', value: directPartners, set: setDirectPartners, min: 0, max: 20, suffix: 'partners' },
              { label: 'Sub-partners per partner', value: subPartners, set: setSubPartners, min: 0, max: 10, suffix: 'avg' },
            ].map(({ label, value, set, min, max, step = 1, suffix }) => (
              <div key={label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <label style={{ fontSize: 13, color: '#0A1628', fontWeight: 600 }}>{label}</label>
                  <span style={{ fontSize: 13, color: '#F5E642', fontWeight: 700, backgroundColor: '#0A1628', padding: '1px 8px', borderRadius: 99 }}>
                    {suffix === '$' ? fmt(value) : `${value} ${suffix}`}
                  </span>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={value}
                  onChange={e => set(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#F5E642′ }}
                />
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0A1628', borderRadius: 12, padding: 24, marginBottom: 24, color: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span style={{ fontSize: 15, color: '#94A3B8′ }}>Projected Annual Income</span>
            <span style={{ fontSize: 14, color: '#94A3B8′ }}>at current trajectory</span>
          </div>
          <div style={{ fontSize: 44, fontWeight: 800, color: '#F5E642′ }}>{fmt(annual)}</div>
          <p style={{ color: '#94A3B8', fontSize: 13, margin: '8px 0 0′ }}>
            ⚡ Network income doubles every 2–3 months when you are actively recruiting. Month 12 alone: {fmt(incomes[11])}
          </p>
        </div>

        <div style={{ backgroundColor: '#fff', borderRadius: 12, padding: 24, marginBottom: 24, border: '1px solid #E2E8F0′ }}>
          <h2 style={{ fontWeight: 700, color: '#0A1628', fontSize: 16, marginTop: 0, marginBottom: 20 }}>📊 Month-by-Month Projection</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E2E8F0′ }}>
                  <th style={{ textAlign: 'left', padding: '6px 8px', color: '#64748B', fontWeight: 600 }}>Month</th>
                  <th style={{ textAlign: 'right', padding: '6px 8px', color: '#64748B', fontWeight: 600 }}>Income</th>
                  <th style={{ textAlign: 'left', padding: '6px 8px', color: '#64748B', fontWeight: 600, width: '50%' }}>Growth Bar</th>
                </tr>
              </thead>
              <tbody>
                {incomes.map((inc, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F1F5F9′ }}>
                    <td style={{ padding: '8px 8px', color: '#0A1628', fontWeight: 600 }}>{monthLabels[i]}</td>
                    <td style={{ padding: '8px 8px', color: '#0A1628', textAlign: 'right', fontWeight: 700 }}>{fmt(inc)}</td>
                    <td style={{ padding: '8px 8px' }}>
                      <div style={{ height: 10, backgroundColor: '#F1F5F9', borderRadius: 99 }}>
                        <div style={{ height: 10, backgroundColor: '#F5E642', borderRadius: 99, width: `${(inc / maxIncome) * 100}%` }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ backgroundColor: '#FFF8E1', border: '1px solid #F5E642', borderRadius: 12, padding: 20 }}>
          <p style={{ margin: 0, fontSize: 13, color: '#0A1628′ }}>
            <strong>⚠️ Disclaimer:</strong> These projections are illustrative estimates based on typical network growth patterns. Actual results depend on your activity, market conditions, and the performance of your recruited partners. Income is not guaranteed.
          </p>
        </div>
      </div>
    </div>
  );
}
