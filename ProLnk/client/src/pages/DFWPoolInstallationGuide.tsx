import { useState } from 'react';

const POOL_TYPES = [
  { id: 'gunite', label: 'Gunite/Shotcrete', basePerSqFt: 150, note: 'Best for DFW clay soil — custom shape, most durable' },
  { id: 'fiberglass', label: 'Fiberglass', basePerSqFt: 110, note: 'Pre-formed shell, faster install, less clay soil flex tolerance' },
  { id: 'vinyl', label: 'Vinyl Liner', basePerSqFt: 80, note: 'Lowest upfront cost, liner replacement every 8-12 years' },
];

const FEATURES = [
  { id: 'waterfall', label: '🌊 Waterfall/Water Feature', cost: 4500 },
  { id: 'spa', label: '♨️ Attached Spa', cost: 12000 },
  { id: 'lighting', label: '💡 LED Lighting', cost: 2200 },
  { id: 'heater', label: '🔥 Pool Heater', cost: 3800 },
  { id: 'automation', label: '🤖 Smart Automation', cost: 3200 },
  { id: 'sunshelf', label: '☀️ Baja/Sun Shelf', cost: 2800 },
];

const POOL_SIZES = [
  { label: 'Small (12x24 — 288 sqft)', sqft: 288 },
  { label: 'Medium (14x28 — 392 sqft)', sqft: 392 },
  { label: 'Large (16x32 — 512 sqft)', sqft: 512 },
  { label: 'XL (18x36 — 648 sqft)', sqft: 648 },
  { label: 'Resort (20x40 — 800 sqft)', sqft: 800 },
];

export default function DFWPoolInstallationGuide() {
  const [poolSize, setPoolSize] = useState(POOL_SIZES[1]);
  const [poolType, setPoolType] = useState(POOL_TYPES[0]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showEstimate, setShowEstimate] = useState(false);

  function toggleFeature(id: string) {
    setSelectedFeatures(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  }

  const baseCost = poolSize.sqft * poolType.basePerSqFt;
  const featureCost = FEATURES.filter(f => selectedFeatures.includes(f.id)).reduce((sum, f) => sum + f.cost, 0);
  const permitCost = 1200;
  const deckCost = Math.round(poolSize.sqft * 0.6 * 18);
  const totalLow = Math.round((baseCost + featureCost + permitCost + deckCost) * 0.9);
  const totalHigh = Math.round((baseCost + featureCost + permitCost + deckCost) * 1.15);
  const monthlyOp = Math.round((poolSize.sqft / 400) * 180 + (selectedFeatures.includes('heater') ? 60 : 0));

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 6, display: 'inline-block', fontWeight: 700, fontSize: 12, marginBottom: 12 }}>
          🏊 DFW POOL INSTALLATION GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Pool Installation in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>Everything you need to know about building a pool in the Dallas-Fort Worth area — soil conditions, permits, costs, and timelines.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>🌱 Why Gunite Dominates DFW</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>DFW sits on expansive Blackland Prairie clay — the same soil that cracks driveways and shifts foundations. When dry, clay shrinks; when wet, it swells. Pre-formed fiberglass shells can pop or crack under this pressure. Gunite (sprayed concrete) is formed in place and flexes with the soil, making it the preferred choice for 70%+ of DFW pool builders.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
          {[
            { icon: '📋', label: 'Permit Required', value: 'Yes — all cities' },
            { icon: '⏱️', label: 'Build Timeline', value: '10–16 weeks' },
            { icon: '🏠', label: 'HOA Approval', value: 'Required if applicable' },
          ].map(item => (
            <div key={item.label} style={{ background: '#112240', borderRadius: 10, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28 }}>{item.icon}</div>
              <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 6 }}>{item.label}</div>
              <div style={{ color: '#F5E642', fontWeight: 700, marginTop: 4 }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>🏙️ DFW Permit Process</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { step: '1', text: 'Submit engineered drawings to city building dept' },
              { step: '2', text: 'Permit review: 2–6 weeks depending on city backlog' },
              { step: '3', text: 'HOA approval (if applicable) — can run parallel' },
              { step: '4', text: 'Inspections at excavation, steel, plumbing, final deck' },
              { step: '5', text: 'Barrier/fence required before water — Texas law' },
              { step: '6', text: 'Final inspection before pool can be filled' },
            ].map(item => (
              <div key={item.step} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ background: '#F5E642', color: '#0A1628', width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, flexShrink: 0 }}>{item.step}</div>
                <p style={{ color: '#cbd5e1', fontSize: 14, margin: 0, lineHeight: 1.5 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>💰 Cost Estimator</h2>
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Pool Size</label>
          <select value={poolSize.label} onChange={e => setPoolSize(POOL_SIZES.find(s => s.label === e.target.value) || POOL_SIZES[1])} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', width: '100%', marginBottom: 14 }}>
            {POOL_SIZES.map(s => <option key={s.label} value={s.label}>{s.label}</option>)}
          </select>
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Pool Type</label>
          {POOL_TYPES.map(t => (
            <div key={t.id} onClick={() => setPoolType(t)} style={{ background: poolType.id === t.id ? '#1e3a5f' : '#0A1628', border: `2px solid ${poolType.id === t.id ? '#F5E642' : '#334155'}`, borderRadius: 8, padding: 12, marginBottom: 8, cursor: 'pointer' }}>
              <div style={{ fontWeight: 700, marginBottom: 2 }}>{t.label}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{t.note}</div>
            </div>
          ))}
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', margin: '14px 0 8px' }}>Add-On Features</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
            {FEATURES.map(f => (
              <div key={f.id} onClick={() => toggleFeature(f.id)} style={{ background: selectedFeatures.includes(f.id) ? '#1e3a5f' : '#0A1628', border: `2px solid ${selectedFeatures.includes(f.id) ? '#F5E642' : '#334155'}`, borderRadius: 8, padding: 10, cursor: 'pointer', fontSize: 13 }}>
                {f.label} <span style={{ color: '#F5E642' }}>+${f.cost.toLocaleString()}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setShowEstimate(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 800, cursor: 'pointer', width: '100%', fontSize: 16 }}>
            Calculate My Estimate
          </button>
          {showEstimate && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginTop: 14, border: '2px solid #F5E642' }}>
              <div style={{ fontWeight: 800, fontSize: 20, color: '#F5E642', marginBottom: 8 }}>
                ${totalLow.toLocaleString()} – ${totalHigh.toLocaleString()}
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Includes pool shell, deck, equipment, permit (~$1,200). Excludes landscaping and fencing.</div>
              <div style={{ color: '#cbd5e1', marginTop: 10, fontSize: 14 }}>Monthly operating cost: <strong style={{ color: '#F5E642' }}>${monthlyOp}/mo</strong> (chemicals, electricity, service)</div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 10 }}>⚠️ DFW-Specific Requirements</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: 2, paddingLeft: 20 }}>
            <li>Texas law requires a 48" barrier around all pools before water is added</li>
            <li>Most DFW cities require setbacks of 5–10 ft from property lines</li>
            <li>Plano, Frisco, McKinney: check HOA first — stricter than city codes</li>
            <li>Fort Worth, Dallas: permit fees typically $500–$1,500 based on project value</li>
            <li>Underground utilities must be marked before excavation (call 811)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
