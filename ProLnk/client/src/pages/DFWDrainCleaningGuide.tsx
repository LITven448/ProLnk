import { useState } from 'react';

const DRAIN_TYPES = ['Kitchen Sink', 'Bathroom Sink', 'Shower/Tub', 'Toilet', 'Floor Drain', 'Main Sewer Line', 'Laundry Drain'];
const SEVERITIES = [
  { value: 'slow', label: '🐢 Slow drainage (taking 30+ sec)', diy: true },
  { value: 'partial', label: '🟡 Partial blockage — pools then drains', diy: true },
  { value: 'full', label: '🔴 Complete blockage — standing water', diy: false },
  { value: 'backup', label: '🚨 Multiple drains backing up', diy: false },
  { value: 'gurgle', label: '💬 Gurgling sounds / sewage smell', diy: false },
];

const METHODS = [
  { name: 'Drain Snake (Manual)', cost: '$75–150', diy: 'Yes — $20 at hardware store', best: ['Kitchen Sink', 'Bathroom Sink', 'Shower/Tub'], forSeverity: ['slow', 'partial'], icon: '🔩', desc: 'Physical cable breaks or pulls clogs. Effective for hair, grease balls, and soap buildup within 15 feet of drain opening.' },
  { name: 'Hydro-Jetting', cost: '$300–600', diy: 'No — professional only', best: ['Main Sewer Line', 'Kitchen Sink', 'Floor Drain'], forSeverity: ['full', 'backup', 'gurgle'], icon: '💥', desc: 'High-pressure water (4000 PSI) scours pipe walls, removes DFW hard water scale, grease, and root debris. Gold standard for main lines.' },
  { name: 'Motorized Auger', cost: '$150–250', diy: 'Rentable — $35–60/day', best: ['Toilet', 'Main Sewer Line', 'Laundry Drain'], forSeverity: ['partial', 'full'], icon: '⚙️', desc: 'Powered cable reaches 50–100 feet. Better than manual for stubborn grease buildup or deeper clogs.' },
  { name: 'Chemical Treatment', cost: '$15–40', diy: 'Yes', best: ['Bathroom Sink', 'Shower/Tub', 'Laundry Drain'], forSeverity: ['slow'], icon: '🧪', desc: 'Enzyme-based cleaners safe for DFW pipes. Avoid acid drain cleaners — they damage DFW\’s already-stressed CPVC and PVC. Only use for mild slow drains.' },
  { name: 'Pipe Camera Inspection', cost: '$200–400', diy: 'No', best: ['Main Sewer Line', 'Floor Drain'], forSeverity: ['backup', 'gurgle'], icon: '📷', desc: 'Video inspection identifies root intrusion (common in DFW from live oaks), pipe belly, or collapsed section before choosing repair method.' },
];

