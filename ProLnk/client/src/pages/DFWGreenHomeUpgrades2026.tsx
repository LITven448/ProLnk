import { useState } from 'react';

export default function DFWGreenHomeUpgrades2026() {
  const [budget, setBudget] = useState(5000);

  const upgrades = [
    { name: 'Attic Insulation', icon: '🏠', cost: 2500, annualSave: 400, roi: 'Highest ROI in DFW climate', eligible: budget >= 2500 },
    { name: 'Solar Screens', icon: '☀️', cost: 1200, annualSave: 180, roi: 'Block 65% heat gain, 5-yr payback', eligible: budget >= 1200 },
    { name: 'Tankless Water Heater', icon: '🚿', cost: 2000, annualSave: 300, roi: 'Save $300/yr, 20-yr lifespan', eligible: budget >= 2000 },
    { name: 'Smart Irrigation', icon: '💧', cost: 300, annualSave: 150, roi: 'Save 30% water, $150/yr', eligible: budget >= 300 },
    { name: 'LED Whole-Home Upgrade', icon: '💡', cost: 500, annualSave: 120, roi: 'Instant savings, 10-yr bulb life', eligible: budget >= 500 },
    { name: 'Smart Thermostat', icon: '🌡️', cost: 250, annualSave: 180, roi: '$180/yr savings, Oncor rebate eligible', eligible: budget >= 250 },
  ].filter(u => u.eligible).sort((a, b) => b.annualSave / b.cost - a.annualSave / a.cost);

  const totalSavings = upgrades.reduce((s, u) => s + u.annualSave, 0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>🌿</span>
          <h1 style={{ fontSize: 28, color: '#F5E642', margin: 0 }}>DFW Green Home Upgrades 2026</h1>
        </div>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Best green upgrades ranked by ROI for the DFW climate — hot summers, mild winters, intense sun.</p>

        <div style={{ background: '#132040', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <label style={{ color: '#94a3b8', fontSize: 13 }}>Your Budget</label>
          <input type="range" min={250} max={30000} step={250} value={budget}
            onChange={e => setBudget(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#F5E642', margin: '8px 0′ }} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 20 }}>${budget.toLocaleString()}</span>
            {upgrades.length > 0 && <span style={{ color: '#4ade80', fontWeight: 600 }}>Est. annual savings: ${totalSavings}/yr</span>}
          </div>
        </div>

        {upgrades.length === 0 ? (
          <div style={{ background: '#132040', borderRadius: 12, padding: 24, textAlign: 'center', color: '#94a3b8′ }}>
            Increase budget to see upgrade recommendations.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {upgrades.map((u, i) => (
              <div key={u.name} style={{ background: '#132040', borderRadius: 12, padding: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ fontSize: 28, minWidth: 40, textAlign: 'center' }}>{u.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ background: '#F5E642', color: '#0A1628', borderRadius: 4, padding: '2px 8px', fontSize: 12, fontWeight: 700 }}>#{i + 1}</span>
                    <span style={{ fontWeight: 700 }}>{u.name}</span>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>{u.roi}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>${u.cost.toLocaleString()}</div>
                  <div style={{ color: '#4ade80', fontSize: 13 }}>+${u.annualSave}/yr</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
