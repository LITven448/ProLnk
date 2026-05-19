import { useState } from 'react';

const PROACTIVE_SCHEDULE: Record<number, string[]> = {
  1: ['AC filter replacement ($15)', 'Foundation soaker hose check ($0)', 'Pest control quarterly ($100)'],
  2: ['HVAC tune-up ($150)', 'Gutter cleaning ($150)', 'Roof visual inspection ($0)', 'Caulk check on windows/doors ($20)'],
  3: ['Water heater flush ($0–50)', 'Dryer vent cleaning ($80)', 'Weatherstripping check ($30)'],
  4: ['AC filter replacement ($15)', 'Pest control quarterly ($100)', 'Sprinkler head check ($0)'],
};

const APPROACH_DATA = {
  reactive: {
    label: '🔴 Reactive (fix when broken)',
    annualCost: (age: number) => 3200 + age * 120,
    description: 'Average DFW reactive homeowner spends $3,200–$6,000+/year on emergency repairs. One AC failure in July averages $4,800–$7,200 installed.',
  },
  mixed: {
    label: '🟡 Mixed (some maintenance, mostly reactive)',
    annualCost: (age: number) => 1800 + age * 60,
    description: 'Partial maintenance reduces emergencies but DFW climate still catches up. Average $1,800–$3,000/year.',
  },
  proactive: {
    label: '🟢 Proactive (scheduled maintenance)',
    annualCost: (age: number) => 900 + age * 30,
    description: 'Proactive homeowners average $900–$1,800/year. DFW-specific: the proactive gap is wider here because heat accelerates every failure.',
  },
};

export default function DFWProactiveHomeMaintenanceGuide() {
  const [homeAge, setHomeAge] = useState(12);
  const [approach, setApproach] = useState<'reactive' | 'mixed' | 'proactive'>('mixed');
  const [submitted, setSubmitted] = useState(false);

  const current = APPROACH_DATA[approach];
  const proactive = APPROACH_DATA['proactive'];
  const savings = current.annualCost(homeAge) - proactive.annualCost(homeAge);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '0.5rem 1rem', display: 'inline-block', fontWeight: 700, marginBottom: '1rem', fontSize: 13 }}>
          📅 DFW HOMEOWNER GUIDE
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Proactive vs Reactive Maintenance</h1>
        <p style={{ color: '#94a3b8', marginBottom: 16, fontSize: 15 }}>
          In most markets, reactive homeowners pay 2x more. In DFW, the gap is 3x — because 100°F summers, clay soil, and high humidity accelerate every deferred repair.
        </p>
        <div style={{ background: '#1e3a5f', borderRadius: 10, padding: '1rem', marginBottom: 24, fontSize: 14, color: '#93c5fd' }}>
          💡 DFW fact: A $150 annual HVAC tune-up prevents a $5,000+ emergency replacement. The math is unambiguous — proactive wins every time in this climate.
        </div>

        <div style={{ background: '#0f2044', borderRadius: 12, padding: '1.5rem', marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 17, marginBottom: 16 }}>🏡 Your Situation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 6 }}>Home Age (years)</label>
            <input type="range" min={1} max={50} value={homeAge} onChange={e => setHomeAge(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F5E642′ }} />
            <div style={{ color: '#F5E642', fontWeight: 700 }}>{homeAge} years old</div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#94a3b8', display: 'block', marginBottom: 10 }}>Your current maintenance approach</label>
            <div style={{ display: 'grid', gap: 8 }}>
              {(['reactive', 'mixed', 'proactive'] as const).map(a => (
                <label key={a} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '0.75rem 1rem', borderRadius: 8, background: approach === a ? '#1e3a5f' : '#162035', border: `2px solid ${approach === a ? '#F5E642' : '#334155'}` }}>
                  <input type="radio" name="approach" value={a} checked={approach === a} onChange={() => setApproach(a)} style={{ accentColor: '#F5E642′ }} />
                  <span style={{ fontWeight: approach === a ? 700 : 400, fontSize: 14 }}>{APPROACH_DATA[a].label}</span>
                </label>
              ))}
            </div>
          </div>
          <button onClick={() => setSubmitted(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.75rem', fontWeight: 700, cursor: 'pointer', fontSize: 15, width: '100%' }}>
            📊 Compare My Annual Costs
          </button>
        </div>

        {submitted && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div style={{ background: '#0f2044', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>Your Current Approach</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#ef4444′ }}>${current.annualCost(homeAge).toLocaleString()}</div>
                <div style={{ fontSize: 11, color: '#94a3b8′ }}>estimated/year</div>
              </div>
              <div style={{ background: '#0f2044', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>Fully Proactive</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#4ade80′ }}>${proactive.annualCost(homeAge).toLocaleString()}</div>
                <div style={{ fontSize: 11, color: '#94a3b8′ }}>estimated/year</div>
              </div>
            </div>

            {savings > 0 && (
              <div style={{ background: '#14532d', borderRadius: 12, padding: '1rem', marginBottom: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 13, color: '#86efac' }}>Potential Annual Savings</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#4ade80′ }}>${savings.toLocaleString()}</div>
                <div style={{ fontSize: 13, color: '#86efac' }}>by shifting to a proactive approach</div>
              </div>
            )}

            <div style={{ fontSize: 14, color: '#94a3b8', marginBottom: 8, background: '#0f2044', borderRadius: 10, padding: '1rem' }}>{current.description}</div>

            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, marginTop: 20 }}>🗓️ DFW Proactive Maintenance Schedule</h2>
            {Object.entries(PROACTIVE_SCHEDULE).map(([q, tasks]) => (
              <div key={q} style={{ background: '#0f2044', borderRadius: 10, padding: '1rem 1.25rem', marginBottom: 10 }}>
                <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: 8 }}>Q{q} {q === '1′ ? '(Jan–Mar)' : q === '2' ? '(Apr–Jun)' : q === '3' ? '(Jul–Sep)' : '(Oct–Dec)'}</div>
                {tasks.map((t, i) => <div key={i} style={{ fontSize: 13, color: '#94a3b8', marginBottom: 4 }}>• {t}</div>)}
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 32, background: '#0f2044', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Schedule your proactive maintenance with vetted DFW pros</div>
          <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>ProLnk connects you to licensed professionals before small issues become expensive emergencies.</div>
          <button style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '0.6rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>
            Find a Pro on ProLnk →
          </button>
        </div>
      </div>
    </div>
  );
}
