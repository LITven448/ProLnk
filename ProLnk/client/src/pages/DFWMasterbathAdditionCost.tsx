import { useState } from 'react';

const scopes: Record<string, { low: number; high: number; label: string; desc: string }> = {
  basic: { low: 15000, high: 28000, label: 'Basic (toilet + shower + vanity)', desc: 'Standard 5×8 bath, single vanity, walk-in shower or tub, exhaust fan.' },
  mid: { low: 28000, high: 50000, label: 'Mid-Range (double vanity + tiled shower)', desc: 'Double vanity, tiled walk-in shower, soaking tub, upgraded fixtures.' },
  luxury: { low: 50000, high: 100000, label: 'Luxury (spa bath)', desc: 'Custom tile, heated floors, steam shower, freestanding tub, custom cabinetry.' },
};

const plumbingComplexity: Record<string, { adder: number; label: string; note: string }> = {
  near_stack: { adder: 0, label: 'Near Existing Stack (<10 ft)', note: 'Minimal rough-in cost. Gravity-fed drainage easily achieved.' },
  mid_distance: { adder: 4000, label: 'Mid Distance (10–25 ft)', note: 'Requires additional pipe runs and possible concrete slab cut in DFW slab-on-grade homes.' },
  far: { adder: 9000, label: 'Far From Stack (25+ ft)', note: 'Significant slab work likely. May require lift pump or ejector system. Add $2,000–$5,000 for slab cutting/repair.' },
};

const sizes: Record<string, number> = { small: 0.8, standard: 1.0, large: 1.3 };

export default function DFWMasterbathAdditionCost() {
  const [scope, setScope] = useState('mid');
  const [plumbing, setPlumbing] = useState('near_stack');
  const [size, setSize] = useState('standard');

  const sm = sizes[size];
  const sc = scopes[scope];
  const pl = plumbingComplexity[plumbing];
  const low = Math.round(sc.low * sm) + pl.adder;
  const high = Math.round(sc.high * sm) + pl.adder;

  return (
    <div style={{ background: '#0A1628', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', padding: '2rem' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ color: '#F5E642', fontSize: '0.85rem', marginBottom: '0.5rem' }}>🏠 DFW COST GUIDE</div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Adding a Master Bathroom</h1>
        <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Dallas-Fort Worth · 2026 Contractor Pricing · Adding where none exists</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Bathroom Scope</label>
            <select value={scope} onChange={e => setScope(e.target.value)}
              style={{ width: '100%', background: '#1e2d45', color: '#fff', border: '1px solid #2d3f5e', borderRadius: 8, padding: '0.6rem', fontSize: '1rem' }}>
              {Object.entries(scopes).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>
          <div>
            <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Bath Size</label>
            <select value={size} onChange={e => setSize(e.target.value)}
              style={{ width: '100%', background: '#1e2d45', color: '#fff', border: '1px solid #2d3f5e', borderRadius: 8, padding: '0.6rem', fontSize: '1rem' }}>
              <option value="small">Small (5×7 or smaller)</option>
              <option value="standard">Standard (5×8 to 8×10)</option>
              <option value="large">Large (10×12+)</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'block', marginBottom: '0.4rem' }}>Plumbing Distance to Stack</label>
          <select value={plumbing} onChange={e => setPlumbing(e.target.value)}
            style={{ width: '100%', background: '#1e2d45', color: '#fff', border: '1px solid #2d3f5e', borderRadius: 8, padding: '0.6rem', fontSize: '1rem' }}>
            {Object.entries(plumbingComplexity).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>

        <div style={{ background: '#1e2d45', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#F5E642', marginBottom: '0.75rem' }}>💰 Total Addition Cost</h2>
          <div style={{ fontSize: '2.75rem', fontWeight: 800, color: '#fff', marginBottom: '0.25rem' }}>
            ${low.toLocaleString()} – ${high.toLocaleString()}
          </div>
          <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1rem' }}>{sc.desc}</div>
          <div style={{ background: '#0f2035', borderRadius: 8, padding: '0.75rem', color: '#fbbf24', fontSize: '0.875rem' }}>
            🔧 Plumbing note: {pl.note}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>📋 Permit Timeline</div>
            <ul style={{ color: '#94a3b8', fontSize: '0.85rem', paddingLeft: '1.1rem', margin: 0 }}>
              <li>Permit application: 1–3 weeks</li>
              <li>Rough plumbing inspection</li>
              <li>Electrical rough-in inspection</li>
              <li>Final inspection at completion</li>
              <li>Total permit cycle: 6–12 weeks</li>
            </ul>
          </div>
          <div style={{ background: '#1e2d45', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ color: '#F5E642', fontWeight: 600, marginBottom: '0.5rem' }}>📈 ROI & Value Add</div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0 }}>Adding an en-suite master bath to a home that lacks one can increase resale value by $20,000–$50,000+ in DFW, especially in neighborhoods where comps all have master baths.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
