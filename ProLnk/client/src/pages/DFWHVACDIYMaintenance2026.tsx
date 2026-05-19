import { useState } from 'react';

const tasks = [
  { type: 'Filter Replacement', diy: true, freq: 'Monthly (pollen/cedar season)', steps: ['Turn off system at thermostat', 'Locate filter slot (usually return air vent or air handler)', 'Note size printed on old filter edge', 'Slide new filter in — arrow points toward air handler', 'Reset filter reminder on thermostat'] },
  { type: 'Condensate Drain Flush', diy: true, freq: 'Quarterly', steps: ['Locate condensate drain line (white PVC near air handler)', 'Pour 1/4 cup white vinegar into drain pan', 'Wait 30 min, flush with water', 'Check for standing water — if present, line is clogged', 'Call tech if water does not drain freely'] },
  { type: 'Outdoor Unit Clearance', diy: true, freq: 'Monthly spring/summer', steps: ['Turn off power at disconnect box', 'Remove debris, leaves, grass clippings from around unit', 'Maintain 2ft clearance on all sides', 'Gently rinse coils with garden hose — do not use pressure washer', 'Restore power and wait 5 min before running'] },
  { type: 'Thermostat Battery', diy: true, freq: 'Annually (fall)', steps: ['Remove thermostat from wall mount', 'Note battery type (usually AA or AAA)', 'Replace both batteries even if one is good', 'Reattach and verify schedule is intact', 'Set to hold mode before removing to save settings'] },
  { type: 'Register Cleaning', diy: true, freq: 'Every 3 months', steps: ['Remove vent register with screwdriver', 'Wash in warm soapy water', 'Vacuum visible duct interior (do not go deep)', 'Dry completely before replacing', 'Check for obstructions behind furniture'] },
  { type: 'Refrigerant Recharge', diy: false, reason: 'Requires EPA 608 certification in Texas. Illegal to handle refrigerant without license.' },
  { type: 'Electrical Repairs', diy: false, reason: 'Capacitors hold lethal voltage even when unplugged. Requires licensed HVAC tech.' },
  { type: 'Compressor Replacement', diy: false, reason: 'Compressor is the heart of the system. Requires refrigerant recovery before replacement.' },
  { type: 'Coil Cleaning (deep)', diy: false, reason: 'Chemical coil cleaner can damage fins if applied incorrectly. Tech required.' },
];

export default function DFWHVACDIYMaintenance2026() {
  const [selected, setSelected] = useState<typeof tasks[0] | null>(null);
  const [filter, setFilter] = useState<'all' | 'diy' | 'pro'>('all');

  const visible = tasks.filter(t => filter === 'all' || (filter === 'diy' && t.diy) || (filter === 'pro' && !t.diy));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🔧</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0' }}>DFW HVAC DIY Maintenance 2026</h1>
          <p style={{ color: '#94a3b8' }}>What DFW homeowners can safely handle vs. when to call a licensed tech.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
          {(['all', 'diy', 'pro'] as const).map(f => (
            <button key={f} onClick={() => setSelected(null) || setFilter(f)}
              style={{ background: filter === f ? '#F5E642' : '#1e3a5f', color: filter === f ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.25rem', cursor: 'pointer', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.8rem' }}>
              {f === 'all' ? 'All Tasks' : f === 'diy' ? '✅ DIY Safe' : '⚠️ Call a Pro'}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {visible.map(task => (
            <div key={task.type} onClick={() => setSelected(selected?.type === task.type ? null : task)}
              style={{ background: '#0d1f3c', border: `1px solid ${selected?.type === task.type ? '#F5E642' : '#1e3a5f'}`, borderRadius: 12, padding: '1.25rem', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, color: '#e2e8f0' }}>{task.type}</div>
                <span style={{ background: task.diy ? '#166534' : '#7f1d1d', color: '#fff', borderRadius: 6, padding: '0.2rem 0.7rem', fontSize: '0.78rem' }}>
                  {task.diy ? '✅ DIY' : '⚠️ Pro Required'}
                </span>
              </div>
              {task.diy && task.freq && <div style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: '0.25rem' }}>Frequency: {task.freq}</div>}
              {selected?.type === task.type && (
                <div style={{ marginTop: '1rem', borderTop: '1px solid #1e3a5f', paddingTop: '1rem' }}>
                  {task.diy && task.steps ? (
                    <ol style={{ paddingLeft: '1.2rem', margin: 0 }}>
                      {task.steps.map((s, i) => <li key={i} style={{ color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.88rem' }}>{s}</li>)}
                    </ol>
                  ) : (
                    <div style={{ color: '#fca5a5', fontSize: '0.88rem' }}>⚠️ {task.reason}</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', background: '#0d1f3c', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Need a Licensed DFW HVAC Tech?</div>
          <p style={{ color: '#94a3b8', margin: 0 }}>ProLnk connects you with TDLR-licensed HVAC technicians across the DFW metroplex.</p>
        </div>
      </div>
    </div>
  );
}