import { useState } from 'react';

const capitalItems = [
  { label: 'HVAC System', avgCost: 9500, lifespanYrs: 12, dfwNote: 'DFW systems work harder — replace every 10–12 yrs vs 15 nationally' },
  { label: 'Roof', avgCost: 13000, lifespanYrs: 22, dfwNote: 'DFW hail events can accelerate — inspect annually' },
  { label: 'Water Heater', avgCost: 1800, lifespanYrs: 11, dfwNote: 'Hard DFW water builds up sediment — flush annually' },
  { label: 'Exterior Paint', avgCost: 5500, lifespanYrs: 8, dfwNote: 'UV intensity means repaint every 6–8 yrs vs 10 nationally' },
  { label: 'Appliances (set)', avgCost: 7500, lifespanYrs: 13, dfwNote: 'Budget $500–600/yr for appliance reserves' },
  { label: 'Driveway Reseal/Replace', avgCost: 4200, lifespanYrs: 15, dfwNote: 'Clay soil shifts create cracks faster in DFW' },
  { label: 'Foundation Drainage', avgCost: 6500, lifespanYrs: 25, dfwNote: 'DFW clay = #1 cause of foundation issues' },
  { label: 'Fence Replacement', avgCost: 4800, lifespanYrs: 12, dfwNote: 'Cedar fence in DFW heat: 10–12 yrs avg' },
];

export default function HomeMaintenanceBudgetGuide() {
  const [homeValue, setHomeValue] = useState(450000);
  const [homeAge, setHomeAge] = useState(2005);
  const [hasPool, setHasPool] = useState(false);
  const [rule, setRule] = useState<'1pct' | '2pct'>('1pct');

  const pct = rule === '1pct' ? 0.01 : 0.02;
  const baseAnnual = Math.round(homeValue * pct);
  const ageSurcharge = homeAge < 1975 ? 0.5 : homeAge < 1990 ? 0.25 : homeAge < 2005 ? 0.1 : 0;
  const poolAddon = hasPool ? 2400 : 0;
  const totalAnnual = Math.round(baseAnnual * (1 + ageSurcharge)) + poolAddon;
  const totalMonthly = Math.round(totalAnnual / 12);

  const currentYear = 2026;
  const tenYearCapex = capitalItems.reduce((acc, item) => {
    const replacementsIn10 = item.lifespanYrs <= 10 ? Math.floor(10 / item.lifespanYrs) : 0;
    const yearsUntilFirst = item.lifespanYrs - ((currentYear - homeAge) % item.lifespanYrs);
    const replacements = yearsUntilFirst <= 10 ? 1 + replacementsIn10 : replacementsIn10;
    return acc + replacements * item.avgCost;
  }, 0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💰</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            How Much to Budget for Home Maintenance
          </h1>
          <p style={{ color: '#94a3b8′ }}>DFW-specific cost projections — the real numbers, not national averages</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ background: '#112240', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>📏 The 1% Rule</div>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>
              Budget 1% of home value per year. Simple, widely cited. On a $450K home: $4,500/yr ($375/mo). Works for newer DFW homes in good condition.
            </p>
          </div>
          <div style={{ background: '#112240', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>📏 The 2% Rule</div>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: 0 }}>
              Budget 2% for older homes or challenging climates. DFW qualifies — heat, clay soil, and hail. On a $450K home: $9,000/yr ($750/mo).
            </p>
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
            🧮 10-Year Cost Projector
          </h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Home Value ($)</label>
              <input type="number" value={homeValue} onChange={e => setHomeValue(Number(e.target.value))}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.5rem', color: '#fff', marginTop: 4, fontSize: '1rem' }} />
            </div>
            <div style={{ flex: 1, minWidth: 140 }}>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Year Built</label>
              <input type="number" value={homeAge} onChange={e => setHomeAge(Number(e.target.value))}
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, padding: '0.5rem', color: '#fff', marginTop: 4, fontSize: '1rem' }} />
            </div>
            <div style={{ flex: 1, minWidth: 120 }}>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Budget Rule</label>
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: 4 }}>
                {(['1pct', '2pct'] as const).map(r => (
                  <button key={r} onClick={() => setRule(r)}
                    style={{ background: rule === r ? '#F5E642′ : '#1e3a5f', color: rule === r ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '0.5rem 0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}>
                    {r === '1pct' ? '1%' : '2%'}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 120 }}>
              <label style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Pool?</label>
              <div style={{ display: 'flex', gap: '0.4rem', marginTop: 4 }}>
                {[true, false].map(v => (
                  <button key={String(v)} onClick={() => setHasPool(v)}
                    style={{ background: hasPool === v ? '#F5E642′ : '#1e3a5f', color: hasPool === v ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '0.5rem 0.75rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' }}>
                    {v ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#F5E642′ }}>${totalMonthly.toLocaleString()}/mo</div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.25rem' }}>Monthly Budget</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#F5E642′ }}>${totalAnnual.toLocaleString()}/yr</div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.25rem' }}>Annual Budget</div>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 10, padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444′ }}>${(tenYearCapex + totalAnnual * 10).toLocaleString()}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.25rem' }}>10-Year Total Forecast</div>
            </div>
          </div>

          {hasPool && (
            <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '0.875rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
              <strong style={{ color: '#F5E642′ }}>Pool Note:</strong> <span style={{ color: '#94a3b8' }}>Added $200/mo ($2,400/yr) for DFW pool maintenance — chemicals, cleaning, equipment. Major resurfacing every 10 yrs: ~$12,000.</span>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
            🏗️ DFW Capital Expense Schedule
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {capitalItems.map(item => (
              <div key={item.label} style={{ background: '#0A1628', borderRadius: 8, padding: '0.875rem', display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 160 }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{item.label}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{item.dfwNote}</div>
                </div>
                <div style={{ textAlign: 'right', minWidth: 120 }}>
                  <div style={{ color: '#F5E642', fontWeight: 700 }}>${item.avgCost.toLocaleString()}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>every ~{item.lifespanYrs} yrs</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1a1a2e', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🛠️</div>
          <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>Need Help Maintaining Your Home?</h3>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.875rem' }}>ProLnk connects DFW homeowners with vetted contractors for every maintenance need.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontSize: '1rem', cursor: 'pointer' }}>
            Find Local Maintenance Pros
          </button>
        </div>
      </div>
    </div>
  );
}
