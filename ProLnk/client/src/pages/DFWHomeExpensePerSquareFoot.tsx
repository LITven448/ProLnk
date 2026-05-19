import { useState } from 'react';

const DFW_AVG_PER_SQFT = {
  mortgage: 8.20,
  maintenance: 2.10,
  utilities: 1.85,
  taxes: 2.40,
  insurance: 0.65,
};

const DFW_TOTAL_AVG = Object.values(DFW_AVG_PER_SQFT).reduce((a, b) => a + b, 0);

const SIZE_BENCHMARKS = [
  { label: 'Small DFW Home', sqft: 1200 },
  { label: 'Average DFW Home', sqft: 2100 },
  { label: 'Large DFW Home', sqft: 3200 },
  { label: 'Executive DFW Home', sqft: 4500 },
];

const CATEGORY_LABELS: Record<string, string> = {
  mortgage: '🏦 Mortgage (P&I)',
  maintenance: '🔧 Maintenance',
  utilities: '💡 Utilities',
  taxes: '🏛️ Property Taxes',
  insurance: '🛡️ Homeowner Insurance',
};

export default function DFWHomeExpensePerSquareFoot() {
  const [sqft, setSqft] = useState('');
  const [expenses, setExpenses] = useState<Record<string, string>>({
    mortgage: '', maintenance: '', utilities: '', taxes: '', insurance: '',
  });
  const [calculated, setCalculated] = useState(false);

  const homeSqft = parseFloat(sqft) || 0;
  const totalMonthly = Object.values(expenses).reduce((s, v) => s + (parseFloat(v) || 0), 0);
  const totalAnnual = totalMonthly * 12;
  const userPerSqft = homeSqft > 0 ? totalAnnual / homeSqft : 0;
  const dfwExpectedAnnual = homeSqft * DFW_TOTAL_AVG;

  const getPerSqft = (key: string) => {
    if (!homeSqft) return 0;
    return ((parseFloat(expenses[key]) || 0) * 12) / homeSqft;
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>📐</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>DFW Home Expense per Sq Ft</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Understand your true cost of ownership compared to DFW norms</p>
          <div style={{ background: '#0F2040', borderRadius: 8, padding: 12, marginTop: 12, display: 'inline-block' }}>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>DFW Average: ${DFW_TOTAL_AVG.toFixed(2)}/sq ft/year</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginBottom: 24 }}>
          {SIZE_BENCHMARKS.map(b => (
            <div
              key={b.label}
              onClick={() => setSqft(String(b.sqft))}
              style={{
                background: sqft === String(b.sqft) ? '#1a3a1a' : '#0F2040',
                border: `2px solid ${sqft === String(b.sqft) ? '#F5E642' : '#1e3a5f'}`,
                borderRadius: 8,
                padding: '10px 8px',
                cursor: 'pointer',
                textAlign: 'center',
              }}
            >
              <div style={{ color: sqft === String(b.sqft) ? '#F5E642′ : '#94a3b8', fontSize: 12, marginBottom: 4 }}>{b.label}</div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{b.sqft.toLocaleString()} sqft</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 8 }}>Home Size (sq ft)</label>
            <input
              type="number"
              placeholder="e.g. 2,100″
              value={sqft}
              onChange={e => setSqft(e.target.value)}
              style={{ background: '#1a2f4e', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '10px 14px', width: '100%', fontSize: 15, boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Monthly Expenses</div>
            {Object.keys(expenses).map(key => (
              <div key={key} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, alignItems: 'center' }}>
                <label style={{ color: '#cbd5e1', fontSize: 14 }}>{CATEGORY_LABELS[key]}</label>
                <input
                  type="number"
                  placeholder={`$${Math.round(DFW_AVG_PER_SQFT[key as keyof typeof DFW_AVG_PER_SQFT] * 2100 / 12)}/mo`}
                  value={expenses[key]}
                  onChange={e => setExpenses(prev => ({ ...prev, [key]: e.target.value }))}
                  style={{ background: '#1a2f4e', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 6, padding: '8px 10px', fontSize: 14, boxSizing: 'border-box' }}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setCalculated(true)}
          disabled={!sqft || !totalMonthly}
          style={{ background: sqft && totalMonthly ? '#F5E642′ : '#1e3a5f', color: '#0A1628', fontWeight: 700, fontSize: 16, border: ’none', borderRadius: 10, padding: '14px 32px', width: '100%', cursor: sqft && totalMonthly ? 'pointer' : 'not-allowed', marginBottom: 24 }}
        >
          Calculate My Cost per Sq Ft
        </button>

        {calculated && homeSqft > 0 && totalMonthly > 0 && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, borderLeft: '4px solid #F5E642′ }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              <div style={{ background: '#1a2f4e', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>Your Cost/Sq Ft/Year</div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#F5E642′ }}>${userPerSqft.toFixed(2)}</div>
              </div>
              <div style={{ background: '#1a2f4e', borderRadius: 8, padding: 16, textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: 13 }}>DFW Average</div>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#fff' }}>${DFW_TOTAL_AVG.toFixed(2)}</div>
              </div>
            </div>
            <div style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
              {Object.keys(expenses).map(key => {
                const perSqft = getPerSqft(key);
                const dfwAvg = DFW_AVG_PER_SQFT[key as keyof typeof DFW_AVG_PER_SQFT];
                const delta = perSqft - dfwAvg;
                return (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1a2f4e', borderRadius: 6, padding: '10px 14px' }}>
                    <span style={{ color: '#cbd5e1', fontSize: 14 }}>{CATEGORY_LABELS[key]}</span>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>${perSqft.toFixed(2)}/sqft</span>
                      <span style={{ marginLeft: 8, fontSize: 12, color: delta > 0.2 ? '#f87171′ : delta < -0.2 ? '#34d399' : '#94a3b8' }}>
                        {delta > 0.2 ? `▲ +$${delta.toFixed(2)}` : delta < -0.2 ? `▼ -$${Math.abs(delta).toFixed(2)}` : '≈ avg'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ padding: 12, background: userPerSqft > DFW_TOTAL_AVG * 1.15 ? '#2d1515′ : '#0d2d1a', borderRadius: 8 }}>
              <span style={{ fontWeight: 700, color: userPerSqft > DFW_TOTAL_AVG * 1.15 ? '#f87171′ : '#34d399' }}>
                {userPerSqft > DFW_TOTAL_AVG * 1.15
                  ? `⚠️ You're ${Math.round(((userPerSqft / DFW_TOTAL_AVG) - 1) * 100)}% above DFW average — ${Math.round((userPerSqft - DFW_TOTAL_AVG) * homeSqft).toLocaleString()} extra/year`
                  : `✅ Your cost of ownership is ${userPerSqft < DFW_TOTAL_AVG ? 'below' : 'near'} DFW average`}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
