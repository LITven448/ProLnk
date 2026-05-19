import { useState } from 'react';

const MONTHLY_TASKS: Record<string, string[]> = {
  Jan: ['Check weatherstripping', 'Test smoke detectors'],
  Feb: ['Inspect attic insulation', 'Clean dryer vent'],
  Mar: ['AC tune-up (book early)', 'Check foundation for cracks'],
  Apr: ['Replace AC filters (1″=monthly, 4″=quarterly)', 'Pest control Q1'],
  May: ['Gutter cleaning', 'Check sprinkler heads before heat'],
  Jun: ['AC filter check', 'Foundation watering system active'],
  Jul: ['AC filter (monthly in summer)', 'Watch for foundation shifting'],
  Aug: ['AC filter (monthly)', 'Check attic ventilation'],
  Sep: ['Pest control Q3', 'Gutter cleaning (fall leaves coming)'],
  Oct: ['HVAC tune-up for winter', 'Caulk windows/doors'],
  Nov: ['Check weatherstripping', 'Insulate pipes in garage'],
  Dec: ['Test heater before first cold snap', 'Pest control Q4'],
};

const BASE_COSTS = { acFilters: 120, pestControl: 400, foundationWatering: 200, gutters: 300, hvacTuneUp: 200, misc: 300 };

export default function DFWFirstYearMaintenanceCosts() {
  const [homeAge, setHomeAge] = useState(10);
  const [sqFt, setSqFt] = useState(2000);
  const [hasPool, setHasPool] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const calcTotal = () => {
    let total = Object.values(BASE_COSTS).reduce((a, b) => a + b, 0);
    if (homeAge > 20) total += 600;
    if (sqFt > 2500) total += 400;
    if (hasPool) total += 1200;
    return total;
  };

  const getAgeWarnings = () => {
    const warnings = [];
    if (homeAge > 20) warnings.push('🔧 Older systems: budget extra for unexpected HVAC or plumbing repairs.');
    if (homeAge > 35) warnings.push('⚡ Electrical panel may need upgrade — common in 35+ year DFW homes.');
    if (homeAge > 45) warnings.push('🚰 Cast iron drain lines may need scoping — budget $150 for camera inspection.');
    return warnings;
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '0.5rem 1rem', display: 'inline-block', fontWeight: 700, marginBottom: '1rem', fontSize: 13 }}>
          🗓️ DFW HOMEOWNER GUIDE
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>First Year Maintenance Costs</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, fontSize: 15 }}>
          DFW surprises first-time homeowners: monthly AC filters in summer, foundation watering, quarterly pest control, and more. Here's what to expect.
        </p>

        <div style={{ background: '#0f2044', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>🏡 Your Home Details</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Home Age (years)</label>
              <input type="range" min={1} max={60} value={homeAge} onChange={e => setHomeAge(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{homeAge} years</div>
            </div>
            <div>
              <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Square Footage</label>
              <input type="range" min={800} max={5000} step={100} value={sqFt} onChange={e => setSqFt(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#F5E642′ }} />
              <div style={{ color: '#F5E642', fontWeight: 700 }}>{sqFt.toLocaleString()} sq ft</div>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <input type="checkbox" checked={hasPool} onChange={e => setHasPool(e.target.checked)}
                style={{ accentColor: '#F5E642', width: 18, height: 18 }} />
              <span style={{ fontSize: 14 }}>🏊 Has a pool (+$1,200/year maintenance)</span>
            </label>
            <button onClick={() => setSubmitted(true)}
              style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
              📊 Calculate My First Year Cost
            </button>
          </div>
        </div>

        {submitted && (
          <div>
            <div style={{ background: '#0f2044', borderRadius: 12, padding: '1.5rem', marginBottom: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#94a3b8', marginBottom: 6 }}>Estimated First Year Maintenance</div>
              <div style={{ fontSize: 42, fontWeight: 800, color: '#F5E642′ }}>${calcTotal().toLocaleString()}</div>
              <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 4 }}>${Math.round(calcTotal() / 12)}/month average</div>
            </div>

            {getAgeWarnings().map((w, i) => (
              <div key={i} style={{ background: '#1e3a5f', borderRadius: 10, padding: '0.85rem 1rem', marginBottom: 10, fontSize: 14, color: '#93c5fd' }}>{w}</div>
            ))}

            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>🗓️ Monthly Maintenance Calendar</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {Object.entries(MONTHLY_TASKS).map(([month, tasks]) => (
                <div key={month} style={{ background: '#0f2044', borderRadius: 10, padding: '0.85rem 1rem' }}>
                  <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 6, fontSize: 14 }}>{month}</div>
                  {tasks.map((t, i) => <div key={i} style={{ fontSize: 12, color: '#94a3b8′ }}>• {t}</div>)}
                </div>
              ))}
            </div>

            <div style={{ background: '#0f2044', borderRadius: 12, padding: '1rem', marginTop: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>💡 DFW-Specific Cost Breakdown</div>
              {Object.entries(BASE_COSTS).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4, borderBottom: '1px solid #1e293b', paddingBottom: 4 }}>
                  <span style={{ color: '#94a3b8', textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1')}</span>
                  <span>${v}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 32, background: '#0f2044', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Schedule your first-year maintenance with vetted DFW pros</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>ProLnk matches you with licensed, background-checked local contractors.</div>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>
            Find a Pro on ProLnk →
          </button>
        </div>
      </div>
    </div>
  );
}
