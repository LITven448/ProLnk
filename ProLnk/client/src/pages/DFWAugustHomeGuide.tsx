import { useState } from 'react';

const TASKS = {
  foundation: { label: 'Foundation', tasks: ['August is peak foundation risk month — keep watering program going', 'Inspect interior walls for new diagonal cracks near doors/windows', 'Check if doors are sticking — sign of movement', 'Ensure gutters drain away from home', 'If you see new cracks, call a foundation company for free inspection'] },
  hvac: { label: 'HVAC', tasks: ['Is your AC keeping the home below 78°F on 104°F days? If not, call now', 'System working hardest this month — listen for unusual sounds', 'Replace filter (monthly in summer)', 'Check drain pan for standing water', 'Start researching replacement if system is 10+ years old — plan for fall'] },
  exterior: { label: 'Exterior', tasks: ['UV damage peaks in August — inspect exterior paint for peeling/fading', 'Check caulk around windows and doors — UV degrades it', 'Inspect wood trim, fascia, soffits for warping', 'Check driveway and walkway concrete for new cracks from heat expansion', 'Document with photos for insurance baseline'] },
  energy: { label: 'Energy Bills', tasks: ['Pull August utility bill — highest of the year', 'Compare kWh usage to last August', 'Check attic insulation level (R-38 minimum for DFW)', 'Consider programmable or smart thermostat if not installed', 'Seal any obvious air gaps around doors and outlets'] },
  fall: { label: 'Fall Planning', tasks: ['Start planning exterior paint (ideal October window)', 'Get landscaping quotes now before fall rush', 'Schedule HVAC fall tune-up for September', 'Budget for any deferred summer repairs', 'Research contractor availability — book early for fall projects'] },
};

export default function DFWAugustHomeGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [done, setDone] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setSelected(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);

  const toggleDone = (task: string) =>
    setDone(prev => ({ ...prev, [task]: !prev[task] }));

  const activeTasks = selected.flatMap(k => TASKS[k as keyof typeof TASKS]?.tasks ?? []);
  const risks = ['Foundation shrinkage from clay soil drying', 'AC failure during 104°F peak demand', 'Exterior UV paint and caulk failure', 'Energy bill shock without insulation audit'];

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642', letterSpacing: '0.08em' }}>
          🥵 DFW HOME GUIDE — AUGUST
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>August in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>
          DFW's hottest month. Foundation moisture is critical, HVAC is at max stress, UV peaks on exterior surfaces. Start planning fall projects now.
        </p>

        <div style={{ background: '#7F1D1D30', border: '1px solid #EF4444', borderRadius: 8, padding: '1rem', marginBottom: '1.5rem' }}>
          <strong style={{ color: '#EF4444′ }}>🔴 Highest Risk This Month in DFW</strong>
          <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', color: '#CBD5E1', fontSize: '0.9rem' }}>
            {risks.map(r => <li key={r}>{r}</li>)}
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
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Your August Priority List</h2>
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
            Select your home features above to see your August priority list
          </div>
        )}
      </div>
    </div>
  );
}
