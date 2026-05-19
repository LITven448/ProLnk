import { useState } from 'react';

const seasonalBills: Record<string, number[]> = {
  '1000': [28, 32, 38, 22, 12, 8, 7, 7, 9, 14, 22, 28],
  '1500': [38, 44, 52, 30, 16, 10, 9, 9, 12, 18, 30, 38],
  '2000': [50, 58, 68, 40, 20, 13, 11, 11, 15, 24, 40, 50],
  '2500': [63, 72, 85, 50, 25, 16, 14, 14, 19, 30, 50, 63],
  '3000': [76, 86, 102, 60, 30, 19, 17, 17, 23, 36, 60, 76],
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const gasAppliances = ['Furnace / Heat', 'Water Heater', 'Gas Range / Oven', 'Gas Dryer', 'Gas Fireplace'];

export default function DFWNaturalGasBillGuide() {
  const [sqft, setSqft] = useState('2000');
  const [appliances, setAppliances] = useState<boolean[]>(gasAppliances.map(() => false));
  const [result, setResult] = useState<{ winter: number; summer: number; annual: number; efficiencySavings: number } | null>(null);

  function toggleAppliance(i: number) {
    setAppliances(prev => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  function calculate() {
    const bills = seasonalBills[sqft] ?? seasonalBills['2000'];
    const applianceCount = appliances.filter(Boolean).length;
    const multiplier = 1 + applianceCount * 0.08;
    const winter = Math.round(((bills[0] + bills[1] + bills[2]) / 3) * multiplier);
    const summer = Math.round(((bills[6] + bills[7]) / 2) * multiplier);
    const annual = Math.round(bills.reduce((s, v) => s + v, 0) * multiplier);
    const efficiencySavings = Math.round(annual * 0.18);
    setResult({ winter, summer, annual, efficiencySavings });
  }

  const bills = seasonalBills[sqft] ?? seasonalBills['2000'];
  const maxBill = Math.max(...bills);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8F0FE', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontSize: '2rem' }}>🔥</span>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', fontWeight: 700, margin: '0.5rem 0 0.25rem' }}>
            DFW Natural Gas Bill Guide
          </h1>
          <p style={{ color: '#94A3B8', margin: 0 }}>
            Atmos Energy serves DFW — rates are regulated, no shopping needed. But efficiency improvements still cut costs significantly.
          </p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 10, padding: '1.25rem', border: '1px solid #1E3A5F', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginTop: 0 }}>📅 Monthly Bill Pattern (select home size)</h2>
          <select value={sqft} onChange={e => setSqft(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: 8, border: '1px solid #1E3A5F', background: '#0A1628', color: '#E8F0FE', fontSize: '1rem', marginBottom: '1.25rem' }}>
            {Object.keys(seasonalBills).map(k => <option key={k} value={k}>{parseInt(k).toLocaleString()} sq ft</option>)}
          </select>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 100 }}>
            {bills.map((b, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <div style={{ background: b === maxBill ? '#F5E642' : '#1E3A5F', borderRadius: 4, width: '100%', height: `${Math.round((b / maxBill) * 88)}px` }} />
                <span style={{ color: '#94A3B8', fontSize: '0.65rem' }}>{months[i]}</span>
              </div>
            ))}
          </div>
          <div style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: 8 }}>
            ⚡ January–February are peak months in DFW — furnace runs 24/7 during cold snaps
          </div>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '1px solid #1E3A5F', marginBottom: '1.5rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginTop: 0 }}>🔧 Which gas appliances do you have?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
            {gasAppliances.map((a, i) => (
              <div key={i} onClick={() => toggleAppliance(i)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                <span style={{ fontSize: '1.3rem' }}>{appliances[i] ? '✅' : '⬜'}</span>
                <span>{a}</span>
              </div>
            ))}
          </div>
          <button onClick={calculate} style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.7rem 1.5rem', fontSize: '1rem', cursor: 'pointer' }}>
            Estimate My Gas Bills
          </button>
        </div>

        {result && (
          <div style={{ background: '#111D35', borderRadius: 12, padding: '1.5rem', border: '1px solid #F5E642' }}>
            <h2 style={{ color: '#F5E642', fontSize: '1.1rem', fontWeight: 700, marginTop: 0 }}>📊 Your Estimated Gas Costs</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
              {[
                { label: 'Peak Winter Month', value: `$${result.winter}`, color: '#FF9F43' },
                { label: 'Summer Month', value: `$${result.summer}`, color: '#34D399' },
                { label: 'Annual Total', value: `$${result.annual}`, color: '#F5E642' },
              ].map((item, i) => (
                <div key={i} style={{ textAlign: 'center', padding: '1rem', background: '#0A1628', borderRadius: 10 }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: item.color }}>{item.value}</div>
                  <div style={{ color: '#94A3B8', fontSize: '0.8rem' }}>{item.label}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '0.75rem', background: '#0A1628', borderRadius: 8, fontSize: '0.9rem' }}>
              💡 Efficiency upgrades (insulation, smart thermostat, high-efficiency furnace) could save <strong style={{ color: '#F5E642' }}>${result.efficiencySavings}/year</strong>
            </div>
          </div>
        )}

        <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#111D35', borderRadius: 10, border: '1px solid #1E3A5F', color: '#94A3B8', fontSize: '0.85rem' }}>
          💰 Atmos Energy offers <strong style={{ color: '#F5E642' }}>Budget Billing</strong> — pay a flat monthly amount year-round to avoid the January spike. Enroll at atmosenergy.com.
        </div>
      </div>
    </div>
  );
}
