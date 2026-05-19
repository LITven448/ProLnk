import { useState } from 'react';

const UPGRADES = [
  { label: 'Attic Insulation', avgCost: 3500, monthlySavings: 45, co2PerYear: 1200 },
  { label: 'Solar Panels (8kW)', avgCost: 22000, monthlySavings: 160, co2PerYear: 8400 },
  { label: 'HVAC Replacement', avgCost: 8500, monthlySavings: 90, co2PerYear: 2400 },
  { label: 'Low-E Windows', avgCost: 12000, monthlySavings: 55, co2PerYear: 1500 },
  { label: 'Smart Thermostat', avgCost: 350, monthlySavings: 22, co2PerYear: 600 },
  { label: 'Air Sealing', avgCost: 2500, monthlySavings: 35, co2PerYear: 950 },
];

export default function DFWEnergyUpgradeROICalculator() {
  const [monthlyBill, setMonthlyBill] = useState(220);
  const [upgradeIdx, setUpgradeIdx] = useState(2);
  const [upgradeCost, setUpgradeCost] = useState(8500);

  const upgrade = UPGRADES[upgradeIdx];
  const savingsPct = upgrade.monthlySavings / monthlyBill;
  const adjustedSavings = upgrade.monthlySavings * (monthlyBill / 220);
  const annualSavings = adjustedSavings * 12;
  const paybackMonths = upgradeCost / adjustedSavings;
  const paybackYears = paybackMonths / 12;
  const tenYearNet = annualSavings * 10 - upgradeCost;
  const twentyFiveYearNet = annualSavings * 25 - upgradeCost;
  const treesEquivalent = Math.round(upgrade.co2PerYear / 21);

  const fmt = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  const cardStyle = (color: string) => ({
    background: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 20,
    textAlign: 'center' as const,
    border: `1px solid ${color}33`,
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', padding: '32px 16px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>⚡ DFW Energy Upgrade ROI Calculator</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Calculate your real return on energy improvements in North Texas</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 24, border: '1px solid rgba(255,255,255,0.1)', marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 20 }}>
            <span style={{ fontWeight: 600, color: '#e2e8f0′ }}>Current Monthly Electric Bill: {fmt(monthlyBill)}</span>
            <input type="range" min={80} max={500} step={10} value={monthlyBill}
              onChange={e => setMonthlyBill(Number(e.target.value))}
              style={{ width: '100%', marginTop: 8, accentColor: '#F5E642′ }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b' }}>
              <span>$80 (small/efficient)</span><span>$500 (large/older)</span>
            </div>
          </label>

          <label style={{ display: 'block', marginBottom: 20 }}>
            <span style={{ fontWeight: 600, color: '#e2e8f0′ }}>Planned Upgrade</span>
            <select value={upgradeIdx}
              onChange={e => { const i = Number(e.target.value); setUpgradeIdx(i); setUpgradeCost(UPGRADES[i].avgCost); }}
              style={{ display: 'block', width: '100%', marginTop: 8, padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', fontSize: 15, background: '#1e293b', color: '#e2e8f0′ }}>
              {UPGRADES.map((u, i) => <option key={i} value={i}>{u.label} — ~{fmt(u.avgCost)} avg DFW cost</option>)}
            </select>
          </label>

          <label style={{ display: 'block' }}>
            <span style={{ fontWeight: 600, color: '#e2e8f0′ }}>Your Actual Upgrade Cost: {fmt(upgradeCost)}</span>
            <input type="range" min={Math.round(upgrade.avgCost * 0.5)} max={Math.round(upgrade.avgCost * 2)}
              step={100} value={upgradeCost}
              onChange={e => setUpgradeCost(Number(e.target.value))}
              style={{ width: '100%', marginTop: 8, accentColor: '#F5E642′ }} />
          </label>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 20 }}>
          {[['Monthly Savings', fmt(adjustedSavings), '#F5E642'],
            ['Annual Savings', fmt(annualSavings), '#34d399'],
            ['Payback Period', `${paybackYears.toFixed(1)} yrs`, '#60a5fa'],
            ['10-Year Net', fmt(tenYearNet), tenYearNet > 0 ? '#34d399′ : '#f87171']].map(([label, value, color]) => (
            <div key={label as string} style={cardStyle(color as string)}>
              <div style={{ fontSize: 22, fontWeight: 700, color: color as string }}>{value}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: 24, border: '1px solid rgba(245,230,66,0.2)', marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F5E642', marginTop: 0 }}>📈 Long-Term Projection</h2>
          <p style={{ color: '#94a3b8', fontSize: 14 }}>You save ~{(savingsPct * 100).toFixed(0)}% on your electric bill with {upgrade.label}</p>
          <p style={{ color: '#e2e8f0', fontSize: 15 }}>25-Year Net Return: <strong style={{ color: twentyFiveYearNet > 0 ? '#34d399′ : '#f87171' }}>{fmt(twentyFiveYearNet)}</strong></p>
          <p style={{ color: '#e2e8f0', fontSize: 14 }}>🌳 Environmental impact: equivalent to planting <strong style={{ color: '#34d399′ }}>{treesEquivalent} trees/year</strong></p>
          <p style={{ color: '#64748b', fontSize: 12, marginBottom: 0 }}>* DFW defaults: $220/mo avg bill, Oncor/ERCOT grid. Federal 30% tax credit may apply to solar.</p>
        </div>
      </div>
    </div>
  );
}
