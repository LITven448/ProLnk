import { useState } from 'react';

const timeline = [
  {
    phase: 'Week 1',
    icon: '🔑',
    title: 'Day 1–7: Inspect & Document',
    tasks: [
      'Walk every room and document existing damage with photos',
      'Test all outlets, switches, and GFCI breakers',
      'Run all faucets — check under sinks for leaks',
      'Flush all toilets, check for running',
      'Test smoke detectors and carbon monoxide alarms',
      'Locate main water shutoff, gas shutoff, and breaker panel',
      'Change all door locks and garage codes',
    ],
  },
  {
    phase: 'Month 1',
    icon: '🔧',
    title: 'Month 1: Immediate Priorities',
    tasks: [
      'Schedule HVAC inspection and filter replacement',
      'Have electrical panel inspected if home is pre-2000',
      'Pest control inspection (quarterly in DFW)',
      'Check attic insulation level — minimum R-38 for DFW',
      'Schedule chimney inspection if home has fireplace',
      'Set up automatic payment for HOA if applicable',
    ],
  },
  {
    phase: 'Month 2',
    icon: '🌱',
    title: 'Month 2: Setup & Systems',
    tasks: [
      'Install programmable or smart thermostat (saves avg $180/yr)',
      'Install water leak sensors under sinks and near water heater',
      'Check water heater age — replace if 10+ years old',
      'Caulk around tubs, showers, and exterior doors',
      'Test garage door auto-reverse safety feature',
      'Set up home maintenance budget tracking',
    ],
  },
  {
    phase: 'Month 3',
    icon: '🏡',
    title: 'Month 3: Foundation & Exterior',
    tasks: [
      'Monitor foundation moisture levels (DFW clay soil critical)',
      'Ensure gutters are clear and downspouts direct away from foundation',
      'Check fence and gate hardware',
      'Walk roof line from ground — look for missing shingles',
      'Trim trees away from roofline (8+ feet clearance)',
      'Grade soil away from foundation on all sides',
    ],
  },
];

const dfwItems = [
  { icon: '❄️', label: 'HVAC Filters', freq: 'Monthly May–Oct, every 90 days Nov–Apr', priority: 'Critical' },
  { icon: '🌧️', label: 'Foundation Moisture', freq: 'Monitor monthly — water within 18″ of foundation', priority: 'Critical' },
  { icon: '🐛', label: 'Pest Control', freq: 'Quarterly (termites, fire ants, roaches)', priority: 'High' },
  { icon: '☀️', label: 'Roof Inspection', freq: 'Annually + after each major hail event', priority: 'High' },
  { icon: '🌿', label: 'Tree Trimming', freq: 'Annually — DFW storms cause major limb damage', priority: 'Medium' },
  { icon: '🪟', label: 'Window Caulk', freq: 'Every 2–3 years (heat cycles crack caulk faster in DFW)', priority: 'Medium' },
];

export default function FirstHomeMaintenanceGuide() {
  const [completedPhase, setCompletedPhase] = useState<Record<string, number[]>>({});

  const toggleTask = (phase: string, idx: number) => {
    setCompletedPhase(prev => {
      const current = prev[phase] || [];
      return {
        ...prev,
        [phase]: current.includes(idx) ? current.filter(i => i !== idx) : [...current, idx],
      };
    });
  };

  const totalTasks = timeline.reduce((acc, t) => acc + t.tasks.length, 0);
  const completedCount = Object.values(completedPhase).reduce((acc, arr) => acc + arr.length, 0);
  const pct = Math.round((completedCount / totalTasks) * 100);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏠</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F5E642', marginBottom: '0.5rem' }}>
            First-Time Homeowner Maintenance Guide
          </h1>
          <p style={{ color: '#94a3b8′ }}>Your first 90 days checklist — DFW edition</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: '1rem 1.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 600 }}>First 90 Days Progress</span>
            <span style={{ color: '#F5E642', fontWeight: 700 }}>{completedCount}/{totalTasks} tasks</span>
          </div>
          <div style={{ background: '#0A1628', borderRadius: 8, height: 12, overflow: 'hidden' }}>
            <div style={{ background: '#F5E642', height: '100%', width: `${pct}%`, borderRadius: 8, transition: 'width 0.3s' }} />
          </div>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.4rem' }}>{pct}% complete</div>
        </div>

        {timeline.map(phase => {
          const completed = completedPhase[phase.phase] || [];
          return (
            <div key={phase.phase} style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.75rem' }}>{phase.icon}</span>
                <div>
                  <div style={{ color: '#F5E642', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{phase.phase}</div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{phase.title}</div>
                </div>
                <div style={{ marginLeft: 'auto', color: '#94a3b8', fontSize: '0.875rem' }}>
                  {completed.length}/{phase.tasks.length}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {phase.tasks.map((task, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleTask(phase.phase, idx)}
                    style={{
                      display: 'flex', gap: '0.75rem', alignItems: 'flex-start', cursor: 'pointer',
                      background: completed.includes(idx) ? '#0f2a1a' : '#0A1628',
                      borderRadius: 8, padding: '0.625rem 0.875rem',
                      border: `1px solid ${completed.includes(idx) ? '#22c55e' : '#1e3a5f'}`,
                    }}
                  >
                    <span style={{ fontSize: '1rem', marginTop: 1 }}>{completed.includes(idx) ? '✅' : '⬜'}</span>
                    <span style={{ color: completed.includes(idx) ? '#86efac' : '#e2e8f0', fontSize: '0.875rem' }}>{task}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div style={{ background: '#112240', borderRadius: 12, padding: '1.5rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#F5E642', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
            🌡️ DFW-Specific Annual Maintenance Items
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {dfwItems.map(item => (
              <div key={item.label} style={{ background: '#0A1628', borderRadius: 8, padding: '0.875rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{item.label}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{item.freq}</div>
                </div>
                <span style={{
                  background: item.priority === 'Critical' ? '#ef4444′ : item.priority === ’High' ? '#f59e0b' : '#3b82f6',
                  color: '#fff', borderRadius: 6, padding: '2px 10px', fontSize: '0.75rem', fontWeight: 700, whiteSpace: 'nowrap',
                }}>{item.priority}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1a1a2e', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏠</div>
          <h3 style={{ color: '#F5E642', marginBottom: '0.5rem' }}>Need a Trusted Home Pro?</h3>
          <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.875rem' }}>ProLnk connects DFW homeowners with vetted local contractors for every maintenance task.</p>
          <button style={{ background: '#F5E642', color: '#0A1628', fontWeight: 700, border: 'none', borderRadius: 8, padding: '0.75rem 2rem', fontSize: '1rem', cursor: 'pointer' }}>
            Find Local Pros
          </button>
        </div>
      </div>
    </div>
  );
}
