import { useState } from 'react';

type SystemEntry = { name: string; lifespan: string; dfwNote: string; reserve: number };

const systems: SystemEntry[] = [
  { name: '❄️ HVAC / AC', lifespan: '12-15 years in DFW', dfwNote: 'DFW extreme heat cuts lifespan by 3-5 years vs national average', reserve: 90 },
  { name: '🏠 Roof (Shingles)', lifespan: '15-20 years in DFW', dfwNote: 'DFW hail and UV radiation; Class 4 shingles extend life 5+ years', reserve: 110 },
  { name: '🔥 Water Heater (Tank)', lifespan: '8-12 years', dfwNote: 'Hard DFW water accelerates sediment buildup; flush annually', reserve: 35 },
  { name: '💧 Water Heater (Tankless)', lifespan: '18-22 years', dfwNote: 'Requires annual descaling in DFW due to hard water — 280+ ppm', reserve: 45 },
  { name: '🚿 Plumbing (Polybutylene)', lifespan: 'Already past life — replace now', dfwNote: 'Class action settlement; DFW has many homes with PB pipe 1978-1995', reserve: 150 },
  { name: '⚡ Electrical Panel', lifespan: '25-40 years', dfwNote: 'FPE/Zinsco panels are fire hazards — check if yours is recalled', reserve: 25 },
  { name: '🪟 Windows (Double-Pane)', lifespan: '15-20 years', dfwNote: 'DFW UV causes seal failure in 12-15 years — look for fogging', reserve: 60 },
  { name: '🪵 Deck / Fence', lifespan: '10-15 years', dfwNote: 'DFW clay soil movement and humidity cycles accelerate wood decay', reserve: 20 },
  { name: '🏡 Foundation Piers', lifespan: '25+ years if installed correctly', dfwNote: 'DFW expansive clay: monitor quarterly. Bell-bottom piers preferred.', reserve: 80 },
  { name: '🔌 Kitchen Appliances', lifespan: '10-15 years', dfwNote: 'Plan replacement as a group — kitchen remodel often bundles all', reserve: 50 },
];

function getUrgency(homeAge: number, system: SystemEntry): { status: string; color: string; yearsLeft: number } {
  const maxLife = parseInt(system.lifespan.match(/(\d+)/g)?.[system.lifespan.match(/(\d+)/g)!.length - 1] || '20');
  const yearsLeft = Math.max(0, maxLife - homeAge);
  if (yearsLeft === 0) return { status: 'REPLACE NOW', color: '#EF4444', yearsLeft: 0 };
  if (yearsLeft < 3) return { status: 'URGENT — within 3 years', color: '#F97316', yearsLeft };
  if (yearsLeft < 7) return { status: 'PLAN AHEAD — 3-7 years', color: '#F5E642', yearsLeft };
  return { status: 'GOOD — 7+ years', color: '#22C55E', yearsLeft };
}

export default function DFWSystemReplacementCalendar() {
  const [homeAge, setHomeAge] = useState('');
  const [computed, setComputed] = useState(false);
  const age = parseInt(homeAge) || 0;

  const totalMonthlyReserve = systems.reduce((sum, s) => {
    const u = getUrgency(age, s);
    if (u.yearsLeft > 0) return sum + Math.ceil(s.reserve / Math.max(u.yearsLeft, 1) / 12);
    return sum;
  }, 0);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 36 }}>📅</span>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', margin: 0 }}>DFW System Replacement Calendar</h1>
        </div>
        <p style={{ color: '#94A3B8', marginBottom: 32 }}>Know when every major system is due — and how much to save each month to be ready when it hits.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>How old is your home?</h2>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', color: '#94A3B8', fontSize: 13, marginBottom: 6 }}>Home Age (years)</label>
              <input
                type="number"
                value={homeAge}
                onChange={e => { setHomeAge(e.target.value); setComputed(false); }}
                placeholder="e.g. 18"
                style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 16, boxSizing: 'border-box' }}
              />
            </div>
            <button onClick={() => setComputed(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 28px', fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
              Show Calendar →
            </button>
          </div>
        </div>

        {computed && age > 0 && (
          <>
            <div style={{ background: '#0F3460', borderRadius: 12, padding: 20, marginBottom: 24, border: '2px solid #F5E642', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: '#64748B', fontSize: 13 }}>Recommended Monthly Reserve</div>
                <div style={{ color: '#F5E642', fontWeight: 800, fontSize: 28 }}>${totalMonthlyReserve}/mo</div>
              </div>
              <div style={{ color: '#94A3B8', fontSize: 13, maxWidth: 260, textAlign: 'right' }}>
                DFW homeowners who reserve monthly avoid 90% of emergency financing situations
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {systems.map(s => {
                const u = getUrgency(age, s);
                const monthlyReserve = u.yearsLeft > 0 ? Math.ceil(s.reserve / Math.max(u.yearsLeft, 1) / 12) : 0;
                return (
                  <div key={s.name} style={{ background: '#112240', borderRadius: 10, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{s.name}</div>
                      <div style={{ color: '#64748B', fontSize: 12 }}>{s.dfwNote}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ color: u.color, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{u.status}</div>
                      <div style={{ color: '#94A3B8', fontSize: 12 }}>{u.yearsLeft > 0 ? `Save $${monthlyReserve}/mo` : `Replacement est. $${s.reserve * 1000}`}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginTop: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 12 }}>💡 DFW Reserve Strategy</h2>
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            The DFW rule of thumb: reserve 1.5% of home value annually for maintenance and replacement (national average is 1%). DFW's extreme weather, expansive clay soil, and hard water accelerate wear on every major system. A dedicated home reserve account separate from emergency fund prevents the worst financial surprises.
          </p>
        </div>
      </div>
    </div>
  );
}