export default function DFWDrainCleaningGuide() {
  const [drainType, setDrainType] = useState('');
  const [severity, setSeverity] = useState('');
  const [showResult, setShowResult] = useState(false);

  const recommended = METHODS.filter(m =>
    (drainType === '' || m.best.includes(drainType)) &&
    (severity === '' || m.forSeverity.includes(severity))
  );

  const severityData = SEVERITIES.find(s => s.value === severity);

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#E8EDF5', fontFamily: 'system-ui, sans-serif', padding: '0 0 60px' }}>
      <div style={{ background: 'linear-gradient(135deg, #0A1628 0%, #112240 100%)', padding: '48px 24px 40px', borderBottom: '2px solid #F5E642′ }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ color: '#F5E642', fontSize: 13, fontWeight: 700, letterSpacing: 2, marginBottom: 12 }}>🌀 DFW DRAIN SERVICES</div>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 900, margin: '0 0 16px', lineHeight: 1.15 }}>Drain Cleaning Guide<br /><span style={{ color: '#F5E642′ }}>for DFW Homeowners</span></h1>
          <p style={{ fontSize: 16, color: '#8BA3C7', maxWidth: 620, margin: 0 }}>DFW's live oaks, hard water scale, and aging clay sewer lines make drain problems extremely common. Know when to DIY and when to call a pro — and which method actually solves the problem.</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 24px' }}>
        <section style={{ marginTop: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 16 }}>🌳 DFW-Specific Drain Challenges</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            {[
              { icon: '🌳', title: 'Live Oak Root Intrusion', desc: 'DFW live oaks have aggressive root systems that infiltrate clay sewer pipes. Root calls are the #1 reason DFW homeowners need hydro-jetting.' },
              { icon: '🪨', title: 'Hard Water Scale', desc: 'At 14–18 GPG, DFW water deposits calcium inside drain pipes. Over time, 4″ pipes narrow to 2″ effective diameter.' },
              { icon: '🍳', title: 'Grease Buildup', desc: 'Texas cooking style — frying, BBQ, bacon grease — means kitchen drain grease problems more common here than national average.' },
              { icon: '🏗️', title: 'Aging Clay Sewer Lines', desc: 'DFW homes built before 1980 often have clay tile sewer lines that crack and settle, creating debris-catching belly sections.' },
            ].map(item => (
              <div key={item.title} style={{ background: '#112240', border: '1px solid #1E3A5F', borderRadius: 10, padding: 18 }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, color: '#E8EDF5', marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: '#8BA3C7', fontSize: 13, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 40 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 16 }}>🗓️ Preventive Maintenance Schedule</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ background: '#F5E642', color: '#0A1628′ }}>
                  {['Frequency', 'Task', 'Why It Matters in DFW', 'DIY Cost'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 800 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Monthly', 'Enzyme drain cleaner in kitchen sink', 'Prevents grease accumulation', '$8–15'],
                  ['Quarterly', 'Pour boiling water + baking soda down drains', 'Dissolves early-stage hard water scale', 'Free'],
                  ['Every 6 months', 'Clean bathroom drain stoppers and P-traps', 'Removes hair/soap before full blockage', 'Free'],
                  ['Annually', 'Main sewer line camera inspection (if trees nearby)', 'Catches root intrusion early — before emergency', '$200–400'],
                  ['Every 3–5 yrs', 'Professional hydro-jetting of main line', 'Full pipe wall cleaning, removes scale and debris', '$300–600'],
                ].map((row, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#0E1E35′ : '#112240' }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: '10px 14px', color: j === 0 ? '#F5E642′ : '#C0D0E8', borderBottom: '1px solid #1E3A5F' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section style={{ marginTop: 40, background: '#112240', border: '2px solid #F5E642', borderRadius: 16, padding: 28 }}>
          <h2 style={{ color: '#F5E642', fontSize: 22, fontWeight: 800, marginBottom: 20 }}>🔍 Method Finder — What's Your Situation?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div>
              <label style={{ color: '#8BA3C7', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>WHICH DRAIN?</label>
              <select value={drainType} onChange={e => { setDrainType(e.target.value); setShowResult(false); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="">Any drain type</option>
                {DRAIN_TYPES.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: '#8BA3C7', fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>SEVERITY</label>
              <select value={severity} onChange={e => { setSeverity(e.target.value); setShowResult(false); }} style={{ width: '100%', background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 8, padding: '10px 14px', color: '#E8EDF5', fontSize: 14 }}>
                <option value="">Any severity</option>
                {SEVERITIES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>
          <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '13px 28px', fontWeight: 800, fontSize: 15, cursor: 'pointer', width: '100%', marginBottom: 20 }}>
            Find My Best Method
          </button>
          {showResult && (
            <div>
              {severity && severityData && !severityData.diy && (
                <div style={{ background: '#FF444420', border: '1px solid #FF4444', borderRadius: 8, padding: '12px 16px', marginBottom: 16, color: '#FF8888', fontSize: 14 }}>
                  🚨 This severity requires a licensed plumber. DIY attempts may worsen pipe damage or cause sewage backup.
                </div>
              )}
              <div style={{ display: 'grid', gap: 14 }}>
                {(recommended.length > 0 ? recommended : METHODS).map(m => (
                  <div key={m.name} style={{ background: '#0A1628', border: '1px solid #1E3A5F', borderRadius: 10, padding: 18 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div style={{ fontWeight: 800, color: '#E8EDF5', fontSize: 15 }}>{m.icon} {m.name}</div>
                      <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 14 }}>{m.cost}</div>
                    </div>
                    <div style={{ color: '#8BA3C7', fontSize: 13, lineHeight: 1.6, marginBottom: 8 }}>{m.desc}</div>
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                      <span style={{ background: '#112240', borderRadius: 6, padding: '4px 10px', fontSize: 12, color: '#4ECDC4′ }}>DIY: {m.diy}</span>
                      {m.best.map(b => <span key={b} style={{ background: '#112240', borderRadius: 6, padding: '4px 10px', fontSize: 12, color: '#8BA3C7′ }}>{b}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <div style={{ marginTop: 40, background: '#F5E642', borderRadius: 12, padding: 28, textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#0A1628', marginBottom: 8 }}>Get a DFW Drain Pro Today</div>
          <p style={{ color: '#112240', margin: '0 0 16px' }}>Licensed plumbers serving all DFW metro. Hydro-jetting, camera inspection, root removal. Fast response.</p>
          <div style={{ background: '#0A1628', color: '#F5E642', display: 'inline-block', padding: '14px 32px', borderRadius: 8, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Request Drain Service →</div>
        </div>
      </div>
    </div>
  );
}
