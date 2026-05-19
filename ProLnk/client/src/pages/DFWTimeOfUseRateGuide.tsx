import { useState } from 'react';

const appliances = [
  { name: 'Dishwasher', peakUsage: 1.2, offPeakSavings: 0.18 },
  { name: 'Laundry Washer + Dryer', peakUsage: 5.0, offPeakSavings: 0.75 },
  { name: 'EV Charging (Level 2)', peakUsage: 7.2, offPeakSavings: 1.08 },
  { name: 'Pool Pump', peakUsage: 2.0, offPeakSavings: 0.30 },
  { name: 'Oven / Range', peakUsage: 3.5, offPeakSavings: 0.52 },
];

export default function DFWTimeOfUseRateGuide() {
  const [selected, setSelected] = useState<boolean[]>(appliances.map(() => false));
  const [runsPerWeek, setRunsPerWeek] = useState('5');
  const [results, setResults] = useState<{ name: string; monthlySavings: number }[] | null>(null);

  function toggle(i: number) {
    setSelected(prev => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  function calculate() {
    const runs = parseInt(runsPerWeek) || 5;
    const res = appliances.map((a, i) => ({
      name: a.name,
      monthlySavings: selected[i] ? Math.round(a.offPeakSavings * runs * 4.33 * 100) / 100 : 0,
    }));
    setResults(res);
  }

  const total = results ? results.reduce((s, r) => s + r.monthlySavings, 0) : 0;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '2rem' }}>🕐</span>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0 0.25rem' }}>
            DFW Time-of-Use Rate Guide
          </h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>
            DFW is a deregulated electricity market. Time-of-use (TOU) plans charge more during peak hours — but shifting usage saves real money.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#111D35', borderRadius: 10, padding: '1.25rem', border: '1px solid #FF6B6B' }}>
            <div style={{ fontSize: '1.5rem' }}>🔴</div>
            <div style={{ fontWeight: 700, color: '#FF6B6B', fontSize: '1.1rem' }}>Peak Hours</div>
            <div style={{ color: '#94A3B8', fontSize: '0.9rem', marginTop: 4 }}>3 PM – 7 PM (Summer weekdays)</div>
            <div style={{ color: '#FF6B6B', fontWeight: 700, marginTop: 4 }}>~$0.18/kWh</div>
          </div>
          <div style={{ background: '#111D35', borderRadius: 10, padding: '1.25rem', border: '1px solid #34D399′ }}>
            <div style={{ fontSize: '1.5rem' }}>🟢</div>
            <div style={{ fontWeight: 700, color: '#34D399', fontSize: '1.1rem' }}>Off-Peak Hours</div>
            <div style={{ color: '#94A3B8', fontSize: '0.9rem', marginTop: 4 }}>9 PM – 6 AM (best savings)</div>
            <div style={{ color: '#34D399', fontWeight: 700, marginTop: 4 }}>~$0.08/kWh</div>
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 10, padding: '1.25rem', border: '1px solid #1E3A5F', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginTop: 0 }}>🏠 Which appliances can you shift to off-peak?</h2>
          {appliances.map((a, i) => (
            <div key={i} onClick={() => toggle(i)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid #1E3A5F', cursor: 'pointer' }}>
              <div>
                <span style={{ fontWeight: 600 }}>{a.name}</span>
                <span style={{ color: '#94A3B8', fontSize: '0.85rem', marginLeft: 8 }}>{a.peakUsage} kWh/cycle</span>
              </div>
              <span style={{ fontSize: '1.3rem' }}>{selected[i] ? '✅' : '⬜'}</span>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '1px solid #1E3A5F', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginTop: 0 }}>📊 Estimate Savings</h2>
          <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.85rem', marginBottom: 4 }}>Average runs per week (per selected appliance)</label>
          <input value={runsPerWeek} onChange={e => setRunsPerWeek(e.target.value)} type="number" min="1″ max="21"
            style={{ width: 120, padding: '0.6rem', borderRadius: 8, border: '1px solid #1E3A5F', background: '#0A1628', color: '#E8F0FE', fontSize: '1rem', marginBottom: '1rem' }} />
          <br />
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}>
            Calculate Monthly Savings
          </button>
        </div>

        {results && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642′ }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginTop: 0 }}>💰 Savings by Shifting to Off-Peak</h2>
            {results.filter(r => r.monthlySavings > 0).map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1E3A5F' }}>
                <span>{r.name}</span>
                <span style={{ color: '#34D399', fontWeight: 600 }}>${r.monthlySavings.toFixed(2)}/mo</span>
              </div>
            ))}
            <div style={{ marginTop: '1rem', fontWeight: 700, color: '#F5E642', fontSize: '1.2rem' }}>
              🏆 Total Monthly Savings: ${total.toFixed(2)} · Annual: ${(total * 12).toFixed(0)}
            </div>
          </div>
        )}

        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#111D35', borderRadius: 10, border: '1px solid #1E3A5F', color: '#94A3B8', fontSize: '0.85rem' }}>
          🔗 Compare TOU plans at <strong style={{ color: '#F5E642′ }}>PowerToChoose.org</strong> — filter by time-of-use plans from Oncor-area providers.
        </div>
      </div>
    </div>
  );
}
