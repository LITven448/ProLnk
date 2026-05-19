import { useState } from 'react';

const SYSTEMS = [
  { name: 'HVAC System', baseLifespan: 14, replaceCost: 9500, icon: '❄️' },
  { name: 'Roof', baseLifespan: 22, replaceCost: 14000, icon: '🏠' },
  { name: 'Water Heater', baseLifespan: 10, replaceCost: 1400, icon: '🚿' },
  { name: 'Electrical Panel', baseLifespan: 40, replaceCost: 3500, icon: '⚡' },
  { name: 'Plumbing', baseLifespan: 45, replaceCost: 8000, icon: '🔧' },
  { name: 'Foundation', baseLifespan: 85, replaceCost: 7000, icon: '🏗️' },
  { name: 'Windows', baseLifespan: 22, replaceCost: 12000, icon: '🪟' },
];

const fmt = (n: number) => '$' + Math.round(n).toLocaleString();

export default function DFWCapitalExpenseForecast() {
  const [homeAge, setHomeAge] = useState('');
  const [hvacCount, setHvacCount] = useState('1');
  const [hasPool, setHasPool] = useState(false);

  const age = parseInt(homeAge) || 0;
  const hvac = parseInt(hvacCount) || 1;
  const currentYear = 2026;

  const getYearEvents = () => {
    const events: { year: number; name: string; cost: number; icon: string }[] = [];
    SYSTEMS.forEach(sys => {
      let cost = sys.replaceCost;
      let multiplier = sys.name === 'HVAC System' ? hvac : 1;
      let lifespan = sys.baseLifespan;
      const yearsSinceInstall = age;
      const nextReplace = lifespan - (yearsSinceInstall % lifespan);
      for (let i = 0; i < 10; i++) {
        const yr = currentYear + nextReplace + (i * lifespan);
        if (yr <= currentYear + 10) {
          events.push({ year: yr, name: sys.name, cost: cost * multiplier * (1 + 0.04 * (yr - currentYear)), icon: sys.icon });
        }
      }
    });
    if (hasPool) {
      for (let i = 1; i <= 10; i++) {
        events.push({ year: currentYear + i, name: 'Pool Maintenance', cost: 2000 * (1 + 0.03 * i), icon: '🏊' });
        if (i === 8) events.push({ year: currentYear + i, name: 'Pool Equipment Replacement', cost: 4500, icon: '🏊' });
      }
    }
    return events.filter(e => e.year <= currentYear + 10).sort((a, b) => a.year - b.year);
  };

  const events = age > 0 ? getYearEvents() : [];
  const byYear: Record<number, typeof events> = {};
  events.forEach(e => { byYear[e.year] = byYear[e.year] ? [...byYear[e.year], e] : [e]; });
  const totalCost = events.reduce((s, e) => s + e.cost, 0);
  const monthlyReserve = totalCost / 120;
  const years = Object.keys(byYear).map(Number).sort();

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>📊</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW Capital Expense Forecast</h1>
          <p style={{ color: '#94a3b8' }}>10-year forecast of major home expenses — know what's coming and save for it</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: '#F5E642', marginBottom: 6, fontWeight: 600 }}>🏠 Home Age (years)</label>
              <input type="number" min={0} max={60} placeholder="e.g. 12" value={homeAge} onChange={e => setHomeAge(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: '#F5E642', marginBottom: 6, fontWeight: 600 }}>❄️ Number of HVAC Units</label>
              <select value={hvacCount} onChange={e => setHvacCount(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: '1rem' }}>
                {['1','2','3'].map(n => <option key={n} value={n}>{n} Unit{n !== '1' ? 's' : ''}</option>)}
              </select>
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', color: '#e2e8f0' }}>
            <input type="checkbox" checked={hasPool} onChange={e => setHasPool(e.target.checked)}
              style={{ width: 18, height: 18, accentColor: '#F5E642' }} />
            🏊 Include Pool Maintenance
          </label>
        </div>

        {age > 0 && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>10-Year Total CapEx</div>
                <div style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700 }}>{fmt(totalCost)}</div>
              </div>
              <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Monthly Reserve Needed</div>
                <div style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700 }}>{fmt(monthlyReserve)}/mo</div>
              </div>
            </div>

            {years.length === 0 ? (
              <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', textAlign: 'center', color: '#22c55e' }}>
                ✅ No major replacements forecasted in the next 10 years for this home age. Keep up routine maintenance!
              </div>
            ) : (
              <div>
                <h2 style={{ color: '#F5E642' }}>📅 Year-by-Year Forecast</h2>
                {years.map(yr => (
                  <div key={yr} style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
                    <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8, fontSize: '1.1rem' }}>
                      {yr} {yr === currentYear ? '(This Year)' : `(in ${yr - currentYear} yrs)`}
                    </div>
                    {byYear[yr].map((e, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1e3a5f' }}>
                        <span style={{ color: '#e2e8f0' }}>{e.icon} {e.name}</span>
                        <span style={{ color: '#F5E642', fontWeight: 600 }}>{fmt(e.cost)}</span>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>
                      <span>Year Total</span>
                      <span style={{ color: '#fff' }}>{fmt(byYear[yr].reduce((s, e) => s + e.cost, 0))}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
