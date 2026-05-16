import { useState } from 'react';

const MILESTONES = [
  { year: 1, label: 'Year 1', items: [{ name: 'Pest Control (Quarterly)', cost: 600, monthly: 50 }, { name: 'HVAC Tune-Up', cost: 150, monthly: 13 }, { name: 'Lawn Service', cost: 1200, monthly: 100 }] },
  { year: 3, label: 'Years 1–3', items: [{ name: 'Interior Paint Touch-Up', cost: 800, monthly: 22 }, { name: 'Fence Repair', cost: 500, monthly: 14 }] },
  { year: 8, label: 'Years 8–12', items: [{ name: 'Water Heater Replacement', cost: 1400, monthly: 15 }, { name: 'Appliance Replacements', cost: 3000, monthly: 25 }] },
  { year: 12, label: 'Years 12–15', items: [{ name: 'HVAC Replacement (Full System)', cost: 9500, monthly: 53 }, { name: 'Exterior Paint', cost: 4500, monthly: 25 }] },
  { year: 15, label: 'Years 15–20', items: [{ name: 'Foundation Monitoring/Repair', cost: 6000, monthly: 25 }, { name: 'Plumbing Re-Pipe (if needed)', cost: 8000, monthly: 33 }] },
  { year: 20, label: 'Years 20–25', items: [{ name: 'Roof Replacement', cost: 15000, monthly: 50 }, { name: 'Second HVAC Cycle', cost: 9500, monthly: 32 }, { name: 'Window Replacement', cost: 12000, monthly: 40 }] },
];

const fmt = (n: number) => '$' + n.toLocaleString();

export default function DFW20YearHomeGuide() {
  const [homeAge, setHomeAge] = useState('');
  const age = parseInt(homeAge) || 0;

  const totalCapEx = MILESTONES.reduce((sum, m) => sum + m.items.reduce((s, i) => s + i.cost, 0), 0);
  const monthlyNeeded = MILESTONES.reduce((sum, m) => sum + m.items.reduce((s, i) => s + i.monthly, 0), 0);
  const completed = MILESTONES.filter(m => m.year <= age);
  const upcoming = MILESTONES.filter(m => m.year > age);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '2.5rem' }}>📅</div>
          <h1 style={{ color: '#F5E642', fontSize: '1.8rem', margin: '0.5rem 0' }}>DFW 20-Year Home Planning Guide</h1>
          <p style={{ color: '#94a3b8' }}>Know every major capital expense coming your way — and start saving now</p>
        </div>

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', color: '#F5E642', marginBottom: 8, fontWeight: 600 }}>🏠 How Old Is Your Home? (years)</label>
          <input type="number" min={0} max={50} placeholder="e.g. 8" value={homeAge} onChange={e => setHomeAge(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', borderRadius: 8, border: '1px solid #1e3a5f', background: '#0A1628', color: '#fff', fontSize: '1rem', boxSizing: 'border-box' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>20-Year Total CapEx</div>
            <div style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700 }}>{fmt(totalCapEx)}</div>
          </div>
          <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Monthly Reserve Needed</div>
            <div style={{ color: '#F5E642', fontSize: '1.8rem', fontWeight: 700 }}>{fmt(monthlyNeeded)}/mo</div>
          </div>
        </div>

        {upcoming.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#F5E642' }}>⏳ Upcoming Milestones for Your Home</h2>
            {upcoming.map(m => (
              <div key={m.year} style={{ background: '#0f2040', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem' }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>🗓️ {m.label}</div>
                {m.items.map(item => (
                  <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #1e3a5f' }}>
                    <span style={{ color: '#e2e8f0' }}>{item.name}</span>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: '#F5E642', fontWeight: 600 }}>{fmt(item.cost)}</div>
                      <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{fmt(item.monthly)}/mo to save</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {completed.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ color: '#22c55e' }}>✅ Completed Milestones (by home age)</h2>
            {completed.map(m => (
              <div key={m.year} style={{ background: '#0f2040', borderRadius: 12, padding: '1rem', marginBottom: '0.75rem', opacity: 0.7 }}>
                <div style={{ color: '#22c55e', fontWeight: 700, marginBottom: 6 }}>✓ {m.label}</div>
                {m.items.map(item => (
                  <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', padding: '0.25rem 0' }}>
                    <span>{item.name}</span><span>{fmt(item.cost)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#0f2040', borderRadius: 12, padding: '1.5rem' }}>
          <h3 style={{ color: '#F5E642', marginTop: 0 }}>📌 DFW-Specific Notes</h3>
          {[
            '🌡️ DFW summers run AC 6+ months — HVAC lifespan is 12–14 years, not the national 15',
            '⛈️ Hail events average 2–4 per year in DFW — inspect roof every spring',
            '🏗️ Expansive clay soil causes foundation movement — monitor interior cracks annually',
            '💧 Hard water (120–200 ppm) is standard in DFW — softener extends appliance life 20–30%',
            '🌿 St. Augustine lawns need more water and fertilizer — plan $1,200+/year for lawn care',
          ].map(n => <div key={n} style={{ color: '#cbd5e1', padding: '0.4rem 0', fontSize: '0.9rem', borderBottom: '1px solid #1e3a5f' }}>{n}</div>)}
        </div>
      </div>
    </div>
  );
}
