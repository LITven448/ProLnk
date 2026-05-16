import { useState } from 'react';

const TASKS = {
  exterior: { label: 'Exterior Paint', tasks: ['BEST MONTH for exterior painting in DFW — 65-80°F ideal', 'Get 3 quotes now — painters book fast in October', 'Prep surfaces: power wash, scrape, caulk before paint', 'Choose paint rated for Texas heat and UV', 'Complete before Thanksgiving — weather gets unpredictable'] },
  hvac: { label: 'HVAC', tasks: ['Switch system to heating mode and test', 'Replace air filter for heating season', 'Schedule fall HVAC tune-up before cold snaps', 'Test carbon monoxide detectors', 'Locate and test manual gas shutoff if applicable'] },
  gutters: { label: 'Gutters & Roof', tasks: ['Clean gutters from fall leaf drop (pecans are messy in DFW)', 'Inspect roof before winter storm season arrives', 'Check and clear downspouts', 'Look for loose flashing or missing shingles', 'Schedule gutter guards if tired of cleaning annually'] },
  outdoor: { label: 'Outdoor Projects', tasks: ['Last good month for outdoor projects before cold', 'Plant trees and shrubs — fall is ideal in DFW', 'Seed or overseed lawn with winter rye if desired', 'Store or cover outdoor furniture for winter', 'Blow out irrigation system before first freeze'] },
  winter: { label: 'Winter Prep', tasks: ['Find and label all pipe shutoff locations', 'Check pipe insulation in attic and crawl spaces', 'Test outdoor faucet covers/insulators', 'Know your heating system backup plan', 'Stock emergency supplies before winter storm season'] },
};

export default function DFWOctoberHomeGuide() {
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
          🍂 DFW HOME GUIDE — OCTOBER
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>October in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>
          DFW fall is beautiful and brief. October is the single best month for exterior painting and outdoor projects. Get it done — November is unpredictable.
        </p>

        <div style={{ background: '#F5E64220', border: '1px solid #F5E642', borderRadius: 8, padding: '1rem', marginBottom: '2rem' }}>
          <strong style={{ color: '#F5E642' }}>⭐ October Opportunity Window</strong>
          <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.25rem', color: '#CBD5E1', fontSize: '0.9rem' }}>
            <li>Exterior painting: 65-80°F temperatures are ideal — best month of the year</li>
            <li>Tree and shrub planting: roots establish before heat returns in spring</li>
            <li>HVAC switchover: test heating now before the first cold snap</li>
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
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Your October Priority List</h2>
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
            Select your home features above to see your October priority list
          </div>
        )}
      </div>
    </div>
  );
}
