import { useState } from 'react';

const severities = [
  { id: 'quarter', label: '🪙 Quarter-sized hail (1 inch)', description: 'Common threshold for insurance claims in DFW', risk: 'moderate' },
  { id: 'golf', label: '⛳ Golf ball-sized hail (1.75 inch)', description: 'Shingle bruising, ding vehicles, may crack skylights', risk: 'high' },
  { id: 'baseball', label: '⚾ Baseball-sized hail (2.75 inch+)', description: 'Severe roof damage, broken windows, significant vehicle damage', risk: 'critical' },
];

const beforeStorm = [
  'Move vehicles into garage — a single baseball-sized hail stone can total a car',
  'Document property condition with photos/video (time-stamped before storm)',
  'Cover potted plants, patio furniture, and fragile outdoor fixtures',
  'Close all windows and skylights — even small hail can blow horizontally',
  'Keep insurance policy number and claims hotline in your phone',
  'Charge your phone fully and locate flashlights',
];

const afterActions: Record<string, { actions: string[]; photos: string[]; timeline: string[] }> = {
  quarter: {
    actions: ['Walk entire roof perimeter for visible granule loss', 'Check all skylights for cracking or seal damage', 'Inspect AC condenser fins for crushing', 'Document all findings with photos'],
    photos: ['Granule accumulation in gutters and downspouts', 'Any bruised shingles (dark spots when pressed)', 'Vehicle dents as scale reference for storm intensity'],
    timeline: ['Day 1: Document damage before weather changes', 'Week 1: File insurance claim if roof damage found', 'Week 2-4: Schedule licensed roofing inspection'],
  },
  golf: {
    actions: ['Immediate roof inspection (do not enter attic until inspected)', 'Check all windows and skylights for cracks', 'Inspect HVAC condenser — may need to replace fins or full unit', 'Look for water infiltration in attic within 24 hours of rain', 'File insurance claim within 3-7 days of storm'],
    photos: ['Circular dents on aluminum soffits and gutters (best evidence)', 'Bruised/torn shingles from ground with zoom lens', 'HVAC condenser fin damage close-up', 'Vehicle damage as severity documentation'],
    timeline: ['Hours 1-4: Document everything before debris cleanup', 'Day 1-3: File insurance claim (most DFW policies require prompt notice)', 'Week 1-2: Get 3 licensed contractor bids (NOT storm chasers)', 'Week 3-8: Repairs scheduled after adjuster visit'],
  },
  baseball: {
    actions: ['SAFETY FIRST: Check for broken windows before re-entering', 'Call insurance IMMEDIATELY — this qualifies as major loss', 'Cover broken windows with plastic sheeting to prevent interior damage', 'Do not let any contractor start work without adjuster approval', 'Expect full roof replacement, not repair'],
    photos: ['Everything — every side of every structure', 'Interior water damage if any entry occurred', 'All vehicle damage from multiple angles', 'Neighbor properties to establish storm path/severity'],
    timeline: ['Day 1: Emergency tarping if roof is breached (insurer-approved)', 'Day 1-2: File claim and request priority adjuster visit', 'Week 1: Adjuster visit — be present for the inspection', 'Week 2-6: Get contractor bids after receiving adjuster report', 'Month 1-3: Full restoration and supplemental claims if needed'],
  },
};

export default function DFWHailSeasonGuide() {
  const [severity, setSeverity] = useState('');
  const [phase, setPhase] = useState<'before' | 'during' | 'after'>('before');

  const data = severity ? afterActions[severity] : null;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #1a2d4a 100%)', padding: '48px 24px 40px', textAlign: 'center', borderBottom: '2px solid #F5E642' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>⛈️</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 8px' }}>DFW Hail Season Guide</h1>
        <p style={{ color: '#94a3b8', fontSize: 16, margin: 0 }}>Peak Season: March – June</p>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px 0' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 10, padding: '14px 20px', marginBottom: 28, fontWeight: 700, fontSize: 15 }}>
          ⚠️ CONTRACTOR SCAM ALERT: After major DFW hail events, out-of-state "storm chasers" flood neighborhoods. NEVER let a contractor start work before your insurance adjuster visits. Always verify Texas Dept of Insurance license.
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 28 }}>
          {(['before', 'during', 'after'] as const).map(p => (
            <button key={p} onClick={() => setPhase(p)} style={{ background: phase === p ? '#F5E642' : '#111f35', color: phase === p ? '#0A1628' : '#fff', border: 'none', borderRadius: 10, padding: '12px 8px', fontWeight: 700, fontSize: 14, cursor: 'pointer', textTransform: 'capitalize' }}>
              {p === 'before' ? '⏰ Before' : p === 'during' ? '🌩️ During' : '🔍 After'}
            </button>
          ))}
        </div>

        {phase === 'before' && (
          <>
            <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>Before a Storm</h2>
            {beforeStorm.map((item, i) => (
              <div key={i} style={{ background: '#111f35', borderRadius: 10, padding: '12px 16px', marginBottom: 10, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ color: '#F5E642', flexShrink: 0 }}>☑</span>
                <span style={{ color: '#cbd5e1', fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </>
        )}

        {phase === 'during' && (
          <>
            <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>During a Hail Storm</h2>
            {[
              { title: '🏠 Shelter Location', tip: 'Interior room on lowest floor, away from windows. A bathroom or closet in the center of the home is ideal.' },
              { title: '🚗 Your Vehicle', tip: 'If indoors, stay there. Do not run to garage during active storm. Metal doors and windows are storm hazards.' },
              { title: '❄️ HVAC Unit', tip: 'Turn AC off during heavy hail. Crushed condenser fins operating under load can burn out the motor.' },
              { title: '📱 Storm Tracking', tip: 'Use NOAA Weather app, iNaturalist hail reports, or DFW’s local KHOU/NBC5/WFAA for real-time radar and storm path.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#111f35', borderRadius: 10, padding: '16px 18px', marginBottom: 12 }}>
                <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 14, marginBottom: 8 }}>{item.title}</div>
                <div style={{ color: '#cbd5e1', fontSize: 14 }}>{item.tip}</div>
              </div>
            ))}
          </>
        )}

        {phase === 'after' && (
          <>
            <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>After the Storm — Select Severity</h2>
            <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
              {severities.map(s => (
                <button key={s.id} onClick={() => setSeverity(s.id)} style={{ background: severity === s.id ? '#1a3a5c' : '#111f35', border: `2px solid ${severity === s.id ? '#F5E642' : '#1e3a5f'}`, borderRadius: 10, padding: '14px 16px', color: '#fff', textAlign: 'left', cursor: 'pointer' }}>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ color: '#94a3b8', fontSize: 13 }}>{s.description}</div>
                </button>
              ))}
            </div>

            {data && (
              <div style={{ display: 'grid', gap: 16 }}>
                {[
                  { title: '✅ Action Checklist', items: data.actions },
                  { title: '📸 What to Photograph', items: data.photos },
                  { title: '📅 Insurance Timeline', items: data.timeline },
                ].map(section => (
                  <div key={section.title} style={{ background: '#111f35', borderRadius: 10, padding: '18px 20px', border: '1px solid #1e3a5f' }}>
                    <div style={{ fontWeight: 700, color: '#F5E642', fontSize: 15, marginBottom: 12 }}>{section.title}</div>
                    {section.items.map((item, i) => (
                      <div key={i} style={{ color: '#cbd5e1', fontSize: 14, marginBottom: 8, display: 'flex', gap: 8 }}>
                        <span style={{ color: '#F5E642', flexShrink: 0 }}>•</span>
                        {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
