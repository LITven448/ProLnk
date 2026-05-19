import { useState } from 'react';

const CONDITIONS = [
  { id: 'hairline', label: 'Hairline Cracks Only', action: 'sealcoat', score: 1 },
  { id: 'moderate', label: 'Moderate Cracking (alligator pattern forming)', action: 'crack_seal', score: 2 },
  { id: 'potholes', label: 'Potholes / Deep Failures', action: 'patch', score: 3 },
  { id: 'widespread', label: 'Widespread Alligator Cracking (>25%)', action: 'resurface', score: 4 },
  { id: 'base_fail', label: 'Base Failure / Rutting / Upheaval', action: 'replace', score: 5 },
];

const ACTIONS = {
  sealcoat: { label: 'Sealcoating', costPerSqft: 0.18, desc: 'Apply coal tar or asphalt-based sealer. In DFW, sealcoat every 2–3 years — UV and summer heat degrade asphalt binder faster than cooler climates. Do not sealcoat new asphalt for 6–12 months.' },
  crack_seal: { label: 'Crack Sealing + Sealcoat', costPerSqft: 0.45, desc: 'Hot-pour rubberized crack filler into cracks, then sealcoat. Stops water infiltration before base damage occurs. DFW’s spring rains make this timing critical — repair before rainy season.' },
  patch: { label: 'Pothole Patching', costPerSqft: 3.5, desc: 'Remove failed area, compact new base, fill with hot-mix asphalt. DFW summer heat softens asphalt — pothole patches placed in peak summer sometimes re-fail. Night work or spring/fall timing preferred.' },
  resurface: { label: 'Asphalt Overlay (Resurfacing)', costPerSqft: 2.5, desc: 'Mill top 1.5–2" of asphalt, apply fresh hot-mix overlay. Restores surface without removing base. Most cost-effective option when base is still sound — typical DFW driveway life is 15–20 years before resurfacing.' },
  replace: { label: 'Full Replacement', costPerSqft: 4.5, desc: 'Remove all asphalt and base material, re-grade, compact new base (4–6" in DFW clay), install 3" hot-mix asphalt. DFW clay soils require proper geotextile fabric to prevent base contamination and premature failure.' },
};

export default function DFWAsphaltRepairGuide() {
  const [condition, setCondition] = useState('');
  const [sqft, setSqft] = useState('');
  const [result, setResult] = useState(null);

  function calculate() {
    if (!condition || !sqft) return;
    const c = CONDITIONS.find(x => x.id === condition);
    const a = ACTIONS[c.action];
    const area = parseFloat(sqft) || 0;
    const low = Math.round(a.costPerSqft * area * 0.85);
    const high = Math.round(a.costPerSqft * area * 1.25);
    setResult({ action: a, low, high, area });
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0A1628', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '32px 20px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 8, color: '#F5E642', fontSize: 13, fontWeight: 600, letterSpacing: 1 }}>DFW DRIVEWAY GUIDE</div>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 8px' }}>🛣️ Asphalt Driveway Guide — DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 32, lineHeight: 1.6 }}>
          DFW's extreme summer heat creates unique asphalt behavior — fresh asphalt softens enough to take heel impressions at 110°F. This guide covers the full spectrum from sealcoating through full replacement with DFW-specific timing and material guidance.
        </p>

        <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
          {[
            { icon: '🌡️', title: 'DFW Heat: Self-Healing & Problems', desc: 'DFW summer heat (95–110°F) softens asphalt binder — hairline cracks can actually self-seal in extreme heat. But this same softening causes tracking, rutting, and tire marks. Fresh seal coat in August heat becomes sticky and traps debris.' },
            { icon: '💧', title: 'Sealcoating Frequency in DFW', desc: 'DFW UV radiation and heat degrade asphalt binder 2–3x faster than northern climates. Sealcoat every 2–3 years (vs 4–5 years up north) to protect oxidizing asphalt. Never sealcoat within 6 months of new installation.' },
            { icon: '🌧️', title: 'DFW Rain + Crack Sealing Timing', desc: 'DFW gets 37" of rain annually, mostly in spring and fall. Unsealed cracks allow water to soften the clay base — the primary cause of asphalt failure. Seal cracks every fall before winter rain events.' },
            { icon: '🏗️', title: 'Clay Base Challenge', desc: 'DFW clay swells when wet and shrinks when dry, creating constant sub-base movement. Quality asphalt installation on DFW clay requires 6" compacted base and geotextile fabric — skip these and the driveway fails in 5 years.' },
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
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>Driveway Condition</label>
              <select value={condition} onChange={e => setCondition(e.target.value)} style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: '#fff', fontSize: 14 }}>
                <option value="">Select condition...</option>
                {CONDITIONS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>Driveway Size (sq ft)</label>
              <input type="number" value={sqft} onChange={e => setSqft(e.target.value)} placeholder="e.g. 800" style={{ width: '100%', padding: '10px 12px', background: '#0A1628', border: '1px solid #2d4a7a', borderRadius: 8, color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
            </div>
            <button onClick={calculate} style={{ padding: '12px 24px', background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Calculate Estimate</button>
          </div>
          {result && (
            <div style={{ marginTop: 20, background: '#0A1628', borderRadius: 10, padding: 20 }}>
              <div style={{ fontWeight: 700, color: '#F5E642', marginBottom: 4 }}>Recommended: {result.action.label}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#fff', marginBottom: 4 }}>${result.low.toLocaleString()} – ${result.high.toLocaleString()}</div>
              <div style={{ color: '#94a3b8', fontSize: 13, marginBottom: 12 }}>For {result.area} sq ft</div>
              <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>{result.action.desc}</div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 10, padding: 20, border: '1px solid #1e3a5f' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>💡 DFW Best Timing</div>
          <div style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>Optimal DFW asphalt work windows: March–April and October–November. Avoid July–August for sealcoating (heat causes tracking) and January–February for new installation (cold asphalt compacts poorly). Get 3 quotes and verify hot-mix vs cold-patch materials — cold patch is a temporary fix only.</div>
        </div>
      </div>
    </div>
  );
}
