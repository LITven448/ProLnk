import { useState } from 'react';

const concerns = [
  {
    type: 'Sticking Doors or Windows',
    icon: '🚪',
    guide: [
      'Test every interior door — note which stick or swing open/closed on their own',
      'Mark hinge-side and latch-side corners with a pencil and date',
      'Retest in 30 days — new sticking = active movement',
      'Document weather at time of test (dry vs. after rain)',
      'If 3+ doors affected, call a foundation engineer',
    ],
  },
  {
    type: 'Uneven Floors',
    icon: '⚪',
    guide: [
      'Place a marble at 5 locations across each room',
      'Mark direction of roll with tape arrow + date',
      'Photograph marble position before and after',
      'Retest after dry spell and after heavy rain',
      'Slope >1 inch per 10 feet = consult engineer',
    ],
  },
  {
    type: 'Cracks in Walls or Floors',
    icon: '🔍',
    guide: [
      'Photograph each crack with a ruler for scale',
      'Tape a pencil mark at each end of the crack with date',
      'Measure width at widest point with a business card',
      'Return in 30 days — extending crack = active movement',
      'Stair-step cracks in brick are highest concern — call engineer',
    ],
  },
  {
    type: 'Soil Moisture Check',
    icon: '💧',
    guide: [
      'Walk the perimeter and probe soil 12 inches out from foundation',
      'Soil should feel moist — not dry/cracked, not saturated',
      'Log moisture level (dry / moist / wet) after any rain or dry week',
      'DFW clay expands and contracts violently — consistent watering prevents movement',
      'Run soaker hose 18 inches from foundation during dry months',
    ],
  },
  {
    type: 'Watering Records',
    icon: '📋',
    guide: [
      'Log irrigation schedule and any manual watering in a notes app',
      'Note: DFW expansive clay responds to watering within 48 hours',
      'Consistent moisture beats deep watering followed by dry spells',
      'Check for runoff grade — water should drain away from foundation',
      'Foundation engineers look at watering history — good records help diagnosis',
    ],
  },
];

export default function DFWFoundationDIYMonitoring2026() {
  const [selected, setSelected] = useState<typeof concerns[0] | null>(null);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui', padding: '2rem' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem' }}>🏗️</div>
          <h1 style={{ color: '#F5E642', fontSize: '2rem', margin: '0.5rem 0' }}>DFW Foundation DIY Monitoring 2026</h1>
          <p style={{ color: '#94a3b8', maxWidth: 600, margin: '0 auto' }}>Monthly self-checks every DFW homeowner should run. Expansive clay soil makes foundation monitoring essential in North Texas.</p>
        </div>

        <div style={{ background: '#0d1f3c', border: '1px solid #F5E642', borderRadius: 12, padding: '1.25rem', marginBottom: '2rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>⚠️ DFW Clay Soil Context</div>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>Dallas-Fort Worth sits on some of the most expansive clay soil in the US. Homes move seasonally — the goal of DIY monitoring is to distinguish normal seasonal movement from progressive failure requiring a structural engineer.</p>
        </div>

        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {concerns.map(concern => (
            <div key={concern.type} onClick={() => setSelected(selected?.type === concern.type ? null : concern)}
              style={{ background: '#0d1f3c', border: `1px solid ${selected?.type === concern.type ? '#F5E642' : '#1e3a5f'}`, borderRadius: 12, padding: '1.25rem', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{concern.icon}</span>
                <div style={{ fontWeight: 700, color: '#e2e8f0' }}>{concern.type}</div>
                <span style={{ marginLeft: 'auto', color: '#64748b', fontSize: '0.85rem' }}>{selected?.type === concern.type ? '▲ Close' : '▼ Guide'}</span>
              </div>
              {selected?.type === concern.type && (
                <ol style={{ marginTop: '1rem', paddingLeft: '1.2rem', borderTop: '1px solid #1e3a5f', paddingTop: '1rem' }}>
                  {concern.guide.map((step, i) => (
                    <li key={i} style={{ color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.88rem', lineHeight: 1.5 }}>{step}</li>
                  ))}
                </ol>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', background: '#0d1f3c', border: '1px solid #1e3a5f', borderRadius: 12, padding: '1.5rem' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.75rem' }}>📅 Monthly Monitoring Checklist</div>
          <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
            {['Door swing test on all interior doors', 'Marble roll test in living room and master', 'Photograph any crack extensions', 'Probe soil moisture perimeter', 'Log watering schedule for the month', 'Photo documentation of concern areas'].map((item, i) => (
              <li key={i} style={{ color: '#94a3b8', marginBottom: '0.4rem', fontSize: '0.88rem' }}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: '1.5rem', background: '#0d1f3c', border: '1px solid #F5E642', borderRadius: 12, padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ color: '#F5E642', fontWeight: 700, marginBottom: '0.5rem' }}>Need a DFW Foundation Engineer?</div>
          <p style={{ color: '#94a3b8', margin: 0 }}>ProLnk connects you with licensed structural engineers and foundation repair specialists in DFW.</p>
        </div>
      </div>
    </div>
  );
}