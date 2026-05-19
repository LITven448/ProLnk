import { useState } from 'react';

const SURFACE_TYPES = [
  { id: 'plaster', label: 'White Plaster', costPerSqFt: 6, lifespan: '7–10 years', note: 'Standard finish, most affordable, prone to staining in hard water' },
  { id: 'quartz', label: 'Quartz/Pebble Plaster', costPerSqFt: 10, lifespan: '12–18 years', note: 'Best for DFW hard water — more durable, less mineral buildup' },
  { id: 'pebble', label: 'Pebble Tec / Aggregate', costPerSqFt: 14, lifespan: '20–25 years', note: 'Premium finish, rough texture, highest durability in Texas heat' },
  { id: 'tile', label: 'Full Ceramic/Glass Tile', costPerSqFt: 28, lifespan: '30+ years', note: 'Luxury finish, immune to hard water, highest upfront cost' },
];

const POOL_SIZES = [
  { label: 'Small (288 sqft)', sqft: 288 },
  { label: 'Medium (392 sqft)', sqft: 392 },
  { label: 'Large (512 sqft)', sqft: 512 },
  { label: 'XL (648 sqft)', sqft: 648 },
];

const RESURFACING_SIGNS = [
  { icon: '🪨', sign: 'Rough or abrasive texture that scratches skin' },
  { icon: '🟤', sign: 'Persistent brown, grey, or black staining not removed by acid wash' },
  { icon: '🕳️', sign: 'Visible pitting, spalling, or delamination (plaster flaking off)' },
  { icon: '💧', sign: 'Increased water loss — cracks allow seepage through shell' },
  { icon: '⚗️', sign: 'Chronic chemical imbalance — degraded plaster leaches calcium' },
  { icon: '📅', sign: 'More than 10 years since last resurface (DFW hard water accelerates wear)' },
];

