import { useState } from 'react';

const DFW_LIFE_REDUCTION = 2.5;
const BASE_SYSTEM_LIFE: Record<string, number> = {
  'Central AC': 15,
  'Heat Pump': 14,
  'Gas Furnace': 18,
  'Package Unit': 13,
};
const COST_PER_TON: Record<string, number> = {
  small: 3800,
  medium: 4400,
  large: 5200,
};
const BEST_MONTHS = ['September', 'October', 'March'];

export default function DFWHVACAgeCalculator2026() {
  const [installYear, setInstallYear] = useState('2010');
  const [systemType, setSystemType] = useState('Central AC');
  const [homeSize, setHomeSize] = useState('medium');
  const [result, setResult] = useState<null | {
    age: number;
    dfwLife: number;
    remainingYears: number;
    replacementYear: number;
    monthlySavings: number;
    totalCost: number;
    urgency: string;
    bestMonth: string;
  }>(null);

  function calculate() {
    const year = parseInt(installYear, 10);
    if (isNaN(year) || year < 1970 || year > 2026) return;
    const currentYear = 2026;
    const age = currentYear - year;
    const baseLife = BASE_SYSTEM_LIFE[systemType] ?? 15;
    const dfwLife = baseLife - DFW_LIFE_REDUCTION;
    const remainingYears = Math.max(0, Math.round(dfwLife - age));
    const replacementYear = currentYear + remainingYears;
    const totalCost = COST_PER_TON[homeSize];
    const monthsToSave = Math.max(1, remainingYears * 12);
    const monthlySavings = Math.round(totalCost / monthsToSave);
    let urgency = '🟢 Healthy';
    if (remainingYears === 0) urgency = '🔴 Replace Now';
    else if (remainingYears <= 2) urgency = '🟡 Plan Soon';
    const bestMonth = BEST_MONTHS[Math.floor(Math.random() * BEST_MONTHS.length)];
    setResult({ age, dfwLife, remainingYears, replacementYear, monthlySavings, totalCost, urgency, bestMonth });
  }

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40 }}>🌡️</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW HVAC Age Calculator 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>DFW's extreme summers shorten HVAC life by 2–3 years vs. national averages.</p>
        </div>
        <div style={{ background: '#0f2039', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ color: '#F5E642', fontSize: 13 }}>📅 Install Year</span>
            <input type="number" value={installYear} onChange={e => setInstallYear(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 16 }} />
          </label>
          <label style={{ display: 'block', marginBottom: 16 }}>
            <span style={{ color: '#F5E642', fontSize: 13 }}>🔧 System Type</span>
            <select value={systemType} onChange={e => setSystemType(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15 }}>
              {Object.keys(BASE_SYSTEM_LIFE).map(s => <option key={s}>{s}</option>)}
            </select>
          </label>
          <label style={{ display: 'block', marginBottom: 20 }}>
            <span style={{ color: '#F5E642', fontSize: 13 }}>🏠 DFW Home Size</span>
            <select value={homeSize} onChange={e => setHomeSize(e.target.value)}
              style={{ display: 'block', width: '100%', marginTop: 6, padding: '10px 14px', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: 15 }}>
              <option value="small">Small (&lt;1,500 sq ft)</option>
              <option value="medium">Medium (1,500–2,500 sq ft)</option>
              <option value="large">Large (&gt;2,500 sq ft)</option>
            </select>
          </label>
          <button onClick={calculate}
            style={{ width: '100%', padding: '13px 0', background: '#F5E642', color: '#0A1628', fontWeight: 700, fontSize: 16, border: 'none', borderRadius: 8, cursor: 'pointer' }}>
            Calculate DFW Lifespan
          </button>
        </div>
        {result && (
          <div style={{ background: '#0f2039', borderRadius: 12, padding: 24 }}>
            <h2 style={{ color: '#F5E642', marginBottom: 18, fontSize: 18 }}>📊 Your DFW HVAC Plan</h2>
            {[
              ['⏱️ System Age', `${result.age} years`],
              ['📉 DFW-Adjusted Life', `${result.dfwLife.toFixed(1)} years`],
              ['⏳ Remaining Useful Life', `${result.remainingYears} years`],
              ['📆 Recommended Replace By', `${result.replacementYear}`],
              ['🚦 Status', result.urgency],
              ['🌸 Best Month to Replace in DFW', result.bestMonth],
              ['💰 Estimated Replacement Cost', `$${result.totalCost.toLocaleString()}`],
              ['📅 Monthly Savings Target', `$${result.monthlySavings}/mo`],
            ].map(([label, value]) => (
              <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #1e3a5f' }}>
                <span style={{ color: '#94a3b8', fontSize: 14 }}>{label}</span>
                <span style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
