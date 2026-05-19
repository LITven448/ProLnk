import { useState } from 'react';

const TASKS = {
  ac: { label: 'Central AC', tasks: ['Check if AC is keeping up — if not below 78°F it is struggling', 'Replace air filter MONTHLY in July (dust + pollen peak)', 'Clean condensate drain line (clogs cause shutdowns)', 'Verify outdoor unit has 2ft clearance — no shrubs', 'Set thermostat 78°F when home, 85°F when away — ERCOT demand'] },
  foundation: { label: 'Foundation', tasks: ['BEGIN foundation watering program NOW — clay is shrinking', 'Set soaker hose 18 inches from foundation, run 30 min 3x/week', 'Watch for new cracks in drywall or doors sticking', 'Check downspouts — discharge away from foundation', 'Note any visible gaps at exterior base'] },
  pool: { label: 'Pool', tasks: ['Test chemicals 3x per week in 95°F+ water', 'Shock pool weekly in July heat', 'Check water level daily — evaporation spikes in heat', 'Run pump 10-12 hrs/day minimum', 'Watch for algae — heat accelerates bloom'] },
  power: { label: 'Power & ERCOT', tasks: ['ERCOT peak demand 3-7pm — pre-cool home before 3pm', 'Know your breaker panel location', 'Identify critical items if power goes out', 'Charge backup devices and power banks', 'Window coverings closed on west side 2-6pm'] },
  outdoor: { label: 'Outdoor', tasks: ['Limit outdoor work to before 9am or after 7pm', 'Check irrigation is running — lawn dies fast in July', 'Water trees deeply once per week', 'Do not fertilize lawn in July heat stress', 'Protect outdoor furniture from UV fading'] },
};

export default function DFWJulyHomeGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [done, setDone] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setSelected(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);

  const toggleDone = (task: string) =>
    setDone(prev => ({ ...prev, [task]: !prev[task] }));

  const activeTasks = selected.flatMap(k => TASKS[k as keyof typeof TASKS]?.tasks ?? []);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642', letterSpacing: '0.08em' }}>
          🔥 DFW HOME GUIDE — JULY
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>July in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>
          Peak heat season. 100°F+ days are common. Foundation watering is now a daily concern. AC is working its hardest — watch it closely.
        </p>

        <div style={{ background: '#7F1D1D30', border: '1px solid #EF4444', borderRadius: 8, padding: '1rem', marginBottom: '2rem' }}>
          <strong style={{ color: '#EF4444′ }}>🔴 July DFW Heat Alerts</strong>
          <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', color: '#CBD5E1', fontSize: '0.9rem' }}>
            <li>Foundation watering is CRITICAL — DFW clay shrinks and causes structural damage</li>
            <li>ERCOT peak demand alerts 3-7pm — pre-cool your home or face rolling conservation requests</li>
            <li>AC filter neglect in July is the #1 cause of preventable breakdowns</li>
          </ul>
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>What does your home have?</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {Object.entries(TASKS).map(([key, val]) => (
            <button key={key} onClick={() => toggle(key)} style={{
              padding: '0.5rem 1rem', borderRadius: 20, border: '1px solid',
              borderColor: selected.includes(key) ? '#F5E642′ : '#334155',
              background: selected.includes(key) ? '#F5E64220′ : ’transparent',
              color: selected.includes(key) ? '#F5E642′ : '#94A3B8',
              cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
            }}>{val.label}</button>
          ))}
        </div>

        {activeTasks.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Your July Priority Checklist</h2>
            {activeTasks.map(task => (
              <div key={task} onClick={() => toggleDone(task)} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                padding: '0.75rem 1rem', marginBottom: '0.5rem', borderRadius: 8,
                background: done[task] ? '#0F2A1A' : '#0F1C2E', cursor: 'pointer',
                border: '1px solid', borderColor: done[task] ? '#22C55E40′ : '#1E3A5F',
              }}>
                <span style={{ fontSize: '1rem', marginTop: 2 }}>{done[task] ? '✅' : '⬜'}</span>
                <span style={{ color: done[task] ? '#4ADE80′ : '#CBD5E1', textDecoration: done[task] ? ’line-through' : 'none', fontSize: '0.9rem' }}>{task}</span>
              </div>
            ))}
            <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: '#0F1C2E', borderRadius: 8, color: '#64748B', fontSize: '0.8rem' }}>
              {activeTasks.filter(t => done[t]).length} of {activeTasks.length} tasks complete
            </div>
          </div>
        )}

        {activeTasks.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#475569', border: '1px dashed #1E3A5F', borderRadius: 8 }}>
            Select your home features above to see your July priority checklist
          </div>
        )}
      </div>
    </div>
  );
}
