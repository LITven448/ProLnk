import { useState } from 'react';

const guides = [
  { condition: 'Ponding water visible', icon: '💧', priority: 'URGENT', steps: ['Ponding >48hrs accelerates membrane deterioration — act immediately', 'DFW clay soil causes irregular settlement creating low spots — grade correction may be needed', 'Install crickets or tapered insulation to redirect drainage to drains/scuppers'] },
  { condition: 'Blistering or bubbling', icon: '🔵', priority: 'High', steps: ['Moisture trapped under modified bitumen — common in DFW humidity fluctuations', `Small blisters: monitor but don''’t puncture unless actively leaking`, 'Large blisters or open breaks: cut out, dry, patch with torch-down membrane'] },
  { condition: 'Seam separation', icon: '↔️', priority: 'High', steps: ['Modified bitumen seam failure — most common DFW low-slope failure point', 'Re-torch open seams or apply lap caulk rated for DFW temps (-20°F to 200°F)', 'Check for pattern — widespread seam issues indicate membrane end-of-life'] },
  { condition: 'Routine maintenance', icon: '🔧', priority: 'Preventive', steps: ['Clear drains and scuppers every 6 months — DFW storms dump debris', 'Inspect flashing at parapet walls, penetrations, and HVAC curbs twice yearly', 'Apply reflective coating every 5-7 years to reduce DFW UV degradation'] },
];

export default function DFWLowSlopeRoofGuide2026() {
  const [condition, setCondition] = useState('');
  const [result, setResult] = useState<typeof guides[0] | null>(null);

  const conditions = guides.map(g => g.condition);

  const getGuide = () => {
    const match = guides.find(g => g.condition === condition);
    setResult(match || null);
  };

  const priorityColor = (p: string) => p === 'URGENT' ? '#ef4444' : p === 'High' ? '#f97316' : '#22c55e';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '32px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🏢</div>
        <h1 style={{ color: '#F5E642', fontSize: 28, fontWeight: 700, marginBottom: 8 }}>DFW Low Slope Roof Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>Low slope (&lt;2:12 pitch) maintenance for DFW clay soil and weather conditions.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>📋 DFW Low Slope Basics</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '📐', label: 'Pitch', val: 'Less than 2:12 — low slope category' },
              { icon: '🏗️', label: 'Most Common', val: 'Modified bitumen for residential' },
              { icon: '🏢', label: 'Commercial', val: 'TPO and EPDM common in DFW' },
              { icon: '⚠️', label: 'Top Risk', val: 'Ponding water on DFW clay soil' },
            ].map(f => (
              <div key={f.label} style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{f.icon}</div>
                <div style={{ color: '#F5E642', fontWeight: 600, fontSize: 13 }}>{f.label}</div>
                <div style={{ color: '#e2e8f0', fontSize: 12 }}>{f.val}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔍 Get Maintenance Guide</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Current Condition</label>
            <select value={condition} onChange={e => setCondition(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #1e3a5f', borderRadius: 8, color: '#fff', fontSize: 14 }}>
              <option value="">Select condition...</option>
              {conditions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={getGuide} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', width: '100%' }}>Get Guide →</button>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20, borderLeft: '4px solid #F5E642' }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{result.icon}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ background: priorityColor(result.priority), color: '#fff', borderRadius: 6, padding: '2px 10px', fontSize: 12, fontWeight: 700 }}>{result.priority}</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {result.steps.map(step => <li key={step} style={{ color: '#e2e8f0', fontSize: 14, marginBottom: 8, lineHeight: 1.5 }}>{step}</li>)}
              </ul>
            </div>
          )}
        </div>
        <div style={{ textAlign: 'center', color: '#475569', fontSize: 12 }}>ProLnk DFW Roofing Intelligence • 2026</div>
      </div>
    </div>
  );
}