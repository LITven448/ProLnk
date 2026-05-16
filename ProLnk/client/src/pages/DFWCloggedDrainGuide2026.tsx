import { useState } from 'react';

export default function DFWCloggedDrainGuide2026() {
  const [drainLocation, setDrainLocation] = useState('');
  const [severity, setSeverity] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const diagnose = () => {
    if (drainLocation === 'kitchen' && severity === 'slow') {
      setRecommendation('🧴 Kitchen Slow Drain: Grease + DFW minerals combo. Do NOT use chemical drain cleaners — they damage pipes and rarely dissolve mineral-grease clogs. Try: boiling water + dish soap pour, then a drain snake 25 ft. If slow after: plumber with hydro-jet ($200-350).');
    } else if (drainLocation === 'kitchen' && severity === 'blocked') {
      setRecommendation('🚨 Full Kitchen Blockage: Call a plumber. DFW grease + mineral clogs that fully block the drain are typically 15-30 ft into the drain line — beyond DIY snake reach. Hydro-jetting: $250-400. Camera inspection first: $100-150.');
    } else if (drainLocation === 'bathroom' && severity === 'slow') {
      setRecommendation('💇 Bathroom Slow Drain: Hair + DFW mineral combo. Use a Zip-It drain tool ($5) to pull out the hair clog at the drain opening first. Then pour white vinegar + baking soda, wait 30 min, flush with hot water. Usually resolves without a plumber.');
    } else if (drainLocation === 'bathroom' && severity === 'blocked') {
      setRecommendation('🔧 Full Bathroom Blockage: Use a plunger with a good seal first (cup-type for flat drains, flange for toilets). If plunging fails after 10+ attempts, use a 15-25 ft drain snake. Still blocked? Call a plumber — $120-200 for drain clearing.');
    } else if (drainLocation === 'main') {
      setRecommendation('🏠 Main Line Clog — This is an Emergency. If multiple drains are backing up simultaneously, your main sewer line is blocked. Do not use any water. Call a licensed plumber immediately. DFW main line clearing: $250-500. Camera inspection required to check for root intrusion or pipe collapse.');
    } else {
      setRecommendation('Select the drain location and severity above for a recommendation.');
    }
  };

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', borderRadius: 8, padding: '12px 20px', marginBottom: 24, display: 'inline-block', fontWeight: 700 }}>
          🚰 DFW Plumbing Guide 2026
        </div>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>DFW Clogged Drain Guide 2026</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32 }}>
          DFW hard water creates mineral deposits inside drain pipes, narrowing them over time. Combined with hair and grease, DFW drains clog faster and harder than most U.S. cities.
        </p>

        <div style={{ background: '#dc2626', borderRadius: 12, padding: 16, marginBottom: 24 }}>
          <strong>⚠️ Never Use Chemical Drain Cleaners</strong>
          <p style={{ margin: '8px 0 0', fontSize: 14 }}>Drano, Liquid-Plumr and similar products damage PVC pipes, corrode metal pipes, and rarely dissolve the mineral-based clogs common in DFW. They also create toxic fumes if mixed with standing water. Use mechanical methods instead.</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 16 }}>🛠️ DFW Drain Clearing Methods</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { method: 'Zip-It hair removal tool', best: 'Bathroom drains', cost: '$5 DIY' },
              { method: 'Plunger (proper technique)', best: 'All drains / toilets', cost: '$8-15 DIY' },
              { method: '25-ft drain snake', best: 'Kitchen/bath clogs', cost: '$30 rental or $100 plumber' },
              { method: 'Hydro-jetting', best: 'Mineral + grease buildup', cost: '$200-400 plumber' },
              { method: 'Camera inspection', best: 'Main line / mystery clogs', cost: '$100-200 plumber' },
            ].map(r => (
              <div key={r.method} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, borderBottom: '1px solid #334155', paddingBottom: 10, alignItems: 'center' }}>
                <span style={{ color: '#e2e8f0' }}>{r.method}</span>
                <span style={{ color: '#94a3b8', fontSize: 13 }}>{r.best}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>{r.cost}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: 12, padding: 24, marginBottom: 24 }}>
          <h2 style={{ color: '#F5E642', fontSize: 20, marginBottom: 20 }}>🔍 Get a Fix Recommendation</h2>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8' }}>Which drain is clogged?</label>
            <select value={drainLocation} onChange={e => setDrainLocation(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: 6, background: '#0A1628', color: '#fff', border: '1px solid #334155' }}>
              <option value="">Select drain...</option>
              <option value="kitchen">🍳 Kitchen sink</option>
              <option value="bathroom">🚿 Bathroom sink / tub / shower</option>
              <option value="main">🏠 Multiple drains / main line</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', marginBottom: 8, color: '#94a3b8' }}>How severe?</label>
            <select value={severity} onChange={e => setSeverity(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: 6, background: '#0A1628', color: '#fff', border: '1px solid #334155' }}>
              <option value="">Select severity...</option>
              <option value="slow">🐢 Draining slowly</option>
              <option value="blocked">🛑 Completely blocked</option>
            </select>
          </div>
          <button onClick={diagnose}
            style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 6, padding: '12px 24px', fontWeight: 700, cursor: 'pointer', fontSize: 16 }}>
            Get Recommendation
          </button>
          {recommendation && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 8, padding: 16, borderLeft: '4px solid #F5E642', color: '#e2e8f0' }}>
              {recommendation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}