import { useState } from 'react';

export default function DFWAnnualMaintenanceCost2026() {
  const [homeValue, setHomeValue] = useState(450000);
  const [homeAge, setHomeAge] = useState(15);
  const [sqft, setSqft] = useState(2400);
  const [hasPool, setHasPool] = useState(false);
  const [hvacAge, setHvacAge] = useState(8);

  const fmt = (n: number) => Math.round(n).toLocaleString();

  const baseRate = homeAge > 30 ? 0.018 : homeAge > 15 ? 0.014 : 0.010;
  const base = homeValue * baseRate;
  const sqftAdj = (sqft - 2000) * 0.35;
  const poolAdj = hasPool ? 2200 : 0;
  const hvacAdj = hvacAge > 12 ? 800 : hvacAge > 8 ? 400 : 0;

  const total = Math.max(base + sqftAdj + poolAdj + hvacAdj, 2500);

  const categories = [
    { name: 'HVAC Service & Repairs', icon: '❄️', pct: 0.22, note: 'DFW systems run 9+ months/yr' },
    { name: 'Roof & Gutters', icon: '🏠', pct: 0.18, note: 'Hail season + UV degradation' },
    { name: 'Foundation Monitoring', icon: '🏗️', pct: 0.12, note: 'DFW clay soil — annual check critical' },
    { name: 'Plumbing', icon: '🚿', pct: 0.14, note: 'Hard water + aging pipes' },
    { name: 'Electrical', icon: '⚡', pct: 0.10, note: 'Safety inspections + updates' },
    { name: 'Landscaping & Irrigation', icon: '🌿', pct: 0.13, note: 'DFW summers need heavy irrigation' },
    { name: 'Pest Control', icon: '🐛', pct: 0.06, note: 'Termites, mosquitoes, DFW rodents' },
    { name: 'Misc / Emergency Fund', icon: '🔧', pct: 0.05, note: 'Always keep 3-mo buffer' },
  ];

  const poolRow = hasPool
    ? { name: 'Pool Maintenance', icon: '🏊', amount: poolAdj, note: 'Chemicals, pump service, cleaning' }
    : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 48 }}>🏡</div>
          <h1 style={{ color: '#F5E642', fontSize: 26, margin: '8px 0 4px' }}>DFW Annual Maintenance Cost Estimator 2026</h1>
          <p style={{ color: '#8899BB', fontSize: 14 }}>Personalized DFW home maintenance budget with category breakdown</p>
        </div>

        <div style={{ background: '#111D35', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              ['Home Value', `$${(homeValue/1000).toFixed(0)}K`, homeValue, setHomeValue, 100000, 2000000, 10000],
              ['Home Age', `${homeAge} yrs`, homeAge, setHomeAge, 1, 60, 1],
              ['Square Footage', `${sqft.toLocaleString()} sqft`, sqft, setSqft, 800, 8000, 100],
              ['HVAC Age', `${hvacAge} yrs`, hvacAge, setHvacAge, 1, 25, 1],
            ].map(([label, display, val, setter, min, max, step]) => (
              <div key={label as string}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#F5E642', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>
                  <span>{label as string}</span><span>{display as string}</span>
                </div>
                <input type="range" min={min as number} max={max as number} step={step as number} value={val as number}
                  onChange={e => (setter as (v: number) => void)(+e.target.value)}
                  style={{ width: '100%', accentColor: '#F5E642′ }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <button onClick={() => setHasPool(!hasPool)}
              style={{ padding: '10px 20px', background: hasPool ? '#F5E642′ : '#1A2A45', color: hasPool ? '#0A1628' : '#fff',
                border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 700 }}>
              🏊 Pool: {hasPool ? 'Yes' : 'No'}
            </button>
          </div>
        </div>

        <div style={{ background: '#0D1F3C', border: '2px solid #F5E642', borderRadius: 12, padding: 24, textAlign: 'center', marginBottom: 24 }}>
          <div style={{ color: '#8899BB', fontSize: 13 }}>ESTIMATED ANNUAL DFW MAINTENANCE BUDGET</div>
          <div style={{ fontSize: 42, fontWeight: 900, color: '#F5E642', margin: '8px 0′ }}>${fmt(total)}</div>
          <div style={{ color: '#8899BB', fontSize: 13 }}>~${fmt(total / 12)}/month to set aside</div>
        </div>

        <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 12 }}>Budget by Category</div>
        {categories.map(cat => {
          const amount = total * cat.pct * (hasPool ? (cat.name.includes('Pool') ? 0 : 1) : 1);
          return (
            <div key={cat.name} style={{ background: '#111D35', borderRadius: 10, padding: '12px 16px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20 }}>{cat.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{cat.name}</div>
                <div style={{ color: '#8899BB', fontSize: 12 }}>{cat.note}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#F5E642', fontWeight: 700 }}>${fmt(amount)}</div>
                <div style={{ color: '#8899BB', fontSize: 11 }}>{Math.round(cat.pct * 100)}%</div>
              </div>
            </div>
          );
        })}
        {poolRow && (
          <div style={{ background: '#111D35', borderRadius: 10, padding: '12px 16px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 20 }}>{poolRow.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{poolRow.name}</div>
              <div style={{ color: '#8899BB', fontSize: 12 }}>{poolRow.note}</div>
            </div>
            <div style={{ color: '#F5E642', fontWeight: 700 }}>${fmt(poolRow.amount)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

