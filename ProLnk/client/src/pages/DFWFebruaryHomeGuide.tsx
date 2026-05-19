import { useState } from 'react';

const ICE_STORM_CHECKLIST = [
  'Know location of main water shutoff — practice turning it off NOW',
  'Insulate exposed pipes in attic, garage, and exterior walls',
  'Have a pipe thawing plan: hair dryer + plumber number saved',
  'Fill bathtubs before storm — emergency water supply',
  'Charge all devices, power banks, and battery backups',
  'Stock 3-day food supply that needs no cooking',
  'Locate extra blankets in case heating fails',
  'Keep faucets dripping if temps below 20°F',
];

const TASKS = {
  pipes: { label: 'Pipes & Plumbing', tasks: ['Inspect attic pipe insulation — Feb 2021 failures were all exposed pipes', 'Wrap outdoor hose bibs with insulated covers', 'Know your main water shutoff location — test it now', 'Check under sinks on exterior walls — add pipe wrap if cold', 'Have a plumber number saved before an emergency'] },
  heating: { label: 'Heating System', tasks: ['Stress test heating system — run it on coldest setting available', 'Replace furnace filter if not done in fall', 'Test carbon monoxide detectors', 'Check gas connections are secure — call Atmos if you smell anything', 'Know your heating backup plan (space heater, hotel, family)'] },
  tax: { label: 'Property Tax Notices', tasks: ['DCAD appraisal notices arrive Jan-Feb — watch your mail', 'Start building your protest file now (protest window opens April)', 'Download last year data from DCAD.org for comparison', 'Note any damage or defects for appraisal reduction', 'Set a May 15 calendar reminder for protest deadline'] },
  mild: { label: 'Last Mild Weather', tasks: ['February mild windows (60°F+) are perfect for outdoor inspection', 'Walk exterior and document any damage for spring repairs', 'Get landscaping quotes before spring rush prices', 'Trim dead tree branches while leaves are off', 'Check fence for winter wind damage'] },
  emergency: { label: 'Emergency Prep', tasks: ['Build 72-hour emergency kit if not already done', 'Confirm home insurance covers ice damage — call to verify', 'Know your evacuation route if home loses heat', 'Download Atmos Energy and Oncor outage apps', 'Share your ice storm plan with family members'] },
};

export default function DFWFebruaryHomeGuide() {
  const [selected, setSelected] = useState<string[]>([]);
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [iceDone, setIceDone] = useState<Record<string, boolean>>({});
  const [showIce, setShowIce] = useState(false);

  const toggle = (key: string) =>
    setSelected(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);

  const toggleDone = (task: string) =>
    setDone(prev => ({ ...prev, [task]: !prev[task] }));

  const toggleIce = (task: string) =>
    setIceDone(prev => ({ ...prev, [task]: !prev[task] }));

  const activeTasks = selected.flatMap(k => TASKS[k as keyof typeof TASKS]?.tasks ?? []);

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#E8EAF0', fontFamily: 'system-ui, sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#F5E642', letterSpacing: '0.08em' }}>
          🧊 DFW HOME GUIDE — FEBRUARY
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>February in DFW</h1>
        <p style={{ color: '#94A3B8', marginBottom: '2rem' }}>
          February 2021 changed how DFW homeowners think about winter. Pipe insulation, heating backup plans, and emergency prep are now non-negotiable in this month.
        </p>

        <div style={{ background: '#1E3A5F', border: '1px solid #3B82F6', borderRadius: 8, padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => setShowIce(!showIce)}>
            <strong style={{ color: '#93C5FD' }}>❄️ Ice Storm Prep Checklist (Feb 2021 Lessons)</strong>
            <span style={{ color: '#93C5FD' }}>{showIce ? '▲' : '▼'}</span>
          </div>
          {showIce && (
            <div style={{ marginTop: '0.75rem' }}>
              {ICE_STORM_CHECKLIST.map(task => (
                <div key={task} onClick={() => toggleIce(task)} style={{
                  display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
                  padding: '0.5rem 0', cursor: 'pointer', borderBottom: '1px solid #1E3A5F',
                }}>
                  <span>{iceDone[task] ? '✅' : '⬜'}</span>
                  <span style={{ color: iceDone[task] ? '#4ADE80′ : '#CBD5E1', fontSize: '0.85rem', textDecoration: iceDone[task] ? ’line-through' : 'none' }}>{task}</span>
                </div>
              ))}
              <div style={{ marginTop: '0.5rem', color: '#64748B', fontSize: '0.8rem' }}>
                {ICE_STORM_CHECKLIST.filter(t => iceDone[t]).length} of {ICE_STORM_CHECKLIST.length} ice storm items done
              </div>
            </div>
          )}
        </div>

        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '1.5rem 0 1rem' }}>What does your home have?</h2>
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
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Your February Priority List</h2>
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
            Select your home features above to see your February priority list
          </div>
        )}
      </div>
    </div>
  );
}
