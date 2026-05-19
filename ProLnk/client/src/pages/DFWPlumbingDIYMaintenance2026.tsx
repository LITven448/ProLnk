import { useState } from 'react';

const tasks = [
  {
    type: 'Replace Toilet Flapper',
    diy: true,
    icon: '🚽',
    freq: 'Every 2–3 years or when toilet runs',
    steps: [
      'Turn off water supply valve behind toilet (clockwise)',
      'Flush to empty tank',
      'Unhook flapper chain from flush handle arm',
      'Slide old flapper off overflow tube ears',
      'Match flapper model or bring old one to hardware store',
      'Install new flapper — adjust chain so 1/2 inch of slack remains',
      'Turn water back on and test',
    ],
  },
  {
    type: 'Fix Dripping Faucet',
    diy: true,
    icon: '💧',
    freq: 'As needed',
    steps: [
      'Turn off water supply under sink (hot and cold)',
      'Remove handle — usually one screw under decorative cap',
      'Pull cartridge straight out — photograph orientation first',
      'Take cartridge to hardware store for exact match',
      'Insert new cartridge in same orientation',
      'Reassemble and test slowly — check for leaks',
    ],
  },
  {
    type: 'Clear Minor Drain Clog',
    diy: true,
    icon: '🪠',
    freq: 'As needed',
    steps: [
      'Use a cup plunger (flat) for sinks, flange plunger for toilets',
      'Fill sink 2 inches with water before plunging to create seal',
      'Plunge with steady rhythm 15–20 times, then pull off sharply',
      'Run hot water — if still slow, try plunging again',
      'Do NOT use chemical drain cleaners — they damage DFW cast iron pipes',
      'If clog does not clear in 3 attempts, call a plumber',
    ],
  },
  {
    type: 'Test Shutoff Valves',
    diy: true,
    icon: '🔧',
    freq: 'Annually',
    steps: [
      'Locate all shutoff valves (under sinks, toilets, water heater, main)',
      'Turn each valve clockwise until snug — do not force',
      'Turn back counterclockwise to fully open',
      'If valve is stuck or leaks when operated — do not force it further',
      'Stuck valves = call a plumber to replace before they fail in an emergency',
    ],
  },
  {
    type: 'Replace Showerhead',
    diy: true,
    icon: '🚿',
    freq: 'As desired',
    steps: [
      'Wrap shower arm threads with plumber tape (Teflon) — 3 wraps clockwise',
      'Hand-thread new showerhead clockwise',
      'Use a rag to protect finish, then one additional quarter-turn with pliers',
      'Turn on water — check for leaks at connection',
      'If arm is corroded or leaking at wall, call a plumber',
    ],
  },
  {
    type: 'Water Heater Repair',
    diy: false,
    icon: '🚫',
    reason: 'Texas law requires licensed plumber for water heater replacement. Gas connections require TSSA licensure. Improper installation can cause carbon monoxide buildup.',
  },
  {
    type: 'Sewer Line Issues',
    diy: false,
    icon: '🚫',
    reason: 'DFW clay soil causes frequent sewer line bellies and root intrusion. Requires camera inspection and licensed plumber for diagnosis and repair.',
  },
  {
    type: 'Pipe Leak or Burst',
    diy: false,
    icon: '🚫',
    reason: 'Shut off main and call a licensed plumber immediately. Texas requires licensed plumbers for all pipe repairs inside walls or under slab.',
  },
];

export default function DFWPlumbingDIYMaintenance2026() {
  const [selected, setSelected] = useState<typeof tasks[0] | null>(null);
  const [filter, setFilter] = useState<'all' | 'diy' | 'pro'>('all');

  const visible = tasks.filter(t => filter === 'all' || (filter === 'diy' && t.diy) || (filter === 'pro' && !t.diy));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🔩</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0′ }}>DFW Plumbing DIY Maintenance 2026</h1>
          <p style={{ color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>What DFW homeowners can safely handle in plumbing vs. when Texas law requires a licensed plumber.</p>
        </div>

        <div style={{ background: '#0d1f3c', border: '1px solid #F5E642', borderRadius: 12, padding: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>📍 Texas Plumbing License Requirement</div>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>Texas requires a TSBPE-licensed plumber for any work on water supply or drain lines inside walls, under slab, or at the meter. The tasks below that are DIY-safe are cosmetic or fixture-level only.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
          {(['all', 'diy', 'pro'] as const).map(f => (
            <button key={f} onClick={() => { setSelected(null); setFilter(f); }}
              style={{ background: filter === f ? '#F5E642′ : '#1e3a5f', color: filter === f ? '#0A1628' : '#fff', border: ’none', borderRadius: 8, padding: '0.5rem 1.25rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>
              {f === 'all' ? 'All Tasks' : f === 'diy' ? '✅ DIY Safe' : '🚫 Licensed Plumber'}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {visible.map(task => (
            <div key={task.type} onClick={() => setSelected(selected?.type === task.type ? null : task)}
              style={{ background: '#0d1f3c', border: `1px solid ${selected?.type === task.type ? '#F5E642' : '#1e3a5f'}`, borderRadius: 12, padding: '1.25rem', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{task.icon}</span>
                <div style={{ fontWeight: 700, color: '#e2e8f0', flex: 1 }}>{task.type}</div>
                <span style={{ background: task.diy ? '#166534′ : '#7f1d1d', color: '#fff', borderRadius: 6, padding: '0.2rem 0.7rem', fontSize: '0.78rem' }}>
                  {task.diy ? '✅ DIY' : '🚫 Pro Only'}
                </span>
              </div>
              {task.diy && task.freq && <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: '0.25rem', paddingLeft: '2.2rem' }}>Frequency: {task.freq}</div>}
              {selected?.type === task.type && (
                <div style={{ marginTop: '1rem', borderTop: '1px solid #1e3a5f', paddingTop: '1rem' }}>
                  {task.diy && task.steps ? (
                    <ol style={{ paddingLeft: '1.2rem', margin: 0 }}>
                      {task.steps.map((s, i) => <li key={i} style={{ color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.88rem', lineHeight: 1.5 }}>{s}</li>)}
                    </ol>
                  ) : (
                    <div style={{ color: '#fca5a5', fontSize: '0.88rem', lineHeight: 1.5 }}>🚫 {task.reason}</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', background: '#0d1f3c', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Need a Licensed DFW Plumber?</div>
          <p style={{ color: '#94a3b8', margin: 0 }}>ProLnk connects you with TSBPE-licensed plumbers serving the Dallas-Fort Worth area.</p>
        </div>
      </div>
    </div>
  );
}