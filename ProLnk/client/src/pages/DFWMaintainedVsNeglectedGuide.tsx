import { useState } from 'react';

const YEARLY_MAINTENANCE = 4000;
const DEFERRED_ANNUAL_ACCUMULATION = 1800;
const NEGLECT_DAMAGE_MULTIPLIER = 2.4;

const YEAR_SNAPSHOTS = [3, 5, 7, 10];

interface Snapshot {
  year: number;
  maintainedValue: number;
  neglectedValue: number;
  deferredCost: number;
  maintainedSpent: number;
}

export default function DFWMaintainedVsNeglectedGuide() {
  const [homeValue, setHomeValue] = useState('');
  const [calculated, setCalculated] = useState(false);

  const base = parseFloat(homeValue) || 0;
  const dfwAppreciation = 0.059;

  const buildSnapshots = (): Snapshot[] =>
    YEAR_SNAPSHOTS.map(year => {
      const marketBase = base * Math.pow(1 + dfwAppreciation, year);
      const maintainedValue = marketBase + base * 0.03;
      const deferredCost = DEFERRED_ANNUAL_ACCUMULATION * year * NEGLECT_DAMAGE_MULTIPLIER;
      const neglectedValue = marketBase * 0.88 - deferredCost;
      const maintainedSpent = YEARLY_MAINTENANCE * year;
      return { year, maintainedValue, neglectedValue, deferredCost, maintainedSpent };
    });

  const snapshots = buildSnapshots();

  const OUTCOME_ROWS = [
    { label: 'Annual maintenance spend', maintained: '$4,000/yr', neglected: '$0/yr' },
    { label: 'Emergency repair risk', maintained: 'Low (caught early)', neglected: 'High (deferred damage)' },
    { label: 'Insurance premiums', maintained: 'Standard rate', neglected: '+15-30% surcharge' },
    { label: 'Buyer perception (resale)', maintained: 'Premium pricing power', neglected: 'Price reductions required' },
    { label: 'Foundation risk (DFW clay)', maintained: 'Managed with watering', neglected: 'High failure probability' },
    { label: 'HVAC lifespan', maintained: '15-18 years', neglected: '8-11 years' },
  ];

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 16px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🏘️</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#F5E642', margin: 0 }}>Maintained vs Neglected DFW Home</h1>
          <p style={{ color: '#94a3b8', marginTop: 8 }}>Two identical DFW homes — same price, same location. 10 years later...</p>
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <label style={{ color: '#F5E642', fontWeight: 600, display: 'block', marginBottom: 8 }}>Current Home Value</label>
          <input
            type="number"
            placeholder="$380,000″
            value={homeValue}
            onChange={e => setHomeValue(e.target.value)}
            style={{ background: '#1a2f4e', color: '#fff', border: '1px solid #1e3a5f', borderRadius: 8, padding: '12px 16px', width: '100%', fontSize: 16, boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ background: '#0F2040', borderRadius: 12, padding: 24, marginBottom: 20 }}>
          <h3 style={{ color: '#F5E642', margin: '0 0 16px', fontSize: 16 }}>📊 Side-by-Side Comparison</h3>
          <div style={{ display: 'grid', gap: 8 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 8, paddingBottom: 8, borderBottom: '1px solid #1e3a5f' }}>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Factor</div>
              <div style={{ color: '#34d399', fontWeight: 700, fontSize: 13, textAlign: 'center' }}>✅ Maintained</div>
              <div style={{ color: '#f87171', fontWeight: 700, fontSize: 13, textAlign: 'center' }}>⚠️ Neglected</div>
            </div>
            {OUTCOME_ROWS.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 8, padding: '8px 0', borderBottom: '1px solid #0d1e38′ }}>
                <div style={{ color: '#cbd5e1', fontSize: 14 }}>{row.label}</div>
                <div style={{ color: '#34d399', fontSize: 13, textAlign: 'center' }}>{row.maintained}</div>
                <div style={{ color: '#f87171', fontSize: 13, textAlign: 'center' }}>{row.neglected}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setCalculated(true)}
          disabled={!homeValue}
          style={{ background: homeValue ? '#F5E642′ : '#1e3a5f', color: '#0A1628', fontWeight: 700, fontSize: 16, border: ’none', borderRadius: 10, padding: '14px 32px', width: '100%', cursor: homeValue ? 'pointer' : 'not-allowed', marginBottom: 24 }}
        >
          Project 10-Year Outcomes for My Home
        </button>

        {calculated && base > 0 && (
          <div style={{ background: '#0F2040', borderRadius: 12, padding: 24 }}>
            <h3 style={{ color: '#F5E642', margin: '0 0 20px' }}>📅 Value Projections Over Time</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              {snapshots.map(snap => (
                <div key={snap.year} style={{ background: '#1a2f4e', borderRadius: 10, padding: 16 }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 10 }}>Year {snap.year}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div style={{ background: '#0d2d1a', borderRadius: 8, padding: 12 }}>
                      <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>✅ Maintained Value</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: '#34d399′ }}>${Math.round(snap.maintainedValue).toLocaleString()}</div>
                      <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>Spent: ${snap.maintainedSpent.toLocaleString()}</div>
                    </div>
                    <div style={{ background: '#2d1515', borderRadius: 8, padding: 12 }}>
                      <div style={{ color: '#94a3b8', fontSize: 12, marginBottom: 4 }}>⚠️ Neglected Value</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: '#f87171′ }}>${Math.round(snap.neglectedValue).toLocaleString()}</div>
                      <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>Deferred: ${Math.round(snap.deferredCost).toLocaleString()}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 10, padding: 8, background: '#0A1628', borderRadius: 6, textAlign: 'center' }}>
                    <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>
                      Gap: ${Math.round(snap.maintainedValue - snap.neglectedValue).toLocaleString()} in your favor
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
