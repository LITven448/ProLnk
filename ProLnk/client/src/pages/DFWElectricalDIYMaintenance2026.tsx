import { useState } from 'react';

const tasks = [
  {
    type: 'Test GFCI Outlets',
    diy: true,
    icon: '🔌',
    freq: 'Monthly',
    steps: [
      'Locate GFCI outlets (near sinks, bathrooms, garage, exterior)',
      'Press TEST button — connected outlets should lose power',
      'Press RESET button — power should restore',
      'If outlet does not trip or reset, the GFCI has failed',
      'Failed GFCI = replace the outlet (DIY-safe with power off) or call electrician',
    ],
  },
  {
    type: 'Test Smoke & CO Detectors',
    diy: true,
    icon: '🚨',
    freq: 'Monthly + battery replacement annually',
    steps: [
      'Press and hold TEST button until alarm sounds',
      'If no sound — replace batteries first, then test again',
      'CO detectors expire after 5–7 years — check manufacture date on back',
      'Smoke detectors expire after 10 years — replace the whole unit',
      'Interconnected alarms: test one and verify all others sound',
    ],
  },
  {
    type: 'Replace Light Switch or Outlet',
    diy: true,
    icon: '💡',
    freq: 'As needed',
    steps: [
      'Turn off the correct breaker — use a non-contact voltage tester to confirm power is off',
      'Remove cover plate and unscrew outlet/switch from box',
      'Photograph wire connections before disconnecting',
      'Match wire colors: black (hot) to brass screw, white (neutral) to silver, green/bare (ground) to green',
      'Tighten all screws — do not use wire nuts on outlets',
      'Restore power and test with voltage tester before touching',
    ],
  },
  {
    type: 'Replace a Light Fixture',
    diy: true,
    icon: '🔦',
    freq: 'As needed',
    steps: [
      'Turn off breaker and confirm power off with voltage tester',
      'Remove old fixture — support the fixture while disconnecting wires',
      'Match wire colors to new fixture leads (use wire nuts)',
      'Ensure ground wire is connected — never skip ground on metal fixtures',
      'Attach mounting bracket to electrical box before hanging fixture',
      'Restore power and test',
    ],
  },
  {
    type: 'Panel Work or Breaker Replacement',
    diy: false,
    icon: '🚫',
    reason: 'Texas requires a TDLR-licensed electrician for all panel work. Main panel remains energized even with main breaker off. Lethal voltage at service entrance at all times.',
  },
  {
    type: 'New Circuit Installation',
    diy: false,
    icon: '🚫',
    reason: 'Running new circuits requires permits, inspection, and a TDLR license in Texas. Unpermitted electrical work affects homeowner insurance and home sale.',
  },
  {
    type: 'Aluminum Wiring Issues',
    diy: false,
    icon: '🚫',
    reason: 'Many 1960s–70s DFW homes have aluminum wiring. Aluminum-to-copper connections require licensed electrician and approved anti-oxidant compound.',
  },
  {
    type: 'EV Charger Installation',
    diy: false,
    icon: '🚫',
    reason: 'Level 2 EVSE requires a dedicated 240V circuit, permit, and TDLR-licensed electrician in Texas. Improper installation voids charger warranty and homeowner insurance.',
  },
];

export default function DFWElectricalDIYMaintenance2026() {
  const [selected, setSelected] = useState<typeof tasks[0] | null>(null);
  const [filter, setFilter] = useState<'all' | 'diy' | 'pro'>('all');

  const visible = tasks.filter(t => filter === 'all' || (filter === 'diy' && t.diy) || (filter === 'pro' && !t.diy));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>⚡</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0' }}>DFW Electrical DIY Maintenance 2026</h1>
          <p style={{ color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>What DFW homeowners can safely handle in electrical vs. what requires a TDLR-licensed electrician in Texas.</p>
        </div>

        <div style={{ background: '#0d1f3c', border: '1px solid #F5E642', borderRadius: 12, padding: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>⚠️ Texas Electrical License Law</div>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>Texas Department of Licensing and Regulation (TDLR) requires a licensed electrician for new circuits, panel work, and wiring inside walls. DIY tasks below are limited to fixture-level work with power confirmed off.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
          {(['all', 'diy', 'pro'] as const).map(f => (
            <button key={f} onClick={() => { setSelected(null); setFilter(f); }}
              style={{ background: filter === f ? '#F5E642' : '#1e3a5f', color: filter === f ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.25rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>
              {f === 'all' ? 'All Tasks' : f === 'diy' ? '✅ DIY Safe' : '⚡ TDLR Required'}
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
                <span style={{ background: task.diy ? '#166534' : '#7f1d1d', color: '#fff', borderRadius: 6, padding: '0.2rem 0.7rem', fontSize: '0.78rem' }}>
                  {task.diy ? '✅ DIY' : '⚡ Pro Only'}
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
                    <div style={{ color: '#fca5a5', fontSize: '0.88rem', lineHeight: 1.5 }}>⚡ {task.reason}</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', background: '#0d1f3c', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Need a TDLR-Licensed DFW Electrician?</div>
          <p style={{ color: '#94a3b8', margin: 0 }}>ProLnk connects you with licensed electricians serving the Dallas-Fort Worth metroplex.</p>
        </div>
      </div>
    </div>
  );
}