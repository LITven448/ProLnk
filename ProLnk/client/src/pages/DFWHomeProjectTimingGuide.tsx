import { useState } from 'react';

const SCHEDULE = [
  { month: 'February', icon: '🌡️', tasks: ['Schedule HVAC spring tune-up', 'Inspect attic insulation before summer'], reason: 'Book before March rush — DFW HVAC techs fill up fast.', trades: ['HVAC'] },
  { month: 'March', icon: '❄️', tasks: ['HVAC tune-up', 'Chimney inspection', 'Test smoke/CO detectors'], reason: 'Get AC ready before triple-digit heat hits. Last chance before rush.', trades: ['HVAC', 'Chimney'] },
  { month: 'April', icon: '🌩️', tasks: ['Roof inspection (post-spring storms)', 'Gutter cleaning', 'Foundation moisture check'], reason: 'DFW spring storms bring hail. Inspect roof immediately after storm season.', trades: ['Roofing', 'Foundation'] },
  { month: 'May', icon: '🌿', tasks: ['Tree trimming before summer storms', 'Exterior wood treatment', 'Sprinkler system activation'], reason: 'Trim trees before summer severe storms. Wood dries fast in DFW heat.', trades: ['Landscaping', 'Irrigation'] },
  { month: 'June–August', icon: '☀️', tasks: ['Monitor AC daily', 'Foundation watering program', 'Pool maintenance peak'], reason: 'Hottest months — DFW clay soil shrinks, causing foundation movement without watering.', trades: ['HVAC', 'Foundation', 'Pool'] },
  { month: 'September', icon: '🍂', tasks: ['HVAC fall tune-up', 'Weatherstripping check', 'Deck/fence inspection'], reason: 'Pre-winter prep. Check weatherstripping before temps drop.', trades: ['HVAC', 'General'] },
  { month: 'October–November', icon: '🎨', tasks: ['Exterior painting (ideal DFW window)', 'Roof sealant', 'Drain irrigation lines'], reason: 'Best DFW painting months — 60–75°F, low humidity, paint adheres perfectly.', trades: ['Painting', 'Roofing'] },
  { month: 'December', icon: '❄️', tasks: ['Pipe insulation check', 'Heating system test', 'Holiday light load check'], reason: 'DFW rare freezes are brutal — insulate exposed pipes in garage and attic.', trades: ['Plumbing', 'Electrical'] },
];

const HOME_TYPES = ['Single Family', 'Townhome', 'Condo', 'Ranch (older)', 'New Construction (<5 yrs)'];

const PROJECTS = [
  'HVAC tune-up', 'Roof inspection', 'Exterior paint', 'Foundation check',
  'Gutter cleaning', 'Tree trimming', 'Deck repair', 'Sprinkler service',
  'Plumbing inspection', 'Electrical audit', 'Pool maintenance', 'Insulation upgrade',
];

export default function DFWHomeProjectTimingGuide() {
  const [homeType, setHomeType] = useState('Single Family');
  const [selected, setSelected] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const toggle = (p: string) =>
    setSelected(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);

  const filtered = SCHEDULE.filter(s =>
    selected.length === 0 ||
    s.tasks.some(t => selected.some(sel => t.toLowerCase().includes(sel.split(' ')[0].toLowerCase())))
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ background: '#F5E642', color: '#0A1628', padding: '4px 12px', borderRadius: 4, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>DFW HOMEOWNER GUIDE</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.75rem 0 0.25rem' }}>📅 Home Project Timing Guide</h1>
          <p style={{ color: '#8FA3BF', marginTop: 4 }}>The optimal DFW scheduling calendar for every home project — climate-tuned by month.</p>
        </div>

        <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
          {SCHEDULE.map(s => (
            <div key={s.month} style={{ background: '#0D1F3A', border: '1px solid #1E3A5F', borderRadius: 10, padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <h2 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#F5E642′ }}>{s.month}</h2>
                <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                  {s.trades.map(t => <span key={t} style={{ background: '#1E3A5F', borderRadius: 4, padding: '2px 8px', fontSize: 11, color: '#8FA3BF' }}>{t}</span>)}
                </div>
              </div>
              <ul style={{ margin: '0 0 6px 0', paddingLeft: 20 }}>
                {s.tasks.map(t => <li key={t} style={{ fontSize: 14, marginBottom: 2 }}>{t}</li>)}
              </ul>
              <p style={{ fontSize: 13, color: '#8FA3BF', margin: 0, fontStyle: 'italic' }}>💡 {s.reason}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#0D2238', border: '1px solid #F5E642', borderRadius: 10, padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F5E642', marginBottom: '1rem' }}>🗓️ Build My Scheduling Calendar</h2>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: '#8FA3BF', marginBottom: '1rem', maxWidth: 240 }}>
            Home Type
            <select value={homeType} onChange={e => setHomeType(e.target.value)}
              style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 6, padding: '8px 12px', color: '#E8EDF5', fontSize: 14 }}>
              {HOME_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </label>

          <p style={{ fontSize: 13, color: '#8FA3BF', marginBottom: 8 }}>Select upcoming projects:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1rem' }}>
            {PROJECTS.map(p => (
              <button key={p} onClick={() => toggle(p)}
                style={{ background: selected.includes(p) ? '#F5E642′ : ’rgba(255,255,255,0.07)', color: selected.includes(p) ? '#0A1628′ : '#E8EDF5', border: '1px solid #1E3A5F', borderRadius: 6, padding: '6px 12px', fontSize: 13, cursor: ’pointer' }}>
                {p}
              </button>
            ))}
          </div>

          <button onClick={() => setShowCalendar(true)}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '10px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
            Show Optimal Calendar →
          </button>

          {showCalendar && (
            <div style={{ marginTop: '1.25rem' }}>
              <p style={{ color: '#8FA3BF', fontSize: 13, marginBottom: 10 }}>Optimal DFW schedule for your {homeType}:</p>
              {filtered.map(s => (
                <div key={s.month} style={{ background: 'rgba(245,230,66,0.06)', border: '1px solid #F5E642', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span>{s.icon}</span>
                    <span style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{s.month}</span>
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {s.tasks.map(t => <li key={t} style={{ fontSize: 13, marginBottom: 2 }}>{t}</li>)}
                  </ul>
                  <p style={{ fontSize: 12, color: '#8FA3BF', margin: '6px 0 0', fontStyle: 'italic' }}>{s.reason}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
