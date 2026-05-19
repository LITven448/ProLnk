import { useState } from 'react';

const tasks = [
  {
    type: 'Clean Gutters',
    diy: true,
    icon: '🍂',
    freq: 'Twice a year (spring + fall)',
    steps: [
      'Use a stable extension ladder — never lean on gutters',
      'Wear gloves — gutters contain sharp debris and organic material',
      'Scoop debris from gutters into a bucket, working away from downspout',
      'Flush gutters with garden hose toward downspout',
      'Check downspout flow — insert hose if clogged',
      'Look for sagging sections or separated joints while up there',
    ],
  },
  {
    type: 'Attic Inspection from Inside',
    diy: true,
    icon: '🔦',
    freq: 'After any DFW hail event + annually',
    steps: [
      'Enter attic with flashlight after storm — look for daylight through roof deck',
      'Check for dark water stains on rafters or decking',
      'Look for sagging areas in roof deck (soft spots)',
      'Check attic insulation for wet patches',
      'Feel air flow — poor ventilation appears as condensation on rafters',
    ],
  },
  {
    type: 'Check Granules in Gutters',
    diy: true,
    icon: '⚫',
    freq: 'After hail events + quarterly',
    steps: [
      'After cleaning gutters, examine debris for gray or black granules',
      'A cup or more of granules after a storm = possible hail damage',
      'Photograph granule accumulation for insurance claim',
      'Note that new roofs shed some granules — this is normal in year 1',
      'Heavy ongoing loss = shingles nearing end of life',
    ],
  },
  {
    type: 'Ground Inspection with Binoculars',
    diy: true,
    icon: '🔭',
    freq: 'After every hail or windstorm',
    steps: [
      'Stand at each side of the house and inspect roof from ground',
      'Use 8x or 10x binoculars for detail',
      'Look for missing, curling, or lifted shingles',
      'Check flashing at chimney, vents, and valleys',
      'Photograph any areas of concern for insurance or contractor reference',
    ],
  },
  {
    type: 'Walking the Roof',
    diy: false,
    icon: '🚫',
    reason: 'DFW roofs pitch steeply — falls cause most roofing injuries. Soft spots can cause fall-through. Use binoculars from ground or hire a licensed roofer for close inspection.',
  },
  {
    type: 'Shingle Repair or Replacement',
    diy: false,
    icon: '🚫',
    reason: 'Texas roofing contractors must be registered with the Texas Dept of Insurance after 2021 (HB 2503). Improper repair voids manufacturer warranty.',
  },
  {
    type: 'Flashing Repair',
    diy: false,
    icon: '🚫',
    reason: 'Improper flashing is the #1 cause of roof leaks. Requires sealant knowledge specific to DFW temperature cycling.',
  },
];

export default function DFWRoofDIYMaintenance2026() {
  const [selected, setSelected] = useState<typeof tasks[0] | null>(null);
  const [filter, setFilter] = useState<'all' | 'diy' | 'pro'>('all');

  const visible = tasks.filter(t => filter === 'all' || (filter === 'diy' && t.diy) || (filter === 'pro' && !t.diy));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🏠</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0' }}>DFW Roof DIY Maintenance 2026</h1>
          <p style={{ color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>What DFW homeowners can safely do vs. what requires a licensed roofing contractor. Hail capital of the world — stay prepared.</p>
        </div>

        <div style={{ background: '#0d1f3c', border: '1px solid #F5E642', borderRadius: 12, padding: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>⛈️ DFW Hail Context</div>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>DFW averages 9–14 hail events per year. Insurance requires prompt reporting. Most policies have a 1-year reporting window — inspect after every significant storm.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
          {(['all', 'diy', 'pro'] as const).map(f => (
            <button key={f} onClick={() => { setSelected(null); setFilter(f); }}
              style={{ background: filter === f ? '#F5E642' : '#1e3a5f', color: filter === f ? '#0A1628' : '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.25rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase' }}>
              {f === 'all' ? 'All Tasks' : f === 'diy' ? '✅ DIY Safe' : '🚫 Pro Required'}
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
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Need a Licensed DFW Roofer?</div>
          <p style={{ color: '#94a3b8', margin: 0 }}>ProLnk connects you with TDI-registered roofing contractors across the DFW metroplex.</p>
        </div>
      </div>
    </div>
  );
}