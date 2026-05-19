import { useState } from 'react';

const TASKS = {
  hvac: { label: 'Central AC', tasks: ['AC tune-up NOW — last chance before 95°F days', 'Replace air filter (should be fresh before summer)', 'Verify thermostat cooling setpoints', 'Check all vents are open and unblocked', 'Listen for unusual sounds — fix cheap now vs. July emergency call'] },
  pool: { label: 'Pool', tasks: ['Open pool and balance chemicals', 'Check pump, filter, and skimmer function', 'Inspect pool deck and coping for winter cracks', 'Test safety latches and fencing', 'Schedule first cleaning service'] },
  irrigation: { label: 'Irrigation', tasks: ['Activate irrigation system for the season', 'Walk all zones and check for broken heads', 'Set schedule: 2x per week per city ordinance', 'Adjust heads away from pavement', 'Test rain sensor is functional'] },
  outdoor: { label: 'Outdoor Living', tasks: ['Set up patio furniture before mosquito season', 'Inspect deck/pergola for winter damage', 'Clean and prep outdoor grill', 'Check exterior outlets and lighting', 'Treat wood deck if due'] },
  tax: { label: 'Property Tax', tasks: ['DEADLINE MAY 15 — today may be the day', 'Pull DCAD appraisal notice from mail or DCAD.org', 'Compare your value to neighbor comps', 'File protest at DCAD.org — 10 min online', 'Document any defects with photos for hearing'] },
  hail: { label: 'Hail Season', tasks: ['Hail season PEAK starts May — check roof now', 'Photograph current roof condition for insurance baseline', 'Know your insurance deductible amount', 'Save roofer contacts before the rush', 'Check if last year hail left any soft spots'] },
};

export default function DFWMayHomeGuide() {
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
          ☀️ DFW HOME GUIDE — MAY
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>May in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>
          Last comfortable month before summer heat locks in. AC prep, pool opening, irrigation activation, and property tax protest deadline May 15.
        </p>

        <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: 8, padding: '1rem', marginBottom: '2rem' }}>
          <strong style={{ color: '#F5E642′ }}>⚠️ May DFW Alerts</strong>
          <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', color: '#CBD5E1', fontSize: '0.9rem' }}>
            <li><strong>PROPERTY TAX PROTEST DEADLINE: MAY 15</strong> — file at DCAD.org now</li>
            <li>Hail season peak — document roof before a storm hits</li>
            <li>Last month to fix AC problems before emergency summer rates</li>
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
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Your May Priority List</h2>
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
            Select your home features above to see your May priority list
          </div>
        )}
      </div>
    </div>
  );
}
