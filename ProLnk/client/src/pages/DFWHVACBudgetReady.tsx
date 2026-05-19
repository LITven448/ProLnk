import { useState } from 'react';

const scenarios = [
  { id: 1, label: 'Annual tune-up (spring AC + fall furnace)', low: 150, high: 300, tip: 'Two tune-ups per year is the DFW minimum — skipping one voids most manufacturer warranties.' },
  { id: 2, label: 'Filter replacement (12 filters per year, 1-inch pleated)', low: 60, high: 120, tip: 'DFW air quality means monthly changes — buy in bulk to save 40%.' },
  { id: 3, label: 'Minor repair (capacitor, contactor, drain flush)', low: 150, high: 450, tip: 'Most DFW service calls end with a capacitor or contactor swap — budget for it.' },
  { id: 4, label: 'Moderate repair (blower motor, reversing valve, coil cleaning)', low: 400, high: 1200, tip: 'Mid-tier repairs are the most common DFW HVAC expense — expect one every 3-5 years.' },
  { id: 5, label: 'Major repair (compressor replacement, refrigerant recharge)', low: 1200, high: 2800, tip: 'Compressor failure is the most expensive repair short of full replacement.' },
  { id: 6, label: 'Full system replacement (3-5 ton, DFW standard home)', low: 6000, high: 14000, tip: 'DFW homes average 4-ton systems. Budget $8-10K for a quality mid-tier replacement.' },
];

export default function DFWHVACBudgetReady() {
  const [savings, setSavings] = useState('');
  const [showResults, setShowResults] = useState(false);

  const savingsNum = parseFloat(savings) || 0;
  const minTotal = scenarios.reduce((sum, s) => sum + s.low, 0);
  const midTotal = Math.round(scenarios.reduce((sum, s) => sum + (s.low + s.high) / 2, 0));
  const maxTotal = scenarios.reduce((sum, s) => sum + s.high, 0);
  const recommended = 2000;

  const budgetScore = savingsNum >= recommended ? 100 :
    savingsNum >= 1000 ? 70 :
    savingsNum >= 500 ? 40 : 15;
  const scoreColor = budgetScore >= 80 ? '#22c55e' : budgetScore >= 50 ? '#F5E642' : '#ef4444';
  const scoreLabel = budgetScore >= 80 ? '💰 Budget Ready' : budgetScore >= 50 ? '⚠️ Partially Covered' : '🚨 Under-Budgeted — High Risk';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, sans-serif', color: '#fff' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>💰</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 800, margin: '0.5rem 0' }}>
            Is Your HVAC Budget Adequate for DFW?
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            DFW homeowners spend $600–$2,000/year on HVAC. Know your number before you need it.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {scenarios.map(s => (
            <div key={s.id} style={{ background: '#0d1f38', border: '1px solid #1e3a5f', borderRadius: 10, padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', flex: 1, marginRight: '1rem' }}>{s.label}</div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: '0.95rem', whiteSpace: 'nowrap' }}>
                  ${s.low.toLocaleString()} – ${s.high.toLocaleString()}
                </div>
              </div>
              <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: 4 }}>💡 {s.tip}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0d1f38', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #1e3a5f' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>💵 How much do you have saved for HVAC this year?</div>
          <input
            type="number"
            placeholder="Enter your HVAC savings (e.g. 1500)"
            value={savings}
            onChange={e => setSavings(e.target.value)}
            style={{
              width: '100%', padding: '0.75rem', background: '#0A1628', border: '1px solid #1e3a5f',
              borderRadius: 8, color: '#fff', fontSize: '1rem', boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          onClick={() => setShowResults(true)}
          style={{
            width: '100%', padding: '1rem', background: '#F5E642', color: '#0A1628',
            border: 'none', borderRadius: 10, fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer'
          }}
        >
          💰 Get My HVAC Budget Score
        </button>

        {showResults && (
          <div style={{ marginTop: '2rem', background: '#0d1f38', borderRadius: 12, padding: '1.5rem', border: '1px solid #1e3a5f' }}>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: scoreColor }}>{scoreLabel}</div>
              <div style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.9rem' }}>
                You have: <strong style={{ color: '#fff' }}>${savingsNum.toLocaleString()}</strong> saved | Recommended minimum: <strong style={{ color: '#F5E642' }}>${recommended.toLocaleString()}</strong>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {[{ label: 'Routine Year', val: minTotal }, { label: 'Average Year', val: midTotal }, { label: 'Bad Year', val: maxTotal }].map(r => (
                <div key={r.label} style={{ flex: 1, background: '#0A1628', borderRadius: 8, padding: '0.75rem', textAlign: 'center', border: '1px solid #1e3a5f' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{r.label}</div>
                  <div style={{ color: '#F5E642', fontWeight: 800 }}>${r.val.toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div style={{ background: '#F5E642', borderRadius: 8, padding: '0.75rem', color: '#0A1628', fontWeight: 700, textAlign: 'center' }}>
              🔗 Get Upfront Pricing from DFW Pros → prolnk.io
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
