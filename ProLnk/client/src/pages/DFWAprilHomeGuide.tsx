import { useState } from 'react';

const TASKS = {
  hvac: { label: 'HVAC', tasks: ['Switch system from heating to cooling mode', 'Replace air filter before summer', 'Schedule AC tune-up before peak season', 'Clean condenser coils and fins', 'Test thermostat cooling mode now'] },
  lawn: { label: 'Lawn & Garden', tasks: ['Apply pre-emergent fertilizer (April ideal for warm-season grass)', 'Overseed bare patches before heat sets in', 'Set irrigation to 1-2x per week schedule', 'Edge beds and apply fresh mulch', 'Mow at 3.5" height — do not scalp'] },
  trees: { label: 'Trees & Pruning', tasks: ['OAK WILT BAN STARTS APRIL 1 — do NOT prune oaks', 'Trim dead branches from winter storms', 'Check for storm damage from spring systems', 'Identify trees close to roof or power lines', 'Apply wound sealant to any recent oak cuts'] },
  storms: { label: 'Storm Prep', tasks: ['Inspect roof for winter damage before storm season', 'Clean gutters from winter debris', 'Check window and door seals', 'Test sump pump if applicable', 'Locate and test whole-home shutoffs'] },
  tax: { label: 'Property Tax', tasks: ['DEADLINE: May 15 — protest window open NOW', 'Pull your DCAD appraisal notice', 'Compare to neighbor comps on DCAD.org', 'Document any defects with photos', 'File protest online at DCAD.org before May 15'] },
};

export default function DFWAprilHomeGuide() {
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
          🌿 DFW HOME GUIDE — APRIL
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>April in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>
          Your last comfortable month before summer heat. HVAC switchover, property tax protest window opens, oak wilt pruning ban begins April 1.
        </p>

        <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: 8, padding: '1rem', marginBottom: '2rem' }}>
          <strong style={{ color: '#F5E642' }}>⚠️ April DFW Alerts</strong>
          <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', color: '#CBD5E1', fontSize: '0.9rem' }}>
            <li>Oak wilt pruning ban starts April 1 — sap beetles spread the fungus</li>
            <li>Property tax protest window is OPEN — deadline May 15</li>
            <li>Spring storm season begins — check roof and gutters now</li>
          </ul>
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>What does your home have?</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
          {Object.entries(TASKS).map(([key, val]) => (
            <button key={key} onClick={() => toggle(key)} style={{
              padding: '0.5rem 1rem', borderRadius: 20, border: '1px solid',
              borderColor: selected.includes(key) ? '#F5E642' : '#334155',
              background: selected.includes(key) ? '#F5E64220' : 'transparent',
              color: selected.includes(key) ? '#F5E642' : '#94A3B8',
              cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600,
            }}>{val.label}</button>
          ))}
        </div>

        {activeTasks.length > 0 && (
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Your April Priority List</h2>
            {activeTasks.map(task => (
              <div key={task} onClick={() => toggleDone(task)} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                padding: '0.75rem 1rem', marginBottom: '0.5rem', borderRadius: 8,
                background: done[task] ? '#0F2A1A' : '#0F1C2E', cursor: 'pointer',
                border: '1px solid', borderColor: done[task] ? '#22C55E40' : '#1E3A5F',
              }}>
                <span style={{ fontSize: '1rem', marginTop: 2 }}>{done[task] ? '✅' : '⬜'}</span>
                <span style={{ color: done[task] ? '#4ADE80' : '#CBD5E1', textDecoration: done[task] ? 'line-through' : 'none', fontSize: '0.9rem' }}>{task}</span>
              </div>
            ))}
            <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: '#0F1C2E', borderRadius: 8, color: '#64748B', fontSize: '0.8rem' }}>
              {activeTasks.filter(t => done[t]).length} of {activeTasks.length} tasks complete
            </div>
          </div>
        )}

        {activeTasks.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#475569', border: '1px dashed #1E3A5F', borderRadius: 8 }}>
            Select your home features above to see your April priority list
          </div>
        )}
      </div>
    </div>
  );
}
