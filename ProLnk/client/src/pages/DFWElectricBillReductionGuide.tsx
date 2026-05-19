import { useState } from 'react';

const improvements = [
  { name: 'Smart Thermostat Setback', savingsPct: 0.12, cost: 250 },
  { name: 'Attic Insulation Upgrade', savingsPct: 0.15, cost: 1800 },
  { name: 'Ceiling Fans (per room)', savingsPct: 0.04, cost: 150 },
  { name: 'Seal Air Leaks', savingsPct: 0.1, cost: 300 },
  { name: 'Window Shading / Tinting', savingsPct: 0.08, cost: 600 },
];

export default function DFWElectricBillReductionGuide() {
  const [monthlyBill, setMonthlyBill] = useState('');
  const [homeSqFt, setHomeSqFt] = useState('');
  const [implemented, setImplemented] = useState<boolean[]>(improvements.map(() => false));
  const [results, setResults] = useState<{ name: string; annualSavings: number }[] | null>(null);

  function toggleImprovement(i: number) {
    setImplemented(prev => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  function calculate() {
    const bill = parseFloat(monthlyBill);
    if (!bill || bill <= 0) return;
    const annual = bill * 12;
    const res = improvements.map((imp, i) => ({
      name: imp.name,
      annualSavings: implemented[i] ? 0 : Math.round(annual * imp.savingsPct),
    }));
    setResults(res);
  }

  const totalSavings = results ? results.reduce((s, r) => s + r.annualSavings, 0) : 0;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '2rem' }}>⚡</span>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0 0.25rem' }}>
            DFW Electric Bill Reduction Guide
          </h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>
            DFW summer electric bills average <strong style={{ color: '#F5E642' }}>$200–$400/month</strong>. Here's how to cut yours.
          </p>
        </div>

        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
          {improvements.map((imp, i) => (
            <div key={i} style={{ background: '#111D35', borderRadius: 10, padding: '1rem 1.25rem', border: `1px solid ${implemented[i] ? '#F5E642' : '#1E3A5F'}`, cursor: 'pointer' }} onClick={() => toggleImprovement(i)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1rem' }}>{imp.name}</div>
                  <div style={{ color: '#94A3B8', fontSize: '0.85rem', marginTop: 2 }}>
                    Typical cost: ~${imp.cost.toLocaleString()} · Saves ~{Math.round(imp.savingsPct * 100)}% of bill
                  </div>
                </div>
                <span style={{ fontSize: '1.5rem' }}>{implemented[i] ? '✅' : '⬜'}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '1px solid #1E3A5F', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.2rem', fontWeight: 700, marginTop: 0 }}>📊 Calculate Your Savings</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.85rem', marginBottom: 4 }}>Current Monthly Bill ($)</label>
              <input value={monthlyBill} onChange={e => setMonthlyBill(e.target.value)} placeholder="e.g. 280" type="number"
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #1E3A5F', background: '#0A1628', color: '#E8F0FE', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: '0.85rem', marginBottom: 4 }}>Home Size (sq ft)</label>
              <input value={homeSqFt} onChange={e => setHomeSqFt(e.target.value)} placeholder="e.g. 2200" type="number"
                style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1px solid #1E3A5F', background: '#0A1628', color: '#E8F0FE', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}>
            Calculate Savings
          </button>
        </div>

        {results && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.2rem', fontWeight: 700, marginTop: 0 }}>💡 Your Savings Breakdown</h2>
            {results.filter(r => r.annualSavings > 0).map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1E3A5F' }}>
                <span>{r.name}</span>
                <span style={{ color: '#F5E642', fontWeight: 600 }}>+${r.annualSavings}/yr</span>
              </div>
            ))}
            <div style={{ marginTop: '1rem', fontSize: '1.3rem', fontWeight: 700, color: '#F5E642' }}>
              🏆 Total Annual Savings Potential: ${totalSavings.toLocaleString()}
            </div>
            {totalSavings === 0 && <p style={{ color: '#94A3B8' }}>You've already implemented all improvements — great work!</p>}
          </div>
        )}

        <div style={{ marginTop: '2rem', padding: '1rem', background: '#111D35', borderRadius: 10, border: '1px solid #1E3A5F', color: '#94A3B8', fontSize: '0.85rem' }}>
          💡 DFW tip: Choose your electricity provider at <strong style={{ color: '#F5E642' }}>PowerToChoose.org</strong> — deregulated market means you can switch for better rates.
        </div>
      </div>
    </div>
  );
}