export default function DFWPoolResurfacingGuide() {
  const [poolSize, setPoolSize] = useState(POOL_SIZES[1]);
  const [surface, setSurface] = useState(SURFACE_TYPES[1]);
  const [yearsSince, setYearsSince] = useState(10);
  const [showResult, setShowResult] = useState(false);

  const baseCost = poolSize.sqft * surface.costPerSqFt;
  const drainFill = 450;
  const acidWash = 350;
  const totalLow = Math.round((baseCost + drainFill + acidWash) * 0.92);
  const totalHigh = Math.round((baseCost + drainFill + acidWash) * 1.12);

  const urgency = yearsSince >= 12 ? 'high' : yearsSince >= 8 ? 'moderate' : 'low';
  const urgencyColor = urgency === 'high' ? '#ef4444′ : urgency === ’moderate' ? '#f59e0b' : '#22c55e';
  const urgencyLabel = urgency === 'high' ? 'Resurface Now' : urgency === 'moderate' ? 'Plan Within 2 Years' : 'Monitor Annually';

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'system-ui, sans-serif', padding: '24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ background: '#F5E642', color: '#0A1628', padding: '6px 14px', borderRadius: 6, display: 'inline-block', fontWeight: 700, fontSize: 12, marginBottom: 12 }}>
          🔧 DFW POOL RESURFACING GUIDE
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Pool Resurfacing in DFW</h1>
        <p style={{ color: '#94a3b8', marginBottom: 28 }}>DFW's extremely hard water accelerates pool surface degradation. Know when to resurface, which finish lasts longest in Texas, and what it costs.</p>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>💧 Hard Water Warning: DFW Reality</h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.7 }}>Dallas-Fort Worth water has a hardness of 200–350+ ppm — significantly higher than the recommended 200–400 ppm for pool water. This excess calcium carbonate etches plaster, forms scale, and creates staining that even acid washing cannot fully remove. Standard white plaster that might last 15 years in other climates typically needs resurfacing in 7–10 years in DFW. Quartz-based finishes are strongly recommended.</p>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>🚨 Signs You Need to Resurface</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {RESURFACING_SIGNS.map(item => (
              <div key={item.sign} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: '#0A1628', borderRadius: 8, padding: 12 }}>
                <span style={{ fontSize: 22 }}>{item.icon}</span>
                <p style={{ color: '#cbd5e1', fontSize: 13, margin: 0, lineHeight: 1.5 }}>{item.sign}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 14 }}>🎨 Surface Types Compared</h2>
          {SURFACE_TYPES.map(s => (
            <div key={s.id} onClick={() => setSurface(s)} style={{ background: surface.id === s.id ? '#1e3a5f' : '#0A1628', border: `2px solid ${surface.id === s.id ? '#F5E642' : '#334155'}`, borderRadius: 8, padding: 14, marginBottom: 10, cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontWeight: 700 }}>{s.label}</span>
                <span style={{ color: '#F5E642', fontWeight: 700 }}>${s.costPerSqFt}/sqft</span>
              </div>
              <div style={{ color: '#64748b', fontSize: 12, marginBottom: 4 }}>Lifespan in DFW: {s.lifespan}</div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>{s.note}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20, marginBottom: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 16 }}>🔢 Estimator + Recommendation</h2>
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Pool Size</label>
          <select value={poolSize.label} onChange={e => setPoolSize(POOL_SIZES.find(s => s.label === e.target.value) || POOL_SIZES[1])} style={{ background: '#0A1628', color: '#fff', border: '1px solid #334155', borderRadius: 8, padding: '10px 14px', width: '100%', marginBottom: 14 }}>
            {POOL_SIZES.map(s => <option key={s.label}>{s.label}</option>)}
          </select>
          <label style={{ color: '#94a3b8', fontSize: 13, display: 'block', marginBottom: 6 }}>Years Since Last Resurface: <strong style={{ color: '#fff' }}>{yearsSince} years</strong></label>
          <input type="range" min={1} max={25} value={yearsSince} onChange={e => setYearsSince(Number(e.target.value))} style={{ width: '100%', marginBottom: 16, accentColor: '#F5E642′ }} />
          <button onClick={() => setShowResult(true)} style={{ background: '#F5E642', color: '#0A1628', border: 'none', borderRadius: 8, padding: '12px 24px', fontWeight: 800, cursor: 'pointer', width: '100%', fontSize: 16 }}>
            Get My Recommendation
          </button>
          {showResult && (
            <div style={{ background: '#0A1628', borderRadius: 10, padding: 16, marginTop: 14, border: '2px solid #F5E642′ }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ fontWeight: 800, fontSize: 20, color: '#F5E642′ }}>${totalLow.toLocaleString()} – ${totalHigh.toLocaleString()}</div>
                <div style={{ background: urgencyColor, color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700 }}>{urgencyLabel}</div>
              </div>
              <div style={{ color: '#94a3b8', fontSize: 13 }}>Includes drain/refill (~$450), prep/acid wash (~$350), and {surface.label} resurface. Timeline: 5–8 days out of service.</div>
              <div style={{ color: '#cbd5e1', marginTop: 10, fontSize: 14 }}>Recommended finish: <strong style={{ color: '#F5E642′ }}>{surface.label}</strong> — {surface.lifespan} lifespan in DFW conditions.</div>
            </div>
          )}
        </div>

        <div style={{ background: '#112240', borderRadius: 12, padding: 20 }}>
          <h2 style={{ color: '#F5E642', fontSize: 18, marginBottom: 10 }}>🛠️ DIY vs Professional</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ fontWeight: 700, color: '#22c55e', marginBottom: 8 }}>✅ You Can DIY</div>
              <ul style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.9, paddingLeft: 16 }}>
                <li>Acid washing mild stains</li>
                <li>Tile cleaning and re-grouting</li>
                <li>Waterline tile replacement</li>
              </ul>
            </div>
            <div style={{ background: '#0A1628', borderRadius: 8, padding: 14 }}>
              <div style={{ fontWeight: 700, color: '#ef4444', marginBottom: 8 }}>⛔ Always Hire a Pro</div>
              <ul style={{ color: '#cbd5e1', fontSize: 13, lineHeight: 1.9, paddingLeft: 16 }}>
                <li>Full replastering or aggregate finish</li>
                <li>Structural crack repair</li>
                <li>Fiberglass gelcoat restoration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
