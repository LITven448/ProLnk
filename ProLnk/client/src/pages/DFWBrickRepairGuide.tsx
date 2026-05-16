import { useState } from 'react';

const PROBLEM_TYPES = [
  { id: 'tuckpointing', label: 'Mortar Joint Deterioration', base: 8 },
  { id: 'spalling', label: 'Spalling / Flaking Bricks', base: 15 },
  { id: 'efflorescence', label: 'White Mineral Deposits', base: 4 },
  { id: 'lintel', label: 'Lintel Failure Above Window', base: 25 },
  { id: 'cracking', label: 'Structural Cracks / Clay Soil Shift', base: 20 },
];

const SEVERITIES = [
  { id: 'minor', label: 'Minor (cosmetic only)', mult: 0.7 },
  { id: 'moderate', label: 'Moderate (functional issues)', mult: 1.0 },
  { id: 'severe', label: 'Severe (structural concern)', mult: 1.6 },
];

function getDIYAssessment(problemId, severity) {
  if (severity === 'severe' || problemId === 'lintel' || problemId === 'cracking') return 'Pro Required';
  if (problemId === 'efflorescence' && severity === 'minor') return 'DIY Possible';
  if (problemId === 'tuckpointing' && severity === 'minor') return 'DIY Possible with training';
  return 'Pro Recommended';
}

function getRepairMethod(problemId) {
  const methods = {
    tuckpointing: 'Grind out deteriorated mortar 3/4", repack with matching mortar. DFW humidity accelerates joint failure—use Type S mortar rated for high humidity.',
    spalling: 'Replace spalled bricks individually. DFW freeze-thaw cycles (rare but damaging) and summer heat expansion cause spalling. Match brick age and color carefully.',
    efflorescence: 'Brush dry, apply efflorescence cleaner, seal with penetrating silane sealer. DFW humidity draws salts to surface continuously—sealing is essential.',
    lintel: 'Shore wall above opening, remove failed lintel, install new steel lintel, repoint courses above. Never skip shoring—wall collapse risk is real.',
    cracking: 'Diagnose soil movement pattern first. DFW expansive clay causes stair-step cracks at corners. May require piering before masonry repair.',
  };
  return methods[problemId] || 'Consult a mason for assessment.';
}

export default function DFWBrickRepairGuide() {
  const [problem, setProblem] = useState('');
  const [area, setArea] = useState('');
  const [severity, setSeverity] = useState('');
  const [result, setResult] = useState(null);

  function calculate() {
    if (!problem || !area || !severity) return;
    const p = PROBLEM_TYPES.find(x => x.id === problem);
    const s = SEVERITIES.find(x => x.id === severity);
    const sqft = parseFloat(area) || 0;
    const low = Math.round(p.base * s.mult * sqft);
    const high = Math.round(p.base * s.mult * sqft * 1.4);
    setResult({ low, high, method: getRepairMethod(problem), diy: getDIYAssessment(problem, severity) });
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW MASONRY GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>🧱 Brick Repair Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW clay soil expansion, summer heat cycles, and occasional freeze events create specific brick failure patterns. This guide covers tuckpointing, spalling, efflorescence, lintel failure, and soil-movement cracking with DFW-specific context.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '🔧', title: 'Tuckpointing', desc: 'Mortar replacement — most common DFW brick repair. Heat cycling expands and contracts joints annually.' },
            { icon: '❄️', title: 'Spalling Prevention', desc: 'DFW freeze events (2021 URI-level) cause water-saturated bricks to fracture. Sealing before winter is critical.' },
            { icon: '⬜', title: 'Efflorescence', desc: 'White mineral deposits common in DFW humidity. Not structural, but indicates moisture movement through masonry.' },
            { icon: '🏗️', title: 'Lintel Failure', desc: 'Steel lintels above windows rust and expand, cracking brick above. DFW humidity accelerates rust progression.' },
            { icon: '🌍', title: 'Clay Soil Cracking', desc: 'DFW sits on expansive Blackland Prairie clay. Seasonal soil movement causes diagonal stair-step cracking at wall corners.' },
          ].map(item => (
            <div key={item.title} style={{ background: '#112240', borderRadius: 10, padding: '16px 20px', border: '1px solid #1e3a5f', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 24 }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 24, border: '1px solid #1e3a5f', marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: '#F5E642' }}>🧮 Repair Cost Estimator</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>Problem Type</label>
              <select value={problem} onChange={e => setProblem(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="">Select problem...</option>
                {PROBLEM_TYPES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>Affected Area (sq ft)</label>
              <input type="number" value={area} onChange={e => setArea(e.target.value)} placeholder="e.g. 50" style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>Severity</label>
              <select value={severity} onChange={e => setSeverity(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="">Select severity...</option>
                {SEVERITIES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <button onClick={calculate} style={{ padding: '12px 24px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Calculate Estimate</button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F5E642', marginBottom: 4 }}>${result.low.toLocaleString()} – ${result.high.toLocaleString()}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>Estimated repair cost</div>
              <div style={{ marginBottom: 12 }}>
                <span style={{ background: result.diy === 'Pro Required' ? '#7f1d1d' : result.diy === 'DIY Possible' ? '#14532d' : '#713f12', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>{result.diy === 'Pro Required' ? '🚫' : result.diy === 'DIY Possible' ? '✅' : '⚠️'} {result.diy}</span>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6 }}>{result.method}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>💡 DFW Pro Tip</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>Get 3 quotes from MCAA-certified masons. DFW has many unlicensed operators — verify insurance and check BBB. Best repair windows: March–May and October–November when temps are moderate for proper mortar cure.</div>
        </div>
      </div>
    </div>
  );
}
