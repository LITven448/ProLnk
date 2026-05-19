import { useState } from 'react';

export default function DFWRoofingThermalScan2026() {
  const [concern, setConcern] = useState('');
  const [result, setResult] = useState('');

  const concerns = [
    { value: 'leak', label: 'Active or suspected roof leak' },
    { value: 'hail', label: 'Recent DFW hail storm — checking for hidden damage' },
    { value: 'age', label: 'Roof is 8-15 years old, no visible issues' },
    { value: 'hvac', label: 'High energy bills — suspect insulation gaps' },
    { value: 'mold', label: 'Musty smell in attic or upper floors' },
  ];

  const outcomes: Record<string, { verdict: string; color: string; reason: string; timing: string; cost: string }> = {
    leak: { verdict: 'High Value — Get Thermal Scan', color: '#4ade80', reason: 'Infrared cameras detect moisture trapped in roofing layers invisible to the naked eye. After sunset when the DFW roof is still warm, wet insulation radiates differently — thermal imaging maps exactly where water has penetrated.', timing: 'Best 1-3 hours after sunset on a clear DFW day', cost: '-500 — worth it before expensive repairs' },
    hail: { verdict: 'High Value — Especially for Insurance', color: '#4ade80', reason: 'Hail can crack decking and allow water infiltration that won’t show for months. Thermal scan documents hidden moisture at time of claim — this protects your insurance position significantly.', timing: 'Within 2 weeks of storm for best insurance documentation', cost: '-600 — potentially saves your claim' },
    age: { verdict: 'Moderate Value — Consider With Inspection', color: '#F5E642', reason: 'An 8-15 year DFW roof may have slow moisture intrusion not yet visible. Combine standard inspection with thermal for comprehensive picture. Most inspectors can add thermal for -200 extra.', timing: 'Any time, but late evening provides best contrast', cost: '-200 add-on to standard inspection' },
    hvac: { verdict: 'High Value for Energy Loss', color: '#4ade80', reason: 'Thermal cameras clearly show insulation gaps, bypasses, and air leaks. In DFW where cooling costs dominate, finding even one major gap can save -800/year. Scan pays for itself quickly.', timing: 'During DFW summer evening — high temperature contrast', cost: '-500 — ROI within 1-2 cooling seasons' },
    mold: { verdict: 'Strongly Recommended', color: '#ef4444', reason: 'Musty smell with no visible moisture usually means moisture is trapped somewhere. Thermal scan locates the source non-invasively before mold testing or demolition — saves significant diagnostic cost.', timing: 'As soon as possible — mold spreads in DFW humidity', cost: '-500 — prevents much larger remediation costs' },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A1628', color: '#fff', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🌡️</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#F5E642', margin: '0 0 12px' }}>DFW Thermal Imaging Roof Inspection Guide 2026</h1>
          <p style={{ color: '#94a3b8', fontSize: 16 }}>Is infrared thermal scanning worth it for your DFW roof? Find out in 30 seconds.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
          {[
            { icon: '📸', label: 'What It Shows', value: 'Moisture in roofing layers' },
            { icon: '🌙', label: 'Best DFW Time', value: '1-3 hrs after sunset' },
            { icon: '💰', label: 'Cost Range', value: '-600 typical' },
            { icon: '🎯', label: 'Accuracy', value: 'Detects 1/2” wet spot' },
          ].map((s, i) => (
            <div key={i} style={{ background: '#0F1F3D', borderRadius: 12, padding: 20, border: '1px solid #1e3a5f' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 4 }}>{s.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, fontSize: 16 }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#0F1F3D', borderRadius: 16, padding: 28, border: '1px solid #1e3a5f', marginBottom: 28 }}>
          <h2 style={{ color: '#F5E642', marginTop: 0, fontSize: 20 }}>🔍 DFW Roof Concern → Thermal Scan Value</h2>
          <p style={{ color: '#94a3b8', marginBottom: 16 }}>What’s your DFW roofing situation?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {concerns.map(c => (
              <button key={c.value} onClick={() => { setConcern(c.value); setResult(c.value); }} style={{ padding: '12px 16px', borderRadius: 8, border: `2px solid ${concern === c.value ? '#F5E642' : '#1e3a5f'}`, background: concern === c.value ? '#F5E642' : '#0A1628', color: concern === c.value ? '#0A1628' : '#fff', cursor: 'pointer', textAlign: 'left', fontWeight: 600 }}>{c.label}</button>
            ))}
          </div>
        </div>

        {result && outcomes[result] && (
          <div style={{ background: '#0F1F3D', borderRadius: 16, padding: 28, border: `2px solid ${outcomes[result].color}` }}>
            <h3 style={{ color: outcomes[result].color, marginTop: 0, fontSize: 20 }}>📊 {outcomes[result].verdict}</h3>
            <p style={{ color: '#e2e8f0', marginBottom: 12 }}>{outcomes[result].reason}</p>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ marginBottom: 8 }}><span style={{ color: '#94a3b8' }}>Best DFW timing: </span><span style={{ color: '#F5E642', fontWeight: 700 }}>{outcomes[result].timing}</span></div>
              <div><span style={{ color: '#94a3b8' }}>Typical cost: </span><span style={{ color: '#4ade80', fontWeight: 700 }}>{outcomes[result].cost}</span></div>
            </div>
            <p style={{ color: '#64748b', fontSize: 13 }}>ProLnk connects you with DFW roofers who carry certified thermal imaging cameras and provide full reports for insurance claims.</p>
          </div>
        )}
      </div>
    </div>
  );
}